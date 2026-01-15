# Tooling Reference

This document catalogs the helper scripts located in `tools/`. These scripts are the "Swiss Army Knife" of the repository, handling data integrity, schema generation, and build tasks.

## Data Maintenance

### `checkConsistency.js`
*   **Command**: `npm run check-consistency`
*   **Purpose**: The "Linter" for our JSON data.
*   **Checks**:
    *   Validates `src/data/devices/*.js`.
    *   Ensures all devices have IDs, valid Voltage Families, and Names.
    *   Checks for duplicate IDs.
*   **When to run**: Git hook (pre-commit) or manual verification after editing data.

### `normalizeData.cjs`
*   **Command**: `npm run normalize`
*   **Purpose**: The "Janitor".
*   **Action**:
    *   Iterates through all device files.
    *   Sorts keys alphabetically.
    *   Standardizes connector names (e.g., "3-pin Fischer" -> "Fischer 3-Pin").
*   **Safety**: Modifies files in place. Always commit before running.

### `unifyPorts.cjs`
*   **Command**: `npm run unify-ports`
*   **Purpose**: Mass-refactor tool for connector names.
*   **Action**: Similar to normalize, but specifically targets the `powerOutputs` array to align naming conventions across brands.

### `generateSchema.cjs`
*   **Command**: `npm run generate-schema`
*   **Purpose**: The "Contract Builder".
*   **Action**: Scans the actual data in `src/data/devices/` and generates a JSON Schema. This schema describes the *implicit* data shape enforced by the code.

## Test Runners

### `runUnitTests.cjs`
*   **Command**: `npm run test:unit`
*   **Purpose**: A wrapper around Jest/Node test runner to execute fast, isolated unit tests found in `tests/unit/`.

### `runDomTests.cjs`
*   **Command**: `npm run test:dom`
*   **Purpose**: Sets up a JSDOM environment to run heavier UI tests that require a DOM implementation.

### `test:script` (Integration)
*   **Command**: `npm run test:script`
*   **Purpose**: Runs heavy integration tests (3GB heap) with `RUN_HEAVY_TESTS=true`.

## Localization Helpers

### `scripts/validate-translations.mjs`
*   **Command**: `npm run translation:validate`
*   **Purpose**: Ensures all translation keys exist and placeholders match across languages.

### `scripts/translation-coverage.mjs`
*   **Command**: `npm run translation:coverage`
*   **Purpose**: Reports percentage of translated strings per language.

## Build Helpers

### `generateServiceWorkerAssets.cjs`
*   **Command**: `npm run generate:sw-assets` (Runs automatically during `npm run build`)
*   **Purpose**: Offline manifest generator.
*   **Action**:
    1.  Scans `dist/`.
    2.  Hashes every file (SHA-256).
    3.  Writes `dist/service-worker-assets.js`.
*   **Why**: Enables the Service Worker to know if assets have changed without downloading them.

### `generatePinkModeAnimatedIcons.cjs`
*   **Command**: `npm run generate:pink-mode-icons`
*   **Purpose**: Theme Compiler.
*   **Action**:
    1.  Reads `src/assets/lottie/*.json`.
    2.  Compiles them into a single JS module (`pink-mode-icons.js`).
*   **Why**: Performance. Loads animations from the JS bundle/cache instead of 50+ HTTP requests.

### `buildLegacy.cjs`
*   **Command**: `npm run build:legacy`
*   **Purpose**: Legacy polyfill injector.
*   **Action**: Uses internal logic (or Vite legacy plugin) to output ES5 code for older devices.
