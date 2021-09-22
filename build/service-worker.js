const cashVersion = 'cash-pwa-cih-v2'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cashVersion)
        .then(cache => cache.addAll(
            [
                './index.html',
                './pc.html',
                './css/style.min.css',
                './css/preloader.css',
                './js/index.min.js',
                './js/accordeon.min.js',
                './js/feedback-form.min.js',
                './js/scroll-navigation.min.js',
                './js/scroll.min.js',
                './js/slider-about.min.js',
                './js/slider-menu.min.js',
                './images/Home_Page_Logo.png',
                './images/Home_Page_Logo.webp',
                './fonts/Ethnocentric-Regular.ttf',
                './fonts/Inter-ExtraLight.ttf',
                './fonts/Inter-Regular.ttf',
                './fonts/Manrope-Bold.ttf',
                './fonts/Manrope-Light.ttf',
                './fonts/Manrope-Medium.ttf',
                './webfonts/fa-brands-400.ttf',
                './webfonts/fa-regular-400.ttf',
                './webfonts/fa-solid-900.ttf'

            ])
        ).then(() => console.log('Caching completed successfully'))
        .catch(e => console.error(`${e.name} - ${e.message}`))
    )
})

self.addEventListener('activate', () => {
    caches.keys()
    .then(keyList => {
        return Promise.all(keyList
            .filter(item => item !== cashVersion)
            .map(item => caches.delete(item)))
    })
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response ?? fetch(event.request))
        .catch(error => console.error(`${error.name} : ${error.message} - Отсутствует сеть!`))
    )
})