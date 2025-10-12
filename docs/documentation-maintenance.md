# Documentation Maintenance Loop

Keep documentation synchronized with the runtime by running this loop after
feature work, before releases and during scheduled audits. Offline crews rely on
these materials as much as the code itself.

## Step 1 – Plan the update

- List behaviours that changed (save/share/import/backup/restore, automatic gear,
  offline cache, translation controls, schemas).
- Identify which documentation files, help topics, localized READMEs and training
  assets describe those workflows.
- Schedule time for translation updates, screenshot refreshes and verification
  packet updates.

## Step 2 – Update content

- Edit the relevant guides in `docs/` using locally stored assets only.
- Refresh localized READMEs, add translator notes for pending strings and export
  interim locale bundles if required.
- Capture new screenshots or diagrams with bundled themes and icons.
- Regenerate PDFs or training bundles and update checksum manifests.

## Step 3 – Verify accuracy

- Run the [Documentation Audit Checklist](documentation-audit-checklist.md).
- Execute the [Operations Checklist](operations-checklist.md) in offline mode to
  confirm written steps match the runtime.
- Prime caches, rehearse workflows in a fresh browser profile and confirm
  autosave/backup ledgers reflect the documented cadence.

## Step 4 – Archive evidence

- Complete the [Documentation Status Report](documentation-status-report-template.md).
- Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md) and
  attach it to the verification packet.
- Store planner backups, project bundles, translation exports, verification logs
  and screenshots with the updated documentation on offline media.

## Step 5 – Communicate

- Announce changes to the team with links to updated manuals and rehearsal notes.
- Record follow-up tasks in [Review Tasks](review-tasks-2025-02-07.md) and assign
  translation work where necessary.
- Note upcoming verification rehearsals so every workstation replays the updated
  workflows.

Repeat this loop whenever behaviour changes. Documentation is part of the product
and deserves the same rigor as code.
