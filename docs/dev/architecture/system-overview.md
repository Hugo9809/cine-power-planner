# System Architecture Overview

This document provides a high-level visual map of the Cine Power Planner architecture, illustrating how the UI, Runtime, and Storage layers interact.

## High-Level Component Diagram

```mermaid
graph TD
    subgraph UI_Layer ["UI Layer (V2 + Legacy)"]
        Nav[Navigation & Routing]
        Dash[Dashboard View]
        Proj[Project Detail View]
        Over[Overlays & Dialogs]
        
        Nav --> Dash
        Nav --> Proj
        Proj --> Over
    end

    subgraph Runtime_Layer ["Runtime Layer (ES Modules)"]
        Registry[Module Registry]
        Bus[Event Bus]
        
        %% Core Features
        Backup[Backup & Restore]
        AutoGear[Auto Gear Engine]
        Print[Print Service]
        
        Registry --> Backup
        Registry --> AutoGear
        Registry --> Print
    end

    subgraph Service_Layer ["Core Services"]
        State[Runtime State]
        Loader[Module Loader]
        Env[Environment Helpers]
        
        Loader --> Registry
        Env --> State
    end

    subgraph Storage_Layer ["Persistence Layer"]
        Facade[Persistence Facade]
        TwinStore[Twin-Store Engine]
        
        Facade --> TwinStore
        TwinStore --> IDB[(IndexedDB)]
        TwinStore --> LS[(LocalStorage - Legacy)]
        TwinStore --> OPFS[(OPFS - Backup)]
    end

    %% Wiring it all together
    UI_Layer --> Registry
    Registry --> Service_Layer
    Backup --> Facade
    State --> Facade
    
    %% Styles
    classDef ui fill:#e1f5fe,stroke:#01579b,color:#01579b
    classDef runtime fill:#f3e5f5,stroke:#4a148c,color:#4a148c
    classDef storage fill:#fff3e0,stroke:#e65100,color:#e65100
    classDef service fill:#e8f5e9,stroke:#1b5e20,color:#1b5e20

    class UI_Layer,Nav,Dash,Proj,Over ui
    class Runtime_Layer,Registry,Bus,Backup,AutoGear,Print runtime
    class Storage_Layer,Facade,TwinStore,IDB,LS,OPFS storage
    class Service_Layer,State,Loader,Env service
```

## Layer Responsibilities

### 1. UI Layer
Handles user interaction, routing (`v2-views.md`), and presentation. It communicates with the Runtime Layer via the Module Registry and Event Bus.

### 2. Runtime Layer
Orchestrates business logic through isolated feature modules. The **Module Registry** (`module-registry.md`) ensures safe dependency injection and prevents cyclic dependencies.

### 3. Service Layer
Provides foundational utilities like scope detection (`runtime-environment.md`), module loading, and global state management.

### 4. Persistence Layer
Manages data safety using the **Twin-Store Pattern** (`storage-layer.md`). It writes primarily to IndexedDB but mirrors critical data to OPFS (where supported) and falls back to LocalStorage for legacy compatibility.

## Data Flow

1. **User Action**: User updates a camera rigging.
2. **Event**: UI triggers a change event.
3. **Runtime**: `AutoGear` engine evaluates rules based on the new state.
4. **Persistence**: `Persistence Facade` captures the new state.
5. **Storage**: Data is written to IndexedDB and queued for OPFS background backup.
6. **Feedback**: `Runtime State` updates the power summary, which propagates back to the UI.

## Related Documentation

- [Runtime Environment](runtime-environment.md)
- [Module Registry](module-registry.md)
- [Storage Layer](storage-layer.md)
- [V2 Views](../v2-views.md)
