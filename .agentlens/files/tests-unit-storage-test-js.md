# tests/unit/storage.test.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 3888
- **Language:** JavaScript
- **Symbols:** 16
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 6 | fn | createStorageMock | (private) | `const createStorageMock = () => {` |
| 269 | fn | backupKeyFor | (private) | `const backupKeyFor = (key) => `${key}${BACKUP_S...` |
| 270 | fn | migrationBackupKeyFor | (private) | `const migrationBackupKeyFor = (key) => `${key}$...` |
| 276 | fn | parseLocalStorageJSON | (private) | `const parseLocalStorageJSON = (key) => {` |
| 284 | fn | getDecodedLocalStorageItem | (private) | `const getDecodedLocalStorageItem = (key) => dec...` |
| 286 | fn | withGenerationFlag | (private) | `const withGenerationFlag = (value, generated = ...` |
| 291 | fn | decompressStorageEnvelope | (private) | `const decompressStorageEnvelope = (value) => {` |
| 324 | fn | createAutoGearPersistenceStub | (private) | `const createAutoGearPersistenceStub = (initial ...` |
| 336 | fn | setCacheValue | (private) | `const setCacheValue = (key, value) => {` |
| 364 | fn | expectAutoBackupSnapshot | (private) | `const expectAutoBackupSnapshot = (entry, expect...` |
| 1435 | fn | pad | (private) | `const pad = (n) => String(n).padStart(2, '0');` |
| 1953 | fn | buildRules | (private) | `const buildRules = (presetIndex) => Array.from(...` |
| 2021 | fn | createStorage | (private) | `const createStorage = () => ({` |
| 2114 | fn | createStorage | (private) | `const createStorage = () => ({` |
| 2206 | fn | createStorage | (private) | `const createStorage = () => ({` |
| 3604 | fn | readMigrationBackupData | (private) | `const readMigrationBackupData = (storageKey) => {` |

## Memory Markers

### 🟡 `TODO` (line 597)

> This test requires rewrite for new StorageRepository architecture.

### 🟢 `NOTE` (line 1857)

> In the new architecture (StorageRepository + memory cache), deletion backups

### 🟢 `NOTE` (line 1940)

> In the new architecture, loadAutoGearBackups returns cached data or

### 🟡 `TODO` (line 1950)

> This test requires rewrite for new StorageRepository architecture.

### 🟡 `TODO` (line 1995)

> This test requires rewrite for new StorageRepository architecture.

### 🟡 `TODO` (line 2112)

> This test requires rewrite for new StorageRepository architecture.

### 🟡 `TODO` (line 2204)

> This test requires rewrite for new StorageRepository architecture.

### 🟢 `NOTE` (line 2298)

> In the new architecture, migration backups are managed by

### 🟢 `NOTE` (line 2327)

> In the new architecture, legacy key migration happens at module

### 🟡 `TODO` (line 2974)

> This test requires rewrite for new StorageRepository architecture.

