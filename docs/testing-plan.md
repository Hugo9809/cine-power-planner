# Testing plan

This plan outlines the automated and manual checks required before releasing Cine Power Planner.
Following it keeps offline safeguards and documentation in sync with the runtime.

## Automated
| Command | Purpose |
| --- | --- |
| `npm run lint` | Static analysis of scripts and docs tooling.【F:package.json†L6-L21】 |
| `npm run test:jest` | Runs the Jest suite in serial mode, covering data and script projects.【F:package.json†L6-L21】 |
| `npm run test:data` | Focused tests for data integrity and schema regressions.【F:package.json†L6-L21】 |
| `npm run test:dom` | DOM integration tests for UI modules and helpers.【F:package.json†L6-L21】 |
| `npm run test:script` | Heavy runtime tests (autosave, persistence) with higher memory limits.【F:package.json†L6-L21】 |
| `npm run generate-schema` | Regenerate data schema after updates for validation purposes.【F:package.json†L6-L21】 |
| `npm run generate:sw-assets` | Refresh service worker asset manifest to align caches with documentation updates.【F:package.json†L6-L21】 |

## Manual verification
1. **Runtime guard:** Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and archive the result.【F:src/scripts/modules/runtime.js†L2216-L2335】
2. **Save/share/restore rehearsal:** Follow the Save, Share & Restore reference to capture manual saves, auto-backups, planner
   backups, restore rehearsals and share imports.【F:docs/save-share-restore-reference.md†L1-L140】
3. **Offline cache drill:** Execute the drill to confirm help and documentation assets load without network access.【F:docs/offline-cache-verification-drill.md†L1-L63】
4. **Documentation update:** Complete the documentation update checklist to ensure guides and translations reflect recent changes.【F:docs/documentation-update-checklist.md†L1-L68】
5. **Verification packet:** Refresh the packet with new evidence and log storage locations.【F:docs/documentation-verification-packet.md†L1-L48】【F:docs/verification-log-template.md†L12-L67】

## Sign-off
- Testing lead confirms automated commands passed and manual checks produced artefacts stored with the verification packet.
- Documentation lead confirms README/help/translation updates landed and references are current.
- Operations lead verifies backups, bundles and verification logs are stored on both primary and duplicate media.

Only after all sign-offs can a release candidate move forward, ensuring the offline-first contract remains intact.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
