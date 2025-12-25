
// Removed unused storage variable

// Mock
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

// Reset modules and load storage
delete require.cache[require.resolve('../../src/scripts/storage.js')];
const StorageModule = require('../../src/scripts/storage.js');
const {
    saveProject,
    loadProject,
    clearAllData,
    ensureCriticalStorageBackups
} = StorageModule;

async function runVerification() {
    console.log('--- Starting Integrity Verification ---');

    // 1. Verify Sharding Save
    console.log('1. Testing Save Sharding...');
    saveProject('Project A', { gearList: '<ul>A</ul>', projectInfo: { name: 'A' } }, { skipCompression: true });
    saveProject('Project B', { gearList: '<ul>B</ul>', projectInfo: { name: 'B' } }, { skipCompression: true });

    const shardA = store['cameraPowerPlanner_prj_Project A'];
    const shardB = store['cameraPowerPlanner_prj_Project B'];
    const monolith = store['cameraPowerPlanner_project'];

    if (shardA && shardB && !monolith) {
        console.log('PASS: Projects saved as shards. Monolith is empty.');
    } else {
        console.error('FAIL: Sharding save failed.', { shardA: !!shardA, shardB: !!shardB, monolith: !!monolith });
    }

    // 2. Verify Read Shards
    console.log('2. Testing Read Shards...');
    const projects = loadProject();
    if (projects['Project A'] && projects['Project B']) {
        console.log('PASS: Read all shards successfully.');
    } else {
        console.error('FAIL: Read shards failed.', Object.keys(projects));
    }

    // 3. Verify Critical Backup (Reconstruction)
    console.log('3. Testing Critical Backup Reconstruction...');
    // Ensure we don't skip existing
    ensureCriticalStorageBackups();
    const backupKey = 'cameraPowerPlanner_project__backup';
    const backupRaw = store[backupKey];

    if (backupRaw && typeof backupRaw === 'string') {
        const backupData = JSON.parse(backupRaw);
        if (backupData['Project A'] && backupData['Project B']) {
            console.log('PASS: Full backup reconstructed from shards.');
        } else {
            console.error('FAIL: Backup data missing projects.', Object.keys(backupData || {}));
        }
    } else {
        console.error('FAIL: Backup file not created.', { backupRaw });
    }

    // 4. Verify Clear All Data
    console.log('4. Testing Clear All Data...');
    // clearAllData is async? No, strict synchronous mostly, but indexedDB is async.
    // We mock only localStorage here.
    // We need to mock indexedDB or ignore it.
    global.window.indexedDB = {
        databases: async () => [],
        deleteDatabase: () => ({ result: {}, onerror: null, onsuccess: null, onblocked: null })
    };

    // Note: clearAllData expects window.indexedDB to exist.

    try {
        await clearAllData();
    } catch (e) {
        console.warn('clearAllData encountered error (likely mock limitations):', e);
    }

    const keysRemaining = Object.keys(store);
    if (keysRemaining.length === 0) {
        console.log('PASS: clearAllData cleared all localStorage keys.');
    } else {
        // It might leave some unrelated keys if prefixes don't match?
        // Project shards should be gone.
        const hasShards = keysRemaining.some(k => k.includes('_prj_'));
        if (!hasShards) {
            console.log('PASS: Project shards cleared.');
        } else {
            console.error('FAIL: Shards remain after clear.', keysRemaining);
        }
    }

    console.log('--- Verification Complete ---');
}

runVerification();
