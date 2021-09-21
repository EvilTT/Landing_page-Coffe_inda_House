const cashName = 'cash-pwa-cih-v1'

self.addEventListener('install', (event) => {
    event.waithUntil(
        caches.open(cashName)
        .then(cache => cache.addAll(
            [
                '/index.html',
                '/pc.html',
                'css/style.min.css',
                '/css/preloader.css',
                '/js/index.min.js',
                '/js/accordeon.min.js',
                '/js/feedback-form.min.js',
                '/js/scroll-navigation.min.js',
                '/js/scroll.min.js',
                '/js/slider-about.min.js',
                '/js/slider-menu.min.js',
                '/images/',
                '/fonts',
                '/webfonts'
            ])
        ).then(() => console.log('Cashed information'))
        .catch(e => console.warn(`${e.name} - ${e.message}`))
    )
})

// self.addEventListener('activate', (event) => {
    
// })

self.addEventListener('fetch', (event) => {
    console.log(event.request.url);
})