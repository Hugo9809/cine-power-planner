# Data Protection Playbook

User data is Cine Power Planner's highest priority. This playbook captures the
policies, rehearsals and recovery steps that keep projects, backups and presets
safe when crews work offline.

## Principles

1. **Redundancy first.** Every write path (manual save, autosave, backup,
   restore, import, automatic gear edit) must create or refresh a redundant
   snapshot before touching live data.
2. **Offline parity.** The experience, documentation and translations must match
   whether the workstation is connected or offline. Never rely on external
   resources.
3. **Human-friendly audits.** Logs, prompts and documentation must be readable so
   crews can verify safeguards quickly in the field.
4. **Change transparency.** Every behavioural change ships with updated help
   topics, verification logs and translation notes.

## Preventive routines

- **Daily rehearsal (active shoots).** Follow the
  [Operations Checklist](operations-checklist.md) to exercise save, autosave,
  backup, restore and share workflows before crews begin work.
- **Weekly documentation sweep.** Run the
  [Documentation Maintenance Loop](documentation-maintenance.md) to ensure every
  change is reflected in docs and translations.
- **Offline cache verification.** Execute the
  [Offline Cache Verification Drill](offline-cache-verification-drill.md) after
  updating service-worker assets or adding new icons.
- **Translation parity.** Review the [Translation Guide](translation-guide.md)
  after adding UI strings. Keep placeholders or translator notes if human
  translations are pending.

## Incident handling

1. **Detect.** Monitor runtime guard output (`window.__cineRuntimeIntegrity`),
   autosave logs and backup rotations for anomalies.
2. **Contain.** Freeze the affected workstation, copy the most recent planner
   backup and share bundle, and move to a clean profile or spare device.
3. **Recover.** Restore backups, confirm autosave entries replay correctly and
   document the timeline.
4. **Review.** Update the [Review Findings](review-findings.md) and
   [Verification Log](verification-log-template.md) with the incident details.
   Note which safeguards succeeded or failed.
5. **Improve.** Patch the issue, extend automated tests and refresh all relevant
   documentation so future crews benefit from the fix.

## Release requirements

Before publishing a new build or documentation update:

- Run the [Testing Plan](testing-plan.md) and archive the results.
- Complete the [Documentation Verification Packet](documentation-verification-packet.md).
- Export fresh backups, bundles and automatic gear presets. Store them with the
  release notes.
- Update the [Documentation Status Report](documentation-status-report-template.md)
  so future audits can trace what changed.

## Record keeping

- Store verification packets, planner backups and repository snapshots on two
  offline media. Include checksums and timestamps.
- Keep a change log describing when documentation, translations and runtime
  safeguards were updated.
- Ensure every rehearsal or incident has a completed
  [Verification Log](verification-log-template.md) attached to the relevant
  archive.

Protecting user data demands discipline. Treat this playbook as mandatory for
all contributors and operators.
