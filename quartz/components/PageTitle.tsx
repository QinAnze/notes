import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

function PageTitle({ fileData, cfg }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled Quartz"
  const isRoot = fileData.slug === "index"
  const parentDir = isRoot ? "" : pathToRoot(fileData.slug!)
  return (
    <h1 class="page-title">
      <a href="https://qinanze.github.io/chemistry-notes/" data-router-ignore>{title}</a>
      {!isRoot && (
        <a href="#" class="page-back" id="page-back-btn" title="返回上一级">←</a>
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
  font-size: 1.2rem;
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
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
