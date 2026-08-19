# Diseño: replantear el sistema de entrenamientos de Gym Calendar

> Documento vivo. Recoge el diagnóstico del sistema de entrenamientos y la
> arquitectura acordada para dejarlo en condiciones de publicarse.

## Context

El proyecto aspira a publicarse para que lo use cualquiera. Hoy no está listo, y
el síntoma que lo destapó es concreto: pidiendo un plan **en casa y sin
material**, el generador propone mancuernas e incluso máquinas de gimnasio.

Eso no es un descuido puntual. El material se modela como una *preferencia que
se maximiza* en lugar de una *restricción que se respeta*, y alrededor de esa
decisión hay otros tres huecos (clasificación, volumen, tiempo) que juntos hacen
que un plan generado no se pueda garantizar ante un desconocido.

Decisiones ya tomadas con el usuario:

1. **Núcleo curado + resto consultable.** Se revisará a mano un conjunto de
   ~140 ejercicios del que tirará el generador; los ~1300 del catálogo siguen
   disponibles para buscar y para el botón «Buscar alternativa».
2. **Esta ronda es sólo el diagnóstico escrito.**
3. Las preguntas nuevas del asistente las decido yo (justificadas en §6).

---

## 1. Diagnóstico del fallo de material

Tres causas encadenadas, todas en `app.js`:

### 1.1 Al marcar varios sitios gana el más permisivo

```js
var PLACE_RANK = { sin_material: 0, casa: 1, gimnasio: 2 };
function effectivePlace(answers) { /* devuelve el rank MÁS ALTO */ }
```

El paso «¿dónde entrenas?» es multi-selección. Marcar «en casa» + «sin material»
resuelve a `casa`, que admite mancuernas, kettlebell y fitball. Peor: marcar
`gimnasio` junto a cualquier otra resuelve a `gimnasio`, y entonces en
`candidatesFor()` **no se aplica ningún filtro de sitio**:

```js
if (place === 'sin_material' && !t.sin_material) return;
if (place === 'casa' && !t.casa) return;
// place === 'gimnasio' → ninguna de las dos → pasa todo, máquinas incluidas
```

### 1.2 Sin material declarado no se filtra nada

```js
function allowedEquipment(answers) {
  var gear = answerList(answers, 'gear');
  if (!gear.length) return null;   // null = sin restricción
  ...
}
```

Lista vacía debería significar **sólo peso corporal**, y significa **todo vale**.

### 1.3 La pregunta del material no siempre aparece

```js
when: function (answers) {
  var places = answerList(answers, 'place');
  return places.indexOf('casa') !== -1 && places.indexOf('gimnasio') === -1;
}
```

Hay caminos completos por los que el usuario nunca declara qué tiene.

### 1.4 Fuga adicional: el bloque preventivo

El bloque de `RUNNING_RECOVERY` que se añade con la respuesta «¿corres?» se
inyecta **sin pasar por ningún filtro de material**, y esa colección incluye
foam roller, kettlebell y fitball.

---

## 2. Los otros tres huecos de fondo

### 2.1 La clasificación se adivina con expresiones regulares

`EXERCISE_TAGS.tagsFor()` deriva patrón, nivel y objetivo del **nombre en
inglés**:

```js
var COMPOUND_RE = /\b(squat|deadlift|press|row|pull-up|dip|lunge|...)\b/;
if (HARD_RE.test(name) || ...) level = 'avanzado';
```

Para uso propio pasa. Publicado, no: un ejercicio mal etiquetado como
«principiante» es un problema de seguridad, no de estética. El patrón sí sale de
una tabla fiable (`TARGET_PATTERN`, por músculo objetivo del dataset), pero el
**nivel** y lo de compuesto/aislamiento son heurísticas sobre texto.

### 2.2 No hay modelo de volumen ni de equilibrio

`SPLITS` reparte patrones por sesión y `exerciseCountFor()` decide cuántos
ejercicios entran (4-6). Nada comprueba **cuántas series semanales recibe cada
grupo muscular**. Un día de «empuje» con dos huecos puede llenarse con dos
ejercicios de pecho y dejar el hombro sin entrenar en toda la semana.

### 2.3 No hay modelo de tiempo

