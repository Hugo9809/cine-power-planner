/*
 * Cine Power Planner runtime split (environment utilities).
 * SHIM ADAPTER - Imports from src/scripts/modules/runtime-environment.js
 *
 * This file maintains backward compatibility for legacy code relying on
 * global environment utilities and runtime state management.
 */

import {
  collectCandidateScopes,
  detectGlobalScope,
  createFreezeRegistry,
  freezeRegistryHas,
  freezeRegistryAdd,
  readGlobalScopeValue,
  writeGlobalScopeValue,
  ensureGlobalFallback,
  normaliseGlobalValue,
  ensureAutoGearGlobal,
  createFallbackIconFontKeys,
  createFallbackSafeGenerateConnectorSummary,
  generateSafeConnectorSummary,
  createLocalRuntimeStateFallback,
  Helpers,
  Freeze,
  Global,
  AutoGear,
  Icons,
  Connectors
} from '../modules/runtime-environment.js';

import { resolveCoreSupportModule } from './app-core-runtime-support.js';

// --- Legacy Module Loader Resolution ---
// Kept for backward compatibility with code that expects these exact exports
// and the specific resolution logic.

export function resolveRuntimeModuleLoader() {
  if (
    typeof cineCoreRuntimeModuleLoader !== 'undefined' &&
    cineCoreRuntimeModuleLoader &&
    typeof cineCoreRuntimeModuleLoader === 'object'
  ) {
    return cineCoreRuntimeModuleLoader;
  }

  const scope = detectGlobalScope();
  if (scope && scope.cineCoreRuntimeModuleLoader && typeof scope.cineCoreRuntimeModuleLoader === 'object') {
    return scope.cineCoreRuntimeModuleLoader;
  }

  return null;
}

export function requireCoreRuntimeModule(moduleId, options) {
  const loader = resolveRuntimeModuleLoader();
  if (
    loader &&
    typeof loader.resolveCoreRuntimeModule === 'function'
  ) {
    try {
      return loader.resolveCoreRuntimeModule(moduleId, options);
    } catch (moduleResolutionError) {
      void moduleResolutionError;
    }
  }
  return null;
}


// --- Icon Registry Initialization ---
// Ensures ICON_GLYPHS global exists

(function ensureIconGlyphRegistryAvailability() {
  const scopes = collectCandidateScopes();
  let registry = null;

  for (const scope of scopes) {
    if (scope && scope.ICON_GLYPHS && typeof scope.ICON_GLYPHS === 'object') {
      registry = scope.ICON_GLYPHS;
      break;
    }
  }

  if (!registry) {
    registry = {};
  }

  for (const scope of scopes) {
    ensureGlobalFallback('ICON_GLYPHS', () => registry, [scope]);
  }
})();


// --- Core Environment Helpers ---

export var CORE_ENVIRONMENT_HELPERS = (function resolveCoreEnvironmentHelpers() {
  let helpers = null;

  if (typeof resolveCoreSupportModule === 'function') {
    helpers = resolveCoreSupportModule(
      'cineRuntimeEnvironmentHelpers',
      './modules/runtime-environment-helpers.js'
    );
  }

  if (helpers) {
    return helpers;
  }

  // Fallback to checking globals directly
  helpers = readGlobalScopeValue('cineRuntimeEnvironmentHelpers');
  return helpers;
})();


// --- Core Runtime Shared ---

export var CORE_RUNTIME_SHARED = (function resolveCoreRuntimeShared() {
  if (typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED) {
    return CORE_RUNTIME_SHARED;
  }

  let shared = null;

  if (typeof resolveCoreSupportModule === 'function') {
    shared = resolveCoreSupportModule(
      'cineCoreRuntimeShared',
      './app-core-runtime-shared.js'
    );
  }

  if (!shared) {
    shared = readGlobalScopeValue('cineCoreRuntimeShared');
  }

  return shared;
})();

export { CORE_RUNTIME_SHARED as CORE_SHARED };


// --- Candidate Scopes ---

export function collectEnvironmentRuntimeCandidateScopes(primaryScope) {
  // Use the new module's collector, but respect legacy shared injection if present
  if (CORE_RUNTIME_SHARED && typeof CORE_RUNTIME_SHARED.collectCandidateScopes === 'function') {
    try {
      const sharedScopes = CORE_RUNTIME_SHARED.collectCandidateScopes(primaryScope, CORE_ENVIRONMENT_HELPERS);
      if (Array.isArray(sharedScopes)) return sharedScopes;
    } catch (e) { void e; }
  }

  // Use new implementation
  return collectCandidateScopes(primaryScope);
}

