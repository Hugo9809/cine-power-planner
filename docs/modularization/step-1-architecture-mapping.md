# Step 1 – Core Architecture Mapping

## Purpose and Scope
This document maps the current Camera Power Planner runtime into high-level domains, traces the existing save/share/import pipelines, and identifies shared utilities. It concludes with a proposed module structure that preserves the app’s offline-first behaviour and uncompromising data safety guarantees.

## Current Domain Boundaries
| Domain | Primary Responsibilities | Key Modules / Assets |
| --- | --- | --- |
| Data persistence & backups | Local/session storage accessors, schema migrations, autosave durability, backup rotation | `storage.js`, persistence helpers in `app-session.js` and `app-setups.js` |
| Offline sync & delivery | Service worker caching, sequential loader bootstrap, compatibility fallbacks | `service-worker.js`, `loader.js`
| UI orchestration & interaction | State collection, autosave scheduling, dialog workflows, setup CRUD, event wiring | `app-session.js`, `app-setups.js`, `app-events.js`
| Domain data & calculations | Project info derivation, setup signatures, auto gear utilities | `app-core-new-1.js`, `app-core-new-2.js`
| Shared utilities | Stable serialization, backup download helper, cloning helpers, localisation lookups | `app-core-new-2.js`, `app-session.js`, `app-setups.js`

### Data Persistence & Backup Infrastructure
* `storage.js` centralises storage keys, migration helpers, and project persistence safeguards. It defines all durable keys (projects, sessions, backups, fonts, schemas) and enforces quotas while creating automatic backups during destructive operations.【F:src/scripts/storage.js†L1-L189】【F:src/scripts/storage.js†L3841-L4067】
* Project saves are normalised and wrapped in migration backups before being written, ensuring that schema upgrades and deletions never discard data without an emergency copy.【F:src/scripts/storage.js†L3899-L3998】
* Gear list persistence augments setup entries with project info snapshots, selectors, diagram positions, and auto-gear rules so that reloading a session restores the exact UI and data context.【F:src/scripts/app-setups.js†L3950-L4067】

### Offline Sync & Delivery
* The service worker precaches the full runtime (scripts, data, icons, fonts) and applies a resilient per-asset fallback when bulk caching fails, maintaining offline readiness even on partial failures.【F:service-worker.js†L1-L165】
* During installation and activation it upgrades the cache atomically and claims clients so refreshed tabs immediately use the latest offline bundle.【F:service-worker.js†L167-L189】
* `loader.js` sequentially injects the modern or legacy script bundles, guaranteeing that foundational modules (storage, translations, core halves, events, setups, session, autosave overlay) load before UI code executes—critical for offline bootstrap sequencing.【F:src/scripts/loader.js†L442-L539】

### UI Orchestration & Interaction
* `app-session.js` captures project form state, collects derived metadata, and stores session snapshots whenever the user changes inputs. It also manages autosave retry policies and guards to ensure recoverability on error.【F:src/scripts/app-session.js†L1600-L1787】
* `app-setups.js` drives share dialogs, setup persistence, and gear list generation while keeping locally stored diagrams, selectors, and feedback aligned with session data.【F:src/scripts/app-setups.js†L105-L232】【F:src/scripts/app-setups.js†L3950-L4067】
* `app-events.js` flushes autosave queues, triggers additional backups, and restores prior project state when switching setups so no transition drops unsaved work.【F:src/scripts/app-events.js†L400-L503】

### Domain Data & Shared Utilities
* The split core files compute project info, manage shared-import state, and provide deterministic helpers such as `stableStringify` used across persistence and comparison logic.【F:src/scripts/app-core-new-1.js†L10130-L10191】【F:src/scripts/app-core-new-2.js†L8685-L8717】
* `app-session.js` includes `downloadBackupPayload`, enabling consistent export handling across manual backups, project shares, and recovery workflows without depending on external services.【F:src/scripts/app-session.js†L4557-L4599】

## Save, Share, Import, Backup & Restore Flows
### Save & Autosave
1. `saveCurrentSession` captures the full project form (including derived project info, manual diagram positions, and auto gear highlight flags) and persists it into session storage, chaining into `saveCurrentGearList` unless explicitly skipped.【F:src/scripts/app-session.js†L1600-L1639】
2. `autoSaveCurrentSetup` normalises the current setup, stores diagram positions and gear list HTML, writes through to `storeSetups`, and re-runs `saveCurrentSession` to keep both storage layers aligned.【F:src/scripts/app-session.js†L1642-L1677】
3. The autosave scheduler builds guarded executions: it runs setup autosave, falls back to session-only saves when needed, and retries with exponential backoff while logging failures without aborting subsequent attempts.【F:src/scripts/app-session.js†L1755-L1787】
4. `app-events.js` forces an immediate autosave flush (or manual save fallback) before setup switches, then snapshots the outgoing setup (including diagram positions and auto-gear rules) to prevent mid-transition data gaps.【F:src/scripts/app-events.js†L400-L487】

### Gear List Persistence
`saveCurrentGearList` mirrors the live gear list HTML, selectors, project info snapshot, diagram positions, and project-scoped auto gear rules into both the project store and the selected setup entry, using override contexts when a rename is in progress to avoid misrouting data.【F:src/scripts/app-setups.js†L3950-L4037】

