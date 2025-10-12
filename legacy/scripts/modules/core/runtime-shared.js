function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectAmbientScope() {
    if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis) === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && _typeof(window) === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && _typeof(self) === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && _typeof(global) === 'object') {
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

  function fallbackRegisterCandidateScope(scopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }

    if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
      return;
    }

    for (var index = 0; index < scopes.length; index += 1) {
      if (scopes[index] === scope) {
        return;
      }
    }

    scopes.push(scope);
  }

  function fallbackCollectCandidateScopes(primaryScope, environmentHelpers, detect, register) {
    var scopes = [];

    if (environmentHelpers && typeof environmentHelpers.fallbackCollectCandidateScopes === 'function') {
      try {
        var collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
        if (Array.isArray(collected)) {
          for (var collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            register(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }

    register(scopes, primaryScope);
    register(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    register(scopes, typeof window !== 'undefined' ? window : null);
    register(scopes, typeof self !== 'undefined' ? self : null);
    register(scopes, typeof global !== 'undefined' ? global : null);

    var detected = null;

    if (environmentHelpers && typeof environmentHelpers.fallbackDetectGlobalScope === 'function') {
      try {
        detected = environmentHelpers.fallbackDetectGlobalScope();
      } catch (detectError) {
        void detectError;
        detected = null;
      }
    }

    if (!detected) {
      detected = detect(primaryScope);
    }

    register(scopes, detected);

    return scopes;
  }

  function fallbackRegisterScope(runtimeState, scope) {
    if (!runtimeState || typeof runtimeState.registerScope !== 'function') {
      return;
    }

    try {
      runtimeState.registerScope(scope);
    } catch (registerError) {
      void registerError;
    }
  }

  function fallbackRegisterScopes(runtimeState, candidateScopes, register) {
    if (!Array.isArray(candidateScopes)) {
      return;
    }

    for (var index = 0; index < candidateScopes.length; index += 1) {
      register(runtimeState, candidateScopes[index]);
    }
  }

  function fallbackGetScopesSnapshot(runtimeState, candidateScopes) {
    if (runtimeState && typeof runtimeState.getScopes === 'function') {
      try {
        var runtimeScopes = runtimeState.getScopes();
        if (Array.isArray(runtimeScopes)) {
          return runtimeScopes.slice();
        }
      } catch (getScopesError) {
        void getScopesError;
      }
    }

    if (Array.isArray(candidateScopes)) {
      return candidateScopes.slice();
    }

    return [];
  }

  function fallbackEnsurePrimaryScope(runtimeState, candidateScopes) {
    if (runtimeState && typeof runtimeState.getPrimaryScope === 'function') {
      try {
        var primary = runtimeState.getPrimaryScope();
        if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
          return primary;
        }
      } catch (getPrimaryError) {
        void getPrimaryError;
      }
    }

    if (Array.isArray(candidateScopes)) {
      for (var index = 0; index < candidateScopes.length; index += 1) {
        var candidate = candidateScopes[index];
        if (candidate && (_typeof(candidate) === 'object' || typeof candidate === 'function')) {
          return candidate;
        }
      }
    }

    return null;
  }

  function fallbackAssignTemperatureRenderer(runtimeState, renderer) {
    if (typeof renderer !== 'function') {
      return;
    }

    if (!runtimeState || typeof runtimeState.assignTemperatureRenderer !== 'function') {
      return;
    }

    try {
      runtimeState.assignTemperatureRenderer(renderer);
    } catch (assignRendererError) {
      void assignRendererError;
    }
  }

  function fallbackReadValue(runtimeState, name, candidateScopes) {
    if (runtimeState && typeof runtimeState.readValue === 'function') {
      try {
        return runtimeState.readValue(name);
      } catch (readValueError) {
        void readValueError;
      }
    }

    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (name in scope) {
          return scope[name];
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    return undefined;
  }

  function fallbackEnsureValue(runtimeState, name, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.ensureValue === 'function') {
      try {
        return runtimeState.ensureValue(name, fallbackValue);
      } catch (ensureValueError) {
        void ensureValueError;
      }
    }

    var fallbackProvider =
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

    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
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
    } catch (fallbackProviderError) {
      void fallbackProviderError;
      return undefined;
    }
  }

  function fallbackNormaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.normaliseValue === 'function') {
      try {
        runtimeState.normaliseValue(name, validator, fallbackValue);
        return;
      } catch (normaliseValueError) {
        void normaliseValueError;
      }
    }

    var validate =
      typeof validator === 'function'
        ? validator
        : function alwaysValid() {
            return true;
          };

    var fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (!validate(scope[name])) {
          scope[name] = fallbackProvider();
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    }
  }

  function loadModuleFromRegistry(name) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }

    try {
      var registry = scope.cineCoreRuntimeSharedModules;
      if (registry && _typeof(registry) === 'object') {
        var module = registry[name];
        if (module && _typeof(module) === 'object') {
          return module;
        }
      }
    } catch (registryLookupError) {
      void registryLookupError;
    }

    return null;
  }

  function loadModule(name, requirePath) {
    var resolved = null;

    if (typeof require === 'function') {
      try {
        resolved = require(requirePath);
      } catch (moduleRequireError) {
        void moduleRequireError;
      }
    }

    if (!resolved) {
      resolved = loadModuleFromRegistry(name);
    }

    return resolved || null;
  }

  var scopeDetectionModule = loadModule('scopeDetection', './runtime-shared/scope-detection.js') || {};
  var scopeRegistrationModule = loadModule('scopeRegistration', './runtime-shared/scope-registration.js') || {};
  var scopeSnapshotModule = loadModule('scopeSnapshot', './runtime-shared/scope-snapshot.js') || {};
  var temperatureToolsModule = loadModule('temperatureTools', './runtime-shared/temperature-tools.js') || {};
  var valueAccessModule = loadModule('valueAccess', './runtime-shared/value-access.js') || {};

  var detectScope =
    typeof scopeDetectionModule.detectScope === 'function'
      ? scopeDetectionModule.detectScope
      : fallbackDetectScope;

  var registerCandidateScope =
    typeof scopeDetectionModule.registerCandidateScope === 'function'
      ? scopeDetectionModule.registerCandidateScope
      : fallbackRegisterCandidateScope;

  var collectCandidateScopes =
    typeof scopeDetectionModule.collectCandidateScopes === 'function'
      ? function collectCandidateScopesWrapper(primaryScope, environmentHelpers) {
          return scopeDetectionModule.collectCandidateScopes(primaryScope, environmentHelpers);
        }
      : function fallbackCollectCandidateScopesWrapper(primaryScope, environmentHelpers) {
          return fallbackCollectCandidateScopes(
            primaryScope,
            environmentHelpers,
            detectScope,
            registerCandidateScope,
          );
        };

  var registerScope =
    typeof scopeRegistrationModule.registerScope === 'function'
      ? scopeRegistrationModule.registerScope
      : function fallbackRegisterScopeWrapper(runtimeState, scope) {
          fallbackRegisterScope(runtimeState, scope);
        };

  var registerScopes =
    typeof scopeRegistrationModule.registerScopes === 'function'
      ? function registerScopesWrapper(runtimeState, candidateScopes) {
          scopeRegistrationModule.registerScopes(runtimeState, candidateScopes);
        }
      : function fallbackRegisterScopesWrapper(runtimeState, candidateScopes) {
          fallbackRegisterScopes(runtimeState, candidateScopes, registerScope);
        };

  var getScopesSnapshot =
    typeof scopeSnapshotModule.getScopesSnapshot === 'function'
      ? scopeSnapshotModule.getScopesSnapshot
      : fallbackGetScopesSnapshot;

  var ensurePrimaryScope =
    typeof scopeSnapshotModule.ensurePrimaryScope === 'function'
      ? scopeSnapshotModule.ensurePrimaryScope
      : fallbackEnsurePrimaryScope;

  var assignTemperatureRenderer =
    typeof temperatureToolsModule.assignTemperatureRenderer === 'function'
      ? temperatureToolsModule.assignTemperatureRenderer
      : fallbackAssignTemperatureRenderer;

  var readValue =
    typeof valueAccessModule.readValue === 'function'
      ? valueAccessModule.readValue
      : fallbackReadValue;

  var ensureValue =
    typeof valueAccessModule.ensureValue === 'function'
      ? valueAccessModule.ensureValue
      : function fallbackEnsureValueWrapper(runtimeState, name, fallbackValue, candidateScopes) {
          return fallbackEnsureValue(runtimeState, name, fallbackValue, candidateScopes);
        };

  var normaliseValue =
    typeof valueAccessModule.normaliseValue === 'function'
      ? valueAccessModule.normaliseValue
      : function fallbackNormaliseValueWrapper(runtimeState, name, validator, fallbackValue, candidateScopes) {
          fallbackNormaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes);
        };

  var namespace = {
    collectCandidateScopes: collectCandidateScopes,
    registerScope: registerScope,
    registerScopes: registerScopes,
    getScopesSnapshot: getScopesSnapshot,
    ensurePrimaryScope: ensurePrimaryScope,
    assignTemperatureRenderer: assignTemperatureRenderer,
    readValue: readValue,
    ensureValue: ensureValue,
    normaliseValue: normaliseValue
  };

  var globalScope = detectScope();
  var targetName = 'cineCoreRuntimeShared';
  var existing =
    globalScope && _typeof(globalScope[targetName]) === 'object'
      ? globalScope[targetName]
      : {};

  var target = existing;
  for (var key in namespace) {
    if (Object.prototype.hasOwnProperty.call(namespace, key)) {
      target[key] = namespace[key];
    }
  }

  if (globalScope && (_typeof(globalScope) === 'object' || typeof globalScope === 'function')) {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = target;
  }
})();
