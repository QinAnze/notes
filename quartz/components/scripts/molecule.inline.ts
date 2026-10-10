// 侧栏「结构演示」组件的运行时脚本。
//
// 数据不在代码里 —— 全部放在 static/molecules.json（约 180 条），构建时
// Quartz 会把 static/ 原样复制到 public/，所以运行时用
// `${BASE_PATH}/static/molecules.json` 取。加条目只改 JSON，不用碰这个文件。
//
// 四个设计取舍：
//
// 1. **按当前页面筛选，不是全库轮播**。
//    读 `<body data-slug>` 拿到本页 slug，再从 contentIndex 反查原始文件名，
//    和条目里的 note 字段比对。匹配不到就保持隐藏（初始就是 display:none）。
//
// 2. **渲染器全部走 CDN，且必须有降级链**（本站 mermaid 的教训）。
//    RDKit(WASM) → SmilesDrawer(纯 JS) → 纯文本 SMILES。
//
// 3. **2D 用 RDKit，3D 只对有 pdb 的条目开放**。
//    RDKit 的 MinimalLib 不生成 3D 构象，所以小分子想上 3D 得另想办法。
//    3Dmol.js 按需点击才加载，不占首屏带宽。
//
// 4. **SVG 颜色统一替换成 currentColor**，由 CSS 上色，主题切换不用重绘。

import { setupZoomOverlay } from "./zoom"

interface Molecule {
  /** 显示名 */
  name: string
  /** SMILES；蛋白质条目没有这一项，只给 pdb */
  smiles?: string
  /** 分子式/组成，直接写死：RDKit MinimalLib 的 descriptors 不保证带分子式 */
  formula: string
  /** 关联笔记的**文件名**（不含 .md），用于按页面筛选 */
  note: string
  /** 一句话教学点 */
  tip?: string
  /** 3D 视图用的 PDB ID；填了才有「3D」按钮 */
  pdb?: string
  /** 分类标签 */
  group: string
  /** 数据来源标记：cactus = API 解析，manual = 人工书写并核对了原子数 */
  src?: string
}

interface MoleculeData {
  version: number
  note: string
  molecules: Molecule[]
}

// ⚠️ 这只是**兜底值**，不是首选。真正取站点根走下面的 siteRoot()。
//
// 为什么不能写死 "/notes"：本地 `npx quartz build --serve` 不加 `--baseDir`
// 时，public/ 是挂在服务器根上的（页面 URL = /有机化学笔记/...），
// 根本没有 /notes 这层，硬拼出来的 /notes/static/*.json 必然 404；
// 而线上（qinanze.github.io/notes）又必须带这层。
// 所以它只能当候选之一，不能当答案。
const BASE_PATH = "/notes"

// Quartz 自己注入的全局（renderPage.tsx 的 beforeDOMReady 内联脚本）：
// const fetchData = fetch("<相对路径>/static/contentIndex.json").then(r => r.json())
// 声明只用于类型标注，编译后不产生任何 JS。
declare const fetchData: Promise<Record<string, unknown>> | undefined

// ---------------------------------------------------------------------------
// CDN 加载：每个库都配多个源，逐个尝试直到有一个成功
// ---------------------------------------------------------------------------

function loadScript(urls: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    let idx = 0
    const tryNext = () => {
      if (idx >= urls.length) {
        resolve(false)
        return
      }
      const url = urls[idx++]
      const el = document.createElement("script")
      el.src = url
      el.async = true
      el.onload = () => resolve(true)
      el.onerror = () => {
        el.remove()
        tryNext()
      }
      document.head.appendChild(el)
    }
    tryNext()
  })
}

type RdkitMol = {
  get_svg: () => string
  delete: () => void
}

type RdkitModule = {
  get_mol: (smiles: string) => RdkitMol | null
}

let rdkitPromise: Promise<RdkitModule | null> | null = null

