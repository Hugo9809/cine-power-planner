# Documentation Coverage Matrix

Track every surface that must stay aligned with the runtime. Update this matrix
whenever you ship a feature, adjust persistence logic or revise workflows.

| Surface | Owner | Last reviewed | Scope | Evidence stored |
| --- | --- | --- | --- | --- |
| README (all locales) | Documentation | 2025-11-01 | Quick start, offline rehearsal drill, safety overview. | Screenshots of queued-backup banner guidance, **Compare versions** diff log export, translation approvals. |
| In-app help overlay | Product | _(fill date)_ | Contextual workflow tips, safeguard explanations. | Exported `help-topics.json`, console capture of topic list. |
| Docs/operations-checklist.md | QA | 2025-11-01 | End-to-end save/share/import/backup/restore rehearsal. | Verification log with queued-backup vault rehearsal notes, timestamps and screenshots. |
| Docs/save-share-restore-reference.md | QA | _(fill date)_ | Detailed workflow breakdown, failure recovery steps. | Restored bundle proof, checksum log. |
| Docs/offline-readiness.md | Production | 2025-11-01 | Travel prep, cache priming, redundancy planning. | Photos of field kit, signed readiness checklist noting vault check. |
| Docs/offline-cache-verification-drill.md | Engineering | _(fill date)_ | Service worker cache validation and rehearse resets. | Console log of cache entries, service worker diagnostic screenshot. |
| Docs/data-protection-playbook.md | Security | _(fill date)_ | Safeguard principles, incident response. | Meeting notes, signed approval. |
| Docs/translation-guide.md | Localization | _(fill date)_ | Translation workflow, locale-specific rules. | Translator confirmation emails stored offline. |
| Docs/documentation-maintenance.md | Documentation | _(fill date)_ | Update cadence, review triggers. | Checklist copy with initials. |
| Docs/testing-plan.md | QA | _(fill date)_ | Automated/manual test coverage for persistence + offline surfaces. | Test run output archived with release. |
| Docs/schema-inventory.md | Engineering | _(fill date)_ | JSON shape definitions for persistence payloads. | Exported schema diff, console log of validation pass. |

## How to use the matrix

1. After implementing a change, update the relevant row(s) with the review date
   and attach links to evidence stored in the offline release archive.
2. Confirm every referenced artifact exists in the verification packet before
   distributing new bundles.
3. During audits, walk through this matrix to locate supporting material without
   reconnecting to the internet.
4. When adding new documentation surfaces, append rows here and brief the
   localisation team so translations stay in sync.
