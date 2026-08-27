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
// Se usa esta librería y no otras por el esquema de cifrado: manda `aes128gcm`
// (RFC 8291), que es el vigente. Varias alternativas siguen emitiendo el
// `aesgcm` antiguo, y el endpoint de Apple —o sea todos los iPhone, que es
// justo donde más se usa esta app— responde 403 a eso. Además va con WebCrypto
// puro, sin `node:crypto`.
import { sendPushNotification } from '@mmmike/web-push/send';

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

// =============================================
// NOTIFICACIONES PUSH
// ---------------------------------------------
// Recordatorio de que hoy toca entrenar. Hace falta servidor por narices: una
// web no puede programarse una notificacion local para dentro de unas horas
// (la API que lo permitia nunca llego a lanzarse), asi que la unica via es
// Web Push, y eso lo manda alguien desde fuera. Ese alguien es este cron.
//
// La clave privada VAPID va como secreto, nunca en el repo:
//   npx wrangler secret put VAPID_PRIVATE_KEY
//
// El `subject` es la URL del sitio y no un mailto a proposito: el subject
// viaja a los servicios push de Google y Apple, y no hay razon para mandarles
// el correo de nadie.
const VAPID_SUBJECT = 'https://smoralb.github.io/gym-calendar';
const VAPID_PUBLIC = 'BDmdYcdktK_30nKHZ-95A9eORHXPaKQTpRh8N6quMmgNe4kQCVtGrtfma7lOXpMCX7eQVDvAnug5eyQI-d6dDx4';

// Segundo toque, en horas, si a esas alturas no consta que haya entrenado.
// Dos avisos al dia como maximo: la via rapida para que alguien desactive las
// notificaciones (o desinstale) es pasarse de insistente.
const HORAS_SEGUNDO_AVISO = 3;

// Tope de envios por ejecucion del cron. El plan free permite 50 subrequests
// por invocacion, y cada notificacion es una. Si algun dia hay mas gente, hay
// que trocear esto en varias pasadas.
const MAX_ENVIOS_POR_TICK = 40;

// =============================================
// COPIA DE SEGURIDAD EN LA NUBE
// ---------------------------------------------
// El navegador puede borrar el almacenamiento cuando quiera, y cambiar de
// movil se lo lleva todo por delante. Una copia local no salva de ninguna de
// las dos cosas, asi que la copia tiene que salir del dispositivo.
//
// No hay cuentas ni contrasenas: el cliente se inventa un codigo largo la
// primera vez que arranca y lo usa como identidad. El codigo ES la llave, asi
// que aqui no se puede listar ni adivinar nada: sin codigo exacto no hay
// lectura posible.
//
// Cap por copia. Medido: un ano de entrenamiento ronda los 50 KB. Medio mega
// deja margen de sobra y a la vez impide que esto se use como disco duro.
const MAX_BYTES_COPIA = 512 * 1024;

// Tope de copias distintas. El endpoint es publico, y sin esto cualquiera
// puede ir inventando codigos y llenar el Durable Object. Al llegar al tope se
// siguen aceptando actualizaciones de las que ya existen, sólo se rechazan
// altas nuevas.
const MAX_COPIAS = 500;

// Una copia que nadie toca en año y medio es de un movil que ya no existe.
const DIAS_RETENCION_COPIA = 550;

