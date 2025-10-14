function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
if (typeof require === 'function' && typeof module !== 'undefined' && module && module.exports) {
  var fs = require('fs');
  var path = require('path');
  var vm = require('vm');
  var parts = ['modules/architecture-core.js', 'modules/architecture-helpers.js', 'modules/base.js', 'modules/registry.js', 'modules/context.js', 'modules/environment-bridge.js', 'modules/globals.js', 'modules/localization.js', 'modules/offline.js', 'modules/core-shared.js', 'modules/core/runtime-tools.js', 'modules/core/runtime-support-bootstrap.js', 'modules/core/runtime-state/scope-utils.js', 'modules/core/runtime-state/safe-freeze-registry.js', 'modules/core/runtime-state/temperature-keys.js', 'modules/core/runtime-state/local-runtime-state.js', 'modules/core/runtime-state.js', 'modules/core/localization-bridge.js', 'modules/core/pink-mode-animations-inline-assets.js', 'modules/core/pink-mode-support.js', 'modules/core/pink-mode-animations.js', 'modules/core/project-intelligence.js', 'modules/core/persistence-guard.js', 'modules/core/mount-voltage.js', 'modules/core/experience.js', 'modules/logging.js', 'modules/features/help.js', 'modules/features/contacts.js', 'modules/features/own-gear.js', 'modules/features/feature-search.js', 'modules/features/auto-gear-rules.js', 'modules/features/connection-diagram.js', 'modules/features/backup.js', 'modules/features/onboarding-tour.js', 'modules/help.js', 'modules/ui.js', 'modules/gear-list.js', 'modules/runtime-guard.js', 'modules/results.js', 'modules/app-core/pink-mode-support-bridge.js', 'modules/app-core/localization-support.js', 'app-core-runtime-scopes.js', 'app-core-runtime-support.js', 'app-core-text.js', 'app-core-new-1.js', 'app-core-enviroment.js', 'app-core-new-2.js', 'app-events.js', 'app-setups.js', 'app-session.js'];
  var nodePrelude = ["var __cineGlobal = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : this);", "var window = __cineGlobal.window || __cineGlobal;", "if (!__cineGlobal.window) __cineGlobal.window = window;", "var self = __cineGlobal.self || window;", "if (!__cineGlobal.self) __cineGlobal.self = self;", "var document = __cineGlobal.document || (window && window.document) || undefined;", "if (document && !window.document) window.document = document;", "if (!__cineGlobal.document && document) __cineGlobal.document = document;", "var navigator = __cineGlobal.navigator || (window && window.navigator) || undefined;", "if (navigator && !window.navigator) window.navigator = navigator;", "if (!__cineGlobal.navigator && navigator) __cineGlobal.navigator = navigator;", "var localStorage = __cineGlobal.localStorage || (window && window.localStorage) || undefined;", "if (localStorage && !window.localStorage) window.localStorage = localStorage;", "if (!__cineGlobal.localStorage && localStorage) __cineGlobal.localStorage = localStorage;", "var sessionStorage = __cineGlobal.sessionStorage || (window && window.sessionStorage) || undefined;", "if (sessionStorage && !window.sessionStorage) window.sessionStorage = sessionStorage;", "if (!__cineGlobal.sessionStorage && sessionStorage) __cineGlobal.sessionStorage = sessionStorage;", "var location = __cineGlobal.location || (window && window.location) || undefined;", "if (location && !window.location) window.location = location;", "if (!__cineGlobal.location && location) __cineGlobal.location = location;", "var caches = __cineGlobal.caches || (window && window.caches) || undefined;", "if (caches && !window.caches) window.caches = caches;", "if (!__cineGlobal.caches && caches) __cineGlobal.caches = caches;"].join('\n');
  var combinedSource = [nodePrelude].concat(_toConsumableArray(parts.map(function (part) {
    return fs.readFileSync(path.join(__dirname, part), 'utf8');
  }))).join('\n');
  var wrapperSource = '(function (exports, require, module, __filename, __dirname, globalScope) {\n' + 'with (globalScope) {\n' + combinedSource + '\n}\n})';
  var wrapper = vm.runInThisContext(wrapperSource, {
    filename: __filename
  });
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof global !== 'undefined' && global || this;
  wrapper.call(globalScope, module.exports, require, module, __filename, __dirname, globalScope);
  var ensureModule = function ensureModule(relativePath) {
    var resolvedPath = path.join(__dirname, relativePath);
    var moduleId = require.resolve(resolvedPath);
    if (require.cache[moduleId]) {
      delete require.cache[moduleId];
    }
    return require(resolvedPath);
  };
  ensureModule('modules/base.js');
  ensureModule('modules/registry.js');
  ensureModule('modules/context.js');
  ensureModule('modules/environment-bridge.js');
  ensureModule('modules/globals.js');
  ensureModule('modules/core/runtime-tools.js');
  ensureModule('modules/core/runtime-support-bootstrap.js');
  ensureModule('modules/core/localization-bridge.js');
  ensureModule('modules/runtime-guard.js');
  ensureModule('modules/results.js');
  ensureModule('modules/persistence.js');
  ensureModule('modules/runtime.js');
  var _runtimeGuardModule = null;
  try {
    _runtimeGuardModule = globalScope && globalScope.cineRuntimeGuard || require('./modules/runtime-guard.js');
  } catch (runtimeGuardLoadError) {
    void runtimeGuardLoadError;
    _runtimeGuardModule = globalScope && globalScope.cineRuntimeGuard ? globalScope.cineRuntimeGuard : null;
  }
  var _runtimeGuard = _runtimeGuardModule && typeof _runtimeGuardModule.resolveRuntimeGuard === 'function' ? _runtimeGuardModule.resolveRuntimeGuard(globalScope) : _runtimeGuardModule;
  if (_runtimeGuard && typeof _runtimeGuard.bootstrap === 'function') {
    _runtimeGuard.bootstrap(globalScope, {
      throwOnFailure: true,
      warnOnFailure: true
    });
  }
  var aggregatedExports = module.exports;
  var combinedAppVersion = aggregatedExports && aggregatedExports.APP_VERSION;
  var APP_VERSION = "1.0.23";
  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error("Combined app version (".concat(combinedAppVersion, ") does not match script marker (").concat(APP_VERSION, ")."));
  }
  if (aggregatedExports && !aggregatedExports.APP_VERSION) {
    aggregatedExports.APP_VERSION = APP_VERSION;
  }
}
var GLOBAL_RUNTIME_SCOPE = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
var runtimeGuardModule = null;
if (GLOBAL_RUNTIME_SCOPE && GLOBAL_RUNTIME_SCOPE.cineRuntimeGuard) {
  runtimeGuardModule = GLOBAL_RUNTIME_SCOPE.cineRuntimeGuard;
} else if (typeof require === 'function') {
  try {
    runtimeGuardModule = require('./modules/runtime-guard.js');
  } catch (runtimeGuardRequireError) {
    void runtimeGuardRequireError;
    runtimeGuardModule = null;
  }
}
var runtimeGuard = runtimeGuardModule && typeof runtimeGuardModule.resolveRuntimeGuard === 'function' ? runtimeGuardModule.resolveRuntimeGuard(GLOBAL_RUNTIME_SCOPE) : runtimeGuardModule;
if (runtimeGuard && typeof runtimeGuard.bootstrap === 'function') {
  try {
    runtimeGuard.bootstrap(GLOBAL_RUNTIME_SCOPE, {
      warnOnFailure: true,
      throwOnFailure: typeof require === 'function'
    });
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.error === 'function') {
      try {
        console.error('cineRuntimeGuard.bootstrap failed during startup.', error);
      } catch (consoleError) {
        void consoleError;
      }
    }
    if (typeof require === 'function') {
      throw error;
    }
  }
}