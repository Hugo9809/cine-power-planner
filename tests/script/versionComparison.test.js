const fs = require('fs');
const path = require('path');

defaultDeviceSetup();

function defaultDeviceSetup() {
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

const loadApp = () => {
  jest.resetModules();

  const template = fs.readFileSync(
    path.join(__dirname, '../../index.html'),
    'utf8',
  );
  const bodyMatch = template.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : '';
  document.body.innerHTML = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

  const { texts, categoryNames, gearItems } = require('../../src/scripts/translations.js');
  const devicesData = require('../../src/data');

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

  const { loadRuntime } = require('../helpers/runtimeLoader');
  return loadRuntime();
};

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  sessionStorage.clear();
  jest.clearAllMocks();
  defaultDeviceSetup();
});

describe('version comparison viewer', () => {
  test('renders diff between manual save and auto backup', () => {
    loadApp();

    const setupsStore = {
      'Manual Setup': {
        camera: 'Alexa 35',
        monitor: 'SmallHD Cine 7',
      },
      'auto-backup-2024-05-01-10-00-Manual Setup': {
        camera: 'Sony Venice',
        monitor: 'SmallHD Cine 7',
      },
    };

    global.loadSetups.mockImplementation(() => setupsStore);

    const settingsButton = document.getElementById('settingsButton');
    settingsButton.click();

    const toggleButton = document.getElementById('backupDiffToggleButton');
    toggleButton.click();

    const baselineSelect = document.getElementById('backupDiffPrimary');
    const comparisonSelect = document.getElementById('backupDiffSecondary');

    baselineSelect.value = 'Manual Setup';
    baselineSelect.dispatchEvent(new Event('change', { bubbles: true }));

    comparisonSelect.value = 'auto-backup-2024-05-01-10-00-Manual Setup';
    comparisonSelect.dispatchEvent(new Event('change', { bubbles: true }));

    const summary = document.getElementById('backupDiffSummary');
    expect(summary.textContent).toContain('1 difference noted.');
    expect(summary.textContent).toContain('Updated: 1');

    const diffEntries = document.querySelectorAll('#backupDiffList li');
    expect(diffEntries.length).toBe(1);
    expect(diffEntries[0].querySelector('.diff-path').textContent).toBe('camera');
    expect(diffEntries[0].textContent).toContain('Updated');

    const exportButton = document.getElementById('backupDiffExport');
    expect(exportButton.disabled).toBe(false);
  });
});
