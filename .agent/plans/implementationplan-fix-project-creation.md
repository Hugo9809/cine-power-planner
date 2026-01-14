# Fix Project Creation Implementation Plan

## Problem
1. **Inconsistent UI**: Different "Add Project" buttons may be behaving differently.
2. **Data Loss**: Creating a project and immediately navigating away (as `createProject` does) causes a race condition with the legacy async save mechanism, resulting in data loss.

## Proposed Changes

### `src/scripts/v2/project-dashboard.js`

1.  **Refactor `createProject` to be Async**:
    *   Change `createProject` to return a `Promise`.
    *   Inside `createProject`, wrap the legacy shim polling logic in a Promise.
    *   Only navigate (`global.cineViewManager.showView`) after the Promise resolves (i.e., when we confirm the project is saved in localStorage).

2.  **Update `showCreateProjectDialog`**:
    *   In `handleCreate`, make it `async`.
    *   Await `createProject`.
    *   Show a loading state on the button while creating.

3.  **Unify Entry Points**:
    *   Verify `bindTileEvents` (Tile), `bindEmptyStateEvents` (Empty State), and `init` (Header Button) all call `showCreateProjectDialog`.

## Verification Plan

### Manual Verification
1.  **Header Button**: Click "New Project" in header -> Create "Test Header" -> Verify it opens and persists.
2.  **Tile Button**: Go back to dashboard -> Click "New Project" tile -> Create "Test Tile" -> Verify it opens and persists.
3.  **Empty State**: clear projects (or search for nonsense) -> Click "New Project" button in empty state -> Create "Test Empty" -> Verify it opens and persists.

### Automated Test
*   Technically difficult to test legacy localStorage race conditions in unit tests without extensive mocking, but we will rely on the polling logic which is robust.
