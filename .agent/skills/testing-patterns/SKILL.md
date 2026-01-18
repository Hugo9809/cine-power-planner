---
name: testing-patterns
description: Jest testing patterns, factory functions, mocking strategies. Use when writing unit tests, creating test factories, or following TDD.
---

# Testing Patterns (Jest)

## Testing Philosophy

- **TDD:** Write failing test FIRST, implement, refactor.
- **Behavior-Driven:** Test behavior, not implementation details.
- **Factory Pattern:** Create `getMock<X>(overrides?)` functions.

## Factory Pattern

### Props Factory

```javascript
const getMockUserProps = (overrides = {}) => ({
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  onSave: jest.fn(),
  ...overrides
});

// Usage
it("should display custom name", () => {
  const props = getMockUserProps({ name: "Alice" });
  // ...
});
```

### Data Factory

```javascript
const getMockProject = (overrides = {}) => ({
  id: "proj-1",
  name: "Test Project",
  devices: [],
  createdAt: new Date().toISOString(),
  ...overrides
});
```

## Mocking Patterns

### Mocking Modules

```javascript
// Mock entire module
jest.mock("../storage");

// Mock with implementation
jest.mock("../storage", () => ({
  saveProject: jest.fn().mockResolvedValue(true),
  loadProject: jest.fn().mockResolvedValue(null)
}));
```

### Accessing Mocks

```javascript
const mockSave = jest.requireMock("../storage").saveProject;

it("should call save", async () => {
  await doSomething();
  expect(mockSave).toHaveBeenCalled();
});
```

## Test Structure

```javascript
describe("ComponentName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with default props", () => {});
    it("should render loading state", () => {});
  });

  describe("User interactions", () => {
    it("should call onSave when button clicked", async () => {});
  });

  describe("Edge cases", () => {
    it("should handle empty data", () => {});
  });
});
```

## Anti-Patterns to Avoid

### Testing Mock Behavior

```javascript
// ❌ BAD - testing the mock
expect(mockFetch).toHaveBeenCalled();

// ✅ GOOD - testing actual behavior
expect(screen.getByText("John Doe")).toBeTruthy();
```

### Not Using Factories

```javascript
// ❌ BAD - duplicated, inconsistent
it("test 1", () => {
  const user = { id: "1", name: "John", email: "john@test.com" };
});
it("test 2", () => {
  const user = { id: "2", name: "Jane" }; // Missing email!
});

// ✅ GOOD - reusable factory
const user = getMockUser({ name: "Custom" });
```

## Best Practices

1. Always use factory functions for props and data.
2. Test behavior, not implementation.
3. Use descriptive test names.
4. Clear mocks between tests.
5. Keep tests focused - one behavior per test.
