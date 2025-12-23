# Data Protection Lifecycle Guide

This guide is the primary entry point for data-safety practices in Cine Power
Planner. It describes the end-to-end lifecycle from manual saves through
promotion, with explicit offline steps and evidence capture. For detailed
interface instructions, schemas and troubleshooting, cross-reference the
[Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md)
and the [Backup Rotation Guide](../backup-rotation-guide.md).

## Lifecycle overview (offline-first)

1. **Manual save** →
2. **Autosave** →
3. **Backup vault** →
4. **Project export** →
5. **Restore rehearsal** →
6. **Promotion**

Every step below assumes offline operation is possible at any time. Use the
[Operations Checklist](../operations-checklist.md) to rehearse the flow on each
workstation before crews depend on it in the field.

## Step-by-step lifecycle

### 1) Manual save

**Offline steps**
- Open the active project and press **Enter**, click **Save**, or use
  `Ctrl+S`/`⌘S`.
- Confirm the timestamped save appears in the project selector.
- If you are already offline, keep working; saves do not require connectivity.

**Evidence to capture**
- Screenshot or log of the selector entry timestamp.
- Exported diff log from **Compare versions** if you need an audit trail.

**Reference**
- Detailed save behaviors and schema notes live in
  [Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md).

### 2) Autosave

**Offline steps**
- Leave the project open while editing. Autosaves trigger after ~50 changes or
  ~10 minutes.
- Confirm an `auto-backup-…` entry appears in the selector without overwriting
  manual saves.
- Stay offline to prove the cadence continues without a network connection.

**Evidence to capture**
- Screenshot of the auto-backup entry or **Latest activity** timeline.
- Timestamp notes in the verification log.

**Reference**
- Autosave cadence and safeguards are detailed in
  [Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md).

### 3) Backup vault

**Offline steps**
- If the browser blocks downloads, open the local backup vault from the banner
  action or **Settings → Backup & Restore**.
- Export the queued backups to a local folder once the vault is available.
- Keep a copy on a second offline medium before moving on.

**Evidence to capture**
- Vault export logs and the queued backup files themselves.
- Notes in the verification log describing why the vault was used.

**Reference**
- Vault behavior and safeguards are detailed in
  [Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md).

### 4) Project export

**Offline steps**
- Export a project bundle for the current project.
- Export a full planner backup (`planner-backup.json`) alongside the bundle.
- Store both files on at least two offline media locations.

**Evidence to capture**
- The exported files plus checksum notes or filenames in the verification log.
- A brief note confirming the export location(s).

**Reference**
- Export formats and fields are documented in
  [Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md).
- Rotation strategy belongs in the [Backup Rotation Guide](../backup-rotation-guide.md).

### 5) Restore rehearsal

**Offline steps**
- On a separate profile or secondary machine, import the planner backup, then
  the project bundle.
- Disconnect from the network and reload `index.html` to confirm offline
  readiness.
- Review the restore compatibility summary before moving data into production.

**Evidence to capture**
- Screenshot of the restore compatibility summary and safety backup filename.
- Console capture of `window.__cineRuntimeIntegrity` or rehearsal notes.

**Reference**
- Restore rehearsal controls and compatibility checks are covered in
  [Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md).

### 6) Promotion

**Offline steps**
- Only promote after the rehearsal profile or secondary machine matches
  expectations.
- Apply the restore in the primary profile, confirming the safety backup is
  captured first.
- Keep the original exports untouched so rollback remains possible.

**Evidence to capture**
- The pre-restore safety backup filename (recorded in the verification log).
- Updated verification log entries noting date, machine, operator and outcome.

**Reference**
- Promotion behavior, backups and rollbacks are described in
  [Save, Share, Import, Backup & Restore Reference](../save-share-restore-reference.md).

## Storage limits & profile risks

- **Browser storage quotas apply.** Large productions can consume significant
  local storage across projects, backups and gear lists. Monitor storage usage
  and export redundant backups regularly.
- **Profiles are single-device vaults.** Clearing site data, deleting browser
  profiles, or using private sessions can erase local projects without warning.
- **Offline caches are local.** Service worker caches and local storage do not
  sync across machines; treat them as separate vaults that require deliberate
  exports.

### Safe path for moving between machines

Use this path whenever you need to move a project or full planner state between
workstations without losing data:

1. Manual save on the source machine.
2. Export a planner backup and the relevant project bundle.
3. Copy the exports to local offline media.
4. Run a restore rehearsal on the destination machine.
5. Only then promote in the destination profile.

This path relies on local backups plus restore rehearsal before promotion. For
rotation policy and retention timing, follow the
[Backup Rotation Guide](../backup-rotation-guide.md).

## Evidence capture checklist

- Save timestamps and `auto-backup-…` entries
- Exported backups and project bundles
- Restore rehearsal screenshots and compatibility summaries
- Verification log entries with machine, date, and operator

For the full evidence packet format, use the
[Verification Log Template](../verification-log-template.md) and the
[Documentation Verification Packet](../documentation-verification-packet.md).
