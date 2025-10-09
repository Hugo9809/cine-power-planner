function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
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
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  function resolveScopeUtils(scope) {
    var primaryScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./helpers/scope-utils.js');
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
    pushCandidate(primaryScope);
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
      } catch (scopeError) {
        void scopeError;
      }
    }
    return null;
  }
  var SCOPE_UTILS = resolveScopeUtils(LOCAL_SCOPE);
  var detectGlobalScopeHelper = SCOPE_UTILS && typeof SCOPE_UTILS.detectGlobalScope === 'function' ? function detectWithUtils() {
    try {
      return SCOPE_UTILS.detectGlobalScope();
    } catch (error) {
      void error;
    }
    return fallbackDetectGlobalScope();
  } : fallbackDetectGlobalScope;
  var tryRequireHelper = SCOPE_UTILS && typeof SCOPE_UTILS.tryRequire === 'function' ? SCOPE_UTILS.tryRequire : fallbackTryRequire;
  var collectCandidateScopesHelper = SCOPE_UTILS && typeof SCOPE_UTILS.collectCandidateScopes === 'function' ? function collectCandidateScopesWithUtils(primary, extras, detect) {
    var detectFn = typeof detect === 'function' ? detect : detectGlobalScopeHelper;
    return SCOPE_UTILS.collectCandidateScopes(primary, extras, detectFn);
  } : fallbackCollectCandidateScopes;
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
  function resolveArchitectureCore(scope) {
    var required = tryRequireHelper('./architecture-core.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var candidates = collectCandidateScopesHelper(scope || LOCAL_SCOPE, null, detectGlobalScopeHelper);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleArchitectureCore) === 'object') {
        return candidate.cineModuleArchitectureCore;
      }
    }
    return null;
  }
  function resolveArchitecture(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    var required = tryRequireHelper('./architecture.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    if (targetScope && _typeof(targetScope.cineModuleArchitecture) === 'object') {
      return targetScope.cineModuleArchitecture;
    }
    return null;
  }
  function resolveArchitectureHelpers(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    var required = tryRequireHelper('./architecture-helpers.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    if (targetScope && _typeof(targetScope.cineModuleArchitectureHelpers) === 'object') {
      return targetScope.cineModuleArchitectureHelpers;
    }
    return null;
  }
  var ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);
  var ARCHITECTURE_HELPERS = resolveArchitectureHelpers(LOCAL_SCOPE);
  var ARCHITECTURE_CORE = resolveArchitectureCore(LOCAL_SCOPE);
  var CORE_INSTANCE = ARCHITECTURE_CORE && typeof ARCHITECTURE_CORE.createCore === 'function' ? ARCHITECTURE_CORE.createCore({
    primaryScope: LOCAL_SCOPE,
    pendingQueueKey: DEFAULT_PENDING_QUEUE_KEY
  }) : null;
  function resolveScopeCollector() {
    if (typeof require === 'function') {
      try {
        var required = require('./helpers/scope-collector.js');
        if (required && typeof required.createCollector === 'function') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = [];
    function pushCandidate(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (candidates.indexOf(scope) === -1) {
        candidates.push(scope);
      }
    }
    pushCandidate(LOCAL_SCOPE);
    if (typeof globalThis !== 'undefined') pushCandidate(globalThis);
    if (typeof window !== 'undefined') pushCandidate(window);
    if (typeof self !== 'undefined') pushCandidate(self);
    if (typeof global !== 'undefined') pushCandidate(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var scope = candidates[index];
      try {
        var collector = scope && scope.__cineScopeCollector;
        if (collector && typeof collector.createCollector === 'function') {
          return collector;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  var SCOPE_COLLECTOR = resolveScopeCollector();
  var createScopeCollector = SCOPE_COLLECTOR && typeof SCOPE_COLLECTOR.createCollector === 'function' ? SCOPE_COLLECTOR.createCollector : null;
  var DEFAULT_EXTRAS_KEY = {
    key: 'defaultExtras'
  };
  var HELPER_COLLECTOR_CACHE = [];
  function resolveHelperCollector(detectFn, extras) {
    if (!createScopeCollector) {
      return null;
    }
    var extrasKey = Array.isArray(extras) ? extras : DEFAULT_EXTRAS_KEY;
    for (var index = 0; index < HELPER_COLLECTOR_CACHE.length; index += 1) {
      var entry = HELPER_COLLECTOR_CACHE[index];
      if (entry.detect === detectFn && entry.extras === extrasKey) {
        return entry.collector;
      }
    }
    var collector = createScopeCollector({
      detectGlobalScope: detectFn,
      additionalScopes: Array.isArray(extras) ? extras : undefined
    });
    if (collector) {
      HELPER_COLLECTOR_CACHE.push({
        detect: detectFn,
        extras: extrasKey,
        collector: collector
      });
      return collector;
    }
    return null;
  }
  function fallbackCollectCandidateScopes(primary) {
    var collector = resolveHelperCollector(fallbackDetectGlobalScope, null);
    if (collector) {
      return collector(primary);
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
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    return scopes;
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
    } catch (error) {
      void error;
    }
    try {
      target[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  function fallbackEnsureQueue(scope, key) {
    var targetScope = scope || LOCAL_SCOPE;
    var queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return null;
    }
    var queue = targetScope[queueKey];
    if (Array.isArray(queue)) {
      return queue;
    }
    if (!fallbackDefineHiddenProperty(targetScope, queueKey, [])) {
      return null;
    }
    queue = targetScope[queueKey];
    if (!Array.isArray(queue)) {
      return null;
    }
    return queue;
  }
  function isEthereumProviderCandidate(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    if (PRIMARY_SCOPE && _typeof(PRIMARY_SCOPE) === 'object') {
      try {
        if (value === PRIMARY_SCOPE.ethereum) {
          return true;
        }
      } catch (error) {
        void error;
        return true;
      }
    }
    try {
      if (value.isMetaMask === true) {
        return true;
      }
    } catch (inspectionError) {
      if (inspectionError && typeof inspectionError.message === 'string' && /metamask/i.test(inspectionError.message)) {
        return true;
      }
    }
    try {
      if (typeof value.request === 'function' && typeof value.on === 'function') {
        if (typeof value.removeListener === 'function' || typeof value.removeEventListener === 'function') {
          return true;
        }
        var ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Ethereum|MetaMask|Provider/i.test(ctorName)) {
          return true;
        }
      }
    } catch (accessError) {
      void accessError;
      return true;
    }
    return false;
  }
  function shouldBypassDeepFreeze(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    try {
      if (typeof value.pipe === 'function' && typeof value.unpipe === 'function') {
        return true;
      }
      if (typeof value.on === 'function' && typeof value.emit === 'function') {
        if (typeof value.write === 'function' || typeof value.read === 'function') {
          return true;
        }
        var ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
          return true;
        }
      }
      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        var tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }
    return false;
  }
  function fallbackFreezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = void 0;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }
      if (descriptor && (typeof descriptor.get === 'function' || typeof descriptor.set === 'function')) {
        continue;
      }
      var child = void 0;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }
      if (!child || _typeof(child) !== 'object' && typeof child !== 'function') {
        continue;
      }
      if (shouldBypassDeepFreeze(child) || isEthereumProviderCandidate(child)) {
        continue;
      }
      fallbackFreezeDeep(child, seen);
    }
    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }
  function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }
    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  }
  function fallbackResolveModuleRegistry(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    var required = tryRequireHelper('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = collectCandidateScopesHelper(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  function fallbackQueueModuleRegistration(scope, name, api, options) {
    var targetScope = scope || LOCAL_SCOPE;
    var queue = fallbackEnsureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY);
    if (!queue) {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
    });
    try {
      queue.push(payload);
      return true;
    } catch (error) {
      void error;
    }
    try {
      queue[queue.length] = payload;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  function fallbackResolveFromScopes(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : collectCandidateScopes(settings.primaryScope || LOCAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      if (predicate) {
        try {
          if (predicate(scope, propertyName)) {
            return scope;
          }
        } catch (error) {
          void error;
        }
        continue;
      }
      var candidate = scope[propertyName];
      if (typeof candidate !== 'undefined') {
        return candidate;
      }
    }
    return null;
  }
  function preferFunction(coreFn, helperFn, architectureFn, fallbackFn) {
    return function applyPreferred() {
      var args = arguments;
      var candidates = [coreFn, helperFn, architectureFn];
      for (var index = 0; index < candidates.length; index += 1) {
        var candidate = candidates[index];
        if (typeof candidate !== 'function') {
          continue;
        }
        try {
          var result = candidate.apply(null, args);
          if (typeof result !== 'undefined' && result !== null) {
            return result;
          }
        } catch (error) {
          void error;
        }
      }
      return fallbackFn.apply(null, args);
    };
  }
  var detectGlobalScope = preferFunction(CORE_INSTANCE && CORE_INSTANCE.detectGlobalScope, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.detectGlobalScope, ARCHITECTURE && ARCHITECTURE.detectGlobalScope, fallbackDetectGlobalScope);
  var PRIMARY_SCOPE = detectGlobalScope();
  function fallbackCollectWithPrimary(primary) {
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }
  var baseCollectCandidateScopes = preferFunction(CORE_INSTANCE && CORE_INSTANCE.collectCandidateScopes, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.collectCandidateScopes, ARCHITECTURE && ARCHITECTURE.collectCandidateScopes, fallbackCollectWithPrimary);
  function collectCandidateScopes(primary) {
    return baseCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }
  var tryRequire = preferFunction(CORE_INSTANCE && CORE_INSTANCE.tryRequire, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.tryRequire, ARCHITECTURE && ARCHITECTURE.tryRequire, fallbackTryRequire);
  var defineHiddenProperty = preferFunction(CORE_INSTANCE && CORE_INSTANCE.defineHiddenProperty, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.defineHiddenProperty, ARCHITECTURE && ARCHITECTURE.defineHiddenProperty, fallbackDefineHiddenProperty);
  function ensureQueue(scope, key) {
    var resolvedScope = scope || PRIMARY_SCOPE;
    var resolvedKey = typeof key === 'string' && key ? key : getPendingQueueKey();
    var helperFn = ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.ensureQueue;
    if (typeof helperFn === 'function') {
      try {
        var helperQueue = helperFn(resolvedScope, resolvedKey);
        if (Array.isArray(helperQueue)) {
          return helperQueue;
        }
      } catch (error) {
        void error;
      }
    }
    var architectureFn = ARCHITECTURE && ARCHITECTURE.ensureQueue;
    if (typeof architectureFn === 'function') {
      try {
        var architectureQueue = architectureFn(resolvedScope, resolvedKey);
        if (Array.isArray(architectureQueue)) {
          return architectureQueue;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackEnsureQueue(resolvedScope, resolvedKey);
  }
  var baseFreezeDeep = preferFunction(CORE_INSTANCE && CORE_INSTANCE.freezeDeep, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.freezeDeep, ARCHITECTURE && ARCHITECTURE.freezeDeep, fallbackFreezeDeep);
  function freezeDeep(value, seen) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }
    return baseFreezeDeep(value, seen);
  }
  var safeWarn = preferFunction(CORE_INSTANCE && CORE_INSTANCE.safeWarn, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.safeWarn, ARCHITECTURE && ARCHITECTURE.safeWarn, fallbackSafeWarn);
  function resolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.resolveModuleRegistry === 'function') {
      try {
        var resolved = ARCHITECTURE_HELPERS.resolveModuleRegistry(targetScope);
        if (resolved && _typeof(resolved) === 'object') {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    return preferFunction(CORE_INSTANCE && CORE_INSTANCE.resolveModuleRegistry, null, ARCHITECTURE && ARCHITECTURE.resolveModuleRegistry, fallbackResolveModuleRegistry)(targetScope);
  }
  var baseResolveFromScopes = preferFunction(CORE_INSTANCE && CORE_INSTANCE.resolveFromScopes, ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.resolveFromScopes, ARCHITECTURE && ARCHITECTURE.resolveFromScopes, fallbackResolveFromScopes);
  function resolveFromScopes(propertyName, options) {
    var settings = options ? _objectSpread({}, options) : {};
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    return baseResolveFromScopes(propertyName, settings);
  }
  function queueModuleRegistration(scope, name, api, options) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.queueModuleRegistration === 'function') {
      try {
        if (ARCHITECTURE_HELPERS.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackQueueModuleRegistration(targetScope, name, api, options);
  }
  function getPendingQueueKey() {
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.pendingQueueKey === 'string' && ARCHITECTURE_HELPERS.pendingQueueKey) {
      return ARCHITECTURE_HELPERS.pendingQueueKey;
    }
    return DEFAULT_PENDING_QUEUE_KEY;
  }
  var kernel = Object.freeze({
    architecture: ARCHITECTURE || null,
    architectureCore: ARCHITECTURE_CORE || null,
    helpers: ARCHITECTURE_HELPERS || null,
    detectGlobalScope: detectGlobalScope,
    getGlobalScope: function getGlobalScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: tryRequire,
    defineHiddenProperty: defineHiddenProperty,
    ensureQueue: ensureQueue,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    resolveModuleRegistry: resolveModuleRegistry,
    resolveFromScopes: resolveFromScopes,
    queueModuleRegistration: queueModuleRegistration,
    getPendingQueueKey: getPendingQueueKey
  });
  var registry = resolveModuleRegistry(PRIMARY_SCOPE);
  var registrationOptions = {
    category: 'infrastructure',
    description: 'Unified kernel for module detection, registry resolution and queue management.',
    replace: true,
    connections: ['cineModuleArchitectureHelpers', 'cineModuleArchitectureCore']
  };
  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineModuleArchitectureKernel', kernel, registrationOptions);
    } catch (error) {
      safeWarn('cineModuleArchitectureKernel: immediate registry registration failed.', error);
      queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureKernel', kernel, registrationOptions);
    }
  } else {
    queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureKernel', kernel, registrationOptions);
  }
  if (PRIMARY_SCOPE && _typeof(PRIMARY_SCOPE) === 'object' && !PRIMARY_SCOPE.cineModuleArchitectureKernel) {
    defineHiddenProperty(PRIMARY_SCOPE, 'cineModuleArchitectureKernel', kernel);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = kernel;
  }
})();