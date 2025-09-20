// Verify that the storage module falls back to an in-memory implementation
// when localStorage is unavailable or throws errors. The fallback should allow
// data to be stored for the current session without raising exceptions.
describe('storage fallback when localStorage is unavailable', () => {
  let originalLocalStorage;

  beforeEach(() => {
    originalLocalStorage = global.localStorage;
    const originalAlert = global.window && global.window.alert;
    // Simulate an environment where accessing localStorage throws
    const brokenStorage = {
      setItem() { throw new Error('no storage'); },
      getItem() { throw new Error('no storage'); },
      removeItem() { throw new Error('no storage'); },
    };
    Object.defineProperty(global, 'localStorage', {
      value: brokenStorage,
      configurable: true,
    });
    if (global.window) {
      Object.defineProperty(global.window, 'localStorage', {
        value: brokenStorage,
        configurable: true,
      });
      Object.defineProperty(global.window, 'alert', {
        value: jest.fn(),
        configurable: true,
      });
      // Preserve original alert for restoration
      global.window.__originalAlert = originalAlert;
    }
    jest.resetModules();
  });

  afterEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
    });
    if (global.window) {
      Object.defineProperty(global.window, 'localStorage', {
        value: originalLocalStorage,
        configurable: true,
      });
      Object.defineProperty(global.window, 'alert', {
        value: global.window.__originalAlert,
        configurable: true,
      });
      delete global.window.__originalAlert;
    }
    jest.resetModules();
  });

  test('uses in-memory store to save and load data', () => {
    const { saveFeedback, loadFeedback } = require('../../assets/js/storage');
    const data = { msg: 'hi' };
    saveFeedback(data);
    expect(loadFeedback()).toEqual(data);
  });
});
