# Implementation Plan - Bug Hunting & Stabilization

## Goal Description
Find and fix bugs in V2 UI, specifically Device Library and Project persistence.

## Completed Fixes

### Device Library Bug (FIXED)
**Root Cause**: The legacy `#device-manager` section has `class="hidden"` by default. When the V2 Device Library reparents this element, it never removed the `hidden` class, causing the entire form to be invisible.

**Fix Applied**:
- [device-library-view.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/v2/views/device-library-view.js#L114-L117): Added `legacyContainer.classList.remove('hidden');` after reparenting.

### Missing Translation Key (FIXED)
**Root Cause**: The key `v2ui.revision` was used in the Device Library header but not defined in translations, causing literal placeholder text to display.

**Fix Applied**:
- [en.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/translations/en.js#L159-L161): Added `v2ui.revision` translation key.

## Outstanding Issues

### Project Persistence Bug (TO INVESTIGATE)
- Projects created in V2 UI save successfully (logs confirm) but don't appear in dashboard after refresh
- Possible causes: Cache not refreshed, storage key mismatch, or listing logic issue

## Verification Plan
- Manual browser test: Navigate to `#/devices` and confirm forms are visible
- Manual browser test: Create project and refresh to verify persistence
