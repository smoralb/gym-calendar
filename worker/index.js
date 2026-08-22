// =============================================
// Gym Calendar · proxy de IA (Cloudflare Workers AI)
// ---------------------------------------------
// Existe por una sola razón: Workers AI necesita credenciales de cuenta y la
// app es un sitio estático en GitHub Pages, donde todo lo que va en el bundle
// es público. El binding `env.AI` se autentica del lado del Worker, así que
// aquí no hay ninguna clave que filtrar.
//
// Dos rutas:
//   POST /chat    coach conversacional, responde en streaming (SSE)
//   POST /adjust  traduce texto libre a cambios sobre las respuestas del
//                 asistente. NO genera rutinas: eso lo sigue haciendo
//                 generateRoutine() en el cliente, que es determinista y
//                 pasa por validatePlan().
//
// Deploy:  npx wrangler deploy      Logs:  npx wrangler tail
// =============================================

// Ojo al elegir modelo: Cloudflare retira los viejos. Llama 3.1 8B se deprecó
// el 2026-05-30 y devuelve error 5028, no un aviso. Si un día empieza a fallar
// todo con 503, lo primero que hay que mirar es el catálogo de modelos.
// Si hiciera falta abaratar, @cf/meta/llama-3.2-3b-instruct también devuelve el
// JSON de /adjust correctamente, con peor prosa. Coste medido: ver PRESUPUESTO.
const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

// =============================================
// PRESUPUESTO DIARIO
// ---------------------------------------------
// El plan free da 10.000 neurons al día y se reinicia a las 00:00 UTC. Al
// agotarlos, Workers AI devuelve error: el coach se cae para todo el mundo
// hasta el día siguiente.
//
// Medido en este Worker: un chat con contexto completo gasta ~98 neurons y un
// /adjust ~12. O sea que la cuota diaria da para unas 100 conversaciones, no
// para miles. El límite por minuto (12/IP) no protege de esto en absoluto:
// permite 17.280 peticiones al día desde una sola IP, que funde la cuota
// entera en menos de diez minutos.
//
// Por eso se lleva la cuenta del gasto del día, en dos niveles:
//   - por IP, para que nadie se coma la cuota de los demás
//   - global, para apagar el coach ANTES de que lo apague Cloudflare (así el
//     usuario recibe un mensaje claro en vez de un error genérico)
const COSTE = { chat: 100, adjust: 12 };   // neurons estimados por petición
const PRESUPUESTO_GLOBAL = 8500;           // 85% de la cuota: deja margen
const TOPE_IP = 1200;                      // ~12 chats al día por persona

