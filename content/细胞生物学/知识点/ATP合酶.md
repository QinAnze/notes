---
title: 线粒体 ATP 合酶（F1Fo-ATP synthase，复合体 V）
---

# 线粒体 ATP 合酶（F1Fo-ATP synthase，复合体 V）

> **一句话**：它是嵌在线粒体内膜上的**旋转分子马达**——质子顺着电化学梯度从膜间隙流回基质，带动 Fo 的 c 环和中央转轴旋转；转轴在 F1 头部里"拧"动三个 β 亚基，使它们依次经历 O→L→T 构象变化，把 ADP + Pi 合成 ATP。反向通量时，它也能水解 ATP、把质子泵回膜间隙。

---

## 一、基本参数

| 项目 | 内容 |
|---|---|
| 别名 | 复合体 V、F1Fo-ATPase、F 型 ATP 酶；细菌/叶绿体中的同源酶为 F1Fo / CF1Fo |
| 位置 | 线粒体内膜（主要在线粒体嵴）；F1 突出于基质，Fo 埋在膜内 |
| 分子量 | 单体约 600 kDa；生理状态下多为**二聚体**（约 1.2 MDa），成排排列在嵴顶 |
| 亚基 | 哺乳动物约 17–18 种；α3β3γδε + Fo + 外周柄 + 辅助亚基 |
| 催化位点 | 3 个（位于 3 个 β 亚基） |
| c 环 | 人/牛为 **8 个 c 亚基**（酵母 10、大肠杆菌 10） |
| 命名 | F1 = "fraction 1"（第一个可溶组分）；Fo = 对**寡霉素**（oligomycin）敏感的部分 |
| 方向 | 利用 Δp 合成 ATP（正向）；Δp 崩溃时水解 ATP、泵质子（反向） |

**为什么重要**：氧化磷酸化的最后一步，有氧细胞中大部分 ATP 由此产生；它也是"化学渗透假说"最直接的分子证据。

---

## 二、结构总览

