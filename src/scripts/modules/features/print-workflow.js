/* global cineModuleBase */

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

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const FALLBACK_BASE = {
    freezeDeep(value) {
      if (value && (typeof value === 'object' || typeof value === 'function')) {
        try {
          Object.freeze(value);
        } catch (error) {
          void error;
        }
      }
      return value;
    },
    exposeGlobal(name, value, scope) {
      try {
        const target = scope || GLOBAL_SCOPE;
        if (target) {
          target[name] = value;
          return true;
        }
      } catch (error) {
        void error;
      }
      return false;
    },
    getModuleRegistry() {
      return null;
    },
    registerOrQueueModule() {
      return false;
    },
  };

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || FALLBACK_BASE;

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function identity(value) {
        return value;
      };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
      }
    : function fallbackExpose(name, value) {
        try {
          GLOBAL_SCOPE[name] = value;
          return true;
        } catch (error) {
          void error;
          return false;
        }
      };

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry,
        );
      }
    : function noopRegister() {
        return false;
      };

  function sanitizeLogger(candidate) {
    if (!candidate || typeof candidate !== 'object') {
      return typeof console === 'object' && console ? console : null;
    }
    return candidate;
  }

  function sanitizeContext(baseContext) {
    const context = baseContext && typeof baseContext === 'object' ? baseContext : {};

    const windowRef =
      context.windowRef
      || context.window
      || (typeof window !== 'undefined' ? window : null)
      || (typeof GLOBAL_SCOPE.window !== 'undefined' ? GLOBAL_SCOPE.window : null);

    const documentRef =
      context.documentRef
      || context.document
      || (windowRef && windowRef.document)
      || (typeof document !== 'undefined' ? document : null)
      || (GLOBAL_SCOPE && GLOBAL_SCOPE.document) || null;

    const openFallbackPrintView =
      typeof context.openFallbackPrintView === 'function'
        ? context.openFallbackPrintView
        : function noopFallback() {
            return false;
          };

    const closeAfterPrint =
      typeof context.closeAfterPrint === 'function'
        ? context.closeAfterPrint
        : function noopClose() {};

    const printDocumentTitle = typeof context.printDocumentTitle === 'string'
      ? context.printDocumentTitle
      : '';

    const originalDocumentTitle = typeof context.originalDocumentTitle === 'string'
      ? context.originalDocumentTitle
      : (documentRef && typeof documentRef.title === 'string' ? documentRef.title : '');

    const logger = sanitizeLogger(context.logger || (GLOBAL_SCOPE && GLOBAL_SCOPE.console));

    return {
      windowRef,
      documentRef,
      openFallbackPrintView,
      closeAfterPrint,
      printDocumentTitle,
      originalDocumentTitle,
      logger,
      logPrefix: typeof context.logPrefix === 'string' && context.logPrefix
        ? context.logPrefix
        : 'Overview print',
      exportLogPrefix: typeof context.exportLogPrefix === 'string' && context.exportLogPrefix
        ? context.exportLogPrefix
        : 'Overview PDF export',
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
    const safeContext = sanitizeContext(context);
    const { windowRef, documentRef, openFallbackPrintView, closeAfterPrint } = safeContext;
    const preferFallback = options && typeof options === 'object' && options.preferFallback === true;
    const reason = options && typeof options === 'object' && typeof options.reason === 'string'
      ? options.reason
      : 'print';

    const logPrefix = reason === 'export' ? safeContext.exportLogPrefix : safeContext.logPrefix;
    const logger = safeContext.logger;
    let fallbackAttempts = 0;
    let pendingResult = null;

    function restoreDocumentTitle() {
      if (
        documentRef
        && typeof documentRef.title === 'string'
        && documentRef.title === safeContext.printDocumentTitle
      ) {
        try {
          documentRef.title = safeContext.originalDocumentTitle;
        } catch (restoreError) {
          log(
            logger,
            'warn',
            `${logPrefix}: unable to restore original document title after failed print.`,
            restoreError,
          );
        }
      }
    }

    function attemptFallback(error) {
      fallbackAttempts += 1;
      if (error && error.name !== 'AbortError') {
        log(logger, 'warn', `${logPrefix}: falling back to print window.`, error);
      }

      let opened = false;
      try {
        opened = openFallbackPrintView();
      } catch (fallbackError) {
        log(logger, 'error', `${logPrefix}: fallback print window failed to open.`, fallbackError);
        opened = false;
      }

      if (opened) {
        try {
          closeAfterPrint();
        } catch (closeError) {
          log(logger, 'warn', `${logPrefix}: unable to run post-print cleanup after fallback window.`, closeError);
        }
        restoreDocumentTitle();
        return true;
      }

      if (error && error.name !== 'AbortError') {
        log(logger, 'error', `${logPrefix}: unable to open fallback print window.`, error);
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

        const result = windowRef.print();
        if (result && typeof result.then === 'function') {
          const handledResult = Promise
            .resolve(result)
            .then(() => {
              restoreDocumentTitle();
              return true;
            })
            .catch(error => {
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
        const fallbackResult = attemptFallback(error);
        if (!fallbackResult) {
          restoreDocumentTitle();
        }
        return fallbackResult;
      }
    }

    let success = false;

    if (preferFallback) {
      success = attemptFallback();
      if (!success) {
        const nativeResult = attemptNativePrint();
        if (nativeResult && typeof nativeResult.then === 'function') {
          pendingResult = nativeResult;
        } else {
          success = nativeResult;
        }
      }
    } else {
      const nativeResult = attemptNativePrint();
      if (nativeResult && typeof nativeResult.then === 'function') {
        pendingResult = nativeResult;
      } else {
        success = nativeResult;
      }
    }

    if (!pendingResult && !success && fallbackAttempts === 0) {
      success = attemptFallback();
    }

    if (pendingResult) {
      return pendingResult.then(result => {
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
    const safeContext = sanitizeContext(context);

    const workflow = {
      trigger(options) {
        return triggerOverviewPrintWorkflow(safeContext, options);
      },
    };

    const frozenWorkflow = freezeDeep(workflow);
    if (frozenWorkflow && typeof Object.isFrozen === 'function' && !Object.isFrozen(frozenWorkflow)) {
      try {
        const propertyNames = Object.getOwnPropertyNames(frozenWorkflow);
        for (let index = 0; index < propertyNames.length; index += 1) {
          const property = propertyNames[index];
          const descriptor = Object.getOwnPropertyDescriptor(frozenWorkflow, property);
          if (!descriptor || typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
            continue;
          }

          Object.defineProperty(frozenWorkflow, property, {
            configurable: false,
            enumerable: descriptor.enumerable === true,
            writable: false,
            value: descriptor.value,
          });
        }

        if (typeof Object.preventExtensions === 'function') {
          Object.preventExtensions(frozenWorkflow);
        }
      } catch (freezeError) {
        log(
          safeContext.logger,
          'warn',
          `${safeContext.logPrefix}: unable to freeze overview print workflow helpers.`,
          freezeError,
        );
      }
    }

    return frozenWorkflow;
  }

  const printAPI = freezeDeep({
    createOverviewPrintWorkflow,
    triggerOverviewPrintWorkflow,
  });

  try {
    registerOrQueueModule(
      'cineFeaturePrint',
      printAPI,
      {
        category: 'feature',
        description: 'Print orchestration for overview exports and PDF generation.',
        freeze: false,
        replace: true,
        connections: ['cineModuleBase', 'cineModuleContext', 'cineUi'],
      },
      (error) => {
        log(sanitizeLogger(GLOBAL_SCOPE && GLOBAL_SCOPE.console), 'warn', 'Unable to register cineFeaturePrint module.', error);
      },
    );
  } catch (error) {
    log(sanitizeLogger(GLOBAL_SCOPE && GLOBAL_SCOPE.console), 'warn', 'cineFeaturePrint registration failed.', error);
  }

  const globalExports = [
    ['cineFeaturePrint', printAPI],
    ['createOverviewPrintWorkflow', createOverviewPrintWorkflow],
    ['triggerOverviewPrintWorkflow', triggerOverviewPrintWorkflow],
  ];

  globalExports.forEach(([name, value]) => {
    exposeGlobal(name, value, { configurable: true, writable: true });
  });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = printAPI;
  }
})();
