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
      if (candidate && _typeof(candidate) === 'object') {
        return candidate;
      }
    }
    return null;
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
  function resolveModuleContext(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    var required = fallbackTryRequire('./context.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    if (targetScope && _typeof(targetScope.cineModuleContext) === 'object') {
      return targetScope.cineModuleContext;
    }
    return null;
  }
  var MODULE_CONTEXT = resolveModuleContext(LOCAL_SCOPE);
  var MODULE_SYSTEM = (MODULE_CONTEXT && typeof MODULE_CONTEXT.getModuleSystem === 'function' ? MODULE_CONTEXT.getModuleSystem() : null) || resolveModuleSystem(LOCAL_SCOPE);
  var ARCHITECTURE = (MODULE_CONTEXT && typeof MODULE_CONTEXT.getArchitecture === 'function' ? MODULE_CONTEXT.getArchitecture() : null) || (MODULE_SYSTEM && typeof MODULE_SYSTEM.getArchitecture === 'function' ? MODULE_SYSTEM.getArchitecture() : null) || resolveArchitecture(LOCAL_SCOPE);
  var CONTEXT_INSTANCE = MODULE_CONTEXT && typeof MODULE_CONTEXT.createModuleContext === 'function' ? MODULE_CONTEXT.createModuleContext({
    scope: LOCAL_SCOPE
  }) : null;
  function detectWithoutContext() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function') {
      try {
        var detected = MODULE_SYSTEM.detectGlobalScope();
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
  var PRIMARY_SCOPE = (CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.getScope === 'function' ? CONTEXT_INSTANCE.getScope() : null) || detectWithoutContext();
  var detectGlobalScope = CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.detectGlobalScope === 'function' ? function detectWithContext(primary) {
    try {
      var detected = CONTEXT_INSTANCE.detectGlobalScope(primary);
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return detectWithoutContext();
  } : function detectWithFallback(primary) {
    void primary;
    return detectWithoutContext();
  };
  function collectWithoutContext(primary) {
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
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        return ARCHITECTURE.collectCandidateScopes(target);
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(target);
  }
  var collectCandidateScopes = CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.collectCandidateScopes === 'function' ? function collectWithContext(primary) {
    try {
      var scopes = CONTEXT_INSTANCE.collectCandidateScopes(primary || PRIMARY_SCOPE);
      if (Array.isArray(scopes) && scopes.length > 0) {
        return scopes;
      }
    } catch (error) {
      void error;
    }
    return collectWithoutContext(primary);
  } : collectWithoutContext;
  function tryRequireWithoutContext(modulePath) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      var result = MODULE_SYSTEM.tryRequire(modulePath);
      if (typeof result !== 'undefined') {
        return result;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      return ARCHITECTURE.tryRequire(modulePath);
    }
    return fallbackTryRequire(modulePath);
  }
  var tryRequire = CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.tryRequire === 'function' ? function tryRequireWithContext(modulePath) {
    var result = CONTEXT_INSTANCE.tryRequire(modulePath);
    return typeof result === 'undefined' ? tryRequireWithoutContext(modulePath) : result;
  } : tryRequireWithoutContext;
  var defineHiddenProperty = CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.defineHiddenProperty === 'function' ? function defineWithContext(target, name, value) {
    return CONTEXT_INSTANCE.defineHiddenProperty(target, name, value);
  } : MODULE_SYSTEM && typeof MODULE_SYSTEM.defineHiddenProperty === 'function' ? MODULE_SYSTEM.defineHiddenProperty : ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function' ? ARCHITECTURE.defineHiddenProperty : fallbackDefineHiddenProperty;
  function resolveFromScopesWithoutContext(propertyName, options) {
    var settings = _objectSpread({}, options || {});
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = collectWithoutContext(settings.primaryScope);
    }
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.resolveFromScopes === 'function') {
      try {
        return MODULE_SYSTEM.resolveFromScopes(propertyName, settings);
      } catch (error) {
        void error;
      }
    }
    if (ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function') {
      try {
        return ARCHITECTURE.resolveFromScopes(propertyName, settings);
      } catch (error) {
        void error;
      }
    }
    return fallbackResolveFromScopes(propertyName, settings);
  }
  var resolveFromScopes = CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.resolveFromScopes === 'function' ? function resolveWithContext(propertyName, options) {
    try {
      return CONTEXT_INSTANCE.resolveFromScopes(propertyName, options);
    } catch (error) {
      void error;
    }
    return resolveFromScopesWithoutContext(propertyName, options);
  } : resolveFromScopesWithoutContext;
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
  function resolveModuleRegistry(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.getModuleRegistry === 'function') {
      try {
        var provided = CONTEXT_INSTANCE.getModuleRegistry();
        if (provided && _typeof(provided) === 'object') {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
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
        var _provided = moduleGlobals.getModuleRegistry(targetScope);
        if (_provided) {
          return _provided;
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
    var define = CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.defineHiddenProperty === 'function' ? CONTEXT_INSTANCE.defineHiddenProperty : defineHiddenProperty;
    define(globalScope, 'cineModuleEnvironmentContext', context);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = context;
  }
})();