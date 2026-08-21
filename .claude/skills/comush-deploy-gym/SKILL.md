---
description: Deploy de gym-calendar. Revisa la hoja de feedback, sube la version semver (major/minor/patch), actualiza todas sus referencias, commit y push. Solo para el proyecto gym-calendar; no confundir con el comando global comush-deploy, que publica otro proyecto distinto (Compose/Wasm).
---

You are performing a **versioned deploy** for the gym-calendar project.
Working directory: `I:\Workspace\gym-calendar`

## Step 0 — Revisar la hoja de feedback antes de desplegar

Los usuarios reportan errores desde el botón 💬 de la app y cada reporte
cae como fila en esta hoja de Google Sheets, que tiene dos pestañas:

- **Hoja 1** (gid=0) — pendientes:
  `https://docs.google.com/spreadsheets/d/1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs/edit?gid=0#gid=0`
  Columnas: `date`, `type` (`idea` o `error`), `text`, `version`, `profile`, `userAgent`.
- **Resueltos** (gid=1670611178) — histórico de errores ya arreglados:
  `https://docs.google.com/spreadsheets/d/1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs/edit?gid=1670611178#gid=1670611178`
  Mismas columnas que Hoja 1 más `resuelto_en_version`.

Hoja 1 sólo debería contener lo pendiente (los arreglados se mueven a
Resueltos, ver Paso 5.5), así que en circunstancias normales todo lo que
haya ahí con `type = error` está sin atender. Aun así, antes de descartar
algo comprueba primero en Resueltos si no es una regresión de un fix
anterior — eso cambia cómo lo cuentas al usuario.

1. Lee las dos pestañas. Prueba en este orden y usa el primero que funcione:
   - CSV público: `WebFetch` a
     `https://docs.google.com/spreadsheets/d/1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs/export?format=csv&gid=0`
     (cambia `gid=0` por `gid=1670611178` para Resueltos).
   - Si no es accesible (la hoja no es pública o WebFetch falla), y hay
     herramientas de Google Drive/Sheets disponibles en la sesión (p.ej.
     `read_file_content` sobre el fileId `1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs`),
     úsalas para leer el contenido.
   - Si ninguna de las dos funciona, dilo explícitamente y pasa al Paso 1
     sin bloquear el deploy por un problema de acceso.
2. Separa las filas de Hoja 1 en dos grupos: `type = error` y `type = idea`.
   Ordena cada grupo por fecha descendente.
3. Si hay errores:
   - Resume los más recientes al usuario (fecha, versión en la que se
     reportó, texto) — no hace falta listarlos todos si hay muchos, con
     los últimos 5-10 basta. Si alguno coincide con algo que ya aparece en
     Resueltos, dilo (puede ser una regresión).
   - Pregunta si quiere seguir con el deploy tal cual, o pausar para
     arreglar alguno ahora (puede elegir uno, varios o todos).
4. Si hay ideas:
   - Resúmelas igual (fecha, texto) y pregúntale si quiere implementar
     alguna en este mismo deploy — puede elegir una, varias, todas, o
     ninguna.
5. En ambos casos la decisión es del usuario: no canceles el deploy por tu
   cuenta, no lo bloquees en silencio, y no des por hecho que "revisar la
   hoja" significa "arreglarlo todo" — sólo se arregla lo que el usuario
   decida explícitamente.
6. Si no hay filas de ningún tipo en Hoja 1, o la hoja está vacía, dilo
   brevemente y continúa directamente al Paso 1 sin pedir confirmación.
7. Guarda mentalmente qué filas (si alguna) se decidió arreglar/implementar
   en este deploy — las necesitarás en el Paso 5.5. Si el usuario elige
   dejar algo pendiente, esa fila NO se toca ni se mueve.

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

## Step 5.5 — Mover a Resueltos lo que se haya arreglado de verdad

**Sólo si en el Paso 0 el usuario decidió arreglar/implementar alguna fila**
y ese trabajo quedó incluido en el commit que acabas de hacer. Si no se
tocó ninguna fila (deploy sin relación con el feedback, o el usuario
prefirió dejarlo pendiente), sáltate este paso entero — no muevas nada
"porque sí" sólo por haber desplegado.

Para cada fila que sí se arregló/implementó en este deploy:

1. Abre la hoja con el navegador (no hay API de Sheets en las herramientas
   disponibles, así que esto se hace a mano vía UI):
   `https://docs.google.com/spreadsheets/d/1dGfjsrPsW7VqGvQw6uwt37zPF3VUjXQp9TT_Y23YFBs/edit?gid=0#gid=0`
2. En la pestaña **Resueltos**, ve a la primera fila vacía y añade los
   mismos valores de la fila original (`date`, `type`, `text`, `version`,
   `profile`, `userAgent`) más `resuelto_en_version = NEW_VERSION`.

   **Importante sobre cómo escribir en las celdas:** al usar la acción
   `type` del navegador, las tabulaciones (`\t`) dentro del texto NO saltan
   de celda — se escriben literalmente dentro de la misma celda. Para
   moverte a la siguiente celda usa una acción `key` con `Tab` separada
   después de cada `type`, celda por celda. Termina la fila con `key: Return`.
3. Vuelve a **Hoja 1**, localiza la fila original (mismo `date` + `text`) y
   bórrala: clic derecho sobre el número de fila → "Eliminar fila". No
   basta con borrar el contenido de las celdas, la fila debe desaparecer
   del todo para no dejar un hueco en blanco.
4. Cierra la pestaña del navegador que hayas abierto para esto.

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

If the Paso 5.5 moved any rows, add a line naming what got closed out, e.g.
`   Feedback resuelto: "<texto corto>" → Resueltos (vNEW_VERSION)`. If nothing
was moved, omit this line entirely — don't say "sin cambios en feedback" or
similar filler.

---

## Notes

- This skill lives in `.claude/skills/comush-deploy-gym/` and only applies to this project.
- The name carries the `-gym` suffix on purpose: there is a **separate** global command at `~/.claude/commands/comush-deploy.md` that deploys a different project (a Compose Multiplatform / Wasm site, via `gradlew.bat :composeApp:publishWasmToDocs`). They do completely different things, so the names are kept distinct to avoid invoking the wrong one.
- The version is visible in the app header (injected by `APP_VERSION` in `app.js`).
- GitHub Pages updates automatically when `master` is pushed (no separate deploy step needed — the repo serves from the `master` branch root).
- If `git status` is clean (nothing to commit beyond version files), still bump the version and push — it forces a PWA cache refresh for users.
