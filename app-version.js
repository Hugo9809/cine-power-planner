(function exposeAppVersion(globalScope) {
  var version = '1.0.25';

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
        enumerable: key === 'APP_VERSION',
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
    module.exports = version;
    module.exports.APP_VERSION = version;
    module.exports.default = version;
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

