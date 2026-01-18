# Implementation Plan - Batch 8: Auto Backup & Auto Gear UI Migration

This plan covers the migration of `app-core-auto-backup.js` and `app-core-auto-gear-ui.js` to the new ESM architecture. These modules act as bridges/logic for auto-backup features and the auto-gear UI components.

## User Review Required

> [!NOTE]
> This batch focuses on logic extraction. The extensive DOM binding in `app-core-auto-gear-ui.js` will be preserved in the ESM module but exposed via a cleaner API or simply executed if it's purely side-effect based (though extraction to a pure setup function is preferred).

## Proposed Changes

### Core Features

#### [NEW] `src/scripts/modules/core/auto-backup.js`
- Extract logic from `src/scripts/core/app-core-auto-backup.js`.
- Export `CORE_AUTO_BACKUP` object and individual functions:
    - `collectAutoBackupLoggingScopes`
    - `resolveAutoBackupLoggingResolver`
    - `resolveLegacyAutoBackupLogger`
    - `resolveAutoBackupLogger`
    - `logAutoBackupEvent`
    - `cloneProjectEntryForSetup`
    - `ensureAutoBackupsFromProjects`
- Ensure no global variable *declarations* (use imports/args).

#### [MODIFY] `src/scripts/core/app-core-auto-backup.js`
- Convert to a shim.
- Import from `src/scripts/modules/core/auto-backup.js`.
- Retain global exposure logic (`exposeCoreAutoBackup`, globals) for backward compatibility.


#### [NEW] `src/scripts/modules/ui/auto-gear-ui.js`
- Extract logic from `src/scripts/core/app-core-auto-gear-ui.js`.
- This file seems to be a singleton "view controller" for the Auto Gear pane.
- Export `AUTO_GEAR_UI_EXPORTS` logic.
- The file currently detects DOM elements immediately. Logic should be wrapped in an `initAutoGearUi(doc)` function or similar to improve testability, or at least kept as module-level scope if strictly necessary for legacy behavior, but we prefer extraction.
- Exports:
    - `refreshAutoGearShootingDaysValue`
    - `refreshAutoGearScenarioOptions`
    - `refreshAutoGearMatteboxOptions`
    - etc.
    - `collectAutoGearSelectedValues`
    - `AUTO_GEAR_UI_EXPORTS` (the state object)

#### [MODIFY] `src/scripts/core/app-core-auto-gear-ui.js`
- Convert to a shim.
- Import `AUTO_GEAR_UI_EXPORTS` and initialization logic from `src/scripts/modules/ui/auto-gear-ui.js`.
- Expose `cineCoreAutoGearUi` globally.

#### [NEW] `tests/unit/modules/text.test.js`
- Add unit tests for `src/scripts/modules/text.js` (discovered missing).

### Documentation

#### [MODIFY] `task.md`
- Add "Batch 8: Auto Backup & Auto Gear UI".

#### [MODIFY] `docs/dev/reports/runtime-refactor-status-2025.md`
- Add "Step 39 Complete".

#### [MODIFY] `CODEBASE_MAP.md`
- Add new modules.

## Verification Plan

### Automated Tests
- `npm run test:jest tests/unit/modules/autoBackup.test.js` (To be created)
- `npm run test:jest tests/unit/modules/autoGearUi.test.js` (To be created)
- `npm run test:jest tests/unit/modules/text.test.js`

### Manual Verification
- Open the application.
- Verify "Auto Gear" settings in the Setup or Settings pane (if accessible).
- Verify Auto Backup logging (console check).
