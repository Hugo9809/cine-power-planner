# Runtime Refactor Roadmap

This document captures a phased plan to break the oversized `app-core-foundation-runtime.js` and `app-core-orchestration-runtime.js` bundles into cohesive modules without sacrificing offline behaviour, localisation quality, or user data safety. The plan emphasises redundancy in backups and restore flows, does not introduce external dependencies, and mandates that help, documentation, and translations remain current through every phase.

## 1. High-level goals

* Reduce the size of both runtime bundles to comfortably below 15k lines by splitting them into purpose-driven modules that can be reasoned about and tested independently.
* Maintain feature parity for offline execution, background autosave, share/import/export flows, and localisation fallbacks during each incremental change.
* Establish resilient module boundaries that support future enhancements such as richer diagnostics and improved storage observability without jeopardising user data.
* Ensure every refactor step includes updates to documentation, inline help, and translation keys where behaviour or workflows change.

## 2. Proposed module boundaries

| Bundle | Module | Responsibilities | Shared dependencies | Offline/cache considerations |
| --- | --- | --- | --- | --- |
| Foundation | `environment` | Detect environment scope, attach module linker/system, bridge to service worker context. | Storage abstraction, localisation for error messages, telemetry sink. | Must keep fallback detection that operates without `require` so offline builds work. |
| Foundation | `persistence` | Session storage orchestration, autosave scheduler, backup rotation, import/export pipeline. | Storage APIs, checksum utilities, encryption helpers, localisation. | Cannot regress incremental backup writes or degrade offline cache hydration. |
| Foundation | `ui-integration` | DOM wiring, event buses, offline indicators, error banners. | localisation dictionaries, icon registry (local assets), persistence module. | Must keep offline indicator consistent and warn before unsaved data loss. |
| Foundation | `telemetry` | Internal diagnostics, logging, channel throttling. | Storage (for offline queue), environment module (to inspect context). | Offline queue should flush safely once connectivity returns. |
| Orchestration | `workflow-engine` | Scenario orchestration, dependency graph evaluation, asynchronous job runner. | Persistence module, telemetry, environment module. | Needs deterministic replay from autosave state for offline resume. |
| Orchestration | `capability-profiles` | Device/camera gear models, compatibility matrices, localisation for messages. | Data catalogues, localisation module, persistence for caching. | Offline caches should be versioned and rolled back on mismatch. |
| Orchestration | `collaboration` | Share links, import/export, restore flows, verification overlays. | Persistence module, environment module, localisation, networking adapter. | Share/import must validate backups before replacing local data. |
| Shared | `localisation` | Language packs, fallback chain, dynamic runtime strings. | Storage (for offline pack cache), environment detection. | Ensure offline language selection persists between sessions. |
| Shared | `storage` | IndexedDB-first storage, OPFS backup target, legacy localStorage fallback, encryption, schema evolution, backup rotation. | Environment detection (for capability), telemetry. | Must run schema migrations atomically and keep redundant backups. |
| Shared | `runtime/bootstrap` | Module-loader fallbacks, global constant exposure, boot queue orchestration, grid-snap state sync. | Global scope resolvers, localisation helpers, persistence surfaces. | Must keep Part 1/Part 2 bundles aligned even when storage APIs fail offline, so autosave/share/backups stay deterministic. |

## 3. Shared infrastructure guarantees

* **Storage layer** – expose a unified interface for IndexedDB-first persistence with OPFS as the backup target where supported and localStorage as a legacy fallback, including transaction guards, checksum validation, and dual-write backups before destructive operations.
* **Localisation service** – centralise message lookup with locale negotiation, offline pack caching, and dynamic help content linking. All modules must use the same resolver to ensure consistent fallbacks when offline.
* **Error and telemetry handling** – standard error envelope containing severity, localisation key, remediation hint, and optional offline queue payload. Telemetry events should buffer locally until connectivity resumes.
* **Data safety safeguards** – before any destructive change (import, restore, reset) capture a timestamped backup; autosave must debounce writes yet guarantee latest state is flushed before unload; share/export flows validate payload integrity and prompt the user in their selected language.
* **Runtime bootstrap anchor** – `src/scripts/runtime/bootstrap.js` (mirrored under `legacy/scripts`) owns the deterministic module-loader fallbacks, boot queue wiring, and grid snap preference normalisation so that localisation hooks, autosave, and offline persistence never diverge between bundle halves.

## 4. Migration steps per module

For each module extraction:

1. **Baseline** – capture current behaviour with targeted unit/integration tests that exercise offline save/restore, localisation switching, and share/import flows.
2. **Create module directory** – e.g., `src/scripts/runtime/environment/` with mirrored structure in `legacy/scripts/runtime/` to maintain backward compatibility.
3. **Move related functions** – relocate code wholesale, keeping original logic intact, and re-export via CommonJS and global attachments for legacy environments.
4. **Update integration points** – adjust require/import statements, ensure globals (e.g., `cineRuntime`) still attach, and wire new module into bundler/test harness.
5. **Regression checks** – run automated tests, manual offline smoke tests (Service Worker cache prime, offline autosave, import/export). Verify help/documentation strings and translation entries referencing moved code are refreshed.
6. **Line-count audit** – confirm source and generated bundles fall below 15k lines; document results in `docs/dev/runtime-refactor-status.md` (new file) after each phase.

## 5. First module extraction (foundation/environment)

*Target:* Extract environment detection and module linking utilities into `runtime-environment-helpers`.

*Steps:*

1. Create `src/scripts/modules/runtime-environment-helpers.js` and `legacy/scripts/modules/runtime-environment-helpers.js` exporting the shared helpers while preserving the ability to run without `require` (register on `cineRuntimeEnvironmentHelpers`).
2. Update both `runtime.js` files to resolve helpers via the new module (prefer `require`, fallback to global). Leave autosave/persistence logic untouched to protect offline backups.
3. Execute targeted tests: runtime module unit tests, runtime integration tests, and a manual offline smoke test (via existing Service Worker harness) to confirm caches and save/restore continue to function.
4. Document the change in README/Help if public APIs shift; update translations if user-facing messaging changed.

## 6. Validation and iteration

* After extraction, record new line counts for the affected files (goal: both `runtime.js` drop by ~600 lines, new helper modules well below 15k).
* Review architecture to select the next module (likely `persistence`) ensuring environment helpers now provide stable foundation.
* Repeat the extraction process, ensuring new documentation entries and localisation strings accompany behavioural updates.

## 7. Final consolidation and audit

* Compile an architecture overview summarising module boundaries, dependency graph, and data flow safeguards.
* Audit Service Worker scripts, manifests, and storage schemas to confirm they reflect new module layout; ensure pre-cache lists include any new helper bundles.
* Verify that export/import, backup, and restore flows pass integrity checks and that redundant backups exist before and after migration.
* Update help guides and translation files to describe any new recovery steps or UI labels introduced during the refactor.

---

This roadmap keeps the refactor incremental, prioritises user data integrity, and ensures offline usability remains uncompromised while the runtime is modularised.
