/*
 * Cine Power Planner runtime split (environment utilities).
 *
 * This file continues the gradual extraction of the monolithic app-core
 * runtime. It hosts the shared environment and runtime state helpers that
 * used to live at the top of `app-core-new-2.js` so they can evolve in
 * isolation without losing offline resilience. Keep the checklist below in
 * sync with the sibling files until the refactor completes.
 *
 *   1. Apply behavioural fixes to every runtime segment in lockstep.
 *   2. Update the legacy bundle mirrors whenever the modern files change.
 *   3. Verify the loader manifests include the new module so offline caches
 *      stay valid.
 *   4. Confirm autosave, backup, restore, and sharing flows still round-trip
 *      user data safely in browsers, workers, and Node-based tests.
 *   5. Retain the offline-friendly fallbacks when resolving helpers.
 *   6. Keep localisation, help, and documentation references aligned.
 *   7. Respect the local icon set and avoid external network dependencies.
 *   8. Preserve the verbose comment so Git keeps treating this as a new file
 *      instead of a rename during the multi-step refactor.
 */

/* global cineGearList, cineCoreRuntimeModuleLoader */


function resolveRuntimeModuleLoader() {
  if (typeof require === 'function') {
    try {
      const requiredLoader = require('./modules/core/runtime-module-loader.js');
      if (requiredLoader && typeof requiredLoader === 'object') {
        return requiredLoader;
      }
    } catch (runtimeLoaderError) {
      void runtimeLoaderError;
    }
  }

  if (
    typeof cineCoreRuntimeModuleLoader !== 'undefined' &&
    cineCoreRuntimeModuleLoader &&
    typeof cineCoreRuntimeModuleLoader === 'object'
  ) {
    return cineCoreRuntimeModuleLoader;
  }

  if (
    typeof globalThis !== 'undefined' &&
    globalThis &&
    typeof globalThis.cineCoreRuntimeModuleLoader === 'object'
  ) {
    return globalThis.cineCoreRuntimeModuleLoader;
  }

  if (
    typeof window !== 'undefined' &&
    window &&
    typeof window.cineCoreRuntimeModuleLoader === 'object'
  ) {
    return window.cineCoreRuntimeModuleLoader;
  }

  if (
    typeof self !== 'undefined' &&
    self &&
    typeof self.cineCoreRuntimeModuleLoader === 'object'
  ) {
    return self.cineCoreRuntimeModuleLoader;
  }

  if (
    typeof global !== 'undefined' &&
    global &&
    typeof global.cineCoreRuntimeModuleLoader === 'object'
  ) {
    return global.cineCoreRuntimeModuleLoader;
  }

  return null;
}

function requireCoreRuntimeModule(moduleId, options) {
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


if (typeof CORE_TEMPERATURE_QUEUE_KEY === 'undefined') {
  try {
    CORE_TEMPERATURE_QUEUE_KEY = '__cinePendingTemperatureNote';
  } catch (coreTemperatureQueueError) {
    void coreTemperatureQueueError;
    if (typeof globalThis !== 'undefined') {
      globalThis.CORE_TEMPERATURE_QUEUE_KEY = '__cinePendingTemperatureNote';
    } else if (typeof window !== 'undefined') {
      window.CORE_TEMPERATURE_QUEUE_KEY = '__cinePendingTemperatureNote';
    }
  }
}

if (typeof CORE_TEMPERATURE_RENDER_NAME === 'undefined') {
  try {
    CORE_TEMPERATURE_RENDER_NAME = 'renderTemperatureNote';
  } catch (coreTemperatureRenderError) {
    void coreTemperatureRenderError;
    if (typeof globalThis !== 'undefined') {
      globalThis.CORE_TEMPERATURE_RENDER_NAME = 'renderTemperatureNote';
    } else if (typeof window !== 'undefined') {
      window.CORE_TEMPERATURE_RENDER_NAME = 'renderTemperatureNote';
    }
  }
}

(function ensureIconGlyphRegistryAvailability() {
  const candidateScopes = [
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
      ? CORE_GLOBAL_SCOPE
      : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ];

  let registry = null;

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope) {
      continue;
    }
    try {
      if (scope.ICON_GLYPHS && typeof scope.ICON_GLYPHS === 'object') {
        registry = scope.ICON_GLYPHS;
        break;
      }
    } catch (lookupError) {
      void lookupError;
    }
  }

  if (!registry) {
    registry = {};
  }

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope) {
      continue;
    }
    try {
      if (typeof scope.ICON_GLYPHS === 'undefined') {
        scope.ICON_GLYPHS = registry;
      }
    } catch (assignError) {
      void assignError;
    }
  }

  let identifierExists = false;
  try {
    identifierExists = typeof ICON_GLYPHS !== 'undefined';
  } catch (identifierError) {
    identifierExists = false;
  }

  if (!identifierExists) {
    try {
      ICON_GLYPHS = registry;
    } catch (exposeError) {
      void exposeError;
    }
  }
})();

