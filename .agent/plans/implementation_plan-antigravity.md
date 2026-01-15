# Implementation Plan - Fix Critical JS and UI Bugs

## Goal Description
Fix critical JavaScript errors (`ReferenceError: clearDynamicFields`) preventing project creation and device management. Also fix UI issues in the Device Library.

## Proposed Changes
### New Module: Dynamic Form Helpers
- Create `src/scripts/core/dynamic-form-helpers.js`:
    - Implement `clearDynamicFields()`: Clears `#dynamicFields`.
    - Implement `placeWattField(category, deviceData)`: Manages defaults.
    - Implement `buildDynamicFields(category, deviceData, excludedAttrs)`: Generates inputs based on category schema.
    
### Entry Point Update
- Modify `src/main.js`:
    - Import `dynamic-form-helpers.js`.
    - Expose functions to `window` for legacy compatibility.

### Device Library
- Fix subcategory dropdown not populating (likely due to missing helpers).
- Fix "Project Creation" modal by ensuring form helpers don't crash.

## Verification Plan
### Manual Verification
1. **Device Library**:
   - Go to Device Library.
   - Click "Add New Device".
   - Select "Accessory > Cables" (or similar).
   - Verify Subcategory dropdown populates.
   - Add a device. Verify it appears.
2. **Project Creation**:
   - Click "New Project".
   - Enter name.
   - Click Create.
   - Verify project works.
3. **Console**:
   - Ensure no `ReferenceError: clearDynamicFields` appears.
