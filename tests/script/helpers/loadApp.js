const fs = require('fs');
const path = require('path');

let cachedBodyHtml = null;
let cachedDevicesJson = null;

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

function cloneDevices(data) {
  if (typeof global.structuredClone === 'function') {
    return global.structuredClone(data);
  }

  if (cachedDevicesJson === null) {
    cachedDevicesJson = JSON.stringify(data);
  }

  return JSON.parse(cachedDevicesJson);
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

function stubReadyState(value) {
  const descriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
  try {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => value,
    });
  } catch (error) {
    void error;
  }
  return descriptor || null;
}

function restoreReadyState(descriptor) {
  if (descriptor) {
    Object.defineProperty(document, 'readyState', descriptor);
  } else {
    delete document.readyState;
  }
}

function loadApp() {
  jest.resetModules();
  ensureTestDom();

  document.body.innerHTML = getBodyHtml();

  const { texts, categoryNames, gearItems } = require('../../../src/scripts/translations.js');
  const devicesData = require('../../../src/data');

  window.texts = texts;
  global.texts = texts;
  window.categoryNames = categoryNames;
  global.categoryNames = categoryNames;
  window.gearItems = gearItems;
  global.gearItems = gearItems;
  window.devices = cloneDevices(devicesData);
  global.devices = window.devices;

  global.loadDeviceData = jest.fn(() => null);
  global.saveDeviceData = jest.fn();
  global.loadSetups = jest.fn(() => ({}));
  global.saveSetups = jest.fn();
  global.loadSessionState = jest.fn(() => null);
  global.saveSessionState = jest.fn();
  global.loadProject = jest.fn(() => ({}));
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
  global.loadFavorites = jest.fn(() => ({}));
  global.saveFavorites = jest.fn();
  global.exportAllData = jest.fn(() => ({ exported: true }));
  global.importAllData = jest.fn();
  global.clearAllData = jest.fn();
  global.showNotification = jest.fn();

  const { loadRuntime } = require('../../helpers/runtimeLoader');
  const descriptor = stubReadyState('loading');
  try {
    return loadRuntime();
  } finally {
    restoreReadyState(descriptor);
  }
}

module.exports = {
  loadApp,
  ensureTestDom,
};

