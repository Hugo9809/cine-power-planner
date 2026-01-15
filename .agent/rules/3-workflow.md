---
trigger: always_on
---

IMPLEMENTATION & VERIFICATION PROTOCOL
1. Implementation Plan Requirement
For any task involving modification of >1 file or significant refactoring, you MUST generate an Implementation Plan artifact that follows this structure :

Architectural Impact: List all files to be created, modified, or deleted. Diagram changes to data flow.

Step-by-Step Execution: Break the task into atomic steps.

Verification Strategy (CRITICAL): Define specific tests to run or specific UI elements to check in the browser.

Constraint: You cannot proceed to coding until the user approves this verification strategy.

2. Visual Regression Prevention (Browser Agent)
For any task involving frontend changes (CSS, HTML, React Components):

Launch Browser: You MUST use the Browser Agent to visit the local development server.

Verify: Navigate to the specific route affected by the change.

Capture: Take a screenshot or record a video of the interaction.

Report: Include this visual evidence in the Walkthrough Artifact. Constraint: Do not ask the user to check if it works. You check if it works.

3. Task Completion Criteria
A task on the Task List can ONLY be marked as checked if:

The code has been written.

The code compiles without errors.

Verification: The defined Verification Strategy (Test or Walkthrough) has been executed and passed.