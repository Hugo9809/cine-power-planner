function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isScopeCandidate(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function readCoreGlobalScope() {
    try {
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isScopeCandidate(CORE_GLOBAL_SCOPE)) {
        return CORE_GLOBAL_SCOPE;
      }
    } catch (coreGlobalScopeLookupError) {
      void coreGlobalScopeLookupError;
    }
    try {
      if (typeof globalThis !== 'undefined' && isScopeCandidate(globalThis) && isScopeCandidate(globalThis.CORE_GLOBAL_SCOPE)) {
        return globalThis.CORE_GLOBAL_SCOPE;
      }
    } catch (globalThisLookupError) {
      void globalThisLookupError;
    }
    return null;
  }
  function getPrimaryScopeCandidate(explicitCandidate) {
    if (isScopeCandidate(explicitCandidate)) {
      return explicitCandidate;
    }
    var coreScope = readCoreGlobalScope();
    if (isScopeCandidate(coreScope)) {
      return coreScope;
    }
    return null;
  }
  function appendCandidate(target, candidate) {
    if (!isScopeCandidate(candidate)) {
      return;
    }
    for (var index = 0; index < target.length; index += 1) {
      if (target[index] === candidate) {
        return;
      }
    }
    target.push(candidate);
  }
  function readDefaultGlobalScopes() {
    var defaults = [];
    if (typeof globalThis !== 'undefined') {
      appendCandidate(defaults, globalThis);
    }
    if (typeof window !== 'undefined') {
      appendCandidate(defaults, window);
    }
    if (typeof self !== 'undefined') {
      appendCandidate(defaults, self);
    }
    if (typeof global !== 'undefined') {
      appendCandidate(defaults, global);
    }
    return defaults;
  }
  function getScopeCandidates(options) {
    var settings = options && _typeof(options) === 'object' ? options : {};
    var primaryCandidate = settings.primaryCandidate,
      _settings$includeCore = settings.includeCoreGlobalScope,
      includeCoreGlobalScope = _settings$includeCore === void 0 ? true : _settings$includeCore,
      _settings$includeDefa = settings.includeDefaultGlobals,
      includeDefaultGlobals = _settings$includeDefa === void 0 ? true : _settings$includeDefa,
      _settings$extraCandid = settings.extraCandidates,
      extraCandidates = _settings$extraCandid === void 0 ? [] : _settings$extraCandid;
    var candidates = [];
    appendCandidate(candidates, typeof primaryCandidate === 'undefined' ? getPrimaryScopeCandidate() : primaryCandidate);
    if (includeCoreGlobalScope) {
      appendCandidate(candidates, readCoreGlobalScope());
    }
    if (includeDefaultGlobals) {
      var defaults = readDefaultGlobalScopes();
      for (var index = 0; index < defaults.length; index += 1) {
        appendCandidate(candidates, defaults[index]);
      }
    }
    var extras = Array.isArray(extraCandidates) ? extraCandidates : [extraCandidates];
    for (var _index = 0; _index < extras.length; _index += 1) {
      appendCandidate(candidates, extras[_index]);
    }
    return candidates;
  }
  function detectFirstAvailableScope(primaryCandidate, options) {
    var candidates = getScopeCandidates({
      primaryCandidate: primaryCandidate,
      includeCoreGlobalScope: true,
      includeDefaultGlobals: true,
      extraCandidates: options && options.extraCandidates
    });
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        return candidate;
      }
    }
    return null;
  }
  function resolveAttachmentScope() {
    var candidates = getScopeCandidates({
      includeDefaultGlobals: true
    });
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        return candidate;
      }
    }
    return null;
  }
  var namespace = {
    isScopeCandidate: isScopeCandidate,
    getPrimaryScopeCandidate: getPrimaryScopeCandidate,
    getScopeCandidates: getScopeCandidates,
    detectFirstAvailableScope: detectFirstAvailableScope
  };
  var attachmentScope = resolveAttachmentScope();
  var namespaceName = 'cineCoreRuntimeScopeTools';
  if (attachmentScope && _typeof(attachmentScope) === 'object') {
    var existing = attachmentScope[namespaceName] && _typeof(attachmentScope[namespaceName]) === 'object' ? attachmentScope[namespaceName] : {};
    for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      existing[key] = namespace[key];
    }
    try {
      attachmentScope[namespaceName] = existing;
    } catch (attachError) {
      void attachError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();