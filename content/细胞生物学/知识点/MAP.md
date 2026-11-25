---
title: 微管结合蛋白（MAP）：以 MAP2 与 tau 为中心
---

# 微管结合蛋白（MAP）：以 MAP2 与 tau 为中心

> 相关笔记：[[踏车行为]]、[[有丝]]

## 0. 一句话概括

微管结合蛋白（microtubule-associated proteins, MAPs）是一大类结合在微管表面、调控微管**成核、稳定、交联、切割与运输**的蛋白。神经系统里最经典的两个是 **MAP2** 与 **tau**：它们同属 MAP2/tau 家族，C 端都有微管结合重复序列，但分布截然不同——**MAP2 在树突，tau 在轴突**。这一"分工"既是神经元极性的标志，也是 tau 蛋白病（阿尔茨海默病等）的核心线索。

---

## 1. MAP 是什么：分类与共同逻辑

### 1.1 按功能分类

| 类别 | 代表 | 作用 |
|---|---|---|
| 结构/稳定型 | MAP1A/1B、MAP2、MAP4、tau、MAP6/STOP、DCX | 结合微管侧面，稳定晶格、调节间距 |
| 交联型 | MAP2、tau、PRC1/MAP65、NuMA | 把微管与微管、微管与 actin 连起来 |
| 马达型 | kinesin、dynein | 沿微管运输货物，也影响微管组织 |
| +TIP 型 | EB1/EB3、CLIP-170、APC | 追踪正在生长的 + 端，调控动力学 |
| 切割型 | katanin、spastin | 切断微管，参与重塑与分支 |
| 成核型 | γ-TuRC、augmin、TPX2 | 从零成核或在侧面产生分支 |

> 严格说，"MAP"最初专指能随微管一起纯化出来的结构蛋白；现在广义上把马达、+TIP、切割酶也算作微管相关蛋白。答题时要说明用的是狭义还是广义。

### 1.2 共同的结构逻辑

- 大多数结构 MAP 有两个功能模块：
  1. **微管结合结构域（MBD）**：常由带正电的重复序列组成，与微管表面（C 端 E-hook）靠静电与疏水作用结合；
  2. **突出结构域（projection domain）**：伸向胞质，决定微管之间的间距，也可与其他蛋白/膜结合。
- 结合亲和力受**磷酸化**调节：磷酸基团引入负电荷，削弱与微管的静电结合，使 MAP 从微管上脱落。
- 一个 MAP 往往同时具备"稳定 + 交联 + 调控"多种功能，取决于浓度、磷酸化状态与结合伙伴。

---

## 2. 神经元里的两个主角：MAP2 与 tau

