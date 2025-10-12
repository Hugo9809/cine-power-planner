# Operations Checklist

Run this checklist whenever you prepare a workstation for daily use or certify a
release. It ensures every safeguard for saving, sharing, importing, backing up
and restoring is operational offline.

## Before starting

- Confirm the service worker is current and the refresh prompt was accepted
  intentionally.
- Verify locally stored Uicons and fonts render correctly.
- Ensure planner backups, project bundles and translation exports from the
  previous session are archived and accessible.

## Checklist

1. **Load workspace**
   - Open the app, confirm the offline indicator appears and record the build hash
     from settings.
2. **Manual save**
   - Create or load a project, make changes and trigger a manual save.
   - Use the compare view to confirm the history updated.
3. **Autosave cadence**
   - Continue editing for several minutes. Confirm an `auto-backup-*` entry
     appears and log the timestamp.
4. **Forced backup**
   - Switch projects or use **Quick safeguards** to trigger an immediate backup.
   - Verify the new snapshot appears in the selector.
5. **Planner backup export**
   - Run **Settings → Backup & Restore → Backup**. Store the JSON file with a
     checksum and archive it on two media.
6. **Restore rehearsal**
   - Use **Restore rehearsal** to import the latest backup into the sandbox.
   - Confirm autosave history, automatic gear presets and custom gear survive the
     round-trip.
7. **Project share/import**
   - Export a project, clear it from the selector and import the exported bundle.
   - Confirm the project name, gear list and runtime notes match expectations.
8. **Automatic gear presets**
   - Modify a preset, save it, export the preset bundle, clear local data and
     re-import. Ensure the UI reflects the restored preset.
9. **Translation export/import**
   - Export translation bundles if applicable, clear cached locales and re-import
     to confirm parity.
10. **Diagnostics**
    - Run `window.cineRuntime.verifyCriticalFlows()` and record the result.
    - Check the storage guard report for mirrored keys and autosave cadence.
11. **Documentation sync**
    - Review relevant guides to ensure instructions match rehearsed behaviour. Log
      discrepancies in the [Feature Gap Analysis](feature-gap-analysis.md).

## After completion

- Update the [Verification Log](verification-log-template.md) with timestamps and
  evidence.
- Store backups, bundles, translation exports and console logs on two offline
  media.
- File follow-up tasks in [Review Tasks](review-tasks-2025-02-07.md).

Completing this checklist every session prevents regressions and protects user
data.
