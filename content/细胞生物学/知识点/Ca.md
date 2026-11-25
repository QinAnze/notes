---
title: 癌细胞与癌症（细胞生物学视角）
---

# 癌细胞与癌症（细胞生物学视角）

> 相关笔记：[[端粒与端粒酶]]、[[染色体带]]（易位与核型分析）、[[翻译]]（癌基因蛋白的合成与调控层次）、维生素D,钙,晒太阳（1,25D 与细胞分化、凋亡）

## 0. 一句话概括

癌症不是"一种病"，而是**一类基因组病 + 演化过程**：体细胞在多年中累积突变与表观遗传改变，经**克隆选择**获得一整套互相配合的异常表型——持续增殖、逃避生长抑制、抵抗死亡、无限复制、诱导血管、侵袭转移、代谢重编程、免疫逃逸——最终突破组织边界，并在远处器官重建肿瘤。

三个关键词，缺一不可：

- **突变累积**（基因组不稳定 → 驱动基因被激活或失活）
- **克隆演化**（选择压力下的达尔文式竞争，产生瘤内异质性与耐药）
- **微环境共谋**（成纤维细胞、免疫细胞、血管、基质、菌群共同"供养"肿瘤）

> 一句更短的版本：**癌症 = 一群获得了"自私增殖 + 不死 + 会跑 + 会躲"能力的细胞，在错误的微环境里持续演化。**

---

## 1. 先厘清术语：瘤、癌、肉瘤不是同义词

| 术语 | 含义 | 举例 |
|---|---|---|
| **肿瘤（neoplasm/tumor）** | 细胞克隆性异常增生，生长不受机体调控 | 脂肪瘤、腺瘤、癌 |
| **良性肿瘤** | 有包膜或界限清楚，不浸润、不转移，但可压迫局部 | 子宫肌瘤、结肠腺瘤 |
| **恶性肿瘤（癌症）** | 浸润性生长 + 远处转移能力，可致死 | 肺癌、乳腺癌 |
| **癌（carcinoma）** | 起源于**上皮**的恶性肿瘤（占人类恶性肿瘤约 80%–90%） | 腺癌、鳞癌 |
| **肉瘤（sarcoma）** | 起源于**间叶组织**（骨、软骨、脂肪、肌肉、血管） | 骨肉瘤、脂肪肉瘤 |
| **白血病 / 淋巴瘤** | 造血与淋巴系统的恶性克隆 | AML、DLBCL |
| **其他** | 神经外胚层（黑色素瘤）、胶质（胶质瘤）、生殖细胞 | 黑色素瘤、精原细胞瘤 |
| **原位癌（carcinoma in situ）** | 异型细胞累及上皮全层，但**基底膜完整**、未浸润 | 乳腺 DCIS、宫颈 CIN III |
| **癌前病变** | 形态学异常、恶变风险显著升高 | 结肠腺瘤、Barrett 食管、肝硬化 |

分层诊断的两个维度不要混淆：

- **分级（grade）**：看**分化程度**与核分裂象，反映"细胞有多恶"。
- **分期（stage）**：看**浸润深度、淋巴结、远处转移**（TNM），反映"病有多晚"。
- 同一分级可以有不同分期；决定预后的主要是分期。

### 单克隆性：判定"这是不是一个细胞的后代"

这是肿瘤生物学的第一个硬证据问题。常用判据：

- **X 染色体失活**：女性细胞随机失活一条 X；若肿瘤中所有细胞失活的是同一条，说明来自单一克隆（多见于子宫平滑肌瘤）。
- **免疫球蛋白/T 细胞受体基因重排**：淋巴瘤中所有细胞重排模式一致 → 单克隆。
- **特征性易位**：如 CML 的 t(9;22)（BCR-ABL1）在所有系别（粒、红、巨核、甚至部分淋巴细胞）中都能检出 → 病变起始于**多能造血干细胞**，这是"白血病干细胞"概念的直接证据。
- **共享的非整倍体核型或拷贝数图谱**（现代多用 SNP 芯片/单细胞测序）。

> 反例提示：部分"肿瘤"是多克隆的（如某些甲状腺结节、炎症性假瘤），因此"肿瘤＝单克隆"是**统计规律**，不是定义。

---

## 2. 癌细胞 vs 正常细胞：表型对照

| 维度 | 正常细胞 | 癌细胞 |
|---|---|---|
| 形态 | 大小均一、核质比正常、极性保留 | 多形性、核大深染、核仁明显、核膜不规则、极性丧失 |
| 增殖控制 | 依赖生长因子、有接触抑制与密度抑制 | 生长因子需求降低、失去接触抑制、可锚定非依赖生长（软琼脂成集落） |
| 细胞周期 | 有 G1/S 检查点、可进入 G0 静息 | 检查点失效、G0 逃逸、cyclin/CDK 组成性激活 |
| 死亡 | 损伤不可修复时凋亡 | 凋亡阈值升高、失巢凋亡抵抗 |
| 复制寿命 | 每次分裂端粒缩短 → 海弗利克极限 | 端粒酶重激活或 ALT → 永生化 |
| 黏附与骨架 | E-钙黏蛋白介导同型黏附、极性完整 | E-钙黏蛋白下调、波形蛋白升高、伪足与侵袭性 |
| 基因组 | 核型稳定（多数体细胞） | 非整倍体、易位、扩增、微卫星不稳定 |
| 代谢 | 有氧时主要靠氧化磷酸化 | 有氧糖酵解增强（Warburg 效应）、谷氨酰胺依赖 |
| 免疫 | 正常 MHC-I 呈递、可被清除 | MHC-I 下调、PD-L1 上调、招募抑制性细胞 |
| 分泌 | 受调控 | 自分泌生长因子、VEGF、MMP、外泌体、SASP 样因子 |
| 组织构筑 | 参与正常组织结构 | 破坏腺体/层级结构，促纤维增生反应 |

> 注意：**"癌细胞"不是一种固定状态**。同一肿瘤里，不同细胞的表型差别可以很大；同一细胞在不同微环境中也可以切换表型（见第 4 节"表型可塑性"）。

---

## 3. 基因组基础：癌症是"演化"而非"事故"

### 3.1 突变的类型

| 类型 | 细胞生物学后果 | 例子 |
|---|---|---|
| **点突变**（错义/无义/剪接） | 蛋白功能获得、丢失或截断 | KRAS G12C、BRAF V600E、TP53 R175H |
| **小插入/缺失（indel）** | 移码、提前终止 | APC、BRCA1 的截断突变 |
| **拷贝数扩增** | 剂量效应（癌基因过量） | HER2 扩增、MYC 扩增、EGFR 扩增 |
| **大片段缺失 / LOH** | 抑癌基因双等位失活 | CDKN2A、PTEN、RB1 |
| **染色体易位** | 融合基因、或把癌基因"搬"到强增强子旁 | t(9;22) BCR-ABL1；t(8;14) MYC-IGH；t(14;18) BCL2-IGH |
| **非整倍体 / 全基因组加倍** | 染色体数目异常，蛋白剂量失衡 | 多数实体瘤存在 |
| **染色质碎裂（chromothripsis）** | 一次事件造成局部数十至数百个重排 | 骨肉瘤、胶质瘤 |
| **爆发性突变（kataegis）** | 局部超突变，常与 APOBEC 活性相关 | 乳腺癌、头颈癌 |
| **微卫星不稳定（MSI）** | 错配修复缺陷 → 短重复序列长度漂移 | Lynch 综合征、部分胃癌/结直肠癌 |

