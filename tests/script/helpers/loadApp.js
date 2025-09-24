const fs = require('fs');
const path = require('path');

let cachedBodyHtml = null;
let cachedDevicesJson = null;
let cachedTranslations = null;

function getBodyHtml() {
  if (cachedBodyHtml === null) {
    const template = fs.readFileSync(
      path.join(__dirname, '../../../index.html'),
      'utf8',
    );
    const bodyMatch = template.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    cachedBodyHtml = (bodyMatch ? bodyMatch[1] : '').replace(
      /<script[\s\S]*?<\/script>/gi,
      '',
    );
  }

  return cachedBodyHtml;
}

function cloneJson(data) {
  if (typeof global.structuredClone === 'function') {
    try {
      return global.structuredClone(data);
    } catch {
      // fall back to JSON cloning below
    }
  }

  return JSON.parse(JSON.stringify(data));
}

function cloneDevices(data) {
  if (cachedDevicesJson === null) {
    cachedDevicesJson = JSON.stringify(data);
  }

  return JSON.parse(cachedDevicesJson);
}

function getTranslations() {
  if (!cachedTranslations) {
    cachedTranslations = require('../../../src/scripts/translations.js');
  }
  return cachedTranslations;
}

function ensureTestDom() {
  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    });
  }

  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
}

function loadApp(options = {}) {
  jest.resetModules();
  ensureTestDom();

  document.body.innerHTML = options.bodyHtml || getBodyHtml();

  const translations = options.translations || getTranslations();
  const devicesData = options.devices || require('../../../src/data');

  const texts = translations.texts || {};
  const categoryNames = translations.categoryNames || {};
  const gearItems = translations.gearItems || {};

  window.texts = texts;
  global.texts = texts;
  window.categoryNames = categoryNames;
  global.categoryNames = categoryNames;
  window.gearItems = gearItems;
  global.gearItems = gearItems;

  const devicesClone = options.devices ? cloneJson(devicesData) : cloneDevices(devicesData);
  window.devices = devicesClone;
  global.devices = window.devices;

  const baseGlobals = {
    loadDeviceData: jest.fn(() => null),
    saveDeviceData: jest.fn(),
    loadSetups: jest.fn(() => ({})),
    saveSetups: jest.fn(),
    loadSessionState: jest.fn(() => null),
    saveSessionState: jest.fn(),
    loadProject: jest.fn(() => ({})),
    saveProject: jest.fn(),
    deleteProject: jest.fn(),
    loadFavorites: jest.fn(() => ({})),
    saveFavorites: jest.fn(),
    exportAllData: jest.fn(() => ({ exported: true })),
    importAllData: jest.fn(),
    clearAllData: jest.fn(),
    showNotification: jest.fn()
  };

  const appliedGlobals = { ...baseGlobals, ...(options.globals || {}) };
  for (const [key, value] of Object.entries(appliedGlobals)) {
    global[key] = value;
  }

  const { loadRuntime } = require('../../helpers/runtimeLoader');
  const runtime = loadRuntime();

  return runtime;
}

module.exports = {
  loadApp,
  ensureTestDom,
};

