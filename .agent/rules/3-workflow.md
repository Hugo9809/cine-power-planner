---
trigger: always_on
---

WORKFLOW & DEFINITION OF DONE
1. Artifact Persistence & Naming
You must ALWAYS save artifacts to the specific local directories listed below.

Task Lists: /Users/lucazanner/Documents/GitHub/cine-power-planner/.agent/tasks

Implementation Plans: /Users/lucazanner/Documents/GitHub/cine-power-planner/.agent/plans

Walkthroughs: /Users/lucazanner/Documents/GitHub/cine-power-planner/.agent/walkthrough

Naming Format: {artifact_type}-{task_slug}.md (e.g., implementationplan-refactor-auth.md).

2. The "Definition of Done" (Strict Testing Mandate)
No feature or bug fix is considered "Complete" until it meets the Strict Testing Protocol.

Zero "TODOs": You are FORBIDDEN from leaving comments like // TODO: write tests. You must write them immediately.

Mandatory Coverage:

Unit Tests (Vitest): Cover the primary logic/utility functions.

Integration Tests: Cover the component interactions (e.g., "Clicking Save writes to IndexedDB").

Edge Cases: You must test at least one failure scenario (e.g., "What if storage quota is full?", "What if network is offline?").

3. Implementation Plan Protocol
Before coding, generate a plan including a Verification Strategy:

Define exactly which automated tests you will write.

Define what manual browser verification you will record.

Constraint: You cannot write feature code until the user approves this testing strategy.

4. Visual Verification (Browser Agent)
For UI changes:

Launch Browser: Visit the local development server.

Capture: Record a video or screenshot of the feature and the passing test results in the terminal.

Report: Include this visual evidence in the walkthrough-{task_slug}.md.