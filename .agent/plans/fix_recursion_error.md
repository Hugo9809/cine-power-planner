# Fix Recursion in app-core-new-1.js

The `RangeError: Maximum call stack size exceeded` is caused by auto-gear normalizer functions (like `normalizeAutoGearTriggerValue`) attempting to resolve their implementation from the global scope on every call. Since these functions are also assigned to the global scope, they end up calling themselves recursively.

## Proposed Changes

### [Component] Core Runtime Shims

#### [MODIFY] [app-core-new-1.js](file:///Users/lucazanner/Documents/GitHub/cine-power-planner/src/scripts/core/app-core-new-1.js)

Refactor the auto-gear normalizers and storage helpers to:
1.  Use a local fallback implementation.
2.  Check if a global implementation exists and is *different* from the local shim.
3.  Avoid dynamic resolution on every call if possible, or ensure it's safe.

Specifically, I will change the pattern from:
```javascript
const fn = (v) => (resolveHelper('fn') || fallback)(v);
globalThis.fn = fn;
```
to:
```javascript
const fallbackFn = (v) => ...;
const fn = (v) => {
  const globalFn = resolveHelper('fn');
  if (globalFn && globalFn !== fn) return globalFn(v);
  return fallbackFn(v);
};
globalThis.fn = fn;
```
Wait, even better: resolve them once at the start of the file IF they are not already defined, and then use that.

Actually, the existing code was trying to be too clever.
I will simplify it to:
```javascript
const normalizeAutoGearTriggerValue = (value) => {
  const resolved = resolveAutoGearNormalizer('normalizeAutoGearTriggerValue');
  if (resolved && resolved !== normalizeAutoGearTriggerValue) return resolved(value);
  return typeof value === 'string' ? value.trim() : '';
};
```
And apply this to all similar functions.

## Verification Plan

### Manual Verification
- Start the development server and check if the application boots without the `RangeError`.
- Verify that the loading overlay is dismissed and device dropdowns are populated.