const ALLOWED_ORIGINS = [
  'https://smoralb.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];

// Topes de entrada. El contexto que manda el cliente es un resumen en texto
// plano del plan y los últimos pesos; 8 KB sobra de largo.
const MAX_CONTEXT = 8 * 1024;
const MAX_MESSAGES = 20;
const MAX_MESSAGE = 2000;

// Las claves y los valores que entiende el asistente de la app. El modelo sólo
// puede devolver esto; cualquier otra cosa la descarta el cliente.
const ANSWER_VALUES = {
  goal: ['fuerza', 'hipertrofia', 'tono', 'perder_peso', 'movilidad'],
  place: ['gimnasio', 'casa', 'sin_material'],
  days: ['2', '3', '4', '5', '6'],
  minutes: ['30', '45', '60', '90'],
  level: ['principiante', 'intermedio', 'avanzado'],
  avoid: ['rodilla', 'hombro', 'espalda_baja', 'muneca', 'codo', 'cuello'],
  running: ['', 'si']
};

const CHAT_SYSTEM = [
  'Eres el entrenador de Gym Calendar, una app de rutinas de gimnasio. Hablas en',
  'español de España, en segunda persona, directo y sin florituras.',
  '',
  'Reglas que no puedes saltarte:',
  '- Responde SIEMPRE apoyándote en los datos del plan del usuario que vienen a',
  '  continuación. Si te preguntan algo que esos datos no responden, dilo.',
  '- No inventes ejercicios, series ni pesos que no aparezcan en el contexto.',
  '- No cambies la rutina tú, ni digas que la has cambiado. Si el usuario cuenta',
  '  algo que afecta a su plan (una molestia, menos tiempo, más días), respóndele',
  '  y termina ofreciéndote a aplicarlo: debajo de tu respuesta le aparecerá un',
  '  botón «Aplicar a mi rutina» que es lo que la recalcula de verdad.',
  '- No des indicaciones médicas ni diagnósticos. Ante dolor que no cede,',
  '  recomienda ver a un profesional.',
  '- Nada de dietas, suplementos ni pérdidas de peso agresivas.',
  '- Respuestas cortas: dos o tres párrafos como mucho.'
].join('\n');

const ADJUST_SYSTEM = [
  'Traduces lo que cuenta un usuario de una app de gimnasio a cambios sobre las',
  'respuestas de su asistente de configuración. Devuelves SOLO un objeto JSON.',
  '',
  'Formato exacto:',
  '{"answers":{...},"motivo":"una frase explicando el cambio"}',
  '',
  '`answers` contiene ÚNICAMENTE las claves que hay que cambiar. Claves y',
  'valores admitidos (cualquier otra cosa se descarta):',
  '  goal    lista de: ' + ANSWER_VALUES.goal.join(', '),
  '  place   uno de: ' + ANSWER_VALUES.place.join(', '),
  '  days    uno de: ' + ANSWER_VALUES.days.join(', '),
  '  minutes uno de: ' + ANSWER_VALUES.minutes.join(', '),
  '  level   uno de: ' + ANSWER_VALUES.level.join(', '),
  '  avoid   lista de: ' + ANSWER_VALUES.avoid.join(', '),
  '  running "si" o ""',
  '',
  'Criterio:',
  '- No toques claves que el usuario no haya mencionado. Pero si pide VARIAS',
  '  cosas en el mismo mensaje, aplícalas TODAS: «me duele el hombro y ahora',
  '  puedo 4 días» son dos cambios, `avoid` y `days`.',
  '- En las claves de lista (`goal`, `avoid`) devuelve la lista COMPLETA que debe',
  '  quedar, no sólo lo nuevo. Si ya evitaba la rodilla y ahora le duele el',
  '  hombro, es ["rodilla","hombro"]. Devolver sólo ["hombro"] borraría la',
  '  rodilla sin que se entere. Quita algo de la lista únicamente si dice que ya',
  '  no le molesta.',
  '- Molestias y dolores van a `avoid`, nunca a `goal`.',
  '- Si no entiendes qué cambiar, devuelve {"answers":{},"motivo":"..."}',
  '  explicando qué te falta saber.',
  '- El `motivo` va en español, una sola frase, en segunda persona.'
].join('\n');

// =============================================
// TURNSTILE
// ---------------------------------------------
// Lo que de verdad separa «un navegador real» de «un script en bucle». El CORS
// no sirve para esto: la cabecera Origin la pone el cliente y curl se la salta.
//
// El secreto se instala aparte y nunca vive en el repo:
//   npx wrangler secret put TURNSTILE_SECRET
//
// Mientras ese secreto no exista, el Worker sigue funcionando sin exigir token.
// Es deliberado: permite desplegar este código sin romper nada y activar la
// protección después, sin tener que coordinar las dos cosas.
const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

async function turnstileValido(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;   // aún no configurado
  if (!token || typeof token !== 'string') return false;

  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body: form });
    const data = await res.json();
    if (!data.success) console.error('turnstile rechazado:', JSON.stringify(data['error-codes'] || []));
    return !!data.success;
  } catch (e) {
    // Si el propio siteverify falla, NO dejamos pasar: si un fallo de red
    // abriera la puerta, bastaría con provocarlo para saltarse la protección.
    console.error('turnstile no verificable:', e && e.message);
    return false;
  }
}

function corsHeaders(origin) {
  const h = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
  // Lista blanca explícita, no '*': este endpoint gasta cuota, no queremos que
  // lo empotre cualquier página.
  if (ALLOWED_ORIGINS.indexOf(origin) !== -1) h['Access-Control-Allow-Origin'] = origin;
  return h;
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(origin))
  });
}

// Recorta el contexto y la conversación a algo que quepa. Devuelve un mensaje
// de error (string) si la entrada no tiene forma válida.
function sanitize(payload) {
  if (!payload || typeof payload !== 'object') return 'cuerpo no válido';

  const context = typeof payload.context === 'string' ? payload.context.slice(0, MAX_CONTEXT) : '';
  const raw = Array.isArray(payload.messages) ? payload.messages : [];
  if (!raw.length) return 'no hay mensajes';

  // Nos quedamos con los últimos turnos: la conversación crece y el contexto
  // del modelo no.
  const messages = raw.slice(-MAX_MESSAGES)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE) }));

  if (!messages.length) return 'no hay mensajes válidos';
  return { context: context, messages: messages };
}

