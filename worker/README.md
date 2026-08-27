# Proxy de IA (Cloudflare Worker)

El asistente de Gym Calendar necesita esta pieza. No es opcional y no es
decorativa: Workers AI se autentica con credenciales de cuenta, y la app es un
sitio estático en GitHub Pages donde cualquier cosa que vaya en `app.js` la lee
quien abra DevTools. El Worker guarda esa credencial del lado servidor.

Una dependencia (`@mmmike/web-push`, para el cifrado de las notificaciones).
`wrangler` la empaqueta al desplegar; en una máquina nueva, `npm install`.

## Desplegar

```powershell
cd worker
npx wrangler login     # una vez, abre el navegador
npx wrangler deploy
```

`wrangler deploy` imprime la URL del Worker. La desplegada es
**https://gym-calendar-ai.smoralber.workers.dev**, y es la que está puesta en
`AI_ENDPOINT` (en `app.js`).

Dos cosas que muerden al desplegar:

- **Tras cada `deploy`, Cloudflare tarda un par de minutos en repartir la
  versión nueva.** Mientras tanto las peticiones alternan entre la vieja y la
  nueva. Si pruebas un cambio justo después de desplegar y el resultado no
  cuadra, espera y repite antes de tocar nada.
- **`wrangler tail` puede no conectar** según la red desde la que trabajes. Si
  necesitas depurar y no tienes logs, lo práctico es devolver el detalle del
  error en la respuesta temporalmente.

No hace falta configurar ninguna clave ni secreto: el binding `[ai]` de
`wrangler.toml` se resuelve solo con la cuenta con la que hiciste login.

## Ver qué pasa

```powershell
npx wrangler tail
```

Registra las peticiones en vivo. El Worker no loguea el contenido de las
conversaciones a propósito.

## Rutas

| Ruta | Qué hace | Respuesta |
| --- | --- | --- |
| `POST /chat` | Coach conversacional con el contexto del plan | Stream SSE |
| `POST /adjust` | Texto libre → cambios sobre las respuestas del asistente | JSON |
| `POST /push/subscribe` | Alta o actualización del recordatorio | JSON |
| `POST /push/unsubscribe` | Baja | JSON |
| `POST /push/done` | «Ya he entrenado hoy», para callar el segundo aviso | JSON |

Este Worker ya no es sólo un proxy de IA: también **envía** las notificaciones
de entrenamiento desde un Cron Trigger. Ver más abajo.

Cuerpo en las dos: `{ "messages": [{role, content}], "context": "<texto>" }`.

`/adjust` **no genera rutinas**. Devuelve como mucho un puñado de claves de
configuración, y es el cliente quien las pasa por `generateValidRoutine()` y
`validatePlan()`. Esa separación es deliberada: el generador determinista sigue
siendo la única fuente de verdad, y así el modelo no puede recetar un ejercicio
imposible para el material o las molestias del usuario.

## El modelo

