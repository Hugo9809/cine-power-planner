/*
 * Cine Power Planner runtime scope helpers (legacy bundle).
 *
 * Mirroring the modern bundle split, this file isolates the defensive
 * scope-detection helpers so the remaining legacy app-core segments can
 * shrink without sacrificing the offline-ready fallbacks that protect
 * autosave, backup, restore, and sharing flows on older browsers.
 */

var CORE_RUNTIME_SCOPE_TOOLS = function resolveRuntimeScopeTools() {
  var namespaceName = 'cineCoreRuntimeScopeTools';

  function readFromScope(candidateScope) {
    if (!candidateScope || typeof candidateScope !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }

    try {
      var tools = candidateScope[namespaceName];
      return tools && typeof tools === 'object' ? tools : null;
    } catch (candidateLookupError) {
      void candidateLookupError;
    }

    return null;
  }

  var candidates = [function resolveCoreGlobalScopeCandidate() {
    try {
      return typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
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
      if (requiredTools && typeof requiredTools === 'object') {
        return requiredTools;
      }
    } catch (runtimeScopeToolsError) {
      void runtimeScopeToolsError;
    }
  }

  for (var fallbackIndex = 0; fallbackIndex < candidates.length; fallbackIndex += 1) {
    var fallbackTools = readFromScope(candidates[fallbackIndex]);
    if (fallbackTools) {
      return fallbackTools;
    }
  }

  return null;
}();

function inlineResolvePrimaryScopeCandidate() {
  try {
    if (typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE) {
      return CORE_GLOBAL_SCOPE;
    }
  } catch (coreGlobalScopeError) {
    void coreGlobalScopeError;
  }

  try {
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.CORE_GLOBAL_SCOPE === 'object' && globalThis.CORE_GLOBAL_SCOPE) {
      return globalThis.CORE_GLOBAL_SCOPE;
    }
  } catch (globalThisCoreScopeError) {
    void globalThisCoreScopeError;
  }

  return null;
}

var CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE = CORE_RUNTIME_SCOPE_TOOLS && typeof CORE_RUNTIME_SCOPE_TOOLS.getPrimaryScopeCandidate === 'function' ? CORE_RUNTIME_SCOPE_TOOLS.getPrimaryScopeCandidate() : inlineResolvePrimaryScopeCandidate();

var collectRuntimeScopeCandidates = CORE_RUNTIME_SCOPE_TOOLS && typeof CORE_RUNTIME_SCOPE_TOOLS.getScopeCandidates === 'function' ? function collectRuntimeScopeCandidates(additionalCandidates) {
  if (typeof additionalCandidates === 'undefined') {
    additionalCandidates = [];
  }

  return CORE_RUNTIME_SCOPE_TOOLS.getScopeCandidates({
    primaryCandidate: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
    extraCandidates: additionalCandidates
  });
} : function collectRuntimeScopeCandidates(additionalCandidates) {
  if (typeof additionalCandidates === 'undefined') {
    additionalCandidates = [];
  }

  var baselineCandidates = [CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE, inlineResolvePrimaryScopeCandidate(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  var extras = Array.isArray(additionalCandidates) ? additionalCandidates : [additionalCandidates];

  for (var index = 0; index < extras.length; index += 1) {
    baselineCandidates.push(extras[index]);
  }

  var resolved = [];
  for (var candidateIndex = 0; candidateIndex < baselineCandidates.length; candidateIndex += 1) {
    var candidate = baselineCandidates[candidateIndex];
    if (!candidate || typeof candidate !== 'object' && typeof candidate !== 'function') {
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
