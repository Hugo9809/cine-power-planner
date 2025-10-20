function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
  var FALLBACK_BASE = {
    freezeDeep: function freezeDeep(value) {
      if (value && (_typeof(value) === 'object' || typeof value === 'function')) {
        try {
          Object.freeze(value);
        } catch (error) {
          void error;
        }
      }
      return value;
    },
    exposeGlobal: function exposeGlobal(name, value, scope) {
      try {
        var target = scope || GLOBAL_SCOPE;
        if (target) {
          target[name] = value;
          return true;
        }
      } catch (error) {
        void error;
      }
      return false;
    },
    getModuleRegistry: function getModuleRegistry() {
      return null;
    },
    registerOrQueueModule: function registerOrQueueModule() {
      return false;
    }
  };
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || FALLBACK_BASE;
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function identity(value) {
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
      return false;
    }
  };
  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function register(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, moduleRegistry);
  } : function noopRegister() {
    return false;
  };
  function sanitizeLogger(candidate) {
    if (!candidate || _typeof(candidate) !== 'object') {
      return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console ? console : null;
    }
    return candidate;
  }
  function sanitizeContext(baseContext) {
    var context = baseContext && _typeof(baseContext) === 'object' ? baseContext : {};
    var windowRef = context.windowRef || context.window || (typeof window !== 'undefined' ? window : null) || (typeof GLOBAL_SCOPE.window !== 'undefined' ? GLOBAL_SCOPE.window : null);
    var documentRef = context.documentRef || context.document || windowRef && windowRef.document || (typeof document !== 'undefined' ? document : null) || GLOBAL_SCOPE && GLOBAL_SCOPE.document || null;
    var openFallbackPrintView = typeof context.openFallbackPrintView === 'function' ? context.openFallbackPrintView : function noopFallback() {
      return false;
    };
    var closeAfterPrint = typeof context.closeAfterPrint === 'function' ? context.closeAfterPrint : function noopClose() {};
    var printDocumentTitle = typeof context.printDocumentTitle === 'string' ? context.printDocumentTitle : '';
    var originalDocumentTitle = typeof context.originalDocumentTitle === 'string' ? context.originalDocumentTitle : documentRef && typeof documentRef.title === 'string' ? documentRef.title : '';
    var logger = sanitizeLogger(context.logger || GLOBAL_SCOPE && GLOBAL_SCOPE.console);
    return {
      windowRef: windowRef,
      documentRef: documentRef,
      openFallbackPrintView: openFallbackPrintView,
      closeAfterPrint: closeAfterPrint,
      printDocumentTitle: printDocumentTitle,
      originalDocumentTitle: originalDocumentTitle,
      logger: logger,
      logPrefix: typeof context.logPrefix === 'string' && context.logPrefix ? context.logPrefix : 'Overview print',
      exportLogPrefix: typeof context.exportLogPrefix === 'string' && context.exportLogPrefix ? context.exportLogPrefix : 'Overview PDF export'
    };
  }
  function log(logger, method, message, error) {
    if (!logger || typeof logger[method] !== 'function') {
      return;
    }
    try {
      if (typeof error !== 'undefined') {
        logger[method](message, error);
      } else {
        logger[method](message);
      }
    } catch (logError) {
      void logError;
    }
  }
  function triggerOverviewPrintWorkflow(context, options) {
    var safeContext = sanitizeContext(context);
    var windowRef = safeContext.windowRef,
      documentRef = safeContext.documentRef,
      openFallbackPrintView = safeContext.openFallbackPrintView,
      closeAfterPrint = safeContext.closeAfterPrint;
    var preferFallback = options && _typeof(options) === 'object' && options.preferFallback === true;
    var reason = options && _typeof(options) === 'object' && typeof options.reason === 'string' ? options.reason : 'print';
    var logPrefix = reason === 'export' ? safeContext.exportLogPrefix : safeContext.logPrefix;
    var logger = safeContext.logger;
    var fallbackAttempts = 0;
    var pendingResult = null;

    function restoreDocumentTitle() {
      if (documentRef && typeof documentRef.title === 'string' && documentRef.title === safeContext.printDocumentTitle) {
        try {
          documentRef.title = safeContext.originalDocumentTitle;
        } catch (restoreError) {
          log(
            logger,
            'warn',
            "".concat(logPrefix, ": unable to restore original document title after failed print."),
            restoreError,
          );
        }
      }
    }
    function attemptFallback(error) {
      fallbackAttempts += 1;
      if (error && error.name !== 'AbortError') {
        log(logger, 'warn', "".concat(logPrefix, ": falling back to print window."), error);
      }
      var opened = false;
      try {
        opened = openFallbackPrintView();
      } catch (fallbackError) {
        log(logger, 'error', "".concat(logPrefix, ": fallback print window failed to open."), fallbackError);
        opened = false;
      }
      if (opened) {
        try {
          closeAfterPrint();
        } catch (closeError) {
          log(logger, 'warn', "".concat(logPrefix, ": unable to run post-print cleanup after fallback window."), closeError);
        }
        restoreDocumentTitle();
        return true;
      }
      if (error && error.name !== 'AbortError') {
        log(logger, 'error', "".concat(logPrefix, ": unable to open fallback print window."), error);
      }
      restoreDocumentTitle();
      return false;
    }
    function attemptNativePrint() {
      if (!windowRef || typeof windowRef.print !== 'function') {
        return false;
      }
      try {
        if (documentRef && safeContext.printDocumentTitle) {
          documentRef.title = safeContext.printDocumentTitle;
        }
        var result = windowRef.print();
        if (result && typeof result.then === 'function') {
          var handledResult = Promise.resolve(result)
            .then(function () {
              restoreDocumentTitle();
              return true;
            })
            .catch(function (error) {
              if (!fallbackAttempts) {
                return attemptFallback(error);
              }
              restoreDocumentTitle();
              return false;
            });
          pendingResult = handledResult;
          return handledResult;
        }
        return true;
      } catch (error) {
        var fallbackResult = attemptFallback(error);
        if (!fallbackResult) {
          restoreDocumentTitle();
        }
        return fallbackResult;
      }
    }
    var success = false;
    if (preferFallback) {
      success = attemptFallback();
      if (!success) {
        var nativeResult = attemptNativePrint();
        if (nativeResult && typeof nativeResult.then === 'function') {
          pendingResult = nativeResult;
        } else {
          success = nativeResult;
        }
      }
    } else {
      var _nativeResult = attemptNativePrint();
      if (_nativeResult && typeof _nativeResult.then === 'function') {
        pendingResult = _nativeResult;
      } else {
        success = _nativeResult;
      }
    }
    if (!pendingResult && !success && fallbackAttempts === 0) {
      success = attemptFallback();
    }
    if (pendingResult) {
      return pendingResult.then(function (result) {
        if (!result) {
          restoreDocumentTitle();
        }
        return result;
      });
    }
    if (!success) {
      restoreDocumentTitle();
    }
    return success;
  }
  function createOverviewPrintWorkflow(context) {
    var safeContext = sanitizeContext(context);
    var workflow = {
      trigger: function trigger(options) {
        return triggerOverviewPrintWorkflow(safeContext, options);
      }
    };
    var frozenWorkflow = freezeDeep(workflow);
    if (frozenWorkflow && typeof Object.isFrozen === 'function' && !Object.isFrozen(frozenWorkflow)) {
      try {
        var propertyNames = Object.getOwnPropertyNames(frozenWorkflow);
        for (var index = 0; index < propertyNames.length; index += 1) {
          var property = propertyNames[index];
          var descriptor = Object.getOwnPropertyDescriptor(frozenWorkflow, property);
          if (!descriptor || typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
            continue;
          }

          Object.defineProperty(frozenWorkflow, property, {
            configurable: false,
            enumerable: descriptor.enumerable === true,
            writable: false,
            value: descriptor.value
          });
        }

        if (typeof Object.preventExtensions === 'function') {
          Object.preventExtensions(frozenWorkflow);
        }
      } catch (freezeError) {
        log(
          safeContext.logger,
          'warn',
          "".concat(safeContext.logPrefix, ": unable to freeze overview print workflow helpers."),
          freezeError,
        );
      }
    }
    return frozenWorkflow;
  }
  var printAPI = freezeDeep({
    createOverviewPrintWorkflow: createOverviewPrintWorkflow,
    triggerOverviewPrintWorkflow: triggerOverviewPrintWorkflow
  });
  try {
    registerOrQueueModule('cineFeaturePrint', printAPI, {
      category: 'feature',
      description: 'Print orchestration for overview exports and PDF generation.',
      freeze: false,
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cineUi']
    }, function (error) {
      log(sanitizeLogger(GLOBAL_SCOPE && GLOBAL_SCOPE.console), 'warn', 'Unable to register cineFeaturePrint module.', error);
    });
  } catch (error) {
    log(sanitizeLogger(GLOBAL_SCOPE && GLOBAL_SCOPE.console), 'warn', 'cineFeaturePrint registration failed.', error);
  }
  var globalExports = [['cineFeaturePrint', printAPI], ['createOverviewPrintWorkflow', createOverviewPrintWorkflow], ['triggerOverviewPrintWorkflow', triggerOverviewPrintWorkflow]];
  globalExports.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      value = _ref2[1];
    exposeGlobal(name, value, {
      configurable: true,
      writable: true
    });
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = printAPI;
  }
})();