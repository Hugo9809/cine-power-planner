/*
 * Cine Power Planner runtime support bridge.
 *
 * MIGRATED to pure ESM modules in Batch 11.
 * - Logic moved to: src/scripts/modules/runtime-support.js
 *
 * This file remains as a backwards-compatibility shim.
 */

import {
  DeviceSchema,
  Loader,
  Text,
  UI,
  resolvePreferredTemperatureStorageKey,
  resolveCoreSupportModule as resolveSupportModuleHelper,
  CORE_TEXT_ENTRY_TOOLS as TextEntryTools,
  CORE_TEXT_ENTRY_SEPARATOR as TextSeparator,
  normaliseTextEntryValue as normaliseText,
  resolveTextEntryRuntime as resolveText
} from '../modules/runtime-support.js';

import { collectCandidateScopes } from '../modules/helpers/scope-utils.js';

// --- Device Schema ---
export const CORE_DEVICE_SCHEMA = DeviceSchema;

// --- Runtime Module Loader ---
export function resolveRuntimeModuleLoader() {
  return Loader;
}

// --- Text Entry Tools ---
export const CORE_TEXT_ENTRY_TOOLS = TextEntryTools;
export const CORE_TEXT_ENTRY_SEPARATOR = TextSeparator;
export const normaliseTextEntryValue = normaliseText;
export const resolveTextEntryRuntime = resolveText;

// --- Temperature Storage Key ---
export const CORE_TEMPERATURE_STORAGE_KEY = resolvePreferredTemperatureStorageKey(collectCandidateScopes());

// --- Runtime Support Resolution (Shimmed) ---
// These specific objects were used by the legacy bootstrap process.
// We map them to the new ESM equivalents or null where deprecated.

export const CORE_RUNTIME_SUPPORT_BOOTSTRAP = null; // Deprecated
export const CORE_RUNTIME_SUPPORT_RESOLUTION = null; // Deprecated

export const CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE = {
  fallbackDetectRuntimeScope: (scope) => scope,
  fallbackResolveCoreSupportModule: resolveSupportModuleHelper
};

export const CORE_RUNTIME_SUPPORT_RESOLUTION_DEFAULTS = CORE_RUNTIME_SUPPORT_DEFAULTS_NAMESPACE;
export const CORE_RUNTIME_SUPPORT_RESOLUTION_TOOLS = null;
export const CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS = null;
export const CORE_RUNTIME_SUPPORT_FALLBACK_TOOLS = null;

export const fallbackDetectRuntimeScope = (scope) => scope;
export const detectRuntimeScope = (scope) => scope;
export const fallbackResolveCoreSupportModule = resolveSupportModuleHelper;

export const CORE_PART1_RUNTIME_SCOPE = (typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : {}));

export function resolveCoreSupportModule(namespaceName, requirePath) {
  return resolveSupportModuleHelper(namespaceName, requirePath, CORE_PART1_RUNTIME_SCOPE);
}

// Ensure Global Exposures for Legacy Code
const GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : null);
if (GLOBAL_SCOPE) {
  if (!GLOBAL_SCOPE.resolveTextEntryInternal) {
    GLOBAL_SCOPE.resolveTextEntryInternal = Text.resolveTextEntry;
  }
}
