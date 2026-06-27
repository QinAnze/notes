import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ cfg }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled Quartz"
  return (
    <h1 class="page-title">
      <a href="https://qinanze.github.io/chemistry-notes/" data-router-ignore>{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
