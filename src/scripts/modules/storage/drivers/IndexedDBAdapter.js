import { get, set, del, clear, keys } from 'idb-keyval';
import LZString from 'lz-string';
import StorageInterface from '../StorageInterface.js';

/**
 * @class IndexedDBAdapter
 * High-performance, asynchronous storage driver using IndexedDB.
 * Features transparent compression via LZ-String to maximize storage efficiency.
 */
export default class IndexedDBAdapter extends StorageInterface {
    constructor() {
        super();
        this.name = 'IndexedDBAdapter';
    }

    /** @override */
    async init() {
        // IndexedDB/idb-keyval lazy-loads the DB connection on first request,
        // so explicit init isn't strictly necessary but good for verification.
        try {
            if (typeof indexedDB === 'undefined') {
                throw new Error('IndexedDB is not supported in this environment.');
            }
            return Promise.resolve();
        } catch (e) {
            console.warn('IndexedDB initialization failed:', e);
            throw e;
        }
    }

    /** @override */
    async getItem(key) {
        try {
            const compressed = await get(key);
            if (compressed === null || compressed === undefined) return null;

            // Detect if the data is actually compressed or legacy uncompressed (migration safety)
            // LZ-String compressed strings usually don't look like JSON.
            // We attempt decompression first.
            let decompressed = LZString.decompressFromUTF16(compressed);

            // If decompression returns null (invalid/empty input) but we had data,
            // it might be raw data (though we ensure we always compress on write).
            // Or it might be that LZString returns null on failure.

            const payload = decompressed !== null ? decompressed : compressed;

            try {
                return JSON.parse(payload);
            } catch {
                // If it's not JSON, return raw string (rare case for us)
                return payload;
            }
        } catch (e) {
            console.warn(`[IndexedDBAdapter] Failed to get/decompress item: ${key}`, e);
            return null;
        }
    }

    /** @override */
    async setItem(key, value) {
        try {
            const stringified = typeof value === 'string' ? value : JSON.stringify(value);
            const compressed = LZString.compressToUTF16(stringified);
            await set(key, compressed);
        } catch (e) {
            console.error(`[IndexedDBAdapter] Failed to compress/save item: ${key}`, e);
            throw e;
        }
    }

    /** @override */
    async removeItem(key) {
        return del(key);
    }

    /** @override */
    async clear() {
        return clear();
    }

    /** @override */
    async getKeys() {
        return keys();
    }
}
