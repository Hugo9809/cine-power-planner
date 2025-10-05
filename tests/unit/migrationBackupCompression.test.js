const lzString = require('lz-string/libs/lz-string');

class ControlledStorage {
  constructor() {
    this.store = {};
    this.writeAttempts = {};
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index) {
    const keys = Object.keys(this.store);
    return index >= 0 && index < keys.length ? keys[index] : null;
  }

  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key)
      ? this.store[key]
      : null;
  }

  setItem(key, value) {
    this.writeAttempts[key] = (this.writeAttempts[key] || 0) + 1;
    if (key.endsWith('__legacyMigrationBackup') && this.writeAttempts[key] === 1) {
      const error = new Error('Quota exceeded');
      error.name = 'QuotaExceededError';
      throw error;
    }
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
    this.writeAttempts = {};
  }

  getAttemptCount(key) {
    return this.writeAttempts[key] || 0;
  }
}

describe('migration backup compression fallback', () => {
  const DEVICE_KEY = 'cameraPowerPlanner_devices';
  const BACKUP_KEY = `${DEVICE_KEY}__legacyMigrationBackup`;

  let originalWindow;
  let originalLocalStorage;
  let originalSessionStorage;
  let originalLZString;
  let storageModule;
  let localStorageMock;
  let sessionStorageMock;

  const createBaselineDeviceData = () => ({
    cameras: {},
    monitors: {},
    video: {},
    viewfinders: {},
    directorMonitors: {},
    iosVideo: {},
    videoAssist: {},
    media: {},
    lenses: {},
    batteries: {},
    batteryHotswaps: {},
    wirelessReceivers: {},
    accessories: {
      chargers: {},
      cages: {},
      powerPlates: {},
      cameraSupport: {},
      matteboxes: {},
      filters: {},
      rigging: {},
      batteries: {},
      cables: {},
      videoAssist: {},
      media: {},
      tripodHeads: {},
      tripods: {},
      sliders: {},
      cameraStabiliser: {},
      grip: {},
      carts: {},
    },
    fiz: { motors: {}, handUnits: {}, controllers: {}, distance: {} },
    filterOptions: [],
  });

  beforeEach(() => {
    jest.resetModules();

    originalWindow = global.window;
    originalLocalStorage = global.localStorage;
    originalSessionStorage = global.sessionStorage;
    originalLZString = global.LZString;

    localStorageMock = new ControlledStorage();
    sessionStorageMock = new ControlledStorage();

    global.window = { localStorage: localStorageMock, sessionStorage: sessionStorageMock };
    global.localStorage = localStorageMock;
    global.sessionStorage = sessionStorageMock;
    global.LZString = lzString;

    storageModule = require('../../src/scripts/storage');
  });

  afterEach(() => {
    if (localStorageMock) {
      localStorageMock.clear();
    }

    if (sessionStorageMock) {
      sessionStorageMock.clear();
    }

    if (typeof originalWindow === 'undefined') {
      delete global.window;
    } else {
      global.window = originalWindow;
    }

    if (typeof originalLocalStorage === 'undefined') {
      delete global.localStorage;
    } else {
      global.localStorage = originalLocalStorage;
    }

    if (typeof originalSessionStorage === 'undefined') {
      delete global.sessionStorage;
    } else {
      global.sessionStorage = originalSessionStorage;
    }

    if (typeof originalLZString === 'undefined') {
      delete global.LZString;
    } else {
      global.LZString = originalLZString;
    }
  });

  test('stores compressed migration backup when quota errors occur before overwriting data', () => {
    const { saveDeviceData } = storageModule;

    const legacyPayload = {
      ...createBaselineDeviceData(),
      notes: 'A'.repeat(5000),
    };

    const updatedPayload = {
      ...createBaselineDeviceData(),
      notes: 'Updated',
    };

    localStorageMock.setItem(DEVICE_KEY, JSON.stringify(legacyPayload));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      saveDeviceData(updatedPayload);
    } finally {
      warnSpy.mockRestore();
    }

    expect(localStorageMock.getAttemptCount(BACKUP_KEY)).toBeGreaterThanOrEqual(2);

    const rawBackup = localStorageMock.getItem(BACKUP_KEY);
    expect(rawBackup).toBeTruthy();

    const backupRecord = JSON.parse(rawBackup);
    expect(backupRecord).toMatchObject({
      compression: 'lz-string',
      encoding: 'json-string',
    });
    expect(typeof backupRecord.data).toBe('string');
    expect(typeof backupRecord.compressionVariant).toBe('string');
    expect(backupRecord.originalSize).toBeGreaterThan(backupRecord.compressedSize);

    const variant = backupRecord.compressionVariant || 'utf16';
    const decompressMethod = {
      'uri-component': 'decompressFromEncodedURIComponent',
      base64: 'decompressFromBase64',
      utf16: 'decompressFromUTF16',
    }[variant] || 'decompressFromUTF16';
    const decompressed = lzString[decompressMethod](backupRecord.data);
    expect(decompressed).toBeTruthy();
    expect(decompressed.length).toBe(backupRecord.originalSize);

    const parsedLegacy = JSON.parse(decompressed);
    expect(parsedLegacy.data).toEqual(legacyPayload);
    expect(parsedLegacy.createdAt).toBe(backupRecord.createdAt);

    const persisted = JSON.parse(localStorageMock.getItem(DEVICE_KEY));
    expect(persisted).toEqual(updatedPayload);
  });

  test('selects the most compact compression variant before persisting migration backup', () => {
    jest.resetModules();

    const createCodec = (prefix) => {
      const store = new Map();
      return {
        compress: jest.fn((input) => {
          const key = `${prefix}${store.size}`;
          store.set(key, input);
          return key;
        }),
        decompress: jest.fn((key) => (store.has(key) ? store.get(key) : '')),
      };
    };

    const utf16Codec = createCodec('U'.repeat(40));
    const uriCodec = createCodec('S');
    const base64Codec = createCodec('B'.repeat(20));

    const customLZString = {
      compressToUTF16: utf16Codec.compress,
      decompressFromUTF16: utf16Codec.decompress,
      compressToEncodedURIComponent: uriCodec.compress,
      decompressFromEncodedURIComponent: uriCodec.decompress,
      compressToBase64: base64Codec.compress,
      decompressFromBase64: base64Codec.decompress,
    };

    global.LZString = customLZString;
    storageModule = require('../../src/scripts/storage');

    const { saveDeviceData } = storageModule;

    const legacyPayload = {
      ...createBaselineDeviceData(),
      notes: 'B'.repeat(4000),
    };

    const updatedPayload = {
      ...createBaselineDeviceData(),
      notes: 'Compact payload',
    };

    localStorageMock.setItem(DEVICE_KEY, JSON.stringify(legacyPayload));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      saveDeviceData(updatedPayload);
    } finally {
      warnSpy.mockRestore();
    }

    const backupRecord = JSON.parse(localStorageMock.getItem(BACKUP_KEY));
    expect(backupRecord.compressionVariant).toBe('uri-component');
    expect(uriCodec.compress).toHaveBeenCalled();
    expect(utf16Codec.compress).toHaveBeenCalled();

    const decoded = uriCodec.decompress(backupRecord.data);
    expect(decoded.length).toBe(backupRecord.originalSize);
    const parsedLegacy = JSON.parse(decoded);
    expect(parsedLegacy.data).toEqual(legacyPayload);
  });
});
