const LZString = require('lz-string/libs/lz-string');

describe('storage migration backup decompression safety', () => {
  const DEVICE_KEY = 'cameraPowerPlanner_devices';
  const MIGRATION_SUFFIX = '__legacyMigrationBackup';

  const createBlockedStorage = () => {
    const store = Object.create(null);
    const rawGetItem = (key) => (
      Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null
    );
    const rawSetItem = (key, value) => {
      store[key] = String(value);
    };
    const rawRemoveItem = (key) => {
      delete store[key];
    };
    const rawClear = () => {
      Object.keys(store).forEach((key) => {
        delete store[key];
      });
    };
    const rawKey = (index) => {
      const keys = Object.keys(store);
      return index >= 0 && index < keys.length ? keys[index] : null;
    };

    const storage = {};
    Object.defineProperty(storage, '__store', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: store,
    });
    Object.defineProperty(storage, 'length', {
      configurable: false,
      enumerable: false,
      get() {
        return Object.keys(store).length;
      },
    });
    Object.defineProperty(storage, 'getItem', {
      configurable: false,
      writable: true,
      value: rawGetItem,
    });
    Object.defineProperty(storage, 'setItem', {
      configurable: false,
      writable: true,
      value: rawSetItem,
    });
    Object.defineProperty(storage, 'removeItem', {
      configurable: false,
      writable: true,
      value: rawRemoveItem,
    });
    Object.defineProperty(storage, 'clear', {
      configurable: false,
      writable: true,
      value: rawClear,
    });
    Object.defineProperty(storage, 'key', {
      configurable: false,
      writable: true,
      value: rawKey,
    });

    return storage;
  };

  let storageModule;
  let localStorageStub;
  let sessionStorageStub;

  beforeEach(() => {
    jest.resetModules();

    localStorageStub = createBlockedStorage();
    sessionStorageStub = createBlockedStorage();

    global.window = { localStorage: localStorageStub, sessionStorage: sessionStorageStub };
    global.localStorage = localStorageStub;
    global.sessionStorage = sessionStorageStub;
    global.LZString = LZString;
    global.navigator = {
      storage: {
        persist: jest.fn().mockResolvedValue(false),
        persisted: jest.fn().mockResolvedValue(false),
      },
    };

    storageModule = require('../../src/scripts/storage');
  });

  afterEach(() => {
    jest.resetModules();
    delete global.window;
    delete global.localStorage;
    delete global.sessionStorage;
    delete global.LZString;
    delete global.navigator;
  });

  test('saveDeviceData creates decompressed migration backups when existing value is compressed', () => {
    const { saveDeviceData, loadDeviceData } = storageModule;

    const initialDeviceData = { cameras: { Primary: { notes: 'Ready' } } };
    saveDeviceData(initialDeviceData);

    const initialSnapshot = JSON.parse(JSON.stringify(loadDeviceData()));

    const serializedSnapshot = JSON.stringify(initialSnapshot);
    const compressedPayload = LZString.compressToUTF16(serializedSnapshot);
    const compressionEnvelope = JSON.stringify({
      __cineStorageCompressed: true,
      version: 1,
      algorithm: 'lz-string',
      namespace: 'camera-power-planner:storage-compression',
      data: compressedPayload,
      originalLength: serializedSnapshot.length,
      compressedPayloadLength: compressedPayload.length,
      compressionVariant: 'utf16',
    });

    localStorageStub.setItem(DEVICE_KEY, compressionEnvelope);

    const updatedDeviceData = { cameras: { Primary: { notes: 'Updated' } } };
    saveDeviceData(updatedDeviceData);

    const backupRaw = localStorageStub.getItem(`${DEVICE_KEY}${MIGRATION_SUFFIX}`);
    expect(backupRaw).not.toBeNull();
    const backupParsed = JSON.parse(backupRaw);
    expect(backupParsed.data).toEqual(initialSnapshot);

    localStorageStub.removeItem(DEVICE_KEY);
    localStorageStub.removeItem(`${DEVICE_KEY}__backup`);
    const recovered = loadDeviceData();
    expect(recovered).toEqual(initialSnapshot);
  });
});