### 3.2 驱动突变与乘客突变

- **驱动突变（driver）**：直接赋予选择优势，位于癌基因或抑癌基因的关键区域。一个典型实体瘤通常有 **2–8 个**驱动事件（不同组织差异很大）。
- **乘客突变（passenger）**：随克隆扩增"搭车"出现，本身无选择优势。一个肿瘤可有几十到上万个乘客突变。
- 判断依据：突变是否反复出现在同一基因的同一热点、是否改变蛋白功能、是否与表达/通路激活一致。

### 3.3 两类关键基因（以及常被忽略的第三类）

| 类别 | 正常功能 | 激活/失活方式 | 遗传学特征 |
|---|---|---|---|
| **癌基因（oncogene）** | 促进增殖、存活 | **功能获得（GOF）**：点突变、扩增、易位、插入突变 | 通常**一个等位**改变即可（显性） |
| **抑癌基因（tumor suppressor）** | 刹车：检查点、凋亡、分化 | **功能丢失（LOF）**：缺失、截断、沉默 | 通常需**两个等位**都失活（隐性，Knudson 两次打击） |
| **基因组维护基因（caretaker）** | DNA 修复、染色体分离、检查点 | LOF | 失活后**突变率整体升高**，间接促癌（MMR、BRCA1/2、POLE） |

常见的癌基因激活机制与代表：

- **点突变**：KRAS（G12/G13/Q61）、BRAF V600E、PIK3CA（H1047R）、EGFR（L858R）。
- **扩增**：HER2（ERBB2）、MYC、CCND1（cyclin D1）、MDM2。
- **易位**：BCR-ABL1（CML）、MYC-IGH（Burkitt 淋巴瘤）、EWSR1-FLI1（Ewing 肉瘤）、TMPRSS2-ERG（前列腺癌）。
- **启动子突变**：**TERT 启动子**突变（-124C>T / -146C>T）在胶质瘤、黑色素瘤、肝癌、膀胱癌中常见，直接提高端粒酶转录。

常见的抑癌失活：

- **TP53**：约半数人类肿瘤失活；多数是错义突变（**显性负性**，突变蛋白与野生型形成失活四聚体），少数是缺失或截断。
- **RB1**：视网膜母细胞瘤、小细胞肺癌；RB 失活使 E2F 持续释放。
- **CDKN2A**：编码 p16（CDK4/6 抑制因子）与 p14ARF（稳定 p53），一个位点同时打击两条通路，故缺失频率极高。
- **APC**：结直肠癌起始事件，WNT 通路失控。
- **PTEN**：脂质磷酸酶，负调 PI3K-AKT；缺失后 AKT 持续激活。
- **SMAD4 / TGFBR2**：TGF-β 生长抑制通路断裂。

### 3.4 Knudson 两次打击与遗传性肿瘤

Knudson 研究视网膜母细胞瘤提出：抑癌基因需**两次打击**才失活。

- **遗传型**：出生即携带一个胚系突变（全身每个细胞一个打击），任何细胞再发生一次体细胞突变即可成瘤 → 发病早、常双侧、多灶。
- **散发型**：同一细胞需连续两次体细胞打击 → 发病晚、单侧、单灶。

| 综合征 | 基因 | 主要肿瘤 |
|---|---|---|
| 遗传性视网膜母细胞瘤 | RB1 | 视网膜母细胞瘤、骨肉瘤 |
| Li-Fraumeni | TP53 | 乳腺癌、骨肉瘤、脑瘤、肾上腺皮质癌（早发、多发） |
| 家族性腺瘤性息肉病（FAP） | APC | 数百至数千枚结肠腺瘤 → 结直肠癌 |
| Lynch 综合征 | MLH1/MSH2/MSH6/PMS2 | 结直肠癌、子宫内膜癌（MSI-H） |
| 遗传性乳腺卵巢癌 | BRCA1/BRCA2 | 乳腺癌、卵巢癌、胰腺癌、前列腺癌 |
| von Hippel-Lindau | VHL | 肾透明细胞癌、嗜铬细胞瘤、血管母细胞瘤 |
| Cowden | PTEN | 乳腺癌、甲状腺癌、子宫内膜癌 |
| 遗传性弥漫型胃癌 | CDH1 | 弥漫型胃癌（常考虑预防性胃切除） |

> 记忆抓手：**癌基因是"油门卡住"，抑癌基因是"刹车失灵"，caretaker 是"修车工罢工"。** 三者组合，车才会失控。

### 3.5 突变从哪来：外源、内源与"突变特征"

- **外源**：烟草（多环芳烃、亚硝胺）、酒精（乙醛）、黄曲霉毒素 B1、紫外线、电离辐射、石棉、苯、马兜铃酸。
- **内源**：复制错误、ROS 造成的 8-oxo-G、胞嘧啶自发脱氨（C→T）、脂质过氧化产物。
- **酶促"故意"损伤**：APOBEC 胞苷脱氨酶家族（抗病毒防御），在肿瘤中异常活化造成局部超突变。
- **修复失败**：MMR 缺陷 → MSI；HR 缺陷 → 大片段缺失与 LOH。

**突变特征（mutational signature）** 是把"突变谱"当作指纹，反推病因：

| 特征 | 主要病因 | 常见肿瘤 |
|---|---|---|
| SBS4 | 烟草 | 肺癌、头颈癌、膀胱癌 |
| SBS7a/b | 紫外线（CPD、6-4PP） | 皮肤黑色素瘤、鳞癌 |
| SBS22 | 马兜铃酸 | 尿路上皮癌、肝癌 |
| SBS24 | 黄曲霉毒素 | 肝细胞癌（常伴 TP53 R249S） |
| SBS2/13 | APOBEC | 乳腺、宫颈、膀胱 |
| SBS6/15/20/26 | 错配修复缺陷 | 结直肠癌、子宫内膜癌 |

### 3.6 克隆演化：为什么肿瘤越治越"聪明"

一个 1 cm³ 的肿瘤约含 $10^{9}$ 个细胞。按突变率估算，**耐药亚克隆往往在治疗开始前就已存在**（不是治疗"制造"了耐药）。治疗只是施加选择压力：

1. 敏感克隆大量死亡 → 肿瘤缩小（临床"缓解"）。
2. 预先存在的耐药克隆失去竞争者 → 快速扩增。
3. 复发肿瘤的基因组与初诊时**不同**（获得性突变，如 EGFR T790M、ESR1 突变、RB1 缺失）。
4. 分支演化：不同转移灶可能来自不同亚克隆，因此"原发灶测序"未必代表全部病灶。

