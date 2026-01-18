# Condition-Based Waiting

## Overview

Flaky tests often guess at timing with arbitrary `setTimeout`.
**Core principle:** Wait for the actual condition you care about, not a guess.

## Core Pattern

```javascript
// ❌ BEFORE: Guessing at timing
await new Promise(r => setTimeout(r, 50));
const result = getResult();
expect(result).toBeDefined();

// ✅ AFTER: Waiting for condition
await waitFor(() => getResult() !== undefined);
const result = getResult();
expect(result).toBeDefined();
```

## Implementation

```javascript
/**
 * Polls for a condition to be true.
 * @param {Function} conditionFn - Returns true/truthy when ready
 * @param {string} description - For error message
 * @param {number} timeoutMs - Max wait time
 */
async function waitFor(conditionFn, description, timeoutMs = 5000) {
  const startTime = Date.now();

  while (true) {
    const result = conditionFn();
    if (result) return result;

    if (Date.now() - startTime > timeoutMs) {
      throw new Error(`Timeout waiting for ${description} after ${timeoutMs}ms`);
    }

    await new Promise(r => setTimeout(r, 10)); // Poll every 10ms
  }
}
```

## Quick Patterns

| Scenario | Pattern |
|----------|---------|
| Wait for DOM | `waitFor(() => document.querySelector('.modal'))` |
| Wait for Array | `waitFor(() => items.length >= 5)` |
| Wait for Value | `waitFor(() => myObject.isReady === true)` |
