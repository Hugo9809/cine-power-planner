/**
 * @jest-environment jsdom
 */

import {
    AUTO_BACKUP_NAME_PREFIX,
    AUTO_BACKUP_DELETION_PREFIX,
    collectAutoBackupLoggingScopes,
    logAutoBackupEvent,
    cloneProjectEntryForSetup,
    ensureAutoBackupsFromProjects,
} from '../../../src/scripts/modules/core/auto-backup.js';

describe('auto-backup module', () => {
    describe('constants', () => {
        it('exports AUTO_BACKUP_NAME_PREFIX', () => {
            expect(AUTO_BACKUP_NAME_PREFIX).toBe('auto-backup-');
        });

        it('exports AUTO_BACKUP_DELETION_PREFIX', () => {
            expect(AUTO_BACKUP_DELETION_PREFIX).toBe('auto-backup-before-delete-');
        });
    });

    describe('collectAutoBackupLoggingScopes', () => {
        it('returns an array of scopes', () => {
            const scopes = collectAutoBackupLoggingScopes();
            expect(Array.isArray(scopes)).toBe(true);
            expect(scopes.length).toBeGreaterThan(0);
        });

        it('includes globalThis or window', () => {
            const scopes = collectAutoBackupLoggingScopes();
            const hasGlobal = scopes.some(s => s === globalThis || s === window);
            expect(hasGlobal).toBe(true);
        });
    });

    describe('logAutoBackupEvent', () => {
        it('logs to console when no logger is available', () => {
            const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });
            logAutoBackupEvent('info', 'Test message', { detail: 'value' });
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('handles missing level gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });
            logAutoBackupEvent(null, 'Fallback message');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('cloneProjectEntryForSetup', () => {
        it('returns empty object for null input', () => {
            expect(cloneProjectEntryForSetup(null)).toEqual({});
        });

        it('clones projectInfo', () => {
            const entry = { projectInfo: { name: 'Test Project' } };
            const cloned = cloneProjectEntryForSetup(entry);
            expect(cloned.projectInfo).toEqual({ name: 'Test Project' });
            expect(cloned.projectInfo).not.toBe(entry.projectInfo);
        });

        it('clones gearList string', () => {
            const entry = { gearList: 'Camera, Lens' };
            const cloned = cloneProjectEntryForSetup(entry);
            expect(cloned.gearList).toBe('Camera, Lens');
        });

        it('clones autoGearRules array', () => {
            const entry = { autoGearRules: [{ id: 1 }, { id: 2 }] };
            const cloned = cloneProjectEntryForSetup(entry);
            expect(cloned.autoGearRules).toEqual([{ id: 1 }, { id: 2 }]);
            expect(cloned.autoGearRules).not.toBe(entry.autoGearRules);
        });
    });

    describe('ensureAutoBackupsFromProjects', () => {
        it('returns false when loadProject is not a function', () => {
            const result = ensureAutoBackupsFromProjects({});
            expect(result).toBe(false);
        });

        it('returns false when getSetups/storeSetups are missing', () => {
            const result = ensureAutoBackupsFromProjects({
                loadProject: () => ({}),
            });
            expect(result).toBe(false);
        });

        it('imports auto backup entries into setups', () => {
            const projects = {
                'auto-backup-test': { projectInfo: { name: 'Backup Test' } },
                'regular-project': { projectInfo: { name: 'Regular' } },
            };
            const setups = {};
            let storedSetups = null;

            const result = ensureAutoBackupsFromProjects({
                loadProject: () => projects,
                getSetups: () => setups,
                storeSetups: (s) => { storedSetups = s; },
            });

            expect(result).toBe(true);
            expect(storedSetups).not.toBeNull();
            expect(storedSetups['auto-backup-test']).toBeDefined();
            expect(storedSetups['regular-project']).toBeUndefined();
        });

        it('skips already existing setups', () => {
            const projects = {
                'auto-backup-existing': { projectInfo: { name: 'Existing' } },
            };
            const setups = {
                'auto-backup-existing': { projectInfo: { name: 'Already There' } },
            };
            let storeWasCalled = false;

            const result = ensureAutoBackupsFromProjects({
                loadProject: () => projects,
                getSetups: () => setups,
                storeSetups: () => { storeWasCalled = true; },
            });

            expect(result).toBe(false);
            expect(storeWasCalled).toBe(false);
        });
    });
});
