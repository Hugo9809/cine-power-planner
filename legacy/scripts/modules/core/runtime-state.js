function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }
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
  function hasArrayEntry(array, value) {
    if (!Array.isArray(array)) {
      return false;
    }
    for (var index = 0; index < array.length; index += 1) {
      if (array[index] === value) {
        return true;
      }
    }
    return false;
  }
  function createSafeFreezeRegistry(initialValues) {
    var registry = typeof WeakSet === 'function' ? new WeakSet() : [];
    if (Array.isArray(initialValues)) {
      for (var index = 0; index < initialValues.length; index += 1) {
        try {
          registerSafeFreezeEntry(registry, initialValues[index]);
        } catch (initialisationError) {
          void initialisationError;
        }
      }
    }
    return registry;
  }
  function ensureSafeFreezeRegistry(registry, initialValues) {
    if (registry && (typeof registry.add === 'function' || Array.isArray(registry))) {
      return registry;
    }
    return createSafeFreezeRegistry(initialValues);
  }
  function hasSafeFreezeEntry(registry, value) {
    if (!registry || !value) {
      return false;
    }
    if (typeof registry.has === 'function') {
      try {
        return registry.has(value);
      } catch (registryHasError) {
        void registryHasError;
        return false;
      }
    }
    return hasArrayEntry(registry, value);
  }
  function registerSafeFreezeEntry(registry, value) {
    if (!registry || !value) {
      return registry;
    }
    if (typeof registry.add === 'function') {
      try {
        registry.add(value);
      } catch (registryAddError) {
        void registryAddError;
      }
      return registry;
    }
    if (!hasArrayEntry(registry, value) && Array.isArray(registry)) {
      registry.push(value);
    }
    return registry;
  }
  function resolveTemperatureKeyDefaults() {
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
  }
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
  var namespace = {
    detectScope: detectScope,
    createSafeFreezeRegistry: createSafeFreezeRegistry,
    ensureSafeFreezeRegistry: ensureSafeFreezeRegistry,
    hasSafeFreezeEntry: hasSafeFreezeEntry,
    registerSafeFreezeEntry: registerSafeFreezeEntry,
    resolveTemperatureKeyDefaults: resolveTemperatureKeyDefaults,
    createLocalRuntimeState: createLocalRuntimeState
  };
  var globalScope = detectScope();
  var targetName = 'cineCoreRuntimeState';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
  }
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = target;
  }
})();