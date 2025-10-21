/* eslint-env serviceworker */
const SERVICE_WORKER_SCOPE =
  (typeof self !== 'undefined' && self) ||
  (typeof globalThis !== 'undefined' && globalThis) ||
  null;

const LOG_HISTORY_LIMIT = 50;
const LOG_BROADCAST_CHANNEL_NAME = 'cine-sw-logs';
const LOG_ENTRY_MESSAGE_TYPE = 'cine-sw:log-entry';
const LOG_STATE_REQUEST_TYPE = 'cine-sw:log-state-request';
const LOG_STATE_RESPONSE_TYPE = 'cine-sw:log-state';
const CACHE_MATCH_IGNORE_SEARCH_OPTIONS = Object.freeze({ ignoreSearch: true });

let logEntryCounter = 0;
let logBroadcastChannel = null;
let logBroadcastChannelFailed = false;
let cachedCacheName = null;
let cachedCacheVersion = null;

if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE.importScripts === 'function') {
  try {
    SERVICE_WORKER_SCOPE.importScripts('./app-version.js');
  } catch (appVersionImportError) {
    try {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('[cine-sw] Unable to preload app-version.js.', appVersionImportError);
      }
    } catch (consoleError) {
      void consoleError;
    }
  }
}

function createLogEntryId(level, timestamp) {
  const safeLevel = typeof level === 'string' && level ? level.toLowerCase() : 'log';
  const timeComponent = typeof timestamp === 'number' && Number.isFinite(timestamp)
    ? timestamp
    : Date.now();
  logEntryCounter = (logEntryCounter + 1) % Number.MAX_SAFE_INTEGER;
  const counterComponent = logEntryCounter.toString(36);
  return `sw-${safeLevel}-${timeComponent.toString(36)}-${counterComponent}`;
}

function cloneLogEntry(entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const clone = {
    id: typeof entry.id === 'string' && entry.id ? entry.id : null,
    level: entry.level,
    message: entry.message,
    timestamp: entry.timestamp,
    isoTimestamp: entry.isoTimestamp,
    channel: entry.channel || 'service-worker',
    namespace: entry.namespace || 'service-worker',
  };

  if (typeof entry.detail !== 'undefined') {
    clone.detail = sanitizeLogDetail(entry.detail);
  }

  if (typeof entry.meta !== 'undefined') {
    clone.meta = sanitizeLogDetail(entry.meta);
  }

  if (typeof entry.origin !== 'undefined') {
    clone.origin = sanitizeLogDetail(entry.origin);
  }

  return clone;
}

function getLogBroadcastChannel() {
  if (logBroadcastChannelFailed) {
    return null;
  }

  if (logBroadcastChannel) {
    return logBroadcastChannel;
  }

  if (typeof BroadcastChannel !== 'function') {
    logBroadcastChannelFailed = true;
    return null;
  }

  try {
    logBroadcastChannel = new BroadcastChannel(LOG_BROADCAST_CHANNEL_NAME);
    return logBroadcastChannel;
  } catch (error) {
    logBroadcastChannelFailed = true;
    try {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('[cine-sw] Unable to create log broadcast channel.', error);
      }
    } catch (consoleError) {
      void consoleError;
    }
    return null;
  }
}

function broadcastLogEntry(entry) {
  if (!entry) {
    return;
  }

  const channel = getLogBroadcastChannel();
  if (!channel) {
    return;
  }

  try {
    channel.postMessage({
      type: LOG_ENTRY_MESSAGE_TYPE,
      entry: cloneLogEntry(entry),
    });
  } catch (error) {
    try {
      channel.close();
    } catch (closeError) {
      void closeError;
    }
    logBroadcastChannel = null;
    logBroadcastChannelFailed = true;
    try {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('[cine-sw] Unable to broadcast log entry.', error);
      }
    } catch (consoleError) {
      void consoleError;
    }
  }
}

function getCacheMetadataSnapshot() {
  const meta = {
    channel: 'service-worker',
    scope: 'service-worker',
  };

  if (typeof cachedCacheName === 'string' && cachedCacheName) {
    meta.cacheName = cachedCacheName;
  }

  if (cachedCacheVersion) {
    meta.cacheVersion = cachedCacheVersion;
  }

  return meta;
}

