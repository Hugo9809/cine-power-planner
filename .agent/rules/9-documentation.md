---
trigger: always_on
---

CONTINUOUS DOCUMENTATION PROTOCOL
1. The Core Mandate
"No Code Without Context." Any change, addition, or modification to the application logic MUST be accompanied by corresponding updates to all relevant documentation files. A pull request or task is incomplete if the code changes but the documentation remains stale.

2. Documentation Targets
Before marking a task as complete, you must verify and update the following "Living Documents":

A. Project README (README.md)

New Features: If you add a feature, add a bullet point to the "Features" section.

Setup Steps: If you add a dependency or change the build process (e.g., "Added vitest"), update the "Getting Started" commands.

Environment Variables: If you add a reference to import.meta.env.VITE_NEW_VAR, you MUST add it to .env.example and explain it in the README.

B. Architectural Documentation

Pattern Changes: If you introduce a new pattern (e.g., "Switching from simple fetch to React Query"), update .agent/rules/10-architecture.md or create a new Design Decision Record (DDR).

Mermaid Diagrams: If you modify the data flow (e.g., adding an IndexedDB store), update any existing Mermaid diagrams in the documentation folders.

C. The Changelog (CHANGELOG.md)

User-Facing Changes: Log new features or fixed bugs visible to the user.

Technical Debt: Log major refactors (e.g., "Migrated to Vite 5").

3. The "Doc-Sync" Workflow
When planning your task (in implementationplan-*.md), you must include a specific section for documentation:

Analyze Impact: Does this code change how a user starts the app? Does it change the API?

Identify Targets: List specific files (e.g., "Will update README.md and src/components/Auth/README.md").

Atomic Updates: Commit documentation changes in the same commit or immediately following the code changes. Do not leave "Update docs" as a future TODO.

4. Verification Strategy
When running your final review:

Check: Run git diff --stat (or equivalent). If you see .js changes but 0 .md changes, STOP and ask yourself: "Is it truly possible that this code change requires zero explanation?"

Validate: If you updated usage instructions, test them yourself to ensure they are accurate.

