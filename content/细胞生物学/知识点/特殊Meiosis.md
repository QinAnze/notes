---
title: 特殊的减数分裂
---

# 特殊的减数分裂

> 相关笔记：[[减数]]、[[有丝]]、[[Ca]]

## 0. 一句话概括

教科书上的减数分裂是一套"默认配置"：**一次复制、两次分裂、同源染色体联会并交叉互换、MI 分同源染色体、MII 分姐妹染色单体、产生四个单倍体产物**。但自然界里这套配置被反复改写——有的类群**完全放弃交叉**，有的把**两次分裂的分工对调**，有的**根本不做减数分裂**，有的把产物从"配子"改成"孢子"。这些变体统称特殊的减数分裂，它们不是"错误"，而是各自稳定的繁殖策略。

---

## 1. 先立模板：什么叫"标准"

判断一个减数分裂是否特殊，看五个环节有没有被改动：

| 环节 | 标准做法 | 被改写时会发生什么 |
|---|---|---|
| 复制次数 | 减数分裂前复制一次 | 复制零次（无减数分裂）或分裂前再复制 |
| 交叉互换 | 程序性、每个二价体至少一个交叉 | 完全无交叉，靠别的机制维持同源连接 |
| 联会 | 同源染色体全长联会，形成联会复合体 | 只局部联会（性染色体）、多价体、不联会 |
| 两次分裂的分工 | MI 分同源染色体，MII 分姐妹染色单体 | 倒置：MI 分姐妹，MII 分同源 |
| 产物 | 4 个单倍体细胞，胞质大致均等 | 1 个功能卵 + 极体；4 个孢子；2 个精子（无减数分裂） |

> 只要有一条明显偏离，就可归入"特殊"。下面按偏离的类型依次展开。

---

## 2. 总览：特殊减数分裂的六大类

| 类型 | 代表类群 | 核心偏离 |
|---|---|---|
| 无交叉减数分裂 | 雄性黑腹果蝇、雌性家蚕（鳞翅目） | 完全或几乎不发生交叉互换 |
| 倒置减数分裂 | 线虫、蚜虫、介壳虫、部分蝴蝶与蛾 | MI 分姐妹染色单体，MII 分同源染色体 |
| 局部联会与性染色体特殊行为 | 哺乳动物 XY、蝗虫 XO、鸟类 ZW | 只有 PAR 联会，形成性泡并转录沉默 |
| 多倍体与结构杂合 | 小麦等多倍体、易位/倒位携带者 | 多价体、倒位环、十字形配对 |
| 减数分裂驱动 | 小鼠 t 单倍型、玉米 Ab10、果蝇 SD | 自私元件使传递率超过 50% |
| 无减数分裂与替代繁殖 | 蒲公英、雄蜂、蚜虫、轮虫 | 无融合生殖、孤雌生殖、有丝分裂产精子 |

---

## 3. 无交叉减数分裂（achiasmate meiosis）

### 3.1 现象

- **雄性黑腹果蝇**：减数分裂中**完全没有交叉互换**，但同源染色体仍能准确分离，生育力正常。
- **鳞翅目（蝴蝶、蛾）**：重组只发生在雄性，**雌性无交叉**；家蚕是经典例子。
- **雌性果蝇的第 4 染色体**：太小，几乎不发生交叉，靠"非交叉分离"机制传递。

### 3.2 没有交叉，靠什么连住同源染色体

交叉在标准减数分裂中承担两个功能：**交换遗传信息**与**提供 MI 的物理连接（张力来源）**。无交叉类群必须解决第二个问题：

1. **异染色质介导的同源并置（conjunction）**：同源染色体在异染色质区域（如着丝粒周围卫星 DNA）彼此平行靠拢，形成足够稳定的"并置"，替代交叉的连接作用。
2. **特殊的黏连保护**：MI 时姐妹着丝粒的黏连必须被保护，否则姐妹染色单体提前分开。果蝇中 SNM 等蛋白参与维持这一黏连；MEI-S332（shugoshin 同源物）负责着丝粒黏连保护。
3. **专用蛋白**：Teflon、Strom 等参与 X-Y 与第四染色体的配对与分离；这些因子在减数分裂中特异表达。
4. **纺锤体的"分布式分离"**：多个单价体（没有交叉连接的染色体）在同一纺锤体中按大小/异染色质特征分配，确保每个子细胞至少拿到一条。

