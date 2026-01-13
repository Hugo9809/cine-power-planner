/**
 * @fileoverview ES Module Shim for Storage Functions
 *
 * This module re-exports existing global storage functions as ES module exports.
 * It provides a bridge between the legacy global-based architecture and the
 * new ES module system, allowing gradual migration without breaking changes.
 *
 * IMPORTANT: This is a shim layer - it does NOT modify the underlying storage
 * implementation. All functions are still executed from the global scope.
 */

/**
 * Safely get a global function, returning a no-op if not available.
 * @param {string} name - Function name on the global scope
 * @returns {Function} The global function or a no-op
 */
function getGlobal(name) {
    const scope = typeof globalThis !== 'undefined' ? globalThis :
        typeof window !== 'undefined' ? window :
            typeof self !== 'undefined' ? self : {};
    return typeof scope[name] === 'function' ? scope[name] : () => {
        console.warn(`[storage-shim] ${name} not available yet`);
        return null;
    };
}

// ============================================================================
// Project Management
// ============================================================================

/** Load a project by name */
export const loadProject = (...args) => getGlobal('loadProject')(...args);

/** Load metadata for all projects (lightweight, no full data) */
export const loadProjectMetadata = (...args) => getGlobal('loadProjectMetadata')(...args);

/** Save a project */
export const saveProject = (...args) => getGlobal('saveProject')(...args);

/** Delete a project by name */
export const deleteProject = (...args) => getGlobal('deleteProject')(...args);

/** Rename a project */
export const renameProject = (...args) => getGlobal('renameProject')(...args);

/** Create a backup before deleting a project */
export const createProjectDeletionBackup = (...args) => getGlobal('createProjectDeletionBackup')(...args);

/** Get the project storage revision key name */
export const getProjectStorageRevisionKeyName = (...args) => getGlobal('getProjectStorageRevisionKeyName')(...args);

/** Load the project storage revision */
export const loadProjectStorageRevision = (...args) => getGlobal('loadProjectStorageRevision')(...args);

/** Invalidate the project read cache */
export const invalidateProjectReadCache = (...args) => getGlobal('invalidateProjectReadCache')(...args);

// ============================================================================
// Setup Management (Legacy)
// ============================================================================

/** Load all setups */
export const loadSetups = (...args) => getGlobal('loadSetups')(...args);

/** Save all setups */
export const saveSetups = (...args) => getGlobal('saveSetups')(...args);

/** Save a single setup */
export const saveSetup = (...args) => getGlobal('saveSetup')(...args);

/** Load a single setup */
export const loadSetup = (...args) => getGlobal('loadSetup')(...args);

/** Delete a setup */
export const deleteSetup = (...args) => getGlobal('deleteSetup')(...args);

/** Rename a setup */
export const renameSetup = (...args) => getGlobal('renameSetup')(...args);

// ============================================================================
// Device Management
// ============================================================================

/** Load device data */
export const loadDeviceData = (...args) => getGlobal('loadDeviceData')(...args);

/** Save device data */
export const saveDeviceData = (...args) => getGlobal('saveDeviceData')(...args);

// ============================================================================
// Session State
// ============================================================================

/** Load session state */
export const loadSessionState = (...args) => getGlobal('loadSessionState')(...args);

/** Save session state */
export const saveSessionState = (...args) => getGlobal('saveSessionState')(...args);

// ============================================================================
// Contacts
// ============================================================================

/** Load contacts */
export const loadContacts = (...args) => getGlobal('loadContacts')(...args);

/** Save contacts */
export const saveContacts = (...args) => getGlobal('saveContacts')(...args);

// ============================================================================
// Own Gear
// ============================================================================

/** Load own gear inventory */
export const loadOwnGear = (...args) => getGlobal('loadOwnGear')(...args);

/** Save own gear inventory */
export const saveOwnGear = (...args) => getGlobal('saveOwnGear')(...args);

// ============================================================================
// User Profile
// ============================================================================

/** Load user profile */
export const loadUserProfile = (...args) => getGlobal('loadUserProfile')(...args);

/** Save user profile */
export const saveUserProfile = (...args) => getGlobal('saveUserProfile')(...args);

// ============================================================================
// Auto Gear System
// ============================================================================

/** Load auto gear rules */
export const loadAutoGearRules = (...args) => getGlobal('loadAutoGearRules')(...args);

/** Save auto gear rules */
export const saveAutoGearRules = (...args) => getGlobal('saveAutoGearRules')(...args);

