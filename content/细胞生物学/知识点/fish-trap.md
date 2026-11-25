---
title: 核孔复合体的“捕鱼篮”结构模型
---

# 核孔复合体的“捕鱼篮”结构模型

## 0. 先厘清三个词

- **核孔复合体（nuclear pore complex, NPC）**：嵌在核膜上的巨大蛋白机器，负责核质之间几乎所有大分子的交换。
- **核篮（nuclear basket）**：NPC 朝向核质一侧的真实超微结构，由 Tpr、Nup153、Nup50 等构成，像一只挂在核孔内侧的篮子，末端有“远端环”。
- **“捕鱼篮”模型（fish-trap / fish-basket model）**：一个**功能—结构模型**，把整个 NPC 比作一只鱼篓：篮口宽、篮身有“倒刺”和网、篮底有开关。文献与教材里也叫“鱼篓模型”“捕鱼笼模型”，命名并不统一。

> 关键提醒：高分辨率结构里并没有一只“编好的竹篮”。“捕鱼篮”是把**核篮的几何形状**与**FG 重复蛋白形成的无序网**结合起来的功能类比，不是原子级别的刚性结构图。把它当“逻辑图”而不是“零件图”，才不会记错。

---

## 1. 为什么需要这个模型

NPC 要同时满足四个看似矛盾的要求：

| 要求 | 现象 |
|---|---|
| **通透** | 水、离子、代谢物、小分子蛋白（约 40 kDa 以下、直径约 9 nm 以内）几乎自由扩散 |
| **选择** | 带 NLS/NES 的大分子才能被转运；没有信号的大分子被拒之门外 |
| **快速** | 单个 NPC 每秒可转运上百至上千个转运复合物 |
| **双向** | 同一套孔道，既能进核也能出核，方向不能乱 |

一个刚性的“筛子”只能解释“大小”，解释不了**选择性、饱和性、能量依赖和方向性**。捕鱼篮模型的核心主张是：NPC 不是一根空管，而是一只**入口宽、内部粘、出口带锁**的陷阱。

---

## 2. 建筑剖面：从“篮口”到“篮底”

