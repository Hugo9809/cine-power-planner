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
        var required = require('./base.js');
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
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? function freezeWithBase(value) {
    try {
      return MODULE_BASE.freezeDeep(value);
    } catch (error) {
      void error;
    }
    return value;
  } : function identity(value) {
    return value;
  };
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function expose(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
  } : function fallbackExpose(name, value) {
    try {
      GLOBAL_SCOPE[name] = value;
      return true;
    } catch (error) {
      void error;
    }
    return false;
  };
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function register(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, moduleRegistry);
  } : function fallbackRegister() {
    return false;
  };
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? function warn(message, detail) {
    try {
      MODULE_BASE.safeWarn(message, detail);
    } catch (error) {
      void error;
    }
  } : function fallbackWarn(message, detail) {
    if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
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
  };
  var implementationState = {
    generateGearListHtml: null,
    getCurrentGearListHtml: null,
    getSafeGearListHtmlSections: null,
    splitGearListHtml: null,
    metadata: {
      updatedAt: null,
      source: null
    }
  };
  var legacyFallbacks = {
    generateGearListHtml: typeof GLOBAL_SCOPE.generateGearListHtml === 'function' ? GLOBAL_SCOPE.generateGearListHtml : null,
    getCurrentGearListHtml: typeof GLOBAL_SCOPE.getCurrentGearListHtml === 'function' ? GLOBAL_SCOPE.getCurrentGearListHtml : null,
    getSafeGearListHtmlSections: typeof GLOBAL_SCOPE.getSafeGearListHtmlSections === 'function' ? GLOBAL_SCOPE.getSafeGearListHtmlSections : null,
    splitGearListHtml: typeof GLOBAL_SCOPE.splitGearListHtml === 'function' ? GLOBAL_SCOPE.splitGearListHtml : null
  };
  var IMPLEMENTATION_KEYS = ['generateGearListHtml', 'getCurrentGearListHtml', 'getSafeGearListHtmlSections', 'splitGearListHtml'];
  function normalizeMetadata(options) {
    if (!options || _typeof(options) !== 'object') {
      return {
        source: null
      };
    }
    var source = null;
    if (typeof options.source === 'string' && options.source.trim()) {
      source = options.source.trim();
    }
    return {
      source: source
    };
  }
  function assignImplementation(partial, metadata) {
    if (!partial || _typeof(partial) !== 'object') {
      return false;
    }
    var updated = false;
    for (var index = 0; index < IMPLEMENTATION_KEYS.length; index += 1) {
      var key = IMPLEMENTATION_KEYS[index];
      var fn = partial[key];
      if (typeof fn === 'function') {
        implementationState[key] = fn;
        updated = true;
      }
    }
    if (updated) {
      implementationState.metadata = {
        updatedAt: new Date().toISOString(),
        source: metadata && metadata.source || null
      };
    }
    return updated;
  }
  function callImplementation(key, args, fallbackResult) {
    var fn = implementationState[key];
    if (typeof fn === 'function') {
      try {
        return fn.apply(GLOBAL_SCOPE, args || []);
      } catch (error) {
        safeWarn('cineGearList encountered an error while executing "' + key + '".', error);
      }
    }
    var legacy = legacyFallbacks[key];
    if (typeof legacy === 'function') {
      try {
        return legacy.apply(GLOBAL_SCOPE, args || []);
      } catch (legacyError) {
        safeWarn('cineGearList legacy fallback for "' + key + '" failed.', legacyError);
      }
    }
    return fallbackResult;
  }
  function fallbackSafeSections(html) {
    var normalized = typeof html === 'string' ? html : '';
    return {
      projectHtml: '',
      gearHtml: normalized
    };
  }
  function fallbackCurrentGearList() {
    if (_typeof(GLOBAL_SCOPE) !== 'object' || !GLOBAL_SCOPE) {
      return '';
    }
    if (typeof GLOBAL_SCOPE.__cineLastGearListHtml === 'string') {
      return GLOBAL_SCOPE.__cineLastGearListHtml;
    }
    return '';
  }
  var gearListAPI = {
    setImplementation: function setImplementation(partial, options) {
      var metadata = normalizeMetadata(options);
      var changed = assignImplementation(partial, metadata);
      if (!changed && metadata && metadata.source) {
        safeWarn('cineGearList.setImplementation("' + metadata.source + '") did not update any functions.');
      }
      return gearListAPI;
    },
    clearImplementation: function clearImplementation() {
      for (var index = 0; index < IMPLEMENTATION_KEYS.length; index += 1) {
        var key = IMPLEMENTATION_KEYS[index];
        implementationState[key] = null;
      }
      implementationState.metadata = {
        updatedAt: null,
        source: null
      };
      return gearListAPI;
    },
    hasImplementation: function hasImplementation(key) {
      if (typeof key !== 'string' || !key) {
        return IMPLEMENTATION_KEYS.every(function each(k) {
          return typeof implementationState[k] === 'function';
        });
      }
      return typeof implementationState[key] === 'function';
    },
    getImplementationSnapshot: function getImplementationSnapshot() {
      var snapshot = {};
      for (var index = 0; index < IMPLEMENTATION_KEYS.length; index += 1) {
        var key = IMPLEMENTATION_KEYS[index];
        snapshot[key] = implementationState[key];
      }
      snapshot.metadata = implementationState.metadata;
      return freezeDeep(snapshot);
    },
    generateGearListHtml: function generateGearListHtml(info) {
      var safeInfo = info && _typeof(info) === 'object' ? info : {};
      var result = callImplementation('generateGearListHtml', [safeInfo], '');
      if (typeof result !== 'string') {
        return '';
      }
      return result;
    },
    getCurrentGearListHtml: function getCurrentGearListHtml() {
      var args = Array.prototype.slice.call(arguments);
      var result = callImplementation('getCurrentGearListHtml', args, fallbackCurrentGearList());
      if (typeof result !== 'string') {
        return '';
      }
      return result;
    },
    getSafeGearListHtmlSections: function getSafeGearListHtmlSections(html) {
      var result = callImplementation('getSafeGearListHtmlSections', [html], null);
      if (!result || _typeof(result) !== 'object') {
        return fallbackSafeSections(html);
      }
      var projectHtml = typeof result.projectHtml === 'string' ? result.projectHtml : '';
      var gearHtml = typeof result.gearHtml === 'string' ? result.gearHtml : '';
      if (!gearHtml && !projectHtml && typeof html === 'string') {
        gearHtml = html;
      }
      return {
        projectHtml: projectHtml,
        gearHtml: gearHtml
      };
    },
    splitGearListHtml: function splitGearListHtml(html) {
      var result = callImplementation('splitGearListHtml', [html], null);
      if (!result || _typeof(result) !== 'object') {
        return fallbackSafeSections(html);
      }
      var projectHtml = typeof result.projectHtml === 'string' ? result.projectHtml : '';
      var gearHtml = typeof result.gearHtml === 'string' ? result.gearHtml : '';
      if (!gearHtml && typeof html === 'string' && !projectHtml) {
        gearHtml = html;
      }
      return {
        projectHtml: projectHtml,
        gearHtml: gearHtml
      };
    }
  };
  freezeDeep(gearListAPI);
  registerOrQueueModule('cineGearList', gearListAPI, {
    category: 'gear',
    description: 'Gear list generation, serialization, and DOM extraction helpers.',
    replace: true
  }, function (error) {
    safeWarn('Unable to register cineGearList module.', error);
  });
  exposeGlobal('cineGearList', gearListAPI, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  function exposeLegacy(name, method) {
    exposeGlobal(name, method, {
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  exposeLegacy('generateGearListHtml', function legacyGenerateGearListHtml(info) {
    return gearListAPI.generateGearListHtml(info);
  });
  exposeLegacy('getCurrentGearListHtml', function legacyGetCurrentGearListHtml() {
    return gearListAPI.getCurrentGearListHtml.apply(gearListAPI, arguments);
  });
  exposeLegacy('getSafeGearListHtmlSections', function legacyGetSafeGearListHtmlSections(html) {
    return gearListAPI.getSafeGearListHtmlSections(html);
  });
  exposeLegacy('splitGearListHtml', function legacySplitGearListHtml(html) {
    return gearListAPI.splitGearListHtml(html);
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = gearListAPI;
  }
})();