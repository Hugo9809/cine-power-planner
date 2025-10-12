# Core module topology

Cine Power Planner keeps every offline workflow behind three frozen modules: `cinePersistence`
protects saves and backups, `cineOffline` owns cache hygiene, and `cineRuntime` confirms the two
are wired together before the UI exposes any action. They are registered through the shared module
registry and exposed on the global scope so diagnostics, documentation drills and automated tests
see the same APIs that crews rely on while disconnected.

## cinePersistence – defensive data facade
- **Scope.** Wraps every storage implementation—manual saves, autosave commits, automatic gear
  backups, share helpers and restore rehearsals—behind guarded bindings. Each wrapper lazily
  resolves its provider, freezes the exported API and publishes it through the module registry so
  callers cannot bypass validation or mutate state accidentally.【F:src/scripts/modules/persistence.js†L902-L1131】
- **Safety net.** Exported namespaces (`storage`, `autosave`, `backups`, `restore`, `share`) mirror the
  UI flows exposed in settings and share dialogs, guaranteeing that planner backups, bundles and
  restore rehearsals always pass through the same quota handling and logging paths during offline
  rehearsals.【F:src/scripts/modules/persistence.js†L1036-L1119】【F:index.html†L2501-L2778】

## cineOffline – cache lifecycle and recovery
- **Scope.** Registers the service worker once the page is ready, publishes helpers for force
  reloads, cleans Cache Storage, and maintains fallbacks that repopulate UI caches when the browser
  cannot reach the worker API (for example in restricted environments).【F:src/scripts/modules/offline.js†L2502-L2606】
- **Safety net.** The module exposes diagnostics helpers through `__internal` so verification drills
  can rehearse cache cleanup and verify that bundled Uicons, fonts and translations stay available
  from disk, preserving offline parity for the documentation set.【F:src/scripts/modules/offline.js†L2555-L2606】【F:index.html†L1-L120】

## cineRuntime – orchestration and integrity
- **Scope.** Synchronises the module registry, verifies frozen exports, inspects persistence
  functions, offline helpers and UI controllers, then surfaces immutable accessors such as
  `verifyCriticalFlows()` for audits and automated checklists.【F:src/scripts/modules/runtime.js†L2201-L2379】
- **Safety net.** When the integrity scan finds missing bindings or unfrozen modules it records the
  failure, emits guarded warnings and can throw in strict modes, preventing releases where saves or
  offline guards would be unsafe.【F:src/scripts/modules/runtime.js†L2216-L2335】

## UI contract
Settings panels and help flows are wired directly to the frozen modules: the Backup & Restore,
Restore rehearsal and Data & Storage panels invoke `cinePersistence` for backups, rehearsal
sandboxes and diff exports, while offering persistent storage requests and quick safeguards in the
same offline-friendly layout.【F:index.html†L2501-L2778】 The service worker bootstraps against the
shared cache version so the UI always serves locally stored documentation, legal copy and
translations even during recovery drills.【F:service-worker.js†L192-L240】

## Maintenance drills
1. Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` after touching persistence or
   offline code to confirm registrations remain frozen and discoverable.【F:src/scripts/modules/runtime.js†L2216-L2379】
2. Exercise manual saves, auto-backups, backup exports and restore rehearsals in the UI to confirm
   the wrappers remain connected and quota recovery still mirrors critical keys before promoting a
   build.【F:src/scripts/modules/persistence.js†L1036-L1119】【F:index.html†L2501-L2778】
3. Trigger a force reload and rehearse cache cleanup to keep the documentation, help and icon sets
   refreshed from local assets without relying on network access.【F:src/scripts/modules/offline.js†L2555-L2606】【F:service-worker.js†L192-L240】

Maintaining these drills alongside code reviews keeps the planner's offline guarantees intact and
ensures every document mirrors the behaviours present in production.
