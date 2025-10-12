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
  function registerCandidateScope(scopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    for (var index = 0; index < scopes.length; index += 1) {
      if (scopes[index] === scope) {
        return;
      }
    }
    scopes.push(scope);
  }
  function collectCandidateScopes(primaryScope, environmentHelpers) {
    var scopes = [];
    if (environmentHelpers && typeof environmentHelpers.fallbackCollectCandidateScopes === 'function') {
      try {
        var collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
        if (Array.isArray(collected)) {
          for (var collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            registerCandidateScope(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }
    registerCandidateScope(scopes, primaryScope);
    registerCandidateScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerCandidateScope(scopes, typeof window !== 'undefined' ? window : null);
    registerCandidateScope(scopes, typeof self !== 'undefined' ? self : null);
    registerCandidateScope(scopes, typeof global !== 'undefined' ? global : null);
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
      detected = detectScope(primaryScope);
    }
    registerCandidateScope(scopes, detected);
    return scopes;
  }
  function registerScope(runtimeState, scope) {
    if (!runtimeState || typeof runtimeState.registerScope !== 'function') {
      return;
    }
    try {
      runtimeState.registerScope(scope);
    } catch (registerError) {
      void registerError;
    }
  }
  function registerScopes(runtimeState, candidateScopes) {
    if (!Array.isArray(candidateScopes)) {
      return;
    }
    for (var index = 0; index < candidateScopes.length; index += 1) {
      registerScope(runtimeState, candidateScopes[index]);
    }
  }
  function getScopesSnapshot(runtimeState, candidateScopes) {
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
  function ensurePrimaryScope(runtimeState, candidateScopes) {
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
  function assignTemperatureRenderer(runtimeState, renderer) {
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
  function readValue(runtimeState, name, candidateScopes) {
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
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
  function ensureValue(runtimeState, name, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.ensureValue === 'function') {
      try {
        return runtimeState.ensureValue(name, fallbackValue);
      } catch (ensureValueError) {
        void ensureValueError;
      }
    }
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
    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
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
    } catch (fallbackProviderError) {
      void fallbackProviderError;
      return undefined;
    }
  }
  function normaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.normaliseValue === 'function') {
      try {
        runtimeState.normaliseValue(name, validator, fallbackValue);
        return;
      } catch (normaliseValueError) {
        void normaliseValueError;
      }
    }
    var validate = typeof validator === 'function' ? validator : function alwaysValid() {
      return true;
    };
    var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
      return fallbackValue;
    };
    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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