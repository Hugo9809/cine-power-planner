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

  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }

    var registryName = 'cineCoreRuntimeSharedModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.scopeSnapshot = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  var namespace = {
    getScopesSnapshot: getScopesSnapshot,
    ensurePrimaryScope: ensurePrimaryScope
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
