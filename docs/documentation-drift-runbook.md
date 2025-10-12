# Documentation drift runbook

Use this runbook when documentation, translations or screenshots fall out of sync with the runtime. The
steps below help restore parity without risking user data.

## 1. Detect drift
- Run the documentation audit checklist to identify sections that no longer match the UI or runtime
  safeguards.【F:docs/documentation-audit-checklist.md†L1-L48】
- Compare current backups, bundles and restore rehearsal outputs against the instructions in the Save,
  Share & Restore reference to see where behaviour diverged.【F:docs/save-share-restore-reference.md†L6-L44】【F:index.html†L2501-L2708】

## 2. Stabilise data
- Capture manual saves, promote key auto-backups and export a planner backup plus project bundle to ensure
  nothing is lost while updating docs.【F:src/scripts/app-events.js†L86-L205】【F:src/scripts/modules/persistence.js†L1036-L1109】
- Log filenames, timestamps and storage locations in the verification log before editing guidance.【F:docs/verification-log-template.md†L12-L67】

## 3. Refresh content
1. Update README sections, help entries and localized docs to reflect the current UI. Align button labels
   with Settings → Backup & Restore and Settings → Data & Storage panels.【F:index.html†L2501-L2778】
2. Update translation keys in `src/scripts/translations.js`, regenerate screenshots and run the offline cache
   drill to confirm new assets are cached.【F:src/scripts/translations.js†L120-L220】【F:docs/offline-cache-verification-drill.md†L1-L63】
3. Regenerate `service-worker-assets.js` and rerun the offline drill if any files were added or renamed.【F:package.json†L6-L21】

## 4. Re-verify
- Execute `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` to ensure runtime safeguards are intact.【F:src/scripts/modules/runtime.js†L2216-L2335】
- Follow the documentation update checklist and rebuild the verification packet with new artefacts.【F:docs/documentation-update-checklist.md†L1-L68】【F:docs/documentation-verification-packet.md†L1-L48】
- Update the translation guide and maintenance log with completion details and outstanding locales.【F:docs/translation-guide.md†L1-L80】【F:docs/documentation-maintenance.md†L1-L40】

## 5. Communicate
- Summarise the drift, fixes and remaining risks in the documentation status report and feature gap
  analysis.【F:docs/documentation-status-report-template.md†L1-L60】【F:docs/feature-gap-analysis.md†L1-L55】
- Share updated verification packet and backups with operations so offline teams can rehearse the corrected
  workflows.【F:docs/documentation-verification-packet.md†L1-L48】

Following this runbook keeps documentation authoritative and ensures crews have accurate offline guidance
for saving, sharing, importing, backing up and restoring data.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
