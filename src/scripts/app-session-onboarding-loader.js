(function () {
  const ONBOARDING_MODULE_NAME = 'cine.features.onboardingTour';
  const ONBOARDING_STORAGE_KEYS = [
    'cameraPowerPlanner_onboardingTutorial',
    'cinePowerPlanner_onboardingTutorial',
  ];
  const ONBOARDING_DEFERRED_FLAG = '__cineOnboardingDeferredHandled__';

  function createThenable(executor) {
    if (typeof Promise === 'function') {
      return new Promise(executor);
    }

    let settled = false;
    let fulfilled = false;
    let storedValue;
    const handlers = [];

    const thenable = {
      then(onFulfilled, onRejected) {
        handlers.push({
          onFulfilled: typeof onFulfilled === 'function' ? onFulfilled : null,
          onRejected: typeof onRejected === 'function' ? onRejected : null,
        });
        if (settled) {
          flushHandlers();
        }
        return thenable;
      },
      catch(onRejected) {
        return thenable.then(null, onRejected);
      },
    };

    function flushHandlers() {
      if (!handlers.length) {
        return;
      }

      const queue = handlers.slice();
      handlers.length = 0;

      for (let index = 0; index < queue.length; index += 1) {
        const entry = queue[index];
        if (!entry) continue;
        const handler = fulfilled ? entry.onFulfilled : entry.onRejected;
        if (typeof handler !== 'function') {
          continue;
        }
        try {
          handler(storedValue);
        } catch (handlerError) {
          void handlerError;
        }
      }
    }

    function settle(type, value) {
      if (settled) {
        return;
      }

      settled = true;
      fulfilled = type === 'fulfilled';
      storedValue = value;
      flushHandlers();
    }

    function resolve(value) {
      settle('fulfilled', value);
    }

    function reject(error) {
      settle('rejected', error);
    }

    try {
      executor(resolve, reject);
    } catch (executorError) {
      reject(executorError);
    }

    return thenable;
  }

  function createOnboardingLoaderHelpers(options) {
    const deps = options && typeof options === 'object' ? options : {};
    const resolveModuleApi = typeof deps.resolveModuleApi === 'function'
      ? deps.resolveModuleApi
      : null;
    const getSafeLocalStorage = typeof deps.getSafeLocalStorage === 'function'
      ? deps.getSafeLocalStorage
      : () => null;
    const ensureDeferredScriptsLoaded = typeof deps.ensureDeferredScriptsLoaded === 'function'
      ? deps.ensureDeferredScriptsLoaded
      : () => null;

    function resolveOnboardingModuleApi() {
      if (!resolveModuleApi) {
        return null;
      }
      return resolveModuleApi(ONBOARDING_MODULE_NAME, candidate => (
        candidate
        && typeof candidate === 'object'
        && typeof candidate.start === 'function'
        && typeof candidate.skip === 'function'
      ));
    }

    let onboardingModulePoll = null;

    function waitForOnboardingModule() {
      if (onboardingModulePoll) {
        return onboardingModulePoll;
      }

      onboardingModulePoll = createThenable(resolve => {
        const startTime = typeof Date !== 'undefined' && typeof Date.now === 'function'
          ? Date.now()
          : 0;
        const timeoutMs = 15000;
        const pollInterval = 60;

        function poll() {
          const moduleApi = resolveOnboardingModuleApi();
          if (moduleApi) {
            onboardingModulePoll = null;
            resolve(moduleApi);
            return;
          }

          if (
            typeof Date !== 'undefined'
            && typeof Date.now === 'function'
            && Date.now() - startTime >= timeoutMs
          ) {
            onboardingModulePoll = null;
            resolve(null);
            return;
          }

          if (typeof setTimeout === 'function') {
            setTimeout(poll, pollInterval);
          } else {
            poll();
          }
        }

        poll();
      });

      return onboardingModulePoll;
    }

    function chainThenable(source, onComplete) {
      if (!source || typeof source.then !== 'function') {
        return onComplete();
      }

      return createThenable(resolve => {
        const finalize = () => {
          const next = onComplete();
          if (next && typeof next.then === 'function') {
            try {
              next.then(value => resolve(value), () => resolve(null));
            } catch (nextError) {
              void nextError;
              resolve(null);
            }
          } else {
            resolve(next);
          }
        };

        try {
          source.then(finalize, finalize);
        } catch (chainError) {
          void chainError;
          finalize();
        }
      });
    }

    function ensureOnboardingModuleRequested(reason) {
      const normalizedReason = typeof reason === 'string' && reason ? reason : 'onboarding-request';
      let ensureResult = null;

      try {
        ensureResult = ensureDeferredScriptsLoaded(normalizedReason);
      } catch (ensureError) {
        void ensureError;
        ensureResult = null;
      }

      const existing = resolveOnboardingModuleApi();
      if (existing) {
        if (ensureResult && typeof ensureResult.then === 'function') {
          return chainThenable(ensureResult, () => existing);
        }
        return createThenable(resolve => resolve(existing));
      }

      return chainThenable(ensureResult, () => waitForOnboardingModule());
    }

    function shouldRequestOnboardingForFirstRun() {
      let storage = null;

      try {
        storage = getSafeLocalStorage();
      } catch (storageError) {
        void storageError;
        storage = null;
      }

      if (!storage || typeof storage.getItem !== 'function') {
        return true;
      }

      let sawEntry = false;

      for (let index = 0; index < ONBOARDING_STORAGE_KEYS.length; index += 1) {
        const key = ONBOARDING_STORAGE_KEYS[index];
        if (!key) continue;

        let rawValue = null;
        try {
          rawValue = storage.getItem(key);
        } catch (readError) {
          void readError;
          return true;
        }

        if (rawValue === null || typeof rawValue === 'undefined') {
          continue;
        }

        sawEntry = true;

        if (typeof rawValue !== 'string' || !rawValue) {
          return true;
        }

        let parsed = null;
        try {
          parsed = JSON.parse(rawValue);
        } catch (parseError) {
          void parseError;
          return true;
        }

        if (!parsed || typeof parsed !== 'object') {
          return true;
        }

        if (parsed.skipped === true) {
          continue;
        }

        if (parsed.completed === true) {
          continue;
        }

        return true;
      }

      return !sawEntry;
    }

    function ensureOnboardingModuleForFirstRun() {
      if (!shouldRequestOnboardingForFirstRun()) {
        return;
      }

      ensureOnboardingModuleRequested('onboarding-first-run');
    }

    function markOnboardingEvent(event) {
      if (!event) return;
      try {
        Object.defineProperty(event, ONBOARDING_DEFERRED_FLAG, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: true,
        });
      } catch (defineError) {
        void defineError;
        try {
          event[ONBOARDING_DEFERRED_FLAG] = true;
        } catch (assignError) {
          void assignError;
        }
      }
    }

    function hasOnboardingEventBeenHandled(event) {
      if (!event) return false;
      try {
        return !!event[ONBOARDING_DEFERRED_FLAG];
      } catch (readError) {
        void readError;
      }
      return false;
    }

    function resolveOnboardingTrigger(event) {
      if (!event) return null;
      const target = event.target;
      if (!target) return null;
      if (typeof target.closest === 'function') {
        try {
          return target.closest('[data-onboarding-tour-trigger]');
        } catch (closestError) {
          void closestError;
        }
      }
      return null;
    }

    function reDispatchOnboardingTrigger(trigger, originalEvent) {
      if (!trigger) return;

      if (
        typeof trigger.dispatchEvent === 'function'
        && originalEvent
        && typeof originalEvent.constructor === 'function'
      ) {
        let synthetic = null;
        try {
          synthetic = new originalEvent.constructor(originalEvent.type, {
            bubbles: true,
            cancelable: true,
          });
        } catch (syntheticError) {
          void syntheticError;
          synthetic = null;
        }

        if (synthetic) {
          markOnboardingEvent(synthetic);
          try {
            trigger.dispatchEvent(synthetic);
            return;
          } catch (dispatchError) {
            void dispatchError;
          }
        }
      }

      markOnboardingEvent(originalEvent);

      if (typeof trigger.click === 'function') {
        try {
          trigger.click();
        } catch (clickError) {
          void clickError;
        }
      }
    }

    function handleDeferredOnboardingTrigger(event) {
      if (!event || hasOnboardingEventBeenHandled(event)) {
        return;
      }

      const trigger = resolveOnboardingTrigger(event);
      if (!trigger) {
        return;
      }

      const moduleApi = resolveOnboardingModuleApi();
      if (moduleApi) {
        ensureOnboardingModuleRequested('onboarding-trigger-preload');
        return;
      }

      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }
      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
      }

      ensureOnboardingModuleRequested('onboarding-trigger').then(() => {
        const ready = resolveOnboardingModuleApi();
        if (!ready) {
          return;
        }
        ensureOnboardingModuleRequested('onboarding-trigger-preload');
        reDispatchOnboardingTrigger(trigger, event);
      });
    }

    return {
      ensureOnboardingModuleRequested,
      shouldRequestOnboardingForFirstRun,
      ensureOnboardingModuleForFirstRun,
      markOnboardingEvent,
      hasOnboardingEventBeenHandled,
      resolveOnboardingTrigger,
      reDispatchOnboardingTrigger,
      handleDeferredOnboardingTrigger,
    };
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = { createOnboardingLoaderHelpers };
  }

  const scope = (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  if (scope && typeof scope.cineCreateOnboardingLoaderHelpers !== 'function') {
    try {
      Object.defineProperty(scope, 'cineCreateOnboardingLoaderHelpers', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: createOnboardingLoaderHelpers,
      });
    } catch (exposeError) {
      void exposeError;
      scope.cineCreateOnboardingLoaderHelpers = createOnboardingLoaderHelpers;
    }
  }
})();
