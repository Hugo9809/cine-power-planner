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

  function detectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
  }

  function registerCandidateScope(scopes, scope) {
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

  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }

    var registryName = 'cineCoreRuntimeSharedModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.scopeDetection = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  var namespace = {
    detectScope: detectScope,
    registerCandidateScope: registerCandidateScope,
    collectCandidateScopes: collectCandidateScopes
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
