
// Mock
// We rely on jest-localstorage-mock if configured, but we still ensure consistency here.
if (typeof localStorage === 'undefined') {
    const store = {};
    const localStorageMock = {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = String(value); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { for (const k in store) delete store[k]; },
        key: (i) => Object.keys(store)[i] || null,
        get length() { return Object.keys(store).length; }
    };
    global.window = { localStorage: localStorageMock, sessionStorage: localStorageMock };
    global.localStorage = localStorageMock;
}

if (!global.window) {
    global.window = {};
}

// Reset modules and load storage
delete require.cache[require.resolve('../../../src/scripts/storage.js')];
const StorageModule = require('../../../src/scripts/storage.js');
const {
    saveProject,
    loadProject,
    clearAllData,
    ensureCriticalStorageBackups
} = StorageModule;

describe('Integrity Verification', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Verify Sharding Save', () => {
        saveProject('Project A', { gearList: '<ul>A</ul>', projectInfo: { name: 'A' } }, { skipCompression: true });
        saveProject('Project B', { gearList: '<ul>B</ul>', projectInfo: { name: 'B' } }, { skipCompression: true });

        const shardA = localStorage.getItem('cameraPowerPlanner_prj_Project A');
        const shardB = localStorage.getItem('cameraPowerPlanner_prj_Project B');
        const monolith = localStorage.getItem('cameraPowerPlanner_project');

        expect(shardA).not.toBeNull();
        expect(shardB).not.toBeNull();
        expect(monolith).toBeNull();
    });

    test('Verify Read Shards', () => {
        saveProject('Project A', { gearList: '<ul>A</ul>', projectInfo: { name: 'A' } }, { skipCompression: true });
        saveProject('Project B', { gearList: '<ul>B</ul>', projectInfo: { name: 'B' } }, { skipCompression: true });

        const projects = loadProject();
        expect(projects['Project A']).toBeDefined();
        expect(projects['Project B']).toBeDefined();
    });

    test('Verify Critical Backup (Reconstruction)', () => {
        saveProject('Project A', { gearList: '<ul>A</ul>', projectInfo: { name: 'A' } }, { skipCompression: true });
        saveProject('Project B', { gearList: '<ul>B</ul>', projectInfo: { name: 'B' } }, { skipCompression: true });

        ensureCriticalStorageBackups();
        const backupKey = 'cameraPowerPlanner_project__backup';
        const backupRaw = localStorage.getItem(backupKey);

        expect(backupRaw).not.toBeNull();
        const backupData = JSON.parse(backupRaw);
        expect(backupData['Project A']).toBeDefined();
        expect(backupData['Project B']).toBeDefined();
    });

    test('Verify Clear All Data', async () => {
        saveProject('Project A', { gearList: '<ul>A</ul>', projectInfo: { name: 'A' } }, { skipCompression: true });

        global.window.indexedDB = {
            databases: async () => [],
            deleteDatabase: () => ({ result: {}, onerror: null, onsuccess: null, onblocked: null })
        };

        if (typeof document === 'undefined') {
            global.document = {};
        }

        await clearAllData();

        // Project shards should be gone.
        let foundShard = false;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('_prj_')) {
                foundShard = true;
                break;
            }
        }
        expect(foundShard).toBe(false);
    });
});
