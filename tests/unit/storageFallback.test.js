const FAVORITES_KEY = 'cameraPowerPlanner_favorites';
const SESSION_FALLBACK_ALERT_FLAG_NAME = '__cameraPowerPlannerSessionFallbackAlertShown';

const createQuotaStorage = (initialData = {}) => {
  const store = { ...initialData };
  const quotaError = () => {
    const error = new Error('Quota exceeded');
    error.name = 'QuotaExceededError';
    error.code = 22;
    error.number = 22;
    return error;
  };

  return {
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index) => {
      const keys = Object.keys(store);
      return index >= 0 && index < keys.length ? keys[index] : null;
    }),
    getItem: jest.fn((key) =>
      Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
    ),
    setItem: jest.fn(() => {
      throw quotaError();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
  };
};

describe('SAFE_LOCAL_STORAGE fallback behaviour', () => {
  let originalLocalStorageDescriptor;
  let storageModule;
  let originalAlert;

  beforeEach(() => {
    jest.resetModules();

    if (typeof window === 'undefined') {
      global.window = {};
    }

    delete global[SESSION_FALLBACK_ALERT_FLAG_NAME];
    delete global.window[SESSION_FALLBACK_ALERT_FLAG_NAME];

    originalAlert = global.window.alert;
    global.window.alert = jest.fn();

    originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'localStorage');

    const session = global.sessionStorage;
    session.clear();

    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: session,
    });

    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('blocked');
      },
    });

    storageModule = require('../../src/scripts/storage');
  });

  afterEach(() => {
    jest.resetModules();

    delete global[SESSION_FALLBACK_ALERT_FLAG_NAME];
    if (global.window) {
      delete global.window[SESSION_FALLBACK_ALERT_FLAG_NAME];
    }

    if (originalAlert === undefined) {
      delete global.window.alert;
    } else {
      global.window.alert = originalAlert;
    }

    if (originalLocalStorageDescriptor) {
      Object.defineProperty(global.window, 'localStorage', originalLocalStorageDescriptor);
    } else {
      delete global.window.localStorage;
    }

    delete global.window.sessionStorage;
  });

  test('falls back to sessionStorage when localStorage is unavailable', () => {
    const { saveFavorites, loadFavorites } = storageModule;

    saveFavorites({ cameraSelect: ['Alexa Mini'] });

    expect(global.sessionStorage.getItem(FAVORITES_KEY)).toBe(
      JSON.stringify({ cameraSelect: ['Alexa Mini'] })
    );
    expect(global.localStorage.getItem(FAVORITES_KEY)).toBeNull();
    expect(loadFavorites()).toEqual({ cameraSelect: ['Alexa Mini'] });
  });

  test('notifies the user when falling back to sessionStorage', () => {
    const expectedMessage =
      'Warning: Local storage is unavailable. Data will only persist for this browser tab.';

    expect(global.window.alert).toHaveBeenCalledTimes(1);
    expect(global.window.alert).toHaveBeenCalledWith(expectedMessage);
  });
});

describe('SAFE_LOCAL_STORAGE downgrade handling', () => {
  const createToggleableStorage = () => {
    const store = {};
    let failWrites = false;
    return {
      enableFailure() {
        failWrites = true;
      },
      disableFailure() {
        failWrites = false;
      },
      get length() {
        return Object.keys(store).length;
      },
      key: jest.fn((index) => {
        const keys = Object.keys(store);
        return index >= 0 && index < keys.length ? keys[index] : null;
      }),
      getItem: jest.fn((key) =>
        Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
      ),
      setItem: jest.fn((key, value) => {
        if (failWrites) {
          throw new Error('blocked');
        }
        store[key] = String(value);
      }),
      removeItem: jest.fn((key) => {
        if (failWrites) {
          throw new Error('blocked');
        }
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach((key) => delete store[key]);
      }),
    };
  };

  const createMemoryStorage = () => {
    const store = {};
    return {
      get length() {
        return Object.keys(store).length;
      },
      key: jest.fn((index) => {
        const keys = Object.keys(store);
        return index >= 0 && index < keys.length ? keys[index] : null;
      }),
      getItem: jest.fn((key) =>
        Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
      ),
      setItem: jest.fn((key, value) => {
        store[key] = String(value);
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach((key) => delete store[key]);
      }),
    };
  };

  let originalWindow;
  let originalLocalStorageDescriptor;
  let originalSessionStorageDescriptor;
  let originalGlobalLocalStorage;
  let originalGlobalSessionStorage;
  let toggleStorage;
  let storageModule;
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    jest.resetModules();

    originalWindow = typeof global.window === 'undefined' ? undefined : global.window;
    if (!global.window) {
      global.window = {};
    }

    originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'localStorage');
    originalSessionStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'sessionStorage');

    originalGlobalLocalStorage = global.localStorage;
    originalGlobalSessionStorage = global.sessionStorage;

    toggleStorage = createToggleableStorage();
    const session = createMemoryStorage();

    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      value: toggleStorage,
    });

    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: session,
    });

    global.localStorage = toggleStorage;
    global.sessionStorage = session;

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    storageModule = require('../../src/scripts/storage');
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    jest.resetModules();

    if (originalLocalStorageDescriptor) {
      Object.defineProperty(global.window, 'localStorage', originalLocalStorageDescriptor);
    } else if (global.window) {
      delete global.window.localStorage;
    }

    if (originalSessionStorageDescriptor) {
      Object.defineProperty(global.window, 'sessionStorage', originalSessionStorageDescriptor);
    } else if (global.window) {
      delete global.window.sessionStorage;
    }

    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }

    if (originalGlobalLocalStorage !== undefined) {
      global.localStorage = originalGlobalLocalStorage;
    } else {
      delete global.localStorage;
    }

    if (originalGlobalSessionStorage !== undefined) {
      global.sessionStorage = originalGlobalSessionStorage;
    } else {
      delete global.sessionStorage;
    }
  });

  test('downgrades to in-memory storage after write failures', () => {
    const { saveFavorites, getSafeLocalStorage } = storageModule;

    toggleStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify({ cameraSelect: ['Existing'] }),
    );

    toggleStorage.enableFailure();

    saveFavorites({ cameraSelect: ['Updated'] });

    const downgradedStorage = getSafeLocalStorage();
    expect(downgradedStorage).not.toBe(toggleStorage);
    expect(downgradedStorage.getItem(FAVORITES_KEY)).toBe(
      JSON.stringify({ cameraSelect: ['Existing'] }),
    );

    saveFavorites({ cameraSelect: ['Recovered'] });

    expect(getSafeLocalStorage().getItem(FAVORITES_KEY)).toBe(
      JSON.stringify({ cameraSelect: ['Recovered'] }),
    );
  });
});