function cloneHistoryForTransfer(history, limit) {
  if (!Array.isArray(history) || history.length === 0) {
    return [];
  }

  const effectiveLimit = typeof limit === 'number' && Number.isFinite(limit)
    ? Math.max(0, Math.floor(limit))
    : history.length;

  const startIndex = Math.max(0, history.length - effectiveLimit);
  const slice = history.slice(startIndex);
  const clones = [];
  for (let index = 0; index < slice.length; index += 1) {
    const cloned = cloneLogEntry(slice[index]);
    if (cloned) {
      clones.push(cloned);
    }
  }
  return clones;
}

function createLogStateSnapshot(limit) {
  const diagnostics = ensureDiagnosticState();
  const history = diagnostics && Array.isArray(diagnostics.history)
    ? diagnostics.history
    : [];

  const snapshot = {
    history: cloneHistoryForTransfer(history, limit),
    cacheName: cachedCacheName,
    cacheVersion: cachedCacheVersion,
    generatedAt: Date.now(),
    historyLength: history.length,
    lastEntry: diagnostics && diagnostics.lastEntry ? cloneLogEntry(diagnostics.lastEntry) : null,
  };

  return snapshot;
}

function respondWithLogState(event, request) {
  if (!event) {
    return;
  }

  const limit = request && typeof request.limit === 'number' ? request.limit : null;
  const snapshot = createLogStateSnapshot(limit);
  const message = {
    type: LOG_STATE_RESPONSE_TYPE,
    requestId: request && typeof request.requestId === 'string' ? request.requestId : null,
    state: snapshot,
  };

  let handled = false;

  if (event.ports && event.ports.length) {
    const port = event.ports[0];
    if (port && typeof port.postMessage === 'function') {
      try {
        port.postMessage(message);
        handled = true;
      } catch (portError) {
        void portError;
      }
    }
  }

  if (!handled && event.source && typeof event.source.postMessage === 'function') {
    try {
      event.source.postMessage(message);
      handled = true;
    } catch (sourceError) {
      void sourceError;
    }
  }

  if (!handled) {
    const channel = getLogBroadcastChannel();
    if (channel) {
      try {
        channel.postMessage(message);
      } catch (broadcastError) {
        void broadcastError;
      }
    }
  }
}

function handleServiceWorkerMessage(event) {
  if (!event) {
    return;
  }

  let data = null;
  try {
    data = event.data || null;
  } catch (error) {
    void error;
    data = null;
  }

  if (!data || typeof data !== 'object') {
    return;
  }

  if (data.type === LOG_STATE_REQUEST_TYPE) {
    respondWithLogState(event, data);
  }
}

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
    id: createLogEntryId(level, timestamp),
    level,
    message,
    timestamp,
    isoTimestamp,
    detail: sanitizeLogDetail(detail),
    channel: 'service-worker',
    namespace: 'service-worker',
    meta: sanitizeLogDetail(getCacheMetadataSnapshot()),
    origin: sanitizeLogDetail({ runtime: 'service-worker' }),
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
  broadcastLogEntry(entry);

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

function isInvalidStateError(error) {
  if (!error) {
    return false;
  }

  if (error.name === 'InvalidStateError') {
    return true;
  }

  if (typeof DOMException !== 'undefined' && error instanceof DOMException) {
    return error.code === DOMException.INVALID_STATE_ERR;
  }

  return false;
}

function scheduleDeferredActivationTask(task) {
  if (typeof task !== 'function' || typeof setTimeout !== 'function') {
    return;
  }

  try {
    setTimeout(() => {
      try {
        const result = task();
        if (result && typeof result.then === 'function') {
          result.catch(error => {
            serviceWorkerLog.warn('Deferred activation task rejected.', error);
          });
        }
      } catch (error) {
        serviceWorkerLog.warn('Deferred activation task threw synchronously.', error);
      }
    }, 0);
  } catch (error) {
    serviceWorkerLog.warn('Unable to schedule deferred activation task.', error);
  }
}

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

  try {
    const cppVersion = SERVICE_WORKER_SCOPE.CPP_APP_VERSION;
    if (typeof cppVersion === 'string' && cppVersion) {
      return cppVersion;
    }
  } catch (cppReadError) {
    serviceWorkerLog.warn('Unable to read CPP_APP_VERSION from global scope.', cppReadError);
  }

  return null;
}

let CACHE_VERSION = resolveCacheVersion();

