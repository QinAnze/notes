import { Transformer } from "markmap-lib"
import { Markmap } from "markmap-view"
import { isZoomOverlayOpen, setupZoomOverlay } from "./zoom"

const SVG_NS = "http://www.w3.org/2000/svg"

// 两份实例分开管：侧栏那份、放大浮层那份
let markmapInstance: any = null
let zoomMarkmapInstance: any = null

// Transformer 无状态，建一次就够
const transformer = new Transformer()

function isDarkTheme(): boolean {
  const saved = document.documentElement.getAttribute("saved-theme")
  if (saved === "dark") return true
  if (saved === "light") return false
  // 未设置时回退到系统偏好
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function textColor(): string {
  return isDarkTheme() ? "#e0e0e0" : "#333"
}

/**
 * 从当前文章的小标题抽出一棵树（markdown 列表形式，缩进 = 标题层级）。
 * ⚠️ 抽不到任何标题时返回空串 —— 调用方据此把整块移除。
 */
function buildMarkmapContent(): string {
  const article = document.querySelector("article")
  if (!article) return ""

  const lines: string[] = []
  const headings = article.querySelectorAll("h1, h2, h3, h4, h5, h6")

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1])
    const indent = "  ".repeat(level - 1)

    const clone = heading.cloneNode(true) as HTMLElement
    const anchors = clone.querySelectorAll("a")
    anchors.forEach((a) => a.remove())

    let text = clone.textContent?.trim() || ""
    text = text
      .replace(/§/g, "")
      .replace(/¶/g, "")
      .replace(/¶/g, "")
      .replace(/\u00A7/g, "")
      .replace(/\u00B6/g, "")
      .trim()

    if (text) {
      lines.push(`${indent}- ${text}`)
    }
  })

  return lines.join("\n")
}

/** 主题色。maxWidth 是单个节点块的宽度上限，浮层宽，给大一点少折行。 */
function markmapOptions(maxWidth: number): any {
  const isDark = isDarkTheme()
  return {
    theme: {
      color: {
        // bg0/bg1/bg2 全透明 —— 节点不画卡片底色，只留文字和连线，
        // 和上方双向链接图谱同一套视觉，背景图能直接透上来。
        // markmap.scss 里还有一条 background-color: transparent !important 兜底，
        // 改这里之前先看那条，两边会打架。
        bg0: "transparent",
        bg1: "transparent",
        bg2: "transparent",
        border: isDark ? "#444" : "#ddd",
        text: textColor(),
        textSecondary: isDark ? "#a0a0a0" : "#666",
        highlight: "#667eea",
        link: "#667eea",
      },
      font: {
        sans: "inherit",
        serif: "inherit",
        mono: "inherit",
      },
      spacing: {
        padding: 8,
        radius: 4,
      },
    },
    autoFit: true,
    duration: 300,
    jsonOptions: {
      initialExpandLevel: -1,
      maxWidth,
    },
  }
}

/**
 * markmap 的文字颜色一半落在 <text> 上，一半落在 foreignObject 里的 div/span 上，
 * 而且渲染是异步的（duration: 300 的过渡），所以 100ms / 500ms 各补一次。
 */
function applyTextColor(svg: SVGSVGElement) {
  const color = textColor()

  svg.querySelectorAll("text").forEach((textEl) => {
    textEl.setAttribute("fill", color)
  })

  svg.querySelectorAll("foreignObject").forEach((fo) => {
    const contentDoc = fo.querySelector("div")
    if (!contentDoc) return
    contentDoc.style.color = color
    contentDoc.style.fill = color
    contentDoc.querySelectorAll("span").forEach((span) => {
      span.style.color = color
    })
  })
}

/**
 * 建一个 markmap 实例。
 *
 * width 传字符串是为了侧栏那份继续用 "100%"（和 markmap.scss 里
 * `.markmap-container .markmap > svg { width: 100% }` 保持一致），
 * 放大浮层那份则给具体像素值。
 */