var CORE_ENVIRONMENT_HELPERS = (function resolveCoreEnvironmentHelpers() {
  var helpers = null;

  if (typeof resolveCoreSupportModule === 'function') {
    helpers = resolveCoreSupportModule(
      'cineRuntimeEnvironmentHelpers',
      './modules/runtime-environment-helpers.js'
    );
  }

  if (!helpers && typeof require === 'function') {
    try {
      var requiredHelpers = require('./modules/runtime-environment-helpers.js');
      if (requiredHelpers && typeof requiredHelpers === 'object') {
        helpers = requiredHelpers;
      }
    } catch (environmentHelpersRequireError) {
      void environmentHelpersRequireError;
    }
  }

  if (helpers) {
    return helpers;
  }

  var fallbackScopes = [
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
      ? CORE_GLOBAL_SCOPE
      : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ];

  for (var fallbackIndex = 0; fallbackIndex < fallbackScopes.length; fallbackIndex += 1) {
    var candidateScope = fallbackScopes[fallbackIndex];
    if (!candidateScope || (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')) {
      continue;
    }

    try {
      var candidateHelpers = candidateScope.cineRuntimeEnvironmentHelpers;
      if (candidateHelpers && typeof candidateHelpers === 'object') {
        helpers = candidateHelpers;
        break;
      }
    } catch (candidateLookupError) {
      void candidateLookupError;
    }
  }

  return helpers;
})();

var CORE_RUNTIME_SHARED =
  (typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED)
    ? CORE_RUNTIME_SHARED
    : (function resolveCoreRuntimeShared() {
      var shared = null;

      if (typeof resolveCoreSupportModule === 'function') {
        shared = resolveCoreSupportModule(
          'cineCoreRuntimeShared',
          './modules/core/runtime-shared.js'
        );
      }

      if (!shared) {
        var loaderShared = requireCoreRuntimeModule(
          'modules/core/runtime-shared.js',
          {
            primaryScope:
              typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
                CORE_GLOBAL_SCOPE &&
                typeof CORE_GLOBAL_SCOPE === 'object'
                ? CORE_GLOBAL_SCOPE
                : null,
          }
        );
        if (loaderShared && typeof loaderShared === 'object') {
          shared = loaderShared;
        }
      }

      if (shared) {
        return shared;
      }

      var fallbackScopes = [
        typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
          CORE_GLOBAL_SCOPE &&
          typeof CORE_GLOBAL_SCOPE === 'object'
          ? CORE_GLOBAL_SCOPE
          : null,
        typeof globalThis !== 'undefined' && typeof globalThis === 'object'
          ? globalThis
          : null,
        typeof window !== 'undefined' && typeof window === 'object'
          ? window
          : null,
        typeof self !== 'undefined' && typeof self === 'object'
          ? self
          : null,
        typeof global !== 'undefined' && typeof global === 'object'
          ? global
          : null,
      ];

      for (var sharedIndex = 0; sharedIndex < fallbackScopes.length; sharedIndex += 1) {
        var candidateScope = fallbackScopes[sharedIndex];
        if (!candidateScope || typeof candidateScope !== 'object') {
          continue;
        }

        try {
          var candidateShared = candidateScope.cineCoreRuntimeShared;
          if (candidateShared && typeof candidateShared === 'object') {
            return candidateShared;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    })();

function collectEnvironmentRuntimeCandidateScopes(primaryScope) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.collectCandidateScopes === 'function'
  ) {
    try {
      var sharedScopes = CORE_RUNTIME_SHARED.collectCandidateScopes(
        primaryScope,
        CORE_ENVIRONMENT_HELPERS
      );
      if (Array.isArray(sharedScopes)) {
        return sharedScopes;
      }
    } catch (collectRuntimeScopeError) {
      void collectRuntimeScopeError;
    }
  }

  var scopes = [];

  function registerScope(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  if (
    CORE_ENVIRONMENT_HELPERS &&
    typeof CORE_ENVIRONMENT_HELPERS.fallbackCollectCandidateScopes === 'function'
  ) {
    try {
      var collectedScopes = CORE_ENVIRONMENT_HELPERS.fallbackCollectCandidateScopes(primaryScope);
      if (Array.isArray(collectedScopes)) {
        for (var collectedIndex = 0; collectedIndex < collectedScopes.length; collectedIndex += 1) {
          registerScope(collectedScopes[collectedIndex]);
        }
      }
    } catch (collectScopeError) {
      void collectScopeError;
    }
  }

  registerScope(primaryScope);
  registerScope(
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null
  );
  registerScope(
    typeof window !== 'undefined' && typeof window === 'object' ? window : null
  );
  registerScope(
    typeof self !== 'undefined' && typeof self === 'object' ? self : null
  );
  registerScope(
    typeof global !== 'undefined' && typeof global === 'object' ? global : null
  );

  var detectedScope = null;

  if (
    CORE_ENVIRONMENT_HELPERS &&
    typeof CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope === 'function'
  ) {
    try {
      detectedScope = CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope();
    } catch (detectScopeError) {
      void detectScopeError;
      detectedScope = null;
    }
  } else if (typeof globalThis !== 'undefined' && typeof globalThis === 'object') {
    detectedScope = globalThis;
  } else if (typeof window !== 'undefined' && typeof window === 'object') {
    detectedScope = window;
  } else if (typeof self !== 'undefined' && typeof self === 'object') {
    detectedScope = self;
  } else if (typeof global !== 'undefined' && typeof global === 'object') {
    detectedScope = global;
  }

  registerScope(detectedScope);

  return scopes;
}

// The runtime needs a predictable list of global scopes so that background
// workers, offline tabs and legacy frames all share the same configuration. We
// build an ordered array here and then let the state helpers below iterate over
// it when fetching shared utilities.
var CORE_RUNTIME_CANDIDATE_SCOPES = (function resolveCoreRuntimeCandidateScopesPart2() {
  if (
    typeof CORE_RUNTIME_CANDIDATE_SCOPES !== 'undefined' &&
    CORE_RUNTIME_CANDIDATE_SCOPES &&
    typeof CORE_RUNTIME_CANDIDATE_SCOPES.length === 'number'
  ) {
    return CORE_RUNTIME_CANDIDATE_SCOPES;
  }

  var resolvedScopes = null;

  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.resolveCandidateScopes === 'function'
  ) {
    try {
      resolvedScopes = CORE_RUNTIME_SHARED.resolveCandidateScopes(
        typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
          CORE_GLOBAL_SCOPE &&
          typeof CORE_GLOBAL_SCOPE === 'object'
          ? CORE_GLOBAL_SCOPE
          : null,
        CORE_ENVIRONMENT_HELPERS
      );
    } catch (resolveCandidateScopesError) {
      void resolveCandidateScopesError;
      resolvedScopes = null;
    }
  }

  if (!resolvedScopes) {
    resolvedScopes = collectEnvironmentRuntimeCandidateScopes(
      typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
        CORE_GLOBAL_SCOPE &&
        typeof CORE_GLOBAL_SCOPE === 'object'
        ? CORE_GLOBAL_SCOPE
        : null
    );
  }

  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.syncCandidateScopes === 'function'
  ) {
    try {
      CORE_RUNTIME_SHARED.syncCandidateScopes(
        resolvedScopes,
        typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
          CORE_GLOBAL_SCOPE &&
          typeof CORE_GLOBAL_SCOPE === 'object'
          ? CORE_GLOBAL_SCOPE
          : null,
        CORE_ENVIRONMENT_HELPERS
      );
    } catch (syncCandidateScopesError) {
      void syncCandidateScopesError;
    }
  } else {
    var scope =
      (typeof globalThis !== 'undefined' && globalThis) ||
      (typeof window !== 'undefined' && window) ||
      (typeof self !== 'undefined' && self) ||
      (typeof global !== 'undefined' && global) ||
      null;

    if (
      scope &&
      (!scope.CORE_RUNTIME_CANDIDATE_SCOPES || scope.CORE_RUNTIME_CANDIDATE_SCOPES !== resolvedScopes)
    ) {
      try {
        scope.CORE_RUNTIME_CANDIDATE_SCOPES = resolvedScopes;
      } catch (assignCandidateScopesError) {
        void assignCandidateScopesError;
      }
    }
  }

  return resolvedScopes;
})();

var CORE_RUNTIME_STATE_SUPPORT_PART2 = (function resolveCoreRuntimeStateSupportPart2() {
  function readExistingRuntimeStateSupport() {
    var scopes = [];
    if (typeof globalThis !== 'undefined') scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof self !== 'undefined') scopes.push(self);
    if (typeof global !== 'undefined') scopes.push(global);

    if (Array.isArray(CORE_RUNTIME_CANDIDATE_SCOPES)) {
      for (var scopeIndex = 0; scopeIndex < CORE_RUNTIME_CANDIDATE_SCOPES.length; scopeIndex += 1) {
        scopes.push(CORE_RUNTIME_CANDIDATE_SCOPES[scopeIndex]);
      }
    }

    for (var readIndex = 0; readIndex < scopes.length; readIndex += 1) {
      var candidateScope = scopes[readIndex];
      if (!candidateScope || typeof candidateScope !== 'object') {
        continue;
      }
      try {
        if (candidateScope.CORE_RUNTIME_STATE_SUPPORT) {
          return candidateScope.CORE_RUNTIME_STATE_SUPPORT;
        }
        if (candidateScope.cineCoreRuntimeState) {
          return candidateScope.cineCoreRuntimeState;
        }
      } catch (runtimeSupportReadError) {
        void runtimeSupportReadError;
      }
    }

    return null;
  }

  var baseRuntimeSupport = readExistingRuntimeStateSupport();
  if (baseRuntimeSupport) {
    return baseRuntimeSupport;
  }

  var resolvedSupport = null;

  if (typeof resolveCoreSupportModule === 'function') {
    resolvedSupport = resolveCoreSupportModule(
      'cineCoreRuntimeState',
      './modules/core/runtime-state.js'
    );
  }

  if (!resolvedSupport) {
    var loaderRuntimeState = requireCoreRuntimeModule('modules/core/runtime-state.js');
    if (loaderRuntimeState && typeof loaderRuntimeState === 'object') {
      resolvedSupport = loaderRuntimeState;
    }
  }

  if (resolvedSupport) {
    if (!readExistingRuntimeStateSupport() && typeof globalThis !== 'undefined') {
      try {
        globalThis.CORE_RUNTIME_STATE_SUPPORT = resolvedSupport;
      } catch (runtimeStateAssignError) {
        void runtimeStateAssignError;
      }
    }
    return resolvedSupport;
  }

  for (var supportIndex = 0; supportIndex < CORE_RUNTIME_CANDIDATE_SCOPES.length; supportIndex += 1) {
    var supportScope = CORE_RUNTIME_CANDIDATE_SCOPES[supportIndex];
    if (!supportScope || typeof supportScope !== 'object') {
      continue;
    }

    try {
      var candidate = supportScope.cineCoreRuntimeState;
      if (candidate && typeof candidate === 'object') {
        if (!readExistingRuntimeStateSupport() && typeof globalThis !== 'undefined') {
          try {
            globalThis.CORE_RUNTIME_STATE_SUPPORT = candidate;
          } catch (runtimeStateCandidateAssignError) {
            void runtimeStateCandidateAssignError;
          }
        }
        return candidate;
      }
    } catch (supportLookupError) {
      void supportLookupError;
    }
  }

  return null;
})();

