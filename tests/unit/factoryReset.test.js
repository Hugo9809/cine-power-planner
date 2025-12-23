
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
        // Custom helper for test reset
        __resetInfo: () => { store = {}; }
    };
})();

Object.defineProperty(global.window, 'localStorage', {
    value: localStorageMock,
    writable: true
});
global.localStorage = localStorageMock;

// Mock Location
global.window.location = { reload: jest.fn() };
global.location = global.window.location;

// Mock BroadcastChannel
let channelInstance;
global.BroadcastChannel = jest.fn().mockImplementation((name) => {
    channelInstance = {
        name,
        onmessage: null,
        postMessage: jest.fn(),
        close: jest.fn()
    };
    return channelInstance;
});

// Require storage module
// We must use require because we want to run the initialization code
jest.resetModules();
const storage = require('../../src/scripts/storage');


describe('Factory Reset Synchronization', () => {
    beforeEach(() => {
        // Reset mocks
        localStorageMock.setItem.mockClear();
        localStorageMock.removeItem.mockClear();
        if (channelInstance) {
            channelInstance.postMessage.mockClear();
        }
        global.location.reload.mockClear();
        global.__cameraPowerPlannerFactoryResetting = false;
        localStorageMock.__resetInfo();
    });

    test('Initializes BroadcastChannel', () => {
        expect(global.BroadcastChannel).toHaveBeenCalledWith('cine-power-planner-lifecycle');
        expect(channelInstance).toBeDefined();
        expect(typeof channelInstance.onmessage).toBe('function');
        // Wait, storage.js assigns it immediately.
        // let lifecycleChannel = new BroadcastChannel...
        // lifecycleChannel.onmessage = ...
        // So checking channelInstance.onmessage should show a function unless reassignment failed.
        // Since my mock returns the object that is assigned to lifecycleChannel, 
        // subsequent assignment to property onmessage should work on this object.
    });

    test('Reacts to factory-reset message from other tabs', () => {
        // Re-require or rely on side-effects? 
        // storage.js has already run.

        // Verify onmessage was assigned
        // Note: checking if onmessage is a function
        // Need to check if logic inside storage.js assigned it.
        // Since `lifecycleChannel` is local to closure, we only access it via side-effect.
        // But `channelInstance` is the object reference.

        expect(typeof channelInstance.onmessage).toBe('function');

        // Trigger message
        channelInstance.onmessage({ data: 'factory-reset' });

        expect(global.__cameraPowerPlannerFactoryResetting).toBe(true);
        expect(global.location.reload).toHaveBeenCalled();
    });

    test('Blocks saving data when factory reset is active', () => {
        global.__cameraPowerPlannerFactoryResetting = true;

        const validProfile = { name: 'Tester', role: 'Dev' };
        storage.saveUserProfile(validProfile);

        expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    test('Allows saving data when factory reset is NOT active', () => {
        global.__cameraPowerPlannerFactoryResetting = false;

        const validProfile = { name: 'Tester', role: 'Dev' };
        storage.saveUserProfile(validProfile);

        expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    test('clearAllData posts factory-reset message and sets local flag', async () => {
        // Mock getSafeLocalStorage to ensure it works inside clearAllData
        // (already mocked global)

        await storage.clearAllData();

        expect(channelInstance.postMessage).toHaveBeenCalledWith('factory-reset');
        expect(global.__cameraPowerPlannerFactoryResetting).toBe(true);
        // And verify data clearing happened (using deleteProject internally)
        expect(localStorageMock.removeItem).toHaveBeenCalled();
    });
});
