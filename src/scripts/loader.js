/*
 * Ensure critical core runtime globals always exist before the loader
 * initialises the rest of the application. Some browsers, notably older
 * WebKit builds, will throw "Can't find variable" errors when a script
 * references a global that only exists as an object property (for example
 * when a previous bundle assigned `window.autoGearAutoPresetId = ''`).
 *
 * Declaring these bindings up-front with `var` guarantees a proper global
 * variable binding, while still allowing the later runtime segments to
 * overwrite the values safely. The fallback values mirror the behaviour of
 * the runtime initialisers so that any early access remains safe and
 * side-effect free.
 */

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
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    return;
  }

  if (typeof target.matchMedia !== 'function') {
    return;
  }

  if (
    typeof Object.defineProperty !== 'function' ||
    typeof Object.getPrototypeOf !== 'function' ||
    typeof Object.getOwnPropertyDescriptor !== 'function'
  ) {
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
    },
  };

  try {
    Object.defineProperty(target, 'styleMedia', {
      configurable: true,
      enumerable: false,
      value: safeStyleMedia,
      writable: false,
    });
  } catch (defineError) {
    void defineError;
  }
}

neutraliseDeprecatedStyleMedia();

function ensureCriticalGlobalVariable(name, fallback) {
  var scope = resolveCriticalGlobalScope();
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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
        value: value,
      });
    } catch (defineError) {
      void defineError;
    }
  }

  try {
    var globalFn = (scope && scope.Function) || Function;
    if (typeof globalFn === 'function') {
      globalFn(
        'value',
        "if (typeof " +
          name +
          " === 'undefined') { " +
          name +
          " = value; } return " +
          name +
          ';',
      )(value);
    }
  } catch (bindingError) {
    void bindingError;
  }

  return scope;
}

function resolveCriticalFallback(fallback) {
  return typeof fallback === 'function' ? fallback() : fallback;
}

function createCoreFunctionProxy(functionName, options) {
  function computeDefault(args) {
    if (!options || !Object.prototype.hasOwnProperty.call(options, 'defaultValue')) {
      return undefined;
    }

    var fallback = options.defaultValue;
    if (typeof fallback === 'function') {
      try {
        return fallback.apply(null, args);
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    return fallback;
  }

  function invokeCore(scope, args, defaultValue, proxyRef) {
    if (scope && typeof scope.callCoreFunctionIfAvailable === 'function') {
      try {
        return scope.callCoreFunctionIfAvailable(
          functionName,
          args,
          typeof defaultValue === 'undefined' ? undefined : { defaultValue: defaultValue },
        );
      } catch (callCoreError) {
        void callCoreError;
      }
    }

    var target = scope && scope[functionName];
    if (typeof target === 'function' && target !== proxyRef) {
      try {
        return target.apply(scope, args);
      } catch (invokeError) {
        void invokeError;
      }
    }

    return undefined;
  }

  var proxy = function coreFunctionProxy() {
    var scope = resolveCriticalGlobalScope();
    var args = Array.prototype.slice.call(arguments);
    var defaultValue = computeDefault(args);

    var result = invokeCore(scope, args, defaultValue, proxy);
    if (typeof result !== 'undefined') {
      return result;
    }

    if (options && options.defer === true) {
      var queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
      if (queue) {
        queue.push(function deferredCoreFunctionProxy() {
          var currentScope = resolveCriticalGlobalScope();
          var deferredResult = invokeCore(currentScope, args, defaultValue, proxy);
          if (typeof deferredResult !== 'undefined') {
            return deferredResult;
          }

          return defaultValue;
        });
      }
    }

    return defaultValue;
  };

  return proxy;
}

function normaliseCriticalGlobalVariable(name, validator, fallback) {
  var fallbackValue = resolveCriticalFallback(fallback);
  var scope = ensureCriticalGlobalVariable(name, fallbackValue) || resolveCriticalGlobalScope();
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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
        value: nextValue,
      });
    } catch (defineError) {
      void defineError;
    }
  }

  try {
    var globalFn = (scope && scope.Function) || Function;
    if (typeof globalFn === 'function') {
      globalFn('value', name + ' = value; return ' + name + ';')(nextValue);
    }
  } catch (bindingError) {
    void bindingError;
  }

  return nextValue;
}

var DEFAULT_TEMPERATURE_STORAGE_KEY = 'cameraPowerPlanner_temperatureUnit';

