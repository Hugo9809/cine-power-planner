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
  function fallbackCollectCandidateScopes(primary, baseScope) {
    var scopes = [];
    function pushScope(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    pushScope(primary || baseScope);
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
    if (typeof process !== 'undefined' && process && process.release && process.release.name === 'node') {
      return true;
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
    if (shouldBypassDeepFreeze(value)) {
      return value;
    }
    var tracker = fallbackResolveSeenTracker(seen);
    if (tracker.has(value)) {
      return value;
    }
    tracker.add(value);
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
  function fallbackResolveFromScopes(propertyName, options, baseScope) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : fallbackCollectCandidateScopes(settings.primaryScope || baseScope, baseScope);
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
  function fallbackQueueModuleRegistration(scope, name, api, options, baseScope, queueKey) {
    var targetScope = scope || baseScope;
    var queue = fallbackEnsureQueue(targetScope, queueKey || DEFAULT_PENDING_QUEUE_KEY, baseScope);
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
      resolveFromScopes: function resolveFromScopes(propertyName, options) {
        return fallbackResolveFromScopes(propertyName, options, baseScope);
      },
      queueModuleRegistration: function queueModuleRegistration(scope, name, api, options) {
        return fallbackQueueModuleRegistration(scope || baseScope, name, api, options, baseScope, DEFAULT_PENDING_QUEUE_KEY);
      },
      getPendingQueueKey: function getPendingQueueKey() {
        return DEFAULT_PENDING_QUEUE_KEY;
      },
      resolveModuleRegistry: function resolveModuleRegistry(scope) {
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
  var pendingQueueKey = ACTIVE_KERNEL && typeof ACTIVE_KERNEL.getPendingQueueKey === 'function' ? ACTIVE_KERNEL.getPendingQueueKey() : DEFAULT_PENDING_QUEUE_KEY;
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
  function collectScopes(primary) {
    var scopes = collectCandidateScopes(primary || PRIMARY_SCOPE);
    return Array.isArray(scopes) ? scopes : [];
  }
  function tryRequire(modulePath) {
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
  function defineHiddenProperty(target, name, value) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.defineHiddenProperty === 'function') {
      try {
        if (ACTIVE_KERNEL.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDefineHiddenProperty(target, name, value);
  }
  function freezeDeep(value) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.freezeDeep === 'function') {
      try {
        return ACTIVE_KERNEL.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }
    return fallbackFreezeDeep(value);
  }
  function safeWarn(message, detail) {
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
  function resolveFromScopes(propertyName, options) {
    var settings = options ? _objectSpread({}, options) : {};
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = collectScopes(settings.primaryScope);
    }
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.resolveFromScopes === 'function') {
      try {
        var resolved = ACTIVE_KERNEL.resolveFromScopes(propertyName, settings);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        safeWarn("cineModuleSystem: resolveFromScopes failed for \"".concat(propertyName, "\"."), error);
      }
    }
    return fallbackResolveFromScopes(propertyName, settings, PRIMARY_SCOPE);
  }
  var cachedModuleBase = null;
  var hasResolvedModuleBase = false;
  function updateQueueKeyFromBase(base) {
    if (base && typeof base.PENDING_QUEUE_KEY === 'string' && base.PENDING_QUEUE_KEY) {
      pendingQueueKey = base.PENDING_QUEUE_KEY;
    }
  }
  function loadModuleBase(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = tryRequire('./base.js');
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
    var required = tryRequire('./registry.js');
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
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.resolveModuleRegistry === 'function') {
      try {
        var resolvedByKernel = ACTIVE_KERNEL.resolveModuleRegistry(targetScope);
        if (resolvedByKernel && _typeof(resolvedByKernel) === 'object') {
          return resolvedByKernel;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Kernel resolveModuleRegistry failed.', error);
      }
    }
    var base = getModuleBase(targetScope);
    if (base && typeof base.resolveModuleRegistry === 'function') {
      try {
        var resolved = base.resolveModuleRegistry(targetScope);
        if (resolved && _typeof(resolved) === 'object') {
          return resolved;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Base resolveModuleRegistry failed.', error);
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
  function ensureRegistrationQueue(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.ensureQueue === 'function') {
      try {
        var queue = ACTIVE_KERNEL.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queue)) {
          return queue;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: ensureQueue failed via kernel.', error);
      }
    }
    return fallbackEnsureQueue(targetScope, pendingQueueKey, PRIMARY_SCOPE);
  }
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
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.queueModuleRegistration === 'function') {
      try {
        if (ACTIVE_KERNEL.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: queueModuleRegistration failed via kernel.', error);
      }
    }
    var queue = ensureRegistrationQueue(targetScope);
    if (!queue) {
      safeWarn('cineModuleSystem: Unable to queue module registration.', {
        name: name
      });
      return false;
    }
    var normalizedName;
    try {
      normalizedName = normalizeName(name);
    } catch (error) {
      safeWarn('cineModuleSystem: Ignoring registration with invalid name.', error);
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
      return ACTIVE_KERNEL && ACTIVE_KERNEL.architecture || null;
    },
    detectGlobalScope: detectGlobalScope,
    getGlobalScope: getGlobalScope,
    collectCandidateScopes: collectScopes,
    tryRequire: tryRequire,
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