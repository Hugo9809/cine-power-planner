const { getHtmlBody } = require('./domUtils');

const translations = (() => {
  try {
    return require('../../src/scripts/translations.js');
  } catch {
    return null;
  }
})();

const UI_PREFERENCES_STORAGE_KEY = 'cameraPowerPlanner_uiPreferences';
const UI_PREFERENCES_BACKUP_KEY = `${UI_PREFERENCES_STORAGE_KEY}__backup`;

function createUiPreferenceStubs(storage = typeof localStorage !== 'undefined' ? localStorage : undefined) {
  let uiPreferencesCache = {};

  const loadUiPreferencesFromStorage = () => {
    if (!storage || typeof storage.getItem !== 'function') {
      uiPreferencesCache = {};
      return;
    }
    try {
      const raw = storage.getItem(UI_PREFERENCES_STORAGE_KEY);
      if (!raw) {
        uiPreferencesCache = {};
        return;
      }
      const parsed = JSON.parse(raw);
      uiPreferencesCache = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? { ...parsed }
        : {};
    } catch (error) {
      console.warn('Test environment could not parse stored UI preferences', error);
      uiPreferencesCache = {};
    }
  };

  const persistUiPreferences = () => {
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }
    const keys = Object.keys(uiPreferencesCache);
    if (!keys.length) {
      try {
        storage.removeItem(UI_PREFERENCES_STORAGE_KEY);
        storage.removeItem(UI_PREFERENCES_BACKUP_KEY);
      } catch (error) {
        console.warn('Test environment could not clear stored UI preferences', error);
      }
      return;
    }
    const payload = JSON.stringify(uiPreferencesCache);
    try {
      storage.setItem(UI_PREFERENCES_STORAGE_KEY, payload);
    } catch (error) {
      console.warn('Test environment could not persist UI preferences', error);
    }
    try {
      storage.setItem(UI_PREFERENCES_BACKUP_KEY, payload);
    } catch (error) {
      console.warn('Test environment could not persist UI preference backup', error);
    }
  };

  loadUiPreferencesFromStorage();

  const getUiPreference = jest.fn((key) => {
    if (typeof key !== 'string' || !key) {
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(uiPreferencesCache, key)) {
      return uiPreferencesCache[key];
    }
    if (!storage || typeof storage.getItem !== 'function') {
      return null;
    }
    try {
      return storage.getItem(key);
    } catch (error) {
      console.warn('Test environment could not read legacy preference', key, error);
      return null;
    }
  });

  const setUiPreference = jest.fn((key, value) => {
    if (typeof key !== 'string' || !key) {
      return;
    }
    if (value === null || value === undefined) {
      delete uiPreferencesCache[key];
    } else {
      uiPreferencesCache[key] = String(value);
    }
    persistUiPreferences();
  });

  const removeUiPreference = jest.fn((key) => {
    if (typeof key !== 'string' || !key) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(uiPreferencesCache, key)) {
      delete uiPreferencesCache[key];
      persistUiPreferences();
      return;
    }
    if (storage && typeof storage.removeItem === 'function') {
      try {
        storage.removeItem(key);
      } catch (error) {
        console.warn('Test environment could not remove legacy preference', key, error);
      }
    }
  });

  const clearUiPreferences = jest.fn(() => {
    uiPreferencesCache = {};
    if (storage && typeof storage.removeItem === 'function') {
      try {
        storage.removeItem(UI_PREFERENCES_STORAGE_KEY);
        storage.removeItem(UI_PREFERENCES_BACKUP_KEY);
      } catch (error) {
        console.warn('Test environment could not clear UI preferences', error);
      }
    }
  });

  return {
    getUiPreference,
    setUiPreference,
    removeUiPreference,
    clearUiPreferences,
    __getUiPreferencesCache: () => ({ ...uiPreferencesCache }),
    __setUiPreferencesCache: (next) => {
      if (next && typeof next === 'object' && !Array.isArray(next)) {
        uiPreferencesCache = { ...next };
      } else {
        uiPreferencesCache = {};
      }
      persistUiPreferences();
    },
    __reloadUiPreferencesFromStorage: loadUiPreferencesFromStorage,
  };
}

