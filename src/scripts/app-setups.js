/* global getManualDownloadFallbackMessage, getDiagramManualPositions, normalizeAutoGearShootingDayValue,
          normalizeAutoGearShootingDaysCondition, normalizeAutoGearCameraWeightCondition, evaluateAutoGearCameraWeightCondition,
          getAutoGearMonitorDefault, getSetupNameState,
          createProjectInfoSnapshotForStorage, getProjectAutoSaveOverrides, getAutoGearRuleCoverageSummary,
          normalizeBatteryPlateValue, setSelectValue, applyBatteryPlateSelectionFromBattery, enqueueCoreBootTask,
          callCoreFunctionIfAvailable, cineGearList */

const AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK =
    (typeof globalThis !== 'undefined' && globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN)
        ? globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN
        : '__any__';

let projectPersistenceSuspendedCount = 0;

function suspendProjectPersistence() {
    projectPersistenceSuspendedCount += 1;
}

function resumeProjectPersistence() {
    if (projectPersistenceSuspendedCount > 0) {
        projectPersistenceSuspendedCount -= 1;
    }
    return projectPersistenceSuspendedCount;
}

function isProjectPersistenceSuspended() {
    return projectPersistenceSuspendedCount > 0;
}

const localGetLocalizedText = (() => {
    function fallbackGetLocalizedText(key) {
        if (!key) return '';

        const scope = getGlobalScope();
        const allTexts =
            (scope && typeof scope.texts === 'object' && scope.texts)
            || (typeof texts === 'object' && texts)
            || null;

        if (!allTexts) {
            return '';
        }

        const scopeLang =
            scope
            && typeof scope.currentLang === 'string'
            && typeof allTexts[scope.currentLang] === 'object'
                ? scope.currentLang
                : null;

        const localLang =
            typeof currentLang === 'string'
            && typeof allTexts[currentLang] === 'object'
                ? currentLang
                : null;

        const langKey = scopeLang || localLang || 'en';
        const langTexts = (typeof allTexts[langKey] === 'object' && allTexts[langKey]) || {};

        const directValue = Object.prototype.hasOwnProperty.call(langTexts, key)
            ? langTexts[key]
            : undefined;

        if (typeof directValue === 'string') {
            return directValue;
        }

        const fallbackTexts = (typeof allTexts.en === 'object' && allTexts.en) || {};
        const fallbackValue = Object.prototype.hasOwnProperty.call(fallbackTexts, key)
            ? fallbackTexts[key]
            : undefined;

        return typeof fallbackValue === 'string' ? fallbackValue : '';
    }

    let loggedGlobalFailure = false;

    return function resolveLocalizedText(key) {
        const scope = getGlobalScope();
        const globalFn =
            scope
            && typeof scope.getLocalizedText === 'function'
            && scope.getLocalizedText !== resolveLocalizedText
                ? scope.getLocalizedText
                : null;

        if (globalFn) {
            try {
                const value = globalFn(key);
                if (typeof value === 'string') {
                    return value;
                }
            } catch (error) {
                if (!loggedGlobalFailure && typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('getLocalizedText fallback used after global failure', error);
                    loggedGlobalFailure = true;
                }
            }
        }

        return fallbackGetLocalizedText(key);
    };
})();

const localizationScope = getGlobalScope();
if (localizationScope && typeof localizationScope.getLocalizedText !== 'function') {
    localizationScope.getLocalizedText = localGetLocalizedText;
}

// --- NEW SETUP MANAGEMENT FUNCTIONS ---

function hasMeaningfulPowerSelection(value) {
    if (typeof value !== 'string') return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    return trimmed.toLowerCase() !== 'none';
}

function normalizePowerSelectionString(value) {
    if (typeof value === 'string') return value.trim();
    if (value === null || value === undefined) return '';
    return String(value);
}

function assignSelectValue(select, value) {
    if (!select) return;
    if (typeof setSelectValue === 'function') {
        setSelectValue(select, value);
    } else if (value === undefined) {
        select.selectedIndex = -1;
    } else {
        select.value = value;
    }
}

function getGlobalScope() {
    return (
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null
    );
}

const SETUPS_DEEP_CLONE = (() => {
    const scope = getGlobalScope();
    if (scope && typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
    }

    return function setupsFallbackDeepClone(value) {
        if (value === null || typeof value !== 'object') {
            return value;
        }

        try {
            return JSON.parse(JSON.stringify(value));
        } catch (cloneError) {
            void cloneError;
        }

        return value;
    };
})();

function gearListGetSafeHtmlSectionsImpl(html) {
    const normalizedHtml = typeof html === 'string' ? html : '';
    const fallbackResult = {
        projectHtml: '',
        gearHtml: normalizedHtml
    };

    const scope = getGlobalScope();

    const splitter =
        typeof splitGearListHtml === 'function'
            ? splitGearListHtml
            : scope && typeof scope.splitGearListHtml === 'function'
                ? scope.splitGearListHtml
                : null;

    if (!splitter) {
        return fallbackResult;
    }

    try {
        const result = splitter(normalizedHtml);
        if (!result || typeof result !== 'object') {
            return fallbackResult;
        }

        const projectHtml =
            typeof result.projectHtml === 'string' ? result.projectHtml : '';
        const gearHtml =
            typeof result.gearHtml === 'string'
                ? result.gearHtml
                : projectHtml
                    ? ''
                    : normalizedHtml;

        return {
            projectHtml,
            gearHtml
        };
    } catch (error) {
        console.warn('Failed to split gear list HTML', error);
        return fallbackResult;
    }
}

function resolveElementById(id, globalName) {
    const doc = typeof document !== 'undefined' ? document : null;
    if (doc && typeof doc.getElementById === 'function') {
        const element = doc.getElementById(id);
        if (element) {
            return element;
        }
    }

    const scope = getGlobalScope();
    if (scope && globalName && typeof scope === 'object') {
        try {
            const candidate = scope[globalName];
            if (candidate) {
                return candidate;
            }
        } catch (error) {
            void error;
        }
    }

    return null;
}

function resolveGearListModule() {
    const scope = getGlobalScope();
    const candidates = [];

    if (typeof cineGearList === 'object' && cineGearList) {
        candidates.push(cineGearList);
    }

    if (scope && typeof scope.cineGearList === 'object' && scope.cineGearList) {
        if (!candidates.includes(scope.cineGearList)) {
            candidates.push(scope.cineGearList);
        }
    }

    if (typeof require === 'function') {
        try {
            const required = require('./modules/gear-list.js');
            if (required && typeof required === 'object' && !candidates.includes(required)) {
                candidates.push(required);
            }
        } catch (error) {
            void error;
        }
    }

    for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (!candidate || typeof candidate.setImplementation !== 'function') {
            continue;
        }
        return candidate;
    }

    return null;
}

function registerGearListModuleImplementation() {
    const module = resolveGearListModule();
    const implementation = {
        getSafeGearListHtmlSections: gearListGetSafeHtmlSectionsImpl,
        generateGearListHtml: gearListGenerateHtmlImpl,
        getCurrentGearListHtml: gearListGetCurrentHtmlImpl
    };

    if (module && typeof module.setImplementation === 'function') {
        try {
            module.setImplementation(implementation, { source: 'app-setups' });
            return true;
        } catch (error) {
            if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                console.warn('Unable to register gear list implementation with cineGearList.', error);
            }
        }
    }

    const scope = getGlobalScope();
    if (scope && typeof scope === 'object') {
        try { scope.getSafeGearListHtmlSections = gearListGetSafeHtmlSectionsImpl; } catch (error) { void error; }
        try { scope.generateGearListHtml = gearListGenerateHtmlImpl; } catch (error) { void error; }
        try { scope.getCurrentGearListHtml = gearListGetCurrentHtmlImpl; } catch (error) { void error; }
    }

    return false;
}

registerGearListModuleImplementation();

function buildShareUiContext() {
    return {
        dialog: resolveElementById('shareDialog', 'shareDialog'),
        form: resolveElementById('shareForm', 'shareForm'),
        filenameInput: resolveElementById('shareFilename', 'shareFilenameInput'),
        filenameMessage: resolveElementById('shareFilenameMessage', 'shareFilenameMessage'),
        linkMessage: resolveElementById('shareLinkMessage', 'shareLinkMessage'),
        includeAutoGearCheckbox: resolveElementById('shareIncludeAutoGear', 'shareIncludeAutoGearCheckbox'),
        includeAutoGearLabel: resolveElementById('shareIncludeAutoGearLabel', 'shareIncludeAutoGearLabelElem'),
        cancelButton: resolveElementById('shareCancelBtn', 'shareCancelBtn'),
        sharedLinkInput: resolveElementById('sharedLinkInput', 'sharedLinkInput'),
        applySharedLinkButton: resolveElementById('applySharedLinkBtn', 'applySharedLinkBtn'),
    };
}

function buildSharedImportUiContext() {
    return {
        dialog: resolveElementById('sharedImportDialog', 'sharedImportDialog'),
        form: resolveElementById('sharedImportForm', 'sharedImportForm'),
        modeSelect: resolveElementById('sharedImportModeSelect', 'sharedImportModeSelect'),
        cancelButton: resolveElementById('sharedImportCancelBtn', 'sharedImportCancelBtn'),
    };
}

let cachedShareUiContext = null;
let cachedSharedImportUiContext = null;
let projectDialogInitialSnapshot = null;

function getShareUiContext(scope) {
    if (scope && typeof scope === 'object' && scope.context && typeof scope.context === 'object') {
        return scope.context;
    }

    if (!cachedShareUiContext) {
        cachedShareUiContext = buildShareUiContext();
    }

    return cachedShareUiContext;
}

function getSharedImportUiContext(scope) {
    if (scope && typeof scope === 'object' && scope.context && typeof scope.context === 'object') {
        return scope.context;
    }

    if (!cachedSharedImportUiContext) {
        cachedSharedImportUiContext = buildSharedImportUiContext();
    }

    return cachedSharedImportUiContext;
}

function cloneProjectDialogState(value) {
    if (value === null || value === undefined) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(item => cloneProjectDialogState(item));
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
        const clone = {};
        Object.keys(value).forEach(key => {
            clone[key] = cloneProjectDialogState(value[key]);
        });
        return clone;
    }
    return value;
}

function getProjectDialogSeedInfo() {
    if (currentProjectInfo) {
        return cloneProjectDialogState(currentProjectInfo);
    }
    if (projectForm) {
        try {
            return cloneProjectDialogState(collectProjectFormData());
        } catch (error) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Failed to read current project form data before opening dialog', error);
            }
        }
    }
    return {};
}

function captureProjectDialogSnapshot() {
    if (!projectForm) {
        projectDialogInitialSnapshot = null;
        return;
    }
    try {
        const snapshot = collectProjectFormData();
        projectDialogInitialSnapshot = cloneProjectDialogState(snapshot);
    } catch (error) {
        projectDialogInitialSnapshot = null;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to capture project dialog snapshot', error);
        }
    }
}

function openProjectDialogWithInfo(info) {
    if (projectForm) {
        const seed = info && typeof info === 'object' ? info : {};
        populateProjectForm(seed);
        captureProjectDialogSnapshot();
    } else {
        projectDialogInitialSnapshot = null;
    }
    openDialog(projectDialog);
}

function restoreProjectDialogSnapshot() {
    if (!projectForm) return;
    if (projectDialogInitialSnapshot && typeof projectDialogInitialSnapshot === 'object') {
        populateProjectForm(cloneProjectDialogState(projectDialogInitialSnapshot));
    } else {
        projectForm.reset();
    }
}

function callSetupsCoreFunction(functionName, args = [], options = {}) {
    if (typeof callCoreFunctionIfAvailable === 'function') {
        return callCoreFunctionIfAvailable(functionName, args, options);
    }

    const scope =
        (typeof globalThis !== 'undefined' ? globalThis : null)
        || (typeof window !== 'undefined' ? window : null)
        || (typeof self !== 'undefined' ? self : null)
        || (typeof global !== 'undefined' ? global : null)
        || null;

    const target =
        typeof functionName === 'string'
            ? scope && scope[functionName]
            : functionName;

    if (typeof target === 'function') {
        try {
            return target.apply(scope, args);
        } catch (invokeError) {
            if (typeof console !== 'undefined' && typeof console.error === 'function') {
                console.error(`Failed to invoke ${functionName}`, invokeError);
            }
        }
        return undefined;
    }

    if (options && options.defer === true) {
        const queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
        if (queue) {
            queue.push(() => {
                callSetupsCoreFunction(functionName, args, { ...options, defer: false });
            });
        }
    }

    return (options && Object.prototype.hasOwnProperty.call(options, 'defaultValue'))
        ? options.defaultValue
        : undefined;
}

function getSetupsCoreValue(functionName, options = {}) {
    const defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue')
        ? options.defaultValue
        : '';
    const value = callSetupsCoreFunction(functionName, [], { defaultValue });
    if (typeof value === 'string') {
        return value;
    }
    if (value === null || value === undefined) {
        return defaultValue;
    }
    try {
        return String(value);
    } catch (coerceError) {
        void coerceError;
        return defaultValue;
    }
}

function getGlobalCineUi() {
    const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

    if (!scope || typeof scope !== 'object') {
        return null;
    }

    try {
        const candidate = scope.cineUi;
        return candidate && typeof candidate === 'object' ? candidate : null;
    } catch (error) {
        void error;
        return null;
    }
}

function isCineUiEntryRegistered(registry, name) {
    if (!registry || typeof registry !== 'object') {
        return false;
    }

    if (typeof registry.get === 'function') {
        try {
            return Boolean(registry.get(name));
        } catch (error) {
            void error;
        }
    }

    if (typeof registry.list === 'function') {
        try {
            const entries = registry.list();
            return Array.isArray(entries) && entries.indexOf(name) !== -1;
        } catch (error) {
            void error;
        }
    }

    return false;
}

function registerCineUiEntries(registry, entries, warningMessage) {
    if (!registry || typeof registry.register !== 'function') {
        return;
    }

    for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        if (!entry || typeof entry.name !== 'string') {
            continue;
        }

        if (isCineUiEntryRegistered(registry, entry.name)) {
            continue;
        }

        try {
            registry.register(entry.name, entry.value);
        } catch (error) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn(warningMessage, error);
            }
        }
    }
}

function areSetupsEntriesRegistered(cineUi) {
    if (!cineUi || typeof cineUi !== 'object') {
        return false;
    }

    const controllers = cineUi.controllers;
    const interactions = cineUi.interactions;
    const help = cineUi.help;

    return (
        isCineUiEntryRegistered(controllers, 'shareDialog')
        && isCineUiEntryRegistered(controllers, 'sharedImportDialog')
        && isCineUiEntryRegistered(interactions, 'shareOpen')
        && isCineUiEntryRegistered(interactions, 'shareSubmit')
        && isCineUiEntryRegistered(interactions, 'shareCancel')
        && isCineUiEntryRegistered(interactions, 'shareApplyFile')
        && isCineUiEntryRegistered(interactions, 'shareInputChange')
        && isCineUiEntryRegistered(interactions, 'sharedImportSubmit')
        && isCineUiEntryRegistered(interactions, 'sharedImportCancel')
        && isCineUiEntryRegistered(help, 'shareProject')
        && isCineUiEntryRegistered(help, 'sharedImport')
    );
}

let setupsCineUiRegistered = areSetupsEntriesRegistered(getGlobalCineUi());

function enqueueCineUiRegistration(callback) {
    const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

    if (!scope || typeof callback !== 'function') {
        return;
    }

    try {
        const existing = scope.cineUi && typeof scope.cineUi === 'object'
            ? scope.cineUi
            : null;

        if (existing) {
            callback(existing);
            return;
        }
    } catch (callbackError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('cineUi registration callback (setups) failed', callbackError);
        }
        return;
    }

    const key = '__cineUiReadyQueue';
    if (!Array.isArray(scope[key])) {
        scope[key] = [];
    }

    scope[key].push(callback);
}

function getPowerSelectionSnapshot() {
    if (!batterySelect && !batteryPlateSelect && !hotswapSelect) return null;
    const rawBattery = batterySelect ? normalizePowerSelectionString(batterySelect.value) : '';
    const rawPlate = batteryPlateSelect ? normalizePowerSelectionString(batteryPlateSelect.value) : '';
    const rawHotswap = hotswapSelect ? normalizePowerSelectionString(hotswapSelect.value) : '';
    const normalizedPlate = typeof normalizeBatteryPlateValue === 'function'
        ? normalizeBatteryPlateValue(rawPlate, rawBattery)
        : rawPlate;
    const snapshot = {
        batteryPlate: normalizedPlate || '',
        battery: rawBattery || '',
        batteryHotswap: rawHotswap || ''
    };
    if (!snapshot.batteryPlate && !snapshot.battery && !snapshot.batteryHotswap) {
        return null;
    }
    return snapshot;
}

function applyStoredPowerSelection(selection, { preferExisting = true } = {}) {
    if (!selection || typeof selection !== 'object') return false;
    const target = {
        batteryPlate: normalizePowerSelectionString(selection.batteryPlate),
        battery: normalizePowerSelectionString(selection.battery),
        batteryHotswap: normalizePowerSelectionString(selection.batteryHotswap)
    };
    const shouldOverwriteBattery = !preferExisting
        || !hasMeaningfulPowerSelection(batterySelect && batterySelect.value);
    const shouldOverwritePlate = !preferExisting
        || !hasMeaningfulPowerSelection(batteryPlateSelect && batteryPlateSelect.value);
    const shouldOverwriteHotswap = !preferExisting
        || !hasMeaningfulPowerSelection(hotswapSelect && hotswapSelect.value);

    const matchesTarget = (select, desired) => {
        if (!select) return false;
        if (desired === '') {
            return !select.value || select.value === 'None' || select.selectedIndex === -1;
        }
        return select.value === desired;
    };

    let anyMatch = false;
    let anyPending = false;
    if (batterySelect) {
        if (target.battery && shouldOverwriteBattery) {
            assignSelectValue(batterySelect, target.battery);
            if (matchesTarget(batterySelect, target.battery)) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (!target.battery && !preferExisting) {
            assignSelectValue(batterySelect, '');
            if (matchesTarget(batterySelect, '')) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (matchesTarget(batterySelect, target.battery)) {
            anyMatch = true;
        }
    }
    if (batteryPlateSelect) {
        if (target.batteryPlate && shouldOverwritePlate) {
            assignSelectValue(batteryPlateSelect, target.batteryPlate);
            if (matchesTarget(batteryPlateSelect, target.batteryPlate)) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (!target.batteryPlate && !preferExisting) {
            assignSelectValue(batteryPlateSelect, '');
            if (matchesTarget(batteryPlateSelect, '')) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (matchesTarget(batteryPlateSelect, target.batteryPlate)) {
            anyMatch = true;
        }
    }
    if (typeof applyBatteryPlateSelectionFromBattery === 'function') {
        applyBatteryPlateSelectionFromBattery(
            batterySelect ? batterySelect.value : target.battery,
            batteryPlateSelect ? batteryPlateSelect.value : target.batteryPlate
        );
    }
    if (hotswapSelect) {
        if (target.batteryHotswap && shouldOverwriteHotswap) {
            assignSelectValue(hotswapSelect, target.batteryHotswap);
            if (matchesTarget(hotswapSelect, target.batteryHotswap)) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (!target.batteryHotswap && !preferExisting) {
            assignSelectValue(hotswapSelect, '');
            if (matchesTarget(hotswapSelect, '')) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (matchesTarget(hotswapSelect, target.batteryHotswap)) {
            anyMatch = true;
        }
    }
    return anyPending ? false : anyMatch;
}

// Generate a printable overview of the current selected setup in a new tab
if (typeof generateOverviewBtn !== 'undefined' && generateOverviewBtn) {
    generateOverviewBtn.addEventListener('click', () => {
        if (!setupSelect.value) { // Ensure a setup is selected
            alert(texts[currentLang].alertSelectSetupForOverview);
            return;
        }
        generatePrintableOverview();
    });
}

function batteryPinsSufficient() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    if (!isFinite(totalCurrentLow)) return true;
    return totalCurrentLow <= battData.pinA;
}

function alertPinExceeded() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    alert(
        texts[currentLang].warnPinExceeded
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', battData.pinA)
    );
}

// Generate a printable gear list for the current setup
generateGearListBtn.addEventListener('click', () => {
    if (!setupSelect.value) {
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    if (!batteryPinsSufficient()) {
        alertPinExceeded();
        return;
    }
    const seedInfo = getProjectDialogSeedInfo();
    if (seedInfo && typeof seedInfo === 'object') {
        populateRecordingResolutionDropdown(seedInfo.recordingResolution);
        populateSensorModeDropdown(seedInfo.sensorMode);
        populateCodecDropdown(seedInfo.codec);
    }
    openProjectDialogWithInfo(seedInfo);
});

if (deleteGearListProjectBtn) {
    deleteGearListProjectBtn.addEventListener('click', () => {
        deleteCurrentGearList();
    });
}

const projectCancelBtnRef = typeof projectCancelBtn !== 'undefined' ? projectCancelBtn : null;
if (projectCancelBtnRef) {
    projectCancelBtnRef.addEventListener('click', () => {
        restoreProjectDialogSnapshot();
        closeDialog(projectDialog);
    });
}

if (projectDialogCloseBtn) {
    projectDialogCloseBtn.addEventListener('click', () => {
        if (projectCancelBtnRef) {
            projectCancelBtnRef.click();
        } else {
            closeDialog(projectDialog);
        }
    });
}

if (projectDialog) {
    projectDialog.addEventListener('cancel', event => {
        if (event) event.preventDefault();
        if (projectCancelBtnRef) {
            projectCancelBtnRef.click();
        } else {
            restoreProjectDialogSnapshot();
            closeDialog(projectDialog);
        }
    });
}

if (projectForm) {
    projectForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!batteryPinsSufficient()) {
            alertPinExceeded();
            return;
        }
        const info = collectProjectFormData();
        currentProjectInfo = info;
        ensureZoomRemoteSetup(info);
        const html = gearListGenerateHtmlImpl(info);
        displayGearAndRequirements(html);
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        // Persist the generated gear list and current project name so that
        // a page reload can restore the visible gear list without requiring
        // any additional user action.
        saveCurrentSession();
        scheduleProjectAutoSave(true);
        closeDialog(projectDialog);
    });
}

function downloadSharedProject(shareFileName, includeAutoGear) {
  if (!shareFileName) return;
  const shareContext = getShareUiContext(this);
  const shareLinkMessage = shareContext.linkMessage;
  const shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  const shareIncludeAutoGearLabelElem = shareContext.includeAutoGearLabel;
  const setupName = getCurrentProjectName();
  const readPowerSelectValue = (select) => (
    select && typeof select.value === 'string'
      ? normalizePowerSelectionString(select.value)
      : ''
  );

  const normalizedBattery = readPowerSelectValue(batterySelect);
  const normalizedPlate = readPowerSelectValue(batteryPlateSelect);
  const normalizedHotswap = readPowerSelectValue(hotswapSelect);

  const currentSetup = {
    setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: normalizeBatteryPlateValue(normalizedPlate, normalizedBattery),
    battery: normalizedBattery,
    batteryHotswap: normalizedHotswap
  };

  const sharedPowerSelection = getPowerSelectionSnapshot();
  if (sharedPowerSelection) {
    currentSetup.powerSelection = sharedPowerSelection;
    currentSetup.battery = sharedPowerSelection.battery || '';
    currentSetup.batteryPlate = sharedPowerSelection.batteryPlate || '';
    currentSetup.batteryHotswap = sharedPowerSelection.batteryHotswap || '';
  }
  if (typeof getDiagramManualPositions === 'function') {
    const diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      currentSetup.diagramPositions = diagramPositions;
    }
  }
  const projectInfoCandidates = [];
  if (currentProjectInfo) {
    projectInfoCandidates.push(currentProjectInfo);
  }
  if (typeof loadProject === 'function') {
    const storageKeys = new Set();
    if (typeof setupName === 'string' && setupName) {
      storageKeys.add(setupName);
    }
    if (typeof getCurrentProjectStorageKey === 'function') {
      const storageKey = getCurrentProjectStorageKey({ allowTyped: true });
      if (typeof storageKey === 'string' && storageKey) {
        storageKeys.add(storageKey);
      }
    }
    if (typeof getSetupNameState === 'function') {
      const nameState = getSetupNameState();
      if (nameState && typeof nameState === 'object') {
        ['storageKey', 'selectedName', 'typedName'].forEach((prop) => {
          const value = typeof nameState[prop] === 'string' ? nameState[prop].trim() : '';
          if (value) {
            storageKeys.add(value);
          }
        });
      }
    }
    storageKeys.forEach((key) => {
      try {
        const storedProject = loadProject(key);
        if (storedProject && storedProject.projectInfo) {
          projectInfoCandidates.push(storedProject.projectInfo);
        }
      } catch (error) {
        console.warn('Unable to read project info for export from storage key', key, error);
      }
    });
  }

  let mergedProjectInfo = null;
  projectInfoCandidates.forEach((candidate) => {
    if (!candidate) return;
    if (!mergedProjectInfo) {
      mergedProjectInfo = cloneProjectInfoForStorage(candidate);
    } else {
      mergedProjectInfo = mergeProjectInfoSnapshots(mergedProjectInfo, candidate);
    }
  });

  if (mergedProjectInfo) {
    const snapshotForExport = typeof createProjectInfoSnapshotForStorage === 'function'
      ? createProjectInfoSnapshotForStorage(mergedProjectInfo, { projectNameOverride: setupName })
      : mergedProjectInfo;
    const clonedSnapshot = cloneProjectInfoForStorage(snapshotForExport);
    if (clonedSnapshot && typeof clonedSnapshot === 'object') {
      currentSetup.projectInfo = clonedSnapshot;
    }
  }
  const gearSelectors = cloneGearListSelectors(getGearListSelectors());
  if (Object.keys(gearSelectors).length) {
    currentSetup.gearSelectors = gearSelectors;
  }
  const combinedHtml = gearListGetCurrentHtmlImpl();
  currentSetup.gearListAndProjectRequirementsGenerated = Boolean(combinedHtml);
  const deviceChanges = getDeviceChanges();
  if (Object.keys(deviceChanges).length) {
    currentSetup.changedDevices = deviceChanges;
  }
  const key = getCurrentSetupKey();
  const feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  const rulesForShare = getAutoGearRules();
  const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (includeAutoGear && hasAutoGearRules) {
    currentSetup.autoGearRules = rulesForShare;
    const coverage = getAutoGearRuleCoverageSummary({ rules: rulesForShare });
    if (coverage) {
      currentSetup.autoGearCoverage = coverage;
    }
  }
  const notifyShareFailure = error => {
    if (error) {
      console.warn('Project export failed', error);
    } else {
      console.warn('Project export failed');
    }
    const failureMessage = getLocalizedText('shareExportFailed') || 'Project export failed.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = failureMessage;
      setStatusLevel(shareLinkMessage, 'danger');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(() => shareLinkMessage.classList.add('hidden'), 6000);
      }
    } else if (typeof alert === 'function') {
      alert(failureMessage);
    }
  };

  let json;
  try {
    json = JSON.stringify(currentSetup, null, 2);
  } catch (serializationError) {
    console.error('Failed to serialize shared project', serializationError);
    notifyShareFailure(serializationError);
    return;
  }

  const downloadResult = downloadBackupPayload(json, shareFileName);

  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
  }

  if (!downloadResult || !downloadResult.success) {
    notifyShareFailure();
    return;
  }

  if (downloadResult.method === 'window-fallback') {
    const manualMessage = typeof getManualDownloadFallbackMessage === 'function'
      ? getManualDownloadFallbackMessage()
      : getLocalizedText('manualDownloadFallback')
        || 'The download did not start automatically. A new tab opened so you can copy or save the file manually.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = manualMessage;
      setStatusLevel(shareLinkMessage, 'warning');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(() => shareLinkMessage.classList.add('hidden'), 8000);
      }
    } else if (typeof alert === 'function') {
      alert(manualMessage);
    }
    return;
  }

  const successMessage =
    (typeof getLocalizedText === 'function' && getLocalizedText('shareLinkCopied'))
    || (texts?.en?.shareLinkCopied)
    || 'Project file downloaded.';

  if (shareLinkMessage) {
    shareLinkMessage.textContent = successMessage;
    setStatusLevel(shareLinkMessage, 'success');
    shareLinkMessage.classList.remove('hidden');
    if (typeof setTimeout === 'function') {
      setTimeout(() => shareLinkMessage.classList.add('hidden'), 4000);
    }
  } else if (typeof alert === 'function') {
    alert(successMessage);
  }
}

