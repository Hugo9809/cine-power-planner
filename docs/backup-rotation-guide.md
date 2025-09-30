# Backup Rotation & Archive Guide

Cine Power Planner preserves projects, runtime feedback, gear data and automatic gear rules
on-device so crews can keep working without connectivity. This guide explains how to cycle
those exports through redundant storage without losing track of provenance or overwriting a
known-good snapshot. Pair these routines with the [Operational Checklist](operations-checklist.md)
and the [Offline Readiness Runbook](offline-readiness.md) so every workstation ships with
a validated recovery plan.

Every time you overwrite an existing project the planner now captures a timestamped
`auto-backup-…` snapshot of the previous state before committing the new data. These
automatic backups follow the same retention rules described below, ensuring that even
manual saves keep an additional recovery point without requiring operator action.

## 1. Naming conventions that survive handoffs

Adopt a predictable naming scheme before creating your first backup or bundle. Consistent
labels make it obvious which file belongs to which shoot, how old the snapshot is and
whether it was validated in an isolation profile.

| Artifact type | Recommended filename | Notes |
| --- | --- | --- |
| Planner backup | `YYYY-MM-DD_projectName_location_operator_backup.json` | Captured through **Settings → Backup & Restore → Backup**. Includes projects, backups, favorites, runtime feedback and automatic gear rules. |
| Project bundle | `YYYY-MM-DD_projectName_location_operator.cpproject` | Exported via **Share → Export bundle**. Rename the default `project-name.json` to `.cpproject` if your archive tracker expects the extension. |
| Repository snapshot | `YYYY-MM-DD_cpp_releaseTag_machine.zip` | Zip the full repository (including `animated icons 3/`, `src/icons/` and fonts) so the offline environment can be rebuilt without the internet. |
| Verification log | `YYYY-MM-DD_projectName_validation-notes.txt` | Summarize which exports were imported into the offline verification profile, when, and by whom. Store alongside the data it certifies. |

Include the time in 24-hour format when multiple exports land the same day (for example,
`2024-05-18T1930Z_projectName_location_operator_backup.json`). Document time zones explicitly
so remote teams can reconcile incidents correctly.

## 2. Rotation cadence

Keep at least three generations of every artifact across two physical media that travel
separately. A simple pattern looks like this:

1. **Daily working set** – Backups and bundles captured during the current shoot day. Store
   these on the active workstation and a travel-safe duplicate drive. Replace entries only
after the next generation is validated offline.
2. **Weekly consolidation** – At the end of each week, promote the best verified daily
   snapshot to the weekly tier. Label the verification log with the incident number (if
   applicable) so the archive documents why that snapshot matters. Retain at least the last
   four weekly generations.
3. **Project archive** – When the production wraps, collect the final weekly snapshot,
   a copy of the repository zip used on set and a final verification log. Store these on long-
   lived media (for example LTO, optical disc or a guarded NAS) plus a duplicate kept offsite.

Whenever a tier rotates, verify the candidate in an offline profile before the handoff. If an
import fails validation, freeze the rotation, document the issue, capture a fresh backup and
re-test before replacing anything.

## 3. Validation before promotion

Never promote a backup, bundle or repository zip into the next tier without proving it opens
offline. Follow this checklist each time you prepare to rotate media:

1. **Stage the candidate.** Copy the prospective files to a verification machine or private
   browser profile that stays offline. Keep the originals untouched until the drill finishes.
2. **Import planner backup.** Use **Settings → Backup & Restore → Restore rehearsal** to load
the backup into an isolated sandbox. Confirm the rule-by-rule diff matches expectations,
then apply the restore. Inspect the project selector, automatic gear rules, favorites and
runtime dashboard for accuracy.
3. **Import project bundle.** Load the bundle, confirm scenarios, custom devices, runtime
   feedback and timestamped auto backups match the production machine. Run the gear list
   generator to ensure automatic gear rules execute correctly.
4. **Export a diff log.** Back in the primary profile, open **Settings → Backup & Restore →
   Compare versions**, set the candidate manual save as the baseline and the newest auto backup
   as the comparison, review the highlights, add context in **Incident notes** and export the
   JSON. Store the file beside the candidate so the rotation documents what changed since the
   last generation.
5. **Exercise offline UI.** While still offline, open the help dialog, legal pages and device
   catalog so you know locally stored Uicons and typography files are bundled correctly in
   the repository zip.
6. **Log the result.** Update the verification log with the operator name, machine, browser
   version, validation timestamp, files inspected and any anomalies discovered. Store the log
   with the candidate artifacts.

Only after every step succeeds should you overwrite a previous generation or mark the new
snapshot as ready for distribution.

## 4. Storage hygiene on removable media

* **Use checksums.** Generate SHA-256 manifests for every backup, bundle and repository zip.
  Store the manifest next to the files so crews can prove integrity after travel or storage.
* **Prefer write-once workflows.** For long-term archives, rely on write-once media (optical
  disc, LTO WORM cartridges) or lockable drives. Keep an editable copy elsewhere for active
  work so the archive remains pristine.
* **Document custody.** When drives change hands, record who received them, when, and which
  artifacts they contain. Include verification log references to make audits painless.
* **Rotate verification media.** Test each long-term medium at least quarterly. Import its
  latest backup and bundle into a sacrificial offline machine to confirm the storage has not
  degraded.

## 5. Incident snapshots

If you encounter unexpected behavior—autosave delays, missing gear lists or validation
warnings—treat the moment as its own archive tier:

1. **Freeze the scene.** Leave the browser tab open, disconnect from networks and document the
   time plus the offline indicator state. Avoid reloading until data is secure.
2. **Capture emergency exports.** Run **Settings → Backup & Restore → Backup** to produce
   `planner-backup.json`, promote relevant `auto-backup-…` entries to manual saves and export
   the active project bundle. Store everything in an `incident-<ID>` folder on two devices
   immediately.
3. **Validate separately.** Import the incident exports into an offline profile. If they pass,
   keep them quarantined so investigators can review the exact data that triggered the issue.
4. **Capture the comparison.** Diff the affected manual save against the newest auto backup in
   **Settings → Backup & Restore → Compare versions** and export the log. File it with the
   incident folder so future audits can replay the exact changes.
5. **Resume rotation cautiously.** Only after the incident is documented, backups are
   verified and the environment is stable should you merge the recovered data back into the
   standard rotation cadence.

Following this guide ensures every workstation keeps more backups than it needs, every export
is verified in isolation before promotion, and user data remains intact even when crews travel
or hand projects to another team.
