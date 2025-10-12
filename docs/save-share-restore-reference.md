# Save, share & restore reference

This reference condenses the workflows crews rehearse to guarantee user data stays safe. Follow it when
training, running drills or responding to incidents.

## Manual saves
1. Open the project list and choose **Save project**. The action uses `cinePersistence.storage.saveProject`
   to write the current state to storage and update the Latest activity board.【F:src/scripts/modules/persistence.js†L1036-L1053】【F:index.html†L2722-L2778】
2. Verify the timestamp in Settings → Data & Storage. If it fails to update, run
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` before continuing.【F:src/scripts/modules/runtime.js†L2216-L2335】

## Autosave & auto-backup cadence
- Every 50 tracked changes or ten minutes triggers an auto-backup. The UI surfaces these snapshots when
  you enable **Show auto backups** in Backup & Restore.【F:src/scripts/app-events.js†L86-L205】【F:index.html†L2501-L2574】
- Promote critical auto-backups to manual saves during incidents to preserve history.

## Planner backups
1. Navigate to Settings → Backup & Restore → **Backup**. The runtime collects projects, automatic gear,
   preferences and diagnostics into a JSON file via `cinePersistence.backups` helpers.【F:src/scripts/modules/persistence.js†L1092-L1100】【F:index.html†L2581-L2614】
2. Store the file with an ISO timestamp on two devices and record details in the verification log.【F:docs/verification-log-template.md†L12-L67】

## Restore rehearsal
1. Select **Restore rehearsal**, choose **Full app backup (.json)** or **Project bundle (.json)** and load the
   file. The sandbox compares live data with the import before prompting to continue.【F:index.html†L2581-L2708】
2. Review differences (automatic gear rules, favorites, projects) and capture screenshots for the
   verification packet.【F:docs/documentation-verification-packet.md†L1-L48】
3. If the rehearsal succeeds, run **Continue rehearsal restore** to complete the test or **Abort rehearsal**
   to leave live data untouched.【F:index.html†L2684-L2708】

## Factory reset & recovery
- Use **Factory reset** only after exporting a planner backup. `cinePersistence.storage.ensureCriticalStorageBackups`
  mirrors keys before clearing data so recovery remains possible.【F:src/scripts/modules/persistence.js†L1081-L1083】【F:src/scripts/storage.js†L2845-L2999】
- After resetting, import the verified backup or project bundle to restore user data.

## Share & import
1. Export a project bundle from the Share dialog (Share → **Export bundle**). The file includes projects,
   gear lists and automatic gear rules for the selected setup.【F:src/scripts/modules/persistence.js†L1036-L1109】
2. To import, choose **Import bundle** or paste a shared setup URL. The runtime sanitises payloads before
   applying them and records activity in the Data & Storage panel.【F:src/scripts/modules/persistence.js†L1105-L1109】【F:index.html†L2722-L2778】

## Incident response highlights
- Always export a manual backup and promote relevant auto-backups before attempting recovery.【F:src/scripts/app-events.js†L86-L205】【F:index.html†L2501-L2574】
- Capture diff logs via Compare versions and attach them to incident notes.【F:index.html†L2501-L2573】
- Update the verification log with actions taken, files captured and locations stored.【F:docs/verification-log-template.md†L12-L67】

Following this reference keeps save, share, import, backup and restore workflows aligned with the runtime
APIs that protect user data offline.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
