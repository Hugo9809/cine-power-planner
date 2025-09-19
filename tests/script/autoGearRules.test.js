const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
const BACKUP_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';

describe('applyAutoGearRulesToTableHtml', () => {
  let env;
  const originalAlert = window.alert;
  const originalFileReader = window.FileReader;

  beforeEach(() => {
    window.alert = jest.fn();
  });

  const stripRuleIds = rule => ({
    label: rule.label,
    scenarios: rule.scenarios,
    add: rule.add.map(({ name, category, quantity }) => ({ name, category, quantity })),
    remove: rule.remove.map(({ name, category, quantity }) => ({ name, category, quantity })),
  });

  afterEach(() => {
    jest.useRealTimers();
    env?.cleanup();
    localStorage.clear();
    window.alert = originalAlert;
    if (typeof originalFileReader === 'undefined') {
      delete window.FileReader;
    } else {
      window.FileReader = originalFileReader;
    }
  });

  test('removes matching gear without duplicating categories', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-monitoring',
          label: 'Adjust monitoring',
          scenarios: ['Outdoor'],
          add: [],
          remove: [
            { id: 'remove-monitor', name: 'SmallHD Cine 13', category: 'Monitoring', quantity: 1 }
          ]
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Monitoring</td></tr>
          <tr>
            <td>
              <span class="gear-item" data-gear-name="SmallHD Cine 13">1x SmallHD Cine 13</span><br />
              <span class="gear-item" data-gear-name="BNC Cable">2x BNC Cable</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Outdoor' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const categories = container.querySelectorAll('tbody.category-group');
    expect(categories).toHaveLength(1);
    expect(categories[0].querySelector('.category-row td').textContent.trim()).toBe('Monitoring');
    const cell = categories[0].querySelector('tr:not(.category-row) td');
    expect(cell.textContent).toContain('2x BNC Cable');
    expect(cell.textContent).not.toMatch(/SmallHD/);
  });

  test('falls back to other categories when removing gear by name', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-fallback',
          label: 'Remove monitor elsewhere',
          scenarios: ['Scenario 1'],
          add: [],
          remove: [
            { id: 'remove-monitor', name: 'SmallHD Cine 13', category: 'Monitoring', quantity: 1 }
          ]
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Rigging</td></tr>
          <tr>
            <td>
              <span class="gear-item" data-gear-name="SmallHD Cine 13">1x SmallHD Cine 13</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Scenario 1' });
    const container = document.createElement('div');
    container.innerHTML = result;

    expect(container.querySelectorAll('tbody.category-group')).toHaveLength(1);
    const header = container.querySelector('.category-row td');
    expect(header.textContent.trim()).toBe('Rigging');
    const cell = container.querySelector('tr:not(.category-row) td');
    expect(cell.textContent.trim()).toBe('');
  });

  test('removing from custom auto gear categories cleans up the section', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-custom',
          label: 'Custom removal',
          scenarios: ['Scenario X'],
          add: [],
          remove: [
            { id: 'remove-custom', name: 'Rain Cover', category: '', quantity: 1 }
          ]
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group auto-gear-category" data-auto-category="">
          <tr class="category-row"><td>Custom Additions</td></tr>
          <tr>
            <td>
              <span class="gear-item" data-gear-name="Rain Cover">1x Rain Cover</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Scenario X' });
    const container = document.createElement('div');
    container.innerHTML = result;

    expect(container.querySelectorAll('tbody.auto-gear-category').length).toBe(0);
  });

  test('legacy scenario gear additions are disabled once rules exist', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-slider',
          label: 'Slider',
          scenarios: ['Slider'],
          add: [
            { name: 'Prosup Tango Roller', category: 'Grip', quantity: 1 }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { generateGearListHtml } = env.utils;

    const info = { requiredScenarios: 'Slider' };
    const html = generateGearListHtml(info);
    const container = document.createElement('div');
    container.innerHTML = html;
    const table = container.querySelector('.gear-table');
    expect(table).not.toBeNull();

    const items = container.querySelectorAll('[data-gear-name="Prosup Tango Roller"]');
    expect(items).toHaveLength(1);
    expect(items[0].classList.contains('auto-gear-item')).toBe(true);
  });

  test('saving a rule shows a confirmation notification', () => {
    env = setupScriptEnvironment();

    const addRuleButton = document.getElementById('autoGearAddRule');
    addRuleButton.click();

    const scenarios = document.getElementById('autoGearScenarios');
    expect(scenarios.options.length).toBeGreaterThan(0);
    const firstSelectable = Array.from(scenarios.options).find(opt => opt.value);
    if (firstSelectable) firstSelectable.selected = true;

    const ruleNameInput = document.getElementById('autoGearRuleName');
    ruleNameInput.value = 'Test confirmation';

    const addNameInput = document.getElementById('autoGearAddName');
    const addQuantityInput = document.getElementById('autoGearAddQuantity');
    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addNameInput.value = 'Test item';
    addQuantityInput.value = '2';
    addCategorySelect.value = addCategorySelect.options[0].value;

    const addItemButton = document.getElementById('autoGearAddItemButton');
    addItemButton.click();

    const saveButton = document.getElementById('autoGearSaveRule');
    saveButton.click();

    const notificationContainer = document.getElementById('backupNotificationContainer');
    expect(notificationContainer).not.toBeNull();
    const note = notificationContainer.querySelector('div');
    expect(note).not.toBeNull();
    expect(note.textContent).toBe('Automatic gear rule saved.');

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Test confirmation' })
      ])
    );
  });

  test('confirming the shared import mode applies shared rules', () => {
    env = setupScriptEnvironment();
    env.utils.syncAutoGearRulesFromStorage([]);

    const applySharedLinkBtn = document.getElementById('applySharedLinkBtn');
    const sharedLinkInput = document.getElementById('sharedLinkInput');
    const sharedImportModeSelect = document.getElementById('sharedImportModeSelect');
    const sharedImportModeGlobalOption = document.getElementById('sharedImportModeGlobalOption');
    const sharedImportDialog = document.getElementById('sharedImportDialog');
    const sharedImportConfirmBtn = document.getElementById('sharedImportConfirmBtn');

    const sharedRule = {
      id: 'shared-rule',
      label: 'Shared grip tweak',
      scenarios: ['Grip'],
      add: [
        { id: 'shared-add', name: 'Apple Box', category: 'Grip', quantity: 1 }
      ],
      remove: []
    };

    const fileContent = JSON.stringify({
      setupName: 'Imported setup',
      autoGearRules: [sharedRule]
    });

    Object.defineProperty(sharedLinkInput, 'files', {
      value: [{ content: fileContent }],
      configurable: true
    });

    class FileReaderStub {
      readAsText(file) {
        this.result = file?.content || '';
        if (typeof this.onload === 'function') {
          this.onload({ target: this });
        }
      }
    }

    window.FileReader = FileReaderStub;

    applySharedLinkBtn.click();

    expect(sharedImportDialog.hasAttribute('open')).toBe(true);
    expect(sharedImportModeGlobalOption.disabled).toBe(false);
    const storedBeforeChange = localStorage.getItem('cameraPowerPlanner_autoGearRules');
    expect(storedBeforeChange).not.toBeNull();
    expect(JSON.parse(storedBeforeChange)).toEqual([]);

    Array.from(sharedImportModeSelect.options).forEach(option => {
      option.selected = option.value === 'global';
    });

    sharedImportConfirmBtn.click();

    const stored = JSON.parse(localStorage.getItem('cameraPowerPlanner_autoGearRules'));
    expect(stored).toHaveLength(1);
    expect(stored[0].label).toBe('Shared grip tweak');
  });

  test('rule editor accepts multiple additions at once', () => {
    env = setupScriptEnvironment();

    const addRuleButton = document.getElementById('autoGearAddRule');
    addRuleButton.click();

    const scenarios = document.getElementById('autoGearScenarios');
    const firstSelectable = Array.from(scenarios.options).find(opt => opt.value);
    if (firstSelectable) firstSelectable.selected = true;

    const ruleNameInput = document.getElementById('autoGearRuleName');
    ruleNameInput.value = 'Multi add rule';

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = addCategorySelect.options[0].value;

    const addQuantityInput = document.getElementById('autoGearAddQuantity');
    addQuantityInput.value = '3';

    const addNameInput = document.getElementById('autoGearAddName');
    addNameInput.value = 'Monitor Hood; 2x BNC Cable; Lens Cloth';

    const addItemButton = document.getElementById('autoGearAddItemButton');
    addItemButton.click();

    const saveButton = document.getElementById('autoGearSaveRule');
    saveButton.click();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const rule = stored.find(entry => entry.label === 'Multi add rule');
    expect(rule).toBeDefined();
    expect(rule.add).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Monitor Hood', quantity: 3 }),
        expect.objectContaining({ name: 'BNC Cable', quantity: 2 }),
        expect.objectContaining({ name: 'Lens Cloth', quantity: 3 }),
      ])
    );
  });

  test('automatic backups capture snapshots after rules change', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:00:00Z'));
    env = setupScriptEnvironment();

    const addRuleButton = document.getElementById('autoGearAddRule');
    addRuleButton.click();

    const scenarios = document.getElementById('autoGearScenarios');
    const firstSelectable = Array.from(scenarios.options).find(opt => opt.value);
    if (firstSelectable) firstSelectable.selected = true;

    document.getElementById('autoGearRuleName').value = 'Auto backup test';
    document.getElementById('autoGearAddName').value = 'Backup item';
    const categorySelect = document.getElementById('autoGearAddCategory');
    categorySelect.value = categorySelect.options[0].value;
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddItemButton').click();
    document.getElementById('autoGearSaveRule').click();

    jest.advanceTimersByTime(10 * 60 * 1000);
    jest.advanceTimersByTime(4000);

    const storedBackups = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY));
    expect(Array.isArray(storedBackups)).toBe(true);
    expect(storedBackups.length).toBe(1);
    expect(storedBackups[0].rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Auto backup test' })
      ])
    );

    const backupButtons = document.querySelectorAll('#autoGearBackupList button[data-backup-id]');
    expect(backupButtons.length).toBeGreaterThan(0);

    jest.useRealTimers();
  });

  test('restoring an automatic backup replaces the current rules', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-06T12:00:00Z'));
    env = setupScriptEnvironment();

    const addRuleButton = document.getElementById('autoGearAddRule');
    addRuleButton.click();
    const scenarios = document.getElementById('autoGearScenarios');
    const firstSelectable = Array.from(scenarios.options).find(opt => opt.value);
    if (firstSelectable) firstSelectable.selected = true;
    document.getElementById('autoGearRuleName').value = 'Backup original';
    document.getElementById('autoGearAddName').value = 'Original item';
    const addCategory = document.getElementById('autoGearAddCategory');
    addCategory.value = addCategory.options[0].value;
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddItemButton').click();
    document.getElementById('autoGearSaveRule').click();

    jest.advanceTimersByTime(10 * 60 * 1000);
    jest.advanceTimersByTime(4000);

    // Modify the rule so we can confirm restore works
    addRuleButton.click();
    const editScenarios = document.getElementById('autoGearScenarios');
    const editSelectable = Array.from(editScenarios.options).find(opt => opt.value);
    if (editSelectable) editSelectable.selected = true;
    const editorName = document.getElementById('autoGearRuleName');
    editorName.value = 'Backup modified';
    document.getElementById('autoGearSaveRule').click();

    const backupButton = document.querySelector('#autoGearBackupList button[data-backup-id]');
    expect(backupButton).not.toBeNull();
    const originalConfirm = window.confirm;
    window.confirm = jest.fn(() => true);
    backupButton.click();
    window.confirm = originalConfirm;

    const storedRules = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(storedRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Backup original' })
      ])
    );

    jest.useRealTimers();
  });

  test('restoring a backup updates automatic gear rules immediately', () => {
    env = setupScriptEnvironment();

    const originalAlert = window.alert;
    const originalBackup = window.createSettingsBackup;
    const originalFileReader = window.FileReader;
    const originalCreateObjectURL = window.URL.createObjectURL;
    const originalRevokeObjectURL = window.URL.revokeObjectURL;

    window.alert = jest.fn();
    window.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    window.URL.revokeObjectURL = jest.fn();

    const restoreInput = document.getElementById('restoreSettingsInput');
    const restoreData = {
      version: env.utils.APP_VERSION,
      settings: {
        [STORAGE_KEY]: JSON.stringify([]),
      },
      data: {
        autoGearRules: [
          {
            id: 'restored-rule',
            label: 'Restored slider kit',
            scenarios: ['Slider'],
            add: [
              { id: 'restored-item', name: 'Slider dolly', category: 'Grip', quantity: 1 }
            ],
            remove: []
          }
        ]
      }
    };

    const fileContent = JSON.stringify(restoreData);
    const fakeFile = { name: 'backup.json' };

    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile]
    });

    const mockReaderInstance = {
      onload: null,
      readAsText: jest.fn(function readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: fileContent } });
        }
      })
    };

    window.FileReader = jest.fn(() => mockReaderInstance);

    try {
      restoreInput.dispatchEvent(new Event('change'));

      const ruleTitle = document.querySelector('.auto-gear-rule-title');
      expect(ruleTitle).not.toBeNull();
      expect(ruleTitle.textContent).toBe('Restored slider kit');

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(stored).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: 'Restored slider kit' })
        ])
      );
    } finally {
      window.alert = originalAlert;
      window.createSettingsBackup = originalBackup;
      window.FileReader = originalFileReader;
      window.URL.createObjectURL = originalCreateObjectURL;
      window.URL.revokeObjectURL = originalRevokeObjectURL;
    }
  });

  test('restoring a legacy backup handles snapshots and top-level data', () => {
    env = setupScriptEnvironment({
      globals: {
        importAllData: jest.fn(),
      },
    });

    const originalAlert = window.alert;
    const originalFileReader = window.FileReader;
    const originalCreateObjectURL = window.URL.createObjectURL;
    const originalRevokeObjectURL = window.URL.revokeObjectURL;

    window.alert = jest.fn();
    window.URL.createObjectURL = jest.fn(() => 'blob:legacy-url');
    window.URL.revokeObjectURL = jest.fn();

    const restoreInput = document.getElementById('restoreSettingsInput');
    const legacyRules = [
      {
        id: 'legacy-rule',
        label: 'Legacy slider',
        scenarios: ['Slider'],
        add: [
          { id: 'legacy-item', name: 'Legacy slider kit', category: 'Grip', quantity: 1 },
        ],
        remove: [],
      },
    ];

    const legacyData = {
      version: '0.9.0',
      storage: [
        { key: 'language', value: 'es' },
        ['darkMode', true],
        { key: STORAGE_KEY, value: JSON.stringify(legacyRules) },
        {
          key: 'cameraPowerPlanner_setups',
          value: JSON.stringify({
            Legacy: { name: 'Legacy', items: [] },
          }),
        },
      ],
      session: [
        {
          key: 'cameraPowerPlanner_session',
          value: JSON.stringify({ activeSetup: 'Legacy' }),
        },
      ],
      setups: {
        Legacy: { name: 'Legacy', items: [] },
      },
      autoGearRules: legacyRules,
    };

    const fileContent = JSON.stringify(legacyData);
    const fakeFile = { name: 'legacy-backup.json' };

    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile],
    });

    const mockReaderInstance = {
      onload: null,
      readAsText: jest.fn(function readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: fileContent } });
        }
      }),
    };

    window.FileReader = jest.fn(() => mockReaderInstance);

    try {
      restoreInput.dispatchEvent(new Event('change'));

      expect(localStorage.getItem('language')).toBe('es');
      expect(localStorage.getItem('darkMode')).toBe('true');
      expect(sessionStorage.getItem('cameraPowerPlanner_session')).toBe(
        JSON.stringify({ activeSetup: 'Legacy' }),
      );
      expect(env.globals.importAllData).toHaveBeenCalledWith(
        expect.objectContaining({
          setups: legacyData.setups,
          autoGearRules: legacyData.autoGearRules,
        }),
      );

      const restoredRule = env.utils.getAutoGearRules().find(rule => rule.id === 'legacy-rule');
      expect(restoredRule).toBeDefined();
      expect(restoredRule.label).toBe('Legacy slider');
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      window.URL.createObjectURL = originalCreateObjectURL;
      window.URL.revokeObjectURL = originalRevokeObjectURL;
      sessionStorage.clear();
    }
  });

  test('resetting rules restores seeded factory additions', () => {
    env = setupScriptEnvironment();

    const resetButton = document.getElementById('autoGearResetFactory');
    expect(resetButton).not.toBeNull();

    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    try {
      resetButton.click();

      const factoryRules = env.utils.getAutoGearRules();
      const factoryNormalized = factoryRules.map(stripRuleIds);
      expect(factoryNormalized.length).toBeGreaterThan(0);

      const customRule = {
        id: 'custom-reset-rule',
        label: 'Extra rule',
        scenarios: ['Handheld'],
        add: [
          { id: 'custom-item', name: 'Sandbag', category: 'Grip', quantity: 2 }
        ],
        remove: [],
      };

      env.utils.syncAutoGearRulesFromStorage([...factoryRules, customRule]);
      expect(env.utils.getAutoGearRules().some(rule => rule.label === 'Extra rule')).toBe(true);

      resetButton.click();

      const finalRules = env.utils.getAutoGearRules();
      expect(finalRules.some(rule => rule.label === 'Extra rule')).toBe(false);
      expect(finalRules.map(stripRuleIds)).toEqual(factoryNormalized);
      expect(localStorage.getItem('cameraPowerPlanner_autoGearSeeded')).toBe('1');
      expect(confirmSpy).toHaveBeenCalledTimes(2);
    } finally {
      confirmSpy.mockRestore();
    }
  });
});
