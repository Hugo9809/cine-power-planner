# Walkthrough - Session Migration Phase 5: Project Storage Extraction

## Overview
This phase focused on extracting the project storage synchronization and revision tracking logic from `app-session.js` into a dedicated `ProjectStorageManager` module. This logic handles cross-tab synchronization and resolving the active project's storage key.

## Changes

### 1. Created `src/scripts/modules/core/project-storage-manager.js`
-   Encapsulates logic for:
    -   Resolving the project revision key name.
    -   Reading the current project revision from local storage.
    -   Resolving the active project storage key (checking URL, typed name, setup select).
    -   Scheduling storage synchronization (debounced reload).
    -   Initializing the `storage` event listener for auto-sync.

### 2. Created Unit Tests
-   `tests/unit/modules/core/projectStorageManager.test.js` covers:
    -   `resolveActiveProjectStorageKey` logic (priority rules).
    -   `readRevision` parsing.
    -   `scheduleSync` debouncing.

### 3. Refactored `src/scripts/core/app-session.js`
-   Imported `ProjectStorageManager`.
-   Replaced `PROJECT_STORAGE_REV_KEY_FALLBACK` with `ProjectStorageManager.getRevisionKey()`.
-   Replaced `resolveProjectStorageRevisionKeyName` implementation with a delegate call.
-   Replaced `readProjectStorageRevisionValue` implementation with a delegate call.
-   Replaced `resolveActiveProjectStorageKey` implementation with a delegate call.
-   Replaced `scheduleProjectStorageSync` implementation with `ProjectStorageManager.scheduleSync`.
-   Replaced the global `window.addEventListener('storage', ...)` block with `ProjectStorageManager.initAutoSync`.

## Verification Results

### Unit Tests
```
PASS   unit  tests/unit/modules/core/projectStorageManager.test.js
  ProjectStorageManager
    resolveActiveProjectStorageKey
      ✓ should assume typed name if safeGetCurrentProjectName returns value (3 ms)
      ✓ should fallback to setupSelect value
      ✓ should prefer passed element over document query
    readRevision
      ✓ should return parsed number from local storage
      ✓ should return null for invalid values
    scheduleSync
      ✓ should debounce sync calls (1 ms)
```

## Next Steps
-   Continue with further session logic migration if planned (e.g., Export/Import logic).
