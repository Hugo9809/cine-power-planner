(function () {
  const MODULE_ID = 'modules/core/runtime-scope-tools.js';
  const GLOBAL_KEY = 'cineCoreRuntimeModules';
  const HAS = Object.prototype.hasOwnProperty;

  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return null;
  }

  const globalScope = detectGlobalScope();

  function resolveNamespace() {
    if (typeof require === 'function') {
      const candidates = ['./runtime.js', '../runtime.js'];
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        try {
          const namespace = require(candidate);
          if (namespace && typeof namespace === 'object') {
            return namespace;
          }
        } catch (error) {
          void error;
        }
      }
    }

    if (
      globalScope &&
      typeof globalScope[GLOBAL_KEY] === 'object' &&
      globalScope[GLOBAL_KEY]
    ) {
      return globalScope[GLOBAL_KEY];
    }

    return null;
  }

  const namespace = resolveNamespace();

  function ensureGlobalTarget() {
    if (!globalScope) {
      return null;
    }

    const current = globalScope[GLOBAL_KEY];
    if (current && typeof current === 'object') {
      return current;
    }

    try {
      const created = {};
      globalScope[GLOBAL_KEY] = created;
      return created;
    } catch (error) {
      void error;
    }

    return null;
  }

  const existingExport =
    globalScope &&
    globalScope[GLOBAL_KEY] &&
    typeof globalScope[GLOBAL_KEY] === 'object' &&
    HAS.call(globalScope[GLOBAL_KEY], MODULE_ID)
      ? globalScope[GLOBAL_KEY][MODULE_ID]
      : undefined;

  const moduleExport =
    namespace && HAS.call(namespace, MODULE_ID)
      ? namespace[MODULE_ID]
      : existingExport;

  if (typeof module === 'object' && module && module.exports) {
    module.exports = moduleExport;
    return;
  }

  const target = ensureGlobalTarget();
  if (!target) {
    return;
  }

  if (typeof moduleExport !== 'undefined') {
    target[MODULE_ID] = moduleExport;
  }
})();