// El secreto se recorta siempre. Al instalarlo por tuberia (PowerShell, `cat`,
// un copiar-pegar con espacio de mas) es facil que se cuele un salto de linea
// al final, y entonces la clave EC deja de ser valida con un error opaco
// —«missing or invalid private key component (d)»— que solo se ve cuando ya
// no llega ninguna notificacion.
function vapidKeys(env) {
  return {
    subject: VAPID_SUBJECT,
    publicKey: VAPID_PUBLIC,
    privateKey: String(env.VAPID_PRIVATE_KEY || '').trim()
  };
}

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
  running: ['', 'si'],
  // Faltaba, y sin ella el plan de vuelta a correr no se podia quitar por el
  // coach: el filtro de abajo descartaba la clave aunque el modelo la mandara.
  // Quien pedia "quita el plan de carrera" no obtenia ningun cambio.
  runningPlan: ['', 'si'],
  // Cuantas carreras a la semana. Antes eran 3 fijas y la unica alternativa
  // era quitar el plan entero: quien pedia "1 dia de running" acababa con
  // CERO, porque el modelo solo podia elegir entre las dos opciones que habia.
  runningDays: ['1', '2', '3']
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
  '  running "si" o ""   (si sale a correr por su cuenta)',
  '  runningPlan "si" o ""   (si sigue el plan guiado de vuelta a correr)',
  '  runningDays uno de: ' + ANSWER_VALUES.runningDays.join(', ') + '   (carreras por semana)',
  '',
  'Sobre la carrera:',
  '- Si pide correr MENOS veces (o más), eso es `runningDays`, no quitar el',
  '  plan. «Sólo quiero 1 día de running» es runningDays "1", y el plan sigue.',
  '- `runningDays` sólo tiene sentido con runningPlan "si". Si quiere correr y',
  '  no tiene el plan, pon runningPlan "si" junto con los días que pida.',
  '- Quitar el plan (runningPlan "") es sólo para quien no quiere que se le',
  '  programen carreras. Puede seguir corriendo por su cuenta con running "si".',
  '- Si dice que no quiere correr nada, entonces running "" y runningPlan "".',
  '- El plan está diseñado para 3 sesiones; con 1 o 2 la readaptación va más',
  '  despacio. Puedes decirlo en el `motivo`, pero hazle caso igualmente.',
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

// Copias de seguridad. Una fila por código: el JSON tal cual lo manda el
// cliente (el mismo que produce el botón de exportar) y el instante en que se
// hizo el último cambio EN EL CLIENTE, que es el que decide quién gana.
//
// El servidor no entiende ni valida el contenido: es una caja fuerte, no un
// modelo de datos. Así, cualquier clave nueva que se añada a la app sigue
// viajando sin tocar nada de aquí.
export class Copias {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec(
      'CREATE TABLE IF NOT EXISTS copias (' +
      ' codigo TEXT PRIMARY KEY,' +
      ' datos TEXT NOT NULL,' +
      ' ts INTEGER NOT NULL,' +          // últ. cambio, en ms del reloj del cliente
      ' actualizado INTEGER NOT NULL' +  // últ. escritura, en ms del reloj del server
      ')'
    );
  }

  async fetch(request) {
    const { accion, datos } = await request.json();

    if (accion === 'subir') {
      const fila = this.sql.exec('SELECT ts FROM copias WHERE codigo = ?', datos.codigo).toArray()[0];

      // Last-write-wins por el reloj del cliente. Un `ts` menor que el
      // guardado es una copia vieja subiendo tarde (un móvil que estuvo sin
      // red), y pisar con ella lo nuevo sería perder datos.
      if (fila && datos.ts < fila.ts) {
        return Response.json({ ok: false, motivo: 'vieja', ts: fila.ts });
      }

      if (!fila) {
        const total = this.sql.exec('SELECT COUNT(*) AS n FROM copias').toArray()[0].n;
        if (total >= MAX_COPIAS) return Response.json({ ok: false, motivo: 'lleno' });
      }

      this.sql.exec(
        'INSERT INTO copias (codigo, datos, ts, actualizado) VALUES (?, ?, ?, ?) ' +
        'ON CONFLICT(codigo) DO UPDATE SET datos = ?, ts = ?, actualizado = ?',
        datos.codigo, datos.datos, datos.ts, Date.now(),
        datos.datos, datos.ts, Date.now()
      );
      return Response.json({ ok: true, ts: datos.ts });
    }

    if (accion === 'bajar') {
      const fila = this.sql.exec('SELECT datos, ts FROM copias WHERE codigo = ?', datos.codigo).toArray()[0];
      if (!fila) return Response.json({ vacio: true });
      return Response.json({ datos: fila.datos, ts: fila.ts });
    }

    if (accion === 'borrar') {
      this.sql.exec('DELETE FROM copias WHERE codigo = ?', datos.codigo);
      return Response.json({ ok: true });
    }

    if (accion === 'caducar') {
      const limite = Date.now() - DIAS_RETENCION_COPIA * 24 * 60 * 60 * 1000;
      this.sql.exec('DELETE FROM copias WHERE actualizado < ?', limite);
      return Response.json({ ok: true });
    }

    return Response.json({ error: 'accion desconocida' }, { status: 400 });
  }
}

