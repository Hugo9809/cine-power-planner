# Debugging Initialization Warnings

## Goal Description
Resolve console warnings appearing during application initialization to ensure a clean boot process and correct functionality. The warnings are:
1. `[Cine Power Planner] Missing help text for projectRequirementsNav in lang en`
2. `[HelpService] Localization module not found. V1 topics unavailable.`
3. `cineResults.updateCalculations not available`
4. `Onboarding tour module deferred scripts could not be requested.`

## User Review Required
> [!NOTE]
> No high-risk or breaking changes. Review the specific fixes for localization and script loading logic below.

## Proposed Changes

### Internationalization
#### [MODIFY] [app-core-new-1.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-1.js)
- Fix typo in help text lookup key.
- Change `${navKey} Help` to `${navKey}Help` (remove space) to match translation file keys (e.g., `projectRequirementsNavHelp`).

### Help Service
#### [MODIFY] [help-service.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/v2/help-service.js)
- Update `getV1Topics` to also check for `global.cineCoreLocalizationBridge` if `global.cineCoreLocalization` is missing. The `localization.js` module exposes the bridge, but the service is looking for the legacy name.

### Results Module
#### [MODIFY] [app-core-new-2.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-2.js)
- Update `updateCalculations` function to try `window.cineCoreSession.updateCalculations` as a fallback if `cineResults.updateCalculations` is unavailable. This handles race conditions where `cineResults` module (from `results.js`) hasn't finished registering yet.

### Onboarding Tour
#### [MODIFY] [onboarding-loader-hook.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/features/onboarding-loader-hook.js)
- Investigate why `cineEnsureDeferredScriptsLoaded` is missing.
- Locate the definition of `cineEnsureDeferredScriptsLoaded` (likely in a `bootstrap` or `main` file not yet fully inspected).
- If it exists but is not exposed, expose it.
- If it is missing, implementing a stub or proper loader logic may be required (will determine during execution).

## Verification Plan

### Automated Tests
- Run `npm run dev` and check the browser console.
- Verify that the specific warnings listed above no longer appear.

### Manual Verification
- **Help Text**: Hover over "Project Requirements" (or check code inspection) to ensure `data-help` attribute is present and no warning in console.
- **Help Service**: Open Help panel (if accessible) and verify topics load.
- **Calculations**: Change a camera/battery selection and verify that calculations update (power draw changes).
- **Onboarding**: Verify onboarding tour (if triggered) loads or at least doesn't throw the "deferred scripts" warning.