function createMarkmap(
  svg: SVGSVGElement,
  width: string,
  height: number,
  maxWidth: number,
): any {
  const { root } = transformer.transform(buildMarkmapContent())

  svg.setAttribute("width", width)
  svg.setAttribute("height", String(height))
  svg.style.width = width
  // 高度必须和 markmap.scss 里 .markmap-container 的 680px 一致。
  // 这里的 inline style 优先级高于 CSS，只改一边容器底部会空出一截。
  svg.style.height = height + "px"

  const mm = Markmap.create(svg, markmapOptions(maxWidth), root)
  setTimeout(() => applyTextColor(svg), 100)
  setTimeout(() => applyTextColor(svg), 500)
  return mm
}

function renderMarkmap() {
  const container = document.getElementById("markmap-container") as HTMLElement | null
  if (!container) return

  const content = buildMarkmapContent()
  if (!content) {
    const wrapper = document.querySelector(".markmap-wrapper")
    if (wrapper) wrapper.remove()
    return
  }

  if (markmapInstance) {
    markmapInstance.destroy()
    markmapInstance = null
  }

  container.innerHTML = ""

  const svg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement
  container.appendChild(svg)
  markmapInstance = createMarkmap(svg, "100%", 680, 280)
}

// ---------------------------------------------------------------------------
// 放大浮层
// ---------------------------------------------------------------------------

function destroyZoomMarkmap() {
  if (zoomMarkmapInstance) {
    zoomMarkmapInstance.destroy()
    zoomMarkmapInstance = null
  }
}

/**
 * 浮层内容：**在浮层里重新建一份 markmap**，而不是把侧栏那份拉伸。
 * 拉伸只是让字变大（而且侧栏那份又高又窄，等比放大的倍率还不到 1.2×）；
 * 重建才能按浮层的宽高重新排版，真正多看到结构。
 *
 * ⚠️ 建实例前浮层必须已经显示出来（zoom.ts 里加了 .active 才调这里），
 * 否则容器尺寸是 0，autoFit 会算出乱七八糟的缩放。
 */
function buildZoomMarkmap(body: HTMLElement): () => void {
  destroyZoomMarkmap()

  if (!buildMarkmapContent()) return destroyZoomMarkmap

  const width = body.clientWidth || Math.round(window.innerWidth * 0.86)
  const height = body.clientHeight || Math.round(window.innerHeight * 0.78)

  const svg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement
  body.appendChild(svg)

  zoomMarkmapInstance = createMarkmap(svg, `${width}px`, height, 420)
  return destroyZoomMarkmap
}

let zoomBound = false
function ensureZoomOverlay() {
  if (zoomBound) return
  zoomBound = setupZoomOverlay({
    buttonId: "markmap-zoom-icon",
    overlayId: "markmap-zoom-outer",
    bodyId: "markmap-zoom-body",
    build: buildZoomMarkmap,
  })
}

// ---------------------------------------------------------------------------
// 启动
// ---------------------------------------------------------------------------

document.addEventListener("nav", () => {
  setTimeout(() => {
    renderMarkmap()
    ensureZoomOverlay()
  }, 300)
})

// 主题切换时重新渲染，保证文字颜色跟随明暗模式
let themeObserverTimer: number | null = null
const themeObserver = new MutationObserver(() => {
  if (themeObserverTimer !== null) {
    window.clearTimeout(themeObserverTimer)
  }
  themeObserverTimer = window.setTimeout(() => {
    renderMarkmap()
    // 浮层开着的话，浮层那份也得重建 —— 主题色是写在实例的 theme 里的，
    // 不重建的话切主题后浮层里还是旧配色。
    if (isZoomOverlayOpen("markmap-zoom-outer")) {
      const body = document.getElementById("markmap-zoom-body")
      if (body) {
        destroyZoomMarkmap()
        body.innerHTML = ""
        buildZoomMarkmap(body)
      }
    }
    themeObserverTimer = null
  }, 150)
})
themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["saved-theme"],
})

function boot() {
  renderMarkmap()
  ensureZoomOverlay()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot)
} else {
  boot()
}
