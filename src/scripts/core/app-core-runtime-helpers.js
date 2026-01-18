/* global CORE_GLOBAL_SCOPE, CORE_PART2_RUNTIME_SCOPE, CORE_SHARED_SCOPE_PART2, CORE_SHARED,
          collectRuntimeScopeCandidates, resolveCoreSupportModule */

/*
 * Cine Power Planner runtime helpers (Shim).
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/core/runtime-helpers.js`.
 * This file remains as a backwards-compatibility shim to expose
 * global variables.
 */

import {
  FALLBACK_HUMANIZE_OVERRIDES,
  fallbackStableStringify,
  fallbackHumanizeKey,
  createArrayFromCandidates,
  createDefaultLanguageTexts,
  fallbackNormalizeAutoGearWeightOperator,
  fallbackNormalizeAutoGearWeightValue,
  fallbackFormatAutoGearWeight,
  resolveAutoGearWeightHelpers,
  resolveRuntimeScopeTools,
  fallbackCreateRuntimeScopeCandidates,
  fallbackReadCoreScopeValue,
  fallbackWriteCoreScopeValue,
  fallbackDeclareCoreFallbackBinding
} from '../modules/core/runtime-helpers.js';

export {
  FALLBACK_HUMANIZE_OVERRIDES,
  fallbackStableStringify,
  fallbackHumanizeKey,
  createArrayFromCandidates,
  createDefaultLanguageTexts,
  fallbackNormalizeAutoGearWeightOperator,
  fallbackNormalizeAutoGearWeightValue,
  fallbackFormatAutoGearWeight,
  resolveAutoGearWeightHelpers,
  resolveRuntimeScopeTools,
  fallbackCreateRuntimeScopeCandidates,
  fallbackReadCoreScopeValue,
  fallbackWriteCoreScopeValue,
  fallbackDeclareCoreFallbackBinding
};

function createFallbackGetAutoGearCameraWeightOperatorLabel(normalizeOperator, fallbackTextsFactory) {
  return function fallbackGetAutoGearCameraWeightOperatorLabel(operator, langTexts) {
    const textsForLang = langTexts || {};
    const fallbackTexts = fallbackTextsFactory();
    const normalized = normalizeOperator(operator);
    if (normalized === 'less') {
      return (
        textsForLang.autoGearCameraWeightOperatorLess ||
        fallbackTexts.autoGearCameraWeightOperatorLess ||
        'Lighter than'
      );
    }
    if (normalized === 'equal') {
      return (
        textsForLang.autoGearCameraWeightOperatorEqual ||
        fallbackTexts.autoGearCameraWeightOperatorEqual ||
        'Exactly'
      );
    }
    return (
      textsForLang.autoGearCameraWeightOperatorGreater ||
      fallbackTexts.autoGearCameraWeightOperatorGreater ||
      'Heavier than'
    );
  };
}

function createFallbackFormatAutoGearCameraWeight(formatWeight, getOperatorLabel) {
  return function fallbackFormatAutoGearCameraWeight(condition, langTexts) {
    if (!condition || !Number.isFinite(condition.value)) return '';
    const label = getOperatorLabel(condition.operator, langTexts);
    const formattedValue = formatWeight(condition.value);
    if (!label) {
      return `${formattedValue} g`;
    }
    return `${label} ${formattedValue} g`;
  };
}


export var CORE_PART2_RUNTIME_HELPERS = (function initialisePart2RuntimeHelpers() {
  let helpers = null;

  if (typeof resolveCoreSupportModule === 'function') {
    try {
      const resolved = resolveCoreSupportModule(
        'cineCorePart2RuntimeHelpers',
        './modules/app-core/runtime.js'
      );
      if (resolved && typeof resolved === 'object') {
        helpers = resolved;
      }
    } catch (helperResolutionError) {
      void helperResolutionError;
    }
  }

  if (helpers && typeof helpers === 'object') {
    return helpers;
  }

  return {
    resolveAutoGearWeightHelpers,
    resolveRuntimeScopeTools,
    fallbackStableStringify,
    fallbackHumanizeKey,
    fallbackNormalizeAutoGearWeightOperator,
    fallbackNormalizeAutoGearWeightValue,
    fallbackFormatAutoGearWeight,
    fallbackNormalizeAutoGearCameraWeightCondition: function fallbackNormalizeAutoGearCameraWeightCondition(condition) {
      if (!condition || typeof condition !== 'object') {
        return null;
      }
      return null;
    },
    fallbackGetAutoGearCameraWeightOperatorLabel: createFallbackGetAutoGearCameraWeightOperatorLabel(
      fallbackNormalizeAutoGearWeightOperator,
      function fallbackTexts() {
        return createDefaultLanguageTexts(
          typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null
        );
      }
    ),
    fallbackFormatAutoGearCameraWeight: createFallbackFormatAutoGearCameraWeight(
      fallbackFormatAutoGearWeight,
      createFallbackGetAutoGearCameraWeightOperatorLabel(
        fallbackNormalizeAutoGearWeightOperator,
        function fallbackTexts() {
          return createDefaultLanguageTexts(
            typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null
          );
        }
      )
    ),
    fallbackCreateRuntimeScopeCandidates,
    fallbackReadCoreScopeValue,
    fallbackWriteCoreScopeValue,
    fallbackDeclareCoreFallbackBinding,
  };
})();


(function exposePart2RuntimeHelpers(namespace) {
  if (!namespace || typeof namespace !== 'object') {
    return;
  }

  const candidateScopes = createArrayFromCandidates(
    typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' ? CORE_PART2_RUNTIME_SCOPE : null,
    typeof CORE_SHARED_SCOPE_PART2 !== 'undefined' ? CORE_SHARED_SCOPE_PART2 : null,
    typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null
  );

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const existing = scope.cineCorePart2RuntimeHelpers;
      if (existing && typeof existing === 'object') {
        if (typeof Object.assign === 'function') {
          Object.assign(existing, namespace);
        } else {
          for (const key in namespace) {
            if (Object.prototype.hasOwnProperty.call(namespace, key)) {
              existing[key] = namespace[key];
            }
          }
        }
        continue;
      }

      scope.cineCorePart2RuntimeHelpers = namespace;
    } catch (exposeError) {
      void exposeError;
    }
  }
})(CORE_PART2_RUNTIME_HELPERS);


(function exposeRuntimeHelpersOnSharedNamespace(namespace) {
  if (!namespace || typeof namespace !== 'object') {
    return;
  }

  const candidateScopes = createArrayFromCandidates(
    typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' ? CORE_PART2_RUNTIME_SCOPE : null,
    typeof CORE_SHARED_SCOPE_PART2 !== 'undefined' ? CORE_SHARED_SCOPE_PART2 : null,
    typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null
  );

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      if (scope.cineCoreShared && typeof scope.cineCoreShared === 'object') {
        const sharedHelpers = scope.cineCoreShared.cineCoreRuntimeHelpers;
        if (!sharedHelpers || typeof sharedHelpers !== 'object') {
          scope.cineCoreShared.cineCoreRuntimeHelpers = namespace;
        } else if (typeof Object.assign === 'function') {
          Object.assign(sharedHelpers, namespace);
        } else {
          // shim assign
        }
      }
    } catch (e) { void e; }
  }
})(CORE_PART2_RUNTIME_HELPERS);
