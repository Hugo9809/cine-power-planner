# Implementation Plan - Batch 9: Runtime Glue Migration

This plan covers the migration of `app-core-runtime-ui.js`, `app-core-runtime-shared.js`, and `app-core-runtime-helpers.js` to the new ESM architecture. These modules constitute the "Runtime Glue" that binds the application together, handling UI bridging, shared runtime state, and various core helpers.

## User Review Required

> [!NOTE]
> This batch focuses on clearing `src/scripts/core` of runtime infrastructure logic. The original files will be converted to shims to ensure legacy code (like `app-core-new-1.js` and `app-core-new-2.js`) continues to function without interruption.

## Proposed Changes

### Core Runtime Modules

#### [NEW] `src/scripts/modules/core/runtime-ui.js`
- Extract `createRuntimeUiBridge` and fallback logic from `src/scripts/core/app-core-runtime-ui.js`.
- Provide pure ESM exports for:
    - `escapeHtml`
    - `escapeButtonLabelSafely`
    - `resolveButtonIconMarkup`
    - `setButtonLabelWithIcon`
    - `whenElementAvailable`
- Utilize `src/scripts/modules/ui-helpers.js` where applicable instead of duplicated inline fallbacks.

#### [MODIFY] `src/scripts/core/app-core-runtime-ui.js`
- Convert to a shim.
- Import `src/scripts/modules/core/runtime-ui.js`.
- Maintain `wrapper` IIFE or global assignment structure matching original behavior (`cineCoreRuntimeUiBridge`).

#### [NEW] `src/scripts/modules/core/runtime-shared.js`
- Extract `CORE_RUNTIME_SHARED` resolution logic from `src/scripts/core/app-core-runtime-shared.js`.
- Clean up dependencies on global scopes where possible.
- Export `CORE_RUNTIME_SHARED` and associated tools (`CORE_RUNTIME_SHARED_NAMESPACE_TOOLS`, etc.).

#### [MODIFY] `src/scripts/core/app-core-runtime-shared.js`
- Convert to a shim.
- Import `src/scripts/modules/core/runtime-shared.js`.
- Re-export globals for `app-core-new-1.js`.

#### [NEW] `src/scripts/modules/core/runtime-helpers.js`
- Extract logic from `src/scripts/core/app-core-runtime-helpers.js`.
- Functions to migrate:
    - `fallbackStableStringify`
    - `fallbackHumanizeKey`
    - `createArrayFromCandidates`
    - `createDefaultLanguageTexts`
    - `fallbackNormalizeAutoGearWeightOperator`
    - `fallbackNormalizeAutoGearWeightValue`
    - `fallbackFormatAutoGearWeight`
    - `resolveAutoGearWeightHelpers`
    - `resolveRuntimeScopeTools`

#### [MODIFY] `src/scripts/core/app-core-runtime-helpers.js`
- Convert to a shim.
- Import `src/scripts/modules/core/runtime-helpers.js`.
- Re-export `CORE_PART2_RUNTIME_HELPERS` and individual functions globally.

### Documentation

#### [MODIFY] `task.md`
- Add "Batch 9: Runtime Glue".

#### [MODIFY] `docs/dev/reports/runtime-refactor-status-2025.md`
- Add "Step 40 Complete".

#### [MODIFY] `CODEBASE_MAP.md`
- Add new modules to `src/scripts/modules/core/`.

## Verification Plan

### Automated Tests
- `npm run test:jest tests/unit/modules/coreRuntimeUi.test.js` (To be created)
- `npm run test:jest tests/unit/modules/coreRuntimeShared.test.js` (To be created)
- `npm run test:jest tests/unit/modules/coreRuntimeHelpers.test.js` (To be created)

### Manual Verification
- Open the application.
- Verify basic UI interactions (buttons, icons).
- Verify Auto Gear logic (if accessible/testable via console).
- Verify no console errors regarding missing `CORE_RUNTIME_SHARED` or helpers.
