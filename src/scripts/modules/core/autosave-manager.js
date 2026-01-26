/**
 * Autosave Manager
 *
 * Manages the scheduling and execution of project auto-saves.
 * Decouples timer logic from the actual save implementations.
 */

import { SessionState } from './session-state.js';

// --- Constants ---

export const PROJECT_AUTOSAVE_BASE_DELAY_MS = 300;
export const PROJECT_AUTOSAVE_RETRY_DELAY_MS = 900;
export const PROJECT_AUTOSAVE_RETRY_CAP_MS = 5000;
export const PROJECT_AUTOSAVE_MAX_RETRIES = 4;

// --- State ---

let projectAutoSaveTimer = null;
let projectAutoSaveFailureCount = 0;
let projectAutoSavePendingWhileRestoring = null;
let isProjectAutoSaving = false;

let projectAutoSaveOverrides = null;
let projectAutoSaveLastRequestContext = null;

// --- Callbacks (Injection) ---

const callbacks = {
    saveCurrentSession: async () => ({ ok: true }),
    autoSaveCurrentSetup: async () => ({ ok: true }),
    saveCurrentGearList: async () => ({ ok: true }),
    checkSetupChanged: () => { },
};

export function configureAutosaveManager(newCallbacks = {}) {
    Object.assign(callbacks, newCallbacks);
}

// --- Helpers ---

export function notifyAutoBackupChange(details) {
    try {
        const scope = typeof globalThis !== 'undefined'
            ? globalThis
            : (typeof window !== 'undefined'
                ? window
                : (typeof self !== 'undefined' ? self : null));
        const notifier = scope && typeof scope.__cineNoteAutoBackupChange === 'function'
            ? scope.__cineNoteAutoBackupChange
            : null;
        if (notifier) {
            notifier(details || {});
        }
    } catch (changeError) {
        console.warn('Failed to record auto backup change context', changeError);
    }
}

export function setProjectAutoSaveOverrides(overrides) {
    if (!overrides || typeof overrides !== 'object') {
        projectAutoSaveOverrides = null;
        return;
    }
    const context = {};
    if (overrides.setupNameState && typeof overrides.setupNameState === 'object') {
        const state = overrides.setupNameState;
        const typedName = typeof state.typedName === 'string' ? state.typedName : '';
        const selectedName = typeof state.selectedName === 'string' ? state.selectedName : '';
        const storageKey = typeof state.storageKey === 'string' ? state.storageKey : '';
        const renameInProgress = typeof state.renameInProgress === 'boolean'
            ? state.renameInProgress
            : Boolean(selectedName && typedName && typedName !== selectedName);
        const typedNameHasTrailingWhitespace = Boolean(
            typedName
            && state
            && typeof state.typedNameHasTrailingWhitespace === 'boolean'
            && state.typedNameHasTrailingWhitespace,
        );
        context.setupNameState = {
            typedName,
            selectedName,
            storageKey,
            renameInProgress,
            typedNameHasTrailingWhitespace,
        };
    }
    projectAutoSaveOverrides = context.setupNameState ? context : null;
}

export function getProjectAutoSaveOverrides() {
    return projectAutoSaveOverrides;
}

export function clearProjectAutoSaveOverrides() {
    projectAutoSaveOverrides = null;
}

function getProjectAutoSaveDelay() {
    if (projectAutoSaveFailureCount <= 0) {
        return PROJECT_AUTOSAVE_BASE_DELAY_MS;
    }
    const scaledDelay = PROJECT_AUTOSAVE_BASE_DELAY_MS
        + PROJECT_AUTOSAVE_RETRY_DELAY_MS * (projectAutoSaveFailureCount - 1);
    return Math.min(scaledDelay, PROJECT_AUTOSAVE_RETRY_CAP_MS);
}

// --- Main Autosave Logic ---

