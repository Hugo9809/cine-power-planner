const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';

describe('project deletion backups', () => {
  const createStorage = () => {
    const data = new Map();
    const storage = {
      getItem(key) {
        return data.has(String(key)) ? data.get(String(key)) : null;
      },
      setItem(key, value) {
        data.set(String(key), String(value));
      },
      removeItem(key) {
        data.delete(String(key));
      },
      clear() {
        data.clear();
      },
      key(index) {
        const keys = Array.from(data.keys());
        return index >= 0 && index < keys.length ? keys[index] : null;
      },
    };

    Object.defineProperty(storage, 'length', {
      configurable: true,
      enumerable: false,
      get() {
        return data.size;
      },
    });

    return storage;
  };

  let originalDeepClone;
  let originalWindow;
  let hadWindow;
  let storageModule;
  let storage;

  beforeEach(() => {
    jest.resetModules();

    originalDeepClone = global.__cineDeepClone;
    global.__cineDeepClone = (value) => {
      if (value === null || typeof value !== 'object') {
        return value;
      }
      const stack = typeof Error === 'function' ? new Error().stack : '';
      if (typeof stack === 'string' && stack.includes('cloneProjectEntryForBackup')) {
        return undefined;
      }
      try {
        return JSON.parse(JSON.stringify(value));
      } catch {
        return value;
      }
    };

    hadWindow = Object.prototype.hasOwnProperty.call(global, 'window');
    originalWindow = global.window;
    if (!hadWindow || typeof global.window !== 'object') {
      global.window = {};
    }

    storage = createStorage();
    global.window.alert = jest.fn();
    global.window.localStorage = storage;
    global.window.sessionStorage = storage;
    global.localStorage = storage;
    global.sessionStorage = storage;

    storageModule = require('../../src/scripts/storage');
  });

  afterEach(() => {
    if (originalDeepClone === undefined) {
      delete global.__cineDeepClone;
    } else {
      global.__cineDeepClone = originalDeepClone;
    }

    if (!hadWindow) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
    delete global.localStorage;
    delete global.sessionStorage;
  });

  test('deleting a project skips the storage alert when backup cloning returns undefined', () => {
    const { saveProject, deleteProject } = storageModule;

    saveProject('Test Project', { gearList: '', projectInfo: { label: 'Original' } });

    global.window.alert.mockClear();

    deleteProject('Test Project');

    expect(global.window.alert).not.toHaveBeenCalled();
    expect(storage.getItem(PROJECT_STORAGE_KEY)).toBeNull();
  });
});
