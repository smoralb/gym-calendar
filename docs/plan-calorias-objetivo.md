# Plan: calorías objetivo e ingeridas

Estado: **pendiente**. Escrito el 2026-08-24, sin implementar.

## Qué se quiere

Cerrar el círculo de las calorías: la app ya estima lo **quemado** (ver
`caloriasDeSesion()` en `app.js`), y falta lo **ingerido** y el **objetivo**,
para poder enseñar un balance.

## Lo que se descartó, y por qué

### MyFitnessPal: imposible

Su API es privada, sólo para partners aprobados, y **no aceptan solicitudes**.
En 2019 cerraron la API pública sin avisar. No hay forma de importar el diario
ni de exportar lo quemado.

Las vías indirectas tampoco valen desde una PWA: Apple Health y Health Connect
no tienen API web, hacen falta apps nativas.

### Open Food Facts: no resuelve esto

Es un **catálogo de productos**, no un diario. Dado un código de barras dice qué
lleva ese producto por 100 g. No tiene cuentas, no sabe qué has comido, y no
sabe cuál es tu objetivo.

Para que diera un total diario habría que construir el diario encima —escanear,
elegir ración, sumar—, que es justo lo que no se quiere: un diario de comida es
una app entera, MyFitnessPal lleva quince años puliéndolo, y una versión casera
sería peor.

## Lo que sí se hace

### 1. Calorías objetivo — calculadas, sin API

Mifflin-St Jeor para el gasto basal, por factor de actividad para el
mantenimiento:

```
Hombre:  TMB = 10·peso(kg) + 6,25·altura(cm) − 5·edad + 5
Mujer:   TMB = 10·peso(kg) + 6,25·altura(cm) − 5·edad − 161
```

Factor de actividad derivado de los días de entreno que ya conoce la app
(`getTrainingDays()`), no de otra pregunta:

| Días/semana | Factor |
| --- | --- |
| 0–1 | 1,2 |
| 2–3 | 1,375 |
| 4–5 | 1,55 |
| 6–7 | 1,725 |

Ajuste según el objetivo del asistente (`answers.goal`), **moderado a
propósito**: nada de déficits agresivos, que eso es terreno de un profesional.

| Objetivo | Ajuste |
| --- | --- |
| `perder_peso` | −15% |
| `hipertrofia` | +10% |
| resto | mantenimiento |

**Hace falta añadir al perfil: altura, edad y sexo.** El peso ya está
(`gym_body_weight`, global desde la v4.31.1). Van en el mismo sitio, en
`ajustesPersonalesHtml()`.

Si falta alguno de los tres, no se enseña objetivo: igual que con el peso y las
calorías quemadas, un número inventado es peor que ninguno.

### 2. Calorías ingeridas — campo manual

Un número al día, el total que se lee en MyFitnessPal. Se guarda por fecha:

```js
gym_intake = { "2026-08-24": 2100, ... }
```

Global como el peso, no por plan.

### 3. El balance

Que es lo que de verdad se quería:

```
Objetivo    2 400
Ingeridas   2 100
Quemadas     ~252
──────────────────
Balance      −552
```

Con el aviso de que **todo son estimaciones**: la fórmula tiene margen real de
error, y las calorías quemadas en fuerza se mueven fácil un 30%.

## Opcional, para más adelante: entrada automática

MyFitnessPal **sí escribe «Dietary Energy» en Apple Health**. Un Atajo de iOS
puede leer ese dato y mandarlo a un endpoint:

```
MFP → Apple Health → Atajo (diario) → Worker → app
```

Requiere: endpoint en el Worker, una clave de sincronización por dispositivo
(no hay cuentas), y que el usuario configure el Atajo una vez. **Sólo iPhone**;
en Android sería Health Connect con Tasker, bastante más frágil.

No entra en la primera versión: es bastante maquinaria para ahorrar teclear un
número al día. El campo manual y la pantalla de balance sirven igual con o sin
esto, así que no se tira nada al hacerlo después.

## Verificación

1. Sin altura/edad/sexo: no se enseña objetivo, y hay una vía clara para
   añadirlos.
2. Con los datos puestos: contrastar el resultado a mano con la fórmula.
3. Cambiar los días de entreno debe mover el objetivo (cambia el factor).
4. El balance cuadra con lo que enseñan las tres cifras por separado.
5. `gymSelfTest()` sigue en 388.800 con 0 fallos.
