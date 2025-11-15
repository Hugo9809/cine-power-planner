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
    Object.isFrozen = () => false;
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
    saveFavorites: jest.fn()
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
    } catch (runtimeCleanupError) {
      void runtimeCleanupError;
    }
    jest.clearAllMocks();
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
