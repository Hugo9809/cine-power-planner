# Implementation Plan - Styling Project Tabs and Top Bar

The goal is to visually differentiate the project page tabs from the top bar (header) and increase the tap/click target size of the tabs by adding more horizontal padding.

## User Review Required

> [!IMPORTANT]
> I will be adding a bottom border to the shared `.view-header` class. This may affect other views that use this header. If this is not desired, I can scope it to only the project view if possible, but a consistent header style is usually preferred.

## Proposed Changes

### Styles

#### [MODIFY] [views.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/layouts/views.css)
- Update `.view-header`:
    - Change `border-bottom: none` to `border-bottom: 1px solid var(--v2-border-subtle)` (or default) to separate it from the content/tabs below.
    - Alternatively, add a `box-shadow` if a border is too harsh. I will start with a border as it's cleaner.

#### [MODIFY] [tabs.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/components/tabs.css)
- Update `.v2-tab-btn`:
    - Increase padding from `8px 16px` to `8px 24px` (or `8px 32px` if "more" implies significantly more). `24px` is a good starting point (50% increase).
- Update `.v2-tabs-nav`:
    - Ensure it has a background color (e.g., `var(--v2-surface-base)`) so that when it sticks, content scrolling behind it is not visible (if it was transparent).

## Verification Plan

### Manual Verification
1.  **Open Project Page**: Navigate to a project (e.g., `#/project/test/camera`).
2.  **Check Top Bar**: Verify that the top bar (header) now has a visible bottom border separating it from the tabs/content.
3.  **Check Tabs**: Verify that the tabs have wider padding on the left and right.
4.  **Scroll**: Scroll the page and ensure the sticky tabs and header remain distinct.