<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
<defs>
    <marker id="arrB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#2874a6"/>
    </marker>
    <marker id="arrG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1e8449"/>
    </marker>
  </defs>
  <rect width="900" height="620" fill="#fbfcfd"/>
  <text x="450" y="32" font-family="sans-serif" font-size="19" fill="#1a5276" text-anchor="middle">核孔复合体（NPC）纵切：捕鱼篮模型</text>
  <text x="80" y="72" font-family="sans-serif" font-size="15" fill="#34495e">细胞质</text>
  <text x="80" y="585" font-family="sans-serif" font-size="15" fill="#34495e">核质</text>
  <line x1="50" y1="268" x2="370" y2="268" stroke="#95a5a6" stroke-width="7" stroke-linecap="round"/>
  <line x1="530" y1="268" x2="850" y2="268" stroke="#95a5a6" stroke-width="7" stroke-linecap="round"/>
  <line x1="50" y1="298" x2="370" y2="298" stroke="#95a5a6" stroke-width="7" stroke-linecap="round"/>
  <line x1="530" y1="298" x2="850" y2="298" stroke="#95a5a6" stroke-width="7" stroke-linecap="round"/>
  <text x="190" y="291" font-family="sans-serif" font-size="12" fill="#7f8c8d">核膜（外膜 / 内膜）</text>
  <ellipse cx="450" cy="245" rx="82" ry="15" fill="#cfe0ee" stroke="#4a7ba7" stroke-width="2.5"/>
  <ellipse cx="450" cy="322" rx="82" ry="15" fill="#cfe0ee" stroke="#4a7ba7" stroke-width="2.5"/>
  <line x1="372" y1="252" x2="398" y2="316" stroke="#6b8fb3" stroke-width="9" stroke-linecap="round" opacity="0.55"/>
  <line x1="528" y1="252" x2="502" y2="316" stroke="#6b8fb3" stroke-width="9" stroke-linecap="round" opacity="0.55"/>
  <g fill="none" stroke="#d68910" stroke-width="3" stroke-linecap="round">
    <path d="M410,255 C400,270 420,282 410,295 C400,306 415,315 410,322"/>
    <path d="M430,252 C440,268 420,282 430,296 C440,308 425,315 430,322"/>
    <path d="M450,250 C440,268 460,282 450,298 C440,310 455,316 450,324"/>
    <path d="M470,252 C480,268 460,282 470,296 C480,310 465,316 470,322"/>
    <path d="M490,255 C480,270 500,282 490,295 C480,306 495,315 490,322"/>
  </g>
  <g fill="#b9770e">
    <circle cx="410" cy="283" r="2.8"/><circle cx="430" cy="288" r="2.8"/>
    <circle cx="450" cy="284" r="2.8"/><circle cx="470" cy="288" r="2.8"/>
    <circle cx="490" cy="283" r="2.8"/>
  </g>
  <g fill="none" stroke="#d68910" stroke-width="4" stroke-linecap="round">
    <path d="M410,240 C400,220 415,200 405,180 C400,170 402,164 406,158"/>
    <path d="M430,238 C420,218 435,198 428,178 C424,168 426,162 428,156"/>
    <path d="M470,238 C480,218 465,198 472,178 C476,168 474,162 472,156"/>
    <path d="M490,240 C500,220 485,200 495,180 C500,170 498,164 494,158"/>
  </g>
  <g fill="#d68910">
    <circle cx="406" cy="158" r="4"/><circle cx="428" cy="156" r="4"/>
    <circle cx="472" cy="156" r="4"/><circle cx="494" cy="158" r="4"/>
  </g>
  <g fill="none" stroke="#8e44ad" stroke-width="4" stroke-linecap="round">
    <path d="M412,325 C405,360 415,395 420,425"/>
    <path d="M432,328 C428,365 432,400 436,430"/>
    <path d="M468,328 C472,365 468,400 464,430"/>
    <path d="M488,325 C495,360 485,395 480,425"/>
  </g>
  <ellipse cx="450" cy="432" rx="42" ry="9" fill="none" stroke="#8e44ad" stroke-width="3"/>
  <line x1="450" y1="130" x2="450" y2="468" stroke="#2874a6" stroke-width="2.5" stroke-dasharray="7 6" marker-end="url(#arrB)"/>
  <line x1="450" y1="462" x2="450" y2="478" stroke="#1e8449" stroke-width="3" marker-end="url(#arrG)"/>
  <circle cx="450" cy="110" r="15" fill="#d6eaf8" stroke="#2874a6" stroke-width="2"/>
  <text x="450" y="114" font-family="sans-serif" font-size="10" fill="#1a5276" text-anchor="middle">cargo</text>
  <text x="450" y="80" font-family="sans-serif" font-size="13" fill="#2874a6" text-anchor="middle">importin–cargo（带 NLS 的货物）</text>
  <circle cx="450" cy="505" r="24" fill="#d5f5e3" stroke="#1e8449" stroke-width="2.5"/>
  <text x="450" y="509" font-family="sans-serif" font-size="10" fill="#145a32" text-anchor="middle">RanGTP</text>
  <text x="450" y="552" font-family="sans-serif" font-size="14" fill="#1e8449" text-anchor="middle">RanGTP 结合 → 货物释放</text>
  <text x="600" y="182" font-family="sans-serif" font-size="13" fill="#7e5109">胞质纤维（篮口）</text>
  <text x="600" y="200" font-family="sans-serif" font-size="11" fill="#7e5109">Nup358 / Nup214 / Nup88</text>
  <text x="600" y="224" font-family="sans-serif" font-size="13" fill="#1f4e79">胞质环（Y 复合体）</text>
  <text x="600" y="246" font-family="sans-serif" font-size="13" fill="#7e5109">FG-Nup 网（篮身）</text>
  <text x="600" y="262" font-family="sans-serif" font-size="11" fill="#7e5109">Nup62 / Nup54 / Nup58 / Nup98</text>
  <text x="600" y="338" font-family="sans-serif" font-size="13" fill="#1f4e79">核质环</text>
  <text x="600" y="422" font-family="sans-serif" font-size="13" fill="#5b2c6f">核篮（篮底 / 出口）</text>
  <text x="600" y="440" font-family="sans-serif" font-size="11" fill="#5b2c6f">Tpr / Nup153 / Nup50</text>
  <text x="515" y="438" font-family="sans-serif" font-size="11" fill="#5b2c6f">远端环</text>
  <text x="352" y="352" font-family="sans-serif" font-size="12" fill="#4a6b85" text-anchor="end">辐（spoke）</text>
  <rect x="620" y="470" width="250" height="88" rx="8" fill="#f4f6f7" stroke="#d0d7de"/>
  <text x="632" y="495" font-family="sans-serif" font-size="13" fill="#34495e">小分子（&lt; 40 kDa）</text>
  <text x="632" y="516" font-family="sans-serif" font-size="12" fill="#566573">可直接扩散通过</text>
  <circle cx="648" cy="538" r="4" fill="#95a5a6"/>
  <circle cx="666" cy="538" r="4" fill="#95a5a6"/>
  <circle cx="684" cy="538" r="4" fill="#95a5a6"/>
  <line x1="700" y1="538" x2="830" y2="538" stroke="#95a5a6" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#arrB)"/></svg>

