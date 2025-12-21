function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object' && scope.cineModuleBase) {
      return scope.cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('./base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  function freezeShallow(value) {
    if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    try {
      return Object.freeze(value);
    } catch (error) {
      void error;
    }
    return value;
  }
  var safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function' ? function warnWithBase(message, detail) {
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
  } : function fallbackWarn(message, detail) {
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
  var safeError = function safeError(message, detail) {
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
    var candidates = [];
    var pushCandidate = function pushCandidate(value) {
      if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
        return;
      }
      if (candidates.indexOf(value) === -1) {
        candidates.push(value);
      }
    };
    if (scope && _typeof(scope.cineModules) === 'object') {
      pushCandidate(scope.cineModules);
    }
    if (typeof require === 'function') {
      try {
        var required = require('./registry.js');
        if (required && _typeof(required) === 'object') {
          pushCandidate(required);
        }
      } catch (error) {
        void error;
      }
    }
    return candidates;
  }
  function attemptRegistryBackfill(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object' && typeof targetScope !== 'function') {
      return freezeShallow({
        registryCount: 0,
        descriptorCount: 0,
        registered: 0
      });
    }
    var registryCandidates = collectRegistryCandidates(targetScope);
    var registries = [];
    var seen = new Set();
    for (var index = 0; index < registryCandidates.length; index += 1) {
      var candidate = registryCandidates[index];
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
      return freezeShallow({
        registryCount: 0,
        descriptorCount: 0,
        registered: 0
      });
    }
    var descriptors = [{
      name: 'cineModuleBase',
      category: 'infrastructure',
      description: 'Shared helpers for module registration, freezing, and safe global exposure.',
      resolve: function resolve() {
        return targetScope.cineModuleBase || null;
      }
    }, {
      name: 'cineModuleGlobals',
      category: 'infrastructure',
      description: 'Shared module globals for cross-script coordination.',
      resolve: function resolve() {
        return targetScope.cineModuleGlobals || null;
      }
    }, {
      name: 'cineCoreShared',
      category: 'shared',
      description: 'Shared helpers for deterministic stringification, weights, and version markers.',
      resolve: function resolve() {
        return targetScope.cineCoreShared || null;
      }
    }, {
      name: 'cinePersistence',
      category: 'persistence',
      description: 'Data integrity facade for storage, autosave, backups, restore, and share flows.',
      resolve: function resolve() {
        return targetScope.cinePersistence || null;
      }
    }, {
      name: 'cineOffline',
      category: 'offline',
      description: 'Offline helpers for service worker registration and cache recovery.',
      resolve: function resolve() {
        return targetScope.cineOffline || null;
      }
    }, {
      name: 'cineUi',
      category: 'ui',
      description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
      resolve: function resolve() {
        return targetScope.cineUi || null;
      }
    }, {
      name: 'cineFeaturePrint',
      category: 'feature',
      description: 'Print orchestration helpers for overview exports and fallback workflows.',
      resolve: function resolve() {
        return targetScope.cineFeaturePrint || null;
      }
    }, {
      name: 'cineCoreProject',
      category: 'domain',
      description: 'Project intelligence helpers for derived metadata, selectors, and calculations.',
      resolve: function resolve() {
        return targetScope.cineCoreProject || null;
      }
    }, {
      name: 'cineCoreGuard',
      category: 'safety',
      description: 'Persistence guards that preserve autosaves, presets, and backup state across workflows.',
      resolve: function resolve() {
        return targetScope.cineCoreGuard || null;
      }
    }, {
      name: 'cineCoreExperience',
      category: 'experience',
      description: 'Experience helpers for UI orchestration, feature discovery, and presentation.',
      resolve: function resolve() {
        return targetScope.cineCoreExperience || null;
      }
    }, {
      name: 'cineRuntime',
      category: 'runtime',
      description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
      resolve: function resolve() {
        return targetScope.cineRuntime || null;
      }
    }];
    var registered = 0;
    for (var _index = 0; _index < descriptors.length; _index += 1) {
      var descriptor = descriptors[_index];
      var moduleValue = null;
      try {
        moduleValue = descriptor.resolve();
      } catch (error) {
        void error;
        moduleValue = null;
      }
      if (!moduleValue) {
        continue;
      }
      for (var registryIndex = 0; registryIndex < registries.length; registryIndex += 1) {
        var registry = registries[registryIndex];
        try {
          if (registry.has(descriptor.name)) {
            continue;
          }
          registry.register(descriptor.name, moduleValue, {
            category: descriptor.category,
            description: descriptor.description,
            replace: true
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
      registered: registered
    });
  }
  function attachIntegrity(scope, result) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return false;
    }
    try {
      Object.defineProperty(scope, '__cineRuntimeIntegrity', {
        configurable: true,
        enumerable: false,
        value: result,
        writable: false
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
    var targetScope = scope || GLOBAL_SCOPE;
    if (targetScope) {
      try {
        var runtime = targetScope.cineRuntime;
        if (runtime && _typeof(runtime) === 'object') {
          return runtime;
        }
      } catch (error) {
        void error;
      }
    }
    if (typeof require === 'function') {
      try {
        var required = require('./runtime.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  function verifyRuntimeIntegrity(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope) {
      return null;
    }
    var runtime = resolveRuntime(targetScope);
    if (!runtime || typeof runtime.verifyCriticalFlows !== 'function') {
      return null;
    }
    var warnOnFailure = options.warnOnFailure !== false;
    var shouldThrow = options.throwOnFailure !== false;
    var result;
    try {
      result = runtime.verifyCriticalFlows({
        warnOnFailure: warnOnFailure
      });
    } catch (error) {
      var failure = freezeShallow({
        ok: false,
        error: error
      });
      attachIntegrity(targetScope, failure);
      if (warnOnFailure) {
        safeError('cineRuntime.verifyCriticalFlows() threw during startup.', error);
      }
      if (shouldThrow) {
        throw error;
      }
      return failure;
    }
    var normalizedResult = result && _typeof(result) === 'object' ? result : freezeShallow({
      ok: false
    });
    attachIntegrity(targetScope, normalizedResult);
    if (!normalizedResult || normalizedResult.ok !== true) {
      var missingInfo = normalizedResult && Array.isArray(normalizedResult.missing) ? JSON.stringify(normalizedResult.missing) : 'unknown';
      var integrityError = new Error("cineRuntime integrity verification failed during startup. Missing: ".concat(missingInfo));
      integrityError.details = normalizedResult || null;
      if (typeof console !== 'undefined') {
        console.error('Integrity failure details:', missingInfo);
      }
      if (warnOnFailure) {
        safeError(integrityError.message, integrityError);
      }
      if (shouldThrow) {
        if (typeof console !== 'undefined') {
          console.log('INTEGRITY CHECK FAILURE DETAILS:', JSON.stringify(normalizedResult, null, 2));
        }
        throw integrityError;
      }
    }
    return normalizedResult;
  }
  function resolveRuntimeGuard(scope) {
    var candidates = [];
    var pushCandidate = function pushCandidate(candidateScope) {
      if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
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
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      try {
        var api = candidate && candidate.cineRuntimeGuard;
        if (api && _typeof(api) === 'object') {
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
        var required = require('./runtime-guard.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  function bootstrap(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var targetScope = scope || GLOBAL_SCOPE;
    var registryResult = attemptRegistryBackfill(targetScope);
    var integrityResult = verifyRuntimeIntegrity(targetScope, options);
    return freezeShallow({
      registry: registryResult,
      integrity: integrityResult
    });
  }
  var moduleApi = freezeShallow({
    detectGlobalScope: detectGlobalScope,
    resolveRuntimeGuard: resolveRuntimeGuard,
    attemptRegistryBackfill: attemptRegistryBackfill,
    verifyRuntimeIntegrity: verifyRuntimeIntegrity,
    bootstrap: bootstrap
  });
  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    try {
      MODULE_BASE.registerOrQueueModule('cineRuntimeGuard', moduleApi, {
        category: 'infrastructure',
        description: 'Runtime backfill and integrity helpers reused by the legacy entry point.',
        replace: true,
        connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence', 'cineRuntime']
      }, function (error) {
        return safeWarn('Unable to register cineRuntimeGuard module.', error);
      }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
    } catch (error) {
      safeWarn('cineRuntimeGuard registration failed.', error);
    }
  }
  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    try {
      MODULE_BASE.exposeGlobal('cineRuntimeGuard', moduleApi, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false
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