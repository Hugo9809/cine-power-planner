import LocalStorageAdapter from './drivers/LocalStorageAdapter.js';
import { userContext } from '../core/UserContext.js';
import {
    wrapWithMetadata,
    unwrapMetadata,
    hasMetadata,
    markAsSynced,
    markAsConflict,
    SyncStatus,
    LockStatus,
    generateDocId,
} from './SyncMetadata.js';
import { projectLockService } from './ProjectLockService.js';

/**
 * @class StorageRepository
 * The main entry point for data persistence.
 * 
 * Features:
 * - User-scoped storage via UserContext
 * - Sync metadata wrapping for cloud-ready data
 * - Project locking integration for concurrent edit prevention
 * - Driver swapping (LocalStorage → IndexedDB)
 */
export class StorageRepository {
    constructor() {
        this.driver = new LocalStorageAdapter();
        this.initialized = false;
    }

    /**
     * Initializes the active storage driver.
     */
    async init() {
        if (this.initialized) return;

        // Default to LocalStorage
        await this.driver.init();
        console.log('[StorageRepository] Initialized with default driver:', this.driver.constructor.name);
        this.initialized = true;

        // Initialize project lock service
        projectLockService.init();
    }

    /**
     * Switches the underlying driver at runtime.
     * Useful after migration completes.
     * @param {StorageInterface} newDriver 
     */
    async switchDriver(newDriver) {
        console.log('[StorageRepository] Switching driver to:', newDriver.constructor.name);
        await newDriver.init();
        this.driver = newDriver;
    }

    // --- Core Storage Methods ---

    async getItem(key) {
        if (!this.initialized) await this.init();
        const scopedKey = userContext.getScopedKey(key);
        return this.driver.getItem(scopedKey);
    }

    async setItem(key, value) {
        if (!this.initialized) await this.init();
        const scopedKey = userContext.getScopedKey(key);
        return this.driver.setItem(scopedKey, value);
    }

    async removeItem(key) {
        if (!this.initialized) await this.init();
        const scopedKey = userContext.getScopedKey(key);
        return this.driver.removeItem(scopedKey);
    }

    async clear() {
        if (!this.initialized) await this.init();
        const keys = await this.driver.getKeys();
        const prefix = `user_${userContext.getUserId()}_`;
        const deletionPromises = keys
            .filter(k => k.startsWith(prefix))
            .map(k => this.driver.removeItem(k));
        await Promise.all(deletionPromises);
    }

    async getKeys() {
        if (!this.initialized) await this.init();
        const allKeys = await this.driver.getKeys();
        const prefix = `user_${userContext.getUserId()}_`;
        return allKeys
            .filter(k => k.startsWith(prefix))
            .map(k => k.slice(prefix.length));
    }

    // --- Sync-Aware Project Methods ---

    /**
     * Loads a project with its sync metadata.
     * @param {string} projectKey 
     * @returns {Promise<{ data: any, meta: Object|null }>}
     */
    async loadProject(projectKey) {
        const raw = await this.getItem(projectKey);
        return unwrapMetadata(raw);
    }

    /**
     * Loads raw project data without unwrapping (legacy compatibility).
     * @param {string} projectKey 
     * @returns {Promise<any>}
     */
    async loadProjectRaw(projectKey) {
        const result = await this.loadProject(projectKey);
        return result.data;
    }

    /**
     * Saves a project with sync metadata.
     * @param {string} projectKey - Unique project identifier
     * @param {Object} projectData - The actual project data
     * @param {Object} [existingMeta] - Existing metadata to update
     * @returns {Promise<{ success: boolean, meta: Object }>}
     */
    async saveProject(projectKey, projectData, existingMeta = null) {
        if (!this.initialized) await this.init();

        // Check lock status
        const lockInfo = projectLockService.getLockInfo(projectKey);
        if (!lockInfo.isEditable) {
            console.warn('[StorageRepository] Cannot save - project is locked by another session');
            return {
                success: false,
                error: 'PROJECT_LOCKED',
                lockInfo
            };
        }

        // Wrap with metadata
        const wrapped = wrapWithMetadata(projectData, existingMeta, {
            docType: 'project',
            docId: projectKey,
        });

        // Save to storage
        await this.setItem(projectKey, wrapped);

        // Best-effort OPFS DataVault snapshot: optional for local saves, never blocks the
        // primary save path, and exists to strengthen offline recovery resilience.
        import('./DataVault.js').then(({ dataVault }) => {
            if (dataVault) {
                dataVault.saveSnapshot(projectKey, wrapped).catch(err =>
                    console.warn('Auto-backup failed', err)
                );
            }
        });

        console.log('[StorageRepository] Project saved with metadata:', projectKey);
        return { success: true, meta: wrapped._meta };
    }

