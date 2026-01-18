# Batch 13 - Final Verification Plan

Stabilize and verify the recent "Runtime Refactor" architecture changes (Steps 40-44).
This phase ensures that the new modular runtime boots correctly, manages session state safely, and handles project locking without regressions.

## User Review Required
**[IMPORTANT]**
- This is a verification-only phase. No functional code changes are planned unless regressions are found.
- The `web-lock-manager.js` uses `navigator.locks`. This API is supported in modern browsers but might behave differently than the legacy polling mechanism in very old environments. Ensure testing touches on this.

## Proposed Actions

### Automated Verification
#### [EXECUTE] Run Unified Test Suite
Run the specific unit tests for the recently migrated modules to confirm stability.
- `tests/unit/modules/core/bootstrap.test.js` (Step 43)
- `tests/unit/modules/ui/notifications.test.js` (Step 44)
- `tests/unit/modules/core/sessionRuntime.test.js` (Step 44)
- `tests/unit/modules/core/webLockManager.test.js` (Step 44)
- `tests/unit/modules/core/pinkMode.test.js` (Step 42)

#### [EXECUTE] Consistency Checks
- Run `npm run check-consistency` to ensure no circular dependencies or missing exports.
- Run `npm run lint` to catch potential syntax or style issues in new modules.

### Manual Verification (Browser)
Since automated E2E tests for these specific interactions are not set up, perform the following:

#### [TEST] Cold Boot
1.  Open the application in a fresh browser session (incognito).
2.  Verify the "Preparing planner..." loading indicator appears and dismisses.
3.  Confirm the main UI loads without console errors.

#### [TEST] Project Locking
1.  Open Project A in Tab 1.
2.  Open Project A in Tab 2.
3.  Verify Tab 2 shows a "Project Locked" warning or takes over the lock (depending on implementation specifics).
4.  Close Tab 1.
5.  Verify Tab 2 can acquire the lock (refresh or interaction).

#### [TEST] Offline Resilience
1.  Load the app.
2.  Go Offline (Network tab -> Offline).
3.  Trigger an action (e.g., Save).
4.  Verify no "Network Error" crashes occur; appropriate offline indicators (if any) should appear.
5.  Trigger a "Force Reload" scenario (simulate by calling `resolveForceReloadOfflineNotice` in console) and check the message.

## Verification Plan

### Automated Tests
```bash
npm run test:jest tests/unit/modules/core/bootstrap.test.js tests/unit/modules/ui/notifications.test.js tests/unit/modules/core/sessionRuntime.test.js tests/unit/modules/core/webLockManager.test.js tests/unit/modules/core/pinkMode.test.js
npm run check-consistency
npm run lint
```
