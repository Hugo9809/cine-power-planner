import { safeGetCurrentProjectName } from './project-manager.js';

const PROJECT_STORAGE_REV_KEY_FALLBACK = 'cameraPowerPlanner_project_rev';

let projectStorageSyncTimer = null;
let projectStorageSyncInProgress = false;
let lastKnownProjectStorageRevision = null;

function resolveSessionRuntimeFunction(name, scope = typeof window !== 'undefined' ? window : {}) {
    // Simple check for global availability
    return typeof scope[name] === 'function' ? scope[name] : null;
}

function normalizeProjectStorageRevisionValue(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return Math.max(0, Math.floor(value));
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) {
            return null;
        }
        const parsed = Number(trimmed);
        if (Number.isFinite(parsed)) {
            return Math.max(0, Math.floor(parsed));
        }
    }
    return null;
}

function resolveProjectStorageRevisionKeyName() {
    const resolver = resolveSessionRuntimeFunction('getProjectStorageRevisionKeyName');
    if (typeof resolver === 'function') {
        try {
            const resolved = resolver();
            if (typeof resolved === 'string' && resolved.trim()) {
                return resolved.trim();
            }
        } catch (revisionKeyError) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Unable to resolve project storage revision key name', revisionKeyError);
            }
        }
    }
    return PROJECT_STORAGE_REV_KEY_FALLBACK;
}

function readProjectStorageRevisionValue() {
    // Try to use a safe local storage getter if available globally, otherwise fallback
    const getSafeLocalStorage = resolveSessionRuntimeFunction('getSafeLocalStorage');
    const storage =
        typeof getSafeLocalStorage === 'function'
            ? getSafeLocalStorage()
            : (typeof localStorage !== 'undefined' ? localStorage : null);

    if (!storage || typeof storage.getItem !== 'function') {
        return null;
    }
    try {
        const raw = storage.getItem(resolveProjectStorageRevisionKeyName());
        return normalizeProjectStorageRevisionValue(raw);
    } catch (storageReadError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to read project storage revision from localStorage', storageReadError);
        }
        return null;
    }
}

function getSafeLocalStorageShim() {
    if (typeof window !== 'undefined' && typeof window.getSafeLocalStorage === 'function') {
        return window.getSafeLocalStorage();
    }
    return typeof localStorage !== 'undefined' ? localStorage : null;
}

export const ProjectStorageManager = {
    getRevisionKey: resolveProjectStorageRevisionKeyName,
    readRevision: readProjectStorageRevisionValue,

    resolveActiveProjectStorageKey(setupSelectElement) {
        const getCurrentProjectStorageKey = resolveSessionRuntimeFunction('getCurrentProjectStorageKey');

        if (typeof getCurrentProjectStorageKey === 'function') {
            try {
                const storageKey = getCurrentProjectStorageKey({ allowTyped: true });
                if (typeof storageKey === 'string' && storageKey.trim()) {
                    return storageKey;
                }
            } catch (keyError) {
                if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('Unable to resolve active project storage key', keyError);
                }
            }
        }

        const typedName = safeGetCurrentProjectName('');
        if (typedName) {
            return typedName;
        }

        const el = setupSelectElement || (typeof document !== 'undefined' ? document.getElementById('setupSelect') : null);
        if (el && typeof el.value === 'string' && el.value.trim()) {
            return el.value.trim();
        }

        return '';
    },

    scheduleSync(reloadCallback, options = {}) {
        if (projectStorageSyncInProgress) {
            return;
        }
        if (projectStorageSyncTimer) {
            clearTimeout(projectStorageSyncTimer);
        }
        projectStorageSyncTimer = setTimeout(() => {
            projectStorageSyncTimer = null;
            projectStorageSyncInProgress = true;
            try {
                if (typeof reloadCallback === 'function') {
                    reloadCallback({ silent: options.silent });
                }
            } finally {
                projectStorageSyncInProgress = false;
            }
        }, 120);
    },

    initAutoSync(reloadCallback, isProjectAutoSavingChecker) {
        if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
            return;
        }

        try {
            lastKnownProjectStorageRevision = readProjectStorageRevisionValue();
        } catch (revisionBootstrapError) {
            lastKnownProjectStorageRevision = null;
            void revisionBootstrapError;
        }

        window.addEventListener('storage', (event) => {
            if (!event || typeof event !== 'object') {
                return;
            }
            const keyName = resolveProjectStorageRevisionKeyName();
            if (event.key !== keyName) {
                return;
            }
            const nextRevision = normalizeProjectStorageRevisionValue(event.newValue);

            const isSaving = typeof isProjectAutoSavingChecker === 'function'
                ? isProjectAutoSavingChecker()
                : false;

            if (isSaving) {
                if (nextRevision !== null) {
                    lastKnownProjectStorageRevision = nextRevision;
                }
                return;
            }
            if (nextRevision !== null && nextRevision === lastKnownProjectStorageRevision) {
                return;
            }
            lastKnownProjectStorageRevision = nextRevision;

            this.scheduleSync(reloadCallback, { silent: true });
        });
    }
};
