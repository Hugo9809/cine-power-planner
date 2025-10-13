function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function registerScope(scopes, scope) {
    if (!isObject(scope) || scopes.indexOf(scope) !== -1) {
      return;
    }
    scopes.push(scope);
  }
  function collectScopeCandidates(primaryScope) {
    var scopes = [];
    registerScope(scopes, primaryScope);
    if (typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined') {
      registerScope(scopes, CORE_PART1_RUNTIME_SCOPE);
    }
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined') {
      registerScope(scopes, CORE_GLOBAL_SCOPE);
    }
    if (typeof globalThis !== 'undefined') {
      registerScope(scopes, globalThis);
    }
    if (typeof window !== 'undefined') {
      registerScope(scopes, window);
    }
    if (typeof self !== 'undefined') {
      registerScope(scopes, self);
    }
    if (typeof global !== 'undefined') {
      registerScope(scopes, global);
    }
    return scopes;
  }
  function resolveLocalizationFallbackContextNamespace(primaryScope) {
    var scopeCandidates = collectScopeCandidates(primaryScope);
    for (var index = 0; index < scopeCandidates.length; index += 1) {
      var candidateScope = scopeCandidates[index];
      try {
        var candidate = candidateScope.cineCoreLocalizationFallbackContext;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (lookupError) {
        void lookupError;
      }
    }
    if (typeof require === 'function') {
      try {
        var required = require('./localization-fallback-context.js');
        if (isObject(required)) {
          return required;
        }
      } catch (fallbackRequireError) {
        void fallbackRequireError;
      }
    }
    for (var retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
      var retryScope = scopeCandidates[retryIndex];
      try {
        var retryCandidate = retryScope.cineCoreLocalizationFallbackContext;
        if (isObject(retryCandidate)) {
          return retryCandidate;
        }
      } catch (retryLookupError) {
        void retryLookupError;
      }
    }
    return null;
  }
  function normalizeLanguageCodeValue(lang, defaultLanguage) {
    if (!lang) {
      return defaultLanguage;
    }
    try {
      var normalized = String(lang).trim().toLowerCase();
      return normalized || defaultLanguage;
    } catch (normalizeError) {
      void normalizeError;
    }
    return defaultLanguage;
  }
  function resolveRtlCodes(config) {
    if (config && Array.isArray(config.rtlLanguageCodes)) {
      var codes = [];
      for (var index = 0; index < config.rtlLanguageCodes.length; index += 1) {
        var rawCode = config.rtlLanguageCodes[index];
        var normalized = normalizeLanguageCodeValue(String(rawCode || ''), '');
        if (normalized && codes.indexOf(normalized) === -1) {
          codes.push(normalized);
        }
      }
      if (codes.length > 0) {
        return codes;
      }
    }
    return ['ar', 'fa', 'he', 'ur'];
  }
  function createLocaleFallbackHelpers(baseOptions) {
    var config = baseOptions || {};
    var defaultLanguage = normalizeLanguageCodeValue(config.defaultLanguage, 'en');
    var rtlLanguageCodes = resolveRtlCodes(config);
    function normalizeLanguageCode(lang) {
      return normalizeLanguageCodeValue(lang, defaultLanguage);
    }
    function isRtlLanguage(lang) {
      var normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
      var base = normalized.split('-')[0];
      return rtlLanguageCodes.indexOf(base) !== -1;
    }
    function resolveDocumentDirection(lang) {
      if (typeof document !== 'undefined' && document && document.documentElement) {
        try {
          var docDir = document.documentElement.getAttribute('dir');
          if (docDir === 'rtl' || docDir === 'ltr') {
            return docDir;
          }
        } catch (documentDirectionError) {
          void documentDirectionError;
        }
      }
      return isRtlLanguage(lang) ? 'rtl' : 'ltr';
    }
    function applyLocaleMetadata(target, lang, direction) {
      if (!target) {
        return;
      }
      if (lang) {
        try {
          target.lang = lang;
        } catch (setLangError) {
          void setLangError;
        }
      }
      if (direction) {
        try {
          target.dir = direction;
        } catch (setDirError) {
          void setDirError;
        }
      }
    }
    return {
      getDefaultLanguage: function getDefaultLanguage() {
        return defaultLanguage;
      },
      getRtlLanguageCodes: function getRtlLanguageCodes() {
        return rtlLanguageCodes.slice();
      },
      resolveLocaleModule: function resolveLocaleModule() {
        return null;
      },
      normalizeLanguageCode: normalizeLanguageCode,
      isRtlLanguage: isRtlLanguage,
      resolveDocumentDirection: resolveDocumentDirection,
      applyLocaleMetadata: applyLocaleMetadata
    };
  }
  function createBasicLocalizationFallbackResolversFallback(options) {
    var baseOptions = options || {};
    return {
      namespace: {
        fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
          return null;
        },
        createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
          return createLocaleFallbackHelpers(fallbackOptions || baseOptions);
        }
      },
      fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
        return createLocaleFallbackHelpers(fallbackOptions || baseOptions);
      }
    };
  }
  function createLegacyLocalizationFallbackContextFallback(options) {
    var resolvers = createBasicLocalizationFallbackResolversFallback(options);
    var namespace = resolvers && resolvers.namespace && _typeof(resolvers.namespace) === 'object' ? resolvers.namespace : {
      fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks: function createLocaleFallbacks() {
        return null;
      }
    };
    return {
      support: null,
      registry: {
        createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
          return createBasicLocalizationFallbackResolversFallback(fallbackOptions || options);
        }
      },
      resolvers: resolvers,
      namespace: namespace,
      fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
      createLocaleFallbacks: namespace.createLocaleFallbacks
    };
  }
  function detectGlobalScope() {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isObject(CORE_GLOBAL_SCOPE)) {
      return CORE_GLOBAL_SCOPE;
    }
    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }
    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }
    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }
    return null;
  }
  var namespace = {
    resolveLocalizationFallbackContextNamespace: resolveLocalizationFallbackContextNamespace,
    createBasicLocalizationFallbackResolversFallback: createBasicLocalizationFallbackResolversFallback,
    createLegacyLocalizationFallbackContextFallback: createLegacyLocalizationFallbackContextFallback
  };
  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreLocalizationFallbackFactories';
  var existing = isObject(globalScope) && isObject(globalScope[targetName]) ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
  }
  if (isObject(globalScope)) {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = target;
  }
})();