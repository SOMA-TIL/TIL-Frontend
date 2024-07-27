#!/bin/bash
echo "Copying .github/hooks to .git/hooks"
find .github/hooks -type f ! -name '*.sh' -exec cp {} .git/hooks/ \;
chmod +x .git/hooks/*
