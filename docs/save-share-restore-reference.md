# Save, Share, Import, Backup & Restore Reference

This reference details every safeguard that protects user data across save,
autosave, share, import, backup and restore workflows. Use it alongside the
[Operations Checklist](operations-checklist.md) when training crews or auditing
workstations.

## Save & autosave

- **Manual save trigger:** Press **Save**, **Enter** on focused inputs, or
  `Ctrl+S` / `⌘S`. `app-session.js` dispatches a structured save event which
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

### Durable vault fallback

- **Automatic downgrade:** If the browser throws on `localStorage`,
  `downgradeSafeLocalStorageToMemory()` now prefers the IndexedDB-based durable
  vault. The captured snapshot is copied into the vault before any session data
  is mutated.
- **Emergency snapshot:** Every downgrade writes a JSON payload to
  `__cineDurableEmergencyBackup__<ISO timestamp>` so the crew has a frozen copy
  of the last known-good state even if further writes fail.
- **Blocking alert:** The UI displays the new “alertDurableFallback” message and
  blocks interaction until operators acknowledge the prompt. Export the freshly
  created emergency backup immediately and log the download alongside the usual
  verification artifacts.
- **Rolling history:** The vault retains the five newest emergency entries.
  Archive exported files to redundant media so pruning never deletes the only
  redundant copy.

## Backup

- **Planner backup:** **Settings → Backup & Restore → Backup** exports
  `planner-backup.json`, capturing all projects, favorites, contacts, own gear,
  automatic gear rules and preferences.
- **Checksum discipline:** Generate SHA-256 hashes for each backup and store them
  with physical copies.
- **Archive storage:** Keep at least two copies (primary + offsite). Log
  locations in `review-findings.md` and the verification packet manifest.
- **Guard verification artifacts:** Attach the most recent
  `getLastCriticalStorageGuardResult()` dump and corresponding autosave ledger
  entry to the backup record so auditors can confirm the mirrored keys existed
  before the export.

## Share & import

- **Project export:** From the selector, choose **Export Project**. The bundle
  includes project data, crew contacts (with phone, email, website, notes and
  avatars), referenced custom devices, runtime estimates and (if selected)
  automatic gear rules. Favorites and other global data remain local—ship a full
  planner backup alongside the bundle when those must travel.
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
