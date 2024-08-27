#!/bin/bash

# FE 디렉토리 경로 찾기
FE_DIR="$(cd "$(dirname "$0")/../../" && pwd)"
GITHUB_HOOKS_DIR="$FE_DIR/.github/hooks"
GIT_HOOKS_DIR="$FE_DIR/.git/hooks"

echo "Copying .github/hooks to .git/hooks"
find $GITHUB_HOOKS_DIR -type f ! -name '*.sh' -exec cp {} $GIT_HOOKS_DIR \;
chmod +x $GIT_HOOKS_DIR/*
