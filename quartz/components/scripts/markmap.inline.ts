import { Transformer } from "markmap-lib"
import { Markmap } from "markmap-view"

let markmapInstance: any = null

function buildMarkmapContent(): string {
  const article = document.querySelector("article")
  if (!article) return ""

  const lines: string[] = []
  const headings = article.querySelectorAll("h1, h2, h3, h4, h5, h6")

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1])
    const indent = "  ".repeat(level - 1)
    const text = heading.textContent?.trim() || ""
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
  svg.setAttribute("height", "300")
  svg.style.width = "100%"
  svg.style.height = "300px"
  container.appendChild(svg)

  const transformer = new Transformer()
  const { root } = transformer.transform(content)

  markmapInstance = Markmap.create(svg, null, root)
}

document.addEventListener("nav", () => {
  setTimeout(renderMarkmap, 300)
})

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderMarkmap)
} else {
  renderMarkmap()
}
