# CI/CD & Release Pipeline

Cine Power Planner uses a simplified release pipeline focused on "Safety Checks" and "Automated Zoning".

## The Pipeline

Our CI/CD is currently lightweight, relying on GitHub Actions and local scripts.

### 1. The Pre-Commit Gauntlet (Local)
Before code leaves your machine, it should pass:
1.  **Tests**: `npm test` (Runs Unit, DOM, and Data tests).
2.  **Linting**: `npm run lint`.
3.  **Consistency**: `npm run check-consistency` (Data validity).

### 2. GitHub Actions
*   **Tests**: Runs `npm test` on every Pull Request.
*   **Release Drafter**:
    *   **Trigger**: Merges to `main`.
    *   **Action**: Categorizes merged PRs by label (`feat`, `fix`, `chore`) and drafts a Release Note in the GitHub UI.

## Release Process

We follow Semantic Versioning (`v1.0.X`).

1.  **Draft**:
    *   Run `npm version patch` (or `minor`/`major`).
    *   This updates `package.json` and creates a Git Tag.
2.  **Push**:
    *   `git push origin main --tags`
3.  **Publish**:
    *   Go to GitHub > Releases.
    *   Review the auto-drafted Release Notes from Release Drafter.
    *   Click "Publish Release".

## Production Build

The production site is a static bundle (`dist/`).
*   **Build Command**: `npm run build`
*   **Deployment**: Hosted on any Static Site Host (Netlify, Vercel, Firebase Hosting, or GitHub Pages).
*   **Requirement**: The host *must* serve `index.html` for unknown routes (SPA fallback), though our router is Hash-based (`#/`) so standard hosting works out of the box.
