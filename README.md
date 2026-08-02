# 🏋️ Gym Calendar

Aplicación web progresiva (PWA) para seguir una rutina de ejercicios 3 días/semana:

- **Lunes** — Empuje (Pecho, Hombro anterior, Tríceps)
- **Miércoles** — Tirón (Espalda, Hombro posterior, Bíceps)
- **Viernes** — Pierna y Core

### ✨ Funcionalidades

- ✅ Seguimiento de ejercicios completados con sonido y vibración
- 🏋️ Registro de pesos utilizados en cada ejercicio
- 📊 Historial de progreso por ejercicio
- 🎯 Sugerencias automáticas para subir de peso
- 🔍 Catálogo de 1.324 ejercicios con animaciones e instrucciones en español
- 📱 PWA instalable en móvil (funciona offline)
- 🌙 Modo oscuro

### 🚀 Uso

Abre [https://smoralb.github.io/gym-calendar](https://smoralb.github.io/gym-calendar) en tu navegador móvil y añádelo a la pantalla de inicio para usarlo como app.

### 📚 Dataset de ejercicios

La app consume [smoralb/exercises-dataset](https://github.com/smoralb/exercises-dataset)
(1.324 ejercicios con GIF animado, miniatura, músculos, material e instrucciones
paso a paso en 10 idiomas).

Cómo está integrado:

- **`data/exercises-index.json`** (~0.9 MB) — índice ligero que vive en este repo:
  sólo los campos que usa la app y las instrucciones únicamente en español.
  Lo genera `tools/build-exercise-index.ps1` a partir del `exercises.json`
  original de 17 MB.
- **Imágenes y GIFs** — no se copian aquí (son 128 MB). Se piden bajo demanda a
  jsDelivr: `https://cdn.jsdelivr.net/gh/smoralb/exercises-dataset@main/videos/{id}-{media_id}.gif`.
  El service worker los guarda en una caché aparte (`gym-calendar-exercise-media-v1`),
  así los ejercicios ya vistos siguen disponibles sin conexión.
- **`EXERCISE_DB`** (en `app.js`) — módulo de acceso: `load()`, `get(id)`,
  `search(texto, {bodyPart, equipment})`, `imageUrl(rec)`, `gifUrl(rec)`.
  La búsqueda funciona en español gracias a un glosario ES→EN (`ES_SYNONYMS`),
  porque el dataset sólo trae los nombres en inglés.
- **`EXERCISE_DB_MAP`** (en `app.js`) — enlaza cada ejercicio de la rutina con su
  id en el dataset, para mostrar la animación dentro de la tarjeta del ejercicio.

Para regenerar el índice cuando el dataset se actualice:

```powershell
powershell -ExecutionPolicy Bypass -File tools\build-exercise-index.ps1
```

Media © [Gym visual](https://gymvisual.com/) — respeta sus términos de uso al redistribuirla.
