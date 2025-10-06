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
  var HISTORY_MIN_LIMIT = 50;
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
      if (nextDepth >= 4) {
        var ctorName = value.constructor && value.constructor.name;
        return ctorName ? "[".concat(ctorName, "]") : Object.prototype.toString.call(value);
      }
      if (Array.isArray(value)) {
        var maxItems = 20;
        var result = [];
        var len = Math.min(value.length, maxItems);
        for (var index = 0; index < len; index += 1) {
          result.push(sanitizeForLog(value[index], nextDepth + 1, visited));
        }
        if (value.length > maxItems) {
          result.push("\u2026 (".concat(value.length - maxItems, " more)"));
        }
        return result;
      }
      var output = {};
      var keys = Object.keys(value);
      var maxKeys = 30;
      var length = Math.min(keys.length, maxKeys);
      for (var _index = 0; _index < length; _index += 1) {
        var key = keys[_index];
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
        for (var _index2 = 0; _index2 < symbolLength; _index2 += 1) {
          var symbolKey = symbols[_index2];
          var symbolName = _typeof(symbolKey) === 'symbol' ? symbolKey.toString() : String(symbolKey);
          try {
            output[symbolName] = sanitizeForLog(value[symbolKey], nextDepth + 1, visited);
          } catch (error) {
            output[symbolName] = "[Threw: ".concat(error && error.message ? error.message : 'error', "]");
          }
        }
      }
      if (!keys.length) {
        var _ctorName = value.constructor && value.constructor.name;
        if (_ctorName) {
          output.__className = _ctorName;
        }
      }
      return output;
    }
    try {
      return JSON.parse(JSON.stringify(value));
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
  function enforceHistoryLimit() {
    var limit = Math.max(HISTORY_MIN_LIMIT, Math.min(HISTORY_MAX_LIMIT, Math.floor(activeConfig.historyLimit)));
    while (logHistory.length > limit) {
      logHistory.shift();
    }
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
  function appendEntry(entry) {
    logHistory.push(entry);
    enforceHistoryLimit();
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
    for (var _index3 = 0; _index3 < metaKeys.length; _index3 += 1) {
      var _key = metaKeys[_index3];
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
      enforceHistoryLimit();
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
      enforceHistoryLimit();
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
    config: getConfigSnapshot()
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
    clearHistory: clearHistory,
    getConfig: getConfigSnapshot,
    setConfig: setConfig,
    subscribe: subscribe,
    subscribeConfig: subscribeConfig,
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