/** Load auto gear presets */
export const loadAutoGearPresets = (...args) => getGlobal('loadAutoGearPresets')(...args);

/** Save auto gear presets */
export const saveAutoGearPresets = (...args) => getGlobal('saveAutoGearPresets')(...args);

/** Load auto gear active preset ID */
export const loadAutoGearActivePresetId = (...args) => getGlobal('loadAutoGearActivePresetId')(...args);

/** Save auto gear active preset ID */
export const saveAutoGearActivePresetId = (...args) => getGlobal('saveAutoGearActivePresetId')(...args);

/** Load auto gear backups */
export const loadAutoGearBackups = (...args) => getGlobal('loadAutoGearBackups')(...args);

/** Save auto gear backups */
export const saveAutoGearBackups = (...args) => getGlobal('saveAutoGearBackups')(...args);

// ============================================================================
// Favorites
// ============================================================================

/** Load favorites */
export const loadFavorites = (...args) => getGlobal('loadFavorites')(...args);

/** Save favorites */
export const saveFavorites = (...args) => getGlobal('saveFavorites')(...args);

// ============================================================================
// Feedback
// ============================================================================

/** Load user feedback data */
export const loadFeedback = (...args) => getGlobal('loadFeedback')(...args);

/** Save user feedback data */
export const saveFeedback = (...args) => getGlobal('saveFeedback')(...args);

// ============================================================================
// Data Import/Export
// ============================================================================

/** Export all data for backup */
export const exportAllData = (...args) => getGlobal('exportAllData')(...args);

/** Import all data from backup */
export const importAllData = (...args) => getGlobal('importAllData')(...args);

/** Prepare backup for export */
export const prepareBackupForExport = (...args) => getGlobal('prepareBackupForExport')(...args);

/** Clear all data (factory reset) */
export const clearAllData = (...args) => getGlobal('clearAllData')(...args);

// ============================================================================
// Utilities
// ============================================================================

/** Get safe localStorage reference */
export const getSafeLocalStorage = (...args) => getGlobal('getSafeLocalStorage')(...args);

/** Request persistent storage */
export const requestPersistentStorage = (...args) => getGlobal('requestPersistentStorage')(...args);

/** Decode a stored value (handles compression) */
export const decodeStoredValue = (...args) => getGlobal('decodeStoredValue')(...args);

/** Ensure critical storage backups */
export const ensureCriticalStorageBackups = (...args) => getGlobal('ensureCriticalStorageBackups')(...args);

// ============================================================================
// Full Backup History
// ============================================================================

/** Load full backup history */
export const loadFullBackupHistory = (...args) => getGlobal('loadFullBackupHistory')(...args);

/** Save full backup history */
export const saveFullBackupHistory = (...args) => getGlobal('saveFullBackupHistory')(...args);

/** Record a full backup history entry */
export const recordFullBackupHistoryEntry = (...args) => getGlobal('recordFullBackupHistoryEntry')(...args);

// ============================================================================
// Default Export (all functions)
// ============================================================================

export default {
    // Project management
    loadProject,
    loadProjectMetadata,
    saveProject,
    deleteProject,
    renameProject,
    createProjectDeletionBackup,
    getProjectStorageRevisionKeyName,
    loadProjectStorageRevision,
    invalidateProjectReadCache,

    // Setup management
    loadSetups,
    saveSetups,
    saveSetup,
    loadSetup,
    deleteSetup,
    renameSetup,

    // Device management
    loadDeviceData,
    saveDeviceData,

    // Session state
    loadSessionState,
    saveSessionState,

    // Contacts
    loadContacts,
    saveContacts,

    // Own gear
    loadOwnGear,
    saveOwnGear,

    // User profile
    loadUserProfile,
    saveUserProfile,

    // Auto gear
    loadAutoGearRules,
    saveAutoGearRules,
    loadAutoGearPresets,
    saveAutoGearPresets,
    loadAutoGearActivePresetId,
    saveAutoGearActivePresetId,
    loadAutoGearBackups,
    saveAutoGearBackups,

    // Favorites
    loadFavorites,
    saveFavorites,

    // Feedback
    loadFeedback,
    saveFeedback,

    // Import/Export
    exportAllData,
    importAllData,
    prepareBackupForExport,
    clearAllData,

    // Utilities
    getSafeLocalStorage,
    requestPersistentStorage,
    decodeStoredValue,
    ensureCriticalStorageBackups,

    // Backup history
    loadFullBackupHistory,
    saveFullBackupHistory,
    recordFullBackupHistoryEntry,
};
