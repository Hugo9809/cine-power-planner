# Power Calculation Engine (`results.js`)

`results.js` is the "Brain" of Cine Power Planner. It handles all power estimation, runtime math, and compatibility checks.

## Architecture

The module operates as a monolithic state machine (`runtimeFeedbackState`) that reacts to UI events.

### The Feedback Loop

1.  **Input Trigger**: User changes a battery, camera, or accessory (via `app-events.js`).
2.  **Update**: `updateCalculations()` is called.
3.  **Aggregation**: The engine sums up the `wattDraw` of all active devices in the current `setup`.
4.  **Runtime Math**:
    *   **Capacity**: `Battery Capacity (Wh) * Quantity`.
    *   **Draw**: `Total Watts + (Accessories * Overhead)`.
    *   **Result**: `Capacity / Draw = Hours`.
5.  **Render**: Updates the DOM elements (`#fbRuntime`, `#fbTotalCurrent`) directly.

## Key Algorithms

### 1. Total Draw Calculation
```javascript
TotalDraw = CameraWatts + sum(AccessoryWatts)
```
*   **Peukert Effect**: We currently do not apply a Peukert coefficient, assuming modern Li-Ion batteries have a linear discharge curve for the scope of typical film sets.

### 2. Voltage Compatibility
The engine checks if the selected `BatteryPlate` voltage matches the `Camera` voltage requirement.
*   **Source**: `mount-voltage.js` defines thresholds (e.g., V-Mount High = 16.8V).
*   **Logic**: If `PlateVoltage < CameraMinVoltage`, trigger `showPowerWarningDialog()`.

## Compatibility Matrices

The module maintains internal lookup tables for:
*   **FIZ Controllers**: Checks if the Hand Unit is compatible with the Motors.
*   **Wireless Video**: Checks frequency/brand compatibility (soft check).

## Refactoring Note
This module is a prime candidate for refactoring into smaller, pure-function modules (e.g., `calculators/power.js`, `calculators/compatibility.js`) in Phase 3. For now, treat it as a "Core Kernel" component.
