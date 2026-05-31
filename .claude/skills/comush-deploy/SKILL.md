---
description: Bump semver version (major/minor/patch), update all version references across the project, commit and push. Gym-calendar project only.
---

You are performing a **versioned deploy** for the gym-calendar project.
Working directory: `I:\Workspace\gym-calendar`

## Step 1 — Determine bump type

- If an argument was passed (e.g. `minor`, `major`, `patch`), use it.
- Otherwise, look at `git diff HEAD` (or the unstaged diff) and decide:
  - **major** → breaking change or complete redesign
  - **minor** → new feature or visible behavior change
  - **patch** → bug fix, copy tweak, style adjustment, dependency bump

## Step 2 — Read current version

Read `version.json`. Parse the `"version"` field (format `X.Y.Z`).
Split into `major`, `minor`, `patch` integers.

## Step 3 — Calculate new version

Apply the bump rule:
- `patch` → `X.Y.(Z+1)`
- `minor` → `X.(Y+1).0`
- `major` → `(X+1).0.0`

Call the result `NEW_VERSION` (string, e.g. `"4.1.0"`).

## Step 4 — Update all version references

Use the **Edit tool** (not sed/PowerShell replace) to make these exact substitutions.
The old string to match is always the current `"X.Y.Z"` you read in Step 2.

| File | Old string | New string |
|------|-----------|-----------|
| `version.json` | `"version": "X.Y.Z"` | `"version": "NEW_VERSION"` |
| `sw.js` | `const CACHE_NAME = 'gym-calendar-vX.Y.Z';` | `const CACHE_NAME = 'gym-calendar-vNEW_VERSION';` |
| `app.js` | `var APP_VERSION = 'X.Y.Z';` | `var APP_VERSION = 'NEW_VERSION';` |
| `app.js` | `Versión: X.Y.Z —` | `Versión: NEW_VERSION —` (header comment) |
| `manifest.json` | `"version": "X.Y.Z"` | `"version": "NEW_VERSION"` |

> **Important:** read each file before editing if you haven't already in this session, so the Edit tool doesn't fail with "file modified since read".

## Step 5 — Stage and commit

1. Run `git add -u` to stage all tracked modified files.
2. Run `git diff --staged --stat` to see what's staged.
3. Also run `git diff HEAD` or `git status` to check for other unstaged changes — if there are meaningful changes beyond the version bump, stage them too (`git add -u` already covers all tracked files).
4. Write a commit message:
   - Title: `deploy vNEW_VERSION: <one-line summary of the main changes>`
   - Body: bullet points of the main changes if there are more than 2 files changed beyond the version files
   - Trailer: `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`
5. Commit using PowerShell (required on this machine — Bash multiline commits fail):
```powershell
cd "I:\Workspace\gym-calendar"; git commit -m @'
deploy vNEW_VERSION: <summary>

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
'@
```

## Step 6 — Push

```powershell
cd "I:\Workspace\gym-calendar"; git push
```

If the push fails due to no upstream, run `git push --set-upstream origin master`.

## Step 7 — Report

Print a summary:
```
✅ Deployed v4.0.0 → vNEW_VERSION (patch)
   Commit: <short SHA> on master
   CACHE_NAME: gym-calendar-vNEW_VERSION
```

---

## Notes

- This skill lives in `.claude/skills/comush-deploy/` and only applies to this project. It does NOT affect the global comush-deploy skill.
- The version is visible in the app header (injected by `APP_VERSION` in `app.js`).
- GitHub Pages updates automatically when `master` is pushed (no separate deploy step needed — the repo serves from the `master` branch root).
- If `git status` is clean (nothing to commit beyond version files), still bump the version and push — it forces a PWA cache refresh for users.
