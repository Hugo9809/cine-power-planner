/* eslint-env serviceworker */
const CACHE_NAME = 'cine-power-planner-v25';
const ASSETS = [
  './',
  './index.html',
  './public/legal/impressum.html',
  './public/legal/impressum-en.html',
  './public/legal/impressum-es.html',
  './public/legal/impressum-fr.html',
  './public/legal/impressum-it.html',
  './public/legal/datenschutz.html',
  './public/legal/datenschutz-en.html',
  './public/legal/datenschutz-es.html',
  './public/legal/datenschutz-fr.html',
  './public/legal/datenschutz-it.html',
  './public/styles/style.css',
  './public/styles/overview.css',
  './public/styles/overview-print.css',
  './public/styles/fonts.css',
  './public/scripts/static-theme.js',
  './public/scripts/overview.js',
  './public/scripts/globalthis-polyfill.js',
  './public/scripts/script.js',
  './public/scripts/storage.js',
  './public/scripts/translations.js',
  './public/vendor/lz-string.min.js',
  './public/vendor/lottie-light.min.js',
  './public/data/index.js',
  './public/data/schema.json',
  './public/data/devices/index.js',
  './public/data/devices/cameras.js',
  './public/data/devices/monitors.js',
  './public/data/devices/video.js',
  './public/data/devices/fiz.js',
  './public/data/devices/batteries.js',
  './public/data/devices/batteryHotswaps.js',
  './public/data/devices/cages.js',
  './public/data/devices/chargers.js',
  './public/data/devices/gearList.js',
  './public/data/devices/wirelessReceivers.js',
  './public/fonts/Ubuntu/Ubuntu-Bold.ttf',
  './public/fonts/Ubuntu/Ubuntu-BoldItalic.ttf',
  './public/fonts/Ubuntu/Ubuntu-Italic.ttf',
  './public/fonts/Ubuntu/Ubuntu-Light.ttf',
  './public/fonts/Ubuntu/Ubuntu-LightItalic.ttf',
  './public/fonts/Ubuntu/Ubuntu-Medium.ttf',
  './public/fonts/Ubuntu/Ubuntu-MediumItalic.ttf',
  './public/fonts/Ubuntu/Ubuntu-Regular.ttf',
  './public/illustrations/unicorns/celebrate.svg',
  './public/illustrations/unicorns/sunglasses.svg',
  './public/illustrations/unicorns/toy.svg',
  './public/illustrations/unicorns/unicorn-2.svg',
  './public/illustrations/unicorns/unicorn.svg',
  './public/animations/cat.json',
  './public/animations/cup.json',
  './public/animations/cupcake.json',
  './public/animations/flamingo.json',
  './public/animations/float.json',
  './public/animations/float-2.json',
  './public/animations/fox.json',
  './public/animations/heart.json',
  './public/animations/horn.json',
  './public/animations/invitation.json',
  './public/animations/mask.json',
  './public/animations/rainbow.json',
  './public/animations/rocking-horse.json',
  './public/animations/slippers.json',
  './public/animations/sunglasses.json',
  './public/animations/unicorn.json',
  './public/icons/app-icon.svg',
  './public/icons/app-icon.png',
  './public/manifest.webmanifest',
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
