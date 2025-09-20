const fs = require('fs');
const path = require('path');

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

function loadApp() {
  jest.resetModules();
  ensureTestDom();

  const template = fs.readFileSync(
    path.join(__dirname, '../../../index.html'),
    'utf8',
  );
  const bodyMatch = template.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : '';
  document.body.innerHTML = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

  const { texts, categoryNames, gearItems } = require('../../../src/scripts/translations.js');
  const devicesData = require('../../../src/data');

  window.texts = texts;
  global.texts = texts;
  window.categoryNames = categoryNames;
  global.categoryNames = categoryNames;
  window.gearItems = gearItems;
  global.gearItems = gearItems;
  window.devices = JSON.parse(JSON.stringify(devicesData));
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

  return require('../../../src/scripts/script.js');
}

module.exports = {
  loadApp,
  ensureTestDom,
};

