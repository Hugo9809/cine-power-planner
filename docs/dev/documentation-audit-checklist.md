# Documentation Audit Checklist

Run this checklist quarterly or whenever core workflows change. The goal is to
prove that every doc, translation and in-app help surface mirrors the current
save/share/import/backup/restore behaviour.

## Preparation

- [ ] Clone the repository or unpack the offline bundle on the audit machine.
- [ ] Load `index.html` once to warm the cache; then disconnect the network.
- [ ] Export the latest planner backup and verification packet for reference.
- [ ] Create a fresh copy of `docs/ops/verification-log-template.md` to record
      evidence.

## Audit steps

1. **Help centre parity**
   - [ ] Open the in-app help overlay and compare each topic to the matching doc
         in `docs/` and the translated READMEs.
   - [ ] Capture screenshots for any deviations.
2. **Workflow rehearsal**
   - [ ] Follow the [Operations Checklist](operations-checklist.md). Ensure every
         UI label matches the documentation wording.
   - [ ] Verify autosave, backup and restore logs record the run.
3. **Translation alignment**
   - [ ] Review `src/scripts/translations/<locale>.js` modules and the loader in
         `src/scripts/translations.js` to confirm every string referenced in
         documentation exists and is current for offline use.
   - [ ] Update `docs/dev/translation-guide.md` with any locale-specific nuances.
4. **Asset integrity**
   - [ ] Ensure all referenced icons and fonts exist in the repo and are loaded
         locally (no CDN links).
   - [ ] Run the documentation lint script if one is defined (`npm run` will list
         options such as `npm run lint:docs`); otherwise run `npm run lint` to
         catch broken anchors before publishing updates.
5. **Schema validation**
   - [ ] Compare `docs/dev/schema-inventory.md` against `modules/helpers/schema/`.
   - [ ] Note any mismatches in `docs/dev/review-findings.md` and link to follow-up tasks.

## Completion tasks

- [ ] Update `docs/dev/documentation-status-report-template.md` with audit scope,
      findings and stored evidence locations.
- [ ] Attach screenshots, backups and logs to the verification packet archive.
- [ ] Brief the localisation team on any string changes.
- [ ] Commit doc updates and rerun the [Documentation Maintenance Guide](documentation-maintenance.md).
