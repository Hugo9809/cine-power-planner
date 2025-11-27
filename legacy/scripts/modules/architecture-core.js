function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  function baseDetectGlobalScope() {
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
  var LOCAL_SCOPE = baseDetectGlobalScope();
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
  var detectGlobalScope = SCOPE_UTILS && typeof SCOPE_UTILS.detectGlobalScope === 'function' ? function detectWithUtils() {
    try {
      return SCOPE_UTILS.detectGlobalScope();
    } catch (error) {
      void error;
    }
    return baseDetectGlobalScope();
  } : baseDetectGlobalScope;
  var tryRequire = SCOPE_UTILS && typeof SCOPE_UTILS.tryRequire === 'function' ? SCOPE_UTILS.tryRequire : tryRequireFallback;
  var defineHiddenProperty = SCOPE_UTILS && typeof SCOPE_UTILS.defineHiddenProperty === 'function' ? SCOPE_UTILS.defineHiddenProperty : defineHiddenPropertyFallback;
  function resolveScopeCollector() {
    var required = tryRequire('./helpers/scope-collector.js');
    if (required && typeof required.createCollector === 'function') {
      return required;
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
    try {
      pushCandidate(detectGlobalScope());
    } catch (error) {
      void error;
    }
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
    var extrasKey = Array.isArray(extras) ? extras : DEFAULT_EXTRAS_KEY;
    for (var index = 0; index < HELPER_COLLECTOR_CACHE.length; index += 1) {
      var entry = HELPER_COLLECTOR_CACHE[index];
      if (entry.detect === detectFn && entry.extras === extrasKey) {
        return entry.collector;
      }
    }
    var collector = createScopeCollector ? createScopeCollector({
      detectGlobalScope: detectFn,
      additionalScopes: Array.isArray(extras) ? extras : undefined
    }) : null;
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
  function collectCandidateScopesImpl(primary, detect, extras) {
    if (SCOPE_UTILS && typeof SCOPE_UTILS.collectCandidateScopes === 'function') {
      var _detectFn = typeof detect === 'function' ? detect : detectGlobalScope;
      return SCOPE_UTILS.collectCandidateScopes(primary, extras, _detectFn);
    }
    var detectFn = typeof detect === 'function' ? detect : detectGlobalScope;
    if (createScopeCollector) {
      var collector = resolveHelperCollector(detectFn, extras);
      if (collector) {
        return collector(primary);
      }
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
    try {
      var detected = detectFn();
      pushScope(detected);
    } catch (error) {
      void error;
    }
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    if (Array.isArray(extras)) {
      for (var index = 0; index < extras.length; index += 1) {
        pushScope(extras[index]);
      }
    }
    return scopes.slice();
  }
  function tryRequireFallback(modulePath) {
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
  function defineHiddenPropertyFallback(target, key, value) {
    if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
      return false;
    }
    try {
      Object.defineProperty(target, key, {
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
      target[key] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  function ensureQueueImpl(scope, key, defineHiddenProperty) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;
    var queue = scope[queueKey];
    if (Array.isArray(queue)) {
      return queue;
    }
    if (defineHiddenProperty(scope, queueKey, [])) {
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }
    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    } catch (error) {
      void error;
    }
    return null;
  }
  function safeWarnImpl(message, detail) {
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
  function resolveFromScopesImpl(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : [];
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
      if (candidate && _typeof(candidate) === 'object') {
        return candidate;
      }
    }
    return null;
  }
  function resolveImmutabilityImpl(scope, tryRequire, collectCandidateScopes) {
    var targetScope = scope || baseDetectGlobalScope();
    try {
      var required = tryRequire('./immutability.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }
    var scopes = collectCandidateScopes(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModuleImmutability) === 'object') {
        return candidate.cineModuleImmutability;
      }
    }
    return null;
  }
  function resolveBuiltinImmutabilityImpl(options) {
    var tryRequireFn = options && typeof options.tryRequire === 'function' ? options.tryRequire : tryRequire;
    var collectCandidateScopes = options && typeof options.collectCandidateScopes === 'function' ? options.collectCandidateScopes : function collect() {
      return collectCandidateScopesImpl(null, detectGlobalScope, []);
    };
    try {
      var required = tryRequireFn('./helpers/immutability-builtins.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }
    var registryKey = '__cineBuiltinImmutabilityGuards__';
    var scopes = collectCandidateScopes();
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
  }
  function createFallbackImmutability(builtin) {
    function shouldBypass(value) {
      if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
        return false;
      }
      try {
        if (typeof module !== 'undefined' && module && typeof module.constructor === 'function' && value instanceof module.constructor) {
          return true;
        }
        if (builtin && typeof builtin.isImmutableBuiltin === 'function' && builtin.isImmutableBuiltin(value)) {
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
    function freeze(value) {
      var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
      if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
        return value;
      }
      if (shouldBypass(value)) {
        return value;
      }
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      var keys = [];
      try {
        keys = Object.getOwnPropertyNames(value);
      } catch (inspectionError) {
        void inspectionError;
        if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
          try {
            keys = Reflect.ownKeys(value).filter(function filterStringKeys(key) {
              return typeof key === 'string';
            });
          } catch (reflectError) {
            void reflectError;
            keys = [];
          }
        }
      }
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
        var hasOwn = true;
        try {
          hasOwn = Object.prototype.hasOwnProperty.call(value, key);
        } catch (hasOwnError) {
          void hasOwnError;
          hasOwn = true;
        }
        if (!hasOwn) {
          continue;
        }
        var child = void 0;
        try {
          child = value[key];
        } catch (accessError) {
          void accessError;
          child = undefined;
        }
        if (!child || typeof child === 'function' || _typeof(child) !== 'object' && typeof child !== 'function') {
          continue;
        }
        try {
          freeze(child, seen);
        } catch (childError) {
          void childError;
        }
      }
      try {
        return Object.freeze(value);
      } catch (freezeError) {
        void freezeError;
        return value;
      }
    }
    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze
    };
  }
  function createCore(options) {
    var settings = options || {};
    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (_typeof(settings.primaryScope) === 'object' || typeof settings.primaryScope === 'function' ? settings.primaryScope : _typeof(settings.scope) === 'object' || typeof settings.scope === 'function' ? settings.scope : null);
    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : null;
    var cachedPrimaryScope = null;
    function detectPrimaryScope() {
      try {
        if (detectOverride) {
          var _detected = detectOverride();
          if (_detected) {
            cachedPrimaryScope = _detected;
            return _detected;
          }
        }
      } catch (error) {
        void error;
      }
      if (cachedPrimaryScope) {
        return cachedPrimaryScope;
      }
      var detected = customPrimaryScope || detectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }
    function getPrimaryScope() {
      return detectPrimaryScope();
    }
    var additionalScopes = Array.isArray(settings.additionalScopes) ? settings.additionalScopes.filter(function isObjectLike(value) {
      return value && (_typeof(value) === 'object' || typeof value === 'function');
    }) : [];
    var tryRequireFn = typeof settings.tryRequire === 'function' ? function tryRequireWithOverride(modulePath) {
      try {
        return settings.tryRequire(modulePath);
      } catch (error) {
        void error;
      }
      return tryRequire(modulePath);
    } : tryRequire;
    var pendingQueueKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey ? settings.pendingQueueKey : DEFAULT_PENDING_QUEUE_KEY;
    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;
    function collectCandidateScopes(primary) {
      return collectCandidateScopesImpl(primary || customPrimaryScope, detectPrimaryScope, additionalScopes);
    }
    var builtinImmutability = resolveBuiltinImmutabilityImpl({
      tryRequire: tryRequireFn,
      collectCandidateScopes: collectCandidateScopes
    });
    var fallbackImmutability = createFallbackImmutability(builtinImmutability);
    var activeImmutability = null;
    function resolveImmutability(scope) {
      try {
        var resolved = resolveImmutabilityImpl(scope, tryRequireFn, collectCandidateScopes);
        if (resolved) {
          activeImmutability = resolved;
          return resolved;
        }
      } catch (error) {
        void error;
      }
      return null;
    }
    function getImmutability(scope) {
      if (activeImmutability && activeImmutability !== fallbackImmutability) {
        return activeImmutability;
      }
      var resolved = resolveImmutability(scope || getPrimaryScope());
      if (resolved && resolved !== activeImmutability) {
        activeImmutability = resolved;
        return resolved;
      }
      activeImmutability = fallbackImmutability;
      return activeImmutability;
    }
    function freezeDeep(value, seen) {
      if (freezeOverride) {
        try {
          return freezeOverride(value, seen);
        } catch (error) {
          void error;
        }
      }
      var provider = getImmutability();
      try {
        return provider.freezeDeep(value, seen);
      } catch (error) {
        void error;
      }
      return fallbackImmutability.freezeDeep(value, seen);
    }
    function ensureQueue(scope, key) {
      var queueKey = typeof key === 'string' && key ? key : pendingQueueKey;
      return ensureQueueImpl(scope || getPrimaryScope(), queueKey, defineHiddenProperty);
    }
    function resolveFromScopes(propertyName, resolveOptions) {
      if (resolveOverride) {
        try {
          return resolveOverride(propertyName, resolveOptions);
        } catch (error) {
          void error;
        }
      }
      var optionsToUse = resolveOptions ? _objectSpread({}, resolveOptions) : {};
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return resolveFromScopesImpl(propertyName, optionsToUse);
    }
    function safeWarn(message, detail) {
      if (warnOverride) {
        try {
          warnOverride(message, detail);
          return;
        } catch (error) {
          void error;
        }
      }
      safeWarnImpl(message, detail);
    }
    var defineHiddenPropertyFn = function defineHiddenPropertyBound(target, key, value) {
      return defineHiddenProperty(target, key, value);
    };
    return Object.freeze({
      detectGlobalScope: detectGlobalScope,
      getPrimaryScope: getPrimaryScope,
      collectCandidateScopes: collectCandidateScopes,
      tryRequire: tryRequire,
      resolveFromScopes: resolveFromScopes,
      defineHiddenProperty: defineHiddenPropertyFn,
      ensureQueue: ensureQueue,
      freezeDeep: freezeDeep,
      safeWarn: safeWarn,
      resolveImmutability: resolveImmutability,
      getImmutability: getImmutability,
      pendingQueueKey: pendingQueueKey,
      fallbackImmutability: fallbackImmutability
    });
  }
  var defaultCore = createCore();
  var architectureCore = Object.freeze({
    DEFAULT_PENDING_QUEUE_KEY: DEFAULT_PENDING_QUEUE_KEY,
    createCore: createCore,
    detectGlobalScope: defaultCore.detectGlobalScope,
    getPrimaryScope: defaultCore.getPrimaryScope,
    collectCandidateScopes: defaultCore.collectCandidateScopes,
    tryRequire: defaultCore.tryRequire,
    resolveFromScopes: defaultCore.resolveFromScopes,
    defineHiddenProperty: defaultCore.defineHiddenProperty,
    ensureQueue: defaultCore.ensureQueue,
    freezeDeep: defaultCore.freezeDeep,
    safeWarn: defaultCore.safeWarn,
    resolveImmutability: defaultCore.resolveImmutability,
    getImmutability: defaultCore.getImmutability
  });
  var globalScope = defaultCore.detectGlobalScope();
  if (globalScope && _typeof(globalScope) === 'object' && !globalScope.cineModuleArchitectureCore) {
    defaultCore.defineHiddenProperty(globalScope, 'cineModuleArchitectureCore', architectureCore);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureCore;
  }
})();