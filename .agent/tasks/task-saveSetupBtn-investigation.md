# SaveSetupBtn Investigation Task

## Objective
Investigate and document the `saveSetupBtn` functionality in the Cine Power Planner application, specifically focusing on how project saving works in the V2 UI mode.

## Summary of Findings

### Save Flow Architecture

The project save functionality involves multiple components working together:

1. **V2 UI Entry Point** (`project-dashboard.js`)
   - User clicks "New Project" or "Save" in V2 UI
   - `handleCreate()` async function is called
   - Calls `createProject(projectName, metadata)`

2. **V2 to Legacy Bridge** (`legacy-shim.js`)
   - `createProject(projectName)` function:
     - Sets `setupSelect.value = ''` and dispatches change event
     - Sets `setupNameInput.value = projectName` and dispatches input event
     - Calls `saveProject()` which triggers `triggerLegacyClick('saveSetupBtn')`

3. **Legacy Event Handler** (`app-events.js`)
   - `saveSetupBtn` click listener attached via `addSafeEventListener` (line 2322)
   - `handleSaveSetupClick()` shows loading indicator (line 2295-2320)
   - `handleSaveSetupClickInternal()` performs the actual save (line 2099-2293):
     - Reads project name from `setupNameInput.value`
     - Gets current setup state via `getCurrentSetupState()`
     - Stores setups via `storeSetups(setups)`

4. **Storage Layer** (`storage.js`)
   - `storeSetups()` → `saveSetups()` (line 5818-5820 in app-core-new-1.js)
   - `saveSetups()` (line 9568-9599 in storage.js):
     - Normalizes and serializes setups
     - Saves to `cameraPowerPlanner_setups` key in localStorage

5. **Polling for Completion** (`project-dashboard.js`)
   - `createProject()` polls localStorage for the new project (lines 1464-1493)
   - Max 50 attempts (5 seconds timeout)
   - On success, updates metadata and navigates to project detail view

### Key Elements

| Element | Location | Purpose |
|---------|----------|---------|
| `saveSetupBtn` | `index.html:455` | Legacy save button (hidden in V2 mode) |
| `setupSelect` | `index.html:443-445` | Project selector dropdown |
| `setupNameInput` | `index.html:454` | Project name input field |
| `STORAGE_KEY` | Both files | `cameraPowerPlanner_setups` |

### Potential Issues Identified

1. **V2 Mode Hides `mainContent`**: When V2 mode is enabled, `mainContent` (which contains `saveSetupBtn`, `setupSelect`, `setupNameInput`) is hidden via `display: none`. However, the elements still exist in DOM and events should still work.

2. **Event Listener Attachment Timing**: `addSafeEventListener` uses a robust polling mechanism if the element isn't immediately available, which should handle race conditions.

3. **localStorage Compression**: The storage layer may compress data, but `loadJSONFromStorage` handles decompression, so this should be transparent.

## Status

- [x] Analyzed saveSetupBtn DOM definition
- [x] Analyzed event listener attachment in app-events.js
- [x] Analyzed legacy-shim.js bridge functions
- [x] Analyzed storage layer (storage.js)
- [x] Analyzed project-dashboard.js createProject flow
- [x] Documented complete save flow architecture
- [x] Added debug logging to trace execution
- [ ] Browser testing (requires manual testing)

## Debug Logging Added

The following console.log statements have been added to trace the save flow:

1. **`legacy-shim.js`**:
   - `[LegacyShim] createProject called with name: "..."` 
   - `[LegacyShim] Setting setupSelect.value to empty (New Project)`
   - `[LegacyShim] Setting setupNameInput.value to: "..."`
   - `[LegacyShim] Calling saveProject()`
   - `[LegacyShim] triggerLegacyClick called for: saveSetupBtn`
   - `[LegacyShim] Dispatching click event on: saveSetupBtn`

2. **`app-events.js`**:
   - `[AppEvents] handleSaveSetupClickInternal called`
   - `[AppEvents] Project name from setupNameInput: "..."`
   - `[AppEvents] Calling storeSetups with project: "..."`
   - `[AppEvents] storeSetups completed`

## Manual Testing Instructions

1. Open Chrome DevTools (F12) and go to the Console tab
2. Navigate to http://localhost:3000/#/projects
3. Click "+ New Project" button
4. Enter a project name (e.g., "Debug Test Project")
5. Click "Create"
6. Check the console for the log messages listed above
7. Verify the project appears in the dashboard after creation

## Expected Log Sequence

```
[LegacyShim] createProject called with name: "Debug Test Project"
[LegacyShim] Setting setupSelect.value to empty (New Project)
[LegacyShim] Setting setupNameInput.value to: "Debug Test Project"
[LegacyShim] Calling saveProject()
[LegacyShim] triggerLegacyClick called for: saveSetupBtn
[LegacyShim] Dispatching click event on: saveSetupBtn
[AppEvents] handleSaveSetupClickInternal called
[AppEvents] Project name from setupNameInput: "Debug Test Project"
[AppEvents] Calling storeSetups with project: "Debug Test Project"
[AppEvents] storeSetups completed
```

If any of these logs are missing, it indicates where the save flow is breaking.

## Related Files

- `/src/scripts/v2/project-dashboard.js` - V2 Project creation UI
- `/src/scripts/v2/legacy-shim.js` - V2/Legacy bridge
- `/src/scripts/core/app-events.js` - Event handlers including saveSetupBtn
- `/src/scripts/core/app-core-new-1.js` - Core runtime setup
- `/src/scripts/storage.js` - Storage layer
- `/index.html` - DOM structure
