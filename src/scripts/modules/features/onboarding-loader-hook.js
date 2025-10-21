/* global getSafeLocalStorage, SAFE_LOCAL_STORAGE */

(function () {
  const STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  const HELP_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  const HELP_BUTTON_ID = 'helpOnboardingTutorialButton';
  const LOAD_REASON_PREFIX = 'onboarding-tour:';
  const REQUEST_TIMEOUT_MS = 2000;
  const MODULE_WAIT_TIMEOUT_MS = (() => {
    const candidates = [
      typeof globalThis !== 'undefined' && globalThis ? globalThis.__CPP_ONBOARDING_WAIT_TIMEOUT_MS : undefined,
      typeof window !== 'undefined' && window ? window.__CPP_ONBOARDING_WAIT_TIMEOUT_MS : undefined,
      typeof self !== 'undefined' && self ? self.__CPP_ONBOARDING_WAIT_TIMEOUT_MS : undefined,
      typeof global !== 'undefined' && global ? global.__CPP_ONBOARDING_WAIT_TIMEOUT_MS : undefined,
    ];
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate === undefined || candidate === null) {
        continue;
      }
      const parsed = Number(candidate);
      if (Number.isFinite(parsed) && parsed >= 0) {
        return parsed;
      }
    }
    return 4000;
  })();
  const TRIGGER_INTERCEPTOR_RELEASE_MS = 4500;
  const MODULE_MONITOR_MAX_DURATION_MS = Math.max((MODULE_WAIT_TIMEOUT_MS || 0) * 10, MODULE_WAIT_TIMEOUT_MS + 1000);

  let onboardingModulePromise = null;
  let onboardingModuleReady = false;
  let triggerInterceptor = null;
  let moduleReadyPromise = null;
  let resolveModuleReadyPromise = null;
  let lastDeferredLoadFailed = false;
  let moduleTimeoutWarningIssued = false;
  const pendingTriggerCallbacks = [];
  const pendingTriggerNodes = typeof WeakSet === 'function' ? new WeakSet() : null;

  function warnModuleTimeoutOnce() {
    if (moduleTimeoutWarningIssued) {
      return;
    }
    moduleTimeoutWarningIssued = true;
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Onboarding tour module did not become available after deferred load.');
    }
  }

  function getGlobalScope() {
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

  function getDocument(scope) {
    const target = scope || getGlobalScope();
    if (!target) {
      return null;
    }
    try {
      if (target.document && typeof target.document.addEventListener === 'function') {
        return target.document;
      }
    } catch (error) {
      void error;
    }
    return null;
  }

  function schedule(task, scope) {
    if (typeof task !== 'function') {
      return;
    }
    const target = scope || getGlobalScope();
    if (target && typeof target.requestAnimationFrame === 'function') {
      try {
        target.requestAnimationFrame(() => {
          try {
            task();
          } catch (taskError) {
            void taskError;
          }
        });
        return;
      } catch (rafError) {
        void rafError;
      }
    }
    setTimeout(() => {
      try {
        task();
      } catch (timeoutError) {
        void timeoutError;
      }
    }, 32);
  }

  function requestDeferredLoad(scope, reason) {
    const contextReason = typeof reason === 'string' && reason
      ? `${LOAD_REASON_PREFIX}${reason}`
      : `${LOAD_REASON_PREFIX}bootstrap`;

    return new Promise(resolve => {
      const start = Date.now();

      function attempt() {
        const currentScope = scope || getGlobalScope();
        if (!currentScope) {
          resolve(false);
          return;
        }

        let ensureFn = null;
        try {
          ensureFn = currentScope.cineEnsureDeferredScriptsLoaded;
        } catch (ensureError) {
          void ensureError;
          ensureFn = null;
        }

        if (typeof ensureFn === 'function') {
          try {
            const result = ensureFn({ reason: contextReason });
            if (result && typeof result.then === 'function') {
              result
                .then(() => resolve(true))
                .catch(() => resolve(false));
            } else {
              resolve(true);
            }
          } catch (invokeError) {
            void invokeError;
            resolve(false);
          }
          return;
        }

        let ready = null;
        try {
          ready = currentScope.cineDeferredScriptsReady;
        } catch (readError) {
          void readError;
          ready = null;
        }

        if (ready && typeof ready.then === 'function') {
          ready
            .then(() => resolve(true))
            .catch(() => resolve(false));
          return;
        }

        if (Date.now() - start >= REQUEST_TIMEOUT_MS) {
          resolve(false);
          return;
        }

        schedule(attempt, currentScope);
      }

      attempt();
    });
  }

  function uninstallTriggerInterceptor(scope) {
    if (!triggerInterceptor) {
      return;
    }
    const doc = getDocument(scope);
    if (doc && typeof doc.removeEventListener === 'function') {
      try {
        doc.removeEventListener('click', triggerInterceptor, true);
      } catch (error) {
        void error;
      }
    }
    triggerInterceptor = null;
  }

  function notifyModuleReady(scope, moduleApi) {
    if (!moduleApi) {
      return;
    }

    onboardingModuleReady = true;
    lastDeferredLoadFailed = false;
    moduleTimeoutWarningIssued = false;

    uninstallTriggerInterceptor(scope);

    if (!pendingTriggerCallbacks.length) {
      return;
    }

    const callbacks = pendingTriggerCallbacks.slice();
    pendingTriggerCallbacks.length = 0;

    for (let index = 0; index < callbacks.length; index += 1) {
      const callback = callbacks[index];
      if (typeof callback !== 'function') {
        continue;
      }
      try {
        callback(moduleApi);
      } catch (callbackError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Onboarding tour queued trigger failed after module ready.', callbackError);
        }
      }
    }
  }

  function replayTrigger(trigger, moduleApi, scope) {
    schedule(() => {
      try {
        if (trigger && typeof trigger.click === 'function') {
          trigger.click();
        } else if (moduleApi && typeof moduleApi.start === 'function') {
          moduleApi.start();
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Onboarding tour trigger failed after deferred load.', error);
        }
      }
    }, scope);
  }

  function queueTriggerReplay(trigger, scope) {
    if (pendingTriggerNodes && trigger) {
      try {
        if (pendingTriggerNodes.has(trigger)) {
          return;
        }
        pendingTriggerNodes.add(trigger);
      } catch (error) {
        void error;
      }
    }

    pendingTriggerCallbacks.push(moduleApi => {
      if (pendingTriggerNodes && trigger) {
        try {
          pendingTriggerNodes.delete(trigger);
        } catch (error) {
          void error;
        }
      }
      replayTrigger(trigger, moduleApi, scope);
    });
  }

  function getModuleReadyPromise(scope) {
    if (moduleReadyPromise) {
      const currentScope = scope || getGlobalScope();
      if (currentScope && currentScope.cineFeaturesOnboardingTour) {
        notifyModuleReady(currentScope, currentScope.cineFeaturesOnboardingTour);
        if (resolveModuleReadyPromise) {
          try {
            resolveModuleReadyPromise(currentScope.cineFeaturesOnboardingTour);
          } catch (resolveError) {
            void resolveError;
          }
          resolveModuleReadyPromise = null;
        }
      }
      return moduleReadyPromise;
    }

    const target = scope || getGlobalScope();
    if (!target) {
      return Promise.resolve(null);
    }

    if (target.cineFeaturesOnboardingTour) {
      notifyModuleReady(target, target.cineFeaturesOnboardingTour);
      return Promise.resolve(target.cineFeaturesOnboardingTour);
    }

    const monitorStart = Date.now();

    moduleReadyPromise = new Promise(resolve => {
      resolveModuleReadyPromise = resolve;
      function check() {
        const currentScope = scope || getGlobalScope();
        if (!currentScope) {
          resolve(null);
          resolveModuleReadyPromise = null;
          return;
        }
        if (currentScope.cineFeaturesOnboardingTour) {
          notifyModuleReady(currentScope, currentScope.cineFeaturesOnboardingTour);
          resolve(currentScope.cineFeaturesOnboardingTour);
          resolveModuleReadyPromise = null;
          return;
        }
        if (Date.now() - monitorStart >= MODULE_MONITOR_MAX_DURATION_MS) {
          resolve(null);
          resolveModuleReadyPromise = null;
          return;
        }
        schedule(check, currentScope);
      }

      check();
    }).finally(() => {
      moduleReadyPromise = null;
      resolveModuleReadyPromise = null;
    });

    return moduleReadyPromise;
  }

  function waitForModule(scope) {
    return getModuleReadyPromise(scope);
  }

  function ensureOnboardingTourLoaded(reason) {
    const scope = getGlobalScope();
    if (!scope) {
      return Promise.resolve(null);
    }

    if (onboardingModuleReady && scope.cineFeaturesOnboardingTour) {
      return Promise.resolve(scope.cineFeaturesOnboardingTour);
    }

    if (onboardingModulePromise) {
      return onboardingModulePromise;
    }

    const timeoutToken = {};

    onboardingModulePromise = requestDeferredLoad(scope, reason)
      .catch(error => {
        void error;
        return false;
      })
      .then(loaded => {
        if (!loaded) {
          lastDeferredLoadFailed = true;
          return { moduleApi: null, reason: 'deferred-load-unavailable' };
        }

        lastDeferredLoadFailed = false;

        const modulePromise = waitForModule(scope);
        const timeoutPromise = new Promise(resolve => {
          try {
            setTimeout(() => {
              resolve(timeoutToken);
            }, MODULE_WAIT_TIMEOUT_MS);
          } catch (timeoutError) {
            void timeoutError;
            resolve(timeoutToken);
          }
        });

        return Promise.race([modulePromise, timeoutPromise]).then(result => {
          if (result === timeoutToken) {
            if (modulePromise && typeof modulePromise.then === 'function') {
              modulePromise
                .then(finalModuleApi => {
                  if (!finalModuleApi) {
                    warnModuleTimeoutOnce();
                  }
                })
                .catch(error => {
                  void error;
                });
            } else {
              warnModuleTimeoutOnce();
            }
            return { moduleApi: null, reason: 'timeout-pending' };
          }
          if (!result) {
            warnModuleTimeoutOnce();
          }
          return { moduleApi: result || null, reason: result ? 'ready' : 'monitor-timeout' };
        });
      })
      .then(result => {
        const moduleApi = result && result.moduleApi;
        if (!moduleApi && typeof console !== 'undefined' && typeof console.warn === 'function') {
          if (result && result.reason === 'deferred-load-unavailable') {
            console.warn('Onboarding tour module deferred scripts could not be requested.');
          }
        }
        return moduleApi || null;
      })
      .finally(() => {
        onboardingModulePromise = null;
      });

    return onboardingModulePromise;
  }

  function parseStoredStateValue(rawValue) {
    if (!rawValue) {
      return null;
    }

    if (typeof rawValue === 'object') {
      return rawValue;
    }

    if (typeof rawValue !== 'string') {
      return null;
    }

    const trimmed = rawValue.trim();
    if (!trimmed) {
      return null;
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
      if (parsed === true) {
        return { completed: true };
      }
      if (parsed === false) {
        return { completed: false };
      }
      if (typeof parsed === 'string') {
        if (parsed === 'completed') {
          return { completed: true };
        }
        if (parsed === 'skipped') {
          return { skipped: true };
        }
      }
    } catch (error) {
      void error;
    }

    if (trimmed === 'completed') {
      return { completed: true };
    }

    if (trimmed === 'skipped') {
      return { skipped: true };
    }

    if (trimmed === 'true') {
      return { completed: true };
    }

    if (trimmed === 'false') {
      return { completed: false };
    }

    return null;
  }

  function readStoredState(scope) {
    const storageCandidates = [];
    const pushCandidate = candidate => {
      if (!candidate) {
        return;
      }
      if (storageCandidates.indexOf(candidate) !== -1) {
        return;
      }
      storageCandidates.push(candidate);
    };
    try {
      if (typeof getSafeLocalStorage === 'function') {
        const safeStorage = getSafeLocalStorage();
        pushCandidate(safeStorage);
      }
    } catch (error) {
      void error;
    }

    if (typeof SAFE_LOCAL_STORAGE === 'object' && SAFE_LOCAL_STORAGE) {
      pushCandidate(SAFE_LOCAL_STORAGE);
    }

    const currentScope = scope || getGlobalScope();
    if (currentScope && typeof currentScope.localStorage === 'object' && currentScope.localStorage) {
      pushCandidate(currentScope.localStorage);
    }

    if (currentScope && typeof currentScope.sessionStorage === 'object' && currentScope.sessionStorage) {
      pushCandidate(currentScope.sessionStorage);
    }

    let fallbackState = null;

    for (let index = 0; index < storageCandidates.length; index += 1) {
      const storage = storageCandidates[index];
      if (!storage || typeof storage.getItem !== 'function') {
        continue;
      }
      try {
        const value = storage.getItem(STORAGE_KEY);
        const parsed = parseStoredStateValue(value);
        if (parsed) {
          if (parsed.completed === true || parsed.skipped === true) {
            return parsed;
          }
          if (!fallbackState) {
            fallbackState = parsed;
          }
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackState;
  }

  function detectFirstRun(scope) {
    if (onboardingModuleReady) {
      return;
    }
    const stored = readStoredState(scope);
    if (stored && typeof stored === 'object' && (stored.completed === true || stored.skipped === true)) {
      return;
    }
    schedule(() => {
      ensureOnboardingTourLoaded('first-run');
    }, scope);
  }

  function matchesTrigger(node) {
    if (!node) {
      return false;
    }
    if (typeof node.matches === 'function' && node.matches(HELP_TRIGGER_SELECTOR)) {
      return true;
    }
    if (typeof node.getAttribute === 'function' && node.getAttribute('data-onboarding-tour-trigger') !== null) {
      return true;
    }
    return typeof node.id === 'string' && node.id === HELP_BUTTON_ID;
  }

  function resolveTrigger(startNode, doc) {
    if (!startNode) {
      return null;
    }

    if (typeof startNode.closest === 'function') {
      try {
        const closestMatch = startNode.closest(`${HELP_TRIGGER_SELECTOR}, #${HELP_BUTTON_ID}`);
        if (closestMatch) {
          return closestMatch;
        }
      } catch (error) {
        void error;
      }
    }

    let node = startNode;
    while (node && node !== doc && node !== doc.documentElement) {
      if (matchesTrigger(node)) {
        return node;
      }
      node = node.parentElement || node.parentNode || null;
    }

    if (matchesTrigger(node)) {
      return node;
    }

    if (doc && typeof doc.getElementById === 'function') {
      try {
        const helpButton = doc.getElementById(HELP_BUTTON_ID);
        if (helpButton && matchesTrigger(helpButton)) {
          return helpButton;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function installTriggerInterceptor(scope) {
    if (triggerInterceptor || onboardingModuleReady) {
      return;
    }

    const doc = getDocument(scope);
    if (!doc || typeof doc.addEventListener !== 'function') {
      return;
    }

    triggerInterceptor = event => {
      if (!event || event.defaultPrevented || onboardingModuleReady) {
        return;
      }
      if (event.type !== 'click') {
        return;
      }

      const trigger = resolveTrigger(event.target, doc);
      if (!trigger) {
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

      if (typeof trigger.setAttribute === 'function') {
        try {
          trigger.setAttribute('aria-busy', 'true');
        } catch (error) {
          void error;
        }
      }

      let releaseTimer = null;

      function releaseBusyAttribute() {
        if (releaseTimer !== null) {
          try {
            clearTimeout(releaseTimer);
          } catch (clearError) {
            void clearError;
          }
          releaseTimer = null;
        }
        if (typeof trigger.removeAttribute === 'function') {
          try {
            trigger.removeAttribute('aria-busy');
          } catch (removeError) {
            void removeError;
          }
        }
      }

      try {
        if (typeof setTimeout === 'function') {
          releaseTimer = setTimeout(releaseBusyAttribute, TRIGGER_INTERCEPTOR_RELEASE_MS);
        }
      } catch (timerError) {
        void timerError;
        releaseTimer = null;
      }

      ensureOnboardingTourLoaded('ui-trigger')
        .then(moduleApi => {
          releaseBusyAttribute();

          if (!moduleApi) {
            if (!lastDeferredLoadFailed) {
              queueTriggerReplay(trigger, scope);
            }
            return;
          }

          onboardingModuleReady = true;
          uninstallTriggerInterceptor(scope);

          replayTrigger(trigger, moduleApi, scope);
        })
        .catch(error => {
          releaseBusyAttribute();
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unable to load onboarding tour before handling trigger.', error);
          }
        });
    };

    try {
      doc.addEventListener('click', triggerInterceptor, true);
    } catch (error) {
      void error;
      triggerInterceptor = null;
    }
  }

  const scope = getGlobalScope();
  if (!scope) {
    return;
  }

  try {
    scope.cineEnsureOnboardingTourLoaded = ensureOnboardingTourLoaded;
  } catch (error) {
    void error;
  }

  installTriggerInterceptor(scope);
  detectFirstRun(scope);
})();
