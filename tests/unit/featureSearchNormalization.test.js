const path = require('path');

describe('feature search normalization', () => {
  let moduleApi;
  let originalConsoleWarn;

  function loadModule() {
    jest.resetModules();
    moduleApi = undefined;

    global.cineModuleBase = {
      registerOrQueueModule: jest.fn((name, api) => {
        moduleApi = api;
        return api;
      }),
      safeWarn: jest.fn(),
      exposeGlobal: jest.fn(),
      getModuleRegistry: jest.fn(() => null),
    };

    const modulePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'scripts',
      'modules',
      'features',
      'feature-search.js',
    );
    require(modulePath);
  }

  beforeAll(() => {
    originalConsoleWarn = console.warn;
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  afterEach(() => {
    delete global.cineModuleBase;
    jest.resetModules();
  });

  test('removes accents, punctuation and spacing variants', () => {
    loadModule();
    expect(moduleApi).toBeDefined();
    const normalize = moduleApi.normalizeSearchValue;
    expect(normalize('  Déjà Vu  ')).toBe('deja vu');
    expect(normalize('Straße café')).toBe('strasse cafe');
    expect(normalize('Æther & Co.')).toBe('aether and co');
    expect(normalize('Wi‑Fi “Pro”')).toBe('wi fi pro');
    expect(normalize('ProRes® 422 HQ')).toBe('prores 422 hq');
    expect(normalize('')).toBe('');
  });

  test('normalizes numeric symbols and ligatures consistently', () => {
    loadModule();
    expect(moduleApi).toBeDefined();
    const normalize = moduleApi.normalizeSearchValue;
    expect(normalize('3×5 + 2×4')).toBe('3 x 5 plus 2 x 4');
    expect(normalize('Højfølsom')).toBe('hojfolsom');
    expect(normalize('  Ðakota – 12° ')).toBe('dakota 12 deg');
    expect(normalize("Captain's Log"))
      .toBe('captain s log');
  });
});
