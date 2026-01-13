# Testing Guide

This document outlines the testing strategy, available test scripts, and best practices for the Cine Power Planner application.

## Overview

> [!IMPORTANT]
> **ALWAYS run the app via the Vite dev server (`npm run dev`) for testing.**
> This ensures proper ES module resolution and enables hot reload during development.
> Do NOT test via the `file://` protocol. The application relies on ES modules and Service Workers that require a proper HTTP context.

The testing suite uses a multi-tier approach to verify critical user flows, data integrity, and business logic while managing memory constraints effectively.

## Test Commands Reference

| Command | Description | Heap Limit | Use Case |
| --- | --- | --- | --- |
| `npm test` | Full suite: lint + checks + Jest | 3 GB | CI/pre-commit |
| `npm run test:jest` | All Jest projects | 3 GB | Quick full test |
| `npm run test:unit` | Unit tests only | 1 GB | Module logic iteration |
| `npm run test:data` | Data validation tests | 1 GB | Device catalog changes |
| `npm run test:dom` | DOM utility tests | 1.5 GB | UI helper functions |
| `npm run test:script` | Script integration tests | 3 GB | Heavy integration (requires `RUN_HEAVY_TESTS=true`) |
| `npm run lint` | ESLint only | — | Code style checks |
| `npm run check-consistency` | Device data + SW manifest | — | Asset verification |

## Jest Project Configuration

The Jest configuration (`jest.config.cjs`) defines multiple test projects:

| Project | Test Files | Environment | Purpose |
| --- | --- | --- | --- |
| `unit` | `tests/unit/**/*.test.js` | Node | Pure logic, storage helpers |
| `data` | `tests/data/**/*.test.js` | Node | Device catalog validation |
| `dom` | `tests/dom/**/*.test.js` | jsdom | DOM utilities, UI helpers |
| `script` | `tests/script/**/*.test.js` | jsdom | Integration, heavy tests |

### Running Specific Projects

```bash
# Run only unit tests
npm run test:unit

# Run only data validation
npm run test:data

# Run specific test file
npx jest tests/unit/storage.test.js
```

## 4-Tier Testing Strategy

See [tests/README.md](tests/README.md) for detailed documentation on the testing approach.

### Tier 1: Automated Unit Tests
- **Scope**: Pure functions, calculations, data transformations
- **Location**: `tests/unit/`
- **Run**: `npm run test:unit`

### Tier 2: Data Validation Tests
- **Scope**: Device catalog integrity, schema validation
- **Location**: `tests/data/`
- **Run**: `npm run test:data`

### Tier 3: DOM/UI Tests
- **Scope**: DOM utilities, rendering helpers
- **Location**: `tests/dom/`
- **Run**: `npm run test:dom`

### Tier 4: Integration Tests
- **Scope**: Full application flows (heavy, optional)
- **Location**: `tests/script/`
- **Run**: `RUN_HEAVY_TESTS=true npm run test:script`

## Manual Browser Tests

Due to limitations in automated browser environments (connection resets, page load issues), several verification scripts are designed for **manual console execution**.

### Console Verification Scripts

All scripts are in the repository root. Copy the script content and paste into the browser console while the app is running at `http://localhost:3000`.

| Script | Scope | What It Tests |
| --- | --- | --- |
| `verify_device_manager.js` | Device Manager | Adding categories, devices, persistence |
| `verify_battery_comparison.js` | Battery Logic | Rig config, comparison table, runtime estimates |
| `verify_contacts.js` | Contacts | Creating contacts, list updates, persistence |
| `verify_own_gear.js` | Own Gear | Adding items, list updates, deletion |
| `verify_settings.js` | Settings | Language/theme changes, persistence after reload |
| `verify_feature_search.js` | Search | Normalization, highlighting, suggestion ranking |
| `verify_project_management.js` | Projects | Create, save, load, delete operations |
| `verify_calculations.js` | Calculations | Power draw totals, runtime accuracy |
| `verify_smoke_test.js` | End-to-End | Factory reset → Create → Add → Auto Gear → Print |

### Manual Testing Workflow

1. Start the development server: `npm run dev`
2. Open the application in Chrome or Safari
3. Open Developer Tools (F12 or Cmd+Opt+I)
4. Go to the "Console" tab
5. Paste the desired test script
6. Press Enter
7. Watch for "SUCCESS" messages or errors

## Automated vs Manual Test Matrix

| Feature Area | Automated | Manual | Notes |
| --- | --- | --- | --- |
| Storage helpers | ✅ Jest | — | Full coverage |
| Power calculations | ✅ Jest | — | Core business logic |
| Device catalog | ✅ Jest | — | Schema validation |
| DOM utilities | ✅ Jest | — | jsdom environment |
| Project management | Partial | ✅ Console | UI-heavy flows |
| Contact management | — | ✅ Console | UI-dependent |
| Settings persistence | — | ✅ Console | Requires reload |
| Offline behavior | — | ✅ Manual | Network toggle |
| Service worker | — | ✅ Manual | Browser-specific |

## Pre-Release Checklist

Before merging or releasing:

1. **Run full test suite**
   ```bash
   npm test
   ```

2. **Run consistency checks**
   ```bash
   npm run check-consistency
   ```

3. **Manual smoke test**
   - Run `verify_smoke_test.js` in browser console
   - Test offline mode (toggle network off)
   - Verify Force Reload works

4. **Cross-browser check**
   - Chrome (primary)
   - Safari
   - Firefox

## Troubleshooting Test Failures

### Memory Errors
Use the heap-limited commands:
```bash
npm run test:unit   # 1 GB
npm run test:data   # 1 GB
npm run test:dom    # 1.5 GB
```

### Module Resolution Errors
Ensure you're running tests from the project root:
```bash
cd cine-power-planner
npm run test:unit
```

### Outdated Snapshots
Update Jest snapshots if intentional changes were made:
```bash
npx jest --updateSnapshot
```

### Missing Global Functions
Some tests require the app to be fully loaded. For console scripts, wait for the app to finish initializing before pasting.

