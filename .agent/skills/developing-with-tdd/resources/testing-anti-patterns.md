# Testing Anti-Patterns

**Load this reference when:** writing or changing tests, adding mocks.

## The Iron Laws

1. NEVER test mock behavior.
2. NEVER add test-only methods to production classes.
3. NEVER mock without understanding dependencies.

## Anti-Pattern 1: Testing Mock Behavior

**The violation:**
```javascript
// ❌ BAD: Testing that the mock exists
test('renders sidebar', () => {
    // If you mocked Sidebar...
    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
});
```

**Why:** You're verifying the mock works, not the component.

**The Fix:** Test real behavior or don't mock.

## Anti-Pattern 2: Test-Only Methods in Production

**The violation:**
```javascript
class Session {
  destroy() { // Only used in tests!
     this.cleanup();
  }
}
```

**The Fix:** Move to test utilities.
```javascript
// test-utils.js
export function cleanupSession(session) { ... }
```

## Anti-Pattern 3: Mocking Without Understanding

**The violation:** Mocking a dependency to return `undefined` just to make a test pass, without realizing the real dependency writes to a config file the test relies on.

**The Fix:** Understand side effects before mocking.

## Anti-Pattern 4: Incomplete Mocks

**The violation:**
```javascript
const mockUser = { name: 'Alice' }; // Missing 'id', 'email', 'role'...
```

**The Fix:** Mirror the real data structure completely.
```javascript
const mockUser = { 
  id: 'u-1', 
  name: 'Alice', 
  email: 'test@example.com', 
  role: 'admin' 
};
```
Partial mocks lead to silent failures when downstream code accesses missing fields.

## Anti-Pattern 5: Integration Tests as Afterthought

Testing is part of implementation. "Code complete but no tests" is a lie.
