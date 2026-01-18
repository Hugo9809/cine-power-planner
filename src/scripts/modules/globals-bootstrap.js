/**
 * @fileoverview CORE MODULE: Global Scope Bootstrap
 * 
 * Ensures critical global state variables exist, are type-safe, and persist across reloads.
 * Replaces the legacy `globals-bootstrap.js` logic with a testable, scoped ESM module.
 * 
 * @module modules/globals-bootstrap
 */

import { bootstrapMountVoltageGlobals } from './globals-mount-voltage.js';

function __cineIsArray(value) {
    return Array.isArray(value);
}

function __cineToFiniteInteger(candidate) {
    if (candidate === null || typeof candidate === 'undefined') return null;
    const numeric = Number(candidate);
    if (!Number.isFinite(numeric)) return null;
    const rounded = Math.round(numeric);
    return Number.isFinite(rounded) ? rounded : null;
}

function __cineResolveGlobalValue(scope, name, fallback) {
    let value;
    try {
        value = scope[name];
    } catch (e) { /* ignore */ }
    return typeof value === 'undefined' ? fallback : value;
}

function __cineCommitGlobalValue(scope, name, value) {
    try {
        scope[name] = value;
    } catch (e) { /* ignore */ }
    return value;
}

function ensureString(scope, name, fallback = '') {
    let value = __cineResolveGlobalValue(scope, name);
    if (typeof value !== 'string') value = fallback;
    return __cineCommitGlobalValue(scope, name, value);
}

function ensureArray(scope, name) {
    let value = __cineResolveGlobalValue(scope, name);
    if (!Array.isArray(value)) value = [];
    return __cineCommitGlobalValue(scope, name, value);
}

function ensureFunction(scope, name, fallback) {
    let value = __cineResolveGlobalValue(scope, name);
    if (typeof value !== 'function') value = fallback;
    return __cineCommitGlobalValue(scope, name, value);
}

function ensureNullableObject(scope, name) {
    let value = __cineResolveGlobalValue(scope, name);
    if (typeof value === 'undefined') value = null;
    return __cineCommitGlobalValue(scope, name, value);
}

// Logic Helpers

