# Fixing CSP and Project Loading Issues

## Goal Description
Fix the Content Security Policy (CSP) violation preventing worker creation and resolve the "Project not found" error when loading projects in the V2 dashboard.

## User Review Required
> [!IMPORTANT]
> Modifying CSP to allow `blob:` for workers. This diminishes security slightly but is required for modern bundlers/libraries using blob workers (like Vite HMR or PDF generators).

## Proposed Changes

### Core Configuration
#### [MODIFY] [index.html](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/index.html)
- Add `worker-src 'self' blob:;` to the CSP meta tag.
- Alternatively, add `blob:` to `script-src` if `worker-src` is not supported (but it is).

### Shim / Storage Logic
#### [MODIFY] [legacy-shim.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/legacy-shim.js)
- Debug/Repair `loadProject` to correctly find migrated projects in the new storage structure.
- Ensure `LegacyShim` checks the correct local storage keys or IndexedDB if migration occurred.

## Verification Plan

### Automated Tests
- None available for this specific interaction.

### Manual Verification
1. **Reload App**: Verify no CSP errors in console.
2. **Load Project**: Open "test" project from dashboard.
    - Confirm it loads without "Project not found" error.
    - Confirm `ProjectDetail` view is populated.
3. **Worker Check**: If the worker was for HMR or PDF generation, verify that functionality works.
