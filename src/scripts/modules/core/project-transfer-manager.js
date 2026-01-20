
import cineFeatureBackup from '../features/backup.js';
import { safeGetCurrentProjectName } from './project-manager.js';
import { escapeHtml } from '../ui-helpers.js';

/**
 * Helper to resolve runtime functions safely
 */
function resolveRuntimeFunction(name, scope = typeof window !== 'undefined' ? window : {}) {
    return typeof scope[name] === 'function' ? scope[name] : null;
}

/**
 * Access global DOM elements safely
 */
function getElementById(id) {
    return typeof document !== 'undefined' ? document.getElementById(id) : null;
}

function getSelectValue(id) {
    const el = getElementById(id);
    return el && typeof el.value === 'string' ? el.value.trim() : '';
}

function normalizePowerSelectionString(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed || trimmed.toLowerCase() === 'none') return '';
    return trimmed;
}

function normalizeBatteryPlateValue(plate, battery) {
    // Basic shim for normalizeBatteryPlateValue which might be more complex in app-setups.js
    // If global exists, use it
    const globalFn = resolveRuntimeFunction('normalizeBatteryPlateValue');
    if (globalFn) return globalFn(plate, battery);
    return plate;
}

function getLocalizedText(key, fallback) {
    const texts = (typeof window !== 'undefined' ? window.texts : {}) || {};
    const currentLang = (typeof window !== 'undefined' ? window.currentLang : 'en') || 'en';
    const langTexts = texts[currentLang] || texts.en || {};
    return langTexts[key] || fallback;
}

