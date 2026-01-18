# Implementation Plan - Batch 12: Runtime Bootstrap

The goal of this batch is to migrate the complex bootstrapping logic found in `src/scripts/core/modules/app-core/bootstrap.js` to a modern ESM architecture. This logic handles environment detection, fallback initialization, and tool resolution for the application core.

## User Review Required

> [!IMPORTANT]
> This is a critical infrastructure component. The refactor must maintain exact parity with the complex fallback logic used for legacy support.

- **Complexity Rating**: 8/10 (High complexity due to intricate fallback chains and dynamic resolution)
- **Risk**: Medium (Regression could break app initialization in specific environments)

## Proposed Changes

### 1. Create New ESM Modules

We will decompose the monolithic bootstrap file into focused ESM modules:

#### `src/scripts/modules/core/bootstrap.js`
- **Purpose**: Main entry point for the bootstrap logic.
- **Exports**: `createBootstrapSuite`, `resolveBootstrapTools`, `resolveBootstrapFallbackTools`, `cineCoreAppCoreBootstrap`.
- **Dependencies**: `bootstrap-environment.js`, `bootstrap-results.js`, `runtime-module-loader.js`.

#### `src/scripts/modules/core/bootstrap-environment.js`
- **Purpose**: Handles environment detection and tool resolution.
- **Exports**: `resolveBootstrapEnvironmentTools`, `getBootstrapEnvironmentTools`, `cineCoreAppCoreBootstrapEnvironment`.

#### `src/scripts/modules/core/bootstrap-results.js`
- **Purpose**: Handles result processing and fallback scope collection.
- **Exports**: `resolveBootstrapResultsTools`, `getBootstrapResultsTools`, `cineCoreAppCoreBootstrapResults`.

### 2. Refactor Legacy Files

#### `src/scripts/core/app-core-bootstrap.js`
- **Action**: Update to import from the new ESM modules.
- **Role**: Act as a shim for backward compatibility, exposing the legacy globals.

#### `src/scripts/core/modules/app-core/bootstrap.js`
- **Action**: Transform into a lightweight shim.
- **Role**: Delegate all logic to the new `src/scripts/modules/core/bootstrap.js` module.

### 3. Verification Strategy

#### Automated Tests
- Create `tests/unit/modules/core/bootstrap.test.js` to verify:
    - Bootstrap suite creation.
    - Environment tool resolution.
    - Fallback scope collection.
    - Result processing.

#### Manual Verification
- Verify successful application boot (`npm run dev`).
- Check browser console for any bootstrap-related errors.

## Execution Steps

1.  **Extract `bootstrap-environment.js`**: Isolate environment detection logic.
2.  **Extract `bootstrap-results.js`**: Isolate result handling logic.
3.  **Create `bootstrap.js`**: Orchestrate the new modules.
4.  **Refactor Legacy Shims**: Update the old files to use the new modules.
5.  **Add Tests**: Ensure coverage for the new modules.
6.  **Verify**: run build and dev check.
