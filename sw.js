const CACHE_NAME = 'gym-calendar-v4.3.0';
const ASSETS = [
  '/gym-calendar/',
  '/gym-calendar/index.html',
  '/gym-calendar/styles.css',
  '/gym-calendar/app.js',
  '/gym-calendar/manifest.json',
  '/gym-calendar/icons/icon-192.svg',
  '/gym-calendar/icons/icon-512.svg'
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
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
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
