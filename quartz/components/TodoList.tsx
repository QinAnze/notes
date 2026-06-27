import { QuartzComponentConstructor } from "./types"
import { useState, useEffect } from "preact/hooks"
import style from "./styles/todoList.scss"

interface TodoItem {
  id: string
  text: string
  checked: boolean
}

const STORAGE_KEY = "quartz-todo-list"

function loadTodos(): TodoItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveTodos(todos: TodoItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function TodoListComponent() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setTodos(loadTodos())
  }, [])

  useEffect(() => {
    const handleNav = () => {
      setTimeout(() => {
        setTodos(loadTodos())
      }, 100)
    }
    document.addEventListener("nav", handleNav)
    return () => document.removeEventListener("nav", handleNav)
  }, [])

  const toggleTodo = (id: string) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )
    setTodos(updated)
    saveTodos(updated)
  }

  const addTodo = () => {
    if (!inputValue.trim()) return
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      checked: false,
    }
    const updated = [...todos, newTodo]
    setTodos(updated)
    saveTodos(updated)
    setInputValue("")
  }

  const deleteTodo = (id: string) => {
    const updated = todos.filter((todo) => todo.id !== id)
    setTodos(updated)
    saveTodos(updated)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <div class="todo-list-container">
      <div class="todo-list-header">
        <span>待办事项</span>
      </div>

      <div class="todo-list-input-container">
        <input
          type="text"
          class="todo-list-input"
          placeholder="添加待办..."
          value={inputValue}
          onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
          onKeyDown={handleKeyDown}
        />
        <button class="todo-list-add-btn" onClick={addTodo}>
          添加
        </button>
      </div>

      <div class="todo-list-items">
        {todos.length === 0 ? (
          <div class="todo-list-empty">暂无待办事项</div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              class={`todo-list-item ${todo.checked ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => toggleTodo(todo.id)}
              />
              <label onClick={() => toggleTodo(todo.id)}>{todo.text}</label>
              <button class="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const TodoList: QuartzComponentConstructor = () => TodoListComponent
TodoList.css = style

export default TodoList
