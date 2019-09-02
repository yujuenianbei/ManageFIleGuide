if ('function' === typeof importScripts) {
    importScripts('/third_party/workbox/workbox-v4.3.1/workbox-sw.js');

    workbox.setConfig({
        modulePathPrefix: '/third_party/workbox/workbox-v4.3.1/'
    });
    /* global workbox */
    if (workbox) {
        console.log('Workbox is loaded');

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([]);

        //   /* custom cache rules*/
        //   workbox.routing.registerNavigationRoute('/index.html', {
        //         blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
        //       });

        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg)$/,
            workbox.strategies.cacheFirst({
                cacheName: 'images',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

        const thirtyDays = 30 * 24 * 60 * 60;
        workbox.core.skipWaiting();
        workbox.core.clientsClaim();

        workbox.routing.registerRoute(
            '/',
            new workbox.strategies.StaleWhileRevalidate()
        );

        workbox.routing.registerRoute(
            new RegExp('\\.html$'),
            new workbox.strategies.NetworkFirst()
        );

        workbox.routing.registerRoute(
            new RegExp('/.\\.js$'),
            new workbox.strategies.StaleWhileRevalidate()
        );

        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            new workbox.strategies.StaleWhileRevalidate({
                cacheName: 'catalog',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: thirtyDays // 30 Days
                    })
                ]
            })
        );

        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            new workbox.strategies.CacheFirst({
                cacheName: 'images',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: thirtyDays // 30 Days
                    })
                ]
            })
        );

        workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

        self.addEventListener('fetch', (event) => {
            if (event.request.url === '/') {
                const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
                event.respondWith(staleWhileRevalidate.handle({ event }));
            }
        });

        // self.addEventListener('fetch', function(e) {
        //     console.log(e.request.url);
        //     e.respondWith(
        //       caches.match(e.request).then(function(response) {
        //         return response || fetch(e.request);
        //       })
        //     );
        //   });

    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }
}