var CORE_TEMPERATURE_KEY_DEFAULTS = (function resolveCoreTemperatureKeyDefaults() {
  var defaults = {
    queueKey: CORE_TEMPERATURE_QUEUE_KEY,
    renderName: CORE_TEMPERATURE_RENDER_NAME,
  };

  if (
    CORE_RUNTIME_STATE_SUPPORT_PART2 &&
    typeof CORE_RUNTIME_STATE_SUPPORT_PART2.resolveTemperatureKeyDefaults === 'function'
  ) {
    try {
      var resolvedDefaults = CORE_RUNTIME_STATE_SUPPORT_PART2.resolveTemperatureKeyDefaults();
      if (resolvedDefaults && typeof resolvedDefaults === 'object') {
        if (typeof resolvedDefaults.queueKey === 'string' && resolvedDefaults.queueKey) {
          defaults.queueKey = resolvedDefaults.queueKey;
        }

        if (typeof resolvedDefaults.renderName === 'string' && resolvedDefaults.renderName) {
          defaults.renderName = resolvedDefaults.renderName;
        }
      }
    } catch (resolveTemperatureDefaultsError) {
      void resolveTemperatureDefaultsError;
    }
  }

  if (typeof defaults.queueKey !== 'string' || !defaults.queueKey) {
    defaults.queueKey = '__cinePendingTemperatureNote';
  }

  if (typeof defaults.renderName !== 'string' || !defaults.renderName) {
    defaults.renderName = 'renderTemperatureNote';
  }

  return defaults;
})();

CORE_TEMPERATURE_QUEUE_KEY = CORE_TEMPERATURE_KEY_DEFAULTS.queueKey;
CORE_TEMPERATURE_RENDER_NAME = CORE_TEMPERATURE_KEY_DEFAULTS.renderName;

var CORE_SAFE_FREEZE_REGISTRY = (function resolveCoreSafeFreezeRegistry() {
  if (
    CORE_RUNTIME_STATE_SUPPORT_PART2 &&
    typeof CORE_RUNTIME_STATE_SUPPORT_PART2.ensureSafeFreezeRegistry === 'function'
  ) {
    try {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.ensureSafeFreezeRegistry();
    } catch (ensureRegistryError) {
      void ensureRegistryError;
    }
  }

  if (
    CORE_RUNTIME_STATE_SUPPORT_PART2 &&
    typeof CORE_RUNTIME_STATE_SUPPORT_PART2.createSafeFreezeRegistry === 'function'
  ) {
    try {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.createSafeFreezeRegistry();
    } catch (createRegistryError) {
      void createRegistryError;
    }
  }

  return typeof WeakSet === 'function' ? new WeakSet() : [];
})();

