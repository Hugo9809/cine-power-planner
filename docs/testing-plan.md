# Testing Plan for Resource-Constrained Environments

The test suite historically covered every interactive surface of the camera power planner.  
While this offered exhaustive regression coverage, it also demanded more memory than the
resource limits available in some of our automated environments.  Jest would often exhaust
its worker sandbox before finishing DOM-oriented suites, producing flaky runs that slowed
feedback and obscured real failures.

To keep continuous integration reliable we now focus the default test run on the
functionality that directly protects user data, offline workflows, and the script runtime.
The remaining suites targeted visual refinements that users can validate during
exploratory testing without risking data loss.

## What still runs by default

* **Unit and data contracts** – Schema generation, parsing helpers, storage fallbacks and
  integrity checks continue to run in the `unit` and `data` projects to guarantee that
  persistence and migration logic remain safe.
* **Critical DOM flows** – The DOM project still executes tests that exercise
  autosave, sharing, deleting, and loading project data to ensure users never lose their
  work, even while offline.
* **Runtime integration guard** – `tests/dom/runtimeIntegration.test.js` boots the modular
  runtime and verifies that `cineOffline`, `cinePersistence` and `cineUi` expose the
  workflows required for saving, sharing, importing, backing up and restoring data.
  The startup bundle now records the verification outcome on
  `__cineRuntimeIntegrity`, making it easy to audit the integrity status during
  manual rehearsals or when reviewing automated logs.【F:src/scripts/script.js†L92-L183】
* **Runtime and backup automation (opt-in)** – Heavyweight script-level tests are now
  opt-in. Setting `RUN_HEAVY_TESTS=true` before invoking Jest will re-enable the
  integration suite that exercises the modular runtime loader, backup/restore flows,
  sharing exports, session recovery, and device imports.

## What was removed

We removed a collection of DOM and script tests that exclusively checked
styling toggles, accent color boosts, settings tab navigation, and other visual
enhancements.  The heaviest script automation suite was also retired from the
default run to keep memory usage within limits.  Those scenarios were redundant
with existing unit coverage or can be verified during manual QA without
threatening saved data.

If higher-resource environments are available, the deleted suites can be restored from
version control for extended regression testing.

## Manual offline validation checklist

Automated coverage now concentrates on the code paths that protect user data and
offline workflows. Pair those suites with a short hands-on rehearsal whenever
you prepare a release candidate or validate a workstation:

1. **Prime caches while online.** Launch `index.html`, open the help dialog and
   legal pages, then toggle each theme once so locally stored Uicons, OpenMoji
   art and typography files stay cached.
2. **Verify autosave health.** Create or load a project, trigger a manual save
   (`Enter`/`Ctrl+S`/`⌘S`) and confirm the new timestamp in the selector. Open
   **Settings → Backup & Restore** and ensure the autosave status overlay mirrors
   the same timestamp before continuing.
3. **Inspect data inventory.** Visit **Settings → Data & Storage** to confirm
   project, backup, gear list and custom device counts match expectations, scan
   the **Latest activity** summary to ensure recent saves appear, review the
   **Diagnostics log** filters (level/namespace) and retention toggles for
   anomalies (the panel now calls out when filters hide all entries so you can
   distinguish silence from filtered noise), and trigger a **Quick safeguards** backup if you need an
   additional offline copy. This step catches storage and logging issues before
   they risk user data.
4. **Exercise backups and bundles.** Export a planner backup and a
   `project-name.json` bundle, import both into an offline private profile and
   review gear lists, automatic gear rules, runtime dashboards and favorites for
   parity. Delete the profile after verification.
5. **Simulate loss of connectivity.** While the verification profile stays
   offline, refresh the planner and make sure the offline indicator appears,
   cached assets render instantly and the restored project remains intact.
6. **Check the console for deprecations.** Open developer tools and confirm
   the session stays free of the deprecated `window.styleMedia` warning. The
   loader now injects a `matchMedia`-driven shim so display-mode detection and
   help overlays keep functioning without touching the old API or generating
   console noise that could obscure real persistence issues.【F:src/scripts/loader.js†L1-L128】
7. **Document the outcome.** Note the timestamp, machine, browser version and
   files inspected in your verification log. Include any checksum manifests so
   release managers can trace which rehearsal proved the save → share → import
   loop remained reliable.

Document the drill results alongside your automated test logs so every release
carries evidence that saving, sharing, importing, backup and restore routines
were validated end-to-end.
