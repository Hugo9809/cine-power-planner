function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var require;
var module;
var exports;
(function ensureCommonJsPlaceholders() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return;
  }
  function ensureNonEnumerable(name) {
    if (!Object.prototype.hasOwnProperty.call(scope, name)) {
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: scope[name]
        });
      } catch (defineError) {
        void defineError;
      }
    }
  }
  ensureNonEnumerable('require');
  ensureNonEnumerable('module');
  ensureNonEnumerable('exports');
})();
