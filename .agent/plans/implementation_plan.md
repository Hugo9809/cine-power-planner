# Bug Fix: Runtime ReferenceErrors

## Goal Description
Fix `Uncaught ReferenceError`s preventing stable application runtime:
1. `lastSetupName` is not defined in `app-events.js`.
2. `factoryResetInProgress` is not defined in `app-setups.js`.

## User Review Required
No major design changes. Fixing global/module scope variable access.

## Proposed Changes

### Core Scripts

#### [MODIFY] [app-events.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-events.js)
- Declare `let lastSetupName = '';` at the module top level.

#### [MODIFY] [app-setups.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-setups.js)
-  Check if `factoryResetInProgress` is available on `window` or import it if possible.
-  If it relies on a global from `app-session.js`, ensure it is accessed defensively (e.g., `window.factoryResetInProgress` or `typeof factoryResetInProgress !== 'undefined'`).

## Verification Plan

### Automated Tests
- None available for these specific UI interaction flows.

### Manual Verification
1.  **Reload the App**: Ensure no `ReferenceError`s appear in the console on load.
2.  **Change Setup**: Switch projects in the dropdown (`setupSelect`). Verify `lastSetupName` logic works (no errors).
3.  **Delete Setup**: Try deleting a setup (triggers `handleDeleteSetupClickInternal` which uses `lastSetupName`).
4.  **Save Gear List**: Trigger a save (autosave or manual) to ensure `saveCurrentGearListImplementation` doesn't crash on `factoryResetInProgress` check.
