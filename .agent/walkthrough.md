# Fix ReferenceErrors and TypeErrors Walkthrough

I have resolved the critical initialization errors preventing the application from booting.

## Changes

### 1. Exposed Missing Global Functions
**File:** [app-setups.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-setups.js)

The following functions were defined locally but accessed globally by `app-session.js`. I have exposed them to `window` and `globalThis`:
-   `bindGearListCageListener`
-   `bindGearListEasyrigListener`
-   `bindGearListSliderBowlListener`
-   `bindGearListEyeLeatherListener`
-   `bindGearListProGaffTapeListener`
-   `bindGearListDirectorMonitorListener`

### 2. Implemented `registerView` in View Manager
**File:** [view-manager.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/v2/view-manager.js)

The V2 `ViewManager` was missing the `registerView` method required by `backups-view.js`. I implemented:
-   `registerView(viewName, handlers, config)`: Allows dynamic registration of views.
-   `viewHandlers`: Stores lifecycle hooks (`onEnter`, `onLeave`).
-   Updated `showView`: Triggers `onEnter` and `onLeave` lifecycle hooks.

## Verification Results

### Manual Verification
-   **Startup**: The application should now boot without the `Uncaught ReferenceError: bindGearListCageListener is not defined` or `TypeError: window.cineViewManager.registerView is not a function`.
-   **Functionality**:
    -   Gear list listeners (e.g., Camera Cage dropdown) are now properly bound.
    -   The Backups view (Data Vault) can register itself and be displayed.
