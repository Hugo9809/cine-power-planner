/* eslint-env serviceworker */
const CACHE_NAME = 'cine-power-planner-v26';
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
  './src/styles/style.css',
  './src/styles/overview.css',
  './src/styles/overview-print.css',
  './src/styles/fonts.css',
  './src/scripts/static-theme.js',
  './src/scripts/overview.js',
  './src/scripts/globalthis-polyfill.js',
  './src/scripts/script.js',
  './src/scripts/storage.js',
  './src/scripts/translations.js',
  './src/scripts/loader.js',
  './src/vendor/lz-string.min.js',
  './src/vendor/lottie-light.min.js',
  './legacy/polyfills/core-js-bundle.min.js',
  './legacy/polyfills/regenerator-runtime.js',
  './src/data/index.js',
  './legacy/data/index.js',
  './src/data/schema.json',
  './src/data/devices/index.js',
  './src/data/devices/cameras.js',
  './src/data/devices/monitors.js',
  './src/data/devices/video.js',
  './src/data/devices/fiz.js',
  './src/data/devices/batteries.js',
  './src/data/devices/batteryHotswaps.js',
  './src/data/devices/cages.js',
  './src/data/devices/chargers.js',
  './src/data/devices/gearList.js',
  './src/data/devices/wirelessReceivers.js',
  './legacy/data/devices/index.js',
  './legacy/data/devices/cameras.js',
  './legacy/data/devices/monitors.js',
  './legacy/data/devices/video.js',
  './legacy/data/devices/fiz.js',
  './legacy/data/devices/batteries.js',
  './legacy/data/devices/batteryHotswaps.js',
  './legacy/data/devices/cages.js',
  './legacy/data/devices/chargers.js',
  './legacy/data/devices/gearList.js',
  './legacy/data/devices/wirelessReceivers.js',
  './legacy/scripts/globalthis-polyfill.js',
  './legacy/scripts/overview.js',
  './legacy/scripts/script.js',
  './legacy/scripts/static-theme.js',
  './legacy/scripts/storage.js',
  './legacy/scripts/translations.js',
  './src/fonts/Ubuntu/Ubuntu-Bold.ttf',
  './src/fonts/Ubuntu/Ubuntu-BoldItalic.ttf',
  './src/fonts/Ubuntu/Ubuntu-Italic.ttf',
  './src/fonts/Ubuntu/Ubuntu-Light.ttf',
  './src/fonts/Ubuntu/Ubuntu-LightItalic.ttf',
  './src/fonts/Ubuntu/Ubuntu-Medium.ttf',
  './src/fonts/Ubuntu/Ubuntu-MediumItalic.ttf',
  './src/fonts/Ubuntu/Ubuntu-Regular.ttf',
  './src/illustrations/unicorns/celebrate.svg',
  './src/illustrations/unicorns/sunglasses.svg',
  './src/illustrations/unicorns/toy.svg',
  './src/illustrations/unicorns/unicorn-2.svg',
  './src/illustrations/unicorns/unicorn.svg',
  './src/animations/cat.json',
  './src/animations/cup.json',
  './src/animations/cupcake.json',
  './src/animations/flamingo.json',
  './src/animations/float.json',
  './src/animations/float-2.json',
  './src/animations/fox.json',
  './src/animations/heart.json',
  './src/animations/horn.json',
  './src/animations/invitation.json',
  './src/animations/mask.json',
  './src/animations/rainbow.json',
  './src/animations/rocking-horse.json',
  './src/animations/slippers.json',
  './src/animations/sunglasses.json',
  './src/animations/unicorn.json',
  './src/icons/app-icon.svg',
  './src/icons/app-icon.png',
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
