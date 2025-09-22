const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const ROOT_DIR = path.join(__dirname, '..', '..');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'src', 'scripts');
const SCRIPT_FILENAME = path.join(SCRIPTS_DIR, 'script.js');

const RUNTIME_PARTS = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js'];

const NODE_PRELUDE = [
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

const { version: APP_VERSION } = require(path.join(ROOT_DIR, 'package.json'));

let combinedSource;

function buildCombinedSource() {
  if (!combinedSource) {
    const partsSource = RUNTIME_PARTS
      .map(part => fs.readFileSync(path.join(SCRIPTS_DIR, part), 'utf8'))
      .join('\n');
    combinedSource = `${NODE_PRELUDE}\n${partsSource}`;
  }
  return combinedSource;
}

function loadRuntime() {
  const runtimeModule = { exports: {} };
  const runtimeRequire = createRequire(SCRIPT_FILENAME);

  const factory = new Function(
    'exports',
    'require',
    'module',
    '__filename',
    '__dirname',
    buildCombinedSource()
  );

  factory(runtimeModule.exports, runtimeRequire, runtimeModule, SCRIPT_FILENAME, SCRIPTS_DIR);

  const { exports } = runtimeModule;
  const combinedAppVersion = exports && exports.APP_VERSION;

  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error(
      `Combined app version (${combinedAppVersion}) does not match package version (${APP_VERSION}).`
    );
  }

  if (exports && !combinedAppVersion) {
    exports.APP_VERSION = APP_VERSION;
  }

  return exports;
}

module.exports = {
  loadRuntime,
};
