---
---
const cacheVersion = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const CACHE_PREFIX = 'cache';
const cacheName = CACHE_PREFIX + '-' + cacheVersion;
let siteURL = self.location.origin;
let resourcesToCache = [
  '/',
  siteURL + '/index.html',
{%- for bukva in site.bukvi %}
  siteURL + '{{ bukva.url }}',
{%- endfor %}
  siteURL + '/favicon.ico',
  siteURL + '/manifest.json',
{%- assign exts = ".css,.js,.png,.jpg,.jpeg,.webm,.mp4,.woff,.woff2,.ico" | split: "," %}
{%- for file in site.static_files %}
{%- if exts contains file.extname and file.path contains 'assets/' %}
  siteURL + '{{ file.path }}',
{%- endif %}
{%- endfor %}
];

self.addEventListener('install', function (event) {
  // console.log('Service Worker - Install event!');
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return Promise.allSettled(
          resourcesToCache.map(function (url) {
            return cache.add(url);
          })
        );
      })
  )
})

self.addEventListener('activate', function (event) {
  // console.log('Service Worker - Activate event!');

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key.startsWith(CACHE_PREFIX) && key !== cacheName) {
          return caches.delete(key);
        }
      })
      )
    })
    .then(function () {
      return self.clients.claim();
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          var responseToCache = response.clone();

          caches.open(cacheName)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }
      ).catch(function() {
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        return Response.error();
      });
    })
  );
});