这解释了三个临床现象：**缓解后复发、同一患者不同病灶疗效不一、单靶点药物终会失效**。

---

## 4. 十四大标志：癌细胞的"能力清单"

<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="540" viewBox="0 0 1240 540">
<rect width="1240" height="540" fill="#ffffff"/>
  <text x="620" y="46" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="23" font-weight="bold" fill="#1f2937">癌细胞与癌症：十四大标志（Hanahan, 2000 → 2011 → 2022）</text>
  <!-- ===== 第一行：2000 年六大标志（蓝） ===== -->
  <g>
    <rect x="40" y="76" width="216" height="104" rx="8" fill="#EAF4FF" stroke="#2F6FBF" stroke-width="1.8"/>
    <text x="148" y="104" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#123f73">持续增殖信号</text>
    <text x="148" y="128" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">RTK–RAS–MAPK、PI3K–AKT</text>
    <text x="148" y="146" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">MYC↑、cyclin D–CDK4/6</text>
    <text x="148" y="166" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">配体–受体自分泌环路</text>
  </g>
  <g>
    <rect x="274" y="76" width="216" height="104" rx="8" fill="#EAF4FF" stroke="#2F6FBF" stroke-width="1.8"/>
    <text x="382" y="104" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#123f73">逃避生长抑制</text>
    <text x="382" y="128" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">RB 失活、p53 缺失</text>
    <text x="382" y="146" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">无视接触抑制与 TGF-β</text>
    <text x="382" y="166" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">Hippo–YAP 失控</text>
  </g>
  <g>
    <rect x="508" y="76" width="216" height="104" rx="8" fill="#EAF4FF" stroke="#2F6FBF" stroke-width="1.8"/>
    <text x="616" y="104" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#123f73">抵抗细胞死亡</text>
    <text x="616" y="128" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">BCL-2↑、BAX/BAK↓</text>
    <text x="616" y="146" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">逃逸凋亡、焦亡、铁死亡</text>
    <text x="616" y="166" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">失巢凋亡抵抗</text>
  </g>
  <g>
    <rect x="742" y="76" width="216" height="104" rx="8" fill="#EAF4FF" stroke="#2F6FBF" stroke-width="1.8"/>
    <text x="850" y="104" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#123f73">无限复制潜能</text>
    <text x="850" y="128" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">端粒酶重激活（85–90%）</text>
    <text x="850" y="146" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">或 ALT 同源重组延长</text>
    <text x="850" y="166" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">越过复制性衰老</text>
  </g>
  <g>
    <rect x="976" y="76" width="216" height="104" rx="8" fill="#EAF4FF" stroke="#2F6FBF" stroke-width="1.8"/>
    <text x="1084" y="104" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#123f73">诱导血管生成</text>
    <text x="1084" y="128" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">VEGF-A↑、HIF-1α 稳定</text>
    <text x="1084" y="146" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">血管拟态、血管共选择</text>
    <text x="1084" y="166" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">周细胞缺失、通透性高</text>
  </g>
  <!-- ===== 第二行：侵袭转移（蓝）+ 2011/使能（绿） ===== -->
  <g>
    <rect x="40" y="196" width="216" height="104" rx="8" fill="#EAF4FF" stroke="#2F6FBF" stroke-width="1.8"/>
    <text x="148" y="224" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#123f73">侵袭与转移</text>
    <text x="148" y="248" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">EMT、MMP 降解基底膜</text>
    <text x="148" y="266" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">CTC 入血、外渗定植</text>
    <text x="148" y="286" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#123f73">种子与土壤、转移前龛</text>
  </g>
  <g>
    <rect x="274" y="196" width="216" height="104" rx="8" fill="#EAF7EF" stroke="#2E8B57" stroke-width="1.8"/>
    <text x="382" y="224" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#1c5c3a">代谢重编程</text>
    <text x="382" y="248" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">有氧糖酵解（Warburg）</text>
    <text x="382" y="266" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">谷氨酰胺分解、乳酸外排</text>
    <text x="382" y="286" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">IDH 突变产生 2-HG</text>
  </g>
  <g>
    <rect x="508" y="196" width="216" height="104" rx="8" fill="#EAF7EF" stroke="#2E8B57" stroke-width="1.8"/>
    <text x="616" y="224" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#1c5c3a">逃避免疫清除</text>
    <text x="616" y="248" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">MHC-I↓、β2M 突变</text>
    <text x="616" y="266" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">PD-L1↑、IDO、腺苷</text>
    <text x="616" y="286" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">Treg、M2 巨噬、MDSC</text>
  </g>
  <g>
    <rect x="742" y="196" width="216" height="104" rx="8" fill="#EAF7EF" stroke="#2E8B57" stroke-width="1.8"/>
    <text x="850" y="224" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#1c5c3a">基因组不稳定</text>
    <text x="850" y="248" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">CIN、MSI、HRD</text>
    <text x="850" y="266" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">染色质碎裂、爆发性突变</text>
    <text x="850" y="286" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">突变率升高 → 演化加速</text>
  </g>
  <g>
    <rect x="976" y="196" width="216" height="104" rx="8" fill="#EAF7EF" stroke="#2E8B57" stroke-width="1.8"/>
    <text x="1084" y="224" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#1c5c3a">促肿瘤炎症</text>
    <text x="1084" y="248" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">IL-6–STAT3–NF-κB</text>
    <text x="1084" y="266" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">ROS、RANKL、TNF</text>
    <text x="1084" y="286" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#1c5c3a">慢性炎症 → 癌变温床</text>
  </g>
  <!-- ===== 第三行：2022 新维度（紫）+ 图例 ===== -->
  <g>
    <rect x="40" y="316" width="216" height="104" rx="8" fill="#F3EAFB" stroke="#7B3FA0" stroke-width="1.8"/>
    <text x="148" y="344" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#4b2166">表型可塑性</text>
    <text x="148" y="368" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">干性获得、EMT 连续谱</text>
    <text x="148" y="386" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">谱系转换：腺癌→神经内分泌</text>
    <text x="148" y="406" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">治疗后表型漂移</text>
  </g>
  <g>
    <rect x="274" y="316" width="216" height="104" rx="8" fill="#F3EAFB" stroke="#7B3FA0" stroke-width="1.8"/>
    <text x="382" y="344" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#4b2166">表观遗传重编程</text>
    <text x="382" y="368" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">启动子 CpG 岛超甲基化</text>
    <text x="382" y="386" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">全基因组低甲基化</text>
    <text x="382" y="406" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">增强子劫持、SWI/SNF 失活</text>
  </g>
  <g>
    <rect x="508" y="316" width="216" height="104" rx="8" fill="#F3EAFB" stroke="#7B3FA0" stroke-width="1.8"/>
    <text x="616" y="344" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#4b2166">多态微生物组</text>
    <text x="616" y="368" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">具核梭杆菌、幽门螺杆菌</text>
    <text x="616" y="386" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">菌群代谢物调节免疫</text>
    <text x="616" y="406" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">细菌酶灭活吉西他滨</text>
  </g>
  <g>
    <rect x="742" y="316" width="216" height="104" rx="8" fill="#F3EAFB" stroke="#7B3FA0" stroke-width="1.8"/>
    <text x="850" y="344" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="14.5" font-weight="bold" fill="#4b2166">衰老细胞蓄积</text>
    <text x="850" y="368" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">SASP：IL-6、IL-8、MMP</text>
    <text x="850" y="386" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">衰老是把双刃剑：先屏障后帮凶</text>
    <text x="850" y="406" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4b2166">senolytics 正在探索</text>
  </g>
  <g>
    <rect x="976" y="316" width="216" height="104" rx="8" fill="#FAFAFA" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="1084" y="342" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="12.5" font-weight="bold" fill="#374151">颜色含义</text>
    <rect x="1000" y="354" width="12" height="10" fill="#EAF4FF" stroke="#2F6FBF"/>
    <text x="1020" y="364" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#374151">2000 年六大标志</text>
    <rect x="1000" y="374" width="12" height="10" fill="#EAF7EF" stroke="#2E8B57"/>
    <text x="1020" y="384" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#374151">2011 年新增 + 使能特征</text>
    <rect x="1000" y="394" width="12" height="10" fill="#F3EAFB" stroke="#7B3FA0"/>
    <text x="1020" y="404" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#374151">2022 年新增维度</text>
  </g>
  <text x="40" y="456" font-family="Noto Sans CJK SC, sans-serif" font-size="12" fill="#374151">共同底座：基因组不稳定 + 促肿瘤炎症 + 表观遗传重编程，三者互相放大，构成“演化引擎”。</text>
  <text x="40" y="480" font-family="Noto Sans CJK SC, sans-serif" font-size="12" fill="#374151">注意：这些标志不是“清单打勾”，而是同一群细胞在时间中逐步获得、并可逆可失的能力组合。</text>
  <text x="40" y="504" font-family="Noto Sans CJK SC, sans-serif" font-size="12" fill="#6b7280">参考：Hanahan D, Weinberg RA. Cell 2000;100:57–70；Cell 2011;144:646–674；Hanahan D. Cancer Discov 2022;12:31–46.</text></svg>

