const path = require('path');

describe('auto gear ui helpers', () => {
  let ui;
  let picker;

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = `
      <select id="autoGearConditionPicker"></select>
      <button id="addBtn"></button>
      <button id="removeBtn"></button>
    `;
    picker = document.getElementById('autoGearConditionPicker');
    global.autoGearConditionSelect = picker;
    global.texts = { en: { autoGearConditionAddShortcut: 'Add', autoGearConditionRemove: 'Remove' } };
    global.currentLang = 'en';
    global.AUTO_GEAR_CONDITION_KEYS = ['scenarios'];
    const addShortcuts = { scenarios: document.getElementById('addBtn') };
    const removeButtons = { scenarios: document.getElementById('removeBtn') };
    global.autoGearConditionAddShortcuts = addShortcuts;
    global.autoGearConditionRemoveButtons = removeButtons;
    global.getAutoGearConditionConfig = key => ({
      addShortcut: addShortcuts[key],
      removeButton: removeButtons[key],
    });
    global.setButtonLabelWithIconBinding = (btn, label) => { btn.textContent = label; };
    global.ICON_GLYPHS = { add: '+', minus: '-' };
    ui = require(path.join(__dirname, '../../src/scripts/auto-gear/ui.js'));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete global.autoGearConditionSelect;
    delete global.texts;
    delete global.currentLang;
    delete global.AUTO_GEAR_CONDITION_KEYS;
    delete global.autoGearConditionAddShortcuts;
    delete global.autoGearConditionRemoveButtons;
    delete global.getAutoGearConditionConfig;
    delete global.setButtonLabelWithIconBinding;
    delete global.ICON_GLYPHS;
    delete global.callCoreFunctionIfAvailable;
    jest.resetModules();
  });

  test('configureAutoGearConditionButtons updates button labels', () => {
    ui.configureAutoGearConditionButtons();
    expect(document.getElementById('addBtn').getAttribute('aria-label')).toBe('Add');
    expect(document.getElementById('removeBtn').getAttribute('aria-label')).toBe('Remove');
  });

  test('createDeferredAutoGearRefresher triggers persistence call', () => {
    const spy = jest.fn();
    global.callCoreFunctionIfAvailable = spy;
    const refresher = ui.createDeferredAutoGearRefresher('refreshAutoGearScenarioOptions');
    refresher(['A']);
    expect(spy).toHaveBeenCalledWith('refreshAutoGearScenarioOptions', [['A']], { defer: true });
  });

  test('focusAutoGearConditionPicker focuses select element', () => {
    const focusSpy = jest.spyOn(picker, 'focus');
    ui.focusAutoGearConditionPicker();
    expect(focusSpy).toHaveBeenCalled();
  });
});
