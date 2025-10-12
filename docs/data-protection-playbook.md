# Data Protection Playbook

User data is Cine Power Planner's highest priority. This refreshed playbook
captures the policies, rehearsals and recovery steps that keep projects,
backups, presets and documentation safe for crews working entirely offline.

## Principles

1. **Redundancy first.** Every write path—manual save, autosave, backup,
   restore, import, automatic gear edit or translation export—must create or
   refresh a redundant snapshot before touching live data.
2. **Offline parity.** The experience, documentation and translations must match
   regardless of connectivity. Use only assets stored in the repository and keep
   service worker caches aligned with each release.
3. **Human-friendly audits.** Logs, prompts and documentation must be readable
   and printable so crews can verify safeguards quickly on set.
4. **Change transparency.** Behavioural changes ship with updated help topics,
   verification logs, translation notes and documentation packets.
5. **Proactive rehearsal.** Saving, sharing, importing, backup, restore and
   translation workflows are exercised routinely—not only during incidents.

## Preventive routines

- **Daily rehearsal (active shoots).** Follow the
  [Operations Checklist](operations-checklist.md) to exercise save, autosave,
  backup, restore and share workflows before crews begin work.
- **Weekly documentation sweep.** Run the
  [Documentation Maintenance Loop](documentation-maintenance.md) to ensure every
  change is reflected in docs and translations.
- **Offline cache verification.** Execute the
  [Offline Cache Verification Drill](offline-cache-verification-drill.md) after
  updating service worker assets or bundling new icons/fonts.
- **Translation parity.** Review the [Translation Guide](translation-guide.md)
  whenever UI strings shift. Provide placeholders and translator notes when human
  updates are pending.
- **Schema checks.** Compare live data with the [Schema Inventory](schema-inventory.md)
  whenever storage structures change to confirm migrations remain lossless.

## Incident handling

1. **Detect.** Monitor `window.__cineRuntimeIntegrity`, autosave ledgers and
   backup rotations for anomalies. Capture screenshots and console output.
2. **Contain.** Freeze the affected workstation, duplicate the most recent
   planner backup and share bundle from offline media, and move to a clean
   profile or spare device.
3. **Recover.** Restore backups using the rehearsal sandbox, confirm autosave
   entries replay correctly and validate checksum notes.
4. **Review.** Update [Review Findings](review-findings.md) and the
   [Verification Log](verification-log-template.md) with the timeline, affected
   safeguards and recovered data.
5. **Improve.** Patch the issue, extend automated tests, regenerate service
   worker assets if necessary and refresh all related documentation plus
   translations. Re-run rehearsals before returning the workstation to service.

## Release requirements

Before publishing a new build or documentation update:

- Execute the [Testing Plan](testing-plan.md) and archive the results.
- Complete the [Documentation Verification Packet](documentation-verification-packet.md).
- Export fresh planner backups, bundles, automatic gear presets and translation
  exports; store them with release notes and checksum manifests.
- Update the [Documentation Status Report](documentation-status-report-template.md)
  to record what changed and which safeguards were rehearsed.
- Verify offline readiness via the [Offline Readiness Runbook](offline-readiness.md)
  and record outcomes in the verification packet.

## Record keeping

- Store verification packets, planner backups, translation exports and
  repository snapshots on two offline media with checksums and timestamps.
- Maintain a change log describing when documentation, translations and runtime
  safeguards were updated, along with links to verification logs.
- Ensure every rehearsal or incident has a completed
  [Verification Log](verification-log-template.md) archived next to the affected
  data.

Protecting user data demands discipline. Treat this playbook as mandatory for
all contributors and operators.
