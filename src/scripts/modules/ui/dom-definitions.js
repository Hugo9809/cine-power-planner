/**
 * DOM Definitions Module
 *
 * Handles the definition of global UI getters for the Cine Power Planner.
 * Extracted from src/scripts/core/app-events.js.
 */

// Helper to define global getters for UI elements
export function defineUiGetter(name, id, cache) {
    const targetId = id || name;
    const targetScope = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : {});

    try {
        Object.defineProperty(targetScope, name, {
            get: function () {
                return (cache && cache[targetId]) || (cache && typeof cache.getElement === 'function' ? cache.getElement(targetId) : null);
            },
            configurable: true,
            enumerable: true // Mimic var behavior
        });
    } catch (e) {
        // Fallback for strict mode or environments where globalThis is frozen
        try {
            targetScope[name] = null;
        } catch (assignError) {
            // Ignore
        }
    }
}

export function initializeGlobalUiAccessors(uiCache) {
    if (!uiCache) return;

    // Redefine global variables to use the UI_CACHE getters
    defineUiGetter('toggleDeviceBtn', 'toggleDeviceManager', uiCache);
    defineUiGetter('deviceManagerSection', 'device-manager', uiCache);

    defineUiGetter('saveSetupBtn', null, uiCache);
    defineUiGetter('setupNameInput', 'setupName', uiCache);
    defineUiGetter('deleteSetupBtn', null, uiCache);
    defineUiGetter('addDeviceBtn', null, uiCache);
    defineUiGetter('cancelEditBtn', null, uiCache);
    defineUiGetter('languageSelect', null, uiCache);
    defineUiGetter('skipLink', null, uiCache);
    defineUiGetter('importDataBtn', null, uiCache);
    defineUiGetter('importFileInput', null, uiCache);
    defineUiGetter('exportBtn', 'exportDataBtn', uiCache);
    defineUiGetter('generateGearListBtn', null, uiCache);
    defineUiGetter('deleteGearListProjectBtn', null, uiCache);
    defineUiGetter('gearItemEditExtra', null, uiCache);
    defineUiGetter('newSubcategorySelect', 'newSubcategory', uiCache);
    defineUiGetter('newCategorySelect', 'newCategory', uiCache);
    defineUiGetter('subcategoryFieldDiv', 'subcategoryField', uiCache);
    defineUiGetter('lensFocusScaleSelect', 'lensFocusScaleUnit', uiCache);
    defineUiGetter('newNameInput', 'newName', uiCache);
    defineUiGetter('newWattInput', 'newWatt', uiCache);
    defineUiGetter('newCapacityInput', 'newCapacity', uiCache);
    defineUiGetter('newPinAInput', 'newPinA', uiCache);
    defineUiGetter('newDtapAInput', 'newDtapA', uiCache);
    defineUiGetter('menuToggle', null, uiCache);
    defineUiGetter('darkModeToggle', null, uiCache);
    defineUiGetter('pinkModeToggle', null, uiCache);
    defineUiGetter('settingsButton', null, uiCache);
    defineUiGetter('settingsDialog', null, uiCache);
    defineUiGetter('settingsSave', null, uiCache);
    defineUiGetter('settingsCancel', null, uiCache);
    defineUiGetter('settingsLanguage', null, uiCache);
    defineUiGetter('settingsDarkMode', null, uiCache);
    defineUiGetter('settingsPinkMode', null, uiCache);
    defineUiGetter('settingsHighContrast', null, uiCache);
    defineUiGetter('settingsReduceMotion', null, uiCache);
    defineUiGetter('settingsRelaxedSpacing', null, uiCache);
    defineUiGetter('settingsShowAutoBackups', null, uiCache);
    defineUiGetter('settingsTemperatureUnit', null, uiCache);
    defineUiGetter('settingsFontSize', null, uiCache);
    defineUiGetter('settingsFontFamily', null, uiCache);
    defineUiGetter('settingsLogo', null, uiCache);
    defineUiGetter('settingsLogoPreview', null, uiCache);
    defineUiGetter('accentColorInput', null, uiCache);
    defineUiGetter('helpButton', null, uiCache);
    defineUiGetter('reloadButton', null, uiCache);
    defineUiGetter('closeMenuButton', null, uiCache);
    defineUiGetter('openContactsBtn', null, uiCache);
    defineUiGetter('shareSetupBtn', null, uiCache);
    defineUiGetter('applySharedLinkBtn', null, uiCache);
    defineUiGetter('generateOverviewBtn', null, uiCache);
    defineUiGetter('runtimeFeedbackBtn', null, uiCache);
    defineUiGetter('zoomOut', null, uiCache);
    defineUiGetter('zoomIn', null, uiCache);
    defineUiGetter('resetView', null, uiCache);
    defineUiGetter('gridSnapToggle', null, uiCache);
    defineUiGetter('accentColorReset', null, uiCache);
    defineUiGetter('resolvedLocalFontsButton', 'localFontsButton', uiCache);
    defineUiGetter('documentationTrackerAddRelease', null, uiCache);
    defineUiGetter('mountVoltageReset', null, uiCache);
    defineUiGetter('autoGearSavePreset', null, uiCache);
    defineUiGetter('autoGearDeletePreset', null, uiCache);
    defineUiGetter('autoGearBackupRestore', null, uiCache);
    defineUiGetter('autoGearAddRule', null, uiCache);
    defineUiGetter('autoGearResetFactory', null, uiCache);
    defineUiGetter('autoGearHighlightToggle', null, uiCache);
    defineUiGetter('closePrintPreviewBtn', null, uiCache);
    defineUiGetter('printPreviewExportBtn', null, uiCache);
    defineUiGetter('printPreviewPrintBtn', null, uiCache);
    defineUiGetter('projectForm', null, uiCache);

    // Added by Agent for V2 Device Library Compatibility
    defineUiGetter('wattFieldDiv', 'wattField', uiCache);
    defineUiGetter('dtapRow', null, uiCache); // Assuming ID is dtapRow
    defineUiGetter('cameraFieldsDiv', 'cameraFields', uiCache);
    defineUiGetter('monitorFieldsDiv', 'monitorFields', uiCache);
    defineUiGetter('viewfinderFieldsDiv', 'viewfinderFields', uiCache);
    defineUiGetter('batteryFieldsDiv', 'batteryFields', uiCache);
    defineUiGetter('lensFieldsDiv', 'lensFields', uiCache);
    defineUiGetter('videoFieldsDiv', 'videoFields', uiCache);
    defineUiGetter('motorFieldsDiv', 'motorFields', uiCache);
    defineUiGetter('controllerFieldsDiv', 'controllerFields', uiCache);
    defineUiGetter('distanceFieldsDiv', 'distanceFields', uiCache);

    defineUiGetter('cameraWattInput', 'cameraWatt', uiCache);
    defineUiGetter('cameraVoltageInput', 'cameraVoltage', uiCache);
    defineUiGetter('cameraPortTypeInput', 'cameraPortType', uiCache);

    defineUiGetter('monitorScreenSizeInput', 'monitorScreenSize', uiCache);
    defineUiGetter('monitorBrightnessInput', 'monitorBrightness', uiCache);
    defineUiGetter('monitorWattInput', 'monitorWatt', uiCache);
    defineUiGetter('monitorVoltageInput', 'monitorVoltage', uiCache);
    defineUiGetter('monitorPortTypeInput', 'monitorPortType', uiCache);
    defineUiGetter('monitorWirelessTxInput', 'monitorWirelessTx', uiCache);
    defineUiGetter('monitorLatencyInput', 'monitorLatency', uiCache);
    defineUiGetter('monitorAudioOutputInput', 'monitorAudioOutput', uiCache);

    defineUiGetter('viewfinderScreenSizeInput', 'viewfinderScreenSize', uiCache);
    defineUiGetter('viewfinderBrightnessInput', 'viewfinderBrightness', uiCache);
    defineUiGetter('viewfinderWattInput', 'viewfinderWatt', uiCache);
    defineUiGetter('viewfinderVoltageInput', 'viewfinderVoltage', uiCache);
    defineUiGetter('viewfinderPortTypeInput', 'viewfinderPortType', uiCache);
    defineUiGetter('viewfinderWirelessTxInput', 'viewfinderWirelessTx', uiCache);
    defineUiGetter('viewfinderLatencyInput', 'viewfinderLatency', uiCache);

    defineUiGetter('videoFrequencyInput', null, uiCache);
    defineUiGetter('videoLatencyInput', null, uiCache);

    defineUiGetter('motorConnectorInput', null, uiCache);
    defineUiGetter('motorInternalInput', null, uiCache);
    defineUiGetter('motorTorqueInput', null, uiCache);
    defineUiGetter('motorGearInput', null, uiCache);
    defineUiGetter('motorNotesInput', null, uiCache);

    defineUiGetter('controllerConnectorInput', null, uiCache);
    defineUiGetter('controllerPowerInput', null, uiCache);
    defineUiGetter('controllerBatteryInput', null, uiCache);
    defineUiGetter('controllerConnectivityInput', null, uiCache);
    defineUiGetter('controllerNotesInput', null, uiCache);

    defineUiGetter('distanceConnectionInput', null, uiCache);
    defineUiGetter('distanceMethodInput', null, uiCache);
    defineUiGetter('distanceRangeInput', null, uiCache);
    defineUiGetter('distanceAccuracyInput', null, uiCache);
    defineUiGetter('distanceOutputInput', null, uiCache);
    defineUiGetter('distanceNotesInput', null, uiCache);

    // Part 2 Repeats (Ensuring full consistency)
    defineUiGetter('dynamicFieldsDiv', 'dynamicFields', uiCache);
}