function handleShareSetupClick() {
  const shareContext = getShareUiContext(this);
  const shareDialog = shareContext.dialog;
  const shareForm = shareContext.form;
  const shareFilenameInput = shareContext.filenameInput;
  const shareFilenameMessage = shareContext.filenameMessage;
  const shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  const shareIncludeAutoGearLabelElem = shareContext.includeAutoGearLabel;
  saveCurrentGearList();
  const setupName = getCurrentProjectName();
  const defaultName = getDefaultShareFilename(setupName);
  const defaultFilename = ensureJsonExtension(defaultName);

  if (!shareDialog || !shareForm || !shareFilenameInput) {
    const shareFileName = promptForSharedFilename(setupName);
    if (!shareFileName) {
      return;
    }
    const rulesForShare = getAutoGearRules();
    const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
    const includeAutoGear = hasAutoGearRules
      ? confirmAutoGearSelection(
          shareIncludeAutoGearCheckbox ? shareIncludeAutoGearCheckbox.checked : false
        )
      : false;
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
    }
    downloadSharedProject(shareFileName, includeAutoGear);
    return;
  }

  shareFilenameInput.value = defaultFilename;
  shareFilenameInput.setCustomValidity('');

  if (shareFilenameMessage) {
    const template = getLocalizedText('shareFilenamePrompt') || '';
    shareFilenameMessage.textContent = template.includes('{defaultName}')
      ? template.replace('{defaultName}', defaultName)
      : template;
  }

  const rulesForShare = getAutoGearRules();
  const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.disabled = !hasAutoGearRules;
    shareIncludeAutoGearCheckbox.setAttribute('aria-disabled', hasAutoGearRules ? 'false' : 'true');
    if (!hasAutoGearRules) {
      shareIncludeAutoGearCheckbox.checked = false;
    }
  }
  if (shareIncludeAutoGearLabelElem) {
    shareIncludeAutoGearLabelElem.classList.toggle('disabled', !hasAutoGearRules);
    shareIncludeAutoGearLabelElem.setAttribute('aria-disabled', !hasAutoGearRules ? 'true' : 'false');
  }

  openDialog(shareDialog);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      if (shareFilenameInput) {
        shareFilenameInput.focus();
        shareFilenameInput.select();
      }
    });
  } else if (shareFilenameInput) {
    setTimeout(() => {
      shareFilenameInput.focus();
      shareFilenameInput.select();
    }, 0);
  }
}

const shareSetupButton = resolveElementById('shareSetupBtn', 'shareSetupBtn');
if (shareSetupButton) {
  shareSetupButton.addEventListener('click', handleShareSetupClick);
}

function handleShareFormSubmit(event) {
  event.preventDefault();
  const shareContext = getShareUiContext(this);
  const shareFilenameInput = shareContext.filenameInput;
  const shareDialog = shareContext.dialog;
  const shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  if (!shareFilenameInput) return;
  const sanitized = sanitizeShareFilename(shareFilenameInput.value);
  if (!sanitized) {
    const invalidMessage =
      getLocalizedText('shareFilenameInvalid')
      || 'Please enter a valid file name to continue.';
    shareFilenameInput.setCustomValidity(invalidMessage);
    shareFilenameInput.reportValidity();
    return;
  }
  shareFilenameInput.setCustomValidity('');
  const shareFileName = ensureJsonExtension(sanitized);
  const includeAutoGear = !!(
    shareIncludeAutoGearCheckbox
    && !shareIncludeAutoGearCheckbox.disabled
    && shareIncludeAutoGearCheckbox.checked
  );
  closeDialog(shareDialog);
  downloadSharedProject(shareFileName, includeAutoGear);
}

function handleShareCancelClick() {
  const shareContext = getShareUiContext(this);
  const shareFilenameInput = shareContext.filenameInput;
  const shareDialog = shareContext.dialog;
  if (shareFilenameInput) {
    shareFilenameInput.setCustomValidity('');
  }
  closeDialog(shareDialog);
}

function handleShareDialogCancel(event) {
  event.preventDefault();
  const shareContext = getShareUiContext(this);
  const shareFilenameInput = shareContext.filenameInput;
  const shareDialog = shareContext.dialog;
  if (shareFilenameInput) {
    shareFilenameInput.setCustomValidity('');
  }
  closeDialog(shareDialog);
}

const initialShareUiContext = getShareUiContext();
if (initialShareUiContext.form) {
  initialShareUiContext.form.addEventListener('submit', handleShareFormSubmit);
}

if (initialShareUiContext.cancelButton) {
  initialShareUiContext.cancelButton.addEventListener('click', handleShareCancelClick);
}

if (initialShareUiContext.dialog) {
  initialShareUiContext.dialog.addEventListener('cancel', handleShareDialogCancel);
}

function handleSharedLinkInputChange() {
  const shareContext = getShareUiContext(this);
  const sharedLinkInput = shareContext.sharedLinkInput;
  if (!sharedLinkInput || pendingSharedLinkListener) return;
  const file = sharedLinkInput.files && sharedLinkInput.files[0];
  if (file) {
    readSharedProjectFile(file);
  }
}

function handleApplySharedLinkClick() {
  const shareContext = getShareUiContext(this);
  const sharedLinkInput = shareContext.sharedLinkInput;
  if (!sharedLinkInput) {
    return;
  }
  if (pendingSharedLinkListener) {
    sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
    pendingSharedLinkListener = null;
  }
  const handleSelection = () => {
    sharedLinkInput.removeEventListener('change', handleSelection);
    pendingSharedLinkListener = null;
    const file = sharedLinkInput.files && sharedLinkInput.files[0];
    if (file) {
      readSharedProjectFile(file);
    }
  };
  pendingSharedLinkListener = handleSelection;
  sharedLinkInput.addEventListener('change', handleSelection);
  sharedLinkInput.value = '';
  sharedLinkInput.click();
  if (sharedLinkInput.files && sharedLinkInput.files.length) {
    handleSelection();
  }
}

if (initialShareUiContext.sharedLinkInput) {
  initialShareUiContext.sharedLinkInput.addEventListener('change', handleSharedLinkInputChange);
}

if (initialShareUiContext.applySharedLinkButton && initialShareUiContext.sharedLinkInput) {
  initialShareUiContext.applySharedLinkButton.addEventListener('click', handleApplySharedLinkClick);
}

function handleSharedImportModeChange() {
  if (sharedImportPromptActive) return;
  if (lastSharedSetupData === null) return;
  reapplySharedImportSelection();
}

function handleSharedImportSubmit(event) {
  event.preventDefault();
  finalizeSharedImportPrompt();
  applyStoredSharedImport();
}

function handleSharedImportCancel() {
  finalizeSharedImportPrompt();
  clearStoredSharedImportData();
}

function handleSharedImportDialogCancel(event) {
  event.preventDefault();
  finalizeSharedImportPrompt();
  clearStoredSharedImportData();
}

const initialSharedImportUiContext = getSharedImportUiContext();
if (initialSharedImportUiContext.modeSelect) {
  initialSharedImportUiContext.modeSelect.addEventListener('change', handleSharedImportModeChange);
}

if (initialSharedImportUiContext.form) {
  initialSharedImportUiContext.form.addEventListener('submit', handleSharedImportSubmit);
}

if (initialSharedImportUiContext.cancelButton) {
  initialSharedImportUiContext.cancelButton.addEventListener('click', handleSharedImportCancel);
}

if (initialSharedImportUiContext.dialog) {
  initialSharedImportUiContext.dialog.addEventListener('cancel', handleSharedImportDialogCancel);
}

enqueueCineUiRegistration(registerSetupsCineUiInternal);

function getSafeLanguageTexts() {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  const allTexts =
    (typeof texts !== 'undefined' && texts)
    || (scope && typeof scope.texts === 'object' ? scope.texts : null);

  const resolvedLang =
    typeof currentLang === 'string'
    && allTexts
    && typeof allTexts[currentLang] === 'object'
      ? currentLang
      : 'en';

  const langTexts =
    (allTexts && typeof allTexts[resolvedLang] === 'object' && allTexts[resolvedLang])
    || {};

  const fallbackTexts =
    (allTexts && typeof allTexts.en === 'object' && allTexts.en)
    || {};

  return { langTexts, fallbackTexts };
}

function registerSetupsCineUiInternal(cineUi) {
  if (!cineUi || setupsCineUiRegistered) {
    return;
  }

  const shareContext = getShareUiContext();
  const sharedImportContext = getSharedImportUiContext();

  registerCineUiEntries(
    cineUi.controllers,
    [
      {
        name: 'shareDialog',
        value: {
          context: shareContext,
          open: handleShareSetupClick,
          submit: handleShareFormSubmit,
          cancel: handleShareCancelClick,
          dismiss: handleShareDialogCancel,
        },
      },
      {
        name: 'sharedImportDialog',
        value: {
          context: sharedImportContext,
          submit: handleSharedImportSubmit,
          cancel: handleSharedImportCancel,
          dismiss: handleSharedImportDialogCancel,
          changeMode: handleSharedImportModeChange,
        },
      },
    ],
    'cineUi controller registration (setups) failed'
  );

  registerCineUiEntries(
    cineUi.interactions,
    [
      { name: 'shareOpen', value: handleShareSetupClick },
      { name: 'shareSubmit', value: handleShareFormSubmit },
      { name: 'shareCancel', value: handleShareCancelClick },
      { name: 'shareApplyFile', value: handleApplySharedLinkClick },
      { name: 'shareInputChange', value: handleSharedLinkInputChange },
      { name: 'sharedImportSubmit', value: handleSharedImportSubmit },
      { name: 'sharedImportCancel', value: handleSharedImportCancel },
    ],
    'cineUi interaction registration (setups) failed'
  );

  registerCineUiEntries(
    cineUi.help,
    [
      {
        name: 'shareProject',
        value: () => {
          const { langTexts, fallbackTexts } = getSafeLanguageTexts();
          return (
            langTexts.shareSetupHelp
            || fallbackTexts.shareSetupHelp
            || 'Download a JSON backup of the current project so you can share or restore it later. Store the file with your crew backups before closing the planner.'
          );
        },
      },
      {
        name: 'sharedImport',
        value: () => {
          const { langTexts, fallbackTexts } = getSafeLanguageTexts();
          return (
            langTexts.applySharedLinkHelp
            || fallbackTexts.applySharedLinkHelp
            || 'Load the configuration from a JSON backup exported via Save & Share. Review the preview before applying so nothing overwrites the wrong project.'
          );
        },
      },
    ],
    'cineUi help registration (setups) failed'
  );

  setupsCineUiRegistered = areSetupsEntriesRegistered(cineUi);
}

function registerSetupsCineUi() {
  const cineUi =
    (typeof globalThis !== 'undefined' && globalThis.cineUi)
    || (typeof window !== 'undefined' && window.cineUi)
    || (typeof self !== 'undefined' && self.cineUi)
    || null;

  if (!cineUi) {
    return false;
  }

  registerSetupsCineUiInternal(cineUi);
  return true;
}

registerSetupsCineUi();

// Open feedback dialog and handle submission
const cineResultsModule = typeof cineResults === 'object' ? cineResults : null;
if (cineResultsModule && typeof cineResultsModule.setupRuntimeFeedback === 'function') {
  cineResultsModule.setupRuntimeFeedback({
    openDialog: typeof openDialog === 'function' ? openDialog : null,
    closeDialog: typeof closeDialog === 'function' ? closeDialog : null,
    getCurrentSetupKey: typeof getCurrentSetupKey === 'function' ? getCurrentSetupKey : null,
    loadFeedback:
      typeof loadFeedbackSafe === 'function'
        ? loadFeedbackSafe
        : typeof loadFeedback === 'function'
          ? loadFeedback
          : null,
    saveFeedback:
      typeof saveFeedbackSafe === 'function'
        ? saveFeedbackSafe
        : typeof saveFeedback === 'function'
          ? saveFeedback
          : null,
    updateCalculations: typeof updateCalculations === 'function' ? updateCalculations : null,
    setButtonLabelWithIcon:
      typeof setButtonLabelWithIcon === 'function' ? setButtonLabelWithIcon : null,
    iconGlyphs: typeof ICON_GLYPHS !== 'undefined' ? ICON_GLYPHS : null,
  });
}



function summarizeByType(list) {
    if (!Array.isArray(list)) return {};
    return list.reduce((counts, it) => {
        if (it?.type) {
            counts[it.type] = (counts[it.type] || 0) + 1;
        }
        return counts;
    }, {});
}

function renderInfoLabel(text) {
  const str = text != null ? String(text).trim() : '';
  if (!str) return '';
  return `<span class="info-box-label">${escapeHtml(str)}:</span> `;
}

function connectorBlocks(items, icon, cls = 'neutral-conn', label = '', dir = '') {
  if (!Array.isArray(items) || items.length === 0) return '';
  const counts = summarizeByType(items);
  const entries = Object.entries(counts).map(([type, count]) => {
    return `${escapeHtml(type)}${count > 1 ? ` ×${count}` : ''}`;
  });
  if (!entries.length) return '';
  const labelText = label ? `${label}${dir ? ` ${dir}` : ''}` : '';
  const labelHtml = renderInfoLabel(labelText);
  const iconHtml = iconMarkup(icon, 'connector-icon');
  return `<span class="connector-block ${cls}">${iconHtml}${labelHtml}${entries.join(', ')}</span>`;
}

function generateConnectorSummary(device) {
  if (!device || typeof device !== 'object') return '';

  let portHtml = '';
  const connectors = [
    { items: device.power?.powerDistributionOutputs, icon: diagramConnectorIcons.powerOut, cls: 'power-conn', label: 'Power', dir: 'Out' },
    { items: powerInputTypes(device).map(t => ({ type: t })), icon: diagramConnectorIcons.powerIn, cls: 'power-conn', label: 'Power', dir: 'In' },
    { items: device.fizConnectors, icon: diagramConnectorIcons.fiz, cls: 'fiz-conn', label: 'FIZ Port' },
    { items: device.video?.inputs || device.videoInputs, icon: diagramConnectorIcons.video, cls: 'video-conn', label: 'Video', dir: 'In' },
    { items: device.video?.outputs || device.videoOutputs, icon: diagramConnectorIcons.video, cls: 'video-conn', label: 'Video', dir: 'Out' },
    { items: device.timecode, icon: diagramConnectorIcons.timecode, cls: 'neutral-conn', label: 'Timecode' },
    { items: device.audioInput?.portType ? [{ type: device.audioInput.portType }] : undefined, icon: diagramConnectorIcons.audioIn, cls: 'neutral-conn', label: 'Audio', dir: 'In' },
    { items: device.audioOutput?.portType ? [{ type: device.audioOutput.portType }] : undefined, icon: diagramConnectorIcons.audioOut, cls: 'neutral-conn', label: 'Audio', dir: 'Out' },
    { items: device.audioIo?.portType ? [{ type: device.audioIo.portType }] : undefined, icon: diagramConnectorIcons.audioIo, cls: 'neutral-conn', label: 'Audio', dir: 'I/O' },
  ];

  for (const { items, icon, cls, label, dir } of connectors) {
    portHtml += connectorBlocks(items, icon, cls, label, dir);
  }

  let specHtml = '';
  if (typeof device.powerDrawWatts === 'number') {
    specHtml += `<span class="info-box power-conn">${iconMarkup(diagramConnectorIcons.powerSpec)}${renderInfoLabel('Power')}${device.powerDrawWatts} W</span>`;
  }
  if (device.power?.input?.voltageRange) {
    specHtml += `<span class="info-box power-conn">${iconMarkup(ICON_GLYPHS.batteryBolt)}${renderInfoLabel('Voltage')}${escapeHtml(String(device.power.input.voltageRange))}V</span>`;
  }
  if (typeof device.weight_g === 'number') {
    const weightLabel = `${device.weight_g} g`;
    specHtml += `<span class="info-box neutral-conn">${iconMarkup(ICON_GLYPHS.gears)}${renderInfoLabel('Weight')}${escapeHtml(weightLabel)}</span>`;
  }
  if (typeof device.capacity === 'number') {
        specHtml += `<span class="info-box power-conn">${iconMarkup(ICON_GLYPHS.batteryFull)}${renderInfoLabel('Capacity')}${device.capacity} Wh</span>`;
    }
    if (typeof device.pinA === 'number') {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('Pins')}${device.pinA}A</span>`;
    }
    if (typeof device.dtapA === 'number') {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('D-Tap')}${device.dtapA}A</span>`;
    }
    if (device.mount_type) {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('Mount')}${escapeHtml(String(device.mount_type))}</span>`;
    }
  if (typeof device.screenSizeInches === 'number') {
    specHtml += `<span class="info-box video-conn">${iconMarkup(DIAGRAM_MONITOR_ICON)}${renderInfoLabel('Screen')}${device.screenSizeInches}"</span>`;
  }
    if (typeof device.brightnessNits === 'number') {
        specHtml += `<span class="info-box video-conn">${iconMarkup(ICON_GLYPHS.brightness)}${renderInfoLabel('Brightness')}${device.brightnessNits} nits</span>`;
    }
  if (typeof device.wirelessTx === 'boolean') {
    specHtml += `<span class="info-box video-conn">${iconMarkup(ICON_GLYPHS.wifi)}${renderInfoLabel('Wireless')}${device.wirelessTx}</span>`;
  }
  if (device.internalController) {
    specHtml += `<span class="info-box fiz-conn">${iconMarkup(diagramConnectorIcons.controller)}${renderInfoLabel('Controller')}Internal</span>`;
  }
  if (typeof device.torqueNm === 'number') {
    specHtml += `<span class="info-box fiz-conn">${iconMarkup(diagramConnectorIcons.torque)}${renderInfoLabel('Torque')}${device.torqueNm} Nm</span>`;
  }
  if (device.powerSource) {
    specHtml += `<span class="info-box power-conn">${iconMarkup(diagramConnectorIcons.powerSource)}${renderInfoLabel('Power Source')}${escapeHtml(String(device.powerSource))}</span>`;
  }

  const uniqueList = list => {
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    const values = [];
    list.forEach(entry => {
      const str = entry != null ? String(entry).trim() : '';
      if (!str || seen.has(str)) return;
      seen.add(str);
      values.push(escapeHtml(str));
    });
    return values;
  };

  const appendListBox = (html, values, label, cls, icon) => {
    const formatted = uniqueList(values);
    if (!formatted.length) return html;
    const iconHtml = iconMarkup(icon);
    const labelHtml = renderInfoLabel(label);
    const valuesHtml = `<span class="info-box-values">${formatted.join(', ')}</span>`;
    return `${html}<span class="info-box ${cls} info-box-list">${iconHtml}${labelHtml}${valuesHtml}</span>`;
  };

  let recordingHtml = '';
  if (Array.isArray(device.sensorModes)) {
    recordingHtml = appendListBox(recordingHtml, device.sensorModes, 'Sensor Modes', 'video-conn', ICON_GLYPHS.sensor);
  }
  if (Array.isArray(device.resolutions)) {
    recordingHtml = appendListBox(recordingHtml, device.resolutions, 'Resolutions', 'video-conn', ICON_GLYPHS.screen);
  }
  if (Array.isArray(device.recordingCodecs)) {
    recordingHtml = appendListBox(recordingHtml, device.recordingCodecs, 'Codecs', 'video-conn', ICON_GLYPHS.camera);
  }
  if (Array.isArray(device.recordingMedia)) {
    const mediaTypes = device.recordingMedia
      .map(item => (item && item.type ? item.type : ''));
    recordingHtml = appendListBox(recordingHtml, mediaTypes, 'Media', 'video-conn', ICON_GLYPHS.save);
  }

    let extraHtml = '';
    if (Array.isArray(device.power?.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
        const types = device.power.batteryPlateSupport.map(p => {
            const mount = p.mount ? ` (${escapeHtml(p.mount)})` : '';
            return `${escapeHtml(p.type)}${mount}`;
        });
        extraHtml += `<span class="info-box power-conn">${renderInfoLabel('Battery Plate')}${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
        const types = device.viewfinder.map(v => escapeHtml(v.type));
        extraHtml += `<span class="info-box video-conn">${renderInfoLabel('Viewfinder')}${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
        const types = device.gearTypes.map(g => escapeHtml(g));
        extraHtml += `<span class="info-box fiz-conn">${renderInfoLabel('Gear')}${types.join(', ')}</span>`;
    }
    if (device.connectivity) {
        extraHtml += `<span class="info-box video-conn">${renderInfoLabel('Connectivity')}${escapeHtml(String(device.connectivity))}</span>`;
    }
    if (device.notes) {
        extraHtml += `<span class="info-box neutral-conn">${renderInfoLabel('Notes')}${escapeHtml(String(device.notes))}</span>`;
    }

    let lensHtml = '';
    if (Array.isArray(device.lensMount)) {
        const boxes = device.lensMount.map(lm => {
            const mount = lm.mount ? ` (${escapeHtml(lm.mount)})` : '';
            return `<span class="info-box neutral-conn">${escapeHtml(lm.type)}${mount}</span>`;
        }).join('');
        if (boxes) lensHtml = `<div class="lens-mount-box">${boxes}</div>`;
    }

    let html = '';
    const section = (label, content) => {
        if (!content) return '';
        return `<div class="info-label">${label}</div>${content}`;
    };

    html += section('Ports', portHtml);
    html += section('Specs', specHtml);
    html += section('Recording', recordingHtml);
    html += section('Extras', extraHtml);
    if (lensHtml) html += `<div class="info-label">Lens Mount</div>${lensHtml}`;

    return html ? `<div class="connector-summary">${html}</div>` : '';
}


function suggestChargerCounts(total) {
    let quad = Math.floor(total / 4);
    const remainder = total % 4;
    let dual = 0;
    let single = 0;
    if (remainder === 0) {
        // nothing
    } else if (remainder === 3) {
        quad += 1;
    } else if (remainder > 0) {
        dual += 1;
    }
    return { quad, dual, single };
}

function addArriKNumber(name) {
    if (!name) return name;
    const d = typeof devices !== 'undefined' ? devices : {};
    const collections = [
        d.viewfinders,
        d.directorMonitors,
        d.iosVideo,
        d.videoAssist,
        d.media,
        d.lenses
    ];
    for (const col of collections) {
        if (col && col[name]) {
            const item = col[name];
            if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                return name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `);
            }
            return name;
        }
    }
    if (d.accessories) {
        const findItem = obj => {
            if (!obj) return null;
            if (obj[name]) return obj[name];
            for (const val of Object.values(obj)) {
                if (val && typeof val === 'object') {
                    const found = findItem(val);
                    if (found) return found;
                }
            }
            return null;
        };
        for (const col of Object.values(d.accessories)) {
            const item = findItem(col);
            if (item) {
                if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                    return /^ARRI\s*/i.test(name) ? name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `) : `ARRI ${item.kNumber} ${name}`;
                }
                return name;
            }
        }
    }
    return name;
}