<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="570" viewBox="0 0 1100 570">
<rect width="1100" height="570" fill="#ffffff"/>
<text x="550.0" y="36" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="20" font-weight="bold" fill="#1F2937">MAP2 与 tau：同一家族，两种神经元微管</text>
<path d="M 185 225 C 150 190, 120 160, 92 132" fill="none" stroke="#D9C6A8" stroke-width="11" stroke-linecap="round"/>
<path d="M 185 225 C 150 190, 120 160, 92 132" fill="none" stroke="#2F6FBF" stroke-width="2.6" stroke-dasharray="7 5" opacity="0.9"/>
<path d="M 175 268 C 150 300, 132 330, 118 362" fill="none" stroke="#D9C6A8" stroke-width="11" stroke-linecap="round"/>
<path d="M 175 268 C 150 300, 132 330, 118 362" fill="none" stroke="#2F6FBF" stroke-width="2.6" stroke-dasharray="7 5" opacity="0.9"/>
<path d="M 212 205 C 250 170, 286 150, 318 132" fill="none" stroke="#D9C6A8" stroke-width="11" stroke-linecap="round"/>
<path d="M 212 205 C 250 170, 286 150, 318 132" fill="none" stroke="#2F6FBF" stroke-width="2.6" stroke-dasharray="7 5" opacity="0.9"/>
<ellipse cx="200" cy="243" rx="42" ry="50" fill="#F6EFE2" stroke="#B59A73" stroke-width="2"/>
<ellipse cx="200" cy="243" rx="30" ry="40" fill="none" stroke="#7FA8D4" stroke-width="1.6" stroke-dasharray="6 4"/>
<path d="M 240 243 C 360 236, 520 250, 700 244 C 780 242, 840 240, 900 242" fill="none" stroke="#CDBB9E" stroke-width="6" stroke-linecap="round"/>
<path d="M 240 243 C 360 236, 520 250, 700 244 C 780 242, 840 240, 900 242" fill="none" stroke="#C0392B" stroke-width="2.2" stroke-dasharray="8 5"/>
<path d="M 898 242 C 922 224, 940 210, 952 196" fill="none" stroke="#CDBB9E" stroke-width="4" stroke-linecap="round"/>
<path d="M 898 242 C 922 224, 940 210, 952 196" fill="none" stroke="#C0392B" stroke-width="1.4" stroke-dasharray="5 4"/>
<path d="M 898 242 C 924 246, 944 252, 958 260" fill="none" stroke="#CDBB9E" stroke-width="4" stroke-linecap="round"/>
<path d="M 898 242 C 924 246, 944 252, 958 260" fill="none" stroke="#C0392B" stroke-width="1.4" stroke-dasharray="5 4"/>
<text x="110" y="118" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="11" font-weight="bold" fill="#2F6FBF">树突：MAP2 富集</text>
<text x="110" y="136" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10" fill="#5B6B7C">微管间距较大、稳定</text>
<line x1="160" y1="124" x2="150" y2="150" stroke="#2F6FBF" stroke-width="1.0" opacity="1.0" stroke-linecap="round" stroke-dasharray="0.7"/>
<text x="560" y="214" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="11" font-weight="bold" fill="#C0392B">轴突：tau 富集</text>
<text x="560" y="232" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10" fill="#5B6B7C">微管成束、间距较小</text>
<line x1="608" y1="216" x2="640" y2="236" stroke="#C0392B" stroke-width="1.0" opacity="1.0" stroke-linecap="round" stroke-dasharray="0.7"/>
<text x="200" y="312" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10" fill="#5B6B7C">胞体</text>
<line x1="60" y1="340" x2="100" y2="340" stroke="#2F6FBF" stroke-width="2.6" opacity="1.0" stroke-linecap="round" stroke-dasharray="7 5"/>
<text x="108" y="344" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="9.5" fill="#5B6B7C">微管（树突）</text>
<line x1="230" y1="340" x2="270" y2="340" stroke="#C0392B" stroke-width="2.2" opacity="1.0" stroke-linecap="round" stroke-dasharray="8 5"/>
<text x="278" y="344" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="9.5" fill="#5B6B7C">微管（轴突）</text>
<line x1="50" y1="372" x2="1050" y2="372" stroke="#DCE4EE" stroke-width="1.2" opacity="1.0" stroke-linecap="round"/>
<text x="60" y="398" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="12.5" font-weight="bold" fill="#1F2937">结构域对比</text>
<text x="60" y="432" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="12" font-weight="bold" fill="#1F2937">MAP2</text>
<rect x="120" y="416" width="250" height="26" rx="5" fill="#EDF3FA" stroke="#9DB4CC" stroke-width="1.5"/>
<text x="245" y="433" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="9.8" fill="#5B6B7C">projection domain（长，伸向胞质）</text>
<rect x="370" y="416" width="96" height="26" rx="5" fill="#FDECEA" stroke="#C0392B" stroke-width="1.5"/>
<text x="418" y="433" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="9.8" fill="#8C2F22">MBD</text>
<line x1="466" y1="429" x2="522" y2="429" stroke="#6B7280" stroke-width="1.5" marker-end="url(#a)"/>
<text x="548" y="433" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10" fill="#5B6B7C">微管</text>
<text x="620" y="433" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10.2" fill="#5B6B7C">N 端长臂决定微管间距；C 端重复序列负责结合</text>
<text x="60" y="502" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="12" font-weight="bold" fill="#1F2937">tau</text>
<rect x="120" y="486" width="62" height="26" rx="5" fill="#F3F7FC" stroke="#9DB4CC" stroke-width="1.5"/>
<text x="151" y="503" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="9.2" fill="#5B6B7C">N 0/1/2</text>
<rect x="182" y="486" width="118" height="26" rx="5" fill="#FFF6E8" stroke="#B5651D" stroke-width="1.5"/>
<text x="241" y="503" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="9.6" fill="#8C5A18">P-rich</text>
<rect x="300" y="486" width="120" height="26" rx="5" fill="#FDECEA" stroke="#C0392B" stroke-width="1.5"/>
<text x="360" y="503" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="9.6" fill="#8C2F22">R1–R4</text>
<line x1="420" y1="499" x2="476" y2="499" stroke="#6B7280" stroke-width="1.5" marker-end="url(#a)"/>
<text x="502" y="503" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10" fill="#5B6B7C">微管</text>
<text x="620" y="503" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10.2" fill="#5B6B7C">3R/4R 由外显子 10 剪接决定；P-rich 是磷酸化调控区</text>
<text x="60" y="540" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10.2" fill="#5B6B7C">共同点：都属于 MAP2/tau 家族，C 端带重复序列，靠带电与疏水作用结合微管侧面。</text>
<defs><marker id="a" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#6B7280"/></marker></defs></svg>

