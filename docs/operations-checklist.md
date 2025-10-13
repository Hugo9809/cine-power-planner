# Operations Checklist

Run this end-to-end rehearsal before each release and on every workstation that
will operate offline. The checklist ensures save, share, import, backup and
restore workflows protect every bit of user data.

## Preparation

- [ ] Disconnect from the internet after warming caches.
- [ ] Ensure the rehearsal project is loaded with representative data.
- [ ] Confirm the latest planner backup and project bundles are stored safely.
- [ ] Open a fresh copy of `docs/verification-log-template.md` to log evidence.

## Rehearsal steps

1. **Modern bundle self-healing**
   - [ ] While online, open DevTools storage inspector for `localStorage`.
   - [ ] Disable the network temporarily, reload once to confirm the loader falls back to the inline legacy bundle without writing `cameraPowerPlanner_forceLegacyBundle`.
   - [ ] Restore connectivity and reload; verify the app returns to the modern bundle automatically and the legacy flag remains absent.
2. **Manual save**
   - [ ] Modify project notes, press **Save** (or `Ctrl+S` / `⌘S`).
   - [ ] Verify confirmation toast, check autosave ledger entry.
3. **Autosave cadence**
   - [ ] Make >50 changes or wait 10 minutes.
   - [ ] Confirm the autosave ledger records the run and timestamp.
4. **Planner backup**
   - [ ] Navigate to **Settings → Backup & Restore → Backup**.
   - [ ] Save `planner-backup.json` to two physical media; record checksums.
5. **Project export**
   - [ ] From the selector, choose **Export Project** for the active rig.
   - [ ] Store the bundle with checksum and capture diff summary screenshot.
6. **Restore sandbox**
   - [ ] Use **Settings → Backup & Restore → Restore rehearsal**.
   - [ ] Import the exported bundle; verify sandbox label and data integrity.
7. **Promotion**
   - [ ] Promote sandbox data to live projects.
   - [ ] Confirm autosave ledger logs the promotion event.
8. **Share rehearsal**
   - [ ] Copy bundle to secondary workstation (offline).
   - [ ] Import via sandbox, promote and compare diff logs to original.
9. **Documentation alignment**
   - [ ] Check README + docs instructions against actual UI labels.
   - [ ] Update `review-findings.md` with discrepancies.

## Completion

- [ ] Export updated verification packet (logs, screenshots, backups).
- [ ] Update [Documentation Status Report](documentation-status-report-template.md).
- [ ] Store evidence with release archives and note locations in `review-findings.md`.
