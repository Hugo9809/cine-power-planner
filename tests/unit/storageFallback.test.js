const FAVORITES_KEY = 'cameraPowerPlanner_favorites';

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

    storageModule = require('../../public/scripts/storage');
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

