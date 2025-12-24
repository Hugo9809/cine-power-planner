# Save, Share, Import, Backup & Restore Reference

This reference details every safeguard that protects user data across save,
autosave, share, import, backup and restore workflows. Use it alongside the
[Operations Checklist](operations-checklist.md) when training crews or auditing
workstations.

## Save & autosave

- **Manual save trigger:** Press **Save**, **Enter** on focused inputs once
  composition is finalized (the IME guard blocks mid-composition commits),
  `Ctrl+S` / `⌘S`, or use **Command Palette** (`Cmd+K` / `Ctrl+K`). `app-session.js` dispatches a structured save event which
  `modules/persistence.js` clones and persists.
- **Critical storage guard:** During application initialization,
  `ensureCriticalStorageBackups()` mirrors critical keys (projects, gear rules,
  rehearsal preferences and guardian state) to a safeguarded namespace before
  any autosave or backup work executes. The guard runs before the first
  autosave cycle and again whenever the runtime detects missing mirrors, so
  the autosave ledger always references a valid snapshot. Cross-reference
  `getLastCriticalStorageGuardResult()` when compiling verification packets to
  document the guard run and the mirrored keys.
- **Autosave cadence:** Fires after ~50 changes or 10 minutes of inactivity.
  Each run logs to the autosave ledger accessible from **Settings → Data & Storage → Latest activity**, where the **Latest activity** timeline lists timestamps for manual saves, autosaves and guardian events alongside the latest guard evidence.
- **Redundant mirrors:** `storage.js` keeps timestamped mirrors so reverting to a
  previous autosave never touches live data directly.
- **Latency retention for monitors/viewfinders:** The device editor now preserves
  manually entered latency values even when crews toggle **Wireless TX** off.
  Clearing the latency field is the explicit action that removes the stored
  number, preventing accidental data loss during wireless configuration audits.

### Backup guardian row

- **Status vocabulary:** The **Settings → Data & Storage → Storage summary →
  Backup guardian** row renders every guard result so crews can cite the exact
  runtime evidence during audits. `app-core-new-2.js` loads
  `readCriticalStorageGuardResult()` and swaps the row’s value to match the
  guard output, so you will see the precise strings emitted by the runtime:
  - `Mirrored {count} key(s) this session` confirms how many critical keys were
    redundantly stored during the most recent run.
  - `Waiting for first save` appears when the guard has not yet seen a manual
    save to mirror, signalling that you must capture a first save before
    disconnecting.
  - `{count} issue(s) — check console` surfaces when the guard logged read or
    write errors; halt work, open the diagnostics log and console, and capture
    the error stack traces.
  - `Active` (or the translated fallback) displays when no mirrored keys or
    errors were reported during the current session but the guard remains ready
    to run again.
  Each string maps directly to the guard result branches inside
  `src/scripts/app-core-new-2.js`, ensuring the doc mirrors the UI text exactly
  for traceability.【F:src/scripts/app-core-new-2.js†L9233-L9313】
- **Triggering another guard run:** When the Backup guardian row shows any
  warning or stale timestamp, use the row’s inline **Run guardian again** action
  to execute `ensureCriticalStorageBackups()` from the same panel. Once the
  guard completes, the storage summary refreshes, re-reading the guard result so
  the updated status and mirrored-key count are available without leaving the
  dashboard.【F:src/scripts/app-core-new-2.js†L9233-L9313】
- **Verification steps (matches the in-app help overlay):**
  1. Open **Settings → Data & Storage** before going offline so you can inspect
     every cached dataset while the dashboard continues to operate without a
     network connection.
  2. Review the **Storage summary** rows—especially **Backup guardian**—and
     investigate any warning strings immediately so redundant copies stay intact.
  3. Check **Latest activity** for the corresponding guard timestamp and follow
     any reminder banner instructing you to capture fresh saves, autosaves or
     backups.
  4. Archive the evidence: capture the refreshed guardian status, autosave
     ledger entry and any guard rerun output before closing the panel. These
     steps align exactly with the contextual help instructions surfaced inside
     `index.html`, keeping the reference synced with the UI cues crews rely on
     during rehearsals.【F:index.html†L4554-L4609】

## Backup

