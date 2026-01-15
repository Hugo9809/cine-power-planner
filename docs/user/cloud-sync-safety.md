# Cloud Sync Safety (Future Update)

> **Status:** Cloud sync is planned for a future update. The current release is
> fully local-first and does not upload or sync data with any external service.
> This guide prepares your workflows so local data remains protected before,
> during, and after cloud sync becomes available.

## Why cloud sync is optional

Cloud sync is designed to **extend** local workflows, not replace them. Your
projects, gear data, and backups remain stored locally in IndexedDB with OPFS
backups where supported. Sync (when released) will only send **copies** of data
that already exist on your device. Local storage remains the source of truth so
that offline work and recovery stay reliable.

## How local-first sync is intended to work

When cloud sync ships, it will follow these local-first behaviors:

- **Local writes first.** Every save and autosave lands locally before any sync
  attempt.
- **Sync is additive.** Uploads are copies, never a move. Local data is never
  deleted automatically as part of syncing.
- **Manual opt-in.** Sync will require explicit enablement per device so teams
  can keep offline-only stations truly offline.
- **Safe merge prompts.** If two devices edit the same project, the app will
  show a local comparison and require manual confirmation before promoting any
  merged result.

## Pre-flight steps before enabling cloud sync

Complete these steps **every time** before enabling sync on a device. They
create verified restore points in case anything unexpected happens.

1. **Run a full backup.**
   Use the in-app backup flow to create a planner backup and store it on
   separate offline media.
2. **Export key projects.**
   Export share bundles for active projects so you have portable copies.
3. **Verify restore readiness.**
   Use the import/restore preview to confirm each backup or bundle opens and
   lists expected data before promoting.
4. **Record a baseline snapshot.**
   Note the most recent save timestamps and project counts in your session log
   so you can compare after enabling sync.

## Offline behavior expectations

Even after cloud sync is released, offline workflows remain first-class:

- **No connection required.** You can continue to create, edit, export, and
  restore projects without any network.
- **Sync pauses safely.** If you go offline while sync is enabled, local saves
  continue and will queue for upload the next time you reconnect.
- **No silent deletions.** Local data stays intact during offline periods; sync
  never removes local files without explicit user confirmation.

## Safe recovery steps if something looks wrong

If you ever suspect a sync issue, follow this local-first recovery path:

1. **Stop sync immediately.** Disable sync on the device to prevent any further
   changes from being uploaded or merged.
2. **Export current state.** Create a planner backup and project bundles from
   the current local data.
3. **Restore from a known-good backup.** Use the pre-flight backup or share
   bundle to restore locally, and verify the preview before promotion.
4. **Compare and reconcile.** If needed, import the exported current-state
   bundles into a secondary workspace to compare changes safely.

## How to verify local data is preserved

Use this checklist before and after any sync action (enable, disable, or
reconnect):

- **Project count matches.** Confirm the number of projects matches your
  baseline snapshot.
- **Recent saves are present.** Open the latest project and confirm the most
  recent edits are visible locally.
- **Autosave history is intact.** Review autosave or version history for the
  expected timestamps.
- **Backups still restore.** Run a restore preview on your latest backup and
  verify it lists the correct project names before promotion.
- **Exports still open.** Import a share bundle into a safe preview and confirm
  it includes the right assets and notes.

## Keep your safety nets current

Cloud sync will be a **future optional layer**, not a replacement for local
backups. Continue to run the save → autosave → backup → share → restore drill
regularly so every device can recover without relying on a network connection.
