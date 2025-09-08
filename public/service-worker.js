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
  './js/overview.js',
  './js/storage.js',
  './js/lz-string.min.js',
  './devices/index.js',
  './devices/cameras.js',
  './devices/monitors.js',
  './devices/video.js',
  './devices/fiz.js',
  './devices/batteries.js',
  './devices/batteryHotswaps.js',
  './devices/cages.js',
  './devices/gearList.js',
  './devices/wirelessReceivers.js',
  './translations.js',
  './schema.json',
  './icon.svg',
  './icon.png',
  './manifest.webmanifest'
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
