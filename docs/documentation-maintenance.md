# Documentation maintenance log

This guide defines how we track documentation changes across releases. Keep it alongside verification
logs so every offline packet has an audit trail.

## Cadence
- **Weekly:** Review merged pull requests for persistence, offline or UI safeguards and note whether any
  documentation surfaces require updates. Record findings even if no changes are needed.
- **Monthly:** Run the documentation audit checklist and update this log with the audit date, reviewer and
  resulting verification packet ID.【F:docs/documentation-audit-checklist.md†L1-L72】
- **Pre-release:** Complete the documentation update checklist, regenerate the verification packet and
  capture console output from `verifyCriticalFlows()` before tagging a build.【F:docs/documentation-update-checklist.md†L1-L68】【F:docs/documentation-verification-packet.md†L1-L48】

## Tracking fields
Create an entry for each maintenance session with the following fields:

| Field | Description |
| --- | --- |
| Date & reviewer | ISO timestamp and operator initials. |
| Scope | Features or locales reviewed (e.g. “Backup & Restore UI, en/es/fr”). |
| Runtime evidence | Links to runtime guard output, backups, bundles or cache drills captured during the session.【F:src/scripts/modules/runtime.js†L2216-L2335】【F:index.html†L2501-L2778】 |
| Documentation changes | Files edited (README sections, help topics, translations). |
| Outstanding items | Follow-up tasks (translation backlog, screenshots pending). |
| Packet ID | Folder name or checksum for the verification packet stored offline.【F:docs/documentation-verification-packet.md†L1-L48】 |

## Storage
- Store the log in version control (`docs/documentation-maintenance.md` updates plus commit references).
- Export a CSV or PDF after major releases and copy it to the same drives as the verification packet so
  offline reviewers can open the history without network access.【F:docs/documentation-verification-packet.md†L1-L48】
- Note the storage locations in the verification log for traceability.【F:docs/verification-log-template.md†L12-L67】

Keeping this log current ensures every doc edit is anchored to runtime evidence and stored alongside the
artefacts crews rely on offline.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:src/scripts/modules/offline.js†L2555-L2606】
