/*
 * Auto Gear persistence helpers extracted from the runtime so they can be
 * exercised directly in unit tests without loading the UI.
 */
// @ts-nocheck
/* global loadAutoGearBackups, AUTO_GEAR_BACKUPS_KEY,
  normalizeAutoGearBackupEntry, loadAutoGearPresets, AUTO_GEAR_PRESETS_KEY, normalizeAutoGearPreset,
  saveAutoGearPresets, loadAutoGearMonitorDefaults,
  AUTO_GEAR_MONITOR_DEFAULTS_KEY, saveAutoGearMonitorDefaults,
  normalizeAutoGearMonitorDefaults,
  loadAutoGearActivePresetId, AUTO_GEAR_ACTIVE_PRESET_KEY, saveAutoGearActivePresetId,
  loadAutoGearAutoPresetId, AUTO_GEAR_AUTO_PRESET_KEY, saveAutoGearAutoPresetId,
  loadAutoGearBackupVisibility, AUTO_GEAR_BACKUP_VISIBILITY_KEY, saveAutoGearBackupVisibility,
  loadAutoGearBackupRetention, saveAutoGearBackupRetention,
  saveAutoGearBackups, autoGearBackupRetention, callCoreFunctionIfAvailable,
  autoGearBackupRetentionInput, autoGearBackups, AUTO_GEAR_RULES_KEY, normalizeAutoGearRule,
  loadAutoGearRules */

const AUTO_GEAR_BACKUP_RETENTION_FALLBACK_KEY = 'cameraPowerPlanner_autoGearBackupRetention';
const AUTO_GEAR_BACKUP_RETENTION_FALLBACK_DEFAULT = 36;
const AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN = 1;
const AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MAX = 120;

const AUTO_GEAR_BACKUP_GLOBAL_SCOPE =
  (typeof globalThis !== 'undefined' && globalThis)
  || (typeof window !== 'undefined' && window)
  || (typeof self !== 'undefined' && self)
  || (typeof global !== 'undefined' && global)
  || null;

function readScopedNumericAutoGearValue(name) {
  if (!AUTO_GEAR_BACKUP_GLOBAL_SCOPE) {
    return null;
  }
  const value = AUTO_GEAR_BACKUP_GLOBAL_SCOPE[name];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function normalizeRetentionCandidate(value, minValue, maxValue) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }
  const rounded = Math.round(value);
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
  const scopedMinValue = readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE');
  if (scopedMinValue !== null) {
    return Math.max(AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN, Math.round(scopedMinValue));
  }
  const scopedMin = readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MIN');
  if (scopedMin !== null) {
    return Math.max(AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN, Math.round(scopedMin));
  }
  return AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MIN;
}

function resolveAutoGearBackupRetentionMaxValue() {
  const scopedMax = readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MAX');
  if (scopedMax !== null) {
    return Math.max(resolveAutoGearBackupRetentionMinValue(), Math.round(scopedMax));
  }
  return Math.max(
    resolveAutoGearBackupRetentionMinValue(),
    AUTO_GEAR_BACKUP_RETENTION_FALLBACK_MAX,
  );
}

function resolveAutoGearBackupRetentionDefaultValue() {
  const minValue = resolveAutoGearBackupRetentionMinValue();
  const maxValue = resolveAutoGearBackupRetentionMaxValue();
  const candidates = [
    readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT'),
    readScopedNumericAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE'),
    AUTO_GEAR_BACKUP_RETENTION_FALLBACK_DEFAULT,
  ];
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    const normalized = normalizeRetentionCandidate(candidate, minValue, maxValue);
    if (typeof normalized === 'number') {
      return normalized;
    }
  }
  return minValue;
}

function resolveAutoGearBackupRetentionKey() {
  if (
    AUTO_GEAR_BACKUP_GLOBAL_SCOPE &&
    typeof AUTO_GEAR_BACKUP_GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_KEY === 'string'
  ) {
    const scopedKey = AUTO_GEAR_BACKUP_GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_KEY.trim();
    if (scopedKey) {
      return scopedKey;
    }
  }
  return AUTO_GEAR_BACKUP_RETENTION_FALLBACK_KEY;
}

