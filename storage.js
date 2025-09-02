// storage.js - Handles reading from and writing to localStorage.

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
const GEARLIST_STORAGE_KEY = 'cameraPowerPlanner_gearList';

// Helper to check for plain objects
function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

// Generic helpers for storage access
function loadJSONFromStorage(storage, key, errorMessage, defaultValue = null) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error(errorMessage, e);
    return defaultValue;
  }
}

function saveJSONToStorage(storage, key, value, errorMessage, successMessage) {
  try {
    storage.setItem(key, JSON.stringify(value));
    if (successMessage) {
      console.log(successMessage);
    }
  } catch (e) {
    console.error(errorMessage, e);
  }
}

// Generate a unique name by appending numeric suffixes if needed
// Comparisons are case-insensitive and ignore surrounding whitespace.
// Uses a cached Set on the passed `usedNames` to avoid rebuilding
// normalized variants on every call, which can become costly when many
// names are processed in sequence.
function generateUniqueName(base, usedNames) {
  const trimmedBase = base.trim();
  let name = trimmedBase;
  let suffix = 2;

  // Reuse a cached Set of normalized names (trimmed + lowercased).
  // The cache is stored as a non-enumerable property so normal Set
  // iteration isn't affected.
  if (!Object.prototype.hasOwnProperty.call(usedNames, '_normalized')) {
    const norm = new Set([...usedNames].map(n => n.trim().toLowerCase()));
    Object.defineProperty(usedNames, '_normalized', {
      value: norm,
      enumerable: false,
      configurable: true
    });
  }
  const normalized = usedNames._normalized;

  let candidate = name.toLowerCase();
  while (normalized.has(candidate)) {
    name = `${trimmedBase} (${suffix++})`;
    candidate = name.toLowerCase();
  }
  usedNames.add(name);
  normalized.add(candidate);
  return name;
}

// --- Session State Storage ---
function loadSessionState() {
  return loadJSONFromStorage(
    sessionStorage,
    SESSION_STATE_KEY,
    "Error loading session state from sessionStorage:"
  );
}

function saveSessionState(state) {
  saveJSONToStorage(
    sessionStorage,
    SESSION_STATE_KEY,
    state,
    "Error saving session state to sessionStorage:"
  );
}

// --- Device Data Storage ---
function loadDeviceData() {
  const parsedData = loadJSONFromStorage(
    localStorage,
    DEVICE_STORAGE_KEY,
    "Error loading device data from localStorage:"
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
    localStorage,
    DEVICE_STORAGE_KEY,
    deviceData,
    "Error saving device data to localStorage:",
    "Device data saved to localStorage."
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
    localStorage,
    SETUP_STORAGE_KEY,
    "Error loading setups from localStorage:"
  );
  const setups = normalizeSetups(parsedData);
  if (parsedData && Array.isArray(parsedData)) {
    localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(setups));
  }
  return setups;
}

function saveSetups(setups) {
  saveJSONToStorage(
    localStorage,
    SETUP_STORAGE_KEY,
    setups,
    "Error saving setups to localStorage:",
    "Setups saved to localStorage."
  );
}

function saveSetup(name, setup) {
  const setups = loadSetups();
  setups[name] = setup;
  saveSetups(setups);
}

function loadSetup(name) {
  const setups = loadSetups();
  return setups[name];
}

function deleteSetup(name) {
  const setups = loadSetups();
  delete setups[name];
  saveSetups(setups);
}

function renameSetup(oldName, newName) {
  const setups = loadSetups();
  if (!Object.prototype.hasOwnProperty.call(setups, oldName)) {
    return null;
  }
  const sanitized = newName.trim();
  if (oldName.trim().toLowerCase() === sanitized.toLowerCase()) {
    return oldName;
  }
  const used = new Set(Object.keys(setups));
  used.delete(oldName);
  const target = generateUniqueName(sanitized, used);
  setups[target] = setups[oldName];
  delete setups[oldName];
  saveSetups(setups);
  return target;
}

// --- Gear List Storage ---
function loadGearList() {
  return loadJSONFromStorage(
    localStorage,
    GEARLIST_STORAGE_KEY,
    "Error loading gear list from localStorage:",
    ""
  ) || "";
}

function saveGearList(html) {
  saveJSONToStorage(
    localStorage,
    GEARLIST_STORAGE_KEY,
    html,
    "Error saving gear list to localStorage:",
    "Gear list saved to localStorage."
  );
}

function deleteGearList() {
  try {
    localStorage.removeItem(GEARLIST_STORAGE_KEY);
  } catch (e) {
    console.error("Error deleting gear list from localStorage:", e);
  }
}

// --- User Feedback Storage ---
function loadFeedback() {
  const parsed = loadJSONFromStorage(
    localStorage,
    FEEDBACK_STORAGE_KEY,
    "Error loading feedback from localStorage:"
  );
  if (isPlainObject(parsed)) {
    return parsed;
  }
  return {};
}

function saveFeedback(feedback) {
  saveJSONToStorage(
    localStorage,
    FEEDBACK_STORAGE_KEY,
    feedback,
    "Error saving feedback to localStorage:",
    "Feedback saved to localStorage."
  );
}

// --- Clear All Stored Data ---
function clearAllData() {
  try {
    localStorage.removeItem(DEVICE_STORAGE_KEY);
    localStorage.removeItem(SETUP_STORAGE_KEY);
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    localStorage.removeItem(GEARLIST_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STATE_KEY);
    console.log("All planner data cleared from storage.");
  } catch (e) {
    console.error("Error clearing storage:", e);
  }
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
    importAllData
  };
}
