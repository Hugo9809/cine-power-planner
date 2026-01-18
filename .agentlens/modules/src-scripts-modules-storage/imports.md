# Imports

[← Back to MODULE](MODULE.md) | [← Back to INDEX](../../INDEX.md)

## Dependency Graph

```mermaid
graph TD
    src_scripts_modules_storage[src-scripts-modules-storage] --> core[core]
    src_scripts_modules_storage[src-scripts-modules-storage] --> _[.]
    src_scripts_modules_storage[src-scripts-modules-storage] --> _[.]
    src_scripts_modules_storage[src-scripts-modules-storage] --> _[.]
    src_scripts_modules_storage[src-scripts-modules-storage] --> drivers[drivers]
    src_scripts_modules_storage[src-scripts-modules-storage] --> drivers[drivers]
```

## External Dependencies

Dependencies from other modules:

- `../core/UserContext.js`
- `./ProjectLockService.js`
- `./StorageRepository.js`
- `./SyncMetadata.js`
- `./drivers/IndexedDBAdapter.js`
- `./drivers/LocalStorageAdapter.js`

