# Review Tasks – 2025-02-07 Cycle

Use this tracker to manage outstanding tasks from the 7 Feb 2025 review. Update
entries as work progresses and link to supporting evidence stored offline.

| ID | Description | Priority | Owner | Status | Evidence reference |
| --- | --- | --- | --- | --- | --- |
| TASK-001 | Regenerate `service-worker-assets.js` so cached schema/runtime helpers stay available offline. | High | Automated QA | Complete | service-worker-assets.js; `npm run test:jest -- service-worker` log |
| TASK-002 | Align testing plan with `npm run generate:sw-assets` command to keep cache manifest updated. | Medium | Automated QA | Complete | docs/testing-plan.md |
| TASK-003 | Correct the French onboarding string that reads "la diagnostic" to the grammatically correct "le diagnostic". | Low | TBD | Open | `src/scripts/translations.js` L8638-L8646 |
| TASK-004 | Restore deep-freeze behaviour in `environment-bridge` so Node builds no longer skip freezing due to the unconditional `process.release.name === 'node'` check. | High | TBD | Open | `src/scripts/modules/environment-bridge.js` L136-L169 |
| TASK-005 | Update the testing plan entry for `npm test` so it documents the lint and consistency checks executed before Jest. | Medium | TBD | Open | docs/testing-plan.md L8-L14; package.json L8-L15 |
| TASK-006 | Extend `environment-bridge` unit tests to assert nested objects are frozen under Node, preventing regressions where `freezeDeep` returns unfrozen structures. | Medium | TBD | Open | tests/unit/environmentBridge.test.js |

## Workflow

1. When logging a finding in `review-findings.md`, create a matching task here.
2. Store rehearsal evidence (screenshots, logs, backups) in the verification
   packet and reference the path.
3. Update related docs (operations checklist, save/share reference, translations)
   as you work; note commit hashes once merged.
4. Close tasks only after running the [Operations Checklist](operations-checklist.md)
   and confirming documentation, translations and offline behaviour all match.
5. Archive the updated tracker with the release documentation packet.
