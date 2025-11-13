# Review Tasks – 2025-02-07 Cycle

Use this tracker to manage outstanding tasks from the 7 Feb 2025 review. Update
entries as work progresses and link to supporting evidence stored offline.

## Active tasks

_No open tasks – add new entries here whenever the latest findings require follow-up._

## Closed

| ID | Description | Priority | Owner | Status | Evidence reference |
| --- | --- | --- | --- | --- | --- |
| TASK-001 | Update `docs/save-share-restore-reference.md` with the new redundant autosave/backups guard notes introduced during the runtime helper split. | Medium | TBD | Closed | `docs/save-share-restore-reference.md` L10-L25 (commit `d734117`) documents the critical storage guard behaviour and ledger evidence trail. |
| TASK-002 | Sync `docs/documentation-update-checklist.md` with the current backup rotation rehearsal steps so operators rehearse redundant exports before hand-off. | Medium | TBD | Closed | `docs/documentation-update-checklist.md` L25-L32 + `docs/backup-rotation-guide.md` L8-L48 (commit `d734117`) capture the rehearsal drill, redundant export cadence and evidence logging requirements. |
| TASK-008 | Update the service worker asset manifest so every `docs/` page is cached for offline crews following the README trail. | High | Automated QA | Closed | commit `3df4feb` (2025-10-21) + `npm run check-consistency` verification on 2025-10-26 |

## Workflow

1. When logging a finding in `review-findings.md`, create a matching task here.
2. Store rehearsal evidence (screenshots, logs, backups) in the verification
   packet and reference the path.
3. Update related docs (operations checklist, save/share reference, translations)
   as you work; note commit hashes once merged.
4. Close tasks only after running the [Operations Checklist](operations-checklist.md)
   and confirming documentation, translations and offline behaviour all match.
5. Retire the tracker entry (move it to **Closed** with doc/commit links) as soon as the referenced documentation change lands and the rehearsal evidence is filed so the task list never drifts from reality.
6. Archive the updated tracker with the release documentation packet.
7. Attach fresh planner backups, project bundles and checksum logs to the packet so offline restores remain fully rehearsed.
