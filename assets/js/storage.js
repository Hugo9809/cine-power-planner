// storage.js - Handles reading from and writing to localStorage.
/* global texts, currentLang */

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';
const FAVORITES_STORAGE_KEY = 'cameraPowerPlanner_favorites';
const DEVICE_SCHEMA_CACHE_KEY = 'cameraPowerPlanner_schemaCache';
const CUSTOM_FONT_STORAGE_KEY = 'cameraPowerPlanner_customFonts';
const CUSTOM_LOGO_STORAGE_KEY = 'customLogo';
const AUTO_GEAR_RULES_STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
const AUTO_GEAR_SEEDED_STORAGE_KEY = 'cameraPowerPlanner_autoGearSeeded';
const AUTO_GEAR_BACKUPS_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';
const AUTO_GEAR_PRESETS_STORAGE_KEY = 'cameraPowerPlanner_autoGearPresets';
const AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearActivePreset';
const AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY = 'cameraPowerPlanner_autoGearShowBackups';

const STORAGE_BACKUP_SUFFIX = '__backup';
const RAW_STORAGE_BACKUP_KEYS = new Set([
  CUSTOM_FONT_STORAGE_KEY,
  CUSTOM_LOGO_STORAGE_KEY,
]);

const DEVICE_COLLECTION_KEYS = [
  'cameras',
  'monitors',
  'video',
  'viewfinders',
  'directorMonitors',
  'iosVideo',
  'videoAssist',
  'media',
  'lenses',
  'batteries',
  'batteryHotswaps',
  'wirelessReceivers',
];

const FIZ_COLLECTION_KEYS = ['motors', 'handUnits', 'controllers', 'distance'];

const ACCESSORY_COLLECTION_KEYS = [
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

const getStorageManager = () =>
  typeof navigator !== 'undefined' &&
  navigator &&
  typeof navigator.storage === 'object'
    ? navigator.storage
    : null;

// Safely detect usable localStorage. Some environments (like private browsing)
// may block access and throw errors. If unavailable, fall back to
// sessionStorage when possible so data persists across reloads within the same
// tab. When neither storage option is available we fall back to a simple
// in-memory store to avoid runtime errors even though the data will be lost on
// reload.
const SAFE_LOCAL_STORAGE = (() => {
  const TEST_KEY = '__storage_test__';

  const verifyStorage = (storage) => {
    if (!storage) return null;
    storage.setItem(TEST_KEY, '1');
    storage.removeItem(TEST_KEY);
    return storage;
  };

  if (typeof window !== 'undefined') {
    try {
      if ('localStorage' in window) {
        const storage = verifyStorage(window.localStorage);
        if (storage) return storage;
      }
    } catch (e) {
      console.warn('localStorage is unavailable:', e);
    }

    try {
      if ('sessionStorage' in window) {
        const storage = verifyStorage(window.sessionStorage);
        if (storage) {
          console.warn('Falling back to sessionStorage; data persists for this tab only.');
          return storage;
        }
      }
    } catch (e) {
      console.warn('sessionStorage fallback is unavailable:', e);
    }
  }

  alertStorageError();

  // Fallback: minimal in-memory storage implementation
  let memoryStore = {};
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      delete memoryStore[key];
    },
    clear() {
      memoryStore = {};
    },
  };
})();

let persistentStorageRequestPromise = null;

function requestPersistentStorage() {
  if (persistentStorageRequestPromise) {
    return persistentStorageRequestPromise;
  }

  const storageManager = getStorageManager();
  if (!storageManager || typeof storageManager.persist !== 'function') {
    persistentStorageRequestPromise = Promise.resolve({
      supported: Boolean(storageManager),
      granted: false,
      alreadyGranted: false,
    });
    return persistentStorageRequestPromise;
  }

  persistentStorageRequestPromise = (async () => {
    let alreadyGranted = false;
    const supportsPersistedCheck = typeof storageManager.persisted === 'function';

    if (supportsPersistedCheck) {
      try {
        alreadyGranted = await storageManager.persisted();
      } catch (persistedError) {
        console.warn('Unable to determine persistent storage state', persistedError);
      }
    }

    if (alreadyGranted) {
      return {
        supported: true,
        granted: true,
        alreadyGranted: true,
      };
    }

    try {
      const granted = await storageManager.persist();
      if (!granted && supportsPersistedCheck) {
        try {
          const persisted = await storageManager.persisted();
          if (persisted) {
            return {
              supported: true,
              granted: true,
              alreadyGranted: true,
            };
          }
        } catch (verifyError) {
          console.warn('Unable to verify persistent storage after request', verifyError);
        }
      }

      return {
        supported: true,
        granted,
        alreadyGranted: false,
      };
    } catch (error) {
      console.warn('Persistent storage request failed', error);
      return {
        supported: true,
        granted: false,
        alreadyGranted: false,
        error,
      };
    }
  })();

  return persistentStorageRequestPromise;
}

