function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function resolveCoreDeviceSchemaNamespace() {
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      if (scope.CORE_DEVICE_SCHEMA && _typeof(scope.CORE_DEVICE_SCHEMA) === 'object') {
        return scope.CORE_DEVICE_SCHEMA;
      }
    } catch (coreDeviceSchemaLookupError) {
      void coreDeviceSchemaLookupError;
    }
    try {
      if (scope.cineCoreDeviceSchema && _typeof(scope.cineCoreDeviceSchema) === 'object') {
        return scope.cineCoreDeviceSchema;
      }
    } catch (cineCoreDeviceSchemaLookupError) {
      void cineCoreDeviceSchemaLookupError;
    }
  }
  if (typeof require === 'function') {
    try {
      var moduleNamespace = require('./modules/core/device-schema.js');
      if (moduleNamespace && _typeof(moduleNamespace) === 'object') {
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
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    try {
      var loader = scope.cineCoreRuntimeModuleLoader;
      return loader && _typeof(loader) === 'object' ? loader : null;
    } catch (loaderLookupError) {
      void loaderLookupError;
    }
    return null;
  }
  if (typeof cineCoreRuntimeModuleLoader !== 'undefined' && cineCoreRuntimeModuleLoader && (typeof cineCoreRuntimeModuleLoader === "undefined" ? "undefined" : _typeof(cineCoreRuntimeModuleLoader)) === 'object') {
    return cineCoreRuntimeModuleLoader;
  }
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var loader = readLoaderFromScope(candidates[index]);
    if (loader) {
      return loader;
    }
  }
  if (typeof require === 'function') {
    try {
      var requiredLoader = require('./modules/core/runtime-module-loader.js');
      if (requiredLoader && _typeof(requiredLoader) === 'object') {
        return requiredLoader;
      }
    } catch (runtimeLoaderError) {
      void runtimeLoaderError;
    }
  }
  for (var _index = 0; _index < candidates.length; _index += 1) {
    var _loader = readLoaderFromScope(candidates[_index]);
    if (_loader) {
      return _loader;
    }
  }
  return null;
}
function requireCoreRuntimeModule(moduleId, options) {
  var loader = resolveRuntimeModuleLoader();
  if (loader && typeof loader.resolveCoreRuntimeModule === 'function') {
    try {
      var resolved = loader.resolveCoreRuntimeModule(moduleId, options);
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
      return resolved;
    } catch (moduleResolutionError) {
      void moduleResolutionError;
    }
  }
  return null;
}
var CORE_RUNTIME_SUPPORT_BOOTSTRAP = function resolveRuntimeSupportBootstrap() {
  var namespaceName = 'cineCoreRuntimeSupportBootstrap';
  function readFromScope(candidateScope) {
    if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }
    try {
      var bootstrapCandidate = candidateScope[namespaceName];
      return bootstrapCandidate && _typeof(bootstrapCandidate) === 'object' ? bootstrapCandidate : null;
    } catch (candidateLookupError) {
      void candidateLookupError;
    }
    return null;
  }
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var bootstrap = readFromScope(candidates[index]);
    if (bootstrap) {
      return bootstrap;
    }
  }
  var requiredBootstrap = requireCoreRuntimeModule('modules/core/runtime-support-bootstrap.js', {
    primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
  });
  if (requiredBootstrap && _typeof(requiredBootstrap) === 'object') {
    return requiredBootstrap;
  }
  for (var _index2 = 0; _index2 < candidates.length; _index2 += 1) {
    var _bootstrap = readFromScope(candidates[_index2]);
    if (_bootstrap) {
      return _bootstrap;
    }
  }
  return null;
}();
var CORE_RUNTIME_SUPPORT_RESOLUTION = function resolveRuntimeSupportResolution() {
  var namespaceName = 'cineCoreRuntimeSupportResolution';
  function readFromScope(candidateScope) {
    if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }
    try {
      var resolution = candidateScope[namespaceName];
      return resolution && _typeof(resolution) === 'object' ? resolution : null;
    } catch (resolutionLookupError) {
      void resolutionLookupError;
    }
    return null;
  }
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var resolution = readFromScope(candidates[index]);
    if (resolution) {
      return resolution;
    }
  }
  var requiredResolution = requireCoreRuntimeModule('modules/core/runtime-support-resolution.js', {
    primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
  });
  if (requiredResolution && _typeof(requiredResolution) === 'object') {
    return requiredResolution;
  }
  for (var _index3 = 0; _index3 < candidates.length; _index3 += 1) {
    var _resolution = readFromScope(candidates[_index3]);
    if (_resolution) {
      return _resolution;
    }
  }
  return null;
}();
var CORE_TEXT_ENTRY_TOOLS = function resolveCoreTextEntryTools() {
  var namespaceName = 'cineCoreTextEntries';
  if (typeof cineCoreTextEntries !== 'undefined' && cineCoreTextEntries && (typeof cineCoreTextEntries === "undefined" ? "undefined" : _typeof(cineCoreTextEntries)) === 'object') {
    return cineCoreTextEntries;
  }
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var tools = scope[namespaceName];
      if (tools && _typeof(tools) === 'object') {
        return tools;
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
  }
  if (typeof require === 'function') {
    try {
      var requiredTools = require('./app-core-text.js');
      if (requiredTools && _typeof(requiredTools) === 'object') {
        return requiredTools;
      }
    } catch (textEntriesRequireError) {
      void textEntriesRequireError;
    }
  }
  return null;
}();
var CORE_TEXT_ENTRY_SEPARATOR = CORE_TEXT_ENTRY_TOOLS && typeof CORE_TEXT_ENTRY_TOOLS.TEXT_ENTRY_SEPARATOR === 'string' && CORE_TEXT_ENTRY_TOOLS.TEXT_ENTRY_SEPARATOR ? CORE_TEXT_ENTRY_TOOLS.TEXT_ENTRY_SEPARATOR : '\n';
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
    var parts = [];
    for (var index = 0; index < entry.length; index += 1) {
      var value = inlineNormaliseTextEntryValue(entry[index]);
      if (value) {
        parts.push(value);
      }
    }
    return parts.join(CORE_TEXT_ENTRY_SEPARATOR);
  }
  if (entry && _typeof(entry) === 'object') {
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
      var objectString = String(entry);
      if (objectString && objectString !== '[object Object]') {
        return objectString;
      }
    } catch (stringifyObjectError) {
      void stringifyObjectError;
    }
  }
  return '';
}
function inlineResolveTextEntry(primaryTexts, fallbackTexts, key) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var normalizedDefault = typeof defaultValue === 'string' ? defaultValue : '';
  var dictionaries = [];
  if (primaryTexts && (_typeof(primaryTexts) === 'object' || typeof primaryTexts === 'function')) {
    dictionaries.push(primaryTexts);
  }
  if (fallbackTexts && fallbackTexts !== primaryTexts && (_typeof(fallbackTexts) === 'object' || typeof fallbackTexts === 'function')) {
    dictionaries.push(fallbackTexts);
  }
  for (var index = 0; index < dictionaries.length; index += 1) {
    var dictionary = dictionaries[index];
    var entry = void 0;
    try {
      entry = dictionary[key];
    } catch (dictionaryLookupError) {
      void dictionaryLookupError;
      entry = undefined;
    }
    if (typeof entry === 'undefined' || entry === null) {
      continue;
    }
    var resolved = inlineNormaliseTextEntryValue(entry);
    if (typeof resolved === 'string') {
      return resolved;
    }
  }
  return normalizedDefault;
}
var normaliseTextEntryValue = CORE_TEXT_ENTRY_TOOLS && typeof CORE_TEXT_ENTRY_TOOLS.normaliseTextEntryValue === 'function' ? function normaliseTextEntryValueProxy(entry) {
  return CORE_TEXT_ENTRY_TOOLS.normaliseTextEntryValue(entry, CORE_TEXT_ENTRY_SEPARATOR);
} : inlineNormaliseTextEntryValue;
var resolveTextEntryRuntime = CORE_TEXT_ENTRY_TOOLS && typeof CORE_TEXT_ENTRY_TOOLS.resolveTextEntry === 'function' ? function resolveTextEntryProxy(primaryTexts, fallbackTexts, key) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return CORE_TEXT_ENTRY_TOOLS.resolveTextEntry(primaryTexts, fallbackTexts, key, defaultValue, CORE_TEXT_ENTRY_SEPARATOR);
} : inlineResolveTextEntry;
var resolveTextEntryInternal = function ensureResolveTextEntryAvailability(resolver) {
  var candidateScopes = [CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE, (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
  for (var _index4 = 0; _index4 < candidateScopes.length; _index4 += 1) {
    var _scope = candidateScopes[_index4];
    if (!_scope || _typeof(_scope) !== 'object' && typeof _scope !== 'function') {
      continue;
    }
    try {
      _scope.resolveTextEntry = resolver;
      if (typeof _scope.resolveTextEntry === 'function') {
        return _scope.resolveTextEntry;
      }
    } catch (assignmentError) {
      void assignmentError;
    }
  }
  return resolver;
}(resolveTextEntryRuntime);
var CORE_TEMPERATURE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_temperatureUnit';
function resolvePreferredTemperatureStorageKey() {
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    if (typeof scope.TEMPERATURE_STORAGE_KEY === 'string' && scope.TEMPERATURE_STORAGE_KEY) {
      return scope.TEMPERATURE_STORAGE_KEY;
    }
    if (typeof scope.TEMPERATURE_UNIT_STORAGE_KEY === 'string' && scope.TEMPERATURE_UNIT_STORAGE_KEY) {
      return scope.TEMPERATURE_UNIT_STORAGE_KEY;
    }
    if (scope.CORE_SHARED && _typeof(scope.CORE_SHARED) === 'object' && typeof scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY === 'string' && scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY) {
      return scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY;
    }
    if (scope.__cineStorageApi && _typeof(scope.__cineStorageApi) === 'object') {
      var storageApi = scope.__cineStorageApi;
      if (typeof storageApi.TEMPERATURE_STORAGE_KEY === 'string' && storageApi.TEMPERATURE_STORAGE_KEY) {
        return storageApi.TEMPERATURE_STORAGE_KEY;
      }
      if (typeof storageApi.getTemperaturePreferenceStorageKey === 'function') {
        try {
          var key = storageApi.getTemperaturePreferenceStorageKey();
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
        var resolved = scope.resolveTemperatureStorageKey();
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
var PREEXISTING_TEMPERATURE_STORAGE_KEY = typeof TEMPERATURE_STORAGE_KEY === 'string' && TEMPERATURE_STORAGE_KEY ? TEMPERATURE_STORAGE_KEY : null;
var CORE_TEMPERATURE_STORAGE_KEY = PREEXISTING_TEMPERATURE_STORAGE_KEY || resolvePreferredTemperatureStorageKey();
(function ensureTemperatureStorageKeyGlobal(key) {
  var candidates = [CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null];
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
  var sharedCandidates = candidates.map(function (scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    try {
      return scope.CORE_SHARED && _typeof(scope.CORE_SHARED) === 'object' ? scope.CORE_SHARED : null;
    } catch (sharedLookupError) {
      void sharedLookupError;
    }
    return null;
  }).filter(function (sharedScopeCandidate) {
    return sharedScopeCandidate;
  });
  for (var _index5 = 0; _index5 < sharedCandidates.length; _index5 += 1) {
    var sharedScope = sharedCandidates[_index5];
    if (!sharedScope || _typeof(sharedScope) !== 'object') {
      continue;
    }
    if (typeof sharedScope.TEMPERATURE_STORAGE_KEY === 'string' && sharedScope.TEMPERATURE_STORAGE_KEY) {
      continue;
    }
    try {
      sharedScope.TEMPERATURE_STORAGE_KEY = key;
    } catch (sharedAssignError) {
      void sharedAssignError;
    }
  }
})(CORE_TEMPERATURE_STORAGE_KEY);
var CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE = function resolveRuntimeSupportDefaultsNamespace() {
  var namespaceName = 'cineCoreRuntimeSupportDefaults';
  function readFromScope(candidateScope) {
    if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }
    try {
      var namespace = candidateScope[namespaceName];
      return namespace && _typeof(namespace) === 'object' ? namespace : null;
    } catch (runtimeSupportDefaultsLookupError) {
      void runtimeSupportDefaultsLookupError;
    }
    return null;
  }
  var candidates = collectRuntimeScopeCandidates();
  for (var index = 0; index < candidates.length; index += 1) {
    var defaults = readFromScope(candidates[index]);
    if (defaults) {
      return defaults;
    }
  }
  var requiredDefaults = requireCoreRuntimeModule('modules/core/runtime-support-defaults.js', {
    primaryScope: CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
  });
  if (requiredDefaults && _typeof(requiredDefaults) === 'object') {
    return requiredDefaults;
  }
  for (var _index6 = 0; _index6 < candidates.length; _index6 += 1) {
    var _defaults = readFromScope(candidates[_index6]);
    if (_defaults) {
      return _defaults;
    }
  }
  return null;
}();
function createInlineRuntimeSupportDefaults() {
  function inlineFallbackDetectRuntimeScope(primaryScope) {
    if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
      return primaryScope;
    }
    var candidates = collectRuntimeScopeCandidates();
    for (var index = 0; index < candidates.length; index += 1) {
      var scope = candidates[index];
      if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
        return scope;
      }
    }
    return null;
  }
  function inlineFallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }
    var runtimeScope = inlineFallbackDetectRuntimeScope(primaryScope);
    if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
      return runtimeScope[namespaceName];
    }
    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        var required = require(requirePath);
        if (required && _typeof(required) === 'object') {
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
        resolveCoreSupportModule: inlineFallbackResolveCoreSupportModule
      });
    }
  };
}
var CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS = CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE && typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.fallbackDetectRuntimeScope === 'function' && typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.fallbackResolveCoreSupportModule === 'function' && typeof CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE.readRuntimeSupportResolver === 'function' ? CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE : createInlineRuntimeSupportDefaults();
var CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS = function resolveRuntimeSupportResolutionTools() {
  if (CORE_RUNTIME_SUPPORT_RESOLUTION && typeof CORE_RUNTIME_SUPPORT_RESOLUTION.readRuntimeSupportResolver === 'function') {
    try {
      return CORE_RUNTIME_SUPPORT_RESOLUTION.readRuntimeSupportResolver(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE);
    } catch (runtimeSupportResolutionToolsError) {
      void runtimeSupportResolutionToolsError;
    }
  }
  try {
    return CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS.readRuntimeSupportResolver(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE);
  } catch (runtimeSupportResolutionDefaultsError) {
    void runtimeSupportResolutionDefaultsError;
  }
  return null;
}();
var CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS = CORE_RUNTIME_SUPPORT_BOOTSTRAP && typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP.resolveBootstrap === 'function' ? CORE_RUNTIME_SUPPORT_BOOTSTRAP.resolveBootstrap(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE) : null;
var CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS = !CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && CORE_RUNTIME_SUPPORT_BOOTSTRAP && typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP.readRuntimeSupportTools === 'function' ? CORE_RUNTIME_SUPPORT_BOOTSTRAP.readRuntimeSupportTools(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE) : null;
var fallbackDetectRuntimeScope = CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackDetectRuntimeScope === 'function' && CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackDetectRuntimeScope || CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS && typeof CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackDetectRuntimeScope === 'function' && CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackDetectRuntimeScope || CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS && typeof CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.detectRuntimeScope === 'function' && CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.detectRuntimeScope || CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS.fallbackDetectRuntimeScope;
var detectRuntimeScope = CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.detectRuntimeScope === 'function' && CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.detectRuntimeScope || fallbackDetectRuntimeScope;
var fallbackResolveCoreSupportModule = CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackResolveCoreSupportModule === 'function' && CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.fallbackResolveCoreSupportModule || CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS && typeof CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackResolveCoreSupportModule === 'function' && CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS.fallbackResolveCoreSupportModule || CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS && typeof CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.resolveCoreSupportModule === 'function' && CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS.resolveCoreSupportModule || CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS.fallbackResolveCoreSupportModule;
var CORE_PART1_RUNTIME_SCOPE = CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.runtimeScope ? CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.runtimeScope : detectRuntimeScope(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE);
var resolveCoreSupportModule = CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function' ? function resolveCoreSupportModule(namespaceName, requirePath) {
  return CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule(namespaceName, requirePath, CORE_PART1_RUNTIME_SCOPE);
} : function resolveCoreSupportModule(namespaceName, requirePath) {
  return fallbackResolveCoreSupportModule(namespaceName, requirePath, CORE_PART1_RUNTIME_SCOPE);
};
var CORE_RUNTIME_SUPPORT_EXPORTS = function ensureRuntimeSupportExportsNamespace() {
  var namespaceName = 'cineCoreRuntimeSupportExports';
  function readNamespace(candidateScope) {
    if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }
    try {
      var _namespace = candidateScope[namespaceName];
      return _namespace && _typeof(_namespace) === 'object' ? _namespace : null;
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
    return null;
  }
  var candidateScopes = collectRuntimeScopeCandidates([(typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null]);
  var namespace = null;
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var existing = readNamespace(candidateScopes[index]);
    if (existing) {
      namespace = existing;
      break;
    }
  }
  if (!namespace || _typeof(namespace) !== 'object') {
    namespace = {};
  } else {
    var isExtensible = typeof Object.isExtensible === 'function' ? Object.isExtensible(namespace) : true;
    var isSealed = typeof Object.isSealed === 'function' && Object.isSealed(namespace);
    if (!isExtensible || isSealed) {
      namespace = Object.assign({}, namespace);
    }
  }
  function assignExport(target, key, value) {
    if (!target || _typeof(target) !== 'object') {
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
        value: value
      });
    } catch (defineError) {
      void defineError;
    }
  }
  assignExport(namespace, 'resolveRuntimeModuleLoader', resolveRuntimeModuleLoader);
  assignExport(namespace, 'requireCoreRuntimeModule', requireCoreRuntimeModule);
  for (var _index7 = 0; _index7 < candidateScopes.length; _index7 += 1) {
    var scope = candidateScopes[_index7];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      scope[namespaceName] = namespace;
    } catch (namespaceAssignError) {
      void namespaceAssignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && _typeof(module.exports) === 'object') {
    try {
      module.exports = namespace;
    } catch (moduleExportError) {
      void moduleExportError;
    }
  }
  return namespace;
}();