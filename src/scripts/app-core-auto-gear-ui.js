(function initAutoGearUiModule(globalScope) {
  'use strict';

  const scope =
    globalScope ||
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  const existingDocument = (typeof document !== 'undefined' && document) || null;
  const document = existingDocument || (scope && scope.document) || null;
  if (!document) {
    const AUTO_GEAR_UI_EXPORTS = {
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
      getViewfinderFallbackLabel: function (value) {
        if (value === '__none__') return 'No';
        return typeof value === 'string' ? value : '';
      },
      getVideoDistributionFallbackLabel: function (value) {
        if (value === '__none__') return 'No video distribution selected';
        return typeof value === 'string' ? value : '';
      },
      refreshAutoGearShootingDaysValue: function () {},
      refreshAutoGearScenarioOptions: function () {},
      refreshAutoGearScenarioBaseSelect: function () {},
      refreshAutoGearMatteboxOptions: function () {},
      refreshAutoGearCameraHandleOptions: function () {},
      refreshAutoGearViewfinderExtensionOptions: function () {},
      refreshAutoGearDeliveryResolutionOptions: function () {},
      refreshAutoGearVideoDistributionOptions: function () {},
      collectAutoGearSelectedValues: function () { return []; },
      getAutoGearScenarioModeSelectElement: function () { return null; },
      setAutoGearScenarioModeSelectElement: function () {}
    };

    if (typeof module === 'object' && module && module.exports) {
      module.exports = AUTO_GEAR_UI_EXPORTS;
    }

    if (scope && typeof scope === 'object') {
      scope.cineCoreAutoGearUi = AUTO_GEAR_UI_EXPORTS;
      scope.getViewfinderFallbackLabel = AUTO_GEAR_UI_EXPORTS.getViewfinderFallbackLabel;
      scope.getVideoDistributionFallbackLabel = AUTO_GEAR_UI_EXPORTS.getVideoDistributionFallbackLabel;
    }

    return;
  }

var autoGearRuleNameInput = document.getElementById('autoGearRuleName');
var autoGearRuleNameLabel = document.getElementById('autoGearRuleNameLabel');
var autoGearScenariosSelect = document.getElementById('autoGearScenarios');
var autoGearScenariosLabel = document.getElementById('autoGearScenariosLabel');
let autoGearScenarioModeSelectElement = document.getElementById('autoGearScenarioMode');
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
  distance: autoGearDistanceLabel,
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
  distance: autoGearDistanceSelect,
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
  distance: autoGearDistanceModeLabel,
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
  distance: autoGearDistanceModeSelect,
};
Object.values(autoGearConditionLogicSelects).forEach(select => {
  if (select) select.disabled = true;
});
const AUTO_GEAR_CONDITION_KEYS = [
  'always',
  'scenarios',
  'shootingDays',
  'mattebox',
  'cameraHandle',
  'viewfinderExtension',
  'deliveryResolution',
  'videoDistribution',
  'camera',
  'ownGear',
  'cameraWeight',
  'monitor',
  'tripodHeadBrand',
  'tripodBowl',
  'tripodTypes',
  'tripodSpreader',
  'crewPresent',
  'crewAbsent',
  'wireless',
  'motors',
  'controllers',
  'distance',
];
const AUTO_GEAR_REPEATABLE_CONDITIONS = new Set([
  'scenarios',
  'mattebox',
  'cameraHandle',
  'viewfinderExtension',
  'deliveryResolution',
  'videoDistribution',
  'camera',
  'ownGear',
  'monitor',
  'tripodHeadBrand',
  'tripodBowl',
  'tripodTypes',
  'tripodSpreader',
  'crewPresent',
  'crewAbsent',
  'wireless',
  'motors',
  'controllers',
  'distance',
]);
const AUTO_GEAR_CONDITION_FALLBACK_LABELS = {
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
  distance: 'FIZ distance devices',
};


function refreshAutoGearShootingDaysValue(selected) {
  if (!autoGearShootingDaysInput) return;
  const condition = (() => {
    if (selected && typeof selected === 'object' && !Array.isArray(selected)) {
      return normalizeAutoGearShootingDaysCondition(selected);
    }
    if (Array.isArray(selected) && selected.length) {
      return normalizeAutoGearShootingDaysCondition({ mode: 'minimum', value: selected[0] });
    }
    if (autoGearEditorDraft?.shootingDays) {
      return normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays);
    }
    return null;
  })();
  const mode = condition ? condition.mode : 'minimum';
  if (autoGearShootingDaysMode) {
    autoGearShootingDaysMode.value = AUTO_GEAR_SHOOTING_DAY_MODES.has(mode) ? mode : 'minimum';
  }
  const value = condition ? condition.value : '';
  autoGearShootingDaysInput.value = value ? String(value) : '';
}

