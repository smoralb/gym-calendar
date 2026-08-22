# 🏋️ Gym Calendar

Aplicación web progresiva (PWA) que genera y sigue programas de entrenamiento
de 12 semanas, adaptados al material, los días y el objetivo de cada persona.

### ✨ Funcionalidades

- 🎯 Asistente que genera un programa de 12 semanas a medida, con objetivos de
  volumen semanal por músculo
- 🗂️ **Varios planes a la vez**: crear, renombrar y borrar desde el selector
- 🧠 **«¿Por qué este entrenamiento?»** — la app explica qué programa sigues,
  cuántas series necesita cada músculo y cómo progresas
- ✅ Seguimiento de ejercicios completados con sonido y vibración
- 🏋️ Registro de pesos utilizados en cada ejercicio
- 📊 Historial de progreso por ejercicio
- 🎯 Sugerencias automáticas para subir de peso
- 🔍 Catálogo de 1.324 ejercicios con animaciones e instrucciones en español
- 🏷️ Ejercicios categorizados por tags (material, patrón, objetivo y nivel) con filtros combinables
- 🏃 Plan de vuelta a correr de 12 semanas, combinable con los días de fuerza
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
Object.keys(localStorage)
  .filter(k => k.startsWith('gym'))
  .forEach(k => localStorage.removeItem(k));
```

Y para comprobar que el generador sigue sano tras tocarlo, desde la consola:

```js
gymSelfTest()   // recorre ~388.000 combinaciones de respuestas y las valida
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

Los tags sostienen los **filtros del catálogo** (chips acumulables en la pestaña
Ejercicios) y el **buscador de alternativas**. Ojo: **ya no se usan para generar
la rutina** — eso lo hace un núcleo curado aparte, ver la sección siguiente.

### 🧠 Generador de rutinas

El dataset completo no se usa para programar: el generador elige de
**`CORE_EXERCISES`**, una lista curada a mano de 79 ejercicios con patrón,
grupo muscular, material, nivel y lesiones que desaconsejan cada uno. Los datos
de origen no bastaban —el nivel se adivinaba con expresiones regulares sobre el
nombre en inglés y el material del dataset a veces miente—, y así se llegó a
recetar «Flag» y «Ring dips» a un principiante sin material.

El eje del algoritmo son **las series semanales por músculo**, no el número de
ejercicios:

- **`VOLUME_TARGETS`** — objetivo de series/semana por grupo, según objetivo y
  nivel (p. ej. 13 para grupos grandes en hipertrofia/intermedio).
- **`SPLIT_CATALOG`** — 7 programas con nombre (Cuerpo completo, Push · Pull ·
  Legs, Torso · Pierna, PPL ×2…) para 2 a 6 días. Cada sesión declara los
  grupos musculares que **debe** cubrir y los opcionales, lo que garantiza que
  un día de pierna lleve cuádriceps y evita que el tríceps aparezca en el día
  de tirón.
- **Relleno por volumen** — se cubren primero los grupos obligatorios y después
  se añaden ejercicios al grupo más lejos de su objetivo, mientras quepa en el
  tiempo declarado. Por eso pedir 90 minutos da más trabajo que pedir 45.
- **Progresión** — 3 fases de 4 semanas. Con material sube la carga; **sin
  material se cambia a la variante más difícil** de la cadena `facil`/`dificil`
  (flexiones de rodillas → flexiones → flexiones con pies elevados). Las
  semanas 4, 8 y 12 son de descarga.
- **`validatePlan()`** — comprueba invariantes antes de enseñar nada: material,
  lesiones, duplicados, cobertura, coherencia y tiempo. Si falla, el generador
  reintenta con otra semilla en vez de mostrar un plan roto.
- **`gymSelfTest()`** — recorre ~388.000 combinaciones de respuestas y las pasa
  por el validador. Al añadir una pregunta nueva al asistente hay que añadirla
  también aquí: los dos fallos que llegaron a producción se colaron por no
  estar en la matriz.

Cada plan se guarda en el registro `gym_plans` de `localStorage` y se registra
como un perfil más, así que hereda calendario, pesos, progreso y estadísticas.
Se pueden tener **varios planes a la vez** y cambiar entre ellos.

📄 Detalle completo del algoritmo en
[`docs/algoritmo-generacion-rutinas.md`](docs/algoritmo-generacion-rutinas.md).

Para regenerar el índice cuando el dataset se actualice:

```powershell
powershell -ExecutionPolicy Bypass -File tools\build-exercise-index.ps1
```

Media © [Gym visual](https://gymvisual.com/) — respeta sus términos de uso al redistribuirla.
