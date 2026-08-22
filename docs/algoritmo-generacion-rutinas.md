# Algoritmo de generación de rutinas

Cómo se construye un programa a partir de las respuestas del asistente.
Documenta el comportamiento **actual** de `app.js` (v4.22.0).

---

## 1. Idea central: un núcleo curado, no el catálogo entero

El dataset público tiene ~1.300 ejercicios. **El generador no lo usa.**
Elige siempre de `CORE_EXERCISES`, una lista curada a mano de **79 ejercicios**.

El catálogo completo se reserva para la pestaña *Ejercicios* y para «Buscar
alternativa», donde elige la persona viendo la ficha y el riesgo es bajo.

El motivo está escrito en el propio código: los datos de origen no bastan. El
nivel se adivinaba con expresiones regulares sobre el nombre en inglés, y el
campo de material del dataset a veces miente — *"Inverse leg curl (on pull-up
cable machine)"* viene etiquetado como peso corporal. Con eso, a un
principiante sin material se le llegó a recetar *"Flag"* y *"Ring dips"*.

### Ficha del núcleo

```js
{ id: 'press_banca_mc',        // id estable, clave de swaps y progreso
  db: '0289',                  // id en el dataset (animación e instrucciones)
  nombre: 'Press de pecho con mancuernas',
  patron: 'empuje',            // empuje | tiron | pierna | core
  grupo: 'pecho',              // grupo muscular canónico — el eje del reparto
  mat: ['dumbbell'],           // material necesario ([] = peso corporal)
  nivel: 'principiante',       // principiante | intermedio | avanzado
  evitar: ['hombro'],          // zonas que este ejercicio suele cargar
  tiempo: true,                // opcional: se mide en segundos, no en reps
  facil: '…', dificil: '…' }   // cadena de progresión (§6)
```

---

## 2. El eje: series semanales por músculo

Este es el cambio conceptual que sostiene todo lo demás. El generador **no
rellena N huecos**: intenta **cubrir un objetivo de series por grupo y semana**.

Antes se rellenaban huecos y el volumen salía de rebote. Medido sobre el
generador anterior (gimnasio completo, 3 días, 60 min, intermedio):

| Grupo | Antes | Ahora | Referencia hipertrofia |
|---|---|---|---|
| Pecho | 3 | **12** | 10-20 |
| Espalda | 3 | **12** | 10-20 |
| Cuádriceps | **0** | **9** | 10-20 |
| Core | 9 (el más entrenado) | 6 | 6-9 |
| Ejercicios a 60 min | 4 | 8 | |

`VOLUME_TARGETS` define las series objetivo por grupo, según objetivo y nivel.
Los grupos grandes (`BIG_GROUPS`: pecho, espalda, cuádriceps, isquios, glúteo)
piden más volumen que los pequeños.

El **core es un grupo pequeño más**, con su propio techo. Dejó de añadirse
automáticamente al final de cada sesión, que es lo que lo convertía en el
músculo más entrenado del programa.

---

## 3. El flujo

```
respuestas del asistente
        │
        ▼
  getInventory()          material declarado → set de `eq` permitidos
        │
        ▼
  coreAvailable()         FILTRO DURO: material + nivel + lesiones
        │
        ▼
  byGroup                 agrupar por grupo muscular y ORDENAR
        │
        ▼
  resolveSplit()          programa elegido (o el recomendado)
        │
        ▼
  por sesión:  a) cubrir grupos `required`
               b) rellenar por volumen mientras quepa en el tiempo
        │
        ▼
  bloque preventivo       sólo si corre; se SUMA, no sustituye
        │
        ▼
  3 fases                 más carga, y variantes más duras en peso corporal
        │
        ▼
  validatePlan()          invariantes; si falla, reintenta con otra semilla
```

---

## 4. Restricciones duras: `coreAvailable()`

Es **el único sitio** donde se decide qué puede recetarse. Un ejercicio entra
sólo si pasa las tres:

| Filtro | Regla |
|---|---|
| **Nivel** | se permite lo de nivel igual o inferior, nunca superior |
| **Material** | **todos** los `e.mat` deben estar en el inventario |
| **Lesiones** | se descarta si algún `e.evitar` está en las zonas a evitar |

**El inventario nunca es «sin restricción».** `getInventory()` arranca con
`body weight` y añade sólo lo marcado. Sin material declarado, la respuesta es
*sólo peso corporal*. Este era el fallo que metía mancuernas y máquinas a quien
entrenaba en casa sin nada.

**La barra de dominadas se asume sólo con material de gimnasio** (`_pullUpBar`
en `canPerform()`). Sin eso, nadie recibe dominadas por tener «peso corporal».

---

## 5. Programas y construcción de la sesión

### `SPLIT_CATALOG`

Siete programas con nombre, para 2 a 6 días:

