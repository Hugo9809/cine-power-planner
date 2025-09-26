# Step 5 – Integration, Testing & Documentation Pass

The final stage verifies that the newly modularised services operate together without
regressing the offline-first promises of the Camera Power Planner. Rather than introducing
another coordinator layer, we exercise the existing modules in a single integration suite so
future refactors catch mismatches immediately.

## Runtime integration checks

* `tests/dom/runtimeIntegration.test.js` boots the application runtime inside the
  Jest + jsdom environment. The test asserts that `cineOffline`, `cinePersistence` and
  `cineUi` are all exposed with the APIs needed to reload the planner, persist projects,
  create backups and apply shared setups.【F:tests/dom/runtimeIntegration.test.js†L1-L64】
* The integration suite also confirms that the Node-oriented bundle (`script.js`) continues to
  export the helpers used by existing tests (`collectProjectFormData`, backup utilities and
  sharing helpers). This guards the split core from accidentally dropping functionality when
  the bundling strategy evolves.【F:tests/dom/runtimeIntegration.test.js†L50-L63】【F:tests/helpers/runtimeLoader.js†L1-L36】
* During startup the bundle now captures the `cineRuntime.verifyCriticalFlows()` result on
  `__cineRuntimeIntegrity` so regressions surface immediately in both automated logs and
  manual offline rehearsals.【F:src/scripts/script.js†L92-L183】

## Documentation updates

* `docs/documentation-maintenance.md` references the integration suite so contributors keep
  the new coverage in mind while updating help or translation content.
* `docs/testing-plan.md` highlights the runtime integration test in the “What still runs by
  default” section, pairing it with the existing regression drills.

These additions close the modularisation plan by proving that the persistence, offline and
UI modules cooperate in a single runtime session. The integration test now acts as a
sentinel—any future change that risks data loss, breaks backups or hides sharing workflows
will fail quickly, keeping the offline crews protected.
