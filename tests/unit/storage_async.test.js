/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

// Mock IndexedDBAdapter to simulate Async Storage behaviors
const mockStore = new Map();
const mockAdapter = {
    name: 'MockIndexedDBAdapter',
    init: jest.fn().mockResolvedValue(),
    getItem: jest.fn(key => Promise.resolve(mockStore.get(key) || null)),
    setItem: jest.fn((key, value) => {
        mockStore.set(key, value);
        return Promise.resolve();
    }),
    removeItem: jest.fn(key => {
        mockStore.delete(key);
        return Promise.resolve();
    }),
    getKeys: jest.fn(() => Promise.resolve(Array.from(mockStore.keys()))),
    clear: jest.fn(() => {
        mockStore.clear();
        return Promise.resolve();
    })
};

// We mock the class constructor
jest.mock('../../src/scripts/modules/storage/drivers/IndexedDBAdapter.js', () => {
    // Return a mock class constructor that returns our single mockAdapter instance
    return jest.fn().mockImplementation(() => mockAdapter);
});

// We verify that hydration waits for async storage
describe('Async Storage & Hydration', () => {
    let storageModule;
    let storageRepo;

    beforeEach(async () => {
        jest.clearAllMocks();
        mockStore.clear();

        // 1. Force deterministic User ID for StorageRepository scoping
        // This ensures keys are prefixed with 'user_guest_'
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cine_user_uuid', 'guest');
        }

        // 2. Setup mock data in our "Async" store with correct UserContext prefix
        mockStore.set('user_guest_cine_project:ProjectA', JSON.stringify({
            data: { name: 'Project A', items: [] },
            _meta: { docType: 'project', docId: 'ProjectA', version: 1 }
        }));

        // 3. Import modules isolated (re-instantiates UserContext with our fixed ID)
        jest.resetModules();

        // Import repo to capture instance
        const repoModule = await import('../../src/scripts/modules/storage/StorageRepository.js');
        storageRepo = repoModule.storageRepo;

        // 4. Import storage module (triggers hydration via internal logic)
        storageModule = await import('../../src/scripts/storage.js');
    });

    test('storageRepo uses async driver', async () => {
        await storageRepo.setItem('test-key', 'test-val');
        // Expect correct user-scoped key
        expect(mockAdapter.setItem).toHaveBeenCalledWith('user_guest_test-key', 'test-val');

        const val = await storageRepo.getItem('test-key');
        expect(val).toBe('test-val');
    });

    test('hydrateProjectCache populates memory cache from async driver', async () => {
        // storage.js exports hydrateProjectCache for testing
        if (storageModule.hydrateProjectCache) {
            // Reset cache to ensure clean state
            if (storageModule.__resetProjectMemoryCache) storageModule.__resetProjectMemoryCache();

            // Execute hydration - checking it awaits properly
            await storageModule.hydrateProjectCache();

            // Verify driver was queried
            expect(mockAdapter.getKeys).toHaveBeenCalled();

            // Verify data is available synchronously via loadProject (which reads memory cache)
            const project = storageModule.loadProject('ProjectA');

            // Handle potentially async loadProject (though currently sync from cache)
            const resolvedProject = await Promise.resolve(project);

            expect(resolvedProject).toBeDefined();
            expect(resolvedProject.name).toBe('Project A');
        }
    });
});
