/*
 * Runtime bootstrap helpers shared across Cine Power Planner bundles.
 *
 * The helpers extracted here previously lived inside app-core-new-1.js but are now
 * shared so Part 2, legacy bundles, and Jest tests can reuse the exact same
 * orchestration without duplicating logic. The functions intentionally avoid
 * assuming any specific bundler semantics so they continue to work in offline
 * and recovery contexts where globals might be partially initialised.
 */

// (function initRuntimeBootstrapNamespace() {
'use strict';

/* global CORE_GLOBAL_SCOPE, CORE_RUNTIME_STATE, cineCoreRuntimeModuleLoader */

export function getGlobalScopeCandidates() {
  const candidates = [];

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

export function getPrimaryGlobalScope() {
  const candidates = getGlobalScopeCandidates();
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    if (candidate && typeof candidate === 'object') {
      return candidate;
    }
  }

  return null;
}

function fallbackResolveRuntimeModuleLoader() {
  // if (typeof require === 'function') {
  //   try {
  //     const requiredLoader = require('../modules/core/runtime-module-loader.js');
  //     if (requiredLoader && typeof requiredLoader === 'object') {
  //       return requiredLoader;
  //     }
  //   } catch (runtimeLoaderError) {
  //     void runtimeLoaderError;
  //   }
  // }

  const globalScope = getPrimaryGlobalScope();

  if (
    globalScope &&
    typeof globalScope.cineCoreRuntimeModuleLoader === 'object' &&
    globalScope.cineCoreRuntimeModuleLoader
  ) {
    return globalScope.cineCoreRuntimeModuleLoader;
  }

  if (
    typeof cineCoreRuntimeModuleLoader !== 'undefined' &&
    cineCoreRuntimeModuleLoader &&
    typeof cineCoreRuntimeModuleLoader === 'object'
  ) {
    return cineCoreRuntimeModuleLoader;
  }

  return null;
}

function fallbackRequireCoreRuntimeModule(moduleId, options) {
  const loader = fallbackResolveRuntimeModuleLoader();
  if (loader && typeof loader.resolveCoreRuntimeModule === 'function') {
    try {
      return loader.resolveCoreRuntimeModule(moduleId, options);
    } catch (moduleResolutionError) {
      void moduleResolutionError;
    }
  }

  return null;
}

export function exposeCoreRuntimeConstant(name, value) {
  if (typeof name !== 'string' || !name) {
    return;
  }

  const scope = getPrimaryGlobalScope();
  if (!scope || typeof scope !== 'object') {
    return;
  }

  let descriptor = null;
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
      value,
    });
  } catch (defineError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(`Unable to expose ${name} globally`, defineError);
    }
  }
}

function exposeCoreRuntimeConstants(constants) {
  if (!constants || typeof constants !== 'object') {
    return;
  }

  Object.keys(constants).forEach((key) => {
    exposeCoreRuntimeConstant(key, constants[key]);
  });
}

