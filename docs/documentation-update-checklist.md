# Documentation update checklist

Use this checklist before shipping a release or merging a feature branch that changes save, share,
backup or offline behaviour. Completing every step keeps help topics, manuals and translations aligned
with the runtime crews rely on offline.

## 1. Sync runtime evidence
- Capture a manual save, auto-backup and full backup to produce fresh filenames and timestamps for
  screenshots or references.【F:src/scripts/app-events.js†L86-L205】【F:index.html†L2501-L2573】
- Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and store the console output for
  inclusion in the verification packet.【F:src/scripts/modules/runtime.js†L2216-L2335】
- Export a project bundle and a planner backup so updated guides can reference real artifacts.【F:src/scripts/modules/persistence.js†L1036-L1109】

## 2. Update primary guides
- Refresh the README sections describing saves, backups, restore rehearsals and offline work. Align
  button labels and screenshots with the current UI states in Settings → Backup & Restore and Settings →
  Data & Storage.【F:index.html†L2501-L2778】
- Re-run the offline walkthrough documented in the help dialog and capture updated steps or icons if any
  labels changed.【F:index.html†L4401-L4413】
- Log all documentation updates (files touched, locale parity, screenshots regenerated) in the
  maintenance tracker so future audits see what changed.【F:docs/documentation-maintenance.md†L1-L140】

## 3. Translation and localisation
- Update `src/scripts/translations.js` entries for new or renamed strings and ensure placeholders remain
  consistent across locales.【F:src/scripts/translations.js†L120-L220】
- Generate translation delta notes for each locale so translators know which safeguards or workflows
  changed. Record outstanding items in the translation guide.【F:docs/translation-guide.md†L1-L134】
- Rebuild the service worker asset list after updating localized docs so caches ship the new files.【F:package.json†L6-L21】

## 4. Verification packet refresh
- Re-run the documentation verification packet script or manual process: include screenshots, backups,
  bundles, runtime guard output and the current verification log excerpt.【F:docs/documentation-verification-packet.md†L9-L48】【F:docs/verification-log-template.md†L12-L67】
- Confirm offline PDFs or printouts render correctly from disk by opening them inside the planner’s help
  links or legal section.【F:index.html†L1-L120】

## 5. Final review
- Perform the offline cache drill: force reload, clear caches via `cineOffline.__internal.clearCacheStorage()`
  in a disposable profile and ensure the app repopulates assets cleanly.【F:src/scripts/modules/offline.js†L2555-L2606】
- Update the coverage matrix with the new change so audits know which docs to recheck.【F:docs/documentation-coverage-matrix.md†L1-L56】
- Record completion in the verification log with timestamps, operator name and artefact locations before
  promoting the release.【F:docs/verification-log-template.md†L12-L67】

Checking off this list guarantees that every save, share, import, backup and restore instruction ships
in lockstep with the runtime safeguards that protect user data offline.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:src/scripts/modules/runtime.js†L2201-L2335】
