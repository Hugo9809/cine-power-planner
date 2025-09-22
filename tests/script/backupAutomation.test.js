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

  return require('../../src/scripts/script.js');
};

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

  test('createSettingsBackup stores a fallback copy when downloads are unavailable', () => {
    const { createSettingsBackup, setLanguage } = loadApp();

    setLanguage('en');

    const fallbackKey = 'cameraPowerPlanner_backupFallbacks';
    expect(localStorage.getItem(fallbackKey)).toBeNull();

    const fallbackEmpty = document.getElementById('backupFallbackEmpty');
    expect(fallbackEmpty).not.toBeNull();
    expect(fallbackEmpty.hasAttribute('hidden')).toBe(false);

    localStorage.setItem('cameraPowerPlanner_devices', '{"audio":{}}');

    const originalCreateObjectURL = URL.createObjectURL;
    const createObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockImplementation(() => {
        throw new Error('createObjectURL failed');
      });

    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName) => {
        if (String(tagName).toLowerCase() === 'a') {
          return { style: {}, click: jest.fn() };
        }
        return originalCreateElement(tagName);
      });

    try {
      const result = createSettingsBackup(false, new Date('2024-05-06T12:30:00Z'));

      expect(result).toBeNull();

      const storedRaw = localStorage.getItem(fallbackKey);
      expect(storedRaw).not.toBeNull();

      const stored = JSON.parse(storedRaw);
      expect(Array.isArray(stored)).toBe(true);
      expect(stored.length).toBeGreaterThan(0);

      const latest = stored[0];
      expect(latest.fileName).toBe('2024-05-06T12-30-00Z full app backup.json');
      expect(latest.savedAt).toBe('2024-05-06T12:30:00Z');
      expect(typeof latest.payload).toBe('string');
      expect(latest.payload).toContain('"generatedAt":"2024-05-06T12:30:00Z"');
      expect(latest.payload).toContain('"cameraPowerPlanner_devices"');

      const list = document.getElementById('backupFallbackList');
      expect(list).not.toBeNull();
      expect(list.children).toHaveLength(1);
      const item = list.querySelector('.backup-fallback-item');
      expect(item).not.toBeNull();
      const buttonLabels = Array.from(item.querySelectorAll('button')).map((btn) => btn.textContent.trim());
      expect(buttonLabels[0]).toContain(global.texts.en.backupFallbackDownload);
      expect(buttonLabels[1]).toContain(global.texts.en.backupFallbackCopy);
      expect(buttonLabels[2]).toContain(global.texts.en.backupFallbackRemove);
      expect(fallbackEmpty.hasAttribute('hidden')).toBe(true);
    } finally {
      createObjectURLSpy.mockRestore();
      createElementSpy.mockRestore();
      URL.createObjectURL = originalCreateObjectURL;
    }
  });

  test('browser-stored backups support download, copy and removal', () => {
    const { createSettingsBackup, setLanguage } = loadApp();

    setLanguage('en');

    const fallbackKey = 'cameraPowerPlanner_backupFallbacks';
    localStorage.setItem('cameraPowerPlanner_devices', '{"audio":{}}');

    const originalCreateObjectURL = URL.createObjectURL;
    const failCreateObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockImplementation(() => {
        throw new Error('createObjectURL failed');
      });

    const originalCreateElement = document.createElement.bind(document);
    const failCreateElementSpy = jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName) => {
        if (String(tagName).toLowerCase() === 'a') {
          return { style: {}, click: jest.fn() };
        }
        return originalCreateElement(tagName);
      });

    try {
      createSettingsBackup(false, new Date('2024-05-06T12:30:00Z'));
    } finally {
      failCreateObjectURLSpy.mockRestore();
      failCreateElementSpy.mockRestore();
      URL.createObjectURL = originalCreateObjectURL;
    }

    const list = document.getElementById('backupFallbackList');
    const item = list.querySelector('.backup-fallback-item');
    expect(item).not.toBeNull();
    const [downloadButton, copyButton, removeButton] = item.querySelectorAll('button');

    const triggeredAnchors = [];
    const originalExecCommand = document.execCommand;
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    let downloadCreateElementSpy;
    let downloadCreateObjectURLSpy;
    let revokeSpy;

    try {
      downloadCreateElementSpy = jest
        .spyOn(document, 'createElement')
        .mockImplementation((tagName) => {
          const element = originalCreateElement(tagName);
          if (String(tagName).toLowerCase() === 'a') {
            element.click = jest.fn(() => triggeredAnchors.push(element));
          }
          return element;
        });
      downloadCreateObjectURLSpy = jest
        .spyOn(URL, 'createObjectURL')
        .mockImplementation(() => 'blob:fallback-download');
      revokeSpy = jest
        .spyOn(URL, 'revokeObjectURL')
        .mockImplementation(() => {});
      document.execCommand = jest.fn(() => true);

      downloadButton.click();

      expect(downloadCreateObjectURLSpy).toHaveBeenCalled();
      expect(triggeredAnchors).toHaveLength(1);
      expect(triggeredAnchors[0].download).toBe('2024-05-06T12-30-00Z full app backup.json');
      expect(triggeredAnchors[0].click).toHaveBeenCalledTimes(1);
      const notificationContainer = document.getElementById('backupNotificationContainer');
      expect(notificationContainer).not.toBeNull();
      const downloadNotification = notificationContainer.lastElementChild;
      expect(downloadNotification).not.toBeNull();
      expect(downloadNotification.textContent).toBe(global.texts.en.backupFallbackDownloadSuccess);

      copyButton.click();
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      const copyNotification = notificationContainer.lastElementChild;
      expect(copyNotification).not.toBeNull();
      expect(copyNotification.textContent).toBe(global.texts.en.backupFallbackCopySuccess);

      removeButton.click();

      expect(confirmSpy).toHaveBeenCalled();
      const removeNotification = notificationContainer.lastElementChild;
      expect(removeNotification).not.toBeNull();
      expect(removeNotification.textContent).toBe(global.texts.en.backupFallbackRemoveSuccess);
      expect(localStorage.getItem(fallbackKey)).toBeNull();
      const fallbackEmpty = document.getElementById('backupFallbackEmpty');
      expect(fallbackEmpty.hasAttribute('hidden')).toBe(false);
    } finally {
      if (downloadCreateElementSpy) downloadCreateElementSpy.mockRestore();
      if (downloadCreateObjectURLSpy) downloadCreateObjectURLSpy.mockRestore();
      if (revokeSpy) revokeSpy.mockRestore();
      document.execCommand = originalExecCommand;
      confirmSpy.mockRestore();
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
