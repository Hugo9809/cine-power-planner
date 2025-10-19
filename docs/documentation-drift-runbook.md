# Documentation Drift Runbook

This runbook stops instructions from drifting away from the runtime. Follow it
whenever QA spots mismatched wording, outdated screenshots or missing locales.

## Detection triggers

- Verification packet references screenshots or logs that no longer match UI.
- Translations lag behind the English README or in-app help strings.
- Save/share/import/backup/restore workflows change without corresponding doc
  updates.
- Offline rehearsals expose missing guidance for autosave or backup recovery.

## Containment steps

1. **Freeze distribution.** Pause bundle sharing until documentation matches the
   runtime again.
2. **Log the issue.** Record findings in `review-findings.md` and link any
   supporting evidence (screenshots, console logs, backups).
3. **Notify stakeholders.** Alert documentation, localisation and QA owners.
4. **Secure data.** Ensure recent planner backups and verification packets are
   stored in at least two physical locations before making edits.

## Remediation workflow

1. **Source of truth review**
   - Compare UI strings from `src/scripts/translations/<locale>.js` modules and
     the loader in `src/scripts/translations.js` to the docs in question.
   - Cross-check help topics from `src/scripts/modules/help.js` so in-app copy
     mirrors the documentation even when crews stay completely offline.
   - Update `docs/schema-inventory.md` if persistence shapes changed.
2. **Doc updates**
   - Revise the affected markdown files, README translations and help overlay
     topics.
   - Update screenshots using the locally stored UI components; no external
     assets allowed.
3. **Localization**
   - Follow the [Translation Guide](translation-guide.md) to sync every locale.
   - Record translator acknowledgements in the [Documentation Coverage Matrix](documentation-coverage-matrix.md).
4. **Verification**
   - Run the [Operations Checklist](operations-checklist.md) and the
     [Save, Share & Restore Reference](save-share-restore-reference.md) to
     confirm instructions are correct.
   - Attach fresh evidence to the verification packet.
5. **Publish**
   - Update the [Documentation Status Report](documentation-status-report-template.md)
     with the change summary and new evidence locations.
   - Distribute offline bundles only after documentation, translations and
     verification logs align with the runtime.

## Preventative maintenance

- Schedule monthly spot checks using the [Documentation Audit Checklist](documentation-audit-checklist.md).
- Track documentation debt in `review-tasks-2025-02-07.md`.
- When implementing features, update docs in the same commit to avoid drift.
