function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initAppCoreBootstrapModule(globalScope) {
  'use strict';

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
  function ensureArray(value) {
    return Array.isArray(value) ? value.slice() : [];
  }
  function registerScope(scopes, scope) {
    if (!scope || !isObject(scope)) {
      return;
    }
    if (Array.isArray(scopes) && scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }
  function attemptFactory(factory, factoryOptions) {
    if (typeof factory !== 'function') {
      return null;
    }
    try {
      var result = factory(factoryOptions);
      return result && _typeof(result) === 'object' ? result : null;
    } catch (error) {
      void error;
    }
    return null;
  }
  function normalizeBootstrapInvocationOptions(baseOrOverrides, overrides) {
    var hasOverrides = arguments.length > 1;
    var baseSource = hasOverrides ? baseOrOverrides : null;
    var overrideSource = hasOverrides ? overrides : baseOrOverrides;
    var normalized = {};
    if (baseSource && isObject(baseSource) && !Array.isArray(baseSource)) {
      var baseKeys = Object.keys(baseSource);
      for (var index = 0; index < baseKeys.length; index += 1) {
        var key = baseKeys[index];
        normalized[key] = baseSource[key];
      }
    }
    normalized.resolveCoreSupportModule = typeof normalized.resolveCoreSupportModule === 'function' ? normalized.resolveCoreSupportModule : null;
    normalized.requireFn = ensureRequireFn(normalized.requireFn);
    normalized.runtimeScope = normalized.runtimeScope && isObject(normalized.runtimeScope) ? normalized.runtimeScope : null;
    normalized.coreGlobalScope = normalized.coreGlobalScope && isObject(normalized.coreGlobalScope) ? normalized.coreGlobalScope : null;
    normalized.fallbackScopes = ensureArray(normalized.fallbackScopes);
    function applyOverrides(source) {
      if (!source) {
        return;
      }
      if (Array.isArray(source)) {
        normalized.fallbackScopes = source.slice();
        return;
      }
      if (!isObject(source)) {
        return;
      }
      if (Array.isArray(source.fallbackScopes)) {
        normalized.fallbackScopes = source.fallbackScopes.slice();
      } else if (source.fallbackScopes) {
        normalized.fallbackScopes = [source.fallbackScopes];
      }
      if (source.runtimeScope && isObject(source.runtimeScope)) {
        normalized.runtimeScope = source.runtimeScope;
      }
      if (source.coreGlobalScope && isObject(source.coreGlobalScope)) {
        normalized.coreGlobalScope = source.coreGlobalScope;
      }
      if (typeof source.requireFn === 'function') {
        normalized.requireFn = source.requireFn;
      } else if (Object.prototype.hasOwnProperty.call(source, 'requireFn')) {
        normalized.requireFn = ensureRequireFn(source.requireFn);
      }
      if (typeof source.resolveCoreSupportModule === 'function') {
        normalized.resolveCoreSupportModule = source.resolveCoreSupportModule;
      } else if (Object.prototype.hasOwnProperty.call(source, 'resolveCoreSupportModule')) {
        normalized.resolveCoreSupportModule = null;
      }
      var keys = Object.keys(source);
      for (var _index = 0; _index < keys.length; _index += 1) {
        var _key = keys[_index];
        if (_key === 'fallbackScopes' || _key === 'runtimeScope' || _key === 'coreGlobalScope' || _key === 'requireFn' || _key === 'resolveCoreSupportModule') {
          continue;
        }
        normalized[_key] = source[_key];
      }
    }
    applyOverrides(overrideSource);
    normalized.requireFn = ensureRequireFn(normalized.requireFn);
    normalized.fallbackScopes = ensureArray(normalized.fallbackScopes);
    return normalized;
  }
  function collectBootstrapFallbackScopes(options) {
    var invocationOptions = normalizeBootstrapInvocationOptions(options);
    var runtimeScope = invocationOptions.runtimeScope;
    var coreGlobalScope = invocationOptions.coreGlobalScope;
    var fallbackScopeList = ensureArray(invocationOptions.fallbackScopes);
    var bootstrapEnvironmentTools = invocationOptions.bootstrapEnvironmentTools || invocationOptions.bootstrapEnvironment || getBootstrapEnvironmentTools(invocationOptions);
    var bootstrapResultsTools = invocationOptions.bootstrapResultsTools || getBootstrapResultsTools(invocationOptions);
    if (bootstrapResultsTools && typeof bootstrapResultsTools.collectBootstrapFallbackScopes === 'function') {
      var collectAdditionalFallbackScopes = bootstrapEnvironmentTools && typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function' ? function collectAdditionalFallbackScopes(scopes) {
        try {
          var collected = bootstrapEnvironmentTools.collectFallbackScopes({
            fallbackScopes: Array.isArray(scopes) ? scopes : ensureArray(scopes),
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope
          });
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (environmentCollectError) {
          void environmentCollectError;
        }
        if (Array.isArray(scopes)) {
          try {
            var legacyCollected = bootstrapEnvironmentTools.collectFallbackScopes(scopes);
            if (Array.isArray(legacyCollected)) {
              return legacyCollected;
            }
          } catch (legacyEnvironmentCollectError) {
            void legacyEnvironmentCollectError;
          }
        }
        return null;
      } : null;
      try {
        var collected = bootstrapResultsTools.collectBootstrapFallbackScopes({
          fallbackScopes: fallbackScopeList,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          collectFallbackScopes: collectAdditionalFallbackScopes
        });
        if (Array.isArray(collected)) {
          return collected;
        }
      } catch (resultsCollectError) {
        void resultsCollectError;
      }
    }
    if (bootstrapEnvironmentTools && typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function') {
      try {
        var environmentCollected = bootstrapEnvironmentTools.collectFallbackScopes({
          fallbackScopes: fallbackScopeList,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope
        });
        if (Array.isArray(environmentCollected)) {
          return environmentCollected;
        }
      } catch (environmentCollectError) {
        void environmentCollectError;
      }
      if (Array.isArray(fallbackScopeList)) {
        try {
          var legacyEnvironmentCollected = bootstrapEnvironmentTools.collectFallbackScopes(fallbackScopeList);
          if (Array.isArray(legacyEnvironmentCollected)) {
            return legacyEnvironmentCollected;
          }
        } catch (legacyEnvironmentCollectError) {
          void legacyEnvironmentCollectError;
        }
      }
    }
    return appendFallbackScopes(fallbackScopeList, runtimeScope, coreGlobalScope);
  }
  function getBootstrapEnvironmentTools(options) {
    if (options && isObject(options.bootstrapEnvironmentTools)) {
      return options.bootstrapEnvironmentTools;
    }
    if (options && isObject(options.bootstrapEnvironment)) {
      return options.bootstrapEnvironment;
    }
    return resolveBootstrapEnvironmentTools(options);
  }
  function getBootstrapResultsTools(options) {
    if (options && isObject(options.bootstrapResultsTools)) {
      return options.bootstrapResultsTools;
    }
    if (options && isObject(options.resultsTools)) {
      return options.resultsTools;
    }
    return resolveBootstrapResultsTools(options);
  }
  function getBootstrapFallbackTools(options) {
    if (options && isObject(options.bootstrapFallbackTools)) {
      return options.bootstrapFallbackTools;
    }
    if (options && isObject(options.fallbackTools)) {
      return options.fallbackTools;
    }
    return resolveBootstrapFallbackTools(options);
  }
  function getBootstrapResolverTools(options) {
    if (options && isObject(options.bootstrapResolverTools) && hasBootstrapResolverCapabilities(options.bootstrapResolverTools)) {
      return options.bootstrapResolverTools;
    }
    return resolveBootstrapResolverTools(options);
  }
  function appendFallbackScopes(scopes, runtimeScope, coreGlobalScope) {
    if (!Array.isArray(scopes)) {
      return [];
    }
    var list = scopes.slice();
    if (runtimeScope && isObject(runtimeScope) && list.indexOf(runtimeScope) === -1) {
      list.push(runtimeScope);
    }
    if (coreGlobalScope && isObject(coreGlobalScope) && list.indexOf(coreGlobalScope) === -1) {
      list.push(coreGlobalScope);
    }
    var globalCandidates = [typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < globalCandidates.length; index += 1) {
      var scope = globalCandidates[index];
      if (!scope || !isObject(scope)) {
        continue;
      }
      if (list.indexOf(scope) === -1) {
        list.push(scope);
      }
    }
    return list;
  }
  function resolveNamespace(namespaceName, requirePath, options) {
    var directNamespace = options && isObject(options.directNamespace) ? options.directNamespace : null;
    if (directNamespace) {
      return directNamespace;
    }
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    if (resolveCoreSupportModule) {
      try {
        var resolved = resolveCoreSupportModule(namespaceName, requirePath);
        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (resolveError) {
        void resolveError;
      }
    }
    var requireFn = ensureRequireFn(options && options.requireFn);
    if (typeof requireFn === 'function' && requirePath) {
      try {
        var required = requireFn(requirePath);
        if (required && isObject(required)) {
          return required;
        }
      } catch (requireError) {
        void requireError;
      }
    }
    var fallbackScopes = collectBootstrapFallbackScopes(options);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!scope || !isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope[namespaceName];
        if (candidate && isObject(candidate)) {
          return candidate;
        }
      } catch (lookupError) {
        void lookupError;
      }
    }
    return null;
  }
  function resolveBootstrapTools(options) {
    return resolveNamespace('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js', options);
  }
  function resolveBootstrapFallbackTools(options) {
    return resolveNamespace('cineCoreAppCoreBootstrapFallbacks', './modules/app-core/bootstrap.js', options);
  }
  function cloneResolverOptions(options, directNamespace) {
    var resolverOptions = options && _typeof(options) === 'object' && !Array.isArray(options) ? Object.assign({}, options) : {};
    if (!resolverOptions.directNamespace && directNamespace && isObject(directNamespace)) {
      resolverOptions.directNamespace = directNamespace;
    }
    return resolverOptions;
  }
  function resolveBootstrapEnvironmentTools(options) {
    var resolverOptions = cloneResolverOptions(options, options && isObject(options.directBootstrapEnvironmentNamespace) ? options.directBootstrapEnvironmentNamespace : null);
    return resolveNamespace('cineCoreAppCoreBootstrapEnvironment', './modules/app-core/bootstrap.js', resolverOptions);
  }
  function resolveBootstrapResultsTools(options) {
    var resolverOptions = cloneResolverOptions(options, options && isObject(options.directBootstrapResultsNamespace) ? options.directBootstrapResultsNamespace : null);
    return resolveNamespace('cineCoreAppCoreBootstrapResults', './modules/app-core/bootstrap.js', resolverOptions);
  }
  function collectEnvironmentFallbackScopes(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    return appendFallbackScopes(ensureArray(options && options.fallbackScopes), runtimeScope, coreGlobalScope);
  }
  function hasBootstrapResolverCapabilities(candidate) {
    return !!candidate && _typeof(candidate) === 'object' && typeof candidate.resolveBootstrapTools === 'function' && typeof candidate.resolveBootstrapFallbackTools === 'function' && typeof candidate.createInlineLocalizationFallback === 'function' && typeof candidate.createInlineRuntimeSharedFallback === 'function';
  }
  function resolveBootstrapResolverTools(options) {
    var directResolverNamespace = options && isObject(options.directResolverNamespace) ? options.directResolverNamespace : null;
    if (hasBootstrapResolverCapabilities(directResolverNamespace)) {
      return directResolverNamespace;
    }
    var resolverOptions = {
      resolveCoreSupportModule: options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null,
      requireFn: ensureRequireFn(options && options.requireFn),
      runtimeScope: options && isObject(options.runtimeScope) ? options.runtimeScope : null,
      coreGlobalScope: options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null,
      fallbackScopes: ensureArray(options && options.fallbackScopes)
    };
    var resolvedNamespace = resolveNamespace('cineCoreAppCoreBootstrapResolver', './modules/app-core/bootstrap.js', Object.assign({}, resolverOptions, {
      directNamespace: directResolverNamespace
    }));
    if (hasBootstrapResolverCapabilities(resolvedNamespace)) {
      return resolvedNamespace;
    }
    if (resolvedNamespace && isObject(resolvedNamespace.cineCoreAppCoreBootstrapResolver) && hasBootstrapResolverCapabilities(resolvedNamespace.cineCoreAppCoreBootstrapResolver)) {
      return resolvedNamespace.cineCoreAppCoreBootstrapResolver;
    }
    if (resolvedNamespace && isObject(resolvedNamespace.cineCoreAppCoreBootstrap) && hasBootstrapResolverCapabilities(resolvedNamespace.cineCoreAppCoreBootstrap)) {
      return resolvedNamespace.cineCoreAppCoreBootstrap;
    }
    var fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!scope || !isObject(scope)) {
        continue;
      }
      try {
        var resolverCandidate = scope.cineCoreAppCoreBootstrapResolver;
        if (hasBootstrapResolverCapabilities(resolverCandidate)) {
          return resolverCandidate;
        }
        var bootstrapCandidate = scope.cineCoreAppCoreBootstrap;
        if (hasBootstrapResolverCapabilities(bootstrapCandidate)) {
          return bootstrapCandidate;
        }
      } catch (resolverLookupError) {
        void resolverLookupError;
      }
    }
    return null;
  }
  function resolveBootstrapToolsWithResolver(options) {
    var resolverTools = options && isObject(options.bootstrapResolverTools) ? options.bootstrapResolverTools : null;
    if (resolverTools && typeof resolverTools.resolveBootstrapTools === 'function') {
      try {
        var resolved = resolverTools.resolveBootstrapTools(options);
        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (bootstrapResolveError) {
        void bootstrapResolveError;
      }
    }
    var directBootstrapNamespace = options && isObject(options.directBootstrapNamespace) ? options.directBootstrapNamespace : null;
    if (directBootstrapNamespace && isObject(directBootstrapNamespace)) {
      return directBootstrapNamespace;
    }
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    if (resolveCoreSupportModule) {
      try {
        var _resolved = resolveCoreSupportModule('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js');
        if (_resolved && isObject(_resolved)) {
          return _resolved;
        }
      } catch (bootstrapSupportResolveError) {
        void bootstrapSupportResolveError;
      }
    }
    var requireFn = ensureRequireFn(options && options.requireFn);
    if (typeof requireFn === 'function') {
      try {
        var requiredBootstrap = requireFn('./modules/app-core/bootstrap.js');
        if (requiredBootstrap && isObject(requiredBootstrap)) {
          return requiredBootstrap;
        }
      } catch (bootstrapRequireError) {
        void bootstrapRequireError;
      }
    }
    var fallbackScopes = collectEnvironmentFallbackScopes(options);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!scope || !isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppCoreBootstrap;
        if (candidate && isObject(candidate)) {
          return candidate;
        }
      } catch (bootstrapLookupError) {
        void bootstrapLookupError;
      }
    }
    return null;
  }
  function resolveBootstrapFallbackToolsWithResolver(options) {
    var resolverTools = options && isObject(options.bootstrapResolverTools) ? options.bootstrapResolverTools : null;
    if (resolverTools && typeof resolverTools.resolveBootstrapFallbackTools === 'function') {
      try {
        var resolved = resolverTools.resolveBootstrapFallbackTools(options);
        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (bootstrapFallbackResolveError) {
        void bootstrapFallbackResolveError;
      }
    }
    var directFallbackNamespace = options && isObject(options.directBootstrapFallbackNamespace) ? options.directBootstrapFallbackNamespace : null;
    if (directFallbackNamespace && isObject(directFallbackNamespace)) {
      return directFallbackNamespace;
    }
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    if (resolveCoreSupportModule) {
      try {
        var _resolved2 = resolveCoreSupportModule('cineCoreAppCoreBootstrapFallbacks', './modules/app-core/bootstrap.js');
        if (_resolved2 && isObject(_resolved2)) {
          return _resolved2;
        }
      } catch (bootstrapFallbackSupportResolveError) {
        void bootstrapFallbackSupportResolveError;
      }
    }
    var requireFn = ensureRequireFn(options && options.requireFn);
    if (typeof requireFn === 'function') {
      try {
        var requiredFallback = requireFn('./modules/app-core/bootstrap.js');
        if (requiredFallback && isObject(requiredFallback.cineCoreAppCoreBootstrapFallbacks)) {
          return requiredFallback.cineCoreAppCoreBootstrapFallbacks;
        }
        if (requiredFallback && isObject(requiredFallback)) {
          return requiredFallback;
        }
      } catch (bootstrapFallbackRequireError) {
        void bootstrapFallbackRequireError;
      }
    }
    var fallbackScopes = collectEnvironmentFallbackScopes(options);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!scope || !isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppCoreBootstrapFallbacks;
        if (candidate && isObject(candidate)) {
          return candidate;
        }
      } catch (bootstrapFallbackLookupError) {
        void bootstrapFallbackLookupError;
      }
    }
    return null;
  }
  function createInlineLocalizationFallbackWithResolver(options) {
    var resolverTools = options && isObject(options.bootstrapResolverTools) ? options.bootstrapResolverTools : null;
    if (resolverTools && typeof resolverTools.createInlineLocalizationFallback === 'function') {
      try {
        var generated = resolverTools.createInlineLocalizationFallback(options);
        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (localizationFallbackResolveError) {
        void localizationFallbackResolveError;
      }
    }
    var fallbackTools = options && isObject(options.fallbackTools) ? options.fallbackTools : null;
    if (fallbackTools && typeof fallbackTools.createLocalizationBootstrapFallback === 'function') {
      try {
        var fallbackResult = fallbackTools.createLocalizationBootstrapFallback(options);
        if (fallbackResult && isObject(fallbackResult)) {
          return fallbackResult;
        }
      } catch (localizationFallbackError) {
        void localizationFallbackError;
      }
    }
    return createLocalizationBootstrapFallback();
  }
  function createInlineRuntimeSharedFallbackWithResolver(options) {
    var resolverTools = options && isObject(options.bootstrapResolverTools) ? options.bootstrapResolverTools : null;
    if (resolverTools && typeof resolverTools.createInlineRuntimeSharedFallback === 'function') {
      try {
        var generated = resolverTools.createInlineRuntimeSharedFallback(options);
        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (runtimeSharedFallbackResolveError) {
        void runtimeSharedFallbackResolveError;
      }
    }
    var fallbackTools = options && isObject(options.fallbackTools) ? options.fallbackTools : null;
    if (fallbackTools && typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function') {
      try {
        var moduleFallback = fallbackTools.createRuntimeSharedBootstrapFallback(options);
        if (moduleFallback && isObject(moduleFallback)) {
          return moduleFallback;
        }
      } catch (runtimeSharedFallbackError) {
        void runtimeSharedFallbackError;
      }
    }
    var fallbackScopes = collectEnvironmentFallbackScopes(options);
    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        if (!scope || !isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (candidate && isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    }
    var runtimeShared = options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    if (!runtimeShared) {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }
    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      try {
        runtimeShared = Object.create(null);
      } catch (runtimeSharedCreationError) {
        void runtimeSharedCreationError;
        runtimeShared = {};
      }
    }
    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal
    };
  }
  function createBootstrapEnvironment(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = collectEnvironmentFallbackScopes({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes
    });
    var resolverTools = resolveBootstrapResolverTools({
      directResolverNamespace: options && options.directResolverNamespace,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes
    });
    var bootstrapTools = resolveBootstrapToolsWithResolver({
      directBootstrapNamespace: options && options.directBootstrapNamespace,
      bootstrapResolverTools: resolverTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes
    });
    var bootstrapFallbackTools = resolveBootstrapFallbackToolsWithResolver({
      directBootstrapFallbackNamespace: options && options.directBootstrapFallbackNamespace,
      bootstrapResolverTools: resolverTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes
    });
    function createInlineLocalizationFallbackWithEnvironment() {
      return createInlineLocalizationFallbackWithResolver({
        bootstrapResolverTools: resolverTools,
        fallbackTools: bootstrapFallbackTools,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes
      });
    }
    function createInlineRuntimeSharedFallbackWithEnvironment(runtimeSharedOptions) {
      var runtimeSharedFallbackScopes = runtimeSharedOptions && runtimeSharedOptions.fallbackScopes ? runtimeSharedOptions.fallbackScopes : fallbackScopes;
      return createInlineRuntimeSharedFallbackWithResolver({
        bootstrapResolverTools: resolverTools,
        fallbackTools: bootstrapFallbackTools,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: runtimeSharedFallbackScopes,
        currentRuntimeShared: runtimeSharedOptions && isObject(runtimeSharedOptions.currentRuntimeShared) ? runtimeSharedOptions.currentRuntimeShared : null
      });
    }
    function collectAdditionalFallbackScopes(extraScopes) {
      return collectEnvironmentFallbackScopes({
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: extraScopes
      });
    }
    return {
      fallbackScopes: fallbackScopes,
      bootstrapResolverTools: resolverTools,
      bootstrapTools: bootstrapTools,
      bootstrapFallbackTools: bootstrapFallbackTools,
      createInlineLocalizationFallback: createInlineLocalizationFallbackWithEnvironment,
      createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithEnvironment,
      collectFallbackScopes: collectAdditionalFallbackScopes
    };
  }
  function collectResultsFallbackScopes(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopesInput = options ? options.fallbackScopes : null;
    if (options && typeof options.collectFallbackScopes === 'function') {
      try {
        var collected = options.collectFallbackScopes(fallbackScopesInput);
        if (Array.isArray(collected)) {
          var list = ensureArray(collected);
          registerScope(list, runtimeScope);
          registerScope(list, coreGlobalScope);
          registerScope(list, typeof globalThis !== 'undefined' ? globalThis : null);
          registerScope(list, typeof window !== 'undefined' ? window : null);
          registerScope(list, typeof self !== 'undefined' ? self : null);
          registerScope(list, typeof global !== 'undefined' ? global : null);
          return list;
        }
      } catch (collectorError) {
        void collectorError;
      }
    }
    var fallbackScopes = ensureArray(fallbackScopesInput);
    registerScope(fallbackScopes, runtimeScope);
    registerScope(fallbackScopes, coreGlobalScope);
    registerScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(fallbackScopes, typeof window !== 'undefined' ? window : null);
    registerScope(fallbackScopes, typeof self !== 'undefined' ? self : null);
    registerScope(fallbackScopes, typeof global !== 'undefined' ? global : null);
    return fallbackScopes;
  }
  function createLocalizationFallbackSkeleton() {
    return {
      localizationSupport: null,
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
  function createRuntimeSharedFallbackSkeleton(options) {
    var fallbackScopes = collectResultsFallbackScopes(options || null);
    var currentRuntimeShared = options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (candidate && _typeof(candidate) === 'object') {
            return candidate;
          }
        } catch (lookupError) {
          void lookupError;
        }
      }
      return null;
    }
    var runtimeShared = currentRuntimeShared;
    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }
    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      try {
        runtimeShared = Object.create(null);
      } catch (creationError) {
        void creationError;
        runtimeShared = {};
      }
    }
    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal
    };
  }
  function resolveLocalizationBootstrapResult(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = collectResultsFallbackScopes({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
      collectFallbackScopes: options && options.collectFallbackScopes
    });
    var requireFn = ensureRequireFn(options && options.requireFn);
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    var bootstrapOptions = {
      localizationSupportTools: options && isObject(options.localizationSupportTools) ? options.localizationSupportTools : null,
      localizationBootstrapTools: options && isObject(options.localizationBootstrapTools) ? options.localizationBootstrapTools : null,
      localizationRuntimeTools: options && isObject(options.localizationRuntimeTools) ? options.localizationRuntimeTools : null,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes,
      currentLocalization: options && isObject(options.currentLocalization) ? options.currentLocalization : null
    };
    var bootstrapTools = options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;
    var result = attemptFactory(bootstrapTools && bootstrapTools.createLocalizationBootstrapResult, bootstrapOptions);
    if (!result) {
      result = attemptFactory(bootstrapTools && bootstrapTools.createLocalizationBootstrapFallback, bootstrapOptions);
    }
    if (!result) {
      var inlineFactory = options && typeof options.createInlineLocalizationFallback === 'function' ? options.createInlineLocalizationFallback : null;
      result = attemptFactory(inlineFactory, {
        fallbackTools: options && isObject(options.bootstrapFallbackTools) ? options.bootstrapFallbackTools : null,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        localizationFallbackOptions: options && options.localizationFallbackOptions ? options.localizationFallbackOptions : null
      });
    }
    if (!result) {
      result = createLocalizationFallbackSkeleton();
    }
    return result;
  }
  function resolveRuntimeSharedBootstrapResult(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = collectResultsFallbackScopes({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
      collectFallbackScopes: options && options.collectFallbackScopes
    });
    var requireFn = ensureRequireFn(options && options.requireFn);
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    var bootstrapOptions = {
      runtimeSharedBootstrapResolverTools: options && isObject(options.runtimeSharedBootstrapResolverTools) ? options.runtimeSharedBootstrapResolverTools : null,
      runtimeSharedBootstrapTools: options && isObject(options.runtimeSharedBootstrapTools) ? options.runtimeSharedBootstrapTools : null,
      runtimeSharedNamespaceTools: options && isObject(options.runtimeSharedNamespaceTools) ? options.runtimeSharedNamespaceTools : null,
      runtimeSharedBootstrapInlineTools: options && isObject(options.runtimeSharedBootstrapInlineTools) ? options.runtimeSharedBootstrapInlineTools : null,
      runtimeSharedBootstrapResultTools: options && isObject(options.runtimeSharedBootstrapResultTools) ? options.runtimeSharedBootstrapResultTools : null,
      runtimeSharedBootstrapLoaderTools: options && isObject(options.runtimeSharedBootstrapLoaderTools) ? options.runtimeSharedBootstrapLoaderTools : null,
      runtimeSharedBootstrapManagerTools: options && isObject(options.runtimeSharedBootstrapManagerTools) ? options.runtimeSharedBootstrapManagerTools : null,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null,
      fallbackScopes: fallbackScopes,
      runtimeSharedBootstrapInlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath ? options.runtimeSharedBootstrapInlineRequirePath : null,
      runtimeSharedBootstrapResultRequirePath: options && options.runtimeSharedBootstrapResultRequirePath ? options.runtimeSharedBootstrapResultRequirePath : null
    };
    var bootstrapTools = options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;
    var result = attemptFactory(bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapResult, bootstrapOptions);
    if (!result) {
      result = attemptFactory(bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapFallback, bootstrapOptions);
    }
    if (!result) {
      var inlineFactory = options && typeof options.createInlineRuntimeSharedFallback === 'function' ? options.createInlineRuntimeSharedFallback : null;
      result = attemptFactory(inlineFactory, {
        fallbackTools: options && isObject(options.bootstrapFallbackTools) ? options.bootstrapFallbackTools : null,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null
      });
    }
    if (!result) {
      result = createRuntimeSharedFallbackSkeleton({
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null
      });
    }
    return result;
  }
  function createLocalizationBootstrapFallback() {
    return {
      localizationSupport: null,
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
  function createLocalizationBootstrapResult(options) {
    var localizationSupportTools = options && isObject(options.localizationSupportTools) ? options.localizationSupportTools : null;
    var localizationBootstrapTools = options && isObject(options.localizationBootstrapTools) ? options.localizationBootstrapTools : null;
    var localizationRuntimeTools = options && isObject(options.localizationRuntimeTools) ? options.localizationRuntimeTools : null;
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = appendFallbackScopes(ensureArray(options && options.fallbackScopes), runtimeScope, coreGlobalScope);
    var resolverOptions = {
      localizationSupportTools: localizationSupportTools,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes
    };
    var result = attemptFactory(localizationBootstrapTools && localizationBootstrapTools.createLocalizationBootstrapResult, resolverOptions);
    if (!result) {
      result = attemptFactory(localizationRuntimeTools && localizationRuntimeTools.resolveRuntimeLocalization, {
        currentLocalization: options && options.currentLocalization,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes
      });
    }
    if (!result) {
      result = attemptFactory(localizationRuntimeTools && localizationRuntimeTools.createFallbackLocalizationRuntimeSetup, {
        currentLocalization: options && options.currentLocalization,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes
      });
    }
    if (!result) {
      result = createLocalizationBootstrapFallback();
    }
    return result;
  }
  function createInlineLocalizationFallback(options) {
    var invocationOptions = normalizeBootstrapInvocationOptions(options);
    var runtimeScope = invocationOptions.runtimeScope;
    var coreGlobalScope = invocationOptions.coreGlobalScope;
    var requireFn = invocationOptions.requireFn;
    var bootstrapEnvironmentTools = invocationOptions.bootstrapEnvironmentTools || invocationOptions.bootstrapEnvironment || getBootstrapEnvironmentTools(invocationOptions);
    var bootstrapResultsTools = invocationOptions.bootstrapResultsTools || getBootstrapResultsTools(invocationOptions);
    var localizationFallbackOptions = invocationOptions.localizationFallbackOptions || null;
    var resolverOptions = normalizeBootstrapInvocationOptions(invocationOptions, {
      bootstrapEnvironmentTools: bootstrapEnvironmentTools,
      bootstrapEnvironment: bootstrapEnvironmentTools,
      bootstrapResultsTools: bootstrapResultsTools,
      fallbackScopes: invocationOptions.fallbackScopes
    });
    var fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);
    resolverOptions.fallbackScopes = fallbackScopes;
    var bootstrapResolverTools = invocationOptions.bootstrapResolverTools || getBootstrapResolverTools(resolverOptions);
    var fallbackTools = invocationOptions.bootstrapFallbackTools || invocationOptions.fallbackTools || getBootstrapFallbackTools(resolverOptions);
    var bootstrapSuite = invocationOptions.bootstrapSuite && isObject(invocationOptions.bootstrapSuite) ? invocationOptions.bootstrapSuite : null;
    if (bootstrapResolverTools && typeof bootstrapResolverTools.createInlineLocalizationFallback === 'function') {
      try {
        var generated = bootstrapResolverTools.createInlineLocalizationFallback({
          fallbackTools: fallbackTools,
          resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          localizationFallbackOptions: localizationFallbackOptions
        });
        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (localizationFallbackResolveError) {
        void localizationFallbackResolveError;
      }
    }
    if (bootstrapSuite && typeof bootstrapSuite.createLocalizationBootstrapFallback === 'function') {
      try {
        var suiteFallback = bootstrapSuite.createLocalizationBootstrapFallback({
          fallbackScopes: fallbackScopes,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          localizationFallbackOptions: localizationFallbackOptions
        });
        if (suiteFallback && isObject(suiteFallback)) {
          return suiteFallback;
        }
      } catch (suiteLocalizationFallbackError) {
        void suiteLocalizationFallbackError;
      }
    }
    if (fallbackTools && typeof fallbackTools.createLocalizationBootstrapFallback === 'function') {
      try {
        var fallbackResult = fallbackTools.createLocalizationBootstrapFallback({
          resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          localizationFallbackOptions: localizationFallbackOptions
        });
        if (fallbackResult && isObject(fallbackResult)) {
          return fallbackResult;
        }
      } catch (localizationFallbackError) {
        void localizationFallbackError;
      }
    }
    if (bootstrapResultsTools && typeof bootstrapResultsTools.createLocalizationFallbackSkeleton === 'function') {
      try {
        var skeleton = bootstrapResultsTools.createLocalizationFallbackSkeleton();
        if (skeleton && isObject(skeleton)) {
          return skeleton;
        }
      } catch (localizationSkeletonError) {
        void localizationSkeletonError;
      }
    }
    return createLocalizationBootstrapFallback();
  }
  function createRuntimeSharedBootstrapFallback(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = appendFallbackScopes(ensureArray(options && options.fallbackScopes), runtimeScope, coreGlobalScope);
    var currentRuntimeShared = options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        if (!scope || !isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (candidate && _typeof(candidate) === 'object') {
            return candidate;
          }
        } catch (lookupError) {
          void lookupError;
        }
      }
      return null;
    }
    var runtimeShared = currentRuntimeShared;
    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }
    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      try {
        runtimeShared = Object.create(null);
      } catch (creationError) {
        void creationError;
        runtimeShared = {};
      }
    }
    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal
    };
  }
  function createInlineRuntimeSharedFallback(options) {
    var invocationOptions = normalizeBootstrapInvocationOptions(options);
    var runtimeScope = invocationOptions.runtimeScope;
    var coreGlobalScope = invocationOptions.coreGlobalScope;
    var requireFn = invocationOptions.requireFn;
    var bootstrapEnvironmentTools = invocationOptions.bootstrapEnvironmentTools || invocationOptions.bootstrapEnvironment || getBootstrapEnvironmentTools(invocationOptions);
    var bootstrapResultsTools = invocationOptions.bootstrapResultsTools || getBootstrapResultsTools(invocationOptions);
    var currentRuntimeShared = invocationOptions.currentRuntimeShared && isObject(invocationOptions.currentRuntimeShared) ? invocationOptions.currentRuntimeShared : null;
    var resolverOptions = normalizeBootstrapInvocationOptions(invocationOptions, {
      bootstrapEnvironmentTools: bootstrapEnvironmentTools,
      bootstrapEnvironment: bootstrapEnvironmentTools,
      bootstrapResultsTools: bootstrapResultsTools,
      fallbackScopes: invocationOptions.fallbackScopes,
      currentRuntimeShared: currentRuntimeShared
    });
    var fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);
    resolverOptions.fallbackScopes = fallbackScopes;
    resolverOptions.currentRuntimeShared = currentRuntimeShared;
    var bootstrapResolverTools = invocationOptions.bootstrapResolverTools || getBootstrapResolverTools(resolverOptions);
    var fallbackTools = invocationOptions.bootstrapFallbackTools || invocationOptions.fallbackTools || getBootstrapFallbackTools(resolverOptions);
    var bootstrapSuite = invocationOptions.bootstrapSuite && isObject(invocationOptions.bootstrapSuite) ? invocationOptions.bootstrapSuite : null;
    if (bootstrapResolverTools && typeof bootstrapResolverTools.createInlineRuntimeSharedFallback === 'function') {
      try {
        var generated = bootstrapResolverTools.createInlineRuntimeSharedFallback({
          fallbackTools: fallbackTools,
          resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          currentRuntimeShared: currentRuntimeShared
        });
        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (runtimeSharedFallbackResolveError) {
        void runtimeSharedFallbackResolveError;
      }
    }
    if (bootstrapSuite && typeof bootstrapSuite.createRuntimeSharedBootstrapFallback === 'function') {
      try {
        var suiteFallback = bootstrapSuite.createRuntimeSharedBootstrapFallback({
          fallbackScopes: fallbackScopes,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          currentRuntimeShared: currentRuntimeShared
        });
        if (suiteFallback && isObject(suiteFallback)) {
          return suiteFallback;
        }
      } catch (suiteRuntimeSharedFallbackError) {
        void suiteRuntimeSharedFallbackError;
      }
    }
    if (fallbackTools && typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function') {
      try {
        var moduleFallback = fallbackTools.createRuntimeSharedBootstrapFallback({
          resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          currentRuntimeShared: currentRuntimeShared
        });
        if (moduleFallback && isObject(moduleFallback)) {
          return moduleFallback;
        }
      } catch (runtimeSharedFallbackError) {
        void runtimeSharedFallbackError;
      }
    }
    if (bootstrapResultsTools && typeof bootstrapResultsTools.createRuntimeSharedFallbackSkeleton === 'function') {
      try {
        var skeleton = bootstrapResultsTools.createRuntimeSharedFallbackSkeleton({
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          currentRuntimeShared: currentRuntimeShared
        });
        if (skeleton && isObject(skeleton)) {
          return skeleton;
        }
      } catch (runtimeSharedSkeletonError) {
        void runtimeSharedSkeletonError;
      }
    }
    return createRuntimeSharedFallbackSkeleton({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes,
      currentRuntimeShared: currentRuntimeShared
    });
  }
  function createRuntimeSharedBootstrapResult(options) {
    var runtimeSharedBootstrapResolverTools = options && isObject(options.runtimeSharedBootstrapResolverTools) ? options.runtimeSharedBootstrapResolverTools : null;
    var runtimeSharedBootstrapTools = options && isObject(options.runtimeSharedBootstrapTools) ? options.runtimeSharedBootstrapTools : null;
    var runtimeSharedNamespaceTools = options && isObject(options.runtimeSharedNamespaceTools) ? options.runtimeSharedNamespaceTools : null;
    var runtimeSharedBootstrapInlineTools = options && isObject(options.runtimeSharedBootstrapInlineTools) ? options.runtimeSharedBootstrapInlineTools : null;
    var runtimeSharedBootstrapResultTools = options && isObject(options.runtimeSharedBootstrapResultTools) ? options.runtimeSharedBootstrapResultTools : null;
    var runtimeSharedBootstrapLoaderTools = options && isObject(options.runtimeSharedBootstrapLoaderTools) ? options.runtimeSharedBootstrapLoaderTools : null;
    var runtimeSharedBootstrapManagerTools = options && isObject(options.runtimeSharedBootstrapManagerTools) ? options.runtimeSharedBootstrapManagerTools : null;
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = appendFallbackScopes(ensureArray(options && options.fallbackScopes), runtimeScope, coreGlobalScope);
    var currentRuntimeShared = options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    var resolverOptions = {
      runtimeSharedBootstrapTools: runtimeSharedBootstrapTools,
      runtimeSharedNamespaceTools: runtimeSharedNamespaceTools,
      runtimeSharedBootstrapInlineTools: runtimeSharedBootstrapInlineTools,
      runtimeSharedBootstrapResultTools: runtimeSharedBootstrapResultTools,
      runtimeSharedBootstrapLoaderTools: runtimeSharedBootstrapLoaderTools,
      runtimeSharedBootstrapManagerTools: runtimeSharedBootstrapManagerTools,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: currentRuntimeShared,
      fallbackScopes: fallbackScopes
    };
    var result = attemptFactory(runtimeSharedBootstrapResolverTools && runtimeSharedBootstrapResolverTools.createRuntimeSharedBootstrapResult, resolverOptions);
    if (!result) {
      result = attemptFactory(runtimeSharedBootstrapLoaderTools && runtimeSharedBootstrapLoaderTools.resolveRuntimeSharedBootstrapResult, {
        bootstrapOptions: resolverOptions,
        runtimeSharedBootstrapInlineTools: runtimeSharedBootstrapInlineTools,
        resultTools: runtimeSharedBootstrapResultTools,
        requireFn: requireFn,
        inlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath,
        resultModulePath: options && options.runtimeSharedBootstrapResultRequirePath
      });
    }
    if (!result) {
      result = attemptFactory(runtimeSharedBootstrapResultTools && runtimeSharedBootstrapResultTools.createRuntimeSharedBootstrapResult, {
        bootstrapOptions: {
          runtimeSharedBootstrapTools: runtimeSharedBootstrapTools,
          runtimeSharedNamespaceTools: runtimeSharedNamespaceTools,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          currentRuntimeShared: currentRuntimeShared,
          fallbackScopes: fallbackScopes
        },
        runtimeSharedBootstrapInlineTools: runtimeSharedBootstrapInlineTools,
        requireFn: requireFn,
        inlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath
      });
    }
    if (!result && runtimeSharedBootstrapResultTools) {
      result = attemptFactory(runtimeSharedBootstrapResultTools.createRuntimeSharedBootstrapInlineFallback, {
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        currentRuntimeShared: currentRuntimeShared
      });
    }
    if (!result) {
      result = createRuntimeSharedBootstrapFallback({
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        currentRuntimeShared: currentRuntimeShared
      });
    }
    return result;
  }
  function createBootstrapSuite(options) {
    var normalizedOptions = normalizeBootstrapInvocationOptions(options);
    var baseRequireFn = normalizedOptions.requireFn;
    var bootstrapTools = resolveBootstrapTools(cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapNamespace || null)) || null;
    var bootstrapFallbackTools = resolveBootstrapFallbackTools(cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapFallbackNamespace || null)) || null;
    var bootstrapEnvironmentTools = resolveBootstrapEnvironmentTools(cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapEnvironmentNamespace || null)) || null;
    var bootstrapResultsTools = resolveBootstrapResultsTools(cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapResultsNamespace || null)) || null;
    function mergeOptions(overrides) {
      var merged = {
        resolveCoreSupportModule: normalizedOptions && typeof normalizedOptions.resolveCoreSupportModule === 'function' ? normalizedOptions.resolveCoreSupportModule : null,
        requireFn: baseRequireFn,
        runtimeScope: normalizedOptions && isObject(normalizedOptions.runtimeScope) ? normalizedOptions.runtimeScope : null,
        coreGlobalScope: normalizedOptions && isObject(normalizedOptions.coreGlobalScope) ? normalizedOptions.coreGlobalScope : null
      };
      var fallbackScopes = [];
      if (Array.isArray(normalizedOptions.fallbackScopes)) {
        for (var index = 0; index < normalizedOptions.fallbackScopes.length; index += 1) {
          fallbackScopes.push(normalizedOptions.fallbackScopes[index]);
        }
      }
      if (overrides && _typeof(overrides) === 'object') {
        var keys = Object.keys(overrides);
        for (var _index2 = 0; _index2 < keys.length; _index2 += 1) {
          var key = keys[_index2];
          if (key === 'fallbackScopes') {
            var overrideScopes = overrides[key];
            if (Array.isArray(overrideScopes)) {
              for (var fallbackIndex = 0; fallbackIndex < overrideScopes.length; fallbackIndex += 1) {
                fallbackScopes.push(overrideScopes[fallbackIndex]);
              }
            } else if (overrideScopes && isObject(overrideScopes)) {
              fallbackScopes.push(overrideScopes);
            }
            continue;
          }
          merged[key] = overrides[key];
        }
      }
      merged.fallbackScopes = fallbackScopes;
      return normalizeBootstrapInvocationOptions(merged);
    }
    function collectSuiteFallbackScopes(overrides) {
      var merged = mergeOptions(overrides);
      var fallbackScopes = ensureArray(merged.fallbackScopes);
      var runtimeScope = merged.runtimeScope;
      var coreGlobalScope = merged.coreGlobalScope;
      if (bootstrapResultsTools && typeof bootstrapResultsTools.collectBootstrapFallbackScopes === 'function') {
        var collectAdditionalFallbackScopes = bootstrapEnvironmentTools && typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function' ? function collectAdditional(scopes) {
          return bootstrapEnvironmentTools.collectFallbackScopes({
            fallbackScopes: Array.isArray(scopes) ? scopes : ensureArray(scopes),
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope
          });
        } : null;
        try {
          var collected = bootstrapResultsTools.collectBootstrapFallbackScopes({
            fallbackScopes: fallbackScopes,
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope,
            collectFallbackScopes: collectAdditionalFallbackScopes
          });
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (suiteCollectError) {
          void suiteCollectError;
        }
      }
      return collectBootstrapFallbackScopes({
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes
      });
    }
    function createBootstrapEnvironmentWithSuite(environmentOptions) {
      if (bootstrapEnvironmentTools && typeof bootstrapEnvironmentTools.createBootstrapEnvironment === 'function') {
        var invocationOptions = mergeOptions(environmentOptions);
        if (!invocationOptions.directResolverNamespace && normalizedOptions.directResolverNamespace) {
          invocationOptions.directResolverNamespace = normalizedOptions.directResolverNamespace;
        }
        if (!invocationOptions.directBootstrapNamespace && bootstrapTools) {
          invocationOptions.directBootstrapNamespace = bootstrapTools;
        }
        if (!invocationOptions.directBootstrapFallbackNamespace && bootstrapFallbackTools) {
          invocationOptions.directBootstrapFallbackNamespace = bootstrapFallbackTools;
        }
        try {
          return bootstrapEnvironmentTools.createBootstrapEnvironment(invocationOptions);
        } catch (environmentCreationError) {
          void environmentCreationError;
        }
      }
      return null;
    }
    function createLocalizationBootstrapResultWithSuite(resultOptions) {
      var invocationOptions = mergeOptions(resultOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(resultOptions);
      if (!invocationOptions.bootstrapTools && bootstrapTools) {
        invocationOptions.bootstrapTools = bootstrapTools;
      }
      if (!invocationOptions.bootstrapFallbackTools && bootstrapFallbackTools) {
        invocationOptions.bootstrapFallbackTools = bootstrapFallbackTools;
      }
      if (!invocationOptions.createInlineLocalizationFallback) {
        invocationOptions.createInlineLocalizationFallback = (bootstrapEnvironmentTools && typeof bootstrapEnvironmentTools.createInlineLocalizationFallback === 'function' ? bootstrapEnvironmentTools.createInlineLocalizationFallback : null) || (bootstrapTools && typeof bootstrapTools.createInlineLocalizationFallback === 'function' ? bootstrapTools.createInlineLocalizationFallback : createInlineLocalizationFallback);
      }
      if (bootstrapResultsTools && typeof bootstrapResultsTools.resolveLocalizationBootstrapResult === 'function') {
        try {
          var resolved = bootstrapResultsTools.resolveLocalizationBootstrapResult(invocationOptions);
          if (resolved && isObject(resolved)) {
            return resolved;
          }
        } catch (localizationResolveError) {
          void localizationResolveError;
        }
      }
      return createLocalizationBootstrapResult(invocationOptions);
    }
    function createLocalizationBootstrapFallbackWithSuite(fallbackOptions) {
      var invocationOptions = mergeOptions(fallbackOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(fallbackOptions);
      if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
        invocationOptions.fallbackTools = bootstrapFallbackTools;
      }
      if (bootstrapResultsTools && typeof bootstrapResultsTools.createLocalizationFallbackSkeleton === 'function') {
        try {
          var skeleton = bootstrapResultsTools.createLocalizationFallbackSkeleton(invocationOptions);
          if (skeleton && isObject(skeleton)) {
            return skeleton;
          }
        } catch (localizationFallbackSkeletonError) {
          void localizationFallbackSkeletonError;
        }
      }
      if (bootstrapFallbackTools && typeof bootstrapFallbackTools.createLocalizationBootstrapFallback === 'function') {
        try {
          var generated = bootstrapFallbackTools.createLocalizationBootstrapFallback(invocationOptions.localizationFallbackOptions || null);
          if (generated && isObject(generated)) {
            return generated;
          }
        } catch (localizationFallbackError) {
          void localizationFallbackError;
        }
      }
      return createLocalizationBootstrapFallback();
    }
    function createRuntimeSharedBootstrapResultWithSuite(resultOptions) {
      var invocationOptions = mergeOptions(resultOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(resultOptions);
      if (!invocationOptions.bootstrapTools && bootstrapTools) {
        invocationOptions.bootstrapTools = bootstrapTools;
      }
      if (!invocationOptions.bootstrapFallbackTools && bootstrapFallbackTools) {
        invocationOptions.bootstrapFallbackTools = bootstrapFallbackTools;
      }
      if (!invocationOptions.createInlineRuntimeSharedFallback) {
        invocationOptions.createInlineRuntimeSharedFallback = (bootstrapEnvironmentTools && typeof bootstrapEnvironmentTools.createInlineRuntimeSharedFallback === 'function' ? bootstrapEnvironmentTools.createInlineRuntimeSharedFallback : null) || (bootstrapTools && typeof bootstrapTools.createInlineRuntimeSharedFallback === 'function' ? bootstrapTools.createInlineRuntimeSharedFallback : createInlineRuntimeSharedFallback);
      }
      if (bootstrapResultsTools && typeof bootstrapResultsTools.resolveRuntimeSharedBootstrapResult === 'function') {
        try {
          var resolved = bootstrapResultsTools.resolveRuntimeSharedBootstrapResult(invocationOptions);
          if (resolved && isObject(resolved)) {
            return resolved;
          }
        } catch (runtimeSharedResolveError) {
          void runtimeSharedResolveError;
        }
      }
      return createRuntimeSharedBootstrapResult(invocationOptions);
    }
    function createRuntimeSharedBootstrapFallbackWithSuite(fallbackOptions) {
      var invocationOptions = mergeOptions(fallbackOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(fallbackOptions);
      if (bootstrapResultsTools && typeof bootstrapResultsTools.createRuntimeSharedFallbackSkeleton === 'function') {
        try {
          var skeleton = bootstrapResultsTools.createRuntimeSharedFallbackSkeleton(invocationOptions);
          if (skeleton && isObject(skeleton)) {
            return skeleton;
          }
        } catch (runtimeSharedFallbackSkeletonError) {
          void runtimeSharedFallbackSkeletonError;
        }
      }
      if (bootstrapFallbackTools && typeof bootstrapFallbackTools.createRuntimeSharedBootstrapFallback === 'function') {
        try {
          var generated = bootstrapFallbackTools.createRuntimeSharedBootstrapFallback(invocationOptions);
          if (generated && isObject(generated)) {
            return generated;
          }
        } catch (runtimeSharedFallbackError) {
          void runtimeSharedFallbackError;
        }
      }
      return createRuntimeSharedBootstrapFallback(invocationOptions);
    }
    function createInlineLocalizationFallbackWithSuite(options) {
      var invocationOptions = mergeOptions(options);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(options);
      if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
        invocationOptions.fallbackTools = bootstrapFallbackTools;
      }
      return createInlineLocalizationFallback(invocationOptions);
    }
    function createInlineRuntimeSharedFallbackWithSuite(options) {
      var invocationOptions = mergeOptions(options);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(options);
      if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
        invocationOptions.fallbackTools = bootstrapFallbackTools;
      }
      return createInlineRuntimeSharedFallback(invocationOptions);
    }
    var suite = {
      bootstrapTools: bootstrapTools,
      bootstrapFallbackTools: bootstrapFallbackTools,
      bootstrapEnvironmentTools: bootstrapEnvironmentTools,
      bootstrapResultsTools: bootstrapResultsTools,
      collectBootstrapFallbackScopes: collectSuiteFallbackScopes,
      createBootstrapEnvironment: createBootstrapEnvironmentWithSuite,
      createLocalizationBootstrapResult: createLocalizationBootstrapResultWithSuite,
      createLocalizationBootstrapFallback: createLocalizationBootstrapFallbackWithSuite,
      createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResultWithSuite,
      createRuntimeSharedBootstrapFallback: createRuntimeSharedBootstrapFallbackWithSuite,
      createInlineLocalizationFallback: createInlineLocalizationFallbackWithSuite,
      createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithSuite,
      resolveBootstrapTools: resolveBootstrapTools,
      resolveBootstrapFallbackTools: resolveBootstrapFallbackTools,
      resolveBootstrapEnvironmentTools: resolveBootstrapEnvironmentTools,
      resolveBootstrapResultsTools: resolveBootstrapResultsTools
    };
    try {
      suite.bootstrapEnvironment = createBootstrapEnvironmentWithSuite(normalizedOptions.bootstrapEnvironmentOptions || null);
    } catch (bootstrapEnvironmentError) {
      void bootstrapEnvironmentError;
      suite.bootstrapEnvironment = null;
    }
    return suite;
  }
  var namespace = {
    createLocalizationBootstrapResult: createLocalizationBootstrapResult,
    createLocalizationBootstrapFallback: createLocalizationBootstrapFallback,
    createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapFallback: createRuntimeSharedBootstrapFallback,
    normalizeBootstrapInvocationOptions: normalizeBootstrapInvocationOptions,
    collectBootstrapFallbackScopes: collectBootstrapFallbackScopes,
    resolveBootstrapTools: resolveBootstrapTools,
    resolveBootstrapFallbackTools: resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools: resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools: resolveBootstrapResultsTools,
    createInlineLocalizationFallback: createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallback,
    createBootstrapSuite: createBootstrapSuite,
    resolveBootstrapResolverTools: resolveBootstrapResolverTools,
    createBootstrapEnvironment: createBootstrapEnvironment
  };
  var fallbackNamespace = {
    createLocalizationBootstrapFallback: createLocalizationBootstrapFallback,
    createRuntimeSharedBootstrapFallback: createRuntimeSharedBootstrapFallback
  };
  var environmentNamespace = {
    createBootstrapEnvironment: createBootstrapEnvironment,
    resolveBootstrapResolverTools: resolveBootstrapResolverTools,
    resolveBootstrapTools: resolveBootstrapToolsWithResolver,
    resolveBootstrapFallbackTools: resolveBootstrapFallbackToolsWithResolver,
    createInlineLocalizationFallback: createInlineLocalizationFallbackWithResolver,
    createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithResolver,
    collectFallbackScopes: collectEnvironmentFallbackScopes,
    normalizeBootstrapInvocationOptions: normalizeBootstrapInvocationOptions
  };
  var resultsNamespace = {
    resolveLocalizationBootstrapResult: resolveLocalizationBootstrapResult,
    resolveRuntimeSharedBootstrapResult: resolveRuntimeSharedBootstrapResult,
    collectBootstrapFallbackScopes: function collectBootstrapFallbackScopes(options) {
      return collectResultsFallbackScopes(options || null);
    },
    createLocalizationFallbackSkeleton: createLocalizationFallbackSkeleton,
    createRuntimeSharedFallbackSkeleton: createRuntimeSharedFallbackSkeleton
  };
  var namespaceName = 'cineCoreAppCoreBootstrap';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  var fallbackNamespaceName = 'cineCoreAppCoreBootstrapFallbacks';
  var existingFallbacks = isObject(globalScope) && isObject(globalScope[fallbackNamespaceName]) ? globalScope[fallbackNamespaceName] : {};
  Object.assign(existingFallbacks, fallbackNamespace);
  var environmentNamespaceName = 'cineCoreAppCoreBootstrapEnvironment';
  var existingEnvironment = isObject(globalScope) && isObject(globalScope[environmentNamespaceName]) ? globalScope[environmentNamespaceName] : {};
  Object.assign(existingEnvironment, environmentNamespace);
  var resultsNamespaceName = 'cineCoreAppCoreBootstrapResults';
  var existingResults = isObject(globalScope) && isObject(globalScope[resultsNamespaceName]) ? globalScope[resultsNamespaceName] : {};
  Object.assign(existingResults, resultsNamespace);
  var resolverNamespace = {
    resolveBootstrapTools: resolveBootstrapTools,
    resolveBootstrapFallbackTools: resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools: resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools: resolveBootstrapResultsTools,
    resolveBootstrapResolverTools: resolveBootstrapResolverTools,
    createInlineLocalizationFallback: createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallback,
    createBootstrapSuite: createBootstrapSuite,
    normalizeBootstrapInvocationOptions: normalizeBootstrapInvocationOptions
  };
  var resolverNamespaceName = 'cineCoreAppCoreBootstrapResolver';
  var existingResolver = isObject(globalScope) && isObject(globalScope[resolverNamespaceName]) ? globalScope[resolverNamespaceName] : existing;
  Object.assign(existingResolver, resolverNamespace);
  if (isObject(existing)) {
    existing.fallbacks = isObject(existing.fallbacks) ? Object.assign(existing.fallbacks, fallbackNamespace) : existingFallbacks;
    existing.environment = isObject(existing.environment) ? Object.assign(existing.environment, environmentNamespace) : existingEnvironment;
    existing.results = isObject(existing.results) ? Object.assign(existing.results, resultsNamespace) : existingResults;
    existing.resolver = isObject(existing.resolver) ? Object.assign(existing.resolver, resolverNamespace) : existingResolver;
  }
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
    try {
      globalScope[resolverNamespaceName] = existingResolver;
    } catch (resolverAssignError) {
      void resolverAssignError;
    }
    try {
      globalScope[fallbackNamespaceName] = existingFallbacks;
    } catch (fallbackAssignError) {
      void fallbackAssignError;
    }
    try {
      globalScope[environmentNamespaceName] = existingEnvironment;
    } catch (environmentAssignError) {
      void environmentAssignError;
    }
    try {
      globalScope[resultsNamespaceName] = existingResults;
    } catch (resultsAssignError) {
      void resultsAssignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})(typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || null);