(function () {
  /**
   * The offline module coordinates how the planner behaves when network access
   * disappears. Clear documentation keeps the lifecycle predictable, which is
   * crucial because offline caching and restore flows protect the user's work.
   */
  function detectGlobalScope() {
    // The scope discovery mirrors the persistence module so that both features
    // are always aligned. Every branch is intentionally ordered by likelihood.
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

  /**
   * Resolve the shared module linker which exposes already-booted runtime
   * components. We keep the lookup defensive because offline start-up must
   * never fail even if a linker was not registered yet.
   */
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

  /**
   * When the linker is unavailable we fall back to the environment helpers that
   * other modules stash on the global scope. This mirrors how service workers
   * hydrate their utilities during startup and keeps offline mode synchronous.
   */
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

  /**
   * The bridge exposes lightweight wrappers around storage and messaging. By
   * reusing the same discovery process we avoid creating duplicate bridges that
   * could drift apart and risk inconsistent offline queues.
   */
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

  /**
   * Retrieve module globals lazily so we remain compatible with window and
   * worker contexts alike. The guard keeps us from assuming that globals exist
   * which is vital for predictable offline recovery.
   */
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

  /**
   * Publish the module API to the runtime registry. Broadcasting the interface
   * allows other modules (for example persistence) to coordinate with offline
   * helpers without creating tight coupling.
   */
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



  function isNodeProcessReference(value) {
    if (!value) {
      return false;
    }

    if (typeof process === 'undefined' || !process) {
      return false;
    }

    if (value === process) {
      return true;
    }

    if (typeof value === 'object') {
      try {
        if (value.constructor && value.constructor.name === 'process') {
          return true;
        }
      } catch (processInspectionError) {
        void processInspectionError;
      }

      if (
        typeof value.pid === 'number' &&
        typeof value.nextTick === 'function' &&
        typeof value.emit === 'function' &&
        typeof value.binding === 'function'
      ) {
        return true;
      }
    }

    if (typeof value === 'function') {
      if (
        value === process.binding ||
        value === process._linkedBinding ||
        value === process.dlopen
      ) {
        return true;
      }

      try {
        const functionName = value.name || '';
        if (functionName && (functionName === 'binding' || functionName === 'dlopen')) {
          const source = Function.prototype.toString.call(value);
          if (source && source.indexOf('[native code]') !== -1) {
            return true;
          }
        }
      } catch (functionInspectionError) {
        void functionInspectionError;
      }
    }

    return false;
  }

  function shouldBypassDeepFreeze(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    if (isNodeProcessReference(value)) {
      return true;
    }

    if (
      typeof process !== 'undefined' &&
      process &&
      process.release &&
      process.release.name === 'node'
    ) {
      return true;
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

  function fallbackResolveSeenTracker(seen) {
    if (seen && typeof seen.has === 'function' && typeof seen.add === 'function') {
      return seen;
    }

    if (Array.isArray(seen)) {
      return {
        has(value) {
          return seen.indexOf(value) !== -1;
        },
        add(value) {
          if (seen.indexOf(value) === -1) {
            seen.push(value);
          }
        },
      };
    }

    if (typeof WeakSet === 'function') {
      try {
        return new WeakSet();
      } catch (trackerError) {
        void trackerError;
      }
    }

    const tracked = [];
    return {
      has(value) {
        return tracked.indexOf(value) !== -1;
      },
      add(value) {
        if (tracked.indexOf(value) === -1) {
          tracked.push(value);
        }
      },
    };
  }

  function fallbackFreezeDeep(value, seen) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    const tracker = fallbackResolveSeenTracker(seen);

    if (tracker.has(value)) {
      return value;
    }

    tracker.add(value);

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
      fallbackFreezeDeep(child, tracker);
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

  const FORCE_RELOAD_CLEANUP_TIMEOUT_MS = 700;
  const RELOAD_WARMUP_MAX_WAIT_MS = 180;
  let reloadWarmupFailureLogged = false;

  function createDelay(ms) {
    const waitMs = typeof ms === 'number' && ms >= 0 ? ms : 0;

    if (typeof setTimeout !== 'function') {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      try {
        setTimeout(resolve, waitMs);
      } catch (error) {
        void error;
        resolve();
      }
    });
  }

  function settlePromise(promise) {
    if (!promise || typeof promise.then !== 'function') {
      return Promise.resolve(false);
    }

    return promise
      .then(() => true)
      .catch(() => false);
  }

  function shouldSuppressReloadWarmupFailure(error, href) {
    if (!error) {
      return false;
    }

    let message = '';
    try {
      message = typeof error.message === 'string' ? error.message : '';
    } catch (readError) {
      void readError;
      message = '';
    }

    let name = '';
    try {
      name = typeof error.name === 'string' ? error.name : '';
    } catch (readError) {
      void readError;
      name = '';
    }

    const normalisedMessage = message.toLowerCase();
    const normalisedName = name.toLowerCase();

    if (normalisedName === 'aborted' || normalisedName === 'aborterror') {
      return true;
    }

    if (normalisedMessage.includes('load failed')) {
      return true;
    }

    if (normalisedMessage.includes('cancelled') || normalisedMessage.includes('canceled')) {
      return true;
    }

    if (typeof DOMException === 'function') {
      try {
        if (error instanceof DOMException && (error.name === 'NetworkError' || error.code === DOMException.NETWORK_ERR)) {
          return true;
        }
      } catch (inspectionError) {
        void inspectionError;
      }
    }

    if (href && typeof href === 'string') {
      try {
        const baseHref = typeof location === 'object' && location ? readLocationHrefSafe(location) : undefined;
        const parsed = typeof URL === 'function' ? new URL(href, baseHref || undefined) : null;
        if (parsed && parsed.protocol && parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          return true;
        }
      } catch (parseError) {
        void parseError;
      }
    }

    return false;
  }

  function scheduleReloadWarmup(options = {}) {
    const nextHref = typeof options.nextHref === 'string' ? options.nextHref : '';
    if (!nextHref) {
      return null;
    }

    const win = resolveWindow(options.window);
    const fetchFn = resolveFetch(options.fetch, win);
    if (typeof fetchFn !== 'function') {
      return null;
    }

    const locationLike =
      options.location && typeof options.location === 'object'
        ? options.location
        : win && win.location
          ? win.location
          : null;

    if (!isSameOriginReloadTarget(locationLike, nextHref)) {
      return null;
    }

    const nav = resolveNavigator(options.navigator);
    if (nav && nav.onLine === false) {
      return null;
    }

    let controller = null;
    if (typeof AbortController === 'function') {
      try {
        controller = new AbortController();
      } catch (abortError) {
        void abortError;
        controller = null;
      }
    }

    let serviceWorkerSettled = false;
    let cachesSettled = false;

    const serviceWorkerPromise = settlePromise(options.serviceWorkerPromise).then((result) => {
      serviceWorkerSettled = true;
      return result;
    });

    const cachePromise = settlePromise(options.cachePromise).then((result) => {
      cachesSettled = true;
      return result;
    });

    const shouldAllowCache = options.allowCache === true;

    const executeWarmup = async () => {
      try {
        await Promise.race([serviceWorkerPromise, createDelay(RELOAD_WARMUP_MAX_WAIT_MS)]);
      } catch (error) {
        void error;
      }

      try {
        await Promise.race([cachePromise, createDelay(RELOAD_WARMUP_MAX_WAIT_MS)]);
      } catch (error) {
        void error;
      }

      const allowCachePopulation = shouldAllowCache && serviceWorkerSettled && cachesSettled;

      const buildRequestInit = (overrides = {}) => {
        const requestInit = {
          cache: allowCachePopulation ? 'reload' : 'no-store',
          credentials: 'same-origin',
          redirect: 'follow',
        };

        if (controller && controller.signal) {
          requestInit.signal = controller.signal;
        }

        return Object.assign(requestInit, overrides);
      };

      const performFetch = async (overrides = {}) => {
        const requestInit = buildRequestInit(overrides);
        return fetchFn.call(win || undefined, nextHref, requestInit);
      };

      const isAborted = () => controller && controller.signal && controller.signal.aborted === true;

      let response = null;
      let firstError = null;

      try {
        response = await performFetch();
      } catch (error) {
        firstError = error;
      }

      if (!response) {
        if (isAborted()) {
          return false;
        }

        let fallbackResponse = null;
        let fallbackError = firstError;

        try {
          fallbackResponse = await performFetch({ cache: 'default' });
        } catch (secondError) {
          fallbackError = secondError || firstError;
        }

        if (!fallbackResponse) {
          if (isAborted()) {
            return false;
          }

          const suppressWarning = shouldSuppressReloadWarmupFailure(fallbackError || firstError, nextHref);

          if (!reloadWarmupFailureLogged && !suppressWarning) {
            reloadWarmupFailureLogged = true;
            safeWarn('Reload warmup fetch failed', fallbackError || firstError);
          }

          return false;
        }

        response = fallbackResponse;
      }

      if (!response) {
        return false;
      }

      try {
        const body = typeof response.clone === 'function' ? response.clone() : response;
        if (body && typeof body.text === 'function' && body.bodyUsed !== true) {
          await body.text();
        }
      } catch (consumeError) {
        void consumeError;
      }

      return true;
    };

    const warmupTask = executeWarmup();
    if (warmupTask && typeof warmupTask.catch === 'function') {
      warmupTask.catch(() => {});
    }

    return {
      cancel() {
        if (controller && typeof controller.abort === 'function') {
          try {
            controller.abort();
          } catch (abortError) {
            void abortError;
          }
        }
      },
      promise: warmupTask,
      done: warmupTask,
    };
  }

  function awaitPromiseWithSoftTimeout(promise, timeoutMs, onTimeout, onLateRejection) {
    if (!promise || typeof promise.then !== 'function') {
      return Promise.resolve({ timedOut: false, result: promise });
    }

    const ms = typeof timeoutMs === 'number' && timeoutMs >= 0 ? timeoutMs : null;
    const schedule = typeof setTimeout === 'function' ? setTimeout : null;
    const cancel = typeof clearTimeout === 'function' ? clearTimeout : null;

    if (ms === null || !schedule) {
      return promise.then(result => ({ timedOut: false, result }));
    }

    let finished = false;
    let timerId = null;

    return new Promise((resolve, reject) => {
      promise.then(
        value => {
          if (finished) {
            return value;
          }

          finished = true;
          if (timerId != null && cancel) {
            try {
              cancel(timerId);
            } catch (cancelError) {
              void cancelError;
            }
          }

          resolve({ timedOut: false, result: value });
          return value;
        },
        error => {
          if (finished) {
            if (typeof onLateRejection === 'function') {
              try {
                onLateRejection(error);
              } catch (lateError) {
                void lateError;
              }
            }
            return null;
          }

          finished = true;
          if (timerId != null && cancel) {
            try {
              cancel(timerId);
            } catch (cancelError) {
              void cancelError;
            }
          }

          reject(error);
          return null;
        },
      );

      timerId = schedule(() => {
        if (finished) {
          return;
        }

        finished = true;

        if (typeof onTimeout === 'function') {
          try {
            onTimeout();
          } catch (timeoutError) {
            void timeoutError;
          }
        }

        resolve({ timedOut: true, result: undefined });
      }, ms);
    });
  }

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

  function resolveLocation(explicitLocation) {
    if (explicitLocation && typeof explicitLocation === 'object') {
      return explicitLocation;
    }

    const win = resolveWindow();
    if (win && win.location && typeof win.location === 'object') {
      return win.location;
    }

    return resolveGlobal('location');
  }

  function resolveFetch(explicitFetch, windowLike) {
    if (typeof explicitFetch === 'function') {
      return explicitFetch;
    }

    if (typeof fetch === 'function') {
      return fetch;
    }

    const win = windowLike || resolveWindow();
    if (win && typeof win.fetch === 'function') {
      try {
        return win.fetch.bind(win);
      } catch (error) {
        void error;
        return win.fetch;
      }
    }

    const globalFetch = resolveGlobal('fetch');
    return typeof globalFetch === 'function' ? globalFetch : null;
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

  function resolveHrefOrigin(targetHref, referenceHref) {
    if (typeof targetHref !== 'string' || !targetHref) {
      return '';
    }

    const reference = typeof referenceHref === 'string' && referenceHref ? referenceHref : undefined;

    if (typeof URL === 'function') {
      try {
        const url = new URL(targetHref, reference);
        if (url && typeof url.origin === 'string') {
          return url.origin;
        }
      } catch (error) {
        void error;
      }
    }

    const originMatch = targetHref.match(/^([a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/]+)/);
    return originMatch && originMatch[1] ? originMatch[1] : '';
  }

  function isSameOriginReloadTarget(locationLike, targetHref) {
    if (typeof targetHref !== 'string' || !targetHref) {
      return false;
    }

    const fallbackLocation =
      locationLike && typeof locationLike === 'object'
        ? locationLike
        : typeof window !== 'undefined' && window && window.location
          ? window.location
          : null;

    const referenceHref = readLocationHrefSafe(locationLike) || readLocationHrefSafe(fallbackLocation);
    const targetOrigin = resolveHrefOrigin(targetHref, referenceHref);

    if (!targetOrigin) {
      return true;
    }

    const expectedOrigin = readLocationOriginSafe(locationLike) || readLocationOriginSafe(fallbackLocation);

    if (!expectedOrigin) {
      return false;
    }

    return targetOrigin === expectedOrigin;
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

  function enforceSameOriginNextHref(locationLike, originalHref, nextHref) {
    if (isSameOriginReloadTarget(locationLike, nextHref)) {
      return nextHref;
    }

    const fallbackHref = typeof originalHref === 'string' && originalHref ? originalHref : '';
    const baseHref = readLocationHrefSafe(locationLike) || fallbackHref;

    if (typeof URL === 'function' && baseHref) {
      try {
        const base = new URL(baseHref, fallbackHref || undefined);
        const candidate = new URL(nextHref, baseHref);
        const rebuilt = `${base.origin || ''}${candidate.pathname || ''}${candidate.search || ''}${candidate.hash || ''}`;
        if (rebuilt && isSameOriginReloadTarget(locationLike, rebuilt)) {
          return rebuilt;
        }
      } catch (rebuildError) {
        void rebuildError;
      }
    }

    if (typeof nextHref === 'string') {
      const originPattern = /^[a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/]+(.*)$/;
      const match = nextHref.match(originPattern);
      const origin = readLocationOriginSafe(locationLike);
      if (match && match[1] && origin) {
        const rebuilt = `${origin}${match[1]}`;
        if (isSameOriginReloadTarget(locationLike, rebuilt)) {
          return rebuilt;
        }
      }
    }

    return fallbackHref || baseHref || '';
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
          const candidateHref = url.toString();
          return {
            originalHref,
            nextHref: enforceSameOriginNextHref(locationLike, originalHref, candidateHref),
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
          const candidateHref = absolute;
          return {
            originalHref,
            nextHref: enforceSameOriginNextHref(locationLike, originalHref, candidateHref),
            param,
            timestamp,
          };
        } catch (absoluteError) {
          void absoluteError;
        }
      }
    }

    const candidateHref = href ? href + hash : originalHref;
    return {
      originalHref,
      nextHref: enforceSameOriginNextHref(locationLike, originalHref, candidateHref),
      param,
      timestamp,
    };
  }

  function isForceReloadHash(hashValue, paramName) {
    if (typeof hashValue !== 'string' || !hashValue) {
      return false;
    }

    const trimmed = hashValue.trim();
    if (!trimmed) {
      return false;
    }

    const param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';
    const prefix = `#${param}`;

    if (!trimmed.startsWith(prefix)) {
      return false;
    }

    if (trimmed.length === prefix.length) {
      return true;
    }

    const suffix = trimmed.slice(prefix.length);
    return /^[-=]/.test(suffix);
  }

  function normaliseHrefForHistory(targetHref, baseHref) {
    if (typeof targetHref !== 'string' || !targetHref) {
      return targetHref;
    }

    if (typeof URL === 'function') {
      const reference = typeof baseHref === 'string' && baseHref ? baseHref : undefined;

      try {
        const parsed = new URL(targetHref, reference);
        return `${parsed.pathname || ''}${parsed.search || ''}${parsed.hash || ''}` || parsed.toString();
      } catch (error) {
        void error;
      }
    }

    return targetHref;
  }

  function cleanupForceReloadArtifacts(win, paramName = 'forceReload') {
    const targetWindow = resolveWindow(win);
    if (!targetWindow || !targetWindow.location) {
      return false;
    }

    const { location } = targetWindow;
    const originalHref = readLocationHrefSafe(location);
    if (!originalHref) {
      return false;
    }

    const param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';

    let cleanedHref = originalHref;
    let removedQuery = false;
    let removedHash = false;

    if (typeof URL === 'function') {
      try {
        const url = new URL(originalHref);

        if (url.searchParams && typeof url.searchParams.delete === 'function' && url.searchParams.has(param)) {
          url.searchParams.delete(param);
          removedQuery = true;
        }

        if (isForceReloadHash(url.hash, param)) {
          url.hash = '';
          removedHash = true;
        }

        cleanedHref = url.toString();
      } catch (urlError) {
        void urlError;
      }
    }

    if (!removedQuery) {
      let hrefWithoutHash = cleanedHref;
      let hashPart = '';

      const hashIndex = hrefWithoutHash.indexOf('#');
      if (hashIndex !== -1) {
        hashPart = hrefWithoutHash.slice(hashIndex);
        hrefWithoutHash = hrefWithoutHash.slice(0, hashIndex);
      }

      const queryIndex = hrefWithoutHash.indexOf('?');
      if (queryIndex !== -1) {
        const base = hrefWithoutHash.slice(0, queryIndex);
        const query = hrefWithoutHash.slice(queryIndex + 1);

        const segments = query.split('&');
        const filtered = [];

        for (let index = 0; index < segments.length; index += 1) {
          const segment = segments[index];
          if (!segment) {
            continue;
          }

          const equalsIndex = segment.indexOf('=');
          const key = equalsIndex === -1 ? segment : segment.slice(0, equalsIndex);

          if (key === param) {
            removedQuery = true;
            continue;
          }

          filtered.push(segment);
        }

        hrefWithoutHash = filtered.length ? `${base}?${filtered.join('&')}` : base;
      }

      cleanedHref = hashPart ? `${hrefWithoutHash}${hashPart}` : hrefWithoutHash;
    }

    if (!removedHash && isForceReloadHash(targetWindow.location && targetWindow.location.hash, param)) {
      removedHash = true;
      cleanedHref = cleanedHref.replace(/#.*$/, '');
    }

    if (!removedQuery && !removedHash) {
      return false;
    }

    const baseHref = normaliseHrefForComparison(originalHref, originalHref) || originalHref;

    let historyLike = null;
    try {
      historyLike = targetWindow.history || null;
    } catch (historyError) {
      safeWarn('Force reload cleanup failed to access history object', historyError);
      historyLike = null;
    }

    if (historyLike && typeof historyLike.replaceState === 'function') {
      let stateSnapshot = null;
      let hasStateSnapshot = false;

      try {
        stateSnapshot = historyLike.state;
        hasStateSnapshot = true;
      } catch (stateError) {
        safeWarn('Force reload cleanup failed to snapshot history state', stateError);
      }

      const replaceUrl = normaliseHrefForHistory(cleanedHref, baseHref);

      try {
        historyLike.replaceState(hasStateSnapshot ? stateSnapshot : null, '', replaceUrl);
        return true;
      } catch (replaceError) {
        safeWarn('Force reload cleanup failed to update history state', replaceError);
      }
    }

    if (removedHash) {
      try {
        if (typeof targetWindow.location.hash === 'string' && isForceReloadHash(targetWindow.location.hash, param)) {
          targetWindow.location.hash = '';
          return true;
        }
      } catch (hashError) {
        safeWarn('Force reload cleanup failed to clear hash fallback', hashError);
      }
    }

    return false;
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

  function triggerReload(windowOverride, precomputedForceReloadUrl) {
    const win = resolveWindow(windowOverride);
    if (!win || !win.location) {
      return false;
    }

    const { location } = win;
    const hasReplace = location && typeof location.replace === 'function';
    const hasAssign = location && typeof location.assign === 'function';
    const hasReload = location && typeof location.reload === 'function';
    let navigationTriggered = false;

    const forceReloadUrl =
      precomputedForceReloadUrl && typeof precomputedForceReloadUrl === 'object'
        ? precomputedForceReloadUrl
        : buildForceReloadUrl(location, 'forceReload');

    const originalHrefCandidate =
      typeof forceReloadUrl.originalHref === 'string' && forceReloadUrl.originalHref
        ? forceReloadUrl.originalHref
        : readLocationHrefSafe(location);
    const originalHref = originalHrefCandidate || readLocationHrefSafe(location);
    const nextHref = typeof forceReloadUrl.nextHref === 'string' ? forceReloadUrl.nextHref : '';
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
    const win = resolveWindow(options.window);
    const location = resolveLocation(options.location || (win && win.location));
    const forceReloadUrl = buildForceReloadUrl(location, 'forceReload');

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

    const warmupHandle = scheduleReloadWarmup({
      window: win,
      navigator: options.navigator,
      fetch: options.fetch,
      nextHref: forceReloadUrl.nextHref,
      serviceWorkerPromise: serviceWorkerCleanupPromise,
      cachePromise: cacheCleanupPromise,
      allowCache: true,
    });

    const resolveWarmupPromise = (handle) => {
      if (!handle || typeof handle !== 'object') {
        return null;
      }

      if (handle.promise && typeof handle.promise.then === 'function') {
        return handle.promise;
      }

      if (handle.done && typeof handle.done.then === 'function') {
        return handle.done;
      }

      return null;
    };

    const wrapResultWithSource = (source, promise) => {
      if (!promise || typeof promise.then !== 'function') {
        return Promise.resolve({
          source,
          value: promise,
          successful: true,
          error: null,
        });
      }

      return Promise.resolve(promise)
        .then((value) => ({
          source,
          value,
          successful: true,
          error: null,
        }))
        .catch((error) => ({
          source,
          value: undefined,
          successful: false,
          error,
        }));
    };

    const warmupPromise = resolveWarmupPromise(warmupHandle);

    let serviceWorkerResultLogged = false;
    const serviceWorkerResultPromiseRaw = wrapResultWithSource('serviceWorker', serviceWorkerCleanupPromise);
    const serviceWorkerResultPromise = serviceWorkerResultPromiseRaw.then((result) => {
      if (!result.successful && result.error && !serviceWorkerResultLogged) {
        serviceWorkerResultLogged = true;
        safeWarn('Service worker cleanup promise rejected', result.error);
      }
      return result;
    });

    const warmupResultPromise = warmupPromise ? wrapResultWithSource('warmup', warmupPromise) : null;

    const gatePromise = warmupResultPromise
      ? Promise.race([serviceWorkerResultPromise, warmupResultPromise])
      : serviceWorkerResultPromise;

    let serviceWorkersUnregistered = false;
    let warmupFinishedBeforeReload = false;
    let serviceWorkerStatusKnown = false;

    try {
      const serviceWorkerAwaitResult = await awaitPromiseWithSoftTimeout(
        gatePromise,
        FORCE_RELOAD_CLEANUP_TIMEOUT_MS,
        () => {
          safeWarn('Service worker cleanup or warmup timed out before reload, continuing anyway.', {
            timeoutMs: FORCE_RELOAD_CLEANUP_TIMEOUT_MS,
          });
        },
        (lateError) => {
          if (lateError && lateError.source === 'warmup') {
            const detail = lateError.error || lateError;
            safeWarn('Reload warmup failed after reload triggered', detail);
            return;
          }

          const detail = lateError && lateError.error ? lateError.error : lateError;
          safeWarn('Service worker cleanup failed after reload triggered', detail);
        },
      );

      if (serviceWorkerAwaitResult && serviceWorkerAwaitResult.timedOut !== true) {
        const gateResult = serviceWorkerAwaitResult.result;

        if (gateResult && gateResult.source === 'serviceWorker') {
          serviceWorkerStatusKnown = true;

          if (gateResult.successful) {
            serviceWorkersUnregistered = !!gateResult.value;
          } else if (!serviceWorkerResultLogged && gateResult.error) {
            serviceWorkerResultLogged = true;
            safeWarn('Service worker cleanup promise rejected', gateResult.error);
          }
        } else if (gateResult && gateResult.source === 'warmup') {
          warmupFinishedBeforeReload = gateResult.successful && gateResult.value === true;

          if (!gateResult.successful && gateResult.error) {
            safeWarn('Reload warmup promise rejected before reload triggered', gateResult.error);
          }
        }
      }
    } catch (error) {
      const detail = error && error.error ? error.error : error;
      safeWarn('Reload preparation gate failed', detail);
    }

    let reloadTriggered = false;
    const reloadFn = typeof options.reloadWindow === 'function' ? options.reloadWindow : triggerReload;

    try {
      reloadTriggered = reloadFn(options.window, forceReloadUrl);
    } catch (error) {
      safeWarn('Forced reload handler failed', error);
      reloadTriggered = triggerReload(options.window, forceReloadUrl);
    }

    if (!reloadTriggered) {
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
      serviceWorkerStatusKnown,
      warmupCompleted: warmupFinishedBeforeReload,
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
      cleanupForceReloadArtifacts,
      scheduleReloadWarmup,
    },
  };

  cleanupForceReloadArtifacts();

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
