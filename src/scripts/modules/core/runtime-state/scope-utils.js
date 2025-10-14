(function () {
  var MODULE_ID = 'modules/core/runtime-state/scope-utils.js';
  var REGISTRY_NAME = 'cineCoreRuntimeModules';

  function resolveRuntimeModules() {
    if (typeof require === 'function') {
      try {
        return require('./runtime.js');
      } catch (requireError) {
        void requireError;
      }
    }

    var scope = getGlobalScope();

    if (scope && scope[REGISTRY_NAME] && typeof scope[REGISTRY_NAME] === 'object') {
      return scope[REGISTRY_NAME];
    }

    return null;
  }

  function getGlobalScope() {
    if (typeof globalThis === 'object' && globalThis) {
      return globalThis;
    }

    if (typeof window === 'object' && window) {
      return window;
    }

    if (typeof self === 'object' && self) {
      return self;
    }

    if (typeof global === 'object' && global) {
      return global;
    }

    return null;
  }

  function isObjectLike(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function clearNamespace(target) {
    if (!isObjectLike(target)) {
      return;
    }

    var names =
      typeof Object.getOwnPropertyNames === 'function'
        ? Object.getOwnPropertyNames(target)
        : null;

    if (names) {
      for (var index = 0; index < names.length; index += 1) {
        var name = names[index];
        try {
          delete target[name];
        } catch (deleteError) {
          void deleteError;
        }
      }
    } else {
      for (var key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          try {
            delete target[key];
          } catch (fallbackDeleteError) {
            void fallbackDeleteError;
          }
        }
      }
    }

    if (typeof Object.getOwnPropertySymbols === 'function') {
      var symbols = Object.getOwnPropertySymbols(target);
      for (var symbolIndex = 0; symbolIndex < symbols.length; symbolIndex += 1) {
        var symbol = symbols[symbolIndex];
        try {
          delete target[symbol];
        } catch (deleteSymbolError) {
          void deleteSymbolError;
        }
      }
    }
  }

  function copyNamespace(target, source) {
    if (!isObjectLike(target) || !isObjectLike(source)) {
      return target;
    }

    var define = typeof Object.defineProperty === 'function'
      ? Object.defineProperty
      : null;

    var names =
      typeof Object.getOwnPropertyNames === 'function'
        ? Object.getOwnPropertyNames(source)
        : null;

    if (names) {
      for (var index = 0; index < names.length; index += 1) {
        var name = names[index];
        var descriptor =
          typeof Object.getOwnPropertyDescriptor === 'function'
            ? Object.getOwnPropertyDescriptor(source, name)
            : null;

        if (descriptor && define) {
          try {
            define(target, name, descriptor);
            continue;
          } catch (defineError) {
            void defineError;
          }
        }

        target[name] = source[name];
      }
    } else {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    if (typeof Object.getOwnPropertySymbols === 'function') {
      var symbols = Object.getOwnPropertySymbols(source);
      for (var symbolIndex = 0; symbolIndex < symbols.length; symbolIndex += 1) {
        var symbol = symbols[symbolIndex];
        var symbolDescriptor =
          typeof Object.getOwnPropertyDescriptor === 'function'
            ? Object.getOwnPropertyDescriptor(source, symbol)
            : null;

        if (symbolDescriptor && define) {
          try {
            define(target, symbol, symbolDescriptor);
            continue;
          } catch (defineSymbolError) {
            void defineSymbolError;
          }
        }

        target[symbol] = source[symbol];
      }
    }

    return target;
  }

  function synchronizeNamespace(target, source) {
    if (target === source) {
      return target;
    }

    if (!isObjectLike(target)) {
      return isObjectLike(source) ? source : target;
    }

    if (!isObjectLike(source)) {
      clearNamespace(target);
      return target;
    }

    clearNamespace(target);
    return copyNamespace(target, source);
  }

  var runtimeModules = resolveRuntimeModules();
  var namespace =
    runtimeModules &&
    Object.prototype.hasOwnProperty.call(runtimeModules, MODULE_ID)
      ? runtimeModules[MODULE_ID]
      : null;

  var globalScope = getGlobalScope();
  var registry =
    globalScope && globalScope[REGISTRY_NAME] && typeof globalScope[REGISTRY_NAME] === 'object'
      ? globalScope[REGISTRY_NAME]
      : null;

  if (
    !isObjectLike(namespace) &&
    registry &&
    Object.prototype.hasOwnProperty.call(registry, MODULE_ID)
  ) {
    var registryNamespace = registry[MODULE_ID];
    if (isObjectLike(registryNamespace)) {
      namespace = registryNamespace;
    }
  }

  if (!isObjectLike(namespace)) {
    namespace = {};
  }

  function updateExports(nextNamespace) {
    namespace = nextNamespace;

    if (typeof module === 'object' && module && module.exports) {
      module.exports = nextNamespace;
    }
  }

  if (!registry && globalScope) {
    registry = {};
  }

  if (registry) {
    if (!Object.prototype.hasOwnProperty.call(registry, MODULE_ID)) {
      registry[MODULE_ID] = namespace;
    } else {
      var registryValue = registry[MODULE_ID];
      if (isObjectLike(registryValue) && registryValue !== namespace) {
        namespace = registryValue;
      }
    }

    var namespaceRef = namespace;

    function bridgeAssignment(value) {
      if (value === namespaceRef) {
        return;
      }

      if (isObjectLike(namespaceRef) && isObjectLike(value)) {
        namespaceRef = synchronizeNamespace(namespaceRef, value);
      } else {
        namespaceRef = value;
      }

      updateExports(namespaceRef);
    }

    try {
      Object.defineProperty(registry, MODULE_ID, {
        configurable: true,
        enumerable: true,
        get: function () {
          return namespaceRef;
        },
        set: function (value) {
          bridgeAssignment(value);
        },
      });
    } catch (defineError) {
      void defineError;
      registry[MODULE_ID] = namespaceRef;
    }

    if (globalScope && globalScope[REGISTRY_NAME] !== registry) {
      try {
        globalScope[REGISTRY_NAME] = registry;
      } catch (assignError) {
        void assignError;
      }
    }
  }

  updateExports(namespace);
})();