下面按"能力"逐条讲机制、关键分子与对应的治疗切入点。**每一条都不是孤立开关，而是可以逐步获得、也可以丢失的能力。**

### 4.1 持续增殖信号（sustaining proliferative signaling）

正常细胞只在有生长因子时增殖。癌细胞用三种方式摆脱依赖：

- **自产自销**：自己分泌 PDGF、TGF-α 等，同时表达相应受体（自分泌环路）。
- **受体过表达或突变**：EGFR、HER2 扩增；EGFR 胞外域缺失突变（EGFRvIII）组成性激活。
- **下游组成性激活**：KRAS、BRAF、PIK3CA 突变；PTEN 缺失使 PI3K 产物 PIP₃ 不被降解，AKT 持续活化。
- **解除负反馈**：NF1 缺失（RAS-GAP 失效）、SOCS 缺失（失去对 STAT 的抑制）。

对应治疗：EGFR/HER2 单抗与 TKI、BRAF+MEK 抑制剂、PI3K 抑制剂、KRAS G12C 共价抑制剂。

### 4.2 逃避生长抑制（evading growth suppressors）

两条"刹车"最常被破坏：

- **RB–E2F 通路**：RB 低磷酸化时结合并抑制 E2F；CDK4/6–cyclin D 磷酸化 RB 后释放 E2F，进入 S 期。肿瘤中 CDKN2A（p16）缺失、CCND1 扩增、CDK4 扩增、RB1 突变都会让 RB 失守。
- **p53 通路**：DNA 损伤 → ATM/ATR → p53 稳定 → p21 升高 → CDK 抑制 → G1 停滞或凋亡。TP53 突变使这道"基因组卫士"失效。

此外还有：

- **TGF-β 通路**：正常上皮中 TGF-β 抑制增殖、促分化；肿瘤中 SMAD4/TGFBR2 失活后，TGF-β 反而促 EMT、促免疫抑制。
- **接触抑制**：Hippo 通路的 LATS1/2 在细胞拥挤时磷酸化 YAP/TAZ 使其滞留胞质；NF2（merlin）缺失或 YAP 扩增使细胞"感觉不到拥挤"。

对应治疗：CDK4/6 抑制剂（哌柏西利等，用于 HR⁺ 乳腺癌）、MDM2 抑制剂（恢复 p53）、YAP–TEAD 抑制剂（临床前）。

### 4.3 抵抗细胞死亡（resisting cell death）

凋亡是最主要的"安全阀"，其两条通路都可被肿瘤关闭：

- **内源通路（线粒体）**：损伤 → BAX/BAK 寡聚 → 线粒体外膜通透化（MOMP）→ 释放 cyt c → APAF-1/ caspase-9 → caspase-3。肿瘤通过 **BCL-2/BCL-xL/MCL-1 过表达**、**BAX 突变**、**p53 失活**（使 PUMA/NOXA 不表达）来抬高阈值。
- **外源通路（死亡受体）**：Fas/FasL、TRAIL → caspase-8。肿瘤可下调 Fas 或表达诱饵受体。

其他死亡方式也被利用：

- **失巢凋亡（anoikis）抵抗**：脱离基质仍能存活，是转移的前提。
- **坏死性凋亡**：RIPK1/RIPK3/MLKL，肿瘤常下调 RIPK3 逃避。
- **焦亡**：GSDMD 成孔，肿瘤通过表观沉默 GSDME 减弱。
- **铁死亡**：GPX4/SLC7A11 上调 → 脂质过氧化物不被清除；部分肿瘤（如弥漫型胃癌、肾癌）对铁死亡诱导敏感。

对应治疗：BCL-2 抑制剂维奈克拉（CLL、AML）、BH3 模拟物、铁死亡诱导剂（临床前）、SMAC 模拟物。

### 4.4 无限复制潜能（enabling replicative immortality）

正常体细胞每次分裂端粒缩短约 50–100 bp，进入危机后多数死亡。肿瘤用两种方式越过：

- **端粒酶重激活**（约 85%–90%）：hTERT 启动子突变、MYC 扩增、启动子低甲基化。
- **ALT（alternative lengthening of telomeres）**：以同源重组为机制的端粒延长，常见于肉瘤、星形细胞瘤、胰腺神经内分泌肿瘤，伴 ATRX/DAXX 缺失。

机制细节见 [[端粒与端粒酶]]。

对应治疗：端粒酶抑制剂（Imetelstat 已在部分较低危 MDS 获批）、TERT 启动子疫苗、ALT 肿瘤的 ATR 抑制剂（合成致死思路）。

### 4.5 诱导血管生成（inducing/accessing vasculature）

肿瘤超过约 1–2 mm³ 就需要新生血管。所谓"血管生成开关"（angiogenic switch）由促血管与抑血管因子平衡决定：

