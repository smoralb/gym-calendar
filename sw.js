const CACHE_NAME = 'gym-calendar-v4.12.0';
// Media del dataset (jsDelivr). Cache aparte: sobrevive a los deploys de la app.
const MEDIA_CACHE = 'gym-calendar-exercise-media-v1';
const MEDIA_ORIGIN = 'https://cdn.jsdelivr.net';

const ASSETS = [
  '/gym-calendar/',
  '/gym-calendar/index.html',
  '/gym-calendar/styles.css',
  '/gym-calendar/app.js',
  '/gym-calendar/manifest.json',
  '/gym-calendar/icons/icon-192.svg',
  '/gym-calendar/icons/icon-512.svg',
  '/gym-calendar/data/exercises-index.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
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

  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request).catch(() => {
        // Return offline fallback for navigation requests
        if (e.request.mode === 'navigate') {
          return caches.match('/gym-calendar/index.html');
        }
        return new Response('Offline', { status: 503 });
      }))
  );
});
