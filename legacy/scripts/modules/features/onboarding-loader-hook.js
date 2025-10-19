/* global getSafeLocalStorage, SAFE_LOCAL_STORAGE */

(function () {
  var STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  var HELP_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  var HELP_BUTTON_ID = 'helpOnboardingTutorialButton';
  var LOAD_REASON_PREFIX = 'onboarding-tour:';
  var REQUEST_TIMEOUT_MS = 2000;
  var MODULE_WAIT_TIMEOUT_MS = 4000;

  var onboardingModulePromise = null;
  var onboardingModuleReady = false;
  var triggerInterceptor = null;

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
    var target = scope || getGlobalScope();
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
    var target = scope || getGlobalScope();
    if (target && typeof target.requestAnimationFrame === 'function') {
      try {
        target.requestAnimationFrame(function () {
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
    setTimeout(function () {
      try {
        task();
      } catch (timeoutError) {
        void timeoutError;
      }
    }, 32);
  }

  function requestDeferredLoad(scope, reason) {
    var contextReason = typeof reason === 'string' && reason
      ? LOAD_REASON_PREFIX + reason
      : LOAD_REASON_PREFIX + 'bootstrap';

    return new Promise(function (resolve) {
      var start = Date.now();

      function attempt() {
        var currentScope = scope || getGlobalScope();
        if (!currentScope) {
          resolve(false);
          return;
        }

        var ensureFn = null;
        try {
          ensureFn = currentScope.cineEnsureDeferredScriptsLoaded;
        } catch (ensureError) {
          void ensureError;
          ensureFn = null;
        }

        if (typeof ensureFn === 'function') {
          try {
            var result = ensureFn({ reason: contextReason });
            if (result && typeof result.then === 'function') {
              result.then(function () {
                resolve(true);
              }, function () {
                resolve(false);
              });
            } else {
              resolve(true);
            }
          } catch (invokeError) {
            void invokeError;
            resolve(false);
          }
          return;
        }

        var ready = null;
        try {
          ready = currentScope.cineDeferredScriptsReady;
        } catch (readError) {
          void readError;
          ready = null;
        }

        if (ready && typeof ready.then === 'function') {
          ready.then(function () {
            resolve(true);
          }, function () {
            resolve(false);
          });
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
    var doc = getDocument(scope);
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
    var target = scope || getGlobalScope();
    if (!target) {
      return Promise.resolve(null);
    }

    if (target.cineFeaturesOnboardingTour) {
      onboardingModuleReady = true;
      uninstallTriggerInterceptor(target);
      return Promise.resolve(target.cineFeaturesOnboardingTour);
    }

    return new Promise(function (resolve) {
      var start = Date.now();

      function check() {
        var currentScope = scope || getGlobalScope();
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
    var scope = getGlobalScope();
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
      .catch(function () {
        return false;
      })
      .then(function () {
        return waitForModule(scope);
      })
      .then(function (moduleApi) {
        onboardingModulePromise = null;
        if (!moduleApi && typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Onboarding tour module did not become available after deferred load.');
        }
        return moduleApi || null;
      }, function (error) {
        onboardingModulePromise = null;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Onboarding tour module failed to load.', error);
        }
        return null;
      });

    return onboardingModulePromise;
  }

  function readStoredState(scope) {
    var storageCandidates = [];
    try {
      if (typeof getSafeLocalStorage === 'function') {
        var safeStorage = getSafeLocalStorage();
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

    var currentScope = scope || getGlobalScope();
    if (currentScope && typeof currentScope.localStorage === 'object' && currentScope.localStorage) {
      storageCandidates.push(currentScope.localStorage);
    }

    for (var index = 0; index < storageCandidates.length; index += 1) {
      var storage = storageCandidates[index];
      if (!storage || typeof storage.getItem !== 'function') {
        continue;
      }
      try {
        var value = storage.getItem(STORAGE_KEY);
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
    var stored = readStoredState(scope);
    if (stored) {
      return;
    }
    schedule(function () {
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
        var closestMatch = startNode.closest(HELP_TRIGGER_SELECTOR + ', #' + HELP_BUTTON_ID);
        if (closestMatch) {
          return closestMatch;
        }
      } catch (error) {
        void error;
      }
    }

    var node = startNode;
    while (node && node !== doc && node !== (doc && doc.documentElement)) {
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
        var helpButton = doc.getElementById(HELP_BUTTON_ID);
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

    var doc = getDocument(scope);
    if (!doc || typeof doc.addEventListener !== 'function') {
      return;
    }

    triggerInterceptor = function (event) {
      if (!event || event.defaultPrevented || onboardingModuleReady) {
        return;
      }
      if (event.type !== 'click') {
        return;
      }

      var trigger = resolveTrigger(event.target, doc);
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
        .then(function (moduleApi) {
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

          schedule(function () {
            try {
              if (typeof trigger.click === 'function') {
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
        })
        .catch(function (error) {
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

  var scope = getGlobalScope();
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
