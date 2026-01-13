# Implementation Plan - Improve Codebase Comments

This plan outlines the approach to enhance the quality and depth of comments across the Cine Power Planner codebase, specifically focusing on the core runtime and storage orchestration. The goal is to adhere to the **Semantic Code Mandate**, prioritizing "why" over "what" and documenting complex logic and public interfaces.

## Proposed Changes

### Core Runtime Layer
Enhance documentation for the dual-part core architecture, specifically explaining the resolution strategies and ESM/legacy compatibility layers.

#### [MODIFY] [app-core-new-1.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-1.js)
- Add comprehensive module-level documentation explaining Part 1's role in the bootstrap process.
- Document the `resolveAutoGearUIHelper` and `createSafeShim` patterns, explaining why they are used to prevent recursion and handle dynamic resolution.
- Enhance comments for the `TEMPERATURE_SCENARIOS` and `focusScaleValues` resolution logic.

#### [MODIFY] [app-core-new-2.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-2.js)
- Add module-level documentation explaining Part 2's role in UI orchestration and event handling.
- Document the `resolveRuntimeScopeFunction` and `createDynamicScopeFunctionResolver` patterns, explaining how they facilitate a flexible event-driven architecture.
- Explain the `declareCoreFallbackBinding` mechanism and its importance for resilience.

### Storage and Persistence Layer
Improve documentation for the storage orchestration, including the migration path from LocalStorage to IndexedDB and the cache hydration strategy.

#### [MODIFY] [storage.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/storage.js)
- Document the hybrid storage architecture (Synchronous Cache + Asynchronous IDB).
- Explain the rationale behind the `hydrateProjectCache` logic and its deterministic ordering.
- Add intent-based comments to the `LIFECYCLE_CHANNEL` logic for cross-tab coordination.
- Document the resilient deep clone strategy and why multiple fallbacks are necessary.

### Other Modules
Minor improvements to smaller, yet critical modules.

#### [MODIFY] [globals-bootstrap.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/globals-bootstrap.js)
- Document the global initialization sequence and its impact on the rest of the application.

## Verification Plan

### Automated Tests
I will run existing unit and integration tests to ensure that the added comments do not introduce any syntax errors or regressions (via accidental edits).
- `npm run test` or `npx jest tests/unit/storage.test.js`
- `npx jest tests/unit/runtimeModule.test.js`

### Manual Verification
- Start the development server using `npm run dev`.
- Verify the application boots without errors in the browser console.
- Perform basic storage operations (save/load project) to ensure persistence logic remains sound.