- **促**：VEGF-A（缺氧经 HIF-1α 诱导，也可由 RAS/MYC 诱导）、FGF2、IL-8、Ang-2。
- **抑**：血小板反应蛋白-1（TSP-1）、血管抑素、内皮抑素。

肿瘤血管的特点：**结构紊乱、周细胞覆盖不足、基底膜不连续、通透性高、血流不均**——既造成缺氧与药物递送不良，也给转移提供入口。除出芽式血管生成，还有**血管共选择**（沿现有血管生长）、**血管拟态**（肿瘤细胞自身形成管道样结构）、**骨髓来源内皮祖细胞**参与。

对应治疗：贝伐珠单抗（抗 VEGF-A）、VEGFR TKI（舒尼替尼、仑伐替尼）、血管正常化策略（低剂量、按时间窗给药）。

### 4.6 侵袭与转移（activating invasion and metastasis）

转移是一个"多步闯关"过程，每一步都有大量细胞死亡，最终只有极少数克隆成功：

1. **局部侵袭**：EMT 样转变（E-钙黏蛋白↓、N-钙黏蛋白/波形蛋白↑），分泌 MMP2/9、uPA 降解基底膜与间质；CAF 重塑胶原并"开路"。
2. **内渗（intravasation）**：穿过血管/淋巴管内皮进入循环。
3. **循环中存活**：作为 CTC 抵抗血流剪切力（常与血小板、中性粒细胞结合形成"簇"）、逃避免疫。
4. **外渗（extravasation）**：在远处毛细血管床黏附、穿出。
5. **定植（colonization）**：在"转移前龛"（premetastatic niche，由原发灶分泌的外泌体与骨髓来源细胞预先铺设）中存活并增殖；多数细胞在此失败（"低效"环节）。

两大经典假说：

- **种子与土壤**（Paget）：CTC 是"种子"，靶器官微环境是"土壤"，二者需匹配（如前列腺癌偏好骨、乳腺癌偏好骨/肺/肝/脑）。
- **机械/解剖学说**：转移分布部分由血流途径决定（如结直肠癌经门静脉先到肝）。

对应治疗：抗 MMP 药物临床失败（毒性大、时机难）；现更多针对微环境（CAF、免疫）、CTC 簇（如抑制 Na⁺/K⁺-ATP 酶）、以及转移前龛形成（LOX 抑制剂）。

### 4.7 基因组不稳定与突变（genome instability and mutation）

这是所有标志的"发动机"：

- **CIN（染色体不稳定）**：错误分离、非整倍体、全基因组加倍、染色质碎裂。
- **MSI**：MMR 缺陷使短重复序列长度漂移，突变率升高 100–1000 倍。
- **HRD（同源重组缺陷）**：BRCA1/2、PALB2、RAD51C 等失活 → 双链断裂只能靠易错的 NHEJ/微同源介导修复 → 大片段丢失与 LOH。

同时，肿瘤常**保留**某些修复通路，这构成"合成致死"的窗口：HRD 肿瘤依赖 PARP 单链修复，PARP 抑制剂使其崩溃（PARP 捕获 + 复制叉塌陷）。

对应治疗：PARP 抑制剂（奥拉帕利等）、铂类（HRD 肿瘤更敏感）、免疫检查点抑制剂（MSI-H/dMMR 是首个"组织不可知"适应证）。

### 4.8 促肿瘤炎症（tumor-promoting inflammation）

炎症既可以是"因"也可以是"果"：

- 慢性炎症促癌的经典链条：**慢性肝炎 → 肝硬化 → 肝癌**；**Barrett 食管 → 食管腺癌**；**IBD → 结直肠癌**；**H. pylori → 胃炎 → 胃癌/MALT 淋巴瘤**。
- 机制：ROS/RNS 直接损伤 DNA；IL-6–STAT3、TNF–NF-κB 促存活与增殖；RANKL 促破骨/促转移；炎症细胞释放 MMP 与 VEGF。

对应治疗：抗 IL-6/IL-6R、JAK 抑制剂（部分骨髓增殖性肿瘤）、COX-2 抑制剂（FAP 高危人群的化学预防有证据）、针对 TAM 的 CSF1R 抑制剂。

### 4.9 代谢重编程（deregulating cellular metabolism）

- **Warburg 效应**：即使有氧，仍以糖酵解为主，把葡萄糖转为乳酸。收益是"快"而非"多"：单位葡萄糖产 ATP 少，但碳骨架可转入核苷酸、氨基酸、脂肪酸合成；乳酸酸化微环境、抑制免疫、促进血管生成。
- **关键节点**：HK2、PFKFB3、PKM2（低活性二聚体，利于合成代谢）、LDHA、MCT1/MCT4（乳酸转运）、GLUT1/GLUT3（葡萄糖摄取↑）。
- **谷氨酰胺分解**：GLS1 把谷氨酰胺转为谷氨酸，回补三羧酸循环（anaplerosis）、提供氮与抗氧化力（谷胱甘肽）。
- **丝氨酸/一碳代谢**：PHGDH 扩增，支持核苷酸合成与甲基化。
- **脂质合成**：SREBP、FASN、ACLY 上调，满足膜增殖需求。
- **"反向 Warburg"**：CAF 糖酵解产乳酸，供肿瘤细胞氧化利用（代谢共生）。
- **重要例外**：并非所有肿瘤都"糖酵解主导"。胰腺癌、部分淋巴瘤、以及某些耐药细胞高度依赖氧化磷酸化——这正是"代谢靶向"不能一刀切的原因。

对应治疗：IDH1/2 抑制剂（突变型 AML、胆管癌，2-HG 是"表观代谢物"）、GLS1 抑制剂（临床前/早期试验）、二甲双胍与 OXPHOS 抑制剂的探索。

### 4.10 逃避免疫清除（avoiding immune destruction）

正常免疫系统能识别并清除表达新抗原的异常细胞（**免疫编辑**三阶段）：

1. **清除（elimination）**：NK、CD8⁺ T、DC 协同杀伤。
2. **平衡（equilibrium）**：残余肿瘤细胞被持续压制但不消失。
3. **逃逸（escape）**：免疫原性低的克隆扩增，或建立免疫抑制微环境。

逃逸的具体机制：

- **抗原呈递缺陷**：MHC-I 下调、**β2M 突变**（导致 MHC-I 无法上膜）、TAP 缺失、抗原加工异常。
- **免疫检查点**：PD-L1 上调（常由 IFN-γ 诱导，形成"适应性免疫抵抗"）、CTLA-4 配体（CD80/86）竞争。
- **免疫抑制细胞**：Treg（FOXP3⁺）、M2 样 TAM、MDSC；分泌 IL-10、TGF-β。
- **代谢抑制**：IDO 耗竭色氨酸；CD39/CD73 产生腺苷；乳酸酸化。
- **"别吃我"信号**：CD47 高表达抑制巨噬细胞吞噬。
- **T 细胞耗竭**：持续抗原刺激 → PD-1/TIM-3/LAG-3 高表达、效应功能丧失。

