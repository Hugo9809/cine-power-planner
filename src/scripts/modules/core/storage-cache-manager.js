/**
 * Storage Cache Manager
 * Handles UI cache storage clearing and management for reload operations
 */

const UI_CACHE_STORAGE_KEYS_FOR_RELOAD = [
    'cameraPowerPlanner_schemaCache',
    'cinePowerPlanner_schemaCache',
];

const UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = [
    '',
    '__backup',
    '__legacyMigrationBackup',
];

const uiCacheFallbackWarningKeys = new Set();

function resolveSafeLocalStorage() {
    const candidates = [
        typeof SAFE_LOCAL_STORAGE !== 'undefined' ? SAFE_LOCAL_STORAGE : null,
        typeof window !== 'undefined' && window.SAFE_LOCAL_STORAGE ? window.SAFE_LOCAL_STORAGE : null,
        typeof globalThis !== 'undefined' && globalThis.SAFE_LOCAL_STORAGE ? globalThis.SAFE_LOCAL_STORAGE : null,
        typeof localStorage !== 'undefined' ? localStorage : null,
    ];

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (candidate && typeof candidate === 'object') {
            return candidate;
        }
    }

    return null;
}

function collectFallbackUiCacheStorages() {
    const storages = new Set();

    const registerStorage = (candidate, label) => {
        if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
            return;
        }
        const hasRemove = typeof candidate.removeItem === 'function';
        const hasDelete = typeof candidate.delete === 'function';
        if (!hasRemove && !hasDelete) {
            return;
        }
        storages.add(candidate);
    };

    const inspectScope = (scope, label) => {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return;
        }

        try {
            registerStorage(scope.localStorage, `${label}.localStorage`);
        } catch (error) {
            if (!uiCacheFallbackWarningKeys.has(`${label}.localStorage`)) {
                uiCacheFallbackWarningKeys.add(`${label}.localStorage`);
                console.warn(`Unable to inspect ${label}.localStorage while clearing UI caches`, error);
            }
        }

        try {
            registerStorage(scope.sessionStorage, `${label}.sessionStorage`);
        } catch (error) {
            if (!uiCacheFallbackWarningKeys.has(`${label}.sessionStorage`)) {
                uiCacheFallbackWarningKeys.add(`${label}.sessionStorage`);
                console.warn(`Unable to inspect ${label}.sessionStorage while clearing UI caches`, error);
            }
        }

        let nested = null;
        try {
            nested = scope.__cineGlobal;
        } catch (error) {
            if (!uiCacheFallbackWarningKeys.has(`${label}.__cineGlobal`)) {
                uiCacheFallbackWarningKeys.add(`${label}.__cineGlobal`);
                console.warn(`Unable to inspect ${label}.__cineGlobal while clearing UI caches`, error);
            }
        }

        if (nested && nested !== scope) {
            inspectScope(nested, `${label}.__cineGlobal`);
        }
    };

    registerStorage(resolveSafeLocalStorage(), 'safeLocalStorage');

    if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
        try {
            registerStorage(SAFE_LOCAL_STORAGE, 'SAFE_LOCAL_STORAGE');
        } catch (error) {
            if (!uiCacheFallbackWarningKeys.has('SAFE_LOCAL_STORAGE')) {
                uiCacheFallbackWarningKeys.add('SAFE_LOCAL_STORAGE');
                console.warn('Unable to inspect SAFE_LOCAL_STORAGE while clearing UI caches', error);
            }
        }
    }

    const scopeCandidates = [
        { scope: typeof globalThis !== 'undefined' ? globalThis : null, label: 'globalThis' },
        { scope: typeof window !== 'undefined' ? window : null, label: 'window' },
        { scope: typeof self !== 'undefined' ? self : null, label: 'self' },
        { scope: typeof global !== 'undefined' ? global : null, label: 'global' },
    ];

    if (typeof __cineGlobal !== 'undefined') {
        scopeCandidates.push({ scope: __cineGlobal, label: '__cineGlobal' });
    }

    scopeCandidates.forEach(({ scope, label }) => {
        inspectScope(scope, label);
    });

    if (typeof localStorage !== 'undefined') {
        registerStorage(localStorage, 'localStorage');
    }

    if (typeof sessionStorage !== 'undefined') {
        registerStorage(sessionStorage, 'sessionStorage');
    }

    return storages;
}

function clearUiCacheEntriesFallback() {
    const storages = collectFallbackUiCacheStorages();
    if (!storages || !storages.size) {
        return;
    }

    storages.forEach((storage) => {
        UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach((baseKey) => {
            if (typeof baseKey !== 'string' || !baseKey) {
                return;
            }

            UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach((suffix) => {
                const entryKey = suffix ? `${baseKey}${suffix}` : baseKey;
                try {
                    if (typeof storage.removeItem === 'function') {
                        storage.removeItem(entryKey);
                    } else if (typeof storage.delete === 'function') {
                        storage.delete(entryKey);
                    }
                } catch (error) {
                    console.warn('Failed to remove UI cache entry', entryKey, error);
                }
            });
        });
    });
}

export const StorageCacheManager = {
    UI_CACHE_STORAGE_KEYS_FOR_RELOAD,
    UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD,
    resolveSafeLocalStorage,
    collectFallbackUiCacheStorages,
    clearUiCacheEntriesFallback,
};
