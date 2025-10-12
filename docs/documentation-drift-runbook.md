# Documentation Drift Runbook

This runbook helps crews prove that every help topic, localized manual and printable guide still matches the
runtime before distributing an offline bundle. Run it alongside the [Documentation, Help & Translation Maintenance Guide](documentation-maintenance.md)
and the [Documentation Update Checklist](documentation-update-checklist.md) whenever behavior changes or as part of the monthly
operations rehearsal. Completing these steps prevents documentation drift that could otherwise jeopardize save, share, import,
backup and restore workflows while crews are offline.

## When to run this drill

- **Before merging a feature or copy change.** Confirm that the written guidance you are about to ship reflects the same
  safeguards the planner enforces so operators never rely on outdated instructions.
- **During monthly offline audits.** Pair this drill with the [Offline Cache & Safeguard Verification Drill](offline-cache-verification-drill.md)
  to prove cached help topics, READMEs and manuals remain synchronized with the runtime and its locally stored Uicons.
- **After translation pushes.** Validate that every locale documents the same save, share, import, backup and restore
  routines before handing the bundle to multilingual crews.
- **Following incident reviews.** When documentation contributes to confusion during an investigation, re-run this drill to
  re-align written guidance with the latest safeguards and archive the evidence in your verification packet.

## Step-by-step workflow

1. **Inventory the surfaces.**
   - Export the coverage snapshot from the [Documentation Coverage Matrix](documentation-coverage-matrix.md) and highlight rows
     touched by your changes.
   - List the help topics, hover help strings, legal pages, localized READMEs and printable manuals that must be refreshed.
   - Note which `cineModules` contracts (`cinePersistence`, `cineUi`, `cineOffline`, `cineRuntime`) the change touches so your
     copy references the same frozen APIs the runtime enforces.
2. **Update and stage copy.**
   - Edit the primary `README.md`, every localized README and in-app help topic to reflect the new workflow, ensuring all
     instructions reiterate how saves, shares, imports, backups and restores protect user data.
   - Synchronize diagrams, screenshots and icon references with the locally stored assets bundled in the repository.
   - Record the touched surfaces in **Settings → General → Documentation update tracker** for release history parity.
3. **Verify translations stay aligned.**
   - Refresh `src/scripts/translations.js` with the new copy and duplicate the English fallback for any strings that still need
     localization so the UI remains legible offline.
   - Switch through every supported language in-app, open the help dialog and load each localized README directly from disk to
     confirm the translated instructions match the updated workflows without pulling remote assets.
4. **Rehearse the workflows offline.**
   - Follow the [Save, Share & Import Drill](../README.md#save-share--import-drill) end-to-end in an isolated browser profile.
   - Capture a manual save, confirm the background auto-backup lands, export `planner-backup.json`, generate a project bundle and
     import both into the rehearsal profile. Confirm the runtime guard (`window.__cineRuntimeIntegrity`) reports success.
   - Run the [Documentation Update Checklist](documentation-update-checklist.md) verification steps to ensure the help dialog,
     Quick Start guide and legal pages render correctly while disconnected.
5. **Archive the evidence.**
   - Update the [Documentation Verification Packet](documentation-verification-packet.md) with console captures, export hashes,
     localized README timestamps and screenshots of the help topics you touched.
   - Store the refreshed planner backup, project bundle, verification logs and documentation packet in at least two offline
     locations per the [Backup Rotation Guide](backup-rotation-guide.md).
   - Add a signed entry to the [Documentation Status Report](documentation-status-report-template.md) noting the drill date,
     operators, browsers and where the redundant documentation bundle now lives.

## Outputs to capture

- Completed checklist with initials and timestamps for each step above.
- Updated coverage matrix snapshot showing which surfaces changed and which verification evidence you archived.
- Console capture of `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` demonstrating that the same safeguards the
  documentation references still guard persistence offline.
- Links (or file paths when stored offline) to the refreshed localized READMEs, printable manuals and help exports.
- Storage locations for the redundant documentation packet so future crews can reproduce the drill without re-downloading assets.

Running this runbook ensures every offline copy of Cine Power Planner ships with documentation that is provably synchronized with
the runtime, preventing stale instructions from threatening user data during save, share, import, backup and restore rehearsals.

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