<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560" font-family="'Noto Sans CJK SC','Source Han Sans SC','WenQuanYi Zen Hei',sans-serif">
  <defs>
    <marker id="arrBlue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#2874a6"/>
    </marker>
    <marker id="arrDark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#333333"/>
    </marker>
    <marker id="arrPurple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#7d3c98"/>
    </marker>
  </defs>

  <rect x="0" y="0" width="900" height="300" fill="#f2f9fd"/>
  <rect x="0" y="300" width="900" height="80" fill="#e9e9e9"/>
  <rect x="0" y="380" width="900" height="180" fill="#fdf7ec"/>
  <rect x="0" y="300" width="900" height="13" fill="#cfcfcf"/>
  <rect x="0" y="367" width="900" height="13" fill="#cfcfcf"/>
  <text x="35" y="38" font-size="16" fill="#1a5276">基质（matrix）</text>
  <text x="35" y="522" font-size="16" fill="#b9770e">膜间隙（IMS）</text>
  <text x="785" y="348" font-size="12" fill="#555555" text-anchor="middle">线粒体内膜</text>

  <circle cx="512" cy="345" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="494" cy="366" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="450" cy="375" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="406" cy="366" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="388" cy="345" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="406" cy="324" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="450" cy="315" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <circle cx="494" cy="324" r="16" fill="#f7cfa8" stroke="#b9770e" stroke-width="1.2"/>
  <text x="450" y="349" font-size="12" fill="#7e5109" text-anchor="middle">c8</text>

  <rect x="298" y="318" width="60" height="64" rx="8" fill="#d9c2e8" stroke="#6c3483" stroke-width="1.4"/>
  <text x="328" y="355" font-size="15" fill="#4a235a" text-anchor="middle">a</text>

  <rect x="318" y="218" width="13" height="112" fill="#a9dfbf" stroke="#1e8449" stroke-width="1.2"/>
  <circle cx="330" cy="195" r="25" fill="#a9dfbf" stroke="#1e8449" stroke-width="1.4"/>
  <text x="330" y="199" font-size="10" fill="#145a32" text-anchor="middle">OSCP</text>
  <text x="140" y="240" font-size="12" fill="#1e8449">外周柄（定子）</text>
  <text x="140" y="258" font-size="11" fill="#1e8449">b、OSCP、d、F6</text>
  <line x1="222" y1="253" x2="313" y2="253" stroke="#1e8449" stroke-width="0.9" stroke-dasharray="3 3"/>
  <text x="340" y="290" font-size="12" fill="#1e8449">b</text>

  <rect x="442" y="160" width="16" height="158" rx="3" fill="#c39bd3" stroke="#7d3c98" stroke-width="1.2"/>
  <circle cx="450" cy="262" r="11" fill="#e8daef" stroke="#7d3c98" stroke-width="1.2"/>
  <rect x="439" y="296" width="22" height="22" rx="4" fill="#d7b4e8" stroke="#7d3c98" stroke-width="1.2"/>
  <text x="450" y="251" font-size="13" fill="#ffffff" text-anchor="middle">γ</text>
  <text x="500" y="270" font-size="11" fill="#6c3483">中央转轴</text>
  <text x="500" y="284" font-size="10" fill="#6c3483">γ、δ、ε</text>
  <line x1="498" y1="276" x2="462" y2="276" stroke="#7d3c98" stroke-width="0.9" stroke-dasharray="3 3"/>

  <text x="450" y="42" font-size="15" fill="#1a5276" text-anchor="middle">F1 头部（α3β3，基质侧）</text>
  <circle cx="510" cy="150" r="40" fill="#8ec5e2" stroke="#2874a6" stroke-width="1.5"/>
  <circle cx="480" cy="202" r="40" fill="#f2b880" stroke="#b9770e" stroke-width="1.5"/>
  <circle cx="420" cy="202" r="40" fill="#8ec5e2" stroke="#2874a6" stroke-width="1.5"/>
  <circle cx="390" cy="150" r="40" fill="#f2b880" stroke="#b9770e" stroke-width="1.5"/>
  <circle cx="420" cy="98" r="40" fill="#8ec5e2" stroke="#2874a6" stroke-width="1.5"/>
  <circle cx="480" cy="98" r="40" fill="#f2b880" stroke="#b9770e" stroke-width="1.5"/>
  <text x="510" y="155" font-size="15" fill="#0b3a55" text-anchor="middle">α</text>
  <text x="480" y="103" font-size="15" fill="#5b3a00" text-anchor="middle">β</text>
  <text x="420" y="103" font-size="15" fill="#0b3a55" text-anchor="middle">α</text>
  <text x="390" y="155" font-size="15" fill="#5b3a00" text-anchor="middle">β</text>

  <circle cx="252" cy="150" r="18" fill="#f9e79f" stroke="#b7950b" stroke-width="1.4"/>
  <text x="252" y="154" font-size="10" fill="#7d6608" text-anchor="middle">IF1</text>
  <line x1="270" y1="155" x2="348" y2="164" stroke="#b7950b" stroke-width="0.9" stroke-dasharray="3 3"/>

  <path d="M 720 450 Q 540 472 366 400" fill="none" stroke="#2874a6" stroke-width="2" stroke-dasharray="7 5" marker-end="url(#arrBlue)"/>
  <text x="648" y="472" font-size="14" fill="#2874a6">H+</text>
  <path d="M 306 316 L 306 252" fill="none" stroke="#2874a6" stroke-width="2" stroke-dasharray="7 5" marker-end="url(#arrBlue)"/>
  <text x="338" y="256" font-size="11" fill="#2874a6">H+ → 基质</text>

  <path d="M 538 312 Q 588 345 538 380" fill="none" stroke="#333333" stroke-width="2" marker-end="url(#arrDark)"/>
  <text x="592" y="350" font-size="12" fill="#333333">旋转</text>
  <path d="M 470 250 Q 492 262 470 274" fill="none" stroke="#7d3c98" stroke-width="1.8" marker-end="url(#arrPurple)"/>

  <text x="450" y="548" font-size="15" fill="#333333" text-anchor="middle">图 1　线粒体 ATP 合酶（F1Fo）的结构与质子驱动旋转</text>
</svg>

**四个功能区**

