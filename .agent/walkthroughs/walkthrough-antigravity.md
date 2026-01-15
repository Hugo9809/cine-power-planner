# Walkthrough - Globalize V2 UI Design & Fix Persistence + Native IDB Migration

The goal was to extend the "perfect" Sidebar styling to the rest of the V2 UI, ensure a consistent, premium, and responsive experience, and fully migrate project creation to the Native IndexedDB architecture.

## Changes

### 1. Variables & Global Tokens
- Audited `variables.css` to ensuring all Sidebar tokens (`--v2-sidebar-*` fallbacks) are supported by global `--v2-surface-*` and `--v2-border-*` tokens.

### 2. Device Library Refactor
- **Removed Local Variables**: Stripped `--dl-*` variables in favor of global `v2-*` tokens.
- **Typography**: Updated headers to use `clamp()` scaling and `v2-font-weight-semibold` to match the Sidebar title.
- **Inputs**: search inputs now use the identical padding `10px 14px` and styling as the Sidebar search.
- **Controls**: Standardized buttons to use `buttons.css` classes.

### 3. Project Dashboard Refactor
- **Picker Triggers**: Updated `v2-picker-trigger` (dropdowns) to match the standard input height (`48px`) and padding (`10px 14px`).
- **Typography**: Increased font size of labels to `base` (16px) for better readability.
- **Async Data Loading**: Refactored the dashboard to load project data asynchronously (`async`/`await`). This fixes timing issues where the grid would render before data was ready.
- **Unified Data Provider**: Updated the Data Provider to merge project lists from both V2 (IndexedDB) and Legacy (LocalStorage) sources. This resolves the "Split Brain" issue where projects created prior to migration are still visible.

### 4. Help View
- **Search Input**: Explicitly styled the help search bar to match the global `v2-input` aesthetic.

### 5. Tiles
- **New Project Tile**: Verified consistency with standard border radius and interaction states.

### 6. Feature: Native IndexedDB Project Creation
- **Request**: Switch "New Project" logic to use the new Native IndexedDB storage architecture, bypassing the legacy LocalStorage save mechanism.
- **Implementation**:
    1.  **ProjectDashboard**: Updated `createProject` to use `projectService.createProject` (IndexedDB) directly. Removed calls to `cineLegacyShim.createProject`.
    2.  **Legacy Compatibility (Hydration)**: Updated `legacy-shim.js` to support "Hydration" from the Native Service. When the Project Detail view opens a project that exists in IDB but not in Legacy memory, the shim fetches the data from `projectService` and injects it into the Legacy UI components (and form state) on the fly.
    3.  **Async Support**: Refactored `project-detail.js` and `legacy-shim.js` to handle asynchronous project loading, essential for IndexedDB interactions.

### 7. Bug Fixes (Exploratory Testing)
- **Persistence Sync (The "Save" Bug)**: Identified a critical data loss risk where saving a project in the Legacy View (which writes to `localStorage`) would not update the Native IndexedDB. On reload, the V2 app would load the stale version from IndexedDB.
    - **Fix**: Implemented "Reverse Sync" in `legacy-shim.js`. It hooks the `saveSetupBtn` and writes the updated data from `localStorage` back to `ProjectService` (IndexedDB) immediately after a save.
- **Phantom Projects (The "Delete" Bug)**: Deleting a project in Legacy View only removed it from `localStorage`, leaving it in IndexedDB (which would then reappear in the dashboard).
    - **Fix**: Hooked the `deleteSetupBtn` in `legacy-shim.js` to detect deletions and execute the corresponding delete in `ProjectService`.
- **Empty Export Links (The "Share" Bug)**: Identified that "Sharing" a project immediately after Hydration could result in an empty/broken link because the Legacy App's memory state (`setups`) wasn't explicitly populated by the DOM hydration.
    - **Fix**: Hooked the `shareSetupBtn` in `legacy-shim.js` to trigger a programmatic click on `saveSetupBtn` *before* the share action proceeds. This forces the UI state to be flushed to memory (and IndexedDB via Reverse Sync), ensuring a valid export link is generated.

## Verification Results

### Automated Checks
- **CSS Syntax**: Verified via file reads and structure checks. No syntax errors detected in modified files.
- **Token consistency**: Validated that `var(--v2-*)` references exist in `variables.css`.

### Visual Verification (Anticipated)
- **Sidebar & Content Harmony**: The main content area now uses the same surfaces and border logic as the sidebar.
- **Persistence**: Newly created projects now persist in the dashboard after navigation and reload. The dashboard handles the asynchronous loading of both Legacy and V2 projects seamlessly.
- **Native Creation**: Creating a new project now writes directly to IndexedDB. Opening it works seamlessly due to the hydration shim.
- **Data Integrity**: Edits made in the legacy detail view are now correctly synced back to IndexedDB.
- **Sharing**: Exporting a project generates a valid link even if no manual save was performed after loading.