// Suscripciones a push. Se guarda lo mínimo para poder mandar el aviso:
// el endpoint y las claves que da el navegador, qué días entrena, a qué hora
// local quiere el recordatorio y cómo se llama la sesión de cada día. Nada
// que identifique a nadie: ni nombre, ni correo, ni pesos, ni progreso.
export class Suscripciones {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec(
      'CREATE TABLE IF NOT EXISTS subs (' +
      ' endpoint TEXT PRIMARY KEY,' +
      ' auth TEXT NOT NULL,' +
      ' p256dh TEXT NOT NULL,' +
      ' dias TEXT NOT NULL,' +        // JSON: [0..6] con getDay() del cliente
      ' nombres TEXT NOT NULL,' +     // JSON: { "1": "Empuje", ... }
      ' hora INTEGER NOT NULL,' +     // hora local preferida, 0-23
      ' offset INTEGER NOT NULL,' +   // getTimezoneOffset() del cliente
      ' hechoEl TEXT,' +              // día (local) en que reportó entreno
      ' avisadoEl TEXT,' +            // día (local) del último aviso
      ' avisos INTEGER NOT NULL DEFAULT 0,' +
      ' racha INTEGER NOT NULL DEFAULT 0' +   // sesiones seguidas, para el texto
      ')'
    );
    // La columna `racha` se añadió después: en bases ya creadas no existe y
    // cualquier SELECT * la echaría en falta. Con IF NOT EXISTS en la tabla no
    // basta, hay que añadirla aparte.
    try { this.sql.exec('ALTER TABLE subs ADD COLUMN racha INTEGER NOT NULL DEFAULT 0'); }
    catch (e) { /* ya existía */ }
  }

  async fetch(request) {
    const { accion, datos } = await request.json();

    if (accion === 'guardar') {
      this.sql.exec(
        'INSERT INTO subs (endpoint, auth, p256dh, dias, nombres, hora, offset, racha) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?) ' +
        'ON CONFLICT(endpoint) DO UPDATE SET auth = ?, p256dh = ?, dias = ?, ' +
        'nombres = ?, hora = ?, offset = ?, racha = ?',
        datos.endpoint, datos.auth, datos.p256dh, datos.dias, datos.nombres, datos.hora, datos.offset, datos.racha,
        datos.auth, datos.p256dh, datos.dias, datos.nombres, datos.hora, datos.offset, datos.racha
      );
      return Response.json({ ok: true });
    }

    if (accion === 'borrar') {
      this.sql.exec('DELETE FROM subs WHERE endpoint = ?', datos.endpoint);
      return Response.json({ ok: true });
    }

    if (accion === 'hecho') {
      this.sql.exec('UPDATE subs SET hechoEl = ?, racha = ? WHERE endpoint = ?',
        datos.dia, datos.racha, datos.endpoint);
      return Response.json({ ok: true });
    }

    if (accion === 'pendientes') {
      return Response.json({ subs: this.pendientes(datos.ahora) });
    }

    if (accion === 'marcar') {
      this.sql.exec('UPDATE subs SET avisadoEl = ?, avisos = ? WHERE endpoint = ?',
        datos.dia, datos.avisos, datos.endpoint);
      return Response.json({ ok: true });
    }

    // Una suscripción caducada o revocada (404/410 del servicio push) no se
    // recupera nunca: se borra para no reintentarla en cada tick.
    if (accion === 'caducada') {
      this.sql.exec('DELETE FROM subs WHERE endpoint = ?', datos.endpoint);
      return Response.json({ ok: true });
    }

    return Response.json({ error: 'accion desconocida' }, { status: 400 });
  }

  // Decide a quién le toca aviso AHORA, según su hora local.
  pendientes(ahoraMs) {
    const filas = this.sql.exec('SELECT * FROM subs').toArray();
    const salida = [];

    for (const f of filas) {
      // getTimezoneOffset() es minutos que hay que SUMAR a la hora local para
      // llegar a UTC, y es positivo al oeste. Por eso se resta aquí.
      const local = new Date(ahoraMs - f.offset * 60000);
      const dia = local.toISOString().slice(0, 10);
      const horaLocal = local.getUTCHours();
      const diaSemana = local.getUTCDay();

      let dias;
      try { dias = JSON.parse(f.dias); } catch (e) { continue; }
      if (!Array.isArray(dias) || dias.indexOf(diaSemana) === -1) continue;

      // Ya entrenó hoy: no hay nada que recordar.
      if (f.hechoEl === dia) continue;

      const avisosHoy = f.avisadoEl === dia ? f.avisos : 0;
      let toca = false;
      if (avisosHoy === 0 && horaLocal === f.hora) toca = true;
      else if (avisosHoy === 1 && horaLocal === (f.hora + HORAS_SEGUNDO_AVISO) % 24) toca = true;
      if (!toca) continue;

      let nombres = {};
      try { nombres = JSON.parse(f.nombres) || {}; } catch (e) { /* sin nombre */ }

      salida.push({
        endpoint: f.endpoint,
        auth: f.auth,
        p256dh: f.p256dh,
        dia: dia,
        avisos: avisosHoy + 1,
        sesion: nombres[String(diaSemana)] || '',
        racha: f.racha || 0
      });

      if (salida.length >= MAX_ENVIOS_POR_TICK) break;
    }
    return salida;
  }
}

