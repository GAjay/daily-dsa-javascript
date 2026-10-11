#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! gh auth status -h github.com &>/dev/null; then
  echo "Run: gh auth login"
  exit 1
fi

gh auth setup-git

if git push github main:main 2>/dev/null; then
  echo "Pushed main to github.com (with workflows)."
  exit 0
fi

echo "Push blocked (usually missing workflow scope). Pushing history without .github/ ..."
TMP="/tmp/dsa-github-push-$$"
rm -rf "$TMP"
git clone "$ROOT" "$TMP"
cd "$TMP"
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --index-filter 'git rm -rf --cached --ignore-unmatch .github' HEAD
git push https://github.com/GAjay/daily-dsa-javascript.git main --force
rm -rf "$TMP"
echo "Pushed without workflows. See automation/PUSH_GITHUB_WORKFLOWS.md to add Actions."
