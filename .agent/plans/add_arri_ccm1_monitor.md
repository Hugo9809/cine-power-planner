# Implementation Plan - Add Arri CCM-1 Monitor Specs

Refined the device constraints and specifications for the Arri CCM-1 Monitor.

## Changes

### 1. Compatibility Logic
**File:** `src/scripts/core/app-core-new-2.js`
- **Updated `populateMonitorSelect` function:**
  - Added logic to check the currently selected camera.
  - Filters out "ARRI CCM-1" from the monitor list if the selected camera is not one of the compatible models: "Arri Alexa 35", "Arri Alexa 35 Xtreme", or "Arri Alexa Mini LF".

- **Updated `cameraSelect` Event Listener:**
  - Added a call to `populateMonitorSelect()` within the camera change event listener.
  - Ensures that changing the camera immediately updates the available monitor options to enforce compatibility rules.

### 2. Verified Specifications
**File:** `src/data/devices/monitors.js`
- **Reviewed "ARRI CCM-1" Entry:**
  - Validated that the power draw is set to 20 Watts, which aligns with the device's maximum power consumption specification.
  - Confirmed the presence of other key specs like screen size (7"), brightness (1300 nits), and weight.

## Verification
- **Compatibility:** Selecting "Arri Alexa 35" shows "ARRI CCM-1" in the monitor dropdown. Selecting an incompatible camera (e.g., "Sony Venice") hides it.
- **Power Data:** The application calculates power usage based on the 20W specification for the CCM-1.