### 各区域的“零件清单”

| 区域 | 代表核孔蛋白 | 结构特征 | 在模型中的角色 |
|---|---|---|---|
| 胞质纤维 | Nup358/RanBP2、Nup214、Nup88 | 长而弯曲的 FG 纤维，伸向胞质 | **篮口**：先“嗅到”并捕获入核货物；锚定 RanGAP |
| 胞质环 | Nup107–160（Y 复合体）等 | 八重对称的支架环 | 篮口框架，固定纤维与中央通道 |
| 辐（spoke） | Nup93、Nup205、Nup188 等 | 连接胞质环与核质环 | 支撑“篓壁”，维持通道口径 |
| 中央通道 | Nup62、Nup54、Nup58、Nup98 | FG 重复、内在无序 | **篮身**：粘性网，货物在此“跳跃”通过 |
| 核质环 | Nup153、Nup50、Y 复合体 | 与胞质环近似对称 | 篮底框架 |
| 核篮 | Tpr、Nup153、Nup50 | Tpr 卷曲螺旋形成篮状纤维，末端有远端环 | **篮底/出口**：组织核内端，限制流出方向 |
| 跨膜核孔蛋白 | gp210（NUP210）、Pom121、Ndc1 | 跨内膜，锚定整个 NPC | 把“篮子”固定在核膜上 |

### 几个尺度数字

| 参数 | 脊椎动物 NPC（近似） |
|---|---|
| 总质量 | 约 120 MDa（酵母约 50 MDa） |
| 对称性 | 八重旋转对称（8 个辐、8 个 Y 复合体单元） |
| 核孔蛋白种类 | 约 30 种，每种多个拷贝 |
| 外径 | 约 120 nm |
| 中央通道内径 | 约 40 nm（酵母约 30 nm） |
| 自由扩散经验阈值 | 约 9 nm / 40 kDa |
| 核篮向核质延伸 | 约 50–70 nm，远端环直径约 50–100 nm |
| 每个哺乳动物细胞 | 约 10³ 个 NPC（随细胞类型与活性变化） |
| 单孔转运通量 | 每秒上百至上千个转运复合物 |

---

## 3. 模型的四层“捕鱼”逻辑

### 第一层：篮口——胞质纤维先“兜住”

- Nup358（RanBP2）是最大的核孔蛋白之一，含大量 FG 重复与 Ran 结合结构域；Nup214/Nup88 复合体也伸出长纤维。
- 带 NLS 的货物先被 importin α/β 识别，importin β 表面的疏水沟槽与纤维上的 FG 基序结合，货物在胞质一侧被**富集、定向**。
- 这一层像鱼篓的**敞口**：鱼不是随便撞进来，而是被水流（扩散）带到口部，再被“倒刺”留住。

### 第二层：篮身——FG 网是“粘性迷宫”，不是空管

- 中央通道里，Nup62/Nup54/Nup58/Nup98 的 FG 重复像聚合物刷一样伸入通道，彼此交叠，形成一张**无序但连续的网**。
- 货物不是从“洞”里直线穿过，而是沿着 FG 位点**逐点结合—解离—再结合**，像在网面上“跳跃”。
- 这张网对**不结合 FG 的大分子**是排斥的（空间被占 + 疏水环境不利）；对**结合 FG 的转运受体**是友好的。这就是“捕鱼”的选择性来源。

### 第三层：篮底——核篮把出口“收拢”

- 核篮由 Tpr 的卷曲螺旋形成，Nup153、Nup50 提供 FG 位点；末端收成一个**远端环**。
- 它不是一堵墙，而是一个**漏斗**：把从中央通道出来的复合物引导到核质侧，同时防止核内分子随意“倒灌”。
- 核篮还参与核内染色质组织、基因表达调控（Tpr 与转录活跃区、Nup153 与染色质边界有关），不只是“出口”。