const sanitizeFizContext = context => (context || '')
    .replace(/[()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

const formatFizCable = (name, context) => {
    const cleaned = sanitizeFizContext(context);
    return cleaned ? `${name} (${cleaned})` : name;
};

function suggestArriFizCables() {
    const CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
    const CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
    const CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
    const cables = [];
    const lbusLengths = [];
    const camSpare = [];
    const camera = cameraSelect?.value || '';
    const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const distance = distanceSelect?.value || '';
    const motor = motors[0] || '';
    const hasMasterGrip = controllers.includes('Arri Master Grip (single unit)');
    const hasRIA = controllers.includes('Arri RIA-1');
    let hasUDM = distance.includes('UDM');
    let hasLCube = distance.includes('LCube');
    if (hasLCube && (hasRIA || camera === 'Arri Alexa 35')) hasLCube = false;
    const isCforceMiniRF = /cforce mini rf/i.test(motor);
    const isCforceMini = /cforce mini/i.test(motor) && !isCforceMiniRF;
    const motorContext = motor ? `for ${motor}` : 'for FIZ motor';
    const masterGripContext = 'for Arri Master Grip (single unit)';
    const distanceContext = distance ? `for ${distance}` : 'for distance sensor';
    const controllersToCheck = [];
    if (hasRIA) controllersToCheck.push('Arri RIA-1');
    if (isCforceMiniRF) controllersToCheck.push('Arri cforce mini RF');
    const primaryController = controllersToCheck[0] || controllers[0] || '';
    const pushLbus = (len, contextOverride) => {
        const formatted = String(len).replace('.', ',');
        const ctx = contextOverride || motorContext;
        cables.push(formatFizCable(`LBUS to LBUS ${formatted}m`, ctx));
        lbusLengths.push(Number(len));
    };
    if ((camera === 'Arri Alexa Mini' || camera === 'Arri Alexa Mini LF') && isCforceMini) {
        pushLbus(0.3);
        if (hasLCube) pushLbus(0.4, distanceContext);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (camera === 'Arri Alexa 35' && isCforceMini) {
        pushLbus(0.3);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (isCforceMiniRF) {
        if (hasLCube) {
            pushLbus(0.4, distanceContext);
            if (hasMasterGrip) pushLbus(0.5, masterGripContext);
        } else if (hasMasterGrip) {
            pushLbus(0.5, masterGripContext);
        }
    } else if (hasRIA && isCforceMini) {
        pushLbus(0.4);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    }
    if (controllersToCheck.length) {
        const cablesData = devices.accessories?.cables || {};
        let chosen = null;
        for (const [name, data] of Object.entries(cablesData)) {
            const connectors = [];
            if (Array.isArray(data.connectors)) connectors.push(...data.connectors);
            if (data.from) connectors.push(data.from);
            if (data.to) connectors.push(data.to);
            if (!connectors.some(c => /CAM \(7-pin/i.test(c))) continue;
            const ctrlOk = (data.compatibleControllers || []).some(cc =>
                controllersToCheck.some(ct => cc.toLowerCase().includes(ct.toLowerCase())));
            if (!ctrlOk) continue;
            const camOk = !data.compatibleCameras ||
                data.compatibleCameras.some(c => c.toLowerCase() === camera.toLowerCase());
            if (!camOk) continue;
            if (!chosen || (data.lengthM ?? Infinity) < (cablesData[chosen].lengthM ?? Infinity)) {
                chosen = name;
            }
        }
        if (chosen) {
            const camContext = camera ? `for ${camera}` : 'for camera control';
            cables.push(formatFizCable(chosen, camContext));
            camSpare.push(chosen);
        } else if (hasRIA && cablesData['Cable CAM (7-pin) – D-Tap 0,5m']) {
            const fallback = 'Cable CAM (7-pin) – D-Tap 0,5m';
            const fallbackContext = primaryController ? `for ${primaryController} power` : 'for controller power';
            cables.push(formatFizCable(fallback, fallbackContext));
            camSpare.push(fallback);
        }
    }
    if (hasUDM) {
        if (hasLCube) {
            cables.push(formatFizCable(CABLE_UDM_SERIAL_7P, distanceContext));
        } else {
            cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, distanceContext));
            cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, 'spare'));
        }
    }
    if (lbusLengths.length) {
        const shortest = Math.min(...lbusLengths);
        const formattedShortest = String(shortest).replace('.', ',');
        cables.push(formatFizCable(`LBUS to LBUS ${formattedShortest}m`, 'spare'));
        cables.push(formatFizCable(CABLE_LBUS_05, 'spare'));
    }
    camSpare.forEach(n => cables.push(formatFizCable(n, 'spare')));
    return cables;
}

function collectAccessories({ hasMotor = false, videoDistPrefs = [] } = {}) {
    const cameraSupport = [];
    const misc = [];
    const monitoringSupport = [];
    const rigging = [];
    const chargers = [];
    const fizCables = [];
    const acc = devices.accessories || {};
    const excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);

    if (batterySelect.value) {
        const mount = devices.batteries[batterySelect.value]?.mount_type;
        if (acc.powerPlates) {
            for (const [name, plate] of Object.entries(acc.powerPlates)) {
                if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
                    cameraSupport.push(name);
                }
            }
        }
        if (acc.chargers) {
            let camCount = parseInt(batteryCountElem?.textContent || '', 10);
            if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
            let monCount = 0;
            if (Array.isArray(videoDistPrefs)) {
                const handheldCount = videoDistPrefs.filter(v => /Monitor(?: \d+")? handheld$/.test(v)).length;
                monCount += handheldCount * 3;
                const largeCount = videoDistPrefs.filter(v => {
                    const m = v.match(/Monitor (\d+(?:\.\d+)?)/);
                    return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
                }).length;
                monCount += largeCount * 2;
            }
            if (hasMotor) monCount += 3;

            const pushChargersForMount = (targetMount, total) => {
                if (!targetMount || total <= 0) return;
                const counts = suggestChargerCounts(total);
                const findName = slots => {
                    for (const [name, charger] of Object.entries(acc.chargers)) {
                        if (charger.mount === targetMount && charger.slots === slots) return name;
                    }
                    return null;
                };
                const pushCharger = (slots, count) => {
                    const n = findName(slots);
                    if (!n) return;
                    for (let i = 0; i < count; i++) chargers.push(n);
                };
                pushCharger(4, counts.quad);
                pushCharger(2, counts.dual);
                pushCharger(1, counts.single);
            };

            if (mount === 'B-Mount') {
                pushChargersForMount('B-Mount', camCount);
                pushChargersForMount('V-Mount', monCount);
            } else {
                pushChargersForMount(mount, camCount + monCount);
            }
        }
    }

    if (cameraSelect.value && acc.cages) {
        if (!cageSelect.value || cageSelect.value === 'None') {
            for (const [name, cage] of Object.entries(acc.cages)) {
                if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(name);
            }
        }
    }

    const powerCableDb = acc.cables?.power || {};
    const gatherPower = (data, target = misc, includeExcluded = false) => {
        const input = data?.power?.input?.type;
        const types = Array.isArray(input) ? input : input ? [input] : [];
        types.forEach(t => {
            for (const [name, cable] of Object.entries(powerCableDb)) {
                const isExcluded = excludedCables.has(name);
                if (cable.to === t && (!isExcluded || includeExcluded)) target.push(name);
            }
        });
    };
    gatherPower(devices.cameras[cameraSelect.value]);
    gatherPower(devices.video[videoSelect.value]);
    const onboardMonitor = devices.monitors[monitorSelect.value];
    if (onboardMonitor) {
        const monitorLabel = 'Onboard monitor';
        const powerType = onboardMonitor?.power?.input?.type;
        const hasLemo2 = Array.isArray(powerType)
            ? powerType.includes('LEMO 2-pin')
            : powerType === 'LEMO 2-pin';
        if (hasLemo2) {
            monitoringSupport.push(
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`,
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`
            );
        }
        const cameraData = devices.cameras[cameraSelect.value];
        const camVideo = (cameraData?.videoOutputs || []).map(v => v.type?.toUpperCase());
        const monVideo = (onboardMonitor.videoInputs || []).map(v => v.type?.toUpperCase());
        const hasSDI = camVideo.some(t => t && t.includes('SDI')) && monVideo.some(t => t && t.includes('SDI'));
        const hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
        if (hasSDI) {
            monitoringSupport.push(
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`,
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`
            );
        } else if (hasHDMI) {
            monitoringSupport.push(
                `Ultraslim HDMI 0.5 m (${monitorLabel})`,
                `Ultraslim HDMI 0.5 m (${monitorLabel})`
            );
        }
        rigging.push(`ULCS Arm mit 3/8" und 1/4" double (${monitorLabel})`);
    }
    if (videoSelect.value) {
        const rxName = videoSelect.value.replace(/ TX\b/, ' RX');
        if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            gatherPower(devices.wirelessReceivers[rxName]);
        }
    }
    motorSelects.forEach(sel => gatherPower(devices.fiz.motors[sel.value]));
    controllerSelects.forEach(sel => gatherPower(devices.fiz.controllers[sel.value]));
    gatherPower(devices.fiz.distance[distanceSelect.value]);

    const fizCableDb = acc.cables?.fiz || {};
    const getFizConnectors = data => {
        const list = [];
        if (!data) return list;
        if (Array.isArray(data.fizConnectors)) {
            data.fizConnectors.forEach(fc => {
                const type = fc && typeof fc === 'object' ? fc.type : fc;
                if (type) list.push(type);
            });
        }
        if (data.fizConnector) list.push(data.fizConnector);
        return [...new Set(list.filter(Boolean))];
    };
    const pushFizCable = (name, context) => {
        fizCables.push(formatFizCable(name, context));
    };
    const pairContextCounts = {};
    const buildPairContext = (motorName, controllerName) => {
        const parts = [sanitizeFizContext(motorName), sanitizeFizContext(controllerName)].filter(Boolean);
        if (!parts.length) return '';
        const base = parts.join(' ↔ ');
        const key = base.toLowerCase();
        const next = (pairContextCounts[key] || 0) + 1;
        pairContextCounts[key] = next;
        return next > 1 ? `${base} #${next}` : base;
    };
    const matchesCable = (cable, from, to) => {
        if (!cable) return false;
        const fromToMatch = (a, b) => (cable.from === a && cable.to === b) || (cable.from === b && cable.to === a);
        if (cable.from && cable.to) {
            if (fromToMatch(from, to)) return true;
        }
        if (Array.isArray(cable.connectors)) {
            const connectors = cable.connectors;
            if (connectors.includes(from) && connectors.includes(to)) return true;
        }
        return false;
    };
    const motorEntries = motorSelects
        .map(sel => sel.value)
        .filter(v => v && v !== 'None')
        .map(name => ({ name, data: devices.fiz.motors[name] }))
        .filter(entry => entry.data);
    const controllerEntries = controllerSelects
        .map(sel => sel.value)
        .filter(v => v && v !== 'None')
        .map(name => ({ name, data: devices.fiz.controllers[name] }))
        .filter(entry => entry.data);
    motorEntries.forEach(motorEntry => {
        const motorConns = getFizConnectors(motorEntry.data);
        controllerEntries.forEach(controllerEntry => {
            const controllerConns = getFizConnectors(controllerEntry.data);
            motorConns.forEach(mConn => {
                controllerConns.forEach(cConn => {
                    if (mConn !== cConn) return;
                    for (const [name, cable] of Object.entries(fizCableDb)) {
                        if (matchesCable(cable, mConn, cConn)) {
                            const context = buildPairContext(motorEntry.name, controllerEntry.name);
                            pushFizCable(name, context);
                        }
                    }
                });
            });
        });
    });

    suggestArriFizCables().forEach(name => fizCables.push(name));

    const miscUnique = [...new Set(misc)];
    const monitoringSupportList = monitoringSupport.slice();
    const riggingUnique = [...new Set(rigging)];
    for (let i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
    return {
        cameraSupport: [...new Set(cameraSupport)],
        chargers,
        fizCables,
        misc: miscUnique,
        monitoringSupport: monitoringSupportList,
        rigging: riggingUnique
    };
}

function collectProjectFormData() {
    if (!projectForm) return {};

    const formData = new FormData(projectForm);
    const getValue = (name) => {
        const raw = formData.get(name);
        return typeof raw === 'string' ? raw.trim() : '';
    };
    const getMultiValue = (name) => {
        const values = formData.getAll(name);
        if (!values || values.length === 0) return '';
        return values.map(value => (typeof value === 'string' ? value : String(value))).join(', ');
    };

    const viewfinderSettings = getMultiValue('viewfinderSettings');
    const frameGuides = getMultiValue('frameGuides');
    const aspectMaskOpacity = getMultiValue('aspectMaskOpacity');
    const filterStr = collectFilterSelections();
    const filterTypes = filterStr ? filterStr.split(',').map(s => s.split(':')[0]) : [];
    const matteboxVal = filterTypes.some(t => t === 'ND Grad HE' || t === 'ND Grad SE')
        ? 'Swing Away'
        : getValue('mattebox');

    const people = Array.from(crewContainer?.querySelectorAll('.person-row') || [])
        .map(row => {
            const roleValue = row.querySelector('select')?.value;
            const nameInput = row.querySelector('.person-name');
            const phoneInput = row.querySelector('.person-phone');
            const emailInput = row.querySelector('.person-email');
            const role = typeof roleValue === 'string'
                ? roleValue.trim()
                : (roleValue == null ? '' : String(roleValue));
            const name = typeof nameInput?.value === 'string' ? nameInput.value.trim() : '';
            const phone = typeof phoneInput?.value === 'string' ? phoneInput.value.trim() : '';
            const email = typeof emailInput?.value === 'string' ? emailInput.value.trim() : '';
            return { role, name, phone, email };
        })
        .filter(person => person.role || person.name || person.phone || person.email);

    const collectRanges = (container, startSel, endSel) => Array.from(container?.querySelectorAll('.period-row') || [])
        .map(row => {
            const start = row.querySelector(startSel)?.value;
            const end = row.querySelector(endSel)?.value;
            return [start, end].filter(Boolean).join(' to ');
        })
        .filter(Boolean);

    const prepDays = collectRanges(prepContainer, '.prep-start', '.prep-end');
    const shootingDays = collectRanges(shootContainer, '.shoot-start', '.shoot-end');

    const gearValues = gearListOutput ? (() => {
        const ids = [
            'gearListDirectorMonitor',
            'gearListDopMonitor',
            'gearListGafferMonitor',
            'gearListDirectorMonitor15',
            'gearListComboMonitor15',
            'gearListDopMonitor15',
            'gearListFocusMonitor',
            'gearListProGaffColor1',
            'gearListProGaffWidth1',
            'gearListProGaffColor2',
            'gearListProGaffWidth2',
            'gearListEyeLeatherColor'
        ];
        const map = new Map();
        ids.forEach(id => {
            const el = gearListOutput.querySelector(`#${id}`);
            if (!el) return;
            const value = el.value;
            map.set(id, typeof value === 'string' ? value : (value == null ? '' : String(value)));
        });
        return map;
    })() : null;

    const getGearValue = (id) => (gearValues && gearValues.has(id) ? gearValues.get(id) : '');

    const proGaffColor1 = getGearValue('gearListProGaffColor1');
    const proGaffWidth1 = getGearValue('gearListProGaffWidth1');
    const proGaffColor2 = getGearValue('gearListProGaffColor2');
    const proGaffWidth2 = getGearValue('gearListProGaffWidth2');

    const info = {
        productionCompany: getValue('productionCompany'),
        rentalHouse: getValue('rentalHouse'),
        ...(people.length ? { people } : {}),
        prepDays,
        shootingDays,
        deliveryResolution: getValue('deliveryResolution'),
        recordingResolution: getValue('recordingResolution'),
        aspectRatio: getMultiValue('aspectRatio'),
        codec: getValue('codec'),
        baseFrameRate: getValue('baseFrameRate'),
        sensorMode: getValue('sensorMode'),
        lenses: getMultiValue('lenses'),
        requiredScenarios: getMultiValue('requiredScenarios'),
        cameraHandle: getMultiValue('cameraHandle'),
        viewfinderExtension: getValue('viewfinderExtension'),
        viewfinderEyeLeatherColor: getGearValue('gearListEyeLeatherColor') || getValue('viewfinderEyeLeatherColor'),
        mattebox: matteboxVal,
        gimbal: getMultiValue('gimbal'),
        viewfinderSettings,
        frameGuides,
        aspectMaskOpacity,
        videoDistribution: getMultiValue('videoDistribution'),
        monitoringConfiguration: getValue('monitoringConfiguration'),
        monitorUserButtons: getMultiValue('monitorUserButtons'),
        cameraUserButtons: getMultiValue('cameraUserButtons'),
        viewfinderUserButtons: getMultiValue('viewfinderUserButtons'),
        tripodHeadBrand: getValue('tripodHeadBrand'),
        tripodBowl: getValue('tripodBowl'),
        tripodTypes: getMultiValue('tripodTypes'),
        tripodSpreader: getValue('tripodSpreader'),
        sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
        easyrig: getSetupsCoreValue('getEasyrigValue'),
        filter: filterStr
    };

    const assignGearField = (prop, id) => {
        const value = getGearValue(id);
        if (value) {
            info[prop] = value;
        }
    };

    const assignManualFlag = (prop, id) => {
        if (!gearListOutput) return;
        const el = gearListOutput.querySelector(`#${id}`);
        if (el && el.dataset && el.dataset.autoGearManual === 'true') {
            info[`${prop}Manual`] = true;
        }
    };

    assignGearField('directorMonitor', 'gearListDirectorMonitor');
    assignGearField('dopMonitor', 'gearListDopMonitor');
    assignGearField('gafferMonitor', 'gearListGafferMonitor');
    assignGearField('directorMonitor15', 'gearListDirectorMonitor15');
    assignGearField('comboMonitor15', 'gearListComboMonitor15');
    assignGearField('dopMonitor15', 'gearListDopMonitor15');

    info.focusMonitor = getGearValue('gearListFocusMonitor') || '';

    assignManualFlag('directorMonitor', 'gearListDirectorMonitor');
    assignManualFlag('dopMonitor', 'gearListDopMonitor');
    assignManualFlag('gafferMonitor', 'gearListGafferMonitor');
    assignManualFlag('directorMonitor15', 'gearListDirectorMonitor15');
    assignManualFlag('comboMonitor15', 'gearListComboMonitor15');
    assignManualFlag('dopMonitor15', 'gearListDopMonitor15');
    assignManualFlag('focusMonitor', 'gearListFocusMonitor');

    if (proGaffColor1 || proGaffWidth1) {
        info.proGaffColor1 = proGaffColor1 || '';
        info.proGaffWidth1 = proGaffWidth1 || '';
    }

    if (proGaffColor2 || proGaffWidth2) {
        info.proGaffColor2 = proGaffColor2 || '';
        info.proGaffWidth2 = proGaffWidth2 || '';
    }

    const storageEntries = Array.from(storageNeedsContainer?.querySelectorAll('.storage-row') || [])
        .map(row => {
            const quantityInput = row.querySelector('.storage-quantity');
            const typeSelect = row.querySelector('.storage-type');
            const variantSelect = row.querySelector('.storage-variant');
            const notesInput = row.querySelector('.storage-notes');
            const rawQuantity = quantityInput ? parseInt(quantityInput.value, 10) : NaN;
            const quantity = Number.isFinite(rawQuantity) && rawQuantity > 0 ? rawQuantity : null;
            const type = typeof typeSelect?.value === 'string' ? typeSelect.value.trim() : '';
            const variant = typeof variantSelect?.value === 'string' ? variantSelect.value.trim() : '';
            const notes = typeof notesInput?.value === 'string' ? notesInput.value.trim() : '';
            if (!quantity && !type && !variant && !notes) {
                return null;
            }
            const entry = {};
            if (quantity) entry.quantity = quantity;
            if (type) entry.type = type;
            if (variant) entry.variant = variant;
            if (notes) entry.notes = notes;
            return entry;
        })
        .filter(Boolean);
    if (storageEntries.length) {
        info.storageRequirements = storageEntries;
    }

    const currentProjectName = getCurrentProjectName();
    if (currentProjectName) {
        info.projectName = currentProjectName;
    }

    return info;
}

function populateProjectForm(info = {}) {
    if (!projectForm) return;
    projectForm.reset();
    const setVal = (name, value) => {
        if (value === undefined) return;
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (field) field.value = value;
    };
    const setMulti = (name, values) => {
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (!field || values === undefined) return;
        const arr = Array.isArray(values) ? values : (values ? values.split(',').map(v => v.trim()) : []);
        Array.from(field.options).forEach(opt => {
            opt.selected = arr.includes(opt.value);
        });
    };

    populateRecordingResolutionDropdown(info.recordingResolution);
    populateSensorModeDropdown(info.sensorMode);
    populateCodecDropdown(info.codec);

    setVal('productionCompany', info.productionCompany);
    setVal('rentalHouse', info.rentalHouse);
    if (crewContainer) {
        crewContainer.innerHTML = '';
        (info.people || []).forEach(p => createCrewRow(p));
    }
    if (prepContainer) {
        prepContainer.innerHTML = '';
        const prepArr = Array.isArray(info.prepDays)
            ? info.prepDays
            : (info.prepDays ? String(info.prepDays).split('\n') : ['']);
        if (!prepArr.length) prepArr.push('');
        prepArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createPrepRow({ start, end });
        });
    }
    if (shootContainer) {
        shootContainer.innerHTML = '';
        const shootArr = Array.isArray(info.shootingDays)
            ? info.shootingDays
            : (info.shootingDays ? String(info.shootingDays).split('\n') : ['']);
        if (!shootArr.length) shootArr.push('');
        shootArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createShootRow({ start, end });
        });
    }
    if (storageNeedsContainer) {
        storageNeedsContainer.innerHTML = '';
        const storageArr = Array.isArray(info.storageRequirements) ? info.storageRequirements : [];
        if (storageArr.length) {
            storageArr.forEach(entry => createStorageRequirementRow(entry));
        } else {
            createStorageRequirementRow();
        }
    }
    setVal('deliveryResolution', info.deliveryResolution);
    setMulti('aspectRatio', info.aspectRatio);
    setVal('baseFrameRate', info.baseFrameRate);
    setVal('sensorMode', info.sensorMode);
    setMulti('lenses', info.lenses);
    setMulti('requiredScenarios', info.requiredScenarios);
    setMulti('cameraHandle', info.cameraHandle);
    setVal('viewfinderExtension', info.viewfinderExtension);
    setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
    setVal('mattebox', info.mattebox);
    setMulti('gimbal', info.gimbal);
    setMulti('viewfinderSettings', info.viewfinderSettings);
    setMulti('frameGuides', info.frameGuides);
    setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
    setMulti('videoDistribution', info.videoDistribution);
    setVal('monitoringConfiguration', info.monitoringConfiguration);
    setMulti('monitorUserButtons', info.monitorUserButtons);
    setMulti('cameraUserButtons', info.cameraUserButtons);
    setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
    setVal('tripodHeadBrand', info.tripodHeadBrand);
    setVal('tripodBowl', info.tripodBowl);
    setMulti('tripodTypes', info.tripodTypes);
    setVal('tripodSpreader', info.tripodSpreader);
    setSliderBowlValue(info.sliderBowl || '');
    setEasyrigValue(info.easyrig || '');
    const filterTokens = parseFilterTokens(info.filter);
    setMulti('filter', filterTokens.map(t => t.type));
    renderFilterDetails();
    filterTokens.forEach(({ type, size, values }) => {
        const sizeSel = document.getElementById(`filter-size-${filterId(type)}`);
        if (sizeSel) sizeSel.value = size;
        const valSel = document.getElementById(`filter-values-${filterId(type)}`);
        if (valSel) {
            const arr = Array.isArray(values) ? values : [];
            Array.from(valSel.options).forEach(opt => {
                opt.selected = arr.includes(opt.value);
            });
        }
    });
}

function ensureZoomRemoteSetup(info) {
    if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
    let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!motors.length) return;
    if (motors.length < 2 && motorSelects[1]) {
        let second = motors[0];
        if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
            second = 'Arri Cforce Mini';
        }
        motorSelects[1].value = second;
        motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    }
    const allowed = new Set([
        'Arri Master Grip (single unit)',
        'Arri ZMU-4 (body only, wired)',
        'Tilta Nucleus-M Hand Grip (single)',
        'Tilta Nucleus-M II Handle (single)'
    ]);
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!controllers.some(c => allowed.has(c))) {
        const brand = detectBrand(motors[0]);
        let ctrl = null;
        if (brand === 'arri') {
            ctrl = 'Arri Master Grip (single unit)';
        } else if (brand === 'tilta') {
            ctrl = 'Tilta Nucleus-M Hand Grip (single)';
        }
        if (ctrl && controllerSelects[0]) {
            controllerSelects[0].value = ctrl;
        }
    }
    if (typeof updateCalculations === 'function') updateCalculations();
    if (typeof saveCurrentSession === 'function') saveCurrentSession();
}

function stripAutoGearContext(name) {
    return (name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function normalizeAutoGearName(name) {
    return stripAutoGearContext(name).toLowerCase();
}

function normalizeAutoGearNotesKey(value) {
    const base = typeof normalizeAutoGearText === 'function'
        ? normalizeAutoGearText(value, { collapseWhitespace: true })
        : (value == null ? '' : String(value)).trim().replace(/\s+/g, ' ');
    if (!base) {
        return '';
    }
    return base.replace(/^[\s\-–—]+/u, '').trim().toLowerCase();
}

function getAutoGearSpanNotesKey(span) {
    if (!span || !span.dataset) {
        return '';
    }
    const datasetNotes = typeof span.dataset.autoGearNotes === 'string'
        ? span.dataset.autoGearNotes
        : '';
    if (datasetNotes) {
        return normalizeAutoGearNotesKey(datasetNotes);
    }
    const notesNode = span.querySelector('.auto-gear-notes');
    if (!notesNode || typeof notesNode.textContent !== 'string') {
        return '';
    }
    return normalizeAutoGearNotesKey(notesNode.textContent);
}

function matchesAutoGearItem(target, actual) {
    if (!target || !actual) return false;
    const normTarget = normalizeAutoGearName(target);
    const normActual = normalizeAutoGearName(actual);
    if (normTarget === normActual) return true;
    return normTarget === normalizeAutoGearName(actual.replace(/^\d+x\s+/, ''));
}

function isOnboardMonitorRiggingItemName(name) {
    if (typeof name !== 'string') return false;
    const normalizedTarget = normalizeAutoGearName(ONBOARD_MONITOR_RIGGING_ITEM_NAME);
    if (!normalizedTarget) return false;
    return normalizeAutoGearName(name) === normalizedTarget;
}

function isOnboardMonitorRiggingItemEntry(entry) {
    if (!entry || typeof entry !== 'object') return false;
    return isOnboardMonitorRiggingItemName(entry.name);
}

function getOnboardMonitorRiggingRuleLabel() {
    if (typeof texts === 'object' && texts) {
        const localized = texts[currentLang]?.autoGearMonitorLabel;
        if (typeof localized === 'string' && localized.trim()) {
            return localized.trim();
        }
        const fallback = texts.en?.autoGearMonitorLabel;
        if (typeof fallback === 'string' && fallback.trim()) {
            return fallback.trim();
        }
    }
    return 'Onboard monitors';
}

function ensureOnboardMonitorRiggingAutoGearHighlight(table) {
    if (!table || typeof table.querySelectorAll !== 'function') {
        return;
    }
    const target = normalizeAutoGearName(ONBOARD_MONITOR_RIGGING_ITEM_NAME);
    if (!target) return;
    const label = getOnboardMonitorRiggingRuleLabel();
    const fallbackRule = { id: ONBOARD_MONITOR_RIGGING_RULE_ID, label };
    const spans = Array.from(table.querySelectorAll('.gear-item')).filter(span => {
        if (!span) return false;
        const dataName = typeof span.getAttribute === 'function' ? span.getAttribute('data-gear-name') : '';
        const textSource = dataName || span.textContent || '';
        return normalizeAutoGearName(textSource) === target;
    });
    if (!spans.length) {
        return;
    }
    spans.forEach(span => {
        const quantity = Math.max(1, getSpanCount(span));
        if (!span.classList.contains('auto-gear-item')) {
            const normalizedItem = normalizeAutoGearItem({
                id: ONBOARD_MONITOR_RIGGING_ITEM_ID,
                name: ONBOARD_MONITOR_RIGGING_ITEM_NAME,
                category: 'Rigging',
                quantity: quantity,
                contextNotes: [label]
            });
            configureAutoGearSpan(span, normalizedItem, quantity, fallbackRule);
            return;
        }
        appendAutoGearRuleSource(span, fallbackRule);
        applyAutoGearRuleColors(span, fallbackRule);
        const contextMap = getAutoGearSpanContextMap(span);
        if (!contextMap.has(label)) {
            mergeAutoGearSpanContextNotes(span, [label], quantity);
        } else {
            renderAutoGearSpanContextNotes(span);
        }
        refreshAutoGearRuleBadge(span);
    });
}

function getSpanCount(span) {
    if (!span) return 1;
    const text = span.textContent || '';
    const match = text.trim().match(/^(\d+)x\s+/);
    return match ? parseInt(match[1], 10) : 1;
}

function updateSpanCountInPlace(span, newCount) {
    if (!span) return;
    const walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT, null, false);
    let textNode = null;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (/\d+x\s+/i.test(node.textContent)) {
            textNode = node;
            break;
        }
    }
    if (!textNode) {
        span.insertBefore(document.createTextNode(`${newCount}x `), span.firstChild);
        return;
    }
    const value = textNode.textContent || '';
    const match = value.match(/^(\s*)(\d+)x\s+(.*)$/);
    if (match) {
        textNode.textContent = `${match[1]}${newCount}x ${match[3]}`;
    } else {
        textNode.textContent = value.replace(/^(\d+)x\s+/, `${newCount}x `);
    }
}

function cleanupAutoGearCell(cell) {
    if (!cell) return;
    const nodes = Array.from(cell.childNodes);
    let previousWasBreak = true;
    nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
            cell.removeChild(node);
            return;
        }
        if (node.nodeName === 'BR') {
            if (previousWasBreak || !node.nextSibling) {
                cell.removeChild(node);
                return;
            }
            previousWasBreak = true;
        } else {
            previousWasBreak = false;
        }
    });
    while (cell.firstChild && cell.firstChild.nodeName === 'BR') {
        cell.removeChild(cell.firstChild);
    }
    while (cell.lastChild && cell.lastChild.nodeName === 'BR') {
        cell.removeChild(cell.lastChild);
    }
    const textContent = cell.textContent ? cell.textContent.trim() : '';
    if (!textContent && !cell.querySelector('.gear-item')) {
        const row = cell.closest('tr');
        const section = row ? row.closest('tbody') : null;
        if (section && section.classList.contains('auto-gear-category')) {
            section.remove();
        }
    }
}

function analyzeAutoGearSegment(nodes) {
    if (!nodes || !nodes.length) return null;
    const span = nodes.find(node => node.nodeType === 1 && node.classList && node.classList.contains('gear-item'));
    if (span) {
        const name = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
        const count = getSpanCount(span);
        return { span, name, count };
    }
    const wrapper = document.createElement('div');
    nodes.forEach(node => wrapper.appendChild(node.cloneNode(true)));
    let text = wrapper.innerHTML
        .replace(/<select[\s\S]*?<\/select>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
    if (!text) return null;
    const match = text.match(/^(\d+)x\s+/);
    let count = 1;
    if (match) {
        count = parseInt(match[1], 10);
        text = text.slice(match[0].length).trim();
    }
    return { span: null, name: text, count, wrapper };
}

function updateRawSegmentCount(nodes, info, newCount) {
    if (!nodes.length) return;
    let updated = false;
    for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            const value = node.textContent || '';
            if (/\d+x\s+/i.test(value)) {
                node.textContent = value.replace(/^(\s*)(\d+)x\s+/, (match, spaces) => `${spaces}${newCount}x `);
                updated = true;
                break;
            }
            if (value.trim()) {
                node.textContent = `${newCount}x ${value.trim().replace(/^(\d+)x\s+/, '')}`;
                updated = true;
                break;
            }
        } else if (node.nodeType === 1) {
            const child = node.firstChild;
            if (child && child.nodeType === Node.TEXT_NODE && /\d+x\s+/i.test(child.textContent || '')) {
                child.textContent = (child.textContent || '').replace(/^(\s*)(\d+)x\s+/, (match, spaces) => `${spaces}${newCount}x `);
                updated = true;
                break;
            }
        }
    }
    if (!updated) {
        const first = nodes[0];
        const parent = first.parentNode;
        if (parent) {
            parent.insertBefore(document.createTextNode(`${newCount}x ${info.name}`), first);
        }
    }
}

function removeAutoGearItem(cell, item, remainingOverride) {
    if (!cell) return normalizeAutoGearQuantity(item.quantity);
    let remaining = typeof remainingOverride === 'number'
        ? remainingOverride
        : normalizeAutoGearQuantity(item.quantity);
    if (remaining <= 0) return remaining;
    const nodes = Array.from(cell.childNodes);
    if (!nodes.length) return remaining;
    const segments = [];
    let current = [];
    nodes.forEach(node => {
        if (node.nodeName === 'BR') {
            segments.push({ nodes: current, separator: node });
            current = [];
        } else {
            current.push(node);
        }
    });
    segments.push({ nodes: current, separator: null });
    let modified = false;
    segments.forEach(segment => {
        if (!segment.nodes.length || remaining <= 0) return;
        const info = analyzeAutoGearSegment(segment.nodes);
        if (!info || !info.name || !matchesAutoGearItem(item.name, info.name)) return;
        if (info.span) {
            const currentCount = info.count;
            if (currentCount > remaining) {
                updateSpanCountInPlace(info.span, currentCount - remaining);
                remaining = 0;
            } else {
                remaining -= currentCount;
                segment.nodes.forEach(node => node.remove());
            }
            modified = true;
        } else {
            if (info.count > remaining && info.count > 1) {
                updateRawSegmentCount(segment.nodes, info, info.count - remaining);
                remaining = 0;
                modified = true;
            } else {
                remaining -= info.count;
                segment.nodes.forEach(node => node.remove());
                modified = true;
            }
        }
    });
    if (modified) {
        cleanupAutoGearCell(cell);
    }
    return remaining;
}

