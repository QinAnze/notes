import { QuartzComponentConstructor } from "./types"
import style from "./styles/markmap.scss"
import script from "./scripts/markmap.inline"

function MarkMap() {
  return (
    <div class="markmap-wrapper">
      <h3>思维导图</h3>
      {/* 「放大」按钮，和双向链接图谱 / 结构演示共用一套样式与逻辑 */}
      <svg
        class="zoom-btn"
        id="markmap-zoom-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="button"
        aria-label="放大思维导图"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
      <div id="markmap-container" class="markmap-container"></div>
      <div class="zoom-overlay" id="markmap-zoom-outer">
        <div class="zoom-overlay-inner">
          <div class="zoom-overlay-body" id="markmap-zoom-body"></div>
        </div>
      </div>
    </div>
  )
}

MarkMap.css = style
MarkMap.afterDOMLoaded = script

export default (() => MarkMap) satisfies QuartzComponentConstructor
