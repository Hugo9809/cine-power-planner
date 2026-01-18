/**
 * Event Storage Helpers
 *
 * Extracted from src/scripts/core/app-events.js.
 * Provides storage utilities specifically used by the event handling system.
 */

import * as cineStorage from '../../storage.js';

const STORAGE_BACKUP_SUFFIX = '__backup';
const STORAGE_MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';

const STORAGE_HELPERS = (function resolveStorageHelpers() {
    const resolved = {};

    const assignHelper = (source, key) => {
        if (!source || typeof resolved[key] === 'function') {
            return;
        }
        const value = source[key];
        if (typeof value === 'function') {
            resolved[key] = value;
        }
    };

    // Try importing from storage module explicitly
    if (cineStorage) {
        assignHelper(cineStorage, 'getSafeLocalStorage');
        assignHelper(cineStorage, 'saveDeviceData');
        assignHelper(cineStorage, 'clearUiCacheStorageEntries');
        assignHelper(cineStorage, 'getDeviceStorageKeyVariants');
        assignHelper(cineStorage, 'getStorageKeyVariants');
    }

    // Fallback to searching globals
    const scopeCandidates = [];
    if (typeof globalThis !== 'undefined') scopeCandidates.push(globalThis);
    if (typeof window !== 'undefined') scopeCandidates.push(window);
    if (typeof self !== 'undefined') scopeCandidates.push(self);

    for (const scope of scopeCandidates) {
        if (!scope) continue;
        assignHelper(scope, 'getSafeLocalStorage');
        assignHelper(scope, 'saveDeviceData');
        assignHelper(scope, 'clearUiCacheStorageEntries');

        if (resolved.getSafeLocalStorage && resolved.saveDeviceData && resolved.clearUiCacheStorageEntries) {
            break;
        }
    }

    return resolved;
})();

export function clearDeviceStorageVariant(keyVariant, options) {
    if (typeof keyVariant !== 'string' || !keyVariant) {
        return false;
    }

    const settings = options || {};
    const removalKeys = new Set();
    removalKeys.add(keyVariant);
    removalKeys.add(`${keyVariant}${STORAGE_BACKUP_SUFFIX}`);
    removalKeys.add(`${keyVariant}${STORAGE_MIGRATION_BACKUP_SUFFIX}`);

    let removed = false;
    const logPrefix = settings.logPrefix || 'Failed to clear device storage variant';

    const storageCandidates = new Set();

    if (STORAGE_HELPERS.getSafeLocalStorage) {
        try {
            const safeStorage = STORAGE_HELPERS.getSafeLocalStorage();
            if (safeStorage) storageCandidates.add(safeStorage);
        } catch (e) {
            console.warn(`${logPrefix}: safe storage lookup failed`, e);
        }
    }

    if (typeof localStorage !== 'undefined') storageCandidates.add(localStorage);
    if (typeof window !== 'undefined' && window.localStorage) storageCandidates.add(window.localStorage);

    const removalTargets = Array.from(removalKeys);

    storageCandidates.forEach((storage) => {
        if (!storage || typeof storage.removeItem !== 'function') return;

        removalTargets.forEach(removalKey => {
            try {
                storage.removeItem(removalKey);
                removed = true;
            } catch (e) {
                console.warn(`${logPrefix} "${removalKey}"`, e);
            }
        });
    });

    if (STORAGE_HELPERS.clearUiCacheStorageEntries) {
        try {
            STORAGE_HELPERS.clearUiCacheStorageEntries(removalTargets);
        } catch (e) {
            console.warn('Failed to clear UI cache entries for device storage reset', e);
        }
    }

    return removed;
}

export function getDeviceStorageKeyVariants() {
    if (STORAGE_HELPERS.getDeviceStorageKeyVariants) {
        return Array.from(STORAGE_HELPERS.getDeviceStorageKeyVariants());
    }
    if (STORAGE_HELPERS.getStorageKeyVariants) {
        return Array.from(STORAGE_HELPERS.getStorageKeyVariants(DEVICE_STORAGE_KEY));
    }

    // Fallback logic
    const variants = new Set();
    variants.add(DEVICE_STORAGE_KEY);
    if (DEVICE_STORAGE_KEY.startsWith('cameraPowerPlanner_')) {
        variants.add(`cinePowerPlanner_${DEVICE_STORAGE_KEY.slice('cameraPowerPlanner_'.length)}`);
    } else if (DEVICE_STORAGE_KEY.startsWith('cinePowerPlanner_')) {
        variants.add(`cameraPowerPlanner_${DEVICE_STORAGE_KEY.slice('cinePowerPlanner_'.length)}`);
    }
    return Array.from(variants);
}

export function clearAllDeviceStorageVariants() {
    const variants = getDeviceStorageKeyVariants();
    if (!variants) return false;

    let clearedAny = false;
    variants.forEach((keyVariant) => {
        if (keyVariant === DEVICE_STORAGE_KEY && STORAGE_HELPERS.saveDeviceData) {
            try {
                STORAGE_HELPERS.saveDeviceData(null);
                clearedAny = true;
            } catch (e) {
                console.warn('Failed to clear primary device storage via saveDeviceData', e);
            }
        }

        if (clearDeviceStorageVariant(keyVariant, { logPrefix: 'Failed to clear device storage variant' })) {
            clearedAny = true;
        }
    });

    return clearedAny;
}

export const CABLE_SUBCATEGORY_FALLBACK_KEYS = Object.freeze(['power', 'video', 'fiz', 'cables']);

export function getCableSubcategoryKeysForUi(preferredKeys) {
    const values = [];
    const seen = new Set();

    const pushKey = (key) => {
        if (typeof key !== 'string') return;
        const trimmed = key.trim();
        if (!trimmed || seen.has(trimmed)) return;
        seen.add(trimmed);
        values.push(trimmed);
    };

    // Try to get from deviceSchema global
    try {
        const schema = typeof deviceSchema !== 'undefined' ? deviceSchema : null;
        if (schema?.accessories?.cables) {
            Object.keys(schema.accessories.cables).forEach(pushKey);
        }
    } catch (e) { }

    CABLE_SUBCATEGORY_FALLBACK_KEYS.forEach(pushKey);

    // Try to get from devices global
    try {
        const devicesRoot = typeof devices !== 'undefined' ? devices : null;
        if (devicesRoot?.accessories?.cables) {
            Object.keys(devicesRoot.accessories.cables).forEach(pushKey);
        }
    } catch (e) { }

    if (Array.isArray(preferredKeys)) {
        preferredKeys.forEach(pushKey);
    } else if (preferredKeys) {
        pushKey(preferredKeys);
    }

    return values;
}
