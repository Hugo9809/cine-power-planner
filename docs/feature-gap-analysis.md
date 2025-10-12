# Feature Gap Analysis

## Current strengths
- **Offline-first guarantees.** The README highlights that every dependency ships locally so crews can clone the repo, disconnect, and keep the interface running with full save/share/restore coverage.【F:README.md†L15-L33】
- **Layered data safeguards.** Dedicated guides document manual saves, autosaves, full backups, share bundles, restore rehearsals, migration backups and diagnostics logging to prevent user-data loss even under quota stress.【F:README.md†L764-L868】【F:docs/save-share-restore-reference.md†L1-L210】
- **Documentation discipline.** Existing checklists require each feature change to refresh help topics, localized READMEs, and verification packets so offline crews always see accurate instructions.【F:README.md†L1182-L1219】

## Opportunities for improvement
1. **In-app verification ledger.** Crews currently export JSON logs and maintain external verification journals whenever they run Compare Versions or rehearsal restores.【F:docs/offline-readiness.md†L74-L113】【F:docs/save-share-restore-reference.md†L210-L251】 Embedding a secure, append-only verification ledger in the app (with optional export) would consolidate those notes alongside the backups they validate, reducing the risk of orphaned evidence when machines rotate offline.
2. **Checksum & media integrity assistant.** The workflow depends on storing backups and bundles on redundant encrypted media with manually maintained checksum manifests.【F:docs/offline-readiness.md†L83-L125】【F:README.md†L863-L909】 Adding a local checksum generator and periodic verification reminder inside **Settings → Data & Storage** would let crews prove removable drives are healthy without leaving the offline environment or relying on external tooling.
3. **Backup freshness automation across profiles.** Operators confirm stale safeguards by manually checking the Latest Activity timeline and safety reminders in each browser profile.【F:README.md†L785-L789】 A cross-profile freshness monitor—perhaps sharing a locally signed heartbeat file that each profile updates—could flag machines whose backups haven’t been refreshed recently, even if a browser profile stays closed for days.
4. **Documentation update tracker.** Maintaining translation parity and help updates currently relies on external checklists and manual logging.【F:README.md†L1182-L1219】 Introducing an in-app documentation tracker where maintainers can mark which locales, help topics and print guides were refreshed for a release would keep the audit trail with the runtime and remind teams to finish translations before distributing offline bundles.
5. **Guided incident response capture.** The emergency routines instruct crews to capture console output, diff logs and manual notes during incidents using ad-hoc processes.【F:docs/offline-readiness.md†L170-L195】【F:README.md†L972-L989】 A guided incident capture mode could walk operators through exporting backups, collecting diagnostics, and packaging them into an encrypted archive so investigations never miss artifacts and no user data is lost in transit.

## Next steps
- Prototype the verification ledger and documentation tracker as optional, local-only modules so they never transmit data externally.
- Extend the diagnostics dashboard to host checksum verification and incident capture flows, keeping data integrity tooling in one offline workspace.
- Update the documentation guides once new features land so rehearsals, translations and help topics stay synchronized with the enhanced safeguards.

## 2025-02 validation snapshot
- **Current safeguards confirmed.** Verified that the autosave cadence, backup guardian row and runtime
  guard still operate as documented so the “Current strengths” section reflects the live build.【F:src/scripts/app-events.js†L86-L205】【F:src/scripts/app-core-new-2.js†L9640-L9750】【F:src/scripts/modules/runtime.js†L2203-L2368】
- **Documentation workflow state.** Checked that the documentation update tracker strings and help
  entries continue to expose their checklists, reinforcing the opportunity to consolidate tracking
  in-app.【F:src/scripts/translations.js†L1519-L1540】【F:index.html†L3019-L3095】
- **Checksum tooling gap.** Confirmed that Data & Storage currently lists storage counts but does not yet
  provide checksum helpers, supporting the identified improvement path.【F:index.html†L2722-L2799】

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
