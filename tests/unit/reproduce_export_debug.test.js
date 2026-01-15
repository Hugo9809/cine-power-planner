jest.mock('../../src/scripts/modules/core/UserContext.js', () => ({
    userContext: {
        getUserId: jest.fn().mockReturnValue('testuser'),
        getScopedKey: jest.fn((key) => `user_testuser_${key}`),
        getIdentity: jest.fn().mockReturnValue({ userId: 'testuser', deviceId: 'dev1', sessionId: 'sess1' }),
        reset: jest.fn()
    }
}));

jest.mock('../../src/scripts/modules/storage/drivers/IndexedDBAdapter.js', () => {
    return class MockIndexedDBAdapter {
        constructor() { this.name = 'MockAdapter'; }
        async init() { return Promise.resolve(); }
        async getItem(key) {
            if (key === 'user_testuser_cine_project:TestProject') {
                // Return a proper project object wrapped in metadata - mimic exact shape from storage
                return {
                    _meta: { docType: 'project', version: 1 },
                    data: {
                        projectInfo: { projectName: 'TestProject' },
                        gearList: '<div>Some Gear</div>'
                    }
                };
            }
            return null;
        }
        async getKeys() {
            // Return keys with user prefix as they would appear in raw driver
            return ['user_testuser_cine_project:TestProject'];
        }
        async setItem() { }
    };
});

jest.mock('../../src/scripts/modules/storage/StorageMigrationService.js', () => ({
    migrationService: {
        init: jest.fn().mockResolvedValue(false),
        isMigrated: jest.fn().mockResolvedValue(true),
    }
}));

const { exportAllData } = require('../../src/scripts/storage');

describe('Export Debugging', () => {
    test('exportAllData should produce correct project structure', async () => {
        // Wait for async IIFE hydration
        await new Promise(r => setTimeout(r, 500));

        const payload = exportAllData();
        console.log('Project Payload:', JSON.stringify(payload.project, null, 2));

        if (payload.project && payload.project.TestProject) {
            const val = payload.project.TestProject;
            if (typeof val === 'string') {
                console.error('FAIL: Project entry is a string! Double serialization risk.');
                // This would mean exportAllData returns strings, which leads to double serialization
            } else {
                console.log('SUCCESS: Project entry is an object.');
            }
        } else {
            console.warn('WARNING: TestProject not found in payload. Hydration might have failed or keys mismatch.');
        }
    });
});
