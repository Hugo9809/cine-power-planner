# Testing Plan

This plan defines the coverage required before shipping Cine Power Planner
updates. Prioritise persistence, offline behaviour and documentation accuracy.

## Automated checks

| Command | Purpose | Notes |
| --- | --- | --- |
| `npm test` | Run ESLint, `npm run check-consistency`, and the Jest multi-project configuration (unit, data, DOM). The heavier script suite runs when `RUN_HEAVY_TESTS` is set. | Execute offline; all dependencies are vendored. |
| `npm run lint` | Ensure scripts adhere to ESLint rules that enforce defensive coding patterns when run standalone. | Pay attention to storage and persistence warnings. |
| `npm run generate:sw-assets` | Rebuild the service worker asset manifest and confirm the generated list matches `service-worker-assets.js`. | Run after touching cached assets, icons, data files or runtime modules. |

## Manual rehearsals

- Complete the [Operations Checklist](operations-checklist.md).
- Run the [Offline Cache Verification Drill](offline-cache-verification-drill.md).
- Execute backup/restore rehearsals on at least two machines.
- Validate translations by switching locales and confirming UI text matches docs.

## Regression focus areas

1. **Persistence** – Verify manual saves, autosave, planner backup and project
   export/import flows handle malformed data gracefully.
2. **Offline readiness** – Confirm the app functions identically when opened via
   `index.html` without a server and when served with the service worker active.
3. **Documentation** – Ensure updated docs, help topics and READMEs align with
   actual UI labels and timing.
4. **Accessibility** – Check keyboard navigation for save/share dialogs and the
   restore sandbox.

## Evidence

- Store test outputs, screenshots and logs with the verification packet.
- Record command results and hashes in `docs/verification-log-template.md`.
- Update `review-findings.md` with any regressions and track remediation in
  `review-tasks-2025-02-07.md`.
