(function () {
  const GLOBAL_SCOPE =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
          ? self
          : typeof global !== 'undefined'
            ? global
            : {};

  function tryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }

    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }

  function resolveModuleRegistry() {
    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (scope && typeof scope.cineModules === 'object') {
        return scope.cineModules;
      }
    }

    return null;
  }

  const MODULE_REGISTRY = resolveModuleRegistry();

  const PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

  function queueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze({ ...(options || {}) }),
    });

    let queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: [],
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }

    return true;
  }

  function registerOrQueueModule(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }

    queueModuleRegistration(name, api, options);
    return false;
  }

  const UI_CACHE_STORAGE_KEYS_FOR_RELOAD = [
    'cameraPowerPlanner_schemaCache',
    'cinePowerPlanner_schemaCache',
  ];

  const UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = [
    '',
    '__backup',
    '__legacyMigrationBackup',
  ];

  const uiCacheFallbackWarningKeys = new Set();
  let pendingServiceWorkerRegistration = null;

  function resolveGlobal(name) {
    if (!GLOBAL_SCOPE || (typeof GLOBAL_SCOPE !== 'object' && typeof GLOBAL_SCOPE !== 'function')) {
      return undefined;
    }

    try {
      return GLOBAL_SCOPE[name];
    } catch (error) {
      void error;
      return undefined;
    }
  }

  function resolveWindow(explicitWindow) {
    if (explicitWindow) {
      return explicitWindow;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    return resolveGlobal('window');
  }

  function resolveNavigator(explicitNavigator) {
    if (explicitNavigator) {
      return explicitNavigator;
    }
    if (typeof navigator !== 'undefined') {
      return navigator;
    }
    const win = resolveWindow();
    if (win && typeof win.navigator !== 'undefined') {
      return win.navigator;
    }
    return resolveGlobal('navigator');
  }

  function resolveCaches(explicitCaches) {
    if (explicitCaches) {
      return explicitCaches;
    }
    if (typeof caches !== 'undefined') {
      return caches;
    }
    const win = resolveWindow();
    if (win && typeof win.caches !== 'undefined') {
      return win.caches;
    }
    return resolveGlobal('caches');
  }

  function safeWarn(message, error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      try {
        if (typeof error !== 'undefined') {
          console.warn(message, error);
        } else {
          console.warn(message);
        }
      } catch (warnError) {
        void warnError;
      }
    }
  }

  function registerFallbackStorage(storages, candidate, label) {
    void label;
    if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
      return;
    }

    const hasRemove = typeof candidate.removeItem === 'function';
    const hasDelete = typeof candidate.delete === 'function';

    if (!hasRemove && !hasDelete) {
      return;
    }

    storages.add(candidate);
  }

  function inspectScopeForStorages(storages, scope, label) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    try {
      registerFallbackStorage(storages, scope.SAFE_LOCAL_STORAGE, `${label}.SAFE_LOCAL_STORAGE`);
    } catch (error) {
      const key = `${label}.SAFE_LOCAL_STORAGE`;
      if (!uiCacheFallbackWarningKeys.has(key)) {
        uiCacheFallbackWarningKeys.add(key);
        safeWarn(`Unable to inspect ${key} while clearing UI caches`, error);
      }
    }

    try {
      registerFallbackStorage(storages, scope.localStorage, `${label}.localStorage`);
    } catch (error) {
      const key = `${label}.localStorage`;
      if (!uiCacheFallbackWarningKeys.has(key)) {
        uiCacheFallbackWarningKeys.add(key);
        safeWarn(`Unable to inspect ${key} while clearing UI caches`, error);
      }
    }

    try {
      registerFallbackStorage(storages, scope.sessionStorage, `${label}.sessionStorage`);
    } catch (error) {
      const key = `${label}.sessionStorage`;
      if (!uiCacheFallbackWarningKeys.has(key)) {
        uiCacheFallbackWarningKeys.add(key);
        safeWarn(`Unable to inspect ${key} while clearing UI caches`, error);
      }
    }

    let nested = null;
    try {
      nested = scope.__cineGlobal;
    } catch (error) {
      const key = `${label}.__cineGlobal`;
      if (!uiCacheFallbackWarningKeys.has(key)) {
        uiCacheFallbackWarningKeys.add(key);
        safeWarn(`Unable to inspect ${key} while clearing UI caches`, error);
      }
    }

    if (nested && nested !== scope) {
      inspectScopeForStorages(storages, nested, `${label}.__cineGlobal`);
    }
  }

  function collectFallbackUiCacheStorages(options = {}) {
    const storages = new Set();

    const resolveSafeLocalStorageFn =
      typeof options.resolveSafeLocalStorage === 'function'
        ? options.resolveSafeLocalStorage
        : typeof resolveGlobal('resolveSafeLocalStorage') === 'function'
          ? resolveGlobal('resolveSafeLocalStorage')
          : null;

    const safeLocalStorageInstance = options.safeLocalStorage || resolveGlobal('SAFE_LOCAL_STORAGE');

    try {
      const resolved = resolveSafeLocalStorageFn ? resolveSafeLocalStorageFn() : null;
      registerFallbackStorage(storages, resolved, 'safeLocalStorage');
    } catch (error) {
      safeWarn('resolveSafeLocalStorage() failed while collecting UI cache storages', error);
    }

    if (safeLocalStorageInstance) {
      try {
        registerFallbackStorage(storages, safeLocalStorageInstance, 'SAFE_LOCAL_STORAGE');
      } catch (error) {
        const key = 'SAFE_LOCAL_STORAGE';
        if (!uiCacheFallbackWarningKeys.has(key)) {
          uiCacheFallbackWarningKeys.add(key);
          safeWarn('Unable to inspect SAFE_LOCAL_STORAGE while clearing UI caches', error);
        }
      }
    }

    const candidates = options.scopeCandidates || [
      { scope: resolveGlobal('globalThis'), label: 'globalThis' },
      { scope: resolveWindow(options.window), label: 'window' },
      { scope: typeof self !== 'undefined' ? self : resolveGlobal('self'), label: 'self' },
      { scope: resolveGlobal('global'), label: 'global' },
    ];

    const cineGlobal = typeof GLOBAL_SCOPE !== 'undefined' ? GLOBAL_SCOPE.__cineGlobal : undefined;
    if (typeof cineGlobal !== 'undefined') {
      candidates.push({ scope: cineGlobal, label: '__cineGlobal' });
    }

    candidates.forEach(({ scope, label }) => {
      inspectScopeForStorages(storages, scope, label);
    });

    const win = resolveWindow(options.window);
    if (win) {
      try {
        registerFallbackStorage(storages, win.localStorage, 'window.localStorage');
      } catch (error) {
        const key = 'window.localStorage';
        if (!uiCacheFallbackWarningKeys.has(key)) {
          uiCacheFallbackWarningKeys.add(key);
          safeWarn('Unable to inspect window.localStorage while clearing UI caches', error);
        }
      }

      try {
        registerFallbackStorage(storages, win.sessionStorage, 'window.sessionStorage');
      } catch (error) {
        const key = 'window.sessionStorage';
        if (!uiCacheFallbackWarningKeys.has(key)) {
          uiCacheFallbackWarningKeys.add(key);
          safeWarn('Unable to inspect window.sessionStorage while clearing UI caches', error);
        }
      }
    }

    return storages;
  }

  function clearUiCacheEntriesFallback(options = {}) {
    const storages = options.storages || collectFallbackUiCacheStorages(options);
    if (!storages || !storages.size) {
      return false;
    }

    let clearedAny = false;

    storages.forEach((storage) => {
      UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach((baseKey) => {
        if (typeof baseKey !== 'string' || !baseKey) {
          return;
        }

        UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach((suffix) => {
          const entryKey = suffix ? `${baseKey}${suffix}` : baseKey;
          try {
            if (typeof storage.removeItem === 'function') {
              storage.removeItem(entryKey);
              clearedAny = true;
            } else if (typeof storage.delete === 'function') {
              storage.delete(entryKey);
              clearedAny = true;
            }
          } catch (error) {
            safeWarn('Failed to remove UI cache entry', { entryKey, error });
          }
        });
      });
    });

    return clearedAny;
  }

  async function unregisterServiceWorkers(navigatorOverride) {
    const nav = resolveNavigator(navigatorOverride);
    if (!nav || !nav.serviceWorker) {
      return false;
    }

    const registrations = [];
    const { serviceWorker } = nav;

    try {
      if (typeof serviceWorker.getRegistrations === 'function') {
        const regs = await serviceWorker.getRegistrations();
        if (Array.isArray(regs)) {
          regs.forEach((reg) => {
            if (reg) {
              registrations.push(reg);
            }
          });
        }
      } else if (typeof serviceWorker.getRegistration === 'function') {
        const reg = await serviceWorker.getRegistration();
        if (reg) {
          registrations.push(reg);
        }
      } else if (serviceWorker.ready && typeof serviceWorker.ready.then === 'function') {
        try {
          const readyReg = await serviceWorker.ready;
          if (readyReg) {
            registrations.push(readyReg);
          }
        } catch (readyError) {
          safeWarn('Failed to await active service worker', readyError);
        }
      }
    } catch (queryError) {
      safeWarn('Failed to query service worker registrations', queryError);
    }

    if (!registrations.length) {
      return false;
    }

    await Promise.all(
      registrations.map((registration) => {
        if (!registration || typeof registration.unregister !== 'function') {
          return Promise.resolve(false);
        }

        return registration.unregister().catch((error) => {
          safeWarn('Service worker unregister failed', error);
          return false;
        });
      })
    );

    return true;
  }

  async function clearCacheStorage(cachesOverride) {
    const cachesInstance = resolveCaches(cachesOverride);
    if (!cachesInstance || typeof cachesInstance.keys !== 'function') {
      return false;
    }

    try {
      const keys = await cachesInstance.keys();
      if (!Array.isArray(keys) || !keys.length) {
        return false;
      }

      await Promise.all(
        keys.map((key) => {
          if (!key || typeof cachesInstance.delete !== 'function') {
            return Promise.resolve(false);
          }

          return cachesInstance.delete(key).catch((error) => {
            safeWarn('Failed to delete cache', { key, error });
            return false;
          });
        })
      );

      return true;
    } catch (error) {
      safeWarn('Cache clear failed', error);
      return false;
    }
  }

  function triggerReload(windowOverride) {
    const win = resolveWindow(windowOverride);
    if (!win || !win.location) {
      return false;
    }

    const { location } = win;
    const hasReplace = location && typeof location.replace === 'function';
    const hasReload = location && typeof location.reload === 'function';
    let navigationTriggered = false;

    if (hasReplace) {
      try {
        const paramName = 'forceReload';
        const timestamp = Date.now().toString(36);
        let href = location.href || '';
        let hash = '';
        const hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
          hash = href.slice(hashIndex);
          href = href.slice(0, hashIndex);
        }
        const pattern = new RegExp(`([?&])${paramName}=[^&]*`);
        const replacement = `$1${paramName}=${timestamp}`;
        if (pattern.test(href)) {
          href = href.replace(pattern, replacement);
        } else if (href.indexOf('?') !== -1) {
          href += `&${paramName}=${timestamp}`;
        } else if (href) {
          href += `?${paramName}=${timestamp}`;
        }
        location.replace(href + hash);
        navigationTriggered = true;
      } catch (replaceError) {
        safeWarn('Forced reload via location.replace failed', replaceError);
      }
    }

    if (!navigationTriggered && hasReload) {
      try {
        location.reload();
        navigationTriggered = true;
      } catch (reloadError) {
        safeWarn('Forced reload via location.reload failed', reloadError);
      }
    }

    return navigationTriggered;
  }

  async function reloadApp(options = {}) {
    let uiCacheCleared = false;
    const clearUiCacheStorageEntriesFn =
      typeof options.clearUiCacheStorageEntries === 'function'
        ? options.clearUiCacheStorageEntries
        : typeof resolveGlobal('clearUiCacheStorageEntries') === 'function'
          ? resolveGlobal('clearUiCacheStorageEntries')
          : null;

    if (clearUiCacheStorageEntriesFn) {
      try {
        clearUiCacheStorageEntriesFn();
        uiCacheCleared = true;
      } catch (error) {
        safeWarn('Failed to clear UI caches via storage helper', error);
      }
    }

    if (!uiCacheCleared) {
      try {
        uiCacheCleared = clearUiCacheEntriesFallback(options);
      } catch (fallbackError) {
        safeWarn('Fallback UI cache clear failed', fallbackError);
      }
    }

    let serviceWorkersUnregistered = false;
    try {
      serviceWorkersUnregistered = await unregisterServiceWorkers(options.navigator);
    } catch (error) {
      safeWarn('Service worker cleanup failed', error);
    }

    let cachesCleared = false;
    try {
      cachesCleared = await clearCacheStorage(options.caches);
    } catch (error) {
      safeWarn('Cache clear failed', error);
    }

    let reloadTriggered = false;
    const reloadFn = typeof options.reloadWindow === 'function' ? options.reloadWindow : triggerReload;

    try {
      reloadTriggered = reloadFn(options.window);
    } catch (error) {
      safeWarn('Forced reload handler failed', error);
      reloadTriggered = triggerReload(options.window);
    }

    if (!reloadTriggered) {
      const win = resolveWindow(options.window);
      if (win && win.location && typeof win.location.reload === 'function') {
        try {
          win.location.reload();
          reloadTriggered = true;
        } catch (finalError) {
          safeWarn('Final reload attempt failed', finalError);
        }
      }
    }

    return {
      uiCacheCleared,
      serviceWorkersUnregistered,
      cachesCleared,
      reloadTriggered,
    };
  }

  function shouldRegisterImmediately(win) {
    if (!win || !win.document) {
      return false;
    }
    const { document } = win;
    if (typeof document.readyState === 'string') {
      return document.readyState === 'complete';
    }
    return false;
  }

  function registerServiceWorker(scriptUrl = 'service-worker.js', options = {}) {
    const win = resolveWindow(options.window);
    const nav = resolveNavigator(options.navigator);

    if (!nav || !nav.serviceWorker || typeof nav.serviceWorker.register !== 'function') {
      return Promise.resolve(null);
    }

    const register = () => {
      try {
        const promise = nav.serviceWorker.register(scriptUrl, options.registrationOptions);
        promise.catch((error) => {
          safeWarn('Service worker registration failed', error);
        });
        return promise;
      } catch (error) {
        safeWarn('Service worker registration threw an exception', error);
        return Promise.reject(error);
      }
    };

    if (!win || typeof win.addEventListener !== 'function') {
      return register();
    }

    if (pendingServiceWorkerRegistration) {
      return pendingServiceWorkerRegistration;
    }

    if (shouldRegisterImmediately(win) || options.immediate === true) {
      pendingServiceWorkerRegistration = register();
      return pendingServiceWorkerRegistration;
    }

    pendingServiceWorkerRegistration = new Promise((resolve) => {
      const handler = () => {
        try {
          win.removeEventListener('load', handler);
        } catch (error) {
          void error;
        }
        resolve(register());
      };

      win.addEventListener('load', handler, { once: true });
    });

    return pendingServiceWorkerRegistration;
  }

  function freezeDeep(value, seen = new WeakSet()) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }

    seen.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  const offlineAPI = {
    registerServiceWorker,
    reloadApp,
    __internal: {
      collectFallbackUiCacheStorages,
      clearUiCacheEntriesFallback,
      unregisterServiceWorkers,
      clearCacheStorage,
      triggerReload,
    },
  };

  freezeDeep(offlineAPI);

  registerOrQueueModule(
    'cineOffline',
    offlineAPI,
    {
      category: 'offline',
      description: 'Offline helpers for service worker registration and cache recovery.',
      replace: true,
    },
    (error) => {
      safeWarn('Unable to register cineOffline in module registry.', error);
    },
  );

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      if (GLOBAL_SCOPE.cineOffline !== offlineAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cineOffline', {
          configurable: true,
          enumerable: false,
          value: offlineAPI,
          writable: false,
        });
      }
    } catch (error) {
      safeWarn('Unable to expose cineOffline globally.', error);
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = offlineAPI;
  }
})();
