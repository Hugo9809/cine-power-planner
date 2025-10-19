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
    pushCandidate(fallbackDetectGlobalScope());
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
  var BASE_SCOPE_EXTRAS_CACHE = typeof WeakMap === 'function' ? new WeakMap() : [];
  function resolveExtrasForBaseScope(baseScope) {
    if (!baseScope || _typeof(baseScope) !== 'object' && typeof baseScope !== 'function') {
      return undefined;
    }
    if (BASE_SCOPE_EXTRAS_CACHE && typeof BASE_SCOPE_EXTRAS_CACHE.get === 'function') {
      var _extras = BASE_SCOPE_EXTRAS_CACHE.get(baseScope);
      if (!_extras) {
        _extras = [baseScope];
        BASE_SCOPE_EXTRAS_CACHE.set(baseScope, _extras);
      }
      return _extras;
    }
    for (var index = 0; index < BASE_SCOPE_EXTRAS_CACHE.length; index += 1) {
      var entry = BASE_SCOPE_EXTRAS_CACHE[index];
      if (entry.scope === baseScope) {
        return entry.extras;
      }
    }
    var extras = [baseScope];
    BASE_SCOPE_EXTRAS_CACHE.push({
      scope: baseScope,
      extras: extras
    });
    return extras;
  }
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
  function fallbackCollectCandidateScopes(primary, baseScope) {
    var resolvedBaseScope = baseScope || fallbackDetectGlobalScope();
    var extras = resolveExtrasForBaseScope(resolvedBaseScope);
    var collector = resolveHelperCollector(fallbackDetectGlobalScope, extras);
    if (collector) {
      return collector(primary || resolvedBaseScope);
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
    pushScope(primary || resolvedBaseScope);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    return scopes;
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
  function fallbackEnsureQueue(scope, key, baseScope) {
    var targetScope = scope || baseScope;
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
  var BUILTIN_IMMUTABILITY = function resolveBuiltinImmutability() {
    var registryKey = '__cineBuiltinImmutabilityGuards__';
    var scopes = fallbackCollectCandidateScopes(null, fallbackDetectGlobalScope());
    if (typeof require === 'function') {
      try {
        var required = require('./helpers/immutability-builtins.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        var candidate = scope[registryKey];
        if (candidate && _typeof(candidate) === 'object') {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }();
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
  function isNodeProcessReference(value) {
    if (!value) {
      return false;
    }
    if (typeof process === 'undefined' || !process) {
      return false;
    }
    if (value === process) {
      return true;
    }
    if (_typeof(value) === 'object') {
      try {
        if (value.constructor && value.constructor.name === 'process') {
          return true;
        }
      } catch (processInspectionError) {
        void processInspectionError;
      }
      if (typeof value.pid === 'number' && typeof value.nextTick === 'function' && typeof value.emit === 'function' && typeof value.binding === 'function') {
        return true;
      }
    }
    if (typeof value === 'function') {
      if (value === process.binding || value === process._linkedBinding || value === process.dlopen) {
        return true;
      }
      try {
        var functionName = value.name || '';
        if (functionName && (functionName === 'binding' || functionName === 'dlopen')) {
          var source = Function.prototype.toString.call(value);
          if (source && source.indexOf('[native code]') !== -1) {
            return true;
          }
        }
      } catch (functionInspectionError) {
        void functionInspectionError;
      }
    }
    return false;
  }
  function shouldBypassDeepFreeze(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    if (isNodeProcessReference(value)) {
      return true;
    }
    if (_typeof(value) === 'object' && value && typeof value.id === 'string' && typeof value.filename === 'string' && (typeof value.loaded === 'boolean' || Array.isArray(value.children))) {
      return true;
    }
    if (typeof process !== 'undefined' && process && process.release && process.release.name === 'node') {
      return true;
    }
    try {
      if (BUILTIN_IMMUTABILITY && typeof BUILTIN_IMMUTABILITY.isImmutableBuiltin === 'function' && BUILTIN_IMMUTABILITY.isImmutableBuiltin(value)) {
        return true;
      }
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
  function fallbackResolveSeenTracker(seen) {
    if (seen && typeof seen.has === 'function' && typeof seen.add === 'function') {
      return seen;
    }
    if (Array.isArray(seen)) {
      return {
        has: function has(value) {
          return seen.indexOf(value) !== -1;
        },
        add: function add(value) {
          if (seen.indexOf(value) === -1) {
            seen.push(value);
          }
        }
      };
    }
    if (typeof WeakSet === 'function') {
      try {
        return new WeakSet();
      } catch (trackerError) {
        void trackerError;
      }
    }
    var tracked = [];
    return {
      has: function has(value) {
        return tracked.indexOf(value) !== -1;
      },
      add: function add(value) {
        if (tracked.indexOf(value) === -1) {
          tracked.push(value);
        }
      }
    };
  }
  function fallbackFreezeDeep(value, seen) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }
    var tracker = fallbackResolveSeenTracker(seen);
    if (tracker.has(value)) {
      return value;
    }
    tracker.add(value);
    var keys;
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
      return value;
    }
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
      fallbackFreezeDeep(child, tracker);
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
  function fallbackResolveModuleRegistry(scope, baseScope) {
    var targetScope = scope || baseScope;
    var required = fallbackTryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = fallbackCollectCandidateScopes(targetScope, baseScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  function fallbackQueueModuleRegistration(scope, name, api, options, baseScope) {
    var targetScope = scope || baseScope;
    var queue = fallbackEnsureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY, baseScope);
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
  function createFallbackKernel(primaryScope) {
    var baseScope = primaryScope || fallbackDetectGlobalScope();
    return {
      detectGlobalScope: fallbackDetectGlobalScope,
      getGlobalScope: function getGlobalScope() {
        return baseScope;
      },
      collectCandidateScopes: function collectCandidateScopes(primary) {
        return fallbackCollectCandidateScopes(primary || baseScope, baseScope);
      },
      tryRequire: fallbackTryRequire,
      defineHiddenProperty: fallbackDefineHiddenProperty,
      ensureQueue: function ensureQueue(scope, key) {
        return fallbackEnsureQueue(scope || baseScope, key, baseScope);
      },
      freezeDeep: fallbackFreezeDeep,
      safeWarn: fallbackSafeWarn,
      resolveModuleRegistry: function resolveModuleRegistry(scope) {
        return fallbackResolveModuleRegistry(scope || baseScope, baseScope);
      },
      queueModuleRegistration: function queueModuleRegistration(scope, name, api, options) {
        return fallbackQueueModuleRegistration(scope || baseScope, name, api, options, baseScope);
      },
      getPendingQueueKey: function getPendingQueueKey() {
        return DEFAULT_PENDING_QUEUE_KEY;
      }
    };
  }
  function resolveArchitectureKernel(scope) {
    var targetScope = scope || fallbackDetectGlobalScope();
    if (typeof require === 'function') {
      try {
        var required = require('./architecture-kernel.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleArchitectureKernel) === 'object') {
      return targetScope.cineModuleArchitectureKernel;
    }
    return null;
  }
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  var RESOLVED_KERNEL = resolveArchitectureKernel(LOCAL_SCOPE);
  var ACTIVE_KERNEL = RESOLVED_KERNEL || createFallbackKernel(LOCAL_SCOPE);
  function detectGlobalScope() {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.detectGlobalScope === 'function') {
      try {
        var detected = ACTIVE_KERNEL.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }
  var PRIMARY_SCOPE = ACTIVE_KERNEL && typeof ACTIVE_KERNEL.getGlobalScope === 'function' ? function resolvePrimaryScope() {
    try {
      var scoped = ACTIVE_KERNEL.getGlobalScope();
      if (scoped) {
        return scoped;
      }
    } catch (error) {
      void error;
    }
    return detectGlobalScope();
  }() : detectGlobalScope();
  var PENDING_QUEUE_KEY = ACTIVE_KERNEL && typeof ACTIVE_KERNEL.getPendingQueueKey === 'function' ? ACTIVE_KERNEL.getPendingQueueKey() : DEFAULT_PENDING_QUEUE_KEY;
  function collectCandidateScopes(primary) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.collectCandidateScopes === 'function') {
      try {
        var collected = ACTIVE_KERNEL.collectCandidateScopes(primary || PRIMARY_SCOPE);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE, PRIMARY_SCOPE);
  }
  function baseTryRequire(modulePath) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.tryRequire === 'function') {
      try {
        var result = ACTIVE_KERNEL.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackTryRequire(modulePath);
  }
  function baseResolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.resolveModuleRegistry === 'function') {
      try {
        var resolved = ACTIVE_KERNEL.resolveModuleRegistry(targetScope);
        if (resolved && _typeof(resolved) === 'object') {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    var required = baseTryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = collectCandidateScopes(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  var cachedModuleRegistry = null;
  var hasResolvedRegistry = false;
  function getModuleRegistry(scope) {
    if (!hasResolvedRegistry || scope && scope !== PRIMARY_SCOPE) {
      var resolved = baseResolveModuleRegistry(scope);
      if (scope && scope !== PRIMARY_SCOPE) {
        return resolved;
      }
      cachedModuleRegistry = resolved;
      hasResolvedRegistry = true;
    }
    return cachedModuleRegistry;
  }
  function ensureQueue(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.ensureQueue === 'function') {
      try {
        var queue = ACTIVE_KERNEL.ensureQueue(targetScope, PENDING_QUEUE_KEY);
        if (Array.isArray(queue)) {
          return queue;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackEnsureQueue(targetScope, PENDING_QUEUE_KEY, PRIMARY_SCOPE);
  }
  function _queueModuleRegistration(scope, name, api, options) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.queueModuleRegistration === 'function') {
      try {
        if (ACTIVE_KERNEL.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    var queue = ensureQueue(targetScope);
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
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function baseRegisterOrQueueModule(scope, registry, name, api, options, onError) {
    if (registry && typeof registry.register === 'function') {
      try {
        registry.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }
    _queueModuleRegistration(scope, name, api, options);
    return false;
  }
  function baseFreezeDeep(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.freezeDeep === 'function') {
      try {
        return ACTIVE_KERNEL.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }
    return fallbackFreezeDeep(value);
  }
  function baseSafeWarn(message, detail) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.safeWarn === 'function') {
      try {
        ACTIVE_KERNEL.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }
    fallbackSafeWarn(message, detail);
  }
  function exposeGlobal(name, value, scope) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return false;
    }
    var descriptor = {
      configurable: options.configurable !== false,
      enumerable: !!options.enumerable,
      value: value,
      writable: options.writable === true
    };
    try {
      Object.defineProperty(targetScope, name, descriptor);
      return true;
    } catch (error) {
      void error;
      try {
        targetScope[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }
  var baseApi = baseFreezeDeep({
    getGlobalScope: function getGlobalScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: baseTryRequire,
    resolveModuleRegistry: baseResolveModuleRegistry,
    getModuleRegistry: getModuleRegistry,
    queueModuleRegistration: function queueModuleRegistration(name, api, options, scope) {
      return _queueModuleRegistration(scope || PRIMARY_SCOPE, name, api, options);
    },
    registerOrQueueModule: function registerOrQueueModule(name, api, options, onError, scope, registry) {
      var targetScope = scope || PRIMARY_SCOPE;
      var moduleRegistry = registry || getModuleRegistry(targetScope);
      return baseRegisterOrQueueModule(targetScope, moduleRegistry, name, api, options, onError);
    },
    freezeDeep: baseFreezeDeep,
    safeWarn: baseSafeWarn,
    exposeGlobal: exposeGlobal,
    PENDING_QUEUE_KEY: PENDING_QUEUE_KEY
  });
  var registry = getModuleRegistry();
  baseRegisterOrQueueModule(PRIMARY_SCOPE, registry, 'cineModuleBase', baseApi, {
    category: 'infrastructure',
    description: 'Shared helpers for module registration, freezing and safe global exposure.',
    replace: true,
    connections: ['cineModuleArchitectureKernel', 'cineModuleArchitectureHelpers']
  }, function (error) {
    baseSafeWarn('Unable to register cineModuleBase.', error);
  });
  exposeGlobal('cineModuleBase', baseApi, PRIMARY_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = baseApi;
  }
})();