if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  requestPersistentStorage();
}

// Helper to check for plain objects
function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function alertStorageError() {
  if (typeof window === 'undefined' || typeof window.alert !== 'function') return;
  let msg = 'Storage error: Unable to access local data. Changes may not be saved.';
  try {
    if (typeof texts !== 'undefined') {
      const lang = typeof currentLang !== 'undefined' && texts[currentLang]
        ? currentLang
        : 'en';
      msg = texts[lang]?.alertStorageError || msg;
    }
  } catch (err) {
    void err;
    // ignore and fall back to default
  }
  window.alert(msg);
}

// Generic helpers for storage access
function loadJSONFromStorage(
  storage,
  key,
  errorMessage,
  defaultValue = null,
  options = {},
) {
  if (!storage) return defaultValue;

  const {
    disableBackup = false,
    backupKey,
    validate,
    restoreIfMissing = false,
  } = options || {};

  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  let shouldAlert = false;

  const parseRawValue = (raw, label) => {
    if (raw === null || raw === undefined) {
      return { ok: false, reason: 'missing' };
    }
    try {
      const parsed = JSON.parse(raw);
      if (typeof validate === 'function' && !validate(parsed)) {
        console.warn(`${errorMessage} Invalid data${label ? ` (${label})` : ''}.`);
        shouldAlert = true;
        return { ok: false, reason: 'invalid' };
      }
      return { ok: true, value: parsed, raw };
    } catch (err) {
      console.error(`${errorMessage}${label ? ` (${label})` : ''}`, err);
      shouldAlert = true;
      return { ok: false, reason: 'error' };
    }
  };

  let primaryRaw = null;
  try {
    primaryRaw = storage.getItem(key);
  } catch (err) {
    console.error(`${errorMessage} (read)`, err);
    shouldAlert = true;
  }

  const primary = parseRawValue(primaryRaw, '');
  if (primary.ok) {
    return primary.value;
  }

  const shouldAttemptBackup = useBackup && (shouldAlert || restoreIfMissing);

  if (shouldAttemptBackup) {
    let backupRaw = null;
    try {
      backupRaw = storage.getItem(fallbackKey);
    } catch (err) {
      console.error(`${errorMessage} (backup read)`, err);
      shouldAlert = true;
    }

    const backup = parseRawValue(backupRaw, 'backup');
    if (backup.ok) {
      if (shouldAlert) {
        console.warn(`Recovered ${key} from backup copy.`);
      }
      if (backup.raw !== null && backup.raw !== undefined) {
        try {
          storage.setItem(key, backup.raw);
        } catch (restoreError) {
          console.warn(`Unable to restore primary copy for ${key} from backup`, restoreError);
        }
      }
      return backup.value;
    }
  }

  if (shouldAlert) {
    alertStorageError();
  }

  return defaultValue;
}

function saveJSONToStorage(
  storage,
  key,
  value,
  errorMessage,
  successMessage,
  options = {},
) {
  if (!storage) return;

  const { disableBackup = false, backupKey } = options || {};
  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  let serialized;
  try {
    serialized = JSON.stringify(value);
  } catch (serializationError) {
    console.error(errorMessage, serializationError);
    alertStorageError();
    return;
  }

  try {
    storage.setItem(key, serialized);
    if (useBackup) {
      try {
        storage.setItem(fallbackKey, serialized);
      } catch (backupError) {
        console.warn(`Unable to update backup copy for ${key}`, backupError);
        alertStorageError();
      }
    }
    if (successMessage) {
      console.log(successMessage);
    }
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }
}

// Generic helper to delete a key from storage with consistent error handling
function deleteFromStorage(storage, key, errorMessage, options = {}) {
  if (!storage) return;

  const { disableBackup = false, backupKey } = options || {};
  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }

  if (useBackup) {
    try {
      storage.removeItem(fallbackKey);
    } catch (backupError) {
      console.error(`${errorMessage} (backup)`, backupError);
      alertStorageError();
    }
  }
}

function loadFlagFromStorage(storage, key, errorMessage) {
  if (!storage) return false;
  try {
    return storage.getItem(key) === '1';
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
    return false;
  }
}

function saveFlagToStorage(storage, key, value, errorMessage) {
  if (!storage) return;
  try {
    if (value) {
      storage.setItem(key, '1');
    } else {
      storage.removeItem(key);
    }
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }
}

