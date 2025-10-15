/* global CORE_GLOBAL_SCOPE, CORE_PART2_RUNTIME_SCOPE, CORE_SHARED_SCOPE_PART2, CORE_SHARED, collectRuntimeScopeCandidates, resolveCoreSupportModule */

/*
 * Cine Power Planner runtime helpers (part 2 shared fallbacks).
 *
 * This module centralises the helper utilities that used to live at the top of
 * `app-core-new-2.js`. Moving the auto gear weight normalisation helpers and
 * the runtime scope candidate fallbacks into this dedicated file keeps the
 * runtime entry lean while preserving the defensive behaviours that protect the
 * autosave, backup, restore, and offline cache flows. The helpers expose the
 * same resilient fallbacks that the monolith relied on so legacy environments
 * and offline sessions continue to resolve the necessary bindings without
 * risking data loss. Keep this banner until the refactor is complete so Git
 * keeps treating the file as intentionally new.
 */

function createArrayFromCandidates(primary, shared, globalScope) {
  const candidates = [];

  if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
    candidates.push(primary);
  }

  if (shared && (typeof shared === 'object' || typeof shared === 'function')) {
    candidates.push(shared);
  }

  if (globalScope && (typeof globalScope === 'object' || typeof globalScope === 'function')) {
    candidates.push(globalScope);
  }

  candidates.push(
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  );

  const resolved = [];
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
      continue;
    }

    let duplicate = false;
    for (let check = 0; check < resolved.length; check += 1) {
      if (resolved[check] === candidate) {
        duplicate = true;
        break;
      }
    }

    if (!duplicate) {
      resolved.push(candidate);
    }
  }

  return resolved;
}

function createDefaultLanguageTexts(scope) {
  if (
    scope &&
    typeof scope === 'object' &&
    scope.texts &&
    typeof scope.texts === 'object' &&
    scope.texts.en &&
    typeof scope.texts.en === 'object'
  ) {
    return scope.texts.en;
  }

  return {};
}

function fallbackNormalizeAutoGearWeightOperator(value) {
  if (typeof value !== 'string') return 'greater';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'greater';
  if (
    normalized === '>' ||
    normalized === 'gt' ||
    normalized === 'greaterthan' ||
    normalized === 'above' ||
    normalized === 'over'
  ) {
    return 'greater';
  }
  if (
    normalized === '<' ||
    normalized === 'lt' ||
    normalized === 'lessthan' ||
    normalized === 'below' ||
    normalized === 'under'
  ) {
    return 'less';
  }
  if (
    normalized === '=' ||
    normalized === '==' ||
    normalized === 'equal' ||
    normalized === 'equals' ||
    normalized === 'exactly' ||
    normalized === 'match' ||
    normalized === 'matches'
  ) {
    return 'equal';
  }
  return 'greater';
}

function fallbackNormalizeAutoGearWeightValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const rounded = Math.round(value);
    return rounded >= 0 ? rounded : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const sanitized = trimmed.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
    if (!sanitized) return null;
    const parsed = Number.parseFloat(sanitized);
    if (!Number.isFinite(parsed)) return null;
    const rounded = Math.round(parsed);
    return rounded >= 0 ? rounded : null;
  }
  return null;
}

function fallbackFormatAutoGearWeight(value) {
  if (!Number.isFinite(value)) return '';
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      return new Intl.NumberFormat().format(value);
    }
  } catch (error) {
    void error;
  }
  return String(value);
}

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

function fallbackCreateRuntimeScopeCandidates(primaryScope, sharedScope, globalScope) {
  if (typeof collectRuntimeScopeCandidates === 'function') {
    return collectRuntimeScopeCandidates([primaryScope, sharedScope, globalScope]);
  }

  return createArrayFromCandidates(primaryScope, sharedScope, globalScope);
}

function fallbackReadCoreScopeValue(name, candidates) {
  if (typeof name !== 'string' || !name) {
    return undefined;
  }

  if (!Array.isArray(candidates) || candidates.length === 0) {
    return undefined;
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }
    try {
      if (name in scope) {
        const value = scope[name];
        if (typeof value !== 'undefined') {
          return value;
        }
      }
    } catch (readError) {
      void readError;
    }
  }

  return undefined;
}

