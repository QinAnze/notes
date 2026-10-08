# 我的笔记

个人笔记仓库 —— 目前是本科《有机化学》课程笔记，后续会陆续补充其他科目。

笔记用 [Quartz v4](https://github.com/jackyzha0/quartz) 建成静态站点发布。

**在线阅读：** https://qinanze.github.io/notes

## 内容

```
content/
├── index.md                  站点总目录
└── 有机化学笔记/
    ├── 上课笔记/             12 篇章节笔记，按教材顺序
    ├── 知识点/               命名规则、术语表
    │   ├── 反应类型/         加成、取代、消除、氧化、还原、酸碱反应
    │   └── 反应特点/         人名反应、控温、控 pH、立体选择性、脱气体
    ├── pdf/                  课程讲义与期末复习资料
    ├── 图片保存/             课堂与作业截图存档
    └── 教师/                 授课分工与章节归属
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
- **index.md 里的链接必须写从 `content/` 根起的完整路径**
  （如 `有机化学笔记/知识点/反应类型/加成`）。文件夹名不会被解析器识别为唯一匹配，
  短路径和 `../` 相对路径都会 404 —— 详见 `quartz/util/path.ts` 的 `transformLink()`。
- `content/图片保存/` 下的 `bg.jpg` / `bg-light.jpg` 是站点背景图，
  路径写死在 `quartz/styles/custom.scss`，改名或移动会导致背景丢失。

笔记内容为老师傅手敲 + AI 统一格式化。**如果有错误，欢迎指正，欢迎提 issue 和 PR。**

---

## 致谢

本站的框架来自 **[Quartz v4](https://quartz.jzhao.xyz/)** —— Jack Zhao 写的开源
静态站点生成器，*"publish your digital garden and notes as a website"*。

Quartz 提供了本项目几乎所有的能力：Markdown 渲染、Obsidian 风格 wikilink、
KaTeX 数学公式、代码高亮、全文搜索、标签页、关系图谱、大纲视图、深色模式、
Mermaid 图表，以及 GitHub Pages 一键部署。本站的定制（右下角的计时器与待办模块、
配色、目录结构）建立在它之上。

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