/**
 * 加载并初始化 RDKit(WASM)。
 *
 * ⚠️ 这里必须**先 loadScript 再 initRDKitModule** ——
 * 少了第一步会直接找不到 initRDKitModule（2026-10-09 就是这个 bug，
 * 页面整块显示「渲染错误」）。
 */
function getRDKit(): Promise<RdkitModule | null> {
  if (rdkitPromise) return rdkitPromise
  rdkitPromise = (async () => {
    const w = window as unknown as {
      initRDKitModule?: () => Promise<RdkitModule>
      RDKit?: RdkitModule
    }
    // 有些版本脚本执行完就直接挂在 window.RDKit 上，先认这个
    if (typeof w.RDKit?.get_mol === "function") return w.RDKit

    const ok = await loadScript([
      "https://cdn.jsdelivr.net/npm/@rdkit/rdkit/dist/RDKit_minimal.js",
      "https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js",
    ])
    if (!ok) {
      console.warn("[molecule] RDKit 脚本加载失败")
      return null
    }
    if (typeof w.initRDKitModule !== "function") {
      console.warn("[molecule] 找不到 initRDKitModule")
      return null
    }
    try {
      return await w.initRDKitModule()
    } catch (err) {
      console.warn("[molecule] RDKit WASM 初始化失败", err)
      return null
    }
  })()
  return rdkitPromise
}

let drawer: any = null
let drawerReady: Promise<boolean> | null = null

/** SmilesDrawer 实例只建一次 */
function ensureDrawer(): Promise<boolean> {
  if (drawerReady) return drawerReady
  drawerReady = (async () => {
    const w = window as unknown as { SmilesDrawer?: any }
    if (!w.SmilesDrawer) {
      const ok = await loadScript([
        "https://cdn.jsdelivr.net/npm/smiles-drawer@2.1.7/dist/smiles-drawer.min.js",
        "https://unpkg.com/smiles-drawer@2.1.7/dist/smiles-drawer.min.js",
      ])
      if (!ok) return false
    }
    const SD = w.SmilesDrawer
    if (!SD?.Drawer) return false
    const host = document.querySelector<HTMLElement>("#molecule-view")
    if (!host) return false
    drawer = new SD.Drawer(
      {
        width: Math.max(260, Math.min(460, host.clientWidth - 8)),
        height: 180,
        bondThickness: 1.1,
        padding: 12,
        terminalCarbons: true,
      },
      SD,
    )
    return true
  })()
  return drawerReady
}

// ---------------------------------------------------------------------------
// 页面 / DOM
// ---------------------------------------------------------------------------

const wrapper = document.querySelector<HTMLElement>("#molecule-wrapper")
const view = document.querySelector<HTMLElement>("#molecule-view")
const titleEl = document.querySelector<HTMLElement>("#molecule-title")
const groupEl = document.querySelector<HTMLElement>("#molecule-group")
const metaEl = document.querySelector<HTMLElement>("#molecule-meta")
const tipEl = document.querySelector<HTMLElement>("#molecule-tip")
const indexEl = document.querySelector<HTMLElement>("#molecule-index")
const prevBtn = document.querySelector<HTMLButtonElement>("#molecule-prev")
const nextBtn = document.querySelector<HTMLButtonElement>("#molecule-next")
const modeBtn = document.querySelector<HTMLButtonElement>("#molecule-mode")
const zoomIcon = document.querySelector<SVGElement>("#molecule-zoom-icon")

let entries: Molecule[] = []
let current = 0
let is3D = false
/** 当前活着的 3Dmol viewer（放大时要对它调 resize/ render）。切回 2D 后它就作废了 */
let viewer3d: any = null

/**
 * 「放大」按钮只在真的有东西可放大的时候才出现：
 * 2D 画成了 SVG，或者 3D 的模型加载完了。
 * （3D 渲染器还没起来 / 加载失败时按钮是藏着的，免得点了给一个空浮层。）
 */
function setZoomAvailable(on: boolean) {
  zoomIcon?.classList.toggle("is-hidden", !on)
}

