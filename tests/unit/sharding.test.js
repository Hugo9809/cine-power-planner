
// Mock Browser Environment
if (typeof window === 'undefined') {
    global.window = {};
}

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn(key => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        key: jest.fn(i => Object.keys(store)[i] || null),
        get length() { return Object.keys(store).length; },
        __resetInfo: () => { store = {}; },
        __getStore: () => store
    };
})();

Object.defineProperty(global.window, 'localStorage', {
    value: localStorageMock,
    writable: true
});
global.localStorage = localStorageMock;

// Reset modules
jest.resetModules();
const storage = require('../../src/scripts/storage');

describe('Project Sharding', () => {
    beforeEach(() => {
        // Restore mocked getItem if it was overwritten by storage.js patching
        if (localStorageMock.getItem && !localStorageMock.getItem._isMockFunction) { // Check if mock
            // Actually, jest mocks have mock property
            if (!localStorageMock.getItem.mock) {
                localStorageMock.getItem = jest.fn(key => localStorageMock.__getStore()[key] || null);
            }
        }

        localStorageMock.setItem.mockClear();
        localStorageMock.removeItem.mockClear();
        localStorageMock.getItem.mockClear();
        localStorageMock.key.mockClear();
        localStorageMock.__resetInfo();
    });

    const validProject = {
        gearList: {},
        projectInfo: { name: 'Test Project' }
    };

    test('saveProject writes to sharded key', () => {
        storage.saveProject('Project A', validProject, { skipCompression: true });

        const store = localStorageMock.__getStore();
        expect(store['cameraPowerPlanner_prj_Project A']).toBeDefined();
        // Should NOT write to the monolith
        expect(store['cameraPowerPlanner_project']).toBeUndefined();
    });

    test('saveProject supports multiple simultaneous projects', () => {
        storage.saveProject('Project A', { ...validProject, projectInfo: { name: 'A' } }, { skipCompression: true });
        storage.saveProject('Project B', { ...validProject, projectInfo: { name: 'B' } }, { skipCompression: true });

        const store = localStorageMock.__getStore();
        expect(store['cameraPowerPlanner_prj_Project A']).toBeDefined();
        expect(store['cameraPowerPlanner_prj_Project B']).toBeDefined();
    });

    test('readAllProjectsFromStorage reads from shards', () => {
        storage.saveProject('Project A', validProject, { skipCompression: true });

        // Clear cache inside module? storage.js has internal caches.
        // We can force refresh.
        const projects = storage.loadProject(); // calls readAllProjectsFromStorage

        expect(projects['Project A']).toBeDefined();
    });

    test('Migration: Explodes legacy monolith into shards', () => {
        const legacyData = {
            'Lengthy Project': { ...validProject, projectInfo: { name: 'Lengthy Project' } },
            'Another One': { ...validProject, projectInfo: { name: 'Another One' } }
        };

        localStorageMock.setItem('cameraPowerPlanner_project', JSON.stringify(legacyData));

        // Trigger read, which triggers migration
        const projects = storage.loadProject(); // implies readAll

        const store = localStorageMock.__getStore();

        // Verify Shards existence
        expect(store['cameraPowerPlanner_prj_Lengthy Project']).toBeDefined();
        expect(store['cameraPowerPlanner_prj_Another One']).toBeDefined();

        // Verify Monolith deletion
        expect(store['cameraPowerPlanner_project']).toBeUndefined();

        // Verify Data Return
        expect(projects['Lengthy Project']).toBeDefined();
        expect(projects['Another One']).toBeDefined();
    });

    test('deleteProject removes specific shard', () => {
        storage.saveProject('Delete Me', validProject, { skipCompression: true });
        expect(localStorageMock.__getStore()['cameraPowerPlanner_prj_Delete Me']).toBeDefined();

        storage.deleteProject('Delete Me');

        expect(localStorageMock.__getStore()['cameraPowerPlanner_prj_Delete Me']).toBeUndefined();
    });

});