function fallbackWriteCoreScopeValue(name, value, candidates) {
  if (typeof name !== 'string' || !name) {
    return false;
  }

  if (!Array.isArray(candidates) || candidates.length === 0) {
    return false;
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }
    try {
      scope[name] = value;
      return true;
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value,
      });
      return true;
    } catch (defineError) {
      void defineError;
    }
  }

  return false;
}

function fallbackDeclareCoreFallbackBinding(name, factory, candidates) {
  const existing = fallbackReadCoreScopeValue(name, candidates);
  if (typeof existing !== 'undefined') {
    return existing;
  }
  const fallbackValue = typeof factory === 'function' ? factory() : factory;
  fallbackWriteCoreScopeValue(name, fallbackValue, candidates);
  return fallbackValue;
}

function resolveAutoGearWeightHelpers(options) {
  const opts = options || {};
  const shared = opts.coreShared && typeof opts.coreShared === 'object' ? opts.coreShared : null;
  const globalScopeOverride =
    opts.globalScope && typeof opts.globalScope === 'object' ? opts.globalScope : null;
  const fallbackTextsFactory = function resolveFallbackTexts() {
    return createDefaultLanguageTexts(
      globalScopeOverride || (typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null)
    );
  };

  const normalizeOperator =
    shared && typeof shared.normalizeAutoGearWeightOperator === 'function'
      ? function safeNormalizeAutoGearWeightOperator(value) {
          try {
            const normalized = shared.normalizeAutoGearWeightOperator(value);
            return normalized || fallbackNormalizeAutoGearWeightOperator(value);
          } catch (error) {
            void error;
          }
          return fallbackNormalizeAutoGearWeightOperator(value);
        }
      : fallbackNormalizeAutoGearWeightOperator;

  const normalizeValue =
    shared && typeof shared.normalizeAutoGearWeightValue === 'function'
      ? function safeNormalizeAutoGearWeightValue(value) {
          try {
            const normalized = shared.normalizeAutoGearWeightValue(value);
            if (typeof normalized === 'number' || normalized === null) {
              return normalized;
            }
          } catch (error) {
            void error;
          }
          return fallbackNormalizeAutoGearWeightValue(value);
        }
      : fallbackNormalizeAutoGearWeightValue;

    const normalizeAutoGearCameraWeightCondition =
      shared && typeof shared.normalizeAutoGearCameraWeightCondition === 'function'
        ? function safeNormalizeAutoGearCameraWeightCondition(condition) {
            try {
              const normalized = shared.normalizeAutoGearCameraWeightCondition(condition);
            return normalized || null;
          } catch (error) {
            void error;
          }
          return null;
        }
      : function normalizeAutoGearCameraWeightCondition() {
          return null;
        };

  const formatWeight =
    shared && typeof shared.formatAutoGearWeight === 'function'
      ? function safeFormatAutoGearWeight(value) {
          try {
            const formatted = shared.formatAutoGearWeight(value);
            if (typeof formatted === 'string') {
              return formatted;
            }
          } catch (error) {
            void error;
          }
          return fallbackFormatAutoGearWeight(value);
        }
      : fallbackFormatAutoGearWeight;

  const fallbackGetOperatorLabel = createFallbackGetAutoGearCameraWeightOperatorLabel(
    normalizeOperator,
    fallbackTextsFactory
  );

  const getOperatorLabel =
    shared && typeof shared.getAutoGearCameraWeightOperatorLabel === 'function'
      ? function safeGetAutoGearCameraWeightOperatorLabel(operator, langTexts) {
          try {
            const label = shared.getAutoGearCameraWeightOperatorLabel(operator, langTexts);
            if (typeof label === 'string' && label) {
              return label;
            }
          } catch (error) {
            void error;
          }
          return fallbackGetOperatorLabel(operator, langTexts);
        }
      : fallbackGetOperatorLabel;

  const fallbackFormatCameraWeight = createFallbackFormatAutoGearCameraWeight(
    formatWeight,
    getOperatorLabel
  );

  const formatCameraWeight =
    shared && typeof shared.formatAutoGearCameraWeight === 'function'
      ? function safeFormatAutoGearCameraWeight(condition, langTexts) {
          try {
            const formatted = shared.formatAutoGearCameraWeight(condition, langTexts);
            if (typeof formatted === 'string') {
              return formatted;
            }
          } catch (error) {
            void error;
          }
          return fallbackFormatCameraWeight(condition, langTexts);
        }
      : fallbackFormatCameraWeight;

  return {
    normalizeAutoGearWeightOperator: normalizeOperator,
    normalizeAutoGearWeightValue: normalizeValue,
    normalizeAutoGearCameraWeightCondition,
    formatAutoGearWeight: formatWeight,
    getAutoGearCameraWeightOperatorLabel: getOperatorLabel,
    formatAutoGearCameraWeight: formatCameraWeight,
    fallbackGetAutoGearCameraWeightOperatorLabel: fallbackGetOperatorLabel,
    fallbackFormatAutoGearCameraWeight: fallbackFormatCameraWeight,
  };
}

