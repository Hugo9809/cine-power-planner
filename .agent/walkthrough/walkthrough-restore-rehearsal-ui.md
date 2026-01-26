# Walkthrough - Restore Rehearsal UI Extraction

## Task Overview
We extracted the UI Controller logic for "Restore Rehearsal" from `app-session.js` into a dedicated module.

## Changes

### 1. Created `RestoreRehearsalUI.js`
- **Location**: `src/scripts/modules/ui/restore-rehearsal-ui.js`
- **Responsibilities**:
  - Managing DOM references for the Restore Rehearsal modal.
  - initializing event listeners.
  - Coordinating between the UI and `RestoreRehearsalManager`.
  - Handling file input and calling `cineStorage.exportAllData` for live snapshots.
- **Pattern**: Exports `initializeRestoreRehearsalUI` which sets up listeners and returns handler functions for legacy exports.

### 2. Updated `app-session.js`
- Deleted ~450 lines of UI logic (`createRestoreRehearsalRefs`, `runRestoreRehearsal`, event listeners).
- Imported `initializeRestoreRehearsalUI`.
- Called `initializeRestoreRehearsalUI()` near the beginning of the file (after imports/refs) to delegate logic.
- Captured `handleRestoreRehearsalProceed` and `handleRestoreRehearsalAbort` from the initializer to maintain `export` compatibility at the end of the file.

### 3. Dependencies
- Used `cineStorage` from `../../storage.js` to access `exportAllData` cleanly.
- Imported `sanitizeBackupPayload` and `extractBackupSections` from `../features/backup.js`.

## Verification Strategy

### Automated Verification
- Check for ReferenceErrors in `app-session.js` (e.g., `openRestoreRehearsal` usage).
- Ensure `handleRestoreRehearsalProceed` is still exported.

### User Verification Steps
1.  **Open Restore Rehearsal**:
    *   Click "Restore / Backup" -> "Restore Backup" (or wherever the trigger is).
    *   Verify the modal opens (`openRestoreRehearsal`).
2.  **Select File**:
    *   Select a backup file (e.g., one downloaded from "Backup Now").
    *   Verify the table populates with "Live" vs "Sandbox" counts.
3.  **Proceed**:
    *   Click "Proceed".
    *   Verify the status text updates.
4.  **Abort**:
    *   Click "Abort" or "Close".
    *   Verify modal closes and state resets.

## Next Steps
- Continue cleaning up `app-session.js` (Persistence logic).
