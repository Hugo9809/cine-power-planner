# App Core Modules Overview

The Cine Power Planner runtime is split across self-contained modules so crews
can rehearse, save and restore projects without a network connection. This
summary documents how the boot pipeline assembles those modules and which files
own each safeguard.

## Boot sequence

1. **`src/scripts/script.js`** detects capabilities, warms localisation bundles
   and registers service-worker listeners before any UI renders. If the build is
   already cached it defers the refresh prompt so on-set crews are never forced
   to upgrade mid-rehearsal.
2. **`src/scripts/loader.js`** discovers the available runtime context
   (top-level window, worker or legacy shim) and attaches the module registry so
   every later lookup works offline. The loader also ensures locally stored
   Uicons and fonts are preloaded before the UI unlocks.
3. **`src/scripts/modules/core/mount-voltage.js`** initialises mount voltage
   preferences, dual-write storage keys and helper exports so autosave, backup
   and restore routines always have the latest voltages before the UI binds to
   form fields.【F:src/scripts/modules/core/mount-voltage.js†L137-L208】【F:src/scripts/modules/core/mount-voltage.js†L571-L706】
4. **`src/scripts/app-core-new-1.js`** wires high level helpers such as the
   runtime guard, logging, print workflow bootstrap and icon registry. It does
   not touch project data directly but freezes the shared state objects that
   other modules reuse.
5. **`src/scripts/app-core-new-2.js`** continues the setup by registering UI
   controls, dialog wiring and autosave overlays. It exposes the hooks that the
   session manager uses to keep autosave, backup and restore prompts in sync
   with the UI.

## Session orchestration

- **`src/scripts/app-session.js`** owns project lifecycle management. It
  initialises the empty workspace, rebuilds the UI when a project is restored
  and coordinates autosave, manual saves and backups. The module talks to
  `cinePersistence` for all storage so the same logic works in workers and
  legacy contexts. Every destructive action captures a redundant snapshot before
  it touches the live state.
- **`src/scripts/app-events.js`** schedules autosave runs, throttles bursty
  edits and coordinates forced backups before high-risk operations like imports
  or profile switches. Its cadence logic (10 minute timer, 50 tracked changes
  counter and immediate flush triggers) mirrors the documentation and test
  suite.
- **`src/scripts/app-setups.js`** renders gear selectors, automatic gear rules
  and scenario tools. It emits structured events when presets change so the
  session module can persist the results immediately.
- **`src/scripts/app-core-new-2.js`** exposes convenience helpers for dialogs,
  localisation and diagnostic overlays so session orchestration can surface
  warnings in a human-friendly way even when the network is unavailable.

## Persistence and redundancy

- **`src/scripts/modules/persistence.js`** is the frozen gateway used by the UI
  and service worker to read and write planner data. It discovers the storage
  implementation defensively and exposes helpers such as `loadCurrentProject`,
  `saveProject`, `exportPlannerBackup` and `restoreFromBackup`. All consumers go
  through this layer to guarantee mirrored backups, checksum validation and
  schema migrations run before data is exposed to the rest of the app.
- **`src/scripts/storage.js`** implements the persistence helpers. It mirrors
  every critical key into a backup slot, deep clones data before writes,
  performs schema upgrades and enforces quota-friendly compression rules that
  never touch the live workspace. Autosave snapshots, planner backups, project
  bundles and automatic gear presets all use the same normalised format so a
  single verification covers every workflow.
- **`src/scripts/modules/runtime.js`** aggregates guard results from each module
  and exposes `window.__cineRuntimeIntegrity`. The guard validates that critical
  save/share/restore pathways are wired correctly, that backup mirrors are in
  place and that offline caches reference the bundled assets.

## Offline foundations

- **Service worker (`service-worker.js`)** pre-caches HTML, scripts, styles,
  icons, fonts and help content bundled in the repository. It never fetches
  external resources and prompts before activating updates so teams retain a
  known-good build until they rehearse the new one.
- **`manifest.webmanifest` and `src/styles`** provide the offline install
  experience and ensure the locally stored Uicons plus fonts are available on
  first load.
- **`src/scripts/modules/offline.js`** exposes helpers that the UI uses to show
  offline indicators and to warm caches after large updates.

## Keeping modules aligned

1. Update translations (`src/scripts/translations.js`) whenever UI strings move.
2. Add new assets to `service-worker-assets.js` so cached builds stay complete.
3. Extend automated tests in `tests/` to cover new autosave or restore paths.
4. Refresh the documentation suite in `docs/` whenever behaviours change so
   crews rehearsing offline receive accurate guidance.

Following this map keeps the architecture transparent and ensures future changes
continue to protect user data first.
