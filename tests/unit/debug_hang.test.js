const path = require('path');
const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('Debug Hang Enhanced', () => {
    let offline;
    let internal;
    let consoleWarnSpy;
    let harness;
    let originalConsole;

    beforeEach(() => {
        console.log('BeforeEach starting');
        harness = setupModuleHarness();
        delete global.cineOffline;
        delete global.CINE_CACHE_NAME;
        originalConsole = console;
        consoleWarnSpy = jest.fn();
        const consoleClone = Object.create(console);
        consoleClone.warn = consoleWarnSpy;
        global.console = consoleClone;

        global.BroadcastChannel = jest.fn(() => ({
            postMessage: jest.fn(),
            close: jest.fn(),
        }));

        console.log('Requiring offline module...');
        offline = require(path.join('..', '..', 'src', 'scripts', 'modules', 'offline.js'));
        internal = offline.__internal;
        console.log('BeforeEach complete');
    });

    afterEach(() => {
        console.log('AfterEach starting');
        delete global.cineOffline;
        delete global.CINE_CACHE_NAME;
        delete global.BroadcastChannel;
        if (originalConsole) {
            global.console = originalConsole;
            originalConsole = null;
        }
        consoleWarnSpy = null;
        if (global.window) {
            delete global.window;
        }
        if (harness) {
            harness.teardown();
            harness = null;
        }
        jest.clearAllTimers();
        jest.useRealTimers();
        console.log('AfterEach complete');
    });

    test('Module loads with mocks', () => {
        expect(offline).toBeDefined();
    });
});
