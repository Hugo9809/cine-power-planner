
import { describe, it, expect } from 'vitest';
import { RestoreCompatibilityManager } from '../../../../src/scripts/modules/core/restore-compatibility-manager';

describe('RestoreCompatibilityManager', () => {
    describe('verifyRestoredBackupIntegrity', () => {
        it('should return success when all core data is present', () => {
            const payload = {
                data: {
                    devices: { '1': {} },
                    setups: { '1': {} },
                    project: { name: 'test' },
                    projects: { '1': {} },
                    gearList: { items: [] },
                    favorites: { items: [] },
                    autoGearRules: [{ id: 1 }],
                    autoGearPresets: [{ id: 1 }],
                    autoGearBackups: [{ id: 1 }],
                    autoGearMonitorDefaults: { a: 1 },
                    autoGearActivePresetId: 'default',
                    autoGearAutoPresetId: 'default',
                    autoGearShowBackups: true,
                    autoGearBackupRetention: 30,
                    fullBackups: [{ id: 1 }],
                    fullBackupHistory: [{ id: 1 }]
                },
                settingsSnapshot: {
                    accentColor: '#000000',
                    fontSize: 16,
                    fontFamily: 'Arial',
                    language: 'en',
                    showAutoBackups: true,
                    customLogo: 'logo.png',
                    customFonts: ['Arial']
                },
                sessionSnapshot: {
                    activeProjectId: '1',
                    session: {}
                }
            };

            const result = RestoreCompatibilityManager.verifyRestoredBackupIntegrity(payload);
            console.log('DEBUG ALERT MSG:', result.alertMessage);
            expect(result.notificationType).toBe('success');
            expect(result.alertMessage).toBe('');
        });

        it('should return warning when core data is missing', () => {
            const payload = {
                data: {
                    project: { name: 'test' }
                },
                langTexts: {
                    restoreVersionCoreMissing: 'Missing Core:',
                    restoreVersionStorageMissing: 'Missing Storage:',
                    restoreVersionOptionalMissing: 'Missing Optional:'
                }
            };

            const result = RestoreCompatibilityManager.verifyRestoredBackupIntegrity(payload);
            expect(result.notificationType).toBe('warning');
            expect(result.alertMessage).toContain('Missing Core:');
            expect(result.alertMessage).toContain('Devices');
            expect(result.alertMessage).toContain('Setups');
        });

        it('should handle payload passed directly as data object (legacy)', () => {
            const payload = {
                devices: { '1': {} },
            };
            // Wrapper to inject texts for legacy call pattern simulation
            const legacyPayloadWithTexts = {
                data: payload,
                langTexts: { restoreVersionStorageMissing: 'Missing Storage:' }
            };

            const result = RestoreCompatibilityManager.verifyRestoredBackupIntegrity(legacyPayloadWithTexts);
            expect(result.notificationType).toBe('warning');
            expect(result.alertMessage).toContain('Missing Storage:');
        });
    });

    describe('buildRestoreVersionCompatibilityMessage', () => {
        it('should generate a message comparing versions', () => {
            const options = {
                fileVersion: '1.0.0',
                targetVersion: '2.0.0',
                backupFileName: 'backup.json',
                langTexts: {
                    restoreVersionBackupLabel: 'Backup: {fileName}'
                }
            };

            const message = RestoreCompatibilityManager.buildRestoreVersionCompatibilityMessage(options);
            expect(message).toContain('1.0.0');
            expect(message).toContain('Backup: backup.json');
        });
    });
});
