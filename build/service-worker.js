
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('cash-pwa-cih-v1')
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
        ).then(() => console.log('Cashed information'))
        .catch(e => console.error(`${e.name} - ${e.message}`))
    )
})

// self.addEventListener('activate', (event) => {
    
// })

self.addEventListener('fetch', (event) => {
    console.log(event.request.url);
})