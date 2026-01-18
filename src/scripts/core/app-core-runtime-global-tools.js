/*
 * Cine Power Planner runtime global tool bridge.
 *
 * MIGRATED to pure ESM modules in Batch 11.
 * - Scope Logic -> modules/helpers/scope-utils.js
 * - Deep Clone -> modules/helpers/deep-clone.js
 *
 * This file remains as a shim for legacy code.
 */

import {
  detectGlobalScope,
  resolveFromScopes,
  getCachedGlobalValue,
  safeAssign
} from '../modules/helpers/scope-utils.js';

import {
  jsonDeepClone,
  createResilientDeepClone,
  ensureDeepClone,
  CORE_DEEP_CLONE as DeepCloneExport
} from '../modules/helpers/deep-clone.js';

// --- Scope Adapters ---

const CORE_GLOBAL_SCOPE = detectGlobalScope();

export function getCoreGlobalObject() {
  return detectGlobalScope();
}

export function ensureCoreGlobalValue(name, fallbackValue) {
  if (!name) return undefined;

  const scope = detectGlobalScope();
  if (!scope) {
    return typeof fallbackValue === 'function' ? fallbackValue() : fallbackValue;
  }

  if (typeof scope[name] !== 'undefined') {
    return scope[name];
  }

  const value = typeof fallbackValue === 'function' ? fallbackValue() : fallbackValue;
  safeAssign(scope, name, value);
  return value;
}

// --- Deep Clone Adapters ---

const coreJsonDeepClone = jsonDeepClone;
const coreCreateResilientDeepClone = createResilientDeepClone;
export const CORE_DEEP_CLONE = DeepCloneExport;

export const CORE_RUNTIME_GLOBAL_TOOLS = {
  getCoreGlobalObject,
  ensureCoreGlobalValue,
  jsonDeepClone: coreJsonDeepClone,
  createResilientDeepClone: coreCreateResilientDeepClone,
  ensureDeepClone,
  CORE_DEEP_CLONE,
  CORE_GLOBAL_SCOPE
};

// Check for legacy Fallbacks object and stub if needed (though mostly unused now)
export const CORE_RUNTIME_TOOL_FALLBACKS = {
  getCoreGlobalObject,
  ensureCoreGlobalValue,
  jsonDeepClone,
  createResilientDeepClone,
  ensureDeepClone
};

// Global Injection for Legacy Compatibility
if (CORE_GLOBAL_SCOPE) {
  if (!CORE_GLOBAL_SCOPE.cineCoreRuntimeGlobalTools) {
    CORE_GLOBAL_SCOPE.cineCoreRuntimeGlobalTools = CORE_RUNTIME_GLOBAL_TOOLS;
  }
  if (!CORE_GLOBAL_SCOPE.ensureCoreGlobalValue) {
    CORE_GLOBAL_SCOPE.ensureCoreGlobalValue = ensureCoreGlobalValue;
  }
  if (!CORE_GLOBAL_SCOPE.getCoreGlobalObject) {
    CORE_GLOBAL_SCOPE.getCoreGlobalObject = getCoreGlobalObject;
  }
  if (!CORE_GLOBAL_SCOPE.CORE_DEEP_CLONE) {
    CORE_GLOBAL_SCOPE.CORE_DEEP_CLONE = CORE_DEEP_CLONE;
  }
}

export default CORE_RUNTIME_GLOBAL_TOOLS;
