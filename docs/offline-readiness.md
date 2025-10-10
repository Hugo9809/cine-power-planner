# Offline Readiness Runbook

Cine Power Planner is designed to run identically whether you are on a stage workstation
or in the middle of a field shoot with no connectivity. This runbook consolidates the
procedures crews should follow to guarantee offline performance stays reliable and that
saves, shares, imports, backups and restores keep every project intact.

The steps below complement the [Operational Checklist](operations-checklist.md) and the
backup guidance in the main README. Keep a printed copy with your travel kit so the
entire team can rehearse data safety workflows before boarding a plane or packing the
truck.

## Cache alignment before every release

Service worker releases must ship with a cache identifier that matches the application
version or offline crews risk loading stale bundles. Before tagging a release:

1. Update the version in `package.json` as usual and apply the same number wherever the
   runtime exposes `APP_VERSION` (the shared module guarantees loader, autosave and
   restore flows expose the value globally).
2. Run `npm run test:unit -- versionConsistency` to verify the service worker imported
   the shared version marker correctly and produced the matching cache name. The test
   executes the worker in isolation, so failures highlight drift before anything ships.
3. Force-reload the planner locally, open **Settings → About** to confirm the displayed
   version, and then switch to offline mode. Exercise manual save, autosave, share,
   import, backup and restore while offline to ensure the regenerated cache serves the
   updated bundles without losing user data.
4. Update the verification log with the version string, the command output and the date
   of the offline rehearsal so future crews can confirm which cache build they trust.

## 1. Provisioning a new machine

Run this sequence when you clone or copy the repository onto a workstation for the first
time:

1. **Verify the source.** Copy the entire repository folder, including `animated icons 3/`
   and `src/icons/`, using trusted offline media. Launch `index.html` once while online to
   let the service worker cache locally stored Uicons, OpenMoji artwork and helper
   scripts, then close the browser.
2. **Confirm offline startup.** Disconnect from all networks, reopen `index.html` and wait
   for the offline indicator to appear. Open the help dialog and legal pages to confirm
   cached assets render exactly as they did online. While still offline, visit
   **Settings → Backup & Restore** so the autosave overlay loads—this exercises the split
   `app-core` bundles (`app-core-new-1.js`, `app-core-new-2.js` and their helpers) and
   proves the service worker cached the runtime, session and setup controllers that power
   saves, shares and restores without network access.
3. **Exercise persistence.** Create a dummy project, trigger a manual save, then refresh
   the app while still offline. The project selector should show the saved entry and the
   timestamped `auto-backup-…` snapshot once the autosave routine runs. Open **Settings →
   Backup & Restore** to confirm the autosave status overlay reflects the same timestamp,
   then review **Settings → Data & Storage** to verify project, backup and gear counts
   updated as expected, scan the **Diagnostics log** for fresh entries and adjust filters
   if anomalies appear (the viewer now notes when filters suppress every entry so you know
   the silence is intentional). Confirm the **Backup guardian** row reports an active or mirrored
   state so every critical key already has a redundant copy before rehearsals continue,
   check the **Latest activity** board for the new save entries, confirm the safety reminders
   either call out stale data or show the green all-clear message, and capture a backup through
   **Quick safeguards** if you need an extra offline copy. The sequential loader now
   predeclares the grid snap flag, the runtime guard stub and the icon glyph helpers on the
   global scope before it injects the core bundles, preventing older Safari builds from
   throwing reference errors while you are offline. It now also replaces the deprecated
   `styleMedia` fallback with a `matchMedia`-backed shim that simply shadows the prototype
   binding so Chrome no longer logs the console warning and display-mode detection keeps
  working without touching network resources.【F:src/scripts/loader.js†L1-L128】【F:src/scripts/loader.js†L238-L350】【F:src/scripts/loader.js†L350-L459】
4. **Check the runtime guard.** Open the browser console and inspect
   `window.__cineRuntimeIntegrity`. It should report `{ ok: true }` with an empty
   `missing` list. Run `window.cineRuntime.verifyCriticalFlows()` if you need a fresh
   report—the output lists every persistence, offline and UI safeguard that must stay
   available, including the runtime feedback storage wrappers and bindings, before crews
   rely on the workstation.
5. **Capture baseline exports.** While still offline, export both a planner backup
   (`planner-backup.json`) and a project bundle (`project-name.json`). Import the files into
   a private browser profile that also stays offline. Once you confirm the restore loop
   works end-to-end, delete the verification profile to prevent stale caches.