// Attempt to load JSON from a primary storage. If missing, try a fallback
// storage and migrate the data to the primary one. Useful for gradually moving
// keys from sessionStorage to localStorage.
function loadWithMigration(
  primary,
  fallback,
  key,
  primaryLoadMsg,
  fallbackLoadMsg,
  saveMsg,
  deleteMsg,
  loadOptions,
) {
  const value = loadJSONFromStorage(primary, key, primaryLoadMsg, null, loadOptions);
  if (value !== null) return value;
  if (!fallback) return null;
  const migrated = loadJSONFromStorage(fallback, key, fallbackLoadMsg, null, loadOptions);
  if (migrated !== null) {
    saveJSONToStorage(primary, key, migrated, saveMsg);
    deleteFromStorage(fallback, key, deleteMsg);
    return migrated;
  }
  return null;
}

// Generate a unique name by appending numeric suffixes if needed
// Comparisons are case-insensitive and ignore surrounding whitespace.
// Optionally accepts a set of normalized names to avoid recomputing the
// normalised lookup on each call when generating many names in a loop.
function generateUniqueName(base, usedNames, normalizedNames) {
  const trimmedBase = base.trim();
  let name = trimmedBase;
  let suffix = 2;

  const normalized = normalizedNames || new Set(
    [...usedNames].map((n) => n.trim().toLowerCase()),
  );
  let candidate = trimmedBase.toLowerCase();
  while (normalized.has(candidate)) {
    name = `${trimmedBase} (${suffix++})`;
    candidate = name.toLowerCase();
  }
  usedNames.add(name);
  normalized.add(candidate);
  return name;
}

// --- Session State Storage ---
// Store the current session (unsaved setup) in localStorage so it survives
// full app reloads.
function loadSessionState() {
  return loadWithMigration(
    SAFE_LOCAL_STORAGE,
    typeof sessionStorage !== 'undefined' ? sessionStorage : null,
    SESSION_STATE_KEY,
    "Error loading session state from localStorage:",
    "Error loading session state from sessionStorage:",
    "Error saving session state to localStorage:",
    "Error deleting session state from sessionStorage:",
    { validate: (value) => value === null || isPlainObject(value) },
  );
}

function saveSessionState(state) {
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    SESSION_STATE_KEY,
    state,
    "Error saving session state to localStorage:",
  );
}

// --- Device Data Storage ---
function loadDeviceData() {
  const parsedData = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    DEVICE_STORAGE_KEY,
    "Error loading device data from localStorage:",
    null,
    { validate: (value) => value === null || isPlainObject(value) },
  );
  if (!isPlainObject(parsedData)) {
    return null;
  }

  const data = { ...parsedData };
  let changed = false;

  function ensureObject(target, key) {
    if (!isPlainObject(target[key])) {
      target[key] = {};
      changed = true;
    }
  }

  DEVICE_COLLECTION_KEYS.forEach((key) => {
    ensureObject(data, key);
  });

  if (!isPlainObject(data.fiz)) {
    data.fiz = {};
    changed = true;
  }
  FIZ_COLLECTION_KEYS.forEach((key) => {
    ensureObject(data.fiz, key);
  });

  if (!isPlainObject(data.accessories)) {
    data.accessories = {};
    changed = true;
  }
  ACCESSORY_COLLECTION_KEYS.forEach((key) => {
    ensureObject(data.accessories, key);
  });

  if (!Array.isArray(data.filterOptions)) {
    data.filterOptions = Array.isArray(parsedData.filterOptions)
      ? parsedData.filterOptions.slice()
      : [];
    changed = true;
  }

  if (changed && SAFE_LOCAL_STORAGE) {
    SAFE_LOCAL_STORAGE.setItem(DEVICE_STORAGE_KEY, JSON.stringify(data));
  }

  console.log("Device data loaded from localStorage.");
  return data;
}

function saveDeviceData(deviceData) {
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    DEVICE_STORAGE_KEY,
    deviceData,
    "Error saving device data to localStorage:",
    "Device data saved to localStorage.",
  );
}

// --- Setup Data Storage ---
function normalizeSetups(rawData) {
  if (!rawData) {
    return { data: {}, changed: false };
  }

  if (Array.isArray(rawData)) {
    const obj = {};
    const used = new Set();
    const normalized = new Set();
    for (let idx = 0; idx < rawData.length; idx += 1) {
      const item = rawData[idx];
      if (!isPlainObject(item)) {
        continue;
      }
      const base = item.name || item.setupName || `Setup ${idx + 1}`;
      const key = generateUniqueName(base, used, normalized);
      obj[key] = item;
    }
    return { data: obj, changed: true };
  }

  if (!isPlainObject(rawData)) {
    return { data: {}, changed: true };
  }

  const normalized = {};
  let changed = false;
  Object.keys(rawData).forEach((name) => {
    const value = rawData[name];
    if (isPlainObject(value)) {
      normalized[name] = value;
    } else {
      changed = true;
    }
  });

  if (!changed) {
    return { data: rawData, changed: false };
  }

  return { data: normalized, changed: true };
}