function setHint(html: string) {
  setZoomAvailable(false)
  if (!view) return
  view.innerHTML = `<div class="molecule-hint">${html}</div>`
}

/**
 * 当前页的 slug —— 直接读 `<body data-slug>`（见 quartz/components/renderPage.tsx）。
 * 这比解析 location.pathname 可靠：不用管 BASE_PATH 前缀、也不用 decodeURIComponent。
 */
function currentSlug(): string {
  return (document.body?.dataset?.slug ?? "").replace(/\/+$/, "")
}

/**
 * 站点根路径（无 trailing slash；挂在根上时返回空串）。
 *
 * 页面 URL 的结构恒为 `<站点根>/<slug>/`，而 `<body data-slug>` 给的正是
 * **未编码**的 slug。两边数一下层数、减掉 slug 的层数，剩下的就是站点根。
 * 这样本地（根上跑）和线上（/notes 子路径）都能自动对，不用写死。
 *
 * 例：
 *   线上 /notes/A/B/C/  + slug "A/B/C"（3 段）→ 根 "/notes"
 *   本地 /A/B/C/        + slug "A/B/C"（3 段）→ 根 ""
 */
function siteRoot(): string {
  const slugSegs = currentSlug().split("/").filter(Boolean).length
  const pathSegs = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s.toLowerCase() !== "index.html")
  const n = Math.max(0, pathSegs.length - slugSegs)
  // ⚠️ 不要 encodeURIComponent：location.pathname 已经是百分号编码的
  // （中文 slug 在这儿是 %E6%9C%BA...），再编码一次会变成 %25E6... 双重编码。
  const root = pathSegs.slice(0, n).join("/")
  return root ? "/" + root : ""
}

/** 静态文件路径的候选列表，按可能性排序，逐个试到 200 为止 */
function staticUrls(name: string): string[] {
  const out: string[] = []
  const push = (u: string) => {
    if (u && !out.includes(u)) out.push(u)
  }
  push(`${siteRoot()}/static/${name}`)
  push(`${BASE_PATH}/static/${name}`)
  push(`/static/${name}`)
  return out
}

/** 依次 GET 候选 URL，返回第一个 200 的；全失败则把试过的路径写进错误信息 */
async function fetchFirst(urls: string[]): Promise<string> {
  let last = "未知错误"
  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.text()
      last = `HTTP ${res.status}`
    } catch (err) {
      last = err instanceof Error ? err.message : String(err)
    }
  }
  throw new Error(`都取不到（试过 ${urls.join("、")}，最后：${last}）`)
}

/**
 * slug → 文件名（末段）。
 *
 * contentIndex.json 的结构（见 quartz/plugins/emitters/contentIndex.ts）：
 *   { "<fullSlug>": { title, links, tags, content } }
 * **key 是完整 slug，value 里没有 slug / filePath 字段**。
 *
 * ⚠️ 用 slug 末段当文件名是安全的：Quartz 的 `slugifyFilePath`
 * （quartz/util/path.ts）只把空格换成连字符，**不会转小写**。
 */
let fileMap: Record<string, string> | null = null

async function loadFileMap(): Promise<Record<string, string>> {
  if (fileMap) return fileMap
  const map: Record<string, string> = {}
  const put = (raw: Record<string, unknown>) => {
    for (const slug of Object.keys(raw)) {
      const base = slug.split("/").pop() ?? ""
      if (base) map[slug] = base.replace(/\.(md|pdf|mdx)$/i, "")
    }
  }

  try {
    // Quartz 已经预加载了一份（beforeDOMReady 注入的全局 fetchData），能复用就不重复请求
    if (typeof fetchData !== "undefined") {
      put((await fetchData) as Record<string, unknown>)
    }
  } catch (err) {
    console.warn("[molecule] 复用 fetchData 失败", err)
  }

  if (Object.keys(map).length === 0) {
    try {
      put(JSON.parse(await fetchFirst(staticUrls("contentIndex.json"))) as Record<string, unknown>)
    } catch (err) {
      console.warn("[molecule] contentIndex.json 读取失败", err)
    }
  }

  fileMap = map
  return map
}

