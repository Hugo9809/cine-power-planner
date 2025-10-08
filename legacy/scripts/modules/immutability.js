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
  function createUniqueScopeList() {
    var scopes = [];
    return {
      push: function push(scope) {
        if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
          return;
        }
        if (scopes.indexOf(scope) === -1) {
          scopes.push(scope);
        }
      },
      toArray: function toArray() {
        return scopes.slice();
      }
    };
  }
  function collectCandidateScopes(primary) {
    var list = createUniqueScopeList();
    list.push(primary);
    if (typeof globalThis !== 'undefined') list.push(globalThis);
    if (typeof window !== 'undefined') list.push(window);
    if (typeof self !== 'undefined') list.push(self);
    if (typeof global !== 'undefined') list.push(global);
    return list.toArray();
  }
  function defineHiddenProperty(target, name, value) {
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
  var BUILTIN_IMMUTABILITY = function resolveBuiltinImmutability() {
    var registryKey = '__cineBuiltinImmutabilityGuards__';
    var scopes = collectCandidateScopes(detectGlobalScope());
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
  function shouldBypassDeepFreeze(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    try {
      if (typeof module !== 'undefined' && module && typeof module.constructor === 'function' && value instanceof module.constructor) {
        return true;
      }
    } catch (moduleCheckError) {
      void moduleCheckError;
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
  function freezeDeep(value) {
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
      if (!child || _typeof(child) !== 'object' && typeof child !== 'function') {
        continue;
      }
      try {
        freezeDeep(child, seen);
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
  function freezeArray(values) {
    var cloned = Array.isArray(values) ? values.slice() : [];
    return freezeDeep(cloned);
  }
  function freezeObject(value) {
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    var clone = _objectSpread({}, value);
    return freezeDeep(clone);
  }
  function ensureQueue(scope, key) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var queueKey = typeof key === 'string' && key ? key : '__cinePendingModuleRegistrations__';
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
    } catch (assignmentError) {
      void assignmentError;
      return null;
    }
    return Array.isArray(queue) ? queue : null;
  }
  function queueModuleRegistration(scope, name, api, options) {
    var targetScope = scope || detectGlobalScope();
    var queue = ensureQueue(targetScope, '__cinePendingModuleRegistrations__');
    if (!queue) {
      return false;
    }
    var payload = freezeDeep({
      name: name,
      api: api,
      options: freezeObject(options || {})
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
    var targetScope = scope || detectGlobalScope();
    var required = tryRequire('./registry.js');
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
  var GLOBAL_SCOPE = detectGlobalScope();
  var API = Object.freeze({
    shouldBypassDeepFreeze: shouldBypassDeepFreeze,
    freezeDeep: freezeDeep,
    freezeArray: freezeArray,
    freezeObject: freezeObject
  });
  var registry = resolveModuleRegistry(GLOBAL_SCOPE);
  var registrationOptions = {
    category: 'infrastructure',
    description: 'Shared immutability helpers that provide consistent deep freezing across modules.',
    replace: true,
    connections: ['cineModuleArchitectureHelpers']
  };
  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineModuleImmutability', API, registrationOptions);
    } catch (error) {
      void error;
      queueModuleRegistration(GLOBAL_SCOPE, 'cineModuleImmutability', API, registrationOptions);
    }
  } else {
    queueModuleRegistration(GLOBAL_SCOPE, 'cineModuleImmutability', API, registrationOptions);
  }
  if (!GLOBAL_SCOPE.cineModuleImmutability) {
    defineHiddenProperty(GLOBAL_SCOPE, 'cineModuleImmutability', API);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = API;
  }
})();