function refreshAutoGearScenarioOptions(selected) {
  if (!autoGearScenariosSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.scenarios)
        ? autoGearEditorDraft.scenarios
        : [];

  const selectedValues = Array.from(
    new Set(
      candidateValues
        .filter(value => typeof value === 'string')
        .map(value => value.trim())
        .filter(Boolean)
    )
  );

  autoGearScenariosSelect.innerHTML = '';
  autoGearScenariosSelect.multiple = true;

  const source = document.getElementById('requiredScenarios');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
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
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearScenarioPlaceholder
      || texts.en?.autoGearScenarioPlaceholder
      || 'Select scenarios';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearScenariosSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearScenariosSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearScenariosSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearScenariosSelect.options || []).filter(option => !option.disabled);
  autoGearScenariosSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
  applyAutoGearScenarioSettings(selectedValues);
}

function getAutoGearScenarioSelectedValues() {
  if (!autoGearScenariosSelect) return [];
  return Array.from(autoGearScenariosSelect.selectedOptions || [])
    .map(option => (option ? option.value : ''))
    .filter(value => typeof value === 'string' && value.trim());
}

function applyAutoGearScenarioSettings(selectedValues) {
  const values = Array.isArray(selectedValues)
    ? selectedValues.filter(value => typeof value === 'string' && value.trim())
    : [];
  const uniqueValues = Array.from(new Set(values));
  const desiredMode = autoGearEditorDraft
    ? normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic)
    : normalizeAutoGearScenarioLogic(autoGearScenarioModeSelectElement?.value);
  if (autoGearScenarioModeSelectElement) {
    const modeLabels = {
      all: texts[currentLang]?.autoGearScenarioModeAll
        || texts.en?.autoGearScenarioModeAll
        || 'Require every selected scenario',
      any: texts[currentLang]?.autoGearScenarioModeAny
        || texts.en?.autoGearScenarioModeAny
        || 'Match any selected scenario',
      multiplier: texts[currentLang]?.autoGearScenarioModeMultiplier
        || texts.en?.autoGearScenarioModeMultiplier
        || 'Multiply when combined',
    };
    Array.from(autoGearScenarioModeSelectElement.options || []).forEach(option => {
      if (!option) return;
      if (option.value === 'multiplier') {
        option.disabled = uniqueValues.length < 2;
      } else {
        option.disabled = false;
      }
      const label = modeLabels[option.value] || modeLabels.all;
      if (label) {
        option.textContent = label;
      }
    });
    let nextMode = desiredMode;
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
  const normalizedMode = normalizeAutoGearScenarioLogic(mode);
  const values = Array.isArray(selectedValues)
    ? selectedValues.filter(value => typeof value === 'string' && value.trim())
    : [];
  const shouldShow = normalizedMode === 'multiplier' && values.length >= 1;
  autoGearScenarioMultiplierContainer.hidden = !shouldShow;
  autoGearScenarioMultiplierContainer.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
  if (autoGearScenarioFactorInput) {
    autoGearScenarioFactorInput.disabled = !shouldShow;
  }
  refreshAutoGearScenarioBaseSelect(values, { forceDisable: !shouldShow });
}

