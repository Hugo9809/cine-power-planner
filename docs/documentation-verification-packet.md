# Documentation Verification Packet

This packet records the evidence that documentation, translations and offline
workflows were rehearsed for a specific build. Bundle the completed packet with
planner backups, project bundles and repository snapshots.

## Contents

1. **Documentation Status Report** – Completed template from
   [documentation-status-report-template.md](documentation-status-report-template.md).
2. **Coverage Matrix** – Updated [Documentation Coverage Matrix](documentation-coverage-matrix.md).
3. **Verification Log** – Filled [Verification Log Template](verification-log-template.md).
4. **Testing results** – Output from the [Testing Plan](testing-plan.md) commands.
5. **Screenshots / recordings** – Evidence of key workflows, especially save,
   restore and backup dialogs.
6. **Backups and bundles** – Latest `planner-backup.json`, project exports,
   automatic gear bundles and repository ZIP.

## Assembly steps

1. Perform the rehearsals outlined in the [Operations Checklist](operations-checklist.md)
   and [Offline Readiness Runbook](offline-readiness.md).
2. Capture console output from `window.cineRuntime.verifyCriticalFlows()` and
   store it alongside the packet.
3. Verify automatic backups, planner exports and share bundles were written
   during the rehearsal.
4. Complete the templates listed above and ensure translation gaps are clearly
   marked.
5. Store the packet on two offline media with matching checksums.

## Review cadence

- **Before releases** – Mandatory.
- **After major feature work** – Mandatory.
- **Quarterly** – Recommended even without feature changes.

Maintaining up-to-date packets keeps historical context ready for audits and
proves that documentation matches the runtime crews rely on.
