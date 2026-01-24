/**
 * Session State Module
 * 
 * Manages mutable state variables that were previously global or module-scoped in app-session.js.
 * Provides a central store for session status, flags, and volatile runtime data.
 */

const state = {
    isProjectAutoSaving: false,
    projectStorageSyncTimer: null,
    projectStorageSyncInProgress: false,
    lastKnownProjectStorageRevision: null,
    missingMountVoltageWarnings: null,
    currentLockController: null,
    currentProjectInfo: null,
    showAutoBackups: true,
    factoryResetInProgress: false,
    restoringSession: false
};

const SessionState = {
    get isProjectAutoSaving() { return state.isProjectAutoSaving; },
    set isProjectAutoSaving(v) { state.isProjectAutoSaving = !!v; },

    get projectStorageSyncTimer() { return state.projectStorageSyncTimer; },
    set projectStorageSyncTimer(v) { state.projectStorageSyncTimer = v; },

    get projectStorageSyncInProgress() { return state.projectStorageSyncInProgress; },
    set projectStorageSyncInProgress(v) { state.projectStorageSyncInProgress = !!v; },

    get lastKnownProjectStorageRevision() { return state.lastKnownProjectStorageRevision; },
    set lastKnownProjectStorageRevision(v) { state.lastKnownProjectStorageRevision = v; },

    get missingMountVoltageWarnings() { return state.missingMountVoltageWarnings; },
    set missingMountVoltageWarnings(v) { state.missingMountVoltageWarnings = v; },

    get currentLockController() { return state.currentLockController; },
    set currentLockController(v) { state.currentLockController = v; },

    get currentProjectInfo() { return state.currentProjectInfo; },
    set currentProjectInfo(v) { state.currentProjectInfo = v; },

    get showAutoBackups() { return state.showAutoBackups; },
    set showAutoBackups(v) { state.showAutoBackups = !!v; },

    // These might be used by reload guards
    get factoryResetInProgress() { return state.factoryResetInProgress; },
    set factoryResetInProgress(v) { state.factoryResetInProgress = !!v; },

    get restoringSession() { return state.restoringSession; },
    set restoringSession(v) { state.restoringSession = !!v; },

    // reset all state (useful for tests or complete reloads)
    reset() {
        state.isProjectAutoSaving = false;
        state.projectStorageSyncTimer = null;
        state.projectStorageSyncInProgress = false;
        state.lastKnownProjectStorageRevision = null;
        state.missingMountVoltageWarnings = null;
        state.currentLockController = null;
        state.currentProjectInfo = null;
        state.showAutoBackups = true;
        state.factoryResetInProgress = false;
        state.restoringSession = false;
    }
};

export { SessionState };
