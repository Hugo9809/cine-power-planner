// script.js – Main logic for the Cine Power Planner app
/* global texts, categoryNames, gearItems, loadSessionState, saveSessionState, loadProject, saveProject, deleteProject, renameSetup, registerDevice, loadFavorites, saveFavorites, exportAllData, importAllData, clearAllData, loadAutoGearRules, saveAutoGearRules, loadAutoGearBackups, saveAutoGearBackups, loadAutoGearSeedFlag, saveAutoGearSeedFlag, loadAutoGearPresets, saveAutoGearPresets, loadAutoGearActivePresetId, saveAutoGearActivePresetId, loadAutoGearAutoPresetId, saveAutoGearAutoPresetId, loadAutoGearBackupVisibility, saveAutoGearBackupVisibility, AUTO_GEAR_RULES_STORAGE_KEY, AUTO_GEAR_SEEDED_STORAGE_KEY, AUTO_GEAR_BACKUPS_STORAGE_KEY, AUTO_GEAR_PRESETS_STORAGE_KEY, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, SAFE_LOCAL_STORAGE, getSafeLocalStorage, CUSTOM_FONT_STORAGE_KEY, CUSTOM_FONT_STORAGE_KEY_NAME */

// Use `var` here instead of `let` because `index.html` loads the lz-string
// library from a CDN which defines a global `LZString` variable. Using `let`
// would attempt to create a new lexical binding and throw a SyntaxError in
// browsers that already have the global property. `var` simply reuses the
// existing global variable if present.
var LZString;
try {
  LZString = require('lz-string');
} catch {
  if (typeof window !== 'undefined' && window.LZString) {
    LZString = window.LZString;
  } else {
    // Fallback no-op implementation to avoid runtime errors when the
    // dependency is unavailable (e.g. during tests).
    LZString = {
      compressToEncodedURIComponent: s => s,
      decompressFromEncodedURIComponent: s => s
    };
  }
}

var generatePrintableOverview;
try {
  ({ generatePrintableOverview } = require('./overview.js'));
} catch {
  // overview generation not needed in test environments without module support
}

if (typeof window !== 'undefined') {
  const lottie = window.lottie;
  if (lottie && typeof lottie.useWebWorker === 'function') {
    try {
      lottie.useWebWorker(false);
    } catch (error) {
      console.warn('Unable to disable Lottie web workers', error);
    }
  }
}

const APP_VERSION = "1.0.4";
const IOS_PWA_HELP_STORAGE_KEY = 'iosPwaHelpShown';

const DEVICE_SCHEMA_PATH = 'src/data/schema.json';
const DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
const AUTO_GEAR_RULES_KEY =
  typeof AUTO_GEAR_RULES_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_RULES_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearRules';
const AUTO_GEAR_SEEDED_KEY =
  typeof AUTO_GEAR_SEEDED_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_SEEDED_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearSeeded';
const AUTO_GEAR_BACKUPS_KEY =
  typeof AUTO_GEAR_BACKUPS_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_BACKUPS_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearBackups';
const AUTO_GEAR_PRESETS_KEY =
  typeof AUTO_GEAR_PRESETS_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_PRESETS_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearPresets';
const AUTO_GEAR_ACTIVE_PRESET_KEY =
  typeof AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearActivePreset';
const AUTO_GEAR_AUTO_PRESET_KEY =
  typeof AUTO_GEAR_AUTO_PRESET_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_AUTO_PRESET_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearAutoPreset';
const AUTO_GEAR_BACKUP_VISIBILITY_KEY =
  typeof AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearShowBackups';
const AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
const AUTO_GEAR_BACKUP_LIMIT = 12;
const autoGearBackupDateFormatter =
  typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function'
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null;

const schemaStorage = (() => {
  if (typeof window === 'undefined') return null;
  try {
    if (!('localStorage' in window)) return null;
    const { localStorage } = window;
    const testKey = '__schema_cache__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (error) {
    console.warn('Device schema cache disabled', error);
    return null;
  }
})();

function loadCachedDeviceSchema() {
  if (!schemaStorage) return null;
  try {
    const raw = schemaStorage.getItem(DEVICE_SCHEMA_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    console.warn('Failed to read cached device schema', error);
    try {
      schemaStorage.removeItem(DEVICE_SCHEMA_STORAGE_KEY);
    } catch (removeError) {
      console.warn('Failed to clear invalid cached device schema', removeError);
    }
    return null;
  }
}

function persistDeviceSchema(schema) {
  if (!schemaStorage) return;
  try {
    schemaStorage.setItem(DEVICE_SCHEMA_STORAGE_KEY, JSON.stringify(schema));
  } catch (error) {
    console.warn('Failed to cache device schema', error);
  }
}

function isValidDeviceSchema(candidate) {
  return candidate && typeof candidate === 'object' && !Array.isArray(candidate);
}

async function loadDeviceSchemaFromCacheStorage() {
  if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
    return null;
  }

  const candidates = new Set([DEVICE_SCHEMA_PATH]);
  if (!DEVICE_SCHEMA_PATH.startsWith('./')) {
    candidates.add(`./${DEVICE_SCHEMA_PATH}`);
  }

  if (typeof window !== 'undefined' && window.location) {
    try {
      candidates.add(new URL(DEVICE_SCHEMA_PATH, window.location.href).toString());
    } catch (error) {
      console.warn('Failed to resolve schema.json cache URL', error);
    }
  }

  for (const url of candidates) {
    try {
      const response = await caches.match(url, { ignoreSearch: true });
      if (response) {
        return await response.clone().json();
      }
    } catch (error) {
      console.warn('Failed to read schema.json from cache entry', url, error);
    }
  }

  return null;
}

function finalizeDeviceSchemaLoad(candidate) {
  if (isValidDeviceSchema(candidate)) {
    deviceSchema = candidate;
    persistDeviceSchema(candidate);
  } else if (!deviceSchema) {
    deviceSchema = cachedDeviceSchema || {};
  }

  populateCategoryOptions();
}

const cachedDeviceSchema = loadCachedDeviceSchema();

let deviceSchema;
try {
  deviceSchema = require('../data/schema.json');
} catch {
  deviceSchema = cachedDeviceSchema;
  if (typeof fetch === 'function') {
    fetch(DEVICE_SCHEMA_PATH)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(`Unexpected response when loading schema.json: ${response ? response.status : 'no response'}`);
        }
        return response.json();
      })
      .then(finalizeDeviceSchemaLoad)
      .catch(error => {
        console.warn('Failed to fetch schema.json', error);
        if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
          finalizeDeviceSchemaLoad(deviceSchema);
          return;
        }

        loadDeviceSchemaFromCacheStorage()
          .then(schemaFromCache => {
            if (isValidDeviceSchema(schemaFromCache)) {
              finalizeDeviceSchemaLoad(schemaFromCache);
            } else {
              finalizeDeviceSchemaLoad(deviceSchema);
            }
          })
          .catch(cacheError => {
            console.warn('Failed to load schema.json from cache storage', cacheError);
            finalizeDeviceSchemaLoad(deviceSchema);
          });
      });
  } else {
    finalizeDeviceSchemaLoad(deviceSchema);
  }
}

const LEGAL_LINKS = {
  de: {
    imprint: "legal/impressum.html",
    privacy: "legal/datenschutz.html",
  },
  en: {
    imprint: "legal/impressum-en.html",
    privacy: "legal/datenschutz-en.html",
  },
  es: {
    imprint: "legal/impressum-es.html",
    privacy: "legal/datenschutz-es.html",
  },
  fr: {
    imprint: "legal/impressum-fr.html",
    privacy: "legal/datenschutz-fr.html",
  },
  it: {
    imprint: "legal/impressum-it.html",
    privacy: "legal/datenschutz-it.html",
  },
};

const AUTO_GEAR_CUSTOM_CATEGORY = '';
const GEAR_LIST_CATEGORIES = [
  'Camera',
  'Camera Support',
  'Media',
  'Lens',
  'Lens Support',
  'Matte box + filter',
  'LDS (FIZ)',
  'Camera Batteries',
  'Monitoring Batteries',
  'Chargers',
  'Monitoring',
  'Monitoring support',
  'Rigging',
  'Power',
  'Grip',
  'Carts and Transportation',
  'Miscellaneous',
  'Consumables',
];
const AUTO_GEAR_SELECTOR_TYPES = ['none', 'monitor', 'directorMonitor'];
const AUTO_GEAR_SELECTOR_TYPE_SET = new Set(AUTO_GEAR_SELECTOR_TYPES);

function generateAutoGearId(prefix) {
  const base = prefix || 'rule';
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${base}-${crypto.randomUUID()}`;
  }
  return `${base}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function normalizeAutoGearQuantity(value) {
  const num = parseInt(value, 10);
  return Number.isFinite(num) && num > 0 ? num : 1;
}

function parseAutoGearDraftNames(value) {
  if (typeof value !== 'string') return [];
  const raw = value.trim();
  if (!raw) return [];
  const hasDelimiters = /[;\n\r]/.test(raw);
  const parts = hasDelimiters ? raw.split(/[;\n\r]+/) : [raw];
  return parts
    .map(part => {
      const segment = part.trim();
      if (!segment) return null;
      const signMatch = segment.match(/^([+-])\s*(.+)$/);
      const listType = signMatch ? (signMatch[1] === '-' ? 'remove' : 'add') : null;
      const content = signMatch ? signMatch[2].trim() : segment;
      if (!content) return null;
      const quantityMatch = content.match(/^(\d+)\s*[x×]\s*(.+)$/i);
      if (quantityMatch) {
        const name = quantityMatch[2].trim();
        if (!name) return null;
        return { name, quantity: normalizeAutoGearQuantity(quantityMatch[1]), listType };
      }
      return { name: content, listType };
    })
    .filter(Boolean);
}

function normalizeAutoGearText(value, { collapseWhitespace = true } = {}) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!collapseWhitespace) return trimmed;
  return trimmed.replace(/\s+/g, ' ');
}

function normalizeAutoGearSelectorType(value) {
  const candidate = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!candidate) return 'none';
  return AUTO_GEAR_SELECTOR_TYPE_SET.has(candidate) ? candidate : 'none';
}

function normalizeAutoGearSelectorDefault(type, value) {
  const text = normalizeAutoGearText(value);
  if (!text) return '';
  const options = getAutoGearSelectorOptions(type);
  if (!options.length) return text;
  const match = options.find(option => option.toLowerCase() === text.toLowerCase());
  return match || text;
}

function getAutoGearSelectorOptions(type) {
  const normalizedType = normalizeAutoGearSelectorType(type);
  if (normalizedType === 'monitor') {
    const monitorDb = devices && devices.monitors ? devices.monitors : null;
    if (!monitorDb || typeof monitorDb !== 'object') return [];
    return Object.keys(monitorDb).filter(name => name && name !== 'None').sort(localeSort);
  }
  if (normalizedType === 'directorMonitor') {
    const directorDb = devices && devices.directorMonitors ? devices.directorMonitors : null;
    if (!directorDb || typeof directorDb !== 'object') return [];
    return Object.keys(directorDb).filter(name => name && name !== 'None').sort(localeSort);
  }
  return [];
}

function getAutoGearSelectorLabel(type) {
  const normalizedType = normalizeAutoGearSelectorType(type);
  const langTexts = texts[currentLang] || texts.en || {};
  if (normalizedType === 'monitor') {
    return langTexts.autoGearSelectorMonitorOption
      || texts.en?.autoGearSelectorMonitorOption
      || 'Monitor selector';
  }
  if (normalizedType === 'directorMonitor') {
    return langTexts.autoGearSelectorDirectorOption
      || texts.en?.autoGearSelectorDirectorOption
      || 'Director monitor selector';
  }
  return langTexts.autoGearSelectorNoneOption
    || texts.en?.autoGearSelectorNoneOption
    || 'No selector';
}

function isAutoGearMonitoringCategory(value) {
  if (typeof value !== 'string') return false;
  return value.trim().toLowerCase() === 'monitoring';
}

function updateAutoGearMonitorFieldGroup(group) {
  if (!group || !group.select) return;
  const {
    select,
    screenSizeField,
    screenSizeInput,
    selectorTypeField,
    selectorTypeSelect,
    selectorDefaultField,
    selectorDefaultInput,
    selectorIncludeField,
    selectorIncludeCheckbox,
  } = group;
  const isMonitoring = isAutoGearMonitoringCategory(select.value || '');
  const managedFields = [screenSizeField, selectorTypeField, selectorDefaultField, selectorIncludeField];
  managedFields.forEach(field => {
    if (!field) return;
    if (isMonitoring) {
      field.removeAttribute('hidden');
    } else {
      field.setAttribute('hidden', '');
    }
  });
  if (!isMonitoring) {
    if (screenSizeInput) screenSizeInput.value = '';
    if (selectorTypeSelect) selectorTypeSelect.value = 'none';
    if (selectorDefaultInput) selectorDefaultInput.value = '';
    if (selectorIncludeCheckbox) selectorIncludeCheckbox.checked = false;
  }
}

function normalizeAutoGearItem(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const name = normalizeAutoGearText(entry.name);
  if (!name) return null;
  const category = normalizeAutoGearText(entry.category);
  const quantity = normalizeAutoGearQuantity(entry.quantity);
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('item');
  const screenSize = normalizeAutoGearText(entry.screenSize);
  const selectorType = normalizeAutoGearSelectorType(entry.selectorType);
  const selectorDefault = normalizeAutoGearSelectorDefault(selectorType, entry.selectorDefault);
  const selectorEnabled = !!entry.selectorEnabled;
  const notes = normalizeAutoGearText(entry.notes);
  return { id, name, category, quantity, screenSize, selectorType, selectorDefault, selectorEnabled, notes };
}

function normalizeAutoGearTriggerList(values) {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values
    .map(value => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)));
}

function normalizeAutoGearTriggerValue(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function autoGearRuleMatteboxKey(rule) {
  if (!rule || typeof rule !== 'object') return '';
  const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
  if (!matteboxList.length) return '';
  return matteboxList
    .map(normalizeAutoGearTriggerValue)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join('|');
}

function normalizeAutoGearRule(rule) {
  if (!rule || typeof rule !== 'object') return null;
  const id = typeof rule.id === 'string' && rule.id ? rule.id : generateAutoGearId('rule');
  const label = typeof rule.label === 'string' ? rule.label.trim() : '';
  const scenarios = normalizeAutoGearTriggerList(rule.scenarios).sort((a, b) => a.localeCompare(b));
  const mattebox = normalizeAutoGearTriggerList(rule.mattebox).sort((a, b) => a.localeCompare(b));
  const cameraHandle = normalizeAutoGearTriggerList(rule.cameraHandle).sort((a, b) => a.localeCompare(b));
  const viewfinderExtension = normalizeAutoGearTriggerList(rule.viewfinderExtension).sort((a, b) => a.localeCompare(b));
  const videoDistribution = normalizeAutoGearTriggerList(rule.videoDistribution).sort((a, b) => a.localeCompare(b));
  if (!scenarios.length && !mattebox.length && !cameraHandle.length && !viewfinderExtension.length && !videoDistribution.length) return null;
  const add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
  const remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
  if (!add.length && !remove.length) return null;
  return { id, label, scenarios, mattebox, cameraHandle, viewfinderExtension, videoDistribution, add, remove };
}

function autoGearItemSnapshot(item) {
  const normalized = normalizeAutoGearItem(item);
  if (!normalized) {
    return {
      name: '',
      category: '',
      quantity: 0,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
    };
  }
  const {
    name,
    category,
    quantity,
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
  } = normalized;
  return {
    name,
    category,
    quantity: normalizeAutoGearQuantity(quantity),
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
  };
}

function autoGearItemSortKey(item) {
  const snapshot = autoGearItemSnapshot(item);
  const name = snapshot.name || '';
  const category = snapshot.category || '';
  const quantity = normalizeAutoGearQuantity(snapshot.quantity);
  const screenSize = snapshot.screenSize || '';
  const selectorType = snapshot.selectorType || 'none';
  const selectorDefault = snapshot.selectorDefault || '';
  const selectorEnabled = snapshot.selectorEnabled ? '1' : '0';
  const notes = snapshot.notes || '';
  return `${name}|${category}|${quantity}|${screenSize}|${selectorType}|${selectorEnabled}|${selectorDefault}|${notes}`;
}

function snapshotAutoGearRuleForFingerprint(rule) {
  const normalized = normalizeAutoGearRule(rule);
  if (!normalized) return null;
  const mapItems = items => items
    .map(autoGearItemSnapshot)
    .sort((a, b) => autoGearItemSortKey(a).localeCompare(autoGearItemSortKey(b)));
  return {
    label: normalized.label || '',
    scenarios: normalized.scenarios.slice().sort((a, b) => a.localeCompare(b)),
    mattebox: normalized.mattebox.slice().sort((a, b) => a.localeCompare(b)),
    cameraHandle: normalized.cameraHandle.slice().sort((a, b) => a.localeCompare(b)),
    viewfinderExtension: normalized.viewfinderExtension.slice().sort((a, b) => a.localeCompare(b)),
    videoDistribution: normalized.videoDistribution.slice().sort((a, b) => a.localeCompare(b)),
    add: mapItems(normalized.add),
    remove: mapItems(normalized.remove),
  };
}

function autoGearRuleSortKey(rule) {
  const scenarioKey = Array.isArray(rule.scenarios) ? rule.scenarios.join('|') : '';
  const matteboxKey = Array.isArray(rule.mattebox) ? rule.mattebox.join('|') : '';
  const cameraHandleKey = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.join('|') : '';
  const viewfinderKey = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.join('|') : '';
  const videoDistributionKey = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.join('|') : '';
  const addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
  const removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
  return `${scenarioKey}|${matteboxKey}|${cameraHandleKey}|${viewfinderKey}|${videoDistributionKey}|${rule.label || ''}|${addKey}|${removeKey}`;
}

function createAutoGearRulesFingerprint(rules) {
  const snapshot = (Array.isArray(rules) ? rules : [])
    .map(snapshotAutoGearRuleForFingerprint)
    .filter(Boolean)
    .sort((a, b) => autoGearRuleSortKey(a).localeCompare(autoGearRuleSortKey(b)));
  return stableStringify(snapshot);
}

function normalizeAutoGearPreset(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const label = typeof entry.label === 'string' ? entry.label.trim() : '';
  if (!label) return null;
  const rawRules = Array.isArray(entry.rules) ? entry.rules : [];
  const rules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('preset');
  const fingerprint = createAutoGearRulesFingerprint(rules);
  return { id, label, rules, fingerprint };
}

function normalizeAutoGearBackupEntry(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const rawCreatedAt = typeof entry.createdAt === 'string' ? entry.createdAt : null;
  const timestamp = rawCreatedAt ? Date.parse(rawCreatedAt) : NaN;
  if (!Number.isFinite(timestamp)) return null;
  const createdAt = new Date(timestamp).toISOString();
  const rawRules = Array.isArray(entry.rules) ? entry.rules : [];
  const normalizedRules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
  const rules = rawRules.length === 0 ? [] : normalizedRules;
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('backup');
  return { id, createdAt, rules };
}

function readAutoGearBackupsFromStorage() {
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
  return stored
    .map(normalizeAutoGearBackupEntry)
    .filter(Boolean)
    .sort((a, b) => {
      if (a.createdAt === b.createdAt) return 0;
      return a.createdAt > b.createdAt ? -1 : 1;
    })
    .slice(0, AUTO_GEAR_BACKUP_LIMIT);
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

function readActiveAutoGearPresetIdFromStorage() {
  if (typeof loadAutoGearActivePresetId === 'function') {
    try {
      const value = loadAutoGearActivePresetId();
      return typeof value === 'string' ? value : '';
    } catch (error) {
      console.warn('Failed to load automatic gear active preset id', error);
      return '';
    }
  }
  if (typeof localStorage === 'undefined') return '';
  try {
    const value = localStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
    return typeof value === 'string' ? value : '';
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
      const value = loadAutoGearAutoPresetId();
      return typeof value === 'string' ? value : '';
    } catch (error) {
      console.warn('Failed to load automatic gear auto preset id', error);
      return '';
    }
  }
  if (typeof localStorage === 'undefined') return '';
  try {
    const value = localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY);
    return typeof value === 'string' ? value : '';
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

function persistAutoGearBackups(backups) {
  const payload = Array.isArray(backups)
    ? backups.map(entry => ({
        id: entry.id,
        createdAt: entry.createdAt,
        rules: Array.isArray(entry.rules) ? entry.rules : [],
      }))
    : [];
  if (typeof saveAutoGearBackups === 'function') {
    saveAutoGearBackups(payload);
    return;
  }
  if (typeof localStorage === 'undefined') {
    throw new Error('Storage unavailable');
  }
  localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify(payload));
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

let autoGearRules = readAutoGearRulesFromStorage();
let baseAutoGearRules = autoGearRules.slice();
let projectScopedAutoGearRules = null;
let autoGearBackups = readAutoGearBackupsFromStorage();
let autoGearPresets = readAutoGearPresetsFromStorage();
let activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
let autoGearAutoPresetId = readAutoGearAutoPresetIdFromStorage();
let autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
const initialAutoGearRulesSignature = stableStringify(autoGearRules);
let autoGearRulesLastBackupSignature = autoGearBackups.length
  ? stableStringify(autoGearBackups[0].rules || [])
  : initialAutoGearRulesSignature;
let autoGearRulesLastPersistedSignature = initialAutoGearRulesSignature;
let autoGearRulesDirtySinceBackup =
  autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;

reconcileAutoGearAutoPresetState({ persist: true, skipRender: true });
alignActiveAutoGearPreset({ skipRender: true });

function assignAutoGearRules(rules) {
  autoGearRules = Array.isArray(rules)
    ? rules.map(normalizeAutoGearRule).filter(Boolean)
    : [];
  return autoGearRules;
}

function syncBaseAutoGearRulesState() {
  const signature = stableStringify(baseAutoGearRules);
  autoGearRulesLastPersistedSignature = signature;
  autoGearRulesDirtySinceBackup = signature !== autoGearRulesLastBackupSignature;
}

function persistAutoGearRules() {
  if (typeof saveAutoGearRules !== 'undefined' && typeof saveAutoGearRules === 'function') {
    try {
      saveAutoGearRules(autoGearRules);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear rules', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_RULES_KEY, JSON.stringify(autoGearRules));
  } catch (error) {
    console.warn('Failed to save automatic gear rules', error);
  }
}

function setAutoGearRules(rules) {
  const normalized = assignAutoGearRules(rules);
  baseAutoGearRules = normalized.slice();
  projectScopedAutoGearRules = null;
  persistAutoGearRules();
  syncBaseAutoGearRulesState();
  alignActiveAutoGearPreset({ skipRender: true });
  syncAutoGearAutoPreset(normalized);
  renderAutoGearPresetsControls();
}

function getAutoGearRules() {
  return autoGearRules.slice();
}

function syncAutoGearRulesFromStorage(rules) {
  if (Array.isArray(rules)) {
    setAutoGearRules(rules);
  } else {
    baseAutoGearRules = readAutoGearRulesFromStorage();
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRules);
    syncBaseAutoGearRulesState();
  }
  autoGearBackups = readAutoGearBackupsFromStorage();
  autoGearPresets = readAutoGearPresetsFromStorage();
  activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
  autoGearAutoPresetId = readAutoGearAutoPresetIdFromStorage();
  autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
  reconcileAutoGearAutoPresetState({ persist: true, skipRender: true });
  syncAutoGearAutoPreset(baseAutoGearRules);
  alignActiveAutoGearPreset({ skipRender: true });
  renderAutoGearBackupControls();
  renderAutoGearPresetsControls();
  closeAutoGearEditor();
  renderAutoGearRulesList();
  updateAutoGearCatalogOptions();
}

function useProjectAutoGearRules(rules) {
  if (Array.isArray(rules) && rules.length) {
    projectScopedAutoGearRules = assignAutoGearRules(rules).slice();
  } else {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRules);
  }
}

function clearProjectAutoGearRules() {
  if (!projectScopedAutoGearRules || !projectScopedAutoGearRules.length) {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRules);
    return;
  }
  projectScopedAutoGearRules = null;
  assignAutoGearRules(baseAutoGearRules);
}

function getProjectScopedAutoGearRules() {
  return projectScopedAutoGearRules ? projectScopedAutoGearRules.slice() : null;
}

function usingProjectAutoGearRules() {
  return Array.isArray(projectScopedAutoGearRules) && projectScopedAutoGearRules.length > 0;
}

function getBaseAutoGearRules() {
  return baseAutoGearRules.slice();
}

function autoGearRuleSignature(rule) {
  const snapshot = snapshotAutoGearRuleForFingerprint(rule);
  if (!snapshot) return '';
  return stableStringify(snapshot);
}

function mergeAutoGearRules(existing, incoming) {
  const normalizedExisting = Array.isArray(existing)
    ? existing.map(normalizeAutoGearRule).filter(Boolean)
    : [];
  const seen = new Set(normalizedExisting.map(autoGearRuleSignature));
  (Array.isArray(incoming) ? incoming : []).forEach(rule => {
    const normalized = normalizeAutoGearRule(rule);
    if (!normalized) return;
    const signature = autoGearRuleSignature(normalized);
    if (seen.has(signature)) return;
    normalizedExisting.push(normalized);
    seen.add(signature);
  });
  return normalizedExisting;
}

function looksLikeGearName(name) {
  return typeof name === 'string' && name !== 'None' && (/[A-Z]/.test(name) || /\d/.test(name) || name.includes(' '));
}

function hasSeededAutoGearDefaults() {
  if (typeof loadAutoGearSeedFlag !== 'undefined' && typeof loadAutoGearSeedFlag === 'function') {
    try {
      return !!loadAutoGearSeedFlag();
    } catch (error) {
      console.warn('Failed to read automatic gear seed flag', error);
      return false;
    }
  }
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(AUTO_GEAR_SEEDED_KEY) === '1';
  } catch (error) {
    console.warn('Failed to read automatic gear seed flag', error);
    return false;
  }
}

function markAutoGearDefaultsSeeded() {
  if (typeof saveAutoGearSeedFlag !== 'undefined' && typeof saveAutoGearSeedFlag === 'function') {
    try {
      saveAutoGearSeedFlag(true);
      return;
    } catch (error) {
      console.warn('Failed to persist automatic gear seed flag', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_SEEDED_KEY, '1');
  } catch (error) {
    console.warn('Failed to persist automatic gear seed flag', error);
  }
}

function clearAutoGearDefaultsSeeded() {
  if (typeof saveAutoGearSeedFlag !== 'undefined' && typeof saveAutoGearSeedFlag === 'function') {
    try {
      saveAutoGearSeedFlag(false);
      return;
    } catch (error) {
      console.warn('Failed to clear automatic gear seed flag', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(AUTO_GEAR_SEEDED_KEY);
  } catch (error) {
    console.warn('Failed to clear automatic gear seed flag', error);
  }
}

function parseGearTableForAutoRules(html) {
  if (!html || typeof DOMParser !== 'function') return null;
  let doc;
  try {
    doc = new DOMParser().parseFromString(html, 'text/html');
  } catch (error) {
    console.warn('Failed to parse gear table for automatic rule seeding', error);
    return null;
  }
  const table = doc.querySelector('.gear-table');
  if (!table) return null;
  const categoryMaps = new Map();
  table.querySelectorAll('tbody.category-group').forEach(group => {
    const header = group.querySelector('.category-row td');
    if (!header) return;
    const category = header.textContent ? header.textContent.trim() : '';
    if (!category) return;
    const items = categoryMaps.get(category) || new Map();
    group.querySelectorAll('.gear-item').forEach(span => {
      const name = span.getAttribute('data-gear-name');
      if (!looksLikeGearName(name)) return;
      const text = span.textContent ? span.textContent.trim() : '';
      const match = text.match(/^(\d+)x\s+/);
      const quantity = match ? parseInt(match[1], 10) : 1;
      if (!Number.isFinite(quantity) || quantity <= 0) return;
      items.set(name, (items.get(name) || 0) + quantity);
    });
    if (items.size) categoryMaps.set(category, items);
  });
  return categoryMaps;
}

function diffGearTableMaps(baseMap, variantMap) {
  if (!baseMap || !variantMap) return { add: [], remove: [] };
  const add = [];
  const remove = [];
  const categories = new Set([...baseMap.keys(), ...variantMap.keys()]);
  categories.forEach(category => {
    const baseItems = baseMap.get(category) || new Map();
    const variantItems = variantMap.get(category) || new Map();
    const names = new Set([...baseItems.keys(), ...variantItems.keys()]);
    names.forEach(name => {
      const baseQty = baseItems.get(name) || 0;
      const variantQty = variantItems.get(name) || 0;
      if (variantQty > baseQty) {
        add.push({ name, category, quantity: variantQty - baseQty });
      } else if (variantQty < baseQty) {
        remove.push({ name, category, quantity: baseQty - variantQty });
      }
    });
  });
  return { add, remove };
}

function cloneAutoGearItems(items) {
  return items
    .map(item => {
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return { ...normalized };
    })
    .filter(Boolean);
}

function subtractScenarioContributions(diff, scenarioKeys, scenarioDiffMap) {
  const adjust = (items, type) => items
    .map(item => {
      let remaining = normalizeAutoGearQuantity(item.quantity);
      scenarioKeys.forEach(key => {
        const scenarioDiff = scenarioDiffMap.get(key);
        if (!scenarioDiff) return;
        const match = scenarioDiff[type].find(entry => entry.name === item.name && entry.category === item.category);
        if (match) {
          remaining -= normalizeAutoGearQuantity(match.quantity);
        }
      });
      remaining = Math.max(remaining, 0);
      if (remaining <= 0) return null;
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return { ...normalized, quantity: remaining };
    })
    .filter(Boolean);
  return { add: adjust(diff.add, 'add'), remove: adjust(diff.remove, 'remove') };
}

function buildDefaultMatteboxAutoGearRules() {
  const category = 'Matte box + filter';
  const createItems = names => names.map(name => ({
    id: generateAutoGearId('item'),
    name,
    category,
    quantity: 1,
  }));
  return [
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Swing Away',
      scenarios: [],
      mattebox: ['Swing Away'],
      add: createItems([
        'ARRI LMB 4x5 Pro Set',
        'ARRI LMB 19mm Studio Rod Adapter',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
      ]),
      remove: [],
    },
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Rod based',
      scenarios: [],
      mattebox: ['Rod based'],
      add: createItems([
        'ARRI LMB 4x5 15mm LWS Set 3-Stage',
        'ARRI LMB 19mm Studio Rod Adapter',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
        'ARRI LMB 4x5 Side Flags',
        'ARRI LMB Flag Holders',
        'ARRI LMB 4x5 Set of Mattes spherical',
        'ARRI LMB Accessory Adapter',
        'ARRI Anti-Reflection Frame 4x5.65',
      ]),
      remove: [],
    },
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Clamp On',
      scenarios: [],
      mattebox: ['Clamp On'],
      add: createItems([
        'ARRI LMB 4x5 Clamp-On (3-Stage)',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
        'ARRI LMB 4x5 Side Flags',
        'ARRI LMB Flag Holders',
        'ARRI LMB 4x5 Set of Mattes spherical',
        'ARRI LMB Accessory Adapter',
        'ARRI Anti-Reflection Frame 4x5.65',
        'ARRI LMB 4x5 Clamp Adapter Set Pro',
      ]),
      remove: [],
    }
  ];
}

function ensureDefaultMatteboxAutoGearRules() {
  const defaults = buildDefaultMatteboxAutoGearRules();
  if (!defaults.length) return false;
  const existingKeys = new Set(
    autoGearRules
      .map(autoGearRuleMatteboxKey)
      .filter(Boolean)
  );
  const additions = defaults.filter(rule => {
    const key = autoGearRuleMatteboxKey(rule);
    if (!key) return false;
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });
  if (!additions.length) return false;
  setAutoGearRules(autoGearRules.concat(additions));
  return true;
}

function seedAutoGearRulesFromCurrentProject() {
  if (autoGearRules.length) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults && !hasSeededAutoGearDefaults()) {
      markAutoGearDefaultsSeeded();
    }
    return;
  }
  if (hasSeededAutoGearDefaults()) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults) markAutoGearDefaultsSeeded();
    return;
  }

  const rules = [];
  const canGenerateRules = typeof generateGearListHtml === 'function'
    && typeof collectProjectFormData === 'function';

  if (canGenerateRules && requiredScenariosSelect) {
    const baseInfo = collectProjectFormData ? collectProjectFormData() : {};
    if (baseInfo && typeof baseInfo === 'object') {
      const scenarioValues = Array.from(requiredScenariosSelect.options || [])
        .map(opt => opt.value)
        .filter(Boolean);

      if (scenarioValues.length) {
        const baselineHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: '' });
        const baselineMap = parseGearTableForAutoRules(baselineHtml);

        if (baselineMap) {
          const scenarioDiffMap = new Map();

          scenarioValues.forEach(value => {
            const scenarioHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: value });
            const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
            if (!scenarioMap) return;
            const diff = diffGearTableMaps(baselineMap, scenarioMap);
            const add = cloneAutoGearItems(diff.add);
            const remove = cloneAutoGearItems(diff.remove);
            if (!add.length && !remove.length) return;
            scenarioDiffMap.set(value, { add, remove });
            rules.push({ id: generateAutoGearId('rule'), label: value, scenarios: [value], add, remove });
          });

          const comboCandidates = [
            ['Handheld', 'Easyrig'],
            ['Slider', 'Undersling mode']
          ].filter(combo => combo.every(value => scenarioValues.includes(value)));

          comboCandidates.forEach(combo => {
            const combinedLabel = combo.join(' + ');
            const scenarioHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: combo.join(', ') });
            const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
            if (!scenarioMap) return;
            const diff = diffGearTableMaps(baselineMap, scenarioMap);
            const adjusted = subtractScenarioContributions({
              add: cloneAutoGearItems(diff.add),
              remove: cloneAutoGearItems(diff.remove)
            }, combo, scenarioDiffMap);
            if (!adjusted.add.length && !adjusted.remove.length) return;
            rules.push({
              id: generateAutoGearId('rule'),
              label: combinedLabel,
              scenarios: combo.slice(),
              add: adjusted.add,
              remove: adjusted.remove
            });
          });
        }
      }
    }
  }

  buildDefaultMatteboxAutoGearRules().forEach(rule => rules.push(rule));
  if (!rules.length) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults) markAutoGearDefaultsSeeded();
    return;
  }
  setAutoGearRules(rules);
  markAutoGearDefaultsSeeded();
}

function resetAutoGearRulesToFactoryAdditions() {
  const langTexts = texts[currentLang] || texts.en || {};
  const confirmation = langTexts.autoGearResetFactoryConfirm
    || texts.en?.autoGearResetFactoryConfirm
    || 'Replace your automatic gear rules with the default additions?';
  if (typeof confirm === 'function' && !confirm(confirmation)) {
    return;
  }

  const backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
  if (!backupName) {
    return;
  }

  try {
    setAutoGearRules([]);
    clearAutoGearDefaultsSeeded();
    closeAutoGearEditor();
    seedAutoGearRulesFromCurrentProject();
    const updatedRules = getAutoGearRules();
    renderAutoGearRulesList();
    renderAutoGearDraftLists();
    updateAutoGearCatalogOptions();
    const messageKey = updatedRules.length
      ? 'autoGearResetFactoryDone'
      : 'autoGearResetFactoryEmpty';
    const fallback = updatedRules.length
      ? 'Automatic gear rules restored to factory additions.'
      : 'Factory additions unavailable. Automatic gear rules cleared.';
    const message = langTexts[messageKey]
      || texts.en?.[messageKey]
      || fallback;
    const type = updatedRules.length ? 'success' : 'warning';
    showNotification(type, message);
  } catch (error) {
    console.error('Failed to reset automatic gear rules to factory additions', error);
    const errorMsg = langTexts.autoGearResetFactoryError
      || texts.en?.autoGearResetFactoryError
      || 'Reset failed. Please try again.';
    showNotification('error', errorMsg);
  }
}

function collectAutoGearCatalogNames() {
  const names = new Set();
  const addName = name => {
    if (looksLikeGearName(name)) names.add(name);
  };
  const seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  const visit = obj => {
    if (!obj || typeof obj !== 'object') return;
    if (seen) {
      if (seen.has(obj)) return;
      seen.add(obj);
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return;
      addName(key);
      visit(value);
    });
  };
  if (typeof devices === 'object' && devices) {
    visit(devices);
  }
  autoGearRules.forEach(rule => {
    [...rule.add, ...rule.remove].forEach(item => addName(item.name));
  });
  return Array.from(names).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

function collectAutoGearMonitorNames() {
  const names = new Set();
  const addName = name => {
    if (typeof name === 'string') {
      const trimmed = name.trim();
      if (trimmed) names.add(trimmed);
    }
  };
  const monitorDb = devices && devices.monitors ? devices.monitors : null;
  if (monitorDb && typeof monitorDb === 'object') {
    Object.keys(monitorDb).forEach(addName);
  }
  const directorDb = devices && devices.directorMonitors ? devices.directorMonitors : null;
  if (directorDb && typeof directorDb === 'object') {
    Object.keys(directorDb)
      .filter(name => name && name !== 'None')
      .forEach(addName);
  }
  autoGearRules.forEach(rule => {
    [...(rule.add || []), ...(rule.remove || [])].forEach(item => {
      if (item && typeof item === 'object' && item.selectorDefault) {
        addName(item.selectorDefault);
      }
    });
  });
  return Array.from(names).sort(localeSort);
}

function updateAutoGearMonitorCatalogOptions() {
  if (!autoGearMonitorCatalog) return;
  const names = collectAutoGearMonitorNames();
  autoGearMonitorCatalog.innerHTML = '';
  names.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    autoGearMonitorCatalog.appendChild(option);
  });
}

const getCssVariableValue = (name, fallback = '') => {
  if (typeof document === 'undefined') return fallback;
  const root = document.documentElement;
  if (!root) return fallback;
  const computed = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function'
    ? window.getComputedStyle(root).getPropertyValue(name).trim()
    : '';
  if (computed) return computed;
  const inline = root.style.getPropertyValue(name).trim();
  return inline || fallback;
};

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

function updateInstallBannerPosition() {
  if (typeof document === 'undefined') return;
  const installBanner = document.getElementById('installPromptBanner');
  if (!installBanner) return;
  const offlineIndicator = document.getElementById('offlineIndicator');
  if (offlineIndicator && offlineIndicator.style.display !== 'none') {
    const rect = typeof offlineIndicator.getBoundingClientRect === 'function'
      ? offlineIndicator.getBoundingClientRect()
      : null;
    const height = rect && typeof rect.height === 'number' && rect.height > 0
      ? rect.height
      : offlineIndicator.offsetHeight || 0;
    installBanner.style.top = `${height}px`;
  } else {
    installBanner.style.top = '0';
  }
}

/**
 * Initialize the offline status indicator.
 *
 * Looks for an element with the id `offlineIndicator` and toggles its
 * visibility based on the browser's online state. If the element is not
 * found, the function quietly does nothing.
 */
function setupOfflineIndicator() {
  const offlineIndicator = document.getElementById('offlineIndicator');
  if (!offlineIndicator) return;
  const updateOnlineStatus = () => {
    offlineIndicator.style.display = navigator.onLine ? 'none' : 'block';
    updateInstallBannerPosition();
  };
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

if (typeof window !== 'undefined') {
  setupOfflineIndicator();
}

/**
 * Close the sidebar menu if it is open.
 */
function closeSideMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const toggle = document.getElementById('menuToggle');
  if (!menu || !overlay || !toggle) return;
  menu.classList.remove('open');
  menu.setAttribute('hidden', '');
  overlay.classList.add('hidden');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menu');
}

/**
 * Open the sidebar menu if it is currently closed.
 */
function openSideMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const toggle = document.getElementById('menuToggle');
  if (!menu || !overlay || !toggle) return;
  if (menu.classList.contains('open')) return;
  menu.classList.add('open');
  menu.removeAttribute('hidden');
  overlay.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
}

/**
 * Initialize sidebar menu toggle.
 */
function setupSideMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  if (!toggle || !menu || !overlay) return;

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  });

  overlay.addEventListener('click', closeSideMenu);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeSideMenu();
      toggle.focus();
    }
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        event.preventDefault();
        document.querySelector(hash)?.scrollIntoView();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      closeSideMenu();
    });
  });
}

function setupResponsiveControls() {
  const topBar = document.getElementById('topBar');
  const featureSearch = topBar?.querySelector('.feature-search');
  const controls = topBar?.querySelector('.controls');
  const sidebarControls = document.querySelector('#sideMenu .sidebar-controls');
  if (
    !topBar ||
    !featureSearch ||
    !controls ||
    !sidebarControls ||
    typeof window.matchMedia !== 'function'
  )
    return;

  const mql = window.matchMedia('(max-width: 768px)');

  const relocate = () => {
    if (mql.matches) {
      sidebarControls.appendChild(featureSearch);
      sidebarControls.appendChild(controls);
    } else {
      topBar.appendChild(featureSearch);
      topBar.appendChild(controls);
    }
  };

  mql.addEventListener('change', relocate);
  relocate();
}

function initializeLayoutControls() {
  setupSideMenu();
  setupResponsiveControls();
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const runLayoutInitialization = () => {
    initializeLayoutControls();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLayoutInitialization, { once: true });
  } else {
    runLayoutInitialization();
  }
}

/**
 * Escape a string for safe insertion into HTML.
 *
 * The helper delays touching the DOM until first use to avoid
 * ReferenceErrors in environments where `document` is defined as an
 * uninitialised `let` binding (e.g. Safari). When no DOM is present the
 * original string is returned unchanged.
 *
 * @param {string} str - Text that may contain HTML characters.
 * @returns {string} The escaped string.
 */
let escapeDiv;
function escapeHtml(str) {
  if (!escapeDiv && typeof globalThis !== 'undefined' && globalThis.document) {
    escapeDiv = globalThis.document.createElement('div');
  }
  if (!escapeDiv) return String(str);
  escapeDiv.textContent = str;
  return escapeDiv.innerHTML;
}

// Use a Set for O(1) lookups when validating video output types
const VIDEO_OUTPUT_TYPES = new Set([
  '3G-SDI',
  '6G-SDI',
  '12G-SDI',
  'Mini BNC',
  'HDMI',
  'Mini HDMI',
  'Micro HDMI',
  'DisplayPort'
]);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const localeSort = (a, b) => collator.compare(a, b);

const DEFAULT_FILTER_SIZE = '4x5.65';

let showAutoBackups = false;
try {
  if (typeof localStorage !== 'undefined') {
    showAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
  }
} catch (e) {
  console.warn('Could not load auto backup visibility preference', e);
}

// Labels for B-Mount support are defined in translations.js using the keys
// batteryBMountLabel, totalCurrent336Label and totalCurrent216Label.

function getSetups() {
  return loadSetups();
}

function storeSetups(setups) {
  saveSetups(setups);
}

function storeDevices(deviceData) {
  saveDeviceData(deviceData);
}

function loadSession() {
  return typeof loadSessionState === 'function' ? loadSessionState() : null;
}

function storeSession(state) {
  if (typeof saveSessionState === 'function') {
    saveSessionState(state);
  }
}

/**
 * Toggle a dialog element's visibility, gracefully handling browsers that do
 * not support the dialog `showModal` or `close` APIs. When those methods are
 * unavailable the function falls back to manipulating the `open` attribute
 * directly.
 *
 * @param {HTMLDialogElement} dialog - The dialog to operate on.
 * @param {boolean} shouldOpen - Whether the dialog should be opened or
 *   closed.
 */
function toggleDialog(dialog, shouldOpen) {
  if (!dialog) return;
  if (shouldOpen) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  } else if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}

/**
 * Open a dialog element, falling back to setting the `open` attribute when
 * the `showModal` method is unavailable.
 *
 * @param {HTMLDialogElement} dialog - The dialog to open.
 */
function openDialog(dialog) {
  toggleDialog(dialog, true);
}

/**
 * Close a dialog element, removing the `open` attribute if the `close`
 * method is not supported.
 *
 * @param {HTMLDialogElement} dialog - The dialog to close.
 */
function closeDialog(dialog) {
  toggleDialog(dialog, false);
}

/**
 * Determine whether a dialog element is currently open.
 *
 * @param {HTMLDialogElement} dialog - The dialog to inspect.
 * @returns {boolean} True if the dialog is open.
 */
function isDialogOpen(dialog) {
  if (!dialog) return false;
  if (typeof dialog.open === 'boolean') {
    return dialog.open;
  }
  return dialog.hasAttribute('open');
}

/**
 * Memoize a normalisation function for repeated lookups.
 *
 * The provided function receives both the original trimmed string and a
 * lowercase key. Results are cached to avoid recomputing normalisations for
 * the same input.
 *
 * @param {(value: string, key: string) => string} fn - Function that performs
 *   normalisation.
 * @returns {(value: string) => string} Wrapped function with memoisation and
 *   empty-string fallback for falsy inputs.
 */
function memoizeNormalization(fn) {
  const cache = new Map();
  return value => {
    if (!value) return '';
    const str = String(value)
      .replace(/[™®]/g, '')
      .trim();
    const key = str.toLowerCase();
    if (!cache.has(key)) cache.set(key, fn(str, key));
    return cache.get(key);
  };
}

const VIDEO_TYPE_PATTERNS = [
  { needles: ['12g'], value: '12G-SDI' },
  { needles: ['6g'], value: '6G-SDI' },
  { needles: ['3g'], value: '3G-SDI' },
  // Accept both "HD-SDI" and "HD SDI" spellings
  { needles: ['hd', 'sdi'], value: '3G-SDI' },
  { needles: ['mini', 'bnc'], value: 'Mini BNC' },
  { needles: ['micro', 'hdmi'], value: 'Micro HDMI' },
  { needles: ['mini', 'hdmi'], value: 'Mini HDMI' },
  { needles: ['hdmi'], value: 'HDMI' },
  { needles: ['displayport'], value: 'DisplayPort' },
  { needles: ['display', 'port'], value: 'DisplayPort' },
  { needles: ['dp'], value: 'DisplayPort' }
];

const normalizeVideoType = memoizeNormalization((_, key) => {
  const match = VIDEO_TYPE_PATTERNS.find(({ needles }) =>
    needles.every(n => key.includes(n))
  );
  return match ? match.value : '';
});

const FIZ_CONNECTOR_MAP = {
  'lemo 4-pin (lbus)': 'LBUS (LEMO 4-pin)',
  'lbus (lemo 4-pin)': 'LBUS (LEMO 4-pin)',
  'lbus (4-pin lemo)': 'LBUS (LEMO 4-pin)',
  'lbus (4-pin lemo for motors)': 'LBUS (LEMO 4-pin)',
  '4-pin lemo (lbus)': 'LBUS (LEMO 4-pin)',
  'lemo 4-pin': 'LEMO 4-pin',
  '4-pin lemo': 'LEMO 4-pin',
  'lemo 7-pin': 'LEMO 7-pin',
  'lemo 7-pin 1b': 'LEMO 7-pin',
  '7-pin lemo': 'LEMO 7-pin',
  '7-pin lemo (lcs)': 'LEMO 7-pin (LCS)',
  '7-pin lemo (cam)': 'LEMO 7-pin (CAM)',
  'ext (lemo 7-pin)': 'EXT LEMO 7-pin',
  'hirose 12pin': 'Hirose 12-pin',
  '12-pin hirose': 'Hirose 12-pin',
  '12pin broadcast connector': 'Hirose 12-pin',
  'lens 12 pin': 'Hirose 12-pin',
  'lens terminal 12-pin': 'Hirose 12-pin',
  'lens terminal 12-pin jack': 'Hirose 12-pin',
  'lens terminal': 'Hirose 12-pin',
  'usb type-c': 'USB-C',
  'usb-c': 'USB-C',
  'usb-c (usb 3.2 / 3.1 gen 1)': 'USB-C',
  'usb-c / gigabit ethernet (via adapter)': 'USB-C',
  'active ef mount': 'Active EF mount',
  'lanc (2.5mm stereo mini jack)': 'LANC',
  '2.5 mm sub-mini (lanc)': 'LANC',
  'remote a (2.5mm)': 'REMOTE A connector',
  'remote control terminal': 'REMOTE A connector',
  'remote 8 pin': 'REMOTE B connector'
};

function createMapNormalizer(map) {
  return memoizeNormalization((str, key) => map[key] || str);
}

const normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);

const VIEWFINDER_TYPE_MAP = {
  'dsmc3 red touch 7" lcd (optional)': 'RED Touch 7" LCD (Optional)',
  'red touch 7.0" lcd (optional)': 'RED Touch 7" LCD (Optional)',
  'lcd touch panel': 'LCD touchscreen',
  'lcd touchscreen': 'LCD touchscreen',
  'native lcd capacitive touchscreen': 'LCD touchscreen',
  'integrated touchscreen lcd': 'LCD touchscreen',
  'free-angle lcd': 'Vari-angle LCD',
  'lcd monitor (native)': 'Integrated LCD monitor',
  'native lcd viewfinder': 'Integrated LCD monitor',
  'lcd monitor lm-v2 (supplied)': 'LCD Monitor LM-V2',
  'integrated main monitor': 'Integrated LCD monitor',
  'optional evf-v70 viewfinder': 'EVF-V70 (Optional)',
  'optional evf-v50': 'EVF-V50 (Optional)',
  'optional oled viewfinder': 'OLED EVF (Optional)',
  'blackmagic pocket cinema camera pro evf (optional)': 'Blackmagic Pro EVF (Optional)',
  'external backlit lcd status display': 'LCD status display',
  'built-in fold-out lcd': 'Fold-out LCD',
  'oled lvf (live view finder)': 'OLED EVF',
  'lcd capacitive touchscreen': 'LCD touchscreen',
  'lemo 26 pin': 'LEMO 26-pin port'
};

const normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);

const POWER_PORT_TYPE_MAP = {
  'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
  'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
  'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
  'lemo 8-pin': 'Bat LEMO 8-pin',
  '2-pin dc-input': '2-pin DC-IN',
  '2-pin xlr': 'XLR 2-pin',
  '2-pin locking connector': 'LEMO 2-pin',
  '2-pin locking connector / 2-pin lemo': 'LEMO 2-pin',
  '4-pin xlr / dc in 12v': 'XLR 4-pin',
  '4-pin xlr / v-lock': 'XLR 4-pin',
  'xlr 4-pin jack': 'XLR 4-pin',
  'xlr 4-pin (main input)': 'XLR 4-pin',
  'xlr-type 4 pin (male) / square-shaped 5 pin connector (battery)': 'XLR 4-pin / Square 5-pin',
  '12-pin molex connector (at battery plate rear) / 4-pin xlr (external power)': 'Molex 12-pin / XLR 4-pin',
  'battery slot': 'Battery Slot',
  'usb-c': 'USB-C',
  'usb type-c': 'USB-C',
  'usb-c pd': 'USB-C PD',
  'usb-c (power delivery)': 'USB-C PD',
  'dc input': 'DC IN',
  'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
  '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN / TB50'
};

const mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);

function normalizePowerPortType(type) {
  if (!type) return [];
  const toArray = val =>
    mapPowerPortOne(val)
      .split('/')
      .map(p => mapPowerPortOne(p))
      .filter(Boolean);
  return Array.isArray(type) ? type.flatMap(toArray) : toArray(type);
}

function ensureList(list, defaults) {
  if (!Array.isArray(list)) return [];
  return list.map(item =>
    typeof item === 'string'
      ? { ...defaults, type: item }
      : { ...defaults, ...(item || {}) }
  );
}

function fixPowerInput(dev) {
  if (!dev) return;
  if (dev.powerInput && !dev.power?.input) {
    dev.power = { ...(dev.power || {}), input: { type: normalizePowerPortType(dev.powerInput) } };
    delete dev.powerInput;
  }
  const input = dev.power?.input;
  if (!input) return;
  const normalizeEntry = it => {
    if (typeof it === 'string') {
      return { type: normalizePowerPortType(it) };
    }
    if (it) {
      const { portType: pType, type: tType, ...rest } = it;
      const typeField = (!tType && pType) ? pType : tType;
      return { ...rest, type: typeField ? normalizePowerPortType(typeField) : [] };
    }
    return { type: [] };
  };
  dev.power.input = Array.isArray(input) ? input.map(normalizeEntry) : normalizeEntry(input);
}

function applyFixPowerInput(collection) {
  if (!collection || typeof collection !== 'object') return;
  Object.values(collection).forEach(fixPowerInput);
}


// Normalize various camera properties so downstream logic works with
// consistent structures and value formats.
function unifyDevices(devicesData) {
  if (!devicesData || typeof devicesData !== 'object') return;
  Object.values(devicesData.cameras || {}).forEach(cam => {
    if (cam.power?.input && cam.power.input.powerDrawWatts !== undefined) {
      delete cam.power.input.powerDrawWatts;
    }
    fixPowerInput(cam);
    if (Array.isArray(cam.power?.batteryPlateSupport)) {
      cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(it => {
        if (typeof it === 'string') {
          const m = it.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
          const type = m ? m[1].trim() : it;
          let mount = m && m[2] ? m[2].trim().toLowerCase() : '';
          if (!mount) {
            mount = /adapted|via adapter/i.test(it) ? 'adapted' : 'native';
          } else if (/via adapter/i.test(mount)) {
            mount = 'adapted';
          }
          const notes = m && m[3] ? m[3].trim() : (/via adapter/i.test(it) ? 'via adapter' : '');
          return { type, mount, notes };
        }
        return {
          type: it.type || '',
          mount: (it.mount ? it.mount : (it.native ? 'native' : (it.adapted ? 'adapted' : 'native'))).toLowerCase(),
          notes: it.notes || ''
        };
      });
    }
    if (cam.power) {
      cam.power.powerDistributionOutputs = ensureList(cam.power.powerDistributionOutputs, {
        type: '',
        voltage: '',
        current: '',
        wattage: null,
        notes: ''
      });
    }
    cam.videoOutputs = ensureList(cam.videoOutputs, { type: '', notes: '' }).flatMap(vo => {
      const { count, ...rest } = vo || {};
      const norm = normalizeVideoType(rest.type);
      if (!VIDEO_OUTPUT_TYPES.has(norm)) return [];
      const parsedCount = parseInt(count, 10);
      const num = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 1;
      const base = { ...rest, type: norm, notes: rest.notes || '' };
      return Array.from({ length: num }, () => ({ ...base }));
    });
    cam.fizConnectors = ensureList(cam.fizConnectors, { type: '', notes: '' }).map(fc => {
      const { type, ...rest } = fc || {};
      return { ...rest, type: normalizeFizConnectorType(type) };
    });
    cam.viewfinder = ensureList(cam.viewfinder, { type: '', resolution: '', connector: '', notes: '' }).map(vf => {
      const { type, ...rest } = vf || {};
      return {
        ...rest,
        type: normalizeViewfinderType(type)
      };
    });
    cam.recordingMedia = ensureList(cam.recordingMedia, { type: '', notes: '' }).map(m => {
      let { type = '', notes = '' } = m || {};
      const match = type.match(/^(.*?)(?:\((.*)\))?$/);
      if (match) {
        type = match[1].trim();
        notes = notes || (match[2] ? match[2].trim() : '');
      }
      if (/^SD UHS-II$/i.test(type)) {
        type = 'SD Card';
        notes = notes ? `${notes}; UHS-II` : 'UHS-II';
      } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
        type = 'SD Card';
        notes = 'UHS-II/UHS-I';
      } else if (type === 'CFast 2.0 card slots') {
        type = 'CFast 2.0';
        notes = notes || 'Dual Slots';
      } else if (type === 'CFexpress Type B (Dual Slots)') {
        type = 'CFexpress Type B';
        notes = notes || 'Dual Slots';
      } else if (type === 'CFexpress Type B (via adapter)') {
        type = 'CFexpress Type B';
        notes = notes || 'via adapter';
      } else if (/^SD UHS-II \(Dual Slots\)$/i.test(type)) {
        type = 'SD Card';
        notes = notes ? `${notes}; UHS-II (Dual Slots)` : 'UHS-II (Dual Slots)';
      } else if (type === 'SD Card (Dual Slots)') {
        type = 'SD Card';
        notes = notes || 'Dual Slots';
      } else if (type === 'SD card slot (for proxy/backup)') {
        type = 'SD Card';
        notes = notes || 'for proxy/backup';
      }
      return { type, notes };
    });
    cam.timecode = ensureList(cam.timecode, { type: '', notes: '' });
    cam.lensMount = ensureList(cam.lensMount, { type: '', mount: 'native', notes: '' })
      .map(lm => ({
        type: lm.type,
        mount: (lm.mount ? lm.mount.toLowerCase() : 'native'),
        notes: lm.notes || ''
      }))
      .filter((lm, idx, arr) =>
        idx === arr.findIndex(o => o.type === lm.type && o.mount === lm.mount && o.notes === lm.notes)
      );
  });

  ['monitors', 'video', 'viewfinders'].forEach(key => {
    applyFixPowerInput(devicesData[key]);
  });

  const fizGroups = devicesData.fiz || {};
  ['motors', 'controllers', 'distance'].forEach(key => {
    applyFixPowerInput(fizGroups[key]);
  });

  // Normalize FIZ motors
  Object.values(devicesData.fiz?.motors || {}).forEach(m => {
    if (!m) return;
    if (m.connector && !m.fizConnector) {
      m.fizConnector = m.connector;
      delete m.connector;
    }
    if (m.fizConnector) {
      m.fizConnector = normalizeFizConnectorType(m.fizConnector);
    }
  });

  // Normalize FIZ controllers
  Object.values(devicesData.fiz?.controllers || {}).forEach(c => {
    if (!c) return;
    if (c.FIZ_connector && !c.fizConnector && !c.fizConnectors) {
      c.fizConnector = c.FIZ_connector;
      delete c.FIZ_connector;
    }
    if (Array.isArray(c.fizConnectors)) {
      c.fizConnectors = c.fizConnectors.map(fc => {
        if (!fc) return { type: '' };
        const type = normalizeFizConnectorType(fc.type || fc);
        const notes = fc.notes || undefined;
        return notes ? { type, notes } : { type };
      });
    } else if (c.fizConnector) {
      const parts = String(c.fizConnector)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      c.fizConnectors = parts.map(p => ({ type: normalizeFizConnectorType(p) }));
      delete c.fizConnector;
    } else {
      c.fizConnectors = [];
    }
  });
}

// Store a deep copy of the initial 'devices' data as defined in the device files.
// This 'defaultDevices' will be used when reverting the database.
// Initialize defaultDevices only if it hasn't been declared yet, to prevent
// "already declared" errors if the script is loaded multiple times.
if (window.defaultDevices === undefined) {
  window.defaultDevices = JSON.parse(JSON.stringify(devices));
  unifyDevices(window.defaultDevices);
}

// Load any saved device data from localStorage
let storedDevices = loadDeviceData();
if (storedDevices) {
  // Merge stored devices with the defaults so that categories missing
  // from saved data (e.g. FIZ) fall back to the built-in definitions.
  const merged = JSON.parse(JSON.stringify(window.defaultDevices));
  for (const [key, value] of Object.entries(storedDevices)) {
    if (key === 'fiz' && value && typeof value === 'object') {
      merged.fiz = merged.fiz || {};
      for (const [sub, subVal] of Object.entries(value)) {
        merged.fiz[sub] = {
          ...(merged.fiz[sub] || {}),
          ...(subVal || {}),
        };
      }
    } else if (merged[key] && typeof merged[key] === 'object') {
      merged[key] = { ...merged[key], ...(value || {}) };
    } else {
      merged[key] = value;
    }
  }
  devices = merged;
}
unifyDevices(devices);

function getBatteryPlateSupport(name) {
  const cam = devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return [];
  return cam.power.batteryPlateSupport.filter(Boolean);
}

function getSupportedBatteryPlates(name) {
  return getBatteryPlateSupport(name)
    .map(bp => bp.type)
    .filter(Boolean);
}

function getAvailableBatteryPlates(name) {
  const support = getBatteryPlateSupport(name);
  if (!support.length) return [];
  const nativeTypes = new Set(
    support
      .filter(bp => bp.mount === 'native' && bp.type)
      .map(bp => bp.type)
  );
  if (nativeTypes.size === 1 && nativeTypes.has('B-Mount')) {
    return ['B-Mount'];
  }
  return [...new Set(getSupportedBatteryPlates(name))];
}

function supportsMountCamera(name, mountType) {
  return getAvailableBatteryPlates(name).includes(mountType);
}

function supportsBMountCamera(name) {
  return supportsMountCamera(name, 'B-Mount');
}

function supportsGoldMountCamera(name) {
  return supportsMountCamera(name, 'Gold-Mount');
}

function getBatteriesByMount(mountType) {
  const out = {};
  for (const [name, info] of Object.entries(devices.batteries)) {
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}

function getHotswapsByMount(mountType) {
  const out = {};
  for (const [name, info] of Object.entries(devices.batteryHotswaps || {})) {
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}

function getSelectedPlate() {
  const camName = cameraSelect.value;
  const plates = getAvailableBatteryPlates(camName);
  if (!plates.length) return null;
  return batteryPlateSelect.value || (plates.includes('V-Mount') ? 'V-Mount' : plates[0]);
}

function isSelectedPlateNative(camName) {
  const plate = getSelectedPlate();
  const cam = devices.cameras[camName];
  if (!plate || !cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(bp => bp.type === plate && bp.mount === 'native');
}

function shortConnLabel(type) {
  if (!type) return '';
  return String(type).replace(/\(.*?\)/, '').trim();
}

function formatConnLabel(from, to) {
  const a = shortConnLabel(from);
  const b = shortConnLabel(to);
  if (!a) return b || '';
  if (!b || a.toLowerCase() === b.toLowerCase()) return a;
  return `${a} to ${b}`;
}


const hasCamConnector = str => /CAM/i.test(str);
const hasLemo7PinConnector = str => /7-pin/i.test(str);

// Collect a list of FIZ connector type strings from a device definition.
function getFizConnectorTypes(device) {
  if (!device) return [];
  if (Array.isArray(device.fizConnectors)) {
    return device.fizConnectors.map(fc => fc.type);
  }
  return device.fizConnector ? [device.fizConnector] : [];
}

function controllerCamPort(name) {
  const isRf = /cforce.*rf/i.test(name) || /RIA-1/i.test(name);
  if (isRf) return 'Cam';
  const c = devices.fiz?.controllers?.[name];
  if (c) {
    if (/UMC-4/i.test(name)) return '3-Pin R/S';
    const connStr = getFizConnectorTypes(c).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  const m = devices.fiz?.motors?.[name];
  if (m) {
    const connStr = getFizConnectorTypes(m).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  if (isArriOrCmotion(name) && !isRf) return 'LBUS';
  return 'FIZ Port';
}

function controllerDistancePort(name) {
  const c = devices.fiz?.controllers?.[name];
  if (/RIA-1/i.test(name) || /UMC-4/i.test(name)) return 'Serial';
  if (getFizConnectorTypes(c).some(type => /SERIAL/i.test(type))) return 'Serial';
  return 'LBUS';
}

function controllerPriority(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name) || /UMC-4/i.test(name)) return 0;
  if (/Master Grip/i.test(name) || /ZMU-4/i.test(name) || /OCU-1/i.test(name)) return 1;
  return 2;
}

function motorPriority(name) {
  const m = devices.fiz?.motors?.[name];
  if (m && m.internalController && /CAM/i.test(m.fizConnector || '')) return 0;
  return 1;
}
function isArriOrCmotion(name) {
  return /^(ARRI|Arri)/i.test(name) || /cmotion/i.test(name);
}

function isArri(name) {
  return /arri/i.test(name);
}
function fizNeedsPower(name) {
  const d = devices.fiz?.controllers?.[name] || devices.fiz?.motors?.[name];
  if (!d) return false;
  const ps = String(d.powerSource || '').toLowerCase();
  if (ps.includes('internal battery') && !ps.includes('external')) return false;
  return true;
}


function firstConnector(str) {
  if (!str) return '';
  return str.split(',')[0].trim();
}

/**
 * Returns the first FIZ connector for a device, optionally prioritizing
 * connectors that match a set of regular expressions. This consolidates the
 * repeated logic for choosing between `fizConnector` and `fizConnectors` while
 * keeping any existing preference order.
 *
 * @param {object} device - Device object that may include `fizConnector` or
 *   `fizConnectors`.
 * @param {RegExp[]} [preferredMatchers=[]] - Regex patterns to prioritize.
 * @returns {string} The normalized connector label or an empty string if none
 *   is found.
 */
function getFizPort(device, preferredMatchers = []) {
  if (!device) return '';
  const connectors = Array.isArray(device.fizConnectors)
    ? device.fizConnectors
    : [];
  for (const matcher of preferredMatchers) {
    const match = connectors.find(fc => matcher.test(fc.type));
    if (match) return firstConnector(match.type);
  }
  const portStr = device.fizConnector || connectors[0]?.type;
  return firstConnector(portStr);
}

function cameraFizPort(camName, controllerPort, deviceName = '') {
  const cam = devices.cameras[camName];
  if (!cam || !Array.isArray(cam.fizConnectors) || cam.fizConnectors.length === 0) return 'LBUS';
  if (!controllerPort) return cam.fizConnectors[0].type;

  // If a non-ARRI FIZ device is attached to an ARRI camera, prefer the EXT port
  if (isArri(camName) && deviceName && !isArri(deviceName)) {
    const ext = cam.fizConnectors.find(fc => /ext/i.test(fc.type));
    if (ext) return ext.type;
  }

  const norm = shortConnLabel(firstConnector(controllerPort)).toLowerCase();
  const match = cam.fizConnectors.find(fc => shortConnLabel(fc.type).toLowerCase() === norm);
  return match ? match.type : cam.fizConnectors[0].type;
}

function controllerFizPort(name) {
  const c = devices.fiz?.controllers?.[name];
  if (/UMC-4/i.test(name)) {
    return getFizPort(c, [/LCS/i]) || 'LCS (LEMO 7-pin)';
  }
  const port = getFizPort(c);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}

function motorFizPort(name) {
  const m = devices.fiz?.motors?.[name];
  const port = getFizPort(m);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}

function distanceFizPort(name) {
  const d = devices.fiz?.distance?.[name];
  if (!d) return 'LBUS';
  const port = getFizPort(d, [/LBUS/i, /SERIAL/i]);
  if (port) return port;
  return /preston/i.test(name) ? 'Serial' : 'LBUS';
}

function fizPort(name) {
  if (devices.fiz?.controllers?.[name]) return controllerFizPort(name);
  if (devices.fiz?.motors?.[name]) return motorFizPort(name);
  if (devices.fiz?.distance?.[name]) return distanceFizPort(name);
  return 'LBUS';
}

function fizPowerPort(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name)) return 'Cam';
  return fizPort(name);
}

function sdiRate(type) {
  const m = /([\d.]+)G-SDI/i.exec(type || '');
  if (m) return parseFloat(m[1]);
  return /SDI/i.test(type || '') ? 1 : null;
}
function connectionLabel(outType, inType) {
  if (!outType || !inType) return "";
  if (/HDMI/i.test(outType) && /HDMI/i.test(inType)) return "HDMI";
  if (/SDI/i.test(outType) && /SDI/i.test(inType)) {
    const rate = Math.min(sdiRate(outType) || 0, sdiRate(inType) || 0) || sdiRate(outType) || sdiRate(inType) || 0;
    if (rate >= 12) return "12G-SDI";
    if (rate >= 6) return "6G-SDI";
    if (rate >= 3) return "3G-SDI";
    if (rate >= 1.5) return "1.5G-SDI";
    return "SDI";
  }
  if (/HDMI/i.test(outType)) return "HDMI";
  if (/SDI/i.test(outType)) return "SDI";
  return "";
}


function updateBatteryPlateVisibility() {
  const camName = cameraSelect.value;
  const plates = getAvailableBatteryPlates(camName);
  const current = batteryPlateSelect.value;
  batteryPlateSelect.innerHTML = '';
  if (plates.length) {
    plates.forEach(pt => {
      const opt = document.createElement('option');
      opt.value = pt;
      opt.textContent = pt;
      batteryPlateSelect.appendChild(opt);
    });
    let def = current;
    if (!plates.includes(def)) {
      def = plates.includes('V-Mount') ? 'V-Mount' : plates[0];
    }
    batteryPlateSelect.value = def;
    batteryPlateRow.style.display = '';
  } else {
    batteryPlateRow.style.display = 'none';
    batteryPlateSelect.value = '';
  }
  updateViewfinderSettingsVisibility();
  updateViewfinderExtensionVisibility();
  updateMonitoringConfigurationOptions();
}

function updateViewfinderSettingsVisibility() {
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  const config = monitoringConfigurationSelect?.value;
  const show = hasViewfinder && (config === 'Viewfinder only' || config === 'Viewfinder and Onboard');
  if (viewfinderSettingsRow) {
    if (show) {
      viewfinderSettingsRow.classList.remove('hidden');
    } else {
      viewfinderSettingsRow.classList.add('hidden');
      const vfSelect = document.getElementById('viewfinderSettings');
      if (vfSelect) {
        Array.from(vfSelect.options).forEach(o => { o.selected = false; });
      }
    }
  }
}

function updateMonitoringConfigurationOptions() {
  if (!monitoringConfigurationSelect) return;
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  const monitorSelected = monitorSelect && monitorSelect.value && monitorSelect.value !== 'None';
  const vfOnlyOption = Array.from(monitoringConfigurationSelect.options || [])
    .find(o => o.value === 'Viewfinder only');
  if (!vfOnlyOption) return;
  const show = hasViewfinder && !monitorSelected;
  vfOnlyOption.hidden = !show;
  if (monitoringConfigurationUserChanged) {
    if (!show && monitoringConfigurationSelect.value === 'Viewfinder only') {
      monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
    }
    updateViewfinderSettingsVisibility();
    return;
  }

  if (monitorSelected) {
    monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
  } else if (!hasViewfinder) {
    monitoringConfigurationSelect.value = 'Onboard Only';
  } else {
    monitoringConfigurationSelect.value = 'Viewfinder only';
  }
  updateViewfinderSettingsVisibility();
}

function updateViewfinderExtensionVisibility() {
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  if (viewfinderExtensionRow) {
    if (hasViewfinder) {
      viewfinderExtensionRow.classList.remove('hidden');
    } else {
      viewfinderExtensionRow.classList.add('hidden');
      const vfExtSel = document.getElementById('viewfinderExtension');
      if (vfExtSel) {
        vfExtSel.value = '';
      }
    }
  }
}

function updateBatteryLabel() {
  const label = document.getElementById('batteryLabel');
  if (!label) return;
  label.setAttribute('data-help', texts[currentLang].batterySelectHelp);
  if (getSelectedPlate() === 'B-Mount') {
    label.textContent = texts[currentLang].batteryBMountLabel || 'B-Mount Battery:';
  } else {
    label.textContent = texts[currentLang].batteryLabel;
  }
}

function updateBatteryOptions() {
  const current = batterySelect.value;
  const currentSwap = hotswapSelect.value;
  const plate = getSelectedPlate();
  const camName = cameraSelect.value;
  const supportsB = supportsBMountCamera(camName);
  const supportsGold = supportsGoldMountCamera(camName);
  let swaps;
  if (plate === 'B-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('B-Mount'), true);
    swaps = getHotswapsByMount('B-Mount');
  } else if (plate === 'V-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('V-Mount'), true);
    swaps = getHotswapsByMount('V-Mount');
  } else if (plate === 'Gold-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('Gold-Mount'), true);
    swaps = getHotswapsByMount('Gold-Mount');
  } else {
    let bats = devices.batteries;
    if (!supportsB) {
      bats = Object.fromEntries(Object.entries(bats).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
    if (!supportsGold) {
      bats = Object.fromEntries(Object.entries(bats).filter(([, b]) => b.mount_type !== 'Gold-Mount'));
    }
    populateSelect(batterySelect, bats, true);
    swaps = devices.batteryHotswaps || {};
    if (!supportsB) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
    if (!supportsGold) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(([, b]) => b.mount_type !== 'Gold-Mount'));
    }
  }
  if (!/FXLion Nano/i.test(current)) {
    swaps = Object.fromEntries(
      Object.entries(swaps).filter(([name]) => name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate')
    );
  }

  // Filter out hotswaps that cannot supply the required current
  const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
    swaps = Object.fromEntries(
      Object.entries(swaps).filter(([, info]) => typeof info.pinA !== 'number' || info.pinA >= totalCurrentLow)
    );
  }

  populateSelect(hotswapSelect, swaps, true);
  if (Array.from(batterySelect.options).some(o => o.value === current)) {
    batterySelect.value = current;
  }
  if (Array.from(hotswapSelect.options).some(o => o.value === currentSwap)) {
    hotswapSelect.value = currentSwap;
  }
  updateBatteryLabel();
}

const BRAND_KEYWORDS = {
  arri: 'arri',
  cmotion: 'cmotion',
  focusbug: 'focusbug',
  tilta: 'tilta',
  preston: 'preston',
  chrosziel: 'chrosziel',
  smallrig: 'smallrig',
  dji: 'dji',
  redrock: 'redrock',
  teradek: 'teradek'
};

function detectBrand(name) {
  if (!name) return null;
  const n = String(name).trim().toLowerCase();
  if (n === 'none') return null;
  for (const [keyword, brand] of Object.entries(BRAND_KEYWORDS)) {
    if (n.includes(keyword)) return brand;
  }
  return 'other';
}

const STATUS_CLASS_BY_LEVEL = {
  info: 'status-message--info',
  success: 'status-message--success',
  warning: 'status-message--warning',
  danger: 'status-message--danger'
};

function setStatusLevel(element, level) {
  if (!element) return;

  const severityClasses = Object.values(STATUS_CLASS_BY_LEVEL);
  if (element.classList) {
    severityClasses.forEach(cls => element.classList.remove(cls));
  } else if (typeof element.className === 'string') {
    const remaining = element.className
      .split(/\s+/)
      .filter(Boolean)
      .filter(cls => !severityClasses.includes(cls));
    element.className = remaining.join(' ');
  }

  const normalized = level && STATUS_CLASS_BY_LEVEL[level] ? level : null;
  if (normalized) {
    const severityClass = STATUS_CLASS_BY_LEVEL[normalized];
    if (element.classList) {
      if (!element.classList.contains('status-message')) {
        element.classList.add('status-message');
      }
      element.classList.add(severityClass);
    } else if (typeof element.className === 'string') {
      const classes = element.className.split(/\s+/).filter(Boolean);
      if (!classes.includes('status-message')) {
        classes.push('status-message');
      }
      classes.push(severityClass);
      element.className = Array.from(new Set(classes)).join(' ');
    }
    if (element.dataset) {
      element.dataset.statusLevel = normalized;
    } else if (element.setAttribute) {
      element.setAttribute('data-status-level', normalized);
    }
  } else if (element.dataset && 'statusLevel' in element.dataset) {
    delete element.dataset.statusLevel;
  } else if (element.removeAttribute) {
    element.removeAttribute('data-status-level');
  }
}

function checkFizCompatibility() {
  const brands = new Set();
  motorSelects.forEach(sel => { const b = detectBrand(sel.value); if (b) brands.add(b); });
  controllerSelects.forEach(sel => { const b = detectBrand(sel.value); if (b) brands.add(b); });
  const distB = detectBrand(distanceSelect.value);
  if (distB) brands.add(distB);
  const cameraBrand = detectBrand(cameraSelect.value);

  const compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;

  let incompatible = false;
  const arr = Array.from(brands);

  if (cameraBrand === 'dji' && arr.some(b => b && b !== 'dji')) {
    incompatible = true;
  } else if (arr.length > 1) {
    const allowed = ['arri', 'cmotion', 'focusbug'];
    if (arr.every(b => allowed.includes(b))) {
      incompatible = false;
    } else {
      const filtered = arr.filter(b => b !== 'other');
      const distinct = new Set(filtered);
      if (distinct.size > 1) incompatible = true;
    }
  }

  if (incompatible) {
    compatElem.textContent = texts[currentLang].incompatibleFIZWarning;
    setStatusLevel(compatElem, 'danger');
  } else {
    compatElem.textContent = '';
    setStatusLevel(compatElem, null);
  }
}

function checkFizController() {
  const compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;

  const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  if (!motors.length) return;

  const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];

  const isAmira = /Arri Amira/i.test(camName);
  const onlyCforceMiniPlus = motors.length > 0 && motors.every(n => {
    const lower = n.toLowerCase();
    return ((lower.includes('cforce mini') && !lower.includes('rf')) || lower.includes('cforce plus'));
  });
  const hasRemoteController = controllers.some(n => /ria-1|umc-4|cforce.*rf/i.test(n)) || motors.some(n => /cforce.*rf/i.test(n));
  if (isAmira && onlyCforceMiniPlus && !hasRemoteController) {
    compatElem.textContent = texts[currentLang].amiraCforceRemoteWarning;
    setStatusLevel(compatElem, 'danger');
    return;
  }

  const cameraHasLBUS = Array.isArray(cam?.fizConnectors) &&
    cam.fizConnectors.some(fc => /LBUS/i.test(fc.type));
  let hasController = cameraHasLBUS && /arri/i.test(camName);

  controllers.forEach(name => {
    const c = devices.fiz.controllers[name];
    if (!c) return;
    const connStr = (c.fizConnectors || []).map(fc => fc.type).join(', ');
    if (/CAM|SERIAL|Motor/i.test(connStr)) hasController = true;
    if (c.internalController) hasController = true;
  });

  motors.forEach(name => {
    const m = devices.fiz.motors[name];
    if (m && m.internalController) hasController = true;
  });

  const needController = motors.some(name => {
    const m = devices.fiz.motors[name];
    return m && m.internalController === false;
  });

  if (needController && !hasController) {
    compatElem.textContent = texts[currentLang].missingFIZControllerWarning;
    setStatusLevel(compatElem, 'danger');
  }
}

function checkArriCompatibility() {
  const compatElem = document.getElementById('compatWarning');
  if (!compatElem || compatElem.textContent) return;

  let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  motors.sort((a, b) => motorPriority(a) - motorPriority(b));
  const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
  const hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    const [m] = motors.splice(internalIdx, 1);
    motors.unshift(m);
  }
  let controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));
  const distance = distanceSelect.value;

  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];
  const cameraHasLBUS = Array.isArray(cam?.fizConnectors) &&
    cam.fizConnectors.some(fc => /LBUS/i.test(fc.type));
  const builtInController = cameraHasLBUS && /arri/i.test(camName);

  const usesUMC4 = controllers.some(n => /UMC-4/i.test(n));
  const usesRIA1 = controllers.some(n => /RIA-1/i.test(n));
  const usesRF = controllers.some(n => /cforce.*rf/i.test(n)) || motors.some(m => /cforce.*rf/i.test(m));

  const camCounts = /(Alexa Mini LF|Alexa Mini|Alexa 35)/i.test(camName);
  const onlyMasterGrip =
    controllers.length > 0 &&
    controllers.every(n => /Master Grip/i.test(n)) &&
    !camCounts;

  let msg = '';
  const clmRegex = /CLM-[345]/i;
  const hasCLM = motors.some(m => clmRegex.test(m));
  if (hasCLM && !usesUMC4) {
    msg = texts[currentLang].arriCLMNoUMC4Warning;
  } else if (usesUMC4 && motors.some(m => !clmRegex.test(m))) {
    msg = texts[currentLang].arriUMC4Warning;
  } else if ((usesRIA1 || usesRF) && motors.some(m => clmRegex.test(m))) {
    msg = texts[currentLang].arriRIA1Warning;
  } else if (
    distance &&
    distance !== 'None' &&
    !(usesUMC4 || usesRIA1 || usesRF || builtInController)
  ) {
    msg = texts[currentLang].distanceControllerWarning;
  } else if (onlyMasterGrip && !usesRF) {
    msg = texts[currentLang].masterGripWirelessWarning;
  }

  if (msg) {
    compatElem.textContent = msg;
    if (msg === texts[currentLang].arriUMC4Warning) {
      setStatusLevel(compatElem, 'warning');
    } else {
      setStatusLevel(compatElem, 'danger');
    }
  }
}

let gearItemTranslations = {};
// Load translations when not already present (mainly for tests)
if (typeof texts === 'undefined') {
  try {
    const translations = require('./translations.js');
    window.texts = translations.texts;
    window.categoryNames = translations.categoryNames;
    window.gearItems = translations.gearItems;
    gearItemTranslations = translations.gearItems || {};
  } catch (e) {
    console.warn('Failed to load translations', e);
  }
} else {
  gearItemTranslations = typeof gearItems !== 'undefined' ? gearItems : {};
}


// Determine initial language (default English)
let currentLang = "en";
let updateHelpQuickLinksForLanguage;
let lastRuntimeHours = null;
try {
  const savedLang = localStorage.getItem("language");
  const supported = ["en", "de", "es", "fr", "it"];
  if (savedLang && supported.includes(savedLang)) {
    currentLang = savedLang;
  } else if (typeof navigator !== "undefined") {
    const navLangs = Array.isArray(navigator.languages)
      ? navigator.languages
      : [navigator.language];
    for (const lang of navLangs) {
      const short = String(lang).slice(0, 2).toLowerCase();
      if (supported.includes(short)) {
        currentLang = short;
        break;
      }
    }
  }
} catch (e) {
  console.warn("Could not load language from localStorage", e);
}

// Helper to apply translations to all UI text
function setLanguage(lang) {
  currentLang = lang;
  // persist selected language
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // ensure dropdown reflects the active language
  if (languageSelect) {
    languageSelect.value = lang;
  }
  if (settingsLanguage) {
    settingsLanguage.value = lang;
  }
  // update html lang attribute for better persistence
  document.documentElement.lang = lang;
  // Document title and main heading share the same text
  document.title = texts[lang].appTitle;
  document.getElementById("mainTitle").textContent = texts[lang].appTitle;
  document.getElementById("tagline").textContent = texts[lang].tagline;
  if (skipLink) skipLink.textContent = texts[lang].skipToContent;
  const offlineElem = document.getElementById("offlineIndicator");
  if (offlineElem) {
    offlineElem.textContent = texts[lang].offlineIndicator;
    const offlineHelp =
      texts[lang].offlineIndicatorHelp || texts[lang].offlineIndicator;
    offlineElem.setAttribute("data-help", offlineHelp);
  }
  applyInstallTexts(lang);
  const legalLinks = LEGAL_LINKS[lang] || LEGAL_LINKS.en;
  const impressumElem = document.getElementById("impressumLink");
  if (impressumElem) {
    impressumElem.textContent = texts[lang].impressum;
    if (legalLinks?.imprint) {
      impressumElem.setAttribute("href", legalLinks.imprint);
    }
  }
  const privacyElem = document.getElementById("privacyLink");
  if (privacyElem) {
    privacyElem.textContent = texts[lang].privacy;
    if (legalLinks?.privacy) {
      privacyElem.setAttribute("href", legalLinks.privacy);
    }
  }
  // Section headings with descriptive hover help
  const setupManageHeadingElem = document.getElementById("setupManageHeading");
  setupManageHeadingElem.textContent = texts[lang].setupManageHeading;
  setupManageHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupManageHeadingHelp
  );

  const deviceSelectionHeadingElem = document.getElementById("deviceSelectionHeading");
  deviceSelectionHeadingElem.textContent = texts[lang].deviceSelectionHeading;
  deviceSelectionHeadingElem.setAttribute(
    "data-help",
    texts[lang].deviceSelectionHeadingHelp
  );

  const resultsHeadingElem = document.getElementById("resultsHeading");
  resultsHeadingElem.textContent = texts[lang].resultsHeading; // Fixed typo here
  resultsHeadingElem.setAttribute(
    "data-help",
    texts[lang].resultsHeadingHelp
  );

  const deviceManagerHeadingElem = document.getElementById("deviceManagerHeading");
  deviceManagerHeadingElem.textContent = texts[lang].deviceManagerHeading;
  deviceManagerHeadingElem.setAttribute(
    "data-help",
    texts[lang].deviceManagerHeadingHelp
  );

  const batteryComparisonHeadingElem = document.getElementById("batteryComparisonHeading");
  batteryComparisonHeadingElem.textContent = texts[lang].batteryComparisonHeading;
  batteryComparisonHeadingElem.setAttribute(
    "data-help",
    texts[lang].batteryComparisonHeadingHelp
  );

  const setupDiagramHeadingElem = document.getElementById("setupDiagramHeading");
  setupDiagramHeadingElem.textContent = texts[lang].setupDiagramHeading;
  setupDiagramHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupDiagramHeadingHelp
  );

  const sideMenuLinks = document.querySelectorAll("#sideMenu [data-nav-key]");
  sideMenuLinks.forEach((link) => {
    const navKey = link.dataset.navKey;
    if (!navKey) {
      return;
    }
    const label = texts[lang][navKey];
    if (label) {
      link.textContent = label;
      link.setAttribute("aria-label", label);
    }
    const helpKey = `${navKey}Help`;
    const helpText = texts[lang][helpKey];
    if (helpText) {
      link.setAttribute("title", helpText);
      link.setAttribute("data-help", helpText);
    } else {
      link.removeAttribute("title");
      link.removeAttribute("data-help");
    }
  });
  // Setup manager labels and buttons
  const savedSetupsLabelElem = document.getElementById("savedSetupsLabel");
  savedSetupsLabelElem.textContent = texts[lang].savedSetupsLabel;
  savedSetupsLabelElem.setAttribute("data-help", texts[lang].setupSelectHelp);
  const setupNameLabelElem = document.getElementById("setupNameLabel");
  setupNameLabelElem.textContent = texts[lang].setupNameLabel;
  setupNameLabelElem.setAttribute("data-help", texts[lang].setupNameHelp);
  setButtonLabelWithIcon(deleteSetupBtn, texts[lang].deleteSetupBtn, ICON_GLYPHS.trash);
  const sharedLinkLabelElem = document.getElementById("sharedLinkLabel");
  sharedLinkLabelElem.textContent = texts[lang].sharedLinkLabel;
  sharedLinkLabelElem.setAttribute("data-help", texts[lang].sharedLinkHelp);
  setButtonLabelWithIcon(
    applySharedLinkBtn,
    texts[lang].loadSharedLinkBtn,
    ICON_GLYPHS.fileImport
  );

  // Descriptive hover help for setup management controls
  setupSelect.setAttribute("data-help", texts[lang].setupSelectHelp);
  setupNameInput.setAttribute("data-help", texts[lang].setupNameHelp);

  deleteSetupBtn.setAttribute("title", texts[lang].deleteSetupHelp);
  deleteSetupBtn.setAttribute("aria-label", texts[lang].deleteSetupHelp);
  deleteSetupBtn.setAttribute("data-help", texts[lang].deleteSetupHelp);

  saveSetupBtn.setAttribute("title", texts[lang].saveSetupHelp);
  saveSetupBtn.setAttribute("aria-label", texts[lang].saveSetupHelp);
  saveSetupBtn.setAttribute("data-help", texts[lang].saveSetupHelp);

  generateOverviewBtn.setAttribute("title", texts[lang].generateOverviewBtn);
  generateOverviewBtn.setAttribute("data-help", texts[lang].generateOverviewHelp);

  generateGearListBtn.setAttribute("title", texts[lang].generateGearListBtn);
  generateGearListBtn.setAttribute("data-help", texts[lang].generateGearListHelp);

  const deleteGearListHelp =
    texts[lang].deleteGearListBtnHelp || texts[lang].deleteGearListBtn;
  if (deleteGearListProjectBtn) {
    setButtonLabelWithIcon(
      deleteGearListProjectBtn,
      texts[lang].deleteGearListBtn,
      ICON_GLYPHS.trash
    );
    deleteGearListProjectBtn.setAttribute("title", deleteGearListHelp);
    deleteGearListProjectBtn.setAttribute("data-help", deleteGearListHelp);
    deleteGearListProjectBtn.setAttribute("aria-label", deleteGearListHelp);
  }

  const editProjectBtnElem = document.getElementById("editProjectBtn");
  if (editProjectBtnElem) {
    editProjectBtnElem.textContent = texts[lang].editProjectBtn;
    editProjectBtnElem.setAttribute("title", texts[lang].editProjectBtn);
    editProjectBtnElem.setAttribute("data-help", texts[lang].editProjectBtn);
  }

  shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
  shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);

  if (shareDialogHeadingElem) {
    const heading = texts[lang].shareDialogTitle
      || texts.en?.shareDialogTitle
      || shareDialogHeadingElem.textContent;
    shareDialogHeadingElem.textContent = heading;
  }

  if (shareFilenameLabelElem) {
    const filenameLabel = texts[lang].shareFilenameLabel
      || texts.en?.shareFilenameLabel
      || shareFilenameLabelElem.textContent;
    shareFilenameLabelElem.textContent = filenameLabel;
  }

  if (shareConfirmBtn) {
    const confirmLabel = texts[lang].shareDialogConfirm
      || texts.en?.shareDialogConfirm
      || shareConfirmBtn.textContent;
    shareConfirmBtn.textContent = confirmLabel;
    shareConfirmBtn.setAttribute('title', confirmLabel);
    shareConfirmBtn.setAttribute('aria-label', confirmLabel);
    shareConfirmBtn.setAttribute('data-help', texts[lang].shareSetupHelp);
  }

  if (shareCancelBtn) {
    const cancelLabel = texts[lang].shareDialogCancel
      || texts.en?.shareDialogCancel
      || shareCancelBtn.textContent;
    shareCancelBtn.textContent = cancelLabel;
    shareCancelBtn.setAttribute('title', cancelLabel);
    shareCancelBtn.setAttribute('aria-label', cancelLabel);
  }

  if (shareIncludeAutoGearText) {
    const label = texts[lang].shareIncludeAutoGearLabel
      || texts.en?.shareIncludeAutoGearLabel
      || shareIncludeAutoGearText.textContent;
    shareIncludeAutoGearText.textContent = label;
    const help = texts[lang].shareIncludeAutoGearHelp
      || texts.en?.shareIncludeAutoGearHelp
      || label;
    if (shareIncludeAutoGearLabelElem) {
      shareIncludeAutoGearLabelElem.setAttribute('data-help', help);
    }
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.setAttribute('aria-label', label);
    }
  }

  let sharedImportLegendText = sharedImportLegend ? sharedImportLegend.textContent : '';
  if (sharedImportDialogHeading) {
    const title = texts[lang].sharedImportDialogTitle
      || texts.en?.sharedImportDialogTitle
      || sharedImportDialogHeading.textContent;
    sharedImportDialogHeading.textContent = title;
  }
  if (sharedImportDialogMessage) {
    const message = texts[lang].sharedImportDialogMessage
      || texts.en?.sharedImportDialogMessage
      || sharedImportDialogMessage.textContent;
    sharedImportDialogMessage.textContent = message;
    sharedImportDialogMessage.setAttribute('data-help', message);
  }
  if (sharedImportConfirmBtn) {
    const label = texts[lang].sharedImportDialogConfirm
      || texts.en?.sharedImportDialogConfirm
      || sharedImportConfirmBtn.textContent;
    sharedImportConfirmBtn.textContent = label;
    sharedImportConfirmBtn.setAttribute('data-help', label);
  }
  if (sharedImportCancelBtn) {
    const label = texts[lang].sharedImportDialogCancel
      || texts.en?.sharedImportDialogCancel
      || sharedImportCancelBtn.textContent;
    sharedImportCancelBtn.textContent = label;
    sharedImportCancelBtn.setAttribute('data-help', label);
  }
  if (sharedImportLegend) {
    const legend = texts[lang].sharedImportAutoGearLabel
      || texts.en?.sharedImportAutoGearLabel
      || sharedImportLegend.textContent;
    sharedImportLegend.textContent = legend;
    sharedImportLegendText = legend;
    if (sharedImportOptions) {
      sharedImportOptions.setAttribute('data-help', legend);
    }
  }
  if (sharedImportModeSelect && sharedImportLegendText) {
    sharedImportModeSelect.setAttribute('aria-label', sharedImportLegendText);
    sharedImportModeSelect.setAttribute('data-help', sharedImportLegendText);
  }
  if (sharedImportModeNoneOption) {
    const label = texts[lang].sharedImportAutoGearNone
      || texts.en?.sharedImportAutoGearNone
      || sharedImportModeNoneOption.textContent;
    sharedImportModeNoneOption.textContent = label;
    const help = texts[lang].sharedImportAutoGearNoneHelp
      || texts.en?.sharedImportAutoGearNoneHelp
      || label;
    sharedImportModeNoneOption.setAttribute('data-help', help);
    sharedImportModeNoneOption.setAttribute('title', help);
    sharedImportModeNoneOption.setAttribute('aria-label', label);
  }
  if (sharedImportModeProjectOption) {
    const label = texts[lang].sharedImportAutoGearProject
      || texts.en?.sharedImportAutoGearProject
      || sharedImportModeProjectOption.textContent;
    sharedImportModeProjectOption.textContent = label;
    const help = texts[lang].sharedImportAutoGearProjectHelp
      || texts.en?.sharedImportAutoGearProjectHelp
      || label;
    sharedImportModeProjectOption.setAttribute('data-help', help);
    sharedImportModeProjectOption.setAttribute('title', help);
    sharedImportModeProjectOption.setAttribute('aria-label', label);
  }
  if (sharedImportModeGlobalOption) {
    const label = texts[lang].sharedImportAutoGearGlobal
      || texts.en?.sharedImportAutoGearGlobal
      || sharedImportModeGlobalOption.textContent;
    sharedImportModeGlobalOption.textContent = label;
    const help = texts[lang].sharedImportAutoGearGlobalHelp
      || texts.en?.sharedImportAutoGearGlobalHelp
      || label;
    sharedImportModeGlobalOption.setAttribute('data-help', help);
    sharedImportModeGlobalOption.setAttribute('title', help);
    sharedImportModeGlobalOption.setAttribute('aria-label', label);
  }

  applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
  applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);

  runtimeFeedbackBtn.setAttribute("title", texts[lang].runtimeFeedbackBtn);
  runtimeFeedbackBtn.setAttribute("data-help", texts[lang].runtimeFeedbackBtnHelp);
  setButtonLabelWithIcon(runtimeFeedbackBtn, texts[lang].runtimeFeedbackBtn, ICON_GLYPHS.feedback);
  // Update the "-- New Setup --" option text
  if (setupSelect.options.length > 0) {
    setupSelect.options[0].textContent = texts[lang].newSetupOption;
  }
  checkSetupChanged();
  // Device selection labels with help
  const cameraLabelElem = document.getElementById("cameraLabel");
  cameraLabelElem.textContent = texts[lang].cameraLabel;
  cameraLabelElem.setAttribute("data-help", texts[lang].cameraSelectHelp);

  const monitorLabelElem = document.getElementById("monitorLabel");
  monitorLabelElem.textContent = texts[lang].monitorLabel;
  monitorLabelElem.setAttribute("data-help", texts[lang].monitorSelectHelp);

  const videoLabelElem = document.getElementById("videoLabel");
  videoLabelElem.textContent = texts[lang].videoLabel;
  videoLabelElem.setAttribute("data-help", texts[lang].videoSelectHelp);

  const cageLabelElem = document.getElementById("cageLabel");
  if (cageLabelElem) {
    cageLabelElem.textContent = texts[lang].cageLabel;
    cageLabelElem.setAttribute("data-help", texts[lang].cageSelectHelp);
  }

  const distanceLabelElem = document.getElementById("distanceLabel");
  distanceLabelElem.textContent = texts[lang].distanceLabel;
  distanceLabelElem.setAttribute("data-help", texts[lang].distanceSelectHelp);

  const batteryPlateLabelElem = document.getElementById("batteryPlateLabel");
  batteryPlateLabelElem.textContent = texts[lang].batteryPlateLabel;
  batteryPlateLabelElem.setAttribute("data-help", texts[lang].batteryPlateSelectHelp);

  const batteryHotswapLabelElem = document.getElementById("batteryHotswapLabel");
  if (batteryHotswapLabelElem) {
    batteryHotswapLabelElem.textContent = texts[lang].batteryHotswapLabel;
    batteryHotswapLabelElem.setAttribute("data-help", texts[lang].batteryHotswapSelectHelp);
  }

  updateBatteryLabel();
  // FIZ legend and labels
  const fizLegendElem = document.getElementById("fizLegend");
  if (fizLegendElem) {
    fizLegendElem.textContent = texts[lang].fizLegend;
    fizLegendElem.setAttribute("data-help", texts[lang].fizLegendHelp);
  }
  const fizMotorsLabelElem = document.getElementById("fizMotorsLabel");
  if (fizMotorsLabelElem) {
    fizMotorsLabelElem.textContent = texts[lang].fizMotorsLabel;
    fizMotorsLabelElem.setAttribute("data-help", texts[lang].fizMotorsHelp);
  }
  const fizControllersLabelElem = document.getElementById("fizControllersLabel");
  if (fizControllersLabelElem) {
    fizControllersLabelElem.textContent = texts[lang].fizControllersLabel;
    fizControllersLabelElem.setAttribute(
      "data-help",
      texts[lang].fizControllersHelp
    );
  }
  document
    .querySelectorAll('#motorNotesLabel,#controllerNotesLabel,#distanceNotesLabel')
    .forEach(el => {
      el.textContent = texts[lang].notesLabel;
    });
  // Results labels
  if (breakdownListElem)
    breakdownListElem.setAttribute("data-help", texts[lang].breakdownListHelp);

  const totalPowerLabelElem = document.getElementById("totalPowerLabel");
  totalPowerLabelElem.textContent = texts[lang].totalPowerLabel;
  totalPowerLabelElem.setAttribute("data-help", texts[lang].totalPowerHelp);

  const totalCurrent144LabelElem = document.getElementById(
    "totalCurrent144Label"
  );
  totalCurrent144LabelElem.textContent = texts[lang].totalCurrent144Label;
  totalCurrent144LabelElem.setAttribute(
    "data-help",
    texts[lang].totalCurrent144Help
  );

  const totalCurrent12LabelElem = document.getElementById("totalCurrent12Label");
  totalCurrent12LabelElem.textContent = texts[lang].totalCurrent12Label;
  totalCurrent12LabelElem.setAttribute(
    "data-help",
    texts[lang].totalCurrent12Help
  );

  const batteryCountLabelElem = document.getElementById("batteryCountLabel");
  batteryCountLabelElem.textContent = texts[lang].batteryCountLabel;
  batteryCountLabelElem.setAttribute(
    "data-help",
    texts[lang].batteryCountHelp
  );

  if (pinWarnElem)
    pinWarnElem.setAttribute("data-help", texts[lang].pinWarningHelp);
  if (dtapWarnElem)
    dtapWarnElem.setAttribute("data-help", texts[lang].dtapWarningHelp);
  if (hotswapWarnElem)
    hotswapWarnElem.setAttribute("data-help", texts[lang].hotswapWarningHelp);
  const unitElem = document.getElementById("batteryLifeUnit");
  if (unitElem) unitElem.textContent = texts[lang].batteryLifeUnit;
  const fb = renderFeedbackTable(getCurrentSetupKey());
  if (batteryLifeLabelElem) {
    let label = texts[lang].batteryLifeLabel;
    if (fb) {
      const userNote = texts[lang].runtimeUserCountNote.replace('{count}', fb.count);
      const idx = label.indexOf(')');
      if (idx !== -1) {
        label = `${label.slice(0, idx)}, ${userNote}${label.slice(idx)}`;
      }
    }
    batteryLifeLabelElem.textContent = label;
    batteryLifeLabelElem.setAttribute(
      "data-help",
      texts[lang].batteryLifeHelp
    );
  }
  if (runtimeAverageNoteElem) {
    runtimeAverageNoteElem.textContent =
      fb && fb.count > 4 ? texts[lang].runtimeAverageNote : '';
  }
  renderTemperatureNote(lastRuntimeHours);
  const tempNoteElem = document.getElementById("temperatureNote");
  if (tempNoteElem)
    tempNoteElem.setAttribute("data-help", texts[lang].temperatureNoteHelp);
  // Add device form labels and button
  document.getElementById("addDeviceHeading").textContent = texts[lang].addDeviceHeading;
  document.getElementById("categoryLabel").textContent = texts[lang].categoryLabel;
  document.getElementById("subcategoryLabel").textContent = texts[lang].subcategoryLabel;
  document.getElementById("deviceNameLabel").textContent = texts[lang].deviceNameLabel;
  document.getElementById("consumptionLabel").textContent = texts[lang].consumptionLabel;
  document.getElementById("capacityLabel").textContent = texts[lang].capacityLabel;
  document.getElementById("pinLabel").textContent = texts[lang].pinLabel;
  document.getElementById("dtapLabel").textContent = texts[lang].dtapLabel;
  document.getElementById("cameraWattLabel").textContent = texts[lang].cameraWattLabel;
  document.getElementById("cameraVoltageLabel").textContent = texts[lang].cameraVoltageLabel;
  document.getElementById("cameraPortTypeLabel").textContent = texts[lang].cameraPortTypeLabel;
  document.getElementById("cameraPlatesLabel").textContent = texts[lang].cameraPlatesLabel;
  document.getElementById("cameraMediaLabel").textContent = texts[lang].cameraMediaLabel;
  document.getElementById("cameraLensMountLabel").textContent = texts[lang].cameraLensMountLabel;
  document.getElementById("cameraPowerDistLabel").textContent = texts[lang].powerDistributionLabel;
  document.getElementById("cameraVideoOutputsLabel").textContent = texts[lang].videoOutputsLabel;
  document.getElementById("cameraFIZConnectorLabel").textContent = texts[lang].fizConnectorLabel;
  document.getElementById("cameraViewfinderLabel").textContent = texts[lang].viewfinderLabel;
  document.getElementById("cameraTimecodeLabel").textContent = texts[lang].timecodeLabel;
  document.getElementById("powerInputsHeading").textContent = texts[lang].powerInputsHeading;
  document.getElementById("powerDistributionHeading").textContent = texts[lang].powerDistributionHeading;
  document.getElementById("videoOutputsHeading").textContent = texts[lang].videoOutputsHeading;
  document.getElementById("fizConnectorHeading").textContent = texts[lang].fizConnectorHeading;
  document.getElementById("mediaHeading").textContent = texts[lang].mediaHeading;
  document.getElementById("viewfinderHeading").textContent = texts[lang].viewfinderHeading;
  document.getElementById("lensMountHeading").textContent = texts[lang].lensMountHeading;
  document.getElementById("timecodeHeading").textContent = texts[lang].timecodeHeading;
  document.getElementById("monitorScreenSizeLabel").textContent = texts[lang].monitorScreenSizeLabel;
  document.getElementById("monitorBrightnessLabel").textContent = texts[lang].monitorBrightnessLabel;
  document.getElementById("monitorWattLabel").textContent = texts[lang].monitorWattLabel;
  document.getElementById("monitorVoltageLabel").textContent = texts[lang].monitorVoltageLabel;
  document.getElementById("monitorPortTypeLabel").textContent = texts[lang].monitorPortTypeLabel;
  document.getElementById("monitorVideoInputsHeading").textContent = texts[lang].monitorVideoInputsHeading;
  document.getElementById("monitorVideoOutputsHeading").textContent = texts[lang].monitorVideoOutputsHeading;
  document.getElementById("monitorVideoInputsLabel").textContent = texts[lang].monitorVideoInputsLabel;
  document.getElementById("monitorVideoOutputsLabel").textContent = texts[lang].monitorVideoOutputsLabel;
  document.getElementById("monitorWirelessTxLabel").textContent = texts[lang].monitorWirelessTxLabel;
  document.getElementById("monitorLatencyLabel").textContent = texts[lang].monitorLatencyLabel;
  document.getElementById("monitorAudioOutputLabel").textContent = texts[lang].monitorAudioOutputLabel;
  document.getElementById("viewfinderDetailsHeading").textContent = texts[lang].viewfinderDetailsHeading;
  document.getElementById("viewfinderScreenSizeLabel").textContent = texts[lang].viewfinderScreenSizeLabel;
  document.getElementById("viewfinderBrightnessLabel").textContent = texts[lang].viewfinderBrightnessLabel;
  document.getElementById("viewfinderWattLabel").textContent = texts[lang].viewfinderWattLabel;
  document.getElementById("viewfinderVoltageLabel").textContent = texts[lang].viewfinderVoltageLabel;
  document.getElementById("viewfinderPortTypeLabel").textContent = texts[lang].viewfinderPortTypeLabel;
  document.getElementById("viewfinderVideoInputsHeading").textContent = texts[lang].viewfinderVideoInputsHeading;
  document.getElementById("viewfinderVideoOutputsHeading").textContent = texts[lang].viewfinderVideoOutputsHeading;
  document.getElementById("viewfinderVideoInputsLabel").textContent = texts[lang].viewfinderVideoInputsLabel;
  document.getElementById("viewfinderVideoOutputsLabel").textContent = texts[lang].viewfinderVideoOutputsLabel;
  document.getElementById("viewfinderWirelessTxLabel").textContent = texts[lang].viewfinderWirelessTxLabel;
  document.getElementById("viewfinderLatencyLabel").textContent = texts[lang].viewfinderLatencyLabel;
  document.getElementById("videoVideoInputsHeading").textContent = texts[lang].videoVideoInputsHeading;
  document.getElementById("videoVideoInputsLabel").textContent = texts[lang].videoVideoInputsLabel;
  document.getElementById("videoVideoOutputsHeading").textContent = texts[lang].videoVideoOutputsHeading;
  document.getElementById("videoVideoOutputsLabel").textContent = texts[lang].videoVideoOutputsLabel;
  document.getElementById("monitorDetailsHeading").textContent = texts[lang].monitorDetailsHeading;
  document.getElementById("monitorPowerHeading").textContent = texts[lang].monitorPowerHeading;
  // Determine text for Add/Update button
  if (addDeviceBtn.dataset.mode === "edit") {
    addDeviceBtn.textContent = texts[lang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[lang].updateDeviceBtnHelp);
  } else {
    addDeviceBtn.textContent = texts[lang].addDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[lang].addDeviceBtnHelp);
  }
  setButtonLabelWithIcon(cancelEditBtn, texts[lang].cancelEditBtn, ICON_GLYPHS.circleX);
  cancelEditBtn.setAttribute('data-help', texts[lang].cancelEditBtnHelp);
  setButtonLabelWithIcon(exportBtn, texts[lang].exportDataBtn, ICON_GLYPHS.fileExport);
  exportBtn.setAttribute('data-help', texts[lang].exportDataBtnHelp);
  setButtonLabelWithIcon(importDataBtn, texts[lang].importDataBtn, ICON_GLYPHS.fileImport);
  importDataBtn.setAttribute('data-help', texts[lang].importDataBtnHelp);
  // Placeholders for inputs
  setupNameInput.placeholder = texts[lang].setupNameLabel.replace(":", "");
  newNameInput.placeholder = texts[lang].placeholder_deviceName;
  newWattInput.placeholder = texts[lang].placeholder_watt;
  newCapacityInput.placeholder = texts[lang].placeholder_capacity;
  newPinAInput.placeholder = texts[lang].placeholder_pin;
  newDtapAInput.placeholder = texts[lang].placeholder_dtap;
  cameraVoltageInput.placeholder = texts[lang].placeholder_voltage;
  monitorVoltageInput.placeholder = texts[lang].placeholder_voltage;
  updateDeviceManagerLocalization(lang);
  // Toggle device manager button text (depends on current visibility)
  if (deviceManagerSection.classList.contains('hidden')) {
    toggleDeviceBtn.textContent = texts[lang].toggleDeviceManager;
    toggleDeviceBtn.setAttribute("title", texts[lang].toggleDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].toggleDeviceManagerHelp);
    toggleDeviceBtn.setAttribute("aria-expanded", "false");
  } else {
    toggleDeviceBtn.textContent = texts[lang].hideDeviceManager;
    toggleDeviceBtn.setAttribute("title", texts[lang].hideDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].hideDeviceManagerHelp);
    toggleDeviceBtn.setAttribute("aria-expanded", "true");
  }
  // Update newCategory select option texts
  Array.from(newCategorySelect.options).forEach(opt => {
    opt.textContent = getCategoryLabel(opt.value, lang);
  });
  // Update "None" option text in all dropdowns
  const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
  document.querySelectorAll('select option[value="None"]').forEach(opt => {
    opt.textContent = noneMap[lang] || "None";
  });
  // Save language preference
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // Recalculate and update dynamic content (results, breakdown, battery comparison)
  refreshDeviceLists(); // Call refreshDeviceLists to update Edit/Delete buttons in the list
  applyFilters();
  updateCalculations();

  if (existingDevicesHeading) {
    existingDevicesHeading.textContent = texts[lang].existingDevicesHeading;
  }
  if (darkModeToggle) {
    darkModeToggle.setAttribute("title", texts[lang].darkModeLabel);
    darkModeToggle.setAttribute("aria-label", texts[lang].darkModeLabel);
    darkModeToggle.setAttribute(
      "data-help",
      texts[lang].darkModeHelp || texts[lang].darkModeLabel
    );
  }
  if (pinkModeToggle) {
    pinkModeToggle.setAttribute("title", texts[lang].pinkModeLabel);
    pinkModeToggle.setAttribute("aria-label", texts[lang].pinkModeLabel);
    pinkModeToggle.setAttribute(
      "data-help",
      texts[lang].pinkModeHelp || texts[lang].pinkModeLabel
    );
  }
  if (settingsButton) {
    settingsButton.setAttribute("title", texts[lang].settingsButton);
    settingsButton.setAttribute("aria-label", texts[lang].settingsButton);
    settingsButton.setAttribute(
      "data-help",
      texts[lang].settingsButtonHelp || texts[lang].settingsButton
    );
  }
  const settingsTitleElem = document.getElementById("settingsTitle");
  if (settingsTitleElem) {
    settingsTitleElem.textContent = texts[lang].settingsHeading;
    settingsTitleElem.setAttribute(
      "data-help",
      texts[lang].settingsHeadingHelp || texts[lang].settingsHeading
    );
  }
  const settingsLanguageLabel = document.getElementById("settingsLanguageLabel");
  if (settingsLanguageLabel) {
    settingsLanguageLabel.textContent = texts[lang].languageSetting;
    const languageHelp =
      texts[lang].settingsLanguageHelp || texts[lang].languageSetting;
    settingsLanguageLabel.setAttribute("data-help", languageHelp);
    if (settingsLanguage) {
      settingsLanguage.setAttribute("data-help", languageHelp);
      settingsLanguage.setAttribute("aria-label", texts[lang].languageSetting);
    }
  }
  const settingsDarkLabel = document.getElementById("settingsDarkModeLabel");
  if (settingsDarkLabel) {
    settingsDarkLabel.textContent = texts[lang].darkModeSetting;
    const darkModeHelp =
      texts[lang].settingsDarkModeHelp || texts[lang].darkModeSetting;
    settingsDarkLabel.setAttribute("data-help", darkModeHelp);
    if (settingsDarkMode) {
      settingsDarkMode.setAttribute("data-help", darkModeHelp);
      settingsDarkMode.setAttribute("aria-label", texts[lang].darkModeSetting);
    }
  }
  const settingsPinkLabel = document.getElementById("settingsPinkModeLabel");
  if (settingsPinkLabel) {
    settingsPinkLabel.textContent = texts[lang].pinkModeSetting;
    const pinkModeHelp =
      texts[lang].settingsPinkModeHelp || texts[lang].pinkModeSetting;
    settingsPinkLabel.setAttribute("data-help", pinkModeHelp);
    if (settingsPinkMode) {
      settingsPinkMode.setAttribute("data-help", pinkModeHelp);
      settingsPinkMode.setAttribute("aria-label", texts[lang].pinkModeSetting);
    }
  }
  const accentLabel = document.getElementById("accentColorLabel");
  if (accentLabel) {
    accentLabel.textContent = texts[lang].accentColorSetting;
    const accentHelp =
      texts[lang].accentColorHelp || texts[lang].accentColorSetting;
    accentLabel.setAttribute("data-help", accentHelp);
    if (accentColorInput) {
      accentColorInput.setAttribute("data-help", accentHelp);
      accentColorInput.setAttribute("aria-label", texts[lang].accentColorSetting);
    }
  }
  const fontSizeLabel = document.getElementById("settingsFontSizeLabel");
  if (fontSizeLabel) {
    fontSizeLabel.textContent = texts[lang].fontSizeSetting;
    const sizeHelp =
      texts[lang].fontSizeSettingHelp || texts[lang].fontSizeSetting;
    fontSizeLabel.setAttribute("data-help", sizeHelp);
    if (settingsFontSize) {
      settingsFontSize.setAttribute("data-help", sizeHelp);
      settingsFontSize.setAttribute("aria-label", texts[lang].fontSizeSetting);
    }
  }
  const fontFamilyLabel = document.getElementById("settingsFontFamilyLabel");
  if (fontFamilyLabel) {
    fontFamilyLabel.textContent = texts[lang].fontFamilySetting;
    const familyHelp =
      texts[lang].fontFamilySettingHelp || texts[lang].fontFamilySetting;
    fontFamilyLabel.setAttribute("data-help", familyHelp);
    if (settingsFontFamily) {
      settingsFontFamily.setAttribute("data-help", familyHelp);
      settingsFontFamily.setAttribute("aria-label", texts[lang].fontFamilySetting);
    }
  }
  if (localFontsButton) {
    const localFontsHelp =
      texts[lang].localFontsButtonHelp || localFontsButton.textContent;
    localFontsButton.setAttribute("data-help", localFontsHelp);
    localFontsButton.setAttribute("title", localFontsHelp);
    localFontsButton.setAttribute("aria-label", localFontsHelp);
  }
  if (bundledFontGroup) {
    const builtInLabel =
      (texts[lang] && texts[lang].bundledFontsGroup) ||
      (texts.en && texts.en.bundledFontsGroup) ||
      bundledFontGroup.label;
    if (builtInLabel) bundledFontGroup.label = builtInLabel;
  }
  if (localFontsGroup) {
    const localLabel =
      (texts[lang] && texts[lang].localFontsGroup) ||
      (texts.en && texts.en.localFontsGroup) ||
      localFontsGroup.label;
    if (localLabel) localFontsGroup.label = localLabel;
  }
  if (localFontsButton) {
    const localFontsLabel =
      (texts[lang] && texts[lang].localFontsButton) ||
      (texts.en && texts.en.localFontsButton) ||
      localFontsButton.textContent;
    if (localFontsLabel) {
      localFontsButton.textContent = localFontsLabel;
      localFontsButton.setAttribute('aria-label', localFontsLabel);
      localFontsButton.setAttribute('title', localFontsLabel);
    }
  }
  if (localFontsStatus && localFontsStatus.dataset.statusKey) {
    const statusKey = localFontsStatus.dataset.statusKey;
    const arg = localFontsStatus.dataset.statusArg;
    let template =
      (texts[lang] && texts[lang][statusKey]) ||
      (texts.en && texts.en[statusKey]) ||
      '';
    if (template && arg !== undefined && arg !== null) {
      template = template.replace('%s', arg);
    } else if (!template && arg !== undefined && arg !== null) {
      template = arg;
    }
    localFontsStatus.textContent = template;
  }
  const settingsLogoLabel = document.getElementById("settingsLogoLabel");
  if (settingsLogoLabel) {
    settingsLogoLabel.textContent = texts[lang].logoSetting;
    const logoHelp = texts[lang].logoSettingHelp || texts[lang].logoSetting;
    settingsLogoLabel.setAttribute("data-help", logoHelp);
    if (settingsLogo) {
      settingsLogo.setAttribute("data-help", logoHelp);
      settingsLogo.setAttribute("aria-label", texts[lang].logoSetting);
    }
  }
  if (autoGearHeadingElem) {
    autoGearHeadingElem.textContent = texts[lang].autoGearHeading || texts.en?.autoGearHeading || 'Automatic Gear Rules';
    const headingHelp = texts[lang].autoGearHeadingHelp || texts.en?.autoGearHeadingHelp;
    if (headingHelp) autoGearHeadingElem.setAttribute('data-help', headingHelp);
  }
  if (autoGearDescriptionElem) {
    autoGearDescriptionElem.textContent = texts[lang].autoGearDescription || texts.en?.autoGearDescription || '';
  }
  if (autoGearPresetDescription) {
    autoGearPresetDescription.textContent = texts[lang].autoGearPresetDescription
      || texts.en?.autoGearPresetDescription
      || '';
  }
  if (autoGearPresetLabel) {
    const label = texts[lang].autoGearPresetLabel
      || texts.en?.autoGearPresetLabel
      || autoGearPresetLabel.textContent;
    const help = texts[lang].autoGearPresetDescription
      || texts.en?.autoGearPresetDescription
      || label;
    autoGearPresetLabel.textContent = label;
    autoGearPresetLabel.setAttribute('data-help', help);
    if (autoGearPresetSelect) {
      autoGearPresetSelect.setAttribute('aria-label', label);
      autoGearPresetSelect.setAttribute('data-help', help);
    }
  }
  if (autoGearSavePresetButton) {
    const label = texts[lang].autoGearSavePresetButton
      || texts.en?.autoGearSavePresetButton
      || autoGearSavePresetButton.textContent;
    autoGearSavePresetButton.textContent = label;
    autoGearSavePresetButton.setAttribute('data-help', label);
    autoGearSavePresetButton.setAttribute('aria-label', label);
  }
  if (autoGearDeletePresetButton) {
    const label = texts[lang].autoGearDeletePresetButton
      || texts.en?.autoGearDeletePresetButton
      || autoGearDeletePresetButton.textContent;
    autoGearDeletePresetButton.textContent = label;
    autoGearDeletePresetButton.setAttribute('data-help', label);
    autoGearDeletePresetButton.setAttribute('aria-label', label);
  }
  if (autoGearAddRuleBtn) {
    const label = texts[lang].autoGearAddRule || texts.en?.autoGearAddRule || autoGearAddRuleBtn.textContent;
    autoGearAddRuleBtn.textContent = label;
    const help = texts[lang].autoGearHeadingHelp || texts.en?.autoGearHeadingHelp || label;
    autoGearAddRuleBtn.setAttribute('data-help', help);
  }
  if (autoGearResetFactoryButton) {
    const label = texts[lang].autoGearResetFactoryButton
      || texts.en?.autoGearResetFactoryButton
      || autoGearResetFactoryButton.textContent;
    const help = texts[lang].autoGearResetFactoryHelp
      || texts.en?.autoGearResetFactoryHelp
      || label;
    autoGearResetFactoryButton.textContent = label;
    autoGearResetFactoryButton.setAttribute('data-help', help);
    autoGearResetFactoryButton.setAttribute('title', help);
    autoGearResetFactoryButton.setAttribute('aria-label', label);
  }
  if (autoGearExportButton) {
    const label = texts[lang].autoGearExportButton
      || texts.en?.autoGearExportButton
      || autoGearExportButton.textContent;
    const help = texts[lang].autoGearExportHelp
      || texts.en?.autoGearExportHelp
      || label;
    autoGearExportButton.textContent = label;
    autoGearExportButton.setAttribute('data-help', help);
    autoGearExportButton.setAttribute('title', help);
    autoGearExportButton.setAttribute('aria-label', label);
  }
  if (autoGearImportButton) {
    const label = texts[lang].autoGearImportButton
      || texts.en?.autoGearImportButton
      || autoGearImportButton.textContent;
    const help = texts[lang].autoGearImportHelp
      || texts.en?.autoGearImportHelp
      || label;
    autoGearImportButton.textContent = label;
    autoGearImportButton.setAttribute('data-help', help);
    autoGearImportButton.setAttribute('title', help);
    autoGearImportButton.setAttribute('aria-label', label);
  }
  if (autoGearBackupsHeading) {
    autoGearBackupsHeading.textContent = texts[lang].autoGearBackupsHeading
      || texts.en?.autoGearBackupsHeading
      || autoGearBackupsHeading.textContent;
  }
  if (autoGearBackupsDescription) {
    const description = texts[lang].autoGearBackupsDescription
      || texts.en?.autoGearBackupsDescription
      || '';
    autoGearBackupsDescription.textContent = description;
    if (description) {
      autoGearBackupsDescription.setAttribute('data-help', description);
    }
  }
  if (autoGearShowBackupsLabel) {
    const label = texts[lang].autoGearShowBackupsLabel
      || texts.en?.autoGearShowBackupsLabel
      || autoGearShowBackupsLabel.textContent;
    const help = texts[lang].autoGearShowBackupsHelp
      || texts.en?.autoGearShowBackupsHelp
      || label;
    autoGearShowBackupsLabel.textContent = label;
    autoGearShowBackupsLabel.setAttribute('data-help', help);
    if (autoGearShowBackupsCheckbox) {
      autoGearShowBackupsCheckbox.setAttribute('aria-label', label);
      autoGearShowBackupsCheckbox.setAttribute('data-help', help);
    }
  }
  if (autoGearBackupsHiddenNotice) {
    const hiddenText = texts[lang].autoGearBackupsHidden
      || texts.en?.autoGearBackupsHidden
      || autoGearBackupsHiddenNotice.textContent;
    autoGearBackupsHiddenNotice.textContent = hiddenText;
  }
  if (autoGearBackupSelectLabel) {
    const label = texts[lang].autoGearBackupSelectLabel
      || texts.en?.autoGearBackupSelectLabel
      || autoGearBackupSelectLabel.textContent;
    autoGearBackupSelectLabel.textContent = label;
    if (autoGearBackupSelect) {
      autoGearBackupSelect.setAttribute('aria-label', label);
      autoGearBackupSelect.setAttribute('title', label);
    }
  }
  if (autoGearBackupRestoreButton) {
    const label = texts[lang].autoGearBackupRestore
      || texts.en?.autoGearBackupRestore
      || autoGearBackupRestoreButton.textContent;
    autoGearBackupRestoreButton.textContent = label;
    autoGearBackupRestoreButton.setAttribute('aria-label', label);
    autoGearBackupRestoreButton.setAttribute('title', label);
  }
  if (autoGearBackupEmptyMessage) {
    const emptyText = texts[lang].autoGearBackupEmpty
      || texts.en?.autoGearBackupEmpty
      || autoGearBackupEmptyMessage.textContent;
    autoGearBackupEmptyMessage.textContent = emptyText;
  }
  if (autoGearBackupSelect) {
    renderAutoGearBackupControls();
  }
  if (autoGearRuleNameLabel) {
    const label = texts[lang].autoGearRuleNameLabel || texts.en?.autoGearRuleNameLabel || autoGearRuleNameLabel.textContent;
    autoGearRuleNameLabel.textContent = label;
    const help = texts[lang].autoGearRuleNameHelp || texts.en?.autoGearRuleNameHelp || label;
    autoGearRuleNameLabel.setAttribute('data-help', help);
    if (autoGearRuleNameInput) {
      autoGearRuleNameInput.setAttribute('data-help', help);
      autoGearRuleNameInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearScenariosLabel) {
    const label = texts[lang].autoGearScenariosLabel || texts.en?.autoGearScenariosLabel || autoGearScenariosLabel.textContent;
    autoGearScenariosLabel.textContent = label;
    const help = texts[lang].autoGearScenariosHelp || texts.en?.autoGearScenariosHelp || label;
    autoGearScenariosLabel.setAttribute('data-help', help);
    if (autoGearScenariosSelect) {
      autoGearScenariosSelect.setAttribute('data-help', help);
      autoGearScenariosSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearMatteboxLabel) {
    const label = texts[lang].autoGearMatteboxLabel || texts.en?.autoGearMatteboxLabel || autoGearMatteboxLabel.textContent;
    autoGearMatteboxLabel.textContent = label;
    const help = texts[lang].autoGearMatteboxHelp || texts.en?.autoGearMatteboxHelp || label;
    autoGearMatteboxLabel.setAttribute('data-help', help);
    if (autoGearMatteboxSelect) {
      autoGearMatteboxSelect.setAttribute('data-help', help);
      autoGearMatteboxSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearCameraHandleLabel) {
    const label = texts[lang].autoGearCameraHandleLabel || texts.en?.autoGearCameraHandleLabel || autoGearCameraHandleLabel.textContent;
    autoGearCameraHandleLabel.textContent = label;
    const help = texts[lang].autoGearCameraHandleHelp || texts.en?.autoGearCameraHandleHelp || label;
    autoGearCameraHandleLabel.setAttribute('data-help', help);
    if (autoGearCameraHandleSelect) {
      autoGearCameraHandleSelect.setAttribute('data-help', help);
      autoGearCameraHandleSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearViewfinderExtensionLabel) {
    const label = texts[lang].autoGearViewfinderExtensionLabel || texts.en?.autoGearViewfinderExtensionLabel || autoGearViewfinderExtensionLabel.textContent;
    autoGearViewfinderExtensionLabel.textContent = label;
    const help = texts[lang].autoGearViewfinderExtensionHelp || texts.en?.autoGearViewfinderExtensionHelp || label;
    autoGearViewfinderExtensionLabel.setAttribute('data-help', help);
    if (autoGearViewfinderExtensionSelect) {
      autoGearViewfinderExtensionSelect.setAttribute('data-help', help);
      autoGearViewfinderExtensionSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearVideoDistributionLabel) {
    const label = texts[lang].autoGearVideoDistributionLabel || texts.en?.autoGearVideoDistributionLabel || autoGearVideoDistributionLabel.textContent;
    autoGearVideoDistributionLabel.textContent = label;
    const help = texts[lang].autoGearVideoDistributionHelp || texts.en?.autoGearVideoDistributionHelp || label;
    autoGearVideoDistributionLabel.setAttribute('data-help', help);
    if (autoGearVideoDistributionSelect) {
      autoGearVideoDistributionSelect.setAttribute('data-help', help);
      autoGearVideoDistributionSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddItemsHeading) {
    autoGearAddItemsHeading.textContent = texts[lang].autoGearAddItemsHeading || texts.en?.autoGearAddItemsHeading || autoGearAddItemsHeading.textContent;
  }
  if (autoGearAddItemLabel) {
    const label = texts[lang].autoGearAddItemLabel || texts.en?.autoGearAddItemLabel || autoGearAddItemLabel.textContent;
    const hint = texts[lang].autoGearAddMultipleHint || texts.en?.autoGearAddMultipleHint || '';
    const helpText = hint ? `${label} – ${hint}` : label;
    autoGearAddItemLabel.textContent = label;
    autoGearAddItemLabel.setAttribute('data-help', helpText);
    if (autoGearAddNameInput) {
      autoGearAddNameInput.setAttribute('aria-label', label);
      autoGearAddNameInput.setAttribute('data-help', helpText);
      if (hint) {
        autoGearAddNameInput.setAttribute('placeholder', hint);
      } else {
        autoGearAddNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearAddCategoryLabel) {
    const label = texts[lang].autoGearAddCategoryLabel || texts.en?.autoGearAddCategoryLabel || autoGearAddCategoryLabel.textContent;
    autoGearAddCategoryLabel.textContent = label;
    if (autoGearAddCategorySelect) {
      autoGearAddCategorySelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddQuantityLabel) {
    const label = texts[lang].autoGearAddQuantityLabel || texts.en?.autoGearAddQuantityLabel || autoGearAddQuantityLabel.textContent;
    autoGearAddQuantityLabel.textContent = label;
    if (autoGearAddQuantityInput) {
      autoGearAddQuantityInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddScreenSizeLabel) {
    const label = texts[lang].autoGearAddScreenSizeLabel || texts.en?.autoGearAddScreenSizeLabel || autoGearAddScreenSizeLabel.textContent;
    autoGearAddScreenSizeLabel.textContent = label;
    if (autoGearAddScreenSizeInput) {
      autoGearAddScreenSizeInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddSelectorTypeLabel) {
    const label = texts[lang].autoGearAddSelectorTypeLabel || texts.en?.autoGearAddSelectorTypeLabel || autoGearAddSelectorTypeLabel.textContent;
    autoGearAddSelectorTypeLabel.textContent = label;
    if (autoGearAddSelectorTypeSelect) {
      autoGearAddSelectorTypeSelect.setAttribute('aria-label', label);
      const noneLabel = texts[lang].autoGearSelectorNoneOption || texts.en?.autoGearSelectorNoneOption || 'No selector';
      const monitorLabel = texts[lang].autoGearSelectorMonitorOption || texts.en?.autoGearSelectorMonitorOption || 'Monitor selector';
      const directorLabel = texts[lang].autoGearSelectorDirectorOption || texts.en?.autoGearSelectorDirectorOption || 'Director monitor selector';
      Array.from(autoGearAddSelectorTypeSelect.options || []).forEach(opt => {
        if (opt.value === 'none') opt.textContent = noneLabel;
        if (opt.value === 'monitor') opt.textContent = monitorLabel;
        if (opt.value === 'directorMonitor') opt.textContent = directorLabel;
      });
    }
  }
  if (autoGearAddSelectorDefaultLabel) {
    const label = texts[lang].autoGearAddSelectorDefaultLabel || texts.en?.autoGearAddSelectorDefaultLabel || autoGearAddSelectorDefaultLabel.textContent;
    autoGearAddSelectorDefaultLabel.textContent = label;
    if (autoGearAddSelectorDefaultInput) {
      autoGearAddSelectorDefaultInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddSelectorIncludeLabel) {
    const label = texts[lang].autoGearAddSelectorIncludeLabel || texts.en?.autoGearAddSelectorIncludeLabel || autoGearAddSelectorIncludeLabel.textContent;
    autoGearAddSelectorIncludeLabel.textContent = label;
    if (autoGearAddSelectorIncludeCheckbox) {
      autoGearAddSelectorIncludeCheckbox.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddNotesLabel) {
    const label = texts[lang].autoGearAddNotesLabel || texts.en?.autoGearAddNotesLabel || autoGearAddNotesLabel.textContent;
    autoGearAddNotesLabel.textContent = label;
    if (autoGearAddNotesInput) {
      autoGearAddNotesInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddItemButton) {
    const label = texts[lang].autoGearAddItemButton || texts.en?.autoGearAddItemButton || autoGearAddItemButton.textContent;
    autoGearAddItemButton.textContent = label;
    autoGearAddItemButton.setAttribute('data-help', label);
  }
  if (autoGearRemoveItemsHeading) {
    autoGearRemoveItemsHeading.textContent = texts[lang].autoGearRemoveItemsHeading || texts.en?.autoGearRemoveItemsHeading || autoGearRemoveItemsHeading.textContent;
  }
  if (autoGearRemoveItemLabel) {
    const label = texts[lang].autoGearRemoveItemLabel || texts.en?.autoGearRemoveItemLabel || autoGearRemoveItemLabel.textContent;
    const hint = texts[lang].autoGearRemoveMultipleHint || texts.en?.autoGearRemoveMultipleHint || '';
    const helpText = hint ? `${label} – ${hint}` : label;
    autoGearRemoveItemLabel.textContent = label;
    autoGearRemoveItemLabel.setAttribute('data-help', helpText);
    if (autoGearRemoveNameInput) {
      autoGearRemoveNameInput.setAttribute('aria-label', label);
      autoGearRemoveNameInput.setAttribute('data-help', helpText);
      if (hint) {
        autoGearRemoveNameInput.setAttribute('placeholder', hint);
      } else {
        autoGearRemoveNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearRemoveCategoryLabel) {
    const label = texts[lang].autoGearRemoveCategoryLabel || texts.en?.autoGearRemoveCategoryLabel || autoGearRemoveCategoryLabel.textContent;
    autoGearRemoveCategoryLabel.textContent = label;
    if (autoGearRemoveCategorySelect) {
      autoGearRemoveCategorySelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveQuantityLabel) {
    const label = texts[lang].autoGearRemoveQuantityLabel || texts.en?.autoGearRemoveQuantityLabel || autoGearRemoveQuantityLabel.textContent;
    autoGearRemoveQuantityLabel.textContent = label;
    if (autoGearRemoveQuantityInput) {
      autoGearRemoveQuantityInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveScreenSizeLabel) {
    const label = texts[lang].autoGearRemoveScreenSizeLabel || texts.en?.autoGearRemoveScreenSizeLabel || autoGearRemoveScreenSizeLabel.textContent;
    autoGearRemoveScreenSizeLabel.textContent = label;
    if (autoGearRemoveScreenSizeInput) {
      autoGearRemoveScreenSizeInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveSelectorTypeLabel) {
    const label = texts[lang].autoGearRemoveSelectorTypeLabel || texts.en?.autoGearRemoveSelectorTypeLabel || autoGearRemoveSelectorTypeLabel.textContent;
    autoGearRemoveSelectorTypeLabel.textContent = label;
    if (autoGearRemoveSelectorTypeSelect) {
      autoGearRemoveSelectorTypeSelect.setAttribute('aria-label', label);
      const noneLabel = texts[lang].autoGearSelectorNoneOption || texts.en?.autoGearSelectorNoneOption || 'No selector';
      const monitorLabel = texts[lang].autoGearSelectorMonitorOption || texts.en?.autoGearSelectorMonitorOption || 'Monitor selector';
      const directorLabel = texts[lang].autoGearSelectorDirectorOption || texts.en?.autoGearSelectorDirectorOption || 'Director monitor selector';
      Array.from(autoGearRemoveSelectorTypeSelect.options || []).forEach(opt => {
        if (opt.value === 'none') opt.textContent = noneLabel;
        if (opt.value === 'monitor') opt.textContent = monitorLabel;
        if (opt.value === 'directorMonitor') opt.textContent = directorLabel;
      });
    }
  }
  if (autoGearRemoveSelectorDefaultLabel) {
    const label = texts[lang].autoGearRemoveSelectorDefaultLabel || texts.en?.autoGearRemoveSelectorDefaultLabel || autoGearRemoveSelectorDefaultLabel.textContent;
    autoGearRemoveSelectorDefaultLabel.textContent = label;
    if (autoGearRemoveSelectorDefaultInput) {
      autoGearRemoveSelectorDefaultInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveSelectorIncludeLabel) {
    const label = texts[lang].autoGearRemoveSelectorIncludeLabel || texts.en?.autoGearRemoveSelectorIncludeLabel || autoGearRemoveSelectorIncludeLabel.textContent;
    autoGearRemoveSelectorIncludeLabel.textContent = label;
    if (autoGearRemoveSelectorIncludeCheckbox) {
      autoGearRemoveSelectorIncludeCheckbox.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveNotesLabel) {
    const label = texts[lang].autoGearRemoveNotesLabel || texts.en?.autoGearRemoveNotesLabel || autoGearRemoveNotesLabel.textContent;
    autoGearRemoveNotesLabel.textContent = label;
    if (autoGearRemoveNotesInput) {
      autoGearRemoveNotesInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveItemButton) {
    const label = texts[lang].autoGearRemoveItemButton || texts.en?.autoGearRemoveItemButton || autoGearRemoveItemButton.textContent;
    autoGearRemoveItemButton.textContent = label;
    autoGearRemoveItemButton.setAttribute('data-help', label);
  }
  if (autoGearSaveRuleButton) {
    const label = texts[lang].autoGearSaveRule || texts.en?.autoGearSaveRule || autoGearSaveRuleButton.textContent;
    setButtonLabelWithIcon(autoGearSaveRuleButton, label);
    autoGearSaveRuleButton.setAttribute('data-help', label);
  }
  if (autoGearCancelEditButton) {
    const label = texts[lang].autoGearCancelEdit || texts.en?.autoGearCancelEdit || autoGearCancelEditButton.textContent;
    setButtonLabelWithIcon(autoGearCancelEditButton, label, ICON_GLYPHS.circleX);
    autoGearCancelEditButton.setAttribute('data-help', label);
  }
  if (autoGearAddCategorySelect) {
    populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearAddCategorySelect.value);
  }
  if (autoGearRemoveCategorySelect) {
    populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearRemoveCategorySelect.value);
  }
  syncAutoGearMonitorFieldVisibility();
  if (autoGearScenariosSelect) {
    refreshAutoGearScenarioOptions(autoGearEditorDraft?.scenarios);
  }
  if (autoGearMatteboxSelect) {
    refreshAutoGearMatteboxOptions(autoGearEditorDraft?.mattebox);
  }
  if (autoGearCameraHandleSelect) {
    refreshAutoGearCameraHandleOptions(autoGearEditorDraft?.cameraHandle);
  }
  if (autoGearViewfinderExtensionSelect) {
    refreshAutoGearViewfinderExtensionOptions(autoGearEditorDraft?.viewfinderExtension);
  }
  if (autoGearVideoDistributionSelect) {
    refreshAutoGearVideoDistributionOptions(autoGearEditorDraft?.videoDistribution);
  }
  seedAutoGearRulesFromCurrentProject();
  renderAutoGearRulesList();
  renderAutoGearDraftLists();
  updateAutoGearCatalogOptions();
  renderAutoGearPresetsControls();
  applyAutoGearBackupVisibility();
  const contrastLabel = document.getElementById("settingsHighContrastLabel");
  if (contrastLabel) {
    contrastLabel.textContent = texts[lang].highContrastSetting;
    const contrastHelp =
      texts[lang].highContrastSettingHelp || texts[lang].highContrastSetting;
    contrastLabel.setAttribute("data-help", contrastHelp);
    if (settingsHighContrast) {
      settingsHighContrast.setAttribute("data-help", contrastHelp);
      settingsHighContrast.setAttribute(
        "aria-label",
        texts[lang].highContrastSetting
      );
    }
  }
  const accessibilityHeading = document.getElementById("accessibilityHeading");
  if (accessibilityHeading) {
    accessibilityHeading.textContent = texts[lang].accessibilityHeading;
    accessibilityHeading.setAttribute(
      "data-help",
      texts[lang].accessibilityHeadingHelp || texts[lang].accessibilityHeading
    );
  }
  const backupHeading = document.getElementById("backupHeading");
  if (backupHeading) {
    backupHeading.textContent = texts[lang].backupHeading;
    backupHeading.setAttribute(
      "data-help",
      texts[lang].backupHeadingHelp || texts[lang].backupHeading
    );
  }
  if (dataHeading) {
    dataHeading.textContent = texts[lang].dataHeading;
    const dataHelp = texts[lang].dataHeadingHelp || texts[lang].dataHeading;
    dataHeading.setAttribute("data-help", dataHelp);
  }
  if (storageSummaryIntro) {
    storageSummaryIntro.textContent = texts[lang].storageSummaryIntro;
  }
  if (storageSummaryFootnote) {
    storageSummaryFootnote.textContent = texts[lang].storageSummaryFootnote;
  }
  if (storageSummaryEmpty) {
    storageSummaryEmpty.textContent = texts[lang].storageSummaryEmpty;
  }
  const showAutoBackupsLabel = document.getElementById("settingsShowAutoBackupsLabel");
  if (showAutoBackupsLabel) {
    showAutoBackupsLabel.textContent = texts[lang].showAutoBackupsSetting;
    const autoBackupsHelp =
      texts[lang].showAutoBackupsHelp || texts[lang].showAutoBackupsSetting;
    showAutoBackupsLabel.setAttribute("data-help", autoBackupsHelp);
    if (settingsShowAutoBackups) {
      settingsShowAutoBackups.setAttribute("data-help", autoBackupsHelp);
      settingsShowAutoBackups.setAttribute(
        "aria-label",
        texts[lang].showAutoBackupsSetting
      );
    }
  }
  if (backupSettings) {
    backupSettings.textContent = texts[lang].backupSettings;
    const backupHelp =
      texts[lang].backupSettingsHelp || texts[lang].backupSettings;
    backupSettings.setAttribute("data-help", backupHelp);
    backupSettings.setAttribute("title", backupHelp);
    backupSettings.setAttribute("aria-label", backupHelp);
  }
  if (restoreSettings) {
    restoreSettings.textContent = texts[lang].restoreSettings;
    const restoreHelp =
      texts[lang].restoreSettingsHelp || texts[lang].restoreSettings;
    restoreSettings.setAttribute("data-help", restoreHelp);
    restoreSettings.setAttribute("title", restoreHelp);
    restoreSettings.setAttribute("aria-label", restoreHelp);
  }
  if (factoryResetButton) {
    const resetLabel = texts[lang].factoryResetButton || "Factory reset";
    const resetHelp =
      texts[lang].factoryResetButtonHelp || resetLabel;
    factoryResetButton.textContent = resetLabel;
    factoryResetButton.setAttribute("data-help", resetHelp);
    factoryResetButton.setAttribute("title", resetHelp);
    factoryResetButton.setAttribute("aria-label", resetHelp);
  }
  const aboutHeading = document.getElementById("aboutHeading");
  if (aboutHeading) {
    aboutHeading.textContent = texts[lang].aboutHeading;
    aboutHeading.setAttribute(
      "data-help",
      texts[lang].aboutHeadingHelp || texts[lang].aboutHeading
    );
  }
  if (aboutVersionElem)
    aboutVersionElem.textContent = `${texts[lang].versionLabel} ${APP_VERSION}`;
  if (supportLink) {
    supportLink.textContent = texts[lang].supportLink;
    const supportHelp =
      texts[lang].supportLinkHelp || texts[lang].supportLink;
    supportLink.setAttribute("data-help", supportHelp);
    supportLink.setAttribute("title", supportHelp);
  }
  if (settingsSave) {
    const label = texts[lang].saveSettings || texts.en?.saveSettings || settingsSave.textContent;
    setButtonLabelWithIcon(settingsSave, label);
    const saveHelp = texts[lang].saveSettingsHelp || texts[lang].saveSettings || label;
    settingsSave.setAttribute("data-help", saveHelp);
    settingsSave.setAttribute("title", saveHelp);
    settingsSave.setAttribute("aria-label", saveHelp);
  }
  if (settingsCancel) {
    const cancelLabel =
      texts[lang].cancelSettings || texts.en?.cancelSettings || settingsCancel.textContent;
    setButtonLabelWithIcon(settingsCancel, cancelLabel, ICON_GLYPHS.circleX);
    const cancelHelp =
      texts[lang].cancelSettingsHelp || texts[lang].cancelSettings || cancelLabel;
    settingsCancel.setAttribute("data-help", cancelHelp);
    settingsCancel.setAttribute("title", cancelHelp);
    settingsCancel.setAttribute("aria-label", cancelHelp);
  }
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    const menuLabel =
      texts[lang].menuToggleLabel ||
      texts.en?.menuToggleLabel ||
      menuToggle.getAttribute("aria-label") ||
      "Menu";
    menuToggle.setAttribute("title", menuLabel);
    menuToggle.setAttribute("aria-label", menuLabel);
    const menuHelp = texts[lang].menuToggleHelp || menuLabel;
    menuToggle.setAttribute("data-help", menuHelp);
  }
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu) {
    const sideMenuHelp = texts[lang].sideMenuHelp;
    if (sideMenuHelp) {
      sideMenu.setAttribute("data-help", sideMenuHelp);
    } else {
      sideMenu.removeAttribute("data-help");
    }
  }
  if (reloadButton) {
    reloadButton.setAttribute("title", texts[lang].reloadAppLabel);
    reloadButton.setAttribute("aria-label", texts[lang].reloadAppLabel);
    reloadButton.setAttribute(
      "data-help",
      texts[lang].reloadAppHelp || texts[lang].reloadAppLabel
    );
  }
  if (featureSearch) {
    featureSearch.setAttribute("placeholder", texts[lang].featureSearchPlaceholder);
    featureSearch.setAttribute("aria-label", texts[lang].featureSearchLabel);
    featureSearch.setAttribute(
      "data-help",
      texts[lang].featureSearchHelp || texts[lang].featureSearchLabel
    );
  }
  if (helpButton) {
    helpButton.setAttribute("title", texts[lang].helpButtonTitle || texts[lang].helpButtonLabel);
    helpButton.setAttribute("aria-label", texts[lang].helpButtonLabel);
    helpButton.setAttribute(
      "data-help",
      texts[lang].helpButtonHelp ||
        texts[lang].helpButtonTitle ||
        texts[lang].helpButtonLabel
    );
    if (hoverHelpButton) {
      hoverHelpButton.textContent = texts[lang].hoverHelpButtonLabel;
      hoverHelpButton.setAttribute("aria-label", texts[lang].hoverHelpButtonLabel);
      hoverHelpButton.setAttribute(
        "data-help",
        texts[lang].hoverHelpButtonHelp || texts[lang].hoverHelpButtonLabel
      );
    }
    if (helpSearch) {
      helpSearch.setAttribute("placeholder", texts[lang].helpSearchPlaceholder);
      helpSearch.setAttribute("aria-label", texts[lang].helpSearchLabel);
      helpSearch.setAttribute(
        "data-help",
        texts[lang].helpSearchHelp || texts[lang].helpSearchLabel
      );
    }
    if (helpSearchClear) {
      helpSearchClear.setAttribute("title", texts[lang].helpSearchClear);
      helpSearchClear.setAttribute("aria-label", texts[lang].helpSearchClear);
      helpSearchClear.setAttribute(
        "data-help",
        texts[lang].helpSearchClearHelp || texts[lang].helpSearchClear
      );
    }
    if (closeHelpBtn) {
      closeHelpBtn.textContent = texts[lang].helpClose;
      closeHelpBtn.setAttribute("title", texts[lang].helpClose);
      closeHelpBtn.setAttribute("aria-label", texts[lang].helpClose);
      closeHelpBtn.setAttribute(
        "data-help",
        texts[lang].helpCloseHelp || texts[lang].helpClose
      );
    }
    if (document.getElementById("helpTitle")) {
      document.getElementById("helpTitle").textContent = texts[lang].helpTitle;
    }
    if (helpNoResults) helpNoResults.textContent = texts[lang].helpNoResults;
    if (typeof updateHelpQuickLinksForLanguage === 'function') {
      updateHelpQuickLinksForLanguage(lang);
    }
  }

  // NEW SETUP MANAGEMENT BUTTONS TEXTS
  setButtonLabelWithIcon(
    document.getElementById("generateOverviewBtn"),
    texts[lang].generateOverviewBtn,
    ICON_GLYPHS.overview
  );
  setButtonLabelWithIcon(
    document.getElementById("generateGearListBtn"),
    texts[lang].generateGearListBtn,
    ICON_GLYPHS.gearList
  );
  setButtonLabelWithIcon(
    document.getElementById("shareSetupBtn"),
    texts[lang].shareSetupBtn,
    ICON_GLYPHS.fileExport
  );
  const exportRevert = document.getElementById("exportAndRevertBtn");
  if (exportRevert) {
    exportRevert.textContent = texts[lang].exportAndRevertBtn;
    exportRevert.setAttribute('data-help', texts[lang].exportAndRevertBtnHelp);
  }

  if (downloadDiagramBtn) {
    downloadDiagramBtn.textContent = texts[lang].downloadDiagramBtn;
    downloadDiagramBtn.setAttribute("title", texts[lang].downloadDiagramBtn);
    downloadDiagramBtn.setAttribute("aria-label", texts[lang].downloadDiagramBtn);
    downloadDiagramBtn.setAttribute("data-help", texts[lang].downloadDiagramHelp);
  }
  if (gridSnapToggleBtn) {
    setButtonLabelWithIcon(gridSnapToggleBtn, texts[lang].gridSnapToggle, ICON_GLYPHS.magnet);
    gridSnapToggleBtn.setAttribute("title", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("aria-label", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("data-help", texts[lang].gridSnapToggleHelp);
    gridSnapToggleBtn.setAttribute("aria-pressed", gridSnap ? "true" : "false");
  }
  if (resetViewBtn) {
    setButtonLabelWithIcon(resetViewBtn, texts[lang].resetViewBtn, ICON_GLYPHS.resetView);
    resetViewBtn.setAttribute("title", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("aria-label", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("data-help", texts[lang].resetViewHelp);
  }
  if (zoomInBtn) {
    zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
  }
  if (zoomOutBtn) {
    zoomOutBtn.setAttribute("title", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("aria-label", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("data-help", texts[lang].zoomOutHelp);
  }
  if (diagramHint) {
    diagramHint.textContent = texts[lang].diagramMoveHint;
  }
  const fallbackProjectForm = texts.en && texts.en.projectForm ? texts.en.projectForm : {};
  const projectFormTexts = texts[lang].projectForm || fallbackProjectForm;
  if (projectFormTexts) {
    const setLabelText = (element, key) => {
      if (!element) return;
      const value = projectFormTexts[key] || fallbackProjectForm[key];
      if (value) element.textContent = value;
    };
    setLabelText(projectDialogHeading, 'heading');
    setLabelText(projectNameLabel, 'projectName');
    setLabelText(productionCompanyLabel, 'productionCompany');
    setLabelText(rentalHouseLabel, 'rentalHouse');
    setLabelText(crewHeadingElem, 'crewHeading');
    if (crewLabelElem) {
      const crewLabelText = projectFormTexts.crewHeading || fallbackProjectForm.crewHeading;
      if (crewLabelText) {
        crewLabelElem.textContent = `${crewLabelText}:`;
      }
    }
    setLabelText(prepLabelElem, 'prepLabel');
    setLabelText(shootLabelElem, 'shootLabel');
    setLabelText(deliveryResolutionLabel, 'deliveryResolution');
    setLabelText(recordingResolutionLabel, 'recordingResolution');
    setLabelText(sensorModeLabel, 'sensorMode');
    setLabelText(aspectRatioLabel, 'aspectRatio');
    setLabelText(codecLabel, 'codec');
    setLabelText(baseFrameRateLabel, 'baseFrameRate');
    setLabelText(lensesHeadingElem, 'lensesHeading');
    setLabelText(lensesLabelElem, 'lensesLabel');
    setLabelText(riggingHeadingElem, 'riggingHeading');
    setLabelText(requiredScenariosLabel, 'requiredScenarios');
    setLabelText(cameraHandleLabel, 'cameraHandle');
    setLabelText(viewfinderExtensionLabel, 'viewfinderExtension');
    setLabelText(matteboxFilterHeadingElem, 'matteboxFilterHeading');
    setLabelText(matteboxLabel, 'mattebox');
    setLabelText(filterLabel, 'filter');
    setLabelText(monitoringHeadingElem, 'monitoringHeading');
    setLabelText(monitoringConfigurationLabel, 'monitoringConfiguration');
    setLabelText(viewfinderSettingsLabel, 'viewfinderSettings');
    setLabelText(frameGuidesLabel, 'frameGuides');
    setLabelText(aspectMaskOpacityLabel, 'aspectMaskOpacity');
    setLabelText(videoDistributionLabel, 'videoDistribution');
    setLabelText(monitorUserButtonsLabel, 'monitorUserButtons');
    setLabelText(cameraUserButtonsLabel, 'cameraUserButtons');
    setLabelText(viewfinderUserButtonsLabel, 'viewfinderUserButtons');
    setLabelText(tripodPreferencesHeading, 'tripodPreferencesHeading');
    setLabelText(tripodHeadBrandLabel, 'tripodHeadBrand');
    setLabelText(tripodBowlLabel, 'tripodBowl');
    setLabelText(tripodTypesLabel, 'tripodTypes');
    setLabelText(tripodSpreaderLabel, 'tripodSpreader');
    if (viewfinderExtensionSelect && viewfinderExtensionSelect.options.length >= 2) {
      const noneLabel = projectFormTexts.viewfinderExtensionNone || fallbackProjectForm.viewfinderExtensionNone;
      const yesLabel = projectFormTexts.viewfinderExtensionYes || fallbackProjectForm.viewfinderExtensionYes;
      if (noneLabel) viewfinderExtensionSelect.options[0].textContent = noneLabel;
      if (yesLabel) viewfinderExtensionSelect.options[1].textContent = yesLabel;
    }
    const cancelText =
      projectFormTexts.cancel ||
      fallbackProjectForm.cancel ||
      (projectCancelBtn ? projectCancelBtn.textContent : projectDialogCloseBtn?.getAttribute('aria-label')) ||
      'Cancel';
    if (projectCancelBtn) {
      setButtonLabelWithIcon(projectCancelBtn, cancelText, ICON_GLYPHS.circleX);
    }
    if (projectDialogCloseBtn) {
      projectDialogCloseBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'btn-icon');
      projectDialogCloseBtn.setAttribute('aria-label', cancelText);
      projectDialogCloseBtn.setAttribute('title', cancelText);
      projectDialogCloseBtn.setAttribute('data-help', cancelText);
    }
    if (projectSubmitBtn) {
      const submitText = projectFormTexts.submit || fallbackProjectForm.submit;
      if (submitText) projectSubmitBtn.textContent = submitText;
    }
    const crewPlaceholders = {
      name: projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder,
      phone: projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder,
      email: projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder
    };
    const crewRoleLabels = texts[lang].crewRoles || (texts.en && texts.en.crewRoles) || {};
    document.querySelectorAll('#crewContainer .person-row').forEach(row => {
      const roleSelect = row.querySelector('select');
      if (roleSelect) {
        const currentValue = roleSelect.value;
        Array.from(roleSelect.options).forEach(opt => {
          const roleKey = opt.value;
          opt.textContent = crewRoleLabels[roleKey] || roleKey;
        });
        roleSelect.value = currentValue;
      }
      const nameInput = row.querySelector('.person-name');
      if (nameInput && crewPlaceholders.name) nameInput.placeholder = crewPlaceholders.name;
      const phoneInput = row.querySelector('.person-phone');
      if (phoneInput && crewPlaceholders.phone) phoneInput.placeholder = crewPlaceholders.phone;
      const emailInput = row.querySelector('.person-email');
      if (emailInput && crewPlaceholders.email) emailInput.placeholder = crewPlaceholders.email;
    });
  }
  if (iosPwaHelpTitle) iosPwaHelpTitle.textContent = texts[lang].iosPwaHelpTitle;
  if (iosPwaHelpIntro) iosPwaHelpIntro.textContent = texts[lang].iosPwaHelpIntro;
  if (iosPwaHelpStep1) iosPwaHelpStep1.textContent = texts[lang].iosPwaHelpStep1;
  if (iosPwaHelpStep2) iosPwaHelpStep2.textContent = texts[lang].iosPwaHelpStep2;
  if (iosPwaHelpStep3) iosPwaHelpStep3.textContent = texts[lang].iosPwaHelpStep3;
  if (iosPwaHelpStep4) iosPwaHelpStep4.textContent = texts[lang].iosPwaHelpStep4;
  if (iosPwaHelpNote) iosPwaHelpNote.textContent = texts[lang].iosPwaHelpNote;
  if (iosPwaHelpClose) {
    iosPwaHelpClose.textContent = texts[lang].iosPwaHelpClose;
    iosPwaHelpClose.setAttribute('aria-label', texts[lang].iosPwaHelpClose);
  }

  document.querySelectorAll('.favorite-toggle').forEach(btn => {
    btn.setAttribute('aria-label', texts[lang].favoriteToggleLabel);
    btn.setAttribute('title', texts[lang].favoriteToggleLabel);
    btn.setAttribute(
      'data-help',
      texts[lang].favoriteToggleHelp || texts[lang].favoriteToggleLabel
    );
  });
  ensureGearListActions();
  updateDiagramLegend();
  updateStorageSummary();
  populateFeatureSearch();
}

// Reference elements (DOM Elements)
const cameraSelect    = document.getElementById("cameraSelect");
const monitorSelect   = document.getElementById("monitorSelect");
const videoSelect     = document.getElementById("videoSelect");
const videoDistributionSelect = document.getElementById("videoDistribution");
const cageSelect      = document.getElementById("cageSelect");
const motorSelects    = [
  document.getElementById("motor1Select"),
  document.getElementById("motor2Select"),
  document.getElementById("motor3Select"),
  document.getElementById("motor4Select")
];
const controllerSelects = [
  document.getElementById("controller1Select"),
  document.getElementById("controller2Select"),
  document.getElementById("controller3Select"),
  document.getElementById("controller4Select")
];
const distanceSelect = document.getElementById("distanceSelect");
const batterySelect  = document.getElementById("batterySelect");
const hotswapSelect  = document.getElementById("batteryHotswapSelect");
const lensSelect     = document.getElementById("lenses");
const requiredScenariosSelect = document.getElementById("requiredScenarios");
const requiredScenariosSummary = document.getElementById("requiredScenariosSummary");
const remoteHeadOption = requiredScenariosSelect ?
  requiredScenariosSelect.querySelector('option[value="Remote Head"]') : null;
const tripodPreferencesSection = document.getElementById("tripodPreferencesSection");
const tripodPreferencesRow = document.getElementById("tripodPreferencesRow");
const tripodPreferencesHeading = document.getElementById("tripodPreferencesHeading");
const tripodHeadBrandSelect = document.getElementById("tripodHeadBrand");
const tripodBowlSelect = document.getElementById("tripodBowl");
const tripodTypesSelect = document.getElementById("tripodTypes");
const tripodSpreaderSelect = document.getElementById("tripodSpreader");
const monitoringConfigurationSelect = document.getElementById("monitoringConfiguration");
const viewfinderSettingsRow = document.getElementById("viewfinderSettingsRow");
const viewfinderExtensionRow = document.getElementById("viewfinderExtensionRow");
const projectDialogHeading = document.getElementById("projectDialogHeading");
const projectDialogCloseBtn = document.getElementById("projectDialogClose");
const projectNameLabel = document.getElementById("projectNameLabel");
const productionCompanyLabel = document.getElementById("productionCompanyLabel");
const rentalHouseLabel = document.getElementById("rentalHouseLabel");
const crewHeadingElem = document.getElementById("crewHeading");
const crewLabelElem = document.getElementById("crewLabel");
const prepLabelElem = document.getElementById("prepLabel");
const shootLabelElem = document.getElementById("shootLabel");
const deliveryResolutionLabel = document.getElementById("deliveryResolutionLabel");
const recordingResolutionLabel = document.getElementById("recordingResolutionLabel");
const sensorModeLabel = document.getElementById("sensorModeLabel");
const aspectRatioLabel = document.getElementById("aspectRatioLabel");
const codecLabel = document.getElementById("codecLabel");
const baseFrameRateLabel = document.getElementById("baseFrameRateLabel");
const lensesHeadingElem = document.getElementById("lensesHeading");
const lensesLabelElem = document.getElementById("lensesLabel");
const riggingHeadingElem = document.getElementById("riggingHeading");
const requiredScenariosLabel = document.getElementById("requiredScenariosLabel");
const cameraHandleLabel = document.getElementById("cameraHandleLabel");
const viewfinderExtensionLabel = document.getElementById("viewfinderExtensionLabel");
const viewfinderExtensionSelect = document.getElementById("viewfinderExtension");
const matteboxFilterHeadingElem = document.getElementById("matteboxFilterHeading");
const matteboxLabel = document.getElementById("matteboxLabel");
const filterLabel = document.getElementById("filterLabel");
const monitoringHeadingElem = document.getElementById("monitoringHeading");
const monitoringConfigurationLabel = document.getElementById("monitoringConfigurationLabel");
const viewfinderSettingsLabel = document.getElementById("viewfinderSettingsLabel");
const frameGuidesLabel = document.getElementById("frameGuidesLabel");
const aspectMaskOpacityLabel = document.getElementById("aspectMaskOpacityLabel");
const videoDistributionLabel = document.getElementById("videoDistributionLabel");
const monitorUserButtonsLabel = document.getElementById("monitorUserButtonsLabel");
const cameraUserButtonsLabel = document.getElementById("cameraUserButtonsLabel");
const viewfinderUserButtonsLabel = document.getElementById("viewfinderUserButtonsLabel");
const tripodHeadBrandLabel = document.getElementById("tripodHeadBrandLabel");
const tripodBowlLabel = document.getElementById("tripodBowlLabel");
const tripodTypesLabel = document.getElementById("tripodTypesLabel");
const tripodSpreaderLabel = document.getElementById("tripodSpreaderLabel");
const projectSubmitBtn = document.getElementById("projectSubmit");
const crewContainer = document.getElementById("crewContainer");
const addPersonBtn = document.getElementById("addPersonBtn");
const prepContainer = document.getElementById("prepContainer");
const addPrepBtn = document.getElementById("addPrepBtn");
const shootContainer = document.getElementById("shootContainer");
const addShootBtn = document.getElementById("addShootBtn");

let monitoringConfigurationUserChanged = false;

const crewRoles = [
  // Production
  'Producer',
  'Production Manager',
  'Director',
  'Assistant Director',
  'Production Assistant',

  // Camera
  'DoP',
  'Camera Operator',
  'B-Camera Operator',
  'Steadicam Operator',
  'Drone Operator',
  '1st AC',
  '2nd AC',
  'DIT',
  'Video Operator',

  // Lighting
  'Key Gaffer',
  'Gaffer',
  'Best Boy Electric',
  'Electrician',
  'Rigging Gaffer',

  // Grip
  'Key Grip',
  'Best Boy Grip',
  'Grip',
  'Dolly Grip',
  'Rigging Grip'
];

const ICON_FONT_KEYS = Object.freeze({
  ESSENTIAL: 'essential',
  FILM: 'film',
  GADGET: 'gadget',
  UICONS: 'uicons'
});

const VALID_ICON_FONTS = new Set(Object.values(ICON_FONT_KEYS));

function iconGlyph(char, font = ICON_FONT_KEYS.UICONS) {
  const normalizedFont = VALID_ICON_FONTS.has(font) ? font : ICON_FONT_KEYS.UICONS;
  return Object.freeze({ char, font: normalizedFont });
}

function resolveIconGlyph(glyph) {
  if (!glyph) {
    return { char: '', font: ICON_FONT_KEYS.UICONS, className: '', size: undefined };
  }
  if (glyph.markup) {
    const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
    return {
      markup: glyph.markup,
      className: glyph.className || '',
      font: ICON_FONT_KEYS.UICONS,
      size
    };
  }
  if (typeof glyph === 'string') {
    return { char: glyph, font: ICON_FONT_KEYS.UICONS, className: '', size: undefined };
  }
  if (typeof glyph === 'object') {
    const char = typeof glyph.char === 'string' ? glyph.char : '';
    const fontKey = glyph.font && VALID_ICON_FONTS.has(glyph.font)
      ? glyph.font
      : ICON_FONT_KEYS.UICONS;
    const className = typeof glyph.className === 'string' ? glyph.className : '';
    const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
    if (glyph.markup) {
      return {
        markup: glyph.markup,
        className,
        font: fontKey,
        size
      };
    }
    return { char, font: fontKey, className, size };
  }
  return { char: '', font: ICON_FONT_KEYS.UICONS, className: '', size: undefined };
}

function formatSvgCoordinate(value) {
  if (!Number.isFinite(value)) return '0';
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

function positionSvgMarkup(markup, centerX, centerY, size = 24) {
  if (typeof markup !== 'string') {
    return { markup: '', x: '0', y: '0' };
  }
  const trimmed = markup.trim();
  if (!trimmed) {
    return { markup: '', x: '0', y: '0' };
  }
  const half = size / 2;
  const x = formatSvgCoordinate(centerX);
  const y = formatSvgCoordinate(centerY);
  const width = formatSvgCoordinate(size);
  const height = formatSvgCoordinate(size);
  const cleaned = trimmed.replace(/<svg\b([^>]*)>/i, (match, attrs = '') => {
    let attrText = attrs
      .replace(/\s+x\s*=\s*"[^"]*"/gi, '')
      .replace(/\s+y\s*=\s*"[^"]*"/gi, '')
      .trim();
    const additions = [];
    const hasWidth = /(?:^|\s)width\s*=/i.test(attrText);
    const hasHeight = /(?:^|\s)height\s*=/i.test(attrText);
    if (!hasWidth) additions.push(`width="${width}"`);
    if (!hasHeight) additions.push(`height="${height}"`);
    additions.push(`x="-${formatSvgCoordinate(half)}"`);
    additions.push(`y="-${formatSvgCoordinate(half)}"`);
    attrText = [attrText, ...additions].filter(Boolean).join(' ').trim();
    return attrText ? `<svg ${attrText}>` : '<svg>';
  });
  return { markup: cleaned, x, y };
}

function glyphText(glyph) {
  const resolved = resolveIconGlyph(glyph);
  return resolved.char || '';
}

const FEEDBACK_ICON_SVG = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M5 4.5H19Q21.5 4.5 21.5 7V13Q21.5 15.5 19 15.5H15.5L12 19 8.5 15.5H5Q2.5 15.5 2.5 13V7Q2.5 4.5 5 4.5Z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.5 10.5 10.5 12.5 14.5 8.5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`.trim();

const LOAD_ICON_SVG = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 3v9.75"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <polyline
      points="8.75 9.75 12 12.75 15.25 9.75"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.75 11.5H8.6L10.4 9h8.85L21 11.5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect
      x="4.75"
      y="12.5"
      width="14.5"
      height="7.25"
      rx="1.75"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`.trim();

const PRODUCTION_COMPANY_ICON = iconGlyph('\uE2D5', ICON_FONT_KEYS.UICONS);
const RENTAL_HOUSE_ICON = iconGlyph('\uEA09', ICON_FONT_KEYS.UICONS);
const ASPECT_RATIO_ICON = iconGlyph('\uE86E', ICON_FONT_KEYS.UICONS);
const REQUIRED_SCENARIOS_ICON = iconGlyph('\uF4D4', ICON_FONT_KEYS.UICONS);
const MONITORING_SUPPORT_ICON = iconGlyph('\uEFFC', ICON_FONT_KEYS.UICONS);

const STAR_ICON_SVG = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="0"
    />
  </svg>
`.trim();

const ICON_GLYPHS = Object.freeze({
  batteryBolt: iconGlyph('\uE1A6', ICON_FONT_KEYS.UICONS),
  batteryFull: iconGlyph('\uE1A9', ICON_FONT_KEYS.UICONS),
  bolt: iconGlyph('\uF1F8', ICON_FONT_KEYS.ESSENTIAL),
  plug: iconGlyph('\uEE75', ICON_FONT_KEYS.UICONS),
  sliders: iconGlyph('\uF143', ICON_FONT_KEYS.ESSENTIAL),
  screen: iconGlyph('\uF11D', ICON_FONT_KEYS.GADGET),
  brightness: iconGlyph('\uE2B3', ICON_FONT_KEYS.UICONS),
  wifi: iconGlyph('\uF4AC', ICON_FONT_KEYS.UICONS),
  gears: iconGlyph('\uE8AF', ICON_FONT_KEYS.UICONS),
  controller: iconGlyph('\uF117', ICON_FONT_KEYS.GADGET),
  distance: iconGlyph('\uEFB9', ICON_FONT_KEYS.UICONS),
  sensor: iconGlyph('\uF034', ICON_FONT_KEYS.UICONS),
  viewfinder: iconGlyph('\uF114', ICON_FONT_KEYS.FILM),
  camera: iconGlyph('\uE333', ICON_FONT_KEYS.UICONS),
  trash: iconGlyph('\uF254', ICON_FONT_KEYS.ESSENTIAL),
  reload: iconGlyph('\uF202', ICON_FONT_KEYS.ESSENTIAL),
  load: Object.freeze({ markup: LOAD_ICON_SVG, className: 'icon-svg' }),
  fileExport: iconGlyph('\uE7AB', ICON_FONT_KEYS.UICONS),
  fileImport: iconGlyph('\uE7C7', ICON_FONT_KEYS.UICONS),
  save: iconGlyph('\uF207', ICON_FONT_KEYS.ESSENTIAL),
  share: iconGlyph('\uF219', ICON_FONT_KEYS.ESSENTIAL),
  magnet: iconGlyph('\uF1B5', ICON_FONT_KEYS.ESSENTIAL),
  timecode: iconGlyph('\uF10E', ICON_FONT_KEYS.FILM),
  audioIn: iconGlyph('\uF1C3', ICON_FONT_KEYS.ESSENTIAL),
  audioOut: iconGlyph('\uF22F', ICON_FONT_KEYS.ESSENTIAL),
  note: iconGlyph('\uF13E', ICON_FONT_KEYS.ESSENTIAL),
  overview: iconGlyph('\uF1F5', ICON_FONT_KEYS.UICONS),
  gearList: iconGlyph('\uE467', ICON_FONT_KEYS.UICONS),
  feedback: Object.freeze({ markup: FEEDBACK_ICON_SVG, className: 'icon-svg' }),
  resetView: iconGlyph('\uEB6D', ICON_FONT_KEYS.UICONS),
  pin: iconGlyph('\uF1EF', ICON_FONT_KEYS.ESSENTIAL),
  sun: iconGlyph('\uF1FE', ICON_FONT_KEYS.UICONS),
  moon: iconGlyph('\uEC7E', ICON_FONT_KEYS.UICONS),
  circleX: iconGlyph('\uF131', ICON_FONT_KEYS.ESSENTIAL),
  star: Object.freeze({
    markup: STAR_ICON_SVG,
    className: 'icon-svg favorite-star-icon'
  }),
  warning: iconGlyph('\uF26F', ICON_FONT_KEYS.ESSENTIAL)
});

const HORSE_ICON_SVG = `
  <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z"
      fill="#805333"
    />
    <path
      d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z"
      fill="#a56a43"
    />
    <path
      d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z"
      fill="#cb8252"
    />
    <circle cx="42" cy="26" r="3" fill="#2c2f38" />
    <circle cx="54" cy="43" r="1" fill="#805333" />
    <path
      d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"
      fill="#cf976a"
    />
    <circle cx="41" cy="25" r="1.25" fill="#ecf0f1" />
  </svg>
`.trim();

const PINK_MODE_ICON_FILES = Object.freeze([
  'src/illustrations/unicorns/unicorn.svg',
  'src/illustrations/unicorns/unicorn-2.svg',
  'src/illustrations/unicorns/celebrate.svg',
  'src/illustrations/unicorns/sunglasses.svg',
  'src/illustrations/unicorns/toy.svg'
]);

function createPinkModeIconImageMarkup(path) {
  if (typeof path !== 'string' || !path) {
    return '';
  }
  const safePath = escapeHtml(path);
  return `<img src="${safePath}" alt="" loading="lazy" decoding="async" aria-hidden="true" class="pink-mode-icon-image">`;
}

const PINK_MODE_ICON_FALLBACK_MARKUP = Object.freeze(
  PINK_MODE_ICON_FILES.map(createPinkModeIconImageMarkup).filter(Boolean)
);

const PINK_MODE_ANIMATED_ICON_FILES = Object.freeze([
  'src/animations/cat.json',
  'src/animations/cup.json',
  'src/animations/cupcake.json',
  'src/animations/flamingo.json',
  'src/animations/float.json',
  'src/animations/float-2.json',
  'src/animations/fox.json',
  'src/animations/heart.json',
  'src/animations/horn.json',
  'src/animations/invitation.json',
  'src/animations/mask.json',
  'src/animations/rainbow.json',
  'src/animations/rocking-horse.json',
  'src/animations/slippers.json',
  'src/animations/sunglasses.json',
  'src/animations/unicorn.json',
  'animated icons 3/camera.json',
  'animated icons 3/director-chair.json',
  'animated icons 3/dog.json',
  'animated icons 3/fox.json',
  'animated icons 3/fox-2.json',
  'animated icons 3/fox-3.json',
  'animated icons 3/horse.json',
  'animated icons 3/mountains.json',
  'animated icons 3/movie-camera.json',
  'animated icons 3/pinata.json',
  'animated icons 3/script.json',
  'animated icons 3/video-camera.json'
]);

const pinkModeIcons = {
  off: Object.freeze({
    className: 'icon-svg pink-mode-icon',
    markup: HORSE_ICON_SVG
  }),
  onSequence: Object.freeze([])
};

let pinkModeIconRotationTimer = null;
let pinkModeIconIndex = 0;

const PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS = 14800;
const PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS = 23800;
const PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS = 6400;
const PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS = 10800;
const PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX = 72;
const PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX = 72;
const PINK_MODE_ANIMATED_ICON_MAX_ACTIVE = 4;
const PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS = 12;
const PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX = 28;
const PINK_MODE_ANIMATED_ICON_MIN_SCALE = 0.65;
const PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN = 920;
const PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR =
  'a, button, input, select, textarea, label, summary, h1, h2, h3, h4, h5, h6, p, li, td, th, [role="button"], [role="link"], [role="menu"], [role="dialog"], [role="listbox"], [role="combobox"], [role="textbox"], [contenteditable="true"], .form-row, .form-row-actions, .form-actions';
const PINK_MODE_ANIMATED_ICON_PROBE_POINTS = Object.freeze([
  Object.freeze({ x: 0, y: 0 }),
  Object.freeze({ x: 0.35, y: 0 }),
  Object.freeze({ x: -0.35, y: 0 }),
  Object.freeze({ x: 0, y: 0.35 }),
  Object.freeze({ x: 0, y: -0.35 }),
  Object.freeze({ x: 0.25, y: 0.25 }),
  Object.freeze({ x: -0.25, y: 0.25 }),
  Object.freeze({ x: 0.25, y: -0.25 }),
  Object.freeze({ x: -0.25, y: -0.25 })
]);

let pinkModeAnimatedIconLayer = null;
let pinkModeAnimatedIconTimeoutId = null;
let pinkModeAnimatedIconsActive = false;
let pinkModeAnimatedIconTemplates = null;
let pinkModeAnimatedIconTemplatesPromise = null;
const pinkModeAnimatedIconInstances = new Set();
let pinkModeAnimatedIconLastTemplateName = null;

const pinkModeReduceMotionQuery =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

function ensureSvgHasAriaHidden(markup) {
  if (typeof markup !== 'string') return '';
  const trimmed = markup.trim();
  if (!trimmed) return '';
  if (!/^<svg\b/i.test(trimmed)) return trimmed;
  if (/\baria-hidden\s*=\s*['"]/i.test(trimmed)) return trimmed;
  return trimmed.replace(/<svg\b/i, match => `${match} aria-hidden="true"`);
}

function setPinkModeIconSequence(markupList) {
  if (!Array.isArray(markupList) || !markupList.length) {
    return false;
  }
  const configs = markupList
    .map(ensureSvgHasAriaHidden)
    .filter(Boolean)
    .map(markup =>
      Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup
      })
    );
  if (!configs.length) {
    return false;
  }
  pinkModeIcons.onSequence = Object.freeze(configs);
  if (
    typeof document !== 'undefined' &&
    document.body &&
    document.body.classList.contains('pink-mode')
  ) {
    stopPinkModeIconRotation();
    pinkModeIconIndex = 0;
    applyPinkModeIcon(pinkModeIcons.onSequence[pinkModeIconIndex], { animate: false });
    startPinkModeIconRotation();
  }
  return true;
}

async function loadPinkModeIconsFromFiles() {
  if (typeof fetch !== 'function') {
    return;
  }
  const responses = await Promise.all(
    PINK_MODE_ICON_FILES.map(path =>
      fetch(path)
        .then(response => (response.ok ? response.text() : null))
        .catch(() => null)
    )
  );
  const markupList = responses.filter(Boolean);
  if (markupList.length) {
    setPinkModeIconSequence(markupList);
  }
}

async function loadPinkModeAnimatedIconTemplates() {
  if (pinkModeAnimatedIconTemplates) {
    return pinkModeAnimatedIconTemplates;
  }
  if (pinkModeAnimatedIconTemplatesPromise) {
    return pinkModeAnimatedIconTemplatesPromise;
  }
  if (typeof fetch !== 'function') {
    pinkModeAnimatedIconTemplates = Object.freeze([]);
    return pinkModeAnimatedIconTemplates;
  }
  pinkModeAnimatedIconTemplatesPromise = Promise.all(
    PINK_MODE_ANIMATED_ICON_FILES.map(path =>
      fetch(path)
        .then(response => (response.ok ? response.text() : null))
        .catch(() => null)
    )
  )
    .then(contents =>
      Object.freeze(
        contents
          .map((content, index) =>
            content
              ? Object.freeze({
                  name: PINK_MODE_ANIMATED_ICON_FILES[index],
                  data: content
                })
              : null
          )
          .filter(Boolean)
      )
    )
    .catch(error => {
      console.warn('Could not load pink mode animated icons', error);
      return Object.freeze([]);
    })
    .then(templates => {
      pinkModeAnimatedIconTemplates = templates;
      return templates;
    });
  return pinkModeAnimatedIconTemplatesPromise;
}

function ensurePinkModeAnimationLayer() {
  if (!document) {
    return null;
  }
  const host = document.getElementById('mainContent') || document.body;
  if (!host) {
    return null;
  }
  if (
    pinkModeAnimatedIconLayer &&
    pinkModeAnimatedIconLayer.isConnected &&
    host.contains(pinkModeAnimatedIconLayer)
  ) {
    return pinkModeAnimatedIconLayer;
  }
  if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
    pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
  }
  const layer = document.createElement('div');
  layer.className = 'pink-mode-animation-layer';
  layer.setAttribute('aria-hidden', 'true');
  host.appendChild(layer);
  pinkModeAnimatedIconLayer = layer;
  return layer;
}

function computePinkModeAnimationAvoidRegions(layer) {
  if (
    typeof document === 'undefined' ||
    typeof document.querySelectorAll !== 'function'
  ) {
    return Object.freeze([]);
  }
  const elements = document.querySelectorAll(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR);
  if (!elements || !elements.length) {
    return Object.freeze([]);
  }
  const regions = [];
  for (const element of elements) {
    if (!element) {
      continue;
    }
    if (layer && layer.contains(element)) {
      continue;
    }
    if (typeof element.getBoundingClientRect !== 'function') {
      continue;
    }
    const rect = element.getBoundingClientRect();
    if (!rect) {
      continue;
    }
    const { width, height, left, right, top, bottom } = rect;
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      continue;
    }
    if (width <= 0 || height <= 0) {
      continue;
    }
    const margin = Math.max(
      PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
      Math.min(width, height) * 0.3
    );
    regions.push({ left, right, top, bottom, margin });
  }
  return Object.freeze(regions);
}

function collectPinkModeAnimationInstanceRegions(layer) {
  if (!pinkModeAnimatedIconInstances.size) {
    return Object.freeze([]);
  }
  const regions = [];
  for (const instance of pinkModeAnimatedIconInstances) {
    if (!instance || !instance.container) {
      continue;
    }
    const node = instance.container;
    if (!node.isConnected) {
      continue;
    }
    if (layer && node.parentNode && layer !== node.parentNode && !layer.contains(node)) {
      continue;
    }
    if (typeof node.getBoundingClientRect !== 'function') {
      continue;
    }
    const rect = node.getBoundingClientRect();
    if (!rect) {
      continue;
    }
    const { left, right, top, bottom, width, height } = rect;
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      continue;
    }
    if (width <= 0 || height <= 0) {
      continue;
    }
    const largestSide = Math.max(width, height);
    regions.push({
      left,
      right,
      top,
      bottom,
      margin: Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX * 1.25, largestSide * 0.6)
    });
  }
  return Object.freeze(regions);
}

function isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions) {
  if (
    typeof document === 'undefined' ||
    typeof document.elementFromPoint !== 'function'
  ) {
    return true;
  }
  const viewportWidth =
    typeof window !== 'undefined' && typeof window.innerWidth === 'number'
      ? window.innerWidth
      : document.documentElement && typeof document.documentElement.clientWidth === 'number'
        ? document.documentElement.clientWidth
        : null;
  const viewportHeight =
    typeof window !== 'undefined' && typeof window.innerHeight === 'number'
      ? window.innerHeight
      : document.documentElement && typeof document.documentElement.clientHeight === 'number'
        ? document.documentElement.clientHeight
        : null;
  const baseX = (hostRect ? hostRect.left : 0) + x;
  const baseY = (hostRect ? hostRect.top : 0) + y;
  const candidate = {
    left: baseX - size / 2,
    right: baseX + size / 2,
    top: baseY - size / 2,
    bottom: baseY + size / 2
  };

  if (Array.isArray(avoidRegions) && avoidRegions.length) {
    for (const region of avoidRegions) {
      if (!region) {
        continue;
      }
      const regionMargin =
        typeof region.margin === 'number'
          ? Math.max(
              PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
              size * 0.25,
              region.margin
            )
          : Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25);
      if (
        candidate.left < region.right + regionMargin &&
        candidate.right > region.left - regionMargin &&
        candidate.top < region.bottom + regionMargin &&
        candidate.bottom > region.top - regionMargin
      ) {
        return false;
      }
    }
  }

  for (const point of PINK_MODE_ANIMATED_ICON_PROBE_POINTS) {
    const sampleX = baseX + point.x * size;
    const sampleY = baseY + point.y * size;
    if (
      viewportWidth !== null && (sampleX < 0 || sampleX > viewportWidth)
    ) {
      continue;
    }
    if (
      viewportHeight !== null && (sampleY < 0 || sampleY > viewportHeight)
    ) {
      continue;
    }
    const elementsAtPoint =
      typeof document.elementsFromPoint === 'function'
        ? document.elementsFromPoint(sampleX, sampleY)
        : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean);
    for (const element of elementsAtPoint) {
      if (!element) {
        continue;
      }
      if (layer && element === layer) {
        continue;
      }
      if (layer && layer.contains(element)) {
        return false;
      }
      if (
        (typeof element.matches === 'function' && element.matches(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR)) ||
        (typeof element.closest === 'function' && element.closest(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR))
      ) {
        return false;
      }
    }
  }
  return true;
}

function findPinkModeAnimationPlacement({
  layer,
  hostRect,
  hostTop,
  visibleTop,
  visibleBottom,
  horizontalPadding,
  verticalPadding,
  hostWidth,
  size,
  avoidRegions
}) {
  const minY = Math.max(visibleTop - hostTop + verticalPadding, verticalPadding);
  const maxY = Math.max(visibleBottom - hostTop - verticalPadding, minY);
  const minX = horizontalPadding;
  const maxX = Math.max(hostWidth - horizontalPadding, minX);

  for (let attempt = 0; attempt < PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS; attempt += 1) {
    const y = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
    const x = maxX > minX ? minX + Math.random() * (maxX - minX) : minX;
    if (isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions)) {
      return { x, y };
    }
  }
  return null;
}

function destroyPinkModeAnimatedIconInstance(instance) {
  if (!instance || instance.destroyed) {
    return;
  }
  instance.destroyed = true;
  if (instance.animation && typeof instance.animation.destroy === 'function') {
    try {
      instance.animation.destroy();
    } catch (error) {
      console.warn('Could not dispose pink mode animation', error);
    }
  }
  if (instance.container && instance.container.parentNode) {
    instance.container.parentNode.removeChild(instance.container);
  }
  pinkModeAnimatedIconInstances.delete(instance);
}

function spawnPinkModeAnimatedIconInstance(templates) {
  if (
    !pinkModeAnimatedIconsActive ||
    !Array.isArray(templates) ||
    !templates.length ||
    typeof window === 'undefined' ||
    !window.lottie ||
    typeof window.lottie.loadAnimation !== 'function'
  ) {
    return false;
  }
  const layer = ensurePinkModeAnimationLayer();
  if (!layer) {
    return false;
  }
  let availableTemplates = templates;
  if (templates.length > 1 && pinkModeAnimatedIconLastTemplateName) {
    const filteredTemplates = templates.filter(
      template => template && template.name !== pinkModeAnimatedIconLastTemplateName
    );
    if (filteredTemplates.length) {
      availableTemplates = filteredTemplates;
    }
  }

  const template =
    availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  if (!template || !template.data) {
    return false;
  }
  const container = document.createElement('div');
  container.className = 'pink-mode-animation-instance';
  container.setAttribute('aria-hidden', 'true');
  const duration = Math.round(
    Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS - PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS) +
      PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS
  );
  const baseSize =
    Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX - PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX) +
    PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX;
  const viewportWidth =
    typeof window !== 'undefined' && typeof window.innerWidth === 'number'
      ? window.innerWidth
      : document.documentElement && typeof document.documentElement.clientWidth === 'number'
        ? document.documentElement.clientWidth
        : null;
  const viewportScale =
    viewportWidth && viewportWidth < PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN
      ? Math.max(
          PINK_MODE_ANIMATED_ICON_MIN_SCALE,
          viewportWidth / PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN
        )
      : 1;
  const size = Math.max(
    Math.round(baseSize * viewportScale),
    Math.round(PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX * PINK_MODE_ANIMATED_ICON_MIN_SCALE)
  );
  const host = layer.parentElement || document.body;
  const viewportHeight =
    typeof window !== 'undefined' && window.innerHeight
      ? window.innerHeight
      : document.documentElement && document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : size * 4;
  const viewportTop =
    typeof window !== 'undefined' && typeof window.scrollY === 'number'
      ? window.scrollY
      : document.documentElement && typeof document.documentElement.scrollTop === 'number'
        ? document.documentElement.scrollTop
        : 0;
  const viewportBottom = viewportTop + viewportHeight;
  const hostRect = host ? host.getBoundingClientRect() : null;
  const hostTop = hostRect ? hostRect.top + viewportTop : 0;
  const hostHeight =
    host && typeof host.scrollHeight === 'number' && host.scrollHeight > 0
      ? host.scrollHeight
      : hostRect && hostRect.height
        ? hostRect.height
        : viewportHeight;
  const hostBottom = hostTop + hostHeight;
  let visibleTop = Math.max(hostTop, viewportTop);
  let visibleBottom = Math.min(hostBottom, viewportBottom);
  if (visibleBottom <= visibleTop) {
    visibleTop = hostTop;
    visibleBottom = hostBottom;
  }
  const hostWidth =
    host && typeof host.clientWidth === 'number' && host.clientWidth > 0
      ? host.clientWidth
      : viewportWidth || size * 4;
  const safeHorizontalRange = Math.max(hostWidth, size * 3);
  const safeVerticalRange = Math.max(hostHeight, size * 3);
  const horizontalPadding = Math.min(
    Math.max(size * 0.6 + 48, 48),
    safeHorizontalRange / 2
  );
  const verticalPadding = Math.min(
    Math.max(size * 0.6 + 64, 64),
    safeVerticalRange / 2
  );
  const avoidRegions = [
    ...computePinkModeAnimationAvoidRegions(layer),
    ...collectPinkModeAnimationInstanceRegions(layer)
  ];
  const placement = findPinkModeAnimationPlacement({
    layer,
    hostRect,
    hostTop,
    visibleTop,
    visibleBottom,
    horizontalPadding,
    verticalPadding,
    hostWidth,
    size,
    avoidRegions
  });
  if (!placement) {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }
  const { x, y } = placement;
  container.style.setProperty('--pink-mode-animation-duration', `${duration}ms`);
  container.style.setProperty('--pink-mode-animation-size', `${size}px`);
  container.style.setProperty('--pink-mode-animation-x', `${x}px`);
  container.style.setProperty('--pink-mode-animation-y', `${y}px`);
  layer.appendChild(container);

  let animationData;
  try {
    animationData = JSON.parse(template.data);
  } catch (error) {
    console.warn('Could not parse pink mode animation', error);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }

  let animationInstance;
  try {
    animationInstance = window.lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    });
  } catch (error) {
    console.warn('Could not start pink mode animation', error);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }

  const instance = {
    container,
    animation: animationInstance,
    destroyed: false
  };

  container.addEventListener(
    'animationend',
    () => {
      destroyPinkModeAnimatedIconInstance(instance);
    },
    { once: true }
  );

  pinkModeAnimatedIconInstances.add(instance);
  if (pinkModeAnimatedIconInstances.size > PINK_MODE_ANIMATED_ICON_MAX_ACTIVE) {
    const oldest = pinkModeAnimatedIconInstances.values().next().value;
    if (oldest && oldest !== instance) {
      destroyPinkModeAnimatedIconInstance(oldest);
    }
  }

  pinkModeAnimatedIconLastTemplateName = typeof template.name === 'string' ? template.name : null;

  return true;
}

function scheduleNextPinkModeAnimatedIcon(templates) {
  if (!pinkModeAnimatedIconsActive) {
    return;
  }
  const delay = Math.round(
    Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS - PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS) +
      PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS
  );
  pinkModeAnimatedIconTimeoutId = window.setTimeout(() => {
    pinkModeAnimatedIconTimeoutId = null;
    if (!pinkModeAnimatedIconsActive) {
      return;
    }
    spawnPinkModeAnimatedIconInstance(templates);
    if (pinkModeAnimatedIconsActive) {
      scheduleNextPinkModeAnimatedIcon(templates);
    }
  }, delay);
}

function startPinkModeAnimatedIcons() {
  if (pinkModeAnimatedIconsActive) {
    return;
  }
  if (!document || !document.body) {
    return;
  }
  if (pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
    return;
  }
  if (
    typeof window === 'undefined' ||
    !window.lottie ||
    typeof window.lottie.loadAnimation !== 'function'
  ) {
    return;
  }
  pinkModeAnimatedIconsActive = true;
  loadPinkModeAnimatedIconTemplates()
    .then(templates => {
      if (!pinkModeAnimatedIconsActive) {
        return templates;
      }
      if (!templates.length) {
        stopPinkModeAnimatedIcons();
        return templates;
      }
      spawnPinkModeAnimatedIconInstance(templates);
      scheduleNextPinkModeAnimatedIcon(templates);
      return templates;
    })
    .catch(error => {
      console.warn('Could not prepare pink mode animated icons', error);
      stopPinkModeAnimatedIcons();
    });
}

function stopPinkModeAnimatedIcons() {
  pinkModeAnimatedIconsActive = false;
  if (pinkModeAnimatedIconTimeoutId) {
    clearTimeout(pinkModeAnimatedIconTimeoutId);
    pinkModeAnimatedIconTimeoutId = null;
  }
  if (pinkModeAnimatedIconInstances.size) {
    Array.from(pinkModeAnimatedIconInstances).forEach(instance => {
      destroyPinkModeAnimatedIconInstance(instance);
    });
    pinkModeAnimatedIconInstances.clear();
  }
  if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
    pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
  }
  pinkModeAnimatedIconLayer = null;
  pinkModeAnimatedIconLastTemplateName = null;
}

if (pinkModeReduceMotionQuery) {
  const handlePinkModeReduceMotionChange = event => {
    if (event.matches) {
      stopPinkModeAnimatedIcons();
    } else if (document.body && document.body.classList.contains('pink-mode')) {
      startPinkModeAnimatedIcons();
    }
  };
  if (typeof pinkModeReduceMotionQuery.addEventListener === 'function') {
    pinkModeReduceMotionQuery.addEventListener('change', handlePinkModeReduceMotionChange);
  } else if (typeof pinkModeReduceMotionQuery.addListener === 'function') {
    pinkModeReduceMotionQuery.addListener(handlePinkModeReduceMotionChange);
  }
}

const PINK_MODE_ICON_INTERVAL_MS = 30000;
const PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
const PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;

const projectFieldIcons = {
  productionCompany: PRODUCTION_COMPANY_ICON,
  rentalHouse: RENTAL_HOUSE_ICON,
  crew: iconGlyph('\uF404', ICON_FONT_KEYS.UICONS),
  prepDays: iconGlyph('\uE312', ICON_FONT_KEYS.UICONS),
  shootingDays: iconGlyph('\uE311', ICON_FONT_KEYS.UICONS),
  deliveryResolution: iconGlyph('\uEF69', ICON_FONT_KEYS.UICONS),
  recordingResolution: ICON_GLYPHS.camera,
  aspectRatio: ASPECT_RATIO_ICON,
  codec: iconGlyph('\uE7A6', ICON_FONT_KEYS.UICONS),
  baseFrameRate: iconGlyph('\uE46F', ICON_FONT_KEYS.UICONS),
  sensorMode: ICON_GLYPHS.sensor,
  requiredScenarios: REQUIRED_SCENARIOS_ICON,
  lenses: iconGlyph('\uE0A3', ICON_FONT_KEYS.UICONS),
  cameraHandle: iconGlyph('\uF2DC', ICON_FONT_KEYS.UICONS),
  viewfinderExtension: iconGlyph('\uE338', ICON_FONT_KEYS.UICONS),
  gimbal: iconGlyph('\uEA9C', ICON_FONT_KEYS.UICONS),
  monitoringSupport: MONITORING_SUPPORT_ICON,
  monitoringConfiguration: iconGlyph('\uF0D0', ICON_FONT_KEYS.UICONS),
  monitorUserButtons: iconGlyph('\uF0D1', ICON_FONT_KEYS.UICONS),
  cameraUserButtons: iconGlyph('\uF0D1', ICON_FONT_KEYS.UICONS),
  viewfinderUserButtons: iconGlyph('\uF0D1', ICON_FONT_KEYS.UICONS)
};

function setButtonLabelWithIcon(button, label, glyph = ICON_GLYPHS.save) {
  if (!button) return;
  const safeLabel = typeof label === 'string' ? escapeHtml(label) : '';
  const iconHtml = iconMarkup(glyph, 'btn-icon');
  button.innerHTML = `${iconHtml}${safeLabel}`;
}

function createCrewRow(data = {}) {
  if (!crewContainer) return;
  const row = document.createElement('div');
  row.className = 'person-row';
  const roleSel = document.createElement('select');
  crewRoles.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    const roleLabels = texts[currentLang]?.crewRoles || texts.en?.crewRoles || {};
    opt.textContent = roleLabels[r] || r;
    roleSel.appendChild(opt);
  });
  if (data.role) roleSel.value = data.role;
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  const fallbackProjectForm = texts.en?.projectForm || {};
  const projectFormTexts = texts[currentLang]?.projectForm || fallbackProjectForm;
  nameInput.placeholder = projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder || 'Name';
  nameInput.className = 'person-name';
  nameInput.value = data.name || '';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.placeholder = projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder || 'Phone';
  phoneInput.className = 'person-phone';
  phoneInput.value = data.phone || '';
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder || 'Email';
  emailInput.className = 'person-email';
  emailInput.value = data.email || '';
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(roleSel, nameInput, phoneInput, emailInput, removeBtn);
  crewContainer.appendChild(row);
}

function createPrepRow(data = {}) {
  if (!prepContainer) return;
  const row = document.createElement('div');
  row.className = 'period-row';
  const start = document.createElement('input');
  start.type = 'date';
  start.className = 'prep-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'prepLabel');
  const span = document.createElement('span');
  span.textContent = 'to';
  const end = document.createElement('input');
  end.type = 'date';
  end.className = 'prep-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'prepLabel');
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  prepContainer.appendChild(row);
}

function createShootRow(data = {}) {
  if (!shootContainer) return;
  const row = document.createElement('div');
  row.className = 'period-row';
  const start = document.createElement('input');
  start.type = 'date';
  start.className = 'shoot-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'shootLabel');
  const span = document.createElement('span');
  span.textContent = 'to';
  const end = document.createElement('input');
  end.type = 'date';
  end.className = 'shoot-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'shootLabel');
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  shootContainer.appendChild(row);
}

if (addPersonBtn) {
  addPersonBtn.addEventListener('click', () => createCrewRow());
}
if (addPrepBtn) {
  addPrepBtn.addEventListener('click', () => createPrepRow());
}
if (addShootBtn) {
  addShootBtn.addEventListener('click', () => createShootRow());
}

function updateTripodOptions() {
  const headBrand = tripodHeadBrandSelect ? tripodHeadBrandSelect.value : '';
  const bowl = tripodBowlSelect ? tripodBowlSelect.value : '';
  const headOpts = tripodHeadBrandSelect ? Array.from(tripodHeadBrandSelect.options) : [];
  const bowlOpts = tripodBowlSelect ? Array.from(tripodBowlSelect.options) : [];
  headOpts.forEach(o => { o.hidden = false; });
  bowlOpts.forEach(o => { o.hidden = false; });
  if (headBrand === 'OConnor') {
    const opt = bowlOpts.find(o => o.value === '75mm bowl');
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === '75mm bowl') tripodBowlSelect.value = '';
  }
  if (headBrand === 'Sachtler') {
    const opt = bowlOpts.find(o => o.value === 'Mitchell Mount');
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === 'Mitchell Mount') tripodBowlSelect.value = '';
  }
  if (bowl === '75mm bowl') {
    const opt = headOpts.find(o => o.value === 'OConnor');
    if (opt) opt.hidden = true;
    if (tripodHeadBrandSelect.value === 'OConnor') tripodHeadBrandSelect.value = '';
  }
  if (bowl === 'Mitchell Mount') {
    const opt = headOpts.find(o => o.value === 'Sachtler');
    if (opt) opt.hidden = true;
    if (tripodHeadBrandSelect.value === 'Sachtler') tripodHeadBrandSelect.value = '';
  }
}

const totalPowerElem      = document.getElementById("totalPower");
const totalCurrent144Elem = document.getElementById("totalCurrent144");
const totalCurrent12Elem  = document.getElementById("totalCurrent12");
const batteryLifeElem     = document.getElementById("batteryLife");
const batteryLifeLabelElem = document.getElementById("batteryLifeLabel");
const runtimeAverageNoteElem = document.getElementById("runtimeAverageNote");
const batteryCountElem    = document.getElementById("batteryCount");
const pinWarnElem         = document.getElementById("pinWarning");
const dtapWarnElem        = document.getElementById("dtapWarning");
const hotswapWarnElem     = document.getElementById("hotswapWarning");
const powerDiagramElem    = document.getElementById("powerDiagram");
const powerDiagramBarElem = document.getElementById("powerDiagramBar");
const maxPowerTextElem    = document.getElementById("maxPowerText");
const powerDiagramLegendElem = document.getElementById("powerDiagramLegend");

function drawPowerDiagram(availableWatt, segments, maxPinA) {
  if (!powerDiagramElem || !powerDiagramBarElem || !maxPowerTextElem || !powerDiagramLegendElem) return;
  if (!availableWatt || availableWatt <= 0) {
    powerDiagramElem.classList.add("hidden");
    powerDiagramBarElem.innerHTML = "";
    powerDiagramLegendElem.innerHTML = "";
    maxPowerTextElem.textContent = "";
    setStatusLevel(maxPowerTextElem, null);
    return;
  }
  powerDiagramElem.classList.remove("hidden");
  powerDiagramBarElem.innerHTML = "";
  powerDiagramLegendElem.innerHTML = "";
  const MAX_WIDTH = 300;
  const total = segments.reduce((sum, s) => sum + s.power, 0);
  const scale = MAX_WIDTH / Math.max(availableWatt, total);
  const limitPos = availableWatt * scale;

  segments.forEach(seg => {
    const width = seg.power * scale;
    if (width <= 0) return;
    const div = document.createElement("div");
    div.className = `segment ${seg.className}`;
    div.style.width = `${width}px`;
    div.setAttribute("title", `${seg.label} ${seg.power.toFixed(1)} W`);
    powerDiagramBarElem.appendChild(div);

    const legendItem = document.createElement("span");
    const swatch = document.createElement("span");
    swatch.className = `swatch ${seg.className}`;
    legendItem.appendChild(swatch);
    legendItem.appendChild(document.createTextNode(seg.label.replace(/:$/, "")));
    powerDiagramLegendElem.appendChild(legendItem);
  });

  if (total > availableWatt) {
    const over = document.createElement("div");
    over.className = "over-usage";
    over.style.left = `${limitPos}px`;
    powerDiagramBarElem.appendChild(over);
  }

  const limit = document.createElement("div");
  limit.className = "limit-line";
  limit.style.left = `${limitPos}px`;
  if (typeof maxPinA === 'number' && maxPinA > 0) {
    const label = document.createElement("span");
    label.className = "limit-label";
    label.textContent = `${texts[currentLang].pinLabel} ${maxPinA} A`;
    limit.appendChild(label);
  }
  powerDiagramBarElem.appendChild(limit);

  powerDiagramElem.classList.toggle("over", total > availableWatt);
  maxPowerTextElem.textContent = `${texts[currentLang].availablePowerLabel} ${availableWatt.toFixed(0)} W`;
  setStatusLevel(maxPowerTextElem, total > availableWatt ? 'danger' : null);
}

const setupSelect     = document.getElementById("setupSelect");
const setupNameInput  = document.getElementById("setupName");
const saveSetupBtn    = document.getElementById("saveSetupBtn");
const deleteSetupBtn  = document.getElementById("deleteSetupBtn");
const shareSetupBtn   = document.getElementById("shareSetupBtn");
const sharedLinkRow   = document.getElementById("sharedLinkRow");
const sharedLinkInput = document.getElementById("sharedLinkInput");
const shareLinkMessage = document.getElementById("shareLinkMessage");
const shareIncludeAutoGearCheckbox = document.getElementById("shareIncludeAutoGear");

function sanitizeShareFilename(name) {
  if (!name) return '';
  const trimmed = String(name).trim();
  if (!trimmed) return '';
  const sanitized = trimmed
    .replace(/[\\/:*?"<>|]+/g, '_')
    .replace(/\s+/g, ' ')
    .replace(/^\.+/, '')
    .replace(/\.+$/, '')
    .trim();
  return sanitized;
}

function ensureJsonExtension(filename) {
  if (!filename) return '';
  return /\.json$/i.test(filename) ? filename : `${filename}.json`;
}

function getDefaultShareFilename(setupName) {
  const sanitized = sanitizeShareFilename(setupName);
  return sanitized || 'project';
}

function promptForSharedFilename(setupName) {
  const defaultName = getDefaultShareFilename(setupName);
  const template = getLocalizedText('shareFilenamePrompt') || '';
  const promptMessage = template.includes('{defaultName}')
    ? template.replace('{defaultName}', defaultName)
    : template || 'Enter a name for the exported project file:';
  if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
    const response = window.prompt(promptMessage, defaultName);
    if (response === null) {
      return null;
    }
    const sanitized = sanitizeShareFilename(response);
    if (!sanitized) {
      const invalidMessage =
        getLocalizedText('shareFilenameInvalid')
        || 'Please enter a valid file name to continue.';
      if (typeof window.alert === 'function') {
        window.alert(invalidMessage);
      }
      return null;
    }
    return ensureJsonExtension(sanitized);
  }
  return ensureJsonExtension(defaultName);
}

function confirmAutoGearSelection(defaultInclude) {
  const confirmMessage =
    getLocalizedText('shareIncludeAutoGearConfirm')
    || 'Include automatic gear rules in the shared file? Select OK to include them or Cancel to skip.';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    return window.confirm(confirmMessage);
  }
  return !!defaultInclude;
}
const shareDialog = document.getElementById("shareDialog");
const shareForm = document.getElementById("shareForm");
const shareDialogHeadingElem = document.getElementById("shareDialogHeading");
const shareFilenameInput = document.getElementById("shareFilename");
const shareFilenameLabelElem = document.getElementById("shareFilenameLabel");
const shareFilenameMessage = document.getElementById("shareFilenameMessage");
const shareCancelBtn = document.getElementById("shareCancelBtn");
const shareConfirmBtn = document.getElementById("shareConfirmBtn");
const shareIncludeAutoGearText = document.getElementById("shareIncludeAutoGearText");
const shareIncludeAutoGearLabelElem = document.getElementById("shareIncludeAutoGearLabel");
if (shareFilenameInput && shareFilenameMessage) {
  shareFilenameInput.setAttribute('aria-describedby', 'shareFilenameMessage');
}
const sharedImportDialog = document.getElementById("sharedImportDialog");
const sharedImportForm = document.getElementById("sharedImportForm");
const sharedImportDialogHeading = document.getElementById("sharedImportDialogHeading");
const sharedImportDialogMessage = document.getElementById("sharedImportDialogMessage");
const sharedImportOptions = document.getElementById("sharedImportOptions");
const sharedImportLegend = document.getElementById("sharedImportLegend");
const sharedImportModeSelect = document.getElementById("sharedImportModeSelect");
const sharedImportModeNoneOption = document.getElementById("sharedImportModeNoneOption");
const sharedImportModeProjectOption = document.getElementById("sharedImportModeProjectOption");
const sharedImportModeGlobalOption = document.getElementById("sharedImportModeGlobalOption");
const sharedImportConfirmBtn = document.getElementById("sharedImportConfirmBtn");
const sharedImportCancelBtn = document.getElementById("sharedImportCancelBtn");
if (sharedImportModeSelect) {
  Array.from(sharedImportModeSelect.options || []).forEach(option => {
    if (option.value === "none") return;
    option.disabled = true;
  });
}
let sharedImportPromptActive = false;
let pendingSharedLinkListener = null;
let lastSetupName = setupSelect ? setupSelect.value : '';
const applySharedLinkBtn = document.getElementById("applySharedLinkBtn");
const sharedKeyMap = {
  setupName: "s",
  camera: "c",
  monitor: "m",
  video: "v",
  cage: "g",
  motors: "o",
  controllers: "r",
  distance: "d",
  batteryPlate: "p",
  battery: "b",
  batteryHotswap: "h",
  projectInfo: "i",
  projectHtml: "q",
  gearSelectors: "e",
  gearList: "l",
  changedDevices: "x",
  feedback: "f",
  autoGearRules: "a"
};

let lastSharedSetupData = null;
let lastSharedAutoGearRules = null;
let sharedImportPreviousPresetId = '';
let sharedImportProjectPresetActive = false;

function cloneSharedImportValue(value) {
  if (value == null) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to clone shared import value', error);
    return null;
  }
}

function storeSharedImportData(data, rules) {
  lastSharedSetupData = cloneSharedImportValue(data);
  lastSharedAutoGearRules = cloneSharedImportValue(rules);
}

function clearStoredSharedImportData() {
  lastSharedSetupData = null;
  lastSharedAutoGearRules = null;
}

function deactivateSharedImportProjectPreset() {
  if (!sharedImportProjectPresetActive) return;
  const targetPresetId = sharedImportPreviousPresetId || '';
  setActiveAutoGearPresetId(targetPresetId, { persist: false, skipRender: true });
  sharedImportProjectPresetActive = false;
  sharedImportPreviousPresetId = '';
  renderAutoGearPresetsControls();
}

function activateSharedImportProjectPreset(presetId) {
  if (!presetId) return;
  if (!sharedImportProjectPresetActive) {
    sharedImportPreviousPresetId = activeAutoGearPresetId || '';
  }
  sharedImportProjectPresetActive = true;
  setActiveAutoGearPresetId(presetId, { persist: false, skipRender: true });
  renderAutoGearPresetsControls();
}

function getSharedImportProjectName(sharedData) {
  if (!sharedData || typeof sharedData !== 'object') return '';
  const projectName = sharedData.projectInfo && typeof sharedData.projectInfo.projectName === 'string'
    ? sharedData.projectInfo.projectName.trim()
    : '';
  if (projectName) return projectName;
  if (typeof sharedData.setupName === 'string') {
    const normalized = sharedData.setupName.trim();
    if (normalized) return normalized;
  }
  return '';
}

function getSharedImportPresetLabel(sharedData) {
  const langTexts = texts[currentLang] || texts.en || {};
  const fallback = langTexts.sharedImportAutoGearPresetFallback
    || texts.en?.sharedImportAutoGearPresetFallback
    || 'Shared automatic gear rules';
  const projectName = getSharedImportProjectName(sharedData);
  if (!projectName) {
    return fallback;
  }
  const template = langTexts.sharedImportAutoGearPresetName
    || texts.en?.sharedImportAutoGearPresetName
    || '%s';
  if (template.includes('%s')) {
    return formatWithPlaceholders(template, projectName);
  }
  return `${template} ${projectName}`.trim();
}

function ensureSharedAutoGearPreset(rules, sharedData) {
  const normalizedRules = Array.isArray(rules)
    ? rules.map(normalizeAutoGearRule).filter(Boolean)
    : [];
  if (!normalizedRules.length) return null;
  const label = getSharedImportPresetLabel(sharedData);
  const fingerprint = createAutoGearRulesFingerprint(normalizedRules);
  let preset = autoGearPresets.find(entry => entry.fingerprint === fingerprint) || null;
  const fallback = texts[currentLang]?.sharedImportAutoGearPresetFallback
    || texts.en?.sharedImportAutoGearPresetFallback
    || 'Shared automatic gear rules';
  if (preset) {
    if (label && preset.label !== label && preset.label === fallback) {
      preset = { ...preset, label };
      autoGearPresets = autoGearPresets.map(entry => (entry.id === preset.id ? preset : entry));
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      renderAutoGearPresetsControls();
    }
    return preset;
  }
  const normalizedPreset = normalizeAutoGearPreset({
    id: generateAutoGearId('preset'),
    label,
    rules: normalizedRules,
  });
  if (!normalizedPreset) return null;
  autoGearPresets.push(normalizedPreset);
  autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
  persistAutoGearPresets(autoGearPresets);
  if (autoGearAutoPresetId) {
    setAutoGearAutoPresetId('', { persist: true, skipRender: true });
  }
  renderAutoGearPresetsControls();
  return normalizedPreset;
}

function configureSharedImportOptions(sharedRules) {
  if (!sharedImportModeSelect) {
    return Array.isArray(sharedRules) && sharedRules.length > 0;
  }
  const hasRules = Array.isArray(sharedRules) && sharedRules.length > 0;
  const options = Array.from(sharedImportModeSelect.options || []);
  options.forEach(option => {
    if (option.value === 'none') {
      option.disabled = false;
      option.selected = !hasRules;
    } else {
      option.disabled = !hasRules;
      option.selected = hasRules && option.value === 'project';
    }
  });
  return hasRules;
}

function sharedImportRulesDiffer(sharedRules) {
  if (!Array.isArray(sharedRules) || !sharedRules.length) return false;
  if (typeof getAutoGearRules !== 'function') return true;
  try {
    const currentRules = getAutoGearRules();
    return stableStringify(sharedRules) !== stableStringify(currentRules || []);
  } catch (error) {
    console.warn('Failed to compare automatic gear rules', error);
    return true;
  }
}

function applyStoredSharedImport() {
  if (lastSharedSetupData === null) return;
  reapplySharedImportSelection();
}

function finalizeSharedImportPrompt() {
  sharedImportPromptActive = false;
  if (sharedImportDialog) closeDialog(sharedImportDialog);
}

function openSharedImportPrompt() {
  if (!sharedImportDialog) return;
  sharedImportPromptActive = true;
  openDialog(sharedImportDialog);
  const focusTarget = sharedImportModeSelect || sharedImportConfirmBtn || sharedImportCancelBtn;
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
  }
}

function processSharedProjectData(data) {
  try {
    sharedImportPromptActive = false;
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    const sharedRules = Array.isArray(parsed.autoGearRules) ? parsed.autoGearRules : null;
    storeSharedImportData(parsed, sharedRules);
    const hasRules = configureSharedImportOptions(sharedRules);
    const shouldPrompt = hasRules && sharedImportRulesDiffer(sharedRules) && !!sharedImportDialog;
    if (shouldPrompt) {
      openSharedImportPrompt();
      return;
    }
    applyStoredSharedImport();
  } catch (error) {
    clearStoredSharedImportData();
    console.error('Failed to parse shared project', error);
    alert(texts[currentLang].invalidSharedLink);
  }
}

function readSharedProjectFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    processSharedProjectData(reader.result);
  };
  reader.onerror = () => {
    console.error('Failed to load shared project file', reader.error);
    clearStoredSharedImportData();
    alert(texts[currentLang].invalidSharedLink);
  };
  reader.readAsText(file);
}

function reapplySharedImportSelection() {
  if (lastSharedSetupData === null) return;
  const storedData = cloneSharedImportValue(lastSharedSetupData);
  if (!storedData) return;
  const storedRules = cloneSharedImportValue(lastSharedAutoGearRules);
  const mode = resolveSharedImportMode(storedRules);
  applySharedSetup(storedData, {
    autoGearMode: mode,
    sharedAutoGearRules: storedRules,
  });
  updateCalculations();
}

function resolveSharedImportMode(sharedRules) {
  const hasRules = Array.isArray(sharedRules) && sharedRules.length > 0;
  if (!sharedImportModeSelect) {
    return hasRules ? 'project' : 'none';
  }
  const selectedValues = Array.from(sharedImportModeSelect.selectedOptions || [])
    .map(option => option.value)
    .filter(value => value === 'none' || value === 'project' || value === 'global');
  if (!hasRules) {
    return 'none';
  }
  let modes = Array.from(new Set(selectedValues));
  if (!modes.length) {
    return 'project';
  }
  if (modes.length > 1 && modes.includes('none')) {
    modes = modes.filter(value => value !== 'none');
  }
  if (!modes.length) {
    return 'project';
  }
  if (modes.length === 1) {
    return modes[0];
  }
  return modes;
}

function encodeSharedSetup(setup) {
  const out = {};
  Object.keys(sharedKeyMap).forEach(key => {
    if (setup[key] != null) out[sharedKeyMap[key]] = setup[key];
  });
  return out;
}

function decodeSharedSetup(setup) {
  if (setup.setupName || setup.camera) return setup;
  const out = {};
  Object.keys(sharedKeyMap).forEach(key => {
    const short = sharedKeyMap[key];
    if (setup[short] != null) out[key] = setup[short];
  });
  return out;
}
const deviceManagerSection = document.getElementById("device-manager");
const toggleDeviceBtn = document.getElementById("toggleDeviceManager");
const deviceListContainer = document.getElementById("deviceListContainer");
const deviceManagerLists = new Map();
const deviceManagerPreferredOrder = [
  "cameras",
  "viewfinders",
  "monitors",
  "video",
  "wirelessReceivers",
  "directorMonitors",
  "iosVideo",
  "lenses",
  "fiz.motors",
  "fiz.controllers",
  "fiz.handUnits",
  "fiz.distance",
  "batteries",
  "batteryHotswaps",
  "accessories.batteries",
  "accessories.powerPlates",
  "accessories.cables",
  "accessories.cages",
  "accessories.cameraSupport",
  "accessories.cameraStabiliser",
  "accessories.chargers",
  "accessories.videoAssist",
  "accessories.media",
  "accessories.filters",
  "accessories.matteboxes",
  "accessories.rigging",
  "accessories.grip",
  "accessories.sliders",
  "accessories.tripodHeads",
  "accessories.tripods",
  "accessories.carts"
];

function normalizeCategoryKey(key) {
  if (!key) return null;
  if (key === "accessories" || key === "fiz" || key === "filterOptions") return null;
  if (key.startsWith("accessories.cables.")) return "accessories.cables";
  if (key === "videoAssist" && devices?.accessories?.videoAssist) return "accessories.videoAssist";
  if (key === "media" && devices?.accessories?.media) return "accessories.media";
  return key;
}

function getCategoryLabel(categoryKey, lang = currentLang) {
  if (!categoryKey) return "";
  const langNames = (typeof categoryNames === "object" && categoryNames && categoryNames[lang]) || {};
  if (langNames[categoryKey]) return langNames[categoryKey];
  const fallbackNames = (typeof categoryNames === "object" && categoryNames && categoryNames.en) || {};
  if (fallbackNames[categoryKey]) return fallbackNames[categoryKey];
  const parts = categoryKey.split('.');
  if (parts[0] === "accessories" && parts.length > 1) {
    const rest = parts.slice(1).map(part => humanizeKey(part));
    return `${humanizeKey('accessory')} ${rest.join(' ')}`.trim();
  }
  if (parts[0] === "fiz" && parts.length > 1) {
    const rest = parts.slice(1).map(part => humanizeKey(part));
    return `FIZ ${rest.join(' ')}`.trim();
  }
  return parts.map(part => humanizeKey(part)).join(' ');
}

function collectDeviceManagerCategories() {
  const categories = new Set();
  const addCategory = (key) => {
    const normalized = normalizeCategoryKey(key);
    if (!normalized) return;
    categories.add(normalized);
  };

  const traverseSchema = (node, path = []) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node.attributes)) {
      addCategory(path.join('.'));
    }
    Object.entries(node).forEach(([childKey, value]) => {
      if (childKey === 'attributes') return;
      if (value && typeof value === 'object') {
        traverseSchema(value, path.concat(childKey));
      }
    });
  };

  if (deviceSchema) {
    traverseSchema(deviceSchema, []);
  }

  const addFromData = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'accessories') {
        if (value && typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue && typeof subValue === 'object' && !Array.isArray(subValue)) {
              addCategory(`accessories.${subKey}`);
            }
          });
        }
      } else if (key === 'fiz') {
        if (value && typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue && typeof subValue === 'object' && !Array.isArray(subValue)) {
              addCategory(`fiz.${subKey}`);
            }
          });
        }
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        addCategory(key);
      }
    });
  };

  addFromData(devices);

  const sorted = Array.from(categories);
  const orderMap = new Map(deviceManagerPreferredOrder.map((key, index) => [key, index]));
  sorted.sort((a, b) => {
    const idxA = orderMap.has(a) ? orderMap.get(a) : deviceManagerPreferredOrder.length;
    const idxB = orderMap.has(b) ? orderMap.get(b) : deviceManagerPreferredOrder.length;
    if (idxA !== idxB) return idxA - idxB;
    return a.localeCompare(b);
  });
  return sorted;
}

function createDeviceCategorySection(categoryKey) {
  if (!deviceListContainer || deviceManagerLists.has(categoryKey)) return deviceManagerLists.get(categoryKey) || null;
  const section = document.createElement('div');
  section.className = 'device-category';
  const sanitizedId = categoryKey.replace(/[^a-z0-9]+/gi, '_');
  const heading = document.createElement('h4');
  heading.id = `category_${sanitizedId}`;
  heading.dataset.categoryKey = categoryKey;
  section.appendChild(heading);
  const filterInput = document.createElement('input');
  filterInput.type = 'search';
  filterInput.className = 'list-filter';
  filterInput.id = `${sanitizedId}ListFilter`;
  filterInput.dataset.categoryKey = categoryKey;
  section.appendChild(filterInput);
  const list = document.createElement('ul');
  list.className = 'device-ul';
  const listId = sanitizedId === 'cameras' ? 'cameraList' : `${sanitizedId}List`;
  list.id = listId;
  if (sanitizedId === 'cameras') {
    list.setAttribute('data-current-id', 'camerasList');
  }
  section.appendChild(list);
  deviceListContainer.appendChild(section);
  bindFilterInput(filterInput, () => filterDeviceList(list, filterInput.value));
  const entry = { section, heading, filterInput, list, sanitizedId };
  deviceManagerLists.set(categoryKey, entry);
  return entry;
}

function updateDeviceManagerLocalization(lang = currentLang) {
  if (!deviceManagerLists.size) return;
  const placeholderTemplate = (texts[lang] && texts[lang].placeholder_filter) || 'Filter {item}...';
  const clearLabel = (texts[lang] && texts[lang].clearFilter) || 'Clear filter';
  deviceManagerLists.forEach((entry, categoryKey) => {
    const label = getCategoryLabel(categoryKey, lang);
    if (entry.heading) {
      entry.heading.textContent = label;
    }
    if (entry.filterInput) {
      const placeholder = placeholderTemplate.replace('{item}', label.toLowerCase());
      entry.filterInput.placeholder = placeholder;
      entry.filterInput.setAttribute('aria-label', placeholder);
      entry.filterInput.setAttribute('autocomplete', 'off');
      entry.filterInput.setAttribute('autocorrect', 'off');
      entry.filterInput.setAttribute('autocapitalize', 'off');
      entry.filterInput.setAttribute('spellcheck', 'false');
      entry.filterInput.setAttribute('inputmode', 'search');
      const clearBtn = entry.filterInput.nextElementSibling;
      if (clearBtn && clearBtn.classList.contains('clear-input-btn')) {
        clearBtn.setAttribute('aria-label', clearLabel);
        clearBtn.title = clearLabel;
      }
    }
  });
}

function syncDeviceManagerCategories() {
  if (!deviceListContainer) return;
  const categories = collectDeviceManagerCategories();
  const desiredSet = new Set(categories);
  const existingKeys = Array.from(deviceManagerLists.keys());
  categories.forEach(categoryKey => {
    if (!deviceManagerLists.has(categoryKey)) {
      createDeviceCategorySection(categoryKey);
    }
  });
  existingKeys.forEach(categoryKey => {
    if (!desiredSet.has(categoryKey)) {
      const entry = deviceManagerLists.get(categoryKey);
      if (entry && entry.section && entry.section.parentNode) {
        entry.section.parentNode.removeChild(entry.section);
      }
      deviceManagerLists.delete(categoryKey);
    }
  });
  categories.forEach(categoryKey => {
    const entry = deviceManagerLists.get(categoryKey);
    if (entry && entry.section) {
      deviceListContainer.appendChild(entry.section);
    }
  });
  updateDeviceManagerLocalization(currentLang);
}
function getCurrentProjectName() {
  const typedName =
    (setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value.trim()
      : '') || '';
  if (typedName) {
    return typedName;
  }
  return (setupSelect && setupSelect.value) || '';
}

function getCurrentProjectStorageKey(options = {}) {
  const typedName =
    setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value.trim()
      : '';
  const selectedName =
    setupSelect && typeof setupSelect.value === 'string'
      ? setupSelect.value.trim()
      : '';

  if (options.allowTyped && typedName) {
    return typedName;
  }

  if (selectedName) {
    return selectedName;
  }

  if (!setupSelect) {
    return '';
  }

  if (
    typedName &&
    Array.from((setupSelect && setupSelect.options) || []).some(
      option => option && option.value === typedName
    )
  ) {
    return typedName;
  }

  return '';
}
const newCategorySelect  = document.getElementById("newCategory");
const newSubcategorySelect = document.getElementById("newSubcategory");
const subcategoryFieldDiv = document.getElementById("subcategoryField");
const newNameInput    = document.getElementById("newName");
const newWattInput    = document.getElementById("newWatt");
const wattFieldDiv    = document.getElementById("wattField");
const dynamicFieldsDiv = document.getElementById("dynamicFields");
const cameraFieldsDiv = document.getElementById("cameraFields");
const cameraWattInput = document.getElementById("cameraWatt");
const cameraVoltageInput = document.getElementById("cameraVoltage");
const cameraPortTypeInput = document.getElementById("cameraPortType");
const monitorFieldsDiv = document.getElementById("monitorFields");
const monitorScreenSizeInput = document.getElementById("monitorScreenSize");
const monitorBrightnessInput = document.getElementById("monitorBrightness");
const monitorWattInput = document.getElementById("monitorWatt");
const monitorVoltageInput = document.getElementById("monitorVoltage");
const monitorPortTypeInput = document.getElementById("monitorPortType");
const monitorVideoInputsContainer = document.getElementById("monitorVideoInputsContainer");

function populateCategoryOptions() {
  if (!newCategorySelect) return;
  newCategorySelect.innerHTML = '';
  const addOpt = (val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = getCategoryLabel(val, currentLang);
    newCategorySelect.appendChild(opt);
  };

  // Add categories from schema when available
  if (deviceSchema) {
    if (deviceSchema.accessories) {
      for (const [sub, obj] of Object.entries(deviceSchema.accessories)) {
        if (sub === 'cables') {
          addOpt('accessories.cables');
        } else if (obj && obj.attributes) {
          addOpt(`accessories.${sub}`);
        }
      }
    }
    for (const [key, obj] of Object.entries(deviceSchema)) {
      if (key === 'accessories' || key === 'fiz') continue;
      if (obj && obj.attributes) addOpt(key);
    }
    if (deviceSchema.fiz) {
      for (const [sub, obj] of Object.entries(deviceSchema.fiz)) {
        if (obj && obj.attributes) addOpt(`fiz.${sub}`);
      }
    }
  }

  // Include any categories present in the device database that were not in the schema
  if (typeof devices === 'object') {
    const existing = new Set(Array.from(newCategorySelect.options).map(o => o.value));
    const addIfMissing = (val) => { if (!existing.has(val)) { addOpt(val); existing.add(val); } };
    for (const [key, obj] of Object.entries(devices)) {
      if (key === 'accessories') {
        for (const sub of Object.keys(obj || {})) {
          addIfMissing(`accessories.${sub}`);
        }
      } else if (key === 'fiz') {
        for (const sub of Object.keys(obj || {})) {
          addIfMissing(`fiz.${sub}`);
        }
      } else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        addIfMissing(key);
      }
    }
  }

  syncDeviceManagerCategories();
}

populateCategoryOptions();

function getCategoryContainer(categoryKey, subcategory, { create = false } = {}) {
  if (!categoryKey) {
    return null;
  }
  if (categoryKey === 'accessories.cables') {
    if (!subcategory) {
      return null;
    }
    if (!devices.accessories) {
      if (!create) return null;
      devices.accessories = {};
    }
    if (!devices.accessories.cables) {
      if (!create) return null;
      devices.accessories.cables = {};
    }
    if (!devices.accessories.cables[subcategory]) {
      if (!create) return null;
      devices.accessories.cables[subcategory] = {};
    }
    return devices.accessories.cables[subcategory];
  }

  if (categoryKey.includes('.')) {
    const [mainCat, subCat] = categoryKey.split('.');
    if (!devices[mainCat]) {
      if (!create) return null;
      devices[mainCat] = {};
    }
    if (!devices[mainCat][subCat]) {
      if (!create) return null;
      devices[mainCat][subCat] = {};
    }
    return devices[mainCat][subCat];
  }

  if (!devices[categoryKey]) {
    if (!create) return null;
    devices[categoryKey] = {};
  }
  return devices[categoryKey];
}

function removeOriginalDeviceEntry(originalCategory, originalSubcategory, originalName, newCategory, newSubcategory, newName) {
  if (!originalCategory || !originalName) {
    return;
  }
  const movedCategory = originalCategory !== newCategory;
  const movedSubcategory =
    originalCategory === 'accessories.cables' && originalSubcategory !== newSubcategory;
  const renamed = originalName !== newName;
  if (!movedCategory && !movedSubcategory && !renamed) {
    return;
  }

  const container = getCategoryContainer(
    originalCategory,
    originalCategory === 'accessories.cables' ? originalSubcategory : null,
    { create: false }
  );
  if (!container || !Object.prototype.hasOwnProperty.call(container, originalName)) {
    return;
  }
  delete container[originalName];
  if (
    originalCategory === 'accessories.cables' &&
    devices.accessories?.cables &&
    container &&
    originalSubcategory &&
    !Object.keys(container).length
  ) {
    delete devices.accessories.cables[originalSubcategory];
  }
}
const monitorVideoOutputsContainer = document.getElementById("monitorVideoOutputsContainer");
const monitorWirelessTxInput = document.getElementById("monitorWirelessTx");
const monitorLatencyInput = document.getElementById("monitorLatency");
const monitorAudioOutputInput = document.getElementById("monitorAudioOutput");
const viewfinderFieldsDiv = document.getElementById("viewfinderFields");
const viewfinderScreenSizeInput = document.getElementById("viewfinderScreenSize");
const viewfinderBrightnessInput = document.getElementById("viewfinderBrightness");
const viewfinderWattInput = document.getElementById("viewfinderWatt");
const viewfinderVoltageInput = document.getElementById("viewfinderVoltage");
const viewfinderPortTypeInput = document.getElementById("viewfinderPortType");
const viewfinderVideoInputsContainer = document.getElementById("viewfinderVideoInputsContainer");
const viewfinderVideoOutputsContainer = document.getElementById("viewfinderVideoOutputsContainer");
const viewfinderWirelessTxInput = document.getElementById("viewfinderWirelessTx");
const viewfinderLatencyInput = document.getElementById("viewfinderLatency");
const videoFieldsDiv = document.getElementById("videoFields");
const videoPowerInput = document.getElementById("videoPower");
const videoVideoInputsContainer = document.getElementById("videoVideoInputsContainer");
const videoVideoOutputsContainer = document.getElementById("videoVideoOutputsContainer");
const videoFrequencyInput = document.getElementById("videoFrequency");
const videoLatencyInput = document.getElementById("videoLatency");

function showFormSection(section) {
  if (!section) return;
  section.classList.remove('hidden');
  if (typeof section.removeAttribute === 'function') {
    section.removeAttribute('hidden');
  }
  section.hidden = false;
  section.style.display = '';
}

function hideFormSection(section) {
  if (!section) return;
  section.classList.add('hidden');
  if (typeof section.setAttribute === 'function') {
    section.setAttribute('hidden', '');
  }
  section.hidden = true;
  section.style.display = 'none';
}
const addDeviceForm = wattFieldDiv ? wattFieldDiv.parentNode : null;
function placeWattField(category, data) {
  if (!wattFieldDiv || !addDeviceForm) return;
  const isVideoLike =
    category === "video" ||
    category === "wirelessReceivers" ||
    category === "iosVideo" ||
    (data && (data.videoInputs || data.videoOutputs || data.frequency));
  if (isVideoLike) {
    videoFieldsDiv.insertBefore(wattFieldDiv, videoFieldsDiv.firstChild);
  } else {
    addDeviceForm.insertBefore(wattFieldDiv, cameraFieldsDiv);
  }
}
const motorFieldsDiv = document.getElementById("motorFields");
const motorConnectorInput = document.getElementById("motorConnector");
const motorInternalInput = document.getElementById("motorInternal");
const motorTorqueInput = document.getElementById("motorTorque");
const motorGearInput = document.getElementById("motorGearTypes");
const motorNotesInput = document.getElementById("motorNotes");
const controllerFieldsDiv = document.getElementById("controllerFields");
const controllerConnectorInput = document.getElementById("controllerConnector");
const controllerPowerInput = document.getElementById("controllerPower");
const controllerBatteryInput = document.getElementById("controllerBattery");
const controllerConnectivityInput = document.getElementById("controllerConnectivity");
const controllerNotesInput = document.getElementById("controllerNotes");
const distanceFieldsDiv = document.getElementById("distanceFields");
const distanceConnectionInput = document.getElementById("distanceConnection");
const distanceMethodInput = document.getElementById("distanceMethod");
const distanceRangeInput = document.getElementById("distanceRange");
const distanceAccuracyInput = document.getElementById("distanceAccuracy");
const distanceOutputInput = document.getElementById("distanceOutput");
const distanceNotesInput = document.getElementById("distanceNotes");
const batteryPlatesContainer = document.getElementById("batteryPlatesContainer");
const cameraMediaContainer = document.getElementById("cameraMediaContainer");
const lensMountContainer = document.getElementById("lensMountContainer");
const powerDistContainer = document.getElementById("powerDistContainer");
const videoOutputsContainer = document.getElementById("videoOutputsContainer");
const fizConnectorContainer = document.getElementById("fizConnectorContainer");
const viewfinderContainer = document.getElementById("viewfinderContainer");
const timecodeContainer = document.getElementById("timecodeContainer");
const batteryFieldsDiv = document.getElementById("batteryFields");
const batteryPlateRow = document.getElementById("batteryPlateRow");
const batteryPlateSelect = document.getElementById("batteryPlateSelect");
const newCapacityInput = document.getElementById("newCapacity");
const newPinAInput    = document.getElementById("newPinA");
const newDtapAInput   = document.getElementById("newDtapA");
const dtapRow         = newDtapAInput ? newDtapAInput.parentElement : null;
const addDeviceBtn    = document.getElementById("addDeviceBtn");
const cancelEditBtn  = document.getElementById("cancelEditBtn");
const exportBtn       = document.getElementById("exportDataBtn");
const exportOutput    = document.getElementById("exportOutput");
const importFileInput = document.getElementById("importFileInput");
const importDataBtn   = document.getElementById("importDataBtn");
const skipLink       = document.getElementById("skipLink");

const categoryExcludedAttrs = {
  batteries: ["capacity", "pinA", "dtapA"],
  batteryHotswaps: ["capacity", "pinA"],
  "accessories.batteries": ["capacity", "pinA"],
  cameras: ["powerDrawWatts", "power", "recordingMedia", "lensMount", "videoOutputs", "fizConnectors", "viewfinder", "timecode"],
  monitors: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs", "audioOutput"],
  viewfinders: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs"],
  video: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  wirelessReceivers: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  iosVideo: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  "fiz.motors": ["fizConnectors", "gearTypes", "internalController", "notes", "powerDrawWatts", "torqueNm"],
  "fiz.controllers": ["batteryType", "connectivity", "fizConnectors", "internalController", "notes", "powerDrawWatts", "powerSource"],
  "fiz.distance": ["accuracy", "connectionCompatibility", "measurementMethod", "measurementRange", "notes", "outputDisplay", "powerDrawWatts"]
};

const schemaFieldConfigs = {
  '*': {
    brand: { type: 'text', placeholder: 'ARRI' },
    model: { type: 'text', placeholder: 'Mini LF' },
    notes: { type: 'textarea', rows: 3, placeholder: 'Additional notes' }
  },
  batteries: {
    mount_type: { type: 'text', placeholder: 'V-Mount' },
    pinV: { type: 'number', step: '0.1', suffix: 'V' },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  'accessories.batteries': {
    mount_type: { type: 'text', placeholder: 'V-Mount' },
    pinV: { type: 'number', step: '0.1', suffix: 'V' },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  batteryHotswaps: {
    mount_type: { type: 'text', placeholder: 'Gold Mount' },
    pinV: { type: 'number', step: '0.1', suffix: 'V' },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  cameras: {
    recordingCodecs: { type: 'list', placeholder: 'ProRes 422 HQ' },
    resolutions: { type: 'list', placeholder: '4.5K Open Gate' },
    sensorModes: { type: 'list', placeholder: 'LF Open Gate' },
    viewfinder: { type: 'json', rows: 4 },
    timecode: { type: 'json', rows: 3 },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  monitors: {
    audioInput: { type: 'text', placeholder: '3.5mm stereo' },
    audioIo: { type: 'text', placeholder: 'SDI / HDMI' },
    audioOutput: { type: 'text', placeholder: '3.5mm stereo' },
    bluetooth: { type: 'boolean' },
    latencyMs: { type: 'text', placeholder: '< 1ms' },
    wireless: { type: 'text', placeholder: 'Bolt 6' },
    wirelessRX: { type: 'boolean' },
    wirelessTx: { type: 'boolean' }
  },
  video: {
    frequency: { type: 'text', placeholder: '5 GHz' },
    latencyMs: { type: 'text', placeholder: '1 ms' }
  },
  wirelessReceivers: {
    frequency: { type: 'text', placeholder: '5 GHz' },
    latencyMs: { type: 'text', placeholder: '1 ms' }
  },
  iosVideo: {
    frequency: { type: 'text', placeholder: '5 GHz' },
    latencyMs: { type: 'text', placeholder: '1 ms' }
  },
  'fiz.motors': {
    gearTypes: { type: 'list', placeholder: '0.8 MOD' },
    internalController: { type: 'boolean' }
  },
  'fiz.controllers': {
    connectivity: { type: 'text', placeholder: '2.4 GHz' },
    internalController: { type: 'boolean' }
  },
  'fiz.distance': {
    accuracy: { type: 'text', placeholder: '± 1"' }
  }
};

function formatAttributeLabel(attr) {
  return attr
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, ch => ch.toUpperCase())
    .trim();
}

function resolveSchemaFieldConfig(category, attr) {
  if (!category) return schemaFieldConfigs['*'][attr] || null;
  const parts = category.split('.');
  while (parts.length) {
    const key = parts.join('.');
    if (schemaFieldConfigs[key] && schemaFieldConfigs[key][attr]) {
      return schemaFieldConfigs[key][attr];
    }
    parts.pop();
  }
  return schemaFieldConfigs['*'][attr] || null;
}

function autoRows(text, min = 3, max = 10) {
  if (!text) return min;
  const lines = text.split('\n').length + 1;
  return Math.max(min, Math.min(max, lines));
}

function createSchemaField(category, attr, value) {
  const config = resolveSchemaFieldConfig(category, attr) || {};
  const attrId = `attr-${attr}`;
  const labelText = config.label || formatAttributeLabel(attr);
  let inputType = config.type;

  if (!inputType) {
    if (Array.isArray(value)) {
      inputType = value.every(item => typeof item === 'string') ? 'list' : 'json';
    } else if (typeof value === 'number') {
      inputType = 'number';
    } else if (typeof value === 'boolean') {
      inputType = 'boolean';
    } else if (value && typeof value === 'object') {
      inputType = 'json';
    } else {
      inputType = 'text';
    }
  }

  if (inputType === 'boolean') {
    const row = document.createElement('div');
    row.className = 'form-row schema-form-row';

    const label = document.createElement('label');
    label.setAttribute('for', attrId);
    label.textContent = labelText;
    row.appendChild(label);

    const controlContainer = document.createElement('div');
    controlContainer.className = 'schema-control schema-control--checkbox';
    const inlineWrap = document.createElement('div');
    inlineWrap.className = 'schema-control-inline';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = attrId;
    input.className = 'schema-input schema-input--checkbox';
    input.dataset.attrType = 'boolean';
    input.checked = value === undefined ? !!config.default : !!value;
    inlineWrap.appendChild(input);

    controlContainer.appendChild(inlineWrap);
    if (config.help) {
      const help = document.createElement('p');
      help.className = 'schema-field-help';
      help.textContent = config.help;
      controlContainer.appendChild(help);
    }

    row.appendChild(controlContainer);
    return row;
  }

  const row = document.createElement('div');
  row.className = 'form-row schema-form-row';
  const label = document.createElement('label');
  label.setAttribute('for', attrId);
  label.textContent = labelText;
  row.appendChild(label);

  let control;
  if (inputType === 'list' || inputType === 'json' || inputType === 'textarea') {
    control = document.createElement('textarea');
    control.className = 'schema-input schema-input--textarea';
    control.id = attrId;
    const textValue = value === undefined || value === null
      ? ''
      : inputType === 'list' && Array.isArray(value)
        ? value.join('\n')
        : typeof value === 'string'
          ? value
          : JSON.stringify(value, null, 2);
    control.value = textValue;
    control.rows = config.rows || autoRows(control.value);
  } else {
    control = document.createElement('input');
    control.className = 'schema-input';
    control.id = attrId;
    control.type = inputType === 'number' ? 'number' : 'text';
    if (inputType === 'number') {
      if (config.step) control.step = config.step;
    }
    if (value !== undefined && value !== null) {
      control.value = value;
    }
  }

  control.dataset.attrType = inputType;
  if (config.placeholder && !control.value) {
    control.placeholder = config.placeholder;
  }

  const controlContainer = document.createElement('div');
  controlContainer.className = 'schema-control';
  const inlineWrap = document.createElement('div');
  inlineWrap.className = 'schema-control-inline';
  inlineWrap.appendChild(control);
  if (config.suffix) {
    const suffix = document.createElement('span');
    suffix.className = 'schema-field-suffix';
    suffix.textContent = config.suffix;
    inlineWrap.appendChild(suffix);
  }
  controlContainer.appendChild(inlineWrap);

  if (config.help) {
    const help = document.createElement('p');
    help.className = 'schema-field-help';
    help.textContent = config.help;
    controlContainer.appendChild(help);
  }

  row.appendChild(controlContainer);

  return row;
}

function getSchemaAttributesForCategory(category) {
  if (!deviceSchema) return [];
  const parts = category.split('.');
  let node = deviceSchema;
  for (const p of parts) {
    node = node && node[p];
    if (!node) return [];
  }
  return Array.isArray(node.attributes) ? node.attributes : [];
}

function getCombinedCategoryAttributes(category, data = {}, exclude = []) {
  const seen = new Set();
  const attrs = [];
  const skip = (attr) => !attr || exclude.includes(attr) || seen.has(attr);

  for (const attr of getSchemaAttributesForCategory(category)) {
    if (skip(attr)) continue;
    seen.add(attr);
    attrs.push(attr);
  }

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const key of Object.keys(data)) {
      if (skip(key)) continue;
      seen.add(key);
      attrs.push(key);
    }
  }

  return attrs;
}

function clearDynamicFields() {
  if (!dynamicFieldsDiv) return;
  dynamicFieldsDiv.innerHTML = '';
  dynamicFieldsDiv.hidden = true;
  if (dynamicFieldsDiv.dataset) {
    delete dynamicFieldsDiv.dataset.attrs;
  }
}

function buildDynamicFields(category, data = {}, exclude = []) {
  if (!dynamicFieldsDiv) return;
  const attrs = getCombinedCategoryAttributes(category, data, exclude);
  dynamicFieldsDiv.innerHTML = '';
  if (!attrs.length) {
    dynamicFieldsDiv.hidden = true;
    if (dynamicFieldsDiv.dataset) {
      delete dynamicFieldsDiv.dataset.attrs;
    }
    return;
  }
  dynamicFieldsDiv.hidden = false;
  if (dynamicFieldsDiv.dataset) {
    dynamicFieldsDiv.dataset.attrs = JSON.stringify(attrs);
  }
  const list = document.createElement('div');
  list.className = 'schema-attribute-list';
  for (const attr of attrs) {
    const value = data && data[attr] !== undefined ? data[attr] : undefined;
    list.appendChild(createSchemaField(category, attr, value));
  }
  dynamicFieldsDiv.appendChild(list);
}

function collectDynamicFieldValues(category, exclude = []) {
  let attrs = [];
  if (dynamicFieldsDiv && dynamicFieldsDiv.dataset && dynamicFieldsDiv.dataset.attrs) {
    try {
      const parsed = JSON.parse(dynamicFieldsDiv.dataset.attrs);
      if (Array.isArray(parsed)) {
        attrs = parsed;
      }
    } catch (err) {
      console.warn('Failed to parse dynamic field attributes', err);
    }
  }
  if (!attrs.length) {
    attrs = getCombinedCategoryAttributes(category, {}, exclude);
  }
  const result = {};
  for (const attr of attrs) {
    if (exclude.includes(attr)) continue;
    const el = document.getElementById(`attr-${attr}`);
    if (el) {
      const type = el.dataset.attrType || el.type;
      if (type === 'boolean') {
        result[attr] = el.checked;
        continue;
      }
      if (type === 'list') {
        const list = el.value
          .split('\n')
          .map(item => item.trim())
          .filter(Boolean);
        if (list.length) {
          result[attr] = list;
        }
        continue;
      }
      if (type === 'json') {
        const raw = el.value.trim();
        if (raw) {
          try {
            result[attr] = JSON.parse(raw);
          } catch {
            result[attr] = raw;
          }
        }
        continue;
      }
      if (type === 'number') {
        const num = parseFloat(el.value);
        if (!isNaN(num)) {
          result[attr] = num;
        }
        continue;
      }
      if (el.value !== '') {
        result[attr] = el.value;
      }
    }
  }
  return result;
}
const languageSelect  = document.getElementById("languageSelect");
const pinkModeToggle  = document.getElementById("pinkModeToggle");
const pinkModeHelpIcon = document.getElementById("pinkModeHelpIcon");
const darkModeToggle  = document.getElementById("darkModeToggle");
const helpButton      = document.getElementById("helpButton");
const reloadButton    = document.getElementById("reloadButton");
const helpDialog      = document.getElementById("helpDialog");
const closeHelpBtn    = document.getElementById("closeHelp");
const helpSearch      = document.getElementById("helpSearch");
const helpNoResults   = document.getElementById("helpNoResults");
const helpSearchClear = document.getElementById("helpSearchClear");
const helpSectionsContainer = document.getElementById("helpSections");
const helpQuickLinksNav = document.getElementById("helpQuickLinks");
const helpQuickLinksHeading = document.getElementById("helpQuickLinksHeading");
const helpQuickLinksList = document.getElementById("helpQuickLinksList");
const installPromptBanner = document.getElementById("installPromptBanner");
const installPromptBannerText = document.getElementById("installPromptBannerText");
const installGuideDialog = document.getElementById("installGuideDialog");
const installGuideTitle = document.getElementById("installGuideTitle");
const installGuideIntro = document.getElementById("installGuideIntro");
const installGuideSteps = document.getElementById("installGuideSteps");
const installGuideNote = document.getElementById("installGuideNote");
const installGuideMigration = document.getElementById("installGuideMigration");
const installGuideMigrationTitle = document.getElementById("installGuideMigrationTitle");
const installGuideMigrationIntro = document.getElementById("installGuideMigrationIntro");
const installGuideMigrationSteps = document.getElementById("installGuideMigrationSteps");
const installGuideMigrationNote = document.getElementById("installGuideMigrationNote");
const installGuideClose = document.getElementById("installGuideClose");
const iosPwaHelpDialog = document.getElementById("iosPwaHelpDialog");
const iosPwaHelpTitle = document.getElementById("iosPwaHelpTitle");
const iosPwaHelpIntro = document.getElementById("iosPwaHelpIntro");
const iosPwaHelpStep1 = document.getElementById("iosPwaHelpStep1");
const iosPwaHelpStep2 = document.getElementById("iosPwaHelpStep2");
const iosPwaHelpStep3 = document.getElementById("iosPwaHelpStep3");

setPinkModeIconSequence(PINK_MODE_ICON_FALLBACK_MARKUP);

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  loadPinkModeIconsFromFiles().catch(() => {});
}
const iosPwaHelpStep4 = document.getElementById("iosPwaHelpStep4");
const iosPwaHelpNote = document.getElementById("iosPwaHelpNote");
const iosPwaHelpClose = document.getElementById("iosPwaHelpClose");
const hoverHelpButton = document.getElementById("hoverHelpButton");
const settingsButton  = document.getElementById("settingsButton");
const settingsDialog  = document.getElementById("settingsDialog");
if (settingsButton) {
  settingsButton.setAttribute('data-allow-hover-help', '');
}
if (settingsDialog) {
  settingsDialog.setAttribute('data-allow-hover-help', '');
}
const settingsLanguage = document.getElementById("settingsLanguage");
const settingsDarkMode = document.getElementById("settingsDarkMode");
const settingsPinkMode = document.getElementById("settingsPinkMode");
const accentColorInput = document.getElementById("accentColorInput");
const settingsFontSize = document.getElementById("settingsFontSize");
const settingsFontFamily = document.getElementById("settingsFontFamily");
const localFontsButton = document.getElementById("localFontsButton");
const localFontsInput = document.getElementById("localFontsInput");
const localFontsStatus = document.getElementById("localFontsStatus");
const localFontsGroup = document.getElementById("localFontsGroup");
const bundledFontGroup = document.getElementById("bundledFontOptions");
const settingsLogo = document.getElementById("settingsLogo");
const settingsLogoPreview = document.getElementById("settingsLogoPreview");
const autoGearHeadingElem = document.getElementById('autoGearHeading');
const autoGearDescriptionElem = document.getElementById('autoGearDescription');
const autoGearRulesList = document.getElementById('autoGearRulesList');
const autoGearPresetDescription = document.getElementById('autoGearPresetDescription');
const autoGearPresetLabel = document.getElementById('autoGearPresetLabel');
const autoGearPresetSelect = document.getElementById('autoGearPresetSelect');
const autoGearSavePresetButton = document.getElementById('autoGearSavePreset');
const autoGearDeletePresetButton = document.getElementById('autoGearDeletePreset');
const autoGearAddRuleBtn = document.getElementById('autoGearAddRule');
const autoGearResetFactoryButton = document.getElementById('autoGearResetFactory');
const autoGearEditor = document.getElementById('autoGearEditor');
const autoGearRuleNameInput = document.getElementById('autoGearRuleName');
const autoGearRuleNameLabel = document.getElementById('autoGearRuleNameLabel');
const autoGearScenariosSelect = document.getElementById('autoGearScenarios');
const autoGearScenariosLabel = document.getElementById('autoGearScenariosLabel');
const autoGearMatteboxSelect = document.getElementById('autoGearMattebox');
const autoGearMatteboxLabel = document.getElementById('autoGearMatteboxLabel');
const autoGearCameraHandleSelect = document.getElementById('autoGearCameraHandle');
const autoGearCameraHandleLabel = document.getElementById('autoGearCameraHandleLabel');
const autoGearViewfinderExtensionSelect = document.getElementById('autoGearViewfinderExtension');
const autoGearViewfinderExtensionLabel = document.getElementById('autoGearViewfinderExtensionLabel');
const autoGearVideoDistributionSelect = document.getElementById('autoGearVideoDistribution');
const autoGearVideoDistributionLabel = document.getElementById('autoGearVideoDistributionLabel');
const autoGearAddItemsHeading = document.getElementById('autoGearAddItemsHeading');
const autoGearAddItemLabel = document.getElementById('autoGearAddItemLabel');
const autoGearAddCategoryLabel = document.getElementById('autoGearAddCategoryLabel');
const autoGearAddQuantityLabel = document.getElementById('autoGearAddQuantityLabel');
const autoGearAddScreenSizeLabel = document.getElementById('autoGearAddScreenSizeLabel');
const autoGearAddSelectorTypeLabel = document.getElementById('autoGearAddSelectorTypeLabel');
const autoGearAddSelectorDefaultLabel = document.getElementById('autoGearAddSelectorDefaultLabel');
const autoGearAddSelectorIncludeLabel = document.getElementById('autoGearAddSelectorIncludeLabel');
const autoGearAddNotesLabel = document.getElementById('autoGearAddNotesLabel');
const autoGearAddNameInput = document.getElementById('autoGearAddName');
const autoGearAddCategorySelect = document.getElementById('autoGearAddCategory');
const autoGearAddQuantityInput = document.getElementById('autoGearAddQuantity');
const autoGearAddScreenSizeInput = document.getElementById('autoGearAddScreenSize');
const autoGearAddSelectorTypeSelect = document.getElementById('autoGearAddSelectorType');
const autoGearAddSelectorDefaultInput = document.getElementById('autoGearAddSelectorDefault');
const autoGearAddSelectorIncludeCheckbox = document.getElementById('autoGearAddSelectorInclude');
const autoGearAddNotesInput = document.getElementById('autoGearAddNotes');
const autoGearAddItemButton = document.getElementById('autoGearAddItemButton');
const autoGearAddList = document.getElementById('autoGearAddList');
const autoGearRemoveItemsHeading = document.getElementById('autoGearRemoveItemsHeading');
const autoGearRemoveItemLabel = document.getElementById('autoGearRemoveItemLabel');
const autoGearRemoveCategoryLabel = document.getElementById('autoGearRemoveCategoryLabel');
const autoGearRemoveQuantityLabel = document.getElementById('autoGearRemoveQuantityLabel');
const autoGearRemoveScreenSizeLabel = document.getElementById('autoGearRemoveScreenSizeLabel');
const autoGearRemoveSelectorTypeLabel = document.getElementById('autoGearRemoveSelectorTypeLabel');
const autoGearRemoveSelectorDefaultLabel = document.getElementById('autoGearRemoveSelectorDefaultLabel');
const autoGearRemoveSelectorIncludeLabel = document.getElementById('autoGearRemoveSelectorIncludeLabel');
const autoGearRemoveNotesLabel = document.getElementById('autoGearRemoveNotesLabel');
const autoGearRemoveNameInput = document.getElementById('autoGearRemoveName');
const autoGearRemoveCategorySelect = document.getElementById('autoGearRemoveCategory');
const autoGearRemoveQuantityInput = document.getElementById('autoGearRemoveQuantity');
const autoGearRemoveScreenSizeInput = document.getElementById('autoGearRemoveScreenSize');
const autoGearRemoveSelectorTypeSelect = document.getElementById('autoGearRemoveSelectorType');
const autoGearRemoveSelectorDefaultInput = document.getElementById('autoGearRemoveSelectorDefault');
const autoGearRemoveSelectorIncludeCheckbox = document.getElementById('autoGearRemoveSelectorInclude');
const autoGearRemoveNotesInput = document.getElementById('autoGearRemoveNotes');
const autoGearRemoveItemButton = document.getElementById('autoGearRemoveItemButton');
const autoGearRemoveList = document.getElementById('autoGearRemoveList');
const autoGearSaveRuleButton = document.getElementById('autoGearSaveRule');
const autoGearCancelEditButton = document.getElementById('autoGearCancelEdit');
const autoGearItemCatalog = document.getElementById('autoGearItemCatalog');
const autoGearMonitorCatalog = document.getElementById('autoGearMonitorCatalog');

const autoGearAddScreenSizeField = autoGearAddScreenSizeInput?.closest('.auto-gear-field')
  || autoGearAddScreenSizeLabel?.closest('.auto-gear-field')
  || null;
const autoGearAddSelectorTypeField = autoGearAddSelectorTypeSelect?.closest('.auto-gear-field')
  || autoGearAddSelectorTypeLabel?.closest('.auto-gear-field')
  || null;
const autoGearAddSelectorDefaultField = autoGearAddSelectorDefaultInput?.closest('.auto-gear-field')
  || autoGearAddSelectorDefaultLabel?.closest('.auto-gear-field')
  || null;
const autoGearAddSelectorIncludeField = autoGearAddSelectorIncludeCheckbox?.closest('.auto-gear-field')
  || autoGearAddSelectorIncludeLabel?.closest('.auto-gear-field')
  || null;
const autoGearRemoveScreenSizeField = autoGearRemoveScreenSizeInput?.closest('.auto-gear-field')
  || autoGearRemoveScreenSizeLabel?.closest('.auto-gear-field')
  || null;
const autoGearRemoveSelectorTypeField = autoGearRemoveSelectorTypeSelect?.closest('.auto-gear-field')
  || autoGearRemoveSelectorTypeLabel?.closest('.auto-gear-field')
  || null;
const autoGearRemoveSelectorDefaultField = autoGearRemoveSelectorDefaultInput?.closest('.auto-gear-field')
  || autoGearRemoveSelectorDefaultLabel?.closest('.auto-gear-field')
  || null;
const autoGearRemoveSelectorIncludeField = autoGearRemoveSelectorIncludeCheckbox?.closest('.auto-gear-field')
  || autoGearRemoveSelectorIncludeLabel?.closest('.auto-gear-field')
  || null;

const autoGearAddMonitorFieldGroup = {
  select: autoGearAddCategorySelect,
  screenSizeField: autoGearAddScreenSizeField,
  screenSizeInput: autoGearAddScreenSizeInput,
  selectorTypeField: autoGearAddSelectorTypeField,
  selectorTypeSelect: autoGearAddSelectorTypeSelect,
  selectorDefaultField: autoGearAddSelectorDefaultField,
  selectorDefaultInput: autoGearAddSelectorDefaultInput,
  selectorIncludeField: autoGearAddSelectorIncludeField,
  selectorIncludeCheckbox: autoGearAddSelectorIncludeCheckbox,
};

const autoGearRemoveMonitorFieldGroup = {
  select: autoGearRemoveCategorySelect,
  screenSizeField: autoGearRemoveScreenSizeField,
  screenSizeInput: autoGearRemoveScreenSizeInput,
  selectorTypeField: autoGearRemoveSelectorTypeField,
  selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
  selectorDefaultField: autoGearRemoveSelectorDefaultField,
  selectorDefaultInput: autoGearRemoveSelectorDefaultInput,
  selectorIncludeField: autoGearRemoveSelectorIncludeField,
  selectorIncludeCheckbox: autoGearRemoveSelectorIncludeCheckbox,
};

function syncAutoGearMonitorFieldVisibility() {
  updateAutoGearMonitorFieldGroup(autoGearAddMonitorFieldGroup);
  updateAutoGearMonitorFieldGroup(autoGearRemoveMonitorFieldGroup);
}
const autoGearExportButton = document.getElementById('autoGearExport');
const autoGearImportButton = document.getElementById('autoGearImport');
const autoGearImportInput = document.getElementById('autoGearImportInput');
const autoGearBackupsSection = document.getElementById('autoGearBackupsSection');
const autoGearBackupsHeading = document.getElementById('autoGearBackupsHeading');
const autoGearBackupsDescription = document.getElementById('autoGearBackupsDescription');
const autoGearBackupSelectLabel = document.getElementById('autoGearBackupSelectLabel');
const autoGearBackupSelect = document.getElementById('autoGearBackupSelect');
const autoGearBackupRestoreButton = document.getElementById('autoGearBackupRestore');
const autoGearBackupControls = document.getElementById('autoGearBackupControls');
const autoGearBackupEmptyMessage = document.getElementById('autoGearBackupEmpty');
const autoGearShowBackupsCheckbox = document.getElementById('autoGearShowBackups');
const autoGearShowBackupsLabel = document.getElementById('autoGearShowBackupsLabel');
const autoGearBackupsHiddenNotice = document.getElementById('autoGearBackupsHidden');
const dataHeading = document.getElementById("dataHeading");
const storageSummaryIntro = document.getElementById("storageSummaryIntro");
const storageSummaryList = document.getElementById("storageSummaryList");
const storageSummaryEmpty = document.getElementById("storageSummaryEmpty");
const storageSummaryFootnote = document.getElementById("storageSummaryFootnote");

let autoGearEditorDraft = null;

function cloneAutoGearDraftItem(item) {
  const normalized = normalizeAutoGearItem(item);
  if (normalized) return normalized;
  return {
    id: generateAutoGearId('item'),
    name: '',
    category: '',
    quantity: 1,
    screenSize: '',
    selectorType: 'none',
    selectorDefault: '',
    selectorEnabled: false,
    notes: '',
  };
}

function createAutoGearDraft(rule) {
  if (rule) {
    return {
      id: rule.id,
      label: rule.label || '',
      scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
      mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
      cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
      viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
      videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
      add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearDraftItem) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearDraftItem) : [],
    };
  }
  return {
    id: generateAutoGearId('rule'),
    label: '',
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    videoDistribution: [],
    add: [],
    remove: [],
  };
}

function refreshAutoGearScenarioOptions(selected) {
  if (!autoGearScenariosSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.scenarios)
        ? autoGearEditorDraft.scenarios
        : [];

  const selectedValues = Array.from(
    new Set(
      candidateValues
        .filter(value => typeof value === 'string')
        .map(value => value.trim())
        .filter(Boolean)
    )
  );

  autoGearScenariosSelect.innerHTML = '';
  autoGearScenariosSelect.multiple = true;

  const source = document.getElementById('requiredScenarios');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearScenariosSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearScenarioPlaceholder
      || texts.en?.autoGearScenarioPlaceholder
      || 'Select scenarios';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearScenariosSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearScenariosSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearScenariosSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearScenariosSelect.options || []).filter(option => !option.disabled);
  const visibleCount = selectableOptions.length
    ? Math.min(6, Math.max(selectableOptions.length, 3))
    : 1;
  autoGearScenariosSelect.size = visibleCount;
}

function refreshAutoGearMatteboxOptions(selected) {
  if (!autoGearMatteboxSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.mattebox)
        ? autoGearEditorDraft.mattebox
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearMatteboxSelect.innerHTML = '';
  autoGearMatteboxSelect.multiple = true;

  const source = document.getElementById('mattebox');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearMatteboxSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearMatteboxPlaceholder
      || texts.en?.autoGearMatteboxPlaceholder
      || 'Select mattebox options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearMatteboxSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearMatteboxSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearMatteboxSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearMatteboxSelect.options || []).filter(option => !option.disabled);
  const visibleCount = selectableOptions.length
    ? Math.min(6, Math.max(selectableOptions.length, 4))
    : 1;
  autoGearMatteboxSelect.size = visibleCount;
}

function refreshAutoGearCameraHandleOptions(selected) {
  if (!autoGearCameraHandleSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.cameraHandle)
        ? autoGearEditorDraft.cameraHandle
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearCameraHandleSelect.innerHTML = '';
  autoGearCameraHandleSelect.multiple = true;

  const source = document.getElementById('cameraHandle');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearCameraHandleSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearCameraHandlePlaceholder
      || texts.en?.autoGearCameraHandlePlaceholder
      || 'Select camera handles';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearCameraHandleSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearCameraHandleSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearCameraHandleSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearCameraHandleSelect.options || []).filter(option => !option.disabled);
  const visibleCount = selectableOptions.length
    ? Math.min(6, Math.max(selectableOptions.length, 3))
    : 1;
  autoGearCameraHandleSelect.size = visibleCount;
}

function resolveViewfinderOptionValue(option) {
  if (!option) return '';
  const raw = typeof option.value === 'string' ? option.value : '';
  return raw ? raw : '__none__';
}

function getViewfinderFallbackLabel(value) {
  if (value === '__none__') {
    return texts[currentLang]?.viewfinderExtensionNone
      || texts.en?.viewfinderExtensionNone
      || 'No';
  }
  return value;
}

function refreshAutoGearViewfinderExtensionOptions(selected) {
  if (!autoGearViewfinderExtensionSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.viewfinderExtension)
        ? autoGearEditorDraft.viewfinderExtension
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearViewfinderExtensionSelect.innerHTML = '';
  autoGearViewfinderExtensionSelect.multiple = true;

  const source = document.getElementById('viewfinderExtension');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      const option = document.createElement('option');
      const value = resolveViewfinderOptionValue(opt);
      option.value = value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(value)) {
        option.selected = true;
      }
      autoGearViewfinderExtensionSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearViewfinderExtensionPlaceholder
      || texts.en?.autoGearViewfinderExtensionPlaceholder
      || 'Select viewfinder extension options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearViewfinderExtensionSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearViewfinderExtensionSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = getViewfinderFallbackLabel(value);
        fallbackOption.selected = true;
        autoGearViewfinderExtensionSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearViewfinderExtensionSelect.options || []).filter(option => !option.disabled);
  const visibleCount = selectableOptions.length
    ? Math.min(4, Math.max(selectableOptions.length, 2))
    : 1;
  autoGearViewfinderExtensionSelect.size = visibleCount;
}

function refreshAutoGearVideoDistributionOptions(selected) {
  if (!autoGearVideoDistributionSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.videoDistribution)
        ? autoGearEditorDraft.videoDistribution
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearVideoDistributionSelect.innerHTML = '';
  autoGearVideoDistributionSelect.multiple = true;

  const source = document.getElementById('videoDistribution');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearVideoDistributionSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearVideoDistributionPlaceholder
      || texts.en?.autoGearVideoDistributionPlaceholder
      || 'Select video distribution options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearVideoDistributionSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearVideoDistributionSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearVideoDistributionSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearVideoDistributionSelect.options || []).filter(option => !option.disabled);
  const visibleCount = selectableOptions.length
    ? Math.min(8, Math.max(selectableOptions.length, 4))
    : 1;
  autoGearVideoDistributionSelect.size = visibleCount;
}

function populateAutoGearCategorySelect(select, currentValue) {
  if (!select) return;
  const current = typeof currentValue === 'string' ? currentValue : '';
  select.innerHTML = '';
  GEAR_LIST_CATEGORIES.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (current === cat) opt.selected = true;
    select.appendChild(opt);
  });
  const customOpt = document.createElement('option');
  customOpt.value = AUTO_GEAR_CUSTOM_CATEGORY;
  customOpt.textContent = texts[currentLang]?.autoGearCustomCategory
    || texts.en?.autoGearCustomCategory
    || 'Custom Additions';
  if (!current) customOpt.selected = true;
  select.appendChild(customOpt);
}

function updateAutoGearCatalogOptions() {
  if (!autoGearItemCatalog) return;
  const names = collectAutoGearCatalogNames();
  autoGearItemCatalog.innerHTML = '';
  names.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    autoGearItemCatalog.appendChild(option);
  });
  updateAutoGearMonitorCatalogOptions();
}

function formatAutoGearCount(count, singularKey, pluralKey) {
  const langTexts = texts[currentLang] || texts.en || {};
  if (count === 1) {
    const template = langTexts[singularKey] || texts.en?.[singularKey];
    return template ? template.replace('%s', '1') : '1';
  }
  const template = langTexts[pluralKey] || texts.en?.[pluralKey];
  return template ? template.replace('%s', String(count)) : String(count);
}

function formatAutoGearItemSummary(item, options = {}) {
  if (!item || typeof item !== 'object') return '';
  const normalized = normalizeAutoGearItem(item);
  if (!normalized) return '';
  const {
    quantity,
    name,
    category,
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
  } = normalized;
  const langTexts = texts[currentLang] || texts.en || {};
  const includeSign = !!options.includeSign;
  const listType = options.listType || (options.includeSign ? 'add' : '');
  const includeCategory = options.includeCategory !== false;
  const baseQuantity = normalizeAutoGearQuantity(quantity);
  const signPrefix = includeSign
    ? (listType === 'remove' ? '−' : '+')
    : '';
  const quantityText = signPrefix ? `${signPrefix}${baseQuantity}` : String(baseQuantity);
  const nameText = name || '';
  if (!nameText) return quantityText;
  const categoryLabel = category
    ? category
    : (langTexts.autoGearCustomCategory || texts.en?.autoGearCustomCategory || '');
  let summary;
  if (includeCategory && categoryLabel) {
    const withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory
      || texts.en?.autoGearItemSummaryWithCategory
      || '%s × %s (%s)';
    summary = formatWithPlaceholders(withCategoryTemplate, quantityText, nameText, categoryLabel);
  } else {
    const baseTemplate = langTexts.autoGearItemSummary
      || texts.en?.autoGearItemSummary
      || '%s × %s';
    summary = formatWithPlaceholders(baseTemplate, quantityText, nameText);
  }
  const details = [];
  if (screenSize) {
    details.push(screenSize);
  }
  if (selectorType && selectorType !== 'none') {
    const selectorLabel = getAutoGearSelectorLabel(selectorType);
    const formattedDefault = selectorDefault ? addArriKNumber(selectorDefault) : '';
    if (selectorEnabled) {
      const selectorTemplate = formattedDefault
        ? (langTexts.autoGearSelectorSummaryWithDefault
          || texts.en?.autoGearSelectorSummaryWithDefault
          || '%s selector (default: %s)')
        : (langTexts.autoGearSelectorSummary
          || texts.en?.autoGearSelectorSummary
          || '%s selector');
      const selectorText = formattedDefault
        ? formatWithPlaceholders(selectorTemplate, selectorLabel, formattedDefault)
        : formatWithPlaceholders(selectorTemplate, selectorLabel);
      details.push(selectorText);
    } else if (formattedDefault) {
      const defaultTemplate = langTexts.autoGearSelectorSummaryNoSelector
        || texts.en?.autoGearSelectorSummaryNoSelector
        || '%s default: %s';
      details.push(formatWithPlaceholders(defaultTemplate, selectorLabel, formattedDefault));
    } else if (selectorLabel) {
      details.push(selectorLabel);
    }
  }
  if (notes) {
    details.push(notes);
  }
  if (details.length) {
    summary += ` – ${details.join(' – ')}`;
  }
  return summary;
}

function formatWithPlaceholders(template, ...values) {
  if (typeof template !== 'string') {
    return values.join(' ');
  }
  return values.reduce((acc, value) => acc.replace('%s', value), template);
}

function formatAutoGearRuleCount(count) {
  const langTexts = texts[currentLang] || texts.en || {};
  if (count === 1) {
    const template = langTexts.autoGearRulesCountOne || texts.en?.autoGearRulesCountOne;
    return template ? template.replace('%s', '1') : '1';
  }
  const template = langTexts.autoGearRulesCountOther || texts.en?.autoGearRulesCountOther;
  return template ? template.replace('%s', String(count)) : String(count);
}

function formatAutoGearBackupTime(isoString) {
  if (typeof isoString !== 'string') return '';
  const date = new Date(isoString);
  if (Number.isNaN(date.valueOf())) return isoString;
  if (autoGearBackupDateFormatter) {
    try {
      return autoGearBackupDateFormatter.format(date);
    } catch (error) {
      console.warn('Failed to format automatic gear backup timestamp', error);
    }
  }
  if (typeof date.toLocaleString === 'function') {
    return date.toLocaleString();
  }
  return date.toISOString();
}

function formatAutoGearBackupMeta(backup) {
  if (!backup) return '';
  const langTexts = texts[currentLang] || texts.en || {};
  const timeLabel = formatAutoGearBackupTime(backup.createdAt);
  const ruleCount = Array.isArray(backup.rules) ? backup.rules.length : 0;
  const rulesLabel = ruleCount === 0
    ? (langTexts.autoGearBackupClearsRules
        || texts.en?.autoGearBackupClearsRules
        || 'Clears all rules')
    : formatAutoGearRuleCount(ruleCount);
  const template = langTexts.autoGearBackupMeta || texts.en?.autoGearBackupMeta;
  if (template && template.includes('%s')) {
    return formatWithPlaceholders(template, timeLabel, rulesLabel);
  }
  return `${timeLabel} · ${rulesLabel}`;
}

function getAutoGearBackupSelectPlaceholder() {
  return texts[currentLang]?.autoGearBackupSelectPlaceholder
    || texts.en?.autoGearBackupSelectPlaceholder
    || 'Select a backup to restore';
}

function updateAutoGearBackupRestoreButtonState() {
  if (!autoGearBackupRestoreButton) return;
  const hasSelection = Boolean(autoGearBackupSelect && autoGearBackupSelect.value);
  autoGearBackupRestoreButton.disabled = !hasSelection;
}

function getAutoGearPresetById(presetId) {
  if (!presetId) return null;
  return autoGearPresets.find(preset => preset.id === presetId) || null;
}

function getAutoGearAutoPresetLabel() {
  const langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearAutoPresetLabel
    || texts.en?.autoGearAutoPresetLabel
    || 'Autosaved rules';
}

function setAutoGearAutoPresetId(presetId, options = {}) {
  const normalized = typeof presetId === 'string' ? presetId : '';
  const persist = options.persist !== false;
  const skipRender = options.skipRender === true;
  if (autoGearAutoPresetId === normalized) {
    if (!skipRender) renderAutoGearPresetsControls();
    return;
  }
  autoGearAutoPresetId = normalized;
  if (persist) {
    persistAutoGearAutoPresetId(autoGearAutoPresetId);
  }
  if (!skipRender) {
    renderAutoGearPresetsControls();
  }
}

function reconcileAutoGearAutoPresetState(options = {}) {
  if (!autoGearAutoPresetId) {
    if (options.persist !== false) {
      persistAutoGearAutoPresetId('');
    }
    return false;
  }
  const managedExists = autoGearPresets.some(preset => preset.id === autoGearAutoPresetId);
  const otherExists = autoGearPresets.some(preset => preset.id !== autoGearAutoPresetId);
  if (!managedExists || otherExists) {
    setAutoGearAutoPresetId('', {
      persist: options.persist !== false,
      skipRender: options.skipRender === true,
    });
    return true;
  }
  return false;
}

function syncAutoGearAutoPreset(rules) {
  const normalizedRules = Array.isArray(rules) ? rules : [];
  reconcileAutoGearAutoPresetState({ persist: true, skipRender: true });
  if (!autoGearAutoPresetId) {
    if (autoGearPresets.length > 0) {
      return false;
    }
    const label = getAutoGearAutoPresetLabel();
    const normalizedPreset = normalizeAutoGearPreset({
      id: generateAutoGearId('preset'),
      label,
      rules: normalizedRules,
    });
    if (!normalizedPreset) {
      return false;
    }
    autoGearPresets.push(normalizedPreset);
    autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
    persistAutoGearPresets(autoGearPresets);
    setAutoGearAutoPresetId(normalizedPreset.id, { persist: true, skipRender: true });
    setActiveAutoGearPresetId(normalizedPreset.id, { persist: true, skipRender: true });
    return true;
  }
  const managedIndex = autoGearPresets.findIndex(preset => preset.id === autoGearAutoPresetId);
  if (managedIndex === -1) {
    setAutoGearAutoPresetId('', { persist: true, skipRender: true });
    return false;
  }
  if (autoGearPresets.length > 1) {
    setAutoGearAutoPresetId('', { persist: true, skipRender: true });
    return false;
  }
  const managedPreset = autoGearPresets[managedIndex];
  const updatedPreset = normalizeAutoGearPreset({
    id: managedPreset.id,
    label: managedPreset.label,
    rules: normalizedRules,
  });
  if (!updatedPreset) {
    autoGearPresets.splice(managedIndex, 1);
    autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
    persistAutoGearPresets(autoGearPresets);
    setAutoGearAutoPresetId('', { persist: true, skipRender: true });
    setActiveAutoGearPresetId('', { persist: true, skipRender: true });
    return true;
  }
  if (managedPreset.fingerprint !== updatedPreset.fingerprint) {
    autoGearPresets[managedIndex] = updatedPreset;
    autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
    persistAutoGearPresets(autoGearPresets);
  }
  setActiveAutoGearPresetId(updatedPreset.id, { persist: true, skipRender: true });
  return managedPreset.fingerprint !== updatedPreset.fingerprint;
}

function setActiveAutoGearPresetId(presetId, options = {}) {
  const normalized = typeof presetId === 'string' ? presetId : '';
  const persist = options.persist !== false;
  const skipRender = options.skipRender === true;
  if (activeAutoGearPresetId === normalized) {
    if (!skipRender) renderAutoGearPresetsControls();
    return;
  }
  activeAutoGearPresetId = normalized;
  if (persist) {
    persistActiveAutoGearPresetId(activeAutoGearPresetId);
  }
  if (!skipRender) {
    renderAutoGearPresetsControls();
  }
}

function alignActiveAutoGearPreset(options = {}) {
  const skipRender = options.skipRender === true;
  const fingerprint = createAutoGearRulesFingerprint(baseAutoGearRules);
  const matching = autoGearPresets.find(preset => preset.fingerprint === fingerprint) || null;
  if (matching) {
    setActiveAutoGearPresetId(matching.id, { persist: true, skipRender: true });
  } else if (activeAutoGearPresetId) {
    setActiveAutoGearPresetId('', { persist: true, skipRender: true });
  }
  if (!skipRender) {
    renderAutoGearPresetsControls();
  }
}

function renderAutoGearPresetsControls() {
  if (!autoGearPresetSelect) return;
  const placeholderText = texts[currentLang]?.autoGearPresetPlaceholder
    || texts.en?.autoGearPresetPlaceholder
    || 'Custom rules';
  const presets = sortAutoGearPresets(autoGearPresets.slice());
  autoGearPresets = presets;

  autoGearPresetSelect.innerHTML = '';

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = placeholderText;
  autoGearPresetSelect.appendChild(placeholderOption);

  presets.forEach(preset => {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = preset.label;
    autoGearPresetSelect.appendChild(option);
  });

  const targetValue = activeAutoGearPresetId || '';
  autoGearPresetSelect.value = targetValue;
  if (!targetValue) {
    placeholderOption.selected = true;
  }

  autoGearPresetSelect.disabled = presets.length === 0;
  autoGearPresetSelect.setAttribute('aria-disabled', presets.length === 0 ? 'true' : 'false');

  if (autoGearDeletePresetButton) {
    autoGearDeletePresetButton.disabled = !activeAutoGearPresetId;
  }

}

function applyAutoGearBackupVisibility() {
  const show = !!autoGearBackupsVisible;
  if (autoGearShowBackupsCheckbox) {
    autoGearShowBackupsCheckbox.checked = show;
    autoGearShowBackupsCheckbox.setAttribute('aria-pressed', show ? 'true' : 'false');
  }
  if (autoGearBackupsSection) {
    autoGearBackupsSection.classList.toggle('auto-gear-backups-collapsed', !show);
    autoGearBackupsSection.setAttribute('aria-expanded', show ? 'true' : 'false');
  }
  if (autoGearBackupControls) {
    autoGearBackupControls.hidden = !show;
    autoGearBackupControls.setAttribute('aria-hidden', show ? 'false' : 'true');
  }
  if (autoGearBackupsHiddenNotice) {
    autoGearBackupsHiddenNotice.hidden = show;
  }
  if (!show) {
    if (autoGearBackupSelect) autoGearBackupSelect.disabled = true;
    if (autoGearBackupRestoreButton) autoGearBackupRestoreButton.disabled = true;
  } else {
    updateAutoGearBackupRestoreButtonState();
  }
}

function setAutoGearBackupsVisible(show) {
  const next = !!show;
  if (autoGearBackupsVisible === next) {
    applyAutoGearBackupVisibility();
    return;
  }
  autoGearBackupsVisible = next;
  persistAutoGearBackupVisibility(autoGearBackupsVisible);
  if (autoGearBackupsVisible) {
    renderAutoGearBackupControls();
  } else {
    applyAutoGearBackupVisibility();
  }
}

function handleAutoGearPresetSelection(event) {
  if (!event || !autoGearPresetSelect) return;
  if (sharedImportProjectPresetActive) {
    sharedImportProjectPresetActive = false;
    sharedImportPreviousPresetId = '';
  }
  const presetId = event.target.value;
  if (!presetId) {
    setActiveAutoGearPresetId('', { persist: true });
    return;
  }
  const preset = getAutoGearPresetById(presetId);
  if (!preset) {
    setActiveAutoGearPresetId('', { persist: true });
    renderAutoGearPresetsControls();
    return;
  }
  const confirmTemplate = texts[currentLang]?.autoGearPresetApplyConfirm
    || texts.en?.autoGearPresetApplyConfirm
    || `Replace your automatic gear rules with the preset "${preset.label}"?`;
  const confirmMessage = confirmTemplate.includes('%s')
    ? formatWithPlaceholders(confirmTemplate, preset.label)
    : confirmTemplate;
  let confirmed = true;
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    confirmed = window.confirm(confirmMessage);
  }
  if (!confirmed) {
    autoGearPresetSelect.value = activeAutoGearPresetId || '';
    return;
  }
  setAutoGearRules(preset.rules);
  updateAutoGearCatalogOptions();
  renderAutoGearRulesList();
  const appliedMessage = texts[currentLang]?.autoGearPresetApplied
    || texts.en?.autoGearPresetApplied
    || 'Preset applied.';
  showNotification('success', appliedMessage);
}

function handleAutoGearSavePreset() {
  const rules = getAutoGearRules();
  const activePreset = getAutoGearPresetById(activeAutoGearPresetId);
  const promptTemplate = texts[currentLang]?.autoGearPresetNamePrompt
    || texts.en?.autoGearPresetNamePrompt
    || 'Name this preset';
  const defaultName = activePreset ? activePreset.label : '';
  if (typeof window === 'undefined' || typeof window.prompt !== 'function') {
    const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
      || texts.en?.autoGearPresetNameRequired
      || 'Enter a preset name to continue.';
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(requiredMessage);
    }
    return;
  }
  const response = window.prompt(promptTemplate, defaultName);
  if (response === null) return;
  const trimmed = response.trim();
  if (!trimmed) {
    const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
      || texts.en?.autoGearPresetNameRequired
      || 'Enter a preset name to continue.';
    if (typeof window.alert === 'function') {
      window.alert(requiredMessage);
    }
    return;
  }
  const normalizedName = trimmed;
  const existingByName = autoGearPresets.find(preset => preset.label.toLowerCase() === normalizedName.toLowerCase());
  let targetId = activePreset?.id || '';
  if (existingByName && existingByName.id !== targetId) {
    const overwriteTemplate = texts[currentLang]?.autoGearPresetOverwriteConfirm
      || texts.en?.autoGearPresetOverwriteConfirm
      || `Replace the existing preset "${normalizedName}"?`;
    const overwriteMessage = overwriteTemplate.includes('%s')
      ? formatWithPlaceholders(overwriteTemplate, normalizedName)
      : overwriteTemplate;
    let overwriteConfirmed = true;
    if (typeof window.confirm === 'function') {
      overwriteConfirmed = window.confirm(overwriteMessage);
    }
    if (!overwriteConfirmed) {
      return;
    }
    targetId = existingByName.id;
  }
  const presetId = targetId || generateAutoGearId('preset');
  const normalizedPreset = normalizeAutoGearPreset({ id: presetId, label: normalizedName, rules });
  if (!normalizedPreset) {
    const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
      || texts.en?.autoGearPresetNameRequired
      || 'Enter a preset name to continue.';
    if (typeof window.alert === 'function') {
      window.alert(requiredMessage);
    }
    return;
  }
  if (autoGearAutoPresetId) {
    setAutoGearAutoPresetId('', { persist: true, skipRender: true });
  }
  const existingIndex = autoGearPresets.findIndex(preset => preset.id === normalizedPreset.id);
  if (existingIndex >= 0) {
    autoGearPresets[existingIndex] = normalizedPreset;
  } else {
    autoGearPresets.push(normalizedPreset);
  }
  autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
  persistAutoGearPresets(autoGearPresets);
  setActiveAutoGearPresetId(normalizedPreset.id, { persist: true, skipRender: true });
  renderAutoGearPresetsControls();
  const savedMessage = texts[currentLang]?.autoGearPresetSaved
    || texts.en?.autoGearPresetSaved
    || 'Automatic gear preset saved.';
  showNotification('success', savedMessage);
}

function handleAutoGearDeletePreset() {
  if (!activeAutoGearPresetId) return;
  const preset = getAutoGearPresetById(activeAutoGearPresetId);
  const label = preset ? preset.label : '';
  const confirmTemplate = texts[currentLang]?.autoGearPresetDeleteConfirm
    || texts.en?.autoGearPresetDeleteConfirm
    || 'Delete this preset?';
  const confirmMessage = label && confirmTemplate.includes('%s')
    ? formatWithPlaceholders(confirmTemplate, label)
    : confirmTemplate;
  let confirmed = true;
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    confirmed = window.confirm(confirmMessage);
  }
  if (!confirmed) return;
  if (autoGearAutoPresetId && autoGearAutoPresetId === activeAutoGearPresetId) {
    setAutoGearAutoPresetId('', { persist: true, skipRender: true });
  }
  autoGearPresets = autoGearPresets.filter(entry => entry.id !== activeAutoGearPresetId);
  autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
  persistAutoGearPresets(autoGearPresets);
  setActiveAutoGearPresetId('', { persist: true, skipRender: true });
  renderAutoGearPresetsControls();
  const deletedMessage = texts[currentLang]?.autoGearPresetDeleted
    || texts.en?.autoGearPresetDeleted
    || 'Automatic gear preset deleted.';
  showNotification('success', deletedMessage);
}

function handleAutoGearShowBackupsToggle() {
  if (!autoGearShowBackupsCheckbox) return;
  setAutoGearBackupsVisible(autoGearShowBackupsCheckbox.checked);
}

function renderAutoGearBackupControls() {
  if (!autoGearBackupSelect || !autoGearBackupEmptyMessage) return;

  const previousValue = autoGearBackupSelect.value;
  const placeholderText = getAutoGearBackupSelectPlaceholder();

  autoGearBackupSelect.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderText;
  placeholder.disabled = true;
  autoGearBackupSelect.appendChild(placeholder);

  const availableIds = new Set(autoGearBackups.map(backup => backup.id));
  const retainSelection = previousValue && availableIds.has(previousValue);

  autoGearBackups.forEach(backup => {
    const option = document.createElement('option');
    option.value = backup.id;
    option.textContent = formatAutoGearBackupMeta(backup);
    if (backup.createdAt) {
      option.title = backup.createdAt;
    }
    if (retainSelection && backup.id === previousValue) {
      option.selected = true;
    }
    autoGearBackupSelect.appendChild(option);
  });

  if (!autoGearBackups.length) {
    placeholder.selected = true;
    autoGearBackupSelect.value = '';
    autoGearBackupSelect.disabled = true;
    autoGearBackupEmptyMessage.hidden = false;
  } else {
    autoGearBackupSelect.disabled = false;
    autoGearBackupEmptyMessage.hidden = true;
    if (retainSelection) {
      placeholder.selected = false;
      autoGearBackupSelect.value = previousValue;
    } else {
      placeholder.selected = true;
      autoGearBackupSelect.value = '';
    }
  }

  updateAutoGearBackupRestoreButtonState();
  applyAutoGearBackupVisibility();
}

function renderAutoGearRulesList() {
  if (!autoGearRulesList) return;
  autoGearRulesList.innerHTML = '';
  const rules = getAutoGearRules();
  if (!rules.length) {
    const empty = document.createElement('p');
    empty.className = 'auto-gear-empty';
    empty.textContent = texts[currentLang]?.autoGearNoRules
      || texts.en?.autoGearNoRules
      || 'No custom rules yet.';
    autoGearRulesList.appendChild(empty);
    return;
  }
  rules.forEach(rule => {
    const wrapper = document.createElement('div');
    wrapper.className = 'auto-gear-rule';
    wrapper.dataset.ruleId = rule.id;
    const info = document.createElement('div');
    info.className = 'auto-gear-rule-info';
    const title = document.createElement('p');
    title.className = 'auto-gear-rule-title';
    const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios : [];
    const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
    const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle : [];
    const rawViewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension : [];
    const viewfinderDisplayList = rawViewfinderList.map(getViewfinderFallbackLabel);
    const videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution : [];
    const fallbackSource = scenarioList.length
      ? scenarioList
      : (matteboxList.length
        ? matteboxList
        : (cameraHandleList.length
          ? cameraHandleList
          : (viewfinderDisplayList.length
            ? viewfinderDisplayList
            : (videoDistributionList.length ? videoDistributionList : []))));
    const fallbackTitle = fallbackSource.length ? fallbackSource.join(' + ') : '';
    title.textContent = rule.label || fallbackTitle;
    info.appendChild(title);
    if (scenarioList.length) {
      const scenarioLabel = texts[currentLang]?.projectFields?.requiredScenarios
        || texts.en?.projectFields?.requiredScenarios
        || 'Required Scenarios';
      const scenarioMeta = document.createElement('p');
      scenarioMeta.className = 'auto-gear-rule-meta';
      scenarioMeta.textContent = `${scenarioLabel}: ${scenarioList.join(' + ')}`;
      info.appendChild(scenarioMeta);
    }
    if (matteboxList.length) {
      const matteboxLabelText = texts[currentLang]?.autoGearMatteboxLabel
        || texts.en?.autoGearMatteboxLabel
        || 'Mattebox options';
      const matteboxMeta = document.createElement('p');
      matteboxMeta.className = 'auto-gear-rule-meta';
      matteboxMeta.textContent = `${matteboxLabelText}: ${matteboxList.join(' + ')}`;
      info.appendChild(matteboxMeta);
    }
    if (cameraHandleList.length) {
      const cameraHandleLabelText = texts[currentLang]?.autoGearCameraHandleLabel
        || texts.en?.autoGearCameraHandleLabel
        || 'Camera handles';
      const cameraHandleMeta = document.createElement('p');
      cameraHandleMeta.className = 'auto-gear-rule-meta';
      cameraHandleMeta.textContent = `${cameraHandleLabelText}: ${cameraHandleList.join(' + ')}`;
      info.appendChild(cameraHandleMeta);
    }
    if (rawViewfinderList.length) {
      const viewfinderLabelText = texts[currentLang]?.autoGearViewfinderExtensionLabel
        || texts.en?.autoGearViewfinderExtensionLabel
        || 'Viewfinder extension';
      const viewfinderMeta = document.createElement('p');
      viewfinderMeta.className = 'auto-gear-rule-meta';
      viewfinderMeta.textContent = `${viewfinderLabelText}: ${viewfinderDisplayList.join(' + ')}`;
      info.appendChild(viewfinderMeta);
    }
    if (videoDistributionList.length) {
      const videoDistLabelText = texts[currentLang]?.autoGearVideoDistributionLabel
        || texts.en?.autoGearVideoDistributionLabel
        || 'Video distribution';
      const videoDistMeta = document.createElement('p');
      videoDistMeta.className = 'auto-gear-rule-meta';
      videoDistMeta.textContent = `${videoDistLabelText}: ${videoDistributionList.join(' + ')}`;
      info.appendChild(videoDistMeta);
    }
    const addSummary = formatAutoGearCount(rule.add.length, 'autoGearAddsCountOne', 'autoGearAddsCountOther');
    const removeSummary = formatAutoGearCount(rule.remove.length, 'autoGearRemovalsCountOne', 'autoGearRemovalsCountOther');
    const countsMeta = document.createElement('p');
    countsMeta.className = 'auto-gear-rule-meta';
    countsMeta.textContent = `${addSummary} · ${removeSummary}`;
    info.appendChild(countsMeta);
    if (rule.add.length) {
      const addsLabel = document.createElement('p');
      addsLabel.className = 'auto-gear-rule-meta auto-gear-rule-items-label';
      addsLabel.textContent = texts[currentLang]?.autoGearAddsListLabel
        || texts.en?.autoGearAddsListLabel
        || 'Adds';
      info.appendChild(addsLabel);
      const addList = document.createElement('ul');
      addList.className = 'auto-gear-rule-items';
      rule.add.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'auto-gear-rule-item';
        listItem.textContent = formatAutoGearItemSummary(item);
        addList.appendChild(listItem);
      });
      info.appendChild(addList);
    }
    wrapper.appendChild(info);
    const actions = document.createElement('div');
    actions.className = 'auto-gear-rule-actions';
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'auto-gear-edit';
    editBtn.dataset.ruleId = rule.id;
    const editLabel = texts[currentLang]?.editBtn || texts.en?.editBtn || 'Edit';
    editBtn.textContent = editLabel;
    editBtn.setAttribute('data-help', editLabel);
    actions.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'auto-gear-delete';
    deleteBtn.dataset.ruleId = rule.id;
    const deleteLabel = texts[currentLang]?.autoGearDeleteRule
      || texts.en?.autoGearDeleteRule
      || 'Delete';
    deleteBtn.textContent = deleteLabel;
    deleteBtn.setAttribute('data-help', deleteLabel);
    actions.appendChild(deleteBtn);
    wrapper.appendChild(actions);
    autoGearRulesList.appendChild(wrapper);
  });
}

function renderAutoGearDraftLists() {
  if (!autoGearEditorDraft) {
    if (autoGearAddList) autoGearAddList.innerHTML = '';
    if (autoGearRemoveList) autoGearRemoveList.innerHTML = '';
    return;
  }
  const renderList = (element, items, type) => {
    if (!element) return;
    element.innerHTML = '';
    if (!items.length) {
      const empty = document.createElement('li');
      empty.className = 'auto-gear-empty';
      empty.textContent = texts[currentLang]?.autoGearEmptyList
        || texts.en?.autoGearEmptyList
        || 'No items yet.';
      element.appendChild(empty);
      return;
    }
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'auto-gear-item';
      const span = document.createElement('span');
      span.textContent = formatAutoGearItemSummary(item, { includeSign: true, listType: type });
      li.appendChild(span);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'auto-gear-remove-entry';
      removeBtn.dataset.listType = type;
      removeBtn.dataset.itemId = item.id;
      const removeLabel = texts[currentLang]?.autoGearListRemove
        || texts.en?.autoGearListRemove
        || 'Remove';
      removeBtn.textContent = removeLabel;
      removeBtn.setAttribute('data-help', removeLabel);
      li.appendChild(removeBtn);
      element.appendChild(li);
    });
  };
  renderList(autoGearAddList, autoGearEditorDraft.add, 'add');
  renderList(autoGearRemoveList, autoGearEditorDraft.remove, 'remove');
}

function openAutoGearEditor(ruleId) {
  if (!autoGearEditor) return;
  const rules = getAutoGearRules();
  const existing = ruleId ? rules.find(rule => rule.id === ruleId) : null;
  autoGearEditorDraft = createAutoGearDraft(existing);
  autoGearEditor.hidden = false;
  if (autoGearRuleNameInput) {
    autoGearRuleNameInput.value = autoGearEditorDraft.label || '';
  }
  refreshAutoGearScenarioOptions(autoGearEditorDraft.scenarios);
  refreshAutoGearMatteboxOptions(autoGearEditorDraft.mattebox);
  refreshAutoGearCameraHandleOptions(autoGearEditorDraft.cameraHandle);
  refreshAutoGearViewfinderExtensionOptions(autoGearEditorDraft.viewfinderExtension);
  refreshAutoGearVideoDistributionOptions(autoGearEditorDraft.videoDistribution);
  populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearEditorDraft.add[0]?.category || '');
  populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearEditorDraft.remove[0]?.category || '');
  syncAutoGearMonitorFieldVisibility();
  if (autoGearAddNameInput) autoGearAddNameInput.value = '';
  if (autoGearAddQuantityInput) autoGearAddQuantityInput.value = '1';
  if (autoGearAddScreenSizeInput) autoGearAddScreenSizeInput.value = '';
  if (autoGearAddSelectorTypeSelect) autoGearAddSelectorTypeSelect.value = 'none';
  if (autoGearAddSelectorDefaultInput) autoGearAddSelectorDefaultInput.value = '';
  if (autoGearAddSelectorIncludeCheckbox) autoGearAddSelectorIncludeCheckbox.checked = false;
  if (autoGearAddNotesInput) autoGearAddNotesInput.value = '';
  if (autoGearRemoveNameInput) autoGearRemoveNameInput.value = '';
  if (autoGearRemoveQuantityInput) autoGearRemoveQuantityInput.value = '1';
  if (autoGearRemoveScreenSizeInput) autoGearRemoveScreenSizeInput.value = '';
  if (autoGearRemoveSelectorTypeSelect) autoGearRemoveSelectorTypeSelect.value = 'none';
  if (autoGearRemoveSelectorDefaultInput) autoGearRemoveSelectorDefaultInput.value = '';
  if (autoGearRemoveSelectorIncludeCheckbox) autoGearRemoveSelectorIncludeCheckbox.checked = false;
  if (autoGearRemoveNotesInput) autoGearRemoveNotesInput.value = '';
  renderAutoGearDraftLists();
  if (autoGearRuleNameInput) autoGearRuleNameInput.focus();
}

function closeAutoGearEditor() {
  if (!autoGearEditor) return;
  autoGearEditor.hidden = true;
  autoGearEditorDraft = null;
  if (autoGearRuleNameInput) autoGearRuleNameInput.value = '';
  refreshAutoGearScenarioOptions([]);
  refreshAutoGearMatteboxOptions([]);
  refreshAutoGearCameraHandleOptions([]);
  refreshAutoGearViewfinderExtensionOptions([]);
  refreshAutoGearVideoDistributionOptions([]);
  if (autoGearAddNameInput) autoGearAddNameInput.value = '';
  if (autoGearAddQuantityInput) autoGearAddQuantityInput.value = '1';
  if (autoGearAddScreenSizeInput) autoGearAddScreenSizeInput.value = '';
  if (autoGearAddSelectorTypeSelect) autoGearAddSelectorTypeSelect.value = 'none';
  if (autoGearAddSelectorDefaultInput) autoGearAddSelectorDefaultInput.value = '';
  if (autoGearAddSelectorIncludeCheckbox) autoGearAddSelectorIncludeCheckbox.checked = false;
  if (autoGearAddNotesInput) autoGearAddNotesInput.value = '';
  if (autoGearRemoveNameInput) autoGearRemoveNameInput.value = '';
  if (autoGearRemoveQuantityInput) autoGearRemoveQuantityInput.value = '1';
  if (autoGearRemoveScreenSizeInput) autoGearRemoveScreenSizeInput.value = '';
  if (autoGearRemoveSelectorTypeSelect) autoGearRemoveSelectorTypeSelect.value = 'none';
  if (autoGearRemoveSelectorDefaultInput) autoGearRemoveSelectorDefaultInput.value = '';
  if (autoGearRemoveSelectorIncludeCheckbox) autoGearRemoveSelectorIncludeCheckbox.checked = false;
  if (autoGearRemoveNotesInput) autoGearRemoveNotesInput.value = '';
  syncAutoGearMonitorFieldVisibility();
}

function addAutoGearDraftItem(type) {
  if (!autoGearEditorDraft) return;
  const isAdd = type === 'add';
  const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
  const categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
  const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
  const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
  const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
  const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
  const selectorIncludeCheckbox = isAdd ? autoGearAddSelectorIncludeCheckbox : autoGearRemoveSelectorIncludeCheckbox;
  const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
  if (!nameInput || !categorySelect || !quantityInput) return;
  const parsedNames = parseAutoGearDraftNames(nameInput.value);
  if (!parsedNames.length) {
    const message = texts[currentLang]?.autoGearItemNameRequired
      || texts.en?.autoGearItemNameRequired
      || 'Enter an item name first.';
    window.alert(message);
    return;
  }
  const baseValues = {
    category: categorySelect.value || '',
    quantity: normalizeAutoGearQuantity(quantityInput.value),
    screenSize: screenSizeInput ? screenSizeInput.value : '',
    selectorType: selectorTypeSelect ? selectorTypeSelect.value : 'none',
    selectorDefault: selectorDefaultInput ? selectorDefaultInput.value : '',
    selectorEnabled: selectorIncludeCheckbox ? !!selectorIncludeCheckbox.checked : false,
    notes: notesInput ? notesInput.value : '',
  };
  if (!isAutoGearMonitoringCategory(baseValues.category)) {
    baseValues.screenSize = '';
    baseValues.selectorType = 'none';
    baseValues.selectorDefault = '';
    baseValues.selectorEnabled = false;
  }
  parsedNames.forEach(entry => {
    const quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity')
      ? normalizeAutoGearQuantity(entry.quantity)
      : baseValues.quantity;
    const targetType = entry.listType || (isAdd ? 'add' : 'remove');
    const targetList = targetType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
    const itemData = normalizeAutoGearItem({
      id: generateAutoGearId('item'),
      name: entry.name,
      category: baseValues.category,
      quantity,
      screenSize: baseValues.screenSize,
      selectorType: baseValues.selectorType,
      selectorDefault: baseValues.selectorDefault,
      selectorEnabled: baseValues.selectorEnabled,
      notes: baseValues.notes,
    });
    if (itemData) {
      targetList.push(itemData);
    }
  });
  nameInput.value = '';
  quantityInput.value = '1';
  if (screenSizeInput) screenSizeInput.value = '';
  if (selectorTypeSelect) selectorTypeSelect.value = 'none';
  if (selectorDefaultInput) selectorDefaultInput.value = '';
  if (selectorIncludeCheckbox) selectorIncludeCheckbox.checked = false;
  if (notesInput) notesInput.value = '';
  renderAutoGearDraftLists();
  updateAutoGearCatalogOptions();
}

function saveAutoGearRuleFromEditor() {
  if (!autoGearEditorDraft) return;
  const scenarios = autoGearScenariosSelect
    ? Array.from(autoGearScenariosSelect.selectedOptions || [])
        .map(option => option.value)
        .filter(Boolean)
    : [];
  const matteboxSelections = autoGearMatteboxSelect
    ? Array.from(autoGearMatteboxSelect.selectedOptions || [])
        .map(option => option.value)
        .filter(Boolean)
    : [];
  const cameraHandleSelections = autoGearCameraHandleSelect
    ? Array.from(autoGearCameraHandleSelect.selectedOptions || [])
        .map(option => option.value)
        .filter(Boolean)
    : [];
  const viewfinderSelections = autoGearViewfinderExtensionSelect
    ? Array.from(autoGearViewfinderExtensionSelect.selectedOptions || [])
        .map(option => option.value)
        .filter(value => typeof value === 'string' && value.trim())
    : [];
  const videoDistributionSelections = autoGearVideoDistributionSelect
    ? Array.from(autoGearVideoDistributionSelect.selectedOptions || [])
        .map(option => option.value)
        .filter(Boolean)
    : [];
  if (
    !scenarios.length
    && !matteboxSelections.length
    && !cameraHandleSelections.length
    && !viewfinderSelections.length
    && !videoDistributionSelections.length
  ) {
    const message = texts[currentLang]?.autoGearRuleConditionRequired
      || texts.en?.autoGearRuleConditionRequired
      || texts[currentLang]?.autoGearRuleScenarioRequired
      || texts.en?.autoGearRuleScenarioRequired
      || 'Select at least one scenario, mattebox option, camera handle, viewfinder extension or video distribution before saving.';
    window.alert(message);
    return;
  }
  if (autoGearRuleNameInput) {
    autoGearEditorDraft.label = autoGearRuleNameInput.value.trim();
  }
  autoGearEditorDraft.scenarios = scenarios;
  autoGearEditorDraft.mattebox = matteboxSelections;
  autoGearEditorDraft.cameraHandle = cameraHandleSelections;
  autoGearEditorDraft.viewfinderExtension = viewfinderSelections;
  autoGearEditorDraft.videoDistribution = videoDistributionSelections;
  if (!autoGearEditorDraft.add.length && !autoGearEditorDraft.remove.length) {
    const message = texts[currentLang]?.autoGearRuleNeedsItems
      || texts.en?.autoGearRuleNeedsItems
      || 'Add at least one item to add or remove.';
    window.alert(message);
    return;
  }
  const draftRule = normalizeAutoGearRule(autoGearEditorDraft);
  if (!draftRule) return;
  const rules = getAutoGearRules();
  const index = rules.findIndex(rule => rule.id === draftRule.id);
  if (index >= 0) {
    rules[index] = draftRule;
  } else {
    rules.push(draftRule);
  }
  setAutoGearRules(rules);
  updateAutoGearCatalogOptions();
  renderAutoGearRulesList();
  const successMessage = texts[currentLang]?.autoGearRuleSaved
    || texts.en?.autoGearRuleSaved
    || 'Automatic gear rule saved.';
  showNotification('success', successMessage);
  closeAutoGearEditor();
}

function deleteAutoGearRule(ruleId) {
  const rules = getAutoGearRules();
  const index = rules.findIndex(rule => rule.id === ruleId);
  if (index < 0) return;
  const confirmation = texts[currentLang]?.autoGearDeleteConfirm
    || texts.en?.autoGearDeleteConfirm
    || 'Delete this rule?';
  if (!window.confirm(confirmation)) return;
  const backupName = ensureAutoBackupBeforeDeletion('delete automatic gear rule');
  if (!backupName) return;
  rules.splice(index, 1);
  setAutoGearRules(rules);
  updateAutoGearCatalogOptions();
  renderAutoGearRulesList();
  if (autoGearEditorDraft && autoGearEditorDraft.id === ruleId) {
    closeAutoGearEditor();
  }
}

function parseAutoGearImportPayload(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return null;
  if (Array.isArray(data.rules)) return data.rules;
  if (Array.isArray(data.autoGearRules)) return data.autoGearRules;
  if (data.data && Array.isArray(data.data.autoGearRules)) {
    return data.data.autoGearRules;
  }
  return null;
}

function importAutoGearRulesFromData(data, options = {}) {
  const parsed = parseAutoGearImportPayload(data);
  if (parsed === null) {
    throw new Error('Invalid automatic gear rules import payload');
  }
  setAutoGearRules(Array.isArray(parsed) ? parsed : []);
  closeAutoGearEditor();
  renderAutoGearRulesList();
  updateAutoGearCatalogOptions();
  if (!options.silent) {
    const message = texts[currentLang]?.autoGearImportSuccess
      || texts.en?.autoGearImportSuccess
      || 'Automatic gear rules imported.';
    showNotification('success', message);
  }
  return getAutoGearRules();
}

function formatAutoGearExportFilename(date) {
  const { iso } = formatFullBackupFilename(date);
  const safeIso = iso.replace(/[:]/g, '-');
  return `${safeIso} auto gear rules.json`;
}

function exportAutoGearRules() {
  if (typeof document === 'undefined') return null;
  try {
    const rules = getBaseAutoGearRules();
    const payload = {
      type: 'camera-power-planner/auto-gear-rules',
      version: APP_VERSION,
      createdAt: new Date().toISOString(),
      rules,
    };
    const json = JSON.stringify(payload, null, 2);
    if (typeof Blob !== 'function' || !URL || typeof URL.createObjectURL !== 'function') {
      throw new Error('Blob or URL APIs unavailable');
    }
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    const fileName = formatAutoGearExportFilename(new Date());
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    if (typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(url);
    }
    const message = texts[currentLang]?.autoGearExportSuccess
      || texts.en?.autoGearExportSuccess
      || 'Automatic gear rules downloaded.';
    showNotification('success', message);
    return fileName;
  } catch (error) {
    console.warn('Automatic gear rules export failed', error);
    const message = texts[currentLang]?.autoGearExportError
      || texts.en?.autoGearExportError
      || 'Automatic gear rules export failed.';
    showNotification('error', message);
    return null;
  }
}

function createAutoGearBackup() {
  if (!autoGearRulesDirtySinceBackup) return false;
  const rules = getBaseAutoGearRules();
  const signature = stableStringify(rules);
  if (signature === autoGearRulesLastBackupSignature) {
    autoGearRulesDirtySinceBackup = false;
    return false;
  }
  const entry = {
    id: generateAutoGearId('backup'),
    createdAt: new Date().toISOString(),
    rules,
  };
  const updatedBackups = [entry, ...autoGearBackups].slice(0, AUTO_GEAR_BACKUP_LIMIT);
  try {
    persistAutoGearBackups(updatedBackups);
    autoGearBackups = updatedBackups;
    autoGearRulesLastBackupSignature = signature;
    autoGearRulesLastPersistedSignature = signature;
    autoGearRulesDirtySinceBackup = false;
    renderAutoGearBackupControls();
    const message = texts[currentLang]?.autoGearBackupSaved
      || texts.en?.autoGearBackupSaved
      || 'Automatic gear backup saved.';
    showNotification('success', message);
    return true;
  } catch (error) {
    console.warn('Automatic gear backup failed', error);
    autoGearRulesDirtySinceBackup = true;
    const message = texts[currentLang]?.autoGearBackupFailed
      || texts.en?.autoGearBackupFailed
      || 'Automatic gear backup failed.';
    showNotification('error', message);
    return false;
  }
}

function restoreAutoGearBackup(backupId) {
  if (!backupId) return false;
  const backup = autoGearBackups.find(entry => entry.id === backupId);
  if (!backup) return false;
  const confirmation = texts[currentLang]?.autoGearBackupRestoreConfirm
    || texts.en?.autoGearBackupRestoreConfirm
    || 'Replace your automatic gear rules with this backup?';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    if (!window.confirm(confirmation)) return false;
  }
  try {
    setAutoGearRules(Array.isArray(backup.rules) ? backup.rules : []);
    closeAutoGearEditor();
    renderAutoGearRulesList();
    updateAutoGearCatalogOptions();
    autoGearRulesLastBackupSignature = stableStringify(backup.rules || []);
    autoGearRulesLastPersistedSignature = autoGearRulesLastBackupSignature;
    autoGearRulesDirtySinceBackup = false;
    const message = texts[currentLang]?.autoGearBackupRestoreSuccess
      || texts.en?.autoGearBackupRestoreSuccess
      || 'Automatic gear backup restored.';
    showNotification('success', message);
    return true;
  } catch (error) {
    console.warn('Failed to restore automatic gear backup', error);
    const message = texts[currentLang]?.autoGearBackupRestoreError
      || texts.en?.autoGearBackupRestoreError
      || 'Automatic gear backup restore failed.';
    showNotification('error', message);
    return false;
  }
}

function handleAutoGearImportSelection(event) {
  const input = event?.target;
  const file = input && input.files && input.files[0];
  if (!file) return;
  const confirmation = texts[currentLang]?.autoGearImportConfirm
    || texts.en?.autoGearImportConfirm
    || 'Replace your automatic gear rules with the imported file?';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    if (!window.confirm(confirmation)) {
      if (input) input.value = '';
      return;
    }
  }
  if (typeof FileReader === 'undefined') {
    const errorMsg = texts[currentLang]?.autoGearImportError
      || texts.en?.autoGearImportError
      || 'Import failed. Please choose a valid automatic gear rules file.';
    showNotification('error', errorMsg);
    if (input) input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const text = e?.target?.result;
      const parsed = JSON.parse(typeof text === 'string' ? text : '');
      importAutoGearRulesFromData(parsed);
    } catch (error) {
      console.warn('Automatic gear rules import failed', error);
      const errorMsg = texts[currentLang]?.autoGearImportError
        || texts.en?.autoGearImportError
        || 'Import failed. Please choose a valid automatic gear rules file.';
      showNotification('error', errorMsg);
    } finally {
      if (input) input.value = '';
    }
  };
  reader.onerror = () => {
    const errorMsg = texts[currentLang]?.autoGearImportError
      || texts.en?.autoGearImportError
      || 'Import failed. Please choose a valid automatic gear rules file.';
    showNotification('error', errorMsg);
    if (input) input.value = '';
  };
  reader.readAsText(file);
}

let lastActiveBeforeIosHelp = null;
let lastActiveBeforeInstallGuide = null;
let currentInstallGuidePlatform = null;

function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const hasTouch = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  return /iphone|ipad|ipod/i.test(ua) || (platform === 'MacIntel' && hasTouch);
}

function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const vendor = navigator.vendor || '';
  return /android/i.test(ua) || /android/i.test(vendor);
}

function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') return false;
  if (typeof window.matchMedia === 'function') {
    try {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
      }
    } catch (error) {
      console.warn('matchMedia display-mode check failed', error);
    }
  }
  if (typeof navigator !== 'undefined' && typeof navigator.standalone === 'boolean') {
    return navigator.standalone;
  }
  return false;
}

function hasDismissedIosPwaHelp() {
  try {
    return localStorage.getItem(IOS_PWA_HELP_STORAGE_KEY) === '1';
  } catch (error) {
    console.warn('Could not read iOS PWA help dismissal flag', error);
    return false;
  }
}

function markIosPwaHelpDismissed() {
  try {
    localStorage.setItem(IOS_PWA_HELP_STORAGE_KEY, '1');
  } catch (error) {
    console.warn('Could not store iOS PWA help dismissal', error);
  }
}

function shouldShowInstallBanner() {
  if (!installPromptBanner) return false;
  if (isStandaloneDisplayMode()) return false;
  return isIosDevice() || isAndroidDevice();
}

function updateInstallBannerVisibility() {
  if (!installPromptBanner) return;
  if (shouldShowInstallBanner()) {
    installPromptBanner.removeAttribute('hidden');
    updateInstallBannerPosition();
  } else {
    installPromptBanner.setAttribute('hidden', '');
  }
}

function renderInstallGuideContent(platform, lang = currentLang) {
  if (!installGuideDialog) return;
  const fallbackTexts = texts.en || {};
  const langTexts = texts[lang] || fallbackTexts;
  const isIos = platform === 'ios';

  const titleKey = isIos ? 'installHelpTitleIos' : 'installHelpTitleAndroid';
  const introKey = isIos ? 'installHelpIntroIos' : 'installHelpIntroAndroid';
  const stepsKey = isIos ? 'installHelpStepsIos' : 'installHelpStepsAndroid';
  const noteKey = isIos ? 'installHelpNoteIos' : 'installHelpNoteAndroid';

  const title = langTexts[titleKey] || fallbackTexts[titleKey] || '';
  if (installGuideTitle) installGuideTitle.textContent = title;

  const intro = langTexts[introKey] || fallbackTexts[introKey] || '';
  if (installGuideIntro) installGuideIntro.textContent = intro;

  const stepsSource = langTexts[stepsKey];
  const fallbackStepsSource = fallbackTexts[stepsKey];
  const toArray = value => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };
  const steps = toArray(stepsSource);
  const fallbackSteps = toArray(fallbackStepsSource);
  const effectiveSteps = steps.length ? steps : fallbackSteps;
  if (installGuideSteps) {
    installGuideSteps.textContent = '';
    effectiveSteps.forEach(step => {
      if (!step) return;
      const li = document.createElement('li');
      li.textContent = step;
      installGuideSteps.appendChild(li);
    });
  }

  const note = langTexts[noteKey] || fallbackTexts[noteKey] || '';
  if (installGuideNote) installGuideNote.textContent = note;

  if (installGuideDialog) {
    installGuideDialog.setAttribute('data-platform', platform);
  }

  if (!installGuideMigration || !installGuideMigrationTitle || !installGuideMigrationIntro || !installGuideMigrationSteps || !installGuideMigrationNote) {
    return;
  }

  if (isIos) {
    installGuideMigration.removeAttribute('hidden');
    const migrationTitle = langTexts.installHelpMigrationTitle || fallbackTexts.installHelpMigrationTitle || '';
    installGuideMigrationTitle.textContent = migrationTitle;
    const migrationIntro = langTexts.iosPwaHelpIntro || fallbackTexts.iosPwaHelpIntro || '';
    installGuideMigrationIntro.textContent = migrationIntro;
    const migrationSteps = [
      langTexts.iosPwaHelpStep1 || fallbackTexts.iosPwaHelpStep1,
      langTexts.iosPwaHelpStep2 || fallbackTexts.iosPwaHelpStep2,
      langTexts.iosPwaHelpStep3 || fallbackTexts.iosPwaHelpStep3,
      langTexts.iosPwaHelpStep4 || fallbackTexts.iosPwaHelpStep4,
    ].filter(Boolean);
    installGuideMigrationSteps.textContent = '';
    migrationSteps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      installGuideMigrationSteps.appendChild(li);
    });
    const migrationNote = langTexts.iosPwaHelpNote || fallbackTexts.iosPwaHelpNote || '';
    installGuideMigrationNote.textContent = migrationNote;
  } else {
    installGuideMigration.setAttribute('hidden', '');
    installGuideMigrationTitle.textContent = '';
    installGuideMigrationIntro.textContent = '';
    installGuideMigrationSteps.textContent = '';
    installGuideMigrationNote.textContent = '';
  }
}

function openInstallGuide(platform) {
  if (!installGuideDialog) return;
  currentInstallGuidePlatform = platform;
  lastActiveBeforeInstallGuide = document.activeElement;
  renderInstallGuideContent(platform);
  installGuideDialog.removeAttribute('hidden');
  const focusTarget = installGuideClose || installGuideDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
  }
}

function closeInstallGuide() {
  if (!installGuideDialog) return;
  installGuideDialog.setAttribute('hidden', '');
  currentInstallGuidePlatform = null;
  if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
    lastActiveBeforeInstallGuide.focus();
  }
}

function setupInstallBanner() {
  if (!installPromptBanner) return;

  installPromptBanner.addEventListener('click', () => {
    const platform = isIosDevice() ? 'ios' : 'android';
    openInstallGuide(platform);
  });

  if (installGuideClose) {
    installGuideClose.addEventListener('click', closeInstallGuide);
  }

  if (installGuideDialog) {
    installGuideDialog.addEventListener('click', event => {
      if (event.target === installGuideDialog) {
        closeInstallGuide();
      }
    });
  }

  applyInstallTexts(currentLang);
  updateInstallBannerVisibility();
  updateInstallBannerPosition();

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateInstallBannerPosition);
    window.addEventListener('appinstalled', updateInstallBannerVisibility);
    if (typeof window.matchMedia === 'function') {
      try {
        const media = window.matchMedia('(display-mode: standalone)');
        const handleChange = () => updateInstallBannerVisibility();
        if (typeof media.addEventListener === 'function') {
          media.addEventListener('change', handleChange);
        } else if (typeof media.addListener === 'function') {
          media.addListener(handleChange);
        }
      } catch (error) {
        console.warn('matchMedia display-mode listener failed', error);
      }
    }
  }
}

function applyInstallTexts(lang) {
  const fallbackTexts = texts.en || {};
  const langTexts = texts[lang] || fallbackTexts;
  const bannerText = langTexts.installBannerText || fallbackTexts.installBannerText;
  if (installPromptBannerText && bannerText) {
    installPromptBannerText.textContent = bannerText;
  }
  if (installPromptBanner && bannerText) {
    installPromptBanner.setAttribute('aria-label', bannerText);
  }
  const closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose;
  if (installGuideClose && closeLabel) {
    installGuideClose.textContent = closeLabel;
    installGuideClose.setAttribute('aria-label', closeLabel);
  }
  if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
    renderInstallGuideContent(currentInstallGuidePlatform, lang);
  }
}

function shouldShowIosPwaHelp() {
  return (
    !!iosPwaHelpDialog &&
    isIosDevice() &&
    isStandaloneDisplayMode() &&
    !hasDismissedIosPwaHelp()
  );
}

function openIosPwaHelp() {
  if (!iosPwaHelpDialog) return;
  if (!shouldShowIosPwaHelp()) return;
  lastActiveBeforeIosHelp = document.activeElement;
  iosPwaHelpDialog.removeAttribute('hidden');
  const focusTarget = iosPwaHelpClose || iosPwaHelpDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
  }
}

function closeIosPwaHelp(storeDismissal = false) {
  if (!iosPwaHelpDialog) return;
  iosPwaHelpDialog.setAttribute('hidden', '');
  if (storeDismissal) {
    markIosPwaHelpDismissed();
  }
  if (lastActiveBeforeIosHelp && typeof lastActiveBeforeIosHelp.focus === 'function') {
    lastActiveBeforeIosHelp.focus();
  }
}

function maybeShowIosPwaHelp() {
  openIosPwaHelp();
}

if (iosPwaHelpClose) {
  iosPwaHelpClose.addEventListener('click', () => closeIosPwaHelp(true));
}

if (iosPwaHelpDialog) {
  iosPwaHelpDialog.addEventListener('click', event => {
    if (event.target === iosPwaHelpDialog) {
      closeIosPwaHelp(true);
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' && event.key !== 'Esc') return;
  let handled = false;
  if (iosPwaHelpDialog && !iosPwaHelpDialog.hasAttribute('hidden')) {
    closeIosPwaHelp(true);
    handled = true;
  }
  if (installGuideDialog && !installGuideDialog.hasAttribute('hidden')) {
    closeInstallGuide();
    handled = true;
  }
  if (handled) {
    event.preventDefault();
  }
});

function renderSettingsLogoPreview(dataUrl) {
  if (!settingsLogoPreview) return;
  if (dataUrl) {
    settingsLogoPreview.textContent = '';
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = '';
    settingsLogoPreview.appendChild(img);
    settingsLogoPreview.removeAttribute('hidden');
  } else {
    settingsLogoPreview.textContent = '';
    settingsLogoPreview.setAttribute('hidden', '');
  }
}

function loadStoredLogoPreview() {
  if (!settingsLogoPreview || typeof localStorage === 'undefined') return;
  let stored = null;
  try {
    stored = localStorage.getItem('customLogo');
  } catch (e) {
    console.warn('Could not load custom logo preview', e);
  }
  renderSettingsLogoPreview(stored);
}

const isPlainObjectValue = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

const REQUIRED_DEVICE_CATEGORIES = [
  'cameras',
  'monitors',
  'video',
  'viewfinders',
  'directorMonitors',
  'iosVideo',
  'videoAssist',
  'media',
  'lenses',
  'fiz',
  'batteries',
  'batteryHotswaps',
  'wirelessReceivers',
  'accessories',
];
const DEFAULT_FIZ_COLLECTIONS = ['motors', 'handUnits', 'controllers', 'distance'];
const DEFAULT_ACCESSORY_COLLECTIONS = [
  'chargers',
  'cages',
  'powerPlates',
  'cameraSupport',
  'matteboxes',
  'filters',
  'rigging',
  'batteries',
  'cables',
  'videoAssist',
  'media',
  'tripodHeads',
  'tripods',
  'sliders',
  'cameraStabiliser',
  'grip',
  'carts',
];
const MAX_DEVICE_IMPORT_ERRORS = 5;

function isDeviceEntryObject(value) {
  if (!isPlainObjectValue(value)) {
    return false;
  }
  return Object.values(value).some((entry) => entry === null || typeof entry !== 'object' || Array.isArray(entry));
}

function countDeviceDatabaseEntries(collection) {
  if (!isPlainObjectValue(collection)) {
    return 0;
  }
  let total = 0;
  for (const [name, value] of Object.entries(collection)) {
    if (name === 'filterOptions' || name === 'None') {
      continue;
    }
    if (!isPlainObjectValue(value)) {
      continue;
    }
    if (isDeviceEntryObject(value)) {
      total += 1;
    } else {
      total += countDeviceDatabaseEntries(value);
    }
  }
  return total;
}

function looksLikeDeviceDatabase(candidate) {
  if (!isPlainObjectValue(candidate)) {
    return false;
  }
  let matched = 0;
  for (const key of REQUIRED_DEVICE_CATEGORIES) {
    if (Object.prototype.hasOwnProperty.call(candidate, key)) {
      matched += 1;
    }
  }
  return matched >= 3;
}

function collectReferenceFizKeys() {
  const reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices)
    ? globalThis.defaultDevices
    : (typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null);
  if (reference && isPlainObjectValue(reference.fiz)) {
    const keys = Object.keys(reference.fiz).filter(Boolean);
    if (keys.length) {
      return keys;
    }
  }
  return DEFAULT_FIZ_COLLECTIONS;
}

function collectReferenceAccessoryKeys() {
  const reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices)
    ? globalThis.defaultDevices
    : (typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null);
  if (reference && isPlainObjectValue(reference.accessories)) {
    const keys = Object.keys(reference.accessories).filter(Boolean);
    if (keys.length) {
      return keys;
    }
  }
  return DEFAULT_ACCESSORY_COLLECTIONS;
}

function validateDeviceDatabaseStructure(candidate) {
  if (!isPlainObjectValue(candidate)) {
    return { devices: null, errors: ['Imported data must be a JSON object.'] };
  }

  const errors = [];
  const missing = [];

  for (const category of REQUIRED_DEVICE_CATEGORIES) {
    if (category === 'fiz') {
      if (!isPlainObjectValue(candidate.fiz)) {
        missing.push('fiz');
        continue;
      }
      const expectedFizKeys = collectReferenceFizKeys();
      const missingFiz = expectedFizKeys.filter((key) => !isPlainObjectValue(candidate.fiz[key]));
      if (missingFiz.length) {
        errors.push(`Missing FIZ categories: ${missingFiz.join(', ')}`);
      }
      continue;
    }
    if (category === 'accessories') {
      if (!isPlainObjectValue(candidate.accessories)) {
        missing.push('accessories');
        continue;
      }
      const expectedAccessoryKeys = collectReferenceAccessoryKeys();
      const missingAccessories = expectedAccessoryKeys.filter((key) => !isPlainObjectValue(candidate.accessories[key]));
      if (missingAccessories.length) {
        errors.push(`Missing accessory categories: ${missingAccessories.join(', ')}`);
      }
      continue;
    }
    if (!isPlainObjectValue(candidate[category])) {
      missing.push(category);
    }
  }

  if (missing.length) {
    errors.push(`Missing categories: ${missing.join(', ')}`);
  }

  if (candidate.accessories !== undefined) {
    if (!isPlainObjectValue(candidate.accessories)) {
      errors.push('Accessory collections must be objects.');
    } else {
      for (const [subKey, subValue] of Object.entries(candidate.accessories)) {
        if (!isPlainObjectValue(subValue)) {
          errors.push(`Accessory category "${subKey}" must be an object.`);
        }
      }
    }
  }

  if (candidate.filterOptions !== undefined && !Array.isArray(candidate.filterOptions)) {
    errors.push('Filter options must be provided as an array.');
  }

  if (candidate.fiz && isPlainObjectValue(candidate.fiz)) {
    for (const [subKey, subValue] of Object.entries(candidate.fiz)) {
      if (subValue !== undefined && !isPlainObjectValue(subValue)) {
        errors.push(`FIZ category "${subKey}" must be an object.`);
      }
    }
  }

  const structureErrors = [];
  const inspectCollections = (collection, path = []) => {
    if (!isPlainObjectValue(collection)) {
      return;
    }
    for (const [name, value] of Object.entries(collection)) {
      if (name === 'None' || name === 'filterOptions') {
        continue;
      }
      const nextPath = path.concat(name);
      if (!isPlainObjectValue(value)) {
        if (!Array.isArray(value)) {
          structureErrors.push(`${nextPath.join('.')} must be an object.`);
        }
      } else if (!isDeviceEntryObject(value)) {
        inspectCollections(value, nextPath);
      }
      if (structureErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
        return;
      }
    }
  };

  inspectCollections(candidate);
  errors.push(...structureErrors);

  const deviceCount = countDeviceDatabaseEntries(candidate);
  if (!deviceCount) {
    errors.push('The imported database does not contain any devices.');
  }

  const uniqueErrors = [];
  for (const message of errors) {
    if (message && !uniqueErrors.includes(message)) {
      uniqueErrors.push(message);
    }
    if (uniqueErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
      break;
    }
  }

  return {
    devices: uniqueErrors.length ? null : candidate,
    errors: uniqueErrors,
  };
}

function parseDeviceDatabaseImport(rawData) {
  if (Array.isArray(rawData)) {
    return { devices: null, errors: ['Import file must contain a JSON object, but found an array.'] };
  }
  if (!isPlainObjectValue(rawData)) {
    return { devices: null, errors: ['Import file must contain a JSON object.'] };
  }

  if (Object.prototype.hasOwnProperty.call(rawData, 'devices') && !isPlainObjectValue(rawData.devices)) {
    return { devices: null, errors: ['The "devices" property must be an object.'] };
  }

  const candidate = Object.prototype.hasOwnProperty.call(rawData, 'devices') && isPlainObjectValue(rawData.devices)
    ? rawData.devices
    : (looksLikeDeviceDatabase(rawData) ? rawData : null);

  if (!candidate) {
    return { devices: null, errors: ['Could not find a device database in the selected file.'] };
  }

  return validateDeviceDatabaseStructure(candidate);
}

function formatDeviceImportErrors(errors) {
  if (!Array.isArray(errors) || !errors.length) {
    return '';
  }
  const lines = errors.slice(0, MAX_DEVICE_IMPORT_ERRORS).map((message) => `- ${message}`);
  return lines.join('\n');
}

function resolveLanguageCode(lang) {
  if (lang && texts && Object.prototype.hasOwnProperty.call(texts, lang)) {
    return lang;
  }
  return 'en';
}

function getLanguageTexts(lang) {
  const resolved = resolveLanguageCode(lang);
  return (texts && texts[resolved]) || texts.en || {};
}

const DEFAULT_INTL_CACHE_KEY = '__default__';

const numberFormatCache = new Map();
const pluralRulesCache = new Map();
const listFormatCache = new Map();
const LIST_FORMAT_OPTIONS = Object.freeze({ style: 'long', type: 'conjunction' });

function serializeIntlOptions(options) {
  if (!options || typeof options !== 'object') {
    return options == null ? DEFAULT_INTL_CACHE_KEY : String(options);
  }
  const entries = [];
  for (const [key, value] of Object.entries(options)) {
    if (typeof value === 'undefined') continue;
    let normalizedValue;
    if (value && typeof value === 'object') {
      normalizedValue = serializeIntlOptions(value);
    } else {
      normalizedValue = String(value);
    }
    entries.push(`${key}:${normalizedValue}`);
  }
  if (!entries.length) {
    return DEFAULT_INTL_CACHE_KEY;
  }
  return entries.sort().join('|');
}

function getCachedIntlObject(cache, locale, options, factory) {
  const key = serializeIntlOptions(options);
  let localeCache = cache.get(locale);
  if (!localeCache) {
    localeCache = new Map();
    cache.set(locale, localeCache);
  }
  if (localeCache.has(key)) {
    return localeCache.get(key);
  }
  try {
    const instance = factory(locale, options);
    localeCache.set(key, instance);
    return instance;
  } catch (error) {
    localeCache.delete(key);
    throw error;
  }
}

function getNumberFormatter(locale, options) {
  return getCachedIntlObject(numberFormatCache, locale, options, (loc, opts) => new Intl.NumberFormat(loc, opts));
}

function getPluralRules(locale) {
  return getCachedIntlObject(pluralRulesCache, locale, undefined, loc => new Intl.PluralRules(loc));
}

function getListFormatter(locale) {
  return getCachedIntlObject(listFormatCache, locale, LIST_FORMAT_OPTIONS, loc => new Intl.ListFormat(loc, LIST_FORMAT_OPTIONS));
}

function formatNumberForLang(lang, value, options) {
  const resolved = resolveLanguageCode(lang);
  try {
    return getNumberFormatter(resolved, options).format(value);
  } catch (firstError) {
    if (resolved !== 'en') {
      try {
        return getNumberFormatter('en', options).format(value);
      } catch (fallbackError) {
        console.warn('Number formatting failed', firstError, fallbackError);
        return String(value);
      }
    }
    console.warn('Number formatting failed', firstError);
    return String(value);
  }
}

function formatCountText(lang, langTexts, baseKey, count) {
  const resolved = resolveLanguageCode(lang);
  const localeTexts = langTexts || getLanguageTexts(resolved);
  const englishTexts = getLanguageTexts('en');
  let suffix = 'Other';
  try {
    const plural = getPluralRules(resolved).select(count);
    if (plural === 'one' && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
      suffix = 'One';
    }
  } catch (firstError) {
    if (resolved !== 'en') {
      try {
        const fallbackPlural = getPluralRules('en').select(count);
        if (fallbackPlural === 'one' && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
          suffix = 'One';
        }
      } catch (fallbackError) {
        console.warn('Plural rules failed', firstError, fallbackError);
        if (count === 1 && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
          suffix = 'One';
        }
      }
    } else if (count === 1 && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
      suffix = 'One';
    }
  }
  const key = `${baseKey}${suffix}`;
  const template = localeTexts[key] || englishTexts[key] || '%s';
  const formatted = formatNumberForLang(resolved, count);
  return template.replace('%s', formatted);
}

function formatListForLang(lang, items) {
  const resolved = resolveLanguageCode(lang);
  if (!Array.isArray(items) || !items.length) return '';
  try {
    return getListFormatter(resolved).format(items);
  } catch (firstError) {
    if (resolved !== 'en') {
      try {
        return getListFormatter('en').format(items);
      } catch (fallbackError) {
        console.warn('List formatting failed', firstError, fallbackError);
        return items.join(', ');
      }
    }
    console.warn('List formatting failed', firstError);
    return items.join(', ');
  }
}

function summarizeCustomDevices() {
  if (typeof getDeviceChanges !== 'function') {
    return { total: 0, categories: [] };
  }
  const diff = getDeviceChanges();
  if (!diff || typeof diff !== 'object') {
    return { total: 0, categories: [] };
  }
  const categories = [];
  let total = 0;
  Object.entries(diff).forEach(([cat, entries]) => {
    if (!isPlainObjectValue(entries)) return;
    if (cat === 'fiz') {
      Object.entries(entries).forEach(([sub, subEntries]) => {
        if (!isPlainObjectValue(subEntries)) return;
        const keys = Object.keys(subEntries);
        if (!keys.length) return;
        categories.push({ key: `fiz.${sub}`, count: keys.length });
        total += keys.length;
      });
    } else {
      const keys = Object.keys(entries);
      if (!keys.length) return;
      categories.push({ key: cat, count: keys.length });
      total += keys.length;
    }
  });
  return { total, categories };
}

function hasGearListContent(entry) {
  if (!entry) return false;
  if (typeof entry === 'string') {
    return entry.trim().length > 0;
  }
  if (!isPlainObjectValue(entry)) {
    return false;
  }

  if (typeof entry.gearList === 'string') {
    return entry.gearList.trim().length > 0;
  }

  if (isPlainObjectValue(entry.gearList)) {
    return Object.values(entry.gearList).some((value) => (
      typeof value === 'string' && value.trim().length > 0
    ));
  }

  const legacyProjectHtml = typeof entry.projectHtml === 'string' && entry.projectHtml.trim().length > 0;
  const legacyGearHtml = typeof entry.gearHtml === 'string' && entry.gearHtml.trim().length > 0;
  if (legacyProjectHtml || legacyGearHtml) {
    return true;
  }

  return false;
}

function computeGearListCount(projectData, setupsData) {
  let count = 0;
  const countedNames = new Set();

  const addCount = (name, candidate) => {
    if (!hasGearListContent(candidate)) {
      return;
    }
    const normalizedName = typeof name === 'string' ? name : '';
    if (countedNames.has(normalizedName)) {
      return;
    }
    countedNames.add(normalizedName);
    count += 1;
  };

  if (typeof projectData === 'string') {
    addCount('', projectData);
  } else if (Array.isArray(projectData)) {
    projectData.forEach((entry, index) => {
      const key = isPlainObjectValue(entry) && typeof entry.name === 'string'
        ? entry.name
        : `legacy-${index}`;
      addCount(key, entry);
    });
  } else if (isPlainObjectValue(projectData)) {
    Object.entries(projectData).forEach(([name, entry]) => {
      addCount(name, entry);
    });
  } else {
    addCount('', projectData);
  }

  if (isPlainObjectValue(setupsData)) {
    Object.entries(setupsData).forEach(([name, setup]) => {
      addCount(name, setup);
    });
  }

  return count;
}

function computeFavoritesCount(favorites) {
  if (!isPlainObjectValue(favorites)) return 0;
  return Object.values(favorites).reduce((count, entry) => {
    if (Array.isArray(entry)) {
      return count + entry.length;
    }
    return count;
  }, 0);
}

function computeFeedbackCount(feedback) {
  if (!isPlainObjectValue(feedback)) return 0;
  return Object.values(feedback).reduce((count, entry) => {
    if (Array.isArray(entry)) {
      return count + entry.length;
    }
    if (isPlainObjectValue(entry) && Array.isArray(entry.entries)) {
      return count + entry.entries.length;
    }
    return count;
  }, 0);
}

function estimateBackupSize(data) {
  if (typeof localStorage === 'undefined') return 0;
  try {
    const snapshot = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (typeof key !== 'string') continue;
      snapshot[key] = localStorage.getItem(key);
    }
    const payload = {
      version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '',
      generatedAt: new Date().toISOString(),
      settings: snapshot,
      data,
    };
    const json = JSON.stringify(payload);
    if (typeof TextEncoder !== 'undefined') {
      return new TextEncoder().encode(json).length;
    }
    return json.length;
  } catch (err) {
    console.warn('Could not calculate backup size preview', err);
    return 0;
  }
}

function formatSizeText(lang, langTexts, bytes) {
  const resolved = resolveLanguageCode(lang);
  if (!Number.isFinite(bytes) || bytes <= 0) {
    const zero = formatNumberForLang(resolved, 0, { maximumFractionDigits: 0 });
    const template = langTexts.storageTotalSizeValue || (texts.en?.storageTotalSizeValue) || '~%s KB';
    return template.replace('%s', zero);
  }
  const kilobytes = bytes / 1024;
  let options;
  if (kilobytes >= 100) {
    options = { maximumFractionDigits: 0 };
  } else if (kilobytes >= 10) {
    options = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
  } else {
    options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  }
  const formatted = formatNumberForLang(resolved, kilobytes, options);
  const template = langTexts.storageTotalSizeValue || (texts.en?.storageTotalSizeValue) || '~%s KB';
  return template.replace('%s', formatted);
}

function formatDeviceCategories(lang, categories) {
  if (!Array.isArray(categories) || !categories.length) return '';
  const resolved = resolveLanguageCode(lang);
  const lookup = (typeof categoryNames !== 'undefined' && categoryNames) || {};
  const localized = lookup[resolved] || lookup.en || {};
  const fallback = lookup.en || {};
  const items = categories
    .map(({ key, count }) => {
      const label = localized[key] || fallback[key] || key;
      const formattedCount = formatNumberForLang(resolved, count, { maximumFractionDigits: 0 });
      return { label, text: `${label} (${formattedCount})` };
    })
    .sort((a, b) => a.label.localeCompare(b.label, resolved, { sensitivity: 'base' }))
    .map((entry) => entry.text);
  return formatListForLang(resolved, items);
}

function createSummaryItemElement(item) {
  const li = document.createElement('li');
  li.className = 'storage-summary-item';
  const header = document.createElement('div');
  header.className = 'storage-summary-header';
  const label = document.createElement('span');
  label.className = 'storage-summary-label';
  label.textContent = item.label;
  header.appendChild(label);
  if (item.storageKey) {
    const code = document.createElement('code');
    code.className = 'storage-summary-key';
    code.textContent = item.storageKey;
    header.appendChild(code);
  }
  li.appendChild(header);
  if (item.value) {
    const valueElem = document.createElement('p');
    valueElem.className = 'storage-summary-value';
    valueElem.textContent = item.value;
    li.appendChild(valueElem);
  }
  if (item.description) {
    const desc = document.createElement('p');
    desc.className = 'storage-summary-description';
    desc.textContent = item.description;
    li.appendChild(desc);
  }
  if (item.extra) {
    const extras = Array.isArray(item.extra) ? item.extra : [item.extra];
    extras.filter(Boolean).forEach((text) => {
      const extraElem = document.createElement('p');
      extraElem.className = 'storage-summary-extra';
      extraElem.textContent = text;
      li.appendChild(extraElem);
    });
  }
  return li;
}

function updateStorageSummary() {
  if (!storageSummaryList) return;
  while (storageSummaryList.firstChild) {
    storageSummaryList.removeChild(storageSummaryList.firstChild);
  }
  const lang = resolveLanguageCode(currentLang);
  const langTexts = getLanguageTexts(lang);
  const exportedData = typeof exportAllData === 'function' ? exportAllData() : null;
  const data = isPlainObjectValue(exportedData) ? exportedData : {};
  const setups = isPlainObjectValue(data.setups) ? data.setups : {};
  const projectNames = Object.keys(setups);
  const totalProjects = projectNames.length;
  const autoBackups = projectNames.filter((name) => typeof name === 'string' && name.startsWith('auto-backup-')).length;
  const gearListCount = computeGearListCount(data.project, setups);
  const favoritesCount = computeFavoritesCount(data.favorites);
  const feedbackCount = computeFeedbackCount(data.feedback);
  const sessionData = data.session;
  const hasSession = Boolean(
    (isPlainObjectValue(sessionData) && Object.keys(sessionData).length)
    || (Array.isArray(sessionData) && sessionData.length)
    || (typeof sessionData === 'string' && sessionData.trim())
  );
  const deviceSummary = summarizeCustomDevices();
  const approxBytes = estimateBackupSize(data);

  const items = [
    {
      storageKey: 'cameraPowerPlanner_setups',
      label: langTexts.storageKeyProjects || 'Saved projects',
      value: formatCountText(lang, langTexts, 'storageProjectsCount', totalProjects),
      description: langTexts.storageKeyProjectsDesc || '',
      extra: autoBackups > 0
        ? formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups)
        : null,
    },
    {
      storageKey: 'cameraPowerPlanner_project',
      label: langTexts.storageKeyGearLists || 'Gear list snapshots',
      value: formatCountText(lang, langTexts, 'storageGearListsCount', gearListCount),
      description: langTexts.storageKeyGearListsDesc || '',
    },
    {
      storageKey: 'cameraPowerPlanner_devices',
      label: langTexts.storageKeyDevices || 'Custom or modified devices',
      value: formatCountText(lang, langTexts, 'storageDevicesCount', deviceSummary.total),
      description: langTexts.storageKeyDevicesDesc || '',
      extra: deviceSummary.total > 0 && deviceSummary.categories.length
        ? (langTexts.storageDeviceCategories || texts.en?.storageDeviceCategories || 'Affected categories: %s')
          .replace('%s', formatDeviceCategories(lang, deviceSummary.categories))
        : null,
    },
    {
      storageKey: 'cameraPowerPlanner_favorites',
      label: langTexts.storageKeyFavorites || 'Pinned favorites',
      value: formatCountText(lang, langTexts, 'storageFavoritesCount', favoritesCount),
      description: langTexts.storageKeyFavoritesDesc || '',
    },
    {
      storageKey: 'cameraPowerPlanner_feedback',
      label: langTexts.storageKeyFeedback || 'Runtime feedback',
      value: formatCountText(lang, langTexts, 'storageFeedbackCount', feedbackCount),
      description: langTexts.storageKeyFeedbackDesc || '',
    },
    {
      storageKey: 'cameraPowerPlanner_session',
      label: langTexts.storageKeySession || 'Unsaved session',
      value: hasSession
        ? langTexts.storageSessionStored || texts.en?.storageSessionStored || 'Stored'
        : langTexts.storageSessionNotStored || texts.en?.storageSessionNotStored || 'Not stored',
      description: langTexts.storageKeySessionDesc || '',
    },
    {
      storageKey: 'localStorage',
      label: langTexts.storageKeyTotalSize || 'Approximate backup size',
      value: formatSizeText(lang, langTexts, approxBytes),
      description: langTexts.storageKeyTotalSizeDesc || '',
    },
  ];

  items.forEach((item) => {
    storageSummaryList.appendChild(createSummaryItemElement(item));
  });

  if (storageSummaryEmpty) {
    const hasData = Boolean(
      totalProjects
      || gearListCount
      || deviceSummary.total
      || favoritesCount
      || feedbackCount
      || hasSession
    );
    if (hasData) {
      storageSummaryEmpty.setAttribute('hidden', '');
    } else {
      storageSummaryEmpty.removeAttribute('hidden');
    }
  }
}

if (settingsLogo) {
  settingsLogo.addEventListener('change', () => {
    const file = settingsLogo.files && settingsLogo.files[0];
    if (!file) {
      loadStoredLogoPreview();
      return;
    }
    if (file.type !== 'image/svg+xml' && !file.name.toLowerCase().endsWith('.svg')) {
      showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
      settingsLogo.value = '';
      loadStoredLogoPreview();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      renderSettingsLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
const settingsHighContrast = document.getElementById("settingsHighContrast");
const backupSettings = document.getElementById("backupSettings");
const restoreSettings = document.getElementById("restoreSettings");
const factoryResetButton = document.getElementById("factoryResetButton");
const restoreSettingsInput = document.getElementById("restoreSettingsInput");
const settingsShowAutoBackups = document.getElementById("settingsShowAutoBackups");
const aboutVersionElem = document.getElementById("aboutVersion");
const supportLink = document.getElementById("supportLink");
const settingsSave    = document.getElementById("settingsSave");
const settingsCancel  = document.getElementById("settingsCancel");
const featureSearch   = document.getElementById("featureSearch");
const featureList     = document.getElementById("featureList");
const featureMap      = new Map();
const normalizeSearchValue = value =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';
const updateFeatureSearchValue = (newValue, originalNormalized) => {
  if (!featureSearch || typeof newValue !== 'string') return;
  const trimmed = newValue.trim();
  if (!trimmed) {
    featureSearch.value = '';
    restoreFeatureSearchDefaults();
    return;
  }
  if (originalNormalized && trimmed.toLowerCase() === originalNormalized) {
    return;
  }
  featureSearch.value = newValue;
  restoreFeatureSearchDefaults();
};
const helpMap         = new Map();
const deviceMap       = new Map();
let runFeatureSearch = () => {};

let featureSearchEntries = [];
let featureSearchDefaultOptions = [];

const renderFeatureListOptions = values => {
  if (!featureList || !Array.isArray(values)) return;
  const fragment = document.createDocumentFragment();
  for (const value of values) {
    if (!value) continue;
    const option = document.createElement('option');
    option.value = value;
    fragment.appendChild(option);
  }
  featureList.innerHTML = '';
  featureList.appendChild(fragment);
};

function restoreFeatureSearchDefaults() {
  renderFeatureListOptions(featureSearchDefaultOptions);
}

const FEATURE_SEARCH_MATCH_PRIORITIES = {
  none: 1,
  partial: 2,
  keySubset: 3,
  keyPrefix: 4,
  token: 5,
  exactKey: 6
};

function scoreFeatureSearchEntry(entry, queryKey, queryTokens) {
  if (!entry || !entry.key) return null;
  const display = entry.display;
  if (!display) return null;
  const entryKey = entry.key;
  const entryTokens = Array.isArray(entry.tokens) ? entry.tokens : [];
  const validQueryTokens = Array.isArray(queryTokens)
    ? queryTokens.filter(Boolean)
    : [];
  const tokenDetails = validQueryTokens.length
    ? computeTokenMatchDetails(entryTokens, validQueryTokens)
    : { score: 0, matched: 0 };

  let bestType = 'none';
  let bestPriority = FEATURE_SEARCH_MATCH_PRIORITIES.none;
  const updateType = type => {
    const priority = FEATURE_SEARCH_MATCH_PRIORITIES[type] || FEATURE_SEARCH_MATCH_PRIORITIES.none;
    if (priority > bestPriority) {
      bestType = type;
      bestPriority = priority;
    }
  };

  if (queryKey) {
    if (entryKey === queryKey) {
      updateType('exactKey');
    }
    if (entryKey.startsWith(queryKey)) {
      updateType('keyPrefix');
    }
    if (queryKey.startsWith(entryKey)) {
      updateType('keySubset');
    }
    if (entryKey.includes(queryKey) || queryKey.includes(entryKey)) {
      updateType('partial');
    }
  }

  if (tokenDetails.score > 0) {
    updateType('token');
  }

  return {
    entry,
    matchType: bestType,
    priority: bestPriority,
    tokenScore: tokenDetails.score,
    tokenMatches: tokenDetails.matched,
    keyDistance: queryKey
      ? Math.abs(entryKey.length - queryKey.length)
      : Number.POSITIVE_INFINITY,
    keyLength: entryKey.length
  };
}

function updateFeatureSearchSuggestions(query) {
  if (!featureList) return;
  const trimmed = typeof query === 'string' ? query.trim() : '';
  if (!trimmed) {
    restoreFeatureSearchDefaults();
    return;
  }

  const queryKey = searchKey(trimmed);
  const queryTokens = searchTokens(trimmed);
  if (!queryKey && (!Array.isArray(queryTokens) || queryTokens.length === 0)) {
    restoreFeatureSearchDefaults();
    return;
  }

  const scored = featureSearchEntries
    .map(entry => scoreFeatureSearchEntry(entry, queryKey, queryTokens))
    .filter(Boolean);

  if (scored.length === 0) {
    restoreFeatureSearchDefaults();
    return;
  }

  const meaningful = scored.filter(
    item =>
      item.priority > FEATURE_SEARCH_MATCH_PRIORITIES.none || item.tokenScore > 0
  );

  const candidates = (meaningful.length > 0 ? meaningful : scored).sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    if (b.tokenScore !== a.tokenScore) return b.tokenScore - a.tokenScore;
    if (b.tokenMatches !== a.tokenMatches) return b.tokenMatches - a.tokenMatches;
    if (a.keyDistance !== b.keyDistance) return a.keyDistance - b.keyDistance;
    if (a.keyLength !== b.keyLength) return a.keyLength - b.keyLength;
    return a.entry.display.localeCompare(b.entry.display, undefined, {
      sensitivity: 'base'
    });
  });

  const values = [];
  const seen = new Set();
  for (const item of candidates.slice(0, 25)) {
    const value = item.entry.display;
    if (!value || seen.has(value)) continue;
    seen.add(value);
    values.push(value);
  }

  if (values.length === 0) {
    restoreFeatureSearchDefaults();
    return;
  }

  renderFeatureListOptions(values);
}
// Normalise strings for search comparisons by removing punctuation, diacritics
// and treating symbols like “&”/“+” as their word equivalents. British and
// American spelling variants are folded together so queries like “favourites”
// still match “Favorites”. Falls back to whitespace-stripping when no
// meaningful characters remain (e.g. emoji-only headings) so legacy behaviour
// is preserved for those edge cases.
const ROMAN_NUMERAL_VALUES = {
  i: 1,
  v: 5,
  x: 10,
  l: 50,
  c: 100,
  d: 500,
  m: 1000
};

const ROMAN_NUMERAL_PATTERN = /^[ivxlcdm]+$/;

const parseMarkSuffix = value => {
  if (!value) {
    return { cleaned: '', number: null };
  }
  const cleaned = value.replace(/[^a-z0-9]+/g, '');
  if (!cleaned) {
    return { cleaned: '', number: null };
  }
  let number = null;
  if (/^\d+$/.test(cleaned)) {
    number = parseInt(cleaned, 10);
  } else if (ROMAN_NUMERAL_PATTERN.test(cleaned)) {
    let total = 0;
    let prev = 0;
    for (let i = cleaned.length - 1; i >= 0; i -= 1) {
      const char = cleaned[i];
      const current = ROMAN_NUMERAL_VALUES[char];
      if (!current) {
        total = 0;
        break;
      }
      if (current < prev) {
        total -= current;
      } else {
        total += current;
        prev = current;
      }
    }
    if (total > 0) {
      number = total;
    }
  }
  return { cleaned, number };
};

const normaliseMarkVariants = str =>
  str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g, (_match, _prefix, rawValue) => {
    const { cleaned, number } = parseMarkSuffix(rawValue);
    if (!cleaned) return 'mk';
    const suffix = number != null ? String(number) : cleaned;
    return `mk${suffix}`;
  });

const SPELLING_VARIANTS = new Map([
  ['analyse', 'analyze'],
  ['analysed', 'analyzed'],
  ['analyses', 'analyzes'],
  ['analysing', 'analyzing'],
  ['behaviour', 'behavior'],
  ['behaviours', 'behaviors'],
  ['behavioural', 'behavioral'],
  ['behaviourally', 'behaviorally'],
  ['centre', 'center'],
  ['centres', 'centers'],
  ['colour', 'color'],
  ['colourful', 'colorful'],
  ['colouring', 'coloring'],
  ['colourings', 'colorings'],
  ['colourless', 'colorless'],
  ['colours', 'colors'],
  ['customisation', 'customization'],
  ['customisations', 'customizations'],
  ['customise', 'customize'],
  ['customised', 'customized'],
  ['customises', 'customizes'],
  ['customising', 'customizing'],
  ['defence', 'defense'],
  ['defences', 'defenses'],
  ['favour', 'favor'],
  ['favourable', 'favorable'],
  ['favourably', 'favorably'],
  ['favoured', 'favored'],
  ['favourite', 'favorite'],
  ['favourites', 'favorites'],
  ['favouring', 'favoring'],
  ['favours', 'favors'],
  ['licence', 'license'],
  ['licences', 'licenses'],
  ['localisation', 'localization'],
  ['localisations', 'localizations'],
  ['localise', 'localize'],
  ['localised', 'localized'],
  ['localises', 'localizes'],
  ['localising', 'localizing'],
  ['modelling', 'modeling'],
  ['modeller', 'modeler'],
  ['modellers', 'modelers'],
  ['optimisation', 'optimization'],
  ['optimisations', 'optimizations'],
  ['optimise', 'optimize'],
  ['optimised', 'optimized'],
  ['optimises', 'optimizes'],
  ['optimising', 'optimizing'],
  ['organisation', 'organization'],
  ['organisations', 'organizations'],
  ['organise', 'organize'],
  ['organised', 'organized'],
  ['organises', 'organizes'],
  ['organising', 'organizing'],
  ['personalisation', 'personalization'],
  ['personalisations', 'personalizations'],
  ['personalise', 'personalize'],
  ['personalised', 'personalized'],
  ['personalises', 'personalizes'],
  ['personalising', 'personalizing'],
  ['practise', 'practice'],
  ['practised', 'practiced'],
  ['practises', 'practices'],
  ['practising', 'practicing'],
  ['theatre', 'theater'],
  ['theatres', 'theaters'],
  ['traveller', 'traveler'],
  ['travellers', 'travelers'],
  ['travelling', 'traveling']
]);

const SPELLING_VARIANT_PATTERN =
  SPELLING_VARIANTS.size > 0
    ? new RegExp(`\\b(${Array.from(SPELLING_VARIANTS.keys()).join('|')})\\b`, 'g')
    : null;

const normalizeSpellingVariants = (str) => {
  if (!SPELLING_VARIANT_PATTERN) return str;
  return str.replace(SPELLING_VARIANT_PATTERN, match => SPELLING_VARIANTS.get(match) || match);
};

const searchKey       = str => {
  if (!str) return '';
  const value = String(str);
  let normalized = value.toLowerCase();
  if (typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD');
  }
  normalized = normalized
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae')
    .replace(/œ/g, 'oe')
    .replace(/ø/g, 'o')
    .replace(/&/g, 'and')
    .replace(/\+/g, 'plus')
    .replace(/[°º˚]/g, 'deg')
    .replace(/\bdegrees?\b/g, 'deg')
    .replace(/[×✕✖✗✘]/g, 'x');
  normalized = normalizeSpellingVariants(normalized);
  normalized = normaliseMarkVariants(normalized);
  const simplified = normalized.replace(/[^a-z0-9]+/g, '');
  if (simplified) return simplified;
  return value.toLowerCase().replace(/\s+/g, '');
};

const searchTokens = str => {
  if (!str) return [];
  let normalized = String(str).toLowerCase();
  if (typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD');
  }
  normalized = normalized
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae')
    .replace(/œ/g, 'oe')
    .replace(/ø/g, 'o')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[°º˚]/g, ' deg ')
    .replace(/\bdegrees?\b/g, ' deg ')
    .replace(/[×✕✖✗✘]/g, ' x by ');
  const tokens = new Set();
  const initialWords = [];
  const addToken = token => {
    if (!token) return;
    const cleaned = token.replace(/[^a-z0-9]+/g, '');
    if (cleaned) tokens.add(cleaned);
  };
  const processParts = (strToProcess, collectInitials = false) => {
    strToProcess.split(/\s+/).forEach(part => {
      if (!part) return;
      addToken(part);
      part
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .forEach(segment => {
          addToken(segment);
          if (collectInitials && /^[a-z]/.test(segment)) {
            initialWords.push(segment);
          }
        });
    });
  };
  processParts(normalized, true);
  const spellingNormalized = normalizeSpellingVariants(normalized);
  if (spellingNormalized !== normalized) {
    processParts(spellingNormalized);
  }
  const markNormalized = normaliseMarkVariants(spellingNormalized);
  if (markNormalized !== spellingNormalized) {
    processParts(markNormalized);
  }
  if (initialWords.length >= 2) {
    const MAX_INITIALISM_LENGTH = 6;
    const initials = initialWords.map(word => word[0]).filter(Boolean);
    const limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
    for (let start = 0; start < limit; start++) {
      let current = '';
      for (let index = start; index < limit; index++) {
        current += initials[index];
        if (current.length >= 2) {
          addToken(current);
        }
      }
    }
  }
  const markPattern = /\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g;
  let match;
  const variantSource = spellingNormalized || normalized;
  while ((match = markPattern.exec(variantSource)) !== null) {
    const prefix = match[1];
    const rawValue = match[2];
    const { cleaned, number } = parseMarkSuffix(rawValue);
    if (!cleaned) continue;
    const altPrefix = prefix === 'mk' ? 'mark' : 'mk';
    addToken(prefix);
    addToken(altPrefix);
    addToken(cleaned);
    addToken(`${prefix}${cleaned}`);
    addToken(`${altPrefix}${cleaned}`);
    if (number != null) {
      const numberToken = String(number);
      addToken(numberToken);
      addToken(`${prefix}${numberToken}`);
      addToken(`${altPrefix}${numberToken}`);
    }
  }
  return Array.from(tokens);
};

const FEATURE_CONTEXT_LIMIT = 3;

const toTitleCase = str =>
  str.replace(/\b([a-z])/g, (_, ch) => ch.toUpperCase());

const idToContextLabel = id => {
  if (!id) return '';
  const spaced = id
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  if (!spaced) return '';
  return toTitleCase(spaced);
};

const addUniqueContext = (contexts, seen, value, baseLabelLower) => {
  if (!value) return;
  const trimmed = value.trim();
  if (!trimmed) return;
  const normalized = trimmed.toLowerCase();
  if (normalized === baseLabelLower || seen.has(normalized)) return;
  contexts.push(trimmed);
  seen.add(normalized);
};

const collectFeatureContexts = (element, baseLabelLower) => {
  if (!element || !element.parentElement) return [];
  const contexts = [];
  const seen = new Set();
  let current = element.parentElement;
  while (current && contexts.length < FEATURE_CONTEXT_LIMIT) {
    if (typeof current.dataset?.featureContext === 'string') {
      current.dataset.featureContext
        .split(',')
        .map(part => part.trim())
        .filter(Boolean)
        .forEach(value => addUniqueContext(contexts, seen, value, baseLabelLower));
    }
    const labelledBy = current.getAttribute('aria-labelledby');
    if (labelledBy) {
      labelledBy
        .split(/\s+/)
        .map(id => id && document.getElementById(id))
        .filter(labelEl => labelEl && labelEl !== element)
        .forEach(labelEl => {
          addUniqueContext(
            contexts,
            seen,
            labelEl.textContent || '',
            baseLabelLower
          );
        });
    }
    const heading = current.querySelector(
      ':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > legend'
    );
    if (heading && heading !== element) {
      addUniqueContext(
        contexts,
        seen,
        heading.textContent || '',
        baseLabelLower
      );
    }
    if (current.id) {
      addUniqueContext(contexts, seen, idToContextLabel(current.id), baseLabelLower);
    }
    current = current.parentElement;
  }
  return contexts.reverse();
};

const buildFeatureSearchEntry = (element, { label, keywords = '' }) => {
  if (!element || !label) return null;
  const baseLabel = label.trim();
  if (!baseLabel) return null;
  const baseKey = searchKey(baseLabel);
  if (!baseKey) return null;
  const baseLabelLower = baseLabel.toLowerCase();
  const contextLabels = collectFeatureContexts(element, baseLabelLower);
  let combinedLabel = baseLabel;
  if (contextLabels.length) {
    combinedLabel = `${baseLabel} (${contextLabels.join(' › ')})`;
  }
  const combinedKeywords = [baseLabel, contextLabels.join(' '), keywords]
    .filter(Boolean)
    .join(' ');
  const entry = {
    element,
    label: baseLabel,
    baseLabel,
    displayLabel: combinedLabel,
    context: contextLabels,
    tokens: searchTokens(combinedKeywords),
    key: baseKey,
    optionValue: combinedLabel
  };
  const existing = featureMap.get(baseKey);
  if (!existing) {
    featureMap.set(baseKey, entry);
  } else if (Array.isArray(existing)) {
    if (!existing.some(item => item && item.element === element)) {
      existing.push(entry);
    }
  } else if (existing.element !== element) {
    featureMap.set(baseKey, [existing, entry]);
  }
  return entry;
};

const computeTokenMatchDetails = (entryTokens = [], queryTokens = []) => {
  if (!Array.isArray(entryTokens) || entryTokens.length === 0) {
    return { score: 0, matched: 0 };
  }
  const validQueryTokens = Array.isArray(queryTokens)
    ? queryTokens.filter(Boolean)
    : [];
  if (validQueryTokens.length === 0) {
    return { score: 0, matched: 0 };
  }
  let total = 0;
  let matched = 0;
  for (const token of validQueryTokens) {
    let best = 0;
    for (const entryToken of entryTokens) {
      if (!entryToken) continue;
      if (entryToken === token) {
        best = 3;
        break;
      }
      if (entryToken.startsWith(token) || token.startsWith(entryToken)) {
        best = Math.max(best, 2);
      } else if (entryToken.includes(token) || token.includes(entryToken)) {
        best = Math.max(best, 1);
      }
    }
    if (best > 0) {
      matched += 1;
      total += best;
    }
  }
  if (matched === 0) {
    return { score: 0, matched: 0 };
  }
  return { score: total, matched };
};

function findBestSearchMatch(map, key, tokens = []) {
  const queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
  const hasKey = Boolean(key);
  if (!hasKey && queryTokens.length === 0) return null;

  const toResult = (entryKey, entryValue, matchType, score = 0, matchedCount = 0) => ({
    key: entryKey,
    value: entryValue,
    matchType,
    score,
    matchedCount
  });

  const flattened = [];
  for (const [entryKey, entryValue] of map.entries()) {
    if (!entryValue) continue;
    if (Array.isArray(entryValue)) {
      for (const value of entryValue) {
        if (value) flattened.push([entryKey, value]);
      }
    } else {
      flattened.push([entryKey, entryValue]);
    }
  }

  if (hasKey) {
    const exactCandidates = flattened.filter(([entryKey]) => entryKey === key);
    if (exactCandidates.length) {
      let bestEntry = exactCandidates[0][1];
      let bestDetails = queryTokens.length > 0
        ? computeTokenMatchDetails(bestEntry?.tokens || [], queryTokens)
        : { score: Number.POSITIVE_INFINITY, matched: queryTokens.length };
      for (const [, entryValue] of exactCandidates.slice(1)) {
        if (!queryTokens.length) break;
        const details = computeTokenMatchDetails(entryValue?.tokens || [], queryTokens);
        if (
          details.score > bestDetails.score ||
          (details.score === bestDetails.score && details.matched > bestDetails.matched)
        ) {
          bestDetails = details;
          bestEntry = entryValue;
        }
      }
      return toResult(key, bestEntry, 'exactKey', bestDetails.score, bestDetails.matched);
    }
  }

  let bestTokenMatch = null;
  let bestTokenScore = 0;
  let bestTokenMatched = 0;
  let bestTokenKeyDistance = Number.POSITIVE_INFINITY;
  let bestPrefixMatch = null;
  let bestPrefixScore = Number.NEGATIVE_INFINITY;
  let bestPrefixMatched = 0;
  let bestPrefixLength = Number.POSITIVE_INFINITY;
  let bestSubsetMatch = null;
  let bestSubsetScore = Number.NEGATIVE_INFINITY;
  let bestSubsetMatched = 0;
  let bestSubsetLength = -1;
  let bestPartialMatch = null;
  let bestPartialScore = Number.NEGATIVE_INFINITY;
  let bestPartialMatched = 0;

  const keyLength = hasKey ? key.length : 0;

  for (const [entryKey, entryValue] of flattened) {
    if (!entryValue) continue;
    const entryTokens = entryValue?.tokens || [];
    const tokenDetails = queryTokens.length
      ? computeTokenMatchDetails(entryTokens, queryTokens)
      : { score: 0, matched: 0 };

    if (hasKey && entryKey.startsWith(key)) {
      const score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
      const candidate = toResult(entryKey, entryValue, 'keyPrefix', score, tokenDetails.matched);
      if (
        !bestPrefixMatch ||
        score > bestPrefixScore ||
        (score === bestPrefixScore &&
          (tokenDetails.matched > bestPrefixMatched ||
            (tokenDetails.matched === bestPrefixMatched && entryKey.length < bestPrefixLength)))
      ) {
        bestPrefixMatch = candidate;
        bestPrefixScore = score;
        bestPrefixMatched = tokenDetails.matched;
        bestPrefixLength = entryKey.length;
      }
    }

    if (queryTokens.length) {
      const distance = hasKey ? Math.abs(entryKey.length - keyLength) : Number.POSITIVE_INFINITY;
      if (
        tokenDetails.score > bestTokenScore ||
        (tokenDetails.score === bestTokenScore &&
          (tokenDetails.matched > bestTokenMatched ||
            (tokenDetails.matched === bestTokenMatched && distance < bestTokenKeyDistance)))
      ) {
        bestTokenMatch = toResult(entryKey, entryValue, 'token', tokenDetails.score, tokenDetails.matched);
        bestTokenScore = tokenDetails.score;
        bestTokenMatched = tokenDetails.matched;
        bestTokenKeyDistance = distance;
      }
    }

    if (hasKey && key.startsWith(entryKey)) {
      const score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
      const candidate = toResult(entryKey, entryValue, 'keySubset', score, tokenDetails.matched);
      if (
        !bestSubsetMatch ||
        score > bestSubsetScore ||
        (score === bestSubsetScore &&
          (entryKey.length > bestSubsetLength || tokenDetails.matched > bestSubsetMatched))
      ) {
        bestSubsetMatch = candidate;
        bestSubsetScore = score;
        bestSubsetMatched = tokenDetails.matched;
        bestSubsetLength = entryKey.length;
      }
    } else if (
      hasKey &&
      (entryKey.includes(key) || key.includes(entryKey))
    ) {
      const candidate = toResult(entryKey, entryValue, 'partial', tokenDetails.score, tokenDetails.matched);
      if (
        !bestPartialMatch ||
        tokenDetails.score > bestPartialScore ||
        (tokenDetails.score === bestPartialScore && tokenDetails.matched > bestPartialMatched)
      ) {
        bestPartialMatch = candidate;
        bestPartialScore = tokenDetails.score;
        bestPartialMatched = tokenDetails.matched;
      }
    }
  }

  if (bestTokenMatch && bestTokenScore > 0) {
    return bestTokenMatch;
  }
  if (bestPrefixMatch) {
    return bestPrefixMatch;
  }
  if (bestSubsetMatch) {
    return bestSubsetMatch;
  }
  if (bestPartialMatch) {
    return bestPartialMatch;
  }
  return null;
}

const STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
const existingDevicesHeading = document.getElementById("existingDevicesHeading");
const batteryComparisonSection = document.getElementById("batteryComparison");
const batteryTableElem = document.getElementById("batteryTable");
const breakdownListElem = document.getElementById("breakdownList");
const runtimeFeedbackBtn = document.getElementById("runtimeFeedbackBtn");
const generateGearListBtn = document.getElementById("generateGearListBtn");
const deleteGearListProjectBtn = document.getElementById('deleteGearListProjectBtn');
const gearListOutput = document.getElementById("gearListOutput");
const projectRequirementsOutput = document.getElementById("projectRequirementsOutput");

// Load accent color from localStorage
const DEFAULT_ACCENT_COLOR = '#001589';
let accentColor = DEFAULT_ACCENT_COLOR;
let prevAccentColor = accentColor;
const HIGH_CONTRAST_ACCENT_COLOR = '#ffffff';
const DEFAULT_ACCENT_NORMALIZED = DEFAULT_ACCENT_COLOR.toLowerCase();

const normalizeAccentValue = value =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

const DARK_MODE_ACCENT_BOOST_CLASS = 'dark-accent-boost';
const PINK_REFERENCE_COLOR = '#ff69b4';
const PINK_LUMINANCE_TOLERANCE = 0.06;
const BRIGHT_ACCENT_LUMINANCE_THRESHOLD = 0.6;
const BRIGHT_ACCENT_MIN_SATURATION = 0.35;

function computeRelativeLuminance(rgb) {
  if (!rgb || typeof rgb !== 'object') return 0;
  const clamp = component => {
    const numeric = Number(component);
    if (!Number.isFinite(numeric)) return 0;
    return Math.min(1, Math.max(0, numeric / 255));
  };
  const transform = value =>
    value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  const red = transform(clamp(rgb.r));
  const green = transform(clamp(rgb.g));
  const blue = transform(clamp(rgb.b));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function computeSaturation(rgb) {
  if (!rgb || typeof rgb !== 'object') return 0;
  const normalize = component => {
    const numeric = Number(component);
    if (!Number.isFinite(numeric)) return 0;
    return Math.max(0, Math.min(1, numeric / 255));
  };
  const r = normalize(rgb.r);
  const g = normalize(rgb.g);
  const b = normalize(rgb.b);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  if (max === min) return 0;
  return (max - min) / max;
}

const PINK_REFERENCE_LUMINANCE = (() => {
  const pinkRgb = parseColorToRgb(PINK_REFERENCE_COLOR);
  if (!pinkRgb) return 0.35;
  return computeRelativeLuminance(pinkRgb);
})();

function shouldEnableDarkModeAccentBoost({ color, highContrast } = {}) {
  if (typeof document === 'undefined') return false;
  if (!document.body || !document.body.classList.contains('dark-mode')) return false;
  if (document.body.classList.contains('pink-mode')) return false;
  if (highContrast) return false;
  if (typeof color !== 'string' || !color) return false;
  const rgb = parseColorToRgb(color);
  if (!rgb) return false;
  const luminance = computeRelativeLuminance(rgb);
  if (Math.abs(luminance - PINK_REFERENCE_LUMINANCE) <= PINK_LUMINANCE_TOLERANCE) {
    return true;
  }
  const saturation = computeSaturation(rgb);
  return (
    luminance >= BRIGHT_ACCENT_LUMINANCE_THRESHOLD &&
    saturation >= BRIGHT_ACCENT_MIN_SATURATION
  );
}

function refreshDarkModeAccentBoost(options = {}) {
  if (typeof document === 'undefined' || !document.body) return;
  const shouldEnable = shouldEnableDarkModeAccentBoost(options);
  document.body.classList.toggle(DARK_MODE_ACCENT_BOOST_CLASS, shouldEnable);
}

const isHighContrastActive = () =>
  typeof document !== 'undefined' &&
  (document.documentElement.classList.contains('high-contrast') ||
    (document.body && document.body.classList.contains('high-contrast')));

const hasCustomAccentSelection = () => {
  const normalized = normalizeAccentValue(accentColor);
  return normalized && normalized !== DEFAULT_ACCENT_NORMALIZED;
};

const shouldPreserveAccentInPinkMode = () =>
  hasCustomAccentSelection() || isHighContrastActive();

const applyAccentColor = (color) => {
  const highContrast = isHighContrastActive();
  const accentValue = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : color;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--accent-color', accentValue);
  if (highContrast) {
    rootStyle.removeProperty('--link-color');
  } else {
    rootStyle.setProperty('--link-color', color);
  }
  if (document.body) {
    const bodyStyle = document.body.style;
    bodyStyle.setProperty('--accent-color', accentValue);
    if (highContrast) {
      bodyStyle.removeProperty('--link-color');
    } else {
      bodyStyle.setProperty('--link-color', color);
    }
  }
  refreshDarkModeAccentBoost({ color: accentValue, highContrast });
};

const clearAccentColorOverrides = () => {
  const root = document.documentElement;
  const rootStyle = root && root.style;
  if (rootStyle) {
    rootStyle.removeProperty('--accent-color');
    rootStyle.removeProperty('--link-color');
  }
  if (document.body) {
    const bodyStyle = document.body.style;
    bodyStyle.removeProperty('--accent-color');
    bodyStyle.removeProperty('--link-color');
  }
  refreshDarkModeAccentBoost({ color: null, highContrast: isHighContrastActive() });
};

try {
  const storedAccent = localStorage.getItem('accentColor');
  if (storedAccent) {
    accentColor = storedAccent;
    applyAccentColor(accentColor);
  }
} catch (e) {
  console.warn('Could not load accent color', e);
}
prevAccentColor = accentColor;

if (accentColorInput) {
  accentColorInput.addEventListener('input', () => {
    if (document.body.classList.contains('pink-mode')) return;
    const color = accentColorInput.value;
    applyAccentColor(color);
  });
}

// Font preferences
let fontSize = '16';
let fontFamily = "'Ubuntu', sans-serif";

const uiScaleRoot = document.documentElement;
const defaultUIScaleValues = {
  '--page-padding': 20,
  '--gap-size': 10,
  '--button-size': 24,
  '--border-radius': 5,
  '--form-label-width': 150,
  '--form-label-min-width': 120,
  '--form-action-width': 110
};
const uiScaleProperties = Object.keys(defaultUIScaleValues);
const baseUIScaleValues = { ...defaultUIScaleValues };
let baseFontSize = 16;

if (uiScaleRoot) {
  try {
    const computedStyle = getComputedStyle(uiScaleRoot);
    const computedFontSize = parseFloat(computedStyle.fontSize);
    if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
      baseFontSize = computedFontSize;
    }
    for (const prop of uiScaleProperties) {
      const value = parseFloat(computedStyle.getPropertyValue(prop));
      if (Number.isFinite(value) && value > 0) {
        baseUIScaleValues[prop] = value;
      }
    }
  } catch (error) {
    console.warn('Unable to read computed styles for UI scaling', error);
  }
}

const customFontStorageKeyName =
  typeof CUSTOM_FONT_STORAGE_KEY_NAME !== 'undefined'
    ? CUSTOM_FONT_STORAGE_KEY_NAME
    : typeof CUSTOM_FONT_STORAGE_KEY !== 'undefined'
      ? CUSTOM_FONT_STORAGE_KEY
      : 'cameraPowerPlanner_customFonts';
const customFontEntries = new Map();

const SUPPORTED_FONT_TYPES = new Set([
  'font/ttf',
  'font/otf',
  'font/woff',
  'font/woff2',
  'application/font-woff',
  'application/font-woff2',
  'application/x-font-ttf',
  'application/x-font-opentype'
]);

const SUPPORTED_FONT_EXTENSIONS = ['.ttf', '.otf', '.ttc', '.woff', '.woff2'];

function loadCustomFontMetadataFromStorage() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(customFontStorageKeyName);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(entry => ({
        id: entry && typeof entry.id === 'string' ? entry.id : null,
        name: entry && typeof entry.name === 'string' ? entry.name : '',
        data: entry && typeof entry.data === 'string' ? entry.data : ''
      }))
      .filter(entry => entry.id && entry.name && entry.data);
  } catch (error) {
    console.warn('Failed to load stored custom fonts', error);
    return [];
  }
}

function persistCustomFontsToStorage() {
  if (typeof localStorage === 'undefined') return true;
  try {
    const payload = Array.from(customFontEntries.values()).map(entry => ({
      id: entry.id,
      name: entry.name,
      data: entry.data
    }));
    localStorage.setItem(customFontStorageKeyName, JSON.stringify(payload));
    return true;
  } catch (error) {
    console.warn('Could not save custom fonts', error);
    return false;
  }
}

function sanitizeCustomFontName(name) {
  if (!name) return 'Custom Font';
  const trimmed = String(name).trim();
  if (!trimmed) return 'Custom Font';
  return trimmed.replace(/\s+/g, ' ').slice(0, 80);
}

function deriveFontNameFromFile(file) {
  if (!file) return 'Custom Font';
  const rawName = typeof file.name === 'string' ? file.name : '';
  if (!rawName) return 'Custom Font';
  const withoutExtension = rawName.replace(/\.[^.]+$/, '');
  const candidate = withoutExtension || rawName;
  return sanitizeCustomFontName(candidate);
}

function ensureUniqueCustomFontName(baseName) {
  const sanitizedBase = sanitizeCustomFontName(baseName);
  if (!settingsFontFamily) return sanitizedBase;
  let candidate = sanitizedBase;
  let suffix = 2;
  while (
    Array.from(settingsFontFamily.options).some(
      opt => opt.value === buildFontFamilyValue(candidate)
    )
  ) {
    candidate = `${sanitizedBase} ${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function cssEscapeFontName(name) {
  if (typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function') {
    return CSS.escape(name);
  }
  return String(name).replace(/['"\\]/g, match => `\\${match}`);
}

async function registerCustomFontSource(name, dataUrl, id) {
  if (!name || !dataUrl || typeof document === 'undefined') return false;
  let loaded = false;
  if (
    typeof FontFace === 'function' &&
    document.fonts &&
    typeof document.fonts.add === 'function'
  ) {
    try {
      const fontFace = new FontFace(name, `url(${dataUrl})`);
      await fontFace.load();
      document.fonts.add(fontFace);
      loaded = true;
    } catch (error) {
      console.warn('Failed to load custom font via FontFace', error);
    }
  }
  if (!loaded) {
    try {
      const safeId = id || cssEscapeFontName(name).replace(/[^a-z0-9_-]+/gi, '-');
      const styleId = `customFontStyle-${safeId}`;
      let styleElement = document.getElementById(styleId);
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        if (document.head) {
          document.head.appendChild(styleElement);
        } else {
          document.body.appendChild(styleElement);
        }
      }
      const escapedName = cssEscapeFontName(name);
      styleElement.textContent = `@font-face { font-family: '${escapedName}'; src: url(${dataUrl}); font-display: swap; }`;
      loaded = true;
    } catch (styleError) {
      console.warn('Failed to inject custom font style', styleError);
      return false;
    }
  }
  return loaded;
}

async function applyStoredCustomFont(entry) {
  if (!entry || !entry.id) return null;
  const value = buildFontFamilyValue(entry.name);
  const { option } = ensureFontFamilyOption(value, entry.name, localFontsGroup, 'uploaded');
  if (option) {
    option.dataset.fontId = entry.id;
  }
  await registerCustomFontSource(entry.name, entry.data, entry.id);
  return value;
}

async function loadStoredCustomFonts() {
  const stored = loadCustomFontMetadataFromStorage();
  if (!stored.length) return;
  for (const entry of stored) {
    const normalized = {
      id: entry.id,
      name: sanitizeCustomFontName(entry.name),
      data: entry.data
    };
    customFontEntries.set(normalized.id, normalized);
    try {
      await applyStoredCustomFont(normalized);
    } catch (error) {
      console.warn('Failed to restore custom font', normalized.name, error);
    }
  }
}

function isSupportedFontFile(file) {
  if (!file) return false;
  const type = typeof file.type === 'string' ? file.type.toLowerCase() : '';
  if (type && SUPPORTED_FONT_TYPES.has(type)) {
    return true;
  }
  const name = typeof file.name === 'string' ? file.name.toLowerCase() : '';
  return SUPPORTED_FONT_EXTENSIONS.some(ext => name.endsWith(ext));
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (typeof FileReader !== 'function') {
      reject(new Error('FileReader is unavailable'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

async function addCustomFontFromData(name, dataUrl, { persist = true } = {}) {
  const uniqueName = ensureUniqueCustomFontName(name);
  const value = buildFontFamilyValue(uniqueName);
  const { option } = ensureFontFamilyOption(value, uniqueName, localFontsGroup, 'uploaded');
  if (!option) {
    return { name: uniqueName, value, persisted: false };
  }
  let entryId = option.dataset.fontId;
  if (!entryId) {
    entryId = `custom-font-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    option.dataset.fontId = entryId;
  }
  const entry = { id: entryId, name: uniqueName, data: dataUrl };
  customFontEntries.set(entryId, entry);
  await registerCustomFontSource(uniqueName, dataUrl, entryId);
  let persisted = true;
  if (persist && !persistCustomFontsToStorage()) {
    persisted = false;
  }
  return { name: uniqueName, value, persisted };
}

async function handleLocalFontFiles(fileList) {
  if (!fileList || fileList.length === 0) {
    setLocalFontsStatus('localFontsNoFonts');
    return;
  }
  if (localFontsButton) {
    localFontsButton.disabled = true;
  }
  const added = [];
  const unsupported = [];
  const failed = [];
  let persistFailure = false;
  for (const file of Array.from(fileList)) {
    if (!isSupportedFontFile(file)) {
      unsupported.push(file && typeof file.name === 'string' ? file.name : '');
      continue;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      if (!dataUrl) {
        failed.push(file && file.name ? file.name : '');
        continue;
      }
      const result = await addCustomFontFromData(deriveFontNameFromFile(file), dataUrl);
      added.push(result);
      if (!result.persisted) {
        persistFailure = true;
      }
    } catch (error) {
      console.warn('Failed to import custom font', error);
      failed.push(file && typeof file.name === 'string' ? file.name : '');
    }
  }
  if (added.length > 0) {
    if (settingsFontFamily) {
      settingsFontFamily.value = added[0].value;
    }
    setLocalFontsStatus(
      'localFontsAdded',
      added.map(item => item.name).join(', ')
    );
  } else if (unsupported.length > 0) {
    setLocalFontsStatus('localFontsUnsupportedFiles', unsupported.join(', '));
  } else if (failed.length > 0) {
    setLocalFontsStatus('localFontsError');
  } else {
    setLocalFontsStatus('localFontsNoFonts');
  }

  if (persistFailure) {
    const message = getLocalizedText('localFontsSaveError');
    if (message) {
      showNotification('warning', message);
    }
  }
  if (unsupported.length > 0 && added.length > 0) {
    const message = getLocalizedText('localFontsUnsupportedFiles');
    if (message) {
      showNotification(
        'warning',
        message.replace('%s', unsupported.join(', '))
      );
    }
  }
  if (failed.length > 0) {
    const message = getLocalizedText('localFontsError');
    if (message) {
      showNotification('error', message);
    }
  }

  if (localFontsButton) {
    localFontsButton.disabled = false;
  }
}

async function normalizeFontResults(result) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (typeof result[Symbol.asyncIterator] === 'function') {
    const fonts = [];
    for await (const font of result) {
      fonts.push(font);
    }
    return fonts;
  }
  if (typeof result[Symbol.iterator] === 'function') {
    return Array.from(result);
  }
  return [];
}

const queryAvailableLocalFonts = (() => {
  if (typeof window === 'undefined') return null;
  if (typeof window.queryLocalFonts === 'function') {
    return async options => normalizeFontResults(await window.queryLocalFonts(options));
  }
  if (
    typeof navigator !== 'undefined' &&
    navigator &&
    navigator.fonts &&
    typeof navigator.fonts.query === 'function'
  ) {
    const { fonts } = navigator;
    return async options => normalizeFontResults(await fonts.query.call(fonts, options));
  }
  return null;
})();

const supportsLocalFonts = typeof queryAvailableLocalFonts === 'function';
const canUploadFontFiles =
  !!(
    localFontsInput &&
    typeof window !== 'undefined' &&
    typeof window.FileReader === 'function' &&
    typeof localFontsInput.click === 'function'
  );

function getLocalizedText(key) {
  if (texts[currentLang] && texts[currentLang][key]) return texts[currentLang][key];
  if (texts.en && texts.en[key]) return texts.en[key];
  return '';
}

function guessFontFallback(name) {
  if (!name) return 'sans-serif';
  const lower = name.toLowerCase();
  if (/(mono|code|console|courier|menlo|fixed|inconsolata|monaco)/.test(lower)) {
    return 'monospace';
  }
  if (/(serif|times|garamond|georgia|baskerville|roman|palatino|bodoni|bookman)/.test(lower)) {
    return 'serif';
  }
  if (/(script|hand|brush|cursive|callig|marker)/.test(lower)) {
    return 'cursive';
  }
  return 'sans-serif';
}

function buildFontFamilyValue(name) {
  if (!name) return fontFamily;
  const escaped = name.replace(/\\/g, '\\').replace(/'/g, "\\'");
  return `'${escaped}', ${guessFontFallback(name)}`;
}

function extractFontLabel(value) {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const firstChar = trimmed[0];
  if (firstChar === "'" || firstChar === '"') {
    let result = '';
    for (let i = 1; i < trimmed.length; i += 1) {
      const ch = trimmed[i];
      if (ch === '\\') {
        if (i + 1 < trimmed.length) {
          result += trimmed[i + 1];
          i += 1;
        }
      } else if (ch === firstChar) {
        return result;
      } else {
        result += ch;
      }
    }
    return result;
  }
  const commaIdx = trimmed.indexOf(',');
  if (commaIdx !== -1) return trimmed.slice(0, commaIdx).trim();
  return trimmed;
}

function ensureFontFamilyOption(value, label, targetGroup, source) {
  if (!settingsFontFamily || !value) {
    return { option: null, created: false };
  }
  const existing = Array.from(settingsFontFamily.options).find(opt => opt.value === value);
  if (existing) {
    if (source) existing.dataset.source = source;
    if (label && !existing.textContent.trim()) existing.textContent = label;
    return { option: existing, created: false };
  }
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label || extractFontLabel(value);
  if (source) option.dataset.source = source;
  const container = targetGroup && typeof targetGroup.appendChild === 'function'
    ? targetGroup
    : settingsFontFamily;
  container.appendChild(option);
  return { option, created: true };
}

function setLocalFontsStatus(key, replacement) {
  if (!localFontsStatus || !key) {
    if (localFontsStatus) {
      localFontsStatus.textContent = '';
      localFontsStatus.setAttribute('hidden', '');
      delete localFontsStatus.dataset.statusKey;
      delete localFontsStatus.dataset.statusArg;
    }
    return;
  }
  const template = getLocalizedText(key);
  const hasReplacement = replacement !== undefined && replacement !== null;
  let message = template;
  if (hasReplacement) {
    const replacementText = String(replacement);
    message = template ? template.replace('%s', replacementText) : replacementText;
    localFontsStatus.dataset.statusArg = replacementText;
  } else {
    delete localFontsStatus.dataset.statusArg;
  }
  localFontsStatus.dataset.statusKey = key;
  localFontsStatus.textContent = message;
  localFontsStatus.removeAttribute('hidden');
}

async function requestLocalFonts() {
  if (!supportsLocalFonts || !localFontsButton || !queryAvailableLocalFonts) return;
  localFontsButton.disabled = true;
  try {
    const fonts = await queryAvailableLocalFonts();
    if (!Array.isArray(fonts) || fonts.length === 0) {
      setLocalFontsStatus('localFontsNoFonts');
      return;
    }
    const added = [];
    const duplicates = [];
    const seenValues = new Set();
    for (const font of fonts) {
      const rawName = font && (font.family || font.fullName || font.postscriptName);
      const name = rawName ? String(rawName).trim() : '';
      if (!name) continue;
      const value = buildFontFamilyValue(name);
      if (seenValues.has(value)) {
        duplicates.push(name);
        continue;
      }
      const { option, created } = ensureFontFamilyOption(
        value,
        name,
        localFontsGroup,
        'local'
      );
      if (!option) continue;
      seenValues.add(option.value);
      if (created) {
        added.push({ name, value: option.value });
      } else {
        duplicates.push(name);
      }
    }
    if (added.length > 0) {
      if (settingsFontFamily) {
        settingsFontFamily.value = added[0].value;
      }
      setLocalFontsStatus(
        'localFontsAdded',
        added.map(item => item.name).join(', ')
      );
    } else if (duplicates.length > 0) {
      setLocalFontsStatus('localFontsAlreadyAdded', duplicates.join(', '));
    } else {
      setLocalFontsStatus('localFontsNoFonts');
    }
  } catch (err) {
    console.error('Could not access local fonts', err);
    if (
      err &&
      (err.name === 'NotAllowedError' || err.name === 'SecurityError') &&
      canUploadFontFiles
    ) {
      setLocalFontsStatus('localFontsPermissionNeeded');
    } else {
      setLocalFontsStatus('localFontsError');
    }
  } finally {
    localFontsButton.disabled = false;
  }
}

if (localFontsButton) {
  if (supportsLocalFonts || canUploadFontFiles) {
    localFontsButton.removeAttribute('hidden');
    localFontsButton.addEventListener('click', () => {
      if (supportsLocalFonts) {
        requestLocalFonts();
      } else if (canUploadFontFiles && localFontsInput) {
        localFontsInput.click();
      }
    });
    if (!supportsLocalFonts && canUploadFontFiles) {
      setLocalFontsStatus('localFontsFileFallback');
    }
  } else {
    setLocalFontsStatus('localFontsUnsupported');
  }
}

if (localFontsInput) {
  localFontsInput.addEventListener('change', () => {
    if (localFontsInput.files && localFontsInput.files.length > 0) {
      handleLocalFontFiles(localFontsInput.files);
    } else {
      setLocalFontsStatus('localFontsNoFonts');
    }
    try {
      localFontsInput.value = '';
    } catch {
      // ignore reset errors
    }
  });
}

loadStoredCustomFonts().catch(error => {
  console.warn('Unable to restore stored custom fonts', error);
});

function applyFontSize(size) {
  const numericSize = parseFloat(size);
  if (!Number.isFinite(numericSize) || numericSize <= 0) {
    return;
  }

  document.documentElement.style.fontSize = `${numericSize}px`;

  if (!Number.isFinite(baseFontSize) || baseFontSize <= 0) {
    return;
  }

  const scale = numericSize / baseFontSize;
  for (const prop of uiScaleProperties) {
    const baseValue = baseUIScaleValues[prop];
    if (!Number.isFinite(baseValue) || baseValue <= 0) continue;
    document.documentElement.style.setProperty(prop, `${baseValue * scale}px`);
  }
  document.documentElement.style.setProperty('--ui-scale', String(scale));
}

function applyFontFamily(family) {
  document.documentElement.style.setProperty('--font-family', family);
}

try {
  const storedSize = localStorage.getItem('fontSize');
  if (storedSize) {
    fontSize = storedSize;
    applyFontSize(fontSize);
  }
  const storedFamily = localStorage.getItem('fontFamily');
  if (storedFamily) {
    fontFamily = storedFamily;
    applyFontFamily(fontFamily);
  }
} catch (e) {
  console.warn('Could not load font preferences', e);
}

if (settingsFontSize) settingsFontSize.value = fontSize;
if (settingsFontFamily) {
  const hasStoredOption = Array.from(settingsFontFamily.options).some(
    opt => opt.value === fontFamily
  );
  if (!hasStoredOption && fontFamily) {
    ensureFontFamilyOption(fontFamily, extractFontLabel(fontFamily), localFontsGroup, 'local');
  }
  settingsFontFamily.value = fontFamily;
}

const revertAccentColor = () => {
  if (document.body && document.body.classList.contains('pink-mode')) {
    if (shouldPreserveAccentInPinkMode()) {
      applyAccentColor(prevAccentColor);
    } else {
      clearAccentColorOverrides();
    }
    return;
  }
  applyAccentColor(prevAccentColor);
};

function populateFeatureSearch() {
  if (!featureList) return;
  featureMap.clear();
  helpMap.clear();
  deviceMap.clear();
  featureSearchEntries = [];
  featureSearchDefaultOptions = [];
  const registerOption = value => {
    if (value) featureSearchDefaultOptions.push(value);
  };
  document
    .querySelectorAll('h2[id], legend[id], h3[id], h4[id]')
    .forEach(el => {
      if (helpDialog && helpDialog.contains(el)) return;
      const name = el.textContent.trim();
      if (!name) return;
      const keywords = el.dataset?.searchKeywords || el.getAttribute('data-search-keywords') || '';
      const entry = buildFeatureSearchEntry(el, { label: name, keywords });
      if (!entry || !entry.key) return;
      const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
      if (!display) return;
      registerOption(display);
      featureSearchEntries.push({
        type: 'feature',
        key: entry.key,
        display,
        tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
        value: entry
      });
    });
  if (helpDialog) {
    helpDialog.querySelectorAll('section[data-help-section]').forEach(section => {
      const heading = section.querySelector('h3');
      if (!heading) return;
      const label = heading.textContent.trim();
      if (!label) return;
      const keywords = section.dataset.helpKeywords || '';
      const key = searchKey(label);
      const tokens = searchTokens(`${label} ${keywords}`.trim());
      const helpEntry = {
        section,
        label,
        tokens
      };
      helpMap.set(key, helpEntry);
      const optionValue = `${label} (help)`;
      registerOption(optionValue);
      featureSearchEntries.push({
        type: 'help',
        key,
        display: optionValue,
        tokens,
        value: helpEntry
      });
    });
  }

  document.querySelectorAll('select').forEach(sel => {
    sel.querySelectorAll('option').forEach(opt => {
      const name = opt.textContent.trim();
      if (!name || opt.value === 'None') return;
      const key = searchKey(name);
      if (!deviceMap.has(key)) {
        const keywords =
          opt.dataset?.searchKeywords ||
          opt.getAttribute('data-search-keywords') ||
          sel.dataset?.searchKeywords ||
          sel.getAttribute('data-search-keywords') ||
          '';
        const tokens = searchTokens(`${name} ${keywords}`.trim());
        const deviceEntry = {
          select: sel,
          value: opt.value,
          label: name,
          tokens
        };
        deviceMap.set(key, deviceEntry);
        registerOption(name);
        featureSearchEntries.push({
          type: 'device',
          key,
          display: name,
          tokens,
          value: deviceEntry
        });
      }
    });
  });
  renderFeatureListOptions(featureSearchDefaultOptions);
  if (featureSearch && featureSearch.value) {
    updateFeatureSearchSuggestions(featureSearch.value);
  }
}

function setEditProjectBtnText() {
  const btn = document.getElementById('editProjectBtn');
  if (btn) {
    btn.textContent = texts[currentLang].editProjectBtn;
    btn.setAttribute('title', texts[currentLang].editProjectBtn);
    btn.setAttribute('data-help', texts[currentLang].editProjectBtn);
  }
}

function ensureEditProjectButton() {
  let container = null;
  if (projectRequirementsOutput && !projectRequirementsOutput.classList.contains('hidden')) {
    container = projectRequirementsOutput;
  } else if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
    container = gearListOutput;
  }
  if (!container) return;
  let btn = document.getElementById('editProjectBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'editProjectBtn';
    btn.addEventListener('click', () => {
      populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
      populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
      populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
      openDialog(projectDialog);
    });
  }
  const title = container.querySelector('h2');
  if (title && btn.parentElement !== container) {
    title.insertAdjacentElement('afterend', btn);
  } else if (!title && btn.parentElement !== container) {
    container.prepend(btn);
  }
  setEditProjectBtnText();
}

function updateGearListButtonVisibility() {
  const hasGear =
    gearListOutput &&
    !gearListOutput.classList.contains('hidden') &&
    gearListOutput.innerHTML.trim() !== '';
  if (hasGear) {
    generateGearListBtn.classList.add('hidden');
    if (deleteGearListProjectBtn) {
      deleteGearListProjectBtn.classList.remove('hidden');
    }
    ensureEditProjectButton();
  } else {
    generateGearListBtn.classList.remove('hidden');
    if (deleteGearListProjectBtn) {
      deleteGearListProjectBtn.classList.add('hidden');
    }
    const btn = document.getElementById('editProjectBtn');
    if (btn) btn.remove();
  }
}

function ensureGearTableCategoryGrouping(table) {
  if (!table) return;
  const doc = table.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  const existingCategoryGroups = table.querySelectorAll('tbody.category-group');
  if (existingCategoryGroups.length) {
    existingCategoryGroups.forEach(group => {
      if (!group.classList.contains('category-group')) {
        group.classList.add('category-group');
      }
    });
    table.querySelectorAll('tbody').forEach(group => {
      if (group.querySelector('tr.category-row')) {
        group.classList.add('category-group');
      }
    });
    return;
  }
  const rows = Array.from(table.rows || []);
  if (!rows.length) return;
  const newGroups = [];
  let currentGroup = null;
  rows.forEach(row => {
    if (row.classList.contains('category-row')) {
      currentGroup = doc.createElement('tbody');
      currentGroup.className = 'category-group';
      currentGroup.appendChild(row);
      newGroups.push(currentGroup);
    } else {
      if (!currentGroup) {
        currentGroup = doc.createElement('tbody');
        currentGroup.className = 'category-group';
        newGroups.push(currentGroup);
      }
      currentGroup.appendChild(row);
    }
  });
  Array.from(table.tBodies || []).forEach(body => {
    if (!body.rows.length || !body.classList.contains('category-group')) {
      body.remove();
    }
  });
  newGroups.forEach(group => {
    if (group.rows.length) table.appendChild(group);
  });
}

function splitGearListHtml(html) {
  if (!html) return { projectHtml: '', gearHtml: '' };
  // Support legacy storage formats where the gear list and project
  // requirements were saved separately as an object.
  if (typeof html === 'object') {
    const legacyProject = html.projectHtml || html.project || '';
    const legacyGear = html.gearHtml || html.gear || '';
    if (legacyProject || legacyGear) {
      return { projectHtml: legacyProject, gearHtml: legacyGear };
    }
    // Some old exports used a gearList property.
    html = html.gearList || '';
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('h2');
  const h3s = doc.querySelectorAll('h3');
  const reqHeading = h3s[0];
  const reqGrid = doc.querySelector('.requirements-grid');
  const titleHtml = title ? title.outerHTML : '';
  const projectHtml = reqHeading && reqGrid ? titleHtml + reqHeading.outerHTML + reqGrid.outerHTML : '';
  const projectName = title ? title.textContent : '';
  let table = doc.querySelector('.gear-table');
  if (!table) {
    const tables = Array.from(doc.querySelectorAll('table'));
    if (tables.length === 1) {
      table = tables[0];
    } else if (tables.length > 1) {
      const tableAfterGearHeading = tables.find(tbl => {
        const prev = tbl.previousElementSibling;
        return prev && prev.matches('h3') && /gear list/i.test(prev.textContent || '');
      });
      table = tableAfterGearHeading || tables[0];
    }
  }
  const gearHeadingHtml = projectName ? `<h2>Gear List: “${projectName}”</h2>` : '';
  let gearHtml = '';
  if (table) {
    ensureGearTableCategoryGrouping(table);
    gearHtml = gearHeadingHtml + table.outerHTML;
  }
  if (!gearHtml) {
    const bodyClone = doc.body ? doc.body.cloneNode(true) : null;
    const bodyHtml = doc.body ? doc.body.innerHTML.trim() : '';
    if (bodyClone) {
      if (title) {
        const cloneTitle = bodyClone.querySelector('h2');
        if (cloneTitle) cloneTitle.remove();
      }
      if (reqHeading) {
        const cloneHeading = bodyClone.querySelector('h3');
        if (cloneHeading) cloneHeading.remove();
      }
      if (reqGrid) {
        const cloneGrid = bodyClone.querySelector('.requirements-grid');
        if (cloneGrid) cloneGrid.remove();
      }
      const fallbackHtml = bodyClone.innerHTML.trim();
      if (fallbackHtml) {
        gearHtml = fallbackHtml;
      } else if (bodyHtml) {
        gearHtml = bodyHtml;
      }
    } else if (bodyHtml) {
      gearHtml = bodyHtml;
    }
  }
  return { projectHtml, gearHtml };
}

// Expose for modules like overview.js
if (typeof global !== 'undefined') {
  global.splitGearListHtml = splitGearListHtml;
}

function describeRequirement(field, value) {
  const val = value || '';
  const parts = [];
  if (field === 'requiredScenarios') {
    const scenarios = val.split(',').map(s => s.trim());
    if (scenarios.includes('Rain Machine') || scenarios.includes('Extreme rain')) {
      parts.push('Adds rain deflector and cables for rain use.');
    }
    if (scenarios.includes('Trinity') || scenarios.includes('Steadicam')) {
      parts.push('Includes D-Tap splitters and extension cables for Steadicam/Trinity rigs.');
    }
    if (scenarios.includes('Gimbal')) {
      parts.push('Adds gimbal rigging and power accessories.');
    }
  } else if (field === 'mattebox') {
    const v = val.toLowerCase();
    if (v.includes('swing')) {
      parts.push('Adds ARRI LMB 4x5 Pro Set and accessories.');
    } else if (v.includes('rod')) {
      parts.push('Adds ARRI LMB 4x5 15mm LWS Set and accessories.');
    } else if (v.includes('clamp')) {
      parts.push('Adds ARRI LMB 4x5 Clamp-On Set with adapter rings.');
    }
  } else if (field === 'cameraHandle') {
    const selections = val.split(',').map(s => s.trim());
    if (selections.includes('Hand Grips')) {
      parts.push('Adds SHAPE Telescopic Handle kit.');
    }
    if (selections.includes('Handle Extension')) {
      parts.push('Adds ARRI HEX-3 handle extension.');
    }
    if (selections.includes('L-Handle')) {
      parts.push('Adds ARRI Handle Extension Set.');
    }
  } else if (field === 'viewfinderExtension') {
    if (val) parts.push('Adds viewfinder extension to support accessories.');
  } else if (field === 'gimbal') {
    if (val) parts.push('Includes selected gimbal and support accessories.');
  } else if (field === 'easyrig') {
    if (val && val !== 'no further stabilisation') {
      parts.push('Adds selected stabiliser to gear list.');
    }
  } else if (field === 'codec') {
    if (val) parts.push('Notes chosen codec for post-production reference.');
  } else if (field === 'monitoringConfiguration') {
    if (val)
      parts.push('Adds default monitors and cable sets for each role.');
  } else if (field === 'videoDistribution') {
    if (val) parts.push('Includes distribution hardware for the selected method.');
  }
  return parts.join(' ');
}

function displayGearAndRequirements(html) {
  const { projectHtml, gearHtml } = splitGearListHtml(html);
  if (projectRequirementsOutput) {
    if (projectHtml) {
      projectRequirementsOutput.innerHTML = projectHtml;
      projectRequirementsOutput.classList.remove('hidden');
      projectRequirementsOutput.querySelectorAll('.requirement-box').forEach(box => {
        const label = box.querySelector('.req-label')?.textContent || '';
        const value = box.querySelector('.req-value')?.textContent || '';
        const field = box.getAttribute('data-field') || '';
        const baseDesc = value ? `${label}: ${value}` : label;
        const logic = describeRequirement(field, value);
        const desc = logic ? `${baseDesc} – ${logic}` : baseDesc;
        box.setAttribute('title', desc);
        box.setAttribute('data-help', desc);
        box.querySelectorAll('.req-label, .req-value').forEach(el => {
          el.setAttribute('title', desc);
          el.setAttribute('data-help', desc);
        });
      });
      adjustGearListSelectWidths(projectRequirementsOutput);
    } else {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }
  if (gearListOutput) {
    if (gearHtml) {
      gearListOutput.innerHTML = gearHtml;
      gearListOutput.classList.remove('hidden');
      applyFilterSelectionsToGearList();
      renderFilterDetails();
      const findDevice = name => {
        for (const [catName, cat] of Object.entries(devices)) {
          if (cat && typeof cat === 'object') {
            if (cat[name]) return { info: cat[name], category: catName };
            for (const sub of Object.values(cat)) {
              if (sub && sub[name]) return { info: sub[name], category: catName };
            }
          }
        }
        return { info: null, category: '' };
      };
      gearListOutput.querySelectorAll('.gear-item').forEach(span => {
        const name = span.getAttribute('data-gear-name');
        const { info, category } = findDevice(name);
        const countMatch = span.textContent.trim().match(/^(\d+)x\s+/);
        const count = countMatch ? `${countMatch[1]}x ` : '';
        const parts = [];
        parts.push(`${count}${name}`.trim());
        if (category) parts.push(`Category: ${category}`);
        if (info) {
          let summary = generateConnectorSummary(info);
          summary = summary
            ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
            : '';
          if (info.notes)
            summary = summary ? `${summary}; Notes: ${info.notes}` : info.notes;
          if (summary) parts.push(summary);
        }
        const desc = parts.join(' – ');
        span.setAttribute('title', desc);
        span.setAttribute('data-help', desc);
        span.querySelectorAll('select').forEach(sel => {
          sel.setAttribute('title', desc);
          sel.setAttribute('data-help', desc);
          initFavoritableSelect(sel);
        });
      });
      // Standalone selects (not wrapped in .gear-item) still need descriptive help
      gearListOutput.querySelectorAll('select').forEach(sel => {
        if (sel.getAttribute('data-help')) return;
        const selected = sel.selectedOptions && sel.selectedOptions[0];
        const name = selected ? selected.textContent.trim() : sel.value;
        const { info, category } = findDevice(name);
        const parts = [];
        parts.push(`1x ${name}`.trim());
        if (category) parts.push(`Category: ${category}`);
        if (info) {
          let summary = generateConnectorSummary(info);
          summary = summary
            ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
            : '';
          if (info.notes)
            summary = summary ? `${summary}; Notes: ${info.notes}` : info.notes;
          if (summary) parts.push(summary);
        }
        const desc = parts.join(' – ');
        sel.setAttribute('title', desc);
        sel.setAttribute('data-help', desc);
        initFavoritableSelect(sel);
      });
      adjustGearListSelectWidths(gearListOutput);
    } else {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
  }
  if (loadedSetupState) {
    setSliderBowlValue(loadedSetupState.sliderBowl || '');
    setEasyrigValue(loadedSetupState.easyrig || '');
  }
  updateGearListButtonVisibility();
}
function getSliderBowlSelect() {
  return gearListOutput ? gearListOutput.querySelector('#gearListSliderBowl') : null;
}
function getSliderBowlValue() {
  const sel = getSliderBowlSelect();
  if (sel) return sel.value;
  return loadedSetupState && loadedSetupState.sliderBowl ? loadedSetupState.sliderBowl : '';
}
function setSliderBowlValue(val) {
  const sel = getSliderBowlSelect();
  if (sel && val && Array.from(sel.options).some(opt => opt.value === val)) {
    sel.value = val;
    adjustGearListSelectWidth(sel);
  }
}
function getEasyrigSelect() {
  return gearListOutput ? gearListOutput.querySelector('#gearListEasyrig') : null;
}
function getEasyrigValue() {
  const sel = getEasyrigSelect();
  if (sel) return sel.value;
  return loadedSetupState && loadedSetupState.easyrig ? loadedSetupState.easyrig : '';
}
function setEasyrigValue(val) {
  const sel = getEasyrigSelect();
  if (sel && val && Array.from(sel.options).some(opt => opt.value === val)) {
    sel.value = val;
    adjustGearListSelectWidth(sel);
  }
}

let currentProjectInfo = null;
let loadedSetupState = null;
let loadedSetupStateSignature = '';
let restoringSession = false;
let skipNextGearListRefresh = false;

let defaultProjectInfoSnapshot = null;

function sanitizeProjectInfoValue(value) {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  }
  if (typeof value === 'number') {
    return Number.isNaN(value) ? undefined : value;
  }
  if (typeof value === 'boolean') {
    return value ? value : undefined;
  }
  if (Array.isArray(value)) {
    const sanitized = value
      .map((item) => sanitizeProjectInfoValue(item))
      .filter((item) => item !== undefined);
    return sanitized.length ? sanitized : undefined;
  }
  if (typeof value === 'object') {
    const sanitizedObj = sanitizeProjectInfo(value);
    return sanitizedObj || undefined;
  }
  return undefined;
}

function sanitizeProjectInfo(info) {
  if (!info || typeof info !== 'object') return null;
  const result = {};
  Object.entries(info).forEach(([key, value]) => {
    const sanitized = sanitizeProjectInfoValue(value);
    if (sanitized !== undefined) {
      result[key] = sanitized;
    }
  });
  return Object.keys(result).length > 0 ? result : null;
}

function projectInfoEquals(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!projectInfoEquals(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => projectInfoEquals(a[key], b[key]));
  }
  return false;
}

function ensureDefaultProjectInfoSnapshot() {
  if (defaultProjectInfoSnapshot !== null) return;
  if (!projectForm) {
    defaultProjectInfoSnapshot = {};
    return;
  }
  const baseInfo = collectProjectFormData ? collectProjectFormData() : {};
  baseInfo.sliderBowl = getSliderBowlValue();
  baseInfo.easyrig = getEasyrigValue();
  defaultProjectInfoSnapshot = sanitizeProjectInfo(baseInfo) || {};
}

function deriveProjectInfo(info) {
  ensureDefaultProjectInfoSnapshot();
  const sanitized = sanitizeProjectInfo(info);
  if (!sanitized) return null;
  if (
    defaultProjectInfoSnapshot &&
    projectInfoEquals(sanitized, defaultProjectInfoSnapshot)
  ) {
    return null;
  }
  return sanitized;
}

function setCurrentProjectInfo(info) {
  currentProjectInfo = info;
}

function getCurrentProjectInfo() {
  return currentProjectInfo;
}

function stableStringify(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    return `[${value.map(item => stableStringify(item)).join(',')}]`;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value).sort();
    const entries = keys.map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  return JSON.stringify(value);
}

function computeSetupSignature(state) {
  if (!state) return '';
  return [
    state.camera || '',
    state.monitor || '',
    state.video || '',
    state.cage || '',
    stableStringify(state.motors || []),
    stableStringify(state.controllers || []),
    state.distance || '',
    state.batteryPlate || '',
    state.battery || '',
    state.batteryHotswap || '',
    state.sliderBowl || '',
    state.easyrig || '',
    stableStringify(state.projectInfo || null),
    stableStringify(state.autoGearRules || null)
  ].join('||');
}

function storeLoadedSetupState(state) {
  loadedSetupState = state;
  loadedSetupStateSignature = computeSetupSignature(state);
}

function getCurrentSetupState() {
  const info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  const projectInfo = deriveProjectInfo(info);
  const state = {
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value,
    batteryHotswap: hotswapSelect.value,
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo
  };
  const projectRules = getProjectScopedAutoGearRules();
  if (projectRules && projectRules.length) {
    state.autoGearRules = projectRules;
  }
  return state;
}

function hasAnyDeviceSelection(state) {
  if (!state) return false;
  const isMeaningfulSelection = (value) => {
    if (Array.isArray(value)) {
      return value.some((item) => isMeaningfulSelection(item));
    }
    if (value == null) return false;
    const normalized = typeof value === 'string' ? value.trim() : value;
    if (!normalized) return false;
    if (typeof normalized === 'string' && normalized.toLowerCase() === 'none') {
      return false;
    }
    return true;
  };

  const primarySelections = [
    state.camera,
    state.monitor,
    state.video,
    state.cage,
    state.batteryPlate,
    state.battery,
    state.batteryHotswap
  ];

  if (primarySelections.some((value) => isMeaningfulSelection(value))) {
    return true;
  }

  if (isMeaningfulSelection(state.motors)) {
    return true;
  }

  if (isMeaningfulSelection(state.controllers)) {
    return true;
  }

  return false;
}

function checkSetupChanged() {
  if (!saveSetupBtn) return;
  const langTexts = texts[currentLang] || {};
  const fallbackTexts = texts.en || {};
  const saveLabel = langTexts.saveSetupBtn || fallbackTexts.saveSetupBtn || '';
  const updateLabel = langTexts.updateSetupBtn || fallbackTexts.updateSetupBtn || saveLabel;
  const typedName = setupNameInput && typeof setupNameInput.value === 'string'
    ? setupNameInput.value.trim()
    : '';
  const selectedName = setupSelect && typeof setupSelect.value === 'string'
    ? setupSelect.value
    : '';
  if (selectedName && typedName && typedName !== selectedName) {
    setButtonLabelWithIcon(saveSetupBtn, updateLabel);
    return;
  }
  if (
    loadedSetupState &&
    selectedName &&
    typedName === selectedName
  ) {
    const currentSignature = computeSetupSignature(getCurrentSetupState());
    if (currentSignature !== loadedSetupStateSignature) {
      setButtonLabelWithIcon(saveSetupBtn, updateLabel);
      return;
    }
  }
  setButtonLabelWithIcon(saveSetupBtn, saveLabel);
}

const projectDialog = document.getElementById("projectDialog");
const projectForm = document.getElementById("projectForm");
const filterSelectElem = document.getElementById('filter');
const filterDetailsStorage = document.getElementById('filterDetails');
const matteboxSelect = document.getElementById('mattebox');
const projectCancelBtn = document.getElementById("projectCancel");
const feedbackDialog = document.getElementById("feedbackDialog");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackCancelBtn = document.getElementById("fbCancel");
const feedbackUseLocationBtn = document.getElementById("fbUseLocationBtn");
if (feedbackCancelBtn) {
  const cancelLabel =
    feedbackCancelBtn.textContent?.trim() ||
    texts[currentLang]?.cancelEditBtn ||
    texts.en?.cancelEditBtn ||
    'Cancel';
  setButtonLabelWithIcon(feedbackCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
}
const loadFeedbackSafe = typeof loadFeedback === 'function' ? loadFeedback : () => ({});
const saveFeedbackSafe = typeof saveFeedback === 'function' ? saveFeedback : () => {};
const setupDiagramContainer = document.getElementById("diagramArea");
const diagramLegend = document.getElementById("diagramLegend");
const downloadDiagramBtn = document.getElementById("downloadDiagram");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetViewBtn = document.getElementById("resetView");
const gridSnapToggleBtn = document.getElementById("gridSnapToggle");
const diagramHint = document.getElementById("diagramHint");

if (projectForm) {
    projectForm.querySelectorAll('select[multiple]').forEach(sel => {
        sel.addEventListener('mousedown', e => {
            if (e.target.tagName !== 'OPTION') return;
            e.preventDefault();
            const option = e.target;
            const scrollTop = sel.scrollTop;
            option.selected = !option.selected;
            sel.dispatchEvent(new Event('change'));
            sel.focus();
            sel.scrollTop = scrollTop;
        });
        sel.addEventListener('dblclick', e => {
            e.preventDefault();
        });
    });

    projectForm.querySelectorAll('select').forEach(sel => {
        if (sel.id === 'requiredScenarios') return;
        sel.addEventListener('change', () => updateSelectIconBoxes(sel));
        updateSelectIconBoxes(sel);
    });

    const queueProjectAutoSave = () => scheduleProjectAutoSave();
    const flushProjectAutoSave = () => scheduleProjectAutoSave(true);
    projectForm.addEventListener('input', queueProjectAutoSave);
    projectForm.addEventListener('change', flushProjectAutoSave);

    projectForm.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('change', saveCurrentSession);
    });
}

let manualPositions = {};
let lastDiagramPositions = {};
let gridSnap = false;
let cleanupDiagramInteractions = null;

// CSS used when exporting the setup diagram
const diagramCssLight = `
.node-box{fill:#f0f0f0;stroke:none;}
.node-box.first-fiz{stroke:none;}
.first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}
.node-icon{font-size:var(--font-size-diagram-icon, 20px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}
.node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}
.conn{stroke:none;}
.conn.red{fill:#d33;}
.conn.blue{fill:#369;}
.conn.green{fill:#090;}
text{font-family:system-ui,sans-serif;}
.edge-label{font-size:var(--font-size-diagram-label, 10px);}
line{stroke:#333;stroke-width:2px;}
path.edge-path{stroke:#333;stroke-width:2px;fill:none;}
path.power{stroke:#d33;}
path.video{stroke:#369;}
path.fiz{stroke:#090;}
.diagram-placeholder{font-style:italic;color:#666;margin:0;}
`;
const diagramCssDark = `
.node-box{fill:#444;stroke:none;}
.node-box.first-fiz{stroke:none;}
.first-fiz-highlight{stroke:url(#firstFizGrad);}
.node-icon{font-size:var(--font-size-diagram-icon, 20px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}
.node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}
text{fill:#fff;font-family:system-ui,sans-serif;}
line{stroke:#fff;}
path.edge-path{stroke:#fff;}
path.power{stroke:#ff6666;}
path.video{stroke:#7ec8ff;}
path.fiz{stroke:#6f6;}
.conn.red{fill:#ff6666;}
.conn.blue{fill:#7ec8ff;}
.conn.green{fill:#6f6;}
.diagram-placeholder{color:#bbb;}
`;

function getDiagramCss(includeDark = true) {
  return diagramCssLight + (includeDark ? `@media (prefers-color-scheme: dark){${diagramCssDark}}` : '');
}

// Dedicated Uicons for the setup diagram.
const DIAGRAM_BATTERY_ICON = iconGlyph('\uE1A6');
const DIAGRAM_CAMERA_ICON = iconGlyph('\uE333');
const DIAGRAM_MONITOR_ICON = iconGlyph('\uEFFC');
const DIAGRAM_VIEWFINDER_ICON = iconGlyph('\uE338');
const DIAGRAM_VIDEO_ICON = iconGlyph('\uF42A');
const DIAGRAM_WIRELESS_ICON = iconGlyph('\uF4AC');
const DIAGRAM_MOTORS_ICON = iconGlyph('\uE8AF', ICON_FONT_KEYS.UICONS);
const DIAGRAM_CONTROLLER_ICON = iconGlyph('\uE52A');
const DIAGRAM_DISTANCE_ICON = iconGlyph('\uEFB9');
const DIAGRAM_POWER_OUTPUT_ICON = iconGlyph('\uE212');
const DIAGRAM_POWER_INPUT_ICON = iconGlyph('\uEE71');
const DIAGRAM_TIMECODE_ICON = iconGlyph('\uE46F');
const DIAGRAM_AUDIO_IN_ICON = iconGlyph('\uE6B7');
const DIAGRAM_AUDIO_OUT_ICON = iconGlyph('\uECB5');
const DIAGRAM_AUDIO_IO_ICON = iconGlyph('\uF487');

const diagramConnectorIcons = Object.freeze({
  powerOut: DIAGRAM_POWER_OUTPUT_ICON,
  powerIn: DIAGRAM_POWER_INPUT_ICON,
  fiz: DIAGRAM_MOTORS_ICON,
  video: DIAGRAM_VIDEO_ICON,
  timecode: DIAGRAM_TIMECODE_ICON,
  audioIn: DIAGRAM_AUDIO_IN_ICON,
  audioOut: DIAGRAM_AUDIO_OUT_ICON,
  audioIo: DIAGRAM_AUDIO_IO_ICON,
  torque: DIAGRAM_MOTORS_ICON,
  controller: DIAGRAM_CONTROLLER_ICON,
  powerSpec: DIAGRAM_POWER_OUTPUT_ICON,
  powerSource: DIAGRAM_POWER_INPUT_ICON
});

const diagramIcons = {
  battery: DIAGRAM_BATTERY_ICON,
  camera: DIAGRAM_CAMERA_ICON,
  monitor: DIAGRAM_MONITOR_ICON,
  viewfinder: DIAGRAM_VIEWFINDER_ICON,
  video: DIAGRAM_WIRELESS_ICON,
  motors: DIAGRAM_MOTORS_ICON,
  controllers: DIAGRAM_CONTROLLER_ICON,
  handle: DIAGRAM_CONTROLLER_ICON,
  distance: DIAGRAM_DISTANCE_ICON
};

// Map overview section keys to diagram icons
/* exported overviewSectionIcons */
const overviewSectionIcons = {
  category_batteries: diagramIcons.battery,
  category_batteryHotswaps: diagramIcons.battery,
  category_cameras: diagramIcons.camera,
  category_viewfinders: diagramIcons.viewfinder,
  category_monitors: diagramIcons.monitor,
  category_video: diagramIcons.video,
  category_fiz_motors: diagramIcons.motors,
  category_fiz_controllers: diagramIcons.controllers,
  category_fiz_distance: diagramIcons.distance
};

const cameraProjectLegendIcon = document.getElementById('cameraProjectLegendIcon');
if (cameraProjectLegendIcon) {
  applyIconGlyph(cameraProjectLegendIcon, DIAGRAM_CAMERA_ICON);
}

// Load an image and optionally strip a solid background using Canvas
// List filters for existing device categories

// NEW SETUP MANAGEMENT DOM ELEMENTS
const generateOverviewBtn = document.getElementById('generateOverviewBtn');

const videoOutputOptions = [
  '3G-SDI',
  '6G-SDI',
  '12G-SDI',
  'Mini BNC',
  'HDMI',
  'Mini HDMI',
  'Micro HDMI'
];

function getAllFizConnectorTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.fizConnectors)) {
      cam.fizConnectors.forEach(fc => {
        if (fc && fc.type) types.add(fc.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

let fizConnectorOptions = getAllFizConnectorTypes();

function updateFizConnectorOptions() {
  fizConnectorOptions = getAllFizConnectorTypes();
  document.querySelectorAll('.fiz-connector-select').forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    fizConnectorOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (fizConnectorOptions.includes(current)) {
      sel.value = current;
    }
  });
}

function getAllMotorConnectorTypes() {
  const types = new Set();
  Object.values(devices.fiz?.motors || {}).forEach(m => {
    if (m && m.fizConnector) types.add(m.fizConnector);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

let motorConnectorOptions = getAllMotorConnectorTypes();

function updateMotorConnectorOptions() {
  motorConnectorOptions = getAllMotorConnectorTypes();
  if (motorConnectorInput) {
    const cur = motorConnectorInput.value;
    motorConnectorInput.innerHTML = '';
    addEmptyOption(motorConnectorInput);
    motorConnectorOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      motorConnectorInput.appendChild(opt);
    });
    if (motorConnectorOptions.includes(cur)) motorConnectorInput.value = cur;
  }
}

function getAllControllerConnectors() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && Array.isArray(c.fizConnectors)) {
      c.fizConnectors.forEach(fc => { if (fc && fc.type) types.add(fc.type); });
    }
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerPowerSources() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.powerSource) types.add(c.powerSource);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerBatteryTypes() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.batteryType) types.add(c.batteryType);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerConnectivity() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.connectivity) types.add(c.connectivity);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

let controllerConnectorOptions = getAllControllerConnectors();
let controllerPowerOptions = getAllControllerPowerSources();
let controllerBatteryOptions = getAllControllerBatteryTypes();
let controllerConnectivityOptions = getAllControllerConnectivity();

function updateControllerConnectorOptions() {
  controllerConnectorOptions = getAllControllerConnectors();
  if (controllerConnectorInput) {
    const cur = controllerConnectorInput.value;
    controllerConnectorInput.innerHTML = '';
    addEmptyOption(controllerConnectorInput);
    controllerConnectorOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerConnectorInput.appendChild(opt);
    });
    if (controllerConnectorOptions.includes(cur)) controllerConnectorInput.value = cur;
  }
}

function updateControllerPowerOptions() {
  controllerPowerOptions = getAllControllerPowerSources();
  if (controllerPowerInput) {
    const cur = controllerPowerInput.value;
    controllerPowerInput.innerHTML = '';
    addEmptyOption(controllerPowerInput);
    controllerPowerOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerPowerInput.appendChild(opt);
    });
    if (controllerPowerOptions.includes(cur)) controllerPowerInput.value = cur;
  }
}

function updateControllerBatteryOptions() {
  controllerBatteryOptions = getAllControllerBatteryTypes();
  if (controllerBatteryInput) {
    const cur = controllerBatteryInput.value;
    controllerBatteryInput.innerHTML = '';
    addEmptyOption(controllerBatteryInput);
    controllerBatteryOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerBatteryInput.appendChild(opt);
    });
    if (controllerBatteryOptions.includes(cur)) controllerBatteryInput.value = cur;
  }
}

function updateControllerConnectivityOptions() {
  controllerConnectivityOptions = getAllControllerConnectivity();
  if (controllerConnectivityInput) {
    const cur = controllerConnectivityInput.value;
    controllerConnectivityInput.innerHTML = '';
    addEmptyOption(controllerConnectivityInput);
    controllerConnectivityOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerConnectivityInput.appendChild(opt);
    });
    if (controllerConnectivityOptions.includes(cur)) controllerConnectivityInput.value = cur;
  }
}

function getAllDistanceConnections() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.connectionCompatibility) types.add(d.connectionCompatibility);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllDistanceMethods() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.measurementMethod) types.add(d.measurementMethod);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllDistanceDisplays() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.outputDisplay) types.add(d.outputDisplay);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

let distanceConnectionOptions = getAllDistanceConnections();
let distanceMethodOptions = getAllDistanceMethods();
let distanceDisplayOptions = getAllDistanceDisplays();

function updateDistanceConnectionOptions() {
  distanceConnectionOptions = getAllDistanceConnections();
  if (distanceConnectionInput) {
    const cur = distanceConnectionInput.value;
    distanceConnectionInput.innerHTML = '';
    addEmptyOption(distanceConnectionInput);
    distanceConnectionOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      distanceConnectionInput.appendChild(opt);
    });
    if (distanceConnectionOptions.includes(cur)) distanceConnectionInput.value = cur;
  }
}

function updateDistanceMethodOptions() {
  distanceMethodOptions = getAllDistanceMethods();
  if (distanceMethodInput) {
    const cur = distanceMethodInput.value;
    distanceMethodInput.innerHTML = '';
    addEmptyOption(distanceMethodInput);
    distanceMethodOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      distanceMethodInput.appendChild(opt);
    });
    if (distanceMethodOptions.includes(cur)) distanceMethodInput.value = cur;
  }
}

function updateDistanceDisplayOptions() {
  distanceDisplayOptions = getAllDistanceDisplays();
  if (distanceOutputInput) {
    const cur = distanceOutputInput.value;
    distanceOutputInput.innerHTML = '';
    addEmptyOption(distanceOutputInput);
    distanceDisplayOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      distanceOutputInput.appendChild(opt);
    });
    if (distanceDisplayOptions.includes(cur)) distanceOutputInput.value = cur;
  }
}

// Wrap a form field with a div containing a data-label attribute for styling.
function createFieldWithLabel(el, label) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field-with-label';
  wrapper.dataset.label = label;
  wrapper.appendChild(el);
  return wrapper;
}

// Helper used by select-row builders to insert an empty option.
// Previously this inserted a blank option at the top of each select.
// The UI no longer requires an empty choice, so this function is now a
// no-op but kept for backward compatibility with existing calls.
function addEmptyOption(/* select */) {
  // Intentionally left blank
}

// Utility to remove entries with value "None" or empty string
function filterNoneEntries(list, prop = 'type') {
  if (!Array.isArray(list)) return [];
  return list.filter(item => {
    if (typeof item === 'string') {
      return item && item !== 'None';
    }
    if (item && Object.prototype.hasOwnProperty.call(item, prop)) {
      const val = item[prop];
      return val !== undefined && val !== null && val !== '' && val !== 'None';
    }
    return true;
  });
}

// Build a single row of the video output editor UI.
function createVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-output-select';
  select.name = 'videoOutput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoOutputs(list) {
  videoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type;
      videoOutputsContainer.appendChild(createVideoOutputRow(t));
    });
  } else {
    videoOutputsContainer.appendChild(createVideoOutputRow());
  }
}

function getVideoOutputs() {
  return Array.from(videoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(vo => vo.type && vo.type !== 'None');
}

function clearVideoOutputs() {
  setVideoOutputs([]);
}

function createMonitorVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'monitor-video-input-select';
  select.name = 'monitorVideoInput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createMonitorVideoInputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (monitorVideoInputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setMonitorVideoInputs(list) {
  monitorVideoInputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow(t));
    });
  } else {
    monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow());
  }
}

function getMonitorVideoInputs() {
  return Array.from(monitorVideoInputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearMonitorVideoInputs() {
  setMonitorVideoInputs([]);
}

function createMonitorVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'monitor-video-output-select';
  select.name = 'monitorVideoOutput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createMonitorVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (monitorVideoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setMonitorVideoOutputs(list) {
  monitorVideoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow(t));
    });
  } else {
    monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow());
  }
}

function getMonitorVideoOutputs() {
  return Array.from(monitorVideoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearMonitorVideoOutputs() {
  setMonitorVideoOutputs([]);
}

function createViewfinderVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'viewfinder-video-input-select';
  select.name = 'viewfinderVideoInput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createViewfinderVideoInputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderVideoInputsContainer && viewfinderVideoInputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setViewfinderVideoInputs(list) {
  if (!viewfinderVideoInputsContainer) return;
  viewfinderVideoInputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow(t));
    });
  } else {
    viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow());
  }
}

function getViewfinderVideoInputs() {
  if (!viewfinderVideoInputsContainer) return [];
  return Array.from(viewfinderVideoInputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearViewfinderVideoInputs() {
  setViewfinderVideoInputs([]);
}

function createViewfinderVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'viewfinder-video-output-select';
  select.name = 'viewfinderVideoOutput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createViewfinderVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderVideoOutputsContainer && viewfinderVideoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setViewfinderVideoOutputs(list) {
  if (!viewfinderVideoOutputsContainer) return;
  viewfinderVideoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow(t));
    });
  } else {
    viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow());
  }
}

function getViewfinderVideoOutputs() {
  if (!viewfinderVideoOutputsContainer) return [];
  return Array.from(viewfinderVideoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearViewfinderVideoOutputs() {
  setViewfinderVideoOutputs([]);
}

setViewfinderVideoInputs([]);
setViewfinderVideoOutputs([]);

function createVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-input-select';
  select.name = 'videoInput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoInputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoVideoInputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoInputs(list) {
  videoVideoInputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      videoVideoInputsContainer.appendChild(createVideoInputRow(t));
    });
  } else {
    videoVideoInputsContainer.appendChild(createVideoInputRow());
  }
}

function getVideoInputs() {
  return Array.from(videoVideoInputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearVideoInputs() { setVideoInputs([]); }

function createVideoIOOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-output-select-io';
  select.name = 'videoIOOutput';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoIOOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoVideoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoOutputsIO(list) {
  videoVideoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      videoVideoOutputsContainer.appendChild(createVideoIOOutputRow(t));
    });
  } else {
    videoVideoOutputsContainer.appendChild(createVideoIOOutputRow());
  }
}

function getVideoOutputsIO() {
  return Array.from(videoVideoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearVideoOutputsIO() { setVideoOutputsIO([]); }

// Build a row for editing a FIZ connector entry.
function createFizConnectorRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'fiz-connector-select';
  select.name = 'fizConnector';
  addEmptyOption(select);
  fizConnectorOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createFizConnectorRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (fizConnectorContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setFizConnectors(list) {
  fizConnectorContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type;
      fizConnectorContainer.appendChild(createFizConnectorRow(t));
    });
  } else {
    fizConnectorContainer.appendChild(createFizConnectorRow());
  }
}

function getFizConnectors() {
  return Array.from(fizConnectorContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(fc => fc.type && fc.type !== 'None');
}

function clearFizConnectors() {
  setFizConnectors([]);
}

function getAllRecordingMedia() {
  const media = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.recordingMedia)) {
      cam.recordingMedia.forEach(m => { if (m && m.type) media.add(m.type); });
    }
  });
  return Array.from(media).sort(localeSort);
}

let recordingMediaOptions = getAllRecordingMedia();

function updateRecordingMediaOptions() {
  recordingMediaOptions = getAllRecordingMedia();
  document.querySelectorAll('.recording-media-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    recordingMediaOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (recordingMediaOptions.includes(cur)) sel.value = cur;
  });
}

// Build a row allowing the user to specify recording media details.
function createRecordingMediaRow(type = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const select = document.createElement('select');
  select.className = 'recording-media-select';
  select.name = 'recordingMediaType';
  addEmptyOption(select);
  recordingMediaOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  if (type) {
    if (!recordingMediaOptions.includes(type)) {
      const opt = document.createElement('option');
      opt.value = type;
      opt.textContent = type;
      select.appendChild(opt);
    }
    select.value = type;
  }
  row.appendChild(createFieldWithLabel(select, 'Type'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.name = 'recordingMediaNotes';
  notesInput.value = notes;
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createRecordingMediaRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (cameraMediaContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setRecordingMedia(list) {
  cameraMediaContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', notes = '' } = item || {};
      cameraMediaContainer.appendChild(createRecordingMediaRow(type, notes));
    });
  } else {
    cameraMediaContainer.appendChild(createRecordingMediaRow());
  }
}

function getRecordingMedia() {
  return Array.from(cameraMediaContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [sel, notesInput] = row.querySelectorAll('select, input');
      return { type: sel.value, notes: notesInput.value };
    })
    .filter(m => m.type && m.type !== 'None');
}

function clearRecordingMedia() {
  setRecordingMedia([]);
}

function powerInputTypes(dev) {
  const out = [];
  if (!dev) return out;
  const add = t => {
    normalizePowerPortType(t).forEach(pt => out.push(pt));
  };
  if (dev.powerInput) {
    String(dev.powerInput)
      .split('/')
      .forEach(t => {
        if (t.trim()) add(t.trim());
      });
  }
  const inp = dev.power?.input;
  if (Array.isArray(inp)) {
    inp.forEach(i => {
      const typeVal = i && (i.type || i.portType);
      if (typeVal) add(typeVal);
    });
  } else if (inp) {
    const typeVal = inp.type || inp.portType;
    if (typeVal) add(typeVal);
  }
  return out;
}

function firstPowerInputType(dev) {
  const list = powerInputTypes(dev);
  return list.length ? list[0] : '';
}

function getAllPowerPortTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => powerInputTypes(cam).forEach(t => types.add(t)));
  Object.values(devices.viewfinders || {}).forEach(vf => powerInputTypes(vf).forEach(t => types.add(t)));
  Object.values(devices.monitors || {}).forEach(mon => powerInputTypes(mon).forEach(t => types.add(t)));
  Object.values(devices.video || {}).forEach(vd => powerInputTypes(vd).forEach(t => types.add(t)));
  Object.values(devices.fiz?.motors || {}).forEach(m => powerInputTypes(m).forEach(t => types.add(t)));
  Object.values(devices.fiz?.controllers || {}).forEach(c => powerInputTypes(c).forEach(t => types.add(t)));
  Object.values(devices.fiz?.distance || {}).forEach(d => powerInputTypes(d).forEach(t => types.add(t)));
  return Array.from(types).sort(localeSort);
}

let powerPortOptions = getAllPowerPortTypes();

function updatePowerPortOptions() {
  powerPortOptions = getAllPowerPortTypes();
  const current = cameraPortTypeInput.value;
  cameraPortTypeInput.innerHTML = '';
  addEmptyOption(cameraPortTypeInput);
  powerPortOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    cameraPortTypeInput.appendChild(opt);
  });
  if (powerPortOptions.includes(current)) cameraPortTypeInput.value = current;

  if (monitorPortTypeInput) {
    const curMon = monitorPortTypeInput.value;
    monitorPortTypeInput.innerHTML = '';
    addEmptyOption(monitorPortTypeInput);
    powerPortOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      monitorPortTypeInput.appendChild(opt);
    });
    if (powerPortOptions.includes(curMon)) monitorPortTypeInput.value = curMon;
  }
}

function getAllPlateTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.batteryPlateSupport;
    if (Array.isArray(list)) {
      list.forEach(bp => {
        if (bp && bp.type) types.add(bp.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

let plateTypeOptions = getAllPlateTypes();

function updatePlateTypeOptions() {
  plateTypeOptions = getAllPlateTypes();
  document.querySelectorAll('.battery-plate-type-select').forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    plateTypeOptions.forEach(pt => {
      const opt = document.createElement('option');
      opt.value = pt;
      opt.textContent = pt;
      sel.appendChild(opt);
    });
    if (plateTypeOptions.includes(current)) sel.value = current;
  });
}

// Build a battery plate row with type, mount and optional notes fields.
function createBatteryPlateRow(type = '', mount = 'native', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'battery-plate-type-select';
  typeSelect.name = 'batteryPlateType';
  addEmptyOption(typeSelect);
  plateTypeOptions.forEach(pt => {
    const opt = document.createElement('option');
    opt.value = pt;
    opt.textContent = pt;
    typeSelect.appendChild(opt);
  });
  if (type && !plateTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const mountSelect = document.createElement('select');
  addEmptyOption(mountSelect);
  mountSelect.name = 'batteryPlateMount';
  ['native','adapted'].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    mountSelect.appendChild(opt);
  });
  mountSelect.value = mount || '';
  row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  notesInput.name = 'batteryPlateNotes';
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createBatteryPlateRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (batteryPlatesContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setBatteryPlates(list) {
  batteryPlatesContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', mount = 'native', notes = '' } = item || {};
      batteryPlatesContainer.appendChild(createBatteryPlateRow(type, mount, notes));
    });
  } else {
    batteryPlatesContainer.appendChild(createBatteryPlateRow());
  }
}

function getBatteryPlates() {
  return Array.from(batteryPlatesContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, mountSel, notesInput] = row.querySelectorAll('select, input');
      return { type: typeSel.value, mount: mountSel.value, notes: notesInput.value };
    })
    .filter(bp => bp.type && bp.type !== 'None');
}

function clearBatteryPlates() {
  setBatteryPlates([]);
}

function getAllViewfinderTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.viewfinder)) {
      cam.viewfinder.forEach(vf => {
        if (vf && vf.type) types.add(vf.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

function getAllViewfinderConnectors() {
  const conns = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.viewfinder)) {
      cam.viewfinder.forEach(vf => {
        if (vf && vf.connector) conns.add(vf.connector);
      });
    }
  });
  return Array.from(conns).filter(c => c).sort(localeSort);
}

let viewfinderTypeOptions = getAllViewfinderTypes();
let viewfinderConnectorOptions = getAllViewfinderConnectors();

// Build a viewfinder configuration row used in the camera editor.
function createViewfinderRow(type = '', resolution = '', connector = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'viewfinder-type-select';
  typeSelect.name = 'viewfinderType';
  addEmptyOption(typeSelect);
  viewfinderTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !viewfinderTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const resInput = document.createElement('input');
  resInput.type = 'text';
  resInput.placeholder = 'Resolution';
  resInput.value = resolution;
  resInput.name = 'viewfinderResolution';
  row.appendChild(createFieldWithLabel(resInput, 'Resolution'));

  const connSelect = document.createElement('select');
  connSelect.className = 'viewfinder-connector-select';
  addEmptyOption(connSelect);
  connSelect.name = 'viewfinderConnector';
  viewfinderConnectorOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    connSelect.appendChild(opt);
  });
  if (connector && !viewfinderConnectorOptions.includes(connector)) {
    const opt = document.createElement('option');
    opt.value = connector;
    opt.textContent = connector;
    connSelect.appendChild(opt);
  }
  connSelect.value = connector;
  row.appendChild(createFieldWithLabel(connSelect, 'Connector'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  notesInput.name = 'viewfinderNotes';
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createViewfinderRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setViewfinders(list) {
  viewfinderContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', resolution = '', connector = '', notes = '' } = item || {};
      viewfinderContainer.appendChild(createViewfinderRow(type, resolution, connector, notes));
    });
  } else {
    viewfinderContainer.appendChild(createViewfinderRow());
  }
}

function getViewfinders() {
  return Array.from(viewfinderContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSelect, resInput, connSelect, notesInput] = row.querySelectorAll('select, input');
      return {
        type: typeSelect.value,
        resolution: resInput.value,
        connector: connSelect.value,
        notes: notesInput.value
      };
    })
    .filter(vf => vf.type && vf.type !== 'None');
}

function clearViewfinders() {
  setViewfinders([]);
}

function getAllMountTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.lensMount)) {
      cam.lensMount.forEach(lm => {
        if (lm && lm.type) types.add(lm.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

let mountTypeOptions = getAllMountTypes();

function updateMountTypeOptions() {
  mountTypeOptions = getAllMountTypes();
  document.querySelectorAll('.lens-mount-type-select').forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    mountTypeOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (mountTypeOptions.includes(current)) sel.value = current;
  });
}

// Build a lens mount row with type and mount selection fields.
function createLensMountRow(type = '', mount = 'native') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'lens-mount-type-select';
  typeSelect.name = 'lensMountType';
  addEmptyOption(typeSelect);
  mountTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !mountTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const mountSelect = document.createElement('select');
  addEmptyOption(mountSelect);
  mountSelect.name = 'lensMount';
  ['native', 'adapted'].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    mountSelect.appendChild(opt);
  });
  mountSelect.value = mount || '';
  row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createLensMountRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (lensMountContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setLensMounts(list) {
  lensMountContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', mount = 'native' } = item || {};
      lensMountContainer.appendChild(createLensMountRow(type, mount));
    });
  } else {
    lensMountContainer.appendChild(createLensMountRow());
  }
}

function getLensMounts() {
  return Array.from(lensMountContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, mountSel] = row.querySelectorAll('select');
      return { type: typeSel.value, mount: mountSel.value };
    })
    .filter(lm => lm.type && lm.type !== 'None');
}

function clearLensMounts() {
  setLensMounts([]);
}

function getAllPowerDistTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(pd => { if (pd && pd.type) types.add(pd.type); });
    }
  });
  return Array.from(types).sort(localeSort);
}

let powerDistTypeOptions = getAllPowerDistTypes();
function getAllPowerDistVoltages() {
  const volts = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(pd => { if (pd && pd.voltage) volts.add(pd.voltage); });
    }
  });
  return Array.from(volts).filter(v => v).sort(localeSort);
}

function getAllPowerDistCurrents() {
  const currents = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(pd => { if (pd && pd.current) currents.add(pd.current); });
    }
  });
  return Array.from(currents).filter(c => c).sort(localeSort);
}

let powerDistVoltageOptions = getAllPowerDistVoltages();
let powerDistCurrentOptions = getAllPowerDistCurrents();

function updatePowerDistVoltageOptions() {
  powerDistVoltageOptions = getAllPowerDistVoltages();
  document.querySelectorAll('.power-dist-voltage-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    powerDistVoltageOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (powerDistVoltageOptions.includes(cur)) sel.value = cur;
  });
}

function updatePowerDistCurrentOptions() {
  powerDistCurrentOptions = getAllPowerDistCurrents();
  document.querySelectorAll('.power-dist-current-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    powerDistCurrentOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (powerDistCurrentOptions.includes(cur)) sel.value = cur;
  });
}

function updatePowerDistTypeOptions() {
  powerDistTypeOptions = getAllPowerDistTypes();
  document.querySelectorAll('.power-dist-type-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    powerDistTypeOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (powerDistTypeOptions.includes(cur)) sel.value = cur;
  });
}

// Build a power distribution output row for the editor UI.
function createPowerDistRow(type = '', voltage = '', current = '', wattage = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'power-dist-type-select';
  typeSelect.name = 'powerDistType';
  addEmptyOption(typeSelect);
  powerDistTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !powerDistTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const voltSelect = document.createElement('select');
  voltSelect.className = 'power-dist-voltage-select';
  addEmptyOption(voltSelect);
  voltSelect.name = 'powerDistVoltage';
  powerDistVoltageOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    voltSelect.appendChild(opt);
  });
  if (voltage && !powerDistVoltageOptions.includes(voltage)) {
    const opt = document.createElement('option');
    opt.value = voltage;
    opt.textContent = voltage;
    voltSelect.appendChild(opt);
  }
  voltSelect.value = voltage;
  row.appendChild(createFieldWithLabel(voltSelect, 'Voltage'));

  const currSelect = document.createElement('select');
  currSelect.className = 'power-dist-current-select';
  addEmptyOption(currSelect);
  currSelect.name = 'powerDistCurrent';
  powerDistCurrentOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    currSelect.appendChild(opt);
  });
  if (current && !powerDistCurrentOptions.includes(current)) {
    const opt = document.createElement('option');
    opt.value = current;
    opt.textContent = current;
    currSelect.appendChild(opt);
  }
  currSelect.value = current;
  row.appendChild(createFieldWithLabel(currSelect, 'Current'));

  const wattInput = document.createElement('input');
  wattInput.type = 'number';
  wattInput.step = '0.1';
  wattInput.placeholder = 'W';
  wattInput.value = wattage === null || wattage === undefined ? '' : wattage;
  wattInput.name = 'powerDistWatt';
  row.appendChild(createFieldWithLabel(wattInput, 'W')); 

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  notesInput.name = 'powerDistNotes';
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createPowerDistRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (powerDistContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setPowerDistribution(list) {
  powerDistContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', voltage = '', current = '', wattage = '', notes = '' } = item || {};
      powerDistContainer.appendChild(createPowerDistRow(type, voltage, current, wattage, notes));
    });
  } else {
    powerDistContainer.appendChild(createPowerDistRow());
  }
}

function getPowerDistribution() {
  return Array.from(powerDistContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, voltSel, currSel, wattInput, notesInput] = row.querySelectorAll('select, input');
      return {
        type: typeSel.value,
        voltage: voltSel.value,
        current: currSel.value,
        wattage: wattInput.value ? parseFloat(wattInput.value) : null,
        notes: notesInput.value
      };
    })
    .filter(pd => pd.type && pd.type !== 'None');
}

function clearPowerDistribution() {
  setPowerDistribution([]);
}

function getAllTimecodeTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.timecode;
    if (Array.isArray(list)) {
      list.forEach(tc => { if (tc && tc.type) types.add(tc.type); });
    }
  });
  return Array.from(types).sort(localeSort);
}

let timecodeTypeOptions = getAllTimecodeTypes();

function updateTimecodeTypeOptions() {
  timecodeTypeOptions = getAllTimecodeTypes();
  document.querySelectorAll('.timecode-type-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    timecodeTypeOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (timecodeTypeOptions.includes(cur)) sel.value = cur;
  });
}

// Build a timecode connector row used for editing camera properties.
function createTimecodeRow(type = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'timecode-type-select';
  typeSelect.name = 'timecodeType';
  addEmptyOption(typeSelect);
  timecodeTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !timecodeTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  notesInput.name = 'timecodeNotes';
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createTimecodeRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (timecodeContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setTimecodes(list) {
  timecodeContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', notes = '' } = item || {};
      timecodeContainer.appendChild(createTimecodeRow(type, notes));
    });
  } else {
    timecodeContainer.appendChild(createTimecodeRow());
  }
}

function getTimecodes() {
  return Array.from(timecodeContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, notesInput] = row.querySelectorAll('select, input');
      return { type: typeSel.value, notes: notesInput.value };
    })
    .filter(tc => tc.type && tc.type !== 'None');
}

  function clearTimecodes() {
    setTimecodes([]);
  }

  function getFavoriteValues(id) {
    const favs = loadFavorites();
    return Array.isArray(favs[id]) ? favs[id] : [];
  }

  function applyFavoritesToSelect(selectElem) {
    if (!selectElem || !selectElem.id) return;
    const favVals = getFavoriteValues(selectElem.id);
    if (!favVals.length) return;
    const opts = Array.from(selectElem.options);
    const noneOpt = opts.find(o => o.value === 'None');
    const others = opts.filter(o => o !== noneOpt);
    const favOpts = [];
    const restOpts = [];
    others.forEach(o => (favVals.includes(o.value) ? favOpts.push(o) : restOpts.push(o)));
    favOpts.sort((a, b) => localeSort(a.textContent, b.textContent));
    restOpts.sort((a, b) => localeSort(a.textContent, b.textContent));
    selectElem.innerHTML = '';
    if (noneOpt) selectElem.appendChild(noneOpt);
    favOpts.forEach(o => selectElem.appendChild(o));
    restOpts.forEach(o => selectElem.appendChild(o));
  }

  function updateFavoriteButton(selectElem) {
    if (!selectElem || !selectElem._favButton) return;
    const favVals = getFavoriteValues(selectElem.id);
    const val = selectElem.value;
    const isFav = favVals.includes(val);
    selectElem._favButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
    selectElem._favButton.classList.toggle('favorited', isFav);
    selectElem._favButton.disabled = val === 'None';
    selectElem._favButton.setAttribute('aria-pressed', isFav ? 'true' : 'false');
  }

  function toggleFavorite(selectElem) {
    if (!selectElem || !selectElem.id) return;
    const val = selectElem.value;
    if (val === 'None') return;
    const favs = loadFavorites();
    const list = Array.isArray(favs[selectElem.id]) ? favs[selectElem.id] : [];
    const idx = list.indexOf(val);
    if (idx === -1) list.push(val); else list.splice(idx, 1);
    if (list.length) favs[selectElem.id] = list; else delete favs[selectElem.id];
    saveFavorites(favs);
    applyFavoritesToSelect(selectElem);
    updateFavoriteButton(selectElem);
    adjustGearListSelectWidth(selectElem);
  }

  function adjustGearListSelectWidth(selectElem) {
    if (!selectElem || selectElem.multiple || selectElem.size > 1) return;
    const container = selectElem.closest('#gearListOutput, #projectRequirementsOutput');
    if (!container) return;
    const styles = window.getComputedStyle(selectElem);
    if (!styles || styles.display === 'none') {
      selectElem.style.removeProperty('--gear-select-width');
      return;
    }
    const selectedOption = selectElem.selectedOptions && selectElem.selectedOptions[0];
    const optionText = selectedOption ? selectedOption.textContent.trim() : selectElem.value || '';
    const fontSize = parseFloat(styles.fontSize) || 16;
    const approxCharWidth = fontSize * 0.6;
    const textWidth = (optionText ? optionText.length : 1) * approxCharWidth;
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
    const borderRight = parseFloat(styles.borderRightWidth) || 0;
    const arrowReserve = Math.max(fontSize, 16);
    const minWidth = Math.max(fontSize * 4, 56);
    const widthPx = Math.max(
      Math.ceil(textWidth + paddingLeft + paddingRight + borderLeft + borderRight + arrowReserve),
      minWidth
    );
    selectElem.style.setProperty('--gear-select-width', `${widthPx}px`);
  }

  function adjustGearListSelectWidths(container) {
    if (!container) return;
    container
      .querySelectorAll('select')
      .forEach(selectElem => adjustGearListSelectWidth(selectElem));
  }

  function ensureSelectWrapper(selectElem) {
    if (!selectElem) return null;
    let wrapper = selectElem.parentElement;
    if (!wrapper || !wrapper.classList.contains('select-wrapper')) {
      if (wrapper && wrapper.tagName === 'LABEL') {
        const label = wrapper;
        wrapper = document.createElement('div');
        wrapper.className = 'select-wrapper';
        label.parentElement.insertBefore(wrapper, label.nextSibling);
        wrapper.appendChild(selectElem);
      } else {
        wrapper = document.createElement('div');
        wrapper.className = 'select-wrapper';
        selectElem.insertAdjacentElement('beforebegin', wrapper);
        wrapper.appendChild(selectElem);
      }
    }
    return wrapper;
  }

  function initFavoritableSelect(selectElem) {
    if (!selectElem || !selectElem.id || selectElem.multiple || selectElem.hidden) return;
    const wrapper = ensureSelectWrapper(selectElem);
    const gearItem = selectElem.closest('.gear-item');

    function cleanupFavoriteButton(btn) {
      if (!btn) return;
      if (btn._favListener) {
        btn.removeEventListener('click', btn._favListener);
        btn._favListener = null;
      }
      btn.remove();
    }

    let favoriteButton =
      selectElem._favButton && selectElem._favButton.isConnected ? selectElem._favButton : null;

    if (wrapper) {
      const wrapperButtons = Array.from(wrapper.querySelectorAll('.favorite-toggle'));
      if (favoriteButton && !wrapperButtons.includes(favoriteButton)) {
        favoriteButton = null;
      }
      if (!favoriteButton && wrapperButtons.length > 0) {
        [favoriteButton] = wrapperButtons;
      }
      wrapperButtons.forEach(btn => {
        if (btn !== favoriteButton) cleanupFavoriteButton(btn);
      });
    }

    if (gearItem) {
      Array.from(gearItem.querySelectorAll('.favorite-toggle'))
        .filter(
          btn =>
            btn !== favoriteButton && btn.getAttribute('data-fav-select-id') === selectElem.id
        )
        .forEach(cleanupFavoriteButton);
    }

    if (!favoriteButton) {
      favoriteButton = document.createElement('button');
      if (wrapper) {
        wrapper.appendChild(favoriteButton);
      } else {
        selectElem.after(favoriteButton);
      }
    } else if (wrapper && favoriteButton.parentElement !== wrapper) {
      wrapper.appendChild(favoriteButton);
    }

    if (favoriteButton._favListener) {
      favoriteButton.removeEventListener('click', favoriteButton._favListener);
    }
    favoriteButton.type = 'button';
    favoriteButton.className = 'favorite-toggle';
    favoriteButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
    favoriteButton.setAttribute('aria-pressed', 'false');
    favoriteButton.setAttribute('data-fav-select-id', selectElem.id);
    const clickHandler = () => toggleFavorite(selectElem);
    favoriteButton.addEventListener('click', clickHandler);
    favoriteButton._favListener = clickHandler;

    if (!selectElem._favChangeListener) {
      const changeListener = () => updateFavoriteButton(selectElem);
      selectElem.addEventListener('change', changeListener);
      selectElem._favChangeListener = changeListener;
    }

    selectElem._favButton = favoriteButton;
    selectElem._favInit = true;

    if (selectElem._favButton) {
      selectElem._favButton.setAttribute('data-fav-select-id', selectElem.id);
      selectElem._favButton.setAttribute('aria-label', texts[currentLang].favoriteToggleLabel);
      selectElem._favButton.setAttribute('title', texts[currentLang].favoriteToggleLabel);
      selectElem._favButton.setAttribute(
        'data-help',
        texts[currentLang].favoriteToggleHelp || texts[currentLang].favoriteToggleLabel
      );
    }

    applyFavoritesToSelect(selectElem);
    updateFavoriteButton(selectElem);
    adjustGearListSelectWidth(selectElem);
  }

  // Populate dropdowns with device options
  function populateSelect(selectElem, optionsObj = {}, includeNone = true) {
    if (!selectElem) return;
    // Ensure we always work with an object so Object.keys does not throw if
    // `optionsObj` is passed as `null`.
    const opts = optionsObj && typeof optionsObj === "object" ? optionsObj : {};
    selectElem.innerHTML = "";
    if (includeNone) {
      const noneOpt = document.createElement("option");
      noneOpt.value = "None";
      const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
      noneOpt.textContent = noneMap[currentLang] || "None";
      selectElem.appendChild(noneOpt);
    }
    Object.keys(opts)
      .filter(name => name !== "None")
      .sort(localeSort)
      .forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        selectElem.appendChild(opt);
      });
    initFavoritableSelect(selectElem);
  }

function populateMonitorSelect() {
  const filtered = Object.fromEntries(
    Object.entries(devices.monitors || {})
      .filter(([, data]) => !(data.wirelessRX && !data.wirelessTx))
  );
  populateSelect(monitorSelect, filtered, true);
}

function filterSelect(selectElem, filterValue) {
  const text = filterValue.toLowerCase();
  Array.from(selectElem.options).forEach(opt => {
    if (opt.value === "None" || text === "" || opt.textContent.toLowerCase().includes(text)) {
      opt.hidden = false;
      opt.disabled = false;
    } else {
      opt.hidden = true;
      opt.disabled = true;
    }
  });
}

function filterDeviceList(listElem, filterValue) {
  const text = filterValue.toLowerCase();
  Array.from(listElem.querySelectorAll('li')).forEach(li => {
    const nameSpan = li.querySelector('.device-summary span');
    const name = nameSpan ? nameSpan.textContent.toLowerCase() : '';
    if (text === '' || name.includes(text)) {
      li.style.display = '';
    } else {
      li.style.display = 'none';
    }
  });
}

// Attach in-select search filtering for a dropdown
function attachSelectSearch(selectElem) {
  let searchStr = "";
  let timer;

  selectElem.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      searchStr = searchStr.slice(0, -1);
      filterSelect(selectElem, searchStr);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      searchStr = "";
      filterSelect(selectElem, searchStr);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      searchStr += e.key.toLowerCase();
      filterSelect(selectElem, searchStr);
      e.preventDefault();
    } else {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      searchStr = "";
    }, 1000);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
  });

  selectElem.addEventListener('blur', () => {
    searchStr = "";
    filterSelect(selectElem, "");
  });
}

function bindFilterInput(inputElem, callback) {
  if (!inputElem) {
    return;
  }
  inputElem.addEventListener("input", callback);
  inputElem.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      inputElem.value = "";
      callback();
    }
  });
  addInputClearButton(inputElem, callback);
}

function addInputClearButton(inputElem, callback) {
  const label = (texts[currentLang] && texts[currentLang].clearFilter) || "Clear filter";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "clear-input-btn";
  btn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'clear-icon');
  btn.setAttribute("aria-label", label);
  btn.title = label;
  btn.hidden = true;
  btn.addEventListener("click", () => {
    inputElem.value = "";
    callback();
    inputElem.focus();
  });
  inputElem.insertAdjacentElement("afterend", btn);
  const toggle = () => {
    btn.hidden = !inputElem.value;
  };
  inputElem.addEventListener("input", toggle);
  toggle();
}

function applyFilters() {
  deviceManagerLists.forEach(({ list, filterInput }) => {
    if (!list) return;
    const value = filterInput ? filterInput.value : '';
    filterDeviceList(list, value);
  });
}

// Initialize device selection dropdowns
populateSelect(cameraSelect, devices.cameras, true);
populateMonitorSelect();
populateSelect(videoSelect, devices.video, true);
if (cageSelect) populateSelect(cageSelect, devices.accessories?.cages || {}, true);
motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
populateSelect(distanceSelect, devices.fiz.distance, true);
populateSelect(batterySelect, devices.batteries, true);
populateSelect(hotswapSelect, devices.batteryHotswaps || {}, true);
updateBatteryPlateVisibility();
updateBatteryOptions();

// Enable search inside dropdowns
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect, hotswapSelect, lensSelect]
  .forEach(sel => attachSelectSearch(sel));
motorSelects.forEach(sel => attachSelectSearch(sel));
controllerSelects.forEach(sel => attachSelectSearch(sel));
applyFilters();
setVideoOutputs([]);
setMonitorVideoInputs([]);
setMonitorVideoOutputs([]);
setViewfinderVideoInputs([]);
setViewfinderVideoOutputs([]);
setFizConnectors([]);
updateFizConnectorOptions();
updateMotorConnectorOptions();
updateControllerConnectorOptions();
updateControllerPowerOptions();
updateControllerBatteryOptions();
updateControllerConnectivityOptions();
updateDistanceConnectionOptions();
updateDistanceMethodOptions();
updateDistanceDisplayOptions();
setViewfinders([]);
setBatteryPlates([]);
setRecordingMedia([]);
updateRecordingMediaOptions();
updatePlateTypeOptions();
setLensMounts([]);
updateMountTypeOptions();
updatePowerPortOptions();
setPowerDistribution([]);
updatePowerDistTypeOptions();
updatePowerDistVoltageOptions();
updatePowerDistCurrentOptions();
setTimecodes([]);
updateTimecodeTypeOptions();
updateDistanceConnectionOptions();
updateDistanceMethodOptions();
updateDistanceDisplayOptions();

// Set default selections for dropdowns

// Kamera: Wenn Option „None“ existiert, dann setze sie – sonst erste Option
const noneCameraOption = Array.from(cameraSelect.options).find(opt => opt.value === "None");
if (noneCameraOption) {
  cameraSelect.value = "None";
} else {
  cameraSelect.selectedIndex = 0;
}

// Für die anderen Dropdowns
[monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
  const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
  if (noneOption) {
    sel.value = "None";
  } else {
    sel.selectedIndex = 0;
  }
});

// FIZ Dropdowns
motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });

// Calculation function to update results and warnings
function renderTemperatureNote(baseHours) {
  const container = document.getElementById("temperatureNote");
  if (!container) return;
  const heading = texts[currentLang].temperatureNoteHeading;
  let html = `<p>${heading}</p>`;
  if (!baseHours || !isFinite(baseHours)) {
    container.innerHTML = html;
    return;
  }
  const scenarios = [
    { t: "+40 \u00B0C", factor: 1.0, color: "#d9534f" },
    { t: "+25 \u00B0C", factor: 1.0, color: "#5cb85c" },
    { t: "0 \u00B0C", factor: 0.8, color: "#f0ad4e" },
    { t: "\u201310 \u00B0C", factor: 0.625, color: "#5bc0de" },
    { t: "\u201320 \u00B0C", factor: 0.5, color: "#0275d8" }
  ];
  html += `<table><tr><th>${texts[currentLang].temperatureLabel}</th><th>${texts[currentLang].runtimeLabel}</th><th>${texts[currentLang].batteryCountTempLabel}</th></tr>`;
  scenarios.forEach(s => {
    const runtime = baseHours * s.factor;
    const batteries = Math.ceil(10 / runtime + 1);
    html += `<tr><td style="color:${s.color}">${s.t}</td><td>${runtime.toFixed(2)}</td><td>${batteries}</td></tr>`;
  });
  html += "</table>";
  container.innerHTML = html;
}

// Calculation function to update results and warnings
function updateCalculations() {
  // Gather selected values
  const camera      = cameraSelect.value;
  const monitor     = monitorSelect.value;
  const video       = videoSelect.value;
  const motors      = motorSelects.map(sel => sel.value);
  const controllers = controllerSelects.map(sel => sel.value);
  const distance    = distanceSelect.value;
  let battery       = batterySelect.value;

  // Calculate total power consumption (W)
  let cameraW = 0;
  if (devices.cameras[camera] !== undefined) {
    const camData = devices.cameras[camera];
    cameraW = typeof camData === 'object' ? camData.powerDrawWatts || 0 : camData;
  }
  let monitorW = 0;
  if (devices.monitors[monitor] !== undefined) {
    const mData = devices.monitors[monitor];
    monitorW = typeof mData === 'object' ? mData.powerDrawWatts || 0 : mData;
  }
  let videoW = 0;
  if (devices.video[video] !== undefined) {
    const vData = devices.video[video];
    videoW = typeof vData === 'object' ? vData.powerDrawWatts || 0 : vData;
  }
  let motorsW = 0;
  motors.forEach(m => {
    if (devices.fiz.motors[m] !== undefined) {
      const d = devices.fiz.motors[m];
      motorsW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  let controllersW = 0;
  controllers.forEach(c => {
    if (devices.fiz.controllers[c] !== undefined) {
      const d = devices.fiz.controllers[c];
      controllersW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  let distanceW = 0;
  if (devices.fiz.distance[distance] !== undefined) {
    const d = devices.fiz.distance[distance];
    distanceW = typeof d === 'object' ? d.powerDrawWatts || 0 : d;
  }

  const totalWatt = cameraW + monitorW + videoW + motorsW + controllersW + distanceW;
  totalPowerElem.textContent = totalWatt.toFixed(1);

  const segments = [
    { power: cameraW, className: "camera", label: texts[currentLang].cameraLabel },
    { power: monitorW, className: "monitor", label: texts[currentLang].monitorLabel },
    { power: videoW, className: "video", label: texts[currentLang].videoLabel },
    { power: motorsW, className: "motors", label: texts[currentLang].fizMotorsLabel },
    { power: controllersW, className: "controllers", label: texts[currentLang].fizControllersLabel },
    { power: distanceW, className: "distance", label: texts[currentLang].distanceLabel }
  ].filter(s => s.power > 0);

  // Update breakdown by category
  breakdownListElem.innerHTML = "";
  if (cameraW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].cameraLabel}</strong> ${cameraW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (monitorW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].monitorLabel}</strong> ${monitorW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (videoW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].videoLabel}</strong> ${videoW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (motorsW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].fizMotorsLabel}</strong> ${motorsW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (controllersW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].fizControllersLabel}</strong> ${controllersW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (distanceW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].distanceLabel}</strong> ${distanceW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }

  // Calculate currents depending on battery type
  const bMountCam = getSelectedPlate() === 'B-Mount';
  let highV = bMountCam ? 33.6 : 14.4;
  let lowV = bMountCam ? 21.6 : 12.0;
  let totalCurrentHigh = 0;
  let totalCurrentLow = 0;
  if (totalWatt > 0) {
    totalCurrentHigh = totalWatt / highV;
    totalCurrentLow = totalWatt / lowV;
  }
  const currentHighLabel = document.getElementById("totalCurrent144Label");
  currentHighLabel.textContent = bMountCam
    ? texts[currentLang].totalCurrent336Label
    : texts[currentLang].totalCurrent144Label;
  currentHighLabel.setAttribute(
    "data-help",
    bMountCam
      ? texts[currentLang].totalCurrent336Help
      : texts[currentLang].totalCurrent144Help
  );
  const currentLowLabel = document.getElementById("totalCurrent12Label");
  currentLowLabel.textContent = bMountCam
    ? texts[currentLang].totalCurrent216Label
    : texts[currentLang].totalCurrent12Label;
  currentLowLabel.setAttribute(
    "data-help",
    bMountCam
      ? texts[currentLang].totalCurrent216Help
      : texts[currentLang].totalCurrent12Help
  );
  totalCurrent144Elem.textContent = totalCurrentHigh.toFixed(2);
  totalCurrent12Elem.textContent = totalCurrentLow.toFixed(2);

  // Update battery and hotswap options based on current draw
  updateBatteryOptions();
  battery = batterySelect.value;

// Wenn kein Akku oder "None" ausgewählt ist: Laufzeit = nicht berechenbar, keine Warnungen
let hours = null;
if (!battery || battery === "None" || !devices.batteries[battery]) {
  batteryLifeElem.textContent = "–";
  batteryCountElem.textContent = "–";
  pinWarnElem.textContent = "";
  setStatusLevel(pinWarnElem, null);
  dtapWarnElem.textContent = "";
  setStatusLevel(dtapWarnElem, null);
  if (hotswapWarnElem) {
    hotswapWarnElem.textContent = "";
    setStatusLevel(hotswapWarnElem, null);
  }
  lastRuntimeHours = null;
  drawPowerDiagram(0, segments, 0);
} else {
    const battData = devices.batteries[battery];
    const hsName = hotswapSelect.value;
    const hsData = devices.batteryHotswaps && devices.batteryHotswaps[hsName];
    const capacityWh = battData.capacity + (hsData?.capacity || 0);
    let maxPinA = battData.pinA;
    const maxDtapA = battData.dtapA;
    if (hsData && typeof hsData.pinA === 'number') {
      if (hsData.pinA < maxPinA) {
        hotswapWarnElem.textContent = texts[currentLang].warnHotswapLower
          .replace("{max}", hsData.pinA)
          .replace("{batt}", battData.pinA);
        setStatusLevel(hotswapWarnElem, 'warning');
        maxPinA = hsData.pinA;
      } else {
        hotswapWarnElem.textContent = "";
        setStatusLevel(hotswapWarnElem, null);
      }
    } else {
      if (hotswapWarnElem) {
      hotswapWarnElem.textContent = "";
      setStatusLevel(hotswapWarnElem, null);
    }
  }
    const availableWatt = maxPinA * lowV;
    drawPowerDiagram(availableWatt, segments, maxPinA);
    totalCurrent144Elem.textContent = totalCurrentHigh.toFixed(2);
    totalCurrent12Elem.textContent = totalCurrentLow.toFixed(2);
    if (totalWatt === 0) {
      hours = Infinity;
      batteryLifeElem.textContent = "∞";
    } else {
      hours = capacityWh / totalWatt;
      batteryLifeElem.textContent = hours.toFixed(2);
    }
    lastRuntimeHours = hours;
    // Round up total batteries (including one spare) to the next full number
    const batteriesNeeded = Math.ceil(10 / hours + 1);
    batteryCountElem.textContent = batteriesNeeded.toString();
    // Warnings about current draw vs battery limits
    pinWarnElem.textContent = "";
    dtapWarnElem.textContent = "";
    let pinSeverity = "";
    let dtapSeverity = "";
    if (totalCurrentLow > maxPinA) {
      pinWarnElem.textContent = texts[currentLang].warnPinExceeded
        .replace("{current}", totalCurrentLow.toFixed(2))
        .replace("{max}", maxPinA);
      pinSeverity = 'danger';
    } else if (totalCurrentLow > maxPinA * 0.8) {
      pinWarnElem.textContent = texts[currentLang].warnPinNear
        .replace("{current}", totalCurrentLow.toFixed(2))
        .replace("{max}", maxPinA);
      pinSeverity = 'warning';
    }
    if (!bMountCam) {
      if (totalCurrentLow > maxDtapA) {
        dtapWarnElem.textContent = texts[currentLang].warnDTapExceeded
          .replace("{current}", totalCurrentLow.toFixed(2))
          .replace("{max}", maxDtapA);
        dtapSeverity = 'danger';
      } else if (totalCurrentLow > maxDtapA * 0.8) {
        dtapWarnElem.textContent = texts[currentLang].warnDTapNear
          .replace("{current}", totalCurrentLow.toFixed(2))
          .replace("{max}", maxDtapA);
        dtapSeverity = 'warning';
      }
    }
    // Show max current capability and status (OK/Warning) for Pin and D-Tap
    if (pinWarnElem.textContent === "") {
      pinWarnElem.textContent = texts[currentLang].pinOk
        .replace("{max}", maxPinA);
      setStatusLevel(pinWarnElem, 'success');
    } else {
      setStatusLevel(pinWarnElem, pinSeverity || 'warning');
    }
    if (!bMountCam) {
      if (dtapWarnElem.textContent === "") {
        dtapWarnElem.textContent = texts[currentLang].dtapOk
          .replace("{max}", maxDtapA);
        setStatusLevel(dtapWarnElem, 'success');
      } else {
        setStatusLevel(dtapWarnElem, dtapSeverity || 'warning');
      }
    } else {
      dtapWarnElem.textContent = "";
      setStatusLevel(dtapWarnElem, null);
    }
  }

  // Battery comparison table update
  if (totalWatt > 0) {
    // Build lists of batteries that can supply this current (via Pin or D-Tap)
    const selectedBatteryName = batterySelect.value;
    const camName = cameraSelect.value;
    const plateFilter = getSelectedPlate();
    const supportsB = supportsBMountCamera(camName);
    const supportsGold = supportsGoldMountCamera(camName);
    let selectedCandidate = null;
    if (selectedBatteryName && selectedBatteryName !== "None" && devices.batteries[selectedBatteryName]) {
      const selData = devices.batteries[selectedBatteryName];
      if (
        (!plateFilter || selData.mount_type === plateFilter) &&
        (supportsB || selData.mount_type !== 'B-Mount') &&
        (supportsGold || selData.mount_type !== 'Gold-Mount')
      ) {
        const pinOK_sel = totalCurrentLow <= selData.pinA;
        const dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
        if (pinOK_sel || dtapOK_sel) {
          const selHours = selData.capacity / totalWatt;
          let selMethod;
          if (pinOK_sel && dtapOK_sel) selMethod = "both pins and D-Tap";
          else if (pinOK_sel) selMethod = "pins";
          else selMethod = "dtap";
          selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
        }
      }
    }

    const pinsCandidates = [];
    const dtapCandidates = [];
    for (let battName in devices.batteries) {
      if (battName === "None") continue;
      if (selectedCandidate && battName === selectedCandidate.name) continue;

      const battData = devices.batteries[battName];
      if (plateFilter && battData.mount_type !== plateFilter) continue;
      if (!plateFilter && !supportsB && battData.mount_type === 'B-Mount') continue;
      if (!plateFilter && !supportsGold && battData.mount_type === 'Gold-Mount') continue;
      const canPin = totalCurrentLow <= battData.pinA;
      const canDTap = !bMountCam && totalCurrentLow <= battData.dtapA;

      if (canPin) {
        const hours = battData.capacity / totalWatt;
        const method = (canDTap ? "both pins and D-Tap" : "pins");
        pinsCandidates.push({ name: battName, hours: hours, method: method });
      } else if (canDTap) {
        const hours = battData.capacity / totalWatt;
        dtapCandidates.push({ name: battName, hours: hours, method: "dtap" });
      }
    }

    // Sort by runtime (hours) descending within each group
    // Ensure stable ordering: sort by runtime descending, then by name
    const sortByHoursThenName = (a, b) => {
      const diff = b.hours - a.hours;
      return diff !== 0 ? diff : collator.compare(a.name, b.name);
    };
    pinsCandidates.sort(sortByHoursThenName);
    dtapCandidates.sort(sortByHoursThenName);

    // Prepare table HTML
    let tableHtml = `<tr><th>${texts[currentLang].batteryTableLabel}</th><th>${texts[currentLang].runtimeLabel}</th><th></th></tr>`;

    if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
      // No battery can supply via either output
      tableHtml += `<tr><td colspan="3">${texts[currentLang].noBatterySupports}</td></tr>`;
    } else {
      const allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
      const maxHours = Math.max(...allCandidatesForMax.map(c => c.hours)) || 1; // Ensure not dividing by zero

      // Helper function to get the correct bar class
      const getBarClass = (method) => {
          return method === "pins" ? "bar bar-pins-only" : "bar";
      };
      // Helper to display method label
      const getMethodLabel = (method) => {
            const colorMap = {
              pins: { var: '--warning-color', fallback: '#FF9800', text: texts[currentLang].methodPinsOnly },
              'both pins and D-Tap': { var: '--success-color', fallback: '#4CAF50', text: texts[currentLang].methodPinsAndDTap },
              infinite: { var: '--info-color', fallback: '#007bff', text: texts[currentLang].methodInfinite }
            };
            const entry = colorMap[method];
            if (entry) {
              const color = getCssVariableValue(entry.var, entry.fallback);
              return `<span style="color:${color};">${entry.text}</span>`;
            }
            return method;
        };

      // Add selected battery first, if it's a valid candidate
      if (selectedCandidate) {
        tableHtml += `<tr class="selectedBatteryRow">
                        <td>${escapeHtml(selectedCandidate.name)}</td>
                        <td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td>
                        <td>
                          <div class="barContainer">
                            <div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div>
                          </div>
                        </td>
                      </tr>`;
      }
      // Add other candidates
      pinsCandidates.forEach(candidate => {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
        tableHtml += `<tr>
                        <td>${escapeHtml(candidate.name)}</td>
                        <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                        <td>
                          <div class="barContainer">
                            <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                          </div>
                        </td>
                      </tr>`;
      });
       dtapCandidates.forEach(candidate => {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
        // Only add if not already in pinsCandidates (to avoid duplicates if a battery can do both but was only listed under dtapCandidates)
        const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
        if (!alreadyInPins) {
            tableHtml += `<tr>
                            <td>${escapeHtml(candidate.name)}</td>
                            <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                            <td>
                              <div class="barContainer">
                                <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                              </div>
                            </td>
                          </tr>`;
        }
      });
    }
    batteryTableElem.innerHTML = tableHtml;
    batteryComparisonSection.style.display = "block";
  } else {
    batteryComparisonSection.style.display = "none";
  }
  const feedback = renderFeedbackTable(getCurrentSetupKey());
  if (feedback !== null) {
    let combinedRuntime = feedback.runtime;
    if (Number.isFinite(hours)) {
      combinedRuntime =
        (feedback.runtime * feedback.weight + hours) / (feedback.weight + 1);
    }
    batteryLifeElem.textContent = combinedRuntime.toFixed(2);
    lastRuntimeHours = combinedRuntime;
    if (batteryLifeLabelElem) {
      let label = texts[currentLang].batteryLifeLabel;
      const userNote = texts[currentLang].runtimeUserCountNote.replace('{count}', feedback.count);
      const idx = label.indexOf(')');
      if (idx !== -1) {
        label = `${label.slice(0, idx)}, ${userNote}${label.slice(idx)}`;
      }
      batteryLifeLabelElem.textContent = label;
      batteryLifeLabelElem.setAttribute(
        "data-help",
        texts[currentLang].batteryLifeHelp
      );
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent =
        feedback.count > 4 ? texts[currentLang].runtimeAverageNote : '';
    }
    const batteriesNeeded = Math.ceil(10 / combinedRuntime + 1);
    batteryCountElem.textContent = batteriesNeeded.toString();
  } else {
    if (batteryLifeLabelElem) {
      batteryLifeLabelElem.textContent = texts[currentLang].batteryLifeLabel;
      batteryLifeLabelElem.setAttribute(
        "data-help",
        texts[currentLang].batteryLifeHelp
      );
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent = '';
    }
  }
  renderTemperatureNote(lastRuntimeHours);
  checkFizCompatibility();
  checkFizController();
  checkArriCompatibility();
  if (setupDiagramContainer) renderSetupDiagram();
  refreshGearListIfVisible();
}

function getCurrentSetupKey() {
  const camera = cameraSelect.value || '';
  const monitor = monitorSelect.value || '';
  const video = videoSelect.value || '';
  const cage = cageSelect ? cageSelect.value : '';
  const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None').sort().join(',');
  const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None').sort().join(',');
  const distance = distanceSelect.value || '';
  const battery = batterySelect.value || '';
  const hotswap = hotswapSelect.value || '';
  const plate = getSelectedPlate() || '';
  return [camera, monitor, video, cage, motors, controllers, distance, battery, hotswap, plate].join('|');
}

function deleteFeedbackEntry(key, index) {
  const feedbackData = loadFeedbackSafe();
  if (feedbackData[key]) {
    feedbackData[key].splice(index, 1);
    if (!feedbackData[key].length) {
      delete feedbackData[key];
    }
    saveFeedbackSafe(feedbackData);
    updateCalculations();
  }
}

function renderFeedbackTable(currentKey) {
  const container = document.getElementById('feedbackTableContainer');
  const table = document.getElementById('userFeedbackTable');
  const feedbackData = loadFeedbackSafe();
  // Filter out any stored location information to keep the table column hidden
  const entries = (feedbackData[currentKey] || []).map(entry => {
    const rest = { ...entry };
    delete rest.location;
    return rest;
  });

  if (!entries.length) {
    if (table) {
      table.innerHTML = '';
      table.classList.add('hidden');
    }
    if (container) container.classList.add('hidden');
    return null;
  }

  const columns = [
    { key: 'username', label: 'User' },
    { key: 'date', label: 'Date' },
    { key: 'cameraWifi', label: 'WIFI' },
    { key: 'resolution', label: 'Res' },
    { key: 'codec', label: 'Codec' },
    { key: 'framerate', label: 'FPS' },
    { key: 'firmware', label: 'Firmware' },
    { key: 'batteryAge', label: 'Battery Age' },
    { key: 'monitorBrightness', label: 'Monitor Brightness' },
    { key: 'temperature', label: 'temp' },
    { key: 'charging', label: 'Charging' },
    { key: 'runtime', label: 'runtime' },
    { key: 'batteriesPerDay', label: 'batteries a day' },
    { key: 'weighting', label: 'weight' }
  ];

  // Helper functions for weighting factors
  const parseResolution = str => {
    if (!str) return null;
    const s = String(str).toLowerCase();
    const kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
    if (kMatch) return parseFloat(kMatch[1]) * 1000;
    const pMatch = s.match(/(\d{3,4})p/);
    if (pMatch) return parseInt(pMatch[1], 10);
    const xMatch = s.match(/x\s*(\d{3,4})/);
    if (xMatch) return parseInt(xMatch[1], 10);
    const numMatch = s.match(/(\d{3,4})/);
    return numMatch ? parseInt(numMatch[1], 10) : null;
  };
  const parseFramerate = str => {
    if (!str) return null;
    const m = String(str).match(/\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  };
  const tempFactor = temp => {
    if (Number.isNaN(temp)) return 1;
    if (temp >= 25) return 1;
    if (temp >= 0) return 1 + (25 - temp) * 0.01;
    if (temp >= -10) return 1.25 + (-temp) * 0.035;
    if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
    return 2;
  };

  const resolutionWeight = res => {
    if (res >= 12000) return 3;
    if (res >= 8000) return 2;
    if (res >= 4000) return 1.5;
    if (res >= 1080) return 1;
    return res / 1080;
  };

  const codecWeight = codec => {
    if (!codec) return 1;
    const c = String(codec).toLowerCase();
    if (
      /(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)
    )
      return 1;
    if (/prores/.test(c)) return 1.1;
    if (/dnx|avid/.test(c)) return 1.2;
    if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
    if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
    if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
    return 1;
  };

  const camPower = devices?.cameras?.[cameraSelect?.value]?.powerDrawWatts || 0;
  const monitorPower = devices?.monitors?.[monitorSelect?.value]?.powerDrawWatts || 0;
  const videoPower = devices?.video?.[videoSelect?.value]?.powerDrawWatts || 0;
  const motorPower = motorSelects.reduce(
    (sum, sel) => sum + (devices?.fiz?.motors?.[sel.value]?.powerDrawWatts || 0),
    0
  );
  const controllerPower = controllerSelects.reduce(
    (sum, sel) => sum + (devices?.fiz?.controllers?.[sel.value]?.powerDrawWatts || 0),
    0
  );
  const distancePower = devices?.fiz?.distance?.[distanceSelect?.value]?.powerDrawWatts || 0;
  const otherPower = videoPower + motorPower + controllerPower + distancePower;
  const totalPower = camPower + monitorPower + otherPower;
  const specBrightness = devices?.monitors?.[monitorSelect?.value]?.brightnessNits;

  let weightedSum = 0;
  let weightTotal = 0;
  let count = 0;
  const breakdown = entries.map(e => {
    const rt = parseFloat(e.runtime);
    if (Number.isNaN(rt)) return null;

    let camFactor = 1;
    let monitorFactor = 1;

    const res = parseResolution(e.resolution);
    if (res) camFactor *= resolutionWeight(res);

    const fps = parseFramerate(e.framerate);
    if (fps) camFactor *= fps / 24;

    const wifi = (e.cameraWifi || '').toLowerCase();
    if (wifi.includes('on')) camFactor *= 1.1;

    const codec = e.codec;
    if (codec) camFactor *= codecWeight(codec);

    const entryBrightness = parseFloat(e.monitorBrightness);
    if (!Number.isNaN(entryBrightness) && specBrightness) {
      const ratio = entryBrightness / specBrightness;
      if (ratio < 1) monitorFactor *= ratio;
    }

    let weight = 1;
    if (totalPower > 0) {
      weight =
        (camFactor * camPower + monitorFactor * monitorPower + otherPower) /
        totalPower;
    }

    const temp = parseFloat(e.temperature);
    const tempMul = tempFactor(temp);
    const adjustedRuntime = rt * tempMul;

    weightedSum += adjustedRuntime * weight;
    weightTotal += weight;
    count++;

    return {
      temperature: tempMul,
      resolution: res ? resolutionWeight(res) : 1,
      framerate: fps ? fps / 24 : 1,
      wifi: wifi.includes('on') ? 1.1 : 1,
      codec: codec ? codecWeight(codec) : 1,
      monitor: monitorFactor,
      weight
    };
  });

  const maxWeight = Math.max(...breakdown.filter(Boolean).map(b => b.weight), 0);
  let html = '<tr>' + columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join('') + '<th></th></tr>';
  entries.forEach((entry, index) => {
    html += '<tr>';
    columns.forEach(c => {
      if (c.key === 'weighting') {
        const b = breakdown[index];
        if (b) {
          const percent = maxWeight ? (b.weight / maxWeight) * 100 : 0;
          const share = b.weight * 100;
          const tooltip =
            `Temp ×${b.temperature.toFixed(2)}\n` +
            `Res ×${b.resolution.toFixed(2)}\n` +
            `FPS ×${b.framerate.toFixed(2)}\n` +
            `Codec ×${b.codec.toFixed(2)}\n` +
            `Wi-Fi ×${b.wifi.toFixed(2)}\n` +
            `Monitor ×${b.monitor.toFixed(2)}\n` +
            `Share ${share.toFixed(1)}%`;
          html +=
            `<td><div class="weightingRow"><div class="barContainer"><div class="weightBar" style="width:${percent}%" title="${escapeHtml(tooltip)}"></div></div><span class="weightingPercent">${share.toFixed(1)}%</span></div></td>`;
        } else {
          html += '<td></td>';
        }
      } else if (c.key === 'date') {
        html += `<td>${escapeHtml(formatDateString(entry[c.key]))}</td>`;
      } else {
        html += `<td>${escapeHtml(entry[c.key] || '')}</td>`;
      }
    });
    html += `<td><button data-key="${encodeURIComponent(currentKey)}" data-index="${index}" class="deleteFeedbackBtn">Delete</button></td>`;
    html += '</tr>';
  });
  table.innerHTML = html;
  table.classList.remove('hidden');
  if (container) container.classList.remove('hidden');
  table.querySelectorAll('.deleteFeedbackBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = decodeURIComponent(btn.dataset.key);
      const idx = parseInt(btn.dataset.index, 10);
      deleteFeedbackEntry(key, idx);
    });
  });

  if (count >= 3 && weightTotal > 0) {
    return { runtime: weightedSum / weightTotal, count, weight: weightTotal };
  }
  return null;
}

// Determine differences between the default device database and the current
// in-memory `devices` object. Only changed, added or removed entries are
// returned so they can be shared in a generated link.
function getDeviceChanges() {
  if (!window.defaultDevices) return {};
  const diff = {};
  const record = (cat, name, val, sub) => {
    if (sub) {
      diff.fiz = diff.fiz || {};
      diff.fiz[sub] = diff.fiz[sub] || {};
      diff.fiz[sub][name] = val;
    } else {
      diff[cat] = diff[cat] || {};
      diff[cat][name] = val;
    }
  };
  const compare = (cat, defCat, curCat, sub) => {
    Object.keys(curCat).forEach(name => {
      const cur = curCat[name];
      const def = defCat[name];
      if (!def || JSON.stringify(cur) !== JSON.stringify(def)) {
        record(cat, name, cur, sub);
      }
    });
    Object.keys(defCat).forEach(name => {
      if (!curCat[name]) record(cat, name, null, sub);
    });
  };
  compare('cameras', window.defaultDevices.cameras || {}, devices.cameras || {});
  compare('viewfinders', window.defaultDevices.viewfinders || {}, devices.viewfinders || {});
  compare('monitors', window.defaultDevices.monitors || {}, devices.monitors || {});
  compare('video', window.defaultDevices.video || {}, devices.video || {});
  compare('batteries', window.defaultDevices.batteries || {}, devices.batteries || {});
  compare('batteryHotswaps', window.defaultDevices.batteryHotswaps || {}, devices.batteryHotswaps || {});
  ['motors', 'controllers', 'distance'].forEach(sub => {
    const defCat = window.defaultDevices.fiz ? (window.defaultDevices.fiz[sub] || {}) : {};
    const curCat = devices.fiz ? (devices.fiz[sub] || {}) : {};
    compare('fiz', defCat, curCat, sub);
    if (diff.fiz && diff.fiz[sub] && !Object.keys(diff.fiz[sub]).length) {
      delete diff.fiz[sub];
    }
  });
  if (diff.fiz && !Object.keys(diff.fiz).length) delete diff.fiz;
  Object.keys(diff).forEach(cat => {
    if (cat !== 'fiz' && !Object.keys(diff[cat]).length) delete diff[cat];
  });
  return diff;
}

// Apply a set of device changes to the current in-memory database and update
// all related UI elements and localStorage. `changes` mirrors the structure
// returned by getDeviceChanges().
function applyDeviceChanges(changes) {
  if (!changes || typeof changes !== 'object') return;

  const applyToCategory = (target, delta) => {
    Object.keys(delta).forEach(name => {
      const val = delta[name];
      if (val === null) {
        delete target[name];
      } else {
        target[name] = val;
      }
    });
  };

  Object.keys(changes).forEach(cat => {
    if (cat === 'fiz') {
      Object.keys(changes.fiz || {}).forEach(sub => {
        devices.fiz[sub] = devices.fiz[sub] || {};
        applyToCategory(devices.fiz[sub], changes.fiz[sub]);
      });
    } else {
      devices[cat] = devices[cat] || {};
      applyToCategory(devices[cat], changes[cat]);
    }
  });

  unifyDevices(devices);
  storeDevices(devices);
  refreshDeviceLists();

  // Re-populate dropdowns to include any newly added devices
  populateSelect(cameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
  controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);

  updateFizConnectorOptions();
  updateMotorConnectorOptions();
  updateControllerConnectorOptions();
  updateControllerPowerOptions();
  updateControllerBatteryOptions();
  updateControllerConnectivityOptions();
  updateDistanceConnectionOptions();
  updateDistanceMethodOptions();
  updateDistanceDisplayOptions();
}

function renderSetupDiagram() {
  if (!setupDiagramContainer) return;

  const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;

  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];
  const monitorName = monitorSelect.value;
  const monitor = devices.monitors[monitorName];
  const videoName = videoSelect.value;
  const video = devices.video[videoName];
  const batteryName = batterySelect.value;

  const distanceName = distanceSelect.value;

  let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  motors.sort((a, b) => motorPriority(a) - motorPriority(b));
  const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
  const hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    const [m] = motors.splice(internalIdx, 1);
    motors.unshift(m);
  }
  let controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));

  const inlineControllers = controllers;

  const nodes = [];
  const pos = {};
  const nodeMap = {};
  const step = 300; // extra spacing for edge labels
  const VIDEO_LABEL_SPACING = 10;
  const EDGE_LABEL_GAP = 12;
  const EDGE_LABEL_VERTICAL_GAP = 8;
  const EDGE_ROUTE_LABEL_GAP = 10;
  const baseY = 220;
  let x = 80;

  if (batteryName && batteryName !== 'None') {
    let batteryLabel = batteryName;
    const battMount = devices.batteries[batteryName]?.mount_type;
    if (cam && battMount && cam.power?.batteryPlateSupport?.some(bp => bp.type === battMount && bp.mount === 'native')) {
      batteryLabel += ` on native ${battMount} plate via Pins`;
    }
    pos.battery = { x, y: baseY, label: batteryLabel };
    nodes.push('battery');
    nodeMap.battery = { category: 'batteries', name: batteryName };
    x += step;
  }

  if (camName && camName !== 'None') {
    pos.camera = { x, y: baseY, label: camName };
    nodes.push('camera');
    nodeMap.camera = { category: 'cameras', name: camName };
    x += step;
  }

  const controllerIds = controllers.map((_, idx) => `controller${idx}`);
  const motorIds = motors.map((_, idx) => `motor${idx}`);

  // Precompute maps for fast lookup instead of repeated indexOf calls
  const controllerNameMap = new Map();
  controllerIds.forEach((id, idx) => {
    controllerNameMap.set(id, inlineControllers[idx] || controllers[idx]);
  });
  const motorNameMap = new Map();
  motorIds.forEach((id, idx) => {
    motorNameMap.set(id, motors[idx]);
  });

  const hasMainCtrl = controllers.some(n => controllerPriority(n) === 0);
  let useMotorFirst = (!hasMainCtrl && hasInternalMotor) ||
    (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);

  const addNode = (id, category, label) => {
    pos[id] = { x, y: baseY, label };
    nodes.push(id);
    nodeMap[id] = { category, name: label };
    x += step;
  };

  if (useMotorFirst && motorIds.length) {
    addNode(motorIds[0], 'fiz.motors', motors[0]);
    controllerIds.forEach((id, idx) => {
      addNode(id, 'fiz.controllers', inlineControllers[idx]);
    });
    motorIds.slice(1).forEach((id, idx) => {
      addNode(id, 'fiz.motors', motors[idx + 1]);
    });
  } else {
    controllerIds.forEach((id, idx) => {
      addNode(id, 'fiz.controllers', inlineControllers[idx]);
    });
    motorIds.forEach((id, idx) => {
      addNode(id, 'fiz.motors', motors[idx]);
    });
  }

  if (monitorName && monitorName !== 'None') {
    pos.monitor = { x: pos.camera ? pos.camera.x : 60, y: baseY - step, label: monitorName };
    nodes.push('monitor');
    nodeMap.monitor = { category: 'monitors', name: monitorName };
  }
  if (videoName && videoName !== 'None') {
    pos.video = { x: pos.camera ? pos.camera.x : 60, y: baseY + step, label: videoName };
    nodes.push('video');
    nodeMap.video = { category: 'video', name: videoName };
  }

  let inlineDistance = false;
  let dedicatedDistance = false;
  if (distanceName && distanceName !== 'None') {
    const attach = inlineControllers.length ? controllerIds[0] : motorIds[0];
    if (attach) {
      const arriDevices = [...inlineControllers, ...motors].some(n => isArri(n));
      const hasDedicatedPort = inlineControllers.some(n => /RIA-1/i.test(n) || /UMC-4/i.test(n));
      dedicatedDistance = hasDedicatedPort && arriDevices;
      inlineDistance = arriDevices && !hasDedicatedPort && inlineControllers.length;
      if (inlineDistance && motorIds.length) {
        const nextId = motorIds[0];
        pos.distance = { x: (pos[attach].x + pos[nextId].x) / 2, y: baseY - step, label: distanceName };
      } else {
        pos.distance = { x: pos[attach].x, y: baseY - step, label: distanceName };
      }
      nodes.push('distance');
    nodeMap.distance = { category: 'fiz.distance', name: distanceName };
    }
  }

  // Apply any manually moved node positions and cleanup
  Object.keys(manualPositions).forEach(id => { if (!pos[id]) delete manualPositions[id]; });
  Object.entries(pos).forEach(([id, p]) => {
    if (manualPositions[id]) {
      p.x = manualPositions[id].x;
      p.y = manualPositions[id].y;
    }
  });

  let firstFizId;
  if (hasInternalMotor && motorIds.length && !hasMainCtrl) {
    firstFizId = motorIds[0];
  } else {
    firstFizId = controllerIds.length ? controllerIds[0] : motorIds[0];
  }

  // Determine node heights and widths based on label length so text fits inside
  const DEFAULT_NODE_H = 120;
  const DEFAULT_NODE_W = 120;
  const nodeHeights = {};
  const nodeWidths = {};
  const diagramLabelFontSize = 'var(--font-size-diagram-label, 10px)';
  const diagramTextFontSize = 'var(--font-size-diagram-text, 12px)';
  const DIAGRAM_LABEL_LINE_HEIGHT = 12;
  const DIAGRAM_ICON_TEXT_GAP = 8;
  const DEFAULT_DIAGRAM_ICON_SIZE = 24;

  nodes.forEach(id => {
    const label = pos[id].label || id;
    const lines = wrapLabel(label);
    // Extra space if an icon is shown
    const hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
    nodeHeights[id] = Math.max(
      DEFAULT_NODE_H,
      lines.length * 12 + (hasIcon ? 30 : 20)
    );
    const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
    nodeWidths[id] = Math.max(DEFAULT_NODE_W, longest * 9 + 20);
  });
  const NODE_W = Math.max(...Object.values(nodeWidths), DEFAULT_NODE_W);
  const NODE_H = Math.max(...Object.values(nodeHeights), DEFAULT_NODE_H);
  const getNodeHeight = id => nodeHeights[id] || NODE_H;

  let viewWidth;

  let chain = [];
  const edges = [];
  const usedConns = {};
  const markUsed = (id, side) => { usedConns[`${id}|${side}`] = true; };
  const isUsed = (id, side) => usedConns[`${id}|${side}`];
  const pushEdge = (edge, type) => {
    if (!edge.fromSide || !edge.toSide) {
      const pair = closestConnectorPair(edge.from, edge.to, usedConns);
      if (pair) {
        if (!edge.fromSide) edge.fromSide = pair.fromSide;
        if (!edge.toSide) edge.toSide = pair.toSide;
      }
    } else {
      if (isUsed(edge.from, edge.fromSide) || isUsed(edge.to, edge.toSide)) return;
    }
    markUsed(edge.from, edge.fromSide);
    markUsed(edge.to, edge.toSide);
    edges.push({ ...edge, type });
  };
  const battMount = devices.batteries[batteryName]?.mount_type;
  if (cam && batteryName && batteryName !== 'None') {
    const plateType = getSelectedPlate();
    const nativePlate = plateType && isSelectedPlateNative(camName);
    const camPort = firstPowerInputType(cam);
    const inLabel = camPort || plateType;
    const label = nativePlate ? '' : formatConnLabel(battMount, inLabel);
    pushEdge({ from: 'battery', to: 'camera', label, fromSide: 'right', toSide: 'left' }, 'power');
  }
  if (monitor && firstPowerInputType(monitor)) {
    const mPort = firstPowerInputType(monitor);
    if (batteryName && batteryName !== 'None') {
      pushEdge({ from: 'battery', to: 'monitor', label: formatConnLabel(battMount, mPort), fromSide: 'top', toSide: 'left' }, 'power');
    }
  }
  if (video && firstPowerInputType(video)) {
    const pPort = firstPowerInputType(video);
    if (batteryName && batteryName !== 'None') {
      pushEdge({ from: 'battery', to: 'video', label: formatConnLabel(battMount, pPort), fromSide: 'bottom', toSide: 'left' }, 'power');
    }
  }
  if (cam && cam.videoOutputs?.length) {
    const camOut = cam.videoOutputs[0].type;
    const monInObj = monitor && (monitor.video?.inputs?.[0] || monitor.videoInputs?.[0]);
    const vidInObj = video && (video.videoInputs?.[0] || (video.video ? video.video.inputs[0] : null));
    if (monitor && monInObj) {
      const monIn = monInObj.portType || monInObj.type || monInObj;
      pushEdge({ from: 'camera', to: 'monitor', label: connectionLabel(camOut, monIn), fromSide: 'top', toSide: 'bottom', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
    }
    if (video && vidInObj) {
      const vidIn = vidInObj.portType || vidInObj.type || vidInObj;
      pushEdge({ from: 'camera', to: 'video', label: connectionLabel(camOut, vidIn), fromSide: 'bottom', toSide: 'top', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
    }
  }
  useMotorFirst = (!hasMainCtrl && hasInternalMotor) ||
    (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);
  const distanceSelected = distanceName && distanceName !== 'None';
  const distanceInChain = distanceSelected && !dedicatedDistance;

  let firstController = false;
  let firstMotor = false;

  if (useMotorFirst && motorIds.length) {
    chain.push(motorIds[0]);
    firstMotor = true;
  } else if (controllerIds.length) {
    chain.push(controllerIds[0]);
    firstController = true;
  } else if (motorIds.length) {
    chain.push(motorIds[0]);
    firstMotor = true;
  }

  if (distanceInChain) chain.push('distance');

  if (controllerIds.length) chain = chain.concat(controllerIds.slice(firstController ? 1 : 0));
  if (motorIds.length) chain = chain.concat(motorIds.slice(firstMotor ? 1 : 0));

  if (cam && chain.length) {
    let first = chain[0];
    if (first === 'distance' && chain.length > 1 && (controllerIds.length || hasInternalMotor)) {
      first = chain[1];
    }
    let firstName = null;
    if (first.startsWith('controller')) {
      firstName = controllerNameMap.get(first);
    } else if (first.startsWith('motor')) {
      firstName = motorNameMap.get(first);
    }
    const port = first === 'distance' ? 'LBUS' : controllerCamPort(firstName);
    const camPort = cameraFizPort(camName, port, firstName);
    pushEdge({ from: 'camera', to: first, label: formatConnLabel(camPort, port), noArrow: true }, 'fiz');
  } else if (motorIds.length && cam) {
    const camPort = cameraFizPort(camName, motorFizPort(motors[0]), motors[0]);
    pushEdge({ from: 'camera', to: motorIds[0], label: formatConnLabel(camPort, motorFizPort(motors[0])), noArrow: true }, 'fiz');
  }

  for (let i = 0; i < chain.length - 1; i++) {
    const a = chain[i];
    const b = chain[i + 1];
    let fromName = null, toName = null;
    if (a.startsWith('controller')) fromName = controllerNameMap.get(a);
    else if (a.startsWith('motor')) fromName = motorNameMap.get(a);
    if (b.startsWith('controller')) toName = controllerNameMap.get(b);
    else if (b.startsWith('motor')) toName = motorNameMap.get(b);
    pushEdge({ from: a, to: b, label: formatConnLabel(fizPort(fromName), fizPort(toName)), noArrow: true }, 'fiz');
  }



  if (dedicatedDistance && controllerIds.length && distanceSelected) {
    const ctrlName = inlineControllers[0] || controllers[0];
    const distPort = controllerDistancePort(ctrlName);
    const portLabel = formatConnLabel(fizPort(ctrlName), distPort);
    pushEdge({ from: controllerIds[0], to: 'distance', label: portLabel, noArrow: true, toSide: 'bottom-right' }, 'fiz');
  }


  const fizList = [];
  controllerIds.forEach((id, idx) => {
    fizList.push({ id, name: inlineControllers[idx] || controllers[idx] });
  });
  motorIds.forEach((id, idx) => {
    fizList.push({ id, name: motors[idx] });
  });

  const isMainCtrl = name => /RIA-1/i.test(name) || /UMC-4/i.test(name) || /cforce.*rf/i.test(name);
  let powerTarget = null;
  const main = fizList.find(d => isMainCtrl(d.name));
  if (main) {
    powerTarget = main;
  } else {
    powerTarget = fizList.find(d => fizNeedsPower(d.name));
  }

  if (powerTarget && fizNeedsPower(powerTarget.name)) {
    const { id: fizId, name } = powerTarget;
    const powerSrc = batteryName && batteryName !== 'None' ? 'battery' : null;
    const label = formatConnLabel('D-Tap', fizPowerPort(name));
    const skipBatt = isArri(camName) && isArriOrCmotion(name);
    if (powerSrc && !skipBatt) {
      pushEdge({
        from: powerSrc,
        to: fizId,
        label,
        fromSide: 'bottom-left',
        toSide: 'bottom',
        route: 'down-right-up'
      }, 'power');
    }
  }
  if (nodes.length === 0) {
    setupDiagramContainer.innerHTML = `<p class="diagram-placeholder">${texts[currentLang].setupDiagramPlaceholder}</p>`;
    return;
  }

  const xs = Object.values(pos).map(p => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const contentWidth = maxX - minX;
  viewWidth = Math.max(500, contentWidth + NODE_W);
  let shiftX = 0;
  if (Object.keys(manualPositions).length === 0) {
    shiftX = viewWidth / 2 - (minX + maxX) / 2;
    Object.values(pos).forEach(p => { p.x += shiftX; });
  }

  const ys = Object.values(pos).map(p => p.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const viewHeight = (maxY - minY) + NODE_H + 120;

  function computePath(fromId, toId, labelSpacing = 0, opts = {}) {
    const from = connectorPos(fromId, opts.fromSide);
    const to = connectorPos(toId, opts.toSide);
    let path, lx, ly, angle = 0;

    if (opts.route === 'down-right-up') {
      const bottomY = maxY + NODE_H;
      path = `M ${from.x} ${from.y} V ${bottomY} H ${to.x} V ${to.y}`;
      lx = (from.x + to.x) / 2;
      ly = bottomY - EDGE_ROUTE_LABEL_GAP - labelSpacing;
    } else {
      path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const len = Math.hypot(dx, dy) || 1;
      const baseGap = Math.abs(dx) < Math.abs(dy) ? EDGE_LABEL_VERTICAL_GAP : EDGE_LABEL_GAP;
      const off = baseGap + labelSpacing;
      const perpX = (dy / len) * off;
      const perpY = (-dx / len) * off;
      lx = midX + perpX;
      ly = midY + perpY;
    }

    return { path, labelX: lx, labelY: ly, angle };
  }

  const EDGE_LABEL_WRAP = 18;

  function wrapLabel(text, maxLen = 16) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach(w => {
      if ((line + ' ' + w).trim().length > maxLen && line) {
        lines.push(line.trim());
        line = w;
      } else {
        line += ` ${w}`;
      }
    });
    if (line.trim()) lines.push(line.trim());
    return lines;
  }

  let svg = `<svg viewBox="0 ${minY - NODE_H/2 - 20} ${viewWidth} ${viewHeight}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>
    <linearGradient id="firstFizGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090" />
      <stop offset="100%" stop-color="#d33" />
    </linearGradient>
  </defs>`;
  svg += `<g id="diagramRoot">`;

  edges.forEach(e => {
    if (!pos[e.from] || !pos[e.to]) return;
    const { path, labelX, labelY, angle } = computePath(e.from, e.to, e.labelSpacing || 0, e);
    if (!path) return;
    const cls = e.type ? `edge-path ${e.type}` : 'edge-path';
    svg += `<path class="${cls}" d="${path}" />`;
    if (e.label) {
      const rot = ` transform="rotate(${angle} ${labelX} ${labelY})"`;
      const lines = wrapLabel(e.label, EDGE_LABEL_WRAP);
      if (lines.length <= 1) {
        svg += `<text class="edge-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle"${rot}>${escapeHtml(e.label)}</text>`;
      } else {
        const lineHeight = 12;
        const startDy = -((lines.length - 1) * lineHeight) / 2;
        svg += `<text class="edge-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle"${rot}>`;
        lines.forEach((line, i) => {
          const dy = i === 0 ? startDy : lineHeight;
          svg += `<tspan x="${labelX}" dy="${dy}">${escapeHtml(line)}</tspan>`;
        });
        svg += `</text>`;
      }
    }
  });


  function connectorsFor(id) {
    switch (id) {
      case 'battery':
        return [
          { side: 'top', color: 'red' },
          { side: 'right', color: 'red' },
          { side: 'bottom', color: 'red' },
          { side: 'bottom-left', color: 'red' }
        ];
      case 'monitor':
        return [
          { side: 'left', color: 'red' },
          { side: 'bottom', color: 'blue' }
        ];
      case 'video':
        return [
          { side: 'left', color: 'red' },
          { side: 'top', color: 'blue' }
        ];
      case 'camera':
        return [
          { side: 'left', color: 'red' },
          { side: 'top', color: 'blue' },
          { side: 'bottom', color: 'blue' },
          { side: 'right', color: 'green' }
        ];
      case 'distance':
        return [
          { side: 'bottom', color: 'green' },
          { side: 'bottom-right', color: 'green' }
        ];
      default:
        if (id.startsWith('controller') || id.startsWith('motor')) {
          if (firstFizId && id === firstFizId) {
            return [
              { side: 'top', color: 'green' },
              { side: 'left', color: 'green' },
              { side: 'right', color: 'green' },
              { side: 'bottom', color: 'red' }
            ];
          }
          return [
            { side: 'left', color: 'green' },
            { side: 'right', color: 'green' }
          ];
        }
    }
    return [];
  }

  function connectorPos(nodeId, side) {
    const p = pos[nodeId];
    if (!p) return { x: 0, y: 0 };
    const h = getNodeHeight(nodeId);
    switch (side) {
      case 'top':
        return { x: p.x, y: p.y - h / 2 };
      case 'bottom':
        return { x: p.x, y: p.y + h / 2 };
      case 'bottom-left':
        return { x: p.x - NODE_W / 2 + NODE_W / 3, y: p.y + h / 2 };
      case 'bottom-right':
        return { x: p.x + NODE_W / 2 - NODE_W / 3, y: p.y + h / 2 };
      case 'left':
        return { x: p.x - NODE_W / 2, y: p.y };
      case 'right':
        return { x: p.x + NODE_W / 2, y: p.y };
      default:
        return { x: p.x, y: p.y };
    }
  }

  function closestConnectorPair(idA, idB, used = {}) {
    const aConns = connectorsFor(idA);
    const bConns = connectorsFor(idB);
    let best = null;
    let bestDist = Infinity;
    aConns.forEach(ac => {
      if (used[`${idA}|${ac.side}`]) return;
      const ap = connectorPos(idA, ac.side);
      bConns.forEach(bc => {
        if (ac.color !== bc.color) return;
        if (used[`${idB}|${bc.side}`]) return;
        const bp = connectorPos(idB, bc.side);
        const d = Math.hypot(ap.x - bp.x, ap.y - bp.y);
        if (d < bestDist) {
          bestDist = d;
          best = { fromSide: ac.side, toSide: bc.side };
        }
      });
    });
    return best;
  }

  nodes.forEach(id => {
    const p = pos[id];
    if (!p) return;
    const h = getNodeHeight(id);
    const nodeCls = id === firstFizId ? 'diagram-node first-fiz' : 'diagram-node';
    const rectCls = id === firstFizId ? 'node-box first-fiz' : 'node-box';
    svg += `<g class="${nodeCls}" data-node="${id}">`;
    svg += `<rect class="${rectCls}" x="${p.x - NODE_W/2}" y="${p.y - h/2}" width="${NODE_W}" height="${h}" rx="4" ry="4" />`;
    if (id === firstFizId) {
      const xLeft = p.x - NODE_W / 2;
      const yBottom = p.y + h / 2;
      const r = 4;
      const highlight = `M ${xLeft} ${p.y} L ${xLeft} ${yBottom - r} A ${r} ${r} 0 0 1 ${xLeft + r} ${yBottom} L ${p.x} ${yBottom}`;
      svg += `<path class="first-fiz-highlight" d="${highlight}" />`;
    }

    const conns = connectorsFor(id);
    conns.forEach(c => {
      let cx = p.x, cy = p.y;
      if (c.side === 'top') { cx = p.x; cy = p.y - h / 2; }
      else if (c.side === 'bottom') { cx = p.x; cy = p.y + h / 2; }
      else if (c.side === 'bottom-left') { cx = p.x - NODE_W / 2 + NODE_W / 3; cy = p.y + h / 2; }
      else if (c.side === 'bottom-right') { cx = p.x + NODE_W / 2 - NODE_W / 3; cy = p.y + h / 2; }
      else if (c.side === 'left') { cx = p.x - NODE_W / 2; cy = p.y; }
      else if (c.side === 'right') { cx = p.x + NODE_W / 2; cy = p.y; }
      svg += `<circle class="conn ${c.color}" cx="${cx}" cy="${cy}" r="4" />`;
    });

    let icon = diagramIcons[id];
    if (!icon) {
      if (id.startsWith('motor')) {
        icon = diagramIcons.motors;
      } else if (id.startsWith('controller')) {
        const name = (nodeMap[id]?.name || '').toLowerCase();
        if (/handle|grip/.test(name)) icon = diagramIcons.handle;
        else icon = diagramIcons.controllers;
      } else if (id === 'distance') {
        icon = diagramIcons.distance;
      }
    }

    const lines = wrapLabel(p.label || id);
    const resolvedIcon = icon ? resolveIconGlyph(icon) : null;
    const hasIconGlyph = Boolean(resolvedIcon && (resolvedIcon.markup || resolvedIcon.char));
    const iconSize = hasIconGlyph && Number.isFinite(resolvedIcon.size)
      ? resolvedIcon.size
      : DEFAULT_DIAGRAM_ICON_SIZE;
    const iconHeight = hasIconGlyph ? iconSize : 0;
    const textLineCount = lines.length;
    const textHeight = textLineCount ? textLineCount * DIAGRAM_LABEL_LINE_HEIGHT : 0;
    const iconGap = hasIconGlyph && textLineCount ? DIAGRAM_ICON_TEXT_GAP : 0;
    const contentHeight = iconHeight + iconGap + textHeight;
    const contentTop = p.y - contentHeight / 2;
    const centerX = formatSvgCoordinate(p.x);

    if (hasIconGlyph) {
      const iconCenterY = contentTop + iconHeight / 2;
      if (resolvedIcon.markup) {
        const positioned = positionSvgMarkup(
          ensureSvgHasAriaHidden(resolvedIcon.markup),
          p.x,
          iconCenterY,
          iconSize
        );
        if (positioned.markup) {
          const wrapperClasses = ['node-icon-svg'];
          if (resolvedIcon.className) wrapperClasses.push(resolvedIcon.className);
          svg += `<g class="${wrapperClasses.join(' ')}" transform="translate(${positioned.x}, ${positioned.y})">${positioned.markup}</g>`;
        }
      } else if (resolvedIcon.char) {
        const fontAttr = ` data-icon-font="${resolvedIcon.font}"`;
        svg += `<text class="node-icon"${fontAttr} x="${centerX}" y="${formatSvgCoordinate(iconCenterY)}" text-anchor="middle" dominant-baseline="middle">${resolvedIcon.char}</text>`;
      }
    }

    if (textLineCount) {
      const textTop = contentTop + iconHeight + iconGap;
      const textY = formatSvgCoordinate(textTop);
      const fontSize = hasIconGlyph ? diagramLabelFontSize : diagramTextFontSize;
      svg += `<text x="${centerX}" y="${textY}" text-anchor="middle" dominant-baseline="hanging" style="font-size: ${fontSize};">`;
      lines.forEach((line, i) => {
        const dyAttr = i === 0 ? '' : ` dy="${DIAGRAM_LABEL_LINE_HEIGHT}"`;
        svg += `<tspan x="${centerX}"${dyAttr}>${escapeHtml(line)}</tspan>`;
      });
      svg += `</text>`;
    }
    svg += `</g>`;
  });

  svg += '</g></svg>';
  let popup = document.getElementById('diagramPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'diagramPopup';
    popup.className = 'diagram-popup';
  }
  setupDiagramContainer.innerHTML = '';
  setupDiagramContainer.appendChild(popup);
  setupDiagramContainer.insertAdjacentHTML('beforeend', svg);

  const svgEl = setupDiagramContainer.querySelector('svg');
  if (svgEl) {
    svgEl.style.width = '100%';
    if (!isTouchDevice) {
      const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
      const MAX_NODE_FONT = 12; // largest base font size used in diagram text
      const maxAutoScale = bodyFontSize / MAX_NODE_FONT;
      svgEl.style.maxWidth = `${viewWidth * maxAutoScale}px`;
    }
  }

  lastDiagramPositions = JSON.parse(JSON.stringify(pos));

  attachDiagramPopups(nodeMap);

  enableDiagramInteractions();

}

function attachDiagramPopups(map) {
  if (!setupDiagramContainer) return;
  const popup = document.getElementById('diagramPopup');
  if (!popup) return;
  popup.style.display = 'none';
  const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;

  setupDiagramContainer.querySelectorAll('.diagram-node').forEach(node => {
    const id = node.getAttribute('data-node');
    const info = map[id];
    if (!info) return;
    let deviceData;
    if (info.category === 'fiz.controllers') {
      deviceData = devices.fiz?.controllers?.[info.name];
    } else if (info.category === 'fiz.motors') {
      deviceData = devices.fiz?.motors?.[info.name];
    } else if (info.category === 'fiz.distance') {
      deviceData = devices.fiz?.distance?.[info.name];
    } else {
      deviceData = devices[info.category]?.[info.name];
    }
    const connectors = deviceData ? generateConnectorSummary(deviceData) : '';
    const infoHtml =
      (deviceData && deviceData.latencyMs ?
        `<div class="info-box video-conn"><strong>Latency:</strong> ${escapeHtml(String(deviceData.latencyMs))}</div>` : '') +
      (deviceData && deviceData.frequency ?
        `<div class="info-box video-conn"><strong>Frequency:</strong> ${escapeHtml(String(deviceData.frequency))}</div>` : '');
    const html = `<strong>${escapeHtml(info.name)}</strong>` +
      connectors + infoHtml;

    const show = e => {
      e.stopPropagation();
      const pointer = e.touches && e.touches[0] ? e.touches[0] : e;
      popup.innerHTML = html;
      popup.style.display = 'block';

      const rect = setupDiagramContainer.getBoundingClientRect();
      const relX = pointer.clientX - rect.left;
      const relY = pointer.clientY - rect.top;
      const offset = 10;
      const popupWidth = popup.offsetWidth;

      // Open the popup to the left if it would otherwise overflow the container
      let left = relX + offset;
      if (relX + popupWidth + offset > rect.width) {
        left = Math.max(0, relX - popupWidth - offset);
      }

      popup.style.left = `${left}px`;
      popup.style.top = `${relY + offset}px`;
    };
    const hide = () => { popup.style.display = 'none'; };
    if (isTouchDevice) {
      node.addEventListener('touchstart', show);
      node.addEventListener('click', show);
    } else {
      node.addEventListener('mousemove', show);
      node.addEventListener('mouseout', hide);
      node.addEventListener('click', show);
    }
  });

  if (!setupDiagramContainer.dataset.popupOutsideListeners) {
    const hideOnOutside = e => {
      if (!e.target.closest('.diagram-node')) popup.style.display = 'none';
    };
    if (isTouchDevice) {
      setupDiagramContainer.addEventListener('touchstart', hideOnOutside);
    } else {
      setupDiagramContainer.addEventListener('click', hideOnOutside);
    }
    setupDiagramContainer.dataset.popupOutsideListeners = 'true';
  }
}

function enableDiagramInteractions() {
  if (!setupDiagramContainer) return;
  const svg = setupDiagramContainer.querySelector('svg');
  if (!svg) return;

  if (cleanupDiagramInteractions) cleanupDiagramInteractions();

  const root = svg.querySelector('#diagramRoot') || svg;
  const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
  const MAX_SCALE = isTouchDevice ? Infinity : 3;
  let pan = { x: 0, y: 0 };
  let scale = 1;
  let panning = false;
  let panStart = { x: 0, y: 0 };
  const getPos = e => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };
  const apply = () => {
    if (scale > MAX_SCALE) scale = MAX_SCALE;
    root.setAttribute('transform', `translate(${pan.x},${pan.y}) scale(${scale})`);
  };
  if (zoomInBtn) {
    zoomInBtn.onclick = () => {
      scale *= 1.1;
      apply();
    };
  }
  if (zoomOutBtn) {
    zoomOutBtn.onclick = () => {
      scale *= 0.9;
      apply();
    };
  }
  if (resetViewBtn) {
    resetViewBtn.onclick = () => {
      pan = { x: 0, y: 0 };
      scale = 1;
      apply();
      manualPositions = {};
      renderSetupDiagram();
    };
  }
  const onSvgMouseDown = e => {
    if (e.target.closest('.diagram-node')) return;
    const pos = getPos(e);
    panning = true;
    panStart = { x: pos.x - pan.x, y: pos.y - pan.y };
    if (e.touches) e.preventDefault();
  };
  const onPanMove = e => {
    if (!panning) return;
    const pos = getPos(e);
    pan.x = pos.x - panStart.x;
    pan.y = pos.y - panStart.y;
    apply();
    if (e.touches) e.preventDefault();
  };
  const stopPanning = () => { panning = false; };

  let dragId = null;
  let dragStart = null;
  let dragNode = null;
  const onDragStart = e => {
    const node = e.target.closest('.diagram-node');
    if (!node) return;
    dragId = node.getAttribute('data-node');
    dragNode = node;
    const pos = getPos(e);
    dragStart = { x: pos.x, y: pos.y };
    if (e.touches) e.preventDefault();
    e.stopPropagation();
  };
  const onDragMove = e => {
    if (!dragId) return;
    const start = lastDiagramPositions[dragId];
    if (!start) return;
    const pos = getPos(e);
    const dx = (pos.x - dragStart.x) / scale;
    const dy = (pos.y - dragStart.y) / scale;
    let newX = start.x + dx;
    let newY = start.y + dy;
    if (gridSnap) {
      const g = 20 / scale;
      newX = Math.round(newX / g) * g;
      newY = Math.round(newY / g) * g;
    }
    const tx = newX - start.x;
    const ty = newY - start.y;
    if (dragNode) dragNode.setAttribute('transform', `translate(${tx},${ty})`);
    if (e.touches) e.preventDefault();
  };
  const onDragEnd = e => {
    if (!dragId) return;
    const start = lastDiagramPositions[dragId];
    if (start) {
      const pos = getPos(e);
      const dx = (pos.x - dragStart.x) / scale;
      const dy = (pos.y - dragStart.y) / scale;
      let newX = start.x + dx;
      let newY = start.y + dy;
      if (gridSnap) {
        const g = 20 / scale;
        newX = Math.round(newX / g) * g;
        newY = Math.round(newY / g) * g;
      }
      manualPositions[dragId] = { x: newX, y: newY };
    }
    dragId = null;
    dragNode = null;
    renderSetupDiagram();
    if (e.touches) e.preventDefault();
  };

  svg.addEventListener('mousedown', onSvgMouseDown);
  svg.addEventListener('touchstart', onSvgMouseDown, { passive: false });
  window.addEventListener('mousemove', onPanMove);
  window.addEventListener('touchmove', onPanMove, { passive: false });
  window.addEventListener('mouseup', stopPanning);
  window.addEventListener('touchend', stopPanning);
  svg.addEventListener('mousedown', onDragStart);
  svg.addEventListener('touchstart', onDragStart, { passive: false });
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);

  cleanupDiagramInteractions = () => {
    svg.removeEventListener('mousedown', onSvgMouseDown);
    svg.removeEventListener('touchstart', onSvgMouseDown);
    window.removeEventListener('mousemove', onPanMove);
    window.removeEventListener('touchmove', onPanMove);
    window.removeEventListener('mouseup', stopPanning);
    window.removeEventListener('touchend', stopPanning);
    svg.removeEventListener('mousedown', onDragStart);
    svg.removeEventListener('touchstart', onDragStart);
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchend', onDragEnd);
  };
}

function updateDiagramLegend() {
  if (!diagramLegend) return;
  const legendItems = [
    { cls: 'power', text: texts[currentLang].diagramLegendPower },
    { cls: 'video', text: texts[currentLang].diagramLegendVideo },
    { cls: 'fiz', text: texts[currentLang].diagramLegendFIZ }
  ];
  diagramLegend.innerHTML = legendItems
    .map(({ cls, text }) => `<span><span class="swatch ${cls}"></span>${text}</span>`)
    .join('');
}

// Convert a camelCase or underscore key to a human friendly label
function humanizeKey(key) {
  const map = {
    powerDrawWatts: 'Power (W)',
    capacity: 'Capacity (Wh)',
    pinA: 'Pin A',
    dtapA: 'D-Tap A',
    mount_type: 'Mount',
    screenSizeInches: 'Screen Size (in)',
    brightnessNits: 'Brightness (nits)',
    torqueNm: 'Torque (Nm)',
    internalController: 'Internal Controller',
    powerSource: 'Power Source',
    batteryType: 'Battery Type',
    connectivity: 'Connectivity'
  };
  if (map[key]) return map[key];
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase());
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map((v) => formatValue(v)).join('; ');
  }
  if (value && typeof value === 'object') {
    const parts = [];
    for (const k in value) {
      if (value[k] === '' || value[k] === null || value[k] === undefined) continue;
      parts.push(`${humanizeKey(k)}: ${formatValue(value[k])}`);
    }
    return `{ ${parts.join(', ')} }`;
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

function createDeviceDetailsList(deviceData) {
  const list = document.createElement('ul');
  list.className = 'device-detail-list';

  const appendItem = (key, value, parent) => {
    if (value === '' || value === null || value === undefined) return;
    const li = document.createElement('li');
    const label = document.createElement('strong');
    label.textContent = humanizeKey(key) + ':';
    li.appendChild(label);

    if (Array.isArray(value)) {
      if (value.length && typeof value[0] === 'object') {
        const subList = document.createElement('ul');
        subList.className = 'device-detail-list';
        value.forEach((v) => {
          const subLi = document.createElement('li');
          subLi.appendChild(createDeviceDetailsList(v));
          subList.appendChild(subLi);
        });
        li.appendChild(subList);
      } else {
        li.appendChild(document.createTextNode(value.map((v) => formatValue(v)).join(', ')));
      }
    } else if (value && typeof value === 'object') {
      li.appendChild(createDeviceDetailsList(value));
    } else {
      li.appendChild(document.createTextNode(formatValue(value)));
    }

    parent.appendChild(li);
  };

  if (typeof deviceData !== 'object') {
    appendItem('powerDrawWatts', deviceData, list);
  } else {
    Object.keys(deviceData).forEach((k) => appendItem(k, deviceData[k], list));
  }

  return list;
}
function formatDateString(val) {
  if (!val) return '';
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return String(val);
  return d.toISOString().split('T')[0];
}

// Helper to render existing devices in the manager section
function renderDeviceList(categoryKey, ulElement) {
  ulElement.innerHTML = "";
  let categoryDevices = devices[categoryKey];
  // Handle nested FIZ categories
  if (categoryKey.includes('.')) {
    const [mainCat, subCat] = categoryKey.split('.');
    categoryDevices = devices[mainCat] && devices[mainCat][subCat];
  }
  if (!categoryDevices) return;

  const buildItem = (name, deviceData, subcategory) => {
    if (name === "None") return;
    const li = document.createElement("li");
    const header = document.createElement("div");
    header.className = "device-summary";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    let summary = generateConnectorSummary(deviceData);
    summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
    if (deviceData.notes) {
      summary = summary ? `${summary}; Notes: ${deviceData.notes}` : deviceData.notes;
    }
    if (summary) {
      nameSpan.setAttribute('title', summary);
      nameSpan.setAttribute('data-help', summary);
    }
    header.appendChild(nameSpan);

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "detail-toggle";
    toggleBtn.type = "button";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.textContent = texts[currentLang].showDetails;
    toggleBtn.setAttribute('data-help', texts[currentLang].showDetails);
    header.appendChild(toggleBtn);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.dataset.name = name;
    editBtn.dataset.category = categoryKey;
    if (subcategory) editBtn.dataset.subcategory = subcategory;
    editBtn.textContent = texts[currentLang].editBtn;
    editBtn.setAttribute('data-help', texts[currentLang].editBtnHelp || texts[currentLang].editBtn);
    header.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.name = name;
    deleteBtn.dataset.category = categoryKey;
    if (subcategory) deleteBtn.dataset.subcategory = subcategory;
    deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
    deleteBtn.setAttribute('data-help', texts[currentLang].deleteDeviceBtnHelp || texts[currentLang].deleteDeviceBtn);
    header.appendChild(deleteBtn);

    li.appendChild(header);

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "device-details";
    detailsDiv.style.display = "none";
    detailsDiv.appendChild(createDeviceDetailsList(deviceData));
    li.appendChild(detailsDiv);

    ulElement.appendChild(li);
  };

  if (categoryKey === "accessories.cables") {
    for (const [subcat, devs] of Object.entries(categoryDevices)) {
      for (const name in devs) {
        buildItem(name, devs[name], subcat);
      }
    }
  } else {
    for (let name in categoryDevices) {
      buildItem(name, categoryDevices[name]);
    }
  }
}

function refreshDeviceLists() {
  syncDeviceManagerCategories();
  deviceManagerLists.forEach(({ list, filterInput }, categoryKey) => {
    if (!list) return;
    renderDeviceList(categoryKey, list);
    const filterValue = filterInput ? filterInput.value : '';
    filterDeviceList(list, filterValue);
  });
}

// Initial render of device lists
refreshDeviceLists();

// --- EVENT LISTENERS ---

// Language selection
languageSelect.addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

if (skipLink) {
  skipLink.addEventListener("click", () => {
    const main = document.getElementById("mainContent");
    if (main) main.focus();
  });
}

// Filtering inputs




// Setup management
saveSetupBtn.addEventListener("click", () => {
  const typedName = setupNameInput.value.trim();
  if (!typedName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  const currentSetup = { ...getCurrentSetupState() };
  const langTexts = texts[currentLang] || {};
  const fallbackTexts = texts.en || {};
  if (!hasAnyDeviceSelection(currentSetup)) {
    const message =
      langTexts.alertSetupNeedsDevice ||
      fallbackTexts.alertSetupNeedsDevice ||
      'Please select at least one device before saving a project.';
    alert(message);
    return;
  }
  const gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }

  const selectedName = setupSelect ? setupSelect.value : '';
  const renamingExisting = Boolean(selectedName && typedName && selectedName !== typedName);
  let setups = getSetups();
  let finalName = typedName;
  let storedProjectSnapshot = null;

  if (renamingExisting) {
    if (typeof loadProject === 'function') {
      try {
        storedProjectSnapshot = loadProject(selectedName);
      } catch (error) {
        console.warn('Failed to load project data while renaming setup', error);
      }
    }

    if (typeof renameSetup === 'function') {
      try {
        const renamed = renameSetup(selectedName, typedName);
        if (typeof renamed === 'string' && renamed) {
          finalName = renamed;
        }
      } catch (error) {
        console.warn('Failed to rename setup in storage', error);
      }
      setups = getSetups();
    } else if (Object.prototype.hasOwnProperty.call(setups, selectedName)) {
      setups[typedName] = setups[selectedName];
      delete setups[selectedName];
      finalName = typedName;
    }
  }

  setups[finalName] = currentSetup;
  storeSetups(setups);

  if (renamingExisting && storedProjectSnapshot && typeof saveProject === 'function') {
    try {
      saveProject(finalName, storedProjectSnapshot);
    } catch (error) {
      console.warn('Failed to preserve project data during setup rename', error);
    }
  }

  populateSetupSelect();
  setupNameInput.value = finalName;
  setupSelect.value = finalName; // Select the saved setup (new or renamed)
  lastSetupName = finalName;
  saveCurrentSession(); // Persist selection so refreshes restore this setup
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
  // Ensure the current gear list stays persisted with the project so setups
  // remain in sync with the automatically saved table.
  saveCurrentGearList();

  if (renamingExisting && selectedName && selectedName !== finalName) {
    if (typeof deleteProject === 'function') {
      try {
        deleteProject(selectedName);
      } catch (error) {
        console.warn('Failed to remove old project entry during setup rename', error);
      }
    } else if (typeof saveProject === 'function') {
      try {
        saveProject(selectedName, { projectInfo: null, gearList: '' });
      } catch (error) {
        console.warn('Failed to clear legacy project entry during setup rename', error);
      }
    }
  }

  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }

  alert(texts[currentLang].alertSetupSaved.replace("{name}", finalName));
});

deleteSetupBtn.addEventListener("click", () => {
  const setupName = setupSelect.value;
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (
    confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) &&
    confirm(texts[currentLang].confirmDeleteSetupAgain)
  ) {
    const backupName = ensureAutoBackupBeforeDeletion('delete setup');
    if (!backupName) {
      return;
    }
    let setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    if (typeof deleteProject === 'function') {
      deleteProject(setupName);
    }
    populateSetupSelect();
    setupNameInput.value = ""; // Clear setup name input

    let selectionResetHandled = false;
    if (setupSelect) {
      lastSetupName = '';
      setupSelect.value = "";
      setupSelect.dispatchEvent(new Event('change'));
      selectionResetHandled = true;
    }

    if (!selectionResetHandled) {
      if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
      }
      if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
      }
      currentProjectInfo = null;
      if (projectForm) populateProjectForm({});
      storeLoadedSetupState(null);
      updateBatteryPlateVisibility();
      updateBatteryOptions();
      clearProjectAutoGearRules();
      renderAutoGearRulesList();
      updateAutoGearCatalogOptions();
      // Reset dropdowns to "None" or first option after deleting current setup
      [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(sel => {
        const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
        if (noneOption) {
          sel.value = "None";
        } else {
          sel.selectedIndex = 0;
        }
      });
      const sbSel = getSliderBowlSelect();
      if (sbSel) sbSel.value = '';
      motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
      controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
      updateCalculations(); // Recalculate after deleting setup
    }
    alert(texts[currentLang].alertSetupDeleted.replace("{name}", setupName));
  }
});

setupSelect.addEventListener("change", (event) => {
  const setupName = event.target.value;
  const typedName =
    setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value.trim()
      : '';
  const previousKey =
    (lastSetupName && typeof lastSetupName === 'string' ? lastSetupName : '')
    || typedName
    || '';

  if (typeof saveProject === 'function') {
    const info = projectForm ? collectProjectFormData() : {};
    if (info) {
      info.sliderBowl = getSliderBowlValue();
      info.easyrig = getEasyrigValue();
    }
    const previousProjectInfo = deriveProjectInfo(info);
    currentProjectInfo = previousProjectInfo;
    const previousPayload = {
      projectInfo: previousProjectInfo,
      gearList: getCurrentGearListHtml()
    };
    const previousRules = getProjectScopedAutoGearRules();
    if (previousRules && previousRules.length) {
      previousPayload.autoGearRules = previousRules;
    }
    saveProject(previousKey, previousPayload);
  }

  displayGearAndRequirements('');
  currentProjectInfo = null;
  if (setupName === "") { // "-- New Setup --" selected
    setupNameInput.value = "";
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    const sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    storeLoadedSetupState(null);
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
    currentProjectInfo = null;
    if (projectForm) populateProjectForm({});
    clearProjectAutoGearRules();
  } else {
    const setups = getSetups();
    const setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera;
      updateBatteryPlateVisibility();
      batteryPlateSelect.value = setup.batteryPlate || batteryPlateSelect.value;
      monitorSelect.value = setup.monitor;
      videoSelect.value = setup.video;
      if (cageSelect) cageSelect.value = setup.cage || cageSelect.value;
      (setup.motors || []).forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
      (setup.controllers || []).forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
      hotswapSelect.value = setup.batteryHotswap || hotswapSelect.value;
      setSliderBowlValue(setup.sliderBowl || '');
      setEasyrigValue(setup.easyrig || '');
      updateBatteryOptions();
      const storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      const html = setup.gearList || storedProject?.gearList || '';
      currentProjectInfo = setup.projectInfo || storedProject?.projectInfo || null;
      const projectRulesSource = Array.isArray(setup.autoGearRules) && setup.autoGearRules.length
        ? setup.autoGearRules
        : (Array.isArray(storedProject?.autoGearRules) && storedProject.autoGearRules.length
          ? storedProject.autoGearRules
          : null);
      if (projectRulesSource) {
        useProjectAutoGearRules(projectRulesSource);
      } else {
        clearProjectAutoGearRules();
      }
      if (gearListOutput) {
        displayGearAndRequirements(html);
        populateProjectForm(currentProjectInfo || {});
        if (html) {
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
        }
        if (typeof saveProject === 'function') {
          const payload = {
            projectInfo: currentProjectInfo,
            gearList: html
          };
          const activeRules = getProjectScopedAutoGearRules();
          if (activeRules && activeRules.length) {
            payload.autoGearRules = activeRules;
          }
          saveProject(setupName, payload);
        }
      }
    } else {
      currentProjectInfo = null;
      if (projectForm) populateProjectForm({});
      displayGearAndRequirements('');
      clearProjectAutoGearRules();
    }
    storeLoadedSetupState(getCurrentSetupState());
  }
  renderAutoGearRulesList();
  updateAutoGearCatalogOptions();
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  updateCalculations();
  checkSetupChanged();
  lastSetupName = setupName;
});


function populateSetupSelect() {
  const setups = getSetups();
  setupSelect.innerHTML = `<option value="">${texts[currentLang].newSetupOption}</option>`;
  const names = Object.keys(setups)
    .filter(name => showAutoBackups || !name.startsWith('auto-backup-'))
    .sort((a, b) => {
      const autoA = a.startsWith('auto-backup-');
      const autoB = b.startsWith('auto-backup-');
      if (autoA !== autoB) return autoA ? 1 : -1; // Auto backups last
      return localeSort(a, b);
    });
  for (const name of names) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    setupSelect.appendChild(opt);
  }
}
populateSetupSelect(); // Initial populate of setups
checkSetupChanged();

// Auto-save backups every 10 minutes. Saved backups appear in the setup
// selector but do not change the currently selected setup. Intervals are
// unref'ed when possible so Node environments can exit cleanly.
function autoBackup(options = {}) {
  if (!setupSelect) return null;
  const config = typeof options === 'object' && options !== null ? options : {};
  const suppressSuccess = Boolean(config.suppressSuccess);
  const suppressError = Boolean(config.suppressError);
  const successMessage = typeof config.successMessage === 'string' && config.successMessage
    ? config.successMessage
    : 'Auto backup saved';
  const errorMessage = typeof config.errorMessage === 'string' && config.errorMessage
    ? config.errorMessage
    : 'Auto backup failed';

  try {
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const baseName = `auto-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const activeNameRaw = setupSelect.value
      || (setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '');
    const normalizedName = activeNameRaw
      ? activeNameRaw.replace(/\s+/g, ' ').trim()
      : '';
    const backupName = normalizedName ? `${baseName}-${normalizedName}` : baseName;
    const currentSetup = { ...getCurrentSetupState() };
    const gearListHtml = getCurrentGearListHtml();
    if (gearListHtml) {
      currentSetup.gearList = gearListHtml;
    }
    const setups = getSetups();
    setups[backupName] = currentSetup;
    storeSetups(setups);
    if (typeof saveProject === 'function') {
      const payload = {
        gearList: gearListHtml || '',
        projectInfo: currentSetup.projectInfo || null,
      };
      const activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      if (payload.gearList || payload.projectInfo || payload.autoGearRules) {
        saveProject(backupName, payload);
      }
    }
    const prevValue = setupSelect.value;
    const prevName = setupNameInput ? setupNameInput.value : '';
    populateSetupSelect();
    setupSelect.value = prevValue;
    if (setupNameInput) setupNameInput.value = prevName;
    if (!suppressSuccess) {
      showNotification('success', successMessage);
    }
    return backupName;
  } catch (e) {
    console.warn('Auto backup failed', e);
    if (!suppressError) {
      showNotification('error', errorMessage);
    }
    return null;
  }
}

function ensureAutoBackupBeforeDeletion(context, options = {}) {
  const config = typeof options === 'object' && options !== null ? options : {};
  const langTexts = texts[currentLang] || {};
  const fallbackTexts = texts.en || {};
  const successMessage = config.successMessage
    || langTexts.preDeleteBackupSuccess
    || fallbackTexts.preDeleteBackupSuccess
    || 'Automatic backup saved. Restore it anytime from Saved Projects.';
  const failureMessage = config.failureMessage
    || langTexts.preDeleteBackupFailed
    || fallbackTexts.preDeleteBackupFailed
    || 'Automatic backup failed. The action was cancelled.';
  const autoBackupOptions = {
    suppressSuccess: true,
    suppressError: true,
    ...(config.autoBackupOptions || {}),
  };

  let backupName = null;
  if (typeof autoBackup === 'function') {
    try {
      backupName = autoBackup(autoBackupOptions);
    } catch (error) {
      console.error(`Automatic backup before ${context || 'deletion'} failed`, error);
      backupName = null;
    }
  }

  if (!backupName) {
    showNotification('error', failureMessage);
    return null;
  }

  if (config.notifySuccess !== false) {
    showNotification('success', successMessage);
  }

  return backupName;
}
const autoBackupInterval = setInterval(autoBackup, 10 * 60 * 1000);
if (typeof autoBackupInterval.unref === 'function') {
  autoBackupInterval.unref();
}

const autoGearBackupInterval = setInterval(() => {
  if (!autoGearRulesDirtySinceBackup) return;
  createAutoGearBackup();
}, AUTO_GEAR_BACKUP_INTERVAL_MS);
if (typeof autoGearBackupInterval.unref === 'function') {
  autoGearBackupInterval.unref();
}

const hourlyBackupInterval = setInterval(() => {
  const fileName = createSettingsBackup(false);
  showNotification(
    fileName ? 'success' : 'error',
    fileName ? `Full app backup downloaded (${fileName})` : 'Full app backup failed',
  );
}, 60 * 60 * 1000);
if (typeof hourlyBackupInterval.unref === 'function') {
  hourlyBackupInterval.unref();
}

function showDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (!deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.remove('hidden');
  toggleDeviceBtn.textContent = texts[currentLang].hideDeviceManager;
  toggleDeviceBtn.setAttribute('title', texts[currentLang].hideDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].hideDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'true');
  refreshDeviceLists();
  updateCalculations();
}

function hideDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.add('hidden');
  toggleDeviceBtn.textContent = texts[currentLang].toggleDeviceManager;
  toggleDeviceBtn.setAttribute('title', texts[currentLang].toggleDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].toggleDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'false');
}

// Toggle device manager visibility
if (toggleDeviceBtn) {
  toggleDeviceBtn.addEventListener('click', () => {
    if (deviceManagerSection.classList.contains('hidden')) {
      showDeviceManagerSection();
    } else {
      hideDeviceManagerSection();
    }
  });
}


function toggleDeviceDetails(button) {
  const details = button.closest('li').querySelector('.device-details');
  const expanded = button.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    details.style.display = 'none';
    button.textContent = texts[currentLang].showDetails;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-help', texts[currentLang].showDetails);
  } else {
    details.style.display = 'block';
    button.textContent = texts[currentLang].hideDetails;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-help', texts[currentLang].hideDetails);
  }
}

function inferDeviceCategory(key, data) {
  if (key === "batteries" || key.endsWith('.batteries') || data.capacity !== undefined) return "batteries";
  if (key === "cameras" || data.recordingMedia || data.lensMount || data.power?.batteryPlateSupport) return "cameras";
  if (key === "monitors" || (data.screenSizeInches !== undefined && !key.includes("viewfinder"))) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "fiz.distance";
  return "generic";
}

function populateDeviceForm(categoryKey, deviceData, subcategory) {
  placeWattField(categoryKey, deviceData);
  const type = inferDeviceCategory(categoryKey, deviceData);
  if (wattFieldDiv) wattFieldDiv.style.display = "block";
  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  clearDynamicFields();

  if (type === "batteries") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    newCapacityInput.value = deviceData.capacity || '';
    newPinAInput.value = deviceData.pinA || '';
    if (dtapRow) dtapRow.style.display = categoryKey === "batteryHotswaps" ? "none" : "";
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : (deviceData.dtapA || '');
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "cameras") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
    const tmp = firstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(deviceData.power?.batteryPlateSupport || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    setLensMounts(deviceData.lensMount || []);
    setPowerDistribution(deviceData.power?.powerDistributionOutputs || []);
    setVideoOutputs(deviceData.videoOutputs || []);
    setFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    setTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const mpt = firstPowerInputType(deviceData);
    monitorPortTypeInput.value = mpt || "";
    setMonitorVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setMonitorVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
    monitorLatencyInput.value = deviceData.latencyMs || '';
    monitorAudioOutputInput.value =
      deviceData.audioOutput?.portType ||
      deviceData.audioOutput?.type ||
      deviceData.audioOutput || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "viewfinders") {
    showFormSection(viewfinderFieldsDiv);
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const vfpt = firstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    showFormSection(videoFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    videoPowerInput.value = firstPowerInputType(deviceData);
    setVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setVideoOutputsIO(deviceData.videoOutputs || deviceData.video?.outputs || []);
    videoFrequencyInput.value = deviceData.frequency || '';
    videoLatencyInput.value = deviceData.latencyMs || '';
    motorConnectorInput.value = '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.motors") {
    showFormSection(motorFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    motorConnectorInput.value = deviceData.fizConnector || '';
    motorInternalInput.checked = !!deviceData.internalController;
    motorTorqueInput.value = deviceData.torqueNm || '';
    motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
    motorNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    const cc = Array.isArray(deviceData.fizConnectors)
      ? deviceData.fizConnectors.map(fc => fc.type).join(', ')
      : (deviceData.fizConnector || '');
    controllerConnectorInput.value = cc;
    controllerPowerInput.value = deviceData.powerSource || '';
    controllerBatteryInput.value = deviceData.batteryType || '';
    controllerConnectivityInput.value = deviceData.connectivity || '';
    controllerNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.distance") {
    showFormSection(distanceFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    distanceConnectionInput.value = deviceData.connectionCompatibility || '';
    distanceMethodInput.value = deviceData.measurementMethod || '';
    distanceRangeInput.value = deviceData.measurementRange || '';
    distanceAccuracyInput.value = deviceData.accuracy || '';
    distanceOutputInput.value = deviceData.outputDisplay || '';
    distanceNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "accessories.cables") {
    wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    const subcats = Object.keys(devices.accessories?.cables || {});
    newSubcategorySelect.innerHTML = '';
    for (const sc of subcats) {
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    newSubcategorySelect.value = subcategory || '';
    // Allow selecting a different subcategory while editing so devices can
    // be reorganised without re-creating them from scratch.
    newSubcategorySelect.disabled = false;
    buildDynamicFields(`accessories.cables.${subcategory}`, deviceData, categoryExcludedAttrs[`accessories.cables.${subcategory}`] || []);
  } else {
    const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
    newWattInput.value = watt || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  }
}

// Handle "Edit" and "Delete" buttons in device lists (event delegation)
deviceManagerSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("detail-toggle")) {
    toggleDeviceDetails(event.target);
  } else if (event.target.classList.contains("edit-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;
    const subcategory = event.target.dataset.subcategory;

    // Ensure category exists in selector
    if (!Array.from(newCategorySelect.options).some(opt => opt.value === categoryKey)) {
      const opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = categoryNames[currentLang]?.[categoryKey] || categoryKey;
      newCategorySelect.appendChild(opt);
    }

    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name;
    addDeviceBtn.dataset.originalCategory = categoryKey;
    if (categoryKey === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }

    // Set form for editing
    newCategorySelect.value = categoryKey;
    newNameInput.value = name;
    // Trigger change handler so fields are cleared and rebuilt for the category
    newCategorySelect.dispatchEvent(new Event('change'));

    let deviceData;
    if (categoryKey === "accessories.cables") {
      deviceData = devices.accessories.cables[subcategory][name];
    } else if (categoryKey.includes('.')) {
      const [mainCat, subCat] = categoryKey.split('.');
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }

    populateDeviceForm(categoryKey, deviceData, subcategory);
    // Change button to "Update"
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "edit";
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
    document.getElementById("addDeviceHeading").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (event.target.classList.contains("delete-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;
    const subcategory = event.target.dataset.subcategory;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", name))) {
      if (categoryKey === "accessories.cables") {
        delete devices.accessories.cables[subcategory][name];
      } else if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        delete devices[mainCat][subCat][name];
      } else {
        delete devices[categoryKey][name];
      }
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists();
      // Re-populate all dropdowns and update calculations
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
      controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
        updateFizConnectorOptions();
        updateMotorConnectorOptions();
        updateControllerConnectorOptions();
        updateControllerPowerOptions();
        updateControllerBatteryOptions();
        updateControllerConnectivityOptions();
        updatePowerDistTypeOptions();
        updatePowerDistVoltageOptions();
        updatePowerDistCurrentOptions();
        updateTimecodeTypeOptions();
        updateDistanceConnectionOptions();
        updateDistanceMethodOptions();
        updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();
    }
  }
});

deviceManagerSection.addEventListener('keydown', (event) => {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});

// Category selection in add device form
newCategorySelect.addEventListener("change", () => {
  const wasEditing = addDeviceBtn?.dataset.mode === "edit";
  const previousName = newNameInput ? newNameInput.value : "";
  const val = newCategorySelect.value;
  placeWattField(val);
  clearDynamicFields();
  subcategoryFieldDiv.hidden = true;
  newSubcategorySelect.innerHTML = "";
  newSubcategorySelect.disabled = false;
  if (dtapRow) dtapRow.style.display = "";
  if (wattFieldDiv) wattFieldDiv.style.display = "block";
  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  if (val === "batteries" || val === "accessories.batteries" || val === "batteryHotswaps") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    if (dtapRow) dtapRow.style.display = val === "batteryHotswaps" ? "none" : "";
  } else if (val === "cameras") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
  } else if (val === "monitors" || val === "directorMonitors") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(monitorFieldsDiv);
  } else if (val === "viewfinders") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(viewfinderFieldsDiv);
  } else if (val === "video" || val === "wirelessReceivers" || val === "iosVideo") {
    showFormSection(videoFieldsDiv);
  } else if (val === "fiz.motors") {
    showFormSection(motorFieldsDiv);
  } else if (val === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
  } else if (val === "fiz.distance") {
    showFormSection(distanceFieldsDiv);
  } else if (val === "accessories.cables") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    const subcats = Object.keys(devices.accessories?.cables || {});
    for (const sc of subcats) {
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    if (newSubcategorySelect.value) {
      buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`, {}, categoryExcludedAttrs[`accessories.cables.${newSubcategorySelect.value}`] || []);
    }
  } else {
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  }
  newWattInput.value = "";
  newCapacityInput.value = "";
  newPinAInput.value = "";
  newDtapAInput.value = "";
  cameraWattInput.value = "";
  cameraVoltageInput.value = "";
  cameraPortTypeInput.value = "";
  monitorScreenSizeInput.value = "";
  monitorBrightnessInput.value = "";
  monitorWattInput.value = "";
  monitorVoltageInput.value = "";
  monitorPortTypeInput.value = "";
  monitorWirelessTxInput.checked = false;
  monitorLatencyInput.value = "";
  monitorAudioOutputInput.value = "";
  clearMonitorVideoInputs();
  clearMonitorVideoOutputs();
  viewfinderScreenSizeInput.value = "";
  viewfinderBrightnessInput.value = "";
  viewfinderWattInput.value = "";
  viewfinderVoltageInput.value = "";
  viewfinderPortTypeInput.value = "";
  viewfinderWirelessTxInput.checked = false;
  viewfinderLatencyInput.value = "";
  clearViewfinderVideoInputs();
  clearViewfinderVideoOutputs();
  clearBatteryPlates();
  clearRecordingMedia();
  clearLensMounts();
  clearPowerDistribution();
  clearVideoOutputs();
  clearFizConnectors();
  clearViewfinders();
  clearTimecodes();
  videoPowerInput.value = "";
  clearVideoInputs();
  clearVideoOutputsIO();
  videoFrequencyInput.value = "";
  videoLatencyInput.value = "";
  motorConnectorInput.value = "";
  motorInternalInput.checked = false;
  motorTorqueInput.value = "";
  motorGearInput.value = "";
  motorNotesInput.value = "";
  controllerConnectorInput.value = "";
  controllerPowerInput.value = "";
  controllerBatteryInput.value = "";
  controllerConnectivityInput.value = "";
  controllerNotesInput.value = "";
  distanceConnectionInput.value = "";
  distanceMethodInput.value = "";
  distanceRangeInput.value = "";
  distanceAccuracyInput.value = "";
  distanceOutputInput.value = "";
  distanceNotesInput.value = "";
  if (val !== 'accessories.cables') {
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  }
  if (newNameInput) {
    if (wasEditing) {
      newNameInput.value = previousName;
    } else {
      newNameInput.value = "";
    }
  }
  const cancelLabel = texts[currentLang].cancelEditBtn;
  if (wasEditing) {
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    setButtonLabelWithIcon(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
  } else {
    addDeviceBtn.textContent = texts[currentLang].addDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].addDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "add";
    delete addDeviceBtn.dataset.originalName;
    delete addDeviceBtn.dataset.originalSubcategory;
    delete addDeviceBtn.dataset.originalCategory;
    setButtonLabelWithIcon(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    hideFormSection(cancelEditBtn);
  }
});

newSubcategorySelect.addEventListener('change', () => {
  if (newCategorySelect.value === 'accessories.cables') {
    buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`, {}, categoryExcludedAttrs[`accessories.cables.${newSubcategorySelect.value}`] || []);
  }
});

function resetDeviceForm() {
  if (addDeviceBtn) {
    addDeviceBtn.dataset.mode = "add";
    delete addDeviceBtn.dataset.originalName;
    delete addDeviceBtn.dataset.originalSubcategory;
    delete addDeviceBtn.dataset.originalCategory;
  }
  if (cancelEditBtn) {
    hideFormSection(cancelEditBtn);
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
  }
  // Trigger change handler to reset fields and button text, guarding against
  // missing DOM elements in test environments.
  if (newCategorySelect.isConnected) {
    try {
      newCategorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}


// Add/Update device logic
addDeviceBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  const category = newCategorySelect.value;
  const isEditing = addDeviceBtn.dataset.mode === "edit";
  const originalName = addDeviceBtn.dataset.originalName;
  const originalCategory = addDeviceBtn.dataset.originalCategory;
  const subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  const originalSubcategory = addDeviceBtn.dataset.originalSubcategory;

  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }

  if (category === "accessories.cables" && !subcategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }

  const targetCategory = getCategoryContainer(category, subcategory, { create: true });
  if (!targetCategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }

  const storedOriginalCategory = originalCategory || category;
  const storedOriginalSubcategory = originalSubcategory || null;
  const originalCollection = isEditing
    ? getCategoryContainer(
        storedOriginalCategory,
        storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory : null,
        { create: false }
      )
    : null;
  const originalDeviceData = isEditing && originalCollection ? originalCollection[originalName] : undefined;
  const editingSameCategory = isEditing && storedOriginalCategory === category;
  const editingSamePath = editingSameCategory && (
    category !== "accessories.cables" || storedOriginalSubcategory === subcategory
  );

  // Check for duplicate name if adding, or if name changed during edit
  if ((!isEditing && targetCategory[name] !== undefined) ||
      (isEditing && (name !== originalName || (category === "accessories.cables" && subcategory !== originalSubcategory)) && targetCategory[name] !== undefined)) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }

  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    const capacity = parseFloat(newCapacityInput.value);
    const pinA = parseFloat(newPinAInput.value);
    const dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (
      isNaN(capacity) ||
      isNaN(pinA) ||
      capacity <= 0 ||
      pinA <= 0 ||
      (category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0))
    ) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    if (category === "batteryHotswaps") {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA };
    } else {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA, dtapA: dtapA };
    }
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "accessories.cables") {
    const existing = isEditing && originalDeviceData ? { ...originalDeviceData } : {};
    const attrs = collectDynamicFieldValues(`accessories.cables.${subcategory}`, categoryExcludedAttrs[`accessories.cables.${subcategory}`] || []);
    targetCategory[name] = { ...existing, ...attrs };
  } else if (category === "cameras") {
    const watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    let powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = getPowerDistribution();
      videoOut = getVideoOutputs();
      fizCon = getFizConnectors();
      viewfinder = getViewfinders();
      timecode = getTimecodes();
      plateSupport = getBatteryPlates();
    } catch (e) {
      console.error("Invalid camera JSON input:", e);
      alert(texts[currentLang].alertInvalidCameraJSON);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: cameraVoltageInput.value,
          type: cameraPortTypeInput.value
        },
        batteryPlateSupport: plateSupport,
        powerDistributionOutputs: powerDist
      },
      videoOutputs: videoOut,
      fizConnectors: fizCon,
      recordingMedia: getRecordingMedia(),
      viewfinder: viewfinder,
      lensMount: getLensMounts(),
      timecode: timecode
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "monitors" || category === "directorMonitors") {
    const watt = parseFloat(monitorWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const screenSize = parseFloat(monitorScreenSizeInput.value);
    const brightness = parseFloat(monitorBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: monitorVoltageInput.value,
          type: monitorPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getMonitorVideoInputs(),
        outputs: getMonitorVideoOutputs()
      },
      wirelessTx: monitorWirelessTxInput.checked,
      latencyMs: monitorWirelessTxInput.checked ? monitorLatencyInput.value : undefined,
      audioOutput: monitorAudioOutputInput.value ? { portType: monitorAudioOutputInput.value } : undefined
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "viewfinders") {
    const watt = parseFloat(viewfinderWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const screenSize = parseFloat(viewfinderScreenSizeInput.value);
    const brightness = parseFloat(viewfinderBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: viewfinderVoltageInput.value,
          type: viewfinderPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getViewfinderVideoInputs(),
        outputs: getViewfinderVideoOutputs()
      },
      wirelessTx: viewfinderWirelessTxInput.checked,
      latencyMs: viewfinderWirelessTxInput.checked ? viewfinderLatencyInput.value : undefined
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: { input: { type: videoPowerInput.value } },
      videoInputs: getVideoInputs(),
      videoOutputs: getVideoOutputsIO(),
      frequency: videoFrequencyInput.value,
      latencyMs: videoLatencyInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "fiz.motors") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      fizConnector: motorConnectorInput.value,
      internalController: motorInternalInput.checked,
      torqueNm: motorTorqueInput.value ? parseFloat(motorTorqueInput.value) : null,
      gearTypes: motorGearInput.value ? motorGearInput.value.split(',').map(s => s.trim()).filter(Boolean) : [],
      notes: motorNotesInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "fiz.controllers") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      fizConnector: controllerConnectorInput.value,
      powerSource: controllerPowerInput.value,
      batteryType: controllerBatteryInput.value,
      connectivity: controllerConnectivityInput.value,
      notes: controllerNotesInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "fiz.distance") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      connectionCompatibility: distanceConnectionInput.value,
      measurementMethod: distanceMethodInput.value,
      measurementRange: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      outputDisplay: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    const attrs = collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []);
    targetCategory[name] = { ...existing, ...attrs, powerDrawWatts: watt };
  }

  if (isEditing) {
    removeOriginalDeviceEntry(
      storedOriginalCategory,
      storedOriginalSubcategory,
      originalName,
      category,
      subcategory,
      name
    );
    addDeviceBtn.dataset.originalCategory = category;
    if (category === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    addDeviceBtn.dataset.originalName = name;
  }

  // After adding/updating, reset form and refresh lists
  resetDeviceForm();

  storeDevices(devices);
  viewfinderTypeOptions = getAllViewfinderTypes();
  viewfinderConnectorOptions = getAllViewfinderConnectors();
  updatePlateTypeOptions();
  updatePowerPortOptions();
  updatePowerDistTypeOptions();
  updatePowerDistVoltageOptions();
  updatePowerDistCurrentOptions();
  updateRecordingMediaOptions();
  updateTimecodeTypeOptions();
  refreshDeviceLists();
  // Re-populate all dropdowns to include the new/updated device
  populateSelect(cameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
  controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
  updateFizConnectorOptions();
  applyFilters();
  updateCalculations(); // Update calculations after device data changes

  let categoryKey = category.replace(".", "_");
  let categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
      alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
      alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});

// Cancel editing and revert form to add mode
cancelEditBtn.addEventListener("click", () => {
  resetDeviceForm();
});

// Export device data
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

const exportAndRevertBtn = document.getElementById('exportAndRevertBtn'); 

if (exportAndRevertBtn) {
  exportAndRevertBtn.addEventListener('click', () => {
    // Step 1: Export the current database
    if (confirm(texts[currentLang].confirmExportAndRevert)) { // Confirmation for both actions
      // Reusing the export logic from the existing 'Export Database' button
      const dataStr = JSON.stringify(devices, null, 2);
      // For simplicity, let's just trigger a download directly.
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json"; // Suggests it's a backup
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Give a small delay to ensure download prompt appears before next step
      const revertTimer = setTimeout(() => {
        // Step 2: Remove saved database and reload page so device files are re-read
        localStorage.removeItem('cameraPowerPlanner_devices');
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500); // 500ms delay
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
    }
  });
}

// Import device data
importDataBtn.addEventListener("click", () => {
  importFileInput.click(); // Trigger the file input click
});

importFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      const result = parseDeviceDatabaseImport(importedData);

      if (!result.devices) {
        const summary = formatDeviceImportErrors(result.errors);
        console.error('Device import validation failed:', result.errors);
        alert(summary ? `${texts[currentLang].alertImportError}\n${summary}` : texts[currentLang].alertImportError);
        return;
      }

      devices = result.devices; // Overwrite current devices with imported data
      unifyDevices(devices);
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists(); // Update device manager lists
      // Re-populate all dropdowns and update calculations
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
      controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();

      const deviceCount = countDeviceDatabaseEntries(devices);
      alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
      exportOutput.style.display = "block"; // Show the textarea
      exportOutput.value = JSON.stringify(devices, null, 2); // Display the newly imported data
    } catch (error) {
      console.error("Error parsing or importing data:", error);
      const errorMessage = error && error.message ? error.message : String(error);
      const summary = formatDeviceImportErrors([errorMessage]);
      alert(summary ? `${texts[currentLang].alertImportError}\n${summary}` : texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // Clear the file input for re-selection of the same file
});


// --- NEW SETUP MANAGEMENT FUNCTIONS ---

// Generate a printable overview of the current selected setup in a new tab
generateOverviewBtn.addEventListener('click', () => {
    if (!setupSelect.value) { // Ensure a setup is selected
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    generatePrintableOverview();
});

function batteryPinsSufficient() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    if (!isFinite(totalCurrentLow)) return true;
    return totalCurrentLow <= battData.pinA;
}

function alertPinExceeded() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    alert(
        texts[currentLang].warnPinExceeded
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', battData.pinA)
    );
}

// Generate a printable gear list for the current setup
generateGearListBtn.addEventListener('click', () => {
    if (!setupSelect.value) {
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    if (!batteryPinsSufficient()) {
        alertPinExceeded();
        return;
    }
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
    openDialog(projectDialog);
});

if (deleteGearListProjectBtn) {
    deleteGearListProjectBtn.addEventListener('click', () => {
        deleteCurrentGearList();
    });
}

if (projectCancelBtn) {
    projectCancelBtn.addEventListener('click', () => {
        closeDialog(projectDialog);
    });
}

if (projectDialogCloseBtn) {
    projectDialogCloseBtn.addEventListener('click', () => {
        if (projectCancelBtn) {
            projectCancelBtn.click();
        } else {
            closeDialog(projectDialog);
        }
    });
}

if (projectForm) {
    projectForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!batteryPinsSufficient()) {
            alertPinExceeded();
            return;
        }
        const info = collectProjectFormData();
        currentProjectInfo = info;
        ensureZoomRemoteSetup(info);
        const html = generateGearListHtml(info);
        displayGearAndRequirements(html);
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        // Persist the generated gear list and current project name so that
        // a page reload can restore the visible gear list without requiring
        // any additional user action.
        saveCurrentSession();
        scheduleProjectAutoSave(true);
        closeDialog(projectDialog);
    });
}

function downloadSharedProject(shareFileName, includeAutoGear) {
  if (!shareFileName) return;
  const setupName = getCurrentProjectName();
  const currentSetup = {
    setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value,
    batteryHotswap: hotswapSelect.value
  };
  if (currentProjectInfo) {
    currentSetup.projectInfo = currentProjectInfo;
  } else {
    const project = typeof loadProject === 'function' ? loadProject(setupName) : null;
    if (project && project.projectInfo) {
      currentSetup.projectInfo = project.projectInfo;
    }
  }
  const gearSelectors = getGearListSelectors();
  if (Object.keys(gearSelectors).length) {
    currentSetup.gearSelectors = gearSelectors;
  }
  const combinedHtml = getCurrentGearListHtml();
  if (combinedHtml) {
    const { projectHtml, gearHtml } = splitGearListHtml(combinedHtml);
    if (projectHtml) currentSetup.projectHtml = projectHtml;
    if (gearHtml) {
      currentSetup.gearList = projectHtml
        ? gearHtml.replace(/<h2[^>]*>.*?<\/h2>/, '')
        : gearHtml;
    }
  }
  const deviceChanges = getDeviceChanges();
  if (Object.keys(deviceChanges).length) {
    currentSetup.changedDevices = deviceChanges;
  }
  const key = getCurrentSetupKey();
  const feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  const rulesForShare = getAutoGearRules();
  const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (includeAutoGear && hasAutoGearRules) {
    currentSetup.autoGearRules = rulesForShare;
  }
  const json = JSON.stringify(currentSetup, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = shareFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
  }
  if (shareLinkMessage) {
    shareLinkMessage.textContent = texts[currentLang].shareLinkCopied;
    setStatusLevel(shareLinkMessage, 'success');
    shareLinkMessage.classList.remove('hidden');
    setTimeout(() => shareLinkMessage.classList.add('hidden'), 4000);
  }
}

shareSetupBtn.addEventListener('click', () => {
  saveCurrentGearList();
  const setupName = getCurrentProjectName();
  const defaultName = getDefaultShareFilename(setupName);
  const defaultFilename = ensureJsonExtension(defaultName);

  if (!shareDialog || !shareForm || !shareFilenameInput) {
    const shareFileName = promptForSharedFilename(setupName);
    if (!shareFileName) {
      return;
    }
    const rulesForShare = getAutoGearRules();
    const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
    const includeAutoGear = hasAutoGearRules
      ? confirmAutoGearSelection(
          shareIncludeAutoGearCheckbox ? shareIncludeAutoGearCheckbox.checked : false
        )
      : false;
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
    }
    downloadSharedProject(shareFileName, includeAutoGear);
    return;
  }

  shareFilenameInput.value = defaultFilename;
  shareFilenameInput.setCustomValidity('');

  if (shareFilenameMessage) {
    const template = getLocalizedText('shareFilenamePrompt') || '';
    shareFilenameMessage.textContent = template.includes('{defaultName}')
      ? template.replace('{defaultName}', defaultName)
      : template;
  }

  const rulesForShare = getAutoGearRules();
  const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.disabled = !hasAutoGearRules;
    shareIncludeAutoGearCheckbox.setAttribute('aria-disabled', hasAutoGearRules ? 'false' : 'true');
    if (!hasAutoGearRules) {
      shareIncludeAutoGearCheckbox.checked = false;
    }
  }
  if (shareIncludeAutoGearLabelElem) {
    shareIncludeAutoGearLabelElem.classList.toggle('disabled', !hasAutoGearRules);
    shareIncludeAutoGearLabelElem.setAttribute('aria-disabled', !hasAutoGearRules ? 'true' : 'false');
  }

  openDialog(shareDialog);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      if (shareFilenameInput) {
        shareFilenameInput.focus();
        shareFilenameInput.select();
      }
    });
  } else if (shareFilenameInput) {
    setTimeout(() => {
      shareFilenameInput.focus();
      shareFilenameInput.select();
    }, 0);
  }
});

if (shareForm) {
  shareForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!shareFilenameInput) return;
    const sanitized = sanitizeShareFilename(shareFilenameInput.value);
    if (!sanitized) {
      const invalidMessage =
        getLocalizedText('shareFilenameInvalid')
        || 'Please enter a valid file name to continue.';
      shareFilenameInput.setCustomValidity(invalidMessage);
      shareFilenameInput.reportValidity();
      return;
    }
    shareFilenameInput.setCustomValidity('');
    const shareFileName = ensureJsonExtension(sanitized);
    const includeAutoGear = !!(
      shareIncludeAutoGearCheckbox
      && !shareIncludeAutoGearCheckbox.disabled
      && shareIncludeAutoGearCheckbox.checked
    );
    closeDialog(shareDialog);
    downloadSharedProject(shareFileName, includeAutoGear);
  });
}

if (shareCancelBtn) {
  shareCancelBtn.addEventListener('click', () => {
    if (shareFilenameInput) {
      shareFilenameInput.setCustomValidity('');
    }
    closeDialog(shareDialog);
  });
}

if (shareDialog) {
  shareDialog.addEventListener('cancel', event => {
    event.preventDefault();
    if (shareFilenameInput) {
      shareFilenameInput.setCustomValidity('');
    }
    closeDialog(shareDialog);
  });
}

if (sharedLinkInput) {
  sharedLinkInput.addEventListener('change', () => {
    if (pendingSharedLinkListener) return;
    const file = sharedLinkInput.files && sharedLinkInput.files[0];
    if (file) {
      readSharedProjectFile(file);
    }
  });
}

if (applySharedLinkBtn && sharedLinkInput) {
  applySharedLinkBtn.addEventListener('click', () => {
    if (pendingSharedLinkListener) {
      sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
      pendingSharedLinkListener = null;
    }
    const handleSelection = () => {
      sharedLinkInput.removeEventListener('change', handleSelection);
      pendingSharedLinkListener = null;
      const file = sharedLinkInput.files && sharedLinkInput.files[0];
      if (file) {
        readSharedProjectFile(file);
      }
    };
    pendingSharedLinkListener = handleSelection;
    sharedLinkInput.addEventListener('change', handleSelection);
    sharedLinkInput.value = '';
    sharedLinkInput.click();
    if (sharedLinkInput.files && sharedLinkInput.files.length) {
      handleSelection();
    }
  });
}

if (sharedImportModeSelect) {
  sharedImportModeSelect.addEventListener('change', () => {
    if (sharedImportPromptActive) return;
    if (lastSharedSetupData === null) return;
    reapplySharedImportSelection();
  });
}

if (sharedImportForm) {
  sharedImportForm.addEventListener('submit', event => {
    event.preventDefault();
    finalizeSharedImportPrompt();
    applyStoredSharedImport();
  });
}

if (sharedImportCancelBtn) {
  sharedImportCancelBtn.addEventListener('click', () => {
    finalizeSharedImportPrompt();
    clearStoredSharedImportData();
  });
}

if (sharedImportDialog) {
  sharedImportDialog.addEventListener('cancel', event => {
    event.preventDefault();
    finalizeSharedImportPrompt();
    clearStoredSharedImportData();
  });
}

// Open feedback dialog and handle submission
if (runtimeFeedbackBtn && feedbackDialog && feedbackForm) {
  runtimeFeedbackBtn.addEventListener('click', () => {
    const today = new Date().toISOString().split('T')[0];
    const motVals = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const ctrlVals = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    document.getElementById('fbDate').value = today;
    document.getElementById('fbCamera').value = cameraSelect.value || '';
    document.getElementById('fbBatteryPlate').value = getSelectedPlate() || '';
    document.getElementById('fbBattery').value = batterySelect.value || '';
    document.getElementById('fbWirelessVideo').value = videoSelect.value || '';
    document.getElementById('fbMonitor').value = monitorSelect.value || '';
    const cam = devices?.cameras?.[cameraSelect.value];
    document.getElementById('fbResolution').value = cam?.resolutions?.[0] || '';
    document.getElementById('fbCodec').value = cam?.recordingCodecs?.[0] || '';
    document.getElementById('fbControllers').value = ctrlVals.join(', ');
    document.getElementById('fbMotors').value = motVals.join(', ');
    const fbDistance = document.getElementById('fbDistance');
    if (fbDistance && distanceSelect) {
      fbDistance.innerHTML = distanceSelect.innerHTML;
      fbDistance.value = distanceSelect.value || '';
    }
    openDialog(feedbackDialog);
  });

  feedbackCancelBtn.addEventListener('click', () => {
    closeDialog(feedbackDialog);
  });

  if (feedbackUseLocationBtn) {
    feedbackUseLocationBtn.addEventListener('click', () => {
      const locationInput = document.getElementById('fbLocation');
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }
      feedbackUseLocationBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          locationInput.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          feedbackUseLocationBtn.disabled = false;
        },
        () => {
          feedbackUseLocationBtn.disabled = false;
          alert('Unable to retrieve your location');
        }
      );
    });
  }

  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const entry = {
      username: document.getElementById('fbUsername').value.trim(),
      date: document.getElementById('fbDate').value,
      location: document.getElementById('fbLocation').value.trim(),
      camera: document.getElementById('fbCamera').value.trim(),
      batteryPlate: document.getElementById('fbBatteryPlate').value.trim(),
      lensMount: document.getElementById('fbLensMount').value.trim(),
      resolution: document.getElementById('fbResolution').value.trim(),
      codec: document.getElementById('fbCodec').value.trim(),
      framerate: document.getElementById('fbFramerate').value.trim(),
      cameraWifi: document.getElementById('fbWifi').value,
      firmware: document.getElementById('fbFirmware').value.trim(),
      battery: document.getElementById('fbBattery').value.trim(),
      batteryAge: document.getElementById('fbBatteryAge').value.trim(),
      wirelessVideo: document.getElementById('fbWirelessVideo').value.trim(),
      monitor: document.getElementById('fbMonitor').value.trim(),
      monitorBrightness: document.getElementById('fbMonitorBrightness').value.trim(),
      lens: document.getElementById('fbLens').value.trim(),
      lensData: document.getElementById('fbLensData').value.trim(),
      controllers: document.getElementById('fbControllers').value.trim(),
      motors: document.getElementById('fbMotors').value.trim(),
      distance: document.getElementById('fbDistance').value.trim(),
      temperature: document.getElementById('fbTemperature').value.trim(),
      charging: document.getElementById('fbCharging').value.trim(),
      runtime: document.getElementById('fbRuntime').value.trim(),
      batteriesPerDay: document.getElementById('fbBatteriesPerDay').value.trim()
    };
    const key = getCurrentSetupKey();
    const feedback = loadFeedbackSafe();
    if (!feedback[key]) feedback[key] = [];
    feedback[key].push(entry);
    saveFeedbackSafe(feedback);
    const lines = [];
    Object.entries(entry).forEach(([k, v]) => {
      lines.push(`${k}: ${v}`);
    });
    const subject = encodeURIComponent('Cine Power Planner Runtime Feedback');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:info@lucazanner.de?subject=${subject}&body=${body}`;
    closeDialog(feedbackDialog);
    updateCalculations();
  });
}


function summarizeByType(list) {
    if (!Array.isArray(list)) return {};
    return list.reduce((counts, it) => {
        if (it?.type) {
            counts[it.type] = (counts[it.type] || 0) + 1;
        }
        return counts;
    }, {});
}

function iconMarkup(glyph, classNameOrOptions = 'info-icon', options = null) {
  if (!glyph) return '';
  let opts = {};
  let resolvedClassName = 'info-icon';
  if (typeof classNameOrOptions === 'string' || classNameOrOptions === null) {
    resolvedClassName = classNameOrOptions || '';
    if (options && typeof options === 'object') {
      opts = options;
    }
  } else if (classNameOrOptions && typeof classNameOrOptions === 'object') {
    opts = classNameOrOptions;
    resolvedClassName = classNameOrOptions.className || 'info-icon';
  }
  if (typeof opts.className === 'string') {
    resolvedClassName = opts.className;
  }
  const styleParts = [];
  if (typeof opts.size === 'string' && opts.size.trim()) {
    styleParts.push(`--icon-size: ${opts.size.trim()}`);
  }
  if (typeof opts.scale === 'string' && opts.scale.trim()) {
    styleParts.push(`--icon-scale: ${opts.scale.trim()}`);
  }
  if (typeof opts.style === 'string' && opts.style.trim()) {
    styleParts.push(opts.style.trim());
  }
  const styleAttr = styleParts.length ? ` style="${styleParts.join(';')}"` : '';
  const resolved = resolveIconGlyph(glyph);
  const classes = ['icon-glyph'];
  if (resolvedClassName) classes.unshift(resolvedClassName);
  if (resolved.markup) {
    if (resolved.className) classes.push(resolved.className);
    const markup = ensureSvgHasAriaHidden(resolved.markup);
    return `<span class="${classes.join(' ')}"${styleAttr} aria-hidden="true">${markup}</span>`;
  }
  const char = resolved.char || '';
  if (!char) return '';
  return `<span class="${classes.join(' ')}"${styleAttr} data-icon-font="${resolved.font}" aria-hidden="true">${char}</span>`;
}

function applyIconGlyph(element, glyph) {
  if (!element) return;
  const resolved = resolveIconGlyph(glyph);
  if (resolved.markup) {
    element.innerHTML = ensureSvgHasAriaHidden(resolved.markup);
    element.setAttribute('aria-hidden', 'true');
    if (resolved.className) {
      resolved.className
        .split(/\s+/)
        .filter(Boolean)
        .forEach(cls => element.classList.add(cls));
    }
    element.removeAttribute('data-icon-font');
    return;
  }
  const char = resolved.char || '';
  element.textContent = char;
  if (char) {
    element.setAttribute('data-icon-font', resolved.font);
  } else {
    element.removeAttribute('data-icon-font');
  }
}

function connectorBlocks(items, icon, cls = 'neutral-conn', label = '', dir = '') {
  if (!Array.isArray(items) || items.length === 0) return '';
  const counts = summarizeByType(items);
  const entries = Object.entries(counts).map(([type, count]) => {
    return `${escapeHtml(type)}${count > 1 ? ` ×${count}` : ''}`;
  });
  if (!entries.length) return '';
  const prefix = label ? `${label}${dir ? ` ${dir}` : ''}: ` : '';
  const iconHtml = iconMarkup(icon, 'connector-icon');
  return `<span class="connector-block ${cls}">${iconHtml}${prefix}${entries.join(', ')}</span>`;
}

function generateConnectorSummary(device) {
  if (!device || typeof device !== 'object') return '';

  let portHtml = '';
  const connectors = [
    { items: device.power?.powerDistributionOutputs, icon: diagramConnectorIcons.powerOut, cls: 'power-conn', label: 'Power', dir: 'Out' },
    { items: powerInputTypes(device).map(t => ({ type: t })), icon: diagramConnectorIcons.powerIn, cls: 'power-conn', label: 'Power', dir: 'In' },
    { items: device.fizConnectors, icon: diagramConnectorIcons.fiz, cls: 'fiz-conn', label: 'FIZ Port' },
    { items: device.video?.inputs || device.videoInputs, icon: diagramConnectorIcons.video, cls: 'video-conn', label: 'Video', dir: 'In' },
    { items: device.video?.outputs || device.videoOutputs, icon: diagramConnectorIcons.video, cls: 'video-conn', label: 'Video', dir: 'Out' },
    { items: device.timecode, icon: diagramConnectorIcons.timecode, cls: 'neutral-conn', label: 'Timecode' },
    { items: device.audioInput?.portType ? [{ type: device.audioInput.portType }] : undefined, icon: diagramConnectorIcons.audioIn, cls: 'neutral-conn', label: 'Audio', dir: 'In' },
    { items: device.audioOutput?.portType ? [{ type: device.audioOutput.portType }] : undefined, icon: diagramConnectorIcons.audioOut, cls: 'neutral-conn', label: 'Audio', dir: 'Out' },
    { items: device.audioIo?.portType ? [{ type: device.audioIo.portType }] : undefined, icon: diagramConnectorIcons.audioIo, cls: 'neutral-conn', label: 'Audio', dir: 'I/O' },
  ];

  for (const { items, icon, cls, label, dir } of connectors) {
    portHtml += connectorBlocks(items, icon, cls, label, dir);
  }

  let specHtml = '';
  if (typeof device.powerDrawWatts === 'number') {
    specHtml += `<span class="info-box power-conn">${iconMarkup(diagramConnectorIcons.powerSpec)}Power: ${device.powerDrawWatts} W</span>`;
  }
  if (device.power?.input?.voltageRange) {
    specHtml += `<span class="info-box power-conn">${iconMarkup(ICON_GLYPHS.batteryBolt)}Voltage: ${escapeHtml(String(device.power.input.voltageRange))}V</span>`;
  }
  if (typeof device.capacity === 'number') {
        specHtml += `<span class="info-box power-conn">${iconMarkup(ICON_GLYPHS.batteryFull)}Capacity: ${device.capacity} Wh</span>`;
    }
    if (typeof device.pinA === 'number') {
        specHtml += `<span class="info-box power-conn">Pins: ${device.pinA}A</span>`;
    }
    if (typeof device.dtapA === 'number') {
        specHtml += `<span class="info-box power-conn">D-Tap: ${device.dtapA}A</span>`;
    }
    if (device.mount_type) {
        specHtml += `<span class="info-box power-conn">Mount: ${escapeHtml(String(device.mount_type))}</span>`;
    }
  if (typeof device.screenSizeInches === 'number') {
    specHtml += `<span class="info-box video-conn">${iconMarkup(DIAGRAM_MONITOR_ICON)}Screen: ${device.screenSizeInches}"</span>`;
  }
    if (typeof device.brightnessNits === 'number') {
        specHtml += `<span class="info-box video-conn">${iconMarkup(ICON_GLYPHS.brightness)}Brightness: ${device.brightnessNits} nits</span>`;
    }
  if (typeof device.wirelessTx === 'boolean') {
    specHtml += `<span class="info-box video-conn">${iconMarkup(ICON_GLYPHS.wifi)}Wireless: ${device.wirelessTx}</span>`;
  }
  if (device.internalController) {
    specHtml += `<span class="info-box fiz-conn">${iconMarkup(diagramConnectorIcons.controller)}Controller: Internal</span>`;
  }
  if (typeof device.torqueNm === 'number') {
    specHtml += `<span class="info-box fiz-conn">${iconMarkup(diagramConnectorIcons.torque)}Torque: ${device.torqueNm} Nm</span>`;
  }
  if (device.powerSource) {
    specHtml += `<span class="info-box power-conn">${iconMarkup(diagramConnectorIcons.powerSource)}Power Source: ${escapeHtml(String(device.powerSource))}</span>`;
  }

    let extraHtml = '';
    if (Array.isArray(device.power?.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
        const types = device.power.batteryPlateSupport.map(p => {
            const mount = p.mount ? ` (${escapeHtml(p.mount)})` : '';
            return `${escapeHtml(p.type)}${mount}`;
        });
        extraHtml += `<span class="info-box power-conn">Battery Plate: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.recordingMedia) && device.recordingMedia.length) {
        const types = device.recordingMedia.map(m => escapeHtml(m.type));
        extraHtml += `<span class="info-box video-conn">Media: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
        const types = device.viewfinder.map(v => escapeHtml(v.type));
        extraHtml += `<span class="info-box video-conn">Viewfinder: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
        const types = device.gearTypes.map(g => escapeHtml(g));
        extraHtml += `<span class="info-box fiz-conn">Gear: ${types.join(', ')}</span>`;
    }
    if (device.connectivity) {
        extraHtml += `<span class="info-box video-conn">Connectivity: ${escapeHtml(String(device.connectivity))}</span>`;
    }
    if (device.notes) {
        extraHtml += `<span class="info-box neutral-conn">Notes: ${escapeHtml(String(device.notes))}</span>`;
    }

    let lensHtml = '';
    if (Array.isArray(device.lensMount)) {
        const boxes = device.lensMount.map(lm => {
            const mount = lm.mount ? ` (${escapeHtml(lm.mount)})` : '';
            return `<span class="info-box neutral-conn">${escapeHtml(lm.type)}${mount}</span>`;
        }).join('');
        if (boxes) lensHtml = `<div class="lens-mount-box">${boxes}</div>`;
    }

    let html = '';
    const section = (label, content) => {
        if (!content) return '';
        return `<div class="info-label">${label}</div>${content}`;
    };

    html += section('Ports', portHtml);
    html += section('Specs', specHtml);
    html += section('Extras', extraHtml);
    if (lensHtml) html += `<div class="info-label">Lens Mount</div>${lensHtml}`;

    return html ? `<div class="connector-summary">${html}</div>` : '';
}


function suggestChargerCounts(total) {
    let quad = Math.floor(total / 4);
    const remainder = total % 4;
    let dual = 0;
    let single = 0;
    if (remainder === 0) {
        // nothing
    } else if (remainder === 3) {
        quad += 1;
    } else if (remainder > 0) {
        dual += 1;
    }
    return { quad, dual, single };
}

function addArriKNumber(name) {
    if (!name) return name;
    const d = typeof devices !== 'undefined' ? devices : {};
    const collections = [
        d.viewfinders,
        d.directorMonitors,
        d.iosVideo,
        d.videoAssist,
        d.media,
        d.lenses
    ];
    for (const col of collections) {
        if (col && col[name]) {
            const item = col[name];
            if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                return name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `);
            }
            return name;
        }
    }
    if (d.accessories) {
        const findItem = obj => {
            if (!obj) return null;
            if (obj[name]) return obj[name];
            for (const val of Object.values(obj)) {
                if (val && typeof val === 'object') {
                    const found = findItem(val);
                    if (found) return found;
                }
            }
            return null;
        };
        for (const col of Object.values(d.accessories)) {
            const item = findItem(col);
            if (item) {
                if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                    return /^ARRI\s*/i.test(name) ? name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `) : `ARRI ${item.kNumber} ${name}`;
                }
                return name;
            }
        }
    }
    return name;
}

const sanitizeFizContext = context => (context || '')
    .replace(/[()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

const formatFizCable = (name, context) => {
    const cleaned = sanitizeFizContext(context);
    return cleaned ? `${name} (${cleaned})` : name;
};

function suggestArriFizCables() {
    const CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
    const CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
    const CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
    const cables = [];
    const lbusLengths = [];
    const camSpare = [];
    const camera = cameraSelect?.value || '';
    const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const distance = distanceSelect?.value || '';
    const motor = motors[0] || '';
    const hasMasterGrip = controllers.includes('Arri Master Grip (single unit)');
    const hasRIA = controllers.includes('Arri RIA-1');
    let hasUDM = distance.includes('UDM');
    let hasLCube = distance.includes('LCube');
    if (hasLCube && (hasRIA || camera === 'Arri Alexa 35')) hasLCube = false;
    const isCforceMiniRF = /cforce mini rf/i.test(motor);
    const isCforceMini = /cforce mini/i.test(motor) && !isCforceMiniRF;
    const motorContext = motor ? `for ${motor}` : 'for FIZ motor';
    const masterGripContext = 'for Arri Master Grip (single unit)';
    const distanceContext = distance ? `for ${distance}` : 'for distance sensor';
    const controllersToCheck = [];
    if (hasRIA) controllersToCheck.push('Arri RIA-1');
    if (isCforceMiniRF) controllersToCheck.push('Arri cforce mini RF');
    const primaryController = controllersToCheck[0] || controllers[0] || '';
    const pushLbus = (len, contextOverride) => {
        const formatted = String(len).replace('.', ',');
        const ctx = contextOverride || motorContext;
        cables.push(formatFizCable(`LBUS to LBUS ${formatted}m`, ctx));
        lbusLengths.push(Number(len));
    };
    if ((camera === 'Arri Alexa Mini' || camera === 'Arri Alexa Mini LF') && isCforceMini) {
        pushLbus(0.3);
        if (hasLCube) pushLbus(0.4, distanceContext);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (camera === 'Arri Alexa 35' && isCforceMini) {
        pushLbus(0.3);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (isCforceMiniRF) {
        if (hasLCube) {
            pushLbus(0.4, distanceContext);
            if (hasMasterGrip) pushLbus(0.5, masterGripContext);
        } else if (hasMasterGrip) {
            pushLbus(0.5, masterGripContext);
        }
    } else if (hasRIA && isCforceMini) {
        pushLbus(0.4);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    }
    if (controllersToCheck.length) {
        const cablesData = devices.accessories?.cables || {};
        let chosen = null;
        for (const [name, data] of Object.entries(cablesData)) {
            const connectors = [];
            if (Array.isArray(data.connectors)) connectors.push(...data.connectors);
            if (data.from) connectors.push(data.from);
            if (data.to) connectors.push(data.to);
            if (!connectors.some(c => /CAM \(7-pin/i.test(c))) continue;
            const ctrlOk = (data.compatibleControllers || []).some(cc =>
                controllersToCheck.some(ct => cc.toLowerCase().includes(ct.toLowerCase())));
            if (!ctrlOk) continue;
            const camOk = !data.compatibleCameras ||
                data.compatibleCameras.some(c => c.toLowerCase() === camera.toLowerCase());
            if (!camOk) continue;
            if (!chosen || (data.lengthM ?? Infinity) < (cablesData[chosen].lengthM ?? Infinity)) {
                chosen = name;
            }
        }
        if (chosen) {
            const camContext = camera ? `for ${camera}` : 'for camera control';
            cables.push(formatFizCable(chosen, camContext));
            camSpare.push(chosen);
        } else if (hasRIA && cablesData['Cable CAM (7-pin) – D-Tap 0,5m']) {
            const fallback = 'Cable CAM (7-pin) – D-Tap 0,5m';
            const fallbackContext = primaryController ? `for ${primaryController} power` : 'for controller power';
            cables.push(formatFizCable(fallback, fallbackContext));
            camSpare.push(fallback);
        }
    }
    if (hasUDM) {
        if (hasLCube) {
            cables.push(formatFizCable(CABLE_UDM_SERIAL_7P, distanceContext));
        } else {
            cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, distanceContext));
            cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, 'spare'));
        }
    }
    if (lbusLengths.length) {
        const shortest = Math.min(...lbusLengths);
        const formattedShortest = String(shortest).replace('.', ',');
        cables.push(formatFizCable(`LBUS to LBUS ${formattedShortest}m`, 'spare'));
        cables.push(formatFizCable(CABLE_LBUS_05, 'spare'));
    }
    camSpare.forEach(n => cables.push(formatFizCable(n, 'spare')));
    return cables;
}

function collectAccessories({ hasMotor = false, videoDistPrefs = [] } = {}) {
    const cameraSupport = [];
    const misc = [];
    const monitoringSupport = [
        'BNC Cable 0.5 m',
        'BNC Cable 1 m',
        'BNC Cable 5 m',
        'BNC Cable 10 m',
        'BNC Drum 25 m'
    ];
    const rigging = [];
    const chargers = [];
    const fizCables = [];
    const acc = devices.accessories || {};
    const excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);

    if (batterySelect.value) {
        const mount = devices.batteries[batterySelect.value]?.mount_type;
        if (acc.powerPlates) {
            for (const [name, plate] of Object.entries(acc.powerPlates)) {
                if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
                    cameraSupport.push(name);
                }
            }
        }
        if (acc.chargers) {
            let camCount = parseInt(batteryCountElem?.textContent || '', 10);
            if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
            let monCount = 0;
            if (Array.isArray(videoDistPrefs)) {
                const handheldCount = videoDistPrefs.filter(v => /Monitor(?: \d+")? handheld$/.test(v)).length;
                monCount += handheldCount * 3;
                const largeCount = videoDistPrefs.filter(v => {
                    const m = v.match(/Monitor (\d+(?:\.\d+)?)/);
                    return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
                }).length;
                monCount += largeCount * 2;
            }
            if (hasMotor) monCount += 3;
            const total = camCount + monCount;
            if (total > 0) {
                const counts = suggestChargerCounts(total);
                const findName = slots => {
                    for (const [name, charger] of Object.entries(acc.chargers)) {
                        if (charger.mount === mount && charger.slots === slots) return name;
                    }
                    return null;
                };
                const pushCharger = (slots, count) => {
                    const n = findName(slots);
                    if (!n) return;
                    for (let i = 0; i < count; i++) chargers.push(n);
                };
                pushCharger(4, counts.quad);
                pushCharger(2, counts.dual);
                pushCharger(1, counts.single);
            }
        }
    }

    if (cameraSelect.value && acc.cages) {
        if (!cageSelect.value || cageSelect.value === 'None') {
            for (const [name, cage] of Object.entries(acc.cages)) {
                if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(name);
            }
        }
    }

    const powerCableDb = acc.cables?.power || {};
    const gatherPower = (data, target = misc, includeExcluded = false) => {
        const input = data?.power?.input?.type;
        const types = Array.isArray(input) ? input : input ? [input] : [];
        types.forEach(t => {
            for (const [name, cable] of Object.entries(powerCableDb)) {
                const isExcluded = excludedCables.has(name);
                if (cable.to === t && (!isExcluded || includeExcluded)) target.push(name);
            }
        });
    };
    gatherPower(devices.cameras[cameraSelect.value]);
    gatherPower(devices.video[videoSelect.value]);
    const onboardMonitor = devices.monitors[monitorSelect.value];
    if (onboardMonitor) {
        const monitorLabel = 'Onboard monitor';
        const powerType = onboardMonitor?.power?.input?.type;
        const hasLemo2 = Array.isArray(powerType)
            ? powerType.includes('LEMO 2-pin')
            : powerType === 'LEMO 2-pin';
        if (hasLemo2) {
            monitoringSupport.push(
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`,
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`
            );
        }
        const cameraData = devices.cameras[cameraSelect.value];
        const camVideo = (cameraData?.videoOutputs || []).map(v => v.type?.toUpperCase());
        const monVideo = (onboardMonitor.videoInputs || []).map(v => v.type?.toUpperCase());
        const hasSDI = camVideo.some(t => t && t.includes('SDI')) && monVideo.some(t => t && t.includes('SDI'));
        const hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
        if (hasSDI) {
            monitoringSupport.push(
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`,
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`
            );
        } else if (hasHDMI) {
            monitoringSupport.push(
                `Ultraslim HDMI 0.5 m (${monitorLabel})`,
                `Ultraslim HDMI 0.5 m (${monitorLabel})`
            );
        }
        rigging.push(`ULCS Arm mit 3/8" und 1/4" double (${monitorLabel})`);
    }
    if (videoSelect.value) {
        const rxName = videoSelect.value.replace(/ TX\b/, ' RX');
        if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            gatherPower(devices.wirelessReceivers[rxName]);
        }
    }
    motorSelects.forEach(sel => gatherPower(devices.fiz.motors[sel.value]));
    controllerSelects.forEach(sel => gatherPower(devices.fiz.controllers[sel.value]));
    gatherPower(devices.fiz.distance[distanceSelect.value]);

    const fizCableDb = acc.cables?.fiz || {};
    const getFizConnectors = data => {
        const list = [];
        if (!data) return list;
        if (Array.isArray(data.fizConnectors)) {
            data.fizConnectors.forEach(fc => {
                const type = fc && typeof fc === 'object' ? fc.type : fc;
                if (type) list.push(type);
            });
        }
        if (data.fizConnector) list.push(data.fizConnector);
        return [...new Set(list.filter(Boolean))];
    };
    const pushFizCable = (name, context) => {
        fizCables.push(formatFizCable(name, context));
    };
    const pairContextCounts = {};
    const buildPairContext = (motorName, controllerName) => {
        const parts = [sanitizeFizContext(motorName), sanitizeFizContext(controllerName)].filter(Boolean);
        if (!parts.length) return '';
        const base = parts.join(' ↔ ');
        const key = base.toLowerCase();
        const next = (pairContextCounts[key] || 0) + 1;
        pairContextCounts[key] = next;
        return next > 1 ? `${base} #${next}` : base;
    };
    const matchesCable = (cable, from, to) => {
        if (!cable) return false;
        const fromToMatch = (a, b) => (cable.from === a && cable.to === b) || (cable.from === b && cable.to === a);
        if (cable.from && cable.to) {
            if (fromToMatch(from, to)) return true;
        }
        if (Array.isArray(cable.connectors)) {
            const connectors = cable.connectors;
            if (connectors.includes(from) && connectors.includes(to)) return true;
        }
        return false;
    };
    const motorEntries = motorSelects
        .map(sel => sel.value)
        .filter(v => v && v !== 'None')
        .map(name => ({ name, data: devices.fiz.motors[name] }))
        .filter(entry => entry.data);
    const controllerEntries = controllerSelects
        .map(sel => sel.value)
        .filter(v => v && v !== 'None')
        .map(name => ({ name, data: devices.fiz.controllers[name] }))
        .filter(entry => entry.data);
    motorEntries.forEach(motorEntry => {
        const motorConns = getFizConnectors(motorEntry.data);
        controllerEntries.forEach(controllerEntry => {
            const controllerConns = getFizConnectors(controllerEntry.data);
            motorConns.forEach(mConn => {
                controllerConns.forEach(cConn => {
                    if (mConn !== cConn) return;
                    for (const [name, cable] of Object.entries(fizCableDb)) {
                        if (matchesCable(cable, mConn, cConn)) {
                            const context = buildPairContext(motorEntry.name, controllerEntry.name);
                            pushFizCable(name, context);
                        }
                    }
                });
            });
        });
    });

    suggestArriFizCables().forEach(name => fizCables.push(name));

    const miscUnique = [...new Set(misc)];
    const monitoringSupportList = monitoringSupport.slice();
    const riggingUnique = [...new Set(rigging)];
    for (let i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
    return {
        cameraSupport: [...new Set(cameraSupport)],
        chargers,
        fizCables,
        misc: miscUnique,
        monitoringSupport: monitoringSupportList,
        rigging: riggingUnique
    };
}

function collectProjectFormData() {
    if (!projectForm) return {};

    const formData = new FormData(projectForm);
    const getValue = (name) => {
        const raw = formData.get(name);
        return typeof raw === 'string' ? raw.trim() : '';
    };
    const getMultiValue = (name) => {
        const values = formData.getAll(name);
        if (!values || values.length === 0) return '';
        return values.map(value => (typeof value === 'string' ? value : String(value))).join(', ');
    };

    const viewfinderSettings = getMultiValue('viewfinderSettings');
    const frameGuides = getMultiValue('frameGuides');
    const aspectMaskOpacity = getMultiValue('aspectMaskOpacity');
    const filterStr = collectFilterSelections();
    const filterTypes = filterStr ? filterStr.split(',').map(s => s.split(':')[0]) : [];
    const matteboxVal = filterTypes.some(t => t === 'ND Grad HE' || t === 'ND Grad SE')
        ? 'Swing Away'
        : getValue('mattebox');

    const people = Array.from(crewContainer?.querySelectorAll('.person-row') || [])
        .map(row => ({
            role: row.querySelector('select')?.value,
            name: row.querySelector('.person-name')?.value.trim(),
            phone: row.querySelector('.person-phone')?.value.trim(),
            email: row.querySelector('.person-email')?.value?.trim()
        }))
        .filter(person => person.role && person.name);

    const collectRanges = (container, startSel, endSel) => Array.from(container?.querySelectorAll('.period-row') || [])
        .map(row => {
            const start = row.querySelector(startSel)?.value;
            const end = row.querySelector(endSel)?.value;
            return [start, end].filter(Boolean).join(' to ');
        })
        .filter(Boolean);

    const prepDays = collectRanges(prepContainer, '.prep-start', '.prep-end');
    const shootingDays = collectRanges(shootContainer, '.shoot-start', '.shoot-end');

    const gearValues = gearListOutput ? (() => {
        const ids = [
            'gearListDirectorMonitor',
            'gearListDopMonitor',
            'gearListGafferMonitor',
            'gearListDirectorMonitor15',
            'gearListComboMonitor15',
            'gearListDopMonitor15',
            'gearListFocusMonitor',
            'gearListProGaffColor1',
            'gearListProGaffWidth1',
            'gearListProGaffColor2',
            'gearListProGaffWidth2',
            'gearListEyeLeatherColor'
        ];
        const map = new Map();
        ids.forEach(id => {
            const el = gearListOutput.querySelector(`#${id}`);
            if (!el) return;
            const value = el.value;
            map.set(id, typeof value === 'string' ? value : (value == null ? '' : String(value)));
        });
        return map;
    })() : null;

    const getGearValue = (id) => (gearValues && gearValues.has(id) ? gearValues.get(id) : '');

    const proGaffColor1 = getGearValue('gearListProGaffColor1');
    const proGaffWidth1 = getGearValue('gearListProGaffWidth1');
    const proGaffColor2 = getGearValue('gearListProGaffColor2');
    const proGaffWidth2 = getGearValue('gearListProGaffWidth2');

    const info = {
        productionCompany: getValue('productionCompany'),
        rentalHouse: getValue('rentalHouse'),
        ...(people.length ? { people } : {}),
        prepDays,
        shootingDays,
        deliveryResolution: getValue('deliveryResolution'),
        recordingResolution: getValue('recordingResolution'),
        aspectRatio: getMultiValue('aspectRatio'),
        codec: getValue('codec'),
        baseFrameRate: getValue('baseFrameRate'),
        sensorMode: getValue('sensorMode'),
        lenses: getMultiValue('lenses'),
        requiredScenarios: getMultiValue('requiredScenarios'),
        cameraHandle: getMultiValue('cameraHandle'),
        viewfinderExtension: getValue('viewfinderExtension'),
        viewfinderEyeLeatherColor: getGearValue('gearListEyeLeatherColor') || getValue('viewfinderEyeLeatherColor'),
        mattebox: matteboxVal,
        gimbal: getMultiValue('gimbal'),
        viewfinderSettings,
        frameGuides,
        aspectMaskOpacity,
        videoDistribution: getMultiValue('videoDistribution'),
        monitoringConfiguration: getValue('monitoringConfiguration'),
        monitorUserButtons: getMultiValue('monitorUserButtons'),
        cameraUserButtons: getMultiValue('cameraUserButtons'),
        viewfinderUserButtons: getMultiValue('viewfinderUserButtons'),
        tripodHeadBrand: getValue('tripodHeadBrand'),
        tripodBowl: getValue('tripodBowl'),
        tripodTypes: getMultiValue('tripodTypes'),
        tripodSpreader: getValue('tripodSpreader'),
        sliderBowl: getSliderBowlValue(),
        easyrig: getEasyrigValue(),
        filter: filterStr
    };

    const assignGearField = (prop, id) => {
        const value = getGearValue(id);
        if (value) {
            info[prop] = value;
        }
    };

    assignGearField('directorMonitor', 'gearListDirectorMonitor');
    assignGearField('dopMonitor', 'gearListDopMonitor');
    assignGearField('gafferMonitor', 'gearListGafferMonitor');
    assignGearField('directorMonitor15', 'gearListDirectorMonitor15');
    assignGearField('comboMonitor15', 'gearListComboMonitor15');
    assignGearField('dopMonitor15', 'gearListDopMonitor15');

    info.focusMonitor = getGearValue('gearListFocusMonitor') || '';

    if (proGaffColor1 || proGaffWidth1) {
        info.proGaffColor1 = proGaffColor1 || '';
        info.proGaffWidth1 = proGaffWidth1 || '';
    }

    if (proGaffColor2 || proGaffWidth2) {
        info.proGaffColor2 = proGaffColor2 || '';
        info.proGaffWidth2 = proGaffWidth2 || '';
    }

    const currentProjectName = getCurrentProjectName();
    if (currentProjectName) {
        info.projectName = currentProjectName;
    }

    return info;
}

function populateProjectForm(info = {}) {
    if (!projectForm) return;
    projectForm.reset();
    const setVal = (name, value) => {
        if (value === undefined) return;
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (field) field.value = value;
    };
    const setMulti = (name, values) => {
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (!field || values === undefined) return;
        const arr = Array.isArray(values) ? values : (values ? values.split(',').map(v => v.trim()) : []);
        Array.from(field.options).forEach(opt => {
            opt.selected = arr.includes(opt.value);
        });
    };

    populateRecordingResolutionDropdown(info.recordingResolution);
    populateSensorModeDropdown(info.sensorMode);
    populateCodecDropdown(info.codec);

    setVal('productionCompany', info.productionCompany);
    setVal('rentalHouse', info.rentalHouse);
    if (crewContainer) {
        crewContainer.innerHTML = '';
        (info.people || []).forEach(p => createCrewRow(p));
    }
    if (prepContainer) {
        prepContainer.innerHTML = '';
        const prepArr = Array.isArray(info.prepDays)
            ? info.prepDays
            : (info.prepDays ? String(info.prepDays).split('\n') : ['']);
        if (!prepArr.length) prepArr.push('');
        prepArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createPrepRow({ start, end });
        });
    }
    if (shootContainer) {
        shootContainer.innerHTML = '';
        const shootArr = Array.isArray(info.shootingDays)
            ? info.shootingDays
            : (info.shootingDays ? String(info.shootingDays).split('\n') : ['']);
        if (!shootArr.length) shootArr.push('');
        shootArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createShootRow({ start, end });
        });
    }
    setVal('deliveryResolution', info.deliveryResolution);
    setMulti('aspectRatio', info.aspectRatio);
    setVal('baseFrameRate', info.baseFrameRate);
    setVal('sensorMode', info.sensorMode);
    setMulti('lenses', info.lenses);
    setMulti('requiredScenarios', info.requiredScenarios);
    setMulti('cameraHandle', info.cameraHandle);
    setVal('viewfinderExtension', info.viewfinderExtension);
    setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
    setVal('mattebox', info.mattebox);
    setMulti('gimbal', info.gimbal);
    setMulti('viewfinderSettings', info.viewfinderSettings);
    setMulti('frameGuides', info.frameGuides);
    setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
    setMulti('videoDistribution', info.videoDistribution);
    setVal('monitoringConfiguration', info.monitoringConfiguration);
    setMulti('monitorUserButtons', info.monitorUserButtons);
    setMulti('cameraUserButtons', info.cameraUserButtons);
    setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
    setVal('tripodHeadBrand', info.tripodHeadBrand);
    setVal('tripodBowl', info.tripodBowl);
    setMulti('tripodTypes', info.tripodTypes);
    setVal('tripodSpreader', info.tripodSpreader);
    setSliderBowlValue(info.sliderBowl || '');
    setEasyrigValue(info.easyrig || '');
    const filterTokens = parseFilterTokens(info.filter);
    setMulti('filter', filterTokens.map(t => t.type));
    renderFilterDetails();
    filterTokens.forEach(({ type, size, values }) => {
        const sizeSel = document.getElementById(`filter-size-${filterId(type)}`);
        if (sizeSel) sizeSel.value = size;
        const valSel = document.getElementById(`filter-values-${filterId(type)}`);
        if (valSel) {
            const arr = Array.isArray(values) ? values : [];
            Array.from(valSel.options).forEach(opt => {
                opt.selected = arr.includes(opt.value);
            });
        }
    });
}

function ensureZoomRemoteSetup(info) {
    if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
    let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!motors.length) return;
    if (motors.length < 2 && motorSelects[1]) {
        let second = motors[0];
        if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
            second = 'Arri Cforce Mini';
        }
        motorSelects[1].value = second;
        motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    }
    const allowed = new Set([
        'Arri Master Grip (single unit)',
        'Arri ZMU-4 (body only, wired)',
        'Tilta Nucleus-M Hand Grip (single)',
        'Tilta Nucleus-M II Handle (single)'
    ]);
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!controllers.some(c => allowed.has(c))) {
        const brand = detectBrand(motors[0]);
        let ctrl = null;
        if (brand === 'arri') {
            ctrl = 'Arri Master Grip (single unit)';
        } else if (brand === 'tilta') {
            ctrl = 'Tilta Nucleus-M Hand Grip (single)';
        }
        if (ctrl && controllerSelects[0]) {
            controllerSelects[0].value = ctrl;
        }
    }
    if (typeof updateCalculations === 'function') updateCalculations();
    if (typeof saveCurrentSession === 'function') saveCurrentSession();
}

function stripAutoGearContext(name) {
    return (name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function normalizeAutoGearName(name) {
    return stripAutoGearContext(name).toLowerCase();
}

function matchesAutoGearItem(target, actual) {
    if (!target || !actual) return false;
    const normTarget = normalizeAutoGearName(target);
    const normActual = normalizeAutoGearName(actual);
    if (normTarget === normActual) return true;
    return normTarget === normalizeAutoGearName(actual.replace(/^\d+x\s+/, ''));
}

function getSpanCount(span) {
    if (!span) return 1;
    const text = span.textContent || '';
    const match = text.trim().match(/^(\d+)x\s+/);
    return match ? parseInt(match[1], 10) : 1;
}

function updateSpanCountInPlace(span, newCount) {
    if (!span) return;
    const walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT, null, false);
    let textNode = null;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (/\d+x\s+/i.test(node.textContent)) {
            textNode = node;
            break;
        }
    }
    if (!textNode) {
        span.insertBefore(document.createTextNode(`${newCount}x `), span.firstChild);
        return;
    }
    const value = textNode.textContent || '';
    const match = value.match(/^(\s*)(\d+)x\s+(.*)$/);
    if (match) {
        textNode.textContent = `${match[1]}${newCount}x ${match[3]}`;
    } else {
        textNode.textContent = value.replace(/^(\d+)x\s+/, `${newCount}x `);
    }
}

function cleanupAutoGearCell(cell) {
    if (!cell) return;
    const nodes = Array.from(cell.childNodes);
    let previousWasBreak = true;
    nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
            cell.removeChild(node);
            return;
        }
        if (node.nodeName === 'BR') {
            if (previousWasBreak || !node.nextSibling) {
                cell.removeChild(node);
                return;
            }
            previousWasBreak = true;
        } else {
            previousWasBreak = false;
        }
    });
    while (cell.firstChild && cell.firstChild.nodeName === 'BR') {
        cell.removeChild(cell.firstChild);
    }
    while (cell.lastChild && cell.lastChild.nodeName === 'BR') {
        cell.removeChild(cell.lastChild);
    }
    const textContent = cell.textContent ? cell.textContent.trim() : '';
    if (!textContent && !cell.querySelector('.gear-item')) {
        const row = cell.closest('tr');
        const section = row ? row.closest('tbody') : null;
        if (section && section.classList.contains('auto-gear-category')) {
            section.remove();
        }
    }
}

function analyzeAutoGearSegment(nodes) {
    if (!nodes || !nodes.length) return null;
    const span = nodes.find(node => node.nodeType === 1 && node.classList && node.classList.contains('gear-item'));
    if (span) {
        const name = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
        const count = getSpanCount(span);
        return { span, name, count };
    }
    const wrapper = document.createElement('div');
    nodes.forEach(node => wrapper.appendChild(node.cloneNode(true)));
    let text = wrapper.innerHTML
        .replace(/<select[\s\S]*?<\/select>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
    if (!text) return null;
    const match = text.match(/^(\d+)x\s+/);
    let count = 1;
    if (match) {
        count = parseInt(match[1], 10);
        text = text.slice(match[0].length).trim();
    }
    return { span: null, name: text, count, wrapper };
}

function updateRawSegmentCount(nodes, info, newCount) {
    if (!nodes.length) return;
    let updated = false;
    for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            const value = node.textContent || '';
            if (/\d+x\s+/i.test(value)) {
                node.textContent = value.replace(/^(\s*)(\d+)x\s+/, (match, spaces) => `${spaces}${newCount}x `);
                updated = true;
                break;
            }
            if (value.trim()) {
                node.textContent = `${newCount}x ${value.trim().replace(/^(\d+)x\s+/, '')}`;
                updated = true;
                break;
            }
        } else if (node.nodeType === 1) {
            const child = node.firstChild;
            if (child && child.nodeType === Node.TEXT_NODE && /\d+x\s+/i.test(child.textContent || '')) {
                child.textContent = (child.textContent || '').replace(/^(\s*)(\d+)x\s+/, (match, spaces) => `${spaces}${newCount}x `);
                updated = true;
                break;
            }
        }
    }
    if (!updated) {
        const first = nodes[0];
        const parent = first.parentNode;
        if (parent) {
            parent.insertBefore(document.createTextNode(`${newCount}x ${info.name}`), first);
        }
    }
}

function removeAutoGearItem(cell, item, remainingOverride) {
    if (!cell) return normalizeAutoGearQuantity(item.quantity);
    let remaining = typeof remainingOverride === 'number'
        ? remainingOverride
        : normalizeAutoGearQuantity(item.quantity);
    if (remaining <= 0) return remaining;
    const nodes = Array.from(cell.childNodes);
    if (!nodes.length) return remaining;
    const segments = [];
    let current = [];
    nodes.forEach(node => {
        if (node.nodeName === 'BR') {
            segments.push({ nodes: current, separator: node });
            current = [];
        } else {
            current.push(node);
        }
    });
    segments.push({ nodes: current, separator: null });
    let modified = false;
    segments.forEach(segment => {
        if (!segment.nodes.length || remaining <= 0) return;
        const info = analyzeAutoGearSegment(segment.nodes);
        if (!info || !info.name || !matchesAutoGearItem(item.name, info.name)) return;
        if (info.span) {
            const currentCount = info.count;
            if (currentCount > remaining) {
                updateSpanCountInPlace(info.span, currentCount - remaining);
                remaining = 0;
            } else {
                remaining -= currentCount;
                segment.nodes.forEach(node => node.remove());
            }
            modified = true;
        } else {
            if (info.count > remaining && info.count > 1) {
                updateRawSegmentCount(segment.nodes, info, info.count - remaining);
                remaining = 0;
                modified = true;
            } else {
                remaining -= info.count;
                segment.nodes.forEach(node => node.remove());
                modified = true;
            }
        }
    });
    if (modified) {
        cleanupAutoGearCell(cell);
    }
    return remaining;
}

function getAutoGearRuleDisplayLabel(rule) {
    if (!rule || typeof rule !== 'object') return '';
  const label = typeof rule.label === 'string' ? rule.label.trim() : '';
  if (label) return label;
  const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (scenarioList.length) return scenarioList.join(' + ');
  const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
  if (matteboxList.length) return matteboxList.join(' + ');
  const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
  if (cameraHandleList.length) return cameraHandleList.join(' + ');
  const viewfinderList = Array.isArray(rule.viewfinderExtension)
    ? rule.viewfinderExtension.filter(Boolean).map(getViewfinderFallbackLabel)
    : [];
  if (viewfinderList.length) return viewfinderList.join(' + ');
  const videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean) : [];
  if (videoDistributionList.length) return videoDistributionList.join(' + ');
  return '';
}

function formatAutoGearRuleTooltip(rule) {
    const langTexts = texts[currentLang] || texts.en || {};
    const unnamedTemplate = langTexts.autoGearRuleTooltipUnnamed
        || texts.en?.autoGearRuleTooltipUnnamed
        || 'Added by automatic gear rule';
    if (!rule || typeof rule !== 'object') return unnamedTemplate;
    const label = getAutoGearRuleDisplayLabel(rule);
    if (label) {
        const namedTemplate = langTexts.autoGearRuleTooltipNamed
            || texts.en?.autoGearRuleTooltipNamed
            || `${unnamedTemplate}: %s`;
        return namedTemplate.replace('%s', label);
    }
    return unnamedTemplate;
}

function addAutoGearItem(cell, item, rule) {
    if (!cell) return;
    const normalizedItem = normalizeAutoGearItem(item);
    if (!normalizedItem) return;
    const quantity = normalizeAutoGearQuantity(normalizedItem.quantity);
    if (quantity <= 0) return;
    const name = normalizedItem.name ? normalizedItem.name.trim() : '';
    if (!name) return;
    const spans = Array.from(cell.querySelectorAll('.gear-item'));
    for (const span of spans) {
        const spanName = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
        if (matchesAutoGearItem(name, spanName)) {
            const newCount = getSpanCount(span) + quantity;
            updateSpanCountInPlace(span, newCount);
            return;
        }
    }
    if (cell.childNodes.length) {
        cell.appendChild(document.createElement('br'));
    }
    const span = document.createElement('span');
    span.className = 'gear-item auto-gear-item';
    span.setAttribute('data-gear-name', name);
    if (rule && typeof rule === 'object') {
        if (rule.id) {
            span.dataset.autoGearRuleId = rule.id;
        }
        const ruleLabel = getAutoGearRuleDisplayLabel(rule);
        if (ruleLabel) {
            span.dataset.autoGearRuleLabel = ruleLabel;
        }
        const tooltip = formatAutoGearRuleTooltip(rule);
        if (tooltip) {
            span.title = tooltip;
        }
    }
    const displayName = typeof addArriKNumber === 'function' ? addArriKNumber(name) : name;
    span.textContent = `${quantity}x ${displayName}`;
    if (normalizedItem.screenSize) {
        span.appendChild(document.createTextNode(` - ${normalizedItem.screenSize}`));
    }
    const selectorType = normalizedItem.selectorType || 'none';
    const selectorDefault = normalizedItem.selectorDefault || '';
    if (selectorType && selectorType !== 'none') {
        const selectorLabel = getAutoGearSelectorLabel(selectorType);
        if (normalizedItem.selectorEnabled) {
            const options = getAutoGearSelectorOptions(selectorType);
            const shouldRenderSelector = options.length || selectorDefault;
            if (shouldRenderSelector) {
                const sanitizedRuleId = rule && rule.id ? rule.id.replace(/[^a-zA-Z0-9_-]/g, '') : 'rule';
                const selectId = `autoGearSelector_${sanitizedRuleId}_${normalizedItem.id}`;
                const select = document.createElement('select');
                select.id = selectId;
                select.className = 'auto-gear-selector';
                select.dataset.autoGearSelectorType = selectorType;
                select.setAttribute('aria-label', selectorLabel);
                let normalizedDefaultValue = '';
                options.forEach(optionName => {
                    const option = document.createElement('option');
                    option.value = optionName;
                    option.textContent = typeof addArriKNumber === 'function' ? addArriKNumber(optionName) : optionName;
                    if (!normalizedDefaultValue && selectorDefault && optionName.toLowerCase() === selectorDefault.toLowerCase()) {
                        normalizedDefaultValue = option.value;
                    }
                    select.appendChild(option);
                });
                if (selectorDefault && !normalizedDefaultValue) {
                    const fallbackOption = document.createElement('option');
                    fallbackOption.value = selectorDefault;
                    fallbackOption.textContent = typeof addArriKNumber === 'function'
                        ? addArriKNumber(selectorDefault)
                        : selectorDefault;
                    select.insertBefore(fallbackOption, select.firstChild);
                    normalizedDefaultValue = selectorDefault;
                }
                if (normalizedDefaultValue) {
                    select.value = normalizedDefaultValue;
                } else if (select.options.length) {
                    select.selectedIndex = 0;
                }
                span.appendChild(document.createTextNode(' - '));
                span.appendChild(select);
            } else if (selectorDefault) {
                const formattedDefault = typeof addArriKNumber === 'function' ? addArriKNumber(selectorDefault) : selectorDefault;
                span.appendChild(document.createTextNode(` - ${selectorLabel}: ${formattedDefault}`));
            } else if (selectorLabel) {
                span.appendChild(document.createTextNode(` - ${selectorLabel}`));
            }
        } else if (selectorDefault) {
            const formattedDefault = typeof addArriKNumber === 'function' ? addArriKNumber(selectorDefault) : selectorDefault;
            span.appendChild(document.createTextNode(` - ${selectorLabel}: ${formattedDefault}`));
        } else if (selectorLabel) {
            span.appendChild(document.createTextNode(` - ${selectorLabel}`));
        }
    }
    if (normalizedItem.notes) {
        const delimiter = normalizedItem.notes.trim().toLowerCase().startsWith('incl') ? ' ' : ' – ';
        span.appendChild(document.createTextNode(`${delimiter}${normalizedItem.notes}`));
    }
    cell.appendChild(span);
}

function ensureAutoGearCategory(table, category) {
    const rawCategory = category && category.trim() ? category.trim() : '';
    const label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
    const existing = Array.from(table.querySelectorAll('tbody.category-group')).find(body => {
        if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
            return body.dataset.autoCategory === rawCategory;
        }
        const headerCell = body.querySelector('.category-row td');
        return headerCell && headerCell.textContent.trim() === label;
    });
    if (existing) {
        const cell = existing.querySelector('tr:not(.category-row) td');
        return cell || null;
    }
    const body = document.createElement('tbody');
    body.className = 'category-group auto-gear-category';
    body.dataset.autoCategory = rawCategory;
    const headerRow = document.createElement('tr');
    headerRow.className = 'category-row';
    const headerCell = document.createElement('td');
    const labelText = rawCategory
        ? rawCategory
        : (texts[currentLang]?.autoGearCustomCategory || texts.en?.autoGearCustomCategory || 'Custom Additions');
    headerCell.textContent = labelText;
    headerRow.appendChild(headerCell);
    body.appendChild(headerRow);
    const itemsRow = document.createElement('tr');
    const itemsCell = document.createElement('td');
    itemsRow.appendChild(itemsCell);
    body.appendChild(itemsRow);
    table.appendChild(body);
    return itemsCell;
}

function findAutoGearCategoryCell(table, category) {
    if (!table) return null;
    const rawCategory = category && category.trim() ? category.trim() : '';
    const label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
    const bodies = Array.from(table.querySelectorAll('tbody.category-group'));
    for (const body of bodies) {
        if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
            if (body.dataset.autoCategory === rawCategory) {
                const cell = body.querySelector('tr:not(.category-row) td');
                if (cell) return cell;
            }
            continue;
        }
        const headerCell = body.querySelector('.category-row td');
        if (!headerCell) continue;
        const headerLabel = headerCell.textContent.trim();
        if (rawCategory) {
            if (headerLabel === rawCategory) {
                const cell = body.querySelector('tr:not(.category-row) td');
                if (cell) return cell;
            }
        } else if (body.classList.contains('auto-gear-category') || headerLabel === label) {
            const cell = body.querySelector('tr:not(.category-row) td');
            if (cell) return cell;
        }
    }
    return null;
}

function applyAutoGearRulesToTableHtml(tableHtml, info) {
    if (!tableHtml || !autoGearRules.length || typeof document === 'undefined') return tableHtml;
  const scenarios = info && info.requiredScenarios
      ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const selectedMattebox = info && typeof info.mattebox === 'string'
      ? info.mattebox.trim()
      : '';
  const normalizedMattebox = normalizeAutoGearTriggerValue(selectedMattebox);
  const cameraHandles = info && typeof info.cameraHandle === 'string'
      ? info.cameraHandle.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const normalizedCameraHandles = cameraHandles
      .map(normalizeAutoGearTriggerValue)
      .filter(Boolean);
  const cameraHandleSet = new Set(normalizedCameraHandles);
  const rawViewfinderExtension = info && typeof info.viewfinderExtension === 'string'
      ? info.viewfinderExtension.trim()
      : '';
  const hasViewfinderSelection = Boolean(rawViewfinderExtension);
  const normalizedViewfinderExtension = hasViewfinderSelection
      ? normalizeAutoGearTriggerValue(rawViewfinderExtension)
      : '__none__';
  const videoDistribution = info && typeof info.videoDistribution === 'string'
      ? info.videoDistribution.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const normalizedVideoDistribution = videoDistribution
      .map(normalizeAutoGearTriggerValue)
      .filter(Boolean);
  const videoDistributionSet = new Set(normalizedVideoDistribution);
  if (!scenarios.length) {
    const hasRuleWithoutScenario = autoGearRules.some(rule => {
      const scenarioList = Array.isArray(rule.scenarios)
          ? rule.scenarios.filter(Boolean)
          : [];
            return scenarioList.length === 0;
        });
        if (!hasRuleWithoutScenario) return tableHtml;
    }
    const touchesMatteboxCategory = (rule) => {
        if (!rule || typeof rule !== 'object') return false;
        const lists = [];
        if (Array.isArray(rule.add)) lists.push(rule.add);
        if (Array.isArray(rule.remove)) lists.push(rule.remove);
        return lists.some(entries => entries.some(entry => {
            if (!entry || typeof entry !== 'object') return false;
            const category = typeof entry.category === 'string' ? entry.category.trim().toLowerCase() : '';
            return category === 'matte box + filter';
        }));
    };

    let triggered = autoGearRules.filter(rule => {
        const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
        if (scenarioList.length && !scenarioList.every(s => scenarios.includes(s))) {
            return false;
        }
        const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
        if (matteboxList.length) {
            const normalizedTargets = matteboxList
                .map(normalizeAutoGearTriggerValue)
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedMattebox) return false;
            if (!normalizedTargets.includes(normalizedMattebox)) return false;
        }
        const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
        if (cameraHandleList.length) {
            const normalizedTargets = cameraHandleList
                .map(normalizeAutoGearTriggerValue)
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.every(target => cameraHandleSet.has(target))) return false;
        }
        const viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean) : [];
        if (viewfinderList.length) {
            const normalizedTargets = viewfinderList
                .map(value => (value === '__none__' ? '__none__' : normalizeAutoGearTriggerValue(value)))
                .filter(value => value || value === '__none__');
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.includes(normalizedViewfinderExtension)) return false;
        }
        const videoDistList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean) : [];
        if (videoDistList.length) {
            const normalizedTargets = videoDistList
                .map(normalizeAutoGearTriggerValue)
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.every(target => videoDistributionSet.has(target))) return false;
        }
        return true;
    });
    if (!triggered.length) return tableHtml;

    if (normalizedMattebox) {
        triggered = triggered.filter(rule => {
            if (!touchesMatteboxCategory(rule)) return true;
            const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
            if (!matteboxList.length) return false;
            const normalizedTargets = matteboxList
                .map(normalizeAutoGearTriggerValue)
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            return normalizedTargets.includes(normalizedMattebox);
        });
        if (!triggered.length) return tableHtml;
    }
    const container = document.createElement('div');
    container.innerHTML = tableHtml;
    const table = container.querySelector('.gear-table');
    if (!table) return tableHtml;
    triggered.forEach(rule => {
        rule.remove.forEach(item => {
            let remaining = normalizeAutoGearQuantity(item.quantity);
            if (remaining <= 0) return;
            const primaryCell = findAutoGearCategoryCell(table, item.category);
            if (primaryCell) {
                remaining = removeAutoGearItem(primaryCell, item, remaining);
            }
            if (remaining > 0) {
                const gearCells = Array.from(table.querySelectorAll('tbody.category-group tr:not(.category-row) td'));
                for (const cell of gearCells) {
                    if (cell === primaryCell) continue;
                    remaining = removeAutoGearItem(cell, item, remaining);
                    if (remaining <= 0) break;
                }
            }
        });
        rule.add.forEach(item => {
            const cell = ensureAutoGearCategory(table, item.category);
            if (cell) addAutoGearItem(cell, item, rule);
        });
    });
    return container.innerHTML;
}

function generateGearListHtml(info = {}) {
    const getText = sel => sel && sel.options && sel.selectedIndex >= 0
        ? sel.options[sel.selectedIndex].text.trim()
        : '';
    const selectedNames = {
        camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
        monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
        video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
        motors: motorSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        controllers: controllerSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
        cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
        battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
    };
    const hasMotor = selectedNames.motors.length > 0;
    const videoDistPrefs = info.videoDistribution
        ? info.videoDistribution.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const handheldPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
            return m ? { role: m[1], size: m[2] ? parseFloat(m[2]) : undefined } : null;
        })
        .filter(Boolean);
    const largeMonitorPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
            return m ? { role: m[1] } : null;
        })
        .filter(Boolean);
    if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
        selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
    } else {
        selectedNames.viewfinder = "";
    }
    const { cameraSupport: cameraSupportAcc, chargers: chargersAcc, fizCables: fizCableAcc, misc: miscAcc, monitoringSupport: monitoringSupportAcc, rigging: riggingAcc } = collectAccessories({ hasMotor, videoDistPrefs });
    for (let i = 0; i < 2; i++) riggingAcc.push('ULCS Bracket with 1/4" to 1/4"');
    for (let i = 0; i < 2; i++) riggingAcc.push('ULCS Bracket with 3/8" to 1/4"');
    for (let i = 0; i < 2; i++) riggingAcc.push('Noga Arm');
    for (let i = 0; i < 2; i++) riggingAcc.push('Mini Magic Arm');
    for (let i = 0; i < 4; i++) riggingAcc.push('Cine Quick Release');
    riggingAcc.push('SmallRig - Super lightweight 15mm RailBlock');
    for (let i = 0; i < 3; i++) riggingAcc.push('Spigot with male 3/8" and 1/4"');
    for (let i = 0; i < 2; i++) riggingAcc.push('Clapper Stick');
    for (let i = 0; i < 2; i++) riggingAcc.push('D-Tap Splitter');
    const cagesDb = devices.accessories?.cages || {};
    const compatibleCages = [];
    if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
        for (const [name, cage] of Object.entries(cagesDb)) {
            if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
                compatibleCages.push(name);
            }
        }
    }
    const supportAccNoCages = cameraSupportAcc.filter(item => !compatibleCages.includes(item));
    const scenarios = info.requiredScenarios
        ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const hasSeededScenarioRules = hasSeededAutoGearDefaults();
    const allowLegacyScenarioGear = autoGearRules.length === 0 && !hasSeededScenarioRules;
    const isScenarioActive = scenario => allowLegacyScenarioGear && scenarios.includes(scenario);
    const isAnyScenarioActive = list => allowLegacyScenarioGear && list.some(value => scenarios.includes(value));
    const hasGimbal = isScenarioActive('Gimbal');
    if (isAnyScenarioActive(['Trinity', 'Steadicam'])) {
        for (let i = 0; i < 2; i++) {
            riggingAcc.push('D-Tap Splitter');
            riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
        }
        for (let i = 0; i < 2; i++) {
            riggingAcc.push('D-Tap Extension 50 cm (Spare)');
        }
    }
    const handleSelections = info.cameraHandle
        ? info.cameraHandle.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const viewfinderExtSelections = info.viewfinderExtension
        ? info.viewfinderExtension.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const monitoringSettings = [
        ...(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(s => s.trim()) : []),
        ...(info.frameGuides ? info.frameGuides.split(',').map(s => s.trim()) : []),
        ...(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(s => s.trim()) : []),
        ...(info.monitoringSettings ? info.monitoringSettings.split(',').map(s => s.trim()) : []),
    ].filter(Boolean);
    const selectedLensNames = info.lenses
        ? info.lenses.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const maxLensFront = selectedLensNames.reduce((max, name) => {
        const lens = devices.lenses && devices.lenses[name];
        return Math.max(max, lens && lens.frontDiameterMm || 0);
    }, 0);
    const parsedFilters = parseFilterTokens(info.filter);
    const filterTypes = parsedFilters.map(f => f.type);
    const needsSwingAway = filterTypes.some(t => t === 'ND Grad HE' || t === 'ND Grad SE');
    const filterEntries = buildFilterGearEntries(parsedFilters);
    let filterSelections = collectFilterAccessories(parsedFilters);
    if (filterEntries.length && filterSelections.length) {
        const filterNames = new Set(
            filterEntries.map(entry => normalizeGearNameForComparison(entry.gearName))
        );
        filterSelections = filterSelections.filter(item =>
            !filterNames.has(normalizeGearNameForComparison(item))
        );
    }
    const filterSelectHtml = buildFilterSelectHtml(parsedFilters, filterEntries);
    if (info.mattebox && !needsSwingAway) {
        const matteboxSelection = info.mattebox.toLowerCase();
        if (matteboxSelection.includes('clamp')) {
            const lensNames = info.lenses
                ? info.lenses.split(',').map(s => s.trim()).filter(Boolean)
                : [];
            const diameters = [...new Set(lensNames
                .map(n => devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm)
                .filter(Boolean))];
            diameters.forEach(d => filterSelections.push(`ARRI LMB 4x5 Clamp Adapter ${d}mm`));
        }
    }
    viewfinderExtSelections.forEach(vf => supportAccNoCages.push(vf));
    if (isAnyScenarioActive(['Rain Machine', 'Extreme rain'])) {
        filterSelections.push('Schulz Sprayoff Micro');
        filterSelections.push('Fischer RS to D-Tap cable 0,5m');
        filterSelections.push('Fischer RS to D-Tap cable 0,5m');
        filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
    }
    let gimbalSelectionsFinal = [];
    let selectedGimbal = '';
    if (hasGimbal) {
        const gimbalSelections = info.gimbal
            ? info.gimbal.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        const bigLens = maxLensFront > 95;
        if (gimbalSelections.length) {
            gimbalSelectionsFinal = gimbalSelections.map(g => (/Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g));
            if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
        } else {
            const cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
            const weight = cam && cam.weight_g;
            const isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
            selectedGimbal = bigLens ? 'DJI Ronin 2' : (isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2');
            gimbalSelectionsFinal = [selectedGimbal];
        }
        if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
            filterSelections.push('Tilta Mirage VND Kit');
            filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
            filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
            filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
        } else {
            filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
        }
    }
    const receiverLabels = [];
    handheldPrefs.forEach(p => receiverLabels.push(`${p.role} handheld`));
    largeMonitorPrefs.forEach(p => receiverLabels.push(`${p.role} 15-21"`));
    if (hasMotor) receiverLabels.push('Focus');
    const receiverCount = receiverLabels.length;
    if (selectedNames.video) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            const receivers = receiverCount || 1;
            for (let i = 0; i < receivers; i++) {
                monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
            }
        }
    }
    const addMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`
        );
    };
    handheldPrefs.forEach(p => addMonitorCables(`${p.role} handheld`));
    const addLargeMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`
        );
    };
    largeMonitorPrefs.forEach(p => addLargeMonitorCables(`${p.role} 15-21"`));
    if (hasMotor) {
        monitoringSupportAcc.push(
            'D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)',
            'D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)',
            'Ultraslim BNC Cable 0.3 m (Focus)',
            'Ultraslim BNC Cable 0.3 m (Focus)'
        );
    }
    const handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
    const addHandle = () => {
        if (!supportAccNoCages.includes(handleName)) {
            supportAccNoCages.push(handleName);
        }
    };
    if (isScenarioActive('Handheld') && isScenarioActive('Easyrig')) {
        addHandle();
    }
    if (handleSelections.includes('Hand Grips')) {
        addHandle();
    }
    if (handleSelections.includes('Handle Extension')) {
        supportAccNoCages.push('ARRI K2.0019797 HEX-3');
    }
    if (handleSelections.includes('L-Handle')) {
        supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
    }
    const projectInfo = { ...info };
    const crewRoleLabels = texts[currentLang]?.crewRoles || texts.en?.crewRoles || {};
    if (Array.isArray(info.people)) {
        const crewEntries = info.people
            .filter(p => p.role && p.name)
            .map(p => {
                const details = [p.phone, p.email].filter(Boolean).join(', ');
                const roleLabel = crewRoleLabels[p.role] || p.role;
                return details ? `${roleLabel}: ${p.name} (${details})` : `${roleLabel}: ${p.name}`;
            });
        if (crewEntries.length) {
            projectInfo.crew = crewEntries.join('\n');
        }
    }
    delete projectInfo.people;
    if (Array.isArray(info.prepDays)) {
        projectInfo.prepDays = info.prepDays.join('\n');
    }
    if (Array.isArray(info.shootingDays)) {
        projectInfo.shootingDays = info.shootingDays.join('\n');
    }
    if (monitoringSettings.length) {
        projectInfo.monitoringSupport = monitoringSettings.join(', ');
    }
    delete projectInfo.monitoringSettings;
    delete projectInfo.viewfinderSettings;
    delete projectInfo.frameGuides;
    delete projectInfo.aspectMaskOpacity;
    const projectTitleSource = getCurrentProjectName() || info.projectName || '';
    const projectTitle = escapeHtml(projectTitleSource);
    const projectLabels = texts[currentLang]?.projectFields || texts.en?.projectFields || {};
    const projectFormTexts = texts[currentLang]?.projectForm || texts.en?.projectForm || {};
    const excludedFields = new Set([
        'cameraHandle',
        'viewfinderExtension',
        'mattebox',
        'videoDistribution',
        'monitoringConfiguration',
        'focusMonitor',
        'tripodHeadBrand',
        'tripodBowl',
        'tripodTypes',
        'tripodSpreader',
        'sliderBowl',
        'easyrig',
        'lenses',
        'viewfinderSettings',
        'frameGuides',
        'aspectMaskOpacity',
        'filter',
        'viewfinderEyeLeatherColor',
        'directorMonitor',
        'dopMonitor',
        'gafferMonitor',
        'directorMonitor15',
        'comboMonitor15',
        'dopMonitor15',
        'proGaffColor1',
        'proGaffWidth1',
        'proGaffColor2',
        'proGaffWidth2'
    ]);
    const infoEntries = Object.entries(projectInfo)
        .filter(([k, v]) => v && k !== 'projectName' && !excludedFields.has(k));
    const boxesHtml = infoEntries.length ? '<div class="requirements-grid">' +
        infoEntries.map(([k, v]) => {
            const value = escapeHtml(v).replace(/\n/g, '<br>');
            const label = projectLabels[k] || k;
            const iconHtml = iconMarkup(projectFieldIcons[k], {
                className: 'req-icon',
                size: 'var(--req-icon-size)'
            });
            return `<div class="requirement-box" data-field="${k}">${iconHtml}<span class="req-label">${escapeHtml(label)}</span><span class="req-value">${value}</span></div>`;
        }).join('') + '</div>' : '';
    const requirementsHeading = projectFormTexts.heading || 'Project Requirements';
    const infoHtml = infoEntries.length ? `<h3>${escapeHtml(requirementsHeading)}</h3>${boxesHtml}` : '';
    const formatItems = arr => {
        const counts = {};
        arr.filter(Boolean).map(addArriKNumber).forEach(item => {
            const match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : item.trim();
            const ctx = match && match[2] ? match[2].trim() : '';
            if (!counts[base]) {
                counts[base] = { total: 0, ctxCounts: {} };
            }
            counts[base].total++;
            counts[base].ctxCounts[ctx] = (counts[base].ctxCounts[ctx] || 0) + 1;
        });
        return Object.entries(counts)
            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
            .map(([base, { total, ctxCounts }]) => {
                const ctxKeys = Object.keys(ctxCounts);
                const hasContext = ctxKeys.some(c => c);
                let ctxParts = [];
                if (hasContext) {
                    if (base === 'sand bag') {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else if (base.startsWith('Bebob ')) {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        const spareCount = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() === 'spare')
                            .reduce((sum, [, count]) => sum + count, 0);
                        if (spareCount > 0) {
                            ctxParts.push(`${spareCount}x Spare`);
                        } else if (base === 'D-Tap Extension 50 cm') {
                            const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                            const remaining = total - usedCount;
                            if (remaining > 0) ctxParts.push(`${remaining}x Spare`);
                        }
                    }
                }
                const ctxStr = ctxParts.length ? ` (${ctxParts.join(', ')})` : '';
                const translatedBase = gearItemTranslations[currentLang]?.[base] || base;
                const displayName = `${translatedBase}${ctxStr}`;
                const dataName = `${base}${ctxStr}`;
                return `<span class="gear-item" data-gear-name="${escapeHtml(dataName)}">${total}x ${escapeHtml(displayName)}</span>`;
            })
            .join('<br>');
    };
    const ensureItems = (arr, categoryPath) => {
        if (typeof registerDevice !== 'function') return;
        const entries = {};
        arr.filter(Boolean).forEach(item => {
            const match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : item.trim();
            entries[base] = entries[base] || {};
        });
        if (Object.keys(entries).length) {
            registerDevice(categoryPath, entries);
        }
    };
    const categoryGroups = [];
    const addRow = (cat, items) => {
        categoryGroups.push(
            `<tbody class="category-group"><tr class="category-row"><td>${cat}</td></tr><tr><td>${items}</td></tr></tbody>`
        );
    };
    addRow('Camera', formatItems([selectedNames.camera]));
    const cameraSupportText = formatItems(supportAccNoCages);
    let cageSelectHtml = '';
    if (compatibleCages.length) {
        const options = compatibleCages.map(c => `<option value="${escapeHtml(c)}"${c === selectedNames.cage ? ' selected' : ''}>${escapeHtml(addArriKNumber(c))}</option>`).join('');
        cageSelectHtml = `<span class="cage-select-wrapper"><span>1x</span><select id="gearListCage">${options}</select></span>`;
    }
    addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
    let mediaItems = '';
    const cam = devices && devices.cameras && selectedNames.camera ? devices.cameras[selectedNames.camera] : null;
    if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
        const sizeMap = {
            'CFexpress Type A': '320GB',
            'CFast 2.0': '512GB',
            'CFexpress Type B': '512GB',
            'Codex Compact Drive': '1TB',
            'AXS Memory A-Series slot': '1TB',
            'SD': '128GB',
            'SD Card': '128GB',
            'SDXC': '128GB',
            'XQD Card': '120GB',
            'RED MINI-MAG': '512GB',
            'REDMAG 1.8" SSD': '512GB',
            'Blackmagic Media Module': '8TB',
            'DJI PROSSD': '1TB',
            'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
            'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
            'USB-C to external SSD/HDD': '1TB'
        };
        mediaItems = cam.recordingMedia
            .slice(0, 1)
            .map(m => {
                const type = m && m.type ? m.type : '';
                if (!type) return '';
                let size = '';
                if (m.notes) {
                    const match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
                    if (match) size = match[1].toUpperCase();
                }
                if (!size) size = sizeMap[type] || '512GB';
                return `4x ${escapeHtml(size)} ${escapeHtml(type)}<br>2x ${escapeHtml(type)} reader with USB-C`;
            })
            .filter(Boolean)
            .join('<br>');
    }
    addRow('Media', mediaItems);
    const lensDisplayNames = selectedLensNames.map(name => {
        const lens = devices.lenses && devices.lenses[name];
        const base = addArriKNumber(name);
        if (!lens) return base;
        const attrs = [];
        if (lens.weight_g) attrs.push(`${lens.weight_g}g`);
        if (lens.clampOn) {
            if (lens.frontDiameterMm) attrs.push(`${lens.frontDiameterMm}mm clamp-on`);
            else attrs.push('clamp-on');
        } else if (lens.clampOn === false) {
            attrs.push('no clamp-on');
        }
        const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
        if (minFocus) attrs.push(`${minFocus}m min focus`);
        return attrs.length ? `${base} (${attrs.join(', ')})` : base;
    });
    addRow('Lens', formatItems(lensDisplayNames));
    const lensSupportItems = [];
    const requiredRodTypes = new Set();
    const addedRodPairs = new Set();
    selectedLensNames.forEach(name => {
        const lens = devices.lenses && devices.lenses[name];
        if (!lens) return;
        const rodType = lens.rodStandard || '15mm';
        const rodLength = lens.rodLengthCm || (rodType === '19mm' ? 45 : 30);
        const rodKey = `${rodType}-${rodLength}`;
        if (!addedRodPairs.has(rodKey)) {
            lensSupportItems.push(`${rodType} rods ${rodLength}cm`);
            addedRodPairs.add(rodKey);
        }
        requiredRodTypes.add(rodType);
        if (lens.needsLensSupport) {
            lensSupportItems.push(`${rodType} lens support`);
        }
    });
    const cageRod = devices.accessories?.cages?.[selectedNames.cage]?.rodStandard;
    const cageRodTypes = cageRod ? (Array.isArray(cageRod) ? cageRod : [cageRod]) : [];
    requiredRodTypes.forEach(rt => {
        if (cageRodTypes.length && !cageRodTypes.includes(rt)) {
            lensSupportItems.push(`${glyphText(ICON_GLYPHS.warning)}\u00A0cage incompatible with ${rt} rods`);
        }
    });
    addRow('Lens Support', formatItems(lensSupportItems));
    addRow('Matte box + filter', [filterSelectHtml, formatItems(filterSelections)].filter(Boolean).join('<br>'));
    const motorItems = [];
    const clmSpareAdded = { clm3: false, clm4: false, clm5: false };
    selectedNames.motors.forEach(name => {
        const lower = name.toLowerCase();
        if (/cforce\s*mini\s*rf|cforce\s*rf/.test(lower)) {
            motorItems.push('ARRI KK.0040345 CFORCE MINI RF Basic Set 2');
        } else if (/cforce\s*mini/.test(lower) && !/rf/.test(lower)) {
            motorItems.push('ARRI KK.0040344 Cforce Mini Basic Set 2');
        } else if (/cforce\s*plus/.test(lower)) {
            motorItems.push('Arri KK.0008824 cforce plus Basic Set');
            motorItems.push('ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
        } else if (/clm-3/.test(lower)) {
            motorItems.push('Arri KK.0005854 Controlled Lens Motor CLM-3 Basic Set');
            if (!clmSpareAdded.clm3) {
                motorItems.push('Arri K2.65145.0, Cable CLM-3 (7p) - CLM/FIZ (12p) (0,8m/2.6ft) (spare)');
                clmSpareAdded.clm3 = true;
            }
        } else if (/clm-4/.test(lower)) {
            motorItems.push('ARRI Controlled Lens Motor CLM-4, Basic Kit (KK.0005855)');
            if (!clmSpareAdded.clm4) {
                motorItems.push('Arri K2.72099.0 CLM-4 Motor Cable (spare)');
                clmSpareAdded.clm4 = true;
            }
        } else if (/clm-5/.test(lower)) {
            motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set');
            if (!clmSpareAdded.clm5) {
                motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set (spare)');
                clmSpareAdded.clm5 = true;
            }
        } else {
            motorItems.push(name);
        }
    });
    const distanceItems = [];
    const distanceName = selectedNames.distance;
    if (distanceName) {
        const lowerName = distanceName.toLowerCase();
        if (lowerName === 'udm-1 + lcube') {
            distanceItems.push('Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
            const hasRiaController = selectedNames.controllers
                .some(ctrl => /ria-1/i.test(ctrl));
            const isAlexa35 = /alexa 35/i.test(selectedNames.camera || '');
            if (!hasRiaController && !isAlexa35) {
                distanceItems.push('Arri KK.0009001 LCUBE CUB-1 Basic Set');
            }
        } else {
            distanceItems.push(distanceName);
        }
    }
    addRow('LDS (FIZ)', formatItems([
        ...motorItems,
        ...selectedNames.controllers,
        ...distanceItems,
        ...fizCableAcc
    ]));
    let batteryItems = '';
    if (selectedNames.battery) {
        let count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
        if (!count || isNaN(count)) count = 1;
        const safeBatt = escapeHtml(addArriKNumber(selectedNames.battery));
        batteryItems = `${count}x ${safeBatt}`;
        const swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
        if (swapName) {
            batteryItems += `<br>1x ${escapeHtml(swapName)}`;
        }
    }
    addRow('Camera Batteries', batteryItems);
    let monitoringItems = '';
    const monitorSizes = [];
    if (selectedNames.viewfinder) {
        monitoringItems += `1x <strong>Viewfinder</strong> - ${escapeHtml(addArriKNumber(selectedNames.viewfinder))}`;
    }
    if (selectedNames.monitor) {
        const size = devices?.monitors?.[selectedNames.monitor]?.screenSizeInches;
        if (size) monitorSizes.push(size);
        const sizeHtml = size ? `${size}&quot; - ` : '';
        monitoringItems += (monitoringItems ? '<br>' : '') + `1x <strong>Onboard Monitor</strong> - ${sizeHtml}${escapeHtml(addArriKNumber(selectedNames.monitor))} - incl. Sunhood`;
    }
    handheldPrefs.forEach(({ role, size }) => {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const infoKey = role === 'DoP' ? 'dopMonitor' : `${role.toLowerCase()}Monitor`;
        let defaultName = info[infoKey] && names.includes(info[infoKey])
            ? info[infoKey]
            : names.includes('SmallHD Ultra 7') ? 'SmallHD Ultra 7' : names[0];
        if (!info[infoKey] && size) {
            const sized = names.find(n => monitorsDb[n].screenSizeInches === size);
            if (size === 7 && names.includes('SmallHD Ultra 7')) {
                defaultName = 'SmallHD Ultra 7';
            } else if (sized) {
                defaultName = sized;
            }
        }
        const opts = names
            .map(n => `<option value="${escapeHtml(n)}"${n === defaultName ? ' selected' : ''}>${escapeHtml(addArriKNumber(n))}</option>`)
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const labelRole = role.replace(/s$/, '');
        const selectedSize = devices && devices.monitors && devices.monitors[defaultName]
            ? devices.monitors[defaultName].screenSizeInches
            : '';
        monitoringItems += (monitoringItems ? '<br>' : '') + `1x <strong>${labelRole} Handheld Monitor</strong> - <span id="monitorSize${idSuffix}">${selectedSize}&quot;</span> - <select id="gearList${idSuffix}Monitor">${opts}</select> incl. Directors cage, shoulder strap, sunhood, rigging for teradeks`;
        monitorSizes.push(selectedSize);
    });
    largeMonitorPrefs.forEach(({ role }) => {
        const dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
        const names = Object.keys(dirDb).filter(n => n !== 'None').sort(localeSort);
        const infoKey = role === 'DoP' ? 'dopMonitor15' : role === 'Combo' ? 'comboMonitor15' : 'directorMonitor15';
        let defaultName = info[infoKey] && names.includes(info[infoKey])
            ? info[infoKey]
            : 'SmallHD Cine 24" 4K High-Bright Monitor';
        const opts = names
            .map(n => `<option value="${escapeHtml(n)}"${n === defaultName ? ' selected' : ''}>${escapeHtml(addArriKNumber(n))}</option>`)
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const size = dirDb[defaultName]?.screenSizeInches || '';
        monitoringItems += (monitoringItems ? '<br>' : '') +
            `1x <strong>${role} Monitor</strong> - <span id="monitorSize${idSuffix}15">${size}&quot;</span> - <select id="gearList${idSuffix}Monitor15">${opts}</select> incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)`;
        if (size) monitorSizes.push(size);
    });
    if (hasMotor) {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const defaultName = info.focusMonitor && names.includes(info.focusMonitor)
            ? info.focusMonitor
            : names.includes('TV Logic F7HS') ? 'TV Logic F7HS' : names[0];
        const opts = names
            .map(n => `<option value="${escapeHtml(n)}"${n === defaultName ? ' selected' : ''}>${escapeHtml(addArriKNumber(n))}</option>`)
            .join('');
        const selectedSize = monitorsDb[defaultName]?.screenSizeInches || '';
        monitoringItems += (monitoringItems ? '<br>' : '') +
            `1x <strong>Focus Monitor</strong> - <span id="monitorSizeFocus">${selectedSize}&quot;</span> - <select id="gearListFocusMonitor">${opts}</select> incl Directors cage, shoulder strap, sunhood, rigging for teradeks`;
        if (selectedSize) monitorSizes.push(selectedSize);
    }
    const monitoringGear = [];
    const wirelessSize = monitorSizes.includes(5) ? 5 : 7;
    if (selectedNames.video) {
        monitoringGear.push(`Wireless Transmitter - ${wirelessSize}&quot; - ${addArriKNumber(selectedNames.video)}`);
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            receiverLabels.forEach(label => {
                monitoringGear.push(`Wireless Receiver - ${wirelessSize}&quot; - ${addArriKNumber(rxName)} (${label})`);
            });
        }
    }
    if (monitoringGear.length) {
        const gearHtml = formatItems(monitoringGear)
            .replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>')
            .replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>')
            .replace(/&amp;quot;/g, '&quot;');
        monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
    }
    let monitoringBatteryItems = [];
    const bebob98 = Object.keys(devices.batteries || {}).find(n => /V98micro/i.test(n)) || 'Bebob V98micro';
    handheldPrefs.forEach(p => {
        for (let i = 0; i < 3; i++) monitoringBatteryItems.push(`${bebob98} (${p.role} handheld)`);
    });
    if (hasMotor) {
        const bebob150 = Object.keys(devices.batteries || {}).find(n => /V150micro/i.test(n)) || 'Bebob V150micro';
        for (let i = 0; i < 3; i++) monitoringBatteryItems.push(`${bebob150} (Focus)`);
    }
    const bebob290 = Object.keys(devices.batteries || {}).find(n => /V290RM-Cine/i.test(n)) || 'Bebob V290RM-Cine';
    largeMonitorPrefs.forEach(p => {
        monitoringBatteryItems.push(`${bebob290} (${p.role} 15-21")`, `${bebob290} (${p.role} 15-21")`);
    });
    addRow('Monitoring Batteries', formatItems(monitoringBatteryItems));
    addRow('Chargers', formatItems(chargersAcc));
    addRow('Monitoring', monitoringItems);
    ensureItems(monitoringSupportAcc, 'accessories.monitoringSupport');
    const monitoringSupportHardware = formatItems(monitoringSupportAcc);
    const monitoringSupportItems = monitoringSupportHardware;
    addRow('Monitoring support', monitoringSupportItems);
    const cartsTransportationItems = [
        'Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung',
        ...Array(10).fill('Securing Straps (25mm wide)'),
        'Loading Ramp (pair, 420kg)',
        ...Array(20).fill('Ring Fitting for Airline Rails')
    ];
    ensureItems(cartsTransportationItems, 'accessories.carts');
    const gripItems = [];
    let needsStandardTripod = false;
    let sliderSelectHtml = '';
    let easyrigSelectHtml = '';
    handheldPrefs.forEach(p => {
        gripItems.push(`Avenger C-Stand Sliding Leg 20" (${p.role} handheld)`);
        gripItems.push(`Steelfingers Wheel C-Stand 3er Set (${p.role} handheld)`);
        gripItems.push(`Lite-Tite Swivel Aluminium Umbrella Adapter (${p.role} handheld)`);
        riggingAcc.push(`Spigot with male 3/8" and 1/4" (${p.role} handheld)`);
    });
    largeMonitorPrefs.forEach(p => {
        gripItems.push(`Matthews Monitor Stand II (249562) (${p.role} 15-21")`);
        gripItems.push(`Avenger C590 Conka Bonka Stativ-Verlängerungen Set (${p.role} 15-21")`);
        gripItems.push(`Impact Baby to Junior Receiver Adapter (${p.role} 15-21")`);
        gripItems.push(`Matthews BIG F'ING Monitor Wheel Set (3 pieces) (${p.role} 15-21")`);
        riggingAcc.push(`ULCS Bracket with 1/4" to 1/4" (${p.role} 15-21")`);
        gripItems.push(`Manfrotto 635 Quick-Action Super Clamp (${p.role} 15-21")`);
        riggingAcc.push(`Spigot with male 3/8" and 1/4" (${p.role} 15-21")`);
        riggingAcc.push(`Cine Quick Release (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
    });
    if (hasMotor) {
        gripItems.push('Avenger C-Stand Sliding Leg 20" (Focus)');
        gripItems.push('Steelfingers Wheel C-Stand 3er Set (Focus)');
        gripItems.push('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)');
    }
    if (isScenarioActive('Easyrig')) {
        const stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
        const opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
        const options = ['no further stabilisation', ...opts];
        const optsHtml = options.map(o => `<option value="${escapeHtml(o)}">${escapeHtml(addArriKNumber(o))}</option>`).join('');
        easyrigSelectHtml = `1x Easyrig 5 Vario <select id="gearListEasyrig">${optsHtml}</select>`;
    }
    if (hasGimbal) {
        gripItems.push(...gimbalSelectionsFinal);
    }
    const frictionArmCount = hasGimbal ? 2 : 1;
    gripItems.push(...Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm'));
    if (hasGimbal) {
        gripItems.push('Avenger D200B Grip Head');
        gripItems.push('Spigot with male 3/8" and 1/4"');
    }
    if (isScenarioActive('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
    if (isScenarioActive('Steadybag')) gripItems.push('Steadybag');
    if (isScenarioActive('Jib')) {
        gripItems.push('Pro Sup EJIb-Arm');
        gripItems.push('Jib counter weights');
        needsStandardTripod = true;
    }
    if (isScenarioActive('Slider')) {
        const options = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(o => `<option value="${escapeHtml(o)}"${o === info.sliderBowl ? ' selected' : ''}>${escapeHtml(addArriKNumber(o))}</option>`).join('');
        sliderSelectHtml = `1x Prosup Tango Roller <select id="gearListSliderBowl">${options}</select>`;
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Paganini set');
        gripItems.push('Sand bag (Slider)');
        gripItems.push('Sand bag (Slider)');
        gripItems.push('Cable mat');
        gripItems.push('Cable mat');
        gripItems.push('Cable mat');
    }
    if (isScenarioActive('Slider') && isScenarioActive('Undersling mode')) {
        gripItems.push('Tango Beam');
    }
    if (isScenarioActive('Outdoor')) {
        riggingAcc.push('Spigot with male 3/8" and 1/4" (Focus Umbrella)');
    }
    if (isAnyScenarioActive(['Extreme heat', 'Extreme rain', 'Rain Machine'])) {
        gripItems.push('Large Umbrella');
        gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    }
    const tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const bowlType = info.tripodBowl;
    const spreader = info.tripodSpreader;
    const headBrand = info.tripodHeadBrand;
    const headMap = {
        'OConnor': {
            '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
            '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
            'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
        },
        'Sachtler': {
            '75mm bowl': 'Sachtler aktiv8T S2068T',
            '100mm bowl': 'Sachtler aktiv18T S2088T',
            '150mm bowl': 'Sachtler Cine 30 3007'
        }
    };
    const headName = headMap[headBrand] && headMap[headBrand][bowlType];
    if (headName) {
        gripItems.push(`${headName} ${bowlType}`);
    }
    tripodTypes.forEach(t => {
        const base = bowlType ? `${bowlType} ${t}` : t;
        if (t === 'Hi-Head') {
            gripItems.push(base);
        } else if (spreader) {
            gripItems.push(`${base} + ${spreader}`);
        } else {
            gripItems.push(base);
        }
        if (t === 'Frog Tripod') {
            gripItems.push('Sand bag (Frog Tripod)');
        }
        if (t === 'Hi-Head') {
            gripItems.push('Sand bag (Hi-Head)');
        }
    });
    if (needsStandardTripod && !gripItems.some(item => /Standard Tripod/.test(item))) {
        gripItems.push('Standard Tripod');
    }
    const standCount = gripItems.filter(item => /\bstand\b/i.test(item) && !/wheel/i.test(item)).length;
    if (standCount) {
        gripItems.push(...Array(standCount * 3).fill('Tennis ball'));
    }
    const maglinerCount = cartsTransportationItems.filter(item => /Magliner/i.test(item)).length;
    if (maglinerCount) {
        gripItems.push(...Array(maglinerCount * 2).fill('Wooden wedge'));
    }
    ensureItems(riggingAcc, 'accessories.rigging');
    ensureItems(gripItems, 'accessories.grip');
    const riggingItems = formatItems(riggingAcc);
    addRow('Rigging', riggingItems);
    const powerItems = [
        'Power Cable Drum 25-50 m',
        ...Array(2).fill('Power Cable 10 m'),
        ...Array(2).fill('Power Cable 5 m'),
        ...Array(3).fill('Power Strip'),
        ...Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)'),
        ...Array(3).fill('Power Three Way Splitter')
    ];
    if (isScenarioActive('Studio')) {
        powerItems.push('Camera Power Supply');
    }
    ensureItems(powerItems, 'accessories.power');
    addRow('Power', formatItems(powerItems));
    addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
    addRow('Carts and Transportation', formatItems(cartsTransportationItems));
    const miscExcluded = new Set([
        'D-Tap to LEMO 2-pin',
        'HDMI Cable',
        'BNC SDI Cable',
        'Ultraslim BNC Cable 0.5 m'
    ]);
    const miscItems = [...miscAcc].filter(item => !miscExcluded.has(item));
    const consumables = [];
    const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
    let eyeLeatherColor = info.viewfinderEyeLeatherColor || 'red';
    const gaffTapeSelections = [
        { id: 1, color: info.proGaffColor1 || 'red', width: info.proGaffWidth1 || '24mm' },
        { id: 2, color: info.proGaffColor2 || 'blue', width: info.proGaffWidth2 || '24mm' }
    ];
    const baseConsumables = [
        { name: 'Kimtech Wipes', count: 1 },
        { name: 'Sprigs Red 1/4"', count: 1, noScale: true },
        { name: 'Clapper Stick', count: 2, klappen: true }
    ];
    let eyeLeatherCount = hasViewfinder ? 2 : 0;
    let shootDays = 0;
    let isWinterShoot = false;
    const shootRanges = Array.isArray(info.shootingDays)
        ? info.shootingDays
        : (info.shootingDays ? [info.shootingDays] : []);
    const winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
    shootRanges.forEach(r => {
        const parts = r.split(' to ');
        if (parts.length === 2) {
            const start = new Date(parts[0]);
            const end = new Date(parts[1]);
            if (!isNaN(start) && !isNaN(end)) {
                shootDays += Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                if (!isWinterShoot) {
                    const m = new Date(start);
                    m.setHours(0, 0, 0, 0);
                    while (m <= end) {
                        if (winterMonths.has(m.getMonth())) {
                            isWinterShoot = true;
                            break;
                        }
                        m.setMonth(m.getMonth() + 1);
                    }
                }
            }
        }
    });
    let multiplier = 1;
    if (shootDays > 21) {
        multiplier = 4;
    } else if (shootDays > 14) {
        multiplier = 3;
    } else if (shootDays > 7) {
        multiplier = 2;
    }
    const klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
    for (const item of baseConsumables) {
        let count = item.count;
        if (item.noScale) {
            // no scaling
        } else if (item.klappen) {
            count *= klappenMultiplier;
        } else {
            count *= multiplier;
        }
        for (let i = 0; i < count; i++) consumables.push(item.name);
    }
    if (eyeLeatherCount) eyeLeatherCount *= multiplier;
    const needsRainProtection = isAnyScenarioActive(['Outdoor', 'Extreme rain', 'Rain Machine']);
    if (needsRainProtection && selectedNames.camera) {
        miscItems.push(`Rain Cover ${addArriKNumber(selectedNames.camera)}`);
    }
    const needsUmbrellas = needsRainProtection || isScenarioActive('Extreme heat');
    if (needsUmbrellas) {
        if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
        if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
    }
    if (needsRainProtection) {
        const monitorSizes = [];
        if (monitorSelect && monitorSelect.value) {
            const m = devices.monitors[monitorSelect.value];
            if (m && m.screenSizeInches) monitorSizes.push(m.screenSizeInches);
        }
        const monitorsAbove10 = monitorSizes.filter(s => s > 10).length;
        const monitorsUnder10 = monitorSizes.filter(s => s <= 10).length;
        for (let i = 0; i < monitorsAbove10 + 2; i++) consumables.push('CapIt Large');
        for (let i = 0; i < monitorsUnder10 + 3; i++) consumables.push('CapIt Medium');
        for (let i = 0; i < 3; i++) consumables.push('CapIt Small');
        for (let i = 0; i < 10; i++) consumables.push('Duschhaube');
        consumables.push('Magliner Rain Cover Transparent');
    }
    const needsHairDryer =
        (isWinterShoot && isScenarioActive('Outdoor')) ||
        isScenarioActive('Extreme cold (snow)');
    const needsHandAndFeetWarmers = isScenarioActive('Extreme cold (snow)');
    if (needsHairDryer) {
        miscItems.push('Hair Dryer');
        if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
            miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
        } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
            miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
        }
    }
    if (needsHandAndFeetWarmers) {
        const warmersCount = Math.max(shootDays, 1) * 2;
        for (let i = 0; i < warmersCount; i++) miscItems.push('Hand Warmers');
        for (let i = 0; i < warmersCount; i++) miscItems.push('Feet Warmers');
    }
    const gaffColors = [
        ['red', 'Red'],
        ['blue', 'Blue'],
        ['green', 'Green'],
        ['yellow', 'Yellow'],
        ['black', 'Black'],
        ['pink', 'Pink'],
        ['orange', 'Orange'],
        ['violette', 'Violette'],
        ['white', 'White']
    ];
    const gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
    const proGaffCount = multiplier;
    const proGaffHtml = gaffTapeSelections.map(({ id, color, width }) => {
        const colorOpts = gaffColors
            .map(([val, label]) => `<option value="${val}"${val === color ? ' selected' : ''}>${label}</option>`)
            .join('');
        const widthOpts = gaffWidths
            .map(val => `<option value="${val}"${val === width ? ' selected' : ''}>${val}</option>`)
            .join('');
        return `<span class="gear-item" data-gear-name="Pro Gaff Tape">${proGaffCount}x Pro Gaff Tape <select id="gearListProGaffColor${id}">${colorOpts}</select> <select id="gearListProGaffWidth${id}">${widthOpts}</select></span>`;
    }).join('<br>');
    let eyeLeatherHtml = '';
    if (eyeLeatherCount) {
        const colors = [
            ['red', 'Red'],
            ['blue', 'Blue'],
            ['natural', 'Natural'],
            ['green', 'Green'],
            ['purple', 'Purple'],
            ['orange', 'Orange'],
            ['gray', 'Gray'],
            ['yellow', 'Yellow'],
            ['jaguar', 'Jaguar'],
            ['killer bee', 'Killer Bee'],
            ['green rabbit', 'Green Rabbit'],
            ['black', 'Black']
        ];
        const options = colors.map(([val, label]) => `<option value="${val}"${val === eyeLeatherColor ? ' selected' : ''}>${label}</option>`).join('');
        eyeLeatherHtml = `<span class="gear-item" data-gear-name="Bluestar eye leather made of microfiber oval, large">${eyeLeatherCount}x Bluestar eye leather made of microfiber oval, large <select id="gearListEyeLeatherColor">${options}</select></span>`;
    }
    addRow('Miscellaneous', formatItems(miscItems));
    addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
    let body = `<h2>${projectTitle}</h2>`;
    if (infoHtml) body += infoHtml;
    const tableHtml = '<table class="gear-table">' + categoryGroups.join('') + '</table>';
    const adjustedTable = applyAutoGearRulesToTableHtml(tableHtml, info);
    body += '<h3>Gear List</h3>' + adjustedTable;
    return body;
}


function getCurrentGearListHtml() {
    if (!gearListOutput && !projectRequirementsOutput) return '';

    let projHtml = '';
    if (projectRequirementsOutput) {
        const projClone = projectRequirementsOutput.cloneNode(true);
        const editBtn = projClone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        const t = projClone.querySelector('h2');
        if (t) t.remove();
        projHtml = projClone.innerHTML.trim();
    }

    let gearHtml = '';
    if (gearListOutput) {
        const clone = gearListOutput.cloneNode(true);
        const actions = clone.querySelector('#gearListActions');
        if (actions) actions.remove();
        const editBtn = clone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        ['Director', 'Combo', 'Dop'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor15`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor15`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        const cageSel = clone.querySelector('#gearListCage');
        if (cageSel) {
            const originalSel = gearListOutput.querySelector('#gearListCage');
            const val = originalSel ? originalSel.value : cageSel.value;
            Array.from(cageSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const easyrigSel = clone.querySelector('#gearListEasyrig');
        if (easyrigSel) {
            const originalSel = gearListOutput.querySelector('#gearListEasyrig');
            const val = originalSel ? originalSel.value : easyrigSel.value;
            Array.from(easyrigSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const sliderSel = clone.querySelector('#gearListSliderBowl');
        if (sliderSel) {
            const originalSel = gearListOutput.querySelector('#gearListSliderBowl');
            const val = originalSel ? originalSel.value : sliderSel.value;
            Array.from(sliderSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const eyeSel = clone.querySelector('#gearListEyeLeatherColor');
        if (eyeSel) {
            const originalSel = gearListOutput.querySelector('#gearListEyeLeatherColor');
            const val = originalSel ? originalSel.value : eyeSel.value;
            Array.from(eyeSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        [1, 2].forEach(i => {
            const colorSel = clone.querySelector(`#gearListProGaffColor${i}`);
            if (colorSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
                const val = originalSel ? originalSel.value : colorSel.value;
                Array.from(colorSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
            const widthSel = clone.querySelector(`#gearListProGaffWidth${i}`);
            if (widthSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
                const val = originalSel ? originalSel.value : widthSel.value;
                Array.from(widthSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        clone.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (cb.checked) {
                cb.setAttribute('checked', '');
            } else {
                cb.removeAttribute('checked');
            }
        });
        const table = clone.querySelector('.gear-table');
        gearHtml = table ? '<h3>Gear List</h3>' + table.outerHTML : '';
    }

    if (!projHtml && !gearHtml) return '';

    const projectName = getCurrentProjectName();
    const titleHtml = projectName ? `<h2>${projectName}</h2>` : '';
    return `${titleHtml}${projHtml}${gearHtml}`.trim();
}

function getGearListSelectors() {
    if (!gearListOutput) return {};
    const selectors = {};
    gearListOutput.querySelectorAll('select[id]').forEach(sel => {
        selectors[sel.id] = sel.multiple
            ? Array.from(sel.selectedOptions).map(o => o.value)
            : sel.value;
    });
    return selectors;
}

function applyGearListSelectors(selectors) {
    if (!gearListOutput || !selectors) return;
    Object.entries(selectors).forEach(([id, value]) => {
        const sel = gearListOutput.querySelector(`#${id}`);
        if (sel) {
            if (sel.multiple) {
                const vals = Array.isArray(value) ? value : [value];
                Array.from(sel.options).forEach(opt => {
                    opt.selected = vals.includes(opt.value);
                });
                sel.dispatchEvent(new Event('change'));
            } else {
                sel.value = value;
                sel.dispatchEvent(new Event('change'));
            }
        }
    });
}

function saveCurrentGearList() {
    if (factoryResetInProgress) return;
    const html = getCurrentGearListHtml();
    const info = projectForm ? collectProjectFormData() : {};
    info.sliderBowl = getSliderBowlValue();
    info.easyrig = getEasyrigValue();
    currentProjectInfo = deriveProjectInfo(info);
    const projectStorageKey = getCurrentProjectStorageKey({ allowTyped: true });
    const storageKey = getCurrentProjectStorageKey();
    const projectRules = getProjectScopedAutoGearRules();
    if (typeof saveProject === 'function' && typeof projectStorageKey === 'string') {
        const payload = {
            projectInfo: currentProjectInfo,
            gearList: html
        };
        if (projectRules && projectRules.length) {
            payload.autoGearRules = projectRules;
        }
        saveProject(projectStorageKey, payload);
    }

    if (!storageKey) return;

    const setups = getSetups();
    const existing = setups[storageKey];
    if (!existing && !html && !currentProjectInfo && !(projectRules && projectRules.length)) {
        return;
    }

    const setup = existing || {};
    let changed = false;

    if (html) {
        if (setup.gearList !== html) {
            setup.gearList = html;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'gearList')) {
        delete setup.gearList;
        changed = true;
    }

    if (currentProjectInfo) {
        if (setup.projectInfo !== currentProjectInfo) {
            setup.projectInfo = currentProjectInfo;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'projectInfo')) {
        delete setup.projectInfo;
        changed = true;
    }

    const existingRules = setup.autoGearRules;
    const existingRulesSig = existingRules && existingRules.length ? stableStringify(existingRules) : '';
    const newRulesSig = projectRules && projectRules.length ? stableStringify(projectRules) : '';
    if (newRulesSig) {
        if (existingRulesSig !== newRulesSig) {
            setup.autoGearRules = projectRules;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'autoGearRules')) {
        delete setup.autoGearRules;
        changed = true;
    }

    if (!existing) {
        setups[storageKey] = setup;
        storeSetups(setups);
    } else if (changed) {
        setups[storageKey] = setup;
        storeSetups(setups);
    }
}

function deleteCurrentGearList() {
    if (!confirm(texts[currentLang].confirmDeleteGearList)) return false;
    if (!confirm(texts[currentLang].confirmDeleteGearListAgain)) return false;
    const backupName = ensureAutoBackupBeforeDeletion('delete gear list');
    if (!backupName) return false;
    const storageKey = getCurrentProjectStorageKey();
    if (typeof deleteProject === 'function') {
        deleteProject(storageKey);
    } else if (typeof saveProject === 'function') {
        saveProject(storageKey, { projectInfo: null, gearList: '' });
    }
    const setups = getSetups();
    if (setups && typeof setups === 'object') {
        const existingSetup = setups[storageKey];
        if (existingSetup && typeof existingSetup === 'object') {
            let changed = false;
            if (Object.prototype.hasOwnProperty.call(existingSetup, 'gearList')) {
                delete existingSetup.gearList;
                changed = true;
            }
            if (Object.prototype.hasOwnProperty.call(existingSetup, 'projectInfo')) {
                delete existingSetup.projectInfo;
                changed = true;
            }
            if (Object.prototype.hasOwnProperty.call(existingSetup, 'autoGearRules')) {
                delete existingSetup.autoGearRules;
                changed = true;
            }
            if (changed) {
                storeSetups(setups);
            }
        }
    }
    if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
    }
    currentProjectInfo = null;
    if (projectForm) populateProjectForm({});
    storeSession({
        setupName: setupNameInput ? setupNameInput.value : '',
        setupSelect: setupSelect ? setupSelect.value : '',
        camera: cameraSelect ? cameraSelect.value : '',
        monitor: monitorSelect ? monitorSelect.value : '',
        video: videoSelect ? videoSelect.value : '',
        cage: cageSelect ? cageSelect.value : '',
        motors: motorSelects.map(sel => sel ? sel.value : ''),
        controllers: controllerSelects.map(sel => sel ? sel.value : ''),
        distance: distanceSelect ? distanceSelect.value : '',
        batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
        battery: batterySelect ? batterySelect.value : '',
        batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
        sliderBowl: getSliderBowlValue(),
        easyrig: getEasyrigValue(),
        projectInfo: null
    });
    if (typeof autoSaveCurrentSetup === 'function') {
        autoSaveCurrentSetup();
        if (storageKey) {
            const setupsAfterSave = getSetups();
            const savedSetup = setupsAfterSave && setupsAfterSave[storageKey];
            if (savedSetup && typeof savedSetup === 'object') {
                let resaved = false;
                if (Object.prototype.hasOwnProperty.call(savedSetup, 'gearList')) {
                    delete savedSetup.gearList;
                    resaved = true;
                }
                if (Object.prototype.hasOwnProperty.call(savedSetup, 'projectInfo')) {
                    delete savedSetup.projectInfo;
                    resaved = true;
                }
                if (resaved) {
                    storeSetups(setupsAfterSave);
                }
            }
        }
    }
    currentProjectInfo = null;
    updateGearListButtonVisibility();
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
        const eventDetail = { projectName: storageKey, backupName, source: 'deleteCurrentGearList' };
        try {
            document.dispatchEvent(new CustomEvent('gearlist:deleted', { detail: eventDetail }));
        } catch (error) {
            if (typeof document.createEvent === 'function') {
                const fallbackEvent = document.createEvent('CustomEvent');
                fallbackEvent.initCustomEvent('gearlist:deleted', false, false, eventDetail);
                document.dispatchEvent(fallbackEvent);
            } else {
                console.warn('Unable to dispatch gearlist:deleted event', error);
            }
        }
    }
    return true;
}

function ensureGearListActions() {
    if (!gearListOutput) return;
    let actions = document.getElementById('gearListActions');
    if (!actions) {
        actions = document.createElement('div');
        actions.id = 'gearListActions';
        gearListOutput.appendChild(actions);
    }
    const existingDeleteBtn = actions.querySelector('#deleteGearListBtn');
    if (existingDeleteBtn) {
        existingDeleteBtn.removeEventListener('click', deleteCurrentGearList);
        existingDeleteBtn.remove();
    }
    let autoSaveNote = document.getElementById('gearListAutosaveNote');
    if (!autoSaveNote) {
        autoSaveNote = document.createElement('p');
        autoSaveNote.id = 'gearListAutosaveNote';
        autoSaveNote.className = 'gear-list-autosave-note';
        actions.appendChild(autoSaveNote);
    } else if (!actions.contains(autoSaveNote)) {
        actions.appendChild(autoSaveNote);
    }
    const noteText = texts[currentLang].gearListAutosaveNote
        || 'Gear lists save automatically with the project.';
    autoSaveNote.textContent = noteText;
    autoSaveNote.setAttribute('title', noteText);
    autoSaveNote.setAttribute('data-help', noteText);

    if (!gearListOutput._filterListenerBound) {
        gearListOutput.addEventListener('change', e => {
            const target = e.target;
            if (target && target.matches('select')) {
                adjustGearListSelectWidth(target);
            }
            let shouldSync = false;
            if (target.matches('.filter-values-container input[type="checkbox"]')) {
                const container = target.closest('.filter-values-container');
                const storageId = container && container.getAttribute('data-storage-values');
                const sel = container && container.querySelector('select');
                if (target.checked) {
                    target.setAttribute('checked', '');
                } else {
                    target.removeAttribute('checked');
                }
                if (storageId) {
                    syncGearListFilterValue(storageId, target.value, target.checked);
                } else if (sel) {
                    const opt = Array.from(sel.options).find(opt => opt.value === target.value);
                    if (opt) opt.selected = target.checked;
                    sel.dispatchEvent(new Event('change'));
                }
                shouldSync = true;
            } else if (target.matches('select[data-storage-id]')) {
                const storageId = target.getAttribute('data-storage-id');
                if (storageId) {
                    syncGearListFilterSize(storageId, target.value);
                }
                shouldSync = true;
            } else if (target.id && target.id.startsWith('filter-size-')) {
                shouldSync = true;
            } else if (target.id && target.id.startsWith('filter-values-')) {
                shouldSync = true;
            } else if (target.matches('input, select, textarea') && !target.closest('#gearListActions')) {
                shouldSync = true;
            }

            if (shouldSync) {
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            }
        });
        gearListOutput._filterListenerBound = true;
    }

    if (!gearListOutput._inputListenerBound) {
        gearListOutput.addEventListener('input', e => {
            const target = e.target;
            if (!target) return;
            if (target.closest('#gearListActions')) return;
            if (target.matches('input, textarea')) {
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            }
        });
        gearListOutput._inputListenerBound = true;
    }
}

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    const handlerKey = '__cameraPowerPlannerGearDeleteHandler';
    if (!document[handlerKey]) {
        const handleGearDeleteRequest = () => {
            try {
                deleteCurrentGearList();
            } catch (error) {
                console.warn('Failed to handle gear list deletion request', error);
            }
        };
        document.addEventListener('gearlist:delete-requested', handleGearDeleteRequest);
        Object.defineProperty(document, handlerKey, {
            value: handleGearDeleteRequest,
            configurable: true,
            writable: false,
            enumerable: false,
        });
    }
}

function bindGearListCageListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListCage');
    if (sel) {
        sel.addEventListener('change', e => {
            if (cageSelect) {
                cageSelect.value = e.target.value;
                cageSelect.dispatchEvent(new Event('change'));
            }
            saveCurrentGearList();
        });
    }
}

function bindGearListEasyrigListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEasyrig');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListSliderBowlListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListSliderBowl');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListEyeLeatherListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
        });
    }
}

function bindGearListProGaffTapeListener() {
    if (!gearListOutput) return;
    [1, 2].forEach(i => {
        const colorSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
        const widthSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
        [colorSel, widthSel].forEach(sel => {
            if (sel) {
                sel.addEventListener('change', () => {
                    saveCurrentGearList();
                });
            }
        });
    });
}

function bindGearListDirectorMonitorListener() {
    if (!gearListOutput) return;
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            });
        }
    });
    ['Director', 'Combo', 'Dop'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor15`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.directorMonitors && devices.directorMonitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}15`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            });
        }
    });
}


function refreshGearListIfVisible() {
    if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;
    if (restoringSession) return;
    if (skipNextGearListRefresh) {
        skipNextGearListRefresh = false;
        return;
    }

    if (projectForm) {
        populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
        populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
        populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
        const info = collectProjectFormData();
        info.sliderBowl = getSliderBowlValue();
        info.easyrig = getEasyrigValue();
        currentProjectInfo = deriveProjectInfo(info);
    } else {
        const info = { sliderBowl: getSliderBowlValue(), easyrig: getEasyrigValue() };
        currentProjectInfo = deriveProjectInfo(info);
    }

    const html = generateGearListHtml(currentProjectInfo || {});
    if (currentProjectInfo) {
        displayGearAndRequirements(html);
    } else {
        const { gearHtml } = splitGearListHtml(html);
        gearListOutput.innerHTML = gearHtml;
    }
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    // Ensure both the gear list HTML and the associated session state are
    // saved whenever the visible list is refreshed so reloads keep it visible.
    saveCurrentSession();
}

// --- SESSION STATE HANDLING ---
function saveCurrentSession(options = {}) {
  if (restoringSession || factoryResetInProgress) return;
  const info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  currentProjectInfo = deriveProjectInfo(info);
  const state = {
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    cage: cageSelect ? cageSelect.value : '',
    motors: motorSelects.map(sel => sel ? sel.value : ''),
    controllers: controllerSelects.map(sel => sel ? sel.value : ''),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo: currentProjectInfo
  };
  storeSession(state);
  // Persist the current gear list and project requirements alongside the
  // session so they survive reloads without requiring a manual save action.
  if (!options.skipGearList) {
    saveCurrentGearList();
  }
}

function autoSaveCurrentSetup() {
  if (factoryResetInProgress) return;
  if (!setupNameInput) return;
  const name = setupNameInput.value.trim();
  if (!name) {
    saveCurrentSession({ skipGearList: true });
    checkSetupChanged();
    return;
  }
  const selectedName = setupSelect ? setupSelect.value : '';
  if (setupSelect && (!selectedName || name !== selectedName)) {
    saveCurrentSession({ skipGearList: true });
    checkSetupChanged();
    return;
  }
  const currentSetup = { ...getCurrentSetupState() };
  const gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  const setups = getSetups();
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
}

let projectAutoSaveTimer = null;
let factoryResetInProgress = false;

function runProjectAutoSave() {
  if (factoryResetInProgress) {
    projectAutoSaveTimer = null;
    return;
  }
  if (restoringSession) return;
  projectAutoSaveTimer = null;
  const hasSetupName = Boolean(setupNameInput && setupNameInput.value.trim());
  if (!hasSetupName) {
    saveCurrentSession();
  }
  autoSaveCurrentSetup();
  saveCurrentGearList();
}

function scheduleProjectAutoSave(immediate = false) {
  if (factoryResetInProgress) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    return;
  }
  if (restoringSession) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    return;
  }
  if (immediate) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    runProjectAutoSave();
    return;
  }
  if (projectAutoSaveTimer) {
    clearTimeout(projectAutoSaveTimer);
  }
  projectAutoSaveTimer = setTimeout(runProjectAutoSave, 300);
  if (
    projectAutoSaveTimer &&
    typeof projectAutoSaveTimer === 'object' &&
    typeof projectAutoSaveTimer.unref === 'function'
  ) {
    projectAutoSaveTimer.unref();
  }
}

function setSelectValue(select, value) {
  if (!select) return;
  if (value === undefined) return;
  const normalized = value === null ? '' : value;
  select.value = normalized;
  if (select.value !== normalized) {
    const options = Array.from(select.options || []);
    const noneOption = options.find(opt => opt.value === 'None');
    if (normalized === '' && !options.length) {
      select.value = '';
    } else if (normalized === '') {
      if (noneOption) {
        select.value = 'None';
      } else {
        select.selectedIndex = -1;
      }
    } else if (noneOption) {
      select.value = 'None';
    } else {
      select.selectedIndex = -1;
    }
  }
  updateFavoriteButton(select);
  adjustGearListSelectWidth(select);
}

function resetSelectsToNone(selects) {
  selects.forEach(select => {
    if (!select) return;
    const options = Array.from(select.options || []);
    const noneOption = options.find(opt => opt.value === 'None');
    if (noneOption) {
      select.value = 'None';
    } else if (!options.length) {
      select.value = '';
    } else {
      select.selectedIndex = -1;
    }
  });
}

function restoreSessionState() {
  restoringSession = true;
  const state = loadSession();
  storeLoadedSetupState(state || null);
  resetSelectsToNone(motorSelects);
  resetSelectsToNone(controllerSelects);
  if (state) {
    if (setupNameInput) {
      setupNameInput.value = state.setupName || '';
      setupNameInput.dispatchEvent(new Event('input'));
    }
    setSelectValue(cameraSelect, state.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, state.batteryPlate);
    updateBatteryOptions();
    setSelectValue(monitorSelect, state.monitor);
    setSelectValue(videoSelect, state.video);
    setSelectValue(cageSelect, state.cage);
    setSelectValue(distanceSelect, state.distance);
    if (Array.isArray(state.motors)) {
      state.motors.forEach((val, i) => { if (motorSelects[i]) setSelectValue(motorSelects[i], val); });
    }
    if (Array.isArray(state.controllers)) {
      state.controllers.forEach((val, i) => { if (controllerSelects[i]) setSelectValue(controllerSelects[i], val); });
    }
    setSelectValue(batterySelect, state.battery);
    setSelectValue(hotswapSelect, state.batteryHotswap);
    setSelectValue(setupSelect, state.setupSelect);
    currentProjectInfo = state.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
  } else {
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }
  if (gearListOutput || projectRequirementsOutput) {
    const typedName = getCurrentProjectName();
    const storageKey = getCurrentProjectStorageKey();
    const fetchStoredProject = name =>
      typeof loadProject === 'function' && typeof name === 'string'
        ? loadProject(name)
        : null;
    const hasProjectPayload = project =>
      project && (project.gearList || project.projectInfo);
    const candidateNames = [];
    if (typedName) {
      candidateNames.push(typedName);
    }
    if (storageKey || storageKey === '') {
      if (!candidateNames.includes(storageKey)) {
        candidateNames.push(storageKey);
      }
    }
    let storedProject = null;
    for (const name of candidateNames) {
      storedProject = fetchStoredProject(name);
      if (hasProjectPayload(storedProject)) {
        break;
      }
    }
    if (!hasProjectPayload(storedProject) && state) {
      const fallbackName = typeof state.setupSelect === 'string' ? state.setupSelect.trim() : '';
      if (fallbackName && !candidateNames.includes(fallbackName)) {
        const fallbackProject = fetchStoredProject(fallbackName);
        if (hasProjectPayload(fallbackProject)) {
          storedProject = fallbackProject;
        }
      }
    }
    if (hasProjectPayload(storedProject)) {
      const mergedInfo = {
        ...(storedProject.projectInfo || {}),
        ...(currentProjectInfo || {})
      };
      currentProjectInfo = mergedInfo;
      if (projectForm) populateProjectForm(currentProjectInfo);
      displayGearAndRequirements(storedProject.gearList);
      if (gearListOutput && storedProject.gearList) {
        gearListOutput.classList.remove('hidden');
        skipNextGearListRefresh = true;
      }
      if (gearListOutput) {
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        if (state) {
          setSliderBowlValue(state.sliderBowl);
          setEasyrigValue(state.easyrig);
        }
        // Ensure the generator button reflects the restored gear list state
        updateGearListButtonVisibility();
      }
    }
  }
  lastSetupName = setupSelect ? setupSelect.value : '';
  restoringSession = false;
  saveCurrentSession();
}

function applySharedSetup(shared, options = {}) {
  try {
    const decoded = decodeSharedSetup(
      typeof shared === 'string' ? JSON.parse(shared) : shared
    );
    deactivateSharedImportProjectPreset();
    const sharedRulesFromData = Array.isArray(decoded.autoGearRules) ? decoded.autoGearRules : null;
    const providedRules = Array.isArray(options.sharedAutoGearRules) && options.sharedAutoGearRules.length
      ? options.sharedAutoGearRules
      : sharedRulesFromData;
    const hasProvidedRules = Array.isArray(providedRules) && providedRules.length > 0;
    const providedMode = options.autoGearMode;
    let modes = Array.isArray(providedMode)
      ? providedMode.slice()
      : (typeof providedMode === 'string' ? [providedMode] : []);
    modes = modes.filter((value, index, arr) => (
      (value === 'none' || value === 'project' || value === 'global')
      && arr.indexOf(value) === index
    ));
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    if (modes.length > 1 && modes.includes('none')) {
      modes = modes.filter(value => value !== 'none');
    }
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    const applyGlobal = modes.includes('global');
    const applyProject = modes.includes('project');
    const applyNoneOnly = modes.length === 1 && modes[0] === 'none';
    let autoGearUpdated = false;
    if (applyGlobal) {
      if (hasProvidedRules) {
        const merged = mergeAutoGearRules(getBaseAutoGearRules(), providedRules);
        const preset = ensureSharedAutoGearPreset(merged, decoded);
        if (preset) {
          setActiveAutoGearPresetId(preset.id, { persist: true, skipRender: true });
        }
        setAutoGearRules(merged);
        autoGearUpdated = true;
      } else if (usingProjectAutoGearRules()) {
        clearProjectAutoGearRules();
        autoGearUpdated = true;
      }
    }
    if (applyProject) {
      if (hasProvidedRules) {
        const preset = ensureSharedAutoGearPreset(providedRules, decoded);
        if (preset) {
          activateSharedImportProjectPreset(preset.id);
        }
        useProjectAutoGearRules(providedRules);
      } else {
        clearProjectAutoGearRules();
        deactivateSharedImportProjectPreset();
      }
      autoGearUpdated = true;
    } else if (!applyGlobal && (applyNoneOnly || !hasProvidedRules)) {
      if (usingProjectAutoGearRules()) {
        clearProjectAutoGearRules();
        deactivateSharedImportProjectPreset();
        autoGearUpdated = true;
      }
    }
    if (autoGearUpdated) {
      renderAutoGearRulesList();
      updateAutoGearCatalogOptions();
    }
    if (decoded.changedDevices) {
      applyDeviceChanges(decoded.changedDevices);
    }
    if (setupNameInput && decoded.setupName) {
      setupNameInput.value = decoded.setupName;
      setupNameInput.dispatchEvent(new Event('input'));
    }
    resetSelectsToNone(motorSelects);
    resetSelectsToNone(controllerSelects);
    setSelectValue(cameraSelect, decoded.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, decoded.batteryPlate);
    updateBatteryOptions();
    setSelectValue(monitorSelect, decoded.monitor);
    setSelectValue(videoSelect, decoded.video);
    setSelectValue(cageSelect, decoded.cage);
    setSelectValue(distanceSelect, decoded.distance);
    if (Array.isArray(decoded.motors)) {
      decoded.motors.forEach((val, i) => { if (motorSelects[i]) setSelectValue(motorSelects[i], val); });
    }
    if (Array.isArray(decoded.controllers)) {
      decoded.controllers.forEach((val, i) => { if (controllerSelects[i]) setSelectValue(controllerSelects[i], val); });
    }
    setSelectValue(batterySelect, decoded.battery);
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      const key = getCurrentSetupKey();
      const fb = loadFeedbackSafe();
      fb[key] = (fb[key] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
    currentProjectInfo = decoded.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
    let gearDisplayed = false;
    const combinedHtml = (decoded.projectHtml || '') + (decoded.gearList || '');
    if (combinedHtml) {
      displayGearAndRequirements(combinedHtml);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
      gearDisplayed = true;
    } else if (decoded.projectInfo || decoded.gearSelectors) {
      const html = generateGearListHtml(decoded.projectInfo || {});
      displayGearAndRequirements(html);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
      gearDisplayed = true;
    }
    if (decoded.gearSelectors && gearDisplayed) {
      applyGearListSelectors(decoded.gearSelectors);
    }
    if (decoded.projectInfo || decoded.gearSelectors || decoded.gearList) {
      const payload = {
        gearList: getCurrentGearListHtml(),
        projectInfo: decoded.projectInfo || null
      };
      const activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      let storageKey = getCurrentProjectStorageKey({ allowTyped: true });
      const typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      const selectedName = setupSelect && typeof setupSelect.value === 'string'
        ? setupSelect.value.trim()
        : '';
      if (typedName && typedName !== selectedName) {
        storageKey = typedName;
      }
      saveProject(storageKey, payload);
    }
  } catch (e) {
    console.error('Failed to apply shared setup', e);
    alert(texts[currentLang].invalidSharedLink);
  }
}

function applySharedSetupFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get('shared');
  if (!shared) return;
  try {
    const data = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
    applySharedSetup(data);
    if (typeof updateCalculations === 'function') {
      updateCalculations();
    }
    if (window.history && window.history.replaceState) {
      history.replaceState(null, '', window.location.pathname);
    }
  } catch (e) {
    console.error('Failed to apply shared setup from URL', e);
  }
}

// --- EVENT LISTENERS FÜR NEUBERECHNUNG ---

// Sicherstellen, dass Änderungen an den Selects auch neu berechnen
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
if (cameraSelect) {
  cameraSelect.addEventListener('change', () => {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
  });
}
if (monitoringConfigurationSelect) {
  monitoringConfigurationSelect.addEventListener('change', () => {
    monitoringConfigurationUserChanged = true;
    updateViewfinderSettingsVisibility();
  });
}
if (monitorSelect) {
  monitorSelect.addEventListener('change', updateMonitoringConfigurationOptions);
}
if (batteryPlateSelect) batteryPlateSelect.addEventListener('change', updateBatteryOptions);
if (batterySelect) batterySelect.addEventListener('change', updateBatteryOptions);
if (hotswapSelect) hotswapSelect.addEventListener('change', updateCalculations);

motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect, setupSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
if (setupNameInput) {
  const handleSetupNameInput = () => {
    const typedName = setupNameInput.value ? setupNameInput.value.trim() : '';
    const selectedName = setupSelect ? setupSelect.value : '';
    const renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
    saveCurrentSession({ skipGearList: renameInProgress });
  };
  setupNameInput.addEventListener("input", handleSetupNameInput);
}

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
if (setupNameInput) setupNameInput.addEventListener("input", checkSetupChanged);

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
if (setupNameInput) setupNameInput.addEventListener("change", autoSaveCurrentSetup);

const flushProjectAutoSaveOnExit = () => {
  if (factoryResetInProgress) return;
  scheduleProjectAutoSave(true);
};
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushProjectAutoSaveOnExit();
    }
  });
}
if (typeof window !== 'undefined') {
  ['pagehide', 'beforeunload'].forEach((eventName) => {
    window.addEventListener(eventName, flushProjectAutoSaveOnExit);
  });
}

// Enable Save button only when a setup name is entered and allow Enter to save
if (setupNameInput && saveSetupBtn) {
  const toggleSaveSetupBtn = () => {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}

// Dark mode handling
function updateThemeColor(isDark) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#1c1c1e' : '#ffffff');
  }
}

function setToggleIcon(button, glyph) {
  if (!button) return;
  let iconSpan = button.querySelector('.icon-glyph');
  if (!iconSpan) {
    iconSpan = document.createElement('span');
    iconSpan.className = 'icon-glyph';
    iconSpan.setAttribute('aria-hidden', 'true');
    button.textContent = '';
    button.appendChild(iconSpan);
  }

  const glyphConfig =
    glyph && typeof glyph === 'object' && (glyph.markup || glyph.className)
      ? glyph
      : { value: glyph };

  const classNames = ['icon-glyph'];
  if (glyphConfig.className) {
    classNames.push(glyphConfig.className);
  }
  iconSpan.className = classNames.join(' ');

  if (glyphConfig.markup) {
    iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
    iconSpan.removeAttribute('data-icon-font');
  } else {
    applyIconGlyph(iconSpan, glyphConfig.value);
  }
}

function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    document.documentElement.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.documentElement.classList.remove("light-mode");
    if (darkModeToggle) {
      setToggleIcon(darkModeToggle, ICON_GLYPHS.sun);
      darkModeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    document.body.classList.remove("dark-mode");
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    document.documentElement.classList.add("light-mode");
    if (darkModeToggle) {
      setToggleIcon(darkModeToggle, ICON_GLYPHS.moon);
      darkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  const highContrast = isHighContrastActive();
  const accentSource = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : accentColor;
  refreshDarkModeAccentBoost({ color: accentSource, highContrast });
  updateThemeColor(enabled);
  if (settingsDarkMode) {
    settingsDarkMode.checked = enabled;
  }
}

let darkModeEnabled = false;
try {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) {
    darkModeEnabled = stored === "true";
  } else if (typeof window.matchMedia === "function") {
    darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
} catch (e) {
  console.warn("Could not load dark mode preference", e);
}
applyDarkMode(darkModeEnabled);

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    darkModeEnabled = !document.body.classList.contains("dark-mode");
    applyDarkMode(darkModeEnabled);
    try {
      localStorage.setItem("darkMode", darkModeEnabled);
    } catch (e) {
      console.warn("Could not save dark mode preference", e);
    }
  });
}

function applyHighContrast(enabled) {
  if (enabled) {
    if (document.body) {
      document.body.classList.add("high-contrast");
    }
    document.documentElement.classList.add("high-contrast");
    applyAccentColor(accentColor);
  } else {
    if (document.body) {
      document.body.classList.remove("high-contrast");
    }
    document.documentElement.classList.remove("high-contrast");
    if (document.body && document.body.classList.contains('pink-mode') && !hasCustomAccentSelection()) {
      clearAccentColorOverrides();
    } else {
      applyAccentColor(accentColor);
    }
  }
}

let highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);

// Pink mode handling

function stopPinkModeIconRotation() {
  if (pinkModeIconRotationTimer) {
    clearInterval(pinkModeIconRotationTimer);
    pinkModeIconRotationTimer = null;
  }
}

function triggerPinkModeIconAnimation() {
  const targets = [];
  if (pinkModeToggle) {
    const toggleIcon = pinkModeToggle.querySelector('.pink-mode-icon');
    if (toggleIcon) {
      targets.push(toggleIcon);
    }
  }
  if (pinkModeHelpIcon) {
    targets.push(pinkModeHelpIcon);
  }
  if (!targets.length) {
    return;
  }
  targets.forEach(target => {
    target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
    // Force a reflow so the animation restarts even when toggled quickly
    target.getBoundingClientRect();
    target.classList.add(PINK_MODE_ICON_ANIMATION_CLASS);
    if (PINK_MODE_ICON_ANIMATION_RESET_DELAY > 0) {
      setTimeout(() => {
        target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
      }, PINK_MODE_ICON_ANIMATION_RESET_DELAY);
    }
  });
}

function applyPinkModeIcon(iconConfig, { animate = false } = {}) {
  if (!iconConfig) return;
  if (pinkModeToggle) {
    setToggleIcon(pinkModeToggle, iconConfig);
  }
  if (pinkModeHelpIcon) {
    pinkModeHelpIcon.className = 'help-icon icon-glyph icon-svg pink-mode-icon';
    pinkModeHelpIcon.innerHTML = iconConfig.markup || '';
  }
  if (animate) {
    triggerPinkModeIconAnimation();
  }
}

function startPinkModeIconRotation() {
  const sequence = Array.isArray(pinkModeIcons.onSequence)
    ? pinkModeIcons.onSequence
    : [];
  if (!sequence.length) {
    applyPinkModeIcon(pinkModeIcons.off, { animate: false });
    return;
  }
  stopPinkModeIconRotation();
  if (!pinkModeToggle && !pinkModeHelpIcon) {
    return;
  }
  pinkModeIconIndex = 0;
  applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: true });
  pinkModeIconRotationTimer = setInterval(() => {
    pinkModeIconIndex = (pinkModeIconIndex + 1) % sequence.length;
    applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: true });
  }, PINK_MODE_ICON_INTERVAL_MS);
}

function applyPinkMode(enabled) {
  const preserveAccent = shouldPreserveAccentInPinkMode();
  if (enabled) {
    document.body.classList.add("pink-mode");
    if (accentColorInput) {
      accentColorInput.disabled = true;
    }
    if (preserveAccent) {
      applyAccentColor(accentColor);
    } else {
      clearAccentColorOverrides();
    }
    if (pinkModeToggle) {
      pinkModeToggle.setAttribute("aria-pressed", "true");
    }
    startPinkModeIconRotation();
    startPinkModeAnimatedIcons();
  } else {
    stopPinkModeAnimatedIcons();
    document.body.classList.remove("pink-mode");
    if (accentColorInput) {
      accentColorInput.disabled = false;
    }
    applyAccentColor(accentColor);
    stopPinkModeIconRotation();
    applyPinkModeIcon(pinkModeIcons.off, { animate: false });
    if (pinkModeToggle) {
      pinkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  if (settingsPinkMode) {
    settingsPinkMode.checked = enabled;
  }
}

function isPinkModeActive() {
  return !!(document.body && document.body.classList.contains('pink-mode'));
}

let pinkModeEnabled = false;

let settingsInitialPinkMode = isPinkModeActive();

function persistPinkModePreference(enabled) {
  pinkModeEnabled = !!enabled;
  applyPinkMode(pinkModeEnabled);
  try {
    localStorage.setItem('pinkMode', pinkModeEnabled);
  } catch (e) {
    console.warn('Could not save pink mode preference', e);
  }
}

function rememberSettingsPinkModeBaseline() {
  settingsInitialPinkMode = isPinkModeActive();
}

function revertSettingsPinkModeIfNeeded() {
  if (isPinkModeActive() !== settingsInitialPinkMode) {
    persistPinkModePreference(settingsInitialPinkMode);
  }
}

try {
  pinkModeEnabled = localStorage.getItem('pinkMode') === 'true';
} catch (e) {
  console.warn('Could not load pink mode preference', e);
}
applyPinkMode(pinkModeEnabled);
rememberSettingsPinkModeBaseline();

if (pinkModeToggle) {
  pinkModeToggle.addEventListener("click", () => {
    persistPinkModePreference(!document.body.classList.contains('pink-mode'));
  });
}

if (settingsPinkMode) {
  settingsPinkMode.addEventListener('change', () => {
    persistPinkModePreference(settingsPinkMode.checked);
  });
}

if (settingsButton && settingsDialog) {
  settingsButton.addEventListener('click', () => {
    prevAccentColor = accentColor;
    rememberSettingsPinkModeBaseline();
    if (settingsLanguage) settingsLanguage.value = currentLang;
    if (settingsDarkMode) settingsDarkMode.checked = document.body.classList.contains('dark-mode');
    if (settingsPinkMode) settingsPinkMode.checked = document.body.classList.contains('pink-mode');
    if (settingsHighContrast) settingsHighContrast.checked = document.body.classList.contains('high-contrast');
    if (settingsShowAutoBackups) settingsShowAutoBackups.checked = showAutoBackups;
    if (accentColorInput) {
      const stored = localStorage.getItem('accentColor');
      accentColorInput.value = stored || accentColor;
    }
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) settingsFontFamily.value = fontFamily;
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) loadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      refreshAutoGearScenarioOptions();
      refreshAutoGearMatteboxOptions();
      refreshAutoGearCameraHandleOptions();
      refreshAutoGearViewfinderExtensionOptions();
      refreshAutoGearVideoDistributionOptions();
      populateAutoGearCategorySelect(autoGearAddCategorySelect, '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, '');
      renderAutoGearRulesList();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
    }
    settingsDialog.removeAttribute('hidden');
    openDialog(settingsDialog);
    // Focus the first control except the language selector to avoid opening it automatically
    const first = settingsDialog.querySelector('input, select:not(#settingsLanguage)');
    if (first) {
      try {
        first.focus({ preventScroll: true });
      } catch {
        first.focus();
      }
    }
  });

  if (settingsCancel) {
    settingsCancel.addEventListener('click', () => {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) loadStoredLogoPreview();
      closeAutoGearEditor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }

  if (settingsSave) {
    settingsSave.addEventListener('click', () => {
      if (settingsLanguage) {
        setLanguage(settingsLanguage.value);
      }
      if (settingsDarkMode) {
        const enabled = settingsDarkMode.checked;
        applyDarkMode(enabled);
        try {
          localStorage.setItem('darkMode', enabled);
        } catch (e) {
          console.warn('Could not save dark mode preference', e);
        }
      }
      if (settingsPinkMode) {
        persistPinkModePreference(settingsPinkMode.checked);
      }
      if (settingsHighContrast) {
        const enabled = settingsHighContrast.checked;
        applyHighContrast(enabled);
        try {
          localStorage.setItem('highContrast', enabled);
        } catch (e) {
          console.warn('Could not save high contrast preference', e);
        }
      }
      if (settingsShowAutoBackups) {
        const enabled = settingsShowAutoBackups.checked;
        const changed = enabled !== showAutoBackups;
        showAutoBackups = enabled;
        try {
          localStorage.setItem('showAutoBackups', enabled);
        } catch (e) {
          console.warn('Could not save auto backup visibility preference', e);
        }
        if (changed) {
          const prevValue = setupSelect ? setupSelect.value : '';
          const prevName = setupNameInput ? setupNameInput.value : '';
          populateSetupSelect();
          if (setupSelect) {
            if (showAutoBackups || !prevValue.startsWith('auto-backup-')) {
              setupSelect.value = prevValue;
            } else {
              setupSelect.value = '';
            }
          }
          if (setupNameInput) {
            setupNameInput.value = prevName;
          }
        }
      }
      if (accentColorInput) {
        const color = accentColorInput.value;
        applyAccentColor(color);
        try {
          localStorage.setItem('accentColor', color);
        } catch (e) {
          console.warn('Could not save accent color', e);
        }
        accentColor = color;
        prevAccentColor = color;
      }
      if (settingsFontSize) {
        const size = settingsFontSize.value;
        applyFontSize(size);
        try {
          localStorage.setItem('fontSize', size);
        } catch (e) {
          console.warn('Could not save font size', e);
        }
        fontSize = size;
      }
      if (settingsFontFamily) {
        const family = settingsFontFamily.value;
        applyFontFamily(family);
        try {
          localStorage.setItem('fontFamily', family);
        } catch (e) {
          console.warn('Could not save font family', e);
        }
        fontFamily = family;
      }
      if (settingsLogo && settingsLogo.files && settingsLogo.files[0]) {
        const file = settingsLogo.files[0];
        if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              localStorage.setItem('customLogo', reader.result);
            } catch (e) {
              console.warn('Could not save custom logo', e);
            }
            renderSettingsLogoPreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
          if (settingsLogo) settingsLogo.value = '';
          loadStoredLogoPreview();
        }
      }
      closeAutoGearEditor();
      rememberSettingsPinkModeBaseline();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }

  settingsDialog.addEventListener('click', e => {
    if (e.target === settingsDialog) {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) loadStoredLogoPreview();
      closeAutoGearEditor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    }
  });

  settingsDialog.addEventListener('cancel', e => {
    e.preventDefault();
    revertSettingsPinkModeIfNeeded();
    rememberSettingsPinkModeBaseline();
    revertAccentColor();
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) loadStoredLogoPreview();
    closeAutoGearEditor();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  });

if (autoGearAddRuleBtn) {
  autoGearAddRuleBtn.addEventListener('click', () => {
    openAutoGearEditor();
  });
}
if (autoGearResetFactoryButton) {
  autoGearResetFactoryButton.addEventListener('click', resetAutoGearRulesToFactoryAdditions);
}
if (autoGearExportButton) {
  autoGearExportButton.addEventListener('click', exportAutoGearRules);
}
if (autoGearImportButton && autoGearImportInput) {
  autoGearImportButton.addEventListener('click', () => {
    autoGearImportInput.click();
  });
  autoGearImportInput.addEventListener('change', handleAutoGearImportSelection);
}
if (autoGearPresetSelect) {
  autoGearPresetSelect.addEventListener('change', handleAutoGearPresetSelection);
}
if (autoGearSavePresetButton) {
  autoGearSavePresetButton.addEventListener('click', handleAutoGearSavePreset);
}
if (autoGearDeletePresetButton) {
  autoGearDeletePresetButton.addEventListener('click', handleAutoGearDeletePreset);
}
if (autoGearAddItemButton) {
  autoGearAddItemButton.addEventListener('click', () => addAutoGearDraftItem('add'));
}
  if (autoGearRemoveItemButton) {
    autoGearRemoveItemButton.addEventListener('click', () => addAutoGearDraftItem('remove'));
  }
  if (autoGearSaveRuleButton) {
    autoGearSaveRuleButton.addEventListener('click', saveAutoGearRuleFromEditor);
  }
  if (autoGearCancelEditButton) {
    autoGearCancelEditButton.addEventListener('click', () => {
      closeAutoGearEditor();
      renderAutoGearDraftLists();
    });
  }
  if (autoGearRulesList) {
    autoGearRulesList.addEventListener('click', event => {
      const target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-edit')) {
        openAutoGearEditor(target.dataset.ruleId || '');
      } else if (target.classList.contains('auto-gear-delete')) {
        deleteAutoGearRule(target.dataset.ruleId || '');
      }
    });
  }
  if (autoGearBackupSelect) {
    autoGearBackupSelect.addEventListener('change', () => {
      updateAutoGearBackupRestoreButtonState();
    });
  }
  if (autoGearShowBackupsCheckbox) {
    autoGearShowBackupsCheckbox.addEventListener('change', handleAutoGearShowBackupsToggle);
  }
  if (autoGearBackupRestoreButton) {
    autoGearBackupRestoreButton.addEventListener('click', () => {
      if (!autoGearBackupSelect) return;
      const backupId = autoGearBackupSelect.value;
      if (backupId) {
        restoreAutoGearBackup(backupId);
      }
    });
  }
  if (autoGearAddCategorySelect) {
    autoGearAddCategorySelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  if (autoGearRemoveCategorySelect) {
    autoGearRemoveCategorySelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  if (autoGearEditor) {
    autoGearEditor.addEventListener('click', event => {
      const target = event.target;
      if (!target || !target.classList.contains('auto-gear-remove-entry')) return;
      const listType = target.dataset.listType;
      const itemId = target.dataset.itemId;
      if (!autoGearEditorDraft || !itemId) return;
      const list = listType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
      const index = list.findIndex(item => item.id === itemId);
      if (index >= 0) {
        list.splice(index, 1);
        renderAutoGearDraftLists();
      }
    });
  }
}

syncAutoGearMonitorFieldVisibility();

function parseRgbComponent(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.endsWith('%')) {
    const percent = Number.parseFloat(trimmed.slice(0, -1));
    if (Number.isNaN(percent)) return null;
    return Math.max(0, Math.min(255, Math.round((percent / 100) * 255)));
  }
  const numeric = Number.parseFloat(trimmed);
  if (Number.isNaN(numeric)) return null;
  return Math.max(0, Math.min(255, Math.round(numeric)));
}

function parseColorToRgb(color) {
  if (typeof color !== 'string') return null;
  const trimmed = color.trim();
  if (!trimmed) return null;
  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      return {
        r: Number.parseInt(hex[0] + hex[0], 16),
        g: Number.parseInt(hex[1] + hex[1], 16),
        b: Number.parseInt(hex[2] + hex[2], 16),
      };
    }
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }
  const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(',');
    if (parts.length < 3) return null;
    const [r, g, b] = parts;
    const red = parseRgbComponent(r);
    const green = parseRgbComponent(g);
    const blue = parseRgbComponent(b);
    if ([red, green, blue].some(component => component === null)) return null;
    return { r: red, g: green, b: blue };
  }
  return null;
}

const createAccentTint = (alpha = 0.16) => {
  const accentFallback = typeof accentColor === 'string'
    ? accentColor
    : DEFAULT_ACCENT_COLOR;
  const accentSource = getCssVariableValue('--accent-color', accentFallback);
  const rgb = parseColorToRgb(accentSource);
  if (!rgb) return null;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  const id = 'backupNotificationContainer';
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    document.body.appendChild(container);
  }
  const note = document.createElement('div');
  note.textContent = message;
  note.style.padding = '0.75rem 1.25rem';
  note.style.marginTop = '0.5rem';
  note.style.borderRadius = '0.75rem';
  note.style.border = 'none';
  note.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
  let background;
  let textColor;
  if (type === 'error' || type === 'warning') {
    const backgroundVar = type === 'error' ? '--status-error-bg' : '--status-warning-bg';
    const fallbackBackground = type === 'error' ? '#fdd' : '#ffd';
    background = getCssVariableValue(backgroundVar, fallbackBackground);
    const textColorVar = type === 'error' ? '--status-error-text-color' : '--status-warning-text-color';
    textColor = getCssVariableValue(textColorVar, '#000');
  } else {
    background = createAccentTint() || getCssVariableValue('--status-success-bg', '#dfd');
    textColor = getCssVariableValue('--status-success-text-color', '#000');
  }
  note.style.background = background;
  note.style.color = textColor;
  container.appendChild(note);
  setTimeout(() => {
    note.remove();
    if (!container.children.length) {
      container.remove();
    }
  }, 4000);
}

function formatFullBackupFilename(date) {
  const safeDate = date instanceof Date && !Number.isNaN(date.valueOf())
    ? date
    : new Date();
  const pad = n => String(n).padStart(2, '0');
  const year = safeDate.getFullYear();
  const month = pad(safeDate.getMonth() + 1);
  const day = pad(safeDate.getDate());
  const hours = pad(safeDate.getHours());
  const minutes = pad(safeDate.getMinutes());
  const seconds = pad(safeDate.getSeconds());
  const offsetMinutes = safeDate.getTimezoneOffset();
  let offsetSuffix = 'Z';
  if (offsetMinutes !== 0) {
    const sign = offsetMinutes > 0 ? '-' : '+';
    const abs = Math.abs(offsetMinutes);
    const offsetHours = pad(Math.floor(abs / 60));
    const offsetMins = pad(abs % 60);
    offsetSuffix = `${sign}${offsetHours}:${offsetMins}`;
  }
  const iso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSuffix}`;
  const safeIso = iso.replace(/[:]/g, '-');
  return {
    iso,
    fileName: `${safeIso} full app backup.json`,
  };
}

function resolveSafeLocalStorage() {
  if (typeof getSafeLocalStorage === 'function') {
    try {
      const storage = getSafeLocalStorage();
      if (storage) {
        return storage;
      }
    } catch (error) {
      console.warn('Unable to obtain safe local storage reference', error);
    }
  }
  if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
    return SAFE_LOCAL_STORAGE;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return null;
}

function captureStorageSnapshot(storage) {
  const snapshot = Object.create(null);
  if (!storage) return snapshot;
  try {
    if (typeof storage.key === 'function' && typeof storage.length === 'number') {
      const length = storage.length;
      for (let i = 0; i < length; i++) {
        const key = storage.key(i);
        if (typeof key !== 'string') continue;
        snapshot[key] = storage.getItem(key);
      }
    } else if (typeof storage.keys === 'function') {
      const keys = storage.keys();
      keys.forEach((key) => {
        if (typeof key !== 'string') return;
        snapshot[key] = storage.getItem(key);
      });
    } else if (typeof storage.forEach === 'function') {
      storage.forEach((value, key) => {
        if (typeof key !== 'string') return;
        snapshot[key] = value;
      });
    }
  } catch (error) {
    console.warn('Failed to snapshot storage', error);
  }
  return snapshot;
}

const BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_'];
const BACKUP_STORAGE_KNOWN_KEYS = new Set([
  'darkMode',
  'pinkMode',
  'highContrast',
  'showAutoBackups',
  'accentColor',
  'fontSize',
  'fontFamily',
  'customLogo',
  'language',
  IOS_PWA_HELP_STORAGE_KEY,
]);
const BACKUP_METADATA_BASE_KEYS = new Set([
  'settings',
  'storage',
  'localStorage',
  'values',
  'entries',
  'sessionStorage',
  'sessionState',
  'sessionEntries',
  'payload',
  'plannerData',
  'allData',
  'generatedAt',
  'version',
  'appVersion',
  'applicationVersion',
]);
const BACKUP_DATA_KEYS = [
  'devices',
  'setups',
  'session',
  'feedback',
  'project',
  'projects',
  'gearList',
  'favorites',
  'autoGearRules',
  'autoGearSeeded',
  'autoGearBackups',
  'autoGearPresets',
  'autoGearActivePresetId',
  'autoGearAutoPresetId',
  'autoGearShowBackups',
  'customLogo',
  'customFonts',
  'preferences',
];

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeStoredValue(value) {
  if (typeof value === 'string') return value;
  if (value === undefined || value === null) return '';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.warn('Failed to serialize stored value for backup compatibility', error);
      return '';
    }
  }
  try {
    return String(value);
  } catch (error) {
    console.warn('Failed to normalize stored value for backup compatibility', error);
    return '';
  }
}

function convertEntriesToSnapshot(section) {
  if (!section) return null;
  const snapshot = Object.create(null);
  const assignEntry = (key, value) => {
    if (typeof key !== 'string' || !key) return;
    snapshot[key] = normalizeStoredValue(value);
  };

  if (Array.isArray(section)) {
    section.forEach(entry => {
      if (!entry) return;
      if (Array.isArray(entry)) {
        assignEntry(entry[0], entry[1]);
        return;
      }
      if (typeof entry === 'object') {
        if (typeof entry.key === 'string') {
          assignEntry(entry.key, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
          return;
        }
        if (typeof entry.name === 'string') {
          assignEntry(entry.name, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
          return;
        }
        if (Array.isArray(entry.entry)) {
          assignEntry(entry.entry[0], entry.entry[1]);
        }
      }
    });
  } else if (isPlainObject(section)) {
    Object.entries(section).forEach(([key, value]) => {
      assignEntry(key, value);
    });
  } else {
    return null;
  }

  return Object.keys(snapshot).length ? snapshot : null;
}

function extractFirstMatchingSnapshot(source, keys) {
  if (!isPlainObject(source)) return { snapshot: null, keyUsed: null };
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    const snapshot = convertEntriesToSnapshot(source[key]);
    if (snapshot) {
      return { snapshot, keyUsed: key };
    }
  }
  return { snapshot: null, keyUsed: null };
}

function looksLikeStoredSettingKey(key) {
  if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
    return true;
  }
  return BACKUP_STORAGE_KEY_PREFIXES.some(prefix => key.startsWith(prefix));
}

function buildLegacyStorageFromRoot(source, metadataKeys) {
  if (!isPlainObject(source)) return null;
  const snapshot = Object.create(null);
  Object.entries(source).forEach(([key, value]) => {
    if (metadataKeys.has(key)) return;
    if (!looksLikeStoredSettingKey(key)) return;
    snapshot[key] = normalizeStoredValue(value);
  });
  return Object.keys(snapshot).length ? snapshot : null;
}

function extractBackupSections(raw) {
  const parsed = isPlainObject(raw) ? raw : {};
  const versionValue =
    typeof parsed.version === 'string'
      ? parsed.version
      : typeof parsed.appVersion === 'string'
        ? parsed.appVersion
        : typeof parsed.applicationVersion === 'string'
          ? parsed.applicationVersion
          : undefined;

  const settingsResult = extractFirstMatchingSnapshot(parsed, [
    'settings',
    'localStorage',
    'storage',
    'storedSettings',
    'values',
    'entries',
  ]);
  const sessionResult = extractFirstMatchingSnapshot(parsed, [
    'sessionStorage',
    'session',
    'sessions',
    'sessionState',
    'sessionEntries',
  ]);

  const metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
  if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
  if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);

  const settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
  const sessionSnapshot = sessionResult.snapshot;

  let dataSection = null;
  for (const key of ['data', 'payload', 'plannerData', 'allData']) {
    if (isPlainObject(parsed[key])) {
      dataSection = parsed[key];
      break;
    }
  }
  if (!dataSection) {
    const fallback = {};
    BACKUP_DATA_KEYS.forEach(key => {
      if (metadataKeys.has(key)) return;
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        fallback[key] = parsed[key];
      }
    });
    if (Object.keys(fallback).length) {
      dataSection = fallback;
    }
  }

  return {
    fileVersion: versionValue,
    settings: settingsSnapshot,
    sessionStorage: sessionSnapshot,
    data: isPlainObject(dataSection) ? dataSection : null,
  };
}

function triggerBackupDownload(url, fileName) {
  if (typeof document === 'undefined') {
    return false;
  }

  let anchor;
  try {
    anchor = document.createElement('a');
  } catch (error) {
    console.warn('Failed to create backup download link', error);
    return false;
  }

  if (!anchor || typeof anchor.click !== 'function' || !('download' in anchor)) {
    return false;
  }

  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = 'noopener';

  if (anchor.style) {
    try {
      if (typeof anchor.style.setProperty === 'function') {
        anchor.style.setProperty('display', 'none');
      } else {
        anchor.style.display = 'none';
      }
    } catch (styleError) {
      void styleError;
    }
  }

  const parent = document.body || document.documentElement || document.head;
  let appended = false;
  if (parent && typeof parent.appendChild === 'function') {
    try {
      parent.appendChild(anchor);
      appended = true;
    } catch (appendError) {
      void appendError;
    }
  }

  try {
    anchor.click();
  } catch (clickError) {
    console.warn('Failed to trigger backup download link', clickError);
    if (appended && anchor.parentNode && typeof anchor.parentNode.removeChild === 'function') {
      try {
        anchor.parentNode.removeChild(anchor);
      } catch (removeError) {
        void removeError;
      }
    }
    return false;
  }

  if (appended && anchor.parentNode && typeof anchor.parentNode.removeChild === 'function') {
    try {
      anchor.parentNode.removeChild(anchor);
    } catch (removeError2) {
      void removeError2;
    }
  }

  return true;
}

function encodeBackupDataUrl(payload) {
  try {
    return `data:application/json;charset=utf-8,${encodeURIComponent(payload)}`;
  } catch (error) {
    console.warn('Failed to encode backup data URL', error);
    return null;
  }
}

function downloadBackupPayload(payload, fileName) {
  if (typeof payload !== 'string') {
    return false;
  }

  let blob = null;
  if (typeof Blob !== 'undefined') {
    try {
      blob = new Blob([payload], { type: 'application/json' });
    } catch (blobError) {
      console.warn('Failed to create backup blob', blobError);
      blob = null;
    }
  }

  if (blob) {
    if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
      try {
        navigator.msSaveOrOpenBlob(blob, fileName);
        return true;
      } catch (msError) {
        console.warn('Saving backup via msSaveOrOpenBlob failed', msError);
      }
    }

    if (typeof URL !== 'undefined' && URL && typeof URL.createObjectURL === 'function') {
      let objectUrl = null;
      try {
        objectUrl = URL.createObjectURL(blob);
      } catch (urlError) {
        console.warn('Failed to create backup object URL', urlError);
        objectUrl = null;
      }

      if (objectUrl) {
        const triggered = triggerBackupDownload(objectUrl, fileName);
        try {
          if (typeof URL.revokeObjectURL === 'function') {
            URL.revokeObjectURL(objectUrl);
          }
        } catch (revokeError) {
          console.warn('Failed to revoke backup object URL', revokeError);
        }

        if (triggered) {
          return true;
        }
      }
    }
  }

  const dataUrl = encodeBackupDataUrl(payload);
  if (dataUrl) {
    return triggerBackupDownload(dataUrl, fileName);
  }

  return false;
}

function createSettingsBackup(notify = true, timestamp = new Date()) {
  try {
    const isEvent = notify && typeof notify === 'object' && typeof notify.type === 'string';
    const shouldNotify = isEvent ? true : Boolean(notify);
    const { iso, fileName } = formatFullBackupFilename(timestamp);
    const safeStorage = resolveSafeLocalStorage();
    const settings = captureStorageSnapshot(safeStorage);
    const sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    const backup = {
      version: APP_VERSION,
      generatedAt: iso,
      settings,
      sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
      data: typeof exportAllData === 'function' ? exportAllData() : {},
    };
    const payload = JSON.stringify(backup);
    const downloaded = downloadBackupPayload(payload, fileName);
    if (!downloaded) {
      throw new Error('No supported download method available');
    }
    if (shouldNotify) {
      showNotification('success', 'Full app backup downloaded');
    }
    return fileName;
  } catch (e) {
    console.warn('Backup failed', e);
    if (notify) {
      showNotification('error', 'Backup failed');
    }
    return null;
  }
}

if (backupSettings) {
  backupSettings.addEventListener('click', createSettingsBackup);
}

if (restoreSettings && restoreSettingsInput) {
  restoreSettings.addEventListener('click', () => restoreSettingsInput.click());
  restoreSettingsInput.addEventListener('change', () => {
    const file = restoreSettingsInput.files[0];
    if (!file) return;

    const langTexts = texts[currentLang] || {};
    const fallbackTexts = texts.en || {};

    let backupFileName = null;
    try {
      backupFileName = createSettingsBackup(false, new Date());
    } catch (error) {
      console.error('Backup before restore failed', error);
    }

    if (!backupFileName) {
      const failureMessage = langTexts.restoreBackupFailed
        || fallbackTexts.restoreBackupFailed
        || 'Backup failed. Restore cancelled.';
      showNotification('error', failureMessage);
      alert(failureMessage);
      restoreSettingsInput.value = '';
      return;
    }

    showNotification('success', 'Full app backup downloaded');

    const reader = new FileReader();
    const resetInput = () => {
      try {
        restoreSettingsInput.value = '';
      } catch (resetError) {
        void resetError;
      }
    };
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        const {
          settings: restoredSettings,
          sessionStorage: restoredSession,
          data,
          fileVersion,
        } = extractBackupSections(parsed);
        if (fileVersion !== APP_VERSION) {
          alert(`${texts[currentLang].restoreVersionWarning} (${fileVersion || 'unknown'} → ${APP_VERSION})`);
        }
        if (restoredSettings && typeof restoredSettings === 'object') {
          const safeStorage = resolveSafeLocalStorage();
          if (safeStorage && typeof safeStorage.setItem === 'function') {
            Object.entries(restoredSettings).forEach(([k, v]) => {
              if (typeof k !== 'string') return;
              try {
                if (v === null || v === undefined) {
                  if (typeof safeStorage.removeItem === 'function') {
                    safeStorage.removeItem(k);
                  }
                } else {
                  safeStorage.setItem(k, String(v));
                }
              } catch (storageError) {
                console.warn('Failed to restore storage entry', k, storageError);
              }
            });
          }
        }
        if (restoredSession && typeof sessionStorage !== 'undefined') {
          Object.entries(restoredSession).forEach(([key, value]) => {
            try {
              sessionStorage.setItem(key, value);
            } catch (sessionError) {
              console.warn('Failed to restore sessionStorage entry', key, sessionError);
            }
          });
        }
        loadStoredLogoPreview();
        if (data && typeof importAllData === 'function') {
          importAllData(data);
        }
        syncAutoGearRulesFromStorage(data?.autoGearRules);
        const safeStorage = resolveSafeLocalStorage();
        const safeGetItem = (key) => {
          if (!safeStorage || typeof safeStorage.getItem !== 'function') return null;
          try {
            return safeStorage.getItem(key);
          } catch (error) {
            console.warn('Failed to read restored storage key', key, error);
            return null;
          }
        };
        applyDarkMode(safeGetItem('darkMode') === 'true');
        applyPinkMode(safeGetItem('pinkMode') === 'true');
        applyHighContrast(safeGetItem('highContrast') === 'true');
        showAutoBackups = safeGetItem('showAutoBackups') === 'true';
        const prevValue = setupSelect ? setupSelect.value : '';
        const prevName = setupNameInput ? setupNameInput.value : '';
        populateSetupSelect();
        if (setupSelect) {
          if (showAutoBackups || !prevValue.startsWith('auto-backup-')) {
            setupSelect.value = prevValue;
          } else {
            setupSelect.value = '';
          }
        }
        if (setupNameInput) {
          setupNameInput.value = prevName;
        }
        if (settingsShowAutoBackups) {
          settingsShowAutoBackups.checked = showAutoBackups;
        }
        const color = safeGetItem('accentColor');
        if (color) {
          document.documentElement.style.setProperty('--accent-color', color);
          document.documentElement.style.setProperty('--link-color', color);
          accentColor = color;
          prevAccentColor = color;
        }
        const lang = safeGetItem('language');
        if (lang) setLanguage(lang);
        alert(texts[currentLang].restoreSuccess);
      } catch (err) {
        console.warn('Restore failed', err);
      }
      resetInput();
    };
    reader.onerror = err => {
      console.warn('Failed to read restore file', err);
      resetInput();
    };
    reader.readAsText(file);
  });
}

function resetPlannerStateAfterFactoryReset() {
  try {
    if (typeof storeLoadedSetupState === 'function') {
      storeLoadedSetupState(null);
    }
  } catch (error) {
    console.warn('Failed to reset loaded setup state during factory reset', error);
  }

  try {
    currentProjectInfo = null;
  } catch (error) {
    console.warn('Failed to clear in-memory project info during factory reset', error);
  }

  try {
    if (typeof populateProjectForm === 'function') {
      populateProjectForm({});
    } else if (projectForm && typeof projectForm.reset === 'function') {
      projectForm.reset();
    }
  } catch (error) {
    console.warn('Failed to reset project form during factory reset', error);
  }

  try {
    displayGearAndRequirements('');
  } catch (error) {
    console.warn('Failed to reset gear displays during factory reset', error);
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }

  const primarySelects = [
    cameraSelect,
    monitorSelect,
    videoSelect,
    cageSelect,
    distanceSelect,
    batterySelect,
    hotswapSelect,
    batteryPlateSelect,
  ];
  primarySelects.forEach(select => {
    if (!select) return;
    try {
      const options = Array.from(select.options || []);
      const noneOption = options.find(opt => opt.value === 'None');
      if (noneOption) {
        select.value = 'None';
      } else if (options.length) {
        select.selectedIndex = 0;
      } else {
        select.value = '';
      }
    } catch (selectError) {
      console.warn('Failed to reset selector during factory reset', selectError);
    }
  });

  try {
    resetSelectsToNone(motorSelects);
  } catch (error) {
    console.warn('Failed to reset motor selections during factory reset', error);
  }

  try {
    resetSelectsToNone(controllerSelects);
  } catch (error) {
    console.warn('Failed to reset controller selections during factory reset', error);
  }

  try {
    const sliderSelect = getSliderBowlSelect();
    if (sliderSelect) sliderSelect.value = '';
  } catch (error) {
    console.warn('Failed to reset slider bowl selection during factory reset', error);
  }

  try {
    const easyrigSelect = getEasyrigSelect();
    if (easyrigSelect) easyrigSelect.value = '';
  } catch (error) {
    console.warn('Failed to reset Easyrig selection during factory reset', error);
  }

  try {
    if (setupNameInput) {
      setupNameInput.value = '';
    }
  } catch (error) {
    console.warn('Failed to clear setup name during factory reset', error);
  }

  try {
    if (setupSelect) {
      populateSetupSelect();
      setupSelect.value = '';
    }
  } catch (error) {
    console.warn('Failed to reset setup selector options during factory reset', error);
  }

  try {
    syncAutoGearRulesFromStorage();
  } catch (error) {
    console.warn('Failed to sync automatic gear rules during factory reset', error);
    try {
      clearProjectAutoGearRules();
    } catch (fallbackError) {
      console.warn('Failed to clear project automatic gear rules during factory reset', fallbackError);
    }
  }

  try {
    renderAutoGearRulesList();
  } catch (error) {
    console.warn('Failed to render automatic gear rules during factory reset', error);
  }

  try {
    updateAutoGearCatalogOptions();
  } catch (error) {
    console.warn('Failed to refresh automatic gear catalog during factory reset', error);
  }

  try {
    updateBatteryPlateVisibility();
  } catch (error) {
    console.warn('Failed to reset battery plate visibility during factory reset', error);
  }

  try {
    updateBatteryOptions();
  } catch (error) {
    console.warn('Failed to reset battery options during factory reset', error);
  }

  try {
    if (typeof loadStoredLogoPreview === 'function') {
      loadStoredLogoPreview();
    }
  } catch (error) {
    console.warn('Failed to reset custom logo preview during factory reset', error);
  }

  try {
    updateStorageSummary();
  } catch (error) {
    console.warn('Failed to update storage summary during factory reset', error);
  }

  try {
    ensureGearListActions();
  } catch (error) {
    console.warn('Failed to ensure gear list actions during factory reset', error);
  }

  try {
    checkSetupChanged();
  } catch (error) {
    console.warn('Failed to refresh setup state during factory reset', error);
  }

  try {
    updateCalculations();
  } catch (error) {
    console.warn('Failed to update calculations during factory reset', error);
  }
}

if (factoryResetButton) {
  factoryResetButton.addEventListener('click', () => {
    const langTexts = texts[currentLang] || texts.en || {};
    const confirmReset = langTexts.confirmFactoryReset
      || 'Create a backup and wipe all planner data?';
    if (!confirm(confirmReset)) return;
    const confirmResetAgain = langTexts.confirmFactoryResetAgain
      || 'This will permanently delete all saved planner data. Continue?';
    if (!confirm(confirmResetAgain)) return;

    if (typeof createSettingsBackup !== 'function') {
      const errorMsg = langTexts.factoryResetError
        || 'Factory reset failed. Please try again.';
      showNotification('error', errorMsg);
      return;
    }

    let backupFileName = null;
    try {
      backupFileName = createSettingsBackup(false, new Date());
    } catch (error) {
      console.error('Backup before factory reset failed', error);
    }

    if (!backupFileName) {
      const backupFailedMsg = langTexts.factoryResetBackupFailed
        || 'Backup failed. Data was not deleted.';
      showNotification('error', backupFailedMsg);
      return;
    }

    if (typeof clearAllData !== 'function') {
      const errorMsg = langTexts.factoryResetError
        || 'Factory reset failed. Please try again.';
      showNotification('error', errorMsg);
      return;
    }

    try {
      factoryResetInProgress = true;
      if (typeof globalThis !== 'undefined') {
        try {
          globalThis.__cameraPowerPlannerFactoryResetting = true;
        } catch (flagError) {
          console.warn('Unable to flag factory reset on global scope', flagError);
        }
      }
      if (projectAutoSaveTimer) {
        clearTimeout(projectAutoSaveTimer);
        projectAutoSaveTimer = null;
      }
      try {
        stopPinkModeIconRotation();
        stopPinkModeAnimatedIcons();
      } catch (animationError) {
        console.warn('Failed to stop pink mode animations during factory reset', animationError);
      }
      clearAllData();
      try {
        resetPlannerStateAfterFactoryReset();
      } catch (resetError) {
        console.warn('Failed to reset planner state after factory reset', resetError);
      }
      try {
        darkModeEnabled = false;
        applyDarkMode(false);
      } catch (darkError) {
        console.warn('Failed to reset dark mode during factory reset', darkError);
      }
      try {
        highContrastEnabled = false;
        applyHighContrast(false);
        if (settingsHighContrast) {
          settingsHighContrast.checked = false;
        }
      } catch (contrastError) {
        console.warn('Failed to reset high contrast during factory reset', contrastError);
      }
      try {
        pinkModeEnabled = false;
        applyPinkMode(false);
        rememberSettingsPinkModeBaseline();
      } catch (pinkError) {
        console.warn('Failed to reset pink mode during factory reset', pinkError);
      }
      showAutoBackups = false;
      if (settingsShowAutoBackups) {
        settingsShowAutoBackups.checked = false;
      }
      try {
        accentColor = DEFAULT_ACCENT_COLOR;
        prevAccentColor = DEFAULT_ACCENT_COLOR;
        clearAccentColorOverrides();
        applyAccentColor(accentColor);
        if (accentColorInput) {
          accentColorInput.value = DEFAULT_ACCENT_COLOR;
        }
      } catch (accentError) {
        console.warn('Failed to reset accent color during factory reset', accentError);
      }
      try {
        fontSize = '16';
        applyFontSize(fontSize);
        if (settingsFontSize) {
          settingsFontSize.value = fontSize;
        }
      } catch (fontSizeError) {
        console.warn('Failed to reset font size during factory reset', fontSizeError);
      }
      try {
        fontFamily = "'Ubuntu', sans-serif";
        applyFontFamily(fontFamily);
        if (settingsFontFamily) {
          settingsFontFamily.value = fontFamily;
        }
      } catch (fontFamilyError) {
        console.warn('Failed to reset font family during factory reset', fontFamilyError);
      }
      if (settingsDialog) {
        settingsDialog.setAttribute('hidden', '');
      }
      const successMsg = langTexts.factoryResetSuccess
        || 'Backup downloaded. All planner data cleared. Reloading…';
      showNotification('success', successMsg);
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location && window.location.reload) {
          window.location.reload();
        }
      }, 600);
    } catch (error) {
      console.error('Factory reset failed', error);
      factoryResetInProgress = false;
      if (typeof globalThis !== 'undefined') {
        try {
          delete globalThis.__cameraPowerPlannerFactoryResetting;
        } catch (cleanupError) {
          console.warn('Unable to clear factory reset flag from global scope', cleanupError);
        }
      }
      const errorMsg = langTexts.factoryResetError
        || 'Factory reset failed. Please try again.';
      showNotification('error', errorMsg);
    }
  });
}

async function clearCachesAndReload() {
  try {
    if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
      const registrations = [];
      const { serviceWorker } = navigator;
      try {
        if (typeof serviceWorker.getRegistrations === 'function') {
          const regs = await serviceWorker.getRegistrations();
          if (Array.isArray(regs)) {
            regs.forEach(reg => registrations.push(reg));
          }
        } else if (typeof serviceWorker.getRegistration === 'function') {
          const reg = await serviceWorker.getRegistration();
          if (reg) {
            registrations.push(reg);
          }
        } else if (serviceWorker.ready && typeof serviceWorker.ready.then === 'function') {
          try {
            const readyReg = await serviceWorker.ready;
            if (readyReg) {
              registrations.push(readyReg);
            }
          } catch (readyError) {
            console.warn('Failed to await active service worker', readyError);
          }
        }
      } catch (queryError) {
        console.warn('Failed to query service worker registrations', queryError);
      }

      if (registrations.length) {
        await Promise.all(registrations.map(reg => {
          if (!reg || typeof reg.unregister !== 'function') {
            return Promise.resolve();
          }
          return reg.unregister().catch(unregisterError => {
            console.warn('Service worker unregister failed', unregisterError);
          });
        }));
      }
    }

    if (typeof caches !== 'undefined' && caches && typeof caches.keys === 'function') {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => {
        if (!key || typeof caches.delete !== 'function') {
          return Promise.resolve(false);
        }
        return caches.delete(key).catch(cacheError => {
          console.warn('Failed to delete cache', key, cacheError);
          return false;
        });
      }));
    }
  } catch (error) {
    console.warn('Cache clear failed', error);
  } finally {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const { location } = window;
        const hasReplace = location && typeof location.replace === 'function';
        const hasReload = location && typeof location.reload === 'function';
        let navigationTriggered = false;
        if (hasReplace) {
          const paramName = 'forceReload';
          const timestamp = Date.now().toString(36);
          let href = location.href || '';
          let hash = '';
          const hashIndex = href.indexOf('#');
          if (hashIndex !== -1) {
            hash = href.slice(hashIndex);
            href = href.slice(0, hashIndex);
          }
          const pattern = new RegExp('([?&])' + paramName + '=[^&]*');
          const replacement = '$1' + paramName + '=' + timestamp;
          if (pattern.test(href)) {
            href = href.replace(pattern, replacement);
          } else if (href.indexOf('?') !== -1) {
            href += '&' + paramName + '=' + timestamp;
          } else if (href) {
            href += '?' + paramName + '=' + timestamp;
          }
          location.replace(href + hash);
          navigationTriggered = true;
        }
        if (!navigationTriggered && hasReload) {
          location.reload();
        }
      }
    } catch (reloadError) {
      console.warn('Forced reload failed', reloadError);
      if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
        window.location.reload();
      }
    }
  }
}

if (reloadButton) {
  reloadButton.addEventListener("click", clearCachesAndReload);
}

function exportDiagramSvg() {
  if (!setupDiagramContainer) return '';
  const svgEl = setupDiagramContainer.querySelector('svg');
  if (!svgEl) return '';

  const clone = svgEl.cloneNode(true);
  const labels = svgEl.querySelectorAll('.edge-label');
  const cloneLabels = clone.querySelectorAll('.edge-label');
  labels.forEach((lbl, idx) => {
    if (cloneLabels[idx]) {
      // innerHTML isn't consistently supported for SVG <text> elements in all browsers,
      // which could result in empty connection labels in the exported SVG. Using
      // textContent ensures the label text is preserved across environments.
      cloneLabels[idx].textContent = lbl.textContent;
    }
  });
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  // Always export using the bright theme regardless of the current mode
  style.textContent = getDiagramCss(false);
  clone.insertBefore(style, clone.firstChild);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(clone);
}

function copyTextToClipboardBestEffort(text) {
  if (typeof text !== 'string' || !text) {
    return;
  }

  if (
    typeof navigator !== 'undefined' &&
    navigator &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    navigator.clipboard.writeText(text).catch(() => {});
    return;
  }

  if (
    typeof document === 'undefined' ||
    !document ||
    !document.body ||
    typeof document.createElement !== 'function'
  ) {
    return;
  }

  let textarea = null;
  const previousActiveElement = document.activeElement;

  try {
    textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    try {
      textarea.focus();
    } catch {
      // Ignore focus errors on platforms that disallow programmatic focus.
    }

    try {
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, textarea.value.length);
      }
    } catch {
      // Ignore selection errors; execCommand may still succeed.
    }

    if (typeof document.execCommand === 'function') {
      try {
        document.execCommand('copy');
      } catch {
        // Ignore execCommand failures to avoid breaking the export flow.
      }
    }
  } catch {
    // Ignore clipboard fallback errors.
  } finally {
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }

    if (
      previousActiveElement &&
      typeof previousActiveElement.focus === 'function'
    ) {
      try {
        previousActiveElement.focus();
      } catch {
        // Ignore focus restoration errors.
      }
    }
  }
}

if (downloadDiagramBtn) {
  downloadDiagramBtn.addEventListener('click', (e) => {
    const source = exportDiagramSvg();
    if (!source) return;

    copyTextToClipboardBestEffort(source);
    const pad = n => String(n).padStart(2, '0');
    const now = new Date();
    const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const namePart = (getCurrentProjectName() || 'setup')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '');
    const baseName = `${datePart}_${namePart}_diagram`;

    const saveSvg = () => {
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    };

    if (e.shiftKey) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${baseName}.jpg`;
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    } else {
      saveSvg();
    }
  });
}

if (gridSnapToggleBtn) {
  gridSnapToggleBtn.addEventListener('click', () => {
    gridSnap = !gridSnap;
    gridSnapToggleBtn.classList.toggle('active', gridSnap);
    gridSnapToggleBtn.setAttribute('aria-pressed', gridSnap ? 'true' : 'false');
    if (setupDiagramContainer) {
      setupDiagramContainer.classList.toggle('grid-snap', gridSnap);
    }
  });
}

if (helpButton && helpDialog) {
  // --- Help dialog and hover help -----------------------------------------
  // Provides a modal help dialog with live filtering and a "hover for help"
  // mode that exposes descriptions for interface controls. The following
  // functions manage searching, opening/closing the dialog and tooltip-based
  // hover help.
  const helpContent = helpDialog.querySelector('.help-content');
  const helpQuickLinkItems = new Map();
  const helpSectionHighlightTimers = new Map();
  const appTargetHighlightTimers = new Map();

  const highlightAppTarget = element => {
    if (!element) return;
    const target = element;
    const existing = appTargetHighlightTimers.get(target);
    if (existing) {
      clearTimeout(existing);
    }
    target.classList.add('help-target-focus');
    const timeout = setTimeout(() => {
      target.classList.remove('help-target-focus');
      appTargetHighlightTimers.delete(target);
    }, 2000);
    appTargetHighlightTimers.set(target, timeout);
  };

  const focusFeatureElement = element => {
    if (!element) return;

    const settingsSection = element.closest('#settingsDialog');
    if (settingsSection && !isDialogOpen(settingsDialog)) {
      settingsButton?.click?.();
    }

    const dialog = element.closest('dialog');
    if (dialog && !isDialogOpen(dialog)) {
      if (dialog.id === 'projectDialog') {
        generateGearListBtn?.click?.();
      } else if (dialog.id === 'feedbackDialog') {
        runtimeFeedbackBtn?.click?.();
      } else if (dialog.id === 'overviewDialog') {
        generateOverviewBtn?.click?.();
      } else {
        openDialog(dialog);
      }
    }

    const deviceManager = element.closest('#device-manager');
    if (deviceManager) {
      showDeviceManagerSection();
    }

    if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const hadTabIndex = element.hasAttribute('tabindex');
    let addedTabIndex = false;
    if (!hadTabIndex) {
      const tabIndex = element.tabIndex;
      if (typeof tabIndex === 'number' && tabIndex < 0) {
        element.setAttribute('tabindex', '-1');
        addedTabIndex = true;
      }
    }

    if (typeof element.focus === 'function') {
      try {
        element.focus({ preventScroll: true });
      } catch {
        element.focus();
      }
    }

    if (addedTabIndex) {
      element.addEventListener(
        'blur',
        () => element.removeAttribute('tabindex'),
        { once: true }
      );
    }
  };

  const focusHelpSectionHeading = section => {
    if (!section) return;
    const heading =
      section.querySelector('h3, summary, h4, h5, h6') ||
      section.querySelector('button, a');
    if (!heading) return;
    const hadTabIndex = heading.hasAttribute('tabindex');
    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
    try {
      heading.focus({ preventScroll: true });
    } catch {
      heading.focus();
    }
    if (!hadTabIndex) {
      heading.addEventListener(
        'blur',
        () => heading.removeAttribute('tabindex'),
        { once: true }
      );
    }
  };

  const highlightHelpSection = section => {
    if (!section) return;
    const existingTimer = helpSectionHighlightTimers.get(section);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    section.classList.add('help-section-focus');
    const timer = setTimeout(() => {
      section.classList.remove('help-section-focus');
      helpSectionHighlightTimers.delete(section);
    }, 1500);
    helpSectionHighlightTimers.set(section, timer);
  };

  const syncHelpQuickLinksVisibility = () => {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    let hasVisible = false;
    helpQuickLinkItems.forEach(({ section, listItem, button }) => {
      if (section && !section.hasAttribute('hidden')) {
        listItem.removeAttribute('hidden');
        hasVisible = true;
      } else {
        listItem.setAttribute('hidden', '');
        if (button) button.classList.remove('active');
      }
    });
    if (hasVisible) {
      helpQuickLinksNav.removeAttribute('hidden');
    } else {
      helpQuickLinksNav.setAttribute('hidden', '');
    }
  };

  const applyQuickLinkLanguage = lang => {
    if (!helpQuickLinksNav) return;
    const langTexts = (texts && texts[lang]) || {};
    const fallbackTexts = (texts && texts.en) || {};
    const headingText =
      langTexts.helpQuickLinksHeading || fallbackTexts.helpQuickLinksHeading;
    if (helpQuickLinksHeading && headingText) {
      helpQuickLinksHeading.textContent = headingText;
    }
    const ariaLabel =
      langTexts.helpQuickLinksAriaLabel ||
      headingText ||
      fallbackTexts.helpQuickLinksAriaLabel ||
      'Help topics quick navigation';
    helpQuickLinksNav.setAttribute('aria-label', ariaLabel);
    const helpDescription =
      langTexts.helpQuickLinksHelp || fallbackTexts.helpQuickLinksHelp;
    if (helpDescription) {
      helpQuickLinksNav.setAttribute('data-help', helpDescription);
    } else {
      helpQuickLinksNav.removeAttribute('data-help');
    }
    const template =
      langTexts.helpQuickLinkButtonHelp || fallbackTexts.helpQuickLinkButtonHelp;
    helpQuickLinkItems.forEach(({ button, label }) => {
      if (!button) return;
      if (template) {
        const helpText = template.replace('%s', label);
        button.setAttribute('data-help', helpText);
        button.setAttribute('aria-label', helpText);
      } else {
        button.removeAttribute('data-help');
        button.setAttribute('aria-label', label);
      }
    });
  };

  updateHelpQuickLinksForLanguage = applyQuickLinkLanguage;

  const buildHelpQuickLinks = () => {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpSectionsContainer) {
      helpQuickLinkItems.clear();
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinkItems.clear();
    helpQuickLinksList.textContent = '';
    const fragment = document.createDocumentFragment();
    const sections = Array.from(
      helpSectionsContainer.querySelectorAll('section[data-help-section]')
    );
    sections.forEach(section => {
      const id = section.id;
      if (!id) return;
      const heading = section.querySelector('h3');
      if (!heading) return;
      const headingIcon = heading.querySelector('.help-icon.icon-glyph');
      let label = heading.textContent || '';
      if (headingIcon) {
        const iconText = headingIcon.textContent || '';
        if (iconText) {
          const iconIndex = label.indexOf(iconText);
          if (iconIndex > -1) {
            label =
              label.slice(0, iconIndex) +
              label.slice(iconIndex + iconText.length);
          }
        }
      }
      label = label.trim();
      if (!label) return;
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'help-quick-link';
      button.dataset.targetId = id;
      button.setAttribute('aria-label', label);

      if (headingIcon) {
        const icon = headingIcon.cloneNode(true);
        icon.classList.remove('help-icon');
        icon.classList.add('help-quick-link-icon');
        button.appendChild(icon);
      }

      const labelSpan = document.createElement('span');
      labelSpan.className = 'help-quick-link-label';
      labelSpan.textContent = label;
      button.appendChild(labelSpan);
      button.addEventListener('click', () => {
        if (section.hasAttribute('hidden')) return;
        if (helpQuickLinksList) {
          helpQuickLinksList
            .querySelectorAll('.help-quick-link.active')
            .forEach(btn => btn.classList.remove('active'));
        }
        button.classList.add('active');
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        highlightHelpSection(section);
        focusHelpSectionHeading(section);
      });
      li.appendChild(button);
      fragment.appendChild(li);
      helpQuickLinkItems.set(id, { section, button, listItem: li, label });
    });
    if (!fragment.childNodes.length) {
      helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinksList.appendChild(fragment);
    applyQuickLinkLanguage(currentLang);
    syncHelpQuickLinksVisibility();
  };

  buildHelpQuickLinks();

  if (helpDialog) {
    helpDialog.addEventListener('click', e => {
      const link = e.target.closest('a[data-help-target]');
      if (!link) return;
      const rawSelector = link.dataset.helpTarget || link.getAttribute('href') || '';
      const selector = rawSelector.trim();
      if (!selector) return;
      let focusEl;
      try {
        focusEl = document.querySelector(selector);
      } catch {
        focusEl = null;
      }
      if (!focusEl) return;
      e.preventDefault();
      const highlightSelector = link.dataset.helpHighlight || '';
      let highlightEl = focusEl;
      if (highlightSelector) {
        try {
          const candidate = document.querySelector(highlightSelector);
          if (candidate) {
            highlightEl = candidate;
          }
        } catch {
          // ignore selector errors and fall back to the focus element
        }
      }
      const targetInsideHelp = helpDialog.contains(focusEl);
      const runFocus = () => {
        focusFeatureElement(focusEl);
        if (highlightEl) {
          highlightAppTarget(highlightEl);
        }
      };
      if (targetInsideHelp) {
        runFocus();
        return;
      }
      closeHelp(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(runFocus);
      });
    });
  }

  // Search and filtering for the help dialog. Every keystroke scans both
  // high-level sections and individual FAQ items, restoring their original
  // markup, highlighting matches and hiding entries that do not include the
  // query. A message is shown if nothing matches and the clear button is
  // toggled based on the presence of a query.
  const HELP_SEARCH_ACCENT_VARIANTS = new Map([
    ['a', 'àáâãäåāăąǎȁȃȧậắằẵẳấầẫẩảạæ'],
    ['b', 'ḃɓ'],
    ['c', 'çćĉċčƈ'],
    ['d', 'ďđḍḑḓ'],
    ['e', 'èéêëēĕėęěȅȇẹẻẽếềểễệ'],
    ['f', 'ƒḟ'],
    ['g', 'ğģĝġǵḡ'],
    ['h', 'ĥħḣḥḧẖ'],
    ['i', 'ìíîïĩīĭįıỉị'],
    ['j', 'ĵǰ'],
    ['k', 'ķƙḱḳḵ'],
    ['l', 'ĺļľłḷḽ'],
    ['m', 'ḿṁṃ'],
    ['n', 'ñńņňǹṅṇṋ'],
    ['o', 'òóôõöōŏőøǒȍȏơộớờỡởợọỏœ'],
    ['p', 'ṕṗ'],
    ['q', 'ʠ'],
    ['r', 'ŕŗřȑȓṛṙ'],
    ['s', 'śŝşšșṡṣ'],
    ['t', 'ţťțṫṭṯ'],
    ['u', 'ùúûüũūŭůűųǔȕȗưựứừữửụủ'],
    ['v', 'ṽṿ'],
    ['w', 'ŵẁẃẅẇẉ'],
    ['x', 'ẋẍ'],
    ['y', 'ýÿŷỳỷỹỵ'],
    ['z', 'źżžẑẓẕ']
  ]);

  const normaliseHelpSearchText = str => {
    if (!str) return '';
    let normalized = String(str).toLowerCase();
    if (typeof normalized.normalize === 'function') {
      normalized = normalized.normalize('NFD');
    }
    normalized = normalized
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ß/g, 'ss')
      .replace(/æ/g, 'ae')
      .replace(/œ/g, 'oe')
      .replace(/ø/g, 'o')
      .replace(/&/g, 'and')
      .replace(/\+/g, 'plus')
      .replace(/[°º˚]/g, 'deg')
      .replace(/\bdegrees?\b/g, 'deg')
      .replace(/[×✕✖✗✘]/g, 'x');
    normalized = normalizeSpellingVariants(normalized);
    normalized = normaliseMarkVariants(normalized);
    return normalized.replace(/[^a-z0-9]+/g, '');
  };

  const buildHelpHighlightPattern = normalized => {
    if (!normalized) return null;
    const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = [];
    const addLetterPattern = char => {
      const variants = HELP_SEARCH_ACCENT_VARIANTS.get(char) || '';
      const chars = new Set();
      const all = `${char}${variants}`;
      for (const ch of all) {
        chars.add(ch);
        const upper = ch.toUpperCase();
        if (upper) chars.add(upper);
      }
      const escaped = Array.from(chars)
        .map(escapeRegExp)
        .join('');
      return `[${escaped}]`;
    };
    const letters = Array.from(normalized);
    letters.forEach((char, index) => {
      if (index > 0) parts.push('\\s*');
      if (/[a-z]/.test(char)) {
        parts.push(addLetterPattern(char));
      } else if (/[0-9]/.test(char)) {
        parts.push(char);
      } else {
        parts.push(escapeRegExp(char));
      }
    });
    return `(${parts.join('')})`;
  };

  const filterHelp = () => {
    // Bail out early if the search input is missing
    if (!helpSearch) return;
    const rawQuery = helpSearch.value.trim();
    const normalizedQuery = normaliseHelpSearchText(rawQuery);
    const hasQuery = normalizedQuery.length > 0;
    // Treat sections and FAQ items uniformly so the same logic can filter both
    const sections = Array.from(
      helpDialog.querySelectorAll('[data-help-section]')
    );
    const items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    const elements = sections.concat(items);
    let anyVisible = false;
    const highlightPattern = hasQuery
      ? buildHelpHighlightPattern(normalizedQuery)
      : null;
    const highlightMatches = (root, pattern) => {
      if (
        !pattern ||
        typeof document.createTreeWalker !== 'function' ||
        typeof NodeFilter === 'undefined'
      ) {
        return;
      }
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null
      );
      const textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      textNodes.forEach(node => {
        const text = node.textContent;
        if (!text) return;
        const regex = new RegExp(pattern, 'giu');
        const firstMatch = regex.exec(text);
        if (!firstMatch) return;
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let match = firstMatch;
        do {
          const start = match.index;
          const end = start + match[0].length;
          if (start > lastIndex) {
            frag.appendChild(
              document.createTextNode(text.slice(lastIndex, start))
            );
          }
          const mark = document.createElement('mark');
          mark.textContent = text.slice(start, end);
          frag.appendChild(mark);
          lastIndex = end;
          if (regex.lastIndex === start) {
            regex.lastIndex++;
          }
        } while ((match = regex.exec(text)) !== null);
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(frag, node);
        }
      });
    };
    elements.forEach(el => {
      const isFaqItem = el.classList.contains('faq-item');
      // Save original HTML once so that repeated filtering doesn't permanently
      // insert <mark> tags; restore it before applying a new highlight. While
      // doing so, capture the default open state for FAQ <details> elements so
      // the search can temporarily expand matches and restore the original
      // collapsed/expanded configuration when cleared.
      if (!el.dataset.origHtml) {
        el.dataset.origHtml = el.innerHTML;
        if (isFaqItem) {
          el.dataset.defaultOpen = el.hasAttribute('open') ? 'true' : 'false';
        }
      } else {
        el.innerHTML = el.dataset.origHtml;
      }
      const text = normaliseHelpSearchText(el.textContent || '');
      const keywordText = normaliseHelpSearchText(
        el.dataset.helpKeywords || ''
      );
      const matches =
        !hasQuery ||
        text.includes(normalizedQuery) ||
        keywordText.includes(normalizedQuery);
      if (matches) {
        if (hasQuery && highlightPattern) {
          // Highlight the matching text while preserving the rest of the content
          highlightMatches(el, highlightPattern);
        }
        el.removeAttribute('hidden');
        if (isFaqItem) {
          if (hasQuery) {
            el.setAttribute('open', '');
          } else if (el.dataset.defaultOpen === 'true') {
            el.setAttribute('open', '');
          } else {
            el.removeAttribute('open');
          }
        }
        anyVisible = true;
      } else {
        // Hide entries that do not match and collapse FAQ answers while they
        // are filtered out so reopening the dialog starts from a clean state.
        el.setAttribute('hidden', '');
        if (isFaqItem) {
          el.removeAttribute('open');
        }
      }
    });
    if (helpNoResults) {
      // Show or hide the "no results" indicator
      if (anyVisible) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
      }
    }
    if (helpSearchClear) {
      // Only show the clear button when there is text in the search box
      if (hasQuery) {
        helpSearchClear.removeAttribute('hidden');
      } else {
        helpSearchClear.setAttribute('hidden', '');
      }
    }
    syncHelpQuickLinksVisibility();
  };

  // Display the help dialog. The search box is reset so stale filter state
  // doesn't persist between openings, and focus is moved to the search field
  // for immediate typing.
  const openHelp = () => {
    closeSideMenu();
    helpDialog.removeAttribute('hidden');
    openDialog(helpDialog);
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp(); // ensure all sections are visible again
      if (helpQuickLinksList) {
        helpQuickLinksList
          .querySelectorAll('.help-quick-link.active')
          .forEach(btn => btn.classList.remove('active'));
      }
      if (helpContent) {
        helpContent.scrollTop = 0;
      }
      helpSearch.focus();
    } else {
      try {
        helpDialog.focus({ preventScroll: true });
      } catch {
        helpDialog.focus();
      }
    }
  };

  // Hide the dialog and return focus to the button that opened it
  const closeHelp = (returnFocusEl = helpButton) => {
    closeDialog(helpDialog);
    helpDialog.setAttribute('hidden', '');
    if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
      try {
        returnFocusEl.focus({ preventScroll: true });
      } catch {
        returnFocusEl.focus();
      }
    }
  };

  // Convenience helper for toggling the dialog open or closed
  const toggleHelp = () => {
    if (!isDialogOpen(helpDialog)) {
      openHelp();
    } else {
      closeHelp();
    }
  };

  // Hover help mode displays a tooltip describing whichever element the user
  // points at or focuses. It is triggered from a button inside the dialog and
  // uses the same data-help/aria-* attributes that power the dialog content.
  let hoverHelpActive = false;
  let hoverHelpTooltip;
  let hoverHelpCurrentTarget = null;

  const HOVER_HELP_TARGET_SELECTOR =
    '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';

  const findHoverHelpTarget = start => {
    if (!start) return null;
    const el = start.closest(HOVER_HELP_TARGET_SELECTOR);
    if (!el || el.tagName === 'SECTION') {
      return null;
    }
    return el;
  };

  const collectHoverHelpText = el => {
    if (!el) return [];
    const parts = [];
    const addText = value => {
      if (typeof value !== 'string') return;
      const trimmed = value.trim();
      if (!trimmed) return;
      if (!parts.includes(trimmed)) parts.push(trimmed);
    };

    addText(el.getAttribute('data-help'));
    addText(el.getAttribute('aria-label'));
    addText(el.getAttribute('title'));

    const applyFromIds = ids => {
      if (!ids) return;
      ids
        .split(/\s+/)
        .filter(Boolean)
        .forEach(id => {
          const ref = document.getElementById(id);
          if (!ref) return;
          addText(ref.getAttribute('data-help'));
          addText(ref.getAttribute('aria-label'));
          addText(ref.getAttribute('title'));
          addText(ref.textContent);
        });
    };

    applyFromIds(el.getAttribute('aria-labelledby'));
    addText(el.getAttribute('alt'));
    applyFromIds(el.getAttribute('aria-describedby'));

    return parts;
  };

  const positionHoverHelpTooltip = target => {
    if (!hoverHelpTooltip || !target) return;
    const rect = target.getBoundingClientRect();
    const topBase = Number.isFinite(rect.bottom) && rect.bottom ? rect.bottom : rect.top;
    const leftBase = Number.isFinite(rect.left) ? rect.left : 0;
    const top = (Number.isFinite(topBase) ? topBase : 0) + window.scrollY + 10;
    const left = leftBase + window.scrollX;
    hoverHelpTooltip.style.top = `${top}px`;
    hoverHelpTooltip.style.left = `${left}px`;
  };

  const hideHoverHelpTooltip = () => {
    if (!hoverHelpTooltip) return;
    hoverHelpTooltip.setAttribute('hidden', '');
  };

  const updateHoverHelpTooltip = target => {
    hoverHelpCurrentTarget = target || null;
    if (!hoverHelpActive || !hoverHelpTooltip || !target) {
      hideHoverHelpTooltip();
      return;
    }
    const textParts = collectHoverHelpText(target);
    if (!textParts.length) {
      hideHoverHelpTooltip();
      return;
    }
    hoverHelpTooltip.textContent = textParts.join(' ');
    positionHoverHelpTooltip(target);
    hoverHelpTooltip.removeAttribute('hidden');
  };

  const canInteractDuringHoverHelp = target => {
    if (!hoverHelpActive || !target) return false;
    return !!target.closest('[data-allow-hover-help], #settingsButton, #settingsDialog');
  };

  // Exit hover-help mode and clean up tooltip/cursor state
  const stopHoverHelp = () => {
    hoverHelpActive = false;
    hoverHelpCurrentTarget = null;
    if (hoverHelpTooltip) {
      hoverHelpTooltip.remove();
      hoverHelpTooltip = null;
    }
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };

  // Start hover-help mode: close the dialog, create the tooltip element and
  // switch the cursor to the standard help cursor.
  const startHoverHelp = () => {
    hoverHelpActive = true;
    closeHelp();
    document.body.style.cursor = 'help';
    document.body.classList.add('hover-help-active');
    hoverHelpTooltip = document.createElement('div');
    hoverHelpTooltip.id = 'hoverHelpTooltip';
    hoverHelpTooltip.setAttribute('role', 'tooltip');
    hoverHelpTooltip.setAttribute('hidden', '');
    document.body.appendChild(hoverHelpTooltip);
  };

  const refreshTooltipPosition = () => {
    if (hoverHelpActive && hoverHelpTooltip && hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };

  document.addEventListener('mouseover', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    const target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });

  document.addEventListener('focusin', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    const target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });

  document.addEventListener('focusout', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    if (!e.relatedTarget || !findHoverHelpTarget(e.relatedTarget)) {
      hoverHelpCurrentTarget = null;
      hideHoverHelpTooltip();
    }
  });

  window.addEventListener('scroll', refreshTooltipPosition, true);
  window.addEventListener('resize', refreshTooltipPosition);

  // Prevent interacting with controls like dropdowns while hover help is active
  document.addEventListener(
    'mousedown',
    e => {
      if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
        e.preventDefault();
      }
    },
    true
  );

  document.addEventListener('click', e => {
    // Any click while in hover-help mode exits the mode and removes the tooltip
    if (!hoverHelpActive) return;
    if (canInteractDuringHoverHelp(e.target)) {
      return;
    }
    e.preventDefault();
    stopHoverHelp();
  });

  if (hoverHelpButton) {
    // Dedicated button inside the dialog to enable hover-help mode
    hoverHelpButton.addEventListener('click', e => {
      e.stopPropagation();
      startHoverHelp(); // activate tooltip mode
    });
  }

  const focusFeatureSearchInput = () => {
    if (!featureSearch) return;
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu?.contains(featureSearch)) {
      openSideMenu();
    }
    if (typeof featureSearch.scrollIntoView === 'function') {
      featureSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    try {
      featureSearch.focus({ preventScroll: true });
    } catch {
      featureSearch.focus();
    }
    if (typeof featureSearch.select === 'function') {
      featureSearch.select();
    }
    featureSearch.showPicker?.();
  };

  runFeatureSearch = query => {
    const rawQuery = typeof query === 'string' ? query : featureSearch?.value || '';
    const originalNormalized = normalizeSearchValue(rawQuery);
    const value = rawQuery.trim();
    if (!value) return;
    const lower = value.toLowerCase();
    const isHelp = lower.endsWith(' (help)');
    const clean = isHelp ? value.slice(0, -7).trim() : value;
    const cleanKey = searchKey(clean);
    const cleanTokens = searchTokens(clean);

    const helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
    const deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
    const featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
    const helpScore = helpMatch?.score || 0;
    const deviceScore = deviceMatch?.score || 0;
    const featureScore = featureMatch?.score || 0;
    const deviceStrong = deviceMatch ? STRONG_SEARCH_MATCH_TYPES.has(deviceMatch.matchType) : false;
    const featureStrong = featureMatch ? STRONG_SEARCH_MATCH_TYPES.has(featureMatch.matchType) : false;
    const bestNonHelpScore = Math.max(deviceScore, featureScore);
    const hasStrongNonHelp = deviceStrong || featureStrong;
    const preferHelp =
      !!helpMatch &&
      (isHelp || (!hasStrongNonHelp && helpScore > bestNonHelpScore));

    if (!isHelp && !preferHelp) {
      const shouldUseDevice =
        !!deviceMatch &&
        (!featureMatch ||
          (deviceStrong && !featureStrong) ||
          (deviceStrong === featureStrong &&
            (deviceScore > featureScore ||
              (deviceScore === featureScore && featureMatch?.matchType !== 'exactKey'))));
      if (shouldUseDevice) {
        const device = deviceMatch.value;
        if (device && device.select) {
          device.select.value = device.value;
          device.select.dispatchEvent(new Event('change', { bubbles: true }));
          if (device.label) {
            updateFeatureSearchValue(device.label, originalNormalized);
          }
          focusFeatureElement(device.select);
          return;
        }
      }
      if (featureMatch) {
        const feature = featureMatch.value;
        const featureEl = feature?.element || feature;
        if (featureEl) {
          const label = feature?.label || featureEl.textContent?.trim();
          if (label) {
            updateFeatureSearchValue(label, originalNormalized);
          }
          focusFeatureElement(featureEl);
          return;
        }
      }
    }
    if (helpMatch) {
      const helpEntry = helpMatch.value || {};
      const section = helpEntry.section;
      openHelp();
      if (helpSearch) {
        helpSearch.value = clean;
        filterHelp();
      }
      if (section) {
        if (section.hasAttribute('hidden')) {
          section.removeAttribute('hidden');
          if (helpNoResults) {
            helpNoResults.setAttribute('hidden', '');
          }
          syncHelpQuickLinksVisibility();
        }
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        highlightHelpSection(section);
        const quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
        if (helpQuickLinksList) {
          helpQuickLinksList
            .querySelectorAll('.help-quick-link.active')
            .forEach(btn => btn.classList.remove('active'));
        }
        if (quickLink && quickLink.button) {
          quickLink.button.classList.add('active');
        }
      }
      return;
    }
    openHelp();
    if (helpSearch) {
      helpSearch.value = clean;
      filterHelp();
    }
  };

  if (featureSearch) {
    const handle = () => runFeatureSearch(featureSearch.value);
    featureSearch.addEventListener('change', handle);
    featureSearch.addEventListener('input', () => {
      updateFeatureSearchSuggestions(featureSearch.value);
      featureSearch.showPicker?.();
    });
    featureSearch.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handle();
      } else if (e.key === 'Escape' && featureSearch.value) {
        featureSearch.value = '';
        restoreFeatureSearchDefaults();
        featureSearch.showPicker?.();
        e.preventDefault();
      }
    });
  }

  // Wire up button clicks and search field interactions
  helpButton.addEventListener('click', toggleHelp);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  if (helpSearch) helpSearch.addEventListener('input', filterHelp);
  if (helpSearchClear) helpSearchClear.addEventListener('click', () => {
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      helpSearch.focus();
    }
  });

  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    // Keyboard shortcuts controlling the help dialog and hover-help mode
    if (hoverHelpActive && e.key === 'Escape') {
      // Escape exits hover-help mode
      stopHoverHelp();
    } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
      // Escape closes the help dialog
      e.preventDefault();
      closeHelp();
    } else if (
      e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)
    ) {
      e.preventDefault();
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertAccentColor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    } else if (
      e.key === 'F1' ||
      ((e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey))
    ) {
      // F1 or Ctrl+/ toggles the dialog even while typing
      e.preventDefault();
      toggleHelp();
    } else if (
      e.key === '/' &&
      !isTextField &&
      (!helpDialog || !isDialogOpen(helpDialog))
    ) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (
      (e.key === '?' && !isTextField) ||
      (e.key.toLowerCase() === 'h' && !isTextField)
    ) {
      // Plain ? or H opens the dialog when not typing in a field
      e.preventDefault();
      toggleHelp();
    } else if (
      isDialogOpen(helpDialog) &&
      ((e.key === '/' && !isTextField) || (e.key.toLowerCase() === 'f' && (e.ctrlKey || e.metaKey)))
    ) {
      // When the dialog is open, / or Ctrl+F moves focus to the search box
      e.preventDefault();
      if (helpSearch) helpSearch.focus();
    } else if (e.key === ',' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (settingsButton) settingsButton.click();
    } else if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (e.key.toLowerCase() === 'd' && !isTextField) {
      darkModeEnabled = !document.body.classList.contains('dark-mode');
      applyDarkMode(darkModeEnabled);
      try {
        localStorage.setItem('darkMode', darkModeEnabled);
      } catch (err) {
        console.warn('Could not save dark mode preference', err);
      }
    } else if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (e.key.toLowerCase() === 'p' && !isTextField) {
      persistPinkModePreference(!document.body.classList.contains('pink-mode'));
    }
  });

  helpDialog.addEventListener('click', e => {
    // Clicking the semi-transparent backdrop (not the dialog content) closes it
    if (e.target === helpDialog) closeHelp();
  });

  helpDialog.addEventListener('cancel', e => {
    e.preventDefault();
    closeHelp();
  });
}

// Initial calculation and language set after DOM is ready
// Initialize immediately if DOM is already loaded (e.g. when scripts are
// injected after `DOMContentLoaded` fired). Otherwise wait for the event.


const scenarioIcons = {
  Indoor: iconGlyph('\uF194', ICON_FONT_KEYS.ESSENTIAL),
  Outdoor: iconGlyph('\uF278', ICON_FONT_KEYS.ESSENTIAL),
  Studio: iconGlyph('\uF128', ICON_FONT_KEYS.FILM),
  Tripod: iconGlyph('\uF12C', ICON_FONT_KEYS.FILM),
  Handheld: iconGlyph('\uE93B', ICON_FONT_KEYS.UICONS),
  Easyrig: iconGlyph('\uE15B', ICON_FONT_KEYS.UICONS),
  'Cine Saddle': iconGlyph('\uF01B', ICON_FONT_KEYS.UICONS),
  Steadybag: iconGlyph('\uE925', ICON_FONT_KEYS.UICONS),
  Dolly: iconGlyph('\uF109', ICON_FONT_KEYS.FILM),
  Slider: iconGlyph('\uE112', ICON_FONT_KEYS.UICONS),
  Steadicam: iconGlyph('\uEFBD', ICON_FONT_KEYS.UICONS),
  Gimbal: iconGlyph('\uEA9C', ICON_FONT_KEYS.UICONS),
  Trinity: iconGlyph('\uEA4E', ICON_FONT_KEYS.UICONS),
  Rollcage: iconGlyph('\uF04C', ICON_FONT_KEYS.UICONS),
  'Car Mount': iconGlyph('\uE35B', ICON_FONT_KEYS.UICONS),
  Jib: iconGlyph('\uE553', ICON_FONT_KEYS.UICONS),
  'Undersling mode': iconGlyph('\uE0D8', ICON_FONT_KEYS.UICONS),
  Crane: iconGlyph('\uE554', ICON_FONT_KEYS.UICONS),
  'Remote Head': ICON_GLYPHS.controller,
  'Extreme cold (snow)': iconGlyph('\uF0FB', ICON_FONT_KEYS.UICONS),
  'Extreme rain': iconGlyph('\uE4A6', ICON_FONT_KEYS.UICONS),
  'Extreme heat': iconGlyph('\uE80F', ICON_FONT_KEYS.UICONS),
  'Rain Machine': iconGlyph('\uF153', ICON_FONT_KEYS.UICONS),
  'Slow Motion': iconGlyph('\uF373', ICON_FONT_KEYS.UICONS),
  'Battery Belt': ICON_GLYPHS.batteryBolt
};

function updateSelectIconBoxes(sel) {
  if (!sel) return;
  let container = sel.parentNode.querySelector('.icon-box-summary');
  if (!container) {
    container = document.createElement('div');
    container.className = 'icon-box-summary';
    sel.parentNode.insertBefore(container, sel.nextSibling);
  }
  container.innerHTML = '';
  const opts = sel.multiple
    ? Array.from(sel.selectedOptions)
    : (sel.value ? [sel.options[sel.selectedIndex]] : []);
  opts.forEach(opt => {
    const box = document.createElement('span');
    box.className = 'icon-box';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon icon-glyph';
    let glyph = projectFieldIcons[sel.name] || ICON_GLYPHS.pin;
    if (opt.dataset.icon) {
      glyph = iconGlyph(opt.dataset.icon, opt.dataset.iconFont || ICON_FONT_KEYS.UICONS);
    }
    applyIconGlyph(iconSpan, glyph);
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(opt.value));
    container.appendChild(box);
  });
}

function updateRequiredScenariosSummary() {
  if (!requiredScenariosSelect || !requiredScenariosSummary) return;
  requiredScenariosSummary.innerHTML = '';
  let selected = Array.from(requiredScenariosSelect.selectedOptions).map(o => o.value);
  const hasDolly = selected.includes('Dolly');
  if (remoteHeadOption) {
    if (!hasDolly) {
      remoteHeadOption.hidden = true;
      remoteHeadOption.selected = false;
      selected = selected.filter(v => v !== 'Remote Head');
    } else {
      remoteHeadOption.hidden = false;
    }
  }
  if (
    hasDolly &&
    monitorSelect &&
    (!monitorSelect.value || monitorSelect.value === 'None')
  ) {
    const defaultMonitor = 'SmallHD Ultra 7';
    if (devices?.monitors?.[defaultMonitor]) {
      if (!Array.from(monitorSelect.options).some(o => o.value === defaultMonitor)) {
        const opt = document.createElement('option');
        opt.value = defaultMonitor;
        opt.textContent = defaultMonitor;
        monitorSelect.appendChild(opt);
      }
      monitorSelect.value = defaultMonitor;
      monitorSelect.dispatchEvent(new Event('change'));
    }
  }
  if (videoDistributionSelect) {
    const ensureOption = val => {
      let opt = Array.from(videoDistributionSelect.options).find(o => o.value === val);
      if (!opt) {
        opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        videoDistributionSelect.appendChild(opt);
      }
    };
    ensureOption('DoP Monitor 7" handheld');
    ensureOption('DoP Monitor 15-21"');
  }
  selected.forEach(val => {
    const box = document.createElement('span');
    box.className = 'scenario-box';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'scenario-icon icon-glyph';
    applyIconGlyph(iconSpan, scenarioIcons[val] || ICON_GLYPHS.pin);
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(val));
    requiredScenariosSummary.appendChild(box);
  });
  if (tripodPreferencesRow) {
    if (selected.includes('Tripod')) {
      tripodPreferencesRow.classList.remove('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.remove('hidden');
      if (tripodPreferencesSection) tripodPreferencesSection.classList.remove('hidden');
    } else {
      tripodPreferencesRow.classList.add('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.add('hidden');
      if (tripodPreferencesSection) tripodPreferencesSection.classList.add('hidden');
      if (tripodHeadBrandSelect) tripodHeadBrandSelect.value = '';
      if (tripodBowlSelect) tripodBowlSelect.value = '';
      if (tripodTypesSelect) Array.from(tripodTypesSelect.options).forEach(o => { o.selected = false; });
      if (tripodSpreaderSelect) tripodSpreaderSelect.value = '';
      updateTripodOptions();
    }
  }
}

function initApp() {
  if (sharedLinkRow) {
    sharedLinkRow.classList.remove('hidden');
  }
  populateEnvironmentDropdowns();
  populateLensDropdown();
  populateFilterDropdown();
  if (filterSelectElem) {
    filterSelectElem.addEventListener('change', renderFilterDetails);
    filterSelectElem.addEventListener('change', () => {
      saveCurrentSession();
      saveCurrentGearList();
      checkSetupChanged();
    });
    renderFilterDetails();
  }
  populateUserButtonDropdowns();
  document.querySelectorAll('#projectForm select')
    .forEach(sel => {
      attachSelectSearch(sel);
      initFavoritableSelect(sel);
    });
  setupInstallBanner();
  setLanguage(currentLang);
  maybeShowIosPwaHelp();
  resetDeviceForm();
  ensureDefaultProjectInfoSnapshot();
  restoreSessionState();
  applySharedSetupFromUrl();
  if (requiredScenariosSelect) {
    requiredScenariosSelect.addEventListener('change', updateRequiredScenariosSummary);
    updateRequiredScenariosSummary();
  }
  if (tripodHeadBrandSelect) {
    tripodHeadBrandSelect.addEventListener('change', updateTripodOptions);
  }
  if (tripodBowlSelect) {
    tripodBowlSelect.addEventListener('change', updateTripodOptions);
  }
  updateTripodOptions();
  updateViewfinderExtensionVisibility();
  updateCalculations();
  applyFilters();
}

function populateEnvironmentDropdowns() {
  const tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    tempSelect.appendChild(emptyOpt);
    for (let i = -20; i <= 50; i++) {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = i;
      tempSelect.appendChild(opt);
    }
  }

}

function populateLensDropdown() {
  if (!lensSelect) return;

  lensSelect.innerHTML = '';
  const lensData = devices && devices.lenses;

  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }

  if (!lensSelect.multiple) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    lensSelect.appendChild(emptyOpt);
  }
  Object.keys(lensData).sort(localeSort).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    const lens = lensData[name] || {};
    const attrs = [];
    if (lens.weight_g) attrs.push(`${lens.weight_g}g`);
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push(`${lens.frontDiameterMm}mm clamp-on`);
      else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
    if (minFocus) attrs.push(`${minFocus}m min focus`);
    opt.textContent = attrs.length ? `${name} (${attrs.join(', ')})` : name;
    lensSelect.appendChild(opt);
  });
}

function populateCameraPropertyDropdown(selectId, property, selected = '') {
  const dropdown = document.getElementById(selectId);
  if (!dropdown) return;

  dropdown.innerHTML = '';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  dropdown.appendChild(emptyOpt);

  const camKey = cameraSelect && cameraSelect.value;
  const values =
    camKey && devices && devices.cameras && devices.cameras[camKey]
      ? devices.cameras[camKey][property]
      : null;
  if (Array.isArray(values)) {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      if (v === selected) opt.selected = true;
      dropdown.appendChild(opt);
    });
  }
}

function populateRecordingResolutionDropdown(selected = '') {
  populateCameraPropertyDropdown('recordingResolution', 'resolutions', selected);
}

function populateSensorModeDropdown(selected = '') {
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}

function populateCodecDropdown(selected = '') {
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}

function populateFilterDropdown() {
  if (filterSelectElem && devices && Array.isArray(devices.filterOptions)) {
    if (!filterSelectElem.multiple) {
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      filterSelectElem.appendChild(emptyOpt);
    }
    devices.filterOptions.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      filterSelectElem.appendChild(opt);
    });
  }
}

const filterId = t => t.replace(/[^a-z0-9]/gi, '_');

function getFilterValueConfig(type) {
  switch (type) {
    case 'IRND':
      return { opts: ['0.3','0.6','0.9','1.2','1.5','1.8','2.1','2.5'], defaults: ['0.3','1.2'] };
    case 'Diopter':
      return { opts: ['+1/4','+1/2','+1','+2','+3','+4'], defaults: ['+1/2','+1','+2','+4'] };
    case 'ND Grad HE':
      return {
        opts: ['0.3 HE Vertical','0.6 HE Vertical','0.9 HE Vertical','1.2 HE Vertical','0.3 HE Horizontal','0.6 HE Horizontal','0.9 HE Horizontal','1.2 HE Horizontal'],
        defaults: ['0.3 HE Horizontal','0.6 HE Horizontal','0.9 HE Horizontal']
      };
    case 'ND Grad SE':
      return {
        opts: ['0.3 SE Vertical','0.6 SE Vertical','0.9 SE Vertical','1.2 SE Vertical','0.3 SE Horizontal','0.6 SE Horizontal','0.9 SE Horizontal','1.2 SE Horizontal'],
        defaults: ['0.3 SE Horizontal','0.6 SE Horizontal','0.9 SE Horizontal']
      };
    default:
      return { opts: ['1','1/2','1/4','1/8','1/16'], defaults: ['1/2','1/4','1/8'] };
  }
}

function createFilterSizeSelect(type, selected = DEFAULT_FILTER_SIZE, options = {}) {
  const { includeId = true, idPrefix = 'filter-size-' } = options;
  const sel = document.createElement('select');
  if (includeId) {
    sel.id = `${idPrefix}${filterId(type)}`;
  }
  let sizes = [DEFAULT_FILTER_SIZE, '4x4', '6x6', '95mm'];
  if (type === 'Rota-Pol') sizes = [DEFAULT_FILTER_SIZE, '6x6', '95mm'];
  sizes.forEach(s => {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    if (s === selected) o.selected = true;
    sel.appendChild(o);
  });
  return sel;
}

/* exported createFilterValueSelect */
function createFilterValueSelect(type, selected) {
  const sel = document.createElement('select');
  sel.id = `filter-values-${filterId(type)}`;
  // Allow selecting multiple strengths for a given filter
  // Use both the property and attribute to ensure HTML serialization
  sel.multiple = true;
  sel.setAttribute('multiple', '');
  const { opts, defaults = [] } = getFilterValueConfig(type);
  const selectedVals = Array.isArray(selected)
    ? selected.slice()
    : defaults.slice();
  const syncOption = (option, isSelected) => {
    option.selected = isSelected;
    if (isSelected) {
      option.setAttribute('selected', '');
    } else {
      option.removeAttribute('selected');
    }
  };
  const syncCheckbox = (checkbox, isChecked) => {
    checkbox.checked = isChecked;
    if (isChecked) {
      checkbox.setAttribute('checked', '');
    } else {
      checkbox.removeAttribute('checked');
    }
  };
  opts.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    syncOption(opt, selectedVals.includes(o));
    sel.appendChild(opt);
  });
  // Hidden select holds the values; checkboxes provide the UI
  sel.size = opts.length;
  sel.style.display = 'none';
  const container = document.createElement('span');
  container.className = 'filter-values-container';
  opts.forEach(o => {
    const lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = o;
    syncCheckbox(cb, selectedVals.includes(o));
    cb.addEventListener('change', () => {
      const opt = Array.from(sel.options).find(opt => opt.value === o);
      if (opt) syncOption(opt, cb.checked);
      syncCheckbox(cb, cb.checked);
      sel.dispatchEvent(new Event('change'));
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(o));
    container.appendChild(lbl);
  });
  sel.addEventListener('change', () => {
    Array.from(container.querySelectorAll('input[type="checkbox"]')).forEach(cb => {
      const opt = Array.from(sel.options).find(opt => opt.value === cb.value);
      if (opt) syncOption(opt, opt.selected);
      syncCheckbox(cb, !!opt && opt.selected);
    });
  });
  container.appendChild(sel);
  return { container, select: sel };
}

function resolveFilterDisplayInfo(type, size = DEFAULT_FILTER_SIZE) {
  switch (type) {
    case 'Diopter':
      return { label: 'Schneider CF DIOPTER FULL GEN2', gearName: 'Schneider CF DIOPTER FULL GEN2' };
    case 'Clear':
      return { label: 'Clear Filter', gearName: 'Clear Filter' };
    case 'IRND':
      return { label: 'IRND Filter', gearName: 'IRND Filter' };
    case 'Pol':
      return { label: 'Pol Filter', gearName: 'Pol Filter' };
    case 'Rota-Pol': {
      if (size === '6x6') {
        return {
          label: 'ARRI Rota Pola Filter Frame (6x6)',
          gearName: 'ARRI Rota Pola Filter Frame (6x6)'
        };
      }
      if (size === '95mm') {
        return {
          label: 'Tilta 95mm Polarizer Filter for Tilta Mirage',
          gearName: 'Tilta 95mm Polarizer Filter for Tilta Mirage'
        };
      }
      return {
        label: 'ARRI Rota Pola Filter Frame',
        gearName: 'ARRI Rota Pola Filter Frame'
      };
    }
    case 'ND Grad HE':
      return { label: 'ND Grad HE Filter', gearName: 'ND Grad HE Filter' };
    case 'ND Grad SE':
      return { label: 'ND Grad SE Filter', gearName: 'ND Grad SE Filter' };
    default:
      return { label: `${type} Filter Set`, gearName: `${type} Filter Set` };
  }
}

function buildFilterGearEntries(filters = []) {
  const entries = [];
  filters.forEach(({ type, size = DEFAULT_FILTER_SIZE, values }) => {
    if (!type) return;
    const sizeValue = size || DEFAULT_FILTER_SIZE;
    const idBase = `filter-${filterId(type)}`;
    switch (type) {
      case 'Diopter': {
        entries.push({
          id: `${idBase}-frame`,
          gearName: 'ARRI Diopter Frame 138mm',
          label: 'ARRI Diopter Frame 138mm',
          type: '',
          size: '',
          values: []
        });
        const diopterValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: `${idBase}-set`,
          gearName: 'Schneider CF DIOPTER FULL GEN2',
          label: 'Schneider CF DIOPTER FULL GEN2',
          type,
          size: '',
          values: diopterValues
        });
        break;
      }
      case 'Clear': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: []
        });
        break;
      }
      case 'Pol': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: []
        });
        break;
      }
      case 'Rota-Pol': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        const displaySize = label.includes(sizeValue) ? '' : sizeValue;
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: displaySize,
          values: []
        });
        break;
      }
      case 'ND Grad HE':
      case 'ND Grad SE': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        const gradValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: gradValues
        });
        break;
      }
      default: {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        const filterValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: filterValues
        });
      }
    }
  });
  return entries;
}

function formatFilterEntryText(entry) {
  const details = [];
  if (entry.size) details.push(entry.size);
  if (entry.values && entry.values.length) details.push(entry.values.join(', '));
  const suffix = details.length ? ` (${details.join(' • ')})` : '';
  return `1x ${entry.label}${suffix}`;
}

function updateGearListFilterEntries(entries = []) {
  if (!gearListOutput) return;
  const entryMap = new Map(entries.map(entry => [entry.id, entry]));
  gearListOutput.querySelectorAll('[data-filter-entry]').forEach(span => {
    const entryId = span.getAttribute('data-filter-entry');
    if (!entryId) return;
    const entry = entryMap.get(entryId);
    if (!entry) return;
    span.textContent = formatFilterEntryText(entry);
    span.setAttribute('data-gear-name', entry.gearName);
    span.setAttribute('data-filter-label', entry.label);
    if (entry.type) {
      span.setAttribute('data-filter-type', entry.type);
    } else {
      span.removeAttribute('data-filter-type');
    }
  });
}

function getGearListFilterDetailsContainer() {
  return gearListOutput ? gearListOutput.querySelector('#gearListFilterDetails') : null;
}

function filterTypeNeedsValueSelect(type) {
  return type === 'Diopter'
    || type === 'IRND'
    || type === 'ND Grad HE'
    || type === 'ND Grad SE'
    || (type !== 'Clear' && type !== 'Pol' && type !== 'Rota-Pol');
}

function createFilterStorageValueSelect(type, selected) {
  const select = document.createElement('select');
  select.id = `filter-values-${filterId(type)}`;
  select.multiple = true;
  select.setAttribute('multiple', '');
  select.hidden = true;
  select.setAttribute('aria-hidden', 'true');
  const { opts, defaults = [] } = getFilterValueConfig(type);
  const chosen = Array.isArray(selected) ? selected.slice() : defaults.slice();
  opts.forEach(value => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    if (chosen.includes(value)) {
      opt.selected = true;
      opt.setAttribute('selected', '');
    }
    select.appendChild(opt);
  });
  return select;
}

function renderFilterDetailsStorage(details) {
  if (!filterDetailsStorage) return;
  filterDetailsStorage.innerHTML = '';
  if (!details.length) {
    filterDetailsStorage.hidden = true;
    return;
  }
  filterDetailsStorage.hidden = true;
  details.forEach(detail => {
    const { type, size, values, needsSize, needsValues } = detail;
    if (needsSize) {
      const sizeSelect = createFilterSizeSelect(type, size);
      sizeSelect.hidden = true;
      sizeSelect.setAttribute('aria-hidden', 'true');
      sizeSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(sizeSelect);
    }
    if (needsValues) {
      const valuesSelect = createFilterStorageValueSelect(type, values);
      valuesSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(valuesSelect);
    }
  });
}

function renderGearListFilterDetails(details) {
  const container = getGearListFilterDetailsContainer();
  if (!container) return;
  container.innerHTML = '';
  if (!details.length) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');
  details.forEach(detail => {
    const { type, label, size, values, needsSize, needsValues } = detail;
    const row = document.createElement('div');
    row.className = 'filter-detail';
    const heading = document.createElement('div');
    heading.className = 'filter-detail-label';
    heading.textContent = label;
    row.appendChild(heading);
    const controls = document.createElement('div');
    controls.className = 'filter-detail-controls';
    if (needsSize) {
      const sizeLabel = document.createElement('label');
      sizeLabel.className = 'filter-detail-size';
      const sizeText = document.createElement('span');
      sizeText.className = 'filter-detail-sublabel';
      sizeText.textContent = 'Size';
      const sizeSelect = createFilterSizeSelect(type, size, { includeId: false });
      sizeSelect.setAttribute('data-storage-id', `filter-size-${filterId(type)}`);
      sizeLabel.append(sizeText, sizeSelect);
      controls.appendChild(sizeLabel);
    }
    if (needsValues) {
      const valuesWrap = document.createElement('div');
      valuesWrap.className = 'filter-detail-values';
      const valueLabel = document.createElement('span');
      valueLabel.className = 'filter-detail-sublabel';
      valueLabel.textContent = 'Strengths';
      const optionsWrap = document.createElement('span');
      optionsWrap.className = 'filter-values-container';
      optionsWrap.setAttribute('data-storage-values', `filter-values-${filterId(type)}`);
      const { opts, defaults = [] } = getFilterValueConfig(type);
      const currentValues = values == null ? defaults : (Array.isArray(values) ? values : []);
      opts.forEach(value => {
        const lbl = document.createElement('label');
        lbl.className = 'filter-value-option';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = value;
        if (currentValues.includes(value)) {
          cb.checked = true;
          cb.setAttribute('checked', '');
        }
        lbl.append(cb, document.createTextNode(value));
        optionsWrap.appendChild(lbl);
      });
      valuesWrap.append(valueLabel, optionsWrap);
      controls.appendChild(valuesWrap);
    }
    row.appendChild(controls);
    container.appendChild(row);
  });
}

function syncGearListFilterSize(storageId, value) {
  const storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  if (storageSelect.value !== value) {
    storageSelect.value = value;
  }
  storageSelect.dispatchEvent(new Event('change'));
}

function syncGearListFilterValue(storageId, value, isSelected) {
  const storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  let changed = false;
  Array.from(storageSelect.options).forEach(opt => {
    if (opt.value !== value) return;
    if (opt.selected !== isSelected) {
      opt.selected = isSelected;
      changed = true;
      if (isSelected) {
        opt.setAttribute('selected', '');
      } else {
        opt.removeAttribute('selected');
      }
    }
  });
  if (changed) {
    storageSelect.dispatchEvent(new Event('change'));
  }
}

function renderFilterDetails() {
  if (!filterSelectElem) return;
  const selected = Array.from(filterSelectElem.selectedOptions).map(o => o.value).filter(Boolean);
  const existingSelections = collectFilterSelections();
  const existingTokens = existingSelections
    ? parseFilterTokens(existingSelections)
    : (currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : []);
  const existingMap = new Map(existingTokens.map(token => [token.type, token]));
  const details = selected.map(type => {
    const prev = existingMap.get(type) || {};
    const size = prev.size || DEFAULT_FILTER_SIZE;
    const needsSize = type !== 'Diopter';
    const needsValues = filterTypeNeedsValueSelect(type);
    const { label } = resolveFilterDisplayInfo(type, size);
    return {
      type,
      label,
      size,
      values: Array.isArray(prev.values) ? prev.values.slice() : [],
      needsSize,
      needsValues
    };
  });
  renderFilterDetailsStorage(details);
  renderGearListFilterDetails(details);
  if (matteboxSelect) {
    const needsSwing = selected.some(t => t === 'ND Grad HE' || t === 'ND Grad SE');
    if (needsSwing) matteboxSelect.value = 'Swing Away';
  }
}

function handleFilterDetailChange() {
  if (!filterSelectElem) return;
  const filterStr = collectFilterSelections();
  const entries = buildFilterGearEntries(parseFilterTokens(filterStr));
  updateGearListFilterEntries(entries);
  if (gearListOutput) adjustGearListSelectWidths(gearListOutput);
  saveCurrentSession();
  saveCurrentGearList();
  checkSetupChanged();
  renderFilterDetails();
}

function collectFilterSelections() {
  if (!filterSelectElem) return '';
  const selected = Array.from(filterSelectElem.selectedOptions).map(o => o.value);
  const existing = currentProjectInfo && currentProjectInfo.filter
    ? parseFilterTokens(currentProjectInfo.filter)
    : [];
  const existingMap = Object.fromEntries(existing.map(t => [t.type, t]));
  const tokens = selected.map(type => {
    const sizeSel = document.getElementById(`filter-size-${filterId(type)}`);
    const valSel = document.getElementById(`filter-values-${filterId(type)}`);
    const prev = existingMap[type] || {};
    const size = sizeSel ? sizeSel.value : (prev.size || DEFAULT_FILTER_SIZE);
    let vals;
    const needsValues = filterTypeNeedsValueSelect(type);
    if (valSel) {
      vals = Array.from(valSel.selectedOptions).map(o => o.value);
    } else if (Array.isArray(prev.values) && prev.values.length) {
      vals = prev.values.slice();
    } else {
      vals = [];
    }
    let valueSegment = '';
    if (needsValues) {
      valueSegment = vals.length ? `:${vals.join('|')}` : ':!';
    }
    return `${type}:${size}${valueSegment}`;
  });
  return tokens.join(',');
}

function parseFilterTokens(str) {
  if (!str) return [];
  return str.split(',').map(s => {
    const parts = s.split(':').map(p => p.trim());
    const type = parts[0];
    const size = parts[1] || DEFAULT_FILTER_SIZE;
    const vals = parts.length > 2 ? parts[2] : undefined;
    let values;
    if (vals === undefined) {
      values = undefined;
    } else if (vals === '' || vals === '!') {
      values = [];
    } else {
      values = vals.split('|').map(v => v.trim()).filter(Boolean);
    }
    return { type, size, values };
  }).filter(t => t.type);
}

function applyFilterSelectionsToGearList(info = currentProjectInfo) {
  if (!gearListOutput) return;
  const tokens = info && info.filter ? parseFilterTokens(info.filter) : [];
  const entries = buildFilterGearEntries(tokens);
  updateGearListFilterEntries(entries);
  adjustGearListSelectWidths(gearListOutput);
}

function normalizeGearNameForComparison(name) {
  if (!name) return '';
  let normalized = String(name);
  if (typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD');
  } else if (typeof String.prototype.normalize === 'function') {
    normalized = String.prototype.normalize.call(normalized, 'NFD');
  }
  normalized = normalized.replace(/[\u0300-\u036f]/g, '');
  normalized = normalized.replace(/\bfuer\b/gi, 'for');
  normalized = normalized.replace(/\bfur\b/gi, 'for');
  normalized = normalized.toLowerCase();
  return normalized.replace(/[^a-z0-9]+/g, '');
}

function buildFilterSelectHtml(filters = [], precomputedEntries) {
  const entries = Array.isArray(precomputedEntries)
    ? precomputedEntries
    : buildFilterGearEntries(filters);
  const summaryHtml = entries.map(entry => {
    const attrs = [
      'class="gear-item"',
      `data-gear-name="${escapeHtml(entry.gearName)}"`,
      `data-filter-entry="${escapeHtml(entry.id)}"`,
      `data-filter-label="${escapeHtml(entry.label)}"`
    ];
    if (entry.type) attrs.push(`data-filter-type="${escapeHtml(entry.type)}"`);
    const text = formatFilterEntryText(entry);
    return `<span ${attrs.join(' ')}>${escapeHtml(text)}</span>`;
  }).join('<br>');
  const detailsContainer = entries.length
    ? '<div id="gearListFilterDetails" class="hidden" aria-live="polite"></div>'
    : '';
  return [summaryHtml, detailsContainer].filter(Boolean).join('<br>');
}

function collectFilterAccessories(filters = []) {
  const items = [];
  filters.forEach(({ type }) => {
    switch (type) {
      case 'ND Grad HE':
      case 'ND Grad SE':
        break;
      default:
        break;
    }
  });
  return items;
}

function populateUserButtonDropdowns() {
  const functions = [
    'Toggle LUT',
    'False Color',
    'Peaking',
    'Anamorphic Desqueeze',
    'Surround View',
    '1:1 Zoom',
    'Playback',
    'Record',
    'Zoom',
    'Frame Lines',
    'Frame Grab'
  ];
  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    functions.forEach(fn => {
      const opt = document.createElement('option');
      opt.value = fn;
      opt.textContent = fn;
      sel.appendChild(opt);
    });
    sel.size = functions.length;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Export functions for testing in Node environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION,
    closeSideMenu,
    openSideMenu,
    setupSideMenu,
    setupResponsiveControls,
    setLanguage,
    updateCalculations,
    setBatteryPlates,
    getBatteryPlates,
    setRecordingMedia,
    getRecordingMedia,
    applyDarkMode,
    applyPinkMode,
    applyHighContrast,
    generatePrintableOverview,
    generateGearListHtml,
    ensureZoomRemoteSetup,
    encodeSharedSetup,
    decodeSharedSetup,
    applySharedSetupFromUrl,
    applySharedSetup,
    updateBatteryPlateVisibility,
    updateBatteryOptions,
    renderSetupDiagram,
    enableDiagramInteractions,
    updateDiagramLegend,
    cameraFizPort,
    controllerCamPort,
    controllerDistancePort,
    detectBrand,
    connectionLabel,
    generateConnectorSummary,
    exportDiagramSvg,
    fixPowerInput,
    ensureList,
    normalizeVideoType,
    normalizeFizConnectorType,
    normalizeViewfinderType,
    normalizePowerPortType,
    getCurrentSetupKey,
    renderFeedbackTable,
    saveCurrentGearList,
    getGearListSelectors,
    applyGearListSelectors,
    setSelectValue,
    autoSaveCurrentSetup,
    saveCurrentSession,
    restoreSessionState,
    displayGearAndRequirements,
    deleteCurrentGearList,
    ensureGearListActions,
    bindGearListEasyrigListener,
    populateSelect,
    populateLensDropdown,
    populateCameraPropertyDropdown,
    populateRecordingResolutionDropdown,
    populateSensorModeDropdown,
    populateCodecDropdown,
    updateRequiredScenariosSummary,
    updateMonitoringConfigurationOptions,
    updateViewfinderExtensionVisibility,
    scenarioIcons,
    collectProjectFormData,
    populateProjectForm,
    renderFilterDetails,
    collectFilterSelections,
    parseFilterTokens,
    applyFilterSelectionsToGearList,
    setCurrentProjectInfo,
    getCurrentProjectInfo,
    crewRoles,
    formatFullBackupFilename,
    computeGearListCount,
    autoBackup,
    createSettingsBackup,
    captureStorageSnapshot,
    extractBackupSections,
    searchKey,
    searchTokens,
    findBestSearchMatch,
    runFeatureSearch,
    __featureSearchInternals: {
      featureMap,
      deviceMap,
      helpMap,
      featureSearchEntries,
      featureSearchDefaultOptions,
      featureSearchInput: featureSearch,
      featureListElement: featureList,
      restoreFeatureSearchDefaults,
      updateFeatureSearchSuggestions,
    },
    collectAutoGearCatalogNames,
    applyAutoGearRulesToTableHtml,
    exportAutoGearRules,
    importAutoGearRulesFromData,
    createAutoGearBackup,
    restoreAutoGearBackup,
    getAutoGearRules,
    syncAutoGearRulesFromStorage,
    parseDeviceDatabaseImport,
    countDeviceDatabaseEntries,
    sanitizeShareFilename,
    ensureJsonExtension,
    getDefaultShareFilename,
    promptForSharedFilename,
    confirmAutoGearSelection,
    configureSharedImportOptions,
    resolveSharedImportMode,
    resetPlannerStateAfterFactoryReset,
  };
}