function coreSafeFreezeRegistryHas(value) {
  if (!value || !CORE_SAFE_FREEZE_REGISTRY) {
    return false;
  }

  if (
    CORE_RUNTIME_STATE_SUPPORT_PART2 &&
    typeof CORE_RUNTIME_STATE_SUPPORT_PART2.hasSafeFreezeEntry === 'function'
  ) {
    try {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.hasSafeFreezeEntry(
        CORE_SAFE_FREEZE_REGISTRY,
        value
      );
    } catch (coreRegistryHasError) {
      void coreRegistryHasError;
    }
  }

  if (typeof CORE_SAFE_FREEZE_REGISTRY.has === 'function') {
    try {
      return CORE_SAFE_FREEZE_REGISTRY.has(value);
    } catch (registryHasError) {
      void registryHasError;
      return false;
    }
  }

  for (var index = 0; index < CORE_SAFE_FREEZE_REGISTRY.length; index += 1) {
    if (CORE_SAFE_FREEZE_REGISTRY[index] === value) {
      return true;
    }
  }

  return false;
}

function coreSafeFreezeRegistryAdd(value) {
  if (!value || !CORE_SAFE_FREEZE_REGISTRY) {
    return;
  }

  if (
    CORE_RUNTIME_STATE_SUPPORT_PART2 &&
    typeof CORE_RUNTIME_STATE_SUPPORT_PART2.registerSafeFreezeEntry === 'function'
  ) {
    try {
      CORE_RUNTIME_STATE_SUPPORT_PART2.registerSafeFreezeEntry(
        CORE_SAFE_FREEZE_REGISTRY,
        value
      );
      return;
    } catch (coreRegistryAddError) {
      void coreRegistryAddError;
    }
  }

  if (typeof CORE_SAFE_FREEZE_REGISTRY.add === 'function') {
    try {
      CORE_SAFE_FREEZE_REGISTRY.add(value);
    } catch (registryAddError) {
      void registryAddError;
    }
    return;
  }

  for (var index = 0; index < CORE_SAFE_FREEZE_REGISTRY.length; index += 1) {
    if (CORE_SAFE_FREEZE_REGISTRY[index] === value) {
      return;
    }
  }

  CORE_SAFE_FREEZE_REGISTRY.push(value);
}

// Build a lightweight registry around whichever global objects we can access.
// The planner frequently runs in embedded webviews where referencing window
// directly can throw. Collecting the scopes once and reusing them keeps the
// rest of the module intentionally boring and therefore easier to maintain.
function createLocalRuntimeStateFallback(candidateScopes) {
  var scopes = [];
  var seenScopes = typeof Set === 'function' ? new Set() : null;

  function registerScope(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    if (seenScopes) {
      if (seenScopes.has(scope)) {
        return;
      }
      seenScopes.add(scope);
      scopes.push(scope);
      return;
    }

    if (scopes.indexOf(scope) !== -1) {
      return;
    }

    scopes.push(scope);
  }

  if (Array.isArray(candidateScopes)) {
    for (var initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
      try {
        registerScope(candidateScopes[initialIndex]);
      } catch (initialiseScopeError) {
        void initialiseScopeError;
      }
    }
  }

  function withEachScope(callback) {
    if (typeof callback !== 'function') {
      return;
    }

    for (var index = 0; index < scopes.length; index += 1) {
      try {
        callback(scopes[index], index);
      } catch (scopeCallbackError) {
        void scopeCallbackError;
      }
    }
  }

  function getScopes() {
    return scopes.slice();
  }

  function getPrimaryScope() {
    return scopes.length > 0 ? scopes[0] : null;
  }

  function ensureValue(name, fallbackValue) {
    var fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
          return fallbackValue;
        };

    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      var scope = scopes[scopeIndex];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (typeof scope[name] === 'undefined') {
          scope[name] = fallbackProvider();
        }
        return scope[name];
      } catch (ensureError) {
        void ensureError;
      }
    }

    try {
      return fallbackProvider();
    } catch (fallbackError) {
      void fallbackError;
      return undefined;
    }
  }

  function normaliseValue(name, validator, fallbackValue) {
    var fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
          return fallbackValue;
        };

    var validate =
      typeof validator === 'function'
        ? validator
        : function alwaysValid() {
          return true;
        };

    withEachScope(function applyNormaliser(scope) {
      try {
        if (!validate(scope[name])) {
          scope[name] = fallbackProvider();
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    });
  }

  function readValue(name) {
    for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      var scope = scopes[scopeIndex];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (name in scope) {
          return scope[name];
        }
      } catch (readError) {
        void readError;
      }
    }

    return undefined;
  }

  var assignedTemperatureRenderer = null;

  function assignTemperatureRenderer(renderer) {
    if (typeof renderer !== 'function') {
      return;
    }

    assignedTemperatureRenderer = renderer;

    withEachScope(function applyRenderer(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      try {
        scope[CORE_TEMPERATURE_RENDER_NAME] = renderer;
        var pending = scope[CORE_TEMPERATURE_QUEUE_KEY];

        if (pending && typeof pending === 'object') {
          if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
            var hours = pending.latestHours;
            if (typeof hours !== 'undefined') {
              try {
                renderer(hours);
              } catch (temperatureRenderError) {
                if (
                  typeof console !== 'undefined' &&
                  typeof console.error === 'function'
                ) {
                  console.error(
                    'Failed to apply pending temperature note render',
                    temperatureRenderError,
                  );
                }
              }
            }
          }

          try {
            delete pending.latestHours;
          } catch (clearLatestError) {
            void clearLatestError;
            pending.latestHours = undefined;
          }
        }
      } catch (assignError) {
        void assignError;
      }
    });
  }

  function getAssignedTemperatureRenderer() {
    return assignedTemperatureRenderer;
  }

  var autoGearGuards = {
    isReferenceError: function defaultAutoGearReferenceGuard() {
      return false;
    },
    repair: function defaultAutoGearRepair() {
      return undefined;
    },
  };

  function setAutoGearGuards(nextGuards) {
    if (!nextGuards || typeof nextGuards !== 'object') {
      return;
    }

    if (typeof nextGuards.isReferenceError === 'function') {
      autoGearGuards.isReferenceError = nextGuards.isReferenceError;
    }

    if (typeof nextGuards.repair === 'function') {
      autoGearGuards.repair = nextGuards.repair;
    }
  }

  return {
    registerScope: registerScope,
    withEachScope: withEachScope,
    getScopes: getScopes,
    getPrimaryScope: getPrimaryScope,
    ensureValue: ensureValue,
    normaliseValue: normaliseValue,
    readValue: readValue,
    assignTemperatureRenderer: assignTemperatureRenderer,
    getAssignedTemperatureRenderer: getAssignedTemperatureRenderer,
    autoGearGuards: autoGearGuards,
    setAutoGearGuards: setAutoGearGuards,
  };
}

