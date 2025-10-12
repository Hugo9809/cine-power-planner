# Testing Plan

Execute this plan before releases and after significant changes to saving,
sharing, importing, backups, restores or offline behaviour.

## Automated tests

| Command | Purpose | Notes |
| --- | --- | --- |
| `npm run test` | Run unit and DOM tests. | Ensure Node version matches `.nvmrc` if provided. |
| `npm run lint` | Validate coding standards. | Confirms formatting for docs-related scripts. |

## Manual verification

1. **Offline rehearsal** – Follow the [Offline Readiness Runbook](offline-readiness.md).
2. **Operations checklist** – Complete the [Operations Checklist](operations-checklist.md).
3. **Automatic gear** – Use the [Automatic Gear Rule Options Overview](auto-gear-rule-options.md)
   to verify presets save, backup and restore correctly.
4. **Service worker** – Run the [Offline Cache Verification Drill](offline-cache-verification-drill.md).
5. **Documentation sync** – Run through the [Documentation Audit Checklist](documentation-audit-checklist.md).

## Reporting

- Capture console output from `window.cineRuntime.verifyCriticalFlows()`.
- Store test logs with the [Documentation Verification Packet](documentation-verification-packet.md).
- Note any failures in the [Review Findings Log](review-findings.md) and assign
  tasks via the [Review Tasks Tracker](review-tasks-2025-02-07.md).

Testing is complete only when automated scripts pass, manual rehearsals succeed
offline and evidence is archived on redundant media.
