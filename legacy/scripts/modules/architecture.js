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
  function freezeDeep(value, seen) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
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
      freezeDeep(descriptor.value, tracker);
    }
    return Object.freeze(value);
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
  var globalScope = detectGlobalScope();
  if (!globalScope.cineModuleArchitecture) {
    defineHiddenProperty(globalScope, 'cineModuleArchitecture', architecture);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architecture;
  }
})();