function createLocalRuntimeState(candidateScopes) {
  if (
    CORE_RUNTIME_STATE_SUPPORT_PART2 &&
    typeof CORE_RUNTIME_STATE_SUPPORT_PART2.createLocalRuntimeState === 'function'
  ) {
    try {
      return CORE_RUNTIME_STATE_SUPPORT_PART2.createLocalRuntimeState(
        candidateScopes,
        {
          temperatureQueueKey: CORE_TEMPERATURE_QUEUE_KEY,
          temperatureRenderName: CORE_TEMPERATURE_RENDER_NAME,
        }
      );
    } catch (coreRuntimeStateError) {
      void coreRuntimeStateError;
    }
  }

  return createLocalRuntimeStateFallback(candidateScopes);
}

var CORE_RUNTIME_STATE = (function resolveCoreRuntimeState() {
  var resolvedState = null;

  for (var index = 0; index < CORE_RUNTIME_CANDIDATE_SCOPES.length; index += 1) {
    var scope = CORE_RUNTIME_CANDIDATE_SCOPES[index];
    if (scope && typeof scope.__cineRuntimeState === 'object') {
      resolvedState = scope.__cineRuntimeState;
      break;
    }
  }

  if (!resolvedState) {
    for (var factoryIndex = 0; factoryIndex < CORE_RUNTIME_CANDIDATE_SCOPES.length; factoryIndex += 1) {
      var factoryScope = CORE_RUNTIME_CANDIDATE_SCOPES[factoryIndex];
      var createRuntimeState =
        factoryScope && typeof factoryScope.__cineCreateRuntimeState === 'function'
          ? factoryScope.__cineCreateRuntimeState
          : null;

      if (typeof createRuntimeState === 'function') {
        try {
          resolvedState = createRuntimeState(CORE_RUNTIME_CANDIDATE_SCOPES);
        } catch (createStateError) {
          resolvedState = null;
          void createStateError;
        }
        if (resolvedState) {
          break;
        }
      }
    }
  }

  if (!resolvedState) {
    resolvedState = createLocalRuntimeState(CORE_RUNTIME_CANDIDATE_SCOPES);
  }

  var primaryScope = CORE_RUNTIME_CANDIDATE_SCOPES.length
    ? CORE_RUNTIME_CANDIDATE_SCOPES[0]
    : null;

  if (primaryScope && resolvedState) {
    try {
      Object.defineProperty(primaryScope, '__cineRuntimeState', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: resolvedState,
      });
    } catch (defineStateError) {
      try {
        primaryScope.__cineRuntimeState = resolvedState;
      } catch (assignStateError) {
        void assignStateError;
      }
      void defineStateError;
    }
  }

  return resolvedState;
})();

function registerRuntimeScope(scope) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.registerScope === 'function'
  ) {
    try {
      CORE_RUNTIME_SHARED.registerScope(CORE_RUNTIME_STATE, scope);
      return;
    } catch (sharedRegisterError) {
      void sharedRegisterError;
    }
  }

  if (!CORE_RUNTIME_STATE || typeof CORE_RUNTIME_STATE.registerScope !== 'function') {
    return;
  }

  try {
    CORE_RUNTIME_STATE.registerScope(scope);
  } catch (registerError) {
    void registerError;
  }
}

for (var CORE_RUNTIME_SCOPE_INDEX = 0; CORE_RUNTIME_SCOPE_INDEX < CORE_RUNTIME_CANDIDATE_SCOPES.length; CORE_RUNTIME_SCOPE_INDEX += 1) {
  registerRuntimeScope(CORE_RUNTIME_CANDIDATE_SCOPES[CORE_RUNTIME_SCOPE_INDEX]);
}

function getCoreRuntimeScopesSnapshot() {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.getScopesSnapshot === 'function'
  ) {
    try {
      var sharedSnapshot = CORE_RUNTIME_SHARED.getScopesSnapshot(
        CORE_RUNTIME_STATE,
        CORE_RUNTIME_CANDIDATE_SCOPES
      );
      if (Array.isArray(sharedSnapshot)) {
        return sharedSnapshot;
      }
    } catch (runtimeSnapshotError) {
      void runtimeSnapshotError;
    }
  }

  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getScopes === 'function') {
    try {
      return CORE_RUNTIME_STATE.getScopes();
    } catch (scopeReadError) {
      void scopeReadError;
    }
  }

  return CORE_RUNTIME_CANDIDATE_SCOPES.slice();
}

var CORE_PART2_RUNTIME_SCOPE =
  CORE_RUNTIME_SHARED && typeof CORE_RUNTIME_SHARED.ensurePrimaryScope === 'function'
    ? (function resolvePrimaryScopeWithShared() {
      try {
        return CORE_RUNTIME_SHARED.ensurePrimaryScope(
          CORE_RUNTIME_STATE,
          CORE_RUNTIME_CANDIDATE_SCOPES
        );
      } catch (sharedPrimaryScopeError) {
        void sharedPrimaryScopeError;
      }

      return null;
    })()
    : null;

if (!CORE_PART2_RUNTIME_SCOPE && CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getPrimaryScope === 'function') {
  try {
    CORE_PART2_RUNTIME_SCOPE = CORE_RUNTIME_STATE.getPrimaryScope();
  } catch (primaryScopeError) {
    CORE_PART2_RUNTIME_SCOPE = null;
    void primaryScopeError;
  }
}

if (!CORE_PART2_RUNTIME_SCOPE) {
  var runtimeScopesSnapshot = getCoreRuntimeScopesSnapshot();
  CORE_PART2_RUNTIME_SCOPE = runtimeScopesSnapshot.length
    ? runtimeScopesSnapshot[0]
    : null;
}

