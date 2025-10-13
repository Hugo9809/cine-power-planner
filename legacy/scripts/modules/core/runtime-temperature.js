(function () {
  var DEFAULT_QUEUE_KEY = '__cinePendingTemperatureNote';
  var DEFAULT_RENDER_NAME = 'renderTemperatureNote';
  var DEFAULT_STORAGE_KEY = 'cameraPowerPlanner_temperatureUnit';

  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectGlobalScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isObject(CORE_GLOBAL_SCOPE)) {
      return CORE_GLOBAL_SCOPE;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
  }

  function registerScope(scopes, seen, scope) {
    if (!Array.isArray(scopes) || !isObject(scope)) {
      return;
    }

    if (seen) {
      if (seen.has(scope)) {
        return;
      }
      seen.add(scope);
      scopes.push(scope);
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function collectCandidateScopes(primaryScope, candidateScopes) {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;

    if (Array.isArray(candidateScopes)) {
      for (var index = 0; index < candidateScopes.length; index += 1) {
        registerScope(scopes, seen, candidateScopes[index]);
      }
    } else if (isObject(candidateScopes)) {
      registerScope(scopes, seen, candidateScopes);
    }

    registerScope(scopes, seen, primaryScope);
    registerScope(scopes, seen, detectGlobalScope(primaryScope));
    registerScope(scopes, seen, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
    registerScope(scopes, seen, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, seen, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, seen, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, seen, typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function ensureKeyString(value, fallback) {
    return typeof value === 'string' && value ? value : fallback;
  }

  function readKeyDefaultsFromSupport(support) {
    if (!isObject(support) || typeof support.resolveTemperatureKeyDefaults !== 'function') {
      return null;
    }

    try {
      var resolved = support.resolveTemperatureKeyDefaults();
      return isObject(resolved) ? resolved : null;
    } catch (resolveError) {
      void resolveError;
    }

    return null;
  }

  function resolveTemperatureKeyDefaults(options) {
    var defaults = {
      queueKey: ensureKeyString(options && options.queueKey, DEFAULT_QUEUE_KEY),
      renderName: ensureKeyString(options && options.renderName, DEFAULT_RENDER_NAME),
    };

    var supports = [];

    if (options) {
      if (isObject(options.runtimeStateSupport)) {
        supports.push(options.runtimeStateSupport);
      }

      if (isObject(options.secondaryRuntimeStateSupport)) {
        supports.push(options.secondaryRuntimeStateSupport);
      }

      if (Array.isArray(options.additionalSupports)) {
        for (var index = 0; index < options.additionalSupports.length; index += 1) {
          if (isObject(options.additionalSupports[index])) {
            supports.push(options.additionalSupports[index]);
          }
        }
      }
    }

    for (var supportIndex = 0; supportIndex < supports.length; supportIndex += 1) {
      var resolved = readKeyDefaultsFromSupport(supports[supportIndex]);
      if (!resolved) {
        continue;
      }

      if (typeof resolved.queueKey === 'string' && resolved.queueKey) {
        defaults.queueKey = resolved.queueKey;
      }

      if (typeof resolved.renderName === 'string' && resolved.renderName) {
        defaults.renderName = resolved.renderName;
      }
    }

    defaults.queueKey = ensureKeyString(defaults.queueKey, DEFAULT_QUEUE_KEY);
    defaults.renderName = ensureKeyString(defaults.renderName, DEFAULT_RENDER_NAME);

    return defaults;
  }

  function ensureTemperatureKeyExposure(initialKeys, options) {
    var contextOptions = options || {};
    var defaults = resolveTemperatureKeyDefaults(contextOptions);
    var keys = {
      queueKey: ensureKeyString(initialKeys && initialKeys.queueKey, defaults.queueKey),
      renderName: ensureKeyString(initialKeys && initialKeys.renderName, defaults.renderName),
    };

    var candidateScopes = collectCandidateScopes(
      contextOptions.primaryScope,
      contextOptions.candidateScopes
    );

    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      if (
        typeof scope.CORE_TEMPERATURE_QUEUE_KEY !== 'string' ||
        !scope.CORE_TEMPERATURE_QUEUE_KEY
      ) {
        try {
          scope.CORE_TEMPERATURE_QUEUE_KEY = keys.queueKey;
        } catch (assignQueueError) {
          void assignQueueError;
        }
      }

      if (
        typeof scope.CORE_TEMPERATURE_RENDER_NAME !== 'string' ||
        !scope.CORE_TEMPERATURE_RENDER_NAME
      ) {
        try {
          scope.CORE_TEMPERATURE_RENDER_NAME = keys.renderName;
        } catch (assignRenderError) {
          void assignRenderError;
        }
      }
    }

    var globalScope = detectGlobalScope(contextOptions.primaryScope);
    if (isObject(globalScope)) {
      if (
        typeof globalScope.CORE_TEMPERATURE_QUEUE_KEY !== 'string' ||
        !globalScope.CORE_TEMPERATURE_QUEUE_KEY
      ) {
        try {
          globalScope.CORE_TEMPERATURE_QUEUE_KEY = keys.queueKey;
        } catch (assignQueueGlobalError) {
          void assignQueueGlobalError;
        }
      }

      if (
        typeof globalScope.CORE_TEMPERATURE_RENDER_NAME !== 'string' ||
        !globalScope.CORE_TEMPERATURE_RENDER_NAME
      ) {
        try {
          globalScope.CORE_TEMPERATURE_RENDER_NAME = keys.renderName;
        } catch (assignRenderGlobalError) {
          void assignRenderGlobalError;
        }
      }
    }

    return keys;
  }

  function resolveTemperatureStorageKey(options) {
    var contextOptions = options || {};
    var initialKey = ensureKeyString(contextOptions.initialKey, null);

    if (initialKey) {
      return initialKey;
    }

    var candidateScopes = collectCandidateScopes(
      contextOptions.primaryScope,
      contextOptions.candidateScopes
    );

    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      if (typeof scope.TEMPERATURE_STORAGE_KEY === 'string' && scope.TEMPERATURE_STORAGE_KEY) {
        return scope.TEMPERATURE_STORAGE_KEY;
      }

      if (
        typeof scope.TEMPERATURE_UNIT_STORAGE_KEY === 'string' &&
        scope.TEMPERATURE_UNIT_STORAGE_KEY
      ) {
        return scope.TEMPERATURE_UNIT_STORAGE_KEY;
      }

      if (
        isObject(scope.CORE_SHARED) &&
        typeof scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY === 'string' &&
        scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY
      ) {
        return scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY;
      }

      if (isObject(scope.__cineStorageApi)) {
        var storageApi = scope.__cineStorageApi;

        if (
          typeof storageApi.TEMPERATURE_STORAGE_KEY === 'string' &&
          storageApi.TEMPERATURE_STORAGE_KEY
        ) {
          return storageApi.TEMPERATURE_STORAGE_KEY;
        }

        if (typeof storageApi.getTemperaturePreferenceStorageKey === 'function') {
          try {
            var key = storageApi.getTemperaturePreferenceStorageKey();
            if (typeof key === 'string' && key) {
              return key;
            }
          } catch (temperaturePreferenceLookupError) {
            void temperaturePreferenceLookupError;
          }
        }
      }

      if (typeof scope.resolveTemperatureStorageKey === 'function') {
        try {
          var resolved = scope.resolveTemperatureStorageKey();
          if (typeof resolved === 'string' && resolved) {
            return resolved;
          }
        } catch (resolveTemperatureStorageKeyError) {
          void resolveTemperatureStorageKeyError;
        }
      }
    }

    return DEFAULT_STORAGE_KEY;
  }

  function ensureTemperatureStorageKeyGlobal(key, options) {
    var resolvedKey = ensureKeyString(key, DEFAULT_STORAGE_KEY);
    var candidateScopes = collectCandidateScopes(
      options && options.primaryScope,
      options && options.candidateScopes
    );

    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      if (typeof scope.TEMPERATURE_STORAGE_KEY === 'string' && scope.TEMPERATURE_STORAGE_KEY) {
        continue;
      }

      try {
        scope.TEMPERATURE_STORAGE_KEY = resolvedKey;
      } catch (assignError) {
        void assignError;
      }
    }

    return resolvedKey;
  }

  function ensureTemperaturePreferences(options) {
    var contextOptions = options || {};
    var key = resolveTemperatureStorageKey(contextOptions);
    ensureTemperatureStorageKeyGlobal(key, contextOptions);
    return key;
  }

  var api = {
    DEFAULT_QUEUE_KEY: DEFAULT_QUEUE_KEY,
    DEFAULT_RENDER_NAME: DEFAULT_RENDER_NAME,
    DEFAULT_STORAGE_KEY: DEFAULT_STORAGE_KEY,
    detectGlobalScope: detectGlobalScope,
    collectCandidateScopes: collectCandidateScopes,
    resolveTemperatureKeyDefaults: resolveTemperatureKeyDefaults,
    ensureTemperatureKeyExposure: ensureTemperatureKeyExposure,
    resolveTemperatureStorageKey: resolveTemperatureStorageKey,
    ensureTemperatureStorageKeyGlobal: ensureTemperatureStorageKeyGlobal,
    ensureTemperaturePreferences: ensureTemperaturePreferences,
  };

  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreRuntimeTemperature';

  if (globalScope) {
    var existing =
      globalScope[targetName] && typeof globalScope[targetName] === 'object'
        ? globalScope[targetName]
        : {};

    var keys = Object.keys(api);
    for (var i = 0; i < keys.length; i += 1) {
      var keyName = keys[i];
      existing[keyName] = api[keyName];
    }

    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = api;
  }
})();