### 3.3 为什么值得注意

- 它证明**交叉不是染色体分离的必要条件**，"重组"与"分离"在演化上可以解耦。
- 它是"重组率性别差异"的极端版本：多数物种雌雄重组率不同，而鳞翅目直接把雌性重组率降到零。
- 在果蝇遗传学中，雄性无重组意味着**雄性果蝇的连锁图完全连锁**，做杂交实验时必须用雌蝇测重组。

---

## 4. 倒置减数分裂（inverted meiosis）

<svg xmlns="http://www.w3.org/2000/svg" width="1160" height="630" viewBox="0 0 1160 630">
<rect width="1160" height="630" fill="#ffffff"/>
<text x="580.0" y="38" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="20" font-weight="bold" fill="#1F2937">同一件事，两种分工：标准减数分裂 vs 倒置减数分裂</text>
<text x="215" y="80" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="12" fill="#374151">起始：2n，4C</text>
<text x="430" y="80" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="12" fill="#374151">MI 之后</text>
<text x="665" y="80" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="12" fill="#374151">MII 之后：n，1C</text>
<text x="36" y="204" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="15" font-weight="bold" fill="#1F2937">标准</text>
<text x="36" y="224" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#6B7280">monocentric</text>
<text x="36" y="464" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="15" font-weight="bold" fill="#1F2937">倒置</text>
<text x="36" y="484" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#6B7280">inverted</text>
<circle cx="215" cy="210" r="27" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="203.8" y1="195.0" x2="203.8" y2="225.0" stroke="#2F6FBF" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<line x1="208.2" y1="195.0" x2="208.2" y2="225.0" stroke="#2F6FBF" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="206" cy="210" rx="3.7" ry="1.8" fill="#1B2631"/>
<line x1="221.8" y1="195.0" x2="221.8" y2="225.0" stroke="#C0392B" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<line x1="226.2" y1="195.0" x2="226.2" y2="225.0" stroke="#C0392B" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="224" cy="210" rx="3.7" ry="1.8" fill="#1B2631"/>
<circle cx="430" cy="158" r="27" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="427.8" y1="143.0" x2="427.8" y2="173.0" stroke="#2F6FBF" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<line x1="432.2" y1="143.0" x2="432.2" y2="173.0" stroke="#2F6FBF" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="430" cy="158" rx="3.7" ry="1.8" fill="#1B2631"/>
<circle cx="430" cy="262" r="27" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="427.8" y1="247.0" x2="427.8" y2="277.0" stroke="#C0392B" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<line x1="432.2" y1="247.0" x2="432.2" y2="277.0" stroke="#C0392B" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="430" cy="262" rx="3.7" ry="1.8" fill="#1B2631"/>
<circle cx="665" cy="126" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="111.0" x2="665.0" y2="141.0" stroke="#2F6FBF" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="126" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="182" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="167.0" x2="665.0" y2="197.0" stroke="#2F6FBF" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="182" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="238" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="223.0" x2="665.0" y2="253.0" stroke="#C0392B" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="238" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="294" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="279.0" x2="665.0" y2="309.0" stroke="#C0392B" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="294" rx="3.2" ry="1.9" fill="#1B2631"/>
<line x1="243.0" y1="200.0" x2="399.8" y2="164.8" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="243.0" y1="220.0" x2="399.8" y2="255.2" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="148.0" x2="634.2" y2="129.3" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="168.0" x2="634.1" y2="179.9" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="252.0" x2="634.1" y2="240.1" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="272.0" x2="634.2" y2="290.7" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<text x="322" y="204" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="11.5" fill="#6B7280">同源染色体分开</text>
<text x="548" y="204" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="11.5" fill="#6B7280">姐妹染色单体分开</text>
<circle cx="215" cy="470" r="27" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="203.8" y1="455.0" x2="203.8" y2="485.0" stroke="#2F6FBF" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<line x1="208.2" y1="455.0" x2="208.2" y2="485.0" stroke="#2F6FBF" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="206" cy="470" rx="3.7" ry="1.8" fill="#1B2631"/>
<line x1="221.8" y1="455.0" x2="221.8" y2="485.0" stroke="#C0392B" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<line x1="226.2" y1="455.0" x2="226.2" y2="485.0" stroke="#C0392B" stroke-width="3.4" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="224" cy="470" rx="3.7" ry="1.8" fill="#1B2631"/>
<circle cx="430" cy="418" r="27" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="423.0" y1="403.0" x2="423.0" y2="433.0" stroke="#2F6FBF" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="423" cy="418" rx="3.2" ry="1.9" fill="#1B2631"/>
<line x1="437.0" y1="403.0" x2="437.0" y2="433.0" stroke="#C0392B" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="437" cy="418" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="430" cy="522" r="27" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="423.0" y1="507.0" x2="423.0" y2="537.0" stroke="#2F6FBF" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="423" cy="522" rx="3.2" ry="1.9" fill="#1B2631"/>
<line x1="437.0" y1="507.0" x2="437.0" y2="537.0" stroke="#C0392B" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="437" cy="522" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="386" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="371.0" x2="665.0" y2="401.0" stroke="#2F6FBF" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="386" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="442" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="427.0" x2="665.0" y2="457.0" stroke="#C0392B" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="442" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="498" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="483.0" x2="665.0" y2="513.0" stroke="#2F6FBF" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="498" rx="3.2" ry="1.9" fill="#1B2631"/>
<circle cx="665" cy="554" r="26" fill="#F8FBFF" stroke="#9DB4CC" stroke-width="1.3"/>
<line x1="665.0" y1="539.0" x2="665.0" y2="569.0" stroke="#C0392B" stroke-width="3.6" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="665" cy="554" rx="3.2" ry="1.9" fill="#1B2631"/>
<line x1="243.0" y1="460.0" x2="399.8" y2="424.8" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="243.0" y1="480.0" x2="399.8" y2="515.2" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="408.0" x2="634.2" y2="389.3" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="428.0" x2="634.1" y2="439.9" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="512.0" x2="634.1" y2="500.1" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<line x1="458.0" y1="532.0" x2="634.2" y2="550.7" stroke="#6B7280" stroke-width="1.6" marker-end="url(#ar)"/>
<text x="322" y="464" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="11.5" fill="#6B7280">姐妹染色单体先分开</text>
<text x="548" y="464" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="11.5" fill="#6B7280">同源染色体后分开</text>
<rect x="790" y="104" width="342" height="316" rx="10" fill="#FFFDF8" stroke="#E5D6B8" stroke-width="1.3"/>
<text x="961" y="130" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="13.5" font-weight="bold" fill="#4B3A24">关键：着丝粒的类型</text>
<line x1="872.0" y1="156.0" x2="872.0" y2="268.0" stroke="#2F6FBF" stroke-width="7" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="872" cy="212" rx="7.5" ry="4.2" fill="#1B2631"/>
<text x="872" y="292" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4B3A24">单着丝粒 monocentric</text>
<text x="872" y="311" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#6B7280">动粒只有一个</text>
<text x="872" y="329" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#6B7280">姐妹动粒可分向两极</text>
<line x1="1050.0" y1="156.0" x2="1050.0" y2="268.0" stroke="#C0392B" stroke-width="7" opacity="1.0" stroke-linecap="round"/>
<ellipse cx="1050" cy="168" rx="7.5" ry="3.2" fill="#1B2631"/>
<ellipse cx="1050" cy="200" rx="7.5" ry="3.2" fill="#1B2631"/>
<ellipse cx="1050" cy="232" rx="7.5" ry="3.2" fill="#1B2631"/>
<ellipse cx="1050" cy="262" rx="7.5" ry="3.2" fill="#1B2631"/>
<text x="1050" y="292" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#4B3A24">全着丝粒 holocentric</text>
<text x="1050" y="311" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#6B7280">动粒遍布全长</text>
<text x="1050" y="329" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="10.5" fill="#6B7280">姐妹动粒难以分开定向</text>
<line x1="818" y1="348" x2="1104" y2="348" stroke="#E5D6B8" stroke-width="1"/>
<text x="961" y="372" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="11" fill="#4B3A24">于是两次分裂的分工对调：</text>
<text x="961" y="392" text-anchor="middle" font-family="Noto Sans CJK SC, sans-serif" font-size="11" fill="#4B3A24">MI 分姐妹染色单体，MII 分同源染色体。</text>
<text x="30" y="600" text-anchor="start" font-family="Noto Sans CJK SC, sans-serif" font-size="11" fill="#6B7280">注：倒置减数分裂见于线虫、蚜虫、介壳虫、蝴蝶等全着丝粒类群；这些类群的交叉互换仍可正常发生。</text>
<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#6B7280"/></marker></defs></svg>