### 第四层：开锁——RanGTP 让陷阱“放鱼”

- 核内高浓度的 **RanGTP**（由染色质上的 RCC1 生成）与 importin β 结合，使 importin β 构象改变、释放货物。
- 胞质侧的 **RanGAP**（锚定在 Nup358 上）把 RanGTP 水解成 RanGDP，保证“锁”只在核内打开。
- 因此同一只鱼篓可以**双向使用**：入核时在核内开锁，出核时在胞质开锁，方向由 RanGTP 梯度决定。

> 一句话：**篮口捕获、篮身粘住、篮底收拢、Ran 开锁**。四层缺一不可。

---

## 4. 分子机制：FG 重复为什么能“捕鱼”

### FG 基序与“多价弱相互作用”

- FG-Nup 是**内在无序蛋白（IDP）**，没有固定折叠，序列里密集分布 FG、FxFG、GLFG 基序。
- 苯丙氨酸（F）的侧链是疏水“锚点”，甘氨酸（G）提供柔性间隔。
- importin β 由 HEAT 重复组成，表面有多个**浅疏水口袋**，每个口袋与一个 FG 基序结合，单个结合很弱（解离常数常在微摩尔至毫摩尔级）。
- 但一个 importin β 可以同时接触**几十个** FG 位点，多价结合产生很强的**总亲和力（avidity）**；同时每个位点又能快速解离，保证货物不被“粘死”。
- 这种“**弱而多、快进快出**”的策略，是核孔既能高选择又能高通量的秘诀。

### 为什么小分子可以自由通过

- 小分子（< 40 kDa）通常不与 FG 结合，也不会被 FG 网的疏水环境严重排斥；通道内仍有足够的“空隙”供其扩散。
- 大分子如果不带 NTR（核转运受体），即使尺寸勉强够小，也会因为缺少 FG 结合能力而被网“弹回”。
- 所以“大小”只是第一道门槛，“会不会粘 FG”才是第二道门槛。

### 方向性从哪来

| 运输方向 | 核内信号 | 胞质信号 | 结果 |
|---|---|---|---|
| 入核（import） | RanGTP 高 → 结合 importin β | RanGAP 水解 RanGTP | 核内卸货，受体出核 |
| 出核（export） | RanGTP 高 → 组装 exportin–RanGTP–cargo | RanGAP 水解 → 复合物解体 | 胞质卸货，受体回核 |

- RanGTP 梯度由 **RCC1（核内染色质）** 与 **RanGAP（胞质、Nup358）** 维持；RanGDP 由 NTF2 运回核内再生。
- 所以核转运直接消耗的是 **GTP**，而不是 ATP；ATP 主要通过维持细胞整体能量状态间接支持。

---

## 5. 一次核输入的完整流程

1. **识别**：货物上的 NLS 被 importin α 识别，importin α 再与 importin β 结合，形成转运复合物。
2. **篮口捕获**：复合物扩散到 NPC 胞质侧，importin β 与 Nup358/Nup214 的 FG 重复结合，在篮口被富集。
3. **进入篮身**：复合物沿中央通道的 FG 网逐点结合、解离，向核内方向“跳跃”前进。
4. **穿过核质环**：到达核篮区域，Nup153/Nup50 的 FG 位点继续接力。
5. **核内开锁**：RanGTP 与 importin β 结合，复合物解体，货物被释放到核质。
6. **受体回收**：importin β–RanGTP 沿 NPC 出核；胞质 RanGAP 水解 GTP，复合物解体，importin β 可再用于下一轮。
7. **梯度维持**：RanGDP 由 NTF2 运入核内，RCC1 将其重新转化为 RanGTP。

核输出是镜像过程：exportin（CRM1）在核内与 RanGTP、带 NES 的货物组装，经 FG 网出核，胞质 RanGAP 水解 RanGTP 后货物释放。

---

## 6. 这个模型能解释什么

| 现象 | 捕鱼篮模型的解释 |
|---|---|
| 小分子自由扩散 | 不结合 FG，网内空隙足够 |
| 大分子需信号 | 必须与 NTR 结合，才能“粘”上 FG 网 |
| 转运可饱和 | FG 位点与 NTR 数量有限，底物过多会排队 |
| 需要能量 | RanGTP 梯度由 GTP 水解维持；没有 RanGTP 就无法开锁 |
| 双向但方向不乱 | 开锁位置由 RanGTP 梯度决定 |
| 核糖体亚基等超大货物 | 需要特定出口路径与额外因子，不是简单“挤过去” |
| WGA 抑制转运 | WGA 结合核孔蛋白的 GlcNAc，堵住 FG 网 |
| 抗 Nup62 抗体抑制 | 直接干扰中央通道的 FG 网 |

