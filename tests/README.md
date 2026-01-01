# Testing Strategy

Cine Power Planner uses a tiered testing strategy to ensure reliability across environments (Browser, Node, Offline).

## Tier 1: Unit Tests (`npm run test:unit`)
- **Focus**: Pure logic, calculation engines, and data helpers.
- **Environment**: Node.js (JSDOM).
- **Speed**: Fast (< 4s).
- **Location**: `tests/unit/`

## Tier 2: Data Integrity Tests (`npm run test:data`)
- **Focus**: Validating the JSON device catalogs (`src/data/devices/*.js`).
- **Environment**: Node.js.
- **Purpose**: Ensures that every battery, camera, and lens follows the schema. No "broken" data can exist.
- **Location**: `tests/data/`

## Tier 3: DOM Tests (`npm run test:dom`)
- **Focus**: Lightweight UI component testing.
- **Environment**: JSDOM.
- **Purpose**: Verifies that simple UI renders (like badges or lists) produce the expected HTML.
- **Location**: `tests/dom/`

## Tier 4: Script Validation (`npm run test:script`)
- **Focus**: Integration "Smoke Tests" for `script.js`.
- **Purpose**: Checks for syntax errors or circular dependencies in the main bundle.

## How to Run Tests
Use the fuzzy matcher for convenience:

```bash
# Run all unit tests
npm run test:unit

# Run only storage tests
npm run test:unit storage
```