### 4.1 触发条件：全着丝粒染色体

- 大多数动植物是**单着丝粒（monocentric）**：动粒集中在一个初级缢痕处。MI 时一对姐妹动粒可以被"背靠背"地单极定向，朝向同一极。
- 线虫、蚜虫、介壳虫、蝴蝶与蛾、灯心草等类群是**全着丝粒（holocentric）**：动粒蛋白沿染色体全长分布，没有单一的着丝粒位置。
- 全着丝粒染色体上，姐妹动粒沿全长交错分布，**无法像单着丝粒那样把一对姐妹动粒整体朝向同一极**。于是 MI 只能退而求其次：先分姐妹染色单体。

### 4.2 分工对调

| 阶段 | 标准减数分裂 | 倒置减数分裂 |
|---|---|---|
| MI | 同源染色体分开 | **姐妹染色单体分开** |
| MI 后每个细胞 | 每条染色体仍含 2 条姐妹染色单体 | 每条同源染色体只剩 1 条染色单体 |
| MII | 姐妹染色单体分开 | **同源染色体分开** |
| 最终产物 | 4 个 $n$ 配子 | 4 个 $n$ 配子（染色体组合方式不同） |

两种路线最终都产生单倍体，但**遗传学后果不同**：倒置减数分裂中，同源染色体直到 MII 才分离，因此 MI 之后每个细胞同时含有来自双亲的同源染色体拷贝，交叉的"远端互换"在产物中的分布方式也随之改变。

