# Onboarding Tour Reference

The Onboarding Tour guides users through the core workflows of the Cine Power Planner, from initial project setup to power analysis and exporting. This document outlines the module's architecture, step configuration, and persistence mechanisms.

## Architecture

The tour logic is encapsulated in `src/scripts/modules/features/onboarding-tour.js`. It operates as a singleton feature module that manages:
1.  **State Machine**: Tracks the current step index and completion status.
2.  **Overlay System**: Renders a modal overlay (`onboardingTutorialOverlay`) that highlights relevant UI elements using dynamic CSS classes/z-indexes.
3.  **Navigation**: Handles "Next", "Back", and "Skip" actions, as well as keyboard shortcuts (Arrow keys, Escape).

### Key Components

-   **`onboardingTutorialOverlay`**: The main DOM container for the tour UI. It is dynamically injected or manipulated to sit on top of other content.
-   **`DEFAULT_STEP_KEYS`**: An ordered array of string identifiers defining the tour sequence (e.g., `'intro'`, `'userProfile'`, `'addCamera'`).
-   **Step Content**: Localized titles, body text, and "Hero" content (for the initial splash screen) are mapped to these keys.

## Persistence

The tour uses a multi-layered persistence strategy to remember if a user has completed or skipped the tour:

1.  **`localStorage`**: Key `cinePowerPlanner_onboardingTutorial:skip`.
    -   `true`: Tour is skipped/completed.
    -   `false` (or missing): Tour should be shown (if not previously completed).
2.  **Legacy Keys**: Checks keys like `cameraPowerPlanner_onboardingTutorial` for backward compatibility with older versions of the app.
3.  **`window.name`**: As a fallback for stateless/incognito modes where `localStorage` might be wiped or unavailable, a flag is embedded in `window.name` (`cinePowerPlanner_onboardingTutorial:skip=true`).

## Step Configuration

The tour steps are defined in `DEFAULT_STEP_KEYS`. Each step typically requires:
-   **Highlight Selector**: A CSS selector string targeting the UI element to highlight (e.g., `#batteryPlateSelect`).
-   **Positioning**: Logic to determine where the tooltip/popover appears relative to the target.
-   **Event Listeners**: Optional hooks to auto-advance the tour when the user interacts with the highlighted element (e.g., clicking a button).

## Integration

The module initializes automatically and checks the persistence layer.
-   **Trigger**: If the skip flag is not set, the tour starts immediately on page load.
-   **Manual Start**: The tour can be restarted via the "Help" menu or by invoking `cine.features.onboardingTour.restart()`.
-   **Events**: The module listens for app events (like `device-library:add`) to coordinate steps that require user input (e.g., adding a specific device).

## Debugging

To reset the tour state for testing:
1.  Open Chrome DevTools.
2.  Run `localStorage.removeItem('cinePowerPlanner_onboardingTutorial:skip')`.
3.  Reload the page.

To inspect the current configuration:
```javascript
// Access the raw module if exposed
console.log(cine.features.onboardingTour);
```
