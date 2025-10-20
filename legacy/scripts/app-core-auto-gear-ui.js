function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initAutoGearUiModule(globalScope) {
  'use strict';

  var scope = globalScope || typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var existingDocument = typeof document !== 'undefined' && document || null;
  var document = existingDocument || scope && scope.document || null;
  if (!document) {
    var _AUTO_GEAR_UI_EXPORTS = {
      autoGearRuleNameInput: null,
      autoGearRuleNameLabel: null,
      autoGearScenariosSelect: null,
      autoGearScenariosLabel: null,
      autoGearScenarioModeSelectElement: null,
      autoGearScenarioModeLabel: null,
      autoGearScenarioMultiplierContainer: null,
      autoGearScenarioBaseSelect: null,
      autoGearScenarioBaseLabel: null,
      autoGearScenarioFactorInput: null,
      autoGearScenarioFactorLabel: null,
      autoGearShootingDaysMode: null,
      autoGearShootingDaysInput: null,
      autoGearShootingDaysLabel: null,
      autoGearShootingDaysHelp: null,
      autoGearShootingDaysValueLabel: null,
      autoGearMatteboxSelect: null,
      autoGearMatteboxLabel: null,
      autoGearMatteboxModeLabel: null,
      autoGearMatteboxModeSelect: null,
      autoGearCameraHandleSelect: null,
      autoGearCameraHandleLabel: null,
      autoGearCameraHandleModeLabel: null,
      autoGearCameraHandleModeSelect: null,
      autoGearViewfinderExtensionSelect: null,
      autoGearViewfinderExtensionLabel: null,
      autoGearViewfinderExtensionModeLabel: null,
      autoGearViewfinderExtensionModeSelect: null,
      autoGearDeliveryResolutionSelect: null,
      autoGearDeliveryResolutionLabel: null,
      autoGearDeliveryResolutionModeLabel: null,
      autoGearDeliveryResolutionModeSelect: null,
      autoGearVideoDistributionSelect: null,
      autoGearVideoDistributionLabel: null,
      autoGearVideoDistributionModeLabel: null,
      autoGearVideoDistributionModeSelect: null,
      autoGearCameraSelect: null,
      autoGearCameraLabel: null,
      autoGearCameraModeLabel: null,
      autoGearCameraModeSelect: null,
      autoGearOwnGearLabel: null,
      autoGearOwnGearModeLabel: null,
      autoGearOwnGearModeSelect: null,
      autoGearOwnGearSelect: null,
      autoGearCameraWeightLabel: null,
      autoGearCameraWeightOperator: null,
      autoGearCameraWeightOperatorLabel: null,
      autoGearCameraWeightValueInput: null,
      autoGearCameraWeightValueLabel: null,
      autoGearCameraWeightHelp: null,
      autoGearMonitorSelect: null,
      autoGearMonitorLabel: null,
      autoGearMonitorModeLabel: null,
      autoGearMonitorModeSelect: null,
      autoGearTripodHeadBrandSelect: null,
      autoGearTripodHeadBrandLabel: null,
      autoGearTripodHeadBrandModeLabel: null,
      autoGearTripodHeadBrandModeSelect: null,
      autoGearTripodBowlSelect: null,
      autoGearTripodBowlLabel: null,
      autoGearTripodBowlModeLabel: null,
      autoGearTripodBowlModeSelect: null,
      autoGearTripodTypesSelect: null,
      autoGearTripodTypesLabel: null,
      autoGearTripodTypesModeLabel: null,
      autoGearTripodTypesModeSelect: null,
      autoGearTripodSpreaderSelect: null,
      autoGearTripodSpreaderLabel: null,
      autoGearTripodSpreaderModeLabel: null,
      autoGearTripodSpreaderModeSelect: null,
      autoGearCrewPresentSelect: null,
      autoGearCrewPresentLabel: null,
      autoGearCrewPresentModeLabel: null,
      autoGearCrewPresentModeSelect: null,
      autoGearCrewAbsentSelect: null,
      autoGearCrewAbsentLabel: null,
      autoGearCrewAbsentModeLabel: null,
      autoGearCrewAbsentModeSelect: null,
      autoGearWirelessSelect: null,
      autoGearWirelessLabel: null,
      autoGearWirelessModeLabel: null,
      autoGearWirelessModeSelect: null,
      autoGearMotorsSelect: null,
      autoGearMotorsLabel: null,
      autoGearMotorsModeLabel: null,
      autoGearMotorsModeSelect: null,
      autoGearControllersSelect: null,
      autoGearControllersLabel: null,
      autoGearControllersModeLabel: null,
      autoGearControllersModeSelect: null,
      autoGearDistanceSelect: null,
      autoGearDistanceLabel: null,
      autoGearDistanceModeLabel: null,
      autoGearDistanceModeSelect: null,
      autoGearConditionLabels: {},
      autoGearConditionSelects: {},
      autoGearConditionLogicLabels: {},
      autoGearConditionLogicSelects: {},
      AUTO_GEAR_CONDITION_KEYS: [],
      AUTO_GEAR_REPEATABLE_CONDITIONS: new Set(),
      AUTO_GEAR_CONDITION_FALLBACK_LABELS: {},
      getViewfinderFallbackLabel: function getViewfinderFallbackLabel(value) {
        if (value === '__none__') return 'No';
        return typeof value === 'string' ? value : '';
      },
      getVideoDistributionFallbackLabel: function getVideoDistributionFallbackLabel(value) {
        if (value === '__none__') return 'No video distribution selected';
        return typeof value === 'string' ? value : '';
      },
      refreshAutoGearShootingDaysValue: function refreshAutoGearShootingDaysValue() {},
      refreshAutoGearScenarioOptions: function refreshAutoGearScenarioOptions() {},
      refreshAutoGearScenarioBaseSelect: function refreshAutoGearScenarioBaseSelect() {},
      refreshAutoGearMatteboxOptions: function refreshAutoGearMatteboxOptions() {},
      refreshAutoGearCameraHandleOptions: function refreshAutoGearCameraHandleOptions() {},
      refreshAutoGearViewfinderExtensionOptions: function refreshAutoGearViewfinderExtensionOptions() {},
      refreshAutoGearDeliveryResolutionOptions: function refreshAutoGearDeliveryResolutionOptions() {},
      refreshAutoGearVideoDistributionOptions: function refreshAutoGearVideoDistributionOptions() {},
      collectAutoGearSelectedValues: function collectAutoGearSelectedValues() {
        return [];
      },
      getAutoGearScenarioModeSelectElement: function getAutoGearScenarioModeSelectElement() {
        return null;
      },
      setAutoGearScenarioModeSelectElement: function setAutoGearScenarioModeSelectElement() {}
    };
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
      module.exports = _AUTO_GEAR_UI_EXPORTS;
    }
    if (scope && _typeof(scope) === 'object') {
      scope.cineCoreAutoGearUi = _AUTO_GEAR_UI_EXPORTS;
      scope.getViewfinderFallbackLabel = _AUTO_GEAR_UI_EXPORTS.getViewfinderFallbackLabel;
      scope.getVideoDistributionFallbackLabel = _AUTO_GEAR_UI_EXPORTS.getVideoDistributionFallbackLabel;
    }
    return;
  }
  var autoGearRuleNameInput = document.getElementById('autoGearRuleName');
  var autoGearRuleNameLabel = document.getElementById('autoGearRuleNameLabel');
  var autoGearScenariosSelect = document.getElementById('autoGearScenarios');
  var autoGearScenariosLabel = document.getElementById('autoGearScenariosLabel');
  var autoGearScenarioModeSelectElement = document.getElementById('autoGearScenarioMode');
  var autoGearScenarioModeLabel = document.getElementById('autoGearScenarioModeLabel');
  var autoGearScenarioMultiplierContainer = document.getElementById('autoGearScenarioMultiplierContainer');
  var autoGearScenarioBaseSelect = document.getElementById('autoGearScenarioBase');
  var autoGearScenarioBaseLabel = document.getElementById('autoGearScenarioBaseLabel');
  var autoGearScenarioFactorInput = document.getElementById('autoGearScenarioFactor');
  var autoGearScenarioFactorLabel = document.getElementById('autoGearScenarioFactorLabel');
  var autoGearShootingDaysMode = document.getElementById('autoGearShootingDaysMode');
  var autoGearShootingDaysInput = document.getElementById('autoGearShootingDays');
  var autoGearShootingDaysLabel = document.getElementById('autoGearShootingDaysLabel');
  var autoGearShootingDaysHelp = document.getElementById('autoGearShootingDaysHelp');
  var autoGearShootingDaysValueLabel = document.getElementById('autoGearShootingDaysCountLabel');
  var autoGearMatteboxSelect = document.getElementById('autoGearMattebox');
  var autoGearMatteboxLabel = document.getElementById('autoGearMatteboxLabel');
  var autoGearMatteboxModeLabel = document.getElementById('autoGearMatteboxModeLabel');
  var autoGearMatteboxModeSelect = document.getElementById('autoGearMatteboxMode');
  var autoGearCameraHandleSelect = document.getElementById('autoGearCameraHandle');
  var autoGearCameraHandleLabel = document.getElementById('autoGearCameraHandleLabel');
  var autoGearCameraHandleModeLabel = document.getElementById('autoGearCameraHandleModeLabel');
  var autoGearCameraHandleModeSelect = document.getElementById('autoGearCameraHandleMode');
  var autoGearViewfinderExtensionSelect = document.getElementById('autoGearViewfinderExtension');
  var autoGearViewfinderExtensionLabel = document.getElementById('autoGearViewfinderExtensionLabel');
  var autoGearViewfinderExtensionModeLabel = document.getElementById('autoGearViewfinderExtensionModeLabel');
  var autoGearViewfinderExtensionModeSelect = document.getElementById('autoGearViewfinderExtensionMode');
  var autoGearDeliveryResolutionSelect = document.getElementById('autoGearDeliveryResolution');
  var autoGearDeliveryResolutionLabel = document.getElementById('autoGearDeliveryResolutionLabel');
  var autoGearDeliveryResolutionModeLabel = document.getElementById('autoGearDeliveryResolutionModeLabel');
  var autoGearDeliveryResolutionModeSelect = document.getElementById('autoGearDeliveryResolutionMode');
  var autoGearVideoDistributionSelect = document.getElementById('autoGearVideoDistribution');
  var autoGearVideoDistributionLabel = document.getElementById('autoGearVideoDistributionLabel');
  var autoGearVideoDistributionModeLabel = document.getElementById('autoGearVideoDistributionModeLabel');
  var autoGearVideoDistributionModeSelect = document.getElementById('autoGearVideoDistributionMode');
  var autoGearCameraSelect = document.getElementById('autoGearCamera');
  var autoGearCameraLabel = document.getElementById('autoGearCameraLabel');
  var autoGearCameraModeLabel = document.getElementById('autoGearCameraModeLabel');
  var autoGearCameraModeSelect = document.getElementById('autoGearCameraMode');
  var autoGearOwnGearLabel = document.getElementById('autoGearOwnGearLabel');
  var autoGearOwnGearModeLabel = document.getElementById('autoGearOwnGearModeLabel');
  var autoGearOwnGearModeSelect = document.getElementById('autoGearOwnGearMode');
  var autoGearOwnGearSelect = document.getElementById('autoGearOwnGear');
  var autoGearCameraWeightLabel = document.getElementById('autoGearCameraWeightLabel');
  var autoGearCameraWeightOperator = document.getElementById('autoGearCameraWeightOperator');
  var autoGearCameraWeightOperatorLabel = document.getElementById('autoGearCameraWeightOperatorLabel');
  var autoGearCameraWeightValueInput = document.getElementById('autoGearCameraWeightValue');
  var autoGearCameraWeightValueLabel = document.getElementById('autoGearCameraWeightValueLabel');
  var autoGearCameraWeightHelp = document.getElementById('autoGearCameraWeightHelp');
  var autoGearMonitorSelect = document.getElementById('autoGearMonitor');
  var autoGearMonitorLabel = document.getElementById('autoGearMonitorLabel');
  var autoGearMonitorModeLabel = document.getElementById('autoGearMonitorModeLabel');
  var autoGearMonitorModeSelect = document.getElementById('autoGearMonitorMode');
  var autoGearTripodHeadBrandSelect = document.getElementById('autoGearTripodHeadBrand');
  var autoGearTripodHeadBrandLabel = document.getElementById('autoGearTripodHeadBrandLabel');
  var autoGearTripodHeadBrandModeLabel = document.getElementById('autoGearTripodHeadBrandModeLabel');
  var autoGearTripodHeadBrandModeSelect = document.getElementById('autoGearTripodHeadBrandMode');
  var autoGearTripodBowlSelect = document.getElementById('autoGearTripodBowl');
  var autoGearTripodBowlLabel = document.getElementById('autoGearTripodBowlLabel');
  var autoGearTripodBowlModeLabel = document.getElementById('autoGearTripodBowlModeLabel');
  var autoGearTripodBowlModeSelect = document.getElementById('autoGearTripodBowlMode');
  var autoGearTripodTypesSelect = document.getElementById('autoGearTripodTypes');
  var autoGearTripodTypesLabel = document.getElementById('autoGearTripodTypesLabel');
  var autoGearTripodTypesModeLabel = document.getElementById('autoGearTripodTypesModeLabel');
  var autoGearTripodTypesModeSelect = document.getElementById('autoGearTripodTypesMode');
  var autoGearTripodSpreaderSelect = document.getElementById('autoGearTripodSpreader');
  var autoGearTripodSpreaderLabel = document.getElementById('autoGearTripodSpreaderLabel');
  var autoGearTripodSpreaderModeLabel = document.getElementById('autoGearTripodSpreaderModeLabel');
  var autoGearTripodSpreaderModeSelect = document.getElementById('autoGearTripodSpreaderMode');
  var autoGearCrewPresentSelect = document.getElementById('autoGearCrewPresent');
  var autoGearCrewPresentLabel = document.getElementById('autoGearCrewPresentLabel');
  var autoGearCrewPresentModeLabel = document.getElementById('autoGearCrewPresentModeLabel');
  var autoGearCrewPresentModeSelect = document.getElementById('autoGearCrewPresentMode');
  var autoGearCrewAbsentSelect = document.getElementById('autoGearCrewAbsent');
  var autoGearCrewAbsentLabel = document.getElementById('autoGearCrewAbsentLabel');
  var autoGearCrewAbsentModeLabel = document.getElementById('autoGearCrewAbsentModeLabel');
  var autoGearCrewAbsentModeSelect = document.getElementById('autoGearCrewAbsentMode');
  var autoGearWirelessSelect = document.getElementById('autoGearWireless');
  var autoGearWirelessLabel = document.getElementById('autoGearWirelessLabel');
  var autoGearWirelessModeLabel = document.getElementById('autoGearWirelessModeLabel');
  var autoGearWirelessModeSelect = document.getElementById('autoGearWirelessMode');
  var autoGearMotorsSelect = document.getElementById('autoGearMotors');
  var autoGearMotorsLabel = document.getElementById('autoGearMotorsLabel');
  var autoGearMotorsModeLabel = document.getElementById('autoGearMotorsModeLabel');
  var autoGearMotorsModeSelect = document.getElementById('autoGearMotorsMode');
  var autoGearControllersSelect = document.getElementById('autoGearControllers');
  var autoGearControllersLabel = document.getElementById('autoGearControllersLabel');
  var autoGearControllersModeLabel = document.getElementById('autoGearControllersModeLabel');
  var autoGearControllersModeSelect = document.getElementById('autoGearControllersMode');
  var autoGearDistanceSelect = document.getElementById('autoGearDistance');
  var autoGearDistanceLabel = document.getElementById('autoGearDistanceLabel');
  var autoGearDistanceModeLabel = document.getElementById('autoGearDistanceModeLabel');
  var autoGearDistanceModeSelect = document.getElementById('autoGearDistanceMode');
  var autoGearConditionLabels = {
    always: autoGearAlwaysLabel,
    scenarios: autoGearScenariosLabel,
    shootingDays: autoGearShootingDaysLabel,
    mattebox: autoGearMatteboxLabel,
    cameraHandle: autoGearCameraHandleLabel,
    viewfinderExtension: autoGearViewfinderExtensionLabel,
    deliveryResolution: autoGearDeliveryResolutionLabel,
    videoDistribution: autoGearVideoDistributionLabel,
    camera: autoGearCameraLabel,
    ownGear: autoGearOwnGearLabel,
    cameraWeight: autoGearCameraWeightLabel,
    monitor: autoGearMonitorLabel,
    tripodHeadBrand: autoGearTripodHeadBrandLabel,
    tripodBowl: autoGearTripodBowlLabel,
    tripodTypes: autoGearTripodTypesLabel,
    tripodSpreader: autoGearTripodSpreaderLabel,
    crewPresent: autoGearCrewPresentLabel,
    crewAbsent: autoGearCrewAbsentLabel,
    wireless: autoGearWirelessLabel,
    motors: autoGearMotorsLabel,
    controllers: autoGearControllersLabel,
    distance: autoGearDistanceLabel
  };
  var autoGearConditionSelects = {
    always: null,
    scenarios: autoGearScenariosSelect,
    shootingDays: autoGearShootingDaysInput,
    mattebox: autoGearMatteboxSelect,
    cameraHandle: autoGearCameraHandleSelect,
    viewfinderExtension: autoGearViewfinderExtensionSelect,
    deliveryResolution: autoGearDeliveryResolutionSelect,
    videoDistribution: autoGearVideoDistributionSelect,
    camera: autoGearCameraSelect,
    ownGear: autoGearOwnGearSelect,
    cameraWeight: autoGearCameraWeightValueInput,
    monitor: autoGearMonitorSelect,
    tripodHeadBrand: autoGearTripodHeadBrandSelect,
    tripodBowl: autoGearTripodBowlSelect,
    tripodTypes: autoGearTripodTypesSelect,
    tripodSpreader: autoGearTripodSpreaderSelect,
    crewPresent: autoGearCrewPresentSelect,
    crewAbsent: autoGearCrewAbsentSelect,
    wireless: autoGearWirelessSelect,
    motors: autoGearMotorsSelect,
    controllers: autoGearControllersSelect,
    distance: autoGearDistanceSelect
  };
  var autoGearConditionLogicLabels = {
    mattebox: autoGearMatteboxModeLabel,
    cameraHandle: autoGearCameraHandleModeLabel,
    viewfinderExtension: autoGearViewfinderExtensionModeLabel,
    deliveryResolution: autoGearDeliveryResolutionModeLabel,
    videoDistribution: autoGearVideoDistributionModeLabel,
    camera: autoGearCameraModeLabel,
    ownGear: autoGearOwnGearModeLabel,
    monitor: autoGearMonitorModeLabel,
    tripodHeadBrand: autoGearTripodHeadBrandModeLabel,
    tripodBowl: autoGearTripodBowlModeLabel,
    tripodTypes: autoGearTripodTypesModeLabel,
    tripodSpreader: autoGearTripodSpreaderModeLabel,
    crewPresent: autoGearCrewPresentModeLabel,
    crewAbsent: autoGearCrewAbsentModeLabel,
    wireless: autoGearWirelessModeLabel,
    motors: autoGearMotorsModeLabel,
    controllers: autoGearControllersModeLabel,
    distance: autoGearDistanceModeLabel
  };
  var autoGearConditionLogicSelects = {
    mattebox: autoGearMatteboxModeSelect,
    cameraHandle: autoGearCameraHandleModeSelect,
    viewfinderExtension: autoGearViewfinderExtensionModeSelect,
    deliveryResolution: autoGearDeliveryResolutionModeSelect,
    videoDistribution: autoGearVideoDistributionModeSelect,
    camera: autoGearCameraModeSelect,
    ownGear: autoGearOwnGearModeSelect,
    monitor: autoGearMonitorModeSelect,
    tripodHeadBrand: autoGearTripodHeadBrandModeSelect,
    tripodBowl: autoGearTripodBowlModeSelect,
    tripodTypes: autoGearTripodTypesModeSelect,
    tripodSpreader: autoGearTripodSpreaderModeSelect,
    crewPresent: autoGearCrewPresentModeSelect,
    crewAbsent: autoGearCrewAbsentModeSelect,
    wireless: autoGearWirelessModeSelect,
    motors: autoGearMotorsModeSelect,
    controllers: autoGearControllersModeSelect,
    distance: autoGearDistanceModeSelect
  };
  Object.values(autoGearConditionLogicSelects).forEach(function (select) {
    if (select) select.disabled = true;
  });
  var AUTO_GEAR_CONDITION_KEYS = ['always', 'scenarios', 'shootingDays', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'ownGear', 'cameraWeight', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance'];
  var AUTO_GEAR_REPEATABLE_CONDITIONS = new Set(['scenarios', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'ownGear', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance']);
  var AUTO_GEAR_CONDITION_FALLBACK_LABELS = {
    always: 'Always include',
    scenarios: 'Required scenarios',
    shootingDays: 'Shooting days condition',
    mattebox: 'Mattebox options',
    cameraHandle: 'Camera handles',
    viewfinderExtension: 'Viewfinder extension',
    deliveryResolution: 'Delivery resolution',
    videoDistribution: 'Video distribution',
    camera: 'Camera',
    ownGear: 'Own gear items',
    cameraWeight: 'Camera weight',
    monitor: 'Onboard monitor',
    tripodHeadBrand: 'Tripod head brand',
    tripodBowl: 'Tripod bowl size',
    tripodTypes: 'Tripod types',
    tripodSpreader: 'Tripod spreader',
    crewPresent: 'Crew present',
    crewAbsent: 'Crew absent',
    wireless: 'Wireless transmitter',
    motors: 'FIZ motors',
    controllers: 'FIZ controllers',
    distance: 'FIZ distance devices'
  };
  function refreshAutoGearShootingDaysValue(selected) {
    if (!autoGearShootingDaysInput) return;
    var condition = function (_autoGearEditorDraft) {
      if (selected && _typeof(selected) === 'object' && !Array.isArray(selected)) {
        return normalizeAutoGearShootingDaysCondition(selected);
      }
      if (Array.isArray(selected) && selected.length) {
        return normalizeAutoGearShootingDaysCondition({
          mode: 'minimum',
          value: selected[0]
        });
      }
      if ((_autoGearEditorDraft = autoGearEditorDraft) !== null && _autoGearEditorDraft !== void 0 && _autoGearEditorDraft.shootingDays) {
        return normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays);
      }
      return null;
    }();
    var mode = condition ? condition.mode : 'minimum';
    if (autoGearShootingDaysMode) {
      autoGearShootingDaysMode.value = AUTO_GEAR_SHOOTING_DAY_MODES.has(mode) ? mode : 'minimum';
    }
    var value = condition ? condition.value : '';
    autoGearShootingDaysInput.value = value ? String(value) : '';
  }
  function refreshAutoGearScenarioOptions(selected) {
    var _autoGearEditorDraft2;
    if (!autoGearScenariosSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft2 = autoGearEditorDraft) === null || _autoGearEditorDraft2 === void 0 ? void 0 : _autoGearEditorDraft2.scenarios) ? autoGearEditorDraft.scenarios : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearScenariosSelect.innerHTML = '';
    autoGearScenariosSelect.multiple = true;
    var source = document.getElementById('requiredScenarios');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        if (!opt.value) return;
        var option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(opt.value)) {
          option.selected = true;
        }
        autoGearScenariosSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang, _texts$en;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.autoGearScenarioPlaceholder) || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.autoGearScenarioPlaceholder) || 'Select scenarios';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearScenariosSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearScenariosSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = value;
          fallbackOption.selected = true;
          autoGearScenariosSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearScenariosSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearScenariosSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
    applyAutoGearScenarioSettings(selectedValues);
  }
  function getAutoGearScenarioSelectedValues() {
    if (!autoGearScenariosSelect) return [];
    return Array.from(autoGearScenariosSelect.selectedOptions || []).map(function (option) {
      return option ? option.value : '';
    }).filter(function (value) {
      return typeof value === 'string' && value.trim();
    });
  }
  function applyAutoGearScenarioSettings(selectedValues) {
    var _autoGearScenarioMode;
    var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    var uniqueValues = Array.from(new Set(values));
    var desiredMode = autoGearEditorDraft ? normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic) : normalizeAutoGearScenarioLogic((_autoGearScenarioMode = autoGearScenarioModeSelectElement) === null || _autoGearScenarioMode === void 0 ? void 0 : _autoGearScenarioMode.value);
    if (autoGearScenarioModeSelectElement) {
      var _texts$currentLang2, _texts$en2, _texts$currentLang3, _texts$en3, _texts$currentLang4, _texts$en4;
      var modeLabels = {
        all: ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.autoGearScenarioModeAll) || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.autoGearScenarioModeAll) || 'Require every selected scenario',
        any: ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.autoGearScenarioModeAny) || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.autoGearScenarioModeAny) || 'Match any selected scenario',
        multiplier: ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.autoGearScenarioModeMultiplier) || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.autoGearScenarioModeMultiplier) || 'Multiply when combined'
      };
      Array.from(autoGearScenarioModeSelectElement.options || []).forEach(function (option) {
        if (!option) return;
        if (option.value === 'multiplier') {
          option.disabled = uniqueValues.length < 2;
        } else {
          option.disabled = false;
        }
        var label = modeLabels[option.value] || modeLabels.all;
        if (label) {
          option.textContent = label;
        }
      });
      var nextMode = desiredMode;
      if (nextMode === 'multiplier' && uniqueValues.length < 2) {
        nextMode = 'all';
      }
      autoGearScenarioModeSelectElement.value = nextMode;
      if (autoGearEditorDraft && autoGearEditorDraft.scenarioLogic !== nextMode) {
        autoGearEditorDraft.scenarioLogic = nextMode;
      }
      updateAutoGearScenarioMultiplierVisibility(nextMode, uniqueValues);
    } else {
      updateAutoGearScenarioMultiplierVisibility(desiredMode, uniqueValues);
    }
  }
  function updateAutoGearScenarioMultiplierVisibility(mode, selectedValues) {
    if (!autoGearScenarioMultiplierContainer) return;
    var normalizedMode = normalizeAutoGearScenarioLogic(mode);
    var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    var shouldShow = normalizedMode === 'multiplier' && values.length >= 1;
    autoGearScenarioMultiplierContainer.hidden = !shouldShow;
    autoGearScenarioMultiplierContainer.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    if (autoGearScenarioFactorInput) {
      autoGearScenarioFactorInput.disabled = !shouldShow;
    }
    refreshAutoGearScenarioBaseSelect(values, {
      forceDisable: !shouldShow
    });
  }
  function refreshAutoGearScenarioBaseSelect(selectedValues) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!autoGearScenarioBaseSelect) return;
    var _options$forceDisable = options.forceDisable,
      forceDisable = _options$forceDisable === void 0 ? false : _options$forceDisable;
    var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    var uniqueValues = Array.from(new Set(values));
    var previousValue = autoGearScenarioBaseSelect.value || '';
    autoGearScenarioBaseSelect.innerHTML = '';
    if (forceDisable || !uniqueValues.length) {
      var _texts$currentLang5, _texts$en5;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.autoGearScenarioBasePlaceholder) || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.autoGearScenarioBasePlaceholder) || 'Select a base scenario';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearScenarioBaseSelect.appendChild(placeholder);
      autoGearScenarioBaseSelect.disabled = true;
      return;
    }
    uniqueValues.forEach(function (value) {
      var option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      autoGearScenarioBaseSelect.appendChild(option);
    });
    var preferred = autoGearEditorDraft ? normalizeAutoGearScenarioPrimary(autoGearEditorDraft.scenarioPrimary) : '';
    var normalizedPreferred = normalizeAutoGearTriggerValue(preferred);
    var nextValue = '';
    if (normalizedPreferred) {
      var matched = uniqueValues.find(function (value) {
        return normalizeAutoGearTriggerValue(value) === normalizedPreferred;
      });
      if (matched) {
        nextValue = matched;
      }
    }
    if (!nextValue && previousValue) {
      var normalizedPrevious = normalizeAutoGearTriggerValue(previousValue);
      var matchedPrevious = uniqueValues.find(function (value) {
        return normalizeAutoGearTriggerValue(value) === normalizedPrevious;
      });
      if (matchedPrevious) {
        nextValue = matchedPrevious;
      }
    }
    if (!nextValue) {
      nextValue = uniqueValues[0];
    }
    autoGearScenarioBaseSelect.value = nextValue;
    autoGearScenarioBaseSelect.disabled = false;
  }
  function refreshAutoGearMatteboxOptions(selected) {
    var _autoGearEditorDraft3;
    if (!autoGearMatteboxSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft3 = autoGearEditorDraft) === null || _autoGearEditorDraft3 === void 0 ? void 0 : _autoGearEditorDraft3.mattebox) ? autoGearEditorDraft.mattebox : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearMatteboxSelect.innerHTML = '';
    autoGearMatteboxSelect.multiple = true;
    var source = document.getElementById('mattebox');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        if (!opt.value) return;
        var option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(opt.value)) {
          option.selected = true;
        }
        autoGearMatteboxSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang6, _texts$en6;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.autoGearMatteboxPlaceholder) || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.autoGearMatteboxPlaceholder) || 'Select mattebox options';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearMatteboxSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearMatteboxSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = value;
          fallbackOption.selected = true;
          autoGearMatteboxSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearMatteboxSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearMatteboxSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function refreshAutoGearCameraHandleOptions(selected) {
    var _autoGearEditorDraft4;
    if (!autoGearCameraHandleSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft4 = autoGearEditorDraft) === null || _autoGearEditorDraft4 === void 0 ? void 0 : _autoGearEditorDraft4.cameraHandle) ? autoGearEditorDraft.cameraHandle : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearCameraHandleSelect.innerHTML = '';
    autoGearCameraHandleSelect.multiple = true;
    var source = document.getElementById('cameraHandle');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        if (!opt.value) return;
        var option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(opt.value)) {
          option.selected = true;
        }
        autoGearCameraHandleSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang7, _texts$en7;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.autoGearCameraHandlePlaceholder) || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.autoGearCameraHandlePlaceholder) || 'Select camera handles';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearCameraHandleSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearCameraHandleSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = value;
          fallbackOption.selected = true;
          autoGearCameraHandleSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearCameraHandleSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearCameraHandleSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function resolveViewfinderOptionValue(option) {
    if (!option) return '';
    var raw = typeof option.value === 'string' ? option.value : '';
    return raw ? raw : '__none__';
  }
  function getViewfinderFallbackLabel(value) {
    if (value === '__none__') {
      var _texts$currentLang8, _texts$en8;
      return ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.viewfinderExtensionNone) || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.viewfinderExtensionNone) || 'No';
    }
    return value;
  }
  function getVideoDistributionFallbackLabel(value) {
    if (value === '__none__') {
      var _texts$currentLang9, _texts$en9;
      return ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.autoGearVideoDistributionNone) || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.autoGearVideoDistributionNone) || 'No video distribution selected';
    }
    return value;
  }
  function normalizeVideoDistributionOptionValue(value) {
    if (typeof value !== 'string') return '';
    var trimmed = value.trim();
    if (!trimmed) return '';
    var lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') return '__none__';
    return trimmed;
  }
  function refreshAutoGearViewfinderExtensionOptions(selected) {
    var _autoGearEditorDraft5;
    if (!autoGearViewfinderExtensionSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft5 = autoGearEditorDraft) === null || _autoGearEditorDraft5 === void 0 ? void 0 : _autoGearEditorDraft5.viewfinderExtension) ? autoGearEditorDraft.viewfinderExtension : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearViewfinderExtensionSelect.innerHTML = '';
    autoGearViewfinderExtensionSelect.multiple = true;
    var source = document.getElementById('viewfinderExtension');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        var option = document.createElement('option');
        var value = resolveViewfinderOptionValue(opt);
        option.value = value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearViewfinderExtensionSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang0, _texts$en0;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang0 = texts[currentLang]) === null || _texts$currentLang0 === void 0 ? void 0 : _texts$currentLang0.autoGearViewfinderExtensionPlaceholder) || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.autoGearViewfinderExtensionPlaceholder) || 'Select viewfinder extension options';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearViewfinderExtensionSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearViewfinderExtensionSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = getViewfinderFallbackLabel(value);
          fallbackOption.selected = true;
          autoGearViewfinderExtensionSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearViewfinderExtensionSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearViewfinderExtensionSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function refreshAutoGearDeliveryResolutionOptions(selected) {
    if (!autoGearDeliveryResolutionSelect) return;
    var selectedValues = collectAutoGearSelectedValues(selected, 'deliveryResolution');
    autoGearDeliveryResolutionSelect.innerHTML = '';
    autoGearDeliveryResolutionSelect.multiple = true;
    var seen = new Set();
    var addOption = function addOption(value, label) {
      var normalized = typeof value === 'string' ? value.trim() : '';
      if (!normalized || seen.has(normalized)) return;
      var option = document.createElement('option');
      option.value = normalized;
      option.textContent = label || normalized;
      if (selectedValues.includes(normalized)) {
        option.selected = true;
      }
      autoGearDeliveryResolutionSelect.appendChild(option);
      seen.add(normalized);
    };
    if (deliveryResolutionSelect) {
      Array.from(deliveryResolutionSelect.options || []).forEach(function (opt) {
        if (!opt || typeof opt.value !== 'string') return;
        var value = opt.value.trim();
        if (!value) return;
        var label = (opt.textContent || value).trim();
        addOption(value, label);
      });
    }
    selectedValues.forEach(function (value) {
      if (!seen.has(value)) addOption(value, value);
    });
    if (!autoGearDeliveryResolutionSelect.options.length) {
      var _texts$currentLang1, _texts$en1;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang1 = texts[currentLang]) === null || _texts$currentLang1 === void 0 ? void 0 : _texts$currentLang1.autoGearDeliveryResolutionPlaceholder) || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.autoGearDeliveryResolutionPlaceholder) || 'Select delivery resolutions';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearDeliveryResolutionSelect.appendChild(placeholder);
    }
    var visibleCount = Array.from(autoGearDeliveryResolutionSelect.options || []).filter(function (option) {
      return !option.disabled;
    }).length;
    autoGearDeliveryResolutionSelect.size = computeAutoGearMultiSelectSize(visibleCount, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function refreshAutoGearVideoDistributionOptions(selected) {
    var _autoGearEditorDraft6;
    if (!autoGearVideoDistributionSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft6 = autoGearEditorDraft) === null || _autoGearEditorDraft6 === void 0 ? void 0 : _autoGearEditorDraft6.videoDistribution) ? autoGearEditorDraft.videoDistribution : [];
    var normalizedSelections = Array.from(new Set(candidateValues.map(normalizeVideoDistributionOptionValue).filter(Boolean)));
    var hasNoneSelection = normalizedSelections.includes('__none__');
    var selectedValues = normalizedSelections.filter(function (value) {
      return value !== '__none__';
    });
    autoGearVideoDistributionSelect.innerHTML = '';
    autoGearVideoDistributionSelect.multiple = true;
    var noneOption = document.createElement('option');
    noneOption.value = '__none__';
    noneOption.textContent = getVideoDistributionFallbackLabel('__none__');
    if (hasNoneSelection) {
      noneOption.selected = true;
    }
    autoGearVideoDistributionSelect.appendChild(noneOption);
    var source = document.getElementById('videoDistribution');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        var value = normalizeVideoDistributionOptionValue(opt.value);
        if (!value) return;
        if (value === '__none__') {
          if (hasNoneSelection) {
            noneOption.selected = true;
          }
          return;
        }
        var option = document.createElement('option');
        option.value = value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearVideoDistributionSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang10, _texts$en10;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang10 = texts[currentLang]) === null || _texts$currentLang10 === void 0 ? void 0 : _texts$currentLang10.autoGearVideoDistributionPlaceholder) || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10.autoGearVideoDistributionPlaceholder) || 'Select video distribution options';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearVideoDistributionSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearVideoDistributionSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = getVideoDistributionFallbackLabel(value);
          fallbackOption.selected = true;
          autoGearVideoDistributionSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearVideoDistributionSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearVideoDistributionSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function collectAutoGearSelectedValues(selected, key) {
    var _autoGearEditorDraft7;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft7 = autoGearEditorDraft) === null || _autoGearEditorDraft7 === void 0 ? void 0 : _autoGearEditorDraft7[key]) ? autoGearEditorDraft[key] : [];
    return Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
  }
  function getAutoGearScenarioModeSelectElement() {
    return autoGearScenarioModeSelectElement;
  }
  function setAutoGearScenarioModeSelectElement(value) {
    autoGearScenarioModeSelectElement = value || null;
  }
  var AUTO_GEAR_UI_EXPORTS = _defineProperty(_defineProperty({
    autoGearRuleNameInput: autoGearRuleNameInput,
    autoGearRuleNameLabel: autoGearRuleNameLabel,
    autoGearScenariosSelect: autoGearScenariosSelect,
    autoGearScenariosLabel: autoGearScenariosLabel,
    autoGearScenarioModeSelectElement: autoGearScenarioModeSelectElement,
    autoGearScenarioModeLabel: autoGearScenarioModeLabel,
    autoGearScenarioMultiplierContainer: autoGearScenarioMultiplierContainer,
    autoGearScenarioBaseSelect: autoGearScenarioBaseSelect,
    autoGearScenarioBaseLabel: autoGearScenarioBaseLabel,
    autoGearScenarioFactorInput: autoGearScenarioFactorInput,
    autoGearScenarioFactorLabel: autoGearScenarioFactorLabel,
    autoGearShootingDaysMode: autoGearShootingDaysMode,
    autoGearShootingDaysInput: autoGearShootingDaysInput,
    autoGearShootingDaysLabel: autoGearShootingDaysLabel,
    autoGearShootingDaysHelp: autoGearShootingDaysHelp,
    autoGearShootingDaysValueLabel: autoGearShootingDaysValueLabel,
    autoGearMatteboxSelect: autoGearMatteboxSelect,
    autoGearMatteboxLabel: autoGearMatteboxLabel,
    autoGearMatteboxModeLabel: autoGearMatteboxModeLabel,
    autoGearMatteboxModeSelect: autoGearMatteboxModeSelect,
    autoGearCameraHandleSelect: autoGearCameraHandleSelect,
    autoGearCameraHandleLabel: autoGearCameraHandleLabel,
    autoGearCameraHandleModeLabel: autoGearCameraHandleModeLabel,
    autoGearCameraHandleModeSelect: autoGearCameraHandleModeSelect,
    autoGearViewfinderExtensionSelect: autoGearViewfinderExtensionSelect,
    autoGearViewfinderExtensionLabel: autoGearViewfinderExtensionLabel,
    autoGearViewfinderExtensionModeLabel: autoGearViewfinderExtensionModeLabel,
    autoGearViewfinderExtensionModeSelect: autoGearViewfinderExtensionModeSelect,
    autoGearDeliveryResolutionSelect: autoGearDeliveryResolutionSelect,
    autoGearDeliveryResolutionLabel: autoGearDeliveryResolutionLabel,
    autoGearDeliveryResolutionModeLabel: autoGearDeliveryResolutionModeLabel,
    autoGearDeliveryResolutionModeSelect: autoGearDeliveryResolutionModeSelect,
    autoGearVideoDistributionSelect: autoGearVideoDistributionSelect,
    autoGearVideoDistributionLabel: autoGearVideoDistributionLabel,
    autoGearVideoDistributionModeLabel: autoGearVideoDistributionModeLabel,
    autoGearVideoDistributionModeSelect: autoGearVideoDistributionModeSelect,
    autoGearCameraSelect: autoGearCameraSelect,
    autoGearCameraLabel: autoGearCameraLabel,
    autoGearCameraModeLabel: autoGearCameraModeLabel,
    autoGearCameraModeSelect: autoGearCameraModeSelect,
    autoGearOwnGearLabel: autoGearOwnGearLabel,
    autoGearOwnGearModeLabel: autoGearOwnGearModeLabel,
    autoGearOwnGearModeSelect: autoGearOwnGearModeSelect,
    autoGearOwnGearSelect: autoGearOwnGearSelect,
    autoGearCameraWeightLabel: autoGearCameraWeightLabel,
    autoGearCameraWeightOperator: autoGearCameraWeightOperator,
    autoGearCameraWeightOperatorLabel: autoGearCameraWeightOperatorLabel,
    autoGearCameraWeightValueInput: autoGearCameraWeightValueInput,
    autoGearCameraWeightValueLabel: autoGearCameraWeightValueLabel,
    autoGearCameraWeightHelp: autoGearCameraWeightHelp,
    autoGearMonitorSelect: autoGearMonitorSelect,
    autoGearMonitorLabel: autoGearMonitorLabel,
    autoGearMonitorModeLabel: autoGearMonitorModeLabel,
    autoGearMonitorModeSelect: autoGearMonitorModeSelect,
    autoGearTripodHeadBrandSelect: autoGearTripodHeadBrandSelect,
    autoGearTripodHeadBrandLabel: autoGearTripodHeadBrandLabel,
    autoGearTripodHeadBrandModeLabel: autoGearTripodHeadBrandModeLabel,
    autoGearTripodHeadBrandModeSelect: autoGearTripodHeadBrandModeSelect,
    autoGearTripodBowlSelect: autoGearTripodBowlSelect,
    autoGearTripodBowlLabel: autoGearTripodBowlLabel,
    autoGearTripodBowlModeLabel: autoGearTripodBowlModeLabel,
    autoGearTripodBowlModeSelect: autoGearTripodBowlModeSelect,
    autoGearTripodTypesSelect: autoGearTripodTypesSelect,
    autoGearTripodTypesLabel: autoGearTripodTypesLabel,
    autoGearTripodTypesModeLabel: autoGearTripodTypesModeLabel,
    autoGearTripodTypesModeSelect: autoGearTripodTypesModeSelect,
    autoGearTripodSpreaderSelect: autoGearTripodSpreaderSelect,
    autoGearTripodSpreaderLabel: autoGearTripodSpreaderLabel,
    autoGearTripodSpreaderModeLabel: autoGearTripodSpreaderModeLabel,
    autoGearTripodSpreaderModeSelect: autoGearTripodSpreaderModeSelect,
    autoGearCrewPresentSelect: autoGearCrewPresentSelect,
    autoGearCrewPresentLabel: autoGearCrewPresentLabel,
    autoGearCrewPresentModeLabel: autoGearCrewPresentModeLabel,
    autoGearCrewPresentModeSelect: autoGearCrewPresentModeSelect,
    autoGearCrewAbsentSelect: autoGearCrewAbsentSelect,
    autoGearCrewAbsentLabel: autoGearCrewAbsentLabel,
    autoGearCrewAbsentModeLabel: autoGearCrewAbsentModeLabel,
    autoGearCrewAbsentModeSelect: autoGearCrewAbsentModeSelect,
    autoGearWirelessSelect: autoGearWirelessSelect,
    autoGearWirelessLabel: autoGearWirelessLabel,
    autoGearWirelessModeLabel: autoGearWirelessModeLabel,
    autoGearWirelessModeSelect: autoGearWirelessModeSelect,
    autoGearMotorsSelect: autoGearMotorsSelect,
    autoGearMotorsLabel: autoGearMotorsLabel,
    autoGearMotorsModeLabel: autoGearMotorsModeLabel,
    autoGearMotorsModeSelect: autoGearMotorsModeSelect,
    autoGearControllersSelect: autoGearControllersSelect,
    autoGearControllersLabel: autoGearControllersLabel,
    autoGearControllersModeLabel: autoGearControllersModeLabel,
    autoGearControllersModeSelect: autoGearControllersModeSelect,
    autoGearDistanceSelect: autoGearDistanceSelect,
    autoGearDistanceLabel: autoGearDistanceLabel,
    autoGearDistanceModeLabel: autoGearDistanceModeLabel,
    autoGearDistanceModeSelect: autoGearDistanceModeSelect,
    autoGearConditionLabels: autoGearConditionLabels,
    autoGearConditionSelects: autoGearConditionSelects,
    autoGearConditionLogicLabels: autoGearConditionLogicLabels,
    autoGearConditionLogicSelects: autoGearConditionLogicSelects,
    AUTO_GEAR_CONDITION_KEYS: AUTO_GEAR_CONDITION_KEYS,
    AUTO_GEAR_REPEATABLE_CONDITIONS: AUTO_GEAR_REPEATABLE_CONDITIONS,
    AUTO_GEAR_CONDITION_FALLBACK_LABELS: AUTO_GEAR_CONDITION_FALLBACK_LABELS,
    getViewfinderFallbackLabel: getViewfinderFallbackLabel,
    getVideoDistributionFallbackLabel: getVideoDistributionFallbackLabel,
    refreshAutoGearShootingDaysValue: refreshAutoGearShootingDaysValue,
    refreshAutoGearScenarioOptions: refreshAutoGearScenarioOptions,
    refreshAutoGearScenarioBaseSelect: refreshAutoGearScenarioBaseSelect,
    refreshAutoGearMatteboxOptions: refreshAutoGearMatteboxOptions,
    refreshAutoGearCameraHandleOptions: refreshAutoGearCameraHandleOptions,
    refreshAutoGearViewfinderExtensionOptions: refreshAutoGearViewfinderExtensionOptions,
    refreshAutoGearDeliveryResolutionOptions: refreshAutoGearDeliveryResolutionOptions,
    refreshAutoGearVideoDistributionOptions: refreshAutoGearVideoDistributionOptions,
    collectAutoGearSelectedValues: collectAutoGearSelectedValues,
    getAutoGearScenarioModeSelectElement: getAutoGearScenarioModeSelectElement,
    setAutoGearScenarioModeSelectElement: setAutoGearScenarioModeSelectElement
  }, "getViewfinderFallbackLabel", getViewfinderFallbackLabel), "getVideoDistributionFallbackLabel", getVideoDistributionFallbackLabel);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = AUTO_GEAR_UI_EXPORTS;
  }
  if (scope && _typeof(scope) === 'object') {
    scope.cineCoreAutoGearUi = AUTO_GEAR_UI_EXPORTS;
    scope.getViewfinderFallbackLabel = getViewfinderFallbackLabel;
    scope.getVideoDistributionFallbackLabel = getVideoDistributionFallbackLabel;
    scope.normalizeVideoDistributionOptionValue = normalizeVideoDistributionOptionValue;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this);