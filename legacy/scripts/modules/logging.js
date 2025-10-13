function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    var scopes = [];
    function pushScope(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
        var nodeUtil = require('node:util');
        if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
          return nodeUtil.structuredClone.bind(nodeUtil);
        }
      } catch (nodeUtilError) {
        void nodeUtilError;
      }
      try {
        var legacyUtil = require('util');
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
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
    return value;
  }
  var LOGGING_DEEP_CLONE = function resolveLoggingDeepClone() {
    var scope = fallbackDetectGlobalScope();
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }
    var structuredCloneImpl = loggingResolveStructuredClone(scope);
    if (!structuredCloneImpl) {
      return loggingJsonDeepClone;
    }
    return function loggingResilientDeepClone(value) {
      if (value === null || _typeof(value) !== 'object') {
        return value;
      }
      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }
      return loggingJsonDeepClone(value);
    };
  }();
  function fallbackLoadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleEnvironment) === 'object') {
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
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineEnvironmentBridge) === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }
    return null;
  }
  function fallbackResolveModuleGlobals(scope) {
    if (typeof require === 'function') {
      try {
        var required = require('./globals.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleGlobals) === 'object') {
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
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  var MODULE_ENV = fallbackLoadModuleEnvironment(LOCAL_SCOPE);
  var ENV_BRIDGE = fallbackLoadEnvironmentBridge(LOCAL_SCOPE);
  var MODULE_GLOBALS = fallbackResolveModuleGlobals(LOCAL_SCOPE);
  var GLOBAL_SCOPE = (ENV_BRIDGE && typeof ENV_BRIDGE.getGlobalScope === 'function' ? ENV_BRIDGE.getGlobalScope() : null) || (MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function' ? MODULE_ENV.getGlobalScope() : null) || LOCAL_SCOPE;
  var tryRequire = function resolveTryRequire() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        var result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }
    return fallbackTryRequire;
  }();
  var structuredCloneCandidates = function collectStructuredCloneCandidates() {
    var candidates = [];
    function addCandidate(fn, scope) {
      if (typeof fn !== 'function') {
        return;
      }
      var alreadyPresent = candidates.some(function (candidate) {
        return candidate && candidate.fn === fn;
      });
      if (!alreadyPresent) {
        candidates.push({
          fn: fn,
          scope: scope || null
        });
      }
    }
    if (MODULE_GLOBALS) {
      if (typeof MODULE_GLOBALS.structuredClone === 'function') {
        addCandidate(MODULE_GLOBALS.structuredClone, MODULE_GLOBALS);
      }
      if (typeof MODULE_GLOBALS.getStructuredClone === 'function') {
        try {
          var resolved = MODULE_GLOBALS.getStructuredClone();
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
          var _resolved = ENV_BRIDGE.getStructuredClone();
          addCandidate(_resolved, ENV_BRIDGE);
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
          var _resolved2 = MODULE_ENV.getStructuredClone();
          addCandidate(_resolved2, MODULE_ENV);
        } catch (error) {
          void error;
        }
      }
    }
    var scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      var candidate = scope.structuredClone;
      if (typeof candidate === 'function') {
        addCandidate(candidate, scope);
      }
    }
    return candidates;
  }();
  var cachedStructuredCloneCandidate = null;
  function tryStructuredCloneValue(value) {
    if (cachedStructuredCloneCandidate) {
      try {
        var candidate = cachedStructuredCloneCandidate;
        return {
          success: true,
          value: candidate.scope ? candidate.fn.call(candidate.scope, value) : candidate.fn(value)
        };
      } catch (error) {
        void error;
        cachedStructuredCloneCandidate = null;
      }
    }
    for (var index = 0; index < structuredCloneCandidates.length; index += 1) {
      var _candidate = structuredCloneCandidates[index];
      if (!_candidate || typeof _candidate.fn !== 'function') {
        continue;
      }
      try {
        var cloned = _candidate.scope ? _candidate.fn.call(_candidate.scope, value) : _candidate.fn(value);
        cachedStructuredCloneCandidate = _candidate;
        return {
          success: true,
          value: cloned
        };
      } catch (error) {
        void error;
      }
    }
    return {
      success: false,
      value: null
    };
  }
  function resolveModuleRegistry(scope) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        var resolved = MODULE_GLOBALS.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(scope || GLOBAL_SCOPE);
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
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = fallbackCollectCandidateScopes(scope || GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  var MODULE_REGISTRY = function resolveRegistry() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        var shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        var provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  }();
  var queueModuleRegistration = function resolveQueueModuleRegistration() {
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
          var bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
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
  }();
  var registerOrQueueModule = function resolveRegisterOrQueue() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError, scope, registry) {
        try {
          var _registered = MODULE_GLOBALS.registerOrQueueModule(name, api, options, onError, scope || GLOBAL_SCOPE, registry || MODULE_REGISTRY);
          return typeof _registered === 'undefined' ? false : _registered;
        } catch (error) {
          void error;
          return false;
        }
      };
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function bridgeRegisterOrQueueModule(name, api, options, onError, scope, registry) {
        try {
          var bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, scope || GLOBAL_SCOPE, registry || MODULE_REGISTRY);
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
          return MODULE_ENV.registerOrQueueModule(name, api, options, onError, scope || GLOBAL_SCOPE, registry || MODULE_REGISTRY);
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
  }();
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
    if (_typeof(value) === 'object') {
      try {
        if (value.constructor && value.constructor.name === 'process') {
          return true;
        }
      } catch (processInspectionError) {
        void processInspectionError;
      }
      if (typeof value.pid === 'number' && typeof value.nextTick === 'function' && typeof value.emit === 'function' && typeof value.binding === 'function') {
        return true;
      }
    }
    if (typeof value === 'function') {
      if (value === process.binding || value === process._linkedBinding || value === process.dlopen) {
        return true;
      }
      try {
        var functionName = value.name || '';
        if (functionName && (functionName === 'binding' || functionName === 'dlopen')) {
          var source = Function.prototype.toString.call(value);
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
    if (!value || _typeof(value) !== 'object') {
      return true;
    }
    if (isNodeProcessReference(value)) {
      return true;
    }
    if (typeof process !== 'undefined' && process && process.release && process.release.name === 'node') {
      return true;
    }
    var ctor = value.constructor;
    if (!ctor) {
      return false;
    }
    if (ctor === Number || ctor === String || ctor === Boolean || ctor === Date || ctor === RegExp || ctor === Promise || ctor === WeakMap || ctor === WeakSet || ctor === Map || ctor === Set) {
      return true;
    }
    var ctorName = typeof ctor.name === 'string' ? ctor.name : '';
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
        var tag = value[Symbol.toStringTag];
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
    var visited = seen || (typeof WeakSet === 'function' ? new WeakSet() : {
      add: function add() {},
      has: function has() {
        return false;
      }
    });
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (shouldBypassDeepFreeze(value)) {
      return value;
    }
    if (typeof visited.has === 'function' && visited.has(value)) {
      return value;
    }
    if (typeof visited.add === 'function') {
      visited.add(value);
    }
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var child = void 0;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }
      if (!child || _typeof(child) !== 'object' && typeof child !== 'function') {
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
  var freezeDeep = function resolveFreezeDeep() {
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
  }();
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
  var safeWarn = function resolveSafeWarn() {
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
  }();
  var CONSOLE_METHODS = ['debug', 'info', 'warn', 'error', 'log'];
  var CONSOLE_PROXY_FLAG = typeof Symbol === 'function' ? Symbol.for('cineLoggingConsoleProxyInstalled') : '__cineLoggingConsoleProxyInstalled__';
  var ORIGINAL_CONSOLE_FUNCTIONS = function captureOriginalConsoleFunctions() {
    var store = Object.create(null);
    if (typeof console === 'undefined' || !console) {
      return store;
    }
    for (var index = 0; index < CONSOLE_METHODS.length; index += 1) {
      var method = CONSOLE_METHODS[index];
      try {
        var fn = console[method];
        store[method] = typeof fn === 'function' ? fn : null;
      } catch (error) {
        store[method] = null;
        void error;
      }
    }
    return store;
  }();
  var consoleProxyInstalled = false;
  var consoleProxyInstallationAttempted = false;
  var consoleProxyInstallationFailed = false;
  var lastConsoleCaptureState = null;
  var consoleProxyWarningIssued = false;
  var consoleProxyGuardDepth = 0;
  var exposeGlobal = function resolveExposeGlobal() {
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
      if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object' && typeof GLOBAL_SCOPE !== 'function') {
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
  }();
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
  var LOG_LEVEL_MAP = {
    debug: {
      priority: 10,
      consoleMethod: 'debug'
    },
    info: {
      priority: 20,
      consoleMethod: 'info'
    },
    warn: {
      priority: 30,
      consoleMethod: 'warn'
    },
    error: {
      priority: 40,
      consoleMethod: 'error'
    }
  };
  var LOG_LEVELS = freezeDeep(LOG_LEVEL_MAP);
  var LEVEL_COUNTER_KEYS = Object.freeze(Object.keys(LOG_LEVEL_MAP).concat(['other']));
  function createLevelCounters() {
    var counters = Object.create(null);
    for (var index = 0; index < LEVEL_COUNTER_KEYS.length; index += 1) {
      var key = LEVEL_COUNTER_KEYS[index];
      counters[key] = 0;
    }
    return counters;
  }
  function resetLevelCounters(counters) {
    if (!counters || _typeof(counters) !== 'object') {
      return;
    }
    for (var index = 0; index < LEVEL_COUNTER_KEYS.length; index += 1) {
      var key = LEVEL_COUNTER_KEYS[index];
      counters[key] = 0;
    }
  }
  function resolveLevelKey(level) {
    if (typeof level === 'string' && level) {
      if (Object.prototype.hasOwnProperty.call(LOG_LEVEL_MAP, level)) {
        return level;
      }
      var trimmed = level.trim().toLowerCase();
      if (Object.prototype.hasOwnProperty.call(LOG_LEVEL_MAP, trimmed)) {
        return trimmed;
      }
    }
    return 'other';
  }
  function getCounterValue(counters, key) {
    if (!counters || _typeof(counters) !== 'object') {
      return 0;
    }
    var value = counters[key];
    return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
  }
  function applyLevelCounterDelta(counters, level, delta) {
    if (!counters || _typeof(counters) !== 'object') {
      return;
    }
    if (typeof delta !== 'number' || !Number.isFinite(delta) || delta === 0) {
      return;
    }
    var key = resolveLevelKey(level);
    var current = getCounterValue(counters, key);
    var next = current + delta;
    counters[key] = next > 0 ? next : 0;
  }
  function applyLevelCounterDeltaForEntries(counters, entries, delta) {
    if (!Array.isArray(entries) || !entries.length) {
      return;
    }
    if (typeof delta !== 'number' || !Number.isFinite(delta) || delta === 0) {
      return;
    }
    for (var index = 0; index < entries.length; index += 1) {
      var entry = entries[index];
      var level = entry && entry.level;
      applyLevelCounterDelta(counters, level, delta);
    }
  }
  function summariseEntriesByLevel(entries) {
    var summary = createLevelCounters();
    applyLevelCounterDeltaForEntries(summary, entries, 1);
    return summary;
  }
  function accumulateLevelSummary(target, summary) {
    if (!target || _typeof(target) !== 'object' || !summary || _typeof(summary) !== 'object') {
      return;
    }
    for (var index = 0; index < LEVEL_COUNTER_KEYS.length; index += 1) {
      var key = LEVEL_COUNTER_KEYS[index];
      var increment = getCounterValue(summary, key);
      if (increment) {
        var current = getCounterValue(target, key);
        target[key] = current + increment;
      }
    }
  }
  function cloneLevelSummary(summary) {
    var clone = createLevelCounters();
    accumulateLevelSummary(clone, summary);
    return clone;
  }
  function freezeLevelSummary(summary) {
    return freezeDeep(cloneLevelSummary(summary));
  }
  var HISTORY_MIN_LIMIT = 50;
  var HISTORY_ABSOLUTE_MIN_LIMIT = 1;
  var HISTORY_MAX_LIMIT = 5000;
  var HISTORY_STORAGE_KEY = '__cineLoggingHistory';
  var CONFIG_STORAGE_KEY = '__cineLoggingConfig';
  var ERROR_EVENT_FLAG = typeof Symbol === 'function' ? Symbol.for('cineLoggingHandled') : '__cineLoggingHandled__';
  var DEFAULT_CONFIG_VALUES = {
    level: 'warn',
    historyLevel: 'debug',
    historyLimit: 1200,
    consoleOutput: true,
    persistSession: true,
    captureGlobalErrors: true,
    captureConsole: true,
    stackTraces: true
  };
  var DEFAULT_CONFIG = freezeDeep(DEFAULT_CONFIG_VALUES);
  function cloneDefaultConfig() {
    return {
      level: DEFAULT_CONFIG_VALUES.level,
      historyLevel: DEFAULT_CONFIG_VALUES.historyLevel,
      historyLimit: DEFAULT_CONFIG_VALUES.historyLimit,
      consoleOutput: DEFAULT_CONFIG_VALUES.consoleOutput,
      persistSession: DEFAULT_CONFIG_VALUES.persistSession,
      captureGlobalErrors: DEFAULT_CONFIG_VALUES.captureGlobalErrors,
      captureConsole: DEFAULT_CONFIG_VALUES.captureConsole,
      stackTraces: DEFAULT_CONFIG_VALUES.stackTraces
    };
  }
  var activeConfig = cloneDefaultConfig();
  var logHistory = [];
  var logSubscribers = new Set();
  var configSubscribers = new Set();
  var attachedErrorTargets = typeof WeakSet === 'function' ? new WeakSet() : [];
  var runtimeEntryCount = 0;
  var emittedLevelCounters = createLevelCounters();
  var retainedLevelCounters = createLevelCounters();
  var droppedLevelCounters = createLevelCounters();
  var totalEntriesDropped = 0;
  var lastHistoryDrop = null;
  function normalizeLevel(value, fallbackLevel) {
    var fallback = typeof fallbackLevel === 'string' ? fallbackLevel : activeConfig.level;
    if (typeof value === 'string') {
      var trimmed = value.trim().toLowerCase();
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
    var normalized = normalizeLevel(level, 'info');
    var descriptor = LOG_LEVEL_MAP[normalized];
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
      var normalized = value.trim().toLowerCase();
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
    var allowReducedMinimum = options && options.allowReducedMin === true ? true : false;
    var effectiveMinimum = allowReducedMinimum ? HISTORY_ABSOLUTE_MIN_LIMIT : HISTORY_MIN_LIMIT;
    if (typeof value === 'number' && Number.isFinite(value)) {
      var absolute = Math.abs(Math.floor(value));
      if (!absolute) {
        return activeConfig.historyLimit;
      }
      return Math.max(effectiveMinimum, Math.min(HISTORY_MAX_LIMIT, absolute));
    }
    if (typeof value === 'string' && value) {
      var parsed = Number(value);
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
    if (value && _typeof(value) === 'object') {
      if (typeof value.message === 'string') {
        return value.message;
      }
      var ctorName = value.constructor && value.constructor.name;
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
    var nextDepth = typeof depth === 'number' ? depth : 0;
    var visited = seen || (typeof WeakSet === 'function' ? new WeakSet() : null);
    if (value === null || typeof value === 'undefined') {
      return null;
    }
    var valueType = _typeof(value);
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
      var name = value.name ? " ".concat(value.name) : '';
      return "[Function".concat(name, "]");
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
      var errorOutput = {
        name: value.name,
        message: value.message
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
        var collectedErrors = [];
        var maxErrors = 10;
        var truncatedErrors = 0;
        var appendErrorDetail = function appendErrorDetail(candidate) {
          if (collectedErrors.length >= maxErrors) {
            truncatedErrors += 1;
            return;
          }
          try {
            collectedErrors.push(sanitizeForLog(candidate, nextDepth + 1, visited));
          } catch (error) {
            collectedErrors.push(error && error.message ? "[Unserializable error: ".concat(error.message, "]") : '[Unserializable error]');
          }
        };
        var rawErrors = value.errors;
        if (Array.isArray(rawErrors)) {
          for (var index = 0; index < rawErrors.length; index += 1) {
            appendErrorDetail(rawErrors[index]);
          }
          if (rawErrors.length > collectedErrors.length) {
            truncatedErrors += rawErrors.length - collectedErrors.length;
          }
        } else if (rawErrors && _typeof(rawErrors) === 'object') {
          var iterator = null;
          try {
            var symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : null;
            if (symbolIterator && typeof rawErrors[symbolIterator] === 'function') {
              iterator = rawErrors[symbolIterator].call(rawErrors);
            }
          } catch (iteratorError) {
            iterator = null;
            void iteratorError;
          }
          if (iterator && typeof iterator.next === 'function') {
            var result = iterator.next();
            var count = 0;
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
          byteLength: value.byteLength
        };
      }
      if (typeof DataView !== 'undefined' && value instanceof DataView) {
        return {
          __type: 'DataView',
          byteOffset: value.byteOffset,
          byteLength: value.byteLength
        };
      }
      if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && ArrayBuffer.isView(value)) {
        var ctorName = value.constructor && value.constructor.name;
        var maxPreview = 32;
        var _length = typeof value.length === 'number' ? value.length : 0;
        var preview = [];
        var previewLength = Math.min(_length, maxPreview);
        for (var _index = 0; _index < previewLength; _index += 1) {
          preview.push(value[_index]);
        }
        var summary = {
          __type: ctorName || 'TypedArray',
          length: _length,
          byteOffset: typeof value.byteOffset === 'number' ? value.byteOffset : 0,
          byteLength: typeof value.byteLength === 'number' ? value.byteLength : 0
        };
        if (preview.length) {
          summary.preview = preview;
        }
        if (_length > maxPreview) {
          summary.__truncatedItems = _length - maxPreview;
        }
        return summary;
      }
      var mapCtor = typeof Map === 'function' ? Map : null;
      if (mapCtor && value instanceof mapCtor) {
        var entries = [];
        var maxEntries = 30;
        var _index2 = 0;
        value.forEach(function (mapValue, mapKey) {
          if (_index2 < maxEntries) {
            entries.push({
              key: sanitizeForLog(mapKey, nextDepth + 1, visited),
              value: sanitizeForLog(mapValue, nextDepth + 1, visited)
            });
          }
          _index2 += 1;
        });
        var _result = {
          __type: 'Map',
          size: typeof value.size === 'number' ? value.size : _index2,
          entries: entries
        };
        if (_index2 > maxEntries) {
          _result.__truncatedEntries = _index2 - maxEntries;
        }
        return _result;
      }
      var setCtor = typeof Set === 'function' ? Set : null;
      if (setCtor && value instanceof setCtor) {
        var items = [];
        var maxItems = 30;
        var _index3 = 0;
        value.forEach(function (item) {
          if (_index3 < maxItems) {
            items.push(sanitizeForLog(item, nextDepth + 1, visited));
          }
          _index3 += 1;
        });
        var _result2 = {
          __type: 'Set',
          size: typeof value.size === 'number' ? value.size : _index3,
          values: items
        };
        if (_index3 > maxItems) {
          _result2.__truncatedValues = _index3 - maxItems;
        }
        return _result2;
      }
      var urlParamsCtor = typeof URLSearchParams === 'function' ? URLSearchParams : null;
      if (urlParamsCtor && value instanceof urlParamsCtor) {
        var params = [];
        var _iterator = typeof value.entries === 'function' ? value.entries() : null;
        var truncated = 0;
        if (_iterator && typeof _iterator.next === 'function') {
          var maxPairs = 40;
          var _count = 0;
          var next = _iterator.next();
          while (!next.done) {
            if (_count < maxPairs) {
              var pair = next.value || [];
              params.push({
                key: sanitizeForLog(pair[0], nextDepth + 1, visited),
                value: sanitizeForLog(pair[1], nextDepth + 1, visited)
              });
            }
            _count += 1;
            next = _iterator.next();
          }
          if (_count > params.length) {
            truncated = _count - params.length;
          }
        }
        var _result3 = {
          __type: 'URLSearchParams',
          entries: params
        };
        if (truncated > 0) {
          _result3.__truncatedEntries = truncated;
        }
        return _result3;
      }
      if (typeof URL === 'function' && value instanceof URL) {
        try {
          return value.toString();
        } catch (error) {
          void error;
        }
      }
      if (nextDepth >= 4) {
        var _ctorName = value.constructor && value.constructor.name;
        return _ctorName ? "[".concat(_ctorName, "]") : Object.prototype.toString.call(value);
      }
      if (Array.isArray(value)) {
        var _maxItems = 20;
        var _result4 = [];
        var len = Math.min(value.length, _maxItems);
        for (var _index4 = 0; _index4 < len; _index4 += 1) {
          _result4.push(sanitizeForLog(value[_index4], nextDepth + 1, visited));
        }
        if (value.length > _maxItems) {
          _result4.push("\u2026 (".concat(value.length - _maxItems, " more)"));
        }
        return _result4;
      }
      var output = {};
      var keys = Object.keys(value);
      var maxKeys = 30;
      var length = Math.min(keys.length, maxKeys);
      for (var _index5 = 0; _index5 < length; _index5 += 1) {
        var key = keys[_index5];
        try {
          output[key] = sanitizeForLog(value[key], nextDepth + 1, visited);
        } catch (error) {
          output[key] = "[Threw: ".concat(error && error.message ? error.message : 'error', "]");
        }
      }
      if (keys.length > maxKeys) {
        output.__truncatedKeys = keys.length - maxKeys;
      }
      if (typeof Object.getOwnPropertySymbols === 'function') {
        var symbols = Object.getOwnPropertySymbols(value);
        var symbolLength = Math.min(symbols.length, 5);
        for (var _index6 = 0; _index6 < symbolLength; _index6 += 1) {
          var symbolKey = symbols[_index6];
          var symbolName = _typeof(symbolKey) === 'symbol' ? symbolKey.toString() : String(symbolKey);
          try {
            output[symbolName] = sanitizeForLog(value[symbolKey], nextDepth + 1, visited);
          } catch (error) {
            output[symbolName] = "[Threw: ".concat(error && error.message ? error.message : 'error', "]");
          }
        }
      }
      if (!keys.length) {
        var _ctorName2 = value.constructor && value.constructor.name;
        if (_ctorName2) {
          output.__className = _ctorName2;
        }
      }
      return output;
    }
    var structuredCloneResult = tryStructuredCloneValue(value);
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
    var trimmed = stackValue.replace(/\r\n?/g, '\n').trim();
    if (!trimmed) {
      return null;
    }
    var maxLength = 5000;
    var charTruncated = trimmed.length > maxLength;
    var limitedStack = charTruncated ? trimmed.slice(0, maxLength) : trimmed;
    var rawLines = trimmed.split('\n');
    var frameLimit = 40;
    var frames = [];
    var frameTruncated = false;
    for (var index = 0; index < rawLines.length; index += 1) {
      var line = rawLines[index].trim();
      if (!line) {
        continue;
      }
      if (frames.length < frameLimit) {
        frames.push(line.length > 500 ? "".concat(line.slice(0, 500), "\u2026") : line);
      } else {
        frameTruncated = true;
        break;
      }
    }
    return {
      stack: limitedStack,
      frames: frames,
      truncated: charTruncated || frameTruncated
    };
  }
  function normaliseOriginSnapshot(origin) {
    if (!origin || _typeof(origin) !== 'object') {
      return null;
    }
    var source = typeof origin.source === 'string' && origin.source ? origin.source : 'unknown';
    var stackSummary = null;
    if (typeof origin.stack === 'string' && origin.stack) {
      stackSummary = normaliseStackTrace(origin.stack);
    }
    var frames = [];
    if (Array.isArray(origin.frames)) {
      for (var index = 0; index < origin.frames.length && frames.length < 40; index += 1) {
        var frame = origin.frames[index];
        if (typeof frame === 'string' && frame) {
          frames.push(frame);
        } else if (frame !== null && typeof frame !== 'undefined') {
          frames.push(coerceMessage(frame));
        }
      }
    } else if (stackSummary && Array.isArray(stackSummary.frames)) {
      for (var _index7 = 0; _index7 < stackSummary.frames.length; _index7 += 1) {
        frames.push(stackSummary.frames[_index7]);
      }
    }
    var truncated = origin.truncated === true || (stackSummary ? stackSummary.truncated === true : false) || frames.length > 0 && frames.length >= 40;
    var snapshot = {
      source: source,
      truncated: truncated
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
    var scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        var storage = scope.sessionStorage;
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
    var storage = getSessionStorage();
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
    var storage = getSessionStorage();
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
      storage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({
        level: activeConfig.level,
        historyLevel: activeConfig.historyLevel,
        historyLimit: activeConfig.historyLimit,
        consoleOutput: activeConfig.consoleOutput,
        persistSession: activeConfig.persistSession,
        captureGlobalErrors: activeConfig.captureGlobalErrors,
        captureConsole: activeConfig.captureConsole,
        stackTraces: activeConfig.stackTraces
      }));
    } catch (error) {
      safeWarn('cineLogging: Unable to persist logging config', error);
    }
  }
  function persistHistorySafe() {
    if (!activeConfig.persistSession) {
      clearStoredHistory();
      return;
    }
    var storage = getSessionStorage();
    if (!storage) {
      return;
    }
    try {
      storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(logHistory));
    } catch (error) {
      safeWarn('cineLogging: Unable to persist log history', error);
    }
  }
  function getEffectiveHistoryLimit() {
    var effectiveMinimum = activeConfig.persistSession === false ? HISTORY_ABSOLUTE_MIN_LIMIT : HISTORY_MIN_LIMIT;
    return Math.max(effectiveMinimum, Math.min(HISTORY_MAX_LIMIT, Math.floor(activeConfig.historyLimit)));
  }
  function recordHistoryDrop(removedEntries, limit, options) {
    if (!Array.isArray(removedEntries) || removedEntries.length === 0) {
      return null;
    }
    totalEntriesDropped += removedEntries.length;
    var removedSummary = summariseEntriesByLevel(removedEntries);
    var source = options && typeof options.source === 'string' && options.source.trim() ? options.source.trim() : 'enforce';
    var oldestEntry = removedEntries[0] || null;
    var newestEntry = removedEntries[removedEntries.length - 1] || null;
    var dropTimestamp = Date.now();
    var dropIsoTimestamp = '';
    try {
      dropIsoTimestamp = new Date(dropTimestamp).toISOString();
    } catch (error) {
      void error;
      dropIsoTimestamp = String(dropTimestamp);
    }
    lastHistoryDrop = freezeDeep({
      count: removedEntries.length,
      limit: limit,
      source: source,
      timestamp: dropTimestamp,
      isoTimestamp: dropIsoTimestamp,
      oldestEntryId: oldestEntry && typeof oldestEntry.id === 'string' ? oldestEntry.id : null,
      oldestEntryTimestamp: oldestEntry && typeof oldestEntry.timestamp === 'number' ? oldestEntry.timestamp : null,
      oldestEntryIsoTimestamp: oldestEntry && typeof oldestEntry.isoTimestamp === 'string' ? oldestEntry.isoTimestamp : null,
      newestEntryId: newestEntry && typeof newestEntry.id === 'string' ? newestEntry.id : null,
      newestEntryTimestamp: newestEntry && typeof newestEntry.timestamp === 'number' ? newestEntry.timestamp : null,
      newestEntryIsoTimestamp: newestEntry && typeof newestEntry.isoTimestamp === 'string' ? newestEntry.isoTimestamp : null,
      levels: freezeLevelSummary(removedSummary)
    });
    safeWarn('cineLogging: history trimmed to enforce retention limit', {
      limit: limit,
      removed: removedEntries.length,
      source: source,
      levels: cloneLevelSummary(removedSummary)
    });
    return removedSummary;
  }
  function enforceHistoryLimit(options) {
    var limit = getEffectiveHistoryLimit();
    if (logHistory.length <= limit) {
      return 0;
    }
    var overflow = logHistory.length - limit;
    var removedEntries = logHistory.splice(0, overflow);
    applyLevelCounterDeltaForEntries(retainedLevelCounters, removedEntries, -1);
    var removedSummary = recordHistoryDrop(removedEntries, limit, options);
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
  function _getLevelState(level) {
    var normalizedLevel = normalizeLevel(level, 'info');
    var consoleEnabled = shouldOutputToConsole(normalizedLevel);
    var historyEnabled = shouldRecord(normalizedLevel);
    return freezeDeep({
      level: normalizedLevel,
      enabled: consoleEnabled || historyEnabled,
      console: consoleEnabled,
      history: historyEnabled,
      thresholds: freezeDeep({
        console: normalizeLevel(activeConfig.level, DEFAULT_CONFIG_VALUES.level),
        history: normalizeLevel(activeConfig.historyLevel, DEFAULT_CONFIG_VALUES.historyLevel)
      })
    });
  }
  function _isLevelEnabled(level, options) {
    var state = _getLevelState(level);
    if (!options || _typeof(options) !== 'object') {
      return state.enabled;
    }
    var checkConsole = options.console !== false;
    var checkHistory = options.history !== false;
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
    return "log-".concat(timestamp, "-").concat(Math.random().toString(36).slice(2, 10));
  }
  function pushEntryToHistory(entry) {
    if (!entry) {
      return;
    }
    logHistory.push(entry);
    applyLevelCounterDelta(retainedLevelCounters, entry.level, 1);
  }
  function appendEntry(entry) {
    pushEntryToHistory(entry);
    runtimeEntryCount += 1;
    enforceHistoryLimit({
      source: 'append'
    });
    persistHistorySafe();
    notifyLogSubscribers(entry);
  }
  function notifyLogSubscribers(entry) {
    if (!logSubscribers.size) {
      return;
    }
    var listeners = Array.from(logSubscribers);
    for (var index = 0; index < listeners.length; index += 1) {
      var listener = listeners[index];
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
    var effectiveLimit = typeof limit === 'number' && Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : logHistory.length;
    if (!effectiveLimit) {
      return Object.freeze([]);
    }
    var start = Math.max(0, logHistory.length - effectiveLimit);
    var slice = logHistory.slice(start);
    return Object.freeze(slice.slice());
  }
  function notifyConfigSubscribers(snapshot) {
    if (!configSubscribers.size) {
      return;
    }
    var listeners = Array.from(configSubscribers);
    for (var index = 0; index < listeners.length; index += 1) {
      var listener = listeners[index];
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
    var length = value.length;
    var result = new Array(length);
    for (var index = 0; index < length; index += 1) {
      result[index] = value[index];
    }
    return result;
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
      var stored = ORIGINAL_CONSOLE_FUNCTIONS[method];
      if (typeof stored === 'function') {
        return stored;
      }
    }
    if (typeof console !== 'undefined' && console) {
      var candidate = null;
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
    var fn = getStoredConsoleFunction(method);
    if (typeof fn !== 'function') {
      return undefined;
    }
    var receiver = typeof console !== 'undefined' && console ? console : GLOBAL_SCOPE && GLOBAL_SCOPE.console ? GLOBAL_SCOPE.console : null;
    var finalArgs = Array.isArray(args) ? args : arrayFromArrayLike(args);
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
    var level = getConsoleLevelForMethod(method);
    var rawArgs = Array.isArray(args) ? args : arrayFromArrayLike(args);
    var messageParts = [];
    for (var index = 0; index < rawArgs.length; index += 1) {
      var value = rawArgs[index];
      var valueType = _typeof(value);
      if (valueType === 'string') {
        messageParts.push(value);
      } else if (valueType === 'number' || valueType === 'boolean') {
        messageParts.push(String(value));
      } else if (valueType === 'symbol') {
        try {
          messageParts.push(value.toString());
        } catch (symbolError) {
          void symbolError;
        }
      }
    }
    var message = messageParts.join(' ').trim();
    if (!message) {
      message = "[console.".concat(method || level, "]");
    }
    var sanitizedArguments = null;
    var detailPayload = null;
    if (rawArgs.length) {
      try {
        sanitizedArguments = sanitizeForLog(rawArgs);
        detailPayload = {
          arguments: sanitizedArguments
        };
      } catch (detailError) {
        detailPayload = {
          arguments: rawArgs.slice()
        };
        void detailError;
      }
    }
    var errorEntries = [];
    var sanitizedArray = Array.isArray(sanitizedArguments) ? sanitizedArguments : null;
    for (var _index8 = 0; _index8 < rawArgs.length; _index8 += 1) {
      var rawValue = rawArgs[_index8];
      var sanitizedValue = sanitizedArray ? sanitizedArray[_index8] : null;
      var isErrorInstance = rawValue instanceof Error;
      var hasSanitizedErrorShape = sanitizedValue && _typeof(sanitizedValue) === 'object' && sanitizedValue !== null ? Boolean(typeof sanitizedValue.stack === 'string' || typeof sanitizedValue.message === 'string' || typeof sanitizedValue.name === 'string') : false;
      if (!isErrorInstance && !hasSanitizedErrorShape) {
        continue;
      }
      var snapshot = hasSanitizedErrorShape ? sanitizedValue : null;
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
          message: rawValue.message || coerceMessage(rawValue) || null
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
      var valueClone = snapshot;
      if (valueClone && _typeof(valueClone) === 'object') {
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
      var entry = {
        index: _index8
      };
      if (valueClone && _typeof(valueClone) === 'object') {
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
        var coercedMessage = coerceMessage(valueClone);
        if (coercedMessage) {
          entry.message = coercedMessage;
        }
      } else {
        entry.value = null;
      }
      var rawType = rawValue === null ? 'null' : _typeof(rawValue);
      if (rawType === 'object' || rawType === 'function') {
        var ctorName = rawValue && rawValue.constructor && rawValue.constructor.name;
        entry.argumentType = typeof ctorName === 'string' && ctorName ? ctorName : rawType;
      } else {
        entry.argumentType = rawType;
      }
      var stackSummary = isErrorInstance && typeof rawValue.stack === 'string' && rawValue.stack ? normaliseStackTrace(rawValue.stack) : valueClone && _typeof(valueClone) === 'object' && typeof valueClone.stack === 'string' ? normaliseStackTrace(valueClone.stack) : null;
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
      errorEntries.push(entry);
    }
    var contextMeta = {
      channel: 'console',
      method: method || 'log'
    };
    if (meta && _typeof(meta) === 'object') {
      var metaKeys = Object.keys(meta);
      for (var _index9 = 0; _index9 < metaKeys.length; _index9 += 1) {
        var key = metaKeys[_index9];
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
      var errorIndices = [];
      for (var _index0 = 0; _index0 < errorEntries.length; _index0 += 1) {
        var errorEntry = errorEntries[_index0];
        errorIndices.push(errorEntry.index);
      }
      detailPayload.errors = errorEntries;
      detailPayload.errorCount = errorEntries.length;
      detailPayload.errorIndices = errorIndices;
      detailPayload.primaryError = errorEntries[0];
      contextMeta.errorCount = errorEntries.length;
      contextMeta.errorIndices = errorIndices;
      var primaryError = errorEntries[0];
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
    var forceStackCapture = method === 'error' || errorEntries.length > 0;
    var contextOptions = {
      namespace: 'console',
      meta: contextMeta
    };
    if (forceStackCapture) {
      contextOptions.captureStack = true;
    }
    return logInternal(level, message, detailPayload, contextOptions, {
      silentConsole: true
    });
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
    var installedAny = false;
    var _loop = function _loop() {
      var method = CONSOLE_METHODS[index];
      var base = getStoredConsoleFunction(method);
      if (typeof base !== 'function') {
        try {
          var candidate = console[method];
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
        return 1;
      }
      var proxy = function consoleProxy() {
        var argsArray = arrayFromArrayLike(arguments);
        consoleProxyGuardDepth += 1;
        try {
          if (consoleProxyGuardDepth === 1) {
            var firstArg = argsArray.length ? argsArray[0] : null;
            var skipCapture = typeof firstArg === 'string' && firstArg.indexOf('cineLogging:') === 0;
            if (!skipCapture) {
              try {
                recordConsoleMessage(method, argsArray, {
                  captured: true
                });
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
          value: true
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
    };
    for (var index = 0; index < CONSOLE_METHODS.length; index += 1) {
      if (_loop()) continue;
    }
    if (installedAny) {
      consoleProxyInstalled = true;
      consoleProxyInstallationFailed = false;
      try {
        Object.defineProperty(console, CONSOLE_PROXY_FLAG, {
          configurable: true,
          enumerable: false,
          writable: false,
          value: true
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
    var restoredAny = false;
    for (var index = 0; index < CONSOLE_METHODS.length; index += 1) {
      var method = CONSOLE_METHODS[index];
      var original = ORIGINAL_CONSOLE_FUNCTIONS[method];
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
            value: false
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
        logInternal('info', 'Console output capture disabled', buildConsoleCaptureDetail({
          status: 'disabled'
        }), {
          namespace: 'logging',
          meta: {
            channel: 'console',
            lifecycle: 'sync'
          }
        }, {
          silentConsole: true
        });
        lastConsoleCaptureState = 'disabled';
      }
      consoleProxyWarningIssued = false;
      consoleProxyInstallationFailed = false;
      return true;
    }
    var installed = installConsoleProxies();
    if (!installed) {
      if (!consoleProxyWarningIssued) {
        var reason = typeof console === 'undefined' || !console ? 'console-unavailable' : 'installation-failed';
        logInternal('warn', 'Console output capture failed', buildConsoleCaptureDetail({
          status: 'failed',
          reason: reason
        }), {
          namespace: 'logging',
          meta: {
            channel: 'console',
            lifecycle: 'sync'
          }
        }, {
          silentConsole: true
        });
        safeWarn('cineLogging: Unable to capture console output for diagnostics.');
        consoleProxyWarningIssued = true;
      }
      lastConsoleCaptureState = 'failed';
      return false;
    }
    consoleProxyWarningIssued = false;
    if (lastConsoleCaptureState !== 'enabled') {
      logInternal('info', 'Console output capture enabled', buildConsoleCaptureDetail({
        status: 'enabled'
      }), {
        namespace: 'logging',
        meta: {
          channel: 'console',
          lifecycle: 'sync'
        }
      }, {
        silentConsole: true
      });
      lastConsoleCaptureState = 'enabled';
    }
    return true;
  }
  function isConsoleCaptureActive() {
    return Boolean(activeConfig.captureConsole) && consoleProxyInstalled === true;
  }
  function buildConsoleCaptureDetail(overrides) {
    var detail = {
      configured: activeConfig.captureConsole === true,
      installed: consoleProxyInstalled === true,
      attempted: consoleProxyInstallationAttempted === true,
      failed: consoleProxyInstallationFailed === true
    };
    if (typeof console === 'undefined' || !console) {
      detail.consoleAvailable = false;
    }
    if (overrides && _typeof(overrides) === 'object') {
      var overrideKeys = Object.keys(overrides);
      for (var index = 0; index < overrideKeys.length; index += 1) {
        var key = overrideKeys[index];
        detail[key] = overrides[key];
      }
    }
    return detail;
  }
  function enableConsoleCapture(options) {
    var setOptions = options && _typeof(options) === 'object' ? options : null;
    setConfig({
      captureConsole: true
    }, setOptions || undefined);
    return isConsoleCaptureActive();
  }
  function disableConsoleCapture(options) {
    var setOptions = options && _typeof(options) === 'object' ? options : null;
    setConfig({
      captureConsole: false
    }, setOptions || undefined);
    return isConsoleCaptureActive();
  }
  function shouldCaptureOrigin(level, detail, context) {
    var override = context && Object.prototype.hasOwnProperty.call(context, 'captureStack') ? context.captureStack : null;
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
    var stackSource = 'generated';
    var stackValue = '';
    if (detail instanceof Error) {
      var detailStack = detail.stack;
      if (typeof detailStack === 'string' && detailStack) {
        stackSource = 'detail';
        stackValue = detailStack;
      }
    }
    if (!stackValue) {
      try {
        var stackMessage = typeof message === 'string' && message ? message : "Log ".concat(level);
        var captureError = new Error(stackMessage);
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
    var summary = normaliseStackTrace(stackValue);
    if (!summary) {
      return null;
    }
    var origin = {
      source: stackSource,
      stack: summary.stack,
      truncated: summary.truncated
    };
    if (Array.isArray(summary.frames) && summary.frames.length) {
      origin.frames = summary.frames;
    }
    return freezeDeep(origin);
  }
  function logInternal(level, message, detail, context, options) {
    var normalizedLevel = normalizeLevel(level, 'info');
    var timestamp = Date.now();
    var isoTimestamp = '';
    try {
      isoTimestamp = new Date(timestamp).toISOString();
    } catch (error) {
      void error;
      isoTimestamp = String(timestamp);
    }
    var captureContext = context && _typeof(context) === 'object' ? context : null;
    var origin = captureLogOrigin(normalizedLevel, message, detail, captureContext);
    var namespace = captureContext && typeof captureContext.namespace === 'string' && captureContext.namespace ? context.namespace : null;
    var meta = captureContext && typeof captureContext.meta !== 'undefined' ? sanitizeForLog(captureContext.meta) : null;
    var sanitizedDetail = typeof detail === 'undefined' ? null : sanitizeForLog(detail);
    var entry = freezeDeep({
      id: createEntryId(timestamp),
      level: normalizedLevel,
      message: coerceMessage(message),
      namespace: namespace,
      detail: sanitizedDetail,
      meta: meta,
      timestamp: timestamp,
      isoTimestamp: isoTimestamp,
      origin: origin
    });
    applyLevelCounterDelta(emittedLevelCounters, normalizedLevel, 1);
    if (shouldRecord(normalizedLevel)) {
      appendEntry(entry);
    }
    var internalOptions = options && _typeof(options) === 'object' ? options : null;
    if (shouldOutputToConsole(normalizedLevel) && (!internalOptions || internalOptions.silentConsole !== true)) {
      var descriptor = LOG_LEVEL_MAP[normalizedLevel] || LOG_LEVEL_MAP.info;
      var methodName = descriptor.consoleMethod;
      var prefixParts = ['[cine]'];
      if (namespace) {
        prefixParts.push("[".concat(namespace, "]"));
      }
      prefixParts.push(entry.isoTimestamp);
      var prefix = prefixParts.join(' ');
      var consoleArgs = ["".concat(prefix, " ").concat(entry.message)];
      if (detail !== undefined) {
        consoleArgs.push(detail);
      } else if (entry.detail !== null) {
        consoleArgs.push(entry.detail);
      }
      if (entry.meta !== null) {
        consoleArgs.push({
          meta: entry.meta
        });
      }
      if (origin) {
        consoleArgs.push({
          origin: origin
        });
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
      stackTraces: activeConfig.stackTraces
    });
  }
  function getHistory(options) {
    var limit = options && typeof options.limit !== 'undefined' ? options.limit : undefined;
    return getHistorySnapshot(limit);
  }
  function cloneLastDropSnapshot() {
    if (!lastHistoryDrop) {
      return null;
    }
    return freezeDeep({
      count: typeof lastHistoryDrop.count === 'number' ? lastHistoryDrop.count : 0,
      limit: typeof lastHistoryDrop.limit === 'number' ? lastHistoryDrop.limit : getEffectiveHistoryLimit(),
      source: typeof lastHistoryDrop.source === 'string' ? lastHistoryDrop.source : 'enforce',
      timestamp: typeof lastHistoryDrop.timestamp === 'number' ? lastHistoryDrop.timestamp : null,
      isoTimestamp: typeof lastHistoryDrop.isoTimestamp === 'string' ? lastHistoryDrop.isoTimestamp : null,
      oldestEntryId: typeof lastHistoryDrop.oldestEntryId === 'string' ? lastHistoryDrop.oldestEntryId : null,
      oldestEntryTimestamp: typeof lastHistoryDrop.oldestEntryTimestamp === 'number' ? lastHistoryDrop.oldestEntryTimestamp : null,
      oldestEntryIsoTimestamp: typeof lastHistoryDrop.oldestEntryIsoTimestamp === 'string' ? lastHistoryDrop.oldestEntryIsoTimestamp : null,
      newestEntryId: typeof lastHistoryDrop.newestEntryId === 'string' ? lastHistoryDrop.newestEntryId : null,
      newestEntryTimestamp: typeof lastHistoryDrop.newestEntryTimestamp === 'number' ? lastHistoryDrop.newestEntryTimestamp : null,
      newestEntryIsoTimestamp: typeof lastHistoryDrop.newestEntryIsoTimestamp === 'string' ? lastHistoryDrop.newestEntryIsoTimestamp : null,
      levels: lastHistoryDrop.levels ? freezeLevelSummary(lastHistoryDrop.levels) : freezeLevelSummary(createLevelCounters())
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
        dropped: freezeLevelSummary(droppedLevelCounters)
      }),
      consoleCapture: freezeDeep({
        configured: activeConfig.captureConsole === true,
        installed: consoleProxyInstalled,
        attempted: consoleProxyInstallationAttempted,
        failed: consoleProxyInstallationFailed
      })
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
    if (_typeof(baseMeta) !== 'object' || _typeof(meta) !== 'object') {
      return sanitizeForLog(meta);
    }
    var merged = {};
    var baseKeys = Object.keys(baseMeta);
    for (var index = 0; index < baseKeys.length; index += 1) {
      var key = baseKeys[index];
      merged[key] = baseMeta[key];
    }
    var metaKeys = Object.keys(meta);
    for (var _index1 = 0; _index1 < metaKeys.length; _index1 += 1) {
      var _key = metaKeys[_index1];
      merged[_key] = sanitizeForLog(meta[_key]);
    }
    return merged;
  }
  function createLogger(namespace, options) {
    var normalizedNamespace = typeof namespace === 'string' && namespace.trim() ? namespace.trim() : 'app';
    var baseMeta = options && typeof options.meta !== 'undefined' ? sanitizeForLog(options.meta) : null;
    function logWithNamespace(level, message, detail, meta) {
      var mergedMeta = mergeMeta(baseMeta, meta);
      return logInternal(level, message, detail, {
        namespace: normalizedNamespace,
        meta: mergedMeta
      });
    }
    return freezeDeep({
      namespace: normalizedNamespace,
      log: function log(level, message, detail, meta) {
        return logWithNamespace(level, message, detail, meta);
      },
      debug: function debug(message, detail, meta) {
        return logWithNamespace('debug', message, detail, meta);
      },
      info: function info(message, detail, meta) {
        return logWithNamespace('info', message, detail, meta);
      },
      warn: function warn(message, detail, meta) {
        return logWithNamespace('warn', message, detail, meta);
      },
      error: function error(message, detail, meta) {
        return logWithNamespace('error', message, detail, meta);
      },
      getConfig: getConfigSnapshot,
      isLevelEnabled: function isLevelEnabled(level, optionOverrides) {
        return _isLevelEnabled(level, optionOverrides);
      },
      getLevelState: function getLevelState(level) {
        return _getLevelState(level);
      }
    });
  }
  function markEventHandled(event) {
    if (!event || _typeof(event) !== 'object' && typeof event !== 'function') {
      return false;
    }
    var flag = ERROR_EVENT_FLAG;
    try {
      if (_typeof(flag) === 'symbol') {
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
        value: true
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
    var detail = {
      message: event && typeof event.message === 'string' ? event.message : '',
      filename: event ? event.filename || event.fileName || null : null,
      lineno: event ? event.lineno || event.lineNumber || null : null,
      colno: event ? event.colno || event.columnNumber || null : null,
      error: event && event.error ? sanitizeForLog(event.error) : null
    };
    if (event && typeof event.preventDefault === 'function' && event.defaultPrevented) {
      detail.defaultPrevented = true;
    }
    logInternal('error', 'Global error captured', detail, {
      namespace: 'global'
    });
  }
  function handleUnhandledRejection(event) {
    if (!activeConfig.captureGlobalErrors) {
      return;
    }
    if (markEventHandled(event)) {
      return;
    }
    var detail = {
      reason: event ? sanitizeForLog(event.reason) : null
    };
    if (event && event.promise) {
      detail.promiseState = '[Promise]';
    }
    if (event && typeof event.preventDefault === 'function' && event.defaultPrevented) {
      detail.defaultPrevented = true;
    }
    logInternal('error', 'Unhandled promise rejection captured', detail, {
      namespace: 'global'
    });
  }
  function markTargetAttached(target) {
    if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
      return false;
    }
    if (attachedErrorTargets instanceof WeakSet) {
      if (attachedErrorTargets.has(target)) {
        return true;
      }
      attachedErrorTargets.add(target);
      return false;
    }
    var list = attachedErrorTargets;
    var index = list.indexOf(target);
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
    var scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
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
    if (!overrides || _typeof(overrides) !== 'object') {
      return {
        changed: false,
        captureChanged: false,
        limitChanged: false
      };
    }
    var changed = false;
    var captureChanged = false;
    var limitChanged = false;
    var consoleCaptureChanged = false;
    var nextPersistSession = Object.prototype.hasOwnProperty.call(overrides, 'persistSession') ? booleanFromValue(overrides.persistSession, activeConfig.persistSession) : activeConfig.persistSession;
    if (Object.prototype.hasOwnProperty.call(overrides, 'level')) {
      var nextLevel = normalizeLevel(overrides.level, activeConfig.level);
      if (nextLevel !== activeConfig.level) {
        activeConfig.level = nextLevel;
        changed = true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(overrides, 'historyLevel')) {
      var nextHistoryLevel = normalizeLevel(overrides.historyLevel, activeConfig.historyLevel);
      if (nextHistoryLevel !== activeConfig.historyLevel) {
        activeConfig.historyLevel = nextHistoryLevel;
        changed = true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(overrides, 'historyLimit')) {
      var nextLimit = clampHistoryLimit(overrides.historyLimit, {
        allowReducedMin: nextPersistSession === false
      });
      if (nextLimit !== activeConfig.historyLimit) {
        activeConfig.historyLimit = nextLimit;
        changed = true;
        limitChanged = true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(overrides, 'consoleOutput')) {
      var nextConsole = booleanFromValue(overrides.consoleOutput, activeConfig.consoleOutput);
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
      var nextCapture = booleanFromValue(overrides.captureGlobalErrors, activeConfig.captureGlobalErrors);
      if (nextCapture !== activeConfig.captureGlobalErrors) {
        activeConfig.captureGlobalErrors = nextCapture;
        changed = true;
        captureChanged = true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(overrides, 'captureConsole')) {
      var nextConsoleCapture = booleanFromValue(overrides.captureConsole, activeConfig.captureConsole);
      if (nextConsoleCapture !== activeConfig.captureConsole) {
        activeConfig.captureConsole = nextConsoleCapture;
        changed = true;
        consoleCaptureChanged = true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(overrides, 'stackTraces')) {
      var nextStackTraces = booleanFromValue(overrides.stackTraces, activeConfig.stackTraces);
      if (nextStackTraces !== activeConfig.stackTraces) {
        activeConfig.stackTraces = nextStackTraces;
        changed = true;
      }
    }
    return {
      changed: changed,
      captureChanged: captureChanged,
      limitChanged: limitChanged,
      consoleCaptureChanged: consoleCaptureChanged
    };
  }
  function setConfig(overrides, options) {
    var previousCapture = activeConfig.captureGlobalErrors;
    var previousConsoleCapture = activeConfig.captureConsole;
    var result = applyConfig(overrides);
    if (result.limitChanged) {
      enforceHistoryLimit({
        source: 'config'
      });
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
    var scopes = fallbackCollectCandidateScopes(GLOBAL_SCOPE);
    var keys = ['__cineLoggingConfig', '__CINE_LOGGING_CONFIG', 'cineLoggingConfig'];
    for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      var scope = scopes[scopeIndex];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      for (var keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
        var key = keys[keyIndex];
        var value = void 0;
        try {
          value = scope[key];
        } catch (error) {
          void error;
          value = null;
        }
        if (value && _typeof(value) === 'object') {
          return value;
        }
      }
    }
    return null;
  }
  function applyConfigFromStorage() {
    var storage = getSessionStorage();
    if (!storage) {
      return;
    }
    var raw = '';
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
      var parsed = JSON.parse(raw);
      applyConfig(parsed);
    } catch (error) {
      safeWarn('cineLogging: Unable to restore logging config from storage', error);
    }
  }
  function applyConfigFromQuery() {
    if (!GLOBAL_SCOPE || !GLOBAL_SCOPE.location) {
      return;
    }
    var search = '';
    try {
      search = GLOBAL_SCOPE.location.search || '';
    } catch (error) {
      void error;
      return;
    }
    if (typeof search !== 'string' || !search) {
      return;
    }
    var params = null;
    if (typeof URLSearchParams === 'function') {
      try {
        params = new URLSearchParams(search);
      } catch (error) {
        void error;
      }
    }
    var updates = {};
    var hasUpdates = false;
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
      var query = search.charAt(0) === '?' ? search.slice(1) : search;
      var parts = query.split('&');
      for (var index = 0; index < parts.length; index += 1) {
        var part = parts[index];
        if (!part) {
          continue;
        }
        var eqIndex = part.indexOf('=');
        var key = eqIndex === -1 ? decodeURIComponent(part) : decodeURIComponent(part.slice(0, eqIndex));
        var value = eqIndex === -1 ? '' : decodeURIComponent(part.slice(eqIndex + 1));
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
    if (!entry || _typeof(entry) !== 'object') {
      return null;
    }
    var normalizedLevel = normalizeLevel(entry.level, 'info');
    var timestamp = typeof entry.timestamp === 'number' && Number.isFinite(entry.timestamp) ? entry.timestamp : Date.now();
    var isoTimestamp = '';
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
    var normalizedMessage = typeof entry.message === 'string' ? entry.message : coerceMessage(entry.message);
    var normalizedNamespace = typeof entry.namespace === 'string' && entry.namespace ? entry.namespace : null;
    var normalizedId = typeof entry.id === 'string' && entry.id ? entry.id : createEntryId(timestamp);
    return freezeDeep({
      id: normalizedId,
      level: normalizedLevel,
      message: normalizedMessage,
      namespace: normalizedNamespace,
      detail: typeof entry.detail === 'undefined' ? null : sanitizeForLog(entry.detail),
      meta: typeof entry.meta === 'undefined' ? null : sanitizeForLog(entry.meta),
      timestamp: timestamp,
      isoTimestamp: isoTimestamp,
      origin: typeof entry.origin === 'undefined' ? null : normaliseOriginSnapshot(entry.origin)
    });
  }
  function loadPersistedHistory() {
    if (!activeConfig.persistSession) {
      return;
    }
    var storage = getSessionStorage();
    if (!storage) {
      return;
    }
    var raw = '';
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
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return;
      }
      for (var index = 0; index < parsed.length; index += 1) {
        var entry = normaliseStoredEntry(parsed[index]);
        if (entry) {
          pushEntryToHistory(entry);
        }
      }
      enforceHistoryLimit({
        source: 'restore'
      });
    } catch (error) {
      safeWarn('cineLogging: Unable to restore log history from storage', error);
    }
  }
  function initialiseConfig() {
    activeConfig = cloneDefaultConfig();
    var preset = resolveConfigPresetFromScopes();
    if (preset) {
      applyConfig(preset);
    }
    applyConfigFromStorage();
    applyConfigFromQuery();
  }
  initialiseConfig();
  loadPersistedHistory();
  syncConsoleCaptureState();
  if (activeConfig.captureGlobalErrors) {
    attachGlobalErrorListeners();
  }
  debug('cineLogging initialized', {
    config: getConfigSnapshot(),
    stats: getStats()
  }, {
    namespace: 'logging',
    meta: {
      lifecycle: 'init'
    }
  });
  var loggingAPI = freezeDeep({
    log: logInternal,
    debug: debug,
    info: info,
    warn: warn,
    error: error,
    createLogger: createLogger,
    getHistory: getHistory,
    getStats: getStats,
    clearHistory: clearHistory,
    getConfig: getConfigSnapshot,
    setConfig: setConfig,
    getLevelState: _getLevelState,
    isLevelEnabled: _isLevelEnabled,
    subscribe: subscribe,
    subscribeConfig: subscribeConfig,
    enableConsoleCapture: enableConsoleCapture,
    disableConsoleCapture: disableConsoleCapture,
    syncConsoleCapture: syncConsoleCaptureState,
    isConsoleCaptureActive: isConsoleCaptureActive,
    constants: freezeDeep({
      LOG_LEVELS: LOG_LEVELS,
      DEFAULT_CONFIG: DEFAULT_CONFIG
    })
  });
  informModuleGlobals('cineLogging', loggingAPI);
  var registrationOptions = {
    category: 'diagnostics',
    description: 'Structured logging utilities for debugging and diagnostics.',
    replace: true,
    connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineEnvironmentBridge', 'cineModuleContext']
  };
  var registered = registerOrQueueModule('cineLogging', loggingAPI, registrationOptions, function (error) {
    safeWarn('Unable to register cineLogging module.', error);
  }, GLOBAL_SCOPE, MODULE_REGISTRY);
  if (!registered) {
    queueModuleRegistration('cineLogging', loggingAPI, registrationOptions, GLOBAL_SCOPE);
  }
  if (!exposeGlobal('cineLogging', loggingAPI, {
    configurable: true,
    enumerable: false,
    writable: false
  })) {
    safeWarn('Unable to expose cineLogging globally.');
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = loggingAPI;
  }
})();