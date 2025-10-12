# Documentation Drift Runbook

Use this runbook to detect and correct drift between the runtime, documentation
and translations. Run it whenever mismatched instructions appear or after large
feature merges.

## Detect

1. Compare the current app build against the last published documentation packet
   and verification logs.
2. Review recent commits touching `src/scripts/`, `index.html`, service worker
   assets or translation bundles.
3. Interview the feature owner to gather expected behaviour, safety implications
   and rehearsal notes.
4. Capture screenshots or screen recordings of the current UI for reference using
   locally bundled assets only.

## Analyse

- Identify which workflows changed (save, autosave, backup, restore, share,
  import, automatic gear, offline cache, translation exports).
- Note every documentation surface referencing those workflows.
- Determine which translations or localized READMEs require updates.
- Inspect automated tests to confirm they cover the new behaviour and redundancy
  safeguards.

## Correct

1. Update primary documentation in `docs/`, including printable guides and
   checklists.
2. Refresh localized READMEs, in-app help strings and translation exports.
3. Run the [Documentation Audit Checklist](documentation-audit-checklist.md) to
   confirm coverage.
4. Execute the [Offline Cache Verification Drill](offline-cache-verification-drill.md)
   if assets or service worker entries changed.
5. Record updates in the [Documentation Status Report](documentation-status-report-template.md)
   and attach evidence to the verification packet.

## Prevent recurrence

- Require feature owners to complete the
  [Documentation Update Checklist](documentation-update-checklist.md) before
  merging.
- Add automated reminders or CI checks to verify documentation touch points and
  translation exports.
- Schedule periodic reviews via the [Documentation Maintenance Loop](documentation-maintenance.md).
- Keep the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
  current for each release.

## Archive

- Store the refreshed documentation packet, screenshots, translation exports and
  verification logs alongside the rehearsed planner backup.
- Update [Review Tasks](review-tasks-2025-02-07.md) with any follow-up actions.
- File everything on offline media with checksums so future audits can retrace
  the fix.

Keeping this runbook handy ensures documentation drift is corrected quickly and
transparently.
