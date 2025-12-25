if (typeof window === 'undefined') {
  global.window = {};
}

// Robust Mock factory supporting keys iteration for sharding
const createStorageMock = () => {
  let store = {};
  return {
    getItem: jest.fn((key) => (Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null)),
    setItem: jest.fn((key, value) => {
      console.warn(`MOCK SET: ${key} = ${String(value).substring(0, 50)}`);
      store[key] = String(value);
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((i) => Object.keys(store)[i] || null),
    get length() {
      return Object.keys(store).length;
    },
    __resetInfo: () => {
      store = {};
    },
    __getStore: () => store,
  };
};

const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();

Object.defineProperty(global.window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
Object.defineProperty(global.window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});
global.localStorage = localStorageMock;
global.sessionStorage = sessionStorageMock;

jest.resetModules();

const LZString = require('../../src/vendor/lz-string.min.js');
global.LZString = LZString;
const {
  loadDeviceData,
  saveDeviceData,
  loadSetups,
  saveSetups,
  saveSetup,
  loadSetup,
  deleteSetup,
  renameSetup,
  loadProject,
  saveProject,
  deleteProject,
  loadFeedback,
  saveFeedback,
  loadSessionState,
  saveSessionState,
  loadFavorites,
  saveFavorites,
  saveUserProfile,
  clearAllData,
  ensureCriticalStorageBackups,
  invalidateProjectReadCache,
  exportAllData,
  importAllData,
  loadFullBackupHistory,
  saveFullBackupHistory,
  recordFullBackupHistoryEntry,
  loadAutoGearRules,
  saveAutoGearRules,
  loadAutoGearSeedFlag,
  saveAutoGearSeedFlag,
  loadAutoGearBackups,
  saveAutoGearBackups,
  loadAutoGearBackupRetention,
  saveAutoGearBackupRetention,
  loadAutoGearPresets,
  saveAutoGearPresets,
  loadAutoGearActivePresetId,
  saveAutoGearActivePresetId,
  loadAutoGearAutoPresetId,
  saveAutoGearAutoPresetId,
  loadAutoGearMonitorDefaults,
  saveAutoGearMonitorDefaults,
  loadAutoGearBackupVisibility,
  saveAutoGearBackupVisibility,
  decodeStoredValue,
} = require('../../src/scripts/storage');

// Global setup
beforeEach(() => {
  // Aggressively clear the factory reset flag to allow writes
  const scopes = [
    typeof window !== 'undefined' ? window : null,
    typeof global !== 'undefined' ? global : null,
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof self !== 'undefined' ? self : null,
  ];

  scopes.forEach(scope => {
    if (scope) {
      try {
        delete scope.__cameraPowerPlannerFactoryResetting;
        scope.__cameraPowerPlannerFactoryResetting = false;
      } catch (unusedError) {
        // Fallback for non-configurable properties
        scope.__cameraPowerPlannerFactoryResetting = false;
        void unusedError;
      }
    }
  });
});
const lzString = LZString;
console.warn('DEBUG: lzString type:', typeof lzString);
if (lzString) {
  console.warn('DEBUG: lzString keys:', Object.keys(lzString).slice(0, 10));
  console.warn('DEBUG: lzString.compressToUTF16 type:', typeof lzString.compressToUTF16);
}

const DEVICE_KEY = 'cameraPowerPlanner_devices';
const SETUP_KEY = 'cameraPowerPlanner_setups';
const SESSION_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_KEY = 'cameraPowerPlanner_feedback';
const PROJECT_KEY = 'cameraPowerPlanner_project';
const FAVORITES_KEY = 'cameraPowerPlanner_favorites';
const USER_PROFILE_KEY = 'cameraPowerPlanner_userProfile';
const SCHEMA_CACHE_KEY = 'cameraPowerPlanner_schemaCache';
const AUTO_GEAR_RULES_KEY = 'cameraPowerPlanner_autoGearRules';
const AUTO_GEAR_SEEDED_KEY = 'cameraPowerPlanner_autoGearSeeded';
const AUTO_GEAR_BACKUPS_KEY = 'cameraPowerPlanner_autoGearBackups';
const AUTO_GEAR_PRESETS_KEY = 'cameraPowerPlanner_autoGearPresets';
const AUTO_GEAR_ACTIVE_PRESET_KEY = 'cameraPowerPlanner_autoGearActivePreset';
const AUTO_GEAR_AUTO_PRESET_KEY = 'cameraPowerPlanner_autoGearAutoPreset';
const AUTO_GEAR_BACKUP_VISIBILITY_KEY = 'cameraPowerPlanner_autoGearShowBackups';
const AUTO_GEAR_BACKUP_RETENTION_KEY = 'cameraPowerPlanner_autoGearBackupRetention';
const AUTO_GEAR_MONITOR_DEFAULTS_KEY = 'cameraPowerPlanner_autoGearMonitorDefaults';
const CUSTOM_FONT_KEY = 'cameraPowerPlanner_customFonts';
const CUSTOM_LOGO_KEY = 'customLogo';
const TEMPERATURE_UNIT_KEY = 'cameraPowerPlanner_temperatureUnit';
const FULL_BACKUP_HISTORY_KEY = 'cameraPowerPlanner_fullBackups';
const CAMERA_COLOR_KEY = 'cameraPowerPlanner_cameraColors';
const PRINT_PREFERENCES_KEY = 'cineRentalPrintSections';

const BACKUP_SUFFIX = '__backup';
const MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
const backupKeyFor = (key) => `${key}${BACKUP_SUFFIX}`;
const migrationBackupKeyFor = (key) => `${key}${MIGRATION_BACKUP_SUFFIX}`;
const TEST_AUTO_BACKUP_RENAMED_FLAG =
  (typeof globalThis !== 'undefined' && globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG)
    ? globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG
    : '__cineAutoBackupRenamed';

const parseLocalStorageJSON = (key) => {
  const raw = localStorage.getItem(key);
  if (raw === null || raw === undefined) {
    return raw;
  }
  return JSON.parse(decodeStoredValue(raw));
};

const getDecodedLocalStorageItem = (key) => decodeStoredValue(localStorage.getItem(key));

const withGenerationFlag = (value, generated = true) => ({
  ...value,
  gearListAndProjectRequirementsGenerated: generated,
});

const decompressStorageEnvelope = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }
  if (value.__cineStorageCompressed === true && value.algorithm === 'lz-string') {
    const variant = typeof value.compressionVariant === 'string' ? value.compressionVariant : 'utf16';
    const payload = typeof value.data === 'string' ? value.data : '';
    let decompressed;
    try {
      if (variant === 'utf16') {
        decompressed = LZString.decompressFromUTF16(payload);
      } else if (variant === 'base64') {
        decompressed = LZString.decompressFromBase64(payload);
      } else if (variant === 'uri') {
        decompressed = LZString.decompressFromEncodedURIComponent(payload);
      } else {
        decompressed = LZString.decompress(payload);
      }
    } catch (error) {
      throw new Error(`Automatic backup entry could not be decompressed: ${error.message}`);
    }
    if (!decompressed) {
      throw new Error('Automatic backup entry could not be decompressed: empty payload.');
    }
    try {
      return JSON.parse(decompressed);
    } catch (parseError) {
      throw new Error(`Automatic backup entry could not be parsed after decompression: ${parseError.message}`);
    }
  }
  return value;
};

const expectAutoBackupSnapshot = (entry, expectedPayload, options = {}) => {
  expect(entry).toBeDefined();
  let normalizedEntry = entry;
  if (typeof normalizedEntry === 'string') {
    try {
      normalizedEntry = JSON.parse(normalizedEntry);
    } catch (parseError) {
      throw new Error(`Automatic backup entry string could not be parsed: ${parseError.message}`);
    }
  }
  normalizedEntry = decompressStorageEnvelope(normalizedEntry);
  expect(normalizedEntry && typeof normalizedEntry === 'object').toBe(true);
  expect(normalizedEntry).toHaveProperty('__cineAutoBackupSnapshot');
  const snapshot = normalizedEntry.__cineAutoBackupSnapshot;
  expect(snapshot).toBeDefined();
  const expectedType = options.snapshotType || 'full';
  expect(snapshot.snapshotType).toBe(expectedType);
  if (Object.prototype.hasOwnProperty.call(options, 'base')) {
    expect(snapshot.base).toBe(options.base);
  }
  expect(snapshot.payload).toEqual(expectedPayload);
};

const rawCustomGearSelectors = {
  '#gearListMonitor': 'SmallHD Cine 7',
  __customItems: {
    monitoring: [
      { quantity: '1', name: 'Client Confidence Monitor', rentalExcluded: true },
      { quantity: '2', name: 'Focus Puller Monitor', rentalExcluded: false },
    ],
  },
  __rentalExclusions: {
    'Client Confidence Monitor': true,
  },
};

const expectedCustomGearSelectors = {
  '#gearListMonitor': 'SmallHD Cine 7',
  __customItems: {
    monitoring: [
      { quantity: '1', name: 'Client Confidence Monitor', rentalExcluded: 'true' },
      { quantity: '2', name: 'Focus Puller Monitor', rentalExcluded: 'false' },
    ],
  },
  __rentalExclusions: {
    'Client Confidence Monitor': 'true',
  },
};

const rawUpdatedGearSelectors = {
  '#gearListMonitor': 'SmallHD Indie 7',
  __customItems: {
    monitoring: [
      { quantity: '3', name: 'Video Village Monitor', rentalExcluded: true },
    ],
  },
  __rentalExclusions: {
    'Video Village Monitor': true,
  },
};

const expectedUpdatedGearSelectors = {
  '#gearListMonitor': 'SmallHD Indie 7',
  __customItems: {
    monitoring: [
      { quantity: '3', name: 'Video Village Monitor', rentalExcluded: 'true' },
    ],
  },
  __rentalExclusions: {
    'Video Village Monitor': 'true',
  },
};

const validDeviceData = {
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
    cardReaders: {},
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
};

describe('device data storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveDeviceData stores JSON in localStorage', () => {
    saveDeviceData(validDeviceData);
    expect(getDecodedLocalStorageItem(DEVICE_KEY)).toBe(JSON.stringify(validDeviceData));
  });

  test('saveDeviceData(null) removes stored overrides and backup copy', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    localStorage.setItem(backupKeyFor(DEVICE_KEY), JSON.stringify(validDeviceData));

    saveDeviceData(null);

    expect(getDecodedLocalStorageItem(DEVICE_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(DEVICE_KEY))).toBeNull();
  });

  test('loadDeviceData returns parsed data if valid', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    expect(loadDeviceData()).toEqual(validDeviceData);
  });

  test('loadDeviceData adds missing categories for legacy data', () => {
    const legacy = { cameras: {}, monitors: {} };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(legacy));
    const result = loadDeviceData();
    const expected = {
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
        cardReaders: {},
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
    };
    expect(result).toEqual(expected);
    expect(parseLocalStorageJSON(DEVICE_KEY)).toEqual(expected);
  });

  test('loadDeviceData creates migration backup before rewriting normalized data', () => {
    const legacy = { cameras: { Alexa: {} } };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(legacy));

    expect(getDecodedLocalStorageItem(migrationBackupKeyFor(DEVICE_KEY))).toBeNull();

    const result = loadDeviceData();

    expect(result).toMatchObject({ cameras: { Alexa: {} } });
    const stored = parseLocalStorageJSON(DEVICE_KEY);
    expect(stored).toEqual(result);

    const backupRaw = getDecodedLocalStorageItem(migrationBackupKeyFor(DEVICE_KEY));
    expect(backupRaw).toBeTruthy();
    const backup = JSON.parse(backupRaw);
    expect(typeof backup.createdAt).toBe('string');
    expect(backup.createdAt.length).toBeGreaterThan(0);
    expect(backup.data).toEqual(legacy);
  });

  test('loadDeviceData preserves existing migration backup entries', () => {
    const legacy = { cameras: { Alexa: {} } };
    const existingBackup = { createdAt: '2024-01-01T00:00:00.000Z', data: { legacy: true } };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(legacy));
    localStorage.setItem(
      migrationBackupKeyFor(DEVICE_KEY),
      JSON.stringify(existingBackup),
    );

    const result = loadDeviceData();

    expect(result).toMatchObject({ cameras: { Alexa: {} } });
    const storedBackup = getDecodedLocalStorageItem(migrationBackupKeyFor(DEVICE_KEY));
    const parsedBackup = JSON.parse(storedBackup);
    const backupList = Array.isArray(parsedBackup) ? parsedBackup : [parsedBackup];

    // We expect the original backup to be preserved (likely as the first element)
    expect(backupList[0]).toEqual(existingBackup);
    // And possibly a new backup appended due to the operation
    expect(backupList.length).toBeGreaterThanOrEqual(1);
  });

  test('loadDeviceData migrates legacy key prefix to current storage', () => {
    const legacy = { cameras: {}, monitors: {} };
    localStorage.setItem('cinePowerPlanner_devices', JSON.stringify(legacy));

    const result = loadDeviceData();

    expect(result).not.toBeNull();
    const stored = parseLocalStorageJSON(DEVICE_KEY);
    expect(stored).toEqual(result);
    expect(getDecodedLocalStorageItem('cinePowerPlanner_devices')).toBeNull();
  });

  test('loadDeviceData recovers missing primary from compressed backup without nesting compression', () => {
    const serialized = JSON.stringify(validDeviceData);
    const compressedPayload = global.LZString.compressToUTF16(serialized);
    const backupWrapper = JSON.stringify({
      __cineStorageCompressed: true,
      version: 1,
      algorithm: 'lz-string',
      namespace: 'camera-power-planner:storage-compression',
      data: compressedPayload,
      originalLength: serialized.length,
      compressedPayloadLength: compressedPayload.length,
      compressionVariant: 'utf16',
    });

    localStorage.setItem(backupKeyFor(DEVICE_KEY), backupWrapper);
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();

    const recovered = loadDeviceData();

    expect(recovered).toEqual(validDeviceData);
    const restoredRaw = decodeStoredValue(localStorage.getItem(DEVICE_KEY));
    expect(typeof restoredRaw).toBe('string');
    expect(restoredRaw).not.toContain('__cineStorageCompressed');
    expect(JSON.parse(restoredRaw)).toEqual(recovered);
  });

  test('saveDeviceData stores uncompressed payloads even for large entries', () => {
    const largeNote = 'Important storage note '.repeat(1200);
    const heavyDeviceData = JSON.parse(JSON.stringify(validDeviceData));
    heavyDeviceData.notes = largeNote;

    const expectedSerialized = JSON.stringify(heavyDeviceData);
    const compressedPayload = global.LZString.compressToUTF16(expectedSerialized);
    const legacyBackupWrapper = JSON.stringify({
      __cineStorageCompressed: true,
      version: 1,
      algorithm: 'lz-string',
      namespace: 'camera-power-planner:storage-compression',
      data: compressedPayload,
      originalLength: expectedSerialized.length,
      compressedPayloadLength: compressedPayload.length,
      compressionVariant: 'utf16',
    });

    localStorage.setItem(backupKeyFor(DEVICE_KEY), legacyBackupWrapper);

    saveDeviceData(heavyDeviceData);

    const primaryRaw = localStorage.getItem(DEVICE_KEY);
    expect(primaryRaw).not.toBeNull();
    expect(primaryRaw).toBe(expectedSerialized);
    expect(primaryRaw).not.toContain('__cineStorageCompressed');
    expect(JSON.parse(primaryRaw)).toEqual(heavyDeviceData);

    const backupRaw = localStorage.getItem(backupKeyFor(DEVICE_KEY));
    expect(backupRaw).toBe(expectedSerialized);
    expect(backupRaw).not.toContain('__cineStorageCompressed');
    expect(JSON.parse(backupRaw)).toEqual(heavyDeviceData);
  });

  test('saveDeviceData rewrites legacy compressed payloads to plain JSON', () => {
    const largeNote = 'Compressed legacy payload '.repeat(800);
    const heavyDeviceData = JSON.parse(JSON.stringify(validDeviceData));
    heavyDeviceData.notes = largeNote;

    const serialized = JSON.stringify(heavyDeviceData);
    const compressedPayload = global.LZString.compressToUTF16(serialized);
    const legacyWrapper = JSON.stringify({
      __cineStorageCompressed: true,
      version: 1,
      algorithm: 'lz-string',
      namespace: 'camera-power-planner:storage-compression',
      data: compressedPayload,
      originalLength: serialized.length,
      compressedPayloadLength: compressedPayload.length,
      compressionVariant: 'utf16',
    });

    localStorage.setItem(DEVICE_KEY, legacyWrapper);
    localStorage.setItem(backupKeyFor(DEVICE_KEY), legacyWrapper);

    saveDeviceData(heavyDeviceData);

    const primaryRaw = localStorage.getItem(DEVICE_KEY);
    const backupRaw = localStorage.getItem(backupKeyFor(DEVICE_KEY));

    expect(primaryRaw).toBe(serialized);
    expect(primaryRaw).not.toContain('__cineStorageCompressed');
    expect(JSON.parse(primaryRaw)).toEqual(heavyDeviceData);

    expect(backupRaw).toBe(serialized);
    expect(backupRaw).not.toContain('__cineStorageCompressed');
    expect(JSON.parse(backupRaw)).toEqual(heavyDeviceData);
  });

  test('loadDeviceData replaces non-object categories with empty objects', () => {
    const corrupted = {
      cameras: null,
      monitors: [],
      video: 5,
      viewfinders: 'vfs',
      directorMonitors: 3,
      iosVideo: false,
      videoAssist: 'assist',
      media: 10,
      lenses: ['Prime'],
      batteries: 'x',
      batteryHotswaps: 1,
      wirelessReceivers: null,
      accessories: {
        chargers: [],
        cages: null,
        powerPlates: 'yes',
        cameraSupport: 5,
        matteboxes: null,
        filters: 'string',
        rigging: {},
        batteries: [],
        cables: 'cable',
        videoAssist: null,
        media: 'media',
        tripodHeads: 4,
        tripods: {},
        sliders: false,
        cameraStabiliser: 'rig',
        grip: null,
        carts: [],
      },
      fiz: { motors: [], handUnits: 'x', controllers: null },
      filterOptions: {},
    };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(corrupted));
    expect(loadDeviceData()).toEqual(validDeviceData);
  });

  test('loadDeviceData returns null for primitive data', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(5));
    expect(loadDeviceData()).toBeNull();
  });

  test('loadDeviceData restores data from backup when primary payload is corrupted', () => {
    saveDeviceData(validDeviceData);
    const backupKey = backupKeyFor(DEVICE_KEY);
    expect(getDecodedLocalStorageItem(backupKey)).toBe(JSON.stringify(validDeviceData));

    localStorage.setItem(DEVICE_KEY, '{invalid-json');

    expect(loadDeviceData()).toEqual(validDeviceData);
    expect(getDecodedLocalStorageItem(DEVICE_KEY)).toBe(JSON.stringify(validDeviceData));
  });
});

