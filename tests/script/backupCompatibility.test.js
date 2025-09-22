const { loadApp } = require('./helpers/loadApp');

describe('backup compatibility utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('extractBackupSections preserves object values as JSON strings', () => {
    const { extractBackupSections } = loadApp();

    const legacyBackup = {
      settings: {
        cameraPowerPlanner_setups: { name: 'Main Setup', items: ['Camera A'] },
        darkMode: true,
      },
    };

    const sections = extractBackupSections(legacyBackup);

    expect(sections.settings.cameraPowerPlanner_setups).toBe(
      JSON.stringify({ name: 'Main Setup', items: ['Camera A'] }),
    );
    expect(sections.settings.darkMode).toBe('true');
  });

  test('extractBackupSections parses JSON encoded storage snapshots', () => {
    const { extractBackupSections } = loadApp();

    const encodedBackup = {
      settings: JSON.stringify({
        cameraPowerPlanner_setups: { name: 'Offline Rig', items: ['Camera B'] },
        darkMode: false,
      }),
      sessionStorage: JSON.stringify({
        cameraPowerPlanner_session: JSON.stringify({ tab: 'backup' }),
      }),
    };

    const sections = extractBackupSections(encodedBackup);

    expect(sections.settings.cameraPowerPlanner_setups).toBe(
      JSON.stringify({ name: 'Offline Rig', items: ['Camera B'] }),
    );
    expect(sections.settings.darkMode).toBe('false');
    expect(sections.sessionStorage.cameraPowerPlanner_session).toBe(
      JSON.stringify({ tab: 'backup' }),
    );
  });

  test('extractBackupSections recovers schema cache and JSON encoded data entries', () => {
    const { extractBackupSections } = loadApp();

    const legacyBackup = {
      schemaCache: '{"version":2}',
      autoGearRules: JSON.stringify([{ id: 'rule-1' }]),
      favorites: JSON.stringify({ projectIds: ['proj-a'] }),
    };

    const sections = extractBackupSections(legacyBackup);

    expect(sections.data.schemaCache).toEqual({ version: 2 });
    expect(sections.data.autoGearRules).toEqual([{ id: 'rule-1' }]);
    expect(sections.data.favorites).toEqual({ projectIds: ['proj-a'] });
  });

  test('sanitizeBackupPayload removes UTF-8 BOM characters', () => {
    const { sanitizeBackupPayload } = loadApp();

    const bomPayload = '\ufeff{"version":"1.0.0"}';
    const sanitized = sanitizeBackupPayload(bomPayload);

    expect(sanitized).toBe('{"version":"1.0.0"}');
  });
});

