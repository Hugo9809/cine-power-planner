# Review Findings Log

Record discrepancies, risks and follow-up items discovered during rehearsals,
reviews and audits. Keep this log stored with the verification packet so future
teams can trace historical issues offline.

| Date | Reviewer | Area | Finding | Impact | Follow-up reference |
| --- | --- | --- | --- | --- | --- |
| _(YYYY-MM-DD)_ | _(Name)_ | _(e.g. Backup restore)_ | _(Description)_ | _(High/Medium/Low)_ | _(Link to review-tasks entry / commit)_ |
|  |  |  |  |  |  |

## Resolved findings

| Date | Reviewer | Area | Finding | Impact | Resolution details |
| --- | --- | --- | --- | --- | --- |
| 2025-10-14 | Automated QA | Test plan clarity & coverage | `npm test` entry in `docs/testing-plan.md` only mentioned the unit suite, leaving out the data/dom projects and masking missing assertions in storage alert coverage. | Medium | Closed on 2025-10-25 under TASK-011 after commit `d734117` (2025-10-21) rewrote `docs/testing-plan.md` to spell out the lint + `check-consistency` stages and the Jest multi-project targets (unit, data, DOM). Rehearsed with `npm test` to exercise the documented workflow end-to-end. |
| 2025-10-13 | Automated QA | Offline cache manifest | `service-worker-assets.js` excluded schema and runtime helpers so offline loads missed critical modules. | High | Closed on 2025-10-26 under TASK-008 after commit `3df4feb` (2025-10-21) repopulated the manifest with the schema, runtime helper bundles and supporting docs. Verified the fix the same day with `npm run check-consistency`, which rebuilds and diff-checks `service-worker-assets.js`. |
| 2025-10-14 | Automated QA | Offline documentation caching | Service worker asset manifest skipped the `docs/` tree, so help and drill links returned 404 errors when crews browsed the app offline and the docs weren't cached even though the README directs them to those files. | Medium | Closed on 2025-10-26 after commit `3df4feb` (2025-10-21) expanded `service-worker-assets.js` to include every `docs/` entry; verified via `npm run check-consistency` the same day. |

## Usage guidelines

- Log every variance discovered in docs, translations, or runtime behaviour.
- Reference supporting evidence (screenshots, console logs, backup files).
- Update `review-tasks-2025-02-07.md` with action items and link back to this log.
- Close entries only after rehearsing the fix and updating relevant docs.
- Store printed copies with the offline verification packet.
