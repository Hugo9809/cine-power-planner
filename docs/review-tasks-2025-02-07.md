# Review Tasks – 2025-02-07 Cycle

Use this tracker to manage outstanding tasks from the 7 Feb 2025 review. Update
entries as work progresses and link to supporting evidence stored offline.

| ID | Description | Priority | Owner | Status | Evidence reference |
| --- | --- | --- | --- | --- | --- |
| TASK-001 | Regenerate `service-worker-assets.js` so cached schema/runtime helpers stay available offline. | High | Automated QA | Complete | service-worker-assets.js; `npm run test:jest -- service-worker` log |
| TASK-002 | Align testing plan with `npm run generate:sw-assets` command to keep cache manifest updated. | Medium | Automated QA | Complete | docs/testing-plan.md |

## Workflow

1. When logging a finding in `review-findings.md`, create a matching task here.
2. Store rehearsal evidence (screenshots, logs, backups) in the verification
   packet and reference the path.
3. Update related docs (operations checklist, save/share reference, translations)
   as you work; note commit hashes once merged.
4. Close tasks only after running the [Operations Checklist](operations-checklist.md)
   and confirming documentation, translations and offline behaviour all match.
5. Archive the updated tracker with the release documentation packet.
