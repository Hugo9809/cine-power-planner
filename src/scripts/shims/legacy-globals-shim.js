


(function () {
    if (typeof window === 'undefined') return;

    // Restore critical globals previously in app-core-new-1.js
    // Executed immediately so subsequent scripts (app-events.js, app-session.js) find these variables defined.
    // Even if getElementById returns null (DOM not ready), defining them as null on window prevents ReferenceErrors.

    if (typeof window.ICON_FONT_KEYS === 'undefined') {
        window.ICON_FONT_KEYS = {
            UICONS: 'uicons',
            ESSENTIAL: 'essential',
            GADGET: 'gadget',
            FILM: 'film',
            TEXT: 'text'
        };
    }

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

    // Restoration of legacy global variables for V2/Vite compatibility
    (function () {
        if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
            window.global = window;
        }

        // Safety check for window.devices structure which is critical for the V2 UI
    })();

    // Backup Shims
    // Ensure clearBackupVault is available as a promise-returning function to prevent runtime reference errors
    if (typeof window.clearBackupVault !== 'function') {
        window.clearBackupVault = function () {
            // Return true to signal "done" (even if nothing happened)
            if (typeof Promise !== 'undefined') {
                return Promise.resolve(true);
            }
            return {
                then: function (cb) { cb(true); return this; },
                catch: function () { return this; }
            };
        };
    }

    if (typeof window.isBackupVaultFallbackActive !== 'function') {
        window.isBackupVaultFallbackActive = function () {
            return false;
        };
    }

    // Auto-Gear ReferenceError Shims
    if (typeof window.autoGearBackups === "undefined") window.autoGearBackups = [];
    if (typeof window.autoGearBackupEmptyMessage === "undefined") window.autoGearBackupEmptyMessage = null;
    if (typeof window.autoGearEditorActiveItem === "undefined") window.autoGearEditorActiveItem = null;
    if (typeof window.autoGearShowBackupsCheckbox === "undefined") window.autoGearShowBackupsCheckbox = null;
    if (typeof window.autoGearMonitorCatalogUpdatePending === "undefined") window.autoGearMonitorCatalogUpdatePending = false;
    if (typeof window.autoGearAutoPresetIdState === "undefined") window.autoGearAutoPresetIdState = '';

    if (typeof window.actionMap === "undefined") window.actionMap = new Map();

    if (typeof window.autoGearScenarioFilter === "undefined") window.autoGearScenarioFilter = 'all';
    if (typeof window.hasSeededAutoGearDefaults !== 'function') window.hasSeededAutoGearDefaults = function () { return false; };

    if (typeof window.autoGearRules === "undefined") window.autoGearRules = [];
    if (typeof window.baseAutoGearRulesState === "undefined") window.baseAutoGearRulesState = [];
    if (typeof window.projectScopedAutoGearRules === "undefined") window.projectScopedAutoGearRules = null;
    if (typeof window.autoGearPresets === "undefined") window.autoGearPresets = [];
    if (typeof window.autoGearBackupsVisible === "undefined") window.autoGearBackupsVisible = false;
    if (typeof window.autoGearMonitorDefaults === "undefined") window.autoGearMonitorDefaults = {};
    if (typeof window.autoGearEditorDraft === "undefined") window.autoGearEditorDraft = null;
    if (typeof window.autoGearSearchQuery === "undefined") window.autoGearSearchQuery = '';
    if (typeof window.autoGearSummaryFocus === "undefined") window.autoGearSummaryFocus = 'all';

    // Additional UI Reference Shims
    if (typeof window.autoGearSearchInput === "undefined") window.autoGearSearchInput = document.getElementById('autoGearSearch');
    if (typeof window.autoGearFilterScenarioSelect === "undefined") window.autoGearFilterScenarioSelect = document.getElementById('autoGearFilterScenario');
    if (typeof window.autoGearFilterClearButton === "undefined") window.autoGearFilterClearButton = document.getElementById('autoGearFilterClear');
    if (typeof window.autoGearDeletePresetButton === "undefined") window.autoGearDeletePresetButton = document.getElementById('autoGearDeletePreset');
    if (typeof window.autoGearDraftPendingWarnings === "undefined") window.autoGearDraftPendingWarnings = null;
    if (typeof window.autoGearBackupsHiddenNotice === "undefined") window.autoGearBackupsHiddenNotice = document.getElementById('autoGearBackupsHiddenNotice');
    if (typeof window.batteryCountElem === "undefined") window.batteryCountElem = document.getElementById('batteryCount');
    if (typeof window.autoGearDraftImpactList === "undefined") window.autoGearDraftImpactList = document.getElementById('autoGearDraftImpactList');
    if (typeof window.autoGearDraftWarningList === "undefined") window.autoGearDraftWarningList = document.getElementById('autoGearDraftWarningList');
    if (typeof window.autoGearDraftWarningContainer === "undefined") window.autoGearDraftWarningContainer = document.getElementById('autoGearDraftWarningContainer');
    if (typeof window.autoGearBackupsSection === "undefined") window.autoGearBackupsSection = document.getElementById('autoGearBackupsSection');
    if (typeof window.autoGearBackupControls === "undefined") window.autoGearBackupControls = document.getElementById('autoGearBackupControls');
    if (typeof window.autoGearBackupSelect === "undefined") window.autoGearBackupSelect = document.getElementById('autoGearBackupSelect');
    if (typeof window.autoGearBackupRestoreButton === "undefined") window.autoGearBackupRestoreButton = document.getElementById('autoGearBackupRestore');
    if (typeof window.autoGearRulesList === "undefined") window.autoGearRulesList = document.getElementById('autoGearRulesList');
    if (typeof window.autoGearPresetSelect === "undefined") window.autoGearPresetSelect = document.getElementById('autoGearPresetSelect');
    if (typeof window.autoGearSavePresetButton === "undefined") window.autoGearSavePresetButton = document.getElementById('autoGearSavePreset');
    if (typeof window.autoGearEditor === "undefined") window.autoGearEditor = document.getElementById('autoGearEditor');

    if (typeof window.applyFilterSelectionsToGearList !== 'function') window.applyFilterSelectionsToGearList = function () { };
    if (typeof window.renderFilterDetails !== 'function') window.renderFilterDetails = function () { };
    if (typeof window.openDialog !== 'function') window.openDialog = function () { };
    if (typeof window.isDialogOpen !== 'function') window.isDialogOpen = function () { return false; };
    if (typeof window.scheduleSettingsTabsOverflowUpdate !== 'function') window.scheduleSettingsTabsOverflowUpdate = function () { };
    if (typeof window.applySessionMountVoltagePreferences !== 'function') window.applySessionMountVoltagePreferences = function () { };

    // Auto-Gear DOM Elements
    // Categorized Auto-Gear Selectors
    var autoGearSelectors = [
        'autoGearCameraSelect', 'autoGearOwnGearSelect', 'autoGearMonitorSelect',
        'autoGearMotorsSelect', 'autoGearControllersSelect', 'autoGearDistanceSelect',
        'autoGearWirelessSelect', 'autoGearVideoDistributionSelect', 'autoGearTripodHeadBrandSelect',
        'autoGearTripodBowlSelect', 'autoGearTripodTypesSelect', 'autoGearTripodSpreaderSelect',
        'autoGearCrewPresentSelect', 'autoGearCrewAbsentSelect', 'autoGearDeliveryResolutionSelect',
        'autoGearMatteboxSelect', 'autoGearViewfinderExtensionSelect', 'autoGearScenariosSelect',
        'autoGearAddOwnGearSelect', 'autoGearRemoveOwnGearSelect', 'autoGearAddCategorySelect',
        'autoGearRemoveCategorySelect', 'autoGearScenarioModeSelect', 'autoGearCameraWeightModeSelect',
        'autoGearCameraModeSelect', 'autoGearOwnGearModeSelect', 'autoGearMonitorModeSelect',
        'autoGearMotorsModeSelect', 'autoGearControllersModeSelect', 'autoGearDistanceModeSelect',
        'autoGearWirelessModeSelect', 'autoGearVideoDistributionModeSelect', 'autoGearTripodHeadBrandModeSelect',
        'autoGearTripodBowlModeSelect', 'autoGearTripodTypesModeSelect', 'autoGearTripodSpreaderModeSelect',
        'autoGearCrewPresentModeSelect', 'autoGearCrewAbsentModeSelect', 'autoGearDeliveryResolutionModeSelect',
        'autoGearMatteboxModeSelect', 'autoGearViewfinderExtensionModeSelect',
        'autoGearAddNameInput', 'autoGearAddQuantityInput', 'autoGearAddScreenSizeInput',
        'autoGearAddNotesInput', 'autoGearRemoveNameInput', 'autoGearRemoveQuantityInput',
        'autoGearRemoveScreenSizeInput', 'autoGearRemoveNotesInput', 'autoGearImportInput',
        'autoGearBackupRetentionInput', 'autoGearAddItemButton', 'autoGearRemoveItemButton',
        'autoGearSaveRuleButton', 'autoGearCancelEditButton', 'autoGearExportButton',
        'autoGearImportButton', 'autoGearAddList', 'autoGearRemoveList',
        'autoGearDraftImpactContainer', 'autoGearDraftImpactList',
        'autoGearDraftWarningContainer', 'autoGearDraftWarningList',
        'autoGearAddSelectorDefaultInput', 'autoGearRemoveSelectorDefaultInput',
        'autoGearSummarySection', 'autoGearSummaryHeadingElem', 'autoGearSummaryDescriptionElem',
        'autoGearSummaryCards', 'autoGearSummaryDetails', 'autoGearSummaryLast',
        'autoGearMonitorDefaultsSection', 'autoGearCameraWeightSection',
        'autoGearHeadingElem', 'autoGearMonitorDefaultsHeading', 'autoGearAddItemsHeading',
        'autoGearRemoveItemsHeading', 'autoGearDraftImpactHeading', 'autoGearDraftWarningHeading',
        'autoGearBackupsHeading', 'autoGearDescriptionElem', 'autoGearMonitorDefaultsDescription',
        'autoGearSearchLabel', 'autoGearFilterScenarioLabel', 'autoGearPresetDescription',
        'autoGearPresetLabel', 'autoGearConditionSelectLabel', 'autoGearAlwaysLabel',
        'autoGearAlwaysHelp', 'autoGearDefaultFocusMonitorLabel', 'autoGearDefaultHandheldMonitorLabel',
        'autoGearDefaultComboMonitorLabel', 'autoGearDefaultDirectorMonitorLabel',
        'autoGearBackupsDescription', 'autoGearDraftImpactDescription',
        'autoGearDefaultFocusMonitorSelect', 'autoGearDefaultHandheldMonitorSelect',
        'autoGearDefaultComboMonitorSelect', 'autoGearDefaultDirectorMonitorSelect',
        'autoGearConditionSelect', 'autoGearSavePresetButton', 'autoGearDeletePresetButton',
        'autoGearAddRuleBtn', 'autoGearResetFactoryButton', 'autoGearConditionAddButton',
        'autoGearMonitorDefaultControls', 'autoGearRulesList', 'autoGearConditionControls',
        'autoGearConditionList', 'autoGearConditionAddShortcuts', 'autoGearConditionRemoveButtons',
        'autoGearSummaryFocus'
    ];

    autoGearSelectors.forEach(function (name) {
        if (typeof window[name] === "undefined") {
            var id = name.replace('Select', '').replace('autoGear', 'autoGear'); // Fallback logic
            // Most of these follow a pattern, but some don't. document.getElementById is safest.
            window[name] = document.getElementById(name.replace('Select', '')) || null;
        }
    });

    if (typeof window.getAutoGearOwnGearItems !== 'function') window.getAutoGearOwnGearItems = function () { return []; };
    if (typeof window.findAutoGearOwnGearById !== 'function') window.findAutoGearOwnGearById = function () { return null; };
    if (typeof window.formatOwnGearQuantityText !== 'function') window.formatOwnGearQuantityText = function (q) { return q; };
    if (typeof window.collectAutoGearSelectedValues !== 'function') window.collectAutoGearSelectedValues = function () { return []; };
    if (typeof window.buildFilterGearEntries !== 'function') window.buildFilterGearEntries = function () { return []; };
    if (typeof window.collectFilterAccessories !== 'function') window.collectFilterAccessories = function () { return []; };
    if (typeof window.buildFilterSelectHtml !== 'function') window.buildFilterSelectHtml = function () { return ''; };
    if (typeof window.gearItemTranslations === 'undefined') window.gearItemTranslations = {};

    if (typeof window.refreshAutoGearScenarioFilterOptions !== 'function') {
        window.refreshAutoGearScenarioFilterOptions = function () { };
    }
    if (typeof window.updateAutoGearMonitorCatalogOptions !== 'function') {
        window.updateAutoGearMonitorCatalogOptions = function () { };
    }
    if (typeof window.sortAutoGearPresets !== 'function') {
        window.sortAutoGearPresets = function (presets) { return Array.isArray(presets) ? presets : []; };
    }
    if (typeof window.activateSettingsTab !== 'function') {
        window.activateSettingsTab = function () { };
    }
    if (typeof window.activeSettingsTabId === 'undefined') {
        window.activeSettingsTabId = '';
    }
    if (typeof window.ensureGearListActions !== 'function') {
        window.ensureGearListActions = function () { };
    }
    if (typeof window.setInstallBannerOffset !== 'function') {
        window.setInstallBannerOffset = function () { };
    }
    if (typeof window.parseFilterTokens !== 'function') {
        // Fallback that will be overridden by app-session.js once it loads
        window.parseFilterTokens = function (str) {
            if (!str) return [];
            return str.split(',').map(s => {
                const parts = s.split(':').map(p => p.trim());
                return { type: parts[0], size: parts[1] || '4x5.65', values: parts[2] ? parts[2].split('|') : [] };
            }).filter(t => t.type);
        };
    }

    console.log("Legacy globals shim executed. Global UI references and localeSort restored.");

    // Helper functions restored for app-session.js
    if (!window.getBatteryMountType) {
        window.getBatteryMountType = function getBatteryMountType(batteryName) {
            if (!batteryName || batteryName === 'None') {
                return '';
            }
            const info = window.devices && window.devices.batteries ? window.devices.batteries[batteryName] : null;
            const mount = info && typeof info.mount_type === 'string' ? info.mount_type : '';
            return mount || '';
        };
    }

    if (!window.normalizeBatteryPlateValue) {
        window.normalizeBatteryPlateValue = function normalizeBatteryPlateValue(plateValue, batteryName) {
            const normalizedPlate = typeof plateValue === 'string' ? plateValue.trim() : '';
            const derivedMount = window.getBatteryMountType(batteryName);
            if (!derivedMount) {
                return normalizedPlate;
            }
            if (!normalizedPlate || normalizedPlate !== derivedMount) {
                return derivedMount;
            }
            return normalizedPlate;
        };
    }
})();
