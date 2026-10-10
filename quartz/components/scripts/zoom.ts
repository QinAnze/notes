/**
 * 三个侧栏模块（双向链接图谱 / 思维导图 / 结构演示）共用的「放大」浮层。
 *
 * 三处的 DOM 结构是同一套（见各自的 .tsx）：
 *
 *   <div class="xxx-wrapper">            ← 框，position: relative
 *     <h3>标题</h3>
 *     <svg class="zoom-btn" id="xxx-zoom-icon">…</svg>
 *     …内容…
 *     <div class="zoom-overlay" id="xxx-zoom-outer">
 *       <div class="zoom-overlay-inner">
 *         <div class="zoom-overlay-body" id="xxx-zoom-body"></div>
 *       </div>
 *     </div>
 *   </div>
 *
 * 本文件只负责「开 / 关」这层壳：加 .active、Esc 关闭、点浮层空白关闭，
 * 然后把内容交给调用方的 build()。
 *
 * **内容怎么生成由调用方决定** —— 几种内容的正确做法不一样：
 *   图谱是重新跑一次力导向、思维导图是重建一个 markmap 实例、
 *   结构演示 2D 是克隆已经画好的 SVG（矢量，等比放大）、
 *   结构演示 3D 是把画布容器整个**移动**进来（克隆 canvas 只会得到空白）。
 * 样式（.zoom-btn / .zoom-overlay）统一写在 quartz/styles/custom.scss 里。
 *
 * ⚠️ `close()` 的顺序是**先跑清理函数、再清空浮层**。依赖这个顺序的调用方
 * （比如 3D 那个要把画布搬回侧栏）别改成先清空 —— 那样会把 DOM 直接删掉。
 */

/** 幂等标记挂在按钮的 dataset 上 —— nav 事件有可能来不止一次 */
const BOUND_FLAG = "zoomBound"

export interface ZoomOverlayOptions {
  /** 触发按钮的 id */
  buttonId: string
  /** 浮层根元素 id（.zoom-overlay） */
  overlayId: string
  /** 浮层内容容器 id（.zoom-overlay-body） */
  bodyId: string
  /**
   * 往浮层里放内容。
   * 调用时浮层已经加上 .active，容器有真实尺寸，可以直接读 clientWidth / clientHeight。
   * 返回的清理函数在关闭时调用（销毁实例 / 清空 DOM）。
   */
  build: (body: HTMLElement) => void | (() => void)
}

/**
 * 绑定放大浮层。重复调用是安全的（同一个按钮只绑一次）。
 * 元素不全（比如本页根本没渲染这个模块）时返回 false，调用方不用自己判断。
 */
export function setupZoomOverlay(opts: ZoomOverlayOptions): boolean {
  const overlay = document.getElementById(opts.overlayId)
  const body = document.getElementById(opts.bodyId)
  const button = document.getElementById(opts.buttonId)
  if (!overlay || !body || !button) return false

  // ⚠️ 不加这道闸的话，nav 每来一次就挂一份监听，一次点击会开 N 个浮层。
  if (button.dataset[BOUND_FLAG] === "1") return true
  button.dataset[BOUND_FLAG] = "1"

  let isOpen = false
  let cleanup: (() => void) | null = null

  // 浮层在 DOM 上挂在 .sidebar 里面（三个模块都渲染进侧栏），而侧栏是
  // position: fixed —— **fixed 元素恒成层叠上下文**，所以浮层的 z-index: 9999
  // 只是「在侧栏内部」最大，压不住外面的东西。把侧栏本身抬到 z-index: 1，
  // 关掉时清掉 inline 值让 CSS 接管。
  const sidebar = overlay.closest(".sidebar") as HTMLElement | null

  function close() {
    if (!isOpen) return
    isOpen = false
    overlay.classList.remove("active")
    if (sidebar) sidebar.style.zIndex = ""
    if (cleanup) {
      cleanup()
      cleanup = null
    }
    body.innerHTML = ""
  }

  function open() {
    if (isOpen) {
      close()
      return
    }
    isOpen = true
    overlay.classList.add("active")
    if (sidebar) sidebar.style.zIndex = "1"
    // display: none → flex 之后要等这一帧布局算完，容器尺寸才是真值，
    // 否则调用方读到的是 0（markmap 那种按容器尺寸排版的会直接崩）
    requestAnimationFrame(() => {
      if (!isOpen) return
      const result = opts.build(body)
      cleanup = typeof result === "function" ? result : null
    })
  }

  button.addEventListener("click", (e) => {
    e.preventDefault()
    open()
  })

  // 点浮层空白处关闭（点内层盒子里的内容不关）
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close()
  })

  // Esc 关闭。三个模块各挂一个，靠各自的 isOpen 过滤，互不干扰。
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) close()
  })

  return true
}

/** 浮层当前是否开着 —— 主题切换时用来决定要不要重建里面的内容 */
export function isZoomOverlayOpen(overlayId: string): boolean {
  return document.getElementById(overlayId)?.classList.contains("active") ?? false
}
