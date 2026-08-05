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
- 🏷️ Ejercicios categorizados por tags (material, patrón, objetivo y nivel) con filtros combinables
- 🎯 Tutorial que pregunta objetivo, material, días y nivel, y genera una rutina de 12 semanas a medida
- 🏃 Colección "Recuperación running": 29 ejercicios preventivos para corredores
- 📱 PWA instalable en móvil (funciona offline)
- 🌙 Modo oscuro

### 🚀 Uso

Abre [https://smoralb.github.io/gym-calendar](https://smoralb.github.io/gym-calendar) en tu navegador móvil y añádelo a la pantalla de inicio para usarlo como app.

### 💻 Desarrollo local

No hay build: son ficheros planos (`index.html`, `app.js`, `styles.css`). Para
probarlos basta con levantar un servidor estático:

```powershell
powershell -ExecutionPolicy Bypass -File tools\serve.ps1
```

Y abrir [http://localhost:8000](http://localhost:8000). Con `-Port 8080` se
cambia el puerto. El script usa `HttpListener` (viene con Windows), así que no
hace falta tener Python ni Node instalados.

Dos avisos:

- **Ábrela por `http://`, no con doble clic en `index.html`.** Con `file://`
  fallan el `fetch` del dataset y el service worker.
- **El service worker cachea.** Si no ves un cambio, recarga con
  `Ctrl+Shift+R`, o desregístralo en DevTools → Application → Service Workers.

Para volver a ver el onboarding de primer arranque hay que borrar las claves
que lo dan por hecho (DevTools → Console):

```js
localStorage.removeItem('gym_onboarding_done');
localStorage.removeItem('gym_active_profile');
localStorage.removeItem('gym_custom_plan');
```

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
- **`RUNNING_RECOVERY`** (en `app.js`) — colección "Recuperación running": 29
  ejercicios preventivos y de recuperación para corredores, con su propia
  descripción, músculos y material. Es un catálogo consultable, no una rutina
  (no lleva series ni repeticiones). Cada entrada apunta con `db` al id del
  dataset del que saca la animación, o `null` si no hay equivalente.

### 🏷️ Tags y rutina a medida

El dataset no trae tags, así que **`EXERCISE_TAGS`** (en `app.js`) los deriva por
reglas a partir de `bp`/`eq`/`tg` y del nombre del ejercicio. Se calculan en
tiempo de ejecución (cacheados en el propio registro): al regenerar el índice
siguen siendo correctos sin tocar nada. Cada ejercicio recibe tags de cuatro
familias:

| Familia | Valores |
| --- | --- |
| Material | `sin_material` · `casa` · `gimnasio` |
| Patrón | `empuje` · `tiron` · `pierna` · `core` · `cardio` (+ marca `brazos`) |
| Objetivo | `fuerza` · `hipertrofia` · `tono` · `perder_peso` · `movilidad` |
| Nivel | `principiante` · `intermedio` · `avanzado` |

Sobre esos tags se apoyan dos cosas:

- **Filtros del catálogo** — chips acumulables en la pestaña Ejercicios; los tres
  tags más informativos se pintan en cada tarjeta.
- **Tutorial «Crea tu rutina a medida»** — 5 preguntas (objetivo, dónde entrenas,
  días por semana, experiencia y zona prioritaria) y con las respuestas
  `generateRoutine()` arma una rutina de 12 semanas: elige los ejercicios por
  tags, reparte las sesiones según el split de los días disponibles (2 a 5),
  evita repetir material dentro de una sesión y aplica series/repeticiones/descanso
  según el objetivo, subiendo la carga en cada una de las 3 fases.

La rutina generada se guarda en `localStorage` (`gym_custom_plan`) y se registra
como un perfil más (**«Mi plan»**), así que hereda el calendario, el registro de
pesos, el progreso y las estadísticas que ya existían.

Para regenerar el índice cuando el dataset se actualice:

```powershell
powershell -ExecutionPolicy Bypass -File tools\build-exercise-index.ps1
```

Media © [Gym visual](https://gymvisual.com/) — respeta sus términos de uso al redistribuirla.
