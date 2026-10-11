# SVG 画图

**已验证可用**：`processors/parse.ts:30` 有 `remarkRehype, { allowDangerousHtml: true }`，
`ofm.ts` 的 `htmlPlugins()` 里挂了 `rehype-raw`。
所以 `.md` 里写原始 HTML（含 `<svg>`）会原样渲染。
证据：callout 的图标就是 `ofm.ts` 注入的内联 SVG，页面上一直正常显示。

> ⚠️ **只禁 ASCII 字符画和 mermaid，不禁 SVG。**
> ASCII 在窄屏必错行；mermaid 本站渲染不出来（见 MEMORY.md）。
> SVG 是这个站画图的正路。

---

## 一、两种放法：先看清代价再选

### A. 内联 SVG（默认选它）

直接写在 `.md` 里：

```markdown
<svg viewBox="0 0 320 120" width="100%" style="max-width:640px;height:auto;display:block;margin:0 auto">
  ...
</svg>
```

- 优点：跟着笔记走、改起来方便、能用 CSS 类、**能跟随站点明暗切换**
- 缺点：md 文件变长；复杂图（>50 个元素）会把正文撑得很难读

### B. 独立 `.svg` 文件 + `![[xxx.svg]]`

放 `<课程>/图片保存/` 下（和 `bg.jpg` 那些站点素材同目录），正文用 Obsidian 嵌入语法引：

```markdown
![[cholesterol-dual-fluidity.svg]]
```

⚠️ **不带路径** —— 写 `![[xxx.svg]]` 而不是 `![[图片保存/xxx.svg]]`。
Quartz 的 `markdownLinkResolution: "shortest"` 按文件名全库解析，挪目录不会断链。
**这正是本站已有的约定**：`图片保存/index.md` 里写明了「笔记正文中通过 `![[文件名.png]]` 引用」。

---

## ⚠️ 关键差异：独立 `.svg` 在本站是 `<img>`，**进不了主题联动**

这条是选型时唯一真正重要的东西，**别弄错了**。

`ofm.ts:198-226` 里，`![[xxx.svg]]` 会被展开成：

```html
<a href="....svg" target="_blank"><img src="....svg" width="auto" height="auto"></a>
```

`<img>` 加载的 SVG 是**独立文档**，页面 CSS 完全作用不到它。所以：

| 你在独立 .svg 里写的 | 实际结果 |
|---|---|
| `stroke="var(--dark)"` | **解析不了** → 退回继承/初始值 |
| `stroke="currentColor"` | 取 SVG 自己的初始 `color`（黑），**不是**页面的 `--dark` |
| `stroke="#1a1a1a"` + `var(--x, #1a1a1a)` fallback | 能显示，但**颜色写死**，暗色模式下黑底黑字 |
| 内嵌 `<style>` + `@media (prefers-color-scheme: dark)` | ✅ 有效，但只跟随**操作系统**，**不跟随站点的 `saved-theme` 开关** |

> 📌 也就是说：「加十六进制 fallback」是**半吊子** —— 解决了「看不见」，
> 解决不了「暗色模式下仍然是深色」。想在本站真正跟随主题切换，
> **只能内联**。

### 选型结论

| 情况 | 选 |
|---|---|
| 要跟随站点明暗开关 | **内联 SVG**（唯一解） |
| 反应机理、能量剖面、分类树（要跟主题、要 `currentColor`） | **内联 SVG** |
| 元素 ≥30 个、内联会把 .md 撑得难读 | 独立文件，但要接受「不跟随主题」→ 配色按两套主题都能读来设计 |
| 想让人能单独打开看 / 在多处复用 | 独立文件（`![[x.svg]]` 会包一层 `<a target="_blank">`，点图能开原文件） |
| 简单骨架（十几个元素以内） | 内联，别开文件 |

### ⚠️ 独立 .svg 的第二个坑：`--serve` 下改文件**不生效**

`quartz/build.ts:94-103`：watch 命中非 `.md` 文件时，只给浏览器发一个 reload
（`clientRefresh()`），**不会重新 emit 到 `public/`**。

所以改了 `.svg` 之后浏览器 reload 给你看的还是 `public/` 里的旧文件 ——
**必须重启 `npx quartz build --serve`**。生产构建当然没这个问题。

（「文本本体可编辑、改完立刻刷新」是 Obsidian 的行为，Quartz 不是。）

---


## 二、配色：这是最容易翻车的地方

本站背景是**背景图 + 着色层**，不是纯色。SVG 里写死颜色 = 暗色模式下瞎眼。

| 场景 | 怎么写 |
|---|---|
| 线条、箭头、结构骨架 | `stroke="currentColor"`（继承正文色，自动跟随主题） |
| 次要线条、辅助线 | `stroke="var(--lightgray)"` |
| 填充块（要透出背景） | `fill="none"` 或 `fill="var(--lightgray)"` + `opacity` |
| 高亮某个官能团 | `stroke="var(--secondary)"`（和正文里的链接色一致） |
| 文字标签 | 见下面那条 note |

