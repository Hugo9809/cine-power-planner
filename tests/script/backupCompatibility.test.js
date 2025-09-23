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

  test('sanitizeBackupPayload removes UTF-8 BOM characters', () => {
    const { sanitizeBackupPayload } = loadApp();

    const bomPayload = '\ufeff{"version":"1.0.0"}';
    const sanitized = sanitizeBackupPayload(bomPayload);

    expect(sanitized).toBe('{"version":"1.0.0"}');
  });

  test('extractBackupSections parses stringified storage snapshots', () => {
    const { extractBackupSections } = loadApp();

    const legacySnapshot = JSON.stringify([
      ['darkMode', true],
      { key: 'language', value: 'de' },
      {
        key: 'cameraPowerPlanner_setups',
        value: { Main: { name: 'Main', items: [] } },
      },
    ]);

    const backup = {
      storage: legacySnapshot,
      session: JSON.stringify({ activeSetup: 'Main' }),
    };

    const sections = extractBackupSections(backup);

    expect(sections.settings.darkMode).toBe('true');
    expect(sections.settings.language).toBe('de');
    expect(sections.settings.cameraPowerPlanner_setups).toBe(
      JSON.stringify({ Main: { name: 'Main', items: [] } }),
    );
    expect(sections.sessionStorage).toEqual({ activeSetup: 'Main' });
  });

  test('extractBackupSections preserves legacy top-level backup data keys', () => {
    const { extractBackupSections } = loadApp();

    const legacyBackup = {
      fullBackupHistory: [{ createdAt: '2024-01-01T00:00:00.000Z', fileName: 'snapshot.json' }],
      fullBackups: [{ createdAt: '2023-12-31T00:00:00.000Z' }],
      schemaCache: '{"checksum":"abc123"}',
    };

    const sections = extractBackupSections(legacyBackup);

    expect(sections.data.fullBackupHistory).toEqual([
      { createdAt: '2024-01-01T00:00:00.000Z', fileName: 'snapshot.json' },
    ]);
    expect(sections.data.fullBackups).toEqual([{ createdAt: '2023-12-31T00:00:00.000Z' }]);
    expect(sections.data.schemaCache).toBe('{"checksum":"abc123"}');
  });

  test('extractBackupSections keeps cinePowerPlanner_* storage entries from the root object', () => {
    const { extractBackupSections } = loadApp();

    const legacyBackup = {
      cinePowerPlanner_setups: {
        Main: { name: 'Main', items: ['Camera A'] },
      },
      cinePowerPlanner_session: { activeSetup: 'Main' },
      unrelated: 'ignore-me',
    };

    const sections = extractBackupSections(legacyBackup);

    expect(sections.settings.cinePowerPlanner_setups).toBe(
      JSON.stringify({
        Main: { name: 'Main', items: ['Camera A'] },
      }),
    );
    expect(sections.settings.cinePowerPlanner_session).toBe(
      JSON.stringify({ activeSetup: 'Main' }),
    );
    expect(sections.sessionStorage).toBeNull();
  });
});

