# Translation Guide

This guide describes how to update Cine Power Planner translations while keeping
offline bundles safe and documentation consistent.

## Locale files

- All strings live in `src/scripts/translations.js`.
- Each locale exports the same structure (English, German, French, Italian,
  Spanish).
- Never rely on remote translation services; edits happen locally and are
  reviewed offline.

## Workflow

1. **Scope changes**
   - List UI strings affected by the feature/documentation update.
   - Identify docs (READMEs, guides) requiring translated updates.
2. **Edit safely**
   - Update `translations.js` entries for each locale.
   - Keep placeholders, keyboard shortcuts and punctuation consistent.
   - Confirm long strings still fit UI components by testing offline.
3. **Synchronise docs**
   - Mirror changes in `README.<locale>.md` and relevant docs if they include
     locale-specific guidance.
   - Update screenshots using the same locale.
4. **Review**
   - Use bilingual reviewers to validate accuracy.
   - Run the planner in each locale, rehearse save/share/import/backup/restore
     workflows and confirm text matches documentation.
   - Confirm the onboarding welcome language selector works even when the
     header/settings language controls are absent so the overview step fallback
     remains documented.
5. **Archive evidence**
   - Store signed approval notes in the verification packet.
   - Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
     with review dates.

## Glossary & tone

| Term | Translation notes |
| --- | --- |
| "Backup" | Use terminology that implies redundant copies, not cloud sync. |
| "Restore rehearsal" | Emphasise sandbox/safe preview before promotion. |
| "Autosave ledger" | Translate to highlight timestamped log of background saves. |
| "Bundle" | Explain as offline file transfer, never internet sharing. |

## Quality checks

- Confirm no string introduces external links or network dependencies.
- Ensure translation keeps keyboard shortcut references accurate (`Ctrl+S`, `⌘S`).
- Validate service worker and offline instructions remain clear in each language.
- Record any locale-specific layout adjustments in `review-findings.md`.
