const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');
const { createIndexedDbMock } = require('../helpers/indexedDbMock');

const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';

describe('durable storage fallback (dom)', () => {
  let env;
  let originalWindowLocalStorageDescriptor;
  let originalGlobalLocalStorageDescriptor;
  let originalAlert;

  beforeEach(() => {
    jest.useFakeTimers();
    env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({})),
      },
    });

    originalAlert = window.alert;
    window.alert = jest.fn();

    originalWindowLocalStorageDescriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');
    originalGlobalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global, 'localStorage');

    const blockedStorage = {
      get length() {
        return 0;
      },
      key: () => null,
      getItem: () => null,
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {},
      clear: () => {},
    };

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        return blockedStorage;
      },
    });

    Object.defineProperty(global, 'localStorage', {
      configurable: true,
      get() {
        return blockedStorage;
      },
    });

    global.indexedDB = createIndexedDbMock();
  });

  afterEach(() => {
    jest.useRealTimers();
    env?.cleanup();
    env = null;

    if (originalAlert === undefined) {
      delete window.alert;
    } else {
      window.alert = originalAlert;
    }

    if (originalWindowLocalStorageDescriptor) {
      Object.defineProperty(window, 'localStorage', originalWindowLocalStorageDescriptor);
    } else {
      delete window.localStorage;
    }

    if (originalGlobalLocalStorageDescriptor) {
      Object.defineProperty(global, 'localStorage', originalGlobalLocalStorageDescriptor);
    } else {
      delete global.localStorage;
    }

    delete global.indexedDB;
  });

  test('autosave, share, backup and restore operate with the durable fallback', async () => {
    const storage = require('../../src/scripts/storage.js');

    const setupNameInput = document.getElementById('setupName');
    const projectForm = document.getElementById('projectForm');
    const productionCompanyInput = projectForm.querySelector('#productionCompany');

    setupNameInput.value = 'Durable Offline';
    setupNameInput.dispatchEvent(new Event('input'));

    productionCompanyInput.value = 'Vault Pictures';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));

    jest.advanceTimersByTime(600);

    const safeStorage = window.SAFE_LOCAL_STORAGE;
    expect(safeStorage).toBeDefined();

    const projectRaw = safeStorage.getItem(PROJECT_STORAGE_KEY);
    expect(projectRaw).toContain('Durable Offline');

    storage.saveFavorites({ cameraSelect: ['LS 600X'] });

    const exported = storage.exportAllData();
    expect(typeof exported).toBe('string');

    storage.clearAllData();
    expect(storage.loadFavorites()).toEqual({});

    storage.importAllData(exported);
    expect(storage.loadFavorites()).toEqual({ cameraSelect: ['LS 600X'] });

    const restoredProject = storage.loadProject('Durable Offline');
    expect(restoredProject).toBeDefined();
    expect(restoredProject.projectInfo.productionCompany).toBe('Vault Pictures');

    jest.runOnlyPendingTimers();
    await Promise.resolve();
    const durableStore = global.indexedDB.__stores.get('kv');
    expect(durableStore.has(PROJECT_STORAGE_KEY)).toBe(true);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('backup')
    );
    expect(window.texts.en.alertDurableFallback).toContain('backup');
  });
});
