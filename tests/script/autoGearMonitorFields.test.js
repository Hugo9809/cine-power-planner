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
});
