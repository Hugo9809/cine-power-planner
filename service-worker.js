/* eslint-env serviceworker */
const CACHE_NAME = 'camera-power-planner-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './overview.css',
  './overview-print.css',
  './script.js',
  './data.js',
  './translations.js',
  './storage.js',
  './normalizeData.js',
  './unifyPorts.js',
  './icon.svg',
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