function loadSetups() {
  const parsedData = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    SETUP_STORAGE_KEY,
    "Error loading setups from localStorage:",
    null,
    {
      validate: (value) =>
        value === null || Array.isArray(value) || isPlainObject(value),
    },
  );
  const { data: setups, changed } = normalizeSetups(parsedData);
  if (changed && SAFE_LOCAL_STORAGE) {
    SAFE_LOCAL_STORAGE.setItem(SETUP_STORAGE_KEY, JSON.stringify(setups));
  }
  return setups;
}

function saveSetups(setups) {
  const { data: normalizedSetups } = normalizeSetups(setups);
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    SETUP_STORAGE_KEY,
    normalizedSetups,
    "Error saving setups to localStorage:",
    "Setups saved to localStorage.",
  );
}

function updateSetups(callback) {
  const setups = loadSetups();
  const { result, changed = true } = callback(setups) || {};
  if (changed) {
    saveSetups(setups);
  }
  return result;
}

function saveSetup(name, setup) {
  updateSetups((setups) => {
    setups[name] = setup;
    return { changed: true };
  });
}

function loadSetup(name) {
  const setups = loadSetups();
  return setups[name];
}

function deleteSetup(name) {
  updateSetups((setups) => {
    if (Object.prototype.hasOwnProperty.call(setups, name)) {
      delete setups[name];
      return { changed: true };
    }
    return { changed: false };
  });
}

function renameSetup(oldName, newName) {
  return updateSetups((setups) => {
    if (!Object.prototype.hasOwnProperty.call(setups, oldName)) {
      return { result: null, changed: false };
    }
    const sanitized = newName.trim();
    // Guard against empty or whitespace-only names. Renaming to such a value
    // would create an empty key in the setups object. In that case simply keep
    // the original name.
    if (!sanitized) {
      return { result: oldName, changed: false };
    }
    if (oldName.trim().toLowerCase() === sanitized.toLowerCase()) {
      return { result: oldName, changed: false };
    }
    const used = new Set(Object.keys(setups));
    used.delete(oldName);
    const target = generateUniqueName(sanitized, used);
    setups[target] = setups[oldName];
    delete setups[oldName];
    return { result: target, changed: true };
  });
}

// --- Project Storage ---
function normalizeProject(data) {
  if (typeof data === "string") {
    return { gearList: data, projectInfo: null };
  }
  if (isPlainObject(data)) {
    // New format { gearList, projectInfo }
    if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
      const normalized = {
        gearList:
          typeof data.gearList === "string" || (data.gearList && typeof data.gearList === "object")
            ? data.gearList
            : "",
        projectInfo: isPlainObject(data.projectInfo) ? data.projectInfo : null,
      };
      if (Array.isArray(data.autoGearRules) && data.autoGearRules.length) {
        normalized.autoGearRules = data.autoGearRules;
      }
      return normalized;
    }
    // Legacy format { projectHtml, gearHtml }
    if (Object.prototype.hasOwnProperty.call(data, "projectHtml") || Object.prototype.hasOwnProperty.call(data, "gearHtml")) {
      return {
        gearList: { projectHtml: data.projectHtml || "", gearHtml: data.gearHtml || "" },
        projectInfo: null,
      };
    }
  }
  return null;
}

const LEGACY_PROJECT_ROOT_KEYS = new Set([
  "gearList",
  "projectInfo",
  "projectHtml",
  "gearHtml",
  "autoGearRules",
]);

const NORMALIZED_PROJECT_KEYS = new Set(["gearList", "projectInfo", "autoGearRules"]);

function isNormalizedProjectEntry(entry) {
  if (!isPlainObject(entry)) {
    return false;
  }
  const keys = Object.keys(entry);
  if (!keys.every((key) => NORMALIZED_PROJECT_KEYS.has(key))) {
    return false;
  }
  const { gearList, projectInfo } = entry;
  if (
    typeof gearList !== "string" &&
    !(isPlainObject(gearList) &&
      Object.keys(gearList).every((key) => typeof gearList[key] === "string"))
  ) {
    return false;
  }
  if (projectInfo !== null && !isPlainObject(projectInfo)) {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(entry, "autoGearRules")) {
    return Array.isArray(entry.autoGearRules) && entry.autoGearRules.length > 0;
  }
  return true;
}

