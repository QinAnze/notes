let isDragging = false
let dragStartX = 0
let dragStartY = 0
let initialX = 0
let initialY = 0

function toggleChat() {
  const panel = document.querySelector('.chat-panel')
  const ball = document.querySelector('.chat-ball')
  
  if (panel) {
    panel.classList.toggle('open')
  }
  
  if (ball) {
    ball.classList.toggle('active')
  }
}

function closeChat() {
  const panel = document.querySelector('.chat-panel')
  const ball = document.querySelector('.chat-ball')
  
  if (panel) {
    panel.classList.remove('open')
  }
  
  if (ball) {
    ball.classList.remove('active')
  }
}

function initChat() {
  const ball = document.querySelector('.chat-ball') as HTMLElement
  const panel = document.querySelector('.chat-panel') as HTMLElement
  const chatFloat = document.querySelector('.chat-float') as HTMLElement
  const closeBtn = document.querySelector('.chat-close')

  if (ball && chatFloat) {
    // Drag functionality
    ball.addEventListener('mousedown', (e) => {
      isDragging = true
      dragStartX = e.clientX
      dragStartY = e.clientY
      const rect = chatFloat.getBoundingClientRect()
      initialX = rect.left
      initialY = rect.top
      ball.style.cursor = 'grabbing'
      e.preventDefault()
      e.stopPropagation()
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      
      const deltaX = e.clientX - dragStartX
      const deltaY = e.clientY - dragStartY
      
      chatFloat.style.left = `${initialX + deltaX}px`
      chatFloat.style.top = `${initialY + deltaY}px`
      chatFloat.style.right = 'auto'
      chatFloat.style.bottom = 'auto'
    })

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false
        ball.style.cursor = 'move'
      }
    })

    // Click to toggle panel (only if not dragging significantly)
    ball.addEventListener('click', (e) => {
      const dx = Math.abs(e.clientX - dragStartX)
      const dy = Math.abs(e.clientY - dragStartY)
      if (dx < 5 && dy < 5) {
        toggleChat()
      }
    })
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      closeChat()
    })
  }

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!panel?.contains(e.target as Node) && !ball?.contains(e.target as Node)) {
      closeChat()
    }
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChat)
} else {
  initChat()
}
