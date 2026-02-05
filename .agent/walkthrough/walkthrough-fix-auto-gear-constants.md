# Walkthrough - Fix Auto Gear Constants

I have resolved the critical initialization error preventing the application from loading.

## Problem
The application crashed on startup with:
`Uncaught ReferenceError: AUTO_GEAR_CONDITION_LOGIC_FIELDS is not defined` in `app-core-new-1.js`.

This occurred because `app-core-new-1.js` relies on specific Auto Gear constants to be available in the global scope (or shimmed), but they were defined locally inside `src/scripts/auto-gear/normalizers.js` without being exported.

## Solution
I modified `src/scripts/auto-gear/normalizers.js` to correctly export the missing constants to the global scope (`globalThis`/`window`).

### Changes
*   **Exported** `AUTO_GEAR_CONDITION_LOGIC_FIELDS`: Maps rule keys to their logic property names.
*   **Exported** `AUTO_GEAR_CONDITION_LOGIC_VALUES`: Set of valid logic operators.
*   **Exported** `AUTO_GEAR_SHOOTING_DAY_MODES`: Set of valid shooting day modes.
*   **Defined & Exported** `AUTO_GEAR_CONDITION_KEYS`: Constructed dynamically from the logic fields + standard keys (`always`, `scenarios`, etc.), ensuring other scripts can iterate over valid conditions.
*   **Defined & Exported** `AUTO_GEAR_REPEATABLE_CONDITIONS`: Defined as a safe empty `Set` to prevent reference errors in logic that checks for repeatability.

## Verification
I launched the application in a browser environment to verify the fix:

*   **Console Check**: The `ReferenceError` is gone. The console logs `✅ Auto Gear Rules loaded (ESM)`, confirming the module initializes correctly.
*   **UI Check**: The "Auto Gear Rules" section is accessible and loads without crashing.

## Next Steps
The application is now stable. You can proceed with further refactoring or feature development.
