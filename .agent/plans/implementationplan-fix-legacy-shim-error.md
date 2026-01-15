# Implementation Plan - Fix Legacy Shim Null Reference Error

We are fixing a `TypeError: Cannot convert undefined or null to object` in `legacy-shim.js`'s `getProjectNames` function. This occurs when `localStorage` contains the string `"null"` or other JSON-parsable-but-non-object values for the key `cameraPowerPlanner_setups`.

## 1. Analysis
- **File**: `src/scripts/v2/legacy-shim.js`
- **Function**: `getProjectNames()`
- **Issue**: `JSON.parse` can return `null` if the input string is `"null"`. `Object.keys(null)` throws a TypeError.
- **Fix**: Add a null/type check for the parsed data before accessing keys.

## 2. Changes
- Modify `getProjectNames` in `src/scripts/v2/legacy-shim.js`.
- Wrap the `Object.keys(data)` call in a check for `data && typeof data === 'object'`.

## 3. Verification
- Use Browser Agent to reload the page and verify the console no longer shows the error.
- The logs previously showed this error repeatedly on page load.

## 4. Documentation
- No public documentation formatting updates needed, this is a bug fix in a shim.
- Will mention in `CHANGELOG.md` if relevant, but likely too minor (internal stability).
