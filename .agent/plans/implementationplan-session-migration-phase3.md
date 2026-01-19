# Step 45: App Session Migration - Phase 3 (URL Handling)

Extract URL parameter handling logic (specifically `shared` setup decoding) into a dedicated module to separate routing concerns from session management.

## User Review Required
- **[NOTE]** `applySharedSetup` (the logic that *applies* the data to the UI) will remain in `app-session.js` for now due to its heavy coupling with global UI state (Auto Gear, etc.). The new module will essentially be a "URL Parser/Provider".

## Proposed Changes

### URL Handler Module
#### [NEW] [url-handler.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/core/url-handler.js)
- Create a new module that exports:
    - `parseSharedSetupFromUrl(searchString)`: Returns decoded data object or null.
    - `cleanUrlParams()`: Removes `shared` param from browser history.
- Logic will move from `app-session.js` (lines ~6800-6841).
- Will rely on `LZString` (assumed global or importable).

### App Session
#### [MODIFY] [app-session.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-session.js)
- Import `UrlHandler` from `../modules/core/url-handler.js`.
- Replace `applySharedSetupFromUrl` with a call to `UrlHandler.parseSharedSetupFromUrl(window.location.search)`.
- If data is returned, call `applySharedSetup(data)` and then `UrlHandler.cleanUrlParams()`.

## Verification Plan

### Automated Tests
- Create `tests/unit/modules/core/urlHandler.test.js`.
- Test `parseSharedSetupFromUrl`:
    - With valid `?shared=...` string (mocking LZString).
    - With invalid/empty strings.
- Test `cleanUrlParams`:
    - Mock `window.history.replaceState` and verify it's called with cleaned URL.

### Manual Verification
- Generate a shared link from the app.
- Open the link in a new tab.
- Verify the project loads correctly.
- Verify the `?shared=...` parameter is removed from the URL bar after loading.
