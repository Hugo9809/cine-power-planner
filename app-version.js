(function exposeAppVersion(globalScope) {
  var version = '1.0.40';

  function safelyAssign(target, key, value) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return;
    }

    try {
      if (typeof target[key] === 'undefined') {
        target[key] = value;
        return;
      }
    } catch (assignError) {
      void assignError;
    }

    try {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: key === 'APP_VERSION' || key === 'CPP_APP_VERSION',
        writable: true,
        value: value,
      });
    } catch (defineError) {
      void defineError;
      try {
        target[key] = value;
      } catch (fallbackError) {
        void fallbackError;
      }
    }
  }

  safelyAssign(globalScope, 'APP_VERSION', version);
  safelyAssign(globalScope, 'CPP_APP_VERSION', version);

  if (typeof module === 'object' && module && typeof module.exports !== 'undefined') {
    var exportContainer = module.exports;

    if (!exportContainer || (typeof exportContainer !== 'object' && typeof exportContainer !== 'function')) {
      exportContainer = {};
    }

    exportContainer.APP_VERSION = version;
    exportContainer.CPP_APP_VERSION = version;
    exportContainer.default = version;
    exportContainer.version = version;

    try {
      exportContainer.toString = function toString() {
        return version;
      };
      exportContainer.valueOf = function valueOf() {
        return version;
      };
      if (typeof Symbol === 'function' && Symbol && typeof Symbol.toPrimitive === 'symbol') {
        Object.defineProperty(exportContainer, Symbol.toPrimitive, {
          configurable: true,
          value: function toPrimitive() {
            return version;
          },
        });
      }
    } catch (enhanceError) {
      void enhanceError;
    }

    module.exports = exportContainer;
  }

  return version;
})(
  (function resolveGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis) {
      return globalThis;
    }
    if (typeof self !== 'undefined' && self) {
      return self;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    if (typeof global !== 'undefined' && global) {
      return global;
    }
    return {};
  })());

