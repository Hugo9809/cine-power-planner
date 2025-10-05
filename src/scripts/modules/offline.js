(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const FALLBACK_SCOPE = detectGlobalScope();

  function loadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = [scope];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }

    return null;
  }

  function loadEnvironmentBridge(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment-bridge.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = [scope];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }

    return null;
  }

  const MODULE_ENV = loadModuleEnvironment(FALLBACK_SCOPE);

  const ENV_BRIDGE = loadEnvironmentBridge(FALLBACK_SCOPE);

  const GLOBAL_SCOPE = (ENV_BRIDGE && typeof ENV_BRIDGE.getGlobalScope === 'function'
    ? ENV_BRIDGE.getGlobalScope()
    : null)
    || (MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function'
      ? MODULE_ENV.getGlobalScope()
      : null)
    || FALLBACK_SCOPE;

  function fallbackTryRequire(modulePath) {
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

  const tryRequire = (function resolveTryRequire() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        const result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }

    return fallbackTryRequire;
  })();

  function resolveModuleRegistry(scope) {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(scope || GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(scope || GLOBAL_SCOPE);
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = [scope || GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  const MODULE_REGISTRY = (function () {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        const provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  })();

  const PENDING_QUEUE_KEY = (function resolvePendingKey() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getPendingQueueKey === 'function') {
      try {
        const bridgedKey = ENV_BRIDGE.getPendingQueueKey();
        if (typeof bridgedKey === 'string' && bridgedKey) {
          return bridgedKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string') {
      return MODULE_ENV.PENDING_QUEUE_KEY;
    }

    return '__cinePendingModuleRegistrations__';
  })();

  function cloneOptions(options) {
    if (!options || typeof options !== 'object') {
      return {};
    }

    const copy = {};
    const keys = Object.keys(options);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      copy[key] = options[key];
    }

    return copy;
  }

  function fallbackQueueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze(cloneOptions(options)),
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

  function queueModuleRegistration(name, api, options) {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      try {
        const bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
        if (bridged) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return MODULE_ENV.queueModuleRegistration(name, api, options, GLOBAL_SCOPE);
    }

    return fallbackQueueModuleRegistration(name, api, options);
  }

  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (callbackError) {
            void callbackError;
          }
        } else {
          void error;
        }
      }
    }

    queueModuleRegistration(name, api, options);
    return false;
  }

  const registerOrQueueModule = (function resolveRegisterOrQueue() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          const bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (bridged) {
            return true;
          }
        } catch (error) {
          void error;
        }

        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        return MODULE_ENV.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
      };
    }

    return fallbackRegisterOrQueue;
  })();

  function fallbackFreezeDeep(value, seen = new WeakSet()) {
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
      fallbackFreezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  const freezeDeep = (function resolveFreezeDeep() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.freezeDeep === 'function') {
      return function bridgeFreezeDeep(value, seen) {
        try {
          return ENV_BRIDGE.freezeDeep(value, seen);
        } catch (error) {
          void error;
          return fallbackFreezeDeep(value, seen);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.freezeDeep === 'function') {
      return MODULE_ENV.freezeDeep;
    }

    return fallbackFreezeDeep;
  })();

  function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }

    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  }

  const safeWarn = (function resolveSafeWarn() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.safeWarn === 'function') {
      return function bridgeSafeWarn(message, detail) {
        try {
          ENV_BRIDGE.safeWarn(message, detail);
        } catch (error) {
          void error;
          fallbackSafeWarn(message, detail);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.safeWarn === 'function') {
      return MODULE_ENV.safeWarn;
    }

    return fallbackSafeWarn;
  })();

  function fallbackExposeGlobal(name, value) {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        enumerable: false,
        value,
        writable: false,
      });
      return true;
    } catch (error) {
      void error;
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }

  const exposeGlobal = (function resolveExposeGlobal() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobal === 'function') {
      return function bridgeExposeGlobal(name, value, options) {
        try {
          return ENV_BRIDGE.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function') {
      return function exposeGlobal(name, value, options) {
        return MODULE_ENV.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      };
    }

    return fallbackExposeGlobal;
  })();

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

    const finalizePendingRegistration = (promise) => {
      const tracked = Promise.resolve(promise).finally(() => {
        pendingServiceWorkerRegistration = null;
      });
      pendingServiceWorkerRegistration = tracked;
      return tracked;
    };

    if (!win || typeof win.addEventListener !== 'function') {
      return register();
    }

    if (pendingServiceWorkerRegistration) {
      return pendingServiceWorkerRegistration;
    }

    if (shouldRegisterImmediately(win) || options.immediate === true) {
      return finalizePendingRegistration(Promise.resolve().then(() => register()));
    }

    const waitForLoad = new Promise((resolve, reject) => {
      const handler = () => {
        try {
          win.removeEventListener('load', handler);
        } catch (error) {
          void error;
        }
        try {
          resolve(register());
        } catch (error) {
          reject(error);
        }
      };

      win.addEventListener('load', handler, { once: true });
    });

    return finalizePendingRegistration(waitForLoad);
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
    let existingOffline = null;
    try {
      existingOffline = GLOBAL_SCOPE.cineOffline || null;
    } catch (error) {
      void error;
      existingOffline = null;
    }

    if (existingOffline !== offlineAPI) {
      const exposed = exposeGlobal('cineOffline', offlineAPI, {
        configurable: true,
        enumerable: false,
        writable: false,
      });

      if (!exposed) {
        safeWarn('Unable to expose cineOffline globally.');
      }
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = offlineAPI;
  }
})();
