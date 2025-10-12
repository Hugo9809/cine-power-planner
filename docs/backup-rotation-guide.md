# Backup Rotation Guide

This guide records the rotation strategy for planner backups, automatic
snapshots and exported bundles. It has been updated after a full review of the
app to align with the latest safeguards so every copy of user data remains
recoverable offline.

## Datasets in scope

- Planner backups exported via **Settings → Backup & Restore → Backup**
  (`planner-backup.json`).
- Automatic backups stored under `auto-backup-*` keys in local storage.
- Project bundles exported from the selector for workstation handoff.
- Automatic gear presets plus their mirrored backups.
- Custom gear catalogues, devices, runtime feedback and option preferences that
  the storage guard mirrors redundantly.
- Documentation packets, verification logs and translation exports generated
  during rehearsals.

## Rotation cadence

| Frequency | Action | Storage location |
| --- | --- | --- |
| After every rehearsal | Export a planner backup and store it on two offline media (e.g. encrypted SSD plus archival USB). |
| Daily (active shoots) | Copy the newest planner backup, bundles and verification logs to a read-only medium kept off-set. |
| Weekly | Archive the repository snapshot, `service-worker-assets.js`, cached icons/fonts and verification packets so future audits can reconstruct the environment. |
| Before releases | Capture fresh planner backups, bundles, automatic gear exports and documentation packets; store them with release notes and hash manifests. |

## Verification steps

1. **Inspect automatic backups.** Open the project selector, confirm recent
   `auto-backup-*` entries and use the compare tool to diff against the latest
   manual save.
2. **Check mirrored keys.** Run `window.cineRuntime.verifyCriticalFlows()` and
   review the storage section to confirm every critical key reports a redundant
   mirror.
3. **Restore rehearsal.** Use **Settings → Backup & Restore → Restore rehearsal**
   to load the latest planner backup in a sandbox. Verify autosave ledgers, rule
   presets and runtime feedback survive the round trip.
4. **Validate exports.** Inspect each exported JSON bundle, confirm expected
   projects and store a checksum alongside it. Record the checksum in the
   verification log.
5. **Archive documentation.** File the completed
   [Verification Log](verification-log-template.md), translation notes and update
   checklists next to the backups so future crews can retrace the rotation.

## Incident response

If any safeguard fails (missing auto backups, restore mismatch, corrupted
exports):

1. Pause work on the affected workstation immediately.
2. Retrieve the most recent known-good planner backup and share bundle from
   offline media.
3. Restore into a fresh browser profile or backup workstation and verify data
   integrity using the rehearsal sandbox.
4. Update the incident log in the [Data Protection Playbook](data-protection-playbook.md)
   noting which backups were used and what data was recovered.
5. Regenerate the missing safeguard, rehearse all save/share/import/backup/
   restore workflows again and update documentation plus translations to match
   the repaired state.

Treat every copy as irreplaceable. Redundant rotation guarantees user data never
vanishes—even if a single device fails.
