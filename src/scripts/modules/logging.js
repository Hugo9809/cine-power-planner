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

  const LOGGING_DEEP_CLONE = (function resolveLoggingDeepClone() {
    const scope = fallbackDetectGlobalScope();
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }

    return function loggingFallbackDeepClone(value) {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      try {
        return JSON.parse(JSON.stringify(value));
      } catch (cloneError) {
        void cloneError;
      }

      return value;
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

  function shouldBypassDeepFreeze(value) {
    if (!value || typeof value !== 'object') {
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
      add() {},
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

    if (typeof visited.has === 'function' && visited.has(value)) {
      return value;
    }

    if (typeof visited.add === 'function') {
      visited.add(value);
    }

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
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

  const HISTORY_MIN_LIMIT = 2;
  const HISTORY_MAX_LIMIT = 2000;
  const HISTORY_STORAGE_KEY = '__cineLoggingHistory';
  const CONFIG_STORAGE_KEY = '__cineLoggingConfig';
  const ERROR_EVENT_FLAG =
    typeof Symbol === 'function' ? Symbol.for('cineLoggingHandled') : '__cineLoggingHandled__';
  const DEFAULT_CONFIG_VALUES = {
    level: 'warn',
    historyLevel: 'debug',
    historyLimit: 400,
    consoleOutput: true,
    persistSession: true,
    captureGlobalErrors: true,
  };

  const DEFAULT_CONFIG = freezeDeep(DEFAULT_CONFIG_VALUES);

  function cloneDefaultConfig() {
    return {
      level: DEFAULT_CONFIG_VALUES.level,
      historyLevel: DEFAULT_CONFIG_VALUES.historyLevel,
      historyLimit: DEFAULT_CONFIG_VALUES.historyLimit,
      consoleOutput: DEFAULT_CONFIG_VALUES.consoleOutput,
      persistSession: DEFAULT_CONFIG_VALUES.persistSession,
      captureGlobalErrors: DEFAULT_CONFIG_VALUES.captureGlobalErrors,
    };
  }

  let activeConfig = cloneDefaultConfig();
  const logHistory = [];
  const logSubscribers = new Set();
  const configSubscribers = new Set();
  const attachedErrorTargets = typeof WeakSet === 'function' ? new WeakSet() : [];
  let runtimeEntryCount = 0;
  let totalEntriesDropped = 0;
  let lastHistoryDrop = null;

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

  function clampHistoryLimit(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      const absolute = Math.abs(Math.floor(value));
      if (!absolute) {
        return activeConfig.historyLimit;
      }
      return Math.max(HISTORY_MIN_LIMIT, Math.min(HISTORY_MAX_LIMIT, absolute));
    }

    if (typeof value === 'string' && value) {
      const parsed = Number(value);
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

  const TIMER_STATUS = freezeDeep({
    running: 'running',
    progress: 'progress',
    success: 'success',
    failure: 'failure',
    aborted: 'aborted',
    warning: 'warning',
    skipped: 'skipped',
  });

  const TIMER_STATUS_ALIASES = freezeDeep({
    cancelled: 'aborted',
    canceled: 'aborted',
    cancel: 'aborted',
  });

  function normalizeTimerStatus(value, fallbackStatus) {
    const fallback =
      typeof fallbackStatus === 'string' && fallbackStatus
        ? fallbackStatus
        : TIMER_STATUS.running;

    if (typeof value !== 'string') {
      return fallback;
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return fallback;
    }

    const lowered = trimmed.toLowerCase();
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
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }

    return typeof fallbackPhase === 'string' && fallbackPhase ? fallbackPhase : 'progress';
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
        }),
      );
    } catch (error) {
      safeWarn('cineLogging: Unable to persist logging config', error);
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
      safeWarn('cineLogging: Unable to persist log history', error);
    }
  }

  function getEffectiveHistoryLimit() {
    return Math.max(
      HISTORY_MIN_LIMIT,
      Math.min(HISTORY_MAX_LIMIT, Math.floor(activeConfig.historyLimit)),
    );
  }

  function recordHistoryDrop(removedEntries, limit, options) {
    if (!Array.isArray(removedEntries) || removedEntries.length === 0) {
      return;
    }

    totalEntriesDropped += removedEntries.length;

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
    });

    safeWarn('cineLogging: history trimmed to enforce retention limit', {
      limit,
      removed: removedEntries.length,
      source,
    });
  }

  function enforceHistoryLimit(options) {
    const limit = getEffectiveHistoryLimit();
    if (logHistory.length <= limit) {
      return 0;
    }

    const overflow = logHistory.length - limit;
    const removedEntries = logHistory.splice(0, overflow);
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
    return `log-${timestamp}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function createTimerId(timestamp) {
    return `timer-${timestamp}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function appendEntry(entry) {
    logHistory.push(entry);
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

  function logInternal(level, message, detail, context) {
    const normalizedLevel = normalizeLevel(level, 'info');
    const timestamp = Date.now();
    let isoTimestamp = '';
    try {
      isoTimestamp = new Date(timestamp).toISOString();
    } catch (error) {
      void error;
      isoTimestamp = String(timestamp);
    }

    const namespace = context && typeof context.namespace === 'string' && context.namespace
      ? context.namespace
      : null;

    const meta = context && typeof context.meta !== 'undefined'
      ? sanitizeForLog(context.meta)
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
    });

    if (shouldRecord(normalizedLevel)) {
      appendEntry(entry);
    }

    if (shouldOutputToConsole(normalizedLevel)) {
      const descriptor = LOG_LEVEL_MAP[normalizedLevel] || LOG_LEVEL_MAP.info;
      const methodName = descriptor.consoleMethod;
      const consoleMethod =
        typeof console !== 'undefined'
        && console
        && typeof console[methodName] === 'function'
          ? console[methodName]
          : typeof console !== 'undefined' && console && typeof console.log === 'function'
            ? console.log
            : null;
      if (typeof consoleMethod === 'function') {
        const prefixParts = ['[cine]'];
        if (namespace) {
          prefixParts.push(`[${namespace}]`);
        }
        prefixParts.push(entry.isoTimestamp);
        const prefix = prefixParts.join(' ');
        const consoleArgs = [`${prefix} ${entry.message}`];
        if (detail !== undefined) {
          consoleArgs.push(detail);
        } else if (entry.detail !== null) {
          consoleArgs.push(entry.detail);
        }
        if (entry.meta !== null) {
          consoleArgs.push({ meta: entry.meta });
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
      captureGlobalErrors: activeConfig.captureGlobalErrors,
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
    });
  }

  function getStats() {
    return freezeDeep({
      runtimeEntries: runtimeEntryCount,
      retainedEntries: logHistory.length,
      droppedEntries: totalEntriesDropped,
      historyLimit: getEffectiveHistoryLimit(),
      lastDrop: cloneLastDropSnapshot(),
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
    });
  }

  function createTimer(label, options) {
    const normalizedLabel = typeof label === 'string' && label.trim()
      ? label.trim()
      : 'operation';

    const timerOptions = options && typeof options === 'object' ? options : null;

    const normalizedNamespace = timerOptions && typeof timerOptions.namespace === 'string' && timerOptions.namespace.trim()
      ? timerOptions.namespace.trim()
      : null;

    const baseMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'meta')
      ? sanitizeForLog(timerOptions.meta)
      : null;

    const startLevel = normalizeLevel(timerOptions && timerOptions.startLevel, 'debug');
    const successLevel = normalizeLevel(timerOptions && timerOptions.successLevel, 'info');
    const failureLevel = normalizeLevel(timerOptions && timerOptions.failureLevel, 'error');
    const abortLevel = normalizeLevel(timerOptions && timerOptions.abortLevel, 'warn');
    const checkpointLevel = normalizeLevel(timerOptions && timerOptions.checkpointLevel, 'info');

    const announceStart = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'announceStart')
      ? booleanFromValue(timerOptions.announceStart, true)
      : true;

    const startMessage = timerOptions && typeof timerOptions.startMessage === 'string' && timerOptions.startMessage.trim()
      ? timerOptions.startMessage.trim()
      : `${normalizedLabel} ▶`;
    const successMessage = timerOptions && typeof timerOptions.successMessage === 'string' && timerOptions.successMessage.trim()
      ? timerOptions.successMessage.trim()
      : `${normalizedLabel} ✔`;
    const failureMessage = timerOptions && typeof timerOptions.failureMessage === 'string' && timerOptions.failureMessage.trim()
      ? timerOptions.failureMessage.trim()
      : `${normalizedLabel} ✖`;
    const abortMessage = timerOptions && typeof timerOptions.abortMessage === 'string' && timerOptions.abortMessage.trim()
      ? timerOptions.abortMessage.trim()
      : `${normalizedLabel} ⚠`;
    const defaultCheckpointMessage = timerOptions && typeof timerOptions.checkpointMessage === 'string'
      && timerOptions.checkpointMessage.trim()
        ? timerOptions.checkpointMessage.trim()
        : `${normalizedLabel} ⏩`;

    const startDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startDetail')
      ? timerOptions.startDetail
      : undefined;
    const startMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startMeta')
      ? timerOptions.startMeta
      : undefined;
    const successDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'successDetail')
      ? timerOptions.successDetail
      : undefined;
    const successMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'successMeta')
      ? timerOptions.successMeta
      : undefined;
    const failureDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'failureDetail')
      ? timerOptions.failureDetail
      : undefined;
    const failureMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'failureMeta')
      ? timerOptions.failureMeta
      : undefined;
    const abortDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'abortDetail')
      ? timerOptions.abortDetail
      : undefined;
    const abortMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'abortMeta')
      ? timerOptions.abortMeta
      : undefined;
    const defaultCheckpointMeta = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointMeta')
      ? timerOptions.checkpointMeta
      : undefined;
    const defaultCheckpointDetail = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointDetail')
      ? timerOptions.checkpointDetail
      : undefined;

    const startStatus = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startStatus')
      ? normalizeTimerStatus(timerOptions.startStatus, TIMER_STATUS.running)
      : TIMER_STATUS.running;
    const startPhase = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'startPhase')
      ? normalizeTimerPhase(timerOptions.startPhase, 'start')
      : 'start';
    const defaultCheckpointStatus = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointStatus')
      ? normalizeTimerStatus(timerOptions.checkpointStatus, TIMER_STATUS.running)
      : TIMER_STATUS.running;
    const defaultCheckpointPhase = timerOptions && Object.prototype.hasOwnProperty.call(timerOptions, 'checkpointPhase')
      ? normalizeTimerPhase(timerOptions.checkpointPhase, 'checkpoint')
      : 'checkpoint';

    const startTimestamp = Date.now();
    let startIsoTimestamp = safeIsoStringFromTimestamp(startTimestamp);
    if (!startIsoTimestamp) {
      startIsoTimestamp = String(startTimestamp);
    }
    const highResStart = getHighResolutionTimestamp();
    const timerId = createTimerId(startTimestamp);
    let checkpointCount = 0;
    let finished = false;
    let finalStatus = TIMER_STATUS.running;
    let completionDetails = null;

    function buildTimerMeta(status, phase, metaOverride, completion) {
      const normalizedStatus = normalizeTimerStatus(status, finished ? finalStatus : TIMER_STATUS.running);
      const normalizedPhase = normalizeTimerPhase(phase, finished ? 'finish' : 'progress');

      const timerMeta = {
        id: timerId,
        label: normalizedLabel,
        status: normalizedStatus,
        phase: normalizedPhase,
        startedAt: startIsoTimestamp || null,
        startTimestamp,
        finished,
        checkpoints: checkpointCount,
      };

      if (finished) {
        timerMeta.finalStatus = finalStatus;
      }

      if (completion && typeof completion === 'object') {
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
        const currentTimestamp = Date.now();
        timerMeta.elapsedMs = Math.max(0, currentTimestamp - startTimestamp);
        if (highResStart !== null) {
          const currentHighRes = getHighResolutionTimestamp();
          if (typeof currentHighRes === 'number' && Number.isFinite(currentHighRes)) {
            timerMeta.elapsedHighResMs = Math.max(0, currentHighRes - highResStart);
          }
        }
      }

      const metaWithTimer = mergeMeta(baseMeta, { timer: timerMeta });
      if (typeof metaOverride === 'undefined') {
        return metaWithTimer;
      }
      return mergeMeta(metaWithTimer, metaOverride);
    }

    function logTimerEntry(level, message, detail, status, phase, metaOverride, completion) {
      const resolvedLevel = normalizeLevel(level, 'info');
      const resolvedMessage = typeof message === 'string' && message.trim()
        ? message.trim()
        : normalizedLabel;
      return logInternal(resolvedLevel, resolvedMessage, detail, {
        namespace: normalizedNamespace,
        meta: buildTimerMeta(status, phase, metaOverride, completion),
      });
    }

    let startEntry = null;
    if (announceStart) {
      startEntry = logTimerEntry(
        startLevel,
        startMessage,
        startDetail,
        startStatus,
        startPhase,
        startMeta,
      );
    }

    function finalize(status, level, message, detail, metaOverride, phase) {
      if (finished) {
        return null;
      }

      const normalizedStatus = normalizeTimerStatus(status, TIMER_STATUS.success);
      const resolvedLevel = normalizeLevel(level, successLevel);
      const resolvedMessage = typeof message === 'string' && message.trim()
        ? message.trim()
        : successMessage;

      finished = true;
      finalStatus = normalizedStatus;

      const endTimestamp = Date.now();
      let endIsoTimestamp = safeIsoStringFromTimestamp(endTimestamp);
      if (!endIsoTimestamp) {
        endIsoTimestamp = String(endTimestamp);
      }

      let highResDuration = null;
      if (highResStart !== null) {
        const endHighRes = getHighResolutionTimestamp();
        if (typeof endHighRes === 'number' && Number.isFinite(endHighRes)) {
          const durationValue = endHighRes - highResStart;
          highResDuration = durationValue >= 0 ? durationValue : 0;
        }
      }

      const durationMs = Math.max(0, endTimestamp - startTimestamp);
      completionDetails = freezeDeep({
        timestamp: endTimestamp,
        isoTimestamp: endIsoTimestamp,
        durationMs,
        highResDurationMs:
          typeof highResDuration === 'number' && Number.isFinite(highResDuration)
            ? highResDuration
            : null,
      });

      const normalizedPhase = normalizeTimerPhase(phase, 'finish');

      return logTimerEntry(
        resolvedLevel,
        resolvedMessage,
        detail,
        normalizedStatus,
        normalizedPhase,
        metaOverride,
        completionDetails,
      );
    }

    function finish(detail, meta) {
      const detailValue = typeof detail === 'undefined' ? successDetail : detail;
      const metaValue = typeof meta === 'undefined' ? successMeta : meta;
      return finalize(TIMER_STATUS.success, successLevel, successMessage, detailValue, metaValue);
    }

    function fail(detail, meta) {
      const detailValue = typeof detail === 'undefined' ? failureDetail : detail;
      const metaValue = typeof meta === 'undefined' ? failureMeta : meta;
      return finalize(TIMER_STATUS.failure, failureLevel, failureMessage, detailValue, metaValue);
    }

    function abort(detail, meta) {
      const detailValue = typeof detail === 'undefined' ? abortDetail : detail;
      const metaValue = typeof meta === 'undefined' ? abortMeta : meta;
      return finalize(TIMER_STATUS.aborted, abortLevel, abortMessage, detailValue, metaValue);
    }

    function complete(overrides) {
      const options = overrides && typeof overrides === 'object' ? overrides : {};
      const baseStatus = Object.prototype.hasOwnProperty.call(options, 'status')
        ? options.status
        : TIMER_STATUS.success;
      const normalizedStatus = normalizeTimerStatus(baseStatus, TIMER_STATUS.success);
      const defaultLevel = normalizedStatus === TIMER_STATUS.failure
        ? failureLevel
        : normalizedStatus === TIMER_STATUS.aborted
          ? abortLevel
          : successLevel;
      const resolvedLevel = Object.prototype.hasOwnProperty.call(options, 'level')
        ? normalizeLevel(options.level, defaultLevel)
        : defaultLevel;
      const fallbackMessage = normalizedStatus === TIMER_STATUS.failure
        ? failureMessage
        : normalizedStatus === TIMER_STATUS.aborted
          ? abortMessage
          : successMessage;
      const resolvedMessage = Object.prototype.hasOwnProperty.call(options, 'message')
        && typeof options.message === 'string'
        && options.message.trim()
          ? options.message.trim()
          : fallbackMessage;
      let detailValue;
      if (Object.prototype.hasOwnProperty.call(options, 'detail')) {
        detailValue = options.detail;
      } else if (normalizedStatus === TIMER_STATUS.failure) {
        detailValue = failureDetail;
      } else if (normalizedStatus === TIMER_STATUS.aborted) {
        detailValue = abortDetail;
      } else {
        detailValue = successDetail;
      }
      let metaValue;
      if (Object.prototype.hasOwnProperty.call(options, 'meta')) {
        metaValue = options.meta;
      } else if (normalizedStatus === TIMER_STATUS.failure) {
        metaValue = failureMeta;
      } else if (normalizedStatus === TIMER_STATUS.aborted) {
        metaValue = abortMeta;
      } else {
        metaValue = successMeta;
      }
      const phase = Object.prototype.hasOwnProperty.call(options, 'phase')
        ? options.phase
        : 'finish';
      return finalize(normalizedStatus, resolvedLevel, resolvedMessage, detailValue, metaValue, phase);
    }

    function checkpoint(message, detail, optionsParam) {
      if (finished) {
        return null;
      }

      checkpointCount += 1;

      const options = optionsParam && typeof optionsParam === 'object' ? optionsParam : {};
      const resolvedLevel = Object.prototype.hasOwnProperty.call(options, 'level')
        ? normalizeLevel(options.level, checkpointLevel)
        : checkpointLevel;
      const resolvedStatus = normalizeTimerStatus(
        Object.prototype.hasOwnProperty.call(options, 'status') ? options.status : defaultCheckpointStatus,
        defaultCheckpointStatus,
      );
      const resolvedPhase = normalizeTimerPhase(
        Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : defaultCheckpointPhase,
        defaultCheckpointPhase,
      );
      const metaValue = Object.prototype.hasOwnProperty.call(options, 'meta')
        ? options.meta
        : defaultCheckpointMeta;

      let detailValue;
      if (typeof detail === 'undefined') {
        detailValue = Object.prototype.hasOwnProperty.call(options, 'detail')
          ? options.detail
          : defaultCheckpointDetail;
      } else {
        detailValue = detail;
      }

      const resolvedMessage = typeof message === 'string' && message.trim()
        ? message.trim()
        : defaultCheckpointMessage;

      return logTimerEntry(
        resolvedLevel,
        resolvedMessage,
        detailValue,
        resolvedStatus,
        resolvedPhase,
        metaValue,
      );
    }

    function logWithTimer(level, message, detail, optionsParam) {
      const options = optionsParam && typeof optionsParam === 'object' ? optionsParam : {};
      const defaultStatus = finished ? finalStatus : TIMER_STATUS.progress;
      const resolvedLevel = normalizeLevel(level, successLevel);
      const resolvedStatus = normalizeTimerStatus(
        Object.prototype.hasOwnProperty.call(options, 'status') ? options.status : defaultStatus,
        defaultStatus,
      );
      const defaultPhase = finished ? 'finish' : 'progress';
      const resolvedPhase = normalizeTimerPhase(
        Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : defaultPhase,
        defaultPhase,
      );
      const metaValue = Object.prototype.hasOwnProperty.call(options, 'meta')
        ? options.meta
        : undefined;
      const detailValue = typeof detail === 'undefined' && Object.prototype.hasOwnProperty.call(options, 'detail')
        ? options.detail
        : detail;
      const resolvedMessage = typeof message === 'string' && message.trim()
        ? message.trim()
        : normalizedLabel;
      const includeCompletion = booleanFromValue(options.includeCompletion, finished);
      const completion = includeCompletion && completionDetails ? completionDetails : null;

      return logTimerEntry(
        resolvedLevel,
        resolvedMessage,
        detailValue,
        resolvedStatus,
        resolvedPhase,
        metaValue,
        completion,
      );
    }

    function composeMeta(status, optionsParam) {
      const options = optionsParam && typeof optionsParam === 'object' ? optionsParam : {};
      const defaultStatus = finished ? finalStatus : TIMER_STATUS.running;
      const baseStatus = typeof status === 'undefined' ? defaultStatus : status;
      const resolvedStatus = normalizeTimerStatus(baseStatus, defaultStatus);
      const defaultPhase = finished ? 'finish' : 'progress';
      const resolvedPhase = normalizeTimerPhase(
        Object.prototype.hasOwnProperty.call(options, 'phase') ? options.phase : defaultPhase,
        defaultPhase,
      );
      const metaValue = Object.prototype.hasOwnProperty.call(options, 'meta')
        ? options.meta
        : undefined;
      const includeCompletion = booleanFromValue(options.includeCompletion, finished);
      const completion = includeCompletion && completionDetails ? completionDetails : null;
      return freezeDeep(buildTimerMeta(resolvedStatus, resolvedPhase, metaValue, completion));
    }

    let timerControllerRef = null;

    function run(executor) {
      if (typeof executor !== 'function') {
        return executor;
      }

      try {
        const result = executor(timerControllerRef);
        if (result && typeof result.then === 'function') {
          return result.then(
            value => {
              if (!finished) {
                finish();
              }
              return value;
            },
            error => {
              if (!finished) {
                fail(error);
              }
              throw error;
            },
          );
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

    const controller = {
      id: timerId,
      label: normalizedLabel,
      namespace: normalizedNamespace,
      startTimestamp,
      startIsoTimestamp,
      startEntry,
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
        const current = getHighResolutionTimestamp();
        if (typeof current === 'number' && Number.isFinite(current)) {
          return Math.max(0, current - highResStart);
        }
        return null;
      },
      finish,
      fail,
      abort,
      complete,
      checkpoint,
      log: logWithTimer,
      run,
      composeMeta,
    };

    timerControllerRef = controller;
    const frozenController = freezeDeep(controller);
    timerControllerRef = frozenController;

    return frozenController;
  }

  function runWithTimer(label, executor, options) {
    const timer = createTimer(label, options);
    let result;
    if (typeof executor === 'function') {
      result = timer.run(executor);
    } else {
      result = undefined;
    }

    return Object.freeze({
      timer,
      result,
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
      const nextLimit = clampHistoryLimit(overrides.historyLimit);
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
      const nextPersist = booleanFromValue(overrides.persistSession, activeConfig.persistSession);
      if (nextPersist !== activeConfig.persistSession) {
        activeConfig.persistSession = nextPersist;
        changed = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(overrides, 'captureGlobalErrors')) {
      const nextCapture = booleanFromValue(overrides.captureGlobalErrors, activeConfig.captureGlobalErrors);
      if (nextCapture !== activeConfig.captureGlobalErrors) {
        activeConfig.captureGlobalErrors = nextCapture;
        changed = true;
        captureChanged = true;
      }
    }

    return { changed, captureChanged, limitChanged };
  }

  function setConfig(overrides, options) {
    const previousCapture = activeConfig.captureGlobalErrors;
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
    });
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
          logHistory.push(entry);
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
    createTimer,
    runWithTimer,
    getHistory,
    getStats,
    clearHistory,
    getConfig: getConfigSnapshot,
    setConfig,
    subscribe,
    subscribeConfig,
    constants: freezeDeep({
      LOG_LEVELS,
      DEFAULT_CONFIG,
      TIMER_STATUS,
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
