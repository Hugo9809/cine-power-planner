// Establish placeholder CommonJS bindings for browsers that lack them.
//
// Safari's legacy WebKit builds can throw "Can't find variable" errors when
// encountering bare `require`, `module` or `exports` identifiers, even when
// they are only inspected via `typeof`. Declaring the bindings with `var`
// ensures a safe global variable is available while preserving any existing
// implementations provided by bundlers or polyfills.

/* eslint-disable no-var, no-unused-vars */

var require;
var module;
var exports;

(function ensureCommonJsPlaceholders() {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return;
  }

  // Keep the placeholders non-enumerable so that application code iterating
  // over global properties does not accidentally surface them.
  function ensureNonEnumerable(name) {
    if (!Object.prototype.hasOwnProperty.call(scope, name)) {
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: scope[name],
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

/* eslint-enable no-var, no-unused-vars */
