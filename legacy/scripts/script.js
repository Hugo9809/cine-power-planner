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
  var parts = ['modules/architecture-core.js', 'modules/architecture-helpers.js', 'modules/base.js', 'modules/registry.js', 'modules/context.js', 'modules/environment-bridge.js', 'modules/globals.js', 'modules/offline.js', 'modules/core-shared.js', 'modules/core/project-intelligence.js', 'modules/core/persistence-guard.js', 'modules/core/experience.js', 'modules/logging.js', 'modules/features/help.js', 'modules/features/feature-search.js', 'modules/features/auto-gear-rules.js', 'modules/features/connection-diagram.js', 'modules/features/backup.js', 'modules/help.js', 'modules/ui.js', 'modules/gear-list.js', 'modules/results.js', 'app-core-new-1.js', 'app-core-new-2.js', 'app-events.js', 'app-setups.js', 'app-session.js'];
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
  ensureModule('modules/results.js');
  ensureModule('modules/persistence.js');
  ensureModule('modules/runtime.js');
  attemptRegistryBackfill(globalScope);
  var aggregatedExports = module.exports;
  var combinedAppVersion = aggregatedExports && aggregatedExports.APP_VERSION;
  var APP_VERSION = "1.0.20";
  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error("Combined app version (".concat(combinedAppVersion, ") does not match script marker (").concat(APP_VERSION, ")."));
  }
  if (aggregatedExports && !aggregatedExports.APP_VERSION) {
    aggregatedExports.APP_VERSION = APP_VERSION;
  }
}
function attemptRegistryBackfill(scope) {
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return;
  }
  var registryCandidates = [];
  if (scope && _typeof(scope.cineModules) === 'object') {
    registryCandidates.push(scope.cineModules);
  }
  if (typeof require === 'function') {
    try {
      var required = require('./modules/registry.js');
      if (required && _typeof(required) === 'object') {
        registryCandidates.push(required);
      }
    } catch (error) {
      void error;
    }
  }
  var registries = [];
  var seen = new Set();
  for (var index = 0; index < registryCandidates.length; index += 1) {
    var candidate = registryCandidates[index];
    if (!candidate || typeof candidate.register !== 'function' || typeof candidate.has !== 'function') {
      continue;
    }
    if (seen.has(candidate)) {
      continue;
    }
    seen.add(candidate);
    registries.push(candidate);
  }
  if (registries.length === 0) {
    return;
  }
  var descriptors = [{
    name: 'cineModuleBase',
    category: 'infrastructure',
    description: 'Shared helpers for module registration, freezing, and safe global exposure.',
    resolve: function resolve() {
      return scope.cineModuleBase || null;
    }
  }, {
    name: 'cineModuleGlobals',
    category: 'infrastructure',
    description: 'Shared module globals for cross-script coordination.',
    resolve: function resolve() {
      return scope.cineModuleGlobals || null;
    }
  }, {
    name: 'cineCoreShared',
    category: 'shared',
    description: 'Shared helpers for deterministic stringification, weights, and version markers.',
    resolve: function resolve() {
      return scope.cineCoreShared || null;
    }
  }, {
    name: 'cinePersistence',
    category: 'persistence',
    description: 'Data integrity facade for storage, autosave, backups, restore, and share flows.',
    resolve: function resolve() {
      return scope.cinePersistence || null;
    }
  }, {
    name: 'cineOffline',
    category: 'offline',
    description: 'Offline helpers for service worker registration and cache recovery.',
    resolve: function resolve() {
      return scope.cineOffline || null;
    }
  }, {
    name: 'cineUi',
    category: 'ui',
    description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
    resolve: function resolve() {
      return scope.cineUi || null;
    }
  }, {
    name: 'cineFeaturePrint',
    category: 'feature',
    description: 'Print orchestration helpers for overview exports and fallback workflows.',
    resolve: function resolve() {
      return scope.cineFeaturePrint || null;
    }
  }, {
    name: 'cineCoreProject',
    category: 'domain',
    description: 'Project intelligence helpers for derived metadata, selectors, and calculations.',
    resolve: function resolve() {
      return scope.cineCoreProject || null;
    }
  }, {
    name: 'cineCoreGuard',
    category: 'safety',
    description: 'Persistence guards that preserve autosaves, presets, and backup state across workflows.',
    resolve: function resolve() {
      return scope.cineCoreGuard || null;
    }
  }, {
    name: 'cineCoreExperience',
    category: 'experience',
    description: 'Experience helpers for UI orchestration, feature discovery, and presentation.',
    resolve: function resolve() {
      return scope.cineCoreExperience || null;
    }
  }, {
    name: 'cineRuntime',
    category: 'runtime',
    description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
    resolve: function resolve() {
      return scope.cineRuntime || null;
    }
  }];
  for (var _index = 0; _index < descriptors.length; _index += 1) {
    var descriptor = descriptors[_index];
    var moduleValue = null;
    try {
      moduleValue = descriptor.resolve();
    } catch (error) {
      void error;
      moduleValue = null;
    }
    if (!moduleValue) {
      continue;
    }
    for (var registryIndex = 0; registryIndex < registries.length; registryIndex += 1) {
      var registry = registries[registryIndex];
      try {
        if (registry.has(descriptor.name)) {
          continue;
        }
        registry.register(descriptor.name, moduleValue, {
          category: descriptor.category,
          description: descriptor.description,
          replace: true
        });
      } catch (error) {
        void error;
      }
    }
  }
}
var GLOBAL_RUNTIME_SCOPE = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
attemptRegistryBackfill(GLOBAL_RUNTIME_SCOPE);
(function ensureRuntimeIntegrity(scope) {
  if (!scope) {
    return;
  }
  function safeError(message, detail) {
    if (typeof console === 'undefined' || typeof console.error !== 'function') {
      return;
    }
    try {
      if (typeof detail === 'undefined') {
        console.error(message);
      } else {
        console.error(message, detail);
      }
    } catch (loggingError) {
      void loggingError;
    }
  }
  function attachIntegrity(result) {
    try {
      Object.defineProperty(scope, '__cineRuntimeIntegrity', {
        configurable: true,
        enumerable: false,
        value: result,
        writable: false
      });
    } catch (error) {
      void error;
      scope.__cineRuntimeIntegrity = result;
    }
  }
  var runtime = null;
  try {
    runtime = scope.cineRuntime;
  } catch (runtimeError) {
    void runtimeError;
    runtime = null;
  }
  if (!runtime && typeof require === 'function') {
    try {
      runtime = require('./modules/runtime.js');
    } catch (requireError) {
      void requireError;
      runtime = null;
    }
  }
  if (!runtime || typeof runtime.verifyCriticalFlows !== 'function') {
    return;
  }
  var result;
  try {
    result = runtime.verifyCriticalFlows({
      warnOnFailure: true
    });
  } catch (verificationError) {
    attachIntegrity(Object.freeze({
      ok: false,
      error: verificationError
    }));
    safeError('cineRuntime.verifyCriticalFlows() threw during startup.', verificationError);
    if (typeof require === 'function') {
      throw verificationError;
    }
    return;
  }
  if (result && _typeof(result) === 'object') {
    attachIntegrity(result);
  } else {
    attachIntegrity(Object.freeze({
      ok: false
    }));
  }
  if (!result || result.ok !== true) {
    var integrityError = new Error('cineRuntime integrity verification failed during startup.');
    integrityError.details = result || null;
    safeError(integrityError.message, integrityError);
    if (typeof require === 'function') {
      throw integrityError;
    }
  }
})(GLOBAL_RUNTIME_SCOPE);