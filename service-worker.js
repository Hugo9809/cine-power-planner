/* eslint-env serviceworker */
const SERVICE_WORKER_SCOPE =
  (typeof self !== 'undefined' && self) ||
  (typeof globalThis !== 'undefined' && globalThis) ||
  null;

const LOG_HISTORY_LIMIT = 50;

function sanitizeLogDetail(detail, seen = new WeakSet()) {
  if (detail === null || typeof detail === 'undefined') {
    return null;
  }

  if (seen && typeof detail === 'object') {
    if (seen.has(detail)) {
      return '[Circular]';
    }
    try {
      seen.add(detail);
    } catch (error) {
      void error;
    }
  }

  if (detail instanceof Error) {
    return {
      name: detail.name || 'Error',
      message: detail.message || '',
      stack: typeof detail.stack === 'string' ? detail.stack : null,
    };
  }

  const type = typeof detail;
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return detail;
  }

  if (type === 'bigint') {
    try {
      return detail.toString();
    } catch (error) {
      void error;
      return '[unserializable bigint]';
    }
  }

  if (type === 'symbol' || type === 'function') {
    return String(detail);
  }

  if (Array.isArray(detail)) {
    const slice = detail.slice(0, 20);
    return slice.map(item => sanitizeLogDetail(item, seen));
  }

  if (!detail || type !== 'object') {
    return detail;
  }

  try {
    const clone = {};
    const keys = Object.keys(detail).slice(0, 20);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      clone[key] = sanitizeLogDetail(detail[key], seen);
    }
    return clone;
  } catch (error) {
    void error;
    try {
      return JSON.parse(JSON.stringify(detail));
    } catch (stringifyError) {
      void stringifyError;
      return String(detail);
    }
  }
}

function ensureDiagnosticState() {
  if (!SERVICE_WORKER_SCOPE || (typeof SERVICE_WORKER_SCOPE !== 'object' && typeof SERVICE_WORKER_SCOPE !== 'function')) {
    return null;
  }

  try {
    if (!SERVICE_WORKER_SCOPE.__cineSWDiagnostics || typeof SERVICE_WORKER_SCOPE.__cineSWDiagnostics !== 'object') {
      SERVICE_WORKER_SCOPE.__cineSWDiagnostics = {
        history: [],
        lastEntry: null,
      };
    }
    return SERVICE_WORKER_SCOPE.__cineSWDiagnostics;
  } catch (error) {
    void error;
    return null;
  }
}

function outputToConsole(level, message, detail) {
  if (typeof console === 'undefined' || !console) {
    return;
  }

  const method = typeof console[level] === 'function' ? console[level] : console.log;
  if (typeof method !== 'function') {
    return;
  }

  const prefix = `[cine-sw] ${message}`;
  try {
    if (typeof detail === 'undefined') {
      method.call(console, prefix);
    } else {
      method.call(console, prefix, detail);
    }
  } catch (error) {
    void error;
  }
}

function recordLogEntry(level, message, detail) {
  const timestamp = Date.now();
  let isoTimestamp = '';
  try {
    isoTimestamp = new Date(timestamp).toISOString();
  } catch (error) {
    void error;
    isoTimestamp = String(timestamp);
  }

  const entry = {
    level,
    message,
    timestamp,
    isoTimestamp,
    detail: sanitizeLogDetail(detail),
  };

  const diagnostics = ensureDiagnosticState();
  if (diagnostics && diagnostics.history) {
    diagnostics.history.push(entry);
    while (diagnostics.history.length > LOG_HISTORY_LIMIT) {
      diagnostics.history.shift();
    }
    diagnostics.lastEntry = entry;
  }

  outputToConsole(level, `${isoTimestamp} ${message}`, detail);

  return entry;
}

const serviceWorkerLog = {
  info(message, detail) {
    return recordLogEntry('info', message, detail);
  },
  warn(message, detail) {
    return recordLogEntry('warn', message, detail);
  },
  error(message, detail) {
    return recordLogEntry('error', message, detail);
  },
};

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
    serviceWorkerLog.warn('Unable to read APP_VERSION from cineCoreShared.', sharedReadError);
  }

  try {
    const directVersion = SERVICE_WORKER_SCOPE.APP_VERSION;
    if (typeof directVersion === 'string' && directVersion) {
      return directVersion;
    }
  } catch (directReadError) {
    serviceWorkerLog.warn('Unable to read APP_VERSION from global scope.', directReadError);
  }

  return null;
}

