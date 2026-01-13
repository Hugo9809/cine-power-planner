import { userContext } from '../core/UserContext.js';

/**
 * @module SyncMetadata
 * 
 * Provides metadata wrappers for all stored data to enable:
 * - Offline-first sync with Firebase
 * - Conflict detection and resolution
 * - Lock management timestamps
 * - Change tracking at document level
 * 
 * All data stored through the sync-aware API gets wrapped with _meta.
 */

// Schema version for future migrations
const SYNC_METADATA_VERSION = 1;

// Sync status constants
export const SyncStatus = Object.freeze({
    /** Data has been synced to cloud */
    SYNCED: 'synced',
    /** Data has local changes not yet synced */
    PENDING: 'pending',
    /** Data has conflicts that need resolution */
    CONFLICT: 'conflict',
    /** Data is being synced right now */
    SYNCING: 'syncing',
    /** Data has never been synced (new) */
    LOCAL_ONLY: 'local_only',
});

// Lock status constants
export const LockStatus = Object.freeze({
    /** No lock held */
    UNLOCKED: 'unlocked',
    /** Locked by current session */
    LOCKED_BY_SELF: 'locked_by_self',
    /** Locked by another session on same device */
    LOCKED_BY_OTHER_TAB: 'locked_by_other_tab',
    /** Locked by another device */
    LOCKED_BY_OTHER_DEVICE: 'locked_by_other_device',
});

/**
 * Generates an ISO timestamp string.
 * @returns {string}
 */
function nowISO() {
    return new Date().toISOString();
}

/**
 * Generates a unique document ID.
 * @param {string} [prefix] - Optional prefix for the ID
 * @returns {string}
 */