function getCrewRoleLabelForDisplay(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const langTexts = texts[currentLang] || texts.en || {};
  const crewRoleLabels = langTexts.crewRoles || texts.en?.crewRoles || {};
  return crewRoleLabels?.[trimmed] || trimmed;
}

function getAutoGearRuleDisplayLabel(rule) {
  if (!rule || typeof rule !== 'object') return '';
  const label = typeof rule.label === 'string' ? rule.label.trim() : '';
  if (label) return label;
  const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (scenarioList.length) return scenarioList.join(' + ');
  const cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
  if (cameraList.length) return cameraList.join(' + ');
  const monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
  if (monitorList.length) return monitorList.join(' + ');
  const crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent.filter(Boolean) : [];
  if (crewPresentList.length) {
    return crewPresentList.map(getCrewRoleLabelForDisplay).join(' + ');
  }
  const crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.filter(Boolean) : [];
  if (crewAbsentList.length) {
    return crewAbsentList.map(getCrewRoleLabelForDisplay).join(' + ');
  }
  const wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
  if (wirelessList.length) return wirelessList.join(' + ');
  const motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
  if (motorsList.length) return motorsList.join(' + ');
  const controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
  if (controllersList.length) return controllersList.join(' + ');
  const distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
  if (distanceList.length) return distanceList.join(' + ');
  const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
  if (matteboxList.length) return matteboxList.join(' + ');
  const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
  if (cameraHandleList.length) return cameraHandleList.join(' + ');
  const viewfinderList = Array.isArray(rule.viewfinderExtension)
    ? rule.viewfinderExtension.filter(Boolean).map(getViewfinderFallbackLabel)
    : [];
  if (viewfinderList.length) return viewfinderList.join(' + ');
  const videoDistributionList = Array.isArray(rule.videoDistribution)
    ? rule.videoDistribution.filter(Boolean).map(getVideoDistributionFallbackLabel)
    : [];
  if (videoDistributionList.length) return videoDistributionList.join(' + ');
  return '';
}

function formatAutoGearRuleTooltip(rule) {
    const langTexts = texts[currentLang] || texts.en || {};
    const unnamedTemplate = langTexts.autoGearRuleTooltipUnnamed
        || texts.en?.autoGearRuleTooltipUnnamed
        || 'Added by automatic gear rule';
    if (!rule || typeof rule !== 'object') return unnamedTemplate;
    const label = getAutoGearRuleDisplayLabel(rule);
    if (label) {
        const namedTemplate = langTexts.autoGearRuleTooltipNamed
            || texts.en?.autoGearRuleTooltipNamed
            || `${unnamedTemplate}: %s`;
        return namedTemplate.replace('%s', label);
    }
    return unnamedTemplate;
}

function extractAutoGearRuleSource(rule) {
    if (!rule || typeof rule !== 'object') return null;
    const id = typeof rule.id === 'string' ? rule.id.trim() : '';
    const label = getAutoGearRuleDisplayLabel(rule);
    if (!id && !label) return null;
    return { id, label };
}

function normalizeAutoGearRuleSourceEntry(entry) {
    if (!entry) return null;
    if (typeof entry === 'string') {
        const trimmed = entry.trim();
        if (!trimmed) return null;
        return { id: '', label: trimmed };
    }
    if (typeof entry !== 'object') return null;
    const id = typeof entry.id === 'string' ? entry.id.trim() : '';
    const label = typeof entry.label === 'string' ? entry.label.trim() : '';
    if (!id && !label) return null;
    return { id, label };
}

function dedupeAutoGearRuleSources(entries) {
    if (!Array.isArray(entries) || !entries.length) return [];
    const seen = new Set();
    const normalized = [];
    entries.forEach(entry => {
        const source = normalizeAutoGearRuleSourceEntry(entry);
        if (!source) return;
        const idKey = source.id ? source.id.toLowerCase() : '';
        const labelKey = source.label ? source.label.toLowerCase() : '';
        const key = idKey ? `id:${idKey}` : (labelKey ? `label:${labelKey}` : '');
        if (!key || seen.has(key)) return;
        seen.add(key);
        normalized.push({ id: source.id, label: source.label });
    });
    return normalized;
}

function formatAutoGearSelectorDisplayValue(type, value) {
    const normalizedValue = typeof value === 'string' ? value : (value == null ? '' : String(value));
    const scope = typeof globalThis !== 'undefined'
        ? globalThis
        : (typeof window !== 'undefined'
            ? window
            : (typeof self !== 'undefined' ? self : {}));
    if (typeof scope.formatAutoGearSelectorValue === 'function') {
        return scope.formatAutoGearSelectorValue(type, normalizedValue);
    }
    if (typeof addArriKNumber === 'function' && (type === 'monitor' || type === 'directorMonitor')) {
        return addArriKNumber(normalizedValue);
    }
    return normalizedValue;
}

function getAutoGearRuleSources(span) {
    if (!span || !span.dataset) return [];
    const dataset = span.dataset;
    const raw = typeof dataset.autoGearRuleSources === 'string' ? dataset.autoGearRuleSources : '';
    let sources = [];
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                sources = dedupeAutoGearRuleSources(parsed);
            }
        } catch (error) {
            console.warn('Failed to parse automatic gear rule metadata', error);
            sources = [];
        }
    }
    if (!sources.length) {
        sources = dedupeAutoGearRuleSources([
            { id: dataset.autoGearRuleId, label: dataset.autoGearRuleLabel },
        ]);
    }
    return sources;
}

function setAutoGearRuleSources(span, entries) {
    if (!span || !span.dataset) return;
    const normalized = dedupeAutoGearRuleSources(entries);
    const dataset = span.dataset;
    if (!normalized.length) {
        delete dataset.autoGearRuleSources;
        delete dataset.autoGearRuleId;
        delete dataset.autoGearRuleLabel;
        return;
    }
    try {
        dataset.autoGearRuleSources = JSON.stringify(normalized);
    } catch (error) {
        console.warn('Failed to serialize automatic gear rule metadata', error);
    }
    const primary = normalized[0];
    if (primary.id) {
        dataset.autoGearRuleId = primary.id;
    } else {
        delete dataset.autoGearRuleId;
    }
    if (primary.label) {
        dataset.autoGearRuleLabel = primary.label;
    } else {
        delete dataset.autoGearRuleLabel;
    }
}

function appendAutoGearRuleSource(span, rule) {
    if (!span || !span.dataset) return;
    const addition = extractAutoGearRuleSource(rule);
    const existing = getAutoGearRuleSources(span);
    if (addition) {
        existing.push(addition);
    }
    setAutoGearRuleSources(span, existing);
}

function buildAutoGearRuleTooltipFromSources(sources) {
    if (!Array.isArray(sources) || !sources.length) return '';
    const labels = sources
        .map(source => {
            if (!source) return '';
            const label = typeof source.label === 'string' ? source.label.trim() : '';
            if (label) return label;
            const id = typeof source.id === 'string' ? source.id.trim() : '';
            return id;
        })
        .filter(Boolean);
    if (!labels.length) return '';
    return formatAutoGearRuleTooltip({ label: labels.join(', ') });
}

function getAutoGearSpanContextMap(span) {
    if (!span || !span.dataset || !span.dataset.autoGearContextCounts) return new Map();
    try {
        const parsed = JSON.parse(span.dataset.autoGearContextCounts);
        if (!parsed || typeof parsed !== 'object') return new Map();
        const map = new Map();
        Object.keys(parsed).forEach(key => {
            const normalizedKey = key && key.trim();
            if (!normalizedKey) return;
            const count = Number(parsed[key]);
            if (!Number.isFinite(count) || count <= 0) return;
            map.set(normalizedKey, count);
        });
        return map;
    } catch (error) {
        return new Map();
    }
}

function saveAutoGearSpanContextMap(span, map) {
    if (!span || !span.dataset) return;
    if (!map || !(map instanceof Map) || map.size === 0) {
        delete span.dataset.autoGearContextCounts;
        return;
    }
    const obj = {};
    map.forEach((value, key) => {
        if (!key) return;
        if (!Number.isFinite(value) || value <= 0) return;
        obj[key] = value;
    });
    const keys = Object.keys(obj);
    if (!keys.length) {
        delete span.dataset.autoGearContextCounts;
    } else {
        span.dataset.autoGearContextCounts = JSON.stringify(obj);
    }
}

const AUTO_GEAR_CONTEXT_SORT_PRIORITY = new Map([
    ['director handheld', 1],
    ['gaffer handheld', 2],
    ['dop handheld', 3],
]);

function setAutoGearSpanContextNotes(span, contexts, quantity) {
    if (!span || !span.dataset) return;
    const map = new Map();
    const baseQty = Math.max(0, Number(quantity) || 0);
    if (Array.isArray(contexts)) {
        contexts.forEach(note => {
            const key = note && note.trim();
            if (!key) return;
            map.set(key, (map.get(key) || 0) + baseQty);
        });
    }
    saveAutoGearSpanContextMap(span, map);
    renderAutoGearSpanContextNotes(span);
}

function mergeAutoGearSpanContextNotes(span, contexts, quantity) {
    if (!span || !span.dataset) {
        renderAutoGearSpanContextNotes(span);
        return;
    }
    if (!Array.isArray(contexts) || !contexts.length) {
        renderAutoGearSpanContextNotes(span);
        return;
    }
    const map = getAutoGearSpanContextMap(span);
    const delta = Math.max(0, Number(quantity) || 0);
    if (delta <= 0) {
        renderAutoGearSpanContextNotes(span);
        return;
    }
    contexts.forEach(note => {
        const key = note && note.trim();
        if (!key) return;
        map.set(key, (map.get(key) || 0) + delta);
    });
    saveAutoGearSpanContextMap(span, map);
    renderAutoGearSpanContextNotes(span);
}

function renderAutoGearSpanContextNotes(span) {
    if (!span) return;
    const map = getAutoGearSpanContextMap(span);
    const entries = Array.from(map.entries())
        .filter(([, count]) => Number.isFinite(count) && count > 0);
    let contextNode = span.querySelector('.auto-gear-context-notes');
    if (entries.length <= 1) {
        if (contextNode) {
            contextNode.remove();
        }
        return;
    }
    const parts = entries
        .sort(([a], [b]) => {
            const pa = AUTO_GEAR_CONTEXT_SORT_PRIORITY.get(a.trim().toLowerCase()) ?? Number.POSITIVE_INFINITY;
            const pb = AUTO_GEAR_CONTEXT_SORT_PRIORITY.get(b.trim().toLowerCase()) ?? Number.POSITIVE_INFINITY;
            if (pa !== pb) return pa - pb;
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        })
        .map(([note, count]) => `${count}x ${note}`);
    const text = ` (${parts.join(', ')})`;
    if (!contextNode) {
        contextNode = document.createElement('span');
        contextNode.className = 'auto-gear-context-notes';
        const selectorContainer = span.querySelector('.auto-gear-selector-container');
        const notesNode = span.querySelector('.auto-gear-notes');
        const referenceNode = selectorContainer || notesNode;
        if (referenceNode && referenceNode.parentNode === span) {
            span.insertBefore(contextNode, referenceNode);
        } else {
            span.appendChild(contextNode);
        }
    }
    contextNode.textContent = text;
}

function configureAutoGearSpan(span, normalizedItem, quantity, rule) {
    if (!span || !normalizedItem) return;
    const name = normalizedItem.name ? normalizedItem.name.trim() : '';
    if (!name) return;
    while (span.firstChild) {
        span.removeChild(span.firstChild);
    }
    span.classList.add('gear-item');
    span.classList.add('auto-gear-item');
    span.setAttribute('data-gear-name', name);
    if (span.dataset) {
        delete span.dataset.autoGearContextCounts;
    }
    if (span.dataset) {
        const source = extractAutoGearRuleSource(rule);
        setAutoGearRuleSources(span, source ? [source] : []);
    }
    const tooltipSources = getAutoGearRuleSources(span);
    const tooltip = tooltipSources.length
        ? buildAutoGearRuleTooltipFromSources(tooltipSources)
        : formatAutoGearRuleTooltip(rule);
    if (tooltip) {
        span.title = tooltip;
    } else {
        span.removeAttribute('title');
    }
    const displayName = typeof addArriKNumber === 'function' ? addArriKNumber(name) : name;
    span.appendChild(document.createTextNode(`${quantity}x ${displayName}`));
    if (normalizedItem.screenSize) {
        span.appendChild(document.createTextNode(` - ${normalizedItem.screenSize}`));
    }
    if (Array.isArray(normalizedItem.contextNotes) && normalizedItem.contextNotes.length) {
        setAutoGearSpanContextNotes(span, normalizedItem.contextNotes, quantity);
    } else {
        renderAutoGearSpanContextNotes(span);
    }
    const selectorType = normalizedItem.selectorType || 'none';
    const selectorDefault = normalizedItem.selectorDefault || '';
    const selectorLabel = getAutoGearSelectorLabel(selectorType);
    if (selectorType && selectorType !== 'none') {
        if (normalizedItem.selectorEnabled) {
            const options = getAutoGearSelectorOptions(selectorType);
            const sanitizedRuleId = rule && rule.id ? rule.id.replace(/[^a-zA-Z0-9_-]/g, '') : 'rule';
            const selectId = `autoGearSelector_${sanitizedRuleId}_${normalizedItem.id}`;
            const select = document.createElement('select');
            select.id = selectId;
            select.className = 'auto-gear-selector';
            select.dataset.autoGearSelectorType = selectorType;
            if (selectorLabel) {
                select.setAttribute('aria-label', selectorLabel);
            }
            let normalizedDefaultValue = '';
            options.forEach(optionName => {
                const option = document.createElement('option');
                option.value = optionName;
                option.textContent = formatAutoGearSelectorDisplayValue(selectorType, optionName);
                if (!normalizedDefaultValue && selectorDefault && optionName.toLowerCase() === selectorDefault.toLowerCase()) {
                    normalizedDefaultValue = option.value;
                }
                select.appendChild(option);
            });
            if (selectorDefault && !normalizedDefaultValue) {
                const fallbackOption = document.createElement('option');
                fallbackOption.value = selectorDefault;
                fallbackOption.textContent = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
                select.insertBefore(fallbackOption, select.firstChild);
                normalizedDefaultValue = selectorDefault;
            }
            if (normalizedDefaultValue) {
                select.value = normalizedDefaultValue;
            } else if (select.options.length) {
                select.selectedIndex = 0;
            }
            if (!select.options.length) {
                const placeholder = document.createElement('option');
                placeholder.value = '';
                placeholder.textContent = selectorLabel || '';
                placeholder.disabled = true;
                placeholder.selected = true;
                select.appendChild(placeholder);
                select.disabled = true;
            }
            const wrapper = document.createElement('span');
            wrapper.className = 'auto-gear-selector-container';
            wrapper.appendChild(select);
            span.appendChild(document.createTextNode(' - '));
            span.appendChild(wrapper);
        } else if (selectorDefault) {
            const formattedDefault = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
            span.appendChild(document.createTextNode(` - ${selectorLabel}: ${formattedDefault}`));
        } else if (selectorLabel) {
            span.appendChild(document.createTextNode(` - ${selectorLabel}`));
        }
    }
    if (span.dataset) {
        if (normalizedItem.notes) {
            span.dataset.autoGearNotes = normalizedItem.notes;
        } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearNotes')) {
            delete span.dataset.autoGearNotes;
        }
    }
    if (normalizedItem.notes) {
        const delimiter = normalizedItem.notes.trim().toLowerCase().startsWith('incl') ? ' ' : ' – ';
        const notesSpan = document.createElement('span');
        notesSpan.className = 'auto-gear-notes';
        notesSpan.textContent = `${delimiter}${normalizedItem.notes}`;
        span.appendChild(notesSpan);
    }
    applyAutoGearRuleColors(span, rule);
    refreshAutoGearRuleBadge(span);
}

function addAutoGearItem(cell, item, rule) {
    if (!cell) return;
    const normalizedItem = normalizeAutoGearItem(item);
    if (!normalizedItem) return;
    const quantity = normalizeAutoGearQuantity(normalizedItem.quantity);
    if (quantity <= 0) return;
    const name = normalizedItem.name ? normalizedItem.name.trim() : '';
    if (!name) return;
    const spans = Array.from(cell.querySelectorAll('.gear-item'));
    const targetNotesKey = normalizeAutoGearNotesKey(normalizedItem.notes);
    for (const span of spans) {
        const spanName = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
        if (matchesAutoGearItem(name, spanName)) {
            const spanNotesKey = getAutoGearSpanNotesKey(span);
            if (targetNotesKey) {
                if (span.classList.contains('auto-gear-item')) {
                    if (!spanNotesKey || spanNotesKey !== targetNotesKey) {
                        continue;
                    }
                } else if (spanNotesKey && spanNotesKey !== targetNotesKey) {
                    continue;
                }
            } else if (span.classList.contains('auto-gear-item') && spanNotesKey) {
                continue;
            }
            if (span.classList.contains('auto-gear-item')) {
                const newCount = getSpanCount(span) + quantity;
                updateSpanCountInPlace(span, newCount);
                if (Array.isArray(normalizedItem.contextNotes) && normalizedItem.contextNotes.length) {
                    mergeAutoGearSpanContextNotes(span, normalizedItem.contextNotes, quantity);
                } else {
                    renderAutoGearSpanContextNotes(span);
                }
                if (span.dataset) {
                    if (normalizedItem.notes) {
                        span.dataset.autoGearNotes = normalizedItem.notes;
                    } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearNotes')) {
                        delete span.dataset.autoGearNotes;
                    }
                }
                if (rule && typeof rule === 'object') {
                    appendAutoGearRuleSource(span, rule);
                } else if (span.dataset) {
                    setAutoGearRuleSources(span, getAutoGearRuleSources(span));
                }
                const tooltip = buildAutoGearRuleTooltipFromSources(getAutoGearRuleSources(span));
                if (tooltip) {
                    span.title = tooltip;
                } else {
                    span.removeAttribute('title');
                }
                applyAutoGearRuleColors(span, rule);
                refreshAutoGearRuleBadge(span);
            } else {
                configureAutoGearSpan(span, normalizedItem, quantity, rule);
            }
            return;
        }
    }
    if (cell.childNodes.length) {
        cell.appendChild(document.createElement('br'));
    }
    const span = document.createElement('span');
    configureAutoGearSpan(span, normalizedItem, quantity, rule);
    cell.appendChild(span);
}

function ensureAutoGearCategory(table, category) {
    const rawCategory = category && category.trim() ? category.trim() : '';
    const label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
    const existing = Array.from(table.querySelectorAll('tbody.category-group')).find(body => {
        if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
            return body.dataset.autoCategory === rawCategory;
        }
        const headerCell = body.querySelector('.category-row td');
        return headerCell && headerCell.textContent.trim() === label;
    });
    if (existing) {
        const cell = existing.querySelector('tr:not(.category-row) td');
        return cell || null;
    }
    const body = document.createElement('tbody');
    body.className = 'category-group auto-gear-category';
    body.dataset.autoCategory = rawCategory;
    const headerRow = document.createElement('tr');
    headerRow.className = 'category-row';
    const headerCell = document.createElement('td');
    const labelText = rawCategory
        ? rawCategory
        : (texts[currentLang]?.autoGearCustomCategory || texts.en?.autoGearCustomCategory || 'Custom Additions');
    headerCell.textContent = labelText;
    headerRow.appendChild(headerCell);
    body.appendChild(headerRow);
    const itemsRow = document.createElement('tr');
    const itemsCell = document.createElement('td');
    itemsRow.appendChild(itemsCell);
    body.appendChild(itemsRow);
    table.appendChild(body);
    return itemsCell;
}

function findAutoGearCategoryCell(table, category) {
    if (!table) return null;
    const rawCategory = category && category.trim() ? category.trim() : '';
    const label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
    const bodies = Array.from(table.querySelectorAll('tbody.category-group'));
    for (const body of bodies) {
        if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
            if (body.dataset.autoCategory === rawCategory) {
                const cell = body.querySelector('tr:not(.category-row) td');
                if (cell) return cell;
            }
            continue;
        }
        const headerCell = body.querySelector('.category-row td');
        if (!headerCell) continue;
        const headerLabel = headerCell.textContent.trim();
        if (rawCategory) {
            if (headerLabel === rawCategory) {
                const cell = body.querySelector('tr:not(.category-row) td');
                if (cell) return cell;
            }
        } else if (body.classList.contains('auto-gear-category') || headerLabel === label) {
            const cell = body.querySelector('tr:not(.category-row) td');
            if (cell) return cell;
        }
    }
    return null;
}

function normalizeAutoGearScenarioLogicValue(value) {
    if (typeof value !== 'string') return 'all';
    const normalized = value.trim().toLowerCase();
    if (!normalized) return 'all';
    if (normalized === 'or') return 'any';
    if (normalized === 'and') return 'all';
    if (normalized === 'any') return 'any';
    if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
        return 'multiplier';
    }
    return normalized === 'all' ? 'all' : 'all';
}

function normalizeAutoGearScenarioMultiplierValue(value) {
    const num = parseInt(value, 10);
    return Number.isFinite(num) && num > 1 ? num : 1;
}

function computeAutoGearScenarioOutcome(rule, scenarioSet) {
    if (!rule || typeof rule !== 'object') {
        return { active: true, multiplier: 1 };
    }
    const rawList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
    if (!rawList.length) {
        return { active: true, multiplier: 1 };
    }
    const normalizedTargets = rawList
        .map(normalizeAutoGearTriggerValue)
        .filter(Boolean);
    if (!normalizedTargets.length) {
        return { active: false, multiplier: 0 };
    }
    const logic = normalizeAutoGearScenarioLogicValue(rule.scenarioLogic);
    if (logic === 'any') {
        const hasAny = normalizedTargets.some(target => scenarioSet.has(target));
        return { active: hasAny, multiplier: hasAny ? 1 : 0 };
    }
    if (logic === 'multiplier') {
        const requestedPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary : '';
        const normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
        let baseTarget = '';
        if (normalizedPrimary && normalizedTargets.includes(normalizedPrimary)) {
            baseTarget = normalizedPrimary;
        } else {
            baseTarget = normalizedTargets[0] || '';
        }
        if (!baseTarget || !scenarioSet.has(baseTarget)) {
            return { active: false, multiplier: 0 };
        }
        const extras = normalizedTargets.filter(target => target !== baseTarget);
        if (!extras.length) {
            return { active: true, multiplier: 1 };
        }
        const extrasSatisfied = extras.every(target => scenarioSet.has(target));
        const multiplier = normalizeAutoGearScenarioMultiplierValue(rule.scenarioMultiplier);
        return { active: true, multiplier: extrasSatisfied ? multiplier : 1 };
    }
    const allPresent = normalizedTargets.every(target => scenarioSet.has(target));
    return { active: allPresent, multiplier: allPresent ? 1 : 0 };
}

function normalizeClampOnDiameterKey(value) {
    if (!Number.isFinite(value)) return '';
    return Number(value).toFixed(3);
}

function formatClampOnDiameterLabel(value) {
    if (!Number.isFinite(value)) return '';
    const rounded = Number(Number(value).toFixed(2));
    if (!Number.isFinite(rounded)) return '';
    return String(rounded);
}

function shouldAugmentClampOnRule(rule) {
    if (!rule || typeof rule !== 'object') return false;
    const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
    if (!matteboxList.length) return false;
    const normalized = matteboxList
        .map(value => normalizeAutoGearTriggerValue(value).replace(/-/g, ' '))
        .filter(Boolean);
    if (!normalized.length) return false;
    return normalized.includes('clamp on');
}

function buildClampOnBackingAdditionsFromInfo(info) {
    const lensValue = info ? info.lenses : '';
    let lensNames = [];
    if (Array.isArray(lensValue)) {
        lensNames = lensValue.filter(name => typeof name === 'string' && name.trim());
    } else if (typeof lensValue === 'string') {
        lensNames = lensValue
            .split(',')
            .map(name => name.trim())
            .filter(Boolean);
    }
    if (!lensNames.length) return [];
    const lensDb = devices && devices.lenses ? devices.lenses : null;
    if (!lensDb || typeof lensDb !== 'object') return [];
    const normalizedLookup = new Map();
    Object.keys(lensDb).forEach(name => {
        if (typeof name !== 'string' || !name) return;
        const normalized = name.trim().toLowerCase();
        if (normalized && !normalizedLookup.has(normalized)) {
            normalizedLookup.set(normalized, lensDb[name]);
        }
    });
    const diameterMap = new Map();
    lensNames.forEach(selectionName => {
        if (typeof selectionName !== 'string') return;
        const trimmed = selectionName.trim();
        if (!trimmed) return;
        const normalized = trimmed.toLowerCase();
        let lens = Object.prototype.hasOwnProperty.call(lensDb, trimmed) ? lensDb[trimmed] : null;
        if (!lens && normalizedLookup.has(normalized)) {
            lens = normalizedLookup.get(normalized);
        }
        if (!lens || typeof lens !== 'object') return;
        const diameter = Number(lens.frontDiameterMm);
        if (!Number.isFinite(diameter) || diameter <= 0) return;
        const key = normalizeClampOnDiameterKey(diameter);
        if (!key) return;
        if (!diameterMap.has(key)) {
            diameterMap.set(key, { diameter, lenses: [] });
        }
        const entry = diameterMap.get(key);
        if (entry.lenses.indexOf(trimmed) === -1) {
            entry.lenses.push(trimmed);
        }
    });
    if (!diameterMap.size) return [];
    const sorted = Array.from(diameterMap.values()).sort((a, b) => {
        if (a.diameter === b.diameter) return 0;
        return a.diameter < b.diameter ? -1 : 1;
    });
    return sorted.map(({ diameter, lenses }) => {
        const sizeLabel = formatClampOnDiameterLabel(diameter) || String(Number(diameter));
        const item = {
            name: `Mattebox Clamp-On Backing ${sizeLabel}mm`,
            category: 'Matte box + filter',
            quantity: 1,
        };
        if (Array.isArray(lenses) && lenses.length) {
            item.contextNotes = [`Lenses: ${lenses.join(', ')}`];
        }
        return item;
    });
}

