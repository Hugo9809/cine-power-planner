function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initializeConsoleHelpers() {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
  function ensureConsoleMethodsWritable(methods) {
    var scope = (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object' ? GLOBAL_SCOPE : null) || (typeof globalThis !== 'undefined' ? globalThis : null);
    if (!scope) {
      return null;
    }
    var baseConsole;
    var consoleDescriptor = null;
    try {
      baseConsole = scope.console;
      consoleDescriptor = Object.getOwnPropertyDescriptor(scope, 'console');
    } catch (consoleReadError) {
      baseConsole = typeof console !== 'undefined' ? console : null;
      void consoleReadError;
    }
    if (!baseConsole || _typeof(baseConsole) !== 'object') {
      return null;
    }
    var requestedMethods = [];
    if (Array.isArray(methods)) {
      requestedMethods = methods;
    } else if (typeof methods === 'string' && methods) {
      requestedMethods = [methods];
    } else {
      requestedMethods = ['warn', 'info'];
    }
    var unique = Object.create(null);
    for (var i = 0; i < requestedMethods.length; i += 1) {
      var methodName = requestedMethods[i];
      if (typeof methodName === 'string' && methodName) {
        unique[methodName] = true;
      }
    }
    var methodNames = Object.keys(unique);
    if (!methodNames.length) {
      return baseConsole;
    }
    var storage = Object.create(null);
    for (var _i = 0; _i < methodNames.length; _i += 1) {
      var _methodName = methodNames[_i];
      var value = baseConsole[_methodName];
      try {
        var descriptor = Object.getOwnPropertyDescriptor(baseConsole, _methodName);
        if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
          value = descriptor.value;
        }
      } catch (descriptorError) {
        void descriptorError;
      }
      if (typeof value === 'function') {
        try {
          storage[_methodName] = value.bind(baseConsole);
        } catch (bindError) {
          storage[_methodName] = value;
          void bindError;
        }
      } else {
        storage[_methodName] = value;
      }
    }
    var proxy = new Proxy(baseConsole, {
      get: function get(target, property, receiver) {
        if (Object.prototype.hasOwnProperty.call(storage, property)) {
          return storage[property];
        }
        return Reflect.get(target, property, receiver);
      },
      set: function set(target, property, value, receiver) {
        if (Object.prototype.hasOwnProperty.call(storage, property)) {
          storage[property] = value;
          return true;
        }
        try {
          Reflect.set(target, property, value, receiver);
          return true;
        } catch (setError) {
          void setError;
        }
        return false;
      },
      defineProperty: function defineProperty(target, property, descriptor) {
        if (Object.prototype.hasOwnProperty.call(storage, property)) {
          if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
            storage[property] = descriptor.value;
          }
          return true;
        }
        return Reflect.defineProperty(target, property, descriptor);
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, property) {
        if (Object.prototype.hasOwnProperty.call(storage, property)) {
          return {
            configurable: true,
            enumerable: true,
            writable: true,
            value: storage[property]
          };
        }
        return Reflect.getOwnPropertyDescriptor(target, property);
      },
      ownKeys: function ownKeys(target) {
        var keys = Reflect.ownKeys(target);
        for (var _i2 = 0; _i2 < methodNames.length; _i2 += 1) {
          if (keys.indexOf(methodNames[_i2]) === -1) {
            keys.push(methodNames[_i2]);
          }
        }
        return keys;
      }
    });
    try {
      Object.defineProperty(scope, 'console', {
        configurable: true,
        enumerable: consoleDescriptor ? consoleDescriptor.enumerable !== false : true,
        writable: true,
        value: proxy
      });
    } catch (defineError) {
      scope.console = proxy;
      void defineError;
    }
    return proxy;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      ensureConsoleMethodsWritable: ensureConsoleMethodsWritable
    };
  }
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      if (typeof GLOBAL_SCOPE.__cineEnsureConsoleMethodsWritable !== 'function') {
        GLOBAL_SCOPE.__cineEnsureConsoleMethodsWritable = ensureConsoleMethodsWritable;
      }
    } catch (exposeError) {
      void exposeError;
    }
  }
})();