### 4.3 代表类群与研究意义

- **秀丽隐杆线虫**：全着丝粒染色体，MI 即分离姐妹染色单体，是研究倒置减数分裂的遗传学模型。
- **蚜虫、介壳虫**：全着丝粒 + 倒置减数分裂，且常伴随父源基因组消除等特殊现象。
- **蝴蝶与蛾**：全着丝粒染色体广泛存在，部分类群采用倒置减数分裂。
- 倒置减数分裂提示：**"MI 分同源"不是减数分裂的定义性特征**，而是单着丝粒染色体带来的一种实现方式。

---

## 5. 局部联会与性染色体特殊行为

### 5.1 哺乳动物的 XY 性泡

- X 与 Y 只在**假常染色体区（PAR）**发生联会与交叉，其余大部分区域不配对。
- 未联会的 X/Y 轴形成**性泡（XY body）**：染色质高度浓缩，贴附核膜，转录整体沉默，称为**减数分裂性染色体失活（MSCI）**。
- MSCI 由 DNA 损伤应答驱动：SPO11 造成的 DSB 在 XY 上无法找到同源模板修复，于是 γH2AX、BRCA1、ATR 等信号持续存在，把性染色体"标记"为沉默区。
- 后果：性染色体上的基因在减数分裂期间不表达；若 MSCI 失败，精子发生停滞。

### 5.2 单价体问题

- **蝗虫 XO 雄性**只有一条 X，MI 时 X 是"单价体"，没有同源伙伴，必须靠特殊机制避免丢失。
- 性染色体数目异常（如 XXY、XYY）在减数分裂中形成三价体或单价体，是非整倍体配子的重要来源。

### 5.3 鸟类 ZW

- 鸟类雌性为 ZW 异配性别，减数分裂发生在卵巢；Z 与 W 的配对局限于小片同源区，其余区域不联会，机制与哺乳动物 XY 类似但独立演化。

---

## 6. 多倍体与结构杂合时的减数分裂

### 6.1 同源多倍体：多价体

- 四倍体（AAAA）中，每条染色体都有三个同源伙伴，容易形成**四价体**或各种多价体，分离不规则，育性下降。
- 三倍体（AAA）几乎无法均等分离，高度不育——这正是无籽西瓜、三倍体牡蛎的原理。

### 6.2 异源多倍体：强制二价体

- 异源六倍体小麦（AABBDD）有三套亚基因组，若随意配对会形成多价体、导致不育。
- **Ph1 位点**（5B 染色体上，含 ZIP4 基因重复）抑制部分同源染色体（homoeologs）之间的配对，保证每个染色体只与真正的同源伙伴形成二价体。
- 这是"**把多倍体改造成二倍体式减数分裂**"的经典案例，也是小麦稳定的遗传基础。

### 6.3 结构杂合：倒位环与易位十字

