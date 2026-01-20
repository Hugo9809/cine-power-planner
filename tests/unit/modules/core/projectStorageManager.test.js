import { ProjectStorageManager } from '../../../../src/scripts/modules/core/project-storage-manager.js';
import * as ProjectManager from '../../../../src/scripts/modules/core/project-manager.js';

jest.mock('../../../../src/scripts/modules/core/project-manager.js', () => ({
    safeGetCurrentProjectName: jest.fn()
}));

describe('ProjectStorageManager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn()
        };
        global.window = {
            addEventListener: jest.fn(),
            getSafeLocalStorage: jest.fn(() => global.localStorage)
        };
        global.document = {
            getElementById: jest.fn()
        };
    });

    describe('resolveActiveProjectStorageKey', () => {
        it('should assume typed name if safeGetCurrentProjectName returns value', () => {
            ProjectManager.safeGetCurrentProjectName.mockReturnValue('TypedProject');
            const key = ProjectStorageManager.resolveActiveProjectStorageKey();
            expect(key).toBe('TypedProject');
        });

        it('should fallback to setupSelect value', () => {
            ProjectManager.safeGetCurrentProjectName.mockReturnValue('');
            const mockSelect = { value: 'SelectedProject' };
            global.document.getElementById.mockReturnValue(mockSelect);

            const key = ProjectStorageManager.resolveActiveProjectStorageKey();
            expect(key).toBe('SelectedProject');
        });

        it('should prefer passed element over document query', () => {
            ProjectManager.safeGetCurrentProjectName.mockReturnValue('');
            const passedSelect = { value: 'PassedProject' };

            const key = ProjectStorageManager.resolveActiveProjectStorageKey(passedSelect);
            expect(key).toBe('PassedProject');
        });
    });

    describe('readRevision', () => {
        it('should return parsed number from local storage', () => {
            global.localStorage.getItem.mockReturnValue('123');
            const rev = ProjectStorageManager.readRevision();
            expect(rev).toBe(123);
        });

        it('should return null for invalid values', () => {
            global.localStorage.getItem.mockReturnValue('abc');
            const rev = ProjectStorageManager.readRevision();
            expect(rev).toBeNull();
        });
    });

    describe('scheduleSync', () => {
        jest.useFakeTimers();

        it('should debounce sync calls', () => {
            const callback = jest.fn();
            ProjectStorageManager.scheduleSync(callback);
            ProjectStorageManager.scheduleSync(callback);
            ProjectStorageManager.scheduleSync(callback);

            expect(callback).not.toHaveBeenCalled();
            jest.advanceTimersByTime(200);
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });
});
