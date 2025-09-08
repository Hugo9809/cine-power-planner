/* eslint-env serviceworker */
const CACHE_NAME = 'camera-power-planner-v15';
const ASSETS = [
  './',
  './index.html',
  './impressum.html',
  './datenschutz.html',
  './styles/style.css',
  './styles/overview.css',
  './styles/overview-print.css',
  './js/overview.js',
  './styles/fonts.css',
  './Ubuntu/Ubuntu-Bold.ttf',
  './Ubuntu/Ubuntu-BoldItalic.ttf',
  './Ubuntu/Ubuntu-Italic.ttf',
  './Ubuntu/Ubuntu-Light.ttf',
  './Ubuntu/Ubuntu-LightItalic.ttf',
  './Ubuntu/Ubuntu-Medium.ttf',
  './Ubuntu/Ubuntu-MediumItalic.ttf',
  './Ubuntu/Ubuntu-Regular.ttf',
  './js/script.js',
  './js/devices/index.js',
  './js/devices/cameras.js',
  './js/devices/monitors.js',
  './js/devices/video.js',
  './js/devices/fiz.js',
  './js/devices/batteries.js',
  './js/devices/cages.js',
  './js/devices/gearList.js',
  './js/devices/batteryHotswaps.js',
  './js/devices/wirelessReceivers.js',
  './js/translations.js',
  './js/storage.js',
  './icon.svg',
  './icon.png',
  './manifest.webmanifest',
  './schema.json',
  './js/lz-string.min.js',
  './js/globalthis-polyfill.js'
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
    event.respondWith(
      caches.match(event.request).then(resp => resp || fetch(event.request))
    );
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ASSETS, CACHE_NAME };
}