export function generateDocId(prefix = 'doc') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}_${timestamp}_${random}`;
}

/**
 * Creates fresh sync metadata for a new document.
 * @param {Object} options - Options for metadata creation
 * @param {string} [options.docId] - Document ID (generated if not provided)
 * @param {string} [options.docType] - Type of document (e.g., 'project', 'settings')
 * @returns {Object} Fresh metadata object
 */
export function createSyncMetadata(options = {}) {
    const identity = userContext.getIdentity();
    const now = nowISO();

    return {
        version: SYNC_METADATA_VERSION,
        docId: options.docId || generateDocId(options.docType || 'doc'),
        docType: options.docType || 'unknown',

        // Ownership
        ownerId: identity.userId,

        // Timestamps
        createdAt: now,
        updatedAt: now,

        // Sync state
        syncStatus: SyncStatus.LOCAL_ONLY,
        syncedAt: null,
        syncError: null,

        // Change tracking
        changeCount: 1,
        lastChangeBy: identity.userId,
        lastChangeDevice: identity.deviceId,
        lastChangeSession: identity.sessionId,

        // Lock state (for active editing)
        lock: null, // Will be { deviceId, sessionId, acquiredAt, heartbeat } when locked

        // Collaboration (future)
        sharedWith: [], // Array of user IDs
        permissions: {}, // { userId: 'read' | 'write' | 'admin' }
    };
}

/**
 * Updates sync metadata when data is modified.
 * @param {Object} existingMeta - Current metadata
 * @returns {Object} Updated metadata
 */
export function updateSyncMetadata(existingMeta) {
    if (!existingMeta || typeof existingMeta !== 'object') {
        return createSyncMetadata();
    }

    const identity = userContext.getIdentity();
    const now = nowISO();

    return {
        ...existingMeta,
        version: SYNC_METADATA_VERSION,
        updatedAt: now,
        syncStatus: existingMeta.syncStatus === SyncStatus.SYNCED
            ? SyncStatus.PENDING
            : existingMeta.syncStatus,
        changeCount: (existingMeta.changeCount || 0) + 1,
        lastChangeBy: identity.userId,
        lastChangeDevice: identity.deviceId,
        lastChangeSession: identity.sessionId,
    };
}

/**
 * Marks metadata as successfully synced.
 * @param {Object} existingMeta - Current metadata
 * @param {string} [serverTimestamp] - Server timestamp if available
 * @returns {Object} Updated metadata
 */
export function markAsSynced(existingMeta, serverTimestamp = null) {
    if (!existingMeta || typeof existingMeta !== 'object') {
        console.warn('[SyncMetadata] Cannot mark null metadata as synced');
        return existingMeta;
    }

    return {
        ...existingMeta,
        syncStatus: SyncStatus.SYNCED,
        syncedAt: serverTimestamp || nowISO(),
        syncError: null,
    };
}

/**
 * Marks metadata as having a sync conflict.
 * @param {Object} existingMeta - Current metadata
 * @param {string} errorMessage - Conflict description
 * @returns {Object} Updated metadata
 */
export function markAsConflict(existingMeta, errorMessage) {
    if (!existingMeta || typeof existingMeta !== 'object') {
        return existingMeta;
    }

    return {
        ...existingMeta,
        syncStatus: SyncStatus.CONFLICT,
        syncError: errorMessage,
    };
}

/**
 * Wraps raw data with sync metadata.
 * @param {any} data - The actual data to store
 * @param {Object} [existingMeta] - Existing metadata to update, or null for new
 * @param {Object} [options] - Options for new metadata
 * @returns {Object} Wrapped data with _meta
 */
export function wrapWithMetadata(data, existingMeta = null, options = {}) {
    const meta = existingMeta
        ? updateSyncMetadata(existingMeta)
        : createSyncMetadata(options);

    return {
        _meta: meta,
        data: data,
    };
}

/**
 * Unwraps data from metadata wrapper.
 * @param {Object} wrapped - Data with _meta wrapper
 * @returns {{ data: any, meta: Object }} Separated data and metadata
 */
export function unwrapMetadata(wrapped) {
    if (!wrapped || typeof wrapped !== 'object') {
        return { data: wrapped, meta: null };
    }

    // Check if this is wrapped data
    if (wrapped._meta && 'data' in wrapped) {
        return { data: wrapped.data, meta: wrapped._meta };
    }

    // Legacy data without metadata wrapper
    return { data: wrapped, meta: null };
}

/**
 * Checks if data has sync metadata.
 * @param {any} data - Data to check
 * @returns {boolean}
 */
export function hasMetadata(data) {
    return data && typeof data === 'object' && '_meta' in data && 'data' in data;
}

/**
 * Determines the lock status of a document relative to current session.
 * @param {Object} meta - Document metadata
 * @returns {string} One of LockStatus values
 */
export function getLockStatus(meta) {
    if (!meta || !meta.lock) {
        return LockStatus.UNLOCKED;
    }

    const identity = userContext.getIdentity();
    const lock = meta.lock;

    // Check if lock has expired (30 second heartbeat timeout)
    const lockAge = Date.now() - new Date(lock.heartbeat || lock.acquiredAt).getTime();
    if (lockAge > 30000) {
        return LockStatus.UNLOCKED; // Lock expired
    }

    // Check session ownership
    if (lock.sessionId === identity.sessionId) {
        return LockStatus.LOCKED_BY_SELF;
    }

    // Check device ownership
    if (lock.deviceId === identity.deviceId) {
        return LockStatus.LOCKED_BY_OTHER_TAB;
    }

    return LockStatus.LOCKED_BY_OTHER_DEVICE;
}

/**
 * Creates a lock object for the current session.
 * @returns {Object} Lock object
 */
export function createLock() {
    const identity = userContext.getIdentity();
    const now = nowISO();

    return {
        userId: identity.userId,
        deviceId: identity.deviceId,
        sessionId: identity.sessionId,
        acquiredAt: now,
        heartbeat: now,
    };
}

/**
 * Updates the heartbeat timestamp of an existing lock.
 * @param {Object} lock - Existing lock object
 * @returns {Object} Updated lock object
 */
export function updateLockHeartbeat(lock) {
    if (!lock) return createLock();

    return {
        ...lock,
        heartbeat: nowISO(),
    };
}

/**
 * Gets items that need syncing from an array of wrapped items.
 * @param {Array} items - Array of wrapped data items
 * @returns {Array} Items with pending sync status
 */
export function getPendingSyncItems(items) {
    if (!Array.isArray(items)) return [];

    return items.filter(item => {
        if (!hasMetadata(item)) return false;
        const { meta } = unwrapMetadata(item);
        return meta && (
            meta.syncStatus === SyncStatus.PENDING ||
            meta.syncStatus === SyncStatus.LOCAL_ONLY
        );
    });
}

export default {
    SyncStatus,
    LockStatus,
    generateDocId,
    createSyncMetadata,
    updateSyncMetadata,
    markAsSynced,
    markAsConflict,
    wrapWithMetadata,
    unwrapMetadata,
    hasMetadata,
    getLockStatus,
    createLock,
    updateLockHeartbeat,
    getPendingSyncItems,
};