export var CORE_RUNTIME_CANDIDATE_SCOPES = (function resolveCoreRuntimeCandidateScopesPart2() {
  if (
    typeof CORE_RUNTIME_CANDIDATE_SCOPES !== 'undefined' &&
    CORE_RUNTIME_CANDIDATE_SCOPES &&
    Array.isArray(CORE_RUNTIME_CANDIDATE_SCOPES)
  ) {
    return CORE_RUNTIME_CANDIDATE_SCOPES;
  }

  // Simplified resolution using new collection logic
  const scopes = collectEnvironmentRuntimeCandidateScopes();

  // Legacy sync logic
  if (CORE_RUNTIME_SHARED && typeof CORE_RUNTIME_SHARED.syncCandidateScopes === 'function') {
    try {
      CORE_RUNTIME_SHARED.syncCandidateScopes(scopes, detectGlobalScope(), CORE_ENVIRONMENT_HELPERS);
    } catch (e) { void e; }
  } else {
    // Simple global sync
    ensureGlobalFallback('CORE_RUNTIME_CANDIDATE_SCOPES', scopes);
  }

  return scopes;
})();


// --- Runtime State Support ---

export var CORE_RUNTIME_STATE_SUPPORT_PART2 = (function resolveCoreRuntimeStateSupportPart2() {
  // Try to find existing support object
  let support = readGlobalScopeValue('CORE_RUNTIME_STATE_SUPPORT');
  if (!support) {
    support = readGlobalScopeValue('cineCoreRuntimeState');
  }

  if (support) return support;

  // Attempt resolution through support module
  if (typeof resolveCoreSupportModule === 'function') {
    support = resolveCoreSupportModule('cineCoreRuntimeState', './modules/core/runtime-state.js');
  }

  // If still not found, try loader
  if (!support) {
    const loaderState = requireCoreRuntimeModule('modules/core/runtime-state.js');
    if (loaderState && typeof loaderState === 'object') {
      support = loaderState;
    }
  }

  if (support) {
    ensureGlobalFallback('CORE_RUNTIME_STATE_SUPPORT', support);
  }

  return support;
})();


// --- Temperature Keys ---

export var CORE_TEMPERATURE_KEY_DEFAULTS = {
  queueKey: '__cinePendingTemperatureNote',
  renderName: 'renderTemperatureNote'
};

// Try to update from runtime state if available
if (CORE_RUNTIME_STATE_SUPPORT_PART2 && typeof CORE_RUNTIME_STATE_SUPPORT_PART2.resolveTemperatureKeyDefaults === 'function') {
  try {
    const defaults = CORE_RUNTIME_STATE_SUPPORT_PART2.resolveTemperatureKeyDefaults();
    if (defaults) {
      if (defaults.queueKey) CORE_TEMPERATURE_KEY_DEFAULTS.queueKey = defaults.queueKey;
      if (defaults.renderName) CORE_TEMPERATURE_KEY_DEFAULTS.renderName = defaults.renderName;
    }
  } catch (e) { void e; }
}

export const CORE_TEMPERATURE_QUEUE_KEY = CORE_TEMPERATURE_KEY_DEFAULTS.queueKey;
export const CORE_TEMPERATURE_RENDER_NAME = CORE_TEMPERATURE_KEY_DEFAULTS.renderName;


// --- Freeze Registry ---

export var CORE_SAFE_FREEZE_REGISTRY = (function resolveCoreSafeFreezeRegistry() {
  // Try to get shared registry from support module first
  if (CORE_RUNTIME_STATE_SUPPORT_PART2) {
    if (typeof CORE_RUNTIME_STATE_SUPPORT_PART2.ensureSafeFreezeRegistry === 'function') {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.ensureSafeFreezeRegistry();
    }
    if (typeof CORE_RUNTIME_STATE_SUPPORT_PART2.createSafeFreezeRegistry === 'function') {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.createSafeFreezeRegistry();
    }
  }
  // Fallback to local creation from new module
  return createFreezeRegistry();
})();

// Bridge functions to new module, but checking runtime state support first for legacy compat
export function coreSafeFreezeRegistryHas(value) {
  if (CORE_RUNTIME_STATE_SUPPORT_PART2 && typeof CORE_RUNTIME_STATE_SUPPORT_PART2.hasSafeFreezeEntry === 'function') {
    try {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.hasSafeFreezeEntry(CORE_SAFE_FREEZE_REGISTRY, value);
    } catch (e) { void e; }
  }
  return freezeRegistryHas(CORE_SAFE_FREEZE_REGISTRY, value);
}

