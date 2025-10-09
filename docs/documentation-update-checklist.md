# Documentation Update Checklist

This checklist condenses the workflow from the [Documentation, Help & Translation Maintenance Guide](documentation-maintenance.md) into a rapid review you can run before landing any feature or copy change. Every step protects the offline-first contract—saving, sharing, importing, backing up and restoring must continue to work flawlessly and must never risk user data. Complete each section in order and record the outcome in your verification log so teams travelling without connectivity inherit reliable instructions.

## 1. Scope the change

- [ ] List every UI surface the change touches (dialogs, tooltips, hover help, settings panes, legal pages and offline manuals).
- [ ] Map the affected `cineModules` contracts (`cinePersistence`, `cineUi`, `cineOffline`, `cineRuntime` and friends) so references in docs stay aligned with the frozen APIs.
- [ ] Note any new keyboard shortcuts, save/share/import/backup/restore affordances or runtime guard outputs that must appear in copy.

## 2. Update primary documentation

- [ ] Edit `README.md` and every localized README to reflect the new workflows, especially the **Key Workflow Reference**, **Save, Share & Import Drill**, **Backup & Recovery** and **Emergency Recovery Playbook** sections.
- [ ] Revise contextual help topics, hover help strings and FAQ answers in `src/scripts/modules/help.js` and `index.html` so offline crews see accurate instructions, noting any runtime bridge impacts called out in `src/scripts/modules/environment-bridge.js`.
- [ ] Refresh `tools/cliHelp.js` so `npm run help` includes any new scripts and calls out offline maintenance steps like regenerating service worker assets after documentation updates.
- [ ] Synchronize printable manuals and runbooks in `docs/` (save/share reference, offline readiness, operations checklist, backup rotation guide, testing plan) with the change.
- [ ] Update legal pages in `legal/` if any disclosures or policy links reference the updated feature.
- [ ] Mark the affected rows in `docs/documentation-coverage-matrix.md` and update the entries so reviewers can trace which surfaces now document the revised save, share, import, backup and restore behavior.

## 3. Refresh translations

- [ ] Add or update entries in `src/scripts/translations.js`, duplicating the English copy to other locales when a translation is not yet available.
- [ ] Ensure every language selector in `index.html` and the settings dialog exposes the new or updated strings.
- [ ] Flag untranslated copy in the pull request description so localization contributors can follow up quickly.

## 4. Verify offline behavior matches the docs

- [ ] Follow the [Save, Share & Import Drill](../README.md#save-share--import-drill) to confirm documented steps reflect reality.
- [ ] Capture manual saves, auto backups, planner backups and project bundles before and after the change; confirm restores succeed in an isolated offline profile.
- [ ] Inspect `window.__cineRuntimeIntegrity` and run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` to prove every persistence safeguard documented in the guides remains available.
- [ ] Re-open the help dialog, legal pages and device catalogs offline to ensure service-worker caches include the updated copy and locally stored Uicons.

## 5. Archive evidence

- [ ] Update the verification log (using `docs/verification-log-template.md`) with the version, browser, workstation and command outputs collected during testing.
- [ ] Store the verified planner backup, project bundle, automatic gear rules export and a ZIP of the repository alongside the updated documentation so crews can prove parity later.
- [ ] Attach rendered PDFs or screenshots of modified help pages if the change affected visual layout or iconography.
- [ ] Assemble the release documentation packet following `docs/documentation-verification-packet.md` and record where redundant offline copies live.
- [ ] Note the storage locations for the packet inside the verification log so future crews can retrieve the canonical manuals and rehearsal artefacts without reconnecting to the network.

Running this checklist alongside the full maintenance guide keeps documentation, translations and offline workflows in sync with the product while protecting user data across every save, share, import, backup and restore path.
