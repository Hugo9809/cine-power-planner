# Fix ReferenceError: bindGearListCageListener is not defined

## Goal Description
The application fails to initialize with a `ReferenceError: bindGearListCageListener is not defined` in `app-session.js`. This is because `bindGearListCageListener` and related event listeners are defined locally in `app-setups.js` but are not exposed to the global scope, while `app-session.js` attempts to call them directly.

This plan involves exposing these functions globally in `app-setups.js` so they can be accessed by `app-session.js`.

## Proposed Changes

### Core Logic
#### [MODIFY] [app-setups.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-setups.js)
-   Expose the following functions to `window` (and `globalThis`):
    -   `bindGearListCageListener`
    -   `bindGearListEasyrigListener`
    -   `bindGearListSliderBowlListener`
    -   `bindGearListEyeLeatherListener`
    -   `bindGearListProGaffTapeListener`
    -   `bindGearListDirectorMonitorListener`

## Verification Plan

### Automated Tests
-   **Build Check**: Run `npm run build` to ensure no build errors.
-   **Lint Check**: Run `npm run lint` to check for new lint errors.

### Manual Verification
1.  **Start Server**: Run `npm run dev`.
2.  **Browser Check**: Open the application in the browser (http://localhost:3000).
3.  **Console Check**: Verify that the `ReferenceError: bindGearListCageListener is not defined` is gone.
4.  **Functionality Check**:
    -   Load a project or ensure the gear list is visible.
    -   INTERACT with the "Camera Cage" dropdown in the gear list.
    -   Verify that changes are reflected (e.g. valid selection persists).
    -   Check other exposed listeners (Easyrig, Slider Bowl, etc.) if possible.
