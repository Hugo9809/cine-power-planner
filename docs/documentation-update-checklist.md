# Documentation Update Checklist

Use this checklist every time you change the runtime, release a new build or
adjust translations. It ensures the offline bundle ships with accurate, tested
instructions.

## Before editing

- [ ] Confirm the latest planner backup and verification packet are stored on
      redundant media.
- [ ] Open the planner offline (disconnect the network) to validate current
      behaviour.
- [ ] Identify which docs, help topics and translations are affected.

## During edits

- [ ] Update the relevant markdown files in `docs/`.
- [ ] Sync README translations and note pending language reviews.
- [ ] Confirm UI button screenshots/text reference the Project Overview save/delete style.
- [ ] Capture new screenshots or diagrams using local assets only.
- [ ] Cross-check the [Backup Rotation Guide](backup-rotation-guide.md) for any
      cadence or storage updates needed to match the new behaviour.
- [ ] Run the [Backup Rotation Rehearsal Drill](backup-rotation-guide.md#rehearsal-drill):
      perform a manual save, export the planner backup, export two project
      bundles, restore inside the sandbox, promote the sandbox project back to
      live data and confirm autosave history. Capture all required evidence
      (**Compare versions** diff logs, checksum logs and sandbox screenshots) and stage it for the
      verification packet before proceeding.
- [ ] Update schema definitions in `docs/schema-inventory.md` if persistence
      payloads changed.
- [ ] Record interim notes in `review-findings.md`.

## Verification

- [ ] Run the [Operations Checklist](operations-checklist.md) to confirm the
      instructions match the UI.
- [ ] Execute the [Offline Cache Verification Drill](offline-cache-verification-drill.md)
      if service worker assets or icons changed.
- [ ] Restore backups in the rehearsal sandbox to confirm documentation for
      backup/restore remains correct.
- [ ] Store the rehearsal **Compare versions** diff logs, checksum logs and sandbox screenshots with
      the verification packet and confirm redundant media copies before ticking
      the drill item so save/share/restore docs stay aligned with runtime
      safeguards.
- [ ] Validate translations in-app using the language switcher.

## Finalise

- [ ] Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
      and [Documentation Status Report](documentation-status-report-template.md).
- [ ] Export a fresh verification packet and attach all updated evidence.
- [ ] Store new backups/bundles with checksum logs on two physical media.
- [ ] Mark follow-up work in `review-tasks-2025-02-07.md`.
