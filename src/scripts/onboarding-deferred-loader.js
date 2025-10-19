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

  const GLOBAL_SCOPE = detectGlobalScope();
  if (!GLOBAL_SCOPE) {
    return;
  }

  const ONBOARDING_STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  const ONBOARDING_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  let onboardingFirstRunEvaluated = false;
  let onboardingTriggerListenerAttached = false;

  function ensureDeferredScriptsLoaded(reason) {
    let result = null;

    try {
      if (typeof GLOBAL_SCOPE.cineEnsureDeferredScriptsLoaded === 'function') {
        result = GLOBAL_SCOPE.cineEnsureDeferredScriptsLoaded({ reason });
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
    const PromiseCtor = GLOBAL_SCOPE && GLOBAL_SCOPE.Promise ? GLOBAL_SCOPE.Promise : null;
    if (PromiseCtor && typeof PromiseCtor.resolve === 'function') {
      return PromiseCtor.resolve(value);
    }
    if (typeof Promise !== 'undefined' && Promise && typeof Promise.resolve === 'function') {
      return Promise.resolve(value);
    }
    return value;
  }

  function requestDeferredLoad(reason) {
    const result = ensureDeferredScriptsLoaded(reason);
    if (result && typeof result.then === 'function') {
      return result;
    }
    return resolvePromise(result);
  }

  function readOnboardingSnapshot(storage) {
    if (!storage || typeof storage.getItem !== 'function') {
      return null;
    }

    let raw = null;
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
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (parseError) {
      void parseError;
    }

    return null;
  }

  function shouldPreloadOnboardingBundle() {
    const storages = [];

    if (typeof GLOBAL_SCOPE.getSafeLocalStorage === 'function') {
      try {
        const safeStorage = GLOBAL_SCOPE.getSafeLocalStorage();
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

    for (let index = 0; index < storages.length; index += 1) {
      const snapshot = readOnboardingSnapshot(storages[index]);
      if (!snapshot) {
        return true;
      }
      if (snapshot.skipped === true) {
        return false;
      }
      if (snapshot.completed === true) {
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

    let shouldPreload = false;
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

    let dispatched = false;

    try {
      if (typeof GLOBAL_SCOPE.MouseEvent === 'function') {
        const clickEvent = new GLOBAL_SCOPE.MouseEvent('click', {
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
        const doc = GLOBAL_SCOPE.document;
        if (doc && typeof doc.createEvent === 'function') {
          const legacyEvent = doc.createEvent('MouseEvents');
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

    const doc = GLOBAL_SCOPE.document;
    if (!doc || typeof doc.addEventListener !== 'function') {
      return;
    }

    const handler = event => {
      if (!event || !event.target || typeof event.target.closest !== 'function') {
        return;
      }

      const target = event.target.closest(ONBOARDING_TRIGGER_SELECTOR);
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

      const ready = requestDeferredLoad('onboarding-trigger');
      const readyPromise = ready && typeof ready.then === 'function' ? ready : null;

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

      const releasePending = () => {
        target.__cineOnboardingDeferredPending = false;
      };

      const scheduleRetry = () => {
        const attempts = typeof target.__cineOnboardingDeferredRetries === 'number'
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
          target.__cineOnboardingDeferredTimer = GLOBAL_SCOPE.setTimeout(() => {
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

      readyPromise.then(() => {
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
      }).catch(() => {
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

  const loaderApi = {
    ensure(reason) {
      return requestDeferredLoad(reason);
    },
    preload() {
      onboardingFirstRunEvaluated = false;
      preloadOnboardingTourIfNeeded();
    },
    attach() {
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
