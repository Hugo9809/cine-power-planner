(function () {
  function detectAmbientScope() {
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }

    return null;
  }

  function fallbackDetectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
  }

  function resolveScopeUtils() {
    let scopeUtils = null;

    if (typeof require === 'function') {
      try {
        scopeUtils = require('./scope-utils.js');
      } catch (scopeUtilsRequireError) {
        void scopeUtilsRequireError;
      }
    }

    if (scopeUtils) {
      return scopeUtils;
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeStateModules;
        if (registry && typeof registry === 'object' && registry.scopeUtils) {
          return registry.scopeUtils;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    return null;
  }

  const scopeUtils = resolveScopeUtils();
  const detectScope =
    scopeUtils && typeof scopeUtils.detectScope === 'function'
      ? scopeUtils.detectScope
      : fallbackDetectScope;

  function resolveTemperatureKeysModule() {
    let temperatureKeys = null;

    if (typeof require === 'function') {
      try {
        temperatureKeys = require('./temperature-keys.js');
      } catch (temperatureKeysRequireError) {
        void temperatureKeysRequireError;
      }
    }

    if (temperatureKeys) {
      return temperatureKeys;
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeStateModules;
        if (registry && typeof registry === 'object' && registry.temperatureKeys) {
          return registry.temperatureKeys;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    return null;
  }

  const temperatureKeysModule = resolveTemperatureKeysModule();
  const resolveTemperatureKeyDefaults =
    temperatureKeysModule && typeof temperatureKeysModule.resolveTemperatureKeyDefaults === 'function'
      ? temperatureKeysModule.resolveTemperatureKeyDefaults
      : function fallbackResolveTemperatureKeyDefaults() {
          const defaults = {
            queueKey: '__cinePendingTemperatureNote',
            renderName: 'renderTemperatureNote',
          };

          const scope = detectScope();
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return defaults;
          }

          try {
            if (typeof scope.CORE_TEMPERATURE_QUEUE_KEY === 'string') {
              defaults.queueKey = scope.CORE_TEMPERATURE_QUEUE_KEY;
            }
          } catch (readQueueKeyError) {
            void readQueueKeyError;
          }

          try {
            if (typeof scope.CORE_TEMPERATURE_RENDER_NAME === 'string') {
              defaults.renderName = scope.CORE_TEMPERATURE_RENDER_NAME;
            }
          } catch (readRenderNameError) {
            void readRenderNameError;
          }

          return defaults;
        };

  function createLocalRuntimeState(candidateScopes, options) {
    const configuration = options && typeof options === 'object' ? options : {};
    const resolvedTemperatureKeys = resolveTemperatureKeyDefaults();
    const temperatureQueueKey =
      typeof configuration.temperatureQueueKey === 'string'
        ? configuration.temperatureQueueKey
        : resolvedTemperatureKeys.queueKey;
    const temperatureRenderName =
      typeof configuration.temperatureRenderName === 'string'
        ? configuration.temperatureRenderName
        : resolvedTemperatureKeys.renderName;

    const scopes = [];
    const seenScopes = typeof Set === 'function' ? new Set() : null;

    function registerScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      if (seenScopes) {
        if (seenScopes.has(scope)) {
          return;
        }
        seenScopes.add(scope);
        scopes.push(scope);
        return;
      }

      if (scopes.indexOf(scope) !== -1) {
        return;
      }

      scopes.push(scope);
    }

    if (Array.isArray(candidateScopes)) {
      for (let initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
        try {
          registerScope(candidateScopes[initialIndex]);
        } catch (initialiseScopeError) {
          void initialiseScopeError;
        }
      }
    }

    function withEachScope(callback) {
      if (typeof callback !== 'function') {
        return;
      }

      for (let index = 0; index < scopes.length; index += 1) {
        try {
          callback(scopes[index], index);
        } catch (scopeCallbackError) {
          void scopeCallbackError;
        }
      }
    }

    function getScopes() {
      return scopes.slice();
    }

    function getPrimaryScope() {
      return scopes.length > 0 ? scopes[0] : null;
    }

    function ensureValue(name, fallbackValue) {
      const fallbackProvider =
        typeof fallbackValue === 'function'
          ? fallbackValue
          : function provideStaticFallback() {
              return fallbackValue;
            };

      if (typeof name !== 'string' || !name) {
        try {
          return fallbackProvider();
        } catch (fallbackError) {
          void fallbackError;
          return undefined;
        }
      }

      for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
        const scope = scopes[scopeIndex];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          continue;
        }

        try {
          if (typeof scope[name] === 'undefined') {
            scope[name] = fallbackProvider();
          }
          return scope[name];
        } catch (ensureError) {
          void ensureError;
        }
      }

      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    function normaliseValue(name, validator, fallbackValue) {
      const fallbackProvider =
        typeof fallbackValue === 'function'
          ? fallbackValue
          : function provideStaticFallback() {
              return fallbackValue;
            };

      const validate =
        typeof validator === 'function'
          ? validator
          : function alwaysValid() {
              return true;
            };

      withEachScope(function applyNormaliser(scope) {
        try {
          if (!validate(scope[name])) {
            scope[name] = fallbackProvider();
          }
        } catch (normaliseError) {
          void normaliseError;
        }
      });
    }

    function readValue(name) {
      for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
        const scope = scopes[scopeIndex];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          continue;
        }

        try {
          if (name in scope) {
            return scope[name];
          }
        } catch (readError) {
          void readError;
        }
      }

      return undefined;
    }

    let assignedTemperatureRenderer = null;

    function assignTemperatureRenderer(renderer) {
      if (typeof renderer !== 'function') {
        return;
      }

      assignedTemperatureRenderer = renderer;

      withEachScope(function applyRenderer(scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }

        try {
          scope[temperatureRenderName] = renderer;
          const pending = scope[temperatureQueueKey];

          if (pending && typeof pending === 'object') {
            if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
              const hours = pending.latestHours;
              if (typeof hours !== 'undefined') {
                try {
                  renderer(hours);
                } catch (temperatureRenderError) {
                  if (
                    typeof console !== 'undefined' &&
                    typeof console.error === 'function'
                  ) {
                    console.error(
                      'Failed to apply pending temperature note render',
                      temperatureRenderError,
                    );
                  }
                }
              }
            }

            if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
              try {
                delete pending.latestHours;
              } catch (clearLatestError) {
                void clearLatestError;
                pending.latestHours = undefined;
              }
            }
          }
        } catch (assignError) {
          void assignError;
        }
      });
    }

    function getAssignedTemperatureRenderer() {
      return assignedTemperatureRenderer;
    }

    const autoGearGuards = {
      isReferenceError: function defaultAutoGearReferenceGuard() {
        return false;
      },
      repair: function defaultAutoGearRepair() {
        return undefined;
      },
    };

    function setAutoGearGuards(nextGuards) {
      if (!nextGuards || typeof nextGuards !== 'object') {
        return;
      }

      if (typeof nextGuards.isReferenceError === 'function') {
        autoGearGuards.isReferenceError = nextGuards.isReferenceError;
      }

      if (typeof nextGuards.repair === 'function') {
        autoGearGuards.repair = nextGuards.repair;
      }
    }

    return {
      registerScope,
      withEachScope,
      getScopes,
      getPrimaryScope,
      ensureValue,
      normaliseValue,
      readValue,
      assignTemperatureRenderer,
      getAssignedTemperatureRenderer,
      autoGearGuards,
      setAutoGearGuards,
    };
  }

  function assignToGlobal(namespace) {
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeStateModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.localRuntimeState = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    createLocalRuntimeState,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
