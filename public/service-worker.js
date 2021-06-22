const cacheName = 'pwa-test';
const filesToCache = [
    '/',
    '/index.html',
    '/main.css',
    '/main.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(
            cache => {
                return cache.addAll(filesToCache);
            },
            error => {
                console.error('error on open cache');
            }
        )
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(
            response => {
                return response || fetch(event.request);
            },
            error => {
                console.error('error on match request to cache');
            }
        )
    );
});