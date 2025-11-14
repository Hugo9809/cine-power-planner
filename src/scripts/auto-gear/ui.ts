/*
 * Auto Gear UI helpers extracted from the runtime so DOM-related logic can be
 * tested without loading the entire application shell.
 */
// @ts-nocheck
/* global callCoreFunctionIfAvailable, autoGearConditionSelect, texts, currentLang,
  AUTO_GEAR_CONDITION_KEYS, getAutoGearConditionConfig, setButtonLabelWithIconBinding, ICON_GLYPHS */

const AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS = {
  focus: 'autoGearDefaultFocusMonitorLabel',
  handheld7: 'autoGearDefaultHandheldMonitorLabel',
  combo15: 'autoGearDefaultComboMonitorLabel',
  director15: 'autoGearDefaultDirectorMonitorLabel',
};

const createDeferredAutoGearRefresher = functionName => selected =>
  callCoreFunctionIfAvailable(functionName, [selected], { defer: true });

function focusAutoGearConditionPicker() {
  if (autoGearConditionSelect) {
    try {
      autoGearConditionSelect.focus({ preventScroll: true });
    } catch (focusError) {
      void focusError;
      autoGearConditionSelect.focus();
    }
  }
}

function configureAutoGearConditionButtons() {
  const addLabel = texts[currentLang]?.autoGearConditionAddShortcut
    || texts.en?.autoGearConditionAddShortcut
    || 'Add another condition';
  const removeLabel = texts[currentLang]?.autoGearConditionRemove
    || texts.en?.autoGearConditionRemove
    || 'Remove this condition';
  AUTO_GEAR_CONDITION_KEYS.forEach(key => {
    const config = getAutoGearConditionConfig(key);
    if (!config) return;
    if (config.addShortcut) {
      setButtonLabelWithIconBinding(config.addShortcut, '', ICON_GLYPHS.add);
      config.addShortcut.setAttribute('aria-label', addLabel);
      config.addShortcut.setAttribute('title', addLabel);
      config.addShortcut.setAttribute('data-help', addLabel);
    }
    if (config.removeButton) {
      setButtonLabelWithIconBinding(config.removeButton, '', ICON_GLYPHS.minus);
      config.removeButton.setAttribute('aria-label', removeLabel);
      config.removeButton.setAttribute('title', removeLabel);
      config.removeButton.setAttribute('data-help', removeLabel);
    }
  });
}

const AUTO_GEAR_UI_EXPORTS_BRIDGE = {
  createDeferredAutoGearRefresher,
  focusAutoGearConditionPicker,
  configureAutoGearConditionButtons,
  AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTO_GEAR_UI_EXPORTS_BRIDGE;
}

if (typeof globalThis !== 'undefined') {
  const target =
    (typeof globalThis.AUTO_GEAR_UI_HELPERS === 'object' && globalThis.AUTO_GEAR_UI_HELPERS)
      ? globalThis.AUTO_GEAR_UI_HELPERS
      : (globalThis.AUTO_GEAR_UI_HELPERS = {});
  Object.assign(target, AUTO_GEAR_UI_EXPORTS_BRIDGE);
  globalThis.AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS = AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS;
}
