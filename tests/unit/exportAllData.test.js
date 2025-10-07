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

  test('includes normalized full backup history in export payload', () => {
    const {
      recordFullBackupHistoryEntry,
      exportAllData,
    } = require('../../src/scripts/storage');

    recordFullBackupHistoryEntry({ createdAt: '2024-07-04T10:11:12Z', fileName: 'Backup Alpha.json ' });
    recordFullBackupHistoryEntry('2024-07-05T13:14:15Z');

    const exported = exportAllData();

    expect(exported.fullBackupHistory).toEqual([
      { createdAt: '2024-07-04T10:11:12Z', fileName: 'Backup Alpha.json' },
      { createdAt: '2024-07-05T13:14:15Z' },
    ]);
  });
});
