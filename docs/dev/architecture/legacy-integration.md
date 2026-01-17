# Legacy Integration & Boot Sequence

Cine Power Planner is a hybrid application. It wraps a legacy "Global Scope" Javascript core within a modern Vite + ESM shell. This document explains how the two worlds coexist.

## The Boot Sequence

The application boot process is carefully orchestrated to ensure legacy globals are available *before* the V2 UI attempts to render.

### 1. The Shim (`legacy-globals-shim.js`)
*   **Order**: Loaded **FIRST** (imported at top of `main.js`).
*   **Role**: "The Faker".
*   **Logic**:
    *   Defines `window.devices`, `window.cameraSelect`, `window.projectData` and other 50+ global variables.
    *   Creates "Mock DOM Elements" if they don't exist yet, preventing `null` reference errors in legacy logic.

### 2. The Bootstrap (`app-core-bootstrap.js`)
*   **Order**: Loaded **SECOND**.
*   **Role**: "The Environment Detector".
*   **Logic**:
    *   Detects `window` vs `self` (Service Worker).
    *   Polyfills `requestAnimationFrame` and `console` for older browsers/environments.

### 3. The Main Entry (`main.js`)
*   **Order**: Loaded **LAST**.
*   **Role**: "The Conductor".
*   **Logic**:
    *   Initializes `ViewManager` (V2 Router).
    *   Triggers the "Hybrid Swap" (hiding legacy containers, showing V2 app shell).

## Hybrid Event Design (`app-events.js`)

The legacy core relies on direct DOM event listeners (e.g., `$('#saveBtn').on('click')`). The V2 UI respects this by **Delegating** or **Proxying** events.

### Pattern: The "Shadow Trigger"
When a V2 Component needs to trigger legacy logic (e.g., recalculating power):
1.  V2 updates the data model.
2.  V2 dispatches a synthetic DOM event on the "Shadow Input" (the hidden legacy select element).
    ```javascript
    // V2 Code
    legacyShim.mockSelectValue('cameraSelect', 'ARRI ALEXA 35');
    document.getElementById('cameraSelect').dispatchEvent(new Event('change'));
    ```
3.  `app-events.js` hears the `change` and runs the legacy calculator logic.

## Refactoring Guide

When porting legacy logic:
1.  **Do NOT delete** valid global variables in `legacy-globals-shim.js` until *every* reference is removed.
2.  **Use `globalThis`** when accessing them in modern modules to signal intent.

---

## Runtime Environment Integration

The [Runtime Environment](runtime-environment.md) module provides utilities for safe legacy integration:

| Utility | Purpose |
|---------|---------|
| `Global.read(name)` | Safely read a global without throwing |
| `Global.write(name, value)` | Safely write a global |
| `Global.ensure(name, fallback)` | Ensure global exists with fallback |
| `Helpers.detectGlobalScope()` | Get the best available global object |
| `Helpers.collectCandidateScopes()` | Gather all candidate scopes |

### Example: Bridging ESM to Legacy

```javascript
import { Global, Helpers } from './modules/runtime-environment.js';

// Safe global read
const devices = Global.read('devices') || [];

// Ensure a global fallback exists
Global.ensure('sessionState', () => ({ projects: [] }));

// Detect scope for cross-environment code
const scope = Helpers.detectGlobalScope();
```

---

## Related Architecture

- [Runtime Environment](runtime-environment.md) — Safe global access utilities
- [Storage Layer](storage-layer.md) — Twin-store pattern for persistence
- [Module Registry](module-registry.md) — Module registration and lookup

