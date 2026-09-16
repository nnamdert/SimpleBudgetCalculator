/* Simple Budget Calculator — service worker
   nnamdert.page — bump CACHE_VERSION on every deploy to push updates. */
const CACHE_VERSION = 'sbc-v1';
const APP_SHELL = [
  './', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png',
  './fonts/archivo-latin-400-normal.woff2', './fonts/archivo-latin-500-normal.woff2',
  './fonts/archivo-latin-600-normal.woff2', './fonts/archivo-latin-700-normal.woff2',
  './fonts/spline-sans-mono-latin-400-normal.woff2', './fonts/spline-sans-mono-latin-500-normal.woff2',
  './fonts/spline-sans-mono-latin-600-normal.woff2'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        if (resp.ok && new URL(event.request.url).origin === self.location.origin) {
          const clone = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(event.request, clone));
        }
        return resp;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
