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
  function fallbackDefineHiddenProperty(target, key, value) {
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
    if (primary) {
      pushScope(primary);
    }
    pushScope(fallbackDetectGlobalScope());
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    return scopes;
  }
  function cloneOptions(source) {
    if (!source || _typeof(source) !== 'object') {
      return {};
    }
    var clone = {};
    var keys = Object.keys(source);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      clone[key] = source[key];
    }
    return clone;
  }
  function fallbackResolveFromScopes(propertyName, options) {
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
  function fallbackCreateImmutability() {
    function shouldBypass(value) {
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
    function freeze(value) {
      var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
      if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
        return value;
      }
      if (shouldBypass(value)) {
        return value;
      }
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      var keys = Object.getOwnPropertyNames(value);
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
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
        freeze(child, seen);
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
  var FALLBACK_IMMUTABILITY = fallbackCreateImmutability();
  function fallbackEnsureQueue(scope, key) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;
    var queue = scope[queueKey];
    if (Array.isArray(queue)) {
      return queue;
    }
    if (fallbackDefineHiddenProperty(scope, queueKey, [])) {
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
  function resolveArchitectureCore(scope) {
    if (typeof require === 'function') {
      try {
        var required = require('./architecture-core.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = [];
    var primary = scope || fallbackDetectGlobalScope();
    if (primary && _typeof(primary) === 'object') {
      candidates.push(primary);
    }
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleArchitectureCore) === 'object') {
        return candidate.cineModuleArchitectureCore;
      }
    }
    return null;
  }
  function createFallbackCore(options) {
    var settings = options || {};
    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (_typeof(settings.primaryScope) === 'object' || typeof settings.primaryScope === 'function' ? settings.primaryScope : _typeof(settings.scope) === 'object' || typeof settings.scope === 'function' ? settings.scope : null);
    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : null;
    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;
    var tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : null;
    var additionalScopes = Array.isArray(settings.additionalScopes) ? settings.additionalScopes.filter(function isObjectLike(value) {
      return value && (_typeof(value) === 'object' || typeof value === 'function');
    }) : [];
    var pendingQueueKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey ? settings.pendingQueueKey : DEFAULT_PENDING_QUEUE_KEY;
    var cachedPrimaryScope = null;
    function detectGlobalScope() {
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
      var detected = customPrimaryScope || fallbackDetectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }
    function getPrimaryScope() {
      return detectGlobalScope();
    }
    function collectCandidateScopes(primary) {
      var targetPrimary = primary || customPrimaryScope;
      var collector = resolveHelperCollector(detectGlobalScope, additionalScopes);
      if (collector) {
        return collector(targetPrimary);
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
      pushScope(targetPrimary);
      pushScope(getPrimaryScope());
      if (typeof globalThis !== 'undefined') pushScope(globalThis);
      if (typeof window !== 'undefined') pushScope(window);
      if (typeof self !== 'undefined') pushScope(self);
      if (typeof global !== 'undefined') pushScope(global);
      for (var index = 0; index < additionalScopes.length; index += 1) {
        pushScope(additionalScopes[index]);
      }
      return scopes;
    }
    var tryRequire = tryRequireOverride ? function tryRequireWithOverride(modulePath) {
      try {
        return tryRequireOverride(modulePath);
      } catch (error) {
        void error;
      }
      return fallbackTryRequire(modulePath);
    } : fallbackTryRequire;
    var activeImmutability = null;
    function resolveImmutability(scope) {
      try {
        var required = tryRequire('./immutability.js');
        if (required && _typeof(required) === 'object') {
          activeImmutability = required;
          return required;
        }
      } catch (error) {
        void error;
      }
      var scopes = collectCandidateScopes(scope);
      for (var index = 0; index < scopes.length; index += 1) {
        var candidate = scopes[index];
        if (candidate && _typeof(candidate.cineModuleImmutability) === 'object') {
          activeImmutability = candidate.cineModuleImmutability;
          return activeImmutability;
        }
      }
      return null;
    }
    function getImmutability(scope) {
      if (activeImmutability && activeImmutability !== FALLBACK_IMMUTABILITY) {
        return activeImmutability;
      }
      var resolved = resolveImmutability(scope || getPrimaryScope());
      if (resolved && resolved !== activeImmutability) {
        activeImmutability = resolved;
        return resolved;
      }
      activeImmutability = FALLBACK_IMMUTABILITY;
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
      return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
    }
    function ensureQueue(scope, key) {
      var queueKey = typeof key === 'string' && key ? key : pendingQueueKey;
      return fallbackEnsureQueue(scope || getPrimaryScope(), queueKey);
    }
    function resolveFromScopes(propertyName, resolveOptions) {
      if (resolveOverride) {
        try {
          return resolveOverride(propertyName, resolveOptions);
        } catch (error) {
          void error;
        }
      }
      var optionsToUse = cloneOptions(resolveOptions);
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return fallbackResolveFromScopes(propertyName, optionsToUse);
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
      fallbackSafeWarn(message, detail);
    }
    return Object.freeze({
      detectGlobalScope: detectGlobalScope,
      getPrimaryScope: getPrimaryScope,
      collectCandidateScopes: collectCandidateScopes,
      tryRequire: tryRequire,
      resolveFromScopes: resolveFromScopes,
      defineHiddenProperty: fallbackDefineHiddenProperty,
      ensureQueue: ensureQueue,
      freezeDeep: freezeDeep,
      safeWarn: safeWarn
    });
  }
  var ARCHITECTURE_CORE = resolveArchitectureCore(fallbackDetectGlobalScope());
  var CORE_FACTORY = ARCHITECTURE_CORE && typeof ARCHITECTURE_CORE.createCore === 'function' ? ARCHITECTURE_CORE.createCore : createFallbackCore;
  function instantiateCore(options) {
    var fallbackInstance = createFallbackCore(options);
    if (!CORE_FACTORY || typeof CORE_FACTORY !== 'function') {
      return {
        primary: fallbackInstance,
        fallback: fallbackInstance
      };
    }
    try {
      var instance = CORE_FACTORY(options || {});
      if (instance && _typeof(instance) === 'object') {
        return {
          primary: instance,
          fallback: fallbackInstance
        };
      }
    } catch (error) {
      fallbackSafeWarn('cineModuleArchitecture: core factory failed; using fallback core.', error);
    }
    return {
      primary: fallbackInstance,
      fallback: fallbackInstance
    };
  }
  function wrapMethod(primaryCore, fallbackCore, methodName, fallbackImpl, warn) {
    var primaryFn = primaryCore && typeof primaryCore[methodName] === 'function' ? primaryCore[methodName] : null;
    var fallbackFn = fallbackCore && typeof fallbackCore[methodName] === 'function' ? fallbackCore[methodName] : null;
    var ultimateFallback = typeof fallbackImpl === 'function' ? fallbackImpl : null;
    var shouldSuppressWarning = function shouldSuppressWarning(error) {
      if (!error || typeof error.message !== 'string') {
        return false;
      }
      if (error.message.includes('trap returned extra keys but proxy target is non-extensible')) {
        return true;
      }
      if (error.message.includes('Cannot freeze')) {
        return true;
      }
      return false;
    };
    return function wrappedMethod() {
      var args = arguments;
      if (primaryFn) {
        try {
          return primaryFn.apply(primaryCore, args);
        } catch (error) {
          if (typeof warn === 'function') {
            try {
              if (!shouldSuppressWarning(error)) {
                warn('cineModuleArchitecture.' + methodName + ': primary implementation failed, using fallback.', error);
              }
            } catch (warnError) {
              void warnError;
            }
          }
        }
      }
      if (fallbackFn) {
        return fallbackFn.apply(fallbackCore, args);
      }
      if (ultimateFallback) {
        return ultimateFallback.apply(null, args);
      }
      return undefined;
    };
  }
  function createArchitectureInstance(options) {
    var instances = instantiateCore(options || {});
    var primaryCore = instances.primary;
    var fallbackCore = instances.fallback;
    var safeWarn = wrapMethod(primaryCore, fallbackCore, 'safeWarn', fallbackSafeWarn, null);
    function wrap(methodName, fallbackImpl) {
      return wrapMethod(primaryCore, fallbackCore, methodName, fallbackImpl, safeWarn);
    }
    var detectGlobalScope = wrap('detectGlobalScope', fallbackDetectGlobalScope);
    var getPrimaryScope = wrap('getPrimaryScope', function defaultGetPrimaryScope() {
      return detectGlobalScope();
    });
    var collectCandidateScopes = wrap('collectCandidateScopes', function collectWithFallback(primary) {
      var target = primary || getPrimaryScope();
      return fallbackCollectCandidateScopes(target);
    });
    var tryRequire = wrap('tryRequire', fallbackTryRequire);
    var resolveFromScopes = wrap('resolveFromScopes', function resolveWithFallback(propertyName, resolveOptions) {
      var optionsToUse = cloneOptions(resolveOptions);
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return fallbackResolveFromScopes(propertyName, optionsToUse);
    });
    var defineHiddenProperty = wrap('defineHiddenProperty', fallbackDefineHiddenProperty);
    var ensureQueue = wrap('ensureQueue', function ensureQueueWithFallback(scope, key) {
      var scopeToUse = scope || getPrimaryScope();
      return fallbackEnsureQueue(scopeToUse, key);
    });
    var freezeDeep = wrap('freezeDeep', function freezeDeepWithFallback(value, seen) {
      return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
    });
    return Object.freeze({
      detectGlobalScope: detectGlobalScope,
      getPrimaryScope: getPrimaryScope,
      collectCandidateScopes: collectCandidateScopes,
      tryRequire: tryRequire,
      resolveFromScopes: resolveFromScopes,
      defineHiddenProperty: defineHiddenProperty,
      ensureQueue: ensureQueue,
      freezeDeep: freezeDeep,
      safeWarn: safeWarn
    });
  }
  var defaultInstance = createArchitectureInstance({});
  var architecture = Object.freeze({
    detectGlobalScope: defaultInstance.detectGlobalScope,
    collectCandidateScopes: defaultInstance.collectCandidateScopes,
    tryRequire: defaultInstance.tryRequire,
    resolveFromScopes: defaultInstance.resolveFromScopes,
    defineHiddenProperty: defaultInstance.defineHiddenProperty,
    ensureQueue: defaultInstance.ensureQueue,
    freezeDeep: defaultInstance.freezeDeep,
    safeWarn: defaultInstance.safeWarn
  });
  function createModuleArchitecture(options) {
    var settings = options || {};
    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (_typeof(settings.primaryScope) === 'object' || typeof settings.primaryScope === 'function' ? settings.primaryScope : _typeof(settings.scope) === 'object' || typeof settings.scope === 'function' ? settings.scope : null);
    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : function detectOverride() {
      return customPrimaryScope || defaultInstance.detectGlobalScope();
    };
    var additionalScopes = Array.isArray(settings.additionalScopes) ? settings.additionalScopes.filter(function isObjectLike(value) {
      return value && (_typeof(value) === 'object' || typeof value === 'function');
    }) : [];
    var tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : defaultInstance.tryRequire;
    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var ensureQueueDefaultKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey ? settings.pendingQueueKey : DEFAULT_PENDING_QUEUE_KEY;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : defaultInstance.freezeDeep;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : defaultInstance.safeWarn;
    var instance = createArchitectureInstance({
      primaryScope: customPrimaryScope,
      detectGlobalScope: detectOverride,
      additionalScopes: additionalScopes,
      tryRequire: tryRequireOverride,
      resolveFromScopes: resolveOverride,
      pendingQueueKey: ensureQueueDefaultKey,
      freezeDeep: freezeOverride,
      safeWarn: warnOverride
    });
    return Object.freeze({
      detectGlobalScope: instance.detectGlobalScope,
      collectCandidateScopes: instance.collectCandidateScopes,
      tryRequire: instance.tryRequire,
      resolveFromScopes: instance.resolveFromScopes,
      defineHiddenProperty: instance.defineHiddenProperty,
      ensureQueue: instance.ensureQueue,
      freezeDeep: instance.freezeDeep,
      safeWarn: instance.safeWarn
    });
  }
  var architectureWithFactory = Object.freeze(_objectSpread(_objectSpread({}, architecture), {}, {
    createModuleArchitecture: createModuleArchitecture
  }));
  var globalScope = defaultInstance.getPrimaryScope ? defaultInstance.getPrimaryScope() : defaultInstance.detectGlobalScope();
  if (globalScope && _typeof(globalScope) === 'object' && !globalScope.cineModuleArchitecture) {
    architecture.defineHiddenProperty(globalScope, 'cineModuleArchitecture', architectureWithFactory);
  }
  if (globalScope && _typeof(globalScope) === 'object' && !globalScope.cineModuleArchitectureFactory) {
    architecture.defineHiddenProperty(globalScope, 'cineModuleArchitectureFactory', Object.freeze({
      createModuleArchitecture: createModuleArchitecture
    }));
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureWithFactory;
  }
})();