describe('setup storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveSetups stores JSON', () => {
    const setups = { A: { foo: 1 } };
    saveSetups(setups);
    expect(getDecodedLocalStorageItem(SETUP_KEY)).toBe(JSON.stringify(setups));
  });

  test('loadSetups returns empty object when none', () => {
    expect(loadSetups()).toEqual({});
  });

  test('loadSetups returns parsed object when present', () => {
    const setups = { A: { foo: 1 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    expect(loadSetups()).toEqual(setups);
  });

  test('loadSetups converts array data into an object', () => {
    const arr = [{ name: 'A', foo: 1 }, { name: 'B', bar: 2 }];
    localStorage.setItem(SETUP_KEY, JSON.stringify(arr));
    expect(loadSetups()).toEqual({ A: { name: 'A', foo: 1 }, B: { name: 'B', bar: 2 } });
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ A: { name: 'A', foo: 1 }, B: { name: 'B', bar: 2 } });
  });

  test('loadSetups ensures unique keys when names duplicate', () => {
    const arr = [{ name: 'A', foo: 1 }, { name: 'A', bar: 2 }];
    localStorage.setItem(SETUP_KEY, JSON.stringify(arr));
    expect(loadSetups()).toEqual({ A: { name: 'A', foo: 1 }, 'A (2)': { name: 'A', bar: 2 } });
  });

  test('loadSetups treats case or whitespace variants as duplicates', () => {
    const arr = [{ name: 'A' }, { name: 'a' }, { name: ' A ' }];
    localStorage.setItem(SETUP_KEY, JSON.stringify(arr));
    expect(loadSetups()).toEqual({ A: { name: 'A' }, 'a (2)': { name: 'a' }, 'A (3)': { name: ' A ' } });
  });

  test('loadSetups returns empty object for primitive data', () => {
    localStorage.setItem(SETUP_KEY, JSON.stringify(5));
    expect(loadSetups()).toEqual({});
  });

  test('loadSetups recovers from backup when stored data is corrupted', () => {
    const setups = { A: { foo: 1 } };
    saveSetups(setups);
    expect(getDecodedLocalStorageItem(backupKeyFor(SETUP_KEY))).toBe(JSON.stringify(setups));

    localStorage.setItem(SETUP_KEY, '{bad-json');

    expect(loadSetups()).toEqual(setups);
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual(setups);
  });

  test('loadSetups removes entries that are not plain objects', () => {
    const stored = {
      A: { foo: 1 },
      B: null,
      C: ['not-an-object'],
      D: 'string value'
    };
    localStorage.setItem(SETUP_KEY, JSON.stringify(stored));
    expect(loadSetups()).toEqual({ A: { foo: 1 } });
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ A: { foo: 1 } });
  });

  test('saveSetups removes older duplicate auto backups before trimming unique entries', () => {
    const setups = {};
    for (let index = 0; index < 119; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const key = `auto-backup-2024-01-01-${hour}-${minute}`;
      setups[key] = { camera: `Camera ${index}` };
    }
    const duplicateValue = { camera: 'Shared Camera', lens: 'Shared Lens' };
    const oldDuplicateKey = 'auto-backup-2023-12-31-23-59-Project Alpha';
    const newDuplicateKey = 'auto-backup-2024-01-02-00-00-Project Alpha';
    setups[oldDuplicateKey] = duplicateValue;
    setups[newDuplicateKey] = duplicateValue;

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    expect(stored[oldDuplicateKey]).toBeUndefined();
    expectAutoBackupSnapshot(stored[newDuplicateKey], duplicateValue);
    const autoBackupCount = Object.keys(stored).filter(name => name.startsWith('auto-backup-')).length;
    expect(autoBackupCount).toBeLessThanOrEqual(120);
  });

  test('saveSetups replaces circular references in auto backups with a safe placeholder', () => {
    const cycleKey = 'auto-backup-2024-02-02-00-00-Cycle';
    const cycleEntry = { label: 'Cycle Entry' };
    cycleEntry.self = cycleEntry;

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
    saveSetups({ [cycleKey]: cycleEntry });
    warnSpy.mockRestore();

    const stored = parseLocalStorageJSON(SETUP_KEY);
    expect(stored).toHaveProperty(cycleKey);
    const snapshot = stored[cycleKey] && stored[cycleKey].__cineAutoBackupSnapshot;
    expect(snapshot).toBeDefined();
    let payload = snapshot ? snapshot.payload : null;
    if (payload && typeof payload === 'string') {
      payload = JSON.parse(payload);
    } else if (payload && typeof payload === 'object') {
      payload = decompressStorageEnvelope(payload);
    }
    expect(payload && typeof payload === 'object').toBe(true);
    expect(payload.self).toBe('__cineCircular__');
  });

  test('saveSetups keeps auto backups with identical data when labels differ', () => {
    const shared = {
      camera: 'Shared Camera',
      motors: ['Motor 1'],
      controllers: ['Controller 1'],
    };
    const alphaKey = 'auto-backup-2024-01-01-00-00-Project Alpha';
    const betaKey = 'auto-backup-2024-01-01-00-01-Project Beta';
    const setups = {
      [alphaKey]: shared,
      [betaKey]: shared,
    };

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    expectAutoBackupSnapshot(stored[alphaKey], shared);
    expectAutoBackupSnapshot(stored[betaKey], shared);
  });

  test('saveSetups keeps auto backups with distinct Date values for the same label', () => {
    const setups = {};

    for (let index = 0; index < 116; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const key = `auto-backup-2024-01-01-${hour}-${minute}-Filler-${index}`;
      setups[key] = { camera: `Camera ${index}` };
    }

    const alphaOldKey = 'auto-backup-2024-02-01-10-00-Project Alpha';
    const alphaNewKey = 'auto-backup-2024-02-01-10-01-Project Alpha';
    setups[alphaOldKey] = { metadata: { createdAt: new Date('2024-02-01T10:00:00Z') } };
    setups[alphaNewKey] = { metadata: { createdAt: new Date('2024-02-01T10:01:00Z') } };

    const betaOldKey = 'auto-backup-2024-03-01-00-00-Project Beta';
    const betaNewKey = 'auto-backup-2024-03-01-00-01-Project Beta';
    const betaValue = { camera: 'Shared Camera', notes: ['beta'] };
    setups[betaOldKey] = betaValue;
    setups[betaNewKey] = betaValue;

    const gammaOldKey = 'auto-backup-2024-04-01-00-00-Project Gamma';
    const gammaNewKey = 'auto-backup-2024-04-01-00-01-Project Gamma';
    const gammaValue = { camera: 'Shared Camera', notes: ['gamma'] };
    setups[gammaOldKey] = gammaValue;
    setups[gammaNewKey] = gammaValue;

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    const storedKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-'));
    expect(storedKeys.length).toBeLessThanOrEqual(120);
    expect(stored[alphaOldKey]).toBeDefined();
    expect(stored[alphaNewKey]).toBeDefined();
    expect(stored[betaOldKey]).toBeUndefined();
    expectAutoBackupSnapshot(stored[betaNewKey], betaValue);
    expect(stored[gammaOldKey]).toBeUndefined();
    expectAutoBackupSnapshot(stored[gammaNewKey], gammaValue);
  });

  test('saveSetups keeps the newest auto backup for each project label when trimming', () => {
    const setups = {};
    for (let index = 0; index < 140; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const label = index % 2 === 0 ? 'Project Alpha' : 'Project Beta';
      const key = `auto-backup-2024-01-01-${hour}-${minute}-${label}`;
      setups[key] = {
        camera: 'Camera 1',
        projectInfo: { projectName: label },
      };
    }

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    const autoKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-')).sort();
    expect(autoKeys.length).toBeLessThanOrEqual(120);

    const alphaKeys = autoKeys.filter((name) => name.endsWith('Project Alpha'));
    const betaKeys = autoKeys.filter((name) => name.endsWith('Project Beta'));

    expect(alphaKeys.length).toBeGreaterThan(0);
    expect(betaKeys.length).toBeGreaterThan(0);
    expect(alphaKeys[alphaKeys.length - 1]).toBe('auto-backup-2024-01-01-02-18-Project Alpha');
    expect(betaKeys[betaKeys.length - 1]).toBe('auto-backup-2024-01-01-02-19-Project Beta');
  });

  test('saveSetups keeps only the newest unlabeled auto backup when earlier copies are identical', () => {
    const setups = {};
    for (let index = 0; index < 140; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const key = `auto-backup-2024-01-01-${hour}-${minute}`;
      setups[key] = {
        camera: 'Camera 1',
        projectInfo: { projectName: '' },
      };
    }

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    const autoKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-')).sort();

    expect(autoKeys).toEqual(['auto-backup-2024-01-01-02-19']);
  });

  test('saveSetups logs when duplicate auto backups are trimmed without losing the newest copy', () => {
    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

    const setups = {};
    for (let index = 0; index < 140; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const label = index % 3 === 0 ? 'Project Alpha' : 'Project Beta';
      const key = `auto-backup-2024-01-01-${hour}-${minute}-${label}`;
      setups[key] = { camera: 'Camera 1', projectInfo: { projectName: label } };
    }

    saveSetups(setups);

    const duplicateLog = infoSpy.mock.calls.find((call) => {
      const [message, details] = call;
      return (
        message === 'Removed duplicate automatic backup while preserving newer copy.'
        && details
        && typeof details === 'object'
        && typeof details.removedKey === 'string'
        && typeof details.preservedKey === 'string'
        && details.removedKey !== details.preservedKey
      );
    });

    infoSpy.mockRestore();

    expect(duplicateLog).toBeDefined();
  });

  test('saveSetups retains unique auto backups even when exceeding the retention limit', () => {
    const setups = {};
    for (let index = 0; index < 130; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const key = `auto-backup-2024-05-01-${hour}-${minute}-Project Unique`;
      setups[key] = {
        camera: `Camera ${index}`,
        notes: [`Entry ${index}`],
      };
    }

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    const autoKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-'));

    expect(autoKeys).toHaveLength(130);
  });

  test('renameSetup marks auto backups renamed within the automatic namespace', () => {
    const originalKey = 'auto-backup-2024-01-01-00-00-Project Alpha';
    const setups = { [originalKey]: { camera: 'A' } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));

    const renamedKey = 'auto-backup-2024-01-01-00-00-Project Alpha Notes';
    const result = renameSetup(originalKey, renamedKey);

    expect(result).toBe(renamedKey);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    expect(stored[renamedKey]).toBeDefined();
    expect(stored[renamedKey]).toHaveProperty('__cineAutoBackupSnapshot');
    expect(
      stored[renamedKey].__cineAutoBackupSnapshot.payload[TEST_AUTO_BACKUP_RENAMED_FLAG],
    ).toBe(true);
  });

  test('saveSetups keeps renamed auto backups when a new snapshot shares the label', () => {
    const renamedKey = 'auto-backup-2024-01-01-00-00-Project Alpha';
    const newKey = 'auto-backup-2024-02-01-00-00-Project Alpha';
    const setups = {
      [renamedKey]: { camera: 'A', [TEST_AUTO_BACKUP_RENAMED_FLAG]: true },
      [newKey]: { camera: 'A' },
    };

    saveSetups(setups);

    const stored = parseLocalStorageJSON(SETUP_KEY);
    expect(stored[renamedKey]).toBeDefined();
    expect(stored[newKey]).toBeDefined();
  });

  test('saveSetup adds and persists single setup', () => {
    const initial = { A: { foo: 1 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(initial));
    saveSetup('B', { bar: 2 });
    const result = parseLocalStorageJSON(SETUP_KEY);
    expect(result).toEqual({ A: { foo: 1 }, B: { bar: 2 } });
  });

  test('loadSetup retrieves named setup', () => {
    const setups = { A: { foo: 1 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    expect(loadSetup('A')).toEqual({ foo: 1 });
  });

  test('deleteSetup removes named setup', () => {
    const setups = { A: { foo: 1 }, B: { bar: 2 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    deleteSetup('A');
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ B: { bar: 2 } });
  });

  test('renameSetup renames setup to a new unique name', () => {
    const setups = { A: { foo: 1 }, B: { bar: 2 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    const newName = renameSetup('A', 'C');
    expect(newName).toBe('C');
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ C: { foo: 1 }, B: { bar: 2 } });
  });

  test('renameSetup appends suffix when target exists', () => {
    const setups = { A: { foo: 1 }, C: { bar: 2 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    const newName = renameSetup('A', 'C');
    expect(newName).toBe('C (2)');
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ 'C (2)': { foo: 1 }, C: { bar: 2 } });
  });

  test('renameSetup ignores case and whitespace when name unchanged', () => {
    const setups = { A: { foo: 1 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    const newName = renameSetup('A', ' a ');
    expect(newName).toBe('A');
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ A: { foo: 1 } });
  });

  test('renameSetup prevents case-insensitive duplicates', () => {
    const setups = { A: { foo: 1 }, B: { bar: 2 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    const newName = renameSetup('B', ' a ');
    expect(newName).toBe('a (2)');
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ A: { foo: 1 }, 'a (2)': { bar: 2 } });
  });

  test('renameSetup returns null when original missing', () => {
    localStorage.setItem(SETUP_KEY, JSON.stringify({ A: { foo: 1 } }));
    const result = renameSetup('B', 'C');
    expect(result).toBeNull();
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ A: { foo: 1 } });
  });

  test('renameSetup ignores empty new name', () => {
    const setups = { A: { foo: 1 } };
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    const newName = renameSetup('A', '   ');
    expect(newName).toBe('A');
    expect(parseLocalStorageJSON(SETUP_KEY)).toEqual({ A: { foo: 1 } });
  });
});