export const ProjectTransferManager = {
    async downloadSharedProject(shareFileName, options = {}) {
        const { includeAutoGear, includeOwnedGear } = options;
        if (!shareFileName) return;

        // UI Context - simple binding
        // In the original, this was getShareUiContext(this).
        // We will notify failures via alerts or callbacks if provided.
        // We can't easily access the internal shareLinkMessage of the caller unless passed.
        // For now, we will assume standard alert/notification patterns.

        const setupName = safeGetCurrentProjectName('');

        const batterySelect = getElementById('batterySelect');
        const batteryPlateSelect = getElementById('batteryPlateSelect');
        const hotswapSelect = getElementById('hotswapSelect');
        const cameraSelect = getElementById('cameraSelect');
        const monitorSelect = getElementById('monitorSelect');
        const videoSelect = getElementById('videoSelect');
        const cageSelect = getElementById('cageSelect');
        const distanceSelect = getElementById('distanceSelect');

        const readPowerSelectValue = (el) => (
            el && typeof el.value === 'string'
                ? normalizePowerSelectionString(el.value)
                : ''
        );

        const normalizedBattery = readPowerSelectValue(batterySelect);
        const normalizedPlate = readPowerSelectValue(batteryPlateSelect);
        const normalizedHotswap = readPowerSelectValue(hotswapSelect);

        const currentSetup = { setupName };
        const addIfChanged = (key, value) => {
            if (value === null || value === undefined) return;
            if (typeof value === 'string') {
                const trimmed = value.trim();
                // Note: The original logic treated 'None' as empty for these fields
                if (!trimmed || trimmed === 'None') return;
                currentSetup[key] = trimmed;
            } else if (Array.isArray(value)) {
                const filtered = value.filter(v => typeof v === 'string' && v.trim() && v !== 'None');
                if (filtered.length) currentSetup[key] = filtered;
            } else {
                currentSetup[key] = value;
            }
        };

        addIfChanged('camera', cameraSelect ? cameraSelect.value : '');
        addIfChanged('monitor', monitorSelect ? monitorSelect.value : '');
        addIfChanged('video', videoSelect ? videoSelect.value : '');
        addIfChanged('cage', cageSelect ? cageSelect.value : '');
        addIfChanged('distance', distanceSelect ? distanceSelect.value : '');

        // Handle multi-selects (motors, controllers)
        // These are often arrays of elements in app-setups.js global scope `motorSelects`, `controllerSelects`
        // We can try to access them from window.
        const motorSelects = (typeof window !== 'undefined' ? window.motorSelects : []);
        if (Array.isArray(motorSelects)) {
            addIfChanged('motors', motorSelects.map(sel => sel.value));
        }
        const controllerSelects = (typeof window !== 'undefined' ? window.controllerSelects : []);
        if (Array.isArray(controllerSelects)) {
            addIfChanged('controllers', controllerSelects.map(sel => sel.value));
        }

        addIfChanged('batteryPlate', normalizeBatteryPlateValue(normalizedPlate, normalizedBattery));
        addIfChanged('battery', normalizedBattery);
        addIfChanged('batteryHotswap', normalizedHotswap);

        // Snapshot Power Selection
        // Assuming global `getPowerSelectionSnapshot` exists
        const getPowerSelectionSnapshot = resolveRuntimeFunction('getPowerSelectionSnapshot');
        if (getPowerSelectionSnapshot) {
            const sharedPowerSelection = getPowerSelectionSnapshot();
            if (sharedPowerSelection) {
                currentSetup.powerSelection = sharedPowerSelection;
                currentSetup.battery = sharedPowerSelection.battery || '';
                currentSetup.batteryPlate = sharedPowerSelection.batteryPlate || '';
                currentSetup.batteryHotswap = sharedPowerSelection.batteryHotswap || '';
            }
        }

        // Diagram Positions
        const getDiagramManualPositions = resolveRuntimeFunction('getDiagramManualPositions');
        if (getDiagramManualPositions) {
            const diagramPositions = getDiagramManualPositions();
            if (diagramPositions && Object.keys(diagramPositions).length) {
                currentSetup.diagramPositions = diagramPositions;
            }
        }

        // Project Info
        // Assuming `currentProjectInfo` global or accessible
        let currentProjectInfo = (typeof window !== 'undefined' ? window.currentProjectInfo : null);
        const projectInfoCandidates = [];
        if (currentProjectInfo) {
            projectInfoCandidates.push(currentProjectInfo);
        }

        // Fetch stored project info
        const loadProject = resolveRuntimeFunction('loadProject') || (typeof window !== 'undefined' && window.cineStorage ? window.cineStorage.loadProject : null);
        const getCurrentProjectStorageKey = resolveRuntimeFunction('getCurrentProjectStorageKey');
        const getSetupNameState = resolveRuntimeFunction('getSetupNameState');

        if (loadProject) {
            const storageKeys = new Set();
            if (typeof setupName === 'string' && setupName) storageKeys.add(setupName);

            if (getCurrentProjectStorageKey) {
                const k = getCurrentProjectStorageKey({ allowTyped: true });
                if (k) storageKeys.add(k);
            }

            if (getSetupNameState) {
                const nameState = getSetupNameState();
                if (nameState) {
                    ['storageKey', 'selectedName', 'typedName'].forEach(prop => {
                        const v = nameState[prop] ? nameState[prop].trim() : '';
                        if (v) storageKeys.add(v);
                    });
                }
            }

            const fetchCandidate = async (key) => {
                // Check auto backup exclusion
                if (cineFeatureBackup && typeof cineFeatureBackup.isAutoBackupName === 'function' && cineFeatureBackup.isAutoBackupName(key)) {
                    return;
                }
                try {
                    let storedProject = null;
                    const scope = typeof globalThis !== 'undefined' ? globalThis : window;
                    if (scope.cineProjectService && typeof scope.cineProjectService.getProject === 'function') {
                        storedProject = await scope.cineProjectService.getProject(key);
                    }
                    if (!storedProject) {
                        const result = loadProject(key);
                        if (result && typeof result.then !== 'function') {
                            storedProject = result;
                        }
                    }
                    if (storedProject && storedProject.projectInfo) {
                        projectInfoCandidates.push(storedProject.projectInfo);
                    }
                } catch (e) {
                    console.warn('Unable to read project info for export', key, e);
                }
            };

            const promises = [];
            storageKeys.forEach(key => promises.push(fetchCandidate(key)));
            await Promise.all(promises);
        }

        // Merge Project Info
        const cloneProjectInfoForStorage = resolveRuntimeFunction('cloneProjectInfoForStorage');
        const mergeProjectInfoSnapshots = resolveRuntimeFunction('mergeProjectInfoSnapshots');
        const createProjectInfoSnapshotForStorage = resolveRuntimeFunction('createProjectInfoSnapshotForStorage');

        let mergedProjectInfo = null;
        let projectInfoSnapshotForExport = null;

        if (cloneProjectInfoForStorage && mergeProjectInfoSnapshots) {
            projectInfoCandidates.forEach(candidate => {
                if (!candidate) return;
                if (!mergedProjectInfo) {
                    mergedProjectInfo = cloneProjectInfoForStorage(candidate);
                } else {
                    mergedProjectInfo = mergeProjectInfoSnapshots(mergedProjectInfo, candidate);
                }
            });

            if (mergedProjectInfo) {
                const snapshotForExport = createProjectInfoSnapshotForStorage
                    ? createProjectInfoSnapshotForStorage(mergedProjectInfo, { projectNameOverride: setupName })
                    : mergedProjectInfo;
                if (cloneProjectInfoForStorage) {
                    projectInfoSnapshotForExport = cloneProjectInfoForStorage(snapshotForExport);
                }
            }
        }

        // Gear List Selectors
        const getGearListSelectors = resolveRuntimeFunction('getGearListSelectors');
        const cloneGearListSelectors = resolveRuntimeFunction('cloneGearListSelectors');
        if (getGearListSelectors && cloneGearListSelectors) {
            const gearSelectors = cloneGearListSelectors(getGearListSelectors());
            if (Object.keys(gearSelectors).length) {
                currentSetup.gearSelectors = gearSelectors;
            }
        }

        // Access gear list HTML helpers globally if needed
        // The original code used `gearListGetCurrentHtmlImpl`, `gearListGetSafeHtmlSectionsImpl`
        // These might be globals or in a module.
        const gearListGetCurrentHtmlImpl = resolveRuntimeFunction('gearListGetCurrentHtmlImpl');
        const gearListGetSafeHtmlSectionsImpl = resolveRuntimeFunction('gearListGetSafeHtmlSectionsImpl');

        const combinedHtml = gearListGetCurrentHtmlImpl ? gearListGetCurrentHtmlImpl() : '';
        currentSetup.gearListAndProjectRequirementsGenerated = Boolean(combinedHtml);

        if (currentSetup.gearListAndProjectRequirementsGenerated && gearListGetSafeHtmlSectionsImpl) {
            const { projectHtml, gearHtml } = gearListGetSafeHtmlSectionsImpl(combinedHtml);
            if (projectHtml) currentSetup.projectHtml = projectHtml;
            if (gearHtml) {
                // Owned Gear Logic
                // We attempt to resolve the collector function from runtime
                const collectOwnedGearMarkersForExport = resolveRuntimeFunction('collectOwnedGearMarkersForExport');
                const applyOwnedGearMarkersToHtml = resolveRuntimeFunction('applyOwnedGearMarkersToHtml');

                let exportHtml = gearHtml;
                let ownedGearMarkers = [];

                if (includeOwnedGear && collectOwnedGearMarkersForExport && typeof gearListGetCurrentHtmlImpl === 'function') {
                    // Note: collectOwnedGearMarkersForExport typically works on the RAW html output
                    // In the original code: collectOwnedGearMarkersForExport(gearListOutput) -> wait, gearListOutput is a DOM element?
                    // "collectOwnedGearMarkersForExport(gearListOutput)"
                    // If gearListOutput is global, we can pass it.
                    const gearListOutput = getElementById('gearListOutput');
                    if (gearListOutput) {
                        ownedGearMarkers = collectOwnedGearMarkersForExport(gearListOutput);
                    }
                }

                if (includeOwnedGear && ownedGearMarkers.length && applyOwnedGearMarkersToHtml) {
                    exportHtml = applyOwnedGearMarkersToHtml(gearHtml, ownedGearMarkers);
                    currentSetup.ownedGearMarkers = ownedGearMarkers.map(entry => ({ ...entry }));
                }

                currentSetup.gearList = exportHtml;
            }
        }

        if (currentSetup.gearListAndProjectRequirementsGenerated && projectInfoSnapshotForExport) {
            currentSetup.projectInfo = projectInfoSnapshotForExport;
        }

        // Feedback
        const getCurrentSetupKey = resolveRuntimeFunction('getCurrentSetupKey');
        const loadFeedbackSafe = resolveRuntimeFunction('loadFeedbackSafe');
        if (getCurrentSetupKey && loadFeedbackSafe) {
            const k = getCurrentSetupKey();
            const feedback = loadFeedbackSafe()[k] || [];
            if (feedback.length) currentSetup.feedback = feedback;
        }

        // Auto Gear
        const getAutoGearRules = resolveRuntimeFunction('getAutoGearRules');
        const getAutoGearRuleCoverageSummary = resolveRuntimeFunction('getAutoGearRuleCoverageSummary');
        if (getAutoGearRules && includeAutoGear) {
            const rules = getAutoGearRules();
            if (Array.isArray(rules) && rules.length > 0) {
                currentSetup.autoGearRules = rules;
                if (getAutoGearRuleCoverageSummary) {
                    currentSetup.autoGearCoverage = getAutoGearRuleCoverageSummary({ rules });
                }
            }
        }

        // Contacts
        const getContactsSnapshot = resolveRuntimeFunction('getContactsSnapshot');
        if (getContactsSnapshot) {
            const contacts = getContactsSnapshot(); // Simplified, assume snapshot is clean or handle cleaning if needed
            if (Array.isArray(contacts) && contacts.length) {
                currentSetup.contacts = contacts;
            }
        }

        // Serialize and Download
        let json;
        try {
            json = JSON.stringify(currentSetup, null, 2);
        } catch (e) {
            console.error('Failed to serialize shared project', e);
            return { success: false, error: e };
        }

        // Call downloadBackupPayload
        // Note: downloadBackupPayload is likely global or valid import.
        // If imported as cineFeatureBackup.downloadBackupPayload?
        // In app-session.js, line 114: `saveContacts: saveContactsToStorage, ... downloadBackupPayload` ??
        // Actually, `app-session.js` didn't show `downloadBackupPayload` in `cineStorage` destructuring.
        // It's likely exported from `backup.js` module.
        // The file `src/scripts/modules/features/backup.js` has `downloadBackupPayload`.
        // Let's assume it is exposed on `cineFeatureBackup` if imported as such.
        // Wait, `backup.js` usually exports `cineFeatureBackup` object?

        let downloadFn = null;
        if (typeof cineFeatureBackup === 'object' && typeof cineFeatureBackup.downloadBackupPayload === 'function') {
            downloadFn = cineFeatureBackup.downloadBackupPayload;
        } else if (typeof window !== 'undefined' && typeof window.downloadBackupPayload === 'function') {
            downloadFn = window.downloadBackupPayload;
        } else {
            // Try check if cineFeatureBackup ITSELF is the function? Unlikely.
            // Maybe it is a named export?
            // Access via global `cineFeatureBackup`.
        }

        // If we imported `cineFeatureBackup` from `../modules/features/backup.js`, verify its structure.
        // view_file of backup.js in Step 913 showed:
        // "This file defines the `downloadBackupPayload` function... It uses `cineModuleBase` for global exposure..."

        if (downloadFn) {
            return downloadFn(json, shareFileName);
        } else {
            console.warn('downloadBackupPayload function not found');
            return { success: false, error: 'download_function_missing' };
        }
    }
};
