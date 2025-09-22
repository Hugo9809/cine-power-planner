// Version marker for tooling compatibility. Keep synchronized with the legacy build.
// var APP_VERSION = "1.0.5";

if (typeof require === 'function' && typeof module !== 'undefined' && module && module.exports) {
  var fs = require('fs');
  var path = require('path');
  var parts = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js'];
  var nodePrelude = [
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
  var sources = [nodePrelude];
  for (var i = 0; i < parts.length; i += 1) {
    sources.push(fs.readFileSync(path.join(__dirname, parts[i]), 'utf8'));
  }
  var combinedSource = sources.join('\n');
  var factory = new Function('exports', 'require', 'module', '__filename', '__dirname', combinedSource);
  factory(module.exports, require, module, __filename, __dirname);
}