Las sesiones se construyen contando ejercicios, no minutos. Por eso el requisito
de «30 minutos» hubo que resolverlo a mano con superseries en el plan combinado,
en vez de salir del generador.

### 2.4 Y no hay validación

El plan generado se muestra tal cual salga. Un validador habría cazado solo el
fallo de las mancuernas la primera vez que ocurrió.

---

## 3. Arquitectura propuesta

### 3.1 Un único inventario de material (la pieza central)

Sustituir `place` + `gear` por **un solo inventario** de material disponible:

- «¿Dónde entrenas?» pasa a ser un **preajuste** que rellena el inventario
  (gimnasio = todo; casa = eliges; sin material = sólo peso corporal), no un
  filtro paralelo.
- El inventario **siempre se pregunta** y siempre se puede corregir.
- Semántica: **restricción dura**. Un ejercicio es elegible si y sólo si
  `material_del_ejercicio ⊆ inventario_del_usuario`.
- **Inventario vacío = sólo peso corporal**, nunca «todo vale».
- Un único punto de verdad: `puedeHacer(ejercicio, perfil)`, usado por el
  generador, por el bloque preventivo y por el buscador de alternativas. Hoy
  cada uno filtra a su manera y por eso se escapan cosas.

### 3.2 Núcleo curado de ejercicios

Un conjunto revisado a mano (~140) con metadatos explícitos en lugar de
adivinados:

```
{ id, nombre, patron, musculo_principal, musculos_secundarios[],
  material[],                       // exacto, no inferido
  nivel,                            // verificado
  unilateral, por_tiempo,
  progresion: { mas_facil: id, mas_dificil: id },
  contraindicado_en: ['rodilla','hombro','espalda_baja'],
  dbId }                            // para la animación del catálogo
```

Dos cosas que esto desbloquea y que hoy no se pueden hacer bien:

- **`progresion`** da escalado real de dificultad. El «no soy capaz» del buscador
  de alternativas pasa de puntuar por heurística a seguir una cadena definida.
- **`contraindicado_en`** permite excluir por molestias sin inventar nada.

El catálogo completo se queda para la pestaña Ejercicios y para «Buscar
alternativa», que es donde la variedad suma y el riesgo es bajo porque la
elección la haces tú viendo la ficha.

### 3.3 Modelo de volumen y equilibrio

- Series semanales objetivo por grupo muscular según experiencia.
- El generador reparte **series**, no sólo ejercicios.
- Invariantes: ningún grupo mayor por debajo del mínimo, y relación
  empuje/tirón dentro de un margen.

### 3.4 Presupuesto de tiempo

Estimar la duración de la sesión (`series × (trabajo + descanso)`) y **construir
para los minutos declarados**. Si no cabe, en este orden: acortar descansos,
emparejar en superseries (el campo `ss` y su render ya existen), y como último
recurso quitar el accesorio de menor prioridad.

### 3.5 Validador de planes (la red de seguridad)

Se ejecuta **antes** de mostrar o guardar cualquier plan. Comprueba:

| Invariante | Qué evita |
|---|---|
| Material de cada ejercicio ⊆ inventario | El fallo que originó todo esto |
| Ningún ejercicio contraindicado | Que se recete algo sobre una molestia declarada |
| Cada grupo mayor ≥ series mínimas | Que un músculo se quede sin entrenar |
| Equilibrio empuje/tirón en rango | Descompensaciones |
| Duración estimada ≤ tiempo declarado | Sesiones que no caben |
| Sin nombres visibles repetidos en una sesión | Que parezca el mismo ejercicio dos veces |
| Todo ejercicio resuelve a una ficha real | Fichas rotas sin animación |

Ante un fallo: **intentar reparar** sustituyendo por un elegible, revalidar, y si
sigue fallando **avisar en vez de enseñar un plan malo**.

Y lo más valioso para publicar: correr el validador sobre una **matriz de
combinaciones de respuestas** (sitios × material × días × objetivos × nivel).
Es la prueba automatizada que este proyecto no tiene, y convierte «creo que
funciona» en «lo he comprobado».

---

## 4. Lo que hace falta para publicar, más allá del entrenamiento

Conviene tenerlo en el radar desde ya:

- **Aviso legal**: la app receta ejercicio físico. Debe dejar claro que no es
  consejo médico y recomendar consultar ante lesiones. Las molestias se manejan
  **excluyendo movimientos**, nunca dando indicaciones de tratamiento.
