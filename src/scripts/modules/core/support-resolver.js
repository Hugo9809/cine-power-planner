(function () {
  function detectRuntimeScope(primaryScope) {
    const candidates = [];

    if (
      primaryScope &&
      (typeof primaryScope === 'object' || typeof primaryScope === 'function')
    ) {
      candidates.push(primaryScope);
    }

    if (typeof globalThis !== 'undefined' && typeof globalThis === 'object') {
      candidates.push(globalThis);
    }

    if (typeof window !== 'undefined' && typeof window === 'object') {
      candidates.push(window);
    }

    if (typeof self !== 'undefined' && typeof self === 'object') {
      candidates.push(self);
    }

    if (typeof global !== 'undefined' && typeof global === 'object') {
      candidates.push(global);
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
        continue;
      }

      return candidate;
    }

    return null;
  }

  function resolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }

    const runtimeScope = detectRuntimeScope(primaryScope);

    if (
      runtimeScope &&
      runtimeScope[namespaceName] &&
      typeof runtimeScope[namespaceName] === 'object'
    ) {
      return runtimeScope[namespaceName];
    }

    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        const required = require(requirePath);
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (supportModuleError) {
        void supportModuleError;
      }
    }

    return null;
  }

  const namespace = {
    detectRuntimeScope,
    resolveCoreSupportModule,
  };

  const globalScope = detectRuntimeScope();
  const targetName = 'cineCoreSupportResolver';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  const target = existing;
  for (const key of Object.keys(namespace)) {
    target[key] = namespace[key];
  }

  if (globalScope && typeof globalScope === 'object') {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = target;
  }
})();