let CACHE_VERSION = null;

  if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE.importScripts === 'function') {
    try {
      SERVICE_WORKER_SCOPE.importScripts('./src/scripts/modules/core-shared.js');
      CACHE_VERSION = resolveCacheVersion();
    } catch (versionImportError) {
      serviceWorkerLog.warn('Falling back to bundled cache version after importScripts failure.', versionImportError);
    }
  }

if (!CACHE_VERSION) {
CACHE_VERSION = '1.0.21';
}

const CACHE_NAME = `cine-power-planner-v${CACHE_VERSION}`;

try {
  if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE === 'object') {
    SERVICE_WORKER_SCOPE.CINE_CACHE_NAME = CACHE_NAME;
  }
} catch (cacheExposeError) {
  serviceWorkerLog.warn('Unable to expose computed cache name for diagnostics.', cacheExposeError);
}

const diagnosticsState = ensureDiagnosticState();
if (diagnosticsState && typeof diagnosticsState === 'object') {
  diagnosticsState.cacheName = CACHE_NAME;
  diagnosticsState.cacheVersion = CACHE_VERSION;
}

try {
  if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE === 'object') {
    SERVICE_WORKER_SCOPE.cineSWLog = serviceWorkerLog;
  }
} catch (logExposeError) {
  serviceWorkerLog.warn('Unable to expose service worker logger on global scope.', logExposeError);
}

async function waitForActivationState() {
  if (typeof self === 'undefined' || !self) {
    return;
  }

  const { registration } = self;
  if (!registration) {
    return;
  }

  const currentScriptUrl = (self.location && self.location.href) || null;

  const possibleWorkers = [registration.installing, registration.waiting, registration.active].filter(
    worker => worker
  );

  const candidateWorker = possibleWorkers.find(worker => {
    try {
      return worker && worker.scriptURL === currentScriptUrl;
    } catch (error) {
      serviceWorkerLog.warn('Unable to inspect worker script URL while waiting for activation.', error);
      return false;
    }
  });

  const targetWorker = candidateWorker || registration.active;

  if (!targetWorker || typeof targetWorker.state !== 'string') {
    return;
  }

  if (targetWorker.state === 'activated') {
    return;
  }

  await new Promise(resolve => {
    let timeoutId = null;

    const cleanup = () => {
      if (timeoutId !== null) {
        try {
          clearTimeout(timeoutId);
        } catch (error) {
          serviceWorkerLog.warn('Unable to clear activation wait timeout.', error);
        }
        timeoutId = null;
      }
      try {
        targetWorker.removeEventListener('statechange', handleStateChange);
      } catch (error) {
        serviceWorkerLog.warn('Unable to remove activation statechange listener.', error);
      }
    };

    const handleStateChange = () => {
      if (targetWorker.state === 'activated') {
        cleanup();
        resolve();
      }
    };

    try {
      targetWorker.addEventListener('statechange', handleStateChange);
    } catch (error) {
      serviceWorkerLog.warn('Unable to observe activation state changes.', error);
      resolve();
      return;
    }

    timeoutId = setTimeout(() => {
      serviceWorkerLog.warn('Activation wait timed out. Proceeding without confirmed activation.');
      cleanup();
      resolve();
    }, 1000);

    handleStateChange();
  });
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
      serviceWorkerLog.warn('Unable to load service worker assets via importScripts.', assetImportError);
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
      serviceWorkerLog.warn('Unable to load service worker assets via require.', assetRequireError);
    }
  }

  return null;
}

let ASSETS = loadServiceWorkerAssets();

if (!Array.isArray(ASSETS) || ASSETS.length === 0) {
  serviceWorkerLog.warn('Falling back to an empty asset list. Offline support may be degraded.');
  ASSETS = ['./'];
}

