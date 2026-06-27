import { QuartzComponentConstructor } from "./types"
import style from "./styles/todo.scss"
import script from "./scripts/todo.inline"

function Todo() {
  return (
    <div class="todo-float" data-spa-preserve="true" id="todo-component">
      <div class="todo-ball">待办</div>
      <div class="todo-panel">
        <div class="todo-header">
          <span class="todo-title">待办事项</span>
          <button class="todo-close">×</button>
        </div>
        <div class="todo-input-container">
          <input
            type="text"
            class="todo-input"
            placeholder="添加待办..."
          />
          <button class="todo-add-btn">添加</button>
        </div>
        <div class="todo-list"></div>
      </div>
    </div>
  )
}

Todo.css = style
Todo.afterDOMLoaded = script

export default (() => Todo) satisfies QuartzComponentConstructor
