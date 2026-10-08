// 全站通用的 DOM 副作用脚本（与 SPA 无关）。
//
// ⚠️ 别再把这些逻辑塞回 spa.inline.ts —— enableSPA: false 时
// componentResources.ts 会整段跳过 spaRouterScript，脚本不被打包，
// 里面的东西会静默失效。这个坑踩过一次：滚动虚化和返回按钮一起失灵。

// Base path for GitHub Pages.
// Keep in sync with `baseUrl` in quartz.config.ts and the header link in PageTitle.tsx
const BASE_PATH = "/notes"
const SITE_ORIGIN = "https://qinanze.github.io"

// 滚动超过这个距离就给 body 加 .scrolled，custom.scss 据此给背景层加模糊
const SCROLL_THRESHOLD = 50

function syncScrollState() {
  document.body.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD)
}

syncScrollState()
window.addEventListener("scroll", syncScrollState, { passive: true })

// 顶栏那个圆形返回按钮。用 href="#" 占位，点击行为靠这段 JS 接管
document.addEventListener("click", (e) => {
  const target = e.target as Element | null
  if (!target) return
  if (target.id !== "page-back-btn" && !target.closest("#page-back-btn")) return

  e.preventDefault()
  const currentPath = window.location.pathname
  if (currentPath !== BASE_PATH + "/" && currentPath !== BASE_PATH) {
    window.history.back()
  } else {
    // 已经在站点根目录了，再"返回"就退回裸 origin，这里兜一下
    window.location.href = SITE_ORIGIN + BASE_PATH
  }
})