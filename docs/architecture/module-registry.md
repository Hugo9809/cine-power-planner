# Module Registry Architecture

The Cine Power Planner runtime now routes every critical bundle through the
`cineModules` registry. The registry is a frozen map that lives on
`globalThis.cineModules` and inside `src/scripts/modules/registry.js`. Each
module registers itself during evaluation and is validated by
`cineRuntime.verifyCriticalFlows()` before the UI accepts user actions. This
chapter explains the contracts, metadata and maintenance checklist so the
offline-first guarantees (save, autosave, share, import, backup and restore)
remain intact.

## Why a registry?

The planner was split into several defensive modules (`cinePersistence`,
`cineOffline`, `cineUi`, `cineCoreShared`, `cineRuntime`) to isolate
responsibilities. Prior to this change, consumers relied on globals or manual
`require()` calls. The registry promotes the modular architecture to a first
class concept:

- **Deterministic lookups.** Modules are frozen and retrievable by name, so a
  component cannot accidentally consume an outdated global reference.
- **Metadata auditing.** The registry stores category, description, timestamp
  and freeze status for every module. Integrity reports surface this metadata to
  aid troubleshooting during offline rehearsals.
- **Integrity verification.** `cineRuntime.verifyCriticalFlows()` now inspects
  registry membership before checking method availability. A missing registration
  fails the same guard that protects save/share/restore flows and the runtime
  feedback storage wrappers and bindings.
- **Legacy parity.** The ES5 bundle under `legacy/` mirrors the registry so
  older browsers and cached offline copies keep the same guarantees.

## Modules registered by default

Before the feature-specific modules are evaluated we register
`cineModuleBase`, an infrastructure layer that exposes deterministic helpers
(scope detection, registry resolution, deep freezing, safe warnings and global
exposure). We then layer `cineModuleContext` on top to mirror those primitives
while unifying module-system lookups, registry access and deferred registration
queues. Finally `cineModuleEnvironment` provides a frozen bridge that reuses the
context helpers across every modern bundle so modules stop copying boilerplate
when they talk to the registry or the global scope. The legacy bundle exposes
the same trio so parity can be maintained as we sync future updates across both
builds.

| Module name        | Category          | Responsibilities |
| ------------------ | ----------------- | ---------------- |
| `cineModuleBase`   | `infrastructure`  | Normalises scope detection, module registration queues, deep freezing and safe global exposure so higher level modules share the same defensive primitives. |
| `cineModuleContext` | `infrastructure` | Shares base helpers with the module system, exposing unified context factories so modules can resolve architecture hooks, registries and queue fallbacks without reimplementing them. |
| `cineModuleEnvironment` | `infrastructure` | Provides a shared runtime context that mirrors `cineModuleBase` and `cineModuleContext` helpers, keeping registry access, queuing and global exposure aligned between files without duplicating the handshake logic. |
| `cineCoreShared`   | `shared`          | Stable stringify helpers, connector summaries, auto-gear weight normalization, version marker exposure. |
| `cinePersistence`  | `persistence`     | Storage accessors, autosave helpers, backup/export/import orchestration, share/restore bridges. |
| `cineOffline`      | `offline`         | Service worker registration, cache rebuilds, fallback storage cleanup, reload triggers. |
| `cineUi`           | `ui`              | Controller/interaction/help registries for dialogs, backups, restore rehearsals and share workflows. |
| `cineRuntime`      | `runtime`         | Aggregates modules, exposes integrity checks and ensures every safeguard stays frozen. |

The registry is extensible: additional modules may be registered to expose
purpose-specific APIs, but every entry must honour the guarantees below.

## Registration contract

1. **Freeze by default.** `registry.register(name, api)` freezes the supplied
   object unless `options.freeze === false`. Use the default freeze to prevent
   accidental mutation of shared state.
2. **Metadata is mandatory.** Provide `category` and `description` to document
   how the module supports user data protection. These strings appear in
   integrity reports and documentation.
3. **One name, one module.** Registering an already-registered name throws
   unless `options.replace === true`. Replacements are intended for controlled
   overrides (tests, feature flags) and should remain rare.
4. **Reset only in tests.** `__internalResetForTests({ force: true })` exists to
   isolate Jest suites. Do not call it in production code.

## Adding a new module

1. Implement the module under `src/scripts/modules/`. Keep the file frozen under
   25 000 lines and follow existing patterns (defensive try/catch when reading
   globals, no external network calls, offline-first defaults).
2. Require the registry via `require('./registry.js')` (with a `tryRequire`
   helper) and register the module with category/description metadata.
3. Update `src/scripts/script.js`, `legacy/scripts/script.js`, `loader.js` and
   `service-worker.js` to preload/cache the new module so offline usage stays
   reliable.
4. Add tests covering registration and the exposed API. Place unit tests in
   `tests/unit/` and use `registry.__internalResetForTests({ force: true })` to
   isolate state.
5. Update documentation and translations:
   - Reference the new module in this file and the localized READMEs.
   - Ensure in-app help/translation strings still describe save/share/restore
     flows accurately.
6. Run `npm test` before committing to confirm ESLint, data checks and Jest all
   pass. Capture a fresh `window.cineRuntime.verifyCriticalFlows()` report during
   manual QA to verify the registry entries.

## Maintenance checklist

Whenever you modify a registered module:

- **Offline parity.** Confirm the service worker asset list contains the module
  for both modern and legacy bundles. All assets must load without network
  access (remember to keep local Uicons, fonts and animations intact).
- **Backwards compatibility.** Preserve existing method names and semantics so
  saved data, backups and shares continue to round-trip without loss.
- **Documentation.** Update READMEs, docs and translations with any new
  behaviour so crews rehearsing offline always follow accurate guidance.
- **Integrity verification.** Re-run `npm run test:unit` and, if possible,
  execute `npm run test:script` to ensure the runtime guard recognises the new
  module boundaries.
- **Backups first.** When in doubt, err on the side of capturing additional user
  data (extra autosaves, more detailed backups) instead of removing fields. User
  data must never be lost because of a module change.

Following this checklist keeps the modular architecture a core component of the
app while safeguarding the offline, privacy-first workflow that crews rely on.
