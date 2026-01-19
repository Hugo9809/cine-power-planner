# Step 44: App Session Migration - Phase 2 (Settings)

Identify and extract Settings & Appearance logic from the dynamic binding system to standard ESM imports.

## User Review Required
- **[IMPORTANT]** `settings-and-appearance.js` will be converted to a module that exports its API. Any other scripts relying on `window.cineSettingsAppearance` (none found) would break, but our search confirmed only `app-session.js` uses it.

## Proposed Changes

### Settings Module
#### [MODIFY] [settings-and-appearance.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/settings-and-appearance.js)
- Remove IIFE and `cineModuleBase` wrapping.
- Export `createAppearanceManager`.
- Create and export a singleton `appearanceManager` initialized with `window`/`document`.
- Export individual functions if needed (e.g. `const { applyPinkMode } = appearanceManager; export { applyPinkMode };`).

### App Session
#### [MODIFY] [app-session.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-session.js)
- Remove `applyAppearanceModuleBindings`.
- Remove `buildThemePreferenceController`, `buildPinkModePreferenceController`.
- Import `appearanceManager` or specific functions.
- Update event listeners to call imported functions directly.

## Verification Plan

### Automated Tests
- Create `tests/unit/modules/settingsAndAppearance.test.js`.
- Verify `createAppearanceManager` returns expected API.
- Verify singleton initialization.

### Manual Verification
- Open Settings menu.
- Toggle "Pink Mode".
- Toggle "High Contrast".
- Verify persistence (reload page).
