# Implementation Plan - Batch 14: App Setups Modularization (Part 1)

The objective is to begin the modularization of the monolithic `src/scripts/core/app-setups.js`.

## Proposed Changes

### 1. New Modules

#### [NEW] [project-manager.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/core/project-manager.js)
Extract project derivation and normalizing logic:
- `deriveProjectInfo`
- `safeGetCurrentProjectName`
- `normalizeProjectFieldLabel`
- `getProjectInfoFieldLines`
- `buildCombinedProductionCompanyDisplay`

#### [NEW] [setups-ui.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/ui/setups-ui.js)
Extract Setup-specific UI helpers:
- `setButtonLabelWithIconForSetups` -> `setSetupButtonLabel`
- `escapeHtmlFallback` (if not using `ui-helpers`)

#### [NEW] [connector-summary.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/modules/core/connector-summary.js)
Extract connector summary generation logic:
- `generateConnectorSummary`
- `suggestChargerCounts`
- `addArriKNumber`
- `suggestArriFizCables`

### 2. Legacy Shims

#### [MODIFY] [app-setups.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-setups.js)
- Import new modules.
- Remove extracted function bodies.
- Delegate calls to the new modules.
- Maintain global exports for `generateConnectorSummary` etc.

### 3. Service Worker

#### [MODIFY] [service-worker-assets.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/service-worker-assets.js)
- Add new modules to the asset manifest.

## Verification Plan

### Automated Tests
- [ ] Create `tests/unit/modules/core/projectManager.test.js`
- [ ] Create `tests/unit/modules/core/connectorSummary.test.js`
- [ ] Run `npm run test:jest` to verify new modules.
- [ ] Run `npm run check-consistency`.

### Manual Verification
- [ ] **Project Info Display**: Open "Project Info" dialog, verify Production Company fields display correctly.
- [ ] **Connector Summary**: Go to Overview -> Connectors, verify summary generates correctly.
- [ ] **Share Flow**: Verify shared link generation still works (uses project derivation).