function refreshAutoGearScenarioBaseSelect(selectedValues, options = {}) {
  if (!autoGearScenarioBaseSelect) return;
  const { forceDisable = false } = options;
  const values = Array.isArray(selectedValues)
    ? selectedValues.filter(value => typeof value === 'string' && value.trim())
    : [];
  const uniqueValues = Array.from(new Set(values));
  const previousValue = autoGearScenarioBaseSelect.value || '';
  autoGearScenarioBaseSelect.innerHTML = '';
  if (forceDisable || !uniqueValues.length) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearScenarioBasePlaceholder
      || texts.en?.autoGearScenarioBasePlaceholder
      || 'Select a base scenario';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearScenarioBaseSelect.appendChild(placeholder);
    autoGearScenarioBaseSelect.disabled = true;
    return;
  }
  uniqueValues.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    autoGearScenarioBaseSelect.appendChild(option);
  });
  const preferred = autoGearEditorDraft
    ? normalizeAutoGearScenarioPrimary(autoGearEditorDraft.scenarioPrimary)
    : '';
  const normalizedPreferred = normalizeAutoGearTriggerValue(preferred);
  let nextValue = '';
  if (normalizedPreferred) {
    const matched = uniqueValues.find(value => normalizeAutoGearTriggerValue(value) === normalizedPreferred);
    if (matched) {
      nextValue = matched;
    }
  }
  if (!nextValue && previousValue) {
    const normalizedPrevious = normalizeAutoGearTriggerValue(previousValue);
    const matchedPrevious = uniqueValues.find(value => normalizeAutoGearTriggerValue(value) === normalizedPrevious);
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
  if (!autoGearMatteboxSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.mattebox)
        ? autoGearEditorDraft.mattebox
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearMatteboxSelect.innerHTML = '';
  autoGearMatteboxSelect.multiple = true;

  const source = document.getElementById('mattebox');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
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
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearMatteboxPlaceholder
      || texts.en?.autoGearMatteboxPlaceholder
      || 'Select mattebox options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearMatteboxSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearMatteboxSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearMatteboxSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearMatteboxSelect.options || []).filter(option => !option.disabled);
  autoGearMatteboxSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function refreshAutoGearCameraHandleOptions(selected) {
  if (!autoGearCameraHandleSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.cameraHandle)
        ? autoGearEditorDraft.cameraHandle
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearCameraHandleSelect.innerHTML = '';
  autoGearCameraHandleSelect.multiple = true;

  const source = document.getElementById('cameraHandle');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
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
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearCameraHandlePlaceholder
      || texts.en?.autoGearCameraHandlePlaceholder
      || 'Select camera handles';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearCameraHandleSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearCameraHandleSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearCameraHandleSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearCameraHandleSelect.options || []).filter(option => !option.disabled);
  autoGearCameraHandleSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function resolveViewfinderOptionValue(option) {
  if (!option) return '';
  const raw = typeof option.value === 'string' ? option.value : '';
  return raw ? raw : '__none__';
}

function getViewfinderFallbackLabel(value) {
  if (value === '__none__') {
    return texts[currentLang]?.viewfinderExtensionNone
      || texts.en?.viewfinderExtensionNone
      || 'No';
  }
  return value;
}

function getVideoDistributionFallbackLabel(value) {
  if (value === '__none__') {
    return texts[currentLang]?.autoGearVideoDistributionNone
      || texts.en?.autoGearVideoDistributionNone
      || 'No video distribution selected';
  }
  return value;
}

function normalizeVideoDistributionOptionValue(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const lower = trimmed.toLowerCase();
  if (lower === '__none__' || lower === 'none') return '__none__';
  return trimmed;
}

function refreshAutoGearViewfinderExtensionOptions(selected) {
  if (!autoGearViewfinderExtensionSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.viewfinderExtension)
        ? autoGearEditorDraft.viewfinderExtension
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearViewfinderExtensionSelect.innerHTML = '';
  autoGearViewfinderExtensionSelect.multiple = true;

  const source = document.getElementById('viewfinderExtension');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      const option = document.createElement('option');
      const value = resolveViewfinderOptionValue(opt);
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
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearViewfinderExtensionPlaceholder
      || texts.en?.autoGearViewfinderExtensionPlaceholder
      || 'Select viewfinder extension options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearViewfinderExtensionSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearViewfinderExtensionSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = getViewfinderFallbackLabel(value);
        fallbackOption.selected = true;
        autoGearViewfinderExtensionSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearViewfinderExtensionSelect.options || []).filter(option => !option.disabled);
  autoGearViewfinderExtensionSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function refreshAutoGearDeliveryResolutionOptions(selected) {
  if (!autoGearDeliveryResolutionSelect) return;

  const selectedValues = collectAutoGearSelectedValues(selected, 'deliveryResolution');

  autoGearDeliveryResolutionSelect.innerHTML = '';
  autoGearDeliveryResolutionSelect.multiple = true;

  const seen = new Set();
  const addOption = (value, label) => {
    const normalized = typeof value === 'string' ? value.trim() : '';
    if (!normalized || seen.has(normalized)) return;
    const option = document.createElement('option');
    option.value = normalized;
    option.textContent = label || normalized;
    if (selectedValues.includes(normalized)) {
      option.selected = true;
    }
    autoGearDeliveryResolutionSelect.appendChild(option);
    seen.add(normalized);
  };

  if (deliveryResolutionSelect) {
    Array.from(deliveryResolutionSelect.options || []).forEach(opt => {
      if (!opt || typeof opt.value !== 'string') return;
      const value = opt.value.trim();
      if (!value) return;
      const label = (opt.textContent || value).trim();
      addOption(value, label);
    });
  }

  selectedValues.forEach(value => {
    if (!seen.has(value)) addOption(value, value);
  });

  if (!autoGearDeliveryResolutionSelect.options.length) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearDeliveryResolutionPlaceholder
      || texts.en?.autoGearDeliveryResolutionPlaceholder
      || 'Select delivery resolutions';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearDeliveryResolutionSelect.appendChild(placeholder);
  }

  const visibleCount = Array.from(autoGearDeliveryResolutionSelect.options || []).filter(option => !option.disabled).length;
  autoGearDeliveryResolutionSelect.size = computeAutoGearMultiSelectSize(
    visibleCount,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function refreshAutoGearVideoDistributionOptions(selected) {
  if (!autoGearVideoDistributionSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.videoDistribution)
        ? autoGearEditorDraft.videoDistribution
        : [];

  const normalizedSelections = Array.from(new Set(
    candidateValues
      .map(normalizeVideoDistributionOptionValue)
      .filter(Boolean)
  ));
  const hasNoneSelection = normalizedSelections.includes('__none__');
  const selectedValues = normalizedSelections.filter(value => value !== '__none__');

  autoGearVideoDistributionSelect.innerHTML = '';
  autoGearVideoDistributionSelect.multiple = true;

  const noneOption = document.createElement('option');
  noneOption.value = '__none__';
  noneOption.textContent = getVideoDistributionFallbackLabel('__none__');
  if (hasNoneSelection) {
    noneOption.selected = true;
  }
  autoGearVideoDistributionSelect.appendChild(noneOption);

  const source = document.getElementById('videoDistribution');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      const value = normalizeVideoDistributionOptionValue(opt.value);
      if (!value) return;
      if (value === '__none__') {
        if (hasNoneSelection) {
          noneOption.selected = true;
        }
        return;
      }
      const option = document.createElement('option');
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
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearVideoDistributionPlaceholder
      || texts.en?.autoGearVideoDistributionPlaceholder
      || 'Select video distribution options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearVideoDistributionSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearVideoDistributionSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = getVideoDistributionFallbackLabel(value);
        fallbackOption.selected = true;
        autoGearVideoDistributionSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearVideoDistributionSelect.options || []).filter(option => !option.disabled);
  autoGearVideoDistributionSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function collectAutoGearSelectedValues(selected, key) {
  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.[key])
        ? autoGearEditorDraft[key]
        : [];
  return Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));
}



  function getAutoGearScenarioModeSelectElement() {
    return autoGearScenarioModeSelectElement;
  }

  function setAutoGearScenarioModeSelectElement(value) {
    autoGearScenarioModeSelectElement = value || null;
  }

  const AUTO_GEAR_UI_EXPORTS = {
    autoGearRuleNameInput,
    autoGearRuleNameLabel,
    autoGearScenariosSelect,
    autoGearScenariosLabel,
    autoGearScenarioModeSelectElement,
    autoGearScenarioModeLabel,
    autoGearScenarioMultiplierContainer,
    autoGearScenarioBaseSelect,
    autoGearScenarioBaseLabel,
    autoGearScenarioFactorInput,
    autoGearScenarioFactorLabel,
    autoGearShootingDaysMode,
    autoGearShootingDaysInput,
    autoGearShootingDaysLabel,
    autoGearShootingDaysHelp,
    autoGearShootingDaysValueLabel,
    autoGearMatteboxSelect,
    autoGearMatteboxLabel,
    autoGearMatteboxModeLabel,
    autoGearMatteboxModeSelect,
    autoGearCameraHandleSelect,
    autoGearCameraHandleLabel,
    autoGearCameraHandleModeLabel,
    autoGearCameraHandleModeSelect,
    autoGearViewfinderExtensionSelect,
    autoGearViewfinderExtensionLabel,
    autoGearViewfinderExtensionModeLabel,
    autoGearViewfinderExtensionModeSelect,
    autoGearDeliveryResolutionSelect,
    autoGearDeliveryResolutionLabel,
    autoGearDeliveryResolutionModeLabel,
    autoGearDeliveryResolutionModeSelect,
    autoGearVideoDistributionSelect,
    autoGearVideoDistributionLabel,
    autoGearVideoDistributionModeLabel,
    autoGearVideoDistributionModeSelect,
    autoGearCameraSelect,
    autoGearCameraLabel,
    autoGearCameraModeLabel,
    autoGearCameraModeSelect,
    autoGearOwnGearLabel,
    autoGearOwnGearModeLabel,
    autoGearOwnGearModeSelect,
    autoGearOwnGearSelect,
    autoGearCameraWeightLabel,
    autoGearCameraWeightOperator,
    autoGearCameraWeightOperatorLabel,
    autoGearCameraWeightValueInput,
    autoGearCameraWeightValueLabel,
    autoGearCameraWeightHelp,
    autoGearMonitorSelect,
    autoGearMonitorLabel,
    autoGearMonitorModeLabel,
    autoGearMonitorModeSelect,
    autoGearTripodHeadBrandSelect,
    autoGearTripodHeadBrandLabel,
    autoGearTripodHeadBrandModeLabel,
    autoGearTripodHeadBrandModeSelect,
    autoGearTripodBowlSelect,
    autoGearTripodBowlLabel,
    autoGearTripodBowlModeLabel,
    autoGearTripodBowlModeSelect,
    autoGearTripodTypesSelect,
    autoGearTripodTypesLabel,
    autoGearTripodTypesModeLabel,
    autoGearTripodTypesModeSelect,
    autoGearTripodSpreaderSelect,
    autoGearTripodSpreaderLabel,
    autoGearTripodSpreaderModeLabel,
    autoGearTripodSpreaderModeSelect,
    autoGearCrewPresentSelect,
    autoGearCrewPresentLabel,
    autoGearCrewPresentModeLabel,
    autoGearCrewPresentModeSelect,
    autoGearCrewAbsentSelect,
    autoGearCrewAbsentLabel,
    autoGearCrewAbsentModeLabel,
    autoGearCrewAbsentModeSelect,
    autoGearWirelessSelect,
    autoGearWirelessLabel,
    autoGearWirelessModeLabel,
    autoGearWirelessModeSelect,
    autoGearMotorsSelect,
    autoGearMotorsLabel,
    autoGearMotorsModeLabel,
    autoGearMotorsModeSelect,
    autoGearControllersSelect,
    autoGearControllersLabel,
    autoGearControllersModeLabel,
    autoGearControllersModeSelect,
    autoGearDistanceSelect,
    autoGearDistanceLabel,
    autoGearDistanceModeLabel,
    autoGearDistanceModeSelect,
    autoGearConditionLabels,
    autoGearConditionSelects,
    autoGearConditionLogicLabels,
    autoGearConditionLogicSelects,
    AUTO_GEAR_CONDITION_KEYS,
    AUTO_GEAR_REPEATABLE_CONDITIONS,
    AUTO_GEAR_CONDITION_FALLBACK_LABELS,
    getViewfinderFallbackLabel,
    getVideoDistributionFallbackLabel,
    normalizeVideoDistributionOptionValue,
    refreshAutoGearShootingDaysValue,
    refreshAutoGearScenarioOptions,
    refreshAutoGearScenarioBaseSelect,
    refreshAutoGearMatteboxOptions,
    refreshAutoGearCameraHandleOptions,
    refreshAutoGearViewfinderExtensionOptions,
    refreshAutoGearDeliveryResolutionOptions,
    refreshAutoGearVideoDistributionOptions,
    collectAutoGearSelectedValues,
    getAutoGearScenarioModeSelectElement,
    setAutoGearScenarioModeSelectElement,
    getViewfinderFallbackLabel,
    getVideoDistributionFallbackLabel,
    normalizeVideoDistributionOptionValue
  };

  if (typeof module === 'object' && module && module.exports) {
    module.exports = AUTO_GEAR_UI_EXPORTS;
  }

  if (scope && typeof scope === 'object') {
    scope.cineCoreAutoGearUi = AUTO_GEAR_UI_EXPORTS;
    scope.getViewfinderFallbackLabel = getViewfinderFallbackLabel;
    scope.getVideoDistributionFallbackLabel = getVideoDistributionFallbackLabel;
    scope.normalizeVideoDistributionOptionValue = normalizeVideoDistributionOptionValue;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this);
