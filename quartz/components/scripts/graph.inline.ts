import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import * as d3 from "d3"
import { removeAllChildren } from "./util"
import { setupZoomOverlay } from "./zoom"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"

type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]
} & d3.SimulationNodeDatum

type LinkData = {
  source: SimpleSlug
  target: SimpleSlug
}

const localStorageKey = "graph-visited"
function getVisited(): Set<SimpleSlug> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? "[]"))
}

function addToVisited(slug: SimpleSlug) {
  const visited = getVisited()
  visited.add(slug)
  localStorage.setItem(localStorageKey, JSON.stringify([...visited]))
}

async function renderGraph(container: string, fullSlug: FullSlug) {
  if (!fullSlug) {
    console.warn("Graph: fullSlug is undefined, skipping render")
    return
  }
  const slug = simplifySlug(fullSlug)
  const visited = getVisited()
  const graph = document.getElementById(container)
  if (!graph) return
  removeAllChildren(graph)

  let {
    drag: enableDrag,
    zoom: enableZoom,
    depth,
    scale,
    repelForce,
    centerForce,
    linkDistance,
    fontSize,
    opacityScale,
  } = JSON.parse(graph.dataset["cfg"]!)

  const data = await fetchData

  const links: LinkData[] = []
  for (const [src, details] of Object.entries<ContentDetails>(data)) {
    const source = simplifySlug(src as FullSlug)
    const outgoing = details.links ?? []
    for (const dest of outgoing) {
      if (dest in data) {
        links.push({ source, target: dest })
      }
    }
  }

  const neighbourhood = new Set<SimpleSlug>()
  const wl: (SimpleSlug | "__SENTINEL")[] = [slug, "__SENTINEL"]
  if (depth >= 0) {
    while (depth >= 0 && wl.length > 0) {
      // compute neighbours
      const cur = wl.shift()!
      if (cur === "__SENTINEL") {
        depth--
        wl.push("__SENTINEL")
      } else {
        neighbourhood.add(cur)
        const outgoing = links.filter((l) => l.source === cur)
        const incoming = links.filter((l) => l.target === cur)
        wl.push(...outgoing.map((l) => l.target), ...incoming.map((l) => l.source))
      }
    }
  } else {
    Object.keys(data).forEach((id) => neighbourhood.add(simplifySlug(id as FullSlug)))
  }

  const graphData: { nodes: NodeData[]; links: LinkData[] } = {
    nodes: [...neighbourhood].map((url) => ({
      id: url,
      text: data[url]?.title ?? url,
      tags: data[url]?.tags ?? [],
    })),
    links: links.filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target)),
  }

  const simulation: d3.Simulation<NodeData, LinkData> = d3
    .forceSimulation(graphData.nodes)
    .force("charge", d3.forceManyBody().strength(-100 * repelForce))
    .force(
      "link",
      d3
        .forceLink(graphData.links)
        .id((d: any) => d.id)
        .distance(linkDistance),
    )
    .force("center", d3.forceCenter().strength(centerForce))

  const height = Math.max(graph.offsetHeight, 250)
  const width = graph.offsetWidth

  const svg = d3
    .select<HTMLElement, NodeData>("#" + container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2 / scale, -height / 2 / scale, width / scale, height / scale])

  // draw links between nodes
  const link = svg
    .append("g")
    .selectAll("line")
    .data(graphData.links)
    .join("line")
    .attr("class", "link")
    .attr("stroke", "var(--lightgray)")
    .attr("stroke-width", 1)

  // svg groups
  const graphNode = svg.append("g").selectAll("g").data(graphData.nodes).enter().append("g")

  // calculate color
  const color = (d: NodeData) => {
    const isCurrent = d.id === slug
    if (isCurrent) {
      return "var(--secondary)"
    } else if (visited.has(d.id)) {
      return "var(--tertiary)"
    } else {
      return "var(--gray)"
    }
  }

  const drag = (simulation: d3.Simulation<NodeData, LinkData>) => {
    function dragstarted(event: any, d: NodeData) {
      if (!event.active) simulation.alphaTarget(1).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: NodeData) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    const noop = () => {}
    return d3
      .drag<Element, NodeData>()
      .on("start", enableDrag ? dragstarted : noop)
      .on("drag", enableDrag ? dragged : noop)
      .on("end", enableDrag ? dragended : noop)
  }

  function nodeRadius(d: NodeData) {
    const numLinks = links.filter((l: any) => l.source.id === d.id || l.target.id === d.id).length
    return 2 + Math.sqrt(numLinks)
  }

  // draw individual nodes
  const node = graphNode
    .append("circle")
    .attr("class", "node")
    .attr("id", (d) => d.id)
    .attr("r", nodeRadius)
    .attr("fill", color)
    .style("cursor", "pointer")
    .on("click", (_, d) => {
      const targ = resolveRelative(fullSlug, d.id)
      window.spaNavigate(new URL(targ, window.location.toString()))
    })
    .on("mouseover", function (_, d) {
      const neighbours: SimpleSlug[] = data[fullSlug].links ?? []
      const neighbourNodes = d3
        .selectAll<HTMLElement, NodeData>(".node")
        .filter((d) => neighbours.includes(d.id))
      const currentId = d.id
      const linkNodes = d3
        .selectAll(".link")
        .filter((d: any) => d.source.id === currentId || d.target.id === currentId)

      // highlight neighbour nodes
      neighbourNodes.transition().duration(200).attr("fill", color)

      // highlight links
      linkNodes.transition().duration(200).attr("stroke", "var(--gray)").attr("stroke-width", 1)

      const bigFont = fontSize * 1.5

      // show text for self
      const parent = this.parentNode as HTMLElement
      d3.select<HTMLElement, NodeData>(parent)
        .raise()
        .select("text")
        .transition()
        .duration(200)
        .attr("opacityOld", d3.select(parent).select("text").style("opacity"))
        .style("opacity", 1)
        .style("font-size", bigFont + "em")
    })
    .on("mouseleave", function (_, d) {
      const currentId = d.id
      const linkNodes = d3
        .selectAll(".link")
        .filter((d: any) => d.source.id === currentId || d.target.id === currentId)

      linkNodes.transition().duration(200).attr("stroke", "var(--lightgray)")

      const parent = this.parentNode as HTMLElement
      d3.select<HTMLElement, NodeData>(parent)
        .select("text")
        .transition()
        .duration(200)
        .style("opacity", d3.select(parent).select("text").attr("opacityOld"))
        .style("font-size", fontSize + "em")
    })
    // @ts-ignore
    .call(drag(simulation))

  // draw labels
  const labels = graphNode
    .append("text")
    .attr("dx", 0)
    .attr("dy", (d) => -nodeRadius(d) + "px")
    .attr("text-anchor", "middle")
    .text(
      (d) => data[d.id]?.title || (d.id.charAt(1).toUpperCase() + d.id.slice(2)).replace("-", " "),
    )
    .style("opacity", (opacityScale - 1) / 3.75)
    .style("pointer-events", "none")
    .style("font-size", fontSize + "em")
    .raise()
    // @ts-ignore
    .call(drag(simulation))

  // set panning
  if (enableZoom) {
    svg.call(
      d3
        .zoom<SVGSVGElement, NodeData>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, 4])
        .on("zoom", ({ transform }) => {
          link.attr("transform", transform)
          node.attr("transform", transform)
          const scale = transform.k * opacityScale
          const scaledOpacity = Math.max((scale - 1) / 3.75, 0)
          labels.attr("transform", transform).style("opacity", scaledOpacity)
        }),
    )
  }

  // progress the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y)
    node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)
    labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
  })
}

