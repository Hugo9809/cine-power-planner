/**
 * Project Loader Module
 * 
 * Handles the logic for reloading projects from storage, ensuring data consistency,
 * and managing the hydration of the application state from persisted data.
 */

import { cineStorage } from '../../storage.js';
import { ProjectStorageManager } from './project-storage-manager.js';
import { SessionState } from './session-state.js';
import * as Legacy from './legacy-interop.js';

// Helper to access globals that might not be imported conventionally
const getGlobal = (name) => {
    if (typeof globalThis !== 'undefined') return globalThis[name];
    if (typeof window !== 'undefined') return window[name];
    return null;
};

// Stable stringify helper (fallback to JSON.stringify if not available globally)
const stableStringify = (obj) => {
    const fn = getGlobal('stableStringify');
    if (typeof fn === 'function') return fn(obj);
    return JSON.stringify(obj); // Fallback, though less optimal for comparison
};

// Global accessor helpers
const getSetupSelect = () => typeof document !== 'undefined' ? document.getElementById('setupSelect') : null;
const getProjectForm = () => typeof document !== 'undefined' ? document.getElementById('projectForm') : null;
const getGearListOutput = () => typeof document !== 'undefined' ? document.getElementById('gearListOutput') : null;

/**
 * Reloads the active project from storage into the application state.
 * 
 * @param {Object} options 
 * @param {boolean} options.silent - If true, suppresses console warnings/info.
 * @returns {boolean} True if reload occurred or was skipped due to optimization; false if failed or blocked.
 */
export function reloadActiveProjectFromStorage(options = {}) {
    if (SessionState.factoryResetInProgress || SessionState.restoringSession) {
        return false;
    }

    const wasProjectAutoSaving = SessionState.isProjectAutoSaving;
    SessionState.isProjectAutoSaving = true;

    try {
        const isSuspendedFn = getGlobal('isProjectPersistenceSuspended');
        if (typeof isSuspendedFn === 'function' && isSuspendedFn()) {
            return false;
        }

        const { loadProject } = cineStorage;
        if (typeof loadProject !== 'function') {
            return false;
        }

        const storageKey = ProjectStorageManager.resolveActiveProjectStorageKey(getSetupSelect());
        if (!storageKey) {
            return false;
        }

        let storedProject = null;
        try {
            storedProject = loadProject(storageKey);
        } catch (projectLoadError) {
            if (!options.silent && typeof console !== 'undefined') {
                console.warn('Failed to reload project from storage after external update', projectLoadError);
            }
            return false;
        }

        if (!storedProject || typeof storedProject !== 'object') {
            // Project deleted/renamed externally
            handleProjectDisappearance(options);
            return false;
        }

        // Optimization: Skip reload if data hasn't changed
        if (shouldSkipReload(storedProject)) {
            return true;
        }

        // Apply Project Data
        applyProjectData(storedProject, storageKey, options);

        return true;
    } finally {
        SessionState.isProjectAutoSaving = wasProjectAutoSaving;
    }
}

function handleProjectDisappearance(options) {
    const setupSelect = getSetupSelect();
    const previousValue = setupSelect ? setupSelect.value : '';

    const populateSetupSelect = getGlobal('populateSetupSelect');
    if (typeof populateSetupSelect === 'function') {
        try { populateSetupSelect(); } catch (e) { void e; }
    }

    if (setupSelect && typeof setupSelect.value !== 'undefined') {
        setupSelect.value = '';
        if (previousValue !== '') {
            try {
                setupSelect.dispatchEvent(new Event('change', { bubbles: true }));
            } catch (e) { void e; }
        }
    }

    SessionState.currentProjectInfo = null;
    const projectForm = getProjectForm();
    const populateProjectForm = getGlobal('populateProjectForm');
    if (projectForm && typeof populateProjectForm === 'function') {
        try { populateProjectForm({}); } catch (e) { void e; }
    }

    if (!options.silent && typeof console !== 'undefined') {
        console.info('[project-loader] Project no longer exists, reset to New Project state');
    }
}

function shouldSkipReload(storedProject) {
    const getCurrentSetupState = getGlobal('getCurrentSetupState');
    const getCurrentGearListHtml = getGlobal('getCurrentGearListHtml');
    const getDiagramManualPositions = getGlobal('getDiagramManualPositions');

    if (typeof getCurrentSetupState !== 'function') return false;

    try {
        const currentSetup = { ...getCurrentSetupState() };

        const gearListHtml = typeof getCurrentGearListHtml === 'function'
            ? getCurrentGearListHtml()
            : '';

        if (gearListHtml) {
            currentSetup.gearList = gearListHtml;
        }

        if (typeof getDiagramManualPositions === 'function') {
            const diagramPositions = getDiagramManualPositions();
            if (diagramPositions && Object.keys(diagramPositions).length) {
                currentSetup.diagramPositions = diagramPositions;
            } else if (Object.prototype.hasOwnProperty.call(currentSetup, 'diagramPositions')) {
                delete currentSetup.diagramPositions;
            }
        }

        const currentSig = stableStringify(currentSetup);
        const storedSig = stableStringify(storedProject);

        return currentSig === storedSig;
    } catch (e) {
        console.warn('Project reload optimization check failed', e);
        return false;
    }
}

