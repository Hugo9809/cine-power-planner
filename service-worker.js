/* eslint-env serviceworker */
const CACHE_NAME = 'cine-power-planner-v1.0.10';
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
  './src/scripts/app-core-new-1.js',
  './src/scripts/app-core-new-2.js',
  './src/scripts/app-events.js',
  './src/scripts/app-session.js',
  './src/scripts/app-setups.js',
  './src/scripts/auto-gear-monitoring.js',
  './src/scripts/auto-gear-weight.js',
  './src/scripts/autosave-overlay.js',
  './src/scripts/globalthis-polyfill.js',
  './src/scripts/loader.js',
  './src/scripts/modules/core-shared.js',
  './src/scripts/modules/registry.js',
  './src/scripts/modules/offline.js',
  './src/scripts/modules/persistence.js',
  './src/scripts/modules/runtime.js',
  './src/scripts/modules/ui.js',
  './src/scripts/overview.js',
  './src/scripts/script.js',
  './src/scripts/static-theme.js',
  './src/scripts/storage.js',
  './src/scripts/translations.js',
  './src/scripts/modern-support-check.mjs',
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
  './legacy/scripts/app-core-new-1.js',
  './legacy/scripts/app-core-new-2.js',
  './legacy/scripts/app-events.js',
  './legacy/scripts/app-session.js',
  './legacy/scripts/app-setups.js',
  './legacy/scripts/auto-gear-monitoring.js',
  './legacy/scripts/auto-gear-weight.js',
  './legacy/scripts/autosave-overlay.js',
  './legacy/scripts/globalthis-polyfill.js',
  './legacy/scripts/loader.js',
  './legacy/scripts/modules/core-shared.js',
  './legacy/scripts/modules/registry.js',
  './legacy/scripts/modules/offline.js',
  './legacy/scripts/modules/persistence.js',
  './legacy/scripts/modules/runtime.js',
  './legacy/scripts/modules/ui.js',
  './legacy/scripts/modern-support-check.js',
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
  './animated icons 3/camera.json',
  './animated icons 3/director-chair.json',
  './animated icons 3/dog.json',
  './animated icons 3/fox.json',
  './animated icons 3/fox-2.json',
  './animated icons 3/fox-3.json',
  './animated icons 3/horse.json',
  './animated icons 3/mountains.json',
  './animated icons 3/movie-camera.json',
  './animated icons 3/pinata.json',
  './animated icons 3/script.json',
  './animated icons 3/video-camera.json',
  './src/icons/app-icon.svg',
  './src/icons/app-icon.png',
  './Icon Bluenew.svg',
  './Icon Pinknew.svg',
  './manifest.webmanifest',
  './tools/checkConsistency.js',
  './tools/cliHelp.js',
  './tools/findMissingAttributes.js',
  './tools/generateSchema.js',
  './tools/normalizeData.js',
  './tools/unifyPorts.js'
];

async function precacheAssets(cacheName, assets) {
  const cache = await caches.open(cacheName);

  try {
    await cache.addAll(assets);
    return;
  } catch (error) {
    console.warn('Precaching via cache.addAll failed, falling back to resilient mode.', error);
  }

  const missingAssets = [];

  await Promise.all(
    assets.map(async asset => {
      const request = new Request(asset);

      try {
        await cache.add(request);
        return;
      } catch (networkError) {
        let reusedFromExistingCache = false;

        try {
          const cachedResponse = await caches.match(request, { ignoreSearch: true });
          if (cachedResponse) {
            await cache.put(request, cachedResponse.clone());
            reusedFromExistingCache = true;
          }
        } catch (reuseError) {
          console.warn(`Unable to reuse cached response for ${asset}`, reuseError);
        }

        if (!reusedFromExistingCache) {
          missingAssets.push(asset);
          console.warn(`Failed to precache asset ${asset}`, networkError);
        }
      }
    })
  );

  if (missingAssets.length) {
    console.warn(
      'Service worker installed with missing cached assets. Offline support may be degraded until the next update.',
      missingAssets
    );
  }
}

if (typeof self !== 'undefined') {
  self.addEventListener('install', event => {
    event.waitUntil((async () => {
      try {
        await precacheAssets(CACHE_NAME, ASSETS);
      } catch (error) {
        console.error('Failed to precache assets during installation', error);
        throw error;
      }

      if (typeof self.skipWaiting === 'function') {
        await self.skipWaiting();
      }
    })());
  });

  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keys =>
        Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
      )
    );
    self.clients.claim();
  });

  function shouldBypassCache(request) {
    if (!request) {
      return false;
    }

    const { cache } = request;
    if (cache === 'reload' || cache === 'no-store') {
      return true;
    }

    const cacheControl = request.headers && request.headers.get('Cache-Control');
    if (cacheControl && /no-cache|max-age=0/i.test(cacheControl)) {
      return true;
    }

    const pragma = request.headers && request.headers.get('Pragma');
    if (pragma && /no-cache/i.test(pragma)) {
      return true;
    }

    return false;
  }

  self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
      return;
    }

    const isNavigationRequest = event.request.mode === 'navigate';

    const requestUrl = new URL(event.request.url);
    const isSameOrigin = requestUrl.origin === self.location.origin;
    const isAppIconRequest = isSameOrigin && requestUrl.pathname.includes('/src/icons/');
    const bypassCache = shouldBypassCache(event.request);
    if (isAppIconRequest) {
      event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        try {
          const response = await fetch(event.request, { cache: 'no-store' });
          if (response && response.ok) {
            await cache.put(event.request, response.clone());
          }
          return response;
        } catch (error) {
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          throw error;
        }
      })());
      return;
    }

    event.respondWith((async () => {
      const cacheMatchOptions = isNavigationRequest ? { ignoreSearch: true } : undefined;

      if (bypassCache) {
        try {
          const freshResponse = await fetch(event.request, { cache: 'no-store' });
          if (freshResponse && freshResponse.ok && isSameOrigin) {
            try {
              const cache = await caches.open(CACHE_NAME);
              await cache.put(event.request, freshResponse.clone());
            } catch (cacheError) {
              console.warn('Unable to store fresh response in cache', cacheError);
            }
          }
          if (freshResponse) {
            return freshResponse;
          }
        } catch (networkError) {
          const cachedFallback = await caches.match(event.request, cacheMatchOptions);
          if (cachedFallback) {
            return cachedFallback;
          }

          if (isNavigationRequest) {
            const cache = await caches.open(CACHE_NAME);
            const fallback = await cache.match('./index.html') || await cache.match('./');
            if (fallback) {
              return fallback;
            }
          }

          throw networkError;
        }
      }

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
