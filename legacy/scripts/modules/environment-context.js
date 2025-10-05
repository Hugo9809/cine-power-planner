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
  function resolveModuleSystem(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./system.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleSystem) === 'object') {
      return targetScope.cineModuleSystem;
    }
    return null;
  }
  var MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);
  var ARCHITECTURE = (MODULE_SYSTEM && typeof MODULE_SYSTEM.getArchitecture === 'function' ? MODULE_SYSTEM.getArchitecture() : null) || resolveArchitecture(LOCAL_SCOPE);
  function detectWithArchitecture() {
    if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
      try {
        var detected = ARCHITECTURE.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }
  var detectGlobalScope = MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function' ? function detectWithSystem() {
    try {
      var detected = MODULE_SYSTEM.detectGlobalScope();
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return detectWithArchitecture();
  } : detectWithArchitecture;
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
  function collectWithArchitecture(primary) {
    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        return ARCHITECTURE.collectCandidateScopes(primary || PRIMARY_SCOPE);
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }
  var collectCandidateScopes = MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function' ? function collectWithSystem(primary) {
    var target = primary || PRIMARY_SCOPE;
    try {
      var scopes = MODULE_SYSTEM.collectCandidateScopes(target);
      if (Array.isArray(scopes) && scopes.length > 0) {
        return scopes;
      }
    } catch (error) {
      void error;
    }
    return collectWithArchitecture(target);
  } : collectWithArchitecture;
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
  var tryRequire = MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function' ? function tryRequireWithSystem(modulePath) {
    var result = MODULE_SYSTEM.tryRequire(modulePath);
    return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
  } : ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function' ? function tryRequireWithArchitecture(modulePath) {
    return ARCHITECTURE.tryRequire(modulePath);
  } : fallbackTryRequire;
  function fallbackDefineHiddenProperty(target, name, value) {
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
  var defineHiddenProperty = MODULE_SYSTEM && typeof MODULE_SYSTEM.defineHiddenProperty === 'function' ? MODULE_SYSTEM.defineHiddenProperty : ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function' ? ARCHITECTURE.defineHiddenProperty : fallbackDefineHiddenProperty;
  function fallbackResolveFromScopes(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : fallbackCollectCandidateScopes(settings.primaryScope || PRIMARY_SCOPE);
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
  var resolveFromScopes = MODULE_SYSTEM && typeof MODULE_SYSTEM.resolveFromScopes === 'function' ? function resolveWithSystem(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = collectCandidateScopes(settings.primaryScope);
    }
    return MODULE_SYSTEM.resolveFromScopes(propertyName, settings);
  } : ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function' ? function resolveWithArchitecture(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    return ARCHITECTURE.resolveFromScopes(propertyName, settings);
  } : fallbackResolveFromScopes;
  function resolveModuleEnvironment(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = tryRequire('./environment.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var resolved = resolveFromScopes('cineModuleEnvironment', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope)
    });
    return resolved && _typeof(resolved) === 'object' ? resolved : null;
  }
  function resolveEnvironmentBridge(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = tryRequire('./environment-bridge.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var resolved = resolveFromScopes('cineEnvironmentBridge', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope)
    });
    return resolved && _typeof(resolved) === 'object' ? resolved : null;
  }
  function resolveModuleGlobals(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var required = tryRequire('./globals.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var resolved = resolveFromScopes('cineModuleGlobals', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope)
    });
    return resolved && _typeof(resolved) === 'object' ? resolved : null;
  }
  function getGlobalScope(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var bridge = resolveEnvironmentBridge(targetScope);
    if (bridge && typeof bridge.getGlobalScope === 'function') {
      try {
        var bridged = bridge.getGlobalScope(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    var environment = resolveModuleEnvironment(targetScope);
    if (environment && typeof environment.getGlobalScope === 'function') {
      try {
        var provided = environment.getGlobalScope(targetScope);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return targetScope || PRIMARY_SCOPE;
  }
  function resolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var moduleGlobals = resolveModuleGlobals(targetScope);
    if (moduleGlobals && typeof moduleGlobals.resolveModuleRegistry === 'function') {
      try {
        var _resolved = moduleGlobals.resolveModuleRegistry(targetScope);
        if (_resolved) {
          return _resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (moduleGlobals && typeof moduleGlobals.getModuleRegistry === 'function') {
      try {
        var provided = moduleGlobals.getModuleRegistry(targetScope);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    var bridge = resolveEnvironmentBridge(targetScope);
    if (bridge && typeof bridge.getModuleRegistry === 'function') {
      try {
        var bridged = bridge.getModuleRegistry(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    var environment = resolveModuleEnvironment(targetScope);
    if (environment && typeof environment.resolveModuleRegistry === 'function') {
      try {
        var _resolved2 = environment.resolveModuleRegistry(targetScope);
        if (_resolved2) {
          return _resolved2;
        }
      } catch (error) {
        void error;
      }
    }
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var resolved = resolveFromScopes('cineModules', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope)
    });
    return resolved && _typeof(resolved) === 'object' ? resolved : null;
  }
  var context = Object.freeze({
    detectGlobalScope: detectGlobalScope,
    collectCandidateScopes: collectCandidateScopes,
    resolveFromScopes: resolveFromScopes,
    tryRequire: tryRequire,
    resolveModuleEnvironment: resolveModuleEnvironment,
    resolveEnvironmentBridge: resolveEnvironmentBridge,
    resolveModuleGlobals: resolveModuleGlobals,
    resolveModuleRegistry: resolveModuleRegistry,
    getGlobalScope: getGlobalScope,
    getPrimaryScope: function getPrimaryScope() {
      return PRIMARY_SCOPE;
    }
  });
  var globalScope = getGlobalScope(PRIMARY_SCOPE) || PRIMARY_SCOPE;
  if (globalScope && !globalScope.cineModuleEnvironmentContext) {
    defineHiddenProperty(globalScope, 'cineModuleEnvironmentContext', context);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = context;
  }
})();