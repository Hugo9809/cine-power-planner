# Translation Guide

This guide explains how to add or update translations while keeping offline
parity and data safety intact.

## Supported locales

Reference the language list in `src/scripts/translations.js` and the localized
`README.*.md` files. Add new locales to both places plus the language selector
in `index.html`.

## Workflow

1. **Inventory strings** – Search for new or changed text in
   `src/scripts/translations.js`, UI templates and documentation.
2. **Update source copy** – Ensure the English strings clearly describe save,
   share, import, backup and restore behaviour.
3. **Prepare translation files** – Duplicate the updated English entries across
   all locales. Use the English copy as a placeholder until human translations
   are ready.
4. **Localize documentation** – Update the corresponding README and any
   workflow-specific guides. Include translator notes when context is unclear.
5. **Verify in-app rendering** – Switch to each locale, rehearse key workflows
   offline and confirm prompts fit the layout.
6. **Archive changes** – Record the update in the [Documentation Status Report](documentation-status-report-template.md)
   and store the translated documentation with the verification packet.

## Quality checks

- Ensure placeholders (e.g. `{projectName}`) remain intact.
- Confirm keyboard shortcuts and UI labels remain accurate in each locale.
- Rebuild screenshots if they include textual UI elements.
- Run `npm run lint` or relevant tests if translation files are linted.

## Incident handling

If a translation is missing or incorrect:

1. Replace it temporarily with the English string to keep the UI usable.
2. Update documentation to note the gap.
3. Schedule the correction in the [Review Tasks Tracker](review-tasks-2025-02-07.md).
4. Archive the fix alongside revised documentation.

Following this workflow keeps multilingual crews productive and confident when
working offline.
