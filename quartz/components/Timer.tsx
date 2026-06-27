import { QuartzComponentConstructor } from "./types"
import style from "./styles/timer.scss"
import script from "./scripts/timer.inline"

function Timer() {
  return (
    <div class="timer-float">
      <div class="timer-ball">25:00</div>
      <div class="timer-panel">
        <div class="timer-header">
          <span class="timer-title">⏱️ 计时器</span>
          <button class="timer-close">×</button>
        </div>
        <div class="timer-progress">
          <div class="timer-progress-bar"></div>
        </div>
        <div class="timer-display">
          <div class="timer-time">25:00</div>
          <div class="timer-mode">专注模式</div>
        </div>
        <div class="timer-modes">
          <button class="timer-mode-btn active" data-mode="pomodoro">专注</button>
          <button class="timer-mode-btn" data-mode="shortBreak">短休息</button>
          <button class="timer-mode-btn" data-mode="longBreak">长休息</button>
          <button class="timer-mode-btn" data-mode="custom">自定义</button>
        </div>
        <div class="timer-custom">
          <label>自定义时长（分钟）</label>
          <input type="number" value="25" min="1" max="120" />
        </div>
        <div class="timer-controls">
          <button class="timer-btn start">开始</button>
          <button class="timer-btn reset">重置</button>
        </div>
      </div>
    </div>
  )
}

Timer.css = style
Timer.afterDOMLoaded = script

export default (() => Timer) satisfies QuartzComponentConstructor
