/* eslint-disable no-undef */
import { jest } from '@jest/globals';

// Mock dependencies
jest.unstable_mockModule('../../src/scripts/modules/core/UserContext.js', () => ({
    userContext: { getUserId: () => 'test-user', getScopedKey: (k) => k }
}));

jest.unstable_mockModule('../../src/scripts/console-helpers.js', () => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
}));

jest.unstable_mockModule('../../src/scripts/modules/logging-resolver.js', () => ({
    __esModule: true,
    default: { log: jest.fn() }
}));

jest.unstable_mockModule('../../src/scripts/modules/features/contacts.js', () => ({
    __esModule: true,
    default: { normalizeContactEntry: (c) => c }
}));

jest.unstable_mockModule('../../src/scripts/modules/storage/StorageMigrationService.js', () => ({
    migrationService: {
        isMigrated: () => true
    }
}));

jest.unstable_mockModule('../../src/scripts/modules/gear/GearRepository.js', () => ({
    gearRepo: { loadOwnGearFromStorage: jest.fn() }
}));

jest.unstable_mockModule('lz-string', () => ({
    __esModule: true,
    default: {
        compress: jest.fn(val => val),
        decompress: jest.fn(val => val),
        compressToUTF16: jest.fn(val => val),
        decompressFromUTF16: jest.fn(val => val)
    }
}));


// Import the module under test and the repo instance
const storageModule = await import('../../src/scripts/storage.js');
const { storageRepo } = await import('../../src/scripts/modules/storage/StorageRepository.js');
const { saveProject, loadProject, saveAutoGearBackups, safeSetLocalStorage } = storageModule.default;

describe('Storage Migration Verification', () => {
    let setItemSpy, saveProjectSpy;

    beforeEach(async () => {
        jest.clearAllMocks();
        localStorage.clear();

        // Mock driver to look like IDB
        storageRepo.driver = {
            constructor: { name: 'IndexedDBAdapter' },
            setItem: jest.fn().mockResolvedValue(true),
            getItem: jest.fn().mockResolvedValue(null),
            removeItem: jest.fn().mockResolvedValue(true),
            getKeys: jest.fn().mockResolvedValue([]),
            init: jest.fn().mockResolvedValue(true)
        };
        storageRepo.initialized = true;

        setItemSpy = jest.spyOn(storageRepo, 'setItem');
        // Mock saveProject to prevent dynamic import side effects
        saveProjectSpy = jest.spyOn(storageRepo, 'saveProject').mockResolvedValue(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('saveProject delegates to storageRepo.saveProject (and skips LocalStorage)', async () => {
        const project = {
            id: 'p1',
            name: 'Test Project',
            gearList: { items: [] },
            projectInfo: { name: 'Test Project', created: Date.now() }
        };
        await saveProject('Test Project', project);

        // Check delegation
        expect(saveProjectSpy).toHaveBeenCalledWith('Test Project', expect.any(Object));

        // Verify it did NOT write to legacy monolithic key
        expect(localStorage.getItem('cameraPowerPlanner_setups')).toBeNull();
    });

    test('saveAutoGearBackups calls storageRepo.setItem', async () => {
        const backups = [{ id: 'b1', label: 'Backup 1' }];
        await saveAutoGearBackups(backups);

        expect(setItemSpy).toHaveBeenCalledWith('cameraPowerPlanner_autoGearBackups', expect.any(Array));
        expect(localStorage.getItem('cameraPowerPlanner_autoGearBackups')).toBeNull();
    });

    test('safeSetLocalStorage calls storageRepo.setItem', async () => {
        await safeSetLocalStorage('darkMode', 'true');

        expect(setItemSpy).toHaveBeenCalledWith('darkMode', 'true');
        expect(localStorage.getItem('darkMode')).toBeNull();
    });

});
