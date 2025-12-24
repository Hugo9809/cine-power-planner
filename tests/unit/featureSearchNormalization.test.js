const path = require('path');

const loadFeatureSearchStopWordHelpers = require('../helpers/featureSearchStopWordsHelper');

const { filterFeatureSearchQueryTokens } = loadFeatureSearchStopWordHelpers();

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

  test('normalizes imperial measurement shorthand', () => {
    loadModule();
    expect(moduleApi).toBeDefined();
    const normalize = moduleApi.normalizeSearchValue;
    expect(normalize('5\'8" tripod mount')).toBe('5 ft 8 inch tripod mount');
    expect(normalize('7ft boom arm')).toBe('7 ft boom arm');
    expect(normalize('1/2" adapter')).toBe('1/2 inch adapter');
    expect(normalize('0\t\t\t staging')).toBe('0 staging');
    expect(normalize("12\t\t' lens")).toBe('12 ft lens');
  });

  test('normalizes mark variants with roman numerals', () => {
    loadModule();
    expect(moduleApi).toBeDefined();
    const normalize = moduleApi.normalizeSearchValue;
    expect(normalize('Mk IV')).toBe('mk4');
    expect(normalize('Mark V')).toBe('mk5');
    expect(normalize('Mk iX')).toBe('mk9');
  });

  test('removes conversational filler tokens from normalized queries', () => {
    loadModule();
    expect(moduleApi).toBeDefined();
    const normalize = moduleApi.normalizeSearchValue;
    const normalized = normalize('How do I back up?');
    const tokens = normalized.split(' ').filter(Boolean);
    const filteredTokens = filterFeatureSearchQueryTokens(tokens);

    expect(filteredTokens).toEqual(['back', 'up']);
  });
});
