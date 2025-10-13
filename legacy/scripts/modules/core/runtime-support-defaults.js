function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isScopeCandidate(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function getRuntimeScopeCandidates(primaryScope) {
    var candidates = [];
    if (isScopeCandidate(primaryScope)) {
      candidates.push(primaryScope);
    }
    if (typeof globalThis !== 'undefined') {
      candidates.push(globalThis);
    }
    if (typeof window !== 'undefined') {
      candidates.push(window);
    }
    if (typeof self !== 'undefined') {
      candidates.push(self);
    }
    if (typeof global !== 'undefined') {
      candidates.push(global);
    }
    var resolved = [];
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        var alreadyPresent = false;
        for (var compareIndex = 0; compareIndex < resolved.length; compareIndex += 1) {
          if (resolved[compareIndex] === candidate) {
            alreadyPresent = true;
            break;
          }
        }
        if (!alreadyPresent) {
          resolved.push(candidate);
        }
      }
    }
    return resolved;
  }
  function fallbackDetectRuntimeScope(primaryScope) {
    var candidates = getRuntimeScopeCandidates(primaryScope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        return candidate;
      }
    }
    return null;
  }
  function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }
    var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
    if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
      return runtimeScope[namespaceName];
    }
    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        var required = require(requirePath);
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (supportModuleError) {
        void supportModuleError;
      }
    }
    return null;
  }
  function readRuntimeSupportResolver(primaryScope) {
    var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
    function detectRuntimeScope(scopeCandidate) {
      return fallbackDetectRuntimeScope(isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope);
    }
    function resolveCoreSupportModule(namespaceName, requirePath, scopeCandidate) {
      var candidateScope = isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope;
      return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
    }
    return Object.freeze({
      detectRuntimeScope: detectRuntimeScope,
      resolveCoreSupportModule: resolveCoreSupportModule
    });
  }
  var namespace = {
    fallbackDetectRuntimeScope: fallbackDetectRuntimeScope,
    fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule,
    readRuntimeSupportResolver: readRuntimeSupportResolver,
    getRuntimeScopeCandidates: getRuntimeScopeCandidates
  };
  var namespaceName = 'cineCoreRuntimeSupportDefaults';
  var attachmentCandidates = getRuntimeScopeCandidates();
  for (var index = 0; index < attachmentCandidates.length; index += 1) {
    var scope = attachmentCandidates[index];
    if (!isScopeCandidate(scope)) {
      continue;
    }
    var existing = scope[namespaceName] && _typeof(scope[namespaceName]) === 'object' ? scope[namespaceName] : {};
    for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      existing[key] = namespace[key];
    }
    try {
      scope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();