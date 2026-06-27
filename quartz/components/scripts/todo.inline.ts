interface TodoItem {
  id: string
  text: string
  checked: boolean
}

const STORAGE_KEY = "quartz-todo-list"

let todoList: TodoItem[] = []
let isDragging = false
let dragTarget: HTMLElement | null = null
let dragStartX = 0
let dragStartY = 0
let initialLeft = 0
let initialTop = 0

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

function startDrag(e: MouseEvent, target: HTMLElement) {
  isDragging = true
  dragTarget = target
  dragStartX = e.clientX
  dragStartY = e.clientY
  
  const todoFloat = document.querySelector(".todo-float") as HTMLElement
  if (todoFloat) {
    const rect = todoFloat.getBoundingClientRect()
    initialLeft = rect.left
    initialTop = rect.top
    todoFloat.style.transform = "none"
  }
  
  e.preventDefault()
  e.stopPropagation()
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging || !dragTarget) return

  const todoFloat = document.querySelector(".todo-float") as HTMLElement
  if (!todoFloat) return

  const deltaX = e.clientX - dragStartX
  const deltaY = e.clientY - dragStartY

  todoFloat.style.left = `${initialLeft + deltaX}px`
  todoFloat.style.top = `${initialTop + deltaY}px`
  todoFloat.style.right = "auto"
  todoFloat.style.bottom = "auto"
}

function handleMouseUp() {
  if (isDragging) {
    isDragging = false
    dragTarget = null
  }
}

function handleBallClick(e: MouseEvent) {
  const startX = dragStartX
  const startY = dragStartY
  
  setTimeout(() => {
    if (Math.abs(e.clientX - startX) < 5 && Math.abs(e.clientY - startY) < 5) {
      togglePanel()
    }
  }, 0)
}

function initTodo() {
  todoList = loadTodos()

  const ball = document.querySelector(".todo-ball") as HTMLElement
  const header = document.querySelector(".todo-header") as HTMLElement
  const todoFloat = document.querySelector(".todo-float") as HTMLElement
  const panel = document.querySelector(".todo-panel") as HTMLElement
  const closeBtn = document.querySelector(".todo-close")
  const addBtn = document.querySelector(".todo-add-btn")
  const input = document.querySelector(".todo-input") as HTMLInputElement

  // Initial position - bottom center
  if (todoFloat) {
    todoFloat.style.left = "50%"
    todoFloat.style.top = "auto"
    todoFloat.style.bottom = "20px"
    todoFloat.style.right = "auto"
    todoFloat.style.transform = "translateX(-50%)"
  }

  // Drag on ball
  if (ball && todoFloat) {
    ball.addEventListener("mousedown", (e) => startDrag(e, ball))
    ball.addEventListener("click", handleBallClick)
  }

  // Drag on header
  if (header && todoFloat) {
    header.addEventListener("mousedown", (e) => startDrag(e, header))
  }

  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)

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