对应治疗：抗 CTLA-4、抗 PD-1/PD-L1、抗 TIGIT/LAG-3、CD47 阻断、IDO 抑制剂（多数失败）、CAR-T、双特异性抗体、TIL 疗法、新抗原疫苗。

### 4.11 解锁表型可塑性（unlocking phenotypic plasticity）

这是 2022 年新增的维度，也是耐药与转移的重要解释：

- **去分化（dedifferentiation）**：黑色素瘤在 BRAF/MEK 抑制剂治疗后失去 MITF 高表达状态，转为去分化、侵袭性更强。
- **谱系转换（transdifferentiation）**：前列腺腺癌在雄激素剥夺治疗后转为**神经内分泌癌**（NEPC），不再依赖 AR 通路。
- **干性获得**：通过 EMT 或表观重编程回到类干细胞状态，获得自我更新与耐药。
- **化生（metaplasia）**：如 Barrett 食管（鳞状→柱状）。

与 4.6 的 EMT 一样，可塑性是**连续谱、可逆**的过程，不是"开关"。

对应治疗：表观遗传药物（DNMT 抑制剂、HDAC 抑制剂、EZH2 抑制剂）联合去分化逆转策略，多处于临床试验阶段。

### 4.12 非突变性表观遗传重编程（nonmutational epigenetic reprogramming）

肿瘤可以"不改序列就改表达"，且这种状态有时可被药物逆转：

- **启动子 CpG 岛超甲基化**：CDKN2A、MLH1、BRCA1、CDH1 沉默；CIMP 表型（结直肠癌）。
- **全基因组低甲基化**：重复序列（LINE-1）去抑制、基因组不稳定、癌基因异常表达。
- **组蛋白修饰**：EZH2（H3K27me3）功能获得（淋巴瘤、前列腺癌）；H3K27M 突变（儿童弥漫性中线胶质瘤，抑制 PRC2）；H3K4me3 与超级增强子激活 MYC。
- **染色质重塑复合物**：SWI/SNF 亚基 ARID1A（卵巢透明细胞癌、子宫内膜癌）、SMARCB1（横纹肌样瘤）。
- **增强子劫持（enhancer hijacking）**：易位把强增强子搬到癌基因旁（如 IGH 增强子驱动 BCL2、MYC；TAL1 在 T-ALL）。

对应治疗：地西他滨/阿扎胞苷（MDS、AML）、EZH2 抑制剂（滤泡淋巴瘤）、HDAC 抑制剂（皮肤 T 细胞淋巴瘤）、BET 抑制剂（临床前）。

### 4.13 多态微生物组（polymorphic microbiomes）

微生物组已成为肿瘤生物学的正式维度：

- **直接致癌**：H. pylori（胃癌、MALT 淋巴瘤）、HBV/HCV（肝癌）、HPV（宫颈癌、口咽癌）、EBV（鼻咽癌、Burkitt、霍奇金）、HTLV-1（成人 T 细胞白血病）、肝吸虫（胆管癌）。
- **间接促癌**：具核梭杆菌（Fusobacterium nucleatum）富集于结直肠癌，促炎、促 EMT、抑制 T 细胞；菌群代谢物（次级胆汁酸、N-亚硝基化合物）损伤 DNA。
- **影响治疗**：菌群可调节免疫治疗应答（如 Akkermansia muciniphila 与 PD-1 疗效正相关）；**Gammaproteobacteria 表达的胞苷脱氨酶可灭活吉西他滨**（胰腺癌耐药机制之一）；肠道菌群影响伊立替康的毒性（β-葡萄糖醛酸酶）。

对应策略：粪菌移植辅助免疫治疗（临床试验）、抗生素/噬菌体精准清除、工程菌递送药物。

### 4.14 衰老细胞蓄积（senescent cells）

衰老细胞是"活着但不分裂、还爱说话"的细胞：

- **特征**：p16INK4a 与 p21 升高、SA-β-gal 阳性、染色质重塑（SAHF）、**SASP**（IL-6、IL-8、MMP、TGF-β、VEGF）持续分泌。
- **双刃剑**：癌基因诱导衰老（OIS）本是**抑癌屏障**；但衰老细胞在微环境中通过 SASP 促炎、促血管、促邻近细胞恶变，并招募免疫抑制细胞。
- **来源**：化疗/放疗诱导的衰老肿瘤细胞与基质细胞（治疗相关衰老，常与复发相关）。
- **senolytics**：达沙替尼 + 槲皮素等在临床试验中；靶点包括 BCL-2/BCL-xL、PI3K-AKT、SCAP。

---

## 5. 从正常细胞到癌：多步演化

### 5.1 结直肠癌的经典路径（Vogelstein 模型）

```mermaid
flowchart LR
    N["正常结肠黏膜"] --> A["APC 失活<br/>异常隐窝灶"]
    A --> B["KRAS 激活<br/>早期腺瘤"]
    B --> C["SMAD4 / DCC 丢失<br/>中晚期腺瘤"]
    C --> D["TP53 失活<br/>原位癌"]
    D --> E["浸润、淋巴结转移"]
    E --> F["远处转移"]
```

这条路径的含义不止是"记住了四个基因"：

- **顺序有意义**：APC 失活先解除 WNT 抑制（启动），KRAS 提供增殖优势（放大），SMAD4 丢失解除 TGF-β 抑制，TP53 丢失使基因组不稳定与抗凋亡同时发生（恶化）。
- **时间尺度长**：从腺瘤到癌通常 10–20 年，这正是结肠镜筛查有效的生物学基础（在癌前阶段切除）。
- **驱动数量因组织而异**：CML 中单个 BCR-ABL1 就足以起始；而胰腺癌常需 KRAS→CDKN2A→TP53→SMAD4 四步；不同组织的"起点门槛"不同。

### 5.2 其他常见路径

| 肿瘤 | 典型驱动序列/关键事件 |
|---|---|
| 胰腺导管腺癌 | KRAS → CDKN2A → TP53 → SMAD4；广泛促纤维增生 |
| 肺腺癌 | EGFR/KRAS/ALK → TP53、CDKN2A；从不典型腺瘤样增生到浸润癌 |
| 肝细胞癌 | HBV/HCV/酒精/黄曲霉 → TERT 启动子、CTNNB1、TP53；肝硬化背景 |
| 食管腺癌 | Barrett 食管 → TP53 → 扩增（ERBB2、CCND1） |
| 前列腺癌 | TMPRSS2-ERG 融合、PTEN 丢失、SPOP 突变 → 去分化/神经内分泌转化 |
| 胶质母细胞瘤 | IDH 野生型：TERT 启动子、EGFR 扩增/EGFRvIII、CDKN2A 缺失、PTEN 丢失 |

### 5.3 时间、年龄与"场效应"

