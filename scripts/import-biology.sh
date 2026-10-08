#!/usr/bin/env bash
# 把 dev/基本生物学笔记/ 并入 notes/content/基本生物学笔记/
#
# 设计原则：**只复制，不移动、不删除**。dev/ 原件保持原样，
# 你在站点上验完链接没问题后，自己手动删 dev/ 即可。做错了可以直接重跑。
#
# 用法：bash scripts/import-biology.sh
set -euo pipefail

WS="/home/robin/文档/QuartzNotes"
SRC="$WS/dev/基本生物学笔记"
DST="$WS/notes/content/基本生物学笔记"
NOTES="$WS/notes"

if [[ ! -d "$SRC" ]]; then
  echo "✓ 源目录已不存在（$SRC），说明已经导入过了。直接看下面的结构检查即可。"
  SRC=""
fi

if [[ -n "$SRC" ]]; then
  echo "==> 建目录"
  mkdir -p "$DST/上课笔记" "$DST/知识点" "$DST/pdf"

  echo "==> 复制 PDF"
  cp "$SRC"/pdf/*.pdf "$DST/pdf/"

  echo "==> 复制笔记"
  # 绪论.md 与有机化学那份重名：shortest 策略按文件名唯一匹配，
  # 两个「绪论」同时命中 → 退化成相对路径 → 全站 404。故改名。
  cp "$SRC/绪论.md"                  "$DST/上课笔记/普通生物学绪论.md"
  cp "$SRC/生命的化学基础.md"     "$DST/上课笔记/生命的化学基础.md"
  cp "$SRC/细胞结构与细胞通讯.md" "$DST/上课笔记/细胞结构与细胞通讯.md"
  cp "$SRC/细胞代谢.md"           "$DST/上课笔记/细胞代谢.md"
  cp "$SRC/细胞分裂与细胞周期.md" "$DST/上课笔记/细胞分裂与细胞周期.md"
  cp "$SRC/大笔记.md"             "$DST/知识点/大笔记.md"

  echo "==> 修 [[绪论]] 内链（改名后必须同步，否则 404）"
  # 只改上课笔记和知识点下的正文，index.md 用的是完整路径 md 链接，不受影响
  sed -i 's/\[\[绪论\]\]/[[普通生物学绪论]]/g' \
    "$DST/上课笔记/普通生物学绪论.md" \
    "$DST/上课笔记/生命的化学基础.md" \
    "$DST/上课笔记/细胞结构与细胞通讯.md" \
    "$DST/上课笔记/细胞代谢.md" \
    "$DST/上课笔记/细胞分裂与细胞周期.md" \
    "$DST/知识点/大笔记.md"
fi

echo "==> 注入 frontmatter（对齐有机化学笔记的字段风格）"
fm() {  # fm <文件> <章节号|空> <tag...>
  local f="$1" ch="$2"; shift 2
  if [[ ! -f "$f" ]]; then echo "  ✗ 缺失：$f"; return; fi
  if head -1 "$f" | grep -q '^---$'; then
    echo "  · $(basename "$f") 已有 frontmatter，跳过"
    return
  fi
  local tmp; tmp="$(mktemp)"
  {
    echo "---"
    echo "tags:"
    for t in "$@"; do echo "  - $t"; done
    if [[ -n "$ch" ]]; then echo "chapter: $ch"; fi
    echo "---"
    echo
    cat "$f"
  } > "$tmp"
  mv "$tmp" "$f"
  echo "  ✓ $(basename "$f")"
}

U="$DST/上课笔记"
fm "$U/普通生物学绪论.md"     1 普通生物学 上课笔记 绪论
fm "$U/生命的化学基础.md"     2 普通生物学 上课笔记 生命的化学基础
fm "$U/细胞结构与细胞通讯.md" 3 普通生物学 上课笔记 细胞结构与细胞通讯
fm "$U/细胞代谢.md"           4 普通生物学 上课笔记 细胞代谢
fm "$U/细胞分裂与细胞周期.md" 5 普通生物学 上课笔记 细胞分裂与细胞周期
fm "$DST/知识点/大笔记.md"    "" 普通生物学 知识点 课程总览

echo
echo "==> 结构检查"
echo "--- 各文件夹的 .md 数量（index.md 不算内容）---"
for d in "$DST" "$DST/上课笔记" "$DST/知识点"; do
  n=$(find "$d" -maxdepth 1 -name '*.md' ! -name 'index.md' | wc -l)
  printf "  %-14s %s 篇\n" "$(basename "$d")/" "$n"
done
printf "  %-14s %s 个\n" "pdf/" "$(find "$DST/pdf" -name '*.pdf' | wc -l)"

echo "--- 残留的 [[绪论]]（应为 0）---"
left=$(grep -rl '\[\[绪论\]\]' "$DST" 2>/dev/null | wc -l)
echo "  $left"
[[ "$left" -eq 0 ]] || echo "  ⚠️ 还有文件没改干净"

echo "--- 与有机化学重名的文件（应为空）---"
dup=$(cd "$NOTES/content" && ls 有机化学笔记/上课笔记/*.md 2>/dev/null \
      | xargs -n1 basename 2>/dev/null \
      | while read -r f; do [[ -f "基本生物学笔记/上课笔记/$f" ]] && echo "$f"; done)
[[ -z "$dup" ]] && echo "  无重名 ✓" || echo "$dup"

echo
echo "✅ 完成。dev/ 原件未改动，确认无误后可以手动删除 dev/ 目录。"
echo
echo "下一步："
echo "  cd $NOTES"
echo "  npx quartz build --serve   # 逐个点开 5 章笔记 + 总笔记，确认内容都在、链接不404"
echo "  npx tsc --noEmit"
echo "  bash scripts/push.sh \"feat: 合并基本生物学笔记\""