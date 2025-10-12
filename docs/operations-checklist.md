# Operations Checklist

Run this checklist whenever you prepare a workstation for daily use or certify a
release. It ensures every safeguard for saving, sharing, importing, backing up
and restoring is operational offline.

## Before starting

- Confirm the service worker is up to date and the refresh prompt has been
  accepted intentionally.
- Verify locally stored Uicons and fonts render correctly.
- Ensure planner backups from the previous session are archived and available.

## Checklist

1. **Load workspace**
   - Open the app, confirm the offline indicator appears and record the build
     hash from settings.
2. **Manual save**
   - Create or load a project, make changes and trigger a manual save.
   - Use the compare view to confirm the change history updated.
3. **Autosave cadence**
   - Continue editing for several minutes. Confirm an `auto-backup-*` entry
     appears and log the timestamp.
4. **Forced backup**
   - Switch projects or use **Quick safeguards** to trigger an immediate backup.
   - Verify the new snapshot appears in the selector.
5. **Planner backup export**
   - Run **Settings → Backup & Restore → Backup**. Store the JSON file with a
     checksum.
6. **Restore rehearsal**
   - Use **Restore rehearsal** to import the latest backup into the sandbox.
   - Confirm autosave history, automatic gear presets and custom gear survive the
     round-trip.
7. **Project share/import**
   - Export a single project, clear it from the selector and import the exported
     bundle.
   - Confirm the project name, gear list and runtime notes match expectations.
8. **Automatic gear presets**
   - Modify a preset, save it, export the preset bundle, clear local data and
     re-import. Ensure the UI reflects the restored preset.
9. **Diagnostics**
   - Run `window.cineRuntime.verifyCriticalFlows()` and record the result.
   - Check the storage guard report for mirrored keys.
10. **Documentation sync**
    - Review relevant guides to ensure instructions match the behaviour just
      rehearsed. Update docs if discrepancies appear.

## After completion

- Update the [Verification Log](verification-log-template.md).
- Store backups, bundles and console logs on two offline media.
- File any follow-up tasks in [Review Tasks](review-tasks-2025-02-07.md).

Completing this checklist every session prevents regressions and protects user
data.