> 💡 `base.scss` 里有一句全局规则：
> ```scss
> p, ul, text, a, tr, td, li, ol, .katex, .math { color: var(--darkgray); fill: var(--darkgray); }
> ```
> **`text` 在列表里** —— 所以 SVG 里的 `<text>` 会自动拿到 `fill: var(--darkgray)`，
> 天然跟随主题，不用管。想要别的颜色才需要显式写。

**绝不要在笔记里写 `<style>`** —— style 标签不 scoped，会污染全站。
要精细配色就：

1. SVG 上加 `class="diagram"`（或 `class="diagram chem"` 之类语义类）；
2. 规则写进 `quartz/styles/custom.scss`：

```scss
.diagram {
  color: var(--dark);
  stroke: currentColor;
  fill: none;
}
.diagram .hl {
  stroke: var(--secondary);
  stroke-width: 2.5;
}
.diagram text {
  font-family: var(--bodyFont);
  font-size: 13px;
  fill: var(--darkgray);
  stroke: none;      /* 别让文字被线条的 stroke 描一遍 */
}
```

---

## 三、尺寸

```markdown
<!-- 推荐：撑满内容区但不破栏宽、水平居中 -->
<svg viewBox="0 0 640 200" width="100%"
     style="max-width:640px;height:auto;display:block;margin:1rem auto">
```

- **必须给 `viewBox`**，否则不会等比缩放
- **必须 `height:auto`**（或不给 height），否则给死高度会压扁
- 窄屏（正文栏约 700px）下 `max-width:640px` 刚好；图更大就调这个值
- 想让图**跟着文字流动**（比如嵌在句子里），把 `display:block` 去掉、`width` 改小

---

## 四、结构与命名（两个必踩的坑）

### 1. `<marker>` 的 `id` 必须全站唯一

同页有两张图都用 `<marker id="arrow">`，第二张会引用到第一张的箭头 —— 表现为
「箭头方向随机 / 位置错乱」，且极难查。

命名带上前缀：

```markdown
<marker id="arrow-aldol" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
  <path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/>
</marker>
...
<line x1="200" y1="60" x2="260" y2="60" stroke="currentColor" stroke-width="1.5"
      marker-end="url(#arrow-aldol)"/>
```

用笔记名或图名当前缀（`arrow-aldol` / `arrow-ph` / `arrow-epox`）。

### 2. 文字不要被线条描边

`stroke` 会继承给 `<text>`，结果字变成描边空心字。给文字显式 `stroke="none"`。

---

## 五、可直接复制的模板

```markdown
<svg class="diagram" viewBox="0 0 640 180" width="100%"
     style="max-width:640px;height:auto;display:block;margin:1rem auto"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <marker id="arrow-tmpl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/>
    </marker>
  </defs>

  <!-- 结构式：键用直线，双键画两条 -->
  <g stroke="currentColor" stroke-width="1.6" fill="none">
    <line x1="60" y1="100" x2="120" y2="100"/>
    <line x1="120" y1="100" x2="150" y2="60"/>
    <line x1="150" y1="60" x2="210" y2="60"/>
    <line x1="120" y1="100" x2="150" y2="140"/>
    <line x1="150" y1="140" x2="210" y2="140"/>
  </g>

  <!-- 箭头 + 反应条件 -->
  <line x1="240" y1="100" x2="330" y2="100"
        stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-tmpl)"/>
  <text x="285" y="88" text-anchor="middle" font-size="13" fill="var(--darkgray)" stroke="none">H₂O / H⁺</text>

  <!-- 标签 -->
  <text x="60" y="130" font-size="13" fill="var(--darkgray)" stroke="none">烯烃</text>
  <text x="420" y="130" font-size="13" fill="var(--darkgray)" stroke="none">醇</text>

  <!-- 高亮某个部分 -->
  <circle cx="285" cy="100" r="34" stroke="var(--secondary)" stroke-width="2" fill="none" opacity="0.5"/>
</svg>
```

图下面用一行小字说明，习惯上写成斜体：

```markdown
*上图：亲电加成的两步机理，中间是环状鎓离子*
```

---

## 六、把 ASCII 图 / 代码块图换成 SVG

**这是本项目的一条硬规则**：笔记里发现用代码块或 ASCII 字符画画的图，**一律取缔**，
换成 SVG（mermaid 排第二，但本站渲染不出来，实际就是 SVG）。

⚠️ **别把 ASCII 的格子 1:1 复刻成 SVG** —— 那样只是把难看的图换个更难看的画法。
ASCII 能承载的信息量很小，硬撑成 SVG 会画出一堆框和线却看不出意思。
**必须先把「这张图在讲什么」搞清楚，再重新设计。**

### 步骤 1 · 取证：读上下文

图的前后**各读两段**，回答三个问题：

- 这段文字在解决什么问题？图是为了让哪句话更好懂？
- 图里出现的每个名词，正文里有没有解释？（没有 → 画了也白画）
- 有没有「如下图」「见下图」这类指引？→ 决定图的标题和位置。

### 步骤 2 · 判读：这张 ASCII 图在表达什么

先破译符号，再判断图种：

