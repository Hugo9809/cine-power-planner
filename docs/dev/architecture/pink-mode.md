# Pink Mode Architecture

"Pink Mode" is a specialized theme requiring high-fidelity animated icons (Lottie). To ensure these assets work offline without network requests, we utilize a custom build pipeline.

## The Problem
Standard Lottie web players typically fetch `.json` animation files via HTTP. In our "Offline-First" PWA architecture, relying on runtime fetching for theme assets is risky and can lead to visual "popping" or missing icons if the cache is cold.

## The Solution: Asset Bundling

We bundle the raw Lottie JSON data directly into a JavaScript module. This ensures that if the app script loads, the theme assets are guaranteed to be available synchronously.

### 1. Source of Truth
*   **Location**: `src/scripts/core/modules/core/pink-mode-animations.js`
*   **Format**: A JS file exporting an array of paths to raw Lottie JSON files.

### 2. The Builder Script
*   **Script**: `tools/generatePinkModeAnimatedIcons.cjs`
*   **Command**: `npm run generate:pink-mode-icons`
*   **Logic**:
    1.  Reads the source module to find the list of icon paths.
    2.  Reads each JSON file from disk.
    3.  Stringifies the JSON logic.
    4.  Generates a large JS file `src/scripts/data/pink-mode-animated-icons.js` that injects these assets into a global `cinePinkModeAnimatedIconData` object.

### 3. Consumption
The runtime (`globals-legacy-shim.js` or `app-core-bootstrap.js`) loads this generated file. The UI components then read directly from `window.cinePinkModeAnimatedIconData['path/to/icon.json']` instead of making a `fetch()` call.

## Developer Workflow

**Adding a new Pink Mode Icon:**
1.  Add the Lottie JSON file to the assets folder.
2.  Reference it in `src/scripts/core/modules/core/pink-mode-animations.js`.
3.  Run the generator:
    ```bash
    npm run generate:pink-mode-icons
    ```
4.  Commit the generated file.