/** 分子数据（约 180 条，static/molecules.json） */
let allMolecules: Molecule[] = []

async function loadMolecules(): Promise<Molecule[]> {
  if (allMolecules.length > 0) return allMolecules
  const data = JSON.parse(await fetchFirst(staticUrls("molecules.json"))) as MoleculeData
  allMolecules = Array.isArray(data.molecules) ? data.molecules : []
  return allMolecules
}

function pickEntries(): Molecule[] {
  const slug = currentSlug()
  if (!slug || allMolecules.length === 0) return []
  const fileName = fileMap?.[slug]
  if (!fileName) return []
  const key = fileName.toLowerCase()
  return allMolecules.filter((m) => m.note.toLowerCase() === key)
}

function noteHref(fileName: string): string | null {
  const key = fileName.toLowerCase()
  for (const [slug, value] of Object.entries(fileMap ?? {})) {
    if (value.toLowerCase() === key) return `${siteRoot()}/${encodeURI(slug)}`
  }
  return null
}

// ---------------------------------------------------------------------------
// 2D 渲染
// ---------------------------------------------------------------------------

/**
 * 把 RDKit 输出的 SVG 改成「跟随主题 + 透明背景」。
 *
 * 三个坑，逐条对应下面的处理：
 *
 * 1. **白色背景板**：RDKit 会画一个 `<rect width='100%'>` 铺白底，
 *    不删掉就挡住站点背景图（和 markmap 当初要压白底是同一件事）。
 * 2. **颜色写死，而且藏在两个地方**：
 *    - 属性形式 `stroke='#000000'`（键线）
 *    - ⚠️ **内联 style 形式 `<text style='...fill:#000000'>`（原子字母）**
 *      —— 2026-10-09 只做了属性形式的替换，结果暗色模式下**键变浅了、字母还是黑的**。
 *      两者都要换成 `currentColor`，再由 CSS 的 `svg { color: var(--dark) }` 上色。
 * 3. 根元素上写死的 width/height 要去掉，交给 CSS 约束尺寸。
 *
 * ⚠️ 用 `DOMParser` 而不是正则：正则既要兼顾单双引号、又要兼顾 style 里的写法，
 * 太容易漏（坑 2 就是这么漏的）。解析成 DOM 后遍历属性是完备的。
 * ⚠️ 解析失败（拿到的不是 svg）就原样返回，别把整块弄成空白。
 */
function preprocessSvg(svgText: string): string {
  let doc: Document
  try {
    doc = new DOMParser().parseFromString(svgText, "image/svg+xml")
  } catch {
    return svgText
  }
  const root = doc.documentElement
  if (!root || root.nodeName.toLowerCase() !== "svg") return svgText

  root.removeAttribute("width")
  root.removeAttribute("height")

  // 「是颜色」= 不是 none / 不是渐变引用 / 不是 transparent。
  // 这些保留原值，否则 fill="none" 的键线会被填成实心。
  const isColor = (v: string) => {
    const s = v.trim().toLowerCase()
    return s !== "" && s !== "none" && s !== "transparent" && !s.startsWith("url(")
  }

  // 1) 删背景板：整块铺满的 rect，或者填了白色的 rect
  root.querySelectorAll("rect").forEach((r) => {
    const w = (r.getAttribute("width") ?? "").trim()
    const h = (r.getAttribute("height") ?? "").trim()
    const fill = (r.getAttribute("fill") ?? "").trim().toLowerCase()
    if (w === "100%" || h === "100%" || fill === "#ffffff" || fill === "#fff" || fill === "white") {
      r.remove()
    }
  })

  // 2) 属性 + 内联 style 里的 fill / stroke 一律换 currentColor
  //    （`(fill|stroke)\s*:` 不会误伤 `stroke-width` / `stroke-linecap`，
  //     因为它们后面跟的是 `-` 而不是 `:`）
  root.querySelectorAll("*").forEach((el) => {
    for (const attr of ["fill", "stroke"]) {
      const v = el.getAttribute(attr)
      if (v && isColor(v)) el.setAttribute(attr, "currentColor")
    }
    const style = el.getAttribute("style")
    if (style) {
      el.setAttribute("style", style.replace(/(fill|stroke)(\s*:\s*)[^;]+/gi, "$1$2currentColor"))
    }
  })

  return new XMLSerializer().serializeToString(doc)
}

