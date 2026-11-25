import { QuartzTransformerPlugin } from "../types"
import { Root, Code } from "mdast"
import { visit } from "unist-util-visit"

/**
 * 科学示意图：Mermaid 关系图 + SMILES 化学结构式。
 *
 * 为什么单独做一个 transformer：
 * 1. 上游 OFM 的 mermaid 支持会把 ` ```mermaid ` 变成 `<code class="mermaid">`，
 *    然后靠 CDN 的 `mermaid.run({querySelector: '.mermaid'})` 渲染。
 *    它只在 `nav` 事件里跑一次、版本不锁、没有 CDN 降级、也不跟主题切换，
 *    换主题后图还是旧配色。
 * 2. Obsidian Chem 插件的语法是 ` ```smiles `（每行一个 SMILES），
 *    Quartz 不认识，会被当成普通代码块高亮。
 *
 * 这里统一在 mdast 阶段把两种块改成独立 class，绕开 shiki 高亮，
 * 再由一段注入的模块脚本在浏览器端渲染（都配了 CDN 降级链）。
 * 渲染失败时保留原始文本，保证内容不丢。
 */

export interface ScienceDiagramsOptions {
  mermaid: boolean
  smiles: boolean
}

const defaultOptions: ScienceDiagramsOptions = {
  mermaid: true,
  smiles: true,
}