- **年龄是最强风险因素**：突变随分裂次数累积；免疫监视随年龄下降；慢性炎症累积。
- **场效应（field cancerization）**：长期致癌暴露使一片上皮整体"预突变"，因此头颈癌、食管癌术后局部复发率高——切除的是"最坏的点"，不是"坏掉的田"。
- **组织干细胞是主要靶细胞**：累积突变的载体往往是长期存活的干细胞/祖细胞（肠道 Lgr5⁺ 细胞、基底细胞等）。

### 5.4 瘤内异质性的来源

1. **遗传异质性**：不同亚克隆携带不同驱动组合。
2. **表观异质性**：同一克隆在不同微环境位置表达不同程序。
3. **微环境异质性**：氧、营养、免疫细胞分布不均。
4. **空间异质性**：肿瘤边缘（侵袭前沿、EMT 样、免疫排斥）与核心（缺氧、坏死）截然不同。

临床后果：**单点活检 + 单基因检测可能低估肿瘤**；这也是多区域测序、ctDNA 动态监测、单细胞技术进入临床研究的动因。

---

## 6. 肿瘤微环境：不是"背景"，是"共犯"

| 成分 | 主要作用 | 代表标志 |
|---|---|---|
| **CAF（癌相关成纤维细胞）** | 分泌胶原与 LOX 硬化基质、分泌 TGF-β/HGF、促 EMT 与耐药 | α-SMA、FAP、PDGFRα |
| **TAM（肿瘤相关巨噬细胞）** | M2 样：促血管、促侵袭、抑制 T 细胞；也可被 CD47 阻断"再教育" | CD68、CD163、CSF1R |
| **Treg** | 抑制效应 T 细胞，分泌 IL-10/TGF-β | FOXP3、CD25 |
| **MDSC** | 抑制 T 细胞与 NK，产 ROS/精氨酸酶 | CD11b、GR-1（小鼠） |
| **NK / CD8⁺ T** | 杀伤肿瘤；功能常被耗竭 | CD56、CD8、PD-1 |
| **内皮细胞与周细胞** | 供血供氧；结构异常致药物递送差 | CD31、PDGFRβ |
| **细胞外基质** | 力学信号（硬度）促增殖与侵袭；屏障作用 | 胶原 I、纤连蛋白、透明质酸 |
| **缺氧与酸性** | HIF-1α 激活、免疫抑制、放化疗抵抗 | HIF-1α、CA9、乳酸 |
| **外泌体/胞外囊泡** | 传递 miRNA、蛋白，预铺转移前龛 | CD63、CD81 |

三个常考的双向关系：

- **力学–表观**：基质硬度 → 整合素–FAK–YAP → 促增殖与干性。
- **缺氧–代谢–免疫**：缺氧 → 乳酸/腺苷 → T 细胞抑制 → 免疫逃逸。
- **炎症–血管–转移**：炎症细胞释放 VEGF/MMP → 血管通透 → 便于内渗。

---

## 7. 致癌因素：把"病因"落到分子上

### 7.1 化学因素

| 因素 | 主要肿瘤 | 分子机制 |
|---|---|---|
| 烟草（多环芳烃、亚硝胺、苯） | 肺、膀胱、头颈、食管、胰腺 | 形成 DNA 加合物 → 特征性突变（SBS4） |
| 酒精（乙醛） | 口咽、食管、肝、乳腺 | 乙醛加合 DNA；叶酸代谢干扰 |
| 黄曲霉毒素 B1 | 肝癌 | TP53 R249S 热点突变 |
| 马兜铃酸 | 尿路上皮癌、肝癌 | A:T→T:A 特征突变（SBS22） |
| 加工肉/红肉 | 结直肠癌 | 亚硝基化合物、血红素促氧化 |
| 苯、甲醛 | 白血病、鼻咽癌 | 染色体损伤、交联 |

### 7.2 物理因素

- **紫外线**：CPD 与 6-4PP → TP53、PTCH1 突变；基底细胞癌、鳞癌、黑色素瘤。
- **电离辐射**：双链断裂、染色体易位；甲状腺癌、白血病、乳腺癌（尤其青春期暴露）。
- **石棉**：间皮瘤（长期潜伏 20–40 年）；慢性炎症 + 染色体损伤。

### 7.3 生物因素（约 15%–20% 的肿瘤与感染相关）

| 病原 | 肿瘤 | 关键机制 |
|---|---|---|
| HPV 16/18 | 宫颈癌、口咽癌、肛门癌 | **E6 降解 p53**（经 E6AP 泛素化）；**E7 灭活 RB** |
| HBV / HCV | 肝细胞癌 | 整合致基因组不稳定、HBx 干扰 p53、慢性炎症与肝硬化 |
| EBV | 鼻咽癌、Burkitt、霍奇金、NK/T 细胞淋巴瘤 | LMP1 模拟 CD40、EBNA 促 B 细胞永生化 |
| H. pylori | 胃癌、MALT 淋巴瘤 | CagA 注入细胞、慢性炎症、ROS |
| HTLV-1 | 成人 T 细胞白血病 | Tax 激活 NF-κB、促增殖 |
| 肝吸虫 | 胆管癌 | 慢性胆管炎症 |

> 这部分是**最可预防**的：HPV 疫苗、乙肝疫苗、根除 H. pylori、抗 HCV 治疗，都属于"从病因端切断"。

### 7.4 宿主因素

- **遗传**：约 5%–10% 的肿瘤有明确胚系易感基因（见 3.4）。
- **免疫状态**：器官移植后长期免疫抑制 → 皮肤癌、淋巴增殖性疾病显著增加；HIV → Kaposi 肉瘤、淋巴瘤。
- **代谢与内分泌**：肥胖（子宫内膜癌、食管腺癌、结直肠癌）、2 型糖尿病、雌激素暴露（乳腺癌、子宫内膜癌）。
- **慢性炎症与纤维化**：肝硬化、慢性胰腺炎、IBD、慢性萎缩性胃炎。

---

## 8. 诊断与治疗：每一条都对应一个细胞生物学机制

### 8.1 诊断的三个层次

1. **形态学**：H&E 染色看异型性、结构紊乱、浸润；特殊染色（网织纤维、黏蛋白）。
2. **免疫组化（IHC）**：用抗体确定"细胞来源 + 功能状态"，如 CK（上皮）、Vimentin（间叶）、CD45（淋巴）、ER/PR/HER2（乳腺）、Ki-67（增殖指数）、PD-L1（免疫治疗标志）。
3. **分子病理**：FISH（HER2 扩增、ALK 融合）、PCR/数字 PCR（EGFR 突变、MSI）、NGS panel（驱动基因、TMB、HRD、融合）、甲基化分类（脑肿瘤）、**液体活检**（ctDNA、CTC）。

> 细胞生物学视角的关键点：**形态是表型的终点，分子是表型的因**。现代病理是"形态 + 分子"双轨。

### 8.2 治疗手段与机制对应

