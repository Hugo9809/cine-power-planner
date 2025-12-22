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

  function loggingResolveStructuredClone(scope) {
    if (typeof structuredClone === 'function') {
      return structuredClone;
    }

    if (scope && typeof scope.structuredClone === 'function') {
      try {
        return scope.structuredClone.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (typeof require === 'function') {
      try {
        const nodeUtil = require('node:util');
        if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
          return nodeUtil.structuredClone.bind(nodeUtil);
        }
      } catch (nodeUtilError) {
        void nodeUtilError;
      }

      try {
        const legacyUtil = require('util');
        if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
          return legacyUtil.structuredClone.bind(legacyUtil);
        }
      } catch (legacyUtilError) {
        void legacyUtilError;
      }
    }

    return null;
  }

  function loggingJsonDeepClone(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }

    return value;
  }

  const LOGGING_DEEP_CLONE = (function resolveLoggingDeepClone() {
    const scope = fallbackDetectGlobalScope();
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }

    const structuredCloneImpl = loggingResolveStructuredClone(scope);
    if (!structuredCloneImpl) {
      return loggingJsonDeepClone;
    }

    return function loggingResilientDeepClone(value) {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }

      return loggingJsonDeepClone(value);
    };
  })();

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
  const MODULE_ENV = fallbackLoadModuleEnvironment(LOCAL_SCOPE);
  const ENV_BRIDGE = fallbackLoadEnvironmentBridge(LOCAL_SCOPE);
  const MODULE_GLOBALS = fallbackResolveModuleGlobals(LOCAL_SCOPE);
  const GLOBAL_SCOPE =
    (ENV_BRIDGE && typeof ENV_BRIDGE.getGlobalScope === 'function'
      ? ENV_BRIDGE.getGlobalScope()
      : null)
    || (MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function'
      ? MODULE_ENV.getGlobalScope()
      : null)
    || LOCAL_SCOPE;

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

  const structuredCloneCandidates = (function collectStructuredCloneCandidates() {
    const candidates = [];

    function addCandidate(fn, scope) {
      if (typeof fn !== 'function') {
        return;
      }
      const alreadyPresent = candidates.some(candidate => candidate && candidate.fn === fn);
      if (!alreadyPresent) {
        candidates.push({ fn, scope: scope || null });
      }
    }

    if (MODULE_GLOBALS) {
      if (typeof MODULE_GLOBALS.structuredClone === 'function') {
        addCandidate(MODULE_GLOBALS.structuredClone, MODULE_GLOBALS);
      }
      if (typeof MODULE_GLOBALS.getStructuredClone === 'function') {
        try {
          const resolved = MODULE_GLOBALS.getStructuredClone();
          addCandidate(resolved, MODULE_GLOBALS);
        } catch (error) {
          void error;
        }
      }
    }

    if (ENV_BRIDGE) {
      if (typeof ENV_BRIDGE.structuredClone === 'function') {
        addCandidate(ENV_BRIDGE.structuredClone, ENV_BRIDGE);
      }
      if (typeof ENV_BRIDGE.getStructuredClone === 'function') {
        try {
          const resolved = ENV_BRIDGE.getStructuredClone();
          addCandidate(resolved, ENV_BRIDGE);
        } catch (error) {
          void error;
        }
      }
    }

    if (MODULE_ENV) {
      if (typeof MODULE_ENV.structuredClone === 'function') {
        addCandidate(MODULE_ENV.structuredClone, MODULE_ENV);
      }
      if (typeof MODULE_ENV.getStructuredClone === 'function') {
        try {
          const resolved = MODULE_ENV.getStructuredClone();
          addCandidate(resolved, MODULE_ENV);
        } catch (error) {
          void error;
        }
      }
    }

    const scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }
      const candidate = scope.structuredClone;
      if (typeof candidate === 'function') {
        addCandidate(candidate, scope);
      }
    }

    return candidates;
  })();

  let cachedStructuredCloneCandidate = null;

  function tryStructuredCloneValue(value) {
    if (cachedStructuredCloneCandidate) {
      try {
        const candidate = cachedStructuredCloneCandidate;
        return {
          success: true,
          value: candidate.scope ? candidate.fn.call(candidate.scope, value) : candidate.fn(value),
        };
      } catch (error) {
        void error;
        cachedStructuredCloneCandidate = null;
      }
    }

    for (let index = 0; index < structuredCloneCandidates.length; index += 1) {
      const candidate = structuredCloneCandidates[index];
      if (!candidate || typeof candidate.fn !== 'function') {
        continue;
      }
      try {
        const cloned = candidate.scope ? candidate.fn.call(candidate.scope, value) : candidate.fn(value);
        cachedStructuredCloneCandidate = candidate;
        return { success: true, value: cloned };
      } catch (error) {
        void error;
      }
    }

    return { success: false, value: null };
  }

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

    const scopes = fallbackCollectCandidateScopes(scope || GLOBAL_SCOPE);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  const MODULE_REGISTRY = (function resolveRegistry() {
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

  const queueModuleRegistration = (function resolveQueueModuleRegistration() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.queueModuleRegistration === 'function') {
      return function queueModuleRegistration(name, api, options, scope) {
        try {
          return MODULE_GLOBALS.queueModuleRegistration(name, api, options, scope || GLOBAL_SCOPE);
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      return function bridgeQueueModuleRegistration(name, api, options) {
        try {
          const bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
          return typeof bridged === 'undefined' ? false : bridged;
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return function envQueueModuleRegistration(name, api, options, scope) {
        try {
          return MODULE_ENV.queueModuleRegistration(name, api, options, scope || GLOBAL_SCOPE);
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    return function fallbackQueueModuleRegistration() {
      return false;
    };
  })();

  const registerOrQueueModule = (function resolveRegisterOrQueue() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError, scope, registry) {
        try {
          const registered = MODULE_GLOBALS.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            scope || GLOBAL_SCOPE,
            registry || MODULE_REGISTRY,
          );
          return typeof registered === 'undefined' ? false : registered;
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function bridgeRegisterOrQueueModule(name, api, options, onError, scope, registry) {
        try {
          const bridged = ENV_BRIDGE.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            scope || GLOBAL_SCOPE,
            registry || MODULE_REGISTRY,
          );
          return typeof bridged === 'undefined' ? false : bridged;
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      return function envRegisterOrQueueModule(name, api, options, onError, scope, registry) {
        try {
          return MODULE_ENV.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            scope || GLOBAL_SCOPE,
            registry || MODULE_REGISTRY,
          );
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    return function fallbackRegisterOrQueueModule(name, api, options, onError) {
      if (typeof onError === 'function') {
        try {
          onError(new Error('Module registration queue unavailable.'));
        } catch (error) {
          void error;
        }
      }
      void name;
      void api;
      void options;
      return false;
    };
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
    if (!value || typeof value !== 'object') {
      return true;
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


    const ctor = value.constructor;
    if (!ctor) {
      return false;
    }

    if (
      ctor === Number
      || ctor === String
      || ctor === Boolean
      || ctor === Date
      || ctor === RegExp
      || ctor === Promise
      || ctor === WeakMap
      || ctor === WeakSet
      || ctor === Map
      || ctor === Set
    ) {
      return true;
    }

    const ctorName = typeof ctor.name === 'string' ? ctor.name : '';
    if (ctorName && /Error|Event|Response|Request|Headers|Node|Element|Window|Document/.test(ctorName)) {
      return true;
    }

    try {
      if (typeof value.then === 'function' || typeof value.catch === 'function') {
        return true;
      }
      if (typeof value.pipe === 'function' || typeof value.on === 'function') {
        return true;
      }
      if (typeof value.write === 'function' || typeof value.read === 'function') {
        return true;
      }
      if (typeof value.getReader === 'function' || typeof value.getWriter === 'function') {
        return true;
      }
      if (typeof value[Symbol.iterator] === 'function' && !Array.isArray(value)) {
        return true;
      }
      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        const tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port|Process/.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }

    return false;
  }

  function fallbackFreezeDeep(value, seen) {
    const visited = seen || (typeof WeakSet === 'function' ? new WeakSet() : {
      add() { },
      has() {
        return false;
      },
    });

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

    if (typeof visited.has === 'function' && visited.has(value)) {
      return value;
    }

    if (typeof visited.add === 'function') {
      visited.add(value);
    }

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
      fallbackFreezeDeep(child, visited);
    }

    try {
      try {
        return Object.freeze(value);
      } catch (freezeError) {
        void freezeError;
        return value;
      }
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

  const CONSOLE_METHODS = ['debug', 'info', 'warn', 'error', 'log'];
  const CONSOLE_PROXY_FLAG = typeof Symbol === 'function'
    ? Symbol.for('cineLoggingConsoleProxyInstalled')
    : '__cineLoggingConsoleProxyInstalled__';

  const ORIGINAL_CONSOLE_FUNCTIONS = (function captureOriginalConsoleFunctions() {
    const store = Object.create(null);
    if (typeof console === 'undefined' || !console) {
      return store;
    }

    for (let index = 0; index < CONSOLE_METHODS.length; index += 1) {
      const method = CONSOLE_METHODS[index];
      try {
        const fn = console[method];
        store[method] = typeof fn === 'function' ? fn : null;
      } catch (error) {
        store[method] = null;
        void error;
      }
    }

    return store;
  })();

  let consoleProxyInstalled = false;
  let consoleProxyInstallationAttempted = false;
  let consoleProxyInstallationFailed = false;
  let lastConsoleCaptureState = null;
  let consoleProxyWarningIssued = false;
  let consoleProxyGuardDepth = 0;

  const exposeGlobal = (function resolveExposeGlobal() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.exposeGlobal === 'function') {
      return function exposeGlobal(name, value, options) {
        try {
          return MODULE_GLOBALS.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return false;
        }
      };
    }

    return function fallbackExposeGlobal(name, value) {
      if (!GLOBAL_SCOPE || (typeof GLOBAL_SCOPE !== 'object' && typeof GLOBAL_SCOPE !== 'function')) {
        return false;
      }
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (error) {
        void error;
        return false;
      }
    };
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

  const LOG_LEVEL_MAP = {
    debug: { priority: 10, consoleMethod: 'debug' },
    info: { priority: 20, consoleMethod: 'info' },
    warn: { priority: 30, consoleMethod: 'warn' },
    error: { priority: 40, consoleMethod: 'error' },
  };

  const LOG_LEVELS = freezeDeep(LOG_LEVEL_MAP);

  const LEVEL_COUNTER_KEYS = Object.freeze(Object.keys(LOG_LEVEL_MAP).concat(['other']));

  function createLevelCounters() {
    const counters = Object.create(null);
    for (let index = 0; index < LEVEL_COUNTER_KEYS.length; index += 1) {
      const key = LEVEL_COUNTER_KEYS[index];
      counters[key] = 0;
    }
    return counters;
  }

  function resetLevelCounters(counters) {
    if (!counters || typeof counters !== 'object') {
      return;
    }

    for (let index = 0; index < LEVEL_COUNTER_KEYS.length; index += 1) {
      const key = LEVEL_COUNTER_KEYS[index];
      counters[key] = 0;
    }
  }

  function resolveLevelKey(level) {
    if (typeof level === 'string' && level) {
      if (Object.prototype.hasOwnProperty.call(LOG_LEVEL_MAP, level)) {
        return level;
      }
      const trimmed = level.trim().toLowerCase();
      if (Object.prototype.hasOwnProperty.call(LOG_LEVEL_MAP, trimmed)) {
        return trimmed;
      }
    }
    return 'other';
  }

  function getCounterValue(counters, key) {
    if (!counters || typeof counters !== 'object') {
      return 0;
    }

    const value = counters[key];
    return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
  }

  function applyLevelCounterDelta(counters, level, delta) {
    if (!counters || typeof counters !== 'object') {
      return;
    }

    if (typeof delta !== 'number' || !Number.isFinite(delta) || delta === 0) {
      return;
    }

    const key = resolveLevelKey(level);
    const current = getCounterValue(counters, key);
    const next = current + delta;
    counters[key] = next > 0 ? next : 0;
  }

  function applyLevelCounterDeltaForEntries(counters, entries, delta) {
    if (!Array.isArray(entries) || !entries.length) {
      return;
    }

    if (typeof delta !== 'number' || !Number.isFinite(delta) || delta === 0) {
      return;
    }

    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      const level = entry && entry.level;
      applyLevelCounterDelta(counters, level, delta);
    }
  }

  function summariseEntriesByLevel(entries) {
    const summary = createLevelCounters();
    applyLevelCounterDeltaForEntries(summary, entries, 1);
    return summary;
  }

  function accumulateLevelSummary(target, summary) {
    if (!target || typeof target !== 'object' || !summary || typeof summary !== 'object') {
      return;
    }

    for (let index = 0; index < LEVEL_COUNTER_KEYS.length; index += 1) {
      const key = LEVEL_COUNTER_KEYS[index];
      const increment = getCounterValue(summary, key);
      if (increment) {
        const current = getCounterValue(target, key);
        target[key] = current + increment;
      }
    }
  }

  function cloneLevelSummary(summary) {
    const clone = createLevelCounters();
    accumulateLevelSummary(clone, summary);
    return clone;
  }

  function freezeLevelSummary(summary) {
    return freezeDeep(cloneLevelSummary(summary));
  }

  const HISTORY_MIN_LIMIT = 50;
  const HISTORY_ABSOLUTE_MIN_LIMIT = 1;
  const HISTORY_MAX_LIMIT = 5000;
  const HISTORY_STORAGE_KEY = '__cineLoggingHistory';
  const CONFIG_STORAGE_KEY = '__cineLoggingConfig';
  const ERROR_EVENT_FLAG =
    typeof Symbol === 'function' ? Symbol.for('cineLoggingHandled') : '__cineLoggingHandled__';
  const DEFAULT_CONFIG_VALUES = {
    level: 'warn',
    historyLevel: 'debug',
    historyLimit: 1200,
    consoleOutput: true,
    persistSession: true,
    captureGlobalErrors: true,
    captureConsole: true,
    stackTraces: true,
  };

  const DEFAULT_CONFIG = freezeDeep(DEFAULT_CONFIG_VALUES);

  const SERVICE_WORKER_LOG_CHANNEL = 'cine-sw-logs';
  const SERVICE_WORKER_LOG_ENTRY_TYPE = 'cine-sw:log-entry';
  const SERVICE_WORKER_LOG_STATE_REQUEST = 'cine-sw:log-state-request';
  const SERVICE_WORKER_LOG_STATE_RESPONSE = 'cine-sw:log-state';
  const SERVICE_WORKER_LOG_REQUEST_TIMEOUT = 5000;
  const SERVICE_WORKER_LOG_POLL_INTERVAL = 60 * 1000;
  const SERVICE_WORKER_LOG_HISTORY_LIMIT = 200;

  function cloneDefaultConfig() {
    return {
      level: DEFAULT_CONFIG_VALUES.level,
      historyLevel: DEFAULT_CONFIG_VALUES.historyLevel,
      historyLimit: DEFAULT_CONFIG_VALUES.historyLimit,
      consoleOutput: DEFAULT_CONFIG_VALUES.consoleOutput,
      persistSession: DEFAULT_CONFIG_VALUES.persistSession,
      captureGlobalErrors: DEFAULT_CONFIG_VALUES.captureGlobalErrors,
      captureConsole: DEFAULT_CONFIG_VALUES.captureConsole,
      stackTraces: DEFAULT_CONFIG_VALUES.stackTraces,
    };
  }

  let activeConfig = cloneDefaultConfig();
  const logHistory = [];
  const logSubscribers = new Set();
  const configSubscribers = new Set();
  const attachedErrorTargets = typeof WeakSet === 'function' ? new WeakSet() : [];
  let runtimeEntryCount = 0;
  const emittedLevelCounters = createLevelCounters();
  const retainedLevelCounters = createLevelCounters();
  const droppedLevelCounters = createLevelCounters();
  let totalEntriesDropped = 0;
  let lastHistoryDrop = null;
  const serviceWorkerBridgeState = {
    initialised: false,
    supported: false,
    requestInFlight: false,
    lastRequestId: null,
    pollTimer: null,
    requestTimer: null,
    broadcastChannel: null,
    broadcastFailed: false,
    seenIds: typeof Set === 'function' ? new Set() : null,
    fallbackSeenIds: typeof Set !== 'function' ? [] : null,
    lastSnapshotMeta: null,
  };

  function normalizeLevel(value, fallbackLevel) {
    const fallback = typeof fallbackLevel === 'string' ? fallbackLevel : activeConfig.level;

    if (typeof value === 'string') {
      const trimmed = value.trim().toLowerCase();
      if (Object.prototype.hasOwnProperty.call(LOG_LEVEL_MAP, trimmed)) {
        return trimmed;
      }
      if (trimmed === 'log' || trimmed === 'information') {
        return 'info';
      }
      if (trimmed === 'warning') {
        return 'warn';
      }
      if (trimmed === 'trace' || trimmed === 'verbose') {
        return 'debug';
      }
      if (trimmed === 'fatal' || trimmed === 'critical') {
        return 'error';
      }
    }

    if (Object.prototype.hasOwnProperty.call(LOG_LEVEL_MAP, fallback)) {
      return fallback;
    }

    return 'info';
  }

  function getLevelPriority(level) {
    const normalized = normalizeLevel(level, 'info');
    const descriptor = LOG_LEVEL_MAP[normalized];
    return descriptor ? descriptor.priority : LOG_LEVEL_MAP.info.priority;
  }

  function booleanFromValue(value, fallback) {
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        return Boolean(fallback);
      }
      if (value === 1) {
        return true;
      }
      if (value === 0) {
        return false;
      }
      return value > 0;
    }
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
        return true;
      }
      if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
        return false;
      }
    }
    return typeof fallback === 'boolean' ? fallback : false;
  }

  function clampHistoryLimit(value, options) {
    const allowReducedMinimum =
      options && options.allowReducedMin === true ? true : false;
    const effectiveMinimum = allowReducedMinimum ? HISTORY_ABSOLUTE_MIN_LIMIT : HISTORY_MIN_LIMIT;

    if (typeof value === 'number' && Number.isFinite(value)) {
      const absolute = Math.abs(Math.floor(value));
      if (!absolute) {
        return activeConfig.historyLimit;
      }
      return Math.max(effectiveMinimum, Math.min(HISTORY_MAX_LIMIT, absolute));
    }

    if (typeof value === 'string' && value) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return clampHistoryLimit(parsed, options);
      }
    }

    return activeConfig.historyLimit;
  }

  function coerceMessage(value) {
    if (typeof value === 'string') {
      return value;
    }
    if (value instanceof Error) {
      return value.message || value.name || 'Error';
    }
    if (value && typeof value === 'object') {
      if (typeof value.message === 'string') {
        return value.message;
      }
      const ctorName = value.constructor && value.constructor.name;
      if (ctorName) {
        return ctorName;
      }
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    try {
      return String(value);
    } catch (error) {
      void error;
    }
    return Object.prototype.toString.call(value);
  }

  function sanitizeForLog(value, depth, seen) {
    const nextDepth = typeof depth === 'number' ? depth : 0;
    const visited = seen || (typeof WeakSet === 'function' ? new WeakSet() : null);

    if (value === null || typeof value === 'undefined') {
      return null;
    }

    const valueType = typeof value;

    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      return value;
    }

    if (valueType === 'bigint') {
      try {
        return value.toString();
      } catch (error) {
        void error;
        return 'BigInt';
      }
    }

    if (valueType === 'symbol') {
      try {
        return value.toString();
      } catch (error) {
        void error;
        return 'Symbol';
      }
    }

    if (valueType === 'function') {
      const name = value.name ? ` ${value.name}` : '';
      return `[Function${name}]`;
    }

    if (value instanceof Date) {
      try {
        return value.toISOString();
      } catch (error) {
        void error;
        return value.toString();
      }
    }

    if (typeof RegExp !== 'undefined' && value instanceof RegExp) {
      try {
        return value.toString();
      } catch (error) {
        void error;
      }
      return '[RegExp]';
    }

    if (value instanceof Error) {
      const errorOutput = {
        name: value.name,
        message: value.message,
      };
      if (value.stack) {
        errorOutput.stack = String(value.stack);
      }
      if (typeof value.code !== 'undefined') {
        errorOutput.code = value.code;
      }
      if (typeof value.status !== 'undefined') {
        errorOutput.status = value.status;
      }
      if (typeof value.cause !== 'undefined' && value.cause !== null) {
        errorOutput.cause = sanitizeForLog(value.cause, nextDepth + 1, visited);
      }
      if (typeof value.details !== 'undefined') {
        errorOutput.details = sanitizeForLog(value.details, nextDepth + 1, visited);
      }
      if (typeof value.errors !== 'undefined' && value.errors !== null) {
        const collectedErrors = [];
        const maxErrors = 10;
        let truncatedErrors = 0;

        const appendErrorDetail = function appendErrorDetail(candidate) {
          if (collectedErrors.length >= maxErrors) {
            truncatedErrors += 1;
            return;
          }
          try {
            collectedErrors.push(sanitizeForLog(candidate, nextDepth + 1, visited));
          } catch (error) {
            collectedErrors.push(
              error && error.message ? `[Unserializable error: ${error.message}]` : '[Unserializable error]'
            );
          }
        };

        const rawErrors = value.errors;
        if (Array.isArray(rawErrors)) {
          for (let index = 0; index < rawErrors.length; index += 1) {
            appendErrorDetail(rawErrors[index]);
          }
          if (rawErrors.length > collectedErrors.length) {
            truncatedErrors += rawErrors.length - collectedErrors.length;
          }
        } else if (rawErrors && typeof rawErrors === 'object') {
          let iterator = null;
          try {
            const symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : null;
            if (symbolIterator && typeof rawErrors[symbolIterator] === 'function') {
              iterator = rawErrors[symbolIterator].call(rawErrors);
            }
          } catch (iteratorError) {
            iterator = null;
            void iteratorError;
          }

          if (iterator && typeof iterator.next === 'function') {
            let result = iterator.next();
            let count = 0;
            while (!result.done) {
              if (count < maxErrors) {
                appendErrorDetail(result.value);
              } else {
                truncatedErrors += 1;
              }
              count += 1;
              try {
                result = iterator.next();
              } catch (iterationError) {
                truncatedErrors += 1;
                void iterationError;
                break;
              }
            }
          } else {
            appendErrorDetail(rawErrors);
          }
        } else {
          appendErrorDetail(rawErrors);
        }

        if (collectedErrors.length) {
          errorOutput.errors = collectedErrors;
          if (truncatedErrors > 0) {
            errorOutput.errorsTruncated = truncatedErrors;
          }
        }
      }
      return errorOutput;
    }

    if (valueType === 'object') {
      if (visited) {
        try {
          if (visited.has(value)) {
            return '[Circular]';
          }
          visited.add(value);
        } catch (error) {
          void error;
        }
      }

      if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
        return {
          __type: 'ArrayBuffer',
          byteLength: value.byteLength,
        };
      }

      if (typeof DataView !== 'undefined' && value instanceof DataView) {
        return {
          __type: 'DataView',
          byteOffset: value.byteOffset,
          byteLength: value.byteLength,
        };
      }

      if (
        typeof ArrayBuffer !== 'undefined'
        && typeof ArrayBuffer.isView === 'function'
        && ArrayBuffer.isView(value)
      ) {
        const ctorName = value.constructor && value.constructor.name;
        const maxPreview = 32;
        const length = typeof value.length === 'number' ? value.length : 0;
        const preview = [];
        const previewLength = Math.min(length, maxPreview);
        for (let index = 0; index < previewLength; index += 1) {
          preview.push(value[index]);
        }
        const summary = {
          __type: ctorName || 'TypedArray',
          length,
          byteOffset: typeof value.byteOffset === 'number' ? value.byteOffset : 0,
          byteLength: typeof value.byteLength === 'number' ? value.byteLength : 0,
        };
        if (preview.length) {
          summary.preview = preview;
        }
        if (length > maxPreview) {
          summary.__truncatedItems = length - maxPreview;
        }
        return summary;
      }

      const mapCtor = typeof Map === 'function' ? Map : null;
      if (mapCtor && value instanceof mapCtor) {
        const entries = [];
        const maxEntries = 30;
        let index = 0;
        value.forEach((mapValue, mapKey) => {
          if (index < maxEntries) {
            entries.push({
              key: sanitizeForLog(mapKey, nextDepth + 1, visited),
              value: sanitizeForLog(mapValue, nextDepth + 1, visited),
            });
          }
          index += 1;
        });
        const result = {
          __type: 'Map',
          size: typeof value.size === 'number' ? value.size : index,
          entries,
        };
        if (index > maxEntries) {
          result.__truncatedEntries = index - maxEntries;
        }
        return result;
      }

      const setCtor = typeof Set === 'function' ? Set : null;
      if (setCtor && value instanceof setCtor) {
        const items = [];
        const maxItems = 30;
        let index = 0;
        value.forEach(item => {
          if (index < maxItems) {
            items.push(sanitizeForLog(item, nextDepth + 1, visited));
          }
          index += 1;
        });
        const result = {
          __type: 'Set',
          size: typeof value.size === 'number' ? value.size : index,
          values: items,
        };
        if (index > maxItems) {
          result.__truncatedValues = index - maxItems;
        }
        return result;
      }

      const urlParamsCtor = typeof URLSearchParams === 'function' ? URLSearchParams : null;
      if (urlParamsCtor && value instanceof urlParamsCtor) {
        const params = [];
        const iterator = typeof value.entries === 'function' ? value.entries() : null;
        let truncated = 0;
        if (iterator && typeof iterator.next === 'function') {
          const maxPairs = 40;
          let count = 0;
          let next = iterator.next();
          while (!next.done) {
            if (count < maxPairs) {
              const pair = next.value || [];
              params.push({
                key: sanitizeForLog(pair[0], nextDepth + 1, visited),
                value: sanitizeForLog(pair[1], nextDepth + 1, visited),
              });
            }
            count += 1;
            next = iterator.next();
          }
          if (count > params.length) {
            truncated = count - params.length;
          }
        }
        const result = {
          __type: 'URLSearchParams',
          entries: params,
        };
        if (truncated > 0) {
          result.__truncatedEntries = truncated;
        }
        return result;
      }

      if (typeof URL === 'function' && value instanceof URL) {
        try {
          return value.toString();
        } catch (error) {
          void error;
        }
      }

      if (nextDepth >= 4) {
        const ctorName = value.constructor && value.constructor.name;
        return ctorName ? `[${ctorName}]` : Object.prototype.toString.call(value);
      }

      if (Array.isArray(value)) {
        const maxItems = 20;
        const result = [];
        const len = Math.min(value.length, maxItems);
        for (let index = 0; index < len; index += 1) {
          result.push(sanitizeForLog(value[index], nextDepth + 1, visited));
        }
        if (value.length > maxItems) {
          result.push(`… (${value.length - maxItems} more)`);
        }
        return result;
      }

      const output = {};
      const keys = Object.keys(value);
      const maxKeys = 30;
      const length = Math.min(keys.length, maxKeys);
      for (let index = 0; index < length; index += 1) {
        const key = keys[index];
        try {
          output[key] = sanitizeForLog(value[key], nextDepth + 1, visited);
        } catch (error) {
          output[key] = `[Threw: ${error && error.message ? error.message : 'error'}]`;
        }
      }
      if (keys.length > maxKeys) {
        output.__truncatedKeys = keys.length - maxKeys;
      }

      if (typeof Object.getOwnPropertySymbols === 'function') {
        const symbols = Object.getOwnPropertySymbols(value);
        const symbolLength = Math.min(symbols.length, 5);
        for (let index = 0; index < symbolLength; index += 1) {
          const symbolKey = symbols[index];
          const symbolName = typeof symbolKey === 'symbol' ? symbolKey.toString() : String(symbolKey);
          try {
            output[symbolName] = sanitizeForLog(value[symbolKey], nextDepth + 1, visited);
          } catch (error) {
            output[symbolName] = `[Threw: ${error && error.message ? error.message : 'error'}]`;
          }
        }
      }

      if (!keys.length) {
        const ctorName = value.constructor && value.constructor.name;
        if (ctorName) {
          output.__className = ctorName;
        }
      }

      return output;
    }

    const structuredCloneResult = tryStructuredCloneValue(value);
    if (structuredCloneResult.success) {
      return structuredCloneResult.value;
    }

    try {
      return LOGGING_DEEP_CLONE(value);
    } catch (error) {
      void error;
    }

    try {
      return String(value);
    } catch (stringifyError) {
      void stringifyError;
    }

    return null;
  }

  function normaliseStackTrace(stackValue) {
    if (typeof stackValue !== 'string') {
      return null;
    }

    const trimmed = stackValue.replace(/\r\n?/g, '\n').trim();
    if (!trimmed) {
      return null;
    }

    const maxLength = 5000;
    const charTruncated = trimmed.length > maxLength;
    const limitedStack = charTruncated ? trimmed.slice(0, maxLength) : trimmed;

    const rawLines = trimmed.split('\n');
    const frameLimit = 40;
    const frames = [];
    let frameTruncated = false;
    for (let index = 0; index < rawLines.length; index += 1) {
      const line = rawLines[index].trim();
      if (!line) {
        continue;
      }
      if (frames.length < frameLimit) {
        frames.push(line.length > 500 ? `${line.slice(0, 500)}\u2026` : line);
      } else {
        frameTruncated = true;
        break;
      }
    }

    return {
      stack: limitedStack,
      frames,
      truncated: charTruncated || frameTruncated,
    };
  }

  function normaliseOriginSnapshot(origin) {
    if (!origin || typeof origin !== 'object') {
      return null;
    }

    const source = typeof origin.source === 'string' && origin.source
      ? origin.source
      : 'unknown';

    let stackSummary = null;
    if (typeof origin.stack === 'string' && origin.stack) {
      stackSummary = normaliseStackTrace(origin.stack);
    }

    const frames = [];
    if (Array.isArray(origin.frames)) {
      for (let index = 0; index < origin.frames.length && frames.length < 40; index += 1) {
        const frame = origin.frames[index];
        if (typeof frame === 'string' && frame) {
          frames.push(frame);
        } else if (frame !== null && typeof frame !== 'undefined') {
          frames.push(coerceMessage(frame));
        }
      }
    } else if (stackSummary && Array.isArray(stackSummary.frames)) {
      for (let index = 0; index < stackSummary.frames.length; index += 1) {
        frames.push(stackSummary.frames[index]);
      }
    }

    const truncated = origin.truncated === true
      || (stackSummary ? stackSummary.truncated === true : false)
      || (frames.length > 0 && frames.length >= 40);

    const snapshot = {
      source,
      truncated,
    };

    if (stackSummary && stackSummary.stack) {
      snapshot.stack = stackSummary.stack;
    } else if (typeof origin.stack === 'string' && origin.stack) {
      snapshot.stack = origin.stack;
    } else {
      snapshot.stack = null;
    }

    if (frames.length) {
      snapshot.frames = frames;
    }

    if (!snapshot.stack && (!snapshot.frames || !snapshot.frames.length)) {
      return null;
    }

    return freezeDeep(snapshot);
  }

  function getSessionStorage() {
    const scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }
      try {
        const storage = scope.sessionStorage;
        if (storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function') {
          return storage;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }

  function clearStoredHistory() {
    const storage = getSessionStorage();
    if (!storage) {
      return;
    }
    try {
      storage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
      void error;
    }
  }

  function persistConfigSafe() {
    const storage = getSessionStorage();
    if (!storage) {
      return;
    }

    if (!activeConfig.persistSession) {
      try {
        storage.removeItem(CONFIG_STORAGE_KEY);
      } catch (error) {
        void error;
      }
      return;
    }

    try {
      storage.setItem(
        CONFIG_STORAGE_KEY,
        JSON.stringify({
          level: activeConfig.level,
          historyLevel: activeConfig.historyLevel,
          historyLimit: activeConfig.historyLimit,
          consoleOutput: activeConfig.consoleOutput,
          persistSession: activeConfig.persistSession,
          captureGlobalErrors: activeConfig.captureGlobalErrors,
          captureConsole: activeConfig.captureConsole,
          stackTraces: activeConfig.stackTraces,
        }),
      );
    } catch (error) {
      console.warn('cineLogging: Unable to persist logging config', error);
    }
  }

  function persistHistorySafe() {
    if (!activeConfig.persistSession) {
      clearStoredHistory();
      return;
    }

    const storage = getSessionStorage();
    if (!storage) {
      return;
    }

    try {
      storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(logHistory));
    } catch (error) {
      if (error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        // Disable persistence for this session to prevent loop
        activeConfig.persistSession = false;
        try {
          storage.removeItem(HISTORY_STORAGE_KEY);
        } catch (e) { void e; }
        // Do NOT log a warning here, as it might trigger the proxy and cause a loop
        return;
      }
      console.warn('cineLogging: Unable to persist log history', error);
    }
  }

  function getEffectiveHistoryLimit() {
    const effectiveMinimum = activeConfig.persistSession === false
      ? HISTORY_ABSOLUTE_MIN_LIMIT
      : HISTORY_MIN_LIMIT;

    return Math.max(
      effectiveMinimum,
      Math.min(HISTORY_MAX_LIMIT, Math.floor(activeConfig.historyLimit)),
    );
  }

  function recordHistoryDrop(removedEntries, limit, options) {
    if (!Array.isArray(removedEntries) || removedEntries.length === 0) {
      return null;
    }

    totalEntriesDropped += removedEntries.length;
    const removedSummary = summariseEntriesByLevel(removedEntries);

    const source = options && typeof options.source === 'string' && options.source.trim()
      ? options.source.trim()
      : 'enforce';

    const oldestEntry = removedEntries[0] || null;
    const newestEntry = removedEntries[removedEntries.length - 1] || null;

    const dropTimestamp = Date.now();
    let dropIsoTimestamp = '';
    try {
      dropIsoTimestamp = new Date(dropTimestamp).toISOString();
    } catch (error) {
      void error;
      dropIsoTimestamp = String(dropTimestamp);
    }

    lastHistoryDrop = freezeDeep({
      count: removedEntries.length,
      limit,
      source,
      timestamp: dropTimestamp,
      isoTimestamp: dropIsoTimestamp,
      oldestEntryId:
        oldestEntry && typeof oldestEntry.id === 'string' ? oldestEntry.id : null,
      oldestEntryTimestamp:
        oldestEntry && typeof oldestEntry.timestamp === 'number'
          ? oldestEntry.timestamp
          : null,
      oldestEntryIsoTimestamp:
        oldestEntry && typeof oldestEntry.isoTimestamp === 'string'
          ? oldestEntry.isoTimestamp
          : null,
      newestEntryId:
        newestEntry && typeof newestEntry.id === 'string' ? newestEntry.id : null,
      newestEntryTimestamp:
        newestEntry && typeof newestEntry.timestamp === 'number'
          ? newestEntry.timestamp
          : null,
      newestEntryIsoTimestamp:
        newestEntry && typeof newestEntry.isoTimestamp === 'string'
          ? newestEntry.isoTimestamp
          : null,
      levels: freezeLevelSummary(removedSummary),
    });

    if (ORIGINAL_CONSOLE_FUNCTIONS && typeof ORIGINAL_CONSOLE_FUNCTIONS.warn === 'function') {
      try {
        ORIGINAL_CONSOLE_FUNCTIONS.warn('cineLogging: history trimmed to enforce retention limit', {
          limit,
          removed: removedEntries.length,
          source,
          levels: cloneLevelSummary(removedSummary),
        });
      } catch (warnError) {
        void warnError;
      }
    } else {
      // Fallback if original console is somehow missing or we are in a weird state
      // We purposefully avoid safeWarn here to prevent recursion
      try {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          // If console.warn IS the proxy, we can't easily detect it without checking equality to the proxy function
          // But avoiding safeWarn wrapper helps if safeWarn adds extra logic. 
          // Ideally we just stop if we can't find the original.
        }
      } catch (e) { void e; }
    }

    return removedSummary;
  }

  function enforceHistoryLimit(options) {
    const limit = getEffectiveHistoryLimit();
    if (logHistory.length <= limit) {
      return 0;
    }

    const overflow = logHistory.length - limit;
    const removedEntries = logHistory.splice(0, overflow);
    applyLevelCounterDeltaForEntries(retainedLevelCounters, removedEntries, -1);
    const removedSummary = recordHistoryDrop(removedEntries, limit, options);
    if (removedSummary) {
      accumulateLevelSummary(droppedLevelCounters, removedSummary);
    }
    return overflow;
  }

  function shouldRecord(level) {
    return getLevelPriority(level) >= getLevelPriority(activeConfig.historyLevel);
  }

  function shouldOutputToConsole(level) {
    if (!activeConfig.consoleOutput) {
      return false;
    }
    return getLevelPriority(level) >= getLevelPriority(activeConfig.level);
  }

  function getLevelState(level) {
    const normalizedLevel = normalizeLevel(level, 'info');
    const consoleEnabled = shouldOutputToConsole(normalizedLevel);
    const historyEnabled = shouldRecord(normalizedLevel);

    return freezeDeep({
      level: normalizedLevel,
      enabled: consoleEnabled || historyEnabled,
      console: consoleEnabled,
      history: historyEnabled,
      thresholds: freezeDeep({
        console: normalizeLevel(activeConfig.level, DEFAULT_CONFIG_VALUES.level),
        history: normalizeLevel(activeConfig.historyLevel, DEFAULT_CONFIG_VALUES.historyLevel),
      }),
    });
  }

  function isLevelEnabled(level, options) {
    const state = getLevelState(level);

    if (!options || typeof options !== 'object') {
      return state.enabled;
    }

    const checkConsole = options.console !== false;
    const checkHistory = options.history !== false;

    if (!checkConsole && !checkHistory) {
      return false;
    }

    if (options.requireAll === true) {
      if (checkConsole && !state.console) {
        return false;
      }
      if (checkHistory && !state.history) {
        return false;
      }
      return true;
    }

    if (checkConsole && state.console) {
      return true;
    }

    if (checkHistory && state.history) {
      return true;
    }

    return false;
  }

  function createEntryId(timestamp) {
    return `log-${timestamp}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function pushEntryToHistory(entry) {
    if (!entry) {
      return;
    }

    try {
      logHistory.push(entry);
    } catch (pushError) {
      // If the history array is somehow frozen or non-extensible, we silently drop the entry
      // to avoid crashing the entire application.
      void pushError;
      return;
    }
    applyLevelCounterDelta(retainedLevelCounters, entry.level, 1);
  }

  function appendEntry(entry) {
    pushEntryToHistory(entry);
    runtimeEntryCount += 1;
    enforceHistoryLimit({ source: 'append' });
    persistHistorySafe();
    notifyLogSubscribers(entry);
  }

  function notifyLogSubscribers(entry) {
    if (!logSubscribers.size) {
      return;
    }
    const listeners = Array.from(logSubscribers);
    for (let index = 0; index < listeners.length; index += 1) {
      const listener = listeners[index];
      if (typeof listener !== 'function') {
        continue;
      }
      try {
        listener(entry);
      } catch (error) {
        safeWarn('cineLogging listener execution failed', error);
      }
    }
  }

  function getHistorySnapshot(limit) {
    const effectiveLimit = typeof limit === 'number' && Number.isFinite(limit)
      ? Math.max(0, Math.floor(limit))
      : logHistory.length;
    if (!effectiveLimit) {
      return Object.freeze([]);
    }
    const start = Math.max(0, logHistory.length - effectiveLimit);
    const slice = logHistory.slice(start);
    return Object.freeze(slice.slice());
  }

  function notifyConfigSubscribers(snapshot) {
    if (!configSubscribers.size) {
      return;
    }
    const listeners = Array.from(configSubscribers);
    for (let index = 0; index < listeners.length; index += 1) {
      const listener = listeners[index];
      if (typeof listener !== 'function') {
        continue;
      }
      try {
        listener(snapshot);
      } catch (error) {
        safeWarn('cineLogging config listener failed', error);
      }
    }
  }

  function arrayFromArrayLike(value) {
    if (!value || typeof value.length !== 'number') {
      return [];
    }

    const length = value.length;
    const result = new Array(length);
    for (let index = 0; index < length; index += 1) {
      result[index] = value[index];
    }

    return result;
  }

  function safeArrayPush(target, value) {
    if (!Array.isArray(target)) {
      return false;
    }
    try {
      if (typeof Object.isExtensible === 'function' && !Object.isExtensible(target)) {
        return false;
      }
      target.push(value);
      return true;
    } catch (error) {
      void error;
    }
    return false;
  }

  function getConsoleLevelForMethod(method) {
    if (method === 'error') {
      return 'error';
    }
    if (method === 'warn') {
      return 'warn';
    }
    if (method === 'info') {
      return 'info';
    }
    return 'debug';
  }

  function getStoredConsoleFunction(method) {
    if (typeof method !== 'string' || !method) {
      return null;
    }

    if (Object.prototype.hasOwnProperty.call(ORIGINAL_CONSOLE_FUNCTIONS, method)) {
      const stored = ORIGINAL_CONSOLE_FUNCTIONS[method];
      if (typeof stored === 'function') {
        return stored;
      }
    }

    if (typeof console !== 'undefined' && console) {
      let candidate = null;
      try {
        candidate = console[method];
      } catch (error) {
        candidate = null;
        void error;
      }
      if (typeof candidate === 'function' && (!candidate || !candidate[CONSOLE_PROXY_FLAG])) {
        return candidate;
      }
    }

    if ((method === 'debug' || method === 'log') && typeof ORIGINAL_CONSOLE_FUNCTIONS.log === 'function') {
      return ORIGINAL_CONSOLE_FUNCTIONS.log;
    }

    if (method === 'info') {
      if (typeof ORIGINAL_CONSOLE_FUNCTIONS.info === 'function') {
        return ORIGINAL_CONSOLE_FUNCTIONS.info;
      }
      if (typeof ORIGINAL_CONSOLE_FUNCTIONS.log === 'function') {
        return ORIGINAL_CONSOLE_FUNCTIONS.log;
      }
    }

    if (method === 'warn') {
      if (typeof ORIGINAL_CONSOLE_FUNCTIONS.warn === 'function') {
        return ORIGINAL_CONSOLE_FUNCTIONS.warn;
      }
      if (typeof ORIGINAL_CONSOLE_FUNCTIONS.error === 'function') {
        return ORIGINAL_CONSOLE_FUNCTIONS.error;
      }
    }

    if (method === 'error' && typeof ORIGINAL_CONSOLE_FUNCTIONS.error === 'function') {
      return ORIGINAL_CONSOLE_FUNCTIONS.error;
    }

    return null;
  }

  function invokeConsoleMethod(method, args) {
    const fn = getStoredConsoleFunction(method);
    if (typeof fn !== 'function') {
      return undefined;
    }

    const receiver = typeof console !== 'undefined' && console
      ? console
      : GLOBAL_SCOPE && GLOBAL_SCOPE.console
        ? GLOBAL_SCOPE.console
        : null;
    const finalArgs = Array.isArray(args) ? args : arrayFromArrayLike(args);

    try {
      return fn.apply(receiver, finalArgs);
    } catch (applyError) {
      void applyError;
      try {
        return Function.prototype.apply.call(fn, receiver, finalArgs);
      } catch (callError) {
        void callError;
      }
    }

    return undefined;
  }

  function recordConsoleMessage(method, args, meta) {
    const level = getConsoleLevelForMethod(method);
    const rawArgs = Array.isArray(args) ? args : arrayFromArrayLike(args);
    const messageParts = [];

    for (let index = 0; index < rawArgs.length; index += 1) {
      const value = rawArgs[index];
      const valueType = typeof value;
      if (valueType === 'string') {
        safeArrayPush(messageParts, value);
      } else if (valueType === 'number' || valueType === 'boolean') {
        safeArrayPush(messageParts, String(value));
      } else if (valueType === 'symbol') {
        try {
          safeArrayPush(messageParts, value.toString());
        } catch (symbolError) {
          void symbolError;
        }
      }
    }

    let message = messageParts.join(' ').trim();
    if (!message) {
      message = `[console.${method || level}]`;
    }

    let sanitizedArguments = null;
    let detailPayload = null;
    if (rawArgs.length) {
      try {
        sanitizedArguments = sanitizeForLog(rawArgs);
        detailPayload = { arguments: sanitizedArguments };
      } catch (detailError) {
        detailPayload = { arguments: rawArgs.slice() };
        void detailError;
      }
    }

    const errorEntries = [];
    const sanitizedArray = Array.isArray(sanitizedArguments) ? sanitizedArguments : null;

    for (let index = 0; index < rawArgs.length; index += 1) {
      const rawValue = rawArgs[index];
      const sanitizedValue = sanitizedArray ? sanitizedArray[index] : null;
      const isErrorInstance = rawValue instanceof Error;

      const hasSanitizedErrorShape =
        sanitizedValue && typeof sanitizedValue === 'object' && sanitizedValue !== null
          ? Boolean(
            typeof sanitizedValue.stack === 'string'
            || typeof sanitizedValue.message === 'string'
            || typeof sanitizedValue.name === 'string'
          )
          : false;

      if (!isErrorInstance && !hasSanitizedErrorShape) {
        continue;
      }

      let snapshot = hasSanitizedErrorShape ? sanitizedValue : null;

      if (!snapshot) {
        try {
          snapshot = sanitizeForLog(rawValue);
        } catch (argumentSanitizeError) {
          snapshot = null;
          void argumentSanitizeError;
        }
      }

      if (!snapshot && isErrorInstance) {
        snapshot = {
          name: rawValue.name || null,
          message: rawValue.message || coerceMessage(rawValue) || null,
        };
        if (typeof rawValue.code !== 'undefined') {
          snapshot.code = rawValue.code;
        }
        if (typeof rawValue.status !== 'undefined') {
          snapshot.status = rawValue.status;
        }
        if (typeof rawValue.stack === 'string' && rawValue.stack) {
          snapshot.stack = rawValue.stack;
        }
      }

      let valueClone = snapshot;
      if (valueClone && typeof valueClone === 'object') {
        try {
          valueClone = LOGGING_DEEP_CLONE(valueClone);
        } catch (cloneError) {
          void cloneError;
          try {
            valueClone = Object.assign({}, valueClone);
          } catch (assignError) {
            valueClone = snapshot;
            void assignError;
          }
        }
      }

      const entry = { index };
      if (valueClone && typeof valueClone === 'object') {
        entry.value = valueClone;
        if (typeof valueClone.name === 'string' && valueClone.name) {
          entry.name = valueClone.name;
        }
        if (typeof valueClone.message === 'string' && valueClone.message) {
          entry.message = valueClone.message;
        }
        if (typeof valueClone.code !== 'undefined') {
          entry.code = valueClone.code;
        }
        if (typeof valueClone.status !== 'undefined') {
          entry.status = valueClone.status;
        }
      } else if (typeof valueClone !== 'undefined') {
        entry.value = valueClone;
        const coercedMessage = coerceMessage(valueClone);
        if (coercedMessage) {
          entry.message = coercedMessage;
        }
      } else {
        entry.value = null;
      }

      const rawType = rawValue === null ? 'null' : typeof rawValue;
      if (rawType === 'object' || rawType === 'function') {
        const ctorName = rawValue && rawValue.constructor && rawValue.constructor.name;
        entry.argumentType = typeof ctorName === 'string' && ctorName ? ctorName : rawType;
      } else {
        entry.argumentType = rawType;
      }

      const stackSummary = isErrorInstance && typeof rawValue.stack === 'string' && rawValue.stack
        ? normaliseStackTrace(rawValue.stack)
        : valueClone && typeof valueClone === 'object' && typeof valueClone.stack === 'string'
          ? normaliseStackTrace(valueClone.stack)
          : null;

      if (stackSummary) {
        if (typeof stackSummary.stack === 'string') {
          entry.stack = stackSummary.stack;
        }
        if (Array.isArray(stackSummary.frames) && stackSummary.frames.length) {
          entry.frames = stackSummary.frames;
        }
        if (stackSummary.truncated) {
          entry.stackTruncated = true;
        }
      }

      safeArrayPush(errorEntries, entry);
    }

    const contextMeta = { channel: 'console', method: method || 'log' };
    if (meta && typeof meta === 'object') {
      const metaKeys = Object.keys(meta);
      for (let index = 0; index < metaKeys.length; index += 1) {
        const key = metaKeys[index];
        try {
          contextMeta[key] = sanitizeForLog(meta[key]);
        } catch (metaError) {
          contextMeta[key] = meta[key];
          void metaError;
        }
      }
    }

    if (errorEntries.length) {
      detailPayload = detailPayload || {};
      const errorIndices = [];
      for (let index = 0; index < errorEntries.length; index += 1) {
        const errorEntry = errorEntries[index];
        errorIndices.push(errorEntry.index);
      }
      detailPayload.errors = errorEntries;
      detailPayload.errorCount = errorEntries.length;
      detailPayload.errorIndices = errorIndices;
      detailPayload.primaryError = errorEntries[0];

      contextMeta.errorCount = errorEntries.length;
      contextMeta.errorIndices = errorIndices;

      const primaryError = errorEntries[0];
      if (primaryError) {
        if (typeof primaryError.name === 'string' && primaryError.name) {
          contextMeta.primaryErrorName = primaryError.name;
        }
        if (typeof primaryError.message === 'string' && primaryError.message) {
          contextMeta.primaryErrorMessage = primaryError.message;
        }
        if (typeof primaryError.code !== 'undefined') {
          contextMeta.primaryErrorCode = primaryError.code;
        }
        if (typeof primaryError.status !== 'undefined') {
          contextMeta.primaryErrorStatus = primaryError.status;
        }
        if (primaryError.stack) {
          contextMeta.primaryErrorHasStack = true;
        }
      }
    }

    const forceStackCapture = method === 'error' || errorEntries.length > 0;
    const contextOptions = { namespace: 'console', meta: contextMeta };
    if (forceStackCapture) {
      contextOptions.captureStack = true;
    }

    return logInternal(
      level,
      message,
      detailPayload,
      contextOptions,
      { silentConsole: true },
    );
  }

  function installConsoleProxies() {
    if (consoleProxyInstalled) {
      return true;
    }

    consoleProxyInstallationAttempted = true;

    if (typeof console === 'undefined' || !console) {
      consoleProxyInstallationFailed = true;
      return false;
    }

    try {
      if (console[CONSOLE_PROXY_FLAG]) {
        consoleProxyInstalled = true;
        consoleProxyInstallationFailed = false;
        return true;
      }
    } catch (flagReadError) {
      void flagReadError;
    }

    let installedAny = false;

    for (let index = 0; index < CONSOLE_METHODS.length; index += 1) {
      const method = CONSOLE_METHODS[index];
      let base = getStoredConsoleFunction(method);

      if (typeof base !== 'function') {
        try {
          const candidate = console[method];
          if (typeof candidate === 'function' && (!candidate || !candidate[CONSOLE_PROXY_FLAG])) {
            base = candidate;
          }
        } catch (resolveError) {
          base = null;
          void resolveError;
        }
      }

      if (!Object.prototype.hasOwnProperty.call(ORIGINAL_CONSOLE_FUNCTIONS, method) || ORIGINAL_CONSOLE_FUNCTIONS[method] === null) {
        ORIGINAL_CONSOLE_FUNCTIONS[method] = typeof base === 'function' ? base : ORIGINAL_CONSOLE_FUNCTIONS[method];
      }

      if (typeof base !== 'function') {
        continue;
      }

      const proxy = function consoleProxy() {
        const argsArray = arrayFromArrayLike(arguments);
        consoleProxyGuardDepth += 1;
        try {
          if (consoleProxyGuardDepth === 1) {
            const firstArg = argsArray.length ? argsArray[0] : null;
            const skipCapture = typeof firstArg === 'string' && firstArg.indexOf('cineLogging:') === 0;
            if (!skipCapture) {
              try {
                recordConsoleMessage(method, argsArray, { captured: true });
              } catch (recordError) {
                void recordError;
              }
            }
          }
          return invokeConsoleMethod(method, argsArray);
        } finally {
          consoleProxyGuardDepth -= 1;
          if (consoleProxyGuardDepth < 0) {
            consoleProxyGuardDepth = 0;
          }
        }
      };

      try {
        Object.defineProperty(proxy, CONSOLE_PROXY_FLAG, {
          configurable: true,
          enumerable: false,
          writable: false,
          value: true,
        });
      } catch (defineError) {
        proxy[CONSOLE_PROXY_FLAG] = true;
        void defineError;
      }

      try {
        console[method] = proxy;
        installedAny = true;
      } catch (assignError) {
        void assignError;
      }
    }

    if (installedAny) {
      consoleProxyInstalled = true;
      consoleProxyInstallationFailed = false;
      try {
        Object.defineProperty(console, CONSOLE_PROXY_FLAG, {
          configurable: true,
          enumerable: false,
          writable: false,
          value: true,
        });
      } catch (flagError) {
        try {
          console[CONSOLE_PROXY_FLAG] = true;
        } catch (assignFlagError) {
          void assignFlagError;
        }
        void flagError;
      }
    } else {
      consoleProxyInstallationFailed = true;
    }

    return consoleProxyInstalled;
  }

  function removeConsoleProxies() {
    if (!consoleProxyInstalled) {
      return false;
    }

    if (typeof console === 'undefined' || !console) {
      consoleProxyInstalled = false;
      return false;
    }

    let restoredAny = false;

    for (let index = 0; index < CONSOLE_METHODS.length; index += 1) {
      const method = CONSOLE_METHODS[index];
      const original = ORIGINAL_CONSOLE_FUNCTIONS[method];
      try {
        if (typeof original === 'function') {
          console[method] = original;
          restoredAny = true;
        } else if (method !== 'log' && method !== 'info') {
          delete console[method];
        }
      } catch (restoreError) {
        void restoreError;
      }
    }

    try {
      if (console && console[CONSOLE_PROXY_FLAG]) {
        if (typeof Object.defineProperty === 'function') {
          Object.defineProperty(console, CONSOLE_PROXY_FLAG, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: false,
          });
        } else {
          console[CONSOLE_PROXY_FLAG] = false;
        }
      }
    } catch (flagError) {
      void flagError;
    }

    consoleProxyInstalled = false;
    return restoredAny;
  }

  function syncConsoleCaptureState() {
    if (!activeConfig.captureConsole) {
      if (consoleProxyInstalled) {
        removeConsoleProxies();
      }
      if (lastConsoleCaptureState !== 'disabled') {
        logInternal(
          'info',
          'Console output capture disabled',
          buildConsoleCaptureDetail({ status: 'disabled' }),
          { namespace: 'logging', meta: { channel: 'console', lifecycle: 'sync' } },
          { silentConsole: true },
        );
        lastConsoleCaptureState = 'disabled';
      }
      consoleProxyWarningIssued = false;
      consoleProxyInstallationFailed = false;
      return true;
    }

    const installed = installConsoleProxies();
    if (!installed) {
      if (!consoleProxyWarningIssued) {
        const reason = typeof console === 'undefined' || !console
          ? 'console-unavailable'
          : 'installation-failed';
        logInternal(
          'warn',
          'Console output capture failed',
          buildConsoleCaptureDetail({ status: 'failed', reason }),
          { namespace: 'logging', meta: { channel: 'console', lifecycle: 'sync' } },
          { silentConsole: true },
        );
        safeWarn('cineLogging: Unable to capture console output for diagnostics.');
        consoleProxyWarningIssued = true;
      }
      lastConsoleCaptureState = 'failed';
      return false;
    }

    consoleProxyWarningIssued = false;

    if (lastConsoleCaptureState !== 'enabled') {
      logInternal(
        'info',
        'Console output capture enabled',
        buildConsoleCaptureDetail({ status: 'enabled' }),
        { namespace: 'logging', meta: { channel: 'console', lifecycle: 'sync' } },
        { silentConsole: true },
      );
      lastConsoleCaptureState = 'enabled';
    }

    return true;
  }

  function isConsoleCaptureActive() {
    return Boolean(activeConfig.captureConsole) && consoleProxyInstalled === true;
  }

  function buildConsoleCaptureDetail(overrides) {
    const detail = {
      configured: activeConfig.captureConsole === true,
      installed: consoleProxyInstalled === true,
      attempted: consoleProxyInstallationAttempted === true,
      failed: consoleProxyInstallationFailed === true,
    };

    if (typeof console === 'undefined' || !console) {
      detail.consoleAvailable = false;
    }

    if (overrides && typeof overrides === 'object') {
      const overrideKeys = Object.keys(overrides);
      for (let index = 0; index < overrideKeys.length; index += 1) {
        const key = overrideKeys[index];
        detail[key] = overrides[key];
      }
    }

    return detail;
  }

  function enableConsoleCapture(options) {
    const setOptions = options && typeof options === 'object' ? options : null;
    setConfig({ captureConsole: true }, setOptions || undefined);
    return isConsoleCaptureActive();
  }

  function disableConsoleCapture(options) {
    const setOptions = options && typeof options === 'object' ? options : null;
    setConfig({ captureConsole: false }, setOptions || undefined);
    return isConsoleCaptureActive();
  }

  function shouldCaptureOrigin(level, detail, context) {
    const override = context && Object.prototype.hasOwnProperty.call(context, 'captureStack')
      ? context.captureStack
      : null;

    if (override === true) {
      return true;
    }

    if (override === false) {
      return false;
    }

    if (activeConfig.stackTraces !== true) {
      return false;
    }

    if (detail instanceof Error) {
      return true;
    }

    return getLevelPriority(level) >= getLevelPriority('warn');
  }

  function captureLogOrigin(level, message, detail, context) {
    if (!shouldCaptureOrigin(level, detail, context)) {
      return null;
    }

    let stackSource = 'generated';
    let stackValue = '';

    if (detail instanceof Error) {
      const detailStack = detail.stack;
      if (typeof detailStack === 'string' && detailStack) {
        stackSource = 'detail';
        stackValue = detailStack;
      }
    }

    if (!stackValue) {
      try {
        const stackMessage = typeof message === 'string' && message
          ? message
          : `Log ${level}`;
        const captureError = new Error(stackMessage);
        if (typeof Error.captureStackTrace === 'function') {
          Error.captureStackTrace(captureError, captureLogOrigin);
        }
        if (typeof captureError.stack === 'string' && captureError.stack) {
          stackValue = captureError.stack;
        }
      } catch (stackError) {
        void stackError;
      }
    }

    const summary = normaliseStackTrace(stackValue);
    if (!summary) {
      return null;
    }

    const origin = {
      source: stackSource,
      stack: summary.stack,
      truncated: summary.truncated,
    };

    if (Array.isArray(summary.frames) && summary.frames.length) {
      origin.frames = summary.frames;
    }

    return freezeDeep(origin);
  }

  function logInternal(level, message, detail, context, options) {
    const normalizedLevel = normalizeLevel(level, 'info');
    const timestamp = Date.now();
    let isoTimestamp = '';
    try {
      isoTimestamp = new Date(timestamp).toISOString();
    } catch (error) {
      void error;
      isoTimestamp = String(timestamp);
    }

    const captureContext = context && typeof context === 'object' ? context : null;
    const origin = captureLogOrigin(normalizedLevel, message, detail, captureContext);

    const namespace = captureContext && typeof captureContext.namespace === 'string' && captureContext.namespace
      ? context.namespace
      : null;

    const meta = captureContext && typeof captureContext.meta !== 'undefined'
      ? sanitizeForLog(captureContext.meta)
      : null;

    const sanitizedDetail = typeof detail === 'undefined'
      ? null
      : sanitizeForLog(detail);

    const entry = freezeDeep({
      id: createEntryId(timestamp),
      level: normalizedLevel,
      message: coerceMessage(message),
      namespace,
      detail: sanitizedDetail,
      meta,
      timestamp,
      isoTimestamp,
      origin,
    });

    applyLevelCounterDelta(emittedLevelCounters, normalizedLevel, 1);

    if (shouldRecord(normalizedLevel)) {
      appendEntry(entry);
    }

    const internalOptions = options && typeof options === 'object' ? options : null;

    if (shouldOutputToConsole(normalizedLevel) && (!internalOptions || internalOptions.silentConsole !== true)) {
      const descriptor = LOG_LEVEL_MAP[normalizedLevel] || LOG_LEVEL_MAP.info;
      const methodName = descriptor.consoleMethod;
      const prefixParts = ['[cine]'];
      if (namespace) {
        prefixParts.push(`[${namespace}]`);
      }
      prefixParts.push(entry.isoTimestamp);
      const prefix = prefixParts.join(' ');
      const consoleArgs = [`${prefix} ${entry.message}`];
      if (detail !== undefined) {
        safeArrayPush(consoleArgs, detail);
      } else if (entry.detail !== null) {
        safeArrayPush(consoleArgs, entry.detail);
      }
      if (entry.meta !== null) {
        safeArrayPush(consoleArgs, { meta: entry.meta });
      }
      if (origin) {
        safeArrayPush(consoleArgs, { origin });
      }
      invokeConsoleMethod(methodName, consoleArgs);
    }

    return entry;
  }

  function debug(message, detail, context) {
    return logInternal('debug', message, detail, context);
  }

  function info(message, detail, context) {
    return logInternal('info', message, detail, context);
  }

  function warn(message, detail, context) {
    return logInternal('warn', message, detail, context);
  }

  function error(message, detail, context) {
    return logInternal('error', message, detail, context);
  }

  function getConfigSnapshot() {
    return freezeDeep({
      level: activeConfig.level,
      historyLevel: activeConfig.historyLevel,
      historyLimit: activeConfig.historyLimit,
      consoleOutput: activeConfig.consoleOutput,
      persistSession: activeConfig.persistSession,
      captureGlobalErrors: activeConfig.captureGlobalErrors,
      captureConsole: activeConfig.captureConsole,
      stackTraces: activeConfig.stackTraces,
    });
  }

  function getHistory(options) {
    const limit = options && typeof options.limit !== 'undefined' ? options.limit : undefined;
    return getHistorySnapshot(limit);
  }

  function cloneLastDropSnapshot() {
    if (!lastHistoryDrop) {
      return null;
    }

    return freezeDeep({
      count: typeof lastHistoryDrop.count === 'number' ? lastHistoryDrop.count : 0,
      limit: typeof lastHistoryDrop.limit === 'number'
        ? lastHistoryDrop.limit
        : getEffectiveHistoryLimit(),
      source: typeof lastHistoryDrop.source === 'string' ? lastHistoryDrop.source : 'enforce',
      timestamp:
        typeof lastHistoryDrop.timestamp === 'number'
          ? lastHistoryDrop.timestamp
          : null,
      isoTimestamp: typeof lastHistoryDrop.isoTimestamp === 'string'
        ? lastHistoryDrop.isoTimestamp
        : null,
      oldestEntryId: typeof lastHistoryDrop.oldestEntryId === 'string'
        ? lastHistoryDrop.oldestEntryId
        : null,
      oldestEntryTimestamp: typeof lastHistoryDrop.oldestEntryTimestamp === 'number'
        ? lastHistoryDrop.oldestEntryTimestamp
        : null,
      oldestEntryIsoTimestamp: typeof lastHistoryDrop.oldestEntryIsoTimestamp === 'string'
        ? lastHistoryDrop.oldestEntryIsoTimestamp
        : null,
      newestEntryId: typeof lastHistoryDrop.newestEntryId === 'string'
        ? lastHistoryDrop.newestEntryId
        : null,
      newestEntryTimestamp: typeof lastHistoryDrop.newestEntryTimestamp === 'number'
        ? lastHistoryDrop.newestEntryTimestamp
        : null,
      newestEntryIsoTimestamp: typeof lastHistoryDrop.newestEntryIsoTimestamp === 'string'
        ? lastHistoryDrop.newestEntryIsoTimestamp
        : null,
      levels: lastHistoryDrop.levels
        ? freezeLevelSummary(lastHistoryDrop.levels)
        : freezeLevelSummary(createLevelCounters()),
    });
  }

  function getStats() {
    return freezeDeep({
      runtimeEntries: runtimeEntryCount,
      retainedEntries: logHistory.length,
      droppedEntries: totalEntriesDropped,
      historyLimit: getEffectiveHistoryLimit(),
      lastDrop: cloneLastDropSnapshot(),
      levels: freezeDeep({
        emitted: freezeLevelSummary(emittedLevelCounters),
        retained: freezeLevelSummary(retainedLevelCounters),
        dropped: freezeLevelSummary(droppedLevelCounters),
      }),
      consoleCapture: freezeDeep({
        configured: activeConfig.captureConsole === true,
        installed: consoleProxyInstalled,
        attempted: consoleProxyInstallationAttempted,
        failed: consoleProxyInstallationFailed,
      }),
    });
  }

  function clearHistory(options) {
    logHistory.length = 0;
    resetLevelCounters(retainedLevelCounters);
    if (!options || options.persist !== false) {
      persistHistorySafe();
    }
    return true;
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      return function unsubscribeNoop() {
        return false;
      };
    }
    logSubscribers.add(listener);
    return function unsubscribe() {
      logSubscribers.delete(listener);
      return true;
    };
  }

  function subscribeConfig(listener) {
    if (typeof listener !== 'function') {
      return function unsubscribeConfigNoop() {
        return false;
      };
    }
    configSubscribers.add(listener);
    return function unsubscribeConfig() {
      configSubscribers.delete(listener);
      return true;
    };
  }

  function mergeMeta(baseMeta, meta) {
    if (!baseMeta && !meta) {
      return null;
    }

    if (!baseMeta) {
      return sanitizeForLog(meta);
    }

    if (!meta) {
      return baseMeta;
    }

    if (typeof baseMeta !== 'object' || typeof meta !== 'object') {
      return sanitizeForLog(meta);
    }

    const merged = {};
    const baseKeys = Object.keys(baseMeta);
    for (let index = 0; index < baseKeys.length; index += 1) {
      const key = baseKeys[index];
      merged[key] = baseMeta[key];
    }
    const metaKeys = Object.keys(meta);
    for (let index = 0; index < metaKeys.length; index += 1) {
      const key = metaKeys[index];
      merged[key] = sanitizeForLog(meta[key]);
    }
    return merged;
  }

  function createLogger(namespace, options) {
    const normalizedNamespace = typeof namespace === 'string' && namespace.trim()
      ? namespace.trim()
      : 'app';

    const baseMeta = options && typeof options.meta !== 'undefined'
      ? sanitizeForLog(options.meta)
      : null;

    function logWithNamespace(level, message, detail, meta) {
      const mergedMeta = mergeMeta(baseMeta, meta);
      return logInternal(level, message, detail, {
        namespace: normalizedNamespace,
        meta: mergedMeta,
      });
    }

    return freezeDeep({
      namespace: normalizedNamespace,
      log(level, message, detail, meta) {
        return logWithNamespace(level, message, detail, meta);
      },
      debug(message, detail, meta) {
        return logWithNamespace('debug', message, detail, meta);
      },
      info(message, detail, meta) {
        return logWithNamespace('info', message, detail, meta);
      },
      warn(message, detail, meta) {
        return logWithNamespace('warn', message, detail, meta);
      },
      error(message, detail, meta) {
        return logWithNamespace('error', message, detail, meta);
      },
      getConfig: getConfigSnapshot,
      isLevelEnabled(level, optionOverrides) {
        return isLevelEnabled(level, optionOverrides);
      },
      getLevelState(level) {
        return getLevelState(level);
      },
    });
  }

  function markEventHandled(event) {
    if (!event || (typeof event !== 'object' && typeof event !== 'function')) {
      return false;
    }

    const flag = ERROR_EVENT_FLAG;

    try {
      if (typeof flag === 'symbol') {
        if (event[flag]) {
          return true;
        }
        event[flag] = true;
        return false;
      }

      if (Object.prototype.hasOwnProperty.call(event, flag) && event[flag]) {
        return true;
      }

      Object.defineProperty(event, flag, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: true,
      });
      return false;
    } catch (error) {
      void error;
    }

    return false;
  }

  function handleGlobalError(event) {
    if (!activeConfig.captureGlobalErrors) {
      return;
    }

    if (markEventHandled(event)) {
      return;
    }

    const detail = {
      message: event && typeof event.message === 'string' ? event.message : '',
      filename: event ? event.filename || event.fileName || null : null,
      lineno: event ? event.lineno || event.lineNumber || null : null,
      colno: event ? event.colno || event.columnNumber || null : null,
      error: event && event.error ? sanitizeForLog(event.error) : null,
    };

    if (event && typeof event.preventDefault === 'function' && event.defaultPrevented) {
      detail.defaultPrevented = true;
    }

    logInternal('error', 'Global error captured', detail, { namespace: 'global' });
  }

  function handleUnhandledRejection(event) {
    if (!activeConfig.captureGlobalErrors) {
      return;
    }

    if (markEventHandled(event)) {
      return;
    }

    const detail = {
      reason: event ? sanitizeForLog(event.reason) : null,
    };

    if (event && event.promise) {
      detail.promiseState = '[Promise]';
    }

    if (event && typeof event.preventDefault === 'function' && event.defaultPrevented) {
      detail.defaultPrevented = true;
    }

    logInternal('error', 'Unhandled promise rejection captured', detail, { namespace: 'global' });
  }

  function markTargetAttached(target) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

    if (attachedErrorTargets instanceof WeakSet) {
      if (attachedErrorTargets.has(target)) {
        return true;
      }
      attachedErrorTargets.add(target);
      return false;
    }

    const list = attachedErrorTargets;
    const index = list.indexOf(target);
    if (index !== -1) {
      return true;
    }
    list.push(target);
    return false;
  }

  function attachGlobalErrorListeners() {
    if (!activeConfig.captureGlobalErrors) {
      return;
    }

    const scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || typeof scope.addEventListener !== 'function') {
        continue;
      }

      if (markTargetAttached(scope)) {
        continue;
      }

      try {
        scope.addEventListener('error', handleGlobalError, true);
      } catch (error) {
        void error;
      }

      try {
        scope.addEventListener('unhandledrejection', handleUnhandledRejection, true);
      } catch (error) {
        void error;
      }
    }
  }

  function applyConfig(overrides) {
    if (!overrides || typeof overrides !== 'object') {
      return { changed: false, captureChanged: false, limitChanged: false };
    }

    let changed = false;
    let captureChanged = false;
    let limitChanged = false;
    let consoleCaptureChanged = false;

    const nextPersistSession = Object.prototype.hasOwnProperty.call(overrides, 'persistSession')
      ? booleanFromValue(overrides.persistSession, activeConfig.persistSession)
      : activeConfig.persistSession;

    if (Object.prototype.hasOwnProperty.call(overrides, 'level')) {
      const nextLevel = normalizeLevel(overrides.level, activeConfig.level);
      if (nextLevel !== activeConfig.level) {
        activeConfig.level = nextLevel;
        changed = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'historyLevel')) {
      const nextHistoryLevel = normalizeLevel(overrides.historyLevel, activeConfig.historyLevel);
      if (nextHistoryLevel !== activeConfig.historyLevel) {
        activeConfig.historyLevel = nextHistoryLevel;
        changed = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'historyLimit')) {
      const nextLimit = clampHistoryLimit(overrides.historyLimit, {
        allowReducedMin: nextPersistSession === false,
      });
      if (nextLimit !== activeConfig.historyLimit) {
        activeConfig.historyLimit = nextLimit;
        changed = true;
        limitChanged = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'consoleOutput')) {
      const nextConsole = booleanFromValue(overrides.consoleOutput, activeConfig.consoleOutput);
      if (nextConsole !== activeConfig.consoleOutput) {
        activeConfig.consoleOutput = nextConsole;
        changed = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'persistSession')) {
      if (nextPersistSession !== activeConfig.persistSession) {
        activeConfig.persistSession = nextPersistSession;
        changed = true;
      }
    }

    if (activeConfig.persistSession && activeConfig.historyLimit < HISTORY_MIN_LIMIT) {
      activeConfig.historyLimit = HISTORY_MIN_LIMIT;
      changed = true;
      limitChanged = true;
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'captureGlobalErrors')) {
      const nextCapture = booleanFromValue(overrides.captureGlobalErrors, activeConfig.captureGlobalErrors);
      if (nextCapture !== activeConfig.captureGlobalErrors) {
        activeConfig.captureGlobalErrors = nextCapture;
        changed = true;
        captureChanged = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'captureConsole')) {
      const nextConsoleCapture = booleanFromValue(overrides.captureConsole, activeConfig.captureConsole);
      if (nextConsoleCapture !== activeConfig.captureConsole) {
        activeConfig.captureConsole = nextConsoleCapture;
        changed = true;
        consoleCaptureChanged = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'stackTraces')) {
      const nextStackTraces = booleanFromValue(overrides.stackTraces, activeConfig.stackTraces);
      if (nextStackTraces !== activeConfig.stackTraces) {
        activeConfig.stackTraces = nextStackTraces;
        changed = true;
      }
    }

    return { changed, captureChanged, limitChanged, consoleCaptureChanged };
  }

  function setConfig(overrides, options) {
    const previousCapture = activeConfig.captureGlobalErrors;
    const previousConsoleCapture = activeConfig.captureConsole;
    const result = applyConfig(overrides);

    if (result.limitChanged) {
      enforceHistoryLimit({ source: 'config' });
    }

    if (result.changed && (!options || options.persist !== false)) {
      persistConfigSafe();
      persistHistorySafe();
    }

    if (!activeConfig.persistSession) {
      clearStoredHistory();
    }

    if (!previousCapture && activeConfig.captureGlobalErrors) {
      attachGlobalErrorListeners();
    }

    if (result.consoleCaptureChanged || previousConsoleCapture !== activeConfig.captureConsole) {
      syncConsoleCaptureState();
    }

    if (result.changed) {
      notifyConfigSubscribers(getConfigSnapshot());
    }

    return getConfigSnapshot();
  }

  function resolveConfigPresetFromScopes() {
    const scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    const keys = ['__cineLoggingConfig', '__CINE_LOGGING_CONFIG', 'cineLoggingConfig'];

    for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      const scope = scopes[scopeIndex];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
        const key = keys[keyIndex];
        let value;
        try {
          value = scope[key];
        } catch (error) {
          void error;
          value = null;
        }
        if (value && typeof value === 'object') {
          return value;
        }
      }
    }

    return null;
  }

  function applyConfigFromStorage() {
    const storage = getSessionStorage();
    if (!storage) {
      return;
    }

    let raw = '';
    try {
      raw = storage.getItem(CONFIG_STORAGE_KEY) || '';
    } catch (error) {
      void error;
      return;
    }

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      applyConfig(parsed);
    } catch (error) {
      safeWarn('cineLogging: Unable to restore logging config from storage', error);
    }
  }

  function applyConfigFromQuery() {
    if (!GLOBAL_SCOPE || !GLOBAL_SCOPE.location) {
      return;
    }

    let search = '';
    try {
      search = GLOBAL_SCOPE.location.search || '';
    } catch (error) {
      void error;
      return;
    }

    if (typeof search !== 'string' || !search) {
      return;
    }

    let params = null;
    if (typeof URLSearchParams === 'function') {
      try {
        params = new URLSearchParams(search);
      } catch (error) {
        void error;
      }
    }

    const updates = {};
    let hasUpdates = false;

    function assignUpdate(key, value) {
      updates[key] = value;
      hasUpdates = true;
    }

    if (params) {
      if (params.has('cineLogLevel')) {
        assignUpdate('level', params.get('cineLogLevel'));
      }
      if (params.has('cineLogHistoryLevel')) {
        assignUpdate('historyLevel', params.get('cineLogHistoryLevel'));
      }
      if (params.has('cineLogLimit')) {
        assignUpdate('historyLimit', params.get('cineLogLimit'));
      }
      if (params.has('cineLogConsole')) {
        assignUpdate('consoleOutput', params.get('cineLogConsole'));
      }
      if (params.has('cineLogPersist')) {
        assignUpdate('persistSession', params.get('cineLogPersist'));
      }
      if (params.has('cineLogCapture')) {
        assignUpdate('captureGlobalErrors', params.get('cineLogCapture'));
      }
      if (params.has('cineLogConsoleCapture')) {
        assignUpdate('captureConsole', params.get('cineLogConsoleCapture'));
      }
      if (params.has('cineLogStackTraces')) {
        assignUpdate('stackTraces', params.get('cineLogStackTraces'));
      }
    } else {
      const query = search.charAt(0) === '?' ? search.slice(1) : search;
      const parts = query.split('&');
      for (let index = 0; index < parts.length; index += 1) {
        const part = parts[index];
        if (!part) {
          continue;
        }
        const eqIndex = part.indexOf('=');
        const key = eqIndex === -1 ? decodeURIComponent(part) : decodeURIComponent(part.slice(0, eqIndex));
        const value = eqIndex === -1 ? '' : decodeURIComponent(part.slice(eqIndex + 1));
        if (key === 'cineLogLevel') {
          assignUpdate('level', value);
        } else if (key === 'cineLogHistoryLevel') {
          assignUpdate('historyLevel', value);
        } else if (key === 'cineLogLimit') {
          assignUpdate('historyLimit', value);
        } else if (key === 'cineLogConsole') {
          assignUpdate('consoleOutput', value);
        } else if (key === 'cineLogPersist') {
          assignUpdate('persistSession', value);
        } else if (key === 'cineLogCapture') {
          assignUpdate('captureGlobalErrors', value);
        } else if (key === 'cineLogConsoleCapture') {
          assignUpdate('captureConsole', value);
        } else if (key === 'cineLogStackTraces') {
          assignUpdate('stackTraces', value);
        }
      }
    }

    if (hasUpdates) {
      applyConfig(updates);
    }
  }

  function normaliseStoredEntry(entry) {
    if (!entry || typeof entry !== 'object') {
      return null;
    }

    const normalizedLevel = normalizeLevel(entry.level, 'info');
    const timestamp = typeof entry.timestamp === 'number' && Number.isFinite(entry.timestamp)
      ? entry.timestamp
      : Date.now();

    let isoTimestamp = '';
    if (typeof entry.isoTimestamp === 'string' && entry.isoTimestamp) {
      isoTimestamp = entry.isoTimestamp;
    } else {
      try {
        isoTimestamp = new Date(timestamp).toISOString();
      } catch (error) {
        void error;
        isoTimestamp = String(timestamp);
      }
    }

    const normalizedMessage = typeof entry.message === 'string'
      ? entry.message
      : coerceMessage(entry.message);

    const normalizedNamespace = typeof entry.namespace === 'string' && entry.namespace
      ? entry.namespace
      : null;

    const normalizedId = typeof entry.id === 'string' && entry.id
      ? entry.id
      : createEntryId(timestamp);

    return freezeDeep({
      id: normalizedId,
      level: normalizedLevel,
      message: normalizedMessage,
      namespace: normalizedNamespace,
      detail: typeof entry.detail === 'undefined' ? null : sanitizeForLog(entry.detail),
      meta: typeof entry.meta === 'undefined' ? null : sanitizeForLog(entry.meta),
      timestamp,
      isoTimestamp,
      origin: typeof entry.origin === 'undefined' ? null : normaliseOriginSnapshot(entry.origin),
    });
  }

  function getGlobalNavigator() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.navigator === 'object' && GLOBAL_SCOPE.navigator) {
      return GLOBAL_SCOPE.navigator;
    }
    if (typeof navigator !== 'undefined' && navigator) {
      return navigator;
    }
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.navigator === 'object') {
      return globalThis.navigator;
    }
    return null;
  }

  function getNavigatorServiceWorker() {
    const nav = getGlobalNavigator();
    if (!nav || typeof nav !== 'object') {
      return null;
    }
    if (!nav.serviceWorker) {
      return null;
    }
    return nav.serviceWorker;
  }

  function markServiceWorkerEntrySeen(id) {
    if (!id) {
      return true;
    }

    if (serviceWorkerBridgeState.seenIds) {
      if (serviceWorkerBridgeState.seenIds.has(id)) {
        return false;
      }
      serviceWorkerBridgeState.seenIds.add(id);
      return true;
    }

    if (Array.isArray(serviceWorkerBridgeState.fallbackSeenIds)) {
      if (serviceWorkerBridgeState.fallbackSeenIds.indexOf(id) !== -1) {
        return false;
      }
      serviceWorkerBridgeState.fallbackSeenIds.push(id);
      return true;
    }

    return true;
  }

  function mergeServiceWorkerEntryMeta(entry, snapshotMeta) {
    const merged = {};

    if (entry && typeof entry.meta !== 'undefined') {
      if (entry.meta && typeof entry.meta === 'object') {
        for (const key in entry.meta) {
          if (Object.prototype.hasOwnProperty.call(entry.meta, key)) {
            merged[key] = entry.meta[key];
          }
        }
      } else {
        merged.value = entry.meta;
      }
    }

    const channel = entry && typeof entry.channel === 'string' && entry.channel
      ? entry.channel
      : merged.channel;
    if (channel) {
      merged.channel = channel;
    } else {
      merged.channel = 'service-worker';
    }

    if (snapshotMeta && typeof snapshotMeta === 'object') {
      if (snapshotMeta.cacheName && !merged.cacheName) {
        merged.cacheName = snapshotMeta.cacheName;
      }
      if (snapshotMeta.cacheVersion && !merged.cacheVersion) {
        merged.cacheVersion = snapshotMeta.cacheVersion;
      }
      if (typeof snapshotMeta.generatedAt === 'number' && Number.isFinite(snapshotMeta.generatedAt)) {
        if (!merged.snapshotTimestamp) {
          merged.snapshotTimestamp = snapshotMeta.generatedAt;
        }
      }
      if (typeof snapshotMeta.historyLength === 'number' && Number.isFinite(snapshotMeta.historyLength)) {
        if (!merged.snapshotSize) {
          merged.snapshotSize = snapshotMeta.historyLength;
        }
      }
    }

    return merged;
  }

  function importServiceWorkerLogEntries(entries, snapshotMeta) {
    if (!Array.isArray(entries) || !entries.length) {
      return;
    }

    for (let index = 0; index < entries.length; index += 1) {
      const rawEntry = entries[index];
      if (!rawEntry || typeof rawEntry !== 'object') {
        continue;
      }

      const entryId = typeof rawEntry.id === 'string' && rawEntry.id ? rawEntry.id : null;
      if (!markServiceWorkerEntrySeen(entryId)) {
        continue;
      }

      const origin = rawEntry.origin && typeof rawEntry.origin === 'object'
        ? rawEntry.origin
        : { runtime: 'service-worker' };

      const normalized = normaliseStoredEntry({
        id: entryId || undefined,
        level: rawEntry.level,
        message: rawEntry.message,
        namespace: typeof rawEntry.namespace === 'string' && rawEntry.namespace
          ? rawEntry.namespace
          : 'service-worker',
        detail: typeof rawEntry.detail === 'undefined' ? null : rawEntry.detail,
        meta: mergeServiceWorkerEntryMeta(rawEntry, snapshotMeta),
        timestamp: rawEntry.timestamp,
        isoTimestamp: rawEntry.isoTimestamp,
        origin,
      });

      if (normalized) {
        appendEntry(normalized);
      }
    }
  }

  function finalizeServiceWorkerLogRequest(requestId) {
    if (!serviceWorkerBridgeState.requestInFlight) {
      return;
    }

    if (requestId && serviceWorkerBridgeState.lastRequestId && requestId !== serviceWorkerBridgeState.lastRequestId) {
      return;
    }

    serviceWorkerBridgeState.requestInFlight = false;
    serviceWorkerBridgeState.lastRequestId = null;

    if (serviceWorkerBridgeState.requestTimer && typeof clearTimeout === 'function') {
      try {
        clearTimeout(serviceWorkerBridgeState.requestTimer);
      } catch (error) {
        void error;
      }
    }

    serviceWorkerBridgeState.requestTimer = null;
  }

  function scheduleServiceWorkerLogPoll() {
    if (serviceWorkerBridgeState.broadcastChannel || serviceWorkerBridgeState.broadcastFailed) {
      return;
    }

    if (serviceWorkerBridgeState.pollTimer || typeof setTimeout !== 'function') {
      return;
    }

    try {
      serviceWorkerBridgeState.pollTimer = setTimeout(() => {
        serviceWorkerBridgeState.pollTimer = null;
        requestServiceWorkerLogSnapshot('poll');
      }, SERVICE_WORKER_LOG_POLL_INTERVAL);
    } catch (error) {
      void error;
    }
  }

  function ensureServiceWorkerBroadcastChannel() {
    if (serviceWorkerBridgeState.broadcastFailed) {
      return null;
    }

    if (serviceWorkerBridgeState.broadcastChannel) {
      return serviceWorkerBridgeState.broadcastChannel;
    }

    if (typeof BroadcastChannel !== 'function') {
      serviceWorkerBridgeState.broadcastFailed = true;
      return null;
    }

    try {
      const channel = new BroadcastChannel(SERVICE_WORKER_LOG_CHANNEL);
      channel.addEventListener('message', handleServiceWorkerLogMessage);
      serviceWorkerBridgeState.broadcastChannel = channel;
      if (serviceWorkerBridgeState.pollTimer && typeof clearTimeout === 'function') {
        try {
          clearTimeout(serviceWorkerBridgeState.pollTimer);
        } catch (error) {
          void error;
        }
        serviceWorkerBridgeState.pollTimer = null;
      }
      return channel;
    } catch (error) {
      serviceWorkerBridgeState.broadcastFailed = true;
      safeWarn('cineLogging: Unable to open service worker diagnostics channel', error);
      return null;
    }
  }

  function handleServiceWorkerLogMessage(event) {
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

    if (data.type === SERVICE_WORKER_LOG_ENTRY_TYPE) {
      importServiceWorkerLogEntries([data.entry], serviceWorkerBridgeState.lastSnapshotMeta);
      scheduleServiceWorkerLogPoll();
      return;
    }

    if (data.type === SERVICE_WORKER_LOG_STATE_RESPONSE) {
      finalizeServiceWorkerLogRequest(data.requestId || null);

      const state = data.state && typeof data.state === 'object' ? data.state : null;
      if (!state) {
        scheduleServiceWorkerLogPoll();
        return;
      }

      serviceWorkerBridgeState.lastSnapshotMeta = {
        cacheName: typeof state.cacheName === 'string' && state.cacheName ? state.cacheName : null,
        cacheVersion: state.cacheVersion || null,
        generatedAt: typeof state.generatedAt === 'number' && Number.isFinite(state.generatedAt)
          ? state.generatedAt
          : Date.now(),
        historyLength: typeof state.historyLength === 'number' && Number.isFinite(state.historyLength)
          ? state.historyLength
          : null,
      };

      importServiceWorkerLogEntries(state.history, serviceWorkerBridgeState.lastSnapshotMeta);
      scheduleServiceWorkerLogPoll();
    }
  }

  function requestServiceWorkerLogSnapshot(reason) {
    if (serviceWorkerBridgeState.requestInFlight) {
      return;
    }

    const serviceWorker = getNavigatorServiceWorker();
    if (!serviceWorker) {
      return;
    }

    serviceWorkerBridgeState.supported = true;

    const requestId = `sw-log-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    serviceWorkerBridgeState.requestInFlight = true;
    serviceWorkerBridgeState.lastRequestId = requestId;

    const message = {
      type: SERVICE_WORKER_LOG_STATE_REQUEST,
      limit: SERVICE_WORKER_LOG_HISTORY_LIMIT,
      reason: typeof reason === 'string' && reason ? reason : 'sync',
      requestId,
    };

    const closeMessageChannel = channel => {
      if (!channel) {
        return;
      }

      try {
        channel.port1.onmessage = null;
      } catch (clearHandlerError) {
        void clearHandlerError;
      }

      if (typeof channel.port1.onmessageerror !== 'undefined') {
        try {
          channel.port1.onmessageerror = null;
        } catch (clearErrorHandlerError) {
          void clearErrorHandlerError;
        }
      }

      try {
        channel.port1.close();
      } catch (closePort1Error) {
        void closePort1Error;
      }

      try {
        channel.port2.close();
      } catch (closePort2Error) {
        void closePort2Error;
      }
    };

    const readyPromise = serviceWorker.ready && typeof serviceWorker.ready.then === 'function'
      ? serviceWorker.ready.then(registration => (registration && registration.active) || serviceWorker.controller || null)
      : Promise.resolve(serviceWorker.controller || null);

    Promise.resolve(readyPromise)
      .then(worker => {
        const controller = serviceWorker.controller || null;
        const targetWorker = worker || controller;

        if (!targetWorker || typeof targetWorker.postMessage !== 'function') {
          finalizeServiceWorkerLogRequest(requestId);
          scheduleServiceWorkerLogPoll();
          return;
        }

        let settled = false;
        let channel = null;

        const finalize = () => {
          if (settled) {
            return;
          }
          settled = true;
          closeMessageChannel(channel);
          finalizeServiceWorkerLogRequest(requestId);
        };

        const finalizeWithPoll = () => {
          finalize();
          scheduleServiceWorkerLogPoll();
        };

        const handleResponse = event => {
          finalize();
          handleServiceWorkerLogMessage(event);
        };

        const handleChannelError = () => {
          safeWarn('cineLogging: Service worker diagnostics channel closed before a response was received', { requestId });
          finalizeWithPoll();
        };

        const postWithoutChannel = () => {
          try {
            targetWorker.postMessage(message);
          } catch (error) {
            safeWarn('cineLogging: Unable to post service worker diagnostics request', error);
            finalizeWithPoll();
            return;
          }

          if (typeof setTimeout === 'function') {
            try {
              serviceWorkerBridgeState.requestTimer = setTimeout(() => {
                if (settled) {
                  return;
                }
                finalizeWithPoll();
              }, SERVICE_WORKER_LOG_REQUEST_TIMEOUT);
            } catch (error) {
              void error;
            }
          }
        };

        const shouldUseMessageChannel = () => {
          if (typeof MessageChannel !== 'function') {
            return false;
          }

          if (!controller) {
            return false;
          }

          return targetWorker === controller;
        };

        if (!shouldUseMessageChannel()) {
          postWithoutChannel();
          return;
        }

        channel = new MessageChannel();
        channel.port1.onmessage = handleResponse;

        if (typeof channel.port1.onmessageerror !== 'undefined') {
          channel.port1.onmessageerror = handleChannelError;
        }

        if (typeof channel.port1.start === 'function') {
          try {
            channel.port1.start();
          } catch (startError) {
            void startError;
          }
        }

        try {
          targetWorker.postMessage(message, [channel.port2]);
        } catch (error) {
          closeMessageChannel(channel);
          channel = null;
          safeWarn('cineLogging: Unable to request service worker diagnostics', error);
          postWithoutChannel();
          return;
        }

        if (typeof setTimeout === 'function') {
          try {
            serviceWorkerBridgeState.requestTimer = setTimeout(() => {
              if (settled) {
                return;
              }
              handleChannelError();
            }, SERVICE_WORKER_LOG_REQUEST_TIMEOUT);
          } catch (error) {
            void error;
          }
        }
      })
      .catch(error => {
        finalizeServiceWorkerLogRequest(requestId);
        safeWarn('cineLogging: Unable to await service worker for diagnostics', error);
        scheduleServiceWorkerLogPoll();
      });
  }

  function setupServiceWorkerLogBridge() {
    if (serviceWorkerBridgeState.initialised) {
      return;
    }

    serviceWorkerBridgeState.initialised = true;

    const serviceWorker = getNavigatorServiceWorker();
    if (!serviceWorker) {
      return;
    }

    serviceWorkerBridgeState.supported = true;

    ensureServiceWorkerBroadcastChannel();

    if (typeof serviceWorker.addEventListener === 'function') {
      try {
        serviceWorker.addEventListener('message', handleServiceWorkerLogMessage);
      } catch (error) {
        safeWarn('cineLogging: Unable to attach service worker diagnostics listener', error);
      }
    } else if (typeof serviceWorker.onmessage === 'undefined') {
      try {
        serviceWorker.onmessage = handleServiceWorkerLogMessage;
      } catch (error) {
        void error;
      }
    }

    requestServiceWorkerLogSnapshot('initial-sync');
    if (!serviceWorkerBridgeState.broadcastChannel) {
      scheduleServiceWorkerLogPoll();
    }
  }

  function loadPersistedHistory() {
    if (!activeConfig.persistSession) {
      return;
    }

    const storage = getSessionStorage();
    if (!storage) {
      return;
    }

    let raw = '';
    try {
      raw = storage.getItem(HISTORY_STORAGE_KEY) || '';
    } catch (error) {
      void error;
      return;
    }

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return;
      }
      for (let index = 0; index < parsed.length; index += 1) {
        const entry = normaliseStoredEntry(parsed[index]);
        if (entry) {
          pushEntryToHistory(entry);
        }
      }
      enforceHistoryLimit({ source: 'restore' });
    } catch (error) {
      safeWarn('cineLogging: Unable to restore log history from storage', error);
    }
  }

  function initialiseConfig() {
    activeConfig = cloneDefaultConfig();

    const preset = resolveConfigPresetFromScopes();
    if (preset) {
      applyConfig(preset);
    }

    applyConfigFromStorage();
    applyConfigFromQuery();
  }

  initialiseConfig();
  loadPersistedHistory();
  setupServiceWorkerLogBridge();

  syncConsoleCaptureState();

  if (activeConfig.captureGlobalErrors) {
    attachGlobalErrorListeners();
  }

  debug(
    'cineLogging initialized',
    { config: getConfigSnapshot(), stats: getStats() },
    { namespace: 'logging', meta: { lifecycle: 'init' } },
  );

  const loggingAPI = freezeDeep({
    log: logInternal,
    debug,
    info,
    warn,
    error,
    createLogger,
    getHistory,
    getStats,
    clearHistory,
    getConfig: getConfigSnapshot,
    setConfig,
    getLevelState,
    isLevelEnabled,
    subscribe,
    subscribeConfig,
    enableConsoleCapture,
    disableConsoleCapture,
    syncConsoleCapture: syncConsoleCaptureState,
    isConsoleCaptureActive,
    constants: freezeDeep({
      LOG_LEVELS,
      DEFAULT_CONFIG,
    }),
  });

  informModuleGlobals('cineLogging', loggingAPI);

  const registrationOptions = {
    category: 'diagnostics',
    description: 'Structured logging utilities for debugging and diagnostics.',
    replace: true,
    connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineEnvironmentBridge', 'cineModuleContext'],
  };

  const registered = registerOrQueueModule(
    'cineLogging',
    loggingAPI,
    registrationOptions,
    function (error) {
      safeWarn('Unable to register cineLogging module.', error);
    },
    GLOBAL_SCOPE,
    MODULE_REGISTRY,
  );

  if (!registered) {
    queueModuleRegistration('cineLogging', loggingAPI, registrationOptions, GLOBAL_SCOPE);
  }

  if (!exposeGlobal('cineLogging', loggingAPI, {
    configurable: true,
    enumerable: false,
    writable: false,
  })) {
    safeWarn('Unable to expose cineLogging globally.');
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = loggingAPI;
  }
})();
