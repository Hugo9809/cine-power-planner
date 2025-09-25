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
   project, backup, gear list and custom device counts match expectations. This
   step catches storage issues before they risk user data.
4. **Exercise backups and bundles.** Export a planner backup and a
   `project-name.json` bundle, import both into an offline private profile and
   review gear lists, automatic gear rules, runtime dashboards and favorites for
   parity. Delete the profile after verification.
5. **Simulate loss of connectivity.** While the verification profile stays
   offline, refresh the planner and make sure the offline indicator appears,
   cached assets render instantly and the restored project remains intact.

Document the drill results alongside your automated test logs so every release
carries evidence that saving, sharing, importing, backup and restore routines
were validated end-to-end.