function createDeviceSkeleton() {
  return {
    cameras: {},
    monitors: {},
    video: {},
    viewfinders: {},
    directorMonitors: {},
    iosVideo: {},
    videoAssist: {},
    media: {},
    lenses: {},
    batteries: {},
    batteryHotswaps: {},
    wirelessReceivers: {},
    accessories: {
      chargers: {},
      cages: {},
      powerPlates: {},
      cameraSupport: {},
      matteboxes: {},
      filters: {},
      rigging: {},
      batteries: {},
      cables: {},
      videoAssist: {},
      media: {},
      tripodHeads: {},
      tripods: {},
      sliders: {},
      cameraStabiliser: {},
      grip: {},
      carts: {},
    },
    fiz: {
      motors: {},
      handUnits: {},
      controllers: {},
      distance: {}
    },
    filterOptions: [],
  };
}

function mergeDeviceOverrides(target, source) {
  if (!source || typeof source !== 'object') {
    return target;
  }
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      target[key] = mergeDeviceOverrides(target[key] || {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

function stubReadyState(value) {
  const descriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
  try {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => value
    });
    return descriptor || null;
  } catch {
    return descriptor || null;
  }
}

function restoreReadyState(descriptor) {
  if (descriptor) {
    Object.defineProperty(document, 'readyState', descriptor);
  } else {
    delete document.readyState;
  }
}

function applyTranslations() {
  if (!translations || typeof window === 'undefined') return;
  if (!window.texts) {
    window.texts = translations.texts;
  }
  if (!window.categoryNames) {
    window.categoryNames = translations.categoryNames;
  }
  if (!window.gearItems) {
    window.gearItems = translations.gearItems;
  }
}

function setupScriptEnvironment(options = {}) {
  const readyStateDescriptor = stubReadyState(options.readyState ?? 'loading');

  if (options.injectHtml === false) {
    document.body.innerHTML = '';
  } else {
    document.body.innerHTML = getHtmlBody();
  }

  const globalStubs = {
    devices: createDeviceSkeleton(),
    loadDeviceData: jest.fn(() => null),
    saveDeviceData: jest.fn(),
    loadSetups: jest.fn(() => ({})),
    saveSetups: jest.fn(),
    saveSetup: jest.fn(),
    loadSetup: jest.fn(),
    deleteSetup: jest.fn(),
    loadFavorites: jest.fn(() => ({})),
    saveFavorites: jest.fn()
  };

  const uiPreferenceStubs = createUiPreferenceStubs(
    typeof localStorage !== 'undefined' ? localStorage : undefined
  );

  globalStubs.getUiPreference = uiPreferenceStubs.getUiPreference;
  globalStubs.setUiPreference = uiPreferenceStubs.setUiPreference;
  globalStubs.removeUiPreference = uiPreferenceStubs.removeUiPreference;
  globalStubs.clearUiPreferences = uiPreferenceStubs.clearUiPreferences;

  if (options.devices) {
    mergeDeviceOverrides(globalStubs.devices, options.devices);
  }
  if (options.globals) {
    for (const [key, value] of Object.entries(options.globals)) {
      globalStubs[key] = value;
    }
  }

  const appliedKeys = Object.keys(globalStubs);
  for (const key of appliedKeys) {
    global[key] = globalStubs[key];
  }

  applyTranslations();

  let utils;
  jest.isolateModules(() => {
    utils = require('../../src/scripts/script.js');
  });

  restoreReadyState(readyStateDescriptor);

  const cleanup = () => {
    for (const key of appliedKeys) {
      delete global[key];
    }
    delete window.defaultDevices;
    jest.clearAllMocks();
    document.body.innerHTML = '';
  };

  return { utils, cleanup, globals: globalStubs };
}

module.exports = {
  setupScriptEnvironment,
  createDeviceSkeleton,
  createUiPreferenceStubs,
  UI_PREFERENCES_STORAGE_KEY,
};
