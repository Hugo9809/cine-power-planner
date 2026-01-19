/**
 * @jest-environment jsdom
 */

import {
    getSessionCloneScope,
    resolveSessionRuntimeFunction,
    CORE_GLOBAL_SCOPE
} from '../../../../src/scripts/modules/core/session-runtime.js';

describe('Session Runtime Module', () => {
    it('detects global scope correctly', () => {
        const scope = getSessionCloneScope();
        expect(scope).toBeDefined();
        // In JSDOM, window is global scope
        if (typeof window !== 'undefined') {
            expect(scope).toBe(window);
        }
    });

    it('resolves runtime functions from scope', () => {
        const testFn = () => 'test';
        CORE_GLOBAL_SCOPE.testRuntimeFn = testFn;

        const resolved = resolveSessionRuntimeFunction('testRuntimeFn');
        expect(resolved).toBe(testFn);

        delete CORE_GLOBAL_SCOPE.testRuntimeFn;
    });

    it('returns null for missing functions', () => {
        const resolved = resolveSessionRuntimeFunction('nonExistentFunction');
        expect(resolved).toBeNull();
    });
});
