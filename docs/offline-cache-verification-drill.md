# Offline Cache & Safeguard Verification Drill

Run this drill whenever service-worker assets, icons or persistence code change.
It confirms cached builds match the repository and that offline safeguards keep
protecting user data. Before starting, run `npm run check-consistency`. The
script now compares the in-memory manifest with `service-worker-assets.js` and
fails when they drift. If it reports differences, regenerate the manifest with
`npm run generate:sw-assets`, rerun the check, then continue with the drill.

## Prerequisites

- Local static server (e.g. `npx http-server`) to activate the service worker.
- Latest build of the planner with updated assets.
- Stopwatch or timer to document cadence timings.
- Clean browser profile or private window.

## Drill steps

1. **Verify the manifest list**
   - Confirm `npm run check-consistency` completed without manifest errors.
   - Open `service-worker-assets.js` and confirm the array includes
     `"./service-worker-assets.js"` (search within the file if needed).
   - If it is missing or out of sync, rerun `npm run generate:sw-assets`,
     rerun the check and investigate the diff before proceeding—offline reloads
     depend on this entry to ship refreshed manifests.
2. **Prime the cache**
   - Serve the repository locally and load `http://localhost:<port>/index.html`.
   - Wait for the service worker ready prompt; verify the **Force reload** action
     appears, then dismiss the prompt (close it or press <kbd>Esc</kbd>) so the
     cached build keeps running under service-worker control.
   - Capture console logs for cache population messages.
3. **Offline validation**
   - Disconnect the network.
   - Refresh the app; confirm icons, fonts and modules load from the cache.
   - Run a manual save and export a project bundle; verify no network requests
     occur.
   - In DevTools confirm `window.APP_VERSION`, `window.CPP_APP_VERSION` and
     `window.cinePowerPlanner.version` still report the expected release value
     while offline.
4. **Autosave cadence check**
   - Make >50 changes or wait 10 minutes to trigger autosave.
   - Confirm the autosave ledger logs the run and the cache remains intact.
5. **Backup/restore rehearsal**
   - Export a planner backup.
   - Clear application data (localStorage + caches).
   - Restore the backup via the sandbox, then promote it.
   - Ensure the service worker reinstalls seamlessly and logs the restore.
6. **Cache reset test**
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
