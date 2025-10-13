function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function fallbackDetectGlobalScope() {
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
    return {};
  }
  function fallbackDefineHiddenProperty(target, name, value) {
    if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
      return false;
    }
    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
      });
      return true;
    } catch (defineError) {
      void defineError;
    }
    try {
      target[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  function fallbackTryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }
  var PRIMARY_SCOPE = fallbackDetectGlobalScope();
  function resolveScopeUtils(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./scope-utils.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = [];
    function pushCandidate(candidate) {
      if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
        return;
      }
      if (candidates.indexOf(candidate) === -1) {
        candidates.push(candidate);
      }
    }
    pushCandidate(targetScope);
    if (typeof globalThis !== 'undefined') pushCandidate(globalThis);
    if (typeof window !== 'undefined') pushCandidate(window);
    if (typeof self !== 'undefined') pushCandidate(self);
    if (typeof global !== 'undefined') pushCandidate(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      try {
        var utils = candidate && candidate.cineScopeUtils;
        if (utils && _typeof(utils) === 'object') {
          return utils;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  var SCOPE_UTILS = resolveScopeUtils(PRIMARY_SCOPE);
  var detectGlobalScope = SCOPE_UTILS && typeof SCOPE_UTILS.detectGlobalScope === 'function' ? function detectWithUtils() {
    try {
      var detected = SCOPE_UTILS.detectGlobalScope();
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return fallbackDetectGlobalScope();
  } : fallbackDetectGlobalScope;
  var defineHiddenProperty = SCOPE_UTILS && typeof SCOPE_UTILS.defineHiddenProperty === 'function' ? SCOPE_UTILS.defineHiddenProperty : fallbackDefineHiddenProperty;
  var tryRequire = SCOPE_UTILS && typeof SCOPE_UTILS.tryRequire === 'function' ? SCOPE_UTILS.tryRequire : fallbackTryRequire;
  function _collectCandidateScopes(primary, extras, detect) {
    if (SCOPE_UTILS && typeof SCOPE_UTILS.collectCandidateScopes === 'function') {
      var _detectFn = typeof detect === 'function' ? detect : detectGlobalScope;
      return SCOPE_UTILS.collectCandidateScopes(primary, extras, _detectFn);
    }
    var scopes = [];
    function pushScope(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    pushScope(primary);
    var detectFn = typeof detect === 'function' ? detect : detectGlobalScope;
    try {
      pushScope(detectFn());
    } catch (error) {
      void error;
    }
    if (Array.isArray(extras)) {
      for (var index = 0; index < extras.length; index += 1) {
        pushScope(extras[index]);
      }
    }
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    return scopes;
  }
  function resolveFromScopes(propertyName, options) {
    if (!propertyName) {
      return null;
    }
    var settings = options || {};
    if (SCOPE_UTILS && typeof SCOPE_UTILS.resolveFromScopes === 'function') {
      try {
        var resolvedScope = SCOPE_UTILS.resolveFromScopes(propertyName, {
          primaryScope: settings.primaryScope || PRIMARY_SCOPE,
          additionalScopes: settings.additionalScopes,
          detect: settings.detect || detectGlobalScope
        });

        if (resolvedScope && (_typeof(resolvedScope) === 'object' || typeof resolvedScope === 'function')) {
          try {
            if (propertyName in resolvedScope) {
              return resolvedScope[propertyName];
            }
          } catch (error) {
            void error;
          }
        } else if (typeof resolvedScope !== 'undefined') {
          return resolvedScope;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = _collectCandidateScopes(settings.primaryScope || PRIMARY_SCOPE, settings.additionalScopes, settings.detect || detectGlobalScope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
        continue;
      }
      try {
        if (propertyName in candidate) {
          return candidate[propertyName];
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  var moduleCaches = {
    base: undefined,
    environment: undefined,
    environmentBridge: undefined,
    globals: undefined,
    globalScope: undefined,
    pendingQueueKey: undefined,
    moduleRegistry: typeof WeakMap === 'function' ? new WeakMap() : []
  };
  function getModuleBase() {
    if (typeof moduleCaches.base !== 'undefined') {
      return moduleCaches.base;
    }
    var base = tryRequire('./base.js');
    if (!base) {
      base = resolveFromScopes('cineModuleBase');
    }
    moduleCaches.base = base || null;
    return moduleCaches.base;
  }
  function getModuleEnvironment() {
    if (typeof moduleCaches.environment !== 'undefined') {
      return moduleCaches.environment;
    }
    var environment = tryRequire('./environment.js');
    if (!environment) {
      environment = resolveFromScopes('cineModuleEnvironment');
    }
    moduleCaches.environment = environment || null;
    return moduleCaches.environment;
  }
  function getEnvironmentBridge() {
    if (typeof moduleCaches.environmentBridge !== 'undefined') {
      return moduleCaches.environmentBridge;
    }
    var bridge = tryRequire('./environment-bridge.js');
    if (!bridge) {
      bridge = resolveFromScopes('cineEnvironmentBridge');
    }
    moduleCaches.environmentBridge = bridge || null;
    return moduleCaches.environmentBridge;
  }
  function getModuleGlobals() {
    if (typeof moduleCaches.globals !== 'undefined') {
      return moduleCaches.globals;
    }
    var moduleGlobals = tryRequire('./globals.js');
    if (!moduleGlobals) {
      moduleGlobals = resolveFromScopes('cineModuleGlobals', {
        primaryScope: getGlobalScope()
      });
    }
    moduleCaches.globals = moduleGlobals || null;
    return moduleCaches.globals;
  }
  function getGlobalScope() {
    if (typeof moduleCaches.globalScope !== 'undefined') {
      return moduleCaches.globalScope;
    }
    var bridge = getEnvironmentBridge();
    var environment = getModuleEnvironment();
    var base = getModuleBase();
    var scope = null;
    if (bridge && typeof bridge.getGlobalScope === 'function') {
      try {
        scope = bridge.getGlobalScope();
      } catch (error) {
        void error;
        scope = null;
      }
    }
    if (!scope && environment && typeof environment.getGlobalScope === 'function') {
      try {
        scope = environment.getGlobalScope();
      } catch (error) {
        void error;
        scope = null;
      }
    }
    if (!scope && base && typeof base.getGlobalScope === 'function') {
      try {
        scope = base.getGlobalScope();
      } catch (error) {
        void error;
        scope = null;
      }
    }
    if (!scope) {
      scope = detectGlobalScope();
    }
    moduleCaches.globalScope = scope || PRIMARY_SCOPE;
    return moduleCaches.globalScope;
  }
  function resolveRegistryFromCandidates(targetScope) {
    var moduleGlobals = getModuleGlobals();
    var bridge = getEnvironmentBridge();
    var environment = getModuleEnvironment();
    var base = getModuleBase();
    var registry = null;
    if (moduleGlobals && typeof moduleGlobals.resolveModuleRegistry === 'function') {
      try {
        registry = moduleGlobals.resolveModuleRegistry(targetScope);
      } catch (error) {
        void error;
        registry = null;
      }
    }
    if (!registry && moduleGlobals && typeof moduleGlobals.getModuleRegistry === 'function') {
      try {
        registry = moduleGlobals.getModuleRegistry(targetScope);
      } catch (error) {
        void error;
        registry = null;
      }
    }
    if (!registry && bridge && typeof bridge.getModuleRegistry === 'function') {
      try {
        registry = bridge.getModuleRegistry(targetScope);
      } catch (error) {
        void error;
        registry = null;
      }
    }
    if (!registry && environment && typeof environment.getModuleRegistry === 'function') {
      try {
        registry = environment.getModuleRegistry(targetScope);
      } catch (error) {
        void error;
        registry = null;
      }
    }
    if (!registry && environment && typeof environment.resolveModuleRegistry === 'function') {
      try {
        registry = environment.resolveModuleRegistry(targetScope);
      } catch (error) {
        void error;
        registry = null;
      }
    }
    if (!registry && base && typeof base.getModuleRegistry === 'function') {
      try {
        registry = base.getModuleRegistry(targetScope);
      } catch (error) {
        void error;
        registry = null;
      }
    }
    if (!registry) {
      var required = tryRequire('./registry.js');
      if (required && _typeof(required) === 'object') {
        registry = required;
      }
    }
    if (!registry) {
      registry = resolveFromScopes('cineModules', {
        primaryScope: targetScope
      });
    }
    return registry || null;
  }
  function getModuleRegistry(scope) {
    var targetScope = scope || getGlobalScope();
    var cache = moduleCaches.moduleRegistry;
    if (cache && typeof cache.get === 'function') {
      if (cache.has(targetScope)) {
        return cache.get(targetScope);
      }
      var registry = resolveRegistryFromCandidates(targetScope);
      cache.set(targetScope, registry || null);
      return registry || null;
    }
    if (Array.isArray(cache)) {
      for (var index = 0; index < cache.length; index += 1) {
        if (cache[index] && cache[index].scope === targetScope) {
          return cache[index].registry;
        }
      }
      var _registry = resolveRegistryFromCandidates(targetScope);
      cache.push({
        scope: targetScope,
        registry: _registry || null
      });
      return _registry || null;
    }
    return resolveRegistryFromCandidates(targetScope);
  }
  function getPendingQueueKey() {
    if (typeof moduleCaches.pendingQueueKey !== 'undefined') {
      return moduleCaches.pendingQueueKey;
    }
    var moduleGlobals = getModuleGlobals();
    var bridge = getEnvironmentBridge();
    var environment = getModuleEnvironment();
    var base = getModuleBase();
    var key = null;
    if (moduleGlobals && typeof moduleGlobals.getPendingQueueKey === 'function') {
      try {
        key = moduleGlobals.getPendingQueueKey();
      } catch (error) {
        void error;
        key = null;
      }
    }
    if (!key && bridge && typeof bridge.getPendingQueueKey === 'function') {
      try {
        key = bridge.getPendingQueueKey();
      } catch (error) {
        void error;
        key = null;
      }
    }
    if (!key && environment && typeof environment.PENDING_QUEUE_KEY === 'string' && environment.PENDING_QUEUE_KEY) {
      key = environment.PENDING_QUEUE_KEY;
    }
    if (!key && base && typeof base.PENDING_QUEUE_KEY === 'string' && base.PENDING_QUEUE_KEY) {
      key = base.PENDING_QUEUE_KEY;
    }
    moduleCaches.pendingQueueKey = key || '__cinePendingModuleRegistrations__';
    return moduleCaches.pendingQueueKey;
  }
  function recordModule(name, api) {
    var moduleGlobals = getModuleGlobals();
    if (!moduleGlobals || typeof moduleGlobals.recordModule !== 'function') {
      return;
    }
    try {
      moduleGlobals.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }
  var api = {
    detectGlobalScope: detectGlobalScope,
    collectCandidateScopes: function collectCandidateScopes(primary, extras, detect) {
      return _collectCandidateScopes(primary, extras, detect);
    },
    tryRequire: tryRequire,
    resolveFromScopes: resolveFromScopes,
    getPrimaryScope: function getPrimaryScope() {
      return PRIMARY_SCOPE;
    },
    getGlobalScope: getGlobalScope,
    getModuleEnvironment: getModuleEnvironment,
    getEnvironmentBridge: getEnvironmentBridge,
    getModuleGlobals: getModuleGlobals,
    getModuleRegistry: getModuleRegistry,
    getPendingQueueKey: getPendingQueueKey,
    recordModule: recordModule
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  var GLOBAL_SCOPE = getGlobalScope();
  if (GLOBAL_SCOPE && !GLOBAL_SCOPE.cineModuleLinker) {
    defineHiddenProperty(GLOBAL_SCOPE, 'cineModuleLinker', api);
  }
  recordModule('cineModuleLinker', api);
})();