1. **F1 头部**：α3β3 六聚体 + 中央的 γ 轴，位于基质侧，负责催化。
2. **中央转轴（rotor）**：γ、δ、ε，把 c 环的旋转传给 F1。
3. **Fo 马达**：c 环 + a 亚基，埋在膜内，负责质子传导与产生扭矩。
4. **外周柄（stator）**：b、OSCP、d、F6 等，把 a 与 α3β3 固定住，使 α3β3 不随 γ 转动。

---

## 三、F1 头部（催化部分）

- **组成**：α3β3，α 与 β 交替排列成"橘子瓣"状六聚体，中央有孔供 γ 穿过。
- **催化位点**：3 个，位于 **β 亚基**（β 与相邻 α 的界面）；α 上另有 3 个**非催化**核苷酸结合位点（主要起结构/调节作用）。
- **结构域**：每个 α/β 分三部分——N 端 β-桶（形成头部"冠"）、中央 **Rossmann 折叠**核苷酸结合域、C 端 α 螺旋域。β 的 C 端有一段保守的 **DELSEED** 序列，直接与 γ 接触，是构象传递的关键。
- **核苷酸结合**：需要 Mg²⁺；β 位点用保守残基稳定 ATP 的磷酸基与过渡态；α 位点结合核苷酸但不催化。
- **结构证据**：1994 年 Abrahams 等解出牛心 F1 的 2.8 Å 晶体结构，首次看到 α3β3γ 的排布与"不对称"的三个 β；2019 年后的冷冻电镜结构进一步看清完整酶与二聚体。

---

## 四、中央转轴（rotor）

| 亚基 | 特点 | 作用 |
|---|---|---|
| **γ** | 两条长 α 螺旋形成卷曲螺旋，C 端有一个球状"脚" | 穿过 α3β3 中央；旋转时依次"顶"三个 β，驱动 O/L/T 构象变化 |
| **δ** | 小亚基，β-桶折叠 | 位于 γ 与 ε 之间，连接两者；**与细菌 ε 同源**（名称陷阱，见下） |
| **ε** | 线粒体特有亚基，含 β-夹心结构域与 C 端螺旋 | C 端与 c 环顶部接触，把扭矩从 c 环传到 γ；与细菌 ε 不同，它不是强抑制水解的"棘爪" |

> **名称陷阱（高频考点）**
> - 细菌的 **δ** ↔ 线粒体的 **OSCP**（都在外周柄，结合 α3β3）。
> - 细菌的 **ε** ↔ 线粒体的 **δ**（都在中央转轴）。
> - 线粒体的 **ε** 是细菌中没有的额外亚基。
> 所以"线粒体 δ 就是细菌 δ"是错的。

---

## 五、Fo 马达（质子通道）

### c 环
- 人/牛为 **c8**：8 个 c 亚基围成一圈，每个 c 是"发夹"式两根跨膜 α 螺旋，中间有一段短环。
- 每个 c 在跨膜中段有一个**高度保守的酸性残基**（线粒体 c 的 **Glu58**；大肠杆菌为 **Asp61**）。它必须处于**质子化（中性）**状态才能稳定存在于疏水的膜内；去质子化（带负电）状态则由 a 亚基的 Arg 稳定。
- 质子化/去质子化循环使 c 环可以逐步转动——每结合一个质子，环前进一个 c 亚基（360°/8 = **45°**）。

### a 亚基（ATP6，线粒体基因编码）
- 多个跨膜螺旋（线粒体 a 常描述为 8 个；细菌 a 为 5 个）。
- 关键特征：**两个不连续的"半通道"**——
  - 一个从**膜间隙**开口，通向 c 的 Glu；
  - 一个从**基质**开口，通向 c 的 Glu；
  - 两个半通道在膜中央并不相通，中间隔着 c 环的 Glu。
- 含高度保守的 **Arg**（大肠杆菌 a 的 R210），与去质子化的 c-Glu 形成盐桥，降低其 pKa、促使它释放 H⁺，同时防止质子"短路"。
- a 被外周柄固定，c 环绕 a 旋转。

### 质子路径（四步）
1. H⁺ 从膜间隙进入 a 的**膜间隙侧半通道**；
2. 在 c-Glu 上**质子化**（此时 Glu 处于膜内疏水环境，必须中性）；
3. c 环旋转，把质子化的 Glu 带到 a 的另一侧；
4. 在**基质侧半通道**去质子化，H⁺ 释放到基质；空载的 Glu 继续转回膜间隙侧。

