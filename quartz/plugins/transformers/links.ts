import { QuartzTransformerPlugin } from "../types"
import {
  FullSlug,
  RelativeURL,
  SimpleSlug,
  TransformOptions,
  _stripSlashes,
  joinSegments,
  simplifySlug,
  splitAnchor,
  transformLink,
} from "../../util/path"
import path from "path"
import { visit } from "unist-util-visit"
import isAbsoluteUrl from "is-absolute-url"

interface Options {
  /** How to resolve Markdown paths */
  markdownLinkResolution: TransformOptions["strategy"]
  /** Strips folders from a link so that it looks nice */
  prettyLinks: boolean
}

const defaultOptions: Options = {
  markdownLinkResolution: "absolute",
  prettyLinks: true,
}

export const CrawlLinks: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LinkProcessing",
    htmlPlugins(ctx) {
      return [
        () => {
          return (tree, file) => {
            const curSlug = simplifySlug(file.data.slug!)
            const outgoing: Set<SimpleSlug> = new Set()

            const transformOptions: TransformOptions = {
              strategy: opts.markdownLinkResolution,
              allSlugs: ctx.allSlugs,
            }

            visit(tree, "element", (node, _index, _parent) => {
              // rewrite all links
              if (
                node.tagName === "a" &&
                node.properties &&
                typeof node.properties.href === "string"
              ) {
                let dest = node.properties.href as RelativeURL
                node.properties.className ??= []
                node.properties.className.push(isAbsoluteUrl(dest) ? "external" : "internal")

                // don't process external links or intra-document anchors
                if (!(isAbsoluteUrl(dest) || dest.startsWith("#"))) {
                  dest = node.properties.href = transformLink(
                    file.data.slug!,
                    dest,
                    transformOptions,
                  )
                  const url = new URL(dest, `https://base.com/${curSlug}`)
                  let [destCanonical, _destAnchor] = splitAnchor(url.pathname)

                  // 文件夹链接的 pathname 末尾带斜杠，补回 "index" 才能和
                  // contentIndex.json 的 key（形如 `xxx/index`）对上
                  if (destCanonical.endsWith("/")) {
                    destCanonical += "index"
                  }

                  // 这里必须 decodeURIComponent —— WHATWG URL 会把路径里的所有
                  // 非 ASCII 字符百分号编码。不解码的话，中文文件名存进 links 后
                  // 是 `%E6%9C%89%E6%9C%BA...`，与 contentIndex.json 里的原始 key
                  // 永远匹配不上，表现为图谱全是孤立点、Backlinks 全空。
                  // 见上游 issue #397。
                  const full = decodeURIComponent(_stripSlashes(destCanonical, true)) as FullSlug
                  const simple = simplifySlug(full)
                  outgoing.add(simple)
                }

                // rewrite link internals if prettylinks is on
                if (
                  opts.prettyLinks &&
                  node.children.length === 1 &&
                  node.children[0].type === "text" &&
                  !node.children[0].value.startsWith("#")
                ) {
                  node.children[0].value = path.basename(node.children[0].value)
                }
              }

              // transform all other resources that may use links
              if (
                ["img", "video", "audio", "iframe"].includes(node.tagName) &&
                node.properties &&
                typeof node.properties.src === "string"
              ) {
                if (!isAbsoluteUrl(node.properties.src)) {
                  let dest = node.properties.src as RelativeURL
                  dest = node.properties.src = transformLink(
                    file.data.slug!,
                    dest,
                    transformOptions,
                  )
                  node.properties.src = dest
                }
              }
            })

            file.data.links = [...outgoing]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    links: SimpleSlug[]
  }
}