const scienceDiagramsScript = `
// ===== 科学示意图渲染（Mermaid + SMILES）=====
// 由 quartz/plugins/transformers/scienceDiagrams.ts 注入。
// 约定：渲染失败时**不要**动原始文本，用户至少还能读到内容。

const DIAGRAM_MERMAID_URLS = [
  'https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs',
  'https://unpkg.com/mermaid@11.12.0/dist/mermaid.esm.min.mjs',
  'https://esm.sh/mermaid@11.12.0',
]

const DIAGRAM_SMILES_URLS = [
  'https://cdn.jsdelivr.net/npm/smiles-drawer@2.1.7/dist/smiles-drawer.min.js',
  'https://unpkg.com/smiles-drawer@2.1.7/dist/smiles-drawer.min.js',
]

function diagramIsDark() {
  return document.documentElement.getAttribute('saved-theme') === 'dark'
}

function diagramTheme() {
  return diagramIsDark() ? 'dark' : 'light'
}

// ---------- Mermaid ----------

let mermaidPromise = null
let mermaidInitedTheme = null

function loadMermaid() {
  if (mermaidPromise) return mermaidPromise
  mermaidPromise = (async () => {
    for (const url of DIAGRAM_MERMAID_URLS) {
      try {
        const mod = await import(url)
        return mod.default ?? mod
      } catch (err) {
        console.warn('[mermaid] CDN 失败，换下一个源：', url, err)
      }
    }
    console.warn('[mermaid] 所有 CDN 都没加载成功')
    return null
  })()
  return mermaidPromise
}

async function renderMermaid() {
  const nodes = Array.from(document.querySelectorAll('code.mermaid'))
  if (nodes.length === 0) return

  const mermaid = await loadMermaid()
  if (!mermaid) {
    nodes.forEach((el) => el.classList.add('diagram-failed'))
    return
  }

  const theme = diagramTheme()
  if (mermaidInitedTheme !== theme) {
    const dark = theme === 'dark'
    // 透明底 + 透明节点：不画白框，切换主题时不会出现“白底白字”。
    // 文字/连线的颜色按当前主题给，主题切换时由下面的 MutationObserver 重渲染。
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',
      themeVariables: {
        darkMode: dark,
        background: 'transparent',
        primaryColor: 'transparent',
        mainBkg: 'transparent',
        secondaryColor: 'transparent',
        tertiaryColor: 'transparent',
        primaryTextColor: dark ? '#f8fafc' : '#0f172a',
        textColor: dark ? '#f8fafc' : '#0f172a',
        primaryBorderColor: dark ? '#cbd5e1' : '#334155',
        nodeBorder: dark ? '#cbd5e1' : '#334155',
        lineColor: dark ? '#cbd5e1' : '#334155',
        clusterBkg: 'transparent',
        clusterBorder: dark ? '#64748b' : '#cbd5e1',
        edgeLabelBackground: 'transparent',
        fontSize: '16px',
      },
      fontFamily: 'inherit',
    })
    mermaidInitedTheme = theme
  }

  for (const el of nodes) {
    // 首次渲染从文本里取源码；之后（换主题）从 dataset 取，
    // 因为渲染完 innerHTML 已经被换成 SVG 了。
    const src = el.dataset.diagramSrc || el.textContent || ''
    el.dataset.diagramSrc = src
    if (el.dataset.renderedTheme === theme) {
      if (el.querySelector('svg')) continue
    }

    try {
      const id = 'mmd-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
      const result = await mermaid.render(id, src)
      el.innerHTML = result.svg
      el.dataset.renderedTheme = theme
      el.classList.remove('diagram-failed')
    } catch (err) {
      console.warn('[mermaid] 渲染失败，保留源码：', err)
      el.textContent = src
      el.dataset.renderedTheme = ''
      el.classList.add('diagram-failed')
    }
  }
}

// ---------- SMILES（Obsidian Chem 语法）----------

let smilesPromise = null

function loadScriptOnce(url) {
  return new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = url
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.head.appendChild(s)
  })
}

function loadSmilesDrawer() {
  if (window.SmilesDrawer) {
    if (window.SmilesDrawer.Drawer) return Promise.resolve(window.SmilesDrawer)
  }
  if (smilesPromise) return smilesPromise
  smilesPromise = (async () => {
    for (const url of DIAGRAM_SMILES_URLS) {
      const ok = await loadScriptOnce(url)
      if (ok) {
        if (window.SmilesDrawer) {
          if (window.SmilesDrawer.Drawer) return window.SmilesDrawer
        }
      }
    }
    console.warn('[smiles] SmilesDrawer 加载失败')
    return null
  })()
  return smilesPromise
}

function drawSmilesLine(SD, line, host, theme, width, height, onError) {
  SD.parse(
    line,
    (tree) => {
      try {
        // ⚠️ 2.1.7 的 UMD 包有 bug：Drawer.drawCanvas 内部引用不存在的 this.svgDrawer，
        // 走 canvas 必炸（drawCanvas is not a function / 读 undefined 的 draw）。
        // 能用的是 SvgDrawer.draw(tree, svg, theme, null, false) —— 注意第 4 个参数
        // 必须是 null（weights），传 false 会让内部的 svgWrapper 不初始化。
        // 直接画成 SVG 也更清晰：矢量图，缩放不糊，还能继承主题配色。
        const drawer = new SD.SvgDrawer({
          width: width,
          height: height,
          bondThickness: 1.1,
          padding: 12,
          terminalCarbons: true,
        })
        const NS = 'http://www.w3.org/2000/svg'
        const svg = document.createElementNS(NS, 'svg')
        svg.setAttribute('xmlns', NS)
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height)
        svg.setAttribute('width', '100%')
        svg.setAttribute('height', String(height))
        drawer.draw(tree, svg, theme, null, false)
        svg.style.maxWidth = '100%'
        svg.style.height = 'auto'
        host.appendChild(svg)
      } catch (err) {
        onError(err)
      }
    },
    onError,
  )
}

async function renderSmiles() {
  const blocks = Array.from(document.querySelectorAll('code.smiles-diagram'))
  if (blocks.length === 0) return

  const SD = await loadSmilesDrawer()
  if (!SD) {
    blocks.forEach((el) => el.classList.add('diagram-failed'))
    return
  }

  const theme = diagramIsDark() ? 'dark' : 'light'

  for (const code of blocks) {
    const pre = code.parentElement
    if (!pre) continue

    const src = code.dataset.diagramSrc || code.textContent || ''
    code.dataset.diagramSrc = src
    const lines = src
      .split('\\n')
      .map((s) => s.trim())
      .filter((s) => !(!s.length || s.startsWith('#')))

    let wrap = pre.nextElementSibling
    if (!wrap) {
      wrap = document.createElement('div')
      wrap.className = 'smiles-diagram-wrap'
      pre.after(wrap)
      pre.hidden = true
    }
    if (!wrap.classList.contains('smiles-diagram-wrap')) {
      wrap = document.createElement('div')
      wrap.className = 'smiles-diagram-wrap'
      pre.after(wrap)
      pre.hidden = true
    }
    wrap.innerHTML = ''

    lines.forEach((line) => {
      const fig = document.createElement('figure')
      fig.className = 'smiles-item'
      fig.title = line
      wrap.appendChild(fig)
      drawSmilesLine(SD, line, fig, theme, 240, 240, (err) => {
        console.warn('[smiles] 解析失败：', line, err)
        fig.classList.add('diagram-failed')
        fig.textContent = line
      })
    })
  }
}

// ---------- 行内 $smiles=...（Obsidian Chem 的行内语法）----------

const INLINE_SMILES_RE = /\\$smiles=([^\\s,;，。；、]+)/g

function expandInlineSmiles() {
  const host = document.querySelector('.markdown-preview-view') || document.body
  if (!host) return

  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, null)
  const nodes = []
  while (walker.nextNode()) {
    const node = walker.currentNode
    const text = node.nodeValue
    if (!text) continue
    if (text.indexOf('$smiles=') === -1) continue
    const parent = node.parentElement
    if (!parent) continue
    if (parent.closest('pre, code, .katex, script, style')) continue
    nodes.push(node)
  }

  nodes.forEach((node) => {
    const text = node.nodeValue || ''
    const frag = document.createDocumentFragment()
    let last = 0
    text.replace(INLINE_SMILES_RE, (match, smiles, index) => {
      if (index > last) frag.appendChild(document.createTextNode(text.slice(last, index)))
      const span = document.createElement('span')
      span.className = 'smiles-inline'
      span.dataset.smiles = smiles
      span.title = smiles
      frag.appendChild(span)
      last = index + match.length
      return match
    })
    if (last === 0) return
    if (last !== text.length) frag.appendChild(document.createTextNode(text.slice(last)))
    if (node.parentNode) node.parentNode.replaceChild(frag, node)
  })
}

async function renderInlineSmiles() {
  const spans = Array.from(document.querySelectorAll('span.smiles-inline'))
  if (spans.length === 0) return

  const SD = await loadSmilesDrawer()
  if (!SD) {
    spans.forEach((el) => el.classList.add('diagram-failed'))
    return
  }

  const theme = diagramIsDark() ? 'dark' : 'light'
  for (const span of spans) {
    if (span.dataset.renderedTheme === theme) {
      if (span.querySelector('svg')) continue
    }
    const smiles = span.dataset.smiles || ''
    if (!smiles) continue

    span.innerHTML = ''
    drawSmilesLine(SD, smiles, span, theme, 110, 110, (err) => {
      console.warn('[smiles] 行内解析失败：', smiles, err)
      span.classList.add('diagram-failed')
      span.textContent = smiles
    })
    span.dataset.renderedTheme = theme
  }
}

// ---------- 入口与主题联动 ----------

function renderAllDiagrams() {
  expandInlineSmiles()
  wrapInlineSvgs()
  renderMermaid().catch((err) => console.warn('[diagrams] mermaid 渲染异常', err))
  renderSmiles().catch((err) => console.warn('[diagrams] smiles 渲染异常', err))
  renderInlineSmiles().catch((err) => console.warn('[diagrams] 行内 smiles 渲染异常', err))
}

// ---------- 统一处理正文里的内联 SVG（用户手写 / ASCII 改造产生的）----------
// ![[x.svg]] 由 localSvg.ts 在构建期内联并包好 .svg-figure；
// 这里负责 md 里直接写的 <svg>：套白卡片、强制深色墨水，
// 否则暗色模式下 currentColor 变白、压在图里的浅色块上会看不见。

function wrapInlineSvgs() {
  const article = document.querySelector('article') || document.body
  if (!article) return
  const svgs = Array.from(article.querySelectorAll('svg'))
  for (const svg of svgs) {
    if (svg.closest('code.mermaid')) continue
    if (svg.closest('.svg-figure')) continue
    if (svg.closest('span.svg-card')) continue
    if (svg.closest('.callout')) continue
    if (svg.closest('.graph')) continue
    if (svg.closest('.markmap-wrapper')) continue
    if (svg.closest('.molecule-wrapper')) continue
    if (svg.closest('a')) continue
    if (svg.closest('button')) continue
    const card = document.createElement('span')
    card.className = 'svg-card'
    svg.parentNode.insertBefore(card, svg)
    card.appendChild(svg)
    svg.classList.add('inlined-svg')
  }
}

// ---------- 点击放大（Mermaid + 内联 SVG 共用）----------

let diagramZoomEl = null

function diagramZoomOverlay() {
  if (diagramZoomEl) return diagramZoomEl
  const overlay = document.createElement('div')
  overlay.className = 'diagram-zoom-overlay'
  const body = document.createElement('div')
  body.className = 'diagram-zoom-body'
  const close = document.createElement('button')
  close.className = 'diagram-zoom-close'
  close.setAttribute('aria-label', '关闭')
  close.textContent = '×'
  overlay.appendChild(body)
  overlay.appendChild(close)
  document.body.appendChild(overlay)
  diagramZoomEl = overlay

  const hide = () => {
    overlay.classList.remove('is-open')
    body.innerHTML = ''
    document.body.classList.remove('diagram-zoom-lock')
  }
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) hide()
  })
  close.addEventListener('click', hide)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide()
  })
  return overlay
}

function openDiagramZoom(svg) {
  const overlay = diagramZoomOverlay()
  const body = overlay.querySelector('.diagram-zoom-body')
  if (!body) return
  body.innerHTML = ''
  const clone = svg.cloneNode(true)
  clone.removeAttribute('width')
  clone.removeAttribute('height')
  clone.style.width = '100%'
  clone.style.height = '100%'
  clone.style.maxWidth = '100%'
  body.appendChild(clone)
  overlay.classList.add('is-open')
  document.body.classList.add('diagram-zoom-lock')
}

document.addEventListener('click', (event) => {
  const target = event.target
  if (!target) return
  if (!target.closest) return
  const svg = target.closest('code.mermaid svg, figure.svg-figure svg, span.svg-card svg')
  if (!svg) return
  openDiagramZoom(svg)
})

document.addEventListener('nav', renderAllDiagrams)

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderAllDiagrams)
} else {
  renderAllDiagrams()
}

// 站点主题切换只改 html 上的 saved-theme 属性，没有自定义事件，
// 只能盯着这个属性（MEMORY.md 里记过这条）。
let diagramThemeTimer = undefined
new MutationObserver(() => {
  if (diagramThemeTimer) clearTimeout(diagramThemeTimer)
  diagramThemeTimer = setTimeout(renderAllDiagrams, 200)
}).observe(document.documentElement, { attributes: true, attributeFilter: ['saved-theme'] })
`

