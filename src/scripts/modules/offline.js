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

  function resolveModuleLinker(scope) {
    if (typeof require === 'function') {
      try {
        return require('./helpers/module-linker.js');
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
      try {
        const linker = candidate && candidate.cineModuleLinker;
        if (linker && typeof linker === 'object') {
          return linker;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function fallbackLoadModuleEnvironment(scope) {
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

  function fallbackLoadEnvironmentBridge(scope) {
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

  const MODULE_LINKER = resolveModuleLinker(FALLBACK_SCOPE);

  const MODULE_ENV = MODULE_LINKER && typeof MODULE_LINKER.getModuleEnvironment === 'function'
    ? MODULE_LINKER.getModuleEnvironment()
    : fallbackLoadModuleEnvironment(FALLBACK_SCOPE);

  const ENV_BRIDGE = MODULE_LINKER && typeof MODULE_LINKER.getEnvironmentBridge === 'function'
    ? MODULE_LINKER.getEnvironmentBridge()
    : fallbackLoadEnvironmentBridge(FALLBACK_SCOPE);

  const GLOBAL_SCOPE = (MODULE_LINKER && typeof MODULE_LINKER.getGlobalScope === 'function'
    ? MODULE_LINKER.getGlobalScope()
    : null)
    || (ENV_BRIDGE && typeof ENV_BRIDGE.getGlobalScope === 'function'
      ? ENV_BRIDGE.getGlobalScope()
      : null)
    || (MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function'
      ? MODULE_ENV.getGlobalScope()
      : null)
    || FALLBACK_SCOPE;

  function fallbackResolveModuleGlobals() {
    if (typeof require === 'function') {
      try {
        const required = require('./globals.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleGlobals === 'object') {
        return candidate.cineModuleGlobals;
      }
    }

    return null;
  }

  const MODULE_GLOBALS = (MODULE_LINKER && typeof MODULE_LINKER.getModuleGlobals === 'function'
    ? MODULE_LINKER.getModuleGlobals()
    : null)
    || fallbackResolveModuleGlobals();

  function informModuleGlobals(name, api) {
    if (MODULE_LINKER && typeof MODULE_LINKER.recordModule === 'function') {
      MODULE_LINKER.recordModule(name, api);
    }

    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }

    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }

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
    if (MODULE_LINKER && typeof MODULE_LINKER.tryRequire === 'function') {
      return MODULE_LINKER.tryRequire;
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }

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
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_LINKER && typeof MODULE_LINKER.getModuleRegistry === 'function') {
      const linked = MODULE_LINKER.getModuleRegistry(targetScope);
      if (linked) {
        return linked;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        const resolved = MODULE_GLOBALS.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        const provided = MODULE_ENV.resolveModuleRegistry(targetScope);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = [targetScope];
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
    if (MODULE_LINKER && typeof MODULE_LINKER.getModuleRegistry === 'function') {
      const linkedRegistry = MODULE_LINKER.getModuleRegistry(GLOBAL_SCOPE);
      if (linkedRegistry) {
        return linkedRegistry;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        const shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }

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
    return resolveModuleRegistry(GLOBAL_SCOPE);
  })();

  const PENDING_QUEUE_KEY = (function resolvePendingKey() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getPendingQueueKey === 'function') {
      try {
        const sharedKey = MODULE_GLOBALS.getPendingQueueKey();
        if (typeof sharedKey === 'string' && sharedKey) {
          return sharedKey;
        }
      } catch (error) {
        void error;
      }
    }

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
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.queueModuleRegistration === 'function') {
      try {
        if (MODULE_GLOBALS.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

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
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          const registered = MODULE_GLOBALS.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            GLOBAL_SCOPE,
            MODULE_REGISTRY,
          );
          if (registered) {
            return true;
          }
        } catch (error) {
          void error;
        }

        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }

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

  function shouldBypassDeepFreeze(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    try {
      if (typeof value.pipe === 'function' && typeof value.unpipe === 'function') {
        return true;
      }

      if (typeof value.on === 'function' && typeof value.emit === 'function') {
        if (typeof value.write === 'function' || typeof value.read === 'function') {
          return true;
        }

        const ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
          return true;
        }
      }

      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        const tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }

    return false;
  }

  function fallbackFreezeDeep(value, seen = new WeakSet()) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }

    seen.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      let child;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }
      if (!child || (typeof child !== 'object' && typeof child !== 'function')) {
        continue;
      }
      fallbackFreezeDeep(child, seen);
    }

    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }

  const freezeDeep = (function resolveFreezeDeep() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.freezeDeep === 'function') {
      return MODULE_GLOBALS.freezeDeep;
    }

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
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return MODULE_GLOBALS.safeWarn;
    }

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
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.exposeGlobal === 'function') {
      return function moduleGlobalsExpose(name, value, options) {
        try {
          return MODULE_GLOBALS.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

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

  const APP_CACHE_IDENTIFIERS = ['cine-power-planner', 'cinepowerplanner'];

  function resolveExposedCacheName() {
    const exposedName = resolveGlobal('CINE_CACHE_NAME');
    if (typeof exposedName === 'string' && exposedName) {
      return exposedName;
    }
    return null;
  }

  function isRelevantCacheKey(key, explicitName, lowerExplicit) {
    if (typeof key !== 'string' || !key) {
      return false;
    }

    if (explicitName && (key === explicitName || key.toLowerCase() === lowerExplicit)) {
      return true;
    }

    const lowerKey = key.toLowerCase();
    for (let index = 0; index < APP_CACHE_IDENTIFIERS.length; index += 1) {
      if (lowerKey.includes(APP_CACHE_IDENTIFIERS[index])) {
        return true;
      }
    }

    return false;
  }

  async function clearCacheStorage(cachesOverride) {
    const cachesInstance = resolveCaches(cachesOverride);
    if (!cachesInstance || typeof cachesInstance.keys !== 'function') {
      return false;
    }

    const exposedName = resolveExposedCacheName();
    const lowerExplicit = exposedName ? exposedName.toLowerCase() : null;

    try {
      const keys = await cachesInstance.keys();
      if (!Array.isArray(keys) || !keys.length) {
        return false;
      }

      const relevantKeys = keys.filter((key) =>
        isRelevantCacheKey(key, exposedName, lowerExplicit)
      );

      if (!relevantKeys.length) {
        return false;
      }

      let removedAny = false;

      await Promise.all(
        relevantKeys.map((key) => {
          if (!key || typeof cachesInstance.delete !== 'function') {
            return Promise.resolve(false);
          }

          return cachesInstance
            .delete(key)
            .then((result) => {
              removedAny = removedAny || !!result;
              return result;
            })
            .catch((error) => {
              safeWarn('Failed to delete cache', { key, error });
              return false;
            });
        })
      );

      return removedAny;
    } catch (error) {
      safeWarn('Cache clear failed', error);
      return false;
    }
  }

  function readLocationHrefSafe(locationLike) {
    if (!locationLike || typeof locationLike !== 'object') {
      return '';
    }

    try {
      const href = locationLike.href;
      return typeof href === 'string' ? href : '';
    } catch (error) {
      void error;
      return '';
    }
  }

  function readLocationPathnameSafe(locationLike) {
    if (!locationLike || typeof locationLike !== 'object') {
      return '';
    }

    try {
      const pathname = locationLike.pathname;
      return typeof pathname === 'string' ? pathname : '';
    } catch (error) {
      void error;
      return '';
    }
  }

  function readLocationOriginSafe(locationLike) {
    if (!locationLike || typeof locationLike !== 'object') {
      return '';
    }

    try {
      const origin = locationLike.origin;
      if (typeof origin === 'string' && origin) {
        return origin;
      }
    } catch (error) {
      void error;
    }

    const href = readLocationHrefSafe(locationLike);
    if (!href) {
      return '';
    }

    if (typeof URL === 'function') {
      try {
        return new URL(href).origin;
      } catch (originError) {
        void originError;
      }
    }

    const originMatch = href.match(/^([a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/]+)/);
    return originMatch && originMatch[1] ? originMatch[1] : '';
  }

  function getForceReloadBaseCandidates(locationLike, originalHref) {
    const candidates = [];
    const unique = new Set();

    const addCandidate = (value) => {
      if (typeof value !== 'string') {
        return;
      }

      const trimmed = value.trim();
      if (!trimmed || unique.has(trimmed)) {
        return;
      }

      unique.add(trimmed);
      candidates.push(trimmed);
    };

    const safeHref = readLocationHrefSafe(locationLike);
    if (safeHref) {
      addCandidate(safeHref);
    }

    if (typeof originalHref === 'string' && originalHref) {
      addCandidate(originalHref);
    }

    const origin = readLocationOriginSafe(locationLike);
    const pathname = readLocationPathnameSafe(locationLike);

    if (origin) {
      if (pathname) {
        addCandidate(`${origin}${pathname}`);
      }
      addCandidate(`${origin}/`);
    }

    if (typeof window !== 'undefined' && window && window.location) {
      const windowHref = readLocationHrefSafe(window.location);
      if (windowHref) {
        addCandidate(windowHref);
      }
    }

    return candidates;
  }

  function normaliseHrefForComparison(value, baseHref) {
    if (typeof value !== 'string') {
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }

    if (typeof URL === 'function') {
      try {
        return new URL(trimmed).toString();
      } catch (primaryError) {
        void primaryError;

        if (typeof baseHref === 'string' && baseHref) {
          try {
            return new URL(trimmed, baseHref).toString();
          } catch (secondaryError) {
            void secondaryError;
          }
        }
      }
    }

    return trimmed;
  }

  function buildForceReloadUrl(locationLike, paramName) {
    const param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';
    const timestamp = Date.now().toString(36);
    const originalHref = readLocationHrefSafe(locationLike);
    const baseCandidates = getForceReloadBaseCandidates(locationLike, originalHref);

    if (!originalHref) {
      return {
        originalHref,
        nextHref: originalHref,
        param,
        timestamp,
      };
    }

    if (typeof URL === 'function') {
      const urlCandidates = [originalHref, ...baseCandidates];

      for (let index = 0; index < urlCandidates.length; index += 1) {
        const candidate = urlCandidates[index];

        try {
          const url = index === 0 ? new URL(candidate) : new URL(originalHref, candidate);
          url.searchParams.set(param, timestamp);
          return {
            originalHref,
            nextHref: url.toString(),
            param,
            timestamp,
          };
        } catch (candidateError) {
          void candidateError;
        }
      }
    }

    let href = originalHref;
    let hash = '';
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      hash = href.slice(hashIndex);
      href = href.slice(0, hashIndex);
    }

    const pattern = new RegExp(`([?&])${param}=[^&]*`);
    const replacement = `$1${param}=${timestamp}`;

    if (pattern.test(href)) {
      href = href.replace(pattern, replacement);
    } else if (href.indexOf('?') !== -1) {
      href += `&${param}=${timestamp}`;
    } else if (href) {
      href += `?${param}=${timestamp}`;
    }

    if (typeof URL === 'function') {
      for (let index = 0; index < baseCandidates.length; index += 1) {
        const candidate = baseCandidates[index];

        try {
          const absolute = new URL(href + hash, candidate).toString();
          return {
            originalHref,
            nextHref: absolute,
            param,
            timestamp,
          };
        } catch (absoluteError) {
          void absoluteError;
        }
      }
    }

    return {
      originalHref,
      nextHref: href ? href + hash : originalHref,
      param,
      timestamp,
    };
  }

  function scheduleForceReloadNavigationWarning(
    locationLike,
    baseHref,
    description,
    before,
    expected,
    initialAfter,
  ) {
    let schedule = null;

    try {
      if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
        schedule = window.setTimeout.bind(window);
      }
    } catch (error) {
      void error;
    }

    if (!schedule) {
      if (typeof setTimeout === 'function') {
        schedule = setTimeout;
      } else {
        safeWarn('Forced reload navigation attempt did not update location', {
          description,
          before,
          after: initialAfter,
          expected,
        });
        return;
      }
    }

    let resolved = false;

    const evaluate = () => {
      const currentRaw = readLocationHrefSafe(locationLike);
      const current = normaliseHrefForComparison(currentRaw, baseHref);

      if (
        (expected && (current === expected || current === `${expected}#`))
        || (before !== current && current && (!expected || current === expected))
      ) {
        resolved = true;
        return { matched: true, value: current };
      }

      return { matched: false, value: current };
    };

    const verifyDelays = [90, 240, 480];

    verifyDelays.forEach((delay, index) => {
      const isFinalCheck = index === verifyDelays.length - 1;

      const runCheck = () => {
        if (resolved) {
          return;
        }

        const result = evaluate();

        if (result.matched) {
          return;
        }

        if (isFinalCheck) {
          resolved = true;
          safeWarn('Forced reload navigation attempt did not update location', {
            description,
            before,
            after: result.value,
            expected,
          });
        }
      };

      try {
        schedule(runCheck, delay);
      } catch (scheduleError) {
        void scheduleError;
        if (isFinalCheck) {
          runCheck();
        }
      }
    });
  }

  function attemptForceReloadNavigation(locationLike, nextHref, baseHref, applyFn, description) {
    if (!locationLike || typeof applyFn !== 'function' || typeof nextHref !== 'string' || !nextHref) {
      return false;
    }

    const beforeRaw = readLocationHrefSafe(locationLike);
    const before = normaliseHrefForComparison(beforeRaw, baseHref);

    try {
      applyFn(nextHref);
    } catch (error) {
      safeWarn('Forced reload navigation helper failed', { description, error });
      return false;
    }

    const afterRaw = readLocationHrefSafe(locationLike);
    const after = normaliseHrefForComparison(afterRaw, baseHref);
    const expected = normaliseHrefForComparison(nextHref, baseHref);

    if (
      (expected && (after === expected || after === `${expected}#`))
      || (before !== after && after && (!expected || after === expected))
    ) {
      return true;
    }

    scheduleForceReloadNavigationWarning(locationLike, baseHref, description, before, expected, after);

    return false;
  }

  function attemptForceReloadHistoryFallback(win, locationLike, nextHref, baseHref) {
    if (!win || !locationLike || typeof nextHref !== 'string' || !nextHref) {
      return false;
    }

    let historyLike = null;
    try {
      historyLike = win.history || null;
    } catch (error) {
      safeWarn('Forced reload history access failed', error);
      historyLike = null;
    }

    if (!historyLike || typeof historyLike.replaceState !== 'function') {
      return false;
    }

    const beforeRaw = readLocationHrefSafe(locationLike);
    const before = normaliseHrefForComparison(beforeRaw, baseHref);
    const expected = normaliseHrefForComparison(nextHref, baseHref);

    let replaceUrl = nextHref;
    try {
      const reference = beforeRaw || baseHref || undefined;
      const parsed = typeof URL === 'function' ? new URL(nextHref, reference) : null;
      if (parsed) {
        replaceUrl = `${parsed.pathname || ''}${parsed.search || ''}${parsed.hash || ''}` || parsed.toString();
      }
    } catch (error) {
      safeWarn('Forced reload history fallback URL parse failed', error);
      replaceUrl = nextHref;
    }

    let stateSnapshot = null;
    let hasStateSnapshot = false;

    try {
      stateSnapshot = historyLike.state;
      hasStateSnapshot = true;
    } catch (stateError) {
      safeWarn('Forced reload history state snapshot failed', stateError);
    }

    try {
      historyLike.replaceState(hasStateSnapshot ? stateSnapshot : null, '', replaceUrl);
    } catch (replaceError) {
      safeWarn('Forced reload history replaceState failed', replaceError);
      return false;
    }

    const afterRaw = readLocationHrefSafe(locationLike);
    const after = normaliseHrefForComparison(afterRaw, baseHref);

    const updated =
      (expected && (after === expected || after === `${expected}#`))
      || (before !== after && after && (!expected || after === expected));

    if (!updated) {
      scheduleForceReloadNavigationWarning(
        locationLike,
        baseHref,
        'history.replaceState',
        before,
        expected,
        after,
      );
      return false;
    }

    if (typeof locationLike.reload === 'function') {
      try {
        locationLike.reload();
        return true;
      } catch (reloadError) {
        safeWarn('Forced reload via history replaceState reload failed', reloadError);
      }
    }

    return true;
  }

  function scheduleForceReloadFallbacks(win, locationLike, options = {}) {
    if (!win || !locationLike) {
      return;
    }

    let schedule = null;
    try {
      if (typeof win.setTimeout === 'function') {
        schedule = win.setTimeout.bind(win);
      }
    } catch (error) {
      void error;
    }

    if (!schedule) {
      if (typeof setTimeout === 'function') {
        schedule = setTimeout;
      } else {
        return;
      }
    }

    const hasReload = options.hasReload === true && typeof locationLike.reload === 'function';
    const baseHref = typeof options.baseHref === 'string' ? options.baseHref : '';
    const nextHref = typeof options.nextHref === 'string' ? options.nextHref : '';
    const originalHref = typeof options.originalHref === 'string' ? options.originalHref : '';

    const fallbackHref = nextHref || baseHref || originalHref || '';
    const hashBase = fallbackHref ? fallbackHref.split('#')[0] : (baseHref || originalHref || '');
    const fallbackToken =
      typeof options.timestamp === 'string' && options.timestamp
        ? options.timestamp
        : Date.now().toString(36);
    const hashFallback = hashBase ? `${hashBase}#forceReload-${fallbackToken}` : '';

    const steps = [];

    let nextDelay = 120;
    const delayIncrement = 120;

    const queueStep = (run) => {
      steps.push({
        delay: nextDelay,
        run,
      });
      nextDelay += delayIncrement;
    };

    if (fallbackHref) {
      if (typeof locationLike.assign === 'function') {
        queueStep(() => {
          try {
            locationLike.assign(fallbackHref);
          } catch (error) {
            safeWarn('Forced reload fallback via location.assign failed', error);
          }
        });
      }

      if (typeof locationLike.replace === 'function') {
        queueStep(() => {
          try {
            locationLike.replace(fallbackHref);
          } catch (error) {
            safeWarn('Forced reload fallback via location.replace failed', error);
          }
        });
      }

      queueStep(() => {
        try {
          locationLike.href = fallbackHref;
        } catch (error) {
          safeWarn('Forced reload fallback via href assignment failed', error);
        }
      });
    }

    if (hashFallback && hashFallback !== fallbackHref) {
      queueStep(() => {
        try {
          locationLike.href = hashFallback;
        } catch (error) {
          safeWarn('Forced reload fallback via hash injection failed', error);
        }
      });
    }

    if (hasReload) {
      const reloadDelay = steps.length ? Math.max(nextDelay, 280) : 280;
      steps.push({
        delay: reloadDelay,
        run() {
          try {
            locationLike.reload();
          } catch (error) {
            safeWarn('Timed force reload fallback failed', error);
          }
        },
      });
    }

    if (!steps.length) {
      return;
    }

    steps.forEach((step) => {
      try {
        schedule(step.run, step.delay);
      } catch (scheduleError) {
        safeWarn('Unable to schedule forced reload fallback', scheduleError);
      }
    });
  }

  function triggerReload(windowOverride) {
    const win = resolveWindow(windowOverride);
    if (!win || !win.location) {
      return false;
    }

    const { location } = win;
    const hasReplace = location && typeof location.replace === 'function';
    const hasAssign = location && typeof location.assign === 'function';
    const hasReload = location && typeof location.reload === 'function';
    let navigationTriggered = false;

    const forceReloadUrl = buildForceReloadUrl(location, 'forceReload');
    const nextHref = forceReloadUrl.nextHref;
    const originalHref = forceReloadUrl.originalHref;
    const timestamp = forceReloadUrl.timestamp;
    const baseHref = normaliseHrefForComparison(originalHref, originalHref) || originalHref;

    if (hasReplace && nextHref) {
      navigationTriggered = attemptForceReloadNavigation(
        location,
        nextHref,
        baseHref,
        (url) => {
          location.replace(url);
        },
        'location.replace',
      );
    }

    if (hasAssign && !navigationTriggered && nextHref) {
      navigationTriggered = attemptForceReloadNavigation(
        location,
        nextHref,
        baseHref,
        (url) => {
          location.assign(url);
        },
        'location.assign',
      );
    }

    if (!navigationTriggered && nextHref && nextHref !== originalHref) {
      navigationTriggered = attemptForceReloadNavigation(
        location,
        nextHref,
        baseHref,
        (url) => {
          location.href = url;
        },
        'location.href assignment',
      );
    }

    if (!navigationTriggered && win && nextHref) {
      navigationTriggered = attemptForceReloadHistoryFallback(win, location, nextHref, baseHref);
    }

    const canOnlyReload = !nextHref || nextHref === originalHref;

    if (!navigationTriggered && canOnlyReload && hasReload) {
      try {
        location.reload();
        navigationTriggered = true;
      } catch (reloadError) {
        safeWarn('Forced reload via location.reload failed', reloadError);
      }
    }

    if (!navigationTriggered) {
      scheduleForceReloadFallbacks(win, location, {
        originalHref,
        baseHref,
        nextHref,
        hasReload,
        timestamp,
      });
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

    const serviceWorkerCleanupPromise = (async () => {
      try {
        return await unregisterServiceWorkers(options.navigator);
      } catch (error) {
        safeWarn('Service worker cleanup failed', error);
        return false;
      }
    })();

    const cacheCleanupPromise = (async () => {
      try {
        return await clearCacheStorage(options.caches);
      } catch (error) {
        safeWarn('Cache clear failed', error);
        return false;
      }
    })();

    let serviceWorkersUnregistered = false;

    try {
      serviceWorkersUnregistered = await serviceWorkerCleanupPromise;
    } catch (error) {
      safeWarn('Service worker cleanup promise rejected', error);
      serviceWorkersUnregistered = false;
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

    let cachesCleared = false;

    try {
      cachesCleared = await cacheCleanupPromise;
    } catch (error) {
      safeWarn('Cache cleanup promise rejected', error);
      cachesCleared = false;
    }

    return {
      uiCacheCleared,
      serviceWorkersUnregistered,
      cachesCleared,
      reloadTriggered,
      navigationTriggered: reloadTriggered,
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

  informModuleGlobals('cineOffline', offlineAPI);

  registerOrQueueModule(
    'cineOffline',
    offlineAPI,
    {
      category: 'offline',
      description: 'Offline helpers for service worker registration and cache recovery.',
      replace: true,
      connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineEnvironmentBridge', 'cineModuleContext'],
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
