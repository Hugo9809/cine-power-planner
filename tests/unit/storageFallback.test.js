const FAVORITES_KEY = 'cameraPowerPlanner_favorites';
const DEVICE_KEY = 'cameraPowerPlanner_devices';
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
  let originalWindowLocalStorageDescriptor;
  let originalGlobalLocalStorageDescriptor;
  let storageModule;
  let originalAlert;

  beforeEach(() => {
    jest.resetModules();

    if (typeof window === 'undefined') {
      global.window = {};
    }

    delete global[SESSION_FALLBACK_ALERT_FLAG_NAME];
    delete global.window[SESSION_FALLBACK_ALERT_FLAG_NAME];
    delete global.SAFE_LOCAL_STORAGE;
    if (global.window) {
      delete global.window.SAFE_LOCAL_STORAGE;
    }
    if (global.__cineGlobal) {
      delete global.__cineGlobal.SAFE_LOCAL_STORAGE;
    }

    originalAlert = global.window.alert;
    global.window.alert = jest.fn();

    originalWindowLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'localStorage');
    originalGlobalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global, 'localStorage');

    const session = global.sessionStorage;
    session.clear();

    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: session,
    });

    const blockedStorage = {
      get length() {
        return 0;
      },
      key: jest.fn(() => null),
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => {
        throw new Error('blocked');
      }),
      removeItem: jest.fn(() => {}),
      clear: jest.fn(() => {}),
    };

    const defineBlockedDescriptor = (target) => {
      Object.defineProperty(target, 'localStorage', {
        configurable: true,
        get() {
          return blockedStorage;
        },
      });
    };

    defineBlockedDescriptor(global.window);
    if (global.window !== global) {
      defineBlockedDescriptor(global);
    } else {
      defineBlockedDescriptor(global);
    }

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

    if (originalWindowLocalStorageDescriptor) {
      Object.defineProperty(global.window, 'localStorage', originalWindowLocalStorageDescriptor);
    } else {
      delete global.window.localStorage;
    }

    if (global.window !== global) {
      if (originalGlobalLocalStorageDescriptor) {
        Object.defineProperty(global, 'localStorage', originalGlobalLocalStorageDescriptor);
      } else {
        delete global.localStorage;
      }
    } else if (originalGlobalLocalStorageDescriptor) {
      Object.defineProperty(global, 'localStorage', originalGlobalLocalStorageDescriptor);
    }

    delete global.window.sessionStorage;
  });

  test('falls back to sessionStorage when localStorage is unavailable', () => {
    const { saveFavorites, loadFavorites } = storageModule;

    saveFavorites({ cameraSelect: ['Alexa Mini'] });

    expect(global.sessionStorage.getItem(FAVORITES_KEY)).toBe(
      JSON.stringify({ cameraSelect: ['Alexa Mini'] })
    );

    let localStorageValue = null;
    try {
      const local = global.localStorage;
      if (local && typeof local.getItem === 'function') {
        localStorageValue = local.getItem(FAVORITES_KEY);
      }
    } catch (error) {
      localStorageValue = null;
    }

    expect(localStorageValue).toBeNull();
    expect(loadFavorites()).toEqual({ cameraSelect: ['Alexa Mini'] });
  });

  test('notifies the user when falling back to sessionStorage', () => {
    const expectedMessage =
      'Warning: Local storage is unavailable. Data will only persist for this browser tab.';

    expect(global.window.alert).toHaveBeenCalledTimes(1);
    expect(global.window.alert).toHaveBeenCalledWith(expectedMessage);
  });

  test('does not compress entries stored in sessionStorage fallback', () => {
    const { saveDeviceData } = storageModule;
    const heavyNote = 'Important storage note '.repeat(1200);
    const heavyDeviceData = {
      cameras: {},
      monitors: {},
      video: {},
      viewfinders: {},
      directorMonitors: {},
      iosVideo: {},
      videoAssist: {},
      media: {},
      lenses: {},
      batteries: {},
      batteryHotswaps: {},
      wirelessReceivers: {},
      accessories: {
        chargers: {},
        cages: {},
        cardReaders: {},
        powerPlates: {},
        cameraSupport: {},
        matteboxes: {},
        filters: {},
        rigging: {},
        batteries: {},
        cables: {},
        videoAssist: {},
        media: {},
        tripodHeads: {},
        tripods: {},
        sliders: {},
        cameraStabiliser: {},
        grip: {},
        carts: {},
      },
      fiz: { motors: {}, handUnits: {}, controllers: {}, distance: {} },
      filterOptions: [],
      notes: heavyNote,
    };

    saveDeviceData(heavyDeviceData);

    const stored = global.sessionStorage.getItem(DEVICE_KEY);
    expect(typeof stored).toBe('string');
    expect(stored).not.toContain('__cineStorageCompressed');

    const parsed = JSON.parse(stored);
    expect(parsed.notes).toBe(heavyNote);

    const backup = global.sessionStorage.getItem(`${DEVICE_KEY}__backup`);
    if (backup) {
      expect(backup).not.toContain('__cineStorageCompressed');
    }
  });
});

