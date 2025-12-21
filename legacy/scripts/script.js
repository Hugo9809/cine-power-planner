function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var parts = ['modules/architecture-core.js', 'modules/architecture-helpers.js', 'modules/base.js', 'modules/registry.js', 'modules/context.js', 'modules/environment-bridge.js', 'modules/runtime-environment-helpers.js', 'modules/globals.js', 'modules/localization.js', 'modules/offline.js', 'modules/core-shared.js', 'modules/core/runtime.js', 'modules/core/localization.js', 'modules/core/pink-mode.js', 'modules/core/project-intelligence.js', 'modules/core/persistence-guard.js', 'modules/core/mount-voltage.js', 'modules/core/experience.js', 'modules/logging.js', 'modules/device-normalization.js', 'modules/features/help.js', 'modules/features/help-content.js', 'modules/features/contacts.js', 'modules/features/own-gear.js', 'modules/features/feature-search.js', 'modules/features/feature-search-engine.js', 'modules/features/auto-gear-rules.js', 'modules/features/connection-diagram.js', 'modules/features/backup.js', 'modules/features/onboarding-loader-hook.js', 'modules/features/onboarding-tour.js', 'modules/features/print-workflow.js', 'modules/help.js', 'modules/ui.js', 'modules/gear-list.js', 'modules/runtime-guard.js', 'modules/results.js', 'modules/app-core/bootstrap.js', 'modules/app-core/pink-mode.js', 'modules/app-core/localization.js', 'app-core-runtime-scopes.js', 'app-core-runtime-support.js', 'app-core-runtime-helpers.js', 'app-core-text.js', 'app-core-environment.js', 'app-core-bootstrap.js', 'app-core-runtime-shared.js', 'app-core-pink-mode.js', 'app-core-runtime-candidate-scopes.js', 'app-core-runtime-global-tools.js', 'app-core-runtime-ui.js', 'auto-gear/normalizers.js', 'auto-gear/storage.js', 'auto-gear/ui.js', 'app-core-auto-gear-ui.js', 'app-core-new-1.js', 'app-core-localization-accessors.js', 'app-core-new-2.js', 'app-events.js', 'app-setups.js', 'app-session.js'];
  var appVersion = '0.0.0';
  try {
    var pkgPath = path.resolve(__dirname, '../../package.json');
    if (fs.existsSync(pkgPath)) {
      var pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg && pkg.version) {
        appVersion = pkg.version;
      }
    }
  } catch (error) {
    void error;
  }
  var nodePrelude = ["var APP_VERSION = '".concat(appVersion, "';"), "var CPP_APP_VERSION = '".concat(appVersion, "';"), "if (typeof globalThis !== 'undefined') { globalThis.APP_VERSION = '".concat(appVersion, "'; globalThis.CPP_APP_VERSION = '").concat(appVersion, "'; }"), "if (typeof window !== 'undefined') { window.APP_VERSION = '".concat(appVersion, "'; window.CPP_APP_VERSION = '").concat(appVersion, "'; }"), "var __cineGlobal = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : this);", "var window = __cineGlobal.window || __cineGlobal;", "if (!__cineGlobal.window) __cineGlobal.window = window;", "var self = __cineGlobal.self || window;", "if (!__cineGlobal.self) __cineGlobal.self = self;", "var document = __cineGlobal.document || (window && window.document) || undefined;", "if (document && !window.document) window.document = document;", "if (!__cineGlobal.document && document) __cineGlobal.document = document;", "var navigator = __cineGlobal.navigator || (window && window.navigator) || undefined;", "if (navigator && !window.navigator) window.navigator = navigator;", "if (!__cineGlobal.navigator && navigator) __cineGlobal.navigator = navigator;", "var localStorage = __cineGlobal.localStorage || (window && window.localStorage) || undefined;", "if (localStorage && !window.localStorage) window.localStorage = localStorage;", "if (!__cineGlobal.localStorage && localStorage) __cineGlobal.localStorage = localStorage;", "var sessionStorage = __cineGlobal.sessionStorage || (window && window.sessionStorage) || undefined;", "if (sessionStorage && !window.sessionStorage) window.sessionStorage = sessionStorage;", "if (!__cineGlobal.sessionStorage && sessionStorage) __cineGlobal.sessionStorage = sessionStorage;", "var location = __cineGlobal.location || (window && window.location) || undefined;", "if (location && !window.location) window.location = location;", "if (!__cineGlobal.location && location) __cineGlobal.location = location;", "var caches = __cineGlobal.caches || (window && window.caches) || undefined;", "if (caches && !window.caches) window.caches = caches;", "if (!__cineGlobal.caches && caches) __cineGlobal.caches = caches;"].join('\n');
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
  ensureModule('modules/core/runtime.js');
  ensureModule('modules/core/localization.js');
  ensureModule('modules/core/pink-mode.js');
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
  function resolveGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    if (typeof self !== 'undefined' && self) {
      return self;
    }
    if (typeof global !== 'undefined' && global) {
      return global;
    }
    return null;
  }
  function extractAppVersion(candidate) {
    if (!candidate) {
      return null;
    }
    if (typeof candidate === 'string') {
      return candidate;
    }
    if (typeof candidate.APP_VERSION === 'string') {
      return candidate.APP_VERSION;
    }
    if (typeof candidate.default === 'string') {
      return candidate.default;
    }
    if (typeof candidate.version === 'string') {
      return candidate.version;
    }
    return null;
  }
  function assignProperty(target, key, value, options) {
    if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
      return false;
    }
    try {
      if (target[key] === value) {
        return true;
      }
    } catch (readError) {
      void readError;
    }
    var enumerableOption = options && typeof options.enumerable === 'boolean' ? options.enumerable : false;
    try {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: enumerableOption,
        writable: true,
        value: value
      });
      return true;
    } catch (defineError) {
      void defineError;
      try {
        target[key] = value;
        return true;
      } catch (assignError) {
        void assignError;
      }
    }
    return false;
  }
  function ensureNamespace(scope, key) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    var existing = null;
    try {
      existing = scope[key];
    } catch (readError) {
      void readError;
      existing = null;
    }
    if (existing && (_typeof(existing) === 'object' || typeof existing === 'function')) {
      return existing;
    }
    var created = {};
    var assigned = assignProperty(scope, key, created, {
      enumerable: false
    });
    if (assigned) {
      try {
        var resolved = scope[key];
        if (resolved && (_typeof(resolved) === 'object' || typeof resolved === 'function')) {
          return resolved;
        }
      } catch (assignmentCheckError) {
        void assignmentCheckError;
      }
      return created;
    }
    return null;
  }
  function exposeVersionGlobally(version) {
    if (typeof version !== 'string' || !version) {
      return;
    }
    var scope = resolveGlobalScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    assignProperty(scope, 'APP_VERSION', version, {
      enumerable: true
    });
    assignProperty(scope, 'CPP_APP_VERSION', version, {
      enumerable: true
    });
    var namespace = ensureNamespace(scope, 'cinePowerPlanner');
    if (namespace) {
      assignProperty(namespace, 'APP_VERSION', version, {
        enumerable: true
      });
      assignProperty(namespace, 'CPP_APP_VERSION', version, {
        enumerable: true
      });
      assignProperty(namespace, 'version', version, {
        enumerable: true
      });
    }
  }
  function resolveAppVersion() {
    var scope = resolveGlobalScope();
    if (scope && typeof scope.CPP_APP_VERSION === 'string' && scope.CPP_APP_VERSION) {
      return scope.CPP_APP_VERSION;
    }
    if (scope && typeof scope.APP_VERSION === 'string' && scope.APP_VERSION) {
      return scope.APP_VERSION;
    }
    if (typeof require === 'function') {
      try {
        var moduleCandidate = require('../../app-version.js');
        var resolvedCandidate = extractAppVersion(moduleCandidate);
        if (resolvedCandidate) {
          return resolvedCandidate;
        }
      } catch (appVersionError) {
        void appVersionError;
      }
    }
    return null;
  }
  var moduleAppVersion = resolveAppVersion();
  var APP_VERSION = moduleAppVersion && typeof moduleAppVersion === 'string' && moduleAppVersion || combinedAppVersion && typeof combinedAppVersion === 'string' && combinedAppVersion || '0.0.0';
  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error("Combined app version (".concat(combinedAppVersion, ") does not match script marker (").concat(APP_VERSION, ")."));
  }
  exposeVersionGlobally(APP_VERSION);
  if (aggregatedExports) {
    if (moduleAppVersion && typeof moduleAppVersion === 'string') {
      aggregatedExports.APP_VERSION = moduleAppVersion;
      if (!aggregatedExports.CPP_APP_VERSION) {
        aggregatedExports.CPP_APP_VERSION = moduleAppVersion;
      }
    } else {
      if (!aggregatedExports.APP_VERSION) {
        aggregatedExports.APP_VERSION = APP_VERSION;
      }
      if (!aggregatedExports.CPP_APP_VERSION) {
        aggregatedExports.CPP_APP_VERSION = APP_VERSION;
      }
    }
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