function resolveRetentionBounds(scope) {
    const min = resolveAutoGearBackupRetentionMin(scope);
    let max = null;
    const candidates = [];

    if (Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_MAX')) candidates.push(scope.AUTO_GEAR_BACKUP_RETENTION_MAX);
    if (Object.prototype.hasOwnProperty.call(scope, 'MAX_AUTO_BACKUPS')) candidates.push(scope.MAX_AUTO_BACKUPS);
    if (scope.__cineStorageApi && Object.prototype.hasOwnProperty.call(scope.__cineStorageApi, 'AUTO_GEAR_BACKUP_RETENTION_MAX')) {
        candidates.push(scope.__cineStorageApi.AUTO_GEAR_BACKUP_RETENTION_MAX);
    }

    for (const cand of candidates) {
        const norm = __cineToFiniteInteger(cand);
        if (typeof norm !== 'number') continue;
        const bounded = norm < min ? min : norm;
        if (max === null || bounded > max) max = bounded;
    }

    if (max === null) max = Math.max(min, 120);
    return { min, max };
}

function resolveAutoGearBackupRetentionMin(scope) {
    const candidates = [];
    if (Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_MIN')) candidates.push(scope.AUTO_GEAR_BACKUP_RETENTION_MIN);
    if (scope.__cineStorageApi && Object.prototype.hasOwnProperty.call(scope.__cineStorageApi, 'AUTO_GEAR_BACKUP_RETENTION_MIN')) {
        candidates.push(scope.__cineStorageApi.AUTO_GEAR_BACKUP_RETENTION_MIN);
    }

    for (const cand of candidates) {
        const norm = __cineToFiniteInteger(cand);
        if (typeof norm === 'number' && norm >= 1) return norm < 1 ? 1 : norm;
    }
    return 1;
}

function resolveAutoGearBackupRetentionDefault(scope) {
    const bounds = resolveRetentionBounds(scope);
    const min = bounds.min;
    const max = bounds.max;
    const accessors = [];

    if (typeof scope.getAutoGearBackupRetentionDefault === 'function') {
        accessors.push(() => scope.getAutoGearBackupRetentionDefault());
    }
    if (scope.__cineStorageApi && typeof scope.__cineStorageApi.getAutoGearBackupRetentionDefault === 'function') {
        accessors.push(() => scope.__cineStorageApi.getAutoGearBackupRetentionDefault());
    }
    accessors.push(() => Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_DEFAULT') ? scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT : null);

    for (const accessor of accessors) {
        try {
            const val = __cineToFiniteInteger(accessor());
            if (typeof val === 'number') {
                if (val < min) return min;
                if (val > max) return max;
                return val;
            }
        } catch (e) { /* ignore */ }
    }

    let fallback = __cineToFiniteInteger(36);
    if (typeof fallback !== 'number') fallback = min;
    if (fallback < min) fallback = min;
    if (fallback > max) fallback = max;
    return fallback;
}

function fallbackSafeGenerateConnectorSummary(device) {
    if (!device || typeof device !== 'object') return '';
    try {
        const keys = Object.keys(device);
        if (!keys.length) return '';
        const primaryKey = keys[0];
        const value = device[primaryKey];
        const label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
        return value ? `${label}: ${value}` : label;
    } catch { return ''; }
}

function fallbackLocaleSort(a, b) {
    const strA = a == null ? '' : String(a);
    const strB = b == null ? '' : String(b);
    try {
        return strA.localeCompare(strB, undefined, { sensitivity: 'accent', numeric: true });
    } catch {
        if (strA < strB) return -1;
        if (strA > strB) return 1;
        return 0;
    }
}

// Mount Voltage Helpers
function normalizeMountVoltageDefaults(candidate) {
    const defaults = {};
    const types = ['V-Mount', 'Gold-Mount', 'B-Mount']; // Hardcoded base types as fallback
    for (const type of types) {
        const source = candidate && candidate[type] ? candidate[type] : null;
        const high = source && typeof source.high === 'number' && Number.isFinite(source.high) ? source.high : (type === 'B-Mount' ? 33.6 : 14.4);
        const low = source && typeof source.low === 'number' && Number.isFinite(source.low) ? source.low : (type === 'B-Mount' ? 21.6 : 12);
        defaults[type] = { high, low };
    }
    return defaults;
}

/**
 * Main Bootstrap Function
 * @param {Object} scope - The global scope (window, self, globalThis, or mock)
 */
export function bootstrapGlobals(scope) {
    if (!scope || typeof scope !== 'object') return;

    // -- Core Runtime Globals --
    ensureString(scope, 'autoGearAutoPresetId', '');
    ensureArray(scope, 'baseAutoGearRules');
    ensureNullableObject(scope, 'autoGearScenarioModeSelect');
    ensureNullableObject(scope, 'autoGearRuleNameInput');
    ensureString(scope, 'autoGearSummaryFocus', 'all');
    ensureArray(scope, 'autoGearMonitorDefaultControls');
    ensureNullableObject(scope, 'iosPwaHelpDialog');
    ensureNullableObject(scope, 'iosPwaHelpClose');
    ensureNullableObject(scope, 'totalPowerElem');

    ensureFunction(scope, 'safeGenerateConnectorSummary', fallbackSafeGenerateConnectorSummary);

    ensureNullableObject(scope, 'CORE_RUNTIME_SHARED');
    ensureNullableObject(scope, 'CORE_GLOBAL_SCOPE');
    ensureNullableObject(scope, 'autoGearAddOwnGearSelect');
    ensureNullableObject(scope, 'autoGearRemoveOwnGearSelect');
    ensureNullableObject(scope, 'newSubcategorySelect');

    ensureFunction(scope, 'syncAutoGearMonitorFieldVisibility', () => { });

    ensureString(scope, 'currentLang', 'en');
    ensureFunction(scope, 'localeSort', fallbackLocaleSort);

    // Retention Resolvers (Bind to scope and self-update scope on run)
    ensureFunction(scope, 'resolveAutoGearBackupRetentionMin', () => {
        const val = resolveAutoGearBackupRetentionMin(scope);
        if (scope && (typeof scope.AUTO_GEAR_BACKUP_RETENTION_MIN !== 'number' || !Number.isFinite(scope.AUTO_GEAR_BACKUP_RETENTION_MIN))) {
            scope.AUTO_GEAR_BACKUP_RETENTION_MIN = val;
        }
        return val;
    });

    ensureFunction(scope, 'resolveAutoGearBackupRetentionDefault', () => {
        const val = resolveAutoGearBackupRetentionDefault(scope);
        if (scope && (typeof scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'number' || !Number.isFinite(scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT))) {
            scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = val;
        }
        return val;
    });

    // Language Texts
    ensureFunction(scope, 'getLanguageTexts', (lang) => {
        // Simplified robust fallback logic
        const texts = scope.texts || {};
        const candidate = (lang || scope.DEFAULT_LANGUAGE || 'en').trim().toLowerCase();

        if (texts[candidate]) return texts[candidate];
        const short = candidate.substring(0, 2);
        if (texts[short]) return texts[short];
        if (texts.en) return texts.en;
        return Object.values(texts)[0] || {};
    });

    ensureFunction(scope, 'resolveTextEntry', (primary, fallback, key, defaultVal) => {
        const dicts = [primary, fallback].filter(d => d && typeof d === 'object');
        for (const d of dicts) {
            try {
                const val = d[key];
                if (typeof val === 'string' && val.trim()) return val.trim();
            } catch { /* ignore */ }
        }
        return defaultVal !== undefined ? String(defaultVal) : '';
    });

    // -- Temperature --
    ensureString(scope, 'TEMPERATURE_STORAGE_KEY', 'cameraPowerPlanner_temperatureUnit');
    ensureFunction(scope, 'resolveTemperatureStorageKey', () => scope.TEMPERATURE_STORAGE_KEY);

    // Temperature Units (Normalize existing or default)
    const existingUnits = scope.TEMPERATURE_UNITS;
    const normalizedUnits = {
        celsius: (existingUnits?.celsius || 'celsius').trim().toLowerCase(),
        fahrenheit: (existingUnits?.fahrenheit || 'fahrenheit').trim().toLowerCase()
    };
    __cineCommitGlobalValue(scope, 'TEMPERATURE_UNITS', normalizedUnits);

    // Temperature Scenarios
    const existingScenarios = __cineResolveGlobalValue(scope, 'TEMPERATURE_SCENARIOS', []);
    const normalizedScenarios = Array.isArray(existingScenarios) ? existingScenarios.filter(s => s && s.id && s.key && s.label) : [];
    __cineCommitGlobalValue(scope, 'TEMPERATURE_SCENARIOS', normalizedScenarios);

    // Feedback Limits
    __cineCommitGlobalValue(scope, 'FEEDBACK_TEMPERATURE_MIN', -20);
    __cineCommitGlobalValue(scope, 'FEEDBACK_TEMPERATURE_MAX_LIMIT', 50);

    // Focus Scale
    ensureString(scope, 'FOCUS_SCALE_STORAGE_KEY', 'cameraPowerPlanner_focusScale');
    ensureArray(scope, 'FOCUS_SCALE_VALUES');
    if (scope.FOCUS_SCALE_VALUES.length === 0) scope.FOCUS_SCALE_VALUES = ['metric', 'imperial'];

    // Mount Voltages
    ensureArray(scope, 'SUPPORTED_MOUNT_VOLTAGE_TYPES');
    if (scope.SUPPORTED_MOUNT_VOLTAGE_TYPES.length === 0) scope.SUPPORTED_MOUNT_VOLTAGE_TYPES = ['V-Mount', 'Gold-Mount', 'B-Mount'];

    ensureNullableObject(scope, 'DEFAULT_MOUNT_VOLTAGES');
    if (!scope.DEFAULT_MOUNT_VOLTAGES) {
        scope.DEFAULT_MOUNT_VOLTAGES = normalizeMountVoltageDefaults({});
    }

    ensureNullableObject(scope, 'MOUNT_VOLTAGE_RUNTIME_EXPORTS');
    if (!scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS) scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS = {};

    // Bootstrap Global Delegates
    bootstrapMountVoltageGlobals(scope);

    ensureFunction(scope, 'syncMountVoltageResetButtonGlobal', (val) => {
        if (scope.cineCoreMountVoltage?.syncMountVoltageResetButtonGlobal) {
            scope.cineCoreMountVoltage.syncMountVoltageResetButtonGlobal(val);
        } else {
            scope.mountVoltageResetButton = val;
        }
        return val;
    });
}