> 旋转不是"质子直接推着转"的简单动力冲程，而是**布朗棘轮**：c 环本身在热运动，质子化/去质子化与 a-Arg 的静电作用把随机运动"整流"成定向旋转。

---

## 六、外周柄（stator）与辅助亚基

- **功能**：把 a 亚基与 F1 的 α3β3 连成一体并固定，使 γ 转、α3β3 不转——否则扭矩会被"空转"抵消。
- **核心成员**：
  - **b**（ATP5PB）：一条跨膜螺旋 + 很长的基质侧 α 螺旋；哺乳动物为单拷贝（细菌 b 为同源二聚体）。
  - **OSCP**（ATP5PO，"寡霉素敏感性赋予蛋白"）：与细菌 δ 同源，结合 α3β3 顶部，把外周柄连到头部；缺失会使酶对寡霉素不敏感。
  - **d**（ATP5PD）、**F6**（ATP5PF）：连接 OSCP/b 与 Fo，维持柄的刚性。
- **辅助/超数亚基**：e、f、g、A6L（ATP8，线粒体基因编码）、DAPIT、6.8PL 等。它们多参与**组装**与**二聚化**，部分功能仍在研究中。
- **二聚化与嵴形态**：ATP 合酶二聚体通过 e/g（酵母）及 A6L、DAPIT 等（哺乳动物）形成界面，沿嵴顶成排排列，**塑造嵴的弯曲**；破坏二聚化会改变嵴形态并影响呼吸效率。

---

## 七、亚基一览（以哺乳动物为例）

| 亚基 | 人基因名 | 位置 | 拷贝数 | 关键作用 |
|---|---|---|---|---|
| α | ATP5F1A | F1 | 3 | 非催化核苷酸位点、头部骨架 |
| β | ATP5F1B | F1 | 3 | **催化位点**（O/L/T），水解/合成 ATP |
| γ | ATP5F1C | 中央转轴 | 1 | 旋转轴，驱动 β 构象变化 |
| δ | ATP5F1D | 中央转轴 | 1 | 连接 γ 与 ε（与细菌 ε 同源） |
| ε | ATP5F1E | 中央转轴 | 1 | 连接 c 环，传递扭矩（线粒体特有） |
| OSCP | ATP5PO | 外周柄 | 1 | 结合 α3β3；赋予寡霉素敏感性（与细菌 δ 同源） |
| b | ATP5PB | 外周柄 | 1 | 长螺旋，连接 OSCP 与 a |
| d | ATP5PD | 外周柄 | 1 | 连接 OSCP/b 与 Fo |
| F6 | ATP5PF | 外周柄 | 1 | 柄的组装/连接 |
| c | ATP5MC1/2/3 | Fo | 8 | 质子结合（Glu58），构成 c 环 |
| a（ATP6） | MT-ATP6 | Fo | 1 | 两个半通道 + 保守 Arg；质子传导 |
| A6L（ATP8） | MT-ATP8 | Fo/二聚界面 | 1 | 组装、二聚化 |
| e | ATP5ME | 外周柄/膜 | 1 | 二聚化 |
| f | ATP5MF | 外周柄 | 1 | 组装 |
| g | ATP5MG | 膜 | 1 | 二聚化、嵴形态 |
| DAPIT | ATP5MD | 外周柄/膜 | 1 | 二聚化/组装 |
| 6.8PL | ATP5MPL | 膜/柄 | 1 | 组装（功能不完全清楚） |
| IF1 | ATP5IF1 | 基质侧 | 1（可寡聚） | 抑制 ATP 水解 |

> 注：a 与 A6L 由**线粒体基因组**编码，其余绝大多数由核基因编码、在胞质合成后导入线粒体；个别亚基的精确拷贝数在不同物种/结构中仍有差异。

---

## 八、作用机制

### 1. 驱动力：质子动力势（pmf）

呼吸链复合体 I、III、IV 把 H⁺ 泵到膜间隙，形成跨内膜的电化学梯度：

$$\Delta p=\Delta\psi-\frac{2.3RT}{F}\Delta\mathrm{pH}$$