function renderWithRDKit(mol: RdkitMol, host: HTMLElement) {
  host.innerHTML = preprocessSvg(mol.get_svg())
  // 画好了，可以放大
  setZoomAvailable(true)
}

/** 把 SmilesDrawer 给出的 atomTree 画成 SVG（同样是 currentColor） */
function drawTree(host: HTMLElement, tree: any) {
  const NS = "http://www.w3.org/2000/svg"
  const w = tree?.width || 300
  const h = tree?.height || 180
  const svg = document.createElementNS(NS, "svg")
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
  svg.setAttribute("width", "100%")
  svg.setAttribute("height", "180")

  const walk = (n: any) => {
    if (!n || typeof n !== "object") return
    if (n.type === "atom" || n.type === "node") {
      if (n.element && n.position) {
        const t = document.createElementNS(NS, "text")
        t.setAttribute("x", String(n.position.x))
        t.setAttribute("y", String(n.position.y))
        t.setAttribute("fill", "currentColor")
        t.textContent = n.element
        svg.appendChild(t)
      }
    } else if ((n.type === "bond" || n.type === "edge") && n.begin && n.end) {
      const dx = n.end.position.x - n.begin.position.x
      const dy = n.end.position.y - n.begin.position.y
      const len = Math.hypot(dx, dy) || 1
      const order = n.order || 1
      const count = order > 2 ? 3 : order
      for (let i = 0; i < count; i++) {
        const f = count === 1 ? 0 : (i / (count - 1) - 0.5) * 2
        const nx = (-dy / len) * 2 * f
        const ny = (dx / len) * 2 * f
        const l = document.createElementNS(NS, "line")
        l.setAttribute("x1", String(n.begin.position.x + nx))
        l.setAttribute("y1", String(n.begin.position.y + ny))
        l.setAttribute("x2", String(n.end.position.x + nx))
        l.setAttribute("y2", String(n.end.position.y + ny))
        l.setAttribute("stroke", "currentColor")
        l.setAttribute("stroke-width", "1.2")
        svg.appendChild(l)
      }
    }
    if (Array.isArray(n.children)) n.children.forEach(walk)
  }

  if (Array.isArray(tree)) tree.forEach(walk)
  else walk(tree)
  host.appendChild(svg)
  // 降级渲染器画的也是矢量 SVG，同样可以放大
  setZoomAvailable(true)
}

async function render2D(mol: Molecule) {
  if (!view || !mol.smiles) return
  setHint("正在加载 2D 渲染器…")

  const RDKit = await getRDKit()
  if (RDKit) {
    try {
      const m = RDKit.get_mol(mol.smiles)
      if (m) {
        renderWithRDKit(m, view)
        m.delete()
        return
      }
      setHint(
        `RDKit 无法解析这个结构式<br/><span style="font-family:var(--codeFont)">${mol.smiles}</span>`,
      )
      return
    } catch (err) {
      console.warn("[molecule] RDKit 解析失败", err)
      setHint(
        `RDKit 解析出错<br/><span style="font-family:var(--codeFont)">${mol.smiles}</span>`,
      )
      return
    }
  }

  // 降级：SmilesDrawer
  const ok = await ensureDrawer()
  if (ok && drawer) {
    try {
      drawer.draw(
        mol.smiles,
        (tree: any) => {
          view!.innerHTML = ""
          drawTree(view!, tree)
        },
        () => {
          setHint(
            `备用渲染器也失败了<br/><span style="font-family:var(--codeFont)">${mol.smiles}</span>`,
          )
        },
      )
      return
    } catch (err) {
      console.warn("[molecule] SmilesDrawer 绘制失败", err)
    }
  }

  setHint(`2D 渲染器加载失败（可能是 CDN 被挡）<br/>SMILES：${mol.smiles}`)
}

