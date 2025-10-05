function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  function resolveArchitecture(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./architecture.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleArchitecture) === 'object') {
      return targetScope.cineModuleArchitecture;
    }
    return null;
  }
  var ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);
  var detectGlobalScope = ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function' ? function detectWithArchitecture() {
    try {
      var detected = ARCHITECTURE.detectGlobalScope();
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return fallbackDetectGlobalScope();
  } : fallbackDetectGlobalScope;
  var PRIMARY_SCOPE = detectGlobalScope();
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
  function collectScopes(primary) {
    var targetScope = primary || PRIMARY_SCOPE;
    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        var collected = ARCHITECTURE.collectCandidateScopes(targetScope);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(targetScope);
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
  var baseTryRequire = ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function' ? function tryRequireWithArchitecture(modulePath) {
    var result = ARCHITECTURE.tryRequire(modulePath);
    return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
  } : fallbackTryRequire;
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
  var defineHiddenProperty = ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function' ? ARCHITECTURE.defineHiddenProperty : fallbackDefineHiddenProperty;
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
    if (shouldBypassDeepFreeze(value)) {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      fallbackFreezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  }
  var freezeDeep = ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function' ? ARCHITECTURE.freezeDeep : fallbackFreezeDeep;
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
  var safeWarn = ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function' ? ARCHITECTURE.safeWarn : fallbackSafeWarn;
  function fallbackResolveFromScopes(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : collectScopes(settings.primaryScope || PRIMARY_SCOPE);
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
  var resolveFromScopes = ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function' ? function resolveWithArchitecture(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = collectScopes(settings.primaryScope);
    }
    return ARCHITECTURE.resolveFromScopes(propertyName, settings);
  } : fallbackResolveFromScopes;
  var cachedModuleBase = null;
  var hasResolvedModuleBase = false;
  function updateQueueKeyFromBase(base) {
    if (base && typeof base.PENDING_QUEUE_KEY === 'string' && base.PENDING_QUEUE_KEY) {
      pendingQueueKey = base.PENDING_QUEUE_KEY;
    }
  }
  function loadModuleBase(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = baseTryRequire('./base.js');
    if (required && _typeof(required) === 'object') {
      updateQueueKeyFromBase(required);
      return required;
    }
    var resolved = resolveFromScopes('cineModuleBase', {
      primaryScope: targetScope,
      scopes: collectScopes(targetScope)
    });
    if (resolved && _typeof(resolved) === 'object') {
      updateQueueKeyFromBase(resolved);
      return resolved;
    }
    return null;
  }
  function getModuleBase(scope) {
    if (scope && scope !== PRIMARY_SCOPE) {
      return loadModuleBase(scope);
    }
    if (!hasResolvedModuleBase) {
      cachedModuleBase = loadModuleBase(PRIMARY_SCOPE);
      hasResolvedModuleBase = true;
    }
    return cachedModuleBase;
  }
  function fallbackResolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = baseTryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var resolved = resolveFromScopes('cineModules', {
      primaryScope: targetScope,
      scopes: collectScopes(targetScope)
    });
    if (resolved && _typeof(resolved) === 'object') {
      return resolved;
    }
    return null;
  }
  var cachedModuleRegistry = null;
  var hasResolvedModuleRegistry = false;
  function resolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var base = getModuleBase(targetScope);
    if (base && typeof base.resolveModuleRegistry === 'function') {
      try {
        var resolved = base.resolveModuleRegistry(targetScope);
        if (resolved && _typeof(resolved) === 'object') {
          return resolved;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Unable to resolve module registry through base.', error);
      }
    }
    return fallbackResolveModuleRegistry(targetScope);
  }
  function getModuleRegistry(scope) {
    if (scope && scope !== PRIMARY_SCOPE) {
      return resolveModuleRegistry(scope);
    }
    if (!hasResolvedModuleRegistry) {
      cachedModuleRegistry = resolveModuleRegistry(PRIMARY_SCOPE);
      hasResolvedModuleRegistry = true;
    }
    return cachedModuleRegistry;
  }
  function fallbackExposeGlobal(name, value, scope) {
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
    }
    try {
      targetScope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  function exposeGlobal(name, value, scope, options) {
    var targetScope = scope || PRIMARY_SCOPE;
    var base = getModuleBase(targetScope);
    if (base && typeof base.exposeGlobal === 'function') {
      try {
        return base.exposeGlobal(name, value, targetScope, options || {});
      } catch (error) {
        safeWarn("cineModuleSystem: Failed to expose \"".concat(name, "\" through module base."), error);
      }
    }
    return fallbackExposeGlobal(name, value, targetScope, options || {});
  }
  var DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  var pendingQueueKey = DEFAULT_PENDING_QUEUE_KEY;
  function fallbackEnsureQueue(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return null;
    }
    var queue = targetScope[pendingQueueKey];
    if (Array.isArray(queue)) {
      return queue;
    }
    if (defineHiddenProperty(targetScope, pendingQueueKey, [])) {
      queue = targetScope[pendingQueueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }
    try {
      targetScope[pendingQueueKey] = [];
      queue = targetScope[pendingQueueKey];
    } catch (error) {
      safeWarn('cineModuleSystem: Unable to create pending registration queue.', error);
      return null;
    }
    return Array.isArray(queue) ? queue : null;
  }
  var ensureRegistrationQueue = ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function' ? function ensureWithArchitecture(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var queue = ARCHITECTURE.ensureQueue(targetScope, pendingQueueKey);
    if (Array.isArray(queue)) {
      return queue;
    }
    return fallbackEnsureQueue(targetScope);
  } : fallbackEnsureQueue;
  function normalizeName(name) {
    if (typeof name === 'string' && name.trim()) {
      return name.trim();
    }
    if (typeof name === 'number' && Number.isFinite(name)) {
      return String(name);
    }
    throw new TypeError('cineModuleSystem expected module name to be a non-empty string.');
  }
  function queueModuleRegistration(name, api, options, scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var queue = ensureRegistrationQueue(targetScope);
    if (!queue) {
      safeWarn('cineModuleSystem: Unable to queue module registration.', {
        name: name
      });
      return false;
    }
    var normalizedName = function () {
      try {
        return normalizeName(name);
      } catch (error) {
        safeWarn('cineModuleSystem: Ignoring registration with invalid name.', error);
        return null;
      }
    }();
    if (!normalizedName) {
      return false;
    }
    var payload = Object.freeze({
      name: normalizedName,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
    });
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      try {
        queue[queue.length] = payload;
      } catch (assignmentError) {
        safeWarn('cineModuleSystem: Failed to record pending module registration.', assignmentError);
        return false;
      }
    }
    return true;
  }
  function registerModule(name, api, options, scope, onError) {
    var targetScope = scope || PRIMARY_SCOPE;
    var registry = getModuleRegistry(targetScope);
    if (registry && typeof registry.register === 'function') {
      try {
        registry.register(name, api, options || {});
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (handlerError) {
            safeWarn('cineModuleSystem: Error handler threw while processing registration failure.', handlerError);
          }
        } else {
          safeWarn("cineModuleSystem: Unable to register module \"".concat(name, "\"."), error);
        }
      }
    }
    queueModuleRegistration(name, api, options, targetScope);
    return false;
  }
  function getGlobalScope(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var base = getModuleBase(targetScope);
    if (base && typeof base.getGlobalScope === 'function') {
      try {
        var resolved = base.getGlobalScope();
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Unable to obtain global scope from module base.', error);
      }
    }
    return targetScope;
  }
  function resolveModule(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var normalizedName = normalizeName(name);
    var targetScope = options.scope || PRIMARY_SCOPE;
    var registry = getModuleRegistry(targetScope);
    if (registry && typeof registry.get === 'function') {
      try {
        var registered = registry.get(normalizedName);
        if (registered) {
          return registered;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Registry lookup failed.', error);
      }
    }
    var propertyName = options.propertyName || normalizedName;
    var scopes = Array.isArray(options.scopes) && options.scopes.length > 0 ? options.scopes : collectScopes(targetScope);
    var resolved = resolveFromScopes(propertyName, {
      primaryScope: targetScope,
      scopes: scopes,
      predicate: options.predicate
    });
    if (resolved) {
      return resolved;
    }
    if (typeof options.fallback === 'function') {
      try {
        return options.fallback();
      } catch (error) {
        safeWarn('cineModuleSystem: Fallback resolver threw while resolving module.', error);
      }
    }
    return null;
  }
  function registerAndExpose(name, api, registrationOptions, scope, exposeOptions) {
    var targetScope = scope || PRIMARY_SCOPE;
    var registered = registerModule(name, api, registrationOptions, targetScope);
    if (!registered) {
      return false;
    }
    return exposeGlobal(name, api, targetScope, exposeOptions || {});
  }
  function getPendingQueue(scope) {
    return ensureRegistrationQueue(scope || PRIMARY_SCOPE);
  }
  var systemApi = {
    getArchitecture: function getArchitecture() {
      return ARCHITECTURE;
    },
    detectGlobalScope: detectGlobalScope,
    getGlobalScope: getGlobalScope,
    collectCandidateScopes: collectScopes,
    tryRequire: baseTryRequire,
    resolveFromScopes: resolveFromScopes,
    getModuleBase: getModuleBase,
    getModuleRegistry: getModuleRegistry,
    queueModuleRegistration: queueModuleRegistration,
    registerModule: registerModule,
    registerAndExpose: registerAndExpose,
    resolveModule: resolveModule,
    exposeGlobal: exposeGlobal,
    defineHiddenProperty: defineHiddenProperty,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    getPendingQueue: getPendingQueue,
    getPendingQueueKey: function getPendingQueueKey() {
      return pendingQueueKey;
    }
  };
  Object.defineProperty(systemApi, 'PENDING_QUEUE_KEY', {
    configurable: false,
    enumerable: true,
    get: function get() {
      return pendingQueueKey;
    }
  });
  var frozenApi = Object.freeze(systemApi);
  if (PRIMARY_SCOPE && _typeof(PRIMARY_SCOPE) === 'object' && !PRIMARY_SCOPE.cineModuleSystem) {
    defineHiddenProperty(PRIMARY_SCOPE, 'cineModuleSystem', frozenApi);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = frozenApi;
  }
})();