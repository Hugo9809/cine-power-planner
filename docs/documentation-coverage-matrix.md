# Documentation coverage matrix

Use this matrix to confirm every critical workflow has matching runtime safeguards and documentation.
Update it when adding features or new guides so audits can trace responsibilities quickly.

| Workflow | Runtime source | Documentation surfaces |
| --- | --- | --- |
| Manual saves & autosave cadence | `cinePersistence.storage.saveProject`, autosave thresholds in `app-events.js` | Save, Share & Restore reference; Data protection playbook; Operations checklist.【F:src/scripts/modules/persistence.js†L1036-L1053】【F:src/scripts/app-events.js†L86-L205】【F:docs/save-share-restore-reference.md†L6-L44】【F:docs/data-protection-playbook.md†L21-L35】【F:docs/operations-checklist.md†L1-L29】 |
| Planner backups & restore rehearsal | `cinePersistence.backups.*`, Restore rehearsal UI | Save, Share & Restore reference; Documentation verification packet; Offline readiness guide.【F:src/scripts/modules/persistence.js†L1092-L1100】【F:index.html†L2581-L2708】【F:docs/save-share-restore-reference.md†L17-L33】【F:docs/documentation-verification-packet.md†L1-L33】【F:docs/offline-readiness.md†L16-L37】 |
| Share & import bundles | `cinePersistence.share`, Data & Storage diagnostics | Save, Share & Restore reference; Feature gap analysis; Review findings.【F:src/scripts/modules/persistence.js†L1105-L1109】【F:index.html†L2722-L2778】【F:docs/save-share-restore-reference.md†L35-L47】【F:docs/feature-gap-analysis.md†L1-L30】【F:docs/review-findings.md†L1-L33】 |
| Offline cache & documentation parity | `cineOffline.__internal`, service worker asset manifest | Offline cache verification drill; Documentation update checklist; Translation guide; Documentation audit checklist.【F:src/scripts/modules/offline.js†L2555-L2606】【F:service-worker.js†L192-L240】【F:docs/offline-cache-verification-drill.md†L1-L63】【F:docs/documentation-update-checklist.md†L1-L68】【F:docs/translation-guide.md†L1-L56】【F:docs/documentation-audit-checklist.md†L1-L40】 |

Keep this matrix alongside the maintenance log so reviewers can immediately identify which guides to
update when a workflow changes.【F:docs/documentation-maintenance.md†L1-L28】
