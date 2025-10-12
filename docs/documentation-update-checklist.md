# Documentation Update Checklist

Complete this checklist whenever behaviour changes or new features ship. It
keeps documentation, translations and offline rehearsals aligned with the
runtime.

## Scope the change

- [ ] Identify affected workflows (save, autosave, backup, restore, share,
      import, automatic gear, translation exports, offline cache).
- [ ] Confirm new UI strings or copy edits and note translation requirements.
- [ ] Determine if new assets (icons, illustrations, PDFs) need to be cached
      offline and added to `service-worker-assets.js`.
- [ ] Review schema adjustments and update the [Schema Inventory](schema-inventory.md).

## Update artefacts

- [ ] Edit relevant guides in `docs/` and ensure language reflects offline
      rehearsals.
- [ ] Refresh localized READMEs; add translator notes or placeholders when human
      updates are pending.
- [ ] Update in-app help strings and `src/scripts/translations.js` entries.
- [ ] Capture updated screenshots or diagrams using bundled assets only.
- [ ] Regenerate printable/training materials and share bundle templates.
- [ ] Export updated translation bundles for archival.

## Verify

- [ ] Run the app offline and rehearse each affected workflow end to end.
- [ ] Execute relevant sections of the [Operations Checklist](operations-checklist.md)
      and [Testing Plan](testing-plan.md).
- [ ] Confirm `service-worker-assets.js` lists all new files and cache hashes.
- [ ] Validate autosave/backup ledgers match the documented cadence.

## Archive

- [ ] Complete the [Documentation Status Report](documentation-status-report-template.md).
- [ ] Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md).
- [ ] Store planner backups, bundles, translation exports, verification logs and
      updated docs on two offline media with checksums.
- [ ] File follow-up items in [Review Tasks](review-tasks-2025-02-07.md) and track
      them to closure.

Do not mark the feature complete until this checklist is finished.
