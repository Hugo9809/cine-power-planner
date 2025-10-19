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
    return null;
  }

  var GLOBAL_SCOPE = detectGlobalScope();
  if (!GLOBAL_SCOPE) {
    return;
  }

  var ONBOARDING_STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  var ONBOARDING_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  var onboardingFirstRunEvaluated = false;
  var onboardingTriggerListenerAttached = false;

  function ensureDeferredScriptsLoaded(reason) {
    var result = null;

    try {
      if (typeof GLOBAL_SCOPE.cineEnsureDeferredScriptsLoaded === 'function') {
        result = GLOBAL_SCOPE.cineEnsureDeferredScriptsLoaded({ reason: reason });
      }
    } catch (ensureError) {
      void ensureError;
      result = null;
    }

    if (result) {
      return result;
    }

    try {
      return GLOBAL_SCOPE.cineDeferredScriptsReady;
    } catch (readError) {
      void readError;
    }

    return null;
  }

  function resolvePromise(value) {
    var PromiseCtor = GLOBAL_SCOPE && GLOBAL_SCOPE.Promise ? GLOBAL_SCOPE.Promise : null;
    if (PromiseCtor && typeof PromiseCtor.resolve === 'function') {
      return PromiseCtor.resolve(value);
    }
    if (typeof Promise !== 'undefined' && Promise && typeof Promise.resolve === 'function') {
      return Promise.resolve(value);
    }
    return value;
  }

  function requestDeferredLoad(reason) {
    var result = ensureDeferredScriptsLoaded(reason);
    if (result && typeof result.then === 'function') {
      return result;
    }
    return resolvePromise(result);
  }

  function readOnboardingSnapshot(storage) {
    if (!storage || typeof storage.getItem !== 'function') {
      return null;
    }

    var raw = null;
    try {
      raw = storage.getItem(ONBOARDING_STORAGE_KEY);
    } catch (storageError) {
      void storageError;
      raw = null;
    }

    if (typeof raw !== 'string' || !raw) {
      return null;
    }

    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (parseError) {
      void parseError;
    }

    return null;
  }

  function shouldPreloadOnboardingBundle() {
    var storages = [];

    if (typeof GLOBAL_SCOPE.getSafeLocalStorage === 'function') {
      try {
        var safeStorage = GLOBAL_SCOPE.getSafeLocalStorage();
        if (safeStorage) {
          storages.push(safeStorage);
        }
      } catch (safeStorageError) {
        void safeStorageError;
      }
    }

    if (typeof GLOBAL_SCOPE.SAFE_LOCAL_STORAGE !== 'undefined' && GLOBAL_SCOPE.SAFE_LOCAL_STORAGE) {
      storages.push(GLOBAL_SCOPE.SAFE_LOCAL_STORAGE);
    }

    if (typeof GLOBAL_SCOPE.localStorage !== 'undefined' && GLOBAL_SCOPE.localStorage) {
      storages.push(GLOBAL_SCOPE.localStorage);
    }

    for (var index = 0; index < storages.length; index += 1) {
      var snapshot = readOnboardingSnapshot(storages[index]);
      if (!snapshot) {
        return true;
      }
      if (snapshot && snapshot.skipped === true) {
        return false;
      }
      if (snapshot && snapshot.completed === true) {
        return false;
      }
      return true;
    }

    return true;
  }

  function preloadOnboardingTourIfNeeded() {
    if (onboardingFirstRunEvaluated) {
      return;
    }
    onboardingFirstRunEvaluated = true;

    var shouldPreload = false;
    try {
      shouldPreload = shouldPreloadOnboardingBundle();
    } catch (evaluationError) {
      void evaluationError;
      shouldPreload = false;
    }

    if (shouldPreload) {
      requestDeferredLoad('onboarding-first-run');
    }
  }

  function dispatchOnboardingTriggerClick(target) {
    if (!target || typeof target.dispatchEvent !== 'function') {
      return;
    }

    var dispatched = false;

    try {
      if (typeof GLOBAL_SCOPE.MouseEvent === 'function') {
        var clickEvent = new GLOBAL_SCOPE.MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: GLOBAL_SCOPE,
        });
        dispatched = target.dispatchEvent(clickEvent);
      }
    } catch (reclickError) {
      void reclickError;
    }

    if (!dispatched) {
      try {
        var doc = GLOBAL_SCOPE.document;
        if (doc && typeof doc.createEvent === 'function') {
          var legacyEvent = doc.createEvent('MouseEvents');
          if (legacyEvent && typeof legacyEvent.initEvent === 'function') {
            legacyEvent.initEvent('click', true, true);
            dispatched = target.dispatchEvent(legacyEvent);
          }
        }
      } catch (legacyError) {
        void legacyError;
      }
    }

    if (!dispatched) {
      try {
        target.click();
      } catch (fallbackError) {
        void fallbackError;
      }
    }
  }

  function attachOnboardingTriggerPreloadListener() {
    if (onboardingTriggerListenerAttached) {
      return;
    }

    var doc = GLOBAL_SCOPE.document;
    if (!doc || typeof doc.addEventListener !== 'function') {
      return;
    }

    var handler = function (event) {
      if (!event || !event.target || typeof event.target.closest !== 'function') {
        return;
      }

      var target = event.target.closest(ONBOARDING_TRIGGER_SELECTOR);
      if (!target) {
        return;
      }

      if (GLOBAL_SCOPE.cineFeaturesOnboardingTour) {
        return;
      }

      if (target.__cineOnboardingDeferredPending) {
        return;
      }

      target.__cineOnboardingDeferredPending = true;

      var ready = requestDeferredLoad('onboarding-trigger');
      var readyPromise = ready && typeof ready.then === 'function' ? ready : null;

      if (!readyPromise) {
        target.__cineOnboardingDeferredPending = false;
        return;
      }

      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
      } else if (typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }

      var releasePending = function () {
        target.__cineOnboardingDeferredPending = false;
      };

      var scheduleRetry = function () {
        var attempts = typeof target.__cineOnboardingDeferredRetries === 'number'
          ? target.__cineOnboardingDeferredRetries
          : 0;

        if (attempts >= 4 || typeof GLOBAL_SCOPE.setTimeout !== 'function') {
          releasePending();
          return;
        }

        target.__cineOnboardingDeferredRetries = attempts + 1;

        if (typeof GLOBAL_SCOPE.clearTimeout === 'function' && target.__cineOnboardingDeferredTimer) {
          try {
            GLOBAL_SCOPE.clearTimeout(target.__cineOnboardingDeferredTimer);
          } catch (clearError) {
            void clearError;
          }
        }

        try {
          target.__cineOnboardingDeferredTimer = GLOBAL_SCOPE.setTimeout(function () {
            target.__cineOnboardingDeferredTimer = null;

            if (!target.isConnected) {
              releasePending();
              return;
            }

            if (GLOBAL_SCOPE.cineFeaturesOnboardingTour) {
              target.__cineOnboardingDeferredRetries = 0;
              releasePending();
              dispatchOnboardingTriggerClick(target);
              return;
            }

            scheduleRetry();
          }, Math.min(120, 30 * (attempts + 1)));
        } catch (scheduleError) {
          void scheduleError;
          releasePending();
        }
      };

      readyPromise.then(function () {
        if (!target.isConnected) {
          releasePending();
          return;
        }

        if (!GLOBAL_SCOPE.cineFeaturesOnboardingTour) {
          scheduleRetry();
          return;
        }

        target.__cineOnboardingDeferredRetries = 0;
        releasePending();
        dispatchOnboardingTriggerClick(target);
      }).catch(function () {
        releasePending();
      });
    };

    try {
      doc.addEventListener('click', handler, true);
      onboardingTriggerListenerAttached = true;
    } catch (listenerError) {
      void listenerError;
    }
  }

  preloadOnboardingTourIfNeeded();
  if (GLOBAL_SCOPE.document && GLOBAL_SCOPE.document.readyState === 'loading') {
    GLOBAL_SCOPE.document.addEventListener('DOMContentLoaded', attachOnboardingTriggerPreloadListener, { once: true });
  } else {
    attachOnboardingTriggerPreloadListener();
  }

  var loaderApi = {
    ensure: function (reason) {
      return requestDeferredLoad(reason);
    },
    preload: function () {
      onboardingFirstRunEvaluated = false;
      preloadOnboardingTourIfNeeded();
    },
    attach: function () {
      onboardingTriggerListenerAttached = false;
      attachOnboardingTriggerPreloadListener();
    },
  };

  try {
    Object.defineProperty(GLOBAL_SCOPE, 'cineOnboardingDeferredLoader', {
      configurable: true,
      enumerable: false,
      writable: false,
      value: loaderApi,
    });
  } catch (assignError) {
    GLOBAL_SCOPE.cineOnboardingDeferredLoader = loaderApi;
  }
})();