6. **Review the diff workspace.** Back in the primary profile, open **Settings → Backup &
   Restore → Compare versions**, set the manual save as the baseline and the latest auto
   backup as the comparison, review the summary and detailed list for unexpected changes,
   jot context in **Incident notes** and export the log. Pair the JSON with your baseline
   verification notes so auditors can replay the diff offline later.
7. **Archive the reference set.** Store the verified backup, bundle and a ZIP of the
   repository on redundant encrypted media alongside a checksum manifest. These artifacts
   become your gold-standard comparison point during future audits.

## 2. Pre-travel confidence sweep

Run this rehearsal before you take the workstation into an environment with limited or no
connectivity:

1. **Update deliberately.** While online, press **Force reload**, reopen `index.html` and
   confirm **Settings → About** lists the expected version. Prime caches by opening the
   help dialog, legal pages and the device catalog. The reload button now gives up waiting
   on service worker cleanup after about 700 ms so the page refreshes promptly; review the
   console afterward to ensure background cache removals and unregister calls still
   succeeded.
2. **Review current data.** Load active projects plus their latest `auto-backup-…`
   entries. Confirm gear lists, runtime dashboards, favorites and automatic gear rules all
   match the production log. In **Settings → Automatic Gear Rules** reveal the automatic
   backup timeline, review the retention summary—the planner now keeps up to 240 automatic
   project backups by default—and adjust the limit if you need a longer runway of snapshots
   before travelling.
3. **Generate redundancy.** Export a fresh planner backup and project bundle, then import
   both files into an isolated browser profile. Document the validation date, machine name
   and any notes about data changes since the last rehearsal. Include a standalone
   `auto-gear-rules-*.json` export in this drill—the import flow now verifies the file
   type, semantic version and timestamp metadata entirely offline, warning you about
   mismatches and restoring the pre-import snapshot automatically if validation fails.
4. **Audit the latest saves.** Reopen **Settings → Backup & Restore → Compare versions**,
   diff the most recent manual save against the newest auto backup, review highlights,
   add incident notes that describe the edits since the last trip and export the log so the
   travel kit carries a documented history of changes.
5. **Confirm safeguards stayed intact.** In the main profile, review
   `window.__cineRuntimeIntegrity` or rerun
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` to ensure no
   controller, share helper, feedback persistence wrapper or backup routine dropped out
   between rehearsals. If the report lists anything in `missing`, rehearse exports again
   before travelling.
6. **Simulate outages.** With the verification profile still offline, reload the planner
   and navigate the interface. Confirm locally stored Uicons, fonts and helper scripts stay
   available and that autosave warnings do not appear.
7. **Pack verified media.** Copy the newly validated exports plus the repository snapshot
   onto at least two encrypted drives that travel separately. Update your inventory list so
   every crew member knows where the redundant copies live.

## 3. Daily field routine

Re-run these checks each morning and evening while you are on location:

1. **Morning warm-up.** Before editing anything, open the help dialog and legal pages to
   keep caches fresh, then load the day’s project and confirm the timestamp of the latest
   `auto-backup-…` entry. Open **Settings → Backup & Restore** so the autosave status
   overlay proves background saves are healthy.
2. **During the day.** When significant edits land, trigger a manual save and export a
   planner backup. Label the file with the project name, location, operator and time so it
   is easy to trace.
3. **Evening wrap.** Export another planner backup and bundle, import both into an offline
   verification profile and confirm all data matches. Promote any important auto backups to
   manual saves before closing the day.
4. **Log a diff.** Before shutting down, compare the last manual save with the newest auto
   backup in **Settings → Backup & Restore → Compare versions**. Export the log and attach
   it to the day’s verification notes so the rotation shows exactly what changed.
5. **Redundant storage.** Copy the day’s verified exports to the primary archive drive and
   a travel-safe duplicate. Note which copy was inspected so rotations catch potential
   media degradation early.

### Monthly data health check rehearsal

Run the Help Center’s guided **Monthly data health check** at least once per month (or any
time you adjust documentation) so the offline drill stays aligned with production
workflows:

1. Open the help dialog, scroll to **Monthly data health check** and press each linked
   step to follow the guided sequence. The runtime localises the checklist so every
   workstation sees the correct labels before going offline.【F:index.html†L3060-L3091】【F:src/scripts/app-core-new-1.js†L12115-L12217】
2. Start with **Settings → Data & Storage → Quick safeguards → Download full backup** to
   capture a fresh snapshot before you review exports.【F:index.html†L2548-L2570】【F:src/scripts/translations.js†L1674-L1684】
3. Export each active project with the linked share controls and store the files on at
   least two offline destinations.
4. Disconnect from the network, reload the planner from disk and confirm the offline
   indicator, help topics and cached interface load exactly as documented.
5. Finish with **Restore rehearsal** so the sandbox diff proves every project, device and
   rule matches the export. Capture the console guard output by running
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` before you close the
   rehearsal so the verification log documents which safeguards were confirmed.【F:index.html†L3060-L3089】【F:src/scripts/translations.js†L1679-L1682】
