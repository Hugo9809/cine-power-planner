# Offline Strategy & Network Architecture

Cine Power Planner is designed to be fully functional without an internet connection. This document details the "Network Optional" philosophy and the supporting infrastructure.

## Core Philosophy
**"The Network is an Enhancement, not a Requirement."**

*   **Default State**: The app assumes it is offline.
*   **Enhancement**: If a connection is detected, we may try to sync (future), but *never* block the UI.

## The Service Worker (`service-worker.js`)

We use a custom Service Worker implementation (not a library like Workbox) for maximum control over the caching lifecycle.

### Lifecycle
1.  **Install**: Pre-caches **ALL** critical assets defined in `service-worker-assets.js`. If this fails, the SW is not installed.
2.  **Activate**: Cleans up old caches (versioned by `CACHE_NAME` in `service-worker-assets.js`).
3.  **Fetch**: Implementation of **Stale-While-Revalidate** (for non-critical) and **Cache-Only** (for bundled assets).

## The Asset Generator (`tools/generateServiceWorkerAssets.cjs`)

Because Vite leverages dynamic hashing, we cannot hardcode asset URLs in the Service Worker.

1.  **Build Time**: This script runs *after* `vite build`.
2.  **Manifesting**: It scans `dist/`, captures all `.js`, `.css`, and `.woff2` files.
3.  **Output**: Generates `dist/service-worker-assets.js`, which exports the `ASSETS` array and a version hash based on content.

## The Connectivity Probe (`src/scripts/modules/offline.js`)

`navigator.onLine` is notoriously unreliable (it often just means "connected to a router", not "has internet").

**Our Solution:**
1.  **Passive**: Listen to `online`/`offline` window events.
2.  **Active**: If `online` fires, we attempt a `HEAD` request to a known endpoint (e.g., `/favicon.ico` or a ping endpoint) to verify actual data throughput.
3.  **State**: `offline.js` exposes a reactive `isOnline` state used by the UI to show/hide sync badges.

## Cache Strategy

| Request Type | Strategy | Reason |
| :--- | :--- | :--- |
| **App Shell** (`index.html`, `main.js`) | **Cache First** | Instant load, zero network latency. |
| **Device Images** | **Stale-While-Revalidate** | Show cached immediately, update in background if changed. |
| **API Calls** (Future) | **Network First** | Data freshness is priority (with IDB fallback). |

## Debugging Service Workers

Working with Service Workers can be tricky due to their aggressive caching.

### 1. Force Update
If you deploy a new version and don't see changes:
*   **DevTools**: Application > Service Workers > "Update on reload".
*   **Code**: Bump the `CACHE_NAME` or `VERSION` in `service-worker.js` (handled automatically by `generateServiceWorkerAssets.cjs` hash in production).

### 2. Inspecting the Cache
Go to **DevTools > Application > Cache Storage**. You should see:
*   `cine-power-cache-v...`: Contains the critical assets.
*   `cine-runtime-images`: Contains lazy-loaded images.

### 3. Resetting
To simulate a fresh install:
1.  **Unregister**: DevTools > Application > Service Workers > Unregister.
2.  **Clear Storage**: DevTools > Application > Storage > Clear Site Data (check "Cache storage").
3.  **Reload**: The SW will re-install from scratch.

### 4. Bypass for Development
In `vite.config.js` or development mode, the Service Worker is typically **not** registered to allow for Hot Module Replacement (HMR).
*   **Production**: `npm run preview` is the best way to test the SW behavior locally.