function assignCoreTemperatureNoteRenderer(renderer) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.assignTemperatureRenderer === 'function'
  ) {
    try {
      CORE_RUNTIME_SHARED.assignTemperatureRenderer(
        CORE_RUNTIME_STATE,
        renderer
      );
      return;
    } catch (assignRendererError) {
      void assignRendererError;
    }
  }

  if (!CORE_RUNTIME_STATE || typeof CORE_RUNTIME_STATE.assignTemperatureRenderer !== 'function') {
    return;
  }

  CORE_RUNTIME_STATE.assignTemperatureRenderer(renderer);
}

function readGlobalScopeValue(name) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.readValue === 'function'
  ) {
    try {
      var sharedValue = CORE_RUNTIME_SHARED.readValue(
        CORE_RUNTIME_STATE,
        name,
        getCoreRuntimeScopesSnapshot()
      );
      if (typeof sharedValue !== 'undefined') {
        return sharedValue;
      }
    } catch (sharedReadError) {
      void sharedReadError;
    }
  }

  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.readValue === 'function') {
    return CORE_RUNTIME_STATE.readValue(name);
  }

  var scopes = getCoreRuntimeScopesSnapshot();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      if (name in scope) {
        return scope[name];
      }
    } catch (readError) {
      void readError;
    }
  }

  return undefined;
}

function ensureGlobalFallback(name, fallbackValue) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.ensureValue === 'function'
  ) {
    try {
      return CORE_RUNTIME_SHARED.ensureValue(
        CORE_RUNTIME_STATE,
        name,
        fallbackValue,
        getCoreRuntimeScopesSnapshot()
      );
    } catch (sharedEnsureError) {
      void sharedEnsureError;
    }
  }

  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.ensureValue === 'function') {
    return CORE_RUNTIME_STATE.ensureValue(name, fallbackValue);
  }

  var fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
        return fallbackValue;
      };

  var scopes = getCoreRuntimeScopesSnapshot();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    try {
      if (typeof scope[name] === 'undefined') {
        scope[name] = fallbackProvider();
      }
      return scope[name];
    } catch (ensureError) {
      void ensureError;
    }
  }

  try {
    return fallbackProvider();
  } catch (fallbackError) {
    void fallbackError;
    return undefined;
  }
}

function normaliseGlobalValue(name, validator, fallbackValue) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.normaliseValue === 'function'
  ) {
    try {
      CORE_RUNTIME_SHARED.normaliseValue(
        CORE_RUNTIME_STATE,
        name,
        validator,
        fallbackValue,
        getCoreRuntimeScopesSnapshot()
      );
      return;
    } catch (sharedNormaliseError) {
      void sharedNormaliseError;
    }
  }

  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.normaliseValue === 'function') {
    CORE_RUNTIME_STATE.normaliseValue(name, validator, fallbackValue);
    return;
  }

  var fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
        return fallbackValue;
      };

  var scopes = getCoreRuntimeScopesSnapshot();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    try {
      if (!validator(scope[name])) {
        scope[name] = fallbackProvider();
      }
    } catch (normaliseError) {
      void normaliseError;
    }
  }
}

var AUTO_GEAR_GLOBAL_FALLBACKS = {
  autoGearAutoPresetId: function provideAutoGearAutoPresetId() {
    return '';
  },
  baseAutoGearRules: function provideBaseAutoGearRules() {
    return [];
  },
  autoGearScenarioModeSelect: function provideAutoGearScenarioModeSelect() {
    return null;
  },
  autoGearRuleNameInput: function provideAutoGearRuleNameInput() {
    return null;
  },
  autoGearSummaryFocus: function provideAutoGearSummaryFocus() {
    return 'all';
  },
  autoGearMonitorDefaultControls: function provideAutoGearMonitorDefaultControls() {
    return [];
  },
  safeGenerateConnectorSummary: function provideSafeGenerateConnectorSummary() {
    return createFallbackSafeGenerateConnectorSummary();
  },
  totalPowerElem: function provideTotalPowerElem() {
    return null;
  },
};

var AUTO_GEAR_REFERENCE_NAMES = Object.keys(AUTO_GEAR_GLOBAL_FALLBACKS);

function isAutoGearGlobalReferenceError(error) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  var message = typeof error.message === 'string' ? error.message : '';
  return (
    error.name === 'ReferenceError' &&
    AUTO_GEAR_REFERENCE_NAMES.some(function checkAutoGearReferenceName(name) {
      return message.indexOf(name) !== -1;
    })
  );
}

function ensureAutoGearGlobal(scope, name) {
  var createFallback = AUTO_GEAR_GLOBAL_FALLBACKS[name];
  if (typeof createFallback !== 'function') {
    return;
  }

  var fallbackValue = createFallback();

  if (typeof scope[name] === 'undefined') {
    try {
      scope[name] = fallbackValue;
    } catch (assignmentError) {
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          writable: true,
          enumerable: false,
          value: fallbackValue,
        });
      } catch (defineError) {
        void defineError;
      }
    }
  }

  try {
    var globalFn = (scope && scope.Function) || Function;
    if (typeof globalFn === 'function') {
      var binder = globalFn(
        'value',
        'if (typeof ' +
        name +
        " === 'undefined') { var " +
        name +
        " = value; } else { " +
        name +
        ' = value; }\n           return ' +
        name +
        ';',
      );
      var appliedValue = typeof scope[name] === 'undefined' ? fallbackValue : scope[name];
      binder(appliedValue);
    }
  } catch (bindingError) {
    void bindingError;
  }
}

function repairAutoGearGlobals(scope) {
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return;
  }

  for (var index = 0; index < AUTO_GEAR_REFERENCE_NAMES.length; index += 1) {
    var name = AUTO_GEAR_REFERENCE_NAMES[index];
    try {
      ensureAutoGearGlobal(scope, name);
    } catch (ensureError) {
      void ensureError;
    }
  }
}

if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.setAutoGearGuards === 'function') {
  try {
    CORE_RUNTIME_STATE.setAutoGearGuards({
      isReferenceError: isAutoGearGlobalReferenceError,
      repair: repairAutoGearGlobals,
    });
  } catch (setAutoGearGuardsError) {
    void setAutoGearGuardsError;
  }
}

ensureGlobalFallback('autoGearAutoPresetId', '');
ensureGlobalFallback('baseAutoGearRules', function () {
  return [];
});
ensureGlobalFallback('autoGearScenarioModeSelect', null);