| 维度 | MAP2 | tau |
|---|---|---|
| 基因 | *MAP2*（2q34） | *MAPT*（17q21.31） |
| 分子量 | 高 Mr（约 200 kDa，MAP2a/b）；低 Mr（MAP2c/d） | 352–441 个氨基酸（6 种异构体） |
| 主要分布 | 胞体、树突、树突棘 | 轴突（正常神经元） |
| 微管结合区 | C 端 3–4 个重复序列 + R 区 | C 端 3R 或 4R 重复序列 |
| 突出区 | N 端很长 | N 端较短（0/1/2 inserts） |
| 主要功能 | 稳定树突微管、调节间距、参与突触可塑性 | 稳定轴突微管、调节运输、影响微管间距 |
| 病理 | 缺血后丢失（损伤标志） | 过度磷酸化 → 缠结 → tau 蛋白病 |

**为什么一个在树突、一个在轴突？**

- 神经元把微管分成两类：树突微管极性混杂、间距较大、动态性较高；轴突微管极性统一（+ 端朝前）、成束紧密、更稳定。
- MAP2 的长突出臂适合"撑开"树突微管；tau 的短臂适合"束紧"轴突微管。
- 两者的定位差异被广泛用作**神经元极性的免疫标志**：MAP2 标树突，tau/磷酸化 tau 标轴突。

---

## 3. MAP2

### 3.1 结构与异构体

- 高 Mr 型：MAP2a、MAP2b；低 Mr 型：MAP2c、MAP2d。
- MAP2c 在胚胎期高表达，MAP2a 在出生后逐渐出现；不同异构体的突出臂长度不同，决定微管间距。
- C 端重复序列结合微管，N 端突出臂伸向胞质，可与其他 MAP、actin、膜蛋白相互作用。

### 3.2 功能

- **稳定树突微管**：降低微管的临界浓度、抑制解聚。
- **调节微管间距**：突出臂像"刷毛"一样把相邻微管撑开，形成树突特有的松散阵列。
- **交联 actin**：MAP2 可与 actin 结合，参与树突棘形态与突触可塑性。
- **参与突触信号**：LTP 等刺激可改变 MAP2 的磷酸化与定位，影响树突棘结构。

### 3.3 调控

- PKA、CaMKII、ERK 等磷酸化 MAP2，降低其微管亲和力。
- 磷酸化状态改变时，MAP2 从微管转移到胞质或 actin 骨架，改变树突微管的稳定性。

### 3.4 临床与实验

