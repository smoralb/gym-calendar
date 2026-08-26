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
- 🗓️ **Mapa de calor** de los últimos 6 meses: una casilla por día, más intensa
  cuantos más ejercicios hiciste
- ⚖️ **Peso corporal con gráfica**: cada vez que lo actualizas queda un apunte
  y se ve la curva
- ☁️ **Copia automática**: los datos se guardan solos fuera del móvil cada vez
  que entrenas. Sin cuentas ni botones
- 💾 Y una copia manual a `.json`, para quien prefiera su propio fichero
- 🔆 La pantalla no se apaga mientras entrenas
- 🔍 Catálogo de 1.324 ejercicios con animaciones e instrucciones en español
- 🏷️ Ejercicios categorizados por tags (material, patrón, objetivo y nivel) con filtros combinables
- 🏃 Plan de vuelta a correr de 12 semanas, combinable con los días de fuerza
- 🏃 Colección "Recuperación running": 29 ejercicios preventivos para corredores
- 📱 PWA instalable en móvil (funciona offline)
- 🧠 **Coach IA opcional** — chat que conoce tu plan y tus pesos, y ajuste de la
  rutina en lenguaje natural (requiere desplegar el Worker, ver más abajo)
- 🔔 **Recordatorios** los días que toca entrenar, a la hora que elijas
  (en iPhone hace falta añadir la app a la pantalla de inicio)
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

### ☁️ Copia automática

Todo vive en el `localStorage` de un solo navegador, así que borrar los datos
del sitio o cambiar de móvil se lo lleva todo. Guardar más veces no arregla
nada: el problema no es *cuándo* se guarda, es *dónde*. Así que la copia sale
del dispositivo sola.

Sin cuentas ni contraseñas: el cliente se genera un código de 24 caracteres la
primera vez que arranca y lo usa como identidad. **Nadie teclea nada nunca**,
salvo para recuperar los datos en un móvil nuevo — ahí sí hace falta el código,
y por eso se enseña en Perfil → Ajustes.

Cuándo sube: 4 segundos después de cualquier cambio (se agrupan: marcar cinco
ejercicios seguidos es una subida, no cinco), inmediatamente al terminar un
entreno, y al mandar la app a segundo plano. Cuándo baja: al abrir, si el
servidor va por delante.

Quién gana cuando hay dos versiones: **la más reciente, comparando el sello de
tiempo del cliente**. No hay mezcla campo a campo. Para los datos de una sola
persona es suficiente, y es lo que mantiene esto en unas pocas líneas en vez de
en un motor de fusión.

Dos salvaguardas, y ninguna sobra:

- **Nada cuenta como cambio hasta haber hablado con el servidor.** Al arrancar,
  la app se escribe a sí misma (migraciones, planes de fábrica). Si eso contara
  como cambio del usuario, un móvil recién borrado se pondría el sello de
  ahora, se creería el más reciente y subiría su vacío encima de la copia
  buena. Pasó en las pruebas: 890 bytes vacíos machacando 41 KB de historial.
- **Un dispositivo sin nada que perder no gana un desempate**, diga lo que diga
  su reloj (`hayDatosDeVerdad()`).

El servidor no entiende el contenido: guarda el JSON tal cual y el sello de
tiempo. Es una caja fuerte, no un modelo de datos, así que cualquier clave
nueva de la app viaja sin tocar nada del Worker. Detalles de las rutas y de los
topes en [`worker/README.md`](worker/README.md).

Ojo con lo que esto implica: **los datos dejan de estar sólo en el móvil de
cada uno y pasan a la cuenta de Cloudflare de quien despliega el Worker.**

### 💾 Copia manual

Sigue estando, y no depende de nada: ni servidor, ni código, ni red. Desde
**Perfil → Ajustes** se exporta un `.json` y se vuelve a importar. Es la vía de
escape cuando el Worker no responde, que es justo cuando más falta hace.

El fichero es `{ app, formato, version, fecha, datos }`, donde `datos` son las
claves `gym*` **tal cual están en `localStorage`**, sin parsear ni volver a
serializar: cualquier clave nueva entra en la copia sola y nada se deforma por
el camino. Quedan fuera las que son de ese navegador y de ese momento
(`gym_feedback_queue`, `gym_update_recargando`, `gym_push_preguntado`):
restaurarlas reenviaría reportes ya enviados o dejaría la app creyéndose a
medio actualizar.

Al importar se borran las claves actuales y se recarga la página, porque el
plan activo, las fases y el estado se leen al arrancar y hay demasiado
derivado como para rehacerlo en caliente. El import filtra por prefijo aunque
el fichero sea nuestro: una copia editada a mano no debe poder escribir claves
ajenas.

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
Ejercicios). Ojo: **ya no se usan ni para generar la rutina ni para proponer
alternativas** — las dos cosas salen del núcleo curado, ver las secciones
siguientes.

### 🔍 Buscador de alternativas

Las alternativas salen de **`CORE_EXERCISES`**, igual que la rutina, y pasan por
el mismo `coreAvailable()`: material declarado, nivel declarado y zonas a
evitar. Se ordenan por grupo muscular y por el motivo del cambio (no tengo
material, es muy difícil, me duele, quiero variar), y se barajan los empates
para que no salga siempre lo mismo en el mismo orden.

Antes tiraban del catálogo completo y de `EXERCISE_TAGS`, y de ahí salían las
tres quejas clásicas: mismo orden para cualquier músculo (sin mapeo al catálogo
la puntuación se anulaba y ordenaba por longitud del nombre), material que el
usuario había dicho que no tenía (el filtro sólo se aplicaba con plan del
asistente, y el campo `eq` del dataset a veces miente) y ejercicios avanzados en
planes de principiante (el nivel se comparaba con el del ejercicio sustituido,
adivinado por regex, y en dos motivos ni se miraba).

El catálogo completo sigue estando, pero **sólo si se pide** al agotar el
núcleo, y avisando de que allí el material y el nivel no están verificados.
También se excluyen los ejercicios que ya están en la sesión de ese día.

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

### 🧠 Coach IA (opcional)

Un chat que conoce tu plan, tus series de la semana y tus últimos pesos, y un
«Ajustar mi rutina» que traduce texto libre («me molesta el hombro», «esta
semana sólo tengo 30 minutos») a cambios sobre el plan.

**El modelo no genera rutinas.** Sólo devuelve unas pocas claves de
configuración; el plan lo sigue construyendo `generateValidRoutine()` y lo sigue
comprobando `validatePlan()`. Ningún cambio se guarda sin que veas antes el plan
resultante y lo aceptes.

El Worker ya está desplegado en `https://gym-calendar-ai.smoralber.workers.dev`
y `AI_ENDPOINT` (en `app.js`) apunta ahí. Hace falta porque Workers AI se
autentica con credenciales de cuenta y esto es un sitio estático: cualquier
clave en `app.js` sería pública. Detalles, modelo y coste en
[`worker/README.md`](worker/README.md).

Con `AI_ENDPOINT` vacío el botón flotante 🧠 no aparece y la app es exactamente
la de siempre. Lo mismo si el Worker no responde, no hay red o se agota la cuota
diaria gratuita: el coach avisa y todo lo demás sigue funcionando offline.

Media © [Gym visual](https://gymvisual.com/) — respeta sus términos de uso al redistribuirla.
