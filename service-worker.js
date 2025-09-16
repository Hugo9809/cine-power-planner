/* eslint-env serviceworker */
const CACHE_NAME = 'cine-power-planner-v16';
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
  './script.js',
  './devices/index.js',
  './devices/cameras.js',
  './devices/monitors.js',
  './devices/video.js',
  './devices/fiz.js',
  './devices/batteries.js',
  './devices/cages.js',
  './devices/gearList.js',
  './translations.js',
  './storage.js',
  './normalizeData.js',
  './unifyPorts.js',
  './icon.svg',
  './icon.png',
  './manifest.webmanifest',
  './lz-string.min.js'
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
