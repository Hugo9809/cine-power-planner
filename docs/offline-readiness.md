# Offline Readiness Runbook

Cine Power Planner is designed to run identically whether you are on a stage workstation
or in the middle of a field shoot with no connectivity. This runbook consolidates the
procedures crews should follow to guarantee offline performance stays reliable and that
saves, shares, imports, backups and restores keep every project intact.

The steps below complement the [Operational Checklist](operations-checklist.md) and the
backup guidance in the main README. Keep a printed copy with your travel kit so the
entire team can rehearse data safety workflows before boarding a plane or packing the
truck.

## 1. Provisioning a new machine

Run this sequence when you clone or copy the repository onto a workstation for the first
time:

1. **Verify the source.** Copy the entire repository folder, including `animated icons 3/`
   and `src/icons/`, using trusted offline media. Launch `index.html` once while online to
   let the service worker cache locally stored Uicons, OpenMoji artwork and helper
   scripts, then close the browser.
2. **Confirm offline startup.** Disconnect from all networks, reopen `index.html` and wait
   for the offline indicator to appear. Open the help dialog and legal pages to confirm
   cached assets render exactly as they did online.
3. **Exercise persistence.** Create a dummy project, trigger a manual save, then refresh
   the app while still offline. The project selector should show the saved entry and the
   timestamped `auto-backup-…` snapshot once the autosave routine runs. Open **Settings →
   Backup & Restore** to confirm the autosave status overlay reflects the same timestamp,
   then review **Settings → Data & Storage** to verify project, backup and gear counts
   updated as expected. Confirm the **Storage protection** card reports a granted state
   (or retry the request) so eviction-safe storage stays active for the trip.
4. **Capture baseline exports.** While still offline, export both a planner backup
   (`planner-backup.json`) and a project bundle (`project-name.json`). Import the files into
   a private browser profile that also stays offline. Once you confirm the restore loop
   works end-to-end, delete the verification profile to prevent stale caches.
5. **Archive the reference set.** Store the verified backup, bundle and a ZIP of the
   repository on redundant encrypted media alongside a checksum manifest. These artifacts
   become your gold-standard comparison point during future audits.

## 2. Pre-travel confidence sweep

Run this rehearsal before you take the workstation into an environment with limited or no
connectivity:

1. **Update deliberately.** While online, press **Force reload**, reopen `index.html` and
   confirm **Settings → About** lists the expected version. Prime caches by opening the
   help dialog, legal pages and the device catalog.
2. **Review current data.** Load active projects plus their latest `auto-backup-…`
   entries. Confirm gear lists, runtime dashboards, favorites and automatic gear rules all
   match the production log. In **Settings → Automatic Gear Rules** reveal the automatic
   backup timeline, review the retention summary and adjust the limit if you need a longer
   runway of snapshots before travelling.
3. **Generate redundancy.** Export a fresh planner backup and project bundle, then import
   both files into an isolated browser profile. Document the validation date, machine name
   and any notes about data changes since the last rehearsal. Include a standalone
   `auto-gear-rules-*.json` export in this drill—the import flow now verifies the file
   type, semantic version and timestamp metadata entirely offline, warning you about
   mismatches and restoring the pre-import snapshot automatically if validation fails.
4. **Simulate outages.** With the verification profile still offline, reload the planner
   and navigate the interface. Confirm locally stored Uicons, fonts and helper scripts stay
   available and that autosave warnings do not appear.
5. **Pack verified media.** Copy the newly validated exports plus the repository snapshot
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
4. **Redundant storage.** Copy the day’s verified exports to the primary archive drive and
   a travel-safe duplicate. Note which copy was inspected so rotations catch potential
   media degradation early.

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
4. **Restore with safeguards.** After validation, restore the fresh backup on the primary
   machine. The app captures a pre-restore snapshot automatically, so retain it for diffing
   if you need to merge notes.
5. **Re-prime caches.** Once stability returns, press **Force reload**, reopen the help
   dialog and legal pages and document the incident, including where backups and bundles are
   stored. File the log alongside your redundant archives.

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
- **Share and restore results.** Record whether manual saves, autosaves, shareable bundles,
  imports and automatic rollbacks behaved as expected. Document anything that required a
  retry so auditors know what to watch during the next drill.
- **Cache status.** Confirm the help dialog, legal pages and other locally stored Uicons or
  helper scripts rendered correctly while offline. A quick note here proves the service
  worker cache stayed intact.

Store the log in the same folder as the verified exports on both redundant media sets. The
auditable paper trail makes it obvious when the last offline rehearsal occurred and which
assets were inspected, keeping save, share, import, backup and restore workflows trusted by
every crew member.
