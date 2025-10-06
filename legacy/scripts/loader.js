function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function resolveCriticalGlobalScope() {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  return null;
}
function ensureCriticalGlobalVariable(name, fallback) {
  var scope = resolveCriticalGlobalScope();
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return null;
  }
  var initialValue = fallback;
  try {
    if (typeof scope[name] !== 'undefined') {
      initialValue = scope[name];
    }
  } catch (readError) {
    void readError;
  }
  var value = typeof initialValue === 'undefined' ? fallback : initialValue;
  try {
    scope[name] = value;
  } catch (assignError) {
    void assignError;
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: value
      });
    } catch (defineError) {
      void defineError;
    }
  }
  try {
    var globalFn = scope && scope.Function || Function;
    if (typeof globalFn === 'function') {
      globalFn('value', "if (typeof " + name + " === 'undefined') { " + name + " = value; } return " + name + ';')(value);
    }
  } catch (bindingError) {
    void bindingError;
  }
  return scope;
}
function resolveCriticalFallback(fallback) {
  return typeof fallback === 'function' ? fallback() : fallback;
}
function normaliseCriticalGlobalVariable(name, validator, fallback) {
  var fallbackValue = resolveCriticalFallback(fallback);
  var scope = ensureCriticalGlobalVariable(name, fallbackValue) || resolveCriticalGlobalScope();
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return fallbackValue;
  }
  var currentValue = fallbackValue;
  try {
    currentValue = scope[name];
  } catch (readError) {
    void readError;
  }
  var isValid = true;
  if (typeof validator === 'function') {
    try {
      isValid = validator(currentValue);
    } catch (validationError) {
      void validationError;
      isValid = false;
    }
  }
  if (isValid) {
    return currentValue;
  }
  var nextValue = resolveCriticalFallback(fallback);
  try {
    scope[name] = nextValue;
  } catch (assignError) {
    void assignError;
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: nextValue
      });
    } catch (defineError) {
      void defineError;
    }
  }
  try {
    var globalFn = scope && scope.Function || Function;
    if (typeof globalFn === 'function') {
      globalFn('value', name + ' = value; return ' + name + ';')(nextValue);
    }
  } catch (bindingError) {
    void bindingError;
  }
  return nextValue;
}
var CRITICAL_GLOBAL_DEFINITIONS = [{
  name: 'autoGearAutoPresetId',
  validator: function validator(value) {
    return typeof value === 'string';
  },
  fallback: ''
}, {
  name: 'baseAutoGearRules',
  validator: function validator(value) {
    return Array.isArray(value);
  },
  fallback: function fallback() {
    return [];
  }
}, {
  name: 'autoGearScenarioModeSelect',
  validator: function validator(value) {
    return typeof value !== 'undefined';
  },
  fallback: null
}, {
  name: 'autoGearRuleNameInput',
  validator: function validator(value) {
    return typeof value !== 'undefined';
  },
  fallback: null
}, {
  name: 'autoGearSummaryFocus',
  validator: function validator(value) {
    return typeof value === 'string';
  },
  fallback: 'all'
}, {
  name: 'autoGearMonitorDefaultControls',
  validator: Array.isArray,
  fallback: function fallback() {
    return [];
  }
}, {
  name: 'gridSnap',
  validator: function validator(value) {
    return typeof value === 'boolean';
  },
  fallback: false
}, {
  name: 'iosPwaHelpDialog',
  validator: function validator(value) {
    return typeof value === 'undefined' || value === null || _typeof(value) === 'object';
  },
  fallback: null
}, {
  name: 'iosPwaHelpClose',
  validator: function validator(value) {
    return typeof value === 'undefined' || value === null || _typeof(value) === 'object';
  },
  fallback: null
}, {
  name: '__cineRuntimeState',
  validator: function validator(value) {
    return typeof value === 'undefined' || value === null || _typeof(value) === 'object';
  },
  fallback: null
}];
function loaderFallbackSafeGenerateConnectorSummary(device) {
  if (!device || _typeof(device) !== 'object') {
    return '';
  }
  try {
    var keys = Object.keys(device);
    if (!keys.length) {
      return '';
    }
    var primaryKey = keys[0];
    var value = device[primaryKey];
    var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
    return value ? label + ': ' + value : label;
  } catch (fallbackError) {
    void fallbackError;
    return '';
  }
}
function loaderCreateFallbackIconFontKeys() {
  return Object.freeze({
    ESSENTIAL: 'essential',
    FILM: 'film',
    GADGET: 'gadget',
    UICONS: 'uicons',
    TEXT: 'text'
  });
}
function loaderResolveIconFontKeysFallback() {
  var scope = resolveCriticalGlobalScope();
  if (scope && scope.ICON_FONT_KEYS && _typeof(scope.ICON_FONT_KEYS) === 'object') {
    return scope.ICON_FONT_KEYS;
  }
  try {
    return loaderCreateFallbackIconFontKeys();
  } catch (error) {
    void error;
    return {
      ESSENTIAL: 'essential',
      FILM: 'film',
      GADGET: 'gadget',
      UICONS: 'uicons',
      TEXT: 'text'
    };
  }
}
function loaderResolveIconFontValues() {
  var keys = loaderResolveIconFontKeysFallback();
  var values = [];
  if (keys && _typeof(keys) === 'object') {
    var candidates = [keys.ESSENTIAL, keys.FILM, keys.GADGET, keys.UICONS, keys.TEXT];
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (typeof candidate === 'string' && values.indexOf(candidate) === -1) {
        values.push(candidate);
      }
    }
  }
  if (values.indexOf('uicons') === -1) {
    values.push('uicons');
  }
  return values;
}
CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'safeGenerateConnectorSummary',
  validator: function validator(value) {
    return typeof value === 'function';
  },
  fallback: loaderFallbackSafeGenerateConnectorSummary
});
CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'totalPowerElem',
  validator: function validator(value) {
    return typeof value === 'undefined' || value === null || _typeof(value) === 'object';
  },
  fallback: null
});
CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'ICON_FONT_KEYS',
  validator: function validator(value) {
    return value && _typeof(value) === 'object' && typeof value.ESSENTIAL === 'string' && typeof value.FILM === 'string' && typeof value.GADGET === 'string' && typeof value.UICONS === 'string' && typeof value.TEXT === 'string';
  },
  fallback: function fallback() {
    return loaderResolveIconFontKeysFallback();
  }
});
CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'iconGlyph',
  validator: function validator(value) {
    return typeof value === 'function';
  },
  fallback: function fallback() {
    var fontValues = loaderResolveIconFontValues();
    return function loaderFallbackIconGlyph(char, font) {
      var glyphChar = typeof char === 'string' ? char : '';
      var normalizedFont = null;
      if (typeof font === 'string') {
        for (var index = 0; index < fontValues.length; index += 1) {
          if (fontValues[index] === font) {
            normalizedFont = font;
            break;
          }
        }
      }
      if (!normalizedFont) {
        for (var fallbackIndex = 0; fallbackIndex < fontValues.length; fallbackIndex += 1) {
          if (fontValues[fallbackIndex] === 'uicons') {
            normalizedFont = fontValues[fallbackIndex];
            break;
          }
        }
      }
      if (!normalizedFont) {
        normalizedFont = fontValues.length ? fontValues[0] : 'uicons';
      }
      try {
        return Object.freeze({
          char: glyphChar,
          font: normalizedFont
        });
      } catch (freezeError) {
        void freezeError;
        return {
          char: glyphChar,
          font: normalizedFont
        };
      }
    };
  }
});
(function initialiseCriticalGlobals() {
  var scope = resolveCriticalGlobalScope();
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return;
  }
  for (var index = 0; index < CRITICAL_GLOBAL_DEFINITIONS.length; index += 1) {
    var definition = CRITICAL_GLOBAL_DEFINITIONS[index];
    var value = normaliseCriticalGlobalVariable(definition.name, definition.validator, definition.fallback);
    try {
      scope[definition.name] = value;
    } catch (assignError) {
      void assignError;
    }
  }
})();
(function () {
  var OPTIONAL_CHAINING_FLAG = '__cinePowerOptionalChainingCheck__';
  function getGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    return null;
  }
  function collectStorages(names) {
    var storages = [];
    if (typeof window === 'undefined') {
      return storages;
    }
    for (var i = 0; i < names.length; i += 1) {
      var storage = null;
      try {
        storage = window[names[i]];
      } catch (error) {
        void error;
        storage = null;
      }
      if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
        continue;
      }
      var alreadyAdded = false;
      for (var j = 0; j < storages.length; j += 1) {
        if (storages[j] === storage) {
          alreadyAdded = true;
          break;
        }
      }
      if (!alreadyAdded) {
        storages.push(storage);
      }
    }
    return storages;
  }
  var LEGACY_BUNDLE_STORAGE_KEY = 'cameraPowerPlanner_forceLegacyBundle';
  var LEGACY_BUNDLE_RETRY_SESSION_KEY = 'cameraPowerPlanner_forceLegacyBundleRetry';
  var LEGACY_BUNDLE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  function nowMilliseconds() {
    if (typeof Date !== 'function' || typeof Date.now !== 'function') {
      return null;
    }
    return Date.now();
  }
  function getLegacyFlagStorages() {
    return collectStorages(['localStorage']);
  }
  function getLegacyRetryStorages() {
    return collectStorages(['sessionStorage']);
  }
  function rememberLegacyBundlePreference() {
    var storages = getLegacyFlagStorages();
    if (!storages.length) {
      return false;
    }
    var stored = false;
    var timestamp = nowMilliseconds();
    var value = typeof timestamp === 'number' ? String(timestamp) : 'true';
    for (var index = 0; index < storages.length; index += 1) {
      var storage = storages[index];
      if (!storage) {
        continue;
      }
      try {
        storage.setItem(LEGACY_BUNDLE_STORAGE_KEY, value);
        stored = true;
      } catch (setError) {
        void setError;
      }
    }
    return stored;
  }
  function markLegacyBundleRetryAttempt() {
    var storages = getLegacyRetryStorages();
    if (!storages.length) {
      return false;
    }
    var timestamp = nowMilliseconds();
    var value = typeof timestamp === 'number' ? String(timestamp) : '1';
    var marked = false;
    for (var index = 0; index < storages.length; index += 1) {
      var storage = storages[index];
      if (!storage) {
        continue;
      }
      try {
        storage.setItem(LEGACY_BUNDLE_RETRY_SESSION_KEY, value);
        marked = true;
      } catch (setError) {
        void setError;
      }
    }
    return marked;
  }
  function clearLegacyBundlePreference() {
    var storages = getLegacyFlagStorages();
    var cleared = false;
    for (var index = 0; index < storages.length; index += 1) {
      var storage = storages[index];
      if (!storage) {
        continue;
      }
      try {
        if (typeof storage.removeItem === 'function') {
          storage.removeItem(LEGACY_BUNDLE_STORAGE_KEY);
          cleared = true;
        }
      } catch (removeError) {
        void removeError;
      }
    }
    return cleared;
  }
  function hasLegacyBundleRetryAttempt() {
    var storages = getLegacyRetryStorages();
    if (!storages.length) {
      return false;
    }
    for (var index = 0; index < storages.length; index += 1) {
      var storage = storages[index];
      if (!storage) {
        continue;
      }
      try {
        var rawValue = storage.getItem(LEGACY_BUNDLE_RETRY_SESSION_KEY);
        if (typeof rawValue === 'string' && rawValue) {
          return true;
        }
      } catch (readError) {
        void readError;
      }
    }
    return false;
  }
  function shouldForceLegacyBundle() {
    if (typeof window === 'undefined') {
      return false;
    }
    var storages = getLegacyFlagStorages();
    if (!storages.length) {
      return false;
    }
    var now = nowMilliseconds();
    var forceLegacy = false;
    for (var index = 0; index < storages.length; index += 1) {
      var storage = storages[index];
      if (!storage) {
        continue;
      }
      var rawValue = null;
      try {
        rawValue = storage.getItem(LEGACY_BUNDLE_STORAGE_KEY);
      } catch (readError) {
        void readError;
        continue;
      }
      if (typeof rawValue !== 'string' || !rawValue) {
        continue;
      }
      var parsed = parseInt(rawValue, 10);
      if (!isNaN(parsed) && typeof parsed === 'number' && now !== null) {
        if (now - parsed <= LEGACY_BUNDLE_MAX_AGE) {
          forceLegacy = true;
        } else {
          try {
            storage.removeItem(LEGACY_BUNDLE_STORAGE_KEY);
          } catch (cleanupError) {
            void cleanupError;
          }
        }
      } else {
        forceLegacy = true;
      }
    }
    return forceLegacy;
  }
  function triggerLegacyBundleReload(options) {
    var settings = options || {};
    if (settings.rememberPreference !== false) {
      rememberLegacyBundlePreference();
    }
    if (settings.markRetry === true) {
      markLegacyBundleRetryAttempt();
    }
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      if (window.location && typeof window.location.reload === 'function') {
        window.location.reload();
        return true;
      }
      if (window.location && typeof window.location.href === 'string') {
        window.location.assign(window.location.href);
        return true;
      }
    } catch (reloadError) {
      void reloadError;
    }
    return false;
  }
  function ensureCoreRuntimePlaceholders() {
    var scope = getGlobalScope();
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    for (var index = 0; index < CRITICAL_GLOBAL_DEFINITIONS.length; index += 1) {
      var definition = CRITICAL_GLOBAL_DEFINITIONS[index];
      if (typeof scope[definition.name] === 'undefined') {
        scope[definition.name] = resolveCriticalFallback(definition.fallback);
      }
    }
  }
  function migrateKey(storage, legacyKey, modernKey) {
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
      return false;
    }
    var legacyValue;
    try {
      legacyValue = storage.getItem(legacyKey);
    } catch (readError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to read legacy storage key during migration:', legacyKey, readError);
      }
      return false;
    }
    if (legacyValue === null || typeof legacyValue === 'undefined') {
      return false;
    }
    try {
      var existing = storage.getItem(modernKey);
      if (existing !== null && typeof existing !== 'undefined') {
        return false;
      }
    } catch (inspectionError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to inspect modern storage key during migration:', modernKey, inspectionError);
      }
    }
    try {
      storage.setItem(modernKey, legacyValue);
    } catch (writeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to migrate legacy storage key:', legacyKey, writeError);
      }
      return false;
    }
    try {
      storage.removeItem(legacyKey);
    } catch (removeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to remove legacy storage key after migration:', legacyKey, removeError);
      }
    }
    return true;
  }
  function migrateKeyWithBackups(storages, legacyKey, modernKey) {
    var migrated = false;
    var backupSuffix = '__backup';
    for (var i = 0; i < storages.length; i += 1) {
      if (migrateKey(storages[i], legacyKey, modernKey)) {
        migrated = true;
      }
      migrateKey(storages[i], legacyKey + backupSuffix, modernKey + backupSuffix);
    }
    return migrated;
  }
  function migrateLegacyStorageKeys() {
    if (typeof window === 'undefined') {
      return;
    }
    var localStorages = collectStorages(['localStorage']);
    var sessionStorages = collectStorages(['sessionStorage']);
    if (!localStorages.length && !sessionStorages.length) {
      return;
    }
    var legacyPrefix = 'cinePowerPlanner_';
    var mappings = [{
      legacy: legacyPrefix + 'devices',
      modern: 'cameraPowerPlanner_devices'
    }, {
      legacy: legacyPrefix + 'setups',
      modern: 'cameraPowerPlanner_setups'
    }, {
      legacy: legacyPrefix + 'session',
      modern: 'cameraPowerPlanner_session',
      includeSession: true
    }, {
      legacy: legacyPrefix + 'feedback',
      modern: 'cameraPowerPlanner_feedback'
    }, {
      legacy: legacyPrefix + 'project',
      modern: 'cameraPowerPlanner_project'
    }, {
      legacy: legacyPrefix + 'projects',
      modern: 'cameraPowerPlanner_project'
    }, {
      legacy: legacyPrefix + 'favorites',
      modern: 'cameraPowerPlanner_favorites'
    }, {
      legacy: legacyPrefix + 'schemaCache',
      modern: 'cameraPowerPlanner_schemaCache'
    }, {
      legacy: legacyPrefix + 'autoGearRules',
      modern: 'cameraPowerPlanner_autoGearRules'
    }, {
      legacy: legacyPrefix + 'autoGearBackups',
      modern: 'cameraPowerPlanner_autoGearBackups'
    }, {
      legacy: legacyPrefix + 'autoGearSeeded',
      modern: 'cameraPowerPlanner_autoGearSeeded'
    }, {
      legacy: legacyPrefix + 'autoGearPresets',
      modern: 'cameraPowerPlanner_autoGearPresets'
    }, {
      legacy: legacyPrefix + 'autoGearActivePreset',
      modern: 'cameraPowerPlanner_autoGearActivePreset'
    }, {
      legacy: legacyPrefix + 'autoGearAutoPreset',
      modern: 'cameraPowerPlanner_autoGearAutoPreset'
    }, {
      legacy: legacyPrefix + 'autoGearShowBackups',
      modern: 'cameraPowerPlanner_autoGearShowBackups'
    }, {
      legacy: legacyPrefix + 'autoGearBackupRetention',
      modern: 'cameraPowerPlanner_autoGearBackupRetention'
    }, {
      legacy: legacyPrefix + 'autoGearMonitorDefaults',
      modern: 'cameraPowerPlanner_autoGearMonitorDefaults'
    }, {
      legacy: legacyPrefix + 'customFonts',
      modern: 'cameraPowerPlanner_customFonts',
      updateFontKey: true
    }];
    var globalScope = getGlobalScope();
    for (var i = 0; i < mappings.length; i += 1) {
      var mapping = mappings[i];
      var migratedLocal = migrateKeyWithBackups(localStorages, mapping.legacy, mapping.modern);
      if (mapping.includeSession) {
        migrateKeyWithBackups(sessionStorages, mapping.legacy, mapping.modern);
      }
      if (mapping.updateFontKey && migratedLocal && globalScope) {
        if (typeof globalScope.CUSTOM_FONT_STORAGE_KEY === 'string' && globalScope.CUSTOM_FONT_STORAGE_KEY === mapping.legacy) {
          globalScope.CUSTOM_FONT_STORAGE_KEY = mapping.modern;
        }
        if (typeof globalScope.CUSTOM_FONT_STORAGE_KEY_NAME === 'string' && globalScope.CUSTOM_FONT_STORAGE_KEY_NAME === mapping.legacy) {
          globalScope.CUSTOM_FONT_STORAGE_KEY_NAME = mapping.modern;
        }
      }
    }
  }
  function cleanupOptionalFlag(scope) {
    if (!scope) {
      return;
    }
    try {
      delete scope[OPTIONAL_CHAINING_FLAG];
    } catch (deleteError) {
      void deleteError;
      scope[OPTIONAL_CHAINING_FLAG] = undefined;
    }
  }
  function isSyntaxErrorEvent(event) {
    if (!event) {
      return false;
    }
    var error = event;
    if (_typeof(event) === 'object' && event !== null) {
      if (event.error && _typeof(event.error) === 'object') {
        error = event.error;
      }
    }
    if (error && typeof error.name === 'string' && error.name === 'SyntaxError') {
      return true;
    }
    if (typeof SyntaxError !== 'undefined' && error instanceof SyntaxError) {
      return true;
    }
    var message = '';
    if (event && typeof event.message === 'string' && event.message) {
      message = event.message;
    } else if (error && typeof error.message === 'string' && error.message) {
      message = error.message;
    }
    if (!message) {
      return false;
    }
    var lower = message.toLowerCase();
    if (lower.indexOf('unexpected token') !== -1) {
      return true;
    }
    if (lower.indexOf('unexpected character') !== -1) {
      return true;
    }
    if (lower.indexOf('cannot use optional chaining') !== -1) {
      return true;
    }
    if (lower.indexOf('invalid or unexpected token') !== -1) {
      return true;
    }
    if (lower.indexOf('failed to parse module') !== -1) {
      return true;
    }
    return false;
  }
  function isUnsafeEvalAllowed() {
    if (typeof document === 'undefined') {
      return true;
    }
    var metas = document.getElementsByTagName('meta');
    for (var index = 0; index < metas.length; index += 1) {
      var meta = metas[index];
      if (!meta || typeof meta.getAttribute !== 'function') {
        continue;
      }
      var httpEquiv = meta.getAttribute('http-equiv');
      if (!httpEquiv || typeof httpEquiv !== 'string') {
        continue;
      }
      if (httpEquiv.toLowerCase() !== 'content-security-policy') {
        continue;
      }
      var content = meta.getAttribute('content');
      if (!content || typeof content !== 'string') {
        continue;
      }
      var lowerContent = content.toLowerCase();
      var directives = lowerContent.split(';');
      var scriptDirective = null;
      var defaultDirective = null;
      for (var dirIndex = 0; dirIndex < directives.length; dirIndex += 1) {
        var rawDirective = directives[dirIndex];
        if (!rawDirective) {
          continue;
        }
        var directive = rawDirective.trim();
        if (!directive) {
          continue;
        }
        if (directive.indexOf('script-src') === 0) {
          var scriptChar = directive.charAt('script-src'.length);
          if (scriptChar && scriptChar !== ' ' && scriptChar !== "\t" && scriptChar !== "'" && scriptChar !== '"') {
            continue;
          }
          scriptDirective = directive;
        } else if (directive.indexOf('default-src') === 0) {
          defaultDirective = directive;
        }
      }
      var directiveToInspect = scriptDirective || defaultDirective;
      if (directiveToInspect && directiveToInspect.indexOf('unsafe-eval') === -1) {
        return false;
      }
      if (directiveToInspect) {
        return true;
      }
    }
    return true;
  }
  function detectOptionalChainingSupport() {
    if (typeof Function !== 'function') {
      return null;
    }
    if (!isUnsafeEvalAllowed()) {
      return null;
    }
    try {
      var evaluator = Function('"use strict"; return ({ a: { b: 1 } })?.a?.b ?? 2 === 1;');
      return evaluator() === true;
    } catch (error) {
      if (isSyntaxErrorEvent(error)) {
        return false;
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Optional chaining detection via Function constructor failed unexpectedly. Falling back to module-based check.', error);
      }
      return null;
    }
  }
  function supportsModernFeatures(callback) {
    var cb = typeof callback === 'function' ? callback : function () {};
    if (typeof window === 'undefined') {
      cb(true);
      return;
    }
    if (typeof Promise === 'undefined' || typeof Object.assign !== 'function') {
      cb(false);
      return;
    }
    var arrayProto = Array.prototype;
    var stringProto = String.prototype;
    if (typeof Array.from !== 'function' || typeof arrayProto.includes !== 'function') {
      cb(false);
      return;
    }
    if (typeof arrayProto.find !== 'function' || typeof arrayProto.findIndex !== 'function') {
      cb(false);
      return;
    }
    if (typeof arrayProto.flatMap !== 'function') {
      cb(false);
      return;
    }
    if (typeof Object.entries !== 'function' || typeof Object.fromEntries !== 'function') {
      cb(false);
      return;
    }
    if (typeof stringProto.includes !== 'function' || typeof stringProto.startsWith !== 'function') {
      cb(false);
      return;
    }
    var optionalSupport = detectOptionalChainingSupport();
    if (optionalSupport === true) {
      cb(true);
      return;
    }
    if (optionalSupport === false) {
      cb(false);
      return;
    }
    var globalScope = getGlobalScope();
    var scriptElement = document.createElement('script');
    if (!('noModule' in scriptElement)) {
      cb(false);
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var optionalCheckScript = document.createElement('script');
    var resolved = false;
    var fallbackTimeoutId = null;
    function finalize(result) {
      if (resolved) {
        return;
      }
      resolved = true;
      if (fallbackTimeoutId !== null && typeof clearTimeout === 'function') {
        try {
          clearTimeout(fallbackTimeoutId);
        } catch (clearError) {
          void clearError;
        }
        fallbackTimeoutId = null;
      }
      if (optionalCheckScript.parentNode) {
        optionalCheckScript.parentNode.removeChild(optionalCheckScript);
      }
      cleanupOptionalFlag(globalScope);
      cb(result);
    }
    optionalCheckScript.type = 'module';
    optionalCheckScript.src = 'src/scripts/modern-support-check.mjs';
    optionalCheckScript.onload = function () {
      var supported = !!(globalScope && globalScope[OPTIONAL_CHAINING_FLAG]);
      if (!supported) {
        supported = true;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Modern support check module loaded without reporting support flag. Assuming modern feature support.');
        }
      }
      finalize(supported);
    };
    optionalCheckScript.onerror = function (event) {
      var syntaxError = isSyntaxErrorEvent(event);
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        if (syntaxError) {
          console.warn('Modern support check failed due to syntax error. Falling back to legacy bundle.', event);
        } else {
          console.warn('Modern support check could not be loaded safely. Falling back to legacy bundle.', event);
        }
      }
      finalize(false);
    };
    try {
      if (typeof setTimeout === 'function') {
        fallbackTimeoutId = setTimeout(function () {
          finalize(false);
        }, 3000);
      }
      head.appendChild(optionalCheckScript);
    } catch (appendError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to append modern support check script. Falling back to legacy bundle.', appendError);
      }
      finalize(false);
    }
  }
  function loadScriptsSequentially(urls, options) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var index = 0;
    var aborted = false;
    var settings = options || {};
    function next() {
      if (aborted || index >= urls.length) {
        return;
      }
      var currentIndex = index;
      var currentUrl = urls[currentIndex];
      var script = document.createElement('script');
      script.src = currentUrl;
      script.async = false;
      script.defer = false;
      script.onload = function () {
        if (aborted) {
          return;
        }
        index = currentIndex + 1;
        next();
      };
      script.onerror = function (event) {
        console.error('Failed to load script:', currentUrl, event && event.error);
        var shouldAbort = false;
        if (typeof settings.onError === 'function') {
          try {
            shouldAbort = settings.onError({
              event: event,
              url: currentUrl,
              index: currentIndex
            }) === true;
          } catch (callbackError) {
            console.error('Loader error callback failed', callbackError);
          }
        }
        if (shouldAbort) {
          aborted = true;
          return;
        }
        if (aborted) {
          return;
        }
        index = currentIndex + 1;
        next();
      };
      head.appendChild(script);
    }
    next();
    return {
      cancel: function cancelSequentialLoader() {
        aborted = true;
      }
    };
  }
  var modernScripts = ['src/scripts/globalthis-polyfill.js', 'src/data/devices/index.js', 'src/data/devices/cameras.js', 'src/data/devices/monitors.js', 'src/data/devices/video.js', 'src/data/devices/fiz.js', 'src/data/devices/batteries.js', 'src/data/devices/batteryHotswaps.js', 'src/data/devices/chargers.js', 'src/data/devices/cages.js', 'src/data/devices/gearList.js', 'src/data/devices/wirelessReceivers.js', 'src/scripts/storage.js', 'src/scripts/translations.js', 'src/vendor/lz-string.min.js', 'src/vendor/lottie-light.min.js', 'src/scripts/auto-gear-weight.js', 'src/scripts/modules/base.js', 'src/scripts/modules/registry.js', 'src/scripts/modules/environment-bridge.js', 'src/scripts/modules/globals.js', 'src/scripts/modules/offline.js', 'src/scripts/modules/core-shared.js', 'src/scripts/modules/features/auto-gear-rules.js', 'src/scripts/modules/features/backup.js', 'src/scripts/modules/features/print-workflow.js', 'src/scripts/modules/ui.js', 'src/scripts/modules/results.js', 'src/scripts/modules/gear-list.js', 'src/scripts/app-core-new-1.js', 'src/scripts/app-core-new-2.js', 'src/scripts/app-events.js', 'src/scripts/app-setups.js', 'src/scripts/restore-verification.js', 'src/scripts/app-session.js', 'src/scripts/modules/persistence.js', 'src/scripts/modules/runtime.js', 'src/scripts/script.js', 'src/scripts/auto-gear-monitoring.js', 'src/scripts/overview.js', 'src/scripts/autosave-overlay.js'];
  var legacyScripts = ['legacy/polyfills/core-js-bundle.min.js', 'legacy/polyfills/regenerator-runtime.js', 'legacy/scripts/globalthis-polyfill.js', 'legacy/data/devices/index.js', 'legacy/data/devices/cameras.js', 'legacy/data/devices/monitors.js', 'legacy/data/devices/video.js', 'legacy/data/devices/fiz.js', 'legacy/data/devices/batteries.js', 'legacy/data/devices/batteryHotswaps.js', 'legacy/data/devices/chargers.js', 'legacy/data/devices/cages.js', 'legacy/data/devices/gearList.js', 'legacy/data/devices/wirelessReceivers.js', 'legacy/scripts/storage.js', 'legacy/scripts/translations.js', 'src/vendor/lz-string.min.js', 'src/vendor/lottie-light.min.js', 'legacy/scripts/auto-gear-weight.js', 'legacy/scripts/modules/base.js', 'legacy/scripts/modules/registry.js', 'src/scripts/modules/environment-bridge.js', 'src/scripts/modules/globals.js', 'legacy/scripts/modules/offline.js', 'legacy/scripts/modules/core-shared.js', 'src/scripts/modules/features/backup.js', 'src/scripts/modules/features/print-workflow.js', 'legacy/scripts/modules/ui.js', 'src/scripts/modules/results.js', 'src/scripts/modules/gear-list.js', 'legacy/scripts/app-core-new-1.js', 'legacy/scripts/app-core-new-2.js', 'legacy/scripts/app-events.js', 'legacy/scripts/app-setups.js', 'legacy/scripts/app-session.js', 'legacy/scripts/modules/runtime.js', 'legacy/scripts/modules/persistence.js', 'legacy/scripts/script.js', 'legacy/scripts/auto-gear-monitoring.js', 'legacy/scripts/overview.js', 'legacy/scripts/autosave-overlay.js'];
  function startLoading() {
    if (shouldForceLegacyBundle()) {
      window.__CINE_POWER_LEGACY_BUNDLE__ = true;
      if (hasLegacyBundleRetryAttempt()) {
        loadScriptsSequentially(legacyScripts);
        return;
      }
      supportsModernFeatures(function (supportsModern) {
        if (supportsModern) {
          var cleared = clearLegacyBundlePreference();
          if (cleared) {
            if (triggerLegacyBundleReload({
              rememberPreference: false,
              markRetry: true
            })) {
              return;
            }
          }
        }
        loadScriptsSequentially(legacyScripts);
      });
      return;
    }
    supportsModernFeatures(function (supportsModern) {
      var scriptsToLoad = supportsModern ? modernScripts : legacyScripts;
      if (!supportsModern) {
        window.__CINE_POWER_LEGACY_BUNDLE__ = true;
      }
      var fallbackScripts = supportsModern ? legacyScripts : null;
      var fallbackTriggered = false;
      loadScriptsSequentially(scriptsToLoad, {
        onError: function handleLoaderError(context) {
          if (!supportsModern || !fallbackScripts || fallbackTriggered) {
            return false;
          }
          fallbackTriggered = true;
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Loader switching to legacy bundle after failing to load modern script:', context && context.url, context && context.event && context.event.error);
          }
          window.__CINE_POWER_LEGACY_BUNDLE__ = true;
          if (triggerLegacyBundleReload()) {
            return true;
          }
          loadScriptsSequentially(fallbackScripts);
          return true;
        }
      });
    });
  }
  try {
    migrateLegacyStorageKeys();
  } catch (migrationError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Legacy storage migration failed during loader startup.', migrationError);
    }
  }
  ensureCoreRuntimePlaceholders();
  startLoading();
})();