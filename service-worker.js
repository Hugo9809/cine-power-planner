/* eslint-env serviceworker */
const CACHE_NAME = 'cine-power-planner-v21';
const ASSETS = [
  './',
  './index.html',
  './impressum.html',
  './impressum-en.html',
  './impressum-es.html',
  './impressum-fr.html',
  './impressum-it.html',
  './datenschutz.html',
  './datenschutz-en.html',
  './datenschutz-es.html',
  './datenschutz-fr.html',
  './datenschutz-it.html',
  './style.css',
  './static-theme.js',
  './overview.css',
  './overview-print.css',
  './overview.js',
  './fonts.css',
  './Ubuntu/Ubuntu-Bold.ttf',
  './Ubuntu/Ubuntu-BoldItalic.ttf',
  './Ubuntu/Ubuntu-Italic.ttf',
  './Ubuntu/Ubuntu-Light.ttf',
  './Ubuntu/Ubuntu-LightItalic.ttf',
  './Ubuntu/Ubuntu-Medium.ttf',
  './Ubuntu/Ubuntu-MediumItalic.ttf',
  './Ubuntu/Ubuntu-Regular.ttf',
  './globalthis-polyfill.js',
  './script.js',
  './devices/index.js',
  './devices/cameras.js',
  './devices/monitors.js',
  './devices/video.js',
  './devices/fiz.js',
  './devices/batteries.js',
  './devices/batteryHotswaps.js',
  './devices/cages.js',
  './devices/chargers.js',
  './devices/gearList.js',
  './devices/wirelessReceivers.js',
  './translations.js',
  './storage.js',
  './normalizeData.js',
  './unifyPorts.js',
  './schema.json',
  './unicorns/celebrate.svg',
  './unicorns/sunglasses.svg',
  './unicorns/toy.svg',
  './unicorns/unicorn-2.svg',
  './unicorns/unicorn.svg',
  './icon.svg',
  './icon.png',
  './manifest.webmanifest',
  './lz-string.min.js',
  './vendor/lottie-light.min.js',
  './animated icons/cup.json',
  './animated icons/fox.json',
  './animated icons/heart.json',
  './animated icons/horn.json',
  './animated icons/mask.json',
  './animated icons/rainbow.json',
  './animated icons/rocking-horse.json',
  './animated icons/unicorn.json'
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
