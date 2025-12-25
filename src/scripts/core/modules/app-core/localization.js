/*
 * Aggregates the modern app core localisation helpers into a single module.
 *
 * The refactor previously split the legacy app-core localisation section into
 * several files so the massive diff stayed readable. We are now consolidating
 * those helpers again so that the refactor can continue in smaller, coherent
 * chunks. Keeping the logic together ensures the translation bridge, runtime
 * fallbacks and offline safeguards remain perfectly aligned. This file simply
 * concatenates the previous modules verbatim so behaviour stays identical while
 * reducing the number of moving parts we need to keep in sync.
 */
/*
 * Centralises the localisation bootstrap logic used by the modern runtime.
 *
 * The previous monolithic app core contained a large block of setup code that
 * resolved the localisation runtime environment, fallbacks and helper
 * factories. As part of the ongoing refactor we expose that logic as a
 * dedicated helper module so the main runtime file can stay leaner while the
 * behaviour remains identical.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const globalScope = detectGlobalScope(runtimeScope);

    if (
      isObject(globalScope) &&
      typeof globalScope.resolveCoreSupportModule === 'function'
    ) {
      try {
        return globalScope.resolveCoreSupportModule.bind(globalScope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      isObject(globalScope) &&
      globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        .resolveCoreSupportModule === 'function'
    ) {
      try {
        return globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
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
          const required = requireFn(requirePath);
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
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const localizationRuntimeEnvironmentTools = resolveCoreSupportModule(
      'cineCoreLocalizationRuntimeEnvironment',
      '../core/localization-runtime-environment.js'
    );

    const localizationRuntimeEnvironment =
      localizationRuntimeEnvironmentTools &&
      typeof localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment ===
        'function'
        ? localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment({
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
          })
        : null;

    const localizationBridge =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreLocalizationBridge)
        ? localizationRuntimeEnvironment.coreLocalizationBridge
        : null;

    const localizationFallbacks =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreLocalizationFallbacks)
        ? localizationRuntimeEnvironment.coreLocalizationFallbacks
        : null;

    const inlineLocalizationFallbacks =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreInlineLocalizationFallbacks)
        ? localizationRuntimeEnvironment.coreInlineLocalizationFallbacks
        : null;

    const localizationFallbackSupport =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.localizationFallbackSupport !== 'undefined'
        ? localizationRuntimeEnvironment.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers ===
        'function'
        ? localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.localizationFallbackRegistry)
        ? localizationRuntimeEnvironment.localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          };

    const localizationFallbackResolvers =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.localizationFallbackResolvers)
        ? localizationRuntimeEnvironment.localizationFallbackResolvers
        : localizationFallbackRegistry &&
          typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
        ? localizationFallbackRegistry.createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          })
        : createBasicLocalizationFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          });

    const localizationFallbackNamespace =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.localizationFallbackNamespace !== 'undefined'
        ? localizationRuntimeEnvironment.localizationFallbackNamespace
        : null;

    const fallbackResolveLocaleModule =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.fallbackResolveLocaleModule === 'function'
        ? localizationRuntimeEnvironment.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.createLocaleFallbacks === 'function'
        ? localizationRuntimeEnvironment.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
      localizationRuntimeEnvironment,
      localizationBridge,
      localizationFallbacks,
      inlineLocalizationFallbacks,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry,
      localizationFallbackResolvers,
      localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  const namespace = {
    createAppLocalizationSupport,
  };

  const globalScope = detectGlobalScope();
  const namespaceName = 'cineCoreAppLocalizationSupport';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Centralises the localisation bootstrap wiring for the modern runtime. The
 * original app-core file contained an enormous sequence of guards and
 * fallbacks; this module now owns that logic so the core orchestrator can stay
 * readable while we continue the multi-step refactor. The resolver keeps every
 * existing safeguard intact so localisation continues to function offline and
 * during backup restores.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const scope = ensureScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
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
          const required = requireFn(requirePath);
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
    const scopes = Array.isArray(candidateScopes) ? candidateScopes.slice() : [];
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

    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreAppLocalizationSupport',
          './modules/app-core/localization.js'
        );
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
      }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          return required;
        }
      } catch (localizationSupportRequireError) {
        void localizationSupportRequireError;
      }
    }

    const fallbackScopes = ensureFallbackScopes(
      options && options.fallbackScopes,
      options && options.runtimeScope,
      options && options.coreGlobalScope
    );

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationSupport;
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
    const supportTools = resolveLocalizationSupportTools(options);

    if (
      supportTools &&
      typeof supportTools.createAppLocalizationSupport === 'function'
    ) {
      try {
        return supportTools.createAppLocalizationSupport({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn: options && options.requireFn,
          runtimeScope: options && options.runtimeScope,
          coreGlobalScope: options && options.coreGlobalScope,
        });
      } catch (localizationSupportError) {
        void localizationSupportError;
      }
    }

    return null;
  }

  function createLocalizationBootstrapResult(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const fallbackScopes = ensureFallbackScopes(
      options && options.fallbackScopes,
      runtimeScope,
      coreGlobalScope
    );

    const localizationSupport = createLocalizationSupport({
      localizationSupportTools: options && options.localizationSupportTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    const localizationRuntimeEnvironment =
      localizationSupport && localizationSupport.localizationRuntimeEnvironment
        ? localizationSupport.localizationRuntimeEnvironment
        : null;

    const localizationBridge =
      localizationSupport && localizationSupport.localizationBridge
        ? localizationSupport.localizationBridge
        : null;

    const localizationFallbacks =
      localizationSupport && localizationSupport.localizationFallbacks
        ? localizationSupport.localizationFallbacks
        : null;

    const inlineLocalizationFallbacks =
      localizationSupport && localizationSupport.inlineLocalizationFallbacks
        ? localizationSupport.inlineLocalizationFallbacks
        : null;

    const localizationFallbackSupport =
      localizationSupport &&
      typeof localizationSupport.localizationFallbackSupport !== 'undefined'
        ? localizationSupport.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      localizationSupport &&
      typeof localizationSupport.createBasicLocalizationFallbackResolvers === 'function'
        ? localizationSupport.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry =
      localizationSupport && localizationSupport.localizationFallbackRegistry
        ? localizationSupport.localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          };

    const localizationFallbackResolvers =
      localizationSupport && localizationSupport.localizationFallbackResolvers
        ? localizationSupport.localizationFallbackResolvers
        : localizationFallbackRegistry &&
            typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
          ? localizationFallbackRegistry.createFallbackResolvers({
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
            })
          : createBasicLocalizationFallbackResolvers({
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
            });

    const localizationFallbackNamespace =
      localizationSupport &&
      typeof localizationSupport.localizationFallbackNamespace !== 'undefined'
        ? localizationSupport.localizationFallbackNamespace
        : null;

    const fallbackResolveLocaleModule =
      localizationSupport &&
      typeof localizationSupport.fallbackResolveLocaleModule === 'function'
        ? localizationSupport.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      localizationSupport &&
      typeof localizationSupport.createLocaleFallbacks === 'function'
        ? localizationSupport.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
      localizationSupport,
      localizationRuntimeEnvironment,
      localizationBridge,
      localizationFallbacks,
      inlineLocalizationFallbacks,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry,
      localizationFallbackResolvers,
      localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  function createLocalizationBootstrapWiring(options) {
    const bootstrapResult =
      options && isObject(options.localizationBootstrapResult)
        ? options.localizationBootstrapResult
        : null;

    const localizationSupport =
      bootstrapResult && isObject(bootstrapResult.localizationSupport)
        ? bootstrapResult.localizationSupport
        : null;

    const localizationRuntimeEnvironment =
      bootstrapResult && isObject(bootstrapResult.localizationRuntimeEnvironment)
        ? bootstrapResult.localizationRuntimeEnvironment
        : null;

    const localizationBridge =
      bootstrapResult && isObject(bootstrapResult.localizationBridge)
        ? bootstrapResult.localizationBridge
        : null;

    const localizationFallbacks =
      bootstrapResult && isObject(bootstrapResult.localizationFallbacks)
        ? bootstrapResult.localizationFallbacks
        : null;

    const inlineLocalizationFallbacks =
      bootstrapResult && isObject(bootstrapResult.inlineLocalizationFallbacks)
        ? bootstrapResult.inlineLocalizationFallbacks
        : null;

    const localizationFallbackSupport =
      bootstrapResult &&
      typeof bootstrapResult.localizationFallbackSupport !== 'undefined'
        ? bootstrapResult.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      bootstrapResult &&
      typeof bootstrapResult.createBasicLocalizationFallbackResolvers === 'function'
        ? bootstrapResult.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry =
      bootstrapResult && isObject(bootstrapResult.localizationFallbackRegistry)
        ? bootstrapResult.localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          };

    const localizationFallbackResolvers =
      bootstrapResult && isObject(bootstrapResult.localizationFallbackResolvers)
        ? bootstrapResult.localizationFallbackResolvers
        : localizationFallbackRegistry &&
            typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
          ? localizationFallbackRegistry.createFallbackResolvers({
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
            })
          : createBasicLocalizationFallbackResolvers({
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
            });

    const localizationFallbackNamespace =
      bootstrapResult &&
      typeof bootstrapResult.localizationFallbackNamespace !== 'undefined'
        ? bootstrapResult.localizationFallbackNamespace
        : null;

    const fallbackResolveLocaleModule =
      bootstrapResult &&
      typeof bootstrapResult.fallbackResolveLocaleModule === 'function'
        ? bootstrapResult.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      bootstrapResult && typeof bootstrapResult.createLocaleFallbacks === 'function'
        ? bootstrapResult.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
      localizationBootstrapResult: bootstrapResult,
      localizationSupport,
      localizationRuntimeEnvironment,
      localizationBridge,
      localizationFallbacks,
      inlineLocalizationFallbacks,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry,
      localizationFallbackResolvers,
      localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  const namespace = {
    createLocalizationBootstrapResult,
    createLocalizationBootstrapWiring,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppLocalizationBootstrap';
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.assign(existing, namespace);

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Provides localisation helper accessors for the modern Cine Power Planner runtime.
 *
 * The logic used to live directly in the monolithic app core file. Extracting it
 * into this dedicated helper keeps the orchestration lean while preserving every
 * fallback that protects offline usage, localisation data and translation safety.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

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
      for (let index = 0; index < additionalScopes.length; index += 1) {
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
    const fallbackLang =
      typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';

    return function fallbackNormalizeLanguageCodeProxy(lang) {
      if (!lang) {
        return fallbackLang;
      }

      try {
        const normalized = String(lang).trim().toLowerCase();
        return normalized || fallbackLang;
      } catch (languageNormalizeError) {
        void languageNormalizeError;
      }

      return fallbackLang;
    };
  }

  function fallbackIsRtlLanguageFactory(rtlLanguageCodes, normalizeLanguageCode) {
    const rtlCodes =
      Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length
        ? rtlLanguageCodes
        : ['ar', 'fa', 'he', 'ur'];

    return function fallbackIsRtlLanguageProxy(lang) {
      const normalized = normalizeLanguageCode(lang);
      const base = normalized.split('-')[0];
      return rtlCodes.indexOf(base) !== -1;
    };
  }

  function fallbackResolveDocumentDirectionFactory(normalizeLanguageCode, isRtlLanguage) {
    return function fallbackResolveDocumentDirectionProxy(lang) {
      if (typeof document !== 'undefined' && document && document.documentElement) {
        try {
          const docDir = document.documentElement.getAttribute('dir');
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

  function fallbackResolveTranslationDatasetFactory(
    fallbackScopes,
    requireFn,
    translationsRequirePath
  ) {
    return function fallbackResolveTranslationDataset() {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }

        const dataset = scope.texts;
        if (isObject(dataset)) {
          return dataset;
        }
      }

      if (typeof requireFn === 'function') {
        try {
          const translationsModule = requireFn(translationsRequirePath);
          if (
            isObject(translationsModule) &&
            isObject(translationsModule.texts)
          ) {
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
    const fallbackLang =
      typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';

    return function fallbackGetLanguageTextsProxy(lang) {
      const dataset = datasetResolver();

      let normalized = null;
      if (typeof lang === 'string' && lang) {
        try {
          normalized = String(lang).trim().toLowerCase();
        } catch (normalizeError) {
          void normalizeError;
          normalized = null;
        }
      }

      let resolved =
        normalized && Object.prototype.hasOwnProperty.call(dataset, normalized)
          ? normalized
          : '';

      if (!resolved && normalized) {
        const base = normalized.split('-')[0];
        if (base && Object.prototype.hasOwnProperty.call(dataset, base)) {
          resolved = base;
        }
      }

      if (!resolved) {
        resolved = fallbackLang;
      }

      const candidate =
        dataset && resolved && isObject(dataset[resolved]) ? dataset[resolved] : null;
      if (candidate) {
        return candidate;
      }

      if (resolved !== fallbackLang) {
        const fallbackCandidate =
          dataset && isObject(dataset[fallbackLang]) ? dataset[fallbackLang] : null;
        if (fallbackCandidate) {
          return fallbackCandidate;
        }
      }

      if (dataset && isObject(dataset.en)) {
        return dataset.en;
      }

      const languages = dataset ? Object.keys(dataset) : [];
      if (languages.length) {
        const firstLang = languages[0];
        const firstTexts = dataset[firstLang];
        if (isObject(firstTexts)) {
          return firstTexts;
        }
      }

      return {};
    };
  }

  function createEnsureGlobalGetLanguageTextsAvailability(runtime, fallbackScopes) {
    return function ensureGlobalGetLanguageTextsAvailability(getLanguageTextsFn) {
      if (
        runtime &&
        typeof runtime.ensureGlobalGetLanguageTextsAvailability === 'function'
      ) {
        try {
          runtime.ensureGlobalGetLanguageTextsAvailability();
          return;
        } catch (ensureError) {
          void ensureError;
        }
      }

      const assignableFunction =
        typeof getLanguageTextsFn === 'function'
          ? getLanguageTextsFn
          : function defaultGetLanguageTexts() {
              return {};
            };

      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];
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
    const runtime = isObject(options && options.coreLocalizationRuntime)
      ? options.coreLocalizationRuntime
      : null;
    const localizationBridge = isObject(options && options.coreLocalizationBridge)
      ? options.coreLocalizationBridge
      : null;
    const runtimeScope = options && options.corePartRuntimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;
    const additionalScopes = options && options.additionalLocalizationScopes;
    const fallbackResolveLocaleModule =
      options && typeof options.fallbackResolveLocaleModule === 'function'
        ? options.fallbackResolveLocaleModule
        : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const translationsRequirePath =
      options && typeof options.translationsRequirePath === 'string' && options.translationsRequirePath
        ? options.translationsRequirePath
        : './translations.js';

    const fallbackScopes = collectFallbackScopes(
      runtimeScope,
      coreGlobalScope,
      additionalScopes
    );

    const localeModule =
      (runtime && runtime.localeModule) ||
      (fallbackResolveLocaleModule ? fallbackResolveLocaleModule(runtimeScope) : null);

    const defaultLanguage =
      (runtime && runtime.defaultLanguage) ||
      (localeModule && typeof localeModule.DEFAULT_LANGUAGE === 'string'
        ? localeModule.DEFAULT_LANGUAGE
        : 'en');

    const rtlLanguageCodes =
      (runtime && runtime.rtlLanguageCodes) ||
      (localeModule &&
      Array.isArray(localeModule.RTL_LANGUAGE_CODES) &&
      localeModule.RTL_LANGUAGE_CODES.length > 0
        ? localeModule.RTL_LANGUAGE_CODES
        : ['ar', 'fa', 'he', 'ur']);

    const fallbackNormalizeLanguageCode = fallbackNormalizeLanguageCodeFactory(
      defaultLanguage
    );

    const normalizeLanguageCode = runtime &&
      typeof runtime.normalizeLanguageCode === 'function'
        ? function runtimeNormalizeLanguageCode(lang) {
            try {
              return runtime.normalizeLanguageCode(lang);
            } catch (runtimeNormalizeError) {
              void runtimeNormalizeError;
            }

            return fallbackNormalizeLanguageCode(lang);
          }
        : localizationBridge &&
          typeof localizationBridge.normalizeLanguageCode === 'function'
        ? function bridgeNormalizeLanguageCode(lang) {
            try {
              return localizationBridge.normalizeLanguageCode(lang, runtimeScope);
            } catch (bridgeNormalizeError) {
              void bridgeNormalizeError;
            }

            return fallbackNormalizeLanguageCode(lang);
          }
        : fallbackNormalizeLanguageCode;

    const fallbackIsRtlLanguage = fallbackIsRtlLanguageFactory(
      rtlLanguageCodes,
      normalizeLanguageCode
    );

    const isRtlLanguage = runtime && typeof runtime.isRtlLanguage === 'function'
      ? function runtimeIsRtlLanguage(lang) {
          try {
            return runtime.isRtlLanguage(lang);
          } catch (runtimeIsRtlError) {
            void runtimeIsRtlError;
          }

          return fallbackIsRtlLanguage(lang);
        }
      : localizationBridge && typeof localizationBridge.isRtlLanguage === 'function'
      ? function bridgeIsRtlLanguage(lang) {
          try {
            return localizationBridge.isRtlLanguage(lang, runtimeScope);
          } catch (bridgeIsRtlError) {
            void bridgeIsRtlError;
          }

          return fallbackIsRtlLanguage(lang);
        }
      : fallbackIsRtlLanguage;

    const fallbackResolveDocumentDirection =
      fallbackResolveDocumentDirectionFactory(normalizeLanguageCode, isRtlLanguage);

    const resolveDocumentDirection = runtime &&
      typeof runtime.resolveDocumentDirection === 'function'
        ? function runtimeResolveDocumentDirection(lang) {
            try {
              return runtime.resolveDocumentDirection(lang);
            } catch (runtimeResolveDirectionError) {
              void runtimeResolveDirectionError;
            }

            return fallbackResolveDocumentDirection(lang);
          }
        : localizationBridge &&
          typeof localizationBridge.resolveDocumentDirection === 'function'
        ? function bridgeResolveDocumentDirection(lang) {
            try {
              return localizationBridge.resolveDocumentDirection(
                lang,
                runtimeScope
              );
            } catch (bridgeResolveDirectionError) {
              void bridgeResolveDirectionError;
            }

            return fallbackResolveDocumentDirection(lang);
          }
        : fallbackResolveDocumentDirection;

    const applyLocaleMetadata = runtime &&
      typeof runtime.applyLocaleMetadata === 'function'
        ? function runtimeApplyLocaleMetadata(target, lang, direction) {
            try {
              return runtime.applyLocaleMetadata(target, lang, direction);
            } catch (runtimeApplyLocaleError) {
              void runtimeApplyLocaleError;
            }

            return fallbackApplyLocaleMetadataProxy(target, lang, direction);
          }
        : localizationBridge &&
          typeof localizationBridge.applyLocaleMetadata === 'function'
        ? function bridgeApplyLocaleMetadata(target, lang, direction) {
            try {
              return localizationBridge.applyLocaleMetadata(
                target,
                lang,
                direction,
                runtimeScope
              );
            } catch (bridgeApplyLocaleError) {
              void bridgeApplyLocaleError;
            }

            return fallbackApplyLocaleMetadataProxy(target, lang, direction);
          }
        : fallbackApplyLocaleMetadataProxy;

    const datasetResolver = fallbackResolveTranslationDatasetFactory(
      fallbackScopes,
      requireFn,
      translationsRequirePath
    );

    const fallbackGetLanguageTexts = fallbackGetLanguageTextsFactory(
      datasetResolver,
      defaultLanguage
    );

    const getLanguageTexts = runtime && typeof runtime.getLanguageTexts === 'function'
      ? function runtimeGetLanguageTexts(lang) {
          try {
            return runtime.getLanguageTexts(lang);
          } catch (runtimeGetLanguageTextsError) {
            void runtimeGetLanguageTextsError;
          }

          return fallbackGetLanguageTexts(lang);
        }
      : fallbackGetLanguageTexts;

    const ensureGlobalGetLanguageTextsAvailability =
      createEnsureGlobalGetLanguageTextsAvailability(runtime, fallbackScopes);

    return {
      localeModule: isObject(localeModule) ? localeModule : null,
      defaultLanguage:
        typeof defaultLanguage === 'string' && defaultLanguage
          ? defaultLanguage
          : 'en',
      rtlLanguageCodes:
        Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length
          ? rtlLanguageCodes
          : ['ar', 'fa', 'he', 'ur'],
      normalizeLanguageCode,
      isRtlLanguage,
      resolveDocumentDirection,
      applyLocaleMetadata,
      getLanguageTexts,
      ensureGlobalGetLanguageTextsAvailability,
      fallbackResolveTranslationDataset: datasetResolver,
    };
  }

  const namespace = {
    createLocalizationAccessors,
  };

  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  const namespaceName = 'cineCoreAppLocalizationAccessors';
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.assign(existing, namespace);

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Exposes a bridge that bundles all localisation helpers required by the app
 * core runtime. The logic originally lived directly inside the modern runtime
 * bundle. Moving it into this helper keeps the runtime leaner while preserving
 * the fault tolerant behaviour that protects user data, offline flows and the
 * translation system.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const scope = detectScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
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
          const required = requireFn(requirePath);
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
    const scopes = [];

    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }

    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }

    const additionalScopes = [
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < additionalScopes.length; index += 1) {
      const scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    return scopes;
  }

  function resolveLocalizationSupportTools(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppLocalizationSupport',
          '../app-core/localization.js'
        );
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
        tools = null;
      }
    }

    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        const requiredLocalizationSupport = requireFn('../app-core/localization.js');
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

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationSupport;
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

    const localizationFallbackRegistry = {
      createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolversProxy(fallbackOptions);
      },
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
      localizationFallbackRegistry,
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy,
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
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const localizationSupportTools = resolveLocalizationSupportTools({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    const localizationBridge = callCreateAppLocalizationSupport(localizationSupportTools, {
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    if (isObject(localizationBridge)) {
      return localizationBridge;
    }

    return createFallbackLocalizationBridge();
  }

  const namespace = {
    createLocalizationRuntimeBridge,
  };

  const namespaceName = 'cineCoreAppLocalizationRuntimeBridge';
  const globalScope = detectScope();
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Provides a high level factory that resolves the localisation runtime bridge
 * used by the modern app core bundle. The logic previously lived directly
 * inside app-core-new-1.js and was responsible for carefully falling back to
 * offline friendly defaults whenever the helper modules are unavailable. This
 * module keeps that behaviour intact while letting the runtime file focus on
 * orchestration.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const scope = detectScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
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
          const required = requireFn(requirePath);
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
    const scopes = [];

    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }

    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }

    const additionalScopes = [
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < additionalScopes.length; index += 1) {
      const scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    return scopes;
  }

  function resolveLocalizationRuntimeBridgeTools(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppLocalizationRuntimeBridge',
          './modules/app-core/localization.js'
        );
      } catch (localizationBridgeResolveError) {
        void localizationBridgeResolveError;
        tools = null;
      }
    }

    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization.js');
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

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationRuntimeBridge;
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

    const localizationFallbackRegistry = {
      createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolversProxy(fallbackOptions);
      },
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
      localizationFallbackRegistry,
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy,
    };
  }

  function ensureBridgeFactory(options) {
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    const tools = resolveLocalizationRuntimeBridgeTools(options);

    if (isObject(tools) && typeof tools.createLocalizationRuntimeBridge === 'function') {
      return tools.createLocalizationRuntimeBridge;
    }

    if (typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization.js');
        if (
          isObject(required) &&
          typeof required.createLocalizationRuntimeBridge === 'function'
        ) {
          return required.createLocalizationRuntimeBridge;
        }
      } catch (localizationBridgeRequireError) {
        void localizationBridgeRequireError;
      }
    }

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationRuntimeBridge;
        if (
          isObject(candidate) &&
          typeof candidate.createLocalizationRuntimeBridge === 'function'
        ) {
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
    const resolvedBridge = isObject(bridge) ? bridge : createFallbackLocalizationBridge();

    const localizationRuntimeEnvironment = isObject(
      resolvedBridge.localizationRuntimeEnvironment
    )
      ? resolvedBridge.localizationRuntimeEnvironment
      : null;

    const localizationBridge = isObject(resolvedBridge.localizationBridge)
      ? resolvedBridge.localizationBridge
      : null;

    const localizationFallbacks = isObject(resolvedBridge.localizationFallbacks)
      ? resolvedBridge.localizationFallbacks
      : null;

    const inlineLocalizationFallbacks = isObject(
      resolvedBridge.inlineLocalizationFallbacks
    )
      ? resolvedBridge.inlineLocalizationFallbacks
      : null;

    const localizationFallbackSupport =
      typeof resolvedBridge.localizationFallbackSupport !== 'undefined'
        ? resolvedBridge.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      typeof resolvedBridge.createBasicLocalizationFallbackResolvers === 'function'
        ? resolvedBridge.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry = isObject(
      resolvedBridge.localizationFallbackRegistry
    )
      ? resolvedBridge.localizationFallbackRegistry
      : {
          createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

    const fallbackResolveLocaleModule =
      typeof resolvedBridge.fallbackResolveLocaleModule === 'function'
        ? resolvedBridge.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      typeof resolvedBridge.createLocaleFallbacks === 'function'
        ? resolvedBridge.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    const localizationFallbackNamespace =
      typeof resolvedBridge.localizationFallbackNamespace !== 'undefined'
        ? resolvedBridge.localizationFallbackNamespace
        : null;

    const localizationFallbackResolvers = resolvedBridge.localizationFallbackResolvers
      ? resolvedBridge.localizationFallbackResolvers
      : localizationFallbackRegistry &&
        typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
      ? localizationFallbackRegistry.createFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        })
      : createBasicLocalizationFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        });

    return {
      localizationRuntimeEnvironment,
      localizationBridge,
      localizationFallbacks,
      inlineLocalizationFallbacks,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry,
      localizationFallbackResolvers,
      localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  function createLocalizationRuntimeSetup(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const createLocalizationRuntimeBridge = ensureBridgeFactory({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    const localizationRuntimeBridge = createLocalizationRuntimeBridge({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    return normalizeLocalizationRuntimeBridge(localizationRuntimeBridge);
  }

  const namespace = {
    createLocalizationRuntimeSetup,
  };

  const namespaceName = 'cineCoreAppLocalizationRuntimeSetup';
  const globalScope = detectScope();
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Resolves the localisation runtime helpers for the modern app core.
 * Moving this heavy bootstrap logic into a standalone module keeps the
 * primary runtime bundle smaller while the refactor progresses.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const scope = ensureScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
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
          const required = requireFn(requirePath);
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
    const scopes = [];
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
      createBasicLocalizationFallbackResolvers() {
        return null;
      },
      localizationFallbackRegistry: {
        createFallbackResolvers() {
          return null;
        },
      },
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks() {
        return null;
      },
    };
  }

  function createLocalizationModuleLoader(requireFn) {
    let attempted = false;
    let cachedModule = null;

    return function loadLocalizationModule() {
      if (attempted) {
        return cachedModule;
      }

      attempted = true;

      if (typeof requireFn !== 'function') {
        return cachedModule;
      }

      try {
        const required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          cachedModule = required;
        }
      } catch (localizationRequireError) {
        void localizationRequireError;
      }

      return cachedModule;
    };
  }

  function resolveRuntimeLocalizationTools(
    resolveCoreSupportModule,
    candidateScopes,
    loadLocalizationModule
  ) {
    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppRuntimeLocalization',
          './modules/app-core/localization.js'
        );
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

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppRuntimeLocalization;
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

    const required = loadLocalizationModule();
    if (isObject(required) && typeof required[methodName] === 'function') {
      return required[methodName];
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppRuntimeLocalization;
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
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const candidateScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    const loadLocalizationModule = createLocalizationModuleLoader(requireFn);
    const runtimeLocalizationTools = resolveRuntimeLocalizationTools(
      resolveCoreSupportModule,
      candidateScopes,
      loadLocalizationModule
    );

    const resolveRuntimeLocalization = resolveLocalizationMethod(
      'resolveRuntimeLocalization',
      runtimeLocalizationTools,
      candidateScopes,
      loadLocalizationModule
    );

    const createFallbackLocalizationRuntimeSetup =
      resolveLocalizationMethod(
        'createFallbackLocalizationRuntimeSetup',
        runtimeLocalizationTools,
        candidateScopes,
        loadLocalizationModule
      ) || createInlineFallbackLocalizationRuntimeSetup;

    const setup =
      (typeof resolveRuntimeLocalization === 'function'
        ? resolveRuntimeLocalization({
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
          })
        : null) ||
      (typeof createFallbackLocalizationRuntimeSetup === 'function'
        ? createFallbackLocalizationRuntimeSetup()
        : createInlineFallbackLocalizationRuntimeSetup());

    return setup || createInlineFallbackLocalizationRuntimeSetup();
  }

  const namespace = {
    resolveLocalizationRuntimeSetup,
    createInlineFallbackLocalizationRuntimeSetup,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeLocalizationResolver';
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.assign(existing, namespace);

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Centralises the logic that resolves the localisation runtime used by the
 * modern Cine Power Planner bundle. The orchestration file previously contained
 * the helper discovery logic directly; moving it here keeps the core runtime
 * lean while preserving all offline-first fallbacks.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const scope = detectScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
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
          const required = requireFn(requirePath);
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
    const scopes = [];
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
      createBasicLocalizationFallbackResolvers() {
        return null;
      },
      localizationFallbackRegistry: {
        createFallbackResolvers() {
          return null;
        },
      },
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks() {
        return null;
      },
    };
  }

  function ensureCreateLocalizationRuntimeSetup(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppLocalizationRuntimeSetup',
          './modules/app-core/localization.js'
        );
      } catch (localizationRuntimeSetupResolveError) {
        void localizationRuntimeSetupResolveError;
        tools = null;
      }
    }

    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization.js');
        if (isObject(required)) {
          tools = required;
        }
      } catch (localizationRuntimeSetupRequireError) {
        void localizationRuntimeSetupRequireError;
      }
    }

    if (!isObject(tools)) {
      const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreAppLocalizationRuntimeSetup;
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
    const fallback = createFallbackLocalizationRuntimeSetup();
    const normalizedCandidate = isObject(candidate) ? candidate : {};

    const localizationRuntimeEnvironment = isObject(
      normalizedCandidate.localizationRuntimeEnvironment
    )
      ? normalizedCandidate.localizationRuntimeEnvironment
      : fallback.localizationRuntimeEnvironment;

    const localizationBridge = isObject(normalizedCandidate.localizationBridge)
      ? normalizedCandidate.localizationBridge
      : fallback.localizationBridge;

    const localizationFallbacks = isObject(normalizedCandidate.localizationFallbacks)
      ? normalizedCandidate.localizationFallbacks
      : fallback.localizationFallbacks;

    const inlineLocalizationFallbacks = isObject(
      normalizedCandidate.inlineLocalizationFallbacks
    )
      ? normalizedCandidate.inlineLocalizationFallbacks
      : fallback.inlineLocalizationFallbacks;

    const localizationFallbackSupport = Object.prototype.hasOwnProperty.call(
      normalizedCandidate,
      'localizationFallbackSupport'
    )
      ? normalizedCandidate.localizationFallbackSupport
      : fallback.localizationFallbackSupport;

    const createBasicLocalizationFallbackResolvers = ensureFunction(
      normalizedCandidate.createBasicLocalizationFallbackResolvers,
      fallback.createBasicLocalizationFallbackResolvers
    );

    const localizationFallbackRegistry = isObject(
      normalizedCandidate.localizationFallbackRegistry
    )
      ? normalizedCandidate.localizationFallbackRegistry
      : {
          createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

    let localizationFallbackResolvers = normalizedCandidate.localizationFallbackResolvers;

    if (!localizationFallbackResolvers && localizationFallbackRegistry) {
      const createFallbackResolvers = ensureFunction(
        localizationFallbackRegistry.createFallbackResolvers,
        null
      );

      if (createFallbackResolvers) {
        try {
          localizationFallbackResolvers = createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          });
        } catch (createFallbackResolversError) {
          void createFallbackResolversError;
          localizationFallbackResolvers = null;
        }
      }
    }

    if (
      !localizationFallbackResolvers &&
      typeof createBasicLocalizationFallbackResolvers === 'function'
    ) {
      try {
        localizationFallbackResolvers = createBasicLocalizationFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        });
      } catch (createBasicResolversError) {
        void createBasicResolversError;
        localizationFallbackResolvers = null;
      }
    }

    if (!localizationFallbackResolvers) {
      localizationFallbackResolvers = fallback.localizationFallbackResolvers;
    }

    const localizationFallbackNamespace = Object.prototype.hasOwnProperty.call(
      normalizedCandidate,
      'localizationFallbackNamespace'
    )
      ? normalizedCandidate.localizationFallbackNamespace
      : fallback.localizationFallbackNamespace;

    const fallbackResolveLocaleModule = ensureFunction(
      normalizedCandidate.fallbackResolveLocaleModule,
      fallback.fallbackResolveLocaleModule
    );

    const createLocaleFallbacks = ensureFunction(
      normalizedCandidate.createLocaleFallbacks,
      fallback.createLocaleFallbacks
    );

    return {
      localizationRuntimeEnvironment,
      localizationBridge,
      localizationFallbacks,
      inlineLocalizationFallbacks,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry,
      localizationFallbackResolvers,
      localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  function resolveRuntimeLocalization(options) {
    const currentLocalization = options && options.currentLocalization;

    if (isObject(currentLocalization)) {
      return normalizeLocalizationRuntimeSetup(currentLocalization);
    }

    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const createLocalizationRuntimeSetup = ensureCreateLocalizationRuntimeSetup({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    if (typeof createLocalizationRuntimeSetup === 'function') {
      try {
        const setup = createLocalizationRuntimeSetup({
          resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
        });

        return normalizeLocalizationRuntimeSetup(setup);
      } catch (createLocalizationRuntimeSetupError) {
        void createLocalizationRuntimeSetupError;
      }
    }

    return createFallbackLocalizationRuntimeSetup();
  }

  const namespace = {
    resolveRuntimeLocalization,
    createFallbackLocalizationRuntimeSetup,
  };

  const namespaceName = 'cineCoreAppRuntimeLocalization';
  const globalScope = detectScope();
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
