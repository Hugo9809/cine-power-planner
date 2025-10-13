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

  const state = {
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
    const scopes = [];

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

    const resolver = state.resolveCoreSupportModule;
    if (typeof resolver === 'function') {
      try {
        const resolved = resolver(
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

    const candidates = collectLocalizationFactoryScopes(primaryScope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];

      try {
        const namespaceCandidate =
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

    const resolver = state.resolveCoreSupportModule;
    if (typeof resolver === 'function') {
      try {
        const resolved = resolver(
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

    const scopeCandidates = collectLocalizationFactoryScopes(primaryScope);

    for (let index = 0; index < scopeCandidates.length; index += 1) {
      const candidateScope = scopeCandidates[index];

      try {
        const candidate =
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
        const required = state.requireFn(
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

    for (let retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
      const retryScope = scopeCandidates[retryIndex];

      try {
        const retryCandidate =
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
      const normalized = String(lang).trim().toLowerCase();
      return normalized || defaultLanguage;
    } catch (normalizeError) {
      void normalizeError;
    }

    return defaultLanguage;
  }

  function inlineResolveRtlCodes(config) {
    if (config && Array.isArray(config.rtlLanguageCodes)) {
      const codes = [];

      for (let index = 0; index < config.rtlLanguageCodes.length; index += 1) {
        const rawCode = config.rtlLanguageCodes[index];
        const normalized = inlineNormalizeLanguageCodeValue(
          String(rawCode || ''),
          ''
        );
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
    const config = baseOptions || {};
    const defaultLanguage = inlineNormalizeLanguageCodeValue(
      config.defaultLanguage,
      'en'
    );
    const rtlLanguageCodes = inlineResolveRtlCodes(config);

    function normalizeLanguageCode(lang) {
      return inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
    }

    function isRtlLanguage(lang) {
      const normalized = inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
      const base = normalized.split('-')[0];
      return rtlLanguageCodes.indexOf(base) !== -1;
    }

    function resolveDocumentDirection(lang) {
      if (typeof document !== 'undefined' && document && document.documentElement) {
        try {
          const docDir = document.documentElement.getAttribute('dir');
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
      getDefaultLanguage() {
        return defaultLanguage;
      },
      getRtlLanguageCodes() {
        return rtlLanguageCodes.slice();
      },
      resolveLocaleModule() {
        return null;
      },
      normalizeLanguageCode,
      isRtlLanguage,
      resolveDocumentDirection,
      applyLocaleMetadata,
    };
  }

  function inlineCreateBasicLocalizationFallbackResolvers(options) {
    const baseOptions = options || {};

    return {
      namespace: {
        fallbackResolveLocaleModule() {
          return null;
        },
        createLocaleFallbacks(fallbackOptions) {
          return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
        },
      },
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks(fallbackOptions) {
        return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
      },
    };
  }

  function inlineCreateLegacyLocalizationFallbackContext(options) {
    const resolvers = inlineCreateBasicLocalizationFallbackResolvers(options);
    const namespace =
      resolvers && resolvers.namespace && typeof resolvers.namespace === 'object'
        ? resolvers.namespace
        : {
            fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks() {
              return null;
            },
          };

    return {
      support: null,
      registry: {
        createFallbackResolvers(fallbackOptions) {
          return inlineCreateBasicLocalizationFallbackResolvers(
            fallbackOptions || options
          );
        },
      },
      resolvers,
      namespace,
      fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
      createLocaleFallbacks: namespace.createLocaleFallbacks,
    };
  }

  function createFallbackFactoryAccessor(methodName, inlineImplementation) {
    return function fallbackFactoryAccessor() {
      const args = arguments;
      const factories = ensureLocalizationFallbackFactories(args[0]);

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

  const namespace = {
    configure,
    collectLocalizationFactoryScopes,
    ensureLocalizationFallbackFactories,
    inlineResolveLocalizationFallbackContextNamespace,
    inlineCreateLocaleFallbackHelpers,
    inlineCreateBasicLocalizationFallbackResolvers,
    inlineCreateLegacyLocalizationFallbackContext,
    createFallbackFactoryAccessor,
  };

  const globalScope = detectGlobalScope();

  const targetName = 'cineCoreLocalizationFallbackInlineSupport';
  const existing = isObject(globalScope) && isObject(globalScope[targetName])
    ? globalScope[targetName]
    : {};

  for (const key of Object.keys(namespace)) {
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
