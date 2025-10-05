const path = require('path');
const { createRequire } = require('module');

const ROOT_DIR = path.join(__dirname, '..', '..');
const MODULES_DIR = path.join(ROOT_DIR, 'src', 'scripts', 'modules');
const GLOBALS_PATH = path.join(MODULES_DIR, 'globals.js');
const RUNTIME_PATH = path.join(MODULES_DIR, 'runtime.js');
const PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

const modulesRequire = createRequire(RUNTIME_PATH);

function safeFreezeDeep(value, seen = new WeakSet()) {
  if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
    return value;
  }

  if (
    value === global
    || value === globalThis
    || value === process
    || value === process?.stdout
    || value === process?.stderr
    || value === process?.stdin
    || value === console
  ) {
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
    if (!descriptor || descriptor.get || descriptor.set) {
      continue;
    }

    safeFreezeDeep(descriptor.value, seen);
  }

  try {
    return Object.freeze(value);
  } catch (error) {
    void error;
  }

  return value;
}

function setupModuleHarness() {
  jest.resetModules();

  const registryPath = path.join(MODULES_DIR, 'registry.js');
  const registry = require(registryPath);
  if (registry && typeof registry.__internalResetForTests === 'function') {
    registry.__internalResetForTests({ force: true });
  }

  const recordedModules = new Map();
  const pendingWaiters = new Map();

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

  function registerModule(name, api, options = {}, onError, targetRegistry) {
    const registryInstance = targetRegistry || registry;
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
    freezeDeep: safeFreezeDeep,
    safeWarn: jest.fn((message, detail) => {
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
    collectCandidateScopes: jest.fn(() => {
      const scopes = [];
      if (typeof globalThis !== 'undefined') {
        scopes.push(globalThis);
      }
      if (typeof window !== 'undefined') {
        scopes.push(window);
      }
      if (typeof self !== 'undefined') {
        scopes.push(self);
      }
      scopes.push(global);
      return scopes;
    }),
    getPendingQueueKey: jest.fn(() => PENDING_QUEUE_KEY),
    ensureQueue: jest.fn(() => []),
    getModuleRegistry: jest.fn(() => registry),
    resolveModuleRegistry: jest.fn(() => registry),
    tryRequire: jest.fn((modulePath) => {
      try {
        return modulesRequire(modulePath);
      } catch (error) {
        void error;
        return null;
      }
    }),
    queueModuleRegistration: jest.fn((name, api, options = {}, scope, targetRegistry) => (
      registerModule(name, api, options, null, targetRegistry)
    )),
    registerOrQueueModule: jest.fn((name, api, options = {}, onError, scope, targetRegistry) => (
      registerModule(name, api, options, onError, targetRegistry)
    )),
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
    safeFreezeDeep,
    teardown() {
      delete global.cineModuleGlobals;
      jest.resetModules();
    },
  };
}

module.exports = {
  setupModuleHarness,
};