// ---------------------------------------------------------------------------
// 3D 渲染（按需加载 3Dmol.js）
// ---------------------------------------------------------------------------

async function render3D(mol: Molecule, host: HTMLElement) {
  if (!mol.pdb) return
  setHint("正在加载 3Dmol.js…")

  const w = window as unknown as { $3Dmol?: any }
  if (!w.$3Dmol) {
    const ok = await loadScript([
      "https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.1/3Dmol-min.js",
      "https://3Dmol.org/build/3Dmol-min.js",
    ])
    if (!ok || !w.$3Dmol) {
      setHint("3D 渲染器加载失败<br/>检查网络后重试")
      return
    }
  }
  const D = w.$3Dmol

  host.innerHTML = ""
  const stage = document.createElement("div")
  stage.className = "molecule-3d"
  host.appendChild(stage)
  // 结构还没加载出来之前不给放大（放大是把这个容器整个搬进浮层，
  // 空容器搬过去只会看到空白）。加载完在 styleAndZoom() 里再打开。
  setZoomAvailable(false)

  const viewer = D.createViewer(stage, { backgroundAlpha: 0, antialias: true })
  if (!viewer) {
    setHint("3D 渲染器初始化失败")
    return
  }
  // 留给「放大」用：放大时不是克隆画布（克隆出来是空白），
  // 而是把这个容器连同 WebGL 上下文一起移动过去，再让 viewer 按新尺寸重算。
  viewer3d = viewer

  const styleAndZoom = () => {
    viewer.setStyle({}, { cartoon: { color: "spectrum" } })
    viewer.zoomTo()
    viewer.render()
    setZoomAvailable(true)
  }

  // 两类数据源：
  //   pdb:XXXX     → 3Dmol 内置的 RCSB 下载（实验测定的结构）
  //   AF-P12345-F1 → AlphaFold DB（预测结构，覆盖几乎所有已知蛋白）
  if (mol.pdb.startsWith("AF-")) {
    const url = `https://alphafold.ebi.ac.uk/files/${mol.pdb}-F1-model_v4.pdb`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        viewer.addModel(text, "pdb")
        styleAndZoom()
      })
      .catch((err) => {
        console.warn("[molecule] AlphaFold 加载失败", err)
        setHint(`AlphaFold 结构 ${mol.pdb} 加载失败`)
      })
    return
  }

  D.download(`pdb:${mol.pdb}`, viewer, { multimodel: false }, styleAndZoom)
}

// ---------------------------------------------------------------------------
// 渲染当前条目
// ---------------------------------------------------------------------------

function renderMeta(mol: Molecule) {
  if (!metaEl) return
  const parts: string[] = [`<span class="molecule-formula">${mol.formula}</span>`]
  const href = noteHref(mol.note)
  parts.push(href ? `<a href="${href}">📖 ${mol.note}</a>` : `<span>📖 ${mol.note}</span>`)
  if (is3D && mol.pdb) parts.push(`<span>PDB ${mol.pdb}</span>`)
  if (mol.src === "manual") parts.push(`<span title="人工书写并核对了原子数">·</span>`)
  metaEl.innerHTML = parts.join("")
}