function mergeAutoGearAdditions(baseAdditions, extraAdditions) {
    const result = [];
    const seen = new Set();
    const pushUnique = (item) => {
        if (!item || typeof item !== 'object') return;
        const name = typeof item.name === 'string' ? item.name.trim() : '';
        if (!name) return;
        const category = typeof item.category === 'string' ? item.category.trim() : '';
        const key = `${name.toLowerCase()}|${category.toLowerCase()}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push(item);
    };
    baseAdditions.forEach(pushUnique);
    extraAdditions.forEach(pushUnique);
    return result;
}

function applyAutoGearRulesToTableHtml(tableHtml, info) {
    if (!tableHtml || !autoGearRules.length || typeof document === 'undefined') return tableHtml;
  const scenarios = info && info.requiredScenarios
      ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const normalizedScenarioSet = new Set(
    scenarios
      .map(normalizeAutoGearTriggerValue)
      .filter(Boolean)
  );
  const selectedMattebox = info && typeof info.mattebox === 'string'
      ? info.mattebox.trim()
      : '';
  const normalizedMattebox = normalizeAutoGearTriggerValue(selectedMattebox);
  const cameraHandles = info && typeof info.cameraHandle === 'string'
      ? info.cameraHandle.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const normalizedCameraHandles = cameraHandles
      .map(normalizeAutoGearTriggerValue)
      .filter(Boolean);
  const cameraHandleSet = new Set(normalizedCameraHandles);
  const rawViewfinderExtension = info && typeof info.viewfinderExtension === 'string'
      ? info.viewfinderExtension.trim()
      : '';
  const hasViewfinderSelection = Boolean(rawViewfinderExtension);
  const normalizedViewfinderExtension = hasViewfinderSelection
      ? normalizeAutoGearTriggerValue(rawViewfinderExtension)
      : '';
  const rawDeliveryResolution = info && typeof info.deliveryResolution === 'string'
      ? info.deliveryResolution.trim()
      : '';
  const normalizedDeliveryResolution = normalizeAutoGearTriggerValue(rawDeliveryResolution);
  let videoDistribution = [];
  if (info && Array.isArray(info.videoDistribution)) {
    videoDistribution = info.videoDistribution;
  } else if (info && typeof info.videoDistribution === 'string') {
    videoDistribution = info.videoDistribution
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  const normalizedVideoDistribution = videoDistribution
    .map(normalizeVideoDistributionOptionValue)
    .map(value => (value === '__none__' ? '' : normalizeAutoGearTriggerValue(value)))
    .filter(Boolean);
  const videoDistributionSet = new Set(normalizedVideoDistribution);
  const rawCameraSelection = info && typeof info.cameraSelection === 'string'
      ? info.cameraSelection.trim()
      : '';
  const normalizedCameraSelection = normalizeAutoGearTriggerValue(rawCameraSelection);
  const cameraWeightDataset = devices && devices.cameras ? devices.cameras : null;
  const normalizedCameraWeights = (() => {
    if (!cameraWeightDataset) return null;
    const lookup = {};
    Object.keys(cameraWeightDataset).forEach(name => {
      const entry = cameraWeightDataset[name];
      if (!entry || !Number.isFinite(entry.weight_g)) return;
      const normalizedName = normalizeAutoGearTriggerValue(name);
      if (normalizedName && !Object.prototype.hasOwnProperty.call(lookup, normalizedName)) {
        lookup[normalizedName] = Number(entry.weight_g);
      }
    });
    return lookup;
  })();
  const selectedCameraWeight = (() => {
    if (!cameraWeightDataset) return null;
    const direct = rawCameraSelection && Object.prototype.hasOwnProperty.call(cameraWeightDataset, rawCameraSelection)
      ? cameraWeightDataset[rawCameraSelection]
      : null;
    if (direct && Number.isFinite(direct.weight_g)) {
      return Number(direct.weight_g);
    }
    if (!normalizedCameraSelection || !normalizedCameraWeights) return null;
    if (Object.prototype.hasOwnProperty.call(normalizedCameraWeights, normalizedCameraSelection)) {
      return normalizedCameraWeights[normalizedCameraSelection];
    }
    return null;
  })();
  const rawMonitorSelection = info && typeof info.monitorSelection === 'string'
      ? info.monitorSelection.trim()
      : '';
  const normalizedMonitorSelection = normalizeAutoGearTriggerValue(rawMonitorSelection);
  const rawWirelessSelection = info && typeof info.wirelessSelection === 'string'
      ? info.wirelessSelection.trim()
      : '';
  const normalizedWirelessSelection = normalizeAutoGearTriggerValue(rawWirelessSelection);
  const rawTripodHeadBrand = info && typeof info.tripodHeadBrand === 'string'
      ? info.tripodHeadBrand.trim()
      : '';
  const normalizedTripodHeadBrand = normalizeAutoGearTriggerValue(rawTripodHeadBrand);
  const rawTripodBowl = info && typeof info.tripodBowl === 'string'
      ? info.tripodBowl.trim()
      : '';
  const normalizedTripodBowl = normalizeAutoGearTriggerValue(rawTripodBowl);
  const tripodTypeValues = Array.isArray(info?.tripodTypes)
      ? info.tripodTypes
      : typeof info?.tripodTypes === 'string'
        ? info.tripodTypes.split(',').map(s => s.trim()).filter(Boolean)
        : [];
  const normalizedTripodTypesSet = new Set(
    tripodTypeValues
      .map(value => normalizeAutoGearTriggerValue(value))
      .filter(Boolean)
  );
  const rawTripodSpreader = info && typeof info.tripodSpreader === 'string'
      ? info.tripodSpreader.trim()
      : '';
  const normalizedTripodSpreader = normalizeAutoGearTriggerValue(rawTripodSpreader);
  const crewRoleSet = new Set(
    Array.isArray(info?.people)
      ? info.people
          .map(entry => (entry && typeof entry.role === 'string') ? entry.role.trim() : '')
          .filter(Boolean)
          .map(value => normalizeAutoGearTriggerValue(value))
          .filter(Boolean)
      : []
  );
  const rawMotorSelections = [];
  if (info) {
    if (Array.isArray(info.motorSelections)) {
      rawMotorSelections.push(...info.motorSelections);
    }
    if (Array.isArray(info.motors)) {
      rawMotorSelections.push(...info.motors);
    }
  }
  const normalizedMotorSet = new Set(
    rawMotorSelections
      .filter(value => typeof value === 'string')
      .map(value => normalizeAutoGearTriggerValue(value))
      .filter(Boolean)
  );
  const rawControllerSelections = [];
  if (info) {
    if (Array.isArray(info.controllerSelections)) {
      rawControllerSelections.push(...info.controllerSelections);
    }
    if (Array.isArray(info.controllers)) {
      rawControllerSelections.push(...info.controllers);
    }
  }
  const normalizedControllerSet = new Set(
    rawControllerSelections
      .filter(value => typeof value === 'string')
      .map(value => normalizeAutoGearTriggerValue(value))
      .filter(Boolean)
  );
  const parseShootingPeriodDays = entry => {
    if (typeof entry !== 'string') return 0;
    const trimmed = entry.trim();
    if (!trimmed) return 0;
    const parts = trimmed.split(' to ');
    let start = parts[0] ? parts[0].trim() : '';
    let end = parts[1] ? parts[1].trim() : '';
    if (!start && end) start = end;
    if (!end && start) end = start;
    if (!start) return 0;
    const toTimestamp = value => {
      if (!value) return NaN;
      return Date.parse(`${value}T00:00:00Z`);
    };
    const startTime = toTimestamp(start);
    let endTime = toTimestamp(end);
    if (!Number.isFinite(startTime)) return 0;
    if (!Number.isFinite(endTime)) endTime = startTime;
    if (endTime < startTime) return 1;
    const diff = Math.floor((endTime - startTime) / (24 * 60 * 60 * 1000));
    return diff + 1;
  };
  const shootingDayEntries = (() => {
    if (!info) return [];
    if (Array.isArray(info.shootingDays)) return info.shootingDays;
    if (typeof info.shootingDays === 'string') {
      return info.shootingDays
        .split('\n')
        .map(value => value.trim())
        .filter(Boolean);
    }
    return [];
  })();
  const totalShootingDays = shootingDayEntries.reduce(
    (total, entry) => total + parseShootingPeriodDays(entry),
    0,
  );
  const rawDistanceSelection = info && typeof info.distanceSelection === 'string'
      ? info.distanceSelection.trim()
      : '';
  const normalizedDistanceSelection = normalizeAutoGearTriggerValue(rawDistanceSelection);
  if (!scenarios.length) {
    const hasRuleWithoutScenario = autoGearRules.some(rule => {
      const scenarioList = Array.isArray(rule.scenarios)
          ? rule.scenarios.filter(Boolean)
          : [];
            return scenarioList.length === 0;
        });
        if (!hasRuleWithoutScenario) return tableHtml;
    }
    const touchesMatteboxCategory = (rule) => {
        if (!rule || typeof rule !== 'object') return false;
        const lists = [];
        if (Array.isArray(rule.add)) lists.push(rule.add);
        if (Array.isArray(rule.remove)) lists.push(rule.remove);
        return lists.some(entries => entries.some(entry => {
            if (!entry || typeof entry !== 'object') return false;
            const category = typeof entry.category === 'string' ? entry.category.trim().toLowerCase() : '';
            return category === 'matte box + filter';
        }));
    };

    const triggeredEntries = [];
    autoGearRules.forEach(rule => {
        if (!rule) return;
        let multiplier = 1;
        if (rule.always) {
            multiplier = 1;
        } else {
            const scenarioOutcome = computeAutoGearScenarioOutcome(rule, normalizedScenarioSet);
            if (!scenarioOutcome.active) return;
            multiplier = scenarioOutcome.multiplier || 1;
        }
        const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
        if (matteboxList.length) {
          const normalizedTargets = matteboxList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedMattebox) return false;
          if (!normalizedTargets.includes(normalizedMattebox)) return false;
        }
        const cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
        const cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
        if (cameraList.length) {
          const normalizedTargets = cameraList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedCameraSelection) return false;
          if (!normalizedTargets.includes(normalizedCameraSelection)) return false;
        }
        if (cameraWeightCondition) {
          if (!Number.isFinite(selectedCameraWeight)) return false;
          if (!evaluateAutoGearCameraWeightCondition(cameraWeightCondition, selectedCameraWeight)) {
            return false;
          }
        }
        const monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
        if (monitorList.length) {
          const normalizedTargets = monitorList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedMonitorSelection) return false;
          if (!normalizedTargets.includes(normalizedMonitorSelection)) return false;
        }
        const tripodHeadList = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.filter(Boolean) : [];
        if (tripodHeadList.length) {
          const normalizedTargets = tripodHeadList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTripodHeadBrand) return false;
          if (!normalizedTargets.includes(normalizedTripodHeadBrand)) return false;
        }
        const tripodBowlList = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.filter(Boolean) : [];
        if (tripodBowlList.length) {
          const normalizedTargets = tripodBowlList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTripodBowl) return false;
          if (!normalizedTargets.includes(normalizedTripodBowl)) return false;
        }
        const tripodTypesList = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.filter(Boolean) : [];
        if (tripodTypesList.length) {
          const normalizedTargets = tripodTypesList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTargets.every(target => normalizedTripodTypesSet.has(target))) return false;
        }
        const tripodSpreaderList = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.filter(Boolean) : [];
        if (tripodSpreaderList.length) {
          const normalizedTargets = tripodSpreaderList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTripodSpreader) return false;
          if (!normalizedTargets.includes(normalizedTripodSpreader)) return false;
        }
        const crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent.filter(Boolean) : [];
        if (crewPresentList.length) {
          const normalizedTargets = crewPresentList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTargets.every(target => crewRoleSet.has(target))) return false;
        }
        const crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.filter(Boolean) : [];
        if (crewAbsentList.length) {
          const normalizedTargets = crewAbsentList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (normalizedTargets.some(target => crewRoleSet.has(target))) return false;
        }
        const wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
        if (wirelessList.length) {
          const normalizedTargets = wirelessList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedWirelessSelection) return false;
          if (!normalizedTargets.includes(normalizedWirelessSelection)) return false;
        }
        const motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
        if (motorsList.length) {
          const normalizedTargets = motorsList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          const requiresAnyMotor = normalizedTargets.includes(AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK);
          const specificTargets = normalizedTargets.filter(target => target !== AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK);
          if (requiresAnyMotor && normalizedMotorSet.size === 0) return false;
          if (specificTargets.length && !specificTargets.every(target => normalizedMotorSet.has(target))) return false;
        }
        const controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
        if (controllersList.length) {
          const normalizedTargets = controllersList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTargets.every(target => normalizedControllerSet.has(target))) return false;
        }
        const distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
        if (distanceList.length) {
          const normalizedTargets = distanceList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedDistanceSelection) return false;
          if (!normalizedTargets.includes(normalizedDistanceSelection)) return false;
        }
        const shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
        if (shootingCondition && Number.isFinite(shootingCondition.value) && shootingCondition.value > 0) {
          if (shootingCondition.mode === 'minimum') {
            if (totalShootingDays < shootingCondition.value) return false;
          } else if (shootingCondition.mode === 'maximum') {
            if (totalShootingDays > shootingCondition.value) return false;
          } else if (shootingCondition.mode === 'every') {
            const interval = shootingCondition.value;
            const occurrences = interval > 0 ? Math.floor(totalShootingDays / interval) : 0;
            if (occurrences < 1) return false;
            multiplier *= occurrences;
          }
        }
        const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
        if (cameraHandleList.length) {
          const normalizedTargets = cameraHandleList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.every(target => cameraHandleSet.has(target))) return false;
        }
        const viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean) : [];
        if (viewfinderList.length) {
            const normalizedTargets = viewfinderList
                .map(value => normalizeAutoGearTriggerValue(value))
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedViewfinderExtension) return false;
            if (!normalizedTargets.includes(normalizedViewfinderExtension)) return false;
        }
        const deliveryList = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.filter(Boolean) : [];
        if (deliveryList.length) {
          const normalizedTargets = deliveryList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedDeliveryResolution) return false;
          if (!normalizedTargets.includes(normalizedDeliveryResolution)) return false;
        }
        const videoDistList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean) : [];
        if (videoDistList.length) {
            const normalizedTargets = videoDistList
                .map(value => normalizeVideoDistributionOptionValue(value))
                .map(value => (value === '__none__' ? '' : normalizeAutoGearTriggerValue(value)))
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.every(target => videoDistributionSet.has(target))) return false;
        }
        triggeredEntries.push({ rule, multiplier });
    });
    if (!triggeredEntries.length) return tableHtml;

    if (normalizedMattebox) {
        const filtered = triggeredEntries.filter(({ rule }) => {
            if (!touchesMatteboxCategory(rule)) return true;
            const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
            if (!matteboxList.length) return true;
            const normalizedTargets = matteboxList
                .map(normalizeAutoGearTriggerValue)
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            return normalizedTargets.includes(normalizedMattebox);
        });
        if (!filtered.length) return tableHtml;
        triggeredEntries.length = 0;
        filtered.forEach(entry => triggeredEntries.push(entry));
    }
    const container = document.createElement('div');
    container.innerHTML = tableHtml;
    const table = container.querySelector('.gear-table');
    if (!table) return tableHtml;
    let monitorRiggingTriggered = false;
    triggeredEntries.forEach(({ rule, multiplier }) => {
        const effectiveMultiplier = Math.max(1, Math.round(Number.isFinite(multiplier) ? multiplier : 1));
        rule.remove.forEach(item => {
            let remaining = normalizeAutoGearQuantity(item.quantity) * effectiveMultiplier;
            if (remaining <= 0) return;
            const primaryCell = findAutoGearCategoryCell(table, item.category);
            if (primaryCell) {
                remaining = removeAutoGearItem(primaryCell, item, remaining);
            }
            if (remaining > 0) {
                const gearCells = Array.from(table.querySelectorAll('tbody.category-group tr:not(.category-row) td'));
                for (const cell of gearCells) {
                    if (cell === primaryCell) continue;
                    remaining = removeAutoGearItem(cell, item, remaining);
                    if (remaining <= 0) break;
                }
            }
        });
        const baseAdditions = Array.isArray(rule.add) ? rule.add.slice() : [];
        let additions = baseAdditions;
        if (shouldAugmentClampOnRule(rule)) {
            const clampBackings = buildClampOnBackingAdditionsFromInfo(info);
            if (clampBackings.length) {
                additions = mergeAutoGearAdditions(baseAdditions, clampBackings);
            }
        }
        additions.forEach(item => {
            const quantity = normalizeAutoGearQuantity(item.quantity) * effectiveMultiplier;
            const scaledItem = quantity === normalizeAutoGearQuantity(item.quantity)
                ? item
                : { ...item, quantity };
            const cell = ensureAutoGearCategory(table, item.category);
            if (cell) addAutoGearItem(cell, scaledItem, rule);
            if (!monitorRiggingTriggered && isOnboardMonitorRiggingItemEntry(item)) {
                monitorRiggingTriggered = true;
            }
        });
    });
    if (monitorRiggingTriggered) {
        ensureOnboardMonitorRiggingAutoGearHighlight(table);
    }
    return container.innerHTML;
}

function formatPhoneHref(phone) {
  if (typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  if (!trimmed) return '';
  const sanitized = trimmed.replace(/[^0-9+*#;,]/g, '');
  return sanitized ? sanitized : '';
}

function formatEmailHref(email) {
  if (typeof email !== 'string') return '';
  const trimmed = email.trim();
  if (!trimmed || !trimmed.includes('@')) return '';
  const normalized = trimmed.replace(/\s+/g, '');
  if (!normalized || !normalized.includes('@')) return '';
  const encoded = encodeURIComponent(normalized);
  return encoded ? encoded.replace(/%40/g, '@') : '';
}

function formatRequirementValue(rawValue) {
  if (rawValue && typeof rawValue === 'object') {
    if (typeof rawValue.__html === 'string' && rawValue.__html) {
      return rawValue.__html;
    }
    if (Array.isArray(rawValue) && rawValue.length) {
      const html = rawValue
        .map(item => (typeof item === 'string' ? escapeHtml(item) : escapeHtml(String(item || ''))))
        .join('<br>');
      if (html) return html;
    }
    if (typeof rawValue.text === 'string' && rawValue.text) {
      return escapeHtml(rawValue.text).replace(/\n/g, '<br>');
    }
  }
  const value = typeof rawValue === 'string'
    ? rawValue
    : rawValue == null
      ? ''
      : String(rawValue);
  return escapeHtml(value).replace(/\n/g, '<br>');
}

function gearListGenerateHtmlImpl(info = {}) {
    const getText = sel => sel && sel.options && sel.selectedIndex >= 0
        ? sel.options[sel.selectedIndex].text.trim()
        : '';
    const selectedNames = {
        camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
        monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
        video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
        motors: motorSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        controllers: controllerSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
        cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
        battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
    };
    const hasMotor = selectedNames.motors.length > 0;
    const videoDistPrefs = info.videoDistribution
        ? info.videoDistribution.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const handheldPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
            return m ? { role: m[1], size: m[2] ? parseFloat(m[2]) : undefined } : null;
        })
        .filter(Boolean);
    const largeMonitorPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
            return m ? { role: m[1] } : null;
        })
        .filter(Boolean);
    if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
        selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
    } else {
        selectedNames.viewfinder = "";
    }
    const { cameraSupport: cameraSupportAcc, chargers: chargersAcc, fizCables: fizCableAcc, misc: miscAcc, monitoringSupport: monitoringSupportAcc, rigging: riggingAcc } = collectAccessories({ hasMotor, videoDistPrefs });
    const cagesDb = devices.accessories?.cages || {};
    const compatibleCages = [];
    if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
        for (const [name, cage] of Object.entries(cagesDb)) {
            if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
                compatibleCages.push(name);
            }
        }
    }
    const supportAccNoCages = cameraSupportAcc.filter(item => !compatibleCages.includes(item));
    if (selectedNames.viewfinder) {
        const normalizedSupport = new Set(supportAccNoCages.map(item => normalizeGearNameForComparison(item)));
        const normalizedViewfinder = normalizeGearNameForComparison(selectedNames.viewfinder);
        if (!normalizedSupport.has(normalizedViewfinder)) {
            supportAccNoCages.push(selectedNames.viewfinder);
        }
    }
    const scenarios = info.requiredScenarios
        ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const hasSeededScenarioRules = hasSeededAutoGearDefaults();
    const allowLegacyScenarioGear = autoGearRules.length === 0 && !hasSeededScenarioRules;
    const isScenarioActive = scenario => allowLegacyScenarioGear && scenarios.includes(scenario);
    const isAnyScenarioActive = list => allowLegacyScenarioGear && list.some(value => scenarios.includes(value));
    const hasGimbal = isScenarioActive('Gimbal');
    if (isAnyScenarioActive(['Trinity', 'Steadicam'])) {
        for (let i = 0; i < 2; i++) {
            riggingAcc.push('D-Tap Splitter');
        }
        riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
        riggingAcc.push('D-Tap Extension 50 cm (Spare)');
    }
    const handleSelections = info.cameraHandle
        ? info.cameraHandle.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const viewfinderExtSelections = info.viewfinderExtension
        ? info.viewfinderExtension.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const monitoringSettings = [
        ...(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(s => s.trim()) : []),
        ...(info.frameGuides ? info.frameGuides.split(',').map(s => s.trim()) : []),
        ...(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(s => s.trim()) : []),
        ...(info.monitoringSettings ? info.monitoringSettings.split(',').map(s => s.trim()) : []),
    ].filter(Boolean);
    const selectedLensNames = info.lenses
        ? info.lenses.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const maxLensFront = selectedLensNames.reduce((max, name) => {
        const lens = devices.lenses && devices.lenses[name];
        return Math.max(max, lens && lens.frontDiameterMm || 0);
    }, 0);
    const parsedFilters = parseFilterTokens(info.filter);
    const filterTypes = parsedFilters.map(f => f.type);
    const needsSwingAway = filterTypes.some(t => t === 'ND Grad HE' || t === 'ND Grad SE');
    const filterEntries = buildFilterGearEntries(parsedFilters);
    let filterSelections = collectFilterAccessories(parsedFilters);
    if (filterEntries.length && filterSelections.length) {
        const filterNames = new Set(
            filterEntries.map(entry => normalizeGearNameForComparison(entry.gearName))
        );
        filterSelections = filterSelections.filter(item =>
            !filterNames.has(normalizeGearNameForComparison(item))
        );
    }
    const filterSelectHtml = buildFilterSelectHtml(parsedFilters, filterEntries);
    if (info.mattebox && !needsSwingAway) {
        const matteboxSelection = info.mattebox.toLowerCase();
        if (matteboxSelection.includes('clamp')) {
            const lensNames = info.lenses
                ? info.lenses.split(',').map(s => s.trim()).filter(Boolean)
                : [];
            const diameters = [...new Set(lensNames
                .map(n => devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm)
                .filter(Boolean))];
            diameters.forEach(d => filterSelections.push(`ARRI LMB 4x5 Clamp Adapter ${d}mm`));
        }
    }
    viewfinderExtSelections.forEach(vf => supportAccNoCages.push(vf));
    if (isAnyScenarioActive(['Rain Machine', 'Extreme rain'])) {
        filterSelections.push('Schulz Sprayoff Micro');
        filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
        riggingAcc.push('Fischer RS to D-Tap cable 0,5m');
        riggingAcc.push('Fischer RS to D-Tap cable 0,5m');
    }
    let gimbalSelectionsFinal = [];
    let selectedGimbal = '';
    if (hasGimbal) {
        const gimbalSelections = info.gimbal
            ? info.gimbal.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        const bigLens = maxLensFront > 95;
        if (gimbalSelections.length) {
            gimbalSelectionsFinal = gimbalSelections.map(g => (/Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g));
            if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
        } else {
            const cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
            const weight = cam && cam.weight_g;
            const isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
            selectedGimbal = bigLens ? 'DJI Ronin 2' : (isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2');
            gimbalSelectionsFinal = [selectedGimbal];
        }
        if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
            filterSelections.push('Tilta Mirage VND Kit');
            filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
            filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
            filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
        } else {
            filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
        }
    }
    const receiverLabels = [];
    handheldPrefs.forEach(p => receiverLabels.push(`${p.role} handheld`));
    largeMonitorPrefs.forEach(p => receiverLabels.push(`${p.role} 15-21"`));
    if (hasMotor) receiverLabels.push('Focus');
    const receiverCount = receiverLabels.length;
    if (selectedNames.video) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            const receivers = receiverCount || 1;
            for (let i = 0; i < receivers; i++) {
                monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
            }
        }
    }
    const addMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`
        );
    };
    handheldPrefs.forEach(p => addMonitorCables(`${p.role} handheld`));
    const addLargeMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`
        );
    };
    largeMonitorPrefs.forEach(p => addLargeMonitorCables(`${p.role} 15-21"`));
    const handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
    const addHandle = () => {
        if (!supportAccNoCages.includes(handleName)) {
            supportAccNoCages.push(handleName);
        }
    };
    if (isScenarioActive('Handheld') && isScenarioActive('Easyrig')) {
        addHandle();
    }
    if (handleSelections.includes('Hand Grips')) {
        addHandle();
    }
    if (handleSelections.includes('Handle Extension')) {
        supportAccNoCages.push('ARRI K2.0019797 HEX-3');
    }
    if (handleSelections.includes('L-Handle')) {
        supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
    }
    const projectInfo = { ...info };
    const projectFormTexts = texts[currentLang]?.projectForm || texts.en?.projectForm || {};
    const storageFallbackLabel = projectFormTexts.storageSummaryFallback
        || projectFormTexts.storageTypeLabel
        || 'Media';
    const crewRoleLabels = texts[currentLang]?.crewRoles || texts.en?.crewRoles || {};
    if (Array.isArray(info.people)) {
        const crewEntriesHtml = [];
        const crewEntriesText = [];
        info.people
            .filter(p => p.role && p.name)
            .forEach(p => {
                const roleLabel = crewRoleLabels[p.role] || p.role || '';
                const safeRole = escapeHtml(roleLabel);
                const nameValue = typeof p.name === 'string' ? p.name.trim() : (p.name ? String(p.name).trim() : '');
                if (!nameValue) {
                    return;
                }
                const safeName = escapeHtml(nameValue);
                const detailLinks = [];
                const detailText = [];
                const phoneValue = typeof p.phone === 'string' ? p.phone.trim() : (p.phone ? String(p.phone).trim() : '');
                if (phoneValue) {
                    const phoneHref = formatPhoneHref(phoneValue);
                    const safePhone = escapeHtml(phoneValue);
                    detailText.push(phoneValue);
                    if (phoneHref) {
                        detailLinks.push(`<a href="tel:${phoneHref}" class="req-contact-link">${safePhone}</a>`);
                    } else {
                        detailLinks.push(safePhone);
                    }
                }
                const emailValue = typeof p.email === 'string' ? p.email.trim() : (p.email ? String(p.email).trim() : '');
                if (emailValue) {
                    const emailHref = formatEmailHref(emailValue);
                    const safeEmail = escapeHtml(emailValue);
                    detailText.push(emailValue);
                    if (emailHref) {
                        detailLinks.push(`<a href="mailto:${emailHref}" class="req-contact-link">${safeEmail}</a>`);
                    } else {
                        detailLinks.push(safeEmail);
                    }
                }
                const linkDetails = detailLinks.length ? ` (${detailLinks.join(', ')})` : '';
                const plainDetails = detailText.length ? ` (${detailText.join(', ')})` : '';
                const rolePrefixHtml = roleLabel ? `${safeRole}: ` : '';
                const rolePrefixText = roleLabel ? `${roleLabel}: ` : '';
                crewEntriesHtml.push(`<span class="crew-entry">${rolePrefixHtml}${safeName}${linkDetails}</span>`);
                crewEntriesText.push(`${rolePrefixText}${nameValue}${plainDetails}`);
            });
        if (crewEntriesHtml.length) {
            projectInfo.crew = {
                __html: crewEntriesHtml.join('<br>'),
                text: crewEntriesText.join('\n')
            };
        }
    }
    delete projectInfo.people;
    if (Array.isArray(info.storageRequirements)) {
        const storageEntriesHtml = [];
        const storageEntriesText = [];
        info.storageRequirements.forEach(entry => {
            if (!entry || typeof entry !== 'object') return;
            const quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : null;
            const type = typeof entry.type === 'string' ? entry.type.trim() : '';
            const variant = typeof entry.variant === 'string' ? entry.variant.trim() : '';
            const notes = typeof entry.notes === 'string' ? entry.notes.trim() : '';
            if (!quantity && !type && !variant && !notes) return;
            let label = variant || type || '';
            if (variant && type && !variant.toLowerCase().includes(type.toLowerCase())) {
                label = `${variant} (${type})`;
            } else if (!label && type) {
                label = type;
            }
            if (notes) {
                label = label ? `${label} – ${notes}` : notes;
            }
            const display = label || storageFallbackLabel;
            const prefix = quantity ? `${quantity}x ` : '';
            const text = `${prefix}${display}`.trim();
            storageEntriesText.push(text);
            storageEntriesHtml.push(`<span class="storage-entry">${escapeHtml(text)}</span>`);
        });
        if (storageEntriesHtml.length) {
            projectInfo.storageRequirements = {
                __html: storageEntriesHtml.join('<br>'),
                text: storageEntriesText.join('\n')
            };
        }
    }
    if (Array.isArray(info.prepDays)) {
        projectInfo.prepDays = info.prepDays.join('\n');
    }
    if (Array.isArray(info.shootingDays)) {
        projectInfo.shootingDays = info.shootingDays.join('\n');
    }
    if (monitoringSettings.length) {
        projectInfo.monitoringSupport = monitoringSettings.join(', ');
    }
    delete projectInfo.monitoringSettings;
    delete projectInfo.viewfinderSettings;
    delete projectInfo.frameGuides;
    delete projectInfo.aspectMaskOpacity;
    const projectTitleSource = getCurrentProjectName() || info.projectName || '';
    const projectTitle = escapeHtml(projectTitleSource);
    const projectLabels = texts[currentLang]?.projectFields || texts.en?.projectFields || {};
    const excludedFields = new Set([
        'cameraHandle',
        'viewfinderExtension',
        'mattebox',
        'videoDistribution',
        'monitoringConfiguration',
        'focusMonitor',
        'tripodHeadBrand',
        'tripodBowl',
        'tripodTypes',
        'tripodSpreader',
        'sliderBowl',
        'easyrig',
        'lenses',
        'viewfinderSettings',
        'frameGuides',
        'aspectMaskOpacity',
        'filter',
        'viewfinderEyeLeatherColor',
        'directorMonitor',
        'dopMonitor',
        'gafferMonitor',
        'directorMonitor15',
        'comboMonitor15',
        'dopMonitor15',
        'proGaffColor1',
        'proGaffWidth1',
        'proGaffColor2',
        'proGaffWidth2'
    ]);
    const infoEntries = Object.entries(projectInfo)
        .filter(([k, v]) =>
            v &&
            k !== 'projectName' &&
            !excludedFields.has(k) &&
            !k.endsWith('Manual')
        );
    const boxesHtml = infoEntries.length ? '<div class="requirements-grid">' +
        infoEntries.map(([k, v]) => {
            const value = formatRequirementValue(v);
            const label = projectLabels[k] || k;
            const iconHtml = iconMarkup(projectFieldIcons[k], {
                className: 'req-icon',
                size: 'var(--req-icon-size)'
            });
            return `<div class="requirement-box" data-field="${k}">${iconHtml}<span class="req-label">${escapeHtml(label)}</span><span class="req-value">${value}</span></div>`;
        }).join('') + '</div>' : '';
    const requirementsHeading = projectFormTexts.heading || 'Project Requirements';
    const infoHtml = infoEntries.length ? `<h3>${escapeHtml(requirementsHeading)}</h3>${boxesHtml}` : '';
    const formatItems = arr => {
        const counts = {};
        arr.filter(Boolean).map(addArriKNumber).forEach(rawItem => {
            const item = rawItem.trim();
            const quantityMatch = item.match(/^(\d+)x\s+(.*)$/);
            const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : 1;
            const namePart = quantityMatch ? quantityMatch[2] : item;
            const match = namePart.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : namePart.trim();
            const ctx = match && match[2] ? match[2].trim() : '';
            if (!counts[base]) {
                counts[base] = { total: 0, ctxCounts: {} };
            }
            counts[base].total += Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
            const current = counts[base].ctxCounts[ctx] || 0;
            counts[base].ctxCounts[ctx] = current + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
        });
        return Object.entries(counts)
            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
            .map(([base, { total, ctxCounts }]) => {
                const ctxKeys = Object.keys(ctxCounts);
                const hasContext = ctxKeys.some(c => c);
                let ctxParts = [];
                if (hasContext) {
                    if (base === 'sand bag') {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else if (base.startsWith('Bebob ')) {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .map(([c, count]) => {
                                const qtyMatch = c.match(/^(\d+)x\s+(.*)$/i);
                                if (qtyMatch) {
                                    const [, qty, label] = qtyMatch;
                                    const qtyNum = parseInt(qty, 10);
                                    if (Number.isFinite(qtyNum) && qtyNum > 0) {
                                        return [label.trim(), count * qtyNum];
                                    }
                                }
                                return [c, count];
                            })
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        const spareCount = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() === 'spare')
                            .reduce((sum, [, count]) => sum + count, 0);
                        if (spareCount > 0) {
                            ctxParts.push(`${spareCount}x Spare`);
                        } else if (base === 'D-Tap Extension 50 cm') {
                            const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                            const remaining = total - usedCount;
                            if (remaining > 0) ctxParts.push(`${remaining}x Spare`);
                        }
                    }
                }
                const ctxStr = ctxParts.length ? ` (${ctxParts.join(', ')})` : '';
                const translatedBase = gearItemTranslations[currentLang]?.[base] || base;
                const displayName = `${translatedBase}${ctxStr}`;
                const dataName = `${base}${ctxStr}`;
                return `<span class="gear-item" data-gear-name="${escapeHtml(dataName)}">${total}x ${escapeHtml(displayName)}</span>`;
            })
            .join('<br>');
    };
    const ensureItems = (arr, categoryPath) => {
        if (typeof registerDevice !== 'function') return;
        const entries = {};
        arr.filter(Boolean).forEach(item => {
            const match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : item.trim();
            entries[base] = entries[base] || {};
        });
        if (Object.keys(entries).length) {
            registerDevice(categoryPath, entries);
        }
    };
    const categoryGroups = [];
    const addRow = (cat, items) => {
        categoryGroups.push(
            `<tbody class="category-group"><tr class="category-row"><td>${cat}</td></tr><tr><td>${items}</td></tr></tbody>`
        );
    };
    addRow('Camera', formatItems([selectedNames.camera]));
    const cameraSupportText = formatItems(supportAccNoCages);
    let cageSelectHtml = '';
    if (compatibleCages.length) {
        const options = compatibleCages.map(c => `<option value="${escapeHtml(c)}"${c === selectedNames.cage ? ' selected' : ''}>${escapeHtml(addArriKNumber(c))}</option>`).join('');
        cageSelectHtml = `<span class="cage-select-wrapper"><span>1x</span><select id="gearListCage">${options}</select></span>`;
    }
    addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
    const storageGearListItems = Array.isArray(info.storageRequirements)
        ? info.storageRequirements
            .map(entry => {
                if (!entry || typeof entry !== 'object') return '';
                const quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : null;
                const type = typeof entry.type === 'string' ? entry.type.trim() : '';
                const variant = typeof entry.variant === 'string' ? entry.variant.trim() : '';
                const notes = typeof entry.notes === 'string' ? entry.notes.trim() : '';
                if (!quantity && !type && !variant && !notes) return '';
                const contextParts = [];
                const normalizedType = type.toLowerCase();
                let display = variant || '';
                if (display) {
                    const normalizedVariant = display.toLowerCase();
                    if (normalizedType && !normalizedVariant.includes(normalizedType) && type) {
                        contextParts.push(type);
                    }
                } else if (type) {
                    display = type;
                }
                if (!display) {
                    display = storageFallbackLabel;
                }
                if (notes) {
                    contextParts.push(notes);
                }
                const context = contextParts.length ? ` (${contextParts.join(', ')})` : '';
                const prefix = quantity ? `${quantity}x ` : '';
                return `${prefix}${display}${context}`.trim();
            })
            .filter(Boolean)
        : [];
    let mediaItems = '';
    if (storageGearListItems.length) {
        mediaItems = formatItems(storageGearListItems);
    } else {
        const cam = devices && devices.cameras && selectedNames.camera ? devices.cameras[selectedNames.camera] : null;
        if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
            const sizeMap = {
                'CFexpress Type A': '320GB',
                'CFast 2.0': '512GB',
                'CFexpress Type B': '512GB',
                'Codex Compact Drive': '1TB',
                'AXS Memory A-Series slot': '1TB',
                'SD': '128GB',
                'SD Card': '128GB',
                'SDXC': '128GB',
                'XQD Card': '120GB',
                'RED MINI-MAG': '512GB',
                'REDMAG 1.8" SSD': '512GB',
                'Blackmagic Media Module': '8TB',
                'DJI PROSSD': '1TB',
                'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
                'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
                'USB-C to external SSD/HDD': '1TB'
            };
            mediaItems = cam.recordingMedia
                .slice(0, 1)
                .map(m => {
                    const type = m && m.type ? m.type : '';
                    if (!type) return '';
                    let size = '';
                    if (m.notes) {
                        const match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
                        if (match) size = match[1].toUpperCase();
                    }
                    if (!size) size = sizeMap[type] || '512GB';
                    return `4x ${escapeHtml(size)} ${escapeHtml(type)}<br>2x ${escapeHtml(type)} reader with USB-C`;
                })
                .filter(Boolean)
                .join('<br>');
        }
    }
    addRow('Media', mediaItems);
    const lensDisplayNames = selectedLensNames.map(name => {
        const lens = devices.lenses && devices.lenses[name];
        const base = addArriKNumber(name);
        if (!lens) return base;
        const attrs = [];
        if (lens.weight_g) attrs.push(`${lens.weight_g}g`);
        if (lens.clampOn) {
            if (lens.frontDiameterMm) attrs.push(`${lens.frontDiameterMm}mm clamp-on`);
            else attrs.push('clamp-on');
        } else if (lens.clampOn === false) {
            attrs.push('no clamp-on');
        }
        const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
        if (minFocus) attrs.push(`${minFocus}m min focus`);
        return attrs.length ? `${base} (${attrs.join(', ')})` : base;
    });
    addRow('Lens', formatItems(lensDisplayNames));
    const parseRodTypes = raw => {
        if (!raw && raw !== 0) return [];
        const values = Array.isArray(raw) ? raw : [raw];
        const rodSet = new Set();
        values.forEach(value => {
            const text = (value ?? '').toString().toLowerCase();
            if (!text) return;
            if (/\b15\s*mm\b/.test(text)) rodSet.add('15mm');
            if (/\b19\s*mm\b/.test(text)) rodSet.add('19mm');
        });
        const order = ['15mm', '19mm'];
        return order.filter(type => rodSet.has(type));
    };
    const lensSupportItems = [];
    const addedRodPairs = new Set();
    selectedLensNames.forEach(name => {
        const lens = devices.lenses && devices.lenses[name];
        if (!lens) return;
        const normalizedRodTypes = parseRodTypes(lens.rodStandard);
        const rodType = normalizedRodTypes[0] || (lens.rodStandard ? lens.rodStandard : '15mm');
        const baseRodType = normalizedRodTypes[0] || (rodType === '19mm' ? '19mm' : '15mm');
        const rodLength = lens.rodLengthCm || (baseRodType === '19mm' ? 45 : 30);
        const rodKey = `${baseRodType}-${rodLength}`;
        if (!addedRodPairs.has(rodKey)) {
            lensSupportItems.push(`${baseRodType} rods ${rodLength}cm`);
            addedRodPairs.add(rodKey);
        }
        if (lens.needsLensSupport) {
            lensSupportItems.push(`${baseRodType} lens support`);
        }
    });
    addRow('Lens Support', formatItems(lensSupportItems));
    addRow('Matte box + filter', [filterSelectHtml, formatItems(filterSelections)].filter(Boolean).join('<br>'));
    const motorItems = [];
    const clmSpareAdded = { clm3: false, clm4: false, clm5: false };
    selectedNames.motors.forEach(name => {
        const lower = name.toLowerCase();
        if (/cforce\s*mini\s*rf|cforce\s*rf/.test(lower)) {
            motorItems.push('ARRI KK.0040345 CFORCE MINI RF Basic Set 2');
        } else if (/cforce\s*mini/.test(lower) && !/rf/.test(lower)) {
            motorItems.push('ARRI KK.0040344 Cforce Mini Basic Set 2');
        } else if (/cforce\s*plus/.test(lower)) {
            motorItems.push('Arri KK.0008824 cforce plus Basic Set');
            motorItems.push('ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
        } else if (/clm-3/.test(lower)) {
            motorItems.push('Arri KK.0005854 Controlled Lens Motor CLM-3 Basic Set');
            if (!clmSpareAdded.clm3) {
                motorItems.push('Arri K2.65145.0, Cable CLM-3 (7p) - CLM/FIZ (12p) (0,8m/2.6ft) (spare)');
                clmSpareAdded.clm3 = true;
            }
        } else if (/clm-4/.test(lower)) {
            motorItems.push('ARRI Controlled Lens Motor CLM-4, Basic Kit (KK.0005855)');
            if (!clmSpareAdded.clm4) {
                motorItems.push('Arri K2.72099.0 CLM-4 Motor Cable (spare)');
                clmSpareAdded.clm4 = true;
            }
        } else if (/clm-5/.test(lower)) {
            motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set');
            if (!clmSpareAdded.clm5) {
                motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set (spare)');
                clmSpareAdded.clm5 = true;
            }
        } else {
            motorItems.push(name);
        }
    });
    const distanceItems = [];
    const distanceName = selectedNames.distance;
    if (distanceName) {
        const lowerName = distanceName.toLowerCase();
        if (lowerName === 'udm-1 + lcube') {
            distanceItems.push('Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
            const hasRiaController = selectedNames.controllers
                .some(ctrl => /ria-1/i.test(ctrl));
            const isAlexa35 = /alexa 35/i.test(selectedNames.camera || '');
            if (!hasRiaController && !isAlexa35) {
                distanceItems.push('Arri KK.0009001 LCUBE CUB-1 Basic Set');
            }
        } else {
            distanceItems.push(distanceName);
        }
    }
    addRow('LDS (FIZ)', formatItems([
        ...motorItems,
        ...selectedNames.controllers,
        ...distanceItems,
        ...fizCableAcc
    ]));
    let batteryItems = '';
    if (selectedNames.battery) {
        let count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
        if (!count || isNaN(count)) count = 1;
        const safeBatt = escapeHtml(addArriKNumber(selectedNames.battery));
        batteryItems = `${count}x ${safeBatt}`;
        const swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
        if (swapName) {
            batteryItems += `<br>1x ${escapeHtml(swapName)}`;
        }
    }
    addRow('Camera Batteries', batteryItems);
    let monitoringItems = '';
    const monitorSizes = [];
    if (selectedNames.monitor) {
        const size = devices?.monitors?.[selectedNames.monitor]?.screenSizeInches;
        if (size) monitorSizes.push(size);
        const sizeHtml = size ? `${size}&quot; - ` : '';
        monitoringItems += (monitoringItems ? '<br>' : '') + `1x <strong>Onboard Monitor</strong> - ${sizeHtml}${escapeHtml(addArriKNumber(selectedNames.monitor))} - incl. Sunhood`;
    }
    handheldPrefs.forEach(({ role, size }) => {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const infoKey = role === 'DoP' ? 'dopMonitor' : `${role.toLowerCase()}Monitor`;
        const manualFlag = !!info[`${infoKey}Manual`];
        const infoValue = typeof info[infoKey] === 'string' ? info[infoKey].trim() : '';
        const autoDefault = getAutoGearMonitorDefault('handheld7');
        let candidate = '';
        if (manualFlag && infoValue) {
            candidate = infoValue;
        } else if (autoDefault) {
            candidate = autoDefault;
        } else if (infoValue) {
            candidate = infoValue;
        }
        const lowerNames = names.map(n => n.toLowerCase());
        let defaultName = '';
        if (candidate) {
            const matchIndex = lowerNames.indexOf(candidate.toLowerCase());
            if (matchIndex >= 0) {
                defaultName = names[matchIndex];
            }
        }
        if (!defaultName) {
            if (!manualFlag && size) {
                const sized = names.find(n => monitorsDb[n].screenSizeInches === size);
                if (size === 7 && names.includes('SmallHD Ultra 7')) {
                    defaultName = 'SmallHD Ultra 7';
                } else if (sized) {
                    defaultName = sized;
                }
            }
            if (!defaultName) {
                if (!manualFlag && !candidate && names.includes('SmallHD Ultra 7')) {
                    defaultName = 'SmallHD Ultra 7';
                } else if (names.length) {
                    defaultName = names[0];
                } else if (candidate) {
                    defaultName = candidate;
                }
            }
        }
        const optionValues = names.slice();
        if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
            optionValues.unshift(candidate);
        }
        if (defaultName && !optionValues.some(value => value.toLowerCase() === defaultName.toLowerCase())) {
            optionValues.unshift(defaultName);
        }
        const seenOptions = new Set();
        const opts = optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seenOptions.has(key)) return false;
                seenOptions.add(key);
                return true;
            })
            .map(value => {
                const isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const labelRole = role.replace(/s$/, '');
        const resolvedName = Array.from(seenOptions.values()).find(value => value === (defaultName || '').toLowerCase())
            ? optionValues.find(value => value && value.toLowerCase() === (defaultName || '').toLowerCase())
            : defaultName;
        const selectedMonitor = resolvedName && monitorsDb[resolvedName]
            ? monitorsDb[resolvedName]
            : monitorsDb[defaultName] || monitorsDb[candidate] || null;
        const selectedSize = selectedMonitor?.screenSizeInches || '';
        monitoringItems += (monitoringItems ? '<br>' : '')
            + `1x <strong>${labelRole} Handheld Monitor</strong> - <span id="monitorSize${idSuffix}">${selectedSize}&quot;</span> - `
            + `<select id="gearList${idSuffix}Monitor" data-auto-gear-manual="${manualFlag ? 'true' : 'false'}">${opts}</select> `
            + 'incl. Directors cage, shoulder strap, sunhood, rigging for teradeks';
        if (selectedSize) monitorSizes.push(selectedSize);
    });
    largeMonitorPrefs.forEach(({ role }) => {
        const dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
        const names = Object.keys(dirDb).filter(n => n !== 'None').sort(localeSort);
        const infoKey = role === 'DoP' ? 'dopMonitor15' : role === 'Combo' ? 'comboMonitor15' : 'directorMonitor15';
        const manualFlag = !!info[`${infoKey}Manual`];
        const infoValue = typeof info[infoKey] === 'string' ? info[infoKey].trim() : '';
        const defaultKey = role === 'Combo' ? 'combo15' : 'director15';
        const autoDefault = getAutoGearMonitorDefault(defaultKey);
        let candidate = '';
        if (manualFlag && infoValue) {
            candidate = infoValue;
        } else if (autoDefault) {
            candidate = autoDefault;
        } else if (infoValue) {
            candidate = infoValue;
        }
        const lowerNames = names.map(n => n.toLowerCase());
        let defaultName = '';
        if (candidate) {
            const matchIndex = lowerNames.indexOf(candidate.toLowerCase());
            if (matchIndex >= 0) {
                defaultName = names[matchIndex];
            }
        }
        if (!defaultName) {
            if (names.includes('SmallHD Cine 24" 4K High-Bright Monitor')) {
                defaultName = 'SmallHD Cine 24" 4K High-Bright Monitor';
            } else if (names.length) {
                defaultName = names[0];
            } else if (candidate) {
                defaultName = candidate;
            }
        }
        const optionValues = names.slice();
        if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
            optionValues.unshift(candidate);
        }
        if (defaultName && !optionValues.some(value => value.toLowerCase() === defaultName.toLowerCase())) {
            optionValues.unshift(defaultName);
        }
        const seenOptions = new Set();
        const opts = optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seenOptions.has(key)) return false;
                seenOptions.add(key);
                return true;
            })
            .map(value => {
                const isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const resolvedName = Array.from(seenOptions.values()).find(value => value === (defaultName || '').toLowerCase())
            ? optionValues.find(value => value && value.toLowerCase() === (defaultName || '').toLowerCase())
            : defaultName;
        const size = resolvedName && dirDb[resolvedName]?.screenSizeInches
            ? dirDb[resolvedName].screenSizeInches
            : (dirDb[defaultName]?.screenSizeInches || dirDb[candidate]?.screenSizeInches || '');
        monitoringItems += (monitoringItems ? '<br>' : '')
            + `1x <strong>${role} Monitor</strong> - <span id="monitorSize${idSuffix}15">${size}&quot;</span> - `
            + `<select id="gearList${idSuffix}Monitor15" data-auto-gear-manual="${manualFlag ? 'true' : 'false'}">${opts}</select> `
            + 'incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)';
        if (size) monitorSizes.push(size);
    });
    if (hasMotor) {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const manualFlag = !!info.focusMonitorManual;
        const infoValue = typeof info.focusMonitor === 'string' ? info.focusMonitor.trim() : '';
        const autoDefault = getAutoGearMonitorDefault('focus');
        let candidate = '';
        if (manualFlag && infoValue) {
            candidate = infoValue;
        } else if (autoDefault) {
            candidate = autoDefault;
        } else if (infoValue) {
            candidate = infoValue;
        }
        const lowerNames = names.map(n => n.toLowerCase());
        let defaultName = '';
        if (candidate) {
            const matchIndex = lowerNames.indexOf(candidate.toLowerCase());
            if (matchIndex >= 0) {
                defaultName = names[matchIndex];
            }
        }
        if (!defaultName) {
            if (names.includes('TV Logic F7HS')) {
                defaultName = 'TV Logic F7HS';
            } else if (names.length) {
                defaultName = names[0];
            } else if (candidate) {
                defaultName = candidate;
            }
        }
        const optionValues = names.slice();
        if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
            optionValues.unshift(candidate);
        }
        if (defaultName && !optionValues.some(value => value.toLowerCase() === defaultName.toLowerCase())) {
            optionValues.unshift(defaultName);
        }
        const seenOptions = new Set();
        const opts = optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seenOptions.has(key)) return false;
                seenOptions.add(key);
                return true;
            })
            .map(value => {
                const isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
        const resolvedName = Array.from(seenOptions.values()).find(value => value === (defaultName || '').toLowerCase())
            ? optionValues.find(value => value && value.toLowerCase() === (defaultName || '').toLowerCase())
            : defaultName;
        const selectedSize = resolvedName && monitorsDb[resolvedName]
            ? monitorsDb[resolvedName].screenSizeInches
            : (monitorsDb[defaultName]?.screenSizeInches || monitorsDb[candidate]?.screenSizeInches || '');
        monitoringItems += (monitoringItems ? '<br>' : '')
            + `1x <strong>Focus Monitor</strong> - <span id="monitorSizeFocus">${selectedSize}&quot;</span> - `
            + `<select id="gearListFocusMonitor" data-auto-gear-manual="${manualFlag ? 'true' : 'false'}">${opts}</select> `
            + 'incl Directors cage, shoulder strap, sunhood, rigging for teradeks';
        if (selectedSize) monitorSizes.push(selectedSize);
    }
    const monitoringGear = [];
    const wirelessSize = monitorSizes.includes(5) ? 5 : null;
    if (selectedNames.video) {
        const wirelessSizeHtml = wirelessSize ? `${wirelessSize}&quot; - ` : '';
        monitoringGear.push(`Wireless Transmitter - ${wirelessSizeHtml}${addArriKNumber(selectedNames.video)}`);
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            receiverLabels.forEach(label => {
                monitoringGear.push(`Wireless Receiver - ${wirelessSizeHtml}${addArriKNumber(rxName)} (${label})`);
            });
        }
    }
    if (monitoringGear.length) {
        const gearHtml = formatItems(monitoringGear)
            .replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>')
            .replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>')
            .replace(/&amp;quot;/g, '&quot;');
        monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
    }
    const monitorBatterySelections = (() => {
        const source = info.monitorBatteries;
        if (!source || typeof source !== 'object' || Array.isArray(source)) return {};
        const entries = {};
        Object.entries(source).forEach(([key, value]) => {
            if (typeof key !== 'string') return;
            if (typeof value !== 'string') return;
            const trimmed = value.trim();
            if (!trimmed) return;
            entries[key] = trimmed;
        });
        return entries;
    })();
    const batteryDatabase = devices && devices.batteries ? devices.batteries : {};
    const baseBatteryOptions = Object.keys(batteryDatabase)
        .filter(name => name && name !== 'None')
        .sort(localeSort);
    const buildBatteryOptions = (selectedValue) => {
        const normalizedSelected = typeof selectedValue === 'string' ? selectedValue.trim() : '';
        const optionValues = baseBatteryOptions.slice();
        if (normalizedSelected && !optionValues.some(value => value.toLowerCase() === normalizedSelected.toLowerCase())) {
            optionValues.unshift(normalizedSelected);
        }
        const seen = new Set();
        return optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .map(value => {
                const isSelected = normalizedSelected && value.toLowerCase() === normalizedSelected.toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
    };
    const monitoringBatteryItems = [];
    const bebob98 = Object.keys(batteryDatabase).find(n => /V98micro/i.test(n)) || 'Bebob V98micro';
    handheldPrefs.forEach((p, index) => {
        const roleNameRaw = typeof p.role === 'string' ? p.role : '';
        const roleName = roleNameRaw.trim();
        const contextLabel = `${roleName || 'Monitor'} handheld`;
        const key = `handheld:${roleName}:${index}`;
        const storedValue = monitorBatterySelections[key];
        const selectedValue = (typeof storedValue === 'string' && storedValue.trim()) || bebob98;
        if (!selectedValue) return;
        const roleId = (roleName || 'Monitor').replace(/[^A-Za-z0-9]/g, '') || 'Monitor';
        const selectId = `gearListMonitorBatteryHandheld${index}${roleId}`;
        const optionsHtml = buildBatteryOptions(selectedValue);
        const selectHtml = `<select id="${selectId}" data-monitor-battery-key="${escapeHtml(key)}" data-monitor-battery-type="handheld" data-monitor-battery-role="${escapeHtml(roleName)}">${optionsHtml}</select>`;
        monitoringBatteryItems.push(
            `<span class="gear-item" data-gear-name="${escapeHtml(`Monitoring Battery ${contextLabel}`)}">3x ${selectHtml} (${escapeHtml(contextLabel)})</span>`
        );
    });
    const bebob290 = Object.keys(batteryDatabase).find(n => /V290RM-Cine/i.test(n)) || 'Bebob V290RM-Cine';
    largeMonitorPrefs.forEach((p, index) => {
        const roleNameRaw = typeof p.role === 'string' ? p.role : '';
        const roleName = roleNameRaw.trim();
        const contextLabel = `${roleName || 'Monitor'} 15-21"`;
        const key = `large:${roleName}:${index}`;
        const storedValue = monitorBatterySelections[key];
        const selectedValue = (typeof storedValue === 'string' && storedValue.trim()) || bebob290;
        if (!selectedValue) return;
        const roleId = (roleName || 'Monitor').replace(/[^A-Za-z0-9]/g, '') || 'Monitor';
        const selectId = `gearListMonitorBatteryLarge${index}${roleId}`;
        const optionsHtml = buildBatteryOptions(selectedValue);
        const selectHtml = `<select id="${selectId}" data-monitor-battery-key="${escapeHtml(key)}" data-monitor-battery-type="large" data-monitor-battery-role="${escapeHtml(roleName)}">${optionsHtml}</select>`;
        monitoringBatteryItems.push(
            `<span class="gear-item" data-gear-name="${escapeHtml(`Monitoring Battery ${contextLabel}`)}">2x ${selectHtml} (${escapeHtml(contextLabel)})</span>`
        );
    });
    addRow('Monitoring Batteries', monitoringBatteryItems.length ? monitoringBatteryItems.join('<br>') : '');
    addRow('Chargers', formatItems(chargersAcc));
    addRow('Monitoring', monitoringItems);
    ensureItems(monitoringSupportAcc, 'accessories.monitoringSupport');
    const monitoringSupportHardware = formatItems(monitoringSupportAcc);
    const monitoringSupportItems = monitoringSupportHardware;
    addRow('Monitoring support', monitoringSupportItems);
    const cartsTransportationItems = [];
    ensureItems(cartsTransportationItems, 'accessories.carts');
    const gripItems = [];
    let needsStandardTripod = false;
    let sliderSelectHtml = '';
    let easyrigSelectHtml = '';
    handheldPrefs.forEach(p => {
        gripItems.push(`Avenger C-Stand Sliding Leg 20" (${p.role} handheld)`);
        gripItems.push(`Steelfingers Wheel C-Stand 3er Set (${p.role} handheld)`);
        gripItems.push(`Lite-Tite Swivel Aluminium Umbrella Adapter (${p.role} handheld)`);
        riggingAcc.push(`Spigot with male 3/8" and 1/4" (${p.role} handheld)`);
    });
    largeMonitorPrefs.forEach(p => {
        gripItems.push(`Matthews Monitor Stand II (249562) (${p.role} 15-21")`);
        gripItems.push(`Avenger C590 Conka Bonka Stativ-Verlängerungen Set (${p.role} 15-21")`);
        gripItems.push(`Impact Baby to Junior Receiver Adapter (${p.role} 15-21")`);
        gripItems.push(`Matthews BIG F'ING Monitor Wheel Set (3 pieces) (${p.role} 15-21")`);
        riggingAcc.push(`ULCS Bracket with 1/4" to 1/4" (${p.role} 15-21")`);
        gripItems.push(`Manfrotto 635 Quick-Action Super Clamp (${p.role} 15-21")`);
        riggingAcc.push(`Spigot with male 3/8" and 1/4" (${p.role} 15-21")`);
        riggingAcc.push(`Cine Quick Release (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
    });
    if (isScenarioActive('Easyrig')) {
        const stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
        const opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
        const options = ['no further stabilisation', ...opts];
        const optsHtml = options.map(o => `<option value="${escapeHtml(o)}">${escapeHtml(addArriKNumber(o))}</option>`).join('');
        easyrigSelectHtml = `1x Easyrig 5 Vario <select id="gearListEasyrig">${optsHtml}</select>`;
    }
    if (hasGimbal) {
        gripItems.push(...gimbalSelectionsFinal);
    }
    const frictionArmCount = hasGimbal ? 2 : 1;
    gripItems.push(...Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm'));
    if (hasGimbal) {
        gripItems.push('Avenger D200B Grip Head');
        gripItems.push('Spigot with male 3/8" and 1/4"');
    }
    if (isScenarioActive('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
    if (isScenarioActive('Steadybag')) gripItems.push('Steadybag');
    if (isScenarioActive('Jib')) {
        gripItems.push('Pro Sup EJIb-Arm');
        gripItems.push('Jib counter weights');
        needsStandardTripod = true;
    }
    if (isScenarioActive('Slider')) {
        const options = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(o => `<option value="${escapeHtml(o)}"${o === info.sliderBowl ? ' selected' : ''}>${escapeHtml(addArriKNumber(o))}</option>`).join('');
        sliderSelectHtml = `1x Prosup Tango Roller <select id="gearListSliderBowl">${options}</select>`;
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Paganini set');
        gripItems.push('Sand bag (Slider)');
        gripItems.push('Sand bag (Slider)');
        gripItems.push('Cable mat');
        gripItems.push('Cable mat');
        gripItems.push('Cable mat');
    }
    if (isScenarioActive('Slider') && isScenarioActive('Undersling mode')) {
        gripItems.push('Tango Beam');
    }
    if (isScenarioActive('Outdoor')) {
        riggingAcc.push('Spigot with male 3/8" and 1/4" (Focus Umbrella)');
    }
    if (isAnyScenarioActive(['Extreme heat', 'Extreme rain', 'Rain Machine'])) {
        gripItems.push('Large Umbrella');
        gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    }
    const tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const bowlType = info.tripodBowl;
    const spreader = info.tripodSpreader;
    const headBrand = info.tripodHeadBrand;
    const headMap = {
        'OConnor': {
            '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
            '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
            'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
        },
        'Sachtler': {
            '75mm bowl': 'Sachtler aktiv8T S2068T',
            '100mm bowl': 'Sachtler aktiv18T S2088T',
            '150mm bowl': 'Sachtler Cine 30 3007'
        }
    };
    const headName = headMap[headBrand] && headMap[headBrand][bowlType];
    if (headName) {
        gripItems.push(`${headName} ${bowlType}`);
    }
    tripodTypes.forEach(t => {
        const typeLabel = t === 'Hi-Head' ? 'Hi-Head' : `${t} Tripod`;
        const base = bowlType ? `${bowlType} ${typeLabel}` : typeLabel;
        if (t === 'Hi-Head') {
            gripItems.push(base);
        } else if (spreader) {
            gripItems.push(`${base} + ${spreader}`);
        } else {
            gripItems.push(base);
        }
        if (t === 'Short') {
            gripItems.push('Sand bag (Short Tripod)');
        }
        if (t === 'Hi-Head') {
            gripItems.push('Sand bag (Hi-Head)');
        }
    });
    if (needsStandardTripod && !gripItems.some(item => /Long Tripod/.test(item))) {
        gripItems.push('Long Tripod');
    }
    const standCount = gripItems.filter(item => /\bstand\b/i.test(item) && !/wheel/i.test(item)).length;
    if (standCount) {
        gripItems.push(...Array(standCount * 3).fill('Tennis ball'));
    }
    const maglinerCount = cartsTransportationItems.filter(item => /Magliner/i.test(item)).length;
    if (maglinerCount) {
        gripItems.push(...Array(maglinerCount * 2).fill('Wooden wedge'));
    }
    ensureItems(riggingAcc, 'accessories.rigging');
    ensureItems(gripItems, 'accessories.grip');
    const riggingItems = formatItems(riggingAcc);
    addRow('Rigging', riggingItems);
    const powerItems = [
        'Power Cable Drum 25-50 m',
        ...Array(2).fill('Power Cable 10 m'),
        ...Array(2).fill('Power Cable 5 m'),
        ...Array(3).fill('Power Strip'),
        ...Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)'),
        ...Array(3).fill('Power Three Way Splitter')
    ];
    if (isScenarioActive('Studio')) {
        powerItems.push('Camera Power Supply');
    }
    ensureItems(powerItems, 'accessories.power');
    addRow('Power', formatItems(powerItems));
    addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
    addRow('Carts and Transportation', formatItems(cartsTransportationItems));
    const miscExcluded = new Set([
        'D-Tap to LEMO 2-pin',
        'HDMI Cable',
        'BNC SDI Cable',
        'Ultraslim BNC Cable 0.5 m'
    ]);
    const miscItems = [...miscAcc].filter(item => !miscExcluded.has(item));
    const consumables = [];
    const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
    let eyeLeatherColor = info.viewfinderEyeLeatherColor || 'red';
    const gaffTapeSelections = [
        { id: 1, color: info.proGaffColor1 || 'red', width: info.proGaffWidth1 || '24mm' },
        { id: 2, color: info.proGaffColor2 || 'blue', width: info.proGaffWidth2 || '24mm' }
    ];
    const baseConsumables = [
        { name: 'Kimtech Wipes', count: 1 },
        { name: 'Sprigs Red 1/4"', count: 1, noScale: true },
        { name: 'Clapper Stick', count: 2, klappen: true }
    ];
    let eyeLeatherCount = hasViewfinder ? 2 : 0;
    let shootDays = 0;
    let isWinterShoot = false;
    const shootRanges = Array.isArray(info.shootingDays)
        ? info.shootingDays
        : (info.shootingDays ? [info.shootingDays] : []);
    const winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
    shootRanges.forEach(r => {
        const parts = r.split(' to ');
        if (parts.length === 2) {
            const start = new Date(parts[0]);
            const end = new Date(parts[1]);
            if (!isNaN(start) && !isNaN(end)) {
                shootDays += Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                if (!isWinterShoot) {
                    const m = new Date(start);
                    m.setHours(0, 0, 0, 0);
                    while (m <= end) {
                        if (winterMonths.has(m.getMonth())) {
                            isWinterShoot = true;
                            break;
                        }
                        m.setMonth(m.getMonth() + 1);
                    }
                }
            }
        }
    });
    let multiplier = 1;
    if (shootDays > 21) {
        multiplier = 4;
    } else if (shootDays > 14) {
        multiplier = 3;
    } else if (shootDays > 7) {
        multiplier = 2;
    }
    const klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
    for (const item of baseConsumables) {
        let count = item.count;
        if (item.noScale) {
            // no scaling
        } else if (item.klappen) {
            count *= klappenMultiplier;
        } else {
            count *= multiplier;
        }
        for (let i = 0; i < count; i++) consumables.push(item.name);
    }
    if (eyeLeatherCount) eyeLeatherCount *= multiplier;
    const needsRainProtection = isAnyScenarioActive(['Outdoor', 'Extreme rain', 'Rain Machine']);
    if (needsRainProtection && selectedNames.camera) {
        miscItems.push(`Rain Cover ${addArriKNumber(selectedNames.camera)}`);
    }
    const needsUmbrellas = needsRainProtection || isScenarioActive('Extreme heat');
    if (needsUmbrellas) {
        if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
        if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
    }
    if (needsRainProtection) {
        const monitorSizes = [];
        if (monitorSelect && monitorSelect.value) {
            const m = devices.monitors[monitorSelect.value];
            if (m && m.screenSizeInches) monitorSizes.push(m.screenSizeInches);
        }
        const monitorsAbove10 = monitorSizes.filter(s => s > 10).length;
        const monitorsUnder10 = monitorSizes.filter(s => s <= 10).length;
        for (let i = 0; i < monitorsAbove10 + 2; i++) consumables.push('CapIt Large');
        for (let i = 0; i < monitorsUnder10 + 3; i++) consumables.push('CapIt Medium');
        for (let i = 0; i < 3; i++) consumables.push('CapIt Small');
        for (let i = 0; i < 10; i++) consumables.push('Shower Cap');
        consumables.push('Magliner Rain Cover Transparent');
    }
    const needsHairDryer =
        (isWinterShoot && isScenarioActive('Outdoor')) ||
        isScenarioActive('Extreme cold (snow)');
    const needsHandAndFeetWarmers = isScenarioActive('Extreme cold (snow)');
    if (needsHairDryer) {
        miscItems.push('Hair Dryer');
        if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
            miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
        } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
            miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
        }
    }
    if (needsHandAndFeetWarmers) {
        const warmersCount = Math.max(shootDays, 1) * 2;
        for (let i = 0; i < warmersCount; i++) miscItems.push('Hand Warmers');
        for (let i = 0; i < warmersCount; i++) miscItems.push('Feet Warmers');
    }
    const gaffColors = [
        ['red', 'Red'],
        ['blue', 'Blue'],
        ['green', 'Green'],
        ['yellow', 'Yellow'],
        ['black', 'Black'],
        ['pink', 'Pink'],
        ['orange', 'Orange'],
        ['violette', 'Violette'],
        ['white', 'White']
    ];
    const gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
    const proGaffCount = multiplier;
    const proGaffHtml = gaffTapeSelections.map(({ id, color, width }) => {
        const colorOpts = gaffColors
            .map(([val, label]) => `<option value="${val}"${val === color ? ' selected' : ''}>${label}</option>`)
            .join('');
        const widthOpts = gaffWidths
            .map(val => `<option value="${val}"${val === width ? ' selected' : ''}>${val}</option>`)
            .join('');
        return `<span class="gear-item" data-gear-name="Pro Gaff Tape">${proGaffCount}x Pro Gaff Tape <select id="gearListProGaffColor${id}">${colorOpts}</select> <select id="gearListProGaffWidth${id}">${widthOpts}</select></span>`;
    }).join('<br>');
    let eyeLeatherHtml = '';
    if (eyeLeatherCount) {
        const colors = [
            ['red', 'Red'],
            ['blue', 'Blue'],
            ['natural', 'Natural'],
            ['green', 'Green'],
            ['purple', 'Purple'],
            ['orange', 'Orange'],
            ['gray', 'Gray'],
            ['yellow', 'Yellow'],
            ['jaguar', 'Jaguar'],
            ['killer bee', 'Killer Bee'],
            ['green rabbit', 'Green Rabbit'],
            ['black', 'Black']
        ];
        const options = colors.map(([val, label]) => `<option value="${val}"${val === eyeLeatherColor ? ' selected' : ''}>${label}</option>`).join('');
        eyeLeatherHtml = `<span class="gear-item" data-gear-name="Bluestar eye leather made of microfiber oval, large">${eyeLeatherCount}x Bluestar eye leather made of microfiber oval, large <select id="gearListEyeLeatherColor">${options}</select></span>`;
    }
    addRow('Miscellaneous', formatItems(miscItems));
    addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
    let body = `<h2>${projectTitle}</h2>`;
    if (infoHtml) body += infoHtml;
    const tableHtml = '<table class="gear-table">' + categoryGroups.join('') + '</table>';
    const infoForRules = {
        ...info,
        cameraSelection: selectedNames.camera,
        monitorSelection: selectedNames.monitor,
        wirelessSelection: selectedNames.video,
        motorSelections: selectedNames.motors.slice(),
        controllerSelections: selectedNames.controllers.slice(),
        distanceSelection: selectedNames.distance,
    };
    const adjustedTable = applyAutoGearRulesToTableHtml(tableHtml, infoForRules);
    body += '<h3>Gear List</h3>' + adjustedTable;
    return body;
}


function gearListGetCurrentHtmlImpl() {
    if (!gearListOutput && !projectRequirementsOutput) return '';

    let projHtml = '';
    if (projectRequirementsOutput) {
        const projClone = projectRequirementsOutput.cloneNode(true);
        const editBtn = projClone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        const t = projClone.querySelector('h2');
        if (t) t.remove();
        projHtml = projClone.innerHTML.trim();
    }

    let gearHtml = '';
    if (gearListOutput) {
        const clone = gearListOutput.cloneNode(true);
        const actions = clone.querySelector('#gearListActions');
        if (actions) actions.remove();
        const editBtn = clone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        ['Director', 'Combo', 'Dop'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor15`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor15`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        const cageSel = clone.querySelector('#gearListCage');
        if (cageSel) {
            const originalSel = gearListOutput.querySelector('#gearListCage');
            const val = originalSel ? originalSel.value : cageSel.value;
            Array.from(cageSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const easyrigSel = clone.querySelector('#gearListEasyrig');
        if (easyrigSel) {
            const originalSel = gearListOutput.querySelector('#gearListEasyrig');
            const val = originalSel ? originalSel.value : easyrigSel.value;
            Array.from(easyrigSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const sliderSel = clone.querySelector('#gearListSliderBowl');
        if (sliderSel) {
            const originalSel = gearListOutput.querySelector('#gearListSliderBowl');
            const val = originalSel ? originalSel.value : sliderSel.value;
            Array.from(sliderSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const monitorBatterySelects = clone.querySelectorAll('select[data-monitor-battery-key]');
        monitorBatterySelects.forEach(sel => {
            if (!sel.id) return;
            const originalSel = gearListOutput.querySelector(`#${sel.id}`);
            const val = originalSel ? originalSel.value : sel.value;
            Array.from(sel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        });
        const eyeSel = clone.querySelector('#gearListEyeLeatherColor');
        if (eyeSel) {
            const originalSel = gearListOutput.querySelector('#gearListEyeLeatherColor');
            const val = originalSel ? originalSel.value : eyeSel.value;
            Array.from(eyeSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        [1, 2].forEach(i => {
            const colorSel = clone.querySelector(`#gearListProGaffColor${i}`);
            if (colorSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
                const val = originalSel ? originalSel.value : colorSel.value;
                Array.from(colorSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
            const widthSel = clone.querySelector(`#gearListProGaffWidth${i}`);
            if (widthSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
                const val = originalSel ? originalSel.value : widthSel.value;
                Array.from(widthSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        clone.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (cb.checked) {
                cb.setAttribute('checked', '');
            } else {
                cb.removeAttribute('checked');
            }
        });
        const table = clone.querySelector('.gear-table');
        gearHtml = table ? '<h3>Gear List</h3>' + table.outerHTML : '';
    }

    if (!projHtml && !gearHtml) {
        return '';
    }

    const projectName = getCurrentProjectName();
    const titleHtml = projectName ? `<h2>${projectName}</h2>` : '';
    const combined = `${titleHtml}${projHtml}${gearHtml}`.trim();
    if (combined && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = combined;
    }
    return combined;
}

function getGearListSelectors() {
    if (!gearListOutput) return {};
    const selectors = {};
    gearListOutput.querySelectorAll('select[id]').forEach(sel => {
        selectors[sel.id] = sel.multiple
            ? Array.from(sel.selectedOptions).map(o => o.value)
            : sel.value;
    });
    return selectors;
}

function cloneGearListSelectors(selectors) {
    if (!selectors || typeof selectors !== 'object') return {};
    const clone = {};
    Object.entries(selectors).forEach(([id, value]) => {
        if (!id || typeof id !== 'string') return;
        if (Array.isArray(value)) {
            clone[id] = value.map(item => (typeof item === 'string' ? item : String(item ?? '')));
        } else if (value === undefined || value === null) {
            clone[id] = '';
        } else {
            clone[id] = typeof value === 'string' ? value : String(value);
        }
    });
    return clone;
}

function applyGearListSelectors(selectors) {
    if (!gearListOutput || !selectors) return;
    Object.entries(selectors).forEach(([id, value]) => {
        const sel = gearListOutput.querySelector(`#${id}`);
        if (sel) {
            if (sel.multiple) {
                const vals = Array.isArray(value) ? value : [value];
                Array.from(sel.options).forEach(opt => {
                    opt.selected = vals.includes(opt.value);
                });
                sel.dispatchEvent(new Event('change'));
            } else {
                sel.value = value;
                sel.dispatchEvent(new Event('change'));
            }
        }
    });
}

function cloneProjectInfoForStorage(info) {
    if (info === undefined || info === null) {
        return null;
    }
    if (typeof info !== 'object') {
        return info;
    }
    if (typeof SETUPS_DEEP_CLONE === 'function') {
        try {
            return SETUPS_DEEP_CLONE(info);
        } catch (error) {
            console.warn('Failed to clone project info for storage', error);
        }
    }
    if (Array.isArray(info)) {
        return info.map(item => cloneProjectInfoForStorage(item));
    }
    const clone = {};
    Object.keys(info).forEach(key => {
        clone[key] = cloneProjectInfoForStorage(info[key]);
    });
    return clone;
}

function hasMeaningfulProjectInfoValue(value) {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    if (typeof value === 'number') {
        return !Number.isNaN(value);
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.some(entry => hasMeaningfulProjectInfoValue(entry));
    }
    if (typeof value === 'object') {
        return Object.values(value).some(entry => hasMeaningfulProjectInfoValue(entry));
    }
    return false;
}

function mergeProjectInfoSnapshots(base, updates) {
    const baseHasData = hasMeaningfulProjectInfoValue(base);
    const updateHasData = hasMeaningfulProjectInfoValue(updates);

    if (!updateHasData) {
        return baseHasData ? cloneProjectInfoForStorage(base) : cloneProjectInfoForStorage(updates);
    }

    if (!baseHasData) {
        return cloneProjectInfoForStorage(updates);
    }

    if (Array.isArray(base) && Array.isArray(updates)) {
        return cloneProjectInfoForStorage(updates.length ? updates : base);
    }

    if (typeof base === 'object' && typeof updates === 'object') {
        const merged = cloneProjectInfoForStorage(base);
        Object.keys(updates).forEach(key => {
            merged[key] = mergeProjectInfoSnapshots(merged[key], updates[key]);
        });
        return merged;
    }

    return cloneProjectInfoForStorage(updates);
}

function normalizeRequirementNodeValue(node) {
    if (!node) return '';
    const textNodeType = typeof Node === 'undefined' ? 3 : Node.TEXT_NODE;
    const elementNodeType = typeof Node === 'undefined' ? 1 : Node.ELEMENT_NODE;
    if (node.nodeType === textNodeType) {
        return node.textContent || '';
    }
    if (node.nodeType === elementNodeType) {
        const tag = node.tagName ? node.tagName.toLowerCase() : '';
        if (tag === 'br') {
            return '\n';
        }
        return Array.from(node.childNodes || []).map(normalizeRequirementNodeValue).join('');
    }
    return '';
}

function collectProjectInfoFromRequirementsGrid() {
    if (!projectRequirementsOutput) return null;
    const boxes = Array.from(projectRequirementsOutput.querySelectorAll('.requirement-box'));
    if (!boxes.length) {
        return null;
    }
    const info = {};
    boxes.forEach((box) => {
        if (!box || typeof box.getAttribute !== 'function') return;
        const field = box.getAttribute('data-field');
        if (!field) return;
        const valueEl = box.querySelector('.req-value');
        if (!valueEl) return;
        const rawValue = Array.from(valueEl.childNodes || [])
            .map(normalizeRequirementNodeValue)
            .join('');
        const normalized = rawValue
            .replace(/\r\n?/g, '\n')
            .split('\n')
            .map(segment => segment.replace(/\s+/g, ' ').trim())
            .filter(segment => segment);
        if (!normalized.length) return;
        const text = normalized.join('\n');
        if (!Object.prototype.hasOwnProperty.call(info, field)) {
            info[field] = text;
        }
    });
    return Object.keys(info).length ? info : null;
}

function saveCurrentGearList() {
    if (factoryResetInProgress) return;
    if (isProjectPersistenceSuspended()) return;
    const html = gearListGetCurrentHtmlImpl();
    const normalizedHtml = typeof html === 'string' ? html.trim() : '';
    const gearListGenerated = Boolean(normalizedHtml);
    const info = projectForm ? collectProjectFormData() : {};
    info.sliderBowl = getSetupsCoreValue('getSliderBowlValue');
    info.easyrig = getSetupsCoreValue('getEasyrigValue');
    const previousProjectInfo = (currentProjectInfo && typeof currentProjectInfo === 'object')
        ? currentProjectInfo
        : null;
    const requirementsVisible = Boolean(
        projectRequirementsOutput
        && projectRequirementsOutput.querySelector('.requirement-box')
    );
    let pendingProjectInfo = deriveProjectInfo(info);
    const powerSelectionSnapshot = getPowerSelectionSnapshot();
    const gearSelectorsRaw = getGearListSelectors();
    const gearSelectors = cloneGearListSelectors(gearSelectorsRaw);
    const hasGearSelectors = Object.keys(gearSelectors).length > 0;
    let nameState = typeof getSetupNameState === 'function'
        ? getSetupNameState()
        : null;
    if (typeof getProjectAutoSaveOverrides === 'function') {
        const overrides = getProjectAutoSaveOverrides();
        if (overrides && typeof overrides === 'object' && overrides.setupNameState && typeof overrides.setupNameState === 'object') {
            const normalize = (value) => (typeof value === 'string' ? value.trim() : '');
            const rawOverride = overrides.setupNameState;
            const overrideTyped = normalize(rawOverride.typedName);
            const overrideSelected = normalize(rawOverride.selectedName);
            const overrideStorage = normalize(
                typeof rawOverride.storageKey === 'string'
                    ? rawOverride.storageKey
                    : (overrideSelected || overrideTyped),
            );
            const renameOverride = typeof rawOverride.renameInProgress === 'boolean'
                ? rawOverride.renameInProgress
                : Boolean(
                    overrideSelected
                    && overrideTyped
                    && overrideTyped !== overrideSelected,
                );
            nameState = {
                typedName: overrideTyped,
                selectedName: overrideSelected,
                storageKey: overrideStorage,
                renameInProgress: renameOverride,
            };
        }
    }
    const fallbackNormalize = (value) => {
        if (typeof value !== 'string') return '';
        return value.trim();
    };
    const selectedStorageKey = nameState
        ? nameState.selectedName
        : fallbackNormalize(setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '');
    const typedStorageKey = nameState
        ? nameState.typedName
        : fallbackNormalize(setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '');
    const projectStorageKey = nameState
        ? nameState.storageKey
        : (selectedStorageKey || typedStorageKey);
    const renameInProgress = nameState
        ? nameState.renameInProgress
        : Boolean(selectedStorageKey && typedStorageKey && selectedStorageKey !== typedStorageKey);
    const effectiveStorageKey = renameInProgress
        ? (selectedStorageKey || projectStorageKey)
        : projectStorageKey;
    if (!pendingProjectInfo && requirementsVisible) {
        if (previousProjectInfo && Object.keys(previousProjectInfo).length) {
            pendingProjectInfo = previousProjectInfo;
        } else if (typeof loadProject === 'function') {
            const fallbackKey = (typeof effectiveStorageKey === 'string')
                ? effectiveStorageKey
                : (typeof projectStorageKey === 'string' && projectStorageKey)
                    ? projectStorageKey
                    : (typeof selectedStorageKey === 'string'
                        ? selectedStorageKey
                        : '');
            if (typeof fallbackKey === 'string') {
                const existingProject = loadProject(fallbackKey);
                if (existingProject && existingProject.projectInfo && Object.keys(existingProject.projectInfo).length) {
                    pendingProjectInfo = cloneProjectInfoForStorage(existingProject.projectInfo);
                }
            }
        }
        if (!pendingProjectInfo) {
            const gridInfo = collectProjectInfoFromRequirementsGrid();
            if (gridInfo) {
                pendingProjectInfo = deriveProjectInfo(gridInfo) || gridInfo;
            }
        }
    }
    currentProjectInfo = pendingProjectInfo;
    const projectInfoForStorage = typeof createProjectInfoSnapshotForStorage === 'function'
        ? createProjectInfoSnapshotForStorage(currentProjectInfo, {
            projectNameOverride: renameInProgress ? (selectedStorageKey || projectStorageKey) : undefined,
        })
        : currentProjectInfo;
    const projectInfoSnapshot = cloneProjectInfoForStorage(projectInfoForStorage);
    const projectInfoSignature = projectInfoSnapshot ? stableStringify(projectInfoSnapshot) : '';
    const projectInfoSnapshotForSetups = projectInfoSnapshot ? cloneProjectInfoForStorage(projectInfoSnapshot) : null;
    const projectRulesRaw = getProjectScopedAutoGearRules();
    const projectRulesSnapshot = projectRulesRaw && projectRulesRaw.length
        ? cloneProjectInfoForStorage(projectRulesRaw)
        : null;
    const projectRulesSnapshotForSetups = projectRulesSnapshot
        ? cloneProjectInfoForStorage(projectRulesSnapshot)
        : null;
    let diagramPositionsSnapshot = null;
    let diagramPositionsSnapshotForSetups = null;
    if (typeof getDiagramManualPositions === 'function') {
        const positions = getDiagramManualPositions();
        if (positions && Object.keys(positions).length) {
            diagramPositionsSnapshot = cloneProjectInfoForStorage(positions);
            diagramPositionsSnapshotForSetups = cloneProjectInfoForStorage(diagramPositionsSnapshot);
        }
    }
    if (typeof saveProject === 'function' && typeof effectiveStorageKey === 'string') {
    const payload = {
            projectInfo: projectInfoSnapshot,
            gearListAndProjectRequirementsGenerated: gearListGenerated
        };
        if (normalizedHtml) {
            payload.gearList = normalizedHtml;
        }
        if (powerSelectionSnapshot) {
            payload.powerSelection = powerSelectionSnapshot;
        }
        if (hasGearSelectors) {
            payload.gearSelectors = gearSelectors;
        }
        if (diagramPositionsSnapshot) {
            payload.diagramPositions = diagramPositionsSnapshot;
        }
        if (projectRulesSnapshot && projectRulesSnapshot.length) {
            payload.autoGearRules = projectRulesSnapshot;
        }
        saveProject(effectiveStorageKey, payload);
    }

    if (!selectedStorageKey) return;

    const setups = getSetups();
    const existing = setups[selectedStorageKey];
    if (
        !existing
        && !html
        && !currentProjectInfo
        && !(projectRulesSnapshot && projectRulesSnapshot.length)
        && !diagramPositionsSnapshot
    ) {
        return;
    }

    const setup = existing || {};
    let changed = false;

    const existingGearList = typeof setup.gearList === 'string' ? setup.gearList : '';
    if (normalizedHtml) {
        if (existingGearList !== normalizedHtml) {
            setup.gearList = normalizedHtml;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'gearList')) {
        delete setup.gearList;
        changed = true;
    }

    if (setup.gearListAndProjectRequirementsGenerated !== gearListGenerated) {
        setup.gearListAndProjectRequirementsGenerated = gearListGenerated;
        changed = true;
    }

    if (projectInfoSignature) {
        const existingInfo = setup.projectInfo;
        const existingInfoSignature = existingInfo ? stableStringify(existingInfo) : '';
        if (existingInfoSignature !== projectInfoSignature) {
            setup.projectInfo = projectInfoSnapshotForSetups;
            changed = true;
        }
    } else if (projectInfoSnapshot === null) {
        if (setup.projectInfo !== null) {
            setup.projectInfo = null;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'projectInfo')) {
        delete setup.projectInfo;
        changed = true;
    }

    if (diagramPositionsSnapshotForSetups) {
        const existingDiagramSig = setup.diagramPositions
            ? stableStringify(setup.diagramPositions)
            : '';
        const newDiagramSig = stableStringify(diagramPositionsSnapshotForSetups);
        if (existingDiagramSig !== newDiagramSig) {
            setup.diagramPositions = diagramPositionsSnapshotForSetups;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'diagramPositions')) {
        delete setup.diagramPositions;
        changed = true;
    }

    const existingRules = setup.autoGearRules;
    const existingRulesSig = existingRules && existingRules.length ? stableStringify(existingRules) : '';
    const newRulesSig = projectRulesSnapshot && projectRulesSnapshot.length ? stableStringify(projectRulesSnapshot) : '';
    if (newRulesSig) {
        if (existingRulesSig !== newRulesSig) {
            setup.autoGearRules = projectRulesSnapshotForSetups;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'autoGearRules')) {
        delete setup.autoGearRules;
        changed = true;
    }

    const existingSelectors = setup.gearSelectors;
    const existingSelectorsSig = existingSelectors ? stableStringify(existingSelectors) : '';
    const newSelectorsSig = hasGearSelectors ? stableStringify(gearSelectors) : '';
    if (newSelectorsSig) {
        if (existingSelectorsSig !== newSelectorsSig) {
            setup.gearSelectors = gearSelectors;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'gearSelectors')) {
        delete setup.gearSelectors;
        changed = true;
    }
    const existingPowerSelectionSig = setup.powerSelection ? stableStringify(setup.powerSelection) : '';
    const newPowerSelectionSig = powerSelectionSnapshot ? stableStringify(powerSelectionSnapshot) : '';
    if (newPowerSelectionSig) {
        if (existingPowerSelectionSig !== newPowerSelectionSig) {
            setup.powerSelection = powerSelectionSnapshot;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'powerSelection')) {
        delete setup.powerSelection;
        changed = true;
    }

    if (!existing) {
        setups[selectedStorageKey] = setup;
        storeSetups(setups);
    } else if (changed) {
        setups[selectedStorageKey] = setup;
        storeSetups(setups);
    }
}

function deleteCurrentGearList() {
    if (!confirm(texts[currentLang].confirmDeleteGearList)) return false;
    if (!confirm(texts[currentLang].confirmDeleteGearListAgain)) return false;
    const backupName = ensureAutoBackupBeforeDeletion('delete gear list');
    if (!backupName) return false;
    const storageKey = getCurrentProjectStorageKey();
    if (typeof deleteProject === 'function') {
        deleteProject(storageKey);
    } else if (typeof saveProject === 'function') {
        saveProject(storageKey, {
            projectInfo: null,
            gearListAndProjectRequirementsGenerated: false
        });
    }
    const setups = getSetups();
    if (setups && typeof setups === 'object') {
        const existingSetup = setups[storageKey];
        if (existingSetup && typeof existingSetup === 'object') {
            let changed = false;
            if (Object.prototype.hasOwnProperty.call(existingSetup, 'gearList')) {
                delete existingSetup.gearList;
                changed = true;
            }
            ['projectInfo', 'autoGearRules', 'diagramPositions', 'powerSelection', 'gearSelectors', 'gearListAndProjectRequirementsGenerated']
                .forEach((prop) => {
                    if (Object.prototype.hasOwnProperty.call(existingSetup, prop)) {
                        delete existingSetup[prop];
                        changed = true;
                    }
                });
            if (changed) {
                storeSetups(setups);
            }
        }
    }
    if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
        updateAutoGearHighlightToggleButton();
    }
    if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
    }
    if (typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = '';
    }
    currentProjectInfo = null;
    if (projectForm) populateProjectForm({});
    storeSession({
        setupName: setupNameInput ? setupNameInput.value : '',
        setupSelect: setupSelect ? setupSelect.value : '',
        camera: cameraSelect ? cameraSelect.value : '',
        monitor: monitorSelect ? monitorSelect.value : '',
        video: videoSelect ? videoSelect.value : '',
        cage: cageSelect ? cageSelect.value : '',
        motors: motorSelects.map(sel => sel ? sel.value : ''),
        controllers: controllerSelects.map(sel => sel ? sel.value : ''),
        distance: distanceSelect ? distanceSelect.value : '',
        batteryPlate: normalizeBatteryPlateValue(
            batteryPlateSelect ? batteryPlateSelect.value : '',
            batterySelect ? batterySelect.value : ''
        ),
        battery: batterySelect ? batterySelect.value : '',
        batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
        sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
        easyrig: getSetupsCoreValue('getEasyrigValue'),
        projectInfo: null
    });
    if (typeof autoSaveCurrentSetup === 'function') {
        autoSaveCurrentSetup();
        if (storageKey) {
            const setupsAfterSave = getSetups();
            const savedSetup = setupsAfterSave && setupsAfterSave[storageKey];
            if (savedSetup && typeof savedSetup === 'object') {
                let resaved = false;
                if (Object.prototype.hasOwnProperty.call(savedSetup, 'gearList')) {
                    delete savedSetup.gearList;
                    resaved = true;
                }
                ['projectInfo', 'gearListAndProjectRequirementsGenerated', 'gearSelectors']
                    .forEach((prop) => {
                        if (Object.prototype.hasOwnProperty.call(savedSetup, prop)) {
                            delete savedSetup[prop];
                            resaved = true;
                        }
                    });
                if (resaved) {
                    storeSetups(setupsAfterSave);
                }
            }
        }
    }
    currentProjectInfo = null;
    updateGearListButtonVisibility();
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
        const eventDetail = { projectName: storageKey, backupName, source: 'deleteCurrentGearList' };
        try {
            document.dispatchEvent(new CustomEvent('gearlist:deleted', { detail: eventDetail }));
        } catch (error) {
            if (typeof document.createEvent === 'function') {
                const fallbackEvent = document.createEvent('CustomEvent');
                fallbackEvent.initCustomEvent('gearlist:deleted', false, false, eventDetail);
                document.dispatchEvent(fallbackEvent);
            } else {
                console.warn('Unable to dispatch gearlist:deleted event', error);
            }
        }
    }
    return true;
}

const AUTO_GEAR_HIGHLIGHT_CLASS = 'show-auto-gear-highlight';
const AUTO_GEAR_HIGHLIGHT_CONTEXT_CLASS = 'auto-gear-highlight-context';
const ONBOARD_MONITOR_RIGGING_ITEM_NAME = 'ULCS Arm mit 3/8" und 1/4" double';
const ONBOARD_MONITOR_RIGGING_ITEM_ID = 'autoGearMonitorRiggingItem';
const ONBOARD_MONITOR_RIGGING_RULE_ID = 'autoGearMonitorRiggingHighlight';
const AUTO_GEAR_HIGHLIGHT_ICON = '\uE8AF';
const AUTO_GEAR_HIGHLIGHT_LABEL_FALLBACK = 'Highlight automatic gear';
const AUTO_GEAR_HIGHLIGHT_HELP_FALLBACK =
    'Toggle a temporary color overlay for gear added by automatic rules. Useful while debugging gear rule behavior.';
const AUTO_GEAR_HIGHLIGHT_STATE_ON_FALLBACK = 'On';
const AUTO_GEAR_HIGHLIGHT_STATE_OFF_FALLBACK = 'Off';
const AUTO_GEAR_RULE_BADGE_NAMED_FALLBACK = 'Rule: %s';
const AUTO_GEAR_RULE_BADGE_UNNAMED_FALLBACK = 'Automatic rule';
const AUTO_GEAR_RULE_COLOR_PALETTE = Object.freeze([
    { bg: 'rgba(255, 210, 64, 0.35)', border: 'rgba(255, 181, 0, 0.7)' },
    { bg: 'rgba(88, 200, 255, 0.32)', border: 'rgba(0, 146, 214, 0.65)' },
    { bg: 'rgba(146, 232, 129, 0.32)', border: 'rgba(70, 180, 80, 0.65)' },
    { bg: 'rgba(255, 186, 222, 0.32)', border: 'rgba(230, 112, 190, 0.65)' },
    { bg: 'rgba(255, 214, 153, 0.32)', border: 'rgba(230, 156, 64, 0.65)' },
    { bg: 'rgba(201, 186, 255, 0.32)', border: 'rgba(146, 118, 230, 0.65)' },
    { bg: 'rgba(152, 219, 217, 0.32)', border: 'rgba(72, 182, 178, 0.65)' },
]);

function getAutoGearRuleColorKey(rule, dataset) {
    if (rule && typeof rule === 'object') {
        const ruleId = typeof rule.id === 'string' ? rule.id.trim() : '';
        if (ruleId) {
            return `id:${ruleId.toLowerCase()}`;
        }
        const label = getAutoGearRuleDisplayLabel(rule);
        if (label) {
            return `label:${label.toLowerCase()}`;
        }
    }
    if (dataset && typeof dataset === 'object') {
        const datasetId = typeof dataset.autoGearRuleId === 'string' ? dataset.autoGearRuleId.trim() : '';
        if (datasetId) {
            return `id:${datasetId.toLowerCase()}`;
        }
        const datasetLabel = typeof dataset.autoGearRuleLabel === 'string' ? dataset.autoGearRuleLabel.trim() : '';
        if (datasetLabel) {
            return `label:${datasetLabel.toLowerCase()}`;
        }
    }
    return '';
}

function getAutoGearRuleColorEntry(rule, dataset) {
    if (!AUTO_GEAR_RULE_COLOR_PALETTE.length) {
        return null;
    }
    const key = getAutoGearRuleColorKey(rule, dataset);
    if (!key) {
        const defaultEntry = AUTO_GEAR_RULE_COLOR_PALETTE[0];
        return { ...defaultEntry, index: 0 };
    }
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash * 31 + key.charCodeAt(i)) & 0x7fffffff;
    }
    const paletteIndex = Math.abs(hash) % AUTO_GEAR_RULE_COLOR_PALETTE.length;
    const paletteEntry = AUTO_GEAR_RULE_COLOR_PALETTE[paletteIndex] || AUTO_GEAR_RULE_COLOR_PALETTE[0];
    return { ...paletteEntry, index: paletteIndex };
}

function applyAutoGearRuleColors(span, rule) {
    if (!span || !span.style) {
        return;
    }
    const dataset = span.dataset || {};
    const entry = getAutoGearRuleColorEntry(rule, dataset);
    if (!entry) {
        span.style.removeProperty('--auto-gear-rule-bg');
        span.style.removeProperty('--auto-gear-rule-border');
        span.style.removeProperty('--auto-gear-rule-text');
        if (dataset && Object.prototype.hasOwnProperty.call(dataset, 'autoGearRuleColor')) {
            delete dataset.autoGearRuleColor;
        }
        return;
    }
    const { bg, border, text, index } = entry;
    if (bg) {
        span.style.setProperty('--auto-gear-rule-bg', bg);
    } else {
        span.style.removeProperty('--auto-gear-rule-bg');
    }
    if (border) {
        span.style.setProperty('--auto-gear-rule-border', border);
    } else {
        span.style.removeProperty('--auto-gear-rule-border');
    }
    if (text) {
        span.style.setProperty('--auto-gear-rule-text', text);
    } else {
        span.style.removeProperty('--auto-gear-rule-text');
    }
    if (dataset) {
        try {
            span.dataset.autoGearRuleColor = String(index);
        } catch (error) {
            console.warn('Failed to annotate automatic gear color index', error);
        }
    }
}

function getAutoGearRuleBadgeTemplates() {
    const langTexts = texts[currentLang] || texts.en || {};
    const named = langTexts.autoGearRuleBadgeNamed
        || texts.en?.autoGearRuleBadgeNamed
        || AUTO_GEAR_RULE_BADGE_NAMED_FALLBACK;
    const unnamed = langTexts.autoGearRuleBadgeUnnamed
        || texts.en?.autoGearRuleBadgeUnnamed
        || AUTO_GEAR_RULE_BADGE_UNNAMED_FALLBACK;
    return { named, unnamed };
}

function formatAutoGearRuleBadgeText(ruleLabel, ruleId) {
    const { named, unnamed } = getAutoGearRuleBadgeTemplates();
    const trimmedLabel = typeof ruleLabel === 'string' ? ruleLabel.trim() : '';
    if (trimmedLabel) {
        return named.replace('%s', trimmedLabel);
    }
    const trimmedId = typeof ruleId === 'string' ? ruleId.trim() : '';
    if (trimmedId) {
        return named.replace('%s', trimmedId);
    }
    return unnamed;
}

function refreshAutoGearRuleBadge(span) {
    if (!span || !span.classList || !span.classList.contains('auto-gear-item')) {
        return;
    }
    const sources = getAutoGearRuleSources(span);
    setAutoGearRuleSources(span, sources);
    applyAutoGearRuleColors(span);
    const badgeTexts = sources
        .map(source => formatAutoGearRuleBadgeText(source.label, source.id))
        .filter(Boolean);
    const existingBadges = Array.from(span.querySelectorAll('.auto-gear-rule-badge'));
    if (!badgeTexts.length) {
        existingBadges.forEach(node => node.remove());
        if (span.dataset && Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearRuleBadge')) {
            delete span.dataset.autoGearRuleBadge;
        }
        const tooltip = buildAutoGearRuleTooltipFromSources(sources);
        if (tooltip) {
            span.title = tooltip;
        } else {
            span.removeAttribute('title');
        }
        return;
    }
    badgeTexts.forEach((text, index) => {
        let badge = existingBadges[index];
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'auto-gear-rule-badge';
            span.appendChild(badge);
        }
        badge.textContent = text;
    });
    if (existingBadges.length > badgeTexts.length) {
        existingBadges.slice(badgeTexts.length).forEach(node => node.remove());
    }
    if (span.dataset) {
        try {
            span.dataset.autoGearRuleBadge = JSON.stringify(badgeTexts);
        } catch (error) {
            console.warn('Failed to serialize automatic gear rule badge labels', error);
        }
    }
    const tooltip = buildAutoGearRuleTooltipFromSources(sources);
    if (tooltip) {
        span.title = tooltip;
    } else {
        span.removeAttribute('title');
    }
}

function updateAutoGearRuleBadges(container) {
    const scope = container || gearListOutput;
    if (!scope || typeof scope.querySelectorAll !== 'function') {
        return;
    }
    const autoGearItems = scope.querySelectorAll('.auto-gear-item');
    autoGearItems.forEach(item => refreshAutoGearRuleBadge(item));
}

function getAutoGearHighlightLabel() {
    const localized = typeof getLocalizedText === 'function'
        ? getLocalizedText('autoGearHighlightToggle')
        : '';
    if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
    }
    return AUTO_GEAR_HIGHLIGHT_LABEL_FALLBACK;
}

function getAutoGearHighlightHelp() {
    const localized = typeof getLocalizedText === 'function'
        ? getLocalizedText('autoGearHighlightToggleHelp')
        : '';
    if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
    }
    return AUTO_GEAR_HIGHLIGHT_HELP_FALLBACK;
}