if (!CACHE_VERSION && SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE.importScripts === 'function') {
  try {
    SERVICE_WORKER_SCOPE.importScripts('./src/scripts/modules/core-shared.js');
    CACHE_VERSION = resolveCacheVersion();
  } catch (versionImportError) {
    serviceWorkerLog.warn('Falling back to bundled cache version after importScripts failure.', versionImportError);
  }
}

if (!CACHE_VERSION) {
  CACHE_VERSION = '0.0.0';
  serviceWorkerLog.warn('APP_VERSION not available; defaulting cache version to 0.0.0.');
}

const CACHE_NAME = `cine-power-planner-v${CACHE_VERSION}`;

cachedCacheVersion = CACHE_VERSION;
cachedCacheName = CACHE_NAME;

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

if (SERVICE_WORKER_SCOPE && typeof SERVICE_WORKER_SCOPE.addEventListener === 'function') {
  try {
    SERVICE_WORKER_SCOPE.addEventListener('message', handleServiceWorkerMessage);
  } catch (messageListenerError) {
    serviceWorkerLog.warn('Unable to attach service worker message listener for diagnostics.', messageListenerError);
  }
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

function scheduleAppIconCachePut(event, request, response, cachePromiseOverride) {
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

  const requestUrl = new URL(request.url);
  requestUrl.search = '';
  const canonicalRequest = new Request(requestUrl.toString(), { method: request.method });

  const performCachePut = async () => {
    try {
      const cachePromise =
        cachePromiseOverride && typeof cachePromiseOverride.then === 'function'
          ? cachePromiseOverride
          : caches.open(CACHE_NAME);
      const cache = await cachePromise;
      const matchingRequests = await cache.keys(request, CACHE_MATCH_IGNORE_SEARCH_OPTIONS);

      for (const existingRequest of matchingRequests) {
        if (existingRequest.url !== canonicalRequest.url) {
          await cache.delete(existingRequest);
        }
      }

      await cache.put(canonicalRequest, responseForCache);
    } catch (cacheError) {
      serviceWorkerLog.warn('Unable to update cached app icon response.', cacheError);
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
            const cachedResponse = await caches.match(request, CACHE_MATCH_IGNORE_SEARCH_OPTIONS);
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

      try {
        if (typeof self.clients !== 'undefined' && typeof self.clients.claim === 'function') {
          await self.clients.claim();
        }
      } catch (error) {
        if (isInvalidStateError(error)) {
          serviceWorkerLog.info('Client claim deferred until activation completes.');
          scheduleDeferredActivationTask(() => {
            if (typeof self === 'undefined' || !self || !self.clients) {
              return null;
            }
            if (typeof self.clients.claim !== 'function') {
              return null;
            }
            const claim = self.clients.claim();
            if (claim && typeof claim.then === 'function') {
              return claim.catch(deferredError => {
                serviceWorkerLog.warn('Deferred clients.claim() attempt failed.', deferredError);
              });
            }
            return null;
          });
        } else {
          serviceWorkerLog.warn('Unable to claim clients during activation.', error);
        }
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
        if (isInvalidStateError(error)) {
          serviceWorkerLog.info('Navigation preload enable deferred until activation completes.');
          scheduleDeferredActivationTask(() => {
            if (
              typeof self === 'undefined' ||
              !self ||
              !self.registration ||
              !self.registration.navigationPreload ||
              typeof self.registration.navigationPreload.enable !== 'function'
            ) {
              return null;
            }
            const enablePromise = self.registration.navigationPreload.enable();
            if (enablePromise && typeof enablePromise.then === 'function') {
              return enablePromise
                .then(() => {
                  serviceWorkerLog.info('Navigation preload enabled after activation.');
                })
                .catch(deferredError => {
                  serviceWorkerLog.warn('Deferred navigation preload enable failed.', deferredError);
                });
            }
            return null;
          });
        } else {
          serviceWorkerLog.warn('Unable to enable navigation preload.', error);
        }
      }

      serviceWorkerLog.info('Service worker activated.', { cacheName: CACHE_NAME });
    })());
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
          scheduleAppIconCachePut(event, event.request, response, cachePromise);
          return response;
        } catch (error) {
          const cache = await cachePromise;
          const cachedResponse = await cache.match(event.request, CACHE_MATCH_IGNORE_SEARCH_OPTIONS);
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