// Contador del gasto diario. Vive en un Durable Object porque hace falta que
// las cuentas sean exactas y compartidas entre todas las peticiones: en KV los
// incrementos se pisan, y además su cuota de escrituras es menor que la de
// peticiones que queremos permitir.
//
// Una sola instancia ('global') lleva todos los contadores. Serializa las
// peticiones, pero a ~100 conversaciones al día eso es irrelevante.
export class Contador {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec(
      'CREATE TABLE IF NOT EXISTS uso (dia TEXT NOT NULL, clave TEXT NOT NULL, ' +
      'gasto INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (dia, clave))'
    );
  }

  leer(dia, clave) {
    const filas = this.sql.exec('SELECT gasto FROM uso WHERE dia = ? AND clave = ?', dia, clave).toArray();
    return filas.length ? filas[0].gasto : 0;
  }

  async fetch(request) {
    const { clave, coste } = await request.json();

    // El día en UTC, para que el contador se reinicie a la vez que la cuota
    // real de Cloudflare y no medio día antes o después.
    const dia = new Date().toISOString().slice(0, 10);
    this.sql.exec('DELETE FROM uso WHERE dia < ?', dia);

    const gastoGlobal = this.leer(dia, 'global');
    if (gastoGlobal + coste > PRESUPUESTO_GLOBAL) {
      return Response.json({ permitido: false, motivo: 'global' });
    }

    const gastoPropio = this.leer(dia, clave);
    if (gastoPropio + coste > TOPE_IP) {
      return Response.json({ permitido: false, motivo: 'ip' });
    }

    // Se apunta el gasto por adelantado: es preferible pasarse de prudente a
    // descubrir que nos hemos pasado de cuota cuando ya no hay vuelta atrás.
    const sumar = 'INSERT INTO uso (dia, clave, gasto) VALUES (?, ?, ?) ' +
                  'ON CONFLICT(dia, clave) DO UPDATE SET gasto = gasto + ?';
    this.sql.exec(sumar, dia, 'global', coste, coste);
    this.sql.exec(sumar, dia, clave, coste, coste);

    return Response.json({ permitido: true });
  }
}

