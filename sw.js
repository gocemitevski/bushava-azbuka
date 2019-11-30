---
---
// ^ Required formatting marks for loading Liquid/Jekyll variables within JS

var cacheName = 'cache-{{ site.time | date: "%Y-%m-%d" }}';
var resourcesToCache = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/assets/main.css',
  '/assets/video/bushava-azbuka-najavna-shpica-poster.jpg',
  '/assets/js/jquery.min.js',
  '/assets/js/popper.min.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/content.js',
  '/assets/sliki/bushava-azbuka-512x512.png',
  '/assets/sliki/bushava-azbuka-192x192.png',
  '/assets/sliki/bushava-azbuka-192x192-ios.png',
  '/assets/sliki/bushava-azbuka-avijatichar.png',
  '/assets/sliki/bushava-azbuka-boks.png',
  '/assets/sliki/bushava-azbuka-cel.png',
  '/assets/sliki/bushava-azbuka-chudo.png',
  '/assets/sliki/bushava-azbuka-dupka.png',
  '/assets/sliki/bushava-azbuka-dzid.png',
  '/assets/sliki/bushava-azbuka-dzokej.png',
  '/assets/sliki/bushava-azbuka-eho.png',
  '/assets/sliki/bushava-azbuka-fitilj.png',
  '/assets/sliki/bushava-azbuka-gjon.png',
  '/assets/sliki/bushava-azbuka-gluv.png',
  '/assets/sliki/bushava-azbuka-helikopter.png',
  '/assets/sliki/bushava-azbuka-igla.png',
  '/assets/sliki/bushava-azbuka-jama.png',
  '/assets/sliki/bushava-azbuka-kavga.png',
  '/assets/sliki/bushava-azbuka-kjebapche.png',
  '/assets/sliki/bushava-azbuka-levuchar.png',
  '/assets/sliki/bushava-azbuka-ljubov.png',
  '/assets/sliki/bushava-azbuka-maler.png',
  '/assets/sliki/bushava-azbuka-napor.png',
  '/assets/sliki/bushava-azbuka-naslovna.png',
  '/assets/sliki/bushava-azbuka-njujork.png',
  '/assets/sliki/bushava-azbuka-ogledalo.png',
  '/assets/sliki/bushava-azbuka-poklopka.png',
  '/assets/sliki/bushava-azbuka-rendgen.png',
  '/assets/sliki/bushava-azbuka-shega.png',
  '/assets/sliki/bushava-azbuka-sudbina.png',
  '/assets/sliki/bushava-azbuka-tvrdo.png',
  '/assets/sliki/bushava-azbuka-ubava.png',
  '/assets/sliki/bushava-azbuka-voda.png',
  '/assets/sliki/bushava-azbuka-zabuna.png',
  '/assets/sliki/bushava-azbuka-zhaba.png',
  '/assets/free-serif/FreeSerif.woff',
  '/assets/free-serif/FreeSerif.woff2',
  '/assets/free-serif/FreeSerifBold.woff',
  '/assets/free-serif/FreeSerifBold.woff2',
  '/assets/free-serif/FreeSerifBoldItalic.woff',
  '/assets/free-serif/FreeSerifBoldItalic.woff2'
];

self.addEventListener('install', function (event) {
  // console.log('Service Worker - Install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return cache.addAll(resourcesToCache);
      })
  )
})

self.addEventListener('activate', function (event) {
  // console.log('Service Worker - Activate event!');

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  // console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(function (cacheResponse) {
      return cacheResponse || fetch(event.request);
    })
  )
})