export const ScienceDiagrams: QuartzTransformerPlugin<Partial<ScienceDiagramsOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "ScienceDiagrams",
    textTransform(_ctx, src) {
      // 行内语法 `$smiles=CCO`（Obsidian Chem 的写法）。
      // ⚠️ 必须在 markdown 解析**之前**换成 HTML 占位符 ——
      // 否则两个 `$smiles=` 会被 remark-math 配成一对 `$...$`，
      // 中间整段变成公式（实测：`$smiles=CCO 与 苯 $smiles=c1ccccc1` 直接渲染成 KaTeX）。
      const text = src.toString()
      const lines = text.split("\n")
      let inFence = false
      let fenceChar = ""
      const out = lines.map((line) => {
        const fence = line.match(/^\s*(`{3,}|~{3,})/)
        if (fence) {
          if (!inFence) {
            inFence = true
            fenceChar = fence[1][0]
          } else if (fence[1][0] === fenceChar) {
            inFence = false
          }
          return line
        }
        if (inFence) return line

        // 行内代码里不处理：按反引号切开，只改偶数段
        return line
          .split("`")
          .map((seg, i) => {
            if (i % 2 === 1) return seg
            return seg.replace(
              /\$smiles=([^\s,;，。；、`"'<>&]+)/g,
              '<span class="smiles-inline" data-smiles="$1"></span>',
            )
          })
          .join("`")
      })
      return out.join("\n")
    },
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, _file) => {
            visit(tree, "code", (node: Code) => {
              const lang = (node.lang ?? "").toLowerCase()
              const hProperties = (node.data?.hProperties ?? {}) as Record<string, unknown>
              if (opts.mermaid && lang === "mermaid") {
                node.data = {
                  ...node.data,
                  hProperties: {
                    ...hProperties,
                    className: ["mermaid"],
                  },
                }
              }
              if (opts.smiles && lang === "smiles") {
                node.data = {
                  ...node.data,
                  hProperties: {
                    ...hProperties,
                    className: ["smiles-diagram"],
                  },
                }
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        js: [
          {
            script: scienceDiagramsScript,
            loadTime: "afterDOMReady",
            moduleType: "module",
            contentType: "inline",
          },
        ],
      }
    },
  }
}
