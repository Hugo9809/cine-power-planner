const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

jest.setTimeout(10000);

function createEnvironment(overrides = {}) {
  const env = setupScriptEnvironment({
    readyState: 'complete',
    globals: {
      loadSetups: jest.fn(() => ({})),
      saveSetups: jest.fn(),
      saveProject: jest.fn(),
      loadProject: jest.fn(() => ({})),
      showNotification: jest.fn(),
      exportAllData: jest.fn(() => ({ exported: true, autoGearRules: [] })),
      importAllData: jest.fn(),
      clearAllData: jest.fn(),
      ...overrides.globals
    }
  });

  return env;
}

function primeSetupSelection(name = 'Main Setup') {
  const setupSelect = document.getElementById('setupSelect');
  const setupNameInput = document.getElementById('setupName');
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  setupSelect.appendChild(option);
  setupSelect.value = name;
  setupNameInput.value = name;

  const gearListOutput = document.getElementById('gearListOutput');
  gearListOutput.classList.remove('hidden');
  gearListOutput.innerHTML = '<h3>Gear List</h3><table class="gear-table"><tr><td>1x Alexa 35</td></tr></table>';
}

async function captureBackupDownload(createSettingsBackup, timestamp = new Date('2024-05-06T10:00:00Z')) {
  const objectUrl = 'blob:backup-payload';
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

  const createSpy = jest
    .spyOn(URL, 'createObjectURL')
    .mockReturnValue(objectUrl);
  const revokeSpy = jest
    .spyOn(URL, 'revokeObjectURL')
    .mockImplementation(() => {});

  const originalCreateElement = document.createElement.bind(document);
  const clickedAnchors = [];
  jest.spyOn(document, 'createElement').mockImplementation(tag => {
    const element = originalCreateElement(tag);
    if (tag === 'a') {
      element.click = () => clickedAnchors.push(element);
    }
    return element;
  });

  try {
    const fileName = createSettingsBackup(false, timestamp);
    const blob = createSpy.mock.calls[0]?.[0] ?? null;
    const payload = blob && typeof blob.text === 'function'
      ? JSON.parse(await blob.text())
      : null;

    return {
      fileName,
      payload,
      objectUrl,
      clickedAnchors,
      createCalls: createSpy.mock.calls,
      revokeCalls: revokeSpy.mock.calls
    };
  } finally {
    document.createElement.mockRestore();
    createSpy.mockRestore();
    revokeSpy.mockRestore();
    if (typeof originalBlob === 'undefined') {
      delete global.Blob;
    } else {
      global.Blob = originalBlob;
    }
  }
}

describe('automated backup safeguards (essential coverage)', () => {
  let env;

  afterEach(() => {
    jest.useRealTimers();
    env?.cleanup();
    env = null;
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('autoBackup captures the current setup and saves a hidden snapshot', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:30:00Z'));

    env = createEnvironment();
    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
    env.globals.loadSetups.mockImplementation(() => ({ ...setupsStore }));
    env.globals.saveSetups.mockImplementation(next => {
      Object.assign(setupsStore, next);
      return next;
    });

    primeSetupSelection('Main Setup');

    const backupKey = env.utils.autoBackup();

    expect(typeof backupKey).toBe('string');
    expect(backupKey).toMatch(/^auto-backup-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-Main Setup$/);
    expect(env.globals.saveSetups).toHaveBeenCalledTimes(1);
    expect(env.globals.saveProject).toHaveBeenCalledWith(
      backupKey,
      expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Main Setup' }),
        gearList: expect.stringContaining('Alexa 35')
      })
    );

    const setupSelect = document.getElementById('setupSelect');
    const optionValues = Array.from(setupSelect.options).map(opt => opt.value);
    expect(optionValues).not.toContain(backupKey);
  });

  test('enabling the show auto backups toggle reveals snapshots and persists the preference', () => {
    env = createEnvironment();
    const setupsStore = { 'Main Setup': { projectInfo: { projectName: 'Main Setup' } } };
    env.globals.loadSetups.mockImplementation(() => ({ ...setupsStore }));
    env.globals.saveSetups.mockImplementation(next => {
      Object.assign(setupsStore, next);
      return next;
    });

    primeSetupSelection('Main Setup');

    const backupKey = env.utils.autoBackup();
    const setupSelect = document.getElementById('setupSelect');
    expect(Array.from(setupSelect.options).map(opt => opt.value)).not.toContain(backupKey);

    document.getElementById('settingsButton').click();
    const toggle = document.getElementById('settingsShowAutoBackups');
    toggle.checked = true;
    toggle.dispatchEvent(new Event('change'));

    const updatedValues = Array.from(setupSelect.options).map(opt => opt.value);
    expect(updatedValues).toContain(backupKey);
    expect(localStorage.getItem('showAutoBackups')).toBe('true');
  });

  test('createSettingsBackup bundles storage snapshots and exported data', async () => {
    env = createEnvironment();

    localStorage.setItem('cameraPowerPlanner_devices', '{"cameras":{}}');
    sessionStorage.setItem('cameraPowerPlanner_session', '{"camera":"Alexa"}');

    const result = await captureBackupDownload(env.utils.createSettingsBackup);

    expect(typeof result.fileName).toBe('string');
    expect(result.createCalls).toHaveLength(1);
    expect(result.clickedAnchors).toHaveLength(1);
    expect(result.revokeCalls).toContainEqual([result.objectUrl]);
    expect(result.payload).toMatchObject({
      settings: expect.objectContaining({
        cameraPowerPlanner_devices: '{"cameras":{}}'
      }),
      sessionStorage: expect.objectContaining({
        cameraPowerPlanner_session: '{"camera":"Alexa"}'
      }),
      data: expect.objectContaining({ exported: true })
    });
  });

  test('restore alerts the user when the payload cannot be parsed', () => {
    env = createEnvironment();

    const restoreInput = document.getElementById('restoreSettingsInput');
    expect(restoreInput).not.toBeNull();

    const fakeFile = { name: 'invalid-backup.json' };
    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile]
    });

    const originalAlert = window.alert;
    window.alert = jest.fn();

    const readerInstance = {
      onload: null,
      onerror: null,
      readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: '{invalid json' } });
        }
      }
    };

    const originalFileReader = window.FileReader;
    window.FileReader = jest.fn(() => readerInstance);

    try {
      restoreInput.dispatchEvent(new Event('change'));

      const textsByLang = window.texts || {};
      const expectedMessage = textsByLang.en?.restoreFailed
        || 'Restore failed. Check the backup file and try again.';

      expect(window.alert).toHaveBeenCalledWith(expectedMessage);
      expect(restoreInput.value).toBe('');
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      delete restoreInput.files;
    }
  });
});
