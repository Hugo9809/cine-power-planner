# Walkthrough: storage-language-update

## Scope
Documentation-only updates clarifying storage hierarchy and fallback behavior.

## Steps Taken
1. Updated Firebase architecture doc to emphasize IndexedDB primary store, OPFS backups, and localStorage legacy compatibility fallback.
2. Updated codebase overview storage module and loader steps to align with IndexedDB-first + OPFS backup model.
3. Updated user guide manual save row and offline storage descriptions to frame localStorage as legacy compatibility/migration fallback only.

## Result
All targeted documentation now consistently communicates IndexedDB as primary storage, OPFS backups where available, and localStorage as legacy fallback only.
