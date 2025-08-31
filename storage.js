// storage.js - Handles reading from and writing to localStorage.

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';

// Generic helpers for storage access
function loadJSONFromStorage(storage, key, errorMessage) {
  try {
    const data = storage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(errorMessage, e);
    return null;
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
function generateUniqueName(base, usedNames) {
  let name = base;
  let suffix = 2;
  while (usedNames.has(name)) {
    name = `${base} (${suffix++})`;
  }
  usedNames.add(name);
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
    // Helper to ensure a value is a non-null object
    const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);
    // Validate that top-level categories exist and are non-null objects
    const isValid =
      isObject(parsedData) &&
      isObject(parsedData.cameras) &&
      isObject(parsedData.monitors) &&
      isObject(parsedData.video) &&
      isObject(parsedData.batteries) &&
      isObject(parsedData.fiz) && // Check fiz is an object
      isObject(parsedData.fiz.motors) && // Check nested fiz categories
      isObject(parsedData.fiz.controllers) &&
      isObject(parsedData.fiz.distance);

    if (isValid) {
      console.log("Device data loaded from localStorage.");
      return parsedData;
    }
    console.warn("Invalid device data structure in localStorage. Reverting to default.");
  }
  return null; // Return null to indicate that default should be used
}

function saveDeviceData(data) {
  saveJSONToStorage(
    localStorage,
    DEVICE_STORAGE_KEY,
    data,
    "Error saving device data to localStorage:",
    "Device data saved to localStorage."
  );
}

// --- Setup Data Storage ---
function loadSetups() {
  const parsedData = loadJSONFromStorage(
    localStorage,
    SETUP_STORAGE_KEY,
    "Error loading setups from localStorage:"
  );
    if (parsedData) {
      if (Array.isArray(parsedData)) {
        const obj = {};
        const used = new Set();
        parsedData.forEach((item, idx) => {
          if (item && typeof item === 'object') {
            const base = item.name || item.setupName || `Setup ${idx + 1}`;
            const key = generateUniqueName(base, used);
            obj[key] = item;
          }
        });
        localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(obj));
        return obj;
      }
      // Ensure it's a plain object, not a primitive
      if (typeof parsedData === 'object') {
        return parsedData;
      }
    }
    return {}; // Return empty object if no setups found or error
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
  if (oldName === newName) {
    return newName;
  }
  const used = new Set(Object.keys(setups));
  used.delete(oldName);
  const target = generateUniqueName(newName, used);
  setups[target] = setups[oldName];
  delete setups[oldName];
  saveSetups(setups);
  return target;
}
// --- User Feedback Storage ---
function loadFeedback() {
  const parsed = loadJSONFromStorage(
    localStorage,
    FEEDBACK_STORAGE_KEY,
    "Error loading feedback from localStorage:"
  );
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
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

function importAllData(data) {
  if (data && typeof data === 'object') {
    if (data.devices) {
      saveDeviceData(data.devices);
    }
    if (data.setups) {
      saveSetups(data.setups);
    }
    if (data.session) {
      saveSessionState(data.session);
    }
    if (data.feedback) {
      saveFeedback(data.feedback);
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
    loadSessionState,
    saveSessionState,
    loadFeedback,
    saveFeedback,
    clearAllData,
    exportAllData,
    importAllData
  };
}
