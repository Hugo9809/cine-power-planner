# Documentation Drift Runbook

This runbook explains how to detect and correct drift between the runtime,
documentation and translations. Run it whenever you discover mismatched
instructions or after large feature merges.

## Detect

1. Compare the current app build against the last published documentation
   packet.
2. Review recent commits touching `src/scripts/`, `index.html` or `service-worker.js`.
3. Interview the feature owner to gather expected behaviour and safety
   implications.
4. Capture screenshots or screen recordings of the current UI for reference.

## Analyse

- Identify which workflows changed (save, autosave, backup, restore, share,
  automatic gear, offline cache).
- Note which documentation surfaces mention those workflows.
- Determine which translations or localized READMEs reference affected strings.
- Inspect automated tests to confirm they cover the new behaviour.

## Correct

1. Update primary documentation in `docs/`.
2. Refresh localized READMEs and in-app help strings.
3. Run the [Documentation Audit Checklist](documentation-audit-checklist.md).
4. Execute the [Offline Cache Verification Drill](offline-cache-verification-drill.md)
   if assets or service worker entries changed.
5. Record updates in the [Documentation Status Report](documentation-status-report-template.md).

## Prevent recurrence

- Encourage feature owners to fill the [Documentation Update Checklist](documentation-update-checklist.md)
  before merging.
- Add automated reminders or CI checks to verify documentation touch points.
- Schedule periodic documentation reviews using the [Documentation Maintenance Loop](documentation-maintenance.md).

## Archive

- Store the refreshed documentation packet, screenshots and verification logs
  alongside the planner backup that was rehearsed.
- Update the [Review Tasks](review-tasks-2025-02-07.md) file with any follow-up
  actions.

Keeping this runbook handy ensures drift is corrected quickly and transparently.
