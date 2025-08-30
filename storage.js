// storage.js - Handles reading from and writing to localStorage.

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';

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
      // Ensure it's a plain object, not an array or primitive
      if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
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

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadDeviceData,
    saveDeviceData,
    loadSetups,
    saveSetups,
    saveSetup,
    loadSetup,
    deleteSetup
  };
}