function suscripcionesDO(env) {
  return env.SUSCRIPCIONES.get(env.SUSCRIPCIONES.idFromName('global'));
}

function llamarCopias(env, accion, datos) {
  // Una sola instancia para todas las copias, igual que el contador: serializa
  // las peticiones, pero a este volumen da igual y evita tener que repartir
  // los códigos entre instancias.
  return env.COPIAS.get(env.COPIAS.idFromName('global')).fetch('https://copias/', {
    method: 'POST',
    body: JSON.stringify({ accion: accion, datos: datos || {} })
  }).then(r => r.json());
}

// El código lo genera el cliente y nunca lo teclea nadie, así que puede ser
// estricto: minúsculas y dígitos, longitud fija. Validarlo aquí evita que una
// petición a mano meta cualquier cosa como clave primaria.
function codigoValido(c) {
  return typeof c === 'string' && /^[a-z0-9]{24}$/.test(c);
}

function llamarSubs(env, accion, datos) {
  return suscripcionesDO(env).fetch('https://subs/', {
    method: 'POST',
    body: JSON.stringify({ accion: accion, datos: datos || {} })
  }).then(r => r.json());
}

// Envía un aviso. Devuelve 'ok', 'caducada' o 'error'.
async function enviarAviso(env, sub) {
  // La racha sólo se nombra a partir de 2: con 1 no hay «racha» que perder y
  // decirlo suena a relleno. El dato puede venir algo desfasado (el cliente lo
  // refresca al abrir la app y al terminar una sesión), así que se usa para
  // motivar, nunca como cifra exacta.
  const racha = sub.racha || 0;
  const queToca = sub.sesion ? 'Hoy toca ' + sub.sesion : 'Hoy toca entrenar';

  let cuerpo;
  if (racha >= 2 && sub.avisos >= 2) {
    // Segundo aviso del día: es el que de verdad se juega la racha.
    cuerpo = 'Tu racha de ' + racha + ' sesiones se acaba hoy. Aún estás a tiempo 🔥';
  } else if (racha >= 2) {
    cuerpo = queToca + '. Llevas ' + racha + ' seguidas, no la rompas 🔥';
  } else {
    cuerpo = queToca + '. Vamos allá 💪';
  }

  try {
    // Devuelve false cuando el servicio push dice que la suscripción ya no
    // existe (404/410); eso no es un fallo, es que hay que borrarla.
    const entregado = await sendPushNotification(
      { endpoint: sub.endpoint, keys: { auth: sub.auth, p256dh: sub.p256dh } },
      { title: '🏋️ Gym Calendar', body: cuerpo, url: '/gym-calendar/', tag: 'gym-entreno' },
      vapidKeys(env),
      { ttl: 3 * 60 * 60, urgency: 'normal' }
    );
    return entregado ? 'ok' : 'caducada';
  } catch (e) {
    // Rate limit u otro error del servicio: no se marca, se reintenta luego.
    console.error('push fallido:', e && e.message);
    return 'error';
  }
}

