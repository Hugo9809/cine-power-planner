import StorageInterface from '../StorageInterface.js';

/**
 * @class LocalStorageAdapter
 * Adapts specific localStorage operations to the standard asynchronous StorageInterface.
 * Acts as a backward-compatibility layer.
 */
export default class LocalStorageAdapter extends StorageInterface {
    constructor() {
        super();
        this.storage = window.localStorage;
    }

    /** @override */
    async init() {
        // LocalStorage is synchronous and always ready (if available)
        if (!this.storage) {
            throw new Error('LocalStorage is not supported in this environment.');
        }
        return Promise.resolve();
    }

    /** @override */
    async getItem(key) {
        try {
            const raw = this.storage.getItem(key);
            if (raw === null) return null;
            // Attempt generic JSON parse, fallback to raw string if it's not JSON
            try {
                return JSON.parse(raw);
            } catch {
                return raw;
            }
        } catch (e) {
            console.warn(`[LocalStorageAdapter] Failed to get item: ${key}`, e);
            return null;
        }
    }

    /** @override */
    async setItem(key, value) {
        try {
            // Store strings directly, object/arrays as JSON
            const payload = typeof value === 'string' ? value : JSON.stringify(value);
            this.storage.setItem(key, payload);
        } catch (e) {
            console.error(`[LocalStorageAdapter] Failed to save item: ${key}`, e);
            throw e; // Propagate error (e.g., QuotaExceededError)
        }
    }

    /** @override */
    async removeItem(key) {
        try {
            this.storage.removeItem(key);
        } catch (e) {
            console.warn(`[LocalStorageAdapter] Failed to remove item: ${key}`, e);
        }
    }

    /** @override */
    async clear() {
        try {
            this.storage.clear();
        } catch (e) {
            console.warn('[LocalStorageAdapter] Failed to clear storage', e);
        }
    }

    /** @override */
    async getKeys() {
        return Object.keys(this.storage);
    }
}
