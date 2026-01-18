# Module: src/scripts/modules/storage

[← Back to INDEX](../../INDEX.md)

**Type:** implicit | **Files:** 7

## Files

| File | Lines | Large |
| ---- | ----- | ----- |
| `src/scripts/modules/storage/DataVault.js` | 135 |  |
| `src/scripts/modules/storage/ProjectLockService.js` | 470 |  |
| `src/scripts/modules/storage/StorageInterface.js` | 58 |  |
| `src/scripts/modules/storage/StorageMigrationService.js` | 139 |  |
| `src/scripts/modules/storage/StorageRepository.js` | 382 |  |
| `src/scripts/modules/storage/SyncMetadata.js` | 313 |  |
| `src/scripts/modules/storage/event-helpers.js` | 191 |  |

## Documentation

- [imports.md](imports.md) - Dependencies

---

| High 🔴 | Medium 🟡 | Low 🟢 |
| 0 | 0 | 2 |

## 🟢 Low Priority

### `NOTE` (src/scripts/modules/storage/DataVault.js:68)

> OPFS iteration syntax varies slightly by browser, but standard is async iterator

### `NOTE` (src/scripts/modules/storage/StorageMigrationService.js:41)

> cine_user_uuid is regenerated/scoped by UserContext; migrating it risks cross-user contamination.
