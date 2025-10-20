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
    delete global.CINE_CACHE_NAME;
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
    delete global.CINE_CACHE_NAME;
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
    expect(loadHandler).toEqual(expect.any(Function));

    await loadHandler();
    await promise;

    expect(register).toHaveBeenCalledWith('sw.js', undefined);
    expect(windowMock.removeEventListener).toHaveBeenCalledWith('load', loadHandler);
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

  test('reloadApp clears UI caches, unregisters service workers, clears caches, warms reload navigation and triggers reload', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cacheKey = 'cine-power-planner-primary';
    const cachesMock = {
      keys: jest.fn(() => Promise.resolve([cacheKey])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const reloadWindow = jest.fn(() => true);

    const windowMock = {
      location: {
        href: 'https://example.test/app?foo=bar',
        replace: jest.fn(),
        assign: jest.fn(),
        reload: jest.fn(),
      },
    };

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: windowMock,
      reloadWindow,
    });

    expect(clearUiCacheStorageEntries).toHaveBeenCalledTimes(1);
    expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregister).toHaveBeenCalledTimes(1);
    expect(cachesMock.keys).toHaveBeenCalledTimes(1);
    expect(cachesMock.delete).toHaveBeenCalledWith(cacheKey);
    expect(reloadWindow).toHaveBeenCalledTimes(1);

    await new Promise(resolve => setTimeout(resolve, 250));

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const warmupUrl = fetchMock.mock.calls[0][0];
    expect(warmupUrl).toMatch(/^https:\/\/example\.test\/app\?foo=bar&forceReload=/);

    const reloadArgs = reloadWindow.mock.calls[0];
    expect(reloadArgs[1]).toEqual(
      expect.objectContaining({
        nextHref: expect.stringMatching(/^https:\/\/example\.test\/app\?foo=bar&forceReload=/),
      }),
    );

    expect(result).toEqual({
      uiCacheCleared: true,
      serviceWorkersUnregistered: true,
      cachesCleared: true,
      reloadTriggered: true,
      navigationTriggered: true,
    });

    delete global.clearUiCacheStorageEntries;
  });

  test('reloadApp begins querying service worker registrations before clearing UI caches completes', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve([])),
    };

    const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const reloadWindow = jest.fn(() => true);

    const windowMock = {
      location: {
        href: 'https://example.test/app',
        replace: jest.fn(),
        assign: jest.fn(),
        reload: jest.fn(),
      },
    };

    try {
      const reloadPromise = offline.reloadApp({
        navigator: navigatorMock,
        caches: cachesMock,
        fetch: fetchMock,
        window: windowMock,
        reloadWindow,
      });

      expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
      expect(clearUiCacheStorageEntries).toHaveBeenCalledTimes(1);
      expect(navigatorMock.serviceWorker.getRegistrations.mock.invocationCallOrder[0]).toBeLessThan(
        clearUiCacheStorageEntries.mock.invocationCallOrder[0],
      );

      await reloadPromise;
      await new Promise(resolve => setTimeout(resolve, 250));
    } finally {
      delete global.clearUiCacheStorageEntries;
    }
  });

  test('reloadApp resolves when controllerchange fires and removes listener', async () => {
    let controllerHandler = null;
    const addEventListener = jest.fn((event, handler) => {
      if (event === 'controllerchange') {
        controllerHandler = handler;
      }
    });
    const removeEventListener = jest.fn();
    let resolveRegistrations;
    const registrationsPromise = new Promise(resolve => {
      resolveRegistrations = resolve;
    });

    const navigatorMock = {
      serviceWorker: {
        controller: null,
        addEventListener,
        removeEventListener,
        getRegistrations: jest.fn(() => registrationsPromise),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve([])),
    };

    const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const reloadWindow = jest.fn(() => true);

    const windowMock = {
      location: {
        href: 'https://example.test/app',
        replace: jest.fn(),
        assign: jest.fn(),
        reload: jest.fn(),
      },
    };

    const reloadPromise = offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: windowMock,
      reloadWindow,
    });

    expect(addEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function));
    expect(controllerHandler).toEqual(expect.any(Function));

    controllerHandler();

    expect(removeEventListener).toHaveBeenCalledWith('controllerchange', controllerHandler);

    const result = await reloadPromise;

    resolveRegistrations([]);

    expect(reloadWindow).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      expect.objectContaining({
        serviceWorkerStatusKnown: true,
      }),
    );
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  test('reload warmup retries with cached response when reload fetch fails', async () => {
    jest.useFakeTimers();

    try {
      const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
      const warmupResponse = {
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      };

      const fetchError = new TypeError('Load failed');
      const fetchMock = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(fetchError))
        .mockImplementationOnce(() => Promise.resolve(warmupResponse));

      const warmupHandle = internal.scheduleReloadWarmup({
        fetch: fetchMock,
        nextHref: 'https://example.test/app?foo=bar',
        navigator: { onLine: true },
        window: {},
        serviceWorkerPromise: Promise.resolve(true),
        cachePromise: Promise.resolve(true),
        allowCache: true,
      });

      expect(warmupHandle).not.toBeNull();
      await warmupHandle.promise;

      jest.runOnlyPendingTimers();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({
          cache: 'reload',
          credentials: 'same-origin',
          mode: 'cors',
          redirect: 'follow',
        }),
      );
      expect(fetchMock.mock.calls[1][1]).toEqual(
        expect.objectContaining({
          cache: 'default',
          credentials: 'same-origin',
          mode: 'cors',
          redirect: 'follow',
        }),
      );

      const warmupWarnings = consoleWarnSpy.mock.calls.filter(call => call[0] === 'Reload warmup fetch failed');
      expect(warmupWarnings).toHaveLength(0);
    } finally {
      jest.useRealTimers();
    }
  });

  test('coerceForceReloadUrlDescriptor normalises cross-origin descriptors to the current origin', () => {
    const locationLike = {
      href: 'https://example.test/app/index.html',
      origin: 'https://example.test',
      pathname: '/app/index.html',
    };

    const descriptor = {
      originalHref: 'https://remote.example/app/index.html',
      nextHref: 'https://remote.example/app/index.html?forceReload=abc',
      param: 'forceReload',
      timestamp: 'abc',
    };

    const result = internal.coerceForceReloadUrlDescriptor(locationLike, descriptor, 'forceReload');

    expect(result.nextHref).toBe('https://example.test/app/index.html?forceReload=abc');

    const noNextHrefDescriptor = {
      originalHref: 'https://remote.example/app/index.html',
      param: 'forceReload',
      timestamp: 'xyz',
    };

    const resultWithoutNext = internal.coerceForceReloadUrlDescriptor(
      locationLike,
      noNextHrefDescriptor,
      'forceReload',
    );

    expect(resultWithoutNext.nextHref).toBe('https://example.test/app/index.html');
  });

  test('reload warmup suppresses warning when both fetch attempts fail with load failure', async () => {
    jest.useFakeTimers();

    try {
      const fetchMock = jest.fn(() => Promise.reject(new TypeError('Load failed')));

      const warmupHandle = internal.scheduleReloadWarmup({
        fetch: fetchMock,
        nextHref: 'https://example.test/app?foo=bar',
        navigator: { onLine: true },
        window: {},
        serviceWorkerPromise: Promise.resolve(true),
        cachePromise: Promise.resolve(true),
        allowCache: true,
      });

      expect(warmupHandle).not.toBeNull();
      await expect(warmupHandle.promise).resolves.toBe(false);

      jest.runOnlyPendingTimers();

      expect(fetchMock).toHaveBeenCalledTimes(2);

      const warmupWarnings = consoleWarnSpy.mock.calls.filter(call => call[0] === 'Reload warmup fetch failed');
      expect(warmupWarnings).toHaveLength(0);
    } finally {
      jest.useRealTimers();
    }
  });

  test('scheduleReloadWarmup relies on XHR path for standalone Apple browser without Safari token', async () => {
    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
        this.status = 204;
        this.withCredentials = false;
        this.responseType = 'text';
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() {}

      setRequestHeader() {}

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const navigatorMock = {
      vendor: 'Apple Computer, Inc.',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
      standalone: true,
      onLine: true,
    };

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => ({
          bodyUsed: false,
          text: jest.fn(() => Promise.resolve('<html></html>')),
        })),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('scheduleReloadWarmup uses Safari path when vendor string is empty', async () => {
    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
        this.status = 204;
        this.withCredentials = false;
        this.responseType = 'text';
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() {}

      setRequestHeader() {}

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const navigatorMock = {
      vendor: '',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',
      standalone: false,
      onLine: true,
    };

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => ({
          bodyUsed: false,
          text: jest.fn(() => Promise.resolve('<html></html>')),
        })),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('scheduleReloadWarmup still uses fetch path for Chrome on iOS', async () => {
    const navigatorMock = {
      vendor: 'Apple Computer, Inc.',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0.0.0 Mobile/15E148',
      standalone: false,
      onLine: true,
    };

    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() {}

      setRequestHeader() {}

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const responseClone = {
      bodyUsed: false,
      text: jest.fn(() => Promise.resolve('<html></html>')),
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('cleans up forceReload markers from the current URL during initialization', () => {
    if (harness) {
      harness.teardown();
      harness = null;
    }

    jest.resetModules();
    delete global.cineOffline;
    delete global.CINE_CACHE_NAME;

    const locationMock = {
      href: 'https://example.test/app/index.html?foo=bar&forceReload=token#forceReload-token',
      origin: 'https://example.test',
      pathname: '/app/index.html',
      search: '?foo=bar&forceReload=token',
      hash: '#forceReload-token',
    };

    const historyState = { keep: true };

    const historyMock = {
      state: historyState,
      replaceState: jest.fn((state, title, url) => {
        historyMock.state = state;

        if (typeof url !== 'string') {
          return;
        }

        let absolute = url;
        if (/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(url)) {
          absolute = url;
        } else if (url.startsWith('//')) {
          absolute = `${locationMock.origin.split(':')[0]}:${url}`;
        } else if (url.startsWith('/')) {
          absolute = `${locationMock.origin}${url}`;
        } else {
          absolute = `${locationMock.origin.replace(/\/$/, '')}/${url}`;
        }

        locationMock.href = absolute;

        const hashIndex = url.indexOf('#');
        const searchIndex = url.indexOf('?');

        if (searchIndex !== -1) {
          const searchEnd = hashIndex === -1 ? url.length : hashIndex;
          locationMock.search = url.slice(searchIndex, searchEnd);
        } else {
          locationMock.search = '';
        }

        if (hashIndex !== -1) {
          locationMock.hash = url.slice(hashIndex);
        } else {
          locationMock.hash = '';
        }
      }),
    };

    const windowMock = {
      location: locationMock,
      history: historyMock,
    };

    global.window = windowMock;

    harness = setupModuleHarness();
    offline = require(path.join('..', '..', 'src', 'scripts', 'modules', 'offline.js'));
    internal = offline.__internal;

    expect(historyMock.replaceState).toHaveBeenCalledTimes(1);
    const [stateArg, titleArg, urlArg] = historyMock.replaceState.mock.calls[0];
    expect(stateArg).toBe(historyState);
    expect(titleArg).toBe('');
    expect(urlArg).toBe('/app/index.html?foo=bar');
    expect(locationMock.href).toBe('https://example.test/app/index.html?foo=bar');
    expect(locationMock.search).toBe('?foo=bar');
    expect(locationMock.hash).toBe('');
    expect(typeof internal.cleanupForceReloadArtifacts).toBe('function');
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

    test('coerceForceReloadUrlDescriptor enforces same-origin nextHref values', () => {
      const location = {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
      };

      const descriptor = {
        originalHref: 'https://othersite.test/app/index.html',
        nextHref: 'https://othersite.test/app/index.html?forceReload=token123',
        param: 'forceReload',
        timestamp: 'token123',
      };

      const coerced = internal.coerceForceReloadUrlDescriptor(location, descriptor, 'forceReload');

      expect(coerced).toEqual({
        originalHref: 'https://othersite.test/app/index.html',
        nextHref: 'https://example.test/app/index.html?forceReload=token123',
        param: 'forceReload',
        timestamp: 'token123',
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

  test('triggerReload sanitises precomputed nextHref values to current origin', () => {
    const location = {
      href: 'https://example.test/app/index.html',
      origin: 'https://example.test',
      replace: jest.fn((url) => {
        location.href = url;
      }),
      assign: jest.fn((url) => {
        location.href = url;
      }),
      reload: jest.fn(),
    };

    const history = {
      replaceState: jest.fn(),
      state: null,
    };

    const windowMock = { location, history };

    const precomputed = {
      originalHref: 'https://example.test/app/index.html',
      nextHref: 'https://othersite.test/app/index.html?forceReload=abc123',
      param: 'forceReload',
      timestamp: 'abc123',
    };

    const result = internal.triggerReload(windowMock, precomputed);

    expect(result).toBe(true);
    expect(location.replace).toHaveBeenCalledTimes(1);
    expect(location.replace).toHaveBeenCalledWith('https://example.test/app/index.html?forceReload=abc123');
    expect(location.assign).not.toHaveBeenCalled();
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

  test('triggerReload falls back to history.replaceState when navigation helpers fail', () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1234567890000);

    const origin = 'https://example.test';
    let currentHref = `${origin}/app/index.html?forceReload=prevToken#section`;
    const location = { reload: jest.fn() };
    Object.defineProperty(location, 'href', {
      configurable: true,
      enumerable: true,
      get() {
        return currentHref;
      },
      set() {
        // Simulate browsers ignoring href assignments when navigation is blocked.
      },
    });
    location.replace = jest.fn(() => {
      throw new Error('replace blocked');
    });
    location.assign = jest.fn(() => {
      throw new Error('assign blocked');
    });

    let historyState = { previous: true };
    const history = {
      get state() {
        return historyState;
      },
      replaceState: jest.fn((state, _title, url) => {
        historyState = state;
        if (typeof url === 'string') {
          if (url.startsWith('http')) {
            currentHref = url;
          } else if (url.startsWith('/')) {
            currentHref = `${origin}${url}`;
          } else {
            currentHref = `${origin}/${url}`;
          }
        }
      }),
    };

    const windowMock = {
      location,
      history,
      setTimeout: jest.fn(),
    };

    const result = internal.triggerReload(windowMock);

    expect(result).toBe(true);
    expect(history.replaceState).toHaveBeenCalledTimes(1);
    const [, , urlArg] = history.replaceState.mock.calls[0];
    expect(typeof urlArg).toBe('string');
    expect(urlArg).toContain('/app/index.html?');
    expect(urlArg).toContain('forceReload=');
    expect(location.reload).toHaveBeenCalledTimes(1);
    expect(currentHref).toContain('forceReload=fr5hugk0');
    expect(currentHref).toContain('#section');
    expect(location.replace).toHaveBeenCalledTimes(1);
    expect(location.assign).toHaveBeenCalledTimes(1);

    nowSpy.mockRestore();
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

    test('clearCacheStorage deletes Cine Power Planner caches and skips unrelated entries', async () => {
      const deleteCache = jest.fn(() => Promise.resolve(true));
      const cachesMock = {
        keys: jest.fn(() => Promise.resolve([
          'cine-power-planner-v1',
          'primary-cache',
          'cinePowerPlannerLegacy',
        ])),
        delete: deleteCache,
      };

      const result = await internal.clearCacheStorage(cachesMock);

      expect(cachesMock.keys).toHaveBeenCalledTimes(1);
      expect(deleteCache).toHaveBeenCalledWith('cine-power-planner-v1');
      expect(deleteCache).toHaveBeenCalledWith('cinePowerPlannerLegacy');
      expect(deleteCache).not.toHaveBeenCalledWith('primary-cache');
      expect(deleteCache).toHaveBeenCalledTimes(2);
      expect(result).toBe(true);
    });

    test('clearCacheStorage uses the exposed cache name when filtering keys', async () => {
      global.CINE_CACHE_NAME = 'cine-power-planner-special';

      const deleteCache = jest.fn(() => Promise.resolve(true));
      const cachesMock = {
        keys: jest.fn(() => Promise.resolve([
          'cine-power-planner-special',
          'cine-power-planner-v1',
          'unrelated-cache',
        ])),
        delete: deleteCache,
      };

      const result = await internal.clearCacheStorage(cachesMock);

      expect(cachesMock.keys).toHaveBeenCalledTimes(1);
      expect(deleteCache).toHaveBeenCalledWith('cine-power-planner-special');
      expect(deleteCache).toHaveBeenCalledWith('cine-power-planner-v1');
      expect(deleteCache).not.toHaveBeenCalledWith('unrelated-cache');
      expect(deleteCache).toHaveBeenCalledTimes(2);
      expect(result).toBe(true);
    });
  });
});
