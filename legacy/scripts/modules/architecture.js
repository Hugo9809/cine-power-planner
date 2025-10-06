function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
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
  function createUniqueList() {
    var items = [];
    return {
      push: function push(candidate) {
        if (items.indexOf(candidate) === -1) {
          items.push(candidate);
        }
      },
      toArray: function toArray() {
        return items.slice();
      }
    };
  }
  function collectCandidateScopes(primary) {
    var list = createUniqueList();
    function push(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      list.push(scope);
    }
    push(primary || detectGlobalScope());
    if (typeof globalThis !== 'undefined') push(globalThis);
    if (typeof window !== 'undefined') push(window);
    if (typeof self !== 'undefined') push(self);
    if (typeof global !== 'undefined') push(global);
    return list.toArray();
  }
  function tryRequire(modulePath) {
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
  function resolveImmutability(scope) {
    var targetScope = scope || detectGlobalScope();
    if (typeof require === 'function') {
      try {
        var required = require('./immutability.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
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
  function resolveFromScopes(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : collectCandidateScopes(settings.primaryScope || detectGlobalScope());
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
  function defineHiddenProperty(target, key, value) {
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
  function ensureQueue(scope, key) {
    if (!scope || _typeof(scope) !== 'object' || typeof key !== 'string' || !key) {
      return null;
    }
    var queue = scope[key];
    if (Array.isArray(queue)) {
      return queue;
    }
    if (defineHiddenProperty(scope, key, [])) {
      queue = scope[key];
      if (Array.isArray(queue)) {
        return queue;
      }
    }
    try {
      scope[key] = [];
      queue = scope[key];
    } catch (error) {
      void error;
      return null;
    }
    return queue;
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
    function freeze(value, seen) {
      if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
        return value;
      }
      if (shouldBypass(value)) {
        return value;
      }
      var tracker = seen || new WeakSet();
      if (tracker.has(value)) {
        return value;
      }
      tracker.add(value);
      var keys = Object.getOwnPropertyNames(value);
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
        var descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
          continue;
        }
        freeze(descriptor.value, tracker);
      }
      return Object.freeze(value);
    }
    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze
    };
  }
  var FALLBACK_IMMUTABILITY = createFallbackImmutability();
  var activeImmutability = resolveImmutability(detectGlobalScope()) || FALLBACK_IMMUTABILITY;
  function getImmutability() {
    if (activeImmutability !== FALLBACK_IMMUTABILITY) {
      return activeImmutability;
    }
    var resolved = resolveImmutability(detectGlobalScope());
    if (resolved && resolved !== activeImmutability) {
      activeImmutability = resolved;
    }
    return activeImmutability;
  }
  function freezeDeep(value, seen) {
    var provider = getImmutability();
    try {
      return provider.freezeDeep(value, seen);
    } catch (error) {
      void error;
    }
    return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
  }
  function safeWarn(message, detail) {
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
  var architecture = Object.freeze({
    detectGlobalScope: detectGlobalScope,
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: tryRequire,
    resolveFromScopes: resolveFromScopes,
    defineHiddenProperty: defineHiddenProperty,
    ensureQueue: ensureQueue,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn
  });
  function createModuleArchitecture(options) {
    var settings = options || {};
    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (_typeof(settings.primaryScope) === 'object' || typeof settings.primaryScope === 'function' ? settings.primaryScope : _typeof(settings.scope) === 'object' || typeof settings.scope === 'function' ? settings.scope : null);
    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : function detectOverride() {
      return customPrimaryScope || detectGlobalScope();
    };
    var additionalScopes = Array.isArray(settings.additionalScopes) ? settings.additionalScopes.filter(function isObjectLike(value) {
      return value && (_typeof(value) === 'object' || typeof value === 'function');
    }) : [];
    var tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : tryRequire;
    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var ensureQueueDefaultKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey ? settings.pendingQueueKey : null;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : freezeDeep;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : safeWarn;
    function collectWithExtras(primary) {
      var targetPrimary = primary || customPrimaryScope || detectOverride();
      var scopes = collectCandidateScopes(targetPrimary);
      for (var index = 0; index < additionalScopes.length; index += 1) {
        var scope = additionalScopes[index];
        if (scopes.indexOf(scope) === -1) {
          scopes.push(scope);
        }
      }
      return scopes;
    }
    function resolveWithExtras(propertyName, resolveOptions) {
      if (resolveOverride) {
        return resolveOverride(propertyName, resolveOptions);
      }
      var optionsToUse = resolveOptions ? _objectSpread({}, resolveOptions) : {};
      if (!optionsToUse.scopes && additionalScopes.length > 0) {
        optionsToUse.scopes = collectWithExtras(optionsToUse.primaryScope);
      }
      return resolveFromScopes(propertyName, optionsToUse);
    }
    function tryRequireWithOverride(modulePath) {
      return tryRequireOverride(modulePath);
    }
    function ensureQueueWithDefault(scope, key) {
      var queueKey = typeof key === 'string' && key ? key : ensureQueueDefaultKey;
      return ensureQueue(scope, queueKey || '__cinePendingModuleRegistrations__');
    }
    return Object.freeze({
      detectGlobalScope: detectOverride,
      collectCandidateScopes: collectWithExtras,
      tryRequire: tryRequireWithOverride,
      resolveFromScopes: resolveWithExtras,
      defineHiddenProperty: defineHiddenProperty,
      ensureQueue: ensureQueueWithDefault,
      freezeDeep: freezeOverride,
      safeWarn: warnOverride
    });
  }
  var globalScope = detectGlobalScope();
  var architectureWithFactory = Object.freeze(_objectSpread(_objectSpread({}, architecture), {}, {
    createModuleArchitecture: createModuleArchitecture
  }));
  if (!globalScope.cineModuleArchitecture) {
    defineHiddenProperty(globalScope, 'cineModuleArchitecture', architectureWithFactory);
  }
  if (!globalScope.cineModuleArchitectureFactory) {
    defineHiddenProperty(globalScope, 'cineModuleArchitectureFactory', Object.freeze({
      createModuleArchitecture: createModuleArchitecture
    }));
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureWithFactory;
  }
})();