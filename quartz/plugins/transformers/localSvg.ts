import { QuartzTransformerPlugin } from "../types"
import { Root, Link, Image } from "mdast"
import { visit, SKIP } from "unist-util-visit"
import fs from "fs"
import path from "path"

/**
 * 把 `![[xxx.svg]]` 引用的本地 SVG 内联进页面。
 *
 * 为什么需要：
 * Quartz 的 OFM 会把 `![[x.svg]]` 变成 `<a><img src="x.svg"></a>`，
 * 而 `<img>` 里的 SVG 是独立文档 —— 页面 CSS 管不到它，
 * `var(--dark)` / `currentColor` 全部失效，暗色模式下文字和线条经常直接看不见。
 * 内联之后，SVG 的 `var(...)` 能解析到站点主题变量，`currentColor` 也能跟随。
 *
 * 只处理 content 目录下真实存在的 `.svg`；找不到或太大就原样保留。
 */

const MAX_SVG_BYTES = 200 * 1024

// Obsidian 主题变量 → Quartz 主题变量（fallback 保留，非 Quartz 环境也能看）
const VAR_REPLACEMENTS: [RegExp, string][] = [
  [/var\(--color-text-primary,[^)]*\)/g, "var(--dark, #1a1a1a)"],
  [/var\(--color-text-secondary,[^)]*\)/g, "var(--darkgray, #4b5563)"],
  [/var\(--color-text-tertiary,[^)]*\)/g, "var(--gray, #6b7280)"],
  [/var\(--color-border-tertiary,[^)]*\)/g, "var(--lightgray, #e5e7eb)"],
  [/var\(--background-primary,[^)]*\)/g, "transparent"],
  [/var\(--font-sans,[^)]*\)/g, "var(--bodyFont, sans-serif)"],
]

function collectSvgs(dir: string, out: Map<string, string>) {
  let entries: fs.Dirent[] = []
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue
      collectSvgs(full, out)
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".svg")) {
      // 只按文件名匹配：本站约定全库素材文件名唯一
      out.set(entry.name.toLowerCase(), full)
    }
  }
}

export const LocalSvgInline: QuartzTransformerPlugin = () => {
  return {
    name: "LocalSvgInline",
    markdownPlugins(ctx) {
      const svgs = new Map<string, string>()
      collectSvgs(ctx.argv.directory, svgs)

      return [
        () => {
          return (tree: Root) => {
            visit(tree, "link", (node: Link, index, parent) => {
              if (!parent || typeof index !== "number") return
              if (node.children.length !== 1) return
              const child = node.children[0]
              if (child.type !== "image") return

              const img = child as Image
              const url = (img.url ?? "").split("?")[0]
              if (!url.toLowerCase().endsWith(".svg")) return

              const name = decodeURIComponent(path.basename(url)).toLowerCase()
              const abs = svgs.get(name)
              if (!abs) return

              let raw: string
              try {
                const stat = fs.statSync(abs)
                if (stat.size > MAX_SVG_BYTES) return
                raw = fs.readFileSync(abs, "utf8")
              } catch {
                return
              }
              if (!raw.includes("<svg")) return

              for (const [re, rep] of VAR_REPLACEMENTS) {
                raw = raw.replace(re, rep)
              }
              // 统一尺寸行为：宽度交给 CSS，高度按比例
              raw = raw.replace(/<svg\b([^>]*)>/, (_m, attrs: string) => {
                let a = attrs
                a = a.replace(/\swidth="[^"]*"/g, "").replace(/\sheight="[^"]*"/g, "")
                return `<svg${a} class="inlined-svg" preserveAspectRatio="xMidYMid meet">`
              })

              parent.children[index] = {
                type: "html",
                value: `<figure class="svg-figure" data-svg="${name}">${raw}</figure>`,
              }
              return SKIP
            })
          }
        },
      ]
    },
  }
}
