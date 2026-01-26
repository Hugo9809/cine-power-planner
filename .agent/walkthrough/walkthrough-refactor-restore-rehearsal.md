# Walkthrough - Restore Rehearsal & Backup Diff Refactoring

## Task Overview
We extracted the "Restore Rehearsal" and "Backup Diff" (Version Comparison) features from the monolithic `app-session.js` into modular managers:
- `src/scripts/modules/features/restore-rehearsal-manager.js`
- `src/scripts/modules/features/backup-diff-manager.js`

This refactoring reduced `app-session.js` by over 1000 lines and encapsulated complex logic for comparing backups and rehearsing restores.

## Changes

### 1. Created `RestoreRehearsalManager.js`
- **Location**: `src/scripts/modules/features/restore-rehearsal-manager.js`
- **Responsibilities**:
  - Managing Restore Rehearsal state (live vs sandbox snapshots).
  - Counting metrics (projects, crew, schedules, etc.).
  - Normalizing and comparing auto-gear rules.
  - Rendering UI tables and rule diffs using provided DOM elements.
  - Handling mode selection (Backup vs Project Bundle).

### 2. Created `BackupDiffManager.js`
- **Location**: `src/scripts/modules/features/backup-diff-manager.js`
- **Responsibilities**:
  - Managing Backup Diff state (baseline vs comparison selection).
  - Collecting backup options from data provider (handling legacy setups).
  - Computing deep differences between snapshots (including keyed array diffing).
  - Rendering diff tree and summary UI.
  - Exporting diff reports to JSON.
  - Initializing UI event listeners.

### 3. Updated `app-session.js`
- **Imports**: Added imports for the new managers.
- **Initialization**:
  - Registered Restore Rehearsal mode inputs with the manager.
  - Replaced `bindBackupDiffEvents` with `BackupDiffManager.initializeBackupDiff(...)`.
  - Passed a data provider to `initializeBackupDiff` to access global `getSetups()`.
- **Cleanup**:
  - Removed ~1100 lines of legacy code related to Backup Diff and Restore Rehearsal logic.
  - Updated `runRestoreRehearsal` and helpers to call Manager functions instead of local ones.
  - Removed unused state variables (`backupDiffState`, `backupDiffOptionsCache`).

## Verification Strategy

### Automated Verification
- Static analysis confirms `app-session.js` imports and calls the managers correctly.
- `grep` checks confirm the removal of legacy functions (`getDiffText`, `computeSetupDiff`, `bindBackupDiffEvents`) from `app-session.js`.

### User Verification Steps
Since the agent cannot visually verify the UI, please perform the following checks:

1.  **Backup Diff (Version Compare)**:
    *   Open the "Backup Settings / Version Compare" section.
    *   Verify the dropdowns are populated with Auto-Backups (if any exist).
    *   Select two different versions.
    *   Verify the "Differences" summary and list appear.
    *   Click "Export Log" and verify a JSON file is downloaded.

2.  **Restore Rehearsal**:
    *   Open "Restore Backup".
    *   Select a backup file (or project bundle).
    *   Verify the "Rehearsal Table" appears showing Live vs Sandbox counts.
    *   Verify "Rule Differences" are shown if applicable.
    *   Click "Proceed" and verify the restore logic continues (or "Abort" to clear).

## Next Steps
- Consider further extracting the *controller* logic (`runRestoreRehearsal`, `handleBackupDiffSelectionChange` etc.) entirely out of `app-session.js` if complete decoupling is desired (currently `app-session.js` still acts as the UI controller/glue).
- Add unit tests for the new Managers.
