(function () {
  function detectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }

    return null;
  }

  function registerCandidateScope(scopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }

    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    for (let index = 0; index < scopes.length; index += 1) {
      if (scopes[index] === scope) {
        return;
      }
    }

    scopes.push(scope);
  }

  function collectCandidateScopes(primaryScope, environmentHelpers) {
    const scopes = [];

    if (
      environmentHelpers &&
      typeof environmentHelpers.fallbackCollectCandidateScopes === 'function'
    ) {
      try {
        const collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
        if (Array.isArray(collected)) {
          for (let collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            registerCandidateScope(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }

    registerCandidateScope(scopes, primaryScope);
    registerCandidateScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerCandidateScope(scopes, typeof window !== 'undefined' ? window : null);
    registerCandidateScope(scopes, typeof self !== 'undefined' ? self : null);
    registerCandidateScope(scopes, typeof global !== 'undefined' ? global : null);

    let detected = null;

    if (
      environmentHelpers &&
      typeof environmentHelpers.fallbackDetectGlobalScope === 'function'
    ) {
      try {
        detected = environmentHelpers.fallbackDetectGlobalScope();
      } catch (detectError) {
        void detectError;
        detected = null;
      }
    }

    if (!detected) {
      detected = detectScope(primaryScope);
    }

    registerCandidateScope(scopes, detected);

    return scopes;
  }

  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
  }

  function readCandidateScopesFromScope(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }

    try {
      const candidate = scope.CORE_RUNTIME_CANDIDATE_SCOPES;
      return isScopeList(candidate) ? candidate : null;
    } catch (candidateLookupError) {
      void candidateLookupError;
    }

    return null;
  }

  let cachedCandidateScopes = null;

  function syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers) {
    if (!isScopeList(candidateScopes)) {
      return candidateScopes;
    }

    cachedCandidateScopes = candidateScopes;

    const referenceScope = detectScope(primaryScope);
    const scopes = collectCandidateScopes(referenceScope, environmentHelpers);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (scope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes) {
          scope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
        }
      } catch (assignCandidateError) {
        void assignCandidateError;
      }
    }

    return candidateScopes;
  }

  function resolveCandidateScopes(primaryScope, environmentHelpers) {
    const referenceScope = detectScope(primaryScope);

    const existing =
      cachedCandidateScopes || readCandidateScopesFromScope(referenceScope);

    if (isScopeList(existing)) {
      return syncCandidateScopes(existing, referenceScope, environmentHelpers);
    }

    const candidateScopes = collectCandidateScopes(
      referenceScope,
      environmentHelpers
    );

    return syncCandidateScopes(candidateScopes, referenceScope, environmentHelpers);
  }

  function registerScope(runtimeState, scope) {
    if (!runtimeState || typeof runtimeState.registerScope !== 'function') {
      return;
    }

    try {
      runtimeState.registerScope(scope);
    } catch (registerError) {
      void registerError;
    }
  }

  function registerScopes(runtimeState, candidateScopes) {
    if (!Array.isArray(candidateScopes)) {
      return;
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      registerScope(runtimeState, candidateScopes[index]);
    }
  }

  function getScopesSnapshot(runtimeState, candidateScopes) {
    if (runtimeState && typeof runtimeState.getScopes === 'function') {
      try {
        const runtimeScopes = runtimeState.getScopes();
        if (Array.isArray(runtimeScopes)) {
          return runtimeScopes.slice();
        }
      } catch (getScopesError) {
        void getScopesError;
      }
    }

    if (Array.isArray(candidateScopes)) {
      return candidateScopes.slice();
    }

    return [];
  }

  function ensurePrimaryScope(runtimeState, candidateScopes) {
    if (runtimeState && typeof runtimeState.getPrimaryScope === 'function') {
      try {
        const primary = runtimeState.getPrimaryScope();
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }
      } catch (getPrimaryError) {
        void getPrimaryError;
      }
    }

    if (Array.isArray(candidateScopes)) {
      for (let index = 0; index < candidateScopes.length; index += 1) {
        const candidate = candidateScopes[index];
        if (candidate && (typeof candidate === 'object' || typeof candidate === 'function')) {
          return candidate;
        }
      }
    }

    return null;
  }

  function assignTemperatureRenderer(runtimeState, renderer) {
    if (typeof renderer !== 'function') {
      return;
    }

    if (!runtimeState || typeof runtimeState.assignTemperatureRenderer !== 'function') {
      return;
    }

    try {
      runtimeState.assignTemperatureRenderer(renderer);
    } catch (assignRendererError) {
      void assignRendererError;
    }
  }

  function readValue(runtimeState, name, candidateScopes) {
    if (runtimeState && typeof runtimeState.readValue === 'function') {
      try {
        return runtimeState.readValue(name);
      } catch (readValueError) {
        void readValueError;
      }
    }

    const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (name in scope) {
          return scope[name];
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    return undefined;
  }

  function ensureValue(runtimeState, name, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.ensureValue === 'function') {
      try {
        return runtimeState.ensureValue(name, fallbackValue);
      } catch (ensureValueError) {
        void ensureValueError;
      }
    }

    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (typeof scope[name] === 'undefined') {
          scope[name] = fallbackProvider();
        }
        return scope[name];
      } catch (ensureError) {
        void ensureError;
      }
    }

    try {
      return fallbackProvider();
    } catch (fallbackProviderError) {
      void fallbackProviderError;
      return undefined;
    }
  }

  function normaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.normaliseValue === 'function') {
      try {
        runtimeState.normaliseValue(name, validator, fallbackValue);
        return;
      } catch (normaliseValueError) {
        void normaliseValueError;
      }
    }

    const validate =
      typeof validator === 'function'
        ? validator
        : function alwaysValid() {
            return true;
          };

    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (!validate(scope[name])) {
          scope[name] = fallbackProvider();
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    }
  }

  const namespace = {
    collectCandidateScopes,
    resolveCandidateScopes,
    syncCandidateScopes,
    registerScope,
    registerScopes,
    getScopesSnapshot,
    ensurePrimaryScope,
    assignTemperatureRenderer,
    readValue,
    ensureValue,
    normaliseValue,
  };

  const globalScope = detectScope();
  const targetName = 'cineCoreRuntimeShared';
  const existing = globalScope && typeof globalScope[targetName] === 'object'
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
