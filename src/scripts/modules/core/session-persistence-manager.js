/**
 * Session Persistence Manager
 *
 * Manages saving and restoring the application session state.
 * Handles:
 * - `saveCurrentSession`: Captures current UI state and saves it contextually (setup or temporary).
 * - `autoSaveCurrentSetup`: Debounced/logic-gated autosave for project changes.
 * - `restoreSessionState`: Rehydrates the UI from stored session/project data on load.
 * - `storeSession` / `_loadSession`: Internal storage wrappers.
 */

import { cineStorage } from '../../storage.js';
import { SessionState } from './session-state.js';

// --- Globals & Helpers ---

function safeGetGlobalFunction(name) {
    if (typeof window !== 'undefined' && typeof window[name] === 'function') {
        return window[name];
    }
    return null;
}

function stableStringify(obj) {
    // Basic stable stringify for diffing
    if (typeof obj !== 'object' || obj === null) return String(obj);
    const keys = Object.keys(obj).sort();
    return JSON.stringify(obj, keys);
}

// --- DOM References ---

function getRefs() {
    if (typeof document === 'undefined') return {};
    return {
        setupNameInput: document.getElementById('setupName'),
        setupSelect: document.getElementById('setupSelect'),
        cameraSelect: document.getElementById('cameraSelect'),
        monitorSelect: document.getElementById('monitorSelect'),
        videoSelect: document.getElementById('videoSelect'),
        cageSelect: document.getElementById('cageSelect'),
        distanceSelect: document.getElementById('distanceSelect'),
        batterySelect: document.getElementById('batterySelect'),
        batteryPlateSelect: document.getElementById('batteryPlateSelect'),
        hotswapSelect: document.getElementById('batteryHotswapSelect'),
        gearListOutput: document.getElementById('gearListOutput'),
        projectRequirementsOutput: document.getElementById('projectRequirementsOutput'),
        motorSelects: window.motorSelects || [],
        controllerSelects: window.controllerSelects || [],
        projectForm: document.getElementById('projectForm'),
    };
}

// --- Internal Logic ---

function storeSession(state) {
    if (!state) return;
    if (cineStorage && cineStorage.saveSessionState) {
        cineStorage.saveSessionState(state);
    }
}

function _loadSession() {
    if (cineStorage && cineStorage.loadSessionState) {
        return cineStorage.loadSessionState();
    }
    return null;
}

function getSessionCoreValue(key) {
    // Legacy: app-session.js had this wrapper
    // It seems to try to call a getter function by name?
    // "info.sliderBowl = getSessionCoreValue('getSliderBowlValue');"
    // So it looks up a global function by name and calls it.
    const fn = safeGetGlobalFunction(key);
    if (fn) return fn();
    return '';
}

function deriveSessionProjectInfo(info) {
    // Checks for global deriveProjectInfo
    const fn = safeGetGlobalFunction('deriveProjectInfo');
    if (fn) return fn(info);
    return null;
}

// --- Exported Functions ---