`MODEL` en `index.js`: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`.

**Cloudflare retira modelos.** Llama 3.1 8B, que era el candidato obvio, se
deprecó el 30 de mayo de 2026 y devuelve error `5028` — no un aviso, un fallo
duro. Si un día todo empieza a responder `503`, mira el catálogo antes que nada.

Si hiciera falta abaratar, `@cf/meta/llama-3.2-3b-instruct` también devuelve el
JSON de `/adjust` correctamente, aunque escribe bastante peor.

Ojo con la forma de la respuesta si cambias de modelo: Workers AI devuelve hoy
formato tipo OpenAI (`choices[0].message.content`), y el campo `response` llega
como **objeto ya parseado**, no como texto. De ahí `extractText()`. En streaming
el texto va en `choices[0].delta.content` y `response` viene vacío — el cliente
(`aiChat` en `app.js`) lee eso.

## Límites

- **CORS por lista blanca** (`ALLOWED_ORIGINS` en `index.js`): sólo
  `smoralb.github.io` y `localhost:8000`. Si publicas en otro dominio, hay que
  añadirlo ahí y volver a desplegar.
- **Rate limiting**: 12 peticiones por minuto e IP (`wrangler.toml`). El
  endpoint es público, así que sin esto una sola persona agota la cuota diaria
  en una tarde.
- **Tamaño**: contexto de 8 KB, 20 mensajes, 2000 caracteres por mensaje.

## Coste y presupuesto diario

Plan gratuito: **10.000 neurons/día**, que se reinician a las **00:00 UTC**. En
plan free, al agotarlos las peticiones simplemente fallan.

Medido en este Worker:

| Petición | Coste |
| --- | --- |
| `/chat` con contexto completo | **~98 neurons** |
| `/adjust` | **~12 neurons** |

O sea que la cuota da para **unas 100 conversaciones al día**, no para miles.
Conviene tener presente esa cifra antes de cambiar de modelo o de subir
`max_tokens`.

Por eso el Worker lleva su propia contabilidad, en `Contador` (un Durable
Object con SQLite):

- **`TOPE_IP`** — 1.200 neurons por IP y día (~12 chats). Impide que una persona
  se coma la cuota de las demás.
- **`PRESUPUESTO_GLOBAL`** — 8.500 neurons, el 85% de la cuota. El coach se
  apaga solo antes de que lo apague Cloudflare, así el usuario recibe «vuelve
  mañana» y no un error genérico.

Se cuentan neurons estimados (`COSTE`), no peticiones, porque un chat cuesta
ocho veces más que un ajuste. El gasto se apunta *antes* de llamar al modelo:
más vale quedarse corto que descubrir el exceso cuando ya no hay remedio. Se
guarda un **hash** de la IP, nunca la IP.

Si el contador falla, se deja pasar la petición: una avería de la contabilidad
no debe tumbar el coach.

El límite de 12/minuto del `wrangler.toml` sigue ahí, pero sólo frena ráfagas.
No protege la cuota: 12/min son 17.280 peticiones al día desde una sola IP.

## Notificaciones push

El recordatorio de entrenamiento lo manda **este Worker**, desde un Cron
Trigger horario. No hay alternativa: una web no puede programarse una
notificación local a futuro (la API que lo permitía nunca llegó a lanzarse),
así que el aviso tiene que venir de fuera.

### Claves

- **Pública** (`VAPID_PUBLIC` aquí, `PUSH_PUBLIC_KEY` en `app.js`): va en el
  cliente, que es su sitio.
- **Privada**: secreto, nunca en el repo.

```powershell
npx wrangler secret put VAPID_PRIVATE_KEY
```

`vapidKeys()` hace `.trim()` del secreto a propósito. Al instalarlo por
tubería es facilísimo colar un salto de línea al final, y entonces la clave EC
deja de valer con un error opaco —«missing or invalid private key component
(d)»— que sólo se manifiesta como que no llega ninguna notificación. Pasó.

### El esquema de cifrado importa

Se usa `@mmmike/web-push` porque emite **`aes128gcm`** (RFC 8291). Varias
librerías populares para edge siguen emitiendo el `aesgcm` antiguo, y el
endpoint de Apple responde `403` a eso: no funcionaría en ningún iPhone, que
es donde más se usa esta app. Si algún día se cambia de librería, esto es lo
primero que hay que comprobar.

### Cómo decide a quién avisar

`Suscripciones` (Durable Object) guarda por endpoint: los días de entreno, el
nombre de la sesión de cada día, la hora local preferida y el desfase horario.
Nada identificativo: ni nombre, ni correo, ni pesos, ni progreso.

El cron corre cada hora en UTC y, para cada suscripción, calcula **su** hora
local: los usuarios están en zonas distintas, así que un cron a una hora fija
no serviría.

- Primer aviso a la hora elegida.
- Segundo aviso `HORAS_SEGUNDO_AVISO` después, y **sólo** si no consta que haya
  entrenado — el cliente lo reporta con `/push/done` al terminar la sesión.
- Dos al día como máximo. Insistir más es la vía rápida a que alguien
  desactive las notificaciones o desinstale.

Las suscripciones que el servicio push da por muertas (404/410) se borran
solas: no se recuperan nunca y reintentarlas gasta subrequests en cada tick.

`MAX_ENVIOS_POR_TICK` está en 40 porque el plan free permite **50 subrequests
por invocación** y cada notificación es una. Con más gente habría que trocear
los envíos.

### iOS

En iPhone las notificaciones **sólo funcionan si la app está añadida a la
pantalla de inicio**. En una pestaña de Safari no existe siquiera
`PushManager`, y no hay forma de arreglarlo desde el código. Por eso el ajuste
sólo se pinta cuando `pushSoportado()` es cierto.

## Turnstile

El CORS **no** protege nada: la cabecera `Origin` la pone el cliente, así que
`curl` se la salta; sólo evita que otra web empotre el endpoint en un navegador.
Lo que separa «un navegador real» de «un script en bucle» es Turnstile.

- **Site key** (pública): en `AI_SITEKEY`, dentro de `app.js`.
- **Secret key** (credencial): **nunca en el repo**. Se instala con

```powershell
npx wrangler secret put TURNSTILE_SECRET
```

Se valida en `/chat` y `/adjust` **antes** del presupuesto, para que una
petición que no supera la verificación no descuente cuota de nadie.

Dos comportamientos deliberados:

- **Sin `TURNSTILE_SECRET`, el Worker no exige token.** Permite desplegar el
  código y activar la protección después, sin coordinar las dos cosas. El día
  que se ponga el secreto, la protección entra sola.
- **Si `siteverify` falla, se rechaza.** Si un fallo de red abriera la puerta,
  bastaría con provocarlo para saltarse la protección entera.

En el cliente el script se carga sólo al abrir el coach, y se pide **un token
por petición** porque son de un solo uso. Ojo con `sw.js`: `challenges.cloudflare.com`
está excluido de la caché a propósito — un script de retos servido desde caché
está roto por definición.

El widget acepta los hostnames `smoralb.github.io` y `localhost`; si se publica
en otro dominio hay que añadirlo en el panel de Turnstile.

---

## Copias de seguridad (`/copia/*`)

Guarda el estado de la app fuera del móvil, para que borrar los datos del
navegador o cambiar de teléfono no se lo lleve todo. El Worker hace falta por
lo mismo de siempre: la app es un sitio estático y no tiene dónde guardar nada.

Tres rutas, todas POST y todas con el código en el cuerpo:

| Ruta | Cuerpo | Respuesta |
| --- | --- | --- |
| `/copia/subir` | `{codigo, ts, datos}` | `{ok:true, ts}` · `{ok:false, motivo:'vieja', ts}` |
| `/copia/bajar` | `{codigo}` | `{datos, ts}` · `{vacio:true}` |
| `/copia/borrar` | `{codigo}` | `{ok:true}` |

**No pasan por Turnstile ni por el presupuesto.** No gastan cuota de IA, y
sobre todo: la copia tiene que poder subir sin que nada la bloquee, es lo
último que debe fallar.

### El código es la llave

No hay cuentas. El cliente se genera 24 caracteres de un alfabeto de 32 (120
bits, no se adivina) y los usa como identidad. El alfabeto excluye `l`, `o`,
`0` y `1`: el código se copia a mano alguna vez y esos cuatro se confunden.

Aquí **no se puede listar ni enumerar nada**: sin el código exacto no hay
lectura posible. Por eso `codigoValido()` es estricto — lo genera una máquina,
nunca lo teclea nadie salvo al recuperar.

### Quién gana

`Copias` guarda el JSON tal cual, sin entenderlo, junto al `ts` del **reloj del
cliente**. Al subir, un `ts` menor que el guardado se rechaza (`motivo:
'vieja'`): es una copia vieja llegando tarde, y pisar con ella lo nuevo sería
perder datos. Last-write-wins, sin mezcla campo a campo.

Que el servidor no interprete el contenido es deliberado: es una caja fuerte,
no un modelo de datos. Cualquier clave nueva que se añada a la app viaja sin
tocar nada de aquí.

### Topes

- `MAX_BYTES_COPIA` (512 KB) — un año de entrenamiento ronda los 50 KB. Deja
  margen de sobra e impide que esto se use como disco duro. Se mide en bytes
  UTF-8 de verdad, no en `length`: los acentos cuentan doble.
- `MAX_COPIAS` (500) — el endpoint es público y sin esto cualquiera puede ir
  inventando códigos hasta llenar el Durable Object. Al llegar al tope se
  siguen aceptando actualizaciones de las existentes; sólo se rechazan altas.
- `DIAS_RETENCION_COPIA` (550) — una copia que nadie toca en año y medio es de
  un móvil que ya no existe. La limpieza va colgada del cron horario de los
  recordatorios, que para esto sobra.

### Al desplegar

La clase `Copias` es un Durable Object nuevo, así que lleva su migración
(`tag = "v3"`) en `wrangler.toml`. Con `npx wrangler deploy` se aplica sola.

---

## Métricas del coach (`/metricas/*`)

Contadores agregados por día, tres meses de histórico (`Metricas`, otro Durable
Object con SQLite). Existen porque toda una semana de fallos del coach se
descubrió por lo que contaba un usuario y no por lo que veíamos: peticiones que
devolvían vacío, claves que el filtro tiraba en silencio, un botón que no
aparecía. Cualquiera de esas cosas se ve de un vistazo en un contador.

**Qué NO se guarda, a propósito:** mensajes, planes, respuestas del modelo, IPs
ni identificadores de nadie. Sólo «cuántas veces pasó esto el día X».

| Ruta | Cuerpo | Quién la llama |
| --- | --- | --- |
| `/metricas/evento` | `{eventos:[...]}` | El cliente, con una lista cerrada de nombres (`EVENTOS_CLIENTE`) |
| `/metricas/ver` | `{token, dias}` | Tú, con el secreto |

El secreto se instala aparte y nunca vive en el repo:

```powershell
npx wrangler secret put METRICAS_TOKEN
```

Sin `METRICAS_TOKEN` configurado, `/metricas/ver` responde 503: es preferible
que no funcione a que los contadores queden a la vista de cualquiera.

### Qué se cuenta

Del servidor: `chat`, `adjust`, `adjust_ok`, `adjust_vacio`, `adjust_ilegible`,
`adjust_reintento`, `adjust_reintento_ok`, `descartado_<clave>`,
`peticion_vaga`, `avoid_inventado`, `turnstile_rechazado`,
`presupuesto_agotado`, `modelo_caido`.

Del cliente (la otra mitad de la historia, porque el servidor no sabe si el
cambio llegó a aplicarse): `boton_ofrecido`, `ajuste_pedido`,
`propuesta_mostrada`, `propuesta_aceptada`, `propuesta_rechazada`,
`plantilla_convertida`.

La pareja que más dice es `boton_ofrecido` contra `ajuste_pedido`: si la
primera sube y la segunda no, el botón no se ve o no se entiende.

### El reintento

`/adjust` da **una segunda pasada** cuando la primera no vale (JSON ilegible, o
`answers` vacío pidiendo un cambio concreto), con una corrección que le dice al
modelo qué hizo mal. Es lo mismo que hace openGym y ataca la causa de casi
todos los fallos vistos: el modelo es pequeño y falla el formato, pero a la
segunda suele acertar. Cuesta otra llamada y sólo en el caso malo.

Una petición **vaga** no se reintenta: ahí el modelo no ha fallado el formato,
ha entendido de más.

### Guardas contra el modelo desbocado

Van en el código y no en el prompt, porque un prompt es una sugerencia:

- **`MAX_CLAVES_POR_PETICION` (5).** Con «ponme algo mejor» el modelo llegó a
  devolver `place`, `level`, `days`, `minutes`, `goal` y `avoid` de una vez,
  reescribiendo la configuración entera. Si se pasa del tope se devuelve
  `vago: true` y el cliente pide algo más concreto.
- **`avoid` sólo si se ha nombrado una molestia.** Es lo más delicado que hay
  aquí porque condiciona qué ejercicios se pueden hacer, y el modelo se
  inventó «rodilla» y «hombro» en una petición donde nadie habló de dolor.
