
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
                // Happy Path: Properly stored object
                return {
                    _meta: { docType: 'project', version: 1 },
                    data: {
                        projectInfo: { projectName: 'TestProject' },
                        gearList: '<div>Some Gear</div>'
                    }
                };
            }
            if (key === 'user_testuser_cine_project:CorruptProject') {
                // Corrupt Path: Double serialized object (stored as string in data)
                return {
                    _meta: { docType: 'project', version: 1 },
                    data: JSON.stringify({
                        projectInfo: { projectName: 'CorruptProject' },
                        gearList: '<div>Corrupt Gear</div>'
                    })
                };
            }
            return null;
        }
        async getKeys() {
            return [
                'user_testuser_cine_project:TestProject',
                'user_testuser_cine_project:CorruptProject'
            ];
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

describe('Export Sanitization', () => {
    test('exportAllData handles Mixed Content (Objects and Strings) correctly', async () => {
        // Wait for async IIFE hydration (IndexDBAdapter simulation)
        await new Promise(r => setTimeout(r, 500));

        const payload = exportAllData();
        const projects = payload.project;

        // 1. Verify Happy Path
        expect(projects).toHaveProperty('TestProject');
        const normal = projects.TestProject;
        expect(typeof normal).toBe('object');
        expect(normal.projectInfo.projectName).toBe('TestProject');

        // 2. Verify Fix for Corrupt Path
        expect(projects).toHaveProperty('CorruptProject');
        const fixed = projects.CorruptProject;

        // Should be deserialized to object by our fix
        expect(typeof fixed).toBe('object');
        expect(fixed.projectInfo.projectName).toBe('CorruptProject');
        expect(fixed.gearList).toBe('<div>Corrupt Gear</div>');
    });
});
