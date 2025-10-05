/* eslint-env serviceworker */
const SERVICE_WORKER_SCOPE =
  (typeof self !== 'undefined' && self) ||
  (typeof globalThis !== 'undefined' && globalThis) ||
  null;

function resolveCacheVersion() {
  if (!SERVICE_WORKER_SCOPE || (typeof SERVICE_WORKER_SCOPE !== 'object' && typeof SERVICE_WORKER_SCOPE !== 'function')) {
    return null;
  }

  try {
    if (typeof SERVICE_WORKER_SCOPE.cineCoreShared === 'object' && SERVICE_WORKER_SCOPE.cineCoreShared) {
      const sharedVersion = SERVICE_WORKER_SCOPE.cineCoreShared.APP_VERSION;
      if (typeof sharedVersion === 'string' && sharedVersion) {
        return sharedVersion;
      }
    }
  } catch (sharedReadError) {
    console.warn('Unable to read APP_VERSION from cineCoreShared.', sharedReadError);
  }

  try {
    const directVersion = SERVICE_WORKER_SCOPE.APP_VERSION;
    if (typeof directVersion === 'string' && directVersion) {
      return directVersion;
    }
  } catch (directReadError) {
    console.warn('Unable to read APP_VERSION from global scope.', directReadError);
  }

  return null;
}

let CACHE_VERSION = null;

if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE.importScripts === 'function') {
  try {
    SERVICE_WORKER_SCOPE.importScripts('./src/scripts/modules/core-shared.js');
    CACHE_VERSION = resolveCacheVersion();
  } catch (versionImportError) {
    console.warn('Falling back to bundled cache version after importScripts failure.', versionImportError);
  }
}

if (!CACHE_VERSION) {
  CACHE_VERSION = '1.0.14';
}

const CACHE_NAME = `cine-power-planner-v${CACHE_VERSION}`;

try {
  if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE === 'object') {
    SERVICE_WORKER_SCOPE.CINE_CACHE_NAME = CACHE_NAME;
  }
} catch (cacheExposeError) {
  console.warn('Unable to expose computed cache name for diagnostics.', cacheExposeError);
}
function loadServiceWorkerAssets() {
  if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE.importScripts === 'function') {
    try {
      SERVICE_WORKER_SCOPE.importScripts('./service-worker-assets.js');
      const importedAssets = SERVICE_WORKER_SCOPE && SERVICE_WORKER_SCOPE.SERVICE_WORKER_ASSETS;
      if (Array.isArray(importedAssets) && importedAssets.length) {
        return importedAssets.slice();
      }
    } catch (assetImportError) {
      console.warn('Unable to load service worker assets via importScripts.', assetImportError);
    }
  }

  if (typeof require === 'function') {
    try {
      const manifestModule = require('./service-worker-assets.js');
      if (Array.isArray(manifestModule) && manifestModule.length) {
        return manifestModule.slice();
      }
      if (manifestModule && Array.isArray(manifestModule.SERVICE_WORKER_ASSETS)) {
        return manifestModule.SERVICE_WORKER_ASSETS.slice();
      }
    } catch (assetRequireError) {
      console.warn('Unable to load service worker assets via require.', assetRequireError);
    }
  }

  return null;
}

let ASSETS = loadServiceWorkerAssets();

if (!Array.isArray(ASSETS) || ASSETS.length === 0) {
  console.warn('Falling back to an empty asset list. Offline support may be degraded.');
  ASSETS = ['./'];
}

function shouldBypassCache(request, requestUrl) {
  if (!request) {
    return false;
  }

  try {
    if (
      requestUrl &&
      typeof requestUrl === 'object' &&
      requestUrl.searchParams &&
      typeof requestUrl.searchParams.has === 'function' &&
      requestUrl.searchParams.has('forceReload')
    ) {
      return true;
    }
  } catch (forceReloadCheckError) {
    console.warn('Unable to evaluate forceReload search parameter for cache bypass.', forceReloadCheckError);
  }

  const { cache } = request;
  if (cache === 'reload' || cache === 'no-store') {
    return true;
  }

  const cacheControl = request.headers && request.headers.get && request.headers.get('Cache-Control');
  if (cacheControl && /no-cache|max-age=0/i.test(cacheControl)) {
    return true;
  }

  const pragma = request.headers && request.headers.get && request.headers.get('Pragma');
  if (pragma && /no-cache/i.test(pragma)) {
    return true;
  }

  return false;
}

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

  self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
      return;
    }

    const isNavigationRequest = event.request.mode === 'navigate';

    const requestUrl = new URL(event.request.url);
    const isSameOrigin = requestUrl.origin === self.location.origin;
    const isAppIconRequest = isSameOrigin && requestUrl.pathname.includes('/src/icons/');
    const bypassCache = shouldBypassCache(event.request, requestUrl);
    const shouldIgnoreSearch =
      isNavigationRequest && (!requestUrl.searchParams || !requestUrl.searchParams.has('forceReload'));
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
      const cacheMatchOptions = shouldIgnoreSearch ? { ignoreSearch: true } : undefined;

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
  module.exports = {
    ASSETS,
    CACHE_NAME,
    __private__: { shouldBypassCache },
  };
}
