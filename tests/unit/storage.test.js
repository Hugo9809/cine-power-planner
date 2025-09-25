if (typeof window === 'undefined') {
  global.window = {};
}

if (!('localStorage' in global.window)) {
  Object.defineProperty(global.window, 'localStorage', {
    configurable: true,
    value: global.localStorage,
  });
}

if (!('sessionStorage' in global.window)) {
  Object.defineProperty(global.window, 'sessionStorage', {
    configurable: true,
    value: global.sessionStorage,
  });
}

const lzString = require('lz-string/libs/lz-string');
global.LZString = lzString;

const {
  loadDeviceData,
  saveDeviceData,
  loadSetups,
  saveSetups,
  saveSetup,
  loadSetup,
  deleteSetup,
  renameSetup,
  loadSessionState,
  saveSessionState,
  loadFeedback,
  saveFeedback,
  saveProject,
  loadProject,
  deleteProject,
  loadFavorites,
  saveFavorites,
  clearAllData,
  exportAllData,
  importAllData,
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
  loadFullBackupHistory,
  saveFullBackupHistory,
  recordFullBackupHistoryEntry,
} = require('../../src/scripts/storage');

const DEVICE_KEY = 'cameraPowerPlanner_devices';
const SETUP_KEY = 'cameraPowerPlanner_setups';
const SESSION_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_KEY = 'cameraPowerPlanner_feedback';
const PROJECT_KEY = 'cameraPowerPlanner_project';
const FAVORITES_KEY = 'cameraPowerPlanner_favorites';
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

const BACKUP_SUFFIX = '__backup';
const MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
const backupKeyFor = (key) => `${key}${BACKUP_SUFFIX}`;
const migrationBackupKeyFor = (key) => `${key}${MIGRATION_BACKUP_SUFFIX}`;

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
    expect(localStorage.getItem(DEVICE_KEY)).toBe(JSON.stringify(validDeviceData));
  });

  test('saveDeviceData(null) removes stored overrides and backup copy', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    localStorage.setItem(backupKeyFor(DEVICE_KEY), JSON.stringify(validDeviceData));

    saveDeviceData(null);

    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
    expect(localStorage.getItem(backupKeyFor(DEVICE_KEY))).toBeNull();
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
    expect(JSON.parse(localStorage.getItem(DEVICE_KEY))).toEqual(expected);
  });

  test('loadDeviceData creates migration backup before rewriting normalized data', () => {
    const legacy = { cameras: { Alexa: {} } };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(legacy));

    expect(localStorage.getItem(migrationBackupKeyFor(DEVICE_KEY))).toBeNull();

    const result = loadDeviceData();

    expect(result).toMatchObject({ cameras: { Alexa: {} } });
    const stored = JSON.parse(localStorage.getItem(DEVICE_KEY));
    expect(stored).toEqual(result);

    const backupRaw = localStorage.getItem(migrationBackupKeyFor(DEVICE_KEY));
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
    expect(localStorage.getItem(migrationBackupKeyFor(DEVICE_KEY))).toBe(
      JSON.stringify(existingBackup),
    );
  });

  test('loadDeviceData migrates legacy key prefix to current storage', () => {
    const legacy = { cameras: {}, monitors: {} };
    localStorage.setItem('cinePowerPlanner_devices', JSON.stringify(legacy));

    const result = loadDeviceData();

    expect(result).not.toBeNull();
    const stored = JSON.parse(localStorage.getItem(DEVICE_KEY));
    expect(stored).toEqual(result);
    expect(localStorage.getItem('cinePowerPlanner_devices')).toBeNull();
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
    expect(localStorage.getItem(backupKey)).toBe(JSON.stringify(validDeviceData));

    localStorage.setItem(DEVICE_KEY, '{invalid-json');

    expect(loadDeviceData()).toEqual(validDeviceData);
    expect(localStorage.getItem(DEVICE_KEY)).toBe(JSON.stringify(validDeviceData));
  });
});

