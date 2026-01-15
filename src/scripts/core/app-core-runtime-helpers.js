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
 * Safely serialize a value with deterministic key ordering.
 * @param {*} value - Any serializable value; supports arrays and plain objects.
 * @returns {string} Stable JSON-like string output with sorted object keys.
 * @default Returns `'undefined'` for undefined, `'null'` for null, and JSON strings for primitives.
 * @why Fallback ensures offline-safe stringification when primary serializers are unavailable,
 *      preserving deterministic cache keys and recovery metadata in legacy bundles.
 * @edgecases Arrays are serialized in order; objects sort keys lexicographically; non-objects
 *            fall back to JSON.stringify. Undefined is stringified as the literal "undefined".
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
 * Humanize a field key for legacy/UI labeling.
 * @param {*} key - Any key-like value (string preferred).
 * @returns {string} Human-readable label for the key.
 * @default Uses override map when available; otherwise converts camelCase/snake_case to words.
 * @why Fallback keeps offline/legacy environments readable when translation bundles are missing,
 *      preventing confusing labels during recovery screens.
 * @edgecases Non-string keys are stringified; empty/falsey values normalize to empty string
 *            before formatting.
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
 * Build a normalized list of scope candidates for runtime binding resolution.
 * @param {*} primary - Primary scope (object/function) if available.
 * @param {*} shared - Shared scope (object/function) if available.
 * @param {*} globalScope - Global scope override (object/function) if available.
 * @returns {Array<object|Function>} De-duplicated list of valid scope objects/functions.
 * @default Always appends global fallbacks (globalThis/window/self/global) in that order.
 * @why Provides offline-safe, legacy-compatible scope resolution when registry helpers are absent,
 *      preventing missing bindings during autosave/restore flows.
 * @edgecases Skips non-objects/functions; removes duplicates by reference equality.
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
 * Extract the default (English) translation texts from a scope.
 * @param {*} scope - Scope that may include a texts.en object.
 * @returns {object} The English texts object or an empty object.
 * @default Returns {} when scope/texts/en are missing or invalid.
 * @why Fallback keeps operator labels available offline and in legacy bundles without translations,
 *      ensuring recovery UI text remains consistent.
 * @edgecases Non-object scopes or missing nested structures yield an empty object.
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
 * Normalize weight operator input into a canonical token.
 * @param {*} value - User/legacy input (string expected).
 * @returns {'greater'|'less'|'equal'} Normalized operator token.
 * @default Returns 'greater' for non-string, empty, or unrecognized input.
 * @why Fallback ensures offline-safe parsing for auto-gear rules when legacy helpers are missing,
 *      preventing invalid operators from corrupting saved conditions.
 * @edgecases Trims, lowercases, and maps symbols/aliases (>, <, ==, match, above, etc.).
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
 * Normalize and sanitize weight values for auto-gear conditions.
 * @param {*} value - Numeric or string input representing grams.
 * @returns {number|null} Rounded non-negative integer value, or null if invalid.
 * @default Returns null for empty, non-finite, or negative values.
 * @why Fallback sanitizes legacy/offline inputs to prevent corrupt or unsafe values from being saved,
 *      protecting backup/restore integrity.
 * @edgecases Strings strip non-numeric chars, support commas as decimals, and reject NaN/negative.
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
 * Format a numeric weight value for display.
 * @param {number} value - Numeric weight value in grams.
 * @returns {string} Locale-formatted string or empty string for invalid input.
 * @default Returns '' when value is not finite; falls back to String(value) if Intl fails.
 * @why Fallback keeps display formatting working offline or in legacy bundles without Intl,
 *      preventing UI regressions during recovery.
 * @edgecases Catches Intl errors; does not throw to avoid breaking render paths.
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
 * Resolve runtime scope candidates with optional registry support.
 * @param {*} primaryScope - Primary runtime scope.
 * @param {*} sharedScope - Shared runtime scope.
 * @param {*} globalScope - Global runtime scope.
 * @returns {Array<object|Function>} Candidate scopes in priority order.
 * @default Uses collectRuntimeScopeCandidates when available, else local fallback.
 * @why Fallback keeps runtime bindings resolvable offline/legacy without registry helpers,
 *      avoiding lost references during save/restore bootstraps.
 * @edgecases Ignores invalid scopes; always returns an array.
 */
export function fallbackCreateRuntimeScopeCandidates(primaryScope, sharedScope, globalScope) {
  if (typeof collectRuntimeScopeCandidates === 'function') {
    return collectRuntimeScopeCandidates([primaryScope, sharedScope, globalScope]);
  }

  return createArrayFromCandidates(primaryScope, sharedScope, globalScope);
}

/**
 * Read a value from the first scope that defines it.
 * @param {string} name - The binding name to read.
 * @param {Array<object|Function>} candidates - Candidate scopes to scan.
 * @returns {*} The resolved value, or undefined if not found.
 * @default Returns undefined when name/candidates are invalid or unreadable.
 * @why Fallback provides offline-safe, exception-tolerant reads for legacy scopes,
 *      preventing recovery flows from crashing on access errors.
 * @edgecases Skips non-object candidates; guards against property access errors.
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
 * Write a value into the first writable scope.
 * @param {string} name - The binding name to write.
 * @param {*} value - The value to assign.
 * @param {Array<object|Function>} candidates - Candidate scopes to mutate.
 * @returns {boolean} True if the value was written, false otherwise.
 * @default Returns false when name/candidates are invalid or writes fail.
 * @why Fallback ensures offline/legacy environments can store bindings during boot,
 *      preventing missing helpers that could risk data loss in recovery.
 * @edgecases Attempts direct assignment then defineProperty; swallows errors.
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
 * Declare a binding if it does not already exist.
 * @param {string} name - The binding name to ensure.
 * @param {Function|*} factory - Factory function or value for the fallback.
 * @param {Array<object|Function>} candidates - Candidate scopes to receive the binding.
 * @returns {*} The existing or newly created value.
 * @default If already present, returns existing without overwriting.
 * @why Fallback avoids overwriting live bindings while keeping offline-safe defaults available,
 *      protecting legacy recovery paths and autosave integrity.
 * @edgecases Factory is only invoked when missing; write failures still return the computed value.
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
 * Resolve auto-gear weight helper functions with safe fallbacks.
 * @param {object} [options] - Optional scope overrides for shared/global helpers.
 * @param {object} [options.coreShared] - Shared helper scope.
 * @param {object} [options.globalScope] - Global scope override.
 * @returns {object} Helper functions for normalization, labeling, and formatting.
 * @default Uses built-in fallback implementations when shared helpers are absent or invalid.
 * @why Fallback keeps offline/legacy rule normalization stable, preventing corrupted conditions
 *      that could break saved projects or backups.
 * @edgecases Sanitizes errors from shared helpers; enforces string return types where expected.
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
 * Resolve runtime scope tools for reading/writing bindings.
 * @param {object} [options] - Optional scope overrides and resolver.
 * @param {*} [options.runtimeScope] - Runtime scope override.
 * @param {*} [options.sharedScope] - Shared scope override.
 * @param {*} [options.globalScope] - Global scope override.
 * @param {Function} [options.resolveSupportModule] - Resolver for support modules.
 * @returns {object} Runtime scope bridge, candidates, and read/write/declare helpers.
 * @default Uses global fallbacks when bridge/resolver is unavailable.
 * @why Fallback ensures offline-safe and legacy-compatible scope access for save/restore flows,
 *      preventing missing bindings during recovery.
 * @edgecases Bridge errors are swallowed; candidate list is always available.
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
