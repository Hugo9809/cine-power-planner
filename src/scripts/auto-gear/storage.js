/*
 * Auto Gear persistence helpers extracted from the runtime so they can be
 * exercised directly in unit tests without loading the UI.
 */
// @ts-nocheck
/* global loadAutoGearBackups,
  normalizeAutoGearBackupEntry, loadAutoGearPresets, normalizeAutoGearPreset,
  saveAutoGearPresets, loadAutoGearMonitorDefaults,
  saveAutoGearMonitorDefaults,
  normalizeAutoGearMonitorDefaults,
  loadAutoGearActivePresetId, saveAutoGearActivePresetId,
  loadAutoGearAutoPresetId, saveAutoGearAutoPresetId,
  loadAutoGearBackupVisibility, saveAutoGearBackupVisibility,
  loadAutoGearBackupRetention, saveAutoGearBackupRetention,
  saveAutoGearBackups, autoGearBackupRetention, callCoreFunctionIfAvailable,
  autoGearBackupRetentionInput, autoGearBackups, normalizeAutoGearRule,
  loadAutoGearRules */
var AUTO_GEAR_BACKUP_RETENTION_FALLBACK_DEFAULT = 36;
var AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN = 1;
var AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MAX = 120;
var AUTO_GEAR_PERSISTENCE_MODULE_NAME = 'cineAutoGearPersistence';
var AUTO_GEAR_BACKUP_GLOBAL_SCOPE = (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;
function readScopedNumericAutoGearValue(name) {
    if (!AUTO_GEAR_BACKUP_GLOBAL_SCOPE) {
        return null;
    }
    var value = AUTO_GEAR_BACKUP_GLOBAL_SCOPE[name];
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
function resolveAutoGearPersistenceService() {
    var scopes = [];
    if (typeof globalThis !== 'undefined')
        scopes.push(globalThis);
    if (typeof window !== 'undefined')
        scopes.push(window);
    if (typeof self !== 'undefined')
        scopes.push(self);
    if (typeof global !== 'undefined')
        scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function'))
            continue;
        if (scope.cineAutoGearPersistence)
            return scope.cineAutoGearPersistence;
        var registry = scope.cineModules;
        if (registry && typeof registry.get === 'function') {
            var module = registry.get(AUTO_GEAR_PERSISTENCE_MODULE_NAME);
            if (module)
                return module;
        }
    }
    return null;
}
function scheduleAutoGearPersistence(name, payload) {
    var service = resolveAutoGearPersistenceService();
    if (!service || typeof service[name] !== 'function') {
        return null;
    }
    var pending = service[name](payload);
    if (pending && typeof pending.catch === 'function') {
        pending.catch(function (error) {
            console.warn("Auto-Gear persistence failed for ".concat(name), error);
        });
    }
    return pending;
}
function normalizeRetentionCandidate(value, minValue, maxValue) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        return null;
    }
    var rounded = Math.round(value);
    if (!Number.isFinite(rounded)) {
        return null;
    }
    if (rounded < minValue) {
        return minValue;
    }
    if (rounded > maxValue) {
        return maxValue;
    }
    return rounded;
}
function resolveAutoGearBackupRetentionMinValue() {
    var scopedMinValue = readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE');
    if (scopedMinValue !== null) {
        return Math.max(AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN, Math.round(scopedMinValue));
    }
    var scopedMin = readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MIN');
    if (scopedMin !== null) {
        return Math.max(AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN, Math.round(scopedMin));
    }
    return AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN;
}
function resolveAutoGearBackupRetentionMaxValue() {
    var scopedMax = readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MAX');
    if (scopedMax !== null) {
        return Math.max(resolveAutoGearBackupRetentionMinValue(), Math.round(scopedMax));
    }
    return Math.max(resolveAutoGearBackupRetentionMinValue(), AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MAX);
}
function resolveAutoGearBackupRetentionDefaultValue() {
    var minValue = resolveAutoGearBackupRetentionMinValue();
    var maxValue = resolveAutoGearBackupRetentionMaxValue();
    var candidates = [
        readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT'),
        readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE'),
        AUTO_GEAR_BACKUP_RETENTION_FALLBACK_DEFAULT,
    ];
    for (var index = 0; index < candidates.length; index += 1) {
        var candidate = candidates[index];
        var normalized = normalizeRetentionCandidate(candidate, minValue, maxValue);
        if (typeof normalized === 'number') {
            return normalized;
        }
    }
    return minValue;
}
function readAutoGearBackupsFromStorage(retentionLimit) {
    if (retentionLimit === void 0) { retentionLimit = resolveAutoGearBackupRetentionDefaultValue(); }
    var stored = [];
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readAutoGearBackups === 'function') {
        stored = service.readAutoGearBackups();
    }
    else if (typeof loadAutoGearBackups === 'function') {
        try {
            stored = loadAutoGearBackups();
        }
        catch (error) {
            console.warn('Failed to load automatic gear backups', error);
            stored = [];
        }
    }
    if (!Array.isArray(stored))
        return [];
    var limit = clampAutoGearBackupRetentionLimit(retentionLimit);
    return stored
        .map(normalizeAutoGearBackupEntry)
        .filter(Boolean)
        .sort(function (a, b) {
        if (a.createdAt === b.createdAt)
            return 0;
        return a.createdAt > b.createdAt ? -1 : 1;
    })
        .slice(0, limit);
}
function sortAutoGearPresets(list) {
    return list.sort(function (a, b) { return a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true }); });
}
function readAutoGearPresetsFromStorage() {
    var stored = [];
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readAutoGearPresets === 'function') {
        stored = service.readAutoGearPresets();
    }
    else if (typeof loadAutoGearPresets === 'function') {
        try {
            stored = loadAutoGearPresets();
        }
        catch (error) {
            console.warn('Failed to load automatic gear presets', error);
            stored = [];
        }
    }
    if (!Array.isArray(stored))
        return [];
    return sortAutoGearPresets(stored.map(normalizeAutoGearPreset).filter(Boolean));
}
function persistAutoGearPresets(presets) {
    var payload = Array.isArray(presets)
        ? presets.map(function (preset) { return ({
            id: preset.id,
            label: preset.label,
            rules: Array.isArray(preset.rules) ? preset.rules : [],
        }); })
        : [];
    if (scheduleAutoGearPersistence('persistAutoGearPresets', payload)) {
        return;
    }
    if (typeof saveAutoGearPresets === 'function') {
        try {
            saveAutoGearPresets(payload);
            return;
        }
        catch (error) {
            console.warn('Failed to save automatic gear presets', error);
        }
    }
}
function readAutoGearMonitorDefaultsFromStorage() {
    var stored = {};
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readAutoGearMonitorDefaults === 'function') {
        stored = service.readAutoGearMonitorDefaults();
    }
    else if (typeof loadAutoGearMonitorDefaults === 'function') {
        try {
            stored = loadAutoGearMonitorDefaults();
        }
        catch (error) {
            console.warn('Failed to load automatic gear monitor defaults', error);
            stored = {};
        }
    }
    return normalizeAutoGearMonitorDefaults(stored);
}
function persistAutoGearMonitorDefaults(defaults) {
    var payload = normalizeAutoGearMonitorDefaults(defaults);
    if (scheduleAutoGearPersistence('persistAutoGearMonitorDefaults', payload)) {
        return payload;
    }
    if (typeof saveAutoGearMonitorDefaults === 'function') {
        try {
            saveAutoGearMonitorDefaults(payload);
            return payload;
        }
        catch (error) {
            console.warn('Failed to save automatic gear monitor defaults', error);
        }
    }
    return payload;
}
function readActiveAutoGearPresetIdFromStorage() {
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readActivePresetId === 'function') {
        return service.readActivePresetId();
    }
    if (typeof loadAutoGearActivePresetId === 'function') {
        try {
            var loaderPresetId = loadAutoGearActivePresetId();
            return typeof loaderPresetId === 'string' ? loaderPresetId : '';
        }
        catch (error) {
            console.warn('Failed to load automatic gear active preset id', error);
            return '';
        }
    }
    return '';
}
function persistActiveAutoGearPresetId(presetId) {
    if (scheduleAutoGearPersistence('persistActivePresetId', presetId)) {
        return;
    }
    if (typeof saveAutoGearActivePresetId === 'function') {
        try {
            saveAutoGearActivePresetId(typeof presetId === 'string' ? presetId : '');
            return;
        }
        catch (error) {
            console.warn('Failed to save automatic gear active preset id', error);
        }
    }
}
function readAutoGearAutoPresetIdFromStorage() {
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readAutoPresetId === 'function') {
        return service.readAutoPresetId();
    }
    if (typeof loadAutoGearAutoPresetId === 'function') {
        try {
            var loaderAutoPresetId = loadAutoGearAutoPresetId();
            return typeof loaderAutoPresetId === 'string' ? loaderAutoPresetId : '';
        }
        catch (error) {
            console.warn('Failed to load automatic gear auto preset id', error);
            return '';
        }
    }
    return '';
}
function persistAutoGearAutoPresetId(presetId) {
    if (scheduleAutoGearPersistence('persistAutoPresetId', presetId)) {
        return;
    }
    if (typeof saveAutoGearAutoPresetId === 'function') {
        try {
            saveAutoGearAutoPresetId(typeof presetId === 'string' ? presetId : '');
            return;
        }
        catch (error) {
            console.warn('Failed to save automatic gear auto preset id', error);
        }
    }
}
function readAutoGearBackupVisibilityFromStorage() {
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readBackupVisibility === 'function') {
        return service.readBackupVisibility();
    }
    if (typeof loadAutoGearBackupVisibility === 'function') {
        try {
            return !!loadAutoGearBackupVisibility();
        }
        catch (error) {
            console.warn('Failed to load automatic gear backup visibility', error);
            return false;
        }
    }
    return false;
}
function persistAutoGearBackupVisibility(flag) {
    var enabled = !!flag;
    if (scheduleAutoGearPersistence('persistBackupVisibility', enabled)) {
        return;
    }
    if (typeof saveAutoGearBackupVisibility === 'function') {
        try {
            saveAutoGearBackupVisibility(enabled);
            return;
        }
        catch (error) {
            console.warn('Failed to save automatic gear backup visibility', error);
        }
    }
}
function clampAutoGearBackupRetentionLimit(value) {
    var numeric = Number(value);
    if (!Number.isFinite(numeric)) {
        return resolveAutoGearBackupRetentionDefaultValue();
    }
    var rounded = Math.round(numeric);
    if (!Number.isFinite(rounded)) {
        return resolveAutoGearBackupRetentionDefaultValue();
    }
    var minValue = resolveAutoGearBackupRetentionMinValue();
    var maxValue = resolveAutoGearBackupRetentionMaxValue();
    if (rounded < minValue) {
        return minValue;
    }
    if (rounded > maxValue) {
        return maxValue;
    }
    return rounded;
}
function readAutoGearBackupRetentionFromStorage() {
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readBackupRetention === 'function') {
        var cached = service.readBackupRetention();
        if (cached !== null && typeof cached !== 'undefined') {
            return clampAutoGearBackupRetentionLimit(cached);
        }
    }
    if (typeof loadAutoGearBackupRetention === 'function') {
        try {
            return clampAutoGearBackupRetentionLimit(loadAutoGearBackupRetention());
        }
        catch (error) {
            console.warn('Failed to load automatic gear backup retention', error);
        }
    }
    return resolveAutoGearBackupRetentionDefaultValue();
}
function persistAutoGearBackupRetention(retention) {
    var normalized = clampAutoGearBackupRetentionLimit(retention);
    if (scheduleAutoGearPersistence('persistBackupRetention', normalized)) {
        return true;
    }
    if (typeof saveAutoGearBackupRetention === 'function') {
        try {
            saveAutoGearBackupRetention(normalized);
            return true;
        }
        catch (error) {
            console.warn('Failed to save automatic gear backup retention', error);
        }
    }
    return false;
}
function persistAutoGearBackups(backups) {
    var payload = Array.isArray(backups)
        ? backups.map(function (entry) { return ({
            id: entry.id,
            createdAt: entry.createdAt,
            rules: Array.isArray(entry.rules) ? entry.rules : [],
            monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults),
            note: typeof entry.note === 'string' ? entry.note : undefined,
        }); })
        : [];
    if (scheduleAutoGearPersistence('persistAutoGearBackups', payload)) {
        return payload;
    }
    if (typeof saveAutoGearBackups === 'function') {
        var storedPayload = saveAutoGearBackups(payload);
        return Array.isArray(storedPayload) ? storedPayload : payload;
    }
    throw new Error('Storage unavailable');
}
function assignAutoGearGlobalValue(name, nextValue) {
    var scopes = [];
    if (typeof globalThis !== 'undefined')
        scopes.push(globalThis);
    if (typeof window !== 'undefined')
        scopes.push(window);
    if (typeof self !== 'undefined')
        scopes.push(self);
    if (typeof global !== 'undefined')
        scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!scope)
            continue;
        if (Object.prototype.hasOwnProperty.call(scope, name)) {
            scope[name] = nextValue;
            return true;
        }
    }
    return false;
}
function enforceAutoGearBackupRetentionLimit(limit) {
    var normalized = clampAutoGearBackupRetentionLimit(limit);
    var previousLimit = autoGearBackupRetention;
    if (normalized === previousLimit) {
        callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
        return { success: true, trimmed: [], previousLimit: previousLimit };
    }
    var previousBackups = autoGearBackups.slice();
    var trimmedEntries = [];
    var retentionPersisted = persistAutoGearBackupRetention(normalized);
    if (!retentionPersisted) {
        autoGearBackupRetentionInput && (autoGearBackupRetentionInput.value = String(autoGearBackupRetention));
        callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
        return { success: false, error: new Error('retention-persist-failed'), previousLimit: previousLimit };
    }
    assignAutoGearGlobalValue('autoGearBackupRetention', normalized);
    if (autoGearBackups.length > normalized) {
        var updatedBackups = autoGearBackups.slice(0, normalized);
        trimmedEntries.push.apply(trimmedEntries, autoGearBackups.slice(normalized));
        try {
            var persistedBackups = persistAutoGearBackups(updatedBackups) || [];
            var finalBackups = Array.isArray(persistedBackups) ? persistedBackups : [];
            if (finalBackups.length < updatedBackups.length) {
                trimmedEntries.push.apply(trimmedEntries, updatedBackups.slice(finalBackups.length));
            }
            assignAutoGearGlobalValue('autoGearBackups', finalBackups);
        }
        catch (error) {
            console.warn('Failed to trim automatic gear backups to retention limit', error);
            assignAutoGearGlobalValue('autoGearBackupRetention', previousLimit);
            persistAutoGearBackupRetention(previousLimit);
            try {
                persistAutoGearBackups(previousBackups);
            }
            catch (restoreError) {
                console.warn('Failed to restore automatic gear backups after trim error', restoreError);
            }
            assignAutoGearGlobalValue('autoGearBackups', readAutoGearBackupsFromStorage(previousLimit));
            callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
            callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
            return { success: false, error: error, previousLimit: previousLimit };
        }
    }
    callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
    callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
    return { success: true, trimmed: trimmedEntries, previousLimit: previousLimit };
}
function readAutoGearRulesFromStorage() {
    var stored = [];
    var service = resolveAutoGearPersistenceService();
    if (service && typeof service.readAutoGearRules === 'function') {
        stored = service.readAutoGearRules();
    }
    else if (typeof loadAutoGearRules !== 'undefined' && typeof loadAutoGearRules === 'function') {
        try {
            stored = loadAutoGearRules();
        }
        catch (error) {
            console.warn('Failed to load automatic gear rules', error);
            stored = [];
        }
    }
    if (!Array.isArray(stored))
        return [];
    return stored.map(normalizeAutoGearRule).filter(Boolean);
}
var AUTO_GEAR_STORAGE_EXPORTS = {
    readAutoGearBackupsFromStorage: readAutoGearBackupsFromStorage,
    readAutoGearPresetsFromStorage: readAutoGearPresetsFromStorage,
    persistAutoGearPresets: persistAutoGearPresets,
    normalizeAutoGearMonitorDefaults: normalizeAutoGearMonitorDefaults,
    readAutoGearMonitorDefaultsFromStorage: readAutoGearMonitorDefaultsFromStorage,
    persistAutoGearMonitorDefaults: persistAutoGearMonitorDefaults,
    readActiveAutoGearPresetIdFromStorage: readActiveAutoGearPresetIdFromStorage,
    persistActiveAutoGearPresetId: persistActiveAutoGearPresetId,
    readAutoGearAutoPresetIdFromStorage: readAutoGearAutoPresetIdFromStorage,
    persistAutoGearAutoPresetId: persistAutoGearAutoPresetId,
    readAutoGearBackupVisibilityFromStorage: readAutoGearBackupVisibilityFromStorage,
    persistAutoGearBackupVisibility: persistAutoGearBackupVisibility,
    clampAutoGearBackupRetentionLimit: clampAutoGearBackupRetentionLimit,
    readAutoGearBackupRetentionFromStorage: readAutoGearBackupRetentionFromStorage,
    persistAutoGearBackupRetention: persistAutoGearBackupRetention,
    persistAutoGearBackups: persistAutoGearBackups,
    enforceAutoGearBackupRetentionLimit: enforceAutoGearBackupRetentionLimit,
    readAutoGearRulesFromStorage: readAutoGearRulesFromStorage,
};
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AUTO_GEAR_STORAGE_EXPORTS;
}
if (typeof globalThis !== 'undefined') {
    var target = (typeof globalThis.AUTO_GEAR_STORAGE_EXPORTS === 'object'
        && globalThis.AUTO_GEAR_STORAGE_EXPORTS)
        ? globalThis.AUTO_GEAR_STORAGE_EXPORTS
        : (globalThis.AUTO_GEAR_STORAGE_EXPORTS = {});
    Object.assign(target, AUTO_GEAR_STORAGE_EXPORTS);
}
(function () {
    var candidateScopes = [
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
    ];
    var assignGlobal = function (scope, name, value) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function'))
            return;
        if (typeof scope[name] === 'function')
            return;
        try {
            scope[name] = value;
        }
        catch (assignError) {
            void assignError;
            try {
                Object.defineProperty(scope, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: value,
                });
            }
            catch (defineError) {
                void defineError;
            }
        }
    };
    var exportKeys = Object.keys(AUTO_GEAR_STORAGE_EXPORTS);
    for (var scopeIndex = 0; scopeIndex < candidateScopes.length; scopeIndex += 1) {
        var scope = candidateScopes[scopeIndex];
        if (!scope)
            continue;
        for (var keyIndex = 0; keyIndex < exportKeys.length; keyIndex += 1) {
            var name_1 = exportKeys[keyIndex];
            var value = AUTO_GEAR_STORAGE_EXPORTS[name_1];
            if (typeof value === 'function') {
                assignGlobal(scope, name_1, value);
            }
        }
    }
})();
