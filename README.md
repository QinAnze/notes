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

## 本地开发

环境要求：Node.js ≥ 18.14

```bash
npm install                # 安装依赖
npx quartz build           # 构建到 public/
npx quartz build --serve   # 本地预览
npx tsc --noEmit           # 类型检查
npm run format             # Prettier 格式化
```

> 打包（esbuild）不做类型检查，改完 `*.inline.ts` 记得单独跑一次 `npx tsc --noEmit`。

部署：推送到 `master` 分支会触发 `.github/workflows/deploy.yml`，
自动构建并发布到 GitHub Pages 的 `gh-pages` 分支。

> ⚠️ **仓库名一变，站点路径就变。** 仓库 `QinAnze/notes` → `qinanze.github.io/notes`。
> 站点路径在三个地方硬编码，改仓库名或搬家时要同步：
>
> | 文件 | 位置 |
> |---|---|
> | `quartz.config.ts` | `configuration.baseUrl` |
> | `quartz/components/PageTitle.tsx` | 标题的首页链接 |
> | `quartz/components/scripts/spa.inline.ts` | `BASE_PATH` 常量 |
>
> 漏改的话站内相对链接仍然正常（Quartz 用相对路径），
> 但 canonical、og:image、RSS 和 SPA 跨目录跳转的返回逻辑会指向旧路径。

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
  两个加起来约 1060px 高，所以 `custom.scss` 里给 `.sidebar` 加了滚动。

  图谱的松紧由 `layout.ts` 里 `Component.Graph({...})` 的四个力学参数控制：
  `repelForce`（排斥力）、`linkDistance`（连线长度）、`centerForce`（向心力）、
  `scale`（缩放）。**这四个都是"越小/越大越聚"同向的** ——
  想让图谱更挤就同时调小前三项、调大 `scale`。
  标签透明度是 `(opacityScale - 1) / 3.75`：
  `1.5 ≈ 0.13`（当前值，隐约可见）、`2 ≈ 0.27`、`3 ≈ 0.53`。
  **官方默认的 `opacityScale: 1` 等于完全没有标签**，别照抄。

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

> ⚠️ **改组件要从 `quartz.layout.ts` 下手**。
> `componentResources.ts` 只收集「layout 数组里注册过的组件」的 `.css` 和
> `.afterDOMLoaded`，所以**从 layout 移除 = 从构建图移除**，
> 比删文件安全（组件源码留着随时能加回来）。

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