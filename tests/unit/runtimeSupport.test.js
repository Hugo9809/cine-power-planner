
import {
    Text,
    UI,
    DeviceSchema,
    Loader,
    resolvePreferredTemperatureStorageKey,
    CORE_TEMPERATURE_STORAGE_KEY_FALLBACK
} from '../../src/scripts/modules/runtime-support.js';

// Mock dependencies
// const vi = {
//     fn: (...args) => jest.fn(...args),
// };

describe('Runtime Support Module', () => {

    describe('Text Tools Export', () => {
        test('should export Text tools namespace', () => {
            expect(Text).toBeDefined();
            expect(typeof Text.normaliseTextEntryValue).toBe('function');
            expect(typeof Text.resolveTextEntry).toBe('function');
            expect(Text.TEXT_ENTRY_SEPARATOR).toBeDefined();
        });
    });

    describe('UI Tools Export', () => {
        test('should export UI tools namespace', () => {
            expect(UI).toBeDefined();
            expect(typeof UI.escapeHtml).toBe('function');
            expect(typeof UI.whenElementAvailable).toBe('function');
        });
    });

    describe('Device Schema Export', () => {
        test('should export DeviceSchema namespace', () => {
            expect(DeviceSchema).toBeDefined();
            expect(typeof DeviceSchema.createDeviceSchemaManager).toBe('function');
        });
    });

    describe('Runtime Loader Export', () => {
        test('should export Loader namespace (or object)', () => {
            expect(Loader).toBeDefined();
            // It might be an object with functions
            expect(typeof Loader.resolveCoreRuntimeModulesNamespace).toBe('function');
        });
    });

    describe('Temperature Storage Key Resolution', () => {
        test('should return default key when no candidates provided', () => {
            const key = resolvePreferredTemperatureStorageKey([]);
            expect(key).toBe(CORE_TEMPERATURE_STORAGE_KEY_FALLBACK);
        });

        test('should resolve from scope.TEMPERATURE_STORAGE_KEY', () => {
            const scope = { TEMPERATURE_STORAGE_KEY: 'custom_key' };
            const key = resolvePreferredTemperatureStorageKey([scope]);
            expect(key).toBe('custom_key');
        });

        test('should resolve from scope.TEMPERATURE_UNIT_STORAGE_KEY', () => {
            const scope = { TEMPERATURE_UNIT_STORAGE_KEY: 'unit_key' };
            const key = resolvePreferredTemperatureStorageKey([scope]);
            expect(key).toBe('unit_key');
        });

        test('should resolve from scope.CORE_SHARED', () => {
            const scope = { CORE_SHARED: { TEMPERATURE_STORAGE_KEY: 'shared_key' } };
            const key = resolvePreferredTemperatureStorageKey([scope]);
            expect(key).toBe('shared_key');
        });

        test('should resolve from scope.__cineStorageApi getter', () => {
            const scope = {
                __cineStorageApi: {
                    getTemperaturePreferenceStorageKey: () => 'api_key'
                }
            };
            const key = resolvePreferredTemperatureStorageKey([scope]);
            expect(key).toBe('api_key');
        });

        test('should prioritize first found candidate', () => {
            const scope1 = {};
            const scope2 = { TEMPERATURE_STORAGE_KEY: 'scope2_key' };
            const scope3 = { TEMPERATURE_STORAGE_KEY: 'scope3_key' };

            const key = resolvePreferredTemperatureStorageKey([scope1, scope2, scope3]);
            expect(key).toBe('scope2_key');
        });
    });
});