function isAutoGearHighlightEnabled() {
    return !!(gearListOutput && gearListOutput.classList && gearListOutput.classList.contains(AUTO_GEAR_HIGHLIGHT_CLASS));
}

function canHighlightAutoGear() {
    if (!gearListOutput || !gearListOutput.classList) return false;
    return !gearListOutput.classList.contains('hidden');
}

function ensureAutoGearHighlightToggleStructure(toggle) {
    if (!toggle) return null;

    toggle.classList.add('auto-gear-highlight-toggle', 'gear-list-action-btn');

    const iconClass = 'auto-gear-highlight-icon';
    let icon = toggle.querySelector(`.${iconClass}`);
    if (!icon) {
        icon = document.createElement('span');
        icon.className = `btn-icon icon-glyph ${iconClass}`;
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon-font', 'uicons');
        icon.textContent = AUTO_GEAR_HIGHLIGHT_ICON;
        if (toggle.firstChild) {
            toggle.insertBefore(icon, toggle.firstChild);
        } else {
            toggle.appendChild(icon);
        }
    } else {
        if (!icon.classList.contains('btn-icon')) {
            icon.classList.add('btn-icon');
        }
        if (!icon.classList.contains('icon-glyph')) {
            icon.classList.add('icon-glyph');
        }
        if (!icon.classList.contains(iconClass)) {
            icon.classList.add(iconClass);
        }
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon-font', 'uicons');
        if (icon.textContent !== AUTO_GEAR_HIGHLIGHT_ICON) {
            icon.textContent = AUTO_GEAR_HIGHLIGHT_ICON;
        }
    }

    let label = toggle.querySelector('.auto-gear-highlight-label');
    if (!label) {
        label = document.createElement('span');
        label.className = 'auto-gear-highlight-label';
        toggle.appendChild(label);
    }

    let state = toggle.querySelector('.auto-gear-highlight-state');
    if (!state) {
        state = document.createElement('span');
        state.className = 'auto-gear-highlight-state';
        if (typeof label.after === 'function') {
            label.after(state);
        } else {
            toggle.appendChild(state);
        }
    }
    if (state) {
        state.setAttribute('aria-live', 'polite');
        state.setAttribute('aria-atomic', 'true');
    }

    const textNodes = Array.from(toggle.childNodes || [])
        .filter(node => node && node.nodeType === 3 && node.textContent && node.textContent.trim().length);
    textNodes.forEach(node => {
        toggle.removeChild(node);
    });

    if (state && typeof label !== 'undefined' && label && state.previousElementSibling !== label) {
        if (typeof label.after === 'function') {
            label.after(state);
        }
    }

    return { label, state };
}

