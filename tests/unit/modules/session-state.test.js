
import { SessionState } from '../../../src/scripts/modules/core/session-state.js';

describe('SessionState', () => {
    beforeEach(() => {
        SessionState.reset();
    });

    it('should have default values', () => {
        expect(SessionState.isProjectAutoSaving).toBe(false);
        expect(SessionState.projectStorageSyncInProgress).toBe(false);
        expect(SessionState.lastKnownProjectStorageRevision).toBe(null);
        expect(SessionState.showAutoBackups).toBe(true);
    });

    it('should update values correctly', () => {
        SessionState.isProjectAutoSaving = true;
        expect(SessionState.isProjectAutoSaving).toBe(true);

        SessionState.lastKnownProjectStorageRevision = 123;
        expect(SessionState.lastKnownProjectStorageRevision).toBe(123);
    });

    it('should reset values', () => {
        SessionState.isProjectAutoSaving = true;
        SessionState.reset();
        expect(SessionState.isProjectAutoSaving).toBe(false);
    });
});
