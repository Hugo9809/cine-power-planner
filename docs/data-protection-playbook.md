# Data Protection Playbook

User data is the Cine Power Planner's highest priority. This playbook outlines
the guardrails, rehearsals and escalation paths that keep save, autosave,
backup, restore and share workflows bulletproof—especially when crews are fully
offline.

## Principles

1. **Never risk user data.** Defensive cloning, redundant mirrors and rehearsal
   sandboxes are mandatory. When in doubt, create additional backups before
   proceeding.
2. **Operate offline by default.** All workflows must succeed without network
   access. If a feature would rely on external services, redesign it so every
   dependency ships inside the repository.
3. **Document everything.** Help topics, translations and verification packets
   must remain in sync with the runtime to avoid data loss caused by outdated
   instructions.

## Core safeguards

| Safeguard | Runtime implementation | Verification evidence |
| --- | --- | --- |
| Manual save | `src/scripts/app-session.js` dispatches structured save events to `modules/persistence.js`, which clones payloads and records timeline entries. | Screenshot of save confirmation, **Compare versions** diff export. |
| Autosave cadence | `modules/persistence.js` triggers background saves every ~50 changes or 10 minutes, logging each run in the autosave ledger. The logger is resolved through `modules/logging-resolver.js` so diagnostics are captured even when the structured logging module is unavailable. | Ledger export plus timestamped console log. |
| Planner backup | `storage.js` serialises all projects, favorites, settings, automatic gear rules and history into `planner-backup.json`. | Hash log, verification packet attachment. |
| Backup guardian | `storage.js` runs `ensureCriticalStorageBackups()` to mirror every critical key into redundant backup slots and exposes the result via `getLastCriticalStorageGuardResult()`. | **Settings → Data & Storage** screenshot showing the **Backup guardian** row plus the structured `storage` logger entry (also mirrored to the console) when issues appear. |
| Project bundle export | `modules/offline.js` packages a single project with scenario presets, runtime estimates and checksum metadata. | Bundle JSON, hash log, restore rehearsal notes. |
| Reload warmup safety | `modules/offline.js` now limits reload warmup fetches to same-origin requests and downgrades Safari fetch credentials so the browser no longer raises access-control warnings while preserving the XHR warmup fallback. | Console log showing "Reload warmup fetch resolved", Safari hard-reload console capture without the access-control warning, and service worker cache inspection. |
| Restore sandbox | `restore-verification.js` loads backups into an isolated workspace that can be discarded or promoted. | Screenshot of sandbox prompt, before/after project list. |

> **Safari verification (2025-10-19):** Hard reload on Safari 17.4 no longer logged the "access control checks" warning, and offline reload succeeded while the warmup request consumed the response and cleaned up its controller.

## Release checklist

1. Run the [Offline Cache Verification Drill](offline-cache-verification-drill.md)
   after touching service worker assets, icons or persistence code.
2. Execute the [Operations Checklist](operations-checklist.md) start-to-finish,
   logging every save/share/import/backup/restore step.
3. Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md),
   [Documentation Maintenance Guide](documentation-maintenance.md) and
   [Translation Guide](translation-guide.md) to reflect any new UI labels or
   workflows.
4. Export the verification packet, planner backup and project bundles. Store two
   physical copies and log their locations in `review-findings.md`.
5. Capture console diagnostics (`window.__cineRuntimeIntegrity`) and attach them
   to the release archive for offline audits.

## Incident response

1. **Stop changes immediately.** Freeze development on the affected branch and
   collect autosave logs plus the latest backups.
2. **Reproduce safely.** Use the restore sandbox or a disposable workstation to
   reproduce the issue without touching user data.
3. **Document impact.** Update `review-findings.md` and `feature-gap-analysis.md`
   with affected workflows, user-visible symptoms and data safety implications.
4. **Patch with rehearsals.** Implement fixes, run full save/share/import/backup/
   restore rehearsals, update docs and capture new evidence for the verification
   packet.
5. **Communicate release.** Summarise the fix, impacted versions and rehearsal
   evidence in README translations and the documentation status report before
   distributing updated bundles.

## Ongoing monitoring

- Review autosave and backup logs weekly.
- Keep redundancy media rotation logs current (see `backup-rotation-guide.md`).
- Audit help topics quarterly using the [Documentation Audit Checklist](documentation-audit-checklist.md).
- Track outstanding risks in `review-findings.md` and link to mitigation plans in
  `review-tasks-2025-02-07.md`.
