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
- High-risk actions (project switch, import, export, restore, translation export)
  trigger immediate backups regardless of cadence.
- Automatic backups are stored as `auto-backup-*` entries and appear in the
  selector for review or manual restore.

## Data & Storage dashboard review

1. Open **Settings → Data & Storage** before disconnecting from the network.
2. Inspect the **Storage summary** cards to confirm saved projects, autosaves,
   backups, device exports and translation bundles all have current counts.
3. Read the **Latest activity** timestamps for manual saves, automatic snapshots
   and full backups; capture fresh exports if any entry looks stale.
4. Check the **Backup guardian** status—every critical key must show as mirrored
   before you rely on offline workstations.
5. Use **Quick safeguards → Download full backup** when you need an immediate
   snapshot and archive the JSON alongside project exports on two storage
   devices.

## Planner backup export

1. Open **Settings → Backup & Restore**.
2. Choose **Backup** or **Quick safeguards**.
3. The export includes every project, autosave snapshot, automatic gear preset,
   custom gear list, runtime feedback entry, preferences and translation bundles.
4. Save the JSON file, compute a checksum and store it on two offline media.

## Planner backup restore

1. Use **Restore rehearsal** to validate the backup in a sandbox.
2. Inspect restored projects, autosave ledger, presets and translation bundles.
3. When satisfied, run **Restore** to replace live data. The app captures a
   pre-restore backup automatically.

## Project share & import

- Export individual projects from the selector for handoff.
- Exports bundle the project payload, automatic gear references and history
  metadata.
- Importing validates the payload, creates a backup of current data and then adds
  the project to the selector. Duplicates receive unique names.

## Automatic gear presets

- Presets save through the same persistence pipeline as projects.
- Editors can export presets, clear local copies and re-import to confirm
  redundancy.
- Restores capture current presets before replacing them; diff summaries document
  changes.

## Translation exports

- Use **Settings → Languages → Export** to archive locale bundles when strings
  change.
- Translation exports are stored alongside planner backups with checksum notes.
- Importing a translation bundle snapshots existing locales before applying
  updates.

## Verification tips

- Run `window.cineRuntime.verifyCriticalFlows()` after rehearsals to confirm the
  guard reports healthy storage mirrors and registry bindings.
- Use the compare tool to review differences between manual saves and backups.
- Keep planner backups, project bundles, translation exports and verification logs
  together so any workstation can recover the latest state offline.

Following these procedures ensures no user data is lost and that every workflow
remains transparent to crews working without connectivity.
