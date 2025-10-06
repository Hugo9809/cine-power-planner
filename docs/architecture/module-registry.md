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
`cineModuleArchitectureCore`, a compact backbone that centralises scope
detection, registry lookups, queue management, safe warnings and deep-freeze
behaviour. The core powers `cineModuleArchitectureHelpers`, which expose the
same primitives to the wider runtime so every environment inherits a consistent
defensive baseline. `cineModuleBase` builds on those helpers to provide the
historical base API, while `cineModuleContext` mirrors the primitives inside the
module system so consumers can resolve registries and queue fallbacks without
reimplementing the boilerplate. Finally `cineModuleEnvironment` provides a
frozen bridge that reuses the context helpers across every modern bundle so
modules stop copying plumbing when they talk to the registry or the global
scope. The legacy bundle exposes the same set so parity can be maintained as we
sync future updates across both builds.

## Architecture factory

The defensive helpers that power `cineModuleArchitectureCore`,
`cineModuleArchitectureHelpers`, `cineModuleBase`, `cineModuleContext` and
`cineModuleEnvironment` are now also available through
`cineModuleArchitectureFactory.createModuleArchitecture(options)`. The factory
creates frozen architecture instances with the same queue, scope-detection and
deep-freeze behaviour that the primary runtime uses. This is especially useful
when a feature needs to spin up a sandboxed environment (for example, a shared
worker used during offline rehearsals) without mutating the main global scope.

- **Scoped isolation.** Pass `{ primaryScope }` to create an architecture bound
  to an alternative global-like object. The helper still respects the
  persistence and queue semantics that protect save/share/restore pathways so
  user data remains safe even in auxiliary contexts.
- **Deterministic helpers.** The factory mirrors `tryRequire`,
  `collectCandidateScopes`, `ensureQueue`, `freezeDeep` and `safeWarn`, keeping
  every environment aligned with the behaviour documented for the primary
  module registry.
- **Automatic availability.** The factory lives on
  `globalThis.cineModuleArchitectureFactory` and piggybacks on the offline
  asset list. No network access is required, and the existing service worker
  continues to ship the script alongside local Uicons, fonts and help content.

## Blueprint helper

`cineModules.createBlueprint(options)` packages the registration contract into a
single helper so new modules can inherit the hardened defaults without copying
boilerplate. A blueprint freezes its metadata, deep-freezes the produced API by
default and records failed registrations in the same offline-safe queue used by
manual `registry.register` calls.

- **Deterministic metadata.** Category, description and connection lists are
  normalised and frozen so integrity reports always reflect the protections a
  module adds for save, share, import, backup and restore flows.
- **Single instantiation.** The underlying factory is called once and cached,
  preventing divergent module instances from appearing when retries occur in
  auxiliary scopes.
- **Automatic queuing.** If registration fails (for example during worker
  initialisation) the blueprint places the attempt into
  `__cinePendingModuleRegistrations__` so the module is retried instead of being
  dropped.
- **Custom registries.** Tests can pass a mock `registry` to
  `blueprint.register({ registry, options, context })` and still reuse the
  production metadata and freeze semantics.

| Module name        | Category          | Responsibilities |
| ------------------ | ----------------- | ---------------- |
| `cineModuleArchitectureCore` | `infrastructure` | Frozen backbone that shares scope detection, registry resolution, deep-freeze controls and safe logging semantics across helpers and downstream modules. |
| `cineModuleArchitectureHelpers` | `infrastructure` | Shares frozen scope detection, registry resolution, queue management, deep freezing and safe warning helpers so every environment starts from the same defensive baseline. |
| `cineModuleBase`   | `infrastructure`  | Normalises scope detection, module registration queues, deep freezing and safe global exposure so higher level modules share the same defensive primitives. |
| `cineModuleContext` | `infrastructure` | Shares base helpers with the module system, exposing unified context factories so modules can resolve architecture hooks, registries and queue fallbacks without reimplementing them. |
| `cineModuleEnvironment` | `infrastructure` | Provides a shared runtime context that mirrors `cineModuleBase` and `cineModuleContext` helpers, keeping registry access, queuing and global exposure aligned between files without duplicating the handshake logic. |
| `cineCoreShared`   | `shared`          | Stable stringify helpers, connector summaries, auto-gear weight normalization, version marker exposure. |
| `cinePersistence`  | `persistence`     | Storage accessors, autosave helpers, backup/export/import orchestration, share/restore bridges. |
| `cineOffline`      | `offline`         | Service worker registration, cache rebuilds, fallback storage cleanup, reload triggers. |
| `cineUi`           | `ui`              | Controller/interaction/help registries for dialogs, backups, restore rehearsals and share workflows. |
| `cineFeaturePrint` | `feature`         | Frozen print orchestration helpers that coordinate native printing and fallback windows so overview exports remain reliable offline. |
| `cineRuntime`      | `runtime`         | Aggregates modules, exposes integrity checks and ensures every safeguard stays frozen. |

The registry is extensible: additional modules may be registered to expose
purpose-specific APIs, but every entry must honour the guarantees below.

## Registration contract

1. **Freeze by default.** `registry.register(name, api)` freezes the supplied
   object unless `options.freeze === false`. Use the default freeze to prevent
   accidental mutation of shared state.
2. **Metadata is mandatory.** Provide `category` and `description` to document
   how the module supports user data protection. These strings appear in
   integrity reports and documentation. You can also include a
   `connections` array listing other modules that the new entry depends on
   (for example, `['cineModuleBase', 'cineModuleContext']`). The runtime uses
   these relationships to validate cross-module wiring without mutating the
   registry.
3. **One name, one module.** Registering an already-registered name throws
   unless `options.replace === true`. Replacements are intended for controlled
   overrides (tests, feature flags) and should remain rare.
4. **Reset only in tests.** `__internalResetForTests({ force: true })` exists to
   isolate Jest suites. Do not call it in production code.

## Adding a new module

1. Implement the module under `src/scripts/modules/`. Keep the file frozen under
   25 000 lines and follow existing patterns (defensive try/catch when reading
   globals, no external network calls, offline-first defaults).
2. Prefer `cineModules.createBlueprint({...})` to capture the category,
   description, connections and freeze defaults before registering. If a
   blueprint is not suitable, require the registry via
   `require('./registry.js')` (with a `tryRequire` helper) and register the
   module with category/description metadata.
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
- **Connection audit.** Run `window.cineRuntime.inspectModuleConnections()` in
  the browser console (or call the exported function in tests) to confirm the
  new module reports accurate dependencies and that every connection resolves
  to a registered module.
- **Backups first.** When in doubt, err on the side of capturing additional user
  data (extra autosaves, more detailed backups) instead of removing fields. User
  data must never be lost because of a module change.

Following this checklist keeps the modular architecture a core component of the
app while safeguarding the offline, privacy-first workflow that crews rely on.
