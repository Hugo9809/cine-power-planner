/**
 * @fileoverview MOUNT VOLTAGE BOOTSTRAP
 * 
 * Provides global delegates and fallback state management for Mount Voltage preferences.
 * Extracted from legacy `globals-bootstrap.js`.
 * 
 * @module modules/globals-mount-voltage
 */

function resolveRuntime(scope) {
    if (scope && scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS && typeof scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS === 'object') {
        return scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS;
    }
    return null;
}

function resolveRuntimeFunction(scope, name) {
    const runtime = resolveRuntime(scope);
    if (runtime && typeof runtime[name] === 'function') {
        return runtime[name];
    }
    return null;
}

function assignGlobal(scope, name, value) {
    if (!scope || typeof value !== 'function') return;
    if (typeof scope[name] === 'function') return; // Don't overwrite existing
    try {
        scope[name] = value;
    } catch (e) { /* ignore */ }
}

// --- Fallback State Management ---

function normalizeMountVoltageDefaults(candidate) {
    const defaults = {};
    const types = ['V-Mount', 'Gold-Mount', 'B-Mount'];
    for (const type of types) {
        const source = candidate && candidate[type] ? candidate[type] : null;
        const high = source && typeof source.high === 'number' && Number.isFinite(source.high) ? source.high : (type === 'B-Mount' ? 33.6 : 14.4);
        const low = source && typeof source.low === 'number' && Number.isFinite(source.low) ? source.low : (type === 'B-Mount' ? 21.6 : 12);
        defaults[type] = { high, low };
    }
    return defaults;
}

function cloneWithDefaults(scope, source) {
    // We assume DEFAULT_MOUNT_VOLTAGES is already set by bootstrapGlobals
    const defaults = scope.DEFAULT_MOUNT_VOLTAGES || normalizeMountVoltageDefaults({});
    const types = scope.SUPPORTED_MOUNT_VOLTAGE_TYPES || ['V-Mount', 'Gold-Mount', 'B-Mount'];
    const result = {};

    const parseVal = (val, fallback) => {
        if (typeof val === 'number') return Math.round(Math.min(1000, Math.max(0.1, val)) * 100) / 100;
        if (typeof fallback === 'number') return Math.round(Math.min(1000, Math.max(0.1, fallback)) * 100) / 100;
        return 0;
    };

    for (const type of types) {
        const entry = source && source[type] ? source[type] : defaults[type];
        const defaultEntry = defaults[type] || { high: 0, low: 0 };
        result[type] = {
            high: parseVal(entry?.high, defaultEntry.high),
            low: parseVal(entry?.low, defaultEntry.low),
        };
    }
    return result;
}

function persistToStorage(scope, preferences) {
    try {
        if (!scope.localStorage) return false;
        const serialized = JSON.stringify(preferences);
        const key = scope.MOUNT_VOLTAGE_STORAGE_KEY || 'cameraPowerPlanner_mountVoltages';
        scope.localStorage.setItem(key, serialized);
        scope.localStorage.setItem(key + '__backup', serialized);
        return true;
    } catch { return false; }
}

// --- Bootstrap Function ---

export function bootstrapMountVoltageGlobals(scope) {
    if (!scope) return;

    // Initialize State (Closure per scope)
    const state = {
        preferences: cloneWithDefaults(scope, null),
        pendingPersist: false,
        pendingUpdate: false
    };

    // --- Fallbacks ---

    const fallbackParseVoltageValue = (value, fallback) => {
        let numeric = Number.parseFloat(String(value).replace(',', '.'));
        if (!Number.isFinite(numeric)) numeric = Number.parseFloat(String(fallback).replace(',', '.'));
        if (!Number.isFinite(numeric)) return 0;
        return Math.round(Math.min(1000, Math.max(0.1, numeric)) * 100) / 100;
    };

    const fallbackCloneMountVoltageMap = (source) => {
        const runtimeFn = resolveRuntimeFunction(scope, 'cloneMountVoltageMap');
        if (runtimeFn) return runtimeFn(source);
        return cloneWithDefaults(scope, source);
    };

    const fallbackApplyMountVoltagePreferences = (preferences, options) => {
        const runtimeFn = resolveRuntimeFunction(scope, 'applyMountVoltagePreferences');
        if (runtimeFn) return runtimeFn(preferences, options);

        state.preferences = cloneWithDefaults(scope, preferences);
        if (options?.persist !== false) {
            persistToStorage(scope, state.preferences);
        }
        return state.preferences;
    };

    const fallbackParseStoredMountVoltages = (raw) => {
        const runtimeFn = resolveRuntimeFunction(scope, 'parseStoredMountVoltages');
        if (runtimeFn) return runtimeFn(raw);
        if (!raw) return null;
        try {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            return cloneWithDefaults(scope, parsed);
        } catch { return null; }
    };

    // --- Delegate Creator ---
    const createDelegate = (name, fallback) => {
        return function (...args) {
            const runtimeFn = resolveRuntimeFunction(scope, name);
            if (runtimeFn) {
                // Self-promote if currently assigned to this delegate
                if (scope[name] === thisFunction) scope[name] = runtimeFn;
                return runtimeFn.apply(this, args);
            }
            return fallback.apply(this, args);
        };
        // Reference for self-promotion check
        const thisFunction = arguments.callee || fallback; // strict mode issue?
        // Actually, we can't easily reference 'thisFunction' inside definition without naming it
    };

    // Better delegate creator
    function makeDelegate(name, fallback) {
        const delegate = function (...args) {
            const runtimeFn = resolveRuntimeFunction(scope, name);
            if (runtimeFn) return runtimeFn.apply(this, args);
            return fallback.apply(this, args);
        };
        return delegate;
    }

    assignGlobal(scope, 'parseVoltageValue', makeDelegate('parseVoltageValue', fallbackParseVoltageValue));
    assignGlobal(scope, 'cloneMountVoltageMap', makeDelegate('cloneMountVoltageMap', fallbackCloneMountVoltageMap));
    assignGlobal(scope, 'applyMountVoltagePreferences', makeDelegate('applyMountVoltagePreferences', fallbackApplyMountVoltagePreferences));
    assignGlobal(scope, 'parseStoredMountVoltages', makeDelegate('parseStoredMountVoltages', fallbackParseStoredMountVoltages));

    // Simple pass-throughs or no-ops for others to save space/complexity as they are rare
    assignGlobal(scope, 'resetMountVoltagePreferences', makeDelegate('resetMountVoltagePreferences', (opts) => fallbackApplyMountVoltagePreferences(null, opts)));
    assignGlobal(scope, 'updateMountVoltageInputsFromState', makeDelegate('updateMountVoltageInputsFromState', () => { }));
    assignGlobal(scope, 'persistMountVoltagePreferences', makeDelegate('persistMountVoltagePreferences', (prefs) => persistToStorage(scope, prefs)));
    assignGlobal(scope, 'getMountVoltagePreferencesClone', makeDelegate('getMountVoltagePreferencesClone', () => cloneWithDefaults(scope, state.preferences)));

    // Ensure container for visual inputs
    if (typeof scope.mountVoltageInputs === 'undefined') scope.mountVoltageInputs = null;
}
