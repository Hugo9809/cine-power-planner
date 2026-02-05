# Implementation Plan - Fix Auto Gear Constants Reference Errors

The application is failing to load due to `Uncaught ReferenceError: AUTO_GEAR_CONDITION_LOGIC_FIELDS is not defined` in `app-core-new-1.js`. This variable is defined in `normalizers.js` but not exported.

## User Review Required

> [!IMPORTANT]
> This plan modifies `src/scripts/auto-gear/normalizers.js` to export internal constants to the global scope. This relies on `normalizers.js` running before `app-core-new-1.js` or correct module loading.

- [ ] Verify that `app-core-new-1.js` execution order allows it to see `globalThis` properties set by `normalizers.js`. (The logs suggest `force-populate.js` loads, and `normalizers.js` is likely loaded early as a utility).

## Proposed Changes

### `src/scripts/auto-gear/normalizers.js`

- [ ] Define `AUTO_GEAR_CONDITION_KEYS` if missing.
  - Construct it as `['always', 'scenarios', 'shootingDays', 'cameraWeight', ...Object.keys(AUTO_GEAR_CONDITION_LOGIC_FIELDS)]`.
- [ ] Define `AUTO_GEAR_REPEATABLE_CONDITIONS` as `new Set()` (empty) if missing, to prevent ReferenceErrors.
- [ ] Add the following to `AUTO_GEAR_NORMALIZER_EXPORTS`:
  - `AUTO_GEAR_CONDITION_LOGIC_FIELDS`
  - `AUTO_GEAR_CONDITION_LOGIC_VALUES`
  - `AUTO_GEAR_SHOOTING_DAY_MODES`
  - `AUTO_GEAR_CONDITION_KEYS`
  - `AUTO_GEAR_REPEATABLE_CONDITIONS`

## Verification Plan

### Automated Tests
- Run the build/dev server and check the console logs.
- Verify `Uncaught ReferenceError` is gone.
- Verify Auto Gear UI components (if accessible) load without error.

### Manual Verification
- Open the application.
- Check the console for errors.
- Try to interact with "Auto Gear" settings if possible.
