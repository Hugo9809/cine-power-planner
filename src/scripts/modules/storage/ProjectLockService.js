import { userContext } from '../core/UserContext.js';
import {
    createLock,
    updateLockHeartbeat,
    getLockStatus,
    LockStatus
} from './SyncMetadata.js';

/**
 * @class ProjectLockService
 * 
 * Manages project edit locks to prevent simultaneous editing across:
 * - Multiple browser tabs (same device)
 * - Multiple devices (via cloud sync)
 * 
 * Lock Strategy:
 * 1. BroadcastChannel for instant cross-tab coordination (same browser)
 * 2. localStorage/IndexedDB heartbeats for persistence (survives page refresh)
 * 3. Cloud lock document for cross-device coordination (future Firebase)
 * 
 * Lock Lifecycle:
 * - Acquire: Check if unlocked → Set lock → Start heartbeat
 * - Heartbeat: Update timestamp every 5s to prove "still alive"
 * - Release: Clear lock on page unload or explicit release
 * - Takeover: Force acquire when user confirms takeover prompt
 * 
 * Timeout: Lock expires if heartbeat not updated for 30 seconds
 */

const LOCK_CHANNEL_NAME = 'cine-project-locks';
const HEARTBEAT_INTERVAL_MS = 5000; // 5 seconds
const LOCK_TIMEOUT_MS = 30000; // 30 seconds
const LOCK_STORAGE_PREFIX = 'cine_project_lock_';

// Event types for BroadcastChannel
const LockEvent = Object.freeze({
    LOCK_ACQUIRED: 'lock_acquired',
    LOCK_RELEASED: 'lock_released',
    LOCK_HEARTBEAT: 'lock_heartbeat',
    LOCK_TAKEOVER: 'lock_takeover',
    LOCK_QUERY: 'lock_query',
    LOCK_STATUS: 'lock_status',
});

/**
 * @typedef {Object} Lock
 * @property {string} projectId - The project being locked
 * @property {string} userId - Owner of the lock
 * @property {string} deviceId - Device holding the lock
 * @property {string} sessionId - Tab/session holding the lock
 * @property {string} acquiredAt - ISO timestamp when lock was acquired
 * @property {string} heartbeat - ISO timestamp of last heartbeat
 */

class ProjectLockService {
    constructor() {
        /** @type {BroadcastChannel|null} */
        this.channel = null;

        /** @type {Map<string, Lock>} Project ID -> Lock */
        this.localLocks = new Map();

        /** @type {Map<string, number>} Project ID -> Interval ID */
        this.heartbeatIntervals = new Map();

        /** @type {Set<Function>} */
        this.lockChangeListeners = new Set();

        /** @type {boolean} */
        this.initialized = false;
    }

