# Documentation, Help & Translation Maintenance Guide

Cine Power Planner treats documentation as a core feature of the product. Help content,
offline manuals and translations must reflect the current behavior of the app so crews can
trust every save, share, import, backup and restore workflow even when they are far from an
internet connection. Use this guide whenever you add, remove or adjust functionality.

All persistence-facing documentation should now reference the consolidated
`cinePersistence` module so that future refactors maintain a single, lossless contract for
saving, sharing, backups and restores.【F:src/scripts/modules/persistence.js†L1-L125】

Coordinated UI flows now surface through the frozen `cineUi` registry. Update help topics,
workflow diagrams and troubleshooting notes to reference the registered controllers,
interactions and help entries so offline operators can cross-check the exact button or
dialog names documented in code.【F:src/scripts/modules/ui.js†L1-L192】

The new integration suite (`tests/dom/runtimeIntegration.test.js`) ensures these modules
continue to cooperate. When updating help text or translations, keep the assertions in that
test in mind—they describe the critical APIs (`cineOffline`, `cinePersistence`, `cineUi`) that
must remain available to avoid data loss.【F:tests/dom/runtimeIntegration.test.js†L1-L51】

## 1. Identify every surface that needs an update

1. **Help dialog topics.** Review contextual help entries, FAQ answers and hover-help copy in
   `src/scripts/help/` before landing a feature change. Update screenshots, keyboard
   shortcuts and workflow descriptions so crews see accurate instructions while offline.
2. **README family.** Revise the primary `README.md` plus each localized README under the
   project root. Ensure new workflows appear in the *Save, Share & Import Drill*, *Backup &
   Recovery* and *Emergency Recovery Playbook* sections so every language documents the same
   safety routines.
3. **Operations manuals.** Confirm `docs/offline-readiness.md`,
   `docs/operations-checklist.md`, `docs/backup-rotation-guide.md` and `docs/testing-plan.md`
   include the new logic. These printable guides travel with field kits, so add or update
   drills that prove autosave, backup rotation and restore rehearsals still behave exactly
   as the latest build.
4. **In-app legal and static pages.** If the change surfaces on legal disclosures or other
   static pages in `legal/`, mirror the update in every localized HTML file so offline
   references stay consistent.

## 2. Update translations in lockstep

1. **Add UI strings.** Extend `translations.js` with any new labels. Copy the English source
   to all supported locales if you do not have an immediate translation so the UI keeps
   rendering legibly offline.
2. **Localize documentation.** Translate adjustments made to each localized README and any
   static HTML page. When time is limited, add translator notes to the relevant pull request
   so the community can help close gaps quickly.
3. **Verify selector entries.** Add new language options to every selector in `index.html`
   and the settings dialog so crews can access the translation without editing storage by
   hand.

## 3. Prove offline readiness after doc updates

1. **Prime caches.** Open `index.html`, launch the help dialog, visit legal pages and toggle
   each theme so the service worker caches the updated documentation, locally stored Uicons
   and other bundled assets.
2. **Run the save rehearsal.** Follow the [Save, Share & Import Drill](../README.md#save-share--import-drill)
   to confirm the documented steps still match the product. Capture manual saves, export a
   planner backup and a shareable bundle, then rehearse the restore in an offline browser
   profile.
3. **Archive verification artifacts.** Store the validated backup, bundle and a ZIP of the
   repository alongside a short verification log. Note which documentation changes shipped
   so crews can trace when instructions last matched the product.

## 4. Testing checklist before release

- `npm test` – ensures linting, data integrity checks and Jest suites continue to protect
  persistence logic.
- Manual offline rehearsal – confirms help topics, documentation callouts and translations
  render correctly without connectivity.
- Screenshot or export updates (as required) – regenerate any documentation images or
  printable PDFs referenced in manuals so crews see the latest UI states while offline.

Maintaining this cadence guarantees the planner’s guidance, translations and offline-first
workflows stay in sync, keeping user data safe even in the most isolated production
environments.
