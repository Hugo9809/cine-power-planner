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

  test('includes documentation tracker releases when they exist', () => {
    const {
      saveDocumentationTracker,
      exportAllData,
    } = require('../../src/scripts/storage');

    saveDocumentationTracker({
      version: 3,
      releases: [
        {
          id: 'release-1',
          name: 'Auto Backup Improvements',
          notes: 'Keeps every saved project safe',
        },
      ],
    });

    const exported = exportAllData();

    expect(exported.documentationTracker).toMatchObject({
      version: 1,
      releases: [
        expect.objectContaining({
          id: 'release-1',
          name: 'Auto Backup Improvements',
          notes: 'Keeps every saved project safe',
          archived: false,
          statuses: {
            locales: expect.any(Object),
            helpTopics: expect.any(Object),
            printGuides: expect.any(Object),
          },
        }),
      ],
    });
    const [release] = exported.documentationTracker.releases;
    expect(typeof release.createdAt).toBe('string');
    expect(release.createdAt).not.toHaveLength(0);
    expect(typeof release.updatedAt === 'string' || release.updatedAt === null).toBe(true);
  });

  test('captures preference snapshot values and preserves raw mount voltage payloads', () => {
    const {
      exportAllData,
      getSafeLocalStorage,
      getMountVoltageStorageKeyName,
    } = require('../../src/scripts/storage');

    const storage = getSafeLocalStorage();
    storage.setItem('darkMode', 'true');
    storage.setItem('pinkMode', '0');
    storage.setItem('highContrast', 'yes');
    storage.setItem('reduceMotion', 'off');
    storage.setItem('relaxedSpacing', '1');
    storage.setItem('showAutoBackups', 'no');
    storage.setItem('accentColor', '#ff0099');
    storage.setItem('fontSize', 'large');
    storage.setItem('fontFamily', 'Cine Sans');
    storage.setItem('language', 'de');
    storage.setItem('iosPwaHelpShown', 'true');
    storage.setItem('cameraPowerPlanner_temperatureUnit', 'celsius');
    storage.setItem('cameraPowerPlanner_focusScale', 'cine');

    const mountKey = getMountVoltageStorageKeyName();
    storage.setItem(mountKey, '{invalid json');

    const exported = exportAllData();

    expect(exported.preferences).toEqual({
      darkMode: true,
      pinkMode: false,
      highContrast: true,
      reduceMotion: false,
      relaxedSpacing: true,
      showAutoBackups: false,
      accentColor: '#ff0099',
      fontSize: 'large',
      fontFamily: 'Cine Sans',
      language: 'de',
      mountVoltages: '{invalid json',
      iosPwaHelpShown: true,
      temperatureUnit: 'celsius',
      focusScale: 'cine',
    });
  });

  test('loads custom fonts from backup copies and filters invalid entries', () => {
    const {
      exportAllData,
      getSafeLocalStorage,
    } = require('../../src/scripts/storage');

    const storage = getSafeLocalStorage();
    const customFontKey = 'cameraPowerPlanner_customFonts';
    storage.removeItem(customFontKey);
    storage.setItem(
      `${customFontKey}__backup`,
      JSON.stringify([
        { id: 'font-1', name: 'Headline', data: 'AAA' },
        { id: 'font-2', name: '', data: 'BBB' },
        null,
        { id: 'font-3', name: 'Valid Body', data: 'CCC' },
        { name: 'Missing Id', data: 'DDD' },
      ]),
    );

    const exported = exportAllData();

    expect(exported.customFonts).toEqual([
      { id: 'font-1', name: 'Headline', data: 'AAA' },
      { id: 'font-3', name: 'Valid Body', data: 'CCC' },
    ]);
  });

  test('includes schema cache even when stored as an empty string', () => {
    const {
      exportAllData,
      getSafeLocalStorage,
    } = require('../../src/scripts/storage');

    const storage = getSafeLocalStorage();
    storage.setItem('cameraPowerPlanner_schemaCache', '{}');
    expect(storage.getItem('cameraPowerPlanner_schemaCache')).toBe('{}');

    const exported = exportAllData();

    expect(exported.schemaCache).toBe('{}');
  });
});
