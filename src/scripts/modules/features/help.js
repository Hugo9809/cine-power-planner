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

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? MODULE_BASE.safeWarn
    : function fallbackWarn(message, error) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }
        if (typeof error === 'undefined') {
          console.warn(message);
        } else {
          console.warn(message, error);
        }
      };

  function collectCandidateScopes() {
    const scopes = [];
    const candidates = MODULE_BASE.collectCandidateScopes
      ? MODULE_BASE.collectCandidateScopes(GLOBAL_SCOPE)
      : [
          GLOBAL_SCOPE,
          typeof globalThis !== 'undefined' ? globalThis : null,
          typeof window !== 'undefined' ? window : null,
          typeof self !== 'undefined' ? self : null,
          typeof global !== 'undefined' ? global : null,
        ];

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
        continue;
      }
      if (scopes.indexOf(candidate) !== -1) {
        continue;
      }
      scopes.push(candidate);
    }

    return scopes;
  }

  function resolveIosPwaHelpStorageKey(explicitKey) {
    if (typeof explicitKey === 'string' && explicitKey) {
      return explicitKey;
    }

    const scopes = collectCandidateScopes();
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      try {
        const candidate = scope && scope.IOS_PWA_HELP_STORAGE_KEY;
        if (typeof candidate === 'string' && candidate) {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }

    return 'iosPwaHelpShown';
  }

  function resolveNavigator(overrideNavigator) {
    if (overrideNavigator && typeof overrideNavigator === 'object') {
      return overrideNavigator;
    }

    const scopes = collectCandidateScopes();
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      try {
        if (scope && typeof scope.navigator === 'object') {
          return scope.navigator;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function resolveWindow(overrideWindow) {
    if (overrideWindow && typeof overrideWindow === 'object') {
      return overrideWindow;
    }

    const scopes = collectCandidateScopes();
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope) continue;
      if (typeof scope.matchMedia === 'function') {
        return scope;
      }
      if (typeof scope.document === 'object') {
        return scope;
      }
    }

    return null;
  }

  function resolveStorage(overrideStorage) {
    if (overrideStorage && typeof overrideStorage === 'object') {
      return overrideStorage;
    }

    const scopes = collectCandidateScopes();
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (scope && typeof scope.localStorage === 'object') {
        return scope.localStorage;
      }
    }

    return null;
  }

  function isIosDevice(overrideNavigator) {
    const navigatorCandidate = resolveNavigator(overrideNavigator);
    if (!navigatorCandidate) {
      return false;
    }

    const ua = navigatorCandidate.userAgent || '';
    const platform = navigatorCandidate.platform || '';
    const hasTouch = typeof navigatorCandidate.maxTouchPoints === 'number'
      && navigatorCandidate.maxTouchPoints > 1;

    return /iphone|ipad|ipod/i.test(ua) || (platform === 'MacIntel' && hasTouch);
  }

  function isAndroidDevice(overrideNavigator) {
    const navigatorCandidate = resolveNavigator(overrideNavigator);
    if (!navigatorCandidate) {
      return false;
    }

    const ua = navigatorCandidate.userAgent || '';
    const vendor = navigatorCandidate.vendor || '';

    return /android/i.test(ua) || /android/i.test(vendor);
  }

  function isStandaloneDisplayMode(overrideWindow, overrideNavigator) {
    const win = resolveWindow(overrideWindow);
    if (!win) {
      return false;
    }

    if (typeof win.matchMedia === 'function') {
      try {
        if (win.matchMedia('(display-mode: standalone)').matches) {
          return true;
        }
      } catch (error) {
        safeWarn('matchMedia display-mode check failed', error);
      }
    }

    const navigatorCandidate = resolveNavigator(overrideNavigator) || (win && win.navigator);
    if (navigatorCandidate && typeof navigatorCandidate.standalone === 'boolean') {
      return navigatorCandidate.standalone;
    }

    return false;
  }

  function hasDismissedIosPwaHelp(explicitKey, overrideStorage) {
    const storage = resolveStorage(overrideStorage);
    if (!storage || typeof storage.getItem !== 'function') {
      return false;
    }

    const storageKey = resolveIosPwaHelpStorageKey(explicitKey);

    try {
      return storage.getItem(storageKey) === '1';
    } catch (error) {
      safeWarn('Could not read iOS PWA help dismissal flag', error);
      return false;
    }
  }

  function markIosPwaHelpDismissed(explicitKey, overrideStorage) {
    const storage = resolveStorage(overrideStorage);
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }

    const storageKey = resolveIosPwaHelpStorageKey(explicitKey);

    try {
      storage.setItem(storageKey, '1');
    } catch (error) {
      safeWarn('Could not store iOS PWA help dismissal', error);
    }
  }

  function shouldShowIosPwaHelp(resolveDialog, explicitKey, overrideWindow, overrideNavigator, overrideStorage) {
    const dialog = typeof resolveDialog === 'function'
      ? resolveDialog()
      : resolveDialog || null;

    if (!dialog) {
      return false;
    }

    if (!isIosDevice(overrideNavigator)) {
      return false;
    }

    if (!isStandaloneDisplayMode(overrideWindow, overrideNavigator)) {
      return false;
    }

    if (hasDismissedIosPwaHelp(explicitKey, overrideStorage)) {
      return false;
    }

    return true;
  }

  const moduleApi = Object.freeze({
    resolveIosPwaHelpStorageKey,
    isIosDevice,
    isAndroidDevice,
    isStandaloneDisplayMode,
    hasDismissedIosPwaHelp,
    markIosPwaHelpDismissed,
    shouldShowIosPwaHelp,
  });

  MODULE_BASE.registerOrQueueModule(
    'cine.features.help',
    moduleApi,
    {
      category: 'features',
      description: 'Shared helpers for install guidance, platform detection and iOS PWA help lifecycle.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cineUi'],
    },
    error => safeWarn('Unable to register cine.features.help module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesHelp', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesHelp = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();
