function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        return require('./base.js');
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  var baseFreezeDeep = MODULE_BASE && typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function identity(value) {
    return value;
  };
  var freezeDeep = function freezeDeep(value) {
    try {
      return baseFreezeDeep(value);
    } catch (error) {
      void error;
      return value;
    }
  };
  function fallbackCollectCandidateScopes(primary) {
    var scopes = [];
    function push(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    if (primary) push(primary);
    if (typeof globalThis !== 'undefined') push(globalThis);
    if (typeof window !== 'undefined') push(window);
    if (typeof self !== 'undefined') push(self);
    if (typeof global !== 'undefined') push(global);
    return scopes;
  }
  var collectCandidateScopes = MODULE_BASE && typeof MODULE_BASE.collectCandidateScopes === 'function' ? function collect(primary) {
    try {
      var result = MODULE_BASE.collectCandidateScopes(primary, GLOBAL_SCOPE);
      if (Array.isArray(result) && result.length) {
        return result;
      }
    } catch (error) {
      void error;
    }
    return fallbackCollectCandidateScopes(primary || GLOBAL_SCOPE);
  } : fallbackCollectCandidateScopes;
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
  var safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : fallbackSafeWarn;
  function resolveLoggingFromScope(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    var logging = null;
    try {
      logging = scope.cineLogging || null;
    } catch (error) {
      void error;
      logging = null;
    }
    if (logging && _typeof(logging) === 'object') {
      return logging;
    }
    return null;
  }
  function tryRequireLogging() {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      var required = require('./logging.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }
    return null;
  }
  function resolveLogging() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var baseScope = options.baseScope || GLOBAL_SCOPE;
    var allowRequire = options.allowRequire !== false;
    if (allowRequire) {
      var required = tryRequireLogging();
      if (required) {
        return required;
      }
    }
    var scopes = collectCandidateScopes(baseScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var logging = resolveLoggingFromScope(scopes[index]);
      if (logging) {
        return logging;
      }
    }
    return null;
  }
  function cloneMeta(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    if (seen.has(value)) {
      return seen.get(value);
    }
    if (Array.isArray(value)) {
      var _clone = [];
      seen.set(value, _clone);
      for (var index = 0; index < value.length; index += 1) {
        _clone[index] = cloneMeta(value[index], seen);
      }
      return _clone;
    }
    var clone = {};
    seen.set(value, clone);
    var keys = Object.keys(value);
    for (var _index = 0; _index < keys.length; _index += 1) {
      var key = keys[_index];
      clone[key] = cloneMeta(value[key], seen);
    }
    return clone;
  }
  function mergeMeta(baseMeta, meta) {
    if (!baseMeta && !meta) {
      return null;
    }
    if (!baseMeta) {
      return cloneMeta(meta);
    }
    if (!meta) {
      return cloneMeta(baseMeta);
    }
    if (_typeof(baseMeta) !== 'object' || _typeof(meta) !== 'object') {
      return cloneMeta(meta);
    }
    var merged = cloneMeta(baseMeta);
    var keys = Object.keys(meta);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      merged[key] = cloneMeta(meta[key]);
    }
    return merged;
  }
  function resolveConsoleMethod(level) {
    if (typeof console === 'undefined' || !console) {
      return null;
    }
    var normalized = typeof level === 'string' ? level.toLowerCase() : '';
    if (normalized === 'error' && typeof console.error === 'function') {
      return console.error.bind(console);
    }
    if (normalized === 'warn' && typeof console.warn === 'function') {
      return console.warn.bind(console);
    }
    if (normalized === 'info' && typeof console.info === 'function') {
      return console.info.bind(console);
    }
    if (normalized === 'debug' && typeof console.debug === 'function') {
      return console.debug.bind(console);
    }
    if (typeof console.log === 'function') {
      return console.log.bind(console);
    }
    return null;
  }
  var fallbackWarningIssued = false;
  function createConsoleFallbackLogger(namespace) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var normalizedNamespace = typeof namespace === 'string' && namespace.trim() ? namespace.trim() : 'app';
    var baseMeta = options && typeof options.meta !== 'undefined' ? cloneMeta(options.meta) : null;
    function output(level, message, detail, meta) {
      var consoleMethod = resolveConsoleMethod(level);
      if (!consoleMethod) {
        return null;
      }
      var prefixParts = ['[cine-fallback]'];
      if (normalizedNamespace) {
        prefixParts.push("[".concat(normalizedNamespace, "]"));
      }
      var timestamp = new Date();
      try {
        prefixParts.push(timestamp.toISOString());
      } catch (error) {
        void error;
        prefixParts.push(String(timestamp.getTime()));
      }
      var prefix = prefixParts.join(' ');
      var resolvedMessage = typeof message === 'string' && message ? message : 'Log entry';
      var args = ["".concat(prefix, " ").concat(resolvedMessage)];
      if (typeof detail !== 'undefined') {
        args.push(detail);
      }
      var mergedMeta = mergeMeta(baseMeta, meta);
      if (mergedMeta) {
        args.push({
          meta: mergedMeta,
          source: 'console-fallback'
        });
      }
      try {
        consoleMethod.apply(void 0, args);
      } catch (error) {
        void error;
      }
      if (!fallbackWarningIssued && typeof console !== 'undefined' && typeof console.warn === 'function') {
        fallbackWarningIssued = true;
        try {
          console.warn('[cine-fallback] Structured logging unavailable, using console logger.');
        } catch (warnError) {
          void warnError;
        }
      }
      return null;
    }
    var logger = {
      namespace: normalizedNamespace,
      log: function log(level, message, detail, meta) {
        return output(level, message, detail, meta);
      },
      debug: function debug(message, detail, meta) {
        return output('debug', message, detail, meta);
      },
      info: function info(message, detail, meta) {
        return output('info', message, detail, meta);
      },
      warn: function warn(message, detail, meta) {
        return output('warn', message, detail, meta);
      },
      error: function error(message, detail, meta) {
        return output('error', message, detail, meta);
      },
      getConfig: function getConfig() {
        return null;
      },
      isLevelEnabled: function isLevelEnabled() {
        return true;
      },
      getLevelState: function getLevelState(level) {
        return {
          level: typeof level === 'string' && level ? level : 'all',
          enabled: true,
          source: 'console-fallback'
        };
      },
      __cineLoggingFallback: true
    };
    return freezeDeep(logger);
  }
  function resolveLogger(namespace) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var logging = resolveLogging(options);
    var meta = options && typeof options.meta !== 'undefined' ? options.meta : undefined;
    if (logging && typeof logging.createLogger === 'function') {
      try {
        var logger = logging.createLogger(namespace, typeof meta !== 'undefined' ? {
          meta: meta
        } : undefined);
        if (logger) {
          return logger;
        }
      } catch (error) {
        safeWarn('cineLoggingResolver: createLogger failed, falling back to console.', error);
      }
    }
    if (options.allowConsoleFallback === false) {
      return null;
    }
    return createConsoleFallbackLogger(namespace, {
      meta: meta
    });
  }
  var resolverApi = freezeDeep({
    resolveLogging: resolveLogging,
    resolveLogger: resolveLogger,
    createConsoleFallbackLogger: createConsoleFallbackLogger
  });
  var registry = MODULE_BASE && typeof MODULE_BASE.resolveModuleRegistry === 'function' ? MODULE_BASE.resolveModuleRegistry(GLOBAL_SCOPE) : null;
  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    var registered = MODULE_BASE.registerOrQueueModule('cineLoggingResolver', resolverApi, {
      category: 'diagnostics',
      description: 'Helpers to resolve cineLogging instances and console fallbacks across runtimes.',
      replace: true,
      connections: ['cineLogging', 'cineModuleBase', 'cineEnvironmentBridge']
    }, function (error) {
      safeWarn('Unable to register cineLoggingResolver module.', error);
    }, GLOBAL_SCOPE, registry);
    if (!registered && typeof MODULE_BASE.queueModuleRegistration === 'function') {
      try {
        MODULE_BASE.queueModuleRegistration('cineLoggingResolver', resolverApi, {
          category: 'diagnostics',
          description: 'Helpers to resolve cineLogging instances and console fallbacks across runtimes.',
          replace: true
        }, GLOBAL_SCOPE);
      } catch (queueError) {
        safeWarn('Unable to queue cineLoggingResolver registration.', queueError);
      }
    }
  }
  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineLoggingResolver', resolverApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineLoggingResolver = resolverApi;
    } catch (error) {
      void error;
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = resolverApi;
  }
})();