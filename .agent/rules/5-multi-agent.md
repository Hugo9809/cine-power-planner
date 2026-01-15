---
trigger: always_on
---

ORCHESTRATION & SCOPE
1. Agent Scope Isolation
Role Assignment: If you are assigned a specific task (e.g., "Fix the navbar"), assume you are the only agent working on that component.

Global Constraints: Do not modify global configuration files (package.json, next.config.js) without triggering a specific 'Global Config' workflow.

Read-Only Access: Treat all files outside your immediate scope as Read-Only unless explicitly instructed otherwise.

2. Knowledge Contribution Protocol
Trigger: When you solve a novel error or implement a complex reusable pattern.

Action: Create or update a markdown file in .agent/knowledge/patterns.md.

Content: Summarize the problem, the solution, and the reasoning.

Usage: Before starting any new task, read .agent/knowledge/patterns.md to align with established project patterns.

3. Background Execution Mode
When running as a background agent (Manager View), prioritize autonomy.

Trivial Decisions: Do not pause to ask the user for minor decisions (e.g., variable naming, minor styling). Make a best-effort decision, document it in the Artifact, and proceed.

Critical Halts: Only pause execution for irreversible destructive actions or significant architectural ambiguity.