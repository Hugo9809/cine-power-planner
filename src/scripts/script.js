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
    'modules/runtime-environment-helpers.js',
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
    'modules/device-normalization.js',
    'modules/features/help.js',
    'modules/features/help-content.js',
    'modules/features/contacts.js',
    'modules/features/own-gear.js',
    'modules/features/feature-search.js',
    'modules/features/feature-search-engine.js',
    'modules/features/auto-gear-rules.js',
    'modules/features/connection-diagram.js',
    'modules/features/backup.js',
    'modules/features/onboarding-loader-hook.js',
    'modules/features/onboarding-tour.js',
    'modules/features/print-workflow.js',
    'modules/help.js',
    'modules/ui.js',
    'modules/gear-list.js',
    'modules/runtime-guard.js',
    'modules/results.js',
    'modules/app-core/bootstrap.js',
    'modules/app-core/pink-mode.js',
    'modules/app-core/localization.js',
    'app-core-runtime-scopes.js',
    'app-core-runtime-support.js',
    'app-core-runtime-helpers.js',
    'app-core-text.js',
    'app-core-environment.js',
    'app-core-bootstrap.js',
    'app-core-runtime-shared.js',
    'app-core-pink-mode.js',
    'app-core-runtime-candidate-scopes.js',
    'app-core-runtime-global-tools.js',
    'app-core-runtime-ui.js',
    'auto-gear/normalizers.js',
    'auto-gear/storage.js',
    'auto-gear/ui.js',
    'app-core-auto-gear-ui.js',
    'app-core-new-1.js',
    'app-core-localization-accessors.js',
    'app-core-new-2.js',
    'modules/settings-and-appearance.js',
    'app-events.js',
    'app-setups.js',
    'app-session.js'
  ];
  let appVersion = '0.0.0';
  try {
    const pkgPath = path.resolve(__dirname, '../../package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg && pkg.version) {
        appVersion = pkg.version;
      }
    }
  } catch (error) {
    void error;
    // console.warn('Unable to read package.json version', error);
  }

  const nodePrelude = [
    `var APP_VERSION = '${appVersion}';`,
    `var CPP_APP_VERSION = '${appVersion}';`,
    `if (typeof globalThis !== 'undefined') { globalThis.APP_VERSION = '${appVersion}'; globalThis.CPP_APP_VERSION = '${appVersion}'; }`,
    `if (typeof window !== 'undefined') { window.APP_VERSION = '${appVersion}'; window.CPP_APP_VERSION = '${appVersion}'; }`,
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
  console.log('script.js: Executing wrapper with', parts.length, 'parts');
  console.log('script.js: app-session.js index:', parts.indexOf('app-session.js'));
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

  function assignProperty(target, key, value, options) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

    try {
      if (target[key] === value) {
        return true;
      }
    } catch (readError) {
      void readError;
    }

    const enumerableOption = options && typeof options.enumerable === 'boolean'
      ? options.enumerable
      : false;

    try {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: enumerableOption,
        writable: true,
        value,
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
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }

    let existing = null;
    try {
      existing = scope[key];
    } catch (readError) {
      void readError;
      existing = null;
    }

    if (existing && (typeof existing === 'object' || typeof existing === 'function')) {
      return existing;
    }

    const created = {};
    const assigned = assignProperty(scope, key, created, { enumerable: false });
    if (assigned) {
      try {
        const resolved = scope[key];
        if (resolved && (typeof resolved === 'object' || typeof resolved === 'function')) {
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

    const scope = resolveGlobalScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    assignProperty(scope, 'APP_VERSION', version, { enumerable: true });
    assignProperty(scope, 'CPP_APP_VERSION', version, { enumerable: true });

    const namespace = ensureNamespace(scope, 'cinePowerPlanner');
    if (namespace) {
      assignProperty(namespace, 'APP_VERSION', version, { enumerable: true });
      assignProperty(namespace, 'CPP_APP_VERSION', version, { enumerable: true });
      assignProperty(namespace, 'version', version, { enumerable: true });
    }
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
