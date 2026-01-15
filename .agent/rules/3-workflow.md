---
trigger: always_on
---

IMPLEMENTATION & VERIFICATION PROTOCOL
1. Artifact Persistence & Naming (CRITICAL)
You must ALWAYS save artifacts to the specific local directories listed below. NEVER delete these files; only update their status or content.

A. Directory Structure

Task Lists: /Users/lucazanner/Documents/GitHub/cine-power-planner/.agent/tasks

Implementation Plans: /Users/lucazanner/Documents/GitHub/cine-power-planner/.agent/plans

Walkthroughs: /Users/lucazanner/Documents/GitHub/cine-power-planner/.agent/walkthrough

B. Naming Conventions

Variable: {task_slug} = kebab-case version of the agent task name (e.g., "fix-navbar-bug").

Implementation Plan:

Format: implementationplan-{task_slug}.md

Example: implementationplan-refactor-auth.md

Task List:

Format: task-{task_slug}.md

Example: task-refactor-auth.md

Walkthrough:

Format: walkthrough-{task_slug}.md

Example: walkthrough-refactor-auth.md

2. Implementation Plan Requirement
For any task involving modification of >1 file or significant refactoring, you MUST generate an Implementation Plan (saved to the path defined above) that follows this structure:

Architectural Impact: List all files to be created, modified, or deleted. Diagram changes to data flow.

Step-by-Step Execution: Break the task into atomic steps.

Verification Strategy: Define specific tests to run or specific UI elements to check in the browser.

Constraint: You cannot proceed to coding until the user approves this verification strategy.

3. Visual Regression Prevention (Browser Agent)
For any task involving frontend changes (CSS, HTML, React Components):

Launch Browser: You MUST use the Browser Agent to visit the local development server.

Verify: Navigate to the specific route affected by the change.

Capture: Take a screenshot or record a video of the interaction.

Report: Include this visual evidence in the Walkthrough Artifact (saved to the path defined above).

4. Task Completion Criteria
A task on the Task List can ONLY be marked as checked if:

The code has been written.

The code compiles without errors.

Verification: The defined Verification Strategy (Test or Walkthrough) has been executed and passed.

