interface TodoItem {
  id: string
  text: string
  checked: boolean
}

const STORAGE_KEY = "quartz-todo-list"

let todoList: TodoItem[] = []

function loadTodos(): TodoItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
}

function renderTodoList() {
  const listContainer = document.querySelector(".todo-list")
  if (!listContainer) return

  if (todoList.length === 0) {
    listContainer.innerHTML = '<div class="todo-empty">暂无待办事项<br/>添加一个开始吧</div>'
    return
  }

  listContainer.innerHTML = todoList
    .map(
      (item) => `
    <div class="todo-item ${item.checked ? "checked" : ""}" data-id="${item.id}">
      <input type="checkbox" ${item.checked ? "checked" : ""} />
      <label>${item.text}</label>
      <button class="todo-delete" title="删除">×</button>
    </div>
  `
    )
    .join("")

  // Add event listeners
  listContainer.querySelectorAll(".todo-item").forEach((item) => {
    const id = item.getAttribute("data-id")
    const checkbox = item.querySelector('input[type="checkbox"]')
    const deleteBtn = item.querySelector(".todo-delete")

    checkbox?.addEventListener("change", () => {
      if (id) toggleTodo(id)
    })

    item.querySelector("label")?.addEventListener("click", () => {
      if (id) toggleTodo(id)
    })

    deleteBtn?.addEventListener("click", () => {
      if (id) deleteTodo(id)
    })
  })
}

function toggleTodo(id: string) {
  todoList = todoList.map((todo) =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  )
  saveTodos()
  renderTodoList()
}

function addTodo() {
  const input = document.querySelector(".todo-input") as HTMLInputElement
  if (!input || !input.value.trim()) return

  const newTodo: TodoItem = {
    id: Date.now().toString(),
    text: input.value.trim(),
    checked: false,
  }
  todoList = [...todoList, newTodo]
  saveTodos()
  input.value = ""
  renderTodoList()
  input.focus()
}

function deleteTodo(id: string) {
  todoList = todoList.filter((todo) => todo.id !== id)
  saveTodos()
  renderTodoList()
}

function togglePanel() {
  const panel = document.querySelector(".todo-panel")
  const ball = document.querySelector(".todo-ball")
  if (panel) {
    panel.classList.toggle("open")
    ball?.classList.toggle("active")
  }
}

function closePanel() {
  const panel = document.querySelector(".todo-panel")
  const ball = document.querySelector(".todo-ball")
  if (panel) {
    panel.classList.remove("open")
    ball?.classList.remove("active")
  }
}

function handleBallClick() {
  togglePanel()
}

function initTodo() {
  todoList = loadTodos()

  const ball = document.querySelector(".todo-ball") as HTMLElement
  const panel = document.querySelector(".todo-panel") as HTMLElement
  const closeBtn = document.querySelector(".todo-close")
  const addBtn = document.querySelector(".todo-add-btn")
  const input = document.querySelector(".todo-input") as HTMLInputElement

  // Ball toggles the panel; the module itself stays docked bottom-right.
  if (ball) {
    ball.addEventListener("click", handleBallClick)
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      closePanel()
    })
  }

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (
      !panel?.contains(e.target as Node) &&
      !ball?.contains(e.target as Node)
    ) {
      closePanel()
    }
  })

  // Add button
  if (addBtn) {
    addBtn.addEventListener("click", addTodo)
  }

  // Enter to add
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addTodo()
      }
    })
  }

  renderTodoList()
}

document.addEventListener("nav", () => {
  todoList = loadTodos()
  renderTodoList()
})

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTodo)
} else {
  initTodo()
}
