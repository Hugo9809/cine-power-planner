const FAVORITES_KEY = 'cameraPowerPlanner_favorites';

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

  beforeEach(() => {
    jest.resetModules();

    if (typeof window === 'undefined') {
      global.window = {};
    }

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

