
if (typeof window === 'undefined') {
    global.window = {};
}

const createStorageMock = () => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = String(value); }),
        removeItem: jest.fn((key) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
        key: jest.fn((i) => Object.keys(store)[i] || null),
        get length() { return Object.keys(store).length; },
        __resetInfo: () => { store = {}; },
        __getStore: () => store,
    };
};

const localStorageMock = createStorageMock();
global.localStorage = localStorageMock;
global.window.localStorage = localStorageMock;
global.LZString = require('lz-string');

// Mock specific modules
jest.mock('../../src/scripts/modules/storage/StorageRepository.js', () => ({
    storageRepo: {
        init: jest.fn().mockResolvedValue(),
        switchDriver: jest.fn().mockResolvedValue(),
        getItem: jest.fn((key) => {
            if (key === 'cameraPowerPlanner_project') {
                return Promise.resolve(global.mockProjectData || null);
            }
            return Promise.resolve(null);
        }),
        setItem: jest.fn().mockResolvedValue(),
        removeItem: jest.fn().mockResolvedValue(),
        getProjectKeys: jest.fn().mockResolvedValue(['cameraPowerPlanner_project']),
        loadProjectRaw: jest.fn((key) => {
            if (key === 'cameraPowerPlanner_project' && global.mockProjectData) {
                return Promise.resolve(global.mockProjectData);
            }
            return Promise.resolve(null);
        }),
        // Assume we are in localStorage mode for this test since that relies on storage.js logic
    }
}));
jest.mock('../../src/scripts/modules/storage/drivers/IndexedDBAdapter.js');
jest.mock('../../src/scripts/modules/core/UserContext.js', () => ({
    userContext: {
        getUserId: () => 'test-user',
        getScopedKey: (k) => `user_test-user_${k}`,
        init: jest.fn()
    }
}));
jest.mock('../../src/scripts/modules/storage/StorageMigrationService.js', () => ({
    migrationService: {
        runMigrationIfNeeded: jest.fn().mockResolvedValue(false),
        isMigrated: jest.fn().mockResolvedValue(true),
        init: jest.fn().mockResolvedValue(false)
    }
}));

// Do NOT require storage.js at top level - require in each test after setting mockProjectData

describe('Export Regression Investigation', () => {
    beforeEach(() => {
        localStorageMock.__resetInfo();
        jest.clearAllMocks();
        global.mockProjectData = null; // Reset before each test
        jest.resetModules(); // Clear module cache so each test gets a fresh storage.js
    });

    test('exportAllData handles double-serialized project', async () => {
        // Case 1: The 'project' map itself has a key that is a string instead of object
        const projectsMap = {
            "SuccessProject": { name: "Success" },
            "FailProject": "{\"name\":\"Fail\"}"
        };
        // Seed the mock BEFORE requiring storage.js so hydration picks it up
        global.mockProjectData = projectsMap;

        // Now require storage.js - this will trigger hydration with the mocked data
        const storageModule = require('../../src/scripts/storage.js');

        // Wait for async hydration to complete
        await new Promise(resolve => setTimeout(resolve, 50));

        const result = storageModule.exportAllData();

        expect(result.project).toBeDefined();
        expect(result.project.FailProject).toEqual({ name: "Fail" });
        expect(result.project.SuccessProject).toEqual({ name: "Success" });
    });

    test('exportAllData handles valid but non-object project entries (primitives)', async () => {
        const projectsMap = {
            "NullProject": null,
            "StringProject": "Just A String"
        };
        global.mockProjectData = projectsMap;

        const storageModule = require('../../src/scripts/storage.js');
        await new Promise(resolve => setTimeout(resolve, 50));

        const result = storageModule.exportAllData();

        expect(result.project.StringProject).toBe("Just A String");
        expect(result.project.NullProject).toBeNull();
    });

    test('exportAllData handles malformed JSON string', async () => {
        const projectsMap = {
            "BadJson": "{ bad: json }"
        };
        global.mockProjectData = projectsMap;

        const storageModule = require('../../src/scripts/storage.js');
        await new Promise(resolve => setTimeout(resolve, 50));

        const result = storageModule.exportAllData();

        expect(result.project.BadJson).toBe("{ bad: json }"); // Should keep original string
    });
});
