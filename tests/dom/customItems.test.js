const { getHtmlBody } = require('../helpers/domUtils');
const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');

describe('custom items integration', () => {
    let originalFreeze;
    let consoleErrorMock;
    let consoleWarnMock;
    let originalConsole;

    // Globals needed for app-events.js
    const requiredGlobals = [
        'unifyDevices', 'getSchemaAttributesForCategory', 'fixPowerInput',
        'ensureList', 'applyFixPowerInput', 'normalizeVideoType',
        'normalizeFizConnectorType', 'normalizeViewfinderType',
        'normalizePowerPortType', 'buildDefaultVideoDistributionAutoGearRules',
        'buildVideoDistributionAutoRules', 'actionMap', 'featureMap',
        'updateCageSelectOptions', 'updateGlobalDevicesReference',
        'scheduleProjectAutoSave', 'ensureAutoBackupsFromProjects',
        'getDiagramManualPositions', 'setManualDiagramPositions',
        'normalizeDiagramPositionsInput', 'normalizeSetupName',
        'createProjectInfoSnapshotForStorage', 'applyDynamicFieldValues',
        'applyBatteryPlateSelectionFromBattery', 'getPowerSelectionSnapshot',
        'applyStoredPowerSelection', 'callCoreFunctionIfAvailable',
        'suspendProjectPersistence', 'createProjectDeletionBackup',
        'resumeProjectPersistence', 'setLensDeviceMountOptions',
        'getLensDeviceMountOptions', 'clearLensDeviceMountOptions',
        'updateMountTypeOptions', 'updateLensFocusScaleSelectOptions',
        'normalizeFocusScale', 'buildSettingsBackupPackage',
        'checkSetupChanged', 'hideFormSection', 'showFormSection',
        'clearDynamicFields', 'placeWattField', 'refreshDeviceLists',
        'populateSelect', 'populateMonitorSelect', 'updateFizConnectorOptions',
        'updateMotorConnectorOptions', 'updateControllerConnectorOptions',
        'updateControllerPowerOptions', 'updateControllerBatteryOptions',
        'updateControllerConnectivityOptions', 'clearMonitorVideoInputs',
        'clearMonitorVideoOutputs', 'clearViewfinderVideoInputs',
        'clearViewfinderVideoOutputs', 'clearBatteryPlates',
        'clearRecordingMedia', 'clearLensMounts', 'clearVideoOutputs',
        'clearVideoInputs', 'clearFizConnectors', 'clearViewfinders',
        'clearTimecodes', 'clearVideoOutputsIO', 'buildDynamicFields',
        'applyFilters', 'updateCalculations', 'storeDevices',
        'getSetups', 'localeSort', 'getSetupSelectElement',
        'addSafeEventListener', 'updatePowerDistTypeOptions',
        'updatePowerDistVoltageOptions', 'updatePowerDistCurrentOptions',
        'updateTimecodeTypeOptions', 'updateDistanceConnectionOptions',
        'invokeCoreFunctionStrict', 'getRecordingMedia', 'getLensMounts',
        'applyDynamicFieldsToDevice', 'syncCoreOptionsArray',
        'getMonitorVideoInputs', 'getMonitorVideoOutputs',
        'getViewfinderVideoInputs', 'getViewfinderVideoOutputs',
        'getVideoInputs', 'getVideoOutputsIO', 'clearDeviceManagerFilterForCategory',
        'resolveFirstPowerInputType', 'removeOriginalDeviceEntry'
    ];

    beforeEach(() => {
        jest.resetModules();

        originalFreeze = Object.freeze;
        Object.freeze = (value) => value;
        Object.isFrozen = () => false;

        originalConsole = global.console;
        consoleErrorMock = jest.fn();
        consoleWarnMock = jest.fn();
        global.console.error = consoleErrorMock;
        global.console.warn = consoleWarnMock;

        document.body.innerHTML = getHtmlBody();

        global.texts = {
            en: {
                alertDeviceExists: 'Duplicate!', alertDeviceAdded: 'Added!',
                addDeviceBtn: 'Add', cancelEditBtn: 'Cancel',
                toggleDeviceManager: 'Toggle', hideDeviceManager: 'Hide',
                category_cameras: 'Cameras', addDeviceBtnHelp: 'Add',
                alertInvalidCameraJSON: 'Invalid Data', confirmDeleteDevice: 'Delete {name}?',
                updateDeviceBtn: 'Update', updateDeviceBtnHelp: 'Update Help',
                cancelEditBtnHelp: 'Cancel Help', alertDeviceName: 'Name!',
                alertDeviceFields: 'Fields!', alertDeviceWatt: 'Watt!'
            }
        };
        global.currentLang = 'en';
        global.ICON_GLYPHS = { add: '+', save: 'S', circleX: 'X', minus: '-', gears: 'G' };
        global.devices = createDeviceSkeleton();
        global.AUTO_GEAR_BACKUP_INTERVAL_MS = 60000;
        global.categoryExcludedAttrs = {};
        global.eventsLogger = { warn: jest.fn(), error: jest.fn() };

        requiredGlobals.forEach(name => {
            global[name] = jest.fn((arg) => {
                const listReturns = [
                    'invokeCoreFunctionStrict', 'getRecordingMedia', 'getLensMounts',
                    'syncCoreOptionsArray', 'getMonitorVideoInputs', 'getMonitorVideoOutputs',
                    'getViewfinderVideoInputs', 'getViewfinderVideoOutputs',
                    'getVideoInputs', 'getVideoOutputsIO'
                ];
                if (listReturns.includes(name)) return [];

                if (name === 'getSetups') return {};
                if (name === 'getDiagramManualPositions') return { positions: {} };
                if (name === 'getLensDeviceMountOptions') return [];
                if (name === 'buildSettingsBackupPackage') return { backups: [] };
                return arg;
            });
        });

        // Specific mock for removeOriginalDeviceEntry to actually delete
        global.removeOriginalDeviceEntry = (storedOriginalCategory, storedOriginalSubcategory, originalName) => {
            if (global.devices[storedOriginalCategory] && global.devices[storedOriginalCategory][originalName]) {
                delete global.devices[storedOriginalCategory][originalName];
            }
        };

        // Specific mock for resolveFirstPowerInputType
        global.resolveFirstPowerInputType = (data) => {
            return (data && data.power && data.power.input && data.power.input.type) || "";
        };

        global.localeSort = (a, b) => a.localeCompare(b);
        global.confirm = jest.fn(() => true);
        global.alert = jest.fn();

        global.setButtonLabelWithIconForEvents = jest.fn();

        const mappings = {
            'addDeviceBtn': 'addDeviceBtn',
            'newCategory': 'newCategorySelect',
            'newName': 'newNameInput',
            'newWatt': 'newWattInput',
            'device-manager': 'deviceManagerSection',
            'toggleDeviceManager': 'toggleDeviceBtn',
            'setupName': 'setupNameInput',
            'saveSetupBtn': 'saveSetupBtn',
            'deleteSetupBtn': 'deleteSetupBtn',
            'cancelEditBtn': 'cancelEditBtn',
            'cameraWatt': 'cameraWattInput',
            'cameraSelect': 'cameraSelect',
            'newSubcategory': 'newSubcategorySelect',
            'exportBtn': 'exportBtn',
            'exportAndRevertBtn': 'exportAndRevertBtn',
            'importDataBtn': 'importDataBtn',
            'importFile': 'importFileInput',
            'languageSelect': 'languageSelect',
            'skipLink': 'skipLink',
            'cameraVoltage': 'cameraVoltageInput',
            'cameraPortType': 'cameraPortTypeInput',
            'batteryFields': 'batteryFieldsDiv',
            'cameraFields': 'cameraFieldsDiv',
            'monitorFields': 'monitorFieldsDiv',
            'viewfinderFields': 'viewfinderFieldsDiv',
            'videoFields': 'videoFieldsDiv',
            'motorFields': 'motorFieldsDiv',
            'controllerFields': 'controllerFieldsDiv',
            'distanceFields': 'distanceFieldsDiv',
            'lensFields': 'lensFieldsDiv',
            'subcategoryField': 'subcategoryFieldDiv',
            'wattField': 'wattFieldDiv',
            'dtapRow': 'dtapRow',
            'dynamicFields': 'dynamicFieldsDiv',
            'newCapacity': 'newCapacityInput',
            'newPinA': 'newPinAInput',
            'newDtapA': 'newDtapAInput',
            'monitorWatt': 'monitorWattInput',
            'monitorVoltage': 'monitorVoltageInput',
            'monitorPortType': 'monitorPortTypeInput',
            'monitorScreenSize': 'monitorScreenSizeInput',
            'monitorBrightness': 'monitorBrightnessInput',
            'monitorWirelessTx': 'monitorWirelessTxInput',
            'monitorLatency': 'monitorLatencyInput',
            'monitorAudioOutput': 'monitorAudioOutputInput',
            'viewfinderWatt': 'viewfinderWattInput',
            'viewfinderVoltage': 'viewfinderVoltageInput',
            'viewfinderPortType': 'viewfinderPortTypeInput',
            'viewfinderScreenSize': 'viewfinderScreenSizeInput',
            'viewfinderBrightness': 'viewfinderBrightnessInput',
            'viewfinderWirelessTx': 'viewfinderWirelessTxInput',
            'viewfinderLatency': 'viewfinderLatencyInput',
            'videoLatency': 'videoLatencyInput',
            'videoFrequency': 'videoFrequencyInput',
            'motorConnector': 'motorConnectorInput',
            'motorInternal': 'motorInternalInput',
            'motorTorque': 'motorTorqueInput',
            'motorGear': 'motorGearInput',
            'motorNotes': 'motorNotesInput',
            'controllerConnector': 'controllerConnectorInput',
            'controllerPower': 'controllerPowerInput',
            'controllerBattery': 'controllerBatteryInput',
            'controllerConnectivity': 'controllerConnectivityInput',
            'controllerNotes': 'controllerNotesInput',
            'distanceConnection': 'distanceConnectionInput',
            'distanceMethod': 'distanceMethodInput',
            'distanceRange': 'distanceRangeInput',
            'distanceAccuracy': 'distanceAccuracyInput',
            'distanceOutput': 'distanceOutputInput',
            'distanceNotes': 'distanceNotesInput',
            'lensFocusScale': 'lensFocusScaleSelect',
            'videoSelect': 'videoSelect',
            'distanceSelect': 'distanceSelect',
            'batterySelect': 'batterySelect'
        };

        Object.keys(mappings).forEach(id => {
            let el = document.getElementById(id);
            if (!el) {
                let tag = 'input';
                if (id.includes('Select') || id.includes('Dropdown') || id.includes('focusScale')) tag = 'select';
                else if (id.includes('Btn') || id.includes('Link')) tag = 'button';
                else if (id.includes('Fields') || id.includes('Row') || id.includes('Field') || id === 'device-manager') tag = 'div';

                el = document.createElement(tag);
                el.id = id;
                document.body.appendChild(el);
            }
            global[mappings[id]] = el;
        });

        // Initialize array globals
        global.motorSelects = [];
        global.controllerSelects = [];
        global.viewfinderTypeOptions = [];
        global.viewfinderConnectorOptions = [];
        global.categoryNames = { en: { cameras: 'Cameras' } };
        global.VIDEO_POWER_INPUT_HELPERS = { mergePowerInput: (p, i) => ({ ...p, input: i }) };

        if (!global.importFileInput) global.importFileInput = document.getElementById('importFile');

        global.setupSelect = document.getElementById('setupSelect') || document.createElement('select');
        global.setupSelect.id = 'setupSelect';
        if (!global.setupSelect.parentElement) document.body.appendChild(global.setupSelect);

        global.getSetupSelectElement = () => global.setupSelect;
        global.getCategoryContainer = (categoryKey, subcategory, { create = false } = {}) => {
            if (!categoryKey) return null;
            let target = global.devices;

            if (categoryKey === 'accessories.cables') {
                if (!subcategory) return null;
                if (!target.accessories) target.accessories = {};
                if (!target.accessories.cables) target.accessories.cables = {};
                if (!target.accessories.cables[subcategory] && create) {
                    target.accessories.cables[subcategory] = {};
                }
                return target.accessories.cables[subcategory];
            }

            if (categoryKey.includes('.')) {
                const parts = categoryKey.split('.');
                parts.forEach(part => {
                    if (!target[part] && create) target[part] = {};
                    target = target[part];
                });
                return target;
            }

            if (!target[categoryKey] && create) target[categoryKey] = {};
            return target[categoryKey];
        };
        global.populateSelect = (select, items) => {
            if (!select) return;
            select.innerHTML = '';
            const def = document.createElement('option');
            def.value = "";
            select.appendChild(def);
            if (!items) return;
            Object.keys(items).forEach(key => {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = key;
                select.appendChild(opt);
            });
        };

        if (global.newCategorySelect) {
            const camOpt = document.createElement('option');
            camOpt.value = 'cameras';
            camOpt.textContent = 'Cameras';
            global.newCategorySelect.appendChild(camOpt);
        }

        global.addSafeEventListener = (el, event, handler) => {
            if (el) el.addEventListener(event, handler);
        };

        jest.isolateModules(() => {
            try {
                require('../../src/scripts/app-events.js');
            } catch (e) {
                console.error("App events load error:", e);
                throw e;
            }
        });
    });

    afterEach(() => {
        Object.freeze = originalFreeze;
        global.console.error = originalConsole.error;
        global.console.warn = originalConsole.warn;
        jest.restoreAllMocks();
    });

    test('adds a new custom camera and persists it', () => {
        const customName = 'My Custom Camera 3000';
        global.newCategorySelect.value = 'cameras';
        global.newCategorySelect.dispatchEvent(new Event('change'));

        global.newNameInput.value = customName;

        if (global.cameraWattInput) global.cameraWattInput.value = '25.5';
        if (global.cameraVoltageInput) global.cameraVoltageInput.value = '14.4-28';
        if (global.cameraPortTypeInput) global.cameraPortTypeInput.value = 'XLR 4-pin';

        global.addDeviceBtn.dataset.mode = 'add';
        global.addDeviceBtn.click();

        expect(global.storeDevices).toHaveBeenCalled();
        expect(global.devices.cameras[customName]).toBeDefined();

        // Assert props are correct
        expect(global.devices.cameras[customName].powerDrawWatts).toBe(25.5);
    });

    test('prevents adding duplicate device', () => {
        const name = 'Existing Cam';
        global.devices.cameras[name] = { powerDrawWatts: 10 };

        global.newCategorySelect.value = 'cameras';
        global.newNameInput.value = name;
        global.addDeviceBtn.click();

        expect(global.alert).toHaveBeenCalledWith(global.texts.en.alertDeviceExists);
        expect(global.storeDevices).not.toHaveBeenCalled();
    });

    test('edits an existing custom device', () => {
        const originalName = 'My Old Cam';
        global.devices.cameras[originalName] = {
            powerDrawWatts: 15,
            power: { input: { type: 'XLR 4-pin', voltageRange: '12V' } }
        };

        // Mock the edit button and event
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.dataset.name = originalName;
        editBtn.dataset.category = 'cameras';
        global.deviceManagerSection.appendChild(editBtn);

        // Simulate click on edit button via delegation
        editBtn.click();

        // Verify we are in edit mode
        expect(global.addDeviceBtn.dataset.mode).toBe('edit');
        expect(global.addDeviceBtn.dataset.originalName).toBe(originalName);
        expect(global.newNameInput.value).toBe(originalName);
        expect(global.cameraWattInput.value).toBe('15');

        // Change values
        const newName = 'My New Cam';
        global.newNameInput.value = newName;
        global.cameraWattInput.value = '30';

        // Click Update
        global.addDeviceBtn.click();

        expect(global.storeDevices).toHaveBeenCalled();

        // Verify old name gone, new name exists
        expect(global.devices.cameras[originalName]).toBeUndefined();
        expect(global.devices.cameras[newName]).toBeDefined();
        expect(global.devices.cameras[newName].powerDrawWatts).toBe(30);
    });

    test('adds a custom battery', () => {
        const name = 'Custom Battery 150Wh';

        const opt = document.createElement('option');
        opt.value = 'batteries';
        global.newCategorySelect.appendChild(opt);

        global.newCategorySelect.value = 'batteries';
        global.newCategorySelect.dispatchEvent(new Event('change'));

        global.newNameInput.value = name;
        global.newCapacityInput.value = '150';
        global.newPinAInput.value = '10';
        global.newDtapAInput.value = '5';

        global.addDeviceBtn.dataset.mode = 'add';
        global.addDeviceBtn.click();

        expect(global.devices.batteries[name]).toBeDefined();
        expect(global.devices.batteries[name].capacity).toBe(150);
        expect(global.devices.batteries[name].pinA).toBe(10);
        expect(global.devices.batteries[name].dtapA).toBe(5);
    });

    test('adds a custom accessory cable', () => {
        const name = 'Custom SDI Cable';

        const opt = document.createElement('option');
        opt.value = 'accessories.cables';
        global.newCategorySelect.appendChild(opt);

        global.newCategorySelect.value = 'accessories.cables';
        global.newCategorySelect.dispatchEvent(new Event('change'));

        // Mock subcategory select population
        const subOpt = document.createElement('option');
        subOpt.value = 'sdi';
        subOpt.textContent = 'SDI';
        global.newSubcategorySelect.appendChild(subOpt);
        global.newSubcategorySelect.value = 'sdi';

        global.newNameInput.value = name;
        global.newWattInput.value = '0';

        global.addDeviceBtn.dataset.mode = 'add';
        global.addDeviceBtn.click();

        expect(global.devices.accessories.cables.sdi[name]).toBeDefined();
    });

    test('deletes a custom device', () => {
        const name = 'To Delete';
        global.devices.cameras[name] = { powerDrawWatts: 50 };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.name = name;
        deleteBtn.dataset.category = 'cameras';
        global.deviceManagerSection.appendChild(deleteBtn);

        deleteBtn.click();

        expect(global.confirm).toHaveBeenCalled();
        expect(global.storeDevices).toHaveBeenCalled();
        expect(global.devices.cameras[name]).toBeUndefined();
    });
});
