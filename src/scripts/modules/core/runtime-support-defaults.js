(function () {
  function isScopeCandidate(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function getRuntimeScopeCandidates(primaryScope) {
    const candidates = [];

    if (isScopeCandidate(primaryScope)) {
      candidates.push(primaryScope);
    }

    if (typeof globalThis !== 'undefined') {
      candidates.push(globalThis);
    }

    if (typeof window !== 'undefined') {
      candidates.push(window);
    }

    if (typeof self !== 'undefined') {
      candidates.push(self);
    }

    if (typeof global !== 'undefined') {
      candidates.push(global);
    }

    const resolved = [];
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        let alreadyPresent = false;
        for (let compareIndex = 0; compareIndex < resolved.length; compareIndex += 1) {
          if (resolved[compareIndex] === candidate) {
            alreadyPresent = true;
            break;
          }
        }
        if (!alreadyPresent) {
          resolved.push(candidate);
        }
      }
    }

    return resolved;
  }

  function fallbackDetectRuntimeScope(primaryScope) {
    const candidates = getRuntimeScopeCandidates(primaryScope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        return candidate;
      }
    }

    return null;
  }

  function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }

    const runtimeScope = fallbackDetectRuntimeScope(primaryScope);

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

  function readRuntimeSupportResolver(primaryScope) {
    const runtimeScope = fallbackDetectRuntimeScope(primaryScope);

    function detectRuntimeScope(scopeCandidate) {
      return fallbackDetectRuntimeScope(
        isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope
      );
    }

    function resolveCoreSupportModule(namespaceName, requirePath, scopeCandidate) {
      const candidateScope = isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope;
      return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
    }

    return Object.freeze({
      detectRuntimeScope,
      resolveCoreSupportModule,
    });
  }

  const namespace = {
    fallbackDetectRuntimeScope,
    fallbackResolveCoreSupportModule,
    readRuntimeSupportResolver,
    getRuntimeScopeCandidates,
  };

  const namespaceName = 'cineCoreRuntimeSupportDefaults';
  const attachmentCandidates = getRuntimeScopeCandidates();

  for (let index = 0; index < attachmentCandidates.length; index += 1) {
    const scope = attachmentCandidates[index];
    if (!isScopeCandidate(scope)) {
      continue;
    }

    const existing =
      scope[namespaceName] && typeof scope[namespaceName] === 'object'
        ? scope[namespaceName]
        : {};

    for (const key of Object.keys(namespace)) {
      existing[key] = namespace[key];
    }

    try {
      scope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
