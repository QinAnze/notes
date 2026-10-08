#!/usr/bin/env bash
# 清理 content/ 根目录下已搬迁到 有机化学笔记/ 的旧目录
# 用法： bash scripts/cleanup-old-content.sh
set -uo pipefail

cd "$(dirname "$0")/.."

OLD_DIRS=("知识点" "教师")

FOUND=()
for d in "${OLD_DIRS[@]}"; do
  if [[ -d "content/$d" ]]; then
    FOUND+=("$d")
  fi
done

if [[ ${#FOUND[@]} -eq 0 ]]; then
  echo "无需清理：content/ 下没有遗留的旧目录。"
else
  echo "将删除以下旧目录（其内容已存在于 content/有机化学笔记/ 下）："
  for d in "${FOUND[@]}"; do
    echo "  - content/$d"
  done
  echo

  read -rp "确认删除？(y/N) " ans
  if [[ "$ans" == "y" || "$ans" == "Y" ]]; then
    for d in "${FOUND[@]}"; do
      rm -rf "content/$d"
      echo "已删除 content/$d"
    done
  else
    echo "已取消。"
    exit 0
  fi
fi

echo
echo "完成。content/ 当前结构："
find content -maxdepth 2 -type d | sort