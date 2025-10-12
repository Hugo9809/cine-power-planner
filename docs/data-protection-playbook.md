# Data protection playbook

User data is the most valuable asset in Cine Power Planner. This playbook turns the guarantees built
into the runtime—manual saves, autosave snapshots, full backups, restore rehearsals and offline cache
management—into an actionable routine for day-to-day development and release preparation.

## 1. Plan before touching code or copy
1. **Map affected persistence flows.** Identify which `cinePersistence` wrappers your change touches
   (manual saves, backups, restore rehearsals, share helpers, automatic gear backups) so matching
   documentation stays lossless.【F:src/scripts/modules/persistence.js†L902-L1119】
2. **List runtime safeguards.** Note every checkpoint that protects those flows—auto-backup cadence,
   restore rehearsals, forced pre-restore backups, critical storage mirroring and `verifyCriticalFlows()`
   diagnostics. Decide how the update should influence each safeguard before writing code.【F:src/scripts/app-events.js†L86-L205】【F:src/scripts/modules/runtime.js†L2201-L2335】【F:src/scripts/storage.js†L2845-L2999】
3. **Cross-reference offline surfaces.** Flag sections in Settings (Backup & Restore, Data & Storage),
   help entries and localized READMEs so copy ships alongside behavioural changes.【F:index.html†L2501-L2778】
4. **Plan verification artefacts.** Decide which planner backups, project bundles and diff logs you will
   capture once development finishes. Record storage locations so redundant offline drives stay
   organised.【F:index.html†L2501-L2573】【F:docs/verification-log-template.md†L12-L67】

## 2. Daily guardrail rehearsal during development
Run this sequence at least once per day while iterating on persistence, service worker or UI safeguards:

1. **Prime offline caches.** Open the app from disk, launch the help dialog, visit legal pages and toggle
   themes so the service worker refreshes cached icons, fonts and copy.【F:index.html†L1-L120】【F:service-worker.js†L192-L240】
2. **Exercise every save path.** Create or load a test project, trigger a manual save, wait for the
   autosave cadence to produce a fresh snapshot (50 changes or ten minutes) and export both a planner
   backup and project bundle. Label files with branch, timestamp and workstation.【F:src/scripts/app-events.js†L86-L205】【F:index.html†L2501-L2573】
3. **Restore in isolation.** Import the exported backup and bundle into a private offline profile.
   Confirm gear lists, automatic gear rules, favourites and runtime dashboards survive the round-trip.
   【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2581-L2708】
4. **Inspect guard outputs.** In Settings → Data & Storage, confirm dashboards, counts and safety
   reminders reflect the recent saves. Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`
   before committing so the runtime still reports every persistence hook as available.【F:index.html†L2722-L2778】【F:src/scripts/modules/runtime.js†L2201-L2335】
5. **Archive interim artefacts.** Store the verified backup, bundle and guard output with your daily
   notes. Even discarded branches leave a traceable breadcrumb for auditors.【F:docs/verification-log-template.md†L12-L67】

## 3. Release readiness validation
1. **Regenerate service worker assets.** Run `npm run generate:sw-assets` so the bundled icon and
   documentation manifest matches the release.【F:package.json†L6-L21】
2. **Complete the Quick Start drill.** Follow the README Quick Start sequence on a clean workstation and
   capture screenshots or PDFs so the rehearsal packet mirrors the offline experience exactly.
3. **Verify redundancy.** Produce at least two planner backups, two project bundles and an automatic gear
   export, then import each into separate offline profiles. Record timestamps and machine names in the
   verification log.【F:index.html†L2501-L2708】【F:docs/verification-log-template.md†L12-L67】
4. **Run diff audits.** Use **Compare versions** to diff the latest manual save against the newest
   auto-backup and the fresh planner backup, then export the logs so reviewers can trace changes without
   re-running the app.【F:index.html†L2501-L2573】
5. **Confirm documentation parity.** Run the documentation update and verification checklists so
   translations, screenshots and printable manuals mirror the runtime.【F:docs/documentation-update-checklist.md†L1-L112】【F:docs/documentation-verification-packet.md†L1-L52】
6. **Duplicate storage.** Copy the repository snapshot, backups, bundles, diff logs, guard outputs and
   refreshed documentation to at least two offline drives stored in different locations. Update the
   verification log with storage locations and checksums.【F:docs/verification-log-template.md†L12-L67】

## 4. Emergency response drill
1. **Pause and protect.** When data drift is suspected, stop editing, export a manual backup, promote
   relevant `auto-backup-…` entries to manual saves and capture a project bundle. This freezes the
   current state before recovery attempts.【F:src/scripts/app-events.js†L86-L205】【F:index.html†L2501-L2573】
2. **Open diagnostics.** In Settings → Data & Storage, review the latest activity panel, safety reminders
   and diagnostics log to see what changed just before the incident.【F:index.html†L2722-L2778】
3. **Sandbox the payload.** Import the suspect bundle or backup into a private offline profile. Compare
   gear lists, runtime dashboards, automatic gear rules and favourites against the source machine to
   confirm whether the issue is isolated.【F:index.html†L2581-L2708】
4. **Diff and document.** Run **Compare versions** between the impacted save and the latest healthy
   auto-backup, export the log, capture console guard output and collect screenshots into an incident
   folder stored with redundant archives.【F:index.html†L2501-L2573】【F:src/scripts/modules/runtime.js†L2201-L2335】
5. **Restore safely.** Apply the verified backup or bundle on the production machine. The persistence
   layer captures a pre-restore backup automatically so you can roll back if required.【F:src/scripts/modules/persistence.js†L1036-L1109】
6. **Re-prime caches and notify crews.** Press Force reload, reopen help topics and legal pages to refresh
   caches, then update the verification log with the incident summary, recovery steps and artifact
   locations. Share the packet via offline media so every workstation receives the same guidance.【F:index.html†L1-L120】【F:docs/verification-log-template.md†L12-L67】

## 5. Keep documentation and translations aligned
- Update README files, localized help and training materials whenever safeguards change.
- Run the documentation maintenance, update and verification checklists so translations, screenshots
  and printable manuals reflect the shipped behaviour.【F:docs/documentation-maintenance.md†L1-L140】【F:docs/documentation-update-checklist.md†L1-L112】【F:docs/documentation-verification-packet.md†L1-L52】
- Track locales awaiting translation and mark blockers so offline crews always see complete instructions.【F:docs/translation-guide.md†L1-L134】

Following this routine ensures that every save, share, import, backup and restore path remains provably
safe, keeps offline rehearsal materials synchronised and documents how user data stayed protected at
each step.【F:src/scripts/modules/persistence.js†L902-L1119】【F:src/scripts/modules/runtime.js†L2201-L2335】

## 2025-02 safeguard validation
- **Storage dashboard parity.** Confirmed the Data & Storage panel still surfaces mirrored keys and
  reminders so emergency drills can confirm redundancy without leaving the planner UI.【F:index.html†L2722-L2778】【F:src/scripts/app-core-new-2.js†L9602-L9680】
- **Quota-resilient backups.** Re-checked the critical storage guard that mirrors planner keys and
  compresses backups if quota errors appear, ensuring redundancy even under storage pressure.【F:src/scripts/storage.js†L2845-L2999】
- **Service worker alignment.** Verified the worker still imports the shared version helper and exposes
  the cache name and diagnostics log, keeping offline rehearsals consistent with documented
  expectations.【F:service-worker.js†L192-L240】
