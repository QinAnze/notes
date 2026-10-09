# 我的笔记

个人笔记仓库。目前三门课：

| 科目 | 内容 |
|---|---|
| **有机化学** | 12 篇章节笔记 + 知识点归纳（命名/术语/反应类型/反应特点）+ 27 份讲义 |
| **基本生物学** | 5 篇章节笔记 + 课程总笔记 + 5 份讲义 |
| **无机及分析化学** | 化学平衡 E1–E5、结构基础 S1–S2、光分析 O1–O2 + 7 篇生物方向拓展 |

笔记用 [Quartz v4](https://github.com/jackyzha0/quartz) 建成静态站点发布。

**在线阅读：** https://qinanze.github.io/notes

## 内容

```
content/
├── index.md                       站点总目录
├── 跨学科/                        三门课按同一个物理化学问题串起来，6 条主线 + 索引
├── 有机化学笔记/
│   ├── 上课笔记/                  12 篇章节笔记，按教材顺序
│   ├── 知识点/                    命名规则、术语表
│   │   ├── 反应类型/              加成、取代、消除、氧化、还原、酸碱反应
│   │   └── 反应特点/              人名反应、控温、控 pH、立体选择性、脱气体
│   ├── pdf/                       课程讲义与期末复习资料
│   ├── 图片保存/                  课堂与作业截图存档（兼站点背景图）
│   └── 教师/                      授课分工与章节归属
├── 基本生物学笔记/
│   ├── 上课笔记/                  普通生物学绪论 + 4 篇章节笔记
│   ├── 知识点/                    课程总笔记（大笔记）
│   └── pdf/                       课程讲义
└── 无机及分析化学笔记/
    ├── 上课笔记/                  化学平衡 E1–E5（定量/酸碱/沉淀/氧化还原/配位）
    ├── 结构基础/                  S1 原子结构、S2 分子结构与晶体结构
    ├── 光分析/                    O1 分光光度法、O2 分离方法
    ├── 拓展/                      6 篇生物方向拓展（电化学/蛋白/缓冲/矿化/信号/色谱/光谱）
    └── 知识点/                    课程目录大纲
```

`content/index.md` 是站点总目录。以后加新科目 = 新建同级文件夹 + 在总目录加一行。

`content/跨学科/` 是**串联笔记**，不新增知识，只做三门课之间的搬运：
每篇从一个具体的工程问题出发（如「发酵罐怎么稳住 pH」），
把三门课的对应段落用 wikilink 串起来，并在末尾统一列「相关笔记」。
写这类笔记时**只链过去、不改原笔记** —— Quartz 自动生成 Backlinks，双向链接因此成立。

> ⚠️ **SPA 是关闭的（`enableSPA: false`），这是故意的。**
> 站点部署在子路径 `qinanze.github.io/notes/`，而 Quartz 的 SPA 子路径路由有
> [上游 bug #1572](https://github.com/jackyzha0/quartz/issues/1572)：
> 页面本身加载正确，但**新页面里的链接会丢掉 `/notes` 这层前缀**，第二跳之后 404。
> 报告者的原话是「刷新一下就好了」—— 因为静态 HTML 里的 href 本来是对的。
>
> 静态链接生成逻辑（`transformLink` / `resolveRelative` / `PageList`）都验证过是正确的，
> 关掉 SPA 后每次跳转都是整页加载，链接永远来自服务端新生成的 HTML，这类 bug 直接消失。
> 代价是没有 SPA 的顺滑过渡。想恢复改成 `true` 即可，但要接受上面这个 bug 还在。

## 本地开发

环境要求：Node.js ≥ 18.14

```bash
npm install                # 安装依赖
npx quartz build           # 构建到 public/
npx quartz build --serve   # 本地预览
npm run format             # Prettier 格式化
```

> ⚠️ **`npx tsc --noEmit` 目前会报 9 个错，全是历史遗留，不影响站点运行。**
> esbuild 不做类型检查，所以 `quartz build` 通过只说明能打包，不代表没类型问题；
> 但反过来，tsc 报错也不代表站点坏了。**目前请以 `npx quartz build --serve`
> 能跑、页面正常为验收标准**，那 9 个错暂时不修（已知解法记录在
> `.workbuddy/memory/MEMORY.md`，真要清零时照着来）。

部署：推送到 `master` 分支会触发 `.github/workflows/deploy.yml`，
自动构建并发布到 GitHub Pages 的 `gh-pages` 分支。

> ⚠️ **仓库名一变，站点路径就变。** 仓库 `QinAnze/notes` → `qinanze.github.io/notes`。
> 站点路径在三个地方硬编码，改仓库名或搬家时要同步：
>
> | 文件 | 位置 |
> |---|---|
> | `quartz.config.ts` | `configuration.baseUrl` |
> | `quartz/components/PageTitle.tsx` | 标题的首页链接 |
> | `quartz/components/scripts/sitefx.inline.ts` | `BASE_PATH` 常量 |
> | `quartz/components/scripts/molecule.inline.ts` | `BASE_PATH` 常量（结构演示组件的**兜底**候选，主逻辑走 `siteRoot()` 自动推算） |
>
> 漏改的话站内相对链接仍然正常（Quartz 用相对路径），
> 但 canonical、og:image、RSS 和返回上一页的兜底逻辑会指向旧路径。

## 内容约定

- **正文内链一律用裸 wikilink**（`[[屏幕截图 xxx.png]]`）。
  Quartz 的 `markdownLinkResolution: "shortest"` 按文件名全库解析，挪目录不会断链。
  **但前提是全库唯一** —— 两门课出现同名文件（如两门都有「绪论」）就会失效，
  必须改名。这是本项目唯一需要人工干预的链接陷阱。
- **index.md 里的链接必须写从 `content/` 根起的完整路径**
  （如 `有机化学笔记/知识点/反应类型/加成`）。文件夹名不会被解析器识别为唯一匹配，
  短路径和 `../` 相对路径都会 404 —— 详见 `quartz/util/path.ts` 的 `transformLink()`。
- **PDF 链接要写连字符形式**。Quartz 的 `Assets` emitter 会把文件名里的空格
  换成连字符再输出（`2 生命的化学基础.pdf` → `2-生命的化学基础.pdf`），
  所以 href 必须跟着改，否则 404。

### callout 约定

三门课统一用 Obsidian 风格提示块：

| 写法 | 用途 |
|---|---|
| `> [!note]` | 概念定义 |
| `> [!important]` | 核心机制 |
| `> [!tip]` | 速记、口诀、选择依据 |
| `> [!warning]` | **易错点**（每条都要说清"为什么错"） |
| `> [!example]` | **生物工程应用 / 拓展**（要给具体工程实例） |

**颜色框里只放文字，不要包表格。** 表格一律拆到框外紧跟着，
否则表格被压在彩色块的 padding 里，窄了会错行。
**超长的「比大小」序列也不要放框内** —— 5 项以上的 `$$A > B > C > ...$$`
横向一定溢出，改成竖排表格（「梯队 | 基团」两列）提到框外。

> 📋 **已知待修**（不急，但别忘了）：有机化学笔记里还有约 **17 处「中文直接写进
> math mode」**（`\xrightarrow{燃烧}`、`\mathrm{苯}` 这种）和 **11 处 callout 内超长
> 「比大小」序列**没改。完整清单（文件 + 行号 + 片段 + 「哪些不是问题」的排除项）
> 在 `.workbuddy/memory/tex-audit-backlog.md`。P0 的 3 处 KaTeX 报错已于 8 日修完。

### 不要用代码块画图

关系、流程、层级这类内容**一律用表格或单行文字**表达，
例如 `A ──(试剂/条件)──► B`，一行写一条，窄屏也不会错行。

**⛔ ASCII 字符画（`┌─┐│└┘` 拼的转化图、能量图）和 mermaid 围栏都不要用。**
前者是排版必然错行；后者是本站根本渲染不出来（见下）。

> ⚠️ **本站的 mermaid 渲染不出来，已放弃。**
> 站内原本只有一处 mermaid（`控温.md` 的动力学/热力学控制示意图），
> 试过锁 `mermaid@10.9.3`、首屏主动调 `renderMermaid()`、
> 构建期把源码写进 `data-mermaid-src` 属性三轮修复，
> 页面仍然显示代码块，已于 2026-10-09 连同 `ofm.ts`、`custom.scss`
> 里的改动全部回退成上游 v4.0.8 原样。**别再动它。**
>
> 查过的线索留在 `.workbuddy/memory/MEMORY.md`：
> 上游 issue #638（现象同为「we get a codeblock again」，根因是
> **rehype-pretty-code**）、官方现用 `mermaid.inline.ts` 的四个关键点
> （cdnjs 加载 11.4.0、用 `innerText` 而非 `textContent` 取源码、
> 重渲染清 `data-processed`、构建期把原文写进 `data-clipboard`）。
> **本项目的 rehype-pretty-code 是 0.10.0，而上游修好时是 0.12.3** ——
> 将来要重启这件事，先升 RPC，别再改 `ofm.ts` 的 JS。

code fence 只留给真正的代码和结构化文本（JSON 等）。

可用类型由 `quartz/plugins/transformers/ofm.ts` 的 `calloutMapping` 决定，
**没有 `danger`**（有 `bug` 和 `failure`）。

### 站点定制

- `content/有机化学笔记/图片保存/` 下的 `bg.jpg` / `bg-light.jpg` 是站点背景图，
  路径写死在 `quartz/styles/custom.scss`，改名或移动会导致背景丢失。
- 背景是**亮/暗两张图叠在一起**的（`quartz/components/Body.tsx` 里的 `.bg-stack`），
  切换主题时靠 `opacity` 交叉淡入淡出，不是硬替换。
- 右侧栏是**关系图谱 + 思维导图**（`quartz.layout.ts` 的 `right` 数组，
  顺序即从上到下）。图谱只挂在笔记页，列表页（首页/文件夹/标签）不重复渲染。
  侧栏那份渲染的是**全库图**（`depth: -1`，即整个 `content/` 的所有节点），
  点右上角小图标打开的是更大的全屏版本。
  两个加起来约 930px 高，所以 `custom.scss` 里给 `.sidebar` 加了滚动。

  > ⚠️ **`.graph-outer` 的 `height` 保持官方默认的 250px，不要改成更大的值。**
  > `graph.inline.ts` 里 svg 高度是 `Math.max(graph.offsetHeight, 250)`：
  > 框高小于 250 会把图裁掉底部，大于 250 则 svg 仍是 250、框底空一截。
  > **250 是唯一两边都对齐的取值**（之前设成 380px 就是因为这个，底部一直空着）。

  图谱的松紧由 `layout.ts` 里 `Component.Graph({...})` 的四个力学参数控制：
  `repelForce`（排斥力）、`linkDistance`（连线长度）、`centerForce`（向心力）、
  `scale`（缩放）。**这四个都是"越小/越大越聚"同向的** ——
  想让图谱更挤就同时调小前三项、调大 `scale`。
  标签透明度是 `(opacityScale - 1) / 3.75`：
  `1.5 ≈ 0.13`（当前值，隐约可见）、`2 ≈ 0.27`、`3 ≈ 0.53`。
  **官方默认的 `opacityScale: 1` 等于完全没有标签**，别照抄。

  > ⚠️ **`graph.inline.ts` 的 simulation 逻辑不要动。**
  > 只有 `charge / link / center` 三个力，`forceCenter` 只管整体居中、不管散布半径，
  > 所以全库图节点确实会略微溢出 viewBox、被 `.graph-outer` 的 `overflow: hidden` 裁掉
  > 一点 —— 这是上游的既有行为。**试过加 `forceX`/`forceY` 边界力或在 `tick` 里
  > 硬夹坐标，结果节点全部堆在边上（每帧夹位置会抵消 charge 的速度累积，
  > 节点被反复推回边界），反而更糟。** 要调疏密就用上面那四个参数，别动仿真逻辑。

> ⚠️ **图谱有一处必要的补丁，重装 Quartz 时记得重新打**：
>
> **根因是 4.0.8 的 `links.ts` 少了一步百分号解码**（上游 issue #397）。
> `new URL(...).pathname` 会把路径里的非 ASCII 字符全部编码成 `%E6%9C%89...`，
> 而 `contentIndex.json` 的 key 是原始中文 —— **两边永远匹配不上**。
> 本站所有文件名都是中文，所以图谱曾是「一个孤点」，Backlinks 也全空。
>
> 已按上游写法补上（`quartz/plugins/transformers/links.ts`）：
> ```ts
> if (destCanonical.endsWith("/")) destCanonical += "index"
> const full = decodeURIComponent(_stripSlashes(destCanonical, true)) as FullSlug
> ```
> 第一步补回 `index` 是为了让文件夹链接能和 `xxx/index` 形式的 key 对上；
> 第二步解码是真正的修复。
>
> 另外 `Graph.tsx` 的配置合并顺序也修正了：
> `{ ...opts?.localGraph, ...defaultOptions.localGraph }` → `{ ...defaultOptions.localGraph, ...opts?.localGraph }`
> 4.0.8 把默认值排在后面，会**静默覆盖**掉 `Component.Graph({...})` 传入的参数。
> 已与[上游](https://github.com/jackyzha0/quartz/blob/v4/quartz/components/Graph.tsx)一致。
- 右下角有计时器与待办两个悬浮模块，固定竖排，**不要加回拖拽逻辑**
  （拖拽写 inline `left/top`，与 fixed 定位冲突）。
- 顶栏左侧的圆形返回按钮是内联 SVG，在 `PageTitle.tsx`。
- **左侧栏 TOC 下方是「🧪 结构演示」**（`components/MoleculeViewer.tsx`），
  和右栏图谱/思维导图同样的边框圆角 + 透明背景。
  - **只显示当前这篇笔记的内容**：脚本读 `<body data-slug>`（`renderPage.tsx` 渲染的
    full slug）拿到本页 slug，再从 contentIndex 里取出**末段文件名**，
    和条目里的 `note` 字段比对。**匹配不到就保持隐藏**，不留空框。
    - contentIndex.json 的结构是 `{ "<fullSlug>": { title, links, tags, content } }`
      —— **key 是 slug，value 里没有 `slug`/`filePath` 字段**。
      按 value 取字段会拿到 undefined，匹配全失败，组件会把自己隐藏掉。
    - 它的 URL 是 **`static/contentIndex.json`**（不是 `/contentIndex.json`），
      而且 Quartz 已经把这份数据预加载成全局 `fetchData` 了，脚本直接复用，
      拿不到才自己 fetch。
    - ⚠️ slug 末段可以直接当文件名用：Quartz 的 `slugifyFilePath`
      **只把空格换成连字符，不会转小写**（`E5-配合物与配位平衡` 的 slug 就是它本身）。
  - 一篇笔记可以对应多个条目（比如 L-丙氨酸 / D-丙氨酸 在 `立体化学.md` 里），
    ◀ ▶ 在这些条目之间翻页。
  - 2D 结构式用 **RDKit.js（WASM）**，CDN 挂了自动降级到 **SmilesDrawer**，
    再失败就显示 SMILES 原文。
  - 3D 结构用 **3Dmol.js 2.0.1**，**只有填了 `pdb` 的条目才有「3D」按钮**，
    点了才去拉结构，首屏不占带宽。两种写法：
    | 写法 | 数据源 | 适用 |
    |---|---|---|
    | `pdb: "1MBO"` | RCSB（实验测定） | 有晶体/核磁结构的经典蛋白 |
    | `pdb: "AF-P01308-F1"` | AlphaFold DB（预测） | 没有实验结构的蛋白，覆盖面几乎全库 |
  - **数据在项目根的 `static/molecules.json`，不在代码里**（约 296 条，覆盖 55 篇笔记；
    只差 2 篇教师介绍和 1 篇课程大纲 —— 那三篇本来就没有化合物）。
    每条：`name / smiles / formula / note / group / tip`，蛋白质条目还有 `pdb`。

    > ⚠️ **取数据的 URL 是运行时算出来的，不要写死 `/notes`。**
    > `staticUrls()` 用「`location.pathname` 的层数 − `<body data-slug>` 的层数」
    > 反推站点根（`siteRoot()`），再拼出候选列表逐个试到 200 为止。
    > 原因：本地 `npx quartz build --serve` **不加 `--baseDir`** 时，
    > `public/` 是挂在服务器根上的（页面 URL = `/有机化学笔记/...`），
    > 根本没有 `/notes` 这层 —— 写死就会 404，而线上（`/notes` 子路径）又必须带。
    > `BASE_PATH` 常量现在只是兜底候选之一。
    > 顺带：`contentIndex.json` 不受影响，因为它走 Quartz 注入的全局 `fetchData`（相对路径）。

    > ⚠️ **这个 JSON 需要一个自定义 emitter 才能进 build 产物**（重装 Quartz 要重打）：
    > 上游的 `Plugin.Static` 只从 **`quartz/static/`** 复制文件，
    > 放在项目根的 `static/` 会被**整个忽略**（浏览器 fetch 404，框直接不显示）。
    > 所以项目里有 `quartz/plugins/emitters/moleculeData.ts`，
    > 在 `quartz.config.ts` 的 emitters 里注册（和上游 `ContentIndex`
    > 发 `static/contentIndex.json` 是同一个套路）。它还会在构建期 `JSON.parse` 一次，
    > 数据写坏了直接构建失败，而不是静默。
    - **`note` 填目标笔记的文件名**（不含 `.md`、不带路径），填对才在这篇笔记里出现。
      一篇笔记可以挂多条，侧栏 ◀ ▶ 依次翻。
    - **加新条目的唯一入口就是改这个 JSON**，不用碰任何 `.ts`。
    - `src` 字段标注数据来源：`cactus` = NCI/CADD Cactus 解析器查得并核对了 InChIKey；
      `manual` = 人工书写，已按分子式核对过原子数。
    - ⚠️ **Cactus 本身偶发返回错结构**（查 `succinic acid` 给的是戊二酸），
      所以每条都配了 `formula`。**加条目时务必让 SMILES 的原子数和 formula 对得上** ——
      2026-10-09 那次 159 条里就抓出 5 处不一致（甲硫氨酸/谷氨酰胺多一个 CH₂、
      PIPES 分子式、C柠檬酸根少一个负电荷、环丙烯正离子）。
    - 3D 入口有两种：`"pdb": "1MBO"` 走 RCSB，`"pdb": "AF-P01308-F1"` 走 AlphaFold DB。

  > ⚠️ **主题配色：字母和键靠 `currentColor` 跟随明暗，而颜色藏在两个地方。**
  > `preprocessSvg()` 用 **`DOMParser` 遍历 DOM**（不是正则）把 `fill`/`stroke` 换成
  > `currentColor`，再由 `.molecule-view svg { color: var(--dark) }` 上色 ——
  > 浅色模式是深色字、暗色模式是浅色字，切换主题**不用重绘**。
  > 只有一个坑但很致命：**RDKit 把原子字母的颜色写在 `<text>` 的内联
  > `style="...;fill:#000000"` 里**，不是 `fill="#000000"` 属性。
  > 2026-10-09 只做了属性形式，结果暗色模式下「键变浅了、字母还是黑的」。
  > 所以属性形式和内联 style 必须都换。
  > 另外 `.molecule-view svg text` 的字体规则要加 `!important` ——
  > RDKit 的 `font-family`/`font-size` 也在内联 style 里，不加压不过去。

  > ⚠️ **加新条目时不要用在线 API 查 SMILES**（用户明确要求：太慢）。
  > 用知识库直接写，但**每条必须带 `formula`，并自己把 SMILES 的原子数数一遍核对**
  > —— 这是唯一能机械防错的手段。历史上手写的 5 处错（甲硫氨酸/谷氨酰胺多一个 CH₂、
  > PIPES 分子式、柠檬酸根少一个负电荷、环丙烯正离子 sp³ 写反）全是靠数原子抓出来的。
  > **数不准的就别加**，宁缺勿错。

  > ⚠️ **`getRDKit()` 里必须先 `loadScript` 再 `initRDKitModule`。**
  > 少了第一步会直接找不到 `initRDKitModule` —— 页面整块显示「渲染错误」。
  > 这是本组件踩过的第一个坑，改这块时先确认加载顺序没退化。

  > ⚠️ **组件初始 `style="display:none"`，由脚本决定要不要显示。**
  > 早期版本服务端先渲染出框、脚本再判断隐藏，会看到「闪一下就没了」。
  > 现在服务端就不输出可见框，脚本匹配到内容才 `display:""`。

  > ⚠️ **渲染器全部走 CDN，降级链不能省**（mermaid 踩过的同一个坑）：
  > RDKit → SmilesDrawer → 纯文本 SMILES。RDKit 的 SVG 颜色会被脚本统一替换成
  > `currentColor`，再由 CSS `svg { color: var(--dark) }` 上色，
  > 所以暗色模式切换**不需要重新渲染**。

> ⚠️ **改组件要从 `quartz.layout.ts` 下手**。
> `componentResources.ts` 只收集「layout 数组里注册过的组件」的 `.css` 和
> `.afterDOMLoaded`，所以**从 layout 移除 = 从构建图移除**，
> 比删文件安全（组件源码留着随时能加回来）；反过来，
> **新建组件忘了注册进 layout 就等于没写**（效果不报错，只是悄悄不生效）。

> ⚠️ **与 SPA 无关的全局副作用不能写在 `spa.inline.ts` 里。**
> `componentResources.ts` 对它是 **if/else** 而不是叠加：
> `enableSPA: false` 时整个 `spa.inline.ts` 不会进 `postscript.js`，
> 里面的代码**静默失效、不报任何错**。本项目的滚动虚化和顶栏返回按钮
> 因此放在独立组件 `quartz/components/SiteFx.tsx`（+ `scripts/sitefx.inline.ts`）里，
> 注册在两个 layout 的 `afterBody`。改这两个功能时别又塞回 `spa.inline.ts`。

> ⚠️ **SPA 导航在子目录部署下的前缀丢失（已绕开）**
> 根因是 [上游 issue #1572](https://github.com/jackyzha0/quartz/issues/1572)，
> 4.0.8 也中招：页面本身加载正确，但**新页面里的链接丢掉 `/notes` 这层前缀**，
> 第二跳之后 404。报告者的原话是「刷新一下就好了」。
>
> 我已按上游把 `normalizeRelativeURLs` 补进 `quartz/util/path.ts`，
> 并在 `spa.inline.ts` 里改成正确用法（**morph 之前**、对**fetch 回来的 `html`** 做，
> 不能对 morph 之后的 `document.body` 做 —— `micromorph` 只增不删）。
> 但最终**直接关掉了 SPA**，见上面「内容」一节的说明。
> `popover.inline.ts` 里原本有一份重复的旧版实现，也已统一到 util 里同一个。

笔记内容为老师傅手敲 + AI 统一格式化。**如果有错误，欢迎指正，欢迎提 issue 和 PR。**

---

## 致谢

本站的框架来自 **[Quartz v4](https://quartz.jzhao.xyz/)** —— Jack Zhao 写的开源
静态站点生成器，*"publish your digital garden and notes as a website"*。

Quartz 提供了本项目几乎所有的能力：Markdown 渲染、Obsidian 风格 wikilink、
KaTeX 数学公式、代码高亮、全文搜索、标签页、关系图谱、大纲视图、深色模式、
Mermaid 图表，以及 GitHub Pages 一键部署。本站的定制（三门课的目录结构、
配色、背景交叉淡入、右下角的计时器与待办模块）建立在它之上。

- 主页：https://quartz.jzhao.xyz/
- 源码：https://github.com/jackyzha0/quartz
- 文档：https://four.quartz.jzhao.xyz/
- 社区：[Discord](https://discord.gg/cRFFHYye7t)

本项目沿用 Quartz 的 [MIT 许可证](LICENSE.txt)。原作者、版权与免责声明
见 `LICENSE.txt` 与[上游仓库](https://github.com/jackyzha0/quartz)。

也感谢 Richard Hamming —— Quartz 的 README 用他这句话开场，本项目一并沿用：

> "[One] who works with the door open gets all kinds of interruptions,
> but [they] also occasionally gets clues as to what the world is
> and what might be important."