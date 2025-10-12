# Module Registry Architecture

The module registry keeps every critical Cine Power Planner bundle discoverable and
immutable so offline workflows, backups and restores behave identically across devices.
It freezes each module API, tracks metadata and exposes deterministic lookup helpers the
runtime guard uses before any UI interaction proceeds.【F:src/scripts/modules/registry.js†L300-L358】【F:src/scripts/modules/runtime.js†L2203-L2366】

## Registry responsibilities
- **Frozen APIs.** `cineModules.register(name, api)` normalises names, freezes the
  supplied object by default and records category and description metadata so integrity
  reports can prove which safeguards are active.【F:src/scripts/modules/registry.js†L300-L358】
- **Deterministic lookups.** `registry.get(name)`, `registry.list()` and metadata helpers
  return frozen snapshots, preventing accidental mutation when autosave or backup flows run
  offline.【F:src/scripts/modules/registry.js†L361-L427】
- **Pending queue.** Registrations that fail (for example while service workers hydrate)
  are retried automatically via the hidden queue managed on the global scope. The queue uses
  offline-safe timers so modules register even when the browser delays execution.【F:src/scripts/modules/registry.js†L600-L759】
- **Blueprints.** `cineModules.createBlueprint()` wraps these behaviours so new modules can
  reuse frozen defaults, queue retries and metadata normalisation in a single call.【F:src/scripts/modules/registry.js†L880-L958】

## Runtime guard integration
`cineRuntime.verifyCriticalFlows()` inspects registry entries before it checks module
methods. Missing registrations immediately flag failed safeguards, keeping save/share,
import, backup and restore flows from running with partial coverage. The runtime module
also exposes `inspectModuleConnections()` so auditors can confirm dependency wiring during
offline rehearsals.【F:src/scripts/modules/runtime.js†L2203-L2368】

## Default modules
The bundles below register automatically during startup. Each entry is frozen and exposes
metadata that ties directly into offline rehearsals and documentation updates.

| Module | Responsibilities |
| --- | --- |
| `cineCoreShared` | Shared helpers for deterministic stringification, weight normalisation and global `APP_VERSION` exposure so caches, exports and service workers stay aligned offline.【F:src/scripts/modules/core-shared.js†L1040-L1119】 |
| `cinePersistence` | Storage wrappers, autosave orchestrators, backup/export/import bridges and share helpers that keep user data redundant on every device.【F:src/scripts/modules/persistence.js†L900-L1100】 |
| `cineOffline` | Service worker coordination, cache recovery helpers and reload triggers that guarantee offline parity.【F:src/scripts/modules/offline.js†L2560-L2612】 |
| `cineUi` | Controller, interaction and help registries that keep dialogs, backups and restore rehearsals wired to localisation metadata.【F:src/scripts/modules/ui.js†L1189-L1242】 |
| `cineCoreProject` | Project intelligence exports that feed diffing, signature checks and auto-gear calculations without network access.【F:src/scripts/modules/core/project-intelligence.js†L244-L296】 |
| `cineCoreGuard` | Persistence guards enforcing autosave, preset, backup and restore protections before data mutates.【F:src/scripts/modules/core/persistence-guard.js†L276-L313】 |
| `cineCoreExperience` | UI experience helpers that power feature discovery, accent modes and localisation bridges bundled with offline assets.【F:src/scripts/modules/core/experience.js†L290-L327】 |
| `cineRuntime` | Orchestrator exposing integrity checks, registry access and connection inspections for audits and documentation runs.【F:src/scripts/modules/runtime.js†L2337-L2383】 |

Additional feature modules (for example, feature search, print workflow or contacts) use the
same blueprint to document how they protect user data. When adding new entries, record
clear responsibilities so audit trails remain human friendly.

## Registering a new module
1. **Implement the module** under `src/scripts/modules/` following the defensive patterns:
   guard global lookups, avoid network dependencies and freeze exported objects.
2. **Expose metadata.** Call `cineModules.createBlueprint({ name, category, description,
   connections, freeze })` or invoke `registry.register()` manually with the same fields so
   integrity reports surface why the module exists.【F:src/scripts/modules/registry.js†L300-L358】【F:src/scripts/modules/registry.js†L880-L958】
3. **Queue safe retries.** Let the blueprint defer registration on failure so worker and
   legacy bundles replay the attempt without human intervention.【F:src/scripts/modules/registry.js†L600-L759】【F:src/scripts/modules/registry.js†L907-L947】
4. **Expose globally when needed.** Use the module base helpers to publish frozen APIs on the
   global scope so legacy entry points and service workers share the same reference.
5. **Document and translate.** Update help copy and translation keys alongside the new module
   so crews rehearsing offline receive accurate guidance via the runtime guard and help centre.

## Maintenance checklist
- **Verify integrity.** After edits, run `window.cineRuntime.verifyCriticalFlows()` or
  `window.cineRuntime.inspectModuleConnections()` to confirm registry entries remain frozen
  and connected.【F:src/scripts/modules/runtime.js†L2203-L2368】
- **Audit persistence coverage.** Ensure new modules coordinate with `cinePersistence` and
  `cineCoreGuard` when they touch saves, shares, imports or backups so redundancy remains the
  default.【F:src/scripts/modules/persistence.js†L900-L1100】【F:src/scripts/modules/core/persistence-guard.js†L276-L313】
- **Keep offline assets aligned.** When registry entries ship new files, add them to the
  service worker asset list so offline launches load the same code without network access.
- **Prefer redundancy.** If in doubt, capture more autosave data or backup metadata rather than
  trimming fields—user data must never be lost because of a registry change.【F:src/scripts/storage.js†L1-L200】

## 2025-02 registry verification
- **Queue health.** Confirmed the deferred registration queue still retries failures with
  offline-safe timers, ensuring worker and legacy bundles converge on the same frozen module
  exports before autosave routines execute.【F:src/scripts/modules/registry.js†L600-L759】
- **Blueprint metadata.** Re-checked the blueprint helper to ensure new modules inherit frozen
  defaults, metadata descriptors and retry behaviour without bespoke wiring, keeping audit trails
  consistent across features.【F:src/scripts/modules/registry.js†L880-L958】
- **Diagnostics exposure.** Validated that service worker bootstrapping propagates the computed
  cache name and logger so registry-driven diagnostics remain available when rehearsing offline
  releases.【F:service-worker.js†L192-L229】

Following this workflow keeps the registry authoritative and the offline, privacy-first
experience crews rely on fully intact.