function readAutoGearBackupsFromStorage(retentionLimit = resolveAutoGearBackupRetentionDefaultValue()) {
  let stored = [];
  if (typeof loadAutoGearBackups === 'function') {
    try {
      stored = loadAutoGearBackups();
    } catch (error) {
      console.warn('Failed to load automatic gear backups', error);
      stored = [];
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_BACKUPS_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to read automatic gear backups from storage', error);
      stored = [];
    }
  }
  if (!Array.isArray(stored)) return [];
  const limit = clampAutoGearBackupRetentionLimit(retentionLimit);
  return stored
    .map(normalizeAutoGearBackupEntry)
    .filter(Boolean)
    .sort((a, b) => {
      if (a.createdAt === b.createdAt) return 0;
      return a.createdAt > b.createdAt ? -1 : 1;
    })
    .slice(0, limit);
}

function sortAutoGearPresets(list) {
  return list.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true }));
}

function readAutoGearPresetsFromStorage() {
  let stored = [];
  if (typeof loadAutoGearPresets === 'function') {
    try {
      stored = loadAutoGearPresets();
    } catch (error) {
      console.warn('Failed to load automatic gear presets', error);
      stored = [];
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_PRESETS_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to read automatic gear presets from storage', error);
      stored = [];
    }
  }
  if (!Array.isArray(stored)) return [];
  return sortAutoGearPresets(stored.map(normalizeAutoGearPreset).filter(Boolean));
}

function persistAutoGearPresets(presets) {
  const payload = Array.isArray(presets)
    ? presets.map(preset => ({
        id: preset.id,
        label: preset.label,
        rules: Array.isArray(preset.rules) ? preset.rules : [],
      }))
    : [];
  if (typeof saveAutoGearPresets === 'function') {
    try {
      saveAutoGearPresets(payload);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear presets', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_PRESETS_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist automatic gear presets', error);
  }
}

function readAutoGearMonitorDefaultsFromStorage() {
  let stored = {};
  if (typeof loadAutoGearMonitorDefaults === 'function') {
    try {
      stored = loadAutoGearMonitorDefaults();
    } catch (error) {
      console.warn('Failed to load automatic gear monitor defaults', error);
      stored = {};
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY);
      stored = raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn('Failed to read automatic gear monitor defaults from storage', error);
      stored = {};
    }
  }
  return normalizeAutoGearMonitorDefaults(stored);
}

function persistAutoGearMonitorDefaults(defaults) {
  const payload = normalizeAutoGearMonitorDefaults(defaults);
  if (typeof saveAutoGearMonitorDefaults === 'function') {
    try {
      saveAutoGearMonitorDefaults(payload);
      return payload;
    } catch (error) {
      console.warn('Failed to save automatic gear monitor defaults', error);
    }
  }
  if (typeof localStorage === 'undefined') {
    return payload;
  }
  try {
    localStorage.setItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist automatic gear monitor defaults', error);
  }
  return payload;
}

function readActiveAutoGearPresetIdFromStorage() {
  if (typeof loadAutoGearActivePresetId === 'function') {
    try {
      const loaderPresetId = loadAutoGearActivePresetId();
      return typeof loaderPresetId === 'string' ? loaderPresetId : '';
    } catch (error) {
      console.warn('Failed to load automatic gear active preset id', error);
      return '';
    }
  }
  if (typeof localStorage === 'undefined') return '';
  try {
    const storagePresetId = localStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
    return typeof storagePresetId === 'string' ? storagePresetId : '';
  } catch (error) {
    console.warn('Failed to read automatic gear active preset id from storage', error);
    return '';
  }
}

function persistActiveAutoGearPresetId(presetId) {
  if (typeof saveAutoGearActivePresetId === 'function') {
    try {
      saveAutoGearActivePresetId(typeof presetId === 'string' ? presetId : '');
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear active preset id', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    if (presetId) {
      localStorage.setItem(AUTO_GEAR_ACTIVE_PRESET_KEY, presetId);
    } else {
      localStorage.removeItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist automatic gear active preset id', error);
  }
}

function readAutoGearAutoPresetIdFromStorage() {
  if (typeof loadAutoGearAutoPresetId === 'function') {
    try {
      const loaderAutoPresetId = loadAutoGearAutoPresetId();
      return typeof loaderAutoPresetId === 'string' ? loaderAutoPresetId : '';
    } catch (error) {
      console.warn('Failed to load automatic gear auto preset id', error);
      return '';
    }
  }
  if (typeof localStorage === 'undefined') return '';
  try {
    const storageAutoPresetId = localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY);
    return typeof storageAutoPresetId === 'string' ? storageAutoPresetId : '';
  } catch (error) {
    console.warn('Failed to read automatic gear auto preset id from storage', error);
    return '';
  }
}

