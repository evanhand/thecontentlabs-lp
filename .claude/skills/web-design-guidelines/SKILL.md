---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Vercel's Web Interface Guidelines.

## How It Works

1. Read the rules in [guidelines.md](guidelines.md) next to this file. They are a pinned copy of
   https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   (fetched 2026-11-18), kept local so a review does not depend on a remote file. Refresh the copy
   deliberately when you want newer rules.
2. Read the specified files (or ask which files to review).
3. Check them against every rule in guidelines.md.
4. Output findings in the terse `file:line` format guidelines.md specifies.
