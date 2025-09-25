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
  var parts = [
    'app-core-new-1.js',
    'app-core-new-2.js',
    'app-events.js',
    'app-setups.js',
    'app-session.js'
  ];
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
  var aggregatedExports = module.exports;
  var combinedAppVersion = aggregatedExports && aggregatedExports.APP_VERSION;
  var APP_VERSION = "1.0.9";
  if (combinedAppVersion && combinedAppVersion !== APP_VERSION) {
    throw new Error("Combined app version (".concat(combinedAppVersion, ") does not match script marker (").concat(APP_VERSION, ")."));
  }
  if (aggregatedExports && !aggregatedExports.APP_VERSION) {
    aggregatedExports.APP_VERSION = APP_VERSION;
  }
}