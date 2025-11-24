/* global cineModuleBase */

// ---------------------------------------------------------------------------
// Runtime guard module
// ---------------------------------------------------------------------------
// The bootstrap helpers in this module keep the legacy entry point lightweight
// by centralising the registry backfill and integrity verification routines.
// The logic mirrors the original inline implementation but now lives in a
// dedicated module so that tests and modern bundles can reuse the safeguards
// without duplicating code. Extensive comments document why each defensive
// branch exists – preserving the autosave, backup and offline guarantees is
// essential for preventing any loss of user data.

(function () {
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
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (scope && typeof scope.cineModuleBase === 'object' && scope.cineModuleBase) {
      return scope.cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('./base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);

  function freezeShallow(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    try {
      return Object.freeze(value);
    } catch (error) {
      void error;
    }

    return value;
  }

  const safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function'
    ? function warnWithBase(message, detail) {
        try {
          MODULE_BASE.safeWarn(message, detail);
        } catch (error) {
          void error;
        }
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            if (typeof detail === 'undefined') {
              console.warn(message);
            } else {
              console.warn(message, detail);
            }
          } catch (consoleError) {
            void consoleError;
          }
        }
      }
    : function fallbackWarn(message, detail) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }
        try {
          if (typeof detail === 'undefined') {
            console.warn(message);
          } else {
            console.warn(message, detail);
          }
        } catch (error) {
          void error;
        }
      };

  const safeError = function safeError(message, detail) {
    try {
      safeWarn(message, detail);
    } catch (warnError) {
      void warnError;
    }

    if (typeof console === 'undefined' || !console || typeof console.error !== 'function') {
      return;
    }

    try {
      if (typeof detail === 'undefined') {
        console.error(message);
      } else {
        console.error(message, detail);
      }
    } catch (error) {
      void error;
    }
  };

  function collectRegistryCandidates(scope) {
    const candidates = [];
    const pushCandidate = (value) => {
      if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
        return;
      }
      if (candidates.indexOf(value) === -1) {
        candidates.push(value);
      }
    };

    if (scope && typeof scope.cineModules === 'object') {
      pushCandidate(scope.cineModules);
    }

    if (typeof require === 'function') {
      try {
        const required = require('./registry.js');
        if (required && typeof required === 'object') {
          pushCandidate(required);
        }
      } catch (error) {
        void error;
      }
    }

    return candidates;
  }

  function attemptRegistryBackfill(scope) {
    const targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || (typeof targetScope !== 'object' && typeof targetScope !== 'function')) {
      return freezeShallow({ registryCount: 0, descriptorCount: 0, registered: 0 });
    }

    const registryCandidates = collectRegistryCandidates(targetScope);
    const registries = [];
    const seen = new Set();

    for (let index = 0; index < registryCandidates.length; index += 1) {
      const candidate = registryCandidates[index];
      if (!candidate || typeof candidate.register !== 'function' || typeof candidate.has !== 'function') {
        continue;
      }

      if (seen.has(candidate)) {
        continue;
      }

      seen.add(candidate);
      registries.push(candidate);
    }

    if (registries.length === 0) {
      return freezeShallow({ registryCount: 0, descriptorCount: 0, registered: 0 });
    }

    const descriptors = [
      {
        name: 'cineModuleBase',
        category: 'infrastructure',
        description: 'Shared helpers for module registration, freezing, and safe global exposure.',
        resolve() {
          return targetScope.cineModuleBase || null;
        },
      },
      {
        name: 'cineModuleGlobals',
        category: 'infrastructure',
        description: 'Shared module globals for cross-script coordination.',
        resolve() {
          return targetScope.cineModuleGlobals || null;
        },
      },
      {
        name: 'cineCoreShared',
        category: 'shared',
        description: 'Shared helpers for deterministic stringification, weights, and version markers.',
        resolve() {
          return targetScope.cineCoreShared || null;
        },
      },
      {
        name: 'cinePersistence',
        category: 'persistence',
        description: 'Data integrity facade for storage, autosave, backups, restore, and share flows.',
        resolve() {
          return targetScope.cinePersistence || null;
        },
      },
      {
        name: 'cineOffline',
        category: 'offline',
        description: 'Offline helpers for service worker registration and cache recovery.',
        resolve() {
          return targetScope.cineOffline || null;
        },
      },
      {
        name: 'cineUi',
        category: 'ui',
        description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
        resolve() {
          return targetScope.cineUi || null;
        },
      },
      {
        name: 'cineFeaturePrint',
        category: 'feature',
        description: 'Print orchestration helpers for overview exports and fallback workflows.',
        resolve() {
          return targetScope.cineFeaturePrint || null;
        },
      },
      {
        name: 'cineCoreProject',
        category: 'domain',
        description: 'Project intelligence helpers for derived metadata, selectors, and calculations.',
        resolve() {
          return targetScope.cineCoreProject || null;
        },
      },
      {
        name: 'cineCoreGuard',
        category: 'safety',
        description: 'Persistence guards that preserve autosaves, presets, and backup state across workflows.',
        resolve() {
          return targetScope.cineCoreGuard || null;
        },
      },
      {
        name: 'cineCoreExperience',
        category: 'experience',
        description: 'Experience helpers for UI orchestration, feature discovery, and presentation.',
        resolve() {
          return targetScope.cineCoreExperience || null;
        },
      },
      {
        name: 'cineRuntime',
        category: 'runtime',
        description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
        resolve() {
          return targetScope.cineRuntime || null;
        },
      },
    ];

    let registered = 0;

    for (let index = 0; index < descriptors.length; index += 1) {
      const descriptor = descriptors[index];
      let moduleValue = null;
      try {
        moduleValue = descriptor.resolve();
      } catch (error) {
        void error;
        moduleValue = null;
      }

      if (!moduleValue) {
        continue;
      }

      for (let registryIndex = 0; registryIndex < registries.length; registryIndex += 1) {
        const registry = registries[registryIndex];
        try {
          if (registry.has(descriptor.name)) {
            continue;
          }

          registry.register(descriptor.name, moduleValue, {
            category: descriptor.category,
            description: descriptor.description,
            replace: true,
          });
          registered += 1;
        } catch (error) {
          void error;
        }
      }
    }

    return freezeShallow({
      registryCount: registries.length,
      descriptorCount: descriptors.length,
      registered,
    });
  }

  function attachIntegrity(scope, result) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return false;
    }

    try {
      Object.defineProperty(scope, '__cineRuntimeIntegrity', {
        configurable: true,
        enumerable: false,
        value: result,
        writable: false,
      });
      return true;
    } catch (error) {
      void error;
    }

    try {
      scope.__cineRuntimeIntegrity = result;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function resolveRuntime(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (targetScope) {
      try {
        const runtime = targetScope.cineRuntime;
        if (runtime && typeof runtime === 'object') {
          return runtime;
        }
      } catch (error) {
        void error;
      }
    }

    if (typeof require === 'function') {
      try {
        const required = require('./runtime.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function verifyRuntimeIntegrity(scope, options = {}) {
    const targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope) {
      return null;
    }

    const runtime = resolveRuntime(targetScope);
    if (!runtime || typeof runtime.verifyCriticalFlows !== 'function') {
      return null;
    }

    const warnOnFailure = options.warnOnFailure !== false;
    const shouldThrow = options.throwOnFailure !== false;

    let result;

    try {
      result = runtime.verifyCriticalFlows({ warnOnFailure });
    } catch (error) {
      const failure = freezeShallow({ ok: false, error });
      attachIntegrity(targetScope, failure);
      if (warnOnFailure) {
        safeError('cineRuntime.verifyCriticalFlows() threw during startup.', error);
      }
      if (shouldThrow) {
        throw error;
      }
      return failure;
    }

    const normalizedResult = result && typeof result === 'object'
      ? result
      : freezeShallow({ ok: false });

    attachIntegrity(targetScope, normalizedResult);

    if (!normalizedResult || normalizedResult.ok !== true) {
      const integrityError = new Error('cineRuntime integrity verification failed during startup.');
      integrityError.details = normalizedResult || null;
      if (warnOnFailure) {
        safeError(integrityError.message, integrityError);
      }
      if (shouldThrow) {
        throw integrityError;
      }
    }

    return normalizedResult;
  }

  function resolveRuntimeGuard(scope) {
    const candidates = [];

    const pushCandidate = (candidateScope) => {
      if (!candidateScope || (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')) {
        return;
      }
      if (candidates.indexOf(candidateScope) === -1) {
        candidates.push(candidateScope);
      }
    };

    pushCandidate(scope);
    pushCandidate(GLOBAL_SCOPE);

    if (typeof globalThis !== 'undefined') pushCandidate(globalThis);
    if (typeof window !== 'undefined') pushCandidate(window);
    if (typeof self !== 'undefined') pushCandidate(self);
    if (typeof global !== 'undefined') pushCandidate(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      try {
        const api = candidate && candidate.cineRuntimeGuard;
        if (api && typeof api === 'object') {
          return api;
        }
      } catch (error) {
        void error;
      }
    }

    if (typeof module !== 'undefined' && module && module.exports) {
      return module.exports;
    }

    if (typeof require === 'function') {
      try {
        const required = require('./runtime-guard.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function bootstrap(scope, options = {}) {
    const targetScope = scope || GLOBAL_SCOPE;
    const registryResult = attemptRegistryBackfill(targetScope);
    const integrityResult = verifyRuntimeIntegrity(targetScope, options);
    return freezeShallow({ registry: registryResult, integrity: integrityResult });
  }

  const moduleApi = freezeShallow({
    detectGlobalScope,
    resolveRuntimeGuard,
    attemptRegistryBackfill,
    verifyRuntimeIntegrity,
    bootstrap,
  });

  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    try {
      MODULE_BASE.registerOrQueueModule(
        'cineRuntimeGuard',
        moduleApi,
        {
          category: 'infrastructure',
          description: 'Runtime backfill and integrity helpers reused by the legacy entry point.',
          replace: true,
          connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence', 'cineRuntime'],
        },
        (error) => safeWarn('Unable to register cineRuntimeGuard module.', error),
        GLOBAL_SCOPE,
        MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
      );
    } catch (error) {
      safeWarn('cineRuntimeGuard registration failed.', error);
    }
  }

  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    try {
      MODULE_BASE.exposeGlobal('cineRuntimeGuard', moduleApi, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false,
      });
    } catch (error) {
      safeWarn('cineRuntimeGuard could not expose global api.', error);
    }
  } else {
    try {
      GLOBAL_SCOPE.cineRuntimeGuard = moduleApi;
    } catch (error) {
      safeWarn('cineRuntimeGuard could not assign global api.', error);
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleApi;
  }
})();

