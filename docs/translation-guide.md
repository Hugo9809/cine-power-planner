# Translation Guide

Cine Power Planner ships with English, German, Spanish, Italian and French translations. Use this guide when you want to add or update another language so the interface, documentation and data remain consistent.

## Prerequisites

- Node.js 18 or newer.
- Familiarity with Markdown and JSON-style JavaScript objects.
- A working clone of the repository with dependencies installed (`npm install`).

## Step 1: Add translated documentation

Create a localized README so newcomers can discover the project in their language.

1. Copy `README.en.md` to `README.<lang>.md`, where `<lang>` is the two-letter language code you plan to support.
2. Translate the copied Markdown file.
3. Update the language list in the main [README](../README.md#translations) so the new translation is discoverable.

## Step 2: Provide UI strings

All interface labels live in [`src/scripts/translations.js`](../src/scripts/translations.js). Each top-level key inside `texts` corresponds to a language code and the planner automatically treats every listed language as supported. Duplicate the English block, paste it under a new key (for example `pt` for Portuguese) and translate every string.

- Preserve placeholders such as `%s` and keep array structures (`installHelpStepsIos`, `installHelpStepsAndroid`, etc.) intact.
- The comment `// NEW TEXTS FOR SETUP MANAGEMENT END HERE` marks the current end of the translation set. New interface features append to this object, so review recent additions when updating an existing language.
- Translate the smaller helper maps as well:
  - `gearItems` contains human-friendly labels used in generated gear lists.
  - `categoryNames` provides the singular form shown in dropdowns.

If you cannot translate a string immediately, copy the English text so the UI still renders legibly. Avoid deleting keys—tests expect every language to expose the same shape and will now fail if a locale misses entries found in English.

## Step 3: Update language selectors

The Settings dialog and the top navigation both render language options directly in [`index.html`](../index.html). Add a new `<option>` element for your language in both selectors so users can switch to it without editing localStorage.

## Step 4: Verify the result

Run the test suite to confirm the new language satisfies existing checks and that the dataset still loads correctly. Translation coverage tests ensure each locale provides the same keys as English across UI text, category names and gear item labels:

```bash
npm test
```

You can run targeted suites while iterating if you only touched translation files:

```bash
npm run test:unit
```

## Recent interface updates

- Automatic Gear Rules now include an automatic backup timeline and a **Backup retention**
  control with live warnings inside the help dialog. Translate the related labels in
  `index.html` and the retention status strings in `src/scripts/translations.js` so crews
  understand how many snapshots stay on each device.
- The rule coverage dashboard adds `autoGearSummary*`, including the new
  `autoGearSummaryCoverage*` and `autoGearSummaryOverlaps*` families, plus
  `autoGearSummaryRuleReference*` and `autoGearNoFocusMatches` strings alongside
  documentation callouts in every README. Localize the new keys in
  `src/scripts/translations.js`, keep placeholders such as `{adds}` or
  `{visible}` intact and update the language guides so offline reviewers see the
  same coverage insights.

## Step 5: Open a pull request

Commit your changes, describe the new language in the pull request summary and mention any remaining untranslated phrases so maintainers can help. Linking to this guide from your PR helps other contributors follow the same process.