    /**
     * Initializes the lock service.
     * Must be called before using any lock operations.
     */
    init() {
        if (this.initialized) return;

        // Ensure UserContext is initialized
        userContext.init();

        // Setup BroadcastChannel for cross-tab coordination
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(LOCK_CHANNEL_NAME);
                this.channel.onmessage = (event) => this._handleChannelMessage(event);
                console.log('[ProjectLockService] BroadcastChannel initialized');
            } catch (err) {
                console.warn('[ProjectLockService] BroadcastChannel not available:', err);
            }
        }

        // Restore locks from localStorage (for page refresh scenarios)
        this._restoreLocksFromStorage();

        // Setup page unload handler to release locks
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', () => this._handlePageUnload());
            window.addEventListener('pagehide', () => this._handlePageUnload());
        }

        this.initialized = true;
        console.log('[ProjectLockService] Initialized');
    }

    /**
     * Attempts to acquire a lock on a project.
     * @param {string} projectId - Project to lock
     * @param {Object} [options] - Lock options
     * @param {boolean} [options.force] - Force takeover even if locked by another
     * @returns {Promise<{ success: boolean, status: string, lock: Lock|null }>}
     */
    async acquireLock(projectId, options = {}) {
        this.init();

        const existingLock = this._getStoredLock(projectId);
        const status = this._getLockStatusForLock(existingLock);

        // Already locked by current session
        if (status === LockStatus.LOCKED_BY_SELF) {
            return { success: true, status, lock: existingLock };
        }

        // Locked by another and not forcing takeover
        if (status !== LockStatus.UNLOCKED && !options.force) {
            return { success: false, status, lock: existingLock };
        }

        // If forcing takeover, notify the other session
        if (options.force && existingLock) {
            this._broadcastTakeover(projectId, existingLock);
        }

        // Create and store the lock
        const lock = this._createLockObject(projectId);
        this._storeLock(projectId, lock);
        this.localLocks.set(projectId, lock);

        // Start heartbeat
        this._startHeartbeat(projectId);

        // Notify other tabs
        this._broadcastLockAcquired(projectId, lock);

        // Notify local listeners
        this._notifyListeners(projectId, LockStatus.LOCKED_BY_SELF, lock);

        console.log('[ProjectLockService] Lock acquired:', projectId);
        return { success: true, status: LockStatus.LOCKED_BY_SELF, lock };
    }

    /**
     * Releases a lock on a project.
     * @param {string} projectId - Project to unlock
     * @returns {Promise<boolean>} Whether release was successful
     */
    async releaseLock(projectId) {
        this.init();

        const existingLock = this._getStoredLock(projectId);
        const status = this._getLockStatusForLock(existingLock);

        // Can only release own locks
        if (status !== LockStatus.LOCKED_BY_SELF) {
            console.warn('[ProjectLockService] Cannot release lock not owned by this session');
            return false;
        }

        // Stop heartbeat
        this._stopHeartbeat(projectId);

        // Remove lock
        this._clearStoredLock(projectId);
        this.localLocks.delete(projectId);

        // Notify other tabs
        this._broadcastLockReleased(projectId);

        // Notify local listeners
        this._notifyListeners(projectId, LockStatus.UNLOCKED, null);

        console.log('[ProjectLockService] Lock released:', projectId);
        return true;
    }

    /**
     * Gets the current lock status for a project.
     * @param {string} projectId - Project to check
     * @returns {{ status: string, lock: Lock|null, isEditable: boolean }}
     */
    getLockInfo(projectId) {
        this.init();

        const lock = this._getStoredLock(projectId);
        const status = this._getLockStatusForLock(lock);

        return {
            status,
            lock: lock,
            isEditable: status === LockStatus.UNLOCKED || status === LockStatus.LOCKED_BY_SELF,
        };
    }

    /**
     * Subscribes to lock change events.
     * @param {Function} callback - Called with (projectId, status, lock)
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
        this.lockChangeListeners.add(callback);
        return () => this.lockChangeListeners.delete(callback);
    }

    /**
     * Refreshes the heartbeat for a lock.
     * Called automatically, but can be triggered manually.
     * @param {string} projectId 
     */
    refreshHeartbeat(projectId) {
        const lock = this.localLocks.get(projectId);
        if (!lock) return;

        const identity = userContext.getIdentity();

        // Verify we still own this lock
        if (lock.sessionId !== identity.sessionId) {
            this._stopHeartbeat(projectId);
            return;
        }

        // Update heartbeat
        lock.heartbeat = new Date().toISOString();
        this._storeLock(projectId, lock);

        // Notify other tabs
        this._broadcastHeartbeat(projectId, lock);
    }

    // --- Private Methods ---

    _createLockObject(projectId) {
        const identity = userContext.getIdentity();
        const now = new Date().toISOString();

        return {
            projectId,
            userId: identity.userId,
            deviceId: identity.deviceId,
            sessionId: identity.sessionId,
            acquiredAt: now,
            heartbeat: now,
        };
    }

    _getStorageKey(projectId) {
        return LOCK_STORAGE_PREFIX + projectId;
    }

    _storeLock(projectId, lock) {
        try {
            localStorage.setItem(this._getStorageKey(projectId), JSON.stringify(lock));
        } catch (err) {
            console.warn('[ProjectLockService] Failed to store lock:', err);
        }
    }

    _getStoredLock(projectId) {
        try {
            const data = localStorage.getItem(this._getStorageKey(projectId));
            if (!data) return null;

            const lock = JSON.parse(data);

            // Check if lock has expired
            if (this._isLockExpired(lock)) {
                this._clearStoredLock(projectId);
                return null;
            }

            return lock;
        } catch (err) {
            console.warn('[ProjectLockService] Failed to read lock:', err);
            return null;
        }
    }

    _clearStoredLock(projectId) {
        try {
            localStorage.removeItem(this._getStorageKey(projectId));
        } catch (err) {
            console.warn('[ProjectLockService] Failed to clear lock:', err);
        }
    }

    _isLockExpired(lock) {
        if (!lock || !lock.heartbeat) return true;
        const age = Date.now() - new Date(lock.heartbeat).getTime();
        return age > LOCK_TIMEOUT_MS;
    }

    _getLockStatusForLock(lock) {
        if (!lock || this._isLockExpired(lock)) {
            return LockStatus.UNLOCKED;
        }

        const identity = userContext.getIdentity();

        if (lock.sessionId === identity.sessionId) {
            return LockStatus.LOCKED_BY_SELF;
        }

        if (lock.deviceId === identity.deviceId) {
            return LockStatus.LOCKED_BY_OTHER_TAB;
        }

        return LockStatus.LOCKED_BY_OTHER_DEVICE;
    }

    _startHeartbeat(projectId) {
        this._stopHeartbeat(projectId); // Clear any existing

        const intervalId = setInterval(() => {
            this.refreshHeartbeat(projectId);
        }, HEARTBEAT_INTERVAL_MS);

        this.heartbeatIntervals.set(projectId, intervalId);
    }

    _stopHeartbeat(projectId) {
        const intervalId = this.heartbeatIntervals.get(projectId);
        if (intervalId) {
            clearInterval(intervalId);
            this.heartbeatIntervals.delete(projectId);
        }
    }

    _restoreLocksFromStorage() {
        const identity = userContext.getIdentity();

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key || !key.startsWith(LOCK_STORAGE_PREFIX)) continue;

                const projectId = key.slice(LOCK_STORAGE_PREFIX.length);
                const lock = this._getStoredLock(projectId);

                // Only restore locks owned by this session
                if (lock && lock.sessionId === identity.sessionId) {
                    this.localLocks.set(projectId, lock);
                    this._startHeartbeat(projectId);
                    console.log('[ProjectLockService] Restored lock:', projectId);
                }
            }
        } catch (err) {
            console.warn('[ProjectLockService] Failed to restore locks:', err);
        }
    }

    _handlePageUnload() {
        // Release all locks held by this session
        for (const projectId of this.localLocks.keys()) {
            this._stopHeartbeat(projectId);
            this._clearStoredLock(projectId);
            this._broadcastLockReleased(projectId);
        }
        this.localLocks.clear();
    }

    _notifyListeners(projectId, status, lock) {
        for (const callback of this.lockChangeListeners) {
            try {
                callback(projectId, status, lock);
            } catch (err) {
                console.warn('[ProjectLockService] Listener error:', err);
            }
        }
    }

    // --- BroadcastChannel Methods ---

    _broadcast(type, data) {
        if (!this.channel) return;
        try {
            this.channel.postMessage({ type, ...data });
        } catch (err) {
            console.warn('[ProjectLockService] Broadcast failed:', err);
        }
    }

    _broadcastLockAcquired(projectId, lock) {
        this._broadcast(LockEvent.LOCK_ACQUIRED, { projectId, lock });
    }

    _broadcastLockReleased(projectId) {
        this._broadcast(LockEvent.LOCK_RELEASED, { projectId });
    }

    _broadcastHeartbeat(projectId, lock) {
        this._broadcast(LockEvent.LOCK_HEARTBEAT, { projectId, lock });
    }

    _broadcastTakeover(projectId, oldLock) {
        this._broadcast(LockEvent.LOCK_TAKEOVER, { projectId, oldLock });
    }

    _handleChannelMessage(event) {
        const { type, projectId, lock, oldLock } = event.data || {};
        if (!projectId) return;

        const identity = userContext.getIdentity();

        switch (type) {
            case LockEvent.LOCK_ACQUIRED:
                // Another tab acquired a lock
                if (lock && lock.sessionId !== identity.sessionId) {
                    this._notifyListeners(projectId, this._getLockStatusForLock(lock), lock);
                }
                break;

            case LockEvent.LOCK_RELEASED:
                // Another tab released a lock
                this._notifyListeners(projectId, LockStatus.UNLOCKED, null);
                break;

            case LockEvent.LOCK_TAKEOVER:
                // Another tab is taking over our lock
                if (oldLock && oldLock.sessionId === identity.sessionId) {
                    console.warn('[ProjectLockService] Lock taken over by another tab:', projectId);
                    this._stopHeartbeat(projectId);
                    this.localLocks.delete(projectId);
                    this._notifyListeners(projectId, LockStatus.LOCKED_BY_OTHER_TAB, null);
                }
                break;

            case LockEvent.LOCK_HEARTBEAT:
                // Update our knowledge of external lock heartbeat
                if (lock && lock.sessionId !== identity.sessionId) {
                    this._storeLock(projectId, lock);
                }
                break;
        }
    }

    /**
     * Cleanup method for testing or shutdown.
     */
    destroy() {
        // Stop all heartbeats
        for (const projectId of this.heartbeatIntervals.keys()) {
            this._stopHeartbeat(projectId);
        }

        // Close channel
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }

        this.localLocks.clear();
        this.lockChangeListeners.clear();
        this.initialized = false;
    }
}

// Export singleton instance
export const projectLockService = new ProjectLockService();

export default projectLockService;