describe('setup storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveSetups stores JSON', () => {
    const setups = {A: {foo: 1}};
    saveSetups(setups);
    expect(localStorage.getItem(SETUP_KEY)).toBe(JSON.stringify(setups));
  });

  test('loadSetups returns empty object when none', () => {
    expect(loadSetups()).toEqual({});
  });

  test('loadSetups returns parsed object when present', () => {
    const setups = {A: {foo: 1}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    expect(loadSetups()).toEqual(setups);
  });

  test('loadSetups converts array data into an object', () => {
    const arr = [{ name: 'A', foo: 1 }, { name: 'B', bar: 2 }];
    localStorage.setItem(SETUP_KEY, JSON.stringify(arr));
    expect(loadSetups()).toEqual({ A: { name: 'A', foo: 1 }, B: { name: 'B', bar: 2 } });
    expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({ A: { name: 'A', foo: 1 }, B: { name: 'B', bar: 2 } });
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
    expect(localStorage.getItem(backupKeyFor(SETUP_KEY))).toBe(JSON.stringify(setups));

    localStorage.setItem(SETUP_KEY, '{bad-json');

    expect(loadSetups()).toEqual(setups);
    expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual(setups);
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
    expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({ A: { foo: 1 } });
  });

  test('saveSetups removes older duplicate auto backups before trimming unique entries', () => {
    const setups = {};
    for (let index = 0; index < 49; index += 1) {
      const minute = String(index).padStart(2, '0');
      const key = `auto-backup-2024-01-01-00-${minute}`;
      setups[key] = { camera: `Camera ${index}` };
    }
    const duplicateValue = { camera: 'Shared Camera', lens: 'Shared Lens' };
    const oldDuplicateKey = 'auto-backup-2024-01-01-01-00-Project Alpha';
    const newDuplicateKey = 'auto-backup-2024-01-02-00-00-Project Alpha';
    setups[oldDuplicateKey] = duplicateValue;
    setups[newDuplicateKey] = duplicateValue;

    saveSetups(setups);

    const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
    expect(stored[oldDuplicateKey]).toBeUndefined();
    expect(stored[newDuplicateKey]).toEqual(duplicateValue);
    const autoBackupCount = Object.keys(stored).filter(name => name.startsWith('auto-backup-')).length;
    expect(autoBackupCount).toBeLessThanOrEqual(50);
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

    const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
    expect(stored[alphaKey]).toEqual(shared);
    expect(stored[betaKey]).toEqual(shared);
  });

  test('saveSetups keeps auto backups with distinct Date values for the same label', () => {
    const setups = {};

    for (let index = 0; index < 46; index += 1) {
      const minute = String(index).padStart(2, '0');
      const key = `auto-backup-2024-01-01-00-${minute}-Filler-${index}`;
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

    const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
    const storedKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-'));
    expect(storedKeys.length).toBeLessThanOrEqual(50);
    expect(stored[alphaOldKey]).toBeDefined();
    expect(stored[alphaNewKey]).toBeDefined();
    expect(stored[betaOldKey]).toBeUndefined();
    expect(stored[betaNewKey]).toEqual(betaValue);
    expect(stored[gammaOldKey]).toBeUndefined();
    expect(stored[gammaNewKey]).toEqual(gammaValue);
  });

  test('saveSetups keeps the newest auto backup for each project label when trimming', () => {
    const setups = {};
    for (let index = 0; index < 60; index += 1) {
      const minute = String(index).padStart(2, '0');
      const label = index % 2 === 0 ? 'Project Alpha' : 'Project Beta';
      const key = `auto-backup-2024-01-01-00-${minute}-${label}`;
      setups[key] = {
        camera: 'Camera 1',
        projectInfo: { projectName: label },
      };
    }

    saveSetups(setups);

    const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
    const autoKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-')).sort();
    expect(autoKeys.length).toBeLessThanOrEqual(50);

    const alphaKeys = autoKeys.filter((name) => name.endsWith('Project Alpha'));
    const betaKeys = autoKeys.filter((name) => name.endsWith('Project Beta'));

    expect(alphaKeys.length).toBeGreaterThan(0);
    expect(betaKeys.length).toBeGreaterThan(0);
    expect(alphaKeys[alphaKeys.length - 1]).toBe('auto-backup-2024-01-01-00-58-Project Alpha');
    expect(betaKeys[betaKeys.length - 1]).toBe('auto-backup-2024-01-01-00-59-Project Beta');
  });

  test('saveSetups keeps multiple unlabeled auto backups when trimming', () => {
    const setups = {};
    for (let index = 0; index < 60; index += 1) {
      const minute = String(index).padStart(2, '0');
      const key = `auto-backup-2024-01-01-00-${minute}`;
      setups[key] = {
        camera: 'Camera 1',
        projectInfo: { projectName: '' },
      };
    }

    saveSetups(setups);

    const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
    const autoKeys = Object.keys(stored).filter((name) => name.startsWith('auto-backup-')).sort();

    expect(autoKeys.length).toBe(50);
    expect(autoKeys[0]).toBe('auto-backup-2024-01-01-00-10');
    expect(autoKeys[autoKeys.length - 1]).toBe('auto-backup-2024-01-01-00-59');
  });

  test('saveSetups preserves renamed auto backups that match newer snapshots', () => {
    const renamedKey = 'auto-backup-2024-02-01-00-00-Project Alpha';
    const latestKey = 'auto-backup-2024-02-02-00-00-Project Alpha';
    const sharedValue = {
      gearList: '<ul>shared</ul>',
      projectInfo: { projectName: 'Project Alpha' },
    };

    const setups = {
      [renamedKey]: {
        ...sharedValue,
        metadata: {
          autoBackupRenamed: true,
          autoBackupOriginalKey: 'auto-backup-2024-01-31-23-50-Project Alpha',
        },
      },
      [latestKey]: sharedValue,
    };

    saveSetups(setups);

    const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
    expect(stored[renamedKey]).toBeDefined();
    expect(stored[latestKey]).toEqual(sharedValue);
  });

  test('saveSetup adds and persists single setup', () => {
    const initial = {A: {foo: 1}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(initial));
    saveSetup('B', {bar: 2});
    const result = JSON.parse(localStorage.getItem(SETUP_KEY));
    expect(result).toEqual({A:{foo:1}, B:{bar:2}});
  });

  test('loadSetup retrieves named setup', () => {
    const setups = {A:{foo:1}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    expect(loadSetup('A')).toEqual({foo:1});
  });

    test('deleteSetup removes named setup', () => {
      const setups = {A:{foo:1}, B:{bar:2}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      deleteSetup('A');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({B:{bar:2}});
    });

    test('renameSetup renames setup to a new unique name', () => {
      const setups = {A:{foo:1}, B:{bar:2}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('A', 'C');
      expect(newName).toBe('C');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({C:{foo:1}, B:{bar:2}});
    });

    test('renameSetup marks auto backups as renamed when retitled', () => {
      const originalKey = 'auto-backup-2024-01-01-00-00-Project';
      const setups = {
        [originalKey]: { gearList: '<ul></ul>', projectInfo: { projectName: 'Project' } },
      };
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));

      const result = renameSetup(originalKey, 'auto-backup-2024-01-01-00-00-Project Archive');

      const stored = JSON.parse(localStorage.getItem(SETUP_KEY));
      const renamedEntry = stored[result];

      expect(result).toBe('auto-backup-2024-01-01-00-00-Project Archive');
      expect(renamedEntry.metadata.autoBackupRenamed).toBe(true);
      expect(renamedEntry.metadata.autoBackupOriginalKey).toBe(originalKey);
    });

    test('renameSetup appends suffix when target exists', () => {
      const setups = {A:{foo:1}, C:{bar:2}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('A', 'C');
      expect(newName).toBe('C (2)');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({'C (2)':{foo:1}, C:{bar:2}});
    });

    test('renameSetup ignores case and whitespace when name unchanged', () => {
      const setups = {A:{foo:1}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('A', ' a ');
      expect(newName).toBe('A');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({A:{foo:1}});
    });

    test('renameSetup prevents case-insensitive duplicates', () => {
      const setups = {A:{foo:1}, B:{bar:2}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('B', ' a ');
      expect(newName).toBe('a (2)');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({A:{foo:1}, 'a (2)':{bar:2}});
    });

    test('renameSetup returns null when original missing', () => {
      localStorage.setItem(SETUP_KEY, JSON.stringify({A:{foo:1}}));
      const result = renameSetup('B', 'C');
      expect(result).toBeNull();
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({A:{foo:1}});
    });

    test('renameSetup ignores empty new name', () => {
      const setups = {A:{foo:1}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('A', '   ');
      expect(newName).toBe('A');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({A:{foo:1}});
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
    expect(localStorage.getItem(SESSION_KEY)).toBe(JSON.stringify(state));
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
    expect(localStorage.getItem(SESSION_KEY)).toBe(JSON.stringify(state));
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  test('loadSessionState migrates legacy key prefix', () => {
    const state = { camera: 'CamA', motors: ['MotorA'] };
    localStorage.setItem('cinePowerPlanner_session', JSON.stringify(state));

    const result = loadSessionState();

    expect(result).toEqual({ camera: 'CamA', motors: ['MotorA'] });

    expect(JSON.parse(localStorage.getItem(SESSION_KEY))).toEqual(result);
    expect(localStorage.getItem('cinePowerPlanner_session')).toBeNull();
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
    const stored = JSON.parse(localStorage.getItem(SESSION_KEY));

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

    expect(localStorage.getItem(migrationBackupKeyFor(SESSION_KEY))).toBeNull();

    const state = loadSessionState();

    expect(state).toMatchObject({
      setupName: 'Legacy',
      motors: ['FocusMotor'],
      controllers: ['FocusWheel'],
    });
    const stored = JSON.parse(localStorage.getItem(SESSION_KEY));
    expect(stored).toEqual(state);

    const backupRaw = localStorage.getItem(migrationBackupKeyFor(SESSION_KEY));
    expect(backupRaw).toBeTruthy();
    const backup = JSON.parse(backupRaw);
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
    expect(localStorage.getItem(migrationBackupKeyFor(SESSION_KEY))).toBe(
      JSON.stringify(existingBackup),
    );
  });
});

describe('feedback storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveFeedback stores JSON', () => {
    const fb = { note: 'hi' };
    saveFeedback(fb);
    expect(localStorage.getItem(FEEDBACK_KEY)).toBe(JSON.stringify(fb));
  });

  test('loadFeedback returns parsed object when present', () => {
    const fb = { note: 'hi' };
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(fb));
    expect(loadFeedback()).toEqual(fb);
  });

  test('loadFeedback returns empty object for non-object data', () => {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(5));
    expect(loadFeedback()).toEqual({});
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([ { runtime: '1h' } ]));
    expect(loadFeedback()).toEqual({});
  });
});

describe('project storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveProject stores data per project name', () => {
    saveProject('A', { gearList: '<ul>A</ul>' });
    saveProject('B', { gearList: '<ul>B</ul>' });
    expect(loadProject('A')).toEqual({ gearList: '<ul>A</ul>', projectInfo: null });
    expect(loadProject('B')).toEqual({ gearList: '<ul>B</ul>', projectInfo: null });
  });

  test('saveProject normalizes null gearList to empty string', () => {
    saveProject('NullProj', { gearList: null });
    expect(loadProject('NullProj')).toEqual({ gearList: '', projectInfo: null });
  });

  test('saveProject strips non-object projectInfo values', () => {
    saveProject('InfoProj', { gearList: '<ul>Info</ul>', projectInfo: 'bad' });
    expect(loadProject('InfoProj')).toEqual({ gearList: '<ul>Info</ul>', projectInfo: null });
  });

  test('saveProject removes older duplicate auto backups before trimming unique entries', () => {
    const projects = {};
    for (let index = 0; index < 49; index += 1) {
      const minute = String(index).padStart(2, '0');
      const key = `auto-backup-2024-01-01-00-${minute}-Project Alpha`;
      projects[key] = { gearList: `<ul>${index}</ul>`, projectInfo: null };
    }
    const duplicateValue = { gearList: '<ul>duplicate</ul>', projectInfo: null };
    const oldDuplicateKey = 'auto-backup-2024-01-01-01-00-Project Alpha';
    const newDuplicateKey = 'auto-backup-2024-01-02-00-00-Project Alpha';
    projects[oldDuplicateKey] = duplicateValue;
    projects[newDuplicateKey] = duplicateValue;
    localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));

    saveProject(newDuplicateKey, { gearList: '<ul>duplicate</ul>', projectInfo: null });

    const stored = JSON.parse(localStorage.getItem(PROJECT_KEY));
    expect(stored[oldDuplicateKey]).toBeUndefined();
    expect(stored[newDuplicateKey]).toEqual(duplicateValue);
    const autoBackupCount = Object.keys(stored).filter(name => name.startsWith('auto-backup-')).length;
    expect(autoBackupCount).toBeLessThanOrEqual(50);
  });

  test('saveProject ignores non-object payloads entirely', () => {
    saveProject('Broken', 'not-an-object');
    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();
  });

  test('loadProject returns normalized map of projects when name omitted', () => {
    const stored = {
      NewFormat: { gearList: '<ul>New</ul>', projectInfo: { notes: 'ok' } },
      LegacyHtml: { projectHtml: '<section>project</section>', gearHtml: '<div>gear</div>' },
      LegacyString: '<p>standalone</p>',
      Invalid: 7,
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify(stored));
    expect(loadProject()).toEqual({
      NewFormat: { gearList: '<ul>New</ul>', projectInfo: { notes: 'ok' } },
      LegacyHtml: { gearList: { projectHtml: '<section>project</section>', gearHtml: '<div>gear</div>' }, projectInfo: null },
      LegacyString: { gearList: '<p>standalone</p>', projectInfo: null },
    });
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
      prepDays: '2024-01-01 to 2024-01-02\n2024-01-05 to 2024-01-06',
      requiredScenarios: 'Rain Machine, Gimbal',
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
      '</div>',
    ].join('');

    localStorage.setItem(PROJECT_KEY, JSON.stringify({ Alt: { gearList: html } }));

    const project = loadProject('Alt');
    expect(project).not.toBeNull();
    expect(project.projectInfo).toEqual({
      projectName: 'Projekt Archiv',
      productionCompany: 'Filmhaus GmbH',
    });
  });

  test('loadProject returns null for unknown names', () => {
    saveProject('Known', { gearList: '<ul></ul>' });
    expect(loadProject('Missing')).toBeNull();
  });

  test('loadProject migrates legacy key prefix to new storage', () => {
    localStorage.setItem('cinePowerPlanner_project', JSON.stringify('<p>Legacy</p>'));

    const projects = loadProject();
    const stored = JSON.parse(localStorage.getItem(PROJECT_KEY));

    expect(projects).toEqual({ '': { gearList: '<p>Legacy</p>', projectInfo: null } });
    expect(stored).toEqual(projects);
    expect(localStorage.getItem('cinePowerPlanner_project')).toBeNull();
  });

  test('loadProject creates migration backup before rewriting normalized data', () => {
    const legacySerialized = JSON.stringify('<p>Legacy project</p>');
    localStorage.setItem(PROJECT_KEY, legacySerialized);

    expect(localStorage.getItem(migrationBackupKeyFor(PROJECT_KEY))).toBeNull();

    const projects = loadProject();

    const stored = localStorage.getItem(PROJECT_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored)).toEqual(projects);

    const backupRaw = localStorage.getItem(migrationBackupKeyFor(PROJECT_KEY));
    expect(backupRaw).toBeTruthy();
    const backup = JSON.parse(backupRaw);
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
    expect(projects).toEqual({ '': { gearList: '<p>Legacy project</p>', projectInfo: null } });

    const storedBackup = localStorage.getItem(migrationBackupKeyFor(PROJECT_KEY));
    expect(storedBackup).toBe(JSON.stringify(existingBackup));
  });

  test('deleteProject removes individual projects and stores an automatic backup before deleting', () => {
    saveProject('Keep', { gearList: '<ul>Keep</ul>' });
    saveProject('Drop', { gearList: '<ul>Drop</ul>' });

    deleteProject('Drop');
    expect(loadProject('Drop')).toBeNull();
    expect(loadProject('Keep')).toEqual({ gearList: '<ul>Keep</ul>', projectInfo: null });
    const afterFirstDeletion = loadProject();
    const dropBackupKey = Object.keys(afterFirstDeletion).find((name) => name.includes('Drop'));
    expect(dropBackupKey).toBeDefined();
    expect(afterFirstDeletion[dropBackupKey]).toEqual({ gearList: '<ul>Drop</ul>', projectInfo: null });

    deleteProject('Keep');
    expect(loadProject('Keep')).toBeNull();
    const storedRaw = localStorage.getItem(PROJECT_KEY);
    expect(storedRaw).not.toBeNull();
    const storedProjects = JSON.parse(storedRaw);
    const backupKeys = Object.keys(storedProjects);
    expect(backupKeys.length).toBeGreaterThanOrEqual(2);
    expect(backupKeys.every((name) => name.startsWith('auto-backup-'))).toBe(true);
    const keepBackupKey = backupKeys.find((name) => name.includes('Keep'));
    expect(keepBackupKey).toBeDefined();
    expect(storedProjects[keepBackupKey]).toEqual({ gearList: '<ul>Keep</ul>', projectInfo: null });
  });

  test('deleteProject without a name clears all stored projects', () => {
    saveProject('A', { gearList: '<ul>A</ul>' });
    saveProject('B', { gearList: '<ul>B</ul>' });
    deleteProject();
    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();
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
    expect(localStorage.getItem(FAVORITES_KEY)).toBeNull();
  });
});

