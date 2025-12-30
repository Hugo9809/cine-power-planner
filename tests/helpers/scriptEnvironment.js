const { getHtmlBody } = require('./domUtils');

const translations = (() => {
  try {
    return require('../../src/scripts/translations.js');
  } catch {
    return null;
  }
})();

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
    carts: {},
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
    // Block prototype polluting keys
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
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

function resolveDocument() {
  if (typeof document !== 'undefined' && document) {
    return document;
  }

  if (typeof globalThis !== 'undefined' && globalThis.document) {
    return globalThis.document;
  }

  if (typeof global !== 'undefined' && global.document) {
    return global.document;
  }

  return null;
}

function stubReadyState(value) {
  const doc = resolveDocument();
  if (!doc) {
    return null;
  }

  const descriptor = Object.getOwnPropertyDescriptor(doc, 'readyState');
  try {
    Object.defineProperty(doc, 'readyState', {
      configurable: true,
      get: () => value
    });
    return descriptor || null;
  } catch {
    return descriptor || null;
  }
}

function restoreReadyState(descriptor) {
  const doc = resolveDocument();
  if (!doc) {
    return;
  }

  if (descriptor) {
    Object.defineProperty(doc, 'readyState', descriptor);
  } else {
    delete doc.readyState;
  }
}