- **Planner backup:** **Settings → Backup & Restore → Backup** exports
  `planner-backup.json`, capturing all projects, favorites, contacts, own gear,
  automatic gear rules and preferences. The dedicated
  `src/scripts/own-gear/store.js` module normalises and persists the personal
  gear list before each export so restored payloads remain lossless even when
  teams work offline for extended periods.
- **Checksum discipline:** Generate SHA-256 hashes for each backup and store them
  with physical copies.
- **Archive storage:** Keep at least two copies (primary + offsite). Log
  locations in `review-findings.md` and the verification packet manifest.
- **Local backup vault:** Automatic hourly exports now queue into the local
  vault when the browser blocks downloads (for example, before the first user
  gesture). Crews will see an actionable banner pointing to the vault and can
  open it anytime from the banner action to download or copy each JSON payload
  while offline. The banner also warns when the vault is running on emergency
  fallback storage so teams know to export queued files immediately. Queued
  payloads mirror into safe local storage when IndexedDB is unavailable, so
  entries survive reloads even on restricted devices. Document queued exports
  in the verification packet and clear the vault once each file is archived.
- **Guard verification artifacts:** Attach the most recent
  `getLastCriticalStorageGuardResult()` dump and corresponding autosave ledger
  entry to the backup record so auditors can confirm the mirrored keys existed
  before the export.

## File Formats & Integrity Checks

### Planner backup and project bundle naming conventions

- **Planner backup baseline:** Keep the exported filename prefix
  `planner-backup` intact. When archiving multiple copies, append a readable
  suffix such as `planner-backup__YYYY-MM-DD__workstation.json` so the origin,
  date and media are obvious during offline audits.
- **Project bundle baseline:** Preserve the project name in the export filename
  (for example `project-name.json`). When needed, append a date or station tag
  such as `project-name__YYYY-MM-DD__bundle.json` or rename the file to
  `.cpproject`—the importer treats `.json` and `.cpproject` identically.
- **Rule exports:** Keep `auto-gear-rules-*.json` intact and align the suffix to
  the backup or bundle it travels with (e.g., the same date or workstation tag)
  so offline logs can reconcile every file set.

### Required sections and compatibility notes

- **Planner backups must be complete.** A healthy backup includes the full
  planner payload (projects plus global collections such as favorites, contacts,
  own gear, automatic gear rules and preferences). If any collection is missing,
  stop transport, re-export the backup and rerun a restore rehearsal before
  sharing.
- **Project bundles must include metadata and referenced assets.** Each bundle
  should contain the project data plus the export metadata surfaced in the
  import dialog (timestamp, generator/version and inclusion flags), along with
  any referenced custom devices or automatic gear rules. If the import dialog
  reports missing sections or version incompatibility, capture the warning and
  re-export from the source build.
- **Compatibility summary is the gate.** Always review the restore
  compatibility summary before promotion. Missing sections or version warnings
  mean the file must be regenerated on the source workstation before it is
  cleared for transport.

### Offline checksum logging workflow

1. **Generate hashes locally.** Use a terminal on the offline workstation to
   compute SHA-256 checksums (for example `sha256sum filename.json` or
   `shasum -a 256 filename.json`). Keep the terminal output visible while you
   fill the verification log.
2. **Log every file.** Record the exact filename, checksum, workstation name
   and export timestamp in the verification log before copying files to media.
3. **Copy, then re-verify.** After copying to external media, re-run the hash
   on the copy and confirm it matches the logged checksum without reconnecting
   to a network.
4. **Store the checksum log with the media.** Save or print the verification
   log and store it in the same pouch or case as the transport media so it
   travels offline with the backup or bundle.

### Pre-transport validation checklist

- Run **Restore rehearsal** with the backup or bundle and confirm the sandbox
  data matches the source project before promotion.
- Capture the **Backup guardian** status and autosave ledger entry that match
  the export timestamp.
- Generate and log the SHA-256 checksum for each file, then verify the copied
  media checksum matches the log.
- Record the restore rehearsal notes, diff screenshots and compatibility
  summary in the verification packet.
- Store at least two offline copies (primary + offsite) before transport.

## Share & import