function ensureTemperatureStorageKeyAlias() {
  var scope = resolveCriticalGlobalScope();
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return DEFAULT_TEMPERATURE_STORAGE_KEY;
  }

  function normaliseKey() {
    var storageKey = null;
    try {
      storageKey = scope.TEMPERATURE_STORAGE_KEY;
    } catch (readStorageKeyError) {
      void readStorageKeyError;
      storageKey = null;
    }

    var unitKey = null;
    try {
      unitKey = scope.TEMPERATURE_UNIT_STORAGE_KEY;
    } catch (readUnitKeyError) {
      void readUnitKeyError;
      unitKey = null;
    }

    var resolvedKey =
      typeof storageKey === 'string' && storageKey
        ? storageKey
        : typeof unitKey === 'string' && unitKey
          ? unitKey
          : DEFAULT_TEMPERATURE_STORAGE_KEY;

    if (scope.TEMPERATURE_STORAGE_KEY !== resolvedKey) {
      try {
        scope.TEMPERATURE_STORAGE_KEY = resolvedKey;
      } catch (assignStorageKeyError) {
        void assignStorageKeyError;
        try {
          Object.defineProperty(scope, 'TEMPERATURE_STORAGE_KEY', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: resolvedKey,
          });
        } catch (defineStorageKeyError) {
          void defineStorageKeyError;
        }
      }
    }

    if (scope.TEMPERATURE_UNIT_STORAGE_KEY !== resolvedKey) {
      try {
        scope.TEMPERATURE_UNIT_STORAGE_KEY = resolvedKey;
      } catch (assignUnitKeyError) {
        void assignUnitKeyError;
        try {
          Object.defineProperty(scope, 'TEMPERATURE_UNIT_STORAGE_KEY', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: resolvedKey,
          });
        } catch (defineUnitKeyError) {
          void defineUnitKeyError;
        }
      }
    }

    return resolvedKey;
  }

  var resolved = normaliseKey();

  var existingResolver = null;
  try {
    existingResolver = scope.resolveTemperatureStorageKey;
  } catch (readResolverError) {
    void readResolverError;
    existingResolver = null;
  }

  if (typeof existingResolver !== 'function') {
    var resolver = function resolveTemperatureStorageKeyFallback() {
      return normaliseKey();
    };

    try {
      scope.resolveTemperatureStorageKey = resolver;
    } catch (assignResolverError) {
      void assignResolverError;
      try {
        Object.defineProperty(scope, 'resolveTemperatureStorageKey', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: resolver,
        });
      } catch (defineResolverError) {
        void defineResolverError;
      }
    }
  }

  return resolved;
}

function ensureResolveTextEntryFallback() {
  var scope = resolveCriticalGlobalScope();
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return null;
  }

  var existing = null;
  try {
    existing = scope.resolveTextEntry;
  } catch (readExistingError) {
    void readExistingError;
    existing = null;
  }

  if (typeof existing === 'function') {
    return existing;
  }

  function extractEntry(source, key) {
    if (!source || (typeof source !== 'object' && typeof source !== 'function')) {
      return undefined;
    }

    var value;
    try {
      value = source[key];
    } catch (readError) {
      void readError;
      value = undefined;
    }

    if (typeof value === 'function') {
      try {
        value = value(key, source);
      } catch (invokeError) {
        void invokeError;
        value = undefined;
      }
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }

    if (value && typeof value.text === 'string') {
      return value.text;
    }

    if (value === null) {
      return '';
    }

    return undefined;
  }

  var resolver = function resolveTextEntryFallback(langTexts, fallbackTexts, key, defaultValue) {
    var keyName = typeof key === 'string' ? key : '';

    if (!keyName) {
      if (typeof defaultValue === 'string') {
        return defaultValue;
      }
      if (typeof defaultValue === 'number' || typeof defaultValue === 'boolean') {
        return String(defaultValue);
      }
      if (defaultValue && typeof defaultValue.text === 'string') {
        return defaultValue.text;
      }
      return typeof defaultValue === 'undefined' ? '' : String(defaultValue);
    }

    var sources = [langTexts, fallbackTexts];
    for (var index = 0; index < sources.length; index += 1) {
      var result = extractEntry(sources[index], keyName);
      if (typeof result !== 'undefined') {
        return result;
      }
    }

    if (typeof defaultValue === 'string') {
      return defaultValue;
    }

    if (typeof defaultValue === 'number' || typeof defaultValue === 'boolean') {
      return String(defaultValue);
    }

    if (defaultValue && typeof defaultValue.text === 'string') {
      return defaultValue.text;
    }

    return typeof defaultValue === 'undefined' ? '' : String(defaultValue);
  };

  try {
    scope.resolveTextEntry = resolver;
  } catch (assignError) {
    void assignError;
    try {
      Object.defineProperty(scope, 'resolveTextEntry', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: resolver,
      });
    } catch (defineError) {
      void defineError;
    }
  }

  return resolver;
}

ensureTemperatureStorageKeyAlias();
ensureResolveTextEntryFallback();

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

function loaderResolveTranslations() {
  var scope = resolveCriticalGlobalScope();
  var translations = null;

  if (scope && typeof scope.texts === 'object' && scope.texts !== null) {
    translations = scope.texts;
  }

  if (!translations && scope && scope.CORE_GLOBAL_SCOPE && typeof scope.CORE_GLOBAL_SCOPE === 'object') {
    try {
      var coreTexts = scope.CORE_GLOBAL_SCOPE.texts;
      if (coreTexts && typeof coreTexts === 'object') {
        translations = coreTexts;
      }
    } catch (coreScopeError) {
      void coreScopeError;
    }
  }

  if (!translations) {
    try {
      var globalScope = resolveCriticalGlobalScope();
      if (globalScope && globalScope !== scope && typeof globalScope.texts === 'object') {
        translations = globalScope.texts;
      }
    } catch (globalScopeError) {
      void globalScopeError;
    }
  }

  return translations && typeof translations === 'object' ? translations : null;
}

