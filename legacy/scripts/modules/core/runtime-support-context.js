function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
  function readNamespaceFromScope(namespaceName, candidateScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }
    if (!isObject(candidateScope)) {
      return null;
    }
    try {
      var namespace = candidateScope[namespaceName];
      return isObject(namespace) ? namespace : null;
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
    return null;
  }
  function loadRuntimeSupportBootstrap(primaryScopeCandidate) {
    var namespaceName = 'cineCoreRuntimeSupportBootstrap';
    var candidates = [primaryScopeCandidate, detectGlobalScope(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var bootstrap = readNamespaceFromScope(namespaceName, candidates[index]);
      if (bootstrap) {
        return bootstrap;
      }
    }
    if (typeof require === 'function') {
      try {
        var requiredBootstrap = require('./runtime-support-bootstrap.js');
        if (isObject(requiredBootstrap)) {
          return requiredBootstrap;
        }
      } catch (runtimeSupportBootstrapRequireError) {
        void runtimeSupportBootstrapRequireError;
      }
    }
    for (var _index = 0; _index < candidates.length; _index += 1) {
      var _bootstrap = readNamespaceFromScope(namespaceName, candidates[_index]);
      if (_bootstrap) {
        return _bootstrap;
      }
    }
    return null;
  }
  function defaultFallbackDetectRuntimeScope(primaryScope) {
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
  function defaultFallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }
    var runtimeScope = defaultFallbackDetectRuntimeScope(primaryScope);
    if (isObject(runtimeScope) && isObject(runtimeScope[namespaceName])) {
      return runtimeScope[namespaceName];
    }
    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        var required = require(requirePath);
        if (isObject(required)) {
          return required;
        }
      } catch (supportModuleError) {
        void supportModuleError;
      }
    }
    return null;
  }
  function createDefaultRuntimeSupportContext(options) {
    var primaryScopeCandidate = options && isObject(options.primaryScopeCandidate) ? options.primaryScopeCandidate : null;
    var fallbackDetect = defaultFallbackDetectRuntimeScope;
    var runtimeScope = fallbackDetect(primaryScopeCandidate);
    function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      var scope = typeof candidateScope === 'undefined' ? runtimeScope : fallbackDetect(candidateScope);
      return defaultFallbackResolveCoreSupportModule(namespaceName, requirePath, scope);
    }
    function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
    }
    return Object.freeze({
      primaryScopeCandidate: primaryScopeCandidate,
      bootstrap: null,
      bootstrapTools: null,
      fallbackTools: null,
      runtimeScope: runtimeScope,
      detectRuntimeScope: fallbackDetect,
      fallbackDetectRuntimeScope: fallbackDetect,
      fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule,
      resolveCoreSupportModule: resolveCoreSupportModule
    });
  }
  function createRuntimeSupportContext(options) {
    var primaryScopeCandidate = options && isObject(options.primaryScopeCandidate) ? options.primaryScopeCandidate : null;
    var bootstrap = loadRuntimeSupportBootstrap(primaryScopeCandidate);
    var bootstrapTools = bootstrap && typeof bootstrap.resolveBootstrap === 'function' ? bootstrap.resolveBootstrap(primaryScopeCandidate) : null;
    var fallbackTools = !bootstrapTools && bootstrap && typeof bootstrap.readRuntimeSupportTools === 'function' ? bootstrap.readRuntimeSupportTools(primaryScopeCandidate) : null;
    var fallbackDetect = bootstrapTools && typeof bootstrapTools.fallbackDetectRuntimeScope === 'function' && bootstrapTools.fallbackDetectRuntimeScope || fallbackTools && typeof fallbackTools.fallbackDetectRuntimeScope === 'function' && fallbackTools.fallbackDetectRuntimeScope || defaultFallbackDetectRuntimeScope;
    var detect = bootstrapTools && typeof bootstrapTools.detectRuntimeScope === 'function' && bootstrapTools.detectRuntimeScope || fallbackDetect;
    var runtimeScope = bootstrapTools && isObject(bootstrapTools.runtimeScope) ? bootstrapTools.runtimeScope : detect(primaryScopeCandidate);
    var fallbackResolve = bootstrapTools && typeof bootstrapTools.fallbackResolveCoreSupportModule === 'function' && bootstrapTools.fallbackResolveCoreSupportModule || fallbackTools && typeof fallbackTools.fallbackResolveCoreSupportModule === 'function' && fallbackTools.fallbackResolveCoreSupportModule || defaultFallbackResolveCoreSupportModule;
    function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      var scope = typeof candidateScope === 'undefined' ? runtimeScope : detect(candidateScope);
      return fallbackResolve(namespaceName, requirePath, scope);
    }
    function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      if (bootstrapTools && typeof bootstrapTools.resolveCoreSupportModule === 'function') {
        var scope = typeof candidateScope === 'undefined' ? runtimeScope : detect(candidateScope);
        return bootstrapTools.resolveCoreSupportModule(namespaceName, requirePath, scope);
      }
      return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
    }
    return Object.freeze({
      primaryScopeCandidate: primaryScopeCandidate,
      bootstrap: bootstrap,
      bootstrapTools: bootstrapTools,
      fallbackTools: fallbackTools,
      runtimeScope: runtimeScope,
      detectRuntimeScope: detect,
      fallbackDetectRuntimeScope: fallbackDetect,
      fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule,
      resolveCoreSupportModule: resolveCoreSupportModule
    });
  }
  var cachedContext = null;
  var cachedCandidate = undefined;
  function readRuntimeSupportContext(options) {
    var candidate = options && isObject(options.primaryScopeCandidate) ? options.primaryScopeCandidate : null;
    if (cachedContext && cachedCandidate === candidate) {
      return cachedContext;
    }
    var runtimeContext = createRuntimeSupportContext({
      primaryScopeCandidate: candidate
    });
    if (isObject(runtimeContext)) {
      cachedContext = runtimeContext;
      cachedCandidate = candidate;
      return cachedContext;
    }
    var fallbackContext = createDefaultRuntimeSupportContext({
      primaryScopeCandidate: candidate
    });
    cachedContext = fallbackContext;
    cachedCandidate = candidate;
    return cachedContext;
  }
  var api = {
    isObject: isObject,
    detectGlobalScope: detectGlobalScope,
    readNamespaceFromScope: readNamespaceFromScope,
    loadRuntimeSupportBootstrap: loadRuntimeSupportBootstrap,
    defaultFallbackDetectRuntimeScope: defaultFallbackDetectRuntimeScope,
    defaultFallbackResolveCoreSupportModule: defaultFallbackResolveCoreSupportModule,
    createDefaultRuntimeSupportContext: createDefaultRuntimeSupportContext,
    createRuntimeSupportContext: createRuntimeSupportContext,
    readRuntimeSupportContext: readRuntimeSupportContext
  };
  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreRuntimeSupportContext';
  var existing = isObject(globalScope) && isObject(globalScope[targetName]) ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(api); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = api[key];
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