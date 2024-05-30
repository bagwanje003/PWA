var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.jpg',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] caching all the files');
    e.waitUntil(
        caches.open(cacheName).then((cache)  => {
            console.log('[service Worker] caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondwith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then (function (response) {
                returncaches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});