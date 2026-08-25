const CACHE_NAME = 'gym-calendar-v4.32.1';
// Media del dataset (jsDelivr). Cache aparte: sobrevive a los deploys de la app.
const MEDIA_CACHE = 'gym-calendar-exercise-media-v1';
const MEDIA_ORIGIN = 'https://cdn.jsdelivr.net';
// Turnstile (verificación del coach). Nunca pasa por caché: un script de retos
// servido desde caché está roto por definición, y sus tokens son de un solo
// uso. Sin esta excepción caería en la regla cache-first del final.
const TURNSTILE_ORIGIN = 'https://challenges.cloudflare.com';

const BASE = '/gym-calendar/';

// El "app shell": lo que cambia en cada despliegue.
const SHELL = [
  BASE,
  BASE + 'index.html',
  BASE + 'styles.css',
  BASE + 'app.js',
  BASE + 'manifest.json',
  BASE + 'version.json'
];

// Estáticos que casi nunca cambian y pesan (el catálogo son ~900 KB).
const STATIC = [
  BASE + 'icons/icon-192.svg',
  BASE + 'icons/icon-512.svg',
  BASE + 'data/exercises-index.json'
];

function isShell(url) {
  if (url.origin !== self.location.origin) return false;
  return SHELL.indexOf(url.pathname) !== -1;
}

// Avisa a las pestañas abiertas de por dónde va la instalación. Se usa
// `includeUncontrolled` porque el worker que instala todavía no controla nada.
function avisarClientes(msg) {
  return self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
    .then(cs => cs.forEach(c => c.postMessage(msg)))
    .catch(() => {});
}

// Se descarga fichero a fichero en vez de con `cache.addAll` para poder contar
// el progreso: el catálogo son ~900 KB y con datos móviles la espera se nota.
// Sigue siendo en paralelo, y si algo falla se lanza, así que la instalación
// falla entera igual que antes: una caché a medias es peor que ninguna.
//
// `cache: 'reload'` es imprescindible: sin él la descarga pasa por la caché
// HTTP del navegador y la caché nueva se rellena con los ficheros VIEJOS. Eso
// dejó la v4.13.1 sirviendo el app.js de la 4.13.0.
function instalar() {
  const urls = SHELL.concat(STATIC);
  const total = urls.length;
  let hechos = 0;

  return caches.open(CACHE_NAME).then(cache => {
    avisarClientes({ tipo: 'instalando', hechos: 0, total: total });

    return Promise.all(urls.map(u => {
      const req = new Request(u, { cache: 'reload' });
      return fetch(req).then(res => {
        if (!res || !res.ok) throw new Error('no se pudo descargar ' + u);
        return cache.put(req, res);
      }).then(() => {
        hechos++;
        avisarClientes({ tipo: 'instalando', hechos: hechos, total: total });
      });
    }));
  });
}

self.addEventListener('install', (e) => {
  e.waitUntil(instalar().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== MEDIA_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Turnstile: se deja pasar a la red sin tocarlo (ver TURNSTILE_ORIGIN).
  if (url.origin === TURNSTILE_ORIGIN) return;

  // GIFs y miniaturas del dataset: cache-first y se guardan al vuelo,
  // así los ejercicios ya vistos siguen disponibles sin conexión.
  if (url.origin === MEDIA_ORIGIN) {
    e.respondWith(
      caches.open(MEDIA_CACHE).then(cache =>
        cache.match(e.request).then(hit => {
          if (hit) return hit;
          return fetch(e.request).then(res => {
            if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
            return res;
          }).catch(() => new Response('', { status: 504 }));
        })
      )
    );
    return;
  }

  // El código de la app va a red primero: cache-first ya nos dejó dos veces
  // con una versión antigua pegada, y un bug servido desde caché no se cura
  // solo. Si no hay red, se responde con lo cacheado y sigue funcionando.
  if (isShell(url) || e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() =>
        caches.match(e.request).then(hit =>
          hit || (e.request.mode === 'navigate' ? caches.match(BASE + 'index.html') : new Response('Offline', { status: 503 }))
        )
      )
    );
    return;
  }

  // El resto (catálogo, iconos): cache-first, que es grande y estable.
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit || fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => new Response('Offline', { status: 503 }))
    )
  );
});

// =============================================
// NOTIFICACIONES PUSH
// ---------------------------------------------
// El aviso lo manda el Worker desde un cron (ver worker/index.js): una web no
// puede programarse notificaciones locales a futuro, asi que el reparto tiene
// que venir de fuera.
//
// Aqui SIEMPRE se muestra lo que llega. Si el service worker recibe un push y
// no enseña nada, el navegador acaba sacando por su cuenta un aviso generico
// de "este sitio se ha actualizado en segundo plano", que es peor que el
// recordatorio. Filtrar "ya he entrenado" se hace en el servidor, que para eso
// el cliente le avisa al terminar la sesion.
self.addEventListener('push', (e) => {
  let datos = {};
  try { datos = e.data ? e.data.json() : {}; } catch (err) { /* payload raro */ }

  const titulo = datos.titulo || '🏋️ Gym Calendar';
  const cuerpo = datos.cuerpo || 'Hoy toca entrenar.';

  e.waitUntil(
    self.registration.showNotification(titulo, {
      body: cuerpo,
      icon: BASE + 'icons/icon-192.svg',
      badge: BASE + 'icons/icon-192.svg',
      // Mismo tag para que un segundo aviso reemplace al primero en vez de
      // apilarse: dos recordatorios del mismo dia son ruido, no urgencia.
      tag: 'gym-entreno',
      renotify: true,
      data: { url: datos.url || BASE }
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const destino = (e.notification.data && e.notification.data.url) || BASE;

  // Si ya hay una pestaña de la app abierta se reutiliza, en vez de abrir otra
  // encima de la que el usuario ya tenia.
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
      for (const c of cs) {
        if (c.url.indexOf(destino) !== -1 && 'focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(destino);
    })
  );
});
