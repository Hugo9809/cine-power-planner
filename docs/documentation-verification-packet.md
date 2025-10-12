# Documentation Verification Packet

This packet records the evidence that documentation, translations and offline
workflows were rehearsed for a specific build. Bundle the completed packet with
planner backups, project bundles, translation exports and repository snapshots.

## Contents

1. **Documentation Status Report** – Completed template from
   [documentation-status-report-template.md](documentation-status-report-template.md).
2. **Coverage Matrix** – Updated [Documentation Coverage Matrix](documentation-coverage-matrix.md).
3. **Verification Log** – Filled [Verification Log Template](verification-log-template.md).
4. **Testing results** – Output from the [Testing Plan](testing-plan.md) commands
   plus screenshots or logs of manual checks.
5. **Screenshots / recordings** – Evidence of core workflows (save, autosave,
   backup, restore, import/share, automatic gear, translation export).
6. **Backups and bundles** – Latest `planner-backup.json`, project exports,
   automatic gear bundles and repository snapshot.
7. **Translation exports** – Locale JSON files or diff summaries produced during
   the update.

## Assembly steps

1. Perform rehearsals defined in the [Operations Checklist](operations-checklist.md)
   and [Offline Readiness Runbook](offline-readiness.md).
2. Capture console output from `window.cineRuntime.verifyCriticalFlows()` and
   include it with timestamps.
3. Verify automatic backups, planner exports and share bundles were written
   during the rehearsal; log filenames and checksums.
4. Complete the templates above, highlight any translation gaps and reference the
   follow-up tasks filed in [Review Tasks](review-tasks-2025-02-07.md).
5. Store the packet on two offline media with matching checksums and label which
   workstation produced it.

## Review cadence

- **Before releases** – Mandatory.
- **After major feature work** – Mandatory.
- **Quarterly** – Recommended even without feature changes.

Maintaining up-to-date packets keeps historical context ready for audits and
proves that documentation matches the runtime crews rely on.
