jest.resetModules();

if (typeof window === 'undefined') {
  global.window = {};
}

if (!('localStorage' in window)) {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: global.localStorage,
  });
}

if (!('sessionStorage' in window)) {
  Object.defineProperty(window, 'sessionStorage', {
    configurable: true,
    value: global.sessionStorage,
  });
}

const schemaKeys = {
  modern: 'cameraPowerPlanner_schemaCache',
  legacy: 'cinePowerPlanner_schemaCache',
};

describe('clearUiCacheStorageEntries', () => {
  let clearUiCacheStorageEntries;
  let getSafeLocalStorage;

  beforeEach(() => {
    jest.resetModules();
    ({ clearUiCacheStorageEntries, getSafeLocalStorage } = require('../../src/scripts/storage'));
    localStorage.clear();
    sessionStorage.clear();
    const safeStorage = getSafeLocalStorage();
    if (safeStorage && typeof safeStorage.clear === 'function') {
      safeStorage.clear();
    } else if (safeStorage && typeof safeStorage.removeItem === 'function') {
      [schemaKeys.modern, `${schemaKeys.modern}__backup`, `${schemaKeys.modern}__legacyMigrationBackup`,
        schemaKeys.legacy, `${schemaKeys.legacy}__backup`, `${schemaKeys.legacy}__legacyMigrationBackup`]
        .forEach((key) => {
          if (key) {
            try { safeStorage.removeItem(key); } catch (error) { void error; }
          }
        });
    }
  });

  test('removes schema cache entries across storages without touching user data', () => {
    const safeStorage = getSafeLocalStorage();

    safeStorage.setItem(schemaKeys.modern, '{"checksum":"old"}');
    safeStorage.setItem(`${schemaKeys.modern}__backup`, '{"checksum":"backup"}');
    safeStorage.setItem(`${schemaKeys.legacy}__legacyMigrationBackup`, '{"checksum":"legacy"}');

    localStorage.setItem(schemaKeys.modern, 'local');
    localStorage.setItem(`${schemaKeys.modern}__backup`, 'local-backup');
    localStorage.setItem(schemaKeys.legacy, 'legacy');
    localStorage.setItem('cameraPowerPlanner_devices', '{"devices":[]}');

    sessionStorage.setItem(schemaKeys.modern, 'session');

    clearUiCacheStorageEntries();

    expect(localStorage.getItem(schemaKeys.modern)).toBeNull();
    expect(localStorage.getItem(`${schemaKeys.modern}__backup`)).toBeNull();
    expect(localStorage.getItem(schemaKeys.legacy)).toBeNull();
    expect(sessionStorage.getItem(schemaKeys.modern)).toBeNull();
    expect(safeStorage.getItem(schemaKeys.modern)).toBeNull();
    expect(safeStorage.getItem(`${schemaKeys.modern}__backup`)).toBeNull();
    expect(safeStorage.getItem(`${schemaKeys.legacy}__legacyMigrationBackup`)).toBeNull();

    expect(localStorage.getItem('cameraPowerPlanner_devices')).toBe('{"devices":[]}');
  });
});
