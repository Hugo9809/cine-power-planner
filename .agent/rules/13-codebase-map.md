---
trigger: always_on
---

CONTEXT RETENTION & CODEBASE MAP
1. The "Codebase Map" Protocol
To prevent "Context Amnesia" during long sessions, you must maintain a file named CODEBASE_MAP.md in the root directory.

Role: This file acts as your long-term memory. It is the "Source of Truth" for the project structure.

Content:

High-Level Architecture: A brief summary of the app's purpose.

Key Directories: A tree view of important folders and their responsibilities.

Data Flow: A Mermaid diagram showing how data moves from IndexedDB -> OPFS -> UI.

Active Workstreams: A list of currently active features and their status.

2. Update Trigger
Constraint: You MUST update CODEBASE_MAP.md whenever you:

Create a new directory.

Add a major feature.

Change the data schema (IndexedDB).

3. Session Start Protocol
  
At the start of any new session or task, read CODEBASE_MAP.md FIRST to ground yourself in the project's current state before reading any code files.