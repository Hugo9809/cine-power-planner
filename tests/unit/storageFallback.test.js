const FAVORITES_KEY = 'cameraPowerPlanner_favorites';
const CUSTOM_FONT_KEY = 'cameraPowerPlanner_customFonts';
const CUSTOM_LOGO_KEY = 'customLogo';

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

    storageModule = require('../../assets/js/storage');
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

  test('export/import helpers rely on SAFE_LOCAL_STORAGE fallback', () => {
    const { importAllData, exportAllData } = storageModule;
    const session = global.sessionStorage;

    const fonts = [
      { id: 'font-1', name: 'Planner Sans', data: 'data:font/plain;base64,AAA' },
    ];

    importAllData({
      preferences: {
        darkMode: true,
        accentColor: '#123456',
      },
      customLogo: 'data:image/png;base64,logo',
      customFonts: fonts,
    });

    expect(session.getItem('darkMode')).toBe('true');
    expect(session.getItem('accentColor')).toBe('#123456');
    expect(session.getItem(CUSTOM_LOGO_KEY)).toBe('data:image/png;base64,logo');
    expect(session.getItem(CUSTOM_FONT_KEY)).toBe(JSON.stringify(fonts));
    expect(global.localStorage.getItem('darkMode')).toBeNull();

    const exported = exportAllData();
    expect(exported.preferences).toMatchObject({
      darkMode: true,
      accentColor: '#123456',
    });
    expect(exported.customLogo).toBe('data:image/png;base64,logo');
    expect(exported.customFonts).toEqual(fonts);
  });
});