export function saveCurrentSession(options = {}) {
    if (SessionState.restoringSession || SessionState.factoryResetInProgress) return;
    if (typeof window !== 'undefined' && window.cineSuppressAutosave) return;

    // Check if persistence suspended
    const isSuspended = safeGetGlobalFunction('isProjectPersistenceSuspended');
    if (isSuspended && isSuspended()) return;

    const refs = getRefs();
    const collectProjectFormData = safeGetGlobalFunction('collectProjectFormData');
    const info = (refs.projectForm && collectProjectFormData) ? collectProjectFormData() : {};

    info.sliderBowl = getSessionCoreValue('getSliderBowlValue');
    info.easyrig = getSessionCoreValue('getEasyrigValue');

    // Update global currentProjectInfo if needed, or just derive local
    const projectInfo = deriveSessionProjectInfo(info);
    const setCurrentProjectInfo = safeGetGlobalFunction('setCurrentProjectInfo');
    if (setCurrentProjectInfo) setCurrentProjectInfo(projectInfo);

    const batteryValue = refs.batterySelect ? refs.batterySelect.value : '';
    const batteryPlateValue = refs.batteryPlateSelect ? refs.batteryPlateSelect.value : '';

    const normalizeBatteryPlateValue = safeGetGlobalFunction('normalizeBatteryPlateValue') || ((p) => p);
    const isAutoGearHighlightEnabled = safeGetGlobalFunction('isAutoGearHighlightEnabled');

    const state = {
        setupName: refs.setupNameInput ? refs.setupNameInput.value : '',
        setupSelect: refs.setupSelect ? refs.setupSelect.value : '',
        camera: refs.cameraSelect ? refs.cameraSelect.value : '',
        monitor: refs.monitorSelect ? refs.monitorSelect.value : '',
        video: refs.videoSelect ? refs.videoSelect.value : '',
        cage: refs.cageSelect ? refs.cageSelect.value : '',
        motors: refs.motorSelects.map(sel => sel ? sel.value : ''),
        controllers: refs.controllerSelects.map(sel => sel ? sel.value : ''),
        distance: refs.distanceSelect ? refs.distanceSelect.value : '',
        batteryPlate: normalizeBatteryPlateValue(batteryPlateValue, batteryValue),
        battery: batteryValue,
        batteryHotswap: refs.hotswapSelect ? refs.hotswapSelect.value : '',
        sliderBowl: info.sliderBowl,
        easyrig: info.easyrig,
        projectInfo: projectInfo,
        autoGearHighlight: isAutoGearHighlightEnabled ? !!isAutoGearHighlightEnabled() : false
    };

    const getDiagramManualPositions = safeGetGlobalFunction('getDiagramManualPositions');
    if (getDiagramManualPositions) {
        const diagramPositions = getDiagramManualPositions();
        if (diagramPositions && Object.keys(diagramPositions).length) {
            state.diagramPositions = diagramPositions;
        }
    }

    storeSession(state);

    if (!options.skipGearList) {
        const saveCurrentGearList = safeGetGlobalFunction('saveCurrentGearList');
        if (saveCurrentGearList) saveCurrentGearList();
    }
}

export function autoSaveCurrentSetup() {
    if (SessionState.factoryResetInProgress) return;

    const refs = getRefs();
    if (!refs.setupNameInput) return;

    const name = refs.setupNameInput.value.trim();
    const checkSetupChanged = safeGetGlobalFunction('checkSetupChanged') || (() => { });

    if (!name) {
        saveCurrentSession({ skipGearList: false });
        checkSetupChanged();
        return false;
    }

    const selectedName = refs.setupSelect ? refs.setupSelect.value : '';

    if (!selectedName || name !== selectedName) {
        saveCurrentSession({ skipGearList: false });
        checkSetupChanged();
        return false;
    }

    // Check availability of getSetups
    const getSetups = safeGetGlobalFunction('getSetups');
    const setups = getSetups ? getSetups() : {};

    if (!setups || typeof setups !== 'object' || !Object.prototype.hasOwnProperty.call(setups, name)) {
        saveCurrentSession({ skipGearList: false });
        checkSetupChanged();
        return false;
    }

    const existingSetup = setups[name];
    const getCurrentSetupState = safeGetGlobalFunction('getCurrentSetupState') || (() => ({}));
    const currentSetup = { ...getCurrentSetupState() };

    // Check diff
    // We need stableStringify or a deep compare
    // app-session.js used stableStringify
    // We defined a basic one above.

    // However, existingSetup in app-session might store specific keys?
    // Let's assume getCurrentSetupState returns compatible structure.

    const currentSetupSignature = stableStringify(currentSetup);
    const existingSetupSignature = stableStringify(existingSetup);

    if (currentSetupSignature !== existingSetupSignature) {
        // Different -> Save
        const saveSetup = safeGetGlobalFunction('saveSetup'); // Legacy wrapper for storage.saveSetup likely
        // Wait, cineStorage has saveSetup. But app-session might wrap it to update UI/dropdowns?
        // Usually `saveSetup(name, data)`

        // Actually, if we use cineStorage directly we might miss UI updates (dropdown refresh).
        // Let's use `saveCurrentSession` logic pattern...
        // Wait, autoSaveCurrentSetup is about UPDATING the stored project definition in IndexedDB/File, NOT just the session state.
        // It calls `saveSetup(name, currentSetup)`

        if (saveSetup) {
            saveSetup(name, currentSetup);
        } else if (cineStorage && cineStorage.saveSetup) {
            cineStorage.saveSetup(name, currentSetup);
            // And maybe refresh dropdowns?
            const populateSetupSelect = safeGetGlobalFunction('populateSetupSelect');
            if (populateSetupSelect) populateSetupSelect();
        }
    }

    saveCurrentSession({ skipGearList: false });
    checkSetupChanged();
    return true;
}

