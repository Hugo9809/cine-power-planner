# Module Registry Handbook

Cine Power Planner freezes the module registry at runtime so every execution
context—main window, embedded dialog, worker, print view or verification
sandbox—loads the same battle-tested functionality. After reviewing the full
app we refreshed this handbook to highlight how to register new modules without
risking data loss and how to audit the registry routinely.

## Registry responsibilities

- **Discovery.** `src/scripts/modules/registry.js` walks available scopes to find
  the module linker, environment helpers and diagnostic loggers. Lookups are
  guarded so tests and offline bundles succeed even when optional globals are
  missing.
- **Registration.** Modules call `cineModules.register(Blueprint)` with a
  blueprint that captures name, category, exported API, dependency graph and
  safety notes. The registry freezes blueprints immediately so consumers cannot
  mutate them and compromise future audits.
- **Retry queue.** When a module cannot register immediately (for example, when
  the UI has not finished booting) the registry holds the blueprint in a deferred
  queue. Once the runtime settles, pending blueprints are replayed until every
  module is live—critical for offline sessions where execution order can vary.
- **Diagnostics.** The registry powers `window.cineModules.inspect()` and feeds
  the runtime guard with immutable snapshots of frozen exports, dependency maps
  and offline readiness flags.

## Common module categories

| Category | Typical files | Responsibilities |
| --- | --- | --- |
| `core` | `src/scripts/modules/core/*` | Persistence guard, storage adapters, UI integration glue. |
| `features` | `src/scripts/modules/features/*` | Automatic gear rules, print workflows, runtime calculators. |
| `environment` | `src/scripts/modules/environment*.js` | Scope detection, bridge helpers, offline signal dispatch. |
| `ui` | `src/scripts/modules/ui*.js`, `.../settings-and-appearance.js` | Dialog framework, theme tooling, help overlays. |
| `offline` | `src/scripts/modules/offline.js` | Cache priming, offline indicators, service-worker helpers. |
| `telemetry` | `src/scripts/modules/telemetry.js` | Local-only diagnostics captured for verification packets. |

Every module must avoid network dependencies, rely solely on bundled assets and
route persistence work through `cinePersistence` so redundant backups remain in
sync.

## Adding a module safely

1. **Create the implementation** under `src/scripts/modules/`, ideally inside a
   dedicated subdirectory when it spans multiple helpers.
2. **Define a blueprint** with `name`, `category`, `description`, `exports`,
   `connections` and `safetyChecks`. Keep exports immutable and never expose raw
   storage handles or network calls.
3. **Register during boot.** Require the module from the relevant boot file
   (`app-core-new-1.js`, `app-core-new-2.js`, `app-session.js` or a feature
   loader) so it runs during initialisation. The registry freezes the blueprint
   and exposes it globally.
4. **Verify guard output.** Exercise the runtime guard via
   `window.cineRuntime.verifyCriticalFlows()` and capture
   `window.__cineRuntimeIntegrity` inside the verification log. Confirm autosave,
   backup and restore hooks still report redundant mirrors.
5. **Document the change.** Update help topics, offline manuals and translation
   bundles so crews rehearsing without connectivity receive accurate guidance.
6. **Extend tests.** Cover new flows in `tests/`—especially scenarios touching
   save, autosave, share, import, backup and restore.

## Auditing existing modules

- Compare registry snapshots with the [Schema Inventory](../schema-inventory.md)
  to confirm every stored dataset has a responsible module.
- Ensure modules exposing UI strings appear in
  `src/scripts/translations.js`; mirror the updates in each localized README and
  the [Translation Guide](../translation-guide.md).
- Review tests in `tests/unit/` and `tests/dom/` to confirm behaviours remain
  covered, paying special attention to redundancy safeguards.
- Regenerate `service-worker-assets.js` when modules add icons, scripts or other
  static files so offline caches stay aligned with the repository.
- Capture registry diffs in verification packets whenever a release ships. The
  snapshot proves which modules safeguarded user data at that revision.

A healthy registry keeps every context aligned and guarantees user data travels
through predictable, fully rehearsed pathways.
