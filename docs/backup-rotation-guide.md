# Backup Rotation Guide

Backups are the final safety net when crews operate offline. This rotation plan
keeps planner data recoverable even if a workstation fails between autosaves.
Follow it verbatim before every shoot, after major edits and prior to shipping
an offline bundle.

## Daily rotation cadence

| Time | Action | Evidence to capture |
| --- | --- | --- |
| Start of day | Load the rehearsal project, run **Settings → Backup & Restore → Backup**, and store the resulting `planner-backup.json` on two physical media. | Screenshot of the confirmation toast, console log of `cinePersistence.backup`. |
| Midday | Trigger a manual save (`Ctrl+S` / `⌘S`) then export individual project bundles for active rigs. | Diff log from **Compare versions**, hash log for each bundle. |
| End of day | Run the **Quick Safeguards** checklist: manual save, export planner backup, export documentation packet. | Updated verification log plus checksum notes for every exported file. |

## Weekly rotation cadence

- **Monday:** Restore the latest backup into the rehearsal sandbox to confirm the
  archive is healthy. Record screenshots of the sandbox prompt and resulting
  project list.
- **Wednesday:** Copy the current `backups/` folder to a read-only medium (USB
  drive or optical disc) labelled with date and revision hash. Update the
  `review-findings.md` log with storage location details.
- **Friday:** Rotate the off-site copy. Use `Tools → Export Diagnostics` to
  capture the autosave ledger, attach it to the verification packet and store a
  duplicate with the off-site bundle.

## Storage expectations

- **Local mirrors:** `src/scripts/storage.js` writes timestamped mirrors before
  applying restores. Do not delete these entries; they serve as the first rollback
  if the newest backup is corrupted.
- **Checksum discipline:** Generate SHA-256 hashes for every exported file. Store
  them alongside the backups, both in plaintext and printed copies, so offline
  audits can confirm integrity without network access.
- **No cloud uploads:** All archives must remain on physical media under direct
  control. Offline operation is mandatory, so cloud or network drives are not
  acceptable for primary storage.

## Rehearsal drill

1. Perform a manual save in the active project.
2. Export a planner backup and two individual project bundles.
3. Delete the active project, then restore it from the bundle inside the sandbox.
4. Promote the sandbox project back to live data and confirm autosave history
   reflects the restore.
5. Log every step in `docs/verification-log-template.md`, attach console output
   and store the evidence with the backups.

## Maintenance checklist

- Update this guide whenever persistence logic changes (`storage.js`,
  `modules/persistence.js`, service worker cache strategy, etc.).
- Confirm translation keys exist for every referenced UI label.
- Ensure the [Documentation Maintenance Guide](documentation-maintenance.md)
  and [Save, Share & Restore Reference](save-share-restore-reference.md)
  reference any new safeguards introduced here.
