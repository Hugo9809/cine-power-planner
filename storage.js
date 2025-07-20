// storage.js - Handles reading from and writing to localStorage.

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';

// --- Device Data Storage ---
function loadDeviceData() {
  try {
    const data = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      // Validate that top-level categories exist and are objects
      const isValid = parsedData && typeof parsedData === 'object' &&
                      typeof parsedData.cameras === 'object' &&
                      typeof parsedData.monitors === 'object' &&
                      typeof parsedData.video === 'object' &&
                      typeof parsedData.batteries === 'object' &&
                      typeof parsedData.fiz === 'object' && // Check fiz is an object
                      typeof parsedData.fiz.motors === 'object' && // Check nested fiz categories
                      typeof parsedData.fiz.controllers === 'object' &&
                      typeof parsedData.fiz.distance === 'object';

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
      // Ensure it's an object, not just a primitive or array
      if (typeof parsedData === 'object' && parsedData !== null) {
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
