# Offline Readiness Runbook

Use this runbook to certify a workstation or release build for offline use.
Complete it before travelling, rehearsing with new crews or shipping
documentation updates.

## 1. Prepare the environment

- Install dependencies and build the app if needed.
- Clear service worker caches for the domain and remove old planner data if you
  require a clean slate.
- Gather the latest planner backup, project bundles, translation exports and
  documentation packet.

## 2. Prime the build

- Load the app with a network connection.
- Visit settings, help, legal pages and translations to warm caches.
- Switch through each theme and language so locally stored assets render.
- Confirm `service-worker-assets.js` matches the service worker cache list.

## 3. Enter offline mode

- Disconnect from the network.
- Reload the app and confirm it starts without errors, icons or fonts missing.
- Verify offline indicators are visible and the service worker reports the cached
  build version.

## 4. Rehearse critical workflows

1. **Manual save & compare.** Create or load a project, save manually and use the
   compare view to review history entries.
2. **Autosave cadence.** Make incremental changes, wait for the autosave timer
   and confirm a new `auto-backup-*` entry.
3. **Backup & restore.** Export a planner backup then run a restore rehearsal to
   confirm data integrity and mirrored keys.
4. **Share & import.** Export a project bundle, clear the selector sandbox and
   import the bundle to verify rehydration.
5. **Automatic gear presets.** Adjust presets, export them, clear local data and
   re-import to confirm redundancy.
6. **Translation export.** Export locale data if applicable and confirm it loads
   correctly after a restart.

## 5. Inspect safeguards

- Run `window.cineRuntime.verifyCriticalFlows()` and record the results.
- Review storage keys to confirm mirrored backups exist for each dataset.
- Check the autosave ledger for timestamps from this rehearsal.
- Confirm help topics, tooltips and documentation match the actual flow.

## 6. Archive evidence

- Complete the [Documentation Status Report](documentation-status-report-template.md).
- Update the [Verification Log](verification-log-template.md) with timestamps,
  filenames and checksum notes.
- Store planner backups, bundles, translation exports, screenshots and console
  logs in two offline locations.

Passing this runbook certifies that the workstation is ready for offline use and
that no user data is at risk.
