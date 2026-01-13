# Testing Strategy

Cine Power Planner uses a tiered testing strategy to ensure reliability across environments (Browser, Node, Offline).

## Quick Start

```bash
# Full test suite (lint + checks + Jest)
npm test

# Run specific test tier
npm run test:unit    # Pure logic, 1 GB heap
npm run test:data    # Device catalog, 1 GB heap
npm run test:dom     # UI components, 1.5 GB heap
npm run test:script  # Integration, 3 GB heap
```

## Test Tiers

### Tier 1: Unit Tests (`npm run test:unit`)

| Aspect | Details |
| --- | --- |
| **Focus** | Pure logic, calculation engines, data helpers |
| **Environment** | Node.js (Jest) |
| **Heap Limit** | 1 GB |
| **Speed** | Fast (< 10s) |
| **Location** | `tests/unit/` |

**Key test files:**
- `storage.test.js` — Persistence helpers and backup rotation
- `runtimeModule.test.js` — Runtime guard and error boundaries
- `translations/` — Translation validation

### Tier 2: Data Integrity Tests (`npm run test:data`)

| Aspect | Details |
| --- | --- |
| **Focus** | Device catalog schema validation |
| **Environment** | Node.js |
| **Heap Limit** | 1 GB |
| **Purpose** | Ensures every battery, camera, and lens follows schema |
| **Location** | `tests/data/` |

**Key test files:**
- `devices-schema.test.js` — Schema validation for all device types
- `battery-catalog.test.js` — Battery capacity and voltage checks
- `camera-catalog.test.js` — Camera power draw validation

### Tier 3: DOM Tests (`npm run test:dom`)

| Aspect | Details |
| --- | --- |
| **Focus** | UI component rendering |
| **Environment** | jsdom |
| **Heap Limit** | 1.5 GB |
| **Purpose** | Verifies component HTML output |
| **Location** | `tests/dom/` |

**Key test files:**
- `customItems.test.js` — Custom device/gear item rendering
- `badges.test.js` — Status badge component
- `modals.test.js` — Modal dialog rendering

### Tier 4: Script Validation (`npm run test:script`)

| Aspect | Details |
| --- | --- |
| **Focus** | Integration smoke tests |
| **Environment** | jsdom |
| **Heap Limit** | 3 GB |
| **Purpose** | Checks for syntax errors, circular dependencies |
| **Location** | `tests/script/` |
| **Note** | Requires `RUN_HEAVY_TESTS=true` for full suite |

## Directory Structure

```
tests/
├── README.md           # This file
├── unit/               # Pure logic tests
│   ├── storage.test.js
│   ├── runtimeModule.test.js
│   └── translations/
├── data/               # Device catalog validation
├── dom/                # jsdom UI component tests
├── script/             # Integration tests
├── helpers/            # Shared test utilities
├── setup/              # Jest setup files
├── stubs/              # Module stubs for isolation
├── verify/             # Verification utilities
└── __mocks__/          # Jest module mocks
```

## Running Tests

### Fuzzy Matching

Use fuzzy matching to run specific test files:

```bash
# Run all unit tests
npm run test:unit

# Run only storage tests
npm run test:unit storage

# Run only translation tests
npm run test:unit translations
```

### Running Specific Files

```bash
# Run a single test file
npx jest tests/unit/storage.test.js

# Run with verbose output
npx jest tests/unit/storage.test.js --verbose

# Run with coverage
npx jest tests/unit/ --coverage
```

### Heavy Tests

Script integration tests require extra memory:

```bash
# Run heavy integration tests
RUN_HEAVY_TESTS=true npm run test:script

# Or set permanently in shell
export RUN_HEAVY_TESTS=true
npm run test:script
```

## Writing New Tests

### Unit Test Template

```javascript
// tests/unit/my-feature.test.js

describe('MyFeature', () => {
  beforeEach(() => {
    // Reset state
  });

  describe('publicMethod', () => {
    it('should return expected result', () => {
      const result = publicMethod(input);
      expect(result).toBe(expected);
    });

    it('should handle edge case', () => {
      expect(() => publicMethod(null)).toThrow();
    });
  });
});
```

### DOM Test Template

```javascript
// tests/dom/my-component.test.js

import { JSDOM } from 'jsdom';

describe('MyComponent', () => {
  let document;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    document = dom.window.document;
  });

  it('should render correctly', () => {
    const container = document.createElement('div');
    renderMyComponent(container, { data: 'test' });
    
    expect(container.innerHTML).toContain('expected-content');
    expect(container.querySelector('.my-class')).toBeTruthy();
  });
});
```

### Data Test Template

```javascript
// tests/data/my-catalog.test.js

import devices from '../../src/data/devices/my-devices.js';

describe('My Device Catalog', () => {
  it('should have valid entries', () => {
    devices.forEach(device => {
      expect(device.id).toBeDefined();
      expect(device.name).toBeDefined();
      expect(typeof device.wattDraw).toBe('number');
    });
  });
});
```

## Test Configuration

The Jest configuration (`jest.config.cjs`) defines:

| Setting | Value |
| --- | --- |
| Projects | unit, data, dom, script |
| Transform | @swc/jest for ESM support |
| Setup Files | `tests/setup/*.cjs` |
| Test Timeout | 10000ms (unit), 30000ms (script) |
| Max Workers | 1 (sequential for memory control) |

## Troubleshooting

### Out of Memory Errors

Use the heap-limited commands:

```bash
npm run test:unit   # 1 GB cap
npm run test:data   # 1 GB cap
npm run test:dom    # 1.5 GB cap
```

### Module Not Found Errors

Ensure you're running from the project root:

```bash
cd cine-power-planner
npm run test:unit
```

### ESM Import Errors

The project uses ES Modules. If you see import errors:

1. Check the file extension is `.js` or `.mjs`
2. Ensure Jest transform is configured for the file type
3. Check `jest.config.cjs` for proper module resolution

### Outdated Snapshots

Update snapshots when making intentional changes:

```bash
npx jest tests/dom/ --updateSnapshot
```

## Related Documentation

- [TESTING.md](../TESTING.md) — Main testing guide with manual tests
- [Testing Plan](../docs/dev/testing-plan.md) — Pre-release testing requirements
- [Development Guide](../docs/dev/development.md) — All npm scripts
