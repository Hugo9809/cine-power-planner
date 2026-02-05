# Task: Fix Auto Gear Constants Reference Errors

## Status
- [x] Fix `Uncaught ReferenceError: AUTO_GEAR_CONDITION_LOGIC_FIELDS is not defined` <!-- id: 0 -->
    - [x] Analyze codebase to find definition of `AUTO_GEAR_CONDITION_LOGIC_FIELDS`. <!-- id: 1 -->
    - [x] Identify it is in `src/scripts/auto-gear/normalizers.js` but not exported. <!-- id: 2 -->
    - [x] Modify `src/scripts/auto-gear/normalizers.js` to export required constants. <!-- id: 3 -->
    - [x] Define missing `AUTO_GEAR_CONDITION_KEYS` and `AUTO_GEAR_REPEATABLE_CONDITIONS`. <!-- id: 4 -->
- [x] Verify Fix <!-- id: 5 -->
    - [x] Start Dev Server. <!-- id: 6 -->
    - [x] Browsse to `http://localhost:3000/`. <!-- id: 7 -->
    - [x] Check Console for errors. <!-- id: 8 -->
    - [x] Confirm Auto Gear Rules load successfully. <!-- id: 9 -->

## Context
The application failed to load due to missing global constants that `app-core-new-1.js` relies on. These constants were defined in `normalizers.js` but not exposed to the global scope or exported for module consumption.