function applyTranslations() {
  if (!translations || typeof window === 'undefined') return;
  if (typeof translations.loadLanguage === 'function') {
    try {
      const pending = translations.loadLanguage(translations.defaultLanguage || 'en');
      if (pending && typeof pending.then === 'function') {
        pending.catch(error => {
          console.warn('Failed to prepare translations for script environment', error);
        });
      }
    } catch (loadError) {
      console.warn('Unable to prepare translations for script environment', loadError);
    }
  }
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
  console.log('DEBUG: setupScriptEnvironment ENTERED');
  const doc = resolveDocument();

  if (!doc || !doc.body) {
    throw new Error('setupScriptEnvironment requires a DOM with a document.body.');
  }

  const freezeOverrideEnabled = options.disableFreeze === true;
  const originalFreeze = freezeOverrideEnabled ? Object.freeze : null;
  const originalIsFrozen = freezeOverrideEnabled ? Object.isFrozen : null;
  const originalGetOwnPropertyNames = freezeOverrideEnabled ? Object.getOwnPropertyNames : null;
  const originalGetOwnPropertyDescriptor = freezeOverrideEnabled ? Object.getOwnPropertyDescriptor : null;
  if (freezeOverrideEnabled) {
    Object.freeze = (value) => value;
    Object.seal = (value) => value;
    Object.preventExtensions = (value) => value;
    Object.isFrozen = () => false;
    Object.isSealed = () => false;
    Object.isExtensible = () => true;
    const describeTarget = (value) => {
      try {
        return Object.prototype.toString.call(value);
      } catch (error) {
        void error;
        return '';
      }
    };
    Object.getOwnPropertyNames = (target) => {
      const description = describeTarget(target);
      if (/^\[object (HTML|SVG|Document|Window)/.test(description)) {
        return [];
      }
      try {
        return originalGetOwnPropertyNames(target);
      } catch (error) {
        void error;
        return [];
      }
    };
    Object.getOwnPropertyDescriptor = (target, property) => {
      const description = describeTarget(target);
      if (/^\[object (HTML|SVG|Document|Window)/.test(description)) {
        return undefined;
      }
      try {
        return originalGetOwnPropertyDescriptor(target, property);
      } catch (error) {
        void error;
        return undefined;
      }
    };
  }

  const readyStateDescriptor = stubReadyState(options.readyState ?? 'loading');

  // Stub window.alert, confirm, and prompt to prevent JSDOM errors
  if (typeof window !== 'undefined') {
    window.alert = function (msg) { console.log('window.alert:', msg); };
    window.confirm = function (msg) { console.log('window.confirm:', msg); return true; };
    window.prompt = function (msg) { console.log('window.prompt:', msg); return ''; };
  }

  // Track event listeners to prevent zombies
  const addedListeners = [];
  let originalAddEventListener = null;
  let originalRemoveEventListener = null;
  if (typeof window !== 'undefined') {
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;

    window.addEventListener = (type, listener, options) => {
      addedListeners.push({ type, listener, options });
      return originalAddEventListener.call(window, type, listener, options);
    };

    window.removeEventListener = (type, listener, options) => {
      // Remove from tracking if present
      const index = addedListeners.findIndex(l => l.type === type && l.listener === listener);
      if (index !== -1) {
        addedListeners.splice(index, 1);
      }
      return originalRemoveEventListener.call(window, type, listener, options);
    };
  }


  if (typeof localStorage !== 'undefined') {
    const originalGetItem = localStorage.getItem.bind(localStorage);
    const originalSetItem = localStorage.setItem.bind(localStorage);
    const originalRemoveItem = localStorage.removeItem.bind(localStorage);
    localStorage.getItem = (key) => {
      // console.log('localStorage.getItem:', key);
      return originalGetItem(key);
    };
    localStorage.setItem = (key, value) => {
      console.log('localStorage.setItem:', key, typeof value === 'string' ? value.substring(0, 50) + '...' : value);
      originalSetItem(key, value);
    };
    localStorage.removeItem = (key) => {
      console.log('localStorage.removeItem:', key);
      originalRemoveItem(key);
    };
  }

  if (options.injectHtml === false) {

    doc.body.innerHTML = '';
  } else {
    doc.body.innerHTML = getHtmlBody();
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
    saveFavorites: jest.fn(),
    unifyDevices: jest.fn(),
    fixPowerInput: jest.fn(),
    ensureList: jest.fn(),
    __SKIP_RUNTIME_GUARD__: true
  };

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
    const { loadRuntime } = require('./runtimeLoader');
    utils = loadRuntime();
  });

  restoreReadyState(readyStateDescriptor);

  const cleanup = () => {
    // Remove tracked event listeners
    if (originalRemoveEventListener && addedListeners.length > 0) {
      // Reverse order for safety
      for (let i = addedListeners.length - 1; i >= 0; i--) {
        const { type, listener, options } = addedListeners[i];
        try {
          originalRemoveEventListener.call(window, type, listener, options);
        } catch (e) { /* ignore */ }
      }
    }
    // Restore original methods
    if (originalAddEventListener) window.addEventListener = originalAddEventListener;
    if (originalRemoveEventListener) window.removeEventListener = originalRemoveEventListener;

    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

    for (const key of appliedKeys) {
      delete global[key];
    }
    delete window.defaultDevices;
    try {
      delete global.__cineRuntimeIntegrity;
    } catch (error) {
      void error;
    }
    try {
      delete global.cineRuntime;
      if (typeof globalThis !== 'undefined') {
        delete globalThis.cineRuntime;
      }
      if (typeof window !== 'undefined') {
        delete window.cineRuntime;
      }
      delete global.CORE_BOOT_QUEUE;
      delete global.CORE_BOOT_QUEUE_KEY;
      delete global.__cineCoreBootQueueKey;
      delete global.__coreRuntimeBootQueue;
      delete global.cineCoreRuntimeModuleLoader;
      delete global.cineRuntimeBootstrapExports;
      delete global.cineCoreShared;
      if (typeof window !== 'undefined') {
        delete window.CORE_BOOT_QUEUE;
        delete window.CORE_BOOT_QUEUE_KEY;
        delete window.cineCoreRuntimeModuleLoader;
        delete window.__cineCorePart1Initialized;
        delete window.__cineCorePart2Initialized;
      }
      delete global.__cineCorePart1Initialized;
      delete global.__cineCorePart2Initialized;
    } catch (runtimeCleanupError) {
      void runtimeCleanupError;
    }
    jest.clearAllMocks();
    if (typeof jest.clearAllTimers === 'function') {
      jest.clearAllTimers();
    }
    if (typeof jest.restoreAllMocks === 'function') {
      jest.restoreAllMocks();
    }
    doc.body.innerHTML = '';
    if (freezeOverrideEnabled) {
      Object.freeze = originalFreeze;
      Object.isFrozen = originalIsFrozen;
      Object.getOwnPropertyNames = originalGetOwnPropertyNames;
      Object.getOwnPropertyDescriptor = originalGetOwnPropertyDescriptor;
    }
  };


  return { utils, cleanup, globals: globalStubs };
}

module.exports = { setupScriptEnvironment, createDeviceSkeleton };