### Share / Export Flow
* The share button queues a gear list save, derives a default filename, and—if the modal UI is available—validates the filename, toggles auto-gear inclusion, and invokes `downloadSharedProject`. Fallback prompts (when dialogs are unavailable) still run export confirmation and inclusion prompts before downloading.【F:src/scripts/app-setups.js†L234-L318】
* `downloadSharedProject` composes a full project payload (setup metadata, project info, selectors, gear HTML, device overrides, feedback, and optionally auto-gear coverage) and hands it to `downloadBackupPayload`, surfacing user-facing success/failure messaging and manual download fallback instructions.【F:src/scripts/app-setups.js†L105-L232】【F:src/scripts/app-session.js†L4557-L4599】

### Import Flow
* Shared project imports read the selected file, parse JSON, and determine whether to prompt the user about shared auto-gear rules. Before applying, `prepareSharedImportContext` forces an autosave, clears current setup selections, and resets the input fields so the new data does not override unsaved local work.【F:src/scripts/app-core-new-1.js†L10110-L10191】

### Backup Creation & Rotation
* `collectFullBackupData` aggregates exported state, merges automatic gear rules from both in-memory and stored sources, and records diagnostics whenever fallback recovery is needed to ensure every backup remains lossless.【F:src/scripts/app-session.js†L6096-L6197】
* `createSettingsBackup` packages the collected data, downloads it via the shared payload helper, and drives UI notifications while catching and reporting any errors. It underpins the manual backup button, automatic pre-restore backups, and scripted backups from other modules.【F:src/scripts/app-session.js†L6200-L6249】

### Restore Workflow
* Initiating a restore automatically creates a fresh full backup, snapshots both localStorage and sessionStorage, and remembers the prior setup selection for rollback. If restore parsing fails, it restores the snapshots, reloads logos and auto-gear rules, and reapplies preferences to guarantee data continuity.【F:src/scripts/app-session.js†L6278-L6359】

## Shared Utility Inventory
* Deterministic serialization (`stableStringify`) keeps diffing, backup comparison, and signature calculations consistent across reloads.【F:src/scripts/app-core-new-2.js†L8685-L8717】
* Backup download helper (`downloadBackupPayload`) standardises payload export logic, supporting Blob, MS Save, and manual window fallbacks.【F:src/scripts/app-session.js†L4557-L4599】
* Gear list cloning utilities and project snapshot helpers ensure complex nested data (selectors, diagrams, project info) are deep-copied before persistence to avoid mutation side effects.【F:src/scripts/app-setups.js†L3950-L4014】
* Shared-import state helpers manage prompt visibility, previous preset tracking, and rule application modes so imports integrate cleanly with existing presets.【F:src/scripts/app-core-new-1.js†L10130-L10199】

## Proposed High-Level Module Structure
To modularise the core without sacrificing offline resilience or data safety, split responsibilities into the following packages:

1. **`core/persistence`** – Encapsulate storage keys, local/session accessors, migration routines, autosave scheduling hooks, and project/save/gear-list persistence. Provide transactional APIs that automatically snapshot data before destructive writes.【F:src/scripts/storage.js†L3899-L3998】【F:src/scripts/app-setups.js†L3950-L4037】
2. **`core/backup`** – Own backup aggregation, download handling, backup diff UI bindings, and restore orchestration (including snapshot/rollback helpers). Export high-level commands like `createBackup`, `listBackups`, and `restoreFromFile` that always guard against data loss.【F:src/scripts/app-session.js†L6096-L6359】
3. **`core/offline`** – Manage service worker registration, cache lifecycle, and loader sequencing so the persistence and UI modules bootstrap predictably offline. Expose health diagnostics when assets fail to precache.【F:service-worker.js†L1-L189】【F:src/scripts/loader.js†L442-L539】
4. **`core/ui`** – Coordinate forms, dialogs, and event listeners. Provide controllers for session capture, setup CRUD, sharing UI, and autosave triggers while consuming persistence APIs rather than touching storage directly.【F:src/scripts/app-session.js†L1600-L1787】【F:src/scripts/app-setups.js†L105-L318】【F:src/scripts/app-events.js†L400-L503】
5. **`core/domain`** – House project-info derivation, setup signatures, auto-gear computations, and shared-import logic so both UI and persistence layers reuse consistent business rules.【F:src/scripts/app-core-new-1.js†L10110-L10199】【F:src/scripts/app-core-new-2.js†L8685-L8717】
6. **`core/shared`** – Centralise utilities (stable stringify, cloning, localisation lookups, download helpers) used across modules to avoid circular dependencies and ensure single implementations of safety-critical helpers.【F:src/scripts/app-session.js†L4557-L4599】【F:src/scripts/app-setups.js†L3950-L4014】

### Integration Guarantees
* Modules must expose explicit contracts for save, autosave, share, import, backup, and restore so the UI controller can orchestrate workflows without duplicating storage logic.
* Persistence and backup packages should accept dependency injections for logging/notifications to keep offline behaviour deterministic when network calls are impossible.
* Offline and backup modules must default to local assets and never rely on remote resources, maintaining the existing offline-first promise and preventing data exposure outside the device.【F:service-worker.js†L1-L165】

By aligning the current functionality with these module boundaries, we can untangle the monolithic core while maintaining the human-friendly design, offline readiness, and uncompromising user-data protection that the current implementation already enforces.
