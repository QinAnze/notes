import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/radio.scss"
import script from "./scripts/radio.inline"

const Radio: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  return (
    <div id="radio-player" data-spa-preserve>
      <div class="radio-container">
        <div class="radio-info">
          <span class="radio-icon">📻</span>
          <span class="radio-title">复习电台</span>
          <span class="radio-song-name" id="radio-song-name">未播放</span>
        </div>
        <div class="radio-controls">
          <button class="radio-btn" id="radio-prev" title="上一首">⏮</button>
          <button class="radio-btn radio-play-btn" id="radio-play" title="播放">▶</button>
          <button class="radio-btn" id="radio-next" title="下一首">⏭</button>
        </div>
        <div class="radio-progress">
          <div class="radio-progress-bar" id="radio-progress-bar">
            <div class="radio-progress-fill" id="radio-progress-fill"></div>
          </div>
          <span class="radio-time" id="radio-time">00:00 / 00:00</span>
        </div>
        <div class="radio-volume">
          <span class="radio-volume-icon">🔊</span>
          <input type="range" id="radio-volume" min="0" max="100" value="80" />
        </div>
      </div>
    </div>
  )
}

Radio.css = style
Radio.afterDOMLoaded = script

export default (() => Radio) as QuartzComponentConstructor