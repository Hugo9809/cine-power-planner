/* global CORE_GLOBAL_SCOPE */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function registerScope(scopes, scope) {
    if (!isObject(scope) || scopes.indexOf(scope) !== -1) {
      return;
    }

    scopes.push(scope);
  }

  function detectGlobalScope(primaryCandidate) {
    if (isObject(primaryCandidate)) {
      return primaryCandidate;
    }

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

  var state = {
    runtimeScope: null,
    coreGlobalScope: null,
    coreLocalizationFallbackFactories: null,
    localFactoryNamespace: null,
    resolveCoreSupportModule: null,
    requireFn: typeof require === 'function' ? require : null,
    localizationFallbackContextNamespace: null,
  };

  function configure(options) {
    if (!state.coreGlobalScope) {
      state.coreGlobalScope = detectGlobalScope(state.runtimeScope);
    }

    if (!options || typeof options !== 'object') {
      return;
    }

    if (isObject(options.runtimeScope)) {
      state.runtimeScope = options.runtimeScope;
    }

    if (isObject(options.coreGlobalScope)) {
      state.coreGlobalScope = options.coreGlobalScope;
    } else if (!state.coreGlobalScope) {
      state.coreGlobalScope = detectGlobalScope(options.runtimeScope);
    }

    if (isObject(options.coreLocalizationFallbackFactories)) {
      state.coreLocalizationFallbackFactories =
        options.coreLocalizationFallbackFactories;
      state.localFactoryNamespace = options.coreLocalizationFallbackFactories;
    }

    if (typeof options.resolveCoreSupportModule === 'function') {
      state.resolveCoreSupportModule = options.resolveCoreSupportModule;
    }

    if (typeof options.requireFn === 'function') {
      state.requireFn = options.requireFn;
    }
  }

  configure({});

  function collectLocalizationFactoryScopes(primaryScope) {
    var scopes = [];

    registerScope(scopes, primaryScope);
    registerScope(scopes, state.runtimeScope);
    registerScope(scopes, state.coreGlobalScope);

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

  function ensureLocalizationFallbackFactories(primaryScope) {
    if (isObject(state.localFactoryNamespace)) {
      return state.localFactoryNamespace;
    }

    if (isObject(state.coreLocalizationFallbackFactories)) {
      state.localFactoryNamespace = state.coreLocalizationFallbackFactories;
      return state.localFactoryNamespace;
    }

    var resolver = state.resolveCoreSupportModule;
    if (typeof resolver === 'function') {
      try {
        var resolved = resolver(
          'cineCoreLocalizationFallbackFactories',
          './modules/core/localization-fallback-factories.js',
          primaryScope || state.runtimeScope || state.coreGlobalScope
        );

        if (isObject(resolved)) {
          state.localFactoryNamespace = resolved;
          return state.localFactoryNamespace;
        }
      } catch (resolveError) {
        void resolveError;
      }
    }

    var candidates = collectLocalizationFactoryScopes(primaryScope);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];

      try {
        var namespaceCandidate =
          candidate && candidate.cineCoreLocalizationFallbackFactories;
        if (isObject(namespaceCandidate)) {
          state.localFactoryNamespace = namespaceCandidate;
          return state.localFactoryNamespace;
        }
      } catch (candidateError) {
        void candidateError;
      }
    }

    return state.localFactoryNamespace || null;
  }

  function inlineResolveLocalizationFallbackContextNamespace(primaryScope) {
    if (isObject(state.localizationFallbackContextNamespace)) {
      return state.localizationFallbackContextNamespace;
    }

    var resolver = state.resolveCoreSupportModule;
    if (typeof resolver === 'function') {
      try {
        var resolved = resolver(
          'cineCoreLocalizationFallbackContext',
          './modules/core/localization-fallback-context.js',
          primaryScope || state.runtimeScope || state.coreGlobalScope
        );

        if (isObject(resolved)) {
          state.localizationFallbackContextNamespace = resolved;
          return state.localizationFallbackContextNamespace;
        }
      } catch (resolveError) {
        void resolveError;
      }
    }

    var scopeCandidates = collectLocalizationFactoryScopes(primaryScope);

    for (var index = 0; index < scopeCandidates.length; index += 1) {
      var candidateScope = scopeCandidates[index];

      try {
        var candidate =
          candidateScope && candidateScope.cineCoreLocalizationFallbackContext;
        if (isObject(candidate)) {
          state.localizationFallbackContextNamespace = candidate;
          return state.localizationFallbackContextNamespace;
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    if (typeof state.requireFn === 'function') {
      try {
        var required = state.requireFn(
          './modules/core/localization-fallback-context.js'
        );
        if (isObject(required)) {
          state.localizationFallbackContextNamespace = required;
          return state.localizationFallbackContextNamespace;
        }
      } catch (fallbackRequireError) {
        void fallbackRequireError;
      }
    }

    for (var retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
      var retryScope = scopeCandidates[retryIndex];

      try {
        var retryCandidate =
          retryScope && retryScope.cineCoreLocalizationFallbackContext;
        if (isObject(retryCandidate)) {
          state.localizationFallbackContextNamespace = retryCandidate;
          return state.localizationFallbackContextNamespace;
        }
      } catch (retryError) {
        void retryError;
      }
    }

    return state.localizationFallbackContextNamespace || null;
  }

  function inlineNormalizeLanguageCodeValue(lang, defaultLanguage) {
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

  function inlineResolveRtlCodes(config) {
    if (config && Array.isArray(config.rtlLanguageCodes)) {
      var codes = [];

      for (var index = 0; index < config.rtlLanguageCodes.length; index += 1) {
        var rawCode = config.rtlLanguageCodes[index];
        var normalized = inlineNormalizeLanguageCodeValue(String(rawCode || ''), '');
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

  function inlineCreateLocaleFallbackHelpers(baseOptions) {
    var config = baseOptions || {};
    var defaultLanguage = inlineNormalizeLanguageCodeValue(
      config.defaultLanguage,
      'en'
    );
    var rtlLanguageCodes = inlineResolveRtlCodes(config);

    function normalizeLanguageCode(lang) {
      return inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
    }

    function isRtlLanguage(lang) {
      var normalized = inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
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
      applyLocaleMetadata: applyLocaleMetadata,
    };
  }

  function inlineCreateBasicLocalizationFallbackResolvers(options) {
    var baseOptions = options || {};

    return {
      namespace: {
        fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
          return null;
        },
        createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
          return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
        },
      },
      fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
        return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
      },
    };
  }

  function inlineCreateLegacyLocalizationFallbackContext(options) {
    var resolvers = inlineCreateBasicLocalizationFallbackResolvers(options);
    var namespace =
      resolvers && resolvers.namespace && typeof resolvers.namespace === 'object'
        ? resolvers.namespace
        : {
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks() {
              return null;
            },
          };

    return {
      support: null,
      registry: {
        createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
          return inlineCreateBasicLocalizationFallbackResolvers(
            fallbackOptions || options
          );
        },
      },
      resolvers: resolvers,
      namespace: namespace,
      fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
      createLocaleFallbacks: namespace.createLocaleFallbacks,
    };
  }

  function createFallbackFactoryAccessor(methodName, inlineImplementation) {
    return function fallbackFactoryAccessor() {
      var args = arguments;
      var factories = ensureLocalizationFallbackFactories(args[0]);

      if (factories && typeof factories[methodName] === 'function') {
        try {
          return factories[methodName].apply(factories, args);
        } catch (factoryInvokeError) {
          void factoryInvokeError;
        }
      }

      try {
        return inlineImplementation.apply(null, args);
      } catch (inlineInvokeError) {
        void inlineInvokeError;
      }

      return null;
    };
  }

  var namespace = {
    configure: configure,
    collectLocalizationFactoryScopes: collectLocalizationFactoryScopes,
    ensureLocalizationFallbackFactories: ensureLocalizationFallbackFactories,
    inlineResolveLocalizationFallbackContextNamespace:
      inlineResolveLocalizationFallbackContextNamespace,
    inlineCreateLocaleFallbackHelpers: inlineCreateLocaleFallbackHelpers,
    inlineCreateBasicLocalizationFallbackResolvers:
      inlineCreateBasicLocalizationFallbackResolvers,
    inlineCreateLegacyLocalizationFallbackContext:
      inlineCreateLegacyLocalizationFallbackContext,
    createFallbackFactoryAccessor: createFallbackFactoryAccessor,
  };

  var globalScope = detectGlobalScope();

  var targetName = 'cineCoreLocalizationFallbackInlineSupport';
  var existing =
    isObject(globalScope) && isObject(globalScope[targetName])
      ? globalScope[targetName]
      : {};

  var namespaceKeys = Object.keys(namespace);
  for (var keyIndex = 0; keyIndex < namespaceKeys.length; keyIndex += 1) {
    var key = namespaceKeys[keyIndex];
    existing[key] = namespace[key];
  }

  if (isObject(globalScope)) {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
