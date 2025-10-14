function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function detectGlobalScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
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
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    var globalScope = detectGlobalScope(runtimeScope);
    if (isObject(globalScope) && typeof globalScope.resolveCoreSupportModule === 'function') {
      try {
        return globalScope.resolveCoreSupportModule.bind(globalScope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (isObject(globalScope) && globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }
    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }
        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }
        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }
        return null;
      };
    }
    return function unresolvedSupportModule() {
      return null;
    };
  }
  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectGlobalScope(fallbackScope);
  }
  function createAppLocalizationSupport(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var localizationRuntimeEnvironmentTools = resolveCoreSupportModule('cineCoreLocalizationRuntimeEnvironment', '../core/localization-runtime-environment.js');
    var localizationRuntimeEnvironment = localizationRuntimeEnvironmentTools && typeof localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment === 'function' ? localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    }) : null;
    var localizationBridge = localizationRuntimeEnvironment && isObject(localizationRuntimeEnvironment.coreLocalizationBridge) ? localizationRuntimeEnvironment.coreLocalizationBridge : null;
    var localizationFallbacks = localizationRuntimeEnvironment && isObject(localizationRuntimeEnvironment.coreLocalizationFallbacks) ? localizationRuntimeEnvironment.coreLocalizationFallbacks : null;
    var inlineLocalizationFallbacks = localizationRuntimeEnvironment && isObject(localizationRuntimeEnvironment.coreInlineLocalizationFallbacks) ? localizationRuntimeEnvironment.coreInlineLocalizationFallbacks : null;
    var localizationFallbackSupport = localizationRuntimeEnvironment && typeof localizationRuntimeEnvironment.localizationFallbackSupport !== 'undefined' ? localizationRuntimeEnvironment.localizationFallbackSupport : null;
    var createBasicLocalizationFallbackResolvers = localizationRuntimeEnvironment && typeof localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers === 'function' ? localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers : function createBasicLocalizationFallbackResolversProxy() {
      return null;
    };
    var localizationFallbackRegistry = localizationRuntimeEnvironment && isObject(localizationRuntimeEnvironment.localizationFallbackRegistry) ? localizationRuntimeEnvironment.localizationFallbackRegistry : {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolvers(fallbackOptions);
      }
    };
    var localizationFallbackResolvers = localizationRuntimeEnvironment && isObject(localizationRuntimeEnvironment.localizationFallbackResolvers) ? localizationRuntimeEnvironment.localizationFallbackResolvers : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry.createFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    }) : createBasicLocalizationFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    });
    var localizationFallbackNamespace = localizationRuntimeEnvironment && typeof localizationRuntimeEnvironment.localizationFallbackNamespace !== 'undefined' ? localizationRuntimeEnvironment.localizationFallbackNamespace : null;
    var fallbackResolveLocaleModule = localizationRuntimeEnvironment && typeof localizationRuntimeEnvironment.fallbackResolveLocaleModule === 'function' ? localizationRuntimeEnvironment.fallbackResolveLocaleModule : function fallbackResolveLocaleModuleProxy() {
      return null;
    };
    var createLocaleFallbacks = localizationRuntimeEnvironment && typeof localizationRuntimeEnvironment.createLocaleFallbacks === 'function' ? localizationRuntimeEnvironment.createLocaleFallbacks : function createLocaleFallbacksProxy() {
      return null;
    };
    return {
      localizationRuntimeEnvironment: localizationRuntimeEnvironment,
      localizationBridge: localizationBridge,
      localizationFallbacks: localizationFallbacks,
      inlineLocalizationFallbacks: inlineLocalizationFallbacks,
      localizationFallbackSupport: localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: localizationFallbackResolvers,
      localizationFallbackNamespace: localizationFallbackNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModule,
      createLocaleFallbacks: createLocaleFallbacks
    };
  }
  var namespace = {
    createAppLocalizationSupport: createAppLocalizationSupport
  };
  var globalScope = detectGlobalScope();
  var namespaceName = 'cineCoreAppLocalizationSupport';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
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
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function ensureScope(candidate, fallback) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectScope(fallback);
  }
  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    var scope = ensureScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }
    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }
        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }
        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }
        return null;
      };
    }
    return function unresolvedSupportModule() {
      return null;
    };
  }
  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }
    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }
  function ensureFallbackScopes(candidateScopes, runtimeScope, coreGlobalScope) {
    var scopes = Array.isArray(candidateScopes) ? candidateScopes.slice() : [];
    registerScope(scopes, runtimeScope);
    registerScope(scopes, coreGlobalScope);
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function resolveLocalizationSupportTools(options) {
    if (options && isObject(options.localizationSupportTools)) {
      return options.localizationSupportTools;
    }
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    if (resolveCoreSupportModule) {
      try {
        var resolved = resolveCoreSupportModule('cineCoreAppLocalizationSupport', './modules/app-core/localization.js');
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
      }
    }
    var requireFn = ensureRequireFn(options && options.requireFn);
    if (typeof requireFn === 'function') {
      try {
        var required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          return required;
        }
      } catch (localizationSupportRequireError) {
        void localizationSupportRequireError;
      }
    }
    var fallbackScopes = ensureFallbackScopes(options && options.fallbackScopes, options && options.runtimeScope, options && options.coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      try {
        var candidate = scope && scope.cineCoreAppLocalizationSupport;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationSupportLookupError) {
        void localizationSupportLookupError;
      }
    }
    return null;
  }
  function createLocalizationSupport(options) {
    var supportTools = resolveLocalizationSupportTools(options);
    if (supportTools && typeof supportTools.createAppLocalizationSupport === 'function') {
      try {
        return supportTools.createAppLocalizationSupport({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn: options && options.requireFn,
          runtimeScope: options && options.runtimeScope,
          coreGlobalScope: options && options.coreGlobalScope
        });
      } catch (localizationSupportError) {
        void localizationSupportError;
      }
    }
    return null;
  }
  function createLocalizationBootstrapResult(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var fallbackScopes = ensureFallbackScopes(options && options.fallbackScopes, runtimeScope, coreGlobalScope);
    var localizationSupport = createLocalizationSupport({
      localizationSupportTools: options && options.localizationSupportTools,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes
    });
    var localizationRuntimeEnvironment = localizationSupport && localizationSupport.localizationRuntimeEnvironment ? localizationSupport.localizationRuntimeEnvironment : null;
    var localizationBridge = localizationSupport && localizationSupport.localizationBridge ? localizationSupport.localizationBridge : null;
    var localizationFallbacks = localizationSupport && localizationSupport.localizationFallbacks ? localizationSupport.localizationFallbacks : null;
    var inlineLocalizationFallbacks = localizationSupport && localizationSupport.inlineLocalizationFallbacks ? localizationSupport.inlineLocalizationFallbacks : null;
    var localizationFallbackSupport = localizationSupport && typeof localizationSupport.localizationFallbackSupport !== 'undefined' ? localizationSupport.localizationFallbackSupport : null;
    var createBasicLocalizationFallbackResolvers = localizationSupport && typeof localizationSupport.createBasicLocalizationFallbackResolvers === 'function' ? localizationSupport.createBasicLocalizationFallbackResolvers : function createBasicLocalizationFallbackResolversProxy() {
      return null;
    };
    var localizationFallbackRegistry = localizationSupport && localizationSupport.localizationFallbackRegistry ? localizationSupport.localizationFallbackRegistry : {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolvers(fallbackOptions);
      }
    };
    var localizationFallbackResolvers = localizationSupport && localizationSupport.localizationFallbackResolvers ? localizationSupport.localizationFallbackResolvers : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry.createFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    }) : createBasicLocalizationFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    });
    var localizationFallbackNamespace = localizationSupport && typeof localizationSupport.localizationFallbackNamespace !== 'undefined' ? localizationSupport.localizationFallbackNamespace : null;
    var fallbackResolveLocaleModule = localizationSupport && typeof localizationSupport.fallbackResolveLocaleModule === 'function' ? localizationSupport.fallbackResolveLocaleModule : function fallbackResolveLocaleModuleProxy() {
      return null;
    };
    var createLocaleFallbacks = localizationSupport && typeof localizationSupport.createLocaleFallbacks === 'function' ? localizationSupport.createLocaleFallbacks : function createLocaleFallbacksProxy() {
      return null;
    };
    return {
      localizationSupport: localizationSupport,
      localizationRuntimeEnvironment: localizationRuntimeEnvironment,
      localizationBridge: localizationBridge,
      localizationFallbacks: localizationFallbacks,
      inlineLocalizationFallbacks: inlineLocalizationFallbacks,
      localizationFallbackSupport: localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: localizationFallbackResolvers,
      localizationFallbackNamespace: localizationFallbackNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModule,
      createLocaleFallbacks: createLocaleFallbacks
    };
  }
  var namespace = {
    createLocalizationBootstrapResult: createLocalizationBootstrapResult
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppLocalizationBootstrap';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function collectFallbackScopes(primaryScope, secondaryScope, additionalScopes) {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function register(scope) {
      if (!isObject(scope)) {
        return;
      }
      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
        scopes.push(scope);
        return;
      }
      if (scopes.indexOf(scope) !== -1) {
        return;
      }
      scopes.push(scope);
    }
    register(primaryScope);
    register(secondaryScope);
    if (Array.isArray(additionalScopes)) {
      for (var index = 0; index < additionalScopes.length; index += 1) {
        register(additionalScopes[index]);
      }
    }
    register(typeof globalThis !== 'undefined' ? globalThis : null);
    register(typeof window !== 'undefined' ? window : null);
    register(typeof self !== 'undefined' ? self : null);
    register(typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function fallbackNormalizeLanguageCodeFactory(defaultLanguage) {
    var fallbackLang = typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';
    return function fallbackNormalizeLanguageCodeProxy(lang) {
      if (!lang) {
        return fallbackLang;
      }
      try {
        var normalized = String(lang).trim().toLowerCase();
        return normalized || fallbackLang;
      } catch (languageNormalizeError) {
        void languageNormalizeError;
      }
      return fallbackLang;
    };
  }
  function fallbackIsRtlLanguageFactory(rtlLanguageCodes, normalizeLanguageCode) {
    var rtlCodes = Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length ? rtlLanguageCodes : ['ar', 'fa', 'he', 'ur'];
    return function fallbackIsRtlLanguageProxy(lang) {
      var normalized = normalizeLanguageCode(lang);
      var base = normalized.split('-')[0];
      return rtlCodes.indexOf(base) !== -1;
    };
  }
  function fallbackResolveDocumentDirectionFactory(normalizeLanguageCode, isRtlLanguage) {
    return function fallbackResolveDocumentDirectionProxy(lang) {
      if (typeof document !== 'undefined' && document && document.documentElement) {
        try {
          var docDir = document.documentElement.getAttribute('dir');
          if (docDir) {
            return docDir;
          }
        } catch (resolveDirectionError) {
          void resolveDirectionError;
        }
      }
      return isRtlLanguage(lang) ? 'rtl' : 'ltr';
    };
  }
  function fallbackApplyLocaleMetadataProxy(target, lang, direction) {
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
  function fallbackResolveTranslationDatasetFactory(fallbackScopes, requireFn, translationsRequirePath) {
    return function fallbackResolveTranslationDataset() {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }
        var dataset = scope.texts;
        if (isObject(dataset)) {
          return dataset;
        }
      }
      if (typeof requireFn === 'function') {
        try {
          var translationsModule = requireFn(translationsRequirePath);
          if (isObject(translationsModule) && isObject(translationsModule.texts)) {
            return translationsModule.texts;
          }
        } catch (translationRequireError) {
          void translationRequireError;
        }
      }
      return {};
    };
  }
  function fallbackGetLanguageTextsFactory(datasetResolver, defaultLanguage) {
    var fallbackLang = typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';
    return function fallbackGetLanguageTextsProxy(lang) {
      var dataset = datasetResolver();
      var normalized = null;
      if (typeof lang === 'string' && lang) {
        try {
          normalized = String(lang).trim().toLowerCase();
        } catch (normalizeError) {
          void normalizeError;
          normalized = null;
        }
      }
      var resolved = normalized && Object.prototype.hasOwnProperty.call(dataset, normalized) ? normalized : '';
      if (!resolved && normalized) {
        var base = normalized.split('-')[0];
        if (base && Object.prototype.hasOwnProperty.call(dataset, base)) {
          resolved = base;
        }
      }
      if (!resolved) {
        resolved = fallbackLang;
      }
      var candidate = dataset && resolved && isObject(dataset[resolved]) ? dataset[resolved] : null;
      if (candidate) {
        return candidate;
      }
      if (resolved !== fallbackLang) {
        var fallbackCandidate = dataset && isObject(dataset[fallbackLang]) ? dataset[fallbackLang] : null;
        if (fallbackCandidate) {
          return fallbackCandidate;
        }
      }
      if (dataset && isObject(dataset.en)) {
        return dataset.en;
      }
      var languages = dataset ? Object.keys(dataset) : [];
      if (languages.length) {
        var firstLang = languages[0];
        var firstTexts = dataset[firstLang];
        if (isObject(firstTexts)) {
          return firstTexts;
        }
      }
      return {};
    };
  }
  function createEnsureGlobalGetLanguageTextsAvailability(runtime, fallbackScopes) {
    return function ensureGlobalGetLanguageTextsAvailability(getLanguageTextsFn) {
      if (runtime && typeof runtime.ensureGlobalGetLanguageTextsAvailability === 'function') {
        try {
          runtime.ensureGlobalGetLanguageTextsAvailability();
          return;
        } catch (ensureError) {
          void ensureError;
        }
      }
      var assignableFunction = typeof getLanguageTextsFn === 'function' ? getLanguageTextsFn : function defaultGetLanguageTexts() {
        return {};
      };
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }
        if (typeof scope.getLanguageTexts !== 'function') {
          try {
            scope.getLanguageTexts = assignableFunction;
          } catch (assignError) {
            void assignError;
          }
        }
      }
    };
  }
  function createLocalizationAccessors(options) {
    var runtime = isObject(options && options.coreLocalizationRuntime) ? options.coreLocalizationRuntime : null;
    var localizationBridge = isObject(options && options.coreLocalizationBridge) ? options.coreLocalizationBridge : null;
    var runtimeScope = options && options.corePartRuntimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var additionalScopes = options && options.additionalLocalizationScopes;
    var fallbackResolveLocaleModule = options && typeof options.fallbackResolveLocaleModule === 'function' ? options.fallbackResolveLocaleModule : null;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var translationsRequirePath = options && typeof options.translationsRequirePath === 'string' && options.translationsRequirePath ? options.translationsRequirePath : './translations.js';
    var fallbackScopes = collectFallbackScopes(runtimeScope, coreGlobalScope, additionalScopes);
    var localeModule = runtime && runtime.localeModule || (fallbackResolveLocaleModule ? fallbackResolveLocaleModule(runtimeScope) : null);
    var defaultLanguage = runtime && runtime.defaultLanguage || (localeModule && typeof localeModule.DEFAULT_LANGUAGE === 'string' ? localeModule.DEFAULT_LANGUAGE : 'en');
    var rtlLanguageCodes = runtime && runtime.rtlLanguageCodes || (localeModule && Array.isArray(localeModule.RTL_LANGUAGE_CODES) && localeModule.RTL_LANGUAGE_CODES.length > 0 ? localeModule.RTL_LANGUAGE_CODES : ['ar', 'fa', 'he', 'ur']);
    var fallbackNormalizeLanguageCode = fallbackNormalizeLanguageCodeFactory(defaultLanguage);
    var normalizeLanguageCode = runtime && typeof runtime.normalizeLanguageCode === 'function' ? function runtimeNormalizeLanguageCode(lang) {
      try {
        return runtime.normalizeLanguageCode(lang);
      } catch (runtimeNormalizeError) {
        void runtimeNormalizeError;
      }
      return fallbackNormalizeLanguageCode(lang);
    } : localizationBridge && typeof localizationBridge.normalizeLanguageCode === 'function' ? function bridgeNormalizeLanguageCode(lang) {
      try {
        return localizationBridge.normalizeLanguageCode(lang, runtimeScope);
      } catch (bridgeNormalizeError) {
        void bridgeNormalizeError;
      }
      return fallbackNormalizeLanguageCode(lang);
    } : fallbackNormalizeLanguageCode;
    var fallbackIsRtlLanguage = fallbackIsRtlLanguageFactory(rtlLanguageCodes, normalizeLanguageCode);
    var isRtlLanguage = runtime && typeof runtime.isRtlLanguage === 'function' ? function runtimeIsRtlLanguage(lang) {
      try {
        return runtime.isRtlLanguage(lang);
      } catch (runtimeIsRtlError) {
        void runtimeIsRtlError;
      }
      return fallbackIsRtlLanguage(lang);
    } : localizationBridge && typeof localizationBridge.isRtlLanguage === 'function' ? function bridgeIsRtlLanguage(lang) {
      try {
        return localizationBridge.isRtlLanguage(lang, runtimeScope);
      } catch (bridgeIsRtlError) {
        void bridgeIsRtlError;
      }
      return fallbackIsRtlLanguage(lang);
    } : fallbackIsRtlLanguage;
    var fallbackResolveDocumentDirection = fallbackResolveDocumentDirectionFactory(normalizeLanguageCode, isRtlLanguage);
    var resolveDocumentDirection = runtime && typeof runtime.resolveDocumentDirection === 'function' ? function runtimeResolveDocumentDirection(lang) {
      try {
        return runtime.resolveDocumentDirection(lang);
      } catch (runtimeResolveDirectionError) {
        void runtimeResolveDirectionError;
      }
      return fallbackResolveDocumentDirection(lang);
    } : localizationBridge && typeof localizationBridge.resolveDocumentDirection === 'function' ? function bridgeResolveDocumentDirection(lang) {
      try {
        return localizationBridge.resolveDocumentDirection(lang, runtimeScope);
      } catch (bridgeResolveDirectionError) {
        void bridgeResolveDirectionError;
      }
      return fallbackResolveDocumentDirection(lang);
    } : fallbackResolveDocumentDirection;
    var applyLocaleMetadata = runtime && typeof runtime.applyLocaleMetadata === 'function' ? function runtimeApplyLocaleMetadata(target, lang, direction) {
      try {
        return runtime.applyLocaleMetadata(target, lang, direction);
      } catch (runtimeApplyLocaleError) {
        void runtimeApplyLocaleError;
      }
      return fallbackApplyLocaleMetadataProxy(target, lang, direction);
    } : localizationBridge && typeof localizationBridge.applyLocaleMetadata === 'function' ? function bridgeApplyLocaleMetadata(target, lang, direction) {
      try {
        return localizationBridge.applyLocaleMetadata(target, lang, direction, runtimeScope);
      } catch (bridgeApplyLocaleError) {
        void bridgeApplyLocaleError;
      }
      return fallbackApplyLocaleMetadataProxy(target, lang, direction);
    } : fallbackApplyLocaleMetadataProxy;
    var datasetResolver = fallbackResolveTranslationDatasetFactory(fallbackScopes, requireFn, translationsRequirePath);
    var fallbackGetLanguageTexts = fallbackGetLanguageTextsFactory(datasetResolver, defaultLanguage);
    var getLanguageTexts = runtime && typeof runtime.getLanguageTexts === 'function' ? function runtimeGetLanguageTexts(lang) {
      try {
        return runtime.getLanguageTexts(lang);
      } catch (runtimeGetLanguageTextsError) {
        void runtimeGetLanguageTextsError;
      }
      return fallbackGetLanguageTexts(lang);
    } : fallbackGetLanguageTexts;
    var ensureGlobalGetLanguageTextsAvailability = createEnsureGlobalGetLanguageTextsAvailability(runtime, fallbackScopes);
    return {
      localeModule: isObject(localeModule) ? localeModule : null,
      defaultLanguage: typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en',
      rtlLanguageCodes: Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length ? rtlLanguageCodes : ['ar', 'fa', 'he', 'ur'],
      normalizeLanguageCode: normalizeLanguageCode,
      isRtlLanguage: isRtlLanguage,
      resolveDocumentDirection: resolveDocumentDirection,
      applyLocaleMetadata: applyLocaleMetadata,
      getLanguageTexts: getLanguageTexts,
      ensureGlobalGetLanguageTextsAvailability: ensureGlobalGetLanguageTextsAvailability,
      fallbackResolveTranslationDataset: datasetResolver
    };
  }
  var namespace = {
    createLocalizationAccessors: createLocalizationAccessors
  };
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var namespaceName = 'cineCoreAppLocalizationAccessors';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
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
  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectScope(fallbackScope);
  }
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    var scope = detectScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }
    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }
        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }
        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }
        return null;
      };
    }
    return function unresolvedSupportModule() {
      return null;
    };
  }
  function collectCandidateScopes(primaryScope, secondaryScope) {
    var scopes = [];
    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }
    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }
    var additionalScopes = [typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < additionalScopes.length; index += 1) {
      var scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    return scopes;
  }
  function resolveLocalizationSupportTools(options) {
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = options && options.requireFn;
    var runtimeScope = options && options.runtimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var tools = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule('cineCoreAppLocalizationSupport', '../app-core/localization.js');
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
        tools = null;
      }
    }
    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        var requiredLocalizationSupport = requireFn('../app-core/localization.js');
        if (isObject(requiredLocalizationSupport)) {
          tools = requiredLocalizationSupport;
        }
      } catch (localizationSupportRequireError) {
        void localizationSupportRequireError;
      }
    }
    if (isObject(tools)) {
      return tools;
    }
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      try {
        var candidate = scope && scope.cineCoreAppLocalizationSupport;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationSupportLookupError) {
        void localizationSupportLookupError;
      }
    }
    return null;
  }
  function createFallbackLocalizationBridge() {
    function createBasicLocalizationFallbackResolversProxy() {
      return null;
    }
    var localizationFallbackRegistry = {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolversProxy(fallbackOptions);
      }
    };
    function fallbackResolveLocaleModuleProxy() {
      return null;
    }
    function createLocaleFallbacksProxy() {
      return null;
    }
    return {
      localizationRuntimeEnvironment: null,
      localizationBridge: null,
      localizationFallbacks: null,
      inlineLocalizationFallbacks: null,
      localizationFallbackSupport: null,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolversProxy,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy
    };
  }
  function callCreateAppLocalizationSupport(tools, options) {
    if (isObject(tools) && typeof tools.createAppLocalizationSupport === 'function') {
      try {
        return tools.createAppLocalizationSupport(options);
      } catch (createAppLocalizationSupportError) {
        void createAppLocalizationSupportError;
      }
    }
    return null;
  }
  function createLocalizationRuntimeBridge(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var localizationSupportTools = resolveLocalizationSupportTools({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    var localizationBridge = callCreateAppLocalizationSupport(localizationSupportTools, {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    if (isObject(localizationBridge)) {
      return localizationBridge;
    }
    return createFallbackLocalizationBridge();
  }
  var namespace = {
    createLocalizationRuntimeBridge: createLocalizationRuntimeBridge
  };
  var namespaceName = 'cineCoreAppLocalizationRuntimeBridge';
  var globalScope = detectScope();
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  for (var _i2 = 0, _Object$keys2 = Object.keys(namespace); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    existing[key] = namespace[key];
  }
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
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
  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectScope(fallbackScope);
  }
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    var scope = detectScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }
    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }
        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }
        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }
        return null;
      };
    }
    return function unresolvedSupportModule() {
      return null;
    };
  }
  function collectCandidateScopes(primaryScope, secondaryScope) {
    var scopes = [];
    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }
    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }
    var additionalScopes = [typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < additionalScopes.length; index += 1) {
      var scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    return scopes;
  }
  function resolveLocalizationRuntimeBridgeTools(options) {
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = options && options.requireFn;
    var runtimeScope = options && options.runtimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var tools = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule('cineCoreAppLocalizationRuntimeBridge', './modules/app-core/localization.js');
      } catch (localizationBridgeResolveError) {
        void localizationBridgeResolveError;
        tools = null;
      }
    }
    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        var required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          tools = required;
        }
      } catch (localizationBridgeRequireError) {
        void localizationBridgeRequireError;
      }
    }
    if (isObject(tools)) {
      return tools;
    }
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      try {
        var candidate = scope && scope.cineCoreAppLocalizationRuntimeBridge;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationBridgeLookupError) {
        void localizationBridgeLookupError;
      }
    }
    return null;
  }
  function createFallbackLocalizationBridge() {
    function createBasicLocalizationFallbackResolversProxy() {
      return null;
    }
    var localizationFallbackRegistry = {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolversProxy(fallbackOptions);
      }
    };
    function fallbackResolveLocaleModuleProxy() {
      return null;
    }
    function createLocaleFallbacksProxy() {
      return null;
    }
    return {
      localizationRuntimeEnvironment: null,
      localizationBridge: null,
      localizationFallbacks: null,
      inlineLocalizationFallbacks: null,
      localizationFallbackSupport: null,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolversProxy,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy
    };
  }
  function ensureBridgeFactory(options) {
    var requireFn = options && options.requireFn;
    var runtimeScope = options && options.runtimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var tools = resolveLocalizationRuntimeBridgeTools(options);
    if (isObject(tools) && typeof tools.createLocalizationRuntimeBridge === 'function') {
      return tools.createLocalizationRuntimeBridge;
    }
    if (typeof requireFn === 'function') {
      try {
        var required = requireFn('./modules/app-core/localization.js');
        if (isObject(required) && typeof required.createLocalizationRuntimeBridge === 'function') {
          return required.createLocalizationRuntimeBridge;
        }
      } catch (localizationBridgeRequireError) {
        void localizationBridgeRequireError;
      }
    }
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      try {
        var candidate = scope && scope.cineCoreAppLocalizationRuntimeBridge;
        if (isObject(candidate) && typeof candidate.createLocalizationRuntimeBridge === 'function') {
          return candidate.createLocalizationRuntimeBridge;
        }
      } catch (localizationBridgeLookupError) {
        void localizationBridgeLookupError;
      }
    }
    return function fallbackCreateLocalizationRuntimeBridge() {
      return createFallbackLocalizationBridge();
    };
  }
  function normalizeLocalizationRuntimeBridge(bridge) {
    var resolvedBridge = isObject(bridge) ? bridge : createFallbackLocalizationBridge();
    var localizationRuntimeEnvironment = isObject(resolvedBridge.localizationRuntimeEnvironment) ? resolvedBridge.localizationRuntimeEnvironment : null;
    var localizationBridge = isObject(resolvedBridge.localizationBridge) ? resolvedBridge.localizationBridge : null;
    var localizationFallbacks = isObject(resolvedBridge.localizationFallbacks) ? resolvedBridge.localizationFallbacks : null;
    var inlineLocalizationFallbacks = isObject(resolvedBridge.inlineLocalizationFallbacks) ? resolvedBridge.inlineLocalizationFallbacks : null;
    var localizationFallbackSupport = typeof resolvedBridge.localizationFallbackSupport !== 'undefined' ? resolvedBridge.localizationFallbackSupport : null;
    var createBasicLocalizationFallbackResolvers = typeof resolvedBridge.createBasicLocalizationFallbackResolvers === 'function' ? resolvedBridge.createBasicLocalizationFallbackResolvers : function createBasicLocalizationFallbackResolversProxy() {
      return null;
    };
    var localizationFallbackRegistry = isObject(resolvedBridge.localizationFallbackRegistry) ? resolvedBridge.localizationFallbackRegistry : {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolvers(fallbackOptions);
      }
    };
    var fallbackResolveLocaleModule = typeof resolvedBridge.fallbackResolveLocaleModule === 'function' ? resolvedBridge.fallbackResolveLocaleModule : function fallbackResolveLocaleModuleProxy() {
      return null;
    };
    var createLocaleFallbacks = typeof resolvedBridge.createLocaleFallbacks === 'function' ? resolvedBridge.createLocaleFallbacks : function createLocaleFallbacksProxy() {
      return null;
    };
    var localizationFallbackNamespace = typeof resolvedBridge.localizationFallbackNamespace !== 'undefined' ? resolvedBridge.localizationFallbackNamespace : null;
    var localizationFallbackResolvers = resolvedBridge.localizationFallbackResolvers ? resolvedBridge.localizationFallbackResolvers : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry.createFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    }) : createBasicLocalizationFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    });
    return {
      localizationRuntimeEnvironment: localizationRuntimeEnvironment,
      localizationBridge: localizationBridge,
      localizationFallbacks: localizationFallbacks,
      inlineLocalizationFallbacks: inlineLocalizationFallbacks,
      localizationFallbackSupport: localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: localizationFallbackResolvers,
      localizationFallbackNamespace: localizationFallbackNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModule,
      createLocaleFallbacks: createLocaleFallbacks
    };
  }
  function createLocalizationRuntimeSetup(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var createLocalizationRuntimeBridge = ensureBridgeFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    var localizationRuntimeBridge = createLocalizationRuntimeBridge({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    return normalizeLocalizationRuntimeBridge(localizationRuntimeBridge);
  }
  var namespace = {
    createLocalizationRuntimeSetup: createLocalizationRuntimeSetup
  };
  var namespaceName = 'cineCoreAppLocalizationRuntimeSetup';
  var globalScope = detectScope();
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  for (var _i3 = 0, _Object$keys3 = Object.keys(namespace); _i3 < _Object$keys3.length; _i3++) {
    var key = _Object$keys3[_i3];
    existing[key] = namespace[key];
  }
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
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
  function ensureScope(candidate, fallback) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectScope(fallback);
  }
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    var scope = ensureScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }
    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }
        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }
        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }
        return null;
      };
    }
    return null;
  }
  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }
    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }
  function collectCandidateScopes(primaryScope, secondaryScope) {
    var scopes = [];
    registerScope(scopes, primaryScope);
    registerScope(scopes, secondaryScope);
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function createInlineFallbackLocalizationRuntimeSetup() {
    return {
      localizationRuntimeEnvironment: null,
      localizationBridge: null,
      localizationFallbacks: null,
      inlineLocalizationFallbacks: null,
      localizationFallbackSupport: null,
      createBasicLocalizationFallbackResolvers: function createBasicLocalizationFallbackResolvers() {
        return null;
      },
      localizationFallbackRegistry: {
        createFallbackResolvers: function createFallbackResolvers() {
          return null;
        }
      },
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks: function createLocaleFallbacks() {
        return null;
      }
    };
  }
  function createLocalizationModuleLoader(requireFn) {
    var attempted = false;
    var cachedModule = null;
    return function loadLocalizationModule() {
      if (attempted) {
        return cachedModule;
      }
      attempted = true;
      if (typeof requireFn !== 'function') {
        return cachedModule;
      }
      try {
        var required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          cachedModule = required;
        }
      } catch (localizationRequireError) {
        void localizationRequireError;
      }
      return cachedModule;
    };
  }
  function resolveRuntimeLocalizationTools(resolveCoreSupportModule, candidateScopes, loadLocalizationModule) {
    var tools = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule('cineCoreAppRuntimeLocalization', './modules/app-core/localization.js');
      } catch (localizationResolveError) {
        void localizationResolveError;
        tools = null;
      }
    }
    if (!isObject(tools)) {
      tools = loadLocalizationModule();
    }
    if (isObject(tools)) {
      return tools;
    }
    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      try {
        var candidate = scope && scope.cineCoreAppRuntimeLocalization;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationLookupError) {
        void localizationLookupError;
      }
    }
    return null;
  }
  function resolveLocalizationMethod(methodName, tools, candidateScopes, loadLocalizationModule) {
    if (isObject(tools) && typeof tools[methodName] === 'function') {
      return tools[methodName];
    }
    var required = loadLocalizationModule();
    if (isObject(required) && typeof required[methodName] === 'function') {
      return required[methodName];
    }
    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      try {
        var candidate = scope && scope.cineCoreAppRuntimeLocalization;
        if (isObject(candidate) && typeof candidate[methodName] === 'function') {
          return candidate[methodName];
        }
      } catch (localizationMethodLookupError) {
        void localizationMethodLookupError;
      }
    }
    return null;
  }
  function resolveLocalizationRuntimeSetup(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var candidateScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    var loadLocalizationModule = createLocalizationModuleLoader(requireFn);
    var runtimeLocalizationTools = resolveRuntimeLocalizationTools(resolveCoreSupportModule, candidateScopes, loadLocalizationModule);
    var resolveRuntimeLocalization = resolveLocalizationMethod('resolveRuntimeLocalization', runtimeLocalizationTools, candidateScopes, loadLocalizationModule);
    var createFallbackLocalizationRuntimeSetup = resolveLocalizationMethod('createFallbackLocalizationRuntimeSetup', runtimeLocalizationTools, candidateScopes, loadLocalizationModule) || createInlineFallbackLocalizationRuntimeSetup;
    var setup = (typeof resolveRuntimeLocalization === 'function' ? resolveRuntimeLocalization({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    }) : null) || (typeof createFallbackLocalizationRuntimeSetup === 'function' ? createFallbackLocalizationRuntimeSetup() : createInlineFallbackLocalizationRuntimeSetup());
    return setup || createInlineFallbackLocalizationRuntimeSetup();
  }
  var namespace = {
    resolveLocalizationRuntimeSetup: resolveLocalizationRuntimeSetup,
    createInlineFallbackLocalizationRuntimeSetup: createInlineFallbackLocalizationRuntimeSetup
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppRuntimeLocalizationResolver';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
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
  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectScope(fallbackScope);
  }
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    var scope = detectScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }
    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }
        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }
        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }
        return null;
      };
    }
    return function unresolvedSupportModule() {
      return null;
    };
  }
  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }
    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }
  function collectCandidateScopes(primaryScope, secondaryScope) {
    var scopes = [];
    registerScope(scopes, primaryScope);
    registerScope(scopes, secondaryScope);
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function createFallbackLocalizationRuntimeSetup() {
    return {
      localizationRuntimeEnvironment: null,
      localizationBridge: null,
      localizationFallbacks: null,
      inlineLocalizationFallbacks: null,
      localizationFallbackSupport: null,
      createBasicLocalizationFallbackResolvers: function createBasicLocalizationFallbackResolvers() {
        return null;
      },
      localizationFallbackRegistry: {
        createFallbackResolvers: function createFallbackResolvers() {
          return null;
        }
      },
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks: function createLocaleFallbacks() {
        return null;
      }
    };
  }
  function ensureCreateLocalizationRuntimeSetup(options) {
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = options && options.requireFn;
    var runtimeScope = options && options.runtimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var tools = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule('cineCoreAppLocalizationRuntimeSetup', './modules/app-core/localization.js');
      } catch (localizationRuntimeSetupResolveError) {
        void localizationRuntimeSetupResolveError;
        tools = null;
      }
    }
    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        var required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          tools = required;
        }
      } catch (localizationRuntimeSetupRequireError) {
        void localizationRuntimeSetupRequireError;
      }
    }
    if (!isObject(tools)) {
      var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreAppLocalizationRuntimeSetup;
          if (isObject(candidate)) {
            tools = candidate;
            break;
          }
        } catch (localizationRuntimeSetupLookupError) {
          void localizationRuntimeSetupLookupError;
        }
      }
    }
    if (isObject(tools) && typeof tools.createLocalizationRuntimeSetup === 'function') {
      return tools.createLocalizationRuntimeSetup;
    }
    return null;
  }
  function ensureFunction(value, fallback) {
    if (typeof value === 'function') {
      return value;
    }
    return fallback;
  }
  function normalizeLocalizationRuntimeSetup(candidate) {
    var fallback = createFallbackLocalizationRuntimeSetup();
    var normalizedCandidate = isObject(candidate) ? candidate : {};
    var localizationRuntimeEnvironment = isObject(normalizedCandidate.localizationRuntimeEnvironment) ? normalizedCandidate.localizationRuntimeEnvironment : fallback.localizationRuntimeEnvironment;
    var localizationBridge = isObject(normalizedCandidate.localizationBridge) ? normalizedCandidate.localizationBridge : fallback.localizationBridge;
    var localizationFallbacks = isObject(normalizedCandidate.localizationFallbacks) ? normalizedCandidate.localizationFallbacks : fallback.localizationFallbacks;
    var inlineLocalizationFallbacks = isObject(normalizedCandidate.inlineLocalizationFallbacks) ? normalizedCandidate.inlineLocalizationFallbacks : fallback.inlineLocalizationFallbacks;
    var localizationFallbackSupport = Object.prototype.hasOwnProperty.call(normalizedCandidate, 'localizationFallbackSupport') ? normalizedCandidate.localizationFallbackSupport : fallback.localizationFallbackSupport;
    var createBasicLocalizationFallbackResolvers = ensureFunction(normalizedCandidate.createBasicLocalizationFallbackResolvers, fallback.createBasicLocalizationFallbackResolvers);
    var localizationFallbackRegistry = isObject(normalizedCandidate.localizationFallbackRegistry) ? normalizedCandidate.localizationFallbackRegistry : {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolvers(fallbackOptions);
      }
    };
    var localizationFallbackResolvers = normalizedCandidate.localizationFallbackResolvers;
    if (!localizationFallbackResolvers && localizationFallbackRegistry) {
      var createFallbackResolvers = ensureFunction(localizationFallbackRegistry.createFallbackResolvers, null);
      if (createFallbackResolvers) {
        try {
          localizationFallbackResolvers = createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          });
        } catch (createFallbackResolversError) {
          void createFallbackResolversError;
          localizationFallbackResolvers = null;
        }
      }
    }
    if (!localizationFallbackResolvers && typeof createBasicLocalizationFallbackResolvers === 'function') {
      try {
        localizationFallbackResolvers = createBasicLocalizationFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks
        });
      } catch (createBasicResolversError) {
        void createBasicResolversError;
        localizationFallbackResolvers = null;
      }
    }
    if (!localizationFallbackResolvers) {
      localizationFallbackResolvers = fallback.localizationFallbackResolvers;
    }
    var localizationFallbackNamespace = Object.prototype.hasOwnProperty.call(normalizedCandidate, 'localizationFallbackNamespace') ? normalizedCandidate.localizationFallbackNamespace : fallback.localizationFallbackNamespace;
    var fallbackResolveLocaleModule = ensureFunction(normalizedCandidate.fallbackResolveLocaleModule, fallback.fallbackResolveLocaleModule);
    var createLocaleFallbacks = ensureFunction(normalizedCandidate.createLocaleFallbacks, fallback.createLocaleFallbacks);
    return {
      localizationRuntimeEnvironment: localizationRuntimeEnvironment,
      localizationBridge: localizationBridge,
      localizationFallbacks: localizationFallbacks,
      inlineLocalizationFallbacks: inlineLocalizationFallbacks,
      localizationFallbackSupport: localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: localizationFallbackResolvers,
      localizationFallbackNamespace: localizationFallbackNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModule,
      createLocaleFallbacks: createLocaleFallbacks
    };
  }
  function resolveRuntimeLocalization(options) {
    var currentLocalization = options && options.currentLocalization;
    if (isObject(currentLocalization)) {
      return normalizeLocalizationRuntimeSetup(currentLocalization);
    }
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var createLocalizationRuntimeSetup = ensureCreateLocalizationRuntimeSetup({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    if (typeof createLocalizationRuntimeSetup === 'function') {
      try {
        var setup = createLocalizationRuntimeSetup({
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope
        });
        return normalizeLocalizationRuntimeSetup(setup);
      } catch (createLocalizationRuntimeSetupError) {
        void createLocalizationRuntimeSetupError;
      }
    }
    return createFallbackLocalizationRuntimeSetup();
  }
  var namespace = {
    resolveRuntimeLocalization: resolveRuntimeLocalization,
    createFallbackLocalizationRuntimeSetup: createFallbackLocalizationRuntimeSetup
  };
  var namespaceName = 'cineCoreAppRuntimeLocalization';
  var globalScope = detectScope();
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  for (var _i4 = 0, _Object$keys4 = Object.keys(namespace); _i4 < _Object$keys4.length; _i4++) {
    var key = _Object$keys4[_i4];
    existing[key] = namespace[key];
  }
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();