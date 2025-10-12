(function () {
  function detectAmbientScope() {
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

  function fallbackDetectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
  }

  function fallbackRegisterCandidateScope(scopes, scope) {
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

  function fallbackCollectCandidateScopes(
    primaryScope,
    environmentHelpers,
    detect,
    register,
  ) {
    const scopes = [];

    if (
      environmentHelpers &&
      typeof environmentHelpers.fallbackCollectCandidateScopes === 'function'
    ) {
      try {
        const collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
        if (Array.isArray(collected)) {
          for (let collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            register(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }

    register(scopes, primaryScope);
    register(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    register(scopes, typeof window !== 'undefined' ? window : null);
    register(scopes, typeof self !== 'undefined' ? self : null);
    register(scopes, typeof global !== 'undefined' ? global : null);

    let detected = null;

    if (environmentHelpers && typeof environmentHelpers.fallbackDetectGlobalScope === 'function') {
      try {
        detected = environmentHelpers.fallbackDetectGlobalScope();
      } catch (detectError) {
        void detectError;
        detected = null;
      }
    }

    if (!detected) {
      detected = detect(primaryScope);
    }

    register(scopes, detected);

    return scopes;
  }

  function fallbackRegisterScope(runtimeState, scope) {
    if (!runtimeState || typeof runtimeState.registerScope !== 'function') {
      return;
    }

    try {
      runtimeState.registerScope(scope);
    } catch (registerError) {
      void registerError;
    }
  }

  function fallbackRegisterScopes(runtimeState, candidateScopes, register) {
    if (!Array.isArray(candidateScopes)) {
      return;
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      register(runtimeState, candidateScopes[index]);
    }
  }

  function fallbackGetScopesSnapshot(runtimeState, candidateScopes) {
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

  function fallbackEnsurePrimaryScope(runtimeState, candidateScopes) {
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

  function fallbackAssignTemperatureRenderer(runtimeState, renderer) {
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

  function fallbackReadValue(runtimeState, name, candidateScopes) {
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

  function fallbackEnsureValue(runtimeState, name, fallbackValue, candidateScopes) {
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

  function fallbackNormaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes) {
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

  function loadModuleFromRegistry(name) {
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }

    try {
      const registry = scope.cineCoreRuntimeSharedModules;
      if (registry && typeof registry === 'object') {
        const module = registry[name];
        if (module && typeof module === 'object') {
          return module;
        }
      }
    } catch (registryLookupError) {
      void registryLookupError;
    }

    return null;
  }

  function loadModule(name, requirePath) {
    let resolved = null;

    if (typeof require === 'function') {
      try {
        resolved = require(requirePath);
      } catch (moduleRequireError) {
        void moduleRequireError;
      }
    }

    if (!resolved) {
      resolved = loadModuleFromRegistry(name);
    }

    return resolved || null;
  }

  const scopeDetectionModule = loadModule('scopeDetection', './runtime-shared/scope-detection.js') || {};
  const scopeRegistrationModule = loadModule('scopeRegistration', './runtime-shared/scope-registration.js') || {};
  const scopeSnapshotModule = loadModule('scopeSnapshot', './runtime-shared/scope-snapshot.js') || {};
  const temperatureToolsModule = loadModule('temperatureTools', './runtime-shared/temperature-tools.js') || {};
  const valueAccessModule = loadModule('valueAccess', './runtime-shared/value-access.js') || {};

  const detectScope =
    typeof scopeDetectionModule.detectScope === 'function'
      ? scopeDetectionModule.detectScope
      : fallbackDetectScope;

  const registerCandidateScope =
    typeof scopeDetectionModule.registerCandidateScope === 'function'
      ? scopeDetectionModule.registerCandidateScope
      : fallbackRegisterCandidateScope;

  const collectCandidateScopes =
    typeof scopeDetectionModule.collectCandidateScopes === 'function'
      ? function collectCandidateScopesWrapper(primaryScope, environmentHelpers) {
          return scopeDetectionModule.collectCandidateScopes(primaryScope, environmentHelpers);
        }
      : function fallbackCollectCandidateScopesWrapper(primaryScope, environmentHelpers) {
          return fallbackCollectCandidateScopes(
            primaryScope,
            environmentHelpers,
            detectScope,
            registerCandidateScope,
          );
        };

  const registerScope =
    typeof scopeRegistrationModule.registerScope === 'function'
      ? scopeRegistrationModule.registerScope
      : function fallbackRegisterScopeWrapper(runtimeState, scope) {
          fallbackRegisterScope(runtimeState, scope);
        };

  const registerScopes =
    typeof scopeRegistrationModule.registerScopes === 'function'
      ? function registerScopesWrapper(runtimeState, candidateScopes) {
          scopeRegistrationModule.registerScopes(runtimeState, candidateScopes);
        }
      : function fallbackRegisterScopesWrapper(runtimeState, candidateScopes) {
          fallbackRegisterScopes(runtimeState, candidateScopes, registerScope);
        };

  const getScopesSnapshot =
    typeof scopeSnapshotModule.getScopesSnapshot === 'function'
      ? scopeSnapshotModule.getScopesSnapshot
      : fallbackGetScopesSnapshot;

  const ensurePrimaryScope =
    typeof scopeSnapshotModule.ensurePrimaryScope === 'function'
      ? scopeSnapshotModule.ensurePrimaryScope
      : fallbackEnsurePrimaryScope;

  const assignTemperatureRenderer =
    typeof temperatureToolsModule.assignTemperatureRenderer === 'function'
      ? temperatureToolsModule.assignTemperatureRenderer
      : fallbackAssignTemperatureRenderer;

  const readValue =
    typeof valueAccessModule.readValue === 'function'
      ? valueAccessModule.readValue
      : fallbackReadValue;

  const ensureValue =
    typeof valueAccessModule.ensureValue === 'function'
      ? valueAccessModule.ensureValue
      : function fallbackEnsureValueWrapper(runtimeState, name, fallbackValue, candidateScopes) {
          return fallbackEnsureValue(runtimeState, name, fallbackValue, candidateScopes);
        };

  const normaliseValue =
    typeof valueAccessModule.normaliseValue === 'function'
      ? valueAccessModule.normaliseValue
      : function fallbackNormaliseValueWrapper(
          runtimeState,
          name,
          validator,
          fallbackValue,
          candidateScopes,
        ) {
          fallbackNormaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes);
        };

  const namespace = {
    collectCandidateScopes,
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
