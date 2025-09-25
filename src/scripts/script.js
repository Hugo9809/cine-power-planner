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
  const parts = ['connector-summary.js', 'app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js'];
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

  const aggregatedExports = module.exports;
  const combinedAppVersion = aggregatedExports && aggregatedExports.APP_VERSION;
  const APP_VERSION = "1.0.9"; // Version marker for consistency checks

  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error(
      `Combined app version (${combinedAppVersion}) does not match script marker (${APP_VERSION}).`
    );
  }

  if (aggregatedExports && !aggregatedExports.APP_VERSION) {
    aggregatedExports.APP_VERSION = APP_VERSION;
  }
}
