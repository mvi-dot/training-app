/* Træning: service worker. Gør at appen åbner med det samme og virker uden signal.
   Skal du tvinge en opdatering ud til telefonen, så ret VERSION nedenfor (fx til traening-v2). */
const VERSION = 'traening-v8';
const SHELL = ['index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Åbn med det samme fra cachen (også med dårligt signal), og hent nyt i baggrunden.
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.match('index.html').then((hit) => {
        const refresh = fetch('index.html', { cache: 'no-cache' })
          .then((res) => { if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('index.html', copy)); } return res; })
          .catch(() => null);
        return hit || refresh.then((r) => r || new Response('Offline', { status: 503 }));
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
