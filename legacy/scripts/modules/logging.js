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
  var LOGGING_DEEP_CLONE = function resolveLoggingDeepClone() {
    var scope = fallbackDetectGlobalScope();
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }
    return function loggingFallbackDeepClone(value) {
      if (value === null || _typeof(value) !== 'object') {
        return value;
      }
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (cloneError) {
        void cloneError;
      }
      return value;
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
  function shouldBypassDeepFreeze(value) {
    if (!value || _typeof(value) !== 'object') {
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
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      fallbackFreezeDeep(descriptor.value, visited);
    }
    try {
      return Object.freeze(value);
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
  var HISTORY_MIN_LIMIT = 2;
  var HISTORY_MAX_LIMIT = 2000;
  var HISTORY_STORAGE_KEY = '__cineLoggingHistory';
  var CONFIG_STORAGE_KEY = '__cineLoggingConfig';
  var ERROR_EVENT_FLAG = typeof Symbol === 'function' ? Symbol.for('cineLoggingHandled') : '__cineLoggingHandled__';
  var DEFAULT_CONFIG_VALUES = {
    level: 'warn',
    historyLevel: 'debug',
    historyLimit: 400,
    consoleOutput: true,
    persistSession: true,
    captureGlobalErrors: true
  };
  var DEFAULT_CONFIG = freezeDeep(DEFAULT_CONFIG_VALUES);
  function cloneDefaultConfig() {
    return {
      level: DEFAULT_CONFIG_VALUES.level,
      historyLevel: DEFAULT_CONFIG_VALUES.historyLevel,
      historyLimit: DEFAULT_CONFIG_VALUES.historyLimit,
      consoleOutput: DEFAULT_CONFIG_VALUES.consoleOutput,
      persistSession: DEFAULT_CONFIG_VALUES.persistSession,
      captureGlobalErrors: DEFAULT_CONFIG_VALUES.captureGlobalErrors
    };
  }
  var activeConfig = cloneDefaultConfig();
  var logHistory = [];
  var logSubscribers = new Set();
  var configSubscribers = new Set();
  var attachedErrorTargets = typeof WeakSet === 'function' ? new WeakSet() : [];
  var runtimeEntryCount = 0;
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
  function clampHistoryLimit(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      var absolute = Math.abs(Math.floor(value));
      if (!absolute) {
        return activeConfig.historyLimit;
      }
      return Math.max(HISTORY_MIN_LIMIT, Math.min(HISTORY_MAX_LIMIT, absolute));
    }
    if (typeof value === 'string' && value) {
      var parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return clampHistoryLimit(parsed);
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
        for (var index = 0; index < previewLength; index += 1) {
          preview.push(value[index]);
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
        var _index = 0;
        value.forEach(function (mapValue, mapKey) {
          if (_index < maxEntries) {
            entries.push({
              key: sanitizeForLog(mapKey, nextDepth + 1, visited),
              value: sanitizeForLog(mapValue, nextDepth + 1, visited)
            });
          }
          _index += 1;
        });
        var result = {
          __type: 'Map',
          size: typeof value.size === 'number' ? value.size : _index,
          entries: entries
        };
        if (_index > maxEntries) {
          result.__truncatedEntries = _index - maxEntries;
        }
        return result;
      }
      var setCtor = typeof Set === 'function' ? Set : null;
      if (setCtor && value instanceof setCtor) {
        var items = [];
        var maxItems = 30;
        var _index2 = 0;
        value.forEach(function (item) {
          if (_index2 < maxItems) {
            items.push(sanitizeForLog(item, nextDepth + 1, visited));
          }
          _index2 += 1;
        });
        var _result = {
          __type: 'Set',
          size: typeof value.size === 'number' ? value.size : _index2,
          values: items
        };
        if (_index2 > maxItems) {
          _result.__truncatedValues = _index2 - maxItems;
        }
        return _result;
      }
      var urlParamsCtor = typeof URLSearchParams === 'function' ? URLSearchParams : null;
      if (urlParamsCtor && value instanceof urlParamsCtor) {
        var params = [];
        var iterator = typeof value.entries === 'function' ? value.entries() : null;
        var truncated = 0;
        if (iterator && typeof iterator.next === 'function') {
          var maxPairs = 40;
          var count = 0;
          var next = iterator.next();
          while (!next.done) {
            if (count < maxPairs) {
              var pair = next.value || [];
              params.push({
                key: sanitizeForLog(pair[0], nextDepth + 1, visited),
                value: sanitizeForLog(pair[1], nextDepth + 1, visited)
              });
            }
            count += 1;
            next = iterator.next();
          }
          if (count > params.length) {
            truncated = count - params.length;
          }
        }
        var _result2 = {
          __type: 'URLSearchParams',
          entries: params
        };
        if (truncated > 0) {
          _result2.__truncatedEntries = truncated;
        }
        return _result2;
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
        var _result3 = [];
        var len = Math.min(value.length, _maxItems);
        for (var _index3 = 0; _index3 < len; _index3 += 1) {
          _result3.push(sanitizeForLog(value[_index3], nextDepth + 1, visited));
        }
        if (value.length > _maxItems) {
          _result3.push("\u2026 (".concat(value.length - _maxItems, " more)"));
        }
        return _result3;
      }
      var output = {};
      var keys = Object.keys(value);
      var maxKeys = 30;
      var length = Math.min(keys.length, maxKeys);
      for (var _index4 = 0; _index4 < length; _index4 += 1) {
        var key = keys[_index4];
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
        for (var _index5 = 0; _index5 < symbolLength; _index5 += 1) {
          var symbolKey = symbols[_index5];
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
  function safeIsoStringFromTimestamp(timestamp) {
    if (typeof timestamp !== 'number' || !Number.isFinite(timestamp)) {
      return '';
    }
    try {
      return new Date(timestamp).toISOString();
    } catch (error) {
      void error;
    }
    return String(timestamp);
  }
  function getHighResolutionTimestamp() {
    if (typeof performance === 'undefined' || !performance || typeof performance.now !== 'function') {
      return null;
    }
    try {
      return performance.now();
    } catch (error) {
      void error;
    }
    return null;
  }
  var TIMER_STATUS = freezeDeep({
    running: 'running',
    progress: 'progress',
    success: 'success',
    failure: 'failure',
    aborted: 'aborted',
    warning: 'warning',
    skipped: 'skipped'
  });
  var TIMER_STATUS_ALIASES = freezeDeep({
    cancelled: 'aborted',
    canceled: 'aborted',
    cancel: 'aborted'
  });
  function normalizeTimerStatus(value, fallbackStatus) {
    var fallback = typeof fallbackStatus === 'string' && fallbackStatus ? fallbackStatus : TIMER_STATUS.running;
    if (typeof value !== 'string') {
      return fallback;
    }
    var trimmed = value.trim();
    if (!trimmed) {
      return fallback;
    }
    var lowered = trimmed.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(TIMER_STATUS, lowered)) {
      return lowered;
    }
    if (Object.prototype.hasOwnProperty.call(TIMER_STATUS_ALIASES, lowered)) {
      return TIMER_STATUS_ALIASES[lowered];
    }
    return fallback;
  }
  function normalizeTimerPhase(value, fallbackPhase) {
    if (typeof value === 'string') {
      var trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }
    return typeof fallbackPhase === 'string' && fallbackPhase ? fallbackPhase : 'progress';
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
        captureGlobalErrors: activeConfig.captureGlobalErrors
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
    return Math.max(HISTORY_MIN_LIMIT, Math.min(HISTORY_MAX_LIMIT, Math.floor(activeConfig.historyLimit)));
  }
  function recordHistoryDrop(removedEntries, limit, options) {
    if (!Array.isArray(removedEntries) || removedEntries.length === 0) {
      return;
    }
    totalEntriesDropped += removedEntries.length;
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
      newestEntryIsoTimestamp: newestEntry && typeof newestEntry.isoTimestamp === 'string' ? newestEntry.isoTimestamp : null
    });
    safeWarn('cineLogging: history trimmed to enforce retention limit', {
      limit: limit,
      removed: removedEntries.length,
      source: source
    });
  }
  function enforceHistoryLimit(options) {
    var limit = getEffectiveHistoryLimit();
    if (logHistory.length <= limit) {
      return 0;
    }
    var overflow = logHistory.length - limit;
    var removedEntries = logHistory.splice(0, overflow);
    recordHistoryDrop(removedEntries, limit, options);
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
  function createEntryId(timestamp) {
    return "log-".concat(timestamp, "-").concat(Math.random().toString(36).slice(2, 10));
  }
  function createTimerId(timestamp) {
    return "timer-".concat(timestamp, "-").concat(Math.random().toString(36).slice(2, 10));
  }
  function appendEntry(entry) {
    logHistory.push(entry);
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
  function logInternal(level, message, detail, context) {
    var normalizedLevel = normalizeLevel(level, 'info');
    var timestamp = Date.now();
    var isoTimestamp = '';
    try {
      isoTimestamp = new Date(timestamp).toISOString();
    } catch (error) {
      void error;
      isoTimestamp = String(timestamp);
    }
    var namespace = context && typeof context.namespace === 'string' && context.namespace ? context.namespace : null;
    var meta = context && typeof context.meta !== 'undefined' ? sanitizeForLog(context.meta) : null;
    var sanitizedDetail = typeof detail === 'undefined' ? null : sanitizeForLog(detail);
    var entry = freezeDeep({
      id: createEntryId(timestamp),
      level: normalizedLevel,
      message: coerceMessage(message),
      namespace: namespace,
      detail: sanitizedDetail,
      meta: meta,
      timestamp: timestamp,
      isoTimestamp: isoTimestamp
    });
    if (shouldRecord(normalizedLevel)) {
      appendEntry(entry);
    }
    if (shouldOutputToConsole(normalizedLevel)) {
      var descriptor = LOG_LEVEL_MAP[normalizedLevel] || LOG_LEVEL_MAP.info;
      var methodName = descriptor.consoleMethod;
      var consoleMethod = typeof console !== 'undefined' && console && typeof console[methodName] === 'function' ? console[methodName] : typeof console !== 'undefined' && console && typeof console.log === 'function' ? console.log : null;
      if (typeof consoleMethod === 'function') {
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
        try {
          consoleMethod.apply(console, consoleArgs);
        } catch (error) {
          void error;
        }
      }
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
      captureGlobalErrors: activeConfig.captureGlobalErrors
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
      newestEntryIsoTimestamp: typeof lastHistoryDrop.newestEntryIsoTimestamp === 'string' ? lastHistoryDrop.newestEntryIsoTimestamp : null
    });
  }
  function getStats() {
    return freezeDeep({
      runtimeEntries: runtimeEntryCount,
      retainedEntries: logHistory.length,
      droppedEntries: totalEntriesDropped,
      historyLimit: getEffectiveHistoryLimit(),
      lastDrop: cloneLastDropSnapshot()
    });
  }
  function clearHistory(options) {
    logHistory.length = 0;
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
    for (var _index6 = 0; _index6 < metaKeys.length; _index6 += 1) {
      var _key = metaKeys[_index6];
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
      getConfig: getConfigSnapshot
    });
  }
  function createTimer(label, options) {
    var normalizedLabel = typeof label === 'string' && label.trim() ? label.trim() : 'operation';
    var timerOptions = options && _typeof(options) === 'object' ? options : null;
    var normalizedNamespace = timerOptions && typeof timerOptions.namespace === 'string' && timerOptions.namespace.trim() ? timerOptions.namespace.trim() : null;
    var baseMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'meta') ? sanitizeForLog(timerOptions.meta) : null;
    var startLevel = normalizeLevel(timerOptions && timerOptions.startLevel, 'debug');
    var successLevel = normalizeLevel(timerOptions && timerOptions.successLevel, 'info');
    var failureLevel = normalizeLevel(timerOptions && timerOptions.failureLevel, 'error');
    var abortLevel = normalizeLevel(timerOptions && timerOptions.abortLevel, 'warn');
    var checkpointLevel = normalizeLevel(timerOptions && timerOptions.checkpointLevel, 'info');
    var announceStart = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'announceStart') ? booleanFromValue(timerOptions.announceStart, true) : true;
    var startMessage = timerOptions && typeof timerOptions.startMessage === 'string' && timerOptions.startMessage.trim() ? timerOptions.startMessage.trim() : "".concat(normalizedLabel, " \u25B6");
    var successMessage = timerOptions && typeof timerOptions.successMessage === 'string' && timerOptions.successMessage.trim() ? timerOptions.successMessage.trim() : "".concat(normalizedLabel, " \u2714");
    var failureMessage = timerOptions && typeof timerOptions.failureMessage === 'string' && timerOptions.failureMessage.trim() ? timerOptions.failureMessage.trim() : "".concat(normalizedLabel, " \u2716");
    var abortMessage = timerOptions && typeof timerOptions.abortMessage === 'string' && timerOptions.abortMessage.trim() ? timerOptions.abortMessage.trim() : "".concat(normalizedLabel, " \u26A0");
    var defaultCheckpointMessage = timerOptions && typeof timerOptions.checkpointMessage === 'string' && timerOptions.checkpointMessage.trim() ? timerOptions.checkpointMessage.trim() : "".concat(normalizedLabel, " \u23E9");
    var startDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startDetail') ? timerOptions.startDetail : undefined;
    var startMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startMeta') ? timerOptions.startMeta : undefined;
    var successDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'successDetail') ? timerOptions.successDetail : undefined;
    var successMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'successMeta') ? timerOptions.successMeta : undefined;
    var failureDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'failureDetail') ? timerOptions.failureDetail : undefined;
    var failureMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'failureMeta') ? timerOptions.failureMeta : undefined;
    var abortDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'abortDetail') ? timerOptions.abortDetail : undefined;
    var abortMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'abortMeta') ? timerOptions.abortMeta : undefined;
    var defaultCheckpointMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointMeta') ? timerOptions.checkpointMeta : undefined;
    var defaultCheckpointDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointDetail') ? timerOptions.checkpointDetail : undefined;
    var startStatus = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startStatus') ? normalizeTimerStatus(timerOptions.startStatus, TIMER_STATUS.running) : TIMER_STATUS.running;
    var startPhase = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startPhase') ? normalizeTimerPhase(timerOptions.startPhase, 'start') : 'start';
    var defaultCheckpointStatus = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointStatus') ? normalizeTimerStatus(timerOptions.checkpointStatus, TIMER_STATUS.running) : TIMER_STATUS.running;
    var defaultCheckpointPhase = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointPhase') ? normalizeTimerPhase(timerOptions.checkpointPhase, 'checkpoint') : 'checkpoint';
    var startTimestamp = Date.now();
    var startIsoTimestamp = safeIsoStringFromTimestamp(startTimestamp);
    if (!startIsoTimestamp) {
      startIsoTimestamp = String(startTimestamp);
    }
    var highResStart = getHighResolutionTimestamp();
    var timerId = createTimerId(startTimestamp);
    var checkpointCount = 0;
    var finished = false;
    var finalStatus = TIMER_STATUS.running;
    var completionDetails = null;
    function buildTimerMeta(status, phase, metaOverride, completion) {
      var normalizedStatus = normalizeTimerStatus(status, finished ? finalStatus : TIMER_STATUS.running);
      var normalizedPhase = normalizeTimerPhase(phase, finished ? 'finish' : 'progress');
      var timerMeta = {
        id: timerId,
        label: normalizedLabel,
        status: normalizedStatus,
        phase: normalizedPhase,
        startedAt: startIsoTimestamp || null,
        startTimestamp: startTimestamp,
        finished: finished,
        checkpoints: checkpointCount
      };
      if (finished) {
        timerMeta.finalStatus = finalStatus;
      }
      if (completion && _typeof(completion) === 'object') {
        if (typeof completion.timestamp === 'number' && Number.isFinite(completion.timestamp)) {
          timerMeta.endTimestamp = completion.timestamp;
        }
        if (typeof completion.isoTimestamp === 'string' && completion.isoTimestamp) {
          timerMeta.completedAt = completion.isoTimestamp;
        }
        if (typeof completion.durationMs === 'number' && Number.isFinite(completion.durationMs)) {
          timerMeta.durationMs = completion.durationMs;
        }
        if (typeof completion.highResDurationMs === 'number' && Number.isFinite(completion.highResDurationMs)) {
          timerMeta.durationHighResMs = completion.highResDurationMs;
        }
      } else {
        var currentTimestamp = Date.now();
        timerMeta.elapsedMs = Math.max(0, currentTimestamp - startTimestamp);
        if (highResStart !== null) {
          var currentHighRes = getHighResolutionTimestamp();
          if (typeof currentHighRes === 'number' && Number.isFinite(currentHighRes)) {
            timerMeta.elapsedHighResMs = Math.max(0, currentHighRes - highResStart);
          }
        }
      }
      var metaWithTimer = mergeMeta(baseMeta, {
        timer: timerMeta
      });
      if (typeof metaOverride === 'undefined') {
        return metaWithTimer;
      }
      return mergeMeta(metaWithTimer, metaOverride);
    }
    function logTimerEntry(level, message, detail, status, phase, metaOverride, completion) {
      var resolvedLevel = normalizeLevel(level, 'info');
      var resolvedMessage = typeof message === 'string' && message.trim() ? message.trim() : normalizedLabel;
      return logInternal(resolvedLevel, resolvedMessage, detail, {
        namespace: normalizedNamespace,
        meta: buildTimerMeta(status, phase, metaOverride, completion)
      });
    }
    var startEntry = null;
    if (announceStart) {
      startEntry = logTimerEntry(startLevel, startMessage, startDetail, startStatus, startPhase, startMeta);
    }
    function finalize(status, level, message, detail, metaOverride, phase) {
      if (finished) {
        return null;
      }
      var normalizedStatus = normalizeTimerStatus(status, TIMER_STATUS.success);
      var resolvedLevel = normalizeLevel(level, successLevel);
      var resolvedMessage = typeof message === 'string' && message.trim() ? message.trim() : successMessage;
      finished = true;
      finalStatus = normalizedStatus;
      var endTimestamp = Date.now();
      var endIsoTimestamp = safeIsoStringFromTimestamp(endTimestamp);
      if (!endIsoTimestamp) {
        endIsoTimestamp = String(endTimestamp);
      }
      var highResDuration = null;
      if (highResStart !== null) {
        var endHighRes = getHighResolutionTimestamp();
        if (typeof endHighRes === 'number' && Number.isFinite(endHighRes)) {
          var durationValue = endHighRes - highResStart;
          highResDuration = durationValue >= 0 ? durationValue : 0;
        }
      }
      var durationMs = Math.max(0, endTimestamp - startTimestamp);
      completionDetails = freezeDeep({
        timestamp: endTimestamp,
        isoTimestamp: endIsoTimestamp,
        durationMs: durationMs,
        highResDurationMs: typeof highResDuration === 'number' && Number.isFinite(highResDuration) ? highResDuration : null
      });
      var normalizedPhase = normalizeTimerPhase(phase, 'finish');
      return logTimerEntry(resolvedLevel, resolvedMessage, detail, normalizedStatus, normalizedPhase, metaOverride, completionDetails);
    }
    function finish(detail, meta) {
      var detailValue = typeof detail === 'undefined' ? successDetail : detail;
      var metaValue = typeof meta === 'undefined' ? successMeta : meta;
      return finalize(TIMER_STATUS.success, successLevel, successMessage, detailValue, metaValue);
    }
    function fail(detail, meta) {
      var detailValue = typeof detail === 'undefined' ? failureDetail : detail;
      var metaValue = typeof meta === 'undefined' ? failureMeta : meta;
      return finalize(TIMER_STATUS.failure, failureLevel, failureMessage, detailValue, metaValue);
    }
    function abort(detail, meta) {
      var detailValue = typeof detail === 'undefined' ? abortDetail : detail;
      var metaValue = typeof meta === 'undefined' ? abortMeta : meta;
      return finalize(TIMER_STATUS.aborted, abortLevel, abortMessage, detailValue, metaValue);
    }
    function complete(overrides) {
      var options = overrides && _typeof(overrides) === 'object' ? overrides : {};
      var baseStatus = Object.prototype.hasOwnProperty.call(options, 'status') ? options.status : TIMER_STATUS.success;
      var normalizedStatus = normalizeTimerStatus(baseStatus, TIMER_STATUS.success);
      var defaultLevel = normalizedStatus === TIMER_STATUS.failure ? failureLevel : normalizedStatus === TIMER_STATUS.aborted ? abortLevel : successLevel;
      var resolvedLevel = Object.prototype.hasOwnProperty.call(options, 'level') ? normalizeLevel(options.level, defaultLevel) : defaultLevel;
      var fallbackMessage = normalizedStatus === TIMER_STATUS.failure ? failureMessage : normalizedStatus === TIMER_STATUS.aborted ? abortMessage : successMessage;
      var resolvedMessage = Object.prototype.hasOwnProperty.call(options, 'message') && typeof options.message === 'string' && options.message.trim() ? options.message.trim() : fallbackMessage;
      var detailValue;
      if (Object.prototype.hasOwnProperty.call(options, 'detail')) {
        detailValue = options.detail;
      } else if (normalizedStatus === TIMER_STATUS.failure) {
        detailValue = failureDetail;
      } else if (normalizedStatus === TIMER_STATUS.aborted) {
        detailValue = abortDetail;
      } else {
        detailValue = successDetail;
      }
      var metaValue;
      if (Object.prototype.hasOwnProperty.call(options, 'meta')) {
        metaValue = options.meta;
      } else if (normalizedStatus === TIMER_STATUS.failure) {
        metaValue = failureMeta;
      } else if (normalizedStatus === TIMER_STATUS.aborted) {
        metaValue = abortMeta;
      } else {
        metaValue = successMeta;
      }
      var phase = Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : 'finish';
      return finalize(normalizedStatus, resolvedLevel, resolvedMessage, detailValue, metaValue, phase);
    }
    function checkpoint(message, detail, optionsParam) {
      if (finished) {
        return null;
      }
      checkpointCount += 1;
      var options = optionsParam && _typeof(optionsParam) === 'object' ? optionsParam : {};
      var resolvedLevel = Object.prototype.hasOwnProperty.call(options, 'level') ? normalizeLevel(options.level, checkpointLevel) : checkpointLevel;
      var resolvedStatus = normalizeTimerStatus(Object.prototype.hasOwnProperty.call(options, 'status') ? options.status : defaultCheckpointStatus, defaultCheckpointStatus);
      var resolvedPhase = normalizeTimerPhase(Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : defaultCheckpointPhase, defaultCheckpointPhase);
      var metaValue = Object.prototype.hasOwnProperty.call(options, 'meta') ? options.meta : defaultCheckpointMeta;
      var detailValue;
      if (typeof detail === 'undefined') {
        detailValue = Object.prototype.hasOwnProperty.call(options, 'detail') ? options.detail : defaultCheckpointDetail;
      } else {
        detailValue = detail;
      }
      var resolvedMessage = typeof message === 'string' && message.trim() ? message.trim() : defaultCheckpointMessage;
      return logTimerEntry(resolvedLevel, resolvedMessage, detailValue, resolvedStatus, resolvedPhase, metaValue);
    }
    function logWithTimer(level, message, detail, optionsParam) {
      var options = optionsParam && _typeof(optionsParam) === 'object' ? optionsParam : {};
      var defaultStatus = finished ? finalStatus : TIMER_STATUS.progress;
      var resolvedLevel = normalizeLevel(level, successLevel);
      var resolvedStatus = normalizeTimerStatus(Object.prototype.hasOwnProperty.call(options, 'status') ? options.status : defaultStatus, defaultStatus);
      var defaultPhase = finished ? 'finish' : 'progress';
      var resolvedPhase = normalizeTimerPhase(Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : defaultPhase, defaultPhase);
      var metaValue = Object.prototype.hasOwnProperty.call(options, 'meta') ? options.meta : undefined;
      var detailValue = typeof detail === 'undefined' && Object.prototype.hasOwnProperty.call(options, 'detail') ? options.detail : detail;
      var resolvedMessage = typeof message === 'string' && message.trim() ? message.trim() : normalizedLabel;
      var includeCompletion = booleanFromValue(options.includeCompletion, finished);
      var completion = includeCompletion && completionDetails ? completionDetails : null;
      return logTimerEntry(resolvedLevel, resolvedMessage, detailValue, resolvedStatus, resolvedPhase, metaValue, completion);
    }
    function composeMeta(status, optionsParam) {
      var options = optionsParam && _typeof(optionsParam) === 'object' ? optionsParam : {};
      var defaultStatus = finished ? finalStatus : TIMER_STATUS.running;
      var baseStatus = typeof status === 'undefined' ? defaultStatus : status;
      var resolvedStatus = normalizeTimerStatus(baseStatus, defaultStatus);
      var defaultPhase = finished ? 'finish' : 'progress';
      var resolvedPhase = normalizeTimerPhase(Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : defaultPhase, defaultPhase);
      var metaValue = Object.prototype.hasOwnProperty.call(options, 'meta') ? options.meta : undefined;
      var includeCompletion = booleanFromValue(options.includeCompletion, finished);
      var completion = includeCompletion && completionDetails ? completionDetails : null;
      return freezeDeep(buildTimerMeta(resolvedStatus, resolvedPhase, metaValue, completion));
    }
    var timerControllerRef = null;
    function run(executor) {
      if (typeof executor !== 'function') {
        return executor;
      }
      try {
        var result = executor(timerControllerRef);
        if (result && typeof result.then === 'function') {
          return result.then(function (value) {
            if (!finished) {
              finish();
            }
            return value;
          }, function (error) {
            if (!finished) {
              fail(error);
            }
            throw error;
          });
        }
        if (!finished) {
          finish();
        }
        return result;
      } catch (error) {
        if (!finished) {
          fail(error);
        }
        throw error;
      }
    }
    var controller = {
      id: timerId,
      label: normalizedLabel,
      namespace: normalizedNamespace,
      startTimestamp: startTimestamp,
      startIsoTimestamp: startIsoTimestamp,
      startEntry: startEntry,
      get finished() {
        return finished;
      },
      get status() {
        return finished ? finalStatus : TIMER_STATUS.running;
      },
      get checkpoints() {
        return checkpointCount;
      },
      get durationMs() {
        if (completionDetails && typeof completionDetails.durationMs === 'number') {
          return completionDetails.durationMs;
        }
        return Math.max(0, Date.now() - startTimestamp);
      },
      get durationHighResMs() {
        if (completionDetails && typeof completionDetails.highResDurationMs === 'number') {
          return completionDetails.highResDurationMs;
        }
        if (highResStart === null) {
          return null;
        }
        var current = getHighResolutionTimestamp();
        if (typeof current === 'number' && Number.isFinite(current)) {
          return Math.max(0, current - highResStart);
        }
        return null;
      },
      finish: finish,
      fail: fail,
      abort: abort,
      complete: complete,
      checkpoint: checkpoint,
      log: logWithTimer,
      run: run,
      composeMeta: composeMeta
    };
    timerControllerRef = controller;
    var frozenController = freezeDeep(controller);
    timerControllerRef = frozenController;
    return frozenController;
  }
  function runWithTimer(label, executor, options) {
    var timer = createTimer(label, options);
    var result;
    if (typeof executor === 'function') {
      result = timer.run(executor);
    } else {
      result = undefined;
    }
    return Object.freeze({
      timer: timer,
      result: result
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
      var nextLimit = clampHistoryLimit(overrides.historyLimit);
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
      var nextPersist = booleanFromValue(overrides.persistSession, activeConfig.persistSession);
      if (nextPersist !== activeConfig.persistSession) {
        activeConfig.persistSession = nextPersist;
        changed = true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(overrides, 'captureGlobalErrors')) {
      var nextCapture = booleanFromValue(overrides.captureGlobalErrors, activeConfig.captureGlobalErrors);
      if (nextCapture !== activeConfig.captureGlobalErrors) {
        activeConfig.captureGlobalErrors = nextCapture;
        changed = true;
        captureChanged = true;
      }
    }
    return {
      changed: changed,
      captureChanged: captureChanged,
      limitChanged: limitChanged
    };
  }
  function setConfig(overrides, options) {
    var previousCapture = activeConfig.captureGlobalErrors;
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
      isoTimestamp: isoTimestamp
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
          logHistory.push(entry);
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
    createTimer: createTimer,
    runWithTimer: runWithTimer,
    getHistory: getHistory,
    getStats: getStats,
    clearHistory: clearHistory,
    getConfig: getConfigSnapshot,
    setConfig: setConfig,
    subscribe: subscribe,
    subscribeConfig: subscribeConfig,
    constants: freezeDeep({
      LOG_LEVELS: LOG_LEVELS,
      DEFAULT_CONFIG: DEFAULT_CONFIG,
      TIMER_STATUS: TIMER_STATUS
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