function readAllProjectsFromStorage() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    PROJECT_STORAGE_KEY,
    "Error loading project from localStorage:",
    null,
    {
      validate: (value) =>
        value === null
        || typeof value === "string"
        || Array.isArray(value)
        || isPlainObject(value),
    },
  );
  const projects = {};
  let changed = false;

  if (parsed === null || parsed === undefined) {
    return { projects, changed: false };
  }

  if (typeof parsed === "string") {
    const normalized = normalizeProject(parsed);
    if (normalized) {
      projects[""] = normalized;
    }
    return { projects, changed: true };
  }

  if (Array.isArray(parsed)) {
    const usedNames = new Set();
    const normalizedNames = new Set();
    parsed.forEach((item, index) => {
      const normalized = normalizeProject(item);
      if (!normalized) {
        changed = true;
        return;
      }
      const baseName =
        isPlainObject(item) && typeof item.name === "string"
          ? item.name.trim()
          : `Project ${index + 1}`;
      const candidate = baseName || `Project ${index + 1}`;
      const unique = generateUniqueName(candidate, usedNames, normalizedNames);
      projects[unique] = normalized;
    });
    return { projects, changed: true };
  }

  if (!isPlainObject(parsed)) {
    return { projects, changed: true };
  }

  const keys = Object.keys(parsed);
  const maybeLegacy =
    keys.length > 0 && keys.every((key) => LEGACY_PROJECT_ROOT_KEYS.has(key));

  if (maybeLegacy) {
    const normalized = normalizeProject(parsed);
    if (normalized) {
      projects[""] = normalized;
    }
    return { projects, changed: true };
  }

  keys.forEach((key) => {
    const normalized = normalizeProject(parsed[key]);
    if (normalized) {
      projects[key] = normalized;
      if (!isNormalizedProjectEntry(parsed[key])) {
        changed = true;
      }
    } else {
      changed = true;
    }
  });

  return { projects, changed };
}

function persistAllProjects(projects, successMessage) {
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    PROJECT_STORAGE_KEY,
    projects,
    "Error saving project to localStorage:",
    successMessage,
  );
}

function loadProject(name) {
  const { projects, changed } = readAllProjectsFromStorage();
  if (changed && SAFE_LOCAL_STORAGE) {
    persistAllProjects(projects);
  }
  if (name === undefined) {
    return projects;
  }
  const key = name || "";
  return Object.prototype.hasOwnProperty.call(projects, key) ? projects[key] : null;
}

function saveProject(name, project) {
  if (!isPlainObject(project)) return;
  const normalized = normalizeProject(project) || { gearList: "", projectInfo: null };
  const { projects } = readAllProjectsFromStorage();
  projects[name || ""] = normalized;
  persistAllProjects(projects, "Project saved to localStorage.");
}

function deleteProject(name) {
  if (name === undefined) {
    deleteFromStorage(
      SAFE_LOCAL_STORAGE,
      PROJECT_STORAGE_KEY,
      "Error deleting project from localStorage:",
    );
    return;
  }

  const key = name || "";
  const { projects } = readAllProjectsFromStorage();
  if (!Object.prototype.hasOwnProperty.call(projects, key)) {
    return;
  }
  delete projects[key];
  if (Object.keys(projects).length === 0) {
    deleteFromStorage(
      SAFE_LOCAL_STORAGE,
      PROJECT_STORAGE_KEY,
      "Error deleting project from localStorage:",
    );
  } else {
    persistAllProjects(projects);
  }
}

function createProjectImporter() {
  const { projects } = readAllProjectsFromStorage();
  const usedNames = new Set(Object.keys(projects));
  const normalizedNames = new Set(
    [...usedNames].map((name) => name.trim().toLowerCase()),
  );
  const defaultName = "Imported project";

  return (rawName, project, fallbackName = defaultName) => {
    const normalizedProject = normalizeProject(project);
    if (!normalizedProject) return;

    const candidates = [];
    if (typeof rawName === "string") {
      candidates.push(rawName.trim());
    }
    if (isPlainObject(project)) {
      if (typeof project.name === "string") {
        candidates.push(project.name.trim());
      }
      const info = project.projectInfo;
      if (isPlainObject(info) && typeof info.projectName === "string") {
        candidates.push(info.projectName.trim());
      }
    }

    const fallback = typeof fallbackName === "string" && fallbackName.trim()
      ? fallbackName.trim()
      : defaultName;

    if (candidates.includes("") && !normalizedNames.has("")) {
      usedNames.add("");
      normalizedNames.add("");
      saveProject("", normalizedProject);
      return;
    }

    const baseName = candidates.find((candidate) => candidate) || fallback;
    const uniqueName = generateUniqueName(baseName, usedNames, normalizedNames);
    saveProject(uniqueName, normalizedProject);
  };
}

function importProjectCollection(collection, ensureImporter, fallbackLabel = "Imported project") {
  if (typeof collection === "string") {
    ensureImporter()("", collection);
    return true;
  }

  if (Array.isArray(collection)) {
    const importProject = ensureImporter();
    collection.forEach((proj, idx) => {
      if (proj === null || proj === undefined) return;
      const rawName =
        isPlainObject(proj) && typeof proj.name === "string"
          ? proj.name
          : "";
      importProject(rawName, proj, `${fallbackLabel} ${idx + 1}`);
    });
    return true;
  }

  if (isPlainObject(collection)) {
    const importProject = ensureImporter();
    Object.entries(collection).forEach(([name, proj]) => {
      importProject(name, proj);
    });
    return true;
  }

  return false;
}

