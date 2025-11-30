
const { importAllData } = require('../../src/scripts/storage');

describe('repro hang', () => {
    test('importAllData hangs on circular fullBackupHistory', () => {
        const circular = {};
        circular.self = circular;

        // This should hang if normalizeImportedFullBackupHistory has infinite recursion
        importAllData({
            fullBackupHistory: circular
        });
    });
});
