# Pink Mode Reference

Pink Mode is a thematic "Easter egg" feature that changes the application's appearance and adds playful animations when activated. This document outlines the architecture, asset management, and integration points for the Pink Mode feature.

## Overview

When enabled, Pink Mode:
1.  **Toggles a generic CSS class**: Adds `.pink-mode` (or `.pink-mode-active`) to the `document.body` to style UI elements with pink/purple themes.
2.  **Animating Icons**: Replaces the standard Unicorn/Horse toggle icon with Lottie-based animated variants (Unicorn, Horn, Rainbow). The icon cycles every 30 seconds with a gentle pop animation.
3.  **Floating Elements**: Spawns floating interactive "stickers" (e.g., Flamingo, Unicorn, Camera) that drift across the screen.
4.  **Interactive Triggers**:
    -   **Icon Click**: Clicking the floating stickers 3 times triggers a "Rain" effect.
    -   **Session Events**: Specific milestones (like saving a large project) might trigger a celebratory rain.
5.  **"Rain" Effect**: Triggers a shower of icons that fall from the top of the screen.

## Architecture

The logic is primarily contained within `src/scripts/modules/core/pink-mode.js`, which bundles two internal modules:

### 1. `modules/core/pink-mode-animations.js`

This module handles the visual implementation:
-   **`PinkModeManager`**: The central coordinator. It maintains the active state, manages the list of floating icons, and handles the "rain" effect loop.
-   **`FloatingIcon`**: Represents a single floating element. It handles DOM creation, Lottie animation loading, and physical movement (simple gravity/drift) via `requestAnimationFrame`.
-   **Interaction Tracking**: It tracks clicks on individual floating icons to trigger the rain effect.

### 2. `modules/core/pink-mode-support.js`

This module provides the public API and integration bridge:
-   **Polymorphic Resolution**: It attempts to find the animations module in various global scopes (`globalThis`, `window`, etc.) to ensure availability across different build environments (Webpack, legacy scripts, Node.js tests).
-   **Fallback Support**: If the animation runtime (Lottie) or module is missing, it provides safe no-op fallbacks (like static SVGs) so the application doesn't crash.
-   **Exported Globals**: It exposes functions like `startPinkModeAnimatedIcons`, `stopPinkModeAnimatedIcons`, and `triggerPinkModeIconRain` to the global scope.

## Asset Loading

Animations are Lottie JSON files located in `src/animations/pink-mode/`.
The runtime checks for `window.lottie` or `window.bodymovin`. If missing, it dynamically loads `src/vendor/lottie.min.js`.

### Caching Strategy
-   **Memory Cache**: Loaded JSON data is stored in `globalThis.cinePinkModeAnimatedIconData` to prevent repeated network requests during a session.
-   **Preloading**: The `startPinkModeIconPreload` function can be used to warm up the cache when the toggle is first hovered or early in the session.

## Integration Points

-   **`src/scripts/app-session.js`**: Initializes the global `pinkModeToggle` reference and may trigger rain effects on specific session events.
-   **`src/scripts/app-core-new-1.js`**: Often handles the UI event binding for the toggle button.
-   **CSS**: The visual "look" is driven by CSS rules targeting `body.pink-mode` or `.pink-mode-active` in `src/styles/` (main stylesheet).

## Debugging

To test Pink Mode manually in the browser console:

```javascript
// Enable mode
cineCorePinkModeSupport.startPinkModeAnimatedIcons();

// Trigger a single rain burst
cineCorePinkModeSupport.triggerPinkModeIconRain();
```

## Adding New Icons

1.  Add the Lottie JSON file to `src/animations/pink-mode/`.
2.  Update `PINK_MODE_ANIMATED_ICON_FILES` in `src/scripts/modules/core/pink-mode.js` to include the new path.

