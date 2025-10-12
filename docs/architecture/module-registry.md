# Module registry operating notes

The module registry is the shared phone book that keeps every frozen API—persistence, offline
helpers, runtime orchestration, UI controllers—discoverable even when Cine Power Planner boots from
disk. Understanding how registration, queuing and blueprints behave is critical to preserving the
offline guarantees documented for saves, backups, sharing and translations.

## Registration pipeline
- **Name normalisation.** `normalizeName()` trims and validates identifiers so modules cannot be
  registered under ambiguous labels, preventing duplicate persistence bindings or UI controllers from
  shadowing each other.【F:src/scripts/modules/registry.js†L245-L371】
- **Frozen exports.** `register()` deep-freezes the exported API unless callers opt out, records
  metadata and reuses existing entries when `replace` is not set. This ensures runtime integrity
  checks always inspect immutable contracts.【F:src/scripts/modules/registry.js†L323-L359】
- **Metadata.** `describe()` and `describeAll()` expose descriptions, categories and connection lists
  so documentation tooling can surface module relationships inside checklists and audit packets without
  touching the runtime directly.【F:src/scripts/modules/registry.js†L373-L502】

## Deferred registration and recovery
- **Queue mirroring.** When a module registers before the registry itself is available—common during
  boot or tests—`queueRegistrationPayload()` stores a frozen payload in a per-scope queue so nothing is
  lost. The queue is attached using non-enumerable properties to avoid polluting global snapshots used
  in persistence exports.【F:src/scripts/modules/registry.js†L604-L789】
- **Flush scheduling.** `schedulePendingFlush()` and `flushPendingRegistrations()` replay queued
  payloads with retry support. They reschedule failures to keep eventual consistency even when a module
  temporarily throws (for example, during storage quota sweeps).【F:src/scripts/modules/registry.js†L600-L676】

## Blueprint helpers
Blueprints package metadata, immutable registration options and optional factories so features can
ship consistent APIs across builds without duplicating boilerplate:
- `createBlueprint()` validates required metadata, freezes the descriptor and returns a `register`
  helper that instantiates the API (or reuses a static object) before calling into the registry.【F:src/scripts/modules/registry.js†L791-L967】
- The resulting blueprint keeps cached instances and exposes `createRegistrationOptions()` so modules
  can override descriptions or connections while still inheriting the default freeze behaviour.【F:src/scripts/modules/registry.js†L827-L964】

## Global exposure
At the end of the file the registry is attached to every available global scope (`globalThis`,
`window`, `self`, Node globals) and any pending queue is flushed. This mirrors the behaviour relied on
by `cineRuntime` and its integrity scan, guaranteeing documentation runs hit the same registry as the
runtime.【F:src/scripts/modules/registry.js†L982-L1016】【F:src/scripts/modules/runtime.js†L2201-L2334】

## Maintenance checklist
1. **After adding modules,** confirm their registrations run without queue retries by watching the
   console for warnings and by invoking `cineRuntime.verifyCriticalFlows()` during offline rehearsals.【F:src/scripts/modules/runtime.js†L2216-L2335】
2. **When documentation references module metadata,** prefer `describeAll({ category: 'persistence' })`
   rather than hard-coded lists so translations and printed guides stay in sync with the runtime
   registry.【F:src/scripts/modules/registry.js†L373-L502】
3. **Keep blueprints immutable.** If a module must register lazily, update the blueprint instead of
   mutating the frozen API. The registry caches blueprint metadata and will queue retries automatically
   if instantiation throws, protecting offline boots from partial registrations.【F:src/scripts/modules/registry.js†L823-L944】

Treating the registry as the source of truth keeps every offline safeguard discoverable and preserves
the guarantees documented elsewhere in this folder.
