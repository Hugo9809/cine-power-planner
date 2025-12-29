const path = require('path');
const { createRequire } = require('module');

const ROOT_DIR = path.join(__dirname, '..', '..');
const MODULES_DIR = path.join(ROOT_DIR, 'src', 'scripts', 'modules');
const GLOBALS_PATH = path.join(MODULES_DIR, 'globals.js');
const RUNTIME_PATH = path.join(MODULES_DIR, 'runtime.js');

const modulesRequire = createRequire(RUNTIME_PATH);

const { loadModuleArchitectureStack } = require('./moduleArchitecture');

function setupModuleHarness() {
  jest.resetModules();

  const registryPath = path.join(MODULES_DIR, 'registry.js');
  const registry = require(registryPath);
  if (registry && typeof registry.__internalResetForTests === 'function') {
    registry.__internalResetForTests({ force: true });
  }

  const { architecture, helpers: architectureHelpers, pendingQueueKey } = loadModuleArchitectureStack();

  const originalGlobals = {
    window: global.window,
    document: global.document,
    navigator: global.navigator,
    history: global.history,
    location: global.location,
  };

  if (!global.window) {
    global.window = {
      location: {
        href: 'https://example.test/',
        origin: 'https://example.test',
        pathname: '/',
        search: '',
        hash: '',
      },
      history: {
        state: null,
        replaceState: jest.fn(),
      },
      navigator: {
        onLine: true,
        serviceWorker: {
          register: jest.fn(() => Promise.resolve()),
          getRegistrations: jest.fn(() => Promise.resolve([])),
        },
      },
      document: {
        readyState: 'complete',
        getElementById: jest.fn(() => null),
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      get setTimeout() { return global.setTimeout; },
      get clearTimeout() { return global.clearTimeout; },
    };
    global.document = global.window.document;
    global.navigator = global.window.navigator;
    global.history = global.window.history;
    global.location = global.window.location;
  }

  const recordedModules = new Map();
  const pendingWaiters = new Map();

  const freezeDeep = typeof architecture?.freezeDeep === 'function'
    ? architecture.freezeDeep
    : function freezeWithFallback(value, seen) {
      if (typeof architectureHelpers?.freezeDeep === 'function') {
        const result = architectureHelpers.freezeDeep(value, seen);
        return result;
      }
      return value;
    };

  function resolveTargetRegistry(scope, explicit) {
    if (explicit && typeof explicit.register === 'function') {
      return explicit;
    }

    if (architectureHelpers && typeof architectureHelpers.resolveModuleRegistry === 'function') {
      const resolved = architectureHelpers.resolveModuleRegistry(scope || global);
      if (resolved && typeof resolved.register === 'function') {
        return resolved;
      }
    }

    return registry;
  }

  function notifyWaiters(name, api) {
    const callbacks = pendingWaiters.get(name);
    if (!callbacks) {
      return;
    }

    pendingWaiters.delete(name);
    callbacks.forEach((callback) => {
      try {
        callback(api);
      } catch (error) {
        void error;
      }
    });
  }

  function recordModule(name, api) {
    recordedModules.set(name, api);
    notifyWaiters(name, api);
    return true;
  }

  function registerModule(name, api, options = {}, onError, targetRegistry, scope) {
    const registryInstance = resolveTargetRegistry(scope, targetRegistry);
    const normalizedOptions = { ...options };
    if (typeof normalizedOptions.freeze === 'undefined') {
      normalizedOptions.freeze = true;
    }

    try {
      registryInstance.register(name, api, normalizedOptions);
      recordModule(name, api);
      return true;
    } catch (error) {
      if (typeof onError === 'function') {
        try {
          onError(error);
        } catch (handlerError) {
          void handlerError;
        }
      }
      return false;
    }
  }

  const moduleGlobals = {
    scope: global,
    freezeDeep,
    safeWarn: jest.fn((message, detail) => {
      if (architectureHelpers && typeof architectureHelpers.safeWarn === 'function') {
        architectureHelpers.safeWarn(message, detail);
        return;
      }

      if (architecture && typeof architecture.safeWarn === 'function') {
        architecture.safeWarn(message, detail);
        return;
      }

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
    }),
    exposeGlobal: jest.fn((name, value, options = {}) => {
      const descriptor = {
        configurable: options.configurable !== false,
        enumerable: !!options.enumerable,
        writable: !!options.writable,
        value,
      };

      try {
        Object.defineProperty(global, name, descriptor);
        return true;
      } catch (error) {
        void error;
      }

      try {
        global[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
      }

      return false;
    }),
    collectCandidateScopes: jest.fn((primary) => {
      if (architectureHelpers && typeof architectureHelpers.collectCandidateScopes === 'function') {
        const scopes = architectureHelpers.collectCandidateScopes(primary || global);
        if (Array.isArray(scopes)) {
          return Object.freeze(scopes.slice());
        }
      }

      if (architecture && typeof architecture.collectCandidateScopes === 'function') {
        const scopes = architecture.collectCandidateScopes(primary || global);
        if (Array.isArray(scopes)) {
          return Object.freeze(scopes.slice());
        }
      }

      const fallbacks = [global];
      if (typeof globalThis !== 'undefined' && fallbacks.indexOf(globalThis) === -1) {
        fallbacks.push(globalThis);
      }
      if (typeof window !== 'undefined' && fallbacks.indexOf(window) === -1) {
        fallbacks.push(window);
      }
      if (typeof self !== 'undefined' && fallbacks.indexOf(self) === -1) {
        fallbacks.push(self);
      }

      return Object.freeze(fallbacks);
    }),
    getPendingQueueKey: jest.fn(() => pendingQueueKey),
    ensureQueue: jest.fn((scope, key) => {
      if (architectureHelpers && typeof architectureHelpers.ensureQueue === 'function') {
        return architectureHelpers.ensureQueue(scope || global, key);
      }
      if (architecture && typeof architecture.ensureQueue === 'function') {
        return architecture.ensureQueue(scope || global, key);
      }
      return [];
    }),
    getModuleRegistry: jest.fn((scope) => resolveTargetRegistry(scope)),
    resolveModuleRegistry: jest.fn((scope) => resolveTargetRegistry(scope)),
    tryRequire: jest.fn((modulePath) => {
      if (architectureHelpers && typeof architectureHelpers.tryRequire === 'function') {
        const resolved = architectureHelpers.tryRequire(modulePath);
        if (typeof resolved !== 'undefined') {
          return resolved;
        }
      }

      if (architecture && typeof architecture.tryRequire === 'function') {
        const resolved = architecture.tryRequire(modulePath);
        if (typeof resolved !== 'undefined') {
          return resolved;
        }
      }

      try {
        return modulesRequire(modulePath);
      } catch (error) {
        void error;
        return null;
      }
    }),
    queueModuleRegistration: jest.fn((name, api, options = {}, scope, targetRegistry) => {
      const targetScope = scope || global;

      if (architectureHelpers && typeof architectureHelpers.queueModuleRegistration === 'function') {
        architectureHelpers.queueModuleRegistration(targetScope, name, api, options);
      } else if (architecture && typeof architecture.ensureQueue === 'function') {
        const queue = architecture.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queue)) {
          try {
            queue.push(freezeDeep({ name, api, options: Object.freeze({ ...(options || {}) }) }));
          } catch (queueError) {
            void queueError;
          }
        }
      }

      return registerModule(name, api, options, null, targetRegistry, targetScope);
    }),
    registerOrQueueModule: jest.fn((name, api, options = {}, onError, scope, targetRegistry) => {
      const targetScope = scope || global;
      const success = registerModule(name, api, options, onError, targetRegistry, targetScope);
      if (success) {
        return true;
      }

      moduleGlobals.queueModuleRegistration(name, api, options, targetScope, targetRegistry);
      return false;
    }),
    recordModule: jest.fn(recordModule),
    getModule: jest.fn(name => recordedModules.get(name) || null),
    whenModuleAvailable: jest.fn((name, callback) => {
      if (recordedModules.has(name)) {
        if (typeof callback === 'function') {
          callback(recordedModules.get(name));
        }
        return true;
      }

      if (typeof callback === 'function') {
        const callbacks = pendingWaiters.get(name) || [];
        callbacks.push(callback);
        pendingWaiters.set(name, callbacks);
      }

      return false;
    }),
    listRecordedModules: jest.fn(() => Array.from(recordedModules.keys())),
  };

  jest.doMock(GLOBALS_PATH, () => moduleGlobals, { virtual: true });
  global.cineModuleGlobals = moduleGlobals;

  return {
    registry,
    moduleGlobals,
    recordedModules,
    architecture,
    architectureHelpers,
    freezeDeep,
    safeFreezeDeep: freezeDeep,
    teardown() {
      delete global.cineModuleGlobals;
      pendingWaiters.clear();
      recordedModules.clear();

      Object.keys(originalGlobals).forEach((key) => {
        if (originalGlobals[key] === undefined) {
          delete global[key];
        } else {
          global[key] = originalGlobals[key];
        }
      });

      jest.resetModules();
    },
  };
}

module.exports = {
  setupModuleHarness,
};
