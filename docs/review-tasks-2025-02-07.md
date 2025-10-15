# Review Tasks – 2025-02-07 Cycle

Use this tracker to manage outstanding tasks from the 7 Feb 2025 review. Update
entries as work progresses and link to supporting evidence stored offline.

| ID | Description | Priority | Owner | Status | Evidence reference |
| --- | --- | --- | --- | --- | --- |
| TASK-001 | Update `docs/save-share-restore-reference.md` with the new redundant autosave/backups guard notes introduced during the runtime helper split. | Medium | TBD | Open | `docs/save-share-restore-reference.md` L18-L47 |
| TASK-002 | Sync `docs/documentation-update-checklist.md` with the current backup rotation rehearsal steps so operators rehearse redundant exports before hand-off. | Medium | TBD | Open | `docs/documentation-update-checklist.md` L9-L42; `docs/backup-rotation-guide.md` L12-L48 |

## Workflow

1. When logging a finding in `review-findings.md`, create a matching task here.
2. Store rehearsal evidence (screenshots, logs, backups) in the verification
   packet and reference the path.
3. Update related docs (operations checklist, save/share reference, translations)
   as you work; note commit hashes once merged.
4. Close tasks only after running the [Operations Checklist](operations-checklist.md)
   and confirming documentation, translations and offline behaviour all match.
5. Archive the updated tracker with the release documentation packet.
6. Attach fresh planner backups, project bundles and checksum logs to the packet so offline restores remain fully rehearsed.
