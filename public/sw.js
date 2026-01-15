const CACHE_NAME = 'wedding-v1';
const PRECACHE_ASSETS = [
  '/',
  '/invitation',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip cross-origin requests for now unless needed
  if (url.origin !== location.origin && !url.href.includes('esm.sh')) return;

  // Network First for HTML navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(res => res || caches.match('/invitation')); // Fallback
        })
    );
    return;
  }

  // Stale-While-Revalidate for static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|json)$/) || url.href.includes('esm.sh')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(err => console.log('Fetch failed', err));

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
