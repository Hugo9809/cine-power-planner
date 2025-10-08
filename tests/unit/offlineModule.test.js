const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('cineOffline module', () => {
  let offline;
  let internal;
  let consoleWarnSpy;
  let harness;
  let originalConsole;

  beforeEach(() => {
    harness = setupModuleHarness();
    delete global.cineOffline;
    originalConsole = console;
    consoleWarnSpy = jest.fn();
    const consoleClone = Object.create(console);
    consoleClone.warn = consoleWarnSpy;
    global.console = consoleClone;
    offline = require(path.join('..', '..', 'src', 'scripts', 'modules', 'offline.js'));
    internal = offline.__internal;
  });

  afterEach(() => {
    delete global.cineOffline;
    if (originalConsole) {
      global.console = originalConsole;
      originalConsole = null;
    }
    consoleWarnSpy = null;
    if (harness) {
      harness.teardown();
      harness = null;
    }
  });

  function createStorageSpy() {
    return {
      removeItem: jest.fn(),
    };
  }

  test('exposes a frozen API with registerServiceWorker and reloadApp', () => {
    expect(offline).toBe(global.cineOffline);
    expect(Object.isFrozen(offline)).toBe(true);
    expect(typeof offline.registerServiceWorker).toBe('function');
    expect(typeof offline.reloadApp).toBe('function');
  });

  test('registerServiceWorker defers registration until window load', async () => {
    const register = jest.fn(() => Promise.resolve('ok'));
    const navigatorMock = { serviceWorker: { register } };
    let loadHandler = null;
    const windowMock = {
      document: { readyState: 'loading' },
      addEventListener: jest.fn((event, handler) => {
        if (event === 'load') {
          loadHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
    };

    const promise = offline.registerServiceWorker('sw.js', {
      window: windowMock,
      navigator: navigatorMock,
    });

    expect(register).not.toHaveBeenCalled();
    expect(windowMock.addEventListener).toHaveBeenCalledWith('load', expect.any(Function), { once: true });

    await loadHandler();
    await promise;

    expect(register).toHaveBeenCalledWith('sw.js', undefined);
  });

  test('registerServiceWorker retries registration on a new invocation after a rejection', async () => {
    const firstError = new Error('fail');
    const register = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(firstError))
      .mockImplementationOnce(() => Promise.resolve('ok'));

    const navigatorMock = { serviceWorker: { register } };
    const windowMock = {
      document: { readyState: 'complete' },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    await expect(
      offline.registerServiceWorker('sw.js', {
        window: windowMock,
        navigator: navigatorMock,
      })
    ).rejects.toBe(firstError);

    await expect(
      offline.registerServiceWorker('sw.js', {
        window: windowMock,
        navigator: navigatorMock,
      })
    ).resolves.toBe('ok');

    expect(register).toHaveBeenCalledTimes(2);
  });

  test('reloadApp clears UI caches, unregisters service workers, clears caches and triggers reload', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve(['primary-cache'])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const reloadWindow = jest.fn(() => true);

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      reloadWindow,
    });

    expect(clearUiCacheStorageEntries).toHaveBeenCalledTimes(1);
    expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregister).toHaveBeenCalledTimes(1);
    expect(cachesMock.keys).toHaveBeenCalledTimes(1);
    expect(cachesMock.delete).toHaveBeenCalledWith('primary-cache');
    expect(reloadWindow).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      uiCacheCleared: true,
      serviceWorkersUnregistered: true,
      cachesCleared: true,
      reloadTriggered: true,
      navigationTriggered: true,
    });

    delete global.clearUiCacheStorageEntries;
  });

  describe('__internal helpers', () => {
    test('collectFallbackUiCacheStorages collects safe local storage, explicit scopes and window storage', () => {
      const resolvedSafeStorage = createStorageSpy();
      const safeLocalStorageInstance = createStorageSpy();
      const scopedSafeStorage = createStorageSpy();
      const scopedLocalStorage = createStorageSpy();
      const windowLocalStorage = createStorageSpy();

      const storages = internal.collectFallbackUiCacheStorages({
        resolveSafeLocalStorage: jest.fn(() => resolvedSafeStorage),
        safeLocalStorage: safeLocalStorageInstance,
        scopeCandidates: [
          {
            scope: {
              SAFE_LOCAL_STORAGE: scopedSafeStorage,
              localStorage: scopedLocalStorage,
            },
            label: 'customScope',
          },
        ],
        window: {
          localStorage: windowLocalStorage,
        },
      });

      expect(storages).toBeInstanceOf(Set);
      expect(storages.has(resolvedSafeStorage)).toBe(true);
      expect(storages.has(safeLocalStorageInstance)).toBe(true);
      expect(storages.has(scopedSafeStorage)).toBe(true);
      expect(storages.has(scopedLocalStorage)).toBe(true);
      expect(storages.has(windowLocalStorage)).toBe(true);
    });

    test('clearUiCacheEntriesFallback removes every known UI cache key from provided storages', () => {
      const storage = createStorageSpy();
      const storages = new Set([storage]);

      const removed = internal.clearUiCacheEntriesFallback({ storages });

      expect(removed).toBe(true);

      const expectedKeys = [
        'cameraPowerPlanner_schemaCache',
        'cameraPowerPlanner_schemaCache__backup',
        'cameraPowerPlanner_schemaCache__legacyMigrationBackup',
        'cinePowerPlanner_schemaCache',
        'cinePowerPlanner_schemaCache__backup',
        'cinePowerPlanner_schemaCache__legacyMigrationBackup',
      ];

      expectedKeys.forEach((key) => {
        expect(storage.removeItem).toHaveBeenCalledWith(key);
      });
    });

  test('triggerReload appends a forceReload query parameter and prefers location.replace', () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1234567890000);

    const location = {
      href: 'https://example.test/app?foo=bar#section',
      replace: jest.fn(),
      assign: jest.fn(),
      reload: jest.fn(),
    };
    const result = internal.triggerReload({ location });

    expect(result).toBe(true);
    expect(location.replace).toHaveBeenCalledTimes(1);
    const replacedUrl = location.replace.mock.calls[0][0];
    expect(replacedUrl).toMatch(/forceReload=.*#section$/);
    expect(replacedUrl).toMatch(/^https:\/\/example\.test\/app\?foo=bar&forceReload=/);
    expect(location.reload).not.toHaveBeenCalled();

    nowSpy.mockRestore();
  });

  test('triggerReload resolves relative location hrefs using origin and pathname', () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1234567890000);

    let currentHref = 'index.html?foo=bar#section';
    const location = {
      origin: 'https://example.test',
      pathname: '/app/index.html',
      get href() {
        return currentHref;
      },
      set href(value) {
        currentHref = value;
      },
      replace: jest.fn((value) => {
        currentHref = value;
      }),
      assign: jest.fn(),
      reload: jest.fn(),
    };

    const result = internal.triggerReload({ location });

    expect(result).toBe(true);
    expect(location.replace).toHaveBeenCalledTimes(1);
    const replacedUrl = location.replace.mock.calls[0][0];
    expect(replacedUrl).toBe('https://example.test/app/index.html?foo=bar&forceReload=fr5hugk0#section');
    expect(location.reload).not.toHaveBeenCalled();

    nowSpy.mockRestore();
  });

  test('triggerReload schedules fallback attempts when navigation is blocked', () => {
    const reloadError = new Error('blocked');
    const reload = jest.fn(() => {
      throw reloadError;
    });

    let currentHref = 'https://example.test/app';
    const location = {};
    Object.defineProperty(location, 'href', {
      configurable: true,
      enumerable: true,
      get() {
        return currentHref;
      },
      set() {
        throw new Error('href assignment blocked');
      },
    });
    location.reload = reload;

    const scheduledCallbacks = [];
    const setTimeoutSpy = jest.fn(callback => {
      scheduledCallbacks.push(callback);
      return scheduledCallbacks.length;
    });

    const windowMock = {
      location,
      setTimeout: setTimeoutSpy,
    };

    const result = internal.triggerReload(windowMock);

    expect(result).toBe(false);
    expect(reload).not.toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalled();

    scheduledCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        // The fallback helpers already report their own errors.
        void error;
      }
    });

    expect(reload).toHaveBeenCalledTimes(1);
  });

    test('registerServiceWorker registers immediately when the document is already loaded', async () => {
      const register = jest.fn(() => Promise.resolve('registered'));
      const navigatorMock = { serviceWorker: { register } };
      const windowMock = {
        document: { readyState: 'complete' },
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };

      await expect(
        offline.registerServiceWorker('/sw.js', {
          window: windowMock,
          navigator: navigatorMock,
        })
      ).resolves.toBe('registered');

      expect(register).toHaveBeenCalledWith('/sw.js', undefined);
      expect(windowMock.addEventListener).not.toHaveBeenCalled();
    });

    test('unregisterServiceWorkers resolves and unregisters every registration it discovers', async () => {
      const unregister = jest.fn(() => Promise.resolve(true));
      const navigatorMock = {
        serviceWorker: {
          getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
        },
      };

      const result = await internal.unregisterServiceWorkers(navigatorMock);

      expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
      expect(unregister).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    test('clearCacheStorage deletes every reported cache key', async () => {
      const deleteCache = jest.fn(() => Promise.resolve(true));
      const cachesMock = {
        keys: jest.fn(() => Promise.resolve(['primary-cache', 'secondary-cache'])),
        delete: deleteCache,
      };

      const result = await internal.clearCacheStorage(cachesMock);

      expect(cachesMock.keys).toHaveBeenCalledTimes(1);
      expect(deleteCache).toHaveBeenCalledWith('primary-cache');
      expect(deleteCache).toHaveBeenCalledWith('secondary-cache');
      expect(result).toBe(true);
    });
  });
});
