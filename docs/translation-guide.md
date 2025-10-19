# Translation Guide

This guide describes how to update Cine Power Planner translations while keeping
offline bundles safe and documentation consistent.

## Locale files

- Each locale ships in its own module under
  `src/scripts/translations/<locale>.js` so bundles stay readable and easy to
  diff offline.
- The loader at `src/scripts/translations.js` registers every module via
  `LOCALE_SCRIPTS` and `LOCALE_LOADING_MESSAGES`; update both maps whenever you
  add a locale or adjust its offline loading message.
- Never rely on remote translation services; edits happen locally and are
  reviewed offline so installers and backups remain self-contained.

## Workflow

1. **Scope changes**
   - List UI strings affected by the feature/documentation update.
   - Identify docs (READMEs, guides) requiring translated updates.
2. **Edit safely**
   - Update every affected locale module in `src/scripts/translations/<locale>.js`
     (copy an existing file if you are introducing a new language).
   - Keep placeholders, keyboard shortcuts and punctuation consistent across
     modules; mirror JSON keys exactly so offline diffs remain reviewable.
   - Adjust `LOCALE_SCRIPTS` and `LOCALE_LOADING_MESSAGES` in
     `src/scripts/translations.js` if a locale is added or renamed.
   - Confirm long strings still fit UI components by testing offline.
3. **Synchronise docs**
   - Mirror changes in `README.<locale>.md`, the primary README and relevant docs
     if they include locale-specific guidance.
   - Record cross-locale notes inside the doc while edits are in progress so
     reviewers can verify parity offline.
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
