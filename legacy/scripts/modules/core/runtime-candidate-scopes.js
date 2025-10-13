function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isValidScope(scope) {
    return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
  }
  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
  }
  function registerScope(scopes, seenScopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }
    if (!isValidScope(scope)) {
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
  function detectFallbackGlobalScope(primaryScope) {
    if (isValidScope(primaryScope)) {
      return primaryScope;
    }
    if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && isValidScope(window)) {
      return window;
    }
    if (typeof self !== 'undefined' && isValidScope(self)) {
      return self;
    }
    if (typeof global !== 'undefined' && isValidScope(global)) {
      return global;
    }
    return null;
  }
  function collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers) {
    if (runtimeShared && typeof runtimeShared.collectCandidateScopes === 'function') {
      try {
        var sharedScopes = runtimeShared.collectCandidateScopes(primaryScope, environmentHelpers);
        if (Array.isArray(sharedScopes)) {
          return sharedScopes;
        }
      } catch (collectRuntimeScopesError) {
        void collectRuntimeScopesError;
      }
    }
    var scopes = [];
    var seenScopes = typeof Set === 'function' ? new Set() : null;
    registerScope(scopes, seenScopes, primaryScope);
    registerScope(scopes, seenScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function resolveCandidateScopes(options) {
    var primaryScope = options && options.primaryScope;
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    var currentCandidateScopes = options && options.currentCandidateScopes;
    if (isScopeList(currentCandidateScopes)) {
      return currentCandidateScopes;
    }
    var resolvedScopes = null;
    if (runtimeShared && typeof runtimeShared.resolveCandidateScopes === 'function') {
      try {
        resolvedScopes = runtimeShared.resolveCandidateScopes(primaryScope, environmentHelpers);
      } catch (resolveCandidateScopesError) {
        void resolveCandidateScopesError;
        resolvedScopes = null;
      }
    }
    if (!resolvedScopes) {
      resolvedScopes = collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers);
    }
    return resolvedScopes;
  }
  function syncCandidateScopes(candidateScopes, options) {
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    var primaryScope = options && options.primaryScope;
    var globalScope = options && options.globalScope || detectFallbackGlobalScope(primaryScope);
    var assignCurrentCandidateScopes = options && options.assignCurrentCandidateScopes;
    if (runtimeShared && typeof runtimeShared.syncCandidateScopes === 'function') {
      try {
        runtimeShared.syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers);
        return candidateScopes;
      } catch (syncCandidateScopesError) {
        void syncCandidateScopesError;
      }
    }
    if (isValidScope(globalScope) && (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES || globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)) {
      try {
        globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
      } catch (assignError) {
        void assignError;
      }
    }
    if (typeof assignCurrentCandidateScopes === 'function') {
      try {
        assignCurrentCandidateScopes(candidateScopes);
      } catch (candidateAssignError) {
        void candidateAssignError;
      }
    }
    return candidateScopes;
  }
  function ensureCandidateScopes(options) {
    var candidateScopes = resolveCandidateScopes(options || {});
    return syncCandidateScopes(candidateScopes, options || {});
  }
  var namespace = {
    collectCandidateScopesWithFallback: collectCandidateScopesWithFallback,
    resolveCandidateScopes: resolveCandidateScopes,
    syncCandidateScopes: syncCandidateScopes,
    ensureCandidateScopes: ensureCandidateScopes
  };
  var globalScope = detectFallbackGlobalScope();
  var targetName = 'cineCoreRuntimeCandidateScopes';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
  }
  if (isValidScope(globalScope)) {
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