# Data Protection Playbook

The Cine Power Planner treats user data as the most valuable asset in the
application. This playbook translates the save, share, import, backup and
restore guarantees into an actionable routine you can run before and after
changes ship. Pair it with the [Documentation, Help & Translation Maintenance
Guide](documentation-maintenance.md), [Backup Rotation Guide](backup-rotation-guide.md)
and [Offline Readiness Runbook](offline-readiness.md) to keep rehearsals aligned
with the live runtime even when crews stay offline for weeks at a time.

The workflow below assumes you rely exclusively on the assets bundled in this
repository—locally stored Uicons, fonts, help content and service-worker caches
never require external connectivity. Every step should complete successfully
while you are in airplane mode.

## 1. Risk scan before touching code or copy

1. **Map affected persistence flows.** List which parts of
   `cinePersistence` and the save/share/import/backup/restore surfaces your
   change touches so matching documentation updates stay lossless.
2. **Identify safeguarded checkpoints.** Note every safeguard that protects
   the targeted flows—manual saves, background auto-saves, forced pre-restore
   backups, sandbox imports, diagnostics logs and the runtime guard stored on
   `window.__cineRuntimeIntegrity`. Document how the update should influence
   each checkpoint.
3. **Cross-reference documentation.** Mark the sections in `README.md`,
   localized READMEs and help topics that explain the affected workflows.
   Update them in lockstep so offline operators rehearse the exact behavior
   the runtime guarantees.
4. **Schedule verification artefacts.** Decide which backups, project bundles
   and verification logs you will capture once development finishes. Record
   where you plan to store them so redundant offline drives stay organized.

## 2. Daily guardrail rehearsal during development

Run this routine at least once per day (and whenever the persistence layer,
service worker or UI safeguards change) while you iterate:

1. **Prime offline caches.** Open `index.html` from disk, launch the help
   dialog, visit legal pages and toggle each theme so the service worker
   refreshes cached assets. This keeps locally stored Uicons, help copy and
   translations synchronized with the current branch.
2. **Exercise every save path.** Create or load a test project, trigger a
   manual save, wait for an auto-backup to appear, then export both a planner
   backup and project bundle. Label the files with the branch name, timestamp
   and workstation.
3. **Restore in isolation.** Import the exported planner backup and project
   bundle into a private browser profile that never reconnects to the network.
   Confirm gear lists, automatic gear rules, favorites and runtime feedback
   survive the round-trip. Leave the profile offline so caches remain a
   faithful rehearsal target.
4. **Inspect guard outputs.** In the primary profile, open **Settings → Data
   & Storage** and **Settings → Backup & Restore** to confirm dashboards,
   counts and safety reminders reflect the recent saves. Check
   `window.__cineRuntimeIntegrity` and, if necessary,
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` to ensure
   the runtime guard still reports every persistence hook as available.
5. **Archive interim artefacts.** Store the verified backup, bundle and the
   guard output alongside your daily development notes. Even discarded
   branches leave a traceable breadcrumb for auditors verifying that no data
   was lost while experimenting offline.

## 3. Release readiness validation

Before you tag a release, merge documentation or publish training material,
run this extended rehearsal:

1. **Regenerate service-worker assets.** Execute `npm run
   generate:sw-assets` and rebuild any static bundles so the latest icons,
   translations and documentation ship with the release. Confirm the manifest
   lists every updated asset.
2. **Complete the Quick Start drill.** Follow the
   [Quick Start](../README.md#quick-start) guide end-to-end on a clean
   workstation. Capture screenshots or PDFs of every checkpoint so the
   rehearsal packet mirrors the offline experience exactly.
3. **Verify redundancy.** Produce at least two planner backups, two project
   bundles and an automatic gear rules export. Import each artefact into a
   separate offline profile, documenting the timestamps and machine names in
   the verification log.
4. **Run diff audits.** Use **Settings → Backup & Restore → Compare versions**
   to diff the last manual save against the newest auto-backup and the fresh
   planner backup. Export the diff logs and store them with the rehearsal
   packet so reviewers can trace every change without re-running the app.
5. **Update documentation packets.** Regenerate localized READMEs, help PDFs,
   checklists and runbooks. Confirm they reference the same version string
   surfaced in **Settings → About** and include the save/share/import/backup
   and restore steps you just rehearsed.
6. **Duplicate storage.** Copy the full packet—repository snapshot, backups,
   bundles, diff logs, guard outputs and regenerated documentation—to at
   least two offline drives stored in different locations. Update the
   verification log with the storage locations, checksum manifests and the
   operator who performed the archival.

## 4. Emergency response drill

Keep this checklist close to your incident playbooks so crews can respond
without waiting for instructions:

1. **Pause and protect.** When you suspect data drift, stop editing, note the
   time and export a fresh planner backup plus copies of recent auto-backups
   promoted to manual saves. This freezes the current state before any
   recovery attempt.
2. **Open the diagnostics stack.** In **Settings → Data & Storage**, review
   the **Latest activity** panel, safety reminders and diagnostics log to see
   what changed just before the incident. Adjust filters as necessary so no
   entry is hidden.
3. **Sandbox the payload.** Import the suspected project bundle or planner
   backup into a private offline profile. Compare critical data—gear lists,
   runtime dashboards, automatic gear rules and favorites—against the source
   machine to determine whether the issue is isolated.
4. **Diff and document.** Run **Compare versions** between the impacted save
   and the latest healthy auto-backup. Export the log, console guard output
   and any screenshots into an incident folder that lives alongside your
   redundant archives.
5. **Restore safely.** Apply the verified backup or bundle on the production
   machine. The runtime captures a pre-restore backup automatically; keep it
   until you confirm stability so you can roll back or merge notes without
   risking silent data loss.
6. **Re-prime caches and notify crews.** Press **Force reload**, reopen help
   topics and legal pages to refresh caches, then update the verification log
   with the incident summary, recovery steps and where artefacts live. Share
   the packet through offline media so every workstation receives the same
   guidance.

## 5. Keep documentation and translations aligned

After every development cycle or incident response, ensure the written record
matches the behaviors you rehearsed:

- Update `README.md`, localized READMEs and help topics with any new or
  adjusted safeguards.
- Run the [Documentation Update Checklist](documentation-update-checklist.md)
  and [Documentation Verification Packet](documentation-verification-packet.md)
  so translations, screenshots and printable manuals mirror the runtime.
- Log which locales still require translation and ship the English source
  strings so crews always see complete instructions while offline.

Maintaining this playbook alongside your regular release process guarantees
that every save, share, import, backup and restore path remains provably safe,
keeps offline rehearsal materials synchronized and documents exactly how user
data stayed protected at each step.
