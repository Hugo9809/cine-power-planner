function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS = {
  focus: 'autoGearDefaultFocusMonitorLabel',
  handheld7: 'autoGearDefaultHandheldMonitorLabel',
  combo15: 'autoGearDefaultComboMonitorLabel',
  director15: 'autoGearDefaultDirectorMonitorLabel'
};
function resolveAutoGearConditionKeys() {
  if (typeof AUTO_GEAR_CONDITION_KEYS !== 'undefined' && Array.isArray(AUTO_GEAR_CONDITION_KEYS)) {
    return AUTO_GEAR_CONDITION_KEYS;
  }
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var helpers = scope && _typeof(scope.AUTO_GEAR_UI_HELPERS) === 'object' && scope.AUTO_GEAR_UI_HELPERS ? scope.AUTO_GEAR_UI_HELPERS : null;
  if (helpers) {
    if (Array.isArray(helpers.AUTO_GEAR_CONDITION_KEYS)) {
      return helpers.AUTO_GEAR_CONDITION_KEYS;
    }
    if (helpers.autoGearConditionSelects && _typeof(helpers.autoGearConditionSelects) === 'object') {
      return Object.keys(helpers.autoGearConditionSelects);
    }
  }
  return [];
}
var createDeferredAutoGearRefresher = function createDeferredAutoGearRefresher(functionName) {
  return function (selected) {
    return callCoreFunctionIfAvailable(functionName, [selected], {
      defer: true
    });
  };
};
function focusAutoGearConditionPicker() {
  if (autoGearConditionSelect) {
    try {
      autoGearConditionSelect.focus({
        preventScroll: true
      });
    } catch (focusError) {
      void focusError;
      autoGearConditionSelect.focus();
    }
  }
}
function configureAutoGearConditionButtons() {
  var _a, _b, _c, _d;
  var addLabel = ((_a = texts[currentLang]) === null || _a === void 0 ? void 0 : _a.autoGearConditionAddShortcut) || ((_b = texts.en) === null || _b === void 0 ? void 0 : _b.autoGearConditionAddShortcut) || 'Add another condition';
  var removeLabel = ((_c = texts[currentLang]) === null || _c === void 0 ? void 0 : _c.autoGearConditionRemove) || ((_d = texts.en) === null || _d === void 0 ? void 0 : _d.autoGearConditionRemove) || 'Remove this condition';
  var conditionKeys = resolveAutoGearConditionKeys();
  if (!conditionKeys.length) return;
  conditionKeys.forEach(function (key) {
    var config = getAutoGearConditionConfig(key);
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
var AUTO_GEAR_UI_EXPORTS_BRIDGE = {
  createDeferredAutoGearRefresher: createDeferredAutoGearRefresher,
  focusAutoGearConditionPicker: focusAutoGearConditionPicker,
  configureAutoGearConditionButtons: configureAutoGearConditionButtons,
  AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS: AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS
};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTO_GEAR_UI_EXPORTS_BRIDGE;
}
if (typeof globalThis !== 'undefined') {
  var target = _typeof(globalThis.AUTO_GEAR_UI_HELPERS) === 'object' && globalThis.AUTO_GEAR_UI_HELPERS ? globalThis.AUTO_GEAR_UI_HELPERS : globalThis.AUTO_GEAR_UI_HELPERS = {};
  Object.assign(target, AUTO_GEAR_UI_EXPORTS_BRIDGE);
  globalThis.AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS = AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS;
}