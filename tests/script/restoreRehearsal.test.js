const { loadApp } = require('./helpers/loadApp');
const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');

function loadMinimalApp(overrides = {}) {
  return loadApp({
    devices: createDeviceSkeleton(),
    globals: {
      exportAllData: jest.fn(() => ({ exported: true, autoGearRules: [] })),
      importAllData: jest.fn(),
      clearAllData: jest.fn(),
      showNotification: jest.fn(),
      ...overrides.globals
    }
  });
}

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
    loadMinimalApp();

    const status = document.getElementById('restoreRehearsalStatus');
    const table = document.getElementById('restoreRehearsalTable');
    const input = document.getElementById('restoreRehearsalInput');
    expect(status).not.toBeNull();
    expect(table).not.toBeNull();
    expect(input).not.toBeNull();

    const projectBundle = {
      setupName: 'Shared project',
      projectInfo: { summary: 'Prelight notes' },
      autoGearRules: [{ id: 'rule-shared' }],
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
    loadMinimalApp();

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
    loadMinimalApp();

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
      autoGearRules: [{ id: 'rule-shared' }],
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
      autoGearRules: [{ id: 'rule-shared' }],
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
});
