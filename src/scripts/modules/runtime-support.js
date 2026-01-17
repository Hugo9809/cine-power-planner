/**
 * Cine Power Planner Runtime Support
 * 
 * Aggregates core runtime utilities into a single ESM entry point.
 * Replaces the monolithic dependency resolution of app-core-runtime-support.js.
 */

import * as textTools from './text.js';
import * as uiTools from './ui-helpers.js';
import * as deviceSchemaTools from './device-schema.js';
import { cineCoreRuntimeModuleLoader } from './runtime-module-loader.js';

// Re-export specific namespaces for clarity
export const Text = textTools;
export const UI = uiTools;
export const DeviceSchema = deviceSchemaTools;
export const Loader = cineCoreRuntimeModuleLoader;

// Legacy-aligned exports (snake_case or constant style where appropriate for shim usage)
export const CORE_TEXT_ENTRY_TOOLS = textTools;
export const CORE_TEXT_ENTRY_SEPARATOR = textTools.TEXT_ENTRY_SEPARATOR;
export const normaliseTextEntryValue = textTools.normaliseTextEntryValue;
export const resolveTextEntryRuntime = textTools.resolveTextEntry;

export const CORE_DEVICE_SCHEMA = DeviceSchema;

export const CORE_RUNTIME_SUPPORT_BOOTSTRAP = null; // To be migrated/resolved
export const CORE_RUNTIME_SUPPORT_RESOLUTION = null; // To be migrated/resolved

// Temperature Logic - ported from app-core-runtime-support.js
// We can expose the logic function here, and the shim can use it.
export const CORE_TEMPERATURE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_temperatureUnit';

export function resolvePreferredTemperatureStorageKey(scopeCandidates = []) {
    // Pure implementation that accepts candidates instead of finding them implicitly
    for (const scope of scopeCandidates) {
        if (!scope) continue;

        if (scope.TEMPERATURE_STORAGE_KEY) return scope.TEMPERATURE_STORAGE_KEY;
        if (scope.TEMPERATURE_UNIT_STORAGE_KEY) return scope.TEMPERATURE_UNIT_STORAGE_KEY;

        if (scope.CORE_SHARED?.TEMPERATURE_STORAGE_KEY) return scope.CORE_SHARED.TEMPERATURE_STORAGE_KEY;

        if (scope.__cineStorageApi) {
            if (scope.__cineStorageApi.TEMPERATURE_STORAGE_KEY) return scope.__cineStorageApi.TEMPERATURE_STORAGE_KEY;
            if (typeof scope.__cineStorageApi.getTemperaturePreferenceStorageKey === 'function') {
                try {
                    const key = scope.__cineStorageApi.getTemperaturePreferenceStorageKey();
                    if (key) return key;
                } catch (e) { void e; }
            }
        }

        if (typeof scope.resolveTemperatureStorageKey === 'function') {
            try {
                const key = scope.resolveTemperatureStorageKey();
                if (key) return key;
            } catch (e) { void e; }
        }
    }
    return CORE_TEMPERATURE_STORAGE_KEY_FALLBACK;
}
