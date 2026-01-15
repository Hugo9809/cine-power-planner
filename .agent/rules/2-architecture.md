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

2. Directory Structure (Feature-Based)
You must strictly adhere to a Feature-Based architecture to ensure scalability.

src/features/: Contains domain-specific logic. Each feature (e.g., auth, project-board) gets its own folder with components, hooks, and utils.

src/components/: ONLY for generic, reusable UI atoms (Buttons, Inputs) that are domain-agnostic.

src/lib/: For third-party library configurations (e.g., idb setup, firebase init).

src/workers/: Dedicated folder for Web Workers (OPFS sync logic).

The Barrel File Protocol:

Every feature folder MUST have an index.js that exports only the public API of that feature.

Constraint: Code outside a feature folder MUST import from src/features/auth (the barrel file), NOT src/features/auth/components/LoginForm.jsx.

3. Data Persistence Strategy (The "Twin-Store" Pattern)
File 2: NEW .agent/rules/70-performance.md (New rule to enforce web performance best practices specific to Vite)