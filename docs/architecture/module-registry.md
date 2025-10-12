# Module Registry Reference

The Cine Power Planner runtime uses a guarded registry to expose services across
modules while preserving offline determinism and data safety. This document
summarises the registry contract, available tokens and the expectations every
module must follow.

## Registry lifecycle

1. `architecture-kernel.js` creates the registry, binds a hardened `define`
   helper and records diagnostics about the caller before any module runs.
2. `registry.js` stores module factories in an immutable map keyed by token.
   Factories receive an isolated context object rather than raw global access.
3. `architecture-core.js` and `architecture-helpers.js` resolve dependencies,
   ensuring cycles are surfaced early with descriptive errors.
4. When the runtime requests a module, `registry.js` performs a guarded
   instantiation that logs load order, validates exports and captures failures
   without corrupting persistence state.

## Available tokens

The following canonical tokens are available to feature modules. Reference these
instead of importing files directly so tests and offline bundles can swap
implementations if needed.

| Token | Provides | Notes |
| --- | --- | --- |
| `architecture.environment` | Safe access to `window`, `globalThis`, workers and Node-style globals. | Never mutate the returned references. |
| `architecture.logging` | Structured console logging with offline history buffers consumed by verification logs. | Records only the last 50 entries to keep bundles lean. |
| `architecture.persistence` | Redundant save/autosave/backup helpers that wrap `storage.js`. | All user data writes must flow through this token. |
| `architecture.localization` | Translation catalogues, locale fallbacks and runtime text helpers. | Loads all strings from local JSON assets. |
| `architecture.offline` | Service worker handshake, cache verification drills and bundle checksum utilities. | Works even when the service worker is unavailable. |
| `architecture.results` | Runtime estimator functions and rig diff helpers. | Uses schema constraints defined in `docs/schema-inventory.md`. |
| `architecture.help` | Help centre topics, documentation anchors and translation metadata. | Mirrors the docs folder so offline manuals stay in sync. |
| `architecture.settings` | Appearance toggles, input defaults and autosave cadence configuration. | Persists values via the persistence token. |
| `architecture.features.autoGearRules` | Automatic gear rule builder, validation logic and rehearsal checkpoints. | Stores redundant mirrors before applying changes. |

> **Tip:** Add new tokens only after updating the [Documentation Coverage
> Matrix](../documentation-coverage-matrix.md) so help, training and translation
> surfaces reflect the new behaviour.

## Authoring rules

- **Immutable exports:** Module factories must return plain objects. The registry
  freezes exports so accidental mutations cannot corrupt shared services.
- **Dependency declaration:** Declare dependencies explicitly via the registry
  helper. Ad-hoc `require` or `import` statements bypass safety checks and are
  disallowed.
- **Offline determinism:** Never fetch remote assets or rely on network state.
  Every dependency must ship inside the repository so the same module registry
  works on air-gapped machines.
- **Error transparency:** Throw descriptive errors when validation fails. The
  registry captures stack traces and attaches them to the diagnostics timeline
  used by the [Documentation Verification Packet](../documentation-verification-packet.md).

## Maintenance checklist

1. Update the table above when adding or removing tokens.
2. Capture a screenshot or console log of `window.__cineModuleRegistry` after
   loading the planner to attach to verification logs.
3. Re-run the [Offline Cache Verification Drill](../offline-cache-verification-drill.md)
   whenever registry-controlled bundles change so cached builds stay in sync.
