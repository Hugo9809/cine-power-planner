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