async function enviarRecordatorios(env) {
  if (!env.VAPID_PRIVATE_KEY || !env.SUSCRIPCIONES) return;

  const { subs } = await llamarSubs(env, 'pendientes', { ahora: Date.now() });
  if (!subs || !subs.length) return;

  for (const sub of subs) {
    const r = await enviarAviso(env, sub);
    if (r === 'caducada') {
      await llamarSubs(env, 'caducada', { endpoint: sub.endpoint });
    } else if (r === 'ok') {
      await llamarSubs(env, 'marcar', { endpoint: sub.endpoint, dia: sub.dia, avisos: sub.avisos });
    }
    // En 'error' no se marca: se reintentará en el siguiente tick.
  }
}

// Valida lo que manda el cliente al suscribirse. Devuelve null si no vale.
function limpiarSuscripcion(p) {
  if (!p || typeof p !== 'object') return null;
  const s = p.subscription;
  if (!s || typeof s.endpoint !== 'string' || !s.keys) return null;
  if (!/^https:\/\//.test(s.endpoint) || s.endpoint.length > 1024) return null;
  if (typeof s.keys.auth !== 'string' || typeof s.keys.p256dh !== 'string') return null;

  const dias = Array.isArray(p.dias)
    ? p.dias.filter(d => Number.isInteger(d) && d >= 0 && d <= 6)
    : [];
  if (!dias.length) return null;

  const hora = Number.isInteger(p.hora) && p.hora >= 0 && p.hora <= 23 ? p.hora : 18;
  const offset = Number.isInteger(p.offset) && Math.abs(p.offset) <= 900 ? p.offset : 0;
  const racha = Number.isInteger(p.racha) && p.racha >= 0 && p.racha < 10000 ? p.racha : 0;

  // Sólo se guardan nombres de sesión de días válidos, y recortados.
  const nombres = {};
  if (p.nombres && typeof p.nombres === 'object') {
    dias.forEach(d => {
      const n = p.nombres[String(d)];
      if (typeof n === 'string' && n) nombres[String(d)] = n.slice(0, 40);
    });
  }

  return {
    endpoint: s.endpoint,
    auth: s.keys.auth.slice(0, 200),
    p256dh: s.keys.p256dh.slice(0, 200),
    dias: JSON.stringify(dias),
    nombres: JSON.stringify(nombres),
    hora: hora,
    offset: offset,
    racha: racha
  };
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
  // Cron horario: reparte los recordatorios de entrenamiento.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(enviarRecordatorios(env).catch(e => {
      console.error('fallo enviando recordatorios:', e && e.message);
    }));

    // Limpieza de copias abandonadas. Va aquí y no en su propio cron porque no
    // corre prisa: que se ejecute cada hora sobra de largo.
    if (env.COPIAS) {
      ctx.waitUntil(llamarCopias(env, 'caducar').catch(e => {
        console.error('fallo caducando copias:', e && e.message);
      }));
    }
  },

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

    // Las rutas de push van antes de sanitize(), que exige `messages` y es
    // cosa del coach. No pasan por Turnstile ni por el presupuesto: no gastan
    // cuota de IA y bloquearlas tras un reto rompería el alta desde el ajuste.
    if (url.pathname.indexOf('/push/') === 0) {
      if (!env.SUSCRIPCIONES) return json({ error: 'notificaciones no disponibles' }, 503, origin);

      if (url.pathname === '/push/subscribe') {
        const limpia = limpiarSuscripcion(payload);
        if (!limpia) return json({ error: 'suscripción no válida' }, 400, origin);
        await llamarSubs(env, 'guardar', limpia);
        return json({ ok: true }, 200, origin);
      }

      if (url.pathname === '/push/unsubscribe') {
        const ep = payload && payload.endpoint;
        if (typeof ep !== 'string') return json({ error: 'falta endpoint' }, 400, origin);
        await llamarSubs(env, 'borrar', { endpoint: ep });
        return json({ ok: true }, 200, origin);
      }

      // El cliente avisa de que ya ha entrenado, para que no llegue el segundo
      // recordatorio. `dia` es la fecha LOCAL del cliente, que es con la que
      // razona el cron.
      if (url.pathname === '/push/done') {
        const ep = payload && payload.endpoint;
        const dia = payload && payload.dia;
        if (typeof ep !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(String(dia))) {
          return json({ error: 'datos no válidos' }, 400, origin);
        }
        const r = Number.isInteger(payload.racha) && payload.racha >= 0 && payload.racha < 10000 ? payload.racha : 0;
        await llamarSubs(env, 'hecho', { endpoint: ep, dia: dia, racha: r });
        return json({ ok: true }, 200, origin);
      }

      return json({ error: 'ruta desconocida' }, 404, origin);
    }

    // Copias de seguridad. Como las de push: ni Turnstile ni presupuesto, no
    // gastan cuota de IA. Y sobre todo, la copia tiene que poder subir sin que
    // nada la bloquee: es lo último que debe fallar.
    if (url.pathname.indexOf('/copia/') === 0) {
      if (!env.COPIAS) return json({ error: 'copias no disponibles' }, 503, origin);

      const codigo = payload && payload.codigo;
      if (!codigoValido(codigo)) return json({ error: 'código no válido' }, 400, origin);

      if (url.pathname === '/copia/subir') {
        const datos = payload.datos;
        if (typeof datos !== 'string' || !datos) return json({ error: 'faltan datos' }, 400, origin);
        // `length` es en caracteres UTF-16, no en bytes. Se mide de verdad:
        // los acentos de los nombres de ejercicio cuentan doble.
        if (new TextEncoder().encode(datos).length > MAX_BYTES_COPIA) {
          return json({ error: 'la copia es demasiado grande' }, 413, origin);
        }
        const ts = payload.ts;
        if (!Number.isInteger(ts) || ts <= 0) return json({ error: 'ts no válido' }, 400, origin);

        const r = await llamarCopias(env, 'subir', { codigo: codigo, datos: datos, ts: ts });
        if (r.motivo === 'lleno') return json({ error: 'no se admiten copias nuevas' }, 507, origin);
        return json(r, 200, origin);
      }

      if (url.pathname === '/copia/bajar') {
        return json(await llamarCopias(env, 'bajar', { codigo: codigo }), 200, origin);
      }

      if (url.pathname === '/copia/borrar') {
        return json(await llamarCopias(env, 'borrar', { codigo: codigo }), 200, origin);
      }

      return json({ error: 'ruta desconocida' }, 404, origin);
    }

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
