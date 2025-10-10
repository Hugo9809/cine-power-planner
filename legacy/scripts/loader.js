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
function neutraliseDeprecatedStyleMedia(scope) {
  var target = scope || resolveCriticalGlobalScope();
  if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
    return;
  }
  if (typeof target.matchMedia !== 'function') {
    return;
  }
  if (typeof Object.defineProperty !== 'function' || typeof Object.getPrototypeOf !== 'function' || typeof Object.getOwnPropertyDescriptor !== 'function') {
    return;
  }
  if (Object.prototype.hasOwnProperty.call(target, 'styleMedia')) {
    return;
  }
  var hasStyleMedia = false;
  try {
    var current = target;
    var guard = 0;
    while (!hasStyleMedia && current && guard < 20) {
      current = Object.getPrototypeOf(current);
      if (!current) {
        break;
      }
      var descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(current, 'styleMedia');
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }
      if (descriptor) {
        hasStyleMedia = true;
        break;
      }
      guard += 1;
    }
  } catch (hasError) {
    void hasError;
    hasStyleMedia = false;
  }
  if (!hasStyleMedia) {
    return;
  }
  var safeStyleMedia = {
    matchMedium: function matchMedium(query) {
      if (typeof query !== 'string' || !query) {
        return false;
      }
      var result = false;
      try {
        var response = target.matchMedia(query);
        result = !!(response && response.matches);
      } catch (error) {
        void error;
        result = false;
      }
      return result;
    }
  };
  try {
    Object.defineProperty(target, 'styleMedia', {
      configurable: true,
      enumerable: false,
      value: safeStyleMedia,
      writable: false
    });
  } catch (defineError) {
    void defineError;
  }
}
neutraliseDeprecatedStyleMedia();
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
var loaderBaseUrlCache = null;
var documentBaseUrlCache = null;
function stripUrlSearchAndHash(url) {
  if (typeof url !== 'string') {
    return '';
  }
  var clean = url;
  var hashIndex = clean.indexOf('#');
  if (hashIndex !== -1) {
    clean = clean.slice(0, hashIndex);
  }
  var queryIndex = clean.indexOf('?');
  if (queryIndex !== -1) {
    clean = clean.slice(0, queryIndex);
  }
  return clean;
}
function normaliseDirectoryUrl(url) {
  var clean = stripUrlSearchAndHash(url);
  if (!clean) {
    return '';
  }
  var lastSlash = clean.lastIndexOf('/');
  if (lastSlash === -1) {
    return '';
  }
  return clean.slice(0, lastSlash + 1);
}
function resolveDocumentBaseUrl() {
  if (documentBaseUrlCache !== null) {
    return documentBaseUrlCache;
  }
  var base = '';
  if (typeof document !== 'undefined' && document) {
    if (typeof document.baseURI === 'string') {
      base = document.baseURI;
    }
    if (!base) {
      try {
        if (document.location && document.location.href) {
          base = document.location.href;
        }
      } catch (documentLocationError) {
        void documentLocationError;
        base = '';
      }
    }
  }
  if (!base && typeof location !== 'undefined' && location && location.href) {
    base = location.href;
  }
  documentBaseUrlCache = normaliseDirectoryUrl(base);
  return documentBaseUrlCache;
}
function resolveLoaderBaseUrl() {
  if (loaderBaseUrlCache !== null) {
    return loaderBaseUrlCache;
  }
  var base = '';
  if (typeof document !== 'undefined' && document) {
    try {
      if (document.currentScript && document.currentScript.src) {
        base = document.currentScript.src;
      }
    } catch (currentScriptError) {
      void currentScriptError;
      base = '';
    }
    if (!base) {
      try {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i -= 1) {
          var candidate = scripts[i];
          if (candidate && candidate.src) {
            base = candidate.src;
            break;
          }
        }
      } catch (scriptSearchError) {
        void scriptSearchError;
        base = '';
      }
    }
    if (!base && typeof document.baseURI === 'string') {
      base = document.baseURI;
    }
  }
  if (!base && typeof location !== 'undefined' && location && location.href) {
    base = location.href;
  }
  loaderBaseUrlCache = normaliseDirectoryUrl(base);
  return loaderBaseUrlCache;
}
function resolveAssetUrl(url) {
  if (typeof url !== 'string' || url.length === 0) {
    return url;
  }
  var leading = url.slice(0, 2);
  if (leading === '//' || url.indexOf('://') !== -1) {
    return url;
  }
  var baseUrl = resolveDocumentBaseUrl();
  if (!baseUrl) {
    baseUrl = resolveLoaderBaseUrl();
  }
  if (!baseUrl) {
    return url;
  }
  try {
    var resolved = new URL(url, baseUrl);
    return resolved.href;
  } catch (resolutionError) {
    void resolutionError;
    if (url.charAt(0) === '/') {
      return url;
    }
    return baseUrl + url;
  }
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
function loaderCreateDeepCloneMemo() {
  if (typeof WeakMap === 'function') {
    var weakMemo = new WeakMap();
    return {
      has: function has(key) {
        return weakMemo.has(key);
      },
      get: function get(key) {
        return weakMemo.get(key);
      },
      set: function set(key, value) {
        weakMemo.set(key, value);
      }
    };
  }
  var entries = [];
  return {
    has: function has(key) {
      for (var index = 0; index < entries.length; index += 1) {
        if (entries[index][0] === key) {
          return true;
        }
      }
      return false;
    },
    get: function get(key) {
      for (var index = 0; index < entries.length; index += 1) {
        if (entries[index][0] === key) {
          return entries[index][1];
        }
      }
      return undefined;
    },
    set: function set(key, value) {
      entries.push([key, value]);
    }
  };
}
function loaderManualDeepCloneValue(value, memo) {
  if (value === null || _typeof(value) !== 'object') {
    return value;
  }
  if (memo && typeof memo.has === 'function') {
    try {
      if (memo.has(value)) {
        return memo.get(value);
      }
    } catch (memoError) {
      void memoError;
    }
  }
  var hasSetter = memo && typeof memo.set === 'function';
  if (typeof Date !== 'undefined' && value instanceof Date) {
    try {
      var clonedDate = new Date(value.getTime());
      if (hasSetter) {
        memo.set(value, clonedDate);
      }
      return clonedDate;
    } catch (dateError) {
      void dateError;
    }
  }
  if (typeof RegExp !== 'undefined' && value instanceof RegExp) {
    try {
      var flags = '';
      try {
        flags = value.flags;
      } catch (flagError) {
        void flagError;
      }
      var clonedRegExp = new RegExp(value.source, flags);
      if (hasSetter) {
        memo.set(value, clonedRegExp);
      }
      return clonedRegExp;
    } catch (regexpError) {
      void regexpError;
    }
  }
  if (typeof Map !== 'undefined' && value instanceof Map) {
    try {
      var mapClone = new Map();
      if (hasSetter) {
        memo.set(value, mapClone);
      }
      value.forEach(function (mapValue, mapKey) {
        mapClone.set(mapKey, loaderManualDeepCloneValue(mapValue, memo));
      });
      return mapClone;
    } catch (mapError) {
      void mapError;
    }
  }
  if (typeof Set !== 'undefined' && value instanceof Set) {
    try {
      var setClone = new Set();
      if (hasSetter) {
        memo.set(value, setClone);
      }
      value.forEach(function (setValue) {
        setClone.add(loaderManualDeepCloneValue(setValue, memo));
      });
      return setClone;
    } catch (setError) {
      void setError;
    }
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && ArrayBuffer.isView(value)) {
    try {
      var viewCtor = value.constructor;
      if (typeof viewCtor === 'function') {
        var viewClone = new viewCtor(value);
        if (hasSetter) {
          memo.set(value, viewClone);
        }
        return viewClone;
      }
    } catch (typedArrayError) {
      void typedArrayError;
    }
  }
  if (Array.isArray(value)) {
    var arrayClone = new Array(value.length);
    if (hasSetter) {
      memo.set(value, arrayClone);
    }
    for (var index = 0; index < value.length; index += 1) {
      arrayClone[index] = loaderManualDeepCloneValue(value[index], memo);
    }
    return arrayClone;
  }
  if (value && _typeof(value) === 'object') {
    var plainClone = {};
    if (hasSetter) {
      memo.set(value, plainClone);
    }
    try {
      var keys = Object.keys(value);
      for (var keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
        var key = keys[keyIndex];
        plainClone[key] = loaderManualDeepCloneValue(value[key], memo);
      }
    } catch (objectError) {
      void objectError;
    }
    return plainClone;
  }
  return value;
}
function loaderResolveStructuredClone(scope) {
  if (typeof structuredClone === 'function') {
    return structuredClone;
  }
  if (scope && typeof scope.structuredClone === 'function') {
    try {
      return scope.structuredClone.bind(scope);
    } catch (bindError) {
      void bindError;
    }
  }
  if (typeof require === 'function') {
    try {
      var nodeUtil = require('node:util');
      if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
        return nodeUtil.structuredClone.bind(nodeUtil);
      }
    } catch (nodeUtilError) {
      void nodeUtilError;
    }
    try {
      var legacyUtil = require('util');
      if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
        return legacyUtil.structuredClone.bind(legacyUtil);
      }
    } catch (legacyUtilError) {
      void legacyUtilError;
    }
  }
  return null;
}
function loaderCreateDeepCloneUtility() {
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var structuredCloneImpl = loaderResolveStructuredClone(globalScope);
  return function loaderDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    if (structuredCloneImpl) {
      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
    try {
      return loaderManualDeepCloneValue(value, loaderCreateDeepCloneMemo());
    } catch (manualCloneError) {
      void manualCloneError;
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (finalError) {
      void finalError;
    }
    return value;
  };
}
CRITICAL_GLOBAL_DEFINITIONS.push({
  name: '__cineDeepClone',
  validator: function validator(value) {
    return typeof value === 'function';
  },
  fallback: loaderCreateDeepCloneUtility
});
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
  var MODERN_SUPPORT_CACHE_KEY = 'cameraPowerPlanner_modernSupport_v1';
  var MODERN_SUPPORT_CACHE_VERSION = 1;
  var MODERN_SUPPORT_CACHE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  function resolveModernSupportCacheStorage() {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      var storage = window.localStorage;
      if (storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function') {
        return storage;
      }
    } catch (storageError) {
      void storageError;
    }
    return null;
  }
  function readModernSupportCache() {
    var storage = resolveModernSupportCacheStorage();
    if (!storage) {
      return null;
    }
    var rawValue = null;
    try {
      rawValue = storage.getItem(MODERN_SUPPORT_CACHE_KEY);
    } catch (readError) {
      void readError;
      return null;
    }
    if (typeof rawValue !== 'string' || !rawValue) {
      return null;
    }
    var parsed = null;
    try {
      parsed = JSON.parse(rawValue);
    } catch (parseError) {
      void parseError;
      return null;
    }
    if (!parsed || _typeof(parsed) !== 'object') {
      return null;
    }
    if (parsed.version !== MODERN_SUPPORT_CACHE_VERSION || typeof parsed.result !== 'boolean') {
      return null;
    }
    var now = nowMilliseconds();
    if (typeof parsed.timestamp === 'number' && typeof now === 'number') {
      if (now - parsed.timestamp > MODERN_SUPPORT_CACHE_MAX_AGE) {
        return null;
      }
    }
    if (typeof parsed.userAgent === 'string' && parsed.userAgent) {
      var currentUserAgent = '';
      try {
        if (typeof navigator !== 'undefined' && navigator && typeof navigator.userAgent === 'string') {
          currentUserAgent = navigator.userAgent;
        }
      } catch (userAgentError) {
        void userAgentError;
        currentUserAgent = '';
      }
      if (currentUserAgent && parsed.userAgent !== currentUserAgent) {
        return null;
      }
    }
    return parsed.result;
  }
  function rememberModernSupportResult(result) {
    if (typeof result !== 'boolean') {
      return;
    }
    var storage = resolveModernSupportCacheStorage();
    if (!storage) {
      return;
    }
    var payload = {
      version: MODERN_SUPPORT_CACHE_VERSION,
      result: result
    };
    var timestamp = nowMilliseconds();
    if (typeof timestamp === 'number') {
      payload.timestamp = timestamp;
    }
    try {
      if (typeof navigator !== 'undefined' && navigator && typeof navigator.userAgent === 'string' && navigator.userAgent) {
        payload.userAgent = navigator.userAgent;
      }
    } catch (userAgentError) {
      void userAgentError;
    }
    try {
      storage.setItem(MODERN_SUPPORT_CACHE_KEY, JSON.stringify(payload));
    } catch (writeError) {
      void writeError;
    }
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
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    var arrayProto = Array.prototype;
    var stringProto = String.prototype;
    if (typeof Array.from !== 'function' || typeof arrayProto.includes !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    if (typeof arrayProto.find !== 'function' || typeof arrayProto.findIndex !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    if (typeof arrayProto.flatMap !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    if (typeof Object.entries !== 'function' || typeof Object.fromEntries !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    if (typeof stringProto.includes !== 'function' || typeof stringProto.startsWith !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    var cachedSupport = readModernSupportCache();
    if (typeof cachedSupport === 'boolean') {
      rememberModernSupportResult(cachedSupport);
      cb(cachedSupport);
      return;
    }
    var optionalSupport = detectOptionalChainingSupport();
    if (optionalSupport === true) {
      rememberModernSupportResult(true);
      cb(true);
      return;
    }
    if (optionalSupport === false) {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    var globalScope = getGlobalScope();
    var scriptElement = document.createElement('script');
    if (!('noModule' in scriptElement)) {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var optionalCheckScript = document.createElement('script');
    var optionalCheckSources = ['src/scripts/modern-support-check.mjs', 'src/scripts/modern-support-check.js'];
    var optionalCheckIndex = 0;
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
      if (result === true || result === false) {
        rememberModernSupportResult(result);
      }
      cb(result);
    }
    optionalCheckScript.type = 'module';
    function setOptionalCheckSource(index) {
      var nextSource = optionalCheckSources[index];
      if (!nextSource) {
        finalize(false);
        return;
      }
      optionalCheckIndex = index;
      try {
        optionalCheckScript.setAttribute('src', nextSource);
      } catch (setSourceError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to configure modern support check source.', setSourceError);
        }
        finalize(false);
      }
    }
    setOptionalCheckSource(optionalCheckIndex);
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
      var nextIndex = optionalCheckIndex + 1;
      if (nextIndex < optionalCheckSources.length) {
        if (typeof console !== 'undefined' && typeof console.info === 'function') {
          console.info('Retrying modern support check with fallback source:', optionalCheckSources[nextIndex]);
        }
        setOptionalCheckSource(nextIndex);
        return;
      }
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
  function loadScriptsInParallel(urls, options) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var settings = options || {};
    var aborted = false;
    var completed = false;
    if (!urls || !urls.length) {
      if (typeof settings.onComplete === 'function') {
        try {
          settings.onComplete();
        } catch (completeError) {
          console.error('Parallel loader completion callback failed', completeError);
        }
      }
      return {
        cancel: function cancelEmptyParallelLoader() {
          aborted = true;
        }
      };
    }
    var remaining = urls.length;
    function finalizeParallel() {
      if (completed || aborted) {
        return;
      }
      completed = true;
      if (typeof settings.onComplete === 'function') {
        try {
          settings.onComplete();
        } catch (callbackError) {
          console.error('Parallel loader completion callback failed', callbackError);
        }
      }
    }
    function handleError(context) {
      if (completed || aborted) {
        return;
      }
      var shouldAbort = false;
      if (typeof settings.onError === 'function') {
        try {
          shouldAbort = settings.onError(context) === true;
        } catch (callbackError) {
          console.error('Parallel loader error callback failed', callbackError);
        }
      }
      if (shouldAbort) {
        aborted = true;
      }
    }
    for (var index = 0; index < urls.length; index += 1) {
      (function parallelLoaderIterator(currentIndex) {
        if (aborted) {
          return;
        }
        var currentUrl = urls[currentIndex];
        var resolvedUrl = resolveAssetUrl(currentUrl);
        var script = document.createElement('script');
        script.src = resolvedUrl;
        script.async = true;
        script.defer = true;
        script.onload = function () {
          if (aborted || completed) {
            return;
          }
          remaining -= 1;
          if (remaining <= 0) {
            finalizeParallel();
          }
        };
        script.onerror = function (event) {
          console.error('Failed to load parallel script:', currentUrl, '→', resolvedUrl, event && event.error);
          handleError({
            event: event,
            url: currentUrl,
            index: currentIndex
          });
          remaining -= 1;
          if (remaining <= 0) {
            finalizeParallel();
          }
        };
        head.appendChild(script);
      })(index);
    }
    return {
      cancel: function cancelParallelLoader() {
        aborted = true;
      }
    };
  }
  function loadScriptsSequentially(items, options) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var index = 0;
    var aborted = false;
    var completed = false;
    var settings = options || {};
    function finalize() {
      if (completed) {
        return;
      }
      completed = true;
      if (typeof settings.onComplete === 'function') {
        try {
          settings.onComplete();
        } catch (callbackError) {
          console.error('Loader completion callback failed', callbackError);
        }
      }
    }
    function next() {
      if (aborted) {
        return;
      }
      if (index >= items.length) {
        finalize();
        return;
      }
      var currentIndex = index;
      var currentItem = items[currentIndex];
      if (currentItem && _typeof(currentItem) === 'object' && !Array.isArray(currentItem)) {
        if (Array.isArray(currentItem.parallel) && currentItem.parallel.length) {
          loadScriptsInParallel(currentItem.parallel, {
            onError: function handleParallelError(context) {
              var shouldAbort = false;
              if (typeof settings.onError === 'function') {
                try {
                  shouldAbort = settings.onError(context) === true;
                } catch (callbackError) {
                  console.error('Loader error callback failed', callbackError);
                }
              }
              if (shouldAbort) {
                aborted = true;
              }
              return shouldAbort;
            },
            onComplete: function onComplete() {
              if (aborted) {
                return;
              }
              index = currentIndex + 1;
              next();
            }
          });
          return;
        }
      }
      var currentUrl = typeof currentItem === 'string' ? currentItem : '';
      if (!currentUrl) {
        index = currentIndex + 1;
        next();
        return;
      }
      var resolvedUrl = resolveAssetUrl(currentUrl);
      var script = document.createElement('script');
      script.src = resolvedUrl;
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
        console.error('Failed to load script:', currentUrl, '→', resolvedUrl, event && event.error);
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
  function scheduleDeferredScripts(urls) {
    if (!urls || urls.length === 0) {
      return;
    }
    function startDeferredLoad() {
      loadScriptsSequentially(urls);
    }
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(startDeferredLoad);
      return;
    }
    if (typeof Promise === 'function') {
      Promise.resolve().then(startDeferredLoad).catch(function (error) {
        console.warn('Deferred script microtask scheduling failed. Loading immediately.', error);
        startDeferredLoad();
      });
      return;
    }
    startDeferredLoad();
  }
  function loadScriptBundle(bundle, options) {
    if (!bundle || !bundle.core || bundle.core.length === 0) {
      if (bundle && bundle.deferred) {
        scheduleDeferredScripts(bundle.deferred);
      }
      return null;
    }
    var settings = options || {};
    return loadScriptsSequentially(bundle.core, {
      onError: settings.onError,
      onComplete: function handleBundleComplete() {
        if (bundle.deferred && bundle.deferred.length) {
          scheduleDeferredScripts(bundle.deferred);
        }
        if (typeof settings.onComplete === 'function') {
          try {
            settings.onComplete();
          } catch (callbackError) {
            console.error('Bundle completion callback failed', callbackError);
          }
        }
      }
    });
  }
  var modernScriptBundle = {
    core: ['src/scripts/globalthis-polyfill.js', 'src/data/devices/index.js', {
      parallel: ['src/data/devices/cameras.js', 'src/data/devices/monitors.js', 'src/data/devices/video.js', 'src/data/devices/fiz.js', 'src/data/devices/batteries.js', 'src/data/devices/batteryHotswaps.js', 'src/data/devices/chargers.js', 'src/data/devices/cages.js', 'src/data/devices/gearList.js', 'src/data/devices/wirelessReceivers.js']
    }, 'src/scripts/storage.js', 'src/scripts/translations.js', 'src/vendor/lz-string.min.js', 'src/scripts/auto-gear-weight.js', 'src/scripts/modules/base.js', 'src/scripts/modules/registry.js', 'src/scripts/modules/environment-bridge.js', 'src/scripts/modules/globals.js', 'src/scripts/modules/localization.js', 'src/scripts/modules/offline.js', 'src/scripts/modules/core-shared.js', 'src/scripts/modules/core/project-intelligence.js', 'src/scripts/modules/core/persistence-guard.js', 'src/scripts/modules/core/experience.js', 'src/scripts/modules/logging.js', 'src/scripts/modules/settings-and-appearance.js', 'src/scripts/modules/features/auto-gear-rules.js', 'src/scripts/modules/features/connection-diagram.js', 'src/scripts/modules/features/backup.js', 'src/scripts/modules/features/onboarding-tour.js', 'src/scripts/modules/features/print-workflow.js', 'src/scripts/modules/ui.js', 'src/scripts/modules/runtime-guard.js', 'src/scripts/modules/results.js', 'src/scripts/app-core-new-1.js', 'src/scripts/app-core-new-2.js', 'src/scripts/app-events.js', 'src/scripts/app-setups.js', 'src/scripts/restore-verification.js', 'src/scripts/app-session.js', 'src/scripts/modules/persistence.js', 'src/scripts/modules/runtime.js', 'src/scripts/script.js'],
    deferred: ['src/scripts/auto-gear-monitoring.js', 'src/scripts/overview.js', 'src/scripts/autosave-overlay.js']
  };
  var legacyScriptBundle = {
    core: ['legacy/polyfills/core-js-bundle.min.js', 'legacy/polyfills/regenerator-runtime.js', 'src/vendor/regenerator-runtime-fallback.js', 'legacy/scripts/globalthis-polyfill.js', 'legacy/data/devices/index.js', {
      parallel: ['legacy/data/devices/cameras.js', 'legacy/data/devices/monitors.js', 'legacy/data/devices/video.js', 'legacy/data/devices/fiz.js', 'legacy/data/devices/batteries.js', 'legacy/data/devices/batteryHotswaps.js', 'legacy/data/devices/chargers.js', 'legacy/data/devices/cages.js', 'legacy/data/devices/gearList.js', 'legacy/data/devices/wirelessReceivers.js']
    }, 'legacy/scripts/storage.js', 'legacy/scripts/translations.js', 'src/vendor/lz-string.min.js', 'legacy/scripts/auto-gear-weight.js', 'legacy/scripts/modules/base.js', 'legacy/scripts/modules/registry.js', 'legacy/scripts/modules/environment-bridge.js', 'legacy/scripts/modules/globals.js', 'legacy/scripts/modules/localization.js', 'legacy/scripts/modules/offline.js', 'legacy/scripts/modules/core-shared.js', 'legacy/scripts/modules/logging.js', 'legacy/scripts/modules/features/backup.js', 'legacy/scripts/modules/features/onboarding-tour.js', 'legacy/scripts/modules/features/print-workflow.js', 'legacy/scripts/modules/ui.js', 'legacy/scripts/modules/runtime-guard.js', 'legacy/scripts/modules/results.js', 'legacy/scripts/app-core-new-1.js', 'legacy/scripts/app-core-new-2.js', 'legacy/scripts/app-events.js', 'legacy/scripts/app-setups.js', 'legacy/scripts/app-session.js', 'legacy/scripts/modules/runtime.js', 'legacy/scripts/modules/persistence.js', 'legacy/scripts/script.js'],
    deferred: ['legacy/scripts/auto-gear-monitoring.js', 'legacy/scripts/overview.js', 'legacy/scripts/autosave-overlay.js']
  };
  function startLoading() {
    if (shouldForceLegacyBundle()) {
      window.__CINE_POWER_LEGACY_BUNDLE__ = true;
      if (hasLegacyBundleRetryAttempt()) {
        loadScriptBundle(legacyScriptBundle);
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
        loadScriptBundle(legacyScriptBundle);
      });
      return;
    }
    supportsModernFeatures(function (supportsModern) {
      var activeBundle = supportsModern ? modernScriptBundle : legacyScriptBundle;
      if (!supportsModern) {
        window.__CINE_POWER_LEGACY_BUNDLE__ = true;
      }
      var fallbackBundle = supportsModern ? legacyScriptBundle : null;
      var fallbackTriggered = false;
      loadScriptBundle(activeBundle, {
        onError: function handleLoaderError(context) {
          if (!supportsModern || !fallbackBundle || fallbackTriggered) {
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
          loadScriptBundle(fallbackBundle);
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