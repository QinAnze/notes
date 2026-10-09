import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.TableOfContents()),
    // 结构演示：只在当前这篇笔记里挑可演示的结构（靠 location + contentIndex 匹配），
    // 匹配不到就整块隐藏。用 DesktopOnly 包住 —— 移动端加载 RDKit 的 WASM 太重。
    // 视觉与右栏的图谱/思维导图一致：同样的边框圆角、同样的透明背景。
    Component.DesktopOnly(Component.MoleculeViewer()),
  ],
  // 关系图谱在上、思维导图在下。侧栏可滚动由 custom.scss 处理
  // （两个加起来约 1000px，会超过一屏）。
  //
  // 侧栏这个直接渲染**全局图**（depth: -1 = 全库节点），
  // 而不是默认的「只看当前页 ±1 层」——局部图对笔记仓库没意义，
  // 而全库图能一眼看出三门课之间的连通情况。
  // 全屏浮层那份图更大更稀疏，用来看细节。
  right: [
    Component.Graph({
      // 侧栏这份渲染全库图（depth: -1 = content/ 下所有节点）。
      // 力学参数比官方默认收紧不少，因为默认的排斥力是按"少量节点"调的，
      // 60+ 节点全塞进 380px 宽的侧栏会散成一片看不到结构。
      // 想调松紧就改这四个数：
      //   repelForce  排斥力（越小越聚）
      //   linkDistance 连线长度（越小越聚）
      //   centerForce 向心力（越大越聚）
      //   scale       缩放（越大看起来越近）
      localGraph: {
        depth: -1,
        scale: 0.7,
        repelForce: 0.7,
        centerForce: 0.4,
        linkDistance: 18,
        fontSize: 0.5,
        // 标签透明度 = (opacityScale - 1) / 3.75。1.5 ≈ 0.13，
        // 刚好能看出是什么字但不会抢节点的视觉焦点
        opacityScale: 1.5,
      },
      globalGraph: {
        depth: -1,
        scale: 1,
        repelForce: 0.7,
        centerForce: 0.35,
        linkDistance: 45,
        fontSize: 0.7,
        opacityScale: 1.5,
      },
    }),
    Component.MarkMap(),
  ],
  // SiteFx 负责滚动虚化（body.scrolled -> 背景层 blur）和顶栏返回按钮。
  // 必须在 layout 里注册，componentResources 才会把它的 afterDOMLoaded 打进
  // postscript —— 放进 spa.inline.ts 的话 enableSPA: false 时会被整段跳过。
  afterBody: [Component.SiteFx(), Component.Timer(), Component.Todo()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  // 列表页（首页、文件夹、标签）不重复渲染图谱 —— 全局图谱入口
  // 在任意笔记页右上角的小图标上，这里再放一份纯属浪费
  right: [],
  afterBody: [Component.SiteFx(), Component.Timer(), Component.Todo()],
}
