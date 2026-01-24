

import { reloadActiveProjectFromStorage } from '../../../src/scripts/modules/core/project-loader.js';
import { SessionState } from '../../../src/scripts/modules/core/session-state.js';
import { cineStorage } from '../../../src/scripts/storage.js';
import { ProjectStorageManager } from '../../../src/scripts/modules/core/project-storage-manager.js';

// Mock dependencies
jest.mock('../../../src/scripts/storage.js', () => ({
    cineStorage: {
        loadProject: jest.fn(),
    }
}));

jest.mock('../../../src/scripts/modules/core/project-storage-manager.js', () => ({
    ProjectStorageManager: {
        resolveActiveProjectStorageKey: jest.fn(),
    }
}));

jest.mock('../../../src/scripts/modules/core/legacy-interop.js', () => ({
    safeUpdateBatteryOptions: jest.fn(),
    safeCheckSetupChanged: jest.fn(),
    safeInvokeSessionOpenAutoGearEditor: jest.fn(),
}));

describe('ProjectLoader', () => {
    let setupSelectMock;

    beforeEach(() => {
        jest.clearAllMocks();
        SessionState.reset();

        // Mock DOM
        setupSelectMock = { value: 'project-123', dispatchEvent: jest.fn() };
        global.document = {
            getElementById: jest.fn((id) => {
                if (id === 'setupSelect') return setupSelectMock;
                if (id === 'projectForm') return {};
                return null;
            })
        };
        global.window = {};

        // Mock Globals used by project-loader
        global.isProjectPersistenceSuspended = jest.fn(() => false);
        global.populateProjectForm = jest.fn();
        global.setManualDiagramPositions = jest.fn();
        global.useProjectAutoGearRules = jest.fn();
        global.clearProjectAutoGearRules = jest.fn();
        global.populateSetupSelect = jest.fn();
        global.markProjectFormDataDirty = jest.fn();
        global.storeLoadedSetupStateSafe = jest.fn();
        global.getCurrentSetupState = jest.fn(() => ({}));
        global.callSessionCoreFunction = jest.fn(() => '');
        global.applyStoredPowerSelection = jest.fn();
        global.displayGearAndRequirements = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should not reload if factory reset in progress', () => {
        SessionState.factoryResetInProgress = true;
        const result = reloadActiveProjectFromStorage();
        expect(result).toBe(false);
    });

    it('should reload project successfully', () => {
        ProjectStorageManager.resolveActiveProjectStorageKey.mockReturnValue('project-123');
        cineStorage.loadProject.mockReturnValue({
            projectInfo: { name: 'Test' },
            powerSelection: {},
            autoGearRules: []
        });

        const result = reloadActiveProjectFromStorage();

        expect(result).toBe(true);
        expect(cineStorage.loadProject).toHaveBeenCalledWith('project-123');
        expect(global.populateProjectForm).toHaveBeenCalled();
    });

    it('should handle missing project by resetting UI', () => {
        ProjectStorageManager.resolveActiveProjectStorageKey.mockReturnValue('project-123');
        cineStorage.loadProject.mockReturnValue(null); // Return null

        const result = reloadActiveProjectFromStorage();

        expect(result).toBe(false);
        expect(global.populateSetupSelect).toHaveBeenCalled();
        expect(setupSelectMock.value).toBe('');
    });
});
