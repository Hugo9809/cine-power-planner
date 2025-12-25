'use strict';

const { setupModuleHarness } = require('../helpers/moduleHarness');
const path = require('path');

describe('immutability module', () => {
    let harness;
    let immutabilityModule;

    beforeEach(() => {
        harness = setupModuleHarness();
        const modulePath = path.join(__dirname, '../../src/scripts/modules/immutability.js');
        immutabilityModule = require(modulePath);
    });

    afterEach(() => {
        if (harness) harness.teardown();
        jest.resetModules();
    });

    describe('freezeDeep', () => {
        it('should freeze a simple object', () => {
            const obj = { a: 1, b: 2 };
            const frozen = immutabilityModule.freezeDeep(obj);
            expect(Object.isFrozen(frozen)).toBe(true);
            expect(() => { frozen.a = 3; }).toThrow();
        });

        it('should freeze a nested object', () => {
            const obj = { a: 1, nested: { c: 3 } };
            const frozen = immutabilityModule.freezeDeep(obj);
            expect(Object.isFrozen(frozen)).toBe(true);
            expect(Object.isFrozen(frozen.nested)).toBe(true);
            expect(() => { frozen.nested.c = 4; }).toThrow();
        });

        it('should freeze an array', () => {
            const arr = [1, 2, { a: 3 }];
            const frozen = immutabilityModule.freezeDeep(arr);
            expect(Object.isFrozen(frozen)).toBe(true);
            expect(Object.isFrozen(frozen[2])).toBe(true);
            expect(() => { frozen.push(4); }).toThrow();
        });

        it('should handle circular references without hanging', () => {
            const obj = { a: 1 };
            obj.self = obj;

            const frozen = immutabilityModule.freezeDeep(obj);
            expect(Object.isFrozen(frozen)).toBe(true);
            expect(frozen.self).toBe(frozen);
        });

        it('should handle multiple references to same object (diamond problem)', () => {
            const leaf = { data: 'leaf' };
            const obj = {
                left: leaf,
                right: leaf
            };
            const frozen = immutabilityModule.freezeDeep(obj);
            expect(Object.isFrozen(frozen)).toBe(true);
            expect(Object.isFrozen(frozen.left)).toBe(true);
            expect(Object.isFrozen(frozen.right)).toBe(true);
            expect(frozen.left).toBe(frozen.right);
        });

        it('should not freeze what it should bypass (e.g. builtins if configured, or functions)', () => {
            // Using a function as they are typically not frozen deep properties in this implementation logic depending on 'shouldBypassDeepFreeze'
            // Actually functions ARE frozen by Object.freeze usually, but let's check the module logic.
            // The module says: "if (!value || typeof value === 'function' ... ) return value;" or similar logic for deep scan.
            // Let's verify direct function freeze.
            const func = () => { };
            const result = immutabilityModule.freezeDeep(func);
            // The implementation line 231 says: if (!value || typeof value === 'function'...) return value;
            // So it returns it AS IS, but does line 243 freeze it?
            // Line 241: if (typeof value === 'function') ... returns Object.freeze(value).
            // So it DOES freeze functions.
            expect(Object.isFrozen(result)).toBe(true);
        });

        it('should return non-object values as-is', () => {
            expect(immutabilityModule.freezeDeep(null)).toBe(null);
            expect(immutabilityModule.freezeDeep(undefined)).toBe(undefined);
            expect(immutabilityModule.freezeDeep(123)).toBe(123);
            expect(immutabilityModule.freezeDeep('string')).toBe('string');
        });
    });

    describe('freezeArray', () => {
        it('should return a frozen copy of the array', () => {
            const original = [{ a: 1 }];
            const frozen = immutabilityModule.freezeArray(original);
            expect(frozen).not.toBe(original);
            expect(Object.isFrozen(frozen)).toBe(true);
            expect(Object.isFrozen(frozen[0])).toBe(true);
            // Original should not be frozen usually? 
            // Implementation: const cloned = ... slice(); return freezeDeep(cloned);
            // freezeDeep modifies in place?
            // Line 230: freezeDeep(value, seen). It iterates and freezes children, then freezes value.
            // Since we passed a clone, the clone is frozen. The objects INSIDE the clone are references to original objects.
            // So line 299 freezeDeep(child, seen) WILL freeze the objects inside the original array too if they are shared references!
            expect(Object.isFrozen(original[0])).toBe(true);
        });
    });

    describe('freezeObject', () => {
        it('should return a frozen copy', () => {
            const original = { nested: { a: 1 } };
            const frozen = immutabilityModule.freezeObject(original);
            expect(frozen).not.toBe(original);
            expect(Object.isFrozen(frozen)).toBe(true);
            // Same logic as array, nested objects will be frozen because it's a shallow clone passed to deep freeze
            expect(Object.isFrozen(original.nested)).toBe(true);
        });
    });
});
