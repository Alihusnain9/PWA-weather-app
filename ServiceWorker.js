const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache)
            })

    )
});

//Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

//Activate the sw
self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            }))
        )
    )
})


// const CACHE_NAME = "version-1";
// const urlsToCache = ['index.html', 'offline.html'];

// const self = this;

// // Install SW
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log('Opened cache');
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });

// // Listen for requests
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 // If the requested resource is found in cache, return it
//                 if (response) {
//                     return response;
//                 }
//                 // If the requested resource is not in cache, fetch it from the network
//                 return fetch(event.request)
//                     .then((response) => {
//                         // Clone the response to store in cache
//                         const clonedResponse = response.clone();
//                         caches.open(CACHE_NAME)
//                             .then((cache) => {
//                                 cache.put(event.request, clonedResponse);
//                             });
//                         return response;
//                     })
//                     .catch(() => caches.match('offline.html')); // Return the offline page if fetching fails
//             })
//     );
// });

// // Activate the sw
// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [CACHE_NAME];

//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if (!cacheWhitelist.includes(cacheName)) {
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     );
// });
