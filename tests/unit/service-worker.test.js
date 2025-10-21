const {
  ASSETS,
  CACHE_NAME,
  __private__: { shouldBypassCache },
} = require('../../service-worker.js');

const createHeaders = entries => ({
  get: key => {
    if (Object.prototype.hasOwnProperty.call(entries, key)) {
      return entries[key];
    }

    return null;
  },
});

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/styles/overview.css', './src/styles/overview-print.css', './src/scripts/overview.js']));
  });

  test('caches runtime JavaScript dependencies for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './src/scripts/globalthis-polyfill.js',
        './src/scripts/globals-bootstrap.js',
        './src/scripts/modern-support-check.js',
        './src/scripts/modern-support-check.mjs',
        './src/scripts/modules/registry.js',
        './src/scripts/modules/offline.js',
        './src/scripts/modules/ui.js',
        './src/scripts/modules/features/print-workflow.js',
        './src/data/devices/batteryHotswaps.js',
        './src/data/devices/chargers.js',
        './src/data/devices/wirelessReceivers.js',
      ]),
    );
  });

  test('caches legacy fallback scripts for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './legacy/scripts/loader.js',
        './legacy/scripts/script.js',
        './legacy/scripts/auto-gear-monitoring.js',
        './legacy/scripts/autosave-overlay.js',
        './legacy/scripts/modules/registry.js',
        './legacy/scripts/modern-support-check.js',
        './legacy/scripts/globals-bootstrap.js',
      ]),
    );
  });

  test('caches legal pages for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './legal/impressum.html',
        './legal/impressum-en.html',
        './legal/impressum-es.html',
        './legal/impressum-fr.html',
        './legal/impressum-it.html',
        './legal/datenschutz.html',
        './legal/datenschutz-en.html',
        './legal/datenschutz-es.html',
        './legal/datenschutz-fr.html',
        './legal/datenschutz-it.html',
      ]),
    );
  });

  test('caches the device schema for offline editing', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/data/schema.json']));
  });

  test('caches the shared theme helper for legal pages', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/scripts/static-theme.js']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });

  test('treats forceReload navigation requests as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'default',
      headers: createHeaders({}),
    };
    const url = new URL('https://example.test/app?forceReload=abc123');

    expect(shouldBypassCache(mockRequest, url)).toBe(true);
  });

  test('treats reload navigation requests as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'reload',
      headers: createHeaders({}),
    };

    expect(shouldBypassCache(mockRequest, new URL('https://example.test/app'))).toBe(true);
  });

  test('treats Cache-Control no-store headers as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'default',
      headers: createHeaders({ 'Cache-Control': 'no-store' }),
    };

    expect(shouldBypassCache(mockRequest, new URL('https://example.test/app'))).toBe(true);
  });

  test('treats Pragma no-cache headers as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'default',
      headers: createHeaders({ Pragma: 'no-cache' }),
    };

    expect(shouldBypassCache(mockRequest, new URL('https://example.test/app'))).toBe(true);
  });

  test('serves cached app icon when query parameters are present and the network fails', async () => {
    const originalSelf = global.self;
    const originalCaches = global.caches;
    const originalFetch = global.fetch;

    const eventHandlers = {};
    const addEventListener = jest.fn((type, handler) => {
      eventHandlers[type] = handler;
    });

    const cachedIconResponse = { ok: true, body: 'icon' };
    const cacheMatchSpy = jest.fn().mockResolvedValue(null);
    const cachesMatchSpy = jest.fn().mockResolvedValue(cachedIconResponse);
    const cacheOpenSpy = jest.fn().mockResolvedValue({
      match: cacheMatchSpy,
      put: jest.fn(),
    });

    global.self = {
      location: { origin: 'https://example.test' },
      addEventListener,
    };

    global.caches = {
      open: cacheOpenSpy,
      match: cachesMatchSpy,
    };

    global.fetch = jest.fn().mockRejectedValue(new Error('Network unavailable'));

    try {
      jest.isolateModules(() => {
        require('../../service-worker.js');
      });

      const fetchHandler = eventHandlers.fetch;
      expect(typeof fetchHandler).toBe('function');

      let respondPromise;
      const fetchEvent = {
        request: {
          method: 'GET',
          mode: 'no-cors',
          url: 'https://example.test/src/icons/app-icon.png?v=42',
        },
        respondWith: promise => {
          respondPromise = promise;
        },
        waitUntil: jest.fn(),
      };

      fetchHandler(fetchEvent);

      expect(respondPromise).toBeInstanceOf(Promise);

      const response = await respondPromise;
      expect(response).toBe(cachedIconResponse);
      expect(cacheOpenSpy).toHaveBeenCalledWith(CACHE_NAME);
      expect(cacheMatchSpy).toHaveBeenCalledWith(fetchEvent.request, { ignoreSearch: true });
      expect(cachesMatchSpy).toHaveBeenCalledWith(fetchEvent.request, { ignoreSearch: true });
    } finally {
      global.self = originalSelf;
      global.caches = originalCaches;
      global.fetch = originalFetch;
    }
  });
});
