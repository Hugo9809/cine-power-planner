# Backup Rotation Guide

This guide documents the rotation strategy for planner backups, automatic
snapshots and exported bundles. Follow it whenever you audit a workstation,
prepare a field kit or close out a release so every copy of user data stays
recoverable offline.

## Datasets in scope

- `planner-backup.json` exports produced by **Settings → Backup & Restore → Backup**.
- Automatic backups written to `auto-backup-*` keys in local storage.
- Project bundles exported from the selector for crew handoff.
- Automatic gear presets and backups.
- Custom gear catalogues, devices and runtime feedback entries mirrored by the
  storage guard.

## Rotation cadence

| Frequency | Action | Storage location |
| --- | --- | --- |
| After every rehearsal | Export a planner backup and store it on two offline
media (e.g. encrypted SSD plus archival USB). |
| Daily (active shoots) | Copy the latest planner backup, project bundles and
verification logs to a read-only medium kept off-set. |
| Weekly | Archive the current repository snapshot, `service-worker-assets.js`
and verification packets so future audits can reconstruct the environment. |
| Before releases | Capture fresh planner backup, bundles and automatic gear
exports, then store them with the release notes and documentation packet. |

## Verification steps

1. **Inspect automatic backups.** Open the project selector and confirm the
   `auto-backup-*` entries appear with recent timestamps. Use the compare tool to
   verify differences between the latest manual save and the newest auto backup.
2. **Check mirrored keys.** Run `window.cineRuntime.verifyCriticalFlows()` and
   review the storage section to confirm every critical key reports a redundant
   mirror.
3. **Restore rehearsal.** Use **Settings → Backup & Restore → Restore rehearsal**
   to load the latest planner backup in a sandbox. Confirm the autosave ledger
   and rule presets survive the round-trip.
4. **Validate exports.** Open each exported JSON file, confirm it contains the
   expected project list and store a checksum alongside it.
5. **Archive documentation.** File the completed [Verification Log](verification-log-template.md)
   and related checklists next to the backups so future crews can retrace the
   rotation history.

## Incident response

If any safeguard fails (missing auto backups, restore rehearsal mismatch,
corrupted export):

1. Stop using the affected workstation immediately.
2. Copy the most recent known-good planner backup and share bundle from offline
   media.
3. Restore into a fresh browser profile or backup workstation and verify data
   integrity.
4. Update the [Data Protection Playbook](data-protection-playbook.md) incident log
   and note which backups were used during recovery.
5. Regenerate the missing safeguard, rehearse the workflows again and update all
   documentation to reflect the new state.

Disciplined rotation keeps planner data safe even when a single device fails.
Treat every copy as irreplaceable and store it redundantly.