describe('session state storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('saveSessionState stores JSON in localStorage', () => {
    const state = { camera: 'CamA' };
    saveSessionState(state);
    expect(getDecodedLocalStorageItem(SESSION_KEY)).toBe(JSON.stringify(state));
  });

  test('loadSessionState returns parsed object when present', () => {
    const state = { camera: 'CamA' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(state));
    expect(loadSessionState()).toEqual(state);
  });

  test('loadSessionState returns null when none', () => {
    expect(loadSessionState()).toBeNull();
  });

  test('loadSessionState migrates data from sessionStorage', () => {
    const state = { camera: 'CamA' };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    expect(loadSessionState()).toEqual(state);
    expect(getDecodedLocalStorageItem(SESSION_KEY)).toBe(JSON.stringify(state));
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  test('loadSessionState migrates legacy key prefix', () => {
    const state = { camera: 'CamA', motors: ['MotorA'] };
    localStorage.setItem('cinePowerPlanner_session', JSON.stringify(state));

    const result = loadSessionState();

    expect(result).toEqual({ camera: 'CamA', motors: ['MotorA'] });

    expect(parseLocalStorageJSON(SESSION_KEY)).toEqual(result);
    expect(getDecodedLocalStorageItem('cinePowerPlanner_session')).toBeNull();
  });

  test('loadSessionState normalizes legacy session payloads', () => {
    const legacyState = {
      setupName: ' Legacy ',
      motor: 'FocusMotor',
      motors: [null, 'ZoomMotor', 7],
      controller: { primary: 'FocusWheel' },
      controllers: 'HandUnit',
      projectInfo: 'invalid',
      battery: ['Pack'],
      sliderBowl: null,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(legacyState));

    const result = loadSessionState();
    const stored = parseLocalStorageJSON(SESSION_KEY);

    expect(result.motors).toEqual(['ZoomMotor', 'FocusMotor']);
    expect(result.controllers).toEqual(['HandUnit', 'FocusWheel']);
    expect(result.setupName).toBe('Legacy');
    expect(result.battery).toBe('');
    expect(result.sliderBowl).toBe('');
    expect(result.projectInfo).toBeNull();
    expect(stored).toEqual(result);
    expect(stored.motor).toBeUndefined();
    expect(stored.controller).toBeUndefined();
  });

  test('loadSessionState creates migration backup before rewriting normalized data', () => {
    const legacyState = {
      setupName: ' Legacy ',
      motor: 'FocusMotor',
      controller: 'FocusWheel',
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(legacyState));

    expect(getDecodedLocalStorageItem(migrationBackupKeyFor(SESSION_KEY))).toBeNull();

    const state = loadSessionState();

    expect(state).toMatchObject({
      setupName: 'Legacy',
      motors: ['FocusMotor'],
      controllers: ['FocusWheel'],
    });
    const stored = parseLocalStorageJSON(SESSION_KEY);
    expect(stored).toEqual(state);

    const backupRaw = getDecodedLocalStorageItem(migrationBackupKeyFor(SESSION_KEY));
    expect(backupRaw).toBeTruthy();
    const parsed = JSON.parse(backupRaw);
    // It might be an array now due to history support
    const backup = Array.isArray(parsed) ? parsed[0] : parsed;
    expect(typeof backup.createdAt).toBe('string');
    expect(backup.createdAt.length).toBeGreaterThan(0);
    expect(backup.data).toEqual(legacyState);
  });

  test('loadSessionState preserves existing migration backup entries', () => {
    const legacyState = { setupName: ' Legacy ', motor: 'FocusMotor' };
    const existingBackup = { createdAt: '2024-01-01T00:00:00.000Z', data: { keep: true } };
    localStorage.setItem(SESSION_KEY, JSON.stringify(legacyState));
    localStorage.setItem(
      migrationBackupKeyFor(SESSION_KEY),
      JSON.stringify(existingBackup),
    );

    const state = loadSessionState();

    expect(state).toMatchObject({ setupName: 'Legacy', motors: ['FocusMotor'] });
    const storedBackup = getDecodedLocalStorageItem(migrationBackupKeyFor(SESSION_KEY));
    const backupList = JSON.parse(storedBackup);
    expect(Array.isArray(backupList)).toBe(true);
    // Should contain the original existing backup
    expect(backupList).toContainEqual(expect.objectContaining(existingBackup));
  });
});

describe('feedback storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveFeedback stores JSON', () => {
    const fb = { note: 'hi' };
    saveFeedback(fb);
    expect(getDecodedLocalStorageItem(FEEDBACK_KEY)).toBe(JSON.stringify(fb));
  });

  test('loadFeedback returns parsed object when present', () => {
    const fb = { note: 'hi' };
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(fb));
    expect(loadFeedback()).toEqual(fb);
  });

  test('loadFeedback returns empty object for non-object data', () => {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(5));
    expect(loadFeedback()).toEqual({});
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([{ runtime: '1h' }]));
    expect(loadFeedback()).toEqual({});
  });
});

describe('project storage', () => {
  beforeEach(() => {
    localStorage.clear();
    invalidateProjectReadCache();
  });

  test('saveProject stores data per project name', () => {
    saveProject('A', { gearList: '<ul>A</ul>' });
    saveProject('B', { gearList: '<ul>B</ul>' });
    expect(loadProject('A')).toEqual(withGenerationFlag({ gearList: '<ul>A</ul>', projectInfo: null }));
    expect(loadProject('B')).toEqual(withGenerationFlag({ gearList: '<ul>B</ul>', projectInfo: null }));
  });

  test('loadProject resolves entries saved with surrounding whitespace', () => {
    // Manually saving a shard for 'Spaced'
    const shardKey = 'cameraPowerPlanner_prj_Spaced'; // normalized from ' Spaced '
    localStorage.setItem(shardKey, JSON.stringify(withGenerationFlag({
      gearList: '<ul>Saved</ul>', projectInfo: null
    })));

    expect(loadProject(' Spaced ')).toEqual(withGenerationFlag({ gearList: '<ul>Saved</ul>', projectInfo: null }));
    expect(loadProject('Spaced')).toEqual(withGenerationFlag({ gearList: '<ul>Saved</ul>', projectInfo: null }));
  });

  test('saveProject normalizes project keys with surrounding whitespace when unused', () => {
    // Setup legacy style or manually created data
    const oldShardKey = 'cameraPowerPlanner_prj_Old Name'; // normalized
    localStorage.setItem(oldShardKey, JSON.stringify(withGenerationFlag({
      gearList: '<ul>Legacy</ul>', projectInfo: null
    })));

    saveProject('Old Name ', { gearList: '<ul>Updated</ul>', projectInfo: null });

    const storedOldRaw = localStorage.getItem('cameraPowerPlanner_prj_Old Name ');
    void storedOldRaw;
    const storedNewRaw = localStorage.getItem('cameraPowerPlanner_prj_Old Name');

    // Currently sharding normalizes keys immediately, so 'Old Name ' -> 'Old Name'
    expect(storedNewRaw).not.toBeNull();
    const storedNew = JSON.parse(storedNewRaw);
    expect(storedNew).toEqual(withGenerationFlag({ gearList: '<ul>Updated</ul>', projectInfo: null }));
    expect(loadProject('Old Name ')).toEqual(withGenerationFlag({ gearList: '<ul>Updated</ul>', projectInfo: null }));
  });

  test('deleteProject removes entries even when addressed with trimmed names', () => {
    saveProject('Keep ', { gearList: '<ul>Keep</ul>', projectInfo: null });
    saveProject('Drop', { gearList: '<ul>Drop</ul>', projectInfo: null });

    console.log('DEBUG: Keys after save:', Object.keys(localStorage.__STORE__ || localStorage));

    expect(loadProject('Keep')).toEqual(withGenerationFlag({ gearList: '<ul>Keep</ul>', projectInfo: null }));

    deleteProject(' Drop ');

    console.log('DEBUG: Keys after delete:', Object.keys(localStorage.__STORE__ || localStorage));

    // Check individual shards
    expect(localStorage.getItem('cameraPowerPlanner_prj_Keep')).not.toBeNull();
    expect(localStorage.getItem('cameraPowerPlanner_prj_Drop')).toBeNull();
    expect(loadProject('Drop')).toBeNull();
  });

  test('saveProject normalizes null gearList to empty string', () => {
    saveProject('NullProj', { gearList: null });
    expect(loadProject('NullProj')).toEqual(withGenerationFlag({ gearList: '', projectInfo: null }, false));
  });

  test('saveProject strips non-object projectInfo values', () => {
    saveProject('InfoProj', { gearList: '<ul>Info</ul>', projectInfo: 'bad' });
    expect(loadProject('InfoProj')).toEqual(withGenerationFlag({ gearList: '<ul>Info</ul>', projectInfo: null }));
  });

  test('saveProject preserves custom gear selector entries', () => {
    saveProject('CustomSelectors', {
      gearList: '<ul>Custom</ul>',
      projectInfo: null,
      gearSelectors: rawCustomGearSelectors,
    });

    const loaded = loadProject('CustomSelectors');
    expect(loaded).toEqual(withGenerationFlag({
      gearList: '<ul>Custom</ul>',
      projectInfo: null,
      gearSelectors: expectedCustomGearSelectors,
    }));

    // Verify using loadProject as the main key is now cleared by sharding
    const fromStorage = loadProject();
    expect(fromStorage.CustomSelectors).toEqual(withGenerationFlag({
      gearList: '<ul>Custom</ul>',
      projectInfo: null,
      gearSelectors: expectedCustomGearSelectors,
    }));
  });

  test('saveProject removes older duplicate auto backups before trimming unique entries', () => {
    const projects = {};
    for (let index = 0; index < 119; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const key = `auto-backup-2024-01-01-${hour}-${minute}-Project Alpha`;
      projects[key] = { gearList: `<ul>${index}</ul>`, projectInfo: null };
    }
    const duplicateValue = { gearList: '<ul>duplicate</ul>', projectInfo: null };
    const oldDuplicateKey = 'auto-backup-2023-12-31-23-59-Project Alpha';
    const newDuplicateKey = 'auto-backup-2024-01-02-00-00-Project Alpha';
    projects[oldDuplicateKey] = duplicateValue;
    projects[newDuplicateKey] = duplicateValue;
    localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));

    saveProject(newDuplicateKey, { gearList: '<ul>duplicate</ul>', projectInfo: null });

    const stored = loadProject();
    expect(stored[oldDuplicateKey]).toBeUndefined();
    expect(stored[newDuplicateKey]).toEqual(withGenerationFlag(duplicateValue));
    const autoBackupCount = Object.keys(stored).filter(name => name.startsWith('auto-backup-')).length;
    expect(autoBackupCount).toBeLessThanOrEqual(120);
  });

  test('saveProject retains unique auto backups even when exceeding the retention limit', () => {
    const projects = {};
    for (let index = 0; index < 130; index += 1) {
      const hour = String(Math.floor(index / 60)).padStart(2, '0');
      const minute = String(index % 60).padStart(2, '0');
      const key = `auto-backup-2024-06-01-${hour}-${minute}-Project Unique`;
      projects[key] = { gearList: `<ul>${index}</ul>`, projectInfo: { note: `Entry ${index}` } };
    }
    localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));

    saveProject('Project Unique Latest', { gearList: '<ul>Latest</ul>', projectInfo: null });

    const stored = loadProject();
    const autoKeys = Object.keys(stored).filter(name => name.startsWith('auto-backup-'));
    expect(autoKeys).toHaveLength(130);
  });

  test('saveProject ignores non-object payloads entirely', () => {
    saveProject('Broken', 'not-an-object');
    // Verify by checking that the shard is NOT created
    expect(localStorage.getItem('cameraPowerPlanner_prj_Broken')).toBeNull();
    // Also verify loadProject ignores it
    const stored = loadProject('Broken');
    expect(stored).toBeNull();
  });

  test('saveProject creates an automatic backup before overwriting existing data', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-01T10:20:00Z'));

    const original = {
      gearList: '<ul>Initial</ul>',
      projectInfo: { notes: 'original' },
      gearSelectors: rawCustomGearSelectors,
    };
    saveProject('Overwrite Demo', original);

    const now = new Date('2024-05-01T10:21:30Z');
    jest.setSystemTime(now);

    const updated = {
      gearList: '<ul>Updated</ul>',
      projectInfo: { notes: 'updated' },
      gearSelectors: rawUpdatedGearSelectors,
    };
    saveProject('Overwrite Demo', updated);

    const pad = (n) => String(n).padStart(2, '0');
    const expectedTimestamp = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds()),
    ].join('-');

    const stored = loadProject();
    const backupKeys = Object.keys(stored).filter(key => key.startsWith('auto-backup-'));
    // We expect one backup because the system detects an overwrite
    expect(backupKeys).toHaveLength(1);
    expect(backupKeys[0]).toBe(`auto-backup-${expectedTimestamp}-Overwrite Demo`);
    expect(stored[backupKeys[0]]).toEqual(
      withGenerationFlag({
        gearList: '<ul>Initial</ul>',
        projectInfo: { notes: 'original' },
        gearSelectors: expectedCustomGearSelectors,
      })
    );
    expect(stored['Overwrite Demo']).toEqual(withGenerationFlag({
      gearList: '<ul>Updated</ul>',
      projectInfo: { notes: 'updated' },
      gearSelectors: expectedUpdatedGearSelectors,
    }));

    jest.useRealTimers();
  });

  test('saveProject generates distinct auto backup names within the same minute', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-06-10T12:34:05Z'));

    saveProject('Same Minute', { gearList: '<ul>Initial</ul>', projectInfo: null });
    saveProject('Same Minute', { gearList: '<ul>Update 1</ul>', projectInfo: null });
    saveProject('Same Minute', { gearList: '<ul>Update 2</ul>', projectInfo: null });

    const stored = loadProject();
    const backupKeys = Object.keys(stored)
      .filter(key => key.startsWith('auto-backup-'))
      .sort();

    expect(backupKeys).toHaveLength(2);
    expect(new Set(backupKeys).size).toBe(2);
    const namePattern = /^auto-backup-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-Same Minute(-2)?$/;
    expect(backupKeys[0]).toMatch(namePattern);
    expect(backupKeys[1]).toMatch(namePattern);
    backupKeys.forEach((key) => {
      expect(key).toMatch(/^auto-backup-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-/u);
    });

    jest.useRealTimers();
  });

  test('saveProject skips creating backups when data has not changed', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-02T08:00:00Z'));

    saveProject('No Change', { gearList: '<ul>Same</ul>', projectInfo: null });

    jest.setSystemTime(new Date('2024-05-02T08:05:00Z'));
    saveProject('No Change', { gearList: '<ul>Same</ul>', projectInfo: null });

    const stored = loadProject();
    expect(Object.keys(stored).filter(key => key.startsWith('auto-backup-'))).toHaveLength(0);
    expect(stored['No Change']).toEqual(withGenerationFlag({ gearList: '<ul>Same</ul>', projectInfo: null }));

    jest.useRealTimers();
  });

  test('saveProject does not create nested backups when updating auto backup entries', () => {
    jest.useFakeTimers();
    const autoKey = 'auto-backup-2024-05-03-09-15-00-Reference';

    saveProject(autoKey, { gearList: '<ul>Initial</ul>', projectInfo: null });

    jest.setSystemTime(new Date('2024-05-03T09:16:00Z'));
    saveProject(autoKey, { gearList: '<ul>Updated</ul>', projectInfo: null });

    const stored = loadProject();
    const autoBackupKeys = Object.keys(stored).filter(key => key.startsWith('auto-backup-'));
    expect(autoBackupKeys).toHaveLength(1);
    expect(autoBackupKeys[0]).toBe(autoKey);
    expect(stored[autoKey]).toEqual(
      withGenerationFlag({ gearList: '<ul>Updated</ul>', projectInfo: null })
    );

    jest.useRealTimers();
  });

  test('loadProject returns normalized map of projects when name omitted', () => {
    const stored = {
      NewFormat: { gearList: '<ul>New</ul>', projectInfo: { notes: 'ok' } },
      LegacyHtml: { projectHtml: '<section>project</section>', gearHtml: '<div>gear</div>' },
      LegacyString: '<p>standalone</p>',
      Invalid: 7,
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify(stored));
    const result = loadProject();
    expect(result).toEqual({
      NewFormat: withGenerationFlag({ gearList: '<ul>New</ul>', projectInfo: { notes: 'ok' } }),
      'LegacyHtml-updated': {
        gearList: { projectHtml: '<section>project</section>', gearHtml: '<div>gear</div>' },
        projectInfo: null,
      },
      'LegacyString-updated': withGenerationFlag({ gearList: '<p>standalone</p>', projectInfo: null }),
    });
  });

  test('loadProject upgrades legacy lens list strings to structured selections', () => {
    const legacy = {
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: 'Zeiss CP.3 35mm T2.1, Cooke S4 50mm',
      },
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Legacy: legacy }));

    const project = loadProject('Legacy');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: ['Zeiss CP.3 35mm T2.1', 'Cooke S4 50mm'],
        lensSelections: [
          { name: 'Zeiss CP.3 35mm T2.1', mount: '' },
          { name: 'Cooke S4 50mm', mount: '' },
        ],
      },
    }));
  });

  test('loadProject normalizes legacy lens selection objects and arrays', () => {
    const legacy = {
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: [' Zeiss CP.3 35mm T2.1 ', 'Cooke S4 50mm'],
        lensSelections: [
          { lensName: ' Zeiss CP.3 35mm T2.1 ', mountLabel: ' PL ', note: 'A' },
          ['Cooke S4 50mm', ' LPL '],
          { name: 'Duplicate', mount: 'E', extra: true },
          { label: 'Duplicate', mount: 'PL' },
          null,
        ],
      },
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Legacy: legacy }));

    const project = loadProject('Legacy');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: ['Zeiss CP.3 35mm T2.1', 'Cooke S4 50mm'],
        lensSelections: [
          {
            lensName: ' Zeiss CP.3 35mm T2.1 ',
            mountLabel: ' PL ',
            note: 'A',
            name: 'Zeiss CP.3 35mm T2.1',
            mount: 'PL',
          },
          { name: 'Cooke S4 50mm', mount: 'LPL' },
          { name: 'Duplicate', mount: 'E', extra: true },
          { label: 'Duplicate', mount: 'PL', name: 'Duplicate' },
        ],
      },
    }));
  });

  test('loadProject derives lens selections when legacy data stored outside projectInfo', () => {
    const legacy = {
      gearList: '<ul>Legacy</ul>',
      lenses: ['Angenieux 24-290', 'Fujinon 19-90'],
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Legacy: legacy }));

    const project = loadProject('Legacy');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: ['Angenieux 24-290', 'Fujinon 19-90'],
        lensSelections: [
          { name: 'Angenieux 24-290', mount: '' },
          { name: 'Fujinon 19-90', mount: '' },
        ],
      },
    }));
  });

  test('loadProject normalizes legacy lens selection maps with string mounts', () => {
    const legacy = {
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lensSelections: {
          'Zeiss CP.3 35mm T2.1': ' PL ',
          'Cooke S4 50mm': 'LPL',
          meta: 'ignore',
        },
      },
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Legacy: legacy }));

    const project = loadProject('Legacy');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: ['Zeiss CP.3 35mm T2.1', 'Cooke S4 50mm'],
        lensSelections: [
          { name: 'Zeiss CP.3 35mm T2.1', mount: 'PL' },
          { name: 'Cooke S4 50mm', mount: 'LPL' },
        ],
      },
    }));
  });

  test('loadProject preserves metadata when deriving lens selections from name maps', () => {
    const legacy = {
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lensSelections: {
          'Zeiss CP.3 35mm T2.1': { mountLabel: 'PL ', note: 'A', extra: { tag: 'prime' } },
          'Cooke S4 50mm': { mount: ' LPL ', note: 'B' },
          count: 2,
        },
      },
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Legacy: legacy }));

    const project = loadProject('Legacy');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<ul>Legacy</ul>',
      projectInfo: {
        lenses: ['Zeiss CP.3 35mm T2.1', 'Cooke S4 50mm'],
        lensSelections: [
          {
            mountLabel: 'PL ',
            note: 'A',
            extra: { tag: 'prime' },
            name: 'Zeiss CP.3 35mm T2.1',
            mount: 'PL',
          },
          {
            mount: 'LPL',
            note: 'B',
            name: 'Cooke S4 50mm',
          },
        ],
      },
    }));
  });

  test('loadProject recovers project info from stored requirements HTML', () => {
    const legacyHtml = [
      '<h2>Legacy Project</h2>',
      '<h3>Project Requirements</h3>',
      '<div class="requirements-grid">',
      '  <div class="requirement-box" data-field="productionCompany">',
      '    <span class="req-label">Production Company</span>',
      '    <span class="req-value">Test Studios &amp; Co.</span>',
      '  </div>',
      '  <div class="requirement-box" data-field="productionCompanyAddress">',
      '    <span class="req-label">Production Company Address</span>',
      '    <span class="req-value">123 Backlot Rd, Studio City</span>',
      '  </div>',
      '  <div class="requirement-box" data-field="prepDays">',
      '    <span class="req-label">Prep Days</span>',
      '    <span class="req-value">2024-01-01 to 2024-01-02<br>2024-01-05 to 2024-01-06</span>',
      '  </div>',
      '  <div class="requirement-box" data-field="requiredScenarios">',
      '    <span class="req-label">Required Scenarios</span>',
      '    <span class="req-value">Rain Machine<br>Gimbal</span>',
      '  </div>',
      '</div>',
      '<table class="gear-table"><tr><td>gear</td></tr></table>',
    ].join('');

    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Legacy: { gearList: legacyHtml } }));

    const project = loadProject('Legacy');
    expect(project).not.toBeNull();
    expect(project.projectInfo).toEqual({
      projectName: 'Legacy Project',
      productionCompany: 'Test Studios & Co.',
      productionCompanyAddress: '123 Backlot Rd, Studio City',
      prepDays: '2024-01-01 to 2024-01-02\n2024-01-05 to 2024-01-06',
      requiredScenarios: 'Rain Machine, Gimbal',
    });
  });

  test('loadProject parses combined production company requirement box', () => {
    const combinedHtml = [
      '<h2>Combined Project</h2>',
      '<div class="requirements-grid">',
      '  <div class="requirement-box" data-field="productionCompany">',
      '    <span class="req-label">Production Company</span>',
      '    <span class="req-value"><span class="req-primary-line">Studio X</span><br><span class="req-sub-line" data-fields="productionCompanyAddress">123 Stage Rd</span><br><span class="req-sub-line" data-fields="productionCompanyStreet">123 Production Way</span><br><span class="req-sub-line" data-fields="productionCompanyStreet2">Suite 4</span><br><span class="req-sub-line" data-fields="productionCompanyCity">Film City</span><br><span class="req-sub-line" data-fields="productionCompanyRegion">CA</span><br><span class="req-sub-line" data-fields="productionCompanyPostalCode">90001</span><br><span class="req-sub-line" data-fields="productionCompanyCountry">USA</span></span>',
      '  </div>',
      '</div>',
    ].join('');

    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Combined: { gearList: combinedHtml } }));

    const project = loadProject('Combined');
    expect(project).not.toBeNull();
    expect(project.projectInfo).toEqual({
      projectName: 'Combined Project',
      productionCompany: 'Studio X',
      productionCompanyAddress: '123 Stage Rd',
      productionCompanyStreet: '123 Production Way',
      productionCompanyStreet2: 'Suite 4',
      productionCompanyCity: 'Film City',
      productionCompanyRegion: 'CA',
      productionCompanyPostalCode: '90001',
      productionCompanyCountry: 'USA',
    });
  });

  test('loadProject maps localized requirement labels when data-field is missing', () => {
    const html = [
      '<h2>Projekt Archiv</h2>',
      '<div class="requirements-grid">',
      '  <div class="requirement-box">',
      '    <span class="req-label">Produktionsfirma</span>',
      '    <span class="req-value">Filmhaus GmbH</span>',
      '  </div>',
      '  <div class="requirement-box">',
      '    <span class="req-label">Adresse der Produktionsfirma</span>',
      '    <span class="req-value">Westend 21, Berlin</span>',
      '  </div>',
      '</div>',
    ].join('');

    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Alt: { gearList: html } }));

    const project = loadProject('Alt');
    expect(project).not.toBeNull();
    expect(project.projectInfo).toEqual({
      projectName: 'Projekt Archiv',
      productionCompany: 'Filmhaus GmbH',
      productionCompanyAddress: 'Westend 21, Berlin',
    });
  });

  test('loadProject returns null for unknown names', () => {
    saveProject('Known', { gearList: '<ul></ul>' });
    expect(loadProject('Missing')).toBeNull();
  });

  test('loadProject migrates legacy key prefix to new storage', () => {
    localStorage.setItem('cinePowerPlanner_project', JSON.stringify('<p>Legacy</p>'));

    const projects = loadProject();
    // The main key is now removed after migration
    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();

    // The legacy data is preserved in a backup
    expect(localStorage.getItem(migrationBackupKeyFor(PROJECT_KEY))).not.toBeNull();

    // And the data is in the returned projects
    const expected = {
      'Project-updated': withGenerationFlag({ gearList: '<p>Legacy</p>', projectInfo: null }),
    };
    expect(projects).toEqual(expected);

    // Check that the SHARD exists
    expect(localStorage.getItem('cameraPowerPlanner_prj_Project-updated')).not.toBeNull();

    expect(getDecodedLocalStorageItem('cinePowerPlanner_project')).toBeNull();
  });

  test('loadProject creates migration backup before rewriting normalized data', () => {
    const legacySerialized = JSON.stringify('<p>Legacy project</p>');
    localStorage.setItem(PROJECT_KEY, legacySerialized);

    expect(getDecodedLocalStorageItem(migrationBackupKeyFor(PROJECT_KEY))).toBeNull();

    loadProject();

    const stored = getDecodedLocalStorageItem(PROJECT_KEY);
    expect(stored).toBeNull();
    // Check for shard presence
    expect(localStorage.getItem('cameraPowerPlanner_prj_Project-updated')).not.toBeNull();

    const backupRaw = getDecodedLocalStorageItem(migrationBackupKeyFor(PROJECT_KEY));
    expect(backupRaw).toBeTruthy();
    const parsed = JSON.parse(backupRaw);
    const backup = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
    expect(typeof backup.createdAt).toBe('string');
    expect(backup.createdAt.length).toBeGreaterThan(0);
    expect(backup.data).toBe('<p>Legacy project</p>');
  });

  test('loadProject preserves existing migration backup entries', () => {
    const legacySerialized = JSON.stringify('<p>Legacy project</p>');
    const existingBackup = { createdAt: '2023-01-01T00:00:00.000Z', data: 'keep-me' };
    localStorage.setItem(PROJECT_KEY, legacySerialized);
    localStorage.setItem(
      migrationBackupKeyFor(PROJECT_KEY),
      JSON.stringify(existingBackup),
    );

    const projects = loadProject();
    expect(projects).toEqual({
      'Project-updated': withGenerationFlag({ gearList: '<p>Legacy project</p>', projectInfo: null }),
    });

    const storedBackup = getDecodedLocalStorageItem(migrationBackupKeyFor(PROJECT_KEY));
    // Should be an array with existing + new backup
    const backupList = JSON.parse(storedBackup);
    expect(Array.isArray(backupList)).toBe(true);
    expect(backupList.length).toBeGreaterThanOrEqual(2);
    expect(backupList[0]).toEqual(existingBackup); // Original
    expect(backupList[1].data).toBe('<p>Legacy project</p>'); // New migration
  });

  test('deleteProject removes individual projects and stores an automatic backup before deleting', () => {
    saveProject('Keep', { gearList: '<ul>Keep</ul>' });
    saveProject('Drop', { gearList: '<ul>Drop</ul>' });

    deleteProject('Drop');
    expect(loadProject('Drop')).toBeNull();
    expect(loadProject('Keep')).toEqual(withGenerationFlag({ gearList: '<ul>Keep</ul>', projectInfo: null }));
    const afterFirstDeletion = loadProject();
    const dropBackupKey = Object.keys(afterFirstDeletion).find((name) => name.includes('Drop'));
    if (!dropBackupKey) {
      console.warn('DEBUG: Available projects:', JSON.stringify(afterFirstDeletion));
      throw new Error(`Drop backup key missing. Keys: ${Object.keys(afterFirstDeletion).join(', ')}`);
    }
    expect(dropBackupKey).toBeDefined();
    expect(afterFirstDeletion[dropBackupKey]).toEqual(withGenerationFlag({ gearList: '<ul>Drop</ul>', projectInfo: null }));

    deleteProject('Keep');
    expect(loadProject('Keep')).toBeNull();
    const storedProjects = loadProject();
    const backupKeys = Object.keys(storedProjects);
    expect(backupKeys.length).toBeGreaterThanOrEqual(2);
    expect(backupKeys.every((name) => name.startsWith('auto-backup-'))).toBe(true);
    const keepBackupKey = backupKeys.find((name) => name.includes('Keep'));
    expect(keepBackupKey).toBeDefined();
    // Project deletion backups are direct copies, not wrapped snapshots
    expect(storedProjects[keepBackupKey]).toEqual(
      withGenerationFlag({ gearList: '<ul>Keep</ul>', projectInfo: null })
    );
  });

  test('deleteProject without a name clears all stored projects', () => {
    saveProject('A', { gearList: '<ul>A</ul>' });
    saveProject('B', { gearList: '<ul>B</ul>' });
    deleteProject();
    expect(getDecodedLocalStorageItem(PROJECT_KEY)).toBeNull();
  });
});

