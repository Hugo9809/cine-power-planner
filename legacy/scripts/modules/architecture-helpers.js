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
    var primary = scope || LOCAL_SCOPE;
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
  function tryRequireArchitecture(scope) {
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
    var targetScope = scope || LOCAL_SCOPE;
    if (targetScope && _typeof(targetScope.cineModuleArchitecture) === 'object') {
      return targetScope.cineModuleArchitecture;
    }
    return null;
  }
  var ARCHITECTURE = tryRequireArchitecture(LOCAL_SCOPE);
  var ARCHITECTURE_CORE = resolveArchitectureCore(LOCAL_SCOPE);
  var CORE_INSTANCE = ARCHITECTURE_CORE && typeof ARCHITECTURE_CORE.createCore === 'function' ? ARCHITECTURE_CORE.createCore({
    primaryScope: LOCAL_SCOPE,
    pendingQueueKey: DEFAULT_PENDING_QUEUE_KEY
  }) : null;
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
  function detectWithArchitecture() {
    if (CORE_INSTANCE && typeof CORE_INSTANCE.detectGlobalScope === 'function') {
      try {
        var detected = CORE_INSTANCE.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
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
  var detectGlobalScope = ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function' ? function detectWithPreferred() {
    try {
      var detected = ARCHITECTURE.detectGlobalScope();
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return detectWithArchitecture();
  } : detectWithArchitecture;
  var PRIMARY_SCOPE = detectGlobalScope();
  function collectWithArchitecture(primary) {
    var target = primary || PRIMARY_SCOPE;
    if (CORE_INSTANCE && typeof CORE_INSTANCE.collectCandidateScopes === 'function') {
      try {
        var collected = CORE_INSTANCE.collectCandidateScopes(target);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        var _collected = ARCHITECTURE.collectCandidateScopes(target);
        if (Array.isArray(_collected) && _collected.length > 0) {
          return _collected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(target);
  }
  var collectCandidateScopes = function collect(primary) {
    var target = primary || PRIMARY_SCOPE;
    var collected = collectWithArchitecture(target);
    if (Array.isArray(collected) && collected.length > 0) {
      return collected;
    }
    return fallbackCollectCandidateScopes(target);
  };
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
  function tryRequireWithArchitecture(modulePath) {
    if (CORE_INSTANCE && typeof CORE_INSTANCE.tryRequire === 'function') {
      try {
        var result = CORE_INSTANCE.tryRequire(modulePath);
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
      } catch (error) {
        void error;
      }
    }
    return fallbackTryRequire(modulePath);
  }
  function resolveImmutability(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (CORE_INSTANCE && typeof CORE_INSTANCE.resolveImmutability === 'function') {
      try {
        var resolved = CORE_INSTANCE.resolveImmutability(targetScope);
        if (resolved && _typeof(resolved) === 'object') {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        var required = ARCHITECTURE.tryRequire('./immutability.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var direct = tryRequireWithArchitecture('./immutability.js');
    if (direct && _typeof(direct) === 'object') {
      return direct;
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
  function defineHiddenProperty(target, name, value) {
    if (CORE_INSTANCE && typeof CORE_INSTANCE.defineHiddenProperty === 'function') {
      try {
        if (CORE_INSTANCE.defineHiddenProperty(target, name, value)) {
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
      } catch (error) {
        void error;
      }
    }
    return fallbackDefineHiddenProperty(target, name, value);
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
    if (defineHiddenProperty(scope, queueKey, [])) {
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }
    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
    } catch (error) {
      void error;
      return null;
    }
    return Array.isArray(queue) ? queue : null;
  }
  function ensureQueue(scope, queueKey) {
    var key = typeof queueKey === 'string' && queueKey ? queueKey : DEFAULT_PENDING_QUEUE_KEY;
    var targetScope = scope || PRIMARY_SCOPE;
    if (CORE_INSTANCE && typeof CORE_INSTANCE.ensureQueue === 'function') {
      try {
        var resolved = CORE_INSTANCE.ensureQueue(targetScope, key);
        if (Array.isArray(resolved)) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function') {
      try {
        var _resolved = ARCHITECTURE.ensureQueue(targetScope, key);
        if (Array.isArray(_resolved)) {
          return _resolved;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackEnsureQueue(targetScope, key);
  }
  function createFallbackImmutability() {
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
  var FALLBACK_IMMUTABILITY = createFallbackImmutability();
  var activeImmutability = resolveImmutability(PRIMARY_SCOPE) || FALLBACK_IMMUTABILITY;
  function getImmutability() {
    if (activeImmutability !== FALLBACK_IMMUTABILITY) {
      return activeImmutability;
    }
    var resolved = resolveImmutability(PRIMARY_SCOPE);
    if (resolved && resolved !== activeImmutability) {
      activeImmutability = resolved;
    }
    return activeImmutability;
  }
  function freezeDeep(value) {
    if (CORE_INSTANCE && typeof CORE_INSTANCE.freezeDeep === 'function') {
      try {
        return CORE_INSTANCE.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }
    var provider = getImmutability();
    try {
      return provider.freezeDeep(value);
    } catch (error) {
      void error;
    }
    return FALLBACK_IMMUTABILITY.freezeDeep(value);
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
  function safeWarn(message, detail) {
    if (CORE_INSTANCE && typeof CORE_INSTANCE.safeWarn === 'function') {
      try {
        CORE_INSTANCE.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function') {
      try {
        ARCHITECTURE.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }
    fallbackSafeWarn(message, detail);
  }
  function resolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = tryRequireWithArchitecture('./registry.js');
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
  function queueModuleRegistration(scope, name, api, options) {
    var targetScope = scope || PRIMARY_SCOPE;
    var queue = ensureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY);
    if (!queue) {
      return false;
    }
    var payload = freezeDeep({
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
  var helpers = freezeDeep({
    architecture: ARCHITECTURE,
    architectureCore: ARCHITECTURE_CORE,
    detectGlobalScope: detectGlobalScope,
    getPrimaryScope: function getPrimaryScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: tryRequireWithArchitecture,
    defineHiddenProperty: defineHiddenProperty,
    ensureQueue: ensureQueue,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    resolveModuleRegistry: resolveModuleRegistry,
    queueModuleRegistration: queueModuleRegistration,
    pendingQueueKey: DEFAULT_PENDING_QUEUE_KEY,
    fallbackDetectGlobalScope: fallbackDetectGlobalScope
  });
  var registry = resolveModuleRegistry(PRIMARY_SCOPE);
  var registrationOptions = {
    category: 'infrastructure',
    description: 'Shared architecture helpers for scope detection, registry resolution and queue management.',
    replace: true,
    connections: ['cineModuleArchitectureKernel', 'cineModuleArchitectureCore']
  };
  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineModuleArchitectureHelpers', helpers, registrationOptions);
    } catch (error) {
      safeWarn('cineModuleArchitectureHelpers: immediate registry registration failed.', error);
      queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureHelpers', helpers, registrationOptions);
    }
  } else {
    queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureHelpers', helpers, registrationOptions);
  }
  if (PRIMARY_SCOPE && _typeof(PRIMARY_SCOPE) === 'object' && !PRIMARY_SCOPE.cineModuleArchitectureHelpers) {
    defineHiddenProperty(PRIMARY_SCOPE, 'cineModuleArchitectureHelpers', helpers);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = helpers;
  }
})();