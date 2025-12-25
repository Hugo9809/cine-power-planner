const { getHtmlBody } = require('../helpers/domUtils');
const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('device manager filter visibility', () => {
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
    ['subcategoryFieldDiv', 'subcategoryField'],
    ['dtapRow', 'dtapRow'],
    ['cameraFieldsDiv', 'cameraFields'],
    ['monitorFieldsDiv', 'monitorFields'],
    ['viewfinderFieldsDiv', 'viewfinderFields'],
    ['videoFieldsDiv', 'videoFields'],
    ['motorFieldsDiv', 'motorFields'],
    ['controllerFieldsDiv', 'controllerFields'],
    ['distanceFieldsDiv', 'distanceFields'],
    ['lensFieldsDiv', 'lensFields'],
  ];

  let originalFreeze;
  let originalIsFrozen;
  let originalGetOwnPropertyNames;
  let originalGetOwnPropertyDescriptor;

  beforeEach(() => {
    jest.resetModules();

    document.body.innerHTML = getHtmlBody();

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

    ELEMENT_BINDINGS.forEach(([key, id]) => {
      const element = document.getElementById(id);
      if (element) {
        global[key] = element;
      }
    });

    if (!global.subcategoryFieldDiv) {
      global.subcategoryFieldDiv = document.createElement('div');
    }
    if (!global.dtapRow) {
      global.dtapRow = document.createElement('div');
    }
    if (!global.batteryFieldsDiv) {
      global.batteryFieldsDiv = document.createElement('div');
    }
    if (!global.lensFocusScaleSelect) {
      global.lensFocusScaleSelect = document.createElement('select');
    }
    if (global.newCategorySelect && !Array.from(global.newCategorySelect.options).some(opt => opt.value === 'batteries')) {
      const batteriesOption = document.createElement('option');
      batteriesOption.value = 'batteries';
      global.newCategorySelect.appendChild(batteriesOption);
    }

    const skeleton = createDeviceSkeleton();
    global.devices = skeleton;

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

    const container = document.getElementById('deviceListContainer');
    const batteriesSection = document.createElement('div');
    batteriesSection.className = 'device-category';
    const heading = document.createElement('h4');
    heading.dataset.categoryKey = 'batteries';
    batteriesSection.appendChild(heading);
    const filterInput = document.createElement('input');
    filterInput.type = 'search';
    filterInput.className = 'list-filter';
    filterInput.dataset.categoryKey = 'batteries';
    filterInput.id = 'batteriesListFilter';
    batteriesSection.appendChild(filterInput);
    const monitorList = document.createElement('ul');
    monitorList.id = 'batteriesList';
    batteriesSection.appendChild(monitorList);
    container.appendChild(batteriesSection);

    global.texts = {
      en: {
        alertDeviceExists: 'duplicate',
        alertDeviceUpdated: 'updated {name}',
        alertDeviceAdded: 'added {name}',
        alertDeviceFields: 'fields',
        alertDeviceName: 'name required',
        alertDeviceWatt: 'watt required',
        addDeviceBtn: 'Add',
        addDeviceBtnHelp: 'Add device to the library.',
        updateDeviceBtn: 'Update',
        updateDeviceBtnHelp: 'Update device in the library.',
        cancelEditBtn: 'Cancel',
        cancelEditBtnHelp: 'Cancel editing the device.',
        toggleDeviceManager: 'Toggle',
        toggleDeviceManagerHelp: 'Show device manager',
        hideDeviceManager: 'Hide',
        hideDeviceManagerHelp: 'Hide device manager',
        category_batteries: 'Batteries',
        showDetails: 'Show details',
        editBtn: 'Edit',
        editBtnHelp: 'Edit device',
        deleteDeviceBtn: 'Delete',
        deleteDeviceBtnHelp: 'Delete device',
      },
    };
    global.categoryNames = { en: { batteries: 'Batteries' } };
    global.currentLang = 'en';
    global.ICON_GLYPHS = { add: '+', save: '✓', circleX: '×', gears: '⚙', minus: '-' };

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
    global.getMonitorVideoInputs = () => [];
    global.getMonitorVideoOutputs = () => [];
    global.getViewfinderVideoInputs = () => [];
    global.getViewfinderVideoOutputs = () => [];
    global.getVideoInputs = () => [];
    global.getVideoOutputsIO = () => [];
    global.updateMountTypeOptions = noop;
    global.updateLensFocusScaleSelectOptions = noop;
    global.normalizeFocusScale = (value) => value;
    global.buildSettingsBackupPackage = () => ({ backups: [] });
    global.checkSetupChanged = noop;
    global.AUTO_GEAR_BACKUP_INTERVAL_MS = 60000;
    global.removeOriginalDeviceEntry = noop;
    global.autoBackup = jest.fn();
    global.hideFormSection = noop;
    global.showFormSection = noop;
    global.clearDynamicFields = noop;
    global.placeWattField = noop;
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
    global.applyFilters = noop;
    global.updateCalculations = noop;
    global.updateFizConnectorOptions = noop;
    global.updateMotorConnectorOptions = noop;
    global.updateControllerConnectorOptions = noop;
    global.updateControllerPowerOptions = noop;
    global.updateControllerBatteryOptions = noop;
    global.updateControllerConnectivityOptions = noop;
    global.updateDistanceConnectionOptions = noop;
    global.updateDistanceMethodOptions = noop;
    global.updateDistanceDisplayOptions = noop;
    global.populateSelect = jest.fn();
    global.populateMonitorSelect = jest.fn();
    global.refreshDeviceLists = jest.fn();
    global.storeDevices = jest.fn();
    global.motorSelects = [];
    global.controllerSelects = [];
    global.monitorSelects = [];
    global.distanceSelect = document.createElement('select');
    global.batterySelect = document.createElement('select');
    global.cameraSelect = document.createElement('select');
    global.categoryExcludedAttrs = {};
    global.eventsLogger = { warn: noop, error: noop };
    global.alert = jest.fn();

    jest.isolateModules(() => {
      require('../../src/scripts/core/app-events.js');
    });
  });

  afterEach(() => {
    ELEMENT_BINDINGS.forEach(([key]) => {
      delete global[key];
    });
    delete global.devices;
    delete global.getCategoryContainer;
    delete global.texts;
    delete global.categoryNames;
    delete global.currentLang;
    delete global.ICON_GLYPHS;
    delete global.categoryExcludedAttrs;
    delete global.eventsLogger;
    delete global.alert;
    Object.freeze = originalFreeze;
    Object.isFrozen = originalIsFrozen;
    Object.getOwnPropertyNames = originalGetOwnPropertyNames;
    Object.getOwnPropertyDescriptor = originalGetOwnPropertyDescriptor;
    document.body.innerHTML = '';
  });

  test('clears a category filter when a new device would otherwise be hidden', async () => {
    const filterInput = document.getElementById('batteriesListFilter');
    filterInput.value = 'existing';

    const categorySelect = document.getElementById('newCategory');
    categorySelect.value = 'batteries';
    categorySelect.dispatchEvent(new Event('change'));

    document.getElementById('newName').value = 'Brand New Battery';
    global.newCapacityInput.value = '150';
    global.newPinAInput.value = '12';
    global.newDtapAInput.value = '6';

    document.getElementById('addDeviceBtn').click();
    await flushPromises();

    expect(global.alert).toHaveBeenLastCalledWith('added Brand New Battery');
    expect(global.devices.batteries['Brand New Battery']).toBeDefined();
    expect(filterInput.value).toBe('');
  });
});
