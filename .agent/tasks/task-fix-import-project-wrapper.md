# Task: fix-import-project-wrapper

## Goal
Ensure legacy project bundle imports that store entries as `{ name, project }` preserve the nested project payload to prevent data loss.

## Checklist
- [x] Identify the import path handling project collections.
- [x] Update import handling to unwrap named project wrappers.
- [x] Add regression coverage for named wrapper imports.
- [x] Update documentation and README for compatibility notes.
- [x] Run targeted unit tests.

## Status
- **State:** Completed
