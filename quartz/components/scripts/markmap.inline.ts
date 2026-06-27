import { Transformer } from "markmap-lib"
import { Markmap } from "markmap-view"

let markmapInstance: any = null

function isDarkTheme(): boolean {
  const saved = document.documentElement.getAttribute("saved-theme")
  if (saved === "dark") return true
  if (saved === "light") return false
  // 未设置时回退到系统偏好
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

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
    anchors.forEach(a => a.remove())
    
    let text = clone.textContent?.trim() || ""
    text = text.replace(/§/g, "").replace(/¶/g, "").replace(/¶/g, "").replace(/\u00A7/g, "").replace(/\u00B6/g, "").trim()
    
    if (text) {
      lines.push(`${indent}- ${text}`)
    }
  })

  return lines.join("\n")
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

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("width", "100%")
  svg.setAttribute("height", "520")
  svg.style.width = "100%"
  svg.style.height = "520px"
  container.appendChild(svg)

  const transformer = new Transformer()
  const { root } = transformer.transform(content)

  const isDark = isDarkTheme()

  const textColor = isDark ? "#e0e0e0" : "#333"

  markmapInstance = Markmap.create(svg, {
    theme: {
      color: {
        bg0: "transparent",
        bg1: isDark ? "#1a1a1a" : "#f8f8f8",
        bg2: isDark ? "#2a2a2a" : "#f0f0f0",
        border: isDark ? "#444" : "#ddd",
        text: textColor,
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
      maxWidth: 280,
    },
  }, root)

  const applyTextColor = () => {
    const textElements = svg.querySelectorAll("text")
    textElements.forEach((textEl) => {
      textEl.setAttribute("fill", textColor)
    })
    
    const foreignObjects = svg.querySelectorAll("foreignObject")
    foreignObjects.forEach((fo) => {
      const contentDoc = fo.querySelector("div")
      if (contentDoc) {
        contentDoc.style.color = textColor
        contentDoc.style.fill = textColor
        const spans = contentDoc.querySelectorAll("span")
        spans.forEach((span) => {
          span.style.color = textColor
        })
      }
    })
  }

  setTimeout(applyTextColor, 100)
  setTimeout(applyTextColor, 500)
}

document.addEventListener("nav", () => {
  setTimeout(renderMarkmap, 300)
})

// 主题切换时重新渲染，保证文字颜色跟随明暗模式
let themeObserverTimer: number | null = null
const themeObserver = new MutationObserver(() => {
  if (themeObserverTimer !== null) {
    window.clearTimeout(themeObserverTimer)
  }
  themeObserverTimer = window.setTimeout(() => {
    renderMarkmap()
    themeObserverTimer = null
  }, 150)
})
themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["saved-theme"],
})

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderMarkmap)
} else {
  renderMarkmap()
}