interface TimerState {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak' | 'custom'
  duration: number
  remaining: number
  isRunning: boolean
  customMinutes: number
  /** Wall-clock time of the last save, used to recover elapsed time across reloads */
  timestamp?: number
}

const POMODORO_MINUTES = 25
const SHORT_BREAK_MINUTES = 5
const LONG_BREAK_MINUTES = 15

let timerState: TimerState = {
  mode: 'pomodoro',
  duration: POMODORO_MINUTES * 60,
  remaining: POMODORO_MINUTES * 60,
  isRunning: false,
  customMinutes: 25,
}

let timerInterval: number | null = null

function saveState() {
  localStorage.setItem('quartz-timer', JSON.stringify({ ...timerState, timestamp: Date.now() }))
}

function loadState(): TimerState | null {
  try {
    const saved = localStorage.getItem('quartz-timer')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    console.warn('Failed to load timer state')
  }
  return null
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function updateDisplay() {
  const ball = document.querySelector('.timer-ball')
  const timeDisplay = document.querySelector('.timer-time')
  const modeDisplay = document.querySelector('.timer-mode')
  const progressBar = document.querySelector('.timer-progress-bar')
  const customInput = document.querySelector('.timer-custom input')

  if (ball) {
    ball.textContent = formatTime(timerState.remaining)
    if (timerState.isRunning) {
      ball.classList.add('running')
    } else {
      ball.classList.remove('running')
    }
  }

  if (timeDisplay) {
    timeDisplay.textContent = formatTime(timerState.remaining)
  }

  if (modeDisplay) {
    const modeNames: Record<string, string> = {
      pomodoro: '专注模式',
      shortBreak: '短休息',
      longBreak: '长休息',
      custom: '自定义',
    }
    modeDisplay.textContent = modeNames[timerState.mode] || '计时器'
  }

  if (progressBar && timerState.duration > 0) {
    const percent = ((timerState.duration - timerState.remaining) / timerState.duration) * 100
    progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`
  }

  if (customInput) {
    ;(customInput as HTMLInputElement).value = String(timerState.customMinutes)
  }
}

function switchMode(mode: TimerState['mode']) {
  stopTimer()
  timerState.mode = mode

  switch (mode) {
    case 'pomodoro':
      timerState.duration = POMODORO_MINUTES * 60
      timerState.remaining = POMODORO_MINUTES * 60
      break
    case 'shortBreak':
      timerState.duration = SHORT_BREAK_MINUTES * 60
      timerState.remaining = SHORT_BREAK_MINUTES * 60
      break
    case 'longBreak':
      timerState.duration = LONG_BREAK_MINUTES * 60
      timerState.remaining = LONG_BREAK_MINUTES * 60
      break
    case 'custom':
      timerState.duration = timerState.customMinutes * 60
      timerState.remaining = timerState.customMinutes * 60
      break
  }

  updateModeButtons()
  updateDisplay()
  saveState()
}

function updateModeButtons() {
  const buttons = document.querySelectorAll('.timer-mode-btn')
  buttons.forEach((btn) => {
    const btnMode = btn.getAttribute('data-mode')
    if (btnMode === timerState.mode) {
      btn.classList.add('active')
    } else {
      btn.classList.remove('active')
    }
  })
}

function startTimer() {
  if (timerState.isRunning) return

  timerState.isRunning = true
  updateDisplay()
  saveState()

  timerInterval = window.setInterval(() => {
    if (timerState.remaining > 0) {
      timerState.remaining--
      updateDisplay()
      saveState()
    } else {
      finishTimer()
    }
  }, 1000)
}

function pauseTimer() {
  timerState.isRunning = false
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  updateDisplay()
  saveState()
}

function stopTimer() {
  pauseTimer()
  timerState.remaining = timerState.duration
  updateDisplay()
  saveState()
}

function finishTimer() {
  pauseTimer()

  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200])
  }

  const notification = new Notification('计时器完成', {
    body: `${timerState.mode === 'pomodoro' ? '专注时间结束' : '休息时间结束'}`,
    icon: 'static/icon.png',
  })

  notification.onclick = () => {
    window.focus()
  }
}

function togglePanel() {
  const panel = document.querySelector('.timer-panel')
  if (panel) {
    panel.classList.toggle('open')
  }
}

function closePanel() {
  const panel = document.querySelector('.timer-panel')
  if (panel) {
    panel.classList.remove('open')
  }
}

function handleCustomInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = parseInt(target.value) || 25
  timerState.customMinutes = Math.max(1, Math.min(120, value))
  if (timerState.mode === 'custom') {
    timerState.duration = timerState.customMinutes * 60
    timerState.remaining = timerState.customMinutes * 60
    updateDisplay()
    saveState()
  }
}

function initTimer() {
  const savedState = loadState()
  if (savedState) {
    timerState = { ...timerState, ...savedState }
  }

  const ball = document.querySelector('.timer-ball') as HTMLElement
  const panel = document.querySelector('.timer-panel') as HTMLElement
  const closeBtn = document.querySelector('.timer-close')
  const startPauseBtn = document.querySelector('.timer-btn.start, .timer-btn.pause')
  const resetBtn = document.querySelector('.timer-btn.reset')
  const modeButtons = document.querySelectorAll('.timer-mode-btn')
  const customInput = document.querySelector('.timer-custom input')

  // Ball toggles the panel; the module itself stays docked bottom-right.
  if (ball) {
    ball.addEventListener('click', () => {
      togglePanel()
    })
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      closePanel()
    })
  }

  document.addEventListener('click', (e) => {
    if (!panel?.contains(e.target as Node) && !ball?.contains(e.target as Node)) {
      closePanel()
    }
  })

  if (startPauseBtn) {
    startPauseBtn.addEventListener('click', () => {
      if (timerState.isRunning) {
        pauseTimer()
        startPauseBtn.textContent = '开始'
        startPauseBtn.classList.remove('pause')
        startPauseBtn.classList.add('start')
      } else {
        startTimer()
        startPauseBtn.textContent = '暂停'
        startPauseBtn.classList.remove('start')
        startPauseBtn.classList.add('pause')
      }
    })
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      stopTimer()
      if (startPauseBtn) {
        startPauseBtn.textContent = '开始'
        startPauseBtn.classList.remove('pause')
        startPauseBtn.classList.add('start')
      }
    })
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') as TimerState['mode']
      switchMode(mode)
    })
  })

  if (customInput) {
    customInput.addEventListener('input', handleCustomInput)
  }

  updateModeButtons()
  updateDisplay()

  if (timerState.isRunning) {
    const now = Date.now()
    const elapsed = Math.floor((now - (savedState?.timestamp || now)) / 1000)
    timerState.remaining = Math.max(0, timerState.remaining - elapsed)
    updateDisplay()
    saveState()
    startTimer()
  }
}

document.addEventListener('nav', () => {
  updateDisplay()
})

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimer)
} else {
  initTimer()
}
