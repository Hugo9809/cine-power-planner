// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { webLockManager } from '../../../../src/scripts/modules/core/web-lock-manager.js';

describe('Web Lock Manager', () => {
    let originalNavigator;

    beforeEach(() => {
        originalNavigator = globalThis.navigator;
        // Reset singleton state if possible (it's not easily resettable without reload, but we can manage)
        // Since it's a singleton export, we might need isolate modules or just be careful.
        // We'll rely on releaseLock clearing state.
        webLockManager.releaseLock();
    });

    afterEach(() => {
        globalThis.navigator = originalNavigator;
    });

    it('requestLock returns true immediately if navigator.locks is missing', async () => {
        globalThis.navigator = undefined;
        const result = await webLockManager.requestLock('test-project');
        expect(result).toBe(true);
    });

    it('requestLock uses navigator.locks.request', async () => {
        const mockRequest = jest.fn((name, options, callback) => {
            // Simulate acquiring lock
            const lock = { name };
            return callback(lock);
        });

        globalThis.navigator = {
            locks: {
                request: mockRequest
            }
        };

        const result = await webLockManager.requestLock('test-project');
        expect(result).toBe(true);
        expect(mockRequest).toHaveBeenCalledWith('cine_project_lock_test-project', { ifAvailable: true }, expect.any(Function));
    });

    it('requestLock returns false if lock unavailable', async () => {
        const mockRequest = jest.fn((name, options, callback) => {
            // Simulate lock unavailable (null)
            return callback(null);
        });

        globalThis.navigator = {
            locks: {
                request: mockRequest
            }
        };

        const result = await webLockManager.requestLock('test-project');
        expect(result).toBe(false);
    });

    it('isLocked returns correct state', async () => {
        const mockRequest = jest.fn((name, options, callback) => {
            // We hold the lock promise pending to simulate holding it
            return new Promise(() => { });
        });

        // Wait, webLockManager awaits the callback?
        // No, webLockManager's callback awaits a promise that resolve when unlock() is called.
        // The tests above worked because the callback resolved immediately?
        // Wait, line 58 in manager: `await unlockPromise;`.
        // If the callback finishes, the lock is released.
        // So `requestLock` waits for `unlockPromise`? NO.
        // `navigator.locks.request` returns a Promise that resolves when the callback returns.
        // But `webLockManager.requestLock` returns a Promise that resolves `true`/`false` *while holding* the lock?

        // Let's check web-lock-manager.js:
        // `return new Promise((resolve) => { ... navigator.locks.request(..., async (lock) => { ... resolve(true); await unlockPromise; }) })`

        // Yes! It resolves the outer promise (the requestLock result) as soon as it Gets the lock, but keeps the inner callback running (holding lock) until unlockPromise resolves.

        // So to test `isLocked`, we need to acquire it.

        let triggerCallback;
        const mockRequestReal = jest.fn(async (name, opts, cb) => {
            triggerCallback = cb;
            // Don't await cb here in test setup, simulating browser behavior
            return cb({ name });
        });

        globalThis.navigator = {
            locks: {
                request: mockRequestReal
            }
        };

        await webLockManager.requestLock('test-project');
        expect(webLockManager.isLocked('test-project')).toBe(true);

        webLockManager.releaseLock();
        expect(webLockManager.isLocked('test-project')).toBe(false);
    });
});