- Δψ：膜电位（内负外正），约 −150～−180 mV；
- ΔpH：基质偏碱，约 0.5～1 个单位；
- 合计约 **180～220 mV**，相当于每摩尔质子约 20 kJ/mol 的自由能。

### 2. 从质子流到旋转

1. 质子经 a 的膜间隙侧半通道到达 c-Glu；
2. c-Glu 质子化 → 静电约束解除 → c 环在热运动下前进一步；
3. 质子化的 Glu 转到基质侧半通道，去质子化，H⁺ 释放到基质；
4. c 环旋转经 ε/δ 传给 γ；
5. γ 在 α3β3 内转动，依次改变三个 β 的构象。

**化学计量**：c8 时，转一圈（360°）通过 **8 个 H⁺**，合成 **3 个 ATP**；即每个 ATP 对应 γ 转 120°。

### 3. 结合变构机制（binding change mechanism，Boyer）

三个 β 亚基在同一时刻处于三种不同构象，旋转使它们循环：

| 状态 | 含义 | 发生的事 |
|---|---|---|
| **O**（open） | 开放 | 释放 ATP；可结合 ADP + Pi（结合松散） |
| **L**（loose） | 松散 | ADP + Pi 被"夹住"，尚未反应 |
| **T**（tight） | 紧密 | ADP + Pi **自发**形成 ATP；ATP 被紧紧握住 |

每转 120°，三个 β 依次 O→L→T→O；转满 360° 完成 3 次合成。

**关键点**：质子流提供的能量主要用于**释放 ATP（T→O）**和**结合底物（O→L）**，而不是"把磷酸键拧出来"。在 T 位点，ADP + Pi ⇌ ATP 的平衡常数接近 1，成键几乎不耗能——这也解释了为什么 ATP 合成如此高效。

**证据链**：
- ¹⁸O 交换实验：F1 上的 ATP 可被"交换"掉，说明成键与断裂都容易发生；
- 1994 年 F1 晶体结构：三个 β 构象确实不同，且与 γ 的接触面不同；
- 1997 年 Noji 等单分子实验：把荧光标记的肌动蛋白丝接到 γ 上，直接看到 ATP 水解驱动 γ 旋转。

### 4. 能量账与 P/O

- c8 的本体消耗：8 H⁺ / 3 ATP ≈ **2.7 H⁺/ATP**；
- 加上线粒体内膜上**磷酸载体**与 **ATP/ADP 转位酶**的耗能，整体约 **4 H⁺/ATP**；
- 这解释了经典 P/O 比：NADH 氧化（10 H⁺）≈ **2.5 ATP**；FADH₂（6 H⁺）≈ **1.5 ATP**。

热力学上：

$$\Delta G=\Delta G^{\circ\prime}+RT\ln\frac{[\mathrm{ATP}]}{[\mathrm{ADP}][\mathrm{P_i}]}$$

ΔG°′ ≈ −30.5 kJ/mol；细胞内实际 ΔG 约 −45～−55 kJ/mol，所以合成需要相近的能量，3 个质子的自由能刚好够用——反应在生理条件下**接近平衡**，因此酶很容易反向运转。

### 5. 可逆性

- Δp 正常时：质子内流 → 合成 ATP；
- Δp 崩溃（如缺血、解偶联）：F1 水解 ATP，把质子泵到膜间隙（维持 Δp）；
- 线粒体中这一"浪费"被 **IF1** 抑制（见下）。

---

## 九、调节、抑制剂与组装

| 试剂/因素 | 靶点 | 效应 |
|---|---|---|
| **寡霉素**（oligomycin） | Fo（c/a 界面） | 阻断质子通道，抑制合成与水解；也是"Fo"名称的来源 |
| **DCCD** | c 的 Glu58 | 共价修饰酸性残基，锁死旋转 |
| **aurovertin、efrapeptin** | β 亚基 | 抑制催化位点 |
| **IF1** | F1 | 低 pH/低 Δp 时结合 F1，**抑制 ATP 水解**，避免缺血时 ATP 被反向消耗；也可促进二聚化 |
| **解偶联剂**（DNP、FCCP） | 内膜 | 把 H⁺"短路"回基质，消除 Δp（产热但不产 ATP） |
| **bedaquiline** | 分枝杆菌 c 亚基 | 抗结核药，专门抑制细菌型 ATP 合酶 |

