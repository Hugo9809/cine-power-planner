# Modularization Plan – Step 1: Architecture & Data Integrity Mapping

## 1. Current Runtime Domains

### 1.1 Persistence, Autosave, Backup, and Restore
- `src/scripts/storage.js` centralizes localStorage access, schema migrations, autosave snapshots, and backup history management, including compression fallbacks (`LZString`) and quota recovery loops to avoid data loss.
- `src/scripts/app-session.js` orchestrates backup rehearsals, restore dialogues, and backup diff UI wiring while delegating actual storage calls to `storage.js` wrappers.
- `src/scripts/app-setups.js` and `src/scripts/app-core-new-1.js` convert UI state into persistent payloads, ensure autosave overlays surface status, and pipe normalized setup data to storage helpers.
- `src/scripts/modules/persistence.js` exposes a defensive facade (`cinePersistence`) that freezes outbound payloads, routes save/load operations, and prevents accidental mutation of shared state once handed to consumers.

**Save & Autosave Flow**
1. UI triggers (e.g., `saveSetupBtn`, autosave timers) collect normalized data in `app-core-new-1.js`.
2. Serialization delegates to helpers in `app-setups.js` before calling into `storage.js` save routines.
3. `storage.js` guards writes with retry loops, schema migrations, and backup snapshots; success is surfaced back to UI overlays for user confirmation.

**Backup Flow**
1. Full backup capture begins in `app-session.js` (`collectFullBackupData`, `createSettingsBackup`).
2. `storage.js` composes payloads, prunes retention based on constants like `MAX_AUTO_BACKUPS`, and records history entries for later inspection.
3. Downloads are triggered via `downloadBackupPayload` to keep user data export local-first without external dependencies.

**Restore Flow**
1. Restore rehearsal UI in `app-session.js` previews payload impact via tables and warnings.
2. Confirmation calls `handleRestoreRehearsalProceed`, which delegates to `storage.js` import routines with staged backups and safe rollback paths to avoid overwriting data without checkpoints.

**Share & Import Flow**
1. Share dialog (wired in `app-core-new-1.js`) builds filenames, toggles auto-gear inclusion, and calls `downloadSharedProject` for export.
2. Shared file import decodes payloads (`decodeSharedSetup`) and validates differences before applying, ensuring current sessions are backed up and user confirmation is captured.

### 1.2 Offline Sync & Service Worker Responsibilities
- `service-worker.js` precaches HTML, scripts (including current `modules/` facades), fonts, locally stored icons, and data JSON to guarantee offline continuity. It retries caching item-by-item to recover from partial failures and logs missing assets for follow-up.
- `src/scripts/modules/offline.js` coordinates service worker registration, cache clearing heuristics, and fallback storage scanning to rebuild UI caches after updates, keeping schema caches consistent across app reloads.
- `src/scripts/loader.js` detects offline-ready bundles and ensures legacy compatibility to prevent regressions during staged rollouts.

**Import/Export Reliability**
Offline-enabled caching ensures exported backups and shared files remain accessible even when disconnected, while the offline module clears stale caches to avoid loading outdated schemas that could corrupt data.

### 1.3 UI Orchestration & Interaction
- `src/scripts/app-core-new-1.js` and `app-core-new-2.js` manage the majority of UI wiring: dialog lifecycles, help text binding, translation usage, and user guidance for save/share/backup features.
- `src/scripts/app-events.js`, `app-session.js`, and `autosave-overlay.js` coordinate user feedback (overlays, tooltips, icon rain) so users understand when data has been saved or restored.
- `src/scripts/modules/ui.js` surfaces convenience accessors that proxy UI helpers without re-initializing DOM bindings.

**Documentation & Translation Hooks**
- Text resources live in `src/scripts/translations.js` and are consistently referenced to keep help strings synchronized with interactions. Translation updates must accompany any new module boundaries that alter labels or instructions.

### 1.4 Shared Utilities & Bootstrapping
- `src/scripts/script.js` and `loader.js` compose the bootstrap pipeline, ensuring modern/legacy bundles load the correct runtime halves (`app-core-new-1.js`, `app-core-new-2.js`) and that `modules/` facades remain discoverable globally.
- Vendor utilities (`src/vendor/lz-string.min.js`) and global scope normalization (`globalthis-polyfill.js`) provide a consistent execution environment across browsers and offline contexts.

## 2. Proposed High-Level Module Structure
The following module boundaries keep the offline-first promise and reinforce data safety:

1. **Persistence Module**
   - Consolidate `storage.js`, autosave helpers, backup history, and share/import encoders into a `persistence/` package with clear subdomains:
     - `storage-adapters/` for localStorage interactions and schema migrations.
     - `backup/` for capture, retention, rehearsal, and download routines.
     - `sharing/` for encode/decode and dialog coordination hooks.
   - Expose a public interface consumed by UI and offline layers via `cinePersistence` to maintain immutability guarantees.

2. **Offline & Sync Module**
   - Group `service-worker.js`, cache management, and import/export resiliency helpers.
   - Provide APIs to register workers, refresh caches, and trigger offline-aware backups so UI can surface accurate status while preventing stale data usage.

3. **UI Coordination Module**
   - Extract controller logic from `app-core-new-*.js`, `app-session.js`, `app-events.js`, and `autosave-overlay.js` into distinct orchestrators:
     - `dialogs/` for save/share/restore experiences with localized help text.
     - `state/` for session binding, autosave scheduling, and active setup selection.
     - `feedback/` for overlays, accessibility hints, and animation triggers.
   - Maintain compatibility with existing DOM structure and translation keys to preserve the current human-friendly UX.

4. **Shared Utilities Module**
   - Centralize bootstrapping (`script.js`, `loader.js`), schema loaders, and vendor fallbacks into a utilities layer that both runtime bundles and service workers depend on.
   - Document explicit contracts (e.g., global namespace expectations) to avoid regressions during phased refactors.

## 3. Data Integrity Safeguards for Future Steps
- **Redundant Backups:** Preserve the existing practice of recording migration backups and pre-action snapshots (`STORAGE_MIGRATION_BACKUP_SUFFIX`) so that every module boundary still routes through centralized backup hooks.
- **Immutable Payload Contracts:** Continue freezing persistence responses before exposing them, ensuring UI code cannot mutate saved references accidentally.
- **Offline-First Testing:** Each future refactor step must validate offline loading via `service-worker.js`, verifying that cached assets include new module entry points and that precache fallbacks log any misses.
- **Documentation & Localization:** For every structural change, update help text in `translations.js`, localized READMEs, and in-app tooltips to reflect new terminology without introducing external links.
- **Icon & Asset Preservation:** All UI updates must continue referencing the locally stored icons and animations enumerated in the service worker cache list to maintain cohesive theming across offline sessions.

This mapping completes Step 1 of the modularization plan and sets the guardrails needed to refactor the runtime without compromising user data or offline reliability.
