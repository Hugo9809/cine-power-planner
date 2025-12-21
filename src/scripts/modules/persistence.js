(function () {
  /**
   * The persistence module centralises every interaction with the underlying
   * storage helpers. The goal is to make it obvious which execution context is
   * currently responsible for safeguarding the project data. By explaining each
   * discovery step we help future maintainers reason about why data looks for a
   * specific bridge or linker before touching user content.
   */
  function detectGlobalScope() {
    // We progressively try every known host so the code stays resilient when
    // bundled for browsers, workers, tests or server-side rendering.
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
   * Locate the module linker that wires the loosely coupled runtime together.
   * We first try `require` so Node based tests gain the same behaviour as the
   * browser bundles. Each lookup is wrapped in a try/catch because persistence
   * must never throw and risk breaking autosave flows.
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
   * If the linker cannot provide an environment instance we still want to keep
   * the storage layer operational. The fallback loader walks through familiar
   * scopes and reuses the environment that was already injected there.
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
   * The environment bridge contains helpers for cross-context communication.
   * When it is not injected by the linker we replicate the same discovery
   * strategy as with the environment itself so offline mode keeps functioning.
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
   * Module globals store shared singletons such as the persistence registry.
   * Accessing them through this helper keeps accidental global mutations away
   * from user projects because we never touch a missing object directly.
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
   * Let the runtime know which APIs are available so other modules can reuse
   * them without creating duplicate instances. The explicit guard rails ensure
   * the registration is a no-op when the host does not support bookkeeping.
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
    if (MODULE_LINKER && typeof MODULE_LINKER.getPendingQueueKey === 'function') {
      const linkedKey = MODULE_LINKER.getPendingQueueKey();
      if (typeof linkedKey === 'string' && linkedKey) {
        return linkedKey;
      }
    }

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
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
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
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    if (typeof process !== 'undefined' && process && process.env && process.env.JEST_WORKER_ID) {
      try {
        if (typeof Object.freeze === 'function') {
          Object.freeze(value);
        }
      } catch (freezeError) {
        void freezeError;
      }
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
      if (!child || typeof child === 'function' || (typeof child !== 'object' && typeof child !== 'function')) {
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

  const providerModules = [];

  function addProviderModule(reference, label) {
    if (!reference || typeof reference !== 'object') {
      return;
    }

    providerModules.push({
      ref: reference,
      name: label || null,
    });
  }

  addProviderModule(GLOBAL_SCOPE, 'global');

  const storageModule = tryRequire('../storage.js');
  if (storageModule && typeof storageModule === 'object') {
    addProviderModule(storageModule, 'storage');
  }

  const sessionModule = tryRequire('../app-session.js');
  if (sessionModule && typeof sessionModule === 'object') {
    addProviderModule(sessionModule, 'session');
  }

  const setupsModule = tryRequire('../app-setups.js');
  if (setupsModule && typeof setupsModule === 'object') {
    addProviderModule(setupsModule, 'setups');
  }

  const bindingState = Object.create(null);
  const bindingNames = [];

  function identifyProvider(providerEntry) {
    if (!providerEntry) {
      return null;
    }

    if (providerEntry.name) {
      return providerEntry.name;
    }

    const ref = providerEntry.ref;
    if (!ref || typeof ref !== 'object') {
      return null;
    }

    if (ref === GLOBAL_SCOPE) {
      return 'global';
    }

    if (typeof ref.constructor === 'function' && ref.constructor.name) {
      return ref.constructor.name;
    }

    return null;
  }

  function ensureBindingEntry(bindingKey, implementationName) {
    const key = String(bindingKey);
    let entry = bindingState[key];
    if (!entry) {
      entry = {
        name: key,
        implementationName: implementationName || key,
        available: false,
        providerIndex: -1,
        providerName: null,
        lastChecked: null,
        implementation: null,
      };
      bindingState[key] = entry;
      bindingNames.push(key);
    } else if (implementationName && entry.implementationName !== implementationName) {
      entry.implementationName = implementationName;
    }

    return entry;
  }

  function resolveBinding(name, options = {}) {
    const refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh')
      ? options.refresh
      : true;

    const entry = ensureBindingEntry(name);
    const implementationName = entry.implementationName || String(name);
    if (!refresh && entry.implementation && typeof entry.implementation === 'function') {
      return entry;
    }

    let resolved = null;

    for (let index = 0; index < providerModules.length; index += 1) {
      const providerEntry = providerModules[index];
      const provider = providerEntry && providerEntry.ref;
      if (!provider || typeof provider !== 'object') {
        continue;
      }

      const candidate = provider[implementationName];
      if (typeof candidate === 'function') {
        resolved = {
          implementation: candidate,
          providerIndex: index,
          providerName: identifyProvider(providerEntry),
        };
        break;
      }
    }

    entry.available = !!resolved;
    entry.providerIndex = resolved ? resolved.providerIndex : -1;
    entry.providerName = resolved ? resolved.providerName : null;
    entry.lastChecked = Date.now();
    entry.implementation = resolved ? resolved.implementation : null;

    return entry;
  }

  function requireBinding(name) {
    const detail = resolveBinding(name, { refresh: true });
    if (!detail || typeof detail.implementation !== 'function') {
      const error = new Error(`cinePersistence could not resolve function "${name}".`);
      error.code = 'CINE_PERSISTENCE_BINDING_MISSING';
      error.binding = name;
      error.detail = {
        name,
        available: detail ? detail.available : false,
        providerName: detail ? detail.providerName : null,
      };
      throw error;
    }
    return detail.implementation;
  }

  function snapshotBinding(detail) {
    if (!detail) {
      return null;
    }

    return Object.freeze({
      name: detail.name,
      available: !!detail.available,
      providerIndex: typeof detail.providerIndex === 'number' ? detail.providerIndex : -1,
      providerName: detail.providerName || null,
      lastChecked: detail.lastChecked || null,
      implementation: detail.implementationName || detail.name,
    });
  }

  function createWrapper(name, alias) {
    const bindingKey = alias || name;
    ensureBindingEntry(bindingKey, name);
    return function persistenceWrapper() {
      const fn = requireBinding(bindingKey);
      return fn.apply(this, arguments);
    };
  }

  function inspectBinding(name, options = {}) {
    const normalized = String(name);
    const refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh')
      ? options.refresh
      : true;
    const detail = resolveBinding(normalized, { refresh });
    return snapshotBinding(detail);
  }

  function inspectAllBindings(options = {}) {
    const refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh')
      ? options.refresh
      : true;

    if (refresh) {
      for (let index = 0; index < bindingNames.length; index += 1) {
        resolveBinding(bindingNames[index], { refresh: true });
      }
    }

    const snapshot = {};
    for (let index = 0; index < bindingNames.length; index += 1) {
      const name = bindingNames[index];
      snapshot[name] = snapshotBinding(bindingState[name]);
    }
    return freezeDeep(snapshot);
  }

  function listBindings() {
    return bindingNames.slice();
  }

  const persistenceAPI = {
    bindings: {
      saveSession: createWrapper('saveCurrentSession', 'saveSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup', 'autoSaveSetup'),
      saveGearList: createWrapper('saveCurrentGearList', 'saveGearList'),
      restoreSessionState: createWrapper('restoreSessionState'),
      collectFullBackupData: createWrapper('collectFullBackupData'),
      createSettingsBackup: createWrapper('createSettingsBackup'),
      captureStorageSnapshot: createWrapper('captureStorageSnapshot'),
      sanitizeBackupPayload: createWrapper('sanitizeBackupPayload'),
      autoBackup: createWrapper('autoBackup'),
      formatFullBackupFilename: createWrapper('formatFullBackupFilename'),
      downloadPayload: createWrapper('downloadBackupPayload', 'downloadPayload'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
      encodeSharedSetup: createWrapper('encodeSharedSetup'),
      decodeSharedSetup: createWrapper('decodeSharedSetup'),
      applySharedSetup: createWrapper('applySharedSetup'),
      applySharedSetupFromUrl: createWrapper('applySharedSetupFromUrl'),
      downloadProject: createWrapper('downloadSharedProject', 'downloadProject'),
      saveProject: createWrapper('saveProject'),
      proceed: createWrapper('handleRestoreRehearsalProceed', 'proceed'),
      abort: createWrapper('handleRestoreRehearsalAbort', 'abort'),
    },
    storage: {
      loadDeviceData: createWrapper('loadDeviceData'),
      saveDeviceData: createWrapper('saveDeviceData'),
      loadSetups: createWrapper('loadSetups'),
      saveSetups: createWrapper('saveSetups'),
      saveSetup: createWrapper('saveSetup'),
      loadSetup: createWrapper('loadSetup'),
      deleteSetup: createWrapper('deleteSetup'),
      renameSetup: createWrapper('renameSetup'),
      loadSessionState: createWrapper('loadSessionState'),
      saveSessionState: createWrapper('saveSessionState'),
      loadFeedback: createWrapper('loadFeedback'),
      saveFeedback: createWrapper('saveFeedback'),
      saveProject: createWrapper('saveProject'),
      loadProject: createWrapper('loadProject'),
      deleteProject: createWrapper('deleteProject'),
      loadFavorites: createWrapper('loadFavorites'),
      saveFavorites: createWrapper('saveFavorites'),
      exportAllData: createWrapper('exportAllData'),
      importAllData: createWrapper('importAllData'),
      clearAllData: createWrapper('clearAllData'),
      loadAutoGearRules: createWrapper('loadAutoGearRules'),
      saveAutoGearRules: createWrapper('saveAutoGearRules'),
      loadAutoGearBackups: createWrapper('loadAutoGearBackups'),
      saveAutoGearBackups: createWrapper('saveAutoGearBackups'),
      loadAutoGearSeedFlag: createWrapper('loadAutoGearSeedFlag'),
      saveAutoGearSeedFlag: createWrapper('saveAutoGearSeedFlag'),
      loadAutoGearBackupRetention: createWrapper('loadAutoGearBackupRetention'),
      saveAutoGearBackupRetention: createWrapper('saveAutoGearBackupRetention'),
      getAutoGearBackupRetentionDefault: createWrapper('getAutoGearBackupRetentionDefault'),
      loadAutoGearPresets: createWrapper('loadAutoGearPresets'),
      saveAutoGearPresets: createWrapper('saveAutoGearPresets'),
      loadAutoGearActivePresetId: createWrapper('loadAutoGearActivePresetId'),
      saveAutoGearActivePresetId: createWrapper('saveAutoGearActivePresetId'),
      loadAutoGearAutoPresetId: createWrapper('loadAutoGearAutoPresetId'),
      saveAutoGearAutoPresetId: createWrapper('saveAutoGearAutoPresetId'),
      loadAutoGearMonitorDefaults: createWrapper('loadAutoGearMonitorDefaults'),
      saveAutoGearMonitorDefaults: createWrapper('saveAutoGearMonitorDefaults'),
      loadAutoGearBackupVisibility: createWrapper('loadAutoGearBackupVisibility'),
      saveAutoGearBackupVisibility: createWrapper('saveAutoGearBackupVisibility'),
      loadFullBackupHistory: createWrapper('loadFullBackupHistory'),
      saveFullBackupHistory: createWrapper('saveFullBackupHistory'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
      requestPersistentStorage: createWrapper('requestPersistentStorage'),
      clearUiCacheStorageEntries: createWrapper('clearUiCacheStorageEntries'),
      ensureCriticalStorageBackups: createWrapper('ensureCriticalStorageBackups'),
      getLastCriticalStorageGuardResult: createWrapper('getLastCriticalStorageGuardResult'),
      saveSession: createWrapper('saveCurrentSession', 'saveSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup', 'autoSaveSetup'),
      proceed: createWrapper('handleRestoreRehearsalProceed', 'proceed'),
      abort: createWrapper('handleRestoreRehearsalAbort', 'abort'),
    },
    autosave: {
      saveSession: createWrapper('saveCurrentSession', 'saveSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup', 'autoSaveSetup'),
      saveGearList: createWrapper('saveCurrentGearList', 'saveGearList'),
      restoreSessionState: createWrapper('restoreSessionState'),
    },
    backups: {
      collectFullBackupData: createWrapper('collectFullBackupData'),
      createSettingsBackup: createWrapper('createSettingsBackup'),
      captureStorageSnapshot: createWrapper('captureStorageSnapshot'),
      sanitizeBackupPayload: createWrapper('sanitizeBackupPayload'),
      autoBackup: createWrapper('autoBackup'),
      formatFullBackupFilename: createWrapper('formatFullBackupFilename'),
      downloadPayload: createWrapper('downloadBackupPayload', 'downloadPayload'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
    },
    restore: {
      proceed: createWrapper('handleRestoreRehearsalProceed', 'proceed'),
      abort: createWrapper('handleRestoreRehearsalAbort', 'abort'),
    },
    share: {
      downloadProject: createWrapper('downloadSharedProject', 'downloadProject'),
      encodeSharedSetup: createWrapper('encodeSharedSetup'),
      decodeSharedSetup: createWrapper('decodeSharedSetup'),
      applySharedSetup: createWrapper('applySharedSetup'),
      applySharedSetupFromUrl: createWrapper('applySharedSetupFromUrl'),
    },

    __internal: freezeDeep({
      listBindings,
      inspectBinding(name, options) {
        return inspectBinding(name, options) || null;
      },
      inspectAllBindings,
    }),
  };

  freezeDeep(persistenceAPI);

  addProviderModule(persistenceAPI.bindings, 'bindings');
  informModuleGlobals('cinePersistence', persistenceAPI);

  registerOrQueueModule('cinePersistence', persistenceAPI, {
    category: 'persistence',
    description: 'Data integrity facade for storage, autosave, backups, restore, and share flows.',
    replace: true,
    connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineEnvironmentBridge', 'cineModuleContext'],
  }, (error) => {
    safeWarn('Unable to register cinePersistence module.', error);
  });

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    let existingPersistence = null;
    try {
      existingPersistence = GLOBAL_SCOPE.cinePersistence || null;
    } catch (error) {
      void error;
      existingPersistence = null;
    }

    if (existingPersistence !== persistenceAPI) {
      const exposed = exposeGlobal('cinePersistence', persistenceAPI, {
        configurable: true,
        enumerable: false,
        writable: false,
      });

      if (!exposed && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to expose cinePersistence globally.');
      }
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = persistenceAPI;
  }
})();
