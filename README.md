# 我的笔记

个人笔记仓库，用 [Quartz v4](https://github.com/jackyzha0/quartz) 建的静态站点。
目前三门课：

| 科目 | 内容 |
|---|---|
| **有机化学** | 12 篇章节笔记 + 知识点归纳（命名 / 术语 / 反应类型 / 反应特点）+ 27 份讲义 |
| **基本生物学** | 5 篇章节笔记 + 课程总笔记 + 5 份讲义 |
| **无机及分析化学** | 化学平衡 E1–E5、结构基础 S1–S2、光分析 O1–O2 + 7 篇生物方向拓展 |

**在线阅读：** https://qinanze.github.io/notes

笔记内容为老师傅手敲 + AI 统一格式化。如果有错误，欢迎指正，欢迎提 issue 和 PR。

---

## 目录结构

```
content/
├── index.md                       站点总目录（只列科目入口）
├── 跨学科/                        三门课按「同一个物理化学问题」串起来，6 条主线 + 索引
├── 有机化学笔记/
│   ├── 上课笔记/                  12 篇章节笔记，按教材顺序
│   ├── 知识点/                    命名规则、术语表
│   │   ├── 反应类型/              加成、取代、消除、氧化、还原、酸碱反应
│   │   └── 反应特点/              人名反应、控温、控 pH、立体选择性、脱气体
│   ├── pdf/                       课程讲义与期末复习资料
│   ├── 图片保存/                  课堂与作业截图、配图、站点背景图
│   └── 教师/                      授课分工与章节归属
├── 基本生物学笔记/
│   ├── 上课笔记/                  普通生物学绪论 + 4 篇章节笔记
│   ├── 知识点/                    课程总笔记（大笔记）
│   └── pdf/                       课程讲义
└── 无机及分析化学笔记/
    ├── 上课笔记/                  化学平衡 E1–E5（定量/酸碱/沉淀/氧化还原/配位）
    ├── 结构基础/                  S1 原子结构、S2 分子结构与晶体结构
    ├── 光分析/                    O1 分光光度法、O2 分离方法
    ├── 拓展/                      7 篇生物方向拓展（电化学/蛋白/缓冲/矿化/信号/色谱/光谱）
    └── 知识点/                    课程目录大纲
```

- 加新科目 = 新建同级文件夹 + 在 `content/index.md` 加一行。
- `content/跨学科/` 是**串联笔记**，不新增知识，只把几门课按同一个问题串起来，
  **只链过去、不改原笔记** —— 反向链接靠 Quartz 自动生成的 Backlinks。

站点的三个侧栏模块：**双向链接图谱**、**思维导图**（按本页标题自动生成）、
**结构演示**（分子 / 蛋白 2D + 3D，数据在 `static/molecules.json`，按当前页面自动匹配）。

---

## 写笔记前先看这里

完整流程（导入 → 排查 → 拓展 → 配图 → 跨学科）都在
**`skills/import-notes/`**，导入新笔记时照它走。

最常用的几条约定：

- **正文内链用裸 wikilink**（`[[某章节.pdf]]`），不要写 `../`；
  靠文件名全库解析，**前提是全库文件名唯一**（两门课都有「绪论」就会失效）。
- **`index.md` 里的链接写从 `content/` 根起的完整路径**
  （如 `有机化学笔记/知识点/反应类型/加成`），不要写绝对 URL。
- **PDF 链接写连字符形式**：`2 生命的化学基础.pdf` → `2-生命的化学基础.pdf`，否则 404。
- **提示框（callout）里不放表格**，表格一律拆到框外紧跟着 —— callout 有内边距，
  表格塞进去列宽会被压到不可读。
- **画图用 SVG，不用 ASCII 字符画，也不用 mermaid**（本站 mermaid 渲染不出来）。
  关系、流程、层级**能一行文字说清的别上图**：`A ──(试剂/条件)──► B`，一行一条。
- **配图的三条路**：示意图用内联 SVG；有真实数据的定量图（能量剖面、滴定曲线、Arrhenius…）
  可以用 matplotlib；显微图之类画不出来的，找权威机构的现成图并注明来源与许可。
  ⚠️ **不凭空造数据** —— 没有数值就画成示意图并标「示意，非按比例」。
- 关键术语首次出现标英文：亲电加成（Electrophilic Addition）。

可用 callout 类型：`note` `abstract` `info` `todo` `tip` `warning` `failure` `danger` `bug`
`example` `quote` `summary`。

---

## 本地开发

环境要求：Node.js ≥ 18.14

```bash
npm install                # 安装依赖
npx quartz build           # 构建到 public/
npx quartz build --serve   # 本地预览 http://localhost:8080
npm run format             # Prettier 格式化
```

> ⚠️ **`npx tsc --noEmit` 目前会报 9 个历史遗留的类型错，不影响站点运行。**
> esbuild 不做类型检查，所以 `quartz build` 通过只说明能打包，不代表没有类型问题。
> **请以 `npx quartz build --serve` 能跑、页面正常为验收标准。**

> ⚠️ **SPA 是关闭的（`enableSPA: false`），这是故意的。**
> 站点部署在子路径 `qinanze.github.io/notes/`，Quartz v4 的 SPA 子路径路由有
> [上游 bug #1572](https://github.com/jackyzha0/quartz/issues/1572)：
> 页面本身加载正确，但**新页面里的链接会丢掉 `/notes` 这层前缀**，第二跳之后 404。
> 静态链接生成逻辑（`transformLink` / `resolveRelative`）都验证过是正确的，
> 关掉 SPA 后每次跳转都是整页加载、链接永远来自服务端新生成的 HTML，这类 bug 直接消失。
> 代价是没有 SPA 的顺滑过渡。想恢复改成 `true` 即可，但要接受上面这个 bug 还在。

---

## 部署

推送到 `master` 分支会触发 `.github/workflows/deploy.yml`，
自动构建并发布到 GitHub Pages 的 `gh-pages` 分支。

> ⚠️ **仓库名一变，站点路径就变。** 仓库 `QinAnze/notes` → `qinanze.github.io/notes`。
> 站点路径在四个地方硬编码，改仓库名或搬家时要同步：

| 文件 | 位置 |
|---|---|
| `quartz.config.ts` | `configuration.baseUrl` |
| `quartz/components/PageTitle.tsx` | 标题的首页链接 |
| `quartz/components/scripts/sitefx.inline.ts` | `BASE_PATH` 常量 |
| `quartz/components/scripts/molecule.inline.ts` | `BASE_PATH` 兜底候选 |

漏改的话站内相对链接仍然正常（Quartz 用相对路径），
但 canonical、og:image、RSS 和返回上一页的兜底逻辑会指向旧路径。

---

## 维护须知

以下内容只对维护者有意义，抄近路之前请先看一眼：

- **站点背景图**是 `content/有机化学笔记/图片保存/` 下的 `bg.jpg` / `bg-light.jpg`，
  路径写死在 `quartz/styles/custom.scss`，改名或移动会导致背景丢失。
- **本项目对 Quartz 上游打过补丁**（全中文文件名下的链接解码、图谱配置合并顺序、
  侧栏模块、移动文件监听等）。**升级或重装 Quartz 前，先看
  `.workbuddy/memory/MEMORY.md` 里的补丁清单**，否则会静默失效。
- **改组件要从 `quartz.layout.ts` 下手** —— `componentResources.ts` 只收集
  「layout 里注册过的组件」的样式和脚本，漏注册等于没写（不报错，只是悄悄不生效）。
- 已知待修的排期项记录在 `.workbuddy/memory/` 下的日志与
  `tex-audit-backlog.md`（TeX / callout 遗留）。

---

## 致谢

本站的框架来自 **[Quartz v4](https://quartz.jzhao.xyz/)** —— Jack Zhao 写的开源
静态站点生成器，*"publish your digital garden and notes as a website"*。
Quartz 提供了本项目几乎所有的能力：Markdown 渲染、Obsidian 风格 wikilink、
KaTeX 数学公式、代码高亮、全文搜索、标签页、关系图谱、大纲视图、深色模式、
以及 GitHub Pages 一键部署。本站的定制建立在它之上。

- 主页：https://quartz.jzhao.xyz/
- 源码：https://github.com/jackyzha0/quartz
- 文档：https://four.quartz.jzhao.xyz/

本项目沿用 Quartz 的 [MIT 许可证](LICENSE.txt)。原作者、版权与免责声明
见 `LICENSE.txt` 与[上游仓库](https://github.com/jackyzha0/quartz)。