# Contributing to Cine Power Planner

First off, thanks for taking the time to contribute! 🎬🚀 By contributing to **Cine Power Planner**, you help make this tool better for all filmmakers.

The following is a set of guidelines for contributing. These are mostly suggestions, not hard rules. Use your best judgment, and feel free to propose changes to this document via a pull request.

## Quick Start for Contributors

```bash
git clone https://github.com/<your-username>/cine-power-planner.git
cd cine-power-planner
npm install
npm run dev    # Start dev server at localhost:3000
```

> [!TIP]
> New to the codebase? Start with [Codebase Overview](docs/dev/codebase-overview.md) for architecture context.

## How Can I Contribute?

### Reporting Bugs 🐞

If you find a bug or problem:
- **Search the issue tracker** to see if it's already reported. If not, open a new issue.
- **Include details:** Explain the problem and include steps to reproduce it. Add screenshots or error logs if possible.
- **Use a clear title:** e.g., "Calculator crashes when adding custom camera".

### Suggesting Features 💡

Have an idea to improve the project?
- Check existing issues or discussions to see if it's already been suggested.
- Open a **Feature Request** issue (use the provided template) or start a Discussion to describe your idea.
- Explain the use case and how it would benefit users. If you can, suggest how it might be implemented.

### Improving Documentation 📖

Not all contributions are code! You can help by:
- Fixing typos or clarifying instructions in the README or docs.
- Writing tutorials or examples for using Cine Power Planner.
- Translating documentation to other languages (see [Translation Guide](docs/dev/translation-guide.md)).
- Updating architecture docs when you notice drift from the codebase.

**Key documentation files:**
| File | Purpose |
| --- | --- |
| `README.md` | Project overview and quick start |
| `docs/dev/codebase-overview.md` | Architecture and directory structure |
| `docs/dev/development.md` | Development workflow and npm scripts |
| `TESTING.md` | Testing strategy and commands |

If you see something that can be improved, feel free to open an issue or pull request for documentation changes.

## Architecture Quick Reference

```
src/
├── main.js                    # Vite entry point (ESM)
├── scripts/
│   ├── runtime/               # Bootstrap helpers shared across bundles
│   ├── modules/               # Core business logic (ESM with global fallbacks)
│   │   ├── persistence.js     # Save/backup/restore
│   │   ├── results.js         # Power calculations
│   │   └── offline.js         # Service worker, cache
│   ├── v2/                    # Modern UI layer (ESM)
│   │   ├── bootstrap.js       # V2 initialization
│   │   ├── view-manager.js    # Hash-based routing
│   │   └── views/             # Specialized views
│   ├── auto-gear/             # Automatic gear rules
│   ├── contacts/              # Crew contact management
│   └── core/                  # Legacy app-core modules
├── data/
│   └── devices/               # Equipment catalog
└── styles/                    # CSS files
```

See [Codebase Overview](docs/dev/codebase-overview.md) for detailed architecture docs.

## Development Setup

Interested in hacking on the code? Great! Follow these steps to set up a local development environment:

> [!IMPORTANT]
> **Always run the app via the Vite dev server** (`npm run dev`) when developing and testing. This enables hot module replacement and proper ES module resolution.


1.  **Fork the repository** (click the "Fork" button at the top right of this page) and clone your fork:
    ```sh
    git clone https://github.com/<your-username>/cine-power-planner.git
    cd cine-power-planner
    ```
2.  Create a branch for your change:
    ```sh
    git checkout -b my-feature-branch
    ```
3.  Install dependencies for development:
    ```sh
    npm install
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
5.  Make your changes! The app will hot-reload automatically.
6.  Run tests before committing:
    ```sh
    npm test
    ```
    Make sure all tests pass before submitting your PR.
7.  Commit your changes with a descriptive commit message.
8.  Push to your fork:
    ```sh
    git push origin my-feature-branch
    ```
9.  Open a Pull Request on the main repository:
    Go to the repository on GitHub and click "Compare & Pull Request".
    Fill out the PR template, link any relevant issues (e.g., "Closes #10" if addressing issue #10), and describe your changes.

## Testing Your Changes

Run the appropriate test commands based on what you're changing:

| What You Changed | Test Command |
| --- | --- |
| Any change | `npm test` (full suite) |
| Module logic | `npm run test:unit` |
| Device data | `npm run test:data` |
| DOM utilities | `npm run test:dom` |
| Code style | `npm run lint` |
| Device catalog | `npm run check-consistency` |

For UI changes, also run manual verification in the browser:
1. Test the feature in `npm run dev`
2. Test offline mode (toggle network off in DevTools)
3. Verify Force Reload works

See [TESTING.md](TESTING.md) for detailed testing documentation.

### Pull Request Guidelines

*   **Discuss first:** If your change is large or architectural, it's a good idea to open an issue or discussion first to get feedback.
*   **One feature per PR:** Keep changes focused. It's better to open multiple small PRs than one big PR that does many things.
*   **Include tests:** If you add a new feature or fix a bug, please add or update tests to cover the change if possible.
*   **Respect coding standards:** Follow the code style of the project (ESLint). Ensure your editor respects the project's formatting (spaces vs tabs, line endings, etc.).
*   **Update documentation:** If your change affects how users use the tool, update the README or any docs accordingly.

### Validating Changes ✅

Before submitting your PR, please run the consistency check to ensure your changes don't break the data structure or the service worker manifest:

```bash
npm run check-consistency
```

If this script reports any issues, please fix them before pushing.

### Common Development Tasks

| Task | Steps |
| --- | --- |
| Add a new device | Edit `src/data/devices/`, run `npm run check-consistency` |
| Add a new V2 view | Create in `src/scripts/v2/views/`, register in `view-manager.js` |
| Add a module | Create in `src/scripts/modules/`, register with `cineModules` |
| Update translations | Edit `src/scripts/translations/`, run `npm run dev` to verify |

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainer.

[Read the full Code of Conduct here](CODE_OF_CONDUCT.md).

## Additional Resources

- [Development & Maintenance Guide](docs/dev/development.md) — npm scripts, troubleshooting
- [Vite Migration Guide](docs/dev/vite-migration.md) — ESM patterns
- [V2 Views Architecture](docs/dev/architecture/v2-views.md) — Modern UI system
- [Module Registry](docs/dev/architecture/module-registry.md) — Dependency injection

## Thank You 🙏

Your contributions make Cine Power Planner better for everyone. Thank you for helping out! If you have any questions, feel free to reach out by opening an issue or discussion.
