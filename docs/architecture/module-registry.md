# Module Registry Handbook

Cine Power Planner relies on a frozen module registry so every context (main
window, embedded dialog, worker and offline print view) loads the same
functionality without risking data loss. This handbook records how the registry
works and what to check when you add, update or audit modules.

## Registry responsibilities

- **Discovery.** `src/scripts/modules/registry.js` walks every available scope to
  find the module linker, environment helpers and diagnostic loggers. It guards
  those lookups so tests and offline bundles succeed even when certain globals
  are unavailable.
- **Registration.** Modules register themselves through
  `cineModules.register(Blueprint)` where the blueprint describes the module
  name, category, exported API and dependencies. The registry freezes the
  blueprint so consumers cannot mutate it and corrupt future audits.
- **Retry queue.** When a module is not ready (for example because the UI has
  not booted yet) the registry stores the blueprint in a deferred queue. Once
  the runtime finishes loading it retries registration until every module is in
  place. This protects offline sessions that might execute bundles out of order.
- **Diagnostics.** The registry surfaces helpers such as
  `window.cineModules.inspect()` and feeds the runtime guard with details about
  frozen exports, dependency graphs and offline readiness.

## Common module categories

| Category | Typical files | Responsibilities |
| --- | --- | --- |
| `core` | `src/scripts/modules/core/*` | Persistence guard, storage adapters,
UI integration glue. |
| `features` | `src/scripts/modules/features/*` | Automatic gear rules,
print workflow, results calculators. |
| `environment` | `src/scripts/modules/environment*.js` | Scope detection,
bridge helpers, offline signal dispatch. |
| `ui` | `src/scripts/modules/ui.js`, `.../settings-and-appearance.js` | Dialog
framework, theming tools, help overlays. |
| `offline` | `src/scripts/modules/offline.js` | Cache priming, offline
indicators, service-worker helpers. |

Every module must avoid network dependencies, use locally bundled assets and
route persistence work through `cinePersistence` so redundant backups remain in
sync.

## Adding a module safely

1. **Create the implementation** under `src/scripts/modules/`. Prefer a
   dedicated subdirectory when the module spans multiple helpers.
2. **Define a blueprint** with `name`, `category`, `description`, `exports` and
   `connections`. Keep the exports immutable and avoid exposing raw storage
   handles.
3. **Register through the loader.** Require the module in the relevant boot file
   (typically `app-core-new-1.js`, `app-core-new-2.js` or a feature module) so it
   runs during initialisation. The registry will freeze the blueprint and expose
   it globally.
4. **Verify guard output.** Run `window.cineRuntime.verifyCriticalFlows()` and
   inspect `window.__cineRuntimeIntegrity` to confirm the new module is recorded
   and that the persistence guard still reports redundant backups.
5. **Document the change.** Update the help centre, offline manuals and
   translation keys that describe the new behaviour so crews rehearsing offline
   receive accurate guidance.

## Auditing existing modules

- Compare the registry snapshot with the [Schema Inventory](../schema-inventory.md)
  to confirm every stored dataset has a registered module responsible for it.
- Confirm modules exposing UI strings have entries in
  `src/scripts/translations.js` and that the [Translation Guide](../translation-guide.md)
  reflects the new keys.
- Review tests in `tests/unit/` and `tests/dom/` to ensure module behaviours are
  covered, especially for save, autosave, share, backup and restore flows.
- Regenerate service-worker assets when new modules add icons, scripts or other
  static files so offline caches stay current.

Keeping the registry healthy guarantees that user data flows through predictable
and well-tested pathways across every offline context.
