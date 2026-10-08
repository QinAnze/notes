// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Body({ children }: QuartzComponentProps) {
  return (
    <>
      {/* 背景层：亮/暗两张图叠在一起，切换主题时交叉淡入淡出而不是硬替换。
          tint（着色层）压在两张图之上，负责压暗/提亮对比度。*/}
      <div class="bg-stack" aria-hidden="true">
        <div class="bg-layer bg-image-light" />
        <div class="bg-layer bg-image-dark" />
        <div class="bg-tint" />
      </div>
      <div id="quartz-body">{children}</div>
    </>
  )
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor