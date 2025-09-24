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

const originalCreateObjectURL = typeof URL !== 'undefined' ? URL.createObjectURL : undefined;
const originalRevokeObjectURL = typeof URL !== 'undefined' ? URL.revokeObjectURL : undefined;

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
  global.showNotification = jest.fn();

  const { loadRuntime } = require('../helpers/runtimeLoader');
  return loadRuntime();
};

async function captureBackupDownload(createSettingsBackup, timestamp = new Date('2024-05-06T10:00:00Z')) {
  const objectUrl = 'blob:capture-backup';
  const originalBlob = global.Blob;
  class MockBlob {
    constructor(parts) {
      this.parts = parts;
    }
    text() {
      return Promise.resolve(
        this.parts.map(part => (typeof part === 'string' ? part : String(part))).join(''),
      );
    }
  }
  global.Blob = MockBlob;

  const createObjectURLSpy = jest
    .spyOn(URL, 'createObjectURL')
    .mockReturnValue(objectUrl);
  const revokeObjectURLSpy = jest
    .spyOn(URL, 'revokeObjectURL')
    .mockImplementation(() => {});

  const originalCreateElement = document.createElement.bind(document);
  const anchors = [];
  jest.spyOn(document, 'createElement').mockImplementation(tag => {
    const element = originalCreateElement(tag);
    if (tag === 'a') {
      element.click = () => anchors.push(element);
    }
    return element;
  });

  try {
    const fileName = createSettingsBackup(false, timestamp);
    const createObjectURLCalls = createObjectURLSpy.mock.calls.map(args => args);
    const revokeObjectURLCalls = revokeObjectURLSpy.mock.calls.map(args => args);
    const blob = createObjectURLCalls[0] ? createObjectURLCalls[0][0] : null;
    const payload = blob && typeof blob.text === 'function'
      ? JSON.parse(await blob.text())
      : null;
    return {
      fileName,
      payload,
      anchors,
      objectUrl,
      createObjectURLCalls,
      revokeObjectURLCalls,
    };
  } finally {
    document.createElement.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
    if (typeof originalBlob === 'undefined') {
      delete global.Blob;
    } else {
      global.Blob = originalBlob;
    }
  }
}

let fakeTimersActive = false;

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  sessionStorage.clear();
  jest.clearAllMocks();
  defaultDeviceSetup();
  fakeTimersActive = false;
  if (typeof URL !== 'undefined') {
    if (typeof URL.createObjectURL !== 'function') {
      URL.createObjectURL = () => 'blob:backup';
    }
    if (typeof URL.revokeObjectURL !== 'function') {
      URL.revokeObjectURL = () => {};
    }
  }
});

describe('automated backups', () => {
  afterEach(() => {
    if (fakeTimersActive) {
      try {
        jest.runOnlyPendingTimers();
        jest.clearAllTimers();
      } catch {
        // Ignore when fake timers were not active
      }
      jest.useRealTimers();
      fakeTimersActive = false;
    } else {
      jest.useRealTimers();
    }
    if (typeof originalCreateObjectURL === 'function') {
      URL.createObjectURL = originalCreateObjectURL;
    } else if (typeof URL !== 'undefined') {
      delete URL.createObjectURL;
    }
    if (typeof originalRevokeObjectURL === 'function') {
      URL.revokeObjectURL = originalRevokeObjectURL;
    } else if (typeof URL !== 'undefined') {
      delete URL.revokeObjectURL;
    }
  });

  test('autoBackup captures setup and project state', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
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
        projectInfo: expect.objectContaining({ projectName: 'Main Setup' }),
        gearList: expect.stringContaining('Alexa 35'),
      }),
    );

    expect(setupsStore[backupKey]).toEqual(
      expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Main Setup' }),
        gearList: expect.stringContaining('Alexa 35'),
      }),
    );
  });

  test('auto backups stay hidden until explicitly shown', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
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

  test('show auto backups toggle reveals backups immediately', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T14:15:00'));

    localStorage.clear();

    const { autoBackup } = loadApp();

    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation(() => {});

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const manualOption = document.createElement('option');
    manualOption.value = 'Main Setup';
    manualOption.textContent = 'Main Setup';
    setupSelect.appendChild(manualOption);
    setupSelect.value = 'Main Setup';
    setupNameInput.value = 'Main Setup';

    autoBackup();

    const backupKey = Object.keys(setupsStore).find((name) => name.startsWith('auto-backup-'));
    expect(backupKey).toBeDefined();
    expect(Array.from(setupSelect.options).map((opt) => opt.value)).not.toContain(backupKey);

    const settingsButton = document.getElementById('settingsButton');
    settingsButton.click();

    const settingsShowAutoBackups = document.getElementById('settingsShowAutoBackups');
    settingsShowAutoBackups.checked = true;
    settingsShowAutoBackups.dispatchEvent(new Event('change'));

    expect(Array.from(setupSelect.options).map((opt) => opt.value)).toContain(backupKey);
    expect(localStorage.getItem('showAutoBackups')).toBe('true');
  });

  test('enabling show auto backups imports missing project-only backups', () => {
    localStorage.clear();

    loadApp();

    const autoBackupName = 'auto-backup-2024-05-06-14-30-Main Setup';
    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const settingsButton = document.getElementById('settingsButton');
    const settingsShowAutoBackups = document.getElementById('settingsShowAutoBackups');

    let storedSetups = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
    global.loadSetups.mockImplementation(() => ({ ...storedSetups }));
    global.saveSetups.mockImplementation((data) => {
      storedSetups = { ...data };
    });
    global.loadProject.mockImplementation(() => ({
      [autoBackupName]: {
        projectInfo: { projectName: 'Main Setup', projectNotes: 'synced from project storage' },
        gearList: '<div>gear</div>',
        autoGearRules: [{ id: 'rule-1', label: 'Auto import rule' }],
      },
    }));

    setupSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '';
    setupSelect.appendChild(defaultOption);
    const manualOption = document.createElement('option');
    manualOption.value = 'Main Setup';
    manualOption.textContent = 'Main Setup';
    setupSelect.appendChild(manualOption);

    expect(Array.from(setupSelect.options).map((opt) => opt.value)).not.toContain(autoBackupName);

    setupSelect.value = 'Main Setup';
    setupNameInput.value = 'Main Setup';

    settingsButton.click();
    settingsShowAutoBackups.checked = true;
    settingsShowAutoBackups.dispatchEvent(new Event('change'));

    expect(global.saveSetups).toHaveBeenCalledWith(expect.objectContaining({
      [autoBackupName]: expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Main Setup' }),
      }),
    }));

    const optionValues = Array.from(setupSelect.options).map((opt) => opt.value);
    expect(optionValues).toContain(autoBackupName);
    expect(localStorage.getItem('showAutoBackups')).toBe('true');
  });

  test('cancelling settings restores previous auto backup visibility', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T14:45:00'));

    localStorage.clear();

    const { autoBackup } = loadApp();

    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation(() => {});

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const manualOption = document.createElement('option');
    manualOption.value = 'Main Setup';
    manualOption.textContent = 'Main Setup';
    setupSelect.appendChild(manualOption);
    setupSelect.value = 'Main Setup';
    setupNameInput.value = 'Main Setup';

    autoBackup();

    const backupKey = Object.keys(setupsStore).find((name) => name.startsWith('auto-backup-'));
    expect(backupKey).toBeDefined();

    const settingsButton = document.getElementById('settingsButton');
    settingsButton.click();

    const settingsShowAutoBackups = document.getElementById('settingsShowAutoBackups');
    settingsShowAutoBackups.checked = true;
    settingsShowAutoBackups.dispatchEvent(new Event('change'));

    expect(Array.from(setupSelect.options).map((opt) => opt.value)).toContain(backupKey);
    expect(localStorage.getItem('showAutoBackups')).toBe('true');

    const settingsCancel = document.getElementById('settingsCancel');
    settingsCancel.click();

    expect(Array.from(setupSelect.options).map((opt) => opt.value)).not.toContain(backupKey);
    expect(localStorage.getItem('showAutoBackups')).toBe('false');
  });

  test('auto backups include unsaved setup names from the input field', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const setupsStore = {};
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation((next) => next);

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    setupSelect.value = '';
    setupNameInput.value = '  Fresh Concept  ';

    const gearListOutput = document.getElementById('gearListOutput');
    gearListOutput.classList.remove('hidden');
    gearListOutput.innerHTML = '<h3>Gear List</h3><table class="gear-table"><tr><td>1x Alexa 35</td></tr></table>';

    autoBackup();

    const autoKeys = Object.keys(setupsStore).filter((name) => name.startsWith('auto-backup-'));
    expect(autoKeys).toHaveLength(1);
    expect(autoKeys[0]).toMatch(/-Fresh Concept$/);
  });

  test('autoBackup skips when the active setup is an auto backup', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const autoName = 'auto-backup-2024-05-06-10-20-Restore Candidate';
    const setupsStore = { [autoName]: { projectInfo: { projectName: autoName } } };
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation(() => {});
    global.saveProject.mockImplementation(() => {});

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const option = document.createElement('option');
    option.value = autoName;
    option.textContent = autoName;
    setupSelect.appendChild(option);
    setupSelect.value = autoName;
    setupNameInput.value = autoName;

    const result = autoBackup();

    expect(result).toMatchObject({ status: 'skipped', reason: 'auto-backup-selected' });
    expect(global.saveSetups).not.toHaveBeenCalled();
    expect(global.saveProject).not.toHaveBeenCalled();
    expect(global.showNotification).not.toHaveBeenCalled();
  });

  test('autoBackup resumes once an auto backup is renamed', () => {
    fakeTimersActive = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00'));

    const { autoBackup } = loadApp();

    const setupsStore = {};
    global.loadSetups.mockImplementation(() => setupsStore);
    global.saveSetups.mockImplementation((next) => {
      Object.assign(setupsStore, next);
      return next;
    });

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const autoName = 'auto-backup-2024-05-05-09-10-Old Snapshot';
    const option = document.createElement('option');
    option.value = autoName;
    option.textContent = autoName;
    setupSelect.appendChild(option);
    setupSelect.value = autoName;
    setupNameInput.value = 'Restored Sequence';

    const result = autoBackup();

    expect(typeof result).toBe('string');
    expect(result).toMatch(/-Restored Sequence$/);
    expect(global.saveSetups).toHaveBeenCalledTimes(1);
    expect(Object.prototype.hasOwnProperty.call(setupsStore, result)).toBe(true);
  });

  test('createSettingsBackup includes session storage snapshot', async () => {
    const { createSettingsBackup } = loadApp();

    localStorage.setItem('cameraPowerPlanner_devices', '{"cameras":{}}');
    sessionStorage.setItem('cameraPowerPlanner_session', '{"camera":"Alexa"}');

    const result = await captureBackupDownload(
      createSettingsBackup,
      new Date('2024-05-06T10:00:00'),
    );

    expect(typeof result.fileName).toBe('string');
    expect(result.createObjectURLCalls).toHaveLength(1);
    expect(result.payload.settings).toHaveProperty('cameraPowerPlanner_devices', '{"cameras":{}}');
    expect(result.payload.sessionStorage).toHaveProperty('cameraPowerPlanner_session', '{"camera":"Alexa"}');
    expect(result.payload.data).toMatchObject({ exported: true });
    expect(Array.isArray(result.payload.data.autoGearRules)).toBe(true);

    expect(result.anchors).toHaveLength(1);
    expect(result.revokeObjectURLCalls).toContainEqual([result.objectUrl]);
  });

  test('createSettingsBackup injects automatic gear rules when exportAllData omits them', async () => {
    const storedRules = [{
      id: 'rule-backup',
      label: 'Backup Auto Gear Rule',
      scenarios: ['Studio'],
      add: [{
        id: 'item-backup',
        name: 'Wireless TX',
        category: 'wireless',
        quantity: 1,
      }],
      remove: [],
    }];
    localStorage.setItem('cameraPowerPlanner_autoGearRules', JSON.stringify(storedRules));

    const { createSettingsBackup } = loadApp();
    global.exportAllData.mockImplementation(() => ({}));

    const result = await captureBackupDownload(
      createSettingsBackup,
      new Date('2024-05-06T10:30:00Z'),
    );

    expect(result.payload).not.toBeNull();
    expect(result.payload.data).toBeDefined();
    expect(Array.isArray(result.payload.data.autoGearRules)).toBe(true);
    const exportedRules = result.payload.data.autoGearRules;
    const rule = exportedRules.find(entry => entry && entry.label === 'Backup Auto Gear Rule');
    expect(rule).toBeDefined();
    expect(rule).toEqual(expect.objectContaining({
      id: expect.any(String),
      label: 'Backup Auto Gear Rule',
      scenarios: ['Studio'],
      remove: [],
    }));
    expect(rule.add).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'Wireless TX',
        category: 'wireless',
        quantity: 1,
      }),
    ]));
  });

  test('createSettingsBackup falls back to data URLs when object URLs fail', () => {
    const { createSettingsBackup } = loadApp();

    localStorage.setItem('cameraPowerPlanner_devices', '{"lights":{}}');

    const originalCreateObjectURL = URL.createObjectURL;
    const createObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockImplementation(() => {
        throw new Error('object URL unavailable');
      });
    const revokeSpy = jest
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const originalCreateElement = document.createElement.bind(document);
    const anchors = [];
    jest.spyOn(document, 'createElement').mockImplementation(tagName => {
      const element = originalCreateElement(tagName);
      if (tagName === 'a') {
        element.click = jest.fn(() => anchors.push(element));
      }
      return element;
    });

    const fileName = createSettingsBackup(false, new Date('2024-05-06T10:00:00Z'));

    expect(typeof fileName).toBe('string');
    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(revokeSpy).not.toHaveBeenCalled();
    expect(anchors).toHaveLength(1);
    const anchor = anchors[0];
    expect(anchor.download).toBe(fileName);
    expect(anchor.href.startsWith('data:application/json;charset=utf-8,')).toBe(true);
    expect(anchor.click).toHaveBeenCalledTimes(1);

    createObjectURLSpy.mockRestore();
    revokeSpy.mockRestore();
    document.createElement.mockRestore();
    URL.createObjectURL = originalCreateObjectURL;
  });

  test('createSettingsBackup recovers data when exportAllData throws', async () => {
    const { createSettingsBackup } = loadApp();

    const fallbackDevices = { cameras: { recovered: true } };
    const fallbackSetups = { 'Main Setup': { gearList: '<p>Recovered</p>' } };
    const fallbackSession = { camera: 'FX6' };
    const fallbackFeedback = { note: 'Recovered feedback' };
    const fallbackProject = {
      'Main Setup': { projectInfo: { projectName: 'Main Setup' } },
    };
    const fallbackFavorites = { cameras: ['FX6'] };
    const fallbackBackups = [
      { id: 'auto-backup-1', createdAt: '2024-05-01T10:00:00Z', rules: [] },
    ];
    const fallbackPresets = [{ id: 'preset-1', label: 'Recovered preset' }];
    const fallbackHistory = [
      { createdAt: '2024-05-01T10:00:00Z', fileName: 'cine-power-planner-full-backup.json' },
    ];
    const fallbackRules = [{ id: 'rule-1', label: 'Recovered rule', add: [], remove: [], scenarios: [] }];

    global.getBaseAutoGearRules = jest.fn(() => null);
    global.loadDeviceData.mockImplementation(() => fallbackDevices);
    global.loadSetups.mockImplementation(() => fallbackSetups);
    global.loadSessionState.mockImplementation(() => fallbackSession);
    global.loadFavorites.mockImplementation(() => fallbackFavorites);
    global.loadProject.mockImplementation(() => fallbackProject);
    global.exportAllData.mockImplementation(() => { throw new Error('export failed'); });

    global.loadFeedback = jest.fn(() => fallbackFeedback);
    global.loadAutoGearBackups = jest.fn(() => fallbackBackups);
    global.loadAutoGearPresets = jest.fn(() => fallbackPresets);
    global.loadAutoGearSeedFlag = jest.fn(() => true);
    global.loadAutoGearActivePresetId = jest.fn(() => 'preset-1');
    global.loadAutoGearAutoPresetId = jest.fn(() => 'auto-1');
    global.loadAutoGearBackupVisibility = jest.fn(() => true);
    global.loadFullBackupHistory = jest.fn(() => fallbackHistory);
    global.loadAutoGearRules = jest.fn(() => fallbackRules);

    const result = await captureBackupDownload(
      createSettingsBackup,
      new Date('2024-05-06T11:45:00Z'),
    );

    expect(result.payload).not.toBeNull();
    expect(result.payload.data).toMatchObject({
      devices: fallbackDevices,
      setups: fallbackSetups,
      session: fallbackSession,
      feedback: fallbackFeedback,
      project: fallbackProject,
      favorites: fallbackFavorites,
      autoGearBackups: fallbackBackups,
      autoGearPresets: fallbackPresets,
      autoGearSeeded: true,
      autoGearActivePresetId: 'preset-1',
      autoGearAutoPresetId: 'auto-1',
      autoGearShowBackups: true,
      fullBackupHistory: fallbackHistory,
    });
    expect(result.payload.data.autoGearRules).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'Recovered rule' }),
    ]));

    expect(Array.isArray(result.payload.diagnostics)).toBe(true);
    expect(result.payload.diagnostics).toEqual(expect.arrayContaining([
      expect.objectContaining({ section: 'exportAllData', status: 'error' }),
      expect.objectContaining({ section: 'setups', status: 'recovered' }),
      expect.objectContaining({ section: 'autoGearRules', status: 'recovered' }),
    ]));
  });

  test('createSettingsBackup continues when individual storage entries fail to read', async () => {
    const { createSettingsBackup } = loadApp();

    const failingStorage = {
      length: 2,
      key: jest.fn(index => (index === 0 ? 'cameraPowerPlanner_devices' : 'broken-key')),
      getItem: jest.fn((key) => {
        if (key === 'broken-key') {
          throw new Error('access denied');
        }
        return '{"cameras":{"Alexa":1}}';
      }),
    };

    const originalGetSafeLocalStorage = global.getSafeLocalStorage;
    global.getSafeLocalStorage = jest.fn(() => failingStorage);

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      const result = await captureBackupDownload(
        createSettingsBackup,
        new Date('2024-05-06T12:15:00Z'),
      );

      expect(result.payload.settings).toHaveProperty(
        'cameraPowerPlanner_devices',
        '{"cameras":{"Alexa":1}}',
      );
      expect(result.payload.settings).not.toHaveProperty('broken-key');

      expect(failingStorage.getItem).toHaveBeenCalledTimes(2);
      expect(warnSpy).toHaveBeenCalledWith(
        'Failed to read storage entry for backup',
        'broken-key',
        expect.any(Error),
      );
    } finally {
      warnSpy.mockRestore();
      if (originalGetSafeLocalStorage) {
        global.getSafeLocalStorage = originalGetSafeLocalStorage;
      } else {
        delete global.getSafeLocalStorage;
      }
    }
  });

  test('restore surfaces errors when the backup payload cannot be parsed', () => {
    loadApp();

    const restoreInput = document.getElementById('restoreSettingsInput');
    expect(restoreInput).not.toBeNull();

    const fakeFile = { name: 'invalid-backup.json' };
    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    const originalAlert = window.alert;
    window.alert = jest.fn();

    const originalFileReader = window.FileReader;
    const readerInstance = {
      onload: null,
      onerror: null,
      readAsText: jest.fn(function readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: '{invalid json' } });
        }
      }),
    };
    window.FileReader = jest.fn(() => readerInstance);

    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation(tagName => {
      const element = originalCreateElement(tagName);
      if (tagName === 'a') {
        element.click = jest.fn();
      }
      return element;
    });

    try {
      restoreInput.dispatchEvent(new Event('change'));

      const textsByLang = window.texts || {};
      const expectedMessage =
        (textsByLang.en && textsByLang.en.restoreFailed)
        || 'Restore failed. Check the backup file and try again.';

      expect(window.alert).toHaveBeenCalledWith(expectedMessage);
      expect(restoreInput.value).toBe('');
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      document.createElement.mockRestore();
      delete restoreInput.files;
    }
  });

  test('restore rejects backups without recognized sections', () => {
    loadApp();

    const restoreInput = document.getElementById('restoreSettingsInput');
    expect(restoreInput).not.toBeNull();

    const fakeFile = { name: 'empty-backup.json' };
    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    const originalAlert = window.alert;
    window.alert = jest.fn();

    const originalFileReader = window.FileReader;
    const readerInstance = {
      onload: null,
      onerror: null,
      readAsText: jest.fn(function readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: '{}' } });
        }
      }),
    };
    window.FileReader = jest.fn(() => readerInstance);

    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation(tagName => {
      const element = originalCreateElement(tagName);
      if (tagName === 'a') {
        element.click = jest.fn();
      }
      return element;
    });

    try {
      restoreInput.dispatchEvent(new Event('change'));

      const textsByLang = window.texts || {};
      const expectedMessage =
        (textsByLang.en && textsByLang.en.restoreFailed)
        || 'Restore failed. Check the backup file and try again.';

      expect(window.alert).toHaveBeenCalledWith(expectedMessage);
      expect(restoreInput.value).toBe('');
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      document.createElement.mockRestore();
      delete restoreInput.files;
    }
  });

  test('restore handles backup payloads with a UTF-8 BOM prefix', () => {
    const { APP_VERSION } = loadApp();

    const restoreInput = document.getElementById('restoreSettingsInput');
    expect(restoreInput).not.toBeNull();

    const fakeFile = { name: 'bom-backup.json' };
    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    const originalAlert = window.alert;
    const originalFileReader = window.FileReader;
    window.alert = jest.fn();

    const bomContent = `\uFEFF${JSON.stringify({
      version: APP_VERSION,
      settings: { darkMode: 'true' },
    })}`;

    const readerInstance = {
      onload: null,
      onerror: null,
      readAsText: jest.fn(function readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: bomContent } });
        }
      }),
    };
    window.FileReader = jest.fn(() => readerInstance);

    try {
      restoreInput.dispatchEvent(new Event('change'));

      const textsByLang = window.texts || {};
      const storedLang = localStorage.getItem('language') || 'en';
      const expectedSuccess =
        (textsByLang[storedLang] && textsByLang[storedLang].restoreSuccess)
        || (textsByLang.en && textsByLang.en.restoreSuccess);

      expect(window.alert).toHaveBeenCalledWith(expectedSuccess);
      expect(localStorage.getItem('darkMode')).toBe('true');
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      delete restoreInput.files;
    }
  });

  test('restore reverts storage and preferences when import fails', () => {
    const { APP_VERSION } = loadApp();

    const restoreInput = document.getElementById('restoreSettingsInput');
    expect(restoreInput).not.toBeNull();

    const fakeFile = { name: 'failed-backup.json' };
    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    const originalAlert = window.alert;
    window.alert = jest.fn();

    const originalImportAllData = global.importAllData;
    global.importAllData = jest.fn(() => {
      throw new Error('Import failed');
    });

    const restorePayload = JSON.stringify({
      version: APP_VERSION,
      settings: {
        cameraPowerPlanner_setups: JSON.stringify({ mutated: true }),
        showAutoBackups: 'false',
      },
      sessionStorage: {
        'planner-session': 'mutated-session',
      },
      data: {
        setups: { mutated: true },
      },
    });

    const originalFileReader = window.FileReader;
    const readerInstance = {
      onload: null,
      onerror: null,
      readAsText: jest.fn(function readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: restorePayload } });
        }
      }),
    };
    window.FileReader = jest.fn(() => readerInstance);

    const originalShowAutoBackups = window.showAutoBackups;
    window.showAutoBackups = true;
    global.showAutoBackups = true;

    localStorage.setItem('cameraPowerPlanner_setups', JSON.stringify({ original: true }));
    localStorage.setItem('showAutoBackups', 'true');
    sessionStorage.setItem('planner-session', 'original-session');

    try {
      restoreInput.dispatchEvent(new Event('change'));

      expect(window.alert).toHaveBeenCalled();
      expect(localStorage.getItem('cameraPowerPlanner_setups')).toBe(JSON.stringify({ original: true }));
      expect(localStorage.getItem('showAutoBackups')).toBe('true');
      expect(sessionStorage.getItem('planner-session')).toBe('original-session');
      expect(window.showAutoBackups).toBe(true);
      expect(global.importAllData).toHaveBeenCalled();
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      global.importAllData = originalImportAllData;
      delete restoreInput.files;
      if (typeof originalShowAutoBackups !== 'undefined') {
        window.showAutoBackups = originalShowAutoBackups;
        global.showAutoBackups = originalShowAutoBackups;
      } else {
        delete window.showAutoBackups;
        delete global.showAutoBackups;
      }
    }
  });

  test('restore falls back to file.text when FileReader is unavailable', async () => {
    const { APP_VERSION } = loadApp();

    const restoreInput = document.getElementById('restoreSettingsInput');
    expect(restoreInput).not.toBeNull();

    const restoreData = {
      version: APP_VERSION,
      settings: {
        language: 'de',
      },
      data: {
        restoreFallback: true,
      },
    };

    const fakeFile = {
      name: 'fallback-backup.json',
      text: jest.fn(() => Promise.resolve(JSON.stringify(restoreData))),
    };

    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    const originalAlert = window.alert;
    const originalFileReader = window.FileReader;
    window.alert = jest.fn();
    delete window.FileReader;

    try {
      restoreInput.dispatchEvent(new Event('change'));

      await Promise.resolve();
      await Promise.resolve();
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(fakeFile.text).toHaveBeenCalledTimes(1);
      expect(window.importAllData).toHaveBeenCalledWith(expect.objectContaining({ restoreFallback: true }));

      const textsByLang = window.texts || {};
      const storedLang = localStorage.getItem('language') || 'en';
      const expectedSuccess =
        (textsByLang[storedLang] && textsByLang[storedLang].restoreSuccess)
        || (textsByLang.en && textsByLang.en.restoreSuccess);

      expect(window.alert).toHaveBeenCalledWith(expectedSuccess);
      expect(localStorage.getItem('language')).toBe('de');
    } finally {
      window.alert = originalAlert;
      if (typeof originalFileReader === 'undefined') {
        delete window.FileReader;
      } else {
        window.FileReader = originalFileReader;
      }
      delete restoreInput.files;
    }
  });
});