| 结构变异 | 减数分裂表现 | 后果 |
|---|---|---|
| 倒位杂合 | 同源片段配对时形成**倒位环** | 环内交叉产生双着丝粒/无着丝粒片段，重组被抑制 |
| 相互易位杂合 | 四条染色体重排成**十字形/四价体** | 交替分离可产生平衡配子，邻近分离产生不平衡配子 |
| 罗氏易位 | 两条近端着丝粒染色体融合，形成**三价体** | 不平衡配子 → 反复流产、先天性异常 |
| B 染色体 | 额外小染色体，常不配对 | 通过驱动机制优先传递，或随机丢失 |

> 临床上的 PGT-SR 检测，本质就是在胚胎层面筛查这类"特殊减数分裂"造成的不平衡。

---

## 7. 减数分裂驱动（meiotic drive）

定义：某些遗传元件让自身进入**超过 50%** 的功能配子，违背孟德尔分离比。

| 系统 | 机制 |
|---|---|
| 小鼠 t 单倍型 | 携带 t 的单倍型精子在受精竞争中占优（Smok1/Tcr 等位点参与），可扭曲后代基因型比例 |
| 玉米 Ab10 | 染色体上形成**新着丝粒（neocentromere）**，在减数分裂中优先拉向功能大孢子 |
| 果蝇 SD 系统 | Sd 元件使携带 Rsp 敏感等位基因的精子发育异常，自身得以超比例传递 |
| 酵母 spore killer | 杀死不携带该元件的孢子，保证自身存活 |

驱动系统的共同点：**利用减数分裂的机械不对称（着丝粒强弱、纺锤体朝向、配子命运差异）实现"作弊"**。它们通常伴随抑制基因的共同演化，形成基因组内部的"军备竞赛"。

---

## 8. 无减数分裂与替代繁殖

### 8.1 完全不减数：无融合生殖与孤雌生殖

- **无融合生殖（apomixis）**：植物绕过减数分裂直接产生胚。蒲公英（二倍体孢子生殖）与山柳菊（无孢子生殖）是经典例子。农业上若能把该性状引入作物，可永久固定杂种优势。
- **孤雌生殖**：卵不经受精直接发育。轮虫、枝角类、蚜虫在环境良好时行孤雌生殖，环境恶化时再回到有性生殖。
- **无性生殖的代价**：缺乏重组，有害突变容易累积（Muller 棘轮），因此大多数专性无性谱系寿命有限。

### 8.2 单倍二倍性与"无减数分裂的精子"

- 蜜蜂、蚂蚁、胡蜂：雌性二倍体，雄性（蜂王产下的未受精卵）单倍体。
- **雄蜂是单倍体，其精子发生靠有丝分裂**：不需要减数分裂，因为没有"减半"的必要。
- 这是"单倍二倍性（haplodiploidy）"性别决定系统的必然结果。

### 8.3 减数分裂的"半套"与自体融合

- **自体融合（automixis）**：仍进行减数分裂，但两个产物核在后代中融合，恢复二倍性。
- **末端融合**：卵核与第二极体融合 → 后代高度纯合。
- **中央融合**：卵核与中央细胞核融合 → 保留较多杂合性。
- **配子复制**：减数分裂后染色体直接加倍 → 完全纯合。
- 这些机制解释了为什么"孤雌生殖"的后代有时高度纯合、有时几乎与母体相同。

### 8.4 减数分裂产物不是配子：植物与真菌

| 生活史类型 | 减数分裂位置 | 产物 |
|---|---|---|
| 配子减数分裂（动物） | 配子形成前 | 直接是配子 |
| 孢子减数分裂（植物） | 孢子体 → 孢子 | 孢子，经有丝分裂形成配子体，再产生配子 |
| 合子减数分裂（真菌、部分藻类） | 合子萌发时 | 单倍体营养体 |

- 被子植物：小孢子母细胞减数产生 **4 个小孢子**（后被绒毡层供养，形成花粉）；大孢子母细胞减数产生 **4 个大孢子，其中 3 个退化**，只剩 1 个发育为胚囊——"四去三"。

---

## 9. 胞质与产物命运的特殊安排

