
import {
    AUTO_GEAR_GLOBAL_FALLBACKS,
    isAutoGearGlobalReferenceError,
    ensureAutoGearGlobal,
    repairAutoGearGlobals
} from '../../src/scripts/modules/helpers/auto-gear.js';

describe('Auto Gear Module', () => {

    describe('Global Fallbacks', () => {
        test('should provide valid fallback values', () => {
            expect(AUTO_GEAR_GLOBAL_FALLBACKS.autoGearAutoPresetId()).toBe('');
            expect(AUTO_GEAR_GLOBAL_FALLBACKS.baseAutoGearRules()).toEqual([]);
            expect(AUTO_GEAR_GLOBAL_FALLBACKS.autoGearScenarioModeSelect()).toBeNull();
        });
    });

    describe('isAutoGearGlobalReferenceError', () => {
        test('should identify reference errors for auto gear globals', () => {
            const err = new ReferenceError('autoGearAutoPresetId is not defined');
            expect(isAutoGearGlobalReferenceError(err)).toBe(true);
        });

        test('should return false for other errors', () => {
            const err = new Error('Some other error');
            expect(isAutoGearGlobalReferenceError(err)).toBe(false);
        });
    });

    describe('ensureAutoGearGlobal', () => {
        test('should set global if missing', () => {
            const scope = {};
            ensureAutoGearGlobal(scope, 'autoGearAutoPresetId');
            expect(scope.autoGearAutoPresetId).toBe('');
        });

        test('should not overwrite existing global', () => {
            const scope = { autoGearAutoPresetId: 'existing' };
            ensureAutoGearGlobal(scope, 'autoGearAutoPresetId');
            expect(scope.autoGearAutoPresetId).toBe('existing');
        });
    });
});
