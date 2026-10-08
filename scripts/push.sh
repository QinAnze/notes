#!/usr/bin/env bash
# 把 notes/ 的内容提交并推送到 https://github.com/QinAnze/notes
# 用法：bash scripts/push.sh "提交说明"
set -euo pipefail

MSG="${1:-chore: update notes}"
cd "$(dirname "$0")/.."

echo "==> 清理 git 索引里的构建产物（.gitignore 对已跟踪文件无效）"
git rm -r --cached --ignore-unmatch node_modules public .quartz-cache 2>/dev/null || true

echo "==> 检查是否有超大文件被误纳入（>50MB，GitHub 会直接拒绝）"
git ls-files -z | xargs -0 -I{} sh -c 'test -f "{}" && du -k "{}"' 2>/dev/null \
  | awk '$1 > 51200 {printf "  ⚠️  %d KB  %s\n", $1, $2}' || true

echo "==> 暂存"
git add -A

echo "==> 待提交文件统计"
git status --short | awk '{print $1}' | sort | uniq -c

echo "==> 提交"
git commit -m "$MSG"

echo "==> 推送"
git push origin master

echo
echo "✅ 完成。仓库地址： https://github.com/QinAnze/notes"
echo "   站点地址：   https://qinanze.github.io/chemistry-notes"