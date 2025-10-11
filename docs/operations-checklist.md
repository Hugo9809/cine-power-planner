# Cine Power Planner Operational Checklist

This guide distills the critical routines production teams should follow to
protect locally stored data, keep offline functionality healthy and verify that
saving, share, import, backup and restore flows all function before a shoot.
Work through the sections in order whenever you provision a new workstation,
update the repository or hand off a project at the end of the day.

## 1. Environment preparation

1. **Clone or copy the repository.** Use a trusted offline transfer such as an
   encrypted drive. Open `index.html` directly from disk to confirm the app
   loads without a network connection.
2. **Prime cached assets.** Click the help button, open every legal page and
   toggle each theme once. This ensures locally bundled Uicons, OpenMoji artwork
   and typography files are cached before you go into the field.
3. **Approve updates intentionally.** If the **Update ready** toast appears,
   finish your current edits, export a backup, then press **Force reload**.
   The reload button now stops waiting after roughly 700 ms if service worker
   cleanup lingers so the page navigates immediately; the console will still log
   any delayed unregister attempts so you can verify cleanup completed once the
   page returns. Confirm the reported version in **Settings → About** matches
   your deployment log.

## 2. Data integrity rehearsal

1. **Load recent projects.** Open the primary project and at least one
   `auto-backup-…` entry. Verify gear lists, runtime feedback, favorites and
   custom devices appear in both. Confirm the tripod catalog shows the newly
   documented heads (Cartoni Maxima 40, Miller CX18 Fluid, Libec RH45D and
   Vinten Vision 10AS) so offline crews can rely on the expanded options when
   planning support kits. Check that temporary extras flagged in past sessions
   still display their coloured date badges and stay grouped under **Extras
   temporaires/Temporäre Extras/Temporary Extras** so schedulers know which
   lines only apply for the specified period.
   - Confirm the guided lens workflow reloads the saved manufacturer, series
     and mount for every chip, allows selecting a new lens without dropping
     existing chips, and keeps the hidden legacy select in sync so overview
     exports still list the chosen lenses.
2. **Exercise manual save.** Make a harmless edit, press `Enter` or
   `Ctrl+S`/`⌘S`, then confirm the timestamp updates in the project selector.
3. **Export safety snapshots.** Download both a `planner-backup.json` file and a
   `.cpproject` bundle. Store them temporarily on removable media.
4. **Restore in isolation.** Launch a private browsing window or secondary
   profile, stay offline, import the backup and bundle, and verify that the
   project selector, automatic gear rules and offline indicator all mirror the
   source machine. Use **Settings → Backup & Restore → Restore rehearsal** to
   review the rule-by-rule diff before you load the snapshot so additions,
   removals and scenario scope changes are confirmed without touching live
   storage. Delete the temporary profile after confirmation.
5. **Record a version diff.** In the primary profile, open **Settings → Backup &
   Restore → Compare versions**, choose the newest manual save plus the latest
   auto backup, review the highlighted differences, add context in **Incident
   notes** and export the log. File the JSON beside your rehearsal exports so
   future audits can replay the change history offline.
6. **Inspect the runtime guard.** Back in the primary profile, open the
   developer console and check `window.__cineRuntimeIntegrity`. It should show
   `{ ok: true }` with no missing safeguards. When in doubt, run
   `window.cineRuntime.verifyCriticalFlows()` for a fresh report and confirm the
   persistence, offline and UI sections—including runtime feedback storage
   wrappers and bindings—all pass before you archive exports. While the console
   is open, confirm the new `styleMedia` shim kept Chrome from logging the
   deprecated `window.styleMedia` warning—the loader now shadows the
   prototype-provided property with a `matchMedia`-based helper, avoiding the
   deprecated getter while keeping display-mode detection reliable and
   silent.【F:src/scripts/loader.js†L1-L128】
7. **Review data & storage dashboard.** Open **Settings → Data & Storage** to
   ensure counts for projects, backups and custom devices match expectations,
   confirm the **Latest activity** board lists recent saves and backups, verify
   the new safety reminders either demand a fresh save/backup or show the
   all-clear state, review the **Diagnostics log** filters and toggles for
   unexpected noise (the panel now highlights when filters hide everything so
   crews know the silence is intentional), and use **Quick safeguards** to
   capture a fresh full backup if anything looks stale.
