# Implementation Plan - Batch 10: App Events Migration

## Objective
Migrate `src/scripts/core/app-events.js` to the ESM architecture. This file currently acts as a monolithic controller, defining UI accessors on the global scope and attaching event listeners. We will extract this logic into modular components while maintaining backward compatibility.

## Proposed Changes

### 1. Extract UI Definitions
Create `src/scripts/modules/ui/dom-definitions.js` to handle the `defineUiGetter` logic and the extensive list of UI element definitions.

- **Exports**: `defineUiGetter`, `initializeDomDefinitions` (to run the definitions).
- **Dependencies**: `cineUiCache`.

### 2. Extract Event Logic
Create `src/scripts/modules/events/manager.js` (or similar) to encapsulate the event setup logic. usage of `app-events.js` logic will be moved here.

- **Exports**: `initAppEvents`.
- **Logic**:
    - DOMContentLoaded listeners.
    - Event delegation setup.
    - Wiring global functions to UI events.

### 3. Refactor `app-events.js`
Update `src/scripts/core/app-events.js` to become a thin shim that:
- Imports `dom-definitions.js` and runs it.
- Imports `events/manager.js` and runs initialization.
- Re-exports any necessary symbols (though `app-events.js` primarily relies on side effects).

## Verification Plan

### Automated Tests
- **Build Verification**: Run `npm run build` to ensure no module resolution errors.
- **Unit Tests**: Create `tests/unit/modules/ui/domDefinitions.test.js` to verify `defineUiGetter` logic works and defines properties on the target object.

### Manual Verification
- **UI Interaction**: Click around the app (Setup name, Add Device, etc.) to ensure event listeners are still active.
- **Console Check**: Verify no "ReferenceError" for UI elements in the console.

## Task List
- [ ] Create `src/scripts/modules/ui/dom-definitions.js`.
- [ ] Create `src/scripts/modules/events/manager.js`.
- [ ] Refactor `src/scripts/core/app-events.js`.
- [ ] Create `tests/unit/modules/ui/domDefinitions.test.js`.
- [ ] Verify Build.
