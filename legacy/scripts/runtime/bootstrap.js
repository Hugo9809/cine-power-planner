function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initRuntimeBootstrapNamespace() {
  'use strict';
  function getGlobalScopeCandidates() {
    var candidates = [];
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      candidates.push(CORE_GLOBAL_SCOPE);
    }
    if (typeof globalThis !== 'undefined' && globalThis) {
      candidates.push(globalThis);
    }
    if (typeof window !== 'undefined' && window) {
      candidates.push(window);
    }
    if (typeof self !== 'undefined' && self) {
      candidates.push(self);
    }
    if (typeof global !== 'undefined' && global) {
      candidates.push(global);
    }
    return candidates;
  }
  function getPrimaryGlobalScope() {
    var candidates = getGlobalScopeCandidates();
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate) === 'object') {
        return candidate;
      }
    }
    return null;
  }
  function fallbackResolveRuntimeModuleLoader() {
    if (typeof require === 'function') {
      try {
        var requiredLoader = require('../modules/core/runtime-module-loader.js');
        if (requiredLoader && _typeof(requiredLoader) === 'object') {
          return requiredLoader;
        }
      } catch (runtimeLoaderError) {
        void runtimeLoaderError;
      }
    }
    var globalScope = getPrimaryGlobalScope();
    if (globalScope && _typeof(globalScope.cineCoreRuntimeModuleLoader) === 'object' && globalScope.cineCoreRuntimeModuleLoader) {
      return globalScope.cineCoreRuntimeModuleLoader;
    }
    if (typeof cineCoreRuntimeModuleLoader !== 'undefined' && cineCoreRuntimeModuleLoader && (typeof cineCoreRuntimeModuleLoader === "undefined" ? "undefined" : _typeof(cineCoreRuntimeModuleLoader)) === 'object') {
      return cineCoreRuntimeModuleLoader;
    }
    return null;
  }
  function fallbackRequireCoreRuntimeModule(moduleId, options) {
    var loader = fallbackResolveRuntimeModuleLoader();
    if (loader && typeof loader.resolveCoreRuntimeModule === 'function') {
      try {
        return loader.resolveCoreRuntimeModule(moduleId, options);
      } catch (moduleResolutionError) {
        void moduleResolutionError;
      }
    }
    return null;
  }
  function exposeCoreRuntimeConstant(name, value) {
    if (typeof name !== 'string' || !name) {
      return;
    }
    var scope = getPrimaryGlobalScope();
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    var descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(scope, name);
    } catch (descriptorError) {
      descriptor = null;
      void descriptorError;
    }
    if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
      return;
    }
    try {
      scope[name] = value;
      return;
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } catch (defineError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn("Unable to expose ".concat(name, " globally"), defineError);
      }
    }
  }
  function exposeCoreRuntimeConstants(constants) {
    if (!constants || _typeof(constants) !== 'object') {
      return;
    }
    Object.keys(constants).forEach(function (key) {
      exposeCoreRuntimeConstant(key, constants[key]);
    });
  }
  var CORE_BOOT_QUEUE_KEY = function resolveCoreBootQueueKey(scope) {
    var fallbackKey = '__coreRuntimeBootQueue';
    var targetScope = scope && _typeof(scope) === 'object' ? scope : getPrimaryGlobalScope();
    if (targetScope) {
      var existingHidden = targetScope.__cineCoreBootQueueKey;
      var existingPublic = targetScope.CORE_BOOT_QUEUE_KEY;
      if (typeof existingPublic === 'string' && existingPublic) {
        try {
          targetScope.__cineCoreBootQueueKey = existingPublic;
        } catch (syncError) {
          void syncError;
          targetScope.__cineCoreBootQueueKey = existingPublic;
        }
        return existingPublic;
      }
      if (typeof existingHidden === 'string' && existingHidden) {
        if (typeof targetScope.CORE_BOOT_QUEUE_KEY !== 'string' || !targetScope.CORE_BOOT_QUEUE_KEY) {
          try {
            targetScope.CORE_BOOT_QUEUE_KEY = existingHidden;
          } catch (shadowError) {
            void shadowError;
            targetScope.CORE_BOOT_QUEUE_KEY = existingHidden;
          }
        }
        return existingHidden;
      }
    }
    if (targetScope) {
      try {
        targetScope.__cineCoreBootQueueKey = fallbackKey;
      } catch (hiddenAssignError) {
        void hiddenAssignError;
        targetScope.__cineCoreBootQueueKey = fallbackKey;
      }
      try {
        targetScope.CORE_BOOT_QUEUE_KEY = fallbackKey;
      } catch (publicAssignError) {
        void publicAssignError;
        targetScope.CORE_BOOT_QUEUE_KEY = fallbackKey;
      }
    }
    return fallbackKey;
  }((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null);
  var CORE_BOOT_QUEUE = function bootstrapCoreBootQueue(existingQueue) {
    if (Array.isArray(existingQueue)) {
      return existingQueue;
    }
    var scope = (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : getPrimaryGlobalScope();
    if (scope && _typeof(scope) === 'object') {
      var shared = scope.cineCoreShared;
      if (shared && _typeof(shared) === 'object') {
        var sharedQueue = shared[CORE_BOOT_QUEUE_KEY];
        if (Array.isArray(sharedQueue)) {
          return sharedQueue;
        }
        if (Object.isExtensible(shared)) {
          shared[CORE_BOOT_QUEUE_KEY] = [];
          return shared[CORE_BOOT_QUEUE_KEY];
        }
      }
      if (!Array.isArray(scope.CORE_BOOT_QUEUE)) {
        scope.CORE_BOOT_QUEUE = [];
      }
      return scope.CORE_BOOT_QUEUE;
    }
    return [];
  }((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE : null);
  if ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE) {
    CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE;
  }
  function enqueueCoreBootTask(task) {
    if (typeof task === 'function') {
      CORE_BOOT_QUEUE.push(task);
    }
  }
  var GRID_SNAP_STATE_STORAGE_KEY = '__cineGridSnapState';
  function getGridSnapStateScopes() {
    var scopes = [];
    var runtimeState = typeof CORE_RUNTIME_STATE !== 'undefined' && CORE_RUNTIME_STATE && (typeof CORE_RUNTIME_STATE === "undefined" ? "undefined" : _typeof(CORE_RUNTIME_STATE)) === 'object' ? CORE_RUNTIME_STATE : null;
    if (runtimeState && typeof runtimeState.getScopes === 'function') {
      try {
        var resolvedScopes = runtimeState.getScopes();
        if (Array.isArray(resolvedScopes)) {
          for (var index = 0; index < resolvedScopes.length; index += 1) {
            var scope = resolvedScopes[index];
            if (scope && scopes.indexOf(scope) === -1) {
              scopes.push(scope);
            }
          }
        }
      } catch (scopeReadError) {
        void scopeReadError;
      }
    }
    var fallbackCandidates = getGlobalScopeCandidates();
    for (var _index = 0; _index < fallbackCandidates.length; _index += 1) {
      var candidate = fallbackCandidates[_index];
      if (candidate && scopes.indexOf(candidate) === -1) {
        scopes.push(candidate);
      }
    }
    return scopes;
  }
  function normaliseGridSnapPreference(value) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (value === true || value === false) {
      return value === true;
    }
    if (typeof value === 'string') {
      var normalized = value.trim().toLowerCase();
      if (!normalized) {
        return fallback;
      }
      if (['true', '1', 'yes', 'on', 'enabled', 'enable'].includes(normalized)) {
        return true;
      }
      if (['false', '0', 'no', 'off', 'disabled', 'disable'].includes(normalized)) {
        return false;
      }
      return fallback;
    }
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        return fallback;
      }
      return value > 0;
    }
    if (value && _typeof(value) === 'object') {
      if (Object.prototype.hasOwnProperty.call(value, 'enabled')) {
        return normaliseGridSnapPreference(value.enabled, fallback);
      }
      if (Object.prototype.hasOwnProperty.call(value, 'value')) {
        return normaliseGridSnapPreference(value.value, fallback);
      }
    }
    return fallback;
  }
  function readInitialGridSnapPreference() {
    var scopes = getGridSnapStateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      try {
        if (Object.prototype.hasOwnProperty.call(scope, GRID_SNAP_STATE_STORAGE_KEY)) {
          var stored = scope[GRID_SNAP_STATE_STORAGE_KEY];
          var normalized = normaliseGridSnapPreference(stored, undefined);
          if (typeof normalized === 'boolean') {
            return normalized;
          }
        }
      } catch (storageReadError) {
        void storageReadError;
      }
      try {
        if (Object.prototype.hasOwnProperty.call(scope, 'gridSnap')) {
          var legacy = scope.gridSnap;
          var normalizedLegacy = normaliseGridSnapPreference(legacy, undefined);
          if (typeof normalizedLegacy === 'boolean') {
            return normalizedLegacy;
          }
        }
      } catch (legacyReadError) {
        void legacyReadError;
      }
    }
    return undefined;
  }
  var gridSnapState = normaliseGridSnapPreference(readInitialGridSnapPreference(), false);
  function assignGridSnapToScope(scope, value) {
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    try {
      scope[GRID_SNAP_STATE_STORAGE_KEY] = value;
    } catch (assignStorageError) {
      void assignStorageError;
      try {
        Object.defineProperty(scope, GRID_SNAP_STATE_STORAGE_KEY, {
          configurable: true,
          writable: true,
          value: value
        });
      } catch (defineStorageError) {
        void defineStorageError;
      }
    }
    try {
      scope.gridSnap = value;
    } catch (assignLegacyError) {
      void assignLegacyError;
      try {
        Object.defineProperty(scope, 'gridSnap', {
          configurable: true,
          writable: true,
          value: value
        });
      } catch (defineLegacyError) {
        void defineLegacyError;
      }
    }
  }
  function syncGridSnapStateToScopes(value) {
    var originScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var scopes = getGridSnapStateScopes();
    var persist = options && options.persist !== false;
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      if (persist !== false) {
        try {
          scope[GRID_SNAP_STATE_STORAGE_KEY] = value;
        } catch (assignStorageError) {
          void assignStorageError;
          try {
            Object.defineProperty(scope, GRID_SNAP_STATE_STORAGE_KEY, {
              configurable: true,
              writable: true,
              value: value
            });
          } catch (defineStorageError) {
            void defineStorageError;
          }
        }
      }
      if (originScope === scope) {
        continue;
      }
      try {
        scope.gridSnap = value;
      } catch (assignLegacyError) {
        void assignLegacyError;
        try {
          Object.defineProperty(scope, 'gridSnap', {
            configurable: true,
            writable: true,
            value: value
          });
        } catch (defineLegacyError) {
          void defineLegacyError;
        }
      }
    }
    var primaryScope = getPrimaryGlobalScope();
    if (primaryScope && _typeof(primaryScope) === 'object' && persist !== false) {
      assignGridSnapToScope(primaryScope, value);
    }
    return value;
  }
  function getGridSnapState() {
    return gridSnapState;
  }
  function setGridSnapState(value) {
    var normalized = normaliseGridSnapPreference(value, gridSnapState);
    gridSnapState = normalized;
    syncGridSnapStateToScopes(normalized);
    return gridSnapState;
  }
  function applyLegacyGridSnapValue(value) {
    var normalized = normaliseGridSnapPreference(value, gridSnapState);
    gridSnapState = normalized;
    syncGridSnapStateToScopes(normalized, null, {
      persist: false
    });
    return gridSnapState;
  }
  syncGridSnapStateToScopes(gridSnapState);
  function publishRuntimeBootstrapExports(exportsMap) {
    if (!exportsMap || _typeof(exportsMap) !== 'object') {
      return;
    }
    var scope = getPrimaryGlobalScope();
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    var existingNamespace = scope.cineRuntimeBootstrapExports;
    if (existingNamespace && _typeof(existingNamespace) === 'object') {
      Object.keys(exportsMap).forEach(function (key) {
        existingNamespace[key] = exportsMap[key];
      });
      return;
    }
    try {
      scope.cineRuntimeBootstrapExports = exportsMap;
    } catch (assignError) {
      void assignError;
    }
  }
  var runtimeBootstrapExports = {
    fallbackResolveRuntimeModuleLoader: fallbackResolveRuntimeModuleLoader,
    fallbackRequireCoreRuntimeModule: fallbackRequireCoreRuntimeModule,
    exposeCoreRuntimeConstant: exposeCoreRuntimeConstant,
    exposeCoreRuntimeConstants: exposeCoreRuntimeConstants,
    CORE_BOOT_QUEUE_KEY: CORE_BOOT_QUEUE_KEY,
    CORE_BOOT_QUEUE: CORE_BOOT_QUEUE,
    enqueueCoreBootTask: enqueueCoreBootTask,
    GRID_SNAP_STATE_STORAGE_KEY: GRID_SNAP_STATE_STORAGE_KEY,
    getGridSnapStateScopes: getGridSnapStateScopes,
    normaliseGridSnapPreference: normaliseGridSnapPreference,
    readInitialGridSnapPreference: readInitialGridSnapPreference,
    syncGridSnapStateToScopes: syncGridSnapStateToScopes,
    getGridSnapState: getGridSnapState,
    setGridSnapState: setGridSnapState,
    applyLegacyGridSnapValue: applyLegacyGridSnapValue
  };
  if ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE) {
    if (!CORE_GLOBAL_SCOPE.fallbackRequireCoreRuntimeModule) {
      CORE_GLOBAL_SCOPE.fallbackRequireCoreRuntimeModule = fallbackRequireCoreRuntimeModule;
    }
    if (!CORE_GLOBAL_SCOPE.exposeCoreRuntimeConstant) {
      CORE_GLOBAL_SCOPE.exposeCoreRuntimeConstant = exposeCoreRuntimeConstant;
    }
  } else {
    var primary = getPrimaryGlobalScope();
    if (primary) {
      if (!primary.fallbackRequireCoreRuntimeModule) {
        primary.fallbackRequireCoreRuntimeModule = fallbackRequireCoreRuntimeModule;
      }
      if (!primary.exposeCoreRuntimeConstant) {
        primary.exposeCoreRuntimeConstant = exposeCoreRuntimeConstant;
      }
    }
  }
  if (typeof module !== 'undefined' && module) {
    try {
      module.exports = runtimeBootstrapExports;
    } catch (moduleExportError) {
      void moduleExportError;
    }
  } else if (typeof exports !== 'undefined' && exports) {
    try {
      exports.runtimeBootstrapExports = runtimeBootstrapExports;
    } catch (exportsAssignError) {
      void exportsAssignError;
    }
  }
  publishRuntimeBootstrapExports(runtimeBootstrapExports);
})();