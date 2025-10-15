/*
 * Cine Power Planner runtime support bridge.
 *
 * This module extracts the shared runtime support helpers from the
 * oversized `app-core-new-1.js` bundle so the ongoing refactor can
 * proceed in smaller, reviewable steps without risking regressions.
 * Keeping the resolvers and fallbacks together ensures autosave,
 * sharing, backup, and restore routines keep working flawlessly
 * across online and offline environments while we continue splitting
 * the monolith. Please retain this banner until the refactor is
 * complete so Git keeps treating this file as intentionally new.
 */

function resolveCoreDeviceSchemaNamespace() {
  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      if (scope.CORE_DEVICE_SCHEMA && typeof scope.CORE_DEVICE_SCHEMA === 'object') {
        return scope.CORE_DEVICE_SCHEMA;
      }
    } catch (coreDeviceSchemaLookupError) {
      void coreDeviceSchemaLookupError;
    }

    try {
      if (scope.cineCoreDeviceSchema && typeof scope.cineCoreDeviceSchema === 'object') {
        return scope.cineCoreDeviceSchema;
      }
    } catch (cineCoreDeviceSchemaLookupError) {
      void cineCoreDeviceSchemaLookupError;
    }
  }

  if (typeof require === 'function') {
    try {
      const moduleNamespace = require('./modules/core/device-schema.js');
      if (moduleNamespace && typeof moduleNamespace === 'object') {
        return moduleNamespace;
      }
    } catch (coreDeviceSchemaRequireError) {
      void coreDeviceSchemaRequireError;
    }
  }

  return null;
}

var CORE_DEVICE_SCHEMA = resolveCoreDeviceSchemaNamespace();

function resolveRuntimeModuleLoader() {
  function readLoaderFromScope(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }

    try {
      const loader = scope.cineCoreRuntimeModuleLoader;
      return loader && typeof loader === 'object' ? loader : null;
    } catch (loaderLookupError) {
      void loaderLookupError;
    }

    return null;
  }

  if (
    typeof cineCoreRuntimeModuleLoader !== 'undefined' &&
    cineCoreRuntimeModuleLoader &&
    typeof cineCoreRuntimeModuleLoader === 'object'
  ) {
    return cineCoreRuntimeModuleLoader;
  }

  const candidates = collectRuntimeScopeCandidates();
  for (let index = 0; index < candidates.length; index += 1) {
    const loader = readLoaderFromScope(candidates[index]);
    if (loader) {
      return loader;
    }
  }

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

  for (let index = 0; index < candidates.length; index += 1) {
    const loader = readLoaderFromScope(candidates[index]);
    if (loader) {
      return loader;
    }
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
      const resolved = loader.resolveCoreRuntimeModule(moduleId, options);
      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
      return resolved;
    } catch (moduleResolutionError) {
      void moduleResolutionError;
    }
  }

  return null;
}

