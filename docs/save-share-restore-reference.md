# Save, Share, Import, Backup & Restore Reference

This reference summarises the workflows that protect user data. Pair it with the
[Operations Checklist](operations-checklist.md) during rehearsals and store a
printed copy with field kits.

## Manual save

- Trigger via **Save**, pressing **Enter** in the project name field or using
  `Ctrl+S` / `⌘S`.
- The app writes the project to storage, updates the compare history and refreshes
  the autosave ledger. A redundant mirror is created before the UI updates.

## Autosave & automatic backups

- Autosave listens to form changes and throttles bursts to avoid duplicate
  writes.
- A background timer forces snapshots roughly every 10 minutes or after about 50
  tracked changes, whichever comes first.
- High-risk actions (project switch, import, export, restore) trigger immediate
  backups regardless of cadence.
- Automatic backups are stored as `auto-backup-*` entries and appear in the
  selector for review or manual restore.

## Planner backup export

1. Open **Settings → Backup & Restore**.
2. Choose **Backup** or **Quick safeguards**.
3. The export includes every project, autosave snapshot, automatic gear preset,
   custom gear list, runtime feedback entry and preferences.
4. Save the JSON file, compute a checksum and store it on two offline media.

## Planner backup restore

1. Use **Restore rehearsal** to validate the backup in a sandbox.
2. Inspect the restored projects, autosave ledger and presets.
3. When satisfied, run **Restore** to replace live data. The app captures a
   pre-restore backup automatically.

## Project share & import

- Export individual projects from the selector for handoff.
- The export bundles the project payload, automatic gear references and history
  metadata.
- Importing validates the payload, creates a backup of current data and then
  adds the project to the selector. Duplicates receive unique names.

## Automatic gear presets

- Presets save through the same persistence pipeline as projects.
- Editors can export presets, clear local copies and re-import to confirm
  redundancy.
- Restores always capture the current presets before replacing them.

## Verification tips

- Run `window.cineRuntime.verifyCriticalFlows()` after rehearsals to confirm the
  guard reports healthy storage mirrors and registry bindings.
- Use the compare tool to review differences between manual saves and backups.
- Keep planner backups, project bundles and verification logs together so any
  workstation can recover the latest state offline.

Following these procedures ensures no user data is lost and that every workflow
remains transparent to crews working without connectivity.