// --- Favorites Storage ---
function loadFavorites() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    FAVORITES_STORAGE_KEY,
    "Error loading favorites from localStorage:",
    {},
    { validate: (value) => value === null || isPlainObject(value) },
  );
  return isPlainObject(parsed) ? parsed : {};
}

function saveFavorites(favs) {
  if (!isPlainObject(favs)) return;
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    FAVORITES_STORAGE_KEY,
    favs,
    "Error saving favorites to localStorage:",
  );
}

// --- User Feedback Storage ---
function loadFeedback() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    FEEDBACK_STORAGE_KEY,
    "Error loading feedback from localStorage:",
    null,
    { validate: (value) => value === null || isPlainObject(value) },
  );
  if (isPlainObject(parsed)) {
    return parsed;
  }
  return {};
}

function saveFeedback(feedback) {
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    FEEDBACK_STORAGE_KEY,
    feedback,
    "Error saving feedback to localStorage:",
    "Feedback saved to localStorage.",
  );
}

// --- Automatic Gear Rules Storage ---
function loadAutoGearRules() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_RULES_STORAGE_KEY,
    "Error loading automatic gear rules from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  return Array.isArray(parsed) ? parsed : [];
}

function saveAutoGearRules(rules) {
  const safeRules = Array.isArray(rules) ? rules : [];
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_RULES_STORAGE_KEY,
    safeRules,
    "Error saving automatic gear rules to localStorage:",
  );
}

function loadAutoGearBackups() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_BACKUPS_STORAGE_KEY,
    "Error loading automatic gear rule backups from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  return Array.isArray(parsed) ? parsed : [];
}

function saveAutoGearBackups(backups) {
  const safeBackups = Array.isArray(backups) ? backups : [];
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_BACKUPS_STORAGE_KEY,
    safeBackups,
    "Error saving automatic gear rule backups to localStorage:",
  );
}

function loadAutoGearSeedFlag() {
  return loadFlagFromStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_SEEDED_STORAGE_KEY,
    "Error loading automatic gear seed flag from localStorage:",
  );
}

function saveAutoGearSeedFlag(flag) {
  saveFlagToStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_SEEDED_STORAGE_KEY,
    Boolean(flag),
    "Error saving automatic gear seed flag to localStorage:",
  );
}

function loadAutoGearPresets() {
  const presets = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    "Error loading automatic gear presets from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  return Array.isArray(presets) ? presets : [];
}

function saveAutoGearPresets(presets) {
  const safePresets = Array.isArray(presets) ? presets : [];
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    safePresets,
    "Error saving automatic gear presets to localStorage:",
  );
}

function loadAutoGearActivePresetId() {
  if (!SAFE_LOCAL_STORAGE) {
    return '';
  }
  try {
    const value = SAFE_LOCAL_STORAGE.getItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error('Error loading automatic gear active preset from localStorage:', error);
    alertStorageError();
    return '';
  }
}

function saveAutoGearActivePresetId(presetId) {
  if (!SAFE_LOCAL_STORAGE) {
    return;
  }
  try {
    if (presetId) {
      SAFE_LOCAL_STORAGE.setItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, presetId);
    } else {
      SAFE_LOCAL_STORAGE.removeItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error saving automatic gear active preset to localStorage:', error);
    alertStorageError();
  }
}

function loadAutoGearBackupVisibility() {
  return loadFlagFromStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY,
    "Error loading automatic gear backup visibility from localStorage:",
  );
}

function saveAutoGearBackupVisibility(flag) {
  saveFlagToStorage(
    SAFE_LOCAL_STORAGE,
    AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY,
    Boolean(flag),
    "Error saving automatic gear backup visibility to localStorage:",
  );
}

// --- Clear All Stored Data ---
function clearAllData() {
  const msg = "Error clearing storage:";
  deleteFromStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, SETUP_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, FEEDBACK_STORAGE_KEY, msg);
  // Favorites were added later and can be forgotten if not explicitly cleared.
  // Ensure they are removed alongside other stored planner data.
  deleteFromStorage(SAFE_LOCAL_STORAGE, FAVORITES_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_RULES_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUPS_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_SEEDED_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_PRESETS_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, DEVICE_SCHEMA_CACHE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, SESSION_STATE_KEY, msg);
  if (typeof sessionStorage !== 'undefined') {
    deleteFromStorage(sessionStorage, SESSION_STATE_KEY, msg);
  }
  console.log("All planner data cleared from storage.");
}

