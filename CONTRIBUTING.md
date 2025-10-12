# Contributing to Cine Power Planner

Contributions are welcome! 🎉 If you have ideas for new features or find a bug, please let us know. Simply open an issue to discuss the improvement or bug, or check out the CONTRIBUTING.md to see how you can contribute. We gladly accept pull requests from the community.
When contributing, please follow our code style and testing guidelines, and be sure to abide by our Code of Conduct to keep our community friendly and professional.

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
