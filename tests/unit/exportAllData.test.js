const originalWindow = global.window;
const originalNavigator = global.navigator;

describe('exportAllData', () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    sessionStorage.clear();

    global.window = {
      localStorage,
      sessionStorage,
    };
    delete global.navigator;
  });

  afterEach(() => {
    jest.resetModules();
    if (typeof originalWindow === 'undefined') {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
    if (typeof originalNavigator === 'undefined') {
      delete global.navigator;
    } else {
      global.navigator = originalNavigator;
    }
  });

  test('includes auto gear monitor defaults in export payload', () => {
    const {
      saveAutoGearMonitorDefaults,
      exportAllData,
    } = require('../../src/scripts/storage');

    const defaults = {
      exposure: 'Rec709',
      color: 'Warm',
    };

    saveAutoGearMonitorDefaults(defaults);

    const exported = exportAllData();

    expect(exported.autoGearMonitorDefaults).toEqual(defaults);
  });
});
