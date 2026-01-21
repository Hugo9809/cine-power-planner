/**
 * Web Lock Manager
 * 
 * Implements exclusive access to projects using Web Locks API.
 * Extracted from app-session.js to support modular architecture using the native navigator.locks API.
 */

let currentLockController = null;

export const webLockManager = {
    requestLock: async (projectName) => {
        // If we already hold the lock for this project, return true
        if (currentLockController && currentLockController.name === projectName) {
            return true;
        }

        // Release any existing lock
        if (currentLockController) {
            if (currentLockController.unlock) {
                currentLockController.unlock();
            }
            currentLockController = null;
        }

        if (!projectName) return true;

        if (typeof navigator === 'undefined' || !navigator.locks) {
            return true; // Graceful degradation
        }

        const lockName = `cine_project_lock_${projectName}`;

        return new Promise((resolve) => {
            // ifAvailable: true means we immediately get null if locked by another tab
            navigator.locks.request(lockName, { ifAvailable: true }, async (lock) => {
                if (!lock) {
                    resolve(false);
                    return;
                }

                // Create a trigger to release the lock later
                let unlock;
                const unlockPromise = new Promise(r => { unlock = r; });

                currentLockController = {
                    name: projectName,
                    unlock: unlock
                };

                resolve(true);

                // Hold lock until unlock is called
                await unlockPromise;
            });
        });
    },

    releaseLock: () => {
        if (currentLockController) {
            if (currentLockController.unlock) {
                currentLockController.unlock();
            }
            currentLockController = null;
        }
    },

    isLocked: (projectName) => {
        return !!(currentLockController && currentLockController.name === projectName);
    }
};

// Default export for convenience
export default webLockManager;