- **MAP2 免疫染色**是区分树突与轴突的常规手段。
- 脑缺血、癫痫、神经退行性疾病中，MAP2 丢失是**神经元损伤的早期标志**。
- 抗 MAP2 抗体也见于部分自身免疫性神经疾病。

---

## 4. tau

### 4.1 结构与异构体

- *MAPT* 基因通过可变剪接产生 **6 种异构体**：
  - N 端插入：0N、1N、2N（外显子 2、3）；
  - C 端重复：3R 或 4R（外显子 10 决定是否含第二个重复）。
- 成人脑中以 3R 与 4R 共存；胎儿脑以 3R0N 为主。
- 结构分区：
  - N 端：参与与膜、其他蛋白的相互作用；
  - **P-rich（脯氨酸富集区）**：主要磷酸化位点所在；
  - **C 端重复区（R1–R4）**：结合微管。

### 4.2 正常功能

- 稳定轴突微管，维持轴突口径与运输通道。
- 调节微管间距与成束程度。
- 影响**轴突运输**：tau 与 kinesin/dynein 竞争微管表面，可调节货物分配；磷酸化状态改变这种竞争。
- tau 敲除小鼠可存活，表型相对轻微——说明 tau 不是微管组装的"必需品"，而是**调节器**。

### 4.3 磷酸化：正常与异常

- 正常脑内 tau 就有磷酸化，发育期磷酸化水平更高；磷酸化调节 tau 与微管的结合。
- 主要激酶：CDK5、GSK-3β、ERK、JNK、p38（Pro-directed）；MARK、CK1、DYRK1A（非 Pro 位点）。
- 主要磷酸酶：**PP2A**（负责约 70% 的去磷酸化），其次 PP1、PP2B。
- **过度磷酸化** → tau 从微管脱落 → 微管失稳 → 轴突运输障碍 → tau 聚集。

### 4.4 聚集与 tau 蛋白病

- 过度磷酸化的 tau 形成**成对螺旋丝（PHF）**与**神经原纤维缠结（NFT）**。
- AD 中 NFT 沿 Braak 分期从内嗅皮层向新皮层扩散，与认知下降的相关性比淀粉样斑块更强。
- tau 具有"类朊病毒"传播性：错误折叠的 tau 可在细胞间扩散，模板化正常 tau。
- tau 也可发生**液-液相分离（LLPS）**，在拥挤环境中形成液滴，被认为是聚集的早期步骤。

### 4.5 疾病谱

| 疾病 | tau 类型 | 特点 |
|---|---|---|
| 阿尔茨海默病（AD） | 3R + 4R | 斑块 + 缠结；p-tau217/181 为生物标志物 |
| 进行性核上性麻痹（PSP） | 4R | 中脑萎缩、垂直凝视障碍 |
| 皮质基底节变性（CBD） | 4R | 不对称皮质萎缩 |
| 皮克病（PiD） | 3R | Pick 小体 |
| 额颞叶痴呆伴帕金森（FTDP-17） | 多为 4R 或 3R | *MAPT* 突变（P301L、P301S、V337M、R406W 等） |
| 慢性创伤性脑病（CTE） | 3R + 4R | 反复头部外伤 |

### 4.6 治疗方向

- **抗 tau 抗体**：阻断 tau 传播（多项临床试验，结果不一）。
- **反义寡核苷酸（ASO）**：降低 tau 表达（如 BIIB080，早期试验中）。
- **聚集抑制剂**：抑制 tau 纤维形成。
- **微管稳定剂**：补偿 tau 丢失导致的微管失稳（临床证据有限）。
- **tau PET**：flortaucipir 等示踪剂可活体显示 tau 沉积。

---

## 5. MAP2/tau 家族与其他 MAP

### 5.1 MAP2/tau 家族

- 包括 **MAP2、MAP4、tau**，共享 C 端微管结合重复序列。
- MAP4 广泛表达于非神经细胞，参与间期与分裂期微管动力学调控。

### 5.2 其他重要 MAP

