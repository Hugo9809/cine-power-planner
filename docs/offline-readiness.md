# Offline Readiness Runbook

Use this runbook to certify a workstation or release build for offline use.
Complete it before travelling, before rehearsals with new crews and prior to
shipping documentation updates.

## 1. Prepare the environment

- Install dependencies and build the app if needed.
- Clear service-worker caches for the domain and remove old planner data if you
  require a clean slate.
- Gather the latest planner backup, project bundles and documentation packet.

## 2. Prime the build

- Load the app with a network connection.
- Visit settings, help, legal pages and translations to warm all caches.
- Switch through each theme and language so locally stored assets render.

## 3. Enter offline mode

- Disconnect from the network.
- Reload the app and confirm it starts without errors, icons or fonts missing.
- Verify the offline indicator is visible and the service worker reports the
  cached build version.

## 4. Rehearse critical workflows

1. **Manual save and compare.** Create or load a project, save it manually and
   use the compare view to check history entries.
2. **Autosave cadence.** Make incremental changes, wait for the autosave timer
   and confirm an `auto-backup-*` entry appears.
3. **Backup & restore.** Export a planner backup, then run a restore rehearsal to
   confirm data integrity.
4. **Share & import.** Export a project bundle, wipe the selector sandbox and
   import the bundle to confirm it rehydrates correctly.
5. **Automatic gear presets.** Adjust presets, export them, clear local data and
   re-import to verify redundancy.

## 5. Inspect safeguards

- Run `window.cineRuntime.verifyCriticalFlows()` and record the results.
- Review storage keys to confirm mirrored backups exist.
- Check the autosave ledger for the rehearsed session.
- Confirm help topics and tooltips match the documented steps.

## 6. Archive evidence

- Complete the [Documentation Status Report](documentation-status-report-template.md).
- Update the [Verification Log](verification-log-template.md) with timestamps and
  file names.
- Store planner backups, bundles, screenshots and console logs in two offline
  locations.

Passing this runbook certifies that the workstation is ready for offline use and
that no user data is at risk.
