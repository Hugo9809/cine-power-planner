# Implementation Plan: fix-import-project-wrapper

## Architectural Impact
- **Modified files:**
  - `src/scripts/storage.js` (import compatibility for project collections)
  - `tests/unit/storage.test.js` (coverage for named project wrapper imports)
  - `docs/user/save-share-restore-reference.md` (import compatibility note)
  - `README.md` (data safety note)

## Step-by-Step Execution
1. Update `importProjectCollection` to unwrap `{ name, project }` entries so legacy bundles preserve project payloads.
2. Add a unit test covering named wrapper imports in `tests/unit/storage.test.js`.
3. Document the legacy wrapper compatibility in user documentation and the root README.
4. Run the unit test suite for storage to validate the fix.

## Verification Strategy
- Run `npm run test:unit storage` to validate the new regression coverage and storage import behavior.

## Status
- **State:** Completed