function loaderSelectTranslationForLanguage(translations, requestedLanguage) {
  if (!translations || typeof translations !== 'object') {
    return {};
  }

  var languageKey = null;
  var activeLang = null;
  var defaultLanguage = null;
  var translationScope = null;

  try {
    translationScope = resolveCriticalGlobalScope();
  } catch (resolveScopeError) {
    void resolveScopeError;
    translationScope = null;
  }

  if (translationScope && typeof translationScope.currentLang === 'string') {
    activeLang = translationScope.currentLang;
  }

  if (translationScope && typeof translationScope.DEFAULT_LANGUAGE === 'string') {
    defaultLanguage = translationScope.DEFAULT_LANGUAGE;
  }

  if (requestedLanguage && Object.prototype.hasOwnProperty.call(translations, requestedLanguage)) {
    var requested = translations[requestedLanguage];
    if (requested && typeof requested === 'object') {
      languageKey = requestedLanguage;
    }
  }

  if (!languageKey) {
    if (
      activeLang &&
      Object.prototype.hasOwnProperty.call(translations, activeLang) &&
      translations[activeLang] &&
      typeof translations[activeLang] === 'object'
    ) {
      languageKey = activeLang;
    }
  }

  if (!languageKey) {
    if (
      defaultLanguage &&
      Object.prototype.hasOwnProperty.call(translations, defaultLanguage) &&
      translations[defaultLanguage] &&
      typeof translations[defaultLanguage] === 'object'
    ) {
      languageKey = defaultLanguage;
    }
  }

  if (!languageKey && Object.prototype.hasOwnProperty.call(translations, 'en')) {
    var english = translations.en;
    if (english && typeof english === 'object') {
      languageKey = 'en';
    }
  }

  if (!languageKey) {
    try {
      var keys = Object.keys(translations);
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
        var value = translations[key];
        if (value && typeof value === 'object') {
          languageKey = key;
          break;
        }
      }
    } catch (enumerateError) {
      void enumerateError;
    }
  }

  if (!languageKey) {
    return {};
  }

  try {
    var resolved = translations[languageKey];
    if (resolved && typeof resolved === 'object') {
      return resolved;
    }
  } catch (resolveError) {
    void resolveError;
  }

  return {};
}

var CRITICAL_GLOBAL_DEFINITIONS = [
  {
    name: 'autoGearAutoPresetId',
    validator: function (value) {
      return typeof value === 'string';
    },
    fallback: '',
  },
  {
    name: 'baseAutoGearRules',
    validator: function (value) {
      return Array.isArray(value);
    },
    fallback: function () {
      return [];
    },
  },
  {
    name: 'autoGearScenarioModeSelect',
    validator: function (value) {
      return typeof value !== 'undefined';
    },
    fallback: null,
  },
  {
    name: 'autoGearRuleNameInput',
    validator: function (value) {
      return typeof value !== 'undefined';
    },
    fallback: null,
  },
  {
    name: 'autoGearSummaryFocus',
    validator: function (value) {
      return typeof value === 'string';
    },
    fallback: 'all',
  },
  {
    name: 'autoGearMonitorDefaultControls',
    validator: Array.isArray,
    fallback: function () {
      return [];
    },
  },
  {
    name: 'gridSnap',
    validator: function (value) {
      return typeof value === 'boolean';
    },
    fallback: false,
  },
  {
    name: 'iosPwaHelpDialog',
    validator: function (value) {
      return typeof value === 'undefined' || value === null || typeof value === 'object';
    },
    fallback: null,
  },
  {
    name: 'iosPwaHelpClose',
    validator: function (value) {
      return typeof value === 'undefined' || value === null || typeof value === 'object';
    },
    fallback: null,
  },
  {
    name: '__cineRuntimeState',
    validator: function (value) {
      return typeof value === 'undefined' || value === null || typeof value === 'object';
    },
    fallback: null,
  },
];

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'CORE_GLOBAL_SCOPE',
  validator: function (value) {
    return (
      typeof value === 'undefined' ||
      value === null ||
      typeof value === 'object' ||
      typeof value === 'function'
    );
  },
  fallback: function () {
    var scope = resolveCriticalGlobalScope();
    if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
      return scope;
    }

    return {};
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'CORE_RUNTIME_SHARED',
  validator: function (value) {
    return typeof value === 'undefined' || value === null || typeof value === 'object';
  },
  fallback: null,
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'autoGearAddOwnGearSelect',
  validator: function (value) {
    return typeof value === 'undefined' || value === null || typeof value === 'object';
  },
  fallback: null,
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'autoGearRemoveOwnGearSelect',
  validator: function (value) {
    return typeof value === 'undefined' || value === null || typeof value === 'object';
  },
  fallback: null,
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'currentLang',
  validator: function (value) {
    return typeof value === 'string' && value.length > 0;
  },
  fallback: 'en',
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'crewRoles',
  validator: Array.isArray,
  fallback: function () {
    return [];
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'getLanguageTexts',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderFallbackGetLanguageTexts(lang) {
      var translations = loaderResolveTranslations();
      if (!translations) {
        return {};
      }
      return loaderSelectTranslationForLanguage(translations, lang);
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'syncMountVoltageResetButtonGlobal',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderSyncMountVoltageResetButtonGlobal(value) {
      var scope = resolveCriticalGlobalScope();
      if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
        try {
          scope.mountVoltageResetButton = value || null;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(scope, 'mountVoltageResetButton', {
              configurable: true,
              enumerable: false,
              writable: true,
              value: value || null,
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }

      return value || null;
    };
  },
});

function loaderFallbackSafeGenerateConnectorSummary(device) {
  if (!device || typeof device !== 'object') {
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
    TEXT: 'text',
  });
}

function loaderResolveIconFontKeysFallback() {
  var scope = resolveCriticalGlobalScope();
  if (scope && scope.ICON_FONT_KEYS && typeof scope.ICON_FONT_KEYS === 'object') {
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
      TEXT: 'text',
    };
  }
}

function loaderResolveIconFontValues() {
  var keys = loaderResolveIconFontKeysFallback();
  var values = [];

  if (keys && typeof keys === 'object') {
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
      has: function (key) {
        return weakMemo.has(key);
      },
      get: function (key) {
        return weakMemo.get(key);
      },
      set: function (key, value) {
        weakMemo.set(key, value);
      },
    };
  }

  var entries = [];
  return {
    has: function (key) {
      for (var index = 0; index < entries.length; index += 1) {
        if (entries[index][0] === key) {
          return true;
        }
      }
      return false;
    },
    get: function (key) {
      for (var index = 0; index < entries.length; index += 1) {
        if (entries[index][0] === key) {
          return entries[index][1];
        }
      }
      return undefined;
    },
    set: function (key, value) {
      entries.push([key, value]);
    },
  };
}

