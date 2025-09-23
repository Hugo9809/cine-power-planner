const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
const BACKUP_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';

describe('applyAutoGearRulesToTableHtml', () => {
  let env;
  const originalAlert = window.alert;
  const originalFileReader = window.FileReader;
  const originalCreateObjectURL = window.URL && window.URL.createObjectURL;
  const originalRevokeObjectURL = window.URL && window.URL.revokeObjectURL;
  let fakeTimersActive = false;

  beforeEach(() => {
    window.alert = jest.fn();
    fakeTimersActive = false;
    if (!window.URL) {
      window.URL = {};
    }
    if (typeof window.URL.createObjectURL !== 'function') {
      window.URL.createObjectURL = jest.fn(() => 'blob:auto-gear');
    }
    if (typeof window.URL.revokeObjectURL !== 'function') {
      window.URL.revokeObjectURL = jest.fn();
    }
  });

  const stripRuleIds = rule => ({
    label: rule.label,
    scenarios: rule.scenarios,
    mattebox: Array.isArray(rule.mattebox) ? rule.mattebox : [],
    add: rule.add.map(({ name, category, quantity }) => ({ name, category, quantity })),
    remove: rule.remove.map(({ name, category, quantity }) => ({ name, category, quantity })),
  });

  afterEach(() => {
    if (fakeTimersActive) {
      try {
        jest.runOnlyPendingTimers();
        jest.clearAllTimers();
      } catch {
        // Ignore if fake timers are not active
      }
      jest.useRealTimers();
      fakeTimersActive = false;
    } else {
      jest.useRealTimers();
    }
    env?.cleanup();
    localStorage.clear();
    window.alert = originalAlert;
    if (typeof originalFileReader === 'undefined') {
      delete window.FileReader;
    } else {
      window.FileReader = originalFileReader;
    }
    if (typeof originalCreateObjectURL === 'function') {
      window.URL.createObjectURL = originalCreateObjectURL;
    } else {
      delete window.URL.createObjectURL;
    }
    if (typeof originalRevokeObjectURL === 'function') {
      window.URL.revokeObjectURL = originalRevokeObjectURL;
    } else {
      delete window.URL.revokeObjectURL;
    }
  });

  test('rule editor selectors allow multiple choices and show expanded lists', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    const selectorIds = [
      'autoGearScenarios',
      'autoGearMattebox',
      'autoGearCameraHandle',
      'autoGearViewfinderExtension',
      'autoGearVideoDistribution',
      'autoGearCamera',
      'autoGearMonitor',
      'autoGearWireless',
      'autoGearMotors',
      'autoGearControllers',
      'autoGearDistance',
    ];

    const fixedHeightSelectors = new Set([
      'autoGearCamera',
      'autoGearMonitor',
      'autoGearWireless',
      'autoGearMotors',
      'autoGearControllers',
    ]);

    selectorIds.forEach(id => {
      const select = document.getElementById(id);
      expect(select).not.toBeNull();
      if (!select) return;
      expect(select.multiple).toBe(true);
      const visibleRows = Number.parseInt(select.getAttribute('size') || '0', 10);
      const selectableOptions = Array.from(select.options || []).filter(option => !option.disabled);

      if (fixedHeightSelectors.has(id)) {
        expect(visibleRows).toBeGreaterThanOrEqual(8);
      } else {
        const expectedRows = Math.max(1, Math.min(selectableOptions.length, 12));
        expect(visibleRows).toBe(expectedRows);
      }
    });
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

  test('applies mattebox-triggered rules when the selection matches', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-mattebox',
          label: 'Clamp-on defaults',
          scenarios: [],
          mattebox: ['Clamp On'],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: [],
          add: [
            {
              id: 'add-mattebox',
              name: 'ARRI LMB 4x5 Clamp-On (3-Stage)',
              category: 'Matte box + filter',
              quantity: 1,
            }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Matte box + filter</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { mattebox: 'Clamp On' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entries = container.querySelectorAll('[data-gear-name="ARRI LMB 4x5 Clamp-On (3-Stage)"]');
    expect(entries).toHaveLength(1);
    expect(entries[0].classList.contains('auto-gear-item')).toBe(true);
    expect(entries[0].textContent).toContain('1x');
  });

  test('applies camera handle-triggered rules when selections include all handles', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-handles',
          label: 'Handle package',
          scenarios: [],
          mattebox: [],
          cameraHandle: ['Hand Grips', 'Handle Extension'],
          viewfinderExtension: [],
          videoDistribution: [],
          add: [
            {
              id: 'add-handle',
              name: 'ARRI Handgrip Set',
              category: 'Rigging',
              quantity: 1,
            }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Rigging</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { cameraHandle: 'Hand Grips, Handle Extension' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entries = container.querySelectorAll('[data-gear-name="ARRI Handgrip Set"]');
    expect(entries).toHaveLength(1);
    expect(entries[0].classList.contains('auto-gear-item')).toBe(true);
  });

  test('applies viewfinder extension rules for matching selections', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-viewfinder',
          label: 'Viewfinder accessories',
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: ['ARRI VEB-3 Viewfinder Extension Bracket'],
          videoDistribution: [],
          add: [
            {
              id: 'add-viewfinder',
              name: 'Extra VF Support Clamp',
              category: 'Camera Support',
              quantity: 1,
            }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Camera Support</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entries = container.querySelectorAll('[data-gear-name="Extra VF Support Clamp"]');
    expect(entries).toHaveLength(1);
  });

  test('does not apply viewfinder extension rules when no extension is selected', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-viewfinder-none',
          label: 'Default viewfinder kit',
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: ['__none__'],
          videoDistribution: [],
          add: [
            {
              id: 'add-viewfinder-none',
              name: 'Standard VF Cable',
              category: 'Camera Support',
              quantity: 1,
            }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Camera Support</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { viewfinderExtension: '' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entries = container.querySelectorAll('[data-gear-name="Standard VF Cable"]');
    expect(entries).toHaveLength(0);
  });

  test('applies video distribution-triggered rules when the selection matches', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-video',
          label: 'Village streaming',
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: ['IOS Video'],
          add: [
            {
              id: 'add-video',
              name: 'Apple TV 4K',
              category: 'Monitoring',
              quantity: 1,
            }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Monitoring</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { videoDistribution: 'IOS Video' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entries = container.querySelectorAll('[data-gear-name="Apple TV 4K"]');
    expect(entries).toHaveLength(1);
  });

  test('does not apply video distribution rules when no distribution is selected', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-video-none',
          label: 'Baseline monitors',
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: ['__none__'],
          add: [
            {
              id: 'add-video-none',
              name: 'HDMI Switcher',
              category: 'Monitoring',
              quantity: 1,
            }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Monitoring</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { videoDistribution: '' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entries = container.querySelectorAll('[data-gear-name="HDMI Switcher"]');
    expect(entries).toHaveLength(0);
  });

  test('requires all selected scenarios before triggering scenario-based rules', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-multi-scenario',
          label: 'Full weather prep',
          scenarios: ['Extreme cold (snow)', 'Extreme rain'],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: [],
          add: [
            {
              id: 'add-weather',
              name: 'Rain Deflector',
              category: 'Camera Support',
              quantity: 1,
            }
          ],
          remove: [],
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Camera Support</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const partialMatch = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Extreme cold (snow)' });
    const partialContainer = document.createElement('div');
    partialContainer.innerHTML = partialMatch;
    const partialEntries = partialContainer.querySelectorAll('[data-gear-name="Rain Deflector"]');
    expect(partialEntries).toHaveLength(0);

    const fullMatch = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Extreme cold (snow), Extreme rain' });
    const fullContainer = document.createElement('div');
    fullContainer.innerHTML = fullMatch;
    const fullEntries = fullContainer.querySelectorAll('[data-gear-name="Rain Deflector"]');
    expect(fullEntries).toHaveLength(1);
  });

  test('buildDefaultVideoDistributionAutoGearRules covers each selector option', () => {
    env = setupScriptEnvironment();

    const {
      buildDefaultVideoDistributionAutoGearRules,
      collectProjectFormData,
    } = env.utils;

    const baseInfo = typeof collectProjectFormData === 'function'
      ? collectProjectFormData()
      : {};

    const select = document.getElementById('videoDistribution');
    const optionValues = Array.from(select?.options || [])
      .map(option => (option && typeof option.value === 'string' ? option.value.trim() : ''))
      .filter(value => value && value.toLowerCase() !== 'none');
    const expectedValues = Array.from(new Set(optionValues));

    const rules = buildDefaultVideoDistributionAutoGearRules(baseInfo);

    expectedValues.forEach(value => {
      const match = rules.find(rule => Array.isArray(rule.videoDistribution)
        && rule.videoDistribution.includes(value)
        && Array.isArray(rule.add)
        && rule.add.length > 0);
      expect(match).toBeDefined();
    });
  });

  test('seeds default mattebox rules when they are missing', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-existing',
          label: 'Existing scenario rule',
          scenarios: ['Outdoor'],
          mattebox: [],
          add: [
            {
              id: 'add-existing',
              name: 'Rain Cover',
              category: 'Miscellaneous',
              quantity: 1,
            },
          ],
          remove: [],
        },
      ])
    );
    localStorage.setItem('cameraPowerPlanner_autoGearSeeded', '1');

    env = setupScriptEnvironment();
    const { getAutoGearRules, setLanguage } = env.utils;

    setLanguage('en');

    const rules = getAutoGearRules();
    const matteboxTriggers = rules
      .filter(rule => Array.isArray(rule.mattebox) && rule.mattebox.length)
      .map(rule => rule.mattebox.join(' + '));

    expect(matteboxTriggers).toEqual(expect.arrayContaining([
      'Swing Away',
      'Rod based',
      'Clamp On',
    ]));
  });

  test('seeding factory defaults includes video distribution rules', () => {
    env = setupScriptEnvironment();

    const {
      getAutoGearRules,
      syncAutoGearRulesFromStorage,
      __autoGearInternals,
    } = env.utils;

    syncAutoGearRulesFromStorage([]);
    if (__autoGearInternals?.clearAutoGearDefaultsSeeded) {
      __autoGearInternals.clearAutoGearDefaultsSeeded();
    }
    if (__autoGearInternals?.seedAutoGearRulesFromCurrentProject) {
      __autoGearInternals.seedAutoGearRulesFromCurrentProject();
    }

    const rules = getAutoGearRules();
    const select = document.getElementById('videoDistribution');
    const expectedValues = Array.from(select?.options || [])
      .map(option => (option && typeof option.value === 'string' ? option.value.trim() : ''))
      .filter(value => value && value.toLowerCase() !== 'none');
    const uniqueExpected = Array.from(new Set(expectedValues));

    uniqueExpected.forEach(value => {
      const exists = rules.some(rule => Array.isArray(rule.videoDistribution)
        && rule.videoDistribution.includes(value)
        && Array.isArray(rule.add)
        && rule.add.length > 0);
      expect(exists).toBe(true);
    });
  });

  test('seeding factory defaults includes camera handle rules', () => {
    env = setupScriptEnvironment();

    const {
      getAutoGearRules,
      syncAutoGearRulesFromStorage,
      __autoGearInternals,
    } = env.utils;

    syncAutoGearRulesFromStorage([]);
    if (__autoGearInternals?.clearAutoGearDefaultsSeeded) {
      __autoGearInternals.clearAutoGearDefaultsSeeded();
    }

    const handleSelect = document.getElementById('cameraHandle');
    if (handleSelect) {
      Array.from(handleSelect.options || []).forEach(option => {
        option.selected = option.value === 'Hand Grips';
      });
    }

    if (__autoGearInternals?.seedAutoGearRulesFromCurrentProject) {
      __autoGearInternals.seedAutoGearRulesFromCurrentProject();
    }

    const rules = getAutoGearRules();
    const handleRule = rules.find(rule =>
      Array.isArray(rule.cameraHandle)
      && rule.cameraHandle.includes('Hand Grips')
    );

    expect(handleRule).toBeDefined();
    expect(handleRule.add).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.stringContaining('SHAPE Telescopic Handle ARRI Rosette Kit 12'),
      }),
    ]));
  });

  test('seeding factory defaults adds camera handle rules without preselecting handles', () => {
    env = setupScriptEnvironment();

    const {
      getAutoGearRules,
      syncAutoGearRulesFromStorage,
      __autoGearInternals,
    } = env.utils;

    syncAutoGearRulesFromStorage([]);
    if (__autoGearInternals?.clearAutoGearDefaultsSeeded) {
      __autoGearInternals.clearAutoGearDefaultsSeeded();
    }

    if (__autoGearInternals?.seedAutoGearRulesFromCurrentProject) {
      __autoGearInternals.seedAutoGearRulesFromCurrentProject();
    }

    const rules = getAutoGearRules();
    const handleRule = rules.find(rule =>
      Array.isArray(rule.cameraHandle)
      && rule.cameraHandle.includes('Hand Grips')
    );

    expect(handleRule).toBeDefined();
    expect(handleRule?.add || []).not.toHaveLength(0);
  });

  test('seeding factory defaults includes viewfinder extension rules', () => {
    env = setupScriptEnvironment();

    const {
      getAutoGearRules,
      syncAutoGearRulesFromStorage,
      __autoGearInternals,
    } = env.utils;

    syncAutoGearRulesFromStorage([]);
    if (__autoGearInternals?.clearAutoGearDefaultsSeeded) {
      __autoGearInternals.clearAutoGearDefaultsSeeded();
    }

    const viewfinderSelect = document.getElementById('viewfinderExtension');
    if (viewfinderSelect) {
      Array.from(viewfinderSelect.options || []).forEach(option => {
        option.selected = option.value === 'ARRI VEB-3 Viewfinder Extension Bracket';
      });
    }

    if (__autoGearInternals?.seedAutoGearRulesFromCurrentProject) {
      __autoGearInternals.seedAutoGearRulesFromCurrentProject();
    }

    const rules = getAutoGearRules();
    const viewfinderRule = rules.find(rule =>
      Array.isArray(rule.viewfinderExtension)
      && rule.viewfinderExtension.includes('ARRI VEB-3 Viewfinder Extension Bracket')
    );

    expect(viewfinderRule).toBeDefined();
    expect(viewfinderRule.add).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'ARRI VEB-3 Viewfinder Extension Bracket',
      }),
    ]));
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

  test('supports signed quick entries when adding automatic gear items', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    const scenarios = document.getElementById('autoGearScenarios');
    const firstSelectable = Array.from(scenarios.options).find(opt => opt.value);
    if (firstSelectable) firstSelectable.selected = true;

    const ruleNameInput = document.getElementById('autoGearRuleName');
    ruleNameInput.value = 'Signed quick entries';

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = 'Monitoring';

    const addNameInput = document.getElementById('autoGearAddName');
    addNameInput.value = '+Director handheld monitor;-Obsolete director monitor';
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddItemButton').click();

    document.getElementById('autoGearSaveRule').click();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const savedRule = stored.find(rule => rule.label === 'Signed quick entries');
    expect(savedRule).toBeDefined();
    expect(savedRule.add).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Director handheld monitor', category: 'Monitoring' })
    ]));
    expect(savedRule.remove).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Obsolete director monitor', category: 'Monitoring' })
    ]));
  });

  test('allows creating a mattebox-only automatic gear rule', () => {
    env = setupScriptEnvironment();

    const addRuleButton = document.getElementById('autoGearAddRule');
    addRuleButton.click();

    const ruleNameInput = document.getElementById('autoGearRuleName');
    ruleNameInput.value = 'Clamp-on extras';

    const matteboxSelect = document.getElementById('autoGearMattebox');
    const clampOption = Array.from(matteboxSelect.options).find(opt => opt.value === 'Clamp On');
    if (clampOption) {
      clampOption.selected = true;
    }

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = 'Matte box + filter';
    document.getElementById('autoGearAddName').value = 'Spare clamp adapter';
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddItemButton').click();

    document.getElementById('autoGearSaveRule').click();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Clamp-on extras',
          scenarios: [],
          mattebox: ['Clamp On'],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: [],
        })
      ])
    );
  });

  test('adds screen size, selector and notes details to applied gear items', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    const matteboxSelect = document.getElementById('autoGearMattebox');
    const matteboxOption = Array.from(matteboxSelect.options).find(opt => opt.value);
    const matteboxValue = matteboxOption ? matteboxOption.value : '';
    if (matteboxOption) matteboxOption.selected = true;

    const ruleNameInput = document.getElementById('autoGearRuleName');
    ruleNameInput.value = 'Monitor package';

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = 'Monitoring';
    document.getElementById('autoGearAddName').value = 'Director monitor station';
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddScreenSize').value = '17"';
    document.getElementById('autoGearAddSelectorType').value = 'monitor';
    document.getElementById('autoGearAddSelectorDefault').value = 'SmallHD Ultra 7';
    document.getElementById('autoGearAddNotes').value = 'incl. Directors cage';

    document.getElementById('autoGearAddItemButton').click();
    document.getElementById('autoGearSaveRule').click();

    const storedRules = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const savedRule = storedRules.find(rule => rule.label === 'Monitor package');
    expect(savedRule).toBeDefined();
    if (!savedRule) return;
    expect(savedRule.mattebox).toEqual(expect.arrayContaining([matteboxValue]));
    expect(savedRule.add).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'Director monitor station',
        category: 'Monitoring',
        screenSize: '17"',
        selectorType: 'monitor',
        selectorDefault: 'SmallHD Ultra 7',
        selectorEnabled: true,
        notes: 'incl. Directors cage'
      })
    ]));

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Monitoring</td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
    `;

    const { applyAutoGearRulesToTableHtml } = env.utils;
    const result = applyAutoGearRulesToTableHtml(tableHtml, { mattebox: matteboxValue });
    const container = document.createElement('div');
    container.innerHTML = result;

    const entry = container.querySelector('[data-gear-name="Director monitor station"]');
    expect(entry).not.toBeNull();
    expect(entry.textContent).toContain('17"');
    expect(entry.textContent).toContain('incl. Directors cage');
    const select = entry.querySelector('select');
    expect(select).not.toBeNull();
    expect(select?.hasAttribute('size')).toBe(false);
    expect(select?.multiple).toBe(false);
    expect(select.value).toBe('SmallHD Ultra 7');
    expect(Array.from(select.options || [])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: 'SmallHD Ultra 7' })
      ])
    );
  });

  test('allows editing automatic gear draft items', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    const addNameInput = document.getElementById('autoGearAddName');
    const addCategorySelect = document.getElementById('autoGearAddCategory');
    const addQuantityInput = document.getElementById('autoGearAddQuantity');
    const addSelectorType = document.getElementById('autoGearAddSelectorType');
    const addSelectorDefault = document.getElementById('autoGearAddSelectorDefault');
    const addButton = document.getElementById('autoGearAddItemButton');

    expect(addNameInput).not.toBeNull();
    expect(addCategorySelect).not.toBeNull();
    expect(addQuantityInput).not.toBeNull();
    expect(addSelectorType).not.toBeNull();
    expect(addSelectorDefault).not.toBeNull();
    expect(addButton).not.toBeNull();

    addNameInput.value = 'Focus monitor';
    addCategorySelect.value = 'Monitoring';
    addQuantityInput.value = '1';
    addSelectorType.value = 'monitor';
    addSelectorDefault.value = 'SmallHD Focus';
    addButton.click();

    const initialEditButton = document.querySelector('#autoGearAddList .auto-gear-edit-entry');
    expect(initialEditButton).not.toBeNull();
    initialEditButton.click();

    expect(addButton.textContent).toContain('Save item');
    expect(addNameInput.value).toBe('Focus monitor');

    addNameInput.value = 'Director monitor';
    addQuantityInput.value = '2';
    addSelectorDefault.value = 'SmallHD Cine 7';
    addButton.click();

    const addListItems = document.querySelectorAll('#autoGearAddList .auto-gear-item');
    expect(addListItems).toHaveLength(1);
    const updatedText = addListItems[0]?.textContent || '';
    expect(updatedText).toContain('Director monitor');
    expect(updatedText).toContain('+2');
    expect(updatedText).toContain('Monitoring');
    expect(addButton.textContent).toContain('Add item');

    const editButtonAfterUpdate = document.querySelector('#autoGearAddList .auto-gear-edit-entry');
    expect(editButtonAfterUpdate).not.toBeNull();
    editButtonAfterUpdate.click();

    expect(addButton.textContent).toContain('Save item');
    expect(addNameInput.value).toBe('Director monitor');
    expect(addSelectorDefault.value).toBe('SmallHD Cine 7');

    const editButtonCancel = document.querySelector('#autoGearAddList .auto-gear-edit-entry');
    expect(editButtonCancel).not.toBeNull();
    editButtonCancel.click();

    expect(addNameInput.value).toBe('');
    expect(addButton.textContent).toContain('Add item');
  });

  test('allows creating a camera handle automatic gear rule', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    document.getElementById('autoGearRuleName').value = 'Handle additions';

    const handleSelect = document.getElementById('autoGearCameraHandle');
    const gripsOption = Array.from(handleSelect.options).find(opt => opt.value === 'Hand Grips');
    if (gripsOption) gripsOption.selected = true;

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = 'Rigging';
    document.getElementById('autoGearAddName').value = 'Spare rosette adapter';
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddItemButton').click();

    document.getElementById('autoGearSaveRule').click();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Handle additions',
          scenarios: [],
          mattebox: [],
          cameraHandle: ['Hand Grips'],
          viewfinderExtension: [],
          videoDistribution: [],
        })
      ])
    );
  });

  test('allows creating a viewfinder extension automatic gear rule', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    document.getElementById('autoGearRuleName').value = 'Viewfinder support';

    const vfSelect = document.getElementById('autoGearViewfinderExtension');
    const bracketOption = Array.from(vfSelect.options).find(opt => opt.value.includes('Viewfinder Extension Bracket'));
    if (bracketOption) bracketOption.selected = true;

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = 'Camera Support';
    document.getElementById('autoGearAddName').value = 'Extra VF cable clamp';
    document.getElementById('autoGearAddQuantity').value = '1';
    document.getElementById('autoGearAddItemButton').click();

    document.getElementById('autoGearSaveRule').click();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Viewfinder support',
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: ['ARRI VEB-3 Viewfinder Extension Bracket'],
          videoDistribution: [],
        })
      ])
    );
  });

  test('allows creating a video distribution automatic gear rule', () => {
    env = setupScriptEnvironment();

    document.getElementById('autoGearAddRule').click();

    document.getElementById('autoGearRuleName').value = 'Wireless village';

    const videoSelect = document.getElementById('autoGearVideoDistribution');
    const iosOption = Array.from(videoSelect.options).find(opt => opt.value === 'IOS Video');
    if (iosOption) iosOption.selected = true;

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    addCategorySelect.value = 'Monitoring';
    document.getElementById('autoGearAddName').value = 'Additional iPad receivers';
    document.getElementById('autoGearAddQuantity').value = '2';
    document.getElementById('autoGearAddItemButton').click();

    document.getElementById('autoGearSaveRule').click();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Wireless village',
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: ['IOS Video'],
        })
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

  test('shared rule merging keeps distinct video distribution triggers', () => {
    env = setupScriptEnvironment();

    const { importAutoGearRulesFromData, applySharedSetup, getAutoGearRules } = env.utils;

    const baseRule = {
      id: 'base-video-rule',
      label: 'Wireless village',
      scenarios: ['Village'],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      add: [
        { id: 'base-add', name: 'Village monitor kit', category: 'Monitoring', quantity: 1 }
      ],
      remove: [],
    };

    importAutoGearRulesFromData([baseRule], { silent: true });

    const sharedRule = {
      id: 'shared-video-rule',
      label: 'Wireless village',
      scenarios: ['Village'],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: ['IOS Video'],
      add: [
        { id: 'base-add', name: 'Village monitor kit', category: 'Monitoring', quantity: 1 }
      ],
      remove: [],
    };

    applySharedSetup({ setupName: 'Shared import' }, {
      sharedAutoGearRules: [sharedRule],
      autoGearMode: ['global'],
    });

    const merged = getAutoGearRules();
    expect(merged).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'base-video-rule', videoDistribution: [] }),
      expect.objectContaining({ id: 'shared-video-rule', videoDistribution: ['IOS Video'] }),
    ]));
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
    fakeTimersActive = true;
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

    const backupSelect = document.getElementById('autoGearBackupSelect');
    expect(backupSelect).not.toBeNull();
    const backupOptions = Array.from(backupSelect.options).filter(option => option.value);
    expect(backupOptions.length).toBeGreaterThan(0);

  });

  test('restoring an automatic backup replaces the current rules', () => {
    fakeTimersActive = true;
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

    const backupSelect = document.getElementById('autoGearBackupSelect');
    const backupRestoreButton = document.getElementById('autoGearBackupRestore');
    expect(backupSelect).not.toBeNull();
    expect(backupRestoreButton).not.toBeNull();
    const selectableOption = Array.from(backupSelect.options).find(option => option.value);
    expect(selectableOption).toBeDefined();
    backupSelect.value = selectableOption.value;
    backupSelect.dispatchEvent(new Event('change'));
    const originalConfirm = window.confirm;
    window.confirm = jest.fn(() => true);
    backupRestoreButton.click();
    window.confirm = originalConfirm;

    const storedRules = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(storedRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Backup original' })
      ])
    );

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

  test('restore cancels when automatic backup fails before import', () => {
    env = setupScriptEnvironment();

    const restoreInput = document.getElementById('restoreSettingsInput');
    const fakeFile = { name: 'failed-backup.json' };

    Object.defineProperty(restoreInput, 'files', {
      configurable: true,
      get: () => [fakeFile]
    });

    const originalAlert = window.alert;
    const originalFileReader = window.FileReader;
    const originalCreateObjectURL = window.URL.createObjectURL;
    const originalCreateElement = document.createElement;

    window.alert = jest.fn();
    window.URL.createObjectURL = jest.fn(() => {
      throw new Error('createObjectURL failed');
    });
    jest.spyOn(document, 'createElement').mockImplementation(tagName => {
      if (String(tagName).toLowerCase() === 'a') {
        return { style: {}, click: jest.fn() };
      }
      return originalCreateElement.call(document, tagName);
    });
    window.FileReader = jest.fn(() => ({
      onload: null,
      onerror: null,
      readAsText: jest.fn()
    }));

    try {
      restoreInput.dispatchEvent(new Event('change'));

      expect(window.URL.createObjectURL).toHaveBeenCalled();
      expect(window.FileReader).not.toHaveBeenCalled();

      const textsByLang = window.texts || {};
      const activeLang = typeof window.currentLang === 'string' ? window.currentLang : 'en';
      const expectedMessage =
        (textsByLang[activeLang] && textsByLang[activeLang].restoreBackupFailed)
          || (textsByLang.en && textsByLang.en.restoreBackupFailed)
          || 'Backup failed. Restore cancelled.';
      expect(window.alert).toHaveBeenCalledWith(expectedMessage);
    } finally {
      window.alert = originalAlert;
      window.FileReader = originalFileReader;
      window.URL.createObjectURL = originalCreateObjectURL;
      document.createElement.mockRestore();
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

  test('allows saving, applying, and deleting automatic gear presets', () => {
    env = setupScriptEnvironment();

    const presetSelect = document.getElementById('autoGearPresetSelect');
    const saveButton = document.getElementById('autoGearSavePreset');
    const deleteButton = document.getElementById('autoGearDeletePreset');

    expect(presetSelect).not.toBeNull();
    expect(saveButton).not.toBeNull();
    expect(deleteButton).not.toBeNull();

    const baseRule = {
      id: 'rule-outdoor',
      label: 'Outdoor adjustments',
      scenarios: ['Outdoor'],
      add: [
        { id: 'add-monitor', name: 'Weather cover', category: 'Accessories', quantity: 1 }
      ],
      remove: [],
    };

    env.utils.syncAutoGearRulesFromStorage([baseRule]);

    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('Outdoor preset');
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    try {
      saveButton.click();

      const storedPresetsRaw = localStorage.getItem('cameraPowerPlanner_autoGearPresets');
      expect(storedPresetsRaw).toBeTruthy();
      const storedPresets = JSON.parse(storedPresetsRaw);
      expect(storedPresets).toHaveLength(1);
      const preset = storedPresets[0];
      expect(preset.label).toBe('Outdoor preset');
      expect(preset.rules.map(stripRuleIds)).toEqual([stripRuleIds(baseRule)]);
      expect(presetSelect.value).toBe(preset.id);
      expect(presetSelect.disabled).toBe(false);
      expect(localStorage.getItem('cameraPowerPlanner_autoGearActivePreset')).toBe(preset.id);

      const replacementRule = {
        id: 'rule-indoor',
        label: 'Indoor replacement',
        scenarios: ['Indoor'],
        add: [
          { id: 'add-light', name: 'LED panel', category: 'Lighting', quantity: 2 }
        ],
        remove: [],
      };

      env.utils.syncAutoGearRulesFromStorage([replacementRule]);
      expect(env.utils.getAutoGearRules().map(stripRuleIds)).toEqual([stripRuleIds(replacementRule)]);
      expect(presetSelect.value).toBe('');

      presetSelect.value = preset.id;
      presetSelect.dispatchEvent(new Event('change'));

      expect(env.utils.getAutoGearRules().map(stripRuleIds)).toEqual([stripRuleIds(baseRule)]);
      expect(localStorage.getItem('cameraPowerPlanner_autoGearActivePreset')).toBe(preset.id);
      expect(presetSelect.value).toBe(preset.id);

      deleteButton.click();

      const clearedPresetsRaw = localStorage.getItem('cameraPowerPlanner_autoGearPresets');
      const clearedPresets = clearedPresetsRaw ? JSON.parse(clearedPresetsRaw) : [];
      expect(clearedPresets).toEqual([]);
      expect(localStorage.getItem('cameraPowerPlanner_autoGearActivePreset')).toBeNull();
      expect(presetSelect.value).toBe('');
      expect(presetSelect.disabled).toBe(true);
      expect(deleteButton.disabled).toBe(true);
    } finally {
      promptSpy.mockRestore();
      confirmSpy.mockRestore();
    }
  });

  test('creates and updates an autosaved preset when rules change without manual presets', () => {
    env = setupScriptEnvironment();

    const starterRule = {
      id: 'rule-dawn',
      label: 'Dawn coverage',
      scenarios: ['Sunrise'],
      add: [
        { id: 'add-led', name: 'LED Panel', category: 'Lighting', quantity: 1 }
      ],
      remove: [],
    };

    env.utils.syncAutoGearRulesFromStorage([starterRule]);

    const storedPresetsRaw = localStorage.getItem('cameraPowerPlanner_autoGearPresets');
    expect(storedPresetsRaw).toBeTruthy();
    const storedPresets = JSON.parse(storedPresetsRaw);
    expect(storedPresets).toHaveLength(1);
    const autoPreset = storedPresets[0];
    expect(autoPreset.label).toBe(window.texts.en.autoGearAutoPresetLabel);
    expect(autoPreset.rules.map(stripRuleIds)).toEqual([stripRuleIds(starterRule)]);

    const autoPresetId = localStorage.getItem('cameraPowerPlanner_autoGearAutoPreset');
    expect(autoPresetId).toBe(autoPreset.id);
    expect(localStorage.getItem('cameraPowerPlanner_autoGearActivePreset')).toBe(autoPreset.id);

    const updatedRule = {
      id: 'rule-dusk',
      label: 'Dusk variation',
      scenarios: ['Sunset'],
      add: [
        { id: 'add-battery', name: 'Spare Battery', category: 'Power', quantity: 2 }
      ],
      remove: [],
    };

    env.utils.syncAutoGearRulesFromStorage([updatedRule]);

    const updatedPresets = JSON.parse(localStorage.getItem('cameraPowerPlanner_autoGearPresets'));
    expect(updatedPresets).toHaveLength(1);
    const updatedAutoPreset = updatedPresets.find(preset => preset.id === autoPresetId);
    expect(updatedAutoPreset).toBeDefined();
    expect(updatedAutoPreset.rules.map(stripRuleIds)).toEqual([stripRuleIds(updatedRule)]);
  });

  test('stops autosaving once a manual preset is created', () => {
    env = setupScriptEnvironment();

    const initialRule = {
      id: 'rule-initial',
      label: 'Initial rule',
      scenarios: ['Studio'],
      add: [
        { id: 'add-diffusion', name: 'Diffusion Panel', category: 'Lighting', quantity: 1 }
      ],
      remove: [],
    };

    env.utils.syncAutoGearRulesFromStorage([initialRule]);

    const autoPresetId = localStorage.getItem('cameraPowerPlanner_autoGearAutoPreset');
    expect(autoPresetId).toBeTruthy();

    const saveButton = document.getElementById('autoGearSavePreset');
    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('Manual preset');

    try {
      saveButton.click();
    } finally {
      promptSpy.mockRestore();
    }

    expect(localStorage.getItem('cameraPowerPlanner_autoGearAutoPreset')).toBeNull();

    const storedAfterSaveRaw = localStorage.getItem('cameraPowerPlanner_autoGearPresets');
    expect(storedAfterSaveRaw).toBeTruthy();
    const storedAfterSave = JSON.parse(storedAfterSaveRaw);
    const autosavedPreset = storedAfterSave.find(preset => preset.id === autoPresetId);
    expect(autosavedPreset).toBeDefined();
    const autosavedRulesBefore = autosavedPreset.rules.map(stripRuleIds);

    const newRule = {
      id: 'rule-followup',
      label: 'Follow-up rule',
      scenarios: ['Studio'],
      add: [
        { id: 'add-cable', name: 'Extension Cable', category: 'Power', quantity: 2 }
      ],
      remove: [],
    };

    env.utils.syncAutoGearRulesFromStorage([newRule]);

    const finalPresets = JSON.parse(localStorage.getItem('cameraPowerPlanner_autoGearPresets'));
    const autosavedFinal = finalPresets.find(preset => preset.id === autoPresetId);
    expect(autosavedFinal).toBeDefined();
    expect(autosavedFinal.rules.map(stripRuleIds)).toEqual(autosavedRulesBefore);
  });

  test('keeps automatic backups hidden until explicitly enabled', () => {
    localStorage.setItem(
      BACKUP_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'backup-1',
          createdAt: '2024-06-01T12:00:00.000Z',
          rules: [
            {
              id: 'rule-outdoor',
              label: 'Outdoor adjustments',
              scenarios: ['Outdoor'],
              add: [
                { id: 'add-monitor', name: 'Weather cover', category: 'Accessories', quantity: 1 }
              ],
              remove: [],
            }
          ],
        },
      ]),
    );

    env = setupScriptEnvironment();
    env.utils.syncAutoGearRulesFromStorage(env.utils.getAutoGearRules());

    const toggle = document.getElementById('autoGearShowBackups');
    const backupsSection = document.getElementById('autoGearBackupsSection');
    const backupsContainer = document.getElementById('autoGearBackupControls');
    const hiddenNotice = document.getElementById('autoGearBackupsHidden');
    const select = document.getElementById('autoGearBackupSelect');
    const restoreButton = document.getElementById('autoGearBackupRestore');

    expect(toggle).not.toBeNull();
    expect(backupsSection).not.toBeNull();
    expect(backupsContainer).not.toBeNull();
    expect(hiddenNotice).not.toBeNull();
    expect(select).not.toBeNull();
    expect(restoreButton).not.toBeNull();

    expect(toggle.checked).toBe(false);
    expect(backupsContainer.hidden).toBe(true);
    expect(hiddenNotice.hidden).toBe(false);
    expect(select.disabled).toBe(true);
    expect(restoreButton.disabled).toBe(true);
    expect(localStorage.getItem('cameraPowerPlanner_autoGearShowBackups')).toBeNull();

    toggle.checked = true;
    toggle.dispatchEvent(new Event('change'));

    expect(backupsSection.classList.contains('auto-gear-backups-collapsed')).toBe(false);
    expect(backupsSection.getAttribute('aria-expanded')).toBe('true');
    expect(backupsContainer.hidden).toBe(false);
    expect(backupsContainer.getAttribute('aria-hidden')).toBe('false');
    expect(hiddenNotice.hidden).toBe(true);
    expect(select.disabled).toBe(false);
    expect(restoreButton.disabled).toBe(true);
    expect(localStorage.getItem('cameraPowerPlanner_autoGearShowBackups')).toBe('1');
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
