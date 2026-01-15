# Storage Layer Architecture

This document details the "Twin-Store" pattern used to achieve high-performance Offline-First persistence in Cine Power Planner.

## Core Principle: The Twin-Store Pattern

To ensure input latency stays under 16ms (1 frame), the UI **NEVER** awaits an IndexedDB write during interactions.

1.  **Read Path**: Synchronous read from an **In-Memory Cache**.
2.  **Write Path**: Asynchronous, debounced write to **IndexedDB/OPFS**.

```mermaid
graph TD
    UI[V2 Views / Legacy DOM] -->|Sync Read| Cache[In-Memory Cache (storage.js)]
    UI -->|Request Save| Persistence[persistence.js (Manager)]
    
    Persistence -->|Debounce 1000ms| Repo[StorageRepository.js (Driver)]
    
    Repo -->|Async Write| IDB[(IndexedDB)]
    Repo -->|Backup Snapshot| OPFS[(OPFS)]
```

## Module Roles

### 1. The Manager: `src/scripts/modules/persistence.js`
*   **Responsibility**: Orchestration.
*   **Key Logic**:
    *   **Debouncing**: Aggregates rapid changes (e.g., typing in a text field) into a single write operation.
    *   **Queueing**: Ensures writes happen in order.
    *   **Broadcast**: Dispatches `cine:project:saved` events when persistence is confirmed.

### 1b. Auto-Gear Persistence: `src/scripts/modules/persistence/AutoGearService.js`
*   **Responsibility**: Twin-store cache for Auto-Gear rules, presets, backups, and defaults.
*   **Key Logic**:
    *   **Synchronous Reads**: Serves cached Auto-Gear data to legacy/global callers.
    *   **Async Writes**: Delegates persistence to `cinePersistence` bindings, falling back to `StorageRepository`.
    *   **Hydration**: Warms the cache from `StorageRepository` on startup for offline-first safety.

### 2. The Driver: `src/scripts/modules/storage/StorageRepository.js`
*   **Responsibility**: Abstraction.
*   **Key Logic**:
    *   Abstracts the underlying physical storage (IDB vs LocalStorage).
    *   Handles **Project Locking** (preventing overwrite if opened in another tab).
    *   Wraps data in "Sync Envelopes" (metadata for future cloud sync).

### 3. The Physical Store: `IndexedDBAdapter.js`
*   **Responsibility**: I/O.
*   **Key Logic**:
    *   Uses `idb-keyval` for simpler Promise-based interactions.
    *   Shards projects into individual records (`cine_project:{uuid}`).

## Migration Strategy (V1 -> V2)

The app automatically migrates data on startup via `StorageMigrationService.js`.

*   **Source**: `localStorage` key `cameraPowerPlanner_project` (Monolithic string).
*   **Destination**: IndexedDB store `keyval` (Sharded records).
*   **Trigger**: On boot, if `cine_project_index` is empty but legacy localstorage exists.
*   **Safety**: The legacy `localStorage` data is **NOT deleted** after migration, serving as a disaster recovery backup.
