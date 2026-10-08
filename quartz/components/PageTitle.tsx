import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

function PageTitle({ fileData, cfg }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled Quartz"
  const isRoot = fileData.slug === "index"
  const parentDir = isRoot ? "" : pathToRoot(fileData.slug!)
  return (
    <h1 class="page-title">
      <a href="https://qinanze.github.io/notes/" data-router-ignore>{title}</a>
      {!isRoot && (
        <a
          href="#"
          class="page-back"
          id="page-back-btn"
          title="返回上一级"
          aria-label="返回上一级"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="20" y1="12" x2="5" y2="12" />
            <polyline points="11,18 5,12 11,6" />
          </svg>
        </a>
      )}
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.page-title > a:first-child {
  margin-right: auto;
}
.page-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--lightgray);
  color: var(--dark);
  text-decoration: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 0.75rem;
}
.page-back:hover {
  background: var(--gray);
  color: var(--dark);
  transform: scale(1.1);
}
.page-back svg {
  display: block;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
