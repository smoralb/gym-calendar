const CACHE_NAME = 'gym-calendar-v4.16.0';
// Media del dataset (jsDelivr). Cache aparte: sobrevive a los deploys de la app.
const MEDIA_CACHE = 'gym-calendar-exercise-media-v1';
const MEDIA_ORIGIN = 'https://cdn.jsdelivr.net';

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

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // `cache: 'reload'` es imprescindible: sin él addAll descarga a través de
      // la caché HTTP del navegador y la caché nueva se rellena con los
      // ficheros VIEJOS. Eso dejó la v4.13.1 sirviendo el app.js de la 4.13.0.
      cache.addAll(SHELL.concat(STATIC).map(u => new Request(u, { cache: 'reload' })))
    ).then(() => self.skipWaiting())
  );
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
