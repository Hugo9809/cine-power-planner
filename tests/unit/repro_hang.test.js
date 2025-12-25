

const { importAllData, closeStorageLifecycle } = require('../../src/scripts/storage');

describe('repro hang', () => {
    afterAll(() => {
        if (typeof closeStorageLifecycle === 'function') {
            closeStorageLifecycle();
        }
    });

    test('importAllData hangs on circular fullBackupHistory', () => {
        const circular = {};
        circular.self = circular;

        // This should hang if normalizeImportedFullBackupHistory has infinite recursion
        importAllData({
            fullBackupHistory: circular
        });
    });
});
