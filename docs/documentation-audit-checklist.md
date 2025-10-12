# Documentation audit checklist

Run this audit whenever a release is prepared, a persistence workflow changes or a translation batch
lands. The goal is to prove the written guides, in-app help and offline rehearsal packets still match
the shipped runtime so crews cannot lose user data.

## Preparation
- Collect the latest verification log, planner backup and project bundle for the current release so you
  can compare UI labels against previously rehearsed exports.【F:docs/verification-log-template.md†L12-L67】【F:index.html†L2501-L2573】
- Prime the app offline: open the planner from disk, load the help dialog, visit legal pages and confirm
  icons/fonts render from cache before starting the audit.【F:index.html†L1-L120】【F:service-worker.js†L192-L240】
- Print or open the coverage matrix so you know which documentation surfaces cover each workflow.【F:docs/documentation-coverage-matrix.md†L1-L56】

## Step 1 – Written guidance
1. Review the English README sections describing saves, backups, restore rehearsal and offline drills.
   Confirm terminology, button labels and sequence match the current UI. Note any drift for immediate
   correction.【F:index.html†L2501-L2708】
2. Spot-check each localized README or printable guide against the same workflows. If a locale is
   outdated, temporarily copy the English text so offline crews never read stale instructions. Record the
   gap in the verification log for translation follow-up.【F:docs/translation-guide.md†L1-L134】
3. Update the documentation maintenance tracker with the audit date, reviewer, browsers used and any
   required follow-up so future audits see the chain of custody.【F:docs/documentation-maintenance.md†L1-L140】

## Step 2 – In-app help and controls
1. Open **Settings → Backup & Restore** and confirm Compare versions, Restore rehearsal and Backup actions
   appear exactly where documentation states. Capture screenshots for the verification packet.【F:index.html†L2501-L2708】
2. Trigger **Settings → Data & Storage → Quick safeguards → Download full backup** and ensure the **Latest
   activity** board records the new timestamp. Note the filename and timestamp in the verification log so
   documentation can reference a real export.【F:index.html†L2722-L2778】【F:docs/verification-log-template.md†L26-L67】
3. Launch the help dialog, search for “backup” and “restore” and verify the contextual links land on the
   correct controls. If any anchor changed, update the help markup before closing the audit.【F:index.html†L4401-L4413】

## Step 3 – Runtime evidence
1. Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and capture the output. Attach the
   screenshot or console dump to the audit record so readers know the documented safeguards were active.【F:src/scripts/modules/runtime.js†L2216-L2335】
2. Inspect `window.cinePersistence.__internal.inspectAllBindings()` to confirm every storage wrapper is
   registered. Note any missing bindings and halt the release if one fails.【F:src/scripts/modules/persistence.js†L1013-L1119】
3. Check `window.cineOffline.__internal.clearCacheStorage()` inside a disposable profile to confirm cache
   recovery helpers still work. Document the run in case offline crews need the instructions.【F:src/scripts/modules/offline.js†L2555-L2606】

## Step 4 – Archive results
1. Update the verification log with timestamps, browsers, commands executed and filenames captured during
   the audit. Include hashes for backups and bundles so future crews can verify integrity.【F:docs/verification-log-template.md†L12-L67】
2. Regenerate the documentation verification packet with refreshed screenshots, guard outputs and updated
   manuals, then store redundant copies on the offline media noted in the packet guide.【F:docs/documentation-verification-packet.md†L9-L48】

## 2025-02 spot check
- **Backup UI parity.** Verified Backup & Restore still exposes Compare versions, Restore rehearsal and
  Backup buttons exactly where the documentation describes.【F:index.html†L2501-L2708】
- **Integrity diagnostics.** Confirmed `verifyCriticalFlows()` returns `ok: true` after recent persistence
  updates, keeping the audit evidence trustworthy.【F:src/scripts/modules/runtime.js†L2216-L2335】
- **Cache recovery.** Exercised `cineOffline.__internal.clearCacheStorage()` to ensure offline crews can
  follow the documented recovery steps when caches need rebuilding.【F:src/scripts/modules/offline.js†L2555-L2606】

Running this checklist on a predictable cadence keeps documentation aligned with the runtime safeguards
that protect saves, shares, imports, backups and restores even when crews remain fully offline.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
