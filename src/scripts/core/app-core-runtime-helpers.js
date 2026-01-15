/* global CORE_GLOBAL_SCOPE, CORE_PART2_RUNTIME_SCOPE, CORE_SHARED_SCOPE_PART2, CORE_SHARED,
          CORE_PART2_RUNTIME_HELPERS: true, collectRuntimeScopeCandidates,
          resolveCoreSupportModule */

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

export const FALLBACK_HUMANIZE_OVERRIDES = {
  powerDrawWatts: 'Power (W)',
  capacity: 'Capacity (Wh)',
  pinA: 'Pin A',
  dtapA: 'D-Tap A',
  mount_type: 'Mount',
  screenSizeInches: 'Screen Size (in)',
  brightnessNits: 'Brightness (nits)',
  torqueNm: 'Torque (Nm)',
  internalController: 'Internal Controller',
  powerSource: 'Power Source',
  batteryType: 'Battery Type',
  connectivity: 'Connectivity',
};

/**
 * Safely stringify values with stable key ordering for deterministic offline-safe caches.
 *
 * @param {*} value - Any value to serialize.
 * @returns {string} A stable JSON-like string (arrays preserve order, objects sort keys).
 *
 * @remarks
 * - Fallback exists to keep autosave/backup snapshots deterministic when JSON.stringify
 *   is unavailable or key order differences could cause drift in legacy bundles.
 * - Edge cases: `undefined` is serialized as the literal `"undefined"`; `null` is `"null"`;
 *   objects are traversed recursively with sorted keys.
 */
export function fallbackStableStringify(value) {
  if (value === null) return 'null';
  if (typeof value === 'undefined') return 'undefined';
  if (Array.isArray(value)) {
    let serialized = '[';
    for (let index = 0; index < value.length; index += 1) {
      if (index > 0) {
        serialized += ',';
      }
      serialized += fallbackStableStringify(value[index]);
    }
    serialized += ']';
    return serialized;
  }
  if (typeof value === 'object' && value) {
    const keys = Object.keys(value).sort();
    let serialized = '{';
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      if (index > 0) {
        serialized += ',';
      }
      serialized += `${JSON.stringify(key)}:${fallbackStableStringify(value[key])}`;
    }
    serialized += '}';
    return serialized;
  }
  return JSON.stringify(value);
}

/**
 * Produce a human-readable label for a data key using offline-safe defaults.
 *
 * @param {string|number|symbol|null|undefined} key - Raw key from saved data.
 * @returns {string} Humanized label (override > normalized > basic string).
 *
 * @remarks
 * - Fallback exists to preserve UI readability in offline/legacy bundles before i18n
 *   or shared helpers are ready, preventing empty labels in recovery views.
 * - Edge cases: non-string keys are coerced; underscores become spaces; camelCase is split.
 */
export function fallbackHumanizeKey(key) {
  if (key && Object.prototype.hasOwnProperty.call(FALLBACK_HUMANIZE_OVERRIDES, key)) {
    return FALLBACK_HUMANIZE_OVERRIDES[key];
  }

  const stringValue = typeof key === 'string' ? key : String(key || '');
  return stringValue
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase());
}

/**
 * Build a de-duplicated list of runtime scope candidates.
 *
 * @param {object|function|null} primary - Primary runtime scope candidate.
 * @param {object|function|null} shared - Shared runtime scope candidate.
 * @param {object|function|null} globalScope - Global fallback scope candidate.
 * @returns {Array<object|function>} Ordered, unique scope candidates.
 *
 * @remarks
 * - Fallback exists to ensure we can still resolve bindings in offline/legacy bundles
 *   when the shared runtime scope bridge is unavailable.
 * - Edge cases: non-object/function inputs are ignored; duplicates are removed by identity.
 */
