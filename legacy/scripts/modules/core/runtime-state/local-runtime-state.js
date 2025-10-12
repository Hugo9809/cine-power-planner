function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectAmbientScope() {
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  function fallbackDetectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }
    return detectAmbientScope();
  }
  function resolveScopeUtils() {
    var scopeUtils = null;
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
    var scope = detectAmbientScope();
    if (scope && _typeof(scope) === 'object') {
      try {
        var registry = scope.cineCoreRuntimeStateModules;
        if (registry && _typeof(registry) === 'object' && registry.scopeUtils) {
          return registry.scopeUtils;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }
    return null;
  }
  var scopeUtils = resolveScopeUtils();
  var detectScope = scopeUtils && typeof scopeUtils.detectScope === 'function' ? scopeUtils.detectScope : fallbackDetectScope;
  function resolveTemperatureKeysModule() {
    var temperatureKeys = null;
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
    var scope = detectAmbientScope();
    if (scope && _typeof(scope) === 'object') {
      try {
        var registry = scope.cineCoreRuntimeStateModules;
        if (registry && _typeof(registry) === 'object' && registry.temperatureKeys) {
          return registry.temperatureKeys;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }
    return null;
  }
  var temperatureKeysModule = resolveTemperatureKeysModule();
  var resolveTemperatureKeyDefaults = temperatureKeysModule && typeof temperatureKeysModule.resolveTemperatureKeyDefaults === 'function' ? temperatureKeysModule.resolveTemperatureKeyDefaults : function fallbackResolveTemperatureKeyDefaults() {
    var defaults = {
      queueKey: '__cinePendingTemperatureNote',
      renderName: 'renderTemperatureNote'
    };
    var scope = detectScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
    var configuration = options && _typeof(options) === 'object' ? options : {};
    var resolvedTemperatureKeys = resolveTemperatureKeyDefaults();
    var temperatureQueueKey = typeof configuration.temperatureQueueKey === 'string' ? configuration.temperatureQueueKey : resolvedTemperatureKeys.queueKey;
    var temperatureRenderName = typeof configuration.temperatureRenderName === 'string' ? configuration.temperatureRenderName : resolvedTemperatureKeys.renderName;
    var scopes = [];
    var seenScopes = typeof Set === 'function' ? new Set() : null;
    function registerScope(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
      for (var initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
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
      for (var index = 0; index < scopes.length; index += 1) {
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
      var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
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
      for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
        var scope = scopes[scopeIndex];
        if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
      var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
        return fallbackValue;
      };
      var validate = typeof validator === 'function' ? validator : function alwaysValid() {
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
      for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
        var scope = scopes[scopeIndex];
        if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
    var assignedTemperatureRenderer = null;
    function assignTemperatureRenderer(renderer) {
      if (typeof renderer !== 'function') {
        return;
      }
      assignedTemperatureRenderer = renderer;
      withEachScope(function applyRenderer(scope) {
        if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
          return;
        }
        try {
          scope[temperatureRenderName] = renderer;
          var pending = scope[temperatureQueueKey];
          if (pending && _typeof(pending) === 'object') {
            if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
              var hours = pending.latestHours;
              if (typeof hours !== 'undefined') {
                try {
                  renderer(hours);
                } catch (temperatureRenderError) {
                  if (typeof console !== 'undefined' && typeof console.error === 'function') {
                    console.error('Failed to apply pending temperature note render', temperatureRenderError);
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
    var autoGearGuards = {
      isReferenceError: function defaultAutoGearReferenceGuard() {
        return false;
      },
      repair: function defaultAutoGearRepair() {
        return undefined;
      }
    };
    function setAutoGearGuards(nextGuards) {
      if (!nextGuards || _typeof(nextGuards) !== 'object') {
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
      registerScope: registerScope,
      withEachScope: withEachScope,
      getScopes: getScopes,
      getPrimaryScope: getPrimaryScope,
      ensureValue: ensureValue,
      normaliseValue: normaliseValue,
      readValue: readValue,
      assignTemperatureRenderer: assignTemperatureRenderer,
      getAssignedTemperatureRenderer: getAssignedTemperatureRenderer,
      autoGearGuards: autoGearGuards,
      setAutoGearGuards: setAutoGearGuards
    };
  }
  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    var registryName = 'cineCoreRuntimeStateModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.localRuntimeState = namespace;
    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  var namespace = {
    createLocalRuntimeState: createLocalRuntimeState
  };
  assignToGlobal(namespace);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();