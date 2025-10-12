function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  function collectEnvironmentHelperScopes(primary) {
    var scopes = [];
    function registerScope(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    registerScope(primary);
    if (typeof globalThis !== 'undefined') registerScope(globalThis);
    if (typeof window !== 'undefined') registerScope(window);
    if (typeof self !== 'undefined') registerScope(self);
    if (typeof global !== 'undefined') registerScope(global);
    return scopes;
  }
  var CORE_GLOBAL_SCOPE = detectGlobalScope();
  function resolveEnvironmentHelpers() {
    var helpers = null;
    if (typeof cineRuntimeEnvironmentHelpers !== 'undefined' && cineRuntimeEnvironmentHelpers && (typeof cineRuntimeEnvironmentHelpers === "undefined" ? "undefined" : _typeof(cineRuntimeEnvironmentHelpers)) === 'object') {
      helpers = cineRuntimeEnvironmentHelpers;
    }
    if (!helpers && typeof require === 'function') {
      try {
        var requiredHelpers = require('../runtime-environment-helpers.js');
        if (requiredHelpers && _typeof(requiredHelpers) === 'object') {
          helpers = requiredHelpers;
        }
      } catch (helpersRequireError) {
        void helpersRequireError;
      }
    }
    if (helpers) {
      return helpers;
    }
    var candidateScopes = collectEnvironmentHelperScopes(CORE_GLOBAL_SCOPE);
    for (var index = 0; index < candidateScopes.length; index += 1) {
      var candidate = candidateScopes[index];
      try {
        var candidateHelpers = candidate && candidate.cineRuntimeEnvironmentHelpers;
        if (candidateHelpers && _typeof(candidateHelpers) === 'object') {
          return candidateHelpers;
        }
      } catch (candidateLookupError) {
        void candidateLookupError;
      }
    }
    return null;
  }
  var CORE_ENVIRONMENT_HELPERS = resolveEnvironmentHelpers();
  function detectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }
    var detected = null;
    if (CORE_ENVIRONMENT_HELPERS && typeof CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope === 'function') {
      try {
        detected = CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope();
      } catch (detectScopeError) {
        void detectScopeError;
        detected = null;
      }
    }
    if (detected && (_typeof(detected) === 'object' || typeof detected === 'function')) {
      return detected;
    }
    var fallbackScope = CORE_GLOBAL_SCOPE || detectGlobalScope();
    if (fallbackScope && (_typeof(fallbackScope) === 'object' || typeof fallbackScope === 'function')) {
      return fallbackScope;
    }
    return null;
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
  function ensureGlobalValue(name, fallbackValue, primary) {
    var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
      return fallbackValue;
    };
    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }
    var scope = detectScope(primary);
    if (!scope || _typeof(scope) !== 'object') {
      return fallbackProvider();
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
    var value = fallbackProvider();
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
  function ensureDeepClone(primary) {
    var scope = detectScope(primary);
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }
    var clone = createResilientDeepClone(scope);
    if (scope && _typeof(scope) === 'object') {
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
  var namespace = {
    detectScope: detectScope,
    jsonDeepClone: jsonDeepClone,
    resolveStructuredClone: resolveStructuredClone,
    createResilientDeepClone: createResilientDeepClone,
    ensureGlobalValue: ensureGlobalValue,
    ensureDeepClone: ensureDeepClone
  };
  var globalScope = detectScope();
  var targetName = 'cineCoreRuntimeTools';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
  }
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = target;
  }
})();