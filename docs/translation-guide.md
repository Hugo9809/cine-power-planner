# Translation Guide

This guide explains how to add or update translations while keeping offline
parity and data safety intact.

## Supported locales

Reference the language list in `src/scripts/translations.js` and the localized
`README.*.md` files. Add new locales to both places plus the language selector in
`index.html`.

## Workflow

1. **Inventory strings** – Search for new or changed text in
   `src/scripts/translations.js`, UI templates and documentation.
2. **Update source copy** – Ensure English strings clearly describe save, share,
   import, backup, restore and translation workflows.
3. **Prepare translation files** – Duplicate updated English entries across all
   locales. Use English as a placeholder until human translations are ready; add
   translator notes for context.
4. **Localize documentation** – Update the corresponding README and
   workflow-specific guides. Include translator notes when additional context is
   required.
5. **Verify in-app rendering** – Switch to each locale, rehearse key workflows
   offline and confirm prompts fit the layout without truncation.
6. **Export bundles** – Use the translation export tool to archive locale JSON
   files with checksum notes. Store exports with backups.
7. **Archive updates** – Record the changes in the
   [Documentation Status Report](documentation-status-report-template.md) and
   attach translation exports to the verification packet.

## Quality checks

- Preserve placeholders (e.g. `{projectName}`) and punctuation.
- Confirm keyboard shortcuts and UI labels remain accurate per locale.
- Rebuild screenshots that contain textual UI elements.
- Run `npm run lint` or relevant tests if translation files are linted.

## Incident handling

If a translation is missing or incorrect:

1. Replace it temporarily with the English string to keep the UI usable.
2. Update documentation to note the gap and capture it in the
   [Review Tasks Tracker](review-tasks-2025-02-07.md).
3. Schedule the correction with responsible translators and record progress in
   the [Review Findings Log](review-findings.md).
4. Archive the fix with revised documentation, translation exports and checksum
   notes.

Following this workflow keeps multilingual crews productive and confident when
working offline.
