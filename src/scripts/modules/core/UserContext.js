/**
 * @class UserContext
 * Manages the current user identity (UUID) and device identity for sync/locks.
 * - userId: Persistent anonymous identifier for the user (survives factory reset on same device)
 * - deviceId: Per-browser-profile identifier for lock management
 * - sessionId: Per-tab identifier for fine-grained lock tracking
 */
export class UserContext {
    constructor() {
        this.userId = null;
        this.deviceId = null;
        this.sessionId = null;
        this.storageKey = 'cine_user_uuid';
        this.deviceStorageKey = 'cine_device_uuid';
    }

    /**
     * Generates a cryptographically random UUID or fallback.
     * @returns {string}
     */
    generateUUID() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback for older environments
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    /**
     * Initializes the user context.
     * Checks localStorage for existing UUID, otherwise generates one.
     */
    init() {
        if (this.userId && this.deviceId && this.sessionId) return this.userId;

        // User ID (persistent across sessions)
        let uuid = localStorage.getItem(this.storageKey);
        if (!uuid) {
            uuid = this.generateUUID();
            localStorage.setItem(this.storageKey, uuid);
            console.log('[UserContext] Generated new User UUID:', uuid);
        } else {
            console.log('[UserContext] Loaded User UUID:', uuid);
        }
        this.userId = uuid;

        // Device ID (persistent per browser profile, for cross-tab coordination)
        let deviceId = localStorage.getItem(this.deviceStorageKey);
        if (!deviceId) {
            deviceId = this.generateUUID();
            localStorage.setItem(this.deviceStorageKey, deviceId);
            console.log('[UserContext] Generated new Device UUID:', deviceId);
        }
        this.deviceId = deviceId;

        // Session ID (unique per tab, for lock granularity)
        this.sessionId = this.generateUUID();
        console.log('[UserContext] Session UUID:', this.sessionId);

        return uuid;
    }

    getUserId() {
        if (!this.userId) return this.init();
        return this.userId;
    }

    /**
     * Returns the device UUID (unique per browser profile).
     * Used for cross-device lock detection via cloud sync.
     */
    getDeviceId() {
        if (!this.deviceId) this.init();
        return this.deviceId;
    }

    /**
     * Returns the session UUID (unique per tab).
     * Used for same-device, cross-tab lock coordination.
     */
    getSessionId() {
        if (!this.sessionId) this.init();
        return this.sessionId;
    }

    /**
     * Scopes a storage key with the current user ID.
     * @param {string} key 
     */
    getScopedKey(key) {
        const uuid = this.getUserId();
        return `user_${uuid}_${key}`;
    }

    /**
     * Returns a full identity object for sync metadata.
     */
    getIdentity() {
        return {
            userId: this.getUserId(),
            deviceId: this.getDeviceId(),
            sessionId: this.getSessionId(),
        };
    }

    /**
     * Clears the user identity (Factory Reset).
     * Note: Does NOT clear deviceId to maintain device tracking.
     */
    reset() {
        localStorage.removeItem(this.storageKey);
        this.userId = null;
        this.sessionId = null;
    }
}

export const userContext = new UserContext();

