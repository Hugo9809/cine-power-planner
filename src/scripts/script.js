// script.js – Aggregates the Cine Power Planner runtime pieces
//
// The main implementation has been split into dedicated modules to improve
// maintainability. The loader ensures these modules are loaded in the browser
// before this file executes. When running under Node.js (for tests) we execute
// the individual modules as a single block within this file's module scope so
// hoisting and repeated requires behave like the original monolithic script.

if (typeof require === 'function' && typeof module !== 'undefined' && module && module.exports) {
  const fs = require('fs');
  const path = require('path');
  const vm = require('vm');
  const parts = [
    'modules/architecture-core.js',
    'modules/architecture-helpers.js',
    'modules/base.js',
    'modules/registry.js',
    'modules/context.js',
    'modules/environment-bridge.js',
    'modules/globals.js',
    'modules/localization.js',
    'modules/offline.js',
    'modules/core-shared.js',
    'modules/core/runtime.js',
    'modules/core/localization.js',
    'modules/core/pink-mode.js',
    'modules/core/project-intelligence.js',
    'modules/core/persistence-guard.js',
    'modules/core/mount-voltage.js',
    'modules/core/experience.js',
    'modules/logging.js',
    'modules/features/help.js',
    'modules/features/contacts.js',
    'modules/features/own-gear.js',
    'modules/features/feature-search.js',
    'modules/features/auto-gear-rules.js',
    'modules/features/connection-diagram.js',
    'modules/features/backup.js',
    'modules/features/onboarding-tour.js',
    'modules/help.js',
    'modules/ui.js',
    'modules/gear-list.js',
    'modules/runtime-guard.js',
    'modules/results.js',
    'modules/app-core/bootstrap-fallbacks.js',
    'modules/app-core/pink-mode.js',
    'modules/app-core/localization.js',
    'app-core-runtime-scopes.js',
    'app-core-runtime-support.js',
    'app-core-text.js',
    'app-core-enviroment.js',
    'app-core-new-1.js',
    'app-core-new-2.js',
    'app-events.js',
    'app-setups.js',
    'app-session.js'
  ];
  const nodePrelude = [
    "var __cineGlobal = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : this);",
    "var window = __cineGlobal.window || __cineGlobal;",
    "if (!__cineGlobal.window) __cineGlobal.window = window;",
    "var self = __cineGlobal.self || window;",
    "if (!__cineGlobal.self) __cineGlobal.self = self;",
    "var document = __cineGlobal.document || (window && window.document) || undefined;",
    "if (document && !window.document) window.document = document;",
    "if (!__cineGlobal.document && document) __cineGlobal.document = document;",
    "var navigator = __cineGlobal.navigator || (window && window.navigator) || undefined;",
    "if (navigator && !window.navigator) window.navigator = navigator;",
    "if (!__cineGlobal.navigator && navigator) __cineGlobal.navigator = navigator;",
    "var localStorage = __cineGlobal.localStorage || (window && window.localStorage) || undefined;",
    "if (localStorage && !window.localStorage) window.localStorage = localStorage;",
    "if (!__cineGlobal.localStorage && localStorage) __cineGlobal.localStorage = localStorage;",
    "var sessionStorage = __cineGlobal.sessionStorage || (window && window.sessionStorage) || undefined;",
    "if (sessionStorage && !window.sessionStorage) window.sessionStorage = sessionStorage;",
    "if (!__cineGlobal.sessionStorage && sessionStorage) __cineGlobal.sessionStorage = sessionStorage;",
    "var location = __cineGlobal.location || (window && window.location) || undefined;",
    "if (location && !window.location) window.location = location;",
    "if (!__cineGlobal.location && location) __cineGlobal.location = location;",
    "var caches = __cineGlobal.caches || (window && window.caches) || undefined;",
    "if (caches && !window.caches) window.caches = caches;",
    "if (!__cineGlobal.caches && caches) __cineGlobal.caches = caches;"
  ].join('\n');

  const combinedSource = [
    nodePrelude,
    ...parts.map(part => fs.readFileSync(path.join(__dirname, part), 'utf8'))
  ].join('\n');

  const wrapperSource =
    '(function (exports, require, module, __filename, __dirname, globalScope) {\n' +
    'with (globalScope) {\n' +
    combinedSource +
    '\n}\n})';
  const wrapper = vm.runInThisContext(wrapperSource, { filename: __filename });
  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis)
      || (typeof global !== 'undefined' && global)
      || this;
  wrapper.call(globalScope, module.exports, require, module, __filename, __dirname, globalScope);

  const ensureModule = relativePath => {
    const resolvedPath = path.join(__dirname, relativePath);
    const moduleId = require.resolve(resolvedPath);
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

  let runtimeGuardModule = null;
  try {
    runtimeGuardModule =
      (globalScope && globalScope.cineRuntimeGuard)
      || require('./modules/runtime-guard.js');
  } catch (runtimeGuardLoadError) {
    void runtimeGuardLoadError;
    runtimeGuardModule = globalScope && globalScope.cineRuntimeGuard ? globalScope.cineRuntimeGuard : null;
  }

  const runtimeGuard =
    runtimeGuardModule && typeof runtimeGuardModule.resolveRuntimeGuard === 'function'
      ? runtimeGuardModule.resolveRuntimeGuard(globalScope)
      : runtimeGuardModule;

  if (runtimeGuard && typeof runtimeGuard.bootstrap === 'function') {
    runtimeGuard.bootstrap(globalScope, { throwOnFailure: true, warnOnFailure: true });
  }

  const aggregatedExports = module.exports;
  const combinedAppVersion = aggregatedExports && aggregatedExports.APP_VERSION;

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

  function resolveAppVersion() {
    const scope = resolveGlobalScope();
    if (scope && typeof scope.CPP_APP_VERSION === 'string' && scope.CPP_APP_VERSION) {
      return scope.CPP_APP_VERSION;
    }

    if (scope && typeof scope.APP_VERSION === 'string' && scope.APP_VERSION) {
      return scope.APP_VERSION;
    }

    if (typeof require === 'function') {
      try {
        const moduleCandidate = require('../../app-version.js');
        const resolvedCandidate = extractAppVersion(moduleCandidate);
        if (resolvedCandidate) {
          return resolvedCandidate;
        }
      } catch (appVersionError) {
        void appVersionError;
      }
    }

    return null;
  }

  const moduleAppVersion = resolveAppVersion();
  const APP_VERSION =
    (moduleAppVersion && typeof moduleAppVersion === 'string' && moduleAppVersion)
      || (combinedAppVersion && typeof combinedAppVersion === 'string' && combinedAppVersion)
      || '0.0.0';

  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error(
      `Combined app version (${combinedAppVersion}) does not match script marker (${APP_VERSION}).`
    );
  }

  if (aggregatedExports) {
    if (moduleAppVersion && typeof moduleAppVersion === 'string') {
      aggregatedExports.APP_VERSION = moduleAppVersion;
    } else if (!aggregatedExports.APP_VERSION) {
      aggregatedExports.APP_VERSION = APP_VERSION;
    }
  }
}

const GLOBAL_RUNTIME_SCOPE =
  (typeof globalThis !== 'undefined' && globalThis)
  || (typeof window !== 'undefined' && window)
  || (typeof self !== 'undefined' && self)
  || (typeof global !== 'undefined' && global)
  || null;

let runtimeGuardModule = null;

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

const runtimeGuard =
  runtimeGuardModule && typeof runtimeGuardModule.resolveRuntimeGuard === 'function'
    ? runtimeGuardModule.resolveRuntimeGuard(GLOBAL_RUNTIME_SCOPE)
    : runtimeGuardModule;

if (runtimeGuard && typeof runtimeGuard.bootstrap === 'function') {
  try {
    runtimeGuard.bootstrap(GLOBAL_RUNTIME_SCOPE, {
      warnOnFailure: true,
      throwOnFailure: typeof require === 'function',
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
