# Codebase Overview

This document provides a high-level map of the Cine Power Planner codebase. It is intended to help developers navigate the project, understand key architectural decisions, and grasp the flow of data through the application.

## Directory Structure

The `src/scripts` directory is the heart of the application logic.

### `src/scripts/core`
Contains the large "application layer" files that orchestrate the UI and business logic.
- **`app-session.js`**: Manages the current user session, active project state, and cross-tab synchronization.
- **`app-events.js`**: UI event binding and legacy event proxies.
- **`app-core-new-1.js` / `app-core-new-2.js`**: Monolithic legacy files containing much of the original application logic.

### `src/scripts`
Contains the top-level application entry points and core utilities.
- **`loader.js`**: The entry point of the application. It bootstraps the environment, loads modules, and initializes the UI.
- **`storage.js`**: Manages all local storage interactions, including the "safe save" mechanism and backup rotation.
- **`globals-bootstrap.js`**: The "Resilient Scope" pattern—ensures global state is defined before other modules run.

### `src/scripts/modules`
Implements the core business logic of the application. These modules are responsible for data management, calculations, and persistence.
- **`results.js`**: The calculation engine. It computes runtimes, power draw, and generates the data for the UI.
- **`registry.js`**: A dependency injection container that manages module lifecycle.
- **`logging.js`**: Centralized logging facility with offline history buffers.
- **`system.js`**: Browser capability detection and the "Kernel" pattern.
- **`globals.js`**: Global state and constants.

### `src/scripts/v2`
Contains the View layer for the V2 UI (the modern interface).
- **`bootstrap.js`**: Entry point for V2 UI initialization (Hybrid Swap pattern).
- **`project-dashboard.js`**: Renders the main dashboard view with project tiles, filtering, context menus, and project CRUD operations.
- **`project-detail.js`**: Handles the project detail view with tabs (Camera Package, Power Summary, Requirements, Gear List), status dropdown, and legacy element re-parenting.
- **`sidebar.js`**: Manages the sidebar navigation, search proxy to legacy search, theme toggles (dark/pink mode), mobile toggle, and language selector.
- **`view-manager.js`**: Handles view routing, hash-based navigation, and switching between different views.
- **`help-data.js`**: Static V2-specific help content definitions.
- **`help-service.js`**: Merges V2 help data with legacy localized help topics.
- **`legacy-shim.js`**: Bridges V2 components with legacy V1 functionality.

### `src/scripts/v2/views`
Specialized view components for specific application sections:
- **`contacts-view.js`**: Crew contact management with vCard import support.
- **`device-library-view.js`**: Equipment database browser wrapping legacy device manager.
- **`help-view.js`**: In-app help center with TOC, search, and content display.
- **`owned-gear-view.js`**: Personal equipment inventory tracking.
- **`rules-view.js`**: Automatic gear rule configuration and coverage dashboard.
- **`settings-view.js`**: Application settings, preferences, and backup/restore controls.

## Key Files & Responsibilities

### `src/scripts/loader.js`
**Role:** Orchestrator
The `loader.js` file is the first script to run. It:
1. Detects browser capabilities.
2. Initializes the `Registry`.
3. Loads core modules (`logging`, `storage`, `results`).
4. Bootstraps the UI.
5. Handles the initial data load from LocalStorage.

### `src/scripts/storage.js`
**Role:** Persistence Layer
This module is critical for data safety. It implements a "Snapshot & Commit" strategy:
- **Write Safety**: Before saving, it serializes the current state to a temporary slot, verifies integrity, and only then promotes it to the main slot.
- **Backup Rotation**: Automatically rotates backups (A/B/C) on every save to prevent data loss from corruption.

### `src/scripts/modules/results.js`
**Role:** Calculation Engine
This logic computes the power model:
- **Inputs**: Batteries (voltage, capacity), Devices (voltage, draw), Safe Margins.
- **Logic**: Aggregates total draw, calculates effective capacity (accounting for Peukert effect/efficiency), and derives remaining runtime.

## Architectural Visualization

### Startup Sequence

```mermaid
sequenceDiagram
    participant B as Browser
    participant L as Loader
    participant R as Registry
    participant S as Storage
    participant UI as ViewManager

    B->>L: Scripts Loaded
    L->>L: Check Capabilities
    L->>R: Register Modules
    L->>S: Initialize Storage
    S-->>L: Storage Ready (Schema Validated)
    L->>S: Load Active Project
    S-->>L: Project Data
    L->>UI: Render Initial View
```

### Data Persistence Cycle

```mermaid
flowchart TD
    A[User Action] -->|Trigger Save| B{Valid State?}
    B -- No --> C[Reject Save]
    B -- Yes --> D[Serialize Project]
    D --> E[Write to Temp Slot]
    E --> F{Verify Integrity}
    F -- Fail --> G[Rollback / Error]
    F -- Pass --> H[Promote to Main Slot]
    H --> I[Rotate Backups]
    I --> J[Update UI (Last Saved)]
```

### Calculation Engine Loop

```mermaid
flowchart LR
    A[Device Added/Modified] --> B[Event: DeviceChanged]
    C[Battery Changed] --> B
    B --> D[Results.updateCalculations]
    D --> E[Sum Power Draw]
    D --> F[Calculate Effective Capacity]
    E & F --> G[Compute Runtime]
    G --> H[Update UI DOM]
```

### V2 View Architecture

```mermaid
flowchart TD
    subgraph Bootstrap
        B[bootstrap.js] --> VM[view-manager.js]
        B --> SB[sidebar.js]
    end
    
    subgraph Views
        VM --> PD[project-dashboard.js]
        VM --> PDT[project-detail.js]
        VM --> V[views/]
    end
    
    subgraph Specialized Views
        V --> CV[contacts-view.js]
        V --> DV[device-library-view.js]
        V --> HV[help-view.js]
        V --> OV[owned-gear-view.js]
        V --> RV[rules-view.js]
        V --> SV[settings-view.js]
    end
    
    subgraph Services
        HS[help-service.js] --> HV
        HD[help-data.js] --> HS
        LS[legacy-shim.js] --> VM
    end
```
