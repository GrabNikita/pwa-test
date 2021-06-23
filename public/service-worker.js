const staticCacheName = 'pwa-test-static';
const staticCacheKeys = [
    '/',
    '/index.html',
    '/main.css',
    '/main.js',
    '/install-service-worker.js',
    '/service-worker.js',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/browserconfig.xml',
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/mstile-150x150.png',
    '/safari-pinned-tab.svg',
    '/site.webmanifest',
];
const fetchCacheName = 'pwa-test-fetch';
const fetchCacheKeys = [
    '/data/tasks.json',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        Promise.all([
            caches.open(staticCacheName).then(cache => {
                return cache.addAll(staticCacheKeys);
            }).catch(error => {
                console.error('error on open static cache', error);
            }),
            caches.open(fetchCacheName).then(cache => {
                return cache.addAll(fetchCacheKeys);
            }).catch(error => {
                console.error('error on open fetch cache', error);
            }),
        ])
    );
});

self.addEventListener('fetch', function (event) {
    let request = event.request;
    if (request.method === 'GET') {
        event.respondWith(
            Promise.all([
                caches.open(staticCacheName),
                caches.open(fetchCacheName),
            ]).then(results => {
                let staticCache = results[0];
                let fetchCache = results[1];
                return staticCache.match(request).then(staticCacheResponse => {
                    return staticCacheResponse || fetch(request).then(realFetchResponse => {
                        return fetchCache.match(request).then(fetchCacheResponse => {
                            fetchCache.put(request, realFetchResponse.clone());
                            return realFetchResponse;
                        }).catch(error => {
                            console.error('fetch cache match error', error);
                            return realFetchResponse;
                        });
                    }).catch(error => {
                        console.log('real fetch error', error);
                        return fetchCache.match(request);
                    });
                }).catch(error => {
                    console.log('fetch error', error);
                    return staticCache.match(request);
                });
            }).catch(error => {
                console.log('open caches error', error);
                return fetch(request);
            })
        );
    }
});