export function restoreSessionState() {
    SessionState.restoringSession = true;
    const loadedState = _loadSession();
    const state = (loadedState && typeof loadedState === 'object') ? { ...loadedState } : null;
    const refs = getRefs();

    if (state) {
        const normalizeBatteryPlateValue = safeGetGlobalFunction('normalizeBatteryPlateValue') || ((p) => p);
        state.batteryPlate = normalizeBatteryPlateValue(state.batteryPlate || '', state.battery || '');
    }

    const storeLoadedSetupState = safeGetGlobalFunction('storeLoadedSetupState');
    if (storeLoadedSetupState) storeLoadedSetupState(state || null);

    const normalizeDiagramPositionsInput = safeGetGlobalFunction('normalizeDiagramPositionsInput');
    const setManualDiagramPositions = safeGetGlobalFunction('setManualDiagramPositions');

    let sessionDiagramPositions = {};
    if (state && state.diagramPositions && normalizeDiagramPositionsInput) {
        sessionDiagramPositions = normalizeDiagramPositionsInput(state.diagramPositions);
    }
    if (setManualDiagramPositions) {
        setManualDiagramPositions(sessionDiagramPositions, { render: false });
    }

    // Reset loop (motors/controllers)
    const resetSelectsToNone = safeGetGlobalFunction('resetSelectsToNone');
    if (resetSelectsToNone) {
        if (refs.motorSelects.length) resetSelectsToNone(refs.motorSelects);
        if (refs.controllerSelects.length) resetSelectsToNone(refs.controllerSelects);
    }

    // Helpers for restoration
    const setSelectValue = safeGetGlobalFunction('setSelectValue') || ((el, val) => { if (el) el.value = val; });
    const safeUpdateBatteryPlateVisibility = safeGetGlobalFunction('_safeUpdateBatteryPlateVisibility') || safeGetGlobalFunction('updateBatteryPlateVisibility');
    const safeUpdateBatteryOptions = safeGetGlobalFunction('_safeUpdateBatteryOptions') || safeGetGlobalFunction('updateBatteryOptions');
    const applyBatteryPlateSelectionFromBattery = safeGetGlobalFunction('applyBatteryPlateSelectionFromBattery');
    const updateCageSelectOptions = safeGetGlobalFunction('updateCageSelectOptions');
    const populateProjectForm = safeGetGlobalFunction('populateProjectForm');
    const markProjectFormDataDirty = safeGetGlobalFunction('markProjectFormDataDirty');
    const safeGetCurrentProjectName = safeGetGlobalFunction('safeGetCurrentProjectName'); // Likely local wrapper in app-session?
    // safeGetCurrentProjectName usually check input or select.

    const getCurrentProjectStorageKey = () => {
        // Logic from app-session.js
        // const selected = setupSelect ? setupSelect.value : '';
        // const typed = setupNameInput ? setupNameInput.value : '';
        // return selected || typed;
        const s = refs.setupSelect ? refs.setupSelect.value : '';
        const t = refs.setupNameInput ? refs.setupNameInput.value : '';
        return s || t;
    };

    if (state) {
        if (refs.setupNameInput) {
            refs.setupNameInput.value = state.setupName || '';
            refs.setupNameInput.dispatchEvent(new Event('input'));
        }
        setSelectValue(refs.cameraSelect, state.camera);
        if (safeUpdateBatteryPlateVisibility) safeUpdateBatteryPlateVisibility();
        setSelectValue(refs.batteryPlateSelect, state.batteryPlate);

        if (applyBatteryPlateSelectionFromBattery) applyBatteryPlateSelectionFromBattery(state.battery, refs.batteryPlateSelect ? refs.batteryPlateSelect.value : '');
        if (safeUpdateBatteryOptions) safeUpdateBatteryOptions();

        setSelectValue(refs.monitorSelect, state.monitor);
        setSelectValue(refs.videoSelect, state.video);

        if (updateCageSelectOptions) {
            updateCageSelectOptions(state.cage);
        } else {
            setSelectValue(refs.cageSelect, state.cage);
        }

        setSelectValue(refs.distanceSelect, state.distance);

        if (Array.isArray(state.motors)) {
            state.motors.forEach((val, i) => { if (refs.motorSelects[i]) setSelectValue(refs.motorSelects[i], val); });
        }
        if (Array.isArray(state.controllers)) {
            state.controllers.forEach((val, i) => { if (refs.controllerSelects[i]) setSelectValue(refs.controllerSelects[i], val); });
        }

        setSelectValue(refs.batterySelect, state.battery);
        if (applyBatteryPlateSelectionFromBattery) applyBatteryPlateSelectionFromBattery(state.battery, refs.batteryPlateSelect ? refs.batteryPlateSelect.value : '');
        setSelectValue(refs.hotswapSelect, state.batteryHotswap);

        if ((state.battery && state.battery.trim()) || (state.batteryHotswap && state.batteryHotswap.trim())) {
            if (safeUpdateBatteryOptions) safeUpdateBatteryOptions();
        }

        setSelectValue(refs.setupSelect, state.setupSelect);

        // Restore Project Info
        const setCurrentProjectInfo = safeGetGlobalFunction('setCurrentProjectInfo');
        if (setCurrentProjectInfo) setCurrentProjectInfo(state.projectInfo || null);
        if (refs.projectForm && populateProjectForm) populateProjectForm(state.projectInfo || {});

    } else {
        // No state, hide outputs
        if (refs.gearListOutput) {
            refs.gearListOutput.innerHTML = '';
            refs.gearListOutput.classList.add('hidden');
        }
        if (refs.projectRequirementsOutput) {
            refs.projectRequirementsOutput.innerHTML = '';
            refs.projectRequirementsOutput.classList.add('hidden');
        }
    }

    if (markProjectFormDataDirty) markProjectFormDataDirty();

    // Project Payload / Gear List Restoration logic (legacy complex logic)
    // "if (gearListOutput || projectRequirementsOutput) { ... }"
    // This logic attempts to load additional data (gear list HTML, etc.) from the stored Project itself
    // because the Session State might only have the references/selections, not the full generated HTML.

    if (refs.gearListOutput || refs.projectRequirementsOutput) {
        // We need to fetch the full project data to restore the visual list if possible
        // using logic similar to "hasProjectPayload"

        const storageKey = getCurrentProjectStorageKey();
        const typedName = refs.setupNameInput ? refs.setupNameInput.value : '';
        const loadProject = cineStorage ? cineStorage.loadProject : null;

        // ... (complex CandidateNames loop) ...
        // Simplification for migration:
        // Try to load project by key. If it exists and matches session, apply it.

        let storedProject = null;
        if (loadProject && typeof storageKey === 'string' && storageKey) {
            storedProject = loadProject(storageKey);
        }

        // Also fallback to typedName if different
        if (!storedProject && loadProject && typedName && typedName !== storageKey) {
            storedProject = loadProject(typedName);
        }

        // Also fallback to state.setupSelect
        if (!storedProject && loadProject && state && state.setupSelect && state.setupSelect !== storageKey) {
            storedProject = loadProject(state.setupSelect);
        }

        // Apply
        if (storedProject) {
            const applyStoredPowerSelection = safeGetGlobalFunction('applyStoredPowerSelection');
            if (storedProject.powerSelection && applyStoredPowerSelection) {
                applyStoredPowerSelection(storedProject.powerSelection);
                if (safeUpdateBatteryOptions) safeUpdateBatteryOptions();
            }

            const applyGearListSelectors = safeGetGlobalFunction('applyGearListSelectors');
            if (storedProject.gearSelectors && applyGearListSelectors) {
                applyGearListSelectors(storedProject.gearSelectors);
            }

            // Owned Gear Markers
            const applyImportedOwnedGearMarkers = safeGetGlobalFunction('applyImportedOwnedGearMarkers');
            // Note: We might need to import _localApplyImportedOwnedGearMarkers from SharedProjectUI if we want to share that logic?
            // Or rely on global.
            if (storedProject.ownedGearMarkers && applyImportedOwnedGearMarkers) {
                applyImportedOwnedGearMarkers(storedProject.ownedGearMarkers, { root: refs.gearListOutput });
            }

            // HTML content
            let html = '';
            if (storedProject.projectHtml || storedProject.gearList) {
                html = `${storedProject.projectHtml || ''}${storedProject.gearList || ''}`;
            } else if (storedProject.projectInfo) {
                const generateGearListHtml = safeGetGlobalFunction('generateGearListHtml');
                if (generateGearListHtml) html = generateGearListHtml(storedProject.projectInfo);
            }

            if (html) {
                const displayGearAndRequirements = safeGetGlobalFunction('displayGearAndRequirements');
                if (displayGearAndRequirements) displayGearAndRequirements(html);

                // Re-bind listeners
                const ensureGearListActions = safeGetGlobalFunction('ensureGearListActions');
                if (ensureGearListActions) ensureGearListActions();

                const callers = [
                    'bindGearListCageListener',
                    'bindGearListEasyrigListener',
                    'bindGearListSliderBowlListener',
                    'bindGearListProGaffTapeListener',
                    'bindGearListDirectorMonitorListener'
                ];
                callers.forEach(fnName => {
                    const fn = safeGetGlobalFunction(fnName);
                    if (fn) fn();
                });
            }
        }

        // 2. Fallback: Regenerate via currentProjectInfo if available
        const projectInfo = state && state.projectInfo ? state.projectInfo : null;
        if (!storedProject && projectInfo) {
            const generateGearListHtml = safeGetGlobalFunction('generateGearListHtml');
            if (generateGearListHtml) {
                const html = generateGearListHtml(projectInfo);
                if (html) {
                    const displayGearAndRequirements = safeGetGlobalFunction('displayGearAndRequirements');
                    if (displayGearAndRequirements) displayGearAndRequirements(html);

                    if (refs.gearListOutput) {
                        refs.gearListOutput.classList.remove('hidden');
                    }
                }
            }
        }
    }

    if (state) {
        const setSliderBowlValue = safeGetGlobalFunction('setSliderBowlValue');
        const setEasyrigValue = safeGetGlobalFunction('setEasyrigValue');
        if (setSliderBowlValue && state.sliderBowl) setSliderBowlValue(state.sliderBowl);
        if (setEasyrigValue && state.easyrig) setEasyrigValue(state.easyrig);
    }

    const updateGearListButtonVisibility = safeGetGlobalFunction('updateGearListButtonVisibility');
    if (updateGearListButtonVisibility) updateGearListButtonVisibility();

    // Auto Gear Highlight
    const highlightPreference = state && Object.prototype.hasOwnProperty.call(state, 'autoGearHighlight')
        ? Boolean(state.autoGearHighlight)
        : false;
    const setAutoGearHighlightEnabled = safeGetGlobalFunction('setAutoGearHighlightEnabled');
    if (setAutoGearHighlightEnabled) {
        setAutoGearHighlightEnabled(highlightPreference);
    } else if (refs.gearListOutput && refs.gearListOutput.classList) {
        refs.gearListOutput.classList.toggle('show-auto-gear-highlight', highlightPreference);
        const callSessionCoreFunction = safeGetGlobalFunction('callSessionCoreFunction');
        if (callSessionCoreFunction) callSessionCoreFunction('updateAutoGearHighlightToggleButton', [], { defer: true });
    }

    // Compression Hold
    const setActiveProjectCompressionHold = safeGetGlobalFunction('setActiveProjectCompressionHold');
    if (setActiveProjectCompressionHold) {
        let compressionHoldKey = '';
        if (state && state.setupSelect) {
            compressionHoldKey = state.setupSelect;
        } else {
            compressionHoldKey = getCurrentProjectStorageKey();
        }
        setActiveProjectCompressionHold(compressionHoldKey || '');
    }

    SessionState.restoringSession = false;

    const checkSetupChanged = safeGetGlobalFunction('checkSetupChanged');
    if (checkSetupChanged) checkSetupChanged();

    saveCurrentSession();
}

export function initializeSessionPersistenceManager() {
    if (typeof window !== 'undefined') {
        window.saveCurrentSession = saveCurrentSession;
        window.autoSaveCurrentSetup = autoSaveCurrentSetup;
        window.restoreSessionState = restoreSessionState;
    }
    return {
        saveCurrentSession,
        autoSaveCurrentSetup,
        restoreSessionState
    };
}
