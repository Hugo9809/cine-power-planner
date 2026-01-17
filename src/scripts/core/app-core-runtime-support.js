/*
 * Cine Power Planner runtime support bridge.
 *
 * MIGRATION NOTE: Logic extracted to `src/scripts/modules/runtime-support.js`.
 * This file remains as a backwards-compatibility shim.
 */
import { CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE, collectRuntimeScopeCandidates } from './app-core-runtime-scopes.js';
import {
  DeviceSchema as CoreDeviceSchema,
  Loader as RuntimeLoader,
  Text as CoreText,
  CORE_TEMPERATURE_STORAGE_KEY_FALLBACK,
  resolvePreferredTemperatureStorageKey
} from '../modules/runtime-support.js';

// --- Device Schema ---
export var CORE_DEVICE_SCHEMA = CoreDeviceSchema;

// --- Runtime Module Loader ---
export function resolveRuntimeModuleLoader() {
  return RuntimeLoader;
}

function requireCoreRuntimeModule(moduleId, options) {
  // Basic shim for require-like behavior if needed by legacy code in this file
  return RuntimeLoader.resolveCoreRuntimeModule(moduleId, options);
}

// --- Runtime Support Bootstrap (Not yet full migrated, keeping shim logic) ---
export const CORE_RUNTIME_SUPPORT_BOOTSTRAP = (function resolveRuntimeSupportBootstrap() {
  const namespaceName = 'cineCoreRuntimeSupportBootstrap';

  function readFromScope(candidateScope) {
    if (
      !candidateScope ||
      (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
    ) {
      return null;
    }

    try {
      const bootstrapCandidate = candidateScope[namespaceName];
      return bootstrapCandidate && typeof bootstrapCandidate === 'object'
        ? bootstrapCandidate
        : null;
    } catch (candidateLookupError) {
      void candidateLookupError;
    }

    return null;
  }

  if (typeof collectRuntimeScopeCandidates !== 'function') {
    return [];
  }
  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const bootstrap = readFromScope(candidates[index]);
    if (bootstrap) {
      return bootstrap;
    }
  }

  const requiredBootstrap = null;
  //   const requiredBootstrap = requireCoreRuntimeModule(
  //     'modules/core/runtime-support-bootstrap.js',
  //     { primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE }
  //   );
  if (requiredBootstrap && typeof requiredBootstrap === 'object') {
    return requiredBootstrap;
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const bootstrap = readFromScope(candidates[index]);
    if (bootstrap) {
      return bootstrap;
    }
  }

  return null;
})();

export const CORE_RUNTIME_SUPPORT_RESOLUTION = (function resolveRuntimeSupportResolution() {
  const namespaceName = 'cineCoreRuntimeSupportResolution';

  function readFromScope(candidateScope) {
    if (
      !candidateScope ||
      (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
    ) {
      return null;
    }

    try {
      const resolution = candidateScope[namespaceName];
      return resolution && typeof resolution === 'object' ? resolution : null;
    } catch (resolutionLookupError) {
      void resolutionLookupError;
    }

    return null;
  }

  const candidates = typeof collectRuntimeScopeCandidates === 'function' ? collectRuntimeScopeCandidates() : [];

  for (let index = 0; index < candidates.length; index += 1) {
    const resolution = readFromScope(candidates[index]);
    if (resolution) {
      return resolution;
    }
  }

  const requiredResolution = null;
  if (requiredResolution && typeof requiredResolution === 'object') {
    return requiredResolution;
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const resolution = readFromScope(candidates[index]);
    if (resolution) {
      return resolution;
    }
  }

  return null;
})();

// --- Text Entry Tools ---
export const CORE_TEXT_ENTRY_TOOLS = CoreText;
export const CORE_TEXT_ENTRY_SEPARATOR = CoreText.TEXT_ENTRY_SEPARATOR;
export const normaliseTextEntryValue = CoreText.normaliseTextEntryValue;
export const resolveTextEntryRuntime = CoreText.resolveTextEntry;

// Explicitly expose resolveTextEntryInternal to global scope for cross-module access (Legacy behavior)
const resolveTextEntryInternal = CoreText.resolveTextEntry;
(function ensureResolveTextEntryGlobal(fn) {
  if (typeof fn !== 'function') return;
  if (typeof globalThis !== 'undefined' && typeof globalThis.resolveTextEntryInternal !== 'function') {
    try { globalThis.resolveTextEntryInternal = fn; } catch (e) { void e; }
  }
  if (typeof window !== 'undefined' && typeof window.resolveTextEntryInternal !== 'function') {
    try { window.resolveTextEntryInternal = fn; } catch (e) { void e; }
  }
})(resolveTextEntryInternal);


// --- Temperature Storage Key ---
const PREEXISTING_TEMPERATURE_STORAGE_KEY =
  typeof TEMPERATURE_STORAGE_KEY === 'string' && TEMPERATURE_STORAGE_KEY
    ? TEMPERATURE_STORAGE_KEY
    : null;

export const CORE_TEMPERATURE_STORAGE_KEY =
  PREEXISTING_TEMPERATURE_STORAGE_KEY || resolvePreferredTemperatureStorageKey(collectRuntimeScopeCandidates());

(function ensureTemperatureStorageKeyGlobal(key) {
  const candidates = [
    CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null, // Added self
    typeof global !== 'undefined' ? global : null // Added global
  ];

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    if (typeof scope.TEMPERATURE_STORAGE_KEY === 'string' && scope.TEMPERATURE_STORAGE_KEY) {
      continue;
    }

    try {
      scope.TEMPERATURE_STORAGE_KEY = key;
    } catch (temperatureKeyAssignError) {
      void temperatureKeyAssignError;
    }
  }

  // Shared scope injection
  const sharedCandidates = candidates
    .map(scope => {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return null;
      }
      try {
        return scope.CORE_SHARED && typeof scope.CORE_SHARED === 'object'
          ? scope.CORE_SHARED
          : null;
      } catch (sharedLookupError) {
        void sharedLookupError;
      }
      return null;
    })
    .filter(sharedScopeCandidate => sharedScopeCandidate);

  for (let index = 0; index < sharedCandidates.length; index += 1) {
    const sharedScope = sharedCandidates[index];
    if (!sharedScope || typeof sharedScope !== 'object') {
      continue;
    }

    if (
      typeof sharedScope.TEMPERATURE_STORAGE_KEY === 'string' &&
      sharedScope.TEMPERATURE_STORAGE_KEY
    ) {
      continue;
    }

    try {
      sharedScope.TEMPERATURE_STORAGE_KEY = key;
    } catch (sharedAssignError) {
      void sharedAssignError;
    }
  }
})(CORE_TEMPERATURE_STORAGE_KEY);