| id | Nombre | Días | Frecuencia |
|---|---|---|---|
| `fullbody2` | Cuerpo completo | 2 | 2× |
| `fullbody3` | Cuerpo completo | 3 | 3× |
| `ppl` | Push · Pull · Legs | 3 | 1× |
| `upper_lower` | Torso · Pierna | 4 | 2× |
| `ppl_torso` | PPL + Torso | 4 | ~1,3× |
| `ppl_ul` | PPL + Torso/Pierna | 5 | ~1,6× |
| `ppl2` | Push · Pull · Legs ×2 | 6 | 2× |

Cada sesión declara **grupos musculares**, no patrones:

```js
{ day:'Pierna', required:['cuadriceps','isquios'], optional:['gluteo','gemelo','core'] }
```

Esto arregla de raíz dos fallos del diseño anterior:

- **`required` garantiza cobertura** → se acabaron los días de pierna sin nada
  de cuádriceps (los huecos genéricos «pierna» se iban a glúteo e isquios).
- **Los grupos por día impiden la contaminación cruzada** → el tríceps sólo
  existe en sesiones de empuje. Antes el hueco «brazos» caía a tríceps cuando
  el bíceps ya estaba usado, y acababa con más volumen que el pecho.

Si un grupo `required` **no tiene ningún ejercicio disponible** (quien evita la
rodilla se queda sin cuádriceps: todos la cargan), se sustituye por otro del
mismo patrón. Rodilla delicada no significa no entrenar pierna, significa
entrenar glúteo e isquios.

La **recomendación** (`recommendedSplit`) usa el campo `freq` declarado en el
catálogo: más frecuencia para hipertrofia y tono, menos sesiones y más carga
para fuerza. Se recomienda, no se impone: el paso `split` del asistente sólo
aparece cuando hay más de una opción para esos días.

### Presupuesto de tiempo

```
exerciseMinutes(series, restSec) = series × (40 + restSec) / 60   // 40s de trabajo
usableMinutes  = max(minutos − 6, 10)                             // calentamiento
maxExercises   = clamp(floor(usableMinutes / perExercise), 3, 9)
```

Se calcula con la **fase 1**. Como las fases 2 y 3 suben series y descansos,
las sesiones de los meses 2 y 3 duran algo más de lo declarado.

### Relleno

1. **Obligatorios** — un ejercicio por cada grupo `required`.
2. **Por volumen** — mientras quede tiempo, se añade al grupo de la sesión que
   más lejos esté de su objetivo semanal (`weeklySets` acumula toda la semana).
   El grupo de la zona prioritaria (`focus`) recibe +3 de prioridad.

Un ejercicio **nunca** se repite dentro de la misma sesión. Repetir entre días
sí se permite para los grupos obligatorios: es preferible a dejar el día sin
cubrir su grupo.

Esto es lo que hace que **el tiempo declarado importe**: 30 → 3 ejercicios,
45 → 6, 60 → 8. Antes 45, 60 y 90 minutos producían rutinas idénticas.

---

## 6. Fases, progresión y descarga

`PHASE_NAMES` define 3 bloques de 4 semanas con los mismos huecos y más carga,
según `GOAL_SCHEME[objetivo][fase]`. Con varios objetivos manda el primero.

**Progresión en peso corporal.** Quien entrena sin material no puede «subir el
peso», así que en las fases 2 y 3 se pasa a la variante más difícil de la
cadena `facil`/`dificil`:

```
fase 1  Flexiones de rodillas
fase 2  Flexiones
fase 3  Flexiones con pies elevados
```

Detalle que importa: el pool de progresión **no se filtra por el nivel actual**
del usuario —progresar a la variante dura *es* subir de nivel, y filtrando por
nivel un principiante nunca llegaría a «Flexiones», que son intermedio—. El
material y las lesiones sí se siguen respetando: son restricciones duras, no
cosas que se superen entrenando.

Los ejercicios con material no cambian: progresan añadiendo carga.

**Descarga.** `deloadWeeks: [4, 8, 12]` — la última semana de cada fase. La
pestaña Rutina muestra un aviso para bajar peso o quitar una serie. Sin
descarga, doce semanas seguidas subiendo carga acaban en estancamiento.

---

## 7. Bloques que se añaden aparte

**Prevención para corredores** (`running: 'si'`) — 2 ejercicios de
`RUNNING_RECOVERY` al final de las sesiones que trabajan tren inferior. Suma,
no sustituye. Se excluye lo que ya esté en la sesión comparando **por id del
dataset**, no sólo por nombre: el núcleo y el bloque preventivo son catálogos
distintos que a veces apuntan al mismo ejercicio.

**Plan de carrera combinado** (`runningPlan: 'si'`) — intercala 3 sesiones de
carrera, que se resuelven en tiempo de ejecución contra `RUNNING_PLAN` por
número de semana.

