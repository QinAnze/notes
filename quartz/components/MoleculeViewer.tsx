import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/molecule.scss"
import script from "./scripts/molecule.inline"

// 注意 displayClass：layout 里用 DesktopOnly(...) 包了本组件，
// 而 DesktopOnly 只是把 css / afterDOMLoaded 复制一份再传一个 displayClass 进来，
// **组件自己必须把这个 class 放到最外层元素上**，否则移动端不会被隐藏。
//
// 另外初始 style 是 display:none —— 本页没有可演示结构时脚本会保持隐藏，
// 加这个初始值是为了避免「框先闪一下再消失」。
function MoleculeViewer({ displayClass }: QuartzComponentProps) {
  return (
    <div
      class={`molecule-wrapper ${displayClass ?? ""}`}
      id="molecule-wrapper"
      style={{ display: "none" }}
    >
      <h3>结构演示</h3>

      <div class="molecule-head">
        <span class="molecule-title" id="molecule-title">
          结构演示
        </span>
        <span class="molecule-group" id="molecule-group"></span>
      </div>

      <div class="molecule-view" id="molecule-view">
        <div class="molecule-hint" id="molecule-hint">
          正在加载渲染器…
        </div>
      </div>

      <div class="molecule-meta" id="molecule-meta"></div>

      <div class="molecule-ctrl">
        <button class="molecule-btn" id="molecule-prev" title="上一个结构" aria-label="上一个">
          ◀
        </button>
        <span class="molecule-index" id="molecule-index">
          0 / 0
        </span>
        <button class="molecule-btn" id="molecule-next" title="下一个结构" aria-label="下一个">
          ▶
        </button>
        <button class="molecule-btn molecule-btn-mode" id="molecule-mode" title="切换 2D / 3D">
          看 3D
        </button>
      </div>

      <div class="molecule-tip" id="molecule-tip"></div>
    </div>
  )
}

MoleculeViewer.css = style
MoleculeViewer.afterDOMLoaded = script

export default (() => MoleculeViewer) satisfies QuartzComponentConstructor
