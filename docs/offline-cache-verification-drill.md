# Offline Cache & Safeguard Verification Drill

Run this drill whenever service-worker assets, icons or persistence code change.
It confirms cached builds match the repository and that offline safeguards keep
protecting user data.

## Prerequisites

- Local static server (e.g. `npx http-server`) to activate the service worker.
- Latest build of the planner with updated assets.
- Stopwatch or timer to document cadence timings.
- Clean browser profile or private window.

## Drill steps

1. **Prime the cache**
   - Serve the repository locally and load `http://localhost:<port>/index.html`.
   - Wait for the service worker ready prompt; verify the **Force reload** action
     appears, then dismiss the prompt (close it or press <kbd>Esc</kbd>) so the
     cached build keeps running under service-worker control.
   - Capture console logs for cache population messages.
2. **Offline validation**
   - Disconnect the network.
   - Refresh the app; confirm icons, fonts and modules load from the cache.
   - Run a manual save and export a project bundle; verify no network requests
     occur.
3. **Autosave cadence check**
   - Make >50 changes or wait 10 minutes to trigger autosave.
   - Confirm the autosave ledger logs the run and the cache remains intact.
4. **Backup/restore rehearsal**
   - Export a planner backup.
   - Clear application data (localStorage + caches).
   - Restore the backup via the sandbox, then promote it.
   - Ensure the service worker reinstalls seamlessly and logs the restore.
5. **Cache reset test**
   - Click the toolbar’s 🔄 **Force reload** button (or open the help dialog and follow its Force reload link).
   - Confirm the app reloads cleanly, rehydrates from storage and preserves user
     data.

## Evidence to collect

- Console log capturing cache install/activate messages.
- Screenshot of service worker diagnostics (`navigator.serviceWorker` state).
- Autosave ledger export showing offline run.
- Checksums for exported backups/bundles before and after cache reset.
- Notes recorded in `docs/verification-log-template.md`.

## Follow-up

- Update `review-findings.md` with observed issues.
- If behaviour changed, refresh affected docs (operations checklist, save/share
  reference, offline readiness).
- Store evidence with the documentation verification packet.
