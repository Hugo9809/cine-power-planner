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
  const autoGearDocument = existingDocument || (scope && scope.document) || null;
  if (!autoGearDocument) {
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

var autoGearRuleNameInput = autoGearDocument.getElementById('autoGearRuleName');
var autoGearRuleNameLabel = autoGearDocument.getElementById('autoGearRuleNameLabel');
var autoGearScenariosSelect = autoGearDocument.getElementById('autoGearScenarios');
var autoGearScenariosLabel = autoGearDocument.getElementById('autoGearScenariosLabel');
let autoGearScenarioModeSelectElement = autoGearDocument.getElementById('autoGearScenarioMode');
var autoGearScenarioModeLabel = autoGearDocument.getElementById('autoGearScenarioModeLabel');
var autoGearScenarioMultiplierContainer = autoGearDocument.getElementById('autoGearScenarioMultiplierContainer');
var autoGearScenarioBaseSelect = autoGearDocument.getElementById('autoGearScenarioBase');
var autoGearScenarioBaseLabel = autoGearDocument.getElementById('autoGearScenarioBaseLabel');
var autoGearScenarioFactorInput = autoGearDocument.getElementById('autoGearScenarioFactor');
var autoGearScenarioFactorLabel = autoGearDocument.getElementById('autoGearScenarioFactorLabel');
var autoGearShootingDaysMode = autoGearDocument.getElementById('autoGearShootingDaysMode');
var autoGearShootingDaysInput = autoGearDocument.getElementById('autoGearShootingDays');
var autoGearShootingDaysLabel = autoGearDocument.getElementById('autoGearShootingDaysLabel');
var autoGearShootingDaysHelp = autoGearDocument.getElementById('autoGearShootingDaysHelp');
var autoGearShootingDaysValueLabel = autoGearDocument.getElementById('autoGearShootingDaysCountLabel');
var autoGearMatteboxSelect = autoGearDocument.getElementById('autoGearMattebox');
var autoGearMatteboxLabel = autoGearDocument.getElementById('autoGearMatteboxLabel');
var autoGearMatteboxModeLabel = autoGearDocument.getElementById('autoGearMatteboxModeLabel');
var autoGearMatteboxModeSelect = autoGearDocument.getElementById('autoGearMatteboxMode');
var autoGearCameraHandleSelect = autoGearDocument.getElementById('autoGearCameraHandle');
var autoGearCameraHandleLabel = autoGearDocument.getElementById('autoGearCameraHandleLabel');
var autoGearCameraHandleModeLabel = autoGearDocument.getElementById('autoGearCameraHandleModeLabel');
var autoGearCameraHandleModeSelect = autoGearDocument.getElementById('autoGearCameraHandleMode');
var autoGearViewfinderExtensionSelect = autoGearDocument.getElementById('autoGearViewfinderExtension');
var autoGearViewfinderExtensionLabel = autoGearDocument.getElementById('autoGearViewfinderExtensionLabel');
var autoGearViewfinderExtensionModeLabel = autoGearDocument.getElementById('autoGearViewfinderExtensionModeLabel');
var autoGearViewfinderExtensionModeSelect = autoGearDocument.getElementById('autoGearViewfinderExtensionMode');
var autoGearDeliveryResolutionSelect = autoGearDocument.getElementById('autoGearDeliveryResolution');
var autoGearDeliveryResolutionLabel = autoGearDocument.getElementById('autoGearDeliveryResolutionLabel');
var autoGearDeliveryResolutionModeLabel = autoGearDocument.getElementById('autoGearDeliveryResolutionModeLabel');
var autoGearDeliveryResolutionModeSelect = autoGearDocument.getElementById('autoGearDeliveryResolutionMode');
var autoGearVideoDistributionSelect = autoGearDocument.getElementById('autoGearVideoDistribution');
var autoGearVideoDistributionLabel = autoGearDocument.getElementById('autoGearVideoDistributionLabel');
var autoGearVideoDistributionModeLabel = autoGearDocument.getElementById('autoGearVideoDistributionModeLabel');
var autoGearVideoDistributionModeSelect = autoGearDocument.getElementById('autoGearVideoDistributionMode');
var autoGearCameraSelect = autoGearDocument.getElementById('autoGearCamera');
var autoGearCameraLabel = autoGearDocument.getElementById('autoGearCameraLabel');
var autoGearCameraModeLabel = autoGearDocument.getElementById('autoGearCameraModeLabel');
var autoGearCameraModeSelect = autoGearDocument.getElementById('autoGearCameraMode');
var autoGearOwnGearLabel = autoGearDocument.getElementById('autoGearOwnGearLabel');
var autoGearOwnGearModeLabel = autoGearDocument.getElementById('autoGearOwnGearModeLabel');
var autoGearOwnGearModeSelect = autoGearDocument.getElementById('autoGearOwnGearMode');
var autoGearOwnGearSelect = autoGearDocument.getElementById('autoGearOwnGear');
var autoGearCameraWeightLabel = autoGearDocument.getElementById('autoGearCameraWeightLabel');
var autoGearCameraWeightOperator = autoGearDocument.getElementById('autoGearCameraWeightOperator');
var autoGearCameraWeightOperatorLabel = autoGearDocument.getElementById('autoGearCameraWeightOperatorLabel');
var autoGearCameraWeightValueInput = autoGearDocument.getElementById('autoGearCameraWeightValue');
var autoGearCameraWeightValueLabel = autoGearDocument.getElementById('autoGearCameraWeightValueLabel');
var autoGearCameraWeightHelp = autoGearDocument.getElementById('autoGearCameraWeightHelp');
var autoGearMonitorSelect = autoGearDocument.getElementById('autoGearMonitor');
var autoGearMonitorLabel = autoGearDocument.getElementById('autoGearMonitorLabel');
var autoGearMonitorModeLabel = autoGearDocument.getElementById('autoGearMonitorModeLabel');
var autoGearMonitorModeSelect = autoGearDocument.getElementById('autoGearMonitorMode');
var autoGearTripodHeadBrandSelect = autoGearDocument.getElementById('autoGearTripodHeadBrand');
var autoGearTripodHeadBrandLabel = autoGearDocument.getElementById('autoGearTripodHeadBrandLabel');
var autoGearTripodHeadBrandModeLabel = autoGearDocument.getElementById('autoGearTripodHeadBrandModeLabel');
var autoGearTripodHeadBrandModeSelect = autoGearDocument.getElementById('autoGearTripodHeadBrandMode');
var autoGearTripodBowlSelect = autoGearDocument.getElementById('autoGearTripodBowl');
var autoGearTripodBowlLabel = autoGearDocument.getElementById('autoGearTripodBowlLabel');
var autoGearTripodBowlModeLabel = autoGearDocument.getElementById('autoGearTripodBowlModeLabel');
var autoGearTripodBowlModeSelect = autoGearDocument.getElementById('autoGearTripodBowlMode');
var autoGearTripodTypesSelect = autoGearDocument.getElementById('autoGearTripodTypes');
var autoGearTripodTypesLabel = autoGearDocument.getElementById('autoGearTripodTypesLabel');
var autoGearTripodTypesModeLabel = autoGearDocument.getElementById('autoGearTripodTypesModeLabel');
var autoGearTripodTypesModeSelect = autoGearDocument.getElementById('autoGearTripodTypesMode');
var autoGearTripodSpreaderSelect = autoGearDocument.getElementById('autoGearTripodSpreader');
var autoGearTripodSpreaderLabel = autoGearDocument.getElementById('autoGearTripodSpreaderLabel');
var autoGearTripodSpreaderModeLabel = autoGearDocument.getElementById('autoGearTripodSpreaderModeLabel');
var autoGearTripodSpreaderModeSelect = autoGearDocument.getElementById('autoGearTripodSpreaderMode');
var autoGearCrewPresentSelect = autoGearDocument.getElementById('autoGearCrewPresent');
var autoGearCrewPresentLabel = autoGearDocument.getElementById('autoGearCrewPresentLabel');
var autoGearCrewPresentModeLabel = autoGearDocument.getElementById('autoGearCrewPresentModeLabel');
var autoGearCrewPresentModeSelect = autoGearDocument.getElementById('autoGearCrewPresentMode');
var autoGearCrewAbsentSelect = autoGearDocument.getElementById('autoGearCrewAbsent');
var autoGearCrewAbsentLabel = autoGearDocument.getElementById('autoGearCrewAbsentLabel');
var autoGearCrewAbsentModeLabel = autoGearDocument.getElementById('autoGearCrewAbsentModeLabel');
var autoGearCrewAbsentModeSelect = autoGearDocument.getElementById('autoGearCrewAbsentMode');
var autoGearWirelessSelect = autoGearDocument.getElementById('autoGearWireless');
var autoGearWirelessLabel = autoGearDocument.getElementById('autoGearWirelessLabel');
var autoGearWirelessModeLabel = autoGearDocument.getElementById('autoGearWirelessModeLabel');
var autoGearWirelessModeSelect = autoGearDocument.getElementById('autoGearWirelessMode');
var autoGearMotorsSelect = autoGearDocument.getElementById('autoGearMotors');
var autoGearMotorsLabel = autoGearDocument.getElementById('autoGearMotorsLabel');
var autoGearMotorsModeLabel = autoGearDocument.getElementById('autoGearMotorsModeLabel');
var autoGearMotorsModeSelect = autoGearDocument.getElementById('autoGearMotorsMode');
var autoGearControllersSelect = autoGearDocument.getElementById('autoGearControllers');
var autoGearControllersLabel = autoGearDocument.getElementById('autoGearControllersLabel');
var autoGearControllersModeLabel = autoGearDocument.getElementById('autoGearControllersModeLabel');
var autoGearControllersModeSelect = autoGearDocument.getElementById('autoGearControllersMode');
var autoGearDistanceSelect = autoGearDocument.getElementById('autoGearDistance');
var autoGearDistanceLabel = autoGearDocument.getElementById('autoGearDistanceLabel');
var autoGearDistanceModeLabel = autoGearDocument.getElementById('autoGearDistanceModeLabel');
var autoGearDistanceModeSelect = autoGearDocument.getElementById('autoGearDistanceMode');
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

  const source = autoGearDocument.getElementById('requiredScenarios');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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
        const fallbackOption = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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
    const option = autoGearDocument.createElement('option');
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

  const source = autoGearDocument.getElementById('mattebox');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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
        const fallbackOption = autoGearDocument.createElement('option');
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

  const source = autoGearDocument.getElementById('cameraHandle');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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
        const fallbackOption = autoGearDocument.createElement('option');
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

  const source = autoGearDocument.getElementById('viewfinderExtension');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      const option = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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
        const fallbackOption = autoGearDocument.createElement('option');
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
    const option = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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

  const noneOption = autoGearDocument.createElement('option');
  noneOption.value = '__none__';
  noneOption.textContent = getVideoDistributionFallbackLabel('__none__');
  if (hasNoneSelection) {
    noneOption.selected = true;
  }
  autoGearVideoDistributionSelect.appendChild(noneOption);

  const source = autoGearDocument.getElementById('videoDistribution');
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
      const option = autoGearDocument.createElement('option');
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
    const placeholder = autoGearDocument.createElement('option');
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
        const fallbackOption = autoGearDocument.createElement('option');
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