function loaderManualDeepCloneValue(value, memo) {
  if (value === null || typeof value !== 'object') {
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

  if (
    typeof ArrayBuffer !== 'undefined' &&
    typeof ArrayBuffer.isView === 'function' &&
    ArrayBuffer.isView(value)
  ) {
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

  if (value && typeof value === 'object') {
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
  var globalScope =
    (typeof globalThis !== 'undefined' && globalThis)
      || (typeof window !== 'undefined' && window)
      || (typeof self !== 'undefined' && self)
      || (typeof global !== 'undefined' && global)
      || null;

  var structuredCloneImpl = loaderResolveStructuredClone(globalScope);

  return function loaderDeepClone(value) {
    if (value === null || typeof value !== 'object') {
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
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: loaderCreateDeepCloneUtility,
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'safeGenerateConnectorSummary',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: loaderFallbackSafeGenerateConnectorSummary,
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'totalPowerElem',
  validator: function (value) {
    return typeof value === 'undefined' || value === null || typeof value === 'object';
  },
  fallback: null,
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'ICON_FONT_KEYS',
  validator: function (value) {
    return (
      value &&
      typeof value === 'object' &&
      typeof value.ESSENTIAL === 'string' &&
      typeof value.FILM === 'string' &&
      typeof value.GADGET === 'string' &&
      typeof value.UICONS === 'string' &&
      typeof value.TEXT === 'string'
    );
  },
  fallback: function () {
    return loaderResolveIconFontKeysFallback();
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'iconGlyph',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
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
        return Object.freeze({ char: glyphChar, font: normalizedFont });
      } catch (freezeError) {
        void freezeError;
        return { char: glyphChar, font: normalizedFont };
      }
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'updateGlobalDevicesReference',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderFallbackUpdateGlobalDevicesReference(devices) {
      if (!devices || typeof devices !== 'object') {
        return;
      }

      var normalized = devices;
      try {
        if (typeof structuredClone === 'function') {
          normalized = structuredClone(devices);
        } else {
          normalized = JSON.parse(JSON.stringify(devices));
        }
      } catch (cloneError) {
        void cloneError;
        normalized = devices;
      }

      var scope = resolveCriticalGlobalScope();
      var candidates = [];

      if (scope) {
        candidates.push(scope);
        if (scope.CORE_GLOBAL_SCOPE) {
          candidates.push(scope.CORE_GLOBAL_SCOPE);
        }
        if (scope.DEVICE_GLOBAL_SCOPE) {
          candidates.push(scope.DEVICE_GLOBAL_SCOPE);
        }
      }

      for (var index = 0; index < candidates.length; index += 1) {
        var target = candidates[index];
        if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
          continue;
        }

        try {
          target.devices = normalized;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(target, 'devices', {
              configurable: true,
              writable: true,
              value: normalized,
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'configureIconOnlyButton',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderFallbackConfigureIconOnlyButton(button, glyph, options) {
      if (!button || (typeof button !== 'object' && typeof button !== 'function')) {
        return;
      }

      try {
        if (typeof button.classList !== 'undefined' && button.classList.add) {
          button.classList.add('icon-only-btn');
        }
      } catch (classError) {
        void classError;
      }

      var glyphChar = null;
      if (glyph && typeof glyph === 'object' && typeof glyph.char === 'string') {
        glyphChar = glyph.char;
      } else if (typeof glyph === 'string') {
        glyphChar = glyph;
      }

      if (glyphChar && typeof button.setAttribute === 'function') {
        try {
          button.setAttribute('data-icon-glyph', glyphChar);
        } catch (glyphError) {
          void glyphError;
        }
      }

      var fallbackContext = '';
      if (options && typeof options === 'object') {
        if (typeof options.fallbackContext === 'string') {
          fallbackContext = options.fallbackContext;
        } else if (Array.isArray(options.contextPaths) && options.contextPaths.length) {
          var contextPath = options.contextPaths[0];
          if (typeof contextPath === 'string') {
            fallbackContext = contextPath;
          }
        }
      }

      if (fallbackContext && typeof button.setAttribute === 'function') {
        try {
          button.setAttribute('aria-label', fallbackContext);
          button.setAttribute('title', fallbackContext);
        } catch (labelError) {
          void labelError;
        }
      }
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'getCurrentProjectName',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderFallbackGetCurrentProjectName() {
      var scope = resolveCriticalGlobalScope();
      var doc = scope && scope.document ? scope.document : null;
      var typedName = '';

      if (doc) {
        var input = null;
        try {
          input = doc.getElementById('setupName');
        } catch (inputError) {
          void inputError;
          input = null;
        }

        if (input && typeof input.value === 'string') {
          typedName = input.value.trim();
        }

        if (typedName) {
          return typedName;
        }

        var select = null;
        try {
          select = doc.getElementById('setupSelect');
        } catch (selectError) {
          void selectError;
          select = null;
        }

        if (select && typeof select.value === 'string' && select.value) {
          return select.value.trim();
        }
      }

      var storageKey = 'cameraPowerPlanner_project';
      if (scope && scope.localStorage && typeof scope.localStorage.getItem === 'function') {
        try {
          var stored = scope.localStorage.getItem(storageKey);
          if (stored) {
            var parsed = null;
            try {
              parsed = JSON.parse(stored);
            } catch (parseError) {
              void parseError;
              parsed = null;
            }
            if (
              parsed &&
              typeof parsed === 'object' &&
              typeof parsed.projectName === 'string' &&
              parsed.projectName.trim()
            ) {
              return parsed.projectName.trim();
            }
          }
        } catch (storageError) {
          void storageError;
        }
      }

      return '';
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'setLanguage',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderFallbackSetLanguage(candidate) {
      var scope = resolveCriticalGlobalScope();
      var requested = typeof candidate === 'string' && candidate ? candidate : 'en';
      var translations = scope && scope.texts && typeof scope.texts === 'object' ? scope.texts : {};
      var normalized = requested;

      if (!Object.prototype.hasOwnProperty.call(translations, normalized)) {
        var lowerCase = requested.toLowerCase();
        var keys = Object.keys(translations);
        for (var index = 0; index < keys.length; index += 1) {
          if (keys[index].toLowerCase() === lowerCase) {
            normalized = keys[index];
            break;
          }
        }
        if (!Object.prototype.hasOwnProperty.call(translations, normalized)) {
          normalized = 'en';
        }
      }

      if (scope) {
        scope.currentLang = normalized;
      }

      if (scope && scope.localStorage && typeof scope.localStorage.setItem === 'function') {
        try {
          scope.localStorage.setItem('language', normalized);
        } catch (persistError) {
          void persistError;
        }
      }

      var doc = scope && scope.document ? scope.document : null;
      if (doc && doc.documentElement) {
        doc.documentElement.lang = normalized;
      }

      var updateSelectValue = function (element) {
        if (!element || typeof element !== 'object') {
          return;
        }
        try {
          element.value = normalized;
        } catch (assignValueError) {
          void assignValueError;
        }
      };

      if (doc) {
        try {
          updateSelectValue(doc.getElementById('languageSelect'));
        } catch (languageSelectError) {
          void languageSelectError;
        }

        try {
          updateSelectValue(doc.getElementById('settingsLanguage'));
        } catch (settingsLanguageError) {
          void settingsLanguageError;
        }

        try {
          var title = translations[normalized] && translations[normalized].appTitle;
          if (typeof title === 'string' && title) {
            doc.title = title;
            var mainTitle = doc.getElementById('mainTitle');
            if (mainTitle) {
              mainTitle.textContent = title;
            }
          }
        } catch (titleError) {
          void titleError;
        }
      }

      if (scope && typeof scope.dispatchEvent === 'function' && typeof scope.Event === 'function') {
        try {
          scope.dispatchEvent(new scope.Event('languagechange'));
        } catch (eventError) {
          void eventError;
        }
      } else if (
        scope &&
        scope.window &&
        typeof scope.window.dispatchEvent === 'function' &&
        typeof scope.window.Event === 'function'
      ) {
        try {
          scope.window.dispatchEvent(new scope.window.Event('languagechange'));
        } catch (windowEventError) {
          void windowEventError;
        }
      }

      return normalized;
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'getCurrentSetupState',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return function loaderFallbackGetCurrentSetupState() {
      return {};
    };
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'deriveProjectInfo',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    function cloneProjectInfoFallback(info) {
      if (!info || typeof info !== 'object') {
        return {};
      }

      var clone;
      try {
        clone = JSON.parse(JSON.stringify(info));
        if (clone && typeof clone === 'object') {
          return clone;
        }
      } catch (jsonCloneError) {
        void jsonCloneError;
        clone = null;
      }

      if (!clone || typeof clone !== 'object') {
        clone = {};
        try {
          var keys = Object.keys(info);
          for (var index = 0; index < keys.length; index += 1) {
            var key = keys[index];
            clone[key] = info[key];
          }
        } catch (copyError) {
          void copyError;
          clone = info;
        }
      }

      return clone;
    }

    return createCoreFunctionProxy('deriveProjectInfo', {
      defaultValue: cloneProjectInfoFallback,
    });
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'saveAutoGearRuleFromEditor',
  validator: function (value) {
    return typeof value === 'function';
  },
  fallback: function () {
    return createCoreFunctionProxy('saveAutoGearRuleFromEditor', { defer: true });
  },
});

CRITICAL_GLOBAL_DEFINITIONS.push({
  name: 'currentProjectInfo',
  validator: function (value) {
    return (
      typeof value === 'undefined' ||
      value === null ||
      typeof value === 'object'
    );
  },
  fallback: null,
});

(function initialiseCriticalGlobals() {
  var scope = resolveCriticalGlobalScope();
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return;
  }

  for (var index = 0; index < CRITICAL_GLOBAL_DEFINITIONS.length; index += 1) {
    var definition = CRITICAL_GLOBAL_DEFINITIONS[index];
    var value = normaliseCriticalGlobalVariable(
      definition.name,
      definition.validator,
      definition.fallback,
    );

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

  function normaliseLegacyFallbackMessage(message) {
    if (typeof message !== 'string' || !message) {
      return null;
    }

    var trimmed = message.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.length > 200) {
      return trimmed.slice(0, 200);
    }

    return trimmed;
  }

  function extractLegacyFallbackMessage(event) {
    if (!event || typeof event !== 'object') {
      if (typeof event === 'string') {
        return event;
      }
      return null;
    }

    if (typeof event.message === 'string' && event.message) {
      return event.message;
    }

    if (event.error && typeof event.error.message === 'string' && event.error.message) {
      return event.error.message;
    }

    if (typeof event.type === 'string' && event.type) {
      return event.type;
    }

    return null;
  }

  function encodeLegacyPreferencePayload(options) {
    var timestamp = nowMilliseconds();
    var payload = {
      timestamp: typeof timestamp === 'number' ? timestamp : null,
    };

    if (options && typeof options === 'object') {
      if (typeof options.reason === 'string' && options.reason) {
        payload.reason = options.reason;
      }

      var message = normaliseLegacyFallbackMessage(options.message);
      if (message) {
        payload.message = message;
      }
    }

    try {
      return JSON.stringify(payload);
    } catch (error) {
      void error;
    }

    if (typeof payload.timestamp === 'number') {
      return String(payload.timestamp);
    }

    return 'true';
  }

  function rememberLegacyBundlePreference(options) {
    var storages = getLegacyFlagStorages();
    if (!storages.length) {
      return false;
    }

    var stored = false;
    var value = encodeLegacyPreferencePayload(options);

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

  function decodeLegacyPreferenceValue(rawValue) {
    if (typeof rawValue !== 'string' || !rawValue) {
      return null;
    }

    if (rawValue.charAt(0) === '{') {
      try {
        var parsed = JSON.parse(rawValue);
        if (!parsed || typeof parsed !== 'object') {
          return { timestamp: null, reason: null, invalid: true };
        }

        var parsedTimestamp = null;
        if (typeof parsed.timestamp === 'number' && !isNaN(parsed.timestamp)) {
          parsedTimestamp = parsed.timestamp;
        }

        var parsedReason = null;
        if (typeof parsed.reason === 'string' && parsed.reason) {
          parsedReason = parsed.reason;
        }

        return {
          timestamp: parsedTimestamp,
          reason: parsedReason,
          invalid: false,
        };
      } catch (parseError) {
        void parseError;
        return { timestamp: null, reason: null, invalid: true };
      }
    }

    var numeric = parseInt(rawValue, 10);
    if (!isNaN(numeric) && typeof numeric === 'number') {
      return { timestamp: numeric, reason: null, invalid: false };
    }

    return { timestamp: null, reason: null, legacy: true };
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

      var decoded = decodeLegacyPreferenceValue(rawValue);
      if (!decoded) {
        continue;
      }

      if (decoded.reason && decoded.reason === 'transient-error') {
        try {
          storage.removeItem(LEGACY_BUNDLE_STORAGE_KEY);
        } catch (transientCleanupError) {
          void transientCleanupError;
        }
        continue;
      }

      var timestamp = decoded.timestamp;
      if (timestamp !== null && typeof timestamp === 'number' && now !== null) {
        if (now - timestamp <= LEGACY_BUNDLE_MAX_AGE) {
          forceLegacy = true;
        } else {
          try {
            storage.removeItem(LEGACY_BUNDLE_STORAGE_KEY);
          } catch (cleanupError) {
            void cleanupError;
          }
        }
      } else if (timestamp !== null && typeof timestamp === 'number') {
        forceLegacy = true;
      } else if (decoded.reason && decoded.reason !== 'transient-error') {
        forceLegacy = true;
      } else if (decoded.legacy || decoded.invalid) {
        forceLegacy = true;
      }
    }

    return forceLegacy;
  }

  function triggerLegacyBundleReload(options) {
    var settings = options || {};

    if (settings.rememberPreference !== false) {
      rememberLegacyBundlePreference({
        reason: settings.reason,
        message: settings.message,
      });
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
    if (!scope || typeof scope !== 'object') {
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
    var mappings = [
      { legacy: legacyPrefix + 'devices', modern: 'cameraPowerPlanner_devices' },
      { legacy: legacyPrefix + 'setups', modern: 'cameraPowerPlanner_setups' },
      { legacy: legacyPrefix + 'session', modern: 'cameraPowerPlanner_session', includeSession: true },
      { legacy: legacyPrefix + 'feedback', modern: 'cameraPowerPlanner_feedback' },
      { legacy: legacyPrefix + 'project', modern: 'cameraPowerPlanner_project' },
      { legacy: legacyPrefix + 'projects', modern: 'cameraPowerPlanner_project' },
      { legacy: legacyPrefix + 'favorites', modern: 'cameraPowerPlanner_favorites' },
      { legacy: legacyPrefix + 'schemaCache', modern: 'cameraPowerPlanner_schemaCache' },
      { legacy: legacyPrefix + 'autoGearRules', modern: 'cameraPowerPlanner_autoGearRules' },
      { legacy: legacyPrefix + 'autoGearBackups', modern: 'cameraPowerPlanner_autoGearBackups' },
      { legacy: legacyPrefix + 'autoGearSeeded', modern: 'cameraPowerPlanner_autoGearSeeded' },
      { legacy: legacyPrefix + 'autoGearPresets', modern: 'cameraPowerPlanner_autoGearPresets' },
      { legacy: legacyPrefix + 'autoGearActivePreset', modern: 'cameraPowerPlanner_autoGearActivePreset' },
      { legacy: legacyPrefix + 'autoGearAutoPreset', modern: 'cameraPowerPlanner_autoGearAutoPreset' },
      { legacy: legacyPrefix + 'autoGearShowBackups', modern: 'cameraPowerPlanner_autoGearShowBackups' },
      { legacy: legacyPrefix + 'autoGearBackupRetention', modern: 'cameraPowerPlanner_autoGearBackupRetention' },
      { legacy: legacyPrefix + 'autoGearMonitorDefaults', modern: 'cameraPowerPlanner_autoGearMonitorDefaults' },
      { legacy: legacyPrefix + 'customFonts', modern: 'cameraPowerPlanner_customFonts', updateFontKey: true }
    ];

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
    if (typeof event === 'object' && event !== null) {
      if (event.error && typeof event.error === 'object') {
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

    if (!parsed || typeof parsed !== 'object') {
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
      result: result,
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

    if (
      typeof Object.entries !== 'function' ||
      typeof Object.fromEntries !== 'function' ||
      typeof Object.values !== 'function'
    ) {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    if (typeof stringProto.includes !== 'function' || typeof stringProto.startsWith !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    if (typeof stringProto.padStart !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    if (typeof Number.isFinite !== 'function' || typeof Number.isNaN !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    var mapSupported = typeof Map === 'function';
    if (mapSupported) {
      try {
        var mapProbe = new Map();
        mapProbe.set('probe', 1);
        mapSupported = typeof mapProbe.forEach === 'function' && mapProbe.get('probe') === 1;
      } catch (mapError) {
        void mapError;
        mapSupported = false;
      }
    }

    var setSupported = typeof Set === 'function';
    if (setSupported) {
      try {
        var setProbe = new Set([1, 2]);
        setSupported = typeof setProbe.forEach === 'function' && setProbe.has(2);
      } catch (setError) {
        void setError;
        setSupported = false;
      }
    }

    if (!mapSupported || !setSupported) {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    var promisePrototype = typeof Promise === 'function' ? Promise.prototype : null;
    if (!promisePrototype || typeof promisePrototype.finally !== 'function') {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    var hasUrlSupport = typeof URL === 'function';
    if (hasUrlSupport) {
      try {
        var urlProbe = new URL('https://example.com/');
        hasUrlSupport = !!urlProbe && typeof urlProbe.toString === 'function';
      } catch (urlError) {
        void urlError;
        hasUrlSupport = false;
      }
    }

    if (!hasUrlSupport) {
      rememberModernSupportResult(false);
      cb(false);
      return;
    }

    var hasUrlSearchParamsSupport = typeof URLSearchParams === 'function';
    if (hasUrlSearchParamsSupport) {
      try {
        var urlSearchParamsProbe = new URLSearchParams('a=1');
        hasUrlSearchParamsSupport =
          !!urlSearchParamsProbe && typeof urlSearchParamsProbe.get === 'function';
      } catch (urlSearchParamsError) {
        void urlSearchParamsError;
        hasUrlSearchParamsSupport = false;
      }
    }

    if (!hasUrlSearchParamsSupport) {
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
    var head =
      document.head || document.getElementsByTagName('head')[0] || document.documentElement;
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
        },
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
          console.error(
            'Failed to load parallel script:',
            currentUrl,
            '→',
            resolvedUrl,
            event && event.error,
          );

          handleError({ event: event, url: currentUrl, index: currentIndex });

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
      },
    };
  }

  function loadScriptsSequentially(items, options) {
    var head =
      document.head || document.getElementsByTagName('head')[0] || document.documentElement;
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

      if (currentItem && typeof currentItem === 'object' && !Array.isArray(currentItem)) {
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
            onComplete: function () {
              if (aborted) {
                return;
              }
              index = currentIndex + 1;
              next();
            },
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
        console.error(
          'Failed to load script:',
          currentUrl,
          '→',
          resolvedUrl,
          event && event.error,
        );

        var shouldAbort = false;
        if (typeof settings.onError === 'function') {
          try {
            shouldAbort = settings.onError({
              event: event,
              url: currentUrl,
              index: currentIndex,
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
      },
    };
  }

  function scheduleDeferredScripts(urls) {
    if (!urls || urls.length === 0) {
      return;
    }

    // Load deferred bundles immediately so all planner sections are always ready.
    // Using a microtask keeps execution ordered without waiting for idle time,
    // preventing situations where fast user interaction delays essential UI.
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
      },
    });
  }

  var modernScriptBundle = {
    core: [
      'src/scripts/globalthis-polyfill.js',
      'src/data/devices/index.js',
      'src/data/rental-houses.js',
      { parallel: [
        'src/data/devices/cameras.js',
        'src/data/devices/monitors.js',
        'src/data/devices/video.js',
        'src/data/devices/fiz.js',
        'src/data/devices/batteries.js',
        'src/data/devices/batteryHotswaps.js',
        'src/data/devices/chargers.js',
        'src/data/devices/cages.js',
        'src/data/devices/gearList.js',
        'src/data/devices/wirelessReceivers.js',
      ] },
      'src/scripts/storage.js',
      'src/scripts/translations.js',
      'src/vendor/lz-string.min.js',
      'src/scripts/auto-gear-weight.js',
      'src/scripts/modules/base.js',
      'src/scripts/modules/registry.js',
      'src/scripts/modules/environment-bridge.js',
      'src/scripts/modules/globals.js',
      'src/scripts/modules/localization.js',
      'src/scripts/modules/offline.js',
      'src/scripts/modules/core-shared.js',
      'src/scripts/modules/core/runtime.js',
      'src/scripts/modules/core/localization.js',
      'src/scripts/modules/core/pink-mode.js',
      'src/scripts/modules/core/device-schema.js',
      'src/scripts/modules/core/project-intelligence.js',
      'src/scripts/modules/core/persistence-guard.js',
      'src/scripts/modules/core/mount-voltage.js',
      'src/scripts/modules/core/experience.js',
      'src/scripts/modules/logging.js',
      'src/scripts/modules/settings-and-appearance.js',
      'src/scripts/modules/features/auto-gear-rules.js',
      'src/scripts/modules/features/connection-diagram.js',
      'src/scripts/modules/features/backup.js',
      'src/scripts/modules/features/onboarding-tour.js',
      'src/scripts/modules/features/print-workflow.js',
      'src/scripts/modules/ui.js',
      'src/scripts/modules/runtime-guard.js',
      'src/scripts/modules/results.js',
      'src/scripts/modules/app-core/bootstrap.js',
      'src/scripts/modules/app-core/pink-mode.js',
      'src/scripts/modules/app-core/localization.js',
      'src/scripts/app-core-text.js',
      'src/scripts/app-core-runtime-scopes.js',
      'src/scripts/app-core-runtime-support.js',
      'src/scripts/app-core-runtime-helpers.js',
      'src/scripts/app-core-enviroment.js',
      'src/scripts/app-core-bootstrap.js',
      'src/scripts/app-core-runtime-shared.js',
      'src/scripts/app-core-new-1.js',
      'src/scripts/app-core-localization-accessors.js',
      'src/scripts/app-core-pink-mode.js',
      'src/scripts/app-core-runtime-candidate-scopes.js',
      'src/scripts/app-core-new-2.js',
      'src/scripts/app-events.js',
      'src/scripts/app-setups.js',
      'src/scripts/restore-verification.js',
      'src/scripts/app-session.js',
      'src/scripts/modules/persistence.js',
      'src/scripts/modules/runtime.js',
      'src/scripts/script.js'
    ],
    deferred: [
      'src/scripts/auto-gear-monitoring.js',
      'src/scripts/overview.js',
      'src/scripts/autosave-overlay.js'
    ],
  };

  var legacyScriptBundle = {
    core: [
      'legacy/polyfills/core-js-bundle.min.js',
      'legacy/polyfills/regenerator-runtime.js',
      'src/vendor/regenerator-runtime-fallback.js',
      'legacy/scripts/globalthis-polyfill.js',
      'legacy/data/devices/index.js',
      'legacy/data/rental-houses.js',
      { parallel: [
        'legacy/data/devices/cameras.js',
        'legacy/data/devices/monitors.js',
        'legacy/data/devices/video.js',
        'legacy/data/devices/fiz.js',
        'legacy/data/devices/batteries.js',
        'legacy/data/devices/batteryHotswaps.js',
        'legacy/data/devices/chargers.js',
        'legacy/data/devices/cages.js',
        'legacy/data/devices/gearList.js',
        'legacy/data/devices/wirelessReceivers.js',
      ] },
      'legacy/scripts/storage.js',
      'legacy/scripts/translations.js',
      'src/vendor/lz-string.min.js',
      'legacy/scripts/auto-gear-weight.js',
      'legacy/scripts/modules/base.js',
      'legacy/scripts/modules/registry.js',
      'legacy/scripts/modules/environment-bridge.js',
      'legacy/scripts/modules/globals.js',
      'legacy/scripts/modules/localization.js',
      'legacy/scripts/modules/offline.js',
      'legacy/scripts/modules/core-shared.js',
      'legacy/scripts/modules/core/mount-voltage.js',
      'legacy/scripts/modules/core/pink-mode-support.js',
      'legacy/scripts/modules/core/pink-mode-animations.js',
      'legacy/scripts/modules/logging.js',
      'legacy/scripts/modules/core/mount-voltage.js',
      'legacy/scripts/modules/features/backup.js',
      'legacy/scripts/modules/features/onboarding-tour.js',
      'legacy/scripts/modules/features/print-workflow.js',
      'legacy/scripts/modules/ui.js',
      'legacy/scripts/modules/runtime-guard.js',
      'legacy/scripts/modules/results.js',
      'legacy/scripts/app-core-text.js',
      'legacy/scripts/app-core-runtime-scopes.js',
      'legacy/scripts/app-core-runtime-support.js',
      'legacy/scripts/app-core-runtime-helpers.js',
      'legacy/scripts/app-core-enviroment.js',
      'legacy/scripts/app-core-new-1.js',
      'legacy/scripts/app-core-new-2.js',
      'legacy/scripts/app-events.js',
      'legacy/scripts/app-setups.js',
      'legacy/scripts/app-session.js',
      'legacy/scripts/modules/runtime.js',
      'legacy/scripts/modules/persistence.js',
      'legacy/scripts/script.js'
    ],
    deferred: [
      'legacy/scripts/auto-gear-monitoring.js',
      'legacy/scripts/overview.js',
      'legacy/scripts/autosave-overlay.js'
    ],
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
            if (triggerLegacyBundleReload({ rememberPreference: false, markRetry: true })) {
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
            console.warn(
              'Loader switching to legacy bundle after failing to load modern script:',
              context && context.url,
              context && context.event && context.event.error
            );
          }

          window.__CINE_POWER_LEGACY_BUNDLE__ = true;

          var errorEvent = context && context.event ? context.event : null;
          var syntaxError = isSyntaxErrorEvent(errorEvent);
          var fallbackReason = syntaxError ? 'syntax-error' : 'transient-error';
          var fallbackMessage = extractLegacyFallbackMessage(errorEvent);

          if (syntaxError) {
            if (
              triggerLegacyBundleReload({
                reason: fallbackReason,
                message: fallbackMessage,
              })
            ) {
              return true;
            }
          }

          if (!syntaxError && typeof console !== 'undefined' && typeof console.info === 'function') {
            console.info('Proceeding with inline legacy bundle due to transient modern load failure.');
          }

          loadScriptBundle(fallbackBundle);
          return true;
        },
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

  function startLoaderWhenBodyReady() {
    if (typeof document === 'undefined') {
      startLoading();
      return;
    }

    if (document.body) {
      startLoading();
      return;
    }

    function handleReady() {
      try {
        document.removeEventListener('DOMContentLoaded', handleReady);
      } catch (removeError) {
        void removeError;
      }
      startLoading();
    }

    try {
      document.addEventListener('DOMContentLoaded', handleReady, { once: true });
    } catch (listenerError) {
      void listenerError;
      document.addEventListener('DOMContentLoaded', handleReady);
    }
  }

  startLoaderWhenBodyReady();
})();
