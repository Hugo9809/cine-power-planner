# Release Management Guide

This guide details the procedure for releasing new versions of Cine Power Planner.

## Versioning Strategy

We follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`).
*   **PATCH** (`1.0.X`): Bug fixes, safe refactors, doc updates.
*   **MINOR** (`1.X.0`): New features (e.g., Pink Mode, Auto Gear Rules).
*   **MAJOR** (`X.0.0`): Breaking changes to data schema or removal of core legacy support.

## Release Process (Manual)

While CI/CD handles testing, the final release is a manual gating process.

### 1. Pre-Flight Checks
*   [ ] All tests pass: `npm test`
*   [ ] Linting passes: `npm run lint`
*   [ ] Consistency check: `npm run check-consistency`
*   [ ] Documentation Audit: Are `README.md` and `CODEBASE_MAP.md` accurate?

### 2. Bump Version
Update `app-version.json` and sync dependent files.

```bash
# Edit app-version.json, then sync the repo
npm run version:sync
```

### 3. Update Changelog
Manually update `CHANGELOG.md` at the root.
*   Add a new header: `## [1.0.XX] - YYYY-MM-DD`
*   Categorize changes: `Added`, `Fixed`, `Changed`.

### 4. Build Production Artifacts
Generate the production bundle.

```bash
npm run build
```

*   **Verify**: Check `dist/app-version.js` contains the new version.
*   **Verify**: `dist/service-worker-assets.js` list looks correct.

### 5. Create Offline Bundle (Optional)
If delivering to an air-gapped client:
1.  Zip the `dist/` folder.
2.  Name it `cine-power-planner-v1.0.XX-offline.zip`.

### 6. Push & Tag
Push the commit and the tag created manually.

```bash
git push origin main --tags
```

### 7. GitHub Release
1.  Go to GitHub Releases.
2.  Draft a new release from the new tag.
3.  Paste the `CHANGELOG.md` content description.
4.  (Optional) Attach the Offline Bundle zip.

## Version Injection Architecture

The app version is injected in two ways:

1.  **Vite / Modern**: `vite.config.js` defines `import.meta.env.APP_VERSION`.
    *   `src/scripts/script.js` reads this and exposes `window.APP_VERSION`.
2.  **Legacy / Production**: `vite.config.js` generates `dist/app-version.js` during build.
    *   This script sets `window.APP_VERSION` globally before other scripts run.

> **Verification**: In the console, type `window.APP_VERSION` to confirm the version matches `app-version.json`.
