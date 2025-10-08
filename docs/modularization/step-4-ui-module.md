# Step 4 – UI Coordination & Interaction Layer Split

The fourth stage of the modularisation plan introduces the `cineUi` registry. It centralises
controller wiring, user-triggerable interactions and contextual help so the save, share,
import, backup and restore experiences stay auditable without depending on implicit globals.

## Registry overview

* `cineUi.controllers` records UI controllers (dialogs, toggles, workflows) and exposes a
  frozen API for invoking registered actions. Controllers now wrap device manager toggles,
  share/restore dialogs and backup routines so other modules or tests can orchestrate them
  deterministically.【F:src/scripts/modules/ui.js†L1-L192】【F:src/scripts/app-events.js†L120-L208】【F:src/scripts/app-setups.js†L1-L438】【F:src/scripts/app-session.js†L620-L708】
* `cineUi.interactions` captures user-facing triggers (button clicks, file selections),
  allowing programmatic rehearsal of save/share/import/backup flows without DOM coupling.
  The registry warns when entries are replaced to avoid silent overrides during refactors.
* `cineUi.help` stores resolvers for contextual guidance. Help copy now reads directly from
  the active translation tables, keeping dialogs and tooltips aligned with localisation
  updates.【F:src/scripts/modules/ui.js†L83-L186】【F:src/scripts/app-events.js†L210-L238】【F:src/scripts/app-setups.js†L440-L482】【F:src/scripts/app-session.js†L710-L744】
* `cineUi.orchestration` holds initialisers for future UI bootstrapping work. The registry is
  frozen deeply and exposed globally so both browser runtime and Node-based tests share the
  same contract.【F:src/scripts/modules/ui.js†L1-L192】

## Runtime integration

* `loader.js` and `script.js` load the new module before the legacy core pieces, ensuring
  downstream scripts can register controllers during evaluation.【F:src/scripts/loader.js†L1850-L1874】【F:src/scripts/script.js†L13-L54】
* The service worker pre-caches `src/scripts/modules/ui.js` so offline sessions can recover
  UI metadata even after clearing other caches.【F:service-worker.js†L20-L42】
* Share/import handlers in `app-setups.js`, setup lifecycle helpers in `app-events.js` and
  backup/restore routines in `app-session.js` now register their UI entry points with
  `cineUi`, mirroring the persistence and offline facades added earlier.【F:src/scripts/app-events.js†L1-L238】【F:src/scripts/app-setups.js†L1-L486】【F:src/scripts/app-session.js†L1-L744】

## Testing

* `tests/unit/uiModule.test.js` exercises controller, interaction, orchestration and help
  registration, verifying that replacements warn and that frozen registries stay immutable.
  The service worker test also asserts the new module is cached for offline use.【F:tests/unit/uiModule.test.js†L1-L84】【F:tests/unit/service-worker.test.js†L1-L28】

## Documentation & localisation

* `docs/documentation-maintenance.md` now references `cineUi` so future help updates stay
  aligned with the registry.
* No new strings were added; help resolvers reuse existing translation keys so localisation
  remains complete.

This split keeps the human-friendly UI intact while exposing the safety-critical workflows
(save, autosave, share, import, backup, restore) through an auditable, testable module that
continues to prioritise offline resilience and zero data loss.
