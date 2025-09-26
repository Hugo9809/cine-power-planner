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
    jest.clearAllMocks();
    document.body.innerHTML = '';
  };

  return { utils, cleanup, globals: globalStubs };
}

module.exports = { setupScriptEnvironment, createDeviceSkeleton };
