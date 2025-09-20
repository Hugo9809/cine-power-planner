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
   Confirm the reported version in **Settings → About** matches your deployment
   log.

## 2. Data integrity rehearsal

1. **Load recent projects.** Open the primary project and at least one
   `auto-backup-…` entry. Verify gear lists, runtime feedback, favorites and
   custom devices appear in both.
2. **Exercise manual save.** Make a harmless edit, press `Enter` or
   `Ctrl+S`/`⌘S`, then confirm the timestamp updates in the project selector.
3. **Export safety snapshots.** Download both a `planner-backup.json` file and a
   `.cpproject` bundle. Store them temporarily on removable media.
4. **Restore in isolation.** Launch a private browsing window or secondary
   profile, stay offline, import the backup and bundle, and verify that the
   project selector, automatic gear rules and offline indicator all mirror the
   source machine. Delete the temporary profile after confirmation.
5. **Review data & storage dashboard.** Open **Settings → Data & Storage** to
   ensure counts for projects, backups and custom devices match expectations.

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
4. **Store redundantly.** Copy backups, bundles and the repository ZIP to at
   least two encrypted destinations per your organization’s retention policy.
5. **Reset caches on purpose.** Once archives are secure, trigger **Force reload**
   and reopen the help dialog and legal pages to prime caches for the next
   session before disconnecting again.

Following this routine ensures no user data is lost, offline capabilities remain
healthy and every team member who launches Cine Power Planner inherits a verified
environment.
