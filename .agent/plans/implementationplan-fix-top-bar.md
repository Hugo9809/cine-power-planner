
# Fix Top Bar Responsiveness

## Goal Description
The top bar in the project detail view is not responsive, causing buttons to be cut off on smaller screens. This change adjusts the CSS to handle the button layout better, including wrapping or hiding labels on mobile.

## User Review Required
None.

## Proposed Changes

### Styles
#### [MODIFY] [detail.css](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/v2/layouts/detail.css)
- Add or update `.view-header-actions` to handle flex wrapping or scrolling.
- Add media query to hide `.v2-btn-label` on smaller screens (e.g., < 768px or < 1024px) for the header buttons, showing only icons.
- Ensure the header wraps correctly if needed.

## Verification Plan

### Manual Verification
- Resize browser window to mobile width (~400px).
- Verify that the top bar buttons are visible and not cut off.
- Verify that button labels disappear on smaller screens, showing only icons.
- Verify that the layout remains usable.
