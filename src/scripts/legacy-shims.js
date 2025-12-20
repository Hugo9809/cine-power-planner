(function () {
    var globalScope = (typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : self));

    // --- Constants ---
    globalScope.AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;

    // --- Global DOM References ---
    // Ensure these are available globally as legacy code expects
    if (typeof globalScope.monitoringConfigurationSelect === 'undefined') {
        globalScope.monitoringConfigurationSelect = document.getElementById('monitoringConfiguration');
    }

    // These were local variables in the bundle, but might be needed globally or by the functions below
    var viewfinderSettingsRow = document.getElementById('viewfinderSettingsRow');
    var viewfinderExtensionRow = document.getElementById('viewfinderExtensionRow');
    var monitoringConfigurationUserChanged = false;

    // Expose them to global scope just in case other parts look for them
    globalScope.viewfinderSettingsRow = viewfinderSettingsRow;
    globalScope.viewfinderExtensionRow = viewfinderExtensionRow;
    // monitoringConfigurationUserChanged needs to be tracked. If other modules set it, they likely set a global.
    globalScope.monitoringConfigurationUserChanged = false;

    // --- Missing Functions from app-core-new-1.js ---

    globalScope.updateViewfinderSettingsVisibility = function () {
        // Re-fetched elements to be safe
        var vfRow = document.getElementById('viewfinderSettingsRow');
        if (!vfRow) return;

        var camSelect = document.getElementById('camera');
        var configSelect = document.getElementById('monitoringConfiguration');

        var camName = camSelect ? camSelect.value : '';
        // Safely access devices global
        var devicesData = globalScope.devices || {};
        var cam = (devicesData.cameras || {})[camName];

        var hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
        var config = configSelect ? configSelect.value : '';
        var show = hasViewfinder && (config === 'Viewfinder only' || config === 'Viewfinder and Onboard');

        if (show) {
            vfRow.classList.remove('hidden');
        } else {
            vfRow.classList.add('hidden');
            var vfSelect = document.getElementById('viewfinderSettings');
            if (vfSelect) {
                Array.from(vfSelect.options).forEach(function (o) { o.selected = false; });
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

        var hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
        var monitorSelected = monitorSelect && monitorSelect.value && monitorSelect.value !== 'None';

        var vfOnlyOption = Array.from(configSelect.options || []).find(function (o) { return o.value === 'Viewfinder only'; });
        if (!vfOnlyOption) return;

        var show = hasViewfinder && !monitorSelected;
        vfOnlyOption.hidden = !show;

        // Use global tracker if set
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

    // --- Missing Functions from app-core-new-2.js ---

    // Stub checkSetupChanged to prevent crash. 
    // Full implementation requires deep dependency tree (computeSetupSignature, etc).
    if (typeof globalScope.checkSetupChanged === 'undefined') {
        globalScope.checkSetupChanged = function () {
            // console.debug('checkSetupChanged stub called');
        };
    }

    // Ensure DOM elements are bound when DOM is ready (helper)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            globalScope.monitoringConfigurationSelect = document.getElementById('monitoringConfiguration');
            globalScope.viewfinderSettingsRow = document.getElementById('viewfinderSettingsRow');
            globalScope.viewfinderExtensionRow = document.getElementById('viewfinderExtensionRow');
        });
    }

    console.log('Legacy shims initialized (Extended)');
})();