function scheduleCachePut(event, request, response, errorMessage, cachePromiseOverride) {
  if (
    !response ||
    !response.ok ||
    typeof caches === 'undefined' ||
    !caches ||
    typeof caches.open !== 'function'
  ) {
    return;
  }

  let responseForCache;

  try {
    responseForCache = response.clone();
  } catch (cloneError) {
    serviceWorkerLog.warn('Unable to clone response for cache update.', cloneError);
    return;
  }

  const performCachePut = async () => {
    try {
      const cachePromise =
        cachePromiseOverride && typeof cachePromiseOverride.then === 'function'
          ? cachePromiseOverride
          : caches.open(CACHE_NAME);
      const cache = await cachePromise;
      await cache.put(request, responseForCache);
    } catch (cacheError) {
      if (errorMessage) {
        serviceWorkerLog.warn(errorMessage, cacheError);
      } else {
        serviceWorkerLog.warn('Unable to update cached response.', cacheError);
      }
    }
  };

  const cachePutTask = performCachePut();

  if (event && typeof event.waitUntil === 'function') {
    try {
      event.waitUntil(cachePutTask);
      return;
    } catch (waitUntilError) {
      serviceWorkerLog.warn('Unable to extend service worker lifetime for cache update.', waitUntilError);
    }
  }

  cachePutTask.catch(() => {});
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
    serviceWorkerLog.warn('Unable to evaluate forceReload search parameter for cache bypass.', forceReloadCheckError);
  }

  const { cache } = request;
  if (cache === 'reload' || cache === 'no-store' || cache === 'no-cache') {
    return true;
  }

  const cacheControl = request.headers && request.headers.get && request.headers.get('Cache-Control');
  if (cacheControl && /no-cache|no-store|max-age=0/i.test(cacheControl)) {
    return true;
  }

  const pragma = request.headers && request.headers.get && request.headers.get('Pragma');
  if (pragma && /no-cache/i.test(pragma)) {
    return true;
  }

  return false;
}

function extractRootAliasAsset(assets) {
  const filteredAssets = [];
  let hasRootAlias = false;

  assets.forEach(asset => {
    if (asset === './') {
      hasRootAlias = true;
      return;
    }

    filteredAssets.push(asset);
  });

  return { assetsWithoutRootAlias: filteredAssets, hasRootAlias };
}

async function ensureRootAlias(cache) {
  if (!cache) {
    return;
  }

  let indexResponse = null;

  try {
    indexResponse = await cache.match('./index.html');
  } catch (matchError) {
    serviceWorkerLog.warn('Unable to locate index.html while preparing root cache alias.', matchError);
    indexResponse = null;
  }

  if (!indexResponse) {
    serviceWorkerLog.warn('Unable to populate root cache alias because index.html is unavailable in cache.');
    return;
  }

  try {
    await cache.put('./', indexResponse.clone());
  } catch (aliasError) {
    serviceWorkerLog.warn('Unable to populate root cache alias entry.', aliasError);
  }
}

async function precacheAssets(cacheName, assets) {
  const cache = await caches.open(cacheName);
  const { assetsWithoutRootAlias, hasRootAlias } = extractRootAliasAsset(Array.isArray(assets) ? assets : []);

  try {
    await cache.addAll(assetsWithoutRootAlias);
  } catch (error) {
    serviceWorkerLog.warn('Precaching via cache.addAll failed, falling back to resilient mode.', error);

    const missingAssets = [];

    await Promise.all(
      assetsWithoutRootAlias.map(async asset => {
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
            serviceWorkerLog.warn(`Unable to reuse cached response for ${asset}`, reuseError);
          }

          if (!reusedFromExistingCache) {
            missingAssets.push(asset);
            serviceWorkerLog.warn(`Failed to precache asset ${asset}`, networkError);
          }
        }
      })
    );

    if (missingAssets.length) {
      serviceWorkerLog.warn(
        'Service worker installed with missing cached assets. Offline support may be degraded until the next update.',
        missingAssets
      );
    }
  }

  if (hasRootAlias) {
    await ensureRootAlias(cache);
  }
}

