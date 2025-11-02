const { getHtmlBody } = require('../helpers/domUtils');
const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');

describe('device manager duplicate protections', () => {
  const duplicateBatteryName = 'Test Battery Move';
  const renameBatteryName = 'Test Battery Rename';
  const renamedBatteryName = 'Test Battery Rename Updated';

  let addDeviceBtn;
  let newCategorySelect;
  let newNameInput;
  let newCapacityInput;
  let newPinAInput;
  let newDtapAInput;

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
    ['wattFieldDiv', 'wattField'],
    ['dynamicFieldsDiv', 'dynamicFields'],
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

    document.body.innerHTML = getHtmlBody();
    ELEMENT_BINDINGS.forEach(([key, id]) => {
      const element = document.getElementById(id);
      if (element) {
        global[key] = element;
      }
    });

    const skeleton = createDeviceSkeleton();
    skeleton.batteries[duplicateBatteryName] = { capacity: 98, pinA: 10, dtapA: 6 };
    skeleton.batteries[renameBatteryName] = { capacity: 120, pinA: 14, dtapA: 8 };
    skeleton.accessories.batteries[duplicateBatteryName] = { capacity: 102, pinA: 9, dtapA: 5 };
    global.devices = skeleton;

    global.texts = {
      en: {
        alertDeviceExists: 'A device with this name already exists in this category.',
        alertDeviceUpdated: 'Device "{name}" updated in category "{category}".',
        alertDeviceAdded: 'Device "{name}" added to category "{category}".',
        addDeviceBtn: 'Add',
        addDeviceBtnHelp: 'Add device to the library.',
        updateDeviceBtn: 'Update',
        updateDeviceBtnHelp: 'Update device in the library.',
        cancelEditBtn: 'Cancel',
        cancelEditBtnHelp: 'Cancel editing the device.',
        toggleDeviceManager: 'Toggle device manager',
        hideDeviceManager: 'Hide device manager',
        category_batteries: 'Batteries',
        category_accessories_batteries: 'Accessory Batteries',
      },
    };
    global.categoryNames = {
      en: {
        batteries: 'Batteries',
        'accessories.batteries': 'Accessory Batteries',
      },
    };
    global.currentLang = 'en';
    global.ICON_GLYPHS = {
      add: '+',
      save: '✓',
      circleX: '×',
      minus: '-',
      gears: '⚙',
    };

    const noop = () => {};
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
        global.devices.accessories?.cables &&
        container &&
        originalSubcategory &&
        !Object.keys(container).length
      ) {
        delete global.devices.accessories.cables[originalSubcategory];
      }
    };
    global.autoBackup = jest.fn();
    global.hideFormSection = noop;
    global.showFormSection = noop;
    global.clearDynamicFields = noop;
    global.placeWattField = noop;
    global.subcategoryFieldDiv = document.createElement('div');
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
    global.texts.en.addDeviceBtnHelp = 'Add device to the library.';
    global.texts.en.updateDeviceBtnHelp = 'Update device in the library.';
    global.texts.en.cancelEditBtnHelp = 'Cancel editing the device.';

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
      require('../../src/scripts/app-events.js');
    });

    addDeviceBtn = document.getElementById('addDeviceBtn');
    newCategorySelect = document.getElementById('newCategory');
    newNameInput = document.getElementById('newName');
    newCapacityInput = document.getElementById('newCapacity');
    newPinAInput = document.getElementById('newPinA');
    newDtapAInput = document.getElementById('newDtapA');

    const batteriesOption = document.createElement('option');
    batteriesOption.value = 'batteries';
    newCategorySelect.appendChild(batteriesOption);
    const accessoriesOption = document.createElement('option');
    accessoriesOption.value = 'accessories.batteries';
    newCategorySelect.appendChild(accessoriesOption);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
    delete global.devices;
    ELEMENT_BINDINGS.forEach(([key]) => {
      delete global[key];
    });
    delete global.removeOriginalDeviceEntry;
    delete global.autoBackup;
    delete global.hideFormSection;
    delete global.showFormSection;
    delete global.clearDynamicFields;
    delete global.placeWattField;
    delete global.subcategoryFieldDiv;
    delete global.dtapRow;
    delete global.batteryFieldsDiv;
    delete global.lensFocusScaleSelect;
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
    Object.freeze = originalFreeze;
    Object.isFrozen = originalIsFrozen;
    Object.getOwnPropertyNames = originalGetOwnPropertyNames;
    Object.getOwnPropertyDescriptor = originalGetOwnPropertyDescriptor;
  });

  test('rejects moving a device into a category with a duplicate name', () => {
    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = duplicateBatteryName;
    addDeviceBtn.dataset.originalCategory = 'batteries';
    delete addDeviceBtn.dataset.originalSubcategory;

    newNameInput.value = duplicateBatteryName;
    newCategorySelect.value = 'accessories.batteries';
    newCapacityInput.value = '130';
    newPinAInput.value = '15';
    newDtapAInput.value = '9';

    addDeviceBtn.click();

    expect(global.alert).toHaveBeenLastCalledWith(
      global.texts.en.alertDeviceExists
    );
    expect(global.devices.batteries[duplicateBatteryName]).toBeDefined();
    expect(global.devices.accessories.batteries[duplicateBatteryName]).toBeDefined();
  });

  test('allows renaming a device within the same category', () => {
    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = renameBatteryName;
    addDeviceBtn.dataset.originalCategory = 'batteries';
    delete addDeviceBtn.dataset.originalSubcategory;

    newNameInput.value = renamedBatteryName;
    newCategorySelect.value = 'batteries';
    newCapacityInput.value = '120';
    newPinAInput.value = '14';
    newDtapAInput.value = '8';

    addDeviceBtn.click();

    const expectedMessage = global.texts.en.alertDeviceUpdated
      .replace('{name}', renamedBatteryName)
      .replace('{category}', global.texts.en.category_batteries);

    expect(global.alert).toHaveBeenLastCalledWith(expectedMessage);
    expect(global.devices.batteries[renamedBatteryName]).toBeDefined();
    expect(global.devices.batteries[renameBatteryName]).toBeUndefined();
  });
});
