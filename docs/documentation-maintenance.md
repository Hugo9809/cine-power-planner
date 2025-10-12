# Documentation Maintenance Loop

Keep documentation synchronized with the runtime by running this loop after
feature work, before releases and during quarterly audits.

## Step 1 – Plan the update

- List all behaviours that changed (save/share/import/backup/restore, automatic
  gear, offline cache, translation controls).
- Identify which documentation files and help topics describe those workflows.
- Schedule time for translation updates and screenshot refreshes.

## Step 2 – Update content

- Edit the relevant guides in `docs/`.
- Refresh localized READMEs and add translator notes for pending strings.
- Capture new screenshots using the locally bundled themes and icons.
- Regenerate PDFs or training bundles if applicable.

## Step 3 – Verify accuracy

- Run the [Documentation Audit Checklist](documentation-audit-checklist.md).
- Execute the [Operations Checklist](operations-checklist.md) in offline mode to
  confirm the written steps match the runtime.
- Prime caches and repeat key workflows in a fresh browser profile.

## Step 4 – Archive evidence

- Complete the [Documentation Status Report](documentation-status-report-template.md).
- Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md).
- Store planner backups, project bundles, verification logs and screenshots with
  the updated documentation packet.

## Step 5 – Communicate

- Announce the changes to the team and include links to updated manuals.
- Note follow-up tasks in [Review Tasks](review-tasks-2025-02-07.md).
- Schedule translation follow-ups if any locales are pending human review.

Repeat this loop whenever behaviour changes. Documentation is part of the product
and must be treated with the same care as code.