- **Los perfiles son personales.** `Sergio`, `Eva` y `Gely` están escritos a
  fuego en el código. Para publicar hay que reducirlo a «tu plan».
- **Portabilidad de datos.** Todo vive en `localStorage`. Sin exportar/importar,
  cambiar de móvil o limpiar el navegador borra el historial entero.
- **Idioma.** Hoy es sólo español y los nombres del catálogo están traducidos a
  medias (`labelName` deja fuera bastantes, como se vio con «Quads»).
- **Licencia y atribución** del dataset de ejercicios y sus animaciones.

---

## 5. Orden de construcción propuesto

Cada paso deja la app mejor que el anterior y no depende de los siguientes:

1. **Motor de restricciones.** Inventario único, restricción dura, un solo
   `puedeHacer()` compartido, y el bloque preventivo pasando por él. *Es lo que
   hace que la app deje de mentir; lo demás es mejora.*
2. **Validador + matriz de combinaciones.** Convierte el paso 1 en algo
   demostrable y evita reincidir.
3. **Núcleo curado.** Con el motor y el validador ya puestos, sustituir la
   fuente del generador es un cambio contenido.
4. **Volumen, equilibrio y tiempo.**
5. **Preguntas nuevas del asistente** (§6), que se apoyan en todo lo anterior.
6. **Preparación para publicar** (§4).

---

## 6. Preguntas del asistente: qué añadir y por qué

El asistente tiene hoy 6 pasos. Añadir cuatro más lo haría cansino, así que la
propuesta es **añadir tres, transformar uno y condicionar el resto**:

| Paso | Cambio | Motivo |
|---|---|---|
| **Minutos por sesión** | Nuevo | Es lo que determina cuántos ejercicios caben de verdad. Sin esto no hay presupuesto de tiempo (§3.4), y ya se pidió a mano |
| **Zonas que molestan** | Nuevo, opcional | Lo más delicado de cara a publicar. Rodilla, hombro, espalda baja, muñeca. Alimenta `contraindicado_en` |
| **Inventario de material** | Se muestra **siempre** | Hoy se salta en varios caminos y es la causa directa del fallo (§1.3). Incluye el rango de peso de las mancuernas: «tengo mancuernas» no dice si son de 4 o de 30 kg, y eso cambia qué ejercicios tienen sentido como carga principal |
| **Nivel** | Se transforma en **experiencia real** | «¿Cuánto llevas entrenando seguido?» predice mucho mejor que «¿cuál es tu nivel?», donde casi todo el mundo se sobreestima o se infravalora |

Descartado por ahora: edad y peso corporal. Añaden fricción y con el modelo
propuesto no cambian ninguna decisión del generador.

---

## 7. Cómo sabremos que funciona

Cuando se implemente, la verificación no será «mirarlo por encima»:

1. **Matriz de combinaciones** (§3.5) pasando el validador entera. El caso que
   originó esto — *sin material, en casa* — debe producir planes de sólo peso
   corporal, y hay que comprobarlo también con «casa + sin material» y con
   «gimnasio + casa» marcados a la vez, que son los que hoy fallan.
2. **Recorrido en navegador** de las cuatro pestañas con cada perfil, que es lo
   que faltó cuando se coló el fallo de Stats.
3. **Duración estimada vs declarada** en una muestra de planes generados.

---

## Ficheros que tocará (cuando se implemente)

Todo vive en `app.js` (~5900 líneas, ES5, sin build). Las zonas afectadas:

| Zona | Papel |
|---|---|
| `effectivePlace`, `allowedEquipment`, `candidatesFor` | Motor de restricciones (§3.1) |
| `EXERCISE_TAGS.tagsFor` | Clasificación; se reduce cuando entre el núcleo curado |
| `generateRoutine`, `SPLITS`, `exerciseCountFor`, `GOAL_SCHEME` | Volumen, equilibrio y tiempo |
| `WIZARD_STEPS`, `renderWizard` | Preguntas nuevas (§6) |
| `RUNNING_RECOVERY` + `preventiveExercise` | Fuga de material (§1.4) |
| `findAlternativeCandidates` | Pasaría a usar `progresion` en vez de heurística |
| Nuevo | Núcleo curado, validador y matriz de pruebas |
