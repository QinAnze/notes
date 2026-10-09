import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Quartz 4.0",
    // SPA 关闭 —— 这是**故意的**，不是漏配。
    //
    // 站点部署在 qinanze.github.io/notes/（子路径），而 SPA 的子路径路由在
    // Quartz 上游是已知 bug（issue #1572）：用 fetch 拿回目标页HTML、
    // micromorph 进当前文档后，新页面里的相对链接会丢掉 /notes 这层前缀，
    // 于是第二跳之后的链接全指向 /有机化学笔记/... 而 404。
    // 报告者的原话是「页面本身加载正确，但新页面里的链接全坏了，刷新一下就好」。
    //
    // 静态 HTML 里的 href 是正确的（`../有机化学笔记/上课笔记` 解析出来正好是
    // /notes/有机化学笔记/上课笔记），所以关掉 SPA 之后每次都是整页跳转，
    // 链接永远来自服务端 freshly 生成的正确 HTML，这类 bug 直接消失。
    //
    // 代价：没有 SPA 的顺滑过渡，每次跳转是整页加载。
    // 笔记站不值得为这个冒索引坏掉的风险。
    //
    // 想恢复：改成 true，但要接受上面这个上游 bug 还在。
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "qinanze.github.io/notes",
    ignorePatterns: ["private", "templates"],
    theme: {
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8fbff",
          lightgray: "#e2e8f0",
          gray: "#94a3b8",
          darkgray: "#334155",
          dark: "#0f172a",
          secondary: "#2563eb",
          tertiary: "#3b82f6",
          highlight: "rgba(59, 130, 246, 0.08)",
        },
        darkMode: {
          light: "#0f172a",
          lightgray: "#1e293b",
          gray: "#64748b",
          darkgray: "#cbd5e1",
          dark: "#f8fafc",
          secondary: "#60a5fa",
          tertiary: "#93c5fd",
          highlight: "rgba(96, 165, 250, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      // 把 static/molecules.json 发到 public/static/，侧栏「结构演示」组件要 fetch 它。
      // ⚠️ 上游的 Plugin.Static 只从 quartz/static/ 复制，
      // 放在项目根的 static/ 必须靠这个 emitter 才能进 build 产物。
      Plugin.MoleculeData(),
      Plugin.Assets(),
      Plugin.Static(),
    ],
  },
}

export default config
