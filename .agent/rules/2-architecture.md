---
trigger: always_on
---

ARCHITECTURAL STANDARDS (Vite + JS)
1. Technology Stack (Immutable)
Build Tool: Vite (Native ESM).

Language: JavaScript (ES2022+ Modules). Use .js or .jsx extensions.

State/Storage:

Primary: IndexedDB (Transactional Data).

Backup/Persistence: OPFS (Origin Private File System).

Styling: CSS Modules or Tailwind CSS (via PostCSS).

2. Data Persistence Strategy (The "Twin-Store" Pattern)
You must implement a robust offline-first architecture using the following protocols:

A. Primary Storage: IndexedDB

Usage: Acts as the "Hot" database for UI interaction and queries.

Access: ALWAYS use a Promise-based wrapper (like idb) instead of the raw event-based API to prevent callback hell.

Versioning: maintain a strict db_version constant. Any schema change requires a version bump and an onupgradeneeded handler.

B. Backup System: OPFS (Origin Private File System)

Role: Serves as the "Cold" backup and file input/output layer.

Worker Mandate: Heavy I/O operations (reading/writing large backups to OPFS) MUST run in a Web Worker. Do NOT block the main thread.

Sync Access: Inside the Web Worker, use FileSystemSyncAccessHandle for high-performance, synchronous read/write operations when possible.

Serialization: When backing up, serialize IndexedDB object stores to JSON/Binary before writing to OPFS.

3. Component & Code Structure
ES Modules: Use native ESM syntax (import/export). No CommonJS (require).

Environment Variables: Access via import.meta.env (e.g., import.meta.env.VITE_API_URL), NOT process.env.

Workers: Import workers using the Vite syntax: new Worker(new URL('./worker.js', import.meta.url), { type: 'module' }).

4. Performance & Safety
Visual Feedback: Since storage operations are local, UI updates should be optimistic.

Error Handling: Wrap all IndexedDB/OPFS transactions in try/catch blocks. Handle QuotaExceededError gracefully (browser storage limits).