const CORE_BOOT_QUEUE_KEY = (function resolveCoreBootQueueKey(scope) {
  const fallbackKey = '__coreRuntimeBootQueue';
  const targetScope = scope && typeof scope === 'object' ? scope : getPrimaryGlobalScope();

  if (targetScope) {
    const existingHidden = targetScope.__cineCoreBootQueueKey;
    const existingPublic = targetScope.CORE_BOOT_QUEUE_KEY;

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
})(typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null);

const CORE_BOOT_QUEUE = (function bootstrapCoreBootQueue(existingQueue) {
  if (Array.isArray(existingQueue)) {
    return existingQueue;
  }

  const scope = typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : getPrimaryGlobalScope();
  if (scope && typeof scope === 'object') {
    const shared = scope.cineCoreShared;
    if (shared && typeof shared === 'object') {
      const sharedQueue = shared[CORE_BOOT_QUEUE_KEY];
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
})(typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE : null);

if (
  typeof CORE_GLOBAL_SCOPE === 'object' &&
  CORE_GLOBAL_SCOPE &&
  CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE
) {
  CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE;
}

function enqueueCoreBootTask(task) {
  if (typeof task === 'function') {
    try {
      CORE_BOOT_QUEUE.push(task);
    } catch (err) {
      void err;
      // Fallback for test environments where CORE_BOOT_QUEUE might be frozen/broken/proxy
      try {
        task();
      } catch (taskError) {
        console.error('Failed to run fallback core boot task', taskError);
      }
    }
  }
}

export function processCoreBootQueue() {
  const queue = CORE_BOOT_QUEUE;
  console.log('[Runtime Bootstrap] Processing boot queue. Length:', Array.isArray(queue) ? queue.length : 'invalid');

  if (!Array.isArray(queue)) {
    return;
  }

  // Prevent infinite loops if tasks re-enqueue themselves synchronously
  // We process the current snapshot of the queue
  const snapshot = queue.splice(0, queue.length);
  console.log('[Runtime Bootstrap] Snapshot size:', snapshot.length);

  for (let index = 0; index < snapshot.length; index += 1) {
    const task = snapshot[index];
    if (typeof task === 'function') {
      try {
        task();
      } catch (error) {
        console.error('Failed to process core boot task', error);
      }
    }
  }
  console.log('[Runtime Bootstrap] Queue processing complete.');
}

const GRID_SNAP_STATE_STORAGE_KEY = '__cineGridSnapState';

function getGridSnapStateScopes() {
  const scopes = [];
  const runtimeState =
    typeof CORE_RUNTIME_STATE !== 'undefined' && CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE === 'object'
      ? CORE_RUNTIME_STATE
      : null;

  if (runtimeState && typeof runtimeState.getScopes === 'function') {
    try {
      const resolvedScopes = runtimeState.getScopes();
      if (Array.isArray(resolvedScopes)) {
        for (let index = 0; index < resolvedScopes.length; index += 1) {
          const scope = resolvedScopes[index];
          if (scope && scopes.indexOf(scope) === -1) {
            scopes.push(scope);
          }
        }
      }
    } catch (scopeReadError) {
      void scopeReadError;
    }
  }

  const fallbackCandidates = getGlobalScopeCandidates();
  for (let index = 0; index < fallbackCandidates.length; index += 1) {
    const candidate = fallbackCandidates[index];
    if (candidate && scopes.indexOf(candidate) === -1) {
      scopes.push(candidate);
    }
  }

  return scopes;
}

function normaliseGridSnapPreference(value, fallback = false) {
  if (value === true || value === false) {
    return value === true;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
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

  if (value && typeof value === 'object') {
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
  const scopes = getGridSnapStateScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      if (Object.prototype.hasOwnProperty.call(scope, GRID_SNAP_STATE_STORAGE_KEY)) {
        const stored = scope[GRID_SNAP_STATE_STORAGE_KEY];
        const normalized = normaliseGridSnapPreference(stored, undefined);
        if (typeof normalized === 'boolean') {
          return normalized;
        }
      }
    } catch (storageReadError) {
      void storageReadError;
    }

    try {
      if (Object.prototype.hasOwnProperty.call(scope, 'gridSnap')) {
        const legacy = scope.gridSnap;
        const normalizedLegacy = normaliseGridSnapPreference(legacy, undefined);
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

let gridSnapState = normaliseGridSnapPreference(readInitialGridSnapPreference(), false);

function assignGridSnapToScope(scope, value) {
  if (!scope || typeof scope !== 'object') {
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
        value,
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
        value,
      });
    } catch (defineLegacyError) {
      void defineLegacyError;
    }
  }
}

function syncGridSnapStateToScopes(value, originScope = null, options = {}) {
  const scopes = getGridSnapStateScopes();
  const persist = options && options.persist !== false;

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
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
            value,
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
          value,
        });
      } catch (defineLegacyError) {
        void defineLegacyError;
      }
    }
  }

  const primaryScope = getPrimaryGlobalScope();
  if (primaryScope && typeof primaryScope === 'object' && persist !== false) {
    assignGridSnapToScope(primaryScope, value);
  }

  return value;
}

function getGridSnapState() {
  return gridSnapState;
}

function setGridSnapState(value) {
  const normalized = normaliseGridSnapPreference(value, gridSnapState);
  gridSnapState = normalized;
  syncGridSnapStateToScopes(normalized);
  return gridSnapState;
}

function applyLegacyGridSnapValue(value) {
  const normalized = normaliseGridSnapPreference(value, gridSnapState);
  gridSnapState = normalized;
  syncGridSnapStateToScopes(normalized, null, { persist: false });
  return gridSnapState;
}

syncGridSnapStateToScopes(gridSnapState);

function publishRuntimeBootstrapExports(exportsMap) {
  if (!exportsMap || typeof exportsMap !== 'object') {
    return;
  }

  const scope = getPrimaryGlobalScope();
  if (!scope || typeof scope !== 'object') {
    return;
  }

  const existingNamespace = scope.cineRuntimeBootstrapExports;
  if (existingNamespace && typeof existingNamespace === 'object') {
    Object.keys(exportsMap).forEach((key) => {
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

export const runtimeBootstrapExports = {
  fallbackResolveRuntimeModuleLoader,
  fallbackRequireCoreRuntimeModule,
  exposeCoreRuntimeConstant,
  exposeCoreRuntimeConstants,
  CORE_BOOT_QUEUE_KEY,
  CORE_BOOT_QUEUE,
  enqueueCoreBootTask,
  processCoreBootQueue,
  GRID_SNAP_STATE_STORAGE_KEY,
  getGridSnapStateScopes,
  normaliseGridSnapPreference,
  readInitialGridSnapPreference,
  syncGridSnapStateToScopes,
  getGridSnapState,
  setGridSnapState,
  applyLegacyGridSnapValue,
};

// Expose critical helpers globally to prevent ReferenceErrors in other bundles
if (typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE) {
  if (!CORE_GLOBAL_SCOPE.fallbackRequireCoreRuntimeModule) {
    CORE_GLOBAL_SCOPE.fallbackRequireCoreRuntimeModule = fallbackRequireCoreRuntimeModule;
  }
  if (!CORE_GLOBAL_SCOPE.exposeCoreRuntimeConstant) {
    CORE_GLOBAL_SCOPE.exposeCoreRuntimeConstant = exposeCoreRuntimeConstant;
  }
} else {
  const primary = getPrimaryGlobalScope();
  if (primary) {
    if (!primary.fallbackRequireCoreRuntimeModule) {
      primary.fallbackRequireCoreRuntimeModule = fallbackRequireCoreRuntimeModule;
    }
    if (!primary.exposeCoreRuntimeConstant) {
      primary.exposeCoreRuntimeConstant = exposeCoreRuntimeConstant;
    }
  }
}

// EMERGENCY DEBUG EXPOSURE
if (typeof window !== 'undefined') {
  window.processCoreBootQueue = processCoreBootQueue;
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
// })();
