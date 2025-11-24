(function () {
  function fallbackDetectGlobalScope() {
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

  function fallbackCollectCandidateScopes(primary) {
    const scopes = [];

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(primary);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
  }

  function fallbackLoadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

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

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }

    return null;
  }

  function fallbackResolveModuleGlobals(scope) {
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

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleGlobals === 'object') {
        return candidate.cineModuleGlobals;
      }
    }

    return null;
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

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveEnvironmentContext(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./environment-context.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleEnvironmentContext === 'object') {
      return targetScope.cineModuleEnvironmentContext;
    }

    return null;
  }

  const ENVIRONMENT_CONTEXT = resolveEnvironmentContext(LOCAL_SCOPE);

  const detectGlobalScope =
    ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.detectGlobalScope === 'function'
      ? function detectWithContext() {
          try {
            return ENVIRONMENT_CONTEXT.detectGlobalScope();
          } catch (error) {
            void error;
          }
          return fallbackDetectGlobalScope();
        }
      : fallbackDetectGlobalScope;

  const PRIMARY_SCOPE =
    ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getPrimaryScope === 'function'
      ? ENVIRONMENT_CONTEXT.getPrimaryScope()
      : detectGlobalScope();

  const GLOBAL_SCOPE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getGlobalScope === 'function'
      ? ENVIRONMENT_CONTEXT.getGlobalScope(PRIMARY_SCOPE)
      : null)
    || PRIMARY_SCOPE;

  const MODULE_ENV =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleEnvironment === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleEnvironment(GLOBAL_SCOPE)
      : null)
    || fallbackLoadModuleEnvironment(GLOBAL_SCOPE);

  const ENV_BRIDGE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveEnvironmentBridge === 'function'
      ? ENVIRONMENT_CONTEXT.resolveEnvironmentBridge(GLOBAL_SCOPE)
      : null)
    || fallbackLoadEnvironmentBridge(GLOBAL_SCOPE);

  const MODULE_GLOBALS =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleGlobals === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleGlobals(GLOBAL_SCOPE)
      : null)
    || fallbackResolveModuleGlobals(GLOBAL_SCOPE);

  function informModuleGlobals(name, api) {
    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }

    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }

  const tryRequire = (function resolveTryRequire() {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.tryRequire === 'function') {
      return function tryRequireThroughContext(modulePath) {
        const result = ENVIRONMENT_CONTEXT.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
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

  function fallbackResolveModuleRegistry(scope) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        const resolved = MODULE_GLOBALS.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

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

    const scopes = fallbackCollectCandidateScopes(scope || GLOBAL_SCOPE);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  function resolveModuleRegistry(scope) {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleRegistry === 'function') {
      try {
        const resolved = ENVIRONMENT_CONTEXT.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackResolveModuleRegistry(scope);
  }

  const MODULE_REGISTRY = (function () {
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
    return resolveModuleRegistry();
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
      value === process.release
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

  function ensureFrozen(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    let target = value;

    if (typeof Object.freeze === 'function') {
      try {
        target = Object.freeze(target);
      } catch (freezeError) {
        void freezeError;
      }
    }

    let alreadyFrozen = false;
    if (typeof Object.isFrozen === 'function') {
      try {
        alreadyFrozen = Object.isFrozen(target);
      } catch (stateError) {
        void stateError;
        alreadyFrozen = false;
      }
    }

    if (alreadyFrozen) {
      return target;
    }

    try {
      const keys = Object.getOwnPropertyNames(target);
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const descriptor = Object.getOwnPropertyDescriptor(target, key);
        if (!descriptor) {
          continue;
        }

        if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
          if (descriptor.configurable || descriptor.writable) {
            Object.defineProperty(target, key, {
              configurable: false,
              enumerable: descriptor.enumerable,
              writable: false,
              value: descriptor.value,
            });
          }
        } else if (descriptor.configurable) {
          Object.defineProperty(target, key, {
            configurable: false,
            enumerable: descriptor.enumerable,
            get: descriptor.get,
            set: descriptor.set,
          });
        }
      }

      if (typeof Object.preventExtensions === 'function') {
        try {
          Object.preventExtensions(target);
        } catch (preventError) {
          void preventError;
        }
      }
    } catch (error) {
      void error;
    }

    return target;
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

  const controllerRegistry = new Map();
  const interactionRegistry = new Map();
  const orchestrationRegistry = new Map();

  const WARNED_NAMES = new Set();

  function normalizeName(name) {
    if (typeof name === 'string' && name.trim()) {
      return name.trim();
    }

    throw new TypeError('cineUi registry names must be non-empty strings.');
  }

  function cloneFunction(fn) {
    if (typeof fn !== 'function') {
      return null;
    }

    return function uiWrapper() {
      return fn.apply(this, arguments);
    };
  }

  function sanitizeDescriptor(name, descriptor) {
    if (!descriptor || typeof descriptor !== 'object') {
      throw new TypeError(`cineUi controller "${name}" requires a descriptor object.`);
    }

    const actions = {};
    const contextValues = {};
    const propNames = Object.getOwnPropertyNames(descriptor);

    for (let index = 0; index < propNames.length; index += 1) {
      const prop = propNames[index];
      const value = descriptor[prop];

      if (typeof value === 'function') {
        actions[prop] = cloneFunction(value);
        continue;
      }

      if (prop === 'context' && value && typeof value === 'object') {
        const contextKeys = Object.getOwnPropertyNames(value);
        for (let contextIndex = 0; contextIndex < contextKeys.length; contextIndex += 1) {
          const contextKey = contextKeys[contextIndex];
          contextValues[contextKey] = value[contextKey];
        }
        continue;
      }

      contextValues[prop] = value;
    }

    const actionNames = Object.getOwnPropertyNames(actions);
    if (!actionNames.length) {
      throw new Error(`cineUi controller "${name}" did not provide any callable actions.`);
    }

    const contextObject = Object.create(null);
    const contextKeys = Object.getOwnPropertyNames(contextValues);
    for (let contextIndex = 0; contextIndex < contextKeys.length; contextIndex += 1) {
      const key = contextKeys[contextIndex];
      contextObject[key] = contextValues[key];
    }
    ensureFrozen(contextObject);

    const controller = {};
    Object.defineProperty(controller, 'context', {
      configurable: false,
      enumerable: true,
      get() {
        return contextObject;
      },
    });

    for (let index = 0; index < actionNames.length; index += 1) {
      const actionName = actionNames[index];
      const action = actions[actionName];
      controller[actionName] = function controllerAction() {
        return action.apply(controller, arguments);
      };
    }

    return ensureFrozen(freezeDeep(controller));
  }

  function sanitizeInteraction(name, handler) {
    const fn = cloneFunction(handler);
    if (!fn) {
      throw new TypeError(`cineUi interaction "${name}" must be a function.`);
    }
    return ensureFrozen(freezeDeep({ handler: fn }));
  }

  function sanitizeInitializer(name, initializer) {
    const fn = cloneFunction(initializer);
    if (!fn) {
      throw new TypeError(`cineUi initializer "${name}" must be a function.`);
    }
    return ensureFrozen(freezeDeep({ initializer: fn }));
  }

  function warnDuplicate(name, type) {
    const key = `${type}:${name}`;
    if (WARNED_NAMES.has(key)) {
      return;
    }
    WARNED_NAMES.add(key);
    safeWarn(`cineUi ${type} "${name}" was replaced. Using the latest registration.`);
  }

  function listRegistryKeys(registry) {
    return Array.from(registry.keys()).sort();
  }

  const controllersAPI = freezeDeep({
    register(name, descriptor) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeDescriptor(normalized, descriptor);
      if (controllerRegistry.has(normalized)) {
        warnDuplicate(normalized, 'controller');
      }
      controllerRegistry.set(normalized, sanitized);
      return sanitized;
    },
    get(name) {
      const normalized = normalizeName(name);
      return controllerRegistry.get(normalized) || null;
    },
    invoke(name, action, ...args) {
      const controller = this.get(name);
      if (!controller) {
        throw new Error(`cineUi controller "${name}" is not registered.`);
      }
      const operation = controller[action];
      if (typeof operation !== 'function') {
        throw new Error(`cineUi controller "${name}" does not expose "${action}".`);
      }
      return operation.apply(controller, args);
    },
    list() {
      return listRegistryKeys(controllerRegistry);
    },
  });

  const interactionsAPI = freezeDeep({
    register(name, handler) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeInteraction(normalized, handler);
      if (interactionRegistry.has(normalized)) {
        warnDuplicate(normalized, 'interaction');
      }
      interactionRegistry.set(normalized, sanitized);
      return sanitized.handler;
    },
    get(name) {
      const normalized = normalizeName(name);
      const entry = interactionRegistry.get(normalized);
      return entry ? entry.handler : null;
    },
    trigger(name, ...args) {
      const handler = this.get(name);
      if (typeof handler !== 'function') {
        throw new Error(`cineUi interaction "${name}" is not registered.`);
      }
      return handler.apply(null, args);
    },
    list() {
      return listRegistryKeys(interactionRegistry);
    },
  });

  const orchestrationAPI = freezeDeep({
    register(name, initializer) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeInitializer(normalized, initializer);
      if (orchestrationRegistry.has(normalized)) {
        warnDuplicate(normalized, 'initializer');
      }
      orchestrationRegistry.set(normalized, sanitized);
      return sanitized.initializer;
    },
    get(name) {
      const normalized = normalizeName(name);
      const entry = orchestrationRegistry.get(normalized);
      return entry ? entry.initializer : null;
    },
    run(name, ...args) {
      const initializer = this.get(name);
      if (typeof initializer !== 'function') {
        throw new Error(`cineUi initializer "${name}" is not registered.`);
      }
      return initializer.apply(null, args);
    },
    list() {
      return listRegistryKeys(orchestrationRegistry);
    },
  });

  function resolveHelpModule(scope) {
    const modules = [];

    if (typeof tryRequire === 'function') {
      const required = tryRequire('./help.js');
      if (required && typeof required === 'object') {
        modules.push(required);
      }
    }

    const scopes = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidateScope = scopes[index];
      if (!candidateScope) {
        continue;
      }

      try {
        const moduleCandidate = candidateScope.cineHelpModule;
        if (moduleCandidate && modules.indexOf(moduleCandidate) === -1) {
          modules.push(moduleCandidate);
        }
      } catch (error) {
        void error;
      }

      try {
        const apiCandidate = candidateScope.cineHelp;
        if (apiCandidate) {
          let exists = false;
          for (let checkIndex = 0; checkIndex < modules.length; checkIndex += 1) {
            const existing = modules[checkIndex];
            if (existing === apiCandidate || (existing && existing.help === apiCandidate)) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            modules.push({ help: apiCandidate, __internal: null });
          }
        }
      } catch (error) {
        void error;
      }
    }

    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex += 1) {
      const candidate = modules[moduleIndex];
      if (!candidate) {
        continue;
      }

      const api = candidate.help || candidate;
      if (!api) {
        continue;
      }

      if (
        typeof api.register === 'function'
        && typeof api.get === 'function'
        && typeof api.resolve === 'function'
        && typeof api.list === 'function'
      ) {
        if (!candidate.help && api) {
          return { help: api, __internal: candidate.__internal || null };
        }
        return candidate;
      }
    }

    for (let index = 0; index < scopes.length; index += 1) {
      const candidateScope = scopes[index];
      if (!candidateScope) {
        continue;
      }

      try {
        const factory = candidateScope.__cineCreateHelpModule;
        if (typeof factory === 'function') {
          const created = factory({ freezeDeep, safeWarn });
          if (created && typeof created === 'object') {
            return created;
          }
        }
      } catch (error) {
        safeWarn('cineUi: Failed to create help module from factory.', error);
      }
    }

    return null;
  }

  const resolvedHelpModule = resolveHelpModule(GLOBAL_SCOPE);

  const fallbackHelpRegistry = new Map();

  const helpAPI = resolvedHelpModule && resolvedHelpModule.help
    ? resolvedHelpModule.help
    : freezeDeep({
        register(name, value) {
          const normalized = typeof name === 'string' ? name.trim() : '';
          if (!normalized) {
            throw new TypeError('cineUi registry names must be non-empty strings.');
          }

          if (typeof value === 'function') {
            fallbackHelpRegistry.set(normalized, value);
            return value;
          }

          if (typeof value !== 'string') {
            throw new TypeError(`cineUi help entry "${normalized}" must be a string or function.`);
          }

          const text = value.trim();
          if (!text) {
            throw new Error(`cineUi help entry "${normalized}" cannot be empty.`);
          }

          const resolver = function helpStringResolver() {
            return text;
          };

          fallbackHelpRegistry.set(normalized, resolver);
          return resolver;
        },
        get(name) {
          const normalized = typeof name === 'string' ? name.trim() : '';
          if (!normalized) {
            throw new TypeError('cineUi registry names must be non-empty strings.');
          }
          return fallbackHelpRegistry.get(normalized) || null;
        },
        resolve(name, ...args) {
          const resolver = this.get(name);
          if (typeof resolver !== 'function') {
            throw new Error(`cineUi help entry "${name}" is not registered.`);
          }
          return resolver.apply(null, args);
        },
        list() {
          return Array.from(fallbackHelpRegistry.keys()).sort();
        },
      });

  const helpModuleInternals = resolvedHelpModule && resolvedHelpModule.__internal
    ? resolvedHelpModule.__internal
    : freezeDeep({
        helpRegistry: fallbackHelpRegistry,
        clearRegistries() {
          fallbackHelpRegistry.clear();
        },
      });

  function clearRegistries() {
    controllerRegistry.clear();
    interactionRegistry.clear();
    orchestrationRegistry.clear();
    WARNED_NAMES.clear();

    if (helpModuleInternals && typeof helpModuleInternals.clearRegistries === 'function') {
      try {
        helpModuleInternals.clearRegistries();
      } catch (error) {
        safeWarn('cineUi: Unable to clear help registry.', error);
      }
    } else if (
      helpModuleInternals
      && helpModuleInternals.helpRegistry
      && typeof helpModuleInternals.helpRegistry.clear === 'function'
    ) {
      helpModuleInternals.helpRegistry.clear();
    }
  }

  const uiAPI = {
    controllers: controllersAPI,
    interactions: interactionsAPI,
    orchestration: orchestrationAPI,
    help: helpAPI,
    __internal: {
      controllerRegistry,
      interactionRegistry,
      orchestrationRegistry,
      helpRegistry:
        helpModuleInternals && helpModuleInternals.helpRegistry
          ? helpModuleInternals.helpRegistry
          : fallbackHelpRegistry,
      clearRegistries,
    },
  };

  freezeDeep(uiAPI);

  informModuleGlobals('cineUi', uiAPI);

  registerOrQueueModule(
    'cineUi',
    uiAPI,
    {
      category: 'ui',
      description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
      replace: true,
      connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineHelp', 'cineModuleContext'],
    },
    (error) => {
      safeWarn('Unable to register cineUi module.', error);
    },
  );

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    let existingUi = null;
    try {
      existingUi = GLOBAL_SCOPE.cineUi || null;
    } catch (error) {
      void error;
      existingUi = null;
    }

    if (existingUi !== uiAPI) {
      const exposed = exposeGlobal('cineUi', uiAPI, {
        configurable: true,
        enumerable: false,
        writable: false,
      });

      if (!exposed) {
        safeWarn('Unable to expose cineUi globally.');
      }
    }
  }

  function flushRegistrationQueue() {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return;
    }

    const queueKey = '__cineUiReadyQueue';
    const queueRef = Array.isArray(GLOBAL_SCOPE[queueKey]) ? GLOBAL_SCOPE[queueKey] : null;
    if (!queueRef || queueRef.length === 0) {
      return;
    }

    const queue = queueRef.slice();
    queueRef.length = 0;

    for (let index = 0; index < queue.length; index += 1) {
      const entry = queue[index];
      if (typeof entry !== 'function') {
        continue;
      }

      try {
        entry(uiAPI);
      } catch (callbackError) {
        safeWarn('cineUi registration callback failed.', callbackError);
      }
    }
  }

  flushRegistrationQueue();

  function dispatchReadyEvent() {
    const targets = [];
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE);
    }
    if (
      typeof window !== 'undefined'
      && window
      && typeof window.dispatchEvent === 'function'
      && targets.indexOf(window) === -1
    ) {
      targets.push(window);
    }

    if (!targets.length) {
      return;
    }

    for (let index = 0; index < targets.length; index += 1) {
      const target = targets[index];
      let readyEvent = null;

      if (typeof Event === 'function') {
        try {
          readyEvent = new Event('cine-ui-ready');
        } catch (eventError) {
          void eventError;
          readyEvent = null;
        }
      }

      if (!readyEvent) {
        const doc = target && target.document;
        if (doc && typeof doc.createEvent === 'function') {
          try {
            const legacyEvent = doc.createEvent('Event');
            legacyEvent.initEvent('cine-ui-ready', false, false);
            readyEvent = legacyEvent;
          } catch (legacyError) {
            void legacyError;
            readyEvent = null;
          }
        }
      }

      if (!readyEvent) {
        continue;
      }

      try {
        target.dispatchEvent(readyEvent);
      } catch (dispatchError) {
        safeWarn('Unable to dispatch cine-ui-ready event.', dispatchError);
      }
    }
  }

  dispatchReadyEvent();

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = uiAPI;
  }
})();
