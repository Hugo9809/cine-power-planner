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
  loadAutoGearPresets,
  saveAutoGearPresets,
  loadAutoGearActivePresetId,
  saveAutoGearActivePresetId,
  loadAutoGearBackupVisibility,
  saveAutoGearBackupVisibility,
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
const AUTO_GEAR_BACKUP_VISIBILITY_KEY = 'cameraPowerPlanner_autoGearShowBackups';

const BACKUP_SUFFIX = '__backup';
const backupKeyFor = (key) => `${key}${BACKUP_SUFFIX}`;

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

  test('loadProject returns null for unknown names', () => {
    saveProject('Known', { gearList: '<ul></ul>' });
    expect(loadProject('Missing')).toBeNull();
  });

  test('deleteProject removes individual projects and cleans up key when empty', () => {
    saveProject('Keep', { gearList: '<ul>Keep</ul>' });
    saveProject('Drop', { gearList: '<ul>Drop</ul>' });

    deleteProject('Drop');
    expect(loadProject('Drop')).toBeNull();
    expect(loadProject('Keep')).toEqual({ gearList: '<ul>Keep</ul>', projectInfo: null });
    expect(localStorage.getItem(PROJECT_KEY)).not.toBeNull();

    deleteProject('Keep');
    expect(localStorage.getItem(PROJECT_KEY)).toBeNull();
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

  test('saveAutoGearSeedFlag toggles the persisted flag', () => {
    saveAutoGearSeedFlag(true);
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBe('1');
    expect(loadAutoGearSeedFlag()).toBe(true);
    saveAutoGearSeedFlag(false);
    expect(localStorage.getItem(AUTO_GEAR_SEEDED_KEY)).toBeNull();
    expect(loadAutoGearSeedFlag()).toBe(false);
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
    saveAutoGearBackupVisibility(true);
    localStorage.setItem(SCHEMA_CACHE_KEY, JSON.stringify({ cached: true }));
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
    expect(localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY)).toBeNull();
    expect(localStorage.getItem(SCHEMA_CACHE_KEY)).toBeNull();

    expect(localStorage.getItem(backupKeyFor(DEVICE_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(SETUP_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(FEEDBACK_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(PROJECT_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(SESSION_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(FAVORITES_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(AUTO_GEAR_RULES_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(AUTO_GEAR_BACKUPS_KEY))).toBeNull();
    expect(localStorage.getItem(backupKeyFor(AUTO_GEAR_PRESETS_KEY))).toBeNull();
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
      localStorage.setItem('showAutoBackups', 'true');
      localStorage.setItem('accentColor', '#ff00ff');
      localStorage.setItem('fontSize', '18');
      localStorage.setItem('fontFamily', "'My Font', sans-serif");
      localStorage.setItem('language', 'de');
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
    saveAutoGearActivePresetId('preset-1');
    saveAutoGearBackupVisibility(true);
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
        autoGearActivePresetId: 'preset-1',
        autoGearShowBackups: true,
        preferences: {
          darkMode: true,
          pinkMode: true,
          highContrast: true,
          showAutoBackups: true,
          accentColor: '#ff00ff',
          fontSize: '18',
          fontFamily: "'My Font', sans-serif",
          language: 'de',
        },
        customLogo: 'data:image/svg+xml;base64,PHN2Zw==',
        customFonts: [
          { id: 'font-1', name: 'My Font', data: 'data:font/woff;base64,AAAA' }
        ],
      });
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
        autoGearShowBackups: true,
        preferences: {
          darkMode: true,
          pinkMode: false,
          highContrast: true,
          showAutoBackups: true,
          accentColor: '#00ff00',
          fontSize: '20',
          fontFamily: "'Other Font', serif",
          language: 'fr',
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
      expect(loadAutoGearBackupVisibility()).toBe(true);
      expect(localStorage.getItem('customLogo')).toBe('data:image/svg+xml;base64,PE1PQ0s+');
      expect(localStorage.getItem('darkMode')).toBe('true');
      expect(localStorage.getItem('pinkMode')).toBe('false');
      expect(localStorage.getItem('highContrast')).toBe('true');
      expect(localStorage.getItem('showAutoBackups')).toBe('true');
      expect(localStorage.getItem('accentColor')).toBe('#00ff00');
      expect(localStorage.getItem('fontSize')).toBe('20');
      expect(localStorage.getItem('fontFamily')).toBe("'Other Font', serif");
      expect(localStorage.getItem('language')).toBe('fr');
      expect(JSON.parse(localStorage.getItem('cameraPowerPlanner_customFonts'))).toEqual([
        { id: 'font-restore', name: 'Restore Font', data: 'data:font/woff;base64,BBBB' }
      ]);
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

  test('importAllData handles legacy single gearList', () => {
    const data = { gearList: '<p></p>' };
    importAllData(data);
    expect(loadProject('')).toEqual({ gearList: '<p></p>', projectInfo: null });
  });
});

afterAll(() => {
  localStorage.clear();
  sessionStorage.clear();
});
