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
  './web/styles/style.css',
  './web/styles/overview.css',
  './web/styles/overview-print.css',
  './web/styles/fonts.css',
  './web/scripts/static-theme.js',
  './web/scripts/overview.js',
  './web/scripts/globalthis-polyfill.js',
  './web/scripts/script.js',
  './web/scripts/storage.js',
  './web/scripts/translations.js',
  './web/vendor/lz-string.min.js',
  './web/vendor/lottie-light.min.js',
  './web/data/index.js',
  './web/data/schema.json',
  './web/data/devices/index.js',
  './web/data/devices/cameras.js',
  './web/data/devices/monitors.js',
  './web/data/devices/video.js',
  './web/data/devices/fiz.js',
  './web/data/devices/batteries.js',
  './web/data/devices/batteryHotswaps.js',
  './web/data/devices/cages.js',
  './web/data/devices/chargers.js',
  './web/data/devices/gearList.js',
  './web/data/devices/wirelessReceivers.js',
  './web/fonts/Ubuntu/Ubuntu-Bold.ttf',
  './web/fonts/Ubuntu/Ubuntu-BoldItalic.ttf',
  './web/fonts/Ubuntu/Ubuntu-Italic.ttf',
  './web/fonts/Ubuntu/Ubuntu-Light.ttf',
  './web/fonts/Ubuntu/Ubuntu-LightItalic.ttf',
  './web/fonts/Ubuntu/Ubuntu-Medium.ttf',
  './web/fonts/Ubuntu/Ubuntu-MediumItalic.ttf',
  './web/fonts/Ubuntu/Ubuntu-Regular.ttf',
  './web/illustrations/unicorns/celebrate.svg',
  './web/illustrations/unicorns/sunglasses.svg',
  './web/illustrations/unicorns/toy.svg',
  './web/illustrations/unicorns/unicorn-2.svg',
  './web/illustrations/unicorns/unicorn.svg',
  './web/animations/cat.json',
  './web/animations/cup.json',
  './web/animations/cupcake.json',
  './web/animations/flamingo.json',
  './web/animations/float.json',
  './web/animations/float-2.json',
  './web/animations/fox.json',
  './web/animations/heart.json',
  './web/animations/horn.json',
  './web/animations/invitation.json',
  './web/animations/mask.json',
  './web/animations/rainbow.json',
  './web/animations/rocking-horse.json',
  './web/animations/slippers.json',
  './web/animations/sunglasses.json',
  './web/animations/unicorn.json',
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
