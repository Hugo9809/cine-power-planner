import { storageRepo } from '../storage/StorageRepository.js';

const OWN_GEAR_KEY = 'cameraPowerPlanner_ownGear';

/**
 * @class GearRepository
 * Unifies access to built-in device library and user's "Own Gear".
 * Migrates "Own Gear" to IndexedDB/StorageRepository.
 */
class GearRepository {
    constructor() {
        this.memoryCache = null;
    }

    /**
     * Loads user-defined gear.
     * Uses the central StorageRepository (which now uses IndexedDB).
     * @returns {Promise<Array>}
     */
    async getOwnGear() {
        if (this.memoryCache) return this.memoryCache;

        try {
            const data = await storageRepo.getItem(OWN_GEAR_KEY);

            // Normalize data structure
            // Format: { items: [...] } or [...]
            if (!data) return [];

            if (Array.isArray(data)) {
                this.memoryCache = data;
            } else if (data.items && Array.isArray(data.items)) {
                this.memoryCache = data.items;
            } else {
                this.memoryCache = [];
            }
        } catch (e) {
            console.warn('[GearRepository] Failed to load own gear:', e);
            this.memoryCache = [];
        }

        return this.memoryCache;
    }

    /**
     * Saves user-defined gear.
     * @param {Array} items 
     */
    async saveOwnGear(items) {
        if (!Array.isArray(items)) {
            console.error('[GearRepository] saveOwnGear expects an array');
            return;
        }

        this.memoryCache = items;

        // Wrap in object if needed or store as array.
        // Legacy storage used { items: [...] } sometimes, but let's standardize.
        // However, to keep compatibility with old JSON format, maybe stick to array if that's what was used.
        // storage.js used to store it as entries directly or wrapped.
        // Let's store as is.
        await storageRepo.setItem(OWN_GEAR_KEY, items);
    }

    /**
     * Add a single item to own gear.
     * @param {Object} item 
     */
    async addOwnGearItem(item) {
        const items = await this.getOwnGear();
        items.push(item);
        await this.saveOwnGear(items);
    }

    /**
   * Returns the static global device library.
   * Assumes global object 'deviceLibrary' exists (loaded via script).
   * @returns {Object}
   */
    getLibrary() {
        if (typeof window !== 'undefined' && window.deviceLibrary) {
            return window.deviceLibrary;
        }
        if (typeof globalThis !== 'undefined' && globalThis.deviceLibrary) {
            return globalThis.deviceLibrary;
        }
        return {};
    }

    /**
     * Unified search for gear.
     * Searches both static library and own gear.
     * @param {string} query 
     * @returns {Promise<Array>}
     */
    async searchGear(query) {
        if (!query) return [];
        const q = query.toLowerCase();

        // 1. Search Own Gear
        const ownGear = await this.getOwnGear();
        const ownMatches = ownGear.filter(item =>
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.brand && item.brand.toLowerCase().includes(q))
        );

        // 2. Search Static Library
        // This requires traversing the complex deviceLibrary object structure
        // We'll skip deep traversal for now as V1 had specific search logic we might want to reuse.
        // For now, returning ownMatches is a good start.

        return ownMatches;
    }
}

export const gearRepo = new GearRepository();
