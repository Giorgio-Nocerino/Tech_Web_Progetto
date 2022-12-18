let cacheName = 'Tech_Web_Progetto';
let filesToCache = [
    'templates/HorrorMovieland.html',
    'templates/LoginHML.html',
    'templates/SignupHML.html',
    'templates/Account.html',
    'templates/Manual.html',
    'templates/Movie1.html',
    'templates/Prepage.html',
    'static/stylesheet/Style.css',
    'static/stylesheet/AccountStyle.css',
    'static/stylesheet/LoginStyle.css',
    'static/stylesheet/SignupStyle.css',
    'static/stylesheet/ManualStyle.css',
    'static/stylesheet/MovieStyle.css',
    'static/js/Carousel.js',
    'static/js/SearchMovies.js',
    'static/js/main.js'
];
/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
/* Service worker activated */
self.addEventListener('activate', (e) => {
    console.log("Service worker is activated");
});

