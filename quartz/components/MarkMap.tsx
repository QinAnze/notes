import { QuartzComponentConstructor } from "./types"
import style from "./styles/markmap.scss"
import script from "./scripts/markmap.inline"

function MarkMap() {
  return (
    <div class="markmap-wrapper">
      <h3>思维导图</h3>
      <div id="markmap-container" class="markmap-container"></div>
    </div>
  )
}

MarkMap.css = style
MarkMap.afterDOMLoaded = script

export default (() => MarkMap) satisfies QuartzComponentConstructor
