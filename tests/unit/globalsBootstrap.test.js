/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('Globals Bootstrap Module', () => {
    let globalsModule;
    let scope;

    beforeEach(async () => {
        jest.resetModules();
        globalsModule = await import('../../src/scripts/modules/globals-bootstrap.js');
        scope = {};
    });

    test('initializes simple global strings and arrays', () => {
        globalsModule.bootstrapGlobals(scope);
        expect(scope.autoGearAutoPresetId).toBe('');
        expect(Array.isArray(scope.baseAutoGearRules)).toBe(true);
        expect(scope.currentLang).toBe('en');
    });

    test('respects existing global values', () => {
        scope.autoGearAutoPresetId = 'preset-1';
        scope.currentLang = 'de';
        globalsModule.bootstrapGlobals(scope);
        expect(scope.autoGearAutoPresetId).toBe('preset-1');
        expect(scope.currentLang).toBe('de');
    });

    test('normalizes existing primitive types', () => {
        // @ts-ignore
        scope.autoGearAutoPresetId = 123; // Should be string
        globalsModule.bootstrapGlobals(scope);
        // The implementation uses ensureString which overwrites if not string fallback is used
        // Wait, ensureString uses __cineResolveGlobalValue. If type mismatch, it overwrites with fallback (empty string).
        expect(scope.autoGearAutoPresetId).toBe('');
    });

    test('initializes complex function delegates', () => {
        globalsModule.bootstrapGlobals(scope);
        expect(typeof scope.getLanguageTexts).toBe('function');
        expect(typeof scope.resolveTextEntry).toBe('function');
    });

    test('resolveAutoGearBackupRetentionMin logic', () => {
        scope.AUTO_GEAR_BACKUP_RETENTION_MIN = 5;
        globalsModule.bootstrapGlobals(scope);

        // This function self-updates global on run
        const result = scope.resolveAutoGearBackupRetentionMin();
        expect(result).toBe(5);
    });

    test('initializes Mount Voltage globals', () => {
        globalsModule.bootstrapGlobals(scope);

        expect(Array.isArray(scope.SUPPORTED_MOUNT_VOLTAGE_TYPES)).toBe(true);
        expect(scope.DEFAULT_MOUNT_VOLTAGES).toBeDefined();
        // Delegates
        expect(typeof scope.parseVoltageValue).toBe('function');
        expect(typeof scope.applyMountVoltagePreferences).toBe('function');
    });

    test('Mount Voltage fallback logic (via delegate)', () => {
        globalsModule.bootstrapGlobals(scope);
        // Call global delegate
        const result = scope.parseVoltageValue("14,4");
        expect(result).toBe(14.4); // Should use fallback implementation
    });

    test('Temperature globals', () => {
        globalsModule.bootstrapGlobals(scope);
        expect(scope.TEMPERATURE_STORAGE_KEY).toBe('cameraPowerPlanner_temperatureUnit');
        expect(scope.TEMPERATURE_UNITS.celsius).toBe('celsius');
    });
});
