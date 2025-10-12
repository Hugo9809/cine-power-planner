# Backup Rotation & Archive Guide

Cine Power Planner keeps projects, backups, automatic gear rules and runtime feedback on-device so
crews can work without connectivity. Automatic safeguards capture timestamped `auto-backup-…`
snapshots whenever a save crosses either the 50-change threshold or the time-based cadence, and the
backup UI exposes diffing and restore rehearsals so you can validate each snapshot before it joins
the archive.【F:src/scripts/app-events.js†L86-L143】【F:index.html†L2501-L2560】【F:index.html†L2606-L2624】

## Naming conventions that survive handoffs
Use predictable filenames before exporting anything. Consistent labels make it obvious which file
belongs to which shoot, how old the snapshot is and whether it was validated offline.

| Artifact type | Recommended filename | Notes |
| --- | --- | --- |
| Planner backup | `YYYY-MM-DD_project_location_operator_backup.json` | Captured through **Settings → Backup &amp; Restore → Backup**; includes projects, backups, favorites, runtime feedback and automatic gear rules.【F:index.html†L2501-L2560】【F:src/scripts/modules/persistence.js†L1036-L1100】 |
| Project bundle | `YYYY-MM-DD_project_location_operator.cpproject` | Exported via **Share → Export bundle** so crews can validate setups in isolation without touching production data.【F:src/scripts/modules/persistence.js†L1036-L1100】 |
| Repository snapshot | `YYYY-MM-DD_cpp_releaseTag_machine.zip` | Zip the full repository (including icons and fonts) to rebuild the offline environment without internet access.【F:service-worker.js†L1-L118】 |
| Verification log | `YYYY-MM-DD_project_validation-notes.txt` | Record which exports were inspected offline, by whom and when so audits can replay the validation run.【F:docs/verification-log-template.md†L12-L67】 |

Add timestamps (for example `2025-02-07T1930Z`) when multiple exports land the same day and document
time zones explicitly so remote crews can reconcile incidents accurately.

## Rotation cadence
Keep at least three generations of every artifact across two physical media that travel separately.
A practical pattern is:

1. **Daily working set.** Capture planner backups and project bundles after major edits. Store them
   on the active workstation and a travel-safe duplicate drive. Replace entries only after the next
   generation is validated offline.【F:src/scripts/app-core-new-2.js†L6641-L6724】
2. **Weekly consolidation.** Promote the best verified daily snapshot to the weekly tier. Label the
   verification log with the associated incident or week number so future audits can trace why the
   snapshot matters.【F:docs/verification-log-template.md†L12-L67】
3. **Project archive.** When the production wraps, collect the final weekly snapshot, a copy of the
   repository zip and the latest verification log. Store these on long-lived media (for example LTO or
   optical) plus a duplicate kept offsite.

Whenever a tier rotates, rehearse the candidate in an offline profile before the handoff. If an
import fails validation, freeze the rotation, capture a fresh backup and retry before replacing any
previous generation.【F:index.html†L2606-L2624】

## Validation before promotion
Never promote a backup, bundle or repository zip without proving it opens offline:

1. **Stage the candidate.** Copy the files to a verification machine or private browser profile that
   stays offline until testing completes.
2. **Restore in rehearsal mode.** Use **Settings → Backup &amp; Restore → Restore rehearsal** to load the
   backup into the sandbox, review the diff summary and apply the restore. Inspect projects, automatic
   gear rules, favorites and runtime dashboards for accuracy.【F:index.html†L2501-L2560】【F:index.html†L2606-L2624】
3. **Exercise the bundle.** Import the project bundle and run the gear generator to confirm
   automatic rules still execute correctly while offline.【F:src/scripts/modules/persistence.js†L1036-L1100】
4. **Export a diff log.** Back in the primary profile, open **Compare versions**, select the candidate
   manual save and the newest auto backup, review highlights, add incident notes and export the JSON so
   the rotation documents what changed since the last generation.【F:index.html†L2501-L2560】
5. **Check offline assets.** Open the help dialog, legal pages and device catalog so you know locally
   stored Uicons, fonts and documentation render correctly from disk.【F:index.html†L1-L120】【F:service-worker.js†L1-L118】
6. **Update the verification log.** Record the operator, browser, validation timestamp, filenames and
   anomalies so anyone replaying the archive can trust the chain-of-custody.【F:docs/verification-log-template.md†L12-L67】

Promote the candidate only after every step succeeds.

## Storage hygiene on removable media
- **Generate checksums.** Produce SHA-256 manifests for every backup, bundle and repository zip so
  crews can verify integrity after travel or long-term storage.
- **Prefer write-once workflows.** Use write-once media (optical, WORM cartridges) or locked drives
  for archives and keep an editable copy elsewhere for active work.
- **Document custody.** When drives change hands, log who received them, when, and which artifacts are
  included. Reference the relevant verification log entries for quick audits.【F:docs/verification-log-template.md†L12-L67】
- **Rotate verification media.** At least quarterly, import the latest archived backup into an
  isolated offline machine to confirm the medium is still readable.【F:index.html†L2606-L2624】

## Incident snapshots
Unexpected behaviour—autosave delays, missing gear lists, validation warnings—deserves its own
protected archive tier:

1. **Freeze the scene.** Leave the planner open, disconnect from networks and note the offline
   indicator state while you prepare exports.【F:index.html†L1-L120】
2. **Capture emergency exports.** Use **Backup** and promote relevant `auto-backup-…` entries to
   manual saves, then export the active project bundle. Store everything in an `incident-<ID>` folder
   on two devices immediately.【F:index.html†L2501-L2560】【F:src/scripts/app-events.js†L86-L143】
3. **Validate separately.** Import the incident exports into an offline profile. If they pass, keep
   them quarantined so investigators can review the data that triggered the issue.【F:index.html†L2606-L2624】
4. **Capture the comparison.** Diff the affected manual save against the newest auto backup in the
   **Compare versions** tool and export the log for the incident folder.【F:index.html†L2501-L2560】
5. **Resume rotation cautiously.** Only after the incident is documented, backups are verified and the
   environment is stable should you merge recovered data back into the standard rotation.

Following this guide ensures every workstation keeps redundant backups, every export is validated in
isolation and user data remains intact even when crews travel or hand projects to another team.
