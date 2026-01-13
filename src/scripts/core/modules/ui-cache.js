/**
 * ui-cache.js
 *
 * specialized module to hold references to DOM elements used across the application,
 * particularly by app-events.js.
 *
 * This replaces the pattern of declaring 100+ global variables.
 */

// (function () {
export const cineUiCache = {
    _cache: {},

    // Core helper to get or cache an element
    getElement: function (id) {
        if (this._cache[id]) {
            return this._cache[id];
        }
        if (typeof document !== 'undefined') {
            const el = document.getElementById(id);
            if (el) {
                this._cache[id] = el;
                return el;
            }
        }
        return null;
    },

    // Clear cache (useful for testing or full reloads)
    clear: function () {
        this._cache = {};
    }
};

// Define lazy getters for known UI elements
const elementIds = [
    'toggleDeviceManager', 'device-manager', 'saveSetupBtn', 'setupName', 'deleteSetupBtn',
    'addDeviceBtn', 'cancelEditBtn', 'languageSelect', 'skipLink', 'importDataBtn',
    'importFileInput', 'exportDataBtn', 'generateGearListBtn', 'deleteGearListProjectBtn',
    'gearItemEditExtra', 'newSubcategory', 'newCategory', 'subcategoryField',
    'lensFocusScaleUnit', 'newName', 'newWatt', 'newCapacity', 'newPinA', 'newDtapA',
    'menuToggle', 'darkModeToggle', 'pinkModeToggle', 'settingsButton', 'helpButton',
    'reloadButton', 'closeMenuButton', 'openContactsBtn', 'shareSetupBtn',
    'applySharedLinkBtn', 'generateOverviewBtn', 'runtimeFeedbackBtn', 'zoomOut',
    'zoomIn', 'resetView', 'gridSnapToggle', 'accentColorReset', 'localFontsButton',
    'documentationTrackerAddRelease', 'mountVoltageReset', 'autoGearSavePreset',
    'autoGearDeletePreset', 'autoGearBackupRestore', 'autoGearAddRule',
    'autoGearResetFactory', 'autoGearHighlightToggle', 'closePrintPreviewBtn',
    'printPreviewExportBtn', 'printPreviewPrintBtn',

    // Part 2 inputs
    'cameraWatt', 'monitorWatt', 'viewfinderWatt', 'cameraVoltage', 'cameraPortType',
    'monitorScreenSize', 'monitorBrightness', 'monitorVoltage', 'monitorPortType',
    'monitorLatency', 'monitorAudioOutput', 'viewfinderScreenSize',
    'viewfinderBrightness', 'viewfinderVoltage', 'viewfinderPortType', 'viewfinderLatency',

    // Fields Divs
    'batteryFields', 'cameraFields', 'monitorFields', 'viewfinderFields', 'videoFields',
    'motorFields', 'controllerFields', 'distanceFields', 'lensFields', 'wattField',
    'dynamicFields'
];

elementIds.forEach(function (id) {
    Object.defineProperty(cineUiCache, id, {
        get: function () {
            return this.getElement(id);
        },
        enumerable: true,
        configurable: true
    });
});

// Expose to global scope for now (compatibility)
// Expose to global scope for now (compatibility)
if (typeof globalThis !== 'undefined') {
    globalThis.cineUiCache = cineUiCache;
} else if (typeof window !== 'undefined') {
    window.cineUiCache = cineUiCache;
} else if (typeof self !== 'undefined') {
    self.cineUiCache = cineUiCache;
} else if (typeof global !== 'undefined') {
    global.cineUiCache = cineUiCache;
}

// CommonJS export
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = UI_CACHE;
// }
// })();
export default cineUiCache;