**组装**：核编码亚基在胞质合成、经 TOM/TIM 导入；a 与 A6L 在线粒体核糖体上合成并共翻译插入膜。F1 与外周柄、Fo 分模块组装，需要装配因子（如 ATPAF1/ATPAF2 参与 F1 组装；**TMEM70** 参与 Fo 组装）。组装错误会导致酶量不足，而不是单纯的催化缺陷。

**二聚化**：e、g（以及 A6L、DAPIT 等）形成二聚界面；二聚体再成排，塑造嵴的曲率。二聚化缺陷常表现为嵴形态异常与呼吸效率下降。

---

## 十、生理与病理

- **能量供应**：ATP 合酶是有氧呼吸的"最后一步"，把 Δp 转化为 ATP；ATP 再经 ATP/ADP 转位酶输出到胞质。
- **母系遗传病**：MT-ATP6 的 **m.8993T>G**（L156R）与 **m.8993T>C**（L156P）是经典致病突变；异质性比例高时表现为 **NARP**（神经病、共济失调、色素性视网膜炎）或 **Leigh 综合征**（亚急性坏死性脑脊髓病）。机制是质子通道/旋转耦联受损，ATP 合成下降。
- **MT-ATP8** 变异也有心肌病等表型的报道，但较少见。
- **核基因/装配因子缺陷**：TMEM70 缺陷导致新生儿心肌病、3-甲基戊烯二酸尿等；部分核编码亚基变异也有个案报道。
- **缺血/再灌注**：Δp 下降时 F1 可能反向水解 ATP；IF1 通过抑制水解起保护作用，其表达/活性改变与心肌缺血耐受相关。
- **药物靶点**：bedaquiline 针对分枝杆菌 ATP 合酶，说明该酶在抗感染治疗中的价值；寡霉素类则主要作为研究工具。

---

## 十一、常见误区

1. **"ATP 合酶只合成 ATP"**：它可逆；方向由 Δp 与 ΔG(ATP) 的相对大小决定。
2. **"质子流的能量用来形成 ATP 的磷酸键"**：主要用来**释放 ATP 与结合底物**；成键在 T 位点几乎自发。
3. **"α3β3 六个亚基都能催化"**：只有 3 个 β 有催化位点，α 是非催化位点。
4. **"线粒体 δ 就是细菌 δ"**：线粒体 δ 对应细菌 ε；线粒体 OSCP 才对应细菌 δ。
5. **"c 环亚基数固定为 8"**：物种差异（酵母 10、大肠杆菌 10、叶绿体 14），c 数目直接决定 H⁺/ATP。
6. **"Fo 只是被动漏质子的通道"**：它是与 a 的半通道耦合的旋转马达；质子不能"直接穿过"。
7. **"IF1 抑制 ATP 合成"**：IF1 主要抑制**水解**，在 Δp 崩溃时保护 ATP。
8. **"寡霉素也抑制 V 型 ATP 酶"**：V-ATPase 的抑制剂是巴弗洛霉素等；寡霉素针对 F 型。
9. **"ATP 合酶属于呼吸链超复合体"**：它通常以二聚体/寡聚体独立成排，不与 I–IV 组成经典超复合体。
10. **"转一圈合成 8 个 ATP"**：转一圈通过 8 个 H⁺，只合成 **3 个 ATP**。

---

## 十二、自测

1. 画出 F1Fo 的四个功能区，并说明外周柄如果缺失会发生什么。
2. c 环从 8 个变成 10 个，H⁺/ATP 与 P/O 如何变化？
3. 为什么说结合变构机制中"能量主要花在释放 ATP 上"？用什么实验可以支持？
4. IF1 在缺血时为什么是保护性的？它抑制的是合成还是水解？
5. MT-ATP6 的 m.8993T>G 突变影响哪个亚基、哪一步机制？为什么表型与异质性比例相关？

---

> 记忆主线：**Δp → a 的半通道 → c-Glu 质子化 → c 环旋转 → γ 旋转 → β 的 O/L/T → ATP 释放**；反向则**ATP 水解 → γ 反转 → c 环泵质子**。
