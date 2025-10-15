# Review Findings Log

Record discrepancies, risks and follow-up items discovered during rehearsals,
reviews and audits. Keep this log stored with the verification packet so future
teams can trace historical issues offline.

| Date | Reviewer | Area | Finding | Impact | Follow-up reference |
| --- | --- | --- | --- | --- | --- |
| _(YYYY-MM-DD)_ | _(Name)_ | _(e.g. Backup restore)_ | _(Description)_ | _(High/Medium/Low)_ | _(Link to review-tasks entry / commit)_ |
| 2025-10-13 | Automated QA | Offline cache manifest | `service-worker-assets.js` excluded schema and runtime helpers so offline loads miss critical modules. | High | TASK-001 |
| 2025-10-14 | Automated QA | Offline documentation caching | Service worker asset manifest skips the `docs/` tree, so help and drill references 404 when crews browse the app offline even though the README directs them to those files. | Medium | TASK-008 |
| 2025-10-14 | Automated QA | Test plan clarity & coverage | `npm test` entry in `docs/testing-plan.md` only mentions the unit suite, leaving out the data/dom projects and masking missing assertions in storage alert coverage. | Medium | TASK-009 & TASK-010 |

## Usage guidelines

- Log every variance discovered in docs, translations, or runtime behaviour.
- Reference supporting evidence (screenshots, console logs, backup files).
- Update `review-tasks-2025-02-07.md` with action items and link back to this log.
- Close entries only after rehearsing the fix and updating relevant docs.
- Store printed copies with the offline verification packet.
