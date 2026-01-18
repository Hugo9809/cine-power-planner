// import { describe, it, expect, vi } from 'vitest';

import { getSessionCloneScope, resolveSessionRuntimeFunction, CORE_GLOBAL_SCOPE } from '../../../../src/scripts/modules/core/session-runtime.js';

describe('Session Runtime Module', () => {
    it('getSessionCloneScope returns CORE_GLOBAL_SCOPE or detectGlobalScope result', () => {
        const scope = getSessionCloneScope();
        expect(scope).toBeTruthy();
        expect(typeof scope).toBe('object');
        // In test environment, it should probably be globalThis or CORE_GLOBAL_SCOPE if shimmed
        expect(scope === globalThis || scope === window).toBe(true);
    });

    it('resolveSessionRuntimeFunction finds global function', () => {
        globalThis.testRuntimeFn = () => 'found';
        const fn = resolveSessionRuntimeFunction('testRuntimeFn');
        expect(fn).toBeDefined();
        expect(fn()).toBe('found');
        delete globalThis.testRuntimeFn;
    });

    it('resolveSessionRuntimeFunction returns null for missing function', () => {
        const fn = resolveSessionRuntimeFunction('nonExistentFn_xyz');
        expect(fn).toBeNull();
    });
});
