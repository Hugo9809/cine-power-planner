function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var CORE_RUNTIME_SCOPE_TOOLS = function resolveRuntimeScopeTools() {
  var namespaceName = 'cineCoreRuntimeScopeTools';
  function readFromScope(candidateScope) {
    if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }
    try {
      var tools = candidateScope[namespaceName];
      return tools && _typeof(tools) === 'object' ? tools : null;
    } catch (candidateLookupError) {
      void candidateLookupError;
    }
    return null;
  }
  var candidates = [function resolveCoreGlobalScopeCandidate() {
    try {
      return (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
    } catch (coreGlobalScopeLookupError) {
      void coreGlobalScopeLookupError;
    }
    return null;
  }(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < candidates.length; index += 1) {
    var tools = readFromScope(candidates[index]);
    if (tools) {
      return tools;
    }
  }
  if (typeof require === 'function') {
    try {
      var requiredTools = require('./modules/core/runtime-scope-tools.js');
      if (requiredTools && _typeof(requiredTools) === 'object') {
        return requiredTools;
      }
    } catch (runtimeScopeToolsError) {
      void runtimeScopeToolsError;
    }
  }
  for (var _index = 0; _index < candidates.length; _index += 1) {
    var _tools = readFromScope(candidates[_index]);
    if (_tools) {
      return _tools;
    }
  }
  return null;
}();
function inlineResolvePrimaryScopeCandidate() {
  try {
    if ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE) {
      return CORE_GLOBAL_SCOPE;
    }
  } catch (coreGlobalScopeError) {
    void coreGlobalScopeError;
  }
  try {
    if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis.CORE_GLOBAL_SCOPE) === 'object' && globalThis.CORE_GLOBAL_SCOPE) {
      return globalThis.CORE_GLOBAL_SCOPE;
    }
  } catch (globalThisCoreScopeError) {
    void globalThisCoreScopeError;
  }
  return null;
}
var CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE = CORE_RUNTIME_SCOPE_TOOLS && typeof CORE_RUNTIME_SCOPE_TOOLS.getPrimaryScopeCandidate === 'function' ? CORE_RUNTIME_SCOPE_TOOLS.getPrimaryScopeCandidate() : inlineResolvePrimaryScopeCandidate();
var collectRuntimeScopeCandidates = CORE_RUNTIME_SCOPE_TOOLS && typeof CORE_RUNTIME_SCOPE_TOOLS.getScopeCandidates === 'function' ? function collectRuntimeScopeCandidates() {
  var additionalCandidates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return CORE_RUNTIME_SCOPE_TOOLS.getScopeCandidates({
    primaryCandidate: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
    extraCandidates: additionalCandidates
  });
} : function collectRuntimeScopeCandidates() {
  var additionalCandidates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var baselineCandidates = [CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE, inlineResolvePrimaryScopeCandidate(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  var extras = Array.isArray(additionalCandidates) ? additionalCandidates : [additionalCandidates];
  for (var index = 0; index < extras.length; index += 1) {
    baselineCandidates.push(extras[index]);
  }
  var resolved = [];
  for (var _index2 = 0; _index2 < baselineCandidates.length; _index2 += 1) {
    var candidate = baselineCandidates[_index2];
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      continue;
    }
    var duplicate = false;
    for (var checkIndex = 0; checkIndex < resolved.length; checkIndex += 1) {
      if (resolved[checkIndex] === candidate) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      resolved.push(candidate);
    }
  }
  return resolved;
};