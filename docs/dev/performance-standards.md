# Performance Standards

> "Speed is a Feature."

Because Cine Power Planner runs entirely in the client's browser—often on mobile devices or aging set laptops—we enforce strict performance budgets.

## 1. Storage & Memory

### The "Twin-Store" Limit
Our "Twin-Store" architecture (IndexedDB + OPFS) has overhead.
*   **Max Projects**: Tested up to ~50 active projects.
*   **Max Gear Items**: ~500 items per project before search lag is noticeable.
*   **Rule**: Lists > 50 items **MUST** be virtualized (managed by `v2/view-manager.js`).

### Memory Leaks
*   **Event Listeners**: All `addEventListener` calls in V2 Views **MUST** have a corresponding `removeEventListener` in the `unmount()` lifecycle hook.
*   **Timers**: All `setInterval` IDs must be tracked and cleared on unmount.

## 2. Rendering & Animation

### The 16ms Budget (60fps)
*   **No blocking defaults**: Heavy math (e.g., `results.js` re-calc) should ideally run in a Worker or use `requestIdleCallback` if it exceeds 10ms.
*   **CSS Animations**: Prefer `transform` and `opacity`. Avoid animating `width`, `height`, or `top/left` which trigger layout thrashing.
*   **Lottie Files**: Large JSON animations must be pre-bundled via `generate:pink-mode-icons` to avoid network waterfalls.

## 3. Network & Loading
*   **Offline-First**: The app must load in `< 2s` on 3G networks once cached by the Service Worker.
*   **Asset Budget**:
    *   JS Bundle (Gzipped): `< 500kb` initial load.
    *   Lazy Loading: Routes not required for the "Critical Path" (Dashboard) must be dynamic imports.

## 4. Telemetry (Privacy & Perf)
*   **No Blocking**: Telemetry (if enabled) must use `navigator.sendBeacon`.
*   **Anonymous**: No PII.
*   **Opt-In**: Default is OFF.
