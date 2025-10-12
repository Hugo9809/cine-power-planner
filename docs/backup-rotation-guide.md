# Backup rotation and archive strategy

Cine Power Planner captures manual saves, autosave snapshots and full backups locally so crews can
defend user data even when travelling offline. This guide explains how to label exports, rehearse
restores and rotate media without losing history.

## Capture naming
| Artifact | Recommended label | Source |
| --- | --- | --- |
| Planner backup | `YYYY-MM-DD_project_location_operator_backup.json` | Settings → Backup & Restore → **Backup** (captures projects, favorites, automatic gear and diagnostics).【F:index.html†L2501-L2614】【F:src/scripts/modules/persistence.js†L1036-L1109】 |
| Project bundle | `YYYY-MM-DD_project_location_operator.cpproject` | Share → **Export bundle**, used to validate setups in isolation and share with other offline profiles.【F:src/scripts/modules/persistence.js†L1036-L1109】 |
| Verification log | `YYYY-MM-DD_project_rotation-notes.txt` | Records rehearsal steps, operator, browser, timestamps and storage locations for audits.【F:docs/verification-log-template.md†L12-L67】 |
| Repository snapshot | `YYYY-MM-DD_cpp_releaseTag_machine.zip` | Zip the working tree (icons, fonts, docs, service worker) so another workstation can boot the same offline build.【F:service-worker.js†L1-L147】 |

Use ISO timestamps when capturing multiple exports per day and note time zones in verification logs so
remote crews can replay incidents precisely.

## Rotation cadence
1. **Daily tier.** Capture planner backups and project bundles after major edits. Keep one copy on the
   active workstation and one on removable media. Replace entries only after the next day’s rehearsal
   succeeds.【F:src/scripts/app-events.js†L86-L205】
2. **Weekly tier.** Promote the best daily snapshot each week. Annotate the verification log with the
   relevant incident ID or shoot name for traceability.【F:docs/verification-log-template.md†L12-L67】
3. **Project archive.** When the production wraps, gather the last weekly snapshot, current repository
   zip and verification log. Store them on two separate media (for example, LTO plus encrypted SSD).

Always validate the candidate on an offline profile before retiring previous generations.

## Validation rehearsal
1. **Stage offline.** Copy the candidate backup and bundle to a verification profile or secondary
   machine kept offline until testing completes.
2. **Restore in sandbox.** Open Settings → Backup & Restore → **Restore rehearsal**, load the file and
   inspect the diff summary before applying. Confirm projects, automatic gear rules, favorites and
   dashboards survive the round-trip.【F:index.html†L2581-L2708】
3. **Compare history.** Back in the primary profile, open **Compare versions**, diff the manual save
   against the latest auto-backup and export the JSON log so reviewers see what changed.【F:index.html†L2501-L2573】
4. **Check assets.** Force reload, open help topics and legal pages to confirm icons, fonts and docs are
   served from local caches.【F:index.html†L1-L120】【F:service-worker.js†L192-L240】
5. **Log results.** Record filenames, timestamps, validation notes and storage locations in the
   verification log before promoting the snapshot.【F:docs/verification-log-template.md†L12-L67】

## Storage hygiene for removable media
- Generate SHA-256 manifests for every artifact so crews can confirm integrity after travel.
- Prefer write-once or locked media for archives and keep a working copy for ongoing edits.
- Document custody transfers (who, when, which files) and reference verification log entries for quick
  audits.【F:docs/verification-log-template.md†L12-L67】
- Quarterly, import the most recent archive into an isolated offline machine to confirm the media still
  reads correctly.【F:index.html†L2581-L2708】

## Incident response snapshots
1. Pause editing, disconnect the workstation and note the offline indicator while preparing exports.【F:index.html†L1-L120】
2. Capture a manual backup, promote relevant `auto-backup-…` entries to manual saves and export the
   active project bundle. Store two copies immediately.【F:index.html†L2501-L2573】【F:src/scripts/app-events.js†L86-L205】
3. Restore the exports in a rehearsal sandbox on a separate profile to confirm integrity before
   continuing recovery.【F:index.html†L2581-L2708】
4. Diff the affected manual save against the newest auto-backup and archive the JSON log with the
   incident notes.【F:index.html†L2501-L2573】

## Monitoring rotation health
- Data & Storage shows latest project save, auto-backup and full-backup timestamps along with storage
  reminders so operators can confirm redundancy before travelling.【F:index.html†L2722-L2778】【F:src/scripts/app-core-new-2.js†L9602-L9680】
- The critical storage guard mirrors planner keys, compresses data under quota pressure and logs
  mirrored entries to the console, providing immediate feedback for rotation audits.【F:src/scripts/storage.js†L2845-L3001】
- Autosave cadence enforces a 50-change threshold and ten-minute interval, ensuring daily tiers capture
  enough history without manual intervention.【F:src/scripts/app-events.js†L86-L205】

Following this process keeps every export validated, every rotation traceable and every archive ready
for offline recovery.
