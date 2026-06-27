import { QuartzComponentConstructor } from "./types"
import style from "./styles/chat.scss"
import script from "./scripts/chat.inline"

function Chat() {
  return (
    <div class="chat-float">
      <div class="chat-ball">豆姐</div>
      <div class="chat-panel">
        <div class="chat-header">
          <span class="chat-title">豆姐 AI 助手</span>
          <button class="chat-close">×</button>
        </div>
        <div class="chat-content">
          <iframe 
            src="https://www.doubao.com/chat/" 
            title="豆包聊天"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

Chat.css = style
Chat.afterDOMLoaded = script

export default (() => Chat) satisfies QuartzComponentConstructor
