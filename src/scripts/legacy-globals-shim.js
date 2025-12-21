


(function () {
    if (typeof window === 'undefined') return;

    // Restore critical globals previously in app-core-new-1.js
    // Executed immediately so subsequent scripts (app-events.js, app-session.js) find these variables defined.
    // Even if getElementById returns null (DOM not ready), defining them as null on window prevents ReferenceErrors.

    if (!window.cameraSelect) window.cameraSelect = document.getElementById("cameraSelect");
    if (!window.monitorSelect) window.monitorSelect = document.getElementById("monitorSelect");
    if (!window.videoSelect) window.videoSelect = document.getElementById("videoSelect");
    if (!window.videoDistributionSelect) window.videoDistributionSelect = document.getElementById("videoDistribution");
    if (!window.cageSelect) window.cageSelect = document.getElementById("cageSelect");

    if (!window.motorSelects) {
        window.motorSelects = [
            document.getElementById("motor1Select"),
            document.getElementById("motor2Select"),
            document.getElementById("motor3Select"),
            document.getElementById("motor4Select")
        ];
    }

    if (!window.controllerSelects) {
        window.controllerSelects = [
            document.getElementById("controller1Select"),
            document.getElementById("controller2Select"),
            document.getElementById("controller3Select"),
            document.getElementById("controller4Select")
        ];
    }

    if (!window.distanceSelect) window.distanceSelect = document.getElementById("distanceSelect");
    if (!window.batterySelect) window.batterySelect = document.getElementById("batterySelect");
    if (!window.hotswapSelect) window.hotswapSelect = document.getElementById("batteryHotswapSelect");
    if (!window.lensSelect) window.lensSelect = document.getElementById("lenses");

    // Export Button (used in app-events.js)
    if (!window.exportBtn) window.exportBtn = document.getElementById("exportDataBtn");

    // Other globals found in app-core-new-1.js that might be needed
    if (!window.crewContainer) window.crewContainer = document.getElementById("crewContainer");
    if (!window.prepContainer) window.prepContainer = document.getElementById("prepContainer");
    if (!window.shootContainer) window.shootContainer = document.getElementById("shootContainer");
    if (!window.returnContainer) window.returnContainer = document.getElementById("returnContainer");
    if (!window.storageNeedsContainer) window.storageNeedsContainer = document.getElementById("storageNeedsContainer");

    // Dialogs
    if (!window.projectDialogCloseBtn) window.projectDialogCloseBtn = document.getElementById("projectDialogClose");
    if (!window.setupNameInput) window.setupNameInput = document.getElementById("setupName");

    // Project Management UI (restored from app-core-new-1.js)
    if (!window.setupSelect) window.setupSelect = document.getElementById("setupSelect");
    if (!window.saveSetupBtn) window.saveSetupBtn = document.getElementById("saveSetupBtn");
    if (!window.deleteSetupBtn) window.deleteSetupBtn = document.getElementById("deleteSetupBtn");
    if (!window.shareSetupBtn) window.shareSetupBtn = document.getElementById("shareSetupBtn");

    if (!window.sharedLinkInput) window.sharedLinkInput = document.getElementById("sharedLinkInput");
    if (!window.applySharedLinkBtn) window.applySharedLinkBtn = document.getElementById("applySharedLinkBtn");
    if (!window.shareLinkMessage) window.shareLinkMessage = document.getElementById("shareLinkMessage");

    // Missing Global State Variables
    if (typeof window.showAutoBackups === "undefined") window.showAutoBackups = false;

    // Missing UI Elements
    if (typeof window.autoGearAddRuleBtn === "undefined") window.autoGearAddRuleBtn = document.getElementById("autoGearAddRuleBtn");
    if (typeof window.autoGearConditionAddButton === "undefined") window.autoGearConditionAddButton = document.getElementById("autoGearConditionAddBtn");

    if (typeof window.autoGearScenarioBaseSelect === "undefined") window.autoGearScenarioBaseSelect = document.getElementById("autoGearScenarioBaseSelect");

    // Missing UI Selects
    if (!window.batteryPlateSelect) window.batteryPlateSelect = document.getElementById("batteryPlateSelect");
    if (!window.hotswapSelect) window.hotswapSelect = document.getElementById("batteryHotswapSelect");

    // Missing State Objects
    if (!window.autoGearActiveConditions) window.autoGearActiveConditions = new Set();

    // Share/Export Dialog mappings for app-setups.js
    if (!window.shareDialog) window.shareDialog = document.getElementById("shareDialog");
    if (!window.shareForm) window.shareForm = document.getElementById("shareForm");
    if (!window.shareFilename) window.shareFilename = document.getElementById("shareFilename");
    if (!window.shareFilenameInput) window.shareFilenameInput = window.shareFilename || document.getElementById("shareFilename");
    if (!window.shareFilenameMessage) window.shareFilenameMessage = document.getElementById("shareFilenameMessage");
    if (!window.shareIncludeAutoGear) window.shareIncludeAutoGear = document.getElementById("shareIncludeAutoGear");
    if (!window.shareIncludeAutoGearCheckbox) window.shareIncludeAutoGearCheckbox = window.shareIncludeAutoGear || document.getElementById("shareIncludeAutoGear");
    if (!window.shareIncludeAutoGearLabel) window.shareIncludeAutoGearLabel = document.getElementById("shareIncludeAutoGearLabel");
    if (!window.shareIncludeAutoGearLabelElem) window.shareIncludeAutoGearLabelElem = window.shareIncludeAutoGearLabel || document.getElementById("shareIncludeAutoGearLabel");
    if (!window.shareIncludeOwnedGear) window.shareIncludeOwnedGear = document.getElementById("shareIncludeOwnedGear");
    if (!window.shareIncludeOwnedGearCheckbox) window.shareIncludeOwnedGearCheckbox = window.shareIncludeOwnedGear || document.getElementById("shareIncludeOwnedGear");
    if (!window.shareIncludeOwnedGearLabel) window.shareIncludeOwnedGearLabel = document.getElementById("shareIncludeOwnedGearLabel");
    if (!window.shareIncludeOwnedGearLabelElem) window.shareIncludeOwnedGearLabelElem = window.shareIncludeOwnedGearLabel || document.getElementById("shareIncludeOwnedGearLabel");
    if (!window.shareCancelBtn) window.shareCancelBtn = document.getElementById("shareCancelBtn");
    if (!window.shareConfirmBtn) window.shareConfirmBtn = document.getElementById("shareConfirmBtn");

    // Import Dialog mappings for app-setups.js
    if (!window.sharedImportDialog) window.sharedImportDialog = document.getElementById("sharedImportDialog");
    if (!window.sharedImportForm) window.sharedImportForm = document.getElementById("sharedImportForm");
    if (!window.sharedImportModeSelect) window.sharedImportModeSelect = document.getElementById("sharedImportModeSelect");
    if (!window.sharedImportCancelBtn) window.sharedImportCancelBtn = document.getElementById("sharedImportCancelBtn");
    if (!window.sharedImportConfirmBtn) window.sharedImportConfirmBtn = document.getElementById("sharedImportConfirmBtn");

    // Sorting Helper (moved from app-core-new-1.js to allow early use in auto-gear modules)
    if (!window.localeSort) {
        let localeSortCollator = null;
        window.localeSort = function localeSort(a, b) {
            const stringA = typeof a === 'string' ? a : (a && typeof a.toString === 'function' ? a.toString() : '');
            const stringB = typeof b === 'string' ? b : (b && typeof b.toString === 'function' ? b.toString() : '');
            if (!localeSortCollator) {
                try {
                    localeSortCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                } catch {
                    localeSortCollator = false;
                }
            }
            if (localeSortCollator && typeof localeSortCollator.compare === 'function') {
                return localeSortCollator.compare(stringA, stringB);
            }
            return stringA.localeCompare(stringB);
        };
    }

    // Pink Mode Shims
    if (typeof window.cineCorePinkModeSupport !== 'undefined') {
        const pm = window.cineCorePinkModeSupport;
        if (!window.resolvePinkModeLottieRuntime && pm.resolvePinkModeLottieRuntime) window.resolvePinkModeLottieRuntime = pm.resolvePinkModeLottieRuntime;
        if (!window.ensurePinkModeLottieRuntime && pm.ensurePinkModeLottieRuntime) window.ensurePinkModeLottieRuntime = pm.ensurePinkModeLottieRuntime;

        if (!window.setPinkModeIconSequence && pm.setPinkModeIconSequence) window.setPinkModeIconSequence = pm.setPinkModeIconSequence;
        if (!window.loadPinkModeIconsFromFiles && pm.loadPinkModeIconsFromFiles) window.loadPinkModeIconsFromFiles = pm.loadPinkModeIconsFromFiles;
        if (typeof window.PINK_MODE_ICON_FALLBACK_MARKUP === 'undefined' && pm.PINK_MODE_ICON_FALLBACK_MARKUP) window.PINK_MODE_ICON_FALLBACK_MARKUP = pm.PINK_MODE_ICON_FALLBACK_MARKUP;
    }

    // Unconditional Fallbacks to prevent TypeError/ReferenceError
    if (typeof window.resolvePinkModeLottieRuntime !== 'function') {
        window.resolvePinkModeLottieRuntime = function () { return null; };
    }
    if (typeof window.ensurePinkModeLottieRuntime !== 'function') {
        window.ensurePinkModeLottieRuntime = function () { return Promise.resolve(null); };
    }
    if (typeof window.setPinkModeIconSequence !== 'function') {
        window.setPinkModeIconSequence = function () { };
    }
    if (typeof window.loadPinkModeIconsFromFiles !== 'function') {
        window.loadPinkModeIconsFromFiles = function () { return Promise.resolve(); };
    }
    if (typeof window.PINK_MODE_ICON_FALLBACK_MARKUP === 'undefined') {
        window.PINK_MODE_ICON_FALLBACK_MARKUP = [];
    }

    console.log("Legacy globals shim executed. Global UI references and localeSort restored.");
})();
