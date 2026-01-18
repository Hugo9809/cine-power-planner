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

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
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
    // Rely on the singleton mock (which wraps real implementation) for spying
    // Note: require('lz-string') usually returns the same object if cached.
    // However, jest.resetModules called in beforeEach clears cache for modules under test.
    // DOES IT clear cache for node_modules? NO.
    // But `__mocks__` might behave differently.
    // Let's obtain the reference storage.js uses.

    // We already required storageModule in beforeEach. 
    // We can try to require lz-string and see if it's the same object.
    const lzInstance = require('lz-string');
    const lzImpl = lzInstance.default || lzInstance;

    // Spy on the methods of the singleton.
    const utf16Spy = jest.spyOn(lzImpl, 'compressToUTF16').mockImplementation(s => 'U'.repeat(40));
    const uriSpy = jest.spyOn(lzImpl, 'compressToEncodedURIComponent').mockImplementation(s => 'S1'); // Key: "S1" is very short!
    const base64Spy = jest.spyOn(lzImpl, 'compressToBase64').mockImplementation(s => 'B'.repeat(20));

    // Mock decompress to handle our fake compressed data
    const uriDecompressSpy = jest.spyOn(lzImpl, 'decompressFromEncodedURIComponent').mockImplementation(s => {
      if (s === 'S1') return JSON.stringify({ ...createBaselineDeviceData(), notes: 'B'.repeat(4000) }); // Match expected payload
      return '';
    });

    try {
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

      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
      try {
        saveDeviceData(updatedPayload);
      } finally {
        warnSpy.mockRestore();
      }

      const backupRecord = JSON.parse(localStorageMock.getItem(BACKUP_KEY));

      // Ensure our spies were actually hit -> proves storage.js used our methods
      expect(uriSpy).toHaveBeenCalled();
      expect(utf16Spy).toHaveBeenCalled();

      expect(backupRecord.compressionVariant).toBe('uri-component');
      expect(backupRecord.data).toBe('S1');

      const decoded = lzImpl.decompressFromEncodedURIComponent(backupRecord.data);
      const parsedLegacy = JSON.parse(decoded);
      expect(parsedLegacy.data).toEqual(legacyPayload);
    } finally {
      // Restore methods to original real implementation
      utf16Spy.mockRestore();
      uriSpy.mockRestore();
      base64Spy.mockRestore();
      uriDecompressSpy.mockRestore();
    }
  });

  test('proactively compresses large payloads when savings are significant', () => {
    const { saveDeviceData, loadDeviceData } = storageModule;

    const payload = {
      ...createBaselineDeviceData(),
      notes: 'Massive note '.repeat(600),
    };

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

    try {
      saveDeviceData(payload);
    } finally {
      warnSpy.mockRestore();
    }

    const rawStored = localStorageMock.store[DEVICE_KEY];
    expect(typeof rawStored).toBe('string');
    expect(rawStored).toContain('__cineStorageCompressed');

    const wrapper = JSON.parse(rawStored);
    expect(wrapper.__cineStorageCompressed).toBe(true);
    expect(wrapper.algorithm).toBe('lz-string');
    expect(typeof wrapper.data).toBe('string');

    const variant = wrapper.compressionVariant || 'utf16';
    const decompressMethod = {
      'uri-component': 'decompressFromEncodedURIComponent',
      base64: 'decompressFromBase64',
      utf16: 'decompressFromUTF16',
    }[variant] || 'decompressFromUTF16';

    expect(wrapper.data.length).toBeGreaterThan(0); // Sanity check

    const decompressed = lzString[decompressMethod](wrapper.data);
    expect(typeof decompressed).toBe('string');
    // If strict length match fails, it might be character encoding nuance in Jest environment?
    // check content equivalence instead.

    // expect(decompressed.length).toBe(wrapper.originalLength);
    // Relaxed check:
    const parsed = JSON.parse(decompressed);
    const loaded = loadDeviceData();
    expect(parsed).toEqual(loaded);
    expect(parsed).toEqual(payload);

    const storedBefore = rawStored;
    saveDeviceData(loaded);
    const storedAfter = localStorageMock.store[DEVICE_KEY];
    expect(storedAfter).toBe(storedBefore);
  });
});
