const DEFAULT_KEY = 'cameraPowerPlanner_mountVoltages';
const MOUNT_VOLTAGE_SYMBOL = Symbol.for('cinePowerPlanner.mountVoltageKey');

const GLOBAL_KEYS = [
  'MOUNT_VOLTAGE_STORAGE_KEY',
  'CUSTOM_FONT_STORAGE_KEY',
  'CUSTOM_FONT_STORAGE_KEY_NAME',
  'TEMPERATURE_UNIT_STORAGE_KEY',
  '__CINE_AUTO_BACKUP_RENAMED_FLAG',
  'AUTO_GEAR_BACKUP_RETENTION_DEFAULT',
  'AUTO_GEAR_BACKUP_RETENTION_MIN',
  '__cineCriticalStorageGuard',
  'SAFE_LOCAL_STORAGE',
  '__cineStorageInitialized',
  '__cineStorageApi',
  'recordFullBackupHistoryEntry',
  'loadFullBackupHistory',
];

function snapshotGlobals() {
  const snapshot = new Map();
  GLOBAL_KEYS.forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(global, key);
    snapshot.set(key, {
      exists: typeof descriptor !== 'undefined',
      descriptor,
    });
  });
  const symbolDescriptor = Object.getOwnPropertyDescriptor(global, MOUNT_VOLTAGE_SYMBOL);
  snapshot.set(MOUNT_VOLTAGE_SYMBOL, {
    exists: typeof symbolDescriptor !== 'undefined',
    descriptor: symbolDescriptor,
  });
  return snapshot;
}

function restoreGlobals(snapshot) {
  GLOBAL_KEYS.forEach((key) => {
    const record = snapshot.get(key);
    if (!record || !record.exists) {
      delete global[key];
      return;
    }
    const { descriptor } = record;
    if (!descriptor) {
      delete global[key];
      return;
    }
    if (descriptor.configurable) {
      Object.defineProperty(global, key, descriptor);
      return;
    }
    if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
      global[key] = descriptor.value;
      return;
    }
    Object.defineProperty(global, key, descriptor);
  });

  const symbolRecord = snapshot.get(MOUNT_VOLTAGE_SYMBOL);
  if (!symbolRecord || !symbolRecord.exists) {
    delete global[MOUNT_VOLTAGE_SYMBOL];
    return;
  }

  const { descriptor } = symbolRecord;
  if (!descriptor) {
    delete global[MOUNT_VOLTAGE_SYMBOL];
    return;
  }
  if (descriptor.configurable) {
    Object.defineProperty(global, MOUNT_VOLTAGE_SYMBOL, descriptor);
    return;
  }
  if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
    global[MOUNT_VOLTAGE_SYMBOL] = descriptor.value;
    return;
  }
  Object.defineProperty(global, MOUNT_VOLTAGE_SYMBOL, descriptor);
}

function clearStorage() {
  if (typeof localStorage !== 'undefined' && localStorage && typeof localStorage.clear === 'function') {
    localStorage.clear();
  }
  if (typeof sessionStorage !== 'undefined' && sessionStorage && typeof sessionStorage.clear === 'function') {
    sessionStorage.clear();
  }
}

function loadStorageModule() {
  let storage;
  jest.isolateModules(() => {
    storage = require('../../src/scripts/storage');
  });
  return storage;
}

