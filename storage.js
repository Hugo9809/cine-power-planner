// storage.js - Handles reading from and writing to localStorage.
/* global texts, currentLang */

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
const GEARLIST_STORAGE_KEY = 'cameraPowerPlanner_gearList';

// Safely detect usable localStorage. Some environments (like private browsing)
// may block access and throw errors. If unavailable, this returns null.
const SAFE_LOCAL_STORAGE = (() => {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    console.warn('localStorage is unavailable:', e);
    alertStorageError();
  }
  return null;
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
  return loadJSONFromStorage(
    SAFE_LOCAL_STORAGE,
    SESSION_STATE_KEY,
    "Error loading session state from localStorage:",
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
  );
  if (parsedData) {
    // Validate that top-level categories exist and are non-null objects
    const isValid =
      isPlainObject(parsedData) &&
      isPlainObject(parsedData.cameras) &&
      isPlainObject(parsedData.monitors) &&
      isPlainObject(parsedData.video) &&
      isPlainObject(parsedData.batteries) &&
      isPlainObject(parsedData.fiz) && // Check fiz is an object
      isPlainObject(parsedData.fiz.motors) && // Check nested fiz categories
      isPlainObject(parsedData.fiz.controllers) &&
      isPlainObject(parsedData.fiz.distance);

    if (isValid) {
      console.log("Device data loaded from localStorage.");
      return parsedData;
    }
    console.warn("Invalid device data structure in localStorage. Reverting to default.");
  }
  return null; // Return null to indicate that default should be used
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

// --- Gear List Storage ---
function loadGearList() {
  return (
    loadJSONFromStorage(
      SAFE_LOCAL_STORAGE,
      GEARLIST_STORAGE_KEY,
      "Error loading gear list from localStorage:",
      "",
    ) || ""
  );
}

function saveGearList(html) {
  saveJSONToStorage(
    SAFE_LOCAL_STORAGE,
    GEARLIST_STORAGE_KEY,
    html,
    "Error saving gear list to localStorage:",
    "Gear list saved to localStorage.",
  );
}

function deleteGearList() {
  deleteFromStorage(
    SAFE_LOCAL_STORAGE,
    GEARLIST_STORAGE_KEY,
    "Error deleting gear list from localStorage:",
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
  deleteFromStorage(SAFE_LOCAL_STORAGE, GEARLIST_STORAGE_KEY, msg);
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
    loadGearList,
    saveGearList,
    deleteGearList,
    loadSessionState,
    saveSessionState,
    loadFeedback,
    saveFeedback,
    clearAllData,
    exportAllData,
    importAllData,
  };
}
