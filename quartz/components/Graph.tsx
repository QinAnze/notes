import { QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: 1,
    scale: 1.1,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
  },
}

export default ((opts?: GraphOptions) => {
  function Graph() {
    // 注意合并顺序：默认在前、用户传参在后。
    // 反过来写（`{...opts, ...defaults}`）会让默认值覆盖掉外部配置，
    // 表现为「传了 depth: -1 但局部图还是只看一层」——而且不报错，很难查。
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    return (
      <div class="graph">
        <h3>双向链接图谱</h3>
        {/* 「放大」按钮。三个侧栏模块（图谱 / 思维导图 / 结构演示）用的是同一个
            .zoom-btn + .zoom-overlay 组合，样式在 quartz/styles/custom.scss，
            开合逻辑在 components/scripts/zoom.ts。 */}
        <svg
          class="zoom-btn"
          id="global-graph-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="button"
          aria-label="放大图谱"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        <div class="graph-outer">
          <div id="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
        </div>
        <div class="zoom-overlay" id="global-graph-outer">
          <div class="zoom-overlay-inner">
            <div
              class="zoom-overlay-body"
              id="global-graph-container"
              data-cfg={JSON.stringify(globalGraph)}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script

  return Graph
}) satisfies QuartzComponentConstructor