// --- Export/Import All Planner Data ---
  function readLocalStorageValue(key) {
    if (!SAFE_LOCAL_STORAGE || typeof SAFE_LOCAL_STORAGE.getItem !== 'function') {
      return null;
    }

    try {
      const value = SAFE_LOCAL_STORAGE.getItem(key);
      if (value === null || value === undefined) {
        if (RAW_STORAGE_BACKUP_KEYS.has(key)) {
          try {
            const backupValue = SAFE_LOCAL_STORAGE.getItem(`${key}${STORAGE_BACKUP_SUFFIX}`);
            if (backupValue !== null && backupValue !== undefined) {
              return String(backupValue);
            }
          } catch (backupError) {
            console.warn('Unable to read backup key for export from storage', key, backupError);
          }
        }
        return null;
      }
      return String(value);
    } catch (error) {
      console.warn('Unable to read storage key for backup', key, error);
      return null;
    }
  }

  function parseStoredBoolean(value) {
    if (value === null) return null;
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return null;
  }

  function collectPreferenceSnapshot() {
    const preferences = {};

    const darkMode = parseStoredBoolean(readLocalStorageValue('darkMode'));
    if (darkMode !== null) {
      preferences.darkMode = darkMode;
    }

    const pinkMode = parseStoredBoolean(readLocalStorageValue('pinkMode'));
    if (pinkMode !== null) {
      preferences.pinkMode = pinkMode;
    }

    const highContrast = parseStoredBoolean(readLocalStorageValue('highContrast'));
    if (highContrast !== null) {
      preferences.highContrast = highContrast;
    }

    const showAutoBackups = parseStoredBoolean(readLocalStorageValue('showAutoBackups'));
    if (showAutoBackups !== null) {
      preferences.showAutoBackups = showAutoBackups;
    }

    const accentColor = readLocalStorageValue('accentColor');
    if (accentColor) {
      preferences.accentColor = accentColor;
    }

    const fontSize = readLocalStorageValue('fontSize');
    if (fontSize) {
      preferences.fontSize = fontSize;
    }

    const fontFamily = readLocalStorageValue('fontFamily');
    if (fontFamily) {
      preferences.fontFamily = fontFamily;
    }

    const language = readLocalStorageValue('language');
    if (language) {
      preferences.language = language;
    }

    return preferences;
  }

  function normalizeCustomFontEntries(entries) {
    if (!Array.isArray(entries)) {
      return [];
    }
    return entries
      .map((entry) => ({
        id: entry && typeof entry.id === 'string' ? entry.id : null,
        name: entry && typeof entry.name === 'string' ? entry.name : '',
        data: entry && typeof entry.data === 'string' ? entry.data : '',
      }))
      .filter((entry) => entry.id && entry.name && entry.data);
  }

  function readStoredCustomFonts() {
    const raw = readLocalStorageValue(CUSTOM_FONT_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return normalizeCustomFontEntries(parsed);
    } catch (error) {
      console.warn('Failed to parse stored custom fonts for backup', error);
      return [];
    }
  }

  function exportAllData() {
    const payload = {
      devices: loadDeviceData(),
      setups: loadSetups(),
      session: loadSessionState(),
      feedback: loadFeedback(),
      project: loadProject(),
      favorites: loadFavorites(),
      autoGearRules: loadAutoGearRules(),
      autoGearBackups: loadAutoGearBackups(),
      autoGearSeeded: loadAutoGearSeedFlag(),
      autoGearPresets: loadAutoGearPresets(),
      autoGearActivePresetId: loadAutoGearActivePresetId(),
      autoGearShowBackups: loadAutoGearBackupVisibility(),
    };

    const preferences = collectPreferenceSnapshot();
    if (Object.keys(preferences).length) {
      payload.preferences = preferences;
    }

    const customLogo = readLocalStorageValue(CUSTOM_LOGO_STORAGE_KEY);
    if (customLogo) {
      payload.customLogo = customLogo;
    }

    const customFonts = readStoredCustomFonts();
    if (customFonts.length) {
      payload.customFonts = customFonts;
    }

    return payload;
  }

  function safeSetLocalStorage(key, value) {
    if (!SAFE_LOCAL_STORAGE || typeof SAFE_LOCAL_STORAGE.setItem !== 'function') {
      return;
    }

    const useBackup = RAW_STORAGE_BACKUP_KEYS.has(key);
    const backupKey = `${key}${STORAGE_BACKUP_SUFFIX}`;

    try {
      if (value === null || value === undefined) {
        SAFE_LOCAL_STORAGE.removeItem(key);
        if (useBackup) {
          try {
            SAFE_LOCAL_STORAGE.removeItem(backupKey);
          } catch (backupError) {
            console.warn('Unable to remove backup key during import', backupKey, backupError);
          }
        }
      } else {
        const storedValue = String(value);
        SAFE_LOCAL_STORAGE.setItem(key, storedValue);
        if (useBackup) {
          try {
            SAFE_LOCAL_STORAGE.setItem(backupKey, storedValue);
          } catch (backupError) {
            console.warn('Unable to update backup key during import', backupKey, backupError);
            alertStorageError();
          }
        }
      }
    } catch (error) {
      console.warn('Unable to persist storage key during import', key, error);
      if (useBackup) {
        alertStorageError();
      }
    }
  }

