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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  function resolveModuleGlobals(scope) {
    if (scope && _typeof(scope.cineModuleGlobals) === 'object') {
      return scope.cineModuleGlobals;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../globals.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  function fallbackExpose(name, value, scope, options) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object' && typeof targetScope !== 'function') {
      return false;
    }
    var descriptor = {
      configurable: options && options.configurable !== false,
      enumerable: !!(options && options.enumerable),
      value: value,
      writable: !!(options && options.writable)
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
  function fallbackRegister() {
    return false;
  }
  function fallbackWarn(message, detail) {
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
  var FALLBACK_BASE = {
    exposeGlobal: function exposeGlobal(name, value, scope, options) {
      return fallbackExpose(name, value, scope, options || {});
    },
    registerOrQueueModule: fallbackRegister,
    getModuleRegistry: function getModuleRegistry() {
      return null;
    },
    safeWarn: fallbackWarn
  };
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || FALLBACK_BASE;
  var MODULE_GLOBALS = resolveModuleGlobals(GLOBAL_SCOPE);
  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function expose(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
  } : function expose(name, value, options) {
    return fallbackExpose(name, value, GLOBAL_SCOPE, options || {});
  };
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function register(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, moduleRegistry);
  } : fallbackRegister;
  var safeWarn = function resolveSafeWarn() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return function warn(message, detail) {
        try {
          MODULE_GLOBALS.safeWarn(message, detail);
        } catch (error) {
          fallbackWarn(message, error);
        }
      };
    }
    if (MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function') {
      return function warn(message, detail) {
        try {
          MODULE_BASE.safeWarn(message, detail);
        } catch (error) {
          fallbackWarn(message, error);
        }
      };
    }
    return fallbackWarn;
  }();
  function informModuleGlobals(name, api) {
    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }
    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }
  var PROJECT_EXPORTS = ['deriveProjectInfo', 'updateCalculations', 'checkSetupChanged', 'currentProjectInfo', 'setCurrentProjectInfo', 'getCurrentProjectInfo', 'collectProjectFormData', 'populateProjectForm', 'renderFilterDetails', 'collectFilterSelections', 'collectFilterTokens', 'parseFilterTokens', 'applyFilterSelectionsToGearList', 'normalizeSpellingVariants', 'normalizeSearchValue', 'getPowerSelectionSnapshot', 'applyStoredPowerSelection', 'getGearListSelectors', 'applyGearListSelectors'];
  var moduleState = Object.create(null);
  function assignExportValue(name, value) {
    if (typeof value === 'undefined') {
      return;
    }
    moduleState[name] = value;
  }
  function installProjectIntelligence(payload) {
    if (!payload || _typeof(payload) !== 'object') {
      safeWarn('cineCoreProject.install received invalid payload.');
      return false;
    }
    var assigned = false;
    for (var index = 0; index < PROJECT_EXPORTS.length; index += 1) {
      var name = PROJECT_EXPORTS[index];
      if (Object.prototype.hasOwnProperty.call(payload, name)) {
        assignExportValue(name, payload[name]);
        assigned = true;
      }
    }
    if (!assigned) {
      safeWarn('cineCoreProject.install did not receive any recognised exports.');
    }
    return assigned;
  }
  function defineLazyExports(target, exportNames) {
    var propertyMap = {};
    var _loop = function _loop() {
      var name = exportNames[index];
      propertyMap[name] = {
        configurable: false,
        enumerable: true,
        get: function get() {
          return moduleState[name];
        }
      };
    };
    for (var index = 0; index < exportNames.length; index += 1) {
      _loop();
    }
    Object.defineProperties(target, propertyMap);
  }
  var projectAPI = {};
  defineLazyExports(projectAPI, PROJECT_EXPORTS);
  Object.defineProperty(projectAPI, 'install', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: installProjectIntelligence
  });
  var frozenProjectAPI = Object.freeze(projectAPI);
  informModuleGlobals('cineCoreProject', frozenProjectAPI);
  registerOrQueueModule('cineCoreProject', frozenProjectAPI, {
    category: 'domain',
    description: 'Project intelligence helpers for derived metadata, selectors, and calculations.',
    replace: true,
    freeze: false,
    connections: ['cineModuleBase', 'cineModuleGlobals', 'cineCoreShared']
  }, function (error) {
    safeWarn('Unable to register cineCoreProject module.', error);
  });
  var exposed = exposeGlobal('cineCoreProject', frozenProjectAPI, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (!exposed) {
    safeWarn('Unable to expose cineCoreProject globally.');
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = frozenProjectAPI;
  }
})();