---
name: developing-with-tdd
description: Implement features or bugfixes using strict Test-Driven Development (Red-Green-Refactor).
---

# Test-Driven Development (TDD)

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over.

## Red-Green-Refactor Cycle

### 1. RED - Write Failing Test

Write one minimal test showing what should happen.

**Good:**
```javascript
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```

**Requirements:**
- One behavior per test.
- Clear name.
- Real code (avoid mocks if possible).

**Verify RED:**
Run the test. It MUST fail.
If it passes, you are testing existing behavior or the test is wrong.

### 2. GREEN - Minimal Code

Write the simplest code to pass the test.

**Good:**
```javascript
async function retryOperation(fn) {
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === 2) throw e;
    }
  }
}
```

**Verify GREEN:**
Run the test. It MUST pass.

### 3. REFACTOR - Clean Up

After green only:
- Remove duplication.
- Improve names.
- Extract helpers.
- **Keep tests green.**

## Common Rationalizations (Avoid These)

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. No record. |

## Testing Anti-Patterns

Before mocking, read **[Testing Anti-Patterns](resources/testing-anti-patterns.md)** to avoid common pitfalls like testing mock behavior instead of real behavior.

## Checklist

- [ ] Every new function has a test?
- [ ] Watched test fail first?
- [ ] Write minimal code?
- [ ] All tests pass?
