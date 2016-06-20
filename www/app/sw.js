/**
 * Created by douglas on 17/06/16.
 */
var files = [
    // "index.html",
    "static/lib/material.indigo-blue.min.css",
    "static/styles.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en",
    "static/lib/material.min.js"

    // "js/lib/quagga.min.js"
];
// dev only
if (typeof files == 'undefined') {
    var files = [];
} else {
     files.push('./');
}

var CACHE_NAME = 'menorpreco-v1';

self.addEventListener('activate', function(event) {
    // console.log('[SW] Activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (CACHE_NAME.indexOf(cacheName) == -1) {
                        console.log('[SW] Delete cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('install', function(event){
    // console.log(' Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return Promise.all(
                files.map(function(file){

                    return cache.add(file);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
     // console.log(' fetch ' + event.request.url);
    if(/.jpg/.test(event.request.url)){
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request.clone());
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    // console.log('notification click: ', event);
    clients.openWindow('/');
});