// --- Boot Task Helpers ---
(function exposeBootTaskHelpers() {
  const scope = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null);
  if (scope) {
    if (!scope.enqueueCoreBootTask && typeof enqueueCoreBootTask === 'function') {
      scope.enqueueCoreBootTask = enqueueCoreBootTask;
    }
    if (!scope.setGridSnapState && typeof setGridSnapState === 'function') {
      scope.setGridSnapState = setGridSnapState;
    }
    if (!scope.getGridSnapState && typeof getGridSnapState === 'function') {
      scope.getGridSnapState = getGridSnapState;
    }
  }
})();

// --- Runtime Resolution Defaults ---
export const CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE = (function resolveRuntimeSupportDefaultsNamespace() {
  const namespaceName = 'cineCoreRuntimeSupportDefaults';

  function readFromScope(candidateScope) {
    if (
      !candidateScope ||
      (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
    ) {
      return null;
    }

    try {
      const namespace = candidateScope[namespaceName];
      return namespace && typeof namespace === 'object' ? namespace : null;
    } catch (runtimeSupportDefaultsLookupError) {
      void runtimeSupportDefaultsLookupError;
    }

    return null;
  }

  const candidates = typeof collectRuntimeScopeCandidates === 'function' ? collectRuntimeScopeCandidates() : [];

  for (let index = 0; index < candidates.length; index += 1) {
    const defaults = readFromScope(candidates[index]);
    if (defaults) {
      return defaults;
    }
  }

  return null;
})();

function createInlineRuntimeSupportDefaults() {
  function inlineFallbackDetectRuntimeScope(primaryScope) {
    if (primaryScope && (typeof primaryScope === 'object' || typeof primaryScope === 'function')) {
      return primaryScope;
    }

    const candidates = typeof collectRuntimeScopeCandidates === 'function' ? collectRuntimeScopeCandidates() : [];

    for (let index = 0; index < candidates.length; index += 1) {
      const scope = candidates[index];
      if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
        return scope;
      }
    }

    return null;
  }

  function inlineFallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }

    const runtimeScope = inlineFallbackDetectRuntimeScope(primaryScope);

    if (
      runtimeScope &&
      runtimeScope[namespaceName] &&
      typeof runtimeScope[namespaceName] === 'object'
    ) {
      return runtimeScope[namespaceName];
    }

    // Fallback to module loader
    return RuntimeLoader.resolveCoreRuntimeModule(requirePath);
  }

  return {
    fallbackDetectRuntimeScope: inlineFallbackDetectRuntimeScope,
    fallbackResolveCoreSupportModule: inlineFallbackResolveCoreSupportModule,
    readRuntimeSupportResolver: function readRuntimeSupportResolver() {
      return Object.freeze({
        detectRuntimeScope: inlineFallbackDetectRuntimeScope,
        resolveCoreSupportModule: inlineFallbackResolveCoreSupportModule,
      });
    },
  };
}

export const CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS =
  CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE &&
    typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.fallbackDetectRuntimeScope === 'function' &&
    typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.fallbackResolveCoreSupportModule === 'function' &&
    typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.readRuntimeSupportResolver === 'function'
    ? CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE
    : createInlineRuntimeSupportDefaults();