describe('SAFE_LOCAL_STORAGE quota handling', () => {
  let originalWindow;
  let originalLocalStorageDescriptor;
  let originalSessionStorageDescriptor;
  let originalGlobalLocalStorage;
  let originalGlobalSessionStorage;
  let consoleWarnSpy;

  beforeEach(() => {
    jest.resetModules();

    originalWindow = typeof global.window === 'undefined' ? undefined : global.window;
    if (!global.window) {
      global.window = {};
    }

    originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'localStorage');
    originalSessionStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'sessionStorage');

    originalGlobalLocalStorage = global.localStorage;
    originalGlobalSessionStorage = global.sessionStorage;

    const session = originalGlobalSessionStorage || global.sessionStorage;
    if (!session) {
      const memoryStore = {};
      const sessionMock = {
        get length() {
          return Object.keys(memoryStore).length;
        },
        key: jest.fn((index) => {
          const keys = Object.keys(memoryStore);
          return index >= 0 && index < keys.length ? keys[index] : null;
        }),
        getItem: jest.fn((key) =>
          Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null,
        ),
        setItem: jest.fn((key, value) => {
          memoryStore[key] = String(value);
        }),
        removeItem: jest.fn((key) => {
          delete memoryStore[key];
        }),
        clear: jest.fn(() => {
          Object.keys(memoryStore).forEach((key) => delete memoryStore[key]);
        }),
      };
      global.sessionStorage = sessionMock;
    }

    const activeSession = global.sessionStorage;
    if (typeof activeSession.clear === 'function') {
      activeSession.clear();
    }
    if (activeSession.getItem && activeSession.getItem.mockClear) {
      activeSession.getItem.mockClear();
    }
    if (activeSession.setItem && activeSession.setItem.mockClear) {
      activeSession.setItem.mockClear();
    }
    if (activeSession.removeItem && activeSession.removeItem.mockClear) {
      activeSession.removeItem.mockClear();
    }
    if (activeSession.key && activeSession.key.mockClear) {
      activeSession.key.mockClear();
    }

    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: activeSession,
    });

    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    jest.resetModules();

    if (originalLocalStorageDescriptor) {
      Object.defineProperty(global.window, 'localStorage', originalLocalStorageDescriptor);
    } else if (global.window) {
      delete global.window.localStorage;
    }

    if (originalSessionStorageDescriptor) {
      Object.defineProperty(global.window, 'sessionStorage', originalSessionStorageDescriptor);
    } else if (global.window) {
      delete global.window.sessionStorage;
    }

    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }

    if (originalGlobalLocalStorage !== undefined) {
      global.localStorage = originalGlobalLocalStorage;
    } else {
      delete global.localStorage;
    }

    if (originalGlobalSessionStorage !== undefined) {
      global.sessionStorage = originalGlobalSessionStorage;
    } else {
      delete global.sessionStorage;
    }
  });

  test('retains localStorage when quota errors occur but stored entries exist', () => {
    const quotaStorage = createQuotaStorage({
      [FAVORITES_KEY]: JSON.stringify({ cameraSelect: ['Alexa Mini'] }),
    });

    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      value: quotaStorage,
    });
    global.localStorage = quotaStorage;

    const { getSafeLocalStorage, loadFavorites } = require('../../src/scripts/storage');

    expect(getSafeLocalStorage()).toBe(quotaStorage);
    expect(loadFavorites()).toEqual({ cameraSelect: ['Alexa Mini'] });

    const quotaWarning = consoleWarnSpy.mock.calls.find(
      ([message]) => typeof message === 'string' && message.includes('localStorage quota exceeded')
    );
    expect(quotaWarning).toBeDefined();
    expect(quotaStorage.setItem).toHaveBeenCalledTimes(1);
    expect(quotaStorage.setItem.mock.calls[0][0]).toBe('__storage_test__');
  });

  test('falls back to sessionStorage when quota errors occur without stored entries', () => {
    const quotaStorage = createQuotaStorage();

    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      value: quotaStorage,
    });
    global.localStorage = quotaStorage;

    const { getSafeLocalStorage, saveFavorites } = require('../../src/scripts/storage');

    expect(getSafeLocalStorage()).toBe(global.sessionStorage);

    saveFavorites({ cameraSelect: ['Alexa Mini'] });

    const sessionCalls = global.sessionStorage.setItem.mock.calls;
    expect(sessionCalls[0][0]).toBe('__storage_test__');
    expect(sessionCalls).toEqual(expect.arrayContaining([
      [FAVORITES_KEY, JSON.stringify({ cameraSelect: ['Alexa Mini'] })],
      [`${FAVORITES_KEY}__backup`, JSON.stringify({ cameraSelect: ['Alexa Mini'] })],
    ]));
    expect(quotaStorage.setItem).toHaveBeenCalledTimes(1);
    expect(quotaStorage.setItem.mock.calls[0][0]).toBe('__storage_test__');
  });
});