const CORE_RUNTIME_SUPPORT_BOOTSTRAP = (function resolveRuntimeSupportBootstrap() {
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

  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const bootstrap = readFromScope(candidates[index]);
    if (bootstrap) {
      return bootstrap;
    }
  }

  const requiredBootstrap = requireCoreRuntimeModule(
    'modules/core/runtime-support-bootstrap.js',
    { primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE }
  );
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

const CORE_RUNTIME_SUPPORT_RESOLUTION = (function resolveRuntimeSupportResolution() {
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

  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const resolution = readFromScope(candidates[index]);
    if (resolution) {
      return resolution;
    }
  }

  const requiredResolution = requireCoreRuntimeModule(
    'modules/core/runtime-support-resolution.js',
    { primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE }
  );
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

const CORE_TEXT_ENTRY_TOOLS = (function resolveCoreTextEntryTools() {
  const namespaceName = 'cineCoreTextEntries';

  if (
    typeof cineCoreTextEntries !== 'undefined' &&
    cineCoreTextEntries &&
    typeof cineCoreTextEntries === 'object'
  ) {
    return cineCoreTextEntries;
  }

  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const tools = scope[namespaceName];
      if (tools && typeof tools === 'object') {
        return tools;
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
  }

  if (typeof require === 'function') {
    try {
      const requiredTools = require('./app-core-text.js');
      if (requiredTools && typeof requiredTools === 'object') {
        return requiredTools;
      }
    } catch (textEntriesRequireError) {
      void textEntriesRequireError;
    }
  }

  return null;
})();

const CORE_TEXT_ENTRY_SEPARATOR =
  CORE_TEXT_ENTRY_TOOLS &&
  typeof CORE_TEXT_ENTRY_TOOLS.TEXT_ENTRY_SEPARATOR === 'string' &&
  CORE_TEXT_ENTRY_TOOLS.TEXT_ENTRY_SEPARATOR
    ? CORE_TEXT_ENTRY_TOOLS.TEXT_ENTRY_SEPARATOR
    : '\n';

function inlineNormaliseTextEntryValue(entry) {
  if (typeof entry === 'string') {
    return entry;
  }

  if (typeof entry === 'number' || typeof entry === 'boolean') {
    try {
      return String(entry);
    } catch (stringifyPrimitiveError) {
      void stringifyPrimitiveError;
    }
    return '';
  }

  if (Array.isArray(entry)) {
    const parts = [];
    for (let index = 0; index < entry.length; index += 1) {
      const value = inlineNormaliseTextEntryValue(entry[index]);
      if (value) {
        parts.push(value);
      }
    }
    return parts.join(CORE_TEXT_ENTRY_SEPARATOR);
  }

  if (entry && typeof entry === 'object') {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    if (Array.isArray(entry.text)) {
      return inlineNormaliseTextEntryValue(entry.text);
    }

    if (typeof entry.label === 'string') {
      return entry.label;
    }

    try {
      const objectString = String(entry);
      if (objectString && objectString !== '[object Object]') {
        return objectString;
      }
    } catch (stringifyObjectError) {
      void stringifyObjectError;
    }
  }

  return '';
}

function inlineResolveTextEntry(primaryTexts, fallbackTexts, key, defaultValue = '') {
  const normalizedDefault = typeof defaultValue === 'string' ? defaultValue : '';
  const dictionaries = [];

  if (primaryTexts && (typeof primaryTexts === 'object' || typeof primaryTexts === 'function')) {
    dictionaries.push(primaryTexts);
  }

  if (
    fallbackTexts &&
    fallbackTexts !== primaryTexts &&
    (typeof fallbackTexts === 'object' || typeof fallbackTexts === 'function')
  ) {
    dictionaries.push(fallbackTexts);
  }

  for (let index = 0; index < dictionaries.length; index += 1) {
    const dictionary = dictionaries[index];

    let entry;
    try {
      entry = dictionary[key];
    } catch (dictionaryLookupError) {
      void dictionaryLookupError;
      entry = undefined;
    }

    if (typeof entry === 'undefined' || entry === null) {
      continue;
    }

    const resolved = inlineNormaliseTextEntryValue(entry);
    if (typeof resolved === 'string') {
      return resolved;
    }
  }

  return normalizedDefault;
}

const normaliseTextEntryValue =
  CORE_TEXT_ENTRY_TOOLS && typeof CORE_TEXT_ENTRY_TOOLS.normaliseTextEntryValue === 'function'
    ? function normaliseTextEntryValueProxy(entry) {
        return CORE_TEXT_ENTRY_TOOLS.normaliseTextEntryValue(entry, CORE_TEXT_ENTRY_SEPARATOR);
      }
    : inlineNormaliseTextEntryValue;

const resolveTextEntryRuntime =
  CORE_TEXT_ENTRY_TOOLS && typeof CORE_TEXT_ENTRY_TOOLS.resolveTextEntry === 'function'
    ? function resolveTextEntryProxy(
        primaryTexts,
        fallbackTexts,
        key,
        defaultValue = ''
      ) {
        return CORE_TEXT_ENTRY_TOOLS.resolveTextEntry(
          primaryTexts,
          fallbackTexts,
          key,
          defaultValue,
          CORE_TEXT_ENTRY_SEPARATOR
        );
      }
    : inlineResolveTextEntry;

const resolveTextEntryInternal = (function ensureResolveTextEntryAvailability(resolver) {
  const candidateScopes = [
    CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
    typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null,
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      if (typeof scope.resolveTextEntry === 'function') {
        return scope.resolveTextEntry;
      }
    } catch (scopeLookupError) {
      void scopeLookupError;
    }
  }

  try {
    if (typeof resolveTextEntry === 'function') {
      return resolveTextEntry;
    }
  } catch (globalLookupError) {
    void globalLookupError;
  }

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      scope.resolveTextEntry = resolver;
      if (typeof scope.resolveTextEntry === 'function') {
        return scope.resolveTextEntry;
      }
    } catch (assignmentError) {
      void assignmentError;
    }
  }

  return resolver;
})(resolveTextEntryRuntime);

const CORE_TEMPERATURE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_temperatureUnit';

