import {
    readGlobalScopeValue,
    writeGlobalScopeValue,
    ensureGlobalFallback,
    normaliseGlobalValue
} from '../../src/scripts/modules/helpers/global-scope.js';

describe('Global Scope Helpers Module', () => {

    describe('readGlobalScopeValue', () => {
        test('should read value from the first scope that has it', () => {
            const scopes = [{}, { myVal: 'found' }, { myVal: 'shadow' }];
            expect(readGlobalScopeValue('myVal', scopes)).toBe('found');
        });

        test('should return undefined if not found', () => {
            const scopes = [{}, {}];
            expect(readGlobalScopeValue('missingVal', scopes)).toBeUndefined();
        });

        test('should handle empty scopes array', () => {
            // Will fallback to collectCandidateScopes which includes globalThis
            // We just check it doesn't crash
            expect(() => readGlobalScopeValue('someProp', [])).not.toThrow();
        });
    });

    describe('writeGlobalScopeValue', () => {
        test('should write value to the first scope', () => {
            const scope1 = {};
            const scope2 = {};
            const result = writeGlobalScopeValue('newProp', 'hello', [scope1, scope2]);
            expect(result).toBe(true);
            expect(scope1.newProp).toBe('hello');
            expect(scope2.newProp).toBeUndefined();
        });

        test('should return false if writing fails on all scopes', () => {
            // Frozen scope
            const frozenScope = Object.freeze({});
            const result = writeGlobalScopeValue('prop', 'value', [frozenScope]);
            // In strict mode this might throw, in sloppy it fails silently.
            // Our function catches errors and returns false.
            expect(result).toBe(false);
        });
    });

    describe('ensureGlobalFallback', () => {
        test('should return existing value if present', () => {
            const scope = { existingProp: 'existing' };
            const result = ensureGlobalFallback('existingProp', 'fallback', [scope]);
            expect(result).toBe('existing');
        });

        test('should set and return fallback if value is undefined', () => {
            const scope = {};
            const result = ensureGlobalFallback('newProp', 'fallbackValue', [scope]);
            expect(result).toBe('fallbackValue');
            expect(scope.newProp).toBe('fallbackValue');
        });

        test('should call factory function for fallback', () => {
            const scope = {};
            const factory = jest.fn(() => 'factoryResult');
            const result = ensureGlobalFallback('factoryProp', factory, [scope]);
            expect(factory).toHaveBeenCalled();
            expect(result).toBe('factoryResult');
        });
    });

    describe('normaliseGlobalValue', () => {
        test('should not change value if validator passes', () => {
            const scope = { validProp: 10 };
            normaliseGlobalValue('validProp', (v) => typeof v === 'number', 0, [scope]);
            expect(scope.validProp).toBe(10);
        });

        test('should replace value if validator fails', () => {
            const scope = { invalidProp: 'not a number' };
            normaliseGlobalValue('invalidProp', (v) => typeof v === 'number', 99, [scope]);
            expect(scope.invalidProp).toBe(99);
        });

        test('should use factory for fallback value', () => {
            const scope = { missingProp: undefined };
            normaliseGlobalValue('missingProp', (v) => v !== undefined, () => 'created', [scope]);
            expect(scope.missingProp).toBe('created');
        });
    });
});