---

## 7. 与其他模型的关系

| 模型 | 核心比喻 | 主要解释 | 局限 |
|---|---|---|---|
| 布朗运动亲和门 | 通道口的“粘性门帘” | 货物随机碰撞，结合 FG 才能进 | 对通道内部几何描述不足 |
| 选择性相 / 水凝胶 | FG 网像水凝胶 | 亲水小分子可穿，NTR 可“溶入” | 难以解释超大货物与快速通量 |
| 虚拟门 | 热运动瞬时打开的“门帘” | 不需要刚性门 | 偏抽象，缺结构对应 |
| 环形循环 | 支架环可扩张/收缩 | 通道口径动态变化 | 与货物选择性关系不直接 |
| 双门 | 胞质端与核端两道门 | 防止核质分子泄漏 | 门的具体分子身份仍有争议 |
| **捕鱼篮** | **鱼篓：口宽、身粘、底有锁** | **把几何、FG 网、Ran 开关串成一个叙事** | **是整合性教学模型，不是单一原子结构** |

这些模型并非互斥，而是对同一现象在不同尺度上的描述。捕鱼篮模型的优势是**好记、能串起整个转运过程**；它的风险是**容易被误读成一只固定的蛋白篮子**。

---

## 8. 边界与争议：不要把比喻当结构

1. **FG-Nup 没有固定结构**。它们是内在无序蛋白，冷冻电镜看到的是“密度”和“纤维”，不是编好的篮壁。
2. **核篮是真实结构，但不等于整个捕鱼篮**。Tpr 形成篮状纤维，Nup153/Nup50 提供 FG；它们只是“篮底”。
3. **不同货物可能走不同路径**。mRNA、核糖体亚基、病毒核衣壳的出口机制并不完全相同，有的需要特定适应因子。
4. **物种差异大**。酵母与脊椎动物的 NPC 在质量、中央通道直径、核孔蛋白组成上都有差别，不能把数字当成普适常数。
5. **“捕鱼篮”不是唯一正确模型**。它更像一个**教学整合框架**；真正的分子机制仍在用冷冻电镜、单分子追踪和重塑实验不断修正。

---

## 9. 疾病与病毒劫持

| 对象 | 相关核孔蛋白 | 后果 |
|---|---|---|
| 急性髓系白血病 | NUP98 融合（如 NUP98–NSD1） | 融合蛋白改变核孔/染色质调控，促癌 |
| T 细胞急性淋巴细胞白血病 | NUP214–ABL1 | 激酶持续激活 |
| 婴儿双侧纹状体坏死 | NUP62 突变 | 中枢神经系统退行 |
| 家族性房颤 | NUP155 突变 | 核膜/核孔功能异常 |
| 激素抵抗型肾病综合征 | NUP107、NUP93、NUP205、NUP160 等 | 足细胞核孔组装缺陷 |
| 急性坏死性脑病 | RanBP2（Nup358）突变 | 病毒感染后过度炎症 |
| HIV-1 | Nup358、Nup153、CPSF6 | 预整合复合体穿越核孔 |
| HBV | Nup153 等 | 核衣壳入核 |
| 腺病毒 | Nup214、Nup358 | 脱衣壳与基因组入核 |

核孔也是**药物递送与基因治疗**的天然关卡：如何让质粒、mRNA、CRISPR 复合物高效入核，是纳米载体设计的核心问题之一。

---

## 10. 一页速记

- **一只鱼篓**：胞质纤维是篮口，FG 网是篮身，核篮是篮底，RanGTP 是开锁的钥匙。
- **四个数字**：约 120 MDa、八重对称、约 30 种 Nup、中央通道约 40 nm。
- **两道门槛**：尺寸（约 9 nm / 40 kDa）与 FG 结合能力。
- **一种策略**：多价弱相互作用——弱而多，快进快出。
- **一个方向**：RanGTP 核内高、胞质低；开锁位置决定运输方向。
- **一句提醒**：捕鱼篮是功能逻辑图，不是原子零件图；FG 网是无序的，篮子不是刚性的。