6. Log the outcome in your rotation or verification journal alongside the filenames and
   console output you captured so future crews inherit the evidence.

## 4. Quick diagnostics when something feels off

If autosave stalls, a project looks incomplete or the offline badge disappears, follow
this triage list:

1. **Stabilize the session.** Keep the browser tab open, note the time and disconnect from
   networks if possible. Avoid reloading until you capture evidence.
2. **Export everything.** Use **Settings → Backup & Restore → Backup** to create
   `planner-backup.json`, then duplicate the newest `auto-backup-…` entries into manual
   saves. This protects data from automated cleanup.
3. **Validate in isolation.** Import the suspect project bundle into a private profile that
   stays offline. Compare its contents against the production machine to confirm which data
   diverged. Re-run the latest automatic gear rules export as well; the validator highlights
   missing metadata or version drift and protects the existing rules by rolling back
   automatically if the payload cannot be trusted.
4. **Diff suspicious saves.** Back on the production machine, open **Settings → Backup &
   Restore → Compare versions** and load the affected manual save alongside the newest auto
   backup. Export the log and attach it to the incident folder so investigators can trace
   what changed and when.
5. **Restore with safeguards.** After validation, restore the fresh backup on the primary
   machine. The app captures a pre-restore snapshot automatically, so retain it for diffing
   if you need to merge notes.
6. **Re-prime caches.** Once stability returns, press **Force reload**, reopen the help
   dialog and legal pages and document the incident, including where backups and bundles are
   stored. File the log alongside your redundant archives.

### Meaning of the cyclic auto-backup warning

If the console reports `Detected cyclic auto-backup reference while expanding snapshot` for
an entry such as `auto-backup-2025-10-06-23-38-Hallo 123`, it means a delta snapshot points
back to itself or another snapshot that eventually loops around. The storage layer walks
each snapshot’s `base` reference when reconstructing the full payload, so this guard stops
infinite recursion and now promotes the stored payload into a standalone full snapshot. The
looping entry becomes readable again without deleting it, and the rest of the backups stay
safe instead of locking up the browser.

When you see the warning:

1. Export a full planner backup immediately so you have a frozen copy of every project and
   autosave before making changes.
2. Promote the most recent healthy auto backup to a manual save (or duplicate the affected
   project) so crews can keep working without touching the corrupted chain.
3. Open **Settings → Backup & Restore → Compare versions** and diff the healthy manual save
   against the suspicious snapshot to confirm whether any data diverged.
4. Remove or rename the looping auto backup only after the comparison confirms it is safe
   to do so. Deleting the entire project is never required—other snapshots remain intact.
5. Capture an incident log with the timestamp of the warning, the snapshot names involved
   and the exports you generated so future audits can trace the fix.

Keeping this runbook nearby ensures crews can prove offline readiness, preserve user data
and rehearse recovery workflows without relying on an internet connection.

## 5. Verification logging & audits

Every successful drill should leave a trail operators can reference later. After each
rehearsal, append a short note to your verification log (or create one alongside the
exported artifacts if it does not already exist) with:

- **Timestamp and workstation.** Note the local time, browser version and machine name so
  future crews can trace which environment proved the offline workflow.
- **Exports inspected.** List the filenames for the planner backup, project bundle and any
  automatic gear rule exports you validated. Include checksum values when available to
  make integrity checks trivial.
- **Diff logs archived.** Reference the exported comparison JSON and the versions it
  documented so future audits can replay the change history before rotating media.
- **Share and restore results.** Record whether manual saves, autosaves, shareable bundles,
  imports and automatic rollbacks behaved as expected. Document anything that required a
  retry so auditors know what to watch during the next drill.
- **Logger retention counters.** Capture the snapshot from `cineLogging.getStats()` so the
  audit trail shows how many diagnostics entries were recorded, when retention trimmed the
  history and how many events were preserved. Keeping this metadata with the exported
  backups proves that no warnings disappeared silently while the limit rotated entries.
- **Cache status.** Confirm the help dialog, legal pages and other locally stored Uicons or
  helper scripts rendered correctly while offline. A quick note here proves the service
  worker cache stayed intact.

Store the log in the same folder as the verified exports on both redundant media sets. The
auditable paper trail makes it obvious when the last offline rehearsal occurred and which
assets were inspected, keeping save, share, import, backup and restore workflows trusted by
every crew member.