describe('mount voltage storage key resolution', () => {
  let snapshot;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    clearStorage();
    snapshot = snapshotGlobals();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    clearStorage();
    restoreGlobals(snapshot);
  });

  test('getMountVoltageStorageKeyName returns the fallback key when no overrides are present', () => {
    delete global.MOUNT_VOLTAGE_STORAGE_KEY;
    delete global[MOUNT_VOLTAGE_SYMBOL];

    const storage = loadStorageModule();

    expect(storage.getMountVoltageStorageKeyName()).toBe(DEFAULT_KEY);
    expect(storage.getMountVoltageStorageBackupKeyName()).toBe(`${DEFAULT_KEY}__backup`);
  });

  test('getMountVoltageStorageKeyName prefers the shared symbol override when defined', () => {
    delete global.MOUNT_VOLTAGE_STORAGE_KEY;
    global[MOUNT_VOLTAGE_SYMBOL] = 'symbolBasedKey';

    const storage = loadStorageModule();

    expect(storage.getMountVoltageStorageKeyName()).toBe('symbolBasedKey');
    expect(storage.getMountVoltageStorageBackupKeyName()).toBe('symbolBasedKey__backup');
  });

  test('getMountVoltageStorageKeyName respects a global string override when provided', () => {
    delete global[MOUNT_VOLTAGE_SYMBOL];
    global.MOUNT_VOLTAGE_STORAGE_KEY = 'customVoltageKey';

    const storage = loadStorageModule();

    expect(storage.getMountVoltageStorageKeyName()).toBe('customVoltageKey');
    expect(storage.getMountVoltageStorageBackupKeyName()).toBe('customVoltageKey__backup');
  });

  test('exportAllData prefers the globally exposed symbol key', () => {
    global[MOUNT_VOLTAGE_SYMBOL] = 'symbolBasedKey';

    const storage = loadStorageModule();
    const safeStorage = storage.getSafeLocalStorage();
    const storedVoltages = [{ mount: 'B-Mount', voltage: 24 }];

    safeStorage.setItem('symbolBasedKey', JSON.stringify(storedVoltages));

    const exported = storage.exportAllData();
    expect(exported.preferences.mountVoltages).toEqual(storedVoltages);

    const fakeStorage = {
      getItem: jest.fn((key) => {
        if (key === 'symbolBasedKey') return JSON.stringify(storedVoltages);
        return null;
      }),
      setItem: jest.fn(),
    };

    const summary = storage.ensureCriticalStorageBackups({ storage: fakeStorage });
    expect(summary.ensured.some((entry) => entry.key === 'symbolBasedKey')).toBe(true);
    expect(fakeStorage.setItem).toHaveBeenCalledWith('symbolBasedKey__backup', JSON.stringify(storedVoltages));
  });

  test('exportAllData respects existing global string key', () => {
    global.MOUNT_VOLTAGE_STORAGE_KEY = 'customVoltageKey';

    const storage = loadStorageModule();
    const safeStorage = storage.getSafeLocalStorage();
    const storedVoltages = [{ mount: 'V-Mount', voltage: 26 }];

    safeStorage.setItem('customVoltageKey', JSON.stringify(storedVoltages));

    const exported = storage.exportAllData();
    expect(exported.preferences.mountVoltages).toEqual(storedVoltages);

    const fakeStorage = {
      getItem: jest.fn((key) => {
        if (key === 'customVoltageKey') return JSON.stringify(storedVoltages);
        return null;
      }),
      setItem: jest.fn(),
    };

    const summary = storage.ensureCriticalStorageBackups({ storage: fakeStorage });
    expect(summary.ensured.some((entry) => entry.key === 'customVoltageKey')).toBe(true);
    expect(fakeStorage.setItem).toHaveBeenCalledWith('customVoltageKey__backup', JSON.stringify(storedVoltages));
  });

  test('falls back to the default key and warns when assignment is blocked', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    Object.defineProperty(global, 'MOUNT_VOLTAGE_STORAGE_KEY', {
      configurable: true,
      get() {
        return undefined;
      },
      set() {
        throw new Error('blocked');
      },
    });

    Object.defineProperty(global, MOUNT_VOLTAGE_SYMBOL, {
      configurable: true,
      get() {
        return undefined;
      },
      set() {
        throw new Error('symbol blocked');
      },
    });

    const storage = loadStorageModule();
    const safeStorage = storage.getSafeLocalStorage();
    const storedVoltages = [{ mount: 'Gold Mount', voltage: 14.4 }];

    safeStorage.setItem(DEFAULT_KEY, JSON.stringify(storedVoltages));

    const exported = storage.exportAllData();
    expect(exported.preferences.mountVoltages).toEqual(storedVoltages);

    const fakeStorage = {
      getItem: jest.fn((key) => {
        if (key === DEFAULT_KEY) return JSON.stringify(storedVoltages);
        return null;
      }),
      setItem: jest.fn(),
    };

    const summary = storage.ensureCriticalStorageBackups({ storage: fakeStorage });
    expect(summary.ensured.some((entry) => entry.key === DEFAULT_KEY)).toBe(true);
    expect(fakeStorage.setItem).toHaveBeenCalledWith(`${DEFAULT_KEY}__backup`, JSON.stringify(storedVoltages));

    const fallbackWarnings = warnSpy.mock.calls.filter(([message]) =>
      message === 'Unable to expose mount voltage storage key globally. Using fallback only.'
    );
    expect(fallbackWarnings.length).toBeGreaterThanOrEqual(1);
  });
});
