# Contributing to Cine Power Planner

Thank you for your interest in improving Cine Power Planner!

## Development setup

1. Install [Node.js](https://nodejs.org/) 18 or later.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the full test suite before committing:
   ```bash
   npm test
   ```
   This runs ESLint, data consistency checks and Jest tests.

## Making changes

- Changes to device definitions live in the `devices/` directory. After editing, run:
  ```bash
  npm run normalize
  npm run unify-ports
  npm run check-consistency
  npm run generate-schema
  ```
- To add translations, follow the steps in [docs/translation-guide.md](docs/translation-guide.md) so documentation, UI strings and language selectors stay in sync.
- For other updates such as documentation or bug fixes, include tests where practical.

## Pull requests

1. Fork the repository and create your change.
2. Ensure `npm test` passes.
3. Submit a pull request with a clear description of the changes and reasoning.

## License

By contributing, you agree that your contributions will be licensed under the project's [ISC license](package.json).