- **Project export:** From the selector or **Command Palette**, choose **Export Project**. The bundle
  includes project data, crew contacts (with phone, email, website, notes and
  avatars), referenced custom devices, runtime estimates and (if selected)
  automatic gear rules. Favorites and other global data remain local—ship a full
  planner backup alongside the bundle when those must travel.
- **Contacts modules:** `src/scripts/contacts/profile.js` and
  `src/scripts/contacts/list.js` now feed the export, import and backup flows so
  user profile data, avatar crops and vCard merges stay lossless even when teams
  work completely offline. The loader now preloads both modules before
  `app-core-new-1.js` initialises and the service worker keeps caching the files
  for offline restores, ensuring contacts tooling never falls back to the limited
  controller.【F:src/scripts/loader.js†L3810-L3854】【F:service-worker-assets.js†L250-L270】
  Touch both modules whenever the share, backup or import workflows
  evolve to keep the offline contract intact.【F:src/scripts/contacts/profile.js†L1-L229】【F:src/scripts/contacts/list.js†L1-L123】
- **Share workflow:** Copy the bundle to the receiving workstation via physical
  media. No network transfer is required.
- **Import path:** Use **Settings → Backup & Restore → Restore rehearsal** to
  load bundles into the sandbox before promoting.
- **Diff review:** The restore sandbox displays differences; capture screenshots
  and attach them to the verification log.
- **Device database imports:** Every import attempt now emits telemetry through
  the `events` logger before any console output or user alert fires. Validation
  failures log a `warn` entry, auto-backup fallbacks log a `warn` entry tagged
  with the failing error metadata, and JSON parse problems emit an `error`
  entry. Each payload includes the file name, sanitized error details, and the
  device counts detected, so the data protection and observability teams can
  reconcile logs without inspecting raw user data.
- **Import verification drill:** During release rehearsals load an intentionally
  malformed device export and confirm the telemetry pipeline recorded the
  `Device import validation failed` warn event before the UI alert appears. Next
  simulate an auto-backup failure (e.g. disable the quota bucket in the staging
  profile) and confirm the `Auto backup before device import failed` warn entry
  precedes the console warning while the import still succeeds. Finally, run a
  corrupted JSON file and check that the `Failed to import device data` error
  event logs before the catch block surfaces the alert. Record the event IDs in
  the verification packet alongside the usual UI screenshots.

## Restore

- **Sandbox first:** All imports land in the sandbox. Operators must explicitly
  promote data to avoid overwriting live projects.
- **Factory reset safeguard:** Resetting automatic gear rules downloads the
  current preset library before any defaults are restored. Keep the file with
  other verification artifacts.
- **Promotion safety:** Before promotion the runtime clones current live data to
  a timestamped backup slot. Reverting is always possible.
- **Compatibility summary:** Each restore runs `verifyRestoredBackupIntegrity()`
  to compare the incoming payload to the current data schema. If modern data
  sections are missing, the restore alert includes a missing-section summary and
  the safety backup filename created before import. Capture the alert text and
  store it with the verification packet before promoting data.
- **Verification:** After promotion, confirm autosave ledger logs the restore and
  manual save to cement the state.

## Failure recovery

| Scenario | Response |
| --- | --- |
| Autosave missing | Load the latest planner backup, restore via sandbox, then check timestamped mirrors for newer data. |
| Bundle corrupt | Use checksum log to identify mismatch, fetch redundant copy from offsite media. |
| Restore mismatch | Compare schema using `modules/helpers/schema/`; update docs and contact engineering before retrying. |
| Service worker stale | Run cache reset via the toolbar’s 🔄 **Force reload** button (also linked from the help dialog), reload offline and repeat restore. |
| Critical storage guard uncertainty | Confirm the latest guard run succeeded: review the structured `storage` logger (mirrored to the console as `Critical storage guard mirrored backup copies`) and **Settings → Data & Storage → Backup guardian** for a green "Mirrored" status with the same timestamp. Capture the `getLastCriticalStorageGuardResult()` output and autosave ledger entry for the verification packet. If errors appear, halt promotions, re-run the guard from the guardian row, collect error stack traces, and escalate to engineering with the captured evidence. |

## Documentation alignment

- Update this reference whenever persistence logic, UI labels or rehearsal
  behaviour changes.
- Sync instructions with README translations and help topics.
- Store the updated doc in the verification packet alongside the evidence listed
  above.
