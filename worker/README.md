# Proxy de IA (Cloudflare Worker)

El asistente de Gym Calendar necesita esta pieza. No es opcional y no es
decorativa: Workers AI se autentica con credenciales de cuenta, y la app es un
sitio estático en GitHub Pages donde cualquier cosa que vaya en `app.js` la lee
quien abra DevTools. El Worker guarda esa credencial del lado servidor.

Es un fichero. No hay `package.json`, ni build, ni dependencias.

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
