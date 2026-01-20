# Implementation Plan - Session Migration Phase 5: Project Storage

## Problem
`app-session.js` contains complex logic for:
1.  Resolving the active project storage key.
2.  Managing the "Project Revision" for cross-tab synchronization.
3.  Reloading the project from storage when a revision change is detected.
4.  Scheduling storage sync.

This logic dominates the middle section of the file (~400 lines) and is distinct from the session lifecycle.

## Solution
Extract this logic into a dedicated `ProjectStorageManager` module.

## Proposed Module: `src/scripts/modules/core/project-storage-manager.js`

### Exports
-   `resolveProjectStorageRevisionKeyName()`
-   `readProjectStorageRevisionValue()`
-   `resolveActiveProjectStorageKey(options)`
-   `reloadActiveProjectFromStorage(options, context)`
    -   *Note: This function needs access to many global setters/regenerators. We might need to pass them in context or use an adapter pattern.*
-   `scheduleProjectStorageSync(options)`

## Steps

1.  **Analyze Dependencies:**
    -   `reloadActiveProjectFromStorage` is the heaviest function. It calls:
        -   `restoreSessionStorageSnapshot` (Global)
        -   `restoreLocalStorageSnapshot` (Global)
        -   `setSessionCoreValue` (Global/Session)
        -   `deriveSessionProjectInfo` (Session)
        -   `updateCalculations`, `populateFrameRateDropdown` (Core)
        -   `regenerateGearList` (Local Helper)
    -   We need to determine if we pass these as callbacks or if we keep `reloadActiveProjectFromStorage` in `app-session.js` but delegate the *decision* logic to the module.
    -   *Decision:* The *logic* of determining the key and reading the revision is pure. The *act* of reloading is heavily coupled to the DOM/Session.
    -   *Refined Plan:* Extract the *Revision* and *Key Resolution* logic completely. Keep `reloadActiveProjectFromStorage` in `app-session.js` initially, OR pass a heavy `context` object to the manager.
    -   *Better:* Create `ProjectStorageSync` module that handles the *signals* (revision check) and `ProjectStorageUtils` for key resolution.
    -   Let's stick to `ProjectStorageManager` but make it accept a `reloader` callback for the actual heavy lifting if possible, or just exact the Key/Revision logic first if `reload` is too coupled.
    -   Looking at `reloadActiveProjectFromStorage`, it's 200 lines of UI updates. It essentially restarts the session state.
    -   **Strategy:** Extract `resolveActiveProjectStorageKey`, `readProjectStorageRevisionValue`, and `scheduleProjectStorageSync` (the mechanism).
    -   Leave `reloadActiveProjectFromStorage` in `app-session.js` for now, OR move it to `app-session.js` but use the imported helpers.
    -   Actually, `reloadActiveProjectFromStorage` *is* session logic. It *modifies* the session. The *Project Storage* logic is about *where* to look.

2.  **Create `src/scripts/modules/core/project-storage-manager.js`**
    -   Move `normalizeProjectStorageRevisionValue`
    -   Move `resolveProjectStorageRevisionKeyName`
    -   Move `readProjectStorageRevisionValue`
    -   Move `resolveActiveProjectStorageKey`

3.  **Refactor `app-session.js`**
    -   Import the functions.
    -   Update usages.

4.  **Verification**
    -   Unit tests for key resolution and revision reading.
    -   Manual test: open app in two tabs, save in one, ensure other reloads (or at least detects revision change).

## Testing Strategy
-   Mock `localStorage`.
-   Test `resolveActiveProjectStorageKey` with different URL params (mocked window.location).