function persistAutoGearAutoPresetId(presetId) {
  if (typeof saveAutoGearAutoPresetId === 'function') {
    try {
      saveAutoGearAutoPresetId(typeof presetId === 'string' ? presetId : '');
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear auto preset id', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    if (presetId) {
      localStorage.setItem(AUTO_GEAR_AUTO_PRESET_KEY, presetId);
    } else {
      localStorage.removeItem(AUTO_GEAR_AUTO_PRESET_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist automatic gear auto preset id', error);
  }
}

function readAutoGearBackupVisibilityFromStorage() {
  if (typeof loadAutoGearBackupVisibility === 'function') {
    try {
      return !!loadAutoGearBackupVisibility();
    } catch (error) {
      console.warn('Failed to load automatic gear backup visibility', error);
      return false;
    }
  }
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY) === '1';
  } catch (error) {
    console.warn('Failed to read automatic gear backup visibility from storage', error);
    return false;
  }
}

function persistAutoGearBackupVisibility(flag) {
  const enabled = !!flag;
  if (typeof saveAutoGearBackupVisibility === 'function') {
    try {
      saveAutoGearBackupVisibility(enabled);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear backup visibility', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    if (enabled) {
      localStorage.setItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY, '1');
    } else {
      localStorage.removeItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist automatic gear backup visibility', error);
  }
}

function clampAutoGearBackupRetentionLimit(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return resolveAutoGearBackupRetentionDefaultValue();
  }
  const rounded = Math.round(numeric);
  if (!Number.isFinite(rounded)) {
    return resolveAutoGearBackupRetentionDefaultValue();
  }
  const minValue = resolveAutoGearBackupRetentionMinValue();
  const maxValue = resolveAutoGearBackupRetentionMaxValue();
  if (rounded < minValue) {
    return minValue;
  }
  if (rounded > maxValue) {
    return maxValue;
  }
  return rounded;
}

function readAutoGearBackupRetentionFromStorage() {
  if (typeof loadAutoGearBackupRetention === 'function') {
    try {
      return clampAutoGearBackupRetentionLimit(loadAutoGearBackupRetention());
    } catch (error) {
      console.warn('Failed to load automatic gear backup retention', error);
    }
  }
  if (typeof localStorage === 'undefined') {
    return resolveAutoGearBackupRetentionDefaultValue();
  }
  try {
    const raw = localStorage.getItem(resolveAutoGearBackupRetentionKey());
    if (raw === null || raw === undefined) {
      return resolveAutoGearBackupRetentionDefaultValue();
    }
    try {
      const parsed = JSON.parse(raw);
      return clampAutoGearBackupRetentionLimit(parsed);
    } catch (parseError) {
      const numeric = Number(raw);
      if (Number.isFinite(numeric)) {
        return clampAutoGearBackupRetentionLimit(numeric);
      }
      throw parseError;
    }
  } catch (error) {
    console.warn('Failed to read automatic gear backup retention from storage', error);
    return resolveAutoGearBackupRetentionDefaultValue();
  }
}

function persistAutoGearBackupRetention(retention) {
  const normalized = clampAutoGearBackupRetentionLimit(retention);
  if (typeof saveAutoGearBackupRetention === 'function') {
    try {
      saveAutoGearBackupRetention(normalized);
      return true;
    } catch (error) {
      console.warn('Failed to save automatic gear backup retention', error);
    }
  }
  if (typeof localStorage === 'undefined') {
    return false;
  }
  try {
    localStorage.setItem(resolveAutoGearBackupRetentionKey(), JSON.stringify(normalized));
    return true;
  } catch (error) {
    console.warn('Failed to persist automatic gear backup retention', error);
    return false;
  }
}

function persistAutoGearBackups(backups) {
  const payload = Array.isArray(backups)
    ? backups.map(entry => ({
        id: entry.id,
        createdAt: entry.createdAt,
        rules: Array.isArray(entry.rules) ? entry.rules : [],
        monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults),
        note: typeof entry.note === 'string' ? entry.note : undefined,
      }))
    : [];
  if (typeof saveAutoGearBackups === 'function') {
    const storedPayload = saveAutoGearBackups(payload);
    return Array.isArray(storedPayload) ? storedPayload : payload;
  }
  if (typeof localStorage === 'undefined') {
    throw new Error('Storage unavailable');
  }
  localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify(payload));
  return payload;
}

