import './base.js';
import './logging.js';

/* global cineModuleBase */

// ESM Wrapper replacement
// (function () {
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

const GLOBAL_SCOPE = detectGlobalScope();

function resolveModuleBase(scope) {
  // if (baseApi) return baseApi;

  if (typeof cineModuleBase === 'object' && cineModuleBase) {
    return cineModuleBase;
  }

  if (scope && typeof scope.cineModuleBase === 'object') {
    return scope.cineModuleBase;
  }

  return null;
}

const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);

const baseFreezeDeep = MODULE_BASE && typeof MODULE_BASE.freezeDeep === 'function'
  ? MODULE_BASE.freezeDeep
  : function identity(value) {
    return value;
  };

const freezeDeep = value => {
  try {
    return baseFreezeDeep(value);
  } catch (error) {
    void error;
    return value;
  }
};

function fallbackCollectCandidateScopes(primary) {
  const scopes = [];

  function push(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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

const collectCandidateScopes = MODULE_BASE && typeof MODULE_BASE.collectCandidateScopes === 'function'
  ? function collect(primary) {
    try {
      const result = MODULE_BASE.collectCandidateScopes(primary, GLOBAL_SCOPE);
      if (Array.isArray(result) && result.length) {
        return result;
      }
    } catch (error) {
      void error;
    }
    return fallbackCollectCandidateScopes(primary || GLOBAL_SCOPE);
  }
  : fallbackCollectCandidateScopes;

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

const safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function'
  ? MODULE_BASE.safeWarn
  : fallbackSafeWarn;

function resolveLoggingFromScope(scope) {
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return null;
  }

  let logging = null;
  try {
    logging = scope.cineLogging || null;
  } catch (error) {
    void error;
    logging = null;
  }

  if (logging && typeof logging === 'object') {
    return logging;
  }

  return null;
}

function tryRequireLogging() {
  // if (loggingApi && typeof loggingApi === 'object') {
  //   return loggingApi;
  // }
  return null;
}

function resolveLogging(options = {}) {
  const baseScope = options.baseScope || GLOBAL_SCOPE;
  const allowRequire = options.allowRequire !== false;

  if (allowRequire) {
    const required = tryRequireLogging();
    if (required) {
      return required;
    }
  }

  const scopes = collectCandidateScopes(baseScope);
  for (let index = 0; index < scopes.length; index += 1) {
    const logging = resolveLoggingFromScope(scopes[index]);
    if (logging) {
      return logging;
    }
  }

  return null;
}

function cloneMeta(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (Array.isArray(value)) {
    const clone = [];
    seen.set(value, clone);
    for (let index = 0; index < value.length; index += 1) {
      clone[index] = cloneMeta(value[index], seen);
    }
    return clone;
  }

  const clone = {};
  seen.set(value, clone);
  const keys = Object.keys(value);
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
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

  if (typeof baseMeta !== 'object' || typeof meta !== 'object') {
    return cloneMeta(meta);
  }

  const merged = cloneMeta(baseMeta);
  const keys = Object.keys(meta);
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    merged[key] = cloneMeta(meta[key]);
  }
  return merged;
}

function resolveConsoleMethod(level) {
  if (typeof console === 'undefined' || !console) {
    return null;
  }

  const normalized = typeof level === 'string' ? level.toLowerCase() : '';

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

let fallbackWarningIssued = false;

function createConsoleFallbackLogger(namespace, options = {}) {
  const normalizedNamespace = typeof namespace === 'string' && namespace.trim()
    ? namespace.trim()
    : 'app';

  const baseMeta = options && typeof options.meta !== 'undefined'
    ? cloneMeta(options.meta)
    : null;

  function output(level, message, detail, meta) {
    const consoleMethod = resolveConsoleMethod(level);
    if (!consoleMethod) {
      return null;
    }

    const prefixParts = ['[cine-fallback]'];
    if (normalizedNamespace) {
      prefixParts.push(`[${normalizedNamespace}]`);
    }

    const timestamp = new Date();
    try {
      prefixParts.push(timestamp.toISOString());
    } catch (error) {
      void error;
      prefixParts.push(String(timestamp.getTime()));
    }

    const prefix = prefixParts.join(' ');
    const resolvedMessage = typeof message === 'string' && message
      ? message
      : 'Log entry';

    const args = [`${prefix} ${resolvedMessage}`];

    if (typeof detail !== 'undefined') {
      args.push(detail);
    }

    const mergedMeta = mergeMeta(baseMeta, meta);
    if (mergedMeta) {
      args.push({ meta: mergedMeta, source: 'console-fallback' });
    }

    try {
      consoleMethod(...args);
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

  const logger = {
    namespace: normalizedNamespace,
    log(level, message, detail, meta) {
      return output(level, message, detail, meta);
    },
    debug(message, detail, meta) {
      return output('debug', message, detail, meta);
    },
    info(message, detail, meta) {
      return output('info', message, detail, meta);
    },
    warn(message, detail, meta) {
      return output('warn', message, detail, meta);
    },
    error(message, detail, meta) {
      return output('error', message, detail, meta);
    },
    getConfig() {
      return null;
    },
    isLevelEnabled() {
      return true;
    },
    getLevelState(level) {
      return {
        level: typeof level === 'string' && level ? level : 'all',
        enabled: true,
        source: 'console-fallback',
      };
    },
    __cineLoggingFallback: true,
  };

  return freezeDeep(logger);
}

function resolveLogger(namespace, options = {}) {
  const logging = resolveLogging(options);
  const meta = options && typeof options.meta !== 'undefined' ? options.meta : undefined;

  if (logging && typeof logging.createLogger === 'function') {
    try {
      const logger = logging.createLogger(namespace, typeof meta !== 'undefined' ? { meta } : undefined);
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

  return createConsoleFallbackLogger(namespace, { meta });
}

const resolverApi = freezeDeep({
  resolveLogging,
  resolveLogger,
  createConsoleFallbackLogger,
});

const registry = MODULE_BASE && typeof MODULE_BASE.resolveModuleRegistry === 'function'
  ? MODULE_BASE.resolveModuleRegistry(GLOBAL_SCOPE)
  : null;

if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
  const registered = MODULE_BASE.registerOrQueueModule(
    'cineLoggingResolver',
    resolverApi,
    {
      category: 'diagnostics',
      description: 'Helpers to resolve cineLogging instances and console fallbacks across runtimes.',
      replace: true,
      connections: ['cineLogging', 'cineModuleBase', 'cineEnvironmentBridge'],
    },
    (error) => {
      safeWarn('Unable to register cineLoggingResolver module.', error);
    },
    GLOBAL_SCOPE,
    registry,
  );

  if (!registered && typeof MODULE_BASE.queueModuleRegistration === 'function') {
    try {
      MODULE_BASE.queueModuleRegistration(
        'cineLoggingResolver',
        resolverApi,
        {
          category: 'diagnostics',
          description: 'Helpers to resolve cineLogging instances and console fallbacks across runtimes.',
          replace: true,
        },
        GLOBAL_SCOPE,
      );
    } catch (queueError) {
      safeWarn('Unable to queue cineLoggingResolver registration.', queueError);
    }
  }
}

if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
  MODULE_BASE.exposeGlobal('cineLoggingResolver', resolverApi, GLOBAL_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false,
  });
} else {
  try {
    GLOBAL_SCOPE.cineLoggingResolver = resolverApi;
  } catch (error) {
    void error;
  }
}

/*
if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = resolverApi;
}
*/
// ESM Export
export { resolverApi as cineLoggingResolver };
export default resolverApi;