describe('SAFE_LOCAL_STORAGE alternate localStorage discovery', () => {
  let originalWindowLocalStorageDescriptor;
  let originalGlobalLocalStorageDescriptor;
  let storageModule;
  let originalAlert;

  beforeEach(() => {
    jest.resetModules();

    if (typeof window === 'undefined') {
      global.window = {};
    }

    delete global[SESSION_FALLBACK_ALERT_FLAG_NAME];
    delete global.window[SESSION_FALLBACK_ALERT_FLAG_NAME];
    delete global.SAFE_LOCAL_STORAGE;
    if (global.window) {
      delete global.window.SAFE_LOCAL_STORAGE;
    }
    if (global.__cineGlobal) {
      delete global.__cineGlobal.SAFE_LOCAL_STORAGE;
    }

    originalAlert = global.window.alert;
    global.window.alert = jest.fn();

    originalWindowLocalStorageDescriptor = Object.getOwnPropertyDescriptor(
      global.window,
      'localStorage',
    );
    originalGlobalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(
      global,
      'localStorage',
    );

    const session = global.sessionStorage;
    session.clear();
    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: session,
    });

    let realLocalStorage = null;
    try {
      realLocalStorage = global.localStorage;
    } catch (error) {
      realLocalStorage = null;
    }

    const blockedStorage = {
      get length() {
        return 0;
      },
      key: jest.fn(() => null),
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => {
        throw new Error('blocked');
      }),
      removeItem: jest.fn(() => {}),
      clear: jest.fn(() => {}),
    };

    Object.defineProperty(global.window, 'localStorage', {
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

    if (realLocalStorage) {
      Object.defineProperty(global, 'localStorage', {
        configurable: true,
        writable: true,
        value: realLocalStorage,
      });
    }

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

    if (originalWindowLocalStorageDescriptor) {
      Object.defineProperty(global.window, 'localStorage', originalWindowLocalStorageDescriptor);
    } else {
      delete global.window.localStorage;
    }

    if (originalGlobalLocalStorageDescriptor) {
      Object.defineProperty(global, 'localStorage', originalGlobalLocalStorageDescriptor);
    } else {
      delete global.localStorage;
    }

    delete global.window.sessionStorage;
  });

  test('reuses safe localStorage handles exposed on alternate scopes', () => {
    const { saveFavorites, loadFavorites } = storageModule;

    saveFavorites({ cameraSelect: ['Alexa Mini'] });

    expect(global.window.alert).not.toHaveBeenCalled();

    const storedRaw = global.localStorage.getItem(FAVORITES_KEY);
    expect(storedRaw).toBe(JSON.stringify({ cameraSelect: ['Alexa Mini'] }));
    expect(global.sessionStorage.getItem(FAVORITES_KEY)).toBeNull();
    expect(loadFavorites()).toEqual({ cameraSelect: ['Alexa Mini'] });
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
  let originalCineGlobal;
  let originalCineGlobalLocalStorage;
  let originalCineGlobalHadOwnLocalStorage;

  beforeEach(() => {
    jest.resetModules();

    originalWindow = typeof global.window === 'undefined' ? undefined : global.window;
    if (!global.window) {
      global.window = {};
    }

    originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(global.window, 'localStorage');
    originalGlobalLocalStorage = global.localStorage;
    originalCineGlobal = global.__cineGlobal;
    originalCineGlobalHadOwnLocalStorage =
      originalCineGlobal && typeof originalCineGlobal === 'object'
        ? Object.prototype.hasOwnProperty.call(originalCineGlobal, 'localStorage')
        : false;
    originalCineGlobalLocalStorage =
      originalCineGlobalHadOwnLocalStorage && originalCineGlobal
        ? originalCineGlobal.localStorage
        : undefined;

    delete global.SAFE_LOCAL_STORAGE;
    if (global.window) {
      delete global.window.SAFE_LOCAL_STORAGE;
    }
    if (global.__cineGlobal) {
      delete global.__cineGlobal.SAFE_LOCAL_STORAGE;
    }

    const blockedStorage = {
      get length() {
        return 0;
      },
      key: jest.fn(() => null),
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => {
        throw new Error('blocked');
      }),
      removeItem: jest.fn(() => {}),
      clear: jest.fn(() => {}),
    };

    Object.defineProperty(global.window, 'localStorage', {
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

    if (!global.__cineGlobal || typeof global.__cineGlobal !== 'object') {
      global.__cineGlobal = {};
    }
    global.__cineGlobal.localStorage = blockedStorage;

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

    if (originalCineGlobal && typeof originalCineGlobal === 'object') {
      global.__cineGlobal = originalCineGlobal;
      if (originalCineGlobalHadOwnLocalStorage) {
        originalCineGlobal.localStorage = originalCineGlobalLocalStorage;
      } else {
        delete originalCineGlobal.localStorage;
      }
    } else {
      delete global.__cineGlobal;
    }
  });

  test('upgrades fallback storage to localStorage when it becomes available', () => {
    const { saveFavorites, loadFavorites, getSafeLocalStorage } = require('../../src/scripts/storage');

    const fallbackStorage = getSafeLocalStorage();

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

    expect(upgraded).not.toBe(fallbackStorage);
    expect(upgraded.getItem('cameraPowerPlanner_favorites')).toBe(
      JSON.stringify({ cameraSelect: ['Alexa Mini'] }),
    );

    expect(loadFavorites()).toEqual({ cameraSelect: ['Alexa Mini'] });
  });
});

