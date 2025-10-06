# App Core Module Map

The app core orchestrates the domain logic that other camera power planner layers build upon. To keep its responsibilities maintainable and auditable we group the core services into four collaborating modules. Every module must preserve offline-first behaviour, redundant persistence protections, and localisation hygiene that keep user data safe and interfaces clear.

## 1. Project Intelligence Module
- **Purpose:** Derive project-wide metadata, power budgets, and setup signatures used throughout the planner.
- **Key services:**
  - Deterministic signature builder for setups and accessories.
  - Stable stringifier utilities that feed persistence, diffing, and export routines.
  - Metadata normalisers that guarantee comparable calculations even without network connectivity.
- **Consumers:** Session lifecycle handlers, setup catalogue, backup/export pipelines.
- **Module reference:** Implemented in `src/scripts/modules/core/project-intelligence.js` and exposed as `cineCoreProject` for registry consumers.

## 2. Persistence Guard Module
- **Purpose:** Defend user data at every mutation boundary and coordinate autosave workflows.
- **Key safeguards:**
  - Trigger autosave (or manual save fallback) before applying imports, sharing payloads, or configuration resets.
  - Clear transient selections and reset input buffers so incoming data cannot overwrite unsaved edits.
  - Maintain redundant snapshots for backup, restore, and offline recovery flows.
- **Consumers:** Share/import flows, backup rotation, session storage, restore utilities.
- **Module reference:** Implemented in `src/scripts/modules/core/persistence-guard.js` and registered as `cineCoreGuard` within the module registry.

## 3. Shared Utilities Module
- **Purpose:** Provide reusable helpers with deterministic output for other packages to consume safely.
- **Key helpers:**
  - Human-readable key formatter that keeps naming aligned across UI, exports, and help documentation.
  - Comparison and hashing utilities leveraged by diffing, signature verification, and regression tests.
  - Local caches for lookups that operate without remote dependencies.
- **Consumers:** Storage services, testing harnesses, documentation tooling, internationalisation bundles.

## 4. Experience Enablement Module
- **Purpose:** Support high-value UI and accessibility features without relying on live services.
- **Key support:**
  - Localise share, generate, export, zoom, and diagramming controls using bundled translation tables.
  - Surface help affordances and documentation hooks that stay synchronised with core behaviour.
  - Ensure accessibility metadata and keyboard mappings update together with core logic changes.
- **Consumers:** UI shell, help overlays, documentation builds, translation maintenance.
- **Module reference:** Implemented in `src/scripts/modules/core/experience.js` and exposed globally as `cineCoreExperience`.

## Cross-cutting rules
- Preserve deterministic outputs so that saved artefacts and shared payloads remain stable across sessions.
- Prefer redundancy in persistence to prevent data loss—saving more is acceptable; losing data is not.
- Maintain offline readiness by avoiding network-bound dependencies and storing required assets locally.
- Whenever core logic evolves, update help, backup/restore manuals, and translation references alongside the change.
