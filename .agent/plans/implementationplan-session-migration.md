# Step 44: App Session Migration

Provide a brief description of the problem and what the change accomplishes.
Refactor the monolithic `app-session.js` (legacy script) into focused ESM modules to continue the architectural migration. This step extracts notification logic, session runtime helpers, and project locking logic into standalone modules, reducing the legacy script to a backward-compatible shim.

## User Review Required
**[IMPORTANT]**
- This refactor replaces the inline `cineProjectLockManager` with the shared `ProjectLockService`. While intended to be compatible, differences in locking strategy (BroadcastChannel vs Navigator Locks) might affect behavior in edge cases (e.g., cross-browser sync).
- Global functions like `showNotification` will now be provided by `src/scripts/modules/ui/notifications.js`.

## Proposed Changes

### UI Feedback
#### [NEW] [notifications.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/ui/notifications.js)
- Extract `showNotification`, `ensureNotificationContainer`, `getNotificationAccentColor`, etc., from `app-session.js`.
- Export `showNotification` and management functions.
- Ensure dependency on DOM (window/document) is handled gracefully (or check context).

### Core Runtime
#### [NEW] [session-runtime.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/core/session-runtime.js)
- Extract `resolveSessionRuntimeFunction`, `getSessionCloneScope` from `app-session.js`.
- These are critical for the "Islands of Automation" pattern.

### Storage / Locking
#### [MODIFY] [ProjectLockService.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/storage/ProjectLockService.js)
- Ensure it exports a singleton or factory compatible with existing usage if needed (it already exports `projectLockService`).
- No major logical changes expected, but we will verify it replaces `cineProjectLockManager`.

### Legacy Shim
#### [MODIFY] [app-session.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-session.js)
- Import `showNotification` from `../modules/ui/notifications.js`.
- Import `projectLockService` from `../modules/storage/ProjectLockService.js`.
- Import `resolveSessionRuntimeFunction` from `../modules/core/session-runtime.js`.
- Replace inline implementations with module calls.
- Maintain global exports (window.showNotification, window.cineProjectLockManager) for backward compatibility.

## Verification Plan

### Automated Tests
- `npm test tests/unit/modules/ui/notifications.test.js` (NEW)
- `npm test tests/unit/modules/core/sessionRuntime.test.js` (NEW)
- `npm test tests/unit/legacy/appSessionShim.test.js` (Verify shim works)

### Manual Verification
- "Open browser to /"
- "Trigger a notification (e.g. Save)"
- "Verify toast appears correctly"
- "Open Project in two tabs"
- "Verify Project Lock warning/takeover flow"
