// BeToner Orders — Pass-through Service Worker
// Exists only to satisfy PWA installability. No caching:
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
