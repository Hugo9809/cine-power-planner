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

  const { texts, categoryNames, gearItems } = require('../../web/scripts/translations.js');
  const devicesData = require('../../web/data');

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

  return require('../../web/scripts/script.js');
};

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  sessionStorage.clear();
  jest.clearAllMocks();
  defaultDeviceSetup();
});

describe('automated backups', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('autoBackup captures setup and project state', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Epic Shoot' } } };
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation((next) => next);

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const option = document.createElement('option');
    option.value = 'Main Setup';
    option.textContent = 'Main Setup';
    setupSelect.appendChild(option);
    setupSelect.value = 'Main Setup';
    setupNameInput.value = 'Main Setup';

    const projectNameInput = document.getElementById('projectName');
    projectNameInput.value = 'Epic Shoot';

    const gearListOutput = document.getElementById('gearListOutput');
    gearListOutput.classList.remove('hidden');
    gearListOutput.innerHTML = '<h3>Gear List</h3><table class="gear-table"><tr><td>1x Alexa 35</td></tr></table>';

    autoBackup();

    expect(global.saveSetups).toHaveBeenCalledTimes(1);
    const savedPayload = global.saveSetups.mock.calls[0][0];
    const autoKeys = Object.keys(savedPayload).filter((name) => name.startsWith('auto-backup-'));
    expect(autoKeys).toHaveLength(1);
    const backupKey = autoKeys[0];
    expect(backupKey).toMatch(/^auto-backup-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-Main Setup$/);

    const projectCalls = global.saveProject.mock.calls.filter(([key]) => key === backupKey);
    expect(projectCalls.length).toBeGreaterThan(0);
    expect(projectCalls[projectCalls.length - 1][1]).toEqual(
      expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Epic Shoot' }),
        gearList: expect.stringContaining('Alexa 35'),
      }),
    );

    expect(setupsStore[backupKey]).toEqual(
      expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Epic Shoot' }),
        gearList: expect.stringContaining('Alexa 35'),
      }),
    );
  });

  test('auto backups stay hidden until explicitly shown', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Epic Shoot' } } };
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation(() => {});

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const option = document.createElement('option');
    option.value = 'Main Setup';
    option.textContent = 'Main Setup';
    setupSelect.appendChild(option);
    setupSelect.value = 'Main Setup';
    setupNameInput.value = 'Main Setup';

    autoBackup();

    const backupKey = Object.keys(setupsStore).find((name) => name.startsWith('auto-backup-'));
    expect(backupKey).toBeDefined();

    const hiddenValues = Array.from(setupSelect.options).map((opt) => opt.value);
    expect(hiddenValues).not.toContain(backupKey);

    const settingsShowAutoBackups = document.getElementById('settingsShowAutoBackups');
    const settingsSave = document.getElementById('settingsSave');
    settingsShowAutoBackups.checked = true;
    settingsSave.click();

    const visibleValues = Array.from(setupSelect.options).map((opt) => opt.value);
    expect(visibleValues).toContain(backupKey);
  });

  test('createSettingsBackup includes session storage snapshot', async () => {
    const { createSettingsBackup } = loadApp();

    localStorage.setItem('cameraPowerPlanner_devices', '{"cameras":{}}');
    sessionStorage.setItem('cameraPowerPlanner_session', '{"camera":"Alexa"}');

    const objectUrl = 'blob:backup';
    const originalCreateObjectURL = URL.createObjectURL;
    if (typeof originalCreateObjectURL !== 'function') {
      URL.createObjectURL = () => {};
    }
    const originalRevokeObjectURL = URL.revokeObjectURL;
    if (typeof originalRevokeObjectURL !== 'function') {
      URL.revokeObjectURL = () => {};
    }
    const originalBlob = global.Blob;
    class MockBlob {
      constructor(parts) {
        this.parts = parts;
      }
      text() {
        return Promise.resolve(
          this.parts.map(part => (typeof part === 'string' ? part : String(part))).join('')
        );
      }
    }
    global.Blob = MockBlob;

    const createObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue(objectUrl);
    const revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const originalCreateElement = document.createElement.bind(document);
    const anchorClicks = [];
    jest.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = originalCreateElement(tag);
      if (tag === 'a') {
        el.click = () => anchorClicks.push(el);
      }
      return el;
    });

    const fileName = createSettingsBackup(false, new Date('2024-05-06T10:00:00'));
    expect(typeof fileName).toBe('string');

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    const blob = createObjectURLSpy.mock.calls[0][0];
    const json = JSON.parse(await blob.text());
    expect(json.settings).toHaveProperty('cameraPowerPlanner_devices', '{"cameras":{}}');
    expect(json.sessionStorage).toHaveProperty('cameraPowerPlanner_session', '{"camera":"Alexa"}');
    expect(json.data).toEqual({ exported: true });

    expect(anchorClicks).toHaveLength(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(objectUrl);

    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
    if (typeof originalCreateObjectURL !== 'function') {
      delete URL.createObjectURL;
    }
    if (typeof originalRevokeObjectURL !== 'function') {
      delete URL.revokeObjectURL;
    }
    global.Blob = originalBlob;
    document.createElement.mockRestore();
  });
});
