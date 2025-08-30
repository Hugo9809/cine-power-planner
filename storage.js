// storage.js - Handles reading from and writing to localStorage.

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';

// --- Session State Storage ---
function loadSessionState() {
  try {
    const data = sessionStorage.getItem(SESSION_STATE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error loading session state from sessionStorage:", e);
    return null;
  }
}

function saveSessionState(state) {
  try {
    sessionStorage.setItem(SESSION_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Error saving session state to sessionStorage:", e);
  }
}

// --- Device Data Storage ---
function loadDeviceData() {
  try {
    const data = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      // Helper to ensure a value is a non-null object
      const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);
      // Validate that top-level categories exist and are non-null objects
      const isValid = isObject(parsedData) &&
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
      } else {
        console.warn("Invalid device data structure in localStorage. Reverting to default.");
        return null; // Return null to indicate that default should be used
      }
    }
  } catch (e) {
    console.error("Error loading device data from localStorage:", e);
    return null; // Return null to indicate that default should be used
  }
  return null; // No data found
}

function saveDeviceData(data) {
  try {
    localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(data));
    console.log("Device data saved to localStorage.");
  } catch (e) {
    console.error("Error saving device data to localStorage:", e);
  }
}

// --- Setup Data Storage ---
function loadSetups() {
  try {
    const data = localStorage.getItem(SETUP_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        const obj = {};
        parsedData.forEach((item, idx) => {
          if (item && typeof item === 'object') {
            const key = item.name || item.setupName || `Setup ${idx + 1}`;
            obj[key] = item;
          }
        });
        localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(obj));
        return obj;
      }
      // Ensure it's a plain object, not a primitive
      if (parsedData && typeof parsedData === 'object') {
        return parsedData;
      }
    }
  } catch (e) {
    console.error("Error loading setups from localStorage:", e);
  }
  return {}; // Return empty object if no setups found or error
}

function saveSetups(setups) {
  try {
    localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(setups));
    console.log("Setups saved to localStorage.");
  } catch (e) {
    console.error("Error saving setups to localStorage:", e);
  }
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

// --- User Feedback Storage ---
function loadFeedback() {
  try {
    const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error loading feedback from localStorage:", e);
  }
  return {};
}

function saveFeedback(feedback) {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
    console.log("Feedback saved to localStorage.");
  } catch (e) {
    console.error("Error saving feedback to localStorage:", e);
  }
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

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadDeviceData,
    saveDeviceData,
    loadSetups,
    saveSetups,
    saveSetup,
    loadSetup,
    deleteSetup,
    loadSessionState,
    saveSessionState,
    loadFeedback,
    saveFeedback,
    clearAllData
  };
}