function resolvePreferredTemperatureStorageKey() {
  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    if (typeof scope.TEMPERATURE_STORAGE_KEY === 'string' && scope.TEMPERATURE_STORAGE_KEY) {
      return scope.TEMPERATURE_STORAGE_KEY;
    }

    if (
      typeof scope.TEMPERATURE_UNIT_STORAGE_KEY === 'string' &&
      scope.TEMPERATURE_UNIT_STORAGE_KEY
    ) {
      return scope.TEMPERATURE_UNIT_STORAGE_KEY;
    }

    if (
      scope.CORE_SHARED &&
      typeof scope.CORE_SHARED === 'object' &&
      typeof scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY === 'string' &&
      scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY
    ) {
      return scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY;
    }

    if (
      scope.__cineStorageApi &&
      typeof scope.__cineStorageApi === 'object'
    ) {
      const storageApi = scope.__cineStorageApi;
      if (
        typeof storageApi.TEMPERATURE_STORAGE_KEY === 'string' &&
        storageApi.TEMPERATURE_STORAGE_KEY
      ) {
        return storageApi.TEMPERATURE_STORAGE_KEY;
      }

      if (typeof storageApi.getTemperaturePreferenceStorageKey === 'function') {
        try {
          const key = storageApi.getTemperaturePreferenceStorageKey();
          if (typeof key === 'string' && key) {
            return key;
          }
        } catch (temperaturePreferenceLookupError) {
          void temperaturePreferenceLookupError;
        }
      }
    }

    if (typeof scope.resolveTemperatureStorageKey === 'function') {
      try {
        const resolved = scope.resolveTemperatureStorageKey();
        if (typeof resolved === 'string' && resolved) {
          return resolved;
        }
      } catch (resolveTemperatureStorageKeyError) {
        void resolveTemperatureStorageKeyError;
      }
    }
  }

  return CORE_TEMPERATURE_STORAGE_KEY_FALLBACK;
}

const PREEXISTING_TEMPERATURE_STORAGE_KEY =
  typeof TEMPERATURE_STORAGE_KEY === 'string' && TEMPERATURE_STORAGE_KEY
    ? TEMPERATURE_STORAGE_KEY
    : null;

const CORE_TEMPERATURE_STORAGE_KEY =
  PREEXISTING_TEMPERATURE_STORAGE_KEY || resolvePreferredTemperatureStorageKey();

(function ensureTemperatureStorageKeyGlobal(key) {
  const candidates = [
    CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
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

const CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE = (function resolveRuntimeSupportDefaultsNamespace() {
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

  const candidates = collectRuntimeScopeCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const defaults = readFromScope(candidates[index]);
    if (defaults) {
      return defaults;
    }
  }

  const requiredDefaults = requireCoreRuntimeModule(
    'modules/core/runtime-support-defaults.js',
    { primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE }
  );
  if (requiredDefaults && typeof requiredDefaults === 'object') {
    return requiredDefaults;
  }

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

    const candidates = collectRuntimeScopeCandidates();

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

    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        const required = require(requirePath);
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (supportModuleError) {
        void supportModuleError;
      }
    }

    return null;
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

const CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS =
  CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE &&
  typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.fallbackDetectRuntimeScope === 'function' &&
  typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.fallbackResolveCoreSupportModule === 'function' &&
  typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.readRuntimeSupportResolver === 'function'
    ? CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE
    : createInlineRuntimeSupportDefaults();

const CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS = (function resolveRuntimeSupportResolutionTools() {
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

const CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS =
  CORE_RUNTIME_SUPPORT_BOOTSTRAP &&
  typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP.resolveBootstrap === 'function'
    ? CORE_RUNTIME_SUPPORT_BOOTSTRAP.resolveBootstrap(
        CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
      )
    : null;

const CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS =
  !CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
  CORE_RUNTIME_SUPPORT_BOOTSTRAP &&
  typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP.readRuntimeSupportTools === 'function'
    ? CORE_RUNTIME_SUPPORT_BOOTSTRAP.readRuntimeSupportTools(
        CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
      )
    : null;

const fallbackDetectRuntimeScope =
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

const detectRuntimeScope =
  (CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
    typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.detectRuntimeScope === 'function' &&
    CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.detectRuntimeScope) ||
  fallbackDetectRuntimeScope;

const fallbackResolveCoreSupportModule =
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

var CORE_PART1_RUNTIME_SCOPE =
  CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.runtimeScope
    ? CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.runtimeScope
    : detectRuntimeScope(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE);

const resolveCoreSupportModule =
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

  const candidateScopes = collectRuntimeScopeCandidates([
    typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null,
  ]);

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
