# Shim Layer Documentation

This directory contains "poly-fills" and "shims" that normalize the JavaScript environment across different runtimes (Node.js, Legacy Browsers, Modern Browsers).

## File Overview

### `commonjs-shim.js`
Provides a fake `module.exports` environment for browser contexts. This allows us to use `module.exports = ...` in our dual-mode files without crashing the browser.

### `globalthis-polyfill.js`
A micro-polyfill for `globalThis`. Older browsers (and some older Node versions) do not support `globalThis`. This ensures `globalThis` is always available as the canonical top-level scope.

### `legacy-globals-shim.js`
Ensures that global functions used by the Legacy UI (like `toggleDeviceManagerSection`) are callable even if the underlying modules haven't essentially "exported" them yet. It creates the placeholders.

### `legacy-shims.js`
General purpose browser API polyfills (e.g., `CustomEvent`, `String.prototype.includes` for very old IE/Safari versions).

## Why is this needed?
The "Hybrid" nature of Cine Power Planner means code must run:
1.  **In the browser** (Offline, Service Worker)
2.  **In the terminal** (Node.js for testing and tools)
3.  **In legacy environments** (Older iPads/Laptops used on set)

These shims bridge the gap.