function render() {
  const mol = entries[current]
  if (!view || !mol) return

  if (titleEl) titleEl.textContent = mol.name
  if (groupEl) groupEl.textContent = mol.group
  if (indexEl) indexEl.textContent = `${current + 1} / ${entries.length}`
  if (tipEl) tipEl.textContent = mol.tip ?? ""
  renderMeta(mol)

  if (modeBtn) {
    const can3D = Boolean(mol.pdb)
    modeBtn.disabled = !can3D
    // 文案写清楚是「切到哪一边」，别只留一个 3D 让人误以为当前是 3D 模式
    modeBtn.textContent = is3D ? "看 2D" : "看 3D"
    modeBtn.classList.toggle("is-on", is3D)
    modeBtn.title = can3D
      ? "切换 2D 结构式 / 3D 结构"
      : "该条目只有 2D 结构式（3D 仅提供 PDB 结构的大分子）"
  }

  if (is3D && mol.pdb) {
    render3D(mol, view)
  } else if (mol.smiles) {
    render2D(mol)
  } else {
    setHint("本条目只提供 3D 结构，点下方「3D」按钮加载")
  }
}

function step(delta: number) {
  if (entries.length === 0) return
  current = (current + delta + entries.length) % entries.length
  render()
}

// ---------------------------------------------------------------------------
// 放大浮层
// ---------------------------------------------------------------------------

/**
 * 浮层内容。2D 和 3D 的做法**不一样**，别想着统一：
 *
 * **2D —— 克隆已经画好的 SVG。**
 *   结构式本来就是矢量图，克隆一份塞进大容器里就是无损放大。没必要重跑 RDKit
 *   （重跑还得处理字号/键长的比例，反而更容易画歪）。
 *   前提是目标得有 viewBox，否则没有等比缩放的依据 —— 万一渲染器没给，
 *   用 source.getBBox() 现补一个。
 *
 * **3D —— 把整个画布容器「移动」进浮层。**
 *   ⚠️ 克隆 canvas 只会得到空白（像素内容不跟着 cloneNode 走），
 *   但**移动 DOM 节点是安全的**：WebGL 上下文和画布位图都不会丢，
 *   用户当前的旋转/缩放状态也原样保留。
 *   搬过去之后调 `viewer.resize()` 让 3Dmol 按新容器尺寸重算投影 ——
 *   画布变高，模型在视口里就跟着变大了。
 *   关浮层时再搬回来并 resize 一次（放在这里返回的清理函数里，
 *   zoom.ts 是先跑清理、再清空浮层，所以顺序是安全的）。
 */
