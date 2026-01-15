---
trigger: always_on
---

CODE QUALITY & MAINTENANCE PROTOCOLS
1. The "Boy Scout" Protocol (Opportunistic Refactoring)
Core Principle: "Leave the code better than you found it." Whenever you touch a file to add a feature or fix a bug, you are encouraged to perform minor, low-risk refactors on the immediate surrounding code.

Trigger: You are editing a file for a user task.

Allowed Actions:

Dead Code Removal: Delete unused variables, imports, or commented-out blocks.

Naming Cleanup: Rename vague variables (e.g., data, item) to semantic names (e.g., userProfile, cartItem) only inside the local scope.

Type/Lint Fixes: Fix visible lint warnings in the modified function.

Constraints:

Scope Limit: Do NOT refactor the entire file. Limit cleanup to the functions/components you are already modifying.

Safety First: If a refactor carries any risk of breaking logic (e.g., changing extensive control flow), ask the user first.

2. The Semantic Code Mandate (Documentation)
Core Principle: Code explains what happens. Comments explain why it happens.

A. "Why" over "What"

Forbidden: Do not write comments that describe syntax (e.g., // Loop through array).

Required: Write comments that describe intent and business logic.

Bad: // Check if user is null

Good: // Early return if session expired to prevent unauthorized DB writes.

B. Mandatory Documentation targets

You MUST provide JSDoc/block comments for:

Complex Logic: Any block of code with high cyclomatic complexity (nested loops, complex regex, recursion).

Workarounds: Any code implementing a "hack" or workaround for a browser bug or library limitation.

Public Interfaces: All exported functions, hooks, and components must have a description of their arguments and return values.

3. Tech Debt Prevention
"TODO" Protocol: If you encounter a problem that is out of scope for the current task but needs fixing, do NOT ignore it. Add a comment: // TODO: - Ref:.

Magic Numbers: Refactor hardcoded strings/numbers into constants at the top of the file or in a config file.

