/*
 * Cine Power Planner runtime scope helpers.
 *
 * MIGRATED to pure ESM modules in Batch 11.
 * - Scope Logic -> modules/helpers/scope-utils.js
 *
 * This file remains as a shim for legacy code.
 */

import {
  detectGlobalScope,
  collectCandidateScopes as collectCandidates
} from '../modules/helpers/scope-utils.js';

import { cineCoreRuntimeModuleLoader } from '../modules/runtime-module-loader.js';

export const CORE_GLOBAL_SCOPE = detectGlobalScope();

// Legacy helper used by some files
function resolveRuntimeModuleLoader() {
  if (cineCoreRuntimeModuleLoader) {
    return cineCoreRuntimeModuleLoader;
  }
  return null;
}

// Legacy helper
function requireCoreRuntimeModule(moduleId, options) {
  const loader = resolveRuntimeModuleLoader();
  if (
    loader &&
    typeof loader.resolveCoreRuntimeModule === 'function'
  ) {
    try {
      return loader.resolveCoreRuntimeModule(moduleId, options);
    } catch (e) {
      void e;
    }
  }
  return null;
}

export const CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE = detectGlobalScope();

export const collectRuntimeScopeCandidates = function (additionalCandidates) {
  return collectCandidates(
    CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
    additionalCandidates
  );
};

// Global Injection for Legacy Compatibility
if (CORE_GLOBAL_SCOPE) {
  if (typeof CORE_GLOBAL_SCOPE.collectRuntimeScopeCandidates === 'undefined') {
    CORE_GLOBAL_SCOPE.collectRuntimeScopeCandidates = collectRuntimeScopeCandidates;
  }
  if (typeof CORE_GLOBAL_SCOPE.CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE === 'undefined') {
    CORE_GLOBAL_SCOPE.CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE = CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE;
  }
}