describe('automatic gear storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveAutoGearRules persists rule arrays', () => {
    const rules = [{ id: 'rule-a', label: 'Outdoor', scenarios: ['Outdoor'], add: [], remove: [] }];
    saveAutoGearRules(rules);
    expect(JSON.parse(localStorage.getItem(AUTO_GEAR_RULES_KEY))).toEqual(rules);
    expect(loadAutoGearRules()).toEqual(rules);
  });

  test('loadAutoGearRules falls back to empty array when data malformed', () => {
    localStorage.setItem(AUTO_GEAR_RULES_KEY, JSON.stringify('oops'));
    expect(loadAutoGearRules()).toEqual([]);
  });

  test('loadAutoGearRules migrates legacy key prefix', () => {
    const rules = [{ id: 'legacy', label: 'Legacy', scenarios: [], add: [], remove: [] }];
    localStorage.setItem('cinePowerPlanner_autoGearRules', JSON.stringify(rules));

    const loaded = loadAutoGearRules();
    expect(loaded).toEqual(rules);
    expect(JSON.parse(localStorage.getItem(AUTO_GEAR_RULES_KEY))).toEqual(rules);
    expect(localStorage.getItem('cinePowerPlanner_autoGearRules')).toBeNull();
  });

  test('loadAutoGearBackups returns stored backups and sanitises invalid payloads', () => {
    const backups = [
      { id: 'backup-1', label: 'Manual backup', createdAt: 1720646400000, rules: [] }
    ];
    saveAutoGearBackups(backups);
    expect(JSON.parse(localStorage.getItem(AUTO_GEAR_BACKUPS_KEY))).toEqual(backups);
    expect(loadAutoGearBackups()).toEqual(backups);

    localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify('oops'));
    expect(loadAutoGearBackups()).toEqual(backups);
    expect(JSON.parse(localStorage.getItem(AUTO_GEAR_BACKUPS_KEY))).toEqual(backups);
  });

  test('saveAutoGearBackupRetention creates migration backup before overwriting existing values', () => {
    localStorage.setItem(AUTO_GEAR_BACKUP_RETENTION_KEY, JSON.stringify(12));
    expect(localStorage.getItem(migrationBackupKeyFor(AUTO_GEAR_BACKUP_RETENTION_KEY))).toBeNull();

    saveAutoGearBackupRetention(18);

    const backupRaw = localStorage.getItem(migrationBackupKeyFor(AUTO_GEAR_BACKUP_RETENTION_KEY));
    expect(backupRaw).not.toBeNull();
    const backup = JSON.parse(backupRaw);
    expect(typeof backup.createdAt).toBe('string');
    expect(backup.createdAt.length).toBeGreaterThan(0);
    expect(backup.data).toBe(12);
    expect(loadAutoGearBackupRetention()).toBe(18);
  });

  test('saveAutoGearSeedFlag toggles the persisted flag', () => {
    saveAutoGearSeedFlag(true);
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBe('1');
    expect(loadAutoGearSeedFlag()).toBe(true);
    saveAutoGearSeedFlag(false);
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearSeedFlag()).toBe(false);
  });

  test('loadAutoGearAutoPresetId reflects persisted value', () => {
    saveAutoGearAutoPresetId('preset-auto');
    expect(localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBe('preset-auto');
    expect(loadAutoGearAutoPresetId()).toBe('preset-auto');
    saveAutoGearAutoPresetId('');
    expect(localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
    expect(loadAutoGearAutoPresetId()).toBe('');
  });

  test('loadAutoGearAutoPresetId migrates legacy key prefix', () => {
    localStorage.setItem('cinePowerPlanner_autoGearAutoPreset', 'legacy-auto');

    expect(loadAutoGearAutoPresetId()).toBe('legacy-auto');
    expect(localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBe('legacy-auto');
    expect(localStorage.getItem('cinePowerPlanner_autoGearAutoPreset')).toBeNull();
  });

  test('clearing the auto preset removes the autosaved entry from presets', () => {
    const presets = [
      { id: 'manual-1', label: 'Manual preset', rules: [] },
      { id: 'auto-123', label: 'Autosaved rules', rules: [] },
    ];

    saveAutoGearPresets(presets);
    saveAutoGearAutoPresetId('auto-123');

    saveAutoGearAutoPresetId('');

    const stored = JSON.parse(localStorage.getItem(AUTO_GEAR_PRESETS_KEY));
    expect(stored).toEqual([
      { id: 'manual-1', label: 'Manual preset', rules: [] },
    ]);
    expect(localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
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

    const stored = JSON.parse(localStorage.getItem(AUTO_GEAR_PRESETS_KEY));
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
    expect(JSON.parse(localStorage.getItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY))).toEqual(defaults);
    expect(localStorage.getItem('cinePowerPlanner_autoGearMonitorDefaults')).toBeNull();
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
    saveProject('Proj', { gearList: '<ul></ul>' });
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
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
    expect(localStorage.getItem(SETUP_KEY)).toBeNull();
    expect(localStorage.getItem(FEEDBACK_KEY)).toBeNull();
    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
    expect(localStorage.getItem(FAVORITES_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_RULES_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_BACKUPS_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_PRESETS_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY)).toBeNull();
    expect(localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBeNull();
    expect(localStorage.getItem(SCHEMA_CACHE_KEY)).toBeNull();
    expect(localStorage.getItem(CUSTOM_LOGO_KEY)).toBeNull();
    expect(localStorage.getItem(CUSTOM_FONT_KEY)).toBeNull();
    expect(localStorage.getItem(TEMPERATURE_UNIT_KEY)).toBeNull();

    expect(localStorage.getItem(backupKeyFor(DEVICE_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(SETUP_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(FEEDBACK_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(PROJECT_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(SESSION_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(FAVORITES_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(AUTO_GEAR_RULES_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(AUTO_GEAR_BACKUPS_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(AUTO_GEAR_PRESETS_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(CUSTOM_LOGO_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(CUSTOM_FONT_KEY))).toBeNull();
  });

  test('removes legacy planner keys so migrations cannot restore cleared data', () => {
    const legacySetupKey = 'cinePowerPlanner_setups';
    const legacySessionKey = 'cinePowerPlanner_session';
    localStorage.setItem(legacySetupKey, JSON.stringify({ Legacy: { foo: 'bar' } }));
    localStorage.setItem(`${legacySetupKey}__backup`, JSON.stringify({ Legacy: { foo: 'bar' } }));
    sessionStorage.setItem(legacySessionKey, JSON.stringify({ camera: 'Legacy Cam' }));

    clearAllData();

    expect(localStorage.getItem(legacySetupKey)).toBeNull();
    expect(localStorage.getItem(`${legacySetupKey}__backup`)).toBeNull();
    expect(sessionStorage.getItem(legacySessionKey)).toBeNull();
  });
});

describe('export/import all data', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('exportAllData collects all planner data', () => {
    saveDeviceData(validDeviceData);
    saveSetups({ A: { foo: 1 } });
    saveSessionState({ camera: 'CamA' });
    saveFeedback({ note: 'hi' });
    saveProject('Proj', { gearList: '<ul></ul>' });
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
    localStorage.setItem('customLogo', 'data:image/svg+xml;base64,PHN2Zw==');
    localStorage.setItem(
      'cameraPowerPlanner_customFonts',
      JSON.stringify([
        { id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,AAAA' }
      ]),
    );
    const rules = [{ id: 'rule-outdoor', label: 'Outdoor', scenarios: ['Outdoor'], add: [], remove: [] }];
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
      project: { Proj: { gearList: '<ul></ul>', projectInfo: null } },
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
      fullBackupHistory: [],
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
      },
      customLogo: 'data:image/svg+xml;base64,PHN2Zw==',
      customFonts: [
        { id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,AAAA' }
      ],
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

  test('importAllData restores planner data', () => {
    const data = {
      devices: validDeviceData,
      setups: { A: { foo: 1 } },
      session: { camera: 'CamA' },
      feedback: { note: 'hi' },
      project: { Proj: { gearList: '<ol></ol>' } },
      favorites: { cat: ['B'] },
      autoGearRules: [
        { id: 'rule-indoor', label: 'Indoor', scenarios: ['Indoor'], add: [{ name: 'Item', category: 'Grip', quantity: 1 }], remove: [] }
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
    expect(loadProject('Proj')).toEqual({ gearList: '<ol></ol>', projectInfo: null });
    expect(loadFavorites()).toEqual({ cat: ['B'] });
    expect(loadAutoGearRules()).toEqual(data.autoGearRules);
    expect(loadAutoGearBackups()).toEqual(data.autoGearBackups);
      expect(loadAutoGearSeedFlag()).toBe(true);
    expect(loadAutoGearPresets()).toEqual(data.autoGearPresets);
    expect(loadAutoGearActivePresetId()).toBe('preset-restore');
    expect(loadAutoGearAutoPresetId()).toBe('preset-restore');
    expect(loadAutoGearBackupRetention()).toBe(18);
      expect(loadAutoGearBackupVisibility()).toBe(true);
      expect(localStorage.getItem('customLogo')).toBe('data:image/svg+xml;base64,PE1PQ0s+');
      expect(localStorage.getItem('darkMode')).toBe('true');
      expect(localStorage.getItem('pinkMode')).toBe('false');
      expect(localStorage.getItem('highContrast')).toBe('true');
      expect(localStorage.getItem('reduceMotion')).toBe('false');
      expect(localStorage.getItem('relaxedSpacing')).toBe('true');
      expect(localStorage.getItem('showAutoBackups')).toBe('true');
      expect(localStorage.getItem('accentColor')).toBe('#00ff00');
      expect(localStorage.getItem('fontSize')).toBe('20');
      expect(localStorage.getItem('fontFamily')).toBe("'Other Font', serif");
      expect(localStorage.getItem('language')).toBe('fr');
      expect(localStorage.getItem('iosPwaHelpShown')).toBe('true');
    expect(localStorage.getItem(TEMPERATURE_UNIT_KEY)).toBe('fahrenheit');
    expect(JSON.parse(localStorage.getItem('cameraPowerPlanner_customFonts'))).toEqual([
      { id: 'font-restore', name: 'Restore Font', data: 'data:font/woff;base64,BBBB' }
    ]);
  });

  test('importAllData applies temperature unit preference', () => {
    importAllData({ preferences: { temperatureUnit: 'fahrenheit' } });

    expect(localStorage.getItem(TEMPERATURE_UNIT_KEY)).toBe('fahrenheit');
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
    expect(loadProject('Snapshot')).toEqual({ gearList: '<p>Snapshot</p>', projectInfo: null });

    expect(loadAutoGearRules()).toEqual([
      { id: 'snap-rule', label: 'Snap', scenarios: [], add: [], remove: [] },
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

    expect(localStorage.getItem(SCHEMA_CACHE_KEY)).toBe('{"version":1}');
    expect(localStorage.getItem(CUSTOM_LOGO_KEY)).toBe('data:image/png;base64,snapshot');
    expect(JSON.parse(localStorage.getItem(CUSTOM_FONT_KEY))).toEqual([
      { id: 'snap-font', name: 'Snapshot Font', data: 'data:font/woff;base64,AAAA' },
    ]);
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(localStorage.getItem('highContrast')).toBe('false');
    expect(localStorage.getItem('language')).toBe('es');
    expect(localStorage.getItem('iosPwaHelpShown')).toBe('true');
    expect(localStorage.getItem(TEMPERATURE_UNIT_KEY)).toBe('fahrenheit');
  });

  test('importAllData clears stored device overrides when payload sets devices to null', () => {
    saveDeviceData(validDeviceData);
    expect(loadDeviceData()).toEqual(validDeviceData);

    importAllData({ devices: null });

    expect(loadDeviceData()).toBeNull();
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
    expect(localStorage.getItem(backupKeyFor(DEVICE_KEY))).toBeNull();
  });

  test('importAllData clears session state when payload sets session to null', () => {
    saveSessionState({ camera: 'CamA' });
    expect(loadSessionState()).toEqual({ camera: 'CamA' });

    importAllData({ session: null });

    expect(loadSessionState()).toBeNull();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
    expect(localStorage.getItem(backupKeyFor(SESSION_KEY))).toBeNull();
  });

  test('importAllData handles legacy projects array', () => {
    const data = {
      projects: [
        { name: 'OldProj', gearList: '<ul></ul>' }
      ]
    };
    importAllData(data);
    expect(loadProject('OldProj')).toEqual({ gearList: '<ul></ul>', projectInfo: null });
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
    expect(projects.Duplicate).toEqual({ gearList: '<ul>Original</ul>', projectInfo: null });
    const duplicateKeys = Object.keys(projects).filter((name) => name.toLowerCase().startsWith('duplicate'));
    expect(duplicateKeys.length).toBe(2);
    const importedDuplicate = duplicateKeys.find((name) => name !== 'Duplicate');
    expect(importedDuplicate).toBeTruthy();
    expect(projects[importedDuplicate]).toEqual({ gearList: '<ul>Replacement</ul>', projectInfo: { projectName: 'Dup' } });
    expect(projects.Fresh).toEqual({ gearList: '<ul>Fresh</ul>', projectInfo: { projectName: 'Fresh' } });
    expect(projects.Existing).toEqual({ gearList: '<ul>Existing</ul>', projectInfo: null });
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
    expect(projects.Legacy).toEqual({ gearList: '<ul>Old</ul>', projectInfo: null });
    const legacyKeys = Object.keys(projects).filter((name) => name.toLowerCase().startsWith('legacy'));
    expect(legacyKeys.length).toBe(2);
    const importedLegacy = legacyKeys.find((name) => name !== 'Legacy');
    expect(importedLegacy).toBeTruthy();
    expect(projects[importedLegacy]).toEqual({ gearList: '<ul>New</ul>', projectInfo: null });
    const unnamedEntry = Object.entries(projects).find(([name, proj]) => {
      return name !== 'Legacy' && proj.gearList === '<ul>Unnamed</ul>';
    });
    expect(unnamedEntry).toBeDefined();
    expect(unnamedEntry[1]).toEqual({ gearList: '<ul>Unnamed</ul>', projectInfo: null });
  });

  test('importAllData handles legacy project string payload', () => {
    const data = { project: '<section>Legacy</section>' };
    importAllData(data);
    expect(loadProject('')).toEqual({ gearList: '<section>Legacy</section>', projectInfo: null });
  });

  test('importAllData handles legacy project map entries stored as strings', () => {
    const data = { project: { Legacy: '<div>Legacy</div>' } };
    importAllData(data);
    expect(loadProject('Legacy')).toEqual({ gearList: '<div>Legacy</div>', projectInfo: null });
  });

  test('importAllData handles project map entries stored as JSON strings', () => {
    const payload = {
      project: {
        Legacy: JSON.stringify({
          gearList: '<div>Legacy</div>',
          projectInfo: { projectName: 'Legacy JSON' },
          autoGearRules: [
            { id: 'legacy-json', label: 'Legacy JSON', scenarios: [], add: [], remove: [] },
          ],
        }),
      },
    };

    importAllData(payload);

    expect(loadProject('Legacy')).toEqual({
      gearList: '<div>Legacy</div>',
      projectInfo: { projectName: 'Legacy JSON' },
      autoGearRules: [
        { id: 'legacy-json', label: 'Legacy JSON', scenarios: [], add: [], remove: [] },
      ],
    });
  });

  test('importAllData handles legacy single gearList', () => {
    const data = { gearList: '<p></p>' };
    importAllData(data);
    expect(loadProject('')).toEqual({ gearList: '<p></p>', projectInfo: null });
  });

  test('loadProject normalizes stored JSON string payloads', () => {
    const jsonString = JSON.stringify({
      gearList: '<section>Legacy</section>',
      projectInfo: { projectName: 'Legacy Stored' },
      autoGearRules: [
        { id: 'stored-json', label: 'Stored JSON', scenarios: [], add: [], remove: [] },
      ],
    });
    localStorage.setItem(PROJECT_KEY, JSON.stringify(jsonString));

    const project = loadProject('');

    expect(project).toEqual({
      gearList: '<section>Legacy</section>',
      projectInfo: { projectName: 'Legacy Stored' },
      autoGearRules: [
        { id: 'stored-json', label: 'Stored JSON', scenarios: [], add: [], remove: [] },
      ],
    });

    const stored = JSON.parse(localStorage.getItem(PROJECT_KEY));
    expect(stored['']).toEqual({
      gearList: '<section>Legacy</section>',
      projectInfo: { projectName: 'Legacy Stored' },
      autoGearRules: [
        { id: 'stored-json', label: 'Stored JSON', scenarios: [], add: [], remove: [] },
      ],
    });
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

    expect(project).toEqual({
      gearList: '<article>Legacy Map</article>',
      projectInfo: { projectName: 'Legacy Map' },
    });

    const updated = JSON.parse(localStorage.getItem(PROJECT_KEY));
    expect(updated.Legacy).toEqual({
      gearList: '<article>Legacy Map</article>',
      projectInfo: { projectName: 'Legacy Map' },
    });
  });

  test('importAllData normalizes automatic gear booleans from strings', () => {
    importAllData({
      autoGearSeeded: 'false',
      autoGearShowBackups: '1',
    });

    expect(loadAutoGearSeedFlag()).toBe(false);
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearBackupVisibility()).toBe(true);
    expect(localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBe('1');
  });

  test('importAllData treats ambiguous automatic gear booleans as disabled', () => {
    importAllData({
      autoGearSeeded: '   ',
      autoGearShowBackups: { enabled: '   ' },
    });

    expect(loadAutoGearSeedFlag()).toBe(false);
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearBackupVisibility()).toBe(false);
    expect(localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBeNull();
  });

  test('importAllData accepts automatic gear data stored as object maps', () => {
    const payload = {
      autoGearRules: {
        first: { id: 'first', label: 'First', scenarios: ['Indoor'], add: [], remove: [] },
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

  test('importAllData accepts automatic gear data stored as JSON strings', () => {
    const rules = [
      { id: 'rule-json', label: 'JSON', scenarios: [], add: [], remove: [] },
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
    expect(projects.Legacy).toEqual({ gearList: '<div>Legacy</div>', projectInfo: null });
    expect(projects.WithInfo).toEqual({
      gearList: '<div>Info</div>',
      projectInfo: { projectName: 'WithInfo' },
    });
  });

  test('importAllData parses project JSON arrays stored as strings', () => {
    importAllData({
      project: JSON.stringify([
        { name: 'JsonProject', gearList: '<section>JSON</section>' },
        '<article>Inline</article>',
      ]),
    });

    const projects = loadProject();
    expect(projects.JsonProject).toEqual({
      gearList: '<section>JSON</section>',
      projectInfo: null,
    });
    const inlineEntry = Object.entries(projects).find(([, value]) => value.gearList === '<article>Inline</article>');
    expect(inlineEntry).toBeDefined();
    expect(inlineEntry[1]).toEqual({ gearList: '<article>Inline</article>', projectInfo: null });
  });

  test('importAllData normalizes nested legacy project payloads', () => {
    const legacyRules = [
      { id: 'nested-rule', label: 'Nested', scenarios: [], add: [], remove: [] },
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
    expect(legacyProject).toEqual({
      gearList: '<div>Legacy nested</div>',
      projectInfo: { projectName: 'Legacy Nested' },
      autoGearRules: legacyRules,
    });
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
    const stored = JSON.parse(localStorage.getItem(FULL_BACKUP_HISTORY_KEY));
    expect(Array.isArray(stored)).toBe(true);
    expect(stored.length).toBe(200);
    const history = loadFullBackupHistory();
    expect(history).toHaveLength(200);
    expect(history[0].createdAt).toBe('2024-01-01T00:00:00Z-5');
    expect(history[history.length - 1].createdAt).toBe('2024-01-01T00:00:00Z-204');
  });

  test('saveFullBackupHistory removes storage key when empty array provided', () => {
    saveFullBackupHistory([{ createdAt: '2024-02-02T12:00:00Z', fileName: 'backup.json' }]);
    expect(localStorage.getItem(FULL_BACKUP_HISTORY_KEY)).not.toBeNull();
    saveFullBackupHistory([]);
    expect(localStorage.getItem(FULL_BACKUP_HISTORY_KEY)).toBeNull();
  });

  test('loadFullBackupHistory normalizes raw string entries', () => {
    localStorage.setItem(FULL_BACKUP_HISTORY_KEY, JSON.stringify([' 2024-03-03T08:30:00Z ']));
    const history = loadFullBackupHistory();
    expect(history).toEqual([{ createdAt: '2024-03-03T08:30:00Z' }]);
  });
});

describe('migration backups before overwriting data', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const readMigrationBackupData = (storageKey) => {
    const raw = localStorage.getItem(migrationBackupKeyFor(storageKey));
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw);
    expect(typeof parsed.createdAt).toBe('string');
    expect(parsed).toHaveProperty('data');
    return parsed.data;
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
    expect(localStorage.getItem(migrationBackupKeyFor(key))).toBeNull();

    save(next);

    const backupData = readMigrationBackupData(key);
    expect(backupData).toEqual(initial);
  });

  test('saveProject preserves existing project container before overwriting', () => {
    const initialProjects = { Legacy: { gearList: '', projectInfo: null } };
    localStorage.setItem(PROJECT_KEY, JSON.stringify(initialProjects));
    expect(localStorage.getItem(migrationBackupKeyFor(PROJECT_KEY))).toBeNull();

    saveProject('New Project', { gearList: '', projectInfo: null });

    const backupData = readMigrationBackupData(PROJECT_KEY);
    expect(backupData).toEqual(initialProjects);
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

afterAll(() => {
  localStorage.clear();
  sessionStorage.clear();
});
