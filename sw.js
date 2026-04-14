// BeToner Orders — Service Worker v2
// Network-first strategy so stale cached shells never block the app.

const CACHE = 'betoner-v2';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k)   { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Only handle same-origin requests — never intercept the GAS dashboard URL
  if (!e.request.url.startsWith(self.location.origin)) return;
  // Network-first: try network, fall back to cache
  e.respondWith(
    fetch(e.request).then(function(res) {
      var clone = res.clone();
      caches.open(CACHE).then(function(cache) {
        cache.put(e.request, clone);
      });
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