export function createArrayFromCandidates(primary, shared, globalScope) {
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

/**
 * Resolve the default language text bundle for recovery-safe labels.
 *
 * @param {object|null} scope - Scope containing `texts.en` when available.
 * @returns {object} The English text dictionary or an empty object.
 *
 * @remarks
 * - Fallback exists to prevent missing-label crashes during offline/legacy startup.
 * - Edge cases: missing/invalid structures return a new empty object to avoid mutations.
 */
export function createDefaultLanguageTexts(scope) {
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

/**
 * Normalize auto-gear comparison operators to canonical tokens.
 *
 * @param {string} value - User-provided operator string.
 * @returns {'greater'|'less'|'equal'} Normalized operator token.
 *
 * @remarks
 * - Fallback exists to keep legacy/offline imports stable when shared helpers are absent.
 * - Edge cases: non-strings or empty input default to `"greater"`; trimmed/lowercased
 *   values accept symbols and synonyms (e.g., ">", "lt", "matches").
 */
export function fallbackNormalizeAutoGearWeightOperator(value) {
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

/**
 * Normalize auto-gear weight values into a safe integer or null.
 *
 * @param {number|string} value - Raw weight value (user input or imported data).
 * @returns {number|null} Rounded, non-negative integer weight or null.
 *
 * @remarks
 * - Fallback exists to sanitize offline/legacy imports without crashing recovery.
 * - Edge cases: strings are trimmed, stripped to digits/.,- then parsed; commas become dots;
 *   non-finite, empty, or negative results resolve to null.
 */
export function fallbackNormalizeAutoGearWeightValue(value) {
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

/**
 * Format an auto-gear weight number for display.
 *
 * @param {number} value - Numeric weight value.
 * @returns {string} Locale-formatted string or empty string for invalid numbers.
 *
 * @remarks
 * - Fallback exists to keep displays stable when Intl APIs are missing or crash in
 *   legacy/offline contexts.
 * - Edge cases: non-finite values return an empty string; Intl failures fall back to String().
 */
export function fallbackFormatAutoGearWeight(value) {
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

/**
 * Resolve runtime scope candidates using the shared collector when available.
 *
 * @param {object|function|null} primaryScope - Primary runtime scope.
 * @param {object|function|null} sharedScope - Shared runtime scope.
 * @param {object|function|null} globalScope - Global runtime scope.
 * @returns {Array<object|function>} Candidate scopes ordered by precedence.
 *
 * @remarks
 * - Fallback exists for legacy bundles that lack collectRuntimeScopeCandidates, ensuring
 *   offline recovery can still locate bindings.
 * - Edge cases: invalid inputs are filtered out and global objects are appended safely.
 */
export function fallbackCreateRuntimeScopeCandidates(primaryScope, sharedScope, globalScope) {
  if (typeof collectRuntimeScopeCandidates === 'function') {
    return collectRuntimeScopeCandidates([primaryScope, sharedScope, globalScope]);
  }

  return createArrayFromCandidates(primaryScope, sharedScope, globalScope);
}

/**
 * Read a value from the first scope that safely exposes it.
 *
 * @param {string} name - Binding name to resolve.
 * @param {Array<object|function>} candidates - Ordered candidate scopes.
 * @returns {*} The resolved value or undefined if not found.
 *
 * @remarks
 * - Fallback exists to avoid hard failures when scope bridges are unavailable in
 *   offline/legacy contexts.
 * - Edge cases: non-string names or empty candidates return undefined; getters that throw
 *   are ignored to protect recovery flows.
 */
export function fallbackReadCoreScopeValue(name, candidates) {
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

/**
 * Write a value to the first writable scope candidate.
 *
 * @param {string} name - Binding name to assign.
 * @param {*} value - Value to set on the scope.
 * @param {Array<object|function>} candidates - Ordered candidate scopes.
 * @returns {boolean} True when a write succeeds, otherwise false.
 *
 * @remarks
 * - Fallback exists to keep offline recovery and legacy bundles able to persist helpers.
 * - Edge cases: attempts assignment first, then defineProperty for restricted objects; any
 *   thrown errors are swallowed to prevent data-loss interruptions.
 */
export function fallbackWriteCoreScopeValue(name, value, candidates) {
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

/**
 * Declare a runtime binding only if it does not already exist.
 *
 * @param {string} name - Binding name to declare.
 * @param {Function|*} factory - Factory function or fallback value.
 * @param {Array<object|function>} candidates - Candidate scopes to receive the binding.
 * @returns {*} The existing or newly declared binding value.
 *
 * @remarks
 * - Fallback exists to prevent overwriting data during recovery and legacy bootstraps.
 * - Edge cases: factory functions are invoked once; non-function factories are used directly.
 */
export function fallbackDeclareCoreFallbackBinding(name, factory, candidates) {
  const existing = fallbackReadCoreScopeValue(name, candidates);
  if (typeof existing !== 'undefined') {
    return existing;
  }
  const fallbackValue = typeof factory === 'function' ? factory() : factory;
  fallbackWriteCoreScopeValue(name, fallbackValue, candidates);
  return fallbackValue;
}

/**
 * Resolve auto-gear helpers with defensive fallbacks for offline/legacy bundles.
 *
 * @param {object} [options] - Optional overrides for shared/global scopes.
 * @param {object} [options.coreShared] - Shared core helpers, if available.
 * @param {object} [options.globalScope] - Global scope override, if available.
 * @returns {object} Helper functions for normalization and formatting.
 *
 * @remarks
 * - Fallback exists so autosave/import/backup can normalize values without crashing when
 *   shared helpers are missing or throw in older bundles.
 * - Edge cases: normalization helpers guard against invalid inputs; formatting falls back
 *   to local defaults; language text lookup defaults to English or empty objects.
 */
export function resolveAutoGearWeightHelpers(options) {
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
    fallbackNormalizeAutoGearCameraWeightCondition: function fallbackNormalizeAutoGearCameraWeightCondition(condition) {
      if (!condition || typeof condition !== 'object') {
        return null;
      }
      return null;
    },
  };
}

/**
 * Resolve runtime scope tools with a bridge when available, or fall back safely.
 *
 * @param {object} [options] - Optional overrides for runtime/shared/global scopes.
 * @param {object} [options.runtimeScope] - Primary runtime scope override.
 * @param {object} [options.sharedScope] - Shared runtime scope override.
 * @param {object} [options.globalScope] - Global scope override.
 * @param {Function} [options.resolveSupportModule] - Custom resolver for support modules.
 * @returns {object} Runtime scope bridge, candidates, and read/write/declare helpers.
 *
 * @remarks
 * - Fallback exists to preserve offline resilience and legacy bundle compatibility when
 *   the runtime scope bridge is unavailable.
 * - Edge cases: bridge errors are swallowed; reads/writes are guarded to avoid data loss
 *   during recovery flows.
 */
export function resolveRuntimeScopeTools(options) {
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
          for (const key in namespace) {
            if (Object.prototype.hasOwnProperty.call(namespace, key)) {
              sharedHelpers[key] = namespace[key];
            }
          }
        }

      }
    } catch (assignError) {
      void assignError;
    }
  }
})(CORE_PART2_RUNTIME_HELPERS);