function assignAutoGearGlobalValue(name, nextValue) {
  const scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof self !== 'undefined') scopes.push(self);
  if (typeof global !== 'undefined') scopes.push(global);
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope) continue;
    if (Object.prototype.hasOwnProperty.call(scope, name)) {
      scope[name] = nextValue;
      return true;
    }
  }
  return false;
}

function enforceAutoGearBackupRetentionLimit(limit) {
  const normalized = clampAutoGearBackupRetentionLimit(limit);
  const previousLimit = autoGearBackupRetention;
  if (normalized === previousLimit) {
    callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
    return { success: true, trimmed: [], previousLimit };
  }

  const previousBackups = autoGearBackups.slice();
  const trimmedEntries = [];

  const retentionPersisted = persistAutoGearBackupRetention(normalized);
  if (!retentionPersisted) {
    autoGearBackupRetentionInput && (autoGearBackupRetentionInput.value = String(autoGearBackupRetention));
    callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
    return { success: false, error: new Error('retention-persist-failed'), previousLimit };
  }

  assignAutoGearGlobalValue('autoGearBackupRetention', normalized);

  if (autoGearBackups.length > normalized) {
    const updatedBackups = autoGearBackups.slice(0, normalized);
    trimmedEntries.push(...autoGearBackups.slice(normalized));
    try {
      const persistedBackups = persistAutoGearBackups(updatedBackups) || [];
      const finalBackups = Array.isArray(persistedBackups) ? persistedBackups : [];
      if (finalBackups.length < updatedBackups.length) {
        trimmedEntries.push(...updatedBackups.slice(finalBackups.length));
      }
      assignAutoGearGlobalValue('autoGearBackups', finalBackups);
    } catch (error) {
      console.warn('Failed to trim automatic gear backups to retention limit', error);
      assignAutoGearGlobalValue('autoGearBackupRetention', previousLimit);
      persistAutoGearBackupRetention(previousLimit);
      try {
        persistAutoGearBackups(previousBackups);
      } catch (restoreError) {
        console.warn('Failed to restore automatic gear backups after trim error', restoreError);
      }
      assignAutoGearGlobalValue('autoGearBackups', readAutoGearBackupsFromStorage(previousLimit));
      callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
      callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
      return { success: false, error, previousLimit };
    }
  }

  callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
  return { success: true, trimmed: trimmedEntries, previousLimit };
}

function readAutoGearRulesFromStorage() {
  let stored = [];
  if (typeof loadAutoGearRules !== 'undefined' && typeof loadAutoGearRules === 'function') {
    try {
      stored = loadAutoGearRules();
    } catch (error) {
      console.warn('Failed to load automatic gear rules', error);
      stored = [];
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_RULES_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to load automatic gear rules', error);
      stored = [];
    }
  }
  if (!Array.isArray(stored)) return [];
  return stored.map(normalizeAutoGearRule).filter(Boolean);
}

const AUTO_GEAR_STORAGE_EXPORTS = {
  readAutoGearBackupsFromStorage,
  readAutoGearPresetsFromStorage,
  persistAutoGearPresets,
  normalizeAutoGearMonitorDefaults,
  readAutoGearMonitorDefaultsFromStorage,
  persistAutoGearMonitorDefaults,
  readActiveAutoGearPresetIdFromStorage,
  persistActiveAutoGearPresetId,
  readAutoGearAutoPresetIdFromStorage,
  persistAutoGearAutoPresetId,
  readAutoGearBackupVisibilityFromStorage,
  persistAutoGearBackupVisibility,
  clampAutoGearBackupRetentionLimit,
  readAutoGearBackupRetentionFromStorage,
  persistAutoGearBackupRetention,
  persistAutoGearBackups,
  enforceAutoGearBackupRetentionLimit,
  readAutoGearRulesFromStorage,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTO_GEAR_STORAGE_EXPORTS;
}

if (typeof globalThis !== 'undefined') {
  const target =
    (typeof globalThis.AUTO_GEAR_STORAGE_EXPORTS === 'object'
      && globalThis.AUTO_GEAR_STORAGE_EXPORTS)
      ? globalThis.AUTO_GEAR_STORAGE_EXPORTS
      : (globalThis.AUTO_GEAR_STORAGE_EXPORTS = {});
  Object.assign(target, AUTO_GEAR_STORAGE_EXPORTS);
}

