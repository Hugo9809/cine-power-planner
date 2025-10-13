/* global CORE_GLOBAL_SCOPE */

(function () {
  function isScopeCandidate(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function readCoreGlobalScope() {
    try {
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isScopeCandidate(CORE_GLOBAL_SCOPE)) {
        return CORE_GLOBAL_SCOPE;
      }
    } catch (coreGlobalScopeLookupError) {
      void coreGlobalScopeLookupError;
    }

    try {
      if (
        typeof globalThis !== 'undefined' &&
        isScopeCandidate(globalThis) &&
        isScopeCandidate(globalThis.CORE_GLOBAL_SCOPE)
      ) {
        return globalThis.CORE_GLOBAL_SCOPE;
      }
    } catch (globalThisLookupError) {
      void globalThisLookupError;
    }

    return null;
  }

  function getPrimaryScopeCandidate(explicitCandidate) {
    if (isScopeCandidate(explicitCandidate)) {
      return explicitCandidate;
    }

    const coreScope = readCoreGlobalScope();
    if (isScopeCandidate(coreScope)) {
      return coreScope;
    }

    return null;
  }

  function appendCandidate(target, candidate) {
    if (!isScopeCandidate(candidate)) {
      return;
    }

    for (let index = 0; index < target.length; index += 1) {
      if (target[index] === candidate) {
        return;
      }
    }

    target.push(candidate);
  }

  function readDefaultGlobalScopes() {
    const defaults = [];

    if (typeof globalThis !== 'undefined') {
      appendCandidate(defaults, globalThis);
    }

    if (typeof window !== 'undefined') {
      appendCandidate(defaults, window);
    }

    if (typeof self !== 'undefined') {
      appendCandidate(defaults, self);
    }

    if (typeof global !== 'undefined') {
      appendCandidate(defaults, global);
    }

    return defaults;
  }

  function getScopeCandidates(options) {
    const settings = options && typeof options === 'object' ? options : {};
    const {
      primaryCandidate,
      includeCoreGlobalScope = true,
      includeDefaultGlobals = true,
      extraCandidates = [],
    } = settings;

    const candidates = [];

    appendCandidate(
      candidates,
      typeof primaryCandidate === 'undefined'
        ? getPrimaryScopeCandidate()
        : primaryCandidate
    );

    if (includeCoreGlobalScope) {
      appendCandidate(candidates, readCoreGlobalScope());
    }

    if (includeDefaultGlobals) {
      const defaults = readDefaultGlobalScopes();
      for (let index = 0; index < defaults.length; index += 1) {
        appendCandidate(candidates, defaults[index]);
      }
    }

    const extras = Array.isArray(extraCandidates) ? extraCandidates : [extraCandidates];
    for (let index = 0; index < extras.length; index += 1) {
      appendCandidate(candidates, extras[index]);
    }

    return candidates;
  }

  function detectFirstAvailableScope(primaryCandidate, options) {
    const candidates = getScopeCandidates({
      primaryCandidate,
      includeCoreGlobalScope: true,
      includeDefaultGlobals: true,
      extraCandidates: options && options.extraCandidates,
    });

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        return candidate;
      }
    }

    return null;
  }

  function resolveAttachmentScope() {
    const candidates = getScopeCandidates({ includeDefaultGlobals: true });
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (isScopeCandidate(candidate)) {
        return candidate;
      }
    }

    return null;
  }

  const namespace = {
    isScopeCandidate,
    getPrimaryScopeCandidate,
    getScopeCandidates,
    detectFirstAvailableScope,
  };

  const attachmentScope = resolveAttachmentScope();
  const namespaceName = 'cineCoreRuntimeScopeTools';

  if (attachmentScope && typeof attachmentScope === 'object') {
    const existing =
      attachmentScope[namespaceName] && typeof attachmentScope[namespaceName] === 'object'
        ? attachmentScope[namespaceName]
        : {};

    for (const key of Object.keys(namespace)) {
      existing[key] = namespace[key];
    }

    try {
      attachmentScope[namespaceName] = existing;
    } catch (attachError) {
      void attachError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
