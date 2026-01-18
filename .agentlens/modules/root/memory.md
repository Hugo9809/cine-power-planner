# Memory

[← Back to MODULE](MODULE.md) | [← Back to INDEX](../../INDEX.md)

## Summary

| High 🔴 | Medium 🟡 | Low 🟢 |
| 4 | 7 | 31 |

## 🔴 High Priority

### `DEPRECATED` (src/scripts/core/app-core-runtime-support.js:46)

> export const CORE_RUNTIME_SUPPORT_RESOLUTION = null; // Deprecated

### `SAFETY` (src/scripts/modules/logging.js:771)

> First: We capture the *original* console functions first so we never create infinite loops.

### `SAFETY` (src/scripts/shims/legacy-globals-shim.js:151)

> check for window.devices structure which is critical for the V2 UI

### `WARNING` (tests/unit/storageMigrationRobust.test.js:120)

> logic says `if (keys.length === 0)`.

## 🟡 Medium Priority

### `HACK` (tests/unit/factoryReset.test.js:52)

> storage.js skips BroadcastChannel if JEST_WORKER_ID is present.

### `TODO` (tests/unit/storage.test.js:597)

> This test requires rewrite for new StorageRepository architecture.

### `TODO` (tests/unit/storage.test.js:1950)

> This test requires rewrite for new StorageRepository architecture.

### `TODO` (tests/unit/storage.test.js:1995)

> This test requires rewrite for new StorageRepository architecture.

### `TODO` (tests/unit/storage.test.js:2112)

> This test requires rewrite for new StorageRepository architecture.

### `TODO` (tests/unit/storage.test.js:2204)

> This test requires rewrite for new StorageRepository architecture.

### `TODO` (tests/unit/storage.test.js:2974)

> This test requires rewrite for new StorageRepository architecture.

## 🟢 Low Priority

### `NOTE` (dist/service-worker.js:1178)

> We already tried to get a response above. If we are here, it means

### `NOTE` (legacy/polyfills/regenerator-runtime.js:231)

> that simple async functions are implemented on top of

### `NOTE` (legacy/polyfills/regenerator-runtime.js:341)

> ["return"] must be used for ES3 parsing compatibility.

### `NOTE` (service-worker.js:1178)

> We already tried to get a response above. If we are here, it means

### `NOTE` (src/scripts/core/app-core-new-2.js:1784)

> autoGearAutoPresetIdState is already declared at line 720 with var.

### `NOTE` (src/scripts/core/app-core-new-2.js:1787)

> autoGearAutoPresetIdState is declared at line ~720 with declareCoreFallbackBinding

### `NOTE` (src/scripts/core/app-core-new-2.js:2145)

> autoGearPresetNameDialog, autoGearPresetNameForm, autoGearPresetNameLabel,

### `NOTE` (src/scripts/core/app-core-new-2.js:5558)

> dialog might not render newlines well unless it uses white-space: pre-wrap

### `NOTE` (src/scripts/core/app-session.js:10)

> Some of these might be available on window, but we import them to be explicit and avoid lint/runtime errors if window is not ready.

### `NOTE` (src/scripts/modules/overview/print-manager.js:39)

> checks for global window functions to support legacy behavior

### `NOTE` (src/scripts/modules/results.js:3400)

> This model assumes constant power draw. In reality, devices may fluctuate.

### `NOTE` (src/scripts/modules/runtime-module-loader.js:73)

> Stubbed out require logic for ESM environment

### `NOTE` (src/scripts/modules/ui/auto-gear-ui.js:14)

> Mutable globals like currentLang need to be accessed via scope directly

### `NOTE` (src/scripts/storage.js:12796)

> we don't want forMutation: true here because we are in the middle of a save.

### `NOTE` (src/scripts/storage.js:15113)

> Since this is a synchronous load for UI, and backups might be large,

### `NOTE` (src/scripts/storage.js:15172)

> Auto Gear Backups are large, so we might skip full in-memory caching if needed,

### `NOTE` (src/scripts/v2/bootstrap.js:333)

> In a pure module system, we would return the exports,

### `NOTE` (src/scripts/v2/legacy-shim.js:357)

> The cache might contain the monolith object itself as a value for that key

### `NOTE` (src/scripts/v2/legacy-shim.js:618)

> Confirm dialog blocks main thread, so timeout starts AFTER dialog closes.

### `NOTE` (src/scripts/v2/project-detail.js:552)

> We render *containers* for the legacy selects, not the selects themselves.

### `NOTE` (src/scripts/v2/project-detail.js:903)

> generateGearListHtml uses the passed argument, but we should also ensure app state is consistent if possible.

### `NOTE` (src/scripts/v2/project-detail.js:1117)

> We observe the results container, not a specific node.

### `NOTE` (src/scripts/v2/project-detail.js:1192)

> createDetailViewContent() sets innerHTML directly, doesn't return a value

### `NOTE` (src/scripts/v2/sidebar.js:526)

> injectDatabaseToggle was removed - device database is now

### `NOTE` (src/scripts/v2/view-manager.js:525)

> In module system, we prefer explicit init, but for now keeping this logic

### `NOTE` (tests/unit/factoryReset.test.js:88)

> checking if onmessage is a function

### `NOTE` (tests/unit/forcePopulate.test.js:77)

> In the module, we try to populate via document.getElementById.

### `NOTE` (tests/unit/storage.test.js:1857)

> In the new architecture (StorageRepository + memory cache), deletion backups

### `NOTE` (tests/unit/storage.test.js:1940)

> In the new architecture, loadAutoGearBackups returns cached data or

### `NOTE` (tests/unit/storage.test.js:2298)

> In the new architecture, migration backups are managed by

### `NOTE` (tests/unit/storage.test.js:2327)

> In the new architecture, legacy key migration happens at module

