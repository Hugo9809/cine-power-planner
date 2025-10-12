# Feature Gap Analysis

Use this worksheet to capture differences between field requirements and the
current Cine Power Planner runtime. Always prioritise gaps that could risk user
data or offline operation.

## Current version

- **Runtime revision:** _(git commit / bundle hash)_
- **Analysis date:** _(YYYY-MM-DD)_
- **Prepared by:** _(name)_

## Identified gaps

| ID | Description | Impact on user data/offline workflows | Proposed mitigation | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| GAP-001 | _(e.g. Missing checksum display in restore sandbox)_ | _(High/Medium/Low)_ | _(Add checksum column + doc update.)_ | _(Name)_ | _(Open)_ |
| GAP-002 |  |  |  |  |  |

## Evaluation criteria

1. **Data protection risk** – Could the gap cause data loss, overwrite or failure
   to restore backups?
2. **Offline readiness** – Does the workflow require connectivity, external
   services or assets not bundled in the repo?
3. **Documentation accuracy** – Are help topics, translations or checklists
   misleading because of the gap?
4. **User impact** – How frequently will crews encounter the issue in rehearsals
   or on set?

## Action plan

- [ ] Add mitigations to `review-tasks-2025-02-07.md` with priority levels.
- [ ] Update relevant docs (operations checklist, save/share reference,
      translation guide) once mitigations ship.
- [ ] Capture rehearsal evidence demonstrating the gap is closed and store it in
      the verification packet.
- [ ] Notify crews relying on offline bundles about resolved gaps.
