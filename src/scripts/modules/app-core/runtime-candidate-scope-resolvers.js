/*
 * Provides light-weight wrappers that coordinate the runtime candidate scope
 * helpers. Moving this coordination logic out of the app core keeps the
 * orchestrating bundle smaller while retaining the protective fallbacks that
 * guard offline usage, autosave and restoration flows.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
  }

  function tryCollectWithSupport(support, primaryScope) {
    if (!isObject(support)) {
      return null;
    }

    if (typeof support.collectCandidateScopes !== 'function') {
      return null;
    }

    try {
      const collected = support.collectCandidateScopes(primaryScope);
      return Array.isArray(collected) ? collected : null;
    } catch (collectError) {
      void collectError;
    }

    return null;
  }

  function tryEnsureWithSupport(support, options) {
    if (!isObject(support)) {
      return null;
    }

    if (typeof support.ensureCandidateScopes !== 'function') {
      return null;
    }

    try {
      const ensured = support.ensureCandidateScopes(options);
      return Array.isArray(ensured) ? ensured : null;
    } catch (ensureError) {
      void ensureError;
    }

    return null;
  }

  function createRuntimeCandidateScopeResolvers(options) {
    const runtimeSupport =
      options && options.runtimeCandidateScopeSupport
        ? options.runtimeCandidateScopeSupport
        : null;
    const fallbackSupport =
      options && options.fallbackRuntimeCandidateScopeSupport
        ? options.fallbackRuntimeCandidateScopeSupport
        : null;

    function inlineCollectCoreRuntimeCandidateScopes(primaryScope) {
      const collected = tryCollectWithSupport(runtimeSupport, primaryScope);
      if (collected) {
        return collected;
      }

      const fallbackCollected = tryCollectWithSupport(fallbackSupport, primaryScope);
      if (fallbackCollected) {
        return fallbackCollected;
      }

      return [];
    }

    function inlineEnsureCoreRuntimeCandidateScopes(ensureOptions) {
      const options = ensureOptions && typeof ensureOptions === 'object' ? ensureOptions : {};

      const ensured = tryEnsureWithSupport(runtimeSupport, options);
      if (ensured && ensured.length) {
        return ensured;
      }

      const fallbackEnsured = tryEnsureWithSupport(fallbackSupport, options);
      if (fallbackEnsured && fallbackEnsured.length) {
        return fallbackEnsured;
      }

      return inlineCollectCoreRuntimeCandidateScopes(options.primaryScope);
    }

    return {
      collectCoreRuntimeCandidateScopes: inlineCollectCoreRuntimeCandidateScopes,
      ensureCoreRuntimeCandidateScopes: inlineEnsureCoreRuntimeCandidateScopes,
    };
  }

  const namespace = {
    createRuntimeCandidateScopeResolvers,
  };

  const namespaceName = 'cineCoreAppRuntimeCandidateScopeResolvers';
  const scope = detectScope();
  const existing =
    isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};

  Object.assign(existing, namespace);

  if (isObject(scope)) {
    try {
      scope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