export function coreSafeFreezeRegistryAdd(value) {
  if (CORE_RUNTIME_STATE_SUPPORT_PART2 && typeof CORE_RUNTIME_STATE_SUPPORT_PART2.registerSafeFreezeEntry === 'function') {
    try {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.registerSafeFreezeEntry(CORE_SAFE_FREEZE_REGISTRY, value);
    } catch (e) { void e; }
  }
  return freezeRegistryAdd(CORE_SAFE_FREEZE_REGISTRY, value);
}


// --- Local Runtime State Fallback ---
export { createLocalRuntimeStateFallback };


// --- Auto Gear Globals & Shims ---

ensureAutoGearGlobal(detectGlobalScope(), 'autoGearAutoPresetId');
ensureGlobalFallback('baseAutoGearRules', () => []);
ensureGlobalFallback('autoGearScenarioModeSelect', null);

export {
  createFallbackSafeGenerateConnectorSummary
} from '../modules/runtime-environment.js';

ensureGlobalFallback('createFallbackSafeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary;
});

ensureGlobalFallback('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});

ensureGlobalFallback('readGlobalScopeValue', () => readGlobalScopeValue);


// --- Icon Utils Exports & Shims ---

normaliseGlobalValue(
  'baseAutoGearRules',
  (value) => Array.isArray(value),
  () => []
);

normaliseGlobalValue(
  'safeGenerateConnectorSummary',
  (value) => typeof value === 'function',
  () => createFallbackSafeGenerateConnectorSummary()
);

ensureGlobalFallback('ICON_FONT_KEYS', () => createFallbackIconFontKeys());

ensureGlobalFallback('iconGlyph', function () {
  // Legacy factory for iconGlyph
  const iconFontKeys = createFallbackIconFontKeys();
  const fallbackFont = iconFontKeys.UICONS || 'uicons';

  return function fallbackIconGlyph(char, font) {
    const glyphChar = typeof char === 'string' ? char : '';
    const resolvedFont = font && typeof font === 'string' ? font : fallbackFont;
    return Object.freeze({ char: glyphChar, font: resolvedFont });
  };
});

// Use new implementation but expose as global
ensureGlobalFallback('resolveIconGlyph', () => Helpers.resolveIconGlyph); // Using Helpers namespace for direct access if needed, or import
// Actually better to wrap to match exact signature or just expose the function
ensureGlobalFallback('resolveIconGlyph', () => Icons.resolveGlyph);

ensureGlobalFallback('formatSvgCoordinate', () => Icons.formatCoordinate);

ensureGlobalFallback('positionSvgMarkup', function () {
  // Legacy factory returns the function
  return Icons.positionMarkup;
});

ensureGlobalFallback('applyIconGlyph', function () {
  // Legacy factory returns the function
  return Icons.applyGlyph;
});


// --- Auto Gear Initial State Resolution ---

function resolveInitialPart2Value(name) {
  // Check runtime scopes
  const value = readGlobalScopeValue(name);
  return value;
}

const autoGearAutoPresetIdSeed = resolveInitialPart2Value('autoGearAutoPresetId');
var autoGearAutoPresetIdState = typeof autoGearAutoPresetIdSeed === 'string' ? autoGearAutoPresetIdSeed : '';

const baseAutoGearRulesSeed = resolveInitialPart2Value('baseAutoGearRules');
var baseAutoGearRulesState = Array.isArray(baseAutoGearRulesSeed) ? baseAutoGearRulesSeed : [];

const autoGearScenarioModeSelectSeed = resolveInitialPart2Value('autoGearScenarioModeSelect');
// var autoGearScenarioModeSelectRef = ... (unused in export but kept in logic flow)


const safeGenerateConnectorSummarySeed = resolveInitialPart2Value('safeGenerateConnectorSummary');
let safeGenerateConnectorSummaryFn = typeof safeGenerateConnectorSummarySeed === 'function' ? safeGenerateConnectorSummarySeed : createFallbackSafeGenerateConnectorSummary();


// --- Legacy Global Exposures ---
// Expose functions globally for app-core-new-2.js (as per original file)

const globalScope = detectGlobalScope();
if (globalScope) {
  globalScope.coreSafeFreezeRegistryHas = coreSafeFreezeRegistryHas;
  globalScope.coreSafeFreezeRegistryAdd = coreSafeFreezeRegistryAdd;
  globalScope.generateSafeConnectorSummary = generateSafeConnectorSummary;
  globalScope.readGlobalScopeValue = readGlobalScopeValue;
  globalScope.writeGlobalScopeValue = writeGlobalScopeValue;
  globalScope.collectEnvironmentRuntimeCandidateScopes = collectEnvironmentRuntimeCandidateScopes;
  globalScope.createLocalRuntimeStateFallback = createLocalRuntimeStateFallback;
}