8. **Check draft impact preview.** Open the automatic gear rule editor, review
   the draft impact preview for quantity deltas and warnings, then cancel to
   confirm the live generator stays unchanged. Adjust the shooting-day counter
   long enough to verify the factory “every five shooting days” consumables rule
   multiplies Bluestar eye leathers, Pro Gaff rolls, clapper sticks, Kimtech
   wipes and Sprigs to cover longer schedules automatically.
9. **Run the Monthly data health check.** Open the help dialog, locate
   **Monthly data health check** and follow the linked steps to capture a fresh
   full backup through **Settings → Data & Storage → Quick safeguards → Download
   full backup**, export each active project, reload offline and complete
   **Restore rehearsal** before recording the results in your rotation log.【F:index.html†L2548-L2570】【F:index.html†L3060-L3089】【F:src/scripts/translations.js†L1674-L1682】
10. **Log the drill.** Append a verification note (timestamp, machine, operator
   and files inspected) to your archival log or create one beside the exports
   if it does not exist yet. Pair the note with checksum manifests so every
   crew member can prove when the save → share → import rehearsal succeeded.
   Use the [verification log template](verification-log-template.md) so every
   team records the same evidence and diagnostic outputs.

## 3. Offline confidence checks

1. **Toggle connectivity.** Disconnect the machine from all networks, refresh
   the app and watch for the offline indicator in the header.
2. **Navigate the interface.** Switch themes, open the help dialog and traverse
   the gear list generator to ensure assets remain available without the
   internet.
3. **Inspect service worker status.** Open browser developer tools, inspect the
   service worker and confirm it reports an *activated* state with no errors in
   the console.

## 4. Daily wrap procedure

1. **Capture final exports.** Generate fresh backup and bundle files, naming
   them with the project title, location and shoot date.
2. **Verify imports again.** Repeat the isolation restore test to ensure end-of-
   day files are complete and uncorrupted.
3. **Document changes.** Update your production log with notes about new devices,
   modified automatic gear rules or additional runtime submissions captured that
   day.
4. **Archive a diff log.** Run **Settings → Backup & Restore → Compare versions**
   on the day’s final manual save versus the newest auto backup, export the JSON
   and attach it to the production log entry so the rotation shows exactly what
   changed.
5. **Store redundantly.** Copy backups, bundles and the repository ZIP to at
   least two encrypted destinations per your organization’s retention policy.
6. **Reset caches on purpose.** Once archives are secure, trigger **Force reload**
   and reopen the help dialog and legal pages to prime caches for the next
   session before disconnecting again. Remember the button resumes navigation
   quickly now; keep an eye on the console for any late cache removals after the
   reload completes.

## 5. Incident response quick actions

If a project looks incomplete, a gear list is missing or an unexpected warning
appears, stabilize the environment before attempting to fix it:

1. **Hold the current session.** Leave the tab open, disconnect from networks if
   possible and note the timestamp plus the offline indicator state. Avoid
   reloading until you record what happened.
2. **Capture available data.** Run **Settings → Backup & Restore → Backup** to
   download `planner-backup.json`. The export includes auto backups, favorites,
   runtime feedback and automatic gear rules even if the selector looks wrong.
3. **Promote safety copies.** Reveal `auto-backup-…` entries and duplicate the
   most recent ones into manual saves labeled with an incident ID so they are not
   purged automatically.
4. **Verify in isolation.** Import the latest trusted `project-name.json`
   (rename to `.cpproject` if that matches your archive) into a private browser
   profile that stays offline. Confirm the project contents there before touching
   the production environment.
5. **Restore with confidence.** Once the isolated import checks out, restore the
   freshly captured backup on the main machine. The app now surfaces an automatic
   verification summary that compares live counts with the backup snapshot—log any
   mismatches before proceeding. Compare the automatic pre-restore snapshot
   against the restored data and document what happened, where exports are stored
   and which workstation verified the recovery.
6. **Export the diff log.** After the restore, run **Settings → Backup &
   Restore → Compare versions** between the pre-incident manual save and the
   restored state. Save the log into the incident folder so reviewers can trace
   the resolution path offline.

Following this routine ensures no user data is lost, offline capabilities remain
healthy and every team member who launches Cine Power Planner inherits a verified
environment.