function buildMoleculeZoom(body: HTMLElement) {
  // --- 3D ---
  const stage = is3D ? view?.querySelector<HTMLElement>(".molecule-3d") : null
  if (stage && viewer3d) {
    // 容器尺寸变了，得让 3Dmol 按新尺寸重算一次投影，否则画布还是旧大小。
    // ⚠️ 包一层：resize 是 3Dmol 的公开方法，但万一某个版本没有，
    // 也不能让异常把整次点击弄崩（那样浮层会开着但里面是空的）。
    const refresh = () => {
      try {
        viewer3d?.resize?.()
        viewer3d?.render?.()
      } catch (err) {
        console.warn("[molecule] 3D 画布尺寸刷新失败", err)
      }
      // 兜底：万一某个 3Dmol 版本没有/用不了 resize，至少让 canvas 铺满新容器
      // （位图会被拉伸，略糊，但总比缩在左上角一小块强）。
      // 正常路径下 canvas 的位图尺寸已经等于容器尺寸，这行等于没写。
      const canvas = stage.querySelector("canvas")
      if (canvas instanceof HTMLElement) {
        canvas.style.width = "100%"
        canvas.style.height = "100%"
      }
    }

    body.appendChild(stage)
    refresh()

    return () => {
      if (!view) {
        stage.remove()
        return
      }
      // 中间若切过主题/换过条目，3D 会被重建，这块旧画布就不是当前的那块了
      if (view.querySelector(".molecule-3d") !== stage) {
        stage.remove()
        return
      }
      view.appendChild(stage)
      refresh()
    }
  }

  // --- 2D ---
  const source = view?.querySelector<SVGSVGElement>("svg")
  if (!source) {
    body.innerHTML =
      '<div class="molecule-hint">这个视图暂时没有可放大的内容。<br/>' +
      "（2D 要等结构式画出来，3D 要等模型加载完。）</div>"
    return
  }

  const clone = source.cloneNode(true) as SVGSVGElement

  if (!clone.getAttribute("viewBox")) {
    try {
      const box = source.getBBox()
      if (box && box.width > 0 && box.height > 0) {
        clone.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`)
      }
    } catch (err) {
      // getBBox 在元素不可见等情况会抛，忽略 —— 那就只能按原尺寸显示了
      console.warn("[molecule] getBBox 失败，放大可能不完整", err)
    }
  }

  // 显式撑满浮层：没有 viewBox 的 SVG 若留着 width:auto，浏览器会退回到默认的
  // 300×150，放大等于没放。有 viewBox 时配合默认的 preserveAspectRatio
  // （xMidYMid meet）等比放大并居中，正是想要的效果。
  clone.style.width = "100%"
  clone.style.height = "100%"

  body.innerHTML = ""
  body.appendChild(clone)
}

// ---------------------------------------------------------------------------
// 启动
// ---------------------------------------------------------------------------

async function init() {
  if (!wrapper || !view) return

  // 放大浮层的开合逻辑和另外两个侧栏模块共用（components/scripts/zoom.ts）
  setupZoomOverlay({
    buttonId: "molecule-zoom-icon",
    overlayId: "molecule-zoom-outer",
    bodyId: "molecule-zoom-body",
    build: buildMoleculeZoom,
  })

  // ⚠️ 失败原因一定要显示出来。之前这里是「加载失败就静默隐藏」，
  // 结果数据文件 404 时用户只看到「框没了」，完全无从判断是哪一步坏的。
  const problems: string[] = []

  try {
    await loadMolecules()
  } catch (err) {
    problems.push(
      `分子数据加载失败：${err instanceof Error ? err.message : String(err)}`,
    )
  }

  try {
    await loadFileMap()
    if (!fileMap || Object.keys(fileMap).length === 0) {
      problems.push("contentIndex 索引为空，无法按当前页面筛选")
    }
  } catch (err) {
    problems.push(`contentIndex 加载失败：${err instanceof Error ? err.message : String(err)}`)
  }

  entries = problems.length === 0 ? pickEntries() : []

  if (entries.length === 0) {
    // 有问题就把框显示出来讲清楚原因；只是「本页没有对应结构」才保持隐藏
    if (problems.length > 0) {
      wrapper.style.display = ""
      if (titleEl) titleEl.textContent = "结构演示"
      setHint(
        `${problems.join("<br/>")}<br/>` +
          `<span style="font-family:var(--codeFont);opacity:.7">` +
          `站点根 ${siteRoot() || "/"} · 查找 ${staticUrls("molecules.json").join("、")}` +
          `</span>`,
      )
    }
    return
  }
  wrapper.style.display = ""

  // 2D 渲染器首屏就要用，先加载
  await getRDKit()

  prevBtn?.addEventListener("click", () => step(-1))
  nextBtn?.addEventListener("click", () => step(1))
  modeBtn?.addEventListener("click", () => {
    is3D = !is3D
    render()
  })

  // 主题切换：2D 是 currentColor 画的，CSS 自动跟随，不用重绘；
  // 只有 3D（canvas/WebGL 着色）需要重来一遍。
  let lastTheme = document.documentElement.getAttribute("saved-theme")
  new MutationObserver(() => {
    const now = document.documentElement.getAttribute("saved-theme")
    if (now === lastTheme) return
    lastTheme = now
    const mol = entries[current]
    if (is3D && mol?.pdb && view) render3D(mol, view)
  }).observe(document.documentElement, { attributeFilter: ["saved-theme"] })

  render()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}

export {}
