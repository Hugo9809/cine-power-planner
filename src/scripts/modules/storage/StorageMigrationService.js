import { storageRepo } from './StorageRepository.js';
import LocalStorageAdapter from './drivers/LocalStorageAdapter.js';
import IndexedDBAdapter from './drivers/IndexedDBAdapter.js';

const MIGRATION_FLAG_KEY = 'cine_storage_migrated_v2';

/**
 * Service to handle the one-time migration from LocalStorage to IndexedDB.
 */
export class StorageMigrationService {
    constructor() {
        this.localStorage = new LocalStorageAdapter();
        this.indexedDB = new IndexedDBAdapter();
    }

    /**
     * Checks if migration is needed and executes it.
     * @returns {Promise<boolean>} True if migration occurred, False otherwise.
     */
    async runMigrationIfNeeded() {
        try {
            await this.localStorage.init();
            await this.indexedDB.init();

            const alreadyMigrated = await this.localStorage.getItem(MIGRATION_FLAG_KEY);
            if (alreadyMigrated === 'true') {
                console.log('[MigrationService] Storage already migrated to IndexedDB.');
                return false;
            }

            console.log('[MigrationService] Starting storage migration...');

            const keys = await this.localStorage.getKeys();
            if (keys.length === 0) {
                console.log('[MigrationService] No local storage data found. safe to skip.');
                await this.markAsMigrated();
                return false;
            }

            // Filter out internal flags that don't need migration
            // Note: cine_user_uuid is regenerated/scoped by UserContext; migrating it risks cross-user contamination.
            const keysToMigrate = keys.filter(k => k !== MIGRATION_FLAG_KEY && k !== 'cine_user_uuid');

            // [Update] Get User Context to scope the new keys in IDB
            // We perform the scoping manual here because we are writing directly to the IDB driver
            // via StorageRepository (which now scopes), OR we use the adapter directly?
            // Wait, StorageRepository.setItem NOW uses UserContext.
            // But MigrationService has `new IndexedDBAdapter()`.
            // If we use adapter directly, we must manually scope.
            // Let's use the `userContext` helper.

            let userContext;
            try {
                const module = await import('../core/UserContext.js');
                userContext = module.userContext;
                if (!userContext) {
                    throw new Error('UserContext module loaded but userContext export is missing');
                }
                userContext.init(); // Ensure user ID exists
            } catch (importError) {
                console.error('[MigrationService] Failed to load UserContext for scoping. Aborting migration to prevent data loss.', importError);
                // We must abort if we can't scope correctly, otherwise we write unscoped data to IDB which V2 won't see.
                return false;
            }

            for (const key of keysToMigrate) {
                try {
                    const value = await this.localStorage.getItem(key);
                    if (value !== null) {
                        // Scope the key for the IDB destination
                        const scopedKey = userContext.getScopedKey(key);
                        await this.indexedDB.setItem(scopedKey, value);
                        console.log(`[MigrationService] Migrated key: ${key} -> ${scopedKey}`);
                    }
                } catch (itemError) {
                    console.error(`[MigrationService] Failed to migrate key: ${key}`, itemError);
                    // We continue migration even if one key fails, but we should probably alert the user in a real app.
                    // For now, robust logging is key.
                }
            }

            await this.markAsMigrated();
            console.log('[MigrationService] Migration complete. IndexedDB is now the primary storage.');
            return true;

        } catch (e) {
            console.error('[MigrationService] Critical migration failure:', e);
            return false; // Safely fail, app will continue using whatever repo is set (default LocalStorage)
        }
    }

    async markAsMigrated() {
        // We set the flag in BOTH storages for safety.
        // We use a robust approach: try both, log errors, but don't fail the operation
        // if at least one succeeds (or even if both fail, we might want to continue, but let's try best effort).
        const setSafely = async (adapter, name) => {
            try {
                await adapter.setItem(MIGRATION_FLAG_KEY, 'true');
            } catch (e) {
                console.warn(`[MigrationService] Failed to set migration flag in ${name}:`, e);
            }
        };

        await Promise.all([
            setSafely(this.localStorage, 'LocalStorage'),
            setSafely(this.indexedDB, 'IndexedDB')
        ]);
    }

    /**
     * Checks if the migration flag is set in either storage.
     * @returns {Promise<boolean>}
     */
    async isMigrated() {
        try {
            // Check LocalStorage first (faster)
            const lsFlag = await this.localStorage.getItem(MIGRATION_FLAG_KEY);
            if (lsFlag === 'true') return true;

            // Fallback: Check IndexedDB (in case LS was wiped but IDB persists)
            const idbFlag = await this.indexedDB.getItem(MIGRATION_FLAG_KEY);
            return idbFlag === 'true';
        } catch (e) {
            console.warn('[MigrationService] Failed to check migration status:', e);
            return false;
        }
    }
}

export const migrationService = new StorageMigrationService();
