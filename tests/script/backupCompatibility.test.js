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

  test('extractBackupSections captures cinePowerPlanner-prefixed root entries', () => {
    const { extractBackupSections } = loadApp();

    const backup = {
      cinePowerPlanner_devices: { Custom: { name: 'Custom Device' } },
      cinePowerPlanner_customFonts: [{ name: 'Legacy Font' }],
      version: '0.8.0',
    };

    const sections = extractBackupSections(backup);

    expect(sections.settings.cinePowerPlanner_devices).toBe(
      JSON.stringify({ Custom: { name: 'Custom Device' } }),
    );
    expect(sections.settings.cinePowerPlanner_customFonts).toBe(
      JSON.stringify([{ name: 'Legacy Font' }]),
    );
  });
});

