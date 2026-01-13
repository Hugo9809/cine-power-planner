# Implementation Plan - Fix Boot and CSP Errors

An error in `src/scripts/storage.js` is preventing the application from booting. Additionally, a Content Security Policy (CSP) violation is blocking the service worker or HMR worker.

## User Review Required
> [!IMPORTANT]
> I will be modifying `src/scripts/storage.js` to move logging statements after imports.
> I will also check and potentially modify `index.html` or `vite.config.js` to adjust CSP settings if needed, but primarily focusing on `storage.js` first.

## Proposed Changes

### Storage Module
#### [MODIFY] [storage.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/storage.js)
- Move `console.log('DEBUG: storage.js execution started');` to after the import statements.
- Ensure no other statements precede imports.

### CSP / Service Worker (Investigation)
- Analyze `index.html` for CSP meta tags.
- If a CSP meta tag exists, update it to allow `blob:` for `worker-src` or `script-src` to fix the `client:935` error (which seems to be Vite's HMR worker).

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure `storage.js` is lint-free.
- Run `npm run test:unit` (or specific storage tests) to ensure no regressions.

### Manual Verification
- Start the server `npm run dev`.
- detailed-check: Warning logs for `storage.js` 500 error should disappear.
- detailed-check: The application should load (no white screen).
- Check console for "storage.js execution started" log.
- Check if the CSP error "violates the following Content Security Policy directive" is resolved.
