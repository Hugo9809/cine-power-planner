# Save, Share, Import, Backup & Restore Reference

This reference condenses the critical workflows that protect user data in Cine Power Planner. Use it alongside the [Operational Checklist](operations-checklist.md) and the [Offline Readiness Runbook](offline-readiness.md) whenever you need to confirm the app still saves, shares, imports, backs up and restores entirely offline.

The application exposes these routines through the frozen `cinePersistence` gateway, which mirrors the storage, backup, restore and share helpers defined in code so browsers cannot mutate them accidentally.【F:src/scripts/modules/persistence.js†L90-L159】 A runtime guard records the most recent verification result on `window.__cineRuntimeIntegrity`, and the guard can be re-run manually through `window.cineRuntime.verifyCriticalFlows()` if you need a fresh report while auditing documentation or drills.【F:src/scripts/script.js†L93-L184】【F:tests/dom/runtimeIntegration.test.js†L58-L87】

## Workflow matrix

| Workflow | Primary controls (UI/Keyboard) | What success looks like | Evidence to capture |
| --- | --- | --- | --- |
| Manual save | Project header → **Save** or `Enter` / `Ctrl+S` / `⌘S` | Project appears in selector with updated timestamp, `auto-backup-…` snapshot joins within 10 minutes | Screenshot or timestamp log of selector, note `window.__cineRuntimeIntegrity.ok === true` |
| Autosave confirmation | Stay on project for 10 minutes, watch selector or **Settings → Backup & Restore** overlay | New `auto-backup-…` entry listed, overlay reports latest autosave time | Capture overlay text, promote entry to manual save if needed |
| Planner backup export | **Settings → Backup & Restore → Backup** | Browser downloads `planner-backup.json` (or opens Manual download tab if blocked) | File stored on redundant media, checksum recorded, runtime guard check logged |
| Project bundle export | **Share → Export project bundle** (rename to `.cpproject` if required) | Download includes project data, favorites and custom devices | File stored twice, verification note referencing isolation import |
| Restore rehearsal | **Settings → Backup & Restore → Restore rehearsal** → load chosen backup | Sandbox diff shows expected changes, proceed restores data without touching live profile | Console log of rehearsal result, note pre-restore snapshot filename |
| Full restore | **Settings → Backup & Restore → Restore** after rehearsal succeeds | App reloads with restored data, pre-restore snapshot stored automatically | Archive restored backup, pre-restore snapshot ID and post-restore verification notes |
| Share link/application | **Share → Copy share link** or **Share → Apply shared setup** | Import prompt validates payload, offers rollback on mismatch | Note validation message, keep copy of imported payload for incident review |

## Console & script checks

Run these quick inspections while documenting or rehearsing the workflows above:

1. `window.__cineRuntimeIntegrity` – confirms the latest integrity report and highlights any missing persistence, offline or UI safeguards.【F:src/scripts/script.js†L121-L184】
2. `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` – refreshes the guard and surfaces which modules or functions failed validation, matching the expectations enforced by the integration suite.【F:tests/dom/runtimeIntegration.test.js†L58-L87】
3. `window.cinePersistence.storage.exportAllData()` – returns the same payload used for planner backups so you can sanity-check file size, project counts and timestamps without triggering a download.【F:src/scripts/modules/persistence.js†L90-L145】
4. `window.cinePersistence.share.decodeSharedSetup(payload)` – validates bundle text before you import it into production data. Pair it with `window.cinePersistence.share.applySharedSetup()` inside a disposable profile to confirm recovery paths stay healthy.【F:src/scripts/modules/persistence.js†L152-L157】

Record the outputs (or screenshots) in your verification log, and store them alongside the exported files so any teammate can confirm the same safeguards were present.

## When to run this checklist

- **New workstation provisioning.** After cloning the repository, run every workflow in the matrix while offline to prove the local cache, locally stored Uicons and persistence helpers all loaded correctly.
- **Pre-travel checks.** Before leaving a controlled environment, repeat the matrix to ensure the latest backups, bundles and share links travel with you and that the runtime guard still reports a clean bill of health.
- **Post-update verification.** When documentation or translations change, run the matrix to confirm instructions still match the UI. Update help entries and localized READMEs if labels or button names shifted.
- **Incident investigations.** If autosaves pause or imports warn about mismatches, perform each workflow in an isolated profile, export fresh backups, and attach the recorded outputs to your incident log before applying a restore.

Keeping this reference near the workstation ensures crews rehearse the exact same offline workflows the application enforces in code, preserving user data at every step.
