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

  const MODULE_GLOBALS = (function resolveModuleGlobals() {
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
  })();

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
  const helpRegistry = new Map();

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
    Object.freeze(contextObject);

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

    return freezeDeep(controller);
  }

  function sanitizeInteraction(name, handler) {
    const fn = cloneFunction(handler);
    if (!fn) {
      throw new TypeError(`cineUi interaction "${name}" must be a function.`);
    }
    return freezeDeep({ handler: fn });
  }

  function sanitizeInitializer(name, initializer) {
    const fn = cloneFunction(initializer);
    if (!fn) {
      throw new TypeError(`cineUi initializer "${name}" must be a function.`);
    }
    return freezeDeep({ initializer: fn });
  }

  function sanitizeHelpEntry(name, value) {
    if (typeof value === 'string') {
      const text = value.trim();
      if (!text) {
        throw new Error(`cineUi help entry "${name}" cannot be empty.`);
      }
      return freezeDeep({ resolver: () => text });
    }

    if (typeof value === 'function') {
      const resolver = cloneFunction(value);
      return freezeDeep({ resolver });
    }

    throw new TypeError(`cineUi help entry "${name}" must be a string or function.`);
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

  const helpAPI = freezeDeep({
    register(name, value) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeHelpEntry(normalized, value);
      if (helpRegistry.has(normalized)) {
        warnDuplicate(normalized, 'help');
      }
      helpRegistry.set(normalized, sanitized);
      return sanitized.resolver;
    },
    get(name) {
      const normalized = normalizeName(name);
      const entry = helpRegistry.get(normalized);
      return entry ? entry.resolver : null;
    },
    resolve(name, ...args) {
      const resolver = this.get(name);
      if (typeof resolver !== 'function') {
        throw new Error(`cineUi help entry "${name}" is not registered.`);
      }
      return resolver.apply(null, args);
    },
    list() {
      return listRegistryKeys(helpRegistry);
    },
  });

  function clearRegistries() {
    controllerRegistry.clear();
    interactionRegistry.clear();
    orchestrationRegistry.clear();
    helpRegistry.clear();
    WARNED_NAMES.clear();
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
      helpRegistry,
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
