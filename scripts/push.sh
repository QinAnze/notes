#!/usr/bin/env bash
# 把 notes/ 的内容提交并推送到 https://github.com/QinAnze/notes
# 用法：bash scripts/push.sh "提交说明"
set -euo pipefail

MSG="${1:-chore: update notes}"
cd "$(dirname "$0")/.."

echo "==> 清理 git 索引里的构建产物（.gitignore 对已跟踪文件无效）"
git rm -r --cached --ignore-unmatch node_modules public .quartz-cache 2>/dev/null || true

echo "==> 暂存"
git add -A

echo "==> 自检：不该入库的文件有没有漏进来"
LEAK=""
for pat in '*.sh' 'node_modules/*' 'public/*' '.quartz-cache/*' '*.tgz' '*.log'; do
  n=$(git diff --cached --name-only --diff-filter=ACMR | grep -c "$pat" || true)
  [[ "$n" -gt 0 ]] && LEAK="${LEAK}  ⚠️  ${pat} → ${n} 个\n"
done
if [[ -z "$LEAK" ]]; then
  echo "  ✓ node_modules / public / .quartz-cache / *.sh / *.log 均未入库"
else
  printf "  $LEAK"
  echo "  （若是误入，先修 .gitignore 再 git rm -r --cached <路径>）"
fi

echo "==> 自检：超大文件（>50MB，GitHub 会直接拒绝）"
git diff --cached --name-only --diff-filter=ACMR | while read -r f; do
  [[ -f "$f" ]] || continue
  kb=$(du -k "$f" | cut -f1)
  [[ "$kb" -gt 51200 ]] && printf "  ⚠️  %d KB  %s\n" "$kb" "$f"
done || true

echo "==> 待提交文件统计"
git diff --cached --name-only | wc -l | xargs printf "  共 %s 个文件\n"

git diff --cached --name-only | sed 's#/.*##' | sort | uniq -c \
  | awk '{printf "  %-16s %s\n", $2, $1}'

echo "==> 提交"
git commit -m "$MSG"

echo "==> 推送"
git push origin master

echo
echo "✅ 完成。仓库地址： https://github.com/QinAnze/notes"
echo "   站点地址：   https://qinanze.github.io/notes"