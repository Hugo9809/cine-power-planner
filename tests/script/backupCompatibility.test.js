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
});

