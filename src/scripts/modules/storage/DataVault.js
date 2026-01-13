/**
 * @class DataVault
 * Manages long-term file storage using the Origin Private File System (OPFS).
 * Provides a "Vault" for immutable checkpoints and backups.
 */
export class DataVault {
    constructor() {
        this.root = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        try {
            if (!navigator.storage || !navigator.storage.getDirectory) {
                console.warn('[DataVault] OPFS is not supported in this browser.');
                return;
            }
            this.root = await navigator.storage.getDirectory();
            this.initialized = true;
        } catch (e) {
            console.error('[DataVault] Failed to initialize OPFS:', e);
        }
    }

    /**
     * Saves a project snapshot to the vault.
     * @param {string} filename 
     * @param {Object} data 
     */
    async saveSnapshot(filename, data) {
        if (!this.initialized) await this.init();
        if (!this.root) throw new Error('OPFS not available');

        try {
            // Sanitize filename to strict alphanumeric + safe chars to avoid path separators
            const safeFilename = filename.replace(/[^a-z0-9_\-\.\s]/gi, '_');
            const fileHandle = await this.root.getFileHandle(safeFilename + '.json', { create: true });

            // Create a writable stream
            const writable = await fileHandle.createWritable();

            // Write data (JSON stringified)
            await writable.write(JSON.stringify(data));

            // Close the file
            await writable.close();

            console.log(`[DataVault] Saved snapshot: ${filename}`);
            return true;
        } catch (e) {
            console.error(`[DataVault] Failed to save snapshot ${filename}:`, e);
            throw e;
        }
    }

    /**
     * Lists all available snapshots in the vault.
     * @returns {Promise<string[]>} List of filenames
     */
    async listSnapshots() {
        if (!this.initialized) await this.init();
        if (!this.root) return [];

        const files = [];
        try {
            // Iterate over entries
            // Note: OPFS iteration syntax varies slightly by browser, but standard is async iterator
            for await (const [name, handle] of this.root.entries()) {
                if (handle.kind === 'file' && name.endsWith('.json')) {
                    files.push(name);
                }
            }
        } catch (e) {
            console.error('[DataVault] Failed to list snapshots:', e);
        }
        return files.sort().reverse(); // Newest first (assuming timestamped names)
    }

    /**
     * Reads a snapshot from the vault.
     * @param {string} filename 
     * @returns {Promise<Object>} The parsed data
     */
    async restoreSnapshot(filename) {
        if (!this.initialized) await this.init();
        if (!this.root) throw new Error('OPFS not available');

        try {
            const fileHandle = await this.root.getFileHandle(filename);
            const file = await fileHandle.getFile();
            const text = await file.text();
            return JSON.parse(text);
        } catch (e) {
            console.error(`[DataVault] Failed to restore snapshot ${filename}:`, e);
            throw e;
        }
    }

    /**
     * Deletes a snapshot.
     * @param {string} filename 
     */
    async deleteSnapshot(filename) {
        if (!this.initialized) await this.init();
        if (!this.root) return;

        try {
            await this.root.removeEntry(filename);
            console.log(`[DataVault] Deleted snapshot: ${filename}`);
        } catch (e) {
            console.warn(`[DataVault] Failed to delete snapshot ${filename}:`, e);
        }
    }

    /**
     * Wipes the entire vault (Factory Reset).
     */
    async clear() {
        if (!this.initialized) await this.init();
        if (!this.root) return;

        try {
            const files = await this.listSnapshots();
            for (const file of files) {
                await this.root.removeEntry(file);
            }
            console.log('[DataVault] All data wiped.');
        } catch (e) {
            console.error('[DataVault] Failed to wipe vault:', e);
        }
    }
}

export const dataVault = new DataVault();