if (typeof self !== 'undefined') {
  self.addEventListener('install', event => {
    event.waitUntil((async () => {
      try {
        await precacheAssets(CACHE_NAME, ASSETS);
        serviceWorkerLog.info('Service worker precache complete.', {
          cacheName: CACHE_NAME,
          assetCount: Array.isArray(ASSETS) ? ASSETS.length : 0,
        });
      } catch (error) {
        serviceWorkerLog.error('Failed to precache assets during installation', error);
        throw error;
      }

      if (typeof self.skipWaiting === 'function') {
        await self.skipWaiting();
      }
    })());
  });

  self.addEventListener('activate', event => {
    const activationReadyPromise = waitForActivationState();

    event.waitUntil((async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        );
      } catch (error) {
        serviceWorkerLog.warn('Failed to clean up outdated caches during activation.', error);
      }
    })());

    activationReadyPromise
      .then(async () => {
        try {
          if (typeof self.clients !== 'undefined' && typeof self.clients.claim === 'function') {
            await self.clients.claim();
          }
        } catch (error) {
          serviceWorkerLog.warn('Unable to claim clients during activation.', error);
        }

        try {
          if (
            self.registration &&
            self.registration.navigationPreload &&
            typeof self.registration.navigationPreload.enable === 'function'
          ) {
            await self.registration.navigationPreload.enable();
            serviceWorkerLog.info('Navigation preload enabled for faster reloads.');
          }
        } catch (error) {
          serviceWorkerLog.warn('Unable to enable navigation preload.', error);
        }

        serviceWorkerLog.info('Service worker activated.', { cacheName: CACHE_NAME });
      })
      .catch(error => {
        serviceWorkerLog.warn('Activation readiness wait failed. Proceeding without deferred tasks.', error);
      });
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
    const preloadResponsePromise =
      isNavigationRequest && event.preloadResponse && typeof event.preloadResponse.then === 'function'
        ? event.preloadResponse.catch(error => {
            serviceWorkerLog.warn('Navigation preload promise rejected.', error);
            return null;
          })
        : null;
    let preloadResponseResolved = false;
    let preloadResponseValue = null;
    const resolvePreloadResponse = async () => {
      if (!preloadResponsePromise) {
        return null;
      }
      if (!preloadResponseResolved) {
        preloadResponseValue = await preloadResponsePromise;
        preloadResponseResolved = true;
      }
      return preloadResponseValue;
    };
    if (isAppIconRequest) {
      event.respondWith((async () => {
        const cachePromise = caches.open(CACHE_NAME);

        try {
          const response = await fetch(event.request, { cache: 'no-store' });
          scheduleCachePut(event, event.request, response, 'Unable to update cached app icon response.', cachePromise);
          return response;
        } catch (error) {
          const cache = await cachePromise;
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
        if (preloadResponsePromise) {
          const preloadResponse = await resolvePreloadResponse();
          if (preloadResponse) {
            if (preloadResponse.ok && isSameOrigin) {
              scheduleCachePut(
                event,
                event.request,
                preloadResponse,
                'Unable to store navigation preload response in cache',
              );
            }
            return preloadResponse;
          }
        }
        try {
          const freshResponse = await fetch(event.request, { cache: 'no-store' });
          if (freshResponse && freshResponse.ok && isSameOrigin) {
            scheduleCachePut(event, event.request, freshResponse, 'Unable to store fresh response in cache');
          }
          if (freshResponse) {
            return freshResponse;
          }
        } catch (networkError) {
          const cachedFallback = await caches.match(event.request, cacheMatchOptions);
          if (cachedFallback) {
            serviceWorkerLog.warn('Network error during cache bypass. Serving cached fallback.', {
              url: event.request && event.request.url ? event.request.url : null,
              cacheName: CACHE_NAME,
              error: networkError,
            });
            return cachedFallback;
          }

          if (isNavigationRequest) {
            const cache = await caches.open(CACHE_NAME);
            const fallback = await cache.match('./index.html') || await cache.match('./');
            if (fallback) {
              serviceWorkerLog.warn('Network error during navigation bypass. Serving offline shell.', {
                url: event.request && event.request.url ? event.request.url : null,
                cacheName: CACHE_NAME,
                error: networkError,
              });
              return fallback;
            }
          }

          serviceWorkerLog.error('Network error during cache bypass without fallback.', networkError);
          throw networkError;
        }
      }

      const cachedResponse = await caches.match(event.request, cacheMatchOptions);
      if (cachedResponse) {
        return cachedResponse;
      }

      if (preloadResponsePromise) {
        const preloadResponse = await resolvePreloadResponse();
        if (preloadResponse) {
          if (preloadResponse.ok && isSameOrigin) {
            scheduleCachePut(
              event,
              event.request,
              preloadResponse,
              'Unable to store navigation preload response in cache',
            );
          }
          return preloadResponse;
        }
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
          serviceWorkerLog.info('Served offline shell after navigation request failed.', {
            url: event.request && event.request.url ? event.request.url : null,
            cacheName: CACHE_NAME,
            error,
          });
          return offlineShell;
        }

        serviceWorkerLog.error('Navigation request failed without offline shell available.', error);
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