function resolveRuntimeScopeTools(options) {
  const opts = options || {};
  const runtimeScope =
    typeof opts.runtimeScope !== 'undefined'
      ? opts.runtimeScope
      : typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined'
        ? CORE_PART2_RUNTIME_SCOPE
        : null;
  const sharedScope =
    typeof opts.sharedScope !== 'undefined'
      ? opts.sharedScope
      : typeof CORE_SHARED_SCOPE_PART2 !== 'undefined'
        ? CORE_SHARED_SCOPE_PART2
        : null;
  const globalScope =
    typeof opts.globalScope !== 'undefined'
      ? opts.globalScope
      : typeof CORE_GLOBAL_SCOPE !== 'undefined'
        ? CORE_GLOBAL_SCOPE
        : null;

  let candidates = fallbackCreateRuntimeScopeCandidates(runtimeScope, sharedScope, globalScope);

  const resolver =
    typeof opts.resolveSupportModule === 'function'
      ? opts.resolveSupportModule
      : typeof resolveCoreSupportModule === 'function'
        ? resolveCoreSupportModule
        : null;

  let runtimeScopeBridge = null;

  if (resolver) {
    try {
      const bridgeTools = resolver('cineCoreAppRuntimeScopeBridge', './modules/app-core/runtime.js');
      if (
        bridgeTools &&
        typeof bridgeTools === 'object' &&
        typeof bridgeTools.createRuntimeScopeBridge === 'function'
      ) {
        runtimeScopeBridge = bridgeTools.createRuntimeScopeBridge({
          primaryScope: runtimeScope,
          additionalScopes: [sharedScope, globalScope],
        });
      }
    } catch (bridgeError) {
      void bridgeError;
    }
  }

  if (
    runtimeScopeBridge &&
    typeof runtimeScopeBridge === 'object' &&
    Array.isArray(runtimeScopeBridge.candidates) &&
    runtimeScopeBridge.candidates.length > 0
  ) {
    candidates = runtimeScopeBridge.candidates;
  }

  function localFallbackRead(name) {
    return fallbackReadCoreScopeValue(name, candidates);
  }

  function localFallbackWrite(name, value) {
    return fallbackWriteCoreScopeValue(name, value, candidates);
  }

  function localFallbackDeclare(name, factory) {
    return fallbackDeclareCoreFallbackBinding(name, factory, candidates);
  }

  return {
    runtimeScopeBridge,
    runtimeScopeCandidates: candidates,
    readCoreScopeValue:
      runtimeScopeBridge && typeof runtimeScopeBridge.readValue === 'function'
        ? runtimeScopeBridge.readValue
        : localFallbackRead,
    writeCoreScopeValue:
      runtimeScopeBridge && typeof runtimeScopeBridge.writeValue === 'function'
        ? runtimeScopeBridge.writeValue
        : localFallbackWrite,
    declareCoreFallbackBinding:
      runtimeScopeBridge && typeof runtimeScopeBridge.declareFallbackBinding === 'function'
        ? runtimeScopeBridge.declareFallbackBinding
        : localFallbackDeclare,
    fallbackReadCoreScopeValue: localFallbackRead,
    fallbackWriteCoreScopeValue: localFallbackWrite,
    fallbackDeclareCoreFallbackBinding: localFallbackDeclare,
  };
}

var CORE_PART2_RUNTIME_HELPERS = (function initialisePart2RuntimeHelpers() {
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
    fallbackNormalizeAutoGearWeightOperator,
    fallbackNormalizeAutoGearWeightValue,
    fallbackFormatAutoGearWeight,
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
