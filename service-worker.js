/* eslint-env serviceworker */
const CACHE_NAME = 'cine-power-planner-v24';
const ASSETS = [
  './',
  './index.html',
  './legal/impressum.html',
  './legal/impressum-en.html',
  './legal/impressum-es.html',
  './legal/impressum-fr.html',
  './legal/impressum-it.html',
  './legal/datenschutz.html',
  './legal/datenschutz-en.html',
  './legal/datenschutz-es.html',
  './legal/datenschutz-fr.html',
  './legal/datenschutz-it.html',
  './assets/css/style.css',
  './assets/css/overview.css',
  './assets/css/overview-print.css',
  './assets/css/fonts.css',
  './assets/js/static-theme.js',
  './assets/js/overview.js',
  './assets/js/globalthis-polyfill.js',
  './assets/js/script.js',
  './assets/js/storage.js',
  './assets/js/translations.js',
  './assets/vendor/lz-string.min.js',
  './assets/vendor/lottie-light.min.js',
  './assets/data/index.js',
  './assets/data/schema.json',
  './assets/data/devices/index.js',
  './assets/data/devices/cameras.js',
  './assets/data/devices/monitors.js',
  './assets/data/devices/video.js',
  './assets/data/devices/fiz.js',
  './assets/data/devices/batteries.js',
  './assets/data/devices/batteryHotswaps.js',
  './assets/data/devices/cages.js',
  './assets/data/devices/chargers.js',
  './assets/data/devices/gearList.js',
  './assets/data/devices/wirelessReceivers.js',
  './assets/fonts/Ubuntu/Ubuntu-Bold.ttf',
  './assets/fonts/Ubuntu/Ubuntu-BoldItalic.ttf',
  './assets/fonts/Ubuntu/Ubuntu-Italic.ttf',
  './assets/fonts/Ubuntu/Ubuntu-Light.ttf',
  './assets/fonts/Ubuntu/Ubuntu-LightItalic.ttf',
  './assets/fonts/Ubuntu/Ubuntu-Medium.ttf',
  './assets/fonts/Ubuntu/Ubuntu-MediumItalic.ttf',
  './assets/fonts/Ubuntu/Ubuntu-Regular.ttf',
  './assets/illustrations/unicorns/celebrate.svg',
  './assets/illustrations/unicorns/sunglasses.svg',
  './assets/illustrations/unicorns/toy.svg',
  './assets/illustrations/unicorns/unicorn-2.svg',
  './assets/illustrations/unicorns/unicorn.svg',
  './assets/animations/cat.json',
  './assets/animations/cup.json',
  './assets/animations/cupcake.json',
  './assets/animations/flamingo.json',
  './assets/animations/float.json',
  './assets/animations/float-2.json',
  './assets/animations/fox.json',
  './assets/animations/heart.json',
  './assets/animations/horn.json',
  './assets/animations/invitation.json',
  './assets/animations/mask.json',
  './assets/animations/rainbow.json',
  './assets/animations/rocking-horse.json',
  './assets/animations/slippers.json',
  './assets/animations/sunglasses.json',
  './assets/animations/unicorn.json',
  './icon.svg',
  './icon.png',
  './manifest.webmanifest',
  './tools/checkConsistency.js',
  './tools/cliHelp.js',
  './tools/findMissingAttributes.js',
  './tools/generateSchema.js',
  './tools/normalizeData.js',
  './tools/unifyPorts.js'
];

if (typeof self !== 'undefined') {
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
  });

  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keys =>
        Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
      )
    );
    self.clients.claim();
  });

  self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
      return;
    }

    const isNavigationRequest = event.request.mode === 'navigate';

    event.respondWith((async () => {
      const cacheMatchOptions = isNavigationRequest ? { ignoreSearch: true } : undefined;
      const cachedResponse = await caches.match(event.request, cacheMatchOptions);
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        return await fetch(event.request);
      } catch (error) {
        if (!isNavigationRequest) {
          throw error;
        }

        const cache = await caches.open(CACHE_NAME);
        const offlineShell = await cache.match('./index.html') || await cache.match('./');
        if (offlineShell) {
          return offlineShell;
        }

        throw error;
      }
    })());
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ASSETS, CACHE_NAME };
}
