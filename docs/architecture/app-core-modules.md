# App Core Modules Overview

The Cine Power Planner runtime is intentionally split into self-contained
modules so every safeguard can be rehearsed, audited and proven while crews are
fully offline. This document refreshes the hand-off map between modules after
an end-to-end review of the app and highlights the seams that keep saving,
sharing, importing, backup and restore workflows lossless.

## Boot pipeline

1. **`src/scripts/script.js`** performs capability detection, preheats
   localisation bundles, registers service worker listeners and initialises the
   runtime guard surface before any UI is drawn. Cached installs keep running
   until crews explicitly accept an update, preventing mid-rehearsal surprises.
2. **`src/scripts/loader.js`** resolves the active runtime context (window,
   worker or legacy sandbox), attaches the module registry and preloads locally
   stored Uicons and fonts so first paint succeeds without network access.
3. **`src/scripts/app-core-new-1.js`** wires the shared helper layer: logging,
   diagnostics, print flows and icon registration. It freezes shared state
   objects so later modules cannot mutate live data accidentally.
4. **`src/scripts/app-core-new-2.js`** registers UI controls, dialog wiring and
   autosave overlays. It exposes hooks that session orchestration uses to keep
   autosave, backup prompts and restore states in sync with the interface.

## Session orchestration

- **`src/scripts/app-session.js`** manages project lifecycle. It builds fresh
  workspaces, restores projects, tracks dirty state, coordinates autosave/manual
  save/backup events and ensures every destructive action captures a redundant
  snapshot before touching live data. All reads and writes travel through the
  persistence gateway so schema upgrades and checksum validation always run.
- **`src/scripts/app-events.js`** centralises timing. It throttles bursty edits,
  schedules autosave flushes (every 50 tracked changes or 10 minutes), forces
  backups ahead of imports/profile switches and mirrors the documentation and
  automated test cadence exactly.
- **`src/scripts/app-setups.js`** renders gear selectors, automatic gear rules
  and scenario helpers. Emitted events are structured so the session module can
  persist results immediately while offline.
- **`src/scripts/app-core-new-2.js`** provides localisation, dialog and
  diagnostic helpers so orchestration can surface human-friendly warnings in any
  translated UI without needing network assets.

## Persistence & redundancy

- **`src/scripts/modules/persistence.js`** is the frozen gateway used by UI
  modules and the service worker. It exposes `loadCurrentProject`, `saveProject`,
  `exportPlannerBackup`, `restoreFromBackup`, checksum helpers and schema
  migration guards. Every consumer goes through this layer to guarantee mirrored
  backups, validation and conflict-free upgrades.
- **`src/scripts/storage.js`** implements storage. It mirrors critical keys into
  backup slots, deep clones payloads before writes, performs schema upgrades,
  enforces quota-friendly compression and never mutates live workspace objects.
  Autosave snapshots, planner backups, project bundles and automatic gear rules
  share a normalised format so one verification sweep proves all pathways.
- **`src/scripts/modules/runtime.js`** aggregates guard results and exposes
  `window.__cineRuntimeIntegrity` so verification drills can capture a single
  diagnostic snapshot proving save/share/import/backup/restore integrity.

## Offline & safety instrumentation

- **Service worker (`service-worker.js`)** precaches HTML, scripts, styles,
  icons, fonts and help content that ship with the repository. It does not fetch
  external resources and it prompts before activating updates so crews remain on
  a verified build until they rehearse the new one.
- **`manifest.webmanifest` plus `src/styles/`** deliver install metadata and
  ensure locally stored Uicons and fonts resolve on the first load.
- **`src/scripts/modules/offline.js`** surfaces offline status indicators and
  cache warmers so large updates can be tested before field deployment.
- **`src/scripts/modules/telemetry.js`** (local-only) records diagnostics for
  verification packets without transmitting any user data.

## Change management guardrails

1. Update `src/scripts/translations.js` and associated locale bundles whenever a
   string changes so all languages stay aligned.
2. Extend `service-worker-assets.js` whenever new files ship; cached builds must
   match the repository for offline parity.
3. Add automated tests in `tests/` to exercise new autosave, backup, restore or
   sharing paths before merging.
4. Refresh every relevant document in `docs/`, including help, drills and audit
   checklists, so crews rehearsing offline receive exact guidance.

Following this map keeps the architecture transparent and reinforces the
non-negotiable priority: never lose user data.
