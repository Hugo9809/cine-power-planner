# Imperial Strategy for Global Utility Exposure

Systematically expose all critical auto-gear and utility functions from `app-core-new-1.js` to the global scope (`globalThis`) to ensure compatibility with legacy scripts and other modules that expect these functions to be globally available.

## Proposed Changes

### [app-core-new-1.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-1.js)

#### [MODIFY]
- Expose `createDeferredAutoGearRefresher`, `focusAutoGearConditionPicker`, and `configureAutoGearConditionButtons` to `globalThis`.
- Expose all auto-gear normalizers (`normalizeAutoGearTriggerValue`, etc.) to `globalThis`.
- Ensure `AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS` and `AUTO_GEAR_MONITOR_DEFAULT_TYPES` are globally accessible.
- Add defensive checks and fallbacks for any other commonly used global functions that might be missing at initialization.

### [app-environment.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-environment.js) (If needed)
- Ensure shared runtime state is correctly initialized and exposed.

## Verification Plan

### Manual Verification
- Load the application in the browser and check the console for `ReferenceError` or `TypeError`.
- Specifically verify that navigating to the Settings tab and interacting with Auto-Gear sections does not trigger errors.
- Confirm that `createDeferredAutoGearRefresher` is available in the global console.
