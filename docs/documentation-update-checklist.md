# Documentation Update Checklist

Complete this checklist whenever behaviour changes or new features ship. It
keeps documentation, translations and offline rehearsals aligned with the
runtime.

## Scope the change

- [ ] Identify affected workflows (save, autosave, backup, restore, share,
      automatic gear, offline cache).
- [ ] Confirm whether new UI strings were added or existing copy changed.
- [ ] Determine if new assets (icons, illustrations) need to be cached offline.

## Update artefacts

- [ ] Edit relevant guides in `docs/`.
- [ ] Update localized READMEs and note translation gaps.
- [ ] Refresh in-app help strings in `src/scripts/translations.js`.
- [ ] Capture updated screenshots or diagrams using bundled assets.
- [ ] Regenerate any printable or training materials.

## Verify

- [ ] Run the app in offline mode and rehearse each affected workflow.
- [ ] Execute the [Operations Checklist](operations-checklist.md) if safeguards
      changed.
- [ ] Run applicable sections of the [Testing Plan](testing-plan.md).
- [ ] Confirm `service-worker-assets.js` lists any new files.

## Archive

- [ ] Complete the [Documentation Status Report](documentation-status-report-template.md).
- [ ] Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md).
- [ ] Store planner backups, bundles, verification logs and the updated docs in
      two offline locations.
- [ ] File follow-up items in [Review Tasks](review-tasks-2025-02-07.md).

Do not mark the feature complete until this checklist is finished.
