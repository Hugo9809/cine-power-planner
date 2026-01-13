# Fix Duplicate Variable Declarations and ESLint Configuration

## Problem Statement

The application fails to boot due to duplicate variable declarations (`let`/`var` redeclarations) in `src/scripts/core/app-core-new-2.js`. Additionally, ESLint fails to parse ES module files due to incomplete `sourceType: 'module'` coverage.

---

## User Review Required

> [!IMPORTANT]
> **Critical runtime bug**: The application cannot start because of duplicate variable declarations. The fix involves removing redundant declaration blocks.

---

## Proposed Changes

### Duplicate Variable Declarations in `app-core-new-2.js`

The following variables are declared multiple times, causing Vite to fail with "already been declared" errors:

| Variable | First Declaration | Second Declaration |
|----------|------------------|-------------------|
| `autoGearAutoPresetIdState` | Line 720 (`var`) | Line 1740 (`let`) |
| `autoGearPresetNameDialog` | Line 1743 (`let`) | Line 2055 (`let`) |
| `autoGearPresetNameForm` | Line 1744 (`let`) | Line 2056 (`let`) |
| `autoGearPresetNameLabel` | Line 1745 (`let`) | Line 2057 (`let`) |
| `autoGearPresetNameInput` | Line 1746 (`let`) | Line 2058 (`let`) |
| `autoGearPresetNameError` | Line 1747 (`let`) | Line 2059 (`let`) |

#### [MODIFY] [app-core-new-2.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-2.js)

1. **Remove line 1740**: `let autoGearAutoPresetIdState = null;` — this duplicates line 720's `var` declaration
2. **Remove lines 2055-2059**: Duplicate declarations of `autoGearPresetNameDialog`, `autoGearPresetNameForm`, `autoGearPresetNameLabel`, `autoGearPresetNameInput`, `autoGearPresetNameError` — these duplicate lines 1743-1747

---

### ESLint Configuration Issue

ESLint cannot parse ES module files (e.g., `src/data/devices/*.js`, `eslint.config.js` itself) because they're not covered by the `sourceType: 'module'` configuration block.

#### [MODIFY] [eslint.config.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/eslint.config.js)

Add the following file patterns to the ES modules configuration block (lines 138-163):
- `eslint.config.js` (the ESLint config itself is an ES module)
- `src/data/**/*.js` (all data files use ES module exports)
- `src/modules/**/*.js` (module shims)
- `src/main.js` and `src/debug-imports.js`

---

## Verification Plan

### Automated Tests

1. **Run full test suite** — Verify no regressions:
   ```bash
   npm test
   ```

2. **Run ESLint** — Verify all parsing errors are resolved:
   ```bash
   npm run lint
   ```

### Manual Verification

1. **Start development server** and verify app boots without errors:
   ```bash
   npm run dev
   ```
   Then open browser console and confirm NO errors like:
   - `autoGearAutoPresetIdState has already been declared`
   - `autoGearPresetNameDialog has already been declared`
   - Any `500 Internal Server Error` from Vite transform

2. **Verify auto-gear UI works**: Navigate to the auto-gear panel and confirm preset functionality is operational.

