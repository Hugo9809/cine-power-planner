# Build System & Infrastructure

This document explains the custom Vite build pipeline used to compile Cine Power Planner's hybrid architecture.

## Overview

We use **Vite** as a dual-purpose tool:
1.  **Dev Server**: Instant HMR (Hot Module Replacement) for modern modules.
2.  **Bundler**: Rollup-based production builds.

## Vite Configuration (`vite.config.js`)

Our config is non-standard because of the requirements to support:
*   **Legacy Globals**: We cannot use strict ESM tree-shaking everywhere.
*   **Offline Assets**: We need to generate a manifest *during* the build.
*   **Pink Mode**: We compile Lottie files into JS.

## Custom Plugins

### 1. `pinkModePlugin`
*   **Role**: Theming Compiler.
*   **Input**: `src/assets/lottie/*.json` (Raw Lottie Animations).
*   **Output**: `pink-mode-icons.js` (ES Module exporting JSON strings).
*   **Why?**: Loading 50+ JSON files via generic `fetch()` is too slow and flaky offline. We bundle them into a single JS file that resides in the App Shell cache.

### 2. `serviceWorkerPlugin`
*   **Role**: Asset Hasher.
*   **Execution**: Hooks into `writeBundle`.
*   **Logic**: Scans the output directory, calculates hashes for every file, and writes `service-worker-assets.js`.
*   **Result**: The Service Worker knows *exactly* which files to cache without needing network requests to find out.

## The Legacy Build Target (`npm run build:legacy`)

While `npm run build` targets modern browsers (ES2022), we maintain a legacy build pipeline.

*   **Entry**: `tools/build-legacy.js` (Hypothetical/Planned).
*   **Goal**: Transpile modern ES6+ down to ES5/ES3 for ancient on-set tablets (iPad Gen 2, etc.).
*   **Status**: Currently relies on Vite's `@vitejs/plugin-legacy` to inject polyfills automatically.
