const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('dropdown population stability', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        jest.useRealTimers();
        localStorage.clear();
    });

    test('getProjectNames returns data from localStorage when setupSelect is empty', () => {
        const env = setupScriptEnvironment({
            globals: {},
            disableFreeze: true
        });

        // Pre-populate localStorage with projects
        const testProjects = {
            'Project Alpha': { gearList: '<ul></ul>' },
            'Project Beta': { gearList: '<ul></ul>' }
        };
        localStorage.setItem('cameraPowerPlanner_setups', JSON.stringify(testProjects));

        // Load the legacy shim
        jest.isolateModules(() => {
            require('../../src/scripts/v2/legacy-shim.js');
        });

        // The setupSelect should be empty (only has "New Setup" option)
        const setupSelect = document.getElementById('setupSelect');
        expect(setupSelect.options.length).toBe(1);

        // getProjectNames should still return data via localStorage fallback
        const names = window.cineLegacyShim.getProjectNames();
        expect(names).toContain('Project Alpha');
        expect(names).toContain('Project Beta');
        expect(names.length).toBe(2);

        env.cleanup();
    });

    test('getProjectNames filters out auto-backup entries', () => {
        const env = setupScriptEnvironment({
            globals: {},
            disableFreeze: true
        });

        // Pre-populate localStorage with projects including auto-backups
        const testProjects = {
            'Real Project': { gearList: '<ul></ul>' },
            'auto-backup-123': { gearList: '<ul></ul>' },
            'auto-backup-456': { gearList: '<ul></ul>' }
        };
        localStorage.setItem('cameraPowerPlanner_setups', JSON.stringify(testProjects));

        jest.isolateModules(() => {
            require('../../src/scripts/v2/legacy-shim.js');
        });

        const names = window.cineLegacyShim.getProjectNames();
        expect(names).toContain('Real Project');
        expect(names).not.toContain('auto-backup-123');
        expect(names).not.toContain('auto-backup-456');
        expect(names.length).toBe(1);

        env.cleanup();
    });

    test('populateSetupSelect dispatches cine:setupselect:populated event', () => {
        const env = setupScriptEnvironment({
            globals: {
                getSetups: jest.fn(() => ({
                    'Test Project': { gearList: '<ul></ul>' }
                })),
                localeSort: jest.fn((a, b) => a.localeCompare(b))
            },
            disableFreeze: true
        });

        let eventFired = false;
        let eventDetail = null;

        document.addEventListener('cine:setupselect:populated', (e) => {
            eventFired = true;
            eventDetail = e.detail;
        });

        jest.isolateModules(() => {
            require('../../src/scripts/core/app-events.js');
        });

        // Advance timers to let whenElementAvailable polling resolve
        jest.advanceTimersByTime(500);

        expect(eventFired).toBe(true);
        expect(eventDetail).toBeDefined();
        expect(typeof eventDetail.count).toBe('number');
        expect(typeof eventDetail.timestamp).toBe('number');

        env.cleanup();
    });

    test('getProjectNames prioritizes getSetups over localStorage', () => {
        const env = setupScriptEnvironment({
            globals: {},
            disableFreeze: true
        });

        // Put different data in localStorage vs getSetups
        localStorage.setItem('cameraPowerPlanner_setups', JSON.stringify({
            'Old Project': { gearList: '<ul></ul>' }
        }));

        // Mock getSetups to return different data
        window.getSetups = jest.fn(() => ({
            'New Project Via getSetups': { gearList: '<ul></ul>' }
        }));

        jest.isolateModules(() => {
            require('../../src/scripts/v2/legacy-shim.js');
        });

        const names = window.cineLegacyShim.getProjectNames();

        // Should return getSetups data, not localStorage data
        expect(names).toContain('New Project Via getSetups');
        expect(names).not.toContain('Old Project');

        env.cleanup();
    });
});
