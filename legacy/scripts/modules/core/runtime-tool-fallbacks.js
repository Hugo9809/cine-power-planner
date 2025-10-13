function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isValidScope(scope) {
    return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
  }
  function detectScope(primary) {
    if (isValidScope(primary)) {
      return primary;
    }
    if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && isValidScope(window)) {
      return window;
    }
    if (typeof self !== 'undefined' && isValidScope(self)) {
      return self;
    }
    if (typeof global !== 'undefined' && isValidScope(global)) {
      return global;
    }
    return null;
  }
  function ensureGlobalValue(name, fallbackValue, primary) {
    var provider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
      return fallbackValue;
    };
    if (typeof name !== 'string' || !name) {
      try {
        return provider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }
    var scope = detectScope(primary);
    if (!isValidScope(scope)) {
      return provider();
    }
    var existing;
    try {
      existing = scope[name];
    } catch (readError) {
      existing = undefined;
      void readError;
    }
    if (typeof existing !== 'undefined') {
      return existing;
    }
    var value = provider();
    try {
      scope[name] = value;
      return scope[name];
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } catch (defineError) {
      void defineError;
    }
    try {
      return scope[name];
    } catch (finalReadError) {
      void finalReadError;
    }
    return value;
  }
  function jsonDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
    return value;
  }
  function resolveStructuredClone(primary) {
    if (typeof structuredClone === 'function') {
      return structuredClone;
    }
    var scope = detectScope(primary);
    if (scope && typeof scope.structuredClone === 'function') {
      try {
        return scope.structuredClone.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (typeof require === 'function') {
      try {
        var nodeUtil = require('node:util');
        if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
          return nodeUtil.structuredClone.bind(nodeUtil);
        }
      } catch (nodeUtilError) {
        void nodeUtilError;
      }
      try {
        var legacyUtil = require('util');
        if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
          return legacyUtil.structuredClone.bind(legacyUtil);
        }
      } catch (legacyUtilError) {
        void legacyUtilError;
      }
    }
    return null;
  }
  function createResilientDeepClone(primary) {
    var structuredCloneImpl = resolveStructuredClone(primary);
    if (!structuredCloneImpl) {
      return jsonDeepClone;
    }
    return function resilientDeepClone(value) {
      if (value === null || _typeof(value) !== 'object') {
        return value;
      }
      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }
      return jsonDeepClone(value);
    };
  }
  function ensureDeepClone(primary) {
    var scope = detectScope(primary);
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }
    var clone = createResilientDeepClone(scope);
    if (isValidScope(scope)) {
      try {
        Object.defineProperty(scope, '__cineDeepClone', {
          configurable: true,
          writable: true,
          value: clone
        });
      } catch (defineError) {
        void defineError;
        try {
          scope.__cineDeepClone = clone;
        } catch (assignError) {
          void assignError;
        }
      }
    }
    return clone;
  }
  function createRuntimeToolFallbacks(primary) {
    var resolvedScope = detectScope(primary);
    function getCoreGlobalObject() {
      return detectScope(resolvedScope);
    }
    function ensureCoreGlobalValue(name, fallbackValue) {
      return ensureGlobalValue(name, fallbackValue, resolvedScope);
    }
    function resolveStructuredCloneForScope(scope) {
      return resolveStructuredClone(scope || resolvedScope);
    }
    function createResilientDeepCloneForScope(scope) {
      return createResilientDeepClone(scope || resolvedScope);
    }
    function ensureDeepCloneForScope(scope) {
      return ensureDeepClone(scope || resolvedScope);
    }
    return {
      getCoreGlobalObject: getCoreGlobalObject,
      ensureCoreGlobalValue: ensureCoreGlobalValue,
      jsonDeepClone: jsonDeepClone,
      resolveStructuredClone: resolveStructuredCloneForScope,
      createResilientDeepClone: createResilientDeepCloneForScope,
      ensureDeepClone: ensureDeepCloneForScope
    };
  }
  var namespace = {
    detectScope: detectScope,
    ensureGlobalValue: ensureGlobalValue,
    jsonDeepClone: jsonDeepClone,
    resolveStructuredClone: resolveStructuredClone,
    createResilientDeepClone: createResilientDeepClone,
    ensureDeepClone: ensureDeepClone,
    createRuntimeToolFallbacks: createRuntimeToolFallbacks
  };
  var globalScope = detectScope();
  var targetName = 'cineCoreRuntimeToolFallbacks';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();