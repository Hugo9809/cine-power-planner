# Module Registry Reference

The Cine Power Planner runtime uses a guarded registry to expose services across
modules while preserving offline determinism and data safety. This document
summarises the registry contract, available tokens and the expectations every
module must follow.

> [!NOTE]
> Modules in `src/scripts/modules/` are being migrated to ES Modules.
> Most modules now support both standard `import` (for Vite/V2) and global access (for legacy IIFE).
> See [Vite Migration Guide](../vite-migration.md) for patterns.

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

The following canonical tokens are registered with the module registry. These
names are used by `cineModules.get()` and by pending registrations flushed from
the module queues. Reference these instead of importing files directly so tests
and offline bundles can swap implementations if needed.

### Infrastructure & Architecture

| Token | Provides | Notes |
| --- | --- | --- |
| `cineModuleBase` | Shared helpers for module registration, freezing, and safe global exposure. | Core infrastructure—loaded early. |
| `cineModuleArchitectureKernel` | Unified kernel for module detection, registry resolution, and queue management. | Bootstraps registry usage. |
| `cineModuleArchitectureHelpers` | Architecture helpers for scope detection, registry resolution, and queue management. | Used by kernel and legacy shims. |
| `cineModuleEnvironment` | Shared environment bootstrap that harmonizes module communication across bundles. | Wraps scope detection and queues. |
| `cineEnvironmentBridge` | Consistent global environment access between Cine modules. | Bridges `window`, `globalThis`, and workers safely. |
| `cineModuleGlobals` | Shared module globals for cross-script coordination. | Provides registry helpers and global caching. |
| `cineModuleContext` | Context helpers that unify architecture, system, and registry lookups. | Used by runtime safety checks. |
| `cineModuleImmutability` | Deep freeze helpers that prevent accidental mutations of registered APIs. | Guards shared exports. |

### Runtime, Persistence & Offline

| Token | Provides | Notes |
| --- | --- | --- |
| `cinePersistence` | Data integrity facade for storage, autosave, backups, restore, and share flows. | All user data writes must flow through this token. |
| `cineOffline` | Offline helpers for service worker registration and cache recovery. | Safe when service worker is unavailable. |
| `cineRuntime` | Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact. | Guards critical operations to prevent data loss. |
| `cineRuntimeGuard` | Runtime backfill and integrity helpers reused by the legacy entry point. | Used by bootstrap probes. |

### Diagnostics & Shared Utilities

| Token | Provides | Notes |
| --- | --- | --- |
| `cineLogging` | Structured logging utilities for debugging and diagnostics. | Adds persistence-safe logging history. |
| `cineLoggingResolver` | Helpers to resolve cineLogging instances and console fallbacks across runtimes. | Keeps diagnostics resilient. |
| `cineCoreShared` | Shared helpers for deterministic stringification, weights, and version markers. | Also exposes `APP_VERSION`. |
| `cineLocale` | Language helpers shared between the runtime core and UI modules. | Handles RTL metadata updates. |

### UI & Presentation

| Token | Provides | Notes |
| --- | --- | --- |
| `cineUi` | UI controller registry for dialogs, interactions, orchestration, and help copy. | Coordinate with help and routing. |
| `cineHelp` | Shared registry for in-app help entries and resolvers. | Drives the help drawer contents. |
| `cineSettingsAppearance` | Appearance and settings helpers for the application UI. | Manages themes and preferences. |
| `cineResults` | Power summary localisation and runtime feedback coordination. | Used by results rendering. |
| `cineGearList` | Gear list generation, serialization, and DOM extraction helpers. | Supports print/export flows. |

### Feature Modules

| Token | Provides | Notes |
| --- | --- | --- |
| `cineFeatureAutoGearRules` | Automatic gear rule cloning, factory defaults, and seeding helpers. | Supports auto-gear flows. |
| `cineFeatureBackup` | Backup and restore helpers for snapshots, payload normalization, downloads, and diff metadata. | Protects user data. |
| `cineFeaturePrint` | Print orchestration for overview exports and PDF generation. | Triggers print workflows. |
| `cineFeaturePrintPreview` | Print preview modal helpers. | Coordinates preview UI. |
| `cine.features.connectionDiagram` | Connection diagram rendering and interactions. | Powers wiring diagrams. |
| `cine.features.contacts` | Shared helpers for contacts management. | Persists with planner backups. |
| `cine.features.featureSearchNormalization` | Normalization helpers for feature search, including measurement units and punctuation folding. | Feeds feature search. |
| `cine.features.featureSearchEngine` | Search engine utilities for normalising values, tokenising queries, and ranking feature results. | Core search engine. |
| `cine.features.featureSearch` | Helpers for feature search normalisation, highlighting, and detail formatting. | UI search support. |
| `cine.features.help` | Helpers for install guidance, platform detection, and iOS PWA help lifecycle. | Used by onboarding flows. |
| `cine.features.helpContent` | Populates the help dialog with topics from translations. | Keeps help copy in sync. |
| `cine.features.onboardingTour` | Guided onboarding tutorial for Cine Power Planner workflows. | Runs the first-run tour. |
| `cine.features.ownGear` | Shared helpers for personal gear persistence. | Integrates with auto gear rules. |


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
