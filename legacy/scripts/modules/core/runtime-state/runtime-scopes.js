function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectAmbientScope(primary) {
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
    var referenceScope = detectAmbientScope(primaryScope);
    var scopes = [];
    if (environmentHelpers && typeof environmentHelpers.fallbackCollectCandidateScopes === 'function') {
      try {
        var collected = environmentHelpers.fallbackCollectCandidateScopes(referenceScope);
        if (Array.isArray(collected)) {
          for (var collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            registerCandidateScope(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }
    registerCandidateScope(scopes, referenceScope);
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
      detected = detectAmbientScope(referenceScope);
    }
    registerCandidateScope(scopes, detected);
    return scopes;
  }
  function syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers) {
    if (!Array.isArray(candidateScopes)) {
      return [];
    }
    var referenceScope = detectAmbientScope(primaryScope);
    var scopes = collectCandidateScopes(referenceScope, environmentHelpers);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        if (scope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes) {
          scope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
        }
      } catch (assignError) {
        void assignError;
      }
    }
    return candidateScopes;
  }
  function resolveCandidateScopes(primaryScope, environmentHelpers) {
    var referenceScope = detectAmbientScope(primaryScope);
    if (referenceScope && _typeof(referenceScope) === 'object') {
      try {
        var existing = referenceScope.CORE_RUNTIME_CANDIDATE_SCOPES;
        if (Array.isArray(existing)) {
          return syncCandidateScopes(existing, referenceScope, environmentHelpers);
        }
      } catch (lookupError) {
        void lookupError;
      }
    }
    var candidateScopes = collectCandidateScopes(referenceScope, environmentHelpers);
    return syncCandidateScopes(candidateScopes, referenceScope, environmentHelpers);
  }
  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    var registryName = 'cineCoreRuntimeStateScopes';
    try {
      scope[registryName] = namespace;
    } catch (assignError) {
      void assignError;
    }
  }
  var namespace = {
    collectCandidateScopes: collectCandidateScopes,
    resolveCandidateScopes: resolveCandidateScopes,
    syncCandidateScopes: syncCandidateScopes
  };
  assignToGlobal(namespace);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();