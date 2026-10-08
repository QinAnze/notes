import { QuartzComponentConstructor } from "./types"
// @ts-ignore —— bootstrap-cli.mjs 的 inline-script-loader 会剥掉 .inline.ts 的
// export 并按文本处理，所以这个文件没有模块成员。同 Body.tsx 的写法。
import script from "./scripts/sitefx.inline"

// 纯脚本组件，不渲染任何 DOM。
//
// 为什么必须独立成组件：滚动虚化和返回按钮原本都写在 spa.inline.ts 里，
// 但 quartz.config.ts 的 `enableSPA: false` 会让 componentResources.ts
// 走 else 分支、整段跳过 spaRouterScript —— 脚本根本不进 postscript.js，
// 于是这段跟SPA 毫无关系的代码静默失效（没有任何报错）。
//
// 挂在 layout 上的组件由 getComponentResources() 无条件收集，与 SPA 开关解耦。
function SiteFx() {
  return null
}

SiteFx.afterDOMLoaded = script

export default (() => SiteFx) satisfies QuartzComponentConstructor