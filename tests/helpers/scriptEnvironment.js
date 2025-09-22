const fs = require('fs');
const path = require('path');
const Module = require('module');

const { getHtmlBody } = require('./domUtils');

const SCRIPT_ENTRY_PATH = path.join(__dirname, '../../src/scripts/script.js');
const SCRIPT_DIR = path.dirname(SCRIPT_ENTRY_PATH);
const SPLIT_SCRIPT_PARTS = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js'];
const SPLIT_SCRIPT_PRELUDE = [
  "var __cineGlobal = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : this);",
  "var window = __cineGlobal.window || __cineGlobal;",
  "if (!__cineGlobal.window) __cineGlobal.window = window;",
  "var self = __cineGlobal.self || window;",
  "if (!__cineGlobal.self) __cineGlobal.self = self;",
  "var document = __cineGlobal.document || (window && window.document) || undefined;",
  "if (document && !window.document) window.document = document;",
  "if (!__cineGlobal.document && document) __cineGlobal.document = document;",
  "var navigator = __cineGlobal.navigator || (window && window.navigator) || undefined;",
  "if (navigator && !window.navigator) window.navigator = navigator;",
  "if (!__cineGlobal.navigator && navigator) __cineGlobal.navigator = navigator;",
  "var localStorage = __cineGlobal.localStorage || (window && window.localStorage) || undefined;",
  "if (localStorage && !window.localStorage) window.localStorage = localStorage;",
  "if (!__cineGlobal.localStorage && localStorage) __cineGlobal.localStorage = localStorage;",
  "var sessionStorage = __cineGlobal.sessionStorage || (window && window.sessionStorage) || undefined;",
  "if (sessionStorage && !window.sessionStorage) window.sessionStorage = sessionStorage;",
  "if (!__cineGlobal.sessionStorage && sessionStorage) __cineGlobal.sessionStorage = sessionStorage;",
  "var location = __cineGlobal.location || (window && window.location) || undefined;",
  "if (location && !window.location) window.location = location;",
  "if (!__cineGlobal.location && location) __cineGlobal.location = location;",
  "var caches = __cineGlobal.caches || (window && window.caches) || undefined;",
  "if (caches && !window.caches) window.caches = caches;",
  "if (!__cineGlobal.caches && caches) __cineGlobal.caches = caches;",
].join('\n');

let cachedSplitScriptSource = null;

const translations = (() => {
  try {
    return require('../../src/scripts/translations.js');
  } catch {
    return null;
  }
})();

function getSplitScriptSource() {
  if (!cachedSplitScriptSource) {
    const partSources = SPLIT_SCRIPT_PARTS.map(part => {
      const partPath = path.join(SCRIPT_DIR, part);
      return fs.readFileSync(partPath, 'utf8');
    });
    cachedSplitScriptSource = [SPLIT_SCRIPT_PRELUDE, ...partSources].join('\n');
  }
  return cachedSplitScriptSource;
}

function createScriptRequire() {
  if (typeof Module.createRequire === 'function') {
    return Module.createRequire(SCRIPT_ENTRY_PATH);
  }
  return request => {
    if (/^\.\.?\//.test(request)) {
      const resolved = path.resolve(SCRIPT_DIR, request);
      return require(resolved);
    }
    return require(request);
  };
}

function runSplitScriptBundle() {
  const combinedSource = getSplitScriptSource();
  const scriptRequire = createScriptRequire();
  const scriptModule = {
    exports: {},
    filename: SCRIPT_ENTRY_PATH,
    id: SCRIPT_ENTRY_PATH,
    loaded: false,
    paths: typeof Module._nodeModulePaths === 'function'
      ? Module._nodeModulePaths(SCRIPT_DIR)
      : [],
    require: scriptRequire,
  };

  const factory = new Function(
    'exports',
    'require',
    'module',
    '__filename',
    '__dirname',
    combinedSource
  );

  factory(scriptModule.exports, scriptRequire, scriptModule, SCRIPT_ENTRY_PATH, SCRIPT_DIR);
  scriptModule.loaded = true;
  return scriptModule.exports;
}

function shouldUseSplitScriptFallback(error, loadedModule) {
  if (loadedModule && typeof loadedModule === 'object' && typeof loadedModule.populateSelect === 'function') {
    return false;
  }
  if (!error) {
    return true;
  }
  if (error instanceof SyntaxError) {
    return true;
  }
  const message = typeof error.message === 'string' ? error.message : '';
  return /Unexpected\s+end\s+of\s+input|Unexpected\s+token|split\s+script/i.test(message);
}

function loadPlannerRuntime() {
  let loadError = null;
  let loadedModule;
  try {
    const resolvedEntry = require.resolve('../../src/scripts/script.js');
    delete require.cache[resolvedEntry];
    loadedModule = require(resolvedEntry);
  } catch (error) {
    loadError = error;
  }

  if (shouldUseSplitScriptFallback(loadError, loadedModule)) {
    try {
      loadedModule = runSplitScriptBundle();
    } catch (fallbackError) {
      const rootCause = loadError || fallbackError;
      const combined = fallbackError && fallbackError !== rootCause
        ? new Error(`Unable to initialize planner runtime. Primary error: ${rootCause && rootCause.message}. Fallback error: ${fallbackError.message}`)
        : fallbackError;
      throw combined;
    }
  }

  return loadedModule;
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
    utils = loadPlannerRuntime();
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

module.exports = { setupScriptEnvironment, createDeviceSkeleton };
