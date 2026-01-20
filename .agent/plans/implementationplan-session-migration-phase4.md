# Step 60: App Session Migration - Phase 4 (Event Binding)

Extract global event listeners and UI binding logic from `app-session.js` into a dedicated `EventBinder` module.

## User Review Required
- **[NOTE]** `flushProjectAutoSaveOnExit` and its listeners (visibilitychange, etc.) will be moved to `EventBinder` to centralize all "app-level" event handling, even though it touches session saving.
- **[NOTE]** The new module will re-query necessary DOM elements (like `motorSelects`, etc.) internally to avoid passing dozens of arguments from `app-session.js`.

## Proposed Changes

### Event Binder Module
#### [NEW] [event-binder.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/core/event-binder.js)
- Export `bindGlobalEvents(context)`:
    - Binds input listeners (setup name).
    - Binds change listeners (dropdowns) to `updateCalculations` and `saveSession`.
    - Binds lifecycle events (`beforeunload`, `visibilitychange`) to `flushProjectAutoSaveOnExit`.
- Will import `_safeSaveCurrentGearList`, `_safeCheckSetupChanged` etc. from `app-session.js`?
    - **Wait**: `app-session.js` defines these wrappers. importing them back creates a cycle.
    - **Solution**: Pass these callbacks as part of the `context` or `callbacks` object to `bindGlobalEvents`.

### App Session
#### [MODIFY] [app-session.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-session.js)
- Import `EventBinder`.
- Create a `callbacks` object containing:
    - `onSave`: `_safeSaveCurrentGearList`
    - `onCheck`: `_safeCheckSetupChanged`
    - `onAutoSave`: `_safeAutoSaveCurrentSetup`
    - `onExit`: `flushProjectAutoSaveOnExit` (logic moved or passed?) -> Logic for `flush` relies on inner state.
- Call `EventBinder.bindGlobalEvents(callbacks)`.
- Remove lines 6840-6942 (approx).

## Verification Plan

### Automated Tests
- Create `tests/unit/modules/core/eventBinder.test.js`.
- Test `bindGlobalEvents`:
    - Mock DOM elements (`setupNameInput`, selects).
    - Verify `addEventListener` is called on them.
    - Verify callbacks are triggered on event simulation.

### Manual Verification
- Open App.
- Change a dropdown (e.g. Battery). Verify calculations update (listener fired).
- Type in Setup Name. Verify it saves/checks.
- Close/Reload tab. Verify "Auto Backup" toast or behavior (if observable).
