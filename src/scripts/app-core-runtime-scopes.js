/* global CORE_GLOBAL_SCOPE */
/* exported collectRuntimeScopeCandidates */

/*
 * Cine Power Planner runtime scope helpers.
 *
 * This module extracts the shared runtime scope detection utilities from the
 * growing `app-core-new-1.js` bundle so the refactor can continue in smaller
 * stages without risking regressions. Keeping these helpers in their own file
 * allows upcoming steps to import or reuse them without repeating defensive
 * fallbacks that protect autosave, backup, restore, and offline cache flows.
 *
 * Please retain this explanatory header while the refactor is in progress so
 * Git's rename heuristics continue to treat this file as intentionally new and
 * the review history remains readable.
 */

const CORE_RUNTIME_SCOPE_TOOLS = (function resolveRuntimeScopeTools() {
  const namespaceName = 'cineCoreRuntimeScopeTools';

  function readFromScope(candidateScope) {
    if (
      !candidateScope ||
      (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
    ) {
      return null;
    }

    try {
      const tools = candidateScope[namespaceName];
      return tools && typeof tools === 'object' ? tools : null;
    } catch (candidateLookupError) {
      void candidateLookupError;
    }

    return null;
  }

  const candidates = [
    (function resolveCoreGlobalScopeCandidate() {
      try {
        return typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
      } catch (coreGlobalScopeLookupError) {
        void coreGlobalScopeLookupError;
      }
      return null;
    })(),
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < candidates.length; index += 1) {
    const tools = readFromScope(candidates[index]);
    if (tools) {
      return tools;
    }
  }

  if (typeof require === 'function') {
    try {
      const requiredTools = require('./modules/core/runtime-scope-tools.js');
      if (requiredTools && typeof requiredTools === 'object') {
        return requiredTools;
      }
    } catch (runtimeScopeToolsError) {
      void runtimeScopeToolsError;
    }
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const tools = readFromScope(candidates[index]);
    if (tools) {
      return tools;
    }
  }

  return null;
})();

function inlineResolvePrimaryScopeCandidate() {
  try {
    if (typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE) {
      return CORE_GLOBAL_SCOPE;
    }
  } catch (coreGlobalScopeError) {
    void coreGlobalScopeError;
  }

  try {
    if (
      typeof globalThis !== 'undefined' &&
      globalThis &&
      typeof globalThis.CORE_GLOBAL_SCOPE === 'object' &&
      globalThis.CORE_GLOBAL_SCOPE
    ) {
      return globalThis.CORE_GLOBAL_SCOPE;
    }
  } catch (globalThisCoreScopeError) {
    void globalThisCoreScopeError;
  }

  return null;
}

const CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE =
  CORE_RUNTIME_SCOPE_TOOLS &&
  typeof CORE_RUNTIME_SCOPE_TOOLS.getPrimaryScopeCandidate === 'function'
    ? CORE_RUNTIME_SCOPE_TOOLS.getPrimaryScopeCandidate()
    : inlineResolvePrimaryScopeCandidate();

const collectRuntimeScopeCandidates =
  CORE_RUNTIME_SCOPE_TOOLS && typeof CORE_RUNTIME_SCOPE_TOOLS.getScopeCandidates === 'function'
    ? function collectRuntimeScopeCandidates(additionalCandidates = []) {
        return CORE_RUNTIME_SCOPE_TOOLS.getScopeCandidates({
          primaryCandidate: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
          extraCandidates: additionalCandidates,
        });
      }
    : function collectRuntimeScopeCandidates(additionalCandidates = []) {
        const baselineCandidates = [
          CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
          inlineResolvePrimaryScopeCandidate(),
          typeof globalThis !== 'undefined' ? globalThis : null,
          typeof window !== 'undefined' ? window : null,
          typeof self !== 'undefined' ? self : null,
          typeof global !== 'undefined' ? global : null,
        ];

        const extras = Array.isArray(additionalCandidates)
          ? additionalCandidates
          : [additionalCandidates];

        for (let index = 0; index < extras.length; index += 1) {
          baselineCandidates.push(extras[index]);
        }

        const resolved = [];
        for (let index = 0; index < baselineCandidates.length; index += 1) {
          const candidate = baselineCandidates[index];
          if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
            continue;
          }

          let duplicate = false;
          for (let checkIndex = 0; checkIndex < resolved.length; checkIndex += 1) {
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