function getAutoGearHighlightStateText(isActive) {
    const key = isActive ? 'autoGearHighlightToggleStateOn' : 'autoGearHighlightToggleStateOff';
    const fallback = isActive ? AUTO_GEAR_HIGHLIGHT_STATE_ON_FALLBACK : AUTO_GEAR_HIGHLIGHT_STATE_OFF_FALLBACK;
    const localized = typeof getLocalizedText === 'function'
        ? getLocalizedText(key)
        : '';
    if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
    }
    return fallback;
}

function applyAutoGearHighlightContext(isActive) {
    if (typeof document === 'undefined') {
        return;
    }
    const enable = !!isActive;
    const targets = [document.documentElement, document.body, document.getElementById('autoGearDraftImpact')];
    targets.forEach(node => {
        if (node && node.classList) {
            node.classList.toggle(AUTO_GEAR_HIGHLIGHT_CONTEXT_CLASS, enable);
        }
    });
}

function setAutoGearHighlightEnabled(enabled) {
    const nextState = !!enabled;
    if (gearListOutput && gearListOutput.classList) {
        gearListOutput.classList.toggle(AUTO_GEAR_HIGHLIGHT_CLASS, nextState);
    }
    updateAutoGearHighlightToggleButton();
}

function updateAutoGearHighlightToggleButton() {
    const toggle = document.getElementById('autoGearHighlightToggle');
    if (!toggle) return;
    const label = getAutoGearHighlightLabel();
    const help = getAutoGearHighlightHelp();
    const structure = ensureAutoGearHighlightToggleStructure(toggle);
    const labelContainer = structure && structure.label;
    const stateContainer = structure && structure.state;
    if (labelContainer) {
        labelContainer.textContent = label;
    } else if (typeof toggle.textContent === 'string') {
        toggle.textContent = label;
    } else {
        toggle.innerHTML = escapeHtml(label);
    }
    toggle.setAttribute('title', help);
    toggle.setAttribute('data-help', help);
    toggle.setAttribute('aria-label', help);
    const active = isAutoGearHighlightEnabled();
    applyAutoGearHighlightContext(active);
    const stateText = getAutoGearHighlightStateText(active);
    if (stateContainer) {
        stateContainer.textContent = stateText;
        stateContainer.setAttribute('data-state', active ? 'on' : 'off');
    }
    toggle.setAttribute('data-state', active ? 'on' : 'off');
    toggle.setAttribute('data-state-label', stateText);
    toggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    toggle.classList.toggle('is-active', active);
    const available = canHighlightAutoGear();
    toggle.disabled = !available;
    if (available) {
        toggle.removeAttribute('aria-disabled');
    } else {
        toggle.setAttribute('aria-disabled', 'true');
    }
    updateAutoGearRuleBadges(gearListOutput);
}

