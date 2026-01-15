# Offline Functionality Verification Plan

## Goal
Ensure the Cine Power Planner application has full offline functionality, meaning it can load and operate without a network connection.

## Current State Analysis
- **Service Worker**: Exists (`service-worker.js`) and implements a Network-First strategy with offline fallback.
- **Manifest**: Exists (`manifest.webmanifest`).
- **Assets**: `vite.config.js` generates `service-worker-assets.js` which lists assets to be pre-cached.
- **Registration**: Location of `navigator.serviceWorker.register` is currently being investigated.

## Verification Steps

### 1. Locate Service Worker Registration
- Search `index.html` (bottom) and `src/scripts` for registration logic.
- Ensure registration is robust (checks for support, handles errors).

### 2. Verify Asset List
- Check `service-worker-assets.js` generation in `dist` (after build) to ensure it includes:
    - `index.html`
    - Core JS bundles (`src/scripts/**/*.js`)
    - CSS files
    - Ions and fonts
    - Data files (`src/data/**/*.js`)

### 3. Automated Verification via Browser Tool
- Use the `browser_subagent` to:
    - Load the application.
    - Check `navigator.serviceWorker.controller` to confirm a SW is active.
    - Inspect the Cache Storage to see if `cine-power-planner-v...` cache exists.
    - Verify that keys in the cache match the expected assets.

### 4. Manual/Simulated Offline Test
- Since true offline cannot be simulated easily in the agent environment, we will rely on:
    - Service Worker presence.
    - Cache population.
    - Code review of the fallback logic.

## Tasks
- [x] Locate SW registration.
- [x] Run `npm run build` to generate assets and verify `dist/service-worker-assets.js`.
- [x] Create a verification script/test.
