import {
    createFreezeRegistry,
    freezeRegistryHas,
    freezeRegistryAdd,
    getSharedFreezeRegistry,
    sharedFreezeRegistryHas,
    sharedFreezeRegistryAdd
} from '../../src/scripts/modules/helpers/freeze-registry.js';

describe('Freeze Registry Module', () => {

    describe('createFreezeRegistry', () => {
        test('should create a WeakSet if available', () => {
            const registry = createFreezeRegistry();
            // In modern environments, this should be a WeakSet
            expect(registry).toBeDefined();
            expect(typeof registry.add).toBe('function');
            expect(typeof registry.has).toBe('function');
        });
    });

    describe('freezeRegistryHas', () => {
        test('should return false for null/undefined inputs', () => {
            expect(freezeRegistryHas(null, {})).toBe(false);
            expect(freezeRegistryHas(createFreezeRegistry(), null)).toBe(false);
        });

        test('should return false if object is not in registry', () => {
            const registry = createFreezeRegistry();
            const obj = { key: 'value' };
            expect(freezeRegistryHas(registry, obj)).toBe(false);
        });

        test('should return true if object is in registry', () => {
            const registry = createFreezeRegistry();
            const obj = { key: 'value' };
            freezeRegistryAdd(registry, obj);
            expect(freezeRegistryHas(registry, obj)).toBe(true);
        });
    });

    describe('freezeRegistryAdd', () => {
        test('should add an object to the registry', () => {
            const registry = createFreezeRegistry();
            const obj = { key: 'value' };
            freezeRegistryAdd(registry, obj);
            expect(freezeRegistryHas(registry, obj)).toBe(true);
        });

        test('should not throw on null inputs', () => {
            expect(() => freezeRegistryAdd(null, {})).not.toThrow();
            expect(() => freezeRegistryAdd(createFreezeRegistry(), null)).not.toThrow();
        });
    });

    describe('Array fallback behavior', () => {
        test('should work with an array as a registry', () => {
            const registry = [];
            const obj = { key: 'value' };

            expect(freezeRegistryHas(registry, obj)).toBe(false);
            freezeRegistryAdd(registry, obj);
            expect(freezeRegistryHas(registry, obj)).toBe(true);
            expect(registry.length).toBe(1);

            // Should not add duplicates
            freezeRegistryAdd(registry, obj);
            expect(registry.length).toBe(1);
        });
    });

    describe('Shared Registry', () => {
        test('should return a consistent shared registry', () => {
            const r1 = getSharedFreezeRegistry();
            const r2 = getSharedFreezeRegistry();
            expect(r1).toBe(r2);
        });

        test('should add and check objects in shared registry', () => {
            const uniqueObj = { unique: Date.now() };
            expect(sharedFreezeRegistryHas(uniqueObj)).toBe(false);
            sharedFreezeRegistryAdd(uniqueObj);
            expect(sharedFreezeRegistryHas(uniqueObj)).toBe(true);
        });
    });
});