/**
 * 放大浮层的内容：**按浮层尺寸重新跑一遍力导向**，而不是把侧栏那份图拉伸。
 * 侧栏 60+ 个节点挤在 ~380px 宽里本来就只能看个大概（所以 label 透明度压得很低），
 * 只有重新布局才真的多看清点东西。
 *
 * 侧栏的 z-index 抬升由 components/scripts/zoom.ts 统一处理，这里不用管。
 */
function buildGlobalGraph(body: HTMLElement): () => void {
  const slug = getFullSlug(window)

  renderGraph("global-graph-container", slug)

  return () => {
    removeAllChildren(body)
  }
}

document.addEventListener("nav", async (e: unknown) => {
  const event = e as CustomEventMap["nav"]
  // ⚠️ detail 里两个键都认。
  // 非 SPA 模式下 componentResources 派发的是 `slug`，SPA 模式下 spa.inline.ts 派发的是 `url`。
  // 以前这里只读 url，非 SPA 时永远是 undefined —— 于是走下面那个兜底分支并提前 return，
  // 结果是「图谱照常画出来（兜底分支也画），但放大按钮的 click 监听根本没挂上」，
  // 点了一动不动，控制台也不报错。2026-10-10 修的就是这个。
  const detail = ((event?.detail ?? {}) as { url?: FullSlug; slug?: FullSlug }) ?? {}
  const slug = detail.url ?? detail.slug ?? (document.body.dataset.slug as FullSlug | undefined)
  if (!slug) {
    console.warn("Graph: no slug available, skipping render")
    return
  }

  addToVisited(simplifySlug(slug))
  await renderGraph("graph-container", slug)

  // 「放大」按钮 + 全屏浮层。逻辑和思维导图 / 结构演示共用（components/scripts/zoom.ts）。
  setupZoomOverlay({
    buttonId: "global-graph-icon",
    overlayId: "global-graph-outer",
    bodyId: "global-graph-container",
    build: buildGlobalGraph,
  })
})
