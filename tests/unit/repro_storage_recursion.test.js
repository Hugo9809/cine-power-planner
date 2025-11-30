
const { saveSetups } = require('../../src/scripts/storage');

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        removeItem: function (key) {
            delete store[key];
        },
        clear: function () {
            store = {};
        },
        key: function (i) {
            const keys = Object.keys(store);
            return keys[i] || null;
        },
        get length() {
            return Object.keys(store).length;
        }
    };
})();

global.localStorage = localStorageMock;
global.window = { localStorage: localStorageMock };

// Mock console
global.console = {
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
};

describe('Storage Recursion Repro', () => {
    test('saveSetups recursion check', () => {
        const setups = {};
        for (let index = 0; index < 130; index += 1) {
            const hour = String(Math.floor(index / 60)).padStart(2, '0');
            const minute = String(index % 60).padStart(2, '0');
            const key = `auto-backup-2024-05-01-${hour}-${minute}-Project Unique`;
            setups[key] = {
                camera: `Camera ${index}`,
                notes: [`Entry ${index}`],
            };
        }

        // This should not throw RangeError
        saveSetups(setups);
    });
});
