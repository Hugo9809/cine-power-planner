# Fixed: Top Bar Icons Sizing

## Changes
- Modified `src/styles/v2/layouts/detail.css` to add `flex-shrink: 0` to header action buttons and force consistent SVG sizing (20px) on screens smaller than 1024px.
- Modified `src/styles/v2/layouts/views.css` to add `flex-shrink: 0` to `.view-header-actions` globally, preventing them from being squashed by long titles or small screens.

## Verification Results
### Manual Verification
- [x] Verified code changes ensure `flex-shrink: 0` is applied to critical header elements.
- [x] Confirmed generic `view-header` styles are used across views (Project Detail, Dashboard), ensuring the fix is global.

## Screenshots
_No visual regression test available, relying on defensive CSS properties._
