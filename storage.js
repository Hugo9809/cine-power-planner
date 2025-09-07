// storage.js - Handles reading from and writing to localStorage.
/* global texts, currentLang */

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';

// Create an in-memory fallback implementing the subset of the Storage API we
// rely on. This keeps the app functional when no persistent storage is
// available (e.g. in private browsing modes) while clearly warning the user
// that data will not be saved across sessions.
function createMemoryStorage() {
  const store = {};
  return {
    getItem: (key) => (Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null),
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
  };
}

// Safely detect usable storage. Some environments (like private browsing) may
// block access and throw errors. If localStorage is unavailable, fall back to
// sessionStorage or an in-memory store.
const SAFE_LOCAL_STORAGE = (() => {
  if (typeof window === 'undefined') {
    return createMemoryStorage();
  }

  const testKey = '__storage_test__';
  try {
    if ('localStorage' in window) {
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    console.warn('localStorage is unavailable:', e);
  }

  try {
    if ('sessionStorage' in window) {
      window.sessionStorage.setItem(testKey, '1');
      window.sessionStorage.removeItem(testKey);
      console.warn('Falling back to sessionStorage. Data may be lost on tab close.');
      alertStorageError();
      return window.sessionStorage;
    }
  } catch (e) {
    console.warn('sessionStorage is unavailable:', e);
  }

  console.warn('Falling back to in-memory storage. Data will not persist across sessions.');
  alertStorageError();
  return createMemoryStorage();
})();

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
function loadJSONFromStorage(storage, key, errorMessage, defaultValue = null) {
  if (!storage) return defaultValue;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
    return defaultValue;
  }
}

function saveJSONToStorage(storage, key, value, errorMessage, successMessage) {
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(value));
    if (successMessage) {
      console.log(successMessage);
    }
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }
}

// Generic helper to delete a key from storage with consistent error handling
function deleteFromStorage(storage, key, errorMessage) {
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }
}

// Generate a unique name by appending numeric suffixes if needed
// Comparisons are case-insensitive and ignore surrounding whitespace.
function generateUniqueName(base, usedNames) {
  const trimmedBase = base.trim();
  let name = trimmedBase;
  let suffix = 2;
  const normalized = new Set([...usedNames].map((n) => n.trim().toLowerCase()));
  let candidate = name.toLowerCase();
  while (normalized.has(candidate)) {
    name = `${trimmedBase} (${suffix++})`;
    candidate = name.toLowerCase();
  }
  usedNames.add(name);
  return name;
}

// --- Session State Storage ---
// Store the current session (unsaved setup) in localStorage so it survives
// full app reloads.
function loadSessionState() {
  const state = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    SESSION_STATE_KEY,
    "Error loading session state from localStorage:",
  );
  if (state !== null) {
    return state;
  }
  if (typeof sessionStorage !== 'undefined' && SAFE_LOCAL_STORAGE !== sessionStorage) {
    const migrated = loadJSONFromStorage(
      sessionStorage,
      SESSION_STATE_KEY,
      "Error loading session state from sessionStorage:",
    );
    if (migrated !== null) {
      saveJSONToStorage(
        SAFE_LOCAL_STORAGE,
        SESSION_STATE_KEY,
        migrated,
        "Error saving session state to localStorage:",
      );
      deleteFromStorage(
        sessionStorage,
        SESSION_STATE_KEY,
        "Error deleting session state from sessionStorage:",
      );
      return migrated;
    }
  }
  return null;
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

  ensureObject(data, "cameras");
  ensureObject(data, "monitors");
  ensureObject(data, "video");
  ensureObject(data, "batteries");

  if (!isPlainObject(data.fiz)) {
    data.fiz = {};
    changed = true;
  }
  ensureObject(data.fiz, "motors");
  ensureObject(data.fiz, "controllers");
  ensureObject(data.fiz, "distance");

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
  if (!rawData) return {};
  if (Array.isArray(rawData)) {
    const obj = {};
    const used = new Set();
    rawData.forEach((item, idx) => {
      if (isPlainObject(item)) {
        const base = item.name || item.setupName || `Setup ${idx + 1}`;
        const key = generateUniqueName(base, used);
        obj[key] = item;
      }
    });
    return obj;
  }
  return isPlainObject(rawData) ? rawData : {};
}

function loadSetups() {
  const parsedData = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    SETUP_STORAGE_KEY,
    "Error loading setups from localStorage:",
  );
  const setups = normalizeSetups(parsedData);
  if (parsedData && Array.isArray(parsedData) && SAFE_LOCAL_STORAGE) {
    SAFE_LOCAL_STORAGE.setItem(SETUP_STORAGE_KEY, JSON.stringify(setups));
  }
  return setups;
}

function saveSetups(setups) {
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    SETUP_STORAGE_KEY,
    setups,
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
      return {
        gearList: typeof data.gearList === "object" || typeof data.gearList === "string" ? data.gearList : "",
        projectInfo: isPlainObject(data.projectInfo) ? data.projectInfo : null,
      };
    }
    // Legacy format { projectHtml, gearHtml }
    if (Object.prototype.hasOwnProperty.call(data, "projectHtml") || Object.prototype.hasOwnProperty.call(data, "gearHtml")) {
      return { gearList: { projectHtml: data.projectHtml || "", gearHtml: data.gearHtml || "" }, projectInfo: null };
    }
  }
  return null;
}

function loadProject() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    PROJECT_STORAGE_KEY,
    "Error loading project from localStorage:",
  );
  return normalizeProject(parsed);
}

function saveProject(project) {
  if (!isPlainObject(project)) return;
  const normalized = normalizeProject(project) || { gearList: "", projectInfo: null };
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    PROJECT_STORAGE_KEY,
    normalized,
    "Error saving project to localStorage:",
    "Project saved to localStorage.",
  );
}

function deleteProject() {
  deleteFromStorage(
    SAFE_LOCAL_STORAGE,
    PROJECT_STORAGE_KEY,
    "Error deleting project from localStorage:",
  );
}

// --- User Feedback Storage ---
function loadFeedback() {
  const parsed = loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    FEEDBACK_STORAGE_KEY,
    "Error loading feedback from localStorage:",
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

// --- Clear All Stored Data ---
function clearAllData() {
  const msg = "Error clearing storage:";
  deleteFromStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, SETUP_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, FEEDBACK_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, SESSION_STATE_KEY, msg);
  if (typeof sessionStorage !== 'undefined') {
    deleteFromStorage(sessionStorage, SESSION_STATE_KEY, msg);
  }
  console.log("All planner data cleared from storage.");
}

// --- Export/Import All Planner Data ---
function exportAllData() {
  return {
    devices: loadDeviceData(),
    setups: loadSetups(),
    session: loadSessionState(),
    feedback: loadFeedback(),
    project: loadProject(),
  };
}

function importAllData(allData) {
  if (isPlainObject(allData)) {
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
    if (allData.project) {
      saveProject(allData.project);
    } else if (typeof allData.gearList === "string") {
      // Legacy export format stored just the gear list HTML
      saveProject({ gearList: allData.gearList });
    }
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
    loadFeedback,
    saveFeedback,
    clearAllData,
    exportAllData,
    importAllData,
  };
}
