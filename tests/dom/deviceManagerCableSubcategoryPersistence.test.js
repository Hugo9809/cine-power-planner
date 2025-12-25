const { getHtmlBody } = require('../helpers/domUtils');
const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');

describe('device manager cable subcategory persistence', () => {
  let addDeviceBtn;
  let newCategorySelect;
  let newSubcategorySelect;
  let toggleDeviceBtn;
  let deviceManagerSection;
  let originalFreeze;
  let originalIsFrozen;
  let originalGetOwnPropertyNames;
  let originalGetOwnPropertyDescriptor;

  const ELEMENT_BINDINGS = [
    ['deviceManagerSection', 'device-manager'],
    ['toggleDeviceBtn', 'toggleDeviceManager'],
    ['newSubcategorySelect', 'newSubcategory'],
    ['newCategorySelect', 'newCategory'],
    ['exportBtn', 'exportDataBtn'],
    ['importBtn', 'importDataBtn'],
    ['importFileInput', 'importFileInput'],
    ['exportAndRevertBtn', 'exportAndRevertBtn'],
    ['exportOutput', 'exportOutput'],
    ['cancelEditBtn', 'cancelEditBtn'],
    ['addDeviceBtn', 'addDeviceBtn'],
    ['newNameInput', 'newName'],
    ['newWattInput', 'newWatt'],
    ['newCapacityInput', 'newCapacity'],
    ['newPinAInput', 'newPinA'],
    ['newDtapAInput', 'newDtapA'],
    ['cameraWattInput', 'cameraWatt'],
    ['cameraVoltageInput', 'cameraVoltage'],
    ['cameraPortTypeInput', 'cameraPortType'],
    ['monitorScreenSizeInput', 'monitorScreenSize'],
    ['monitorBrightnessInput', 'monitorBrightness'],
    ['monitorWattInput', 'monitorWatt'],
    ['monitorVoltageInput', 'monitorVoltage'],
    ['monitorPortTypeInput', 'monitorPortType'],
    ['monitorWirelessTxInput', 'monitorWirelessTx'],
    ['monitorLatencyInput', 'monitorLatency'],
    ['monitorAudioOutputInput', 'monitorAudioOutput'],
    ['viewfinderScreenSizeInput', 'viewfinderScreenSize'],
    ['viewfinderBrightnessInput', 'viewfinderBrightness'],
    ['viewfinderWattInput', 'viewfinderWatt'],
    ['viewfinderVoltageInput', 'viewfinderVoltage'],
    ['viewfinderPortTypeInput', 'viewfinderPortType'],
    ['viewfinderWirelessTxInput', 'viewfinderWirelessTx'],
    ['viewfinderLatencyInput', 'viewfinderLatency'],
    ['videoFrequencyInput', 'videoFrequency'],
    ['videoLatencyInput', 'videoLatency'],
    ['motorConnectorInput', 'motorConnector'],
    ['motorInternalInput', 'motorInternal'],
    ['motorTorqueInput', 'motorTorque'],
    ['motorGearInput', 'motorGearTypes'],
    ['motorNotesInput', 'motorNotes'],
    ['controllerConnectorInput', 'controllerConnector'],
    ['controllerPowerInput', 'controllerPower'],
    ['controllerBatteryInput', 'controllerBattery'],
    ['controllerConnectivityInput', 'controllerConnectivity'],
    ['controllerNotesInput', 'controllerNotes'],
    ['distanceConnectionInput', 'distanceConnection'],
    ['distanceMethodInput', 'distanceMethod'],
    ['distanceRangeInput', 'distanceRange'],
    ['distanceAccuracyInput', 'distanceAccuracy'],
    ['distanceOutputInput', 'distanceOutput'],
    ['distanceNotesInput', 'distanceNotes'],
    ['subcategoryFieldDiv', 'subcategoryField'],
    ['wattFieldDiv', 'wattField'],
    ['cameraFieldsDiv', 'cameraFields'],
    ['monitorFieldsDiv', 'monitorFields'],
    ['viewfinderFieldsDiv', 'viewfinderFields'],
    ['videoFieldsDiv', 'videoFields'],
    ['motorFieldsDiv', 'motorFields'],
    ['controllerFieldsDiv', 'controllerFields'],
    ['distanceFieldsDiv', 'distanceFields'],
    ['lensFieldsDiv', 'lensFields'],
  ];

  beforeEach(() => {
    jest.resetModules();

    originalFreeze = Object.freeze;
    originalIsFrozen = Object.isFrozen;
    originalGetOwnPropertyNames = Object.getOwnPropertyNames;
    originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    const describeTarget = (value) => {
      try {
        return Object.prototype.toString.call(value);
      } catch (error) {
        void error;
        return '';
      }
    };

    Object.freeze = (value) => value;
    Object.isFrozen = () => false;
    Object.getOwnPropertyNames = (target) => {
      const description = describeTarget(target);
      if (/^\[object (HTML|SVG|Document|Window)/.test(description)) {
        return [];
      }
      try {
        return originalGetOwnPropertyNames(target);
      } catch (error) {
        void error;
        return [];
      }
    };
    Object.getOwnPropertyDescriptor = (target, property) => {
      const description = describeTarget(target);
      if (/^\[object (HTML|SVG|Document|Window)/.test(description)) {
        return undefined;
      }
      try {
        return originalGetOwnPropertyDescriptor(target, property);
      } catch (error) {
        void error;
        return undefined;
      }
    };

    if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = () => { };
    }

    document.body.innerHTML = getHtmlBody();
    ELEMENT_BINDINGS.forEach(([key, id]) => {
      const element = document.getElementById(id);
      if (element) {
        global[key] = element;
      }
    });

    const skeleton = createDeviceSkeleton();
    skeleton.accessories.cables.power = {
      'Cable Alpha': { lengthM: 2, connectors: ['d-tap'] },
    };
    global.devices = skeleton;

    global.texts = {
      en: {
        confirmDeleteDevice: 'Delete "{name}"?',
        alertDeviceExists: 'duplicate',
        alertDeviceUpdated: 'updated {name} in {category}',
        alertDeviceAdded: 'added {name} in {category}',
        alertDeviceFields: 'fields',
        alertDeviceName: 'name required',
        alertDeviceWatt: 'watt required',
        addDeviceBtn: 'Add',
        addDeviceBtnHelp: 'Add device to the library.',
        updateDeviceBtn: 'Update',
        updateDeviceBtnHelp: 'Update device in the library.',
        cancelEditBtn: 'Cancel',
        cancelEditBtnHelp: 'Cancel editing the device.',
        toggleDeviceManager: 'Toggle device manager',
        toggleDeviceManagerHelp: 'Show device manager',
        hideDeviceManager: 'Hide device manager',
        category_accessories_cables: 'Cables',
      },
    };
    global.categoryNames = {
      en: {
        'accessories.cables': 'Cables',
      },
    };
    global.currentLang = 'en';
    global.ICON_GLYPHS = { add: '+', save: '✓', circleX: '×', gears: '⚙' };

    const noop = () => { };
    global.updateCageSelectOptions = noop;
    global.updateGlobalDevicesReference = noop;
    global.scheduleProjectAutoSave = noop;
    global.ensureAutoBackupsFromProjects = noop;
    global.getDiagramManualPositions = () => ({ positions: {} });
    global.setManualDiagramPositions = noop;
    global.normalizeDiagramPositionsInput = (value) => value;
    global.normalizeSetupName = (value) => value;
    global.createProjectInfoSnapshotForStorage = (info) => info;
    global.applyDynamicFieldValues = (entry) => entry;
    global.applyBatteryPlateSelectionFromBattery = noop;
    global.getPowerSelectionSnapshot = () => ({});
    global.applyStoredPowerSelection = noop;
    global.callCoreFunctionIfAvailable = noop;
    global.suspendProjectPersistence = noop;
    global.createProjectDeletionBackup = noop;
    global.resumeProjectPersistence = noop;
    global.setLensDeviceMountOptions = noop;
    global.getLensDeviceMountOptions = () => [];
    global.clearLensDeviceMountOptions = noop;
    global.updateMountTypeOptions = noop;
    global.updateLensFocusScaleSelectOptions = noop;
    global.normalizeFocusScale = (value) => value;
    global.buildSettingsBackupPackage = () => ({ backups: [] });
    global.checkSetupChanged = noop;
    global.AUTO_GEAR_BACKUP_INTERVAL_MS = 60000;
    global.removeOriginalDeviceEntry = (
      originalCategory,
      originalSubcategory,
      originalName,
      newCategory,
      newSubcategory,
      newName
    ) => {
      if (!originalCategory || !originalName) {
        return;
      }
      const movedCategory = originalCategory !== newCategory;
      const movedSubcategory =
        originalCategory === 'accessories.cables' && originalSubcategory !== newSubcategory;
      const renamed = originalName !== newName;
      if (!movedCategory && !movedSubcategory && !renamed) {
        return;
      }
      const container = global.getCategoryContainer(
        originalCategory,
        originalCategory === 'accessories.cables' ? originalSubcategory : null,
        { create: false }
      );
      if (!container || !Object.prototype.hasOwnProperty.call(container, originalName)) {
        return;
      }
      delete container[originalName];
      if (
        originalCategory === 'accessories.cables' &&
        originalSubcategory &&
        global.devices.accessories?.cables
      ) {
        const existing = global.devices.accessories.cables[originalSubcategory];
        if (!existing || typeof existing !== 'object') {
          global.devices.accessories.cables[originalSubcategory] = {};
        }
      }
    };
    global.autoBackup = jest.fn();
    global.hideFormSection = noop;
    global.showFormSection = noop;
    global.clearDynamicFields = noop;
    global.placeWattField = noop;
    global.dtapRow = document.createElement('div');
    global.batteryFieldsDiv = document.createElement('div');
    global.lensFocusScaleSelect = document.createElement('select');
    global.callEventsCoreFunction = jest.fn();
    global.storeDevices = jest.fn();
    global.refreshDeviceLists = jest.fn();
    global.populateSelect = jest.fn();
    global.populateMonitorSelect = jest.fn();
    global.updateFizConnectorOptions = jest.fn();
    global.updateMotorConnectorOptions = jest.fn();
    global.updateControllerConnectorOptions = jest.fn();
    global.updateControllerPowerOptions = jest.fn();
    global.updateControllerBatteryOptions = jest.fn();
    global.updateControllerConnectivityOptions = jest.fn();
    global.updatePowerDistTypeOptions = jest.fn();
    global.updatePowerDistVoltageOptions = jest.fn();
    global.updatePowerDistCurrentOptions = jest.fn();
    global.updateTimecodeTypeOptions = jest.fn();
    global.clearMonitorVideoInputs = noop;
    global.clearMonitorVideoOutputs = noop;
    global.clearViewfinderVideoInputs = noop;
    global.clearViewfinderVideoOutputs = noop;
    global.clearBatteryPlates = noop;
    global.clearRecordingMedia = noop;
    global.clearLensMounts = noop;
    global.clearVideoOutputs = noop;
    global.clearVideoInputs = noop;
    global.clearFizConnectors = noop;
    global.clearViewfinders = noop;
    global.clearTimecodes = noop;
    global.clearVideoOutputsIO = noop;
    global.buildDynamicFields = noop;
    global.applyFilters = jest.fn();
    global.updateCalculations = jest.fn();
    global.alert = jest.fn();
    global.motorSelects = [];
    global.controllerSelects = [];
    global.monitorSelects = [];
    global.distanceSelect = document.createElement('select');
    global.batterySelect = document.createElement('select');
    global.cameraSelect = document.createElement('select');
    global.categoryExcludedAttrs = {};
    global.eventsLogger = { warn: noop, error: noop };

    window.texts = global.texts;
    window.categoryNames = global.categoryNames;
    window.currentLang = global.currentLang;

    global.getCategoryContainer = (categoryKey, subcategory, options = {}) => {
      const create = options.create === true;
      if (categoryKey === 'accessories.cables') {
        const cables = global.devices.accessories.cables;
        if (subcategory) {
          if (!cables[subcategory] && create) {
            cables[subcategory] = {};
          }
          return cables[subcategory];
        }
        return cables;
      }
      if (categoryKey.includes('.')) {
        const [main, sub] = categoryKey.split('.');
        const base = global.devices[main] || {};
        if (create && !base[sub]) {
          base[sub] = {};
          global.devices[main] = base;
        }
        return base[sub];
      }
      if (!global.devices[categoryKey] && create) {
        global.devices[categoryKey] = {};
      }
      return global.devices[categoryKey];
    };

    jest.isolateModules(() => {
      require('../../src/scripts/core/app-events.js');
    });

    deviceManagerSection = document.getElementById('device-manager');
    addDeviceBtn = document.getElementById('addDeviceBtn');
    newCategorySelect = document.getElementById('newCategory');
    newSubcategorySelect = document.getElementById('newSubcategory');
    toggleDeviceBtn = document.getElementById('toggleDeviceManager');

    const cablesOption = document.createElement('option');
    cablesOption.value = 'accessories.cables';
    newCategorySelect.appendChild(cablesOption);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete global.devices;
    ELEMENT_BINDINGS.forEach(([key]) => delete global[key]);
    delete global.autoBackup;
    delete global.hideFormSection;
    delete global.showFormSection;
    delete global.clearDynamicFields;
    delete global.placeWattField;
    delete global.dtapRow;
    delete global.batteryFieldsDiv;
    delete global.lensFocusScaleSelect;
    delete global.callEventsCoreFunction;
    delete global.storeDevices;
    delete global.refreshDeviceLists;
    delete global.populateSelect;
    delete global.populateMonitorSelect;
    delete global.updateFizConnectorOptions;
    delete global.updateMotorConnectorOptions;
    delete global.updateControllerConnectorOptions;
    delete global.updateControllerPowerOptions;
    delete global.updateControllerBatteryOptions;
    delete global.updateControllerConnectivityOptions;
    delete global.updatePowerDistTypeOptions;
    delete global.updatePowerDistVoltageOptions;
    delete global.updatePowerDistCurrentOptions;
    delete global.updateTimecodeTypeOptions;
    delete global.clearMonitorVideoInputs;
    delete global.clearMonitorVideoOutputs;
    delete global.clearViewfinderVideoInputs;
    delete global.clearViewfinderVideoOutputs;
    delete global.clearBatteryPlates;
    delete global.clearRecordingMedia;
    delete global.clearLensMounts;
    delete global.clearVideoOutputs;
    delete global.clearVideoInputs;
    delete global.clearFizConnectors;
    delete global.clearViewfinders;
    delete global.clearTimecodes;
    delete global.clearVideoOutputsIO;
    delete global.buildDynamicFields;
    delete global.categoryExcludedAttrs;
    delete global.eventsLogger;
    delete global.getCategoryContainer;
    delete global.alert;
    delete global.applyFilters;
    delete global.updateCalculations;
    delete global.removeOriginalDeviceEntry;
    delete global.texts;
    delete global.categoryNames;
    delete global.currentLang;
    delete global.ICON_GLYPHS;
    delete global.updateCageSelectOptions;
    delete global.updateGlobalDevicesReference;
    delete global.scheduleProjectAutoSave;
    delete global.ensureAutoBackupsFromProjects;
    delete global.getDiagramManualPositions;
    delete global.setManualDiagramPositions;
    delete global.normalizeDiagramPositionsInput;
    delete global.normalizeSetupName;
    delete global.createProjectInfoSnapshotForStorage;
    delete global.applyDynamicFieldValues;
    delete global.applyBatteryPlateSelectionFromBattery;
    delete global.getPowerSelectionSnapshot;
    delete global.applyStoredPowerSelection;
    delete global.callCoreFunctionIfAvailable;
    delete global.suspendProjectPersistence;
    delete global.createProjectDeletionBackup;
    delete global.resumeProjectPersistence;
    delete global.setLensDeviceMountOptions;
    delete global.getLensDeviceMountOptions;
    delete global.clearLensDeviceMountOptions;
    delete global.updateMountTypeOptions;
    delete global.updateLensFocusScaleSelectOptions;
    delete global.normalizeFocusScale;
    delete global.buildSettingsBackupPackage;
    delete global.checkSetupChanged;
    delete global.AUTO_GEAR_BACKUP_INTERVAL_MS;
    delete global.batterySelect;
    delete global.cameraSelect;
    delete global.distanceSelect;
    delete global.motorSelects;
    delete global.controllerSelects;
    delete global.monitorSelects;
    delete global.batteryFieldsDiv;
    delete global.dtapRow;
    delete global.lensFocusScaleSelect;
    Object.freeze = originalFreeze;
    Object.isFrozen = originalIsFrozen;
    Object.getOwnPropertyNames = originalGetOwnPropertyNames;
    Object.getOwnPropertyDescriptor = originalGetOwnPropertyDescriptor;
  });

  test('power subcategory remains available after removing last device', () => {
    expect(toggleDeviceBtn).not.toBeNull();
    toggleDeviceBtn.click();

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.dataset.name = 'Cable Alpha';
    editButton.dataset.category = 'accessories.cables';
    editButton.dataset.subcategory = 'power';
    deviceManagerSection.appendChild(editButton);
    editButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(newCategorySelect.value).toBe('accessories.cables');
    expect(newSubcategorySelect.value).toBe('power');

    newSubcategorySelect.value = 'fiz';
    newSubcategorySelect.dispatchEvent(new Event('change'));

    addDeviceBtn.click();

    expect(global.devices.accessories.cables.fiz['Cable Alpha']).toBeDefined();
    expect(global.devices.accessories.cables.power).toBeDefined();
    expect(Object.keys(global.devices.accessories.cables.power)).toHaveLength(0);

    delete global.devices.accessories.cables.power;

    newCategorySelect.value = 'accessories.cables';
    newCategorySelect.dispatchEvent(new Event('change'));

    const values = Array.from(newSubcategorySelect.options).map(option => option.value);
    expect(values).toContain('power');
    expect(values).toContain('fiz');
  });
});