export const CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS = (function resolveRuntimeSupportResolutionTools() {
  if (
    CORE_RUNTIME_SUPPORT_RESOLUTION &&
    typeof CORE_RUNTIME_SUPPORT_RESOLUTION.readRuntimeSupportResolver === 'function'
  ) {
    try {
      return CORE_RUNTIME_SUPPORT_RESOLUTION.readRuntimeSupportResolver(
        CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
      );
    } catch (runtimeSupportResolutionToolsError) {
      void runtimeSupportResolutionToolsError;
    }
  }

  try {
    return CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS.readRuntimeSupportResolver(
      CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
    );
  } catch (runtimeSupportResolutionDefaultsError) {
    void runtimeSupportResolutionDefaultsError;
  }

  return null;
})();

export const CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS =
  CORE_RUNTIME_SUPPORT_BOOTSTRAP &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP.resolveBootstrap === 'function'
    ? CORE_RUNTIME_SUPPORT_BOOTSTRAP.resolveBootstrap(
      CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
    )
    : null;

export const CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS =
  !CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
    CORE_RUNTIME_SUPPORT_BOOTSTRAP &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP.readRuntimeSupportTools === 'function'
    ? CORE_RUNTIME_SUPPORT_BOOTSTRAP.readRuntimeSupportTools(
      CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
    )
    : null;

export const fallbackDetectRuntimeScope =
  (CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackDetectRuntimeScope === 'function' &&
    CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackDetectRuntimeScope) ||
  (CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackDetectRuntimeScope === 'function' &&
    CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackDetectRuntimeScope) ||
  (CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.detectRuntimeScope === 'function' &&
    CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.detectRuntimeScope) ||
  CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS.fallbackDetectRuntimeScope;

export const detectRuntimeScope =
  (CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.detectRuntimeScope === 'function' &&
    CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.detectRuntimeScope) ||
  fallbackDetectRuntimeScope;

export const fallbackResolveCoreSupportModule =
  (CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackResolveCoreSupportModule === 'function' &&
    CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackResolveCoreSupportModule) ||
  (CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackResolveCoreSupportModule === 'function' &&
    CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackResolveCoreSupportModule) ||
  (CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.resolveCoreSupportModule === 'function' &&
    CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.resolveCoreSupportModule) ||
  CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS.fallbackResolveCoreSupportModule;

export var CORE_PART1_RUNTIME_SCOPE =
  CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.runtimeScope
    ? CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.runtimeScope
    : detectRuntimeScope(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE);

export const resolveCoreSupportModule =
  CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ? function resolveCoreSupportModule(namespaceName, requirePath) {
      return CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule(
        namespaceName,
        requirePath,
        CORE_PART1_RUNTIME_SCOPE
      );
    }
    : function resolveCoreSupportModule(namespaceName, requirePath) {
      return fallbackResolveCoreSupportModule(
        namespaceName,
        requirePath,
        CORE_PART1_RUNTIME_SCOPE
      );
    };

const CORE_RUNTIME_SUPPORT_EXPORTS = (function ensureRuntimeSupportExportsNamespace() {
  const namespaceName = 'cineCoreRuntimeSupportExports';

  function readNamespace(candidateScope) {
    if (
      !candidateScope ||
      (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
    ) {
      return null;
    }

    try {
      const namespace = candidateScope[namespaceName];
      return namespace && typeof namespace === 'object' ? namespace : null;
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }

    return null;
  }

  const candidateScopes = (typeof collectRuntimeScopeCandidates === 'function')
    ? collectRuntimeScopeCandidates([
      typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null,
    ])
    : [
      typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null,
    ];

  let namespace = null;

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const existing = readNamespace(candidateScopes[index]);
    if (existing) {
      namespace = existing;
      break;
    }
  }

  if (!namespace || typeof namespace !== 'object') {
    namespace = {};
  } else {
    const isExtensible =
      typeof Object.isExtensible === 'function' ? Object.isExtensible(namespace) : true;
    const isSealed = typeof Object.isSealed === 'function' && Object.isSealed(namespace);

    if (!isExtensible || isSealed) {
      namespace = Object.assign({}, namespace);
    }
  }

  function assignExport(target, key, value) {
    if (!target || typeof target !== 'object') {
      return;
    }

    try {
      target[key] = value;
      if (target[key] === value) {
        return;
      }
    } catch (assignError) {
      void assignError;
    }

    try {
      Object.defineProperty(target, key, {
        configurable: true,
        writable: true,
        value,
      });
    } catch (defineError) {
      void defineError;
    }
  }

  assignExport(namespace, 'resolveRuntimeModuleLoader', resolveRuntimeModuleLoader);
  assignExport(namespace, 'requireCoreRuntimeModule', requireCoreRuntimeModule);

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      scope[namespaceName] = namespace;
    } catch (namespaceAssignError) {
      void namespaceAssignError;
    }
  }

  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    try {
      module.exports = namespace;
    } catch (moduleExportError) {
      void moduleExportError;
    }
  }

  return namespace;
})();
