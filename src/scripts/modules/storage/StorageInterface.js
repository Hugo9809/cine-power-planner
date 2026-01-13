/**
 * @interface StorageInterface
 * Defines the standard contract for all storage drivers (LocalStorage, IndexedDB, etc.).
 * All methods must return Promises to ensure future compatibility with asynchronous engines.
 */
export default class StorageInterface {
    /**
     * Initialize the storage driver
     * @returns {Promise<void>}
     */
    async init() {
        throw new Error('Method "init()" must be implemented.');
    }

    /**
     * Retrieve an item by key
     * @param {string} key 
     * @returns {Promise<any>} The parsed value or null
     */
    async getItem(key) {
        throw new Error('Method "getItem()" must be implemented.');
    }

    /**
     * Save an item by key
     * @param {string} key 
     * @param {any} value 
     * @returns {Promise<void>}
     */
    async setItem(key, value) {
        throw new Error('Method "setItem()" must be implemented.');
    }

    /**
     * Remove an item by key
     * @param {string} key 
     * @returns {Promise<void>}
     */
    async removeItem(key) {
        throw new Error('Method "removeItem()" must be implemented.');
    }

    /**
     * Clear all keys managed by this driver context
     * @returns {Promise<void>}
     */
    async clear() {
        throw new Error('Method "clear()" must be implemented.');
    }

    /**
     * Get all keys stored by this driver
     * @returns {Promise<string[]>}
     */
    async getKeys() {
        throw new Error('Method "getKeys()" must be implemented.');
    }
}