    /**
     * Gets only the sync metadata for a project without loading full data.
     * Useful for sync status checks.
     * @param {string} projectKey 
     * @returns {Promise<Object|null>}
     */
    async getProjectMeta(projectKey) {
        const raw = await this.getItem(projectKey);
        if (!hasMetadata(raw)) return null;
        return raw._meta;
    }

    /**
     * Marks a project as synced with the cloud.
     * @param {string} projectKey 
     * @param {string} [serverTimestamp] - Timestamp from server
     * @returns {Promise<boolean>}
     */
    async markProjectSynced(projectKey, serverTimestamp = null) {
        const raw = await this.getItem(projectKey);
        if (!hasMetadata(raw)) {
            console.warn('[StorageRepository] Cannot mark as synced - no metadata');
            return false;
        }

        raw._meta = markAsSynced(raw._meta, serverTimestamp);
        await this.setItem(projectKey, raw);
        return true;
    }

    /**
     * Marks a project as having a sync conflict.
     * @param {string} projectKey 
     * @param {string} errorMessage 
     * @returns {Promise<boolean>}
     */
    async markProjectConflict(projectKey, errorMessage) {
        const raw = await this.getItem(projectKey);
        if (!hasMetadata(raw)) return false;

        raw._meta = markAsConflict(raw._meta, errorMessage);
        await this.setItem(projectKey, raw);
        return true;
    }

    /**
     * Gets all projects that need syncing.
     * @returns {Promise<Array<{ key: string, meta: Object }>>}
     */
    async getPendingSyncProjects() {
        const keys = await this.getKeys();
        const pending = [];

        for (const key of keys) {
            const meta = await this.getProjectMeta(key);
            if (meta && (
                meta.syncStatus === SyncStatus.PENDING ||
                meta.syncStatus === SyncStatus.LOCAL_ONLY
            )) {
                pending.push({ key, meta });
            }
        }

        return pending;
    }

    /**
     * Lists all projects with their metadata.
     * @returns {Promise<Array<{ key: string, data: any, meta: Object|null }>>}
     */
    async listProjects() {
        const keys = await this.getKeys();
        const projects = [];

        for (const key of keys) {
            const { data, meta } = await this.loadProject(key);
            // Filter to only items that look like projects (have metadata with docType)
            if (meta && meta.docType === 'project') {
                projects.push({ key, data, meta });
            }
        }

        return projects;
    }

    // --- Lock Management Pass-through ---

    /**
     * Attempts to acquire an edit lock on a project.
     * @param {string} projectKey 
     * @param {Object} [options] - { force: boolean }
     * @returns {Promise<{ success: boolean, status: string }>}
     */
    async acquireProjectLock(projectKey, options = {}) {
        if (!this.initialized) await this.init();
        return projectLockService.acquireLock(projectKey, options);
    }

    /**
     * Releases an edit lock on a project.
     * @param {string} projectKey 
     * @returns {Promise<boolean>}
     */
    async releaseProjectLock(projectKey) {
        return projectLockService.releaseLock(projectKey);
    }

    /**
     * Gets lock info for a project.
     * @param {string} projectKey 
     * @returns {{ status: string, isEditable: boolean }}
     */
    getProjectLockInfo(projectKey) {
        return projectLockService.getLockInfo(projectKey);
    }

    /**
     * Subscribe to lock changes.
     * @param {Function} callback - (projectKey, status, lock) => void
     * @returns {Function} Unsubscribe function
     */
    onLockChange(callback) {
        return projectLockService.subscribe(callback);
    }
}

// Export a singleton instance
export const storageRepo = new StorageRepository();