| 蛋白 | 功能 | 相关疾病 |
|---|---|---|
| MAP1A/1B | 稳定微管、连接 actin；MAP1B 在发育中高表达 | 神经系统发育异常 |
| MAP6/STOP | 钙调素调节的微管稳定蛋白 | 突触可塑性、精神疾病关联 |
| DCX（双皮质素） | 稳定微管，神经元迁移 | *DCX* 突变 → 无脑回畸形 |
| PRC1/MAP65 | 交联反平行微管，胞质分裂 | 肿瘤中表达异常 |
| EB1/EB3 | +TIP，追踪生长端 | 肿瘤、微管动力学 |
| katanin / spastin | 切割微管 | spastin → 遗传性痉挛性截瘫（SPG4） |
| γ-TuRC / augmin | 成核与分支成核 | 发育缺陷 |

---

## 6. MAP 如何调控微管：五种作用

1. **稳定晶格**：结合微管侧面，降低解聚速率（MAP2、tau、MAP4、MAP6）。
2. **交联与成束**：把微管与微管、微管与 actin 连起来（MAP2、tau、PRC1）。
3. **调节间距**：突出臂的长度决定微管之间的距离（MAP2 长臂 vs tau 短臂）。
4. **竞争运输**：占据微管表面，影响 kinesin/dynein 的结合与货物分配（tau）。
5. **参与动力学**：+TIP 追踪生长端，切割酶切断微管，成核因子从零或侧面成核。

---

## 7. 研究方法与标志物

| 方法/试剂 | 用途 |
|---|---|
| 抗 MAP2 抗体 | 标记树突与胞体 |
| 抗 tau / AT8（p-Ser202/Thr205） | 标记轴突与磷酸化 tau |
| SMI-31 | 标记磷酸化神经丝（常与 tau 联用） |
| EB3-GFP | 活细胞追踪微管 + 端生长 |
| 体外微管聚合/交联实验 | 测定 MAP 的亲和力与交联能力 |
| 质谱磷酸化组学 | 定位 tau/MAP2 的磷酸化位点 |
| tau PET、脑脊液/血浆 p-tau | 活体诊断与分期 |

---

## 8. 常见误区

1. **"MAP 都是稳定微管的"**：还有马达、+TIP、切割与成核蛋白。
2. **"MAP2 和 tau 分布相同"**：MAP2 在树突，tau 在轴突，是神经元极性的经典标志。
3. **"tau 只在病理状态下存在"**：正常神经元中 tau 有重要生理功能，敲除小鼠只是表型轻微。
4. **"磷酸化一定有害"**：发育与生理状态下磷酸化是正常调控；只有过度磷酸化才致病。
5. **"tau 是阿尔茨海默病的唯一原因"**：Aβ 与 tau 共同参与，tau 与认知下降的相关性更强。
6. **"MAP2 是轴突标志"**：MAP2 是树突标志，轴突标志常用 tau/磷酸化 tau。
7. **"tau 只结合微管"**：tau 还可与 actin、膜、核酸等相互作用。
8. **"所有 tau 蛋白病都是 4R"**：皮克病是 3R，AD 是 3R + 4R。
9. **"微管稳定剂能治愈 AD"**：目前证据有限，不能替代病因治疗。
10. **"MAP 只存在于神经元"**：MAP4 等广泛表达于各种细胞。

---

## 9. 一页速记

- **MAP 广义**：结构型、马达型、+TIP、切割型、成核型。
- **MAP2/tau 家族**：MAP2、MAP4、tau，共享 C 端重复序列。
- **MAP2**：树突、长突出臂、撑开微管间距、突触可塑性；缺血后丢失是损伤标志。
- **tau**：轴突、短臂、束紧微管；3R/4R 由外显子 10 剪接决定；过度磷酸化 → PHF/NFT。
- **疾病**：AD（3R+4R）、PSP/CBD（4R）、PiD（3R）、FTDP-17（*MAPT* 突变）、CTE。
- **标志物**：MAP2 标树突，tau/AT8 标轴突与病理；p-tau217/181 用于 AD 诊断。
