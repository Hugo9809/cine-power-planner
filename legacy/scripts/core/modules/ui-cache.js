(function () {
  var UI_CACHE = {
    _cache: {},
    getElement: function getElement(id) {
      if (this._cache[id]) {
        return this._cache[id];
      }
      if (typeof document !== 'undefined') {
        var el = document.getElementById(id);
        if (el) {
          this._cache[id] = el;
          return el;
        }
      }
      return null;
    },
    clear: function clear() {
      this._cache = {};
    }
  };
  var elementIds = ['toggleDeviceManager', 'device-manager', 'saveSetupBtn', 'setupName', 'deleteSetupBtn', 'addDeviceBtn', 'cancelEditBtn', 'languageSelect', 'skipLink', 'importDataBtn', 'importFileInput', 'exportDataBtn', 'generateGearListBtn', 'deleteGearListProjectBtn', 'gearItemEditExtra', 'newSubcategory', 'newCategory', 'subcategoryField', 'lensFocusScaleUnit', 'newName', 'newWatt', 'newCapacity', 'newPinA', 'newDtapA', 'menuToggle', 'darkModeToggle', 'pinkModeToggle', 'settingsButton', 'helpButton', 'reloadButton', 'closeMenuButton', 'openContactsBtn', 'shareSetupBtn', 'applySharedLinkBtn', 'generateOverviewBtn', 'runtimeFeedbackBtn', 'zoomOut', 'zoomIn', 'resetView', 'gridSnapToggle', 'accentColorReset', 'localFontsButton', 'documentationTrackerAddRelease', 'mountVoltageReset', 'autoGearSavePreset', 'autoGearDeletePreset', 'autoGearBackupRestore', 'autoGearAddRule', 'autoGearResetFactory', 'autoGearHighlightToggle', 'closePrintPreviewBtn', 'printPreviewExportBtn', 'printPreviewPrintBtn', 'cameraWatt', 'monitorWatt', 'viewfinderWatt', 'cameraVoltage', 'cameraPortType', 'monitorScreenSize', 'monitorBrightness', 'monitorVoltage', 'monitorPortType', 'monitorLatency', 'monitorAudioOutput', 'viewfinderScreenSize', 'viewfinderBrightness', 'viewfinderVoltage', 'viewfinderPortType', 'viewfinderLatency', 'batteryFields', 'cameraFields', 'monitorFields', 'viewfinderFields', 'videoFields', 'motorFields', 'controllerFields', 'distanceFields', 'lensFields', 'wattField', 'dynamicFields'];
  elementIds.forEach(function (id) {
    Object.defineProperty(UI_CACHE, id, {
      get: function get() {
        return this.getElement(id);
      },
      enumerable: true,
      configurable: true
    });
  });
  if (typeof globalThis !== 'undefined') {
    globalThis.cineUiCache = UI_CACHE;
  } else if (typeof window !== 'undefined') {
    window.cineUiCache = UI_CACHE;
  } else if (typeof self !== 'undefined') {
    self.cineUiCache = UI_CACHE;
  } else if (typeof global !== 'undefined') {
    global.cineUiCache = UI_CACHE;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI_CACHE;
  }
})();