function importAllData(allData) {
  if (!isPlainObject(allData)) {
    return;
  }

  if (allData.devices) {
    saveDeviceData(allData.devices);
  }
  if (allData.setups) {
    saveSetups(allData.setups);
  }
  if (allData.session) {
    saveSessionState(allData.session);
  }
  if (allData.feedback) {
    saveFeedback(allData.feedback);
  }
    if (allData.favorites) {
      saveFavorites(allData.favorites);
    }
    if (isPlainObject(allData.preferences)) {
      const prefs = allData.preferences;
      const booleanPrefs = ['darkMode', 'pinkMode', 'highContrast', 'showAutoBackups'];
      booleanPrefs.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(prefs, key) && typeof prefs[key] === 'boolean') {
          safeSetLocalStorage(key, prefs[key]);
        }
      });
      const stringPrefs = ['accentColor', 'fontSize', 'fontFamily', 'language'];
      stringPrefs.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(prefs, key)) {
          const value = prefs[key];
          if (typeof value === 'string' && value) {
            safeSetLocalStorage(key, value);
          }
        }
      });
    }
    if (Object.prototype.hasOwnProperty.call(allData, 'customLogo')) {
      const logo = allData.customLogo;
      if (typeof logo === 'string' && logo) {
        safeSetLocalStorage(CUSTOM_LOGO_STORAGE_KEY, logo);
      } else {
        safeSetLocalStorage(CUSTOM_LOGO_STORAGE_KEY, null);
      }
    }
    if (Object.prototype.hasOwnProperty.call(allData, 'customFonts')) {
      const fonts = normalizeCustomFontEntries(allData.customFonts);
      if (fonts.length) {
        try {
          safeSetLocalStorage(CUSTOM_FONT_STORAGE_KEY, JSON.stringify(fonts));
        } catch (error) {
          console.warn('Unable to store imported custom fonts', error);
        }
      } else {
        safeSetLocalStorage(CUSTOM_FONT_STORAGE_KEY, null);
      }
    }
    if (Object.prototype.hasOwnProperty.call(allData, 'autoGearRules')) {
      saveAutoGearRules(allData.autoGearRules);
    }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearBackups')) {
    saveAutoGearBackups(allData.autoGearBackups);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearSeeded')) {
    saveAutoGearSeedFlag(allData.autoGearSeeded);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearPresets')) {
    saveAutoGearPresets(allData.autoGearPresets);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearActivePresetId')) {
    saveAutoGearActivePresetId(
      typeof allData.autoGearActivePresetId === 'string' ? allData.autoGearActivePresetId : ''
    );
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearShowBackups')) {
    saveAutoGearBackupVisibility(Boolean(allData.autoGearShowBackups));
  }

  let importProjectEntry = null;
  const ensureProjectImporter = () => {
    if (!importProjectEntry) {
      importProjectEntry = createProjectImporter();
    }
    return importProjectEntry;
  };

  if (allData.project) {
    importProjectCollection(allData.project, ensureProjectImporter);
  } else if (allData.projects) {
    // Legacy plural key. Accept object map or array of named projects.
    importProjectCollection(allData.projects, ensureProjectImporter);
  } else if (typeof allData.gearList === "string") {
    // Legacy export format stored just the gear list HTML
    ensureProjectImporter()("", { gearList: allData.gearList });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadDeviceData,
    saveDeviceData,
    loadSetups,
    saveSetups,
    saveSetup,
    loadSetup,
    deleteSetup,
    renameSetup,
    loadProject,
    saveProject,
    deleteProject,
    loadSessionState,
    saveSessionState,
    loadFavorites,
    saveFavorites,
    loadAutoGearBackups,
    saveAutoGearBackups,
    loadFeedback,
    saveFeedback,
    clearAllData,
    exportAllData,
    importAllData,
    loadAutoGearRules,
    saveAutoGearRules,
    loadAutoGearSeedFlag,
    saveAutoGearSeedFlag,
    loadAutoGearPresets,
    saveAutoGearPresets,
    loadAutoGearActivePresetId,
    saveAutoGearActivePresetId,
    loadAutoGearBackupVisibility,
    saveAutoGearBackupVisibility,
    requestPersistentStorage,
  };
}
