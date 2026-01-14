# Implementation Plan - Standardize V2 Box Corners

The user wants all "boxes" in the V2 UI to have round corners "just like the links in the sidebar when active".
The sidebar links use `border-radius: var(--v2-radius-md)`, which resolves to `8px`.
Currently, many tiles and cards use `var(--v2-radius-lg)` (12px) or `var(--v2-radius-xl)` (16px).

I will standardize the border-radius of all cards, tiles, and content sections to `var(--v2-radius-md)` (8px) to satisfy the request.

## Proposed Changes

### Styles

#### [MODIFY] [tiles.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/components/tiles.css)
- Change `.v2-project-tile` border-radius from `lg` to `md`.
- Change `.v2-project-tile-new` border-radius from `lg` to `md`.
- Change `.v2-skeleton-tile` border-radius from `lg` to `md`.

#### [MODIFY] [cards.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/components/cards.css)
- Change `.v2-card` border-radius from `lg` to `md`.
- Change `.v2-content-card` border-radius from `lg` to `md`.
- Change `.v2-content-card-header` border-radius to match (`var(--v2-radius-md) var(--v2-radius-md) 0 0`).
- Change `.v2-stat-card` border-radius from `lg` to `md`.

#### [MODIFY] [help.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/views/help.css)
- Change `.v2-help-section` border-radius from `lg` to `md`.

#### [MODIFY] [modals.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/components/modals.css)
- Change `.v2-modal` border-radius from `xl` to `md`.

## Verification Plan

### Manual Verification
- Open Project Dashboard. Verify project tiles have 8px radius.
- Open Help View. Verify help sections have 8px radius.
- Open a Modal. Verify modal has 8px radius.
- Check Sidebar links to visually confirm the match.