function ensureGearListActions() {
    if (!gearListOutput) return;
    let actions = document.getElementById('gearListActions');
    if (!actions) {
        actions = document.createElement('div');
        actions.id = 'gearListActions';
        gearListOutput.appendChild(actions);
    }
    const existingDeleteBtn = actions.querySelector('#deleteGearListBtn');
    if (existingDeleteBtn) {
        existingDeleteBtn.removeEventListener('click', deleteCurrentGearList);
        existingDeleteBtn.remove();
    }
    let autoSaveNote = document.getElementById('gearListAutosaveNote');
    if (!autoSaveNote) {
        autoSaveNote = document.createElement('p');
        autoSaveNote.id = 'gearListAutosaveNote';
        autoSaveNote.className = 'gear-list-autosave-note';
        actions.appendChild(autoSaveNote);
    } else if (!actions.contains(autoSaveNote)) {
        actions.appendChild(autoSaveNote);
    }
    const noteText = (texts[currentLang] && texts[currentLang].gearListAutosaveNote) || '';
    const trimmedNoteText = typeof noteText === 'string' ? noteText.trim() : '';
    const hasNoteText = trimmedNoteText.length > 0;

    if (hasNoteText) {
        autoSaveNote.hidden = false;
        autoSaveNote.removeAttribute('hidden');
        autoSaveNote.textContent = trimmedNoteText;
        autoSaveNote.setAttribute('title', trimmedNoteText);
        autoSaveNote.setAttribute('data-help', trimmedNoteText);
    } else {
        autoSaveNote.textContent = '';
        autoSaveNote.setAttribute('title', '');
        autoSaveNote.setAttribute('data-help', '');
        autoSaveNote.hidden = true;
    }

    const deleteLabel =
        (texts[currentLang] && texts[currentLang].deleteGearListBtn)
            || (texts.en && texts.en.deleteGearListBtn)
            || 'Delete Gear List';
    const deleteHelp =
        (texts[currentLang]
            && (texts[currentLang].deleteGearListBtnHelp || texts[currentLang].deleteGearListBtn))
        || (texts.en && (texts.en.deleteGearListBtnHelp || texts.en.deleteGearListBtn))
        || deleteLabel;

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteGearListBtn';
    deleteBtn.type = 'button';
    deleteBtn.className = 'gear-list-action-btn';
    if (typeof setButtonLabelWithIcon === 'function' && typeof ICON_GLYPHS === 'object') {
        setButtonLabelWithIcon(deleteBtn, deleteLabel, ICON_GLYPHS.trash);
    } else {
        const iconHtml = typeof iconMarkup === 'function' && typeof ICON_GLYPHS === 'object'
            ? iconMarkup(ICON_GLYPHS.trash, 'btn-icon')
            : '';
        deleteBtn.innerHTML = `${iconHtml}${escapeHtml(deleteLabel)}`;
    }
    deleteBtn.setAttribute('title', deleteHelp);
    deleteBtn.setAttribute('data-help', deleteHelp);
    deleteBtn.setAttribute('aria-label', deleteHelp);
    deleteBtn.setAttribute('data-feature-search', 'true');
    deleteBtn.setAttribute('data-feature-search-keywords', 'delete remove clear gear list project');
    deleteBtn.addEventListener('click', deleteCurrentGearList);

    const shouldHideDeleteBtn =
        !gearListOutput
        || gearListOutput.classList.contains('hidden')
        || gearListOutput.innerHTML.trim() === '';
    if (shouldHideDeleteBtn) {
        deleteBtn.hidden = true;
        deleteBtn.setAttribute('hidden', '');
    } else {
        deleteBtn.hidden = false;
        deleteBtn.removeAttribute('hidden');
    }

    if (autoSaveNote && autoSaveNote.parentElement === actions) {
        actions.insertBefore(deleteBtn, autoSaveNote);
    } else {
        actions.appendChild(deleteBtn);
    }

    const highlightToggle = document.getElementById('autoGearHighlightToggle');
    if (highlightToggle && !highlightToggle.dataset.gearListHighlightBound) {
        highlightToggle.addEventListener('click', () => {
            const nextState = !isAutoGearHighlightEnabled();
            setAutoGearHighlightEnabled(nextState);
            if (typeof saveCurrentSession === 'function') {
                saveCurrentSession({ skipGearList: true });
            }
        });
        highlightToggle.dataset.gearListHighlightBound = 'true';
    }
    updateAutoGearHighlightToggleButton();
    updateAutoGearRuleBadges(actions.closest('#gearListOutput') || gearListOutput);

    if (!gearListOutput._filterListenerBound) {
        gearListOutput.addEventListener('change', e => {
            const target = e.target;
            if (target && target.matches('select')) {
                adjustGearListSelectWidth(target);
            }
            let shouldSync = false;
            if (target.matches('.filter-values-container input[type="checkbox"]')) {
                const container = target.closest('.filter-values-container');
                const storageId = container && container.getAttribute('data-storage-values');
                const sel = container && container.querySelector('select');
                if (target.checked) {
                    target.setAttribute('checked', '');
                } else {
                    target.removeAttribute('checked');
                }
                if (storageId) {
                    syncGearListFilterValue(storageId, target.value, target.checked);
                } else if (sel) {
                    const opt = Array.from(sel.options).find(opt => opt.value === target.value);
                    if (opt) opt.selected = target.checked;
                    sel.dispatchEvent(new Event('change'));
                }
                shouldSync = true;
            } else if (target.matches('select[data-storage-id]')) {
                const storageId = target.getAttribute('data-storage-id');
                if (storageId) {
                    syncGearListFilterSize(storageId, target.value);
                }
                shouldSync = true;
            } else if (target.id && target.id.startsWith('filter-size-')) {
                shouldSync = true;
            } else if (target.id && target.id.startsWith('filter-values-')) {
                shouldSync = true;
            } else if (target.matches('input, select, textarea') && !target.closest('#gearListActions')) {
                shouldSync = true;
            }

            if (shouldSync) {
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            }
        });
        gearListOutput._filterListenerBound = true;
    }

    if (!gearListOutput._inputListenerBound) {
        gearListOutput.addEventListener('input', e => {
            const target = e.target;
            if (!target) return;
            if (target.closest('#gearListActions')) return;
            if (target.matches('input, textarea')) {
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            }
        });
        gearListOutput._inputListenerBound = true;
    }
}

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    const handlerKey = '__cameraPowerPlannerGearDeleteHandler';
    if (!document[handlerKey]) {
        const handleGearDeleteRequest = () => {
            try {
                deleteCurrentGearList();
            } catch (error) {
                console.warn('Failed to handle gear list deletion request', error);
            }
        };
        document.addEventListener('gearlist:delete-requested', handleGearDeleteRequest);
        Object.defineProperty(document, handlerKey, {
            value: handleGearDeleteRequest,
            configurable: true,
            writable: false,
            enumerable: false,
        });
    }
}

function bindGearListCageListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListCage');
    if (sel) {
        sel.addEventListener('change', e => {
            if (cageSelect) {
                cageSelect.value = e.target.value;
                cageSelect.dispatchEvent(new Event('change'));
            }
            saveCurrentGearList();
        });
    }
}

function bindGearListEasyrigListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEasyrig');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListSliderBowlListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListSliderBowl');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListEyeLeatherListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
        });
    }
}

function bindGearListProGaffTapeListener() {
    if (!gearListOutput) return;
    [1, 2].forEach(i => {
        const colorSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
        const widthSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
        [colorSel, widthSel].forEach(sel => {
            if (sel) {
                sel.addEventListener('change', () => {
                    saveCurrentGearList();
                });
            }
        });
    });
}

function bindGearListDirectorMonitorListener() {
    if (!gearListOutput) return;
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                sel.dataset.autoGearManual = 'true';
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            });
        }
    });
    ['Director', 'Combo', 'Dop'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor15`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.directorMonitors && devices.directorMonitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}15`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                sel.dataset.autoGearManual = 'true';
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            });
        }
    });
}


function refreshGearListIfVisible() {
    if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;
    if (restoringSession) return;
    if (skipNextGearListRefresh) {
        skipNextGearListRefresh = false;
        return;
    }

    if (projectForm) {
        populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
        populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
        populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
        const info = collectProjectFormData();
        info.sliderBowl = getSetupsCoreValue('getSliderBowlValue');
        info.easyrig = getSetupsCoreValue('getEasyrigValue');
        currentProjectInfo = deriveProjectInfo(info);
    } else {
        const info = {
            sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
            easyrig: getSetupsCoreValue('getEasyrigValue')
        };
        currentProjectInfo = deriveProjectInfo(info);
    }

    const html = gearListGenerateHtmlImpl(currentProjectInfo || {});
    if (currentProjectInfo) {
        displayGearAndRequirements(html);
    } else {
        const { gearHtml } = gearListGetSafeHtmlSectionsImpl(html);
        gearListOutput.innerHTML = gearHtml;
    }
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    // Ensure both the gear list HTML and the associated session state are
    // saved whenever the visible list is refreshed so reloads keep it visible.
    saveCurrentSession();
}