function createFallbackSafeGenerateConnectorSummary() {
  return function safeGenerateConnectorSummary(device) {
    if (!device || typeof device !== 'object') {
      return '';
    }

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(
        'Using fallback connector summary generator. Core bindings may have failed to initialise.',
      );
    }

    try {
      const keys = Object.keys(device);
      if (!keys.length) {
        return '';
      }

      const primaryKey = keys[0];
      const value = device[primaryKey];
      const label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
      return value ? `${label}: ${value}` : label;
    } catch (fallbackError) {
      void fallbackError;
      return '';
    }
  };
}

ensureGlobalFallback('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});

normaliseGlobalValue(
  'baseAutoGearRules',
  function validateBaseAutoGearRules(value) {
    return Array.isArray(value);
  },
  function provideBaseAutoGearRulesFallback() {
    return [];
  },
);

normaliseGlobalValue(
  'safeGenerateConnectorSummary',
  function validateSafeGenerateConnectorSummary(value) {
    return typeof value === 'function';
  },
  function provideSafeGenerateConnectorSummaryFallback() {
    return createFallbackSafeGenerateConnectorSummary();
  },
);

function createFallbackIconFontKeys() {
  return Object.freeze({
    ESSENTIAL: 'essential',
    FILM: 'film',
    GADGET: 'gadget',
    UICONS: 'uicons',
    TEXT: 'text',
  });
}

ensureGlobalFallback('ICON_FONT_KEYS', function () {
  return createFallbackIconFontKeys();
});

ensureGlobalFallback('iconGlyph', function () {
  const iconFontKeys = ensureGlobalFallback('ICON_FONT_KEYS', function () {
    return createFallbackIconFontKeys();
  });
  const fallbackFont =
    iconFontKeys && typeof iconFontKeys.UICONS === 'string'
      ? iconFontKeys.UICONS
      : 'uicons';

  return function fallbackIconGlyph(char, font) {
    const glyphChar = typeof char === 'string' ? char : '';
    const resolvedFont =
      font && typeof font === 'string' ? font : fallbackFont;

    try {
      return Object.freeze({ char: glyphChar, font: resolvedFont });
    } catch (freezeError) {
      void freezeError;
      return { char: glyphChar, font: resolvedFont };
    }
  };
});

ensureGlobalFallback('resolveIconGlyph', function () {
  const iconFontKeys = ensureGlobalFallback('ICON_FONT_KEYS', function () {
    return createFallbackIconFontKeys();
  });
  const validFonts = new Set(
    Object.values(iconFontKeys || {}).filter(value => typeof value === 'string' && value),
  );

  const fallbackFont = iconFontKeys && iconFontKeys.UICONS ? iconFontKeys.UICONS : 'uicons';

  function toCodePointChar(value, radix) {
    const codePoint = parseInt(value, radix);
    if (!Number.isFinite(codePoint) || codePoint < 0) {
      return null;
    }

    try {
      if (typeof String.fromCodePoint === 'function') {
        return String.fromCodePoint(codePoint);
      }
    } catch (rangeError) {
      void rangeError;
    }

    if (codePoint <= 0xffff) {
      return String.fromCharCode(codePoint);
    }

    return null;
  }

  function normalizeGlyphChar(char) {
    if (typeof char !== 'string') {
      return '';
    }

    const trimmed = char.trim();
    if (!trimmed) {
      return '';
    }

    const unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
      const decoded = toCodePointChar(unicodeMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }

    const unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
      const decoded = toCodePointChar(unicodeBraceMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }

    const hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
      const decoded = toCodePointChar(hexEntityMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }

    const decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
      const decoded = toCodePointChar(decimalEntityMatch[1], 10);
      if (decoded) {
        return decoded;
      }
    }

    return trimmed;
  }

  return function resolveIconGlyph(glyph) {
    if (!glyph) {
      return {
        char: '',
        font: fallbackFont,
        className: '',
      };
    }

    if (glyph.markup) {
      const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
      return {
        markup: glyph.markup,
        className: glyph.className || '',
        font: fallbackFont,
        size,
      };
    }

    if (typeof glyph === 'string') {
      return {
        char: normalizeGlyphChar(glyph),
        font: fallbackFont,
        className: '',
      };
    }

    if (typeof glyph === 'object') {
      const char = typeof glyph.char === 'string' ? normalizeGlyphChar(glyph.char) : '';
      const fontKey = glyph.font && validFonts.has(glyph.font) ? glyph.font : fallbackFont;
      const className = typeof glyph.className === 'string' ? glyph.className : '';
      const size = Number.isFinite(glyph.size) ? glyph.size : undefined;

      if (glyph.markup) {
        return {
          markup: glyph.markup,
          className,
          font: fontKey,
          size,
        };
      }

      return {
        char,
        font: fontKey,
        className,
        size,
      };
    }

    return {
      char: '',
      font: fallbackFont,
      className: '',
    };
  };
});

ensureGlobalFallback('formatSvgCoordinate', function () {
  return function formatSvgCoordinate(value) {
    if (!Number.isFinite(value)) return '0';
    const rounded = Math.round(value * 100) / 100;
    if (Number.isInteger(rounded)) return String(rounded);
    return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  };
});

ensureGlobalFallback('positionSvgMarkup', function () {
  const formatSvgCoordinate = ensureGlobalFallback('formatSvgCoordinate', function () {
    return function fallbackFormat(value) {
      if (!Number.isFinite(value)) return '0';
      const rounded = Math.round(value * 100) / 100;
      if (Number.isInteger(rounded)) return String(rounded);
      return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    };
  });

  return function positionSvgMarkup(markup, centerX, centerY, size = 24) {
    if (typeof markup !== 'string') {
      return {
        markup: '',
        x: '0',
        y: '0',
      };
    }

    const trimmed = markup.trim();
    if (!trimmed) {
      return {
        markup: '',
        x: '0',
        y: '0',
      };
    }

    const half = size / 2;
    const x = formatSvgCoordinate(centerX);
    const y = formatSvgCoordinate(centerY);
    const width = formatSvgCoordinate(size);
    const height = formatSvgCoordinate(size);

    const cleaned = trimmed.replace(/<svg\b([^>]*)>/i, (match, attrs = '') => {
      let attrText = attrs.replace(/\s+x\s*=\s*"[^"]*"/gi, '').replace(/\s+y\s*=\s*"[^"]*"/gi, '').trim();
      const additions = [];
      const hasWidth = /(?:^|\s)width\s*=/i.test(attrText);
      const hasHeight = /(?:^|\s)height\s*=/i.test(attrText);
      if (!hasWidth) additions.push(`width="${width}"`);
      if (!hasHeight) additions.push(`height="${height}"`);
      additions.push(`x="-${formatSvgCoordinate(half)}"`);
      additions.push(`y="-${formatSvgCoordinate(half)}"`);
      attrText = [attrText].concat(additions).filter(Boolean).join(' ').trim();
      return attrText ? `<svg ${attrText}>` : '<svg>';
    });

    return {
      markup: cleaned,
      x,
      y,
    };
  };
});

