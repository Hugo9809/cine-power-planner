# Documentation, Help & Translation Maintenance Guide

Cine Power Planner treats documentation as a core feature of the product. Help content,
offline manuals and translations must reflect the current behavior of the app so crews can
trust every save, share, import, backup and restore workflow even when they are far from an
internet connection. Use this guide whenever you add, remove or adjust functionality. For a
condensed run-through before code review, follow the [Documentation Update Checklist](documentation-update-checklist.md)
alongside this guide so no surface or translation is missed.

All persistence-facing documentation should now reference the consolidated
`cinePersistence` module so that future refactors maintain a single, lossless contract for
saving, sharing, backups and restores.【F:src/scripts/modules/persistence.js†L1-L125】

Coordinated UI flows now surface through the frozen `cineUi` registry. Update help topics,
workflow diagrams and troubleshooting notes to reference the registered controllers,
interactions and help entries so offline operators can cross-check the exact button or
dialog names documented in code.【F:src/scripts/modules/ui.js†L1-L192】

Printable overviews and PDF exports now route through the dedicated
`cineFeaturePrint` module. When you adjust instructions for sharing power summaries or
exporting documentation bundles, reference the module so readers understand how native
printing and fallback windows cooperate offline.【F:src/scripts/modules/features/print-workflow.js†L1-L208】

Project intelligence, persistence guardrails and experience helpers are now surfaced
through `cineCoreProject`, `cineCoreGuard` and `cineCoreExperience`. Reference these
modules when documenting derived metadata, autosave safeguards or UI affordances so
the registry-backed contracts stay aligned with user guidance.【F:src/scripts/modules/core/project-intelligence.js†L1-L229】【F:src/scripts/modules/core/persistence-guard.js†L1-L213】【F:src/scripts/modules/core/experience.js†L1-L229】

The new integration suite (`tests/dom/runtimeIntegration.test.js`) ensures these modules
continue to cooperate. When updating help text or translations, keep the assertions in that
test in mind—they describe the critical APIs (`cineOffline`, `cinePersistence`, `cineUi`) that
must remain available to avoid data loss.【F:tests/dom/runtimeIntegration.test.js†L1-L64】

The runtime bundle also stores the most recent verification result on
`__cineRuntimeIntegrity`, giving documentation reviewers a quick signal that the
save/share/import safeguards initialised correctly before they start editing
copy offline.【F:src/scripts/script.js†L92-L183】

## 1. Identify every surface that needs an update

1. **Help dialog topics.** Review contextual help entries, FAQ answers and hover-help copy in
   `src/scripts/help/` before landing a feature change. Update screenshots, keyboard
   shortcuts and workflow descriptions so crews see accurate instructions while offline.
   Keep the console verification callout in `index.html` aligned with the commands documented
   in the save/share reference so operators can rehearse data audits directly inside the help
   dialog.【F:index.html†L3899-L3920】【F:docs/save-share-restore-reference.md†L28-L35】 Document
   any new navigation tips—like the quick-link keyboard guidance surfaced through
   `helpResultsAssist`—so translations and hover help mirror the latest behaviour.【F:index.html†L2641-L2663】【F:src/scripts/app-session.js†L8427-L8486】【F:src/scripts/translations.js†L1327-L1340】
   The new no-results recovery callout (`#helpNoResultsSuggestions`) keeps operators pointed at
   safe backup workflows—document each of its steps when you adjust help topics so every
   translation and offline manual explains how to recover quickly.【F:index.html†L2784-L2804】【F:src/scripts/app-core-new-1.js†L10095-L10142】【F:src/scripts/app-session.js†L10404-L10436】
   Highlight that the global feature search now promotes matches whose labels appear on screen
   before keyword-only hits, that wrapping a phrase in double quotes forces an exact match, and
   that quoted phrases rise to the top so crews know the full control name they typed will surface
   first even when synonyms exist.【F:src/scripts/app-core-new-2.js†L9188-L9264】【F:index.html†L3268-L3276】
   Hover help now reads from linked selectors (`data-help-target`, `data-hover-help-target` and
   ARIA reference IDs), so double-check that contextual copy stays accurate for every
   referenced control when you update docs or UI labels.【F:src/scripts/app-session.js†L8896-L8996】
2. **README family.** Revise the primary `README.md` plus each localized README under the
   project root. Ensure new workflows appear in the *Save, Share & Import Drill*, *Backup &
   Recovery* and *Emergency Recovery Playbook* sections so every language documents the same
   safety routines.
3. **Save, Share, Import, Backup & Restore Reference.** Keep `docs/save-share-restore-reference.md`
   synchronized with UI labels, keyboard shortcuts and verification logging guidance so crews
   rehearse the exact workflows the code exposes through `cinePersistence`, `cineUi` and the
   runtime guard.
4. **Verification log template.** Update `docs/verification-log-template.md` whenever
   diagnostic commands change or new persistence safeguards ship. The template calls for
   console outputs from `window.__cineRuntimeIntegrity`,
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and the
   `cinePersistence` inspection helpers, so keep the references aligned with runtime and
   persistence modules when they evolve.【F:src/scripts/script.js†L315-L357】【F:src/scripts/modules/runtime.js†L1663-L1782】【F:src/scripts/modules/persistence.js†L775-L880】
5. **Operations manuals.** Confirm `docs/offline-readiness.md`,
   `docs/operations-checklist.md`, `docs/backup-rotation-guide.md` and `docs/testing-plan.md`
   include the new logic. These printable guides travel with field kits, so add or update
   drills that prove autosave, backup rotation and restore rehearsals still behave exactly
   as the latest build.
6. **In-app legal and static pages.** If the change surfaces on legal disclosures or other
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

## 5. Assemble the documentation verification packet

Follow the [Documentation Verification Packet guide](documentation-verification-packet.md) to
bundle everything reviewers need when they audit the release offline. The packet keeps the
written guidance, supporting exports and verification artefacts together so crews can trust the
instructions even years later when internet access is unavailable.

1. **Collect updated manuals.** Export or print the primary README, localized READMEs,
   printable runbooks and legal pages that changed. Confirm each PDF references the same
   version string surfaced through `cinePersistence` and `cineOffline` so operators know which
   build the instructions cover.【F:src/scripts/modules/persistence.js†L1-L125】【F:src/scripts/modules/offline.js†L1-L188】
2. **Attach verification evidence.** Include the latest planner backup, project bundle and
   automatic gear rules export used during rehearsal. These files prove that save, share,
   import, backup and restore remained stable when the documentation was signed off. Pair them
   with the console capture from `window.__cineRuntimeIntegrity` to document the runtime guard
   status at release time.【F:src/scripts/script.js†L92-L183】
3. **Record the checklist outcome.** Add the completed [Documentation Update
   Checklist](documentation-update-checklist.md) with boxes ticked and initials or signatures.
   Attach the verification log entry that lists the workstation, browser build and timestamp so
   auditors can trace the rehearsal lineage.
4. **Store redundantly.** Zip the packet and copy it to at least two offline drives that travel
   separately with the release media. Note the storage locations in `docs/verification-log`
   entries or your change log so teams know where to find the canonical documentation bundle.

Maintaining this cadence guarantees the planner’s guidance, translations and offline-first
workflows stay in sync, keeping user data safe even in the most isolated production
environments.