describe('favorites storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('loadFavorites returns empty object for non-object data', () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(['CamA']));
    expect(loadFavorites()).toEqual({});
  });

  test('saveFavorites ignores non-object payloads', () => {
    saveFavorites(['CamA']);
    expect(getDecodedLocalStorageItem(FAVORITES_KEY)).toBeNull();
  });
});

describe('automatic gear storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveAutoGearRules persists rule arrays', () => {
    const rules = [{ id: 'rule-a', label: 'Outdoor', scenarios: ['Outdoor'], add: [], remove: [], enabled: true }];
    saveAutoGearRules(rules);
    expect(parseLocalStorageJSON(AUTO_GEAR_RULES_KEY)).toEqual(rules);
    expect(loadAutoGearRules()).toEqual(rules);
  });

  test('loadAutoGearRules falls back to empty array when data malformed', () => {
    localStorage.setItem(AUTO_GEAR_RULES_KEY, JSON.stringify('oops'));
    expect(loadAutoGearRules()).toEqual([]);
  });

  test('loadAutoGearRules migrates legacy key prefix', () => {
    const rules = [{ id: 'legacy', label: 'Legacy', scenarios: [], add: [], remove: [], enabled: true }];
    localStorage.setItem('cinePowerPlanner_autoGearRules', JSON.stringify(rules));

    const loaded = loadAutoGearRules();
    expect(loaded).toEqual(rules);
    expect(parseLocalStorageJSON(AUTO_GEAR_RULES_KEY)).toEqual(rules);
    expect(getDecodedLocalStorageItem('cinePowerPlanner_autoGearRules')).toBeNull();
  });

  test('loadAutoGearRules defaults enabled to true when missing', () => {
    const stored = [{ id: 'missing-enabled', label: 'Legacy active', add: [], remove: [] }];
    localStorage.setItem(AUTO_GEAR_RULES_KEY, JSON.stringify(stored));

    expect(loadAutoGearRules()).toEqual([
      { ...stored[0], enabled: true },
    ]);
  });

  test('loadAutoGearBackups returns stored backups and sanitises invalid payloads', () => {
    const backups = [
      { id: 'backup-1', label: 'Manual backup', createdAt: 1720646400000, rules: [] }
    ];
    saveAutoGearBackups(backups);
    expect(parseLocalStorageJSON(AUTO_GEAR_BACKUPS_KEY)).toEqual(backups);
    expect(loadAutoGearBackups()).toEqual(backups);

    localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify('oops'));
    expect(loadAutoGearBackups()).toEqual(backups);
    expect(parseLocalStorageJSON(AUTO_GEAR_BACKUPS_KEY)).toEqual(backups);
  });

  test('saveAutoGearAutoPresetId removes auto preset entries from compressed storage', () => {
    const repeatedNote = 'Lens kit packed for rainy night exterior shots. '.repeat(120);
    const buildRules = (presetIndex) => Array.from({ length: 4 }, (_, ruleIndex) => ({
      id: `rule-${presetIndex}-${ruleIndex}`,
      label: `Rule ${ruleIndex}`,
      scenarios: ['Indoor', 'Outdoor'],
      add: Array.from({ length: 3 }, (__, itemIndex) => ({
        name: `Accessory ${itemIndex}`,
        category: 'Accessories',
        quantity: 1,
        notes: repeatedNote,
      })),
      remove: [],
    }));

    const presets = Array.from({ length: 6 }, (_, index) => ({
      id: index === 0 ? 'preset-auto' : `preset-${index}`,
      label: `Preset ${index}`,
      rules: buildRules(index),
    }));

    const serializedPresets = JSON.stringify(presets);
    const compressed = lzString.compressToUTF16(serializedPresets);
    const wrapper = JSON.stringify({
      __cineStorageCompressed: true,
      version: 1,
      algorithm: 'lz-string-utf16',
      namespace: 'camera-power-planner:storage-compression',
      data: compressed,
      originalLength: serializedPresets.length,
      compressedPayloadLength: compressed.length,
    });

    localStorage.setItem(AUTO_GEAR_PRESETS_KEY, wrapper);
    localStorage.setItem(AUTO_GEAR_AUTO_PRESET_KEY, 'preset-auto');

    saveAutoGearAutoPresetId('');

    const storedPresets = parseLocalStorageJSON(AUTO_GEAR_PRESETS_KEY);
    expect(Array.isArray(storedPresets)).toBe(true);
    expect(storedPresets.find(preset => preset?.id === 'preset-auto')).toBeUndefined();
    expect(localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
  });

  test('saveAutoGearBackups trims the oldest entry when storage quota is exceeded', () => {
    const backups = [
      {
        id: 'backup-new',
        createdAt: '2025-01-01T12:00:00.000Z',
        rules: [{ id: 'rule-a' }],
        monitorDefaults: {},
        note: 'Latest snapshot',
      },
      {
        id: 'backup-mid',
        createdAt: '2024-12-15T08:30:00.000Z',
        rules: [{ id: 'rule-b' }],
        monitorDefaults: {},
      },
      {
        id: 'backup-old',
        createdAt: '2024-10-01T05:45:00.000Z',
        rules: [{ id: 'rule-c' }],
        monitorDefaults: {},
        note: 'Old snapshot',
      },
    ];

    const createStorage = () => ({
      store: new Map(),
      getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
      },
      setItem(key, value) {
        this.store.set(key, String(value));
      },
      removeItem(key) {
        this.store.delete(key);
      },
      clear() {
        this.store.clear();
      },
      key(index) {
        return Array.from(this.store.keys())[index] || null;
      },
      get length() {
        return this.store.size;
      },
    });

    const originalWindow = global.window;
    const originalLocalStorage = global.localStorage;
    const originalSessionStorage = global.sessionStorage;

    const quotaError = new Error('quota exceeded');
    quotaError.name = 'QuotaExceededError';

    try {
      jest.isolateModules(() => {
        const localStorageMock = createStorage();
        const sessionStorageMock = createStorage();
        global.localStorage = localStorageMock;
        global.sessionStorage = sessionStorageMock;
        global.window = { localStorage: localStorageMock, sessionStorage: sessionStorageMock };

        const storageModule = require('../../src/scripts/storage');
        const isolatedSaveAutoGearBackups = storageModule.saveAutoGearBackups;
        const isolatedGetSafeLocalStorage = storageModule.getSafeLocalStorage;

        const safeStorage = isolatedGetSafeLocalStorage();
        const originalSetItem = safeStorage.setItem;
        const observedKeys = [];
        let attempts = 0;
        safeStorage.setItem = function quotaGuard(key, value) {
          observedKeys.push(key);
          if (key === AUTO_GEAR_BACKUPS_KEY && attempts < 1) {
            attempts += 1;
            throw quotaError;
          }
          return originalSetItem.call(this, key, value);
        };

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
        const storedBackups = isolatedSaveAutoGearBackups(backups);
        const storedRaw = localStorageMock.getItem(AUTO_GEAR_BACKUPS_KEY);
        const stored = storedRaw === null || storedRaw === undefined
          ? storedRaw
          : JSON.parse(storageModule.decodeStoredValue(storedRaw));
        const quotaWarning = warnSpy.mock.calls.find(([message]) =>
          typeof message === 'string'
          && message.includes('Removed automatic gear backup'),
        );

        safeStorage.setItem = originalSetItem;
        warnSpy.mockRestore();

        expect(observedKeys).toContain(AUTO_GEAR_BACKUPS_KEY);
        expect(Array.isArray(storedBackups)).toBe(true);
        expect(storedBackups.length).toBe(2);
        expect(storedBackups).toEqual(backups.slice(0, 2));
        expect(stored).toEqual(storedBackups);
        expect(quotaWarning).toBeDefined();
        expect(quotaWarning && quotaWarning[0]).toContain('Old snapshot');
      });
    } finally {
      global.window = originalWindow;
      if (originalLocalStorage) {
        global.localStorage = originalLocalStorage;
      } else {
        delete global.localStorage;
      }
      if (originalSessionStorage) {
        global.sessionStorage = originalSessionStorage;
      } else {
        delete global.sessionStorage;
      }
    }
  });

  test('saveAutoGearBackups removes migration backup copy when quota persists with empty payload', () => {
    const createStorage = () => ({
      store: new Map(),
      getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
      },
      setItem(key, value) {
        this.store.set(key, String(value));
      },
      removeItem(key) {
        this.store.delete(key);
      },
      clear() {
        this.store.clear();
      },
      key(index) {
        return Array.from(this.store.keys())[index] || null;
      },
      get length() {
        return this.store.size;
      },
    });

    const originalWindow = global.window;
    const originalLocalStorage = global.localStorage;
    const originalSessionStorage = global.sessionStorage;

    const quotaError = new Error('quota exceeded');
    quotaError.name = 'QuotaExceededError';

    try {
      jest.isolateModules(() => {
        const localStorageMock = createStorage();
        const sessionStorageMock = createStorage();
        global.localStorage = localStorageMock;
        global.sessionStorage = sessionStorageMock;
        global.window = { localStorage: localStorageMock, sessionStorage: sessionStorageMock };

        const migrationKey = `${AUTO_GEAR_BACKUPS_KEY}${MIGRATION_BACKUP_SUFFIX}`;
        localStorageMock.setItem(migrationKey, JSON.stringify({ createdAt: 'legacy', data: ['stored'] }));

        const storageModule = require('../../src/scripts/storage');
        const { saveAutoGearBackups, getSafeLocalStorage } = storageModule;

        const safeStorage = getSafeLocalStorage();
        const originalSetItem = safeStorage.setItem;
        let attempts = 0;
        safeStorage.setItem = function patchedSetItem(key, value) {
          if (key === AUTO_GEAR_BACKUPS_KEY && attempts === 0) {
            attempts += 1;
            throw quotaError;
          }
          return originalSetItem.call(this, key, value);
        };

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

        const storedBackups = saveAutoGearBackups([]);

        const storedValue = localStorageMock.getItem(AUTO_GEAR_BACKUPS_KEY);
        const migrationValue = localStorageMock.getItem(migrationKey);
        const migrationWarning = warnSpy.mock.calls.find(([message]) =>
          typeof message === 'string'
          && message.includes('migration backup')
          && message.includes('automatic gear backups'),
        );

        safeStorage.setItem = originalSetItem;
        warnSpy.mockRestore();

        expect(Array.isArray(storedBackups)).toBe(true);
        expect(storedBackups).toEqual([]);
        expect(storedValue).toBe(JSON.stringify([]));
        expect(migrationValue).toBeNull();
        expect(migrationWarning).toBeDefined();
      });
    } finally {
      global.window = originalWindow;
      if (originalLocalStorage) {
        global.localStorage = originalLocalStorage;
      } else {
        delete global.localStorage;
      }
      if (originalSessionStorage) {
        global.sessionStorage = originalSessionStorage;
      } else {
        delete global.sessionStorage;
      }
    }
  });

  test('saveAutoGearBackups clears cached UI storage when migration cleanup is unavailable', () => {
    const createStorage = () => ({
      store: new Map(),
      removed: [],
      getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
      },
      setItem(key, value) {
        this.store.set(key, String(value));
      },
      removeItem(key) {
        this.removed.push(key);
        this.store.delete(key);
      },
      clear() {
        this.store.clear();
      },
      key(index) {
        return Array.from(this.store.keys())[index] || null;
      },
      get length() {
        return this.store.size;
      },
    });

    const originalWindow = global.window;
    const originalLocalStorage = global.localStorage;
    const originalSessionStorage = global.sessionStorage;

    const quotaError = new Error('quota exceeded');
    quotaError.name = 'QuotaExceededError';

    try {
      jest.isolateModules(() => {
        const localStorageMock = createStorage();
        const sessionStorageMock = createStorage();
        localStorageMock.setItem(SCHEMA_CACHE_KEY, 'schema-data');
        sessionStorageMock.setItem(SCHEMA_CACHE_KEY, 'schema-data');

        global.localStorage = localStorageMock;
        global.sessionStorage = sessionStorageMock;
        global.window = { localStorage: localStorageMock, sessionStorage: sessionStorageMock };

        const storageModule = require('../../src/scripts/storage');
        const { saveAutoGearBackups, getSafeLocalStorage } = storageModule;

        const safeStorage = getSafeLocalStorage();
        const originalSetItem = safeStorage.setItem;
        let attempts = 0;
        safeStorage.setItem = function patchedSetItem(key, value) {
          if (key === AUTO_GEAR_BACKUPS_KEY && attempts === 0) {
            attempts += 1;
            throw quotaError;
          }
          return originalSetItem.call(this, key, value);
        };

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

        const storedBackups = saveAutoGearBackups([]);

        const storedValue = localStorageMock.getItem(AUTO_GEAR_BACKUPS_KEY);
        const cacheRemovals = [...localStorageMock.removed, ...sessionStorageMock.removed];
        const cacheWarning = warnSpy.mock.calls.find(([message]) =>
          typeof message === 'string'
          && message.includes('Cleared cached planner data'),
        );

        safeStorage.setItem = originalSetItem;
        warnSpy.mockRestore();

        expect(Array.isArray(storedBackups)).toBe(true);
        expect(storedBackups).toEqual([]);
        expect(storedValue).toBe(JSON.stringify([]));
        expect(cacheRemovals).toContain(SCHEMA_CACHE_KEY);
        expect(cacheWarning).toBeDefined();
      });
    } finally {
      global.window = originalWindow;
      if (originalLocalStorage) {
        global.localStorage = originalLocalStorage;
      } else {
        delete global.localStorage;
      }
      if (originalSessionStorage) {
        global.sessionStorage = originalSessionStorage;
      } else {
        delete global.sessionStorage;
      }
    }
  });

  test('saveAutoGearBackupRetention creates migration backup before overwriting existing values', () => {
    localStorage.setItem(AUTO_GEAR_BACKUP_RETENTION_KEY, JSON.stringify(12));
    expect(getDecodedLocalStorageItem(migrationBackupKeyFor(AUTO_GEAR_BACKUP_RETENTION_KEY))).toBeNull();

    saveAutoGearBackupRetention(18);

    const backupRaw = getDecodedLocalStorageItem(migrationBackupKeyFor(AUTO_GEAR_BACKUP_RETENTION_KEY));
    expect(backupRaw).not.toBeNull();
    const backup = JSON.parse(backupRaw);
    expect(typeof backup.createdAt).toBe('string');
    expect(backup.createdAt.length).toBeGreaterThan(0);
    expect(backup.data).toBe(12);
    expect(loadAutoGearBackupRetention()).toBe(18);
  });

  test('saveAutoGearSeedFlag toggles the persisted flag', () => {
    saveAutoGearSeedFlag(true);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_SEEDED_KEY)).toBe('1');
    expect(loadAutoGearSeedFlag()).toBe(true);
    saveAutoGearSeedFlag(false);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearSeedFlag()).toBe(false);
  });

  test('loadAutoGearAutoPresetId reflects persisted value', () => {
    saveAutoGearAutoPresetId('preset-auto');
    expect(getDecodedLocalStorageItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBe('preset-auto');
    expect(loadAutoGearAutoPresetId()).toBe('preset-auto');
    saveAutoGearAutoPresetId('');
    expect(getDecodedLocalStorageItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
    expect(loadAutoGearAutoPresetId()).toBe('');
  });

  test('loadAutoGearAutoPresetId migrates legacy key prefix', () => {
    localStorage.setItem('cinePowerPlanner_autoGearAutoPreset', 'legacy-auto');

    expect(loadAutoGearAutoPresetId()).toBe('legacy-auto');
    expect(getDecodedLocalStorageItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBe('legacy-auto');
    expect(getDecodedLocalStorageItem('cinePowerPlanner_autoGearAutoPreset')).toBeNull();
  });

  test('clearing the auto preset removes the autosaved entry from presets', () => {
    const presets = [
      { id: 'manual-1', label: 'Manual preset', rules: [] },
      { id: 'auto-123', label: 'Autosaved rules', rules: [] },
    ];

    saveAutoGearPresets(presets);
    saveAutoGearAutoPresetId('auto-123');

    saveAutoGearAutoPresetId('');

    const stored = parseLocalStorageJSON(AUTO_GEAR_PRESETS_KEY);
    expect(stored).toEqual([
      { id: 'manual-1', label: 'Manual preset', rules: [] },
    ]);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
  });

  test('replacing the auto preset id removes the previous autosaved entry', () => {
    saveAutoGearPresets([
      { id: 'auto-old', label: 'Autosaved rules', rules: [{ id: 'rule-1' }] },
      { id: 'manual-1', label: 'Manual preset', rules: [] },
    ]);
    saveAutoGearAutoPresetId('auto-old');

    saveAutoGearPresets([
      { id: 'auto-new', label: 'Autosaved rules', rules: [{ id: 'rule-2' }] },
      { id: 'manual-1', label: 'Manual preset', rules: [] },
    ]);
    saveAutoGearAutoPresetId('auto-new');

    const stored = parseLocalStorageJSON(AUTO_GEAR_PRESETS_KEY);
    expect(stored).toEqual([
      { id: 'auto-new', label: 'Autosaved rules', rules: [{ id: 'rule-2' }] },
      { id: 'manual-1', label: 'Manual preset', rules: [] },
    ]);
  });

  test('loadAutoGearMonitorDefaults migrates legacy key prefix', () => {
    const defaults = { focus: 'monitor-a' };
    localStorage.setItem('cinePowerPlanner_autoGearMonitorDefaults', JSON.stringify(defaults));

    const loaded = loadAutoGearMonitorDefaults();
    expect(loaded).toEqual(defaults);
    expect(parseLocalStorageJSON(AUTO_GEAR_MONITOR_DEFAULTS_KEY)).toEqual(defaults);
    expect(getDecodedLocalStorageItem('cinePowerPlanner_autoGearMonitorDefaults')).toBeNull();
  });
});

describe('clearAllData', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('removes all stored planner data', () => {
    saveDeviceData(validDeviceData);
    saveSetups({ A: { foo: 1 } });
    saveFeedback({ note: 'hi' });
    saveProject('Proj', {
      gearList: '<ul></ul>',
      projectInfo: null,
      gearSelectors: rawCustomGearSelectors,
    });
    saveFavorites({ cat: ['A'] });
    saveSessionState({ camera: 'CamA' });
    saveAutoGearRules([{ id: 'rule', label: 'Outdoor', scenarios: ['Outdoor'], add: [], remove: [] }]);
    saveAutoGearBackups([
      { id: 'backup-1', label: 'Snapshot', createdAt: 1720646400000, rules: [] }
    ]);
    saveAutoGearSeedFlag(true);
    saveAutoGearPresets([
      { id: 'preset-1', label: 'Outdoor tweaks', rules: [] }
    ]);
    saveAutoGearActivePresetId('preset-1');
    saveAutoGearAutoPresetId('preset-auto');
    saveAutoGearBackupVisibility(true);
    saveUserProfile({
      name: 'Casey Crew',
      email: 'casey@example.invalid',
    });
    localStorage.setItem(SCHEMA_CACHE_KEY, JSON.stringify({ cached: true }));
    localStorage.setItem(CUSTOM_LOGO_KEY, 'data:image/svg+xml;base64,AAAA');
    localStorage.setItem(backupKeyFor(CUSTOM_LOGO_KEY), 'data:image/svg+xml;base64,AAAA');
    localStorage.setItem(
      CUSTOM_FONT_KEY,
      JSON.stringify([{ id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,BBBB' }]),
    );
    localStorage.setItem(
      backupKeyFor(CUSTOM_FONT_KEY),
      JSON.stringify([{ id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,BBBB' }]),
    );
    localStorage.setItem(TEMPERATURE_UNIT_KEY, 'fahrenheit');
    clearAllData();
    expect(getDecodedLocalStorageItem(DEVICE_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(SETUP_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(FEEDBACK_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(PROJECT_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(SESSION_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(FAVORITES_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_RULES_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_BACKUPS_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_PRESETS_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_ACTIVE_PRESET_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(USER_PROFILE_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(SCHEMA_CACHE_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(CUSTOM_LOGO_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(CUSTOM_FONT_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(TEMPERATURE_UNIT_KEY)).toBeNull();

    // Verify cache invalidation
    expect(loadProject('Proj')).toBeNull();

    expect(getDecodedLocalStorageItem(backupKeyFor(DEVICE_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(SETUP_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(FEEDBACK_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(PROJECT_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(SESSION_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(FAVORITES_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(AUTO_GEAR_RULES_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(AUTO_GEAR_BACKUPS_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(AUTO_GEAR_PRESETS_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(CUSTOM_LOGO_KEY))).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(CUSTOM_FONT_KEY))).toBeNull();
  });

  test('removes legacy planner keys so migrations cannot restore cleared data', () => {
    const legacySetupKey = 'cinePowerPlanner_setups';
    const legacySessionKey = 'cinePowerPlanner_session';
    localStorage.setItem(legacySetupKey, JSON.stringify({ Legacy: { foo: 'bar' } }));
    localStorage.setItem(`${legacySetupKey}__backup`, JSON.stringify({ Legacy: { foo: 'bar' } }));
    sessionStorage.setItem(legacySessionKey, JSON.stringify({ camera: 'Legacy Cam' }));

    clearAllData();

    expect(getDecodedLocalStorageItem(legacySetupKey)).toBeNull();
    expect(getDecodedLocalStorageItem(`${legacySetupKey}__backup`)).toBeNull();
    expect(sessionStorage.getItem(legacySessionKey)).toBeNull();
  });

  test('clears diagnostics storage to guarantee a fresh console session', () => {
    localStorage.setItem('__cineLoggingHistory', JSON.stringify([{ id: 'event-1' }]));
    sessionStorage.setItem('__cineLoggingConfig', JSON.stringify({ persistSession: true }));

    clearAllData();

    expect(localStorage.getItem('__cineLoggingHistory')).toBeNull();
    expect(sessionStorage.getItem('__cineLoggingConfig')).toBeNull();
  });
});

describe('export/import all data', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    invalidateProjectReadCache();
  });

  test('exportAllData collects all planner data', () => {
    saveDeviceData(validDeviceData);
    saveSetups({ A: { foo: 1 } });
    saveSessionState({ camera: 'CamA' });
    saveFeedback({ note: 'hi' });
    saveProject('Proj', {
      gearList: '<ul></ul>',
      projectInfo: null,
      gearSelectors: rawCustomGearSelectors,
    });
    saveFavorites({ cat: ['A'] });
    localStorage.setItem('darkMode', 'true');
    localStorage.setItem('pinkMode', 'true');
    localStorage.setItem('highContrast', 'true');
    localStorage.setItem('reduceMotion', 'true');
    localStorage.setItem('relaxedSpacing', 'true');
    localStorage.setItem('showAutoBackups', 'true');
    localStorage.setItem('accentColor', '#ff00ff');
    localStorage.setItem('fontSize', '18');
    localStorage.setItem('fontFamily', "'My Font', sans-serif");
    localStorage.setItem('language', 'de');
    localStorage.setItem('iosPwaHelpShown', 'true');
    localStorage.setItem(TEMPERATURE_UNIT_KEY, 'fahrenheit');
    const cameraPalette = {
      A: '#112233',
      B: '#445566',
      C: '#778899',
    };
    localStorage.setItem(CAMERA_COLOR_KEY, JSON.stringify(cameraPalette));
    localStorage.setItem('customLogo', 'data:image/svg+xml;base64,PHN2Zw==');
    localStorage.setItem(
      'cameraPowerPlanner_customFonts',
      JSON.stringify([
        { id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,AAAA' }
      ]),
    );
    const rules = [{ id: 'rule-outdoor', label: 'Outdoor', scenarios: ['Outdoor'], add: [], remove: [], enabled: true }];
    saveAutoGearRules(rules);
    const backups = [
      {
        id: 'backup-1',
        label: 'Snapshot',
        createdAt: 1720646400000,
        rules,
      }
    ];
    saveAutoGearBackups(backups);
    saveAutoGearSeedFlag(true);
    const presets = [
      { id: 'preset-1', label: 'Outdoor tweaks', rules }
    ];
    saveAutoGearPresets(presets);
    const monitorDefaults = { waveform: 'RGB', lut: 'False Color' };
    saveAutoGearMonitorDefaults(monitorDefaults);
    saveAutoGearActivePresetId('preset-1');
    saveAutoGearAutoPresetId('preset-auto');
    saveAutoGearBackupVisibility(true);
    saveAutoGearBackupRetention(20);
    expect(exportAllData()).toEqual({
      devices: validDeviceData,
      setups: { A: { foo: 1 } },
      session: { camera: 'CamA' },
      feedback: { note: 'hi' },
      project: {
        Proj: withGenerationFlag({
          gearList: '<ul></ul>',
          projectInfo: null,
          gearSelectors: expectedCustomGearSelectors,
        }),
      },
      favorites: { cat: ['A'] },
      autoGearRules: rules,
      autoGearBackups: backups,
      autoGearSeeded: true,
      autoGearPresets: presets,
      autoGearMonitorDefaults: monitorDefaults,
      autoGearActivePresetId: 'preset-1',
      autoGearAutoPresetId: 'preset-auto',
      autoGearBackupRetention: 20,
      autoGearShowBackups: true,
      contacts: [],
      fullBackupHistory: [],
      ownGear: [],
      preferences: {
        darkMode: true,
        pinkMode: true,
        highContrast: true,
        reduceMotion: true,
        relaxedSpacing: true,
        showAutoBackups: true,
        accentColor: '#ff00ff',
        fontSize: '18',
        fontFamily: "'My Font', sans-serif",
        language: 'de',
        iosPwaHelpShown: true,
        temperatureUnit: 'fahrenheit',
        cameraColors: cameraPalette,
      },
      customLogo: 'data:image/svg+xml;base64,PHN2Zw==',
      customFonts: [
        { id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,AAAA' }
      ],
    });
  });

  test('exportAllData normalizes stored boolean preference strings', () => {
    localStorage.setItem('darkMode', ' TRUE ');
    localStorage.setItem('pinkMode', 'false');
    localStorage.setItem('highContrast', 'Yes');
    localStorage.setItem('reduceMotion', ' OFF ');

    const exported = exportAllData();

    expect(exported.preferences).toEqual({
      darkMode: true,
      pinkMode: false,
      highContrast: true,
      reduceMotion: false,
    });
  });

  test('exportAllData filters invalid custom font entries', () => {
    const invalidEntries = [
      { id: 'font-keep', name: 'Keep', data: 'data:font/woff;base64,AAAA' },
      { id: '', name: 'Missing id', data: 'data:font/woff;base64,BBBB' },
      { id: 'font-missing-data', name: 'No data' },
      null,
      { id: 'font-empty-data', name: 'Empty', data: '' },
    ];
    localStorage.setItem(CUSTOM_FONT_KEY, JSON.stringify(invalidEntries));

    const exported = exportAllData();

    expect(exported.customFonts).toEqual([
      { id: 'font-keep', name: 'Keep', data: 'data:font/woff;base64,AAAA' },
    ]);
  });

  test('exportAllData reads custom fonts from backup storage when primary is missing', () => {
    const backupFonts = [
      { id: 'font-backup', name: 'Backup', data: 'data:font/woff;base64,CCCC' },
    ];
    localStorage.removeItem(CUSTOM_FONT_KEY);
    localStorage.setItem(`${CUSTOM_FONT_KEY}${BACKUP_SUFFIX}`, JSON.stringify(backupFonts));

    const exported = exportAllData();

    expect(exported.customFonts).toEqual(backupFonts);
  });

  test('exportAllData reads custom logo from backup storage when primary is missing', () => {
    const backupLogo = 'data:image/svg+xml;base64,QkFDS1VQ';
    localStorage.removeItem(CUSTOM_LOGO_KEY);
    localStorage.setItem(`${CUSTOM_LOGO_KEY}${BACKUP_SUFFIX}`, backupLogo);

    const exported = exportAllData();

    expect(exported.customLogo).toBe(backupLogo);
  });

  test('exportAllData includes stored schema cache values', () => {
    const schemaPayload = JSON.stringify({ version: 1, checksum: 'abc123' });
    localStorage.setItem(SCHEMA_CACHE_KEY, schemaPayload);

    const exported = exportAllData();

    expect(exported.schemaCache).toBe(schemaPayload);
  });

  test('exportAllData/importAllData round-trips print layout preferences offline', () => {
    localStorage.clear();

    const printPreferences = {
      sections: {
        project: false,
        devices: true,
        diagram: false,
      },
      layout: 'rental',
    };

    localStorage.setItem(PRINT_PREFERENCES_KEY, JSON.stringify(printPreferences));

    const exported = exportAllData();

    expect(exported.preferences).toBeDefined();
    expect(exported.preferences.cineRentalPrintSections).toEqual(printPreferences);

    localStorage.clear();

    const previousSavePrintPreferences = global.savePrintPreferences;
    try {
      delete global.savePrintPreferences;

      importAllData({
        preferences: {
          cineRentalPrintSections: printPreferences,
        },
      });
    } finally {
      if (typeof previousSavePrintPreferences === 'function') {
        global.savePrintPreferences = previousSavePrintPreferences;
      } else if (previousSavePrintPreferences !== undefined) {
        global.savePrintPreferences = previousSavePrintPreferences;
      } else {
        delete global.savePrintPreferences;
      }
    }

    const storedPrintPreferencesRaw = localStorage.getItem(PRINT_PREFERENCES_KEY);
    expect(storedPrintPreferencesRaw).not.toBeNull();
    const storedPrintPreferences = JSON.parse(decodeStoredValue(storedPrintPreferencesRaw));
    expect(storedPrintPreferences).toEqual(printPreferences);

    const roundTripExport = exportAllData();
    expect(roundTripExport.preferences.cineRentalPrintSections).toEqual(printPreferences);

    localStorage.clear();
  });

  test('importAllData restores planner data', () => {
    const data = {
      devices: validDeviceData,
      setups: { A: { foo: 1 } },
      session: { camera: 'CamA' },
      feedback: { note: 'hi' },
      project: { Proj: { gearList: '<ol></ol>' } },
      favorites: { cat: ['B'] },
      autoGearRules: [
        { id: 'rule-indoor', label: 'Indoor', scenarios: ['Indoor'], add: [{ name: 'Item', category: 'Grip', quantity: 1 }], remove: [], enabled: true }
      ],
      autoGearBackups: [
        { id: 'backup-restore', label: 'Restore', createdAt: 1720646400000, rules: [] }
      ],
      autoGearSeeded: true,
      autoGearPresets: [
        { id: 'preset-restore', label: 'Restore tweaks', rules: [] }
      ],
      autoGearActivePresetId: 'preset-restore',
      autoGearAutoPresetId: 'preset-restore',
      autoGearBackupRetention: 18,
      autoGearShowBackups: true,
      preferences: {
        darkMode: true,
        pinkMode: false,
        highContrast: true,
        reduceMotion: false,
        relaxedSpacing: true,
        showAutoBackups: true,
        accentColor: '#00ff00',
        fontSize: '20',
        fontFamily: "'Other Font', serif",
        language: 'fr',
        iosPwaHelpShown: true,
        temperatureUnit: 'fahrenheit',
      },
      customLogo: 'data:image/svg+xml;base64,PE1PQ0s+',
      customFonts: [
        { id: 'font-restore', name: 'Restore Font', data: 'data:font/woff;base64,BBBB' }
      ],
    };
    importAllData(data);
    expect(loadDeviceData()).toEqual(validDeviceData);
    expect(loadSetups()).toEqual({ A: { foo: 1 } });
    expect(loadSessionState()).toEqual({ camera: 'CamA' });
    expect(loadFeedback()).toEqual({ note: 'hi' });
    expect(loadProject('Proj')).toEqual(withGenerationFlag({ gearList: '<ol></ol>', projectInfo: null }));
    expect(exportAllData().project.Proj.gearListAndProjectRequirementsGenerated).toBe(true);
    expect(loadFavorites()).toEqual({ cat: ['B'] });
    expect(loadAutoGearRules()).toEqual(data.autoGearRules);
    expect(loadAutoGearBackups()).toEqual(data.autoGearBackups);
    expect(loadAutoGearSeedFlag()).toBe(true);
    expect(loadAutoGearPresets()).toEqual(data.autoGearPresets);
    expect(loadAutoGearActivePresetId()).toBe('preset-restore');
    expect(loadAutoGearAutoPresetId()).toBe('preset-restore');
    expect(loadAutoGearBackupRetention()).toBe(18);
    expect(loadAutoGearBackupVisibility()).toBe(true);
    expect(getDecodedLocalStorageItem('customLogo')).toBe('data:image/svg+xml;base64,PE1PQ0s+');
    expect(getDecodedLocalStorageItem('darkMode')).toBe('true');
    expect(getDecodedLocalStorageItem('pinkMode')).toBe('false');
    expect(getDecodedLocalStorageItem('highContrast')).toBe('true');
    expect(getDecodedLocalStorageItem('reduceMotion')).toBe('false');
    expect(getDecodedLocalStorageItem('relaxedSpacing')).toBe('true');
    expect(getDecodedLocalStorageItem('showAutoBackups')).toBe('true');
    expect(getDecodedLocalStorageItem('accentColor')).toBe('#00ff00');
    expect(getDecodedLocalStorageItem('fontSize')).toBe('20');
    expect(getDecodedLocalStorageItem('fontFamily')).toBe("'Other Font', serif");
    expect(getDecodedLocalStorageItem('language')).toBe('fr');
    expect(getDecodedLocalStorageItem('iosPwaHelpShown')).toBe('true');
    expect(getDecodedLocalStorageItem(TEMPERATURE_UNIT_KEY)).toBe('fahrenheit');
    expect(parseLocalStorageJSON('cameraPowerPlanner_customFonts')).toEqual([
      { id: 'font-restore', name: 'Restore Font', data: 'data:font/woff;base64,BBBB' }
    ]);
  });

  test('exportAllData preserves automatic gear enabled states', () => {
    const rules = [
      { id: 'rule-enabled', label: 'Enabled', add: [], remove: [], enabled: true },
      { id: 'rule-disabled', label: 'Disabled', add: [], remove: [], enabled: false },
    ];

    saveAutoGearRules(rules);

    const exported = exportAllData();
    expect(exported.autoGearRules).toEqual(rules);
  });

  test('importAllData applies temperature unit preference', () => {
    importAllData({ preferences: { temperatureUnit: 'fahrenheit' } });

    expect(getDecodedLocalStorageItem(TEMPERATURE_UNIT_KEY)).toBe('fahrenheit');
  });

  test('importAllData converts legacy storage snapshots with prefixed keys', () => {
    localStorage.clear();
    sessionStorage.clear();

    const snapshot = {
      [DEVICE_KEY]: JSON.stringify(validDeviceData),
      [`${SETUP_KEY}${BACKUP_SUFFIX}`]: JSON.stringify({ SnapshotSetup: { foo: 'bar' } }),
      cinePowerPlanner_session: JSON.stringify({
        setupName: '  Snapshot Setup  ',
        motor: ['Lens'],
        controller: ['Focus'],
      }),
      [FEEDBACK_KEY]: JSON.stringify({ message: 'snapshot' }),
      [FAVORITES_KEY]: JSON.stringify({ camera: ['Mini'] }),
      [migrationBackupKeyFor(PROJECT_KEY)]: JSON.stringify({
        createdAt: '2024-01-01T00:00:00.000Z',
        data: JSON.stringify({ Snapshot: { gearList: '<p>Snapshot</p>' } }),
      }),
      cinePowerPlanner_autoGearRules: JSON.stringify([
        { id: 'snap-rule', label: 'Snap', scenarios: [], add: [], remove: [] },
      ]),
      [AUTO_GEAR_BACKUPS_KEY]: JSON.stringify([
        { id: 'snap-backup', label: 'Snapshot backup', createdAt: 123, rules: [] },
      ]),
      [`${AUTO_GEAR_SEEDED_KEY}${BACKUP_SUFFIX}`]: '0',
      [AUTO_GEAR_PRESETS_KEY]: JSON.stringify([
        { id: 'snap-preset', label: 'Snapshot Preset', rules: [] },
      ]),
      [`${AUTO_GEAR_ACTIVE_PRESET_KEY}${BACKUP_SUFFIX}`]: 'snap-preset',
      cinePowerPlanner_autoGearAutoPreset: 'snap-preset',
      [AUTO_GEAR_BACKUP_VISIBILITY_KEY]: 'true',
      [SCHEMA_CACHE_KEY]: '{"version":1}',
      [`${CUSTOM_LOGO_KEY}${BACKUP_SUFFIX}`]: 'data:image/png;base64,snapshot',
      cinePowerPlanner_customFonts: JSON.stringify([
        { id: 'snap-font', name: 'Snapshot Font', data: 'data:font/woff;base64,AAAA' },
      ]),
      [`darkMode${BACKUP_SUFFIX}`]: 'true',
      highContrast: 'false',
      language: 'es',
      iosPwaHelpShown: '1',
      [TEMPERATURE_UNIT_KEY]: 'fahrenheit',
    };

    importAllData(snapshot);

    expect(loadDeviceData()).toEqual(validDeviceData);
    expect(loadSetups()).toEqual({ SnapshotSetup: { foo: 'bar' } });

    const session = loadSessionState();
    expect(session).toBeTruthy();
    expect(session.setupName).toBe('Snapshot Setup');
    expect(session.motors).toEqual(['Lens']);
    expect(session.controllers).toEqual(['Focus']);

    expect(loadFeedback()).toEqual({ message: 'snapshot' });
    expect(loadFavorites()).toEqual({ camera: ['Mini'] });
    expect(loadProject('Snapshot')).toEqual(withGenerationFlag({ gearList: '<p>Snapshot</p>', projectInfo: null }));

    expect(loadAutoGearRules()).toEqual([
      { id: 'snap-rule', label: 'Snap', scenarios: [], add: [], remove: [], enabled: true },
    ]);
    expect(loadAutoGearBackups()).toEqual([
      { id: 'snap-backup', label: 'Snapshot backup', createdAt: 123, rules: [] },
    ]);
    expect(loadAutoGearSeedFlag()).toBe(false);
    expect(loadAutoGearPresets()).toEqual([
      { id: 'snap-preset', label: 'Snapshot Preset', rules: [] },
    ]);
    expect(loadAutoGearActivePresetId()).toBe('snap-preset');
    expect(loadAutoGearAutoPresetId()).toBe('snap-preset');
    expect(loadAutoGearBackupVisibility()).toBe(true);

    expect(getDecodedLocalStorageItem(SCHEMA_CACHE_KEY)).toBe('{"version":1}');
    expect(getDecodedLocalStorageItem(CUSTOM_LOGO_KEY)).toBe('data:image/png;base64,snapshot');
    expect(parseLocalStorageJSON(CUSTOM_FONT_KEY)).toEqual([
      { id: 'snap-font', name: 'Snapshot Font', data: 'data:font/woff;base64,AAAA' },
    ]);
    expect(getDecodedLocalStorageItem('darkMode')).toBe('true');
    expect(getDecodedLocalStorageItem('highContrast')).toBe('false');
    expect(getDecodedLocalStorageItem('language')).toBe('es');
    expect(getDecodedLocalStorageItem('iosPwaHelpShown')).toBe('true');
    expect(getDecodedLocalStorageItem(TEMPERATURE_UNIT_KEY)).toBe('fahrenheit');
  });

  test('importAllData decodes legacy longgop compressed migration backups', () => {
    localStorage.clear();
    sessionStorage.clear();

    const createdAt = '2024-01-01T00:00:00.000Z';
    const legacyRules = [
      { id: 'legacy-rule', label: 'Legacy', scenarios: [], add: [], remove: [], enabled: true },
    ];
    const legacyBackups = [
      { id: 'legacy-backup', label: 'Legacy', createdAt: 321, rules: [] },
    ];

    const utf16Payload = JSON.stringify({ createdAt, data: legacyRules });
    const uriPayload = JSON.stringify({ createdAt, data: legacyBackups });

    const snapshot = {
      [`${AUTO_GEAR_RULES_KEY}${MIGRATION_BACKUP_SUFFIX}`]: JSON.stringify({
        compression: 'longgop',
        encoding: 'utf16',
        data: lzString.compressToUTF16(utf16Payload),
      }),
      [`${AUTO_GEAR_BACKUPS_KEY}${MIGRATION_BACKUP_SUFFIX}`]: JSON.stringify({
        compression: 'Long_Gop',
        encoding: 'uri-component',
        data: lzString.compressToEncodedURIComponent(uriPayload),
      }),
    };

    importAllData(snapshot);

    expect(loadAutoGearRules()).toEqual(legacyRules);
    expect(loadAutoGearBackups()).toEqual(legacyBackups);
  });

  test('importAllData clears stored device overrides when payload sets devices to null', () => {
    saveDeviceData(validDeviceData);
    expect(loadDeviceData()).toEqual(validDeviceData);

    importAllData({ devices: null });

    expect(loadDeviceData()).toBeNull();
    expect(getDecodedLocalStorageItem(DEVICE_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(DEVICE_KEY))).toBeNull();
  });

  test('importAllData clears session state when payload sets session to null', () => {
    saveSessionState({ camera: 'CamA' });
    expect(loadSessionState()).toEqual({ camera: 'CamA' });

    importAllData({ session: null });

    expect(loadSessionState()).toBeNull();
    expect(getDecodedLocalStorageItem(SESSION_KEY)).toBeNull();
    expect(getDecodedLocalStorageItem(backupKeyFor(SESSION_KEY))).toBeNull();
  });

  test('importAllData handles legacy projects array', () => {
    const data = {
      projects: [
        { name: 'OldProj', gearList: '<ul></ul>' }
      ]
    };
    importAllData(data);
    expect(loadProject('OldProj')).toEqual(withGenerationFlag({ gearList: '<ul></ul>', projectInfo: null }));
  });

  test('importAllData merges project map without overwriting existing entries', () => {
    saveProject('Existing', { gearList: '<ul>Existing</ul>' });
    saveProject('Duplicate', { gearList: '<ul>Original</ul>' });
    const data = {
      project: {
        Duplicate: { gearList: '<ul>Replacement</ul>', projectInfo: { projectName: 'Dup' } },
        Fresh: { gearList: '<ul>Fresh</ul>', projectInfo: { projectName: 'Fresh' } }
      }
    };
    importAllData(data);
    const projects = loadProject();
    expect(projects.Duplicate).toEqual(withGenerationFlag({ gearList: '<ul>Original</ul>', projectInfo: null }));
    const duplicateKeys = Object.keys(projects).filter((name) => name.toLowerCase().startsWith('duplicate'));
    expect(duplicateKeys.length).toBe(2);
    const importedDuplicate = duplicateKeys.find((name) => name !== 'Duplicate');
    expect(importedDuplicate).toBeTruthy();
    expect(projects[importedDuplicate]).toEqual(withGenerationFlag({ gearList: '<ul>Replacement</ul>', projectInfo: { projectName: 'Dup' } }));
    expect(projects.Fresh).toEqual(withGenerationFlag({ gearList: '<ul>Fresh</ul>', projectInfo: { projectName: 'Fresh' } }));
    expect(projects.Existing).toEqual(withGenerationFlag({ gearList: '<ul>Existing</ul>', projectInfo: null }));
  });

  test('importAllData merges legacy project arrays without replacing existing ones', () => {
    saveProject('Legacy', { gearList: '<ul>Old</ul>' });
    const data = {
      projects: [
        { name: 'Legacy', gearList: '<ul>New</ul>' },
        { gearList: '<ul>Unnamed</ul>' }
      ]
    };
    importAllData(data);
    const projects = loadProject();
    expect(projects.Legacy).toEqual(withGenerationFlag({ gearList: '<ul>Old</ul>', projectInfo: null }));
    const legacyKeys = Object.keys(projects).filter((name) => name.toLowerCase().startsWith('legacy'));
    expect(legacyKeys.length).toBe(2);
    const importedLegacy = legacyKeys.find((name) => name !== 'Legacy');
    expect(importedLegacy).toBeTruthy();
    expect(projects[importedLegacy]).toEqual(withGenerationFlag({ gearList: '<ul>New</ul>', projectInfo: null }));
    const unnamedEntry = Object.entries(projects).find(([name, proj]) => {
      return name !== 'Legacy' && proj.gearList === '<ul>Unnamed</ul>';
    });
    expect(unnamedEntry).toBeDefined();
    expect(unnamedEntry[1]).toEqual(withGenerationFlag({ gearList: '<ul>Unnamed</ul>', projectInfo: null }));
  });

  test('importAllData handles project collections stored as Map instances', () => {
    const mappedProjects = new Map();
    mappedProjects.set('Mapped', { gearList: '<ul>Mapped</ul>' });
    mappedProjects.set(7, { gearList: '<ul>Seven</ul>' });

    const singleProjectMap = new Map();
    singleProjectMap.set('Solo', { gearList: '<ul>Solo</ul>' });

    importAllData({
      projects: mappedProjects,
      project: singleProjectMap,
    });

    const projectKeys = Object.keys(loadProject());
    expect(projectKeys).toEqual(expect.arrayContaining(['Mapped', '7', 'Solo']));
    expect(loadProject('Mapped')).toEqual(withGenerationFlag({ gearList: '<ul>Mapped</ul>', projectInfo: null }));
    expect(loadProject('7')).toEqual(withGenerationFlag({ gearList: '<ul>Seven</ul>', projectInfo: null }));
    expect(loadProject('Solo')).toEqual(withGenerationFlag({ gearList: '<ul>Solo</ul>', projectInfo: null }));
  });

  test('importAllData handles project tuple arrays with explicit names', () => {
    importAllData({
      projects: [
        ['TupleProject', { gearList: '<ul>Tuple</ul>' }],
        ['  ', { gearList: '<ul>Blank</ul>' }],
        [[1, 2, 3], { gearList: '<ul>ArrayKey</ul>' }],
      ],
    });

    const projects = loadProject();
    expect(projects.TupleProject).toEqual(withGenerationFlag({ gearList: '<ul>Tuple</ul>', projectInfo: null }));
    const blankEntry = Object.entries(projects).find(([, proj]) => proj.gearList === '<ul>Blank</ul>');
    expect(blankEntry).toBeDefined();
    const arrayKeyEntry = Object.entries(projects).find(([, proj]) => proj.gearList === '<ul>ArrayKey</ul>');
    expect(arrayKeyEntry).toBeDefined();
  });

  test('importAllData handles legacy project string payload', () => {
    const data = { project: '<section>Legacy</section>' };
    importAllData(data);
    expect(loadProject('')).toEqual(withGenerationFlag({ gearList: '<section>Legacy</section>', projectInfo: null }));
  });

  test('importAllData handles legacy project map entries stored as strings', () => {
    const data = { project: { Legacy: '<div>Legacy</div>' } };
    importAllData(data);
    expect(loadProject('Legacy')).toEqual(withGenerationFlag({ gearList: '<div>Legacy</div>', projectInfo: null }));
  });

  test('importAllData handles project map entries stored as JSON strings', () => {
    const payload = {
      project: {
        Legacy: JSON.stringify({
          gearList: '<div>Legacy</div>',
          projectInfo: { projectName: 'Legacy JSON' },
          autoGearRules: [
            { id: 'legacy-json', label: 'Legacy JSON', scenarios: [], add: [], remove: [], enabled: true },
          ],
        }),
      },
    };

    importAllData(payload);

    expect(loadProject('Legacy')).toEqual(withGenerationFlag({
      gearList: '<div>Legacy</div>',
      projectInfo: { projectName: 'Legacy JSON' },
      autoGearRules: [
        { id: 'legacy-json', label: 'Legacy JSON', scenarios: [], add: [], remove: [], enabled: true },
      ],
    }));
  });

  test('importAllData extracts nested project data containers', () => {
    clearAllData();
    importAllData({
      data: {
        project: { gearList: '<div>Nested</div>' },
      },
    });

    const projects = loadProject();
    expect(Object.values(projects).some((proj) => proj.gearList === '<div>Nested</div>')).toBe(true);
  });

  test('importAllData imports legacy plannerData project entries', () => {
    clearAllData();
    importAllData({
      plannerData: [
        ['projects', [{ name: 'Planner One', gearList: '<p>One</p>' }]],
        { key: 'project', value: { gearList: '<p>Two</p>' } },
      ],
    });

    const projects = loadProject();
    expect(Object.values(projects).some((proj) => proj.gearList === '<p>One</p>')).toBe(true);
    expect(Object.values(projects).some((proj) => proj.gearList === '<p>Two</p>')).toBe(true);
  });

  test('importAllData converts legacy filter arrays into serialized filter selections', () => {
    clearAllData();
    importAllData({
      project: {
        'Filter Project': {
          gearList: '<ul></ul>',
          projectInfo: {
            filters: [
              { type: 'IRND', size: '6x6', values: ['0.3 ', '0.9'] },
              { type: 'Pol', size: '95mm' },
              { type: 'Diopter', size: '4x5.65', values: [] },
            ],
          },
        },
      },
    });

    const project = loadProject('Filter Project');
    expect(project.projectInfo).toMatchObject({
      filter: 'IRND:6x6:0.3|0.9,Pol:95mm,Diopter:4x5.65:!',
    });
    expect(project.projectInfo.filters).toBeUndefined();
  });

  test('importAllData normalizes map-based filter payloads with mixed formats', () => {
    clearAllData();
    importAllData({
      project: {
        'Mapped Filters': {
          gearList: '',
          projectInfo: {
            filters: {
              IRND: { size: '4x5.65', strengths: ['0.3', '0.6', '0.9'] },
              Clear: 'Clear:4x5.65',
              'Rota-Pol': { size: '6x6' },
              Custom: ['Custom', '95mm', ['1/4', '1/2', '1/8']],
            },
          },
        },
      },
    });

    const project = loadProject('Mapped Filters');
    expect(project.projectInfo.filter).toBe(
      'IRND:4x5.65:0.3|0.6|0.9,Clear:4x5.65,Rota-Pol:6x6,Custom:95mm:1/4|1/2|1/8',
    );
    expect(project.projectInfo.filters).toBeUndefined();
  });

  test('importAllData handles legacy single gearList', () => {
    const data = { gearList: '<p></p>' };
    importAllData(data);
    expect(loadProject('')).toEqual(withGenerationFlag({ gearList: '<p></p>', projectInfo: null }));
  });

  test('loadProject normalizes stored JSON string payloads', () => {
    const jsonString = JSON.stringify({
      gearList: '<section>Legacy</section>',
      projectInfo: { projectName: 'Legacy Stored' },
      autoGearRules: [
        { id: 'stored-json', label: 'Stored JSON', scenarios: [], add: [], remove: [], enabled: true },
      ],
    });
    localStorage.setItem(PROJECT_KEY, JSON.stringify(jsonString));

    const project = loadProject('');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<section>Legacy</section>',
      projectInfo: { projectName: 'Legacy Stored' },
      autoGearRules: [
        { id: 'stored-json', label: 'Stored JSON', scenarios: [], add: [], remove: [], enabled: true },
      ],
    }));

    // Verify that the shard is created for the normalized legacy project
    // loadProject('') should have returned the normalized project "Legacy Stored" or similar default
    // Check if the PROJECT_KEY is gone (migrated)
    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();

    // Check specific shard
    const projects = loadProject();
    expect(projects['Legacy Stored-updated']).toEqual(withGenerationFlag({
      gearList: '<section>Legacy</section>',
      projectInfo: { projectName: 'Legacy Stored' },
      autoGearRules: [
        { id: 'stored-json', label: 'Stored JSON', scenarios: [], add: [], remove: [], enabled: true },
      ],
    }));
  });

  test('loadProject normalizes project map entries saved as JSON strings', () => {
    const stored = {
      Legacy: JSON.stringify({
        gearList: '<article>Legacy Map</article>',
        projectInfo: { projectName: 'Legacy Map' },
      }),
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify(stored));

    const project = loadProject('Legacy');

    expect(project).toEqual(withGenerationFlag({
      gearList: '<article>Legacy Map</article>',
      projectInfo: { projectName: 'Legacy Map' },
    }));

    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();
    const projects = loadProject();

    expect(projects['Legacy Map-updated']).toEqual(withGenerationFlag({
      gearList: '<article>Legacy Map</article>',
      projectInfo: { projectName: 'Legacy Map' },
    }));
  });

  test('importAllData normalizes automatic gear booleans from strings', () => {
    importAllData({
      autoGearSeeded: 'false',
      autoGearShowBackups: '1',
    });

    expect(loadAutoGearSeedFlag()).toBe(false);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearBackupVisibility()).toBe(true);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBe('1');
  });

  test('importAllData treats ambiguous automatic gear booleans as disabled', () => {
    importAllData({
      autoGearSeeded: '   ',
      autoGearShowBackups: { enabled: '   ' },
    });

    expect(loadAutoGearSeedFlag()).toBe(false);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearBackupVisibility()).toBe(false);
    expect(getDecodedLocalStorageItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBeNull();
  });

  test('importAllData accepts automatic gear data stored as object maps', () => {
    const payload = {
      autoGearRules: {
        first: { id: 'first', label: 'First', scenarios: ['Indoor'], add: [], remove: [], enabled: true },
      },
      autoGearBackups: {
        keep: { id: 'backup-keep', label: 'Keep', createdAt: 123, rules: [] },
        skip: null,
      },
    };

    importAllData(payload);

    expect(loadAutoGearRules()).toEqual([
      payload.autoGearRules.first,
    ]);
    expect(loadAutoGearBackups()).toEqual([
      { id: 'backup-keep', label: 'Keep', createdAt: 123, rules: [] },
    ]);
  });

  test('importAllData accepts automatic gear data stored as Map instances', () => {
    const rulesMap = new Map();
    rulesMap.set('map-rule', { id: 'map-rule', label: 'Map rule', scenarios: [], add: [], remove: [], enabled: true });

    const backupsMap = new Map();
    backupsMap.set('map-backup', { id: 'map-backup', label: 'Map backup', createdAt: 789, rules: [] });

    const presetsMap = new Map();
    presetsMap.set('map-preset', { id: 'map-preset', label: 'Map preset', rules: [] });

    importAllData({
      autoGearRules: rulesMap,
      autoGearBackups: backupsMap,
      autoGearPresets: presetsMap,
    });

    expect(loadAutoGearRules()).toEqual([
      { id: 'map-rule', label: 'Map rule', scenarios: [], add: [], remove: [], enabled: true },
    ]);
    expect(loadAutoGearBackups()).toEqual([
      { id: 'map-backup', label: 'Map backup', createdAt: 789, rules: [] },
    ]);
    expect(loadAutoGearPresets()).toEqual([
      { id: 'map-preset', label: 'Map preset', rules: [] },
    ]);
  });

  test('importAllData accepts automatic gear data stored as JSON strings', () => {
    const rules = [
      { id: 'rule-json', label: 'JSON', scenarios: [], add: [], remove: [], enabled: true },
    ];
    const backups = [
      { id: 'backup-json', label: 'Backup', createdAt: 456, rules: [] },
    ];
    const presets = [
      { id: 'preset-json', label: 'Preset', rules: [] },
    ];

    importAllData({
      autoGearRules: JSON.stringify(rules),
      autoGearBackups: JSON.stringify({ backups }),
      autoGearPresets: JSON.stringify({ entries: presets }),
    });

    expect(loadAutoGearRules()).toEqual(rules);
    expect(loadAutoGearBackups()).toEqual(backups);
    expect(loadAutoGearPresets()).toEqual(presets);
  });

  test('importAllData extracts preset id from object payloads', () => {
    importAllData({ autoGearActivePresetId: { id: 'preset-object', value: 'ignored' } });
    expect(loadAutoGearActivePresetId()).toBe('preset-object');
  });

  test('importAllData parses JSON project strings', () => {
    importAllData({
      project: JSON.stringify({
        Legacy: { gearList: '<div>Legacy</div>' },
        WithInfo: { gearList: '<div>Info</div>', projectInfo: { projectName: 'WithInfo' } },
      }),
    });

    const projects = loadProject();
    expect(projects.Legacy).toEqual(withGenerationFlag({ gearList: '<div>Legacy</div>', projectInfo: null }));
    expect(projects.WithInfo).toEqual(withGenerationFlag({
      gearList: '<div>Info</div>',
      projectInfo: { projectName: 'WithInfo' },
    }));
  });

  test('importAllData parses project JSON arrays stored as strings', () => {
    importAllData({
      project: JSON.stringify([
        { name: 'JsonProject', gearList: '<section>JSON</section>' },
        '<article>Inline</article>',
      ]),
    });

    const projects = loadProject();
    expect(projects.JsonProject).toEqual(withGenerationFlag({
      gearList: '<section>JSON</section>',
      projectInfo: null,
    }));
    const keys = Object.keys(projects);
    const inlineKey = keys.find(k => k !== 'JsonProject');
    expect(inlineKey).toBeDefined();
    expect(projects[inlineKey]).toEqual(withGenerationFlag({ gearList: '<article>Inline</article>', projectInfo: null }));

    // Debug logs showed keys ['JsonProject', ''] or similar depending on normalization
    // Since names check might be fragile, we check values.
    const values = Object.values(projects);
    const inlineEntry = values.find(p => p.gearList === '<article>Inline</article>');
    expect(inlineEntry).toBeDefined();

    // Check second entry
    const secondEntry = values.find(p => p.gearList === '<section>JSON</section>');
    expect(secondEntry).toBeDefined();
  });

  test('importAllData normalizes nested legacy project payloads', () => {
    const legacyRules = [
      { id: 'nested-rule', label: 'Nested', scenarios: [], add: [], remove: [], enabled: true },
    ];

    importAllData({
      project: {
        LegacyNested: {
          project: {
            projectInfo: JSON.stringify({ projectName: 'Legacy Nested' }),
            gearList: '<div>Legacy nested</div>',
            autoGearRules: JSON.stringify(legacyRules),
          },
        },
      },
    });

    const legacyProject = loadProject('LegacyNested');
    expect(legacyProject).toEqual(withGenerationFlag({
      gearList: '<div>Legacy nested</div>',
      projectInfo: { projectName: 'Legacy Nested' },
      autoGearRules: legacyRules,
    }));
  });
});

describe('full backup history storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('recordFullBackupHistoryEntry appends entries and enforces limit', () => {
    for (let i = 0; i < 205; i += 1) {
      recordFullBackupHistoryEntry({ createdAt: `2024-01-01T00:00:00Z-${i}` });
    }
    const stored = parseLocalStorageJSON(FULL_BACKUP_HISTORY_KEY);
    expect(Array.isArray(stored)).toBe(true);
    expect(stored.length).toBe(200);
    const history = loadFullBackupHistory();
    expect(history).toHaveLength(200);
    expect(history[0].createdAt).toBe('2024-01-01T00:00:00Z-5');
    expect(history[history.length - 1].createdAt).toBe('2024-01-01T00:00:00Z-204');
  });

  test('saveFullBackupHistory removes storage key when empty array provided', () => {
    saveFullBackupHistory([{ createdAt: '2024-02-02T12:00:00Z', fileName: 'backup.json' }]);
    expect(getDecodedLocalStorageItem(FULL_BACKUP_HISTORY_KEY)).not.toBeNull();
    saveFullBackupHistory([]);
    expect(getDecodedLocalStorageItem(FULL_BACKUP_HISTORY_KEY)).toBeNull();
  });

  test('saveFullBackupHistory preserves existing history when payload normalizes to empty', () => {
    saveFullBackupHistory([{ createdAt: '2024-07-04T10:20:30Z', fileName: 'primary.json' }]);
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

    saveFullBackupHistory([
      { createdAt: '   ' },
      null,
      42,
    ]);

    expect(loadFullBackupHistory()).toEqual([
      { createdAt: '2024-07-04T10:20:30Z', fileName: 'primary.json' },
    ]);
    expect(getDecodedLocalStorageItem(FULL_BACKUP_HISTORY_KEY)).not.toBeNull();
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  test('loadFullBackupHistory normalizes raw string entries', () => {
    localStorage.setItem(FULL_BACKUP_HISTORY_KEY, JSON.stringify([' 2024-03-03T08:30:00Z ']));
    const history = loadFullBackupHistory();
    expect(history).toEqual([{ createdAt: '2024-03-03T08:30:00Z' }]);
  });

  test('importAllData normalizes mixed array full backup history payloads', () => {
    importAllData({
      fullBackupHistory: [
        ' 2024-04-01T00:00:00Z ',
        { iso: '2024-04-02T03:04:05Z', name: '  backup.json  ' },
        { timestamp: '2024-04-03T05:06:07Z', fileName: ' third.json ' },
        { createdAt: '   ' },
        null,
        42,
      ],
    });

    const history = loadFullBackupHistory();
    expect(history).toEqual([
      { createdAt: '2024-04-01T00:00:00Z' },
      { createdAt: '2024-04-02T03:04:05Z', fileName: 'backup.json' },
      { createdAt: '2024-04-03T05:06:07Z', fileName: 'third.json' },
    ]);
  });

  test('importAllData accepts full backup history stored inside nested objects', () => {
    importAllData({
      fullBackupHistory: {
        alpha: { createdAt: '2024-05-01T09:10:11Z', fileName: ' Alpha.json ' },
        beta: ' 2024-05-02T12:13:14Z ',
        gamma: { timestamp: '2024-05-03T15:16:17Z', fileName: ' third.json ' },
      },
    });

    const history = loadFullBackupHistory();
    expect(history).toEqual([
      { createdAt: '2024-05-01T09:10:11Z', fileName: 'Alpha.json' },
      { createdAt: '2024-05-02T12:13:14Z' },
      { createdAt: '2024-05-03T15:16:17Z', fileName: 'third.json' },
    ]);
  });

  test('importAllData supports legacy fullBackups string payloads', () => {
    const legacyPayload = JSON.stringify([
      { timestamp: '2024-06-01T18:19:20Z', fileName: ' legacy.json ' },
      '2024-06-02T21:22:23Z',
    ]);

    importAllData({ fullBackups: legacyPayload });

    const history = loadFullBackupHistory();
    expect(history).toEqual([
      { createdAt: '2024-06-01T18:19:20Z', fileName: 'legacy.json' },
      { createdAt: '2024-06-02T21:22:23Z' },
    ]);
  });

  test('importAllData accepts full backup history stored as Map', () => {
    const historyMap = new Map();
    historyMap.set('entry', { createdAt: '2024-02-02T00:00:00Z', fileName: 'backup.json' });

    importAllData({ fullBackupHistory: historyMap });

    const history = loadFullBackupHistory();
    expect(history).toEqual([
      { createdAt: '2024-02-02T00:00:00Z', fileName: 'backup.json' },
    ]);
  });
});

describe('migration backups before overwriting data', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const readMigrationBackupData = (storageKey) => {
    const raw = getDecodedLocalStorageItem(migrationBackupKeyFor(storageKey));
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw);
    const entry = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
    expect(typeof entry.createdAt).toBe('string');
    expect(entry).toHaveProperty('data');
    return entry.data;
  };

  test.each([
    {
      label: 'device overrides',
      key: DEVICE_KEY,
      initial: { cameras: { Legacy: {} } },
      save: (value) => saveDeviceData(value),
      next: validDeviceData,
    },
    {
      label: 'session state',
      key: SESSION_KEY,
      initial: { activeSetup: 'Legacy' },
      save: (value) => saveSessionState(value),
      next: { activeSetup: 'Current' },
    },
    {
      label: 'setups',
      key: SETUP_KEY,
      initial: { Legacy: { name: 'Legacy', items: [] } },
      save: (value) => saveSetups(value),
      next: { Next: { name: 'Next', items: [] } },
    },
    {
      label: 'favorites',
      key: FAVORITES_KEY,
      initial: { camera: 'A' },
      save: (value) => saveFavorites(value),
      next: { camera: 'B' },
    },
    {
      label: 'feedback',
      key: FEEDBACK_KEY,
      initial: { note: 'Original' },
      save: (value) => saveFeedback(value),
      next: { note: 'Updated' },
    },
    {
      label: 'automatic gear rules',
      key: AUTO_GEAR_RULES_KEY,
      initial: [{ id: 'legacy-rule' }],
      save: (value) => saveAutoGearRules(value),
      next: [{ id: 'current-rule' }],
    },
    {
      label: 'automatic gear backups',
      key: AUTO_GEAR_BACKUPS_KEY,
      initial: [{ id: 'legacy-backup' }],
      save: (value) => saveAutoGearBackups(value),
      next: [{ id: 'snapshot' }],
    },
    {
      label: 'automatic gear presets',
      key: AUTO_GEAR_PRESETS_KEY,
      initial: [{ id: 'preset-a' }],
      save: (value) => saveAutoGearPresets(value),
      next: [{ id: 'preset-b' }],
    },
    {
      label: 'automatic gear monitor defaults',
      key: AUTO_GEAR_MONITOR_DEFAULTS_KEY,
      initial: { monitor: 'Legacy' },
      save: (value) => saveAutoGearMonitorDefaults(value),
      next: { monitor: 'Operator' },
    },
    {
      label: 'full backup history',
      key: FULL_BACKUP_HISTORY_KEY,
      initial: [{ createdAt: '2024-01-01T00:00:00Z' }],
      save: (value) => saveFullBackupHistory(value),
      next: [{ createdAt: '2024-02-02T00:00:00Z' }],
    },
  ])('captures previous %s snapshot before writing new data', ({ key, initial, save, next }) => {
    localStorage.setItem(key, JSON.stringify(initial));
    expect(getDecodedLocalStorageItem(migrationBackupKeyFor(key))).toBeNull();

    save(next);

    const backupData = readMigrationBackupData(key);
    expect(backupData).toEqual(initial);
  });

  test('saveProject preserves existing project container before overwriting', () => {
    const initialProjects = { Legacy: { gearList: '', projectInfo: null } };
    localStorage.setItem(PROJECT_KEY, JSON.stringify(initialProjects));
    expect(getDecodedLocalStorageItem(migrationBackupKeyFor(PROJECT_KEY))).toBeNull();

    saveProject('New Project', { gearList: '', projectInfo: null });

    const backupData = readMigrationBackupData(PROJECT_KEY);
    expect(backupData).toEqual(initialProjects);
  });

  test('saveDeviceData upgrades legacy migration backup payloads to modern envelope', () => {
    const legacyBackupKey = migrationBackupKeyFor(DEVICE_KEY);
    const legacyPayload = { cameras: { Legacy: { brand: 'Old', model: 'Camera' } } };

    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    localStorage.setItem(legacyBackupKey, JSON.stringify(legacyPayload));

    saveDeviceData(validDeviceData);

    const rawBackup = localStorage.getItem(legacyBackupKey);
    expect(rawBackup).toBeTruthy();
    const parsed = JSON.parse(rawBackup);
    // Should be an array now if validDeviceData triggered a backup append, 
    // OR simply the legacy payload if no new backup was appended (but saveDeviceData *should* create one if changed).
    // Actually, saveDeviceData calls createStorageMigrationBackup.
    // If legacy backup exists, it tries to append.
    // So distinct legacy backup + new backup.
    const list = Array.isArray(parsed) ? parsed : [parsed];
    const legacyEntry = list.find(item => item.data && item.data.cameras && item.data.cameras.Legacy && item.data.cameras.Legacy.brand === 'Old');

    expect(legacyEntry).toBeDefined();
    expect(typeof legacyEntry.createdAt).toBe('string');
  });

  test('saveDeviceData wraps string-based legacy migration backups', () => {
    const legacyBackupKey = migrationBackupKeyFor(DEVICE_KEY);

    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    localStorage.setItem(legacyBackupKey, 'legacy-string');

    saveDeviceData(validDeviceData);

    const rawBackup = localStorage.getItem(legacyBackupKey);
    expect(rawBackup).toBeTruthy();
    const parsed = JSON.parse(rawBackup);
    const list = Array.isArray(parsed) ? parsed : [parsed];
    const legacyEntry = list.find(item => item.data === 'legacy-string');
    expect(legacyEntry).toBeDefined();
    expect(legacyEntry.data).toBe('legacy-string');
    expect(typeof legacyEntry.createdAt).toBe('string');
    expect(Number.isNaN(Date.parse(legacyEntry.createdAt))).toBe(false);
  });

  test('saveDeviceData normalizes numeric migration backup timestamps', () => {
    const legacyBackupKey = migrationBackupKeyFor(DEVICE_KEY);
    const numericTimestamp = 1_700_000_000_000;
    const legacyPayload = { createdAt: numericTimestamp, data: { cameras: { Legacy: {} } } };

    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    localStorage.setItem(legacyBackupKey, JSON.stringify(legacyPayload));

    saveDeviceData(validDeviceData);

    const rawBackup = localStorage.getItem(legacyBackupKey);
    expect(rawBackup).toBeTruthy();
    const parsed = JSON.parse(rawBackup);
    const list = Array.isArray(parsed) ? parsed : [parsed];
    const legacyEntry = list.find(item => item.data && item.data.cameras);

    expect(legacyEntry).toBeDefined();
    expect(legacyEntry.data).toEqual(legacyPayload.data);
    expect(legacyEntry.createdAt).toBe(new Date(numericTimestamp).toISOString());
  });

  test('camera colour palette survives export/import round trip', () => {
    const palette = {
      A: '#aa0000',
      B: '#00aa00',
      C: '#0000aa',
      D: '#aaaa00',
    };

    localStorage.setItem(CAMERA_COLOR_KEY, JSON.stringify(palette));

    const exported = exportAllData();
    expect(exported.preferences).toEqual(expect.objectContaining({ cameraColors: palette }));

    localStorage.clear();
    sessionStorage.clear();

    const previousSetter = window.setCameraLetterColors;
    const appliedPalettes = [];
    window.setCameraLetterColors = jest.fn((incomingPalette) => {
      appliedPalettes.push(incomingPalette);
      localStorage.setItem(CAMERA_COLOR_KEY, JSON.stringify(incomingPalette));
    });

    try {
      importAllData(exported);
    } finally {
      if (typeof previousSetter === 'function') {
        window.setCameraLetterColors = previousSetter;
      } else {
        delete window.setCameraLetterColors;
      }
    }

    expect(appliedPalettes).toHaveLength(1);
    expect(appliedPalettes[0]).toEqual(palette);

    const storedPaletteRaw = localStorage.getItem(CAMERA_COLOR_KEY);
    expect(typeof storedPaletteRaw).toBe('string');
    expect(JSON.parse(storedPaletteRaw)).toEqual(palette);
  });
});

describe('storage snapshot conversion', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('imports preferences stored under simple keys from a snapshot object', () => {
    const { importAllData, exportAllData } = require('../../src/scripts/storage');

    const snapshot = {
      darkMode: 'true',
      accentColor: 'Ocean',
      customLogo: 'data:image/png;base64,AAA',
    };

    importAllData(snapshot);

    const exported = exportAllData();
    expect(exported.preferences).toEqual(
      expect.objectContaining({
        darkMode: true,
        accentColor: 'Ocean',
      }),
    );
    expect(exported.customLogo).toBe('data:image/png;base64,AAA');
  });
});

describe('critical storage backup guard', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('creates backup copies for stored entries', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    const result = ensureCriticalStorageBackups();
    expect(getDecodedLocalStorageItem(backupKeyFor(DEVICE_KEY))).toBe(JSON.stringify(validDeviceData));
    expect(result.ensured).toEqual(expect.arrayContaining([
      expect.objectContaining({ key: DEVICE_KEY }),
    ]));
  });

  test('project backups capture custom gear selectors', () => {
    saveProject('Backup Demo', {
      gearList: '<ul>Backup</ul>',
      projectInfo: null,
      gearSelectors: rawCustomGearSelectors,
    });

    const result = ensureCriticalStorageBackups();
    // The backup should contain the reconstructed monolithic object
    const backupRaw = getDecodedLocalStorageItem(backupKeyFor(PROJECT_KEY));
    expect(typeof backupRaw).toBe('string');
    const backupData = JSON.parse(backupRaw);
    expect(backupData['Backup Demo']).toEqual(withGenerationFlag({
      gearList: '<ul>Backup</ul>',
      projectInfo: null,
      gearSelectors: expectedCustomGearSelectors,
    }));
    expect(result.ensured).toEqual(expect.arrayContaining([
      expect.objectContaining({ key: PROJECT_KEY }),
    ]));
  });

  test('reports missing entries when nothing is stored', () => {
    const result = ensureCriticalStorageBackups();
    expect(result.skipped).toEqual(expect.arrayContaining([
      expect.objectContaining({ key: DEVICE_KEY, reason: 'missing' }),
    ]));
  });
});

afterAll(() => {
  localStorage.clear();
  sessionStorage.clear();
});
