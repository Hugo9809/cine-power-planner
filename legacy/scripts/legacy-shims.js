(function () {
  var globalScope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : self;
  globalScope.AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
  if (typeof globalScope.monitoringConfigurationSelect === 'undefined') {
    globalScope.monitoringConfigurationSelect = document.getElementById('monitoringConfiguration');
  }
  var viewfinderSettingsRow = document.getElementById('viewfinderSettingsRow');
  var viewfinderExtensionRow = document.getElementById('viewfinderExtensionRow');
  var monitoringConfigurationUserChanged = false;
  globalScope.viewfinderSettingsRow = viewfinderSettingsRow;
  globalScope.viewfinderExtensionRow = viewfinderExtensionRow;
  globalScope.monitoringConfigurationUserChanged = false;
  globalScope.updateViewfinderSettingsVisibility = function () {
    var vfRow = document.getElementById('viewfinderSettingsRow');
    if (!vfRow) return;
    var camSelect = document.getElementById('camera');
    var configSelect = document.getElementById('monitoringConfiguration');
    var camName = camSelect ? camSelect.value : '';
    var devicesData = globalScope.devices || {};
    var cam = (devicesData.cameras || {})[camName];
    var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
    var config = configSelect ? configSelect.value : '';
    var show = hasViewfinder && (config === 'Viewfinder only' || config === 'Viewfinder and Onboard');
    if (show) {
      vfRow.classList.remove('hidden');
    } else {
      vfRow.classList.add('hidden');
      var vfSelect = document.getElementById('viewfinderSettings');
      if (vfSelect) {
        Array.from(vfSelect.options).forEach(function (o) {
          o.selected = false;
        });
      }
    }
  };
  globalScope.updateMonitoringConfigurationOptions = function () {
    var configSelect = document.getElementById('monitoringConfiguration');
    if (!configSelect) return;
    var camSelect = document.getElementById('camera');
    var monitorSelect = document.getElementById('monitor');
    var camName = camSelect ? camSelect.value : '';
    var devicesData = globalScope.devices || {};
    var cam = (devicesData.cameras || {})[camName];
    var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
    var monitorSelected = monitorSelect && monitorSelect.value && monitorSelect.value !== 'None';
    var vfOnlyOption = Array.from(configSelect.options || []).find(function (o) {
      return o.value === 'Viewfinder only';
    });
    if (!vfOnlyOption) return;
    var show = hasViewfinder && !monitorSelected;
    vfOnlyOption.hidden = !show;
    if (globalScope.monitoringConfigurationUserChanged) {
      if (!show && configSelect.value === 'Viewfinder only') {
        configSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
      }
      globalScope.updateViewfinderSettingsVisibility();
      return;
    }
    if (monitorSelected) {
      configSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
    } else if (!hasViewfinder) {
      configSelect.value = 'Onboard Only';
    } else {
      configSelect.value = 'Viewfinder only';
    }
    globalScope.updateViewfinderSettingsVisibility();
  };
  if (typeof globalScope.checkSetupChanged === 'undefined') {
    globalScope.checkSetupChanged = function () {};
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      globalScope.monitoringConfigurationSelect = document.getElementById('monitoringConfiguration');
      globalScope.viewfinderSettingsRow = document.getElementById('viewfinderSettingsRow');
      globalScope.viewfinderExtensionRow = document.getElementById('viewfinderExtensionRow');
    });
  }
  console.log('Legacy shims initialized (Extended)');
})();