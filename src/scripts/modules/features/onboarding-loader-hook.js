/* global getSafeLocalStorage, SAFE_LOCAL_STORAGE */

(function () {
  const STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  const HELP_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  const HELP_BUTTON_ID = 'helpOnboardingTutorialButton';
  const LOAD_REASON_PREFIX = 'onboarding-tour:';
  const REQUEST_TIMEOUT_MS = 2000;
  const MODULE_WAIT_TIMEOUT_MS = 4000;

  let onboardingModulePromise = null;
  let onboardingModuleReady = false;
  let triggerInterceptor = null;

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

  function waitForModule(scope) {
    const target = scope || getGlobalScope();
    if (!target) {
      return Promise.resolve(null);
    }

    if (target.cineFeaturesOnboardingTour) {
      onboardingModuleReady = true;
      uninstallTriggerInterceptor(target);
      return Promise.resolve(target.cineFeaturesOnboardingTour);
    }

    return new Promise(resolve => {
      const start = Date.now();

      function check() {
        const currentScope = scope || getGlobalScope();
        if (!currentScope) {
          resolve(null);
          return;
        }
        if (currentScope.cineFeaturesOnboardingTour) {
          onboardingModuleReady = true;
          uninstallTriggerInterceptor(currentScope);
          resolve(currentScope.cineFeaturesOnboardingTour);
          return;
        }
        if (Date.now() - start >= MODULE_WAIT_TIMEOUT_MS) {
          resolve(null);
          return;
        }
        schedule(check, currentScope);
      }

      check();
    });
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

    onboardingModulePromise = requestDeferredLoad(scope, reason)
      .catch(error => {
        void error;
        return false;
      })
      .then(() => waitForModule(scope))
      .then(moduleApi => {
        if (!moduleApi && typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Onboarding tour module did not become available after deferred load.');
        }
        return moduleApi || null;
      })
      .finally(() => {
        onboardingModulePromise = null;
      });

    return onboardingModulePromise;
  }

  function readStoredState(scope) {
    let storageCandidates = [];
    try {
      if (typeof getSafeLocalStorage === 'function') {
        const safeStorage = getSafeLocalStorage();
        if (safeStorage) {
          storageCandidates.push(safeStorage);
        }
      }
    } catch (error) {
      void error;
    }

    if (typeof SAFE_LOCAL_STORAGE === 'object' && SAFE_LOCAL_STORAGE) {
      storageCandidates.push(SAFE_LOCAL_STORAGE);
    }

    const currentScope = scope || getGlobalScope();
    if (currentScope && typeof currentScope.localStorage === 'object' && currentScope.localStorage) {
      storageCandidates.push(currentScope.localStorage);
    }

    for (let index = 0; index < storageCandidates.length; index += 1) {
      const storage = storageCandidates[index];
      if (!storage || typeof storage.getItem !== 'function') {
        continue;
      }
      try {
        const value = storage.getItem(STORAGE_KEY);
        if (value) {
          return value;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function detectFirstRun(scope) {
    if (onboardingModuleReady) {
      return;
    }
    const stored = readStoredState(scope);
    if (stored) {
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

      ensureOnboardingTourLoaded('ui-trigger')
        .then(moduleApi => {
          if (typeof trigger.removeAttribute === 'function') {
            try {
              trigger.removeAttribute('aria-busy');
            } catch (error) {
              void error;
            }
          }

          if (!moduleApi) {
            return;
          }

          onboardingModuleReady = true;
          uninstallTriggerInterceptor(scope);

          schedule(() => {
            try {
              if (typeof trigger.click === 'function') {
                trigger.click();
              } else if (typeof moduleApi.start === 'function') {
                moduleApi.start();
              }
            } catch (error) {
              if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Onboarding tour trigger failed after deferred load.', error);
              }
            }
          }, scope);
        })
        .catch(error => {
          if (typeof trigger.removeAttribute === 'function') {
            try {
              trigger.removeAttribute('aria-busy');
            } catch (removeError) {
              void removeError;
            }
          }
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