function applyProjectData(storedProject, storageKey, options) {
    // 1. Power Selection
    const applyStoredPowerSelection = getGlobal('applyStoredPowerSelection');
    if (storedProject.powerSelection && typeof applyStoredPowerSelection === 'function') {
        applyStoredPowerSelection(storedProject.powerSelection, { preferExisting: false });
    }
    Legacy.safeUpdateBatteryOptions();

    // 2. Project Info
    SessionState.currentProjectInfo = storedProject.projectInfo || null;
    const populateProjectForm = getGlobal('populateProjectForm');
    const projectForm = getProjectForm();
    if (projectForm && typeof populateProjectForm === 'function') {
        populateProjectForm(SessionState.currentProjectInfo || {});
    }

    // 3. Diagram Positions
    const setManualDiagramPositions = getGlobal('setManualDiagramPositions');
    const normalizeDiagramPositionsInput = getGlobal('normalizeDiagramPositionsInput');
    if (typeof setManualDiagramPositions === 'function') {
        const normalized = storedProject.diagramPositions && typeof normalizeDiagramPositionsInput === 'function'
            ? normalizeDiagramPositionsInput(storedProject.diagramPositions)
            : {};
        setManualDiagramPositions(normalized || {}, { render: false });
    }

    // 4. Auto Gear Rules
    const useProjectAutoGearRules = getGlobal('useProjectAutoGearRules');
    const clearProjectAutoGearRules = getGlobal('clearProjectAutoGearRules');
    if (storedProject.autoGearRules && storedProject.autoGearRules.length) {
        if (typeof useProjectAutoGearRules === 'function') {
            useProjectAutoGearRules(storedProject.autoGearRules);
        }
    } else if (typeof clearProjectAutoGearRules === 'function') {
        clearProjectAutoGearRules();
    }

    // 5. Gear List
    const callSessionCoreFunction = getGlobal('callSessionCoreFunction') || ((name, args) => {
        const fn = getGlobal(name);
        return fn ? fn(...args) : null;
    });

    const regenerateGearList = (info) => callSessionCoreFunction(
        'generateGearListHtml',
        [info || {}],
        { defaultValue: '' }
    ) || '';

    const storedHtml = typeof storedProject.gearList === 'string' ? storedProject.gearList : '';
    const html = storedHtml || regenerateGearList(SessionState.currentProjectInfo || {});

    const displayGearAndRequirements = getGlobal('displayGearAndRequirements');
    if (typeof displayGearAndRequirements === 'function') {
        displayGearAndRequirements(html);
    }

    // 6. Gear List Bindings (Wait, this is complex logic in app-session.js, I should preserve it)
    const gearListOutput = getGearListOutput();
    if (gearListOutput) {
        if (html) {
            Legacy.safeInvokeSessionOpenAutoGearEditor(); // Actually, this was ensureGearListActions etc.
            // Re-binding listeners using globals
            const ensureGearListActions = getGlobal('ensureGearListActions');
            if (ensureGearListActions) ensureGearListActions();

            ['bindGearListCageListener', 'bindGearListEasyrigListener',
                'bindGearListSliderBowlListener', 'bindGearListEyeLeatherListener',
                'bindGearListProGaffTapeListener', 'bindGearListDirectorMonitorListener'].forEach(fnName => {
                    const fn = getGlobal(fnName);
                    if (fn) fn();
                });
        }

        const applyGearListSelectors = getGlobal('applyGearListSelectors');
        if (
            typeof applyGearListSelectors === 'function'
            && storedProject.gearSelectors
            && Object.keys(storedProject.gearSelectors).length
        ) {
            applyGearListSelectors(storedProject.gearSelectors);
        }

        const updateGearListButtonVisibility = getGlobal('updateGearListButtonVisibility');
        if (updateGearListButtonVisibility) updateGearListButtonVisibility();
    }

    // 7. Setup Select Restoration
    const populateSetupSelect = getGlobal('populateSetupSelect');
    if (typeof populateSetupSelect === 'function') {
        try {
            populateSetupSelect();
            if (storageKey) {
                const setupSelect = getSetupSelect();
                if (setupSelect) setupSelect.value = storageKey;
            }
        } catch (e) {
            if (!options.silent) console.warn('Failed to refresh setup selector', e);
        }
    }

    // 8. Final Updates
    const markProjectFormDataDirty = getGlobal('markProjectFormDataDirty');
    if (markProjectFormDataDirty) markProjectFormDataDirty();

    const storeLoadedSetupStateSafe = getGlobal('storeLoadedSetupStateSafe');
    const getCurrentSetupState = getGlobal('getCurrentSetupState');
    if (storeLoadedSetupStateSafe && getCurrentSetupState) {
        storeLoadedSetupStateSafe(getCurrentSetupState());
    }

    Legacy.safeCheckSetupChanged();
}
