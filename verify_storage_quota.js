
const fs = require('fs');
const path = require('path');

// Mock LocalStorage
class MockStorage {
    constructor(quota = 5000) {
        this.store = {};
        this.quota = quota;
        this.length = 0;
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        const strValue = String(value);
        const currentSize = Object.keys(this.store).reduce((acc, k) => acc + k.length + this.store[k].length, 0);
        const newSize = currentSize + key.length + strValue.length - (this.store[key] ? key.length + this.store[key].length : 0);

        if (newSize > this.quota) {
            const error = new Error('QuotaExceededError');
            error.name = 'QuotaExceededError';
            throw error;
        }

        this.store[key] = strValue;
        this.length = Object.keys(this.store).length;
    }

    removeItem(key) {
        delete this.store[key];
        this.length = Object.keys(this.store).length;
    }

    clear() {
        this.store = {};
        this.length = 0;
    }

    key(index) {
        return Object.keys(this.store)[index] || null;
    }
}

// Setup Globals
global.window = {
    localStorage: new MockStorage(2000), // Very small quota
    sessionStorage: new MockStorage(5000),
    console: console
};
global.localStorage = global.window.localStorage;
global.sessionStorage = global.window.sessionStorage;
global.self = global.window;

// Mock other dependencies if needed
global.texts = { en: {} };
global.currentLang = 'en';
global.SAFE_LOCAL_STORAGE = global.localStorage;

// Load storage module
const storagePath = path.join(__dirname, 'src/scripts/storage.js');
const storageModule = require(storagePath);

// Helper to create a dummy project
function createDummyProject(name, size = 100) {
    return {
        name: name,
        projectInfo: { projectName: name },
        data: 'x'.repeat(size),
        gearListAndProjectRequirementsGenerated: true
    };
}

async function runTest() {
    console.log('Starting Storage Quota Test...');

    // 1. Fill storage with "renamed" auto-backups
    // Renamed backups are those that have the flag or are in the auto-backup namespace but don't look like standard auto-backups?
    // Actually, the issue is that `removeOldestAutoBackupEntry` respects the "renamed" flag.
    // Let's create backups and mark them as renamed.

    const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';

    // Manually populate storage to simulate existing state
    const projects = {};

    // Create a few "renamed" auto-backups
    for (let i = 0; i < 5; i++) {
        const key = `auto-backup-2025-01-01-10-00-0${i}-project-${i}`;
        projects[key] = createDummyProject(`Project ${i}`, 300);
        // Mark as renamed
        projects[key]['__cine_auto_backup_renamed__'] = true;
    }

    // Save initial state
    global.localStorage.store[PROJECT_STORAGE_KEY] = JSON.stringify(projects);

    console.log('Initial storage usage:', Object.keys(global.localStorage.store).reduce((acc, k) => acc + global.localStorage.store[k].length, 0));

    // 2. Try to save a new project that pushes over quota
    console.log('Attempting to save new project...');

    const newProject = createDummyProject('New Project', 600); // Should trigger quota

    try {
        storageModule.saveProject('New Project', newProject);
        console.log('Save completed (this might be unexpected if it succeeded without clearing space)');
    } catch (e) {
        console.log('Save threw error:', e.message);
    }

    // 3. Verify if space was cleared
    console.log('Storage store keys:', Object.keys(global.localStorage.store));
    const storedRaw = global.localStorage.getItem(PROJECT_STORAGE_KEY);
    console.log('Stored raw type:', typeof storedRaw);
    if (!storedRaw) {
        console.log('Stored raw is null/undefined');
        return;
    }
    const storedData = JSON.parse(storedRaw);
    const storedProjects = storedData;

    const keys = Object.keys(storedProjects);
    console.log('Projects in storage:', keys.length);
    console.log('Keys:', keys);

    // Check if any renamed backup was removed
    const originalCount = 5;
    if (keys.length < originalCount + 1) { // +1 for the new project
        console.log('SUCCESS: Some projects were removed to make space.');
    } else {
        console.log('FAILURE: No projects were removed, or save succeeded without needing removal (quota might be too high).');
        // If save succeeded but count is high, maybe quota wasn't hit?
        // If save failed, then we know it failed.
    }

    // Check if the new project is there
    if (storedProjects['new-project'] || storedProjects['New Project']) {
        console.log('New project is present.');
    } else {
        console.log('New project is MISSING.');
    }

}

runTest().catch(console.error);
