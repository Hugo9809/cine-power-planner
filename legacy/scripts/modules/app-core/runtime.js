function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  function resolveRuntimeModuleLoader() {
    if (typeof require === 'function') {
      try {
        var requiredLoader = require('../core/runtime-module-loader.js');
        if (requiredLoader && _typeof(requiredLoader) === 'object') {
          return requiredLoader;
        }
      } catch (runtimeLoaderError) {
        void runtimeLoaderError;
      }
    }
    if (
      typeof cineCoreRuntimeModuleLoader !== 'undefined' &&
      cineCoreRuntimeModuleLoader &&
      _typeof(cineCoreRuntimeModuleLoader) === 'object'
    ) {
      return cineCoreRuntimeModuleLoader;
    }
    var scope = detectScope();
    if (
      scope &&
      _typeof(scope.cineCoreRuntimeModuleLoader) === 'object' &&
      scope.cineCoreRuntimeModuleLoader
    ) {
      return scope.cineCoreRuntimeModuleLoader;
    }
    return null;
  }
  function requireCoreRuntimeModule(moduleId, options) {
    var loader = resolveRuntimeModuleLoader();
    if (loader && typeof loader.resolveCoreRuntimeModule === 'function') {
      try {
        return loader.resolveCoreRuntimeModule(moduleId, options);
      } catch (moduleResolutionError) {
        void moduleResolutionError;
      }
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
  function resolveRuntimeShared(options) {
    var currentShared = options && isObject(options.currentShared) ? options.currentShared : null;
    if (currentShared) {
      return currentShared;
    }
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var shared = null;
    if (resolveCoreSupportModule) {
      try {
        shared = resolveCoreSupportModule('cineCoreRuntimeShared', './modules/core/runtime-shared.js');
      } catch (runtimeSharedResolveError) {
        void runtimeSharedResolveError;
        shared = null;
      }
    }
    if (!isObject(shared)) {
      var loaderShared = requireCoreRuntimeModule('modules/core/runtime-shared.js', {
        primaryScope: runtimeScope || coreGlobalScope
      });
      if (isObject(loaderShared)) {
        shared = loaderShared;
      }
    }
    if (isObject(shared)) {
      return shared;
    }
    var fallbackScopes = collectCandidateScopes(coreGlobalScope, runtimeScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      try {
        var candidate = scope && scope.cineCoreRuntimeShared;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (runtimeSharedLookupError) {
        void runtimeSharedLookupError;
      }
    }
    return null;
  }
  var namespace = {
    resolveRuntimeShared: resolveRuntimeShared
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppRuntimeShared';
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
  function createFallbackScopeList(runtimeScope, coreGlobalScope) {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function push(scope) {
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
    push(runtimeScope);
    push(coreGlobalScope);
    push(typeof globalThis !== 'undefined' ? globalThis : null);
    push(typeof window !== 'undefined' ? window : null);
    push(typeof self !== 'undefined' ? self : null);
    push(typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function attemptResolveRuntimeSharedNamespaceFromScope(scope, namespaceOptions) {
    if (!isObject(scope)) {
      return null;
    }
    try {
      var _namespace = scope.cineCoreAppRuntimeSharedNamespace;
      if (isObject(_namespace) && typeof _namespace.createRuntimeSharedNamespace === 'function') {
        return _namespace.createRuntimeSharedNamespace(namespaceOptions);
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
    return null;
  }
  function createInlineRuntimeSharedNamespace(namespaceOptions, fallbackScopes) {
    var options = namespaceOptions || {};
    var requireFn = ensureRequireFn(options.requireFn);
    if (typeof requireFn === 'function') {
      try {
        var requiredNamespace = requireFn('./modules/app-core/runtime.js');
        if (isObject(requiredNamespace) && typeof requiredNamespace.createRuntimeSharedNamespace === 'function') {
          return requiredNamespace.createRuntimeSharedNamespace(options);
        }
      } catch (runtimeSharedNamespaceRequireError) {
        void runtimeSharedNamespaceRequireError;
      }
    }
    var scopes = Array.isArray(fallbackScopes) ? fallbackScopes : [];
    for (var index = 0; index < scopes.length; index += 1) {
      var _namespace2 = attemptResolveRuntimeSharedNamespaceFromScope(scopes[index], options);
      if (_namespace2) {
        return _namespace2;
      }
    }
    function minimalFallbackResolveRuntimeSharedFromGlobal() {
      for (var _index = 0; _index < scopes.length; _index += 1) {
        var scope = scopes[_index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    }
    var existingRuntimeShared = isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    var resolvedRuntimeShared = existingRuntimeShared || minimalFallbackResolveRuntimeSharedFromGlobal();
    return {
      runtimeShared: isObject(resolvedRuntimeShared) ? resolvedRuntimeShared : Object.create(null),
      existingRuntimeShared: isObject(resolvedRuntimeShared) ? resolvedRuntimeShared : existingRuntimeShared,
      runtimeSharedResolver: null,
      fallbackResolveRuntimeSharedFromGlobal: minimalFallbackResolveRuntimeSharedFromGlobal
    };
  }
  function createFallbackResolveRuntimeSharedFromGlobal(runtimeSharedNamespace, fallbackScopes) {
    var scopes = Array.isArray(fallbackScopes) ? fallbackScopes : [];
    return function fallbackResolveRuntimeSharedFromGlobal() {
      if (runtimeSharedNamespace && typeof runtimeSharedNamespace.fallbackResolveRuntimeSharedFromGlobal === 'function') {
        try {
          var resolved = runtimeSharedNamespace.fallbackResolveRuntimeSharedFromGlobal();
          if (isObject(resolved)) {
            return resolved;
          }
        } catch (runtimeSharedFallbackError) {
          void runtimeSharedFallbackError;
        }
      }
      for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    };
  }
  function createRuntimeSharedBootstrap(options) {
    var runtimeSharedNamespaceTools = options && options.runtimeSharedNamespaceTools;
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = isObject(options && options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = isObject(options && options.coreGlobalScope) ? options.coreGlobalScope : null;
    var currentRuntimeShared = isObject(options && options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    var fallbackScopes = createFallbackScopeList(runtimeScope, coreGlobalScope);
    var namespaceOptions = {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: currentRuntimeShared
    };
    var runtimeSharedNamespace = null;
    if (runtimeSharedNamespaceTools && typeof runtimeSharedNamespaceTools.createRuntimeSharedNamespace === 'function') {
      try {
        runtimeSharedNamespace = runtimeSharedNamespaceTools.createRuntimeSharedNamespace(namespaceOptions);
      } catch (namespaceCreationError) {
        void namespaceCreationError;
        runtimeSharedNamespace = null;
      }
    }
    if (!runtimeSharedNamespace) {
      runtimeSharedNamespace = createInlineRuntimeSharedNamespace(namespaceOptions, fallbackScopes);
    }
    var runtimeSharedResolver = runtimeSharedNamespace && typeof runtimeSharedNamespace.runtimeSharedResolver === 'function' ? runtimeSharedNamespace.runtimeSharedResolver : null;
    var existingRuntimeShared = runtimeSharedNamespace && isObject(runtimeSharedNamespace.existingRuntimeShared) ? runtimeSharedNamespace.existingRuntimeShared : currentRuntimeShared;
    var fallbackResolveRuntimeSharedFromGlobal = createFallbackResolveRuntimeSharedFromGlobal(runtimeSharedNamespace, fallbackScopes);
    var runtimeShared = runtimeSharedNamespace && isObject(runtimeSharedNamespace.runtimeShared) ? runtimeSharedNamespace.runtimeShared : null;
    if (!isObject(runtimeShared) && isObject(existingRuntimeShared)) {
      runtimeShared = existingRuntimeShared;
    }
    if (!isObject(runtimeShared) && typeof runtimeSharedResolver === 'function') {
      try {
        var resolved = runtimeSharedResolver({
          currentShared: existingRuntimeShared,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope
        });
        if (isObject(resolved)) {
          runtimeShared = resolved;
        }
      } catch (resolveError) {
        void resolveError;
      }
    }
    if (!isObject(runtimeShared)) {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
      if (!isObject(runtimeShared)) {
        runtimeShared = Object.create(null);
      }
    }
    return {
      runtimeSharedNamespace: runtimeSharedNamespace,
      runtimeSharedResolver: runtimeSharedResolver,
      existingRuntimeShared: isObject(existingRuntimeShared) ? existingRuntimeShared : runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal,
      fallbackScopes: fallbackScopes
    };
  }
  var namespace = {
    createRuntimeSharedBootstrap: createRuntimeSharedBootstrap
  };
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrap';
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
  function fallbackResolveRuntimeSharedFromGlobal(scopes) {
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreRuntimeShared;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (runtimeSharedLookupError) {
        void runtimeSharedLookupError;
      }
    }
    return null;
  }
  function ensureRuntimeSharedBootstrapResolver(tools) {
    if (tools && typeof tools.createRuntimeSharedBootstrapResult === 'function') {
      return tools.createRuntimeSharedBootstrapResult;
    }
    return null;
  }
  function createRuntimeSharedBootstrapContext(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var fallbackScopes = ensureFallbackScopes(options && options.fallbackScopes, runtimeScope, coreGlobalScope);
    var createRuntimeSharedBootstrapResult = ensureRuntimeSharedBootstrapResolver(options && options.runtimeSharedBootstrapResolverTools);
    var existingRuntimeSharedCandidate = isObject(options && options.currentRuntimeShared) ? options.currentRuntimeShared : null;
    var runtimeSharedBootstrapResult = null;
    if (createRuntimeSharedBootstrapResult) {
      try {
        runtimeSharedBootstrapResult = createRuntimeSharedBootstrapResult({
          runtimeSharedBootstrapTools: options && options.runtimeSharedBootstrapTools,
          runtimeSharedNamespaceTools: options && options.runtimeSharedNamespaceTools,
          runtimeSharedBootstrapInlineTools: options && options.runtimeSharedBootstrapInlineTools,
          runtimeSharedBootstrapResultTools: options && options.runtimeSharedBootstrapResultTools,
          runtimeSharedBootstrapLoaderTools: options && options.runtimeSharedBootstrapLoaderTools,
          runtimeSharedBootstrapManagerTools: options && options.runtimeSharedBootstrapManagerTools,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          currentRuntimeShared: existingRuntimeSharedCandidate,
          fallbackScopes: fallbackScopes
        });
      } catch (runtimeSharedBootstrapResolverError) {
        void runtimeSharedBootstrapResolverError;
      }
    }
    var runtimeSharedNamespace = runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.runtimeSharedNamespace ? runtimeSharedBootstrapResult.runtimeSharedNamespace : null;
    var runtimeSharedResolver = runtimeSharedBootstrapResult && typeof runtimeSharedBootstrapResult.runtimeSharedResolver === 'function' ? runtimeSharedBootstrapResult.runtimeSharedResolver : null;
    var existingRuntimeShared = (runtimeSharedBootstrapResult && isObject(runtimeSharedBootstrapResult.existingRuntimeShared) ? runtimeSharedBootstrapResult.existingRuntimeShared : null) || existingRuntimeSharedCandidate;
    var resolveRuntimeSharedFromGlobal = runtimeSharedBootstrapResult && typeof runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal === 'function' ? runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal : function fallbackRuntimeSharedResolver() {
      return fallbackResolveRuntimeSharedFromGlobal(fallbackScopes);
    };
    var runtimeShared = runtimeSharedBootstrapResult && isObject(runtimeSharedBootstrapResult.runtimeShared) ? runtimeSharedBootstrapResult.runtimeShared : null;
    if (!runtimeShared && isObject(existingRuntimeShared)) {
      runtimeShared = existingRuntimeShared;
    }
    if (!runtimeShared && runtimeSharedResolver) {
      try {
        var resolved = runtimeSharedResolver({
          currentShared: existingRuntimeShared,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope
        });
        if (isObject(resolved)) {
          runtimeShared = resolved;
        }
      } catch (runtimeSharedResolverError) {
        void runtimeSharedResolverError;
      }
    }
    if (!runtimeShared) {
      runtimeShared = resolveRuntimeSharedFromGlobal();
    }
    if (!isObject(runtimeShared)) {
      try {
        runtimeShared = Object.create(null);
      } catch (runtimeSharedCreationError) {
        void runtimeSharedCreationError;
        runtimeShared = {};
      }
    }
    return {
      runtimeSharedNamespace: runtimeSharedNamespace,
      runtimeSharedResolver: runtimeSharedResolver,
      existingRuntimeShared: existingRuntimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: resolveRuntimeSharedFromGlobal
    };
  }
  var namespace = {
    createRuntimeSharedBootstrapContext: createRuntimeSharedBootstrapContext
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrapContext';
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
  function attemptRuntimeSharedBootstrap(tools, runtimeOptions) {
    if (!isObject(tools)) {
      return null;
    }
    var createRuntimeSharedBootstrap = tools.createRuntimeSharedBootstrap;
    if (typeof createRuntimeSharedBootstrap !== 'function') {
      return null;
    }
    try {
      return createRuntimeSharedBootstrap(runtimeOptions);
    } catch (runtimeSharedBootstrapError) {
      void runtimeSharedBootstrapError;
    }
    return null;
  }
  function attemptRuntimeSharedBootstrapWithRequire(requireFn, runtimeOptions, candidatePaths) {
    if (typeof requireFn !== 'function') {
      return null;
    }
    var paths = Array.isArray(candidatePaths) && candidatePaths.length ? candidatePaths : ['./modules/app-core/runtime.js', './runtime.js'];
    for (var index = 0; index < paths.length; index += 1) {
      var path = paths[index];
      if (typeof path !== 'string' || !path) {
        continue;
      }
      try {
        var required = requireFn(path);
        if (isObject(required) && typeof required.createRuntimeSharedBootstrap === 'function') {
          return required.createRuntimeSharedBootstrap(runtimeOptions);
        }
      } catch (runtimeSharedBootstrapRequireError) {
        void runtimeSharedBootstrapRequireError;
      }
    }
    return null;
  }
  function appendScope(scopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }
    if (!isObject(scope)) {
      return;
    }
    if (scopes.indexOf(scope) !== -1) {
      return;
    }
    scopes.push(scope);
  }
  function gatherFallbackScopes(options) {
    var scopes = [];
    appendScope(scopes, options && options.runtimeScope);
    appendScope(scopes, options && options.coreGlobalScope);
    var optionFallbacks = options && options.fallbackScopes;
    if (Array.isArray(optionFallbacks)) {
      for (var index = 0; index < optionFallbacks.length; index += 1) {
        appendScope(scopes, optionFallbacks[index]);
      }
    }
    appendScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    appendScope(scopes, typeof window !== 'undefined' ? window : null);
    appendScope(scopes, typeof self !== 'undefined' ? self : null);
    appendScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function createScopedRuntimeSharedResolver(scopes) {
    return function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    };
  }
  function ensureRuntimeShared(candidate, fallbackResolve) {
    if (isObject(candidate)) {
      return candidate;
    }
    var fallbackCandidate = typeof fallbackResolve === 'function' ? fallbackResolve() : null;
    if (isObject(fallbackCandidate)) {
      return fallbackCandidate;
    }
    try {
      return Object.create(null);
    } catch (createError) {
      void createError;
    }
    return {};
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
  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }
    return detectGlobalScope(fallbackScope);
  }
  function createRuntimeSharedBootstrapResult(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var runtimeOptions = {
      runtimeSharedNamespaceTools: options && options.runtimeSharedNamespaceTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: options && options.currentRuntimeShared
    };
    var runtimeSharedBootstrapTools = options && options.runtimeSharedBootstrapTools;
    var runtimeSharedBootstrapResult = attemptRuntimeSharedBootstrap(runtimeSharedBootstrapTools, runtimeOptions) || attemptRuntimeSharedBootstrapWithRequire(requireFn, runtimeOptions, options && options.requirePaths);
    if (runtimeSharedBootstrapResult) {
      return runtimeSharedBootstrapResult;
    }
    var fallbackScopes = gatherFallbackScopes({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes
    });
    var fallbackResolve = createScopedRuntimeSharedResolver(fallbackScopes);
    var runtimeShared = ensureRuntimeShared(options && options.currentRuntimeShared, fallbackResolve);
    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolve
    };
  }
  var namespace = {
    createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResult
  };
  var globalScope = detectGlobalScope();
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrapInline';
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
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function appendUniqueScope(scopes, scope, seen) {
    if (!Array.isArray(scopes)) {
      return;
    }
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
  function createRuntimeSharedBootstrapInlineFallback(options) {
    var fallbackScopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    appendUniqueScope(fallbackScopes, options && options.runtimeScope, seen);
    appendUniqueScope(fallbackScopes, options && options.coreGlobalScope, seen);
    if (Array.isArray(options && options.fallbackScopes)) {
      for (var index = 0; index < options.fallbackScopes.length; index += 1) {
        appendUniqueScope(fallbackScopes, options.fallbackScopes[index], seen);
      }
    }
    appendUniqueScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null, seen);
    appendUniqueScope(fallbackScopes, typeof window !== 'undefined' ? window : null, seen);
    appendUniqueScope(fallbackScopes, typeof self !== 'undefined' ? self : null, seen);
    appendUniqueScope(fallbackScopes, typeof global !== 'undefined' ? global : null, seen);
    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var _index2 = 0; _index2 < fallbackScopes.length; _index2 += 1) {
        var _scope = fallbackScopes[_index2];
        if (!isObject(_scope)) {
          continue;
        }
        try {
          var candidate = _scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    }
    var existingRuntimeShared = isObject(options && options.currentRuntimeShared) ? options.currentRuntimeShared : fallbackResolveRuntimeSharedFromGlobal();
    var runtimeShared = isObject(existingRuntimeShared) ? existingRuntimeShared : null;
    if (!runtimeShared) {
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
  function ensureBootstrapOptions(options, requireFn) {
    var source = isObject(options) ? options : {};
    var bootstrapOptions = Object.assign({}, source);
    if (!('requireFn' in bootstrapOptions)) {
      bootstrapOptions.requireFn = requireFn;
    }
    return bootstrapOptions;
  }
  function attemptResolveWithTools(candidate, context) {
    if (!isObject(candidate)) {
      return null;
    }
    var factory = candidate.createRuntimeSharedBootstrapResult;
    if (typeof factory !== 'function') {
      return null;
    }
    try {
      var result = factory({
        bootstrapOptions: context.bootstrapOptions,
        runtimeSharedBootstrapInlineTools: context.runtimeSharedBootstrapInlineTools,
        requireFn: context.requireFn,
        inlineRequirePath: context.inlineRequirePath
      });
      return isObject(result) ? result : null;
    } catch (runtimeSharedBootstrapResultError) {
      void runtimeSharedBootstrapResultError;
    }
    return null;
  }
  function ensureFallbackCreator(resultTools, requireFn, resultModulePath) {
    var fallbackCreator = resultTools && typeof resultTools.createRuntimeSharedBootstrapInlineFallback === 'function' ? resultTools.createRuntimeSharedBootstrapInlineFallback : null;
    if (!fallbackCreator && typeof requireFn === 'function') {
      try {
        var requiredModule = requireFn(resultModulePath);
        if (isObject(requiredModule) && typeof requiredModule.createRuntimeSharedBootstrapInlineFallback === 'function') {
          fallbackCreator = requiredModule.createRuntimeSharedBootstrapInlineFallback;
        }
      } catch (runtimeSharedBootstrapFallbackRequireError) {
        void runtimeSharedBootstrapFallbackRequireError;
      }
    }
    return typeof fallbackCreator === 'function' ? fallbackCreator : null;
  }
  function resolveRuntimeSharedBootstrapResult(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var inlineRequirePath = options && typeof options.inlineRequirePath === 'string' && options.inlineRequirePath ? options.inlineRequirePath : './modules/app-core/runtime.js';
    var resultModulePath = options && typeof options.resultModulePath === 'string' && options.resultModulePath ? options.resultModulePath : './modules/app-core/runtime.js';
    var bootstrapOptions = ensureBootstrapOptions(options && options.bootstrapOptions, requireFn);
    var runtimeSharedBootstrapInlineTools = isObject(options && options.runtimeSharedBootstrapInlineTools) ? options.runtimeSharedBootstrapInlineTools : null;
    var resultTools = isObject(options && options.resultTools) ? options.resultTools : null;
    var context = {
      bootstrapOptions: bootstrapOptions,
      runtimeSharedBootstrapInlineTools: runtimeSharedBootstrapInlineTools,
      requireFn: requireFn,
      inlineRequirePath: inlineRequirePath
    };
    var result = attemptResolveWithTools(resultTools, context);
    if (!result && typeof requireFn === 'function') {
      try {
        var requiredModule = requireFn(resultModulePath);
        result = attemptResolveWithTools(requiredModule, context);
      } catch (runtimeSharedBootstrapResultRequireError) {
        void runtimeSharedBootstrapResultRequireError;
      }
    }
    if (!result) {
      var fallbackCreator = ensureFallbackCreator(resultTools, requireFn, resultModulePath);
      if (fallbackCreator) {
        try {
          result = fallbackCreator(bootstrapOptions);
        } catch (runtimeSharedBootstrapFallbackError) {
          void runtimeSharedBootstrapFallbackError;
          result = null;
        }
      }
    }
    if (!isObject(result)) {
      result = createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
    }
    return result;
  }
  var namespace = {
    resolveRuntimeSharedBootstrapResult: resolveRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapInlineFallback: createRuntimeSharedBootstrapInlineFallback
  };
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrapLoader';
  var scope = function detectScope() {
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
  }();
  var existing = isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(scope)) {
    try {
      scope[namespaceName] = existing;
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
  function createFallbackScopeList() {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function append(scope) {
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
    for (var index = 0; index < arguments.length; index += 1) {
      append(arguments[index]);
    }
    return scopes;
  }
  function attemptResolveRuntimeSharedBootstrapResult(candidate, loaderOptions) {
    if (!isObject(candidate)) {
      return null;
    }
    var resolver = typeof candidate.resolveRuntimeSharedBootstrapResult === 'function' ? candidate.resolveRuntimeSharedBootstrapResult : null;
    if (!resolver) {
      return null;
    }
    try {
      var result = resolver(loaderOptions);
      return isObject(result) ? result : null;
    } catch (runtimeSharedBootstrapError) {
      void runtimeSharedBootstrapError;
    }
    return null;
  }
  function createInlineFallbackResult(bootstrapOptions) {
    var fallbackScopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function appendScope(scope) {
      if (!isObject(scope)) {
        return;
      }
      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
        fallbackScopes.push(scope);
        return;
      }
      if (fallbackScopes.indexOf(scope) !== -1) {
        return;
      }
      fallbackScopes.push(scope);
    }
    if (bootstrapOptions) {
      appendScope(bootstrapOptions.runtimeScope);
      appendScope(bootstrapOptions.coreGlobalScope);
      var optionFallbackScopes = bootstrapOptions && Array.isArray(bootstrapOptions.fallbackScopes) ? bootstrapOptions.fallbackScopes : null;
      if (optionFallbackScopes) {
        for (var index = 0; index < optionFallbackScopes.length; index += 1) {
          appendScope(optionFallbackScopes[index]);
        }
      }
    }
    appendScope(typeof globalThis !== 'undefined' ? globalThis : null);
    appendScope(typeof window !== 'undefined' ? window : null);
    appendScope(typeof self !== 'undefined' ? self : null);
    appendScope(typeof global !== 'undefined' ? global : null);
    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var _index3 = 0; _index3 < fallbackScopes.length; _index3 += 1) {
        var scope = fallbackScopes[_index3];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    }
    var existingRuntimeShared = (bootstrapOptions && isObject(bootstrapOptions.currentRuntimeShared) ? bootstrapOptions.currentRuntimeShared : null) || fallbackResolveRuntimeSharedFromGlobal();
    var runtimeShared = existingRuntimeShared;
    if (!isObject(runtimeShared)) {
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
      existingRuntimeShared: isObject(runtimeShared) ? runtimeShared : null,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal
    };
  }
  function createRuntimeSharedBootstrapResult(options) {
    var normalizedOptions = options && _typeof(options) === 'object' ? options : {};
    var bootstrapOptions = normalizedOptions.bootstrapOptions && _typeof(normalizedOptions.bootstrapOptions) === 'object' ? normalizedOptions.bootstrapOptions : {};
    var loaderOptions = normalizedOptions.loaderOptions && _typeof(normalizedOptions.loaderOptions) === 'object' ? normalizedOptions.loaderOptions : {};
    var loaderTools = normalizedOptions.loaderTools || null;
    var inlineTools = normalizedOptions.inlineTools || loaderOptions.runtimeSharedBootstrapInlineTools || null;
    var resultTools = normalizedOptions.resultTools || loaderOptions.resultTools || null;
    var requireFn = ensureRequireFn(normalizedOptions.requireFn || bootstrapOptions.requireFn || loaderOptions.requireFn);
    var loaderModulePath = typeof normalizedOptions.loaderModulePath === 'string' ? normalizedOptions.loaderModulePath : typeof loaderOptions.loaderModulePath === 'string' ? loaderOptions.loaderModulePath : './modules/app-core/runtime.js';
    var resultModulePath = typeof normalizedOptions.resultModulePath === 'string' ? normalizedOptions.resultModulePath : typeof loaderOptions.resultModulePath === 'string' ? loaderOptions.resultModulePath : './modules/app-core/runtime.js';
    var inlineModulePath = typeof normalizedOptions.inlineModulePath === 'string' ? normalizedOptions.inlineModulePath : typeof loaderOptions.inlineRequirePath === 'string' ? loaderOptions.inlineRequirePath : './modules/app-core/runtime.js';
    var fallbackScopes = Array.isArray(normalizedOptions.fallbackScopes) ? normalizedOptions.fallbackScopes : createFallbackScopeList(bootstrapOptions.runtimeScope, bootstrapOptions.coreGlobalScope, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null);
    var loaderNamespaceCandidates = Array.isArray(normalizedOptions.loaderNamespaceCandidates) ? normalizedOptions.loaderNamespaceCandidates : fallbackScopes;
    var effectiveLoaderOptions = Object.assign({
      bootstrapOptions: bootstrapOptions,
      runtimeSharedBootstrapInlineTools: inlineTools,
      resultTools: resultTools,
      inlineRequirePath: inlineModulePath,
      resultModulePath: resultModulePath,
      requireFn: requireFn
    }, loaderOptions);
    function requireModule(modulePath) {
      if (typeof requireFn !== 'function') {
        return null;
      }
      try {
        return requireFn(modulePath);
      } catch (requireError) {
        void requireError;
      }
      return null;
    }
    var result = attemptResolveRuntimeSharedBootstrapResult(loaderTools, effectiveLoaderOptions);
    if (!result) {
      var requiredLoader = requireModule(loaderModulePath);
      result = attemptResolveRuntimeSharedBootstrapResult(requiredLoader, effectiveLoaderOptions);
    }
    if (!result) {
      for (var index = 0; index < loaderNamespaceCandidates.length; index += 1) {
        var scope = loaderNamespaceCandidates[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreAppRuntimeSharedBootstrapLoader;
          result = attemptResolveRuntimeSharedBootstrapResult(candidate, effectiveLoaderOptions);
        } catch (runtimeSharedBootstrapLoaderLookupError) {
          void runtimeSharedBootstrapLoaderLookupError;
        }
        if (result) {
          break;
        }
      }
    }
    if (!isObject(result)) {
      var fallbackCreator = (isObject(loaderTools) && typeof loaderTools.createRuntimeSharedBootstrapInlineFallback === 'function' ? loaderTools.createRuntimeSharedBootstrapInlineFallback : null) || (isObject(resultTools) && typeof resultTools.createRuntimeSharedBootstrapInlineFallback === 'function' ? resultTools.createRuntimeSharedBootstrapInlineFallback : null);
      if (typeof fallbackCreator === 'function') {
        try {
          result = fallbackCreator(bootstrapOptions);
        } catch (runtimeSharedBootstrapInlineFallbackError) {
          void runtimeSharedBootstrapInlineFallbackError;
          result = null;
        }
      }
    }
    if (!isObject(result)) {
      var _requiredLoader = requireModule(loaderModulePath);
      if (isObject(_requiredLoader) && typeof _requiredLoader.createRuntimeSharedBootstrapInlineFallback === 'function') {
        try {
          result = _requiredLoader.createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
        } catch (runtimeSharedBootstrapLoaderFallbackRequireError) {
          void runtimeSharedBootstrapLoaderFallbackRequireError;
        }
      }
    }
    if (!isObject(result)) {
      var requiredResultModule = requireModule(resultModulePath);
      if (isObject(requiredResultModule) && typeof requiredResultModule.createRuntimeSharedBootstrapInlineFallback === 'function') {
        try {
          result = requiredResultModule.createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
        } catch (runtimeSharedBootstrapResultFallbackRequireError) {
          void runtimeSharedBootstrapResultFallbackRequireError;
        }
      }
    }
    if (!isObject(result)) {
      var requiredInlineModule = requireModule(inlineModulePath);
      if (isObject(requiredInlineModule) && typeof requiredInlineModule.createRuntimeSharedBootstrapInlineFallback === 'function') {
        try {
          result = requiredInlineModule.createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
        } catch (runtimeSharedBootstrapInlineModuleError) {
          void runtimeSharedBootstrapInlineModuleError;
        }
      }
    }
    if (!isObject(result)) {
      result = createInlineFallbackResult(bootstrapOptions);
    }
    return result;
  }
  var namespace = {
    createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResult
  };
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrapManager';
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
  function normalizeScope(value) {
    return typeof value !== 'undefined' ? value : null;
  }
  function createFallbackResolveRuntimeSharedFromGlobal(scopes) {
    return function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (candidate && _typeof(candidate) === 'object') {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    };
  }
  function attemptResolveWithManager(candidate, managerOptions) {
    if (!isObject(candidate)) {
      return null;
    }
    var creator = typeof candidate.createRuntimeSharedBootstrapResult === 'function' ? candidate.createRuntimeSharedBootstrapResult : null;
    if (!creator) {
      return null;
    }
    try {
      var result = creator(managerOptions);
      return result && _typeof(result) === 'object' ? result : null;
    } catch (runtimeSharedBootstrapManagerError) {
      void runtimeSharedBootstrapManagerError;
    }
    return null;
  }
  function createInlineFallbackResult(bootstrapOptions) {
    var fallbackScopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function append(scope) {
      if (!isObject(scope)) {
        return;
      }
      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
        fallbackScopes.push(scope);
        return;
      }
      if (fallbackScopes.indexOf(scope) !== -1) {
        return;
      }
      fallbackScopes.push(scope);
    }
    append(bootstrapOptions.runtimeScope);
    append(bootstrapOptions.coreGlobalScope);
    if (Array.isArray(bootstrapOptions.fallbackScopes)) {
      for (var index = 0; index < bootstrapOptions.fallbackScopes.length; index += 1) {
        append(bootstrapOptions.fallbackScopes[index]);
      }
    }
    append(typeof globalThis !== 'undefined' ? globalThis : null);
    append(typeof window !== 'undefined' ? window : null);
    append(typeof self !== 'undefined' ? self : null);
    append(typeof global !== 'undefined' ? global : null);
    var fallbackResolveRuntimeSharedFromGlobal = createFallbackResolveRuntimeSharedFromGlobal(fallbackScopes);
    var existingRuntimeShared = (bootstrapOptions.currentRuntimeShared && _typeof(bootstrapOptions.currentRuntimeShared) === 'object' ? bootstrapOptions.currentRuntimeShared : null) || fallbackResolveRuntimeSharedFromGlobal();
    var runtimeShared = existingRuntimeShared;
    if (!runtimeShared) {
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
  function createRuntimeSharedBootstrapResult(options) {
    var opts = options || {};
    var runtimeScope = normalizeScope(opts.runtimeScope);
    var coreGlobalScope = normalizeScope(opts.coreGlobalScope);
    var fallbackScopes = Array.isArray(opts.fallbackScopes) ? opts.fallbackScopes.slice() : [];
    var requireFn = ensureRequireFn(opts.requireFn);
    var bootstrapOptions = {
      runtimeSharedBootstrapTools: opts.runtimeSharedBootstrapTools || null,
      runtimeSharedNamespaceTools: opts.runtimeSharedNamespaceTools || null,
      resolveCoreSupportModule: opts.resolveCoreSupportModule || null,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: opts.currentRuntimeShared || null,
      fallbackScopes: [runtimeScope, coreGlobalScope].concat(fallbackScopes)
    };
    var loaderOptions = {
      bootstrapOptions: bootstrapOptions,
      runtimeSharedBootstrapInlineTools: opts.runtimeSharedBootstrapInlineTools || null,
      resultTools: opts.runtimeSharedBootstrapResultTools || null,
      inlineRequirePath: './modules/app-core/runtime.js',
      resultModulePath: './modules/app-core/runtime.js',
      requireFn: requireFn
    };
    var loaderNamespaceCandidates = [runtimeScope, coreGlobalScope, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    var managerOptions = {
      bootstrapOptions: bootstrapOptions,
      loaderOptions: loaderOptions,
      loaderTools: opts.runtimeSharedBootstrapLoaderTools || null,
      inlineTools: opts.runtimeSharedBootstrapInlineTools || null,
      resultTools: opts.runtimeSharedBootstrapResultTools || null,
      requireFn: requireFn,
      loaderModulePath: './modules/app-core/runtime.js',
      resultModulePath: './modules/app-core/runtime.js',
      inlineModulePath: './modules/app-core/runtime.js',
      fallbackScopes: loaderNamespaceCandidates,
      loaderNamespaceCandidates: loaderNamespaceCandidates
    };
    var managerCandidates = [];
    if (opts.runtimeSharedBootstrapManagerTools) {
      managerCandidates.push(opts.runtimeSharedBootstrapManagerTools);
    }
    if (typeof requireFn === 'function') {
      try {
        var requiredManager = requireFn('./modules/app-core/runtime.js');
        if (requiredManager) {
          managerCandidates.push(requiredManager);
        }
      } catch (runtimeSharedBootstrapManagerRequireError) {
        void runtimeSharedBootstrapManagerRequireError;
      }
    }
    for (var index = 0; index < loaderNamespaceCandidates.length; index += 1) {
      var scope = loaderNamespaceCandidates[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppRuntimeSharedBootstrapManager;
        if (candidate) {
          managerCandidates.push(candidate);
        }
      } catch (runtimeSharedBootstrapManagerLookupError) {
        void runtimeSharedBootstrapManagerLookupError;
      }
    }
    for (var _index4 = 0; _index4 < managerCandidates.length; _index4 += 1) {
      var _candidate = managerCandidates[_index4];
      var resolved = attemptResolveWithManager(_candidate, managerOptions);
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    }
    return attemptResolveWithManager({
      createRuntimeSharedBootstrapResult: function createRuntimeSharedBootstrapFallback() {
        return createInlineFallbackResult(bootstrapOptions);
      }
    }, managerOptions);
  }
  var namespace = {
    createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResult
  };
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrapResolver';
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
  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    if (typeof require === 'function') {
      return require;
    }
    return null;
  }
  function appendUniqueScope(scopes, scope, seen) {
    if (!Array.isArray(scopes)) {
      return;
    }
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
  function createRuntimeSharedBootstrapInlineFallback(options) {
    var fallbackScopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    appendUniqueScope(fallbackScopes, options && options.runtimeScope, seen);
    appendUniqueScope(fallbackScopes, options && options.coreGlobalScope, seen);
    if (Array.isArray(options && options.fallbackScopes)) {
      for (var index = 0; index < options.fallbackScopes.length; index += 1) {
        appendUniqueScope(fallbackScopes, options.fallbackScopes[index], seen);
      }
    }
    appendUniqueScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null, seen);
    appendUniqueScope(fallbackScopes, typeof window !== 'undefined' ? window : null, seen);
    appendUniqueScope(fallbackScopes, typeof self !== 'undefined' ? self : null, seen);
    appendUniqueScope(fallbackScopes, typeof global !== 'undefined' ? global : null, seen);
    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var _index5 = 0; _index5 < fallbackScopes.length; _index5 += 1) {
        var _scope2 = fallbackScopes[_index5];
        if (!isObject(_scope2)) {
          continue;
        }
        try {
          var candidate = _scope2.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }
      return null;
    }
    var existingRuntimeShared = isObject(options && options.currentRuntimeShared) ? options.currentRuntimeShared : fallbackResolveRuntimeSharedFromGlobal();
    var runtimeShared = isObject(existingRuntimeShared) ? existingRuntimeShared : null;
    if (!runtimeShared) {
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
  function createRuntimeSharedBootstrapResult(options) {
    var bootstrapOptions = options && isObject(options.bootstrapOptions) ? options.bootstrapOptions : {};
    var runtimeSharedBootstrapInlineTools = options && isObject(options.runtimeSharedBootstrapInlineTools) ? options.runtimeSharedBootstrapInlineTools : null;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var inlineRequirePath = options && typeof options.inlineRequirePath === 'string' && options.inlineRequirePath ? options.inlineRequirePath : './modules/app-core/runtime.js';
    if (runtimeSharedBootstrapInlineTools && typeof runtimeSharedBootstrapInlineTools.createRuntimeSharedBootstrapResult === 'function') {
      try {
        var inlineResult = runtimeSharedBootstrapInlineTools.createRuntimeSharedBootstrapResult(bootstrapOptions);
        if (isObject(inlineResult)) {
          return inlineResult;
        }
      } catch (runtimeSharedBootstrapInlineError) {
        void runtimeSharedBootstrapInlineError;
      }
    }
    if (typeof requireFn === 'function') {
      try {
        var requiredInline = requireFn(inlineRequirePath);
        if (isObject(requiredInline) && typeof requiredInline.createRuntimeSharedBootstrapResult === 'function') {
          var requiredInlineResult = requiredInline.createRuntimeSharedBootstrapResult(bootstrapOptions);
          if (isObject(requiredInlineResult)) {
            return requiredInlineResult;
          }
        }
      } catch (runtimeSharedBootstrapInlineRequireError) {
        void runtimeSharedBootstrapInlineRequireError;
      }
    }
    return createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
  }
  var namespace = {
    createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapInlineFallback: createRuntimeSharedBootstrapInlineFallback
  };
  var namespaceName = 'cineCoreAppRuntimeSharedBootstrapResult';
  var scope = detectScope();
  var existing = isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(scope)) {
    try {
      scope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function initRuntimeSharedNamespaceModule(rootScope) {
  'use strict';

  function safeArrayMerge(primary, secondary) {
    var result = [];
    var seen = new Set();
    function appendValues(list) {
      if (!Array.isArray(list)) {
        return;
      }
      for (var index = 0; index < list.length; index += 1) {
        var value = list[index];
        if (value && _typeof(value) === 'object' && !seen.has(value)) {
          seen.add(value);
          result.push(value);
        }
      }
    }
    appendValues(primary);
    appendValues(secondary);
    return result;
  }
  function collectFallbackScopes(options) {
    var fallbackScopes = [];
    var runtimeScope = options && options.runtimeScope ? options.runtimeScope : null;
    var coreGlobalScope = options && options.coreGlobalScope ? options.coreGlobalScope : null;
    var candidates = [runtimeScope, coreGlobalScope, rootScope && _typeof(rootScope) === 'object' ? rootScope : null, typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate) === 'object' && fallbackScopes.indexOf(candidate) === -1) {
        fallbackScopes.push(candidate);
      }
    }
    if (options && Array.isArray(options.additionalScopes)) {
      return safeArrayMerge(fallbackScopes, options.additionalScopes);
    }
    return fallbackScopes;
  }
  function fallbackResolveRuntimeSharedFromScopes(scopes) {
    var scopeList = Array.isArray(scopes) ? scopes : [];
    for (var index = 0; index < scopeList.length; index += 1) {
      var scope = scopeList[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      try {
        var candidate = scope.cineCoreRuntimeShared;
        if (candidate && _typeof(candidate) === 'object') {
          return candidate;
        }
      } catch (runtimeSharedLookupError) {
        void runtimeSharedLookupError;
      }
    }
    return null;
  }
  function attemptResolveSupportModule(identifier, fallbackPath, options) {
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    var requireFn = options && typeof options.requireFn === 'function' ? options.requireFn : null;
    if (resolveCoreSupportModule) {
      try {
        var resolved = resolveCoreSupportModule(identifier, fallbackPath);
        if (resolved && _typeof(resolved) === 'object') {
          return resolved;
        }
      } catch (moduleResolutionError) {
        void moduleResolutionError;
      }
    }
    if (requireFn) {
      try {
        var required = requireFn(fallbackPath);
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (moduleRequireError) {
        void moduleRequireError;
      }
    }
    return null;
  }
  function createMinimalRuntimeSharedNamespace(options, fallbackScopes) {
    var scopeList = Array.isArray(fallbackScopes) ? fallbackScopes.slice() : [];
    var existingRuntimeShared = options && options.currentRuntimeShared ? options.currentRuntimeShared : null;
    function resolveFromScopes() {
      return fallbackResolveRuntimeSharedFromScopes(scopeList);
    }
    var resolvedRuntimeShared = existingRuntimeShared || resolveFromScopes();
    return {
      runtimeShared: resolvedRuntimeShared && _typeof(resolvedRuntimeShared) === 'object' ? resolvedRuntimeShared : Object.create(null),
      existingRuntimeShared: resolvedRuntimeShared && _typeof(resolvedRuntimeShared) === 'object' ? resolvedRuntimeShared : existingRuntimeShared,
      runtimeSharedResolver: null,
      fallbackResolveRuntimeSharedFromGlobal: resolveFromScopes
    };
  }
  function createRuntimeSharedNamespace(options) {
    var safeOptions = Object.assign({
      resolveCoreSupportModule: null,
      requireFn: null,
      runtimeScope: null,
      coreGlobalScope: null,
      currentRuntimeShared: null,
      additionalScopes: null
    }, options || {});
    var runtimeSharedTools = attemptResolveSupportModule('cineCoreAppRuntimeShared', './runtime.js', safeOptions);
    var runtimeSharedResolver = null;
    if (runtimeSharedTools && typeof runtimeSharedTools.resolveRuntimeShared === 'function') {
      runtimeSharedResolver = runtimeSharedTools.resolveRuntimeShared;
    } else if (safeOptions && typeof safeOptions.requireFn === 'function') {
      try {
        var requiredRuntimeSharedTools = safeOptions.requireFn('./runtime.js');
        if (requiredRuntimeSharedTools && typeof requiredRuntimeSharedTools.resolveRuntimeShared === 'function') {
          runtimeSharedResolver = requiredRuntimeSharedTools.resolveRuntimeShared;
        }
      } catch (runtimeSharedToolsRequireError) {
        void runtimeSharedToolsRequireError;
      }
    }
    var fallbackScopes = collectFallbackScopes(safeOptions);
    var fallbackRuntimeShared = fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
    var runtimeShared = safeOptions.currentRuntimeShared || (runtimeSharedResolver ? runtimeSharedResolver({
      currentShared: safeOptions.currentRuntimeShared,
      resolveCoreSupportModule: safeOptions.resolveCoreSupportModule,
      requireFn: safeOptions.requireFn,
      runtimeScope: safeOptions.runtimeScope,
      coreGlobalScope: safeOptions.coreGlobalScope
    }) : fallbackRuntimeShared);
    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      return createMinimalRuntimeSharedNamespace(safeOptions, fallbackScopes);
    }
    if (runtimeShared && _typeof(runtimeShared) === 'object' && typeof runtimeShared.attachRuntimeSharedNamespace === 'function') {
      try {
        runtimeShared.attachRuntimeSharedNamespace({
          fallbackResolveRuntimeSharedFromGlobal: function fallbackResolveRuntimeSharedFromGlobal() {
            return fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
          }
        });
      } catch (runtimeSharedAttachError) {
        void runtimeSharedAttachError;
      }
    }
    return {
      runtimeShared: runtimeShared,
      existingRuntimeShared: safeOptions.currentRuntimeShared,
      runtimeSharedResolver: runtimeSharedResolver,
      fallbackResolveRuntimeSharedFromGlobal: function fallbackResolveRuntimeSharedFromGlobal() {
        return fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
      }
    };
  }
  var runtimeSharedNamespaceApi = {
    createRuntimeSharedNamespace: createRuntimeSharedNamespace
  };
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = runtimeSharedNamespaceApi;
  }
  var globalTargets = safeArrayMerge([rootScope && _typeof(rootScope) === 'object' ? rootScope : null, typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null], null);
  for (var index = 0; index < globalTargets.length; index += 1) {
    var target = globalTargets[index];
    if (!target || _typeof(target) !== 'object') {
      continue;
    }
    if (!target.cineCoreAppRuntimeSharedNamespace) {
      try {
        Object.defineProperty(target, 'cineCoreAppRuntimeSharedNamespace', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: runtimeSharedNamespaceApi
        });
      } catch (defineError) {
        void defineError;
        try {
          target.cineCoreAppRuntimeSharedNamespace = runtimeSharedNamespaceApi;
        } catch (assignError) {
          void assignError;
        }
      }
    }
  }
})(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : void 0);
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
  function ensureDocument(candidate) {
    if (candidate && typeof candidate.createElement === 'function') {
      return candidate;
    }
    if (typeof document !== 'undefined' && document && typeof document.createElement === 'function') {
      return document;
    }
    return null;
  }
  function defaultCollectSelectedValues() {
    return [];
  }
  function defaultComputeMultiSelectSize(optionCount) {
    if (!Number.isFinite(optionCount) || optionCount <= 0) {
      return 1;
    }
    return Math.max(1, Math.min(optionCount, 10));
  }
  function defaultGetCrewRoleEntries() {
    return [];
  }
  function defaultGetLocalizedTexts() {
    return {};
  }
  function defaultGetDefaultLanguageTexts() {
    return {};
  }
  function createAutoGearCrewOptionHelpers(options) {
    var documentRef = ensureDocument(options && options.documentRef);
    var collectSelectedValues = options && typeof options.collectSelectedValues === 'function' ? options.collectSelectedValues : defaultCollectSelectedValues;
    var computeMultiSelectSize = options && typeof options.computeMultiSelectSize === 'function' ? options.computeMultiSelectSize : defaultComputeMultiSelectSize;
    var getCrewRoleEntries = options && typeof options.getCrewRoleEntries === 'function' ? options.getCrewRoleEntries : defaultGetCrewRoleEntries;
    var minRows = options && Number.isFinite(options.autoGearFlexMinRows) && options.autoGearFlexMinRows > 0 ? options.autoGearFlexMinRows : 1;
    var getLocalizedTexts = options && typeof options.getLocalizedTexts === 'function' ? options.getLocalizedTexts : defaultGetLocalizedTexts;
    var getDefaultLanguageTexts = options && typeof options.getDefaultLanguageTexts === 'function' ? options.getDefaultLanguageTexts : defaultGetDefaultLanguageTexts;
    function refreshCrewOptions(selectElement, selected, key) {
      if (!selectElement || !documentRef) {
        return;
      }
      var selectedValues = collectSelectedValues(selected, key);
      selectElement.innerHTML = '';
      selectElement.multiple = true;
      var entries = getCrewRoleEntries();
      var seen = new Set();
      var appendOption = function appendOption(value, label) {
        if (!value || seen.has(value)) {
          return;
        }
        var option = documentRef.createElement('option');
        option.value = value;
        option.textContent = label;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        selectElement.appendChild(option);
        seen.add(value);
      };
      (Array.isArray(entries) ? entries : []).forEach(function (entry) {
        if (!entry) return;
        appendOption(entry.value, entry.label);
      });
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) {
          appendOption(value, value);
        }
      });
      var selectableOptions = Array.from(selectElement.options || []).filter(function (option) {
        return !option.disabled;
      });
      selectElement.size = computeMultiSelectSize(selectableOptions.length, {
        minRows: minRows
      });
    }
    function getCrewRoleLabel(value) {
      if (typeof value !== 'string') {
        return '';
      }
      var trimmed = value.trim();
      if (!trimmed) {
        return '';
      }
      var langTexts = getLocalizedTexts() || {};
      var fallbackTexts = getDefaultLanguageTexts() || {};
      var crewRoleMap = langTexts.crewRoles || fallbackTexts.crewRoles || {};
      return crewRoleMap[trimmed] || trimmed;
    }
    return {
      refreshCrewOptions: refreshCrewOptions,
      getCrewRoleLabel: getCrewRoleLabel
    };
  }
  var namespace = {
    createAutoGearCrewOptionHelpers: createAutoGearCrewOptionHelpers
  };
  var globalScope = detectScope();
  if (isObject(globalScope)) {
    var existing = isObject(globalScope.cineCoreAppRuntimeAutoGearCrew) ? globalScope.cineCoreAppRuntimeAutoGearCrew : {};
    Object.assign(existing, namespace);
    try {
      globalScope.cineCoreAppRuntimeAutoGearCrew = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
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
  function createFallbackRuntimeCandidateScopeSupport(options) {
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    function registerScope(scopes, seenScopes, scope) {
      if (!Array.isArray(scopes)) {
        return;
      }
      if (!isObject(scope)) {
        return;
      }
      if (seenScopes) {
        if (seenScopes.has(scope)) {
          return;
        }
        seenScopes.add(scope);
        scopes.push(scope);
        return;
      }
      if (scopes.indexOf(scope) !== -1) {
        return;
      }
      scopes.push(scope);
    }
    function detectFallbackGlobalScope(primaryScope) {
      return detectScope(primaryScope) || (typeof window !== 'undefined' && isObject(window) ? window : null) || (typeof self !== 'undefined' && isObject(self) ? self : null) || (typeof global !== 'undefined' && isObject(global) ? global : null) || null;
    }
    function fallbackCollectCandidateScopes(primaryScope) {
      if (runtimeShared && typeof runtimeShared.collectCandidateScopes === 'function') {
        try {
          var sharedScopes = runtimeShared.collectCandidateScopes(primaryScope, environmentHelpers);
          if (Array.isArray(sharedScopes)) {
            return sharedScopes;
          }
        } catch (collectRuntimeScopesError) {
          void collectRuntimeScopesError;
        }
      }
      var scopes = [];
      var seenScopes = typeof Set === 'function' ? new Set() : null;
      registerScope(scopes, seenScopes, primaryScope);
      registerScope(scopes, seenScopes, typeof globalThis !== 'undefined' ? globalThis : null);
      registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
      registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
      registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);
      return scopes;
    }
    function fallbackResolveCandidateScopes(resolveOptions) {
      var options = resolveOptions || {};
      var primaryScope = options.primaryScope;
      var currentCandidateScopes = options.currentCandidateScopes;
      if (isScopeList(currentCandidateScopes)) {
        return currentCandidateScopes;
      }
      var resolvedScopes = null;
      if (runtimeShared && typeof runtimeShared.resolveCandidateScopes === 'function') {
        try {
          resolvedScopes = runtimeShared.resolveCandidateScopes(primaryScope, environmentHelpers);
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
          resolvedScopes = null;
        }
      }
      if (!isScopeList(resolvedScopes)) {
        resolvedScopes = fallbackCollectCandidateScopes(primaryScope);
      }
      return resolvedScopes;
    }
    function fallbackSyncCandidateScopes(candidateScopes, syncOptions) {
      var options = syncOptions || {};
      var primaryScope = options.primaryScope;
      var globalScope = (options && isObject(options.globalScope) ? options.globalScope : null) || detectFallbackGlobalScope(primaryScope);
      var assignCurrentCandidateScopes = options.assignCurrentCandidateScopes;
      if (runtimeShared && typeof runtimeShared.syncCandidateScopes === 'function') {
        try {
          runtimeShared.syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers);
          return candidateScopes;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }
      if (isObject(globalScope) && (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES || globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)) {
        try {
          globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
        } catch (assignError) {
          void assignError;
        }
      }
      if (typeof assignCurrentCandidateScopes === 'function') {
        try {
          assignCurrentCandidateScopes(candidateScopes);
        } catch (candidateAssignError) {
          void candidateAssignError;
        }
      }
      return candidateScopes;
    }
    function fallbackEnsureCandidateScopes(ensureOptions) {
      var resolvedScopes = fallbackResolveCandidateScopes(ensureOptions || {});
      return fallbackSyncCandidateScopes(resolvedScopes, ensureOptions || {});
    }
    return {
      collectCandidateScopes: fallbackCollectCandidateScopes,
      collectCandidateScopesWithFallback: fallbackCollectCandidateScopes,
      resolveCandidateScopes: fallbackResolveCandidateScopes,
      syncCandidateScopes: fallbackSyncCandidateScopes,
      ensureCandidateScopes: fallbackEnsureCandidateScopes
    };
  }
  function resolveCoreCandidateScopeBridge(resolveCoreSupportModule, requireFn, runtimeScope, coreGlobalScope) {
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        var resolved = resolveCoreSupportModule('cineCoreRuntimeCandidateScopes', './modules/core/runtime-candidate-scopes.js');
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (candidateScopeResolveError) {
        void candidateScopeResolveError;
      }
    }
    var loaderCandidateScopes = requireCoreRuntimeModule(
      'modules/core/runtime-candidate-scopes.js',
      { primaryScope: runtimeScope || coreGlobalScope }
    );
    if (isObject(loaderCandidateScopes)) {
      return loaderCandidateScopes;
    }
    var candidateScopes = [];
    if (isObject(runtimeScope)) {
      candidateScopes.push(runtimeScope);
    }
    if (isObject(coreGlobalScope) && candidateScopes.indexOf(coreGlobalScope) === -1) {
      candidateScopes.push(coreGlobalScope);
    }
    candidateScopes.push(typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null);
    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreRuntimeCandidateScopes;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (candidateScopeLookupError) {
        void candidateScopeLookupError;
      }
    }
    return null;
  }
  function resolveRuntimeCandidateScopeSupport(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var fallbackSupport = createFallbackRuntimeCandidateScopeSupport({
      runtimeShared: runtimeShared,
      environmentHelpers: environmentHelpers
    });
    var bridge = resolveCoreCandidateScopeBridge(resolveCoreSupportModule, requireFn, runtimeScope, coreGlobalScope);
    function mergeOptions(baseOptions) {
      var merged = Object.assign({}, baseOptions || {});
      if (typeof merged.runtimeShared === 'undefined') {
        merged.runtimeShared = runtimeShared;
      }
      if (typeof merged.environmentHelpers === 'undefined') {
        merged.environmentHelpers = environmentHelpers;
      }
      return merged;
    }
    function collectCandidateScopes(primaryScope) {
      if (isObject(bridge)) {
        if (typeof bridge.collectCandidateScopesWithFallback === 'function') {
          try {
            var collected = bridge.collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers);
            if (Array.isArray(collected)) {
              return collected;
            }
          } catch (collectCandidateScopesError) {
            void collectCandidateScopesError;
          }
        }
        if (typeof bridge.collectCandidateScopes === 'function') {
          try {
            var _collected = bridge.collectCandidateScopes(primaryScope, runtimeShared, environmentHelpers);
            if (Array.isArray(_collected)) {
              return _collected;
            }
          } catch (collectCandidateScopesFallbackError) {
            void collectCandidateScopesFallbackError;
          }
        }
      }
      return fallbackSupport.collectCandidateScopes(primaryScope);
    }
    function resolveCandidateScopes(resolveOptions) {
      var optionsWithDefaults = mergeOptions(resolveOptions);
      if (isObject(bridge) && typeof bridge.resolveCandidateScopes === 'function') {
        try {
          var resolved = bridge.resolveCandidateScopes(optionsWithDefaults);
          if (isScopeList(resolved)) {
            return resolved;
          }
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
        }
      }
      return fallbackSupport.resolveCandidateScopes(optionsWithDefaults);
    }
    function syncCandidateScopes(candidateScopes, syncOptions) {
      var optionsWithDefaults = mergeOptions(syncOptions);
      if (isObject(bridge) && typeof bridge.syncCandidateScopes === 'function') {
        try {
          var synced = bridge.syncCandidateScopes(candidateScopes, optionsWithDefaults);
          if (isScopeList(synced)) {
            return synced;
          }
          if (typeof synced === 'undefined') {
            return candidateScopes;
          }
          return synced;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }
      return fallbackSupport.syncCandidateScopes(candidateScopes, optionsWithDefaults);
    }
    function ensureCandidateScopes(ensureOptions) {
      var optionsWithDefaults = mergeOptions(ensureOptions);
      if (isObject(bridge) && typeof bridge.ensureCandidateScopes === 'function') {
        try {
          var ensured = bridge.ensureCandidateScopes(optionsWithDefaults);
          if (isScopeList(ensured)) {
            return ensured;
          }
        } catch (ensureCandidateScopesError) {
          void ensureCandidateScopesError;
        }
      }
      var resolved = resolveCandidateScopes(optionsWithDefaults);
      return syncCandidateScopes(resolved, optionsWithDefaults);
    }
    return {
      collectCandidateScopes: collectCandidateScopes,
      collectCandidateScopesWithFallback: collectCandidateScopes,
      resolveCandidateScopes: resolveCandidateScopes,
      syncCandidateScopes: syncCandidateScopes,
      ensureCandidateScopes: ensureCandidateScopes
    };
  }
  var namespace = {
    resolveRuntimeCandidateScopeSupport: resolveRuntimeCandidateScopeSupport,
    createFallbackRuntimeCandidateScopeSupport: createFallbackRuntimeCandidateScopeSupport
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppRuntimeCandidateScopeSupport';
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
  function tryCollectWithSupport(support, primaryScope) {
    if (!isObject(support)) {
      return null;
    }
    if (typeof support.collectCandidateScopes !== 'function') {
      return null;
    }
    try {
      var collected = support.collectCandidateScopes(primaryScope);
      return Array.isArray(collected) ? collected : null;
    } catch (collectError) {
      void collectError;
    }
    return null;
  }
  function tryEnsureWithSupport(support, options) {
    if (!isObject(support)) {
      return null;
    }
    if (typeof support.ensureCandidateScopes !== 'function') {
      return null;
    }
    try {
      var ensured = support.ensureCandidateScopes(options);
      return Array.isArray(ensured) ? ensured : null;
    } catch (ensureError) {
      void ensureError;
    }
    return null;
  }
  function createRuntimeCandidateScopeResolvers(options) {
    var runtimeSupport = options && options.runtimeCandidateScopeSupport ? options.runtimeCandidateScopeSupport : null;
    var fallbackSupport = options && options.fallbackRuntimeCandidateScopeSupport ? options.fallbackRuntimeCandidateScopeSupport : null;
    function inlineCollectCoreRuntimeCandidateScopes(primaryScope) {
      var collected = tryCollectWithSupport(runtimeSupport, primaryScope);
      if (collected) {
        return collected;
      }
      var fallbackCollected = tryCollectWithSupport(fallbackSupport, primaryScope);
      if (fallbackCollected) {
        return fallbackCollected;
      }
      return [];
    }
    function inlineEnsureCoreRuntimeCandidateScopes(ensureOptions) {
      var options = ensureOptions && _typeof(ensureOptions) === 'object' ? ensureOptions : {};
      var ensured = tryEnsureWithSupport(runtimeSupport, options);
      if (ensured && ensured.length) {
        return ensured;
      }
      var fallbackEnsured = tryEnsureWithSupport(fallbackSupport, options);
      if (fallbackEnsured && fallbackEnsured.length) {
        return fallbackEnsured;
      }
      return inlineCollectCoreRuntimeCandidateScopes(options.primaryScope);
    }
    return {
      collectCoreRuntimeCandidateScopes: inlineCollectCoreRuntimeCandidateScopes,
      ensureCoreRuntimeCandidateScopes: inlineEnsureCoreRuntimeCandidateScopes
    };
  }
  var namespace = {
    createRuntimeCandidateScopeResolvers: createRuntimeCandidateScopeResolvers
  };
  var namespaceName = 'cineCoreAppRuntimeCandidateScopeResolvers';
  var scope = detectScope();
  var existing = isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(scope)) {
    try {
      scope[namespaceName] = existing;
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
  function createRuntimeCandidateScopeSupportFallback(options) {
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    var candidateScopeBridge = options && options.candidateScopeBridge;
    var corePartRuntimeScope = options && options.corePartRuntimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    function isValidScope(scope) {
      return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
    }
    function ensureScopes(primaryScope) {
      var scopes = [];
      var seen = typeof Set === 'function' ? new Set() : null;
      function register(scope) {
        if (!isValidScope(scope)) {
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
      register(corePartRuntimeScope);
      register(coreGlobalScope);
      register(typeof globalThis !== 'undefined' ? globalThis : null);
      register(typeof window !== 'undefined' ? window : null);
      register(typeof self !== 'undefined' ? self : null);
      register(typeof global !== 'undefined' ? global : null);
      return scopes;
    }
    function collectCandidateScopes(primaryScope) {
      if (candidateScopeBridge && typeof candidateScopeBridge.collectCandidateScopesWithFallback === 'function') {
        try {
          var collected = candidateScopeBridge.collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers);
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (collectCandidateScopesError) {
          void collectCandidateScopesError;
        }
      }
      if (candidateScopeBridge && typeof candidateScopeBridge.collectCandidateScopes === 'function') {
        try {
          var _collected2 = candidateScopeBridge.collectCandidateScopes(primaryScope, runtimeShared, environmentHelpers);
          if (Array.isArray(_collected2)) {
            return _collected2;
          }
        } catch (collectCandidateScopesFallbackError) {
          void collectCandidateScopesFallbackError;
        }
      }
      if (runtimeShared && typeof runtimeShared.collectCandidateScopes === 'function') {
        try {
          var sharedScopes = runtimeShared.collectCandidateScopes(primaryScope, environmentHelpers);
          if (Array.isArray(sharedScopes)) {
            return sharedScopes;
          }
        } catch (collectRuntimeScopesError) {
          void collectRuntimeScopesError;
        }
      }
      return ensureScopes(primaryScope);
    }
    function resolveCandidateScopes(resolveOptions) {
      var optionsWithDefaults = resolveOptions || {};
      var currentCandidateScopes = optionsWithDefaults.currentCandidateScopes;
      if (Array.isArray(currentCandidateScopes)) {
        return currentCandidateScopes;
      }
      if (candidateScopeBridge && typeof candidateScopeBridge.resolveCandidateScopes === 'function') {
        try {
          var resolved = candidateScopeBridge.resolveCandidateScopes(optionsWithDefaults);
          if (Array.isArray(resolved)) {
            return resolved;
          }
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
        }
      }
      if (runtimeShared && typeof runtimeShared.resolveCandidateScopes === 'function') {
        try {
          var _resolved = runtimeShared.resolveCandidateScopes(optionsWithDefaults.primaryScope, environmentHelpers);
          if (Array.isArray(_resolved)) {
            return _resolved;
          }
        } catch (resolveRuntimeCandidateScopesError) {
          void resolveRuntimeCandidateScopesError;
        }
      }
      return collectCandidateScopes(optionsWithDefaults.primaryScope);
    }
    function syncCandidateScopes(candidateScopes, syncOptions) {
      var optionsWithDefaults = syncOptions || {};
      var primaryScope = optionsWithDefaults.primaryScope;
      var candidateList = Array.isArray(candidateScopes) ? candidateScopes : [];
      var providedGlobalScope = optionsWithDefaults.globalScope;
      if (candidateScopeBridge && typeof candidateScopeBridge.syncCandidateScopes === 'function') {
        try {
          var synced = candidateScopeBridge.syncCandidateScopes(candidateList, optionsWithDefaults);
          if (Array.isArray(synced)) {
            return synced;
          }
          if (typeof synced === 'undefined') {
            return candidateList;
          }
          return synced;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }
      if (runtimeShared && typeof runtimeShared.syncCandidateScopes === 'function') {
        try {
          runtimeShared.syncCandidateScopes(candidateList, primaryScope, environmentHelpers);
          return candidateList;
        } catch (syncRuntimeCandidateScopesError) {
          void syncRuntimeCandidateScopesError;
        }
      }
      var globalScope = (isValidScope(providedGlobalScope) ? providedGlobalScope : null) || (isValidScope(primaryScope) ? primaryScope : null) || (typeof globalThis !== 'undefined' && isValidScope(globalThis) ? globalThis : null) || (typeof window !== 'undefined' && isValidScope(window) ? window : null) || (typeof self !== 'undefined' && isValidScope(self) ? self : null) || (typeof global !== 'undefined' && isValidScope(global) ? global : null);
      if (isValidScope(globalScope)) {
        try {
          globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateList;
        } catch (assignError) {
          void assignError;
        }
      }
      if (typeof optionsWithDefaults.assignCurrentCandidateScopes === 'function') {
        try {
          optionsWithDefaults.assignCurrentCandidateScopes(candidateList);
        } catch (candidateAssignError) {
          void candidateAssignError;
        }
      }
      return candidateList;
    }
    function ensureCandidateScopes(ensureOptions) {
      var resolved = resolveCandidateScopes(ensureOptions || {});
      return syncCandidateScopes(resolved, ensureOptions || {});
    }
    return {
      collectCandidateScopes: collectCandidateScopes,
      collectCandidateScopesWithFallback: collectCandidateScopes,
      resolveCandidateScopes: resolveCandidateScopes,
      syncCandidateScopes: syncCandidateScopes,
      ensureCandidateScopes: ensureCandidateScopes
    };
  }
  var namespace = {
    createRuntimeCandidateScopeSupportFallback: createRuntimeCandidateScopeSupportFallback
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppRuntimeCandidateScopeFallback';
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
  function createCandidateRegistry(options) {
    var registryOptions = options || {};
    var seen = typeof Set === 'function' ? new Set() : null;
    var candidates = [];
    function registerCandidate(candidate) {
      var scope = isObject(candidate) ? candidate : detectScope(candidate);
      if (!isObject(scope)) {
        return;
      }
      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
      } else if (candidates.indexOf(scope) !== -1) {
        return;
      }
      candidates.push(scope);
    }
    registerCandidate(registryOptions.primaryScope);
    if (Array.isArray(registryOptions.additionalScopes)) {
      for (var index = 0; index < registryOptions.additionalScopes.length; index += 1) {
        registerCandidate(registryOptions.additionalScopes[index]);
      }
    }
    if (Array.isArray(registryOptions.extraCandidates)) {
      for (var _index6 = 0; _index6 < registryOptions.extraCandidates.length; _index6 += 1) {
        registerCandidate(registryOptions.extraCandidates[_index6]);
      }
    }
    if (registryOptions.includeGlobalCandidates !== false) {
      registerCandidate(typeof globalThis !== 'undefined' ? globalThis : null);
      registerCandidate(typeof window !== 'undefined' ? window : null);
      registerCandidate(typeof self !== 'undefined' ? self : null);
      registerCandidate(typeof global !== 'undefined' ? global : null);
    }
    if (candidates.length === 0) {
      registerCandidate(detectScope());
    }
    return {
      candidates: candidates,
      registerCandidate: registerCandidate
    };
  }
  function createRuntimeScopeBridge(options) {
    var registry = createCandidateRegistry(options);
    var candidates = registry.candidates;
    function readValue(name) {
      if (typeof name !== 'string' || !name) {
        return undefined;
      }
      for (var index = 0; index < candidates.length; index += 1) {
        var scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          if (name in scope) {
            var value = scope[name];
            if (typeof value !== 'undefined') {
              return value;
            }
          }
        } catch (readError) {
          void readError;
        }
      }
      return undefined;
    }
    function writeValue(name, value) {
      if (typeof name !== 'string' || !name) {
        return false;
      }
      for (var index = 0; index < candidates.length; index += 1) {
        var scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }
        try {
          scope[name] = value;
          return true;
        } catch (assignError) {
          void assignError;
        }
        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value: value
          });
          return true;
        } catch (defineError) {
          void defineError;
        }
      }
      return false;
    }
    function declareFallbackBinding(name, factory) {
      var existing = readValue(name);
      if (typeof existing !== 'undefined') {
        return existing;
      }
      var fallbackValue = typeof factory === 'function' ? factory() : factory;
      writeValue(name, fallbackValue);
      return fallbackValue;
    }
    return {
      candidates: candidates,
      readValue: readValue,
      writeValue: writeValue,
      declareFallbackBinding: declareFallbackBinding,
      registerScope: registry.registerCandidate
    };
  }
  var namespace = {
    createRuntimeScopeBridge: createRuntimeScopeBridge
  };
  var globalScope = detectScope();
  if (isObject(globalScope)) {
    var existing = isObject(globalScope.cineCoreAppRuntimeScopeBridge) ? globalScope.cineCoreAppRuntimeScopeBridge : {};
    if (typeof Object.assign === 'function') {
      Object.assign(existing, namespace);
    } else {
      for (var key in namespace) {
        if (Object.prototype.hasOwnProperty.call(namespace, key)) {
          existing[key] = namespace[key];
        }
      }
    }
    try {
      globalScope.cineCoreAppRuntimeScopeBridge = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
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
  function createInlineRuntimeToolFallbacks(primaryScope) {
    function isValidScope(scope) {
      return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
    }
    function detectScopeLocal(primary) {
      if (isValidScope(primary)) {
        return primary;
      }
      if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
        return globalThis;
      }
      if (typeof window !== 'undefined' && isValidScope(window)) {
        return window;
      }
      if (typeof self !== 'undefined' && isValidScope(self)) {
        return self;
      }
      if (typeof global !== 'undefined' && isValidScope(global)) {
        return global;
      }
      return null;
    }
    function ensureGlobalValue(name, fallbackValue, primary) {
      var provider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
        return fallbackValue;
      };
      if (typeof name !== 'string' || !name) {
        try {
          return provider();
        } catch (fallbackError) {
          void fallbackError;
          return undefined;
        }
      }
      var scope = detectScopeLocal(primary);
      if (!isValidScope(scope)) {
        return provider();
      }
      var existing;
      try {
        existing = scope[name];
      } catch (readError) {
        existing = undefined;
        void readError;
      }
      if (typeof existing !== 'undefined') {
        return existing;
      }
      var value = provider();
      try {
        scope[name] = value;
        return scope[name];
      } catch (assignError) {
        void assignError;
      }
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          writable: true,
          value: value
        });
      } catch (defineError) {
        void defineError;
      }
      try {
        return scope[name];
      } catch (finalReadError) {
        void finalReadError;
      }
      return value;
    }
    function jsonDeepClone(value) {
      if (value === null || _typeof(value) !== 'object') {
        return value;
      }
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (jsonCloneError) {
        void jsonCloneError;
      }
      return value;
    }
    function resolveStructuredClone(primary) {
      if (typeof structuredClone === 'function') {
        return structuredClone;
      }
      var scope = detectScopeLocal(primary);
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
    function createResilientDeepClone(primary) {
      var structuredCloneImpl = resolveStructuredClone(primary);
      if (!structuredCloneImpl) {
        return jsonDeepClone;
      }
      return function resilientDeepClone(value) {
        if (value === null || _typeof(value) !== 'object') {
          return value;
        }
        try {
          return structuredCloneImpl(value);
        } catch (structuredCloneError) {
          void structuredCloneError;
        }
        return jsonDeepClone(value);
      };
    }
    function ensureDeepClone(primary) {
      var scope = detectScopeLocal(primary);
      if (scope && typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
      }
      var clone = createResilientDeepClone(scope);
      if (isValidScope(scope)) {
        try {
          Object.defineProperty(scope, '__cineDeepClone', {
            configurable: true,
            writable: true,
            value: clone
          });
        } catch (defineError) {
          void defineError;
          try {
            scope.__cineDeepClone = clone;
          } catch (assignError) {
            void assignError;
          }
        }
      }
      return clone;
    }
    var resolvedScope = detectScopeLocal(primaryScope);
    function getCoreGlobalObject() {
      return detectScopeLocal(resolvedScope);
    }
    function ensureCoreGlobalValue(name, fallbackValue) {
      return ensureGlobalValue(name, fallbackValue, resolvedScope);
    }
    function resolveStructuredCloneForScope(scope) {
      return resolveStructuredClone(scope || resolvedScope);
    }
    function createResilientDeepCloneForScope(scope) {
      return createResilientDeepClone(scope || resolvedScope);
    }
    function ensureDeepCloneForScope(scope) {
      return ensureDeepClone(scope || resolvedScope);
    }
    return {
      getCoreGlobalObject: getCoreGlobalObject,
      ensureCoreGlobalValue: ensureCoreGlobalValue,
      jsonDeepClone: jsonDeepClone,
      resolveStructuredClone: resolveStructuredCloneForScope,
      createResilientDeepClone: createResilientDeepCloneForScope,
      ensureDeepClone: ensureDeepCloneForScope
    };
  }
  var namespace = {
    createInlineRuntimeToolFallbacks: createInlineRuntimeToolFallbacks
  };
  var namespaceName = 'cineCoreAppRuntimeToolInlineFallbacks';
  var globalScope = detectScope();
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