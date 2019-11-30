---
---
// ^ Required formatting marks for loading Liquid/Jekyll variables within JS

var cacheName = 'cache-{{ site.time | date: "%Y-%m-%d" }}';
var siteURL = 'https://gocemitevski.github.io/bushava-azbuka'
var resourcesToCache = [
  siteURL + '/',
  siteURL + '/index.html',
  siteURL + '/bukvi/01-а.html',
  siteURL + '/bukvi/02-б.html',
  siteURL + '/bukvi/03-в.html',
  siteURL + '/bukvi/04-г.html',
  siteURL + '/bukvi/05-д.html',
  siteURL + '/bukvi/06-ѓ.html',
  siteURL + '/bukvi/07-е.html',
  siteURL + '/bukvi/08-ж.html',
  siteURL + '/bukvi/09-з.html',
  siteURL + '/bukvi/10-ѕ.html',
  siteURL + '/bukvi/11-и.html',
  siteURL + '/bukvi/12-ј.html',
  siteURL + '/bukvi/13-к.html',
  siteURL + '/bukvi/14-л.html',
  siteURL + '/bukvi/15-љ.html',
  siteURL + '/bukvi/16-м.html',
  siteURL + '/bukvi/17-н.html',
  siteURL + '/bukvi/18-њ.html',
  siteURL + '/bukvi/19-о.html',
  siteURL + '/bukvi/20-п.html',
  siteURL + '/bukvi/21-р.html',
  siteURL + '/bukvi/22-с.html',
  siteURL + '/bukvi/23-т.html',
  siteURL + '/bukvi/24-ќ.html',
  siteURL + '/bukvi/25-у.html',
  siteURL + '/bukvi/26-ф.html',
  siteURL + '/bukvi/27-х.html',
  siteURL + '/bukvi/28-ц.html',
  siteURL + '/bukvi/29-ч.html',
  siteURL + '/bukvi/30-џ.html',
  siteURL + '/bukvi/31-ш.html',
  siteURL + '/favicon.ico',
  siteURL + '/assets/main.css',
  // siteURL + '/assets/video/bushava-azbuka-najavna-shpica.mp4',
  // siteURL + '/assets/video/bushava-azbuka-najavna-shpica.webm',
  siteURL + '/assets/video/bushava-azbuka-najavna-shpica-poster.jpg',
  siteURL + '/assets/js/jquery.min.js',
  siteURL + '/assets/js/popper.min.js',
  siteURL + '/assets/js/bootstrap.min.js',
  siteURL + '/assets/js/content.js',
  siteURL + '/assets/sliki/bushava-azbuka-512x512.png',
  siteURL + '/assets/sliki/bushava-azbuka-192x192.png',
  siteURL + '/assets/sliki/bushava-azbuka-192x192-ios.png',
  siteURL + '/assets/sliki/bushava-azbuka-avijatichar.png',
  siteURL + '/assets/sliki/bushava-azbuka-boks.png',
  siteURL + '/assets/sliki/bushava-azbuka-cel.png',
  siteURL + '/assets/sliki/bushava-azbuka-chudo.png',
  siteURL + '/assets/sliki/bushava-azbuka-dupka.png',
  siteURL + '/assets/sliki/bushava-azbuka-dzid.png',
  siteURL + '/assets/sliki/bushava-azbuka-dzokej.png',
  siteURL + '/assets/sliki/bushava-azbuka-eho.png',
  siteURL + '/assets/sliki/bushava-azbuka-fitilj.png',
  siteURL + '/assets/sliki/bushava-azbuka-gjon.png',
  siteURL + '/assets/sliki/bushava-azbuka-gluv.png',
  siteURL + '/assets/sliki/bushava-azbuka-helikopter.png',
  siteURL + '/assets/sliki/bushava-azbuka-igla.png',
  siteURL + '/assets/sliki/bushava-azbuka-jama.png',
  siteURL + '/assets/sliki/bushava-azbuka-kavga.png',
  siteURL + '/assets/sliki/bushava-azbuka-kjebapche.png',
  siteURL + '/assets/sliki/bushava-azbuka-levuchar.png',
  siteURL + '/assets/sliki/bushava-azbuka-ljubov.png',
  siteURL + '/assets/sliki/bushava-azbuka-maler.png',
  siteURL + '/assets/sliki/bushava-azbuka-napor.png',
  siteURL + '/assets/sliki/bushava-azbuka-naslovna.png',
  siteURL + '/assets/sliki/bushava-azbuka-njujork.png',
  siteURL + '/assets/sliki/bushava-azbuka-ogledalo.png',
  siteURL + '/assets/sliki/bushava-azbuka-poklopka.png',
  siteURL + '/assets/sliki/bushava-azbuka-rendgen.png',
  siteURL + '/assets/sliki/bushava-azbuka-shega.png',
  siteURL + '/assets/sliki/bushava-azbuka-sudbina.png',
  siteURL + '/assets/sliki/bushava-azbuka-tvrdo.png',
  siteURL + '/assets/sliki/bushava-azbuka-ubava.png',
  siteURL + '/assets/sliki/bushava-azbuka-voda.png',
  siteURL + '/assets/sliki/bushava-azbuka-zabuna.png',
  siteURL + '/assets/sliki/bushava-azbuka-zhaba.png',
  siteURL + '/assets/free-serif/FreeSerif.woff',
  siteURL + '/assets/free-serif/FreeSerif.woff2',
  siteURL + '/assets/free-serif/FreeSerifBold.woff',
  siteURL + '/assets/free-serif/FreeSerifBold.woff2',
  siteURL + '/assets/free-serif/FreeSerifBoldItalic.woff',
  siteURL + '/assets/free-serif/FreeSerifBoldItalic.woff2'
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