| ASCII 记号 | 通常表示 |
|---|---|
| `→` `-->` | 一步反应 / 转化 |
| `⇄` `<-->` | 可逆 / 平衡 / 互变 |
| `⇢` `~~~` | 中间体、过渡态（虚线框） |
| `│` `├` `└` | 分支、层级 |
| `+` `#` `═` | 加和键 / 三键 / 双键 |
| 上标 `+` `-` `•` | 离子电荷 / 自由基 |
| 上下箭头 + `TS` `ΔE` | 能量升降、过渡态 |

| 图种 | 长什么样 | 换成 |
|---|---|---|
| **转化网络** | `┌─┐│└┘` 盒子 + 箭头串 | SVG 矩形 + `marker` 箭头 |
| **能量剖面** | 上下折线 + 高低位置 + 峰顶标 TS | SVG `polyline` + 峰值标注 + 竖直虚线 |
| **实验流程 / 决策树** | 横向 `→` 串起来、途中分叉 | SVG 流程图（方框=步骤、菱形=判断、连线标条件） |
| **分类树** | 竖线缩进 | 层级 ≤3 层用**表格**，更多层用 SVG 树 |
| **立体构象 / 楔形键** | `▲` `▼` `⋯` | SVG 楔形键，或交给侧栏 RDKit |
| **谱图分工** | 四条横线 + 标注 | SVG 或表格 |

### 步骤 3 · 选型（先问一句「值不值」）

- **能一行文字说清的别画图** —— `A ──(试剂/条件)──► B`，一行一条。
- 三层以内的层级 → **表格**，不画图。
- 其余（分支多、有空间/高低/构象含义）→ **SVG**。
- 只有当图本质是状态图/时序图/甘特图、且 SVG 元素数量会爆炸时才考虑 mermaid
  —— 但本站 mermaid 渲染不出来（见 MEMORY.md），所以实际仍然是 SVG。

### 步骤 4 · 替换

- 内联 SVG 直接写进 `.md`；复杂图（≥30 元素）写独立 `.svg` + `![[xxx.svg]]`。
- 图下面补一行斜体说明：`*上图：×××原理示意*`。
- ⚠️ **旧代码块的围栏要连内容一起删干净** —— 包括 ``` / ~~~ 的开闭标签和为对齐加的空格行。
  留半截围栏会把后面整段 markdown 变成代码块，**页面看起来像坏了但构建不报错**。
- ⚠️ 正文里「如下图所示」那句不用改；但如果新图的信息量和旧图不同，
  要检查那句话是否还对得上。

### 步骤 5 · 验收

走下面第九节的验证清单：**宽屏、窄屏、暗色模式**各看一遍，
外加「页面上代码块数量是不是真的少了」。

---

## 七、画什么 / 不画什么

**适合 SVG**：

| 场景 | 例子 |
|---|---|
| 反应机理流程 | 一步一箭，箭头上标试剂/条件，取代 ASCII 字符画 |
| 能量剖面 | 过渡态与中间体的相对能量（替代画不出来的 ASCII 能量图） |
| 层级 / 流程 | 分类树、实验流程（替代 `┌─┐│└┘`） |
| 立体示意 | 环己椅、优势构象、顺反排列 |
| 谱图归属 | 四谱分工、各区归属哪类信息 |
| 简单结构骨架 | 课堂要手画的那种骨架式；**复杂结构交给侧栏 RDKit** |

**不适合**：

| 场景 | 原因 | 改用 |
|---|---|---|
| 需要量产的化学结构式 | 内联 SVG 元素太多，md 撑不住 | `static/molecules.json` 侧栏组件 |
| 3D / 大分子结构 | SVG 做不到 | `molecules.json` 的 `pdb` 字段 |
| 精确数据曲线 | 手搓坐标轴不如表格 | 表格 |
| 只是两三个节点的转化 | 杀鸡用牛刀 | 单行文字 `A ──(试剂)──► B` |

**最后一栏很关键**：SVG 有它的成本。**能一行文字说清的就别画图**，
SVG 留给「空间结构/流程分支/能量高低」这些文字真的表达不了的。

---

## 八、放在 callout 里吗？

**不要。** callout 有左右内边距，SVG 塞进去会被压窄、比例失真。
要「提示框 + 图」就拆两段：上面 callout 一句话，下面图。

图也**不要包在 `> [!xxx]` 里**。

---

## 九、验证

⚠️ **SVG 写坏了不会报错，只会整块塌掉或变形 —— 必须亲眼看一次。**

```bash
cd /home/robin/文档/QuartzNotes/notes
npx quartz build --serve
```

打开那篇笔记，逐条检查：

- [ ] 图出来了，比例正常（没被压扁）
- [ ] 窄屏（把窗口拖窄）下不溢出正文栏
- [ ] **切暗色模式**，线条和文字都变浅、没有隐形
- [ ] 箭头方向对、指向对
- [ ] 同页多张图时，`marker` 的箭头没有串
- [ ] **页面里的代码块数量比替换前少了**（确认围栏删干净了）

有问题优先怀疑：① `marker` 的 `id` 撞了 ② 漏了 `viewBox` ③ `height` 写死 ④ 颜色写死没跟随主题。
