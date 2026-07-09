// BeToner Orders — Pass-through Service Worker
// Exists only to satisfy PWA installability. No caching:
// pushing a new index.html takes effect on the very next launch.
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
