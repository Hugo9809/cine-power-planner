# Operations Checklist

Run this end-to-end rehearsal before each release and on every workstation that
will operate offline. The checklist ensures save, share, import, backup and
restore workflows protect every bit of user data.

## Preparation

- [ ] Disconnect from the internet after warming caches.
- [ ] Verify the offline banner states that force reload requires connectivity
      and the header reload control is disabled before proceeding.
- [ ] Ensure the rehearsal project is loaded with representative data.
- [ ] Confirm the latest planner backup and project bundles are stored safely.
- [ ] Open a fresh copy of `docs/verification-log-template.md` to log evidence.

## Rehearsal steps

1. **Modern bundle self-healing**
   - [ ] While online, open DevTools storage inspector for `localStorage`.
   - [ ] Disable the network temporarily, reload once to confirm the loader falls back to the inline legacy bundle without writing `cameraPowerPlanner_forceLegacyBundle`.
   - [ ] Restore connectivity and reload; verify the app returns to the modern bundle automatically and the legacy flag remains absent.
   - [ ] In the DevTools console confirm `window.APP_VERSION`, `window.CPP_APP_VERSION` and `window.cinePowerPlanner.version` match the release identifier recorded for this rehearsal.
2. **Manual save**
   - [ ] Modify project notes, press **Save** (or `Ctrl+S` / `⌘S` / Command Palette).
   - [ ] Verify confirmation toast, check autosave ledger entry.
3. **Autosave cadence**
   - [ ] Make >50 changes or wait 10 minutes.
   - [ ] Confirm the autosave ledger records the run and timestamp.
4. **Data & Storage health**
   - [ ] Open **Settings → Data & Storage** and review the **Latest activity** timeline for stale saves, autosaves or backups.
   - [ ] Check the **Backup guardian** row; investigate any “waiting for first save” or issue count before continuing.【F:src/scripts/app-core-new-2.js†L8640-L8740】【F:src/scripts/storage.js†L2800-L2995】
   - [ ] If a banner appears stating **"1 backup saved in the local vault."** or **"{count} backups saved in the local vault."** beside the **Open local backup vault** action, open the vault and download every queued archive before moving on.
   - [ ] Rehearse **Settings → Backup & Restore → Open local backup vault** (or use the banner action) to export any deferred backups and confirm the banner clears before marking this step complete.
5. **Planner backup**
   - [ ] Navigate to **Settings → Backup & Restore → Backup**.
   - [ ] Save `planner-backup.json` to two physical media; record checksums.
6. **Project export**
   - [ ] From the selector, choose **Export Project** for the active rig.
   - [ ] Store the bundle with checksum and capture diff summary screenshot.
7. **Restore sandbox**
   - [ ] Use **Settings → Backup & Restore → Restore rehearsal**.
   - [ ] Import the exported bundle; verify sandbox label and data integrity.
8. **Promotion**
   - [ ] Promote sandbox data to live projects.
   - [ ] Confirm autosave ledger logs the promotion event.
9. **Share rehearsal**
   - [ ] Copy bundle to secondary workstation (offline).
   - [ ] Import via sandbox, promote and export diff logs manually from **Settings → Backup & Restore → Compare versions** before comparing to the original.
10. **Documentation alignment**
   - [ ] Check README + docs instructions against actual UI labels.
   - [ ] Update `review-findings.md` with discrepancies.

## Completion

- [ ] Export updated verification packet (logs, screenshots, backups).
- [ ] Update [Documentation Status Report](documentation-status-report-template.md).
- [ ] Store evidence with release archives and note locations in `review-findings.md`.