export function runProjectAutoSave() {
    console.log('DEBUG: runProjectAutoSave ENTERED');

    isProjectAutoSaving = true;
    try {
        if (SessionState.factoryResetInProgress) {
            if (projectAutoSaveTimer) {
                clearTimeout(projectAutoSaveTimer);
                projectAutoSaveTimer = null;
            }
            clearProjectAutoSaveOverrides();
            return;
        }

        if (SessionState.restoringSession) {
            projectAutoSaveTimer = null;
            if (projectAutoSavePendingWhileRestoring !== 'immediate') {
                projectAutoSavePendingWhileRestoring = projectAutoSavePendingWhileRestoring || 'queued';
            }
            return;
        }

        projectAutoSaveTimer = null;
        projectAutoSavePendingWhileRestoring = null;

        const pendingRequestContext = projectAutoSaveLastRequestContext;
        projectAutoSaveLastRequestContext = null;

        let encounteredError = false;

        const guard = (fn, context, onSuccess) => {
            if (typeof fn !== 'function') {
                return { ok: true, result: undefined };
            }
            try {
                const result = fn();
                if (typeof onSuccess === 'function') {
                    try {
                        onSuccess(result);
                    } catch (callbackError) {
                        console.warn('Auto backup mutation observer callback failed', callbackError);
                    }
                }
                return { ok: true, result };
            } catch (error) {
                encounteredError = true;
                console.error(`Project autosave failed while ${context}.`, error);
                return { ok: false, result: undefined };
            }
        };

        let setupMutationDetected = false;
        let gearListMutationDetected = false;

        // We assume the caller handles logic related to checking if saving is needed
        // But actually, runProjectAutoSave contained a check for hasSetupName.
        // We will delegate that to the callbacks or assume callbacks handle it?
        // The original code accessed setupNameInput directly.
        // It's better if we just call the registered saveCurrentSession, which will likely check inputs.
        // Wait, the original code had specific logic:
        // if (!hasSetupName) saveCurrentSession();
        // setupSaveResult = guard(autoSaveCurrentSetup...);

        // We should probably rely on the callbacks returning meaningful results or handling the checks.
        // However, the original code flow was slightly orchestrated here.
        // Let's rely on `autoSaveCurrentSetup` callback.

        // REPLICATION OF ORIGINAL LOGIC structure:

        // 1. Save Session (Always, or fallback?)
        // Original: 
        // const hasSetupName = ...
        // if (!hasSetupName) guard(saveCurrentSession...);

        // We can't access setupNameInput here easily. 
        // We will invoke a helper callback `shouldSaveSetupBasedOnName()`?
        // Or just invoke `saveCurrentSession` always? 
        // `autoSaveCurrentSetup` inside `app-session.js` handles most named logic.

        // Let's improve the callback contract:
        // callbacks.checkHasSetupName() -> boolean

        const hasSetupName = callbacks.checkHasSetupName ? callbacks.checkHasSetupName() : true;

        if (!hasSetupName) {
            guard(() => callbacks.saveCurrentSession(), 'saving the current session state');
        }

        const setupSaveResult = guard(
            callbacks.autoSaveCurrentSetup,
            'saving the current setup',
            (result) => {
                if (result === true) {
                    setupMutationDetected = true;
                }
            },
        );

        if (!setupSaveResult.ok) {
            // Fallback
            guard(
                () => callbacks.saveCurrentSession({ skipGearList: true }),
                'saving the current session state as a fallback',
            );
        }

        guard(
            callbacks.saveCurrentGearList,
            'saving the gear list',
            (result) => {
                if (result === true) {
                    gearListMutationDetected = true;
                }
            },
        );

        if (encounteredError) {
            if (projectAutoSaveFailureCount < PROJECT_AUTOSAVE_MAX_RETRIES) {
                projectAutoSaveFailureCount += 1;
                scheduleProjectAutoSave();
            } else if (projectAutoSaveFailureCount === PROJECT_AUTOSAVE_MAX_RETRIES) {
                console.warn('Project autosave retries have been paused after repeated failures.');
            }
            clearProjectAutoSaveOverrides();
            return;
        }

        projectAutoSaveFailureCount = 0;
        clearProjectAutoSaveOverrides();

        if (!encounteredError && (setupMutationDetected || gearListMutationDetected)) {
            const contextNow = Date.now();
            const requestTimestamp = pendingRequestContext && typeof pendingRequestContext.requestedAt === 'number'
                && Number.isFinite(pendingRequestContext.requestedAt)
                ? pendingRequestContext.requestedAt
                : contextNow;
            notifyAutoBackupChange({
                commit: true,
                context: {
                    immediate: Boolean(pendingRequestContext && pendingRequestContext.immediate),
                    overrides: Boolean(pendingRequestContext && pendingRequestContext.overrides),
                    requestedAt: requestTimestamp,
                    completedAt: contextNow,
                },
            });
        }
    } finally {
        isProjectAutoSaving = false;
    }
}

export function scheduleProjectAutoSave(immediateOrOptions = false) {
    if (isProjectAutoSaving) {
        return;
    }
    if (typeof window !== 'undefined' && window.cineSuppressAutosave) {
        return;
    }
    let immediate = false;
    let overrides;
    if (typeof immediateOrOptions === 'object' && immediateOrOptions !== null) {
        immediate = Boolean(immediateOrOptions.immediate);
        overrides = immediateOrOptions.overrides;
    } else {
        immediate = Boolean(immediateOrOptions);
        overrides = undefined;
    }

    const overridesProvided = overrides !== undefined;

    if (overridesProvided) {
        setProjectAutoSaveOverrides(overrides);
    }

    if (SessionState.factoryResetInProgress) {
        if (projectAutoSaveTimer) {
            clearTimeout(projectAutoSaveTimer);
            projectAutoSaveTimer = null;
        }
        clearProjectAutoSaveOverrides();
        return;
    }
    if (SessionState.restoringSession) {
        if (projectAutoSaveTimer) {
            clearTimeout(projectAutoSaveTimer);
            projectAutoSaveTimer = null;
        }
        const pendingState = immediate ? 'immediate' : 'queued';
        if (projectAutoSavePendingWhileRestoring !== 'immediate') {
            projectAutoSavePendingWhileRestoring = pendingState;
        }
        return;
    }
    projectAutoSavePendingWhileRestoring = null;

    const requestTimestamp = Date.now();
    projectAutoSaveLastRequestContext = {
        immediate,
        overrides: overridesProvided,
        requestedAt: requestTimestamp,
    };

    notifyAutoBackupChange({ immediate, overrides: overridesProvided, pending: true });
    if (immediate) {
        if (projectAutoSaveTimer) {
            clearTimeout(projectAutoSaveTimer);
            projectAutoSaveTimer = null;
        }
        console.log('DEBUG: scheduleProjectAutoSave calling runProjectAutoSave');
        runProjectAutoSave();
        console.log('DEBUG: scheduleProjectAutoSave executed runProjectAutoSave');
        return;
    }
    if (projectAutoSaveTimer) {
        clearTimeout(projectAutoSaveTimer);
    }
    const delay = getProjectAutoSaveDelay();
    projectAutoSaveTimer = setTimeout(runProjectAutoSave, delay);
    if (
        projectAutoSaveTimer &&
        typeof projectAutoSaveTimer === 'object' &&
        typeof projectAutoSaveTimer.unref === 'function'
    ) {
        projectAutoSaveTimer.unref();
    }
}
