const { loadApp } = require('./helpers/loadApp');

jest.setTimeout(15000);

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('restore rehearsal safeguards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('warns when a project bundle is opened in backup mode', async () => {
    loadApp();

    const status = document.getElementById('restoreRehearsalStatus');
    const table = document.getElementById('restoreRehearsalTable');
    const input = document.getElementById('restoreRehearsalInput');
    expect(status).not.toBeNull();
    expect(table).not.toBeNull();
    expect(input).not.toBeNull();

    const projectBundle = {
      setupName: 'Shared project',
      projectInfo: { summary: 'Prelight notes' },
      autoGearRules: [{ id: 'rule-shared', enabled: true }],
    };

    const fakeFile = {
      name: 'shared-project.json',
      text: () => Promise.resolve(JSON.stringify(projectBundle)),
    };

    Object.defineProperty(input, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    input.dispatchEvent(new Event('change'));

    await flushPromises();
    await flushPromises();

    const textsByLang = window.texts || {};
    const expectedMessage = textsByLang.en?.restoreRehearsalBackupMismatch
      || "File doesn't look like a full app backup. Double-check the source and try again.";

    expect(status.textContent).toBe(expectedMessage);
    expect(table.hasAttribute('hidden')).toBe(true);

    delete input.files;
  });

  test('warns when a full backup is opened while project mode is active', async () => {
    loadApp();

    const backupMode = document.getElementById('restoreRehearsalModeBackup');
    const projectMode = document.getElementById('restoreRehearsalModeProject');
    if (backupMode) backupMode.checked = false;
    if (projectMode) projectMode.checked = true;

    const status = document.getElementById('restoreRehearsalStatus');
    const table = document.getElementById('restoreRehearsalTable');
    const input = document.getElementById('restoreRehearsalInput');
    expect(status).not.toBeNull();
    expect(table).not.toBeNull();
    expect(input).not.toBeNull();

    const backupPayload = {
      data: {
        setups: {
          'Rehearsal Setup': { projectInfo: { projectName: 'Rehearsal Setup' } },
        },
        favorites: {},
        autoGearRules: [],
      },
    };

    const fakeFile = {
      name: 'full-backup.json',
      text: () => Promise.resolve(JSON.stringify(backupPayload)),
    };

    Object.defineProperty(input, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    input.dispatchEvent(new Event('change'));

    await flushPromises();
    await flushPromises();

    const textsByLang = window.texts || {};
    const expectedMessage = textsByLang.en?.restoreRehearsalProjectMismatch
      || "File doesn't look like a project bundle. Double-check the source and try again.";

    expect(status.textContent).toBe(expectedMessage);
    expect(table.hasAttribute('hidden')).toBe(true);

    delete input.files;
  });

  test('processes a project bundle with a UTF-8 BOM prefix', async () => {
    loadApp();

    const backupMode = document.getElementById('restoreRehearsalModeBackup');
    const projectMode = document.getElementById('restoreRehearsalModeProject');
    if (backupMode) backupMode.checked = false;
    if (projectMode) projectMode.checked = true;

    global.exportAllData.mockImplementation(() => ({
      setups: {
        'Rehearsal Project': {
          projectInfo: {
            summary: 'Scene breakdown',
            crew: [{ name: 'Camera operator' }],
            prepDays: ['Day 1'],
          },
        },
      },
      favorites: { monitors: ['17in monitor'] },
      autoGearRules: [{ id: 'rule-shared', enabled: true }],
    }));

    const status = document.getElementById('restoreRehearsalStatus');
    const table = document.getElementById('restoreRehearsalTable');
    const tbody = document.getElementById('restoreRehearsalTableBody');
    const input = document.getElementById('restoreRehearsalInput');
    expect(status).not.toBeNull();
    expect(table).not.toBeNull();
    expect(tbody).not.toBeNull();
    expect(input).not.toBeNull();

    const projectBundle = {
      setupName: 'Rehearsal Project',
      projectInfo: {
        summary: 'Scene breakdown',
        crew: [{ name: 'Camera operator' }],
        prepDays: ['Day 1'],
      },
      favorites: { monitors: ['17in monitor'] },
      autoGearRules: [{ id: 'rule-shared', enabled: true }],
    };

    const fakeFile = {
      name: 'rehearsal.json',
      text: () => Promise.resolve(`\uFEFF${JSON.stringify(projectBundle)}`),
    };

    Object.defineProperty(input, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    input.dispatchEvent(new Event('change'));

    await flushPromises();
    await flushPromises();

    const textsByLang = window.texts || {};
    const expectedMessage = textsByLang.en?.restoreRehearsalMatch
      || 'All counts match. The sandbox was cleared automatically.';

    expect(status.textContent).toBe(expectedMessage);
    expect(table.hasAttribute('hidden')).toBe(false);
    expect(tbody.children.length).toBeGreaterThan(0);

    const firstRowDiffCell = tbody.querySelector('tr td:last-child');
    expect(firstRowDiffCell).not.toBeNull();
    expect(firstRowDiffCell.classList.contains('restore-rehearsal-diff-match')).toBe(true);

    delete input.files;
  });

  test('surfaces rule-by-rule diffs and allows aborting the rehearsal', async () => {
    loadApp();

    global.exportAllData.mockImplementation(() => ({
      autoGearRules: [
        {
          id: 'rule-rain',
          label: 'Rain cover',
          add: [{ name: 'Rain slicker', category: 'Grip', quantity: 1 }],
          remove: [],
          scenarios: ['Rain'],
        },
      ],
    }));

    const input = document.getElementById('restoreRehearsalInput');
    expect(input).not.toBeNull();

    const backupPayload = {
      data: {
        autoGearRules: [
          {
            id: 'rule-rain',
            label: 'Rain cover',
            add: [{ name: 'Rain slicker', category: 'Grip', quantity: 2 }],
            remove: [],
            scenarios: ['Rain', 'Storm'],
          },
          {
            id: 'rule-gimbal',
            label: 'Gimbal prep',
            add: [{ name: 'Gimbal batteries', category: 'Power', quantity: 4 }],
            remove: [],
            scenarios: ['Gimbal'],
          },
        ],
      },
    };

    const fakeFile = {
      name: 'rules-backup.json',
      text: () => Promise.resolve(JSON.stringify(backupPayload)),
    };

    Object.defineProperty(input, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    input.dispatchEvent(new Event('change'));

    await flushPromises();
    await flushPromises();

    const ruleSection = document.getElementById('restoreRehearsalRuleSection');
    const ruleList = document.getElementById('restoreRehearsalRuleList');
    const actions = document.getElementById('restoreRehearsalActions');
    const status = document.getElementById('restoreRehearsalStatus');

    expect(ruleSection).not.toBeNull();
    expect(ruleList).not.toBeNull();
    expect(actions).not.toBeNull();
    expect(status).not.toBeNull();

    expect(ruleSection.hasAttribute('hidden')).toBe(false);
    expect(actions.hasAttribute('hidden')).toBe(false);

    const entries = ruleList.querySelectorAll('li.diff-entry');
    expect(entries.length).toBe(2);
    const entryTexts = Array.from(entries).map((entry) => entry.textContent || '');
    expect(entryTexts.some((text) => text.includes('Rain cover'))).toBe(true);
    expect(entryTexts.some((text) => text.includes('Gimbal prep'))).toBe(true);

    const abortButton = document.getElementById('restoreRehearsalAbort');
    expect(abortButton).not.toBeNull();
    abortButton.click();

    await flushPromises();

    expect(ruleSection.hasAttribute('hidden')).toBe(true);
    const textsByLang = window.texts || {};
    const expectedAbortMessage = textsByLang.en?.restoreRehearsalAbortMessage
      || 'Rehearsal sandbox cleared. Live data remains untouched.';
    expect(status.textContent).toBe(expectedAbortMessage);

    delete input.files;
  });

  test('reports extended backup metrics', async () => {
    loadApp();

    global.exportAllData.mockImplementation(() => ({
      setups: {},
      devices: {},
      favorites: {},
      autoGearRules: [],
      autoGearBackups: [],
      autoGearPresets: [],
      fullBackupHistory: [],
      customFonts: [],
      customLogo: '',
      preferences: {},
      session: {},
      feedback: {},
      schemaCache: '',
    }));

    const input = document.getElementById('restoreRehearsalInput');
    const table = document.getElementById('restoreRehearsalTable');
    const tbody = document.getElementById('restoreRehearsalTableBody');
    const status = document.getElementById('restoreRehearsalStatus');
    expect(input).not.toBeNull();
    expect(table).not.toBeNull();
    expect(tbody).not.toBeNull();
    expect(status).not.toBeNull();

    const backupPayload = {
      data: {
        devices: {
          cameras: {
            'Cinema Cam': { id: 'camera-1', brand: 'Test' },
          },
        },
        session: { setupName: 'Rehearsal Session' },
        feedback: { draft1: { message: 'Check lighting cues' } },
        autoGearPresets: [{ id: 'preset-1', label: 'Rain' }],
        autoGearBackups: [{ id: 'backup-1', createdAt: '2024-01-01' }],
        fullBackupHistory: [{ createdAt: '2024-01-02T10:00:00Z' }],
        customFonts: [{ id: 'font-1', name: 'Planner Sans', data: 'data:font/woff2;base64,AAA' }],
        customLogo: 'data:image/png;base64,AAA',
        preferences: { theme: 'dark' },
        schemaCache: '{}',
        setups: {},
        favorites: {},
        autoGearRules: [],
      },
    };

    const fakeFile = {
      name: 'extended-backup.json',
      text: () => Promise.resolve(JSON.stringify(backupPayload)),
    };

    Object.defineProperty(input, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    input.dispatchEvent(new Event('change'));

    await flushPromises();
    await flushPromises();

    expect(table.hasAttribute('hidden')).toBe(false);

    const textsByLang = window.texts || {};
    const deviceLabel = textsByLang.en?.restoreRehearsalMetricDeviceLibrary
      || 'Device library entries';
    const logoLabel = textsByLang.en?.restoreRehearsalMetricCustomLogo
      || 'Custom logo saved';

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const findRow = (label) => rows.find((row) => row.querySelector('th')?.textContent === label);

    const deviceRow = findRow(deviceLabel);
    expect(deviceRow).toBeDefined();
    if (deviceRow) {
      const cells = deviceRow.querySelectorAll('td');
      expect(cells[0].textContent).toBe('0');
      expect(cells[1].textContent).toBe('1');
      expect(cells[2].textContent).toBe('+1');
    }

    const logoRow = findRow(logoLabel);
    expect(logoRow).toBeDefined();
    if (logoRow) {
      const cells = logoRow.querySelectorAll('td');
      expect(cells[0].textContent).toBe('0');
      expect(cells[1].textContent).toBe('1');
      expect(cells[2].textContent).toBe('+1');
    }

    expect(status.textContent).toContain('+1');

    delete input.files;
  });

  test('project rehearsal hides backup-only metrics', async () => {
    loadApp();

    const backupMode = document.getElementById('restoreRehearsalModeBackup');
    const projectMode = document.getElementById('restoreRehearsalModeProject');
    if (backupMode) backupMode.checked = false;
    if (projectMode) projectMode.checked = true;

    global.exportAllData.mockImplementation(() => ({
      setups: {},
      favorites: {},
      autoGearRules: [],
    }));

    const input = document.getElementById('restoreRehearsalInput');
    const tbody = document.getElementById('restoreRehearsalTableBody');
    expect(input).not.toBeNull();
    expect(tbody).not.toBeNull();

    const projectBundle = {
      setupName: 'Project Only',
      projectInfo: { summary: 'Notes' },
      favorites: { monitors: ['Field monitor'] },
    };

    const fakeFile = {
      name: 'project-only.json',
      text: () => Promise.resolve(JSON.stringify(projectBundle)),
    };

    Object.defineProperty(input, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    input.dispatchEvent(new Event('change'));

    await flushPromises();
    await flushPromises();

    const textsByLang = window.texts || {};
    const deviceLabel = textsByLang.en?.restoreRehearsalMetricDeviceLibrary
      || 'Device library entries';

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const deviceRow = rows.find((row) => row.querySelector('th')?.textContent === deviceLabel);
    expect(deviceRow).toBeUndefined();

    delete input.files;
  });
});
