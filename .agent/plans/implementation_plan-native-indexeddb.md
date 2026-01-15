# Implementation Plan - Native IndexedDB by Default

The goal is to ensure that the application uses IndexedDB by default for new installations or after a factory reset, rather than falling back to LocalStorage. Currently, `storage.js` only switches to IndexedDB if a migration *actively* transfers data.

## User Review Required

> [!IMPORTANT]
> This change will force IndexedDB usage for all users who have effectively "completed" migration (which includes fresh users with empty LocalStorage). This is the desired behavior but represents a logic shift from "migration-driven" to "state-driven" storage selection.

## Proposed Changes

### Storage Module

#### [MODIFY] [StorageMigrationService.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/storage/StorageMigrationService.js)
- Add `async isMigrated()` method to check for the `cine_storage_migrated_v2` flag.
- Ensure `markAsMigrated()` writes to both storage backends (already verified, but will confirm robustness).

#### [MODIFY] [storage.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/storage.js)
- Update initialization logic to switch to `IndexedDBAdapter` if `migrationService.isMigrated()` returns true, even if `runMigrationIfNeeded()` returns false (indicating no *new* work was done).

## Verification Plan

### Automated Tests
- Run existing tests: `npm test tests/unit/factoryReset.test.js`
- Run existing storage tests: `npm test tests/unit/storage.test.js`

### Manual Verification
- Since I cannot easily reset the browser state, I will verify the logic flow by ensuring the code explicitly checks the flag after the migration attempt.
- (If possible with available tools) Verify `localStorage` has `cine_storage_migrated_v2: "true"` and `storageRepo.driver` is `IndexedDBAdapter`.
