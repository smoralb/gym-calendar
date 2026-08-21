---
description: Bump semver version (major/minor/patch), update all version references across the project, commit and push. Gym-calendar project only.
---

You are performing a **versioned deploy** for the gym-calendar project.
Working directory: `I:\Workspace\gym-calendar`

## Step 0 — Revisar la hoja de feedback antes de desplegar

Los usuarios reportan errores desde el botón 💬 de la app y cada reporte
cae como fila en esta hoja de Google Sheets:
`https://docs.google.com/spreadsheets/d/1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs/edit?gid=0#gid=0`

Columnas: `date`, `type` (`idea` o `error`), `text`, `version`, `profile`,
`userAgent`. No hay columna de estado, así que no hay forma de saber
automáticamente cuáles ya están resueltos — el criterio lo pone quien
revisa.

1. Lee la hoja. Prueba en este orden y usa el primero que funcione:
   - CSV público: `WebFetch` a
     `https://docs.google.com/spreadsheets/d/1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs/export?format=csv&gid=0`
   - Si no es accesible (la hoja no es pública o WebFetch falla), y hay
     herramientas de Google Drive/Sheets disponibles en la sesión, úsalas
     para leer el contenido del fichero con ese ID.
   - Si ninguna de las dos funciona, dilo explícitamente y pasa al Paso 1
     sin bloquear el deploy por un problema de acceso.
2. Filtra las filas con `type = error`. Ordénalas por fecha descendente.
3. Si hay alguna:
   - Resume las más recientes al usuario (fecha, versión en la que se
     reportó, texto) — no hace falta listarlas todas si hay muchas, con
     las últimas 5-10 basta.
   - Pregunta si quiere seguir con el deploy tal cual, o pausar para
     solucionar alguno de esos errores primero. La decisión es suya: no
     canceles el deploy por tu cuenta, y no lo bloquees en silencio.
4. Si no hay filas de tipo `error`, o la hoja está vacía, dilo brevemente
   y continúa directamente al Paso 1 sin pedir confirmación.

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
   - Trailer: `Co-Authored-By: <your model name> <noreply@anthropic.com>` — use the model you actually are, not a hardcoded one
5. Commit by writing the message to a file and passing it with `-F`.

   **Do not use `git commit -m` with a PowerShell here-string.** PowerShell
   expands double quotes inside `@'...'@` when the argument is passed to a
   native executable, so a message containing `"` gets split into words and
   git fails with `error: pathspec '...' did not match any file(s)`.

   Write the message with the **Write tool** to a scratch file (use the
   session scratchpad directory, not the repo), then:

```powershell
cd "I:\Workspace\gym-calendar"; git commit -F "<path-to-message-file>"; if ($?) { git log --oneline -1 }
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
