import { QuartzEmitterPlugin } from "../types"
import { FilePath, FullSlug } from "../../util/path"
import fs from "fs"
import path from "path"

/**
 * 把 `static/molecules.json` 发到 `public/static/molecules.json`。
 *
 * 为什么不直接放 `quartz/static/`？
 * 上游的 `Plugin.Static` emitter 确实会把 `quartz/static/` 整个复制到输出目录，
 * 但那是上游代码的地盘，数据塞进去以后升级/对比上游时容易打架。
 * 数据放在**项目根的 `static/`**（就在 `content/` 旁边，人读得到也改得动），
 * 由这个 emitter 负责发布 —— 做法和上游 `Plugin.ContentIndex`
 * 发 `static/contentIndex.json` 完全一样，是 Quartz 自己的惯例。
 *
 * ⚠️ 路径基准是**项目根**（构建时的 cwd），不是 `argv.directory`
 * （那是 `content/`，会拼成 content/static/）。
 *
 * ⚠️ 这里必须**显式报错**：`processors/emit.ts` 的循环里 emitter 抛错只会被
 * `trace()` 记一笔、build 照常跑完，表现就是「文件没产出 + 浏览器 404」，
 * 光看构建日志完全看不出坏在哪一步。所以下面每一步都往 stderr 打一行。
 */
export const MoleculeData: QuartzEmitterPlugin = () => ({
  name: "MoleculeData",
  getQuartzComponents() {
    return []
  },
  async emit(ctx, _content, _resources, emit): Promise<FilePath[]> {
    const src = path.resolve(process.cwd(), "static", "molecules.json")
    if (!fs.existsSync(src)) {
      throw new Error(
        `找不到分子数据文件：${src}\n` +
          `（cwd = ${process.cwd()}，请在项目根目录下运行 npx quartz build）`,
      )
    }

    const content = await fs.promises.readFile(src, "utf8")

    // 提前 JSON.parse 一次：数据写坏了要在**构建期**报错，
    // 而不是等到浏览器里静默失败、框直接不显示。
    let count = 0
    try {
      count = ((JSON.parse(content) as { molecules?: unknown[] }).molecules ?? []).length
    } catch (err) {
      throw new Error(`static/molecules.json 不是合法 JSON：${(err as Error).message}`)
    }

    const out = await emit({ content, slug: "static/molecules" as FullSlug, ext: ".json" })
    console.log(`[MoleculeData] ${src} → ${path.join(ctx.argv.output, "static/molecules.json")}（${count} 条）`)
    return [out]
  },
})
