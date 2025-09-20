const path = require('path');

describe('loader supportsModernFeatures', () => {
  const loaderPath = path.join(__dirname, '..', '..', 'src', 'scripts', 'loader.js');

  beforeEach(() => {
    jest.resetModules();
    delete global.__CINE_POWER_SYNTAX_TEST__;
    global.window = {};
  });

  afterEach(() => {
    delete global.__CINE_POWER_SYNTAX_TEST__;
    if (global.window) {
      delete global.window.__CINE_POWER_SYNTAX_TEST__;
    }
    delete global.window;
  });

  test('returns false when syntax is unsupported', () => {
    global.window.__CINE_POWER_SYNTAX_TEST__ = () => {
      throw new SyntaxError('Unexpected token ?.');
    };

    const { supportsModernFeatures } = require(loaderPath);
    expect(supportsModernFeatures()).toBe(false);
  });

  test('ignores non-syntax errors when detecting support', () => {
    global.window.__CINE_POWER_SYNTAX_TEST__ = () => {
      const error = new Error('storage state unavailable');
      error.name = 'StorageError';
      throw error;
    };

    const { supportsModernFeatures } = require(loaderPath);
    expect(supportsModernFeatures()).toBe(true);
  });
});