describe('SAFE_LOCAL_STORAGE upgrade behaviour', () => {
  let originalWindow;
  let originalLocalStorageDescriptor;
  let originalGlobalLocalStorage;

  beforeEach(() => {
    jest.resetModules();

    originalWindow = typeof global.window === 'undefined' ? undefined : global.window;
    if (!global.window) {
      global.window = {};
    }

    originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'localStorage');
    originalGlobalLocalStorage = global.localStorage;

    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('blocked');
      },
    });

    if (!global.sessionStorage) {
      const memoryStore = {};
      global.sessionStorage = {
        get length() {
          return Object.keys(memoryStore).length;
        },
        key: jest.fn((index) => {
          const keys = Object.keys(memoryStore);
          return index >= 0 && index < keys.length ? keys[index] : null;
        }),
        getItem: jest.fn((key) =>
          Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null,
        ),
        setItem: jest.fn((key, value) => {
          memoryStore[key] = String(value);
        }),
        removeItem: jest.fn((key) => {
          delete memoryStore[key];
        }),
        clear: jest.fn(() => {
          Object.keys(memoryStore).forEach((key) => delete memoryStore[key]);
        }),
      };
    }

    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: global.sessionStorage,
    });

    if (typeof global.sessionStorage.clear === 'function') {
      global.sessionStorage.clear();
    }
  });

  afterEach(() => {
    jest.resetModules();

    if (originalLocalStorageDescriptor) {
      Object.defineProperty(global.window, 'localStorage', originalLocalStorageDescriptor);
    } else if (global.window) {
      delete global.window.localStorage;
    }

    if (originalGlobalLocalStorage !== undefined) {
      global.localStorage = originalGlobalLocalStorage;
    } else {
      delete global.localStorage;
    }

    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  });

  test('upgrades fallback storage to localStorage when it becomes available', () => {
    const { saveFavorites, loadFavorites, getSafeLocalStorage } = require('../../src/scripts/storage');

    saveFavorites({ cameraSelect: ['Alexa Mini'] });

    const workingStore = (() => {
      const memory = {};
      return {
        get length() {
          return Object.keys(memory).length;
        },
        key: jest.fn((index) => {
          const keys = Object.keys(memory);
          return index >= 0 && index < keys.length ? keys[index] : null;
        }),
        getItem: jest.fn((key) => (Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null)),
        setItem: jest.fn((key, value) => {
          memory[key] = String(value);
        }),
        removeItem: jest.fn((key) => {
          delete memory[key];
        }),
        clear: jest.fn(() => {
          Object.keys(memory).forEach((key) => delete memory[key]);
        }),
      };
    })();

    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      value: workingStore,
    });
    global.localStorage = workingStore;

    const upgraded = getSafeLocalStorage();

    expect(upgraded).toBe(workingStore);
    expect(workingStore.setItem).toHaveBeenCalledWith(
      'cameraPowerPlanner_favorites',
      JSON.stringify({ cameraSelect: ['Alexa Mini'] }),
    );

    expect(loadFavorites()).toEqual({ cameraSelect: ['Alexa Mini'] });
  });
});