| 手段 | 细胞生物学机制 | 代表 |
|---|---|---|
| 手术 | 物理切除局部病灶 | 早期实体瘤根治 |
| 放疗 | DNA 双链断裂 + ROS；可诱导免疫原性细胞死亡（远隔效应） | 鼻咽癌、宫颈癌、前列腺癌 |
| 化疗 | 抗代谢（5-FU 抑制 TS、MTX 抑制 DHFR）、烷化/铂类交联 DNA、拓扑异构酶抑制、微管稳定/解聚 | 紫杉醇、顺铂、吉西他滨 |
| 内分泌治疗 | 阻断激素受体信号 | 他莫昔芬（ER）、恩杂鲁胺（AR） |
| 靶向治疗 | 抑制驱动癌基因或其通路 | 伊马替尼（BCR-ABL/KIT）、奥希替尼（EGFR T790M）、曲妥珠单抗（HER2）、BRAF+MEK、克唑替尼（ALK）、奥拉帕利（PARP/BRCA） |
| 抗体偶联药物（ADC） | 抗体定位 + 细胞毒载荷内吞释放 | T-DM1、德曲妥珠单抗（DS-8201） |
| 免疫检查点抑制剂 | 解除 T 细胞抑制 | 帕博利珠单抗（PD-1）、伊匹木单抗（CTLA-4） |
| 细胞治疗 | 改造 T 细胞识别肿瘤抗原 | CAR-T（CD19、BCMA）、TIL、TCR-T |
| 双特异抗体 | 把 T 细胞"拉"到肿瘤细胞旁 | 贝林妥欧单抗（CD19×CD3） |
| 溶瘤病毒/疫苗 | 选择性裂解肿瘤 + 激发免疫 | 新抗原疫苗、T-VEC |
| 分化治疗 | 强制未成熟细胞分化 | ATRA + 砷剂（APL，PML-RARA） |

几个"机制–药物"必须能对上号的经典例子：

- **APL（急性早幼粒细胞白血病）**：PML-RARA 融合阻断粒细胞分化 → **全反式维甲酸 + 三氧化二砷**降解融合蛋白 → 细胞重新分化。这是"分化治疗"的范式。
- **CML**：BCR-ABL1 融合激酶 → 伊马替尼占据 ATP 结合位点 → 抑制下游 STAT5/PI3K；耐药常由 **T790M 类似的门控突变（T315I）** 引起。
- **BRCA 突变肿瘤**：HR 缺陷 → PARP 抑制剂"合成致死"；同时对铂类敏感。
- **MSI-H/dMMR 肿瘤**：高突变负荷 → 新抗原多 → 免疫检查点抑制剂疗效好（首个按标志物而非组织来源批准的适应证）。

### 8.3 耐药的细胞生物学机制

| 机制 | 具体表现 | 对策思路 |
|---|---|---|
| 靶点二次突变 | EGFR T790M/C797S、ALK G1202R、ABL T315I | 新一代 TKI、变构抑制剂 |
| 旁路激活 | MET 扩增绕过 EGFR 抑制；PI3K 激活绕过 BRAF | 联合用药 |
| 药泵外排 | ABCB1（P-gp）高表达 | 避免底物、纳米递送 |
| 凋亡逃逸 | BCL-2↑、p53 失活 | BH3 模拟物联合 |
| 表型可塑性 | 前列腺癌神经内分泌转化、黑色素瘤去分化 | 表观药物、联合靶向 |
| 微环境庇护 | 骨髓龛保护白血病细胞；CAF 促耐药 | 微环境靶向、先"松动"龛 |
| 免疫逃逸 | MHC-I 丢失、PD-L1 上调 | NK 细胞疗法、局部免疫激动剂 |
| 药物耐受（persister） | 少数细胞进入可逆的慢周期/静止态 | 联合"唤醒"或持续压制 |

> 核心逻辑：**耐药不是"药物变弱"，而是"细胞群变了"。** 因此治疗策略正从"最大耐受剂量"转向"适应性治疗/演化疗法"（adaptive therapy），用竞争抑制耐药克隆。

---

## 9. 常见误区（细胞生物学层面）

1. **"癌症是一个突变造成的"**——绝大多数实体瘤需要多个驱动事件协同；单基因病式的理解会低估演化与异质性。
2. **"只要抑制增殖就能治愈"**——增殖只是十四项能力之一；抗凋亡、免疫逃逸、可塑性都能让肿瘤在"不增殖"的状态下存活。
3. **"所有肿瘤都靠糖酵解"**——Warburg 效应常见但非普遍；部分肿瘤（胰腺癌、部分淋巴瘤、耐药细胞）高度依赖氧化磷酸化，这也是代谢靶向的难点。
4. **"转移是随机的"**——转移有明确的器官倾向性（种子与土壤 + 血流解剖 + 转移前龛），不是均匀抛撒。
5. **"肿瘤是一群相同的细胞"**——瘤内异质性（遗传 + 表观 + 空间）是耐药与复发的根源。
6. **"抑癌基因只需一个等位失活"**——多数需两次打击；但 TP53 错义突变可呈**显性负性**，CDKN2A 等也可因单倍剂量不足而致病。
7. **"端粒酶在全部肿瘤中都升高"**——约 85%–90%；其余依赖 ALT，治疗策略不同。
8. **"EMT 是二元开关"**——实为连续谱、可逆、且常为部分 EMT（partial EMT），后者转移能力反而更强。
9. **"癌症纯粹是基因病"**——表观遗传、微环境、微生物组、衰老细胞都在因果链上；同卵双胞胎的患癌谱差异就是证据。
10. **"饿死癌细胞" / "碱性体质" / "抗氧化剂大剂量防癌"**——前者忽略正常细胞的营养竞争与肿瘤的代谢柔性；"碱性体质"无生理学基础；高剂量 β-胡萝卜素反而增加吸烟者肺癌风险，抗氧化剂在化疗期间可能干扰疗效。

---

## 10. 一页速记

- **定义三条**：基因组病 + 克隆演化 + 微环境共谋。
- **两类基因**：癌基因（油门卡住，一个等位即可）、抑癌基因（刹车失灵，多需两次打击）、caretaker（修车工罢工，突变率整体升高）。
- **四步经典**：结直肠癌 APC → KRAS → SMAD4 → TP53；10–20 年 → 筛查窗口。
- **十四标志**：增殖、抑癌逃逸、抗死亡、无限复制、血管生成、侵袭转移（2000）；代谢、免疫逃逸、基因组不稳定、促炎（2011）；可塑性、表观重编程、微生物组、衰老细胞（2022）。
- **三个"引擎"**：基因组不稳定（产生变异）、表观重编程（不改序列改表达）、克隆选择（筛出最适者）。
- **转移五步**：局部侵袭 → 内渗 → 循环存活 → 外渗 → 定植。
- **治疗三条主线**：靶向驱动癌基因（伊马替尼、奥希替尼）、合成致死（PARP/BRCA）、解除免疫刹车（PD-1/CTLA-4）。
- **耐药一句话**：不是药变弱，是细胞群变了。
- **数字**：1 cm³ 肿瘤约 $10^{9}$ 个细胞；驱动突变 2–8 个；端粒酶重激活 85%–90%；HPV 相关肿瘤约占宫颈癌 95% 以上；感染相关肿瘤约 15%–20%。
