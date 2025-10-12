# Data Protection Playbook

User data is the most valuable asset in Cine Power Planner. This playbook turns the save, share,
import, backup and restore guarantees baked into the runtime into an actionable routine you can run
before, during and after development. Every step is designed to succeed while offline using the
bundled assets, service worker cache and defensive persistence modules.【F:src/scripts/modules/persistence.js†L900-L1100】【F:service-worker.js†L1-L118】

## 1. Risk scan before touching code or copy
1. **Map affected persistence flows.** Identify which `cinePersistence` wrappers your change touches
   (saves, exports, backups, restore rehearsals, share helpers) so matching documentation updates stay
   lossless.【F:src/scripts/modules/persistence.js†L900-L1100】
2. **List runtime safeguards.** Note every checkpoint that protects those flows—manual saves, background
   auto-backups, forced pre-restore backups, sandbox imports, diagnostics logs and the runtime guard on
   `window.__cineRuntimeIntegrity`. Document how the update should influence each safeguard before you
   code.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:src/scripts/modules/runtime-guard.js†L318-L380】
3. **Cross-reference offline surfaces.** Flag sections in `README.md`, localized READMEs and in-app help
   that describe the impacted workflows so copy ships alongside behaviour.
4. **Plan verification artefacts.** Decide which planner backups, project bundles and diff logs you will
   capture once development finishes. Record storage locations so redundant offline drives stay organised.【F:index.html†L2501-L2560】

## 2. Daily guardrail rehearsal during development
Run this sequence at least once per day while iterating on persistence, service worker or UI
safeguards:

1. **Prime offline caches.** Open `index.html` from disk, launch the help dialog, visit legal pages and
   toggle each theme so the service worker refreshes cached icons, fonts and copy.【F:index.html†L1-L120】【F:service-worker.js†L1-L118】
2. **Exercise every save path.** Create or load a test project, trigger a manual save, wait for a fresh
   auto-backup (threshold is 50 changes or the time cadence) and export both a planner backup and project
   bundle. Label files with branch, timestamp and workstation.【F:src/scripts/app-events.js†L86-L145】【F:index.html†L2501-L2560】
3. **Restore in isolation.** Import the exported backup and bundle into a private offline profile. Confirm
   gear lists, automatic gear rules, favourites and runtime feedback survive the round-trip without
   network access.【F:src/scripts/modules/persistence.js†L1036-L1100】
4. **Inspect guard outputs.** In the primary profile open **Settings → Data & Storage** and **Settings →
   Backup & Restore** to confirm dashboards, counts and safety reminders reflect the recent saves. Check
   `window.__cineRuntimeIntegrity` or run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`
   before committing so the runtime guard still reports every persistence hook as available.【F:index.html†L2722-L2799】【F:src/scripts/modules/runtime.js†L2203-L2368】
5. **Archive interim artefacts.** Store the verified backup, bundle and guard output with your daily notes.
   Even discarded branches leave a traceable breadcrumb for auditors.【F:docs/verification-log-template.md†L12-L67】

## 3. Release readiness validation
Before tagging a release or publishing training material, run this extended rehearsal:

1. **Regenerate service worker assets.** Execute `npm run generate:sw-assets` so the bundled icon and
   documentation manifest matches the release. The script is defined in `package.json`.【F:package.json†L11-L21】
2. **Complete the Quick Start drill.** Follow the README Quick Start sequence on a clean workstation.
   Capture screenshots or PDFs so the rehearsal packet mirrors the offline experience exactly.
3. **Verify redundancy.** Produce at least two planner backups, two project bundles and an automatic gear
   rules export, then import each into separate offline profiles. Record timestamps and machine names in the
   verification log.【F:index.html†L2501-L2560】【F:docs/verification-log-template.md†L12-L67】
4. **Run diff audits.** Use **Compare versions** to diff the latest manual save against the newest
   auto-backup and the fresh planner backup, then export the logs so reviewers can trace changes without
   re-running the app.【F:index.html†L2501-L2560】
5. **Confirm documentation parity.** Regenerate localized READMEs, help PDFs and checklists. Ensure they
   reference the same version string surfaced in **Settings → About** and include the rehearsed save/share/
   import/backup/restore steps.【F:index.html†L2722-L2799】
6. **Duplicate storage.** Copy the repository snapshot, backups, bundles, diff logs, guard outputs and
   refreshed documentation to at least two offline drives stored in different locations. Update the
   verification log with storage locations and checksums.【F:docs/verification-log-template.md†L12-L67】

## 4. Emergency response drill
Keep this checklist close to incident playbooks so crews respond instantly:

1. **Pause and protect.** When data drift is suspected, stop editing, note the time and export a fresh
   planner backup plus promote relevant `auto-backup-…` entries to manual saves. This freezes the current
   state before recovery attempts.【F:src/scripts/app-events.js†L86-L145】【F:index.html†L2501-L2560】
2. **Open diagnostics.** In **Settings → Data & Storage**, review the **Latest activity** panel, safety
   reminders and diagnostics log to see what changed just before the incident.【F:index.html†L2722-L2799】
3. **Sandbox the payload.** Import the suspect bundle or backup into a private offline profile. Compare
   gear lists, runtime dashboards, automatic gear rules and favourites against the source machine to confirm
   whether the issue is isolated.【F:src/scripts/modules/persistence.js†L1036-L1100】
4. **Diff and document.** Run **Compare versions** between the impacted save and the latest healthy
   auto-backup, export the log, capture console guard output and collect screenshots into an incident folder
   stored with redundant archives.【F:index.html†L2501-L2560】【F:src/scripts/modules/runtime.js†L2203-L2368】
5. **Restore safely.** Apply the verified backup or bundle on the production machine. The persistence layer
   captures a pre-restore backup automatically so you can roll back if required. Keep the snapshot until you
   confirm stability.【F:src/scripts/modules/persistence.js†L1036-L1100】
6. **Re-prime caches and notify crews.** Press **Force reload**, reopen help topics and legal pages to refresh
   caches, then update the verification log with the incident summary, recovery steps and artifact locations.
   Share the packet via offline media so every workstation receives the same guidance.【F:index.html†L1-L154】【F:docs/verification-log-template.md†L12-L67】

## 5. Keep documentation and translations aligned
After every development cycle or incident response, ensure the written record matches the behaviours you
rehearsed:

- Update `README.md`, localized READMEs and help topics with any new or adjusted safeguards.
- Run the documentation update and verification checklists so translations, screenshots and printable
  manuals mirror the runtime.【F:docs/documentation-update-checklist.md†L1-L112】【F:docs/documentation-verification-packet.md†L1-L52】
- Track locales awaiting translation in the translation guide so crews always see complete instructions while
  offline.【F:docs/translation-guide.md†L1-L134】

Maintaining this playbook alongside your release process guarantees that every save, share, import, backup
and restore path remains provably safe, keeps offline rehearsal materials synchronised and documents exactly
how user data stayed protected at each step.【F:src/scripts/modules/persistence.js†L900-L1100】【F:src/scripts/modules/runtime.js†L2203-L2368】
