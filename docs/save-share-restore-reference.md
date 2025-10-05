# Save, Share, Import, Backup & Restore Reference

This reference condenses the critical workflows that protect user data in Cine Power Planner. Use it alongside the [Operational Checklist](operations-checklist.md) and the [Offline Readiness Runbook](offline-readiness.md) whenever you need to confirm the app still saves, shares, imports, backs up and restores entirely offline.

The application exposes these routines through the frozen `cinePersistence` gateway, which mirrors the storage, backup, restore and share helpers defined in code so browsers cannot mutate them accidentally.【F:src/scripts/modules/persistence.js†L90-L171】 A runtime guard records the most recent verification result on `window.__cineRuntimeIntegrity`, and the guard can be re-run manually through `window.cineRuntime.verifyCriticalFlows()` if you need a fresh report while auditing documentation or drills. The inspection now explicitly confirms that runtime feedback storage wrappers and bindings are present alongside the existing save/share/restore safeguards, and it additionally checks the auto-gear seed flag along with storage guard utilities so cache purges, retention defaults and persistent storage requests remain reachable.【F:src/scripts/script.js†L93-L184】【F:tests/dom/runtimeIntegration.test.js†L58-L87】【F:src/scripts/modules/runtime.js†L16-L80】

A dedicated storage guardian runs on every launch to mirror each critical key into its backup slot before the UI touches data, ensuring that even legacy entries have a redundant copy ready before rehearsals or imports begin.【F:src/scripts/storage.js†L247-L376】【F:src/scripts/app-session.js†L10017-L10024】 The latest guard report is exposed globally so you can confirm the mirroring state from diagnostics panels.【F:src/scripts/storage.js†L347-L358】【F:src/scripts/app-core-new-2.js†L6266-L6349】

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
| Version comparison audit | **Settings → Backup & Restore → Compare versions** | Diff summary matches expected edits and nothing unexpected appears in the detailed list | Exported JSON log stored with backups plus verification note referencing the compared versions |

Applying a shared setup removes only the `shared` query flag from the URL, preserving any other query parameters or hash fragments so language overrides and anchored navigation stay intact after import.【F:src/scripts/app-session.js†L2375-L2453】

Version comparisons create a documented paper trail before archives rotate. Launch **Settings → Backup & Restore → Compare versions**, pick a baseline manual save plus the latest auto backup, confirm the summary mirrors your expectations, review each list entry for unexpected additions or removals, then record context in **Incident notes** before exporting the log. Store the JSON alongside your backups and reference the filename in your verification ledger so future audits can replay the diff offline.【F:index.html†L3684-L3754】【F:src/scripts/translations.js†L620-L657】

## Console & script checks

Run these quick inspections while documenting or rehearsing the workflows above:

1. `window.__cineRuntimeIntegrity` – confirms the latest integrity report and highlights any missing persistence, offline or UI safeguards, including runtime feedback storage coverage.【F:src/scripts/script.js†L121-L184】【F:src/scripts/modules/runtime.js†L16-L69】
2. `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` – refreshes the guard and surfaces which modules or functions failed validation, matching the expectations enforced by the integration suite and catching missing feedback persistence immediately.【F:tests/dom/runtimeIntegration.test.js†L58-L87】【F:tests/unit/runtimeModule.test.js†L402-L460】
3. `window.cinePersistence.__internal.inspectAllBindings()` – snapshots every persistence wrapper, confirming autosave, backup, restore and share helpers all resolve to concrete implementations before you rehearse critical flows.【F:src/scripts/modules/persistence.js†L239-L406】【F:src/scripts/modules/runtime.js†L300-L390】
4. `window.cinePersistence.storage.exportAllData()` – returns the same payload used for planner backups so you can sanity-check file size, project counts and timestamps without triggering a download.【F:src/scripts/modules/persistence.js†L90-L145】
5. `window.cinePersistence.share.decodeSharedSetup(payload)` – validates bundle text before you import it into production data. Pair it with `window.cinePersistence.share.applySharedSetup()` inside a disposable profile to confirm recovery paths stay healthy.【F:src/scripts/modules/persistence.js†L152-L157】
6. `typeof window.getMountVoltagePreferencesClone === 'function'` – confirms the runtime re-exposed the mount voltage clone helper that share/import flows depend on so every backup retains the latest mount voltage overrides.【F:src/scripts/app-core-new-1.js†L1398-L1419】【F:src/scripts/app-session.js†L11753-L11783】

The Help Center’s console verification callout mirrors these commands so crews have the checklist available directly inside the offline dialog alongside export and rehearsal guidance.【F:index.html†L3899-L3920】

Record the outputs (or screenshots) in your verification log, and store them alongside the exported files so any teammate can confirm the same safeguards were present.

## When to run this checklist

- **New workstation provisioning.** After cloning the repository, run every workflow in the matrix while offline to prove the local cache, locally stored Uicons and persistence helpers all loaded correctly.
- **Pre-travel checks.** Before leaving a controlled environment, repeat the matrix to ensure the latest backups, bundles and share links travel with you and that the runtime guard still reports a clean bill of health.
- **Post-update verification.** When documentation or translations change, run the matrix to confirm instructions still match the UI. Update help entries and localized READMEs if labels or button names shifted.
- **Incident investigations.** If autosaves pause or imports warn about mismatches, perform each workflow in an isolated profile, export fresh backups, and attach the recorded outputs to your incident log before applying a restore.

Keeping this reference near the workstation ensures crews rehearse the exact same offline workflows the application enforces in code, preserving user data at every step.
