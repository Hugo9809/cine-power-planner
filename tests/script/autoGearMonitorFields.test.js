const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('automatic gear monitor field visibility', () => {
  let cleanup;

  afterEach(() => {
    if (cleanup) {
      cleanup();
      cleanup = undefined;
    }
  });

  test('monitor-specific fields are hidden unless the monitoring category is selected', () => {
    const env = setupScriptEnvironment();
    cleanup = env.cleanup;

    const addRuleButton = document.getElementById('autoGearAddRule');
    expect(addRuleButton).not.toBeNull();
    addRuleButton.click();

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    expect(addCategorySelect).not.toBeNull();

    const screenField = document.getElementById('autoGearAddScreenSize')?.closest('.auto-gear-field');
    const selectorTypeField = document.getElementById('autoGearAddSelectorType')?.closest('.auto-gear-field');
    const selectorDefaultField = document.getElementById('autoGearAddSelectorDefault')?.closest('.auto-gear-field');
    const selectorIncludeField = document.getElementById('autoGearAddSelectorInclude')?.closest('.auto-gear-field');

    const trackedFields = [screenField, selectorTypeField, selectorDefaultField, selectorIncludeField];
    trackedFields.forEach(field => expect(field).not.toBeNull());

    const expectFieldsVisible = visible => {
      trackedFields.forEach(field => {
        const element = field;
        expect(element.hidden).toBe(!visible);
        expect(element.hasAttribute('hidden')).toBe(!visible);
        expect(element.getAttribute('aria-hidden')).toBe(visible ? null : 'true');
        expect(element.style.display === 'none').toBe(!visible);
      });
    };

    expectFieldsVisible(false);

    addCategorySelect.value = 'Monitoring';
    addCategorySelect.dispatchEvent(new Event('change', { bubbles: true }));
    expectFieldsVisible(true);

    addCategorySelect.value = 'Matte box + filter';
    addCategorySelect.dispatchEvent(new Event('change', { bubbles: true }));
    expectFieldsVisible(false);
  });

  test('default device selector filters by monitor size', () => {
    const env = setupScriptEnvironment({
      devices: {
        monitors: {
          'Alpha 7" Monitor': { screenSizeInches: 7 },
          'Bravo 12" Monitor': { screenSizeInches: 12 },
          'Charlie 10" Monitor': { screenSizeInches: 10 },
        },
        directorMonitors: {
          'Director 11" Monitor': { screenSizeInches: 11 },
          'Director 20" Monitor': { screenSizeInches: 20 },
          'Director 10" Monitor': { screenSizeInches: 10 },
        },
      },
    });
    cleanup = env.cleanup;

    const monitorCatalog = Object.keys(window.devices?.monitors || {});
    expect(monitorCatalog).toEqual(expect.arrayContaining([
      'Alpha 7" Monitor',
      'Charlie 10" Monitor',
    ]));
    const directorCatalog = Object.keys(window.devices?.directorMonitors || {});
    expect(directorCatalog).toEqual(expect.arrayContaining([
      'Director 11" Monitor',
      'Director 20" Monitor',
    ]));

    const addRuleButton = document.getElementById('autoGearAddRule');
    expect(addRuleButton).not.toBeNull();
    addRuleButton.click();

    const addCategorySelect = document.getElementById('autoGearAddCategory');
    expect(addCategorySelect).not.toBeNull();
    addCategorySelect.value = 'Monitoring';
    addCategorySelect.dispatchEvent(new Event('change', { bubbles: true }));

    const selectorType = document.getElementById('autoGearAddSelectorType');
    const selectorDefault = document.getElementById('autoGearAddSelectorDefault');
    expect(selectorDefault).not.toBeNull();
    expect(selectorDefault.tagName).toBe('SELECT');

    selectorType.value = 'monitor';
    selectorType.dispatchEvent(new Event('change', { bubbles: true }));

    const monitorValues = Array.from(selectorDefault.options || [])
      .map(option => option.value)
      .filter(Boolean);
    expect(selectorDefault.options[0].value).toBe('');
    expect(monitorValues).toEqual([
      'Alpha 7" Monitor',
      'Charlie 10" Monitor',
    ]);
    expect(monitorValues).not.toContain('Bravo 12" Monitor');
    expect(selectorDefault.disabled).toBe(false);

    selectorType.value = 'directorMonitor';
    selectorType.dispatchEvent(new Event('change', { bubbles: true }));

    const directorValues = Array.from(selectorDefault.options || [])
      .map(option => option.value)
      .filter(Boolean);
    expect(selectorDefault.options[0].value).toBe('');
    expect(directorValues).toEqual([
      'Director 11" Monitor',
      'Director 20" Monitor',
    ]);
    expect(directorValues).not.toContain('Director 10" Monitor');
    expect(directorValues).not.toContain('Alpha 7" Monitor');
    expect(selectorDefault.disabled).toBe(false);
  });
});
