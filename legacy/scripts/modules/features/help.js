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
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function fallbackWarn(message, error) {
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
    var scopes = [];
    var candidates = MODULE_BASE.collectCandidateScopes ? MODULE_BASE.collectCandidateScopes(GLOBAL_SCOPE) : [GLOBAL_SCOPE, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
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
    var scopes = collectCandidateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      try {
        var candidate = scope && scope.IOS_PWA_HELP_STORAGE_KEY;
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
    if (overrideNavigator && _typeof(overrideNavigator) === 'object') {
      return overrideNavigator;
    }
    var scopes = collectCandidateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      try {
        if (scope && _typeof(scope.navigator) === 'object') {
          return scope.navigator;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  function resolveWindow(overrideWindow) {
    if (overrideWindow && _typeof(overrideWindow) === 'object') {
      return overrideWindow;
    }
    var scopes = collectCandidateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope) continue;
      if (typeof scope.matchMedia === 'function') {
        return scope;
      }
      if (_typeof(scope.document) === 'object') {
        return scope;
      }
    }
    return null;
  }
  function resolveStorage(overrideStorage) {
    if (overrideStorage && _typeof(overrideStorage) === 'object') {
      return overrideStorage;
    }
    var scopes = collectCandidateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (scope && _typeof(scope.localStorage) === 'object') {
        return scope.localStorage;
      }
    }
    return null;
  }
  function isIosDevice(overrideNavigator) {
    var navigatorCandidate = resolveNavigator(overrideNavigator);
    if (!navigatorCandidate) {
      return false;
    }
    var ua = navigatorCandidate.userAgent || '';
    var platform = navigatorCandidate.platform || '';
    var hasTouch = typeof navigatorCandidate.maxTouchPoints === 'number' && navigatorCandidate.maxTouchPoints > 1;
    return /iphone|ipad|ipod/i.test(ua) || platform === 'MacIntel' && hasTouch;
  }
  function isAndroidDevice(overrideNavigator) {
    var navigatorCandidate = resolveNavigator(overrideNavigator);
    if (!navigatorCandidate) {
      return false;
    }
    var ua = navigatorCandidate.userAgent || '';
    var vendor = navigatorCandidate.vendor || '';
    return /android/i.test(ua) || /android/i.test(vendor);
  }
  function isStandaloneDisplayMode(overrideWindow, overrideNavigator) {
    var win = resolveWindow(overrideWindow);
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
    var navigatorCandidate = resolveNavigator(overrideNavigator) || win && win.navigator;
    if (navigatorCandidate && typeof navigatorCandidate.standalone === 'boolean') {
      return navigatorCandidate.standalone;
    }
    return false;
  }
  function hasDismissedIosPwaHelp(explicitKey, overrideStorage) {
    var storage = resolveStorage(overrideStorage);
    if (!storage || typeof storage.getItem !== 'function') {
      return false;
    }
    var storageKey = resolveIosPwaHelpStorageKey(explicitKey);
    try {
      return storage.getItem(storageKey) === '1';
    } catch (error) {
      safeWarn('Could not read iOS PWA help dismissal flag', error);
      return false;
    }
  }
  function markIosPwaHelpDismissed(explicitKey, overrideStorage) {
    var storage = resolveStorage(overrideStorage);
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }
    var storageKey = resolveIosPwaHelpStorageKey(explicitKey);
    try {
      storage.setItem(storageKey, '1');
    } catch (error) {
      safeWarn('Could not store iOS PWA help dismissal', error);
    }
  }
  function shouldShowIosPwaHelp(resolveDialog, explicitKey, overrideWindow, overrideNavigator, overrideStorage) {
    var dialog = typeof resolveDialog === 'function' ? resolveDialog() : resolveDialog || null;
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
  var moduleApi = Object.freeze({
    resolveIosPwaHelpStorageKey: resolveIosPwaHelpStorageKey,
    isIosDevice: isIosDevice,
    isAndroidDevice: isAndroidDevice,
    isStandaloneDisplayMode: isStandaloneDisplayMode,
    hasDismissedIosPwaHelp: hasDismissedIosPwaHelp,
    markIosPwaHelpDismissed: markIosPwaHelpDismissed,
    shouldShowIosPwaHelp: shouldShowIosPwaHelp
  });
  MODULE_BASE.registerOrQueueModule('cine.features.help', moduleApi, {
    category: 'features',
    description: 'Shared helpers for install guidance, platform detection and iOS PWA help lifecycle.',
    replace: true
  }, function (error) {
    return safeWarn('Unable to register cine.features.help module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesHelp', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesHelp = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();