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

- The translation alignment script now walks nested objects and arrays when preparing the bundles. Missing entries inherit the English copy so the UI never renders blank text, but the expectation remains that every locale ships its own translation before release.

- Preserve placeholders such as `%s` and keep array structures (`installHelpStepsIos`, `installHelpStepsAndroid`, etc.) intact.
- The comment `// NEW TEXTS FOR SETUP MANAGEMENT END HERE` marks the current end of the translation set. New interface features append to this object, so review recent additions when updating an existing language.
- Translate the smaller helper maps as well:
  - `gearItems` contains human-friendly labels used in generated gear lists.
  - `categoryNames` provides the singular form shown in dropdowns.

If you cannot translate a string immediately, copy the English text so the UI still renders legibly. Avoid deleting keys—tests expect every language to expose the same shape and will now fail if a locale misses entries found in English.

## Step 3: Update language selectors

The Settings dialog, the top navigation and the onboarding hero panel all render language options directly in [`index.html`](../index.html). Add a new `<option>` element for your language in both selectors so the header, hero welcome step and settings surfaces stay synchronized without editing localStorage.

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
- The guided onboarding tutorial powers the Quick Start drill and Help status
  row. Keep `onboardingTour*` and `helpOnboardingTutorialCopy` strings in sync
  with the narrated steps and propagate any wording adjustments to the Quick
  Start checklist in each localized README so the offline walkthrough stays
  accurate.【F:src/scripts/translations.js†L1716-L1775】【F:README.md†L360-L372】
- The Contacts manager and profile editor rely on the `contacts.*` translation
  block and the “Crew contacts stay reusable” callout in the Saving & Project
  Management section. Update those strings and README bullets together whenever
  you adjust roster copy so offline crews keep consistent guidance.【F:src/scripts/translations.js†L150-L213】【F:README.md†L561-L567】
- The Own Gear library uses the `ownGearNav*` navigation labels and the
  `ownGear*` dialog strings along with the new “Personal gear inventory stays in
  sync” bullet across localized READMEs. Translate those entries and double-check
  the README copy whenever you tweak the modal so personal kit instructions stay
  localized with the UI.【F:src/scripts/translations.js†L60-L68】【F:src/scripts/translations.js†L1634-L1664】【F:README.md†L568-L572】

## Step 5: Open a pull request

Commit your changes, describe the new language in the pull request summary and mention any remaining untranslated phrases so maintainers can help. Linking to this guide from your PR helps other contributors follow the same process.

## 2025-02 translation verification
- **Help dialog coverage.** Checked that the help dialog still lists the monthly data health check, backup guidance and console commands documented here, confirming the referenced strings remain live.【F:index.html†L3019-L3095】【F:src/scripts/translations.js†L1519-L1540】
- **Storage dashboard localisation.** Verified the Data & Storage guardian, quick safeguards and latest activity rows still reference the translation keys noted in this guide, keeping offline cues localized.【F:index.html†L2722-L2799】【F:src/scripts/translations.js†L1674-L1684】
- **Runtime guard messaging.** Reconfirmed `window.cineRuntime.verifyCriticalFlows()` continues to expose human-readable missing-binding notes so localized diagnostics remain actionable.【F:src/scripts/modules/runtime.js†L2203-L2368】

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
