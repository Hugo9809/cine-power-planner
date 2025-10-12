# App Core Module Map

Cine Power Planner's core modules are deliberately frozen and registered through the
runtime linker so that every offline workflow, save path and translation hook shares
the exact same behaviour across browsers. Each module is exposed through the global
registry and is protected by the runtime integrity guard, making the architecture easy
to audit during documentation runs and backup rehearsals.【F:src/scripts/modules/runtime.js†L2203-L2366】【F:src/scripts/modules/runtime-guard.js†L318-L380】

## 1. Shared foundation – `cineCoreShared`
- **Purpose:** Provide deterministic helpers such as the global `APP_VERSION`, stable
  stringification and LZString accessors that keep exports, caches and service workers
  aligned even when crews operate fully offline.【F:src/scripts/modules/core-shared.js†L1040-L1119】
- **Consumers:** Loader, service worker asset manifest, persistence wrappers, export
  encoders, integrity diagnostics.【F:service-worker.js†L1-L118】
- **Maintenance notes:** Update release documentation whenever shared helpers change so
  cache busting, offline rehearsals and printed guides continue to match the shipped
  runtime.【F:service-worker.js†L1-L118】

## 2. Project intelligence – `cineCoreProject`
- **Purpose:** Derive project signatures, lookup helpers and metadata normalisers that
  power diffing, diagnostics and auto-gear rule evaluations without touching network
  services.【F:src/scripts/modules/core/project-intelligence.js†L244-L296】【F:src/scripts/modules/features/auto-gear-rules.js†L1-L120】
- **Consumers:** Autosave workflows, restore comparisons, automatic gear generators and
  runtime diagnostics that rely on reproducible calculations.【F:src/scripts/modules/persistence.js†L1036-L1100】
- **Maintenance guardrails:** The module exposes lazy getters and a deterministic install
  path so registry consumers always receive frozen APIs. Extend behaviour by adding new
  export names rather than mutating live objects.【F:src/scripts/modules/core/project-intelligence.js†L244-L296】

## 3. Persistence guard – `cineCoreGuard`
- **Purpose:** Coordinate autosave enforcement, restoration rehearsals and backup
  fallbacks so manual saves, automatic backups and share/import boundaries never lose
  data.【F:src/scripts/modules/core/persistence-guard.js†L276-L313】【F:src/scripts/modules/persistence.js†L900-L1100】
- **Consumers:** Quick safeguard buttons, restore rehearsals and verification utilities in
  the settings dialog that surface autosave status and backup timestamps.【F:index.html†L2722-L2799】
- **Maintenance notes:** Register new safeguards through the guard so the runtime integrity
  check confirms coverage before releases.【F:src/scripts/modules/runtime.js†L2203-L2366】

## 4. Experience enablement – `cineCoreExperience`
- **Purpose:** Provide UI orchestration such as feature discovery metadata, localisation
  bridges and experience toggles (dark mode, pink mode, accessibility) that stay bundled
  with offline assets.【F:src/scripts/modules/core/experience.js†L290-L327】【F:index.html†L1-L120】
- **Consumers:** Help centre, translation tables and feature search which rely on
  experience metadata to surface guidance while offline.【F:src/scripts/translations.js†L120-L220】
- **Maintenance notes:** Because the API is frozen and registered, update translation keys
  and help copy alongside experience changes so runtime diagnostics remain clean.【F:src/scripts/modules/core/experience.js†L290-L327】

## Core maintenance practices
- Keep every module registration frozen and linked so the runtime guard can catch missing
  bindings before a release reaches crews.【F:src/scripts/modules/runtime.js†L2203-L2366】
- When adding persistence features, extend `cineCoreGuard` and `cinePersistence` together so
  autosave, backups, restore rehearsals and share flows inherit identical protections across
  browsers.【F:src/scripts/modules/persistence.js†L900-L1100】【F:src/scripts/storage.js†L1-L200】
- Exercise the integrity checker after module changes to confirm offline workflows, save
  guards and UI hooks still register correctly for audits.【F:src/scripts/modules/runtime.js†L2203-L2366】