// SHA-256 de la IP, no la IP. Sirve igual para contar y así el Worker no
// almacena de quién es cada petición.
async function claveDe(ip) {
  const datos = new TextEncoder().encode('gym-calendar:' + ip);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return 'ip:' + [...new Uint8Array(hash)].slice(0, 8)
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// Devuelve null si se puede seguir, o la respuesta de rechazo si no.
async function presupuestoAgotado(env, request, ruta, origin) {
  if (!env.CONTADOR) return null;   // sin binding, no bloqueamos el servicio

  const ip = request.headers.get('CF-Connecting-IP') || 'desconocida';
  const clave = await claveDe(ip);
  const id = env.CONTADOR.idFromName('global');

  let r;
  try {
    r = await env.CONTADOR.get(id).fetch('https://contador/', {
      method: 'POST',
      body: JSON.stringify({ clave: clave, coste: COSTE[ruta] || 100 })
    }).then(res => res.json());
  } catch (e) {
    console.error('contador no disponible:', e && e.message);
    return null;   // un fallo del contador no debe tumbar el coach
  }

  if (r.permitido) return null;

  if (r.motivo === 'global') {
    return json({ error: 'El coach ha agotado su cuota de hoy. Vuelve mañana.' }, 503, origin);
  }
  return json({ error: 'Has usado mucho el coach hoy. Vuelve mañana.' }, 429, origin);
}

async function rateLimited(env, request) {
  if (!env.RATE_LIMITER) return false;
  // La IP del cliente; si no viene (raro), agrupamos todo bajo una misma clave
  // en vez de dejar pasar sin límite.
  const key = request.headers.get('CF-Connecting-IP') || 'desconocida';
  try {
    const { success } = await env.RATE_LIMITER.limit({ key: key });
    return !success;
  } catch (e) {
    return false; // el limitador no debe tumbar el servicio
  }
}

async function handleChat(env, clean, origin) {
  const messages = [
    { role: 'system', content: CHAT_SYSTEM },
    { role: 'system', content: 'Datos del plan del usuario:\n\n' + (clean.context || '(sin plan activo)') }
  ].concat(clean.messages);

  const stream = await env.AI.run(MODEL, {
    messages: messages,
    stream: true,
    max_tokens: 600
  });

  return new Response(stream, {
    headers: Object.assign({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store'
    }, corsHeaders(origin))
  });
}

// Workers AI no devuelve una forma única: según el modelo el texto llega en
// `response` (string), en `response` como objeto, o en el formato de salida
// tipo OpenAI. Se prueban en orden y siempre se acaba en un string.
function extractText(res) {
  if (!res) return '';
  if (typeof res === 'string') return res;

  if (typeof res.response === 'string') return res.response;
  if (res.response && typeof res.response.response === 'string') return res.response.response;

  // gpt-oss y compañía: output[] con bloques de contenido; el razonamiento
  // viene en un bloque aparte que hay que ignorar.
  if (Array.isArray(res.output)) {
    const trozos = [];
    res.output.forEach(item => {
      if (!item || !Array.isArray(item.content)) return;
      item.content.forEach(c => {
        if (c && typeof c.text === 'string' && c.type !== 'reasoning') trozos.push(c.text);
      });
    });
    if (trozos.length) return trozos.join('');
  }

  if (Array.isArray(res.choices) && res.choices[0] && res.choices[0].message) {
    const c = res.choices[0].message.content;
    if (typeof c === 'string') return c;
  }

  if (typeof res.result === 'string') return res.result;
  if (res.result && typeof res.result.response === 'string') return res.result.response;

  return '';
}

async function handleAdjust(env, clean, origin) {
  // Sólo interesa lo último que ha escrito: esto no es una conversación.
  const last = clean.messages[clean.messages.length - 1];

  const res = await env.AI.run(MODEL, {
    messages: [
      { role: 'system', content: ADJUST_SYSTEM },
      { role: 'system', content: 'Configuración actual del usuario:\n\n' + (clean.context || '(sin plan)') },
      { role: 'user', content: last.content }
    ],
    max_tokens: 300
  });

  const text = extractText(res);

  // El modelo se empeña a veces en envolver el JSON en prosa o en un bloque de
  // código, así que buscamos el primer objeto en lugar de fiarnos del formato.
  let parsed = null;
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end > start) {
    try { parsed = JSON.parse(text.slice(start, end + 1)); } catch (e) { /* abajo */ }
  }

  if (!parsed || typeof parsed !== 'object') {
    return json({ error: 'respuesta ilegible', raw: text.slice(0, 200) }, 502, origin);
  }

  // Filtro final: aunque el cliente vuelve a validar, no reenviamos claves ni
  // valores inventados.
  const answers = {};
  const from = parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {};
  Object.keys(ANSWER_VALUES).forEach(key => {
    if (!(key in from)) return;
    const allowed = ANSWER_VALUES[key];
    const value = from[key];
    if (Array.isArray(value)) {
      const kept = value.filter(v => allowed.indexOf(v) !== -1);
      if (kept.length) answers[key] = kept;
    } else if (allowed.indexOf(value) !== -1) {
      answers[key] = value;
    }
  });

  return json({
    answers: answers,
    motivo: typeof parsed.motivo === 'string' ? parsed.motivo.slice(0, 300) : ''
  }, 200, origin);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return json({ error: 'sólo POST' }, 405, origin);
    }
    if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
      return json({ error: 'origen no permitido' }, 403, origin);
    }
    if (await rateLimited(env, request)) {
      return json({ error: 'demasiadas peticiones seguidas, espera un minuto' }, 429, origin);
    }

    let payload;
    try { payload = await request.json(); }
    catch (e) { return json({ error: 'JSON no válido' }, 400, origin); }

    const clean = sanitize(payload);
    if (typeof clean === 'string') return json({ error: clean }, 400, origin);

    const ruta = url.pathname === '/chat' ? 'chat' : url.pathname === '/adjust' ? 'adjust' : null;
    if (!ruta) return json({ error: 'ruta desconocida' }, 404, origin);

    // Turnstile antes que el presupuesto: una petición que no supera la
    // verificación no debe llegar a descontar cuota de nadie.
    const ok = await turnstileValido(env, payload.turnstile, request.headers.get('CF-Connecting-IP'));
    if (!ok) {
      return json({ error: 'No he podido verificar que esto sea un navegador. Recarga la página e inténtalo otra vez.' }, 403, origin);
    }

    // El presupuesto se comprueba después de validar la entrada, para no
    // apuntar gasto de peticiones que ni siquiera van a llegar al modelo.
    const rechazo = await presupuestoAgotado(env, request, ruta, origin);
    if (rechazo) return rechazo;

    try {
      if (ruta === 'chat') return await handleChat(env, clean, origin);
      return await handleAdjust(env, clean, origin);
    } catch (e) {
      // Lo más probable aquí es que se haya agotado la cuota diaria gratuita de
      // Workers AI. El cliente lo trata como "coach no disponible".
      // El detalle sólo va al log (`npx wrangler tail`), no a la respuesta.
      console.error('fallo llamando al modelo:', e && e.message, e && e.stack);
      return json({ error: 'el modelo no está disponible ahora mismo' }, 503, origin);
    }
  }
};
