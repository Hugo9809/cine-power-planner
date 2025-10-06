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
  function fallbackCollectCandidateScopes(primary) {
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
  function fallbackFreezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = [];
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
    }
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
      }
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      fallbackFreezeDeep(descriptor.value, seen);
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
  function fallbackResolveFromScopes(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : fallbackCollectCandidateScopes(settings.primaryScope);
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
  function fallbackEnsureQueue(scope, queueKey) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var queue = null;
    try {
      queue = scope[queueKey];
    } catch (error) {
      void error;
      queue = null;
    }
    if (Array.isArray(queue)) {
      return queue;
    }
    try {
      Object.defineProperty(scope, queueKey, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: []
      });
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    } catch (defineError) {
      void defineError;
    }
    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
    } catch (assignmentError) {
      void assignmentError;
      return null;
    }
    return Array.isArray(queue) ? queue : null;
  }
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  function resolveArchitecture(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    var required = fallbackTryRequire('./architecture.js');
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
    var required = fallbackTryRequire('./architecture-helpers.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    if (targetScope && _typeof(targetScope.cineModuleArchitectureHelpers) === 'object') {
      return targetScope.cineModuleArchitectureHelpers;
    }
    return null;
  }
  function resolveModuleSystem(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    var required = fallbackTryRequire('./system.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    if (targetScope && _typeof(targetScope.cineModuleSystem) === 'object') {
      return targetScope.cineModuleSystem;
    }
    return null;
  }
  var pendingQueueKey = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.pendingQueueKey === 'string' ? ARCHITECTURE_HELPERS.pendingQueueKey : DEFAULT_PENDING_QUEUE_KEY;
  function updatePendingQueueKey(source) {
    if (!source || _typeof(source) !== 'object' && typeof source !== 'function') {
      return;
    }
    try {
      if (typeof source.getPendingQueueKey === 'function') {
        var provided = source.getPendingQueueKey();
        if (typeof provided === 'string' && provided) {
          pendingQueueKey = provided;
          return;
        }
      }
    } catch (error) {
      void error;
    }
    if (typeof source.PENDING_QUEUE_KEY === 'string' && source.PENDING_QUEUE_KEY) {
      pendingQueueKey = source.PENDING_QUEUE_KEY;
    }
  }
  var ARCHITECTURE_HELPERS = resolveArchitectureHelpers(LOCAL_SCOPE);
  var MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);
  if (MODULE_SYSTEM) {
    updatePendingQueueKey(MODULE_SYSTEM);
  }
  var ARCHITECTURE = (MODULE_SYSTEM && typeof MODULE_SYSTEM.getArchitecture === 'function' ? MODULE_SYSTEM.getArchitecture() : null) || resolveArchitecture(LOCAL_SCOPE);
  function detectWithFallbackChain() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function') {
      try {
        var detected = MODULE_SYSTEM.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
      if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
        try {
          var architectureDetected = ARCHITECTURE.detectGlobalScope();
          if (architectureDetected) {
            return architectureDetected;
          }
        } catch (architectureError) {
          void architectureError;
        }
      }
      return fallbackDetectGlobalScope();
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
      try {
        var _detected = ARCHITECTURE.detectGlobalScope();
        if (_detected) {
          return _detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }
  var detectGlobalScope = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.detectGlobalScope === 'function' ? function detectWithHelpers() {
    try {
      var detected = ARCHITECTURE_HELPERS.detectGlobalScope();
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return detectWithFallbackChain();
  } : detectWithFallbackChain;
  var PRIMARY_SCOPE = detectGlobalScope();
  function collectWithFallbackChain(primary) {
    var target = primary || PRIMARY_SCOPE;
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function') {
      try {
        var scopes = MODULE_SYSTEM.collectCandidateScopes(target);
        if (Array.isArray(scopes) && scopes.length > 0) {
          return scopes;
        }
      } catch (error) {
        void error;
      }
      if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
        try {
          var architectureScopes = ARCHITECTURE.collectCandidateScopes(target);
          if (Array.isArray(architectureScopes) && architectureScopes.length > 0) {
            return architectureScopes;
          }
        } catch (architectureError) {
          void architectureError;
        }
      }
      return fallbackCollectCandidateScopes(target);
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        var _architectureScopes = ARCHITECTURE.collectCandidateScopes(target);
        if (Array.isArray(_architectureScopes) && _architectureScopes.length > 0) {
          return _architectureScopes;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(target);
  }
  var _collectCandidateScopes = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.collectCandidateScopes === 'function' ? function collectWithHelpers(primary) {
    var target = primary || PRIMARY_SCOPE;
    try {
      var scopes = ARCHITECTURE_HELPERS.collectCandidateScopes(target);
      if (Array.isArray(scopes) && scopes.length > 0) {
        return scopes;
      }
    } catch (error) {
      void error;
    }
    return collectWithFallbackChain(target);
  } : collectWithFallbackChain;
  function tryRequireWithFallback(modulePath) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      try {
        var result = MODULE_SYSTEM.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        var _result = ARCHITECTURE.tryRequire(modulePath);
        if (typeof _result !== 'undefined') {
          return _result;
        }
      } catch (architectureError) {
        void architectureError;
      }
    }
    return fallbackTryRequire(modulePath);
  }
  var _tryRequire = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.tryRequire === 'function' ? function tryRequireWithHelpers(modulePath) {
    var result = ARCHITECTURE_HELPERS.tryRequire(modulePath);
    return typeof result === 'undefined' ? tryRequireWithFallback(modulePath) : result;
  } : tryRequireWithFallback;
  function defineHiddenPropertyWithFallback(target, name, value) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.defineHiddenProperty === 'function') {
      try {
        if (MODULE_SYSTEM.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function') {
      try {
        if (ARCHITECTURE.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (architectureError) {
        void architectureError;
      }
    }
    return fallbackDefineHiddenProperty(target, name, value);
  }
  var _defineHiddenProperty = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.defineHiddenProperty === 'function' ? function defineWithHelpers(target, name, value) {
    try {
      if (ARCHITECTURE_HELPERS.defineHiddenProperty(target, name, value)) {
        return true;
      }
    } catch (error) {
      void error;
    }
    return defineHiddenPropertyWithFallback(target, name, value);
  } : defineHiddenPropertyWithFallback;
  function freezeDeepWithFallback(value) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.freezeDeep === 'function') {
      try {
        return MODULE_SYSTEM.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function') {
      try {
        return ARCHITECTURE.freezeDeep(value);
      } catch (architectureError) {
        void architectureError;
      }
    }
    return fallbackFreezeDeep(value);
  }
  var _freezeDeep = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.freezeDeep === 'function' ? function freezeWithHelpers(value) {
    try {
      return ARCHITECTURE_HELPERS.freezeDeep(value);
    } catch (error) {
      void error;
    }
    return freezeDeepWithFallback(value);
  } : freezeDeepWithFallback;
  function safeWarnWithFallback(message, detail) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.safeWarn === 'function') {
      try {
        MODULE_SYSTEM.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function') {
      try {
        ARCHITECTURE.safeWarn(message, detail);
        return;
      } catch (architectureError) {
        void architectureError;
      }
    }
    fallbackSafeWarn(message, detail);
  }
  var _safeWarn = ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.safeWarn === 'function' ? function warnWithHelpers(message, detail) {
    try {
      ARCHITECTURE_HELPERS.safeWarn(message, detail);
      return;
    } catch (error) {
      void error;
    }
    safeWarnWithFallback(message, detail);
  } : safeWarnWithFallback;
  var _resolveFromScopes = MODULE_SYSTEM && typeof MODULE_SYSTEM.resolveFromScopes === 'function' ? function resolveWithSystem(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = _collectCandidateScopes(settings.primaryScope);
    }
    return MODULE_SYSTEM.resolveFromScopes(propertyName, settings);
  } : ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function' ? function resolveWithArchitecture(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = _collectCandidateScopes(settings.primaryScope);
    }
    return ARCHITECTURE.resolveFromScopes(propertyName, settings);
  } : function resolveWithFallback(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = fallbackCollectCandidateScopes(settings.primaryScope);
    }
    return fallbackResolveFromScopes(propertyName, settings);
  };
  function resolveModuleBase(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleBase === 'function') {
      try {
        var baseFromSystem = MODULE_SYSTEM.getModuleBase(targetScope);
        if (baseFromSystem && _typeof(baseFromSystem) === 'object') {
          updatePendingQueueKey(baseFromSystem);
          return baseFromSystem;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Unable to resolve module base through module system.', error);
      }
    }
    var required = _tryRequire('./base.js');
    if (required && _typeof(required) === 'object') {
      updatePendingQueueKey(required);
      return required;
    }
    var resolved = _resolveFromScopes('cineModuleBase', {
      primaryScope: targetScope,
      scopes: _collectCandidateScopes(targetScope)
    });
    if (resolved && _typeof(resolved) === 'object') {
      updatePendingQueueKey(resolved);
      return resolved;
    }
    return null;
  }
  function _ensureQueue(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.ensureQueue === 'function') {
      try {
        var queueFromHelpers = ARCHITECTURE_HELPERS.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queueFromHelpers)) {
          return queueFromHelpers;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Unable to access pending queue via architecture helpers.', error);
      }
    }
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getPendingQueue === 'function') {
      try {
        var queueFromSystem = MODULE_SYSTEM.getPendingQueue(targetScope);
        if (Array.isArray(queueFromSystem)) {
          return queueFromSystem;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Unable to access pending queue via module system.', error);
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function') {
      try {
        var queued = ARCHITECTURE.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queued)) {
          return queued;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Unable to access pending queue via architecture.', error);
      }
    }
    return fallbackEnsureQueue(targetScope, pendingQueueKey);
  }
  function _queueModuleRegistration(name, api, options, scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.queueModuleRegistration === 'function') {
      try {
        if (ARCHITECTURE_HELPERS.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Architecture helpers queueModuleRegistration failed.', error);
      }
    }
    var queue = _ensureQueue(targetScope);
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
  function resolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.resolveModuleRegistry === 'function') {
      try {
        var resolvedByHelpers = ARCHITECTURE_HELPERS.resolveModuleRegistry(targetScope);
        if (resolvedByHelpers && _typeof(resolvedByHelpers) === 'object') {
          return resolvedByHelpers;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Architecture helpers resolveModuleRegistry failed.', error);
      }
    }
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        var registryFromSystem = MODULE_SYSTEM.getModuleRegistry(targetScope);
        if (registryFromSystem && _typeof(registryFromSystem) === 'object') {
          return registryFromSystem;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Unable to resolve module registry via module system.', error);
      }
    }
    var base = resolveModuleBase(targetScope);
    if (base && _typeof(base) === 'object') {
      if (typeof base.getModuleRegistry === 'function') {
        try {
          var provided = base.getModuleRegistry(targetScope);
          if (provided && _typeof(provided) === 'object') {
            return provided;
          }
        } catch (error) {
          _safeWarn('cineModuleContext: Module base getModuleRegistry failed.', error);
        }
      }
      if (typeof base.resolveModuleRegistry === 'function') {
        try {
          var _resolved = base.resolveModuleRegistry(targetScope);
          if (_resolved && _typeof(_resolved) === 'object') {
            return _resolved;
          }
        } catch (error) {
          _safeWarn('cineModuleContext: Module base resolveModuleRegistry failed.', error);
        }
      }
    }
    var required = _tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var resolved = _resolveFromScopes('cineModules', {
      primaryScope: targetScope,
      scopes: _collectCandidateScopes(targetScope)
    });
    return resolved && _typeof(resolved) === 'object' ? resolved : null;
  }
  function registerOrQueue(name, api, options, scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      try {
        if (MODULE_SYSTEM.registerModule(name, api, options || {}, targetScope)) {
          return true;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Module system failed to register module.', error);
      }
    }
    var registry = resolveModuleRegistry(targetScope);
    var base = resolveModuleBase(targetScope);
    if (base && typeof base.registerOrQueueModule === 'function') {
      try {
        var result = base.registerOrQueueModule(name, api, options || {}, function (error) {
          _safeWarn('cineModuleContext: Module base failed to register module.', error);
        }, targetScope, registry);
        if (result) {
          return true;
        }
      } catch (error) {
        _safeWarn('cineModuleContext: Module base threw while registering module.', error);
      }
    }
    if (registry && typeof registry.register === 'function') {
      try {
        registry.register(name, api, options || {});
        return true;
      } catch (error) {
        _safeWarn('cineModuleContext: Registry registration failed.', error);
      }
    }
    return _queueModuleRegistration(name, api, options, targetScope);
  }
  function _exposeGlobal(name, value, scope) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return false;
    }
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.exposeGlobal === 'function') {
      try {
        return MODULE_SYSTEM.exposeGlobal(name, value, targetScope, options || {});
      } catch (error) {
        _safeWarn('cineModuleContext: Module system failed to expose global.', error);
      }
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
    }
    try {
      targetScope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  function createModuleContext() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var targetScope = options.scope || PRIMARY_SCOPE;
    var base = resolveModuleBase(targetScope);
    var registry = resolveModuleRegistry(targetScope);
    var context = {
      getArchitecture: function getArchitecture() {
        return ARCHITECTURE || null;
      },
      getSystem: function getSystem() {
        return MODULE_SYSTEM || null;
      },
      getScope: function getScope() {
        return targetScope;
      },
      detectGlobalScope: function detectGlobalScope(scopeCandidate) {
        var target = scopeCandidate || targetScope;
        try {
          if (MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function') {
            var detected = MODULE_SYSTEM.detectGlobalScope(target);
            if (detected) {
              return detected;
            }
          }
        } catch (error) {
          _safeWarn('cineModuleContext: detectGlobalScope via system failed.', error);
        }
        if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
          try {
            var _detected2 = ARCHITECTURE.detectGlobalScope(target);
            if (_detected2) {
              return _detected2;
            }
          } catch (error) {
            _safeWarn('cineModuleContext: detectGlobalScope via architecture failed.', error);
          }
        }
        return fallbackDetectGlobalScope();
      },
      collectCandidateScopes: function collectCandidateScopes(primary) {
        return _collectCandidateScopes(primary || targetScope);
      },
      tryRequire: function tryRequire(modulePath) {
        return _tryRequire(modulePath);
      },
      resolveFromScopes: function resolveFromScopes(propertyName, settings) {
        var optionsWithScope = _objectSpread({}, settings || {});
        if (!optionsWithScope.primaryScope) {
          optionsWithScope.primaryScope = targetScope;
        }
        if (!optionsWithScope.scopes) {
          optionsWithScope.scopes = _collectCandidateScopes(optionsWithScope.primaryScope);
        }
        return _resolveFromScopes(propertyName, optionsWithScope);
      },
      defineHiddenProperty: function defineHiddenProperty(target, name, value) {
        return _defineHiddenProperty(target, name, value);
      },
      freezeDeep: function freezeDeep(value) {
        return _freezeDeep(value);
      },
      safeWarn: function safeWarn(message, detail) {
        _safeWarn(message, detail);
      },
      ensureQueue: function ensureQueue(scopeCandidate) {
        return _ensureQueue(scopeCandidate || targetScope);
      },
      getModuleBase: function getModuleBase() {
        return base;
      },
      getModuleRegistry: function getModuleRegistry() {
        return registry;
      },
      queueModuleRegistration: function queueModuleRegistration(name, api, moduleOptions, scopeCandidate) {
        return _queueModuleRegistration(name, api, moduleOptions, scopeCandidate || targetScope);
      },
      registerModule: function registerModule(name, api, moduleOptions, scopeCandidate) {
        return registerOrQueue(name, api, moduleOptions, scopeCandidate || targetScope);
      },
      exposeGlobal: function exposeGlobal(name, value, scopeCandidate, exposeOptions) {
        return _exposeGlobal(name, value, scopeCandidate || targetScope, exposeOptions || {});
      }
    };
    return Object.freeze(context);
  }
  var contextApi = _freezeDeep({
    getArchitecture: function getArchitecture() {
      return ARCHITECTURE;
    },
    getModuleSystem: function getModuleSystem() {
      return MODULE_SYSTEM;
    },
    detectGlobalScope: detectGlobalScope,
    collectCandidateScopes: _collectCandidateScopes,
    tryRequire: _tryRequire,
    resolveFromScopes: _resolveFromScopes,
    defineHiddenProperty: _defineHiddenProperty,
    freezeDeep: _freezeDeep,
    safeWarn: _safeWarn,
    ensureQueue: _ensureQueue,
    resolveModuleBase: resolveModuleBase,
    resolveModuleRegistry: resolveModuleRegistry,
    queueModuleRegistration: _queueModuleRegistration,
    registerOrQueue: registerOrQueue,
    exposeGlobal: _exposeGlobal,
    createModuleContext: createModuleContext,
    getPrimaryScope: function getPrimaryScope() {
      return PRIMARY_SCOPE;
    }
  });
  registerOrQueue('cineModuleContext', contextApi, {
    category: 'infrastructure',
    description: 'Shared context helpers that unify architecture, system and registry lookups.',
    freeze: false,
    connections: ['cineModuleBase', 'cineModuleGlobals', 'cineModuleEnvironment', 'cineModuleArchitectureKernel']
  }, PRIMARY_SCOPE);
  _exposeGlobal('cineModuleContext', contextApi, PRIMARY_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = contextApi;
  }
})();