ensureGlobalFallback('applyIconGlyph', function () {
  const resolveIconGlyph = ensureGlobalFallback('resolveIconGlyph', function () {
    return function passthrough(glyph) {
      if (glyph && typeof glyph === 'object') {
        return glyph;
      }
      return { char: typeof glyph === 'string' ? glyph : '', font: 'uicons' };
    };
  });
  const ensureSvgHasAriaHidden = ensureGlobalFallback('ensureSvgHasAriaHidden', function () {
    return function passthrough(markup) {
      return markup;
    };
  });

  return function applyIconGlyph(element, glyph) {
    if (!element) return;
    const resolved = resolveIconGlyph(glyph);
    if (resolved && resolved.markup) {
      element.innerHTML = ensureSvgHasAriaHidden(resolved.markup);
      element.setAttribute('aria-hidden', 'true');
      if (resolved.className && element.classList) {
        resolved.className.split(/\s+/).filter(Boolean).forEach(cls => element.classList.add(cls));
      }
      element.removeAttribute('data-icon-font');
      return;
    }

    const char = (resolved && resolved.char) || '';
    element.textContent = char;
    if (char) {
      element.setAttribute('data-icon-font', resolved.font || 'uicons');
    } else {
      element.removeAttribute('data-icon-font');
    }
  };
});

var autoGearAutoPresetId;
if (typeof autoGearAutoPresetId === 'undefined') {
  // Ensure a concrete global binding exists for browsers that throw when a
  // property-only binding is accessed without `window.`.
  autoGearAutoPresetId = '';
} else if (typeof autoGearAutoPresetId !== 'string') {
  autoGearAutoPresetId = '';
}

var baseAutoGearRules;
if (typeof baseAutoGearRules === 'undefined') {
  baseAutoGearRules = [];
} else if (!Array.isArray(baseAutoGearRules)) {
  baseAutoGearRules = [];
}

var autoGearScenarioModeSelect;
if (typeof autoGearScenarioModeSelect === 'undefined') {
  autoGearScenarioModeSelect = null;
}

var safeGenerateConnectorSummary;
if (typeof safeGenerateConnectorSummary === 'undefined') {
  safeGenerateConnectorSummary = createFallbackSafeGenerateConnectorSummary();
} else if (typeof safeGenerateConnectorSummary !== 'function') {
  safeGenerateConnectorSummary = createFallbackSafeGenerateConnectorSummary();
}

function ensureCorePart2Placeholder(name, fallbackValue) {
  var providers = [
    CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
      ? CORE_PART2_RUNTIME_SCOPE
      : null,
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
      ? CORE_GLOBAL_SCOPE
      : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ].filter(Boolean);

  var fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
        return fallbackValue;
      };

  for (var index = 0; index < providers.length; index += 1) {
    var scope = providers[index];
    try {
      if (typeof scope[name] === 'undefined') {
        scope[name] = fallbackProvider();
      }
      return scope[name];
    } catch (placeholderError) {
      void placeholderError;
    }
  }

  return fallbackProvider();
}

ensureCorePart2Placeholder('autoGearAutoPresetId', '');
ensureCorePart2Placeholder('baseAutoGearRules', function () {
  return [];
});
ensureCorePart2Placeholder('autoGearScenarioModeSelect', null);
ensureCorePart2Placeholder('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});

function resolveInitialPart2Value(name) {
  const candidates = [
    CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
      ? CORE_PART2_RUNTIME_SCOPE
      : null,
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
      ? CORE_GLOBAL_SCOPE
      : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ].filter(Boolean);

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || typeof scope !== 'object') {
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

const autoGearAutoPresetIdSeed = resolveInitialPart2Value('autoGearAutoPresetId');
var autoGearAutoPresetIdState =
  typeof autoGearAutoPresetIdSeed === 'string' ? autoGearAutoPresetIdSeed : '';

const baseAutoGearRulesSeed = resolveInitialPart2Value('baseAutoGearRules');
var baseAutoGearRulesState = Array.isArray(baseAutoGearRulesSeed) ? baseAutoGearRulesSeed : [];

const autoGearScenarioModeSelectSeed = resolveInitialPart2Value('autoGearScenarioModeSelect');
let autoGearScenarioModeSelectRef =
  autoGearScenarioModeSelectSeed && typeof autoGearScenarioModeSelectSeed === 'object'
    ? autoGearScenarioModeSelectSeed
    : null;

const safeGenerateConnectorSummarySeed = resolveInitialPart2Value('safeGenerateConnectorSummary');
let safeGenerateConnectorSummaryFn =
  typeof safeGenerateConnectorSummarySeed === 'function'
    ? safeGenerateConnectorSummarySeed
    : createFallbackSafeGenerateConnectorSummary();

let connectorSummaryWarningIssued = false;
function generateSafeConnectorSummary(device) {
  const candidates = [];
  if (typeof safeGenerateConnectorSummaryFn === 'function') {
    candidates.push(safeGenerateConnectorSummaryFn);
  }
  const globalSafeSummary = readGlobalScopeValue('safeGenerateConnectorSummary');
  if (typeof globalSafeSummary === 'function') {
    candidates.push(globalSafeSummary);
  }
  if (
    typeof CORE_SHARED !== 'undefined' &&
    CORE_SHARED &&
    typeof CORE_SHARED.safeGenerateConnectorSummary === 'function'
  ) {
    candidates.push(CORE_SHARED.safeGenerateConnectorSummary);
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const generator = candidates[index];
    try {
      const summary = generator(device);
      if (typeof summary === 'string') {
        return summary;
      }
      if (typeof summary === 'undefined' || summary === null) {
        continue;
      }
      return String(summary);
    } catch (error) {
      if (!connectorSummaryWarningIssued) {
        connectorSummaryWarningIssued = true;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to generate connector summary. Falling back to empty summary.', error);
        }
      }
    }
  }

  return '';
}