- **卵子发生**：两次分裂都极度不均等，胞质几乎全部留给卵子，极体退化。核心逻辑是"把资源集中到一个配子"。
- **精子发生**：细胞间桥（intercellular bridge）把同源精母细胞连成合胞体，共享胞质；单倍体基因是否"为自己"表达仍有争议（单倍体基因表达假说）。
- **植物花粉**：四个小孢子被共同的胼胝质壁包裹，释放后各自发育；绒毡层为其提供营养。
- **寄生虫与共生体**：部分类群的减数分裂与宿主周期同步，时间尺度差异极大。

---

## 10. 四种模式的横向对照

| 维度 | 标准 | 无交叉 | 倒置 | 无减数分裂 |
|---|---|---|---|---|
| 交叉 | 必需 | 无 | 有 | 无 |
| MI 分离对象 | 同源染色体 | 同源染色体 | 姐妹染色单体 | — |
| MII 分离对象 | 姐妹染色单体 | 姐妹染色单体 | 同源染色体 | — |
| 同源连接的替代机制 | 交叉 | 异染色质并置 + 专用蛋白 | 交叉（仍存在） | 不适用 |
| 产物 | 4 个 $n$ | 4 个 $n$ | 4 个 $n$ | 二倍体克隆/单倍体 |
| 代表 | 人、小鼠、酵母 | 雄性果蝇、雌性家蚕 | 线虫、蚜虫、蝴蝶 | 蒲公英、雄蜂 |

---

## 11. 为什么这些特例重要

- **演化**：重组率是可演化的性状，受种群结构、性别选择、驱动元件共同塑造；无交叉与倒置减数分裂说明"减数分裂"是一套模块化机器，可以被局部替换。
- **农业**：无融合生殖可固定杂合优势；Ph1 位点决定小麦能否稳定遗传；三倍体不育被用于无籽果实。
- **医学**：XY 性泡与 MSCI 关系男性不育；易位/倒位杂合子的减数分裂行为是遗传咨询与 PGT-SR 的基础；母亲年龄相关的黏连消耗是 21 三体的核心解释。
- **基础细胞生物学**：倒置减数分裂迫使研究者区分"减数分裂的定义"与"单着丝粒染色体的实现方式"；无交叉果蝇则提供了研究"分离不依赖重组"的天然实验系统。

---

## 12. 常见误区

1. **"所有减数分裂都必须有交叉"**：雄性果蝇、雌性家蚕都没有，靠异染色质并置与专用蛋白完成分离。
2. **"MI 一定分离同源染色体"**：全着丝粒类群的倒置减数分裂中，MI 先分离姐妹染色单体。
3. **"减数分裂一定产生四个配子"**：植物产生孢子；卵母细胞只产生一个功能卵子；雄蜂的精子靠有丝分裂产生。
4. **"全着丝粒就是没有着丝粒"**：动粒遍布全长，仍然承担纺锤体连接功能，只是无法单极定向。
5. **"没有交叉就没有重组"**：对雄性果蝇基本成立，但其他"低重组"类群仍可能有少量非交叉重组；不要把两者简单等同。
6. **"多倍体一定形成多价体"**：异源多倍体可通过 Ph1 类机制强制二价体配对。
7. **"孤雌生殖就是不做减数分裂"**：自体融合型仍进行减数分裂，只是产物核随后融合。
8. **"雄蜂也做减数分裂"**：雄蜂是单倍体，精子发生为有丝分裂。
9. **"倒置减数分裂是异常"**：它是全着丝粒类群稳定演化的正常策略。
10. **"无融合生殖等于完全克隆"**：部分无融合生殖仍保留减数分裂的早期步骤或偶发重组。

---

## 13. 一页速记

- **模板五要素**：复制一次、两次分裂、同源联会并交叉、MI 分同源、MII 分姐妹。
- **无交叉**：雄性果蝇、雌性鳞翅目；靠异染色质并置 + SNM/MEI-S332 等维持连接。
- **倒置**：全着丝粒类群（线虫、蚜虫、蝴蝶）；MI 分姐妹、MII 分同源。
- **性染色体**：XY 仅 PAR 联会 → 性泡 → MSCI；XO、ZW 各有单价体问题。
- **多倍体**：同源多倍体多价体、异源多倍体靠 Ph1 强制二价体。
- **驱动**：t 单倍型、Ab10 新着丝粒、果蝇 SD——传递率 > 50%。
- **无减数分裂**：无融合生殖（蒲公英）、雄蜂有丝分裂产精、自体融合三型。
- **产物改写**：植物产孢子（大孢子"四去三"）、卵母细胞产 1 卵 + 极体。
