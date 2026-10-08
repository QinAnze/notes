import micromorph from "micromorph"
import { FullSlug, RelativeURL, getFullSlug, normalizeRelativeURLs } from "../../util/path"

// adapted from `micromorph`
// https://github.com/natemoo-re/micromorph

const NODE_TYPE_ELEMENT = 1
let announcer = document.createElement("route-announcer")
const isElement = (target: EventTarget | null): target is Element =>
  (target as Node)?.nodeType === NODE_TYPE_ELEMENT
const isLocalUrl = (href: string) => {
  try {
    const url = new URL(href)
    if (window.location.origin === url.origin) {
      if (url.pathname === window.location.pathname) {
        return !url.hash
      }
      return true
    }
  } catch (e) {}
  return false
}

const getOpts = ({ target }: Event): { url: URL; scroll?: boolean } | undefined => {
  if (!isElement(target)) return
  const a = target.closest("a")
  if (!a) return
  if ("routerIgnore" in a.dataset) return
  const { href } = a
  if (!isLocalUrl(href)) return
  const url = new URL(href)
  // do not intercept links to non-HTML resources (PDF, images, etc.)
  // let the browser handle them natively
  if (url.pathname.match(/\.(pdf|zip|png|jpg|jpeg|gif|webp|svg|mp4|webm|ogg|mp3|wav)$/i)) {
    return
  }
  return { url, scroll: "routerNoscroll" in a.dataset ? false : undefined }
}

function notifyNav(url: FullSlug) {
  const event: CustomEventMap["nav"] = new CustomEvent("nav", { detail: { url } })
  document.dispatchEvent(event)
}

let p: DOMParser
async function navigate(url: URL, isBack: boolean = false) {
  p = p || new DOMParser()
  const contents = await fetch(`${url}`)
    .then((res) => res.text())
    .catch(() => {
      window.location.assign(url)
    })

  if (!contents) return

  const html = p.parseFromString(contents, "text/html")

  // 关键：必须在 morph **之前**，把目标 HTML 里的相对链接重基到目标 URL 上。
  // 否则浏览器会用当前地址栏去解析那些相对路径，子目录部署时每深一层丢一层前缀
  // （/notes/有机化学笔记/ → /有机化学笔记/上课笔记/）。
  normalizeRelativeURLs(html, url)

  let title = html.querySelector("title")?.textContent
  if (title) {
    document.title = title
  } else {
    const h1 = document.querySelector("h1")
    title = h1?.innerText ?? h1?.textContent ?? url.pathname
  }
  if (announcer.textContent !== title) {
    announcer.textContent = title
  }
  announcer.dataset.persist = ""
  html.body.appendChild(announcer)

  const preservedElements: { el: Element; nextSibling: Element | null; parent: Element }[] = []
  document.body.querySelectorAll("[data-spa-preserve]").forEach((el) => {
    preservedElements.push({
      el,
      nextSibling: el.nextSibling,
      parent: el.parentElement!,
    })
    el.remove()
  })

  // morph body
  micromorph(document.body, html.body)

  preservedElements.forEach(({ el }) => {
    const existingEl = document.getElementById(el.id)
    if (existingEl) {
      existingEl.remove()
    }
    document.body.appendChild(el)
  })

  // scroll into place and add history
  if (!isBack) {
    if (url.hash) {
      const el = document.getElementById(url.hash.substring(1))
      el?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  // now, patch head
  const elementsToRemove = document.head.querySelectorAll(":not([spa-preserve])")
  elementsToRemove.forEach((el) => el.remove())
  const elementsToAdd = html.head.querySelectorAll(":not([spa-preserve])")
  elementsToAdd.forEach((el) => document.head.appendChild(el))

  // delay setting the url until now
  // at this point everything is loaded so changing the url should resolve to the correct addresses
  history.pushState({}, "", url)

  notifyNav(getFullSlug(window))
  delete announcer.dataset.persist
}

window.spaNavigate = navigate

// Base path for GitHub Pages.
// Keep in sync with `baseUrl` in quartz.config.ts and the header link in PageTitle.tsx
const BASE_PATH = "/notes"
const SITE_ORIGIN = "https://qinanze.github.io"

function createRouter() {
  // Handle page back button click
  document.addEventListener("click", async (e) => {
    const target = e.target as Element
    if (target.id === "page-back-btn" || target.closest("#page-back-btn")) {
      e.preventDefault()
      const currentPath = window.location.pathname
      // If we're not at base path, go back in history
      if (currentPath !== BASE_PATH + "/" && currentPath !== BASE_PATH) {
        window.history.back()
      } else {
        // Already at base, go to base path
        window.location.href = SITE_ORIGIN + BASE_PATH
      }
      return
    }
  })
  
  if (typeof window !== "undefined") {
    window.addEventListener("click", async (event) => {
      const { url } = getOpts(event) ?? {}
      if (!url) return
      event.preventDefault()
      try {
        navigate(url, false)
      } catch (e) {
        window.location.assign(url)
      }
    })

    window.addEventListener("popstate", (event) => {
      const { url } = getOpts(event) ?? {}
      if (window.location.hash && window.location.pathname === url?.pathname) return

      // Check if we're returning to root path (without BASE_PATH).
      // This handles the case when history back lands on the bare origin
      // (qinanze.github.io) instead of the site root (qinanze.github.io/notes)
      if (window.location.pathname === "/" || window.location.pathname === "") {
        window.location.href = SITE_ORIGIN + BASE_PATH
        return
      }
      
      try {
        navigate(new URL(window.location.toString()), true)
      } catch (e) {
        window.location.reload()
      }
      return
    })
  }

  return new (class Router {
    go(pathname: RelativeURL) {
      const url = new URL(pathname, window.location.toString())
      return navigate(url, false)
    }

    back() {
      return window.history.back()
    }

    forward() {
      return window.history.forward()
    }
  })()
}

createRouter()
notifyNav(getFullSlug(window))

// Add scroll event listener for background blur effect
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const body = document.body
    if (window.scrollY > 50) {
      body.classList.add("scrolled")
    } else {
      body.classList.remove("scrolled")
    }
  })
}

if (!customElements.get("route-announcer")) {
  const attrs = {
    "aria-live": "assertive",
    "aria-atomic": "true",
    style:
      "position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px",
  }
  customElements.define(
    "route-announcer",
    class RouteAnnouncer extends HTMLElement {
      constructor() {
        super()
      }
      connectedCallback() {
        for (const [key, value] of Object.entries(attrs)) {
          this.setAttribute(key, value)
        }
      }
    },
  )
}
