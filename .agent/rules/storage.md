---
trigger: always_on
---

The storage architecture is native IndexedDB with origin private file system (OPFS) backups. Slowly migrate every storage to this. We just ensure legacy support with the migration from local storage. No new feature should rely on legacy local storage. 