Son 3 sesiones **en días propios**, así que con 3 días de fuerza sale justo
(6 días + 1 de descanso). Con 4 o más serían 7 días sin descanso, que es lo
peor justo cuando vuelves de una lesión.

Antes eso se resolvía **no ofreciendo el plan** con 4+ días: quien pedía 4 días
y decía que corría no recibía plan de carrera **ni explicación de por qué**.

Ahora `compactionFor()` **reagrupa la fuerza en 3 días** con sesiones más
largas. Como el eje del generador es el volumen semanal, el total de series se
mantiene: sólo cambia el reparto. Lo que sí cambia es la duración de cada
sesión, y por eso se anuncia **antes de generar** (en el propio paso del
asistente) y se repite en el resumen.

Dos detalles del diseño:

- Al compactar se usa **Push · Pull · Legs**, no el programa de más frecuencia.
  Con cuerpo completo habría pierna en las tres sesiones y, sumado a los tres
  días de carrera, el tren inferior no descansaría nunca.
- El validador toma como techo de tiempo **el anunciado tras compactar**, no
  los minutos que se pidieron: alargar es intencionado y ya se avisó.

---

## 8. La capa explicativa

`planExplainerHtml(plan, progreso)` es **una sola pieza con dos entradas**: el
resumen del asistente y el modal *¿Por qué este entrenamiento?* de la pestaña
Rutina.

**La unidad es la semana, no la sesión.** Lo que determina el resultado son las
series semanales por músculo, así que todo se enmarca como *«llevas 8 de 13
series de pecho»*, y `weeklyVolumeProgress()` calcula lo hecho en la semana en
curso desde `state.completions`.

Si el tiempo declarado no da para el objetivo, **se dice claramente** en vez de
callarlo: es información accionable, no un fallo del plan.

El resumen del asistente **no lista ejercicios**: describe cada día por grupos
musculares. Enumerar nombres allí no ayudaba a decidir lo único que se decide
en esa pantalla —si aceptas el programa—, y el detalle bueno (animación, pasos,
alternativas) ya está en Rutina.

---

## 9. Red de seguridad

### `validatePlan(plan, answers)`

- **material** — nada fuera del inventario;
- **lesiones** — nada que cargue una zona a evitar;
- **duplicados** — ningún nombre repetido el mismo día;
- **cobertura** — los grupos `required` aparecen… *salvo si no hay ninguno
  disponible* (evitar rodilla ⇒ sin cuádriceps posible);
- **coherencia** — nada de otro patrón; se compara por patrón y no por grupo
  exacto, para admitir las sustituciones del §5;
- **tiempo** — ningún día pasa de lo declarado + 10 min;
- **equilibrio** — ningún patrón mayor a cero;
- **volumen** — desequilibrio entre grupos *de la misma prioridad*.

> **Lo que NO se valida: llegar al objetivo de volumen.** Quedarse corto casi
> nunca es un fallo del generador —con 3 días de 30 minutos es imposible meter
> 13 series por músculo—. Tratarlo como plan inválido hacía reintentar cinco
> veces algo irresoluble y marcaba como rotas combinaciones correctas. Se le
> cuenta al usuario y punto.

### `generateValidRoutine()`

Si el validador encuentra algo, reintenta hasta 5 veces con otra semilla y se
queda con el plan que menos problemas dé. Antes se mostraba el plan roto y la
persona quedaba bloqueada en «Usar esta rutina» sin salida.

### `gymSelfTest()`

Desde la consola. Recorre la matriz completa de respuestas —sitio, material,
días, objetivos, nivel, minutos, lesiones, `running`, `focus`, `runningPlan` y
`split`— y valida cada plan. **388.800 combinaciones, todas válidas.**

Los fallos que llegaron a producción se colaron porque su variable no estaba en
la matriz: **al añadir una pregunta al asistente, hay que añadirla aquí**.

---

## 10. Dónde vive cada cosa

| Pieza | Función / constante |
|---|---|
| Núcleo curado | `CORE_EXERCISES`, `CORE_BY_ID` |
| Prioridad | `CORE_PRIMARY`, `CORE_ACCESSORY` → `e.prio` |
| Material | `GEAR_OPTIONS`, `getInventory()`, `canPerform()` |
| Filtro duro | `coreAvailable()` |
| Programas | `SPLIT_CATALOG`, `resolveSplit()`, `recommendedSplit()` |
| Volumen | `VOLUME_TARGETS`, `BIG_GROUPS`, `volumeTargetFor()` |
| Series y reps | `GOAL_SCHEME`, `PHASE_NAMES` |
| Tiempo | `exerciseMinutes()` |
| Algoritmo | `generateRoutine()` |
| Reintento | `generateValidRoutine()` |
| Validación | `validatePlan()` |
| Explicación | `planExplainerHtml()`, `weeklyVolumeProgress()` |
| Pruebas | `gymSelfTest()` |
