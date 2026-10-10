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

      {/* 「放大」按钮，和双向链接图谱 / 思维导图共用一套样式与逻辑。
          2D 画好 SVG、或 3D 模型加载完之后才显示（在那之前脚本挂着 .is-hidden）。 */}
      <svg
        class="zoom-btn is-hidden"
        id="molecule-zoom-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="button"
        aria-label="放大结构式"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>

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

      <div class="zoom-overlay" id="molecule-zoom-outer">
        <div class="zoom-overlay-inner">
          <div class="zoom-overlay-body" id="molecule-zoom-body"></div>
        </div>
      </div>
    </div>
  )
}

MoleculeViewer.css = style
MoleculeViewer.afterDOMLoaded = script

export default (() => MoleculeViewer